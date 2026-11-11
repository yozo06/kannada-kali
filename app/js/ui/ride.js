// The ride screen (questions), boss chats, the result screen and the Lab games.
import { CARDS, STATIONS, DIALOGS, TRAPS, TWINS, STREET, FRAMES, forge } from '../../content/index.js';
import { esc, rnd, shuffle } from '../util.js';
import { translit } from '../engine/translit.js';
import { QTYPES, prep, checkTyped } from '../engine/questions.js';
import * as Ses from '../engine/session.js';
import { BADGES } from '../engine/progress.js';
import { speak } from '../audio.js';
import { G, ctx, STN, screens, A, IC, stars, kn, knFull, spk, FARE, save, sfx, celebrate, go, back, render, $ } from './core.js';

const KINDLABEL = { station: 'Ride', drill: 'Daily drill', boss: 'Majestic', twins: 'Script twins', street: 'Street reader', trap: 'Trap zone', forge: 'Sentence forge', chat: 'Boss chat' };
const cur = () => Ses.current(G.R);
function start(R) { if (!R) return; G.R = R; G.UI.typed = ''; go({ t: 'ride' }); }

/* ----- starting rides ----- */
A.ride = (d) => start(Ses.stationRide(STN[d.id], ctx));
A.drill = () => start(Ses.drillRide(ctx, false));
A.drillany = () => start(Ses.drillRide(ctx, true));
A.weak = () => start(Ses.weakRide(ctx));
A.boss = () => start(Ses.bossRide(ctx));

/* ----- Lab games: free-standing multiple choice, not tied to cards ----- */
const mcx = (label, big, opts, reveal, cls) => ({ t: 'mcx', ready: 1, label, big, bigCls: cls || '', opts, reveal, try: 0 });
A.twins = () => {
  const all = TWINS.flatMap((g) => g.rows.map((r) => ({ g: g.grp, d: r[0], k: r[1], s: r[2] })));
  const R = Ses.newSession('twins');
  R.q = shuffle(all).slice(0, 10).map((p) => {
    const same = all.filter((x) => x.g === p.g && x.k !== p.k), other = all.filter((x) => x.g !== p.g);
    const opts = shuffle([p].concat(shuffle(same).concat(shuffle(other)).slice(0, 3)));
    const reveal = '<div class="rv row"><span class="kn big" lang="kn">' + p.k + '</span> = <span class="dv big">' + p.d + '</span> = <b>' + p.s + '</b></div>';
    return rnd(2)
      ? mcx('Which Kannada letter is this twin?', '<span class="dv">' + p.d + '</span>', opts.map((o) => ({ h: '<span class="kn lg" lang="kn">' + o.k + '</span>', ok: o === p })), reveal, 'letter')
      : mcx('Which Devanagari letter is this twin?', '<span class="kn" lang="kn">' + p.k + '</span>', opts.map((o) => ({ h: '<span class="dv lg">' + o.d + '</span>', ok: o === p })), reveal, 'letter');
  });
  R.total = R.q.length; start(R);
};
A.street = (d) => {
  const cat = d.c;
  const items = cat === 'native' ? STREET.native.map((x) => ({ k: x[0], a: x[2] })) : STREET[cat].map((x) => ({ k: x[0], a: x[1] }));
  const R = Ses.newSession('street', { cat });
  R.q = shuffle(items).slice(0, 10).map((p) => {
    const opts = shuffle([p].concat(shuffle(items.filter((x) => x.a !== p.a)).slice(0, 3)));
    const reveal = '<div class="rv col"><span class="kn big" lang="kn">' + esc(p.k) + '</span><span class="ro">' + esc(translit(p.k)) + '</span><b>' + esc(p.a) + '</b></div>';
    return mcx('Read the board', '<span class="kn" lang="kn">' + esc(p.k) + '</span>', opts.map((o) => ({ h: esc(o.a), ok: o === p })), reveal, 'board');
  });
  R.total = R.q.length; start(R);
};
A.trap = () => {
  const R = Ses.newSession('trap');
  R.q = shuffle(TRAPS).slice(0, 8).map((t) => {
    const others = shuffle(TRAPS.filter((x) => x !== t && x.e !== t.lure)).slice(0, 2).map((x) => ({ h: esc(x.e), ok: false }));
    const opts = shuffle([{ h: esc(t.e), ok: true }, { h: esc(t.lure), ok: false }].concat(others));
    return mcx('Looks like ' + t.lureW + '. What does the Kannada word mean?', knFull(t), opts, '<div class="rv col"><b>' + esc(t.e) + '</b><span>' + esc(t.why) + '</span></div>', 'trapq');
  });
  R.total = R.q.length; start(R);
};
A.forgech = () => {
  const R = Ses.newSession('forge');
  for (let n = 0; n < 6; n++) {
    const f = FRAMES[rnd(FRAMES.length)], nk = f.pool[rnd(f.pool.length)], right = forge(f, nk);
    const opts = [{ c: right, ok: true }];
    const otherF = shuffle(FRAMES.filter((x) => x !== f && x.pool.includes(nk)))[0];
    if (otherF) opts.push({ c: forge(otherF, nk), ok: false });
    for (const x of shuffle(f.pool.filter((p) => p !== nk))) if (opts.length < 4) opts.push({ c: forge(f, x), ok: false });
    const reveal = '<div class="rv col"><span class="kn big" lang="kn">' + esc(right.k) + '</span><span class="ro">' + esc(right.r) + '</span><b>' + esc(right.e) + '</b></div>';
    R.q.push(mcx('Forge it in Kannada', '<span class="en">' + esc(right.e) + '</span>', shuffle(opts).map((o) => ({ h: kn(o.c), ok: o.ok })), reveal, 'forgeq'));
  }
  R.total = R.q.length; start(R);
};

