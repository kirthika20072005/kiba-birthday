import { useState } from 'react';
import { OPEN_WHEN } from '../../config/letters.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import Envelope from '../ui/Envelope.jsx';
import Modal from '../ui/Modal.jsx';
import Icon from '../ui/Icon.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';

export default function OpenWhen() {
  const { has, mark } = useProgress();
  const [openId, setOpenId] = useState(null);
  const openedCount = OPEN_WHEN.filter((l) => has('openedLetters', l.id)).length;

  const openLetter = (item) => {
    setOpenId(item.id);
    mark('openedLetters', item.id);
  };

  const active = OPEN_WHEN.find((l) => l.id === openId) || null;

  return (
    <SectionShell id="openwhen" labelledBy="openwhen-title" className="openwhen">
      <Reveal className="section-head">
        <span className="kicker">Just in case</span>
        <h2 className="section-title" id="openwhen-title">
          Open When…
        </h2>
        <p className="section-sub">
          Little letters for the moments in between. Open the one that matches the moment.{' '}
          <span className="ow-count">
            {openedCount}/{OPEN_WHEN.length} opened
          </span>
        </p>
      </Reveal>

      <div className="envelope-grid">
        {OPEN_WHEN.map((item, i) => {
          const isOpen = openId === item.id;
          return (
            <Reveal key={item.id} delay={(i % 4) * 0.05}>
              <Envelope
                variant="flat"
                open={isOpen}
                onToggle={() => (isOpen ? setOpenId(null) : openLetter(item))}
                name={item.title}
                hue={item.hue ?? 340}
                hint="Open"
                openedLabel="Opened ✓"
              >
                <p className="ow-letter">{item.letter}</p>
              </Envelope>
            </Reveal>
          );
        })}
      </div>

      <Modal open={!!active} onClose={() => setOpenId(null)} labelledBy="ow-modal-title">
        {active && (
          <div className="ow-modal">
            <span className="ow-modal-seal" aria-hidden="true">
              <Icon name="heart" size={30} />
            </span>
            <h3 id="ow-modal-title" className="ow-modal-title">
              {active.title}
            </h3>
            <p className="ow-modal-letter">{active.letter}</p>
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
