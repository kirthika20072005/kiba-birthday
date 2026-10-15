import Icon from './Icon.jsx';

/**
 * A vintage sealed envelope. Purely presentational — the parent controls
 * `open` so it can play a modal, expand inline, etc.
 *
 * variant: 'flat'     → expands in place (used by "Open When")
 *          'hero'     → big centred envelope (main letter / future)
 */
export default function Envelope({
  open = false,
  onToggle,
  name,
  hue = 340,
  hint = 'Click to open',
  variant = 'hero',
  disabled = false,
  children,
  openedLabel = 'Opened ✓',
}) {
  const paperStyle = {
    '--hue': hue,
    '--paper': `hsl(${hue} 60% 92%)`,
    '--paper-line': `hsl(${hue} 45% 78%)`,
    '--wax': `hsl(${hue} 70% 55%)`,
  };

  return (
    <div
      className={`envelope env-${variant} ${open ? 'is-open' : 'is-closed'}`.trim()}
      style={paperStyle}
    >
      <button
        type="button"
        className="envelope-face"
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={open}
        aria-label={open ? `${name} (open)` : `${name} — ${hint}`}
      >
        <span className="env-flap" aria-hidden="true" />
        <span className="env-body" aria-hidden="true">
          <span className="env-seal">
            <Icon name="heart" size={20} />
          </span>
        </span>
        <span className="env-meta">
          <span className="env-title">{name}</span>
          <span className="env-hint">{open ? openedLabel : hint}</span>
        </span>
      </button>
      {open ? <div className="envelope-content">{children}</div> : null}
    </div>
  );
}
