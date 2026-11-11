// Tab views (map, drill, forge, lab, you) and the pages that hang off them.
import { CARDS, STATIONS, DIALOGS, LINES, TWINS, FRAMES, NOUNS, forge, RULES, MISSIONS, RAJYOTSAVA_MISSION } from '../../content/index.js';
import { esc, rnd, today, DAY } from '../util.js';
import { dueIds } from '../engine/srs.js';
import { BADGES, level, curStreak, questStatus, addXp, award, bump, merge } from '../engine/progress.js';
import { weakRide } from '../engine/session.js';
import { audioInfo, downloadAll, speak, canSpeak } from '../audio.js';
import * as Store from '../store.js';
import { VERSION, REPO_URL, EMBEDDED } from '../config.js';
import { G, ctx, STN, views, screens, A, IC, stars, dots, kn, knFull, spk, topbar, boxOf, starsOf, seenCount, save, sfx, celebrate, toast, go, tab, back, render, setStreakFn, $ } from './core.js';

setStreakFn(() => curStreak(G.S));
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
    '<span class="sk kn" lang="kn">' + esc(s.name) + '</span><span class="sn">' + esc(s.en) + (s.kind === 'radar' ? '<em class="tag">free words</em>' : '') + (s.dialog ? '<em class="tag t2">boss chat</em>' : '') + '</span>' +
    '<span class="sm">' + esc(s.blurb) + '</span><span class="sf">' + stars(sc) + '<small>' + strong + '/' + s.cards.length + ' strong</small></span></button></li>';
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
  const dtxt = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const stub = dl <= 45
    ? '<b>' + (dl === 0 ? 'Today is Kannada Rajyotsava' : dl + (dl === 1 ? ' day' : ' days') + ' to Kannada Rajyotsava') + '</b><span>1 November. Greet someone in Kannada that day.</span>'
    : '<b>' + IC.ice + (S.streak.fz || 0) + ' streak ' + ((S.streak.fz || 0) === 1 ? 'freeze' : 'freezes') + '</b><span>A freeze covers one missed day. Every 7-day streak earns one.</span>';
  const ticket = '<section class="ticket"><div class="tk-main"><div class="eyebrow">Today · ' + esc(dtxt) + '</div><h1 class="hello"><span class="kn" lang="kn">ನಮಸ್ಕಾರ</span>' + (G.profile && G.profile.name !== 'You' ? '<span class="hn">' + esc(G.profile.name) + '</span>' : '') + '</h1>' +
    '<div class="goal"><div class="bar"><i style="width:' + pct + '%"></i></div><span>' + xt + ' / ' + goal + ' XP today' + (pct >= 100 ? ' · goal met' : '') + '</span></div>' +
    '<div class="row"><button class="btn pri" data-a="open" data-id="' + nx.id + '">' + (started ? 'Next stop' : 'Start here') + ' · ' + esc(nx.en) + IC.go + '</button>' +
    (started ? '<button class="btn" data-a="' + (due ? 'drill' : 'tab') + '" data-t="drill">Daily drill' + (due ? ' · ' + due + ' due' : '') + '</button>' : '') + '</div>' +
    (ns && started ? '<button class="lnk" data-a="open" data-id="' + ns.id + '">Reading track: ' + esc(ns.en) + '</button>' : '') + '</div><div class="tk-stub">' + stub + '</div></section>';
  const quests = '<section class="quests"><h2 class="eyebrow">Daily quests · +15 XP each</h2><ul>' + questStatus(S).map((q) =>
    '<li class="' + (q.done ? 'done' : '') + '"><span class="qc">' + (q.done ? IC.chk : '') + '</span><span class="ql">' + esc(q.label) + '</span><span class="qp">' + q.prog + '/' + q.goal + '</span></li>').join('') + '</ul></section>';
  const mission = '<section class="mission"><h2 class="eyebrow">Field mission · real life</h2><p class="mt">' + esc(ms.t) + '</p><div class="mp"><div class="mpt">' + kn(ms) + '</div>' + spk(ms.k) + '</div>' +
    (done ? '<div class="mdone">' + IC.chk + ' Done today. Nice.</div>' : '<button class="btn" data-a="mission">I did it · +15 XP</button>') + '</section>';
  const pocket = seenCount() < 40 ? '<section><h2 class="h2">Pocket lifelines</h2><p class="sub">Four phrases that rescue any conversation. Say them out loud today.</p><div class="pocket">' +
    ['lf2', 'lf3', 'lf4', 'lf1'].map((id) => CARDS[id]).map((c) => '<button class="pk" data-a="say" data-t="' + esc(c.k) + '">' + knFull(c) + '<span class="en">' + esc(c.e) + '</span></button>').join('') + '</div></section>' : '';
  const mst = starsOf('majestic');
  const inter = '<section class="line l9 open"><div class="lh static"><span class="lb x">M</span><span class="lt2"><span class="h2">Interchange</span><span class="sub">Every line meets here. One long mixed ride.</span></span></div>' +
    '<button class="stn boss' + (nx.id === 'majestic' ? ' next' : '') + '" data-a="open" data-id="majestic"><span class="sk kn" lang="kn">' + esc(STN.majestic.name) + '</span><span class="sn">Majestic</span><span class="sf">' + stars(mst) + '</span></button></section>';
  return ticket + quests + mission + pocket + LINES.map((l) => lineSection(l, l.side ? ns : nx)).join('') + inter;
};
A.line = (d) => { const n = +d.n, sts = STATIONS.filter((s) => s.line === n); const cur = G.UI.open[n] != null ? G.UI.open[n] : sts.includes(nextMain()); G.UI.open[n] = !cur; render(); };
A.mission = () => {
  if (G.S.mis[today()]) return;
  const ev = { badges: [], quests: [] };
  G.S.mis[today()] = 1; addXp(G.S, 15, Date.now(), ev); bump(G.S, 'mission', 1, Date.now(), ev);
  if (Object.keys(G.S.mis).length >= 7) award(G.S, 'field', Date.now(), ev);
  if (ev.badges.length) toast('New badge: ' + ev.badges.map((b) => BADGES[b][0]).join(', '));
  celebrate({ badges: [], quests: ev.quests }, true); sfx(true); save(); render();
};

