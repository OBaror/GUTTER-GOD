import React, { useState, useEffect, useRef, useCallback } from 'react';
import { grammarExercises } from '../data/grammar';
import { readingPassages } from '../data/reading';
import { getProgress, saveProgress } from '../utils/storage';

const TEST_CONFIGS = {
  part5: {
    id: 'part5',
    name: 'Part 5 - Grammaire',
    icon: '✏️',
    desc: 'Compléter des phrases (structure grammaticale)',
    duration: 15 * 60,
    questionCount: 20,
    color: '#ede9fe'
  },
  part7: {
    id: 'part7',
    name: 'Part 7 - Lecture',
    icon: '📖',
    desc: 'Compréhension de textes (emails, rapports)',
    duration: 20 * 60,
    questionCount: 20,
    color: '#d1fae5'
  },
  mini: {
    id: 'mini',
    name: 'Mini-Test Complet',
    icon: '📝',
    desc: '10 grammaire + 10 lecture (30 minutes)',
    duration: 30 * 60,
    questionCount: 20,
    color: '#dbeafe'
  }
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMiniTest() {
  const grammarQs = shuffleArray(grammarExercises)
    .filter(e => e.type === 'multiple-choice')
    .slice(0, 10)
    .map(e => ({ ...e, _section: 'grammar' }));

  const readingQs = [];
  const passages = shuffleArray(readingPassages).slice(0, 3);
  for (const p of passages) {
    for (const q of p.questions.slice(0, 4)) {
      readingQs.push({ ...q, _section: 'reading', _passageTitle: p.title, _passageText: p.text });
      if (readingQs.length >= 10) break;
    }
    if (readingQs.length >= 10) break;
  }

  return [...grammarQs, ...readingQs.slice(0, 10)];
}

function buildPart5Questions() {
  return shuffleArray(grammarExercises)
    .filter(e => e.type === 'multiple-choice')
    .slice(0, 20)
    .map(e => ({ ...e, _section: 'grammar' }));
}

function buildPart7Questions() {
  const questions = [];
  for (const passage of readingPassages) {
    for (const q of passage.questions) {
      questions.push({
        ...q,
        _section: 'reading',
        _passageTitle: passage.title,
        _passageText: passage.text,
        _passageCategory: passage.category
      });
    }
    if (questions.length >= 20) break;
  }
  return questions.slice(0, 20);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function PracticeTest({ settings, onNavigate }) {
  const [phase, setPhase] = useState('select'); // select | test | summary
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimer, setShowTimer] = useState(settings?.showTimer || false);
  const [completedTests, setCompletedTests] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const p = getProgress();
    setCompletedTests(p.practiceTests.testsCompleted || []);
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timerActive && timeLeft === 0) {
      finishTest();
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft]);

  function startTest(configId) {
    const config = TEST_CONFIGS[configId];
    let qs = [];
    if (configId === 'part5') qs = buildPart5Questions();
    else if (configId === 'part7') qs = buildPart7Questions();
    else qs = buildMiniTest();

    setSelectedConfig(config);
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimeLeft(config.duration);
    setTimerActive(showTimer);
    setPhase('test');
    window.scrollTo(0, 0);
  }

  function handleSelectOption(idx) {
    if (isAnswered) return;
    setSelectedOption(idx);
  }

  function submitAnswer() {
    if (selectedOption === null) return;
    const q = questions[currentIndex];
    const correct = selectedOption === q.correct;
    setIsCorrect(correct);
    setIsAnswered(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: { selected: selectedOption, correct, question: q } }));
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      finishTest();
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }

  function finishTest() {
    setTimerActive(false);
    clearTimeout(timerRef.current);

    // Make sure current answer is saved
    const finalAnswers = { ...answers };
    if (selectedOption !== null && !isAnswered) {
      const q = questions[currentIndex];
      const correct = selectedOption === q.correct;
      finalAnswers[currentIndex] = { selected: selectedOption, correct, question: q };
    }
    setAnswers(finalAnswers);
    setPhase('summary');

    // Save to progress
    const correctCount = Object.values(finalAnswers).filter(a => a.correct).length;
    const total = questions.length;
    const scorePercent = Math.round((correctCount / total) * 100);

    const testResult = {
      id: Date.now(),
      type: selectedConfig.id,
      score: correctCount,
      total,
      percent: scorePercent,
      date: new Date().toISOString()
    };

    const newCompleted = [...completedTests, testResult];
    setCompletedTests(newCompleted);

    const p = getProgress();
    saveProgress('practiceTests', {
      testsCompleted: newCompleted,
      bestScore: Math.max(p.practiceTests.bestScore || 0, scorePercent),
      lastTest: testResult
    });
  }

  // Selection screen
  if (phase === 'select') {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">📝 Test Pratique TOEIC</h1>
          <p className="page-subtitle">Simule les conditions de l'examen et évalue ton niveau</p>
        </div>

        <div className="alert alert-info mb-24">
          <span className="alert-icon">ℹ️</span>
          <div>
            <strong>Format TOEIC :</strong> L'examen TOEIC comporte 200 questions (100 écoute + 100 lecture).
            Le test pratique ici se concentre sur les parties Reading (Part 5, 6, 7).
            Chaque bonne réponse augmente ton score estimé !
          </div>
        </div>

        {/* History */}
        {completedTests.length > 0 && (
          <div className="card mb-24">
            <h2 className="card-title">📊 Historique des tests</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {completedTests.slice(-5).reverse().map((test, idx) => (
                <div
                  key={test.id || idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'var(--bg-main)',
                    borderRadius: 'var(--border-radius-sm)',
                    flexWrap: 'wrap',
                    gap: 8
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600 }}>{TEST_CONFIGS[test.type]?.name || test.type}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>
                      {new Date(test.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <span style={{
                    fontWeight: 700,
                    color: test.percent >= 70 ? 'var(--color-success)' : test.percent >= 50 ? 'var(--color-warning)' : 'var(--color-error)'
                  }}>
                    {test.score}/{test.total} ({test.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timer option */}
        <div className="card mb-24" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-input"
                checked={showTimer}
                onChange={e => setShowTimer(e.target.checked)}
              />
              <div className={`toggle-track ${showTimer ? 'active' : ''}`}>
                <div className="toggle-thumb" />
              </div>
              <span className="toggle-label" style={{ fontWeight: 600 }}>
                ⏱️ Activer le minuteur
              </span>
            </label>
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 8 }}>
            En mode minuteur, le test s'arrête automatiquement quand le temps est écoulé (comme au vrai examen).
          </p>
        </div>

        {/* Test options */}
        <div className="test-parts-grid">
          {Object.values(TEST_CONFIGS).map(config => (
            <div
              key={config.id}
              className="test-part-card"
              style={{ background: config.color }}
              onClick={() => startTest(config.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && startTest(config.id)}
            >
              <div className="test-part-icon">{config.icon}</div>
              <div className="test-part-name">{config.name}</div>
              <div className="test-part-desc" style={{ marginBottom: 12 }}>{config.desc}</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                  {config.questionCount} questions
                </span>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                  ⏱ {Math.round(config.duration / 60)} min
                </span>
              </div>
              <button className="btn btn-primary btn-sm w-full">
                ▶ Commencer
              </button>
            </div>
          ))}
        </div>

        {/* TOEIC tips */}
        <div className="card mt-24">
          <h2 className="card-title">💡 Conseils pour l'examen TOEIC</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '⏰', title: 'Gestion du temps', tip: 'Ne reste pas bloqué sur une question. Passe à la suivante et reviens si tu as le temps.' },
              { icon: '🎯', title: 'Élimination', tip: 'En cas de doute, élimine les réponses clairement fausses avant de choisir.' },
              { icon: '📖', title: 'Lire la question d\'abord', tip: 'Pour la lecture, lis d\'abord les questions, puis cherche les réponses dans le texte.' },
              { icon: '🔊', title: 'Écoute active', tip: 'Pour l\'écoute, concentre-toi sur les mots-clés : chiffres, noms, dates, lieux.' },
            ].map(tip => (
              <div
                key={tip.title}
                style={{ padding: 16, background: 'var(--bg-main)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{tip.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{tip.title}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tip.tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Summary screen
  if (phase === 'summary') {
    const correctCount = Object.values(answers).filter(a => a.correct).length;
    const total = questions.length;
    const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const grammarAnswers = Object.values(answers).filter(a => a.question?._section === 'grammar');
    const readingAnswers = Object.values(answers).filter(a => a.question?._section === 'reading');
    const grammarPercent = grammarAnswers.length > 0
      ? Math.round((grammarAnswers.filter(a => a.correct).length / grammarAnswers.length) * 100) : null;
    const readingPercent = readingAnswers.length > 0
      ? Math.round((readingAnswers.filter(a => a.correct).length / readingAnswers.length) * 100) : null;

    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">📊 Résultats du test</h1>
        </div>
        <div className="card" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '4rem', marginBottom: 12 }}>
              {percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '💪'}
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-2xl)', marginBottom: 8 }}>
              {selectedConfig.name}
            </h2>
            <div style={{ fontSize: '4rem', fontWeight: 700, color: percent >= 70 ? 'var(--color-success)' : percent >= 50 ? 'var(--color-warning)' : 'var(--color-error)' }}>
              {correctCount}/{total}
            </div>
            <div className="text-muted" style={{ fontSize: 'var(--font-size-lg)' }}>{percent}% de réponses correctes</div>
          </div>

          {/* Breakdown */}
          {(grammarAnswers.length > 0 || readingAnswers.length > 0) && (
            <div className="stat-grid mb-24">
              {grammarAnswers.length > 0 && (
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--color-accent)' }}>{grammarPercent}%</div>
                  <div className="stat-label-sm">✏️ Grammaire</div>
                </div>
              )}
              {readingAnswers.length > 0 && (
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--color-secondary)' }}>{readingPercent}%</div>
                  <div className="stat-label-sm">📖 Lecture</div>
                </div>
              )}
              <div className="stat-card">
                <div className="stat-value">{total - correctCount}</div>
                <div className="stat-label-sm">❌ Erreurs</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{correctCount}</div>
                <div className="stat-label-sm">✅ Correctes</div>
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className={`alert ${percent >= 70 ? 'alert-success' : 'alert-warning'} mb-24`}>
            <span className="alert-icon">{percent >= 70 ? '🎯' : '📚'}</span>
            <div>
              {percent >= 80 && <p><strong>Excellent !</strong> Tu maîtrises bien ce contenu. Continue sur cette lancée !</p>}
              {percent >= 60 && percent < 80 && <p><strong>Bien !</strong> Tu es sur la bonne voie. Travaille encore la grammaire et le vocabulaire.</p>}
              {percent < 60 && <p><strong>Continue !</strong> Revois les leçons de grammaire et de vocabulaire avant de refaire ce test.</p>}
              {grammarPercent !== null && grammarPercent < 60 && (
                <p style={{ marginTop: 6 }}>💡 Conseil : Entraîne-toi davantage en <strong>Grammaire</strong> (section ✏️).</p>
              )}
              {readingPercent !== null && readingPercent < 60 && (
                <p style={{ marginTop: 6 }}>💡 Conseil : Lis plus de textes dans la section <strong>Lecture</strong> (section 📖).</p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => startTest(selectedConfig.id)}>
              🔄 Recommencer
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setPhase('select')}>
              ← Choisir un test
            </button>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
            {grammarPercent !== null && grammarPercent < 70 && (
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => onNavigate('grammar')}>
                ✏️ Réviser la grammaire
              </button>
            )}
            {readingPercent !== null && readingPercent < 70 && (
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => onNavigate('reading')}>
                📖 Lire plus de textes
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Test screen
  const currentQuestion = questions[currentIndex];
  const isTimerWarning = showTimer && timeLeft < 120;
  const lastPassageTitle = currentIndex > 0 ? questions[currentIndex - 1]?._passageTitle : null;
  const isNewPassage = currentQuestion?._passageText && currentQuestion?._passageTitle !== lastPassageTitle;

  return (
    <div className="page-container">
      {/* Test header */}
      <div className="test-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>{selectedConfig.name}</div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Question {currentIndex + 1} / {questions.length}
          </div>
        </div>

        {showTimer && (
          <div className={`timer-display ${isTimerWarning ? 'warning' : ''}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
        )}

        <button className="btn btn-ghost btn-sm" onClick={finishTest}>
          Terminer le test
        </button>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-24" style={{ height: 8 }}>
        <div
          className="progress-fill"
          style={{
            width: `${(currentIndex / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))'
          }}
        />
      </div>

      <div className="quiz-container">
        {/* Section badge */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {currentQuestion?._section === 'grammar' && (
            <span className="badge badge-B1" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              ✏️ Grammaire
            </span>
          )}
          {currentQuestion?._section === 'reading' && (
            <span className="badge" style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary-dark)' }}>
              📖 Lecture
            </span>
          )}
          {currentQuestion?.level && (
            <span className={`badge badge-${currentQuestion.level}`}>{currentQuestion.level}</span>
          )}
          {currentQuestion?.topic && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>
              {currentQuestion.topic}
            </span>
          )}
        </div>

        {/* Reading passage */}
        {currentQuestion?._passageText && (
          <div className="card mb-16" style={{ background: '#f8fafc', border: '1px solid var(--border-color)', maxHeight: 300, overflow: 'auto' }}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              📄 {currentQuestion._passageTitle || 'Texte'}
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {currentQuestion._passageText}
            </p>
          </div>
        )}

        {/* Question */}
        <div className="quiz-question">
          {currentQuestion?.question}
        </div>

        {/* Options */}
        <div className="quiz-options">
          {currentQuestion?.options?.map((option, idx) => {
            let optClass = 'quiz-option';
            if (isAnswered) {
              if (idx === currentQuestion.correct) optClass += ' correct';
              else if (idx === selectedOption && idx !== currentQuestion.correct) optClass += ' incorrect';
            } else if (idx === selectedOption) {
              optClass += ' selected';
            }
            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correct && <span style={{ marginLeft: 'auto' }}>✅</span>}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correct && <span style={{ marginLeft: 'auto' }}>❌</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after answering) */}
        {isAnswered && currentQuestion?.explanation && (
          <div className={`quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="explanation-title">
              {isCorrect ? '✅ Correct !' : '❌ Incorrect'}
            </div>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          {!isAnswered ? (
            <button
              className="btn btn-primary w-full"
              onClick={submitAnswer}
              disabled={selectedOption === null}
            >
              ✅ Valider
            </button>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={handleNext}
            >
              {currentIndex + 1 >= questions.length ? '📊 Voir les résultats' : 'Suivant →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
