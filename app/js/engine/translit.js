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
