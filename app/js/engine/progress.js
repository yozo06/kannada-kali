// Player progress: XP, levels, streaks, badges, daily quests, and merging two saves.
// Everything here is plain data in, plain data out.
import { today, dayOff, hash } from '../util.js';

export const LEVELS = [[0, 'Visitor'], [150, 'Passenger'], [400, 'Commuter'], [900, 'Regular'], [1700, 'Local'], [2800, 'Bengalurian'], [6000, 'Kannadiga']];
export const BADGES = {
  first: ['First ride', 'Finish any ride'], zero: ['Zero fare', 'Finish a ride with no detours'],
  streak3: ['Three on the line', 'A 3-day streak'], streak7: ['Week on the line', 'A 7-day streak'], streak30: ['Monthly pass', 'A 30-day streak'],
  radar: ['Radar ping', 'Clear a Free Words stop'], street: ['Street reader', 'Read 10 boards with one slip at most'],
  trap: ['Trap dodger', 'Dodge every look-alike in one go'], twins: ['Script twins', '10 letter twins, no slips'],
  chat: ['Smooth talker', 'Three stars in a boss chat'], chats: ['Chatterbox', 'Finish every boss chat'],
  grammar: ['Sentence builder', 'Clear every Blue Line stop'], reader: ['Reader', 'Clear every Orange Line stop'],
  majestic: ['Majestic cleared', 'Clear the interchange'], field: ['Field agent', 'Complete 7 field missions'],
  typist: ['Typist', 'Type 25 answers correctly'], quests: ['Regular commuter', 'Complete 15 daily quests'],
  hundred: ['Hundred cards', 'Meet 100 cards'], c300: ['Three hundred', 'Meet 300 cards']
};
export const QUEST_REWARD = 15;
const QUESTS = [
  { id: 'xp', key: 'xp', goal: 60, label: 'Earn 60 XP' },
  { id: 'rides', key: 'rides', goal: 2, label: 'Finish 2 rides' },
  { id: 'clean', key: 'clean', goal: 1, label: 'Finish a ride with one detour at most' },
  { id: 'review', key: 'reviews', goal: 10, label: 'Review 10 cards in the drill' },
  { id: 'say', key: 'said', goal: 3, label: 'Say 3 phrases out loud' },
  { id: 'chat', key: 'chats', goal: 1, label: 'Finish a boss chat' },
  { id: 'lab', key: 'lab', goal: 1, label: 'Play one Lab game' },
  { id: 'new', key: 'newc', goal: 8, label: 'Meet 8 new cards' },
  { id: 'mission', key: 'mission', goal: 1, label: "Do today's field mission" },
  { id: 'read', key: 'script', goal: 1, label: 'Ride one Orange Line stop' }
];

export function newState() {
  return { v: 1, xp: 0, days: {}, streak: { n: 0, best: 0, last: '', fz: 0 }, cards: {}, st: {}, badges: {}, mis: {},
    day: { d: '', c: {}, r: {} }, cnt: { typed: 0, said: 0, quests: 0 }, set: { script: 'both', fx: 0, goal: 50, typing: 1 }, t: 0 };
}
/** Fill in anything a save from an older version lacks. */
export function normalize(j) {
  const d = newState();
  if (!j || j.v !== 1) return d;
  const s = Object.assign(d, j);
  s.set = Object.assign(newState().set, j.set || {});
  s.streak = Object.assign(newState().streak, j.streak || {});
  s.cnt = Object.assign(newState().cnt, j.cnt || {});
  s.day = Object.assign(newState().day, j.day || {});
  for (const k of ['cards', 'st', 'badges', 'mis', 'days']) if (!s[k] || typeof s[k] !== 'object') s[k] = {};
  return s;
}
export function level(xp) {
  let i = 0;
  for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k][0]) i = k;
  const nx = LEVELS[i + 1];
  return { i, name: LEVELS[i][1], cur: LEVELS[i][0], next: nx ? nx[0] : null, nextName: nx ? nx[1] : null };
}
const mkEv = (ev) => ev || { badges: [], quests: [] };

