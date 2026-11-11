# Kannada Kali · ಕನ್ನಡ ಕಲಿ

A game for learning **spoken Bengaluru Kannada**, built for people who already know Hindi or Marathi.
You ride a metro map: each stop is a real situation (auto stand, darshini, delivery call, landlord, doctor),
each ride is a five-minute quiz, and every mistake adds ₹10 to the fare meter.

- **Offline-first.** A static web app (PWA). Install it to a phone's home screen and it runs with no network.
- **No accounts, no server, no AI at runtime.** All lessons are data files in this repo; all game logic is plain, tested JavaScript. Progress stays on the device, with a copy-paste save code to back it up or move it.
- **Uses what you know.** Sanskrit cognates are taught as "free words", grammar is explained against Hindi/Marathi, and the script is taught through its Devanagari twins.

## Play

Hosted copy: enable GitHub Pages for this repo (Settings → Pages → Source: **GitHub Actions**) and the `deploy` workflow publishes `app/`.

Locally:

```bash
npm start            # serves app/ on http://localhost:8080 (Node 20+; no install needed)
```

## What is in it

| | |
|---|---|
| 5 lines, 42 stops + interchange | Survive · Settle in · Build sentences · Live here · Read |
| 438 phrase cards | every one with script, Roman, English and a teaching note |
| 92 script cards | vowels, consonants, vowel signs, stacked letters, real boards |
| 11 boss chats | branching dialogues: auto driver, vendor, delivery, landlord, doctor… |
| Drill | spaced repetition (1, 2, 4, 8, 16 days) and a "trouble words" round |
| Forge | 10 sentence frames × 28 nouns |
| Lab | sound key, script twins, street-board reader, look-alike traps, grammar notes, phrasebook |
| Game layer | XP, levels, streaks with freezes, 3 daily quests, real-life field missions, 19 badges, local player profiles |

Full syllabus and what is still missing: [docs/curriculum.md](docs/curriculum.md).

## Layout

```
app/                 the whole deployable site (no build step)
  index.html  sw.js  manifest.webmanifest
  content/           lessons as plain data: core, grammar, life, script, lab, forge, guide
  js/engine/         pure logic: srs, progress, questions, session, translit  (unit-tested)
  js/ui/             rendering and event handling
  js/store.js        profiles and save codes     js/audio.js   clips → device voice fallback
  audio/             manifest.json + kn/<hash>.mp3 clips (generated, optional)
scripts/             validate-content, build-sw, gen-audio, build-artifact, serve
tests/               node --test
docs/                curriculum, content guide, audio
```

## Develop

```bash
npm run check        # content validation + unit tests + offline file list is current
npm run sw           # regenerate app/sw.js after changing anything under app/
npm run audio        # generate audio clips (needs GOOGLE_TTS_KEY, see docs/audio.md)
npm install && npm run artifact   # optional single-file build in dist/
```

Adding or fixing lessons needs no programming: see [docs/content-guide.md](docs/content-guide.md).
The validator refuses any Roman spelling that does not match its Kannada script, so typos are caught in CI.

## Audio

Out of the box the app speaks through the device's Kannada voice where one exists (most Android phones).
For audio on every device and offline, generate clips once with `npm run audio`; details in [docs/audio.md](docs/audio.md).

## Licence

Code: MIT ([LICENSE](LICENSE)). Lesson content under `app/content/`: CC BY-SA 4.0 ([LICENSE-content](LICENSE-content)).
Fonts: SIL OFL 1.1 ([app/fonts/README.md](app/fonts/README.md)).

Corrections from Kannada speakers are the most valuable contribution. See [CONTRIBUTING.md](CONTRIBUTING.md).
