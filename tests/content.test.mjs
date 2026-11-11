import { test } from 'node:test';
import assert from 'node:assert/strict';
import { errors } from '../scripts/validate-content.mjs';
import * as C from '../app/content/index.js';

test('all lesson content passes validation', () => {
  assert.deepEqual(errors, []);
});
test('the syllabus has the expected shape', () => {
  assert.equal(C.LINES.length, 5);
  for (const l of C.LINES) assert.ok(C.STATIONS.some((s) => s.line === l.n), 'line ' + l.n + ' has stations');
  assert.equal(C.STATIONS.filter((s) => s.kind === 'boss').length, 1);
  assert.ok(Object.values(C.CARDS).filter((c) => !c.t).length >= 400);
  for (const f of C.FRAMES) for (const p of f.pool) { const s = C.forge(f, p); assert.ok(s.k && s.r && s.e && !/\{/.test(s.e)); }
});
