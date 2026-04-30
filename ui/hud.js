// ui/hud.js

import { Events }          from '../core/events.js';
import { getActiveQuests } from '../gameplay/rpgProgression.js';
import { QUEST_DEFS }      from '../gameplay/storyData.js';
import { CONFIG }          from '../core/config.js';

let _els = {};

export function initHud() {
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = '/ui/hud.css';
  document.head.appendChild(link);

  document.getElementById('hud-root').innerHTML = `
    <div id="hud-bl">
      <div class="hud-row">
        <span class="hud-lbl">❤</span>
        <div class="hud-track"><div id="hud-hp" class="hud-fill hp"></div></div>
        <span id="hud-hp-n" class="hud-num">100</span>
      </div>
      <div class="hud-row">
        <span class="hud-lbl">⚡</span>
        <div class="hud-track"><div id="hud-st" class="hud-fill st"></div></div>
        <span id="hud-st-n" class="hud-num">100</span>
      </div>
      <div id="hud-lvl">Niv. 1</div>
    </div>
    <div id="hud-quest">
      <div id="hud-qt">—</div>
      <div id="hud-qs"></div>
    </div>
    <div id="hud-cross"></div>
    <div id="hud-lock"></div>
    <div id="hud-notifs"></div>
    <div id="hud-hint">[I] Inventaire &nbsp; [J] Journal &nbsp; [P] Paramètres &nbsp; [M] Minimap &nbsp; [F10/O] Pause &nbsp; [V] Roue UI</div>
  `;

  _els = {
    hp:     document.getElementById('hud-hp'),
    hpN:    document.getElementById('hud-hp-n'),
    st:     document.getElementById('hud-st'),
    stN:    document.getElementById('hud-st-n'),
    lvl:    document.getElementById('hud-lvl'),
    qt:     document.getElementById('hud-qt'),
    qs:     document.getElementById('hud-qs'),
    lock:   document.getElementById('hud-lock'),
    notifs: document.getElementById('hud-notifs'),
  };

  Events.on('player:damaged',  ({ hp })    => updateHp(hp, null));
  Events.on('player:respawned',()          => updateHp(CONFIG.player.maxHp * 0.5, CONFIG.player.maxHp));
  Events.on('combat:lockOn',   ()          => _els.lock.classList.add('on'));
  Events.on('combat:lockOff',  ()          => _els.lock.classList.remove('on'));
  Events.on('quest:completed', ({ questId })=> notify(`✓ ${QUEST_DEFS[questId]?.title ?? questId}`));
  Events.on('player:levelUp',  ({ level }) => { _els.lvl.textContent = `Niv. ${level}`; notify(`⬆ Niveau ${level} !`); });
  Events.on('loot:picked',     ({ itemId })=> notify(`+ ${itemId.replace(/-/g,' ')}`));
  Events.on('quest:updated',   ()          => refreshQuest());
  Events.on('enemy:attack',    ()          => _flashDmg());
  Events.on('combat:comboStep',({ step, dmg }) => _showCombo(step, dmg));
  Events.on('combat:miss',     ()          => _showMiss());
  Events.on('combat:bulletTime',({ active }) => _toggleBulletTime(active));
  Events.on('combat:dodge',    ()          => _flashDodge());
}

export function updateHp(current, max) {
  if (!_els.hp) return;
  const m   = max ?? CONFIG.player.maxHp;
  const pct = Math.max(0, Math.min(1, current / m)) * 100;
  _els.hp.style.width    = pct + '%';
  _els.hpN.textContent   = Math.ceil(current);
  _els.hp.style.background = pct > 50 ? '#4ae84a' : pct > 25 ? '#e8c84a' : '#e84a4a';
}

export function updateStamina(current, max) {
  if (!_els.st) return;
  _els.st.style.width  = Math.max(0, Math.min(100, current / max * 100)) + '%';
  _els.stN.textContent = Math.ceil(current);
}

