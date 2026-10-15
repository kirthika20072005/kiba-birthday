import { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * CSS-driven floating emoji particles (hearts, petals, etc.).
 * Cheap on mobile — no canvas, pure compositing animations.
 * Honours reduced motion by rendering nothing.
 */
export default function ParticleField({
  emoji = '❤️',
  count = 14,
  type = 'hearts',
  className = '',
  opacity = 0.5,
}) {
  const reduced = useReducedMotion();

  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        size: 12 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 120,
        rotate: (Math.random() - 0.5) * 60,
        char: Array.isArray(emoji) ? emoji[i % emoji.length] : emoji,
      })),
    [count, emoji]
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`particle-field particle-${type} ${className}`}
      style={{ opacity }}
    >
      {items.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--rot': `${p.rotate}deg`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
