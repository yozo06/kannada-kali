#!/usr/bin/env node
// Generates the "Sarvam" voice pack: one MP3 per phrase with Sarvam AI's Bulbul
// text-to-speech (kn-IN), written to app/audio/sarvam/. The clips are then part of
// the app; players never call Sarvam.
//
//   SARVAM_API_KEY=sk_... npm run audio:sarvam                 # make missing clips
//   SARVAM_API_KEY=sk_... npm run audio:sarvam -- --speaker kavya --pace 0.9 --force
//   SARVAM_API_KEY=sk_... npm run audio:sarvam -- --sample      # 6 clips only, to judge a voice
//
// The whole syllabus is under 8,000 characters. No key on your machine? Add the key as
// the repo secret SARVAM_API_KEY and run the "audio-sarvam" workflow on GitHub instead.
// See docs/audio.md.
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { byHash, writeManifest } from './gen-audio.mjs';

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] ? args[i + 1] : dflt; };
const SPEAKER = opt('speaker', process.env.SARVAM_SPEAKER || 'ritu');
const MODEL = opt('model', process.env.SARVAM_MODEL || 'bulbul:v3');
const PACE = Number(opt('pace', process.env.SARVAM_PACE || '0.9'));
const dir = fileURLToPath(new URL('../app/audio/sarvam/', import.meta.url));
const key = process.env.SARVAM_API_KEY;
const SAMPLE = ['ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?', 'ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ', 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬರ್ತೀರಾ?', 'ಕ', 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', 'ಊಟ ಆಯ್ತಾ?'];

const clean = (t) => t.replace(/[‌‍]/g, '').replace(/·/g, ',').replace(/\s+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function synth(text) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST', headers: { 'content-type': 'application/json', 'api-subscription-key': key },
      body: JSON.stringify({ text: clean(text), target_language_code: 'kn-IN', speaker: SPEAKER, model: MODEL, pace: PACE, output_audio_codec: 'mp3' })
    });
    if (res.ok) { const j = await res.json(); if (!j.audios || !j.audios[0]) throw new Error('no audio in response'); return Buffer.from(j.audios[0], 'base64'); }
    const body = (await res.text()).slice(0, 300);
    if ((res.status === 429 || res.status >= 500) && attempt < 5) { await sleep(2000 * (attempt + 1)); continue; }
    throw new Error('Sarvam ' + res.status + ': ' + body);
  }
}

if (!key) { console.error('Set SARVAM_API_KEY (see docs/audio.md). Nothing generated.'); process.exit(1); }
mkdirSync(dir, { recursive: true });
const force = args.includes('--force'), sample = args.includes('--sample');
let todo = [...byHash]; if (sample) todo = todo.filter(([, text]) => SAMPLE.includes(text));
let made = 0, kept = 0; const failed = [];
console.log(`Sarvam ${MODEL}, speaker ${SPEAKER}, pace ${PACE}: ${todo.length} phrases`);
for (const [h, text] of todo) {
  const file = join(dir, h + '.mp3');
  if (existsSync(file) && !force) { kept++; continue; }
  try { writeFileSync(file, await synth(text)); made++; }
  catch (e) { failed.push(text + ' | ' + e.message); if (failed.length === 1 && made === 0) { console.error('First request failed, stopping:\n  ' + failed[0]); process.exit(1); } }
  if (made && made % 50 === 0) console.log('  ' + made + ' clips…');
  await sleep(150);
}
console.log('made ' + made + ', kept ' + kept + ', failed ' + failed.length + '; clips per pack: ' + JSON.stringify(writeManifest()));
for (const f of failed) console.log('  FAILED: ' + f);
console.log('Now run: npm run sw');
process.exit(failed.length ? 1 : 0);
