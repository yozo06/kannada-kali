// Kannada script -> Roman in the game's scheme. Pure; used by the content
// validator and to sound out street boards.
//   aa ee oo = long vowels · E O = long ಏ ಓ · e o = short ಎ ಒ
//   T D N L = retroflex ಟ ಡ ಣ ಳ · t d n l = dental
const IV = { 'ಅ': 'a', 'ಆ': 'aa', 'ಇ': 'i', 'ಈ': 'ee', 'ಉ': 'u', 'ಊ': 'oo', 'ಋ': 'ru', 'ಎ': 'e', 'ಏ': 'E', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'O', 'ಔ': 'au' };
const MA = { 'ಾ': 'aa', 'ಿ': 'i', 'ೀ': 'ee', 'ು': 'u', 'ೂ': 'oo', 'ೃ': 'ru', 'ೆ': 'e', 'ೇ': 'E', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'O', 'ೌ': 'au' };
const CO = { 'ಕ': 'k', 'ಖ': 'kh', 'ಗ': 'g', 'ಘ': 'gh', 'ಙ': 'ng', 'ಚ': 'ch', 'ಛ': 'chh', 'ಜ': 'j', 'ಝ': 'jh', 'ಞ': 'n', 'ಟ': 'T', 'ಠ': 'Th', 'ಡ': 'D', 'ಢ': 'Dh', 'ಣ': 'N', 'ತ': 't', 'ಥ': 'th', 'ದ': 'd', 'ಧ': 'dh', 'ನ': 'n', 'ಪ': 'p', 'ಫ': 'ph', 'ಬ': 'b', 'ಭ': 'bh', 'ಮ': 'm', 'ಯ': 'y', 'ರ': 'r', 'ಲ': 'l', 'ವ': 'v', 'ಶ': 'sh', 'ಷ': 'sh', 'ಸ': 's', 'ಹ': 'h', 'ಳ': 'L', 'ಱ': 'r' };
const VIRAMA = '್';
const LABIAL = 'ಪಫಬಭಮ', RETRO = 'ಟಠಡಢಣ';

export function translit(text) {
  const ch = [...String(text).replace(/[‌‍]/g, '')];
  let out = '';
  for (let i = 0; i < ch.length; i++) {
    const c = ch[i];
    if (IV[c]) { out += IV[c]; continue; }
    if (CO[c]) {
      out += CO[c];
      const n = ch[i + 1];
      if (n === VIRAMA) { i++; continue; }
      if (MA[n]) { out += MA[n]; i++; continue; }
      out += 'a'; continue;
    }
    if (c === 'ಂ') { // anusvara takes the place of the next consonant
      const n = ch[i + 1];
      out += (!n || n === ' ' || LABIAL.includes(n)) ? 'm' : (RETRO.includes(n) ? 'N' : 'n');
      continue;
    }
    if (c === 'ಃ') { out += 'h'; continue; }
    out += c;
  }
  return out;
}
export const hasKannada = (s) => /[ಀ-೿]/.test(String(s));

/* ----- Kannada -> another Indian script, for learners who do not read Roman ----- */
// The Kannada, Devanagari and Odia Unicode blocks share one layout, so most letters
// map by a fixed offset. Devanagari has the short ऎ ऒ; Odia does not, so they merge.
const BASE = { deva: 0x0900, odia: 0x0B00 };
const ODIA_FIX = { 0x0E: 0x0F, 0x12: 0x13, 0x46: 0x47, 0x4A: 0x4B, 0x35: 0x71, 0x31: 0x30, 0x34: 0x33 };
export function toScript(text, script) {
  const base = BASE[script]; if (!base) return String(text);
  let out = '';
  for (const ch of String(text).replace(/[‌‍]/g, '')) {
    const cp = ch.codePointAt(0);
    if (cp < 0x0C80 || cp > 0x0CFF) { out += ch; continue; }
    let off = cp - 0x0C80;
    if (script === 'odia' && ODIA_FIX[off] != null) off = ODIA_FIX[off];
    out += String.fromCodePoint(base + off);
  }
  return out;
}