export function award(S, id, now, ev) {
  if (S.badges[id] || !BADGES[id]) return;
  S.badges[id] = today(now);
  mkEv(ev).badges.push(id);
}
/** Current streak, or 0 if it has lapsed. A stored freeze keeps a one-day gap alive. */
export function curStreak(S, now = Date.now()) {
  const s = S.streak;
  if (s.last === today(now) || s.last === dayOff(-1, now)) return s.n;
  if (s.last === dayOff(-2, now) && s.fz > 0) return s.n;
  return 0;
}
function touchStreak(S, now, ev) {
  const s = S.streak, d = today(now);
  if (s.last === d) return;
  if (s.last === dayOff(-1, now)) s.n++;
  else if (s.last === dayOff(-2, now) && s.fz > 0) { s.fz--; s.n++; s.saved = d; }
  else s.n = 1;
  s.last = d; s.best = Math.max(s.best, s.n);
  if (s.n % 7 === 0) s.fz = Math.min(2, (s.fz || 0) + 1);
  if (s.n >= 3) award(S, 'streak3', now, ev);
  if (s.n >= 7) award(S, 'streak7', now, ev);
  if (s.n >= 30) award(S, 'streak30', now, ev);
}
function ensureDay(S, now) {
  const d = today(now);
  if (!S.day || S.day.d !== d) S.day = { d, c: {}, r: {} };
  return S.day;
}
/** The three quests for a date: XP plus two picked by the date, the same for every player. */
export function questsFor(dateStr) {
  const rest = QUESTS.slice(1); const h = parseInt(hash('q' + dateStr), 16);
  const a = h % rest.length; let b = (h >>> 8) % (rest.length - 1); if (b >= a) b++;
  return [QUESTS[0], rest[a], rest[b]];
}
export function questStatus(S, now = Date.now()) {
  const day = S.day && S.day.d === today(now) ? S.day : { c: {}, r: {} };
  return questsFor(today(now)).map((q) => ({ id: q.id, label: q.label, goal: q.goal, prog: Math.min(q.goal, day.c[q.key] || 0), done: !!day.r[q.id] }));
}
/** Count something towards today's quests. Completing one pays QUEST_REWARD XP. */
export function bump(S, key, n, now = Date.now(), ev) {
  const day = ensureDay(S, now);
  day.c[key] = (day.c[key] || 0) + n;
  for (const q of questsFor(day.d)) {
    if (q.key === key && day.c[key] >= q.goal && !day.r[q.id]) {
      day.r[q.id] = 1; S.cnt.quests = (S.cnt.quests || 0) + 1;
      mkEv(ev).quests.push(q.label);
      addXp(S, QUEST_REWARD, now, ev, false);
      if (S.cnt.quests >= 15) award(S, 'quests', now, ev);
    }
  }
}
export function addXp(S, n, now = Date.now(), ev, countForQuest = true) {
  if (n <= 0) return;
  const d = today(now);
  S.xp += n; S.days[d] = (S.days[d] || 0) + n;
  touchStreak(S, now, ev);
  const keys = Object.keys(S.days).sort();
  while (keys.length > 90) delete S.days[keys.shift()];
  if (countForQuest) bump(S, 'xp', n, now, ev);
}
/** Merge a second save R into S, keeping the better of each field. Returns true if S changed. */
export function merge(S, R, hasCard = () => true) {
  if (!R || R.v !== 1) return false;
  let changed = false;
  if ((R.xp || 0) > S.xp) { S.xp = R.xp; changed = true; }
  const rc = R.cards || {};
  for (const id in rc) { const a = S.cards[id], b = rc[id]; if (hasCard(id) && Array.isArray(b) && (!a || b[2] > a[2])) { S.cards[id] = b; changed = true; } }
  const rs = R.st || {};
  for (const id in rs) { const a = S.st[id] || [0, 0], b = rs[id]; const m = [Math.max(a[0], b[0]), Math.max(a[1], b[1])]; if (m[0] !== a[0] || m[1] !== a[1]) { S.st[id] = m; changed = true; } }
  const rd = R.days || {};
  for (const d in rd) if ((rd[d] || 0) > (S.days[d] || 0)) { S.days[d] = rd[d]; changed = true; }
  for (const b in (R.badges || {})) if (!S.badges[b]) { S.badges[b] = R.badges[b]; changed = true; }
  for (const m in (R.mis || {})) if (!S.mis[m]) { S.mis[m] = 1; changed = true; }
  const rcnt = R.cnt || {};
  for (const k in rcnt) if ((rcnt[k] || 0) > (S.cnt[k] || 0)) { S.cnt[k] = rcnt[k]; changed = true; }
  const a = S.streak, b = R.streak || {};
  if ((b.last || '') > (a.last || '') || ((b.last || '') === (a.last || '') && (b.n || 0) > a.n)) {
    S.streak = { n: b.n || 0, best: Math.max(a.best, b.best || 0), last: b.last || '', fz: Math.max(a.fz || 0, b.fz || 0) }; changed = true;
  } else if ((b.best || 0) > a.best) { a.best = b.best; changed = true; }
  if (R.day && R.day.d && (!S.day || R.day.d > (S.day.d || ''))) { S.day = JSON.parse(JSON.stringify(R.day)); changed = true; }
  return changed;
}
