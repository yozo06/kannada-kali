// Randomness without a hidden dice. A seed goes in; a value and the next seed
// come out. The same seed always gives the same sequence, so anything built on
// this can be replayed and tested. The shell supplies the first seed.
import { hash } from './hash.js';
/** A float in [0, 1) and the next seed (mulberry32). */
export const next = (seed) => {
    const s = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return [((t ^ (t >>> 14)) >>> 0) / 4294967296, s];
};
/** An integer in [0, n). */
export const int = (seed, n) => {
    const [x, s] = next(seed);
    return [Math.floor(x * n), s];
};
/** A shuffled copy (Fisher-Yates). */
export const shuffle = (seed, xs) => {
    const a = xs.slice();
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
        const [j, s2] = int(s, i + 1);
        s = s2;
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return [a, s];
};
/** One element, or undefined for an empty list. */
export const pick = (seed, xs) => {
    const [i, s] = int(seed, Math.max(1, xs.length));
    return [xs[i], s];
};
/** A seed from any text, e.g. a date, so that everyone gets the same "random" daily pick. */
export const seedFrom = (text) => parseInt(hash(text), 16) | 0;
