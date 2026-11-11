// Turns cards into questions. A context `ctx` supplies the data and the player:
//   { CARDS, S, audio(text) -> bool }
import { rnd, shuffle, editDistance } from '../util.js';
import { hasKannada } from './translit.js';

/** What each multiple-choice type shows as the prompt (ask) and as the options (opt).
 *  kr = Kannada with Roman per the player's setting, k = script only, r = Roman only. */
export const QTYPES = {
  k2e: { ask: 'kr', opt: 'e', label: 'What does this mean?' },
  e2k: { ask: 'e', opt: 'kr', label: 'How do you say it?' },
  hi2k: { ask: 'hi', opt: 'kr', label: 'Which Kannada word is this?' },
  listen: { ask: 'audio', opt: 'e', label: 'Listen, then choose the meaning' },
  l2s: { ask: 'k', opt: 'r', label: 'Which sound is this?' },
  s2l: { ask: 'r', opt: 'k', label: 'Which letter makes this sound?' },
  dv2l: { ask: 'hi', opt: 'k', label: 'Which Kannada letter is this twin?' },
  a2l: { ask: 'audio', opt: 'k', label: 'Listen, then choose the letter' },
  w2e: { ask: 'k', opt: 'e', label: 'Read the board' }
};
export const eKey = (c) => String(c.e).replace(/₹/g, '');
export const isSentence = (c) => { const n = c.k.split(' ').length; return !c.t && n >= 2 && n <= 6; };
const val = (c, f) => (f === 'e' ? eKey(c) : (f === 'kr' || f === 'k' || f === 'audio') ? c.k : c[f]);

/** The right card plus up to three distractors that differ in both prompt and answer. */
export function mcOptions(card, type, scope, ctx) {
  const { ask, opt } = QTYPES[type];
  const fits = (c) => c && c.id !== card.id && (c.t || '') === (card.t || '') && val(c, ask) && val(c, opt) &&
    val(c, ask) !== val(card, ask) && val(c, opt) !== val(card, opt);
  const used = new Set([val(card, opt)]); const out = [];
  const take = (ids) => { for (const c of shuffle(ids.map((id) => ctx.CARDS[id]).filter(fits))) { const k = val(c, opt); if (!used.has(k)) { out.push(c); used.add(k); if (out.length === 3) return; } } };
  if (scope && scope.length) take(scope);
  if (out.length < 3) take(Object.keys(ctx.CARDS));
  return shuffle([card].concat(out));
}
/** Choose a question type for a card, weighted by how well the player knows it. */
export function makeQ(card, scope, ctx, opts = {}) {
  const rec = ctx.S.cards[card.id]; const seen = !!rec; const box = rec ? rec[0] : 0; const t = [];
  const aud = ctx.audio && ctx.audio(card.k);
  if (card.t === 'L') {
    t.push('l2s', 's2l'); t.push(seen ? 's2l' : 'l2s');
    if (card.hi) t.push('dv2l');
    if (seen && aud) t.push('a2l');
  } else if (card.t === 'W') {
    t.push('w2e', 'w2e'); if (seen && aud) t.push('listen');
  } else {
    if (!seen) { t.push('k2e', 'k2e', 'e2k'); if (card.hi) t.push('hi2k'); if (isSentence(card)) t.push('build'); }
    else {
      t.push('e2k', 'k2e'); if (card.hi) t.push('hi2k');
      if (isSentence(card)) t.push('build', 'build');
      if (aud) t.push('listen');
      if (box >= 2 && ctx.S.set.typing && card.r.length <= 24 && /[a-z]/i.test(card.r)) t.push('type', 'type');
    }
    if (opts.radar && card.hi) t.push('hi2k', 'hi2k', 'k2e');
  }
  return { t: t[rnd(t.length)], id: card.id, scope, try: 0 };
}
/** Fill in the options or tiles a question needs before it is shown. Idempotent. */
export function prep(q, ctx) {
  if (q.ready) return q;
  const c = q.card || ctx.CARDS[q.id]; q.card = c;
  if (q.t === 'build') {
    const toks = c.k.split(' '), rom = c.r.split(' ');
    q.tiles = toks.map((k, i) => ({ k, r: rom[i] || k, i }));
    const extra = []; const have = new Set(rom);
    const pool = (q.scope && q.scope.length ? q.scope : Object.keys(ctx.CARDS)).map((id) => ctx.CARDS[id]).filter((x) => x && !x.t && x.id !== c.id);
    for (const x of shuffle(pool)) {
      if (extra.length >= 2) break;
      const xt = x.k.split(' '), xr = x.r.split(' '); const j = rnd(xt.length);
      if (xr[j] && !have.has(xr[j]) && !extra.some((e) => e.r === xr[j])) extra.push({ k: xt[j], r: xr[j], i: 90 + extra.length });
    }
    q.bank = shuffle(q.tiles.concat(extra)); q.sel = [];
  } else if (QTYPES[q.t]) {
    q.opts = mcOptions(c, q.t, q.scope, ctx);
  }
  q.ready = 1; return q;
}
/** Loosely normalise typed Roman: case, spaces, punctuation and doubled letters do not matter. */
export function normRoman(s) {
  return String(s).toLowerCase().replace(/w/g, 'v').replace(/[^a-z]/g, '').replace(/(.)\1+/g, '$1');
}
const normK = (s) => String(s).replace(/[‌‍\s,.?!]/g, '');
/** Mark a typed answer. ok = accept. close = accepted despite a one-letter slip. */
export function checkTyped(input, card) {
  const raw = String(input || '').trim();
  if (!raw) return { ok: false, close: false };
  if (hasKannada(raw)) return { ok: normK(raw) === normK(card.k), close: false };
  const a = normRoman(raw), b = normRoman(card.r);
  if (a === b) return { ok: true, close: false };
  const slip = b.length >= 6 && editDistance(a, b) <= 1;
  return { ok: slip, close: slip };
}
/** Unknown cards first, then weakest; a little jitter keeps rides fresh. */
export function pickCards(ids, n, ctx) {
  const box = (id) => (ctx.S.cards[id] ? ctx.S.cards[id][0] : 0);
  return shuffle(ids).sort((a, b) => box(a) - box(b) + (rnd(3) - 1)).slice(0, Math.min(n, ids.length)).map((id) => ctx.CARDS[id]);
}
