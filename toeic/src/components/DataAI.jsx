import React, { useState, useEffect } from 'react';
import { dataAIContent } from '../data/dataAI.js';
import { getProgress, saveProgress } from '../utils/storage.js';

const CATEGORIES = ['Tous', 'Data-Basics', 'BI-Tools', 'ML-AI', 'GenAI', 'Ethics', 'Governance'];
const CAT_COLORS = {
  'Data-Basics': '#2563eb',
  'BI-Tools': '#7c3aed',
  'ML-AI': '#059669',
  'GenAI': '#d97706',
  'Ethics': '#dc2626',
  'Governance': '#0891b2',
};

export default function DataAI({ settings }) {
  const [activeTab, setActiveTab] = useState('concepts');
  const [dataProgress, setDataProgress] = useState(() => {
    const p = getProgress();
    return p.dataAi || { knownConcepts: [], quizScores: [], promptsCompleted: [], bestQuizScore: 0 };
  });

  const [catFilter, setCatFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const [expandedConcept, setExpandedConcept] = useState(null);

  const [quizState, setQuizState] = useState({ catFilter: 'Tous', current: 0, answered: null, correct: null, score: 0, total: 0, finished: false });
  const [shuffledQuiz, setShuffledQuiz] = useState([]);

  const [promptIndex, setPromptIndex] = useState(0);
  const [promptPhase, setPromptPhase] = useState('task');
  const [promptChoice, setPromptChoice] = useState(null);

  function saveDataProgress(updates) {
    const updated = { ...dataProgress, ...updates };
    setDataProgress(updated);
    saveProgress('dataAi', updated);
  }

  useEffect(() => {
    const filtered = quizState.catFilter === 'Tous'
      ? [...dataAIContent.quizzes]
      : dataAIContent.quizzes.filter(q => q.topic === quizState.catFilter);
    setShuffledQuiz(filtered.sort(() => Math.random() - 0.5));
    setQuizState(s => ({ ...s, current: 0, answered: null, correct: null, score: 0, total: 0, finished: false }));
  }, [quizState.catFilter]);

  function toggleKnown(conceptId) {
    const known = [...(dataProgress.knownConcepts || [])];
    if (known.includes(conceptId)) {
      saveDataProgress({ knownConcepts: known.filter(id => id !== conceptId) });
    } else {
      saveDataProgress({ knownConcepts: [...known, conceptId] });
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
      const scores = [...(dataProgress.quizScores || []), pct];
      const best = Math.max(dataProgress.bestQuizScore || 0, pct);
      saveDataProgress({ quizScores: scores, bestQuizScore: best });
      setQuizState(s => ({ ...s, finished: true }));
    } else {
      setQuizState(s => ({ ...s, current: s.current + 1, answered: null, correct: null }));
    }
  }

  function resetQuiz() {
    const filtered = quizState.catFilter === 'Tous'
      ? [...dataAIContent.quizzes]
      : dataAIContent.quizzes.filter(q => q.topic === quizState.catFilter);
    setShuffledQuiz(filtered.sort(() => Math.random() - 0.5));
    setQuizState(s => ({ ...s, current: 0, answered: null, correct: null, score: 0, total: 0, finished: false }));
  }

  function handlePromptChoice(choice) {
    setPromptChoice(choice);
    setPromptPhase('reveal');
    const done = [...(dataProgress.promptsCompleted || [])];
    const ex = dataAIContent.promptExercises[promptIndex];
    if (!done.includes(ex.id)) {
      saveDataProgress({ promptsCompleted: [...done, ex.id] });
    }
  }

  const filteredConcepts = dataAIContent.concepts.filter(c => {
    const matchCat = catFilter === 'Tous' || c.category === catFilter;
    const matchSearch = !search || c.term.toLowerCase().includes(search.toLowerCase()) || c.simple_explanation.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const knownCount = (dataProgress.knownConcepts || []).length;
  const totalConcepts = dataAIContent.concepts.length;
  const knownPct = Math.round((knownCount / totalConcepts) * 100);

  const currentPrompt = dataAIContent.promptExercises[promptIndex];
  const promptsDone = (dataProgress.promptsCompleted || []).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📊 Data & IA</h1>
        <p className="page-subtitle">Maîtrise les concepts Data, BI, Machine Learning et Intelligence Artificielle</p>
      </div>

      <div className="tabs mb-24">
        {[
          { id: 'concepts', label: 'Concepts', icon: '💡' },
          { id: 'quiz', label: 'Quiz', icon: '❓' },
          { id: 'prompt', label: 'Prompt Engineering', icon: '✍️' },
          { id: 'outils', label: 'Outils', icon: '🔧' },
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

      {/* CONCEPTS */}
      {activeTab === 'concepts' && (
        <div>
          <div className="card mb-16">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Progression : {knownCount} / {totalConcepts} concepts maîtrisés</div>
                <div className="progress-bar" style={{ width: 240, height: 10 }}>
                  <div className="progress-fill" style={{ width: `${knownPct}%`, background: 'linear-gradient(90deg, #059669, #2563eb)' }} />
                </div>
              </div>
              <div className="text-muted text-sm">{knownPct}% maîtrisés</div>
            </div>
          </div>

          <input
            className="form-input mb-16"
            placeholder="🔍 Rechercher un concept..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="filter-bar mb-16">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${catFilter === cat ? 'active' : ''}`}
                onClick={() => setCatFilter(cat)}
                style={catFilter === cat && cat !== 'Tous' ? { background: CAT_COLORS[cat], borderColor: CAT_COLORS[cat] } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
            {filteredConcepts.map(concept => {
              const isKnown = (dataProgress.knownConcepts || []).includes(concept.id);
              const expanded = expandedConcept === concept.id;
              const catColor = CAT_COLORS[concept.category] || '#2563eb';
              return (
                <div
                  key={concept.id}
                  className={`concept-card ${isKnown ? 'known' : ''}`}
                  style={{ borderLeft: `4px solid ${catColor}`, cursor: 'pointer' }}
                >
                  <div onClick={() => setExpandedConcept(expanded ? null : concept.id)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 'var(--font-size-base)' }}>
                        {concept.term}
                        {isKnown && <span style={{ marginLeft: 8, fontSize: 11, color: '#16a34a' }}>✓</span>}
                      </div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <span style={{ fontSize: 10, background: catColor + '20', color: catColor, padding: '2px 8px', borderRadius: 10, fontWeight: 700, flexShrink: 0 }}>{concept.category}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{concept.simple_explanation}</p>
                  </div>

                  {expanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
                      <p style={{ marginBottom: 12, lineHeight: 1.7 }}>{concept.detailed_explanation}</p>
                      <div style={{ background: 'var(--bg-main)', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>EXEMPLE CONCRET</div>
                        <p style={{ fontStyle: 'italic', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{concept.example}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className={`btn btn-sm ${isKnown ? 'btn-ghost' : 'btn-success'}`}
                          onClick={e => { e.stopPropagation(); toggleKnown(concept.id); }}
                        >
                          {isKnown ? '↩ À revoir' : '✓ Je maîtrise !'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredConcepts.length === 0 && (
              <div className="card text-center text-muted" style={{ gridColumn: '1/-1' }}>Aucun concept trouvé.</div>
            )}
          </div>
        </div>
      )}

      {/* QUIZ */}
      {activeTab === 'quiz' && (
        <div className="quiz-container">
          <div className="filter-bar mb-24">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${quizState.catFilter === cat ? 'active' : ''}`}
                onClick={() => setQuizState(s => ({ ...s, catFilter: cat }))}
              >
                {cat === 'Tous' ? 'Toutes les catégories' : cat}
              </button>
            ))}
          </div>

          {quizState.finished ? (
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>
                {quizState.score / quizState.total >= 0.8 ? '🎉' : '💪'}
              </div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 8 }}>Quiz Data & IA terminé !</h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 8 }}>
                {quizState.score} / {quizState.total}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                {Math.round((quizState.score / quizState.total) * 100)}% de bonnes réponses
              </p>
              <button className="btn btn-primary" onClick={resetQuiz}>🔄 Recommencer</button>
            </div>
          ) : shuffledQuiz.length === 0 ? (
            <div className="card text-center text-muted">Aucune question pour cette catégorie.</div>
          ) : (
            <div>
              <div className="quiz-progress mb-16">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Question {quizState.current + 1} / {shuffledQuiz.length}</span>
                  <span>Score : {quizState.score}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(quizState.current / shuffledQuiz.length) * 100}%` }} />
                </div>
              </div>

              {(() => {
                const q = shuffledQuiz[quizState.current];
                return (
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 11, background: CAT_COLORS[q.topic] ? CAT_COLORS[q.topic] + '20' : '#dbeafe', color: CAT_COLORS[q.topic] || '#2563eb', padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}>{q.topic}</span>
                    </div>
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
                          <div className="explanation-title">{quizState.correct ? '✅ Correct !' : '❌ Pas tout à fait...'}</div>
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

      {/* PROMPT ENGINEERING */}
      {activeTab === 'prompt' && (
        <div>
          <div className="card mb-16" style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', color: 'white' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Exercices complétés</div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{promptsDone} / {dataAIContent.promptExercises.length}</div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {dataAIContent.promptExercises.map((ex, i) => (
              <button
                key={ex.id}
                className={`filter-chip ${promptIndex === i ? 'active' : ''}`}
                onClick={() => { setPromptIndex(i); setPromptPhase('task'); setPromptChoice(null); }}
                style={{ display: 'flex', gap: 4, alignItems: 'center' }}
              >
                {(dataProgress.promptsCompleted || []).includes(ex.id) && <span>✓</span>}
                Ex. {i + 1}
              </button>
            ))}
          </div>

          {currentPrompt && (
            <div>
              <div className="card mb-16">
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>🎯 Tâche à accomplir</div>
                <h3 style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', marginBottom: 0 }}>{currentPrompt.task}</h3>
              </div>

              <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>Lequel de ces deux prompts va produire le meilleur résultat ?</p>

              <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Prompt A', prompt: currentPrompt.badPrompt, id: 'bad' },
                  { label: 'Prompt B', prompt: currentPrompt.goodPrompt, id: 'good' },
                ].sort(() => (Math.sin(promptIndex) > 0 ? 1 : -1)).map((item) => {
                  const chosen = promptChoice === item.id;
                  const revealed = promptPhase === 'reveal';
                  const isGood = item.id === 'good';
                  let borderColor = 'var(--border-color)';
                  if (revealed) borderColor = isGood ? '#16a34a' : '#dc2626';
                  else if (chosen) borderColor = 'var(--color-primary)';
                  return (
                    <div
                      key={item.id}
                      style={{
                        border: `2px solid ${borderColor}`,
                        borderRadius: 'var(--border-radius)',
                        padding: 20,
                        cursor: promptPhase === 'task' ? 'pointer' : 'default',
                        background: revealed ? (isGood ? '#f0fdf4' : '#fef2f2') : 'var(--bg-card)',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => promptPhase === 'task' && handlePromptChoice(item.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                        <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>{item.label}</span>
                        {revealed && (
                          <span style={{ fontWeight: 700, color: isGood ? '#16a34a' : '#dc2626' }}>
                            {isGood ? '✅ Meilleur prompt' : '❌ Prompt insuffisant'}
                          </span>
                        )}
                      </div>
                      <pre style={{
                        background: '#1e293b',
                        color: '#e2e8f0',
                        padding: 16,
                        borderRadius: 8,
                        fontSize: 13,
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                        lineHeight: 1.6,
                        margin: 0,
                      }}>
                        {item.prompt}
                      </pre>
                    </div>
                  );
                })}
              </div>

              {promptPhase === 'reveal' && (
                <div>
                  <div className="card mb-16" style={{ background: '#fefce8', borderColor: '#fbbf24' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: 8 }}>💡 Pourquoi le bon prompt est meilleur</div>
                    <p style={{ lineHeight: 1.7 }}>{currentPrompt.explanation}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {promptIndex > 0 && (
                      <button className="btn btn-ghost btn-sm" onClick={() => { setPromptIndex(i => i - 1); setPromptPhase('task'); setPromptChoice(null); }}>
                        ← Précédent
                      </button>
                    )}
                    {promptIndex < dataAIContent.promptExercises.length - 1 && (
                      <button className="btn btn-primary btn-sm" onClick={() => { setPromptIndex(i => i + 1); setPromptPhase('task'); setPromptChoice(null); }}>
                        Exercice suivant →
                      </button>
                    )}
                    {promptIndex === dataAIContent.promptExercises.length - 1 && (
                      <div style={{ padding: '8px 16px', background: 'var(--color-success-light)', borderRadius: 8, color: 'var(--color-success)', fontWeight: 600 }}>
                        🎉 Tous les exercices complétés !
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* OUTILS */}
      {activeTab === 'outils' && (
        <div>
          {dataAIContent.toolsComparison.map(comparison => (
            <div key={comparison.id} className="card mb-24">
              <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', marginBottom: 20 }}>{comparison.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {comparison.tools.map(tool => (
                  <div key={tool.name} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: 16, background: 'var(--bg-main)' }}>
                    <h3 style={{ fontWeight: 700, fontSize: 'var(--font-size-base)', marginBottom: 12, color: 'var(--color-primary)' }}>{tool.name}</h3>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', marginBottom: 6 }}>✅ Points forts</div>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {tool.strengths.map((s, i) => (
                          <li key={i} style={{ fontSize: 'var(--font-size-sm)', display: 'flex', gap: 6 }}>
                            <span style={{ color: '#16a34a', flexShrink: 0 }}>+</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: 6 }}>⚠️ Limites</div>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {tool.weaknesses.map((w, i) => (
                          <li key={i} style={{ fontSize: 'var(--font-size-sm)', display: 'flex', gap: 6 }}>
                            <span style={{ color: '#dc2626', flexShrink: 0 }}>−</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ background: '#eff6ff', padding: 10, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', marginBottom: 4 }}>🎯 Idéal pour</div>
                      <p style={{ fontSize: 'var(--font-size-sm)', margin: 0, lineHeight: 1.6 }}>{tool.useCase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