/* ----- answering ----- */
function settle(ok) {
  const ev = { badges: [], quests: [] };
  Ses.answer(G.R, ctx, ok, Date.now(), ev);
  celebrate(ev); sfx(ok); if (!ok) G.R.shake = Date.now();
  save(); render();
}
A.pick = (d) => {
  const q = cur(); if (!q || q.done) return; prep(q, ctx); q.pick = +d.i;
  settle(q.t === 'mcx' ? !!q.opts[q.pick].ok : q.opts[q.pick].id === q.card.id);
};
A.tile = (d) => { const q = cur(); if (!q || q.done) return; const t = q.bank.find((x) => x.i === +d.i); if (t && !q.sel.includes(t)) { q.sel.push(t); render(); } };
A.untile = (d) => { const q = cur(); if (!q || q.done) return; q.sel.splice(+d.j, 1); render(); };
A.check = () => { const q = cur(); if (!q || q.done || !q.sel.length) return; settle(q.sel.map((t) => t.r).join(' ') === q.card.r); };
A.typed = () => {
  const q = cur(); const el = $('#typeIn'); if (!q || q.done || !el || !el.value.trim()) return;
  q.typed = el.value; const res = checkTyped(el.value, q.card); q.close = res.close; G.UI.typed = '';
  settle(res.ok);
};
A.said = () => { const ev = { badges: [], quests: [] }; Ses.markSaid(G.R, ctx, false, Date.now(), ev); celebrate(ev); save(); render(); };
A.skipsay = () => { Ses.markSaid(G.R, ctx, true); render(); };
A.next = () => {
  const q = cur(); if (!q || !q.done) return;
  G.UI.typed = '';
  if (Ses.advance(G.R, ctx)) return render();
  celebrate(Ses.finishRide(G.R, ctx)); save(); go({ t: 'result' });
};
A.quit = () => back();
A.say = (d) => speak(d.t);

/* ----- ride screen ----- */
const big = { kr: (c) => '<div class="pk2">' + knFull(c) + '</div>' + spk(c.k, 'big'),
  e: (c) => '<div class="pe">' + esc(c.e) + '</div>',
  hi: (c) => '<div class="pdv dv">' + esc(c.hi) + '</div><div class="mut">' + (c.t === 'L' ? 'Devanagari' : 'From Hindi or Marathi') + '</div>',
  audio: (c) => '<button class="spk huge" data-a="say" data-t="' + esc(c.k) + '" aria-label="Play again">' + IC.spk + '</button>',
  k: (c) => '<div class="pbig"><span class="kn" lang="kn">' + esc(c.k) + '</span></div>',
  r: (c) => '<div class="psound">' + esc(c.r) + '</div><div class="mut">the sound</div>' };
