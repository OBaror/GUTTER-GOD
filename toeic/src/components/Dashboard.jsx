import React, { useState, useEffect } from 'react';
import { getProgress, getStreak, calculateToeicEstimate, getSectionProgress } from '../utils/storage';

const MOTIVATIONAL_MESSAGES = [
  "Chaque mot appris est un pas vers les 800 points ! 💪",
  "La régularité est la clé du succès. Continue comme ça !",
  "Tu progresses chaque jour. Ne t'arrête pas maintenant !",
  "L'anglais professionnel s'apprend une étape à la fois.",
  "Excellent travail ! Tes efforts portent leurs fruits.",
  "Ta dyslexie n'est pas un obstacle — c'est ta force unique !",
  "800 points TOEIC, c'est ton objectif. Tu y arriveras !"
];

const DYSLEXIA_TIPS = [
  { icon: "👁️", tip: "Active le mode dyslexie dans les paramètres pour une meilleure lisibilité." },
  { icon: "🔊", tip: "Utilise les boutons d'écoute pour entendre les mots et passages." },
  { icon: "🎨", tip: "Augmente la taille du texte dans les paramètres si nécessaire." },
  { icon: "⏸️", tip: "Fais des pauses régulières. La qualité prime sur la quantité !" },
  { icon: "🔄", tip: "Répétition espacée : les cartes 'À revoir' reviennent automatiquement." }
];

