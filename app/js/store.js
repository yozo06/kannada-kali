// Where progress lives: local profiles in the browser, with a text code to move
// a profile between devices. No server. Falls back to memory if storage is blocked.
import { newState, normalize, merge } from './engine/progress.js';
import { localStore } from '../vendor/sutra/browser/storage.js';
import { encodeCode, decodeCode } from '../vendor/sutra/save/index.js';

const PKEY = 'kk.profiles.v1', SKEY = 'kk.state.', LEGACY = 'kannadaKali.v1';
const ls = localStore(); // falls back to memory when the browser blocks storage
/** Small device-wide preferences, such as the language of the welcome screen. */
export const getPref = (k) => ls.get('kk.pref.' + k);
export const setPref = (k, v) => ls.set('kk.pref.' + k, v);
const parse = (s) => { try { return JSON.parse(s); } catch (e) { return null; } };
const newId = () => 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36);

function writeIndex(ix) { ls.set(PKEY, JSON.stringify(ix)); }
/** { cur, list: [{ id, name, av }] }. Adopts a save from the first version of the game if one exists. */
export function profiles() {
  let ix = parse(ls.get(PKEY));
  if (!ix || !Array.isArray(ix.list)) ix = { cur: null, list: [] };
  if (!ix.list.length) {
    const old = parse(ls.get(LEGACY));
    if (old && old.v === 1) { const id = newId(); ix = { cur: id, list: [{ id, name: 'You', av: 0 }] }; ls.set(SKEY + id, JSON.stringify(normalize(old))); writeIndex(ix); }
  }
  if (ix.list.length && !ix.list.some((p) => p.id === ix.cur)) ix.cur = ix.list[0].id;
  return ix;
}
export function createProfile(name, av, state) {
  const ix = profiles(); const id = newId();
  ix.list.push({ id, name: String(name || 'Player').trim().slice(0, 24) || 'Player', av: av || 0 }); ix.cur = id;
  ls.set(SKEY + id, JSON.stringify(state ? normalize(state) : newState())); writeIndex(ix);
  return id;
}
export function switchProfile(id) { const ix = profiles(); if (ix.list.some((p) => p.id === id)) { ix.cur = id; writeIndex(ix); } }
export function removeProfile(id) {
  const ix = profiles(); ix.list = ix.list.filter((p) => p.id !== id); ls.del(SKEY + id);
  if (ix.cur === id) ix.cur = ix.list.length ? ix.list[0].id : null;
  writeIndex(ix);
}
export const loadState = (id) => normalize(parse(ls.get(SKEY + id)));
export function saveState(id, S) { if (id) ls.set(SKEY + id, JSON.stringify(S)); }

/* ----- save codes ----- */
/** A profile as one line of text: "KK1." + base64url(JSON). The format is wildarc-sutra's save code. */
export function exportCode(S, name) { return encodeCode('KK1', { n: name || '', s: S }); }
export function importCode(code) {
  const read = decodeCode('KK1', String(code)); if (!read.ok) return null;
  const j = read.value; if (!j || !j.s || j.s.v !== 1) return null;
  return { name: String(j.n || '').slice(0, 24), state: normalize(j.s) };
}

/* ----- optional sync when the page runs as a claude.ai artifact ----- */
let doc = null, timer = null, busy = false, status = 'off';
export const cloudStatus = () => status;
export async function initCloud(getState, hasCard, onMerged) {
  try {
    if (typeof window === 'undefined' || !window.claude || !window.claude.use) return;
    const db = await window.claude.use('db'), user = await window.claude.use('user');
    if (!db || !user) return;
    const id = await user.id(); if (!id) return;
    doc = db.doc('data/users/' + id + '/progress');
    const snap = await doc.get(); status = 'synced';
    if (snap.exists) { if (merge(getState(), snap.data(), hasCard)) { onMerged(); pushCloud(getState, 0); } }
    else if (getState().xp > 0) pushCloud(getState, 0);
  } catch (e) { doc = null; status = 'off'; }
}
export function pushCloud(getState, delay = 1800) {
  if (!doc) return;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    if (!doc || busy) return; busy = true;
    try { await doc.set(JSON.parse(JSON.stringify(getState()))); status = 'synced'; }
    catch (e) { doc = null; status = 'off'; } // do not keep retrying a refused write
    busy = false;
  }, delay);
}
