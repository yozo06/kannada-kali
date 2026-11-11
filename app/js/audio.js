// Sound. A phrase plays from a bundled clip when one exists (audio/kn/<hash>.mp3),
// otherwise from the device's Kannada voice, otherwise not at all.
import { hash } from './util.js';
import { EMBEDDED } from './config.js';

const CLIP_DIR = 'audio/kn/';
let clips = new Set(), voice = null, player = null, ac = null, onChange = () => {};

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
    const j = await res.json();
    if (j && Array.isArray(j.clips) && j.clips.length) { clips = new Set(j.clips); onChange(); }
  } catch (e) { /* no clips bundled */ }
}
export const canSpeak = (text) => clips.has(hash(text)) || !!voice;
export const audioInfo = () => ({ clips: clips.size, voice: !!voice });
export function speak(text) {
  const h = hash(text);
  try { if (player) player.pause(); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  if (clips.has(h)) {
    player = new Audio(CLIP_DIR + h + '.mp3');
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
/** Fetch every clip once so the service worker keeps them for offline use. */
export async function downloadAll(onProgress) {
  const all = Array.from(clips); let done = 0, failed = 0;
  for (let i = 0; i < all.length; i += 6) {
    await Promise.all(all.slice(i, i + 6).map((h) => fetch(CLIP_DIR + h + '.mp3').then((r) => { if (!r.ok) failed++; return r.arrayBuffer(); }).catch(() => { failed++; }).then(() => { done++; })));
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
