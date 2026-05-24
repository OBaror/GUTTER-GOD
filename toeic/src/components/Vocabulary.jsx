import React, { useState, useEffect, useCallback } from 'react';
import { vocabulary, categories, difficulties } from '../data/vocabulary';
import { getProgress, saveProgress } from '../utils/storage';

function speak(text, rate = 0.9) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export default function Vocabulary({ settings }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState(new Set());
  const [reviewCards, setReviewCards] = useState(new Set());
  const [sessionStats, setSessionStats] = useState({ known: 0, review: 0 });
  const [showComplete, setShowComplete] = useState(false);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    setKnownCards(new Set(p.vocabulary.knownCards));
    setReviewCards(new Set(p.vocabulary.reviewCards));
  }, []);

  useEffect(() => {
    let cards = [...vocabulary];

    if (selectedCategories.length > 0) {
      cards = cards.filter(c => selectedCategories.includes(c.category));
    }
    if (selectedDifficulties.length > 0) {
      cards = cards.filter(c => selectedDifficulties.includes(c.difficulty));
    }

    // Prioritize review cards
    const reviewFirst = cards.filter(c => reviewCards.has(c.id));
    const others = cards.filter(c => !reviewCards.has(c.id));
    setFilteredCards([...reviewFirst, ...others]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowComplete(false);
  }, [selectedCategories, selectedDifficulties, reviewCards]);

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  function toggleDifficulty(diff) {
    setSelectedDifficulties(prev =>
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
  }

  const currentCard = filteredCards[currentIndex];

  function handleFlip() {
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentCard) {
      speak(currentCard.word, settings?.speechRate || 0.9);
    }
  }

  function handleKnow() {
    if (!currentCard) return;
    const newKnown = new Set(knownCards);
    newKnown.add(currentCard.id);
    const newReview = new Set(reviewCards);
    newReview.delete(currentCard.id);
    setKnownCards(newKnown);
    setReviewCards(newReview);
    setSessionStats(prev => ({ ...prev, known: prev.known + 1 }));
    saveProgress('vocabulary', {
      knownCards: [...newKnown],
      reviewCards: [...newReview],
      totalCards: vocabulary.length
    });
    goNext();
  }

  function handleReview() {
    if (!currentCard) return;
    const newReview = new Set(reviewCards);
    newReview.add(currentCard.id);
    setReviewCards(newReview);
    setSessionStats(prev => ({ ...prev, review: prev.review + 1 }));
    saveProgress('vocabulary', {
      knownCards: [...knownCards],
      reviewCards: [...newReview],
      totalCards: vocabulary.length
    });
    goNext();
  }

  function goNext() {
    setIsFlipped(false);
    if (currentIndex + 1 >= filteredCards.length) {
      setShowComplete(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setIsFlipped(false);
    }
  }

  function restartSession() {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowComplete(false);
    setSessionStats({ known: 0, review: 0 });
  }

  function handleSpeak(e) {
    e.stopPropagation();
    if (currentCard) {
      speak(currentCard.word, settings?.speechRate || 0.9);
    }
  }

  if (showComplete) {
    const total = sessionStats.known + sessionStats.review;
    const percent = total > 0 ? Math.round((sessionStats.known / total) * 100) : 0;
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">📚 Vocabulaire</h1>
        </div>
        <div className="card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>
            {percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '📚'}
          </div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 8 }}>
            Session terminée !
          </h2>
          <p className="text-muted mb-24">
            Tu as complété {total} cartes dans cette session.
          </p>

          <div className="stat-grid mb-24">
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--color-success)' }}>{sessionStats.known}</div>
              <div className="stat-label-sm">✅ Je sais</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{sessionStats.review}</div>
              <div className="stat-label-sm">🔄 À revoir</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{percent}%</div>
              <div className="stat-label-sm">Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--color-primary)' }}>{knownCards.size}</div>
              <div className="stat-label-sm">Total maîtrisés</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={restartSession}>
              🔄 Recommencer
            </button>
            {reviewCards.size > 0 && (
              <button className="btn btn-outline" onClick={() => {
                setSelectedCategories([]);
                setSelectedDifficulties([]);
                restartSession();
              }}>
                📖 Revoir les difficiles ({reviewCards.size})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📚 Vocabulaire</h1>
        <p className="page-subtitle">
          Maîtrise le vocabulaire professionnel anglais avec des flashcards
        </p>
      </div>

      {/* Info */}
      <div className="alert alert-info mb-24">
        <span className="alert-icon">💡</span>
        <span>
          <strong>Comment utiliser :</strong> Clique sur la carte pour voir la traduction.
          Dis le mot à voix haute avant de regarder ! Puis choisis "Je sais" ou "À revoir".
        </span>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'center', marginRight: 4 }}>
          Catégorie :
        </span>
        <button
          className={`filter-chip ${selectedCategories.length === 0 ? 'active' : ''}`}
          onClick={() => setSelectedCategories([])}
        >
          Toutes
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-chip ${selectedCategories.includes(cat) ? 'active' : ''}`}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <span style={{ width: '100%', height: 0 }} />
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'center', marginRight: 4 }}>
          Niveau :
        </span>
        <button
          className={`filter-chip ${selectedDifficulties.length === 0 ? 'active' : ''}`}
          onClick={() => setSelectedDifficulties([])}
        >
          Tous
        </button>
        {difficulties.map(diff => (
          <button
            key={diff}
            className={`filter-chip ${selectedDifficulties.includes(diff) ? 'active' : ''}`}
            onClick={() => toggleDifficulty(diff)}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          Carte <strong>{Math.min(currentIndex + 1, filteredCards.length)}</strong> sur{' '}
          <strong>{filteredCards.length}</strong>
          {reviewCards.size > 0 && (
            <span style={{ color: 'var(--color-warning)', marginLeft: 8 }}>
              🔄 {reviewCards.size} à revoir
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 'var(--font-size-sm)' }}>
          <span style={{ color: 'var(--color-success)' }}>✅ {sessionStats.known} sus</span>
          <span style={{ color: 'var(--color-warning)' }}>🔄 {sessionStats.review} à revoir</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-24" style={{ height: 8 }}>
        <div
          className="progress-fill vocabulary"
          style={{ width: `${filteredCards.length > 0 ? (currentIndex / filteredCards.length) * 100 : 0}%` }}
        />
      </div>

      {filteredCards.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
          <h3 style={{ marginBottom: 8 }}>Aucune carte trouvée</h3>
          <p className="text-muted">Modifie les filtres pour voir des cartes.</p>
          <button className="btn btn-outline mt-16" onClick={() => { setSelectedCategories([]); setSelectedDifficulties([]); }}>
            Réinitialiser les filtres
          </button>
        </div>
      ) : currentCard ? (
        <>
          {/* Flashcard */}
          <div className="flashcard-scene" onClick={handleFlip} role="button" aria-label="Retourner la carte">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
              {/* Front */}
              <div className="flashcard-face flashcard-front">
                <div style={{ marginBottom: 12 }}>
                  <span className={`badge badge-${currentCard.category}`} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                    {currentCard.category}
                  </span>
                  <span className={`badge badge-${currentCard.difficulty}`} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', marginLeft: 6 }}>
                    {currentCard.difficulty}
                  </span>
                </div>
                <div className="flashcard-word">{currentCard.word}</div>
                <div className="flashcard-hint">
                  👆 Clique pour voir la traduction
                </div>
                {knownCards.has(currentCard.id) && (
                  <div style={{ marginTop: 12, fontSize: 12, background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>
                    ✅ Déjà maîtrisé
                  </div>
                )}
              </div>

              {/* Back */}
              <div className="flashcard-face flashcard-back">
                <div className="flashcard-translation">{currentCard.translation}</div>
                <div className="flashcard-example">"{currentCard.example}"</div>
                <div style={{ marginTop: 12 }}>
                  <span className={`badge badge-${currentCard.category}`}>{currentCard.category}</span>
                  <span className={`badge badge-${currentCard.difficulty}`} style={{ marginLeft: 6 }}>{currentCard.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleSpeak}
              title="Écouter la prononciation"
            >
              🔊 Écouter
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleFlip}
            >
              🔄 Retourner
            </button>
          </div>

          {/* Answer buttons */}
          {isFlipped && (
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', maxWidth: 480, margin: '0 auto' }}>
              <button
                className="btn btn-danger"
                style={{ flex: 1 }}
                onClick={handleReview}
              >
                🔄 À revoir
              </button>
              <button
                className="btn btn-success"
                style={{ flex: 1 }}
                onClick={handleKnow}
              >
                ✅ Je sais !
              </button>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button className="btn btn-ghost btn-sm" onClick={goPrev} disabled={currentIndex === 0}>
              ← Précédent
            </button>
            <button className="btn btn-ghost btn-sm" onClick={goNext} disabled={currentIndex >= filteredCards.length - 1}>
              Suivant →
            </button>
          </div>
        </>
      ) : null}

      {/* Overall stats */}
      <div className="card mt-24">
        <h3 className="card-title">📊 Statistiques globales</h3>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-value">{vocabulary.length}</div>
            <div className="stat-label-sm">Total cartes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--color-success)' }}>{knownCards.size}</div>
            <div className="stat-label-sm">Maîtrisés</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{reviewCards.size}</div>
            <div className="stat-label-sm">À revoir</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {vocabulary.length > 0
                ? Math.round((knownCards.size / vocabulary.length) * 100)
                : 0}%
            </div>
            <div className="stat-label-sm">Complété</div>
          </div>
        </div>
      </div>
    </div>
  );
}
