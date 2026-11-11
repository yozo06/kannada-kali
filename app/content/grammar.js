// Line C: Build sentences. Spoken Bengaluru Kannada grammar, taught through
// whole usable forms rather than tables.
import { add, STATIONS } from './_build.js';

/* ---------- Me and You : pronouns ---------- */
add('pn1', 'ನಾನು', 'naanu', 'I', 'Hindi main, Marathi mee. One word, any gender.');
add('pn2', 'ನೀನು', 'neenu', 'you (casual)', 'For friends, children and people younger than you. Like Hindi tum / Marathi tu.');
add('pn3', 'ನೀವು', 'neevu', 'you (polite)', 'For elders, strangers and more than one person. Like Hindi aap.');
add('pn4', 'ಅವನು', 'avanu', 'he', 'a- points far, i- points near: avanu = that man, ivanu = this man.');
add('pn5', 'ಅವಳು', 'avaLu', 'she', '');
add('pn6', 'ಅವರು', 'avaru', 'they / he or she (respectful)', 'Use avaru for any adult you respect, one person or many. Like Hindi ve.');
add('pn7', 'ನಾವು', 'naavu', 'we', '');
add('pn8', 'ಇದು', 'idu', 'this (thing)', '');
add('pn9', 'ಅದು', 'adu', 'that (thing) / it', '');
add('pn10', 'ನನ್ನ', 'nanna', 'my', '');
add('pn11', 'ನಿಮ್ಮ', 'nimma', 'your (polite)', 'Casual "your" is ninna.');
add('pn12', 'ನನಗೆ', 'nanage', 'to me / for me', 'Kannada says "to me, coffee is wanted": nanage kaapi bEku. Same shape as Hindi mujhe chaahiye.');
add('pn13', 'ನಿಮಗೆ', 'nimage', 'to you (polite)', '"nimage Enu bEku?" = what do you want?');
add('pn14', 'ಅವರ ಹೆಸರು ಏನು?', 'avara hesaru Enu?', 'What is his / her name? (respectful)', 'avaru + a = avara, "their / his / her".');

/* ---------- Question Words ---------- */
add('qw1', 'ಯಾರು?', 'yaaru?', 'Who?', 'Not Hindi yaar. yaaru always means who.');
add('qw2', 'ಯಾವಾಗ?', 'yaavaaga?', 'When?', '');
add('qw3', 'ಯಾಕೆ?', 'yaake?', 'Why?', '');
add('qw4', 'ಹೇಗೆ?', 'hEge?', 'How?', 'You already use it inside hEgiddeeraa (how are you).');
add('qw5', 'ಯಾವುದು?', 'yaavudu?', 'Which one?', 'yaava = which (before a noun). yaavudu = which one.');
add('qw6', 'ಎಲ್ಲಿಗೆ?', 'ellige?', 'Where to?', 'elli (where) + -ge (to).');
add('qw7', 'ಎಲ್ಲಿಂದ?', 'ellinda?', 'From where?', 'elli (where) + -inda (from).');
add('qw8', 'ಯಾರದು?', 'yaaradu?', 'Whose is it?', '');
add('qw9', 'ಇದು ಏನು?', 'idu Enu?', 'What is this?', 'No "is" needed. Kannada drops it, like Marathi often does.');
add('qw10', 'ಅವರು ಯಾರು?', 'avaru yaaru?', 'Who is that (person)?', '');
add('qw11', 'ಯಾವಾಗ ಬರ್ತೀರಾ?', 'yaavaaga barteeraa?', 'When will you come?', '');
add('qw12', 'ಯಾಕೆ ಲೇಟ್ ಆಯ್ತು?', 'yaake late aaytu?', 'Why did it get late?', 'English "late" is everyday Kannada.');
add('qw13', 'ನೀವು ಎಲ್ಲಿಂದ ಬಂದ್ರಿ?', 'neevu ellinda bandri?', 'Where did you come from?', 'Also how people ask where you are from.');

