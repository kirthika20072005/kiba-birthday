import { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

const PETAL_COLORS = ['#ff8fb3', '#ffb3dd', '#ff6b9d', '#ffc4e3'];

/**
 * CSS-driven floating particles (hearts, petals, star glyphs).
 * Cheap on mobile — no canvas, pure compositing animations.
 * Honours reduced motion by rendering nothing.
 *
 * shape: 'glyphs' (text symbols) | 'hearts' (CSS hearts) | 'petals' (CSS petals)
 */
export default function ParticleField({
  shape = 'glyphs',
  glyphs = ['✦', '✧', '⋆'],
  colors = PETAL_COLORS,
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
        glyph: glyphs[i % glyphs.length],
        color: colors[i % colors.length],
      })),
    [count, glyphs, colors]
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
          {shape === 'hearts' ? (
            <i
              className="shape-heart"
              style={{ width: `${p.size * 0.9}px`, height: `${p.size * 0.9}px` }}
            />
          ) : shape === 'petals' ? (
            <i
              className="shape-petal"
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.2}px`,
                background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`,
                transform: `rotate(${p.rotate}deg)`,
              }}
            />
          ) : (
            p.glyph
          )}
        </span>
      ))}
    </div>
  );
}
