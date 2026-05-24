import React, { useState, useEffect, useCallback } from 'react';
import { grammarExercises, grammarTopics } from '../data/grammar';
import { getProgress, saveProgress } from '../utils/storage';

const TOPIC_LABELS = {
  'verb-tense': 'Temps verbaux',
  'articles': 'Articles',
  'prepositions': 'Prépositions',
  'passive-voice': 'Voix passive',
  'conditionals': 'Conditionnels'
};

export default function Grammar({ settings }) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fillInput, setFillInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [topicResults, setTopicResults] = useState({});
  const [completedExercises, setCompletedExercises] = useState(new Set());

  useEffect(() => {
    const p = getProgress();
    setCompletedExercises(new Set(p.grammar.exercisesCompleted));

    const topicScores = {};
    grammarTopics.forEach(t => { topicScores[t] = { correct: 0, total: 0 }; });
    setTopicResults(topicScores);
  }, []);

  useEffect(() => {
    let filtered = [...grammarExercises];
    if (selectedTopic !== 'all') {
      filtered = filtered.filter(e => e.topic === selectedTopic);
    }
    setExercises(filtered);
    resetQuestion();
    setShowSummary(false);
    setScore({ correct: 0, incorrect: 0 });
    const topicScores = {};
    grammarTopics.forEach(t => { topicScores[t] = { correct: 0, total: 0 }; });
    setTopicResults(topicScores);
  }, [selectedTopic]);

  function resetQuestion() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setFillInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setHintsUsed(0);
  }

  const currentExercise = exercises[currentIndex];

  function checkAnswer() {
    if (!currentExercise) return;

    let correct = false;
    if (currentExercise.type === 'multiple-choice') {
      correct = selectedOption === currentExercise.correct;
    } else if (currentExercise.type === 'fill-blank') {
      const userAnswer = fillInput.trim().toLowerCase();
      const correctAnswer = currentExercise.correct.toLowerCase();
      correct = userAnswer === correctAnswer ||
        userAnswer === correctAnswer.replace(/[''']/g, "'");
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      incorrect: score.incorrect + (correct ? 0 : 1)
    };
    setScore(newScore);

    const newTopicResults = { ...topicResults };
    if (!newTopicResults[currentExercise.topic]) {
      newTopicResults[currentExercise.topic] = { correct: 0, total: 0 };
    }
    newTopicResults[currentExercise.topic].total += 1;
    if (correct) newTopicResults[currentExercise.topic].correct += 1;
    setTopicResults(newTopicResults);

    const newCompleted = new Set(completedExercises);
    newCompleted.add(currentExercise.id);
    setCompletedExercises(newCompleted);

    saveProgress('grammar', {
      totalExercises: exercises.length,
      correctAnswers: newScore.correct,
      incorrectAnswers: newScore.incorrect,
      exercisesCompleted: [...newCompleted],
      topicScores: newTopicResults
    });
  }

  function handleNext() {
    if (currentIndex + 1 >= exercises.length) {
      setShowSummary(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setFillInput('');
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    }
  }

  function handleHint() {
    setShowHint(true);
    setHintsUsed(h => h + 1);
  }

  function handleRestart() {
    resetQuestion();
    setShowSummary(false);
    setScore({ correct: 0, incorrect: 0 });
    const topicScores = {};
    grammarTopics.forEach(t => { topicScores[t] = { correct: 0, total: 0 }; });
    setTopicResults(topicScores);
  }

  function renderQuestion(ex) {
    const parts = ex.question.split('___');
    if (ex.type === 'fill-blank' && parts.length > 1) {
      return (
        <span>
          {parts[0]}
          <input
            type="text"
            className="form-input fill-blank"
            value={fillInput}
            onChange={e => setFillInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !isAnswered) checkAnswer(); }}
            placeholder="?"
            disabled={isAnswered}
            aria-label="Votre réponse"
            style={{ fontSize: 'var(--font-size-base)' }}
          />
          {parts[1]}
        </span>
      );
    }
    return ex.question;
  }

  if (showSummary) {
    const total = score.correct + score.incorrect;
    const percent = total > 0 ? Math.round((score.correct / total) * 100) : 0;

    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">✏️ Grammaire</h1>
        </div>
        <div className="card" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '4rem', marginBottom: 12 }}>
              {percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '📚'}
            </div>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 8 }}>
              Exercice terminé !
            </h2>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: percent >= 70 ? 'var(--color-success)' : 'var(--color-warning)' }}>
              {score.correct}/{total}
            </div>
            <div className="text-muted">{percent}% de bonnes réponses</div>
            {hintsUsed > 0 && (
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 8 }}>
                ({hintsUsed} indice{hintsUsed > 1 ? 's' : ''} utilisé{hintsUsed > 1 ? 's' : ''})
              </div>
            )}
          </div>

          {/* By topic */}
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Résultats par thème</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {Object.entries(topicResults).filter(([, v]) => v.total > 0).map(([topic, result]) => {
              const topicPercent = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
              return (
                <div key={topic}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 'var(--font-size-sm)' }}>
                    <span style={{ fontWeight: 600 }}>{TOPIC_LABELS[topic] || topic}</span>
                    <span style={{ color: topicPercent >= 70 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                      {result.correct}/{result.total} ({topicPercent}%)
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${topicPercent}%`,
                        background: topicPercent >= 70 ? 'var(--color-success)' : 'var(--color-warning)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleRestart}>
              🔄 Recommencer
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => {
              // Find weakest topic
              const weakest = Object.entries(topicResults)
                .filter(([, v]) => v.total > 0)
                .sort(([, a], [, b]) => (a.correct / a.total) - (b.correct / b.total))[0];
              if (weakest) setSelectedTopic(weakest[0]);
            }}>
              📖 Retravailler les erreurs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">✏️ Grammaire</h1>
        <p className="page-subtitle">Exercices de grammaire style TOEIC Part 5</p>
      </div>

      <div className="alert alert-info mb-24">
        <span className="alert-icon">💡</span>
        <span>
          Pour chaque question, lis attentivement. Si tu bloques, utilise l'indice (mais ça coûte un point !).
          Les explications sont en français pour mieux comprendre.
        </span>
      </div>

      {/* Topic filter */}
      <div className="filter-bar mb-24">
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'center', marginRight: 4 }}>
          Thème :
        </span>
        <button
          className={`filter-chip ${selectedTopic === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTopic('all')}
        >
          Tous ({grammarExercises.length})
        </button>
        {grammarTopics.map(topic => (
          <button
            key={topic}
            className={`filter-chip ${selectedTopic === topic ? 'active' : ''}`}
            onClick={() => setSelectedTopic(topic)}
          >
            {TOPIC_LABELS[topic]} ({grammarExercises.filter(e => e.topic === topic).length})
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="quiz-progress mb-16">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 'var(--font-size-sm)' }}>
          <span>Question <strong>{currentIndex + 1}</strong> sur <strong>{exercises.length}</strong></span>
          <span>
            <span style={{ color: 'var(--color-success)' }}>✅ {score.correct}</span>
            {' / '}
            <span style={{ color: 'var(--color-error)' }}>❌ {score.incorrect}</span>
          </span>
        </div>
        <div className="progress-bar" style={{ height: 8 }}>
          <div
            className="progress-fill grammar"
            style={{ width: `${exercises.length > 0 ? ((currentIndex) / exercises.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {exercises.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p>Aucun exercice trouvé. Change le filtre.</p>
        </div>
      ) : currentExercise ? (
        <div className="quiz-container">
          {/* Topic + level badge */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span className="badge badge-B1" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              {TOPIC_LABELS[currentExercise.topic] || currentExercise.topic}
            </span>
            <span className={`badge badge-${currentExercise.level}`}>
              {currentExercise.level}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
              #{currentExercise.id}
            </span>
          </div>

          {/* Question */}
          <div className="quiz-question">
            {renderQuestion(currentExercise)}
          </div>

          {/* Hint */}
          {showHint && currentExercise.type !== 'fill-blank' && currentExercise.options.length > 0 && (
            <div className="alert alert-warning mb-16">
              <span className="alert-icon">💡</span>
              <span>
                <strong>Indice :</strong> Élimine les mauvaises réponses. La bonne réponse concerne{' '}
                "{TOPIC_LABELS[currentExercise.topic]}" en anglais.
              </span>
            </div>
          )}
          {showHint && currentExercise.type === 'fill-blank' && (
            <div className="alert alert-warning mb-16">
              <span className="alert-icon">💡</span>
              <span>
                <strong>Indice :</strong> La réponse commence par "{currentExercise.correct.charAt(0).toUpperCase()}"
                et contient {currentExercise.correct.split(' ').length} mot(s).
              </span>
            </div>
          )}

          {/* Options */}
          {currentExercise.type === 'multiple-choice' && (
            <div className="quiz-options">
              {currentExercise.options.map((option, idx) => {
                let optClass = 'quiz-option';
                if (isAnswered) {
                  if (idx === currentExercise.correct) optClass += ' correct';
                  else if (idx === selectedOption && idx !== currentExercise.correct) optClass += ' incorrect';
                } else if (idx === selectedOption) {
                  optClass += ' selected';
                }
                return (
                  <button
                    key={idx}
                    className={optClass}
                    onClick={() => !isAnswered && setSelectedOption(idx)}
                    disabled={isAnswered}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                    <span>{option}</span>
                    {isAnswered && idx === currentExercise.correct && (
                      <span style={{ marginLeft: 'auto' }}>✅</span>
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentExercise.correct && (
                      <span style={{ marginLeft: 'auto' }}>❌</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill blank submit */}
          {currentExercise.type === 'fill-blank' && !isAnswered && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 8 }}>
                Écris ta réponse dans le champ ci-dessus, puis clique sur Valider.
              </p>
            </div>
          )}

          {/* Fill blank result */}
          {currentExercise.type === 'fill-blank' && isAnswered && (
            <div className={`quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginBottom: 16 }}>
              <div className="explanation-title">
                {isCorrect ? '✅' : '❌'}
                {isCorrect ? ' Correct !' : ` Incorrect. La bonne réponse est : "${currentExercise.correct}"`}
              </div>
            </div>
          )}

          {/* Explanation */}
          {isAnswered && (
            <div className={`quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="explanation-title">
                {isCorrect ? '✅ Très bien !' : '❌ Pas tout à fait...'}
              </div>
              <p>{currentExercise.explanation}</p>
              {!isCorrect && currentExercise.type === 'multiple-choice' && (
                <p style={{ marginTop: 8, fontWeight: 600 }}>
                  Bonne réponse : "{currentExercise.options[currentExercise.correct]}"
                </p>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            {!isAnswered && (
              <>
                {!showHint && (
                  <button className="btn btn-ghost" onClick={handleHint}>
                    💡 Indice (-1 point)
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={checkAnswer}
                  disabled={
                    (currentExercise.type === 'multiple-choice' && selectedOption === null) ||
                    (currentExercise.type === 'fill-blank' && fillInput.trim() === '')
                  }
                >
                  ✅ Valider
                </button>
              </>
            )}
            {isAnswered && (
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleNext}
              >
                {currentIndex + 1 >= exercises.length ? '📊 Voir les résultats' : 'Question suivante →'}
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* Session stats */}
      <div className="card mt-24">
        <h3 className="card-title">📊 Statistiques de session</h3>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-value">{score.correct + score.incorrect}</div>
            <div className="stat-label-sm">Questions répondues</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--color-success)' }}>{score.correct}</div>
            <div className="stat-label-sm">✅ Correctes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--color-error)' }}>{score.incorrect}</div>
            <div className="stat-label-sm">❌ Incorrectes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedExercises.size}</div>
            <div className="stat-label-sm">Total complétées</div>
          </div>
        </div>
      </div>
    </div>
  );
}
