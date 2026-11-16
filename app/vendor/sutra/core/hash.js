// A stable name for a piece of text. Voice clips are stored under this name,
// so it must never change: the same phrase must hash the same way forever.
/** 32-bit FNV-1a of the text, as 8 hex characters. Joiners are dropped and spaces collapsed first. */
export const hash = (text) => {
    const s = String(text).replace(/[‌‍]/g, '').replace(/\s+/g, ' ').trim();
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
};
