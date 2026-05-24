import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../data/achievements.js';
import { getProgress, getUnlockedAchievements, getXP } from '../utils/storage.js';

const CATEGORY_LABELS = {
  toeic: '📚 TOEIC',
  jira: '🎯 Jira & Agile',
  'data-ai': '📊 Data & IA',
  si: '🖥️ SI Management',
  streak: '🔥 Streaks',
  special: '⭐ Spéciaux',
};

const CATEGORY_COLORS = {
  toeic: '#2563eb',
  jira: '#7c3aed',
  'data-ai': '#059669',
  si: '#d97706',
  streak: '#dc2626',
  special: '#0891b2',
};

export function checkAchievements(allProgress) {
  const unlocked = allProgress.achievements || [];
  const newlyUnlocked = [];

  const streak = allProgress.streak || { current: 0 };
  const vocab = allProgress.vocabulary || { knownCards: [] };
  const grammar = allProgress.grammar || { exercisesCompleted: [], bestScore: 0 };
  const reading = allProgress.reading || { passagesCompleted: [] };
  const jira = allProgress.jira || { knownTerms: [], quizScores: [], storiesCompleted: [], bestQuizScore: 0 };
  const dataAi = allProgress.dataAi || { knownConcepts: [], quizScores: [], promptsCompleted: [], bestQuizScore: 0 };
  const si = allProgress.siManagement || { knownConcepts: [], frameworksViewed: [] };
  const toeicScore = allProgress.toeicEstimate || 200;

  function tryUnlock(id) {
    if (!unlocked.includes(id)) newlyUnlocked.push(id);
  }

  const vocabCount = (vocab.knownCards || []).length;
  if (vocabCount >= 1 || (grammar.exercisesCompleted || []).length >= 1 || (reading.passagesCompleted || []).length >= 1) tryUnlock('premier-pas');
  if (vocabCount >= 10) tryUnlock('vocabulaire-10');
  if (vocabCount >= 50) tryUnlock('vocabulaire-50');
  if ((grammar.bestScore || 0) >= 100) tryUnlock('grammaire-expert');
  if (toeicScore >= 400) tryUnlock('toeic-400');
  if (toeicScore >= 500) tryUnlock('toeic-500');
  if (toeicScore >= 800) tryUnlock('toeic-800');
  if ((reading.passagesCompleted || []).length >= 8) tryUnlock('lecture-complete');

  const jiraKnown = (jira.knownTerms || []).length;
  if (jiraKnown >= 15) tryUnlock('jira-padawan');
  if (jiraKnown >= 40) tryUnlock('jira-master');
  if ((jira.bestQuizScore || 0) >= 0.9) tryUnlock('scrum-master-badge');
  if ((jira.storiesCompleted || []).length >= 8) tryUnlock('story-pro');

  const dataKnown = (dataAi.knownConcepts || []).length;
  if (dataKnown >= 10) tryUnlock('data-rookie');
  if (dataKnown >= 30) tryUnlock('data-analyst');
  if ((dataAi.promptsCompleted || []).length >= 8) tryUnlock('prompt-pro');

  const genAiIds = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 46, 47, 48];
  const genAiKnown = (dataAi.knownConcepts || []).filter(id => genAiIds.includes(id)).length;
  if (genAiKnown >= 10) tryUnlock('ai-ready');
  if ((dataAi.bestQuizScore || 0) >= 0.8) tryUnlock('bi-expert');

  const siKnown = (si.knownConcepts || []).length;
  if (siKnown >= 20) tryUnlock('dsi-herbe');
  if ((si.frameworksViewed || []).length >= 8) tryUnlock('architecte-si');

  const siSecurityIds = [18, 19, 20, 21, 22, 28, 29, 30];
  if ((si.knownConcepts || []).filter(id => siSecurityIds.includes(id)).length >= 6) tryUnlock('securite-pro');

  const streakCurrent = streak.current || 0;
  if (streakCurrent >= 3) tryUnlock('streakstart');
  if (streakCurrent >= 7) tryUnlock('semaine-parfaite');
  if (streakCurrent >= 30) tryUnlock('marathon');

  const todayModules = allProgress.todayModules || [];
  if (todayModules.length >= 3) tryUnlock('polyvalent');

  if (vocabCount >= 10 && (grammar.exercisesCompleted || []).length >= 5 &&
    (reading.passagesCompleted || []).length >= 2 &&
    jiraKnown >= 30 && dataKnown >= 25 && siKnown >= 30) {
    tryUnlock('top-gun');
  }

  return newlyUnlocked;
}

