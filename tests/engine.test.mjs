import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DAY, hash, editDistance, today } from '../app/js/util.js';
import { review, isDue, dueIds, INTERVALS } from '../app/js/engine/srs.js';
import { newState, normalize, level, addXp, curStreak, bump, questsFor, questStatus, merge, QUEST_REWARD } from '../app/js/engine/progress.js';
import { mcOptions, makeQ, prep, checkTyped, normRoman, QTYPES } from '../app/js/engine/questions.js';
import { stationRide, drillRide, bossRide, answer, advance, finishRide, current, markSaid, newChat, chatPick, finishChat, starsFor } from '../app/js/engine/session.js';
import { translit } from '../app/js/engine/translit.js';
import * as C from '../app/content/index.js';

const NOW = new Date(2026, 10, 11, 12).getTime();
const mkCtx = (S = newState()) => ({ CARDS: C.CARDS, STATIONS: C.STATIONS, DIALOGS: C.DIALOGS, S, audio: () => false });

test('translit follows the roman scheme', () => {
  assert.equal(translit('ಕನ್ನಡ'), 'kannaDa');
  assert.equal(translit('ಹೇಳಿ'), 'hELi');
  assert.equal(translit('ಗಂಟೆ'), 'gaNTe');
  assert.equal(translit('ಒಂಬತ್ತು'), 'ombattu');
  assert.equal(translit('ಬೆಂಗಳೂರು'), 'bengaLooru');
});

test('srs: right answers climb the ladder, a miss resets', () => {
  let r = review(null, true, NOW);
  assert.deepEqual(r, [1, NOW + INTERVALS[1] * DAY, 1, 0]);
  r = review(r, true, NOW); r = review(r, true, NOW);
  assert.equal(r[0], 3); assert.equal(r[1], NOW + 4 * DAY);
  const miss = review(r, false, NOW);
  assert.deepEqual(miss, [0, NOW, 4, 1]);
  assert.equal(r[0], 3, 'input not mutated');
  for (let i = 0; i < 10; i++) r = review(r, true, NOW);
  assert.equal(r[0], INTERVALS.length - 1);
  assert.ok(isDue(miss, NOW)); assert.ok(!isDue(r, NOW));
  assert.deepEqual(dueIds({ a: miss, b: r, gone: miss }, (id) => id !== 'gone', NOW), ['a']);
});

test('levels and xp', () => {
  assert.equal(level(0).name, 'Visitor');
  assert.equal(level(150).name, 'Passenger');
  assert.equal(level(99999).next, null);
  const S = newState(); addXp(S, 40, NOW);
  assert.equal(S.xp, 40); assert.equal(S.days[today(NOW)], 40); assert.equal(S.streak.n, 1);
});

test('streak: consecutive days, a gap, and a freeze', () => {
  const S = newState();
  for (let d = 0; d < 7; d++) addXp(S, 5, NOW + d * DAY);
  assert.equal(S.streak.n, 7); assert.equal(S.streak.fz, 1, 'a week earns a freeze');
  assert.ok(S.badges.streak3 && S.badges.streak7);
  assert.equal(curStreak(S, NOW + 8 * DAY), 7, 'freeze keeps a one-day gap alive');
  addXp(S, 5, NOW + 8 * DAY);
  assert.equal(S.streak.n, 8); assert.equal(S.streak.fz, 0);
  assert.equal(curStreak(S, NOW + 10 * DAY), 0, 'no freeze left');
  addXp(S, 5, NOW + 11 * DAY);
  assert.equal(S.streak.n, 1); assert.equal(S.streak.best, 8);
});

test('quests: three a day, deterministic, pay once', () => {
  const q = questsFor('2026-11-11');
  assert.equal(q.length, 3); assert.equal(q[0].id, 'xp');
  assert.equal(new Set(q.map((x) => x.id)).size, 3);
  assert.deepEqual(questsFor('2026-11-11'), q);
  const S = newState(); const ev = { badges: [], quests: [] };
  addXp(S, 60, NOW, ev);
  assert.equal(ev.quests.length, 1); assert.equal(S.xp, 60 + QUEST_REWARD);
  addXp(S, 60, NOW, ev); assert.equal(ev.quests.length, 1, 'not paid twice');
  assert.ok(questStatus(S, NOW)[0].done);
  assert.ok(!questStatus(S, NOW + DAY)[0].done, 'new day, new quests');
  for (const x of q.slice(1)) bump(S, x.key, x.goal, NOW, ev);
  assert.equal(ev.quests.length, 3);
});

