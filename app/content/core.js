// Lines A and B: survival phrases and settling in. The original 168 cards.
// Roman scheme: aa ee oo long · E O long · T D N L retroflex. See docs/content-guide.md.
import { add, O, STATIONS, DIALOGS } from './_build.js';

/* ---------- Namaskaara : greetings ---------- */
add('nm1', 'ನಮಸ್ಕಾರ', 'namaskaara', 'Hello', 'Same Sanskrit root as Hindi/Marathi namaskaar. Works at any hour.', 'नमस्कार');
add('nm2', 'ಹೇಗಿದ್ದೀರಾ?', 'hEgiddeeraa?', 'How are you? (polite)', 'hEge (how) + iddeeraa (are you). Use it for anyone older or unfamiliar.');
add('nm3', 'ಚೆನ್ನಾಗಿದ್ದೀನಿ', 'chennaagiddeeni', "I'm fine", 'chennaagi = well, nicely. You will use this one daily.');
add('nm4', 'ನೀವು?', 'neevu?', 'And you? (polite)', 'neevu for elders and strangers. neenu for close friends and younger people (like Hindi aap / tum).');
add('nm5', 'ಧನ್ಯವಾದಗಳು', 'dhanyavaadagaLu', 'Thank you', 'Hindi/Marathi dhanyavaad + gaLu (plural, polite). Plenty of people also say plain "thank you".', 'धन्यवाद');
add('nm6', 'ಕ್ಷಮಿಸಿ', 'kshamisi', 'Sorry / excuse me', 'From kshama, the same word as in Hindi and Marathi.', 'क्षमा');
add('nm7', 'ಹೌದು', 'haudu', 'Yes', '');
add('nm8', 'ಇಲ್ಲ', 'illa', 'No / not there / do not have', 'Your most useful word. "chillare illa" = no change. "gottilla" = do not know.');
add('nm9', 'ಬರ್ತೀನಿ', 'barteeni', "See you / bye ('I'll come')", "Kannada has no true 'bye'. People say 'I will come (back)'. A driver saying it to you means 'yes, I'll come'.");
add('nm10', 'ಶುಭೋದಯ', 'shubhOdaya', 'Good morning', 'shubha (auspicious) + udaya (rising). Hindi: shubh prabhaat.');
add('nm11', 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?', 'namaskaara, hEgiddeeraa?', 'Hello, how are you?', 'The standard opening. Smile, then wait for the reply.');

/* ---------- Lifelines : rescue phrases ---------- */
add('lf1', 'ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು', 'nanage swalpa kannaDa gottu', 'I know a little Kannada', 'Say this first. People slow down and smile. gottu = know. swalpa = a little.');
add('lf2', 'ಗೊತ್ತಾಗಲಿಲ್ಲ', 'gottaagalilla', "I didn't understand", 'Your emergency brake. Say it without shame, then add "matte hELi".');
add('lf3', 'ಮತ್ತೆ ಹೇಳಿ', 'matte hELi', 'Say it again, please', 'matte = again. hELi = say (polite). Note the ಳ (L) as in Marathi ळ.');
add('lf4', 'ಮೆಲ್ಲಗೆ ಮಾತಾಡಿ', 'mellage maataaDi', 'Please speak slowly', 'maataaDu = speak. The -i ending makes a request polite.');
add('lf5', 'ಇದಕ್ಕೆ ಕನ್ನಡದಲ್ಲಿ ಏನಂತಾರೆ?', 'idakke kannaDadalli Enantaare?', 'What is this called in Kannada?', 'The best learning question. Point at anything and ask. Ten times a day.');
add('lf6', 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', 'nimma hesaru Enu?', "What's your name?", 'nimma = your (polite). Enu = what.');
add('lf7', 'ನನ್ನ ಹೆಸರು ರಾಜು', 'nanna hesaru raaju', 'My name is Raju', 'Swap in your own name. nanna = my.');
add('lf8', 'ಪರವಾಗಿಲ್ಲ', 'paravaagilla', 'No problem / never mind', 'Said after a bump, a mistake or a thank-you. Like Hindi koi baat nahin.');
add('lf9', 'ಏನು?', 'Enu?', 'What? / Pardon?', 'Rising tone, one word. Totally normal in conversation.');
add('lf10', 'ಅರ್ಥ ಆಯ್ತು', 'artha aaytu', 'I understood / got it', 'artha (meaning) is the same word as Hindi/Marathi.', 'अर्थ');
add('lf11', 'ಗೊತ್ತಿಲ್ಲ', 'gottilla', "I don't know", '');

/* ---------- Free Words I : cognates ---------- */
add('fr1', 'ಸಮಯ', 'samaya', 'time', '', 'समय');
add('fr2', 'ದಿನ', 'dina', 'day', '', 'दिन');
add('fr3', 'ವರ್ಷ', 'varsha', 'year', '', 'वर्ष');
add('fr4', 'ಭಾಷೆ', 'bhaashe', 'language', 'Kannada ends it with -e where Hindi ends with -aa.', 'भाषा');
add('fr5', 'ಸಮಸ್ಯೆ', 'samasye', 'problem', '"Enu samasye?" = what is the problem?', 'समस्या');
add('fr6', 'ಕಾರಣ', 'kaaraNa', 'reason', '', 'कारण');
add('fr7', 'ಕಷ್ಟ', 'kashTa', 'difficulty / hard', 'Used exactly like Hindi/Marathi. "tumbaa kashTa" = very hard.', 'कष्ट');
add('fr8', 'ಸುಲಭ', 'sulabha', 'easy', '', 'सुलभ');
add('fr9', 'ಸಂತೋಷ', 'santOsha', 'happiness / joy', '', 'संतोष');
add('fr10', 'ಗಂಟೆ', 'gaNTe', "hour / o'clock / bell", 'Same as Hindi ghanTaa. "mooru gaNTe" = three o\'clock.', 'घंटा');
add('fr11', 'ಸ್ವಾಗತ', 'svaagata', 'welcome', 'You will see it on banners everywhere.', 'स्वागत');
add('fr12', 'ಪ್ರಶ್ನೆ', 'prashne', 'question', '', 'प्रश्न');

/* ---------- Auto Stand ---------- */
add('au1', 'ಆಟೋ', 'auto', 'auto-rickshaw', 'Same word. Say it with a Kannada accent: aaTo.');
add('au2', 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬರ್ತೀರಾ?', 'Majestic-ge barteeraa?', 'Will you come to Majestic?', '-ge glues onto any place and means "to" (like Hindi ko / ke liye). Swap in any area name.');
add('au3', 'ಮೀಟರ್ ಹಾಕ್ತೀರಾ?', 'meter haakteeraa?', 'Will you put the meter on?', 'Ask before you get in. haaku = put / place.');
add('au5', 'ಬರೋಲ್ಲ', 'barOlla', "I won't come (a driver refusing)", 'If you hear this, smile and wave down the next auto.');
add('au6', 'ಎಷ್ಟು ಆಗುತ್ತೆ?', 'eshTu aagutte?', 'How much will it come to?', 'eshTu = how much. aagutte = it will become.');
add('au7', 'ತುಂಬಾ ಜಾಸ್ತಿ', 'tumbaa jaasti', 'Too much / too expensive', 'jaasti = more, same as Marathi jaast.', 'जास्त');
add('au8', 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ', 'illi nillisi', 'Stop here, please', 'illi = here. nillisi = please stop.');
add('au9', 'ಇಲ್ಲೇ ಬಿಡಿ', 'illE biDi', 'Drop me right here', 'The long -E adds "right / just". illE = right here.');
add('au10', 'ಚಿಲ್ಲರೆ ಇಲ್ಲ', 'chillare illa', 'I have no change', 'You will hear this a lot. Keep a few ten-rupee notes ready.');
add('au12', 'ಬೇಗ ಹೋಗಿ', 'bEga hOgi', 'Please go fast', 'bEga = quickly. hOgi = go (polite).');
add('au13', 'ನಿಧಾನವಾಗಿ ಹೋಗಿ', 'nidhaanavaagi hOgi', 'Please go slowly', 'nidhaana = slow. You will also see it on road signs.', '');

/* ---------- Directions ---------- */
add('di1', 'ಬಲಕ್ಕೆ ತಿರುಗಿ', 'balakke tirugi', 'Turn right', 'bala = right. -kke = to. tirugu = turn.');
add('di2', 'ಎಡಕ್ಕೆ ತಿರುಗಿ', 'eDakke tirugi', 'Turn left', 'eDa = left. Note the retroflex D, like Hindi ड.');
add('di3', 'ನೇರ ಹೋಗಿ', 'nEra hOgi', 'Go straight', 'nEra = straight / direct.');
add('di4', 'ಇಲ್ಲಿ', 'illi', 'here', 'i- points near, a- points far: illi (here), alli (there).');
add('di5', 'ಅಲ್ಲಿ', 'alli', 'there', '');
add('di6', 'ಹತ್ತಿರ', 'hattira', 'near / close by', '');
add('di7', 'ದೂರ', 'doora', 'far', 'Same word as Hindi/Marathi door.', 'दूर');
add('di8', 'ಎಲ್ಲಿ?', 'elli?', 'Where?', 'Question words: elli (where), Enu (what), yaaru (who), eshTu (how much).');
add('di9', 'ಮುಂದೆ', 'munde', 'ahead / in front', '');
add('di10', 'ಹಿಂದೆ', 'hinde', 'behind / back', '');
add('di11', 'ಮೆಟ್ರೋ ಸ್ಟೇಷನ್ ಎಲ್ಲಿದೆ?', 'metro station ellide?', 'Where is the metro station?', 'English nouns slot straight in. elli + ide = ellide (where is it?).');
add('di13', 'ಟಾಯ್ಲೆಟ್ ಎಲ್ಲಿದೆ?', 'toilet ellide?', 'Where is the toilet?', 'The one frame you will use every week.');

/* ---------- Darshini ---------- */
add('dr1', 'ಕಾಫಿ', 'kaapi', 'coffee', 'Written ಕಾಫಿ but said kaapi.');
add('dr2', 'ಟೀ', 'tea', 'tea', '');
add('dr3', 'ನೀರು', 'neeru', 'water', '');
add('dr4', 'ಹಾಲು', 'haalu', 'milk', '');
add('dr5', 'ಇಡ್ಲಿ', 'iDli', 'idli', '');
add('dr6', 'ದೋಸೆ', 'dOse', 'dosa', '');
add('dr7', 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', 'ondu kaapi koDi', 'One coffee, please', 'koDi = give (polite). Add any item: "idli koDi".');
add('dr8', 'ಎರಡು ಇಡ್ಲಿ ಕೊಡಿ', 'eraDu iDli koDi', 'Two idlis, please', 'Number first, item, then koDi.');
add('dr9', 'ಸಕ್ಕರೆ ಕಮ್ಮಿ', 'sakkare kammi', 'Less sugar', 'sakkare is Hindi shakkar / Marathi saakhar. kammi = less, like Marathi kami.', 'शक्कर / साखर');
add('dr10', 'ಸಕ್ಕರೆ ಬೇಡ', 'sakkare bEDa', 'No sugar', 'bEDa = I do not want. The opposite of bEku.');
add('dr12', 'ಸಾಕು', 'saaku', 'Enough', 'Say it with a palm out when a server keeps pouring.');
add('dr13', 'ಇನ್ನೂ ಸ್ವಲ್ಪ', 'innoo swalpa', 'A little more', '');
add('dr14', 'ಬಿಲ್ ಕೊಡಿ', 'bill koDi', 'The bill, please', '');

/* ---------- Numbers 1-10 ---------- */
add('nu0', 'ಸೊನ್ನೆ', 'sonne', '0', '');
add('nu1', 'ಒಂದು', 'ondu', '1', 'o + ndu. Also means "a / one" before nouns.');
add('nu2', 'ಎರಡು', 'eraDu', '2', '');
add('nu3', 'ಮೂರು', 'mooru', '3', '');
add('nu4', 'ನಾಲ್ಕು', 'naalku', '4', '');
add('nu5', 'ಐದು', 'aidu', '5', '');
add('nu6', 'ಆರು', 'aaru', '6', '');
add('nu7', 'ಏಳು', 'ELu', '7', 'ಳ again, the Marathi ळ.');
add('nu8', 'ಎಂಟು', 'eNTu', '8', '');
add('nu9', 'ಒಂಬತ್ತು', 'ombattu', '9', '');
add('nu10', 'ಹತ್ತು', 'hattu', '10', 'Tens end in -attu / -vattu: ippattu, moovattu, nalavattu.');

/* ---------- Rupees and tens ---------- */
add('tn20', 'ಇಪ್ಪತ್ತು', 'ippattu', '20', '');
add('tn30', 'ಮೂವತ್ತು', 'moovattu', '30', '');
add('tn40', 'ನಲವತ್ತು', 'nalavattu', '40', '');
add('tn50', 'ಐವತ್ತು', 'aivattu', '50', '');
add('tn100', 'ನೂರು', 'nooru', '100', '');
add('tn1000', 'ಸಾವಿರ', 'saavira', '1000', 'Hindi hazaar. A different word entirely, so learn it fresh.');
add('ru0', 'ರೂಪಾಯಿ', 'roopaayi', 'rupee', 'Hindi rupaya. Same thing.', 'रुपया');
add('ru1', 'ಹತ್ತು ರೂಪಾಯಿ', 'hattu roopaayi', '₹10', '');
add('ru2', 'ಇಪ್ಪತ್ತು ರೂಪಾಯಿ', 'ippattu roopaayi', '₹20', '');
add('ru3', 'ಐವತ್ತು ರೂಪಾಯಿ', 'aivattu roopaayi', '₹50', '');
add('ru4', 'ನೂರು ರೂಪಾಯಿ', 'nooru roopaayi', '₹100', '');
add('ru5', 'ಎಷ್ಟು?', 'eshTu?', 'How much? / How many?', 'Your price question. Say it, then listen hard for the number.');

/* ---------- Santhe : market ---------- */
add('mk1', 'ತರಕಾರಿ', 'tarakaari', 'vegetables', 'Same as Hindi tarkaari.', 'तरकारी');
add('mk2', 'ಹಣ್ಣು', 'haNNu', 'fruit', 'Retroflex NN, like Hindi ण.');
add('mk3', 'ಟೊಮೆಟೊ', 'tomato', 'tomato', '');
add('mk4', 'ಈರುಳ್ಳಿ', 'eeruLLi', 'onion', 'ಳ again. The Marathi ळ is your friend here.');
add('mk5', 'ಕೊತ್ತಂಬರಿ', 'kottambari', 'coriander', 'Marathi kothimbir is a close cousin.', 'कोथिंबीर');
add('mk6', 'ಒಂದು ಕಿಲೋ', 'ondu kilo', 'one kilo', '');
add('mk7', 'ಅರ್ಧ ಕಿಲೋ', 'ardha kilo', 'half a kilo', 'ardha is the same word as Hindi/Marathi.', 'अर्ध');
add('mk8', 'ಕಿಲೋಗೆ ಎಷ್ಟು?', 'kilo-ge eshTu?', 'How much per kilo?', '-ge here means "for / per".');
add('mk10', 'ಸ್ವಲ್ಪ ಕಮ್ಮಿ ಮಾಡಿ', 'swalpa kammi maaDi', 'Please reduce it a little', 'The polite bargaining line. maaDi = do / make.');
add('mk11', 'ಇನ್ನೂ ಸ್ವಲ್ಪ ಹಾಕಿ', 'innoo swalpa haaki', 'Please put a little more', 'Vendors often add a handful of greens if you ask nicely.');
add('mk12', 'ಇದು ಚೆನ್ನಾಗಿದೆ', 'idu chennaagide', 'This is good', 'idu = this.');
add('mk13', 'ಚಿಲ್ಲರೆ ಇದೆಯಾ?', 'chillare ideyaa?', 'Do you have change?', 'ide = there is. Add -aa to turn a statement into a yes/no question.');
add('mk14', 'ಬೇಡ', 'bEDa', "I don't want it / no thanks", '');

/* ---------- Metro and Bus ---------- */
add('mt1', 'ನಿಲ್ದಾಣ', 'nildaaNa', 'station / stop', 'From nillu (stand). A stand-place.');
add('mt2', 'ಮುಂದಿನ ನಿಲ್ದಾಣ', 'mundina nildaaNa', 'Next station', 'You hear it on every metro ride.');
add('mt3', 'ಬಾಗಿಲು', 'baagilu', 'door', '');
add('mt4', 'ದಯವಿಟ್ಟು ಗಮನಿಸಿ', 'dayaviTTu gamanisi', 'Please pay attention', 'dayaviTTu = please (literally "having placed kindness"). daya is the same as Hindi/Marathi.');
add('mt5', 'ಎಡಭಾಗ', 'eDabhaaga', 'left side', '');
add('mt6', 'ಬಲಭಾಗ', 'balabhaaga', 'right side', '');
add('mt7', 'ಬಾಗಿಲುಗಳು ಬಲಭಾಗದಲ್ಲಿ ತೆರೆಯುತ್ತವೆ', 'baagilugaLu balabhaagadalli tereyuttave', 'The doors will open on the right side', 'Announcement style. -alli means "in / on / at". tereyu = open.');
add('mt8', 'ಟಿಕೆಟ್ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ?', 'ticket elli sigutte?', 'Where do I get a ticket?', 'sigu = to be found / get.');
add('mt9', 'ಯಾವ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್?', 'yaava platform?', 'Which platform?', 'yaava = which.');
add('mt10', 'ಇಳೀತೀನಿ', 'iLeeteeni', "I'm getting off", 'Say it when pushing through a crowded bus or train.');
add('mt11', 'ದಾರಿ ಬಿಡಿ', 'daari biDi', 'Please make way', 'daari = path. biDi = leave / let go.');
add('mt12', 'ಈ ಬಸ್ ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗುತ್ತಾ?', 'ee bus Majestic-ge hOguttaa?', 'Does this bus go to Majestic?', 'ee = this. -aa at the end makes it a question.');
add('mt13', 'ಜಾಗ ಇದೆಯಾ?', 'jaaga ideyaa?', 'Is there space / a seat?', '');

/* ---------- Time of day ---------- */
add('ti1', 'ಈಗ', 'eega', 'now', '');
add('ti2', 'ಇವತ್ತು', 'ivattu', 'today', '');
add('ti3', 'ನಾಳೆ', 'naaLe', 'tomorrow', 'ಳ once more. Marathi naaL-ish.');
add('ti4', 'ನಿನ್ನೆ', 'ninne', 'yesterday', '');
add('ti5', 'ಬೆಳಿಗ್ಗೆ', 'beLigge', 'morning', '');
add('ti6', 'ಮಧ್ಯಾಹ್ನ', 'madhyaahna', 'afternoon', 'Same as Hindi/Marathi madhyaahn.', 'मध्याह्न');
add('ti7', 'ಸಂಜೆ', 'sanje', 'evening', '');
add('ti8', 'ರಾತ್ರಿ', 'raatri', 'night', 'Same as Hindi/Marathi raatri.', 'रात्री');
add('ti9', 'ಈಗ ಎಷ್ಟು ಗಂಟೆ?', 'eega eshTu gaNTe?', 'What time is it now?', '');
add('ti10', 'ಮೂರು ಗಂಟೆ', 'mooru gaNTe', "Three o'clock", '');
add('ti11', 'ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಬರ್ತೀನಿ', 'naaLe beLigge barteeni', "I'll come tomorrow morning", '');
add('ti12', 'ತಡ ಆಯ್ತು', 'taDa aaytu', "I'm late / it got late", 'taDa = delay. Handy for the metro and for work.');

/* ---------- The Week ---------- */
add('wk1', 'ಸೋಮವಾರ', 'sOmavaara', 'Monday', '', 'सोमवार');
add('wk2', 'ಮಂಗಳವಾರ', 'mangaLavaara', 'Tuesday', 'Marathi has the same ळ: mangaLvaar.', 'मंगळवार');
add('wk3', 'ಬುಧವಾರ', 'budhavaara', 'Wednesday', '', 'बुधवार');
add('wk4', 'ಗುರುವಾರ', 'guruvaara', 'Thursday', '', 'गुरुवार');
add('wk5', 'ಶುಕ್ರವಾರ', 'shukravaara', 'Friday', '', 'शुक्रवार');
add('wk6', 'ಶನಿವಾರ', 'shanivaara', 'Saturday', '', 'शनिवार');
add('wk7', 'ಭಾನುವಾರ', 'bhaanuvaara', 'Sunday', 'Hindi/Marathi say ravivaar. Ravi and bhaanu both mean sun.', 'रविवार');
add('wk8', 'ವಾರ', 'vaara', 'week / weekday', '', 'वार');
add('wk9', 'ಇವತ್ತು ಯಾವ ದಿನ?', 'ivattu yaava dina?', 'Which day is it today?', '');
add('wk10', 'ಇವತ್ತು ಭಾನುವಾರ', 'ivattu bhaanuvaara', 'Today is Sunday', '');
add('wk11', 'ನಾಳೆ ಸೋಮವಾರ', 'naaLe sOmavaara', 'Tomorrow is Monday', '');

/* ---------- Neighbours and Home ---------- */
add('ho1', 'ಮನೆ', 'mane', 'house / home', 'A native Kannada word. Hindi/Marathi ghar will not help you here.');
add('ho2', 'ಅಮ್ಮ', 'amma', 'mother', '');
add('ho3', 'ಅಪ್ಪ', 'appa', 'father', '');
add('ho4', 'ಅಣ್ಣ', 'aNNa', 'elder brother', 'Also how you politely address any man a little older: auto driver, shopkeeper, guard.');
add('ho5', 'ಅಕ್ಕ', 'akka', 'elder sister', 'Also how you politely address any woman a little older: vendor, neighbour.');
add('ho6', 'ಒಳಗೆ ಬನ್ನಿ', 'oLage banni', 'Please come in', 'oLage = inside. banni = come (polite).');
add('ho7', 'ಕೂತ್ಕೊಳ್ಳಿ', 'kootkoLLi', 'Please sit down', '');
add('ho8', 'ಕಾಫಿ ಕುಡೀತೀರಾ?', 'kaapi kuDeeteeraa?', 'Will you have coffee?', '');
add('ho9', 'ಊಟ ಆಯ್ತಾ?', 'ooTa aaytaa?', 'Have you eaten?', 'The classic Kannada "how are you?". The answer is "haudu, aaytu".');
add('ho10', 'ಆಯ್ತು', 'aaytu', 'Okay! (agreed / done)', 'Said when you agree or something is finished.');
add('ho11', 'ಸರಿ', 'sari', 'Alright / that is right', '');
add('ho12', 'ನೀವು ಎಲ್ಲಿ ಇರೋದು?', 'neevu elli irOdu?', 'Where do you live?', 'irOdu = the living / staying.');
add('ho13', 'ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ?', 'nimma mane ellide?', 'Where is your house?', '');

/* ---------- Around Town : cognates II ---------- */
add('ar1', 'ಉತ್ತರ', 'uttara', 'answer / north', 'Same double meaning as Hindi/Marathi uttar.', 'उत्तर');
add('ar2', 'ನಗರ', 'nagara', 'city', 'You already know it from "Indiranagar".', 'नगर');
add('ar3', 'ದೇಶ', 'dEsha', 'country', '', 'देश');
add('ar4', 'ಸ್ಥಳ', 'sthaLa', 'place', 'ಳ again. Marathi sthaL.', 'स्थळ');
add('ar5', 'ಮಾರ್ಗ', 'maarga', 'route / road', '', 'मार्ग');
add('ar6', 'ಪುಸ್ತಕ', 'pustaka', 'book', '', 'पुस्तक');
add('ar7', 'ಶಾಲೆ', 'shaale', 'school', 'Marathi shaaLaa is even closer.', 'शाळा');
add('ar8', 'ವಿದ್ಯಾರ್ಥಿ', 'vidyaarthi', 'student', '', 'विद्यार्थी');
add('ar9', 'ಜನ', 'jana', 'people', '', 'जन');
add('ar10', 'ಸಹಾಯ', 'sahaaya', 'help', 'Marathi sahaayya. Say "sahaaya maaDi" = please help.', 'सहाय्य');
add('ar11', 'ಕುಟುಂಬ', 'kuTumba', 'family', 'Marathi kuTumb is nearly identical.', 'कुटुंब');
add('ar12', 'ಆಸ್ಪತ್ರೆ', 'aaspatre', 'hospital', 'Close to Hindi aspataal.', 'अस्पताल');

/* ---------- Extras (phrasebook only) ---------- */
add('rj1', 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು', 'kannaDa raajyOtsavada shubhaashayagaLu', 'Happy Kannada Rajyotsava', 'Say it on or around 1 November. People will love it.');

/* ---------- Stations ---------- */
STATIONS.push(...[
  { id: 'hello', line: 1, name: 'ನಮಸ್ಕಾರ', en: 'Namaskaara', blurb: 'Hello, how are you, thanks, sorry', kind: 'std',
    cards: ['nm1','nm2','nm3','nm4','nm5','nm6','nm7','nm8','nm9','nm10','nm11'] },
  { id: 'life', line: 1, name: 'ಜೀವರಕ್ಷಕ', en: 'Lifelines', blurb: 'Rescue phrases for when you get lost', kind: 'std', dialog: 'life',
    cards: ['lf1','lf2','lf3','lf4','lf5','lf6','lf7','lf8','lf9','lf10','lf11'] },
  { id: 'free1', line: 1, name: 'ಉಚಿತ ಪದಗಳು', en: 'Free Words I', blurb: 'Words you already know from Hindi and Marathi', kind: 'radar',
    cards: ['fr1','fr2','fr3','fr4','fr5','fr6','fr7','fr8','fr9','fr10','fr11','fr12'] },
  { id: 'auto', line: 1, name: 'ಆಟೋ ನಿಲ್ದಾಣ', en: 'Auto Stand', blurb: 'Get a ride at a fair price', kind: 'std', dialog: 'auto',
    cards: ['au1','au2','au3','nm9','au5','au6','au7','au8','au9','au10','au12','au13'] },
  { id: 'dirs', line: 1, name: 'ದಿಕ್ಕುಗಳು', en: 'Directions', blurb: 'Left, right, straight, here, there, where', kind: 'std',
    cards: ['di1','di2','di3','di4','di5','di6','di7','di8','di9','di10','di11','di13'] },
  { id: 'darshini', line: 1, name: 'ದರ್ಶಿನಿ', en: 'Darshini', blurb: 'Coffee, idli, sugar, bill', kind: 'std', dialog: 'darshini',
    cards: ['dr1','dr2','dr3','dr4','dr5','dr6','dr7','dr8','dr9','dr10','dr12','dr13','dr14'] },

  { id: 'nums1', line: 2, name: 'ಸಂಖ್ಯೆಗಳು', en: 'Numbers 1 to 10', blurb: 'Count anything out loud', kind: 'std',
    cards: ['nu0','nu1','nu2','nu3','nu4','nu5','nu6','nu7','nu8','nu9','nu10'] },
  { id: 'nums2', line: 2, name: 'ರೂಪಾಯಿ', en: 'Rupees and Tens', blurb: '20, 50, 100 and prices', kind: 'std',
    cards: ['tn20','tn30','tn40','tn50','tn100','tn1000','ru0','ru1','ru2','ru3','ru4','ru5'] },
  { id: 'market', line: 2, name: 'ಸಂತೆ', en: 'Santhe', blurb: 'Vegetables, kilos and bargaining', kind: 'std', dialog: 'market',
    cards: ['mk1','mk2','mk3','mk4','mk5','mk6','mk7','mk8','au7','mk10','mk11','mk12','mk13','mk14'] },
  { id: 'metro', line: 2, name: 'ಮೆಟ್ರೋ', en: 'Metro and Bus', blurb: 'Announcements, tickets, getting off', kind: 'std',
    cards: ['mt1','mt2','mt3','mt4','mt5','mt6','mt7','mt8','mt9','mt10','mt11','mt12','mt13'] },
  { id: 'time', line: 2, name: 'ಸಮಯ', en: 'Time of Day', blurb: 'Now, today, tomorrow, o\'clock', kind: 'std',
    cards: ['ti1','ti2','ti3','ti4','ti5','ti6','ti7','ti8','ti9','ti10','ti11','ti12'] },
  { id: 'week', line: 2, name: 'ವಾರ', en: 'The Week', blurb: 'Seven days. Mostly free words', kind: 'radar',
    cards: ['wk1','wk2','wk3','wk4','wk5','wk6','wk7','wk8','wk9','wk10','wk11'] },
  { id: 'home', line: 2, name: 'ನೆರೆಹೊರೆ', en: 'Neighbours', blurb: 'Come in, sit, have you eaten', kind: 'std', dialog: 'home',
    cards: ['ho1','ho2','ho3','ho4','ho5','ho6','ho7','ho8','ho9','ho10','ho11','ho12','ho13'] },
  { id: 'free2', line: 2, name: 'ನಗರದಲ್ಲಿ', en: 'Around Town', blurb: 'More words you already own', kind: 'radar',
    cards: ['ar1','ar2','ar3','ar4','ar5','ar6','ar7','ar8','ar9','ar10','ar11','ar12'] }
]);

/* ---------- Dialogues ---------- */
Object.assign(DIALOGS, {
  auto: { who: 'Auto driver', whoK: 'ಆಟೋ ಅಣ್ಣ', intro: 'You are at the auto stand. Reach Majestic without overpaying.', turns: [
    { npc: ['ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು?', 'ellige hOgbEku?', 'Where do you need to go?'], goal: 'Ask if he will come to Majestic.',
      opts: [ O('ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬರ್ತೀರಾ?', 'Majestic-ge barteeraa?', 'Will you come to Majestic?', 1), O('ಮೆಜೆಸ್ಟಿಕ್ ಎಷ್ಟು ಗಂಟೆ?', 'Majestic eshTu gaNTe?', 'What time is Majestic?'), O('ಮೆಜೆಸ್ಟಿಕ್ ಇಲ್ಲ', 'Majestic illa', 'There is no Majestic') ] },
    { npc: ['ಬರ್ತೀನಿ. ಇನ್ನೂರು ರೂಪಾಯಿ.', 'barteeni. innooru roopaayi.', "I'll come. 200 rupees."], goal: 'Say it is too much and ask him to run the meter.',
      opts: [ O('ತುಂಬಾ ಜಾಸ್ತಿ. ಮೀಟರ್ ಹಾಕ್ತೀರಾ?', 'tumbaa jaasti. meter haakteeraa?', 'Too much. Will you put the meter on?', 1), O('ಸರಿ, ಇನ್ನೂರು ಕೊಡ್ತೀನಿ', 'sari, innooru koDteeni', 'Fine, I will give 200'), O('ತುಂಬಾ ಕಮ್ಮಿ', 'tumbaa kammi', 'Too little') ] },
    { npc: ['ಸರಿ, ಮೀಟರ್ ಹಾಕ್ತೀನಿ. ಈಗ ಎಲ್ಲಿ ತಿರುಗಬೇಕು?', 'sari, meter haakteeni. eega elli tirugabEku?', "Okay, I'll put the meter on. Where should I turn now?"], goal: 'Tell him to go straight.',
      opts: [ O('ಬಲಕ್ಕೆ ತಿರುಗಿ', 'balakke tirugi', 'Turn right'), O('ನೇರ ಹೋಗಿ', 'nEra hOgi', 'Go straight', 1), O('ಎಡಕ್ಕೆ ತಿರುಗಿ', 'eDakke tirugi', 'Turn left') ] },
    { npc: ['ಇಲ್ಲಿ ನಿಲ್ಲಿಸಲಾ?', 'illi nillisalaa?', 'Shall I stop here?'], goal: 'Say yes, drop you right there.',
      opts: [ O('ಇಲ್ಲ, ಮುಂದೆ ಹೋಗಿ', 'illa, munde hOgi', 'No, go ahead'), O('ಹೌದು, ಇಲ್ಲೇ ಬಿಡಿ', 'haudu, illE biDi', 'Yes, drop me right here', 1), O('ಹಿಂದೆ ಹೋಗಿ', 'hinde hOgi', 'Go back') ] },
    { npc: ['ಎಂಬತ್ತು ರೂಪಾಯಿ. ಚಿಲ್ಲರೆ ಇದೆಯಾ?', 'embattu roopaayi. chillare ideyaa?', '80 rupees. Do you have change?'], goal: 'Tell him you have no change.',
      opts: [ O('ಹೌದು, ಚಿಲ್ಲರೆ ಇದೆ', 'haudu, chillare ide', 'Yes, I have change'), O('ಇಲ್ಲ, ಚಿಲ್ಲರೆ ಇಲ್ಲ', 'illa, chillare illa', 'No, I have no change', 1), O('ಚಿಲ್ಲರೆ ಬೇಡ, ಧನ್ಯವಾದಗಳು', 'chillare bEDa, dhanyavaadagaLu', 'No change wanted, thanks') ] }
  ] },
  darshini: { who: 'Counter server', whoK: 'ದರ್ಶಿನಿ ಅಣ್ಣ', intro: 'Morning rush at a darshini. Order coffee and idli.', turns: [
    { npc: ['ನಮಸ್ಕಾರ, ಏನು ಬೇಕು?', 'namaskaara, Enu bEku?', 'Hello, what do you want?'], goal: 'Order one coffee.',
      opts: [ O('ಒಂದು ಕಾಫಿ ಬೇಡ', 'ondu kaapi bEDa', 'I do not want one coffee'), O('ಕಾಫಿ ಇಲ್ಲ', 'kaapi illa', 'There is no coffee'), O('ಒಂದು ಕಾಫಿ ಕೊಡಿ', 'ondu kaapi koDi', 'One coffee, please', 1) ] },
    { npc: ['ಸಕ್ಕರೆ ಹಾಕಲಾ?', 'sakkare haakalaa?', 'Shall I add sugar?'], goal: 'Ask for less sugar.',
      opts: [ O('ಸಕ್ಕರೆ ಜಾಸ್ತಿ', 'sakkare jaasti', 'More sugar'), O('ಸಕ್ಕರೆ ಕಮ್ಮಿ', 'sakkare kammi', 'Less sugar', 1), O('ಸಕ್ಕರೆ ಬೇಡ', 'sakkare bEDa', 'No sugar') ] },
    { npc: ['ಇನ್ನೇನು ಬೇಕು?', 'innEnu bEku?', 'Anything else?'], goal: 'Ask for two idlis.',
      opts: [ O('ಎರಡು ಇಡ್ಲಿ ಇಲ್ಲ', 'eraDu iDli illa', 'There are no two idlis'), O('ಎರಡು ಇಡ್ಲಿ ಕೊಡಿ', 'eraDu iDli koDi', 'Two idlis, please', 1), O('ಒಂದು ಇಡ್ಲಿ ಬೇಡ', 'ondu iDli bEDa', 'I do not want one idli') ] },
    { npc: ['ಇನ್ನೂ ಏನಾದರೂ ಬೇಕಾ?', 'innoo Enaadaroo bEkaa?', 'Do you want anything more?'], goal: 'Say that is enough and ask for the bill.',
      opts: [ O('ಇನ್ನೂ ಸ್ವಲ್ಪ, ಧನ್ಯವಾದಗಳು', 'innoo swalpa, dhanyavaadagaLu', 'A little more, thanks'), O('ನಾಳೆ ಬರ್ತೀನಿ', 'naaLe barteeni', "I'll come tomorrow"), O('ಸಾಕು, ಬಿಲ್ ಕೊಡಿ', 'saaku, bill koDi', 'Enough, the bill please', 1) ] }
  ] },
  market: { who: 'Vegetable vendor', whoK: 'ತರಕಾರಿ ಅಕ್ಕ', intro: 'Morning santhe. Buy tomatoes and a little coriander.', turns: [
    { npc: ['ಏನು ಬೇಕು ಸಾರ್?', 'Enu bEku saar?', 'What do you want, sir?'], goal: 'Ask the price of tomatoes per kilo.',
      opts: [ O('ಟೊಮೆಟೊ ಎಲ್ಲಿದೆ?', 'tomato ellide?', 'Where are the tomatoes?'), O('ಟೊಮೆಟೊ ಕಿಲೋಗೆ ಎಷ್ಟು?', 'tomato kilo-ge eshTu?', 'How much are tomatoes per kilo?', 1), O('ಕಿಲೋ ಎಷ್ಟು ಗಂಟೆ?', 'kilo eshTu gaNTe?', 'What time is the kilo?') ] },
    { npc: ['ಕಿಲೋಗೆ ಅರವತ್ತು ರೂಪಾಯಿ.', 'kilo-ge aravattu roopaayi.', '60 rupees a kilo.'], goal: 'Say it is too much and ask her to reduce it a little.',
      opts: [ O('ತುಂಬಾ ಕಮ್ಮಿ. ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಮಾಡಿ', 'tumbaa kammi. swalpa jaasti maaDi', 'Too little. Make it a bit more'), O('ತುಂಬಾ ಜಾಸ್ತಿ. ಸ್ವಲ್ಪ ಕಮ್ಮಿ ಮಾಡಿ', 'tumbaa jaasti. swalpa kammi maaDi', 'Too much. Please reduce it a little', 1), O('ಸರಿ, ಅರವತ್ತು ಗಂಟೆ', 'sari, aravattu gaNTe', 'Fine, sixty hours') ] },
    { npc: ['ಐವತ್ತು ರೂಪಾಯಿ. ಎಷ್ಟು ಬೇಕು?', 'aivattu roopaayi. eshTu bEku?', '50 rupees. How much do you want?'], goal: 'Ask for half a kilo.',
      opts: [ O('ಒಂದು ಕಿಲೋ ಕೊಡಿ', 'ondu kilo koDi', 'One kilo, please'), O('ಅರ್ಧ ಕಿಲೋ ಕೊಡಿ', 'ardha kilo koDi', 'Half a kilo, please', 1), O('ಅರ್ಧ ಗಂಟೆ', 'ardha gaNTe', 'Half an hour') ] },
    { npc: ['ಇನ್ನೇನು ಬೇಕು?', 'innEnu bEku?', 'Anything else?'], goal: 'Ask her to add a little coriander.',
      opts: [ O('ಕೊತ್ತಂಬರಿ ಬೇಡ', 'kottambari bEDa', 'No coriander'), O('ಕೊತ್ತಂಬರಿ ಎಲ್ಲಿದೆ?', 'kottambari ellide?', 'Where is the coriander?'), O('ಸ್ವಲ್ಪ ಕೊತ್ತಂಬರಿ ಹಾಕಿ', 'swalpa kottambari haaki', 'Please put a little coriander', 1) ] },
    { npc: ['ಚಿಲ್ಲರೆ ಇದೆಯಾ?', 'chillare ideyaa?', 'Do you have change?'], goal: 'Tell her you have no change.',
      opts: [ O('ಇಲ್ಲ, ಚಿಲ್ಲರೆ ಇಲ್ಲ', 'illa, chillare illa', 'No, I have no change', 1), O('ಹೌದು, ಚಿಲ್ಲರೆ ಇದೆ', 'haudu, chillare ide', 'Yes, I have change'), O('ಚಿಲ್ಲರೆ ಬೇಕು', 'chillare bEku', 'I want change') ] }
  ] },
  home: { who: 'Neighbour aunty', whoK: 'ಪಕ್ಕದ ಮನೆ ಅಕ್ಕ', intro: 'You meet your neighbour on the stairs. Be warm.', turns: [
    { npc: ['ನಮಸ್ಕಾರ! ಹೇಗಿದ್ದೀರಾ?', 'namaskaara! hEgiddeeraa?', 'Hello! How are you?'], goal: 'Greet her and say you are fine. Ask how she is.',
      opts: [ O('ಕ್ಷಮಿಸಿ, ಸಕ್ಕರೆ ಕಮ್ಮಿ', 'kshamisi, sakkare kammi', 'Sorry, less sugar'), O('ನಮಸ್ಕಾರ, ಚೆನ್ನಾಗಿದ್ದೀನಿ. ನೀವು?', 'namaskaara, chennaagiddeeni. neevu?', "Hello, I'm fine. And you?", 1), O('ಬರ್ತೀನಿ, ನಾಳೆ', 'barteeni, naaLe', "I'll come, tomorrow") ] },
    { npc: ['ಊಟ ಆಯ್ತಾ?', 'ooTa aaytaa?', 'Have you eaten?'], goal: 'Say yes, you have, and thank her.',
      opts: [ O('ಇಲ್ಲ, ಪರವಾಗಿಲ್ಲ', 'illa, paravaagilla', 'No, never mind'), O('ಹೌದು, ಆಯ್ತು. ಧನ್ಯವಾದಗಳು', 'haudu, aaytu. dhanyavaadagaLu', 'Yes, done. Thank you', 1), O('ಗೊತ್ತಿಲ್ಲ', 'gottilla', "I don't know") ] },
    { npc: ['ಕಾಫಿ ಕುಡೀತೀರಾ?', 'kaapi kuDeeteeraa?', 'Will you have coffee?'], goal: 'Accept politely, a little only.',
      opts: [ O('ಕಾಫಿ ಇಲ್ಲ', 'kaapi illa', 'There is no coffee'), O('ಬೇಡ, ಧನ್ಯವಾದಗಳು', 'bEDa, dhanyavaadagaLu', "No, thank you"), O('ಸರಿ, ಸ್ವಲ್ಪ ಕೊಡಿ', 'sari, swalpa koDi', 'Okay, a little please', 1) ] },
    { npc: ['ನಿಮ್ಮ ಹೆಸರು ಏನು?', 'nimma hesaru Enu?', "What's your name?"], goal: 'Say your name is Raju.',
      opts: [ O('ನಿಮ್ಮ ಹೆಸರು ರಾಜು', 'nimma hesaru raaju', 'Your name is Raju'), O('ನನ್ನ ಹೆಸರು ಇಲ್ಲ', 'nanna hesaru illa', 'I have no name'), O('ನನ್ನ ಹೆಸರು ರಾಜು', 'nanna hesaru raaju', 'My name is Raju', 1) ] }
  ] },
  life: { who: 'Fast talker', whoK: 'ವೇಗವಾಗಿ ಮಾತಾಡುವವರು', intro: 'Someone speaks quickly. Use your lifelines.', turns: [
    { npc: ['ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿದ್ದೀರಾ? ಇಲ್ಲಿ ಎಷ್ಟು ವರ್ಷದಿಂದ ಇದ್ದೀರಾ?', 'neevu ellinda bandiddeeraa? illi eshTu varshadinda iddeeraa?', 'Where are you from? How many years have you been here?'], goal: 'Too fast. Say you did not understand.',
      opts: [ O('ಹೌದು, ಚೆನ್ನಾಗಿದ್ದೀನಿ', 'haudu, chennaagiddeeni', "Yes, I'm fine"), O('ಗೊತ್ತಾಗಲಿಲ್ಲ', 'gottaagalilla', "I didn't understand", 1), O('ಬರ್ತೀನಿ', 'barteeni', 'See you') ] },
    { npc: ['ಸರಿ, ಇನ್ನೊಂದು ಸಲ ಹೇಳ್ತೀನಿ.', 'sari, innondu sala hELteeni.', 'Okay, I will say it once more.'], goal: 'Ask her to speak slowly.',
      opts: [ O('ಮೆಲ್ಲಗೆ ಮಾತಾಡಿ', 'mellage maataaDi', 'Please speak slowly', 1), O('ಬೇಗ ಹೋಗಿ', 'bEga hOgi', 'Please go fast'), O('ಒಳಗೆ ಬನ್ನಿ', 'oLage banni', 'Please come in') ] },
    { npc: ['ನಿಮಗೆ ಕನ್ನಡ ಗೊತ್ತಾ?', 'nimage kannaDa gottaa?', 'Do you know Kannada?'], goal: 'Say you know a little.',
      opts: [ O('ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು', 'nanage swalpa kannaDa gottu', 'I know a little Kannada', 1), O('ನನಗೆ ಕನ್ನಡ ಇಲ್ಲ', 'nanage kannaDa illa', 'I have no Kannada'), O('ನಾಳೆ ಕನ್ನಡ', 'naaLe kannaDa', 'Kannada tomorrow') ] },
    { npc: ['ವಾವ್! ಚೆನ್ನಾಗಿ ಮಾತಾಡ್ತೀರ!', 'vaav! chennaagi maataaDteera!', 'Wow! You speak well!'], goal: 'Say thank you.',
      opts: [ O('ಕ್ಷಮಿಸಿ', 'kshamisi', 'Sorry'), O('ಧನ್ಯವಾದಗಳು', 'dhanyavaadagaLu', 'Thank you', 1), O('ಇಲ್ಲ', 'illa', 'No') ] }
  ] }
});

