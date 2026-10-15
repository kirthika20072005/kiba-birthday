import { useEffect } from 'react';
import { celebrate, confettiBurst, confettiSides, goldenRain } from '../../lib/effects.js';

/**
 * Listens for app-wide celebration events so any section can trigger
 * confetti without prop-drilling.
 *
 *   window.dispatchEvent(new CustomEvent('universe:confetti', {
 *     detail: { kind: 'burst' | 'sides' | 'celebrate' | 'golden' }
 *   }))
 */
export default function ConfettiLayer() {
  useEffect(() => {
    let stop = null;
    const onEvent = (e) => {
      stop?.();
      stop = null;
      switch (e.detail?.kind) {
        case 'sides':
          confettiSides();
          break;
        case 'celebrate':
          stop = celebrate(2600);
          break;
        case 'golden':
          stop = goldenRain(3200);
          break;
        default:
          confettiBurst();
      }
    };

    const onCustom = (e) => onEvent(e);
    window.addEventListener('universe:confetti', onCustom);
    return () => {
      window.removeEventListener('universe:confetti', onCustom);
      stop?.();
    };
  }, []);

  return null;
}

export function fireConfetti(kind = 'burst') {
  window.dispatchEvent(new CustomEvent('universe:confetti', { detail: { kind } }));
}
