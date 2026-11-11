// Assembles all content. Import order is the order stations appear on the map.
import { CARDS, STATIONS, DIALOGS } from './_build.js';
import './core.js';
import './grammar.js';
import './life.js';
import './script.js';
import { TRAPS, TWINS, STREET } from './lab.js';
import { NOUNS, FRAMES, forge } from './forge.js';
import { RULES, MISSIONS, RAJYOTSAVA_MISSION } from './guide.js';

STATIONS.push({ id: 'majestic', line: 9, name: 'ಮೆಜೆಸ್ಟಿಕ್', en: 'Majestic', blurb: 'The interchange. One long mixed ride', kind: 'boss', cards: [] });

export const LINES = [
  { n: 1, letter: 'A', name: 'Purple Line · Survive', sub: 'What you need this week', color: 'purple' },
  { n: 2, letter: 'B', name: 'Green Line · Settle in', sub: 'Numbers, markets, time, neighbours', color: 'green' },
  { n: 3, letter: 'C', name: 'Blue Line · Build sentences', sub: 'The grammar that lets you say new things', color: 'blue' },
  { n: 4, letter: 'D', name: 'Pink Line · Live here', sub: 'Family, food, work, doctor, slang', color: 'pink' },
  { n: 5, letter: 'E', name: 'Orange Line · Read', sub: 'The script. Ride it alongside any other line', color: 'orange', side: true }
];
export { CARDS, STATIONS, DIALOGS, TRAPS, TWINS, STREET, NOUNS, FRAMES, forge, RULES, MISSIONS, RAJYOTSAVA_MISSION };
