# Audio

The app plays a phrase from the first source that exists:

1. a bundled clip, `app/audio/kn/<hash>.mp3`, listed in `app/audio/manifest.json`
2. the device's own Kannada text-to-speech voice (most Android phones; rarely on iOS/desktop)
3. nothing: the speaker buttons and listening questions simply do not appear

So the game is fully playable silent, and gets better as audio is added.

## The bundled clips

The clips in `app/audio/kn/` were generated once with **AI4Bharat Indic-TTS** (Kannada FastPitch + HiFi-GAN,
female voice), an open model from IIT Madras that runs on an ordinary CPU. No account, no key, no cost.
They are committed to the repo, so players never call any speech service.

It is a synthetic voice: clear, but flatter than a person, and it reads English loanwords with a Kannada
accent. Single letters and very short words are its weakest spot.

## Regenerate after changing lessons

Clips are named by a hash of the phrase, so only new or edited phrases need making.
Setup and commands are at the top of [`scripts/gen-audio-ai4bharat.py`](../scripts/gen-audio-ai4bharat.py):

```bash
node scripts/gen-audio.mjs --export phrases.json
python scripts/gen-audio-ai4bharat.py --model kn --phrases phrases.json
node scripts/gen-audio.mjs --list --label ai4bharat-indic-tts-kn-female
npm run sw
```

Check the model's licence at https://github.com/AI4Bharat/Indic-TTS before redistributing clips in a
commercial product.

### Alternative: Google Cloud TTS

`GOOGLE_TTS_KEY=your-key npm run audio` uses Google's kn-IN voices instead (free tier is ample, but Google
requires a billing account). Options: `--voice kn-IN-Wavenet-B`, `--rate 0.9`, `--force`.
Never commit the key.

## Human recordings

A clip recorded by a native speaker beats any synthetic voice. File names are the 8-character hash of the
phrase (`hash()` in `app/js/util.js`). Drop an MP3 with the right name into `app/audio/kn/` and the generator
will leave it alone; then run `npm run audio -- --list` to rebuild the manifest and `npm run sw`.

## Offline

The service worker keeps each clip the first time it is played. "Keep all audio for offline use" on the
You tab downloads the rest in one go.
