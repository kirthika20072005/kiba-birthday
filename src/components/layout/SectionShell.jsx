import { useEffect, useRef } from 'react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useInView } from '../../hooks/useInView.js';

/**
 * Standard <section> wrapper. Registers "visited" for the progress bar
 * when it comes into view, so the explorer meter fills as you scroll.
 */
export default function SectionShell({
  id,
  children,
  className = '',
  labelledBy,
  decorative = false,
  pad = true,
}) {
  const { visit } = useProgress();
  const [ref, inView] = useInView({ threshold: 0.08 });
  const visitedRef = useRef(false);

  useEffect(() => {
    if (inView && !visitedRef.current) {
      visitedRef.current = true;
      visit(id);
    }
  }, [inView, id, visit]);

  return (
    <section
      id={id}
      ref={ref}
      className={`section ${pad ? '' : 'section-nopad'} ${className}`.trim()}
      aria-labelledby={labelledBy}
      aria-hidden={decorative || undefined}
      tabIndex={-1}
    >
      {children}
    </section>
  );
}
