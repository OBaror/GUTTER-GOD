// persistence/worldStateManager.js — acte courant + flags monde

import { getFlag, setFlag, getAllFlags } from './gameDatabase.js';
import { Events } from '../core/events.js';

const _state = {
  currentAct: 1,
  flags: {},
};

// ── Initialisation ─────────────────────────────────────────────────────────

export async function initWorldState() {
  const flags = await getAllFlags();
  Object.assign(_state.flags, flags);
  _state.currentAct = Number(_state.flags['world.act'] ?? 1);
}

// ── Acte ───────────────────────────────────────────────────────────────────

export function getCurrentAct() {
  return _state.currentAct;
}

export async function setAct(act) {
  _state.currentAct = act;
  await setFlag('world.act', act);
  Events.emit('act:changed', { act });
}

// ── Flags ──────────────────────────────────────────────────────────────────

export function getWorldFlag(key) {
  return _state.flags[key] ?? null;
}

export async function setWorldFlag(key, value) {
  _state.flags[key] = value;
  await setFlag(key, value);
  Events.emit('world:flagSet', { key, value });
}

export function hasFlag(key) {
  return _state.flags[key] != null && _state.flags[key] !== false;
}

// ── Snapshot ───────────────────────────────────────────────────────────────

export function getWorldSnapshot() {
  return { currentAct: _state.currentAct, flags: { ..._state.flags } };
}
