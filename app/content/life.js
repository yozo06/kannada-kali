// Line D: Live here. Everyday Bengaluru situations.
import { add, O, STATIONS, DIALOGS } from './_build.js';

/* ---------- Family ---------- */
add('fm1', 'ತಮ್ಮ', 'tamma', 'younger brother', '');
add('fm2', 'ತಂಗಿ', 'tangi', 'younger sister', '');
add('fm3', 'ಗಂಡ', 'gaNDa', 'husband', '');
add('fm4', 'ಹೆಂಡತಿ', 'heNDati', 'wife', '');
add('fm5', 'ಮಗ', 'maga', 'son', 'Not Marathi mag (then).');
add('fm6', 'ಮಗಳು', 'magaLu', 'daughter', '');
add('fm7', 'ಅಜ್ಜಿ', 'ajji', 'grandmother', 'Close to Marathi aaji.', 'आजी');
add('fm8', 'ತಾತ', 'taata', 'grandfather', '');
add('fm9', 'ಮಕ್ಕಳು', 'makkaLu', 'children', '');
add('fm10', 'ಸ್ನೇಹಿತ', 'snEhita', 'friend', 'From sneha (affection). Everyday speech also just says "friend".', 'स्नेही');
add('fm11', 'ಮದುವೆ ಆಗಿದೆಯಾ?', 'maduve aagideyaa?', 'Are you married?', 'You will be asked. Often. maduve = wedding.');
add('fm12', 'ಮನೆಯಲ್ಲಿ ಯಾರು ಯಾರು ಇದ್ದಾರೆ?', 'maneyalli yaaru yaaru iddaare?', 'Who all are there at home?', 'Doubling a word means "all the various". Like Hindi kaun kaun.');
add('fm13', 'ಇವರು ನನ್ನ ಅಮ್ಮ', 'ivaru nanna amma', 'This is my mother', 'ivaru = this person (respectful).');

/* ---------- Meals ---------- */
add('fd1', 'ಊಟ', 'ooTa', 'meal (lunch or dinner)', '');
add('fd2', 'ತಿಂಡಿ', 'tiNDi', 'breakfast / snack', '');
add('fd3', 'ಅನ್ನ', 'anna', 'cooked rice', 'Sanskrit anna means food. In Kannada it is rice on the plate.', 'अन्न');
add('fd4', 'ಸಾರು', 'saaru', 'rasam / thin curry', '');
add('fd5', 'ಪಲ್ಯ', 'palya', 'dry vegetable side dish', '');
add('fd6', 'ಮೊಸರು', 'mosaru', 'curd', 'Mosaranna = curd rice.');
add('fd7', 'ಉಪ್ಪು', 'uppu', 'salt', 'Uppittu (upma) is literally "salt flour".');
add('fd8', 'ಖಾರ', 'khaara', 'spicy hot', 'Careful: Hindi khaara means salty. Kannada khaara means chilli-hot.');
add('fd9', 'ಸಿಹಿ', 'sihi', 'sweet', '');
add('fd10', 'ಹಸಿವಾಗ್ತಿದೆ', 'hasivaagtide', "I'm hungry", 'hasivu (hunger) + aagtide (is happening).');
add('fd11', 'ತುಂಬಾ ರುಚಿಯಾಗಿದೆ', 'tumbaa ruchiyaagide', "It's very tasty", 'Marathi ruchi (taste). Hindi ruchi leans towards "interest".', 'रुचि');
add('fd12', 'ಖಾರ ಕಮ್ಮಿ ಮಾಡಿ', 'khaara kammi maaDi', 'Make it less spicy, please', '');
add('fd13', 'ತಿಂಡಿ ಆಯ್ತಾ?', 'tiNDi aaytaa?', 'Had your breakfast?', 'The morning version of "ooTa aaytaa?".');
add('fd14', 'ಹೊಟ್ಟೆ ತುಂಬಿತು', 'hoTTe tumbitu', "I'm full", 'Literally "the stomach filled".');

/* ---------- Delivery and Phone ---------- */
add('dl1', 'ಹಲೋ, ಯಾರು ಮಾತಾಡ್ತಿರೋದು?', 'halO, yaaru maataaDtirOdu?', "Hello, who's speaking?", '');
add('dl2', 'ಎಲ್ಲಿದ್ದೀರಾ?', 'elliddeeraa?', 'Where are you?', 'elli + iddeeraa. Every delivery call starts with this.');
add('dl3', 'ಗೇಟ್ ಹತ್ತಿರ ಬನ್ನಿ', 'gate hattira banni', 'Come near the gate', '');
add('dl4', 'ಕೆಳಗೆ ಬರ್ತೀನಿ', 'keLage barteeni', "I'll come down", '');
add('dl5', 'ಐದು ನಿಮಿಷ', 'aidu nimisha', 'five minutes', '');
add('dl6', 'ಎರಡನೇ ಮಹಡಿ', 'eraDanE mahaDi', 'second floor', 'Number + anE makes first, second, third: ondanE, eraDanE, mooranE.');
add('dl7', 'ಮೇಲೆ ಬನ್ನಿ', 'mEle banni', 'Come up', '');
add('dl8', 'ಸೆಕ್ಯೂರಿಟಿ ಹತ್ತಿರ ಕೊಡಿ', 'security hattira koDi', 'Give it to the security guard', 'hattira also means "with / to" a person.');
add('dl9', 'ಒಟಿಪಿ ಹೇಳಿ', 'OTP hELi', 'Tell me the OTP', '');
add('dl10', 'ಒಂದು ನಿಮಿಷ', 'ondu nimisha', 'One minute / just a moment', '');
add('dl11', 'ಬರ್ತಾ ಇದ್ದೀನಿ', 'bartaa iddeeni', "I'm on my way", '');
add('dl12', 'ಲೊಕೇಶನ್ ಕಳಿಸ್ತೀನಿ', 'location kaListeeni', "I'll send the location", 'kaLisu = send.');
add('dl13', 'ಆಮೇಲೆ ಕಾಲ್ ಮಾಡ್ತೀನಿ', 'aamEle call maaDteeni', "I'll call later", 'English word + maaDu = instant Kannada verb: call maaDu, book maaDu, pay maaDu.');

