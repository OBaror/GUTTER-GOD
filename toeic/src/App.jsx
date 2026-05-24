import React, { useState, useEffect } from 'react';
import './App.css';
import { getSettings, saveSettings } from './utils/storage';
import Dashboard from './components/Dashboard';
import Vocabulary from './components/Vocabulary';
import Grammar from './components/Grammar';
import Reading from './components/Reading';
import Listening from './components/Listening';
import PracticeTest from './components/PracticeTest';
import Settings from './components/Settings';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '🏠', badge: null },
  { id: 'vocabulary', label: 'Vocabulaire', icon: '📚', badge: null },
  { id: 'grammar', label: 'Grammaire', icon: '✏️', badge: null },
  { id: 'reading', label: 'Lecture', icon: '📖', badge: null },
  { id: 'listening', label: 'Écoute', icon: '🎧', badge: null },
  { id: 'practice', label: 'Test pratique', icon: '📝', badge: 'TOEIC' },
  { id: 'settings', label: 'Paramètres', icon: '⚙️', badge: null },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settings, setSettings] = useState(() => getSettings());

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  function applySettings(s) {
    const root = document.documentElement;
    const body = document.body;

    if (s.dyslexiaMode) {
      body.classList.add('dyslexia-mode');
    } else {
      body.classList.remove('dyslexia-mode');
    }

    if (s.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
    body.classList.add(`font-${s.fontSize}`);
  }

  function handleSettingsChange(newSettings) {
    setSettings(newSettings);
    saveSettings(newSettings);
  }

  function navigateTo(page) {
    setCurrentPage(page);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }

  function renderPage() {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} settings={settings} />;
      case 'vocabulary':
        return <Vocabulary settings={settings} />;
      case 'grammar':
        return <Grammar settings={settings} />;
      case 'reading':
        return <Reading settings={settings} />;
      case 'listening':
        return <Listening settings={settings} />;
      case 'practice':
        return <PracticeTest settings={settings} onNavigate={navigateTo} />;
      case 'settings':
        return <Settings settings={settings} onSettingsChange={handleSettingsChange} />;
      default:
        return <Dashboard onNavigate={navigateTo} settings={settings} />;
    }
  }

  return (
    <div className="app">
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <nav className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🎯</span>
          {!sidebarCollapsed && (
            <div>
              <div className="sidebar-title">TOEIC Master</div>
              <div className="sidebar-subtitle">Plateforme d'apprentissage</div>
            </div>
          )}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ marginLeft: sidebarCollapsed ? 0 : 'auto' }}
            aria-label={sidebarCollapsed ? 'Ouvrir menu' : 'Fermer menu'}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <div className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => navigateTo(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </>
              )}
            </button>
          ))}
        </div>

        {!sidebarCollapsed && (
          <div className="sidebar-footer">
            <div>200 → 800</div>
            <div style={{ fontSize: 10, marginTop: 4 }}>Niveau cible TOEIC</div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
}