/* ---------- I Do, I Will : present and future ---------- */
add('vb1', 'ಹೋಗ್ತೀನಿ', 'hOgteeni', "I go / I'll go", 'Spoken Kannada uses one form for "I do" and "I will". The ending -teeni means I.');
add('vb2', 'ಮಾಡ್ತೀನಿ', 'maaDteeni', "I do / I'll do", 'maaDu = do, make. The most useful verb you will learn.');
add('vb3', 'ತಿಂತೀನಿ', 'tinteeni', "I eat / I'll eat", '');
add('vb4', 'ಕುಡೀತೀನಿ', 'kuDeeteeni', "I drink / I'll drink", '');
add('vb5', 'ನೋಡ್ತೀನಿ', 'nODteeni', "I'll see / I'll check", 'A polite way to avoid promising: "nODteeni" = let me see.');
add('vb6', 'ಕೊಡ್ತೀನಿ', 'koDteeni', "I'll give", '');
add('vb7', 'ಹೇಳ್ತೀನಿ', 'hELteeni', "I'll tell / I'll say", '');
add('vb8', 'ಕೇಳ್ತೀನಿ', 'kELteeni', "I'll ask / I'll listen", 'kELu means both ask and hear.');
add('vb9', 'ತಗೊಳ್ತೀನಿ', 'tagoLteeni', "I'll take", '');
add('vb10', 'ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ತೀನಿ', 'naanu office-ge hOgteeni', 'I go to the office', 'Subject, place + ge, verb last.');
add('vb11', 'ನೀವು ಬರ್ತೀರಾ?', 'neevu barteeraa?', 'Will you come?', '-teera is the polite-you ending. Add -aa for a yes/no question.');
add('vb12', 'ಅವರು ಬರ್ತಾರೆ', 'avaru bartaare', 'He / she (respectful) will come · they will come', '-taare goes with avaru.');
add('vb13', 'ನಾವು ಹೋಗ್ತೀವಿ', 'naavu hOgteevi', "We go / we'll go", '-teevi goes with naavu.');
add('vb14', 'ಅವನು ಬರ್ತಾನೆ', 'avanu bartaane', 'He will come', 'For "she": avaLu bartaaLe.');

/* ---------- I Did : past ---------- */
add('ps1', 'ಹೋದೆ', 'hOde', 'I went', 'The past ends in -de for "I".');
add('ps2', 'ಬಂದೆ', 'bande', 'I came', '');
add('ps3', 'ಮಾಡ್ದೆ', 'maaDde', 'I did', '');
add('ps4', 'ತಿಂದೆ', 'tinde', 'I ate', '');
add('ps5', 'ಕುಡಿದೆ', 'kuDide', 'I drank', '');
add('ps6', 'ನೋಡ್ದೆ', 'nODde', 'I saw', '');
add('ps7', 'ಕೊಟ್ಟೆ', 'koTTe', 'I gave', 'Irregular: koDu becomes koTTe.');
add('ps8', 'ಹೇಳ್ದೆ', 'hELde', 'I said / I told', '');
add('ps9', 'ಊಟ ಮಾಡ್ದೆ', 'ooTa maaDde', 'I had my meal', 'Literally "I did meal". Noun + maaDu builds hundreds of verbs.');
add('ps10', 'ನಿನ್ನೆ ಬಂದೆ', 'ninne bande', 'I came yesterday', '');
add('ps11', 'ಅವರು ಹೋದ್ರು', 'avaru hOdru', 'He / she (respectful) went · they went', 'Past for avaru ends in -ru.');
add('ps12', 'ನೀವು ನೋಡಿದ್ರಾ?', 'neevu nODidraa?', 'Did you see?', 'Past for neevu ends in -ri: nODidri. nODidri + aa = nODidraa.');
add('ps13', 'ಆಯ್ತಾ?', 'aaytaa?', 'Is it done? / Finished?', 'aaytu (it is done) + -aa.');

