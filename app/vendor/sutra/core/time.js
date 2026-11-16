// Calendar days without reading the clock. The shell reads the clock once and
// passes it in; from there on a day is just a string and arithmetic is exact.
export const DAY = 86400000;
/** The learner's calendar day at that reading. */
export const dayOf = (c) => new Date(c.now + c.offset * 60000).toISOString().slice(0, 10);
/** Days since 1970-01-01 for a 'YYYY-MM-DD' day. */
export const dayNumber = (d) => Math.round(Date.parse(d + 'T00:00:00Z') / DAY);
export const fromDayNumber = (n) => new Date(n * DAY).toISOString().slice(0, 10);
export const addDays = (d, n) => fromDayNumber(dayNumber(d) + n);
/** Whole days from `a` to `b`; negative if `b` is earlier. */
export const daysBetween = (a, b) => dayNumber(b) - dayNumber(a);
