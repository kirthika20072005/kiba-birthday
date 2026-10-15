import Icon from './Icon.jsx';

/**
 * A wrapped gift box with ribbon. On click it "opens" (lid lifts, glow).
 * Parent controls `open`.
 */
export default function GiftBox({ open, onToggle, size = 'small', wrap = 'love', icon = 'gift', title, opened = false }) {
  return (
    <button
      type="button"
      className={`gift has-hover gift-${size} wrap-${wrap} ${open ? 'is-open' : ''} ${opened ? 'is-seen' : ''}`.trim()}
      onClick={onToggle}
      aria-expanded={open}
      aria-label={opened ? `${title} — opened` : `Open gift: ${title}`}
    >
      <span className="gift-sparkle" aria-hidden="true">✦</span>
      <span className="gift-lid" aria-hidden="true">
        <span className="gift-ribbon-v" />
        <span className="gift-ribbon-h" />
      </span>
      <span className="gift-box-body" aria-hidden="true">
        <span className="gift-bow">
          <Icon name="bow" size={30} />
        </span>
        <span className="gift-emoji">
          <Icon name={icon} size={34} />
        </span>
      </span>
      <span className="gift-title">{title}</span>
      <span className="gift-hint">{opened ? 'Re-open' : 'Open me'}</span>
    </button>
  );
}
