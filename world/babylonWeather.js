// world/babylonWeather.js — météo par acte

import { Color3 } from '@babylonjs/core';
import { Events } from '../core/events.js';

let _scene      = null;
let _overlay    = null;
let _currentAct = 1;

const WEATHER = {
  1: { name: 'cendres',  color: 'rgba(180,140,80,0.06)',  fog: 0.014, particles: 'ash'   },
  2: { name: 'pluie',    color: 'rgba(80,100,140,0.08)',  fog: 0.028, particles: 'rain'  },
  3: { name: 'brouillard',color:'rgba(40,80,40,0.12)',    fog: 0.040, particles: 'spore' },
  4: { name: 'spores',   color: 'rgba(100,40,120,0.10)', fog: 0.032, particles: 'spore' },
  5: { name: 'fracture', color: 'rgba(180,20,20,0.08)',  fog: 0.045, particles: 'ash'   },
};

export function initWeather(scene) {
  _scene = scene;

  // Overlay CSS pour les particules météo
  _overlay = document.createElement('canvas');
  Object.assign(_overlay.style, {
    position: 'fixed', inset: '0',
    pointerEvents: 'none', zIndex: '5',
    opacity: '0.7',
  });
  _overlay.width  = window.innerWidth;
  _overlay.height = window.innerHeight;
  document.body.appendChild(_overlay);
  window.addEventListener('resize', () => {
    _overlay.width  = window.innerWidth;
    _overlay.height = window.innerHeight;
  });

  Events.on('act:changed', ({ act }) => setWeatherForAct(act));
  setWeatherForAct(1);
}

export function setWeatherForAct(act) {
  _currentAct = act;
  const w = WEATHER[act] ?? WEATHER[1];

  // Fog scène
  if (_scene) {
    _scene.fogDensity = w.fog;
  }

  // Démarrer les particules
  _startParticles(w);
}

// ── Particules légères canvas 2D ───────────────────────────────────────────

const _particles = [];
let   _animFrame = null;

function _startParticles(w) {
  cancelAnimationFrame(_animFrame);
  _particles.length = 0;

  const ctx = _overlay?.getContext('2d');
  if (!ctx) return;

  const count = w.particles === 'rain' ? 80 : 40;
  for (let i = 0; i < count; i++) {
    _particles.push({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: w.particles === 'rain' ? (Math.random() - 0.3) * 1.5 : (Math.random() - 0.5) * 0.4,
      vy: w.particles === 'rain' ? 3 + Math.random() * 3 : 0.3 + Math.random() * 0.5,
      r:  w.particles === 'rain' ? 1 : 1.5 + Math.random() * 1.5,
      a:  0.2 + Math.random() * 0.4,
    });
  }

  const color = w.color;

  function draw() {
    ctx.clearRect(0, 0, _overlay.width, _overlay.height);
    for (const p of _particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > _overlay.height) { p.y = -4; p.x = Math.random() * _overlay.width; }
      if (p.x < 0) p.x = _overlay.width;
      if (p.x > _overlay.width) p.x = 0;

      ctx.beginPath();
      if (w.particles === 'rain') {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.vx * 3, p.y + p.vy * 3);
        ctx.strokeStyle = `rgba(180,200,255,${p.a})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      } else {
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = w.particles === 'spore'
          ? `rgba(160,80,200,${p.a})`
          : `rgba(200,180,120,${p.a})`;
        ctx.fill();
      }
    }
    _animFrame = requestAnimationFrame(draw);
  }
  draw();
}

export function updateWeather(dt) {
  // Rien à faire chaque frame — les particules tournent en RAF indépendant
}
