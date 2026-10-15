import { useState } from 'react';
import { useMusic } from '../../context/MusicContext.jsx';
import { cx } from '../../lib/misc.js';
import Icon from '../ui/Icon.jsx';

/**
 * Music toggle + minimal player.
 * Nothing plays until the user clicks (the portal Enter button unlocks
 * audio); this control is the persistent way to pause/switch tracks.
 */
export default function MusicPlayer() {
  const {
    track,
    tracks,
    index,
    playing,
    volume,
    muted,
    error,
    setIndex,
    setVolume,
    setMuted,
    toggle,
    next,
    prev,
  } = useMusic();
  const [expanded, setExpanded] = useState(false);

  if (!track?.src) return null;

  return (
    <div className={cx('music', expanded && 'is-open')}>
      <button
        className="music-toggle"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause soundtrack' : 'Play soundtrack'}
        title={playing ? 'Pause' : 'Play'}
      >
        <span className="music-bars" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="music-glyph" aria-hidden="true">{playing ? '♪' : '❚❚'}</span>
      </button>

      <button
        className="music-expand"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={expanded ? 'Hide soundtrack controls' : 'Show soundtrack controls'}
      >
        {expanded ? '▾' : '▴'}
      </button>

      {expanded && (
        <div className="music-panel glass">
          <p className="music-title">
            {playing ? '♪ Now playing' : '❚❚ Paused'}
            {error && <span className="music-error"> — file not found</span>}
          </p>
          <p className="music-track">{track.title}</p>

          <div className="music-nav">
            <button onClick={prev} aria-label="Previous track">
              <Icon name="prev" size={18} />
            </button>
            <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              <Icon name={playing ? 'pause' : 'play'} size={18} />
            </button>
            <button onClick={next} aria-label="Next track">
              <Icon name="next" size={18} />
            </button>
          </div>

          <div className="music-vol">
            <button
              onClick={() => setMuted((m) => !m)}
              aria-pressed={muted}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              <Icon name={muted ? 'speakerX' : 'speaker'} size={18} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
            />
          </div>

          {tracks.length > 1 && (
            <ul className="music-list">
              {tracks.map((t, i) => (
                <li key={t.title}>
                  <button
                    className={cx('music-item', i === index && 'is-active')}
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                  >
                    {i === index ? '♪ ' : ''}
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
