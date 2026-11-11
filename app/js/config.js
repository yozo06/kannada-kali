// Build-time facts about this copy of the app.
export const VERSION = '0.2.0';
export const REPO_URL = '';
/** True inside the single-file claude.ai build, where there is no service worker and no clip folder. */
export const EMBEDDED = typeof window !== 'undefined' && !!window.KK_EMBEDDED;
