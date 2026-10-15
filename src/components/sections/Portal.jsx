import { useState } from 'react';
import { SITE, HIS } from '../../config/site.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useMusic } from '../../context/MusicContext.jsx';
import { scrollToId } from '../../lib/misc.js';
import { fireConfetti } from '../effects/ConfettiLayer.jsx';
import ShootingStars from '../effects/ShootingStars.jsx';

/**
 * The very first thing he sees. The Enter button is the user gesture
 * that legally unlocks audio — we call music.play() on the same click.
 */
export default function Portal() {
  const { state, mark } = useProgress();
  const { play } = useMusic();
  const [entered, setEntered] = useState(state.entered);

  const enter = () => {
    mark('entered', true);
    setEntered(true);
    try {
      play(); // gesture-gated autoplay
    } catch {
      /* audio is optional */
    }
    fireConfetti('celebrate');
    window.setTimeout(() => scrollToId('countdown'), 380);
  };

  return (
    <section
      id="portal"
      className={`section portal ${entered ? 'is-entered' : ''}`}
      aria-label="Welcome"
    >
      <ShootingStars count={22} opacity={0.8} />
      <div className="portal-inner">
        <p className="portal-eyebrow">{SITE.portalMessage}</p>

        <h1 className="portal-title">
          <span className="portal-for">A little universe for</span>
          <span className="portal-name">{HIS}</span>
        </h1>

        <div className="portal-orb" aria-hidden="true">
          <span className="orb-core" />
          <span className="orb-ring r1" />
          <span className="orb-ring r2" />
          <span className="orb-ring r3" />
        </div>

        <p className="portal-tag">
          A hundred quiet things I never said out loud, arranged into stars.
        </p>

        <button className="btn btn-hero" onClick={enter}>
          <span className="btn-glow" aria-hidden="true" />
          {entered ? 'Enter again ❤️' : SITE.portalEnterLabel}
        </button>

        <p className="portal-hint">Best experienced with sound on. 🎧</p>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>scroll</span>
        <span className="scroll-dot" />
      </div>
    </section>
  );
}
