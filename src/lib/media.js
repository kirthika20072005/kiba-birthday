import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook that gives a media element (audio/video) resilient behaviour:
 * - returns { ready, error, ... } so UI can show a graceful message
 * - never throws when the file is missing
 *
 * Usage:
 *   const [state, ref] = useMediaState();
 *   <video ref={ref} onError={state.onError} />
 */
export function useMediaState() {
  const ref = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | canplay | error

  const onError = useCallback(() => setStatus('error'), []);
  const onReady = useCallback(() => setStatus('canplay'), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.readyState >= 2) setStatus('canplay');
    el.addEventListener('error', onError);
    el.addEventListener('loadeddata', onReady);
    el.addEventListener('canplay', onReady);
    return () => {
      el.removeEventListener('error', onError);
      el.removeEventListener('loadeddata', onReady);
      el.removeEventListener('canplay', onReady);
    };
  }, [onError, onReady]);

  return { status, ref, onError, onReady };
}

/**
 * A graceful image: renders the real <img> when it loads, otherwise a
 * themed placeholder using `emoji` + `label`.
 */
export function useImageLoad(src) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setLoaded(false);
    setFailed(!src);
    if (!src) return undefined;

    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setFailed(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, failed };
}
