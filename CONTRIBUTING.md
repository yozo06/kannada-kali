# Contributing

The bottleneck is good Kannada, not code. In rough order of value:

1. **Corrections from Kannada speakers.** If a phrase is wrong, stiff, or not how Bengaluru says it, open an
   issue or a pull request against the file in `app/content/`. Say where you learned your Kannada; usage varies by region.
2. **Recorded audio** for phrases (see `docs/audio.md`).
3. **New stops** from the gaps listed in `docs/curriculum.md`. Follow `docs/content-guide.md`.
4. Code. Keep the rules: no runtime network dependency, no accounts, engine logic stays pure and tested
   (`app/js/engine/`, `tests/`), no build step for the site.

Before a pull request: `npm run check` must pass, and run `npm run sw` if you changed anything under `app/`.

Card ids are permanent. Players' progress is keyed by them.
