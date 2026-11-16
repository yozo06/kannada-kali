// Anonymous usage counts: do people come back, and which stops do they finish?
// No names, no ids, no cookies. The rules live in wildarc-sutra's analytics library:
// the phone keeps a small record (the meter) and sends only short names such as
// "kali/hi/back/d7". This file is the wiring: keep the meter, send what it asks for.
// What is counted, exactly: docs/analytics.md.
import { meter, NEW_METER } from '../vendor/sutra/analytics/index.js';
import { sendToGoatcounter } from '../vendor/sutra/browser/send.js';
import { readClock } from '../vendor/sutra/browser/clock.js';
import { dayOf } from '../vendor/sutra/core/time.js';
import { COUNT_ENDPOINT, EMBEDDED } from './config.js';
import { getPref, setPref } from './store.js';
import { lang } from './i18n.js';

const onDevMachine = () => /^(localhost$|127\.|\[::1\])/.test(location.hostname) && getPref('countLocal') !== '1';
/** Counting needs an endpoint and a real hosted page: not the single-file build, not a developer's machine. */
export const countingAvailable = () => !!COUNT_ENDPOINT && !EMBEDDED && typeof location !== 'undefined' && !onDevMachine();

const read = () => { try { return { ...NEW_METER, ...JSON.parse(getPref('meter') || '{}'), sending: 0 }; } catch (e) { return NEW_METER; } };
let M = read();

function step(signal) {
  const [next, effects] = meter({ app: 'kali', lang: lang() })(M, signal);
  M = next; setPref('meter', JSON.stringify(M));
  for (const fx of effects) sendToGoatcounter(COUNT_ENDPOINT, fx.hits).then((n) => step(n ? { t: 'sent', n } : { t: 'failed' }));
}
/** Tell the meter that something happened, e.g. count({ t: 'start', unit: 'stop-nm' }). */
export function count(signal) { if (countingAvailable()) step({ ...signal, day: dayOf(readClock()) }); }
export const countingOn = () => M.on;
/** The player's switch under You → Settings. Turning it off also throws away anything waiting to be sent. */
export function setCounting(on) { step({ t: 'opt', on: !!on }); if (on) count({ t: 'open' }); }