export function refreshQuest() {
  const active = getActiveQuests();
  if (!active.length) { _els.qt.textContent = 'Aucune quête active'; _els.qs.textContent = ''; return; }
  const q = active[0];
  _els.qt.textContent = q.title;
  _els.qs.textContent = q.steps[0]?.desc ?? '';
}

export function notify(msg) {
  const el = document.createElement('div');
  el.className   = 'notif';
  el.textContent = msg;
  _els.notifs.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function _flashDmg() {
  const el = document.createElement('div');
  Object.assign(el.style, { position:'fixed', inset:'0', background:'rgba(220,0,0,0.18)', pointerEvents:'none', zIndex:'80' });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 180);
}

// Indicateur combo (3 points en bas au centre)
let _comboEl = null;
function _showCombo(step, dmg) {
  if (!_comboEl) {
    _comboEl = document.createElement('div');
    Object.assign(_comboEl.style, {
      position:'fixed', bottom:'160px', left:'50%',
      transform:'translateX(-50%)',
      display:'flex', gap:'8px', pointerEvents:'none', zIndex:'70',
    });
    document.body.appendChild(_comboEl);
  }
  // 3 points : actif = jaune, inactif = gris
  const dots = [0,1,2].map(i => {
    const d = document.createElement('div');
    Object.assign(d.style, {
      width:'10px', height:'10px', borderRadius:'50%',
      background: i <= step ? '#e8c84a' : 'rgba(255,255,255,0.2)',
      boxShadow: i === step ? '0 0 8px #e8c84a' : 'none',
      transition: 'all 0.1s',
    });
    return d;
  });
  _comboEl.innerHTML = '';
  dots.forEach(d => _comboEl.appendChild(d));
  // Afficher le dégât
  _showDmgNumber(dmg);
  // Cacher après 1.5s
  clearTimeout(_comboEl._timer);
  _comboEl._timer = setTimeout(() => { if (_comboEl) _comboEl.innerHTML = ''; }, 1500);
}

function _showDmgNumber(dmg) {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position:'fixed',
    top: `${40 + Math.random() * 20}%`,
    left: `${45 + Math.random() * 10}%`,
    color:'#e8c84a', fontWeight:'700', fontSize:'22px',
    pointerEvents:'none', zIndex:'90',
    textShadow:'0 0 8px rgba(0,0,0,0.8)',
    animation:'dmgpop 0.6s ease forwards',
  });
  el.textContent = `-${dmg}`;
  document.body.appendChild(el);
  // Ajouter keyframe si pas encore fait
  if (!document.getElementById('dmg-style')) {
    const s = document.createElement('style');
    s.id = 'dmg-style';
    s.textContent = '@keyframes dmgpop{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-40px)}}';
    document.head.appendChild(s);
  }
  setTimeout(() => el.remove(), 650);
}

function _showMiss() {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position:'fixed', top:'45%', left:'50%',
    transform:'translateX(-50%)',
    color:'rgba(255,255,255,0.5)', fontSize:'14px',
    pointerEvents:'none', zIndex:'90',
  });
  el.textContent = 'Hors portée';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

let _btOverlay = null;
function _toggleBulletTime(active) {
  if (active) {
    _btOverlay = document.createElement('div');
    Object.assign(_btOverlay.style, {
      position:'fixed', inset:'0',
      border:'3px solid rgba(100,180,255,0.6)',
      boxShadow:'inset 0 0 60px rgba(100,180,255,0.15)',
      pointerEvents:'none', zIndex:'75',
      transition:'opacity 0.2s',
    });
    document.body.appendChild(_btOverlay);
  } else {
    _btOverlay?.remove();
    _btOverlay = null;
  }
}

function _flashDodge() {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position:'fixed', inset:'0',
    background:'rgba(255,255,255,0.08)',
    pointerEvents:'none', zIndex:'80',
    transition:'opacity 0.15s',
  });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 200);
}