/* ---------- Want, Can, Must ---------- */
add('md1', 'ಬೇಕು', 'bEku', 'want / need', 'The opposite is bEDa.');
add('md2', 'ನನಗೆ ನೀರು ಬೇಕು', 'nanage neeru bEku', 'I want water', '');
add('md3', 'ಹೋಗಬೇಕು', 'hOgabEku', 'I have to go', 'Verb + bEku = must. Like Hindi jaana hai.');
add('md4', 'ಹೋಗಬಹುದು', 'hOgabahudu', 'You can go / may go', 'Verb + bahudu = can, is allowed.');
add('md5', 'ಬರಬಹುದಾ?', 'barabahudaa?', 'May I come in?', '');
add('md6', 'ಹೋಗಬೇಡಿ', 'hOgabEDi', "Please don't go", 'Verb + bEDi = please do not.');
add('md7', 'ಹೋಗಲ್ಲ', 'hOgalla', "I won't go / doesn't go", 'Verb + alla = will not. One form for everyone.');
add('md8', 'ಬರಲ್ಲ', 'baralla', "won't come", 'You also hear barOlla. Same meaning.');
add('md9', 'ಮಾಡಲ್ಲ', 'maaDalla', "won't do", '');
add('md10', 'ಆಗಲ್ಲ', 'aagalla', "It can't be done / not possible", 'The polite refusal you will hear and use.');
add('md11', 'ನನಗೆ ಬರಲ್ಲ', 'nanage baralla', "I don't know how to", 'Literally "it does not come to me". Like Hindi mujhe nahin aata.');
add('md12', 'ನನಗೆ ಇಷ್ಟ', 'nanage ishTa', 'I like it', '');
add('md13', 'ನನಗೆ ಇಷ್ಟ ಇಲ್ಲ', 'nanage ishTa illa', "I don't like it", '');
add('md14', 'ಬೇಕಾ?', 'bEkaa?', 'Do you want it?', '');

/* ---------- To, In, From : case endings ---------- */
add('cs1', 'ಮನೆಗೆ', 'manege', 'to home', '-ge = to. Hindi ghar ko.');
add('cs2', 'ಮನೆಯಲ್ಲಿ', 'maneyalli', 'at home / in the house', '-alli = in, at. Hindi ghar mein.');
add('cs3', 'ಮನೆಯಿಂದ', 'maneyinda', 'from home', '-inda = from. Hindi ghar se.');
add('cs4', 'ಬೆಂಗಳೂರಿನಲ್ಲಿ', 'bengaLoorinalli', 'in Bengaluru', 'Words ending in -u add -inalli.');
add('cs5', 'ಬೆಂಗಳೂರಿಗೆ', 'bengaLoorige', 'to Bengaluru', '');
add('cs6', 'ನನ್ನ ಜೊತೆ', 'nanna jote', 'with me', 'jote = along with. Hindi mere saath.');
add('cs7', 'ಮೇಲೆ', 'mEle', 'on / above / upstairs', 'Not Hindi mela.');
add('cs8', 'ಕೆಳಗೆ', 'keLage', 'below / downstairs', '');
add('cs9', 'ಒಳಗೆ', 'oLage', 'inside', '');
add('cs10', 'ಹೊರಗೆ', 'horage', 'outside', '');
add('cs11', 'ಪಕ್ಕದಲ್ಲಿ', 'pakkadalli', 'next to / beside', 'pakka = side. "pakkada mane" = the house next door.');
add('cs12', 'ನಾನು ಮನೆಯಲ್ಲಿ ಇದ್ದೀನಿ', 'naanu maneyalli iddeeni', 'I am at home', 'iddeeni = I am (in a place).');
add('cs13', 'ಆಫೀಸ್‌ನಿಂದ ಬರ್ತಾ ಇದ್ದೀನಿ', 'office-ninda bartaa iddeeni', "I'm coming from the office", 'Verb + taa iddeeni = am doing right now.');
add('cs14', 'ಅಂಗಡಿ ಹತ್ತಿರ', 'angaDi hattira', 'near the shop', '');

