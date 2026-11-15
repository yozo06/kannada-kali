# Audio

The app plays a phrase from the first source that exists:

1. a bundled clip, `app/audio/kn/<hash>.mp3`, listed in `app/audio/manifest.json`
2. the device's own Kannada text-to-speech voice (most Android phones; rarely on iOS/desktop)
3. nothing: the speaker buttons and listening questions simply do not appear

So the game is fully playable silent, and gets better as audio is added.

## Voice packs

Clips live in packs, one folder per voice: `app/audio/<pack>/<hash>.mp3`. `manifest.json` lists them.
When more than one pack is bundled, players choose under **You → Settings → Voice**; the first pack in
the manifest is the default, and a phrase missing from the chosen pack falls back to another pack.

| Pack | Folder | Made with | Notes |
|---|---|---|---|
| Sarvam | `audio/sarvam/` | Sarvam AI Bulbul (kn-IN) | Natural-sounding. Needs an API key once, to generate. Default when present. |
| AI4Bharat | `audio/kn/` | AI4Bharat Indic-TTS, female | Free and open, runs on a laptop. Clear but robotic. |

Either way the clips are committed to the repo, so players never call a speech service.

## Sarvam pack

The syllabus is about 7,700 characters, which costs roughly ₹25 at Sarvam's listed rate; new accounts
get free credits that cover it. Check Sarvam's terms before redistributing the audio commercially.

**On GitHub (no setup):** create a key at https://dashboard.sarvam.ai, add it as the repository secret
`SARVAM_API_KEY` (Settings → Secrets and variables → Actions), then Actions → **audio-sarvam** → Run workflow.
Tick *sample* first to hear six clips in a voice before paying for all of them. The workflow commits the
clips and republishes the site.

**On your machine:**

```bash
SARVAM_API_KEY=sk_... npm run audio:sarvam -- --sample --speaker ritu   # try a voice
SARVAM_API_KEY=sk_... npm run audio:sarvam                              # everything
npm run sw
```

Options: `--speaker` (e.g. ritu, kavya, priya, roopa, rahul, amit), `--pace 0.9`, `--model bulbul:v3`, `--force`.
Never commit the key.

## AI4Bharat pack

The clips in `app/audio/kn/` were generated once with **AI4Bharat Indic-TTS** (Kannada FastPitch + HiFi-GAN,
female voice), an open model that runs on an ordinary CPU. No account, no key, no cost.
It is a synthetic voice: clear, but flatter than a person, and it reads English loanwords with a Kannada
accent. Single letters and very short words are its weakest spot.

## Regenerate after changing lessons

Clips are named by a hash of the phrase, so only new or edited phrases need making.
Setup and commands are at the top of [`scripts/gen-audio-ai4bharat.py`](../scripts/gen-audio-ai4bharat.py):

```bash
node scripts/gen-audio.mjs --export phrases.json
python scripts/gen-audio-ai4bharat.py --model kn --phrases phrases.json
node scripts/gen-audio.mjs --list          # rebuilds manifest.json
npm run sw
```

Check the model's licence at https://github.com/AI4Bharat/Indic-TTS before redistributing clips in a
commercial product.

### Alternative: Google Cloud TTS

`GOOGLE_TTS_KEY=your-key npm run audio` writes a third pack, `audio/google/`, with Google's kn-IN voices (free tier is ample, but Google
requires a billing account). Options: `--voice kn-IN-Wavenet-B`, `--rate 0.9`, `--force`.
Never commit the key.

## Human recordings

A clip recorded by a native speaker beats any synthetic voice. File names are the 8-character hash of the
phrase (`hash()` in `app/js/util.js`). Drop an MP3 with the right name into a pack folder (or a new folder such as `app/audio/human/`) and the generator
will leave it alone; then run `npm run audio -- --list` to rebuild the manifest and `npm run sw`.

## Offline

The service worker keeps each clip the first time it is played. "Keep all audio for offline use" on the
You tab downloads the rest in one go.
