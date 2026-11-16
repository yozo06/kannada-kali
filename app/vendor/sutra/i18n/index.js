export * from './indic.js';
/** Replace {name} holes in a template. Unknown holes are left as they are. */
export const fill = (template, vars) => vars ? template.replace(/\{([a-zA-Z0-9_]+)\}/g, (hole, name) => (name in vars ? String(vars[name]) : hole)) : template;
/** Text for a key, falling back to `fallback` (by default the key itself). */
export const translate = (dict, key, vars, fallback = key) => {
    const hit = dict[key];
    return fill(hit !== undefined && hit.trim() !== '' ? hit : fallback, vars);
};
/** A translator bound to one dictionary: `const t = translator(hi); t('Start')`. */
export const translator = (dict) => (key, vars, fallback) => translate(dict, key, vars, fallback);
/** The {holes} in a string, sorted. */
export const holes = (s) => (s.match(/\{[a-zA-Z0-9_]+\}/g) ?? []).slice().sort();
/** How completely `dict` translates `base`. */
export const coverage = (base, dict) => {
    const keys = Object.keys(base);
    const has = (k) => (dict[k] ?? '').trim() !== '';
    return {
        total: keys.length,
        have: keys.filter(has).length,
        missing: keys.filter((k) => !has(k)),
        broken: keys.filter((k) => has(k) && holes(base[k] ?? '').join() !== holes(dict[k] ?? '').join()),
        unknown: Object.keys(dict).filter((k) => !(k in base)),
    };
};
