// Tab views (map, drill, forge, lab, you) and the pages that hang off them.
import { CARDS, STATIONS, DIALOGS, LINES, TWINS, FRAMES, NOUNS, forge, RULES, MISSIONS, RAJYOTSAVA_MISSION } from '../../content/index.js';
import { esc, rnd, today, DAY } from '../util.js';
import { dueIds } from '../engine/srs.js';
import { BADGES, level, curStreak, questStatus, addXp, award, bump, merge } from '../engine/progress.js';
import { weakRide } from '../engine/session.js';
import { audioInfo, downloadAll, speak, canSpeak, voicePacks, setVoicePack } from '../audio.js';
import * as Store from '../store.js';
import { VERSION, REPO_URL, EMBEDDED } from '../config.js';
import { tx, pron, nativePron, lang, setLang, LANGS } from '../i18n.js';
import { toScript } from '../engine/translit.js';
import { G, ctx, STN, views, screens, A, IC, stars, dots, kn, knFull, spk, topbar, boxOf, starsOf, seenCount, save, sfx, celebrate, toast, go, tab, back, render, setStreakFn, twinD, $ } from './core.js';

setStreakFn(() => curStreak(G.S));
const pronName = () => ({ deva: 'हिन्दी अक्षर', odia: 'ଓଡ଼ିଆ ଅକ୍ଷର' }[LANGS.find((l) => l.id === lang()).pron] || 'Roman');
const langButtons = () => LANGS.map((l) => '<button class="seg' + (lang() === l.id ? ' on' : '') + '" data-a="lang" data-v="' + l.id + '" lang="' + l.id + '" aria-pressed="' + (lang() === l.id) + '">' + l.name + '</button>').join('');
const langRow = () => '<div class="setr"><span>' + tx('Language') + '</span><div class="segs">' + langButtons() + '</div></div>';
/** Change the teaching language for this player (or for the welcome screen before one exists). */
A.lang = (d) => {
  const nameBox = $('#pname'); if (nameBox && G.UI.screen) G.UI.screen.name = nameBox.value;
  setLang(d.v); Store.setPref('lang', d.v);
  if (G.S) { G.S.set.lang = d.v; save(); }
  render();
};
const mainStops = STATIONS.filter((s) => s.kind === 'std' || s.kind === 'radar');
const scriptStops = STATIONS.filter((s) => s.kind === 'script');
const nextMain = () => mainStops.find((s) => !starsOf(s.id)) || STN.majestic;
const nextScript = () => scriptStops.find((s) => !starsOf(s.id)) || null;
const phraseTotal = Object.values(CARDS).filter((c) => !c.t).length;
const AVATARS = ['purple', 'green', 'blue', 'pink', 'orange', 'turmeric'];
const avatar = (p, cls) => '<span class="av a-' + AVATARS[(p.av || 0) % AVATARS.length] + ' ' + (cls || '') + '" aria-hidden="true">' + esc((p.name || '?').trim().charAt(0).toUpperCase()) + '</span>';

