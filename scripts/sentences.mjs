#!/usr/bin/env node
// Prints every Kannada phrase the app can ask to hear, as JSON: [{ "text": "...", "lang": "kn" }, ...].
// This is all the recorder needs. The recording itself is done by wildarc-sutra's `tts`
// (the "tts" workflow in the Actions tab): see docs/audio.md.
import { byHash } from './gen-audio.mjs';

process.stdout.write(JSON.stringify([...byHash.values()].map((text) => ({ text, lang: 'kn' })), null, 1) + '\n');
