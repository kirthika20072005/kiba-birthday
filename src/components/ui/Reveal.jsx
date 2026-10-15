import { useRef } from 'react';
import { useInView } from '../../hooks/useInView.js';

/**
 * Wraps children and adds `.in` when scrolled into view, triggering the
 * `.reveal` transition from animations.css. Respect reduced motion by
 * rendering immediately (CSS already forces visibility).
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.12 });
  const delayClass = delay ? ` d${Math.min(4, Math.round(delay * 10))}` : '';
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' in' : ''}${delayClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ kicker, title, sub, id }) {
  return (
    <Reveal className="section-head">
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </Reveal>
  );
}

export function useAutoRef() {
  return useRef(null);
}