/* ---------- House and Help ---------- */
add('hs1', 'ಬಾಡಿಗೆ', 'baaDige', 'rent', 'Close to Marathi bhaaDe.', 'भाडे');
add('hs2', 'ನೀರು ಬರ್ತಿಲ್ಲ', 'neeru bartilla', "The water isn't coming", 'Verb + tilla = is not happening right now.');
add('hs3', 'ಕರೆಂಟ್ ಇಲ್ಲ', 'current illa', "There's no power", '"Current" is the everyday word for electricity.');
add('hs4', 'ಕೀ ಎಲ್ಲಿದೆ?', 'key ellide?', 'Where is the key?', '');
add('hs5', 'ಕಸ', 'kasa', 'garbage', '');
add('hs6', 'ಕ್ಲೀನ್ ಮಾಡಿ', 'clean maaDi', 'Please clean it', '');
add('hs7', 'ಪಾತ್ರೆ', 'paatre', 'vessels / dishes', '', 'पात्र');
add('hs8', 'ಬಟ್ಟೆ', 'baTTe', 'clothes', '');
add('hs9', 'ನಾಳೆ ಬನ್ನಿ', 'naaLe banni', 'Come tomorrow', '');
add('hs10', 'ಇವತ್ತು ರಜೆ', 'ivattu raje', 'Today is a holiday / day off', 'Same as Marathi rajaa.', 'रजा');
add('hs11', 'ಎಷ್ಟು ಹೊತ್ತಿಗೆ ಬರ್ತೀರಾ?', 'eshTu hottige barteeraa?', 'What time will you come?', 'hottu = time of day.');
add('hs12', 'ರಿಪೇರಿ ಮಾಡ್ಬೇಕು', 'ripEri maaDbEku', 'It needs repairing', '"Repair" turned fully Kannada: ripEri.');
add('hs13', 'ಸಂಬಳ', 'sambaLa', 'salary / wages', '');
add('hs14', 'ಬಾಗಿಲು ಹಾಕಿ', 'baagilu haaki', 'Close the door', 'haaku (put) is how you shut doors and switch things on.');

/* ---------- At Work ---------- */
add('of1', 'ಕೆಲಸ', 'kelasa', 'work / job', '');
add('of2', 'ಕೆಲಸ ಆಯ್ತಾ?', 'kelasa aaytaa?', 'Is the work done?', '');
add('of3', 'ಇನ್ನೂ ಆಗಿಲ್ಲ', 'innoo aagilla', 'Not done yet', '');
add('of4', 'ಮೀಟಿಂಗ್ ಇದೆ', 'meeting ide', "There's a meeting", '');
add('of5', 'ಸ್ವಲ್ಪ ಬಿಜಿ ಇದ್ದೀನಿ', 'swalpa busy iddeeni', "I'm a bit busy", '');
add('of6', 'ಸಹಾಯ ಬೇಕಾ?', 'sahaaya bEkaa?', 'Need help?', '');
add('of7', 'ಚೆನ್ನಾಗಿ ಮಾಡಿದ್ರಿ', 'chennaagi maaDidri', 'You did well / good job', '');
add('of8', 'ನಾಳೆ ರಜೆ', 'naaLe raje', "Tomorrow is a holiday / I'm off tomorrow", '');
add('of9', 'ಊಟಕ್ಕೆ ಹೋಗೋಣ್ವಾ?', 'ooTakke hOgONvaa?', 'Shall we go for lunch?', 'Verb + ONa = let us. Add -vaa to make it "shall we?".');
add('of10', 'ಹೋಗೋಣ', 'hOgONa', "Let's go", '');
add('of11', 'ಒಂದು ನಿಮಿಷ ಬನ್ನಿ', 'ondu nimisha banni', 'Come here for a minute', '');
add('of12', 'ನನಗೆ ಗೊತ್ತು', 'nanage gottu', 'I know', '');
add('of13', 'ತೊಂದರೆ ಇಲ್ಲ', 'tondare illa', 'No trouble / no problem', '');

