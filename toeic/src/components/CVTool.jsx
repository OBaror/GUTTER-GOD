import React, { useState, useEffect, useRef } from 'react';
import { BASE_CV, COVER_LETTER_TEMPLATES } from '../data/cvData';
import {
  computeMatch, buildHighlightedSkills, getPlatformSkills,
  getSavedCVs, saveCVAdaptation, deleteSavedCV,
  getBaseCV, saveBaseCV,
} from '../utils/cvUtils';

const TABS = [
  { id: 'base', label: 'Mon CV', icon: '📄' },
  { id: 'adapt', label: 'Adapter au poste', icon: '🎯' },
  { id: 'letter', label: 'Lettre de motivation', icon: '✉️' },
  { id: 'saved', label: 'Mes adaptations', icon: '💾' },
];

export default function CVTool() {
  const [tab, setTab] = useState('base');
  const [cv, setCv] = useState(() => getBaseCV() || BASE_CV);
  const [jobText, setJobText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobSector, setJobSector] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [letterStyle, setLetterStyle] = useState('classique');
  const [letterText, setLetterText] = useState('');
  const [savedCVs, setSavedCVs] = useState(() => getSavedCVs());
  const [editSection, setEditSection] = useState(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  useEffect(() => { saveBaseCV(cv); }, [cv]);

  const platformSkills = getPlatformSkills();

  function analyzeJob() {
    if (!jobText.trim()) return;
    const result = computeMatch(cv, jobText);
    setMatchResult(result);
    setTab('adapt');
  }

  function generateLetter() {
    const highlighted = buildHighlightedSkills(cv, jobText);
    const tpl = COVER_LETTER_TEMPLATES[letterStyle];
    const text = tpl.template(cv, {
      title: jobTitle,
      company: jobCompany,
      sector: jobSector,
      highlightedSkills: highlighted,
    });
    setLetterText(text);
  }

  function saveAdaptation() {
    if (!matchResult) return;
    const adaptation = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fr-FR'),
      jobTitle,
      jobCompany,
      jobSector,
      score: matchResult.score,
      jobType: matchResult.jobType,
      jobText: jobText.slice(0, 500),
      letterStyle,
      letterText,
    };
    saveCVAdaptation(adaptation);
    setSavedCVs(getSavedCVs());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function copyLetter() {
    navigator.clipboard.writeText(letterText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function printLetter() {
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Lettre de motivation</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.7;
               max-width: 700px; margin: 40px auto; color: #222; }
        pre { white-space: pre-wrap; font-family: inherit; }
      </style></head><body><pre>${letterText}</pre></body></html>`);
    win.document.close();
    win.print();
  }

  function updateSummary(val) {
    setCv(prev => ({ ...prev, personal: { ...prev.personal, summary: val } }));
  }

  function addSkillToSection(section, skill) {
    if (!skill.trim()) return;
    setCv(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [section]: [...(prev.skills[section] || []), skill.trim()],
      },
    }));
  }

  function removeSkill(section, idx) {
    setCv(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [section]: prev.skills[section].filter((_, i) => i !== idx),
      },
    }));
  }

  function addPlatformSkillToCV(skill) {
    const section = 'Intelligence Artificielle';
    if (cv.skills[section]?.includes(skill.label)) return;
    addSkillToSection(section, skill.label);
  }

  const scoreColor = matchResult
    ? matchResult.score >= 70 ? '#22c55e'
      : matchResult.score >= 40 ? '#f59e0b'
      : '#ef4444'
    : '#6b7280';

  return (
    <div className="cv-tool">
      <div className="page-header">
        <h1>CV & Lettre de motivation</h1>
        <p className="page-subtitle">
          Adapte ton CV et génère une lettre personnalisée pour chaque offre
        </p>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Mon CV ── */}
      {tab === 'base' && (
        <div className="cv-base-tab">

          {/* Infos personnelles */}
          <div className="cv-section-card">
            <h2>Informations personnelles</h2>
            <div className="cv-fields">
              <div className="cv-field-row">
                <label>Prénom</label>
                <span className="cv-field-value">{cv.personal.firstName}</span>
              </div>
              <div className="cv-field-row">
                <label>Nom</label>
                <span className="cv-field-value">{cv.personal.lastName}</span>
              </div>
              <div className="cv-field-row">
                <label>Titre</label>
                <input
                  className="cv-input"
                  value={cv.personal.title}
                  onChange={e => setCv(p => ({ ...p, personal: { ...p.personal, title: e.target.value } }))}
                />
              </div>
              <div className="cv-field-row">
                <label>Email</label>
                <input
                  className="cv-input"
                  value={cv.personal.email}
                  onChange={e => setCv(p => ({ ...p, personal: { ...p.personal, email: e.target.value } }))}
                />
              </div>
              <div className="cv-field-row">
                <label>Téléphone</label>
                <input
                  className="cv-input"
                  value={cv.personal.phone}
                  onChange={e => setCv(p => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))}
                />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={{ fontWeight: 600 }}>Accroche / Résumé</label>
              <textarea
                className="cv-textarea"
                rows={4}
                value={cv.personal.summary}
                onChange={e => updateSummary(e.target.value)}
              />
            </div>
          </div>

          {/* Compétences acquises via la plateforme */}
          {platformSkills.length > 0 && (
            <div className="cv-section-card platform-skills-card">
              <h2>🎓 Compétences acquises via la plateforme</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                Ces compétences ont été validées dans tes modules d'apprentissage. Clique pour les ajouter à ton CV.
              </p>
              <div className="platform-skills-list">
                {platformSkills.map(skill => {
                  const alreadyIn = Object.values(cv.skills).flat().includes(skill.label);
                  return (
                    <div key={skill.label} className="platform-skill-item">
                      <span>{skill.label}</span>
                      <button
                        className={`btn-small ${alreadyIn ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => addPlatformSkillToCV(skill)}
                        disabled={alreadyIn}
                      >
                        {alreadyIn ? '✓ Ajoutée' : '+ Ajouter au CV'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Compétences */}
          <div className="cv-section-card">
            <h2>Compétences techniques</h2>
            {Object.entries(cv.skills).map(([section, items]) => (
              <div key={section} className="cv-skill-group">
                <h3 className="cv-skill-section-title">{section}</h3>
                <div className="cv-skill-tags">
                  {items.map((skill, i) => (
                    <span key={i} className="cv-skill-tag">
                      {skill}
                      <button
                        className="cv-skill-remove"
                        onClick={() => removeSkill(section, i)}
                        title="Supprimer"
                      >×</button>
                    </span>
                  ))}
                </div>
                <AddSkillInput onAdd={(s) => addSkillToSection(section, s)} />
              </div>
            ))}
          </div>

          {/* Expériences */}
          <div className="cv-section-card">
            <h2>Expériences professionnelles</h2>
            {cv.experiences.map((exp, ei) => (
              <div key={exp.id} className="cv-exp-block">
                <div className="cv-exp-header">
                  <div>
                    <div className="cv-exp-company">{exp.company} — <em>{exp.duration}</em></div>
                    <div className="cv-exp-role">{exp.role}</div>
                    <div className="cv-exp-dates">{exp.startDate} → {exp.endDate}</div>
                  </div>
                </div>
                <ul className="cv-exp-bullets">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi}>
                      <textarea
                        className="cv-bullet-input"
                        value={b}
                        rows={2}
                        onChange={e => {
                          const newExp = [...cv.experiences];
                          newExp[ei] = { ...newExp[ei], bullets: newExp[ei].bullets.map((x, xi) => xi === bi ? e.target.value : x) };
                          setCv(p => ({ ...p, experiences: newExp }));
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="cv-section-card">
            <h2>Certifications</h2>
            {cv.certifications.map((cert, i) => (
              <div key={i} className="cv-cert-item">
                <strong>{cert.name}</strong> — {cert.issuer}, {cert.year}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: Adapter au poste ── */}
      {tab === 'adapt' && (
        <div className="cv-adapt-tab">
          <div className="cv-section-card">
            <h2>Informations sur le poste</h2>
            <div className="adapt-job-fields">
              <input
                className="cv-input"
                placeholder="Intitulé du poste (ex: Data Analyst Junior)"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
              <input
                className="cv-input"
                placeholder="Entreprise (optionnel)"
                value={jobCompany}
                onChange={e => setJobCompany(e.target.value)}
              />
              <input
                className="cv-input"
                placeholder="Secteur (ex: Finance, Santé, Tech...)"
                value={jobSector}
                onChange={e => setJobSector(e.target.value)}
              />
            </div>
            <label style={{ fontWeight: 600, display: 'block', marginTop: 16, marginBottom: 8 }}>
              Colle l'offre d'emploi ici
            </label>
            <textarea
              className="cv-textarea"
              rows={8}
              placeholder="Copie-colle le texte complet de l'offre d'emploi..."
              value={jobText}
              onChange={e => setJobText(e.target.value)}
            />
            <button className="btn-primary" style={{ marginTop: 12 }} onClick={analyzeJob}>
              🔍 Analyser l'offre
            </button>
          </div>

          {matchResult && (
            <>
              {/* Score */}
              <div className="cv-section-card match-score-card">
                <h2>Score de correspondance</h2>
                <div className="match-score-display">
                  <div className="score-circle" style={{ '--score-color': scoreColor }}>
                    <span className="score-number" style={{ color: scoreColor }}>
                      {matchResult.score}%
                    </span>
                    <span className="score-label">
                      {matchResult.score >= 70 ? 'Excellent' : matchResult.score >= 40 ? 'Bon' : 'À améliorer'}
                    </span>
                  </div>
                  {matchResult.jobType && (
                    <div className="match-job-type">
                      Poste détecté : <strong>{matchResult.jobType}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Compétences qui matchent */}
              {matchResult.matched.length > 0 && (
                <div className="cv-section-card">
                  <h2>✅ Compétences à mettre en avant</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                    Ces compétences de ton CV correspondent directement à l'offre. Mets-les en premier.
                  </p>
                  <div className="match-tags matched">
                    {matchResult.matched.map((s, i) => (
                      <span key={i} className="match-tag match-tag-green">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Compétences de la plateforme qui matchent */}
              {matchResult.platformMatched.length > 0 && (
                <div className="cv-section-card">
                  <h2>🎓 Compétences plateforme à valoriser</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                    Apprises sur cette plateforme, tu peux les mentionner en entretien.
                  </p>
                  <div className="match-tags">
                    {matchResult.platformMatched.map((s, i) => (
                      <span key={i} className="match-tag match-tag-blue">{s.label}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Compétences manquantes */}
              {matchResult.missingKeywords.length > 0 && (
                <div className="cv-section-card">
                  <h2>⚠️ Compétences manquantes dans l'offre</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                    Ces éléments apparaissent dans l'offre mais pas dans ton CV. Travaille-les !
                  </p>
                  <div className="match-tags">
                    {matchResult.missingKeywords.map((s, i) => (
                      <span key={i} className="match-tag match-tag-orange">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Accroche recommandée */}
              <div className="cv-section-card">
                <h2>💡 Accroche recommandée pour ce poste</h2>
                <div className="recommended-summary">
                  <p>
                    Actuellement en Bachelor MCSI à l'ESGI et fort de{' '}
                    {matchResult.matched.length > 0
                      ? `mes expériences en ${matchResult.matched.slice(0, 2).join(' et ')}`
                      : 'mes stages chez COLOPLAST et Crédit Agricole CIB'}
                    , je cible un poste de{' '}
                    <strong>{jobTitle || matchResult.jobType || 'Data Analyst'}</strong>{' '}
                    {jobCompany ? `chez ${jobCompany} ` : ''}pour mon alternance en Mastère dès septembre 2026.
                  </p>
                </div>
                <button
                  className="btn-secondary"
                  style={{ marginTop: 12 }}
                  onClick={() => {
                    updateSummary(
                      `Actuellement en Bachelor MCSI à l'ESGI et fort de mes expériences en ${matchResult.matched.slice(0, 2).join(' et ')}, je cible un poste de ${jobTitle || matchResult.jobType || 'Data Analyst'}${jobCompany ? ` chez ${jobCompany}` : ''} pour mon alternance en Mastère dès septembre 2026.`
                    );
                    alert('Accroche mise à jour dans ton CV !');
                  }}
                >
                  Appliquer sur mon CV
                </button>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => { generateLetter(); setTab('letter'); }}>
                  ✉️ Générer la lettre de motivation
                </button>
                <button className="btn-secondary" onClick={saveAdaptation}>
                  {saved ? '✓ Sauvegardé !' : '💾 Sauvegarder cette adaptation'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── TAB: Lettre de motivation ── */}
      {tab === 'letter' && (
        <div className="cv-letter-tab">
          <div className="cv-section-card">
            <h2>Générateur de lettre de motivation</h2>

            {!jobText && (
              <div className="info-box" style={{ marginBottom: 16 }}>
                Astuce : remplis d'abord l'onglet "Adapter au poste" pour une lettre plus ciblée.
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600 }}>Poste visé</label>
              <input
                className="cv-input"
                style={{ marginTop: 8 }}
                placeholder="Ex: Data Analyst Junior"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600 }}>Entreprise</label>
              <input
                className="cv-input"
                style={{ marginTop: 8 }}
                placeholder="Ex: BNP Paribas"
                value={jobCompany}
                onChange={e => setJobCompany(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 10 }}>Style de lettre</label>
              <div className="letter-style-selector">
                {Object.entries(COVER_LETTER_TEMPLATES).map(([key, tpl]) => (
                  <button
                    key={key}
                    className={`letter-style-btn ${letterStyle === key ? 'active' : ''}`}
                    onClick={() => setLetterStyle(key)}
                  >
                    <div className="letter-style-name">{tpl.name}</div>
                    <div className="letter-style-desc">{tpl.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary" onClick={generateLetter}>
              ✨ Générer la lettre
            </button>
          </div>

          {letterText && (
            <div className="cv-section-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Ta lettre de motivation</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-secondary" onClick={copyLetter}>
                    {copied ? '✓ Copié !' : '📋 Copier'}
                  </button>
                  <button className="btn-secondary" onClick={printLetter}>
                    🖨️ Imprimer / PDF
                  </button>
                </div>
              </div>
              <textarea
                className="cv-textarea letter-textarea"
                rows={24}
                value={letterText}
                onChange={e => setLetterText(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                <button className="btn-secondary" onClick={saveAdaptation}>
                  {saved ? '✓ Sauvegardé !' : '💾 Sauvegarder'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Adaptations sauvegardées ── */}
      {tab === 'saved' && (
        <div>
          <div className="cv-section-card">
            <h2>Mes candidatures sauvegardées</h2>
            {savedCVs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>
                Aucune adaptation sauvegardée. Analyse une offre et sauvegarde-la pour la retrouver ici.
              </p>
            ) : (
              <div className="saved-cvs-list">
                {savedCVs.map(c => (
                  <div key={c.id} className="saved-cv-card">
                    <div className="saved-cv-header">
                      <div>
                        <div className="saved-cv-title">{c.jobTitle || 'Poste sans titre'}</div>
                        {c.jobCompany && <div className="saved-cv-company">{c.jobCompany}</div>}
                        <div className="saved-cv-date">{c.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          className="saved-cv-score"
                          style={{
                            color: c.score >= 70 ? '#22c55e' : c.score >= 40 ? '#f59e0b' : '#ef4444'
                          }}
                        >
                          {c.score}%
                        </div>
                        {c.jobType && <div className="saved-cv-type">{c.jobType}</div>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button
                        className="btn-secondary btn-small"
                        onClick={() => {
                          setJobTitle(c.jobTitle || '');
                          setJobCompany(c.jobCompany || '');
                          setJobSector(c.jobSector || '');
                          setJobText(c.jobText || '');
                          setLetterText(c.letterText || '');
                          setLetterStyle(c.letterStyle || 'classique');
                          setTab('adapt');
                        }}
                      >
                        Recharger
                      </button>
                      <button
                        className="btn-danger btn-small"
                        onClick={() => {
                          deleteSavedCV(c.id);
                          setSavedCVs(getSavedCVs());
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AddSkillInput({ onAdd }) {
  const [val, setVal] = useState('');
  return (
    <div className="add-skill-row">
      <input
        className="cv-input cv-input-small"
        placeholder="+ Ajouter une compétence..."
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && val.trim()) { onAdd(val); setVal(''); }
        }}
      />
      <button
        className="btn-small btn-primary"
        onClick={() => { if (val.trim()) { onAdd(val); setVal(''); } }}
      >
        Ajouter
      </button>
    </div>
  );
}
