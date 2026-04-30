// gameplay/rpgProgression.js — XP, level, quêtes, inventaire

import { Events } from '../core/events.js';
import { CONFIG } from '../core/config.js';
import { QUEST_DEFS, ITEM_DEFS } from './storyData.js';
import { setMaxHp, heal } from './babylonPlayerHealth.js';
import { setItem, setQuest } from '../persistence/gameDatabase.js';

const _prog = {
  xp:        0,
  level:     1,
  quests:    {},   // questId → { status: 'active'|'done', progress: {} }
  inventory: {},   // itemId  → quantity
};

// ── Init ───────────────────────────────────────────────────────────────────

export function initProgression(savedPlayer) {
  if (savedPlayer) {
    _prog.xp    = savedPlayer.xp    ?? 0;
    _prog.level = savedPlayer.level ?? 1;
  }

  // Appliquer les bonus de niveau
  _applyLevelBonuses(_prog.level);

  // Écouter les kills ennemis
  Events.on('enemy:died', ({ type, xp }) => {
    gainXp(xp ?? 0);
    _trackKill(type);
  });

  // Activer les quêtes Act 1 par défaut
  for (const id of Object.keys(QUEST_DEFS)) {
    if (!_prog.quests[id]) activateQuest(id);
  }
}

// ── XP & Level ─────────────────────────────────────────────────────────────

export function gainXp(amount) {
  _prog.xp += amount;
  const thresholds = CONFIG.progression.xpPerLevel;
  while (_prog.level < CONFIG.progression.maxLevel && _prog.xp >= thresholds[_prog.level]) {
    _prog.level++;
    _applyLevelBonuses(_prog.level);
    Events.emit('player:levelUp', { level: _prog.level });
  }
}

function _applyLevelBonuses(level) {
  const newMax = CONFIG.player.maxHp + (level - 1) * CONFIG.progression.hpPerLevel;
  setMaxHp(newMax);
}

// ── Quêtes ─────────────────────────────────────────────────────────────────

export function activateQuest(id) {
  if (_prog.quests[id]?.status === 'done') return;
  _prog.quests[id] = { status: 'active', progress: {} };
  Events.emit('quest:updated', { questId: id, status: 'active' });
}

export function trackProximity(x, z) {
  for (const [id, state] of Object.entries(_prog.quests)) {
    if (state.status !== 'active') continue;
    const def = QUEST_DEFS[id];
    if (!def) continue;
    for (const step of def.steps) {
      if (step.type !== 'proximity') continue;
      if (state.progress[step.id]) continue;
      const dx = x - step.x, dz = z - step.z;
      if (Math.sqrt(dx * dx + dz * dz) <= step.radius) {
        state.progress[step.id] = true;
        _checkQuestComplete(id);
      }
    }
  }
}

function _trackKill(enemyType) {
  for (const [id, state] of Object.entries(_prog.quests)) {
    if (state.status !== 'active') continue;
    const def = QUEST_DEFS[id];
    if (!def) continue;
    for (const step of def.steps) {
      if (step.type !== 'kill' || step.enemyType !== enemyType) continue;
      state.progress[step.id] = (state.progress[step.id] ?? 0) + 1;
      Events.emit('quest:updated', { questId: id, status: 'active' });
      _checkQuestComplete(id);
    }
  }
}

function _checkQuestComplete(id) {
  const state = _prog.quests[id];
  const def   = QUEST_DEFS[id];
  if (!state || !def) return;

  const done = def.steps.every(step => {
    if (step.type === 'kill')      return (state.progress[step.id] ?? 0) >= step.count;
    if (step.type === 'proximity') return !!state.progress[step.id];
    if (step.type === 'pickup')    return !!state.progress[step.id];
    return false;
  });

  if (done) {
    state.status = 'done';
    gainXp(def.reward.xp ?? 0);
    for (const itemId of (def.reward.items ?? [])) addItem(itemId, 1);
    Events.emit('quest:completed', { questId: id });
    setQuest(id, 'done', state);
  }
}

// ── Inventaire ─────────────────────────────────────────────────────────────

export function addItem(itemId, qty = 1) {
  _prog.inventory[itemId] = (_prog.inventory[itemId] ?? 0) + qty;
  Events.emit('loot:picked', { itemId, qty });
  setItem(itemId, ITEM_DEFS[itemId]?.type ?? 'misc', _prog.inventory[itemId]);
}

export function useItem(itemId) {
  const def = ITEM_DEFS[itemId];
  if (!def || !_prog.inventory[itemId]) return false;
  if (def.type === 'consumable' && def.healAmount) {
    heal(def.healAmount);
    _prog.inventory[itemId]--;
    if (_prog.inventory[itemId] <= 0) delete _prog.inventory[itemId];
    return true;
  }
  return false;
}

export function getProgression() {
  return {
    xp:        _prog.xp,
    level:     _prog.level,
    quests:    { ..._prog.quests },
    inventory: { ..._prog.inventory },
  };
}
export function getInventory()   { return { ..._prog.inventory }; }
export function getActiveQuests(){ return Object.entries(_prog.quests).filter(([,v]) => v.status === 'active').map(([id]) => QUEST_DEFS[id]).filter(Boolean); }
