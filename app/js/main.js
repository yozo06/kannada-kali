// Boot: load the player, wire up events, start audio, sync and offline support.
import { CARDS } from '../content/index.js';
import { G, A, render, tab, back, save, $ } from './ui/core.js';
import { enter, bookList } from './ui/views.js';
import './ui/ride.js';
import * as Store from './store.js';
import { initAudio } from './audio.js';
import { EMBEDDED } from './config.js';

A.tab = (d) => tab(d.t);
A.home = () => { G.R = null; G.D = null; tab('map'); };
A.back = () => back();

G.hooks.entered = () => {
  Store.initCloud(() => G.S, (id) => !!CARDS[id], () => { Store.saveState(G.pid, G.S); render(); });
};

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-a]'); if (!t || t.disabled) return;
  const act = t.dataset.a, f = A[act]; if (!f) return;
  if (act !== 'reset' && act !== 'pdel') G.UI.confirm = '';
  f(t.dataset, e);
});
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'bq') { G.UI.q = e.target.value; const l = $('#bl'); if (l) l.innerHTML = bookList(); }
});
document.addEventListener('keydown', (e) => {
  const el = document.activeElement, inField = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');
  if (e.key === 'Enter' && el && el.id === 'typeIn') { e.preventDefault(); return A.typed(); }
  if (e.key === 'Enter' && el && el.id === 'pname') { e.preventDefault(); return A.wstart(); }
  if (inField || !G.UI.screen || !/^[1-4]$/.test(e.key)) return;
  const b = $('.opt[data-i="' + (+e.key - 1) + '"]:not([disabled])'); if (b) b.click();
});
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); G.install = e; if (G.S && !G.UI.screen && G.UI.tab === 'me') render(); });
window.addEventListener('pagehide', () => { if (G.S) save(); });

const ix = Store.profiles();
if (ix.cur) enter(ix.cur);
render();
initAudio(() => render());
if (!EMBEDDED && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ }); });
}
if (typeof window !== 'undefined') window.__kk = { G, A, render }; // handy for tests and the console
