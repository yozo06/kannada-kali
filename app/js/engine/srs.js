// Leitner-style spaced repetition. A card record is [box, dueAt, reps, lapses].
import { DAY } from '../util.js';

/** Days to wait after reaching each box. Box 0 = due now. */
export const INTERVALS = [0, 1, 2, 4, 8, 16];
export const MAX_BOX = INTERVALS.length - 1;

/** Returns the new record after one review. Does not mutate its input. */
export function review(rec, ok, now = Date.now()) {
  const r = rec ? rec.slice() : [0, 0, 0, 0];
  r[2]++;
  if (ok) { r[0] = Math.min(MAX_BOX, r[0] + 1); r[1] = now + INTERVALS[r[0]] * DAY; }
  else { r[3]++; r[0] = 0; r[1] = now; }
  return r;
}
export const isDue = (rec, now = Date.now()) => !!rec && rec[1] <= now;
export const boxOf = (cards, id) => (cards[id] ? cards[id][0] : 0);
/** Ids of known cards that are due, given the saved records and a predicate for "still exists". */
export function dueIds(cards, exists, now = Date.now()) {
  return Object.keys(cards).filter((id) => exists(id) && cards[id][1] <= now);
}
