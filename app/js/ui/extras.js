// Things a learner must not miss: installing the app, backing up progress, and a way
// to tell us what is wrong. One notice at a time on the map; the rest lives under You.
import { G, A, screens, IC, topbar, go, render, toast, save, $ } from './core.js';
import { tx, lang } from '../i18n.js';
import * as Store from '../store.js';
import { esc, DAY } from '../util.js';
import { VERSION, REPO_URL, EMBEDDED, FEEDBACK_FORM } from '../config.js';

const LATER_DAYS = 10;
const snoozed = (key) => Date.now() - Number(Store.getPref(key) || 0) < LATER_DAYS * DAY;
const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isIOS = /iPad|iPhone|iPod/.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);

/* ================= Install ================= */
export const isInstalled = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } };
/** 'installed' · 'prompt' (one-tap install is available) · 'ios' / 'android' (needs the browser menu) · 'none' */
export function installState() {
  if (EMBEDDED) return 'none';
  if (isInstalled()) return 'installed';
  if (G.install) return 'prompt';
  return isIOS ? 'ios' : isAndroid ? 'android' : 'none';
}
const installSteps = (st) => st === 'ios'
  ? tx('In Safari, tap the Share button at the bottom, then “Add to Home Screen”.')
  : tx('Tap the ⋮ menu at the top right of the browser, then “Add to Home screen” or “Install app”.');
function installBody(st) {
  return st === 'prompt'
    ? '<button class="btn pri" data-a="install">' + tx('Install the app') + IC.go + '</button>'
    : '<p class="steps">' + installSteps(st) + '</p>';
}
A.install = async () => {
  const ev = G.install; if (!ev) return; G.install = null;
  try { ev.prompt(); const r = await ev.userChoice; if (r && r.outcome !== 'accepted') Store.setPref('installLater', String(Date.now())); } catch (e) { /* dismissed */ }
  render();
};
A.later = (d) => { Store.setPref(d.k, String(Date.now())); render(); };
/** The row under You → Settings. Always there, so the option can be found again. */
export function installRow() {
  const st = installState();
  if (st === 'none') return '';
  if (st === 'installed') return '<p class="mut okline">' + IC.chk + tx('Installed on this device.') + '</p>';
  return '<div class="callout"><h3 class="h3">' + tx('Put Kannada Kali on your home screen') + '</h3><p>' + tx('It opens like any other app and works without internet.') + '</p>' + installBody(st) + '</div>';
}

/* ================= One notice on the map ================= */
const needsBackup = () => G.S && !G.S.set.backedUp && G.S.xp >= 150 && Store.cloudStatus() !== 'synced';
export function mapNotice() {
  const st = installState();
  if ((st === 'prompt' || st === 'ios' || st === 'android') && !snoozed('installLater')) {
    return '<section class="notice"><div class="nh"><span class="nicon">' + IC.home + '</span><h2 class="h2">' + tx('Put Kannada Kali on your home screen') + '</h2></div><p>' + tx('It opens like any other app and works without internet.') + '</p>' +
      installBody(st) + '<button class="lnk" data-a="later" data-k="installLater">' + tx('Not now') + '</button></section>';
  }
  if (needsBackup() && !snoozed('backupLater')) {
    return '<section class="notice warn"><div class="nh"><span class="nicon">' + IC.shield + '</span><h2 class="h2">' + tx('Keep your progress safe') + '</h2></div><p>' + tx('Your progress is saved only on this phone. If the browser data is cleared, it is gone. Copy your save code and keep it somewhere safe.') + '</p>' +
      '<button class="btn pri" data-a="backup">' + tx('Get my save code') + IC.go + '</button><button class="lnk" data-a="later" data-k="backupLater">' + tx('Not now') + '</button></section>';
  }
  return '';
}
export function markBackedUp() { if (G.S && !G.S.set.backedUp) { G.S.set.backedUp = Date.now(); save(); } }