/* ================= Map ================= */
function daysToRajyotsava() {
  const n = new Date(), t0 = new Date(n.getFullYear(), n.getMonth(), n.getDate()); let t = new Date(n.getFullYear(), 10, 1);
  if (t < t0) t = new Date(n.getFullYear() + 1, 10, 1);
  return Math.round((t - t0) / DAY);
}
function missionOf() {
  const n = new Date(), m = n.getMonth(), dd = n.getDate();
  if ((m === 9 && dd >= 25) || (m === 10 && dd <= 2)) return RAJYOTSAVA_MISSION;
  return MISSIONS[Math.floor(Date.UTC(n.getFullYear(), m, dd) / DAY) % MISSIONS.length];
}
function stationRow(s, nx) {
  const sc = starsOf(s.id), strong = s.cards.filter((id) => boxOf(id) >= 3).length;
  return '<li><button class="stn' + (nx && nx.id === s.id ? ' next' : '') + (sc ? ' done' : '') + '" data-a="open" data-id="' + s.id + '"><span class="dot">' + (sc ? IC.chk : '') + '</span>' +
    '<span class="sk kn" lang="kn">' + esc(s.name) + '</span><span class="sn">' + esc(s.en) + (s.kind === 'radar' ? '<em class="tag">' + tx('free words') + '</em>' : '') + (s.dialog ? '<em class="tag t2">' + tx('boss chat') + '</em>' : '') + '</span>' +
    '<span class="sm">' + esc(s.blurb) + '</span><span class="sf">' + stars(sc) + '<small>' + tx('{a}/{b} strong', { a: strong, b: s.cards.length }) + '</small></span></button></li>';
}
function lineSection(l, nx) {
  const sts = STATIONS.filter((s) => s.line === l.n), done = sts.filter((s) => starsOf(s.id)).length;
  const holdsNext = sts.includes(nx), open = G.UI.open[l.n] != null ? G.UI.open[l.n] : holdsNext;
  return '<section class="line l' + l.n + (open ? ' open' : '') + '"><button class="lh" data-a="line" data-n="' + l.n + '" aria-expanded="' + open + '"><span class="lb">' + l.letter + '</span>' +
    '<span class="lt2"><span class="h2">' + esc(l.name) + '</span><span class="sub">' + esc(l.sub) + '</span></span><span class="lp">' + done + '/' + sts.length + '</span><span class="chev">' + IC.down + '</span></button>' +
    (open ? '<ol class="rail">' + sts.map((s) => stationRow(s, nx)).join('') + '</ol>' : '') + '</section>';
}
views.map = () => {
  const S = G.S, nx = nextMain(), ns = nextScript(), due = dueIds(S.cards, (id) => !!CARDS[id]).length;
  const xt = S.days[today()] || 0, goal = S.set.goal || 50, pct = Math.min(100, Math.round(xt / goal * 100));
  const dl = daysToRajyotsava(), ms = missionOf(), done = !!S.mis[today()], started = seenCount() > 0;
  const dtxt = new Date().toLocaleDateString({ hi: 'hi-IN', or: 'or-IN' }[lang()] || 'en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const stub = dl <= 45
    ? '<b>' + (dl === 0 ? tx('Today is Kannada Rajyotsava') : tx('{n} days to Kannada Rajyotsava', { n: dl })) + '</b><span>' + tx('1 November. Greet someone in Kannada that day.') + '</span>'
    : '<b>' + IC.ice + tx('Streak freezes: {n}', { n: S.streak.fz || 0 }) + '</b><span>' + tx('A freeze covers one missed day. Every 7-day streak earns one.') + '</span>';
  const ticket = '<section class="ticket"><div class="tk-main"><div class="eyebrow">' + tx('Today') + ' · ' + esc(dtxt) + '</div><h1 class="hello"><span class="kn" lang="kn">ನಮಸ್ಕಾರ</span>' + (G.profile && G.profile.name !== 'You' ? '<span class="hn">' + esc(G.profile.name) + '</span>' : '') + '</h1>' +
    '<div class="goal"><div class="bar"><i style="width:' + pct + '%"></i></div><span>' + tx('{a} / {b} XP today', { a: xt, b: goal }) + (pct >= 100 ? ' · ' + tx('goal met') : '') + '</span></div>' +
    '<div class="row"><button class="btn pri" data-a="open" data-id="' + nx.id + '">' + (started ? tx('Next stop') : tx('Start here')) + ' · ' + esc(nx.en) + IC.go + '</button>' +
    (started ? '<button class="btn" data-a="' + (due ? 'drill' : 'tab') + '" data-t="drill">' + tx('Daily drill') + (due ? ' · ' + tx('{n} due', { n: due }) : '') + '</button>' : '') + '</div>' +
    (ns && started ? '<button class="lnk" data-a="open" data-id="' + ns.id + '">' + tx('Reading track') + ': ' + esc(ns.en) + '</button>' : '') + '</div><div class="tk-stub">' + stub + '</div></section>';
  const quests = '<section class="quests"><h2 class="eyebrow">' + tx('Daily quests · +15 XP each') + '</h2><ul>' + questStatus(S).map((q) =>
    '<li class="' + (q.done ? 'done' : '') + '"><span class="qc">' + (q.done ? IC.chk : '') + '</span><span class="ql">' + esc(q.label) + '</span><span class="qp">' + q.prog + '/' + q.goal + '</span></li>').join('') + '</ul></section>';
  const mission = '<section class="mission"><h2 class="eyebrow">' + tx('Field mission · real life') + '</h2><p class="mt">' + esc(ms.t) + '</p><div class="mp"><div class="mpt">' + kn(ms) + '</div>' + spk(ms.k) + '</div>' +
    (done ? '<div class="mdone">' + IC.chk + ' ' + tx('Done today. Nice.') + '</div>' : '<button class="btn" data-a="mission">' + tx('I did it · +15 XP') + '</button>') + '</section>';
  const pocket = seenCount() < 40 ? '<section><h2 class="h2">' + tx('Pocket lifelines') + '</h2><p class="sub">' + tx('Four phrases that rescue any conversation. Say them out loud today.') + '</p><div class="pocket">' +
    ['lf2', 'lf3', 'lf4', 'lf1'].map((id) => CARDS[id]).map((c) => '<button class="pk" data-a="say" data-t="' + esc(c.k) + '">' + knFull(c) + '<span class="en">' + esc(c.e) + '</span></button>').join('') + '</div></section>' : '';
  const mst = starsOf('majestic');
  const inter = '<section class="line l9 open"><div class="lh static"><span class="lb x">M</span><span class="lt2"><span class="h2">' + tx('Interchange') + '</span><span class="sub">' + tx('Every line meets here. One long mixed ride.') + '</span></span></div>' +
    '<button class="stn boss' + (nx.id === 'majestic' ? ' next' : '') + '" data-a="open" data-id="majestic"><span class="sk kn" lang="kn">' + esc(STN.majestic.name) + '</span><span class="sn">' + tx('Majestic') + '</span><span class="sf">' + stars(mst) + '</span></button></section>';
  return ticket + quests + mission + pocket + LINES.map((l) => lineSection(l, l.side ? ns : nx)).join('') + inter;
};
A.line = (d) => { const n = +d.n, sts = STATIONS.filter((s) => s.line === n); const cur = G.UI.open[n] != null ? G.UI.open[n] : sts.includes(nextMain()); G.UI.open[n] = !cur; render(); };
A.mission = () => {
  if (G.S.mis[today()]) return;
  const ev = { badges: [], quests: [] };
  G.S.mis[today()] = 1; addXp(G.S, 15, Date.now(), ev); bump(G.S, 'mission', 1, Date.now(), ev);
  if (Object.keys(G.S.mis).length >= 7) award(G.S, 'field', Date.now(), ev);
  if (ev.badges.length) toast(tx('New badge: {name}', { name: ev.badges.map((b) => BADGES[b][0]).join(', ') }));
  celebrate({ badges: [], quests: ev.quests }, true); sfx(true); save(); render();
};

/* ================= Station and flashcards ================= */
A.open = (d) => go({ t: 'station', id: d.id });
A.board = (d) => go({ t: 'board', id: d.id, i: 0 });
A.bnext = () => { const sc = G.UI.screen; sc.i = Math.min(STN[sc.id].cards.length - 1, sc.i + 1); G.UI.scroll = true; render(); };
A.bprev = () => { const sc = G.UI.screen; sc.i = Math.max(0, sc.i - 1); render(); };
const cardRow = (c) => '<li class="cr"><div class="crt">' + (c.t === 'L' ? '<span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(pron(c.k, c.r)) + (c.hi && !nativePron() ? ' · <span class="dv">' + esc(c.hi) + '</span>' : '') + '</span>' : knFull(c)) + '</div>' +
  '<div class="cre">' + esc(c.t === 'L' && c.ex ? pron(c.ex[0], c.ex[1]) + ' (' + c.ex[2] + ')' : c.t === 'L' ? '' : c.e) + dots(boxOf(c.id)) + '</div>' + spk(c.k) + '</li>';
screens.station = (sc) => {
  const s = STN[sc.id], st = starsOf(s.id);
  if (s.kind === 'boss') return topbar(tx('Majestic')) + '<main class="wrap main"><section class="panel"><div class="eyebrow">' + tx('Interchange') + '</div><h1 class="stBig kn" lang="kn">' + esc(s.name) + '</h1>' +
    '<p>' + tx('Fifteen mixed questions from every stop you have visited. Clear it with three detours or fewer. Cards you have not met yet are fair game, so ride the lines first.') + '</p><div class="row">' + stars(st) + '</div>' +
    '<button class="btn pri wide" data-a="boss">' + tx('Start the ride') + IC.go + '</button></section></main>';
  const line = LINES.find((l) => l.n === s.line), idx = STATIONS.filter((x) => x.line === s.line).indexOf(s) + 1;
  const chat = s.dialog ? '<button class="btn wide" data-a="dialog" data-id="' + s.dialog + '">' + tx('Boss chat') + ' · ' + esc(DIALOGS[s.dialog].who) + stars(starsOf('chat:' + s.dialog)) + '</button>' : '';
  const learn = s.kind === 'radar' ? tx('Run the radar') : s.kind === 'script' ? tx('Learn the letters') : tx('Learn the cards');
  return topbar(s.en) + '<main class="wrap main l' + s.line + '"><section class="panel"><div class="eyebrow">' + esc(line.name.split(' · ')[0]) + ' · ' + tx('stop {n}', { n: idx }) + (s.kind === 'radar' ? ' · ' + tx('words you may already own') : '') + '</div>' +
    '<h1 class="stBig kn" lang="kn">' + esc(s.name) + '</h1><p>' + esc(s.blurb) + '</p><div class="row">' + stars(st) + '<span class="mut">' + tx('{n} cards', { n: s.cards.length }) + '</span></div>' +
    '<div class="stack"><button class="btn pri wide" data-a="board" data-id="' + s.id + '">' + learn + IC.go + '</button><button class="btn wide" data-a="ride" data-id="' + s.id + '">' + tx('Skip to the ride') + '</button>' + chat + '</div></section>' +
    '<h2 class="h2 mt2">' + tx('Cards on this stop') + '</h2><ul class="cl">' + s.cards.map((id) => cardRow(CARDS[id])).join('') + '</ul></main>';
};
screens.board = (sc) => {
  const s = STN[sc.id], ids = s.cards;
  if (s.kind === 'radar') return topbar(s.en) + '<main class="wrap main"><section class="panel"><div class="eyebrow">' + tx('Radar sweep') + '</div><h1 class="h1">' + tx('You already own most of these.') + '</h1>' +
    '<p>' + tx('Each Kannada word below is the same Sanskrit word you use in Hindi or Marathi. Read the pairs once, then ride.') + '</p></section><ul class="rl">' +
    ids.map((id) => CARDS[id]).map((c) => '<li class="rr"><span class="dv">' + esc(c.hi) + '</span><span class="rar">' + IC.go + '</span><span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(pron(c.k, c.r)) + '</span><span class="en">' + esc(c.e) + '</span>' + spk(c.k) + '</li>').join('') +
    '</ul><div class="stickyAct"><button class="btn pri wide" data-a="ride" data-id="' + s.id + '">' + tx('Start the radar ride') + IC.go + '</button></div></main>';
  const i = sc.i, c = CARDS[ids[i]], last = i === ids.length - 1;
  const face = c.t === 'L'
    ? '<div class="fk letterface"><span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(pron(c.k, c.r)) + '</span></div>' + spk(c.k, 'big') +
      (nativePron() ? '' : c.hi ? '<div class="twin"><span class="dv">' + esc(c.hi) + '</span><span>' + tx('Devanagari twin') + '</span></div>' : '<div class="twin"><span>' + tx('No Devanagari twin') + '</span></div>') +
      (c.ex ? '<div class="exw">' + knFull({ k: c.ex[0], r: c.ex[1] }) + '<span class="en">' + esc(c.ex[2]) + '</span></div>' : '')
    : '<div class="fk">' + knFull(c) + '</div><div class="fe">' + esc(c.e) + '</div>' + spk(c.k, 'big') + (c.hi ? '<div class="twin"><span class="dv">' + esc(c.hi) + '</span><span>' + tx('Hindi / Marathi twin') + '</span></div>' : '');
  return topbar(s.en) + '<main class="wrap main"><div class="bprog" aria-hidden="true">' + ids.map((_, k) => '<i class="' + (k <= i ? 'on' : '') + '"></i>').join('') + '</div>' +
    '<section class="flash"><div class="eyebrow">' + tx('Card {a} of {b}', { a: i + 1, b: ids.length }) + '</div>' + face + (c.n ? '<p class="note">' + esc(c.n) + '</p>' : '') + '</section>' +
    '<div class="stickyAct two"><button class="btn" data-a="bprev"' + (i === 0 ? ' disabled' : '') + '>' + tx('Back') + '</button>' +
    (last ? '<button class="btn pri" data-a="ride" data-id="' + s.id + '">' + tx('Start the ride') + IC.go + '</button>' : '<button class="btn pri" data-a="bnext">' + tx('Next') + IC.go + '</button>') + '</div>' +
    (nativePron() ? '' : '<p class="mut keyline">' + tx('Roman key: aa ee oo are long. Capital E and O are long. Capital T D N L curl the tongue back.') + ' <button class="lnk" data-a="sounds">' + tx('Full sound key') + '</button></p>') + '</main>';
};

/* ================= Drill ================= */
views.drill = () => {
  const S = G.S, known = Object.keys(S.cards).filter((id) => CARDS[id]), due = dueIds(S.cards, (id) => !!CARDS[id]).length;
  const counts = [0, 0, 0, 0, 0, 0]; known.forEach((id) => { counts[Math.min(5, boxOf(id))]++; });
  const tot = Math.max(1, known.length), names = [tx('Fresh'), tx('Day 1'), tx('Day 2'), tx('Day 4'), tx('Day 8'), tx('Day 16')];
  let msg;
  if (!known.length) msg = '<p>' + tx('Nothing to review yet. Ride a stop first and its cards land here.') + '</p><button class="btn pri wide" data-a="tab" data-t="map">' + tx('Go to the map') + '</button>';
  else if (due) msg = '<p>' + tx('{n} cards are ready. Ten questions, about three minutes.', { n: due }) + '</p><button class="btn pri wide" data-a="drill">' + tx('Start the drill') + IC.go + '</button>';
  else { const h = Math.max(1, Math.round((Math.min(...known.map((id) => S.cards[id][1])) - Date.now()) / 36e5)); msg = '<p>' + tx('All caught up. The next card is due in about {when}.', { when: h >= 24 ? tx('{n} days', { n: Math.round(h / 24) }) : tx('{n} hours', { n: h }) }) + '</p><button class="btn pri wide" data-a="drillany">' + tx('Practise anyway') + '</button>'; }
  const weak = weakRide(ctx) ? '<section class="panel flat"><h2 class="h2">' + tx('Trouble words') + '</h2><p class="sub">' + tx('A round made of the cards you have missed most.') + '</p><button class="btn" data-a="weak">' + tx('Practise trouble words') + '</button></section>' : '';
  return '<section class="panel"><div class="eyebrow">' + tx('Daily drill') + '</div><h1 class="h1">' + tx('Spaced review') + '</h1>' + msg + '</section>' + weak +
    '<section class="panel flat"><h2 class="h2">' + tx('Your memory ladder') + '</h2><p class="sub">' + tx('A card you get right moves up and comes back later. A miss drops it to the start.') + '</p><div class="bars">' +
    counts.map((n, i) => '<div class="bx"><div class="bt"><i style="height:' + Math.round(n / tot * 100) + '%"></i></div><b>' + n + '</b><span>' + names[i] + '</span></div>').join('') +
    '</div><p class="mut">' + tx('{a} met · {b} strong (day 8 or more)', { a: known.length, b: counts[4] + counts[5] }) + '</p></section>';
};

/* ================= Forge ================= */
views.forge = () => {
  const F = G.UI.forge, f = FRAMES[F.f], nk = f.pool[F.n % f.pool.length], s = forge(f, nk);
  return '<section class="panel"><div class="eyebrow">' + tx('Sentence forge') + '</div><h1 class="h1">' + tx('Learn the frames. Borrow the nouns.') + '</h1><p>' + tx('A Kannada sentence is often a frame plus a noun, and the noun can be plain English. Pick a frame, drop in a noun, say it.') + '</p></section>' +
    '<h2 class="fh">' + tx('1 · Pick a frame') + '</h2><div class="fchips">' + FRAMES.map((fr, i) => '<button class="fchip' + (i === F.f ? ' on' : '') + '" data-a="fframe" data-i="' + i + '" aria-pressed="' + (i === F.f) + '"><span class="kn" lang="kn">… ' + esc(fr.tail[0]) + '</span><span class="ro">… ' + esc(fr.tail[1]) + '</span></button>').join('') + '</div>' +
    '<div class="forged" aria-live="polite"><div class="eyebrow">' + esc(f.hint) + '</div><div class="fk">' + knFull(s) + '</div><div class="fe">' + esc(s.e) + '</div>' + spk(s.k, 'big') + '</div>' +
    '<h2 class="fh">' + tx('2 · Pick a noun') + '</h2><div class="nchips">' + f.pool.map((key, i) => '<button class="nchip' + (i === F.n % f.pool.length ? ' on' : '') + '" data-a="fnoun" data-i="' + i + '" aria-pressed="' + (i === F.n % f.pool.length) + '"><span class="kn" lang="kn">' + esc(NOUNS[key][0]) + '</span><span class="ro">' + esc(NOUNS[key][1]) + '</span></button>').join('') + '</div>' +
    '<div class="row mt2"><button class="btn" data-a="fspin">' + tx('Spin a random one') + '</button><button class="btn pri" data-a="forgech">' + tx('Challenge · 6 rounds') + IC.go + '</button></div>';
};
A.fframe = (d) => { G.UI.forge = { f: +d.i, n: 0 }; render(); };
A.fnoun = (d) => { G.UI.forge.n = +d.i; render(); };
A.fspin = () => { const f = rnd(FRAMES.length); G.UI.forge = { f, n: rnd(FRAMES[f].pool.length) }; render(); };

/* ================= Lab ================= */
const labCard = (glyph, title, text, buttons) => '<div class="labc"><div class="lt"><span class="kn big" lang="kn">' + glyph + '</span></div><h2 class="h2">' + title + '</h2><p>' + text + '</p><div class="row">' + buttons + '</div></div>';
views.lab = () => '<section class="panel"><div class="eyebrow">' + tx('Side missions') + '</div><h1 class="h1">' + tx('The Lab') + '</h1><p>' + tx('Read the city, dodge the traps, and use the alphabet you already know.') + '</p></section><div class="labg">' +
  labCard('ಆ ಏ ಳ', tx('Sound key'), (nativePron() ? tx('How to read the pronunciation written under the Kannada.') : tx('How to read every Roman spelling here: long vowels, capital E and O, the curled-tongue letters.')), '<button class="btn pri" data-a="sounds">' + tx('Read the key') + '</button>') +
  labCard('ಕ = क', tx('Script twins'), tx('Every Kannada letter has a Devanagari twin in the same order. See the chart, then test yourself.'), '<button class="btn" data-a="twinsintro">' + tx('Chart') + '</button><button class="btn pri" data-a="twins">' + tx('Play 10') + '</button>') +
  labCard('ಬಸ್', tx('Street reader'), tx('Half the boards in Bengaluru are English or place names in Kannada letters. Sound them out.'), '<button class="btn" data-a="street" data-c="loan">' + tx('Shop boards') + '</button><button class="btn" data-a="street" data-c="native">' + tx('Signs') + '</button><button class="btn pri" data-a="street" data-c="place">' + tx('Places') + '</button>') +
  labCard('ಕಣ್ಣು', tx('Trap zone'), tx('Kannada words that look like Hindi or Marathi words and mean something else.'), '<button class="btn pri" data-a="trap">' + tx('Dodge the traps') + '</button>') +
  labCard('ಸ', tx('Rules of the road'), tx('{n} grammar facts for people who already speak Hindi or Marathi.', { n: RULES.length }), '<button class="btn" data-a="cheat">' + tx('Read them') + '</button>') +
  labCard('ಪದ', tx('Phrasebook'), tx('Every card, searchable, with notes.'), '<button class="btn" data-a="book">' + tx('Open it') + '</button>') + '</div>';
A.twinsintro = () => go({ t: 'twinsintro' }); A.cheat = () => go({ t: 'cheat' }); A.book = () => go({ t: 'book' }); A.sounds = () => go({ t: 'sounds' });
screens.twinsintro = () => topbar(tx('Script twins')) + '<main class="wrap main"><section class="panel"><h1 class="h1">' + tx('Same order. Same sounds.') + '</h1><p>' + tx('Kannada and Devanagari are cousins. Letters sit in the same rows, and retroflex ಟ ಡ ಣ ಳ are your ट ड ण ळ. To learn the script properly, ride the Orange Line on the map.') + '</p>' +
  '<button class="btn pri wide" data-a="twins">' + tx('Play 10 twins') + IC.go + '</button></section>' +
  TWINS.map((g) => '<section class="tg"><h2 class="eyebrow">' + esc(g.label) + '</h2><div class="tr">' + g.rows.map((r) => '<div class="tc"><span class="dv">' + twinD(r[1], r[0]) + '</span><span class="kn" lang="kn">' + r[1] + '</span><small>' + pron(r[1], r[2]) + '</small></div>').join('') + '</div></section>').join('') + '</main>';
screens.cheat = () => topbar(tx('Rules of the road')) + '<main class="wrap main"><section class="panel"><h1 class="h1">' + tx('Facts that save you months') + '</h1><p>' + tx('You already speak two languages built like Kannada. These are the differences that matter.') + '</p></section><ol class="rules">' +
  RULES.map((r) => '<li><h2 class="h2">' + esc(r.h) + '</h2><div class="rex">' + knFull(r) + '<span class="en">' + esc(r.e) + '</span></div><p>' + esc(r.t) + '</p></li>').join('') + '</ol></main>';
const SOUNDS = () => [
  { h: tx('Long vowels are doubled'), t: tx('Hold them a beat longer. Same as Hindi आ ई ऊ.'), rows: [['ಆ', 'aa', 'आ'], ['ಈ', 'ee', 'ई'], ['ಊ', 'oo', 'ऊ']] },
  { h: tx('Capital E and O are long'), t: tx('Pure, steady vowels like Hindi ए and ओ. Do not glide into "ay" or "ow".'), rows: [['ಏ', 'E', 'ए'], ['ಓ', 'O', 'ओ']] },
  { h: tx('Small e and o are short'), t: tx('Hindi has no match. e is the vowel in "pen". o is the vowel in "pot". Keep them quick.'), rows: [['ಎ', 'e', ''], ['ಒ', 'o', '']] },
  { h: tx('Capital T D N: tongue curled back'), t: tx('The same retroflex sounds as Hindi and Marathi ट ड ण.'), rows: [['ಟ', 'T', 'ट'], ['ಡ', 'D', 'ड'], ['ಣ', 'N', 'ण']] },
  { h: tx('Small t d n: tongue on the teeth'), t: tx('Dental, like Hindi त द न.'), rows: [['ತ', 't', 'त'], ['ದ', 'd', 'द'], ['ನ', 'n', 'न']] },
  { h: tx('Capital L is the Marathi ळ'), t: tx('Curl the tongue back and let it roll off. If you speak Marathi you already own this one.'), rows: [['ಳ', 'L', 'ळ'], ['ಲ', 'l', 'ल']] },
  { h: tx('Say the last vowel'), t: tx('Hindi drops a final a (kamal, ghar). Kannada keeps it: kannaDa, not "kannad". ondu keeps its u.'), rows: [['ಕನ್ನಡ', 'kannaDa', ''], ['ಒಂದು', 'ondu', '']] },
  { h: tx('Doubled letters are held'), t: tx('Squeeze the consonant for a beat, like the tt in "hot tea". Same as Marathi.'), rows: [['ಅಕ್ಕ', 'akka', ''], ['ಅಣ್ಣ', 'aNNa', '']] }
];
const SOUNDS_NATIVE = () => [
  { h: tx('The sound is written in your own letters'), t: tx('Under every Kannada line you see how it sounds, in the script you already read. Say it aloud exactly as it is written.'), rows: ['ನಮಸ್ಕಾರ', 'ಧನ್ಯವಾದಗಳು'] },
  { h: tx('Say the last vowel'), t: tx('Hindi usually drops the last vowel of a word. Kannada says every vowel that is written, so say the ending clearly.'), rows: ['ಕನ್ನಡ', 'ಒಂದು', 'ಮನೆ'] },
  { h: tx('Short and long e, short and long o'), t: tx('Kannada has a quick e and a quick o as well as the long ones. Say the quick ones short and clipped. They may be written with a small mark you have not seen before.'), rows: ['ಎ', 'ಏ', 'ಒ', 'ಓ'] },
  { h: tx('The letter ಳ'), t: tx('Curl the tongue far back and let it flap forward. It is a different sound from ಲ.'), rows: ['ಳ', 'ಲ', 'ನಾಳೆ'] },
  { h: tx('Doubled letters are held'), t: tx('When a letter is doubled, hold it for a beat before letting go.'), rows: ['ಅಕ್ಕ', 'ಅಣ್ಣ', 'ಇಲ್ಲ'] }
];
screens.sounds = () => topbar(tx('Sound key')) + '<main class="wrap main"><section class="panel"><h1 class="h1">' + (nativePron() ? tx('How to read the pronunciation') : tx('How to read the Roman letters')) + '</h1>' + (nativePron() ? '' : '<p>' + tx('Every Roman spelling in this game follows one key, so you can read Kannada before you can read the script. Eight lines, two minutes.') + '</p>') + '</section>' +
  (nativePron() ? SOUNDS_NATIVE().map((g) => ({ h: g.h, t: g.t, rows: g.rows.map((k) => [k, pron(k, ''), '']) })) : SOUNDS()).map((g) => '<section class="tg"><h2 class="h2">' + esc(g.h) + '</h2><div class="tr">' + g.rows.map((r) => '<div class="tc"><span class="kn" lang="kn">' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b>' + (r[2] ? '<small class="dv">' + esc(r[2]) + '</small>' : '') + '</div>').join('') + '</div><p class="sub">' + esc(g.t) + '</p></section>').join('') + '</main>';
export function bookList() {
  const q = G.UI.q.trim().toLowerCase(); let out = ''; const shown = new Set();
  const groups = STATIONS.filter((s) => s.kind !== 'boss').map((s) => [s.en, s.cards]).concat([[tx('Extras'), ['rj1']]]);
  for (const [name, ids] of groups) {
    const rows = ids.filter((id) => !shown.has(id)).map((id) => CARDS[id]).filter((c) => !q || (c.k + ' ' + c.r + ' ' + c.e + ' ' + c.hi).toLowerCase().includes(q));
    if (!rows.length) continue; rows.forEach((c) => shown.add(c.id));
    out += '<h2 class="h2 mt2">' + esc(name) + '</h2><ul class="cl">' + rows.map((c) => '<li class="cr"><div class="crt">' + knFull(c) + '</div><div class="cre">' + esc(c.e) + dots(boxOf(c.id)) + (c.n ? '<small class="note">' + esc(c.n) + '</small>' : '') + '</div>' + spk(c.k) + '</li>').join('') + '</ul>';
  }
  return out || '<p class="mut">' + tx('Nothing matches that.') + '</p>';
}
screens.book = () => topbar(tx('Phrasebook')) + '<main class="wrap main"><div class="search"><label class="vh" for="bq">' + tx('Search the phrasebook') + '</label><input id="bq" type="search" placeholder="' + tx('Search Kannada, Roman or English') + '" value="' + esc(G.UI.q) + '" autocomplete="off"></div><div id="bl">' + bookList() + '</div></main>';

/* ================= You ================= */
const seg = (on, act, attrs, label) => '<button class="seg' + (on ? ' on' : '') + '" data-a="' + act + '" ' + attrs + ' aria-pressed="' + !!on + '">' + label + '</button>';
views.me = () => {
  const S = G.S, l = level(S.xp), pct = l.next ? Math.round((S.xp - l.cur) / (l.next - l.cur) * 100) : 100, set = S.set, au = audioInfo();
  const met = Object.keys(S.cards).filter((id) => CARDS[id] && !CARDS[id].t).length, strong = Object.keys(S.cards).filter((id) => CARDS[id] && boxOf(id) >= 4).length;
  const stops = STATIONS.filter((s) => s.kind !== 'boss'), stDone = stops.filter((s) => starsOf(s.id)).length;
  const letters = Object.keys(S.cards).filter((id) => CARDS[id] && CARDS[id].t === 'L').length, lettersTotal = Object.values(CARDS).filter((c) => c.t === 'L').length;
  const audioLine = au.clips ? tx('Recorded audio for {n} phrases is bundled.', { n: au.clips }) : au.voice ? tx('Audio uses the Kannada voice on this device.') : tx('No Kannada audio on this device yet. Android Chrome usually has a Kannada voice; this app can also bundle recorded clips (see the project README).');
  const sync = Store.cloudStatus() === 'synced' ? tx('Saved on this device and to your Claude account.') : tx('Saved on this device only. Use a save code to back it up or move it.');
  return '<section class="panel"><div class="prow">' + avatar(G.profile, 'lg') + '<div><div class="eyebrow">' + tx('Level') + ' ' + (l.i + 1) + '</div><h1 class="h1">' + esc(G.profile.name === 'You' ? l.name : G.profile.name + ' · ' + l.name) + '</h1></div></div>' +
    '<div class="lbar"><i style="width:' + pct + '%"></i></div><p class="mut">' + (l.next ? tx('{n} XP to {level}', { n: l.next - S.xp, level: l.nextName }) : tx('Top level. Now go and talk to people.')) + '</p>' +
    '<div class="stats"><div><b>' + curStreak(S) + '</b><span>' + tx('day streak') + '</span></div><div><b>' + S.streak.best + '</b><span>' + tx('best') + '</span></div><div><b>' + (S.streak.fz || 0) + '</b><span>' + tx('freezes') + '</span></div></div>' +
    '<div class="stats"><div><b>' + met + '/' + phraseTotal + '</b><span>' + tx('phrases met') + '</span></div><div><b>' + letters + '/' + lettersTotal + '</b><span>' + tx('letters') + '</span></div><div><b>' + stDone + '/' + stops.length + '</b><span>' + tx('stops') + '</span></div></div>' +
    '<p class="mut">' + tx('{a} cards are strong (day 8 or more). {b} XP in total.', { a: strong, b: S.xp }) + '</p>' +
    '<div class="row">' + (EMBEDDED ? '' : '<button class="btn" data-a="profiles">' + tx('Switch player') + '</button>') + '<button class="btn" data-a="backup">' + tx('Save code') + '</button></div>' + '</section>' +
    '<section class="panel flat"><h2 class="h2">' + tx('Badges') + '</h2><div class="badges">' + Object.keys(BADGES).map((id) => '<div class="bd' + (S.badges[id] ? ' on' : '') + '"><span>' + IC.star + '</span><b>' + esc(BADGES[id][0]) + '</b><small>' + esc(BADGES[id][1]) + '</small></div>').join('') + '</div></section>' +
    '<section class="panel flat"><h2 class="h2">' + tx('Settings') + '</h2>' + langRow() +
    '<div class="setr"><span>' + tx('How to show Kannada') + '</span><div class="segs">' + seg(set.script === 'both', 'script', 'data-v="both"', 'ಕನ್ನಡ + ' + pronName()) + seg(set.script === 'roman', 'script', 'data-v="roman"', pronName()) + seg(set.script === 'script', 'script', 'data-v="script"', tx('ಕನ್ನಡ only')) + '</div></div>' +
    '<div class="setr"><span>' + tx('Daily goal') + '</span><div class="segs">' + [[30, tx('Easy 30')], [50, tx('Steady 50')], [100, tx('Serious 100')]].map((g) => seg((set.goal || 50) === g[0], 'goal', 'data-v="' + g[0] + '"', g[1])).join('') + '</div></div>' +
    (nativePron() ? '' : '<div class="setr"><span>' + tx('Typing questions') + '</span>' + seg(set.typing, 'typing', '', set.typing ? tx('On') : tx('Off')) + '</div>') +
    '<div class="setr"><span>' + tx('Sound effects') + '</span>' + seg(set.fx, 'fx', '', set.fx ? tx('On') : tx('Off')) + '</div>' +
    (voicePacks().length > 1 ? '<div class="setr"><span>' + tx('Voice') + '</span><div class="segs">' + voicePacks().map((p) => seg(p.on, 'voice', 'data-v="' + p.id + '"', esc(p.label))).join('') + '</div></div>' : '') +
    '<p class="mut">' + audioLine + '</p>' + (au.clips && !EMBEDDED ? '<button class="btn" data-a="dlaudio">' + (G.UI.msg || tx('Keep all audio for offline use')) + '</button>' : '') +
    '<p class="mut">' + sync + '</p>' +
    (G.install ? '<button class="btn pri" data-a="install">' + tx('Install the app on this device') + '</button>' : '') +
    '<div class="setr"><span>' + tx('Erase this player’s progress') + '</span><button class="seg dang' + (G.UI.confirm === 'reset' ? ' on' : '') + '" data-a="reset">' + (G.UI.confirm === 'reset' ? tx('Tap again to erase') : tx('Erase')) + '</button></div></section>' +
    '<p class="mut center">Kannada Kali ' + VERSION + (EMBEDDED ? '' : ' · ' + tx('works offline once loaded')) + (REPO_URL ? ' · <a href="' + esc(REPO_URL) + '" target="_blank" rel="noopener">' + tx('source and fixes') + '</a>' : '') + '</p>';
};
A.voice = (d) => { G.S.set.voice = d.v; setVoicePack(d.v); G.UI.msg = ''; save(); render(); const c = CARDS.nm1; if (canSpeak(c.k)) speak(c.k); };
A.script = (d) => { G.S.set.script = d.v; save(); render(); };
A.goal = (d) => { G.S.set.goal = +d.v; save(); render(); };
A.typing = () => { G.S.set.typing = G.S.set.typing ? 0 : 1; save(); render(); };
A.fx = () => { G.S.set.fx = G.S.set.fx ? 0 : 1; save(); sfx(true); render(); };
A.reset = () => {
  if (G.UI.confirm !== 'reset') { G.UI.confirm = 'reset'; return render(); }
  const keep = G.S.set; G.S = Store.loadState('none'); G.S.set = keep; G.UI.confirm = ''; save(); render(); toast(tx('Progress erased.'));
};
A.dlaudio = async () => {
  G.UI.msg = tx('Downloading…'); render();
  const r = await downloadAll((d, tot) => { G.UI.msg = tx('Downloading {a}/{b}', { a: d, b: tot }); const b = $('[data-a="dlaudio"]'); if (b) b.textContent = G.UI.msg; });
  G.UI.msg = r.failed ? tx('{a} of {b} clips kept. Try again online.', { a: r.total - r.failed, b: r.total }) : tx('All {n} clips kept for offline use', { n: r.total }); if (!G.UI.screen && G.UI.tab === 'me') render();
};
A.install = async () => { const ev = G.install; if (!ev) return; G.install = null; try { ev.prompt(); await ev.userChoice; } catch (e) { /* dismissed */ } render(); };

/* ================= Players and save codes ================= */
export function enter(id) {
  const ix = Store.profiles(); const p = ix.list.find((x) => x.id === id) || ix.list[0];
  if (!p) { G.S = null; G.pid = null; G.profile = null; return; }
  Store.switchProfile(p.id); G.pid = p.id; G.profile = p; G.S = Store.loadState(p.id); G.R = null; G.D = null;
  setLang(G.S.set.lang || Store.getPref('lang') || 'en');
  setVoicePack(G.S.set.voice || '');
  G.UI.open = {}; G.UI.fresh = { badges: [], quests: [] };
  G.hooks.entered();
}
A.profiles = () => go({ t: 'profiles' });
A.pswitch = (d) => { enter(d.id); tab('map'); toast(tx('Playing as {name}', { name: G.profile.name })); };
A.pnew = () => { G.UI.screen = { t: 'welcome', add: 1 }; G.UI.prev = G.pid; G.S = null; G.UI.scroll = true; render(); };
A.pcancel = () => { enter(G.UI.prev); tab('me'); };
A.pdel = (d) => {
  if (G.UI.confirm !== 'del:' + d.id) { G.UI.confirm = 'del:' + d.id; return render(); }
  Store.removeProfile(d.id); G.UI.confirm = '';
  const ix = Store.profiles(); if (!ix.list.length) { G.S = null; G.pid = null; G.UI.screen = null; return render(); }
  if (G.pid === d.id) enter(ix.cur); render();
};
screens.profiles = () => {
  const ix = Store.profiles();
  return topbar(tx('Players')) + '<main class="wrap main"><section class="panel"><h1 class="h1">' + tx('Who is playing?') + '</h1><p>' + tx('Each player has separate progress, kept on this device. Nothing is sent anywhere.') + '</p></section><ul class="cl">' +
    ix.list.map((p) => { const s = Store.loadState(p.id); return '<li class="cr">' + avatar(p) + '<div class="crt"><b>' + esc(p.name) + '</b><span class="ro">' + level(s.xp).name + ' · ' + s.xp + ' XP' + (p.id === G.pid ? ' · ' + tx('playing now') : '') + '</span></div>' +
      (p.id === G.pid ? '' : '<button class="seg" data-a="pswitch" data-id="' + p.id + '">' + tx('Play') + '</button>') +
      '<button class="seg dang' + (G.UI.confirm === 'del:' + p.id ? ' on' : '') + '" data-a="pdel" data-id="' + p.id + '">' + (G.UI.confirm === 'del:' + p.id ? tx('Tap again') : tx('Remove')) + '</button></li>'; }).join('') +
    '</ul><button class="btn pri wide" data-a="pnew">' + tx('Add a player') + '</button></main>';
};
A.backup = () => go({ t: 'backup' });
A.copycode = async () => {
  const ta = $('#code'); if (!ta) return;
  try { await navigator.clipboard.writeText(ta.value); toast(tx('Save code copied.')); } catch (e) { ta.focus(); ta.select(); toast(tx('Select all and copy the code.')); }
};
A.savefile = () => {
  const blob = new Blob([Store.exportCode(G.S, G.profile.name)], { type: 'text/plain' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'kannada-kali-' + (G.profile.name || 'player').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + today() + '.txt';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
};
A.loadcode = () => {
  const ta = $('#codeIn'), got = ta && Store.importCode(ta.value);
  if (!got) return toast(tx('That does not look like a save code.'));
  if (!G.S) { enter(Store.createProfile(got.name || tx('Player'), 0, got.state)); G.UI.screen = null; tab('map'); return toast(tx('Welcome back, {name}.', { name: G.profile.name })); }
  const changed = merge(G.S, got.state, (id) => !!CARDS[id]); save(); go({ t: 'backup' }); toast(changed ? tx('Save code merged into this player.') : tx('Nothing new in that code.'));
};
screens.backup = () => topbar(tx('Save code')) + '<main class="wrap main"><section class="panel"><h1 class="h1">' + tx('Back up or move your progress') + '</h1>' +
  '<p>' + tx('Your progress lives in this browser. Clearing site data erases it, so keep a save code somewhere safe, and paste it on another device to carry on there.') + '</p>' +
  '<label class="eyebrow" for="code">' + tx('Your save code') + '</label><textarea id="code" class="code" readonly rows="4">' + esc(Store.exportCode(G.S, G.profile.name)) + '</textarea>' +
  '<div class="row"><button class="btn pri" data-a="copycode">' + tx('Copy code') + '</button>' + (EMBEDDED ? '' : '<button class="btn" data-a="savefile">' + tx('Save as a file') + '</button>') + '</div></section>' +
  '<section class="panel flat"><h2 class="h2">' + tx('Load a save code') + '</h2><p class="sub">' + tx('Merges into the current player: the better result for every card and stop is kept.') + '</p>' +
  '<label class="vh" for="codeIn">' + tx('Paste a save code') + '</label><textarea id="codeIn" class="code" rows="4" placeholder="' + tx('Paste a code that starts with KK1.') + '"></textarea><button class="btn" data-a="loadcode">' + tx('Load code') + '</button></section></main>';

/* ================= Welcome ================= */
A.wgoal = (d) => { G.UI.screen.goal = +d.v; keepName(); render(); };
A.wav = (d) => { G.UI.screen.av = +d.v; keepName(); render(); };
A.wimport = () => { G.UI.screen.imp = !G.UI.screen.imp; keepName(); render(); };
function keepName() { const el = $('#pname'); if (el) G.UI.screen.name = el.value; }
A.wstart = () => {
  keepName(); const sc = G.UI.screen, name = (sc.name || '').trim();
  if (!name) { toast(tx('Type a name first.')); const el = $('#pname'); if (el) el.focus(); return; }
  const id = Store.createProfile(name, sc.av || 0); enter(id); G.S.set.goal = sc.goal || 50; G.S.set.lang = lang(); save(); G.UI.screen = null; tab('map');
};
screens.welcome = (sc) => {
  if (!G.UI.screen || G.UI.screen.t !== 'welcome') G.UI.screen = sc = { t: 'welcome', goal: 50, av: 0, name: '' };
  const goal = sc.goal || 50;
  return '<main class="wrap main welcome"><div class="brand big"><span class="bk" lang="kn">ಕನ್ನಡ ಕಲಿ</span><span class="bl">' + tx('Kannada Kali · learn Kannada') + '</span></div>' + '<div class="langpick">' + langButtons() + '</div>' +
    (sc.add ? '' : '<section class="panel"><h1 class="h1">' + tx('Speak Kannada in Bengaluru, a stop at a time.') + '</h1><ul class="pts"><li>' + tx('Built for people who know Hindi or Marathi: hundreds of words are already yours.') + '</li><li>' + tx('Real situations first: autos, darshinis, deliveries, landlords, the doctor.') + '</li><li>' + tx('Five minutes a day. Works offline. No account, nothing leaves this device.') + '</li></ul></section>') +
    '<section class="panel flat"><h2 class="h2">' + (sc.add ? tx('Add a player') : tx('Who is learning?')) + '</h2><label class="eyebrow" for="pname">' + tx('Your name') + '</label><input id="pname" class="tin" type="text" maxlength="24" autocomplete="given-name" value="' + esc(sc.name || '') + '" placeholder="' + tx('First name is enough') + '">' +
    '<div class="setr"><span>' + tx('Colour') + '</span><div class="segs">' + AVATARS.map((a, i) => '<button class="avpick a-' + a + ((sc.av || 0) === i ? ' on' : '') + '" data-a="wav" data-v="' + i + '" aria-label="' + a + '" aria-pressed="' + ((sc.av || 0) === i) + '"></button>').join('') + '</div></div>' +
    '<div class="setr"><span>' + tx('Daily goal') + '</span><div class="segs">' + [[30, tx('Easy · 5 min')], [50, tx('Steady · 10 min')], [100, tx('Serious · 20 min')]].map((g) => seg(goal === g[0], 'wgoal', 'data-v="' + g[0] + '"', g[1])).join('') + '</div></div>' +
    '<button class="btn pri wide" data-a="wstart">' + (sc.add ? tx('Create player') : tx('Start learning')) + IC.go + '</button>' + (sc.add ? '<button class="btn wide ghost" data-a="pcancel">' + tx('Cancel') + '</button>' : '') + '</section>' +
    '<button class="lnk" data-a="wimport">' + tx('I have a save code') + '</button>' +
    (sc.imp ? '<section class="panel flat"><label class="vh" for="codeIn">' + tx('Paste a save code') + '</label><textarea id="codeIn" class="code" rows="4" placeholder="' + tx('Paste a code that starts with KK1.') + '"></textarea><button class="btn" data-a="loadcode">' + tx('Load code') + '</button></section>' : '') + '</main>';
};