/* ---------- Doctor ---------- */
add('hl1', 'ಜ್ವರ', 'jwara', 'fever', '', 'ज्वर');
add('hl2', 'ತಲೆ ನೋವು', 'tale nOvu', 'headache', 'tale = head. nOvu = pain.');
add('hl3', 'ಹೊಟ್ಟೆ ನೋವು', 'hoTTe nOvu', 'stomach ache', '');
add('hl4', 'ಕೆಮ್ಮು', 'kemmu', 'cough', '');
add('hl5', 'ನೆಗಡಿ', 'negaDi', 'a cold (runny nose)', '');
add('hl6', 'ಔಷಧಿ', 'aushadhi', 'medicine', '', 'औषधि');
add('hl7', 'ನೋವು', 'nOvu', 'pain', '');
add('hl8', 'ಹುಷಾರಿಲ್ಲ', 'hushaarilla', "I'm not well", 'hushaaru (well, alert) is Hindi hoshiyaar. hushaaru + illa = unwell.');
add('hl9', 'ಇಲ್ಲಿ ನೋವಿದೆ', 'illi nOvide', 'It hurts here', '');
add('hl10', 'ಎರಡು ದಿನದಿಂದ', 'eraDu dinadinda', 'for two days (since two days)', '');
add('hl11', 'ಡಾಕ್ಟರ್ ಇದ್ದಾರಾ?', 'doctor iddaaraa?', 'Is the doctor in?', '');
add('hl12', 'ಊಟ ಆದ್ಮೇಲೆ', 'ooTa aadmEle', 'after food', 'aadmEle = after it is done.');
add('hl13', 'ದಿನಕ್ಕೆ ಎರಡು ಸಲ', 'dinakke eraDu sala', 'twice a day', 'sala = times.');
add('hl14', 'ಹುಷಾರು', 'hushaaru', 'Take care / be careful', '');

/* ---------- Small Talk ---------- */
add('fl1', 'ಖುಷಿ', 'khushi', 'happy', '', 'खुशी');
add('fl2', 'ಬೇಜಾರು', 'bEjaaru', 'bored / fed up / upset', '', 'बेजार');
add('fl3', 'ಕೋಪ', 'kOpa', 'anger', '', 'कोप');
add('fl4', 'ಭಯ', 'bhaya', 'fear', '', 'भय');
add('fl5', 'ಸುಸ್ತು', 'sustu', 'tired', 'Hindi sust means lazy. Kannada sustu means worn out.');
add('fl6', 'ಏನ್ ಸಮಾಚಾರ?', 'En samaachaara?', "What's up? / What's the news?", '', 'समाचार');
add('fl7', 'ಏನಿಲ್ಲ', 'Enilla', 'Nothing much', '');
add('fl8', 'ಚಿಂತೆ ಮಾಡ್ಬೇಡಿ', 'chinte maaDbEDi', "Don't worry", '', 'चिंता');
add('fl9', 'ನಿಮ್ಮ ಊರು ಯಾವುದು?', 'nimma ooru yaavudu?', 'Which is your home town?', 'The classic second question after your name. ooru = town, native place.');
add('fl10', 'ನಾನು ದೆಹಲಿಯಿಂದ ಬಂದಿದ್ದೀನಿ', 'naanu dehaliyinda bandiddeeni', 'I have come from Delhi', 'Swap in your own place + inda.');
add('fl11', 'ಇಲ್ಲಿ ಎರಡು ವರ್ಷದಿಂದ ಇದ್ದೀನಿ', 'illi eraDu varshadinda iddeeni', 'I have been here for two years', 'Swap the number for your own.');
add('fl12', 'ಬೆಂಗಳೂರು ಇಷ್ಟ ಆಯ್ತಾ?', 'bengaLooru ishTa aaytaa?', 'Do you like Bengaluru?', '');
add('fl13', 'ತುಂಬಾ ಇಷ್ಟ ಆಯ್ತು', 'tumbaa ishTa aaytu', 'I like it a lot', '');
add('fl14', 'ಮತ್ತೆ ಸಿಗೋಣ', 'matte sigONa', "Let's meet again / see you", '');

/* ---------- Weather and Roads ---------- */
add('we1', 'ಮಳೆ', 'maLe', 'rain', '');
add('we2', 'ಬಿಸಿಲು', 'bisilu', 'sunshine / heat of the sun', '');
add('we3', 'ಚಳಿ', 'chaLi', 'cold (weather)', '');
add('we4', 'ಗಾಳಿ', 'gaaLi', 'wind / air', 'Not Hindi gaali (abuse).');
add('we5', 'ಮೋಡ', 'mODa', 'cloud', '');
add('we6', 'ಮಳೆ ಬರ್ತಿದೆ', 'maLe bartide', "It's raining", 'Literally "rain is coming".');
add('we7', 'ತುಂಬಾ ಸೆಖೆ', 'tumbaa sekhe', "It's very hot and sticky", '');
add('we8', 'ತುಂಬಾ ಚಳಿ ಇದೆ', 'tumbaa chaLi ide', "It's very cold", '');
add('we9', 'ಛತ್ರಿ', 'chhatri', 'umbrella', 'Same as Marathi chhatri.', 'छत्री');
add('we10', 'ಟ್ರಾಫಿಕ್ ಜಾಸ್ತಿ ಇದೆ', 'traffic jaasti ide', "There's a lot of traffic", 'You will say this weekly.');
add('we11', 'ರಸ್ತೆ', 'raste', 'road', 'Same as Marathi rastaa.', 'रस्ता');
add('we12', 'ನೀರು ನಿಂತಿದೆ', 'neeru nintide', 'Water has collected (waterlogging)', '');

