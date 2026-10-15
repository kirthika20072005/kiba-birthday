import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * A lightweight canvas starfield with twinkle + occasional shooting stars.
 * Pauses when the tab is hidden. Auto-thins on small screens.
 * Add class `fx-canvas` so reduced-motion CSS hides it too.
 */
export default function StarField({ density = 1, className = '' }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return undefined;

    const ctx = canvas.getContext('2d');
    let raf = 0;
    let w = 0;
    let h = 0;
    let stars = [];
    let shooters = [];
    let running = true;

    const isSmall = window.innerWidth < 640;
    const COUNT = Math.round((isSmall ? 90 : 200) * density);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        base: Math.random() * 0.6 + 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
        hue: Math.random() < 0.25 ? 40 : Math.random() < 0.5 ? 280 : 330,
      }));
    }

    function maybeShoot() {
      if (shooters.length < 2 && Math.random() < 0.01) {
        shooters.push({
          x: Math.random() * w * 0.9,
          y: Math.random() * h * 0.4,
          len: 0,
          maxLen: 120 + Math.random() * 120,
          vx: 4 + Math.random() * 4,
          vy: 1.4 + Math.random() * 1.6,
          life: 1,
        });
      }
    }

    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        const tw = s.base + Math.sin(t * 0.001 * s.speed + s.phase) * 0.3;
        const a = Math.max(0.05, Math.min(1, tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.hue === 40 ? '#ffd479' : s.hue === 280 ? '#c9b8ff' : '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting stars
      maybeShoot();
      ctx.lineCap = 'round';
      for (const sh of shooters) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.len = Math.min(sh.maxLen, sh.len + 8);
        sh.life -= 0.012;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.len, sh.y - sh.len * 0.35);
        grad.addColorStop(0, `rgba(255,255,255,${Math.max(0, sh.life)})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.len, sh.y - sh.len * 0.35);
        ctx.stroke();
      }
      shooters = shooters.filter((s) => s.life > 0 && s.x < w + 200);

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced, density]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fx-canvas ${className}`}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  );
}