const small = { e: (c) => esc(c.e), kr: (c) => kn(c), k: (c) => '<span class="kn lg" lang="kn">' + esc(c.k) + '</span>', r: (c) => '<span class="osound">' + esc(c.r) + '</span>' };

function optionList(q, labelOf, isRight, grid) {
  return '<div class="opts' + (grid ? ' grid2' : '') + '">' + q.opts.map((o, i) => {
    let cls = 'opt'; if (q.done) cls += isRight(o) ? ' ok' : (q.pick === i ? ' bad' : ' dim');
    return '<button class="' + cls + '" data-a="pick" data-i="' + i + '"' + (q.done ? ' disabled' : '') + '><span class="num">' + (i + 1) + '</span><span class="ol">' + labelOf(o) + '</span></button>';
  }).join('') + '</div>';
}
function buildArea(q) {
  const ans = q.sel.map((t, j) => '<button class="tile a' + (q.done ? (q.ok ? ' ok' : ' bad') : '') + '" data-a="untile" data-j="' + j + '"' + (q.done ? ' disabled' : '') + '>' + kn(t) + '</button>').join('');
  const bank = q.bank.map((t) => { const used = q.sel.includes(t); return '<button class="tile' + (used ? ' used' : '') + '" data-a="tile" data-i="' + t.i + '"' + (used || q.done ? ' disabled' : '') + '>' + kn(t) + '</button>'; }).join('');
  return '<div class="ans' + (q.sel.length ? '' : ' empty') + '">' + (ans || '<span class="mut">Tap the words in order</span>') + '</div><div class="bank">' + bank + '</div>' +
    (q.done ? '' : '<div class="stack"><button class="btn pri wide" data-a="check"' + (q.sel.length ? '' : ' disabled') + '>Check</button></div>');
}
function sheet(q) {
  const c = q.card, R = G.R, good = q.ok; let inner;
  if (q.t === 'mcx') inner = q.reveal;
  else if (c.t === 'L') inner = '<div class="rv row"><span class="kn big" lang="kn">' + esc(c.k) + '</span>' + (c.hi ? ' = <span class="dv big">' + esc(c.hi) + '</span>' : '') + ' = <b>' + esc(c.r) + '</b></div>' +
    (c.ex ? '<div class="rv col"><span>as in <span class="kn inl" lang="kn">' + esc(c.ex[0]) + '</span> ' + esc(c.ex[1]) + ' (' + esc(c.ex[2]) + ')</span></div>' : '') + (c.n ? '<div class="rv col"><span class="note">' + esc(c.n) + '</span></div>' : '');
  else inner = '<div class="rv col"><span>' + knFull(c) + '</span><b>' + esc(c.e) + '</b>' +
    (q.t === 'type' && q.typed && !good ? '<span class="note">You typed: ' + esc(q.typed) + '</span>' : '') + (q.close ? '<span class="note">Accepted, but check the spelling above.</span>' : '') +
    (c.hi && !c.t ? '<span class="twin"><span class="dv">' + esc(c.hi) + '</span></span>' : '') + (c.n ? '<span class="note">' + esc(c.n) + '</span>' : '') + '</div>';
  const head = q.t === 'say' ? (q.skipped ? 'Skipped' : 'Good. Say it again tomorrow.') : good ? (q.close ? 'Close enough' : q.try ? 'Got it this time' : ['Correct', 'Right', 'Yes', 'Spot on'][R.i % 4]) : 'Not quite. Fare +₹10';
  return '<div class="sheet ' + (good ? 'good' : 'badq') + '" role="status"><div class="wrap shin"><div class="sh-h">' + (good ? IC.chk : IC.x) + '<b>' + head + '</b>' + (c ? spk(c.k) : '') + '</div>' + inner +
    '<button class="btn pri wide" data-a="next" id="nextBtn">' + (R.i >= R.q.length - 1 ? 'Finish' : 'Continue') + '</button></div></div>';
}
screens.ride = () => {
  const R = G.R, q = prep(R.q[R.i], ctx), c = q.card, pct = Math.round(R.done / R.total * 100);
  const line = R.kind === 'station' && STN[R.st] ? STN[R.st].line : 1;
  const top = '<header class="rideTop l' + line + '"><div class="wrap rt"><button class="icb" data-a="quit" aria-label="Leave ride">' + IC.x + '</button>' +
    '<div class="route" role="progressbar" aria-label="Ride progress" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><span class="rail"></span><span class="fill" style="width:' + pct + '%"></span><span class="autoI' + (R.shake && Date.now() - R.shake < 600 ? ' wob' : '') + '" style="left:' + pct + '%">' + IC.auto + '</span></div>' +
    '<div class="meter" title="Each detour adds to the fare"><small>FARE</small><b>' + FARE(R.fare) + '</b></div></div></header>';
  const lab = (t) => '<h1 class="eyebrow">' + esc(t) + '</h1>';
  let body;
  if (QTYPES[q.t]) {
    const T = QTYPES[q.t], letters = c.t === 'L';
    body = lab(T.label) + '<div class="prompt' + (letters || T.ask === 'k' ? ' letter' : '') + (c.t === 'W' ? ' board' : '') + '">' + big[T.ask](c) + '</div>' + optionList(q, small[T.opt], (o) => o.id === c.id, letters);
  } else if (q.t === 'mcx') body = lab(q.label) + '<div class="prompt ' + q.bigCls + '"><div class="pbig">' + q.big + '</div></div>' + optionList(q, (o) => o.h, (o) => o.ok, q.bigCls === 'letter');
  else if (q.t === 'build') body = lab('Build it in Kannada') + '<div class="prompt"><div class="pe">' + esc(c.e) + '</div></div>' + buildArea(q);
  else if (q.t === 'type') body = lab('Type it in Kannada') + '<div class="prompt"><div class="pe">' + esc(c.e) + '</div></div>' +
    '<div class="typebox"><input id="typeIn" type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Roman letters are fine" aria-label="Your answer"' + (q.done ? ' disabled value="' + esc(q.typed || '') + '"' : '') + '>' +
    (q.done ? '' : '<button class="btn pri" data-a="typed">Check</button>') + '</div>' + (q.done ? '' : '<p class="mut center">Capitals and double letters are not checked. Spell it how it sounds.</p>');
  else body = lab('Say it out loud') + '<div class="prompt"><div class="pk2">' + knFull(c) + '</div><div class="pe sm">' + esc(c.e) + '</div>' + spk(c.k, 'big') + '</div>' +
    (q.done ? '' : '<div class="stack"><button class="btn pri wide" data-a="said">I said it out loud · +2 XP</button><button class="btn wide ghost" data-a="skipsay">Skip</button></div>');
  return top + '<main class="wrap main q' + (q.done ? ' padsheet' : '') + '">' + body + '</main>' + (q.done ? sheet(q) : '');
};

