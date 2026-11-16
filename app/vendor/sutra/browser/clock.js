/** Read the device clock once. */
export const readClock = () => {
    const d = new Date();
    return { now: d.getTime(), offset: -d.getTimezoneOffset() };
};
/** A fresh seed for the core rng. */
export const freshSeed = () => {
    try {
        return crypto.getRandomValues(new Int32Array(1))[0] ?? 0;
    }
    catch {
        return (Math.random() * 0x7fffffff) | 0;
    }
};
