import { useMemo, useState } from 'react';
import { GIFTS } from '../../config/gifts.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import GiftBox from '../ui/GiftBox.jsx';
import Modal from '../ui/Modal.jsx';
import Icon from '../ui/Icon.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { scrollToId } from '../../lib/misc.js';
import { fireConfetti } from '../effects/ConfettiLayer.jsx';

export default function Gifts() {
  const { state, mark } = useProgress();
  const opened = useMemo(() => new Set(state.gifts), [state.gifts]);
  const [activeId, setActiveId] = useState(null);

  const active = activeId ? GIFTS.find((g) => g.id === activeId) : null;

  const openGift = (g) => {
    setActiveId(g.id);
    if (!opened.has(g.id)) {
      mark('gifts', g.id);
      const kind = g.type === 'final' ? 'golden' : 'burst';
      window.setTimeout(() => fireConfetti(kind), 220);
    }
  };

  return (
    <SectionShell id="gifts" labelledBy="gifts-title" className="gifts">
      <Reveal className="section-head">
        <span className="kicker">Wrapped for you</span>
        <h2 className="section-title" id="gifts-title">
          A Few Gifts
        </h2>
        <p className="section-sub">
          Open them in any order — but save the big one for last.
        </p>
      </Reveal>

      <Reveal className="gift-row">
        {GIFTS.map((g) => (
          <GiftBox
            key={g.id}
            open={activeId === g.id}
            opened={opened.has(g.id)}
            size={g.size}
            wrap={g.wrap}
            icon={g.icon}
            title={g.title}
            onToggle={() => openGift(g)}
          />
        ))}
      </Reveal>

      <Modal open={!!active} onClose={() => setActiveId(null)} labelledBy="gift-modal-title">
        {active && (
          <div className={`gift-reveal gift-reveal-${active.type}`}>
            <span className="gift-reveal-emoji" aria-hidden="true">
              <Icon name={active.icon} size={46} />
            </span>
            <h3 id="gift-modal-title" className="gift-reveal-title">
              {active.title}
            </h3>
            <p className="gift-reveal-text">{active.content}</p>

            {active.type === 'link' && active.link && (
              <a
                className="btn btn-hero"
                href={active.link.startsWith('#') ? undefined : active.link}
                onClick={(e) => {
                  if (active.link.startsWith('#')) {
                    e.preventDefault();
                    scrollToId(active.link.replace('#', ''));
                    setActiveId(null);
                  }
                }}
                target={active.link.startsWith('#') ? undefined : '_blank'}
                rel={active.link.startsWith('#') ? undefined : 'noopener noreferrer'}
              >
                Open your gift →
              </a>
            )}

            {active.type === 'memory' && active.link && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  scrollToId(active.link.replace('#', ''));
                  setActiveId(null);
                }}
              >
                Take me to the memory →
              </button>
            )}

            {(active.type === 'coupon' || active.type === 'final') && active.link && (
              <button
                className="btn btn-hero"
                onClick={() => {
                  scrollToId(active.link.replace('#', ''));
                  setActiveId(null);
                }}
              >
                {active.type === 'final' ? 'See the final surprise →' : 'Claim it →'}
              </button>
            )}
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
