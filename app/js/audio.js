// Sound. A phrase plays from a bundled clip when one exists, otherwise from the
// device's Kannada voice, otherwise not at all.
// Clips come in voice packs: app/audio/<pack>/<hash>.mp3, listed in audio/manifest.json.
// The player picks a pack under You → Settings; a phrase missing from the chosen pack
// falls back to another pack, then to the device voice.
import { hash } from './util.js';
import * as Voices from '../vendor/sutra/audio/index.js';
import { EMBEDDED } from './config.js';

let packs = [];            // [{ id, label, clips: Set }]
let chosen = '';           // pack id the player asked for ('' = the default pack)
let fallback = '';         // manifest's default pack id
let voice = null, player = null, ac = null, onChange = () => {};

/** Accepts the current manifest ({ default, packs: { id: { label, clips } } }) and the first format ({ clips }). */
export const readManifest = (j) => Voices.readManifest(j, { id: 'kn', label: 'AI4Bharat' });
/** Which pack holds this clip, trying the preferred pack first. Pure. */
export const pickPack = (list, preferred, h) => Voices.pickPack(list, preferred, h) || null;
function findVoice() {
  try {
    const vs = window.speechSynthesis.getVoices();
    const v = vs.find((x) => /^kn[-_]/i.test(x.lang)) || vs.find((x) => /kannada/i.test(x.name)) || null;
    const changed = !!v !== !!voice; voice = v; if (changed) onChange();
  } catch (e) { /* no speech synthesis */ }
}
export async function initAudio(changed) {
  onChange = changed || onChange;
  if ('speechSynthesis' in window) { findVoice(); try { window.speechSynthesis.onvoiceschanged = findVoice; } catch (e) { /* ignore */ } }
  if (EMBEDDED) return;
  try {
    const res = await fetch('audio/manifest.json'); if (!res.ok) return;
    const m = readManifest(await res.json());
    if (m.packs.length) { packs = m.packs; fallback = m.fallback; onChange(); }
  } catch (e) { /* no clips bundled */ }
}
const current = () => (packs.some((p) => p.id === chosen) ? chosen : fallback);
export function setVoicePack(id) { chosen = id || ''; }
export const voicePacks = () => packs.map((p) => ({ id: p.id, label: p.label, clips: p.clips.size, on: p.id === current() }));
export const canSpeak = (text) => !!pickPack(packs, current(), hash(text)) || !!voice;
export const audioInfo = () => { const p = packs.find((x) => x.id === current()); return { clips: p ? p.clips.size : 0, voice: !!voice }; };
export function speak(text) {
  const h = hash(text), pack = pickPack(packs, current(), h);
  try { if (player) player.pause(); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  if (pack) {
    player = new Audio('audio/' + pack.id + '/' + h + '.mp3');
    player.play().catch(() => speakWithVoice(text));
    return;
  }
  speakWithVoice(text);
}
function speakWithVoice(text) {
  if (!voice) return;
  try {
    const u = new SpeechSynthesisUtterance(String(text).replace(/[‌‍]/g, ''));
    u.voice = voice; u.lang = voice.lang; u.rate = 0.82; window.speechSynthesis.speak(u);
  } catch (e) { /* ignore */ }
}
/** Fetch every clip of the chosen pack once so the service worker keeps them for offline use. */
export async function downloadAll(onProgress) {
  const p = packs.find((x) => x.id === current()); const all = p ? Array.from(p.clips) : []; let done = 0, failed = 0;
  for (let i = 0; i < all.length; i += 6) {
    await Promise.all(all.slice(i, i + 6).map((h) => fetch('audio/' + p.id + '/' + h + '.mp3').then((r) => { if (!r.ok) failed++; return r.arrayBuffer(); }).catch(() => { failed++; }).then(() => { done++; })));
    if (onProgress) onProgress(done, all.length);
  }
  return { total: all.length, failed };
}
export function sfx(ok) {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = ac.currentTime; const seq = ok ? [[660, 0], [880, 0.09]] : [[180, 0]];
    for (const [f, d] of seq) {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + d); g.gain.exponentialRampToValueAtTime(0.12, t0 + d + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + (ok ? 0.14 : 0.26));
      o.connect(g); g.connect(ac.destination); o.start(t0 + d); o.stop(t0 + d + 0.3);
    }
  } catch (e) { /* ignore */ }
}