export default function Achievements({ settings }) {
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [xpTotal, setXpTotal] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [catFilter, setCatFilter] = useState('all');

  useEffect(() => {
    const unlocked = getUnlockedAchievements();
    setUnlockedIds(unlocked);
    setXpTotal(getXP());
  }, []);

  const totalXP = ACHIEVEMENTS.reduce((sum, a) => sum + a.xpReward, 0);
  const earnedXP = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id)).reduce((sum, a) => sum + a.xpReward, 0);
  const xpPct = Math.round((earnedXP / totalXP) * 100);

  const recentlyUnlocked = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id)).slice(-2);

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)];

  const filteredAchievements = catFilter === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === catFilter);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🏆 Succès</h1>
        <p className="page-subtitle">Tes accomplissements sur la plateforme MCSI Skills Hub</p>
      </div>

      {/* XP Bar */}
      <div className="card mb-24" style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Points d'expérience (XP)
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{earnedXP}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>/ {totalXP} XP possibles</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Succès débloqués</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fbbf24' }}>{unlockedIds.length}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>/ {ACHIEVEMENTS.length} succès</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 100, height: 14, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${xpPct}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', borderRadius: 100, transition: 'width 0.8s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
          <span>0 XP</span>
          <span>{xpPct}% complété</span>
          <span>{totalXP} XP</span>
        </div>
      </div>

      {/* Recently unlocked */}
      {recentlyUnlocked.length > 0 && (
        <div className="card mb-24" style={{ borderLeft: '4px solid #fbbf24', background: '#fefce8' }}>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#92400e', marginBottom: 12 }}>⭐ Récemment débloqué</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {recentlyUnlocked.map(a => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', padding: '10px 16px', borderRadius: 10, border: '1px solid #fbbf24' }}>
                <span style={{ fontSize: '2rem' }}>{a.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: '#d97706', fontWeight: 600 }}>+{a.xpReward} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="filter-bar mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-chip ${catFilter === cat ? 'active' : ''}`}
            onClick={() => setCatFilter(cat)}
          >
            {cat === 'all' ? '🏆 Tous' : CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      <div className="achievements-grid">
        {filteredAchievements.map(achievement => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const catColor = CATEGORY_COLORS[achievement.category] || '#2563eb';
          return (
            <div
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              style={{
                borderColor: isUnlocked ? catColor : undefined,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedAchievement(selectedAchievement === achievement.id ? null : achievement.id)}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
                <span style={{
                  fontSize: '2.5rem',
                  display: 'block',
                  filter: isUnlocked ? 'none' : 'grayscale(100%) opacity(0.4)',
                }}>
                  {achievement.icon}
                </span>
                {isUnlocked && (
                  <div style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    width: 18,
                    height: 18,
                    background: catColor,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: 'white',
                    fontWeight: 700,
                  }}>✓</div>
                )}
              </div>

              <div style={{
                fontWeight: 700,
                fontSize: 'var(--font-size-sm)',
                marginBottom: 4,
                color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                textAlign: 'center',
              }}>
                {achievement.title}
              </div>

              <div style={{
                fontSize: 11,
                fontWeight: 600,
                color: isUnlocked ? catColor : 'var(--text-muted)',
              }}>
                {isUnlocked ? `+${achievement.xpReward} XP ✓` : `${achievement.xpReward} XP`}
              </div>

              {selectedAchievement === achievement.id && (
                <div style={{
                  gridColumn: '1/-1',
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid var(--border-color)',
                  textAlign: 'left',
                  width: '100%',
                }}>
                  <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                    {achievement.description}
                  </p>
                  {!isUnlocked && (
                    <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                      🔒 Non encore débloqué
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedAchievement && (() => {
        const a = ACHIEVEMENTS.find(ac => ac.id === selectedAchievement);
        if (!a) return null;
        const isUnlocked = unlockedIds.includes(a.id);
        const catColor = CATEGORY_COLORS[a.category] || '#2563eb';
        return (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 300,
            padding: 20,
          }}
          onClick={() => setSelectedAchievement(null)}
          >
            <div
              style={{ background: 'var(--bg-card)', borderRadius: 'var(--border-radius-lg)', padding: 32, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ fontSize: '4rem', marginBottom: 12, filter: isUnlocked ? 'none' : 'grayscale(100%) opacity(0.4)' }}>{a.icon}</div>
              <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-xl)', marginBottom: 8 }}>{a.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.7 }}>{a.description}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
                <span style={{ background: catColor + '20', color: catColor, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {CATEGORY_LABELS[a.category] || a.category}
                </span>
                <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {a.xpReward} XP
                </span>
              </div>
              <div style={{ padding: 12, background: isUnlocked ? '#f0fdf4' : '#f8fafc', borderRadius: 8, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: isUnlocked ? '#16a34a' : 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  {isUnlocked ? '✅ Succès débloqué !' : '🔒 Non encore débloqué'}
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setSelectedAchievement(null)}>Fermer</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
