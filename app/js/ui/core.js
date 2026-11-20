// Shared UI state and helpers. Views register themselves in `views` (tabs) and
// `screens` (full-screen pages); actions register in `A` and are triggered by
// any element with data-a="<name>".
import { CARDS, STATIONS, DIALOGS } from '../../content/index.js';
import { esc } from '../util.js';
import { tx, pron, nativePron, lang } from '../i18n.js';
import { toScript } from '../engine/translit.js';
import { canSpeak, speak, sfx as playSfx } from '../audio.js';
import { saveState, pushCloud } from '../store.js';
import { prep, QTYPES } from '../engine/questions.js';
import { current } from '../engine/session.js';

export const G = {
  S: null,            // the current profile's saved state
  pid: null,          // current profile id
  profile: null,      // { id, name, av }
  R: null,            // ride in progress
  D: null,            // boss chat in progress
  UI: { tab: 'map', screen: null, scroll: true, q: '', forge: { f: 0, n: 0 }, fresh: { badges: [], quests: [] }, confirm: '', open: {}, typed: '', msg: '' },
  install: null,      // deferred beforeinstallprompt event
  hooks: { entered() {} }
};
export const ctx = { CARDS, STATIONS, DIALOGS, get S() { return G.S; }, audio: canSpeak, get native() { return nativePron(); } };
/** The matching letter in the learner's own script: Devanagari, or Odia for Odia readers. */
export const twinD = (k, d) => (lang() === 'or' ? toScript(k, 'odia') : d);
export const STN = Object.fromEntries(STATIONS.map((s) => [s.id, s]));
export const views = {}, screens = {}, A = {};
export const $ = (s, r) => (r || document).querySelector(s);

export const IC = {
  flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.5 2c.4 3.1 4.5 5.3 4.5 10a5 5 0 0 1-10 .3c0-1.9.9-3.1 1.9-4.2.1 1.3.7 2.1 1.5 2.6C10 7.2 11 4.5 12.5 2z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 2 5 13.5h5.6L9.5 22 19 9.5h-5.7z"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 6 6.5.8-4.8 4.5 1.3 6.5L12 17.4l-5.8 3.2 1.3-6.5-4.8-4.5 6.5-.8z"/></svg>',
  spk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.6a5 5 0 0 1 0 6.8M18.8 6a9 9 0 0 1 0 12"/></svg>',
  chk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg>',
  go: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="M5 9l7 7 7-7"/></svg>',
  ice: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M9 4l3 3 3-3M9 20l3-3 3 3"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8v6M9 11.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.500-7-10V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2.200 2.200L15.500 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  tMap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 5v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v2"/><circle cx="6" cy="4.5" r="2.2" fill="currentColor"/><circle cx="18" cy="19.5" r="2.2" fill="currentColor"/></svg>',
  tDrill: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="7" width="13" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 4h11a1.5 1.5 0 0 1 1.5 1.5V16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  tForge: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8" height="7" rx="2" fill="currentColor"/><rect x="13" y="4" width="8" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="18" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  tMe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  auto: '<svg viewBox="0 0 40 34" aria-hidden="true"><path d="M3 19V10.5C3 6 6 3 10.5 3H21c2.3 0 3.9 1 4.9 3l5.6 12h-3.3L23.3 7.6c-.4-.8-1-1.2-1.9-1.2H11.5c-1 0-1.5.5-1.5 1.5V19z" fill="var(--autoink)"/><path d="M22.6 9l4.2 9h-4.2z" fill="var(--card)" opacity=".85"/><path d="M10 11.5h4.5a1.5 1.5 0 0 1 1.5 1.5v5.5h-6z" fill="var(--card)" opacity=".85"/><path d="M3 18h28.2c1.7 0 3.1.9 3.9 2.4l1.2 2.3c.7 1.4-.3 3.3-1.9 3.3H5a2 2 0 0 1-2-2z" fill="var(--turmeric)"/><circle cx="34.2" cy="21.3" r="1.150" fill="var(--card)"/><circle cx="10.5" cy="27" r="4.2" fill="var(--autoink)"/><circle cx="32.5" cy="27.6" r="3.5" fill="var(--autoink)"/><circle cx="10.5" cy="27" r="1.5" fill="var(--card)"/><circle cx="32.5" cy="27.6" r="1.250" fill="var(--card)"/></svg>'
};

