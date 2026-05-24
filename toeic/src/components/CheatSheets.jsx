import React, { useState } from 'react';
import { CHEATSHEETS } from '../data/cheatsheets.js';

const CATEGORIES = ['Tous', 'TOEIC', 'Jira', 'Data', 'SI'];

export default function CheatSheets({ settings }) {
  const [catFilter, setCatFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const [openSheet, setOpenSheet] = useState(null);

  const filteredSheets = CHEATSHEETS.filter(sheet => {
    const matchCat = catFilter === 'Tous' || sheet.category === catFilter;
    const matchSearch = !search || sheet.title.toLowerCase().includes(search.toLowerCase()) ||
      sheet.sections.some(s => s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.items.some(i => i.term.toLowerCase().includes(search.toLowerCase()) || i.definition.toLowerCase().includes(search.toLowerCase())));
    return matchCat && matchSearch;
  });

  function handlePrint(sheet) {
    const printContent = document.getElementById(`print-sheet-${sheet.id}`);
    if (!printContent) return;
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent.outerHTML;
    window.print();
    document.body.innerHTML = originalBody;
    window.location.reload();
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📋 Fiches mémo</h1>
        <p className="page-subtitle">Résumés rapides pour réviser et consulter en un coup d'oeil</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          className="form-input"
          placeholder="🔍 Rechercher dans les fiches..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
      </div>

      <div className="filter-bar mb-24">
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

      <div className="cheatsheet-grid">
        {filteredSheets.map(sheet => (
          <div key={sheet.id} className="cheatsheet-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{sheet.icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: 'var(--font-size-base)', marginBottom: 4 }}>{sheet.title}</h3>
                <span style={{ fontSize: 11, background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                  {sheet.category}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 12 }}>
              {sheet.sections.length} sections · {sheet.sections.reduce((n, s) => n + s.items.length, 0)} éléments
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setOpenSheet(sheet.id)}>
                👁️ Voir la fiche
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => handlePrint(sheet)}>
                🖨️ Imprimer
              </button>
            </div>
          </div>
        ))}

        {filteredSheets.length === 0 && (
          <div className="card text-center text-muted" style={{ gridColumn: '1/-1', padding: 48 }}>
            Aucune fiche mémo trouvée pour cette recherche.
          </div>
        )}
      </div>

      {/* Hidden printable sheets */}
      <div style={{ display: 'none' }}>
        {CHEATSHEETS.map(sheet => (
          <div key={sheet.id} id={`print-sheet-${sheet.id}`}>
            <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: 24, marginBottom: 20 }}>
              {sheet.icon} {sheet.title}
            </h1>
            {sheet.sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 24, pageBreakInside: 'avoid' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, borderBottom: '2px solid #2563eb', paddingBottom: 4, marginBottom: 12 }}>
                  {section.title}
                </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '6px 8px', background: '#f0f4f8', width: '30%', fontSize: 13 }}>Terme</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', background: '#f0f4f8', fontSize: 13 }}>Définition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, ii) => (
                      <tr key={ii} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '8px', fontWeight: 700, fontSize: 12, verticalAlign: 'top' }}>{item.term}</td>
                        <td style={{ padding: '8px', fontSize: 12, lineHeight: 1.6 }}>{item.definition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <div style={{ marginTop: 24, fontSize: 11, color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
              MCSI Skills Hub — Fiche mémo imprimée
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openSheet && (() => {
        const sheet = CHEATSHEETS.find(s => s.id === openSheet);
        if (!sheet) return null;
        return (
          <div className="cheatsheet-modal" onClick={() => setOpenSheet(null)}>
            <div
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--border-radius-lg)',
                padding: 32,
                maxWidth: 800,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '2rem' }}>{sheet.icon}</span>
                    <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-xl)' }}>{sheet.title}</h2>
                  </div>
                  <span style={{ fontSize: 12, background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: 10, fontWeight: 600 }}>
                    {sheet.category}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handlePrint(sheet)}>
                    🖨️ Imprimer
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setOpenSheet(null)}>
                    ✕ Fermer
                  </button>
                </div>
              </div>

              {sheet.sections.map((section, si) => (
                <div key={si} style={{ marginBottom: 28 }}>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--text-primary)',
                    marginBottom: 12,
                    paddingBottom: 8,
                    borderBottom: '2px solid var(--color-primary)',
                  }}>
                    {section.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.items.map((item, ii) => (
                      <div key={ii} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, padding: '10px 12px', background: 'var(--bg-main)', borderRadius: 8, alignItems: 'flex-start' }}>
                        <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', wordBreak: 'break-word' }}>
                          {item.term}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                          {item.definition}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
