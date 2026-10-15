import ParticleField from './ParticleField.jsx';

/** Falling rose petals — a decorative overlay for the letter sections. */
export default function RosePetals({ count = 16, opacity = 0.6 }) {
  return (
    <ParticleField
      emoji={['🌹', '🌸', '🌺', '💮']}
      count={count}
      type="petals"
      opacity={opacity}
    />
  );
}
