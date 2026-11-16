// Spaced repetition on a Leitner ladder. A card climbs one box per right answer and
// waits longer each time; a miss sends it back to the bottom, due at once.
import { DAY } from '../core/time.js';
/** Days to wait after reaching each box. Box 0 is due now. */
export const INTERVALS = [0, 1, 2, 4, 8, 16];
export const NEW_CARD = [0, 0, 0, 0];
/** The record after one review at time `now`. */
export const review = (rec, right, now, intervals = INTERVALS) => {
    const [box, , reps, lapses] = rec ?? NEW_CARD;
    if (!right)
        return [0, now, reps + 1, lapses + 1];
    const up = Math.min(intervals.length - 1, box + 1);
    return [up, now + (intervals[up] ?? 0) * DAY, reps + 1, lapses];
};
export const isDue = (rec, now) => !!rec && rec[1] <= now;
export const boxOf = (cards, id) => cards[id]?.[0] ?? 0;
/** Ids of met cards that are due. `exists` drops cards the content no longer has. */
export const dueIds = (cards, now, exists = () => true) => Object.keys(cards).filter((id) => exists(id) && isDue(cards[id], now));
/** Ids of the cards missed most often, worst first. */
export const weakest = (cards, n) => Object.keys(cards)
    .filter((id) => (cards[id]?.[3] ?? 0) > 0)
    .sort((a, b) => (cards[b]?.[3] ?? 0) - (cards[a]?.[3] ?? 0))
    .slice(0, n);
