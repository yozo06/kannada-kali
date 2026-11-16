// Sends queued hits. Returns how many went through, in order, so the meter can
// drop exactly those and keep the rest for later.
import { goatcounterUrl } from '../analytics/goatcounter.js';
/** Send to a GoatCounter endpoint. Stops at the first failure. Never throws. */
export const sendToGoatcounter = async (endpoint, hits) => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false)
        return 0;
    let sent = 0;
    for (const hit of hits) {
        try {
            // The reply is an image from another site; 'no-cors' lets the request go without reading it.
            await fetch(goatcounterUrl(endpoint, hit, Date.now().toString(36) + sent), { mode: 'no-cors', cache: 'no-store', credentials: 'omit', keepalive: true });
            sent++;
        }
        catch {
            break;
        }
    }
    return sent;
};
