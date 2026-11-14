// Teaching language. The Kannada never changes; what changes is the language of the
// meanings, notes and interface, and the script used to show pronunciation.
//   en: Roman pronunciation · hi: Devanagari · or: Odia
// Interface strings are keyed by their English text: t('Start here').
// Lesson strings have stable keys (c.<cardId>.e …); see contentSlots().
import * as C from '../content/index.js';
import { BADGES, LEVELS, QUESTS } from './engine/progress.js';
import { toScript } from './engine/translit.js';
import hi from '../content/i18n/hi.js';
import or from '../content/i18n/or.js';

export const LANGS = [
  { id: 'en', name: 'English', pron: 'roman' },
  { id: 'hi', name: 'हिन्दी', pron: 'deva' },
  { id: 'or', name: 'ଓଡ଼ିଆ', pron: 'odia' }
];
const DICTS = { en: {}, hi, or };
let cur = LANGS[0], dict = {};

/** Every translatable lesson string: a stable key plus how to read and write it. */
export function contentSlots() {
  const s = []; const slot = (key, obj, prop) => s.push({ key, obj, prop });
  for (const c of Object.values(C.CARDS)) { if (c.t !== 'L') slot(`c.${c.id}.e`, c, 'e'); if (c.n) slot(`c.${c.id}.n`, c, 'n'); if (c.ex) slot(`c.${c.id}.x`, c.ex, 2); }
  for (const st of C.STATIONS) { slot(`s.${st.id}.en`, st, 'en'); slot(`s.${st.id}.blurb`, st, 'blurb'); }
  for (const l of C.LINES) { slot(`l.${l.n}.name`, l, 'name'); slot(`l.${l.n}.sub`, l, 'sub'); }
  for (const [id, d] of Object.entries(C.DIALOGS)) {
    slot(`d.${id}.who`, d, 'who'); slot(`d.${id}.intro`, d, 'intro');
    d.turns.forEach((tn, i) => { slot(`d.${id}.${i}.npc`, tn.npc, 2); slot(`d.${id}.${i}.goal`, tn, 'goal'); tn.opts.forEach((o, j) => slot(`d.${id}.${i}.o${j}`, o, 'e')); });
  }
  for (const tr of C.TRAPS) { slot(`t.${tr.k}.e`, tr, 'e'); slot(`t.${tr.k}.lure`, tr, 'lure'); slot(`t.${tr.k}.why`, tr, 'why'); }
  for (const row of C.STREET.native) slot(`st.${row[0]}`, row, 2);
  for (const row of C.STREET.loan) slot(`st.${row[0]}`, row, 1);
  for (const row of C.STREET.place) slot(`st.${row[0]}`, row, 1);
  for (const [key, n] of Object.entries(C.NOUNS)) slot(`n.${key}`, n, 2);
  for (const f of C.FRAMES) { slot(`f.${f.id}.en`, f, 'en'); slot(`f.${f.id}.hint`, f, 'hint'); }
  C.RULES.forEach((r, i) => { slot(`r.${i}.h`, r, 'h'); slot(`r.${i}.e`, r, 'e'); slot(`r.${i}.t`, r, 't'); });
  for (const m of [...C.MISSIONS, C.RAJYOTSAVA_MISSION]) slot(`m.${m.k}`, m, 't');
  for (const g of C.TWINS) slot(`tw.${g.grp}`, g, 'label');
  for (const [id, b] of Object.entries(BADGES)) { slot(`b.${id}.t`, b, 0); slot(`b.${id}.d`, b, 1); }
  for (const q of QUESTS) slot(`q.${q.id}`, q, 'label');
  LEVELS.forEach((l, i) => slot(`lv.${i}`, l, 1));
  return s;
}
for (const g of C.TWINS) g.label = g.grp;
const SLOTS = contentSlots();
const ENGLISH = SLOTS.map((s) => s.obj[s.prop]); // remembered once, before any switch

export const lang = () => cur.id;
export const nativePron = () => cur.pron !== 'roman';
/** Switch the teaching language. Rewrites the lesson data in place, so nothing else needs to know. */
export function setLang(id) {
  cur = LANGS.find((l) => l.id === id) || LANGS[0]; dict = DICTS[cur.id] || {};
  SLOTS.forEach((s, i) => { s.obj[s.prop] = dict[s.key] || ENGLISH[i]; });
  for (const c of Object.values(C.CARDS)) if (c.t === 'L') c.e = pron(c.k, c.r);
  if (typeof document !== 'undefined') document.documentElement.lang = cur.id;
}
/** Interface text. `en` is both the key and the fallback; {name} placeholders come from vars. */
export function t(en, vars) {
  let s = dict['ui:' + en] || en;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}
/** How a Kannada string sounds, in the script this learner reads. */
export function pron(k, roman) { return cur.pron === 'roman' ? roman : toScript(k, cur.pron); }
/** A lesson string by key, for the few places that are not plain data. */
export const L = (key, fallback) => dict[key] || fallback;
export const tx = t;
