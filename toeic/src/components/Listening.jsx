import React, { useState, useEffect, useCallback, useRef } from 'react';
import { listeningExercises, listeningTypes } from '../data/listening';
import { getProgress, saveProgress } from '../utils/storage';

const TYPE_LABELS = {
  conversation: 'Conversation',
  announcement: 'Annonce',
  talk: 'Discours/Monologue'
};

const TYPE_ICONS = {
  conversation: '💬',
  announcement: '📢',
  talk: '🎙️'
};

export default function Listening({ settings }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [allAnswers, setAllAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [speed, setSpeed] = useState(0.85);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [globalScore, setGlobalScore] = useState({ correct: 0, total: 0 });
  const [filterType, setFilterType] = useState('all');
  const speakingTimerRef = useRef(null);

  useEffect(() => {
    const p = getProgress();
    setCompletedExercises(new Set(p.listening.exercisesCompleted));
    setGlobalScore({ correct: p.listening.correctAnswers || 0, total: p.listening.totalQuestions || 0 });
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
    };
  }, []);

  const filteredExercises = filterType === 'all'
    ? listeningExercises
    : listeningExercises.filter(e => e.type === filterType);

  function handleSpeak() {
    if (!window.speechSynthesis) {
      alert('La synthèse vocale n\'est pas disponible dans ce navigateur.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedExercise.transcript);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
      setHasListened(true);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setHasListened(true);

    // Fallback timer
    const wordCount = selectedExercise.transcript.split(' ').length;
    const estimatedMs = (wordCount / (speed * 140)) * 60 * 1000;
    speakingTimerRef.current = setTimeout(() => {
      setIsSpeaking(false);
      setHasListened(true);
    }, estimatedMs + 3000);
  }

  function changeSpeed(newSpeed) {
    setSpeed(newSpeed);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
    }
  }

  function selectExercise(ex) {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSelectedExercise(ex);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0 });
    setAllAnswers({});
    setShowSummary(false);
    setIsSpeaking(false);
    setHasListened(false);
    setShowTranscript(false);
    window.scrollTo(0, 0);
  }

  function checkAnswer() {
    if (!selectedExercise || selectedAnswer === null) return;
    const q = selectedExercise.questions[currentQuestionIndex];
    const correct = selectedAnswer === q.correct;
    setIsCorrect(correct);
    setIsAnswered(true);

    const newScore = { correct: score.correct + (correct ? 1 : 0), total: score.total + 1 };
    setScore(newScore);
    setAllAnswers(prev => ({ ...prev, [q.id]: { selected: selectedAnswer, correct } }));
  }

  function handleNext() {
    if (currentQuestionIndex + 1 >= selectedExercise.questions.length) {
      finishExercise();
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }

  function finishExercise() {
    setShowSummary(true);
    const newCompleted = new Set(completedExercises);
    newCompleted.add(selectedExercise.id);
    setCompletedExercises(newCompleted);

    const newGlobal = {
      correct: globalScore.correct + score.correct,
      total: globalScore.total + score.total + 1
    };
    setGlobalScore(newGlobal);

    saveProgress('listening', {
      exercisesCompleted: [...newCompleted],
      totalExercises: listeningExercises.length,
      correctAnswers: newGlobal.correct,
      totalQuestions: newGlobal.total
    });
  }

  // List view
  if (!selectedExercise) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">🎧 Écoute</h1>
          <p className="page-subtitle">Entraîne ton oreille avec des conversations et annonces professionnelles</p>
        </div>

        <div className="alert alert-info mb-24">
          <span className="alert-icon">💡</span>
          <div>
            <strong>Comment s'entraîner :</strong>
            <ol style={{ margin: '8px 0 0 20px', lineHeight: 2 }}>
              <li>Clique sur "Écouter" pour entendre l'audio (synthèse vocale)</li>
              <li>Réponds aux questions <strong>sans regarder</strong> le transcript</li>
              <li>Après avoir répondu, tu peux lire le transcript pour vérifier</li>
              <li>Utilise la vitesse réduite (0.75x) si c'est trop rapide</li>
            </ol>
          </div>
        </div>

        {/* Progress */}
        <div className="card mb-24">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>
                {completedExercises.size} / {listeningExercises.length} exercices complétés
              </div>
              <div className="text-muted text-sm">
                {globalScore.total > 0
                  ? `${Math.round((globalScore.correct / globalScore.total) * 100)}% de réponses correctes`
                  : 'Commence ton premier exercice d\'écoute !'}
              </div>
            </div>
          </div>
          <div className="progress-bar mt-16" style={{ height: 10 }}>
            <div
              className="progress-fill listening"
              style={{ width: `${Math.round((completedExercises.size / listeningExercises.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar mb-24">
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'center', marginRight: 4 }}>
            Type :
          </span>
          <button
            className={`filter-chip ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Tous ({listeningExercises.length})
          </button>
          {listeningTypes.map(type => (
            <button
              key={type}
              className={`filter-chip ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {TYPE_ICONS[type]} {TYPE_LABELS[type]} ({listeningExercises.filter(e => e.type === type).length})
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filteredExercises.map(ex => {
            const isDone = completedExercises.has(ex.id);
            return (
              <div
                key={ex.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  border: isDone ? '2px solid var(--color-success)' : '2px solid var(--border-color)',
                  transition: 'all 0.2s'
                }}
                onClick={() => selectExercise(ex)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && selectExercise(ex)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: '1.5rem' }}>{TYPE_ICONS[ex.type]}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {isDone && (
                      <span className="badge" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                        ✅ Fait
                      </span>
                    )}
                    <span className={`badge badge-${ex.level}`}>{ex.level}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 6 }}>{ex.title}</h3>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {TYPE_LABELS[ex.type]} · {ex.questions.length} questions
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {ex.transcript.substring(0, 90)}...
                </p>
                <button
                  className={`btn ${isDone ? 'btn-ghost' : 'btn-primary'} btn-sm w-full`}
                  style={{ marginTop: 16 }}
                  onClick={e => { e.stopPropagation(); selectExercise(ex); }}
                >
                  {isDone ? '🔄 Recommencer' : '▶ Commencer'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Summary
  if (showSummary) {
    const q = selectedExercise.questions;
    const total = q.length;
    const correct = Object.values(allAnswers).filter(a => a.correct).length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">🎧 Écoute</h1>
        </div>
        <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>
              {percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '📚'}
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-2xl)', marginBottom: 8 }}>
              {selectedExercise.title}
            </h2>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: percent >= 70 ? 'var(--color-success)' : 'var(--color-warning)' }}>
              {correct}/{total}
            </div>
            <div className="text-muted">{percent}% de bonnes réponses</div>
          </div>

          {/* Transcript review */}
          <div className="card mb-16" style={{ background: 'var(--bg-main)' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>📄 Transcript complet</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.8, color: 'var(--text-primary)' }}>
              {selectedExercise.transcript}
            </p>
          </div>

          {/* Review */}
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Révision</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {q.map((question, idx) => {
              const ans = allAnswers[question.id];
              const wasCorrect = ans?.correct;
              return (
                <div
                  key={question.id}
                  style={{
                    padding: 16,
                    borderRadius: 'var(--border-radius-sm)',
                    background: wasCorrect ? 'var(--color-success-light)' : 'var(--color-error-light)',
                    border: `1px solid ${wasCorrect ? 'var(--color-success)' : 'var(--color-error)'}`,
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    {wasCorrect ? '✅' : '❌'} Q{idx + 1}: {question.question}
                  </div>
                  {!wasCorrect && (
                    <div style={{ fontSize: 'var(--font-size-sm)', color: '#7f1d1d' }}>
                      Bonne réponse : "{question.options[question.correct]}"
                    </div>
                  )}
                  {ans && (
                    <div style={{ fontSize: 'var(--font-size-sm)', color: wasCorrect ? '#14532d' : '#7f1d1d', marginTop: 4 }}>
                      💡 {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => selectExercise(selectedExercise)}>
              🔄 Recommencer
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setSelectedExercise(null)}>
              ← Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Exercise view
  const currentQuestion = selectedExercise.questions[currentQuestionIndex];

  return (
    <div className="page-container">
      <div style={{ marginBottom: 24 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => { setSelectedExercise(null); if (window.speechSynthesis) window.speechSynthesis.cancel(); }}>
          ← Retour
        </button>
      </div>

      <div className="page-header">
        <h1 className="page-title">{selectedExercise.title}</h1>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: '1.2rem' }}>{TYPE_ICONS[selectedExercise.type]}</span>
          <span className="badge badge-IT" style={{ alignSelf: 'center' }}>{TYPE_LABELS[selectedExercise.type]}</span>
          <span className={`badge badge-${selectedExercise.level}`} style={{ alignSelf: 'center' }}>{selectedExercise.level}</span>
        </div>
      </div>

      {/* Audio player */}
      <div className="audio-player mb-24">
        <button className="audio-btn" onClick={handleSpeak} title={isSpeaking ? 'Arrêter' : 'Écouter'}>
          {isSpeaking ? '⏹' : '▶'}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {isSpeaking ? '🔊 Lecture en cours...' : hasListened ? '✅ Audio prêt' : '▶ Cliquez pour écouter'}
          </div>
          <div className="audio-status">
            Vitesse : {speed}x · {selectedExercise.questions.length} questions
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[0.5, 0.75, 1.0].map(s => (
            <button
              key={s}
              className={`speed-btn ${speed === s ? 'active' : ''}`}
              onClick={() => changeSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {!hasListened && (
        <div className="alert alert-warning mb-24">
          <span className="alert-icon">⚠️</span>
          <span>
            Écoute d'abord l'audio avant de répondre aux questions !
            Clique sur ▶ pour commencer.
          </span>
        </div>
      )}

      {/* Progress */}
      <div className="progress-bar mb-16" style={{ height: 8 }}>
        <div
          className="progress-fill listening"
          style={{ width: `${(currentQuestionIndex / selectedExercise.questions.length) * 100}%` }}
        />
      </div>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 16 }}>
        Question <strong>{currentQuestionIndex + 1}</strong> sur <strong>{selectedExercise.questions.length}</strong>
      </div>

      {/* Question */}
      <div className="quiz-container">
        <div className="quiz-question">
          {currentQuestion.question}
        </div>

        <div className="quiz-options">
          {currentQuestion.options.map((option, idx) => {
            let optClass = 'quiz-option';
            if (isAnswered) {
              if (idx === currentQuestion.correct) optClass += ' correct';
              else if (idx === selectedAnswer && idx !== currentQuestion.correct) optClass += ' incorrect';
            } else if (idx === selectedAnswer) {
              optClass += ' selected';
            }
            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => !isAnswered && setSelectedAnswer(idx)}
                disabled={isAnswered}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correct && <span style={{ marginLeft: 'auto' }}>✅</span>}
                {isAnswered && idx === selectedAnswer && idx !== currentQuestion.correct && <span style={{ marginLeft: 'auto' }}>❌</span>}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="explanation-title">
              {isCorrect ? '✅ Correct !' : '❌ Incorrect'}
            </div>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Transcript toggle (after answering) */}
        {(isAnswered || hasListened) && (
          <div className="mt-16">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              {showTranscript ? '🙈 Masquer le transcript' : '📄 Voir le transcript'}
            </button>
            {showTranscript && (
              <div className="card mt-16" style={{ background: 'var(--bg-main)', padding: 20 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Transcript</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.8 }}>
                  {selectedExercise.transcript}
                </p>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          {!isAnswered ? (
            <button
              className="btn btn-primary w-full"
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
            >
              ✅ Valider
            </button>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={handleNext}
            >
              {currentQuestionIndex + 1 >= selectedExercise.questions.length
                ? '📊 Voir les résultats'
                : 'Question suivante →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
