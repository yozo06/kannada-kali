// Sentence Forge: a frame plus a noun. {n} = noun with article, {b} = bare noun.
export const NOUNS = {
  kaapi: ['ಕಾಫಿ', 'kaapi', 'coffee'], tea: ['ಟೀ', 'tea', 'tea'], neeru: ['ನೀರು', 'neeru', 'water'], haalu: ['ಹಾಲು', 'haalu', 'milk'],
  ticket: ['ಟಿಕೆಟ್', 'ticket', 'a ticket'], bill: ['ಬಿಲ್', 'bill', 'the bill'], idli: ['ಇಡ್ಲಿ', 'iDli', 'idli'], dose: ['ದೋಸೆ', 'dOse', 'dosa'],
  chillare: ['ಚಿಲ್ಲರೆ', 'chillare', 'change'], help: ['ಸಹಾಯ', 'sahaaya', 'help'], parking: ['ಪಾರ್ಕಿಂಗ್', 'parking', 'parking'],
  toilet: ['ಟಾಯ್ಲೆಟ್', 'toilet', 'the toilet'], busstop: ['ಬಸ್ ಸ್ಟಾಪ್', 'bus stop', 'the bus stop'], metro: ['ಮೆಟ್ರೋ ಸ್ಟೇಷನ್', 'metro station', 'the metro station'],
  atm: ['ಎಟಿಎಂ', 'ATM', 'the ATM'], medical: ['ಮೆಡಿಕಲ್ ಸ್ಟೋರ್', 'medical store', 'the pharmacy'], tomato: ['ಟೊಮೆಟೊ', 'tomato', 'tomato'], sakkare: ['ಸಕ್ಕರೆ', 'sakkare', 'sugar'],
  oota: ['ಊಟ', 'ooTa', 'a meal'], mosaru: ['ಮೊಸರು', 'mosaru', 'curd'], aushadhi: ['ಔಷಧಿ', 'aushadhi', 'medicine'], chhatri: ['ಛತ್ರಿ', 'chhatri', 'an umbrella'],
  batte: ['ಬಟ್ಟೆ', 'baTTe', 'clothes'], key: ['ಕೀ', 'key', 'the key'], angadi: ['ಅಂಗಡಿ', 'angaDi', 'the shop'], aaspatre: ['ಆಸ್ಪತ್ರೆ', 'aaspatre', 'the hospital'],
  bisineeru: ['ಬಿಸಿ ನೀರು', 'bisi neeru', 'hot water'], duddu: ['ದುಡ್ಡು', 'duDDu', 'money']
};
export const FRAMES = [
  { id: 'kodi', tail: ['ಕೊಡಿ', 'koDi'], en: 'Please give me {n}', hint: 'Ask for anything', pool: ['kaapi', 'tea', 'neeru', 'haalu', 'ticket', 'bill', 'idli', 'dose', 'chillare', 'key', 'bisineeru'] },
  { id: 'beku', tail: ['ಬೇಕು', 'bEku'], en: 'I want {n}', hint: 'Say what you need', pool: ['kaapi', 'tea', 'neeru', 'haalu', 'ticket', 'idli', 'dose', 'help', 'chillare', 'aushadhi', 'oota'] },
  { id: 'beda', tail: ['ಬೇಡ', 'bEDa'], en: "I don't want {n}", hint: 'Politely refuse', pool: ['kaapi', 'tea', 'sakkare', 'haalu', 'ticket', 'idli', 'dose', 'chillare', 'mosaru'] },
  { id: 'ellide', tail: ['ಎಲ್ಲಿದೆ?', 'ellide?'], en: 'Where is {n}?', hint: 'Find a place or thing', pool: ['toilet', 'busstop', 'metro', 'atm', 'medical', 'parking', 'key', 'angadi', 'aaspatre'] },
  { id: 'eshtu', tail: ['ಎಷ್ಟು?', 'eshTu?'], en: 'How much is {n}?', hint: 'Ask a price', pool: ['kaapi', 'tea', 'idli', 'dose', 'ticket', 'tomato', 'parking', 'chhatri'] },
  { id: 'illa', tail: ['ಇಲ್ಲ', 'illa'], en: 'There is no {b}', hint: 'No, none, not available', pool: ['chillare', 'kaapi', 'haalu', 'neeru', 'parking', 'ticket', 'sakkare', 'duddu', 'bisineeru'] },
  { id: 'ideyaa', tail: ['ಇದೆಯಾ?', 'ideyaa?'], en: 'Do you have {b}?', hint: 'Ask if something is there', pool: ['chillare', 'haalu', 'parking', 'ticket', 'idli', 'dose', 'tea', 'kaapi', 'chhatri', 'mosaru'] },
  { id: 'ishta', tail: ['ಇಷ್ಟ', 'ishTa'], en: 'I like {b}', hint: 'Say what you like', pool: ['kaapi', 'tea', 'idli', 'dose', 'mosaru', 'oota'] },
  { id: 'sigutte', tail: ['ಎಲ್ಲಿ ಸಿಗುತ್ತೆ?', 'elli sigutte?'], en: 'Where can I get {n}?', hint: 'Find where to buy', pool: ['ticket', 'aushadhi', 'chhatri', 'batte', 'kaapi', 'oota'] },
  { id: 'saaku', tail: ['ಸಾಕು', 'saaku'], en: 'That is enough {b}', hint: 'Stop the pouring', pool: ['kaapi', 'tea', 'sakkare', 'neeru', 'mosaru', 'haalu'] }
];
/** Build one forged sentence. Pure. */
export function forge(frame, nounKey) {
  const n = NOUNS[nounKey];
  const bare = n[2].replace(/^(a|an|the) /, '');
  return { k: n[0] + ' ' + frame.tail[0], r: n[1] + ' ' + frame.tail[1], e: frame.en.replace('{n}', n[2]).replace('{b}', bare) };
}
