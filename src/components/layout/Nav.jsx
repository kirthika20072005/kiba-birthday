import { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { cx, scrollToId } from '../../lib/misc.js';

/** Collapsed pill diameter (px). Must match --unit in the pill CSS. */
const COLLAPSED = 40;
/** Outer margin around each pill (px). Must match --marg in the pill CSS. */
const MARG = 6;
const STEP = COLLAPSED + MARG * 2;

/** Single source of truth for navigation + the explorer meter. */
const ICONS = {
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  timer: (
    <>
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </>
  ),
  cake: (
    <>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v3" />
      <path d="M12 8v3" />
      <path d="M17 8v3" />
      <path d="M7 4h.01" />
      <path d="M12 4h.01" />
      <path d="M17 4h.01" />
    </>
  ),
  image: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </>
  ),
  video: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  inbox: (
    <>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </>
  ),
  sparkles: (
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  ),
};

function NavIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export const NAV_SECTIONS = [
  { id: 'portal', label: 'Home', icon: 'home' },
  { id: 'countdown', label: 'Countdown', icon: 'timer' },
  { id: 'cake', label: 'The Cake', icon: 'cake' },
  { id: 'memories', label: 'Memories', icon: 'image' },
  { id: 'videos', label: 'Videos', icon: 'video' },
  { id: 'letter', label: 'Love Letters', icon: 'heart' },
  { id: 'openwhen', label: 'Open When…', icon: 'inbox' },
  { id: 'gifts', label: 'Gifts', icon: 'gift' },
  { id: 'final', label: 'Final Surprise', icon: 'sparkles' },
];

export default function Nav() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('portal');
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // Sliding-highlight pill nav: measure the active pill and glide the
  // highlight to it. Desktop only — the mobile drawer shows full rows.
  const listRef = useRef(null);
  const btnRefs = useRef(new Map());
  const [hl, setHl] = useState({ x: 0, w: COLLAPSED });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const layout = () => {
      const ul = listRef.current;
      if (!ul) return;
      if (mq.matches) {
        btnRefs.current.forEach((b) => {
          b.style.width = '';
        });
        return;
      }
      // NOTE: button rects can't be measured here — their widths are
      // mid-transition when active changes. Inactive pills are always
      // exactly COLLAPSED wide, so the active pill's target x is purely
      // arithmetic, and its width comes from scrollWidth (transition-safe).
      const idx = NAV_SECTIONS.findIndex((s) => s.id === active);
      let w = COLLAPSED;
      btnRefs.current.forEach((b, id) => {
        if (id === active) {
          const inner = b.querySelector('.pill-inner');
          w = inner ? inner.scrollWidth : COLLAPSED;
          b.style.width = `${w}px`;
        } else {
          b.style.width = `${COLLAPSED}px`;
        }
      });
      const x = idx < 0 ? 0 : MARG + idx * STEP;
      setHl((prev) => (prev.x === x && prev.w === w ? prev : { x, w }));
      // Keep the active pill in view inside the scrollable row.
      if (x < ul.scrollLeft || x + w > ul.scrollLeft + ul.clientWidth) {
        ul.scrollTo({
          left: x - ul.clientWidth / 2 + w / 2,
          behavior: 'smooth',
        });
      }
    };
    layout();
    window.addEventListener('resize', layout);
    const fonts = document.fonts?.ready;
    if (fonts) fonts.then(layout).catch(() => {});
    return () => window.removeEventListener('resize', layout);
  }, [active]);

  const go = useCallback(
    (id) => {
      setOpen(false);
      window.setTimeout(() => scrollToId(id), 60);
    },
    []
  );

  // Track the section in view + auto-hide on fast downward scroll.
  useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: '-64px 0px -45% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 260 && !open) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY, open]);

  // Close menu on Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Thin progress line pinned to the very top */}
      <div className="top-progress" aria-hidden="true">
        <div className="top-progress-fill" style={{ width: `${progress.percent}%` }} />
      </div>

      <header className={cx('nav', open && 'nav-open', hidden && 'nav-hidden')}>
        <div className="nav-inner">
          <a
            className="nav-brand"
            href="#portal"
            onClick={(e) => {
              e.preventDefault();
              go('portal');
            }}
          >
            <span className="nav-heart">❤️</span>
            <span className="nav-explorer">
              {progress.percent}% explored
            </span>
          </a>

          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="nav-menu"
            className={cx('nav-menu', open && 'is-open')}
            aria-label="Sections"
          >
            <ul className="pill" ref={listRef}>
              <span
                className="pill-highlight"
                aria-hidden="true"
                style={{ transform: `translateX(${hl.x}px)`, width: hl.w }}
              />
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    ref={(el) => {
                      if (el) btnRefs.current.set(s.id, el);
                      else btnRefs.current.delete(s.id);
                    }}
                    className={cx('outer', active === s.id && 'active')}
                    onClick={() => go(s.id)}
                    aria-current={active === s.id ? 'true' : undefined}
                    title={s.label}
                  >
                    <span className="pill-inner">
                      <span className="icon">
                        <NavIcon name={s.icon} />
                      </span>
                      <span className="text">{s.label}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="nav-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
      </header>

      {open && (
        <button className="nav-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
