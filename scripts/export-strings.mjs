#!/usr/bin/env node
// Lists every string a translation must cover, as { key: English }.
//   node scripts/export-strings.mjs > strings.en.json
// Lesson keys are stable (built from card ids). Interface keys are "ui:" + the English
// text, collected from every t('…') call in app/js.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contentSlots } from '../app/js/i18n.js';

export function contentStrings() { const o = {}; for (const s of contentSlots()) o[s.key] = s.obj[s.prop]; o['d.huh'] = 'What? (that did not fit)'; return o; }
export function uiStrings() {
  const root = fileURLToPath(new URL('../app/js/', import.meta.url)); const o = {};
  const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
  for (const f of walk(root)) for (const m of readFileSync(f, 'utf8').matchAll(/\btx\('((?:[^'\\]|\\.)*)'/g)) { const en = m[1].replace(/\\'/g, "'"); o['ui:' + en] = en; }
  return o;
}
if (process.argv[1] && process.argv[1].endsWith('export-strings.mjs')) process.stdout.write(JSON.stringify({ ...contentStrings(), ...uiStrings() }, null, 1) + '\n');
