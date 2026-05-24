import React, { useState, useEffect } from 'react';
import { getProgress } from '../utils/storage.js';

const CAREERS = [
  {
    id: 'consultant-si',
    title: 'Consultant SI',
    icon: '🧑‍💼',
    description: 'Accompagne les entreprises dans leurs projets de transformation du Système d\'Information. Maîtrise des frameworks, méthodologies et de la relation client.',
    skills: [
      { name: 'Jira & Agile', key: 'jira', weight: 4 },
      { name: 'SI Management', key: 'si', weight: 5 },
      { name: 'Anglais (TOEIC)', key: 'toeic', weight: 4 },
      { name: 'Data & BI', key: 'data', weight: 2 },
    ],
    modules: ['SI Management', 'Jira & Agile', 'TOEIC', 'Fiches mémo (SI)'],
    salary: '45 000 – 70 000 € / an',
    companies: ['Capgemini', 'Accenture', 'Sopra Steria', 'Devoteam', 'IBM'],
    milestones: ['Maîtriser ITIL 4 et COBIT', 'Certification PMI ou PRINCE2', 'Score TOEIC 750+', 'Stages en ESN / Cabinet de conseil'],
    color: '#7c3aed',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: '📊',
    description: 'Analyse les données de l\'entreprise pour produire des insights actionnables et des tableaux de bord pour les décideurs.',
    skills: [
      { name: 'Data & BI', key: 'data', weight: 5 },
      { name: 'SI Management', key: 'si', weight: 3 },
      { name: 'Anglais (TOEIC)', key: 'toeic', weight: 3 },
      { name: 'Jira & Agile', key: 'jira', weight: 2 },
    ],
    modules: ['Data & BI', 'Fiches mémo (Data)', 'TOEIC Vocabulaire'],
    salary: '38 000 – 60 000 € / an',
    companies: ['SNCF', 'BNP Paribas', 'L\'Oréal', 'Startups tech', 'Cabinets data'],
    milestones: ['Maîtriser SQL et Power BI', 'Certification Google Data Analytics', 'Portfolio de projets data', 'Score TOEIC 650+'],
    color: '#059669',
  },
  {
    id: 'chef-projet-ia',
    title: 'Chef de Projet IA',
    icon: '🤖',
    description: 'Pilote les projets d\'Intelligence Artificielle de bout en bout : cadrage, sélection des use cases, gestion des équipes data science et déploiement.',
    skills: [
      { name: 'IA & Digital', key: 'data', weight: 5 },
      { name: 'Jira & Agile', key: 'jira', weight: 4 },
      { name: 'SI Management', key: 'si', weight: 3 },
      { name: 'Anglais (TOEIC)', key: 'toeic', weight: 5 },
    ],
    modules: ['Data & IA', 'Jira & Agile', 'TOEIC', 'SI Management'],
    salary: '55 000 – 90 000 € / an',
    companies: ['Google', 'Microsoft', 'Scale-ups tech', 'Grandes entreprises', 'Cabinets IA'],
    milestones: ['Comprendre l\'écosystème IA (LLM, RAG, MLOps)', 'Maîtriser la gestion de projet Agile', 'Score TOEIC 750+', 'Certification IA (Google, AWS)'],
    color: '#d97706',
  },
  {
    id: 'product-owner',
    title: 'Product Owner',
    icon: '🎯',
    description: 'Responsable du produit digital. Priorise le backlog, représente les utilisateurs, pilote les sprints et maximise la valeur livrée par l\'équipe.',
    skills: [
      { name: 'Jira & Agile', key: 'jira', weight: 5 },
      { name: 'Data & BI', key: 'data', weight: 3 },
      { name: 'Anglais (TOEIC)', key: 'toeic', weight: 4 },
      { name: 'SI Management', key: 'si', weight: 2 },
    ],
    modules: ['Jira & Agile', 'Data & BI (métriques produit)', 'TOEIC'],
    salary: '45 000 – 75 000 € / an',
    companies: ['Startups', 'Scale-ups', 'Entreprises tech', 'Banques', 'Retail digital'],
    milestones: ['Certification PSPO (Professional Scrum Product Owner)', 'Maîtriser Jira et les User Stories', 'Score TOEIC 700+', 'Expérience en startup ou produit digital'],
    color: '#2563eb',
  },
  {
    id: 'dsi',
    title: 'DSI (Futur)',
    icon: '🏢',
    description: 'Directeur des Systèmes d\'Information. Vision stratégique du SI, alignement IT-business, management d\'équipes IT et pilotage du budget informatique.',
    skills: [
      { name: 'SI Management', key: 'si', weight: 5 },
      { name: 'Data & BI', key: 'data', weight: 4 },
      { name: 'Jira & Agile', key: 'jira', weight: 3 },
      { name: 'Anglais (TOEIC)', key: 'toeic', weight: 5 },
    ],
    modules: ['SI Management (ITIL, COBIT, TOGAF)', 'Data & BI', 'TOEIC 800', 'Tous les modules'],
    salary: '80 000 – 150 000 € / an',
    companies: ['Grandes entreprises', 'Groupes internationaux', 'Secteur public', 'ETI'],
    milestones: ['Maîtriser tous les frameworks SI', 'Score TOEIC 800+', 'Expérience en management IT', 'Certifications ITIL / COBIT / TOGAF'],
    color: '#0891b2',
  },
];

