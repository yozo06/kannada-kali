#!/usr/bin/env node
// Copies the built wildarc-sutra libraries into app/vendor/sutra, where the app loads them
// from. The site has no build step, so the shared libraries live in the app as plain files.
//   npm run sutra -- ../wildarc-sutra     (a checkout that has been built: npm run build)
// With no path it looks in node_modules/wildarc-sutra.
// Never edit app/vendor/sutra by hand: fix it in wildarc-sutra and copy again.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const from = resolve(process.argv[2] || fileURLToPath(new URL('../node_modules/wildarc-sutra', import.meta.url)));
const dist = join(from, 'dist');
if (!existsSync(join(dist, 'index.js'))) { console.error(`No built libraries at ${dist}. Run "npm run build" in wildarc-sutra, or pass its path.`); process.exit(1); }
const to = fileURLToPath(new URL('../app/vendor/sutra/', import.meta.url));
rmSync(to, { recursive: true, force: true }); mkdirSync(to, { recursive: true });
const walk = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist).filter((f) => f.endsWith('.js'));
for (const f of files) cpSync(f, join(to, relative(dist, f)), { recursive: true });
const version = JSON.parse(readFileSync(join(from, 'package.json'), 'utf8')).version;
let commit = ''; try { commit = execSync('git rev-parse --short HEAD', { cwd: from, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { /* not a git checkout */ }
writeFileSync(join(to, 'README.md'), `# wildarc-sutra ${version}${commit ? ' (' + commit + ')' : ''}\n\nA copy of the built libraries from https://github.com/yozo06/wildarc-sutra.\nDo not edit these files. To update: \`npm run sutra -- <path to wildarc-sutra>\`, then \`npm run sw\`.\n`);
console.log(`copied ${files.length} files from wildarc-sutra ${version}${commit ? ' (' + commit + ')' : ''} to app/vendor/sutra`);
