import { useEffect } from 'react';

/**
 * Resets scroll to the top on first mount. Without this, browsers
 * restore the previous scroll position on reload, which lands you in
 * the middle of the universe instead of at the portal.
 */
export default function ScrollReset() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