/* ================= Station and flashcards ================= */
A.open = (d) => go({ t: 'station', id: d.id });
A.board = (d) => go({ t: 'board', id: d.id, i: 0 });
A.bnext = () => { const sc = G.UI.screen; sc.i = Math.min(STN[sc.id].cards.length - 1, sc.i + 1); G.UI.scroll = true; render(); };
A.bprev = () => { const sc = G.UI.screen; sc.i = Math.max(0, sc.i - 1); render(); };
const cardRow = (c) => '<li class="cr"><div class="crt">' + (c.t === 'L' ? '<span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(c.r) + (c.hi ? ' · <span class="dv">' + esc(c.hi) + '</span>' : '') + '</span>' : knFull(c)) + '</div>' +
  '<div class="cre">' + esc(c.t === 'L' && c.ex ? c.ex[1] + ' (' + c.ex[2] + ')' : c.t === 'L' ? '' : c.e) + dots(boxOf(c.id)) + '</div>' + spk(c.k) + '</li>';
screens.station = (sc) => {
  const s = STN[sc.id], st = starsOf(s.id);
  if (s.kind === 'boss') return topbar('Majestic') + '<main class="wrap main"><section class="panel"><div class="eyebrow">Interchange</div><h1 class="stBig kn" lang="kn">' + esc(s.name) + '</h1>' +
    '<p>Fifteen mixed questions from every stop you have visited. Clear it with three detours or fewer. Cards you have not met yet are fair game, so ride the lines first.</p><div class="row">' + stars(st) + '</div>' +
    '<button class="btn pri wide" data-a="boss">Start the ride' + IC.go + '</button></section></main>';
  const line = LINES.find((l) => l.n === s.line), idx = STATIONS.filter((x) => x.line === s.line).indexOf(s) + 1;
  const chat = s.dialog ? '<button class="btn wide" data-a="dialog" data-id="' + s.dialog + '">Boss chat · ' + esc(DIALOGS[s.dialog].who) + stars(starsOf('chat:' + s.dialog)) + '</button>' : '';
  const learn = s.kind === 'radar' ? 'Run the radar' : s.kind === 'script' ? 'Learn the letters' : 'Learn the cards';
  return topbar(s.en) + '<main class="wrap main l' + s.line + '"><section class="panel"><div class="eyebrow">' + esc(line.name.split(' · ')[0]) + ' · stop ' + idx + (s.kind === 'radar' ? ' · words you may already own' : '') + '</div>' +
    '<h1 class="stBig kn" lang="kn">' + esc(s.name) + '</h1><p>' + esc(s.blurb) + '.</p><div class="row">' + stars(st) + '<span class="mut">' + s.cards.length + ' cards</span></div>' +
    '<div class="stack"><button class="btn pri wide" data-a="board" data-id="' + s.id + '">' + learn + IC.go + '</button><button class="btn wide" data-a="ride" data-id="' + s.id + '">Skip to the ride</button>' + chat + '</div></section>' +
    '<h2 class="h2 mt2">Cards on this stop</h2><ul class="cl">' + s.cards.map((id) => cardRow(CARDS[id])).join('') + '</ul></main>';
};
screens.board = (sc) => {
  const s = STN[sc.id], ids = s.cards;
  if (s.kind === 'radar') return topbar(s.en) + '<main class="wrap main"><section class="panel"><div class="eyebrow">Radar sweep</div><h1 class="h1">You already own most of these.</h1>' +
    '<p>Each Kannada word below is the same Sanskrit word you use in Hindi or Marathi. Read the pairs once, then ride.</p></section><ul class="rl">' +
    ids.map((id) => CARDS[id]).map((c) => '<li class="rr"><span class="dv">' + esc(c.hi) + '</span><span class="rar">' + IC.go + '</span><span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(c.r) + '</span><span class="en">' + esc(c.e) + '</span>' + spk(c.k) + '</li>').join('') +
    '</ul><div class="stickyAct"><button class="btn pri wide" data-a="ride" data-id="' + s.id + '">Start the radar ride' + IC.go + '</button></div></main>';
  const i = sc.i, c = CARDS[ids[i]], last = i === ids.length - 1;
  const face = c.t === 'L'
    ? '<div class="fk letterface"><span class="kn" lang="kn">' + esc(c.k) + '</span><span class="ro">' + esc(c.r) + '</span></div>' + spk(c.k, 'big') +
      (c.hi ? '<div class="twin"><span class="dv">' + esc(c.hi) + '</span><span>Devanagari twin</span></div>' : '<div class="twin"><span>No Devanagari twin</span></div>') +
      (c.ex ? '<div class="exw">' + knFull({ k: c.ex[0], r: c.ex[1] }) + '<span class="en">' + esc(c.ex[2]) + '</span></div>' : '')
    : '<div class="fk">' + knFull(c) + '</div><div class="fe">' + esc(c.e) + '</div>' + spk(c.k, 'big') + (c.hi ? '<div class="twin"><span class="dv">' + esc(c.hi) + '</span><span>Hindi / Marathi twin</span></div>' : '');
  return topbar(s.en) + '<main class="wrap main"><div class="bprog" aria-hidden="true">' + ids.map((_, k) => '<i class="' + (k <= i ? 'on' : '') + '"></i>').join('') + '</div>' +
    '<section class="flash"><div class="eyebrow">Card ' + (i + 1) + ' of ' + ids.length + '</div>' + face + (c.n ? '<p class="note">' + esc(c.n) + '</p>' : '') + '</section>' +
    '<div class="stickyAct two"><button class="btn" data-a="bprev"' + (i === 0 ? ' disabled' : '') + '>Back</button>' +
    (last ? '<button class="btn pri" data-a="ride" data-id="' + s.id + '">Start the ride' + IC.go + '</button>' : '<button class="btn pri" data-a="bnext">Next' + IC.go + '</button>') + '</div>' +
    '<p class="mut keyline">Roman key: aa ee oo are long. Capital E and O are long. Capital T D N L curl the tongue back. <button class="lnk" data-a="sounds">Full sound key</button></p></main>';
};

/* ================= Drill ================= */
views.drill = () => {
  const S = G.S, known = Object.keys(S.cards).filter((id) => CARDS[id]), due = dueIds(S.cards, (id) => !!CARDS[id]).length;
  const counts = [0, 0, 0, 0, 0, 0]; known.forEach((id) => { counts[Math.min(5, boxOf(id))]++; });
  const tot = Math.max(1, known.length), names = ['Fresh', 'Day 1', 'Day 2', 'Day 4', 'Day 8', 'Day 16'];
  let msg;
  if (!known.length) msg = '<p>Nothing to review yet. Ride a stop first and its cards land here.</p><button class="btn pri wide" data-a="tab" data-t="map">Go to the map</button>';
  else if (due) msg = '<p><b>' + due + '</b> ' + (due === 1 ? 'card is' : 'cards are') + ' ready. Ten questions, about three minutes.</p><button class="btn pri wide" data-a="drill">Start the drill' + IC.go + '</button>';
  else { const h = Math.max(1, Math.round((Math.min(...known.map((id) => S.cards[id][1])) - Date.now()) / 36e5)); msg = '<p>All caught up. The next card is due in about ' + (h >= 24 ? Math.round(h / 24) + (h >= 36 ? ' days' : ' day') : h + (h > 1 ? ' hours' : ' hour')) + '.</p><button class="btn pri wide" data-a="drillany">Practise anyway</button>'; }
  const weak = weakRide(ctx) ? '<section class="panel flat"><h2 class="h2">Trouble words</h2><p class="sub">A round made of the cards you have missed most.</p><button class="btn" data-a="weak">Practise trouble words</button></section>' : '';
  return '<section class="panel"><div class="eyebrow">Daily drill</div><h1 class="h1">Spaced review</h1>' + msg + '</section>' + weak +
    '<section class="panel flat"><h2 class="h2">Your memory ladder</h2><p class="sub">A card you get right moves up and comes back later. A miss drops it to the start.</p><div class="bars">' +
    counts.map((n, i) => '<div class="bx"><div class="bt"><i style="height:' + Math.round(n / tot * 100) + '%"></i></div><b>' + n + '</b><span>' + names[i] + '</span></div>').join('') +
    '</div><p class="mut">' + known.length + ' met · ' + (counts[4] + counts[5]) + ' strong (day 8 or more)</p></section>';
};

/* ================= Forge ================= */
views.forge = () => {
  const F = G.UI.forge, f = FRAMES[F.f], nk = f.pool[F.n % f.pool.length], s = forge(f, nk);
  return '<section class="panel"><div class="eyebrow">Sentence forge</div><h1 class="h1">Learn the frames. Borrow the nouns.</h1><p>A Kannada sentence is often a frame plus a noun, and the noun can be plain English. Pick a frame, drop in a noun, say it.</p></section>' +
    '<h2 class="fh">1 · Pick a frame</h2><div class="fchips">' + FRAMES.map((fr, i) => '<button class="fchip' + (i === F.f ? ' on' : '') + '" data-a="fframe" data-i="' + i + '" aria-pressed="' + (i === F.f) + '"><span class="kn" lang="kn">… ' + esc(fr.tail[0]) + '</span><span class="ro">… ' + esc(fr.tail[1]) + '</span></button>').join('') + '</div>' +
    '<div class="forged" aria-live="polite"><div class="eyebrow">' + esc(f.hint) + '</div><div class="fk">' + knFull(s) + '</div><div class="fe">' + esc(s.e) + '</div>' + spk(s.k, 'big') + '</div>' +
    '<h2 class="fh">2 · Pick a noun</h2><div class="nchips">' + f.pool.map((key, i) => '<button class="nchip' + (i === F.n % f.pool.length ? ' on' : '') + '" data-a="fnoun" data-i="' + i + '" aria-pressed="' + (i === F.n % f.pool.length) + '"><span class="kn" lang="kn">' + esc(NOUNS[key][0]) + '</span><span class="ro">' + esc(NOUNS[key][1]) + '</span></button>').join('') + '</div>' +
    '<div class="row mt2"><button class="btn" data-a="fspin">Spin a random one</button><button class="btn pri" data-a="forgech">Challenge · 6 rounds' + IC.go + '</button></div>';
};
A.fframe = (d) => { G.UI.forge = { f: +d.i, n: 0 }; render(); };
A.fnoun = (d) => { G.UI.forge.n = +d.i; render(); };
A.fspin = () => { const f = rnd(FRAMES.length); G.UI.forge = { f, n: rnd(FRAMES[f].pool.length) }; render(); };

/* ================= Lab ================= */
const labCard = (glyph, title, text, buttons) => '<div class="labc"><div class="lt"><span class="kn big" lang="kn">' + glyph + '</span></div><h2 class="h2">' + title + '</h2><p>' + text + '</p><div class="row">' + buttons + '</div></div>';
views.lab = () => '<section class="panel"><div class="eyebrow">Side missions</div><h1 class="h1">The Lab</h1><p>Read the city, dodge the traps, and use the alphabet you already know.</p></section><div class="labg">' +
  labCard('ಆ ಏ ಳ', 'Sound key', 'How to read every Roman spelling here: long vowels, capital E and O, the curled-tongue letters.', '<button class="btn pri" data-a="sounds">Read the key</button>') +
  labCard('ಕ = क', 'Script twins', 'Every Kannada letter has a Devanagari twin in the same order. See the chart, then test yourself.', '<button class="btn" data-a="twinsintro">Chart</button><button class="btn pri" data-a="twins">Play 10</button>') +
  labCard('ಬಸ್', 'Street reader', 'Half the boards in Bengaluru are English or place names in Kannada letters. Sound them out.', '<button class="btn" data-a="street" data-c="loan">Shop boards</button><button class="btn" data-a="street" data-c="native">Signs</button><button class="btn pri" data-a="street" data-c="place">Places</button>') +
  labCard('ಕಣ್ಣು', 'Trap zone', 'Kannada words that look like Hindi or Marathi words and mean something else.', '<button class="btn pri" data-a="trap">Dodge the traps</button>') +
  labCard('ಸ', 'Rules of the road', RULES.length + ' grammar facts for people who already speak Hindi or Marathi.', '<button class="btn" data-a="cheat">Read them</button>') +
  labCard('ಪದ', 'Phrasebook', 'Every card, searchable, with notes.', '<button class="btn" data-a="book">Open it</button>') + '</div>';
A.twinsintro = () => go({ t: 'twinsintro' }); A.cheat = () => go({ t: 'cheat' }); A.book = () => go({ t: 'book' }); A.sounds = () => go({ t: 'sounds' });
screens.twinsintro = () => topbar('Script twins') + '<main class="wrap main"><section class="panel"><h1 class="h1">Same order. Same sounds.</h1><p>Kannada and Devanagari are cousins. Letters sit in the same rows, and retroflex ಟ ಡ ಣ ಳ are your ट ड ण ळ. To learn the script properly, ride the Orange Line on the map.</p>' +
  '<button class="btn pri wide" data-a="twins">Play 10 twins' + IC.go + '</button></section>' +
  TWINS.map((g) => '<section class="tg"><h2 class="eyebrow">' + esc(g.grp) + '</h2><div class="tr">' + g.rows.map((r) => '<div class="tc"><span class="dv">' + r[0] + '</span><span class="kn" lang="kn">' + r[1] + '</span><small>' + r[2] + '</small></div>').join('') + '</div></section>').join('') + '</main>';
screens.cheat = () => topbar('Rules of the road') + '<main class="wrap main"><section class="panel"><h1 class="h1">Facts that save you months</h1><p>You already speak two languages built like Kannada. These are the differences that matter.</p></section><ol class="rules">' +
  RULES.map((r) => '<li><h2 class="h2">' + esc(r.h) + '</h2><div class="rex">' + knFull(r) + '<span class="en">' + esc(r.e) + '</span></div><p>' + esc(r.t) + '</p></li>').join('') + '</ol></main>';
const SOUNDS = [
  { h: 'Long vowels are doubled', t: 'Hold them a beat longer. Same as Hindi आ ई ऊ.', rows: [['ಆ', 'aa', 'आ'], ['ಈ', 'ee', 'ई'], ['ಊ', 'oo', 'ऊ']] },
  { h: 'Capital E and O are long', t: 'Pure, steady vowels like Hindi ए and ओ. Do not glide into "ay" or "ow".', rows: [['ಏ', 'E', 'ए'], ['ಓ', 'O', 'ओ']] },
  { h: 'Small e and o are short', t: 'Hindi has no match. e is the vowel in "pen". o is the vowel in "pot". Keep them quick.', rows: [['ಎ', 'e', ''], ['ಒ', 'o', '']] },
  { h: 'Capital T D N: tongue curled back', t: 'The same retroflex sounds as Hindi and Marathi ट ड ण.', rows: [['ಟ', 'T', 'ट'], ['ಡ', 'D', 'ड'], ['ಣ', 'N', 'ण']] },
  { h: 'Small t d n: tongue on the teeth', t: 'Dental, like Hindi त द न.', rows: [['ತ', 't', 'त'], ['ದ', 'd', 'द'], ['ನ', 'n', 'न']] },
  { h: 'Capital L is the Marathi ळ', t: 'Curl the tongue back and let it roll off. If you speak Marathi you already own this one.', rows: [['ಳ', 'L', 'ळ'], ['ಲ', 'l', 'ल']] },
  { h: 'Say the last vowel', t: 'Hindi drops a final a (kamal, ghar). Kannada keeps it: kannaDa, not "kannad". ondu keeps its u.', rows: [['ಕನ್ನಡ', 'kannaDa', ''], ['ಒಂದು', 'ondu', '']] },
  { h: 'Doubled letters are held', t: 'Squeeze the consonant for a beat, like the tt in "hot tea". Same as Marathi.', rows: [['ಅಕ್ಕ', 'akka', ''], ['ಅಣ್ಣ', 'aNNa', '']] }
];
screens.sounds = () => topbar('Sound key') + '<main class="wrap main"><section class="panel"><h1 class="h1">How to read the Roman letters</h1><p>Every Roman spelling in this game follows one key, so you can read Kannada before you can read the script. Eight lines, two minutes.</p></section>' +
  SOUNDS.map((g) => '<section class="tg"><h2 class="h2">' + esc(g.h) + '</h2><div class="tr">' + g.rows.map((r) => '<div class="tc"><span class="kn" lang="kn">' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b>' + (r[2] ? '<small class="dv">' + esc(r[2]) + '</small>' : '') + '</div>').join('') + '</div><p class="sub">' + esc(g.t) + '</p></section>').join('') + '</main>';
export function bookList() {
  const q = G.UI.q.trim().toLowerCase(); let out = ''; const shown = new Set();
  const groups = STATIONS.filter((s) => s.kind !== 'boss').map((s) => [s.en, s.cards]).concat([['Extras', ['rj1']]]);
  for (const [name, ids] of groups) {
    const rows = ids.filter((id) => !shown.has(id)).map((id) => CARDS[id]).filter((c) => !q || (c.k + ' ' + c.r + ' ' + c.e + ' ' + c.hi).toLowerCase().includes(q));
    if (!rows.length) continue; rows.forEach((c) => shown.add(c.id));
    out += '<h2 class="h2 mt2">' + esc(name) + '</h2><ul class="cl">' + rows.map((c) => '<li class="cr"><div class="crt">' + knFull(c) + '</div><div class="cre">' + esc(c.e) + dots(boxOf(c.id)) + (c.n ? '<small class="note">' + esc(c.n) + '</small>' : '') + '</div>' + spk(c.k) + '</li>').join('') + '</ul>';
  }
  return out || '<p class="mut">Nothing matches that.</p>';
}
screens.book = () => topbar('Phrasebook') + '<main class="wrap main"><div class="search"><label class="vh" for="bq">Search the phrasebook</label><input id="bq" type="search" placeholder="Search Kannada, Roman or English" value="' + esc(G.UI.q) + '" autocomplete="off"></div><div id="bl">' + bookList() + '</div></main>';

/* ================= You ================= */
const seg = (on, act, attrs, label) => '<button class="seg' + (on ? ' on' : '') + '" data-a="' + act + '" ' + attrs + ' aria-pressed="' + !!on + '">' + label + '</button>';
views.me = () => {
  const S = G.S, l = level(S.xp), pct = l.next ? Math.round((S.xp - l.cur) / (l.next - l.cur) * 100) : 100, set = S.set, au = audioInfo();
  const met = Object.keys(S.cards).filter((id) => CARDS[id] && !CARDS[id].t).length, strong = Object.keys(S.cards).filter((id) => CARDS[id] && boxOf(id) >= 4).length;
  const stops = STATIONS.filter((s) => s.kind !== 'boss'), stDone = stops.filter((s) => starsOf(s.id)).length;
  const letters = Object.keys(S.cards).filter((id) => CARDS[id] && CARDS[id].t === 'L').length, lettersTotal = Object.values(CARDS).filter((c) => c.t === 'L').length;
  const audioLine = au.clips ? 'Recorded audio for ' + au.clips + ' phrases is bundled.' : au.voice ? 'Audio uses the Kannada voice on this device.' : 'No Kannada audio on this device yet. Android Chrome usually has a Kannada voice; this app can also bundle recorded clips (see the project README).';
  const sync = Store.cloudStatus() === 'synced' ? 'Saved on this device and to your Claude account.' : 'Saved on this device only. Use a save code to back it up or move it.';
  return '<section class="panel"><div class="prow">' + avatar(G.profile, 'lg') + '<div><div class="eyebrow">Level ' + (l.i + 1) + '</div><h1 class="h1">' + esc(G.profile.name === 'You' ? l.name : G.profile.name + ' · ' + l.name) + '</h1></div></div>' +
    '<div class="lbar"><i style="width:' + pct + '%"></i></div><p class="mut">' + (l.next ? (l.next - S.xp) + ' XP to ' + l.nextName : 'Top level. Now go and talk to people.') + '</p>' +
    '<div class="stats"><div><b>' + curStreak(S) + '</b><span>day streak</span></div><div><b>' + S.streak.best + '</b><span>best</span></div><div><b>' + (S.streak.fz || 0) + '</b><span>freezes</span></div></div>' +
    '<div class="stats"><div><b>' + met + '/' + phraseTotal + '</b><span>phrases met</span></div><div><b>' + letters + '/' + lettersTotal + '</b><span>letters</span></div><div><b>' + stDone + '/' + stops.length + '</b><span>stops</span></div></div>' +
    '<p class="mut">' + strong + ' cards are strong (day 8 or more). ' + S.xp + ' XP in total.</p>' +
    '<div class="row">' + (EMBEDDED ? '' : '<button class="btn" data-a="profiles">Switch player</button>') + '<button class="btn" data-a="backup">Save code</button></div>' + '</section>' +
    '<section class="panel flat"><h2 class="h2">Badges</h2><div class="badges">' + Object.keys(BADGES).map((id) => '<div class="bd' + (S.badges[id] ? ' on' : '') + '"><span>' + IC.star + '</span><b>' + esc(BADGES[id][0]) + '</b><small>' + esc(BADGES[id][1]) + '</small></div>').join('') + '</div></section>' +
    '<section class="panel flat"><h2 class="h2">Settings</h2>' +
    '<div class="setr"><span>How to show Kannada</span><div class="segs">' + seg(set.script === 'both', 'script', 'data-v="both"', 'ಕನ್ನಡ + Roman') + seg(set.script === 'roman', 'script', 'data-v="roman"', 'Roman') + seg(set.script === 'script', 'script', 'data-v="script"', 'ಕನ್ನಡ only') + '</div></div>' +
    '<div class="setr"><span>Daily goal</span><div class="segs">' + [[30, 'Easy 30'], [50, 'Steady 50'], [100, 'Serious 100']].map((g) => seg((set.goal || 50) === g[0], 'goal', 'data-v="' + g[0] + '"', g[1])).join('') + '</div></div>' +
    '<div class="setr"><span>Typing questions</span>' + seg(set.typing, 'typing', '', set.typing ? 'On' : 'Off') + '</div>' +
    '<div class="setr"><span>Sound effects</span>' + seg(set.fx, 'fx', '', set.fx ? 'On' : 'Off') + '</div>' +
    '<p class="mut">' + audioLine + '</p>' + (au.clips && !EMBEDDED ? '<button class="btn" data-a="dlaudio">' + (G.UI.msg || 'Keep all audio for offline use') + '</button>' : '') +
    '<p class="mut">' + sync + '</p>' +
    (G.install ? '<button class="btn pri" data-a="install">Install the app on this device</button>' : '') +
    '<div class="setr"><span>Erase this player’s progress</span><button class="seg dang' + (G.UI.confirm === 'reset' ? ' on' : '') + '" data-a="reset">' + (G.UI.confirm === 'reset' ? 'Tap again to erase' : 'Erase') + '</button></div></section>' +
    '<p class="mut center">Kannada Kali ' + VERSION + (EMBEDDED ? '' : ' · works offline once loaded') + (REPO_URL ? ' · <a href="' + esc(REPO_URL) + '" target="_blank" rel="noopener">source and fixes</a>' : '') + '</p>';
};
A.script = (d) => { G.S.set.script = d.v; save(); render(); };
A.goal = (d) => { G.S.set.goal = +d.v; save(); render(); };
A.typing = () => { G.S.set.typing = G.S.set.typing ? 0 : 1; save(); render(); };
A.fx = () => { G.S.set.fx = G.S.set.fx ? 0 : 1; save(); sfx(true); render(); };
A.reset = () => {
  if (G.UI.confirm !== 'reset') { G.UI.confirm = 'reset'; return render(); }
  const keep = G.S.set; G.S = Store.loadState('none'); G.S.set = keep; G.UI.confirm = ''; save(); render(); toast('Progress erased.');
};
A.dlaudio = async () => {
  G.UI.msg = 'Downloading…'; render();
  const r = await downloadAll((d, t) => { G.UI.msg = 'Downloading ' + d + '/' + t; const b = $('[data-a="dlaudio"]'); if (b) b.textContent = G.UI.msg; });
  G.UI.msg = r.failed ? (r.total - r.failed) + ' of ' + r.total + ' clips kept. Try again online.' : 'All ' + r.total + ' clips kept for offline use'; if (!G.UI.screen && G.UI.tab === 'me') render();
};
A.install = async () => { const ev = G.install; if (!ev) return; G.install = null; try { ev.prompt(); await ev.userChoice; } catch (e) { /* dismissed */ } render(); };

/* ================= Players and save codes ================= */
export function enter(id) {
  const ix = Store.profiles(); const p = ix.list.find((x) => x.id === id) || ix.list[0];
  if (!p) { G.S = null; G.pid = null; G.profile = null; return; }
  Store.switchProfile(p.id); G.pid = p.id; G.profile = p; G.S = Store.loadState(p.id); G.R = null; G.D = null;
  G.UI.open = {}; G.UI.fresh = { badges: [], quests: [] };
  G.hooks.entered();
}
A.profiles = () => go({ t: 'profiles' });
A.pswitch = (d) => { enter(d.id); tab('map'); toast('Playing as ' + G.profile.name); };
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
  return topbar('Players') + '<main class="wrap main"><section class="panel"><h1 class="h1">Who is playing?</h1><p>Each player has separate progress, kept on this device. Nothing is sent anywhere.</p></section><ul class="cl">' +
    ix.list.map((p) => { const s = Store.loadState(p.id); return '<li class="cr">' + avatar(p) + '<div class="crt"><b>' + esc(p.name) + '</b><span class="ro">' + level(s.xp).name + ' · ' + s.xp + ' XP' + (p.id === G.pid ? ' · playing now' : '') + '</span></div>' +
      (p.id === G.pid ? '' : '<button class="seg" data-a="pswitch" data-id="' + p.id + '">Play</button>') +
      '<button class="seg dang' + (G.UI.confirm === 'del:' + p.id ? ' on' : '') + '" data-a="pdel" data-id="' + p.id + '">' + (G.UI.confirm === 'del:' + p.id ? 'Tap again' : 'Remove') + '</button></li>'; }).join('') +
    '</ul><button class="btn pri wide" data-a="pnew">Add a player</button></main>';
};
A.backup = () => go({ t: 'backup' });
A.copycode = async () => {
  const ta = $('#code'); if (!ta) return;
  try { await navigator.clipboard.writeText(ta.value); toast('Save code copied.'); } catch (e) { ta.focus(); ta.select(); toast('Select all and copy the code.'); }
};
A.savefile = () => {
  const blob = new Blob([Store.exportCode(G.S, G.profile.name)], { type: 'text/plain' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'kannada-kali-' + (G.profile.name || 'player').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + today() + '.txt';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
};
A.loadcode = () => {
  const ta = $('#codeIn'), got = ta && Store.importCode(ta.value);
  if (!got) return toast('That does not look like a save code.');
  if (!G.S) { enter(Store.createProfile(got.name || 'Player', 0, got.state)); G.UI.screen = null; tab('map'); return toast('Welcome back, ' + G.profile.name + '.'); }
  const changed = merge(G.S, got.state, (id) => !!CARDS[id]); save(); go({ t: 'backup' }); toast(changed ? 'Save code merged into this player.' : 'Nothing new in that code.');
};
screens.backup = () => topbar('Save code') + '<main class="wrap main"><section class="panel"><h1 class="h1">Back up or move your progress</h1>' +
  '<p>Your progress lives in this browser. Clearing site data erases it, so keep a save code somewhere safe, and paste it on another device to carry on there.</p>' +
  '<label class="eyebrow" for="code">Your save code</label><textarea id="code" class="code" readonly rows="4">' + esc(Store.exportCode(G.S, G.profile.name)) + '</textarea>' +
  '<div class="row"><button class="btn pri" data-a="copycode">Copy code</button>' + (EMBEDDED ? '' : '<button class="btn" data-a="savefile">Save as a file</button>') + '</div></section>' +
  '<section class="panel flat"><h2 class="h2">Load a save code</h2><p class="sub">Merges into the current player: the better result for every card and stop is kept.</p>' +
  '<label class="vh" for="codeIn">Paste a save code</label><textarea id="codeIn" class="code" rows="4" placeholder="Paste a code that starts with KK1."></textarea><button class="btn" data-a="loadcode">Load code</button></section></main>';

/* ================= Welcome ================= */
A.wgoal = (d) => { G.UI.screen.goal = +d.v; keepName(); render(); };
A.wav = (d) => { G.UI.screen.av = +d.v; keepName(); render(); };
A.wimport = () => { G.UI.screen.imp = !G.UI.screen.imp; keepName(); render(); };
function keepName() { const el = $('#pname'); if (el) G.UI.screen.name = el.value; }
A.wstart = () => {
  keepName(); const sc = G.UI.screen, name = (sc.name || '').trim();
  if (!name) { toast('Type a name first.'); const el = $('#pname'); if (el) el.focus(); return; }
  const id = Store.createProfile(name, sc.av || 0); enter(id); G.S.set.goal = sc.goal || 50; save(); G.UI.screen = null; tab('map');
};
screens.welcome = (sc) => {
  if (!G.UI.screen || G.UI.screen.t !== 'welcome') G.UI.screen = sc = { t: 'welcome', goal: 50, av: 0, name: '' };
  const goal = sc.goal || 50;
  return '<main class="wrap main welcome"><div class="brand big"><span class="bk" lang="kn">ಕನ್ನಡ ಕಲಿ</span><span class="bl">Kannada Kali · learn Kannada</span></div>' +
    (sc.add ? '' : '<section class="panel"><h1 class="h1">Speak Kannada in Bengaluru, a stop at a time.</h1><ul class="pts"><li>Built for people who know Hindi or Marathi: hundreds of words are already yours.</li><li>Real situations first: autos, darshinis, deliveries, landlords, the doctor.</li><li>Five minutes a day. Works offline. No account, nothing leaves this device.</li></ul></section>') +
    '<section class="panel flat"><h2 class="h2">' + (sc.add ? 'Add a player' : 'Who is learning?') + '</h2><label class="eyebrow" for="pname">Your name</label><input id="pname" class="tin" type="text" maxlength="24" autocomplete="given-name" value="' + esc(sc.name || '') + '" placeholder="First name is enough">' +
    '<div class="setr"><span>Colour</span><div class="segs">' + AVATARS.map((a, i) => '<button class="avpick a-' + a + ((sc.av || 0) === i ? ' on' : '') + '" data-a="wav" data-v="' + i + '" aria-label="' + a + '" aria-pressed="' + ((sc.av || 0) === i) + '"></button>').join('') + '</div></div>' +
    '<div class="setr"><span>Daily goal</span><div class="segs">' + [[30, 'Easy · 5 min'], [50, 'Steady · 10 min'], [100, 'Serious · 20 min']].map((g) => seg(goal === g[0], 'wgoal', 'data-v="' + g[0] + '"', g[1])).join('') + '</div></div>' +
    '<button class="btn pri wide" data-a="wstart">' + (sc.add ? 'Create player' : 'Start learning') + IC.go + '</button>' + (sc.add ? '<button class="btn wide ghost" data-a="pcancel">Cancel</button>' : '') + '</section>' +
    '<button class="lnk" data-a="wimport">I have a save code</button>' +
    (sc.imp ? '<section class="panel flat"><label class="vh" for="codeIn">Paste a save code</label><textarea id="codeIn" class="code" rows="4" placeholder="Paste a code that starts with KK1."></textarea><button class="btn" data-a="loadcode">Load code</button></section>' : '') + '</main>';
};
