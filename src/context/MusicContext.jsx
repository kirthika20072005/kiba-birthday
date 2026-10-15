import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TRACKS, DEFAULT_TRACK_INDEX } from '../config/music.js';

const MusicContext = createContext(null);

/**
 * Holds a single HTMLAudioElement + playback state.
 *
 * Browsers block autoplay: nothing plays until `play()` is called
 * from a real user gesture (the portal's Enter button does this).
 */
export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(() => {
    const i = Math.min(DEFAULT_TRACK_INDEX, (TRACKS?.length || 1) - 1);
    return i < 0 ? 0 : i;
  });
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    try {
      const v = Number(window.localStorage.getItem('universe.vol'));
      return Number.isFinite(v) && v >= 0 && v <= 1 ? v : 0.55;
    } catch {
      return 0.55;
    }
  });
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const track = TRACKS?.[index] ?? null;

  // Create + wire the element once.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.loop = true;
    audioRef.current = audio;

    const onErr = () => {
      setError(true);
      setPlaying(false);
    };
    const onOk = () => setError(false);
    const onEnd = () => setPlaying(false);

    audio.addEventListener('error', onErr);
    audio.addEventListener('canplay', onOk);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener('error', onErr);
      audio.removeEventListener('canplay', onOk);
      audio.removeEventListener('ended', onEnd);
      audioRef.current = null;
    };
  }, []);

  // Swap in the current track's src when the index changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = playing;
    audio.pause();
    if (track?.src) {
      audio.src = track.src;
      setError(false);
      if (wasPlaying) {
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    } else {
      audio.removeAttribute('src');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, track?.src]);

  // Volume / mute
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
    try {
      window.localStorage.setItem('universe.vol', String(volume));
    } catch {
      /* ignore */
    }
  }, [volume, muted]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track?.src) return;
    setUnlocked(true);
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false);
        setError(true);
      });
  }, [track]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const next = useCallback(() => setIndex((i) => (i + 1) % (TRACKS?.length || 1)), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + (TRACKS?.length || 1)) % (TRACKS?.length || 1)),
    []
  );

  const value = useMemo(
    () => ({
      track,
      tracks: TRACKS || [],
      index,
      playing,
      volume,
      muted,
      error,
      unlocked,
      setIndex,
      setVolume,
      setMuted,
      play,
      pause,
      toggle,
      next,
      prev,
    }),
    [track, index, playing, volume, muted, error, unlocked, play, pause, toggle, next, prev]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}