export default function Dashboard({ onNavigate, settings }) {
  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState({ current: 0, best: 0 });
  const [toeicEstimate, setToeicEstimate] = useState(200);
  const [sectionProgress, setSectionProgress] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [msgIndex] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length));

  useEffect(() => {
    const p = getProgress();
    const s = getStreak();
    setProgress(p);
    setStreak(s);
    setToeicEstimate(calculateToeicEstimate(p));
    setSectionProgress(getSectionProgress(p));

    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % DYSLEXIA_TIPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!progress || !sectionProgress) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>⌛</div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  const scorePercent = ((toeicEstimate - 200) / (800 - 200)) * 100;
  const markerPosition = Math.max(2, Math.min(scorePercent, 98));

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Bonjour ! 👋</h1>
        <p className="page-subtitle" style={{ textTransform: 'capitalize' }}>{today}</p>
      </div>

      {/* Motivational message */}
      <div className="alert alert-info mb-24">
        <span className="alert-icon">💡</span>
        <span>{MOTIVATIONAL_MESSAGES[msgIndex]}</span>
      </div>

      {/* Score + Streak */}
      <div className="dashboard-grid mb-24">
        {/* TOEIC Score Card */}
        <div className="toeic-score-card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Score TOEIC estimé
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                {toeicEstimate}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                sur 990 points
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Objectif</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#60a5fa' }}>800</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {800 - toeicEstimate > 0 ? `+${800 - toeicEstimate} points restants` : '🎉 Objectif atteint !'}
              </div>
            </div>
          </div>

          {/* Scale */}
          <div style={{ marginBottom: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            Progression vers 800 points
          </div>
          <div className="toeic-scale">
            <div
              className="toeic-scale-marker"
              style={{ left: `${markerPosition}%` }}
              title={`Score actuel : ${toeicEstimate}`}
            />
          </div>
          <div className="toeic-scale-labels" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span>200</span>
            <span>350</span>
            <span>500</span>
            <span>650</span>
            <span>800</span>
            <span>990</span>
          </div>

          {/* Score levels explanation */}
          <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { range: '200-400', label: 'Débutant', color: '#ef4444' },
              { range: '400-600', label: 'Intermédiaire', color: '#f59e0b' },
              { range: '600-800', label: 'Avancé', color: '#22c55e' },
              { range: '800+', label: 'Expert', color: '#15803d' },
            ].map(l => (
              <div key={l.range} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{l.range} : {l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🔥</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#d97706' }}>{streak.current}</div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Jours de suite</div>
          <div className="text-sm text-muted">Record : {streak.best} jours</div>
          {streak.current === 0 && (
            <p style={{ fontSize: 13, color: 'var(--color-warning)', marginTop: 8 }}>
              Commence aujourd'hui pour démarrer ta série !
            </p>
          )}
        </div>

        {/* Today's goal */}
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 'var(--font-size-base)' }}>
            📅 Objectif quotidien
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 4 }}>
            0 / 20
          </div>
          <div className="text-sm text-muted" style={{ marginBottom: 12 }}>exercices complétés</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '0%' }} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
            Modifie ton objectif dans les paramètres ⚙️
          </p>
        </div>
      </div>

      {/* Section Progress */}
      <div className="card mb-24">
        <h2 className="card-title">📊 Progression par section</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {Object.entries(sectionProgress).map(([key, section]) => (
            <div key={key} className="progress-container">
              <div className="progress-label">
                <span style={{ fontWeight: 600 }}>{section.label}</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {section.done} / {section.total} ({section.percent}%)
                </span>
              </div>
              <div className="progress-bar" style={{ height: 12 }}>
                <div
                  className={`progress-fill ${key}`}
                  style={{ width: `${section.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-24">
        <h2 className="card-title">🚀 Commencer maintenant</h2>
        <div className="quick-actions">
          {[
            {
              page: 'vocabulary',
              icon: '📚',
              title: 'Vocabulaire',
              desc: 'Flashcards IT & Business',
              color: '#dbeafe'
            },
            {
              page: 'grammar',
              icon: '✏️',
              title: 'Grammaire',
              desc: 'Exercices TOEIC Part 5',
              color: '#ede9fe'
            },
            {
              page: 'reading',
              icon: '📖',
              title: 'Lecture',
              desc: 'Textes de compréhension',
              color: '#d1fae5'
            },
            {
              page: 'listening',
              icon: '🎧',
              title: 'Écoute',
              desc: 'Conversations & annonces',
              color: '#fef3c7'
            },
            {
              page: 'practice',
              icon: '📝',
              title: 'Test pratique',
              desc: 'Simule l\'examen TOEIC',
              color: '#fee2e2'
            },
          ].map(action => (
            <div
              key={action.page}
              className="action-card"
              style={{ background: action.color, borderColor: action.color }}
              onClick={() => onNavigate(action.page)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onNavigate(action.page)}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-title">{action.title}</span>
              <span className="action-desc">{action.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dyslexia tip */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ede9fe, #dbeafe)', border: '1px solid #c4b5fd' }}>
        <h2 className="card-title" style={{ color: 'var(--color-accent)' }}>
          💜 Conseil pour la dyslexie
        </h2>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ fontSize: '2rem', flexShrink: 0 }}>{DYSLEXIA_TIPS[tipIndex].icon}</span>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {DYSLEXIA_TIPS[tipIndex].tip}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          {DYSLEXIA_TIPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === tipIndex ? 'var(--color-accent)' : 'rgba(124,58,237,0.2)',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
        <button
          className="btn btn-outline btn-sm"
          style={{ marginTop: 16, borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
          onClick={() => onNavigate('settings')}
        >
          ⚙️ Configurer l'accessibilité
        </button>
      </div>

      {/* About TOEIC */}
      <div className="card mt-24">
        <h2 className="card-title">ℹ️ À propos du TOEIC</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { title: 'Listening', desc: '100 questions, 45 min. Conversations, annonces, réunions.', icon: '🎧' },
            { title: 'Reading', desc: '100 questions, 75 min. Grammaire, textes, emails.', icon: '📖' },
            { title: 'Score total', desc: '200 à 990 points. 495 points par section.', icon: '📊' },
            { title: 'Ton objectif', desc: '800 points = niveau professionnel avancé (B2).', icon: '🎯' },
          ].map(item => (
            <div key={item.title} style={{
              padding: 16,
              background: 'var(--bg-main)',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