function getSkillProgress(progress, key) {
  switch (key) {
    case 'toeic': {
      const vocab = (progress.vocabulary?.knownCards?.length || 0) / 65;
      const grammar = (progress.grammar?.exercisesCompleted?.length || 0) / 42;
      const reading = (progress.reading?.passagesCompleted?.length || 0) / 8;
      return Math.round(((vocab + grammar + reading) / 3) * 100);
    }
    case 'jira': {
      const known = (progress.jira?.knownTerms?.length || 0) / 45;
      const quiz = progress.jira?.bestQuizScore || 0;
      return Math.round(((known + quiz) / 2) * 100);
    }
    case 'data': {
      const known = (progress.dataAi?.knownConcepts?.length || 0) / 52;
      const quiz = progress.dataAi?.bestQuizScore || 0;
      return Math.round(((known + quiz) / 2) * 100);
    }
    case 'si': {
      const known = (progress.siManagement?.knownConcepts?.length || 0) / 45;
      const fw = (progress.siManagement?.frameworksViewed?.length || 0) / 8;
      return Math.round(((known + fw) / 2) * 100);
    }
    default: return 0;
  }
}

function getOverallProfile(progress) {
  const scores = {
    toeic: getSkillProgress(progress, 'toeic'),
    jira: getSkillProgress(progress, 'jira'),
    data: getSkillProgress(progress, 'data'),
    si: getSkillProgress(progress, 'si'),
  };
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return { scores, bestKey: best[0], bestScore: best[1] };
}

const SKILL_LABELS = { toeic: 'Anglais', jira: 'Jira & Agile', data: 'Data & IA', si: 'SI Management' };
const SKILL_COLORS = { toeic: '#2563eb', jira: '#7c3aed', data: '#059669', si: '#d97706' };

