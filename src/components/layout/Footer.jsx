import { useState } from 'react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { HIS, YOU } from '../../config/site.js';
import { scrollToId } from '../../lib/misc.js';

export default function Footer() {
  const { resetAll } = useProgress();
  const [confirming, setConfirming] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-line">
          Made with love by {YOU} — for {HIS}.
        </p>
        <p className="footer-sub">
          Every photo, video, letter and memory on this page was picked for you, Chottu.
          Happy birthday, my love.
        </p>

        <div className="footer-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => scrollToId('portal')}>
            ↑ Back to start
          </button>

          {confirming ? (
            <span className="footer-confirm">
              Reset everything?
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  resetAll();
                  setConfirming(false);
                  scrollToId('portal');
                }}
              >
                Yes, reset
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(true)}>
              Reset progress
            </button>
          )}
        </div>

        <p className="footer-tiny">
          Progress is saved in this browser only. Resetting clears what you&apos;ve opened.
        </p>
      </div>
    </footer>
  );
}
