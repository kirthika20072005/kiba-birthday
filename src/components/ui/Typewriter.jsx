import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * Types `text` one character at a time. Calls `onDone` when finished.
 * Reduced motion → shows the full text immediately.
 */
export default function Typewriter({ text, speed = 45, start = true, onDone, className = '' }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? (text?.length || 0) : 0);

  useEffect(() => {
    if (reduced) {
      setCount(text?.length || 0);
      onDone?.();
      return undefined;
    }
    if (!start) {
      setCount(0);
      return undefined;
    }
    setCount(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, start, reduced]);

  const shown = (text || '').slice(0, count);
  const done = count >= (text || '').length;

  return (
    <span className={`typewriter ${className}`.trim()}>
      {shown}
      {!done && <span className="caret" aria-hidden="true" />}
      <span className="sr-only">{text}</span>
    </span>
  );
}
