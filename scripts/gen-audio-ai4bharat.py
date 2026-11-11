#!/usr/bin/env python3
"""Generate every audio clip for free with AI4Bharat's open Kannada voice (Indic-TTS:
FastPitch + HiFi-GAN). Runs on a laptop CPU in about 20 minutes. No account, no key.

One-time setup:
    python3 -m venv venv && . venv/bin/activate
    pip install coqui-tts torch torchaudio torchcodec six
    curl -LO https://github.com/AI4Bharat/Indic-TTS/releases/download/v1-checkpoints-release/kn.zip
    unzip kn.zip                      # gives ./kn/fastpitch and ./kn/hifigan (1.5 GB, do not commit)

Run from the repo root (needs ffmpeg):
    node scripts/gen-audio.mjs --export phrases.json
    python scripts/gen-audio-ai4bharat.py --model kn --phrases phrases.json
    node scripts/gen-audio.mjs --list --label ai4bharat-indic-tts-kn-female
    npm run sw

Existing clips are kept (so a human recording with the same name wins) unless --force.
"""
import argparse, json, os, re, subprocess, sys, tempfile

ap = argparse.ArgumentParser()
ap.add_argument('--model', default='kn'); ap.add_argument('--phrases', default='phrases.json')
ap.add_argument('--out', default='app/audio/kn'); ap.add_argument('--speaker', default='female', choices=['female', 'male'])
ap.add_argument('--force', action='store_true'); ap.add_argument('--limit', type=int, default=0)
a = ap.parse_args()

fp, hg = os.path.join(a.model, 'fastpitch'), os.path.join(a.model, 'hifigan')
cfg_path = os.path.join(fp, 'config.json')
raw = open(cfg_path, encoding='utf8').read()  # the released config points at the authors' folder layout
fixed = re.sub(r'"[^"]*speakers\.pth"', json.dumps(os.path.abspath(os.path.join(fp, 'speakers.pth'))), raw)
if fixed != raw: open(cfg_path, 'w', encoding='utf8').write(fixed)
vocab = set(json.loads(fixed)['characters']['characters'])

from TTS.utils.synthesizer import Synthesizer  # noqa: E402
syn = Synthesizer(tts_checkpoint=os.path.join(fp, 'best_model.pth'), tts_config_path=cfg_path, tts_speakers_file=os.path.join(fp, 'speakers.pth'),
                  vocoder_checkpoint=os.path.join(hg, 'best_model.pth'), vocoder_config=os.path.join(hg, 'config.json'), use_cuda=False)

def clean(text):
    t = text.replace('·', ',').replace('…', ',').replace('!', '.')
    t = ''.join(ch for ch in t if ch in vocab)
    t = re.sub(r'\s+', ' ', t).strip()
    return t if re.search(r'[.?,]$', t) else t + '.'   # a final stop keeps the last syllable from being clipped

os.makedirs(a.out, exist_ok=True)
items = json.load(open(a.phrases, encoding='utf8'))
if a.limit: items = items[:a.limit]
made = kept = 0; bad = []
for i, it in enumerate(items):
    dst = os.path.join(a.out, it['hash'] + '.mp3')
    if os.path.exists(dst) and not a.force: kept += 1; continue
    try:
        wav = syn.tts(clean(it['text']), speaker_name=a.speaker)
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f: tmp = f.name
        syn.save_wav(wav, tmp)
        # trim leading/trailing silence, add a short tail, normalise loudness, small mono mp3
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-af',
                        'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.12,loudnorm=I=-18:TP=-2',
                        '-ac', '1', '-ar', '22050', '-b:a', '48k', dst], check=True)
        os.unlink(tmp); made += 1
    except Exception as e:  # keep going; report at the end
        bad.append((it['text'], str(e)[:80]))
    if (i + 1) % 50 == 0: print(f'  {i + 1}/{len(items)}', flush=True)
print(f'made {made}, kept {kept}, failed {len(bad)}')
for t, e in bad: print('  FAILED:', t, '|', e)
sys.exit(1 if bad else 0)