/* ----- small renderers ----- */
export const stars = (n, cls) => '<span class="stars ' + (cls || '') + '" role="img" aria-label="' + n + ' of 3 stars">' + [1, 2, 3].map((i) => '<i class="' + (i <= n ? 'on' : '') + '">' + IC.star + '</i>').join('') + '</span>';
export const dots = (b) => '<span class="mdots" role="img" aria-label="Memory strength ' + Math.min(5, b) + ' of 5">' + [1, 2, 3, 4, 5].map((i) => '<i class="' + (i <= b ? 'on' : '') + '"></i>').join('') + '</span>';
/** Kannada the way the player chose to see it. */
export function kn(c) {
  const m = G.S.set.script;
  if (m === 'roman') return '<span class="ro">' + esc(pron(c.k, c.r)) + '</span>';
  if (m === 'script') return '<span class="kn" lang="kn">' + esc(c.k) + '</span>';
  return knFull(c);
}
export const knFull = (c) => '<span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(pron(c.k, c.r)) + '</span>';
export const spk = (txt, cls) => canSpeak(txt) ? '<button class="spk ' + (cls || '') + '" data-a="say" data-t="' + esc(txt) + '" aria-label="' + tx('Hear it') + '">' + IC.spk + '</button>' : '';
export const topbar = (title, act) => '<header class="top"><div class="wrap topin"><button class="icb" data-a="' + (act || 'back') + '" aria-label="' + tx('Back') + '">' + IC.back + '</button><div class="ttl">' + esc(title) + '</div><span class="icb ph"></span></div></header>';
export const FARE = (n) => '₹' + String(n).padStart(3, '0');
export const boxOf = (id) => (G.S.cards[id] ? G.S.cards[id][0] : 0);
export const starsOf = (id) => (G.S.st[id] ? G.S.st[id][0] : 0);
export const seenCount = () => Object.keys(G.S.cards).filter((id) => CARDS[id]).length;

/* ----- persistence and feedback ----- */
export function save() { G.S.t = Date.now(); saveState(G.pid, G.S); pushCloud(() => G.S); }
export function sfx(ok) { if (G.S && G.S.set.fx) playSfx(ok); }
let toastTimer = null;
export function toast(text) {
  let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = text; el.classList.add('on');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('on'), 3200);
}
/** Queue badges and quests for the result screen, or announce them right away. */
export function celebrate(ev, now) {
  if (!ev) return;
  G.UI.fresh.badges.push(...ev.badges); G.UI.fresh.quests.push(...ev.quests);
  if (now) { const q = G.UI.fresh.quests.splice(0); if (q.length) toast(tx('Quest done: {q} (+15 XP each)', { q: q.join(' · ') })); }
}

/* ----- navigation ----- */
export function go(sc) { G.UI.screen = sc; G.UI.scroll = true; G.UI.confirm = ''; render(); }
export function tab(t) { G.UI.tab = t; G.UI.screen = null; G.UI.scroll = true; G.UI.confirm = ''; render(); }
export function back() { G.R = null; G.D = null; G.UI.screen = null; G.UI.scroll = true; render(); }

function header() {
  return '<header class="top"><div class="wrap topin"><div class="brand"><span class="bk" lang="kn">ಕನ್ನಡ ಕಲಿ</span><span class="bl">Kannada Kali</span></div>' +
    '<div class="chips"><span class="chip" title="' + tx('Day streak') + '">' + IC.flame + '<b>' + streakNow() + '</b></span><span class="chip" title="' + tx('Total XP') + '">' + IC.bolt + '<b>' + G.S.xp + '</b></span></div></div></header>';
}
let streakNow = () => 0;
export function setStreakFn(f) { streakNow = f; }
function tabs() {
  const T = [['map', tx('Map'), IC.tMap], ['drill', tx('Drill'), IC.tDrill], ['forge', tx('Forge'), IC.tForge], ['lab', tx('Lab'), '<span class="tk" lang="kn" aria-hidden="true">ಕ</span>'], ['me', tx('You'), IC.tMe]];
  return '<nav class="tabs" aria-label="' + tx('Sections') + '"><div class="wrap tabsin">' + T.map((t) => '<button class="tabb' + (G.UI.tab === t[0] ? ' on' : '') + '" data-a="tab" data-t="' + t[0] + '"' + (G.UI.tab === t[0] ? ' aria-current="page"' : '') + '>' + t[2] + '<span>' + t[1] + '</span></button>').join('') + '</div></nav>';
}
export function render() {
  const app = $('#app'); if (!app) return;
  const typing = $('#typeIn'); if (typing && !typing.disabled) G.UI.typed = typing.value;
  const sc = G.UI.screen; let html;
  try {
    if (!G.S) html = screens.welcome(sc || {});
    else if (!sc || (sc.t === 'ride' && !G.R) || (sc.t === 'dialog' && !G.D)) { G.UI.screen = null; html = header() + '<main class="wrap main">' + views[G.UI.tab]() + '</main>' + tabs(); }
    else html = screens[sc.t](sc);
  } catch (e) {
    html = '<main class="wrap main"><p>' + tx('Something went wrong drawing this screen.') + '</p><button class="btn" data-a="home">' + tx('Back to the map') + '</button></main>';
    if (typeof console !== 'undefined') console.error(e);
  }
  app.innerHTML = html;
  document.body.dataset.screen = G.UI.screen ? G.UI.screen.t : (G.S ? 'tabs' : 'welcome');
  if (G.UI.scroll) { window.scrollTo(0, 0); G.UI.scroll = false; }
  const nb = $('#nextBtn'); if (nb) nb.focus({ preventScroll: true });
  const ti = $('#typeIn'); if (ti && !ti.disabled) { ti.value = G.UI.typed || ''; ti.focus({ preventScroll: true }); }
  if (G.UI.screen && G.UI.screen.t === 'ride' && G.R) {
    const q = current(G.R);
    if (q && !q.done && !q.spoken && QTYPES[q.t] && QTYPES[q.t].ask === 'audio') { q.spoken = 1; speak(prep(q, ctx).card.k); }
  }
}
