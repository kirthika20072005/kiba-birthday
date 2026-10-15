import { useEffect, useState } from 'react';
import { FINAL } from '../../config/finalReveal.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { VIDEO_MISSING_HINT } from '../../config/videos.js';
import { fireConfetti } from '../effects/ConfettiLayer.jsx';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

const hasEmbed = (v) => !!v.embed;
const hasSrc = (v) => !!v.src;

export default function FinalReveal() {
  const { mark } = useProgress();
  const reduced = useReducedMotion();
  const [stage, setStage] = useState('intro'); // intro | cinema | letter
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('final-cinema', stage === 'cinema');
    return () => document.body.classList.remove('final-cinema');
  }, [stage]);

  const enterCinema = () => {
    setStage('cinema');
    mark('finalSeen');
    window.setTimeout(() => fireConfetti('golden'), 600);
  };

  const toLetter = () => setStage('letter');

  const replay = () => {
    setVideoFailed(false);
    setStage('intro');
    window.setTimeout(() => setStage('cinema'), 200);
  };

  const v = FINAL.video;

  return (
    <SectionShell id="final" labelledBy="final-title" className="final">
      {stage !== 'cinema' && (
        <Reveal className="section-head">
          <span className="kicker">❤️ The last page</span>
          <h2 className="section-title" id="final-title">
            {FINAL.title}
          </h2>
        </Reveal>
      )}

      {stage === 'intro' && (
        <Reveal className="final-intro glass">
          <p className="final-lead">{FINAL.lead}</p>
          <button className="btn btn-hero final-play" onClick={enterCinema}>
            {FINAL.playLabel}
          </button>
          <p className="final-note">{FINAL.note}</p>
        </Reveal>
      )}

      {stage === 'cinema' && (
        <div className={`final-cinema-stage ${reduced ? 'no-motion' : ''}`}>
          <div className="final-frame">
            {hasEmbed(v) ? (
              <iframe
                src={v.embed}
                title={FINAL.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : hasSrc(v) && !videoFailed ? (
              <video
                src={v.src}
                poster={v.poster || undefined}
                controls
                autoPlay
                playsInline
                onError={() => setVideoFailed(true)}
                onEnded={toLetter}
              />
            ) : (
              <div className="final-missing">
                <span className="final-missing-emoji" aria-hidden="true">{v.emoji}</span>
                <p>{VIDEO_MISSING_HINT}</p>
              </div>
            )}
          </div>

          <div className="final-cinema-controls">
            <button className="btn btn-hero" onClick={toLetter}>
              Continue to my last words →
            </button>
            <button className="btn btn-ghost btn-sm" onClick={replay}>
              {FINAL.replayLabel}
            </button>
          </div>
        </div>
      )}

      {stage === 'letter' && (
        <div className="final-letter">
          <Reveal className="final-letter-inner glass">
            <h3 className="final-letter-title">{FINAL.title}</h3>
            {FINAL.letter.map((p, i) => (
              <p
                key={i}
                className="final-letter-para"
                style={{ animationDelay: `${0.3 + i * 0.6}s` }}
              >
                {p}
              </p>
            ))}
            <p className="final-signature">{FINAL.signature}</p>
          </Reveal>
          <Reveal className="final-replay-wrap">
            <button className="btn btn-ghost" onClick={replay}>
              {FINAL.replayLabel}
            </button>
          </Reveal>
        </div>
      )}
    </SectionShell>
  );
}
