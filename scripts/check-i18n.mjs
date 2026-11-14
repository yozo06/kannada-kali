#!/usr/bin/env node
// Checks the translation files in app/content/i18n against the current strings.
//   npm run i18n            report coverage per language, fail on broken entries
//   npm run i18n -- --missing hi   list untranslated keys (with English) for one language
// A missing translation is only a warning: the app shows English for that string.
import { contentStrings, uiStrings } from './export-strings.mjs';
import hi from '../app/content/i18n/hi.js';
import or from '../app/content/i18n/or.js';

const en = { ...contentStrings(), ...uiStrings() };
const dicts = { hi, or };
const holes = (s) => (String(s).match(/\{[a-z]+\}/g) || []).map((x) => (x === '{b}' ? '{n}' : x)).sort().join();
export function check() {
  const errors = [], coverage = {};
  for (const [lang, d] of Object.entries(dicts)) {
    let have = 0; const missing = [];
    for (const k in en) {
      if (!d[k] || !String(d[k]).trim()) { missing.push(k); continue; }
      have++;
      if (holes(en[k]) !== holes(d[k])) errors.push(`${lang}: placeholders differ in "${k}": ${en[k]} → ${d[k]}`);
    }
    for (const k in d) if (!(k in en) && k !== 'd.huh') errors.push(`${lang}: unknown key "${k}" (was the English text changed or the card removed?)`);
    coverage[lang] = { have, total: Object.keys(en).length, missing };
  }
  return { errors, coverage };
}
if (process.argv[1] && process.argv[1].endsWith('check-i18n.mjs')) {
  const { errors, coverage } = check(); const i = process.argv.indexOf('--missing');
  if (i >= 0) { const l = process.argv[i + 1]; const o = {}; for (const k of coverage[l].missing) o[k] = en[k]; console.log(JSON.stringify(o, null, 1)); process.exit(0); }
  for (const [l, c] of Object.entries(coverage)) console.log(`${l}: ${c.have}/${c.total} strings translated` + (c.missing.length ? ` (${c.missing.length} fall back to English)` : ''));
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
}
