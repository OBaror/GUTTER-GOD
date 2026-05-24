import React, { useState, useEffect, useRef } from 'react';
import { getPomodoroStats, savePomodoroSession } from '../utils/storage.js';

const MODES = [
  { id: 'work', label: 'Travail', minutes: 25, color: '#2563eb' },
  { id: 'short', label: 'Pause courte', minutes: 5, color: '#059669' },
  { id: 'long', label: 'Pause longue', minutes: 15, color: '#7c3aed' },
];

const MODULES = [
  'Vocabulaire TOEIC',
  'Grammaire TOEIC',
  'Lecture TOEIC',
  'Écoute TOEIC',
  'Jira & Agile',
  'Data & BI',
  'IA & Digital',
  'SI Management',
  'Fiches mémo',
];

const MOTIVATIONAL = [
  '🎉 Excellent travail ! Prends une pause bien méritée.',
  '💪 Une session de plus ! Tu avances vers tes objectifs.',
  '🔥 Régularité = succès. Continue comme ça !',
  '⭐ Chaque Pomodoro te rapproche de l\'expert que tu veux devenir.',
  '🚀 Incroyable ! Ta discipline est exemplaire.',
];

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 1100;
      osc2.type = 'sine';
      gain2.gain.setValueAtTime(0.4, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.6);
    }, 400);
  } catch (e) {
    console.log('Audio not supported');
  }
}

