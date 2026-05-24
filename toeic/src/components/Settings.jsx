import React, { useState } from 'react';
import { resetProgress } from '../utils/storage';

const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'Petit', size: '14px' },
  { value: 'medium', label: 'Moyen', size: '17px' },
  { value: 'large', label: 'Grand', size: '20px' },
  { value: 'xlarge', label: 'Très grand', size: '24px' }
];

const DAILY_GOALS = [10, 20, 30, 50];

export default function Settings({ settings, onSettingsChange }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  function updateSetting(key, value) {
    onSettingsChange({ ...settings, [key]: value });
  }

  function handleReset() {
    resetProgress();
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">⚙️ Paramètres</h1>
        <p className="page-subtitle">Personnalise ton expérience d'apprentissage</p>
      </div>

      {/* Accessibility */}
      <div className="settings-section">
        <div className="settings-section-title">
          <span>♿</span> Accessibilité & Dyslexie
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Mode dyslexie</h4>
            <p>Police OpenDyslexic, espacement augmenté, interlignage plus grand</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-input"
              checked={settings.dyslexiaMode}
              onChange={e => updateSetting('dyslexiaMode', e.target.checked)}
            />
            <div className={`toggle-track ${settings.dyslexiaMode ? 'active' : ''}`}>
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Mode contraste élevé</h4>
            <p>Augmente le contraste des textes et des éléments pour une meilleure lisibilité</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-input"
              checked={settings.highContrast}
              onChange={e => updateSetting('highContrast', e.target.checked)}
            />
            <div className={`toggle-track ${settings.highContrast ? 'active' : ''}`}>
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Taille du texte</h4>
            <p>Ajuste la taille globale du texte dans l'application</p>
          </div>
          <div className="font-size-buttons">
            {FONT_SIZE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`btn btn-sm ${settings.fontSize === opt.value ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => updateSetting('fontSize', opt.value)}
                style={{ fontFamily: 'inherit', fontSize: opt.size, padding: '6px 12px', minHeight: 36 }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Afficher les traductions</h4>
            <p>Montre les traductions françaises à côté des mots anglais</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-input"
              checked={settings.showTranslations}
              onChange={e => updateSetting('showTranslations', e.target.checked)}
            />
            <div className={`toggle-track ${settings.showTranslations ? 'active' : ''}`}>
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>
      </div>

      {/* Audio */}
      <div className="settings-section">
        <div className="settings-section-title">
          <span>🔊</span> Audio & Prononciation
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Vitesse de lecture (synthèse vocale)</h4>
            <p>Ajuste la vitesse de la voix artificielle pour l'écoute et la prononciation</p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[0.5, 0.75, 0.85, 1.0].map(rate => (
              <button
                key={rate}
                className={`btn btn-sm ${settings.speechRate === rate ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => updateSetting('speechRate', rate)}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Test : afficher le minuteur</h4>
            <p>Affiche un compte à rebours pendant les tests pratiques (comme le vrai examen)</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-input"
              checked={settings.showTimer}
              onChange={e => updateSetting('showTimer', e.target.checked)}
            />
            <div className={`toggle-track ${settings.showTimer ? 'active' : ''}`}>
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>
      </div>

      {/* Learning prefs */}
      <div className="settings-section">
        <div className="settings-section-title">
          <span>🎯</span> Préférences d'apprentissage
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Objectif quotidien</h4>
            <p>Nombre d'exercices à compléter chaque jour</p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {DAILY_GOALS.map(goal => (
              <button
                key={goal}
                className={`btn btn-sm ${settings.dailyGoal === goal ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => updateSetting('dailyGoal', goal)}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Catégories préférées</h4>
            <p>Les catégories de vocabulaire qui t'intéressent le plus</p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['IT', 'Management', 'Email', 'Meeting', 'TOEIC'].map(cat => (
              <button
                key={cat}
                className={`btn btn-sm ${settings.preferredCategories?.includes(cat) ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => {
                  const current = settings.preferredCategories || [];
                  if (current.includes(cat)) {
                    updateSetting('preferredCategories', current.filter(c => c !== cat));
                  } else {
                    updateSetting('preferredCategories', [...current, cat]);
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="settings-section">
        <div className="settings-section-title">
          <span>👁️</span> Aperçu du texte
        </div>
        <div style={{
          padding: 20,
          background: 'var(--bg-main)',
          borderRadius: 'var(--border-radius-sm)',
          border: '1px solid var(--border-color)',
          fontSize: 'var(--font-size-base)',
          lineHeight: 'var(--line-height)',
          letterSpacing: 'var(--letter-spacing)',
          wordSpacing: 'var(--word-spacing)',
          fontFamily: settings.dyslexiaMode ? 'var(--font-dyslexic)' : 'var(--font-normal)'
        }}>
          <p><strong>The IT department</strong> is responsible for managing all <em>technical infrastructure</em>.</p>
          <p>Please configure the server and deploy the new software update by Friday.</p>
          <p>All stakeholders must be informed of the project deadline immediately.</p>
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 8 }}>
          Cet aperçu reflète tes paramètres actuels d'affichage.
        </p>
      </div>

      {/* Tips section */}
      <div className="settings-section" style={{ background: 'linear-gradient(135deg, #ede9fe, #dbeafe)', border: '1px solid #c4b5fd' }}>
        <div className="settings-section-title" style={{ color: 'var(--color-accent)' }}>
          <span>💜</span> Conseils pour la dyslexie
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '✅', text: 'Active le mode dyslexie ci-dessus pour une police spécialement conçue.' },
            { icon: '🔊', text: 'Utilise toujours le bouton "Écouter" pour entendre les textes et les mots.' },
            { icon: '📏', text: 'Choisis une grande taille de texte (Grand ou Très grand) pour réduire la fatigue.' },
            { icon: '⏸️', text: 'Prends des pauses de 5 minutes toutes les 25 minutes (technique Pomodoro).' },
            { icon: '🎯', text: 'Commence par les mots que tu connais déjà pour prendre confiance.' },
            { icon: '🔄', text: 'La répétition espacée est ta meilleure amie ! Revois les cartes "À revoir" chaque jour.' },
          ].map((tip, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{tip.icon}</span>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="settings-section" style={{ border: '1px solid var(--color-error-light)' }}>
        <div className="settings-section-title" style={{ color: 'var(--color-error)' }}>
          <span>⚠️</span> Zone dangereuse
        </div>

        {resetDone && (
          <div className="alert alert-success mb-16">
            <span className="alert-icon">✅</span>
            <span>Progression réinitialisée avec succès !</span>
          </div>
        )}

        <div className="settings-row">
          <div className="settings-row-info">
            <h4>Réinitialiser la progression</h4>
            <p>
              Supprime toutes tes statistiques, mots appris, exercices complétés et séries de jours.
              <strong style={{ color: 'var(--color-error)' }}> Cette action est irréversible !</strong>
            </p>
          </div>
          {!showResetConfirm ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setShowResetConfirm(true)}
            >
              🗑️ Réinitialiser
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-danger btn-sm" onClick={handleReset}>
                ✅ Oui, confirmer
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowResetConfirm(false)}>
                ❌ Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      {/* App info */}
      <div className="card" style={{ textAlign: 'center', padding: 24 }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎯</div>
        <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', marginBottom: 4 }}>TOEIC Master</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: 8 }}>
          Version 1.0.0 · Plateforme d'apprentissage personnalisée
        </div>
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          Conçu pour les apprenants dyslexiques · Niveau A2 → B2 · Spécialisation IT & Management
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          Objectif : 200 → 800 points TOEIC 💪
        </div>
      </div>
    </div>
  );
}