test('merge keeps the better of two saves', () => {
  const a = newState(), b = newState();
  a.xp = 100; a.cards.nm1 = [2, 5, 3, 0]; a.st.hello = [1, 1]; a.streak = { n: 2, best: 2, last: '2026-11-10', fz: 0 };
  b.xp = 300; b.cards.nm1 = [1, 9, 2, 1]; b.cards.nm2 = [1, 9, 1, 0]; b.cards.zzz = [1, 1, 1, 0]; b.st.hello = [3, 1]; b.badges.first = 'x';
  b.streak = { n: 5, best: 9, last: '2026-11-11', fz: 1 };
  assert.ok(merge(a, b, (id) => !!C.CARDS[id]));
  assert.equal(a.xp, 300); assert.deepEqual(a.cards.nm1, [2, 5, 3, 0]); assert.ok(a.cards.nm2); assert.ok(!a.cards.zzz);
  assert.deepEqual(a.st.hello, [3, 1]); assert.equal(a.streak.n, 5); assert.equal(a.streak.best, 9); assert.ok(a.badges.first);
  assert.equal(merge(a, b), true); // zzz now passes the default predicate
  assert.equal(merge(a, JSON.parse(JSON.stringify(a))), false);
  assert.equal(merge(a, { v: 99 }), false);
});

test('normalize repairs old or broken saves', () => {
  assert.equal(normalize(null).xp, 0);
  const s = normalize({ v: 1, xp: 7, set: { script: 'roman' }, streak: { n: 1, best: 1, last: 'x' } });
  assert.equal(s.xp, 7); assert.equal(s.set.script, 'roman'); assert.equal(s.set.goal, 50); assert.equal(s.streak.fz, 0); assert.equal(s.cnt.typed, 0);
});

test('multiple choice: four distinct options, exactly one right, for every card and type', () => {
  const ctx = mkCtx();
  for (const st of C.STATIONS) for (const id of st.cards) {
    const card = C.CARDS[id];
    const types = card.t === 'L' ? ['l2s', 's2l'].concat(card.hi ? ['dv2l'] : []) : card.t === 'W' ? ['w2e'] : ['k2e', 'e2k'].concat(card.hi ? ['hi2k'] : []);
    for (const t of types) {
      const opts = mcOptions(card, t, st.cards, ctx); const f = QTYPES[t].opt === 'e' ? 'e' : QTYPES[t].opt === 'r' ? 'r' : 'k';
      assert.equal(opts.length, 4, `${id} ${t}`);
      assert.equal(opts.filter((o) => o.id === id).length, 1);
      assert.equal(new Set(opts.map((o) => o[f])).size, 4, `${id} ${t} has duplicate option text`);
    }
  }
});

test('build questions carry the exact tiles of the answer', () => {
  const ctx = mkCtx(); const card = C.CARDS.dr7;
  const q = prep({ t: 'build', id: 'dr7', scope: C.STATIONS.find((s) => s.id === 'darshini').cards, try: 0 }, ctx);
  assert.equal(q.tiles.map((t) => t.r).join(' '), card.r);
  assert.ok(q.bank.length >= q.tiles.length);
});

test('typed answers are marked leniently but not sloppily', () => {
  const c = C.CARDS.lf3; // matte hELi
  assert.equal(normRoman('Matte  hELi!'), 'mateheli');
  assert.ok(checkTyped('matte heli', c).ok);
  assert.ok(checkTyped('MATE HELI', c).ok);
  assert.ok(checkTyped('ಮತ್ತೆ ಹೇಳಿ', c).ok);
  assert.ok(checkTyped('matte helu', c).close);
  assert.ok(!checkTyped('beda', c).ok); assert.ok(!checkTyped('', c).ok);
  assert.ok(!checkTyped('illi', C.CARDS.di5).ok, 'short words get no slack');
  assert.equal(editDistance('kitten', 'sitting'), 3);
});

