#!/usr/bin/env node
// Checks every piece of lesson content. Run: npm run validate
// A Roman spelling must be exactly what the script says (see docs/content-guide.md),
// unless the word is a listed English loan.
import * as C from '../app/content/index.js';
import { LOANS } from '../app/content/loans.js';
import { translit } from '../app/js/engine/translit.js';

const errors = [];
const err = (...a) => errors.push(a.join(' '));
const strip = (s) => s.replace(/[‌‍]/g, '').replace(/[,.?!…·]/g, '');
const norm = (s) => strip(s).replace(/-/g, '').replace(/w/g, 'v');

export function checkPair(where, k, r) {
  const kt = k.trim().split(/\s+/), rt = r.trim().split(/\s+/);
  if (kt.length !== rt.length) { err(where, 'word count differs:', k, '|', r); return; }
  kt.forEach((kw, i) => {
    const want = norm(translit(kw)), got = norm(rt[i]);
    if (want === got) return;
    const loan = LOANS[strip(kw)];
    if (loan && loan === strip(rt[i])) return;
    err(where, 'roman mismatch:', kw, '→ expected', translit(kw), 'got', rt[i]);
  });
}

const { CARDS, STATIONS, DIALOGS } = C;
const used = new Set();
for (const s of STATIONS) {
  if (s.kind !== 'boss' && s.cards.length < 6) err('station', s.id, 'has fewer than 6 cards');
  for (const id of s.cards) { if (!CARDS[id]) err('station', s.id, 'references missing card', id); used.add(id); }
  if (s.dialog && !DIALOGS[s.dialog]) err('station', s.id, 'references missing dialog', s.dialog);
  if (!C.LINES.some((l) => l.n === s.line) && s.kind !== 'boss') err('station', s.id, 'is on unknown line', s.line);
}
if (new Set(STATIONS.map((s) => s.id)).size !== STATIONS.length) err('duplicate station id');
const seenK = new Map();
for (const c of Object.values(CARDS)) {
  if (!c.k || !c.r || !c.e) err('card', c.id, 'is missing k, r or e');
  if (c.t === 'L') { if (c.ex) checkPair('letter ' + c.id + ' example', c.ex[0], c.ex[1]); if (!/^(am|bam)$/.test(c.r)) checkPair('letter ' + c.id, c.k, c.r); }
  else checkPair('card ' + c.id, c.k, c.r);
  if (c.hi && !/[ऀ-ॿ]/.test(c.hi)) err('card', c.id, 'hi must be Devanagari');
  if (!used.has(c.id) && c.id !== 'rj1') err('card', c.id, 'is not on any station');
  if (seenK.has(c.k)) err('cards', seenK.get(c.k), 'and', c.id, 'share the same Kannada text'); else seenK.set(c.k, c.id);
}
for (const [id, d] of Object.entries(DIALOGS)) {
  if (!STATIONS.some((s) => s.dialog === id)) err('dialog', id, 'is not attached to a station');
  d.turns.forEach((t, i) => {
    checkPair(`dialog ${id}#${i} npc`, t.npc[0], t.npc[1]);
    if (t.opts.filter((o) => o.ok).length !== 1) err(`dialog ${id}#${i}`, 'needs exactly one correct option');
    if (t.opts.length < 3) err(`dialog ${id}#${i}`, 'needs at least three options');
    t.opts.forEach((o) => checkPair(`dialog ${id}#${i} option`, o.k, o.r));
  });
}
for (const t of C.TRAPS) checkPair('trap', t.k, t.r);
for (const [k, r] of C.STREET.native) checkPair('street', k, r);
for (const [key, n] of Object.entries(C.NOUNS)) checkPair('noun ' + key, n[0], n[1]);
for (const f of C.FRAMES) { checkPair('frame ' + f.id, f.tail[0], f.tail[1]); for (const p of f.pool) if (!C.NOUNS[p]) err('frame', f.id, 'uses missing noun', p); if (!/\{[nb]\}/.test(f.en)) err('frame', f.id, 'needs {n} or {b}'); }
for (const r of C.RULES) checkPair('rule "' + r.h + '"', r.k, r.r);
for (const m of [...C.MISSIONS, C.RAJYOTSAVA_MISSION]) checkPair('mission', m.k, m.r);
for (const g of C.TWINS) for (const [, k, s] of g.rows) checkPair('twin ' + k, k, s);

const phrases = Object.values(CARDS).filter((c) => !c.t).length;
if (process.argv[1] && process.argv[1].endsWith('validate-content.mjs')) {
  if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} content error(s)`); process.exit(1); }
  console.log(`content ok: ${phrases} phrase cards, ${Object.keys(CARDS).length - phrases} script cards, ${STATIONS.length} stations, ${Object.keys(DIALOGS).length} dialogues`);
}
export { errors };
