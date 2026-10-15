import PlaceholderArt from './PlaceholderArt.jsx';

/**
 * A scrapbook Polaroid card: white frame, square-ish media, handwritten
 * caption, optional date. Slightly random rotation for a tossed-on-the-
 * table feel (deterministic per `seed` so layout doesn't jitter).
 */
export default function Polaroid({
  src,
  emoji,
  caption,
  note,
  date,
  tilt,
  onClick,
  active = false,
  as: Tag = 'div',
}) {
  const angle = tilt ?? ((caption?.length || 0) % 5) - 2;
  const dt = date ? new Date(`${date}T00:00:00`) : null;
  const dateLabel =
    dt && !Number.isNaN(dt.getTime())
      ? dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      : null;

  const body = (
    <>
      <div className="polaroid-photo">
        <PlaceholderArt src={src} emoji={emoji} label={caption} ratio="1 / 1" />
      </div>
      <div className="polaroid-caption">
        <span className="polaroid-text">{caption}</span>
        {dateLabel ? <span className="polaroid-date">{dateLabel}</span> : null}
      </div>
      {onClick ? <span className="polaroid-view">View ↗</span> : null}
    </>
  );

  const className = `polaroid has-hover${active ? ' is-active' : ''}`;

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        style={{ '--tilt': `${angle}deg` }}
        onClick={onClick}
        aria-label={`Open photo: ${caption}`}
      >
        {body}
      </button>
    );
  }

  return (
    <Tag className={className} style={{ '--tilt': `${angle}deg` }}>
      {body}
    </Tag>
  );
}
