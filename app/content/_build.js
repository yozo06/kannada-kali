// Shared registries that every content file fills in. Pure data, no DOM.
export const CARDS = {};
export const STATIONS = [];
export const DIALOGS = {};

/** Register a phrase card. k = Kannada script, r = Roman (see docs/content-guide.md),
 *  e = English, n = teaching note, hi = Hindi/Marathi cognate in Devanagari. */
export function add(id, k, r, e, n, hi) {
  if (CARDS[id]) throw new Error('duplicate card id: ' + id);
  CARDS[id] = { id, k, r, e, n: n || '', hi: hi || '' };
}
/** A dialogue option. Exactly one option per turn has ok = 1. */
export const O = (k, r, e, ok) => ({ k, r, e, ok: ok ? 1 : 0 });
