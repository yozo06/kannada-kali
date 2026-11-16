// One Indian script to another. The Unicode blocks for the major Indian scripts
// share a layout, so most letters convert by moving to the same position in the
// other block. Where a script lacks a letter, a per-script table picks the nearest.
//
// Use it to show pronunciation in the script a learner already reads. The result
// is a faithful letter-for-letter rendering, not a spelling a native writer would
// always choose: have a reader of the target script check anything you publish.
export const SCRIPTS = {
    devanagari: 0x0900,
    bengali: 0x0980,
    gurmukhi: 0x0a00,
    gujarati: 0x0a80,
    odia: 0x0b00,
    tamil: 0x0b80,
    telugu: 0x0c00,
    kannada: 0x0c80,
    malayalam: 0x0d00,
};
const BLOCK = 0x80;
const DANDA = [0x64, 0x65]; // । and ॥ live in the Devanagari block and are shared by all scripts
const FIXES = {
    // Odia has no short e/o (they merge with the long ones), writes v as ୱ, and has one r and one hard l.
    // The last four are Devanagari's letters for English vowels (ऍ ऑ ॅ ॉ): Odia's own "a" already has
    // the sound of English "o" in "office", so ऑ becomes ଅ and the sign ॉ is dropped.
    odia: { 0x0e: 0x0f, 0x12: 0x13, 0x46: 0x47, 0x4a: 0x4b, 0x35: 0x71, 0x31: 0x30, 0x34: 0x33, 0x0d: 0x0f, 0x11: 0x05, 0x45: 0x47, 0x49: null },
};
/** Which script a character belongs to, if any. */
export const scriptOf = (ch) => {
    const cp = ch.codePointAt(0) ?? 0;
    return Object.keys(SCRIPTS).find((s) => cp >= SCRIPTS[s] && cp < SCRIPTS[s] + BLOCK);
};
/** Rewrite the letters of script `from` in script `to`. Everything else passes through. Joiners are removed. */
export const transliterate = (text, from, to) => {
    if (from === to)
        return text;
    const [src, dst, fixes] = [SCRIPTS[from], SCRIPTS[to], FIXES[to] ?? {}];
    let out = '';
    for (const ch of String(text).replace(/[\u200c\u200d]/g, '')) {
        const cp = ch.codePointAt(0) ?? 0;
        const off = cp - src;
        if (off < 0 || off >= BLOCK || (from === 'devanagari' && DANDA.includes(off))) {
            out += ch;
            continue;
        }
        const fixed = off in fixes ? fixes[off] : off;
        if (fixed !== null && fixed !== undefined)
            out += String.fromCodePoint(dst + fixed);
    }
    return out;
};
