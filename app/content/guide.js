// Grammar cheat sheet and real-world missions.
/* ---------- Cheat sheet for Hindi / Marathi speakers ---------- */
export const RULES = [
  { h: 'Verb last, like Hindi and Marathi', k: 'ನಾನು ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗ್ತೀನಿ', r: 'naanu Majestic-ge hOgteeni', e: 'I (to Majestic) go', t: 'Word order is the same SOV shape you already use.' },
  { h: 'Postpositions become endings', k: 'ಮನೆಗೆ · ಮನೆಯಲ್ಲಿ · ಮನೆಯಿಂದ', r: 'manege · maneyalli · maneyinda', e: 'to home · at home · from home', t: '-ge = to (ko). -alli = in / at (mein). -inda = from / by (se).' },
  { h: 'Questions end with -aa', k: 'ಇದು ಚೆನ್ನಾಗಿದೆಯಾ?', r: 'idu chennaagideyaa?', e: 'Is this good?', t: 'Hindi puts kya first. Kannada hangs -aa on the end of the verb.' },
  { h: 'No gender on "I" verbs', k: 'ನಾನು ಹೋಗ್ತೀನಿ', r: 'naanu hOgteeni', e: 'I go (man or woman)', t: 'No jaata / jaati split. One form for every speaker.' },
  { h: 'Keep the final vowel', k: 'ಕನ್ನಡ', r: 'kannaDa', e: 'Kannada, not "kannad"', t: 'Hindi drops the schwa. Kannada says every final -a and -u.' },
  { h: 'Retroflex sounds you already have', k: 'ಟ ಡ ಣ ಳ', r: 'Ta Da Na La', e: 'ट ड ण ळ', t: 'Same tongue position as Hindi and Marathi. ಳ is exactly the Marathi ळ.' },
  { h: 'One ending per person', k: 'ಹೋಗ್ತೀನಿ · ಹೋಗ್ತೀರ · ಹೋಗ್ತಾರೆ · ಹೋಗ್ತೀವಿ', r: 'hOgteeni · hOgteera · hOgtaare · hOgteevi', e: 'I go · you go · they go · we go', t: 'The ending carries the person, so the pronoun is often dropped. No gender anywhere except he (-taane) and she (-taaLe).' },
  { h: 'Past tense: -de for I', k: 'ಹೋದೆ · ಬಂದೆ · ಮಾಡ್ದೆ', r: 'hOde · bande · maaDde', e: 'I went · I came · I did', t: 'For neevu it ends in -ri (hOdri), for avaru in -ru (hOdru).' },
  { h: 'Negatives hang on the end', k: 'ಹೋಗಲ್ಲ · ಗೊತ್ತಿಲ್ಲ · ಬೇಡ', r: 'hOgalla · gottilla · bEDa', e: "won't go · don't know · don't want", t: 'Hindi puts nahin before the verb. Kannada glues -alla or -illa after it.' },
  { h: 'English noun + maaDi', k: 'ಕಾಲ್ ಮಾಡಿ · ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ', r: 'call maaDi · adjust maaDi', e: 'please call · please adjust', t: 'When you lack a verb, borrow the English word and add maaDu. Everyone does it.' },
  { h: 'Polite or casual you', k: 'ನೀವು · ನೀನು', r: 'neevu · neenu', e: 'you (polite) · you (casual)', t: 'Use neevu with strangers and elders. Use neenu with friends and younger people.' }
];

/* ---------- Field missions (real-world quests) ---------- */
export const MISSIONS = [
  { t: 'Greet the guard, shopkeeper or neighbour first.', k: 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?', r: 'namaskaara, hEgiddeeraa?' },
  { t: 'Tell one stranger you know a little Kannada.', k: 'ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು', r: 'nanage swalpa kannaDa gottu' },
  { t: 'Point at three things and ask their Kannada name.', k: 'ಇದಕ್ಕೆ ಕನ್ನಡದಲ್ಲಿ ಏನಂತಾರೆ?', r: 'idakke kannaDadalli Enantaare?' },
  { t: 'Order your coffee or tea in Kannada.', k: 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', r: 'ondu kaapi koDi' },
  { t: 'In an auto or cab, ask about the meter before you get in.', k: 'ಮೀಟರ್ ಹಾಕ್ತೀರಾ?', r: 'meter haakteeraa?' },
  { t: 'Tell the driver where to stop.', k: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ', r: 'illi nillisi' },
  { t: 'Ask a price and listen for the number.', k: 'ಎಷ್ಟು?', r: 'eshTu?' },
  { t: 'Count something out loud, one to ten.', k: 'ಒಂದು, ಎರಡು, ಮೂರು...', r: 'ondu, eraDu, mooru...' },
  { t: 'Read one Kannada board on your commute. Sound it out.', k: 'ಮುಂದಿನ ನಿಲ್ದಾಣ', r: 'mundina nildaaNa' },
  { t: 'Thank someone using the full word.', k: 'ಧನ್ಯವಾದಗಳು', r: 'dhanyavaadagaLu' },
  { t: 'Missed what someone said? Ask them to say it again.', k: 'ಗೊತ್ತಾಗಲಿಲ್ಲ, ಮತ್ತೆ ಹೇಳಿ', r: 'gottaagalilla, matte hELi' },
  { t: 'Ask a colleague or neighbour if they have eaten.', k: 'ಊಟ ಆಯ್ತಾ?', r: 'ooTa aaytaa?' },
  { t: 'Ask where the toilet is, in Kannada.', k: 'ಟಾಯ್ಲೆಟ್ ಎಲ್ಲಿದೆ?', r: 'toilet ellide?' },
  { t: 'Bargain once, gently.', k: 'ಸ್ವಲ್ಪ ಕಮ್ಮಿ ಮಾಡಿ', r: 'swalpa kammi maaDi' },
  { t: 'Take one delivery call in Kannada.', k: 'ಕೆಳಗೆ ಬರ್ತೀನಿ', r: 'keLage barteeni' },
  { t: 'Ask a colleague to lunch.', k: 'ಊಟಕ್ಕೆ ಹೋಗೋಣ್ವಾ?', r: 'ooTakke hOgONvaa?' },
  { t: 'Ask someone which their home town is.', k: 'ನಿಮ್ಮ ಊರು ಯಾವುದು?', r: 'nimma ooru yaavudu?' },
  { t: 'Compliment the food somewhere today.', k: 'ತುಂಬಾ ರುಚಿಯಾಗಿದೆ', r: 'tumbaa ruchiyaagide' },
  { t: 'Use the Bengaluru tag question once.', k: 'ಟ್ರಾಫಿಕ್ ಜಾಸ್ತಿ ಇದೆ, ಅಲ್ವಾ?', r: 'traffic jaasti ide, alvaa?' },
  { t: 'Say goodbye the friendly way.', k: 'ಮತ್ತೆ ಸಿಗೋಣ', r: 'matte sigONa' },
  { t: 'Read every board at one junction without Roman help.', k: 'ಪ್ರವೇಶ · ನಿರ್ಗಮನ', r: 'pravEsha · nirgamana' },
  { t: 'Ask a shop if they have another colour or size.', k: 'ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?', r: 'bEre baNNa ideyaa?' }
];
export const RAJYOTSAVA_MISSION = { t: 'Kannada Rajyotsava season. Wish someone the greeting.', k: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು', r: 'kannaDa raajyOtsavada shubhaashayagaLu' };

