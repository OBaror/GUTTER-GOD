import React, { useState, useEffect, useCallback } from 'react';
import { readingPassages } from '../data/reading';
import { getProgress, saveProgress } from '../utils/storage';

function speak(text, rate = 0.85) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export default function Reading({ settings }) {
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [allAnswers, setAllAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textSize, setTextSize] = useState('base');
  const [completedPassages, setCompletedPassages] = useState(new Set());
  const [globalScore, setGlobalScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const p = getProgress();
    setCompletedPassages(new Set(p.reading.passagesCompleted));
    setGlobalScore({ correct: p.reading.correctAnswers || 0, total: p.reading.totalQuestions || 0 });
    return () => stopSpeaking();
  }, []);

  function selectPassage(passage) {
    setSelectedPassage(passage);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0 });
    setAllAnswers({});
    setShowSummary(false);
    stopSpeaking();
    setIsSpeaking(false);
    window.scrollTo(0, 0);
  }

  function handleSpeak() {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speak(selectedPassage.text, settings?.speechRate || 0.85);
      setIsSpeaking(true);
      const estimatedTime = (selectedPassage.wordCount / 130) * (1 / (settings?.speechRate || 0.85)) * 1000;
      setTimeout(() => setIsSpeaking(false), estimatedTime + 2000);
    }
  }

  function checkAnswer() {
    if (!selectedPassage || selectedAnswer === null) return;
    const q = selectedPassage.questions[currentQuestionIndex];
    const correct = selectedAnswer === q.correct;
    setIsCorrect(correct);
    setIsAnswered(true);

    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);
    setAllAnswers(prev => ({ ...prev, [q.id]: { selected: selectedAnswer, correct } }));
  }

  function handleNext() {
    if (currentQuestionIndex + 1 >= selectedPassage.questions.length) {
      finishPassage();
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }

  function finishPassage() {
    setShowSummary(true);
    const newCompleted = new Set(completedPassages);
    newCompleted.add(selectedPassage.id);
    setCompletedPassages(newCompleted);

    const newGlobal = {
      correct: globalScore.correct + score.correct,
      total: globalScore.total + score.total + 1
    };
    setGlobalScore(newGlobal);

    saveProgress('reading', {
      passagesCompleted: [...newCompleted],
      totalPassages: readingPassages.length,
      correctAnswers: newGlobal.correct,
      totalQuestions: newGlobal.total
    });
  }

  const TEXT_SIZES = {
    small: { fontSize: 14, lineHeight: 1.6 },
    base: { fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height)' },
    large: { fontSize: 20, lineHeight: 1.8 },
    xlarge: { fontSize: 24, lineHeight: 2 }
  };

  // Passage list
  if (!selectedPassage) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">📖 Lecture</h1>
          <p className="page-subtitle">Compréhension de textes professionnels en anglais</p>
        </div>

        <div className="alert alert-info mb-24">
          <span className="alert-icon">💡</span>
          <span>
            Lis le texte attentivement, puis réponds aux questions. Tu peux utiliser le bouton
            🔊 pour écouter le texte — très utile si tu as des difficultés de lecture !
          </span>
        </div>

        {/* Progress */}
        <div className="card mb-24">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>
                {completedPassages.size} / {readingPassages.length} textes complétés
              </div>
              <div className="text-muted text-sm">
                {globalScore.total > 0
                  ? `${Math.round((globalScore.correct / globalScore.total) * 100)}% de réponses correctes`
                  : 'Commence ton premier texte !'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="score-circle" style={{ width: 70, height: 70 }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                  {globalScore.correct}/{globalScore.total}
                </span>
              </div>
            </div>
          </div>
          <div className="progress-bar mt-16" style={{ height: 10 }}>
            <div
              className="progress-fill reading"
              style={{ width: `${Math.round((completedPassages.size / readingPassages.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Passage cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {readingPassages.map(passage => {
            const isDone = completedPassages.has(passage.id);
            return (
              <div
                key={passage.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  border: isDone ? '2px solid var(--color-success)' : '2px solid var(--border-color)',
                  transition: 'all 0.2s'
                }}
                onClick={() => selectPassage(passage)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && selectPassage(passage)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <span className="badge badge-IT" style={{ marginBottom: 8 }}>
                      {passage.category}
                    </span>
                    {isDone && (
                      <span className="badge" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', marginLeft: 6 }}>
                        ✅ Fait
                      </span>
                    )}
                  </div>
                  <span className={`badge badge-${passage.level}`}>{passage.level}</span>
                </div>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {passage.title}
                </h3>
                <div style={{ display: 'flex', gap: 12, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  <span>📄 {passage.wordCount} mots</span>
                  <span>❓ {passage.questions.length} questions</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.5 }}>
                  {passage.text.substring(0, 100).replace(/\n/g, ' ')}...
                </p>
                <button
                  className={`btn ${isDone ? 'btn-ghost' : 'btn-primary'} btn-sm w-full`}
                  style={{ marginTop: 16 }}
                  onClick={e => { e.stopPropagation(); selectPassage(passage); }}
                >
                  {isDone ? '🔄 Refaire' : '▶ Commencer'}
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
    const q = selectedPassage.questions;
    const total = q.length;
    const correct = Object.values(allAnswers).filter(a => a.correct).length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">📖 Lecture</h1>
        </div>
        <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>
              {percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '📚'}
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-2xl)', marginBottom: 8 }}>
              {selectedPassage.title}
            </h2>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: percent >= 70 ? 'var(--color-success)' : 'var(--color-warning)' }}>
              {correct}/{total}
            </div>
            <div className="text-muted">{percent}% de bonnes réponses</div>
          </div>

          {/* Review answers */}
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Révision des réponses</h3>
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
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {wasCorrect ? '✅' : '❌'} Q{idx + 1}: {question.question}
                  </div>
                  {!wasCorrect && (
                    <div style={{ fontSize: 'var(--font-size-sm)', color: '#7f1d1d', marginBottom: 4 }}>
                      Bonne réponse : "{question.options[question.correct]}"
                    </div>
                  )}
                  <div style={{ fontSize: 'var(--font-size-sm)', color: wasCorrect ? '#14532d' : '#7f1d1d' }}>
                    💡 {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => selectPassage(selectedPassage)}>
              🔄 Recommencer
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setSelectedPassage(null)}>
              ← Retour aux textes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reading exercise
  const currentQuestion = selectedPassage.questions[currentQuestionIndex];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => { setSelectedPassage(null); stopSpeaking(); }} style={{ marginBottom: 8 }}>
            ← Retour
          </button>
          <h1 className="page-title">{selectedPassage.title}</h1>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <span className="badge badge-IT">{selectedPassage.category}</span>
            <span className={`badge badge-${selectedPassage.level}`}>{selectedPassage.level}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>
              {selectedPassage.wordCount} mots
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {/* Text size */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['small', 'base', 'large', 'xlarge'].map(size => (
              <button
                key={size}
                className={`btn btn-ghost btn-sm ${textSize === size ? 'btn-outline' : ''}`}
                onClick={() => setTextSize(size)}
                title={`Taille ${size}`}
                style={{ fontSize: size === 'small' ? 12 : size === 'large' ? 18 : size === 'xlarge' ? 22 : 16, padding: '6px 10px', minHeight: 32 }}
              >
                A
              </button>
            ))}
          </div>
          {/* TTS button */}
          <button
            className={`btn btn-sm ${isSpeaking ? 'btn-warning' : 'btn-outline'}`}
            onClick={handleSpeak}
          >
            {isSpeaking ? '⏹ Arrêter' : '🔊 Écouter'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-16" style={{ height: 8 }}>
        <div
          className="progress-fill reading"
          style={{ width: `${(currentQuestionIndex / selectedPassage.questions.length) * 100}%` }}
        />
      </div>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 16 }}>
        Question <strong>{currentQuestionIndex + 1}</strong> sur <strong>{selectedPassage.questions.length}</strong>
      </div>

      {/* Content */}
      <div className="reading-layout">
        {/* Passage */}
        <div className="card" style={{ position: 'sticky', top: 16, maxHeight: '75vh', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>Texte</h2>
            <button className="btn btn-ghost btn-sm" onClick={handleSpeak}>
              {isSpeaking ? '⏹' : '🔊'}
            </button>
          </div>
          <div
            className="reading-text"
            style={TEXT_SIZES[textSize]}
          >
            {selectedPassage.text}
          </div>
        </div>

        {/* Questions */}
        <div>
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
                  {isAnswered && idx === currentQuestion.correct && (
                    <span style={{ marginLeft: 'auto' }}>✅</span>
                  )}
                  {isAnswered && idx === selectedAnswer && idx !== currentQuestion.correct && (
                    <span style={{ marginLeft: 'auto' }}>❌</span>
                  )}
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

          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
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
                {currentQuestionIndex + 1 >= selectedPassage.questions.length
                  ? '📊 Voir les résultats'
                  : 'Question suivante →'}
              </button>
            )}
          </div>

          {/* Score */}
          <div className="card mt-16" style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-success)' }}>
                  {score.correct}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>✅ Correctes</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-error)' }}>
                  {score.total - score.correct}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>❌ Incorrectes</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {selectedPassage.questions.length - (currentQuestionIndex + (isAnswered ? 1 : 0))}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Restantes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
