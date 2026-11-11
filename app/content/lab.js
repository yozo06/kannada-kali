// Lab games: look-alike traps, Devanagari twins, street boards.
/* ---------- Traps : look-alikes with different meanings ---------- */
export const TRAPS = [
  { k: 'ಯಾರು', r: 'yaaru', e: 'who', lure: 'buddy', lureW: 'यार (yaar)', why: 'Hindi/Marathi yaar means friend. Kannada yaaru means who.' },
  { k: 'ಕಣ್ಣು', r: 'kaNNu', e: 'eye', lure: 'ear', lureW: 'कान (kaan)', why: 'Hindi/Marathi kaan is the ear. Kannada kaNNu is the eye. The ear is kivi.' },
  { k: 'ಬಾಯಿ', r: 'baayi', e: 'mouth', lure: 'woman / lady', lureW: 'बाई (baai)', why: 'Hindi/Marathi baai is a woman or lady. Kannada baayi is the mouth.' },
  { k: 'ನಾಯಿ', r: 'naayi', e: 'dog', lure: 'barber', lureW: 'नाई (naai)', why: 'Hindi naai is a barber. Kannada naayi is a dog. Do not mix them up.' },
  { k: 'ಕೈ', r: 'kai', e: 'hand', lure: 'several / many', lureW: 'कई (kai)', why: 'Hindi kai means several. Kannada kai is the hand.' },
  { k: 'ಮೇಲೆ', r: 'mEle', e: 'on / above', lure: 'a fair', lureW: 'मेला (melaa)', why: 'Hindi melaa is a fair. Kannada mEle means on top, above.' },
  { k: 'ಕಾಲು', r: 'kaalu', e: 'leg / a quarter', lure: 'yesterday', lureW: 'काल (kaal)', why: 'Marathi kaal is yesterday and Hindi kaal is time. Kannada kaalu is the leg, and also a quarter.' },
  { k: 'ಮಗ', r: 'maga', e: 'son', lure: 'then / afterwards', lureW: 'मग (mag)', why: 'Marathi mag means then. Kannada maga is a son.' },
  { k: 'ಖಾರ', r: 'khaara', e: 'spicy hot', lure: 'salty', lureW: 'खारा (khaaraa)', why: 'Hindi khaaraa is salty. Kannada khaara is chilli-hot. Salt is uppu.' },
  { k: 'ಹಾಲು', r: 'haalu', e: 'milk', lure: 'condition / state', lureW: 'हाल (haal)', why: 'Hindi / Marathi haal is the state of things. Kannada haalu is milk.' },
  { k: 'ಗಾಳಿ', r: 'gaaLi', e: 'wind / air', lure: 'abuse / swear word', lureW: 'गाली (gaali)', why: 'Hindi gaali is a swear word. Kannada gaaLi is just the breeze.' },
  { k: 'ಸುಸ್ತು', r: 'sustu', e: 'tired', lure: 'lazy', lureW: 'सुस्त (sust)', why: 'Hindi sust is lazy or sluggish. Kannada sustu means tired out.' }
];

/* ---------- Script Lab : Devanagari twins ---------- */
export const TWINS = [
  { grp: 'Vowels', rows: [['अ','ಅ','a'],['आ','ಆ','aa'],['इ','ಇ','i'],['ई','ಈ','ee'],['उ','ಉ','u'],['ऊ','ಊ','oo'],['ए','ಏ','E'],['ऐ','ಐ','ai'],['ओ','ಓ','O'],['औ','ಔ','au']] },
  { grp: 'ka row', rows: [['क','ಕ','ka'],['ख','ಖ','kha'],['ग','ಗ','ga'],['घ','ಘ','gha']] },
  { grp: 'cha row', rows: [['च','ಚ','cha'],['छ','ಛ','chha'],['ज','ಜ','ja'],['झ','ಝ','jha']] },
  { grp: 'Ta row', rows: [['ट','ಟ','Ta'],['ठ','ಠ','Tha'],['ड','ಡ','Da'],['ढ','ಢ','Dha'],['ण','ಣ','Na']] },
  { grp: 'ta row', rows: [['त','ತ','ta'],['थ','ಥ','tha'],['द','ದ','da'],['ध','ಧ','dha'],['न','ನ','na']] },
  { grp: 'pa row', rows: [['प','ಪ','pa'],['फ','ಫ','pha'],['ब','ಬ','ba'],['भ','ಭ','bha'],['म','ಮ','ma']] },
  { grp: 'Others', rows: [['य','ಯ','ya'],['र','ರ','ra'],['ल','ಲ','la'],['व','ವ','va'],['श','ಶ','sha'],['ष','ಷ','sha'],['स','ಸ','sa'],['ह','ಹ','ha'],['ळ','ಳ','La']] }
];

