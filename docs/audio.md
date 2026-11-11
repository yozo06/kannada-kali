# Audio

The app plays a phrase from the first source that exists:

1. a bundled clip, `app/audio/kn/<hash>.mp3`, listed in `app/audio/manifest.json`
2. the device's own Kannada text-to-speech voice (most Android phones; rarely on iOS/desktop)
3. nothing: the speaker buttons and listening questions simply do not appear

So the game is fully playable silent, and gets better as audio is added.

## Generate clips (about five minutes, free)

There are roughly 780 phrases and 7,700 characters in total. Google Cloud Text-to-Speech has a Kannada
(kn-IN) voice and its free tier covers this many times over.

1. In Google Cloud Console create a project, enable **Cloud Text-to-Speech API**, and create an **API key**
   (APIs & Services → Credentials). Restrict the key to that API.
2. Run:

   ```bash
   GOOGLE_TTS_KEY=your-key npm run audio
   npm run sw          # refresh the offline file list
   ```

3. Commit `app/audio/`. Clips total a few megabytes.

Options: `--voice kn-IN-Wavenet-B` (A/C are female, B/D male; `kn-IN-Standard-*` also exist), `--rate 0.9`,
`--force` to redo everything, `--list` to count without generating.

Never commit the key. It is only read from the environment.

## Human recordings

A clip recorded by a native speaker beats any synthetic voice. File names are the 8-character hash of the
phrase (`hash()` in `app/js/util.js`). Drop an MP3 with the right name into `app/audio/kn/` and the generator
will leave it alone; then run `npm run audio -- --list` to rebuild the manifest and `npm run sw`.

## Offline

The service worker keeps each clip the first time it is played. "Keep all audio for offline use" on the
You tab downloads the rest in one go.