export default function Pomodoro({ settings }) {
  const [modeIndex, setModeIndex] = useState(0);
  const mode = MODES[modeIndex];
  const totalSeconds = mode.minutes * 60;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [selectedModule, setSelectedModule] = useState(MODULES[0]);
  const [stats, setStats] = useState(() => getPomodoroStats());
  const [motivMessage, setMotivMessage] = useState('');
  const [notifPermission, setNotifPermission] = useState('default');
  const [sessionStartTime, setSessionStartTime] = useState(null);

  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if ('Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setRunning(false);
    clearInterval(intervalRef.current);
  }, [modeIndex, totalSeconds]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            handleTimerEnd();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleTimerEnd() {
    playBeep();
    setRunning(false);

    if (mode.id === 'work') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      const msg = MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)];
      setMotivMessage(msg);

      const session = {
        module: selectedModule,
        date: new Date().toISOString(),
        minutes: mode.minutes,
        type: 'work',
      };
      savePomodoroSession(session);
      setStats(getPomodoroStats());

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro terminé ! 🍅', {
          body: `25 minutes de travail sur "${selectedModule}". ${newCount % 4 === 0 ? 'Prends une grande pause !' : 'Prends une pause de 5 minutes.'}`,
          icon: '/favicon.ico',
        });
      }

      if (newCount % 4 === 0) {
        setModeIndex(2);
      } else {
        setModeIndex(1);
      }
    } else {
      setMotivMessage('Pause terminée ! Prêt pour une nouvelle session ?');
      setModeIndex(0);
    }
    setSecondsLeft(MODES[modeIndex].minutes * 60);
  }

  function startTimer() {
    if (!running) {
      setSessionStartTime(Date.now());
    }
    setRunning(true);
    setMotivMessage('');
  }

  function pauseTimer() {
    setRunning(false);
  }

  function resetTimer() {
    setRunning(false);
    setSecondsLeft(totalSeconds);
    setMotivMessage('');
    clearInterval(intervalRef.current);
  }

  function requestNotifPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        setNotifPermission(perm);
      });
    }
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const todayMinutes = stats.todayMinutes || 0;
  const weekMinutes = stats.weekMinutes || 0;
  const totalSessions = stats.totalSessions || 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">⏱️ Pomodoro</h1>
        <p className="page-subtitle">Technique Pomodoro : 25 min de travail focalisé, 5 min de pause</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
        {/* Timer Card */}
        <div className="card" style={{ textAlign: 'center' }}>
          {/* Mode selector */}
          <div className="tabs mb-24">
            {MODES.map((m, i) => (
              <button
                key={m.id}
                className={`tab-btn ${modeIndex === i ? 'active' : ''}`}
                onClick={() => { setModeIndex(i); setRunning(false); setMotivMessage(''); }}
                style={modeIndex === i ? { background: m.color, borderColor: m.color } : {}}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Circular timer */}
          <div className="pomodoro-timer">
            <svg width="260" height="260" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="130" cy="130" r="110"
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="12"
              />
              <circle
                cx="130" cy="130" r="110"
                fill="none"
                stroke={mode.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className="timer-display-center" style={{ color: mode.color }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1 }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginTop: 8 }}>
                {mode.label}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
            {!running ? (
              <button className="btn btn-primary btn-lg" onClick={startTimer} style={{ background: mode.color, borderColor: mode.color }}>
                ▶ Démarrer
              </button>
            ) : (
              <button className="btn btn-warning btn-lg" onClick={pauseTimer}>
                ⏸ Pause
              </button>
            )}
            <button className="btn btn-ghost" onClick={resetTimer}>⟳ Reset</button>
          </div>

          {/* Module selector */}
          <div style={{ marginTop: 24, textAlign: 'left' }}>
            <label className="form-label">🎯 Que veux-tu étudier ?</label>
            <select
              className="form-input"
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
            >
              {MODULES.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Motivational message */}
          {motivMessage && (
            <div className="alert alert-success mt-16" style={{ textAlign: 'left' }}>
              <span className="alert-icon">🎉</span>
              <span>{motivMessage}</span>
            </div>
          )}
        </div>

        {/* Stats + Info */}
        <div>
          {/* Pomodoro counter */}
          <div className="card mb-16">
            <h2 className="card-title">🍅 Sessions d'aujourd'hui</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {Array.from({ length: Math.max(4, pomodoroCount + 1) }).map((_, i) => (
                <div key={i} style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  background: i < pomodoroCount ? '#2563eb' : 'var(--bg-main)',
                  border: `2px solid ${i < pomodoroCount ? '#2563eb' : 'var(--border-color)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {i < pomodoroCount ? '🍅' : '○'}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Après 4 Pomodoros, une pause longue (15 min) est recommandée.
            </p>
          </div>

          {/* Stats */}
          <div className="card mb-16">
            <h2 className="card-title">📊 Statistiques</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-main)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>{todayMinutes}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>minutes aujourd'hui</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-main)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{weekMinutes}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>minutes cette semaine</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-main)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>{totalSessions}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>sessions au total</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-main)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d97706' }}>{Math.round(weekMinutes / 60 * 10) / 10}h</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>cette semaine</div>
              </div>
            </div>
          </div>

          {/* Notification permission */}
          {notifPermission !== 'granted' && (
            <div className="card mb-16" style={{ borderColor: '#d97706', background: '#fef3c7' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#92400e' }}>🔔 Notifications</div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: '#78350f', marginBottom: 12 }}>
                Active les notifications pour recevoir une alerte quand le Pomodoro se termine, même si tu navigues vers une autre page.
              </p>
              <button className="btn btn-warning btn-sm" onClick={requestNotifPermission}>
                Activer les notifications
              </button>
            </div>
          )}

          {/* Technique explanation */}
          <div className="card">
            <h2 className="card-title">ℹ️ La technique Pomodoro</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { step: '1', text: 'Choisir une tâche à accomplir', icon: '🎯' },
                { step: '2', text: 'Régler le minuteur sur 25 minutes', icon: '⏱️' },
                { step: '3', text: 'Travailler sur la tâche jusqu\'au signal', icon: '💪' },
                { step: '4', text: 'Prendre 5 minutes de pause', icon: '☕' },
                { step: '5', text: 'Après 4 Pomodoros : pause longue (15-30 min)', icon: '🏖️' },
              ].map(item => (
                <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Étape {item.step} : </span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="alert alert-info mt-16">
              <span className="alert-icon">💜</span>
              <span style={{ fontSize: 'var(--font-size-sm)' }}>
                Pour la dyslexie : des pauses régulières améliorent la rétention. Ne saute pas les pauses !
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
