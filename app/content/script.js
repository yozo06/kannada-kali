// Line E: Read. The Kannada script for people who already read Devanagari.
// Letter cards have t = 'L' (r is the sound), board cards have t = 'W'.
import { CARDS, add, STATIONS } from './_build.js';

/** k = letter, r = sound, hi = Devanagari twin ('' when there is none), ex = [word, roman, meaning] */
function L(id, k, r, hi, ex, n) {
  add(id, k, r, 'the sound "' + r + '"', n || '', hi || '');
  CARDS[id].t = 'L';
  if (ex) CARDS[id].ex = ex;
}
function W(id, k, r, e, n) { add(id, k, r, e, n || ''); CARDS[id].t = 'W'; }

/* ---------- Vowels ---------- */
L('lv1', 'ಅ', 'a', 'अ', ['ಅಮ್ಮ', 'amma', 'mother']);
L('lv2', 'ಆ', 'aa', 'आ', ['ಆರು', 'aaru', 'six']);
L('lv3', 'ಇ', 'i', 'इ', ['ಇಲ್ಲ', 'illa', 'no']);
L('lv4', 'ಈ', 'ee', 'ई', ['ಈಗ', 'eega', 'now']);
L('lv5', 'ಉ', 'u', 'उ', ['ಉಪ್ಪು', 'uppu', 'salt']);
L('lv6', 'ಊ', 'oo', 'ऊ', ['ಊಟ', 'ooTa', 'meal']);
L('lv7', 'ಎ', 'e', '', ['ಎಷ್ಟು', 'eshTu', 'how much'], 'Short e, as in "pen". Devanagari has no separate letter for it.');
L('lv8', 'ಏ', 'E', 'ए', ['ಏನು', 'Enu', 'what'], 'Long E. The little hook on top stretches the vowel.');
L('lv9', 'ಐ', 'ai', 'ऐ', ['ಐದು', 'aidu', 'five']);
L('lv10', 'ಒ', 'o', '', ['ಒಂದು', 'ondu', 'one'], 'Short o, as in "pot". No Devanagari twin.');
L('lv11', 'ಓ', 'O', 'ओ', ['ಓದು', 'Odu', 'read'], 'Long O. Same hook as ಏ.');
L('lv12', 'ಔ', 'au', 'औ', ['ಔಷಧಿ', 'aushadhi', 'medicine']);

/* ---------- ka and cha rows ---------- */
L('lc1', 'ಕ', 'ka', 'क', ['ಕನ್ನಡ', 'kannaDa', 'Kannada']);
L('lc2', 'ಖ', 'kha', 'ख', ['ಖಾರ', 'khaara', 'spicy']);
L('lc3', 'ಗ', 'ga', 'ग', ['ಗಂಟೆ', 'gaNTe', 'hour']);
L('lc4', 'ಘ', 'gha', 'घ', null, 'Rare in everyday words.');
L('lc5', 'ಚ', 'cha', 'च', ['ಚಳಿ', 'chaLi', 'cold']);
L('lc6', 'ಛ', 'chha', 'छ', ['ಛತ್ರಿ', 'chhatri', 'umbrella']);
L('lc7', 'ಜ', 'ja', 'ज', ['ಜನ', 'jana', 'people']);
L('lc8', 'ಝ', 'jha', 'झ', null, 'Rare in everyday words.');

/* ---------- Ta and ta rows ---------- */
L('lt1', 'ಟ', 'Ta', 'ट', ['ಊಟ', 'ooTa', 'meal']);
L('lt2', 'ಠ', 'Tha', 'ठ', null, 'ರ with a dot inside.');
L('lt3', 'ಡ', 'Da', 'ड', ['ಕನ್ನಡ', 'kannaDa', 'Kannada']);
L('lt4', 'ಢ', 'Dha', 'ढ', null, 'ಡ with a tail stroke for the breath.');
L('lt5', 'ಣ', 'Na', 'ण', ['ಹಣ್ಣು', 'haNNu', 'fruit']);
L('lt6', 'ತ', 'ta', 'त', ['ತಮ್ಮ', 'tamma', 'younger brother']);
L('lt7', 'ಥ', 'tha', 'थ', ['ಅಥವಾ', 'athavaa', 'or']);
L('lt8', 'ದ', 'da', 'द', ['ದಿನ', 'dina', 'day']);
L('lt9', 'ಧ', 'dha', 'ध', ['ಧನ್ಯವಾದ', 'dhanyavaada', 'thanks']);
L('lt10', 'ನ', 'na', 'न', ['ನಾನು', 'naanu', 'I']);