/* ---------- Colours and Shopping ---------- */
add('cl1', 'ಬಣ್ಣ', 'baNNa', 'colour', '');
add('cl2', 'ಕೆಂಪು', 'kempu', 'red', 'Kempegowda, Kempu Kote: the red fort.');
add('cl3', 'ಹಸಿರು', 'hasiru', 'green', '');
add('cl4', 'ನೀಲಿ', 'neeli', 'blue', '', 'नीली');
add('cl5', 'ಹಳದಿ', 'haLadi', 'yellow', 'The colour of turmeric. Marathi haLad.', 'हळद');
add('cl6', 'ಕಪ್ಪು', 'kappu', 'black', '');
add('cl7', 'ಬಿಳಿ', 'biLi', 'white', '');
add('cl8', 'ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?', 'bEre baNNa ideyaa?', 'Do you have another colour?', 'bEre = other, different.');
add('cl9', 'ದೊಡ್ಡ ಸೈಜ್ ಕೊಡಿ', 'doDDa size koDi', 'Give me a bigger size', '');
add('cl10', 'ಇದು ಬೇಡ, ಅದು ಕೊಡಿ', 'idu bEDa, adu koDi', 'Not this one, give me that one', '');
add('cl11', 'ಅಂಗಡಿ', 'angaDi', 'shop', '');
add('cl12', 'ದುಡ್ಡು', 'duDDu', 'money', '');
add('cl13', 'ಕಾರ್ಡ್ ತಗೊಳ್ತೀರಾ?', 'card tagoLteeraa?', 'Do you take cards?', '');
add('cl14', 'ಬೆಲೆ ಎಷ್ಟು?', 'bele eshTu?', "What's the price?", '');

/* ---------- Bigger Numbers ---------- */
add('nb11', 'ಹನ್ನೊಂದು', 'hannondu', '11', 'hattu + ondu squeezed together.');
add('nb12', 'ಹನ್ನೆರಡು', 'hanneraDu', '12', '');
add('nb15', 'ಹದಿನೈದು', 'hadinaidu', '15', '13 to 18 start with hadi-: hadimooru, hadinaalku, hadinaidu. 19 is hattombattu.');
add('nb25', 'ಇಪ್ಪತ್ತೈದು', 'ippattaidu', '25', 'Tens first, then the unit: ippattu + aidu.');
add('nb60', 'ಅರವತ್ತು', 'aravattu', '60', '');
add('nb70', 'ಎಪ್ಪತ್ತು', 'eppattu', '70', '');
add('nb80', 'ಎಂಬತ್ತು', 'embattu', '80', '');
add('nb90', 'ತೊಂಬತ್ತು', 'tombattu', '90', '');
add('nb150', 'ನೂರ ಐವತ್ತು', 'noora aivattu', '150', '');
add('nb200', 'ಇನ್ನೂರು', 'innooru', '200', 'Hundreds: innooru, munnooru, naanooru, ainooru.');
add('nb500', 'ಐನೂರು', 'ainooru', '500', '');
add('nb1h', 'ಒಂದೂವರೆ', 'ondoovare', 'one and a half', 'Hindi DeDh. Number + oovare adds a half.');
add('nb2h', 'ಎರಡೂವರೆ', 'eraDoovare', 'two and a half', 'Hindi Dhaai.');
add('nblk', 'ಲಕ್ಷ', 'laksha', 'one lakh (100,000)', '', 'लक्ष');