function playRide(R, ctx, wrongEvery = 0) {
  prep(current(R), ctx); let n = 0, guard = 0;
  do {
    const q = current(R); guard++;
    if (q.t === 'say') markSaid(R, ctx, false, NOW);
    else answer(R, ctx, !(wrongEvery && ++n % wrongEvery === 0), NOW);
  } while (advance(R, ctx) && guard < 200);
  return finishRide(R, ctx, NOW);
}

test('a perfect station ride: three stars, cards learned, badge', () => {
  const ctx = mkCtx(); const st = C.STATIONS[0];
  const R = stationRide(st, ctx); const total = R.total;
  const ev = playRide(R, ctx);
  assert.equal(R.stars, 3); assert.equal(R.mist, 0); assert.equal(R.done, total);
  assert.deepEqual(ctx.S.st[st.id], [3, 1]);
  assert.equal(Object.keys(ctx.S.cards).length, Math.min(12, st.cards.length));
  assert.ok(ev.badges.includes('first') && ev.badges.includes('zero'));
  assert.ok(ctx.S.xp >= R.xp);
});

test('misses cost fare and bring the card back once', () => {
  const ctx = mkCtx(); const R = stationRide(C.STATIONS[3], ctx); const before = R.q.length;
  playRide(R, ctx, 3);
  assert.ok(R.mist > 0); assert.equal(R.fare, R.mist * 10);
  assert.ok(R.q.length > before, 'missed cards were queued again');
  assert.equal(R.done, R.total, 'every question was resolved');
  assert.ok(R.stars < 3);
});

test('every station can be ridden, drill and boss work afterwards', () => {
  const ctx = mkCtx();
  for (const st of C.STATIONS.filter((s) => s.kind !== 'boss')) { playRide(stationRide(st, ctx), ctx); assert.ok(ctx.S.st[st.id][0] === 3, st.id); }
  assert.ok(ctx.S.badges.grammar && ctx.S.badges.reader && ctx.S.badges.radar && ctx.S.badges.hundred && ctx.S.badges.c300);
  assert.equal(drillRide(mkCtx(), false, NOW), null, 'nothing to drill for a new player');
  const d = drillRide(ctx, true, NOW + 40 * DAY); assert.ok(d && d.q.length === 10); playRide(d, ctx);
  const b = bossRide(ctx); assert.equal(b.q.length, 15); assert.ok(b.q.every((q) => !C.CARDS[q.id].t)); playRide(b, ctx);
  assert.ok(ctx.S.badges.majestic);
  assert.equal(starsFor('boss', 4), 0); assert.equal(starsFor('station', 4), 1);
});

test('boss chats: wrong moves cost fare, every chat can be finished', () => {
  const ctx = mkCtx();
  for (const id of Object.keys(C.DIALOGS)) {
    const D = newChat(id, ctx); const turns = C.DIALOGS[id].turns;
    if (id === 'auto') { const bad = turns[0].opts.findIndex((o) => !o.ok); assert.equal(chatPick(D, bad, ctx), false); assert.equal(D.fare, 10); assert.equal(chatPick(D, bad, ctx), false); assert.equal(D.fare, 10); }
    turns.forEach((t) => assert.ok(chatPick(D, t.opts.findIndex((o) => o.ok), ctx)));
    assert.ok(D.fin);
    const { R } = finishChat(D, ctx, NOW); assert.equal(R.stars, 3);
  }
  assert.ok(ctx.S.badges.chats && ctx.S.badges.chat);
});

test('clip names are stable', () => {
  assert.equal(hash('ನಮಸ್ಕಾರ'), hash(' ನಮಸ್ಕಾರ '));
  assert.match(hash('ಇಲ್ಲ'), /^[0-9a-f]{8}$/);
  assert.notEqual(hash('ಇಲ್ಲ'), hash('ಇಲ್ಲಿ'));
});
