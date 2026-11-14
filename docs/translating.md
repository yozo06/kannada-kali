# Teaching languages

The Kannada in the lessons never changes. What can change is the language it is *taught in*:
meanings, notes, goals and the whole interface, plus the script used to show pronunciation.

| Language | File | Pronunciation shown in |
|---|---|---|
| English | (built in) | Roman, using the key in `content-guide.md` |
| Hindi | `app/content/i18n/hi.js` | Devanagari |
| Odia | `app/content/i18n/or.js` | Odia script |

A learner picks the language on the welcome screen or under You → Settings. It is stored per player.

## How it works

- `app/js/i18n.js` holds the switch. `setLang()` swaps every lesson string in place; `tx('English text')`
  translates interface text, with the English itself as the key.
- Pronunciation is **not translated by hand**. Kannada, Devanagari and Odia share one Unicode layout, so
  `toScript()` in `app/js/engine/translit.js` converts letter for letter. Devanagari keeps Kannada's short
  e and o with the signs ऎ ऒ; Odia has no such pair, so short and long look the same there.
- When pronunciation is in the learner's own script, typing questions and "Devanagari twin" questions are
  switched off (they would be either impossible or trivial).
- Anything not translated falls back to English, so a half-finished language still works.

## Fixing a translation

Open `app/content/i18n/<lang>.js`, find the key, change the text. Keys:

`c.<card id>.e` meaning · `c.<card id>.n` note · `s.<stop>.en` stop name · `d.<chat>.<turn>.goal` chat goal ·
`ui:<English text>` interface string. Keep `{n}`-style placeholders exactly.

Then `npm run i18n` (coverage and broken entries) and `npm run sw`.

## After changing lessons

New or edited English strings show up as untranslated:

```bash
npm run i18n -- --missing hi > todo.hi.json     # { key: English } still needing Hindi
```

Translate the values, merge them into `hi.js`, run `npm run i18n` again.
If you *reword* an English lesson string its key stays the same, so check its translations by hand.
Rewording an interface string changes its key; the old entry is reported as unknown and must be re-keyed.

## Adding a language

1. `node scripts/export-strings.mjs > strings.en.json` and translate the values into `app/content/i18n/<id>.js`
   (`export default { "key": "text", … }`).
2. Register it in `LANGS` and `DICTS` in `app/js/i18n.js` and import it in `scripts/check-i18n.mjs`.
3. Pronunciation script: if the learners read a script in the same Unicode family (Bengali, Gujarati, Telugu,
   Tamil…), add its block to `toScript()`; otherwise use `pron: 'roman'`.
4. Bundle a font for it in `app/fonts` and `app/css/fonts.css`.

## Status

Hindi and Odia were machine-translated with care and automatically checked for completeness and
placeholders. **Neither has been proofread by a native speaker yet**; Odia most needs it. Corrections welcome.
