#!/usr/bin/env node
// Writes app/sw.js with the list of files to keep for offline use.
// Run after adding, removing or changing any file under app/:  npm run sw
// `--check` exits non-zero if app/sw.js is out of date (used in CI).
// The service worker itself comes from wildarc-sutra's pwa library.
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cacheable, serviceWorker } from '../app/vendor/sutra/pwa/index.js';

const root = fileURLToPath(new URL('../app/', import.meta.url));
const walk = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = cacheable(walk(root).map((p) => relative(root, p)));
const h = createHash('sha256'); for (const f of files) { h.update(f); h.update(readFileSync(join(root, f))); }
const version = h.digest('hex').slice(0, 12);
const sw = serviceWorker({ prefix: 'kk', version, assets: files });

const out = join(root, 'sw.js');
if (process.argv.includes('--check')) {
  if (!existsSync(out) || readFileSync(out, 'utf8') !== sw) { console.error('app/sw.js is out of date. Run: npm run sw'); process.exit(1); }
  console.log('sw.js is up to date (' + files.length + ' files, version ' + version + ')');
} else { writeFileSync(out, sw); console.log('wrote app/sw.js: ' + files.length + ' files, version ' + version); }