export default function CareerPath({ settings, onNavigate }) {
  const [progress, setProgress] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    setProfile(getOverallProfile(p));
  }, []);

  if (!progress || !profile) {
    return (
      <div className="page-container">
        <div className="card text-center" style={{ padding: 48 }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>⌛</div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  const bestCareer = CAREERS.reduce((best, career) => {
    const score = career.skills.reduce((sum, skill) => sum + (profile.scores[skill.key] || 0) * skill.weight, 0);
    const bestScore = best ? best.skills.reduce((sum, s) => sum + (profile.scores[s.key] || 0) * s.weight, 0) : -1;
    return score > bestScore ? career : best;
  }, null);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🗺️ Parcours carrière</h1>
        <p className="page-subtitle">Explore les métiers MCSI et identifie ton profil</p>
      </div>

      {/* Current Profile */}
      <div className="card mb-24" style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', color: 'white' }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Mon profil actuel
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 20 }}>
          {Object.entries(profile.scores).map(([key, score]) => (
            <div key={key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                <span>{SKILL_LABELS[key]}</span>
                <span style={{ fontWeight: 700, color: SKILL_COLORS[key] }}>{score}%</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 100 }}>
                <div style={{ height: '100%', width: `${score}%`, background: SKILL_COLORS[key], borderRadius: 100, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>
        {bestCareer && (
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.8rem' }}>{bestCareer.icon}</span>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Profil dominant</div>
              <div style={{ fontWeight: 700, color: 'white' }}>{bestCareer.title}</div>
            </div>
          </div>
        )}
      </div>

      {/* Radar Chart (CSS-based polygon) */}
      <div className="card mb-24">
        <h2 className="card-title">🕸️ Carte des compétences</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
          <div className="radar-chart">
            <svg viewBox="0 0 200 200" width="200" height="200">
              {/* Grid circles */}
              {[25, 50, 75, 100].map(r => (
                <circle key={r} cx="100" cy="100" r={r * 0.8} fill="none" stroke="var(--border-color)" strokeWidth="1" />
              ))}
              {/* Axes */}
              {[0, 90, 180, 270].map((angle, i) => {
                const rad = (angle - 90) * Math.PI / 180;
                return <line key={i} x1="100" y1="100" x2={100 + Math.cos(rad) * 80} y2={100 + Math.sin(rad) * 80} stroke="var(--border-color)" strokeWidth="1" />;
              })}
              {/* Data polygon */}
              {(() => {
                const keys = ['toeic', 'jira', 'data', 'si'];
                const angles = [-90, 0, 90, 180];
                const points = keys.map((k, i) => {
                  const r = (profile.scores[k] / 100) * 80;
                  const rad = angles[i] * Math.PI / 180;
                  return `${100 + Math.cos(rad) * r},${100 + Math.sin(rad) * r}`;
                }).join(' ');
                return (
                  <>
                    <polygon points={points} fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
                    {keys.map((k, i) => {
                      const r = (profile.scores[k] / 100) * 80;
                      const rad = angles[i] * Math.PI / 180;
                      const x = 100 + Math.cos(rad) * r;
                      const y = 100 + Math.sin(rad) * r;
                      return <circle key={k} cx={x} cy={y} r="4" fill={SKILL_COLORS[k]} />;
                    })}
                  </>
                );
              })()}
              {/* Labels */}
              <text x="100" y="14" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Anglais</text>
              <text x="188" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Jira</text>
              <text x="100" y="196" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Data</text>
              <text x="12" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SI</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="card mb-24">
        <h2 className="card-title">🛤️ Feuille de route MCSI</h2>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: 'var(--border-color)' }} />
          {[
            { phase: 'Maintenant', label: 'Maîtriser les fondamentaux', items: ['Vocabulaire TOEIC 200+ mots', 'Glossaire Jira & Agile', 'Concepts Data & IA de base'], color: '#2563eb' },
            { phase: '3 mois', label: 'Progresser sur les quiz', items: ['Score TOEIC estimé +100 pts', 'Quiz Jira > 70%', 'Quiz SI Management > 60%'], color: '#7c3aed' },
            { phase: '6 mois', label: 'Certifications & stages', items: ['TOEIC 600+', 'Certification Agile (PSM ou PSPO)', 'Stage consultant / chef de projet'], color: '#059669' },
            { phase: '1 an', label: 'Objectif professionnel', items: ['TOEIC 800', 'Maîtrise complète SI Management', 'Alternance dans la filière choisie'], color: '#d97706' },
          ].map((step, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 24, paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: -16, top: 4, width: 12, height: 12, borderRadius: '50%', background: step.color, border: '2px solid white', boxShadow: 'var(--shadow-sm)' }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: step.color, textTransform: 'uppercase', marginBottom: 4 }}>{step.phase}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{step.label}</div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {step.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', gap: 8, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    <span style={{ color: step.color }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Career Cards */}
      <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-xl)', marginBottom: 16 }}>Explore les métiers</h2>
      <div className="career-grid">
        {CAREERS.map(career => {
          const score = career.skills.reduce((sum, skill) => sum + (profile.scores[skill.key] || 0) * skill.weight, 0);
          const maxScore = career.skills.reduce((sum, s) => sum + 100 * s.weight, 0);
          const matchPct = Math.round((score / maxScore) * 100);
          const expanded = selectedCareer === career.id;

          return (
            <div
              key={career.id}
              className="career-card"
              style={{ borderTop: `4px solid ${career.color}`, cursor: 'pointer' }}
              onClick={() => setSelectedCareer(expanded ? null : career.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '2rem' }}>{career.icon}</span>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 'var(--font-size-base)' }}>{career.title}</h3>
                    <div style={{ fontSize: 12, color: career.color, fontWeight: 600 }}>{career.salary}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: career.color }}>{matchPct}%</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>compatibilité</div>
                </div>
              </div>

              <div className="progress-bar mb-12" style={{ height: 8 }}>
                <div style={{ height: '100%', width: `${matchPct}%`, background: career.color, borderRadius: 100, transition: 'width 0.6s ease' }} />
              </div>

              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                {career.description}
              </p>

              {expanded && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Compétences requises</div>
                    {career.skills.map(skill => (
                      <div key={skill.key} className="skill-bar">
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>{skill.name}</span>
                          <span style={{ color: SKILL_COLORS[skill.key], fontWeight: 700 }}>{profile.scores[skill.key] || 0}%</span>
                        </div>
                        <div style={{ height: 8, background: 'var(--bg-main)', borderRadius: 100, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${profile.scores[skill.key] || 0}%`, background: SKILL_COLORS[skill.key], borderRadius: 100 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>📚 Modules recommandés</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {career.modules.map((m, i) => (
                        <span key={i} style={{ fontSize: 11, background: career.color + '15', color: career.color, padding: '4px 10px', borderRadius: 10, fontWeight: 600 }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>🏢 Entreprises qui recrutent</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {career.companies.map((c, i) => (
                        <span key={i} style={{ fontSize: 11, background: 'var(--bg-main)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>🎯 Étapes clés</div>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {career.milestones.map((m, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, fontSize: 'var(--font-size-sm)' }}>
                          <span style={{ color: career.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
                {expanded ? '▲ Réduire' : '▼ Voir le détail'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
