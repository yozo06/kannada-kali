/** The counting endpoint for a GoatCounter site code, e.g. 'lets' -> https://lets.goatcounter.com/count */
export const goatcounterEndpoint = (code) => `https://${code}.goatcounter.com/count`;
/** The URL that records one hit. `nonce` only defeats caches; any short text will do. */
export const goatcounterUrl = (endpoint, hit, nonce) => `${endpoint}?p=${encodeURIComponent(hit.name)}&t=${encodeURIComponent(hit.name)}&e=true&rnd=${encodeURIComponent(nonce)}`;