/* ================= Feedback ================= */
const KINDS = () => [['bug', tx('Something is broken')], ['kannada', tx('A Kannada mistake')], ['idea', tx('An idea')]];
/** What we attach, shown to the learner before sending. Nothing that identifies a person. */
function details() {
  const f = G.UI.fb || {};
  const browser = (/(Edg|OPR|SamsungBrowser|Firefox|CriOS|FxiOS)\/[\d.]+/.exec(ua) || /(Chrome|Safari)\/[\d.]+/.exec(ua) || ['unknown'])[0];
  return ['Kannada Kali ' + VERSION, 'language ' + lang(), isIOS ? 'iOS' : isAndroid ? 'Android' : 'computer', browser,
    'screen ' + window.innerWidth + 'x' + window.innerHeight, isInstalled() ? 'installed' : 'in browser', navigator.onLine === false ? 'offline' : 'online', f.at ? 'last seen: ' + f.at : ''].filter(Boolean).join(' · ');
}
const message = () => { const f = G.UI.fb; return '[' + f.kind + '] ' + (f.text || '').trim() + '\n\n' + details(); };
/** Where the learner was just before opening feedback, e.g. "stop auto, card au3". */
function whereNow() {
  const sc = G.UI.screen, q = G.R && G.R.q && G.R.q[G.R.i];
  if (sc && sc.t === 'ride' && G.R) return (G.R.st ? 'stop ' + G.R.st : G.R.kind) + (q && q.card ? ', card ' + q.card.id : '');
  if (sc && sc.id) return sc.t + ' ' + sc.id;
  return sc ? sc.t : 'tab ' + G.UI.tab;
}
A.feedback = (d) => { G.UI.fbFrom = G.UI.screen; G.UI.fb = { kind: (d && d.k) || (G.UI.fb && G.UI.fb.kind) || 'bug', text: (G.UI.fb && G.UI.fb.text) || '', at: whereNow(), sent: false }; go({ t: 'feedback' }); };
/** Back from feedback: return to the ride or chat it was opened from, if any. */
A.fbback = () => { const from = G.UI.fbFrom; G.UI.fbFrom = null; if (from && ((from.t === 'ride' && G.R) || (from.t === 'dialog' && G.D))) go(from); else { G.UI.screen = null; G.UI.scroll = true; render(); } };
const keepText = () => { const el = $('#fbText'); if (el) G.UI.fb.text = el.value; };
A.fbkind = (d) => { keepText(); G.UI.fb.kind = d.v; render(); };
async function copyText(text) { try { await navigator.clipboard.writeText(text); return true; } catch (e) { return false; } }
function openLink(url) { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); }
export function formUrl(form, f, det) {
  const q = [], add = (id, v) => { if (id) q.push(encodeURIComponent(id) + '=' + encodeURIComponent(v)); };
  add(form.fields && form.fields.kind, f.kind); add(form.fields && form.fields.message, f.text.trim()); add(form.fields && form.fields.details, det);
  return form.url + (q.length ? (form.url.includes('?') ? '&' : '?') + q.join('&') : '');
}
A.fbsend = async () => {
  keepText(); const f = G.UI.fb;
  if (!f.text.trim()) { toast(tx('Write a few words first.')); const el = $('#fbText'); if (el) el.focus(); return; }
  const copied = await copyText(message());
  if (FEEDBACK_FORM.url) { openLink(formUrl(FEEDBACK_FORM, f, details())); f.sent = true; render(); toast(copied ? tx('Opening the form. Your message is also copied, in case you need to paste it.') : tx('Opening the form.')); }
  else { f.sent = true; render(); toast(copied ? tx('Message copied.') : tx('Select the text and copy it.')); }
};
A.fbnew = () => { G.UI.fb = { kind: 'bug', text: '', at: G.UI.fb.at, sent: false }; render(); };
screens.feedback = () => {
  const f = G.UI.fb, hasForm = !!FEEDBACK_FORM.url;
  const issue = REPO_URL ? REPO_URL + '/issues/new?title=' + encodeURIComponent('[' + f.kind + '] ' + f.text.trim().slice(0, 60)) + '&body=' + encodeURIComponent(message()) : '';
  const done = f.sent ? '<section class="panel flat"><p class="okline">' + IC.chk + (hasForm ? tx('Thank you. Press Submit on the form that opened to send it.') : tx('Thank you. Your message is copied.')) + '</p>' +
    (hasForm ? '' : '<p>' + tx('Paste it to the person who shared this app with you.') + (issue ? ' ' + tx('If you use GitHub, you can also post it there.') : '') + '</p>' + (issue ? '<a class="btn" href="' + esc(issue) + '" target="_blank" rel="noopener">' + tx('Open GitHub') + '</a>' : '')) +
    '<button class="btn" data-a="fbnew">' + tx('Write another') + '</button></section>' : '';
  return topbar(tx('Feedback'), 'fbback') + '<main class="wrap main"><section class="panel"><h1 class="h1">' + tx('Tell us what to fix') + '</h1><p>' + tx('A wrong word, a button that does nothing, something confusing, something you wish it had. Short is fine, and any language is fine.') + '</p>' +
    '<div class="segs">' + KINDS().map((k) => '<button class="seg' + (f.kind === k[0] ? ' on' : '') + '" data-a="fbkind" data-v="' + k[0] + '" aria-pressed="' + (f.kind === k[0]) + '">' + k[1] + '</button>').join('') + '</div>' +
    '<label class="vh" for="fbText">' + tx('Your message') + '</label><textarea id="fbText" class="code fbtext" rows="5" placeholder="' + tx('What happened? What did you expect?') + '">' + esc(f.text) + '</textarea>' +
    '<p class="mut">' + tx('Sent along with it, so we can find the problem:') + ' ' + esc(details()) + '. ' + tx('Nothing about who you are.') + '</p>' +
    '<button class="btn pri wide" data-a="fbsend">' + (hasForm ? tx('Send') : tx('Copy my message')) + IC.go + '</button></section>' + done + '</main>';
};
/** The entry point under You. */
export const feedbackRow = () => '<div class="callout plain"><h3 class="h3">' + tx('Found a mistake or have an idea?') + '</h3><p>' + tx('This app is new and made by a few people. Your message really helps.') + '</p><button class="btn" data-a="feedback">' + tx('Send feedback') + IC.go + '</button></div>';
