import confetti from 'canvas-confetti';

/** Respect reduced motion: skip celebratory bursts entirely. */
function motionAllowed() {
  if (typeof window === 'undefined') return false;
  if (document.documentElement.classList.contains('reduce-motion')) return false;
  return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

const LOVE = ['#ff7bc0', '#b25cff', '#ffd479', '#c9b8ff', '#fff4e6'];

export function confettiBurst({ spread = 70, color = LOVE, particleCount = 80 } = {}) {
  if (!motionAllowed()) return;
  confetti({
    particleCount,
    spread,
    origin: { y: 0.6 },
    colors: color,
    scalar: 0.95,
    disableForReducedMotion: true,
  });
}

export function confettiSides() {
  if (!motionAllowed()) return;
  const opts = { particleCount: 45, startVelocity: 32, colors: LOVE, disableForReducedMotion: true };
  confetti({ ...opts, angle: 60, origin: { x: 0, y: 0.7 } });
  confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.7 } });
}

/** Multi-burst celebration used at countdown-zero / final reveal. */
export function celebrate(duration = 2600) {
  if (!motionAllowed()) return () => {};
  const end = Date.now() + duration;
  fireworks();
  const id = window.setInterval(() => {
    if (Date.now() > end) {
      window.clearInterval(id);
      return;
    }
    burstAt(randX(), randY());
  }, 240);
  return () => window.clearInterval(id);
}

function randX() {
  return 0.15 + Math.random() * 0.7;
}
function randY() {
  return 0.2 + Math.random() * 0.5;
}

function burstAt(x, y) {
  confetti({
    particleCount: Math.round(40 + Math.random() * 50),
    spread: 65 + Math.random() * 40,
    startVelocity: 30,
    gravity: 0.9,
    ticks: 160,
    origin: { x, y },
    colors: LOVE,
    shapes: ['square', 'circle'],
    disableForReducedMotion: true,
  });
}

/** A short starry "fireworks" flourish (no long-running loop). */
export function fireworks(times = 3) {
  if (!motionAllowed()) return;
  for (let i = 0; i < times; i++) {
    window.setTimeout(() => burstAt(randX(), randY()), i * 260);
  }
}

/** Gentle golden rain for the final gift. */
export function goldenRain(duration = 3000) {
  if (!motionAllowed()) return () => {};
  const end = Date.now() + duration;
  const colors = ['#ffd479', '#ffe6a3', '#fff4e6', '#ff7bc0'];
  const id = window.setInterval(() => {
    if (Date.now() > end) {
      window.clearInterval(id);
      return;
    }
    confetti({
      particleCount: 14,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.2 },
      colors,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 14,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.2 },
      colors,
      disableForReducedMotion: true,
    });
  }, 180);
  return () => window.clearInterval(id);
}

export function heartBurstAt(clientX, clientY) {
  if (!motionAllowed()) return;
  confetti({
    particleCount: 14,
    spread: 40,
    startVelocity: 18,
    gravity: 1.4,
    ticks: 90,
    origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
    shapes: [confetti.shapeFromPath({ path: 'M10 30 L50 60 L90 30 C90 0 10 0 10 30 Z' })],
    colors: ['#ff7bc0', '#ffb3dd', '#b25cff'],
    disableForReducedMotion: true,
  });
}
