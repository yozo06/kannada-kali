// A "ride" is one run of questions. This module owns the rules: what gets asked,
// what a mistake costs, when a card comes back, and what the player earns.
// ctx = { CARDS, STATIONS, DIALOGS, S, audio(text) }
import { shuffle } from '../util.js';
import { review, dueIds } from './srs.js';
import { addXp, award, bump } from './progress.js';
import { makeQ, prep, pickCards, isSentence } from './questions.js';

export const FARE_PER_MISS = 10;
const LAB_KINDS = ['twins', 'trap', 'street', 'forge'];
const phraseIds = (ctx) => Object.keys(ctx.S.cards).filter((id) => ctx.CARDS[id]);

export function newSession(kind, extra) {
  return Object.assign({ kind, q: [], i: 0, done: 0, total: 0, mist: 0, fare: 0, xp: 0, first: 0 }, extra || {});
}
export function stationRide(st, ctx) {
  const picks = pickCards(st.cards, 12, ctx);
  const R = newSession('station', { st: st.id, scope: st.cards });
  R.q = shuffle(picks).map((c) => makeQ(c, st.cards, ctx, { radar: st.kind === 'radar' }));
  shuffle(picks.filter(isSentence)).slice(0, 2).forEach((c) => R.q.push({ t: 'say', id: c.id, scope: st.cards, try: 0 }));
  R.total = R.q.length; return R;
}
/** Review of due cards. Returns null when the player has met no cards yet. */
export function drillRide(ctx, anyway, now = Date.now()) {
  const known = phraseIds(ctx);
  let ids = dueIds(ctx.S.cards, (id) => !!ctx.CARDS[id], now);
  if (ids.length < 6 || anyway) {
    const rest = known.filter((id) => !ids.includes(id)).sort((a, b) => ctx.S.cards[a][0] - ctx.S.cards[b][0]);
    ids = ids.concat(rest.slice(0, Math.max(0, 8 - ids.length)));
  }
  if (!ids.length) return null;
  const R = newSession('drill', { scope: known });
  R.q = shuffle(ids).slice(0, 10).map((id) => makeQ(ctx.CARDS[id], known.length >= 4 ? known : null, ctx));
  R.total = R.q.length; return R;
}
/** Words the player keeps missing: most lapses first. */
export function weakRide(ctx) {
  const ids = phraseIds(ctx).filter((id) => ctx.S.cards[id][3] > 0).sort((a, b) => ctx.S.cards[b][3] - ctx.S.cards[a][3]).slice(0, 10);
  if (ids.length < 4) return null;
  const R = newSession('drill', { scope: phraseIds(ctx), weak: 1 });
  R.q = shuffle(ids).map((id) => makeQ(ctx.CARDS[id], R.scope, ctx)); R.total = R.q.length; return R;
}
export function bossRide(ctx) {
  const pool = Array.from(new Set(ctx.STATIONS.filter((s) => s.kind === 'std' || s.kind === 'radar').flatMap((s) => s.cards)));
  const seen = pool.filter((id) => ctx.S.cards[id]), unseen = pool.filter((id) => !ctx.S.cards[id]);
  const ids = shuffle(seen).slice(0, 15); if (ids.length < 15) ids.push(...shuffle(unseen).slice(0, 15 - ids.length));
  const R = newSession('boss', { st: 'majestic', scope: pool });
  R.q = ids.map((id) => makeQ(ctx.CARDS[id], pool, ctx)); R.total = R.q.length; return R;
}
export const current = (R) => R && R.q[R.i];

/** Record the answer to the current question. Wrong card answers come back once, in another form. */
export function answer(R, ctx, ok, now = Date.now(), ev) {
  const q = current(R); if (!q || q.done) return q;
  q.done = 1; q.ok = !!ok;
  const isCard = q.t !== 'mcx';
  if (isCard && q.try === 0) {
    if (!ctx.S.cards[q.card.id]) bump(ctx.S, 'newc', 1, now, ev);
    ctx.S.cards[q.card.id] = review(ctx.S.cards[q.card.id], ok, now);
    if (R.kind === 'drill') bump(ctx.S, 'reviews', 1, now, ev);
  }
  if (ok) {
    R.done++; if (q.try === 0) R.first++;
    R.xp += q.try ? 2 : (q.t === 'mcx' ? 4 : q.t === 'type' ? 7 : 5);
    if (q.t === 'type') { ctx.S.cnt.typed = (ctx.S.cnt.typed || 0) + 1; if (ctx.S.cnt.typed >= 25) award(ctx.S, 'typist', now, ev); }
  } else {
    R.mist++; R.fare += FARE_PER_MISS;
    if (isCard && q.try < 1) {
      const alt = q.t === 'e2k' ? 'k2e' : q.card.t === 'L' ? (q.t === 'l2s' ? 's2l' : 'l2s') : q.card.t === 'W' ? 'w2e' : 'e2k';
      // The retry stands in for the missed question, so the total does not grow.
      R.q.splice(Math.min(R.q.length, R.i + 3), 0, { t: alt, id: q.card.id, scope: q.scope, try: q.try + 1 });
    } else R.done++;
  }
  return q;
}
export function markSaid(R, ctx, skipped, now = Date.now(), ev) {
  const q = current(R); if (!q || q.done) return;
  q.done = 1; q.ok = true; q.skipped = skipped ? 1 : 0; R.done++;
  if (!skipped) { R.xp += 2; ctx.S.cnt.said = (ctx.S.cnt.said || 0) + 1; bump(ctx.S, 'said', 1, now, ev); }
}
/** Move on. Returns false when the ride is over. */
export function advance(R, ctx) {
  R.i++; if (R.i >= R.q.length) return false;
  prep(R.q[R.i], ctx); return true;
}
export function starsFor(kind, mist) {
  if (kind === 'boss') return mist <= 1 ? 3 : mist === 2 ? 2 : mist === 3 ? 1 : 0;
  return mist <= 1 ? 3 : mist <= 3 ? 2 : 1;
}
const lineCleared = (ctx, line) => ctx.STATIONS.filter((s) => s.line === line).every((s) => (ctx.S.st[s.id] || [0])[0] > 0);

