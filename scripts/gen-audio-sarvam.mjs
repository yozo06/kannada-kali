#!/usr/bin/env node
// Generates the "Sarvam" voice pack: one MP3 per phrase with Sarvam AI's Bulbul
// text-to-speech (Kannada), written to app/audio/sarvam/. The clips are then part of
// the app; players never call Sarvam.
//
//   1. Hear some voices first (6 short phrases each, costs well under ₹1 per voice):
//        SARVAM_API_KEY=sk_... npm run audio:sarvam -- --sample --speakers ritu,kavya,kavitha,roopa,gokul
//      Clips land in samples/sarvam/<speaker>/ (not part of the app, not committed).
//   2. Make the whole pack with the voice you liked (about 7,700 characters):
//        SARVAM_API_KEY=sk_... npm run audio:sarvam -- --speaker kavya
//        npm run sw
//
// Options: --pace 0.9 (0.5 to 2.0) · --model bulbul:v3 | bulbul:v4-flash · --force (redo existing clips)
// No key on your machine? Add it as the repo secret SARVAM_API_KEY and run the "audio-sarvam"
// workflow on GitHub instead. See docs/audio.md.
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { byHash, writeManifest } from './gen-audio.mjs';
import { translit } from '../app/js/engine/translit.js';

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : dflt; };
const MODEL = opt('model', process.env.SARVAM_MODEL || 'bulbul:v3');
const PACE = Number(opt('pace', process.env.SARVAM_PACE || '0.9'));
const key = process.env.SARVAM_API_KEY;
const SAMPLE = ['ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?', 'ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ', 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬರ್ತೀರಾ?', 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', 'ಊಟ ಆಯ್ತಾ?', 'ಕ'];

export const clean = (t) => t.replace(/[‌‍]/g, '').replace(/·/g, ',').replace(/\s+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Sarvam's reference names the language field `language_code`; older examples use
// `target_language_code`. Try the first, switch once if the API objects, then stick with what worked.
let langField = 'language_code';
async function synth(text, speaker) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST', headers: { 'content-type': 'application/json', 'api-subscription-key': key },
      body: JSON.stringify({ text: clean(text), [langField]: 'kn-IN', speaker, model: MODEL, pace: PACE, output_audio_codec: 'mp3' })
    });
    if (res.ok) { const j = await res.json(); if (!j.audios || !j.audios[0]) throw new Error('no audio in response'); return Buffer.from(j.audios[0], 'base64'); }
    const body = (await res.text()).slice(0, 400);
    if ((res.status === 400 || res.status === 422) && /language_code/.test(body) && attempt === 0) { langField = langField === 'language_code' ? 'target_language_code' : 'language_code'; continue; }
    if ((res.status === 429 || res.status >= 500) && attempt < 5) { await sleep(2000 * (attempt + 1)); continue; }
    throw new Error('Sarvam ' + res.status + ': ' + body);
  }
}
const isMp3 = (b) => b.length > 300 && ((b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33) || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0));

async function run() {
  if (!key) { console.error('Set SARVAM_API_KEY (see docs/audio.md). Nothing generated.'); process.exit(1); }
  if (args.includes('--sample')) {
    const speakers = opt('speakers', opt('speaker', 'ritu,kavya,kavitha,roopa,gokul')).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    const root = fileURLToPath(new URL('../samples/sarvam/', import.meta.url)); let chars = 0;
    for (const sp of speakers) {
      const dir = join(root, sp); mkdirSync(dir, { recursive: true });
      for (const [i, text] of SAMPLE.entries()) {
        try { const b = await synth(text, sp); if (!isMp3(b)) throw new Error('reply is not MP3 audio'); writeFileSync(join(dir, (i + 1) + '-' + translit(clean(text)).replace(/[^A-Za-z]+/g, '-').replace(/^-|-$/g, '') + '.mp3'), b); chars += clean(text).length; }
        catch (e) { console.error(sp + ': ' + e.message); if (i === 0) break; }
        await sleep(150);
      }
      console.log('sampled ' + sp);
    }
    console.log(`Samples in samples/sarvam/ (${MODEL}, pace ${PACE}, ${chars} characters used). Listen, then run again with --speaker <name>.`);
    return;
  }
  const speaker = opt('speaker', process.env.SARVAM_SPEAKER || 'ritu').toLowerCase();
  const dir = fileURLToPath(new URL('../app/audio/sarvam/', import.meta.url)); mkdirSync(dir, { recursive: true });
  const force = args.includes('--force'); let made = 0, kept = 0; const failed = [];
  console.log(`Sarvam ${MODEL}, speaker ${speaker}, pace ${PACE}: ${byHash.size} phrases`);
  for (const [h, text] of byHash) {
    const file = join(dir, h + '.mp3');
    if (existsSync(file) && !force) { kept++; continue; }
    try { const b = await synth(text, speaker); if (!isMp3(b)) throw new Error('reply is not MP3 audio'); writeFileSync(file, b); made++; }
    catch (e) { failed.push(text + ' | ' + e.message); if (made === 0) { console.error('First request failed, stopping:\n  ' + failed[0]); process.exit(1); } if (failed.length > 20) { console.error('Too many failures, stopping.'); break; } }
    if (made && made % 50 === 0) console.log('  ' + made + ' clips…');
    await sleep(150);
  }
  console.log('made ' + made + ', kept ' + kept + ', failed ' + failed.length + '; clips per pack: ' + JSON.stringify(writeManifest()));
  for (const f of failed) console.log('  FAILED: ' + f);
  console.log('Now run: npm run sw');
  process.exit(failed.length ? 1 : 0);
}
if (process.argv[1] && process.argv[1].endsWith('gen-audio-sarvam.mjs')) run();
