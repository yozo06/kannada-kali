# Writing and fixing lessons

All lessons are plain data in `app/content/`. You do not need to touch any other code.
After any change run `npm run check` (and `npm run sw` before committing).

## A card

```js
add('dr7', 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', 'ondu kaapi koDi', 'One coffee, please', 'koDi = give (polite).', '');
//   id     Kannada script     Roman              English               teaching note        Hindi/Marathi cognate (Devanagari)
```

- **id**: short and unique. Never reuse or rename an id: players' progress is stored against it.
- **Kannada**: spoken Bengaluru forms. Words separated by single spaces.
- **Roman**: one Roman word per Kannada word (the sentence-building game relies on this).
- **Note**: one or two short sentences. Compare with Hindi/Marathi when it helps. Say nothing you are not sure of.
- **Cognate**: only when the meaning really is the same. "Looks similar, means something else" belongs in `TRAPS` in `lab.js`.

Then list the id in a station's `cards` array. A station needs at least 6 cards; 11 to 14 works best.

## The Roman scheme

The validator (`npm run validate`) transliterates the script and rejects any Roman word that differs.

| Roman | Kannada | Notes |
|---|---|---|
| a aa i ee u oo | ಅ ಆ ಇ ಈ ಉ ಊ | doubled = long |
| e **E** o **O** | ಎ ಏ ಒ ಓ | capital = long (Hindi ए ओ); small = short, no Hindi equivalent |
| ai au | ಐ ಔ | |
| t d n l | ತ ದ ನ ಲ | dental |
| **T D N L** | ಟ ಡ ಣ ಳ | retroflex (ट ड ण ळ) |
| kh gh chh jh Th Dh th dh ph bh | aspirates | |
| sh | ಶ and ಷ | |
| anusvara ಂ | n, N or m | takes the class of the next consonant; m at the end of a word |
| w | ವ | `w` and `v` are both accepted (swalpa) |

**English loanwords** are written in normal English spelling (`ticket`, `Majestic-ge`). Each such pair must be
listed in `app/content/loans.js`, otherwise the validator flags it. A case ending on a loan is joined with a
hyphen in Roman and a zero-width non-joiner (U+200C) in script: `ಆಫೀಸ್‌ಗೆ` / `office-ge`.

## Dialogues, frames, missions

- `DIALOGS` (in `core.js`, `life.js`): each turn has the other person's line, a goal in English, and three
  options built with `O(k, r, e, isCorrect)`. Exactly one is correct. Wrong options should be real Kannada that
  is wrong *for the goal*, never broken Kannada.
- `FRAMES` / `NOUNS` (`forge.js`): a frame is a tail (`ಕೊಡಿ`) plus an English template using `{n}` (noun with
  article) or `{b}` (bare noun). Only pair a frame with nouns that make sense.
- `MISSIONS` (`guide.js`): something to do in the real world today, plus the phrase for it.

## Script cards

`script.js` uses `L(id, letter, sound, devanagariTwin, [exampleWord, roman, meaning], note)` for letters and
`W(id, word, roman, meaning)` for signboard words.

## Audio

Clips are keyed by the Kannada text, so editing a phrase means its clip must be regenerated:
`npm run audio` makes whatever is missing. See [audio.md](audio.md).