/* ---------- Street Reader ---------- */
export const STREET = {
  loan: [ // Kannada script of English words: sound them out
    ['ಬ್ಯಾಂಕ್','bank'],['ಹೋಟೆಲ್','hotel'],['ಬೇಕರಿ','bakery'],['ಮೆಡಿಕಲ್','medical'],['ಪೆಟ್ರೋಲ್','petrol'],['ಬಸ್','bus'],['ಟಿಕೆಟ್','ticket'],['ಮೊಬೈಲ್','mobile'],['ಪಾರ್ಕಿಂಗ್','parking'],['ಟಾಯ್ಲೆಟ್','toilet'],['ಕ್ಲಿನಿಕ್','clinic'],['ಜ್ಯೂಸ್','juice'],['ಪೊಲೀಸ್','police'],['ಮಾರ್ಕೆಟ್','market'],['ಸ್ಟೇಷನ್','station'],['ಪಾರ್ಕ್','park'],['ಸ್ಕೂಲ್','school'],['ಆಫೀಸ್','office'],['ಟ್ಯಾಕ್ಸಿ','taxi'],['ಲೇಡೀಸ್','ladies'],['ಸೂಪರ್ ಮಾರ್ಕೆಟ್','supermarket'],['ಗ್ಯಾರೇಜ್','garage']
  ],
  native: [ // genuine Kannada signage words
    ['ಪ್ರವೇಶ','pravEsha','entrance'],['ನಿರ್ಗಮನ','nirgamana','exit'],['ಎಚ್ಚರಿಕೆ','echcharike','caution'],['ನಿಧಾನ','nidhaana','slow'],['ಸ್ವಾಗತ','svaagata','welcome'],['ಶೌಚಾಲಯ','shauchaalaya','toilet'],['ತಳ್ಳಿ','taLLi','push'],['ಎಳೆಯಿರಿ','eLeyiri','pull'],['ತೆರೆದಿದೆ','teredide','open'],['ಮುಚ್ಚಿದೆ','muchchide','closed'],['ಮಹಿಳೆಯರು','mahiLeyaru','women'],['ಪುರುಷರು','purusharu','men']
  ],
  place: [ // real Bengaluru names on boards
    ['ಮೆಜೆಸ್ಟಿಕ್','Majestic'],['ಇಂದಿರಾನಗರ','Indiranagar'],['ಕೋರಮಂಗಲ','Koramangala'],['ಜಯನಗರ','Jayanagar'],['ವೈಟ್‌ಫೀಲ್ಡ್','Whitefield'],['ಮಲ್ಲೇಶ್ವರಂ','Malleshwaram'],['ಬಸವನಗುಡಿ','Basavanagudi'],['ಹೆಬ್ಬಾಳ','Hebbal'],['ಯಶವಂತಪುರ','Yeshwanthpur'],['ಮಾರತ್ತಹಳ್ಳಿ','Marathahalli'],['ಬನಶಂಕರಿ','Banashankari'],['ಶಿವಾಜಿನಗರ','Shivajinagar'],['ಲಾಲ್‌ಬಾಗ್','Lalbagh'],['ಕಬ್ಬನ್ ಪಾರ್ಕ್','Cubbon Park'],['ಹಲಸೂರು','Halasuru'],['ಬೈಯಪ್ಪನಹಳ್ಳಿ','Baiyappanahalli'],['ಸಿಲ್ಕ್ ಬೋರ್ಡ್','Silk Board'],['ಕೆಂಗೇರಿ','Kengeri'],['ನಾಗಸಂದ್ರ','Nagasandra'],['ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ','Electronic City']
  ]
};