/* ---------- pa row and ya ra la va ---------- */
L('lp1', 'ಪ', 'pa', 'प', ['ಪುಸ್ತಕ', 'pustaka', 'book']);
L('lp2', 'ಫ', 'pha', 'फ', null, 'Used for f in English words: ಫೋನ್ = phone.');
L('lp3', 'ಬ', 'ba', 'ब', ['ಬೇಕು', 'bEku', 'want']);
L('lp4', 'ಭ', 'bha', 'भ', ['ಭಾಷೆ', 'bhaashe', 'language']);
L('lp5', 'ಮ', 'ma', 'म', ['ಮನೆ', 'mane', 'house']);
L('lp6', 'ಯ', 'ya', 'य', ['ಯಾರು', 'yaaru', 'who']);
L('lp7', 'ರ', 'ra', 'र', ['ರಾತ್ರಿ', 'raatri', 'night']);
L('lp8', 'ಲ', 'la', 'ल', ['ಇಲ್ಲಿ', 'illi', 'here']);
L('lp9', 'ವ', 'va', 'व', ['ವಾರ', 'vaara', 'week']);

/* ---------- sha sa ha La and friends ---------- */
L('ls1', 'ಶ', 'sha', 'श', ['ಶಾಲೆ', 'shaale', 'school']);
L('ls2', 'ಷ', 'sha', 'ष', ['ಭಾಷೆ', 'bhaashe', 'language'], 'Retroflex sh. In everyday speech it sounds the same as ಶ.');
L('ls3', 'ಸ', 'sa', 'स', ['ಸರಿ', 'sari', 'alright']);
L('ls4', 'ಹ', 'ha', 'ह', ['ಹಾಲು', 'haalu', 'milk']);
L('ls5', 'ಳ', 'La', 'ळ', ['ನಾಳೆ', 'naaLe', 'tomorrow'], 'The Marathi ळ. Hindi has no such letter.');
L('ls6', 'ಅಂ', 'am', 'अं', ['ಒಂದು', 'ondu', 'one'], 'The small circle ಂ is the anusvara. It turns into n or m to suit the next letter.');
L('ls7', 'ಕ್ಷ', 'ksha', 'क्ष', ['ಕ್ಷಮಿಸಿ', 'kshamisi', 'sorry']);
L('ls8', 'ಜ್ಞ', 'jna', 'ज्ञ', ['ಜ್ಞಾನ', 'jnaana', 'knowledge'], 'Kannada says "gna". Hindi says gya, Marathi dnya.');

/* ---------- Vowel signs ---------- */
L('lm1', 'ಕಾ', 'kaa', 'का', ['ಕಾಫಿ', 'kaapi', 'coffee'], 'A stroke to the right adds aa.');
L('lm2', 'ಮಿ', 'mi', 'मि', ['ಕಮ್ಮಿ', 'kammi', 'less'], 'A curl on top adds i.');
L('lm3', 'ನೀ', 'nee', 'नी', ['ನೀರು', 'neeru', 'water'], 'The same curl plus a tail adds ee.');
L('lm4', 'ಬು', 'bu', 'बु', ['ಬುಧವಾರ', 'budhavaara', 'Wednesday'], 'A hook on the right adds u.');
L('lm5', 'ಸೂ', 'soo', 'सू', null, 'A double hook on the right adds oo.');
L('lm6', 'ಗೆ', 'ge', '', ['ಮನೆಗೆ', 'manege', 'to home'], 'A flag on top adds short e.');
L('lm7', 'ದೇ', 'dE', 'दे', ['ದೇಶ', 'dEsha', 'country'], 'The flag plus a tail adds long E.');
L('lm8', 'ಕೈ', 'kai', 'कै', ['ಕೈ', 'kai', 'hand'], 'The flag plus a loop below adds ai.');
L('lm9', 'ಪೊ', 'po', '', ['ಪೊಲೀಸ್', 'police', 'police'], 'Flag plus the double hook add short o.');
L('lm10', 'ತೋ', 'tO', 'तो', ['ಸಂತೋಷ', 'santOsha', 'joy'], 'Flag, double hook and tail add long O.');
L('lm11', 'ಮೌ', 'mau', 'मौ', null, 'A big curl on the right adds au.');
L('lm12', 'ಬಂ', 'bam', 'बं', ['ಒಂಬತ್ತು', 'ombattu', 'nine'], 'The circle adds a nasal: m or n.');
L('lm13', 'ಕ್', 'k', 'क्', ['ಬ್ಯಾಂಕ್', 'bank', 'bank'], 'The cap on top kills the built-in a. Same job as the Hindi halant.');

