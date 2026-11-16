// Leitner-style spaced repetition. A card record is [box, dueAt, reps, lapses].
// The rules live in wildarc-sutra (app/vendor/sutra/srs); this file keeps the call shapes
// the rest of the app uses, with "now" defaulting to the current time.
import * as srs from '../../vendor/sutra/srs/index.js';

/** Days to wait after reaching each box. Box 0 = due now. */
export const INTERVALS = srs.INTERVALS;
export const MAX_BOX = INTERVALS.length - 1;

/** Returns the new record after one review. Does not mutate its input. */
export const review = (rec, ok, now = Date.now()) => [...srs.review(rec || undefined, !!ok, now)];
export const isDue = (rec, now = Date.now()) => srs.isDue(rec || undefined, now);
export const boxOf = (cards, id) => srs.boxOf(cards, id);
/** Ids of known cards that are due, given the saved records and a predicate for "still exists". */
export const dueIds = (cards, exists, now = Date.now()) => [...srs.dueIds(cards, now, exists)];
