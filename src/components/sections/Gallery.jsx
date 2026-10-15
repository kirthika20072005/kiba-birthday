import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, GALLERY, PHOTO_WALL_ENABLED } from '../../config/gallery.js';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import Polaroid from '../ui/Polaroid.jsx';
import PlaceholderArt from '../ui/PlaceholderArt.jsx';
import Modal from '../ui/Modal.jsx';
import { cx } from '../../lib/misc.js';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [wall, setWall] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const photos = useMemo(
    () => (filter === 'all' ? GALLERY : GALLERY.filter((p) => p.category === filter)),
    [filter]
  );

  const open = openIndex != null ? photos[openIndex] : null;

  const step = (dir) =>
    setOpenIndex((i) => {
      if (i == null) return i;
      return (i + dir + photos.length) % photos.length;
    });

  // keyboard nav inside the lightbox
  useEffect(() => {
    if (openIndex == null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, photos.length]);

  const fmtDate = (d) =>
    d ? new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null;

  return (
    <SectionShell id="memories" labelledBy="memories-title" className="gallery">
      <Reveal className="section-head">
        <span className="kicker">Frozen moments</span>
        <h2 className="section-title" id="memories-title">
          Our Little Universe
        </h2>
        <p className="section-sub">
          Every frame here is us — tap any polaroid to open it big.
        </p>
      </Reveal>

      <Reveal className="gallery-toolbar">
        <div className="chips" role="tablist" aria-label="Photo categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              className={cx('chip', filter === c.id && 'is-active')}
              onClick={() => {
                setFilter(c.id);
                setOpenIndex(null);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {PHOTO_WALL_ENABLED && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setWall((v) => !v)}
            aria-pressed={wall}
          >
            {wall ? 'Grid view' : '3D wall'}
          </button>
        )}
      </Reveal>

      {wall ? (
        <div className="photo-wall" aria-label="Rotating photo wall">
          {[...photos, ...photos].map((p, i) => (
            <button
              key={`${p.caption}-${i}`}
              className="wall-card"
              style={{ '--wi': i }}
              onClick={() => setOpenIndex(i % photos.length)}
              aria-label={`Open ${p.caption}`}
            >
              <PlaceholderArt src={p.src} label={p.caption} ratio="3 / 4" />
            </button>
          ))}
        </div>
      ) : (
        <div className="polaroid-grid">
          {photos.map((p, i) => (
            <Reveal key={p.caption + i} delay={(i % 4) * 0.05}>
              <Polaroid
                src={p.src}
                caption={p.caption}
                date={p.date}
                onClick={() => setOpenIndex(i)}
              />
            </Reveal>
          ))}
        </div>
      )}

      <Modal open={!!open} onClose={() => setOpenIndex(null)} labelledBy="lightbox-cap">
        {open && (
          <div className="lightbox">
            <div className="lightbox-media">
              <PlaceholderArt src={open.src} emoji={open.emoji} label={open.caption} />
            </div>
            <div className="lightbox-info">
              <h3 id="lightbox-cap" className="lightbox-title">
                {open.caption}
              </h3>
              {fmtDate(open.date) && <span className="lightbox-date">{fmtDate(open.date)}</span>}
              {open.note && <p className="lightbox-note">{open.note}</p>}
            </div>

            <div className="lightbox-nav">
              <button className="btn btn-ghost btn-sm" onClick={() => step(-1)}>
                ← Prev
              </button>
              <span className="lightbox-count">
                {(openIndex ?? 0) + 1} / {photos.length}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => step(1)}>
                Next →
              </button>
            </div>
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
