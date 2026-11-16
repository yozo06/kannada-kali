// Anonymous usage counts. The question this answers is "does this way of teaching
// keep people coming back, and where do they stop?", not "who did what".
//
// How it stays anonymous:
//   - There is no user id, device id or cookie. Nothing identifies a learner.
//   - The phone works out facts such as "came back a week later" from a small
//     record it keeps locally (the Meter) and sends only the name of that fact.
//   - A hit is a short name like "lets/hi/back/d7". That is all that leaves the phone.
//
// It is a pure state machine: signals in, a new Meter and "send these" out.
// The shell does the sending and reports back with a 'sent' or 'failed' signal.
import { daysBetween } from '../core/time.js';
export * from './goatcounter.js';
export const NEW_METER = { on: true, first: '', last: '', days: 0, once: [], queue: [], sending: 0 };
export const RULES = { milestones: [1, 3, 7, 14, 30], maxQueue: 200 };
const safe = (s) => s.replace(/[^A-Za-z0-9_.-]+/g, '-');
/** The names a signal turns into, before tagging. Pure; exported for tests and dashboards. */
export const namesFor = (m, s, rules = RULES) => {
    switch (s.t) {
        case 'open': {
            if (m.last === s.day)
                return [];
            const since = m.first === '' ? 0 : daysBetween(m.first, s.day);
            return [
                ...(m.first === '' ? [{ name: 'new', once: true }] : []),
                { name: 'day', once: false },
                ...rules.milestones.filter((d) => since >= d).map((d) => ({ name: `back/d${d}`, once: true })),
            ];
        }
        case 'start':
            return [{ name: `unit/${safe(s.unit)}/start`, once: true }];
        case 'done':
            return [{ name: `unit/${safe(s.unit)}/done`, once: true }];
        case 'quit':
            return [{ name: `unit/${safe(s.unit)}/quit/${Math.max(0, Math.floor(s.at))}`, once: true }];
        case 'count':
            return [{ name: s.name.split('/').map(safe).join('/'), once: !!s.once }];
        default:
            return [];
    }
};
const sendNext = (m) => m.sending === 0 && m.queue.length > 0 ? [{ ...m, sending: m.queue.length }, [{ t: 'send', hits: m.queue }]] : [m, []];
/** The meter's step function for one app and language. */
export const meter = (tags, rules = RULES) => (m, s) => {
    if (s.t === 'opt')
        return [s.on ? { ...m, on: true } : { ...m, on: false, queue: [], sending: 0 }, []];
    if (s.t === 'sent')
        return sendNext({ ...m, queue: m.queue.slice(Math.min(s.n, m.sending)), sending: 0 });
    if (s.t === 'failed')
        return [{ ...m, sending: 0 }, []];
    if (!m.on)
        return [m, []];
    const prefix = [tags.app, tags.lang].filter((x) => !!x).map(safe).join('/');
    const fresh = namesFor(m, s, rules).filter((n) => !(n.once && m.once.includes(n.name)));
    const opened = s.t === 'open' && m.last !== s.day;
    const queue = [...m.queue, ...fresh.map((n) => ({ name: `${prefix}/${n.name}` }))];
    const overflow = Math.max(0, queue.length - rules.maxQueue);
    const next = {
        ...m,
        first: opened && m.first === '' ? s.day : m.first,
        last: opened ? s.day : m.last,
        days: opened ? m.days + 1 : m.days,
        once: [...m.once, ...fresh.filter((n) => n.once).map((n) => n.name)],
        // Never drop hits that are mid-flight: only trim behind them.
        queue: overflow > 0 ? [...queue.slice(0, m.sending), ...queue.slice(m.sending + overflow)] : queue,
    };
    return sendNext(next);
};
