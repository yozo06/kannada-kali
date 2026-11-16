// The shape every moving part takes: a pure step function.
//
//   update : (state, event) -> [next state, effects]
//
// An effect is a description of something to do in the world (play a sound, save,
// send a count). Nothing in the core performs one; the shell (src/browser) does,
// and reports back with more events. A whole app is updates chained together.
/** A step that changes state and asks for nothing. */
export const just = (state) => [state, []];
/** Replay a list of events from a starting state. State is always a fold over what happened. */
export const fold = (update, start, events) => events.reduce(([s, fx], e) => {
    const [s2, f2] = update(s, e);
    return [s2, [...fx, ...f2]];
}, [start, []]);
/** Run several updates on the same event, in order, gathering their effects. */
export const sequence = (...updates) => (state, event) => fold((s, u) => u(s, event), state, updates);
/** Lift an update on a part into an update on the whole (get the part out, put it back). */
export const embed = (get, set, inner) => (whole, event) => {
    const [part, fx] = inner(get(whole), event);
    return [set(whole, part), fx];
};
/** Feed an update only the events it understands; others pass through untouched. */
export const only = (select, inner) => (state, event) => {
    const e2 = select(event);
    return e2 === undefined ? [state, []] : inner(state, e2);
};
/** Let a pure onlooker see each transition and add effects of its own (this is how analytics plugs in). */
export const observe = (update, watch) => (state, event) => {
    const [after, fx] = update(state, event);
    return [after, [...fx, ...watch(state, event, after)]];
};
