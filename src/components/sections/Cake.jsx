import { useState } from 'react';
import { HIS } from '../../config/site.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import Typewriter from '../ui/Typewriter.jsx';
import { fireConfetti } from '../effects/ConfettiLayer.jsx';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

const CANDLE_COUNT = 5;

export default function Cake() {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(() => Array.from({ length: CANDLE_COUNT }, () => true));
  const [wished, setWished] = useState(false);

  const litCount = lit.filter(Boolean).length;
  const allOut = litCount === 0;

  const blow = (i) => {
    if (!lit[i]) return;
    const next = lit.map((v, idx) => (idx === i ? false : v));
    setLit(next);
    if (!next.some(Boolean)) {
      setWished(true);
      fireConfetti('celebrate');
    }
  };

  const blowAll = () => {
    setLit(Array.from({ length: CANDLE_COUNT }, () => false));
    setWished(true);
    fireConfetti('celebrate');
  };

  const relight = () => {
    setLit(Array.from({ length: CANDLE_COUNT }, () => true));
    setWished(false);
  };

  return (
    <SectionShell id="cake" labelledBy="cake-title" className="cake-section">
      <Reveal className="section-head">
        <span className="kicker">Make a wish</span>
        <h2 className="section-title" id="cake-title">
          Blow out the candles
        </h2>
        <p className="section-sub">
          {allOut
            ? 'Wish made. I hope every single one of them comes true.'
            : `Tap each flame to blow it out${reduced ? '' : ' — the candles flicker for you'}.`}
        </p>
      </Reveal>

      <Reveal className="cake-wrap">
        <div className={`cake ${allOut ? 'cake-dark' : ''}`} aria-hidden="true">
          {/* candles */}
          <div className="candles">
            {lit.map((isLit, i) => (
              <button
                key={i}
                type="button"
                className={`candle ${isLit ? 'is-lit' : 'is-out'}`}
                onClick={() => blow(i)}
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                style={{ '--ci': i }}
              >
                <span className="candle-flame" />
                <span className="candle-stick" />
              </button>
            ))}
          </div>
          {/* cake body */}
          <div className="cake-tier tier-top">
            <span className="icing" />
            <span className="drip" />
          </div>
          <div className="cake-tier tier-bottom">
            <span className="icing" />
            <span className="sprinkles">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} style={{ '--si': i }} />
              ))}
            </span>
          </div>
          <div className="cake-plate" />
        </div>
      </Reveal>

      <Reveal className="cake-controls">
        {!allOut ? (
          <button className="btn btn-primary" onClick={blowAll}>
            Blow them all out at once
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={relight}>
            Light them again
          </button>
        )}
      </Reveal>

      {wished && (
        <Reveal className="cake-wish glass">
          <Typewriter
            text={
              reduced
                ? `Happy birthday, ${HIS}. I wished for you — but I already have you, so I wished for us.`
                : `Happy birthday, ${HIS}. I wished for you — but I already have you, so I wished for us.`
            }
            speed={38}
          />
        </Reveal>
      )}
    </SectionShell>
  );
}
