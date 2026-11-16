/** Start a program. Events dispatched while a step is running are queued and handled in order. */
export const start = (spec) => {
    let [state, pending] = [spec.program.init[0], [...spec.program.init[1]]];
    const inbox = [];
    let busy = false;
    const drain = () => {
        if (busy)
            return;
        busy = true;
        try {
            for (;;) {
                const effect = pending.shift();
                if (effect !== undefined) {
                    spec.run(effect, dispatch, state);
                    continue;
                }
                const event = inbox.shift();
                if (event === undefined)
                    break;
                const [next, effects] = spec.program.update(state, event);
                state = next;
                pending.push(...effects);
                spec.after?.(state, dispatch);
            }
        }
        finally {
            busy = false;
        }
    };
    const dispatch = (event) => { inbox.push(event); drain(); };
    spec.after?.(state, dispatch);
    drain();
    return { dispatch, state: () => state };
};
/**
 * Turn taps into events. Any element with data-a="<name>" becomes an action; the
 * element's other data-* values come along. Return undefined to ignore a tap.
 */
export const onActions = (root, toEvent, dispatch) => {
    const handler = (ev) => {
        const el = ev.target?.closest('[data-a]');
        if (!el || !root.contains(el))
            return;
        const event = toEvent(el.dataset['a'] ?? '', el.dataset, el);
        if (event !== undefined)
            dispatch(event);
    };
    root.addEventListener('click', handler);
    return () => root.removeEventListener('click', handler);
};
/** Escape text for use inside HTML. */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);
