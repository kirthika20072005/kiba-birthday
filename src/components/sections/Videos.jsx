import { useRef, useState } from 'react';
import { VIDEOS, BIRTHDAY_VIDEO, VIDEO_MISSING_HINT } from '../../config/videos.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import Modal from '../ui/Modal.jsx';

function VideoCard({ video }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  const hasEmbed = !!video.embed;
  const hasSrc = !!video.src && !failed;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <Reveal className="video-card glass">
      <div className="video-frame">
        {hasEmbed ? (
          <iframe
            src={video.embed}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : hasSrc ? (
          <video
            ref={ref}
            src={video.src}
            poster={video.poster || undefined}
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          <div className="video-missing">
            <span className="video-missing-emoji" aria-hidden="true">
              {video.emoji || '🎬'}
            </span>
            <p>{VIDEO_MISSING_HINT}</p>
          </div>
        )}
      </div>

      <div className="video-meta">
        <h3 className="video-title">
          <span aria-hidden="true">{video.emoji || '🎬'} </span>
          {video.title}
        </h3>
        {video.caption && <p className="video-caption">{video.caption}</p>}
        {hasSrc && (
          <button className="btn btn-primary btn-sm" onClick={toggle} aria-pressed={playing}>
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
        )}
      </div>
    </Reveal>
  );
}

export default function Videos() {
  const [showBirthday, setShowBirthday] = useState(false);
  const [warned, setWarned] = useState(false);
  const birthdayRef = useRef(null);

  const startBirthday = () => {
    setWarned(true);
    window.setTimeout(() => {
      birthdayRef.current?.play?.().catch(() => {});
    }, 150);
  };

  return (
    <SectionShell id="videos" labelledBy="videos-title" className="videos">
      <Reveal className="section-head">
        <span className="kicker">🎬 In motion</span>
        <h2 className="section-title" id="videos-title">
          Moments That Move
        </h2>
        <p className="section-sub">
          Add clips to <code>public/assets/videos/</code>. Until then, these are gentle placeholders.
        </p>
      </Reveal>

      <div className="video-grid">
        {VIDEOS.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>

      <Reveal className="birthday-video-cta glass">
        <div className="bvc-copy">
          <span className="kicker">🎁 A special one</span>
          <h3 className="bvc-title">{BIRTHDAY_VIDEO.title}</h3>
          <p className="bvc-sub">{BIRTHDAY_VIDEO.preRoll}</p>
        </div>
        <button className="btn btn-hero" onClick={() => setShowBirthday(true)}>
          🎧 Watch the message
        </button>
      </Reveal>

      <Modal open={showBirthday} onClose={() => setShowBirthday(false)} labelledBy="bd-title">
        {!warned ? (
          <div className="video-warning">
            <h3 id="bd-title" className="video-warning-title">
              🎧 Put on your headphones
            </h3>
            <p className="video-warning-text">{BIRTHDAY_VIDEO.preRoll}</p>
            <button className="btn btn-hero" onClick={startBirthday}>
              I&apos;m ready ❤️
            </button>
          </div>
        ) : (
          <div className="birthday-player">
            <div className="video-frame">
              <video
                ref={birthdayRef}
                src={BIRTHDAY_VIDEO.src}
                poster={BIRTHDAY_VIDEO.poster || undefined}
                controls
                playsInline
                preload="auto"
                onError={(e) => {
                  e.currentTarget.replaceWith(
                    Object.assign(document.createElement('div'), {
                      className: 'video-missing',
                      innerHTML: `<span class="video-missing-emoji">${BIRTHDAY_VIDEO.emoji}</span><p>${VIDEO_MISSING_HINT}</p>`,
                    })
                  );
                }}
              />
            </div>
            <p className="birthday-after">{BIRTHDAY_VIDEO.afterRoll}</p>
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
