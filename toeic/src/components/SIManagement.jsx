import React, { useState, useEffect } from 'react';
import { siContent } from '../data/siManagement.js';
import { getProgress, saveProgress } from '../utils/storage.js';

const CONCEPT_CATEGORIES = ['Tous', 'ERP', 'Cloud', 'Security', 'Architecture', 'Governance', 'Digital'];
const CAT_COLORS = { ERP: '#7c3aed', Cloud: '#2563eb', Security: '#dc2626', Architecture: '#059669', Governance: '#d97706', Digital: '#0891b2' };

export default function SIManagement({ settings }) {
  const [activeTab, setActiveTab] = useState('frameworks');
  const [siProgress, setSiProgress] = useState(() => {
    const p = getProgress();
    return p.siManagement || { knownConcepts: [], frameworksViewed: [], quizScores: [], caseScores: {}, bestQuizScore: 0 };
  });

  const [expandedFramework, setExpandedFramework] = useState(null);
  const [catFilter, setCatFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const [expandedConcept, setExpandedConcept] = useState(null);

  const [quizState, setQuizState] = useState({ catFilter: 'Tous', current: 0, answered: null, correct: null, score: 0, total: 0, finished: false });
  const [shuffledQuiz, setShuffledQuiz] = useState([]);

  const [caseIndex, setCaseIndex] = useState(0);
  const [caseQIndex, setCaseQIndex] = useState(0);
  const [caseAnswered, setCaseAnswered] = useState(null);
  const [caseScore, setCaseScore] = useState(0);
  const [caseDone, setCaseDone] = useState(false);

  function saveSIProgress(updates) {
    const updated = { ...siProgress, ...updates };
    setSiProgress(updated);
    saveProgress('siManagement', updated);
  }

  useEffect(() => {
    const filtered = quizState.catFilter === 'Tous'
      ? [...siContent.quizzes]
      : siContent.quizzes.filter(q => q.topic === quizState.catFilter);
    setShuffledQuiz(filtered.sort(() => Math.random() - 0.5));
    setQuizState(s => ({ ...s, current: 0, answered: null, correct: null, score: 0, total: 0, finished: false }));
  }, [quizState.catFilter]);

  function toggleFrameworkViewed(id) {
    const viewed = [...(siProgress.frameworksViewed || [])];
    if (!viewed.includes(id)) {
      saveSIProgress({ frameworksViewed: [...viewed, id] });
    }
    setExpandedFramework(expandedFramework === id ? null : id);
  }

  function toggleKnown(conceptId) {
    const known = [...(siProgress.knownConcepts || [])];
    if (known.includes(conceptId)) {
      saveSIProgress({ knownConcepts: known.filter(id => id !== conceptId) });
    } else {
      saveSIProgress({ knownConcepts: [...known, conceptId] });
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
      const scores = [...(siProgress.quizScores || []), pct];
      const best = Math.max(siProgress.bestQuizScore || 0, pct);
      saveSIProgress({ quizScores: scores, bestQuizScore: best });
      setQuizState(s => ({ ...s, finished: true }));
    } else {
      setQuizState(s => ({ ...s, current: s.current + 1, answered: null, correct: null }));
    }
  }

  function resetQuiz() {
    const filtered = quizState.catFilter === 'Tous'
      ? [...siContent.quizzes]
      : siContent.quizzes.filter(q => q.topic === quizState.catFilter);
    setShuffledQuiz(filtered.sort(() => Math.random() - 0.5));
    setQuizState(s => ({ ...s, current: 0, answered: null, correct: null, score: 0, total: 0, finished: false }));
  }

  function handleCaseAnswer(optIdx) {
    if (caseAnswered !== null) return;
    const cas = siContent.caseStudies[caseIndex];
    const q = cas.questions[caseQIndex];
    const isCorrect = optIdx === q.correct;
    setCaseAnswered(optIdx);
    if (isCorrect) setCaseScore(s => s + 1);
  }

  function nextCaseQuestion() {
    const cas = siContent.caseStudies[caseIndex];
    if (caseQIndex + 1 >= cas.questions.length) {
      const scores = { ...(siProgress.caseScores || {}), [cas.id]: caseScore + (caseAnswered === cas.questions[caseQIndex].correct ? 1 : 0) };
      saveSIProgress({ caseScores: scores });
      setCaseDone(true);
    } else {
      setCaseQIndex(q => q + 1);
      setCaseAnswered(null);
    }
  }

  function nextCase() {
    if (caseIndex + 1 < siContent.caseStudies.length) {
      setCaseIndex(c => c + 1);
    } else {
      setCaseIndex(0);
    }
    setCaseQIndex(0);
    setCaseAnswered(null);
    setCaseScore(0);
    setCaseDone(false);
  }

  const filteredConcepts = siContent.concepts.filter(c => {
    const matchCat = catFilter === 'Tous' || c.category === catFilter;
    const matchSearch = !search || c.term.toLowerCase().includes(search.toLowerCase()) || c.definition.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const knownCount = (siProgress.knownConcepts || []).length;
  const knownPct = Math.round((knownCount / siContent.concepts.length) * 100);
  const viewedFrameworks = (siProgress.frameworksViewed || []).length;

  const cas = siContent.caseStudies[caseIndex];
  const casQ = cas ? cas.questions[caseQIndex] : null;

  const TOPICS = ['Tous', 'ERP', 'Cloud', 'Security', 'Architecture', 'Governance', 'Frameworks'];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🖥️ SI Management</h1>
        <p className="page-subtitle">Frameworks, concepts et cas pratiques du Système d'Information</p>
      </div>

      <div className="tabs mb-24">
        {[
          { id: 'frameworks', label: 'Frameworks', icon: '🏗️' },
          { id: 'concepts', label: 'Concepts', icon: '💡' },
          { id: 'quiz', label: 'Quiz', icon: '❓' },
          { id: 'cas', label: 'Cas pratiques', icon: '📋' },
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

      {/* FRAMEWORKS */}
      {activeTab === 'frameworks' && (
        <div>
          <div className="card mb-16">
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Frameworks explorés : {viewedFrameworks} / {siContent.frameworks.length}</div>
            <div className="progress-bar" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: `${Math.round((viewedFrameworks / siContent.frameworks.length) * 100)}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {siContent.frameworks.map(fw => {
              const viewed = (siProgress.frameworksViewed || []).includes(fw.id);
              const expanded = expandedFramework === fw.id;
              return (
                <div key={fw.id} className="concept-card" style={{ borderLeft: `4px solid ${viewed ? '#7c3aed' : 'var(--border-color)'}` }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: 12 }}
                    onClick={() => toggleFrameworkViewed(fw.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>{fw.name}</span>
                        <span style={{ fontSize: 11, background: '#ede9fe', color: '#7c3aed', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{fw.level}</span>
                        {viewed && <span style={{ fontSize: 11, color: '#7c3aed' }}>✓ Vu</span>}
                      </div>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {expanded ? fw.description : fw.description.slice(0, 120) + '...'}
                      </p>
                    </div>
                    <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
                  </div>

                  {expanded && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Principes clés</div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {fw.keyPrinciples.map((p, i) => (
                            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                              <span style={{ color: '#7c3aed', fontWeight: 700, flexShrink: 0 }}>→</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ background: '#eff6ff', padding: 12, borderRadius: 8 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', marginBottom: 6 }}>🎯 Cas d'usage</div>
                        <p style={{ fontSize: 'var(--font-size-sm)', margin: 0, lineHeight: 1.6 }}>{fw.useCase}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONCEPTS */}
      {activeTab === 'concepts' && (
        <div>
          <div className="card mb-16">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Progression : {knownCount} / {siContent.concepts.length} concepts maîtrisés</div>
                <div className="progress-bar" style={{ width: 240, height: 10 }}>
                  <div className="progress-fill" style={{ width: `${knownPct}%`, background: 'linear-gradient(90deg, #7c3aed, #059669)' }} />
                </div>
              </div>
              <div className="text-muted text-sm">{knownPct}% maîtrisés</div>
            </div>
          </div>

          <input
            className="form-input mb-16"
            placeholder="🔍 Rechercher un concept SI..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="filter-bar mb-16">
            {CONCEPT_CATEGORIES.map(cat => (
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredConcepts.map(concept => {
              const isKnown = (siProgress.knownConcepts || []).includes(concept.id);
              const expanded = expandedConcept === concept.id;
              const catColor = CAT_COLORS[concept.category] || '#2563eb';
              return (
                <div
                  key={concept.id}
                  className={`concept-card ${isKnown ? 'known' : ''}`}
                  style={{ borderLeft: `4px solid ${catColor}` }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: 12 }}
                    onClick={() => setExpandedConcept(expanded ? null : concept.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700 }}>{concept.term}</span>
                        <span style={{ fontSize: 10, background: catColor + '20', color: catColor, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{concept.category}</span>
                        {isKnown && <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>✓ Connu</span>}
                      </div>
                      {!expanded && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{concept.definition.slice(0, 100)}...</p>}
                    </div>
                    <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
                  </div>

                  {expanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
                      <p style={{ marginBottom: 12, lineHeight: 1.7 }}>{concept.definition}</p>
                      <div style={{ background: 'var(--bg-main)', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>EXEMPLE</div>
                        <p style={{ fontStyle: 'italic', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>{concept.example}</p>
                      </div>
                      <button
                        className={`btn btn-sm ${isKnown ? 'btn-ghost' : 'btn-success'}`}
                        onClick={e => { e.stopPropagation(); toggleKnown(concept.id); }}
                      >
                        {isKnown ? '↩ À revoir' : '✓ Je maîtrise !'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredConcepts.length === 0 && (
              <div className="card text-center text-muted">Aucun concept trouvé.</div>
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
                className={`filter-chip ${quizState.catFilter === t ? 'active' : ''}`}
                onClick={() => setQuizState(s => ({ ...s, catFilter: t }))}
              >
                {t === 'Tous' ? 'Tous les sujets' : t}
              </button>
            ))}
          </div>

          {quizState.finished ? (
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>
                {quizState.score / quizState.total >= 0.8 ? '🎉' : '💪'}
              </div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 8 }}>Quiz SI Management terminé !</h2>
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
                  <div className="progress-fill" style={{ width: `${(quizState.current / shuffledQuiz.length) * 100}%` }} />
                </div>
              </div>

              {(() => {
                const q = shuffledQuiz[quizState.current];
                return (
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 11, background: '#ede9fe', color: '#7c3aed', padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}>{q.topic}</span>
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

      {/* CAS PRATIQUES */}
      {activeTab === 'cas' && (
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {siContent.caseStudies.map((c, i) => (
              <button
                key={c.id}
                className={`filter-chip ${caseIndex === i ? 'active' : ''}`}
                onClick={() => { setCaseIndex(i); setCaseQIndex(0); setCaseAnswered(null); setCaseScore(0); setCaseDone(false); }}
              >
                {siProgress.caseScores && siProgress.caseScores[c.id] !== undefined && <span>✓ </span>}
                {c.title.length > 25 ? c.title.slice(0, 25) + '...' : c.title}
              </button>
            ))}
          </div>

          {cas && (
            <div>
              <div className="card mb-16">
                <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', marginBottom: 12 }}>{cas.title}</h2>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Contexte</div>
                  <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>{cas.context}</p>
                </div>
                <div style={{ background: '#fef3c7', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>🎯 Problématique</div>
                  <p style={{ lineHeight: 1.7, margin: 0, color: '#78350f' }}>{cas.problem}</p>
                </div>
              </div>

              {!caseDone && casQ && (
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                    Question {caseQIndex + 1} / {cas.questions.length}
                  </div>
                  <div className="quiz-question">{casQ.q}</div>
                  <div className="quiz-options">
                    {casQ.options.map((opt, i) => {
                      let cls = 'quiz-option';
                      if (caseAnswered !== null) {
                        if (i === casQ.correct) cls += ' correct';
                        else if (i === caseAnswered && i !== casQ.correct) cls += ' incorrect';
                      }
                      return (
                        <button key={i} className={cls} onClick={() => handleCaseAnswer(i)} disabled={caseAnswered !== null}>
                          <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {caseAnswered !== null && (
                    <div>
                      <div className={`quiz-explanation ${caseAnswered === casQ.correct ? 'correct' : 'incorrect'}`}>
                        <div className="explanation-title">
                          {caseAnswered === casQ.correct ? '✅ Bonne décision !' : '❌ Pas optimal...'}
                        </div>
                        <p>{casQ.explanation}</p>
                      </div>
                      <button className="btn btn-primary btn-full mt-16" onClick={nextCaseQuestion}>
                        {caseQIndex + 1 >= cas.questions.length ? 'Voir le bilan →' : 'Question suivante →'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {caseDone && (
                <div className="card" style={{ background: 'var(--color-primary-light)' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>✅ Cas pratique terminé !</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 16 }}>
                    {caseScore} / {cas.questions.length}
                  </div>
                  <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>
                    {caseScore === cas.questions.length
                      ? 'Parfait ! Tu maîtrises ce cas pratique.'
                      : caseScore >= cas.questions.length / 2
                      ? 'Bien joué ! Quelques points à revoir.'
                      : 'Continue à apprendre, tu y arriveras !'}
                  </p>
                  <button className="btn btn-primary" onClick={nextCase}>Cas suivant →</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
