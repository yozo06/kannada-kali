// Build-time facts about this copy of the app.
export const VERSION = '0.4.6';
/** Where feedback goes: a Google Form. `fields` are the form's entry ids (entry.123456) for pre-filling; leave '' to skip.
 *  With no url, the feedback screen copies the message and offers GitHub instead. See docs/feedback.md. */
export const FEEDBACK_FORM = { url: 'https://docs.google.com/forms/d/e/1FAIpQLSfgtfr8_O2j9FfZfzSm0y64biMiOizBKjX6FLX9Gp91XPuDUw/viewform', fields: { kind: 'entry.1585815881', message: 'entry.477653805', details: 'entry.2057394031' } };
export const REPO_URL = 'https://github.com/yozo06/kannada-kali';
/** Where anonymous usage counts go (a GoatCounter site). Empty turns counting off. Forks: use your own or leave it empty. */
export const COUNT_ENDPOINT = 'https://yozo.goatcounter.com/count';
/** True inside the single-file claude.ai build, where there is no service worker and no clip folder. */
export const EMBEDDED = typeof window !== 'undefined' && !!window.KK_EMBEDDED;
