#!/usr/bin/env node
// Bundles the whole app into one HTML file (dist/kannada-kali.html) for places that
// host a single page, such as a claude.ai artifact. No service worker, no clips;
// fonts come from Google Fonts. Needs esbuild: npm install
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const p = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const out = await build({ entryPoints: [p('../app/js/main.js')], bundle: true, format: 'iife', minify: true, write: false, target: 'es2020', charset: 'utf8', legalComments: 'none' });
const js = out.outputFiles[0].text;
if (/<\/script/i.test(js)) throw new Error('bundle contains </script');
const css = readFileSync(p('../app/css/styles.css'), 'utf8');
const fonts = ['Anek+Latin:wght@400..800', 'Anek+Kannada:wght@400..800', 'Anek+Devanagari:wght@400..800', 'Share+Tech+Mono']
  .map((f) => `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${f}&display=swap">`).join('\n');
const html = `<title>Kannada Kali</title>
<meta name="claude:viewport-fit-sides" content="cover">
${fonts}
<style>
${css}
</style>
<div id="app"><div class="wrap main"><p class="mut">Loading the map…</p></div></div>
<script>window.KK_EMBEDDED = true;</script>
<script>
${js}
</script>
`;
mkdirSync(p('../dist/'), { recursive: true });
writeFileSync(p('../dist/kannada-kali.html'), html);
console.log('wrote dist/kannada-kali.html (' + Math.round(html.length / 1024) + ' KB)');