/** Close a ride: stars, bonus XP, badges, quest counters. Returns the events to celebrate. */
export function finishRide(R, ctx, now = Date.now(), ev = { badges: [], quests: [] }) {
  const S = ctx.S, k = R.kind, st = starsFor(k, R.mist);
  R.stars = st;
  R.bonus = k === 'station' ? 15 + st * 5 : k === 'boss' ? (st ? 20 + st * 10 : 8) : 10 + st * 3;
  R.xp += R.bonus;
  addXp(S, R.xp, now, ev);
  const setStars = (id) => { const p = S.st[id] || [0, 0]; S.st[id] = [Math.max(p[0], st), p[1] + 1]; };
  if (k === 'station' || k === 'boss' || k === 'drill') award(S, 'first', now, ev);
  if ((k === 'station' || k === 'boss') && R.mist === 0) award(S, 'zero', now, ev);
  if (k === 'station') {
    setStars(R.st);
    const stn = ctx.STATIONS.find((s) => s.id === R.st);
    if (stn.kind === 'radar') award(S, 'radar', now, ev);
    if (stn.kind === 'script') bump(S, 'script', 1, now, ev);
    if (lineCleared(ctx, 3)) award(S, 'grammar', now, ev);
    if (lineCleared(ctx, 5)) award(S, 'reader', now, ev);
  } else if (k === 'boss') { setStars('majestic'); if (st >= 1) award(S, 'majestic', now, ev); }
  else if (k === 'twins' && R.mist === 0) award(S, 'twins', now, ev);
  else if (k === 'street' && R.mist <= 1) award(S, 'street', now, ev);
  else if (k === 'trap' && R.mist === 0) award(S, 'trap', now, ev);
  if (k === 'station' || k === 'boss' || k === 'drill') { bump(S, 'rides', 1, now, ev); if (R.mist <= 1) bump(S, 'clean', 1, now, ev); }
  if (LAB_KINDS.includes(k)) bump(S, 'lab', 1, now, ev);
  const met = Object.keys(S.cards).length;
  if (met >= 100) award(S, 'hundred', now, ev);
  if (met >= 300) award(S, 'c300', now, ev);
  return ev;
}

/* ----- Boss chats ----- */
export function newChat(id, ctx) {
  const d = ctx.DIALOGS[id]; const n = d.turns[0].npc;
  return { id, t: 0, mist: 0, fare: 0, fin: false, dead: {}, peek: {}, log: [{ who: 'npc', k: n[0], r: n[1], e: n[2] }] };
}
/** Choose option i in the current turn. Returns true if it was the right move. */
export function chatPick(D, i, ctx) {
  const d = ctx.DIALOGS[D.id], turn = d.turns[D.t], key = D.t + ':' + i;
  if (D.fin || D.dead[key]) return false;
  const o = turn.opts[i];
  if (!o.ok) {
    D.mist++; D.fare += FARE_PER_MISS; D.dead[key] = 1;
    D.log.push({ who: 'me', k: o.k, r: o.r, e: o.e, bad: 1 }, { who: 'npc', k: 'ಏನು?', r: 'Enu?', e: 'What? (that did not fit)', sys: 1 });
    return false;
  }
  D.log.push({ who: 'me', k: o.k, r: o.r, e: o.e });
  D.t++;
  if (D.t >= d.turns.length) D.fin = true;
  else { const n = d.turns[D.t].npc; D.log.push({ who: 'npc', k: n[0], r: n[1], e: n[2] }); }
  return true;
}
export function finishChat(D, ctx, now = Date.now(), ev = { badges: [], quests: [] }) {
  const S = ctx.S, st = D.fare <= 10 ? 3 : D.fare <= 30 ? 2 : 1, xp = 20 + st * 5, key = 'chat:' + D.id;
  addXp(S, xp, now, ev);
  const p = S.st[key] || [0, 0]; S.st[key] = [Math.max(p[0], st), p[1] + 1];
  award(S, 'first', now, ev); if (st === 3) award(S, 'chat', now, ev);
  if (Object.keys(ctx.DIALOGS).every((k) => (S.st['chat:' + k] || [0])[0] >= 1)) award(S, 'chats', now, ev);
  bump(S, 'chats', 1, now, ev);
  const stn = ctx.STATIONS.find((s) => s.dialog === D.id);
  return { R: { kind: 'chat', st: stn ? stn.id : null, chatId: D.id, stars: st, mist: D.mist, fare: D.fare, xp, bonus: xp }, ev };
}
