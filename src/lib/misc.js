/** Small shared helpers. */

export const uid = (() => {
  let n = 0;
  return (prefix = 'id') => `${prefix}-${++n}`;
})();

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const rand = (min, max) => Math.random() * (max - min) + min;
export const randInt = (min, max) => Math.floor(rand(min, max + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Fisher–Yates (returns a new array). */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/** Smooth-scroll to an in-page hash target. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.focus?.({ preventScroll: true });
}

/** Case/space-insensitive comparison used by quiz + hunt answers. */
export function normalize(str) {
  return String(str ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}

export function matchesAnswer(input, answer, alts = []) {
  const base = normalize(input);
  if (!base) return false;
  const candidates = [answer, ...alts].map(normalize);
  return candidates.includes(base);
}

/** True when the value looks like an in-page anchor or external URL. */
export function isExternalLink(href) {
  return /^(https?:)?\/\//i.test(href || '');
}
