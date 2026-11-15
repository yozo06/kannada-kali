#!/usr/bin/env node
// Generates one MP3 per Kannada phrase so the app has audio everywhere, offline.
//
//   GOOGLE_TTS_KEY=your-key npm run audio            # make missing clips
//   npm run audio -- --list                          # just count what is needed
//   npm run audio -- --voice kn-IN-Wavenet-B --rate 0.9 --force
//
// The free, no-account route is scripts/gen-audio-ai4bharat.py (see docs/audio.md);
// this file also offers Google Cloud Text-to-Speech (kn-IN) as an alternative. The whole syllabus is roughly 15,000
// characters, far inside the monthly free tier. See docs/audio.md.
// Clips are named by a hash of the phrase (app/js/util.js `hash`), so re-running
// only makes what changed. A clip you record yourself with the same file name wins:
// existing files are never overwritten unless you pass --force.
import { mkdirSync, existsSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from '../app/content/index.js';
import { hash } from '../app/js/util.js';

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : dflt; };
const VOICE = opt('voice', 'kn-IN-Wavenet-A'), RATE = Number(opt('rate', '0.9'));
const dir = fileURLToPath(new URL('../app/audio/google/', import.meta.url));
const manifestPath = fileURLToPath(new URL('../app/audio/manifest.json', import.meta.url));

/** Every Kannada string the app can ask to hear. */
export function allPhrases() {
  const set = new Set(); const put = (s) => { if (s && /[ಀ-೿]/.test(s)) set.add(s); };
  for (const c of Object.values(C.CARDS)) { if (c.k !== 'ಕ್') put(c.k); if (c.ex) put(c.ex[0]); }
  for (const d of Object.values(C.DIALOGS)) for (const t of d.turns) { put(t.npc[0]); t.opts.forEach((o) => put(o.k)); }
  for (const f of C.FRAMES) for (const p of f.pool) put(C.forge(f, p).k);
  for (const m of [...C.MISSIONS, C.RAJYOTSAVA_MISSION]) put(m.k);
  for (const t of C.TRAPS) put(t.k);
  for (const list of Object.values(C.STREET)) for (const row of list) put(row[0]);
  put('ಏನು?');
  return [...set];
}
const phrases = allPhrases();
export const byHash = new Map();
for (const p of phrases) { const h = hash(p); if (byHash.has(h) && byHash.get(h) !== p) throw new Error('hash collision: ' + p + ' / ' + byHash.get(h)); byHash.set(h, p); }

/** Voice packs the app knows how to name. Any other folder under app/audio is listed under its own name. */
export const PACK_LABELS = { sarvam: 'Sarvam', kn: 'AI4Bharat', google: 'Google' };
/** Rebuild app/audio/manifest.json from the clip folders on disk. The first pack in PACK_LABELS order that has clips is the default. */
export function writeManifest() {
  const root = fileURLToPath(new URL('../app/audio/', import.meta.url)); const packs = {};
  const ids = readdirSync(root).filter((d) => statSync(join(root, d)).isDirectory());
  ids.sort((a, b) => (Object.keys(PACK_LABELS).indexOf(a) + 99) % 99 - (Object.keys(PACK_LABELS).indexOf(b) + 99) % 99 || a.localeCompare(b));
  for (const id of ids) {
    const clips = readdirSync(join(root, id)).filter((f) => f.endsWith('.mp3')).map((f) => f.slice(0, -4)).filter((h) => byHash.has(h)).sort();
    if (clips.length) packs[id] = { label: PACK_LABELS[id] || id, clips };
  }
  writeFileSync(manifestPath, JSON.stringify({ default: Object.keys(packs)[0] || null, packs }) + '\n');
  return Object.fromEntries(Object.entries(packs).map(([id, p]) => [id, p.clips.length]));
}
async function synth(text, key) {
  const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + encodeURIComponent(key), {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ input: { text: text.replace(/[‌‍]/g, '') }, voice: { languageCode: 'kn-IN', name: VOICE }, audioConfig: { audioEncoding: 'MP3', speakingRate: RATE, sampleRateHertz: 24000 } })
  });
  if (!res.ok) throw new Error('TTS ' + res.status + ': ' + (await res.text()).slice(0, 300));
  return Buffer.from((await res.json()).audioContent, 'base64');
}

if (process.argv[1] && process.argv[1].endsWith('gen-audio.mjs')) {
  const chars = phrases.reduce((n, p) => n + p.length, 0);
  if (args.includes('--export')) { // phrase list for an offline generator such as scripts/gen-audio-ai4bharat.py
    const out = opt('export', 'phrases.json');
    writeFileSync(out, JSON.stringify([...byHash].map(([h, text]) => ({ hash: h, text })), null, 0));
    console.log('wrote ' + out + ' (' + byHash.size + ' phrases)'); process.exit(0);
  }
  if (args.includes('--list')) { console.log(phrases.length + ' phrases, ' + chars + ' characters; clips per pack: ' + JSON.stringify(writeManifest())); process.exit(0); }
  const key = process.env.GOOGLE_TTS_KEY;
  if (!key) { console.error('Set GOOGLE_TTS_KEY (see docs/audio.md). Nothing generated.'); process.exit(1); }
  mkdirSync(dir, { recursive: true });
  const force = args.includes('--force'); let made = 0, kept = 0;
  for (const [h, text] of byHash) {
    const file = join(dir, h + '.mp3');
    if (existsSync(file) && !force) { kept++; continue; }
    writeFileSync(file, await synth(text, key)); made++;
    if (made % 25 === 0) console.log('  ' + made + ' clips…');
    await new Promise((r) => setTimeout(r, 120));
  }
  console.log('made ' + made + ', kept ' + kept + '; clips per pack: ' + JSON.stringify(writeManifest()) + '. Now run: npm run sw');
}
