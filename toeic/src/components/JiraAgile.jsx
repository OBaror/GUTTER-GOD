import React, { useState, useEffect } from 'react';
import { jiraContent } from '../data/jira.js';
import { getProgress, saveProgress } from '../utils/storage.js';

const CATEGORIES = ['Tous', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Ceremonies'];
const TOPICS = ['Tous', 'scrum-roles', 'ceremonies', 'artifacts', 'jira-ui', 'kanban', 'estimation'];
const TOPIC_LABELS = { 'scrum-roles': 'Rôles Scrum', ceremonies: 'Cérémonies', artifacts: 'Artefacts', 'jira-ui': 'Interface Jira', kanban: 'Kanban', estimation: 'Estimation' };

export default function JiraAgile({ settings }) {
  const [activeTab, setActiveTab] = useState('glossaire');
  const [jiraProgress, setJiraProgress] = useState(() => {
    const p = getProgress();
    return p.jira || { knownTerms: [], reviewTerms: [], quizScores: [], storiesCompleted: [], scenariosCompleted: [] };
  });

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Tous');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const [quizState, setQuizState] = useState({ topicFilter: 'Tous', current: 0, answered: null, correct: null, score: 0, total: 0, finished: false });
  const [shuffledQuiz, setShuffledQuiz] = useState([]);

  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPhase, setStoryPhase] = useState('bad');

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepChoice, setStepChoice] = useState(null);
  const [scenarioDone, setScenarioDone] = useState(false);

  useEffect(() => {
    const filtered = quizState.topicFilter === 'Tous'
      ? [...jiraContent.quizzes]
      : jiraContent.quizzes.filter(q => q.topic === quizState.topicFilter);
    setShuffledQuiz(filtered.sort(() => Math.random() - 0.5));
    setQuizState(s => ({ ...s, current: 0, answered: null, correct: null, score: 0, total: 0, finished: false }));
  }, [quizState.topicFilter]);

  function saveJiraProgress(updates) {
    const updated = { ...jiraProgress, ...updates };
    setJiraProgress(updated);
    saveProgress('jira', updated);
  }

  function toggleKnown(termId) {
    const knownTerms = [...(jiraProgress.knownTerms || [])];
    const reviewTerms = [...(jiraProgress.reviewTerms || [])];
    if (knownTerms.includes(termId)) {
      saveJiraProgress({ knownTerms: knownTerms.filter(id => id !== termId) });
    } else {
      saveJiraProgress({
        knownTerms: [...knownTerms, termId],
        reviewTerms: reviewTerms.filter(id => id !== termId)
      });
    }
  }

  function markReview(termId) {
    const reviewTerms = [...(jiraProgress.reviewTerms || [])];
    const knownTerms = [...(jiraProgress.knownTerms || [])];
    if (!reviewTerms.includes(termId)) {
      saveJiraProgress({
        reviewTerms: [...reviewTerms, termId],
        knownTerms: knownTerms.filter(id => id !== termId)
      });
    }
  }

  function handleQuizAnswer(optIdx) {
    if (quizState.answered !== null) return;
    const q = shuffledQuiz[quizState.current];
    const isCorrect = optIdx === q.correct;
    setQuizState(s => ({
      ...s,
      answered: optIdx,
      correct: isCorrect,
      score: isCorrect ? s.score + 1 : s.score,
      total: s.total + 1
    }));
  }

  function nextQuestion() {
    if (quizState.current + 1 >= shuffledQuiz.length) {
      const pct = quizState.score / (quizState.total || 1);
      const scores = [...(jiraProgress.quizScores || []), pct];
      const best = Math.max(...scores);
      saveJiraProgress({ quizScores: scores, bestQuizScore: best });
      setQuizState(s => ({ ...s, finished: true }));
    } else {
      setQuizState(s => ({ ...s, current: s.current + 1, answered: null, correct: null }));
    }
  }

  function resetQuiz() {
    const filtered = quizState.topicFilter === 'Tous'
      ? [...jiraContent.quizzes]
      : jiraContent.quizzes.filter(q => q.topic === quizState.topicFilter);
    setShuffledQuiz(filtered.sort(() => Math.random() - 0.5));
    setQuizState(s => ({ ...s, current: 0, answered: null, correct: null, score: 0, total: 0, finished: false }));
  }

  const filteredGlossary = jiraContent.glossary.filter(t => {
    const matchCat = catFilter === 'Tous' || t.category === catFilter;
    const matchSearch = !search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const knownCount = (jiraProgress.knownTerms || []).length;
  const totalTerms = jiraContent.glossary.length;
  const knownPct = Math.round((knownCount / totalTerms) * 100);

  const scenario = jiraContent.scenarios[scenarioIndex];
  const step = scenario ? scenario.steps[stepIndex] : null;

  function handleScenarioChoice(choiceIdx) {
    setStepChoice(choiceIdx);
  }

  function nextStep() {
    if (!scenario) return;
    if (stepIndex + 1 >= scenario.steps.length) {
      const done = [...(jiraProgress.scenariosCompleted || [])];
      if (!done.includes(scenario.id)) {
        saveJiraProgress({ scenariosCompleted: [...done, scenario.id] });
      }
      setScenarioDone(true);
    } else {
      setStepIndex(s => s + 1);
      setStepChoice(null);
    }
  }

  function nextScenario() {
    if (scenarioIndex + 1 < jiraContent.scenarios.length) {
      setScenarioIndex(s => s + 1);
    } else {
      setScenarioIndex(0);
    }
    setStepIndex(0);
    setStepChoice(null);
    setScenarioDone(false);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🎯 Jira & Agile</h1>
        <p className="page-subtitle">Maîtrise les méthodologies Agile, Scrum, Kanban et l'outil Jira</p>
      </div>

      <div className="tabs mb-24">
        {[
          { id: 'glossaire', label: 'Glossaire', icon: '📖' },
          { id: 'quiz', label: 'Quiz', icon: '❓' },
          { id: 'stories', label: 'User Stories', icon: '📝' },
          { id: 'scenarios', label: 'Scénarios', icon: '🎬' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* GLOSSAIRE */}
      {activeTab === 'glossaire' && (
        <div>
          <div className="card mb-16">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Progression : {knownCount} / {totalTerms} termes maîtrisés</div>
                <div className="progress-bar" style={{ width: 240, height: 10 }}>
                  <div className="progress-fill" style={{ width: `${knownPct}%`, background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />
                </div>
              </div>
              <div className="text-muted text-sm">{knownPct}% maîtrisés</div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <input
              className="form-input"
              placeholder="🔍 Rechercher un terme..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-bar mb-16">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${catFilter === cat ? 'active' : ''}`}
                onClick={() => setCatFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredGlossary.map(term => {
              const isKnown = (jiraProgress.knownTerms || []).includes(term.id);
              const isReview = (jiraProgress.reviewTerms || []).includes(term.id);
              return (
                <div
                  key={term.id}
                  className={`concept-card ${isKnown ? 'known' : ''}`}
                  style={{ borderLeft: `4px solid ${isKnown ? '#16a34a' : isReview ? '#d97706' : '#2563eb'}` }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: 12 }}
                    onClick={() => setSelectedTerm(selectedTerm === term.id ? null : term.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 'var(--font-size-base)', marginBottom: 2 }}>
                        {term.term}
                        {isKnown && <span style={{ marginLeft: 8, fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ Connu</span>}
                        {isReview && <span style={{ marginLeft: 8, fontSize: 12, color: '#d97706', fontWeight: 600 }}>⟳ À revoir</span>}
                      </div>
                      <span style={{ fontSize: 11, background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{term.category}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{selectedTerm === term.id ? '▲' : '▼'}</span>
                  </div>

                  {selectedTerm === term.id && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
                      <p style={{ marginBottom: 12, lineHeight: 1.7 }}>{term.definition}</p>
                      <div style={{ background: 'var(--bg-main)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>EXEMPLE</div>
                        <p style={{ fontStyle: 'italic', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{term.example}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button className="btn btn-success btn-sm" onClick={() => toggleKnown(term.id)}>
                          {isKnown ? '↩ Pas encore maîtrisé' : '✓ Je connais !'}
                        </button>
                        {!isKnown && (
                          <button className="btn btn-warning btn-sm" onClick={() => markReview(term.id)}>
                            ⟳ À revoir
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredGlossary.length === 0 && (
              <div className="card text-center text-muted">Aucun terme trouvé pour cette recherche.</div>
            )}
          </div>
        </div>
      )}

      {/* QUIZ */}
      {activeTab === 'quiz' && (
        <div className="quiz-container">
          <div className="filter-bar mb-24">
            {TOPICS.map(t => (
              <button
                key={t}
                className={`filter-chip ${quizState.topicFilter === t ? 'active' : ''}`}
                onClick={() => setQuizState(s => ({ ...s, topicFilter: t }))}
              >
                {t === 'Tous' ? 'Tous les sujets' : TOPIC_LABELS[t] || t}
              </button>
            ))}
          </div>

          {quizState.finished ? (
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>
                {quizState.score / quizState.total >= 0.8 ? '🎉' : quizState.score / quizState.total >= 0.5 ? '👍' : '💪'}
              </div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 8 }}>Quiz terminé !</h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 8 }}>
                {quizState.score} / {quizState.total}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                {Math.round((quizState.score / quizState.total) * 100)}% de bonnes réponses
              </p>
              <button className="btn btn-primary" onClick={resetQuiz}>🔄 Recommencer</button>
            </div>
          ) : shuffledQuiz.length === 0 ? (
            <div className="card text-center text-muted">Aucune question pour ce filtre.</div>
          ) : (
            <div>
              <div className="quiz-progress mb-16">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Question {quizState.current + 1} / {shuffledQuiz.length}</span>
                  <span>Score : {quizState.score}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${((quizState.current) / shuffledQuiz.length) * 100}%` }} />
                </div>
              </div>

              {(() => {
                const q = shuffledQuiz[quizState.current];
                return (
                  <div>
                    <div className="quiz-question">{q.question}</div>
                    <div className="quiz-options">
                      {q.options.map((opt, i) => {
                        let cls = 'quiz-option';
                        if (quizState.answered !== null) {
                          if (i === q.correct) cls += ' correct';
                          else if (i === quizState.answered && i !== q.correct) cls += ' incorrect';
                        }
                        return (
                          <button key={i} className={cls} onClick={() => handleQuizAnswer(i)} disabled={quizState.answered !== null}>
                            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizState.answered !== null && (
                      <div>
                        <div className={`quiz-explanation ${quizState.correct ? 'correct' : 'incorrect'}`}>
                          <div className="explanation-title">
                            {quizState.correct ? '✅ Correct !' : '❌ Pas tout à fait...'}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                        <button className="btn btn-primary btn-full mt-16" onClick={nextQuestion}>
                          {quizState.current + 1 >= shuffledQuiz.length ? 'Voir les résultats' : 'Question suivante →'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* USER STORIES */}
      {activeTab === 'stories' && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {jiraContent.userStories.map((s, i) => (
              <button
                key={s.id}
                className={`filter-chip ${storyIndex === i ? 'active' : ''}`}
                onClick={() => { setStoryIndex(i); setStoryPhase('bad'); }}
              >
                Exercice {i + 1}
              </button>
            ))}
          </div>

          {(() => {
            const story = jiraContent.userStories[storyIndex];
            return (
              <div>
                <div className="card mb-16">
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Contexte</div>
                  <p style={{ lineHeight: 1.7 }}>{story.context}</p>
                </div>

                <div className="card mb-16" style={{ borderLeft: '4px solid var(--color-error)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-error)', textTransform: 'uppercase', marginBottom: 8 }}>❌ Mauvaise User Story</div>
                  <p style={{ fontStyle: 'italic', fontSize: 'var(--font-size-base)', color: 'var(--text-primary)', marginBottom: storyPhase === 'bad' ? 16 : 0 }}>
                    "{story.badExample}"
                  </p>
                  {storyPhase === 'bad' && (
                    <button className="btn btn-outline btn-sm" onClick={() => setStoryPhase('reveal')}>
                      Pourquoi c'est mauvais ? →
                    </button>
                  )}
                </div>

                {storyPhase !== 'bad' && (
                  <>
                    <div className="card mb-16" style={{ borderLeft: '4px solid var(--color-success)' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase', marginBottom: 8 }}>✅ Bonne User Story</div>
                      <p style={{ fontStyle: 'italic', fontSize: 'var(--font-size-base)', color: 'var(--text-primary)' }}>
                        "{story.goodExample}"
                      </p>
                    </div>

                    <div className="card mb-16" style={{ background: '#fefce8', borderColor: '#fbbf24' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: 12 }}>💡 Pourquoi c'est mieux ?</div>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {story.tips.map((tip, i) => (
                          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ color: '#d97706', fontWeight: 700, flexShrink: 0 }}>•</span>
                            <span style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.7 }}>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      {storyIndex > 0 && (
                        <button className="btn btn-ghost btn-sm" onClick={() => { setStoryIndex(s => s - 1); setStoryPhase('bad'); }}>
                          ← Précédent
                        </button>
                      )}
                      {storyIndex < jiraContent.userStories.length - 1 && (
                        <button className="btn btn-primary btn-sm" onClick={() => { setStoryIndex(s => s + 1); setStoryPhase('bad'); }}>
                          Exercice suivant →
                        </button>
                      )}
                      {storyIndex === jiraContent.userStories.length - 1 && (
                        <div style={{ padding: '8px 16px', background: 'var(--color-success-light)', borderRadius: 8, color: 'var(--color-success)', fontWeight: 600 }}>
                          🎉 Tous les exercices complétés !
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* SCENARIOS */}
      {activeTab === 'scenarios' && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {jiraContent.scenarios.map((s, i) => (
              <button
                key={s.id}
                className={`filter-chip ${scenarioIndex === i ? 'active' : ''}`}
                onClick={() => { setScenarioIndex(i); setStepIndex(0); setStepChoice(null); setScenarioDone(false); }}
              >
                {s.title.length > 20 ? s.title.slice(0, 20) + '...' : s.title}
              </button>
            ))}
          </div>

          {scenario && (
            <div>
              <div className="card mb-16">
                <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', marginBottom: 8 }}>{scenario.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{scenario.description}</p>
              </div>

              {!scenarioDone && step && (
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                    Étape {stepIndex + 1} / {scenario.steps.length}
                  </div>
                  <div className="card mb-16" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ fontWeight: 600, marginBottom: 12 }}>🎬 Situation :</div>
                    <p style={{ lineHeight: 1.7 }}>{step.situation}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    {step.choices.map((choice, i) => {
                      const chosen = stepChoice === i;
                      const revealed = stepChoice !== null;
                      return (
                        <button
                          key={i}
                          className={`quiz-option ${revealed ? (choice.correct ? 'correct' : chosen ? 'incorrect' : '') : ''}`}
                          onClick={() => handleScenarioChoice(i)}
                          disabled={stepChoice !== null}
                        >
                          <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{choice.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {stepChoice !== null && (
                    <div>
                      <div className={`quiz-explanation ${step.choices[stepChoice].correct ? 'correct' : 'incorrect'}`}>
                        <div className="explanation-title">
                          {step.choices[stepChoice].correct ? '✅ Bonne décision !' : '❌ Pas optimal...'}
                        </div>
                        <p>{step.choices[stepChoice].feedback}</p>
                      </div>
                      <button className="btn btn-primary btn-full mt-16" onClick={nextStep}>
                        {stepIndex + 1 >= scenario.steps.length ? 'Voir les bonnes pratiques →' : 'Étape suivante →'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {scenarioDone && (
                <div className="card" style={{ background: 'var(--color-success-light)', borderColor: '#16a34a' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#14532d' }}>✅ Scénario terminé ! Bonnes pratiques :</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {scenario.bestPractices.map((bp, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10 }}>
                        <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                        <span style={{ lineHeight: 1.7 }}>{bp}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary mt-16" onClick={nextScenario}>
                    Scénario suivant →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