/* ---------- Stacked letters ---------- */
L('lj1', 'ಕ್ಕ', 'kka', 'क्क', ['ಅಕ್ಕ', 'akka', 'elder sister'], 'A second consonant sits below the first. Doubled letters are the commonest stacks.');
L('lj2', 'ತ್ತ', 'tta', 'त्त', ['ಹತ್ತು', 'hattu', 'ten']);
L('lj3', 'ಲ್ಲ', 'lla', 'ल्ल', ['ಇಲ್ಲ', 'illa', 'no']);
L('lj4', 'ನ್ನ', 'nna', 'न्न', ['ಕನ್ನಡ', 'kannaDa', 'Kannada']);
L('lj5', 'ಟ್ಟ', 'TTa', 'ट्ट', ['ಹೊಟ್ಟೆ', 'hoTTe', 'stomach']);
L('lj6', 'ಣ್ಣ', 'NNa', 'ण्ण', ['ಅಣ್ಣ', 'aNNa', 'elder brother']);
L('lj7', 'ಮ್ಮ', 'mma', 'म्म', ['ಅಮ್ಮ', 'amma', 'mother']);
L('lj8', 'ಪ್ಪ', 'ppa', 'प्प', ['ಅಪ್ಪ', 'appa', 'father']);
L('lj9', 'ಡ್ಡ', 'DDa', 'ड्ड', ['ದೊಡ್ಡ', 'doDDa', 'big']);
L('lj10', 'ಳ್ಳ', 'LLa', 'ळ्ळ', ['ಒಳ್ಳೆ', 'oLLe', 'good']);
L('lj11', 'ಸ್ವ', 'sva', 'स्व', ['ಸ್ವಲ್ಪ', 'swalpa', 'a little']);
L('lj12', 'ಪ್ರ', 'pra', 'प्र', ['ಪ್ರಶ್ನೆ', 'prashne', 'question'], 'ರ below a letter becomes a small hook.');
L('lj13', 'ಷ್ಟ', 'shTa', 'ष्ट', ['ಎಷ್ಟು', 'eshTu', 'how much']);
L('lj14', 'ರ್ತ', 'rta', 'र्त', ['ಬರ್ತೀನಿ', 'barteeni', "I'll come"], 'ರ before a consonant keeps its place in modern print.');

/* ---------- Read the boards ---------- */
W('wb1', 'ಬ್ಯಾಂಕ್', 'bank', 'bank');
W('wb2', 'ಹೋಟೆಲ್', 'hotel', 'hotel');
W('wb3', 'ಬಸ್', 'bus', 'bus');
W('wb4', 'ಟಿಕೆಟ್', 'ticket', 'ticket');
W('wb5', 'ಪೊಲೀಸ್', 'police', 'police');
W('wb6', 'ಆಫೀಸ್', 'office', 'office');
W('wb7', 'ಮೆಡಿಕಲ್', 'medical', 'medical (pharmacy)');
W('wb8', 'ಪಾರ್ಕಿಂಗ್', 'parking', 'parking');
W('wb9', 'ಪ್ರವೇಶ', 'pravEsha', 'entrance', 'Hindi pravesh.');
W('wb10', 'ನಿರ್ಗಮನ', 'nirgamana', 'exit', 'Hindi nirgam.');
W('wb11', 'ತಳ್ಳಿ', 'taLLi', 'push');
W('wb12', 'ಎಳೆಯಿರಿ', 'eLeyiri', 'pull');
W('wb13', 'ತೆರೆದಿದೆ', 'teredide', 'open');
W('wb14', 'ಮುಚ್ಚಿದೆ', 'muchchide', 'closed');
W('wb15', 'ಇಂದಿರಾನಗರ', 'indiraanagara', 'Indiranagar');
W('wb16', 'ಕೋರಮಂಗಲ', 'kOramangala', 'Koramangala');
W('wb17', 'ಜಯನಗರ', 'jayanagara', 'Jayanagar');
W('wb18', 'ಮಹಿಳೆಯರು', 'mahiLeyaru', 'women', 'Hindi mahilaa.');

const ids = (p, n) => Array.from({ length: n }, (_, i) => p + (i + 1));
STATIONS.push(
  { id: 'rd1', line: 5, name: 'ಅ ಆ ಇ ಈ', en: 'Vowels', blurb: 'Twelve vowels. Ten have Devanagari twins', kind: 'script', cards: ids('lv', 12) },
  { id: 'rd2', line: 5, name: 'ಕ ಖ ಗ · ಚ ಜ', en: 'ka and cha rows', blurb: 'Same order as the Hindi varnamala', kind: 'script', cards: ids('lc', 8) },
  { id: 'rd3', line: 5, name: 'ಟ ಡ ಣ · ತ ದ ನ', en: 'Ta and ta rows', blurb: 'Curled tongue first, then teeth', kind: 'script', cards: ids('lt', 10) },
  { id: 'rd4', line: 5, name: 'ಪ ಬ ಮ · ಯ ರ ಲ ವ', en: 'pa row and ya ra la va', blurb: 'Nine everyday letters', kind: 'script', cards: ids('lp', 9) },
  { id: 'rd5', line: 5, name: 'ಶ ಸ ಹ ಳ', en: 'sha sa ha La', blurb: 'The last letters, plus the little circle', kind: 'script', cards: ids('ls', 8) },
  { id: 'rd6', line: 5, name: 'ಕಾ ಕಿ ಕೀ', en: 'Vowel Signs', blurb: 'How a letter changes its vowel', kind: 'script', cards: ids('lm', 13) },
  { id: 'rd7', line: 5, name: 'ಒತ್ತಕ್ಷರ', en: 'Stacked Letters', blurb: 'Two consonants in one block', kind: 'script', cards: ids('lj', 14) },
  { id: 'rd8', line: 5, name: 'ಬೋರ್ಡ್ ಓದಿ', en: 'Read the Boards', blurb: 'Real signs, no Roman help', kind: 'script', cards: ids('wb', 18) }
);
