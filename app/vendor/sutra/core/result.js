// A value or the reason there isn't one. Used instead of throwing, so that
// failure is part of a function's type and callers have to look at it.
export const ok = (value) => ({ ok: true, value });
export const err = (error) => ({ ok: false, error });
export const map = (r, f) => (r.ok ? ok(f(r.value)) : r);
export const chain = (r, f) => (r.ok ? f(r.value) : r);
export const withDefault = (r, fallback) => (r.ok ? r.value : fallback);
/** All values if every result is ok, otherwise every error. Useful for validators. */
export const collect = (rs) => {
    const errors = rs.flatMap((r) => (r.ok ? [] : [r.error]));
    return errors.length ? err(errors) : ok(rs.flatMap((r) => (r.ok ? [r.value] : [])));
};
