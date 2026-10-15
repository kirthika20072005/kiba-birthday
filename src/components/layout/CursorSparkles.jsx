import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * Desktop-only pointer sparkle trail.
 * Purely decorative: no effect on layout or a11y, disabled on coarse
 * pointers and under reduced motion.
 */
export default function CursorSparkles() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    if (reduced) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const wide = window.innerWidth >= 900;
    if (!fine || !wide) return undefined;
    setEnabled(true);

    const onMove = (e) => {
      const now = performance.now();
      if (now - last.current < 70) return;
      last.current = now;
      const el = document.createElement('span');
      el.className = 'spark';
      el.setAttribute('aria-hidden', 'true');
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      document.body.appendChild(el);
      window.setTimeout(() => el.remove(), 700);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  return enabled ? null : null;
}
