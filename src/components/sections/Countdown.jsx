import { useEffect } from 'react';
import { SITE, HIS } from '../../config/site.js';
import { useCountdown } from '../../hooks/useCountdown.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import { fireConfetti } from '../effects/ConfettiLayer.jsx';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const { status, days, hours, minutes, seconds } = useCountdown(
    SITE.birthday.date,
    SITE.birthday.timezone
  );
  const { mark } = useProgress();

  // When we cross into the birthday, celebrate once.
  useEffect(() => {
    if (status === 'live') {
      mark('finalSeen', false); // no-op guard
      fireConfetti('celebrate');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const values = { days, hours, minutes, seconds };

  const isLive = status === 'live';
  const isPast = status === 'past';

  return (
    <SectionShell id="countdown" labelledBy="countdown-title" className="countdown">
      <Reveal className="section-head">
        <span className="kicker">⏳ The Waiting Room</span>
        <h2 className="section-title" id="countdown-title">
          {isLive ? `${HIS}'s day is here` : isPast ? 'It was a beautiful day' : 'Counting down to you'}
        </h2>
        <p className="section-sub">{isLive || isPast ? SITE.countdownPast : SITE.countdownLead}</p>
      </Reveal>

      {isLive || isPast ? (
        <Reveal className="countdown-live glass">
          <span className="live-emoji" aria-hidden="true">🎉🎂🎉</span>
          <p className="live-title">Happy Birthday, {HIS}!</p>
          <p className="live-sub">
            The universe just added another year of you to it — and it&apos;s glowing.
          </p>
        </Reveal>
      ) : (
        <div className="countdown-grid" role="timer" aria-live="off">
          {UNITS.map((u, i) => (
            <Reveal key={u.key} delay={i * 0.08} className="countdown-card glass">
              <span className="countdown-num">{pad(values[u.key])}</span>
              <span className="countdown-label">{u.label}</span>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="countdown-note">
        <span aria-hidden="true">🕰️</span> {SITE.birthday.label} ·{' '}
        {new Date(SITE.birthday.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        <span className="tz">({SITE.birthday.timezone})</span>
      </Reveal>
    </SectionShell>
  );
}