/* ---------- Big and Small : describing ---------- */
add('aj1', 'ದೊಡ್ಡ', 'doDDa', 'big', '');
add('aj2', 'ಚಿಕ್ಕ', 'chikka', 'small', 'You know it from Chikkamagaluru and Chikpet.');
add('aj3', 'ಒಳ್ಳೆ', 'oLLe', 'good (kind, decent)', '"oLLe huDuga" = a good boy.');
add('aj4', 'ಕೆಟ್ಟ', 'keTTa', 'bad', '');
add('aj5', 'ಹೊಸ', 'hosa', 'new', 'Hosa Road, Hosakote: new road, new fort.');
add('aj6', 'ಹಳೆ', 'haLe', 'old (things)', '');
add('aj7', 'ಬಿಸಿ', 'bisi', 'hot', 'Bisi bele bath = hot lentil rice.');
add('aj8', 'ತಣ್ಣಗೆ', 'taNNage', 'cold (to touch or drink)', '');
add('aj9', 'ಜಾಸ್ತಿ', 'jaasti', 'more / too much', '', 'जास्त');
add('aj10', 'ಕಮ್ಮಿ', 'kammi', 'less', '', 'कमी');
add('aj11', 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ', 'tumbaa chennaagide', "It's very good", 'tumbaa = very, a lot.');
add('aj12', 'ಬಿಸಿ ನೀರು', 'bisi neeru', 'hot water', 'Describing word first, like Hindi and Marathi.');
add('aj13', 'ದೊಡ್ಡ ಮನೆ', 'doDDa mane', 'a big house', '');
add('aj14', 'ಸ್ವಲ್ಪ', 'swalpa', 'a little', '');

/* ---------- And, But, Because ---------- */
add('cn1', 'ಮತ್ತು', 'mattu', 'and', 'Mostly written. In speech people just list things: "idli, dOse koDi".');
add('cn2', 'ಆದ್ರೆ', 'aadre', 'but', '');
add('cn3', 'ಅಥವಾ', 'athavaa', 'or', 'A little bookish. In speech, add -aa to both choices instead.', 'अथवा');
add('cn4', 'ಯಾಕಂದ್ರೆ', 'yaakandre', 'because', 'yaake (why) + andre (if you say). "Why, you ask?"');
add('cn5', 'ಆಮೇಲೆ', 'aamEle', 'afterwards / later', '');
add('cn6', 'ಮೊದಲು', 'modalu', 'first / before', '');
add('cn7', 'ಕೂಡ', 'kooDa', 'also / too', 'Comes after the word: "naanu kooDa" = me too.');
add('cn8', 'ಮಾತ್ರ', 'maatra', 'only', '', 'मात्र');
add('cn9', 'ಇನ್ನೂ', 'innoo', 'still / yet / more', '');
add('cn10', 'ಹೌದಾ?', 'haudaa?', 'Oh, is that so? / Really?', 'The listening noise of Kannada. Use it freely.');
add('cn11', 'ಅಲ್ವಾ?', 'alvaa?', "Isn't it? / Right?", 'The Bengaluru tag question. Like Hindi hai na?');
add('cn12', 'ಅಷ್ಟೇ', 'ashTE', "That's all / just that", '');
add('cn13', 'ಕಾಫಿನಾ ಟೀನಾ?', 'kaapi-naa tea-naa?', 'Coffee or tea?', 'The spoken "or": hang -aa on both choices.');
add('cn14', 'ಆಮೇಲೆ ಮಾತಾಡ್ತೀನಿ', 'aamEle maataaDteeni', "I'll talk later", '');

const ids = (p, n) => Array.from({ length: n }, (_, i) => p + (i + 1));
STATIONS.push(
  { id: 'pron', line: 3, name: 'ನಾನು ನೀನು', en: 'Me and You', blurb: 'I, you, he, she, we, my, your', kind: 'std', cards: ids('pn', 14) },
  { id: 'qwords', line: 3, name: 'ಪ್ರಶ್ನೆಗಳು', en: 'Question Words', blurb: 'Who, when, why, how, which', kind: 'std', cards: ids('qw', 13) },
  { id: 'verbs', line: 3, name: 'ಮಾಡ್ತೀನಿ', en: 'I Do, I Will', blurb: 'Ten verbs in the form you will actually say', kind: 'std', cards: ids('vb', 14) },
  { id: 'past', line: 3, name: 'ಮಾಡ್ದೆ', en: 'I Did', blurb: 'Went, came, ate, saw, gave', kind: 'std', cards: ids('ps', 13) },
  { id: 'modal', line: 3, name: 'ಬೇಕು ಬೇಡ', en: 'Want, Can, Must', blurb: "Need, may, must, won't, can't", kind: 'std', cards: ids('md', 14) },
  { id: 'cases', line: 3, name: 'ಗೆ · ಅಲ್ಲಿ · ಇಂದ', en: 'To, In, From', blurb: 'The endings that replace ko, mein, se', kind: 'std', cards: ids('cs', 14) },
  { id: 'adj', line: 3, name: 'ದೊಡ್ಡ ಚಿಕ್ಕ', en: 'Big and Small', blurb: 'Good, bad, new, old, hot, cold', kind: 'std', cards: ids('aj', 14) },
  { id: 'conn', line: 3, name: 'ಮತ್ತು ಆದ್ರೆ', en: 'And, But, Because', blurb: 'The glue words of real conversation', kind: 'std', cards: ids('cn', 14) }
);
