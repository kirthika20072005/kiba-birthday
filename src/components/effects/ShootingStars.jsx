import ParticleField from './ParticleField.jsx';

/** A small galaxy band: tiny stars + the occasional sparkle. */
export default function ShootingStars({ count = 18, opacity = 0.7 }) {
  return <ParticleField shape="glyphs" count={count} type="stars" opacity={opacity} />;
}