/* ----- boss chats ----- */
A.dialog = (d) => { G.D = Ses.newChat(d.id, ctx); go({ t: 'dialog' }); };
A.dpick = (d) => { const ok = Ses.chatPick(G.D, +d.i, ctx); sfx(ok); G.UI.scroll = false; render(); const end = $('#chatEnd'); if (end && end.scrollIntoView) end.scrollIntoView({ block: 'end' }); };
A.dpeek = (d) => { G.D.peek[d.k] = 1; render(); };
A.dend = () => { const { R, ev } = Ses.finishChat(G.D, ctx); G.R = R; G.D = null; celebrate(ev); save(); go({ t: 'result' }); };
screens.dialog = () => {
  const D = G.D, d = DIALOGS[D.id], turn = d.turns[D.t];
  const bubbles = D.log.map((b, i) => b.who === 'npc'
    ? '<div class="bub npc' + (b.sys ? ' sys' : '') + '"><div class="bw" lang="kn">' + esc(d.whoK) + '</div><div class="bk">' + kn(b) + '</div>' + (b.sys ? '' : spk(b.k)) +
      (D.peek['p' + i] ? '<div class="be">' + esc(b.e) + '</div>' : '<button class="peekb" data-a="dpeek" data-k="p' + i + '">Peek at meaning</button>') + '</div>'
    : '<div class="bub me' + (b.bad ? ' bad' : '') + '"><div class="bk">' + kn(b) + '</div><div class="be">' + esc(b.e) + '</div></div>').join('');
  const foot = D.fin
    ? '<div class="stickyAct"><button class="btn pri wide" data-a="dend" id="nextBtn">See your fare' + IC.go + '</button></div>'
    : '<div class="goalbox"><div class="eyebrow">Your move</div><p>' + esc(turn.goal) + '</p></div><div class="opts">' + turn.opts.map((o, i) => { const dead = D.dead[D.t + ':' + i]; return '<button class="opt' + (dead ? ' bad' : '') + '" data-a="dpick" data-i="' + i + '"' + (dead ? ' disabled' : '') + '><span class="num">' + (i + 1) + '</span><span class="ol">' + kn(o) + '</span></button>'; }).join('') + '</div>';
  return '<header class="rideTop l1"><div class="wrap rt"><button class="icb" data-a="quit" aria-label="Leave chat">' + IC.x + '</button><div class="ttl">' + esc(d.who) + '</div><div class="meter"><small>FARE</small><b>' + FARE(D.fare) + '</b></div></div></header>' +
    '<main class="wrap main q chat"><p class="intro">' + esc(d.intro) + '</p>' + bubbles + foot + '<span id="chatEnd"></span></main>';
};

