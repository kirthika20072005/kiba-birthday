import { useState } from 'react';
import { MAIN_LETTER } from '../../config/letters.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import Envelope from '../ui/Envelope.jsx';
import Typewriter from '../ui/Typewriter.jsx';
import RosePetals from '../effects/RosePetals.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { fireConfetti } from '../effects/ConfettiLayer.jsx';

export default function Letter() {
  const { has, mark } = useProgress();
  const [open, setOpen] = useState(() => has('openedLetters', 'main'));
  const [typed, setTyped] = useState(false);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      mark('openedLetters', 'main');
      window.setTimeout(() => fireConfetti('sides'), 400);
    }
  };

  return (
    <SectionShell id="letter" labelledBy="letter-title" className="letter-section">
      <RosePetals count={8} opacity={0.35} />
      <Reveal className="section-head">
        <span className="kicker">💌 Sealed with everything</span>
        <h2 className="section-title" id="letter-title">
          A Letter For You
        </h2>
        <p className="section-sub">The whole reason this universe exists, really.</p>
      </Reveal>

      <Reveal className="letter-envelope-wrap">
        <Envelope
          open={open}
          onToggle={toggle}
          name={MAIN_LETTER.envelopeName}
          sealEmoji="💌"
          hue={340}
          variant="hero"
          hint="Tap to break the seal"
        >
          <article className="letter">
            <header className="letter-head">
              <Typewriter
                text={MAIN_LETTER.openLine}
                speed={42}
                start={open}
                onDone={() => setTyped(true)}
              />
            </header>

            {MAIN_LETTER.paragraphs.map((p, i) => (
              <p
                key={i}
                className="letter-para"
                style={{
                  opacity: typed ? 1 : 0,
                  transitionDelay: `${0.15 + i * 0.25}s`,
                }}
              >
                {p}
              </p>
            ))}

            <footer className="letter-foot">
              <p className="letter-signoff">{MAIN_LETTER.signOff}</p>
              <p className="letter-signature">{MAIN_LETTER.signature}</p>
              {MAIN_LETTER.ps && <p className="letter-ps">{MAIN_LETTER.ps}</p>}
            </footer>
          </article>
        </Envelope>
      </Reveal>
    </SectionShell>
  );
}
