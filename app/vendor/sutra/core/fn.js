// Composition helpers. Everything in sutra is a function from values to values;
// these are the joints that chain them.
export function pipe(a, ...fns) {
    return fns.reduce((x, f) => f(x), a);
}
export const identity = (a) => a;
/** Own keys of a record, typed. */
export const keys = (r) => Object.keys(r);
/** A copy of `r` with `key` set to `value`. */
export const assoc = (r, key, value) => ({ ...r, [key]: value });
/** A copy of `r` holding only the entries that pass `keep`. */
export const filterRec = (r, keep) => Object.fromEntries(Object.entries(r).filter(([k, v]) => keep(v, k)));
/** A copy of `r` with every value passed through `f`. */
export const mapRec = (r, f) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, f(v, k)]));