/* ----- result ----- */
screens.result = () => {
  const R = G.R, k = R.kind, st = R.stars;
  const title = k === 'boss' ? (st ? 'Majestic cleared' : 'Missed your connection') : R.mist === 0 ? 'Arrived, fare-free' : 'Arrived';
  const sub = k === 'station' ? STN[R.st].en : k === 'chat' ? DIALOGS[R.chatId].who : R.weak ? 'Trouble words' : KINDLABEL[k];
  const fresh = G.UI.fresh; const nb = fresh.badges.splice(0), nq = fresh.quests.splice(0);
  const order = STATIONS.filter((s) => s.kind !== 'boss');
  const nextSt = k === 'station' ? order[order.indexOf(STN[R.st]) + 1] : null;
  const again = { station: ['ride', 'data-id="' + R.st + '"', 'Ride again'], twins: ['twins', '', 'Another round'], street: ['street', 'data-c="' + R.cat + '"', 'Another round'], trap: ['trap', '', 'Another round'],
    forge: ['forgech', '', 'Another round'], chat: ['dialog', 'data-id="' + R.chatId + '"', 'Chat again'], boss: ['boss', '', 'Ride again'], drill: [R.weak ? 'weak' : 'drillany', '', 'Practise more'] }[k];
  const chatNext = k === 'station' && STN[R.st].dialog ? '<button class="btn wide" data-a="dialog" data-id="' + STN[R.st].dialog + '">Boss chat · ' + esc(DIALOGS[STN[R.st].dialog].who) + '</button>' : '';
  return '<main class="wrap main resultp"><section class="arrive"><div class="eyebrow">' + esc(sub) + '</div><h1 class="h1">' + esc(title) + '</h1>' + stars(st, 'big') +
    '<div class="stats"><div><b>' + FARE(R.fare) + '</b><span>fare</span></div><div><b>' + R.mist + '</b><span>detours</span></div><div><b>+' + R.xp + '</b><span>XP</span></div></div>' +
    (nq.length ? '<div class="newq">' + nq.map((q) => '<div class="qdone">' + IC.chk + '<span>Quest done: ' + esc(q) + ' · +15 XP</span></div>').join('') + '</div>' : '') +
    (nb.length ? '<div class="newb"><div class="eyebrow">New badge</div>' + nb.map((b) => '<div class="bd on"><span>' + IC.star + '</span><b>' + esc(BADGES[b][0]) + '</b><small>' + esc(BADGES[b][1]) + '</small></div>').join('') + '</div>' : '') +
    '<div class="stack">' + (nextSt ? '<button class="btn pri wide" data-a="open" data-id="' + nextSt.id + '" id="nextBtn">Next stop · ' + esc(nextSt.en) + IC.go + '</button>' : '<button class="btn pri wide" data-a="home" id="nextBtn">Back to the map</button>') +
    chatNext + '<button class="btn wide" data-a="' + again[0] + '" ' + again[1] + '>' + again[2] + '</button>' +
    (nextSt ? '<button class="btn wide ghost" data-a="home">Back to the map</button>' : '') + '</div></section></main>';
};
