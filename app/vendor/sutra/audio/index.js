// Voice. Every phrase can have a recorded clip, grouped into voice packs
// (audio/<pack>/<clip id>.mp3). This module decides what should be played;
// the shell plays it.
import { hash } from '../core/hash.js';
export const NO_VOICES = { packs: [], fallback: '' };
/** The clip id for a phrase. Stable forever: files are named by it. */
export const clipId = (text) => hash(text);
const isObj = (x) => !!x && typeof x === 'object' && !Array.isArray(x);
const strings = (x) => (Array.isArray(x) ? x.filter((s) => typeof s === 'string') : []);
/**
 * Read audio/manifest.json: { default, packs: { <id>: { label, clips: [ids] } } }.
 * Also accepts the first format, a bare { clips: [ids] }, as a single pack named by `legacy`.
 */
export const readManifest = (json, legacy = { id: 'default', label: 'Default' }) => {
    if (!isObj(json))
        return NO_VOICES;
    if (Array.isArray(json['clips'])) {
        const clips = strings(json['clips']);
        return { packs: clips.length ? [{ id: legacy.id, label: legacy.label, clips: new Set(clips) }] : [], fallback: legacy.id };
    }
    const raw = isObj(json['packs']) ? json['packs'] : {};
    const packs = Object.entries(raw).flatMap(([id, p]) => {
        const clips = isObj(p) ? strings(p['clips']) : [];
        const label = isObj(p) && typeof p['label'] === 'string' && p['label'] ? p['label'] : id;
        return clips.length ? [{ id, label, clips: new Set(clips) }] : [];
    });
    const wanted = json['default'];
    return { packs, fallback: packs.some((p) => p.id === wanted) ? String(wanted) : packs[0]?.id ?? '' };
};
/** The manifest for a set of packs (the inverse of readManifest). Clip ids are sorted for stable diffs. */
export const writeManifest = (packs, fallback) => ({
    default: fallback,
    packs: Object.fromEntries(packs.map((p) => [p.id, { label: p.label, clips: [...p.clips].sort() }])),
});
/** The pack the learner is using: their choice if it exists, otherwise the fallback. */
export const activePack = (v, chosen) => (v.packs.some((p) => p.id === chosen) ? chosen : v.fallback);
/** Which pack holds this clip, trying the preferred pack first. */
export const pickPack = (packs, preferred, clip) => packs.find((p) => p.id === preferred && p.clips.has(clip)) ?? packs.find((p) => p.clips.has(clip));
/** Recorded clip if there is one, else the device voice, else nothing. */
export const plan = (v, text, o) => {
    const clip = clipId(text);
    const pack = pickPack(v.packs, activePack(v, o.chosen ?? ''), clip);
    if (pack)
        return { t: 'clip', url: `${o.base}/${pack.id}/${clip}.${o.ext ?? 'mp3'}`, text };
    return o.deviceVoice ? { t: 'voice', text } : { t: 'silent' };
};
export const canSay = (v, text, o) => plan(v, text, o).t !== 'silent';