/* ---------- Emergencies ---------- */
add('em1', 'ಸಹಾಯ ಮಾಡಿ', 'sahaaya maaDi', 'Please help', '');
add('em2', 'ಬೇಗ ಬನ್ನಿ', 'bEga banni', 'Come quickly', '');
add('em3', 'ಪೊಲೀಸ್‌ಗೆ ಕಾಲ್ ಮಾಡಿ', 'police-ge call maaDi', 'Call the police', '');
add('em4', 'ಬೆಂಕಿ', 'benki', 'fire', '');
add('em5', 'ಆಕ್ಸಿಡೆಂಟ್ ಆಗಿದೆ', 'accident aagide', "There's been an accident", '');
add('em6', 'ಆಂಬುಲೆನ್ಸ್ ಕರೀರಿ', 'ambulance kareeri', 'Call an ambulance', 'kari = call (someone over).');
add('em7', 'ನನ್ನ ಫೋನ್ ಕಳೆದು ಹೋಯ್ತು', 'nanna phone kaLedu hOytu', 'I lost my phone', 'kaLedu hOytu = got lost and gone.');
add('em8', 'ನನ್ನ ಪರ್ಸ್ ಕಳೆದು ಹೋಯ್ತು', 'nanna purse kaLedu hOytu', 'I lost my wallet', '');
add('em9', 'ದಾರಿ ತಪ್ಪಿದೆ', 'daari tappide', "I've lost my way", 'tappu = mistake, miss.');
add('em10', 'ಜಾಗ್ರತೆ', 'jaagrate', 'careful / caution', 'Related to Hindi jaagrat (awake). Here it means take care.');
add('em11', 'ಹತ್ತಿರದಲ್ಲಿ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'hattiradalli aaspatre ellide?', 'Where is a hospital nearby?', '');
add('em12', 'ಅಪಾಯ', 'apaaya', 'danger', 'On warning boards everywhere. Marathi apaay (harm).', 'अपाय');

/* ---------- Bengaluru Slang ---------- */
add('sl1', 'ಗುರು', 'guru', 'dude / boss', 'How friends address each other. Same word as the Hindi one, new job.', 'गुरु');
add('sl2', 'ಮಗಾ', 'magaa', 'buddy', 'Literally "son". Between close friends only.');
add('sl3', 'ಸಕ್ಕತ್', 'sakkat', 'awesome', 'Often spelled sakkath. "sakkat aagide" = it is awesome.');
add('sl4', 'ಬೊಂಬಾಟ್', 'bombaaT', 'fantastic', '');
add('sl5', 'ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ', 'swalpa adjust maaDi', 'Please adjust a little', 'The unofficial motto of Bengaluru. Works in buses, queues and negotiations.');
add('sl6', 'ಚಿಂದಿ', 'chindi', 'brilliant (slang)', 'Literally "rags". "chindi guru" = you nailed it.');
add('sl7', 'ಏನ್ ಗುರು?', 'En guru?', "What's up, dude?", '');
add('sl8', 'ಬಿಡಿ ಸಾರ್', 'biDi saar', 'Let it go, sir', 'For ending an argument gracefully.');
add('sl9', 'ಮಸ್ತ್', 'mast', 'great', 'Same as Hindi / Marathi mast.', 'मस्त');
add('sl10', 'ಸುಮ್ನೆ', 'sumne', 'just like that / for no reason', '"yaake?" "sumne." = Why? No reason.');
add('sl11', 'ಬೇಗ ಬಾ ಮಗಾ', 'bEga baa magaa', 'Come quick, buddy', 'baa = come (casual). banni = come (polite).');
add('sl12', 'ಕಿರಿಕ್', 'kirik', 'fuss / trouble', '"kirik maaDbEDa" = do not make a fuss.');
add('sl13', 'ಓಕೆ, ಸಿಗೋಣ', 'OK, sigONa', 'OK, catch you later', '');

const ids = (p, n) => Array.from({ length: n }, (_, i) => p + (i + 1));
STATIONS.push(
  { id: 'family', line: 4, name: 'ಕುಟುಂಬ', en: 'Family', blurb: 'Brother, sister, wife, husband, children', kind: 'std', cards: ids('fm', 13) },
  { id: 'meals', line: 4, name: 'ಊಟ ತಿಂಡಿ', en: 'Meals', blurb: 'Rice, curd, spicy, tasty, full', kind: 'std', cards: ids('fd', 14) },
  { id: 'delivery', line: 4, name: 'ಡೆಲಿವರಿ', en: 'Delivery and Phone', blurb: 'Gate, floor, OTP, on my way', kind: 'std', dialog: 'delivery', cards: ids('dl', 13) },
  { id: 'house', line: 4, name: 'ಮನೆ ಕೆಲಸ', en: 'House and Help', blurb: 'Rent, water, power, repairs', kind: 'std', dialog: 'house', cards: ids('hs', 14) },
  { id: 'office', line: 4, name: 'ಆಫೀಸ್', en: 'At Work', blurb: 'Meetings, lunch, leave, well done', kind: 'std', dialog: 'office', cards: ids('of', 13) },
  { id: 'doctor', line: 4, name: 'ಆರೋಗ್ಯ', en: 'Doctor', blurb: 'Fever, pain, medicine, twice a day', kind: 'std', dialog: 'doctor', cards: ids('hl', 14) },
  { id: 'talk', line: 4, name: 'ಮಾತುಕತೆ', en: 'Small Talk', blurb: 'Home town, feelings, see you again', kind: 'std', dialog: 'smalltalk', cards: ids('fl', 14) },
  { id: 'weather', line: 4, name: 'ಮಳೆ ಬಿಸಿಲು', en: 'Weather and Roads', blurb: 'Rain, traffic and the two together', kind: 'std', cards: ids('we', 12) },
  { id: 'shop', line: 4, name: 'ಅಂಗಡಿ', en: 'Colours and Shopping', blurb: 'Red, blue, bigger size, card or cash', kind: 'std', dialog: 'shop', cards: ids('cl', 14) },
  { id: 'nums3', line: 4, name: 'ನೂರು ಸಾವಿರ', en: 'Bigger Numbers', blurb: '11 to a lakh, and the halves', kind: 'std',
    cards: ['nb11', 'nb12', 'nb15', 'nb25', 'nb60', 'nb70', 'nb80', 'nb90', 'nb150', 'nb200', 'nb500', 'nb1h', 'nb2h', 'nblk'] },
  { id: 'sos', line: 4, name: 'ತುರ್ತು', en: 'Emergencies', blurb: 'Help, police, lost, danger', kind: 'std', cards: ids('em', 12) },
  { id: 'slang', line: 4, name: 'ಬೆಂಗಳೂರು ಮಾತು', en: 'Bengaluru Slang', blurb: 'Guru, sakkat, swalpa adjust maaDi', kind: 'std', cards: ids('sl', 13) }
);

/* ---------- Boss chats ---------- */
Object.assign(DIALOGS, {
  delivery: { who: 'Delivery partner', whoK: 'ಡೆಲಿವರಿ ಅಣ್ಣ', intro: 'Your order has arrived. Get it without going round in circles.', turns: [
    { npc: ['ಹಲೋ ಸಾರ್, ಡೆಲಿವರಿ. ಎಲ್ಲಿದ್ದೀರಾ?', 'halO saar, delivery. elliddeeraa?', 'Hello sir, delivery. Where are you?'], goal: 'Tell him you will come down.',
      opts: [O('ಕೆಳಗೆ ಬರ್ತೀನಿ', 'keLage barteeni', "I'll come down", 1), O('ಒಟಿಪಿ ಹೇಳಿ', 'OTP hELi', 'Tell me the OTP'), O('ನಾಳೆ ಬನ್ನಿ', 'naaLe banni', 'Come tomorrow')] },
    { npc: ['ಗೇಟ್ ಹತ್ತಿರ ಇದ್ದೀನಿ. ಎಷ್ಟು ಹೊತ್ತು ಆಗುತ್ತೆ?', 'gate hattira iddeeni. eshTu hottu aagutte?', "I'm near the gate. How long will it take?"], goal: 'Say just one minute.',
      opts: [O('ಐದು ಗಂಟೆ', 'aidu gaNTe', 'Five hours'), O('ಒಂದು ನಿಮಿಷ', 'ondu nimisha', 'One minute', 1), O('ಎರಡನೇ ಮಹಡಿ', 'eraDanE mahaDi', 'Second floor')] },
    { npc: ['ಒಟಿಪಿ ಹೇಳಿ ಸಾರ್', 'OTP hELi saar', 'Tell me the OTP, sir'], goal: 'Say you will tell him, then read it out.',
      opts: [O('ಗೊತ್ತಿಲ್ಲ, ಬೇಡ', 'gottilla, bEDa', "I don't know, don't want it"), O('ಒಟಿಪಿ ಕೊಡಿ', 'OTP koDi', 'Give me the OTP'), O('ಹೇಳ್ತೀನಿ. ನಾಲ್ಕು, ಐದು, ಆರು, ಏಳು', 'hELteeni. naalku, aidu, aaru, ELu', "I'll tell you. Four, five, six, seven", 1)] },
    { npc: ['ಧನ್ಯವಾದಗಳು ಸಾರ್. ರೇಟಿಂಗ್ ಕೊಡಿ.', 'dhanyavaadagaLu saar. rating koDi.', 'Thank you, sir. Please give a rating.'], goal: 'Say okay and thank him.',
      opts: [O('ಆಯ್ತು, ಧನ್ಯವಾದಗಳು', 'aaytu, dhanyavaadagaLu', 'Okay, thank you', 1), O('ಬೇಗ ಬನ್ನಿ', 'bEga banni', 'Come quickly'), O('ಕೆಳಗೆ ಬರ್ತೀನಿ', 'keLage barteeni', "I'll come down")] }
  ] },
  house: { who: 'House owner', whoK: 'ಮನೆ ಓನರ್', intro: 'No water since yesterday. Call the owner and get it fixed.', turns: [
    { npc: ['ಹೇಳಿ, ಏನು ಸಮಸ್ಯೆ?', 'hELi, Enu samasye?', "Tell me, what's the problem?"], goal: 'Say the water is not coming.',
      opts: [O('ಕರೆಂಟ್ ಇಲ್ಲ', 'current illa', "There's no power"), O('ನೀರು ಬರ್ತಿಲ್ಲ', 'neeru bartilla', "The water isn't coming", 1), O('ನೀರು ಬೇಡ', 'neeru bEDa', "I don't want water")] },
    { npc: ['ಯಾವಾಗಿಂದ?', 'yaavaaginda?', 'Since when?'], goal: 'Say since yesterday.',
      opts: [O('ನಿನ್ನೆಯಿಂದ', 'ninneyinda', 'Since yesterday', 1), O('ನಾಳೆ', 'naaLe', 'Tomorrow'), O('ಎರಡನೇ ಮಹಡಿ', 'eraDanE mahaDi', 'Second floor')] },
    { npc: ['ಸರಿ, ಪ್ಲಂಬರ್ ಕಳಿಸ್ತೀನಿ. ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಮನೆಯಲ್ಲಿ ಇರ್ತೀರಾ?', 'sari, plumber kaListeeni. naaLe beLigge maneyalli irteeraa?', "Okay, I'll send a plumber. Will you be home tomorrow morning?"], goal: 'Say you will be there, and ask what time he will come.',
      opts: [O('ಇಲ್ಲ, ಬಾಡಿಗೆ ಜಾಸ್ತಿ', 'illa, baaDige jaasti', 'No, the rent is too high'), O('ನಾಳೆ ರಜೆ, ಬೇಡ', 'naaLe raje, bEDa', "Tomorrow is a holiday, don't"), O('ಇರ್ತೀನಿ. ಎಷ್ಟು ಹೊತ್ತಿಗೆ ಬರ್ತಾರೆ?', 'irteeni. eshTu hottige bartaare?', "I'll be there. What time will he come?", 1)] },
    { npc: ['ಹತ್ತು ಗಂಟೆಗೆ.', 'hattu gaNTege.', "At ten o'clock."], goal: 'Say alright and thank him.',
      opts: [O('ತುಂಬಾ ಜಾಸ್ತಿ', 'tumbaa jaasti', 'Too much'), O('ಸರಿ, ಧನ್ಯವಾದಗಳು', 'sari, dhanyavaadagaLu', 'Alright, thank you', 1), O('ಹತ್ತು ರೂಪಾಯಿ', 'hattu roopaayi', 'Ten rupees')] }
  ] },
  doctor: { who: 'Doctor', whoK: 'ಡಾಕ್ಟರ್', intro: 'At the neighbourhood clinic. Explain what is wrong and understand the dose.', turns: [
    { npc: ['ಬನ್ನಿ, ಕೂತ್ಕೊಳ್ಳಿ. ಏನಾಗಿದೆ?', 'banni, kootkoLLi. Enaagide?', "Come, sit. What's happened?"], goal: 'Say you have fever and a headache.',
      opts: [O('ಹೊಟ್ಟೆ ನೋವು, ಕೆಮ್ಮು', 'hoTTe nOvu, kemmu', 'Stomach ache and cough'), O('ಜ್ವರ, ತಲೆ ನೋವು', 'jwara, tale nOvu', 'Fever and headache', 1), O('ಏನಿಲ್ಲ', 'Enilla', 'Nothing much')] },
    { npc: ['ಎಷ್ಟು ದಿನದಿಂದ?', 'eshTu dinadinda?', 'For how many days?'], goal: 'Say for two days.',
      opts: [O('ಎರಡು ದಿನದಿಂದ', 'eraDu dinadinda', 'For two days', 1), O('ಎರಡು ಗಂಟೆ', 'eraDu gaNTe', "Two o'clock"), O('ದಿನಕ್ಕೆ ಎರಡು ಸಲ', 'dinakke eraDu sala', 'Twice a day')] },
    { npc: ['ಈ ಔಷಧಿ ತಗೊಳ್ಳಿ. ದಿನಕ್ಕೆ ಎರಡು ಸಲ, ಊಟ ಆದ್ಮೇಲೆ.', 'ee aushadhi tagoLLi. dinakke eraDu sala, ooTa aadmEle.', 'Take this medicine. Twice a day, after food.'], goal: 'Confirm: after food, right?',
      opts: [O('ಊಟ ಬೇಡ, ಅಲ್ವಾ?', 'ooTa bEDa, alvaa?', 'No food, right?'), O('ಔಷಧಿ ಬೇಡ', 'aushadhi bEDa', "I don't want medicine"), O('ಊಟ ಆದ್ಮೇಲೆ, ಅಲ್ವಾ?', 'ooTa aadmEle, alvaa?', 'After food, right?', 1)] },
    { npc: ['ಹೌದು. ಹುಷಾರು.', 'haudu. hushaaru.', 'Yes. Take care.'], goal: 'Thank the doctor.',
      opts: [O('ಧನ್ಯವಾದಗಳು ಡಾಕ್ಟರ್', 'dhanyavaadagaLu doctor', 'Thank you, doctor', 1), O('ಚಿಂತೆ ಮಾಡ್ಬೇಡಿ', 'chinte maaDbEDi', "Don't worry"), O('ಬೇಗ ಹೋಗಿ', 'bEga hOgi', 'Go fast')] }
  ] },
  office: { who: 'Colleague', whoK: 'ಸಹೋದ್ಯೋಗಿ', intro: 'A colleague stops by your desk before lunch.', turns: [
    { npc: ['ಏನ್ ಸಮಾಚಾರ? ಕೆಲಸ ಆಯ್ತಾ?', 'En samaachaara? kelasa aaytaa?', "What's up? Is the work done?"], goal: 'Say it is not done yet.',
      opts: [O('ಆಯ್ತು, ನಾಳೆ ರಜೆ', 'aaytu, naaLe raje', "Done, tomorrow I'm off"), O('ಇನ್ನೂ ಆಗಿಲ್ಲ', 'innoo aagilla', 'Not done yet', 1), O('ಗೊತ್ತಿಲ್ಲ', 'gottilla', "I don't know")] },
    { npc: ['ಸಹಾಯ ಬೇಕಾ?', 'sahaaya bEkaa?', 'Need help?'], goal: 'Decline politely: no need, no trouble.',
      opts: [O('ಬೇಡ, ತೊಂದರೆ ಇಲ್ಲ', 'bEDa, tondare illa', 'No need, no trouble', 1), O('ಸಹಾಯ ಮಾಡಿ, ಬೆಂಕಿ', 'sahaaya maaDi, benki', 'Help, fire'), O('ಹೌದು, ಕಾಫಿ ಬೇಡ', 'haudu, kaapi bEDa', 'Yes, no coffee')] },
    { npc: ['ಊಟಕ್ಕೆ ಹೋಗೋಣ್ವಾ?', 'ooTakke hOgONvaa?', 'Shall we go for lunch?'], goal: 'Ask for one minute, then say let us go.',
      opts: [O('ಊಟ ಆಯ್ತು, ಬರಲ್ಲ', 'ooTa aaytu, baralla', "I've eaten, I won't come"), O('ಮೀಟಿಂಗ್ ಇದೆ, ಆಗಲ್ಲ', 'meeting ide, aagalla', "There's a meeting, can't"), O('ಒಂದು ನಿಮಿಷ, ಹೋಗೋಣ', 'ondu nimisha, hOgONa', "One minute, let's go", 1)] },
    { npc: ['ನಿನ್ನೆ ಚೆನ್ನಾಗಿ ಮಾಡಿದ್ರಿ.', 'ninne chennaagi maaDidri.', 'You did well yesterday.'], goal: 'Thank them warmly.',
      opts: [O('ಕ್ಷಮಿಸಿ', 'kshamisi', 'Sorry'), O('ತುಂಬಾ ಧನ್ಯವಾದಗಳು', 'tumbaa dhanyavaadagaLu', 'Thank you very much', 1), O('ಆಗಲ್ಲ', 'aagalla', "It can't be done")] }
  ] },
  smalltalk: { who: 'New acquaintance', whoK: 'ಹೊಸ ಪರಿಚಯ', intro: 'Someone at a function gets curious about you. Keep the chat going.', turns: [
    { npc: ['ನಿಮ್ಮ ಊರು ಯಾವುದು?', 'nimma ooru yaavudu?', 'Which is your home town?'], goal: 'Say your home town is Delhi.',
      opts: [O('ನನ್ನ ಹೆಸರು ರಾಜು', 'nanna hesaru raaju', 'My name is Raju'), O('ನನ್ನ ಊರು ದೆಹಲಿ', 'nanna ooru dehali', 'My home town is Delhi', 1), O('ನಾನು ಮನೆಯಲ್ಲಿ ಇದ್ದೀನಿ', 'naanu maneyalli iddeeni', 'I am at home')] },
    { npc: ['ಇಲ್ಲಿ ಎಷ್ಟು ವರ್ಷದಿಂದ ಇದ್ದೀರಾ?', 'illi eshTu varshadinda iddeeraa?', 'How many years have you been here?'], goal: 'Say you have been here for two years.',
      opts: [O('ಇಲ್ಲಿ ಎರಡು ವರ್ಷದಿಂದ ಇದ್ದೀನಿ', 'illi eraDu varshadinda iddeeni', 'I have been here for two years', 1), O('ಎರಡು ದಿನದಿಂದ ಜ್ವರ', 'eraDu dinadinda jwara', 'Fever for two days'), O('ಎರಡನೇ ಮಹಡಿ', 'eraDanE mahaDi', 'Second floor')] },
    { npc: ['ಬೆಂಗಳೂರು ಇಷ್ಟ ಆಯ್ತಾ?', 'bengaLooru ishTa aaytaa?', 'Do you like Bengaluru?'], goal: 'Say you like it a lot.',
      opts: [O('ಟ್ರಾಫಿಕ್ ಬೇಕು', 'traffic bEku', 'I want traffic'), O('ಇಷ್ಟ ಇಲ್ಲ, ಬರ್ತೀನಿ', 'ishTa illa, barteeni', "Don't like it, bye"), O('ತುಂಬಾ ಇಷ್ಟ ಆಯ್ತು', 'tumbaa ishTa aaytu', 'I like it a lot', 1)] },
    { npc: ['ಕನ್ನಡ ಚೆನ್ನಾಗಿ ಮಾತಾಡ್ತೀರ!', 'kannaDa chennaagi maataaDteera!', 'You speak Kannada well!'], goal: 'Say you know a little and are still learning.',
      opts: [O('ಸ್ವಲ್ಪ ಗೊತ್ತು, ಇನ್ನೂ ಕಲೀತಾ ಇದ್ದೀನಿ', 'swalpa gottu, innoo kaleetaa iddeeni', "I know a little, I'm still learning", 1), O('ಗೊತ್ತಾಗಲಿಲ್ಲ, ಬೇಡ', 'gottaagalilla, bEDa', "Didn't understand, no"), O('ಕನ್ನಡ ಬರಲ್ಲ', 'kannaDa baralla', "I can't speak Kannada")] },
    { npc: ['ಸರಿ, ಮತ್ತೆ ಸಿಗೋಣ.', 'sari, matte sigONa.', "Alright, let's meet again."], goal: 'Agree and say see you.',
      opts: [O('ಒಳಗೆ ಬನ್ನಿ', 'oLage banni', 'Please come in'), O('ಯಾರು?', 'yaaru?', 'Who?'), O('ಆಯ್ತು, ಸಿಗೋಣ', 'aaytu, sigONa', 'Okay, see you', 1)] }
  ] },
  shop: { who: 'Shopkeeper', whoK: 'ಅಂಗಡಿ ಅಣ್ಣ', intro: 'A clothes shop on Commercial Street. Find your colour and size.', turns: [
    { npc: ['ಬನ್ನಿ ಸಾರ್, ಏನು ಬೇಕು?', 'banni saar, Enu bEku?', 'Come in sir, what do you want?'], goal: 'Point at a shirt and ask its price.',
      opts: [O('ಇದು ಯಾರು?', 'idu yaaru?', 'Who is this?'), O('ಇದರ ಬೆಲೆ ಎಷ್ಟು?', 'idara bele eshTu?', "What's the price of this?", 1), O('ಬೆಲೆ ಬೇಡ', 'bele bEDa', "I don't want a price")] },
    { npc: ['ಐನೂರು ರೂಪಾಯಿ.', 'ainooru roopaayi.', '500 rupees.'], goal: 'Ask if there is another colour.',
      opts: [O('ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?', 'bEre baNNa ideyaa?', 'Do you have another colour?', 1), O('ಬೇರೆ ಮನೆ ಇದೆಯಾ?', 'bEre mane ideyaa?', 'Do you have another house?'), O('ಬಣ್ಣ ಬೇಡ', 'baNNa bEDa', "I don't want colour")] },
    { npc: ['ನೀಲಿ, ಕಪ್ಪು ಇದೆ.', 'neeli, kappu ide.', 'There is blue and black.'], goal: 'Ask for the blue one in a bigger size.',
      opts: [O('ಕೆಂಪು, ಚಿಕ್ಕ ಸೈಜ್ ಕೊಡಿ', 'kempu, chikka size koDi', 'Red, a small size please'), O('ಕಪ್ಪು ಬೇಡ, ಹಸಿರು ಕೊಡಿ', 'kappu bEDa, hasiru koDi', 'Not black, give me green'), O('ನೀಲಿ, ದೊಡ್ಡ ಸೈಜ್ ಕೊಡಿ', 'neeli, doDDa size koDi', 'Blue, a bigger size please', 1)] },
    { npc: ['ಇನ್ನೇನು ಬೇಕು?', 'innEnu bEku?', 'Anything else?'], goal: 'Say that is enough and ask if they take cards.',
      opts: [O('ಇನ್ನೂ ಸ್ವಲ್ಪ ಹಾಕಿ', 'innoo swalpa haaki', 'Put a little more'), O('ಸಾಕು. ಕಾರ್ಡ್ ತಗೊಳ್ತೀರಾ?', 'saaku. card tagoLteeraa?', 'Enough. Do you take cards?', 1), O('ದುಡ್ಡು ಇಲ್ಲ, ಬರ್ತೀನಿ', 'duDDu illa, barteeni', 'No money, bye')] }
  ] }
});
