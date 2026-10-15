import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'universe.progress.v1';

const DEFAULTS = {
  visited: [],          // section ids
  openedLetters: [],    // 'main', open-when ids, future
  reasons: [],          // indices discovered
  gameLevels: [],       // ['quiz','memory','collect','word']
  gameScores: {},       // { memory: {moves, seconds}, collect: {score} }
  clues: [],            // treasure hunt clue ids
  coupons: [],          // redeemed coupon ids
  flowers: [],          // bloomed flower ids
  gifts: [],            // opened gift ids
  secretUnlocked: false,
  entered: false,       // passed through the portal
  finalSeen: false,
};

/** Sections counted toward the "how much have you explored" bar. */
export const COUNTED_SECTIONS = [
  'portal',
  'countdown',
  'cake',
  'memories',
  'videos',
  'letter',
  'openwhen',
  'gifts',
  'final',
];

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(() =>
    typeof window === 'undefined' ? { ...DEFAULTS } : read()
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const addUnique = useCallback((bucket, item) => {
    setState((s) => (s[bucket].includes(item) ? s : { ...s, [bucket]: [...s[bucket], item] }));
  }, []);

  const visit = useCallback((id) => addUnique('visited', id), [addUnique]);

  const has = useCallback((bucket, item) => {
    const arr = state[bucket];
    return Array.isArray(arr) ? arr.includes(item) : false;
  }, [state]);

  const mark = useCallback(
    (bucket, item = true) => {
      if (typeof item === 'boolean') {
        setState((s) => ({ ...s, [bucket]: item }));
      } else {
        addUnique(bucket, item);
      }
    },
    [addUnique]
  );

  const setGameScore = useCallback((level, score) => {
    setState((s) => ({ ...s, gameScores: { ...s.gameScores, [level]: score } }));
  }, []);

  const toggleCoupon = useCallback((id) => {
    setState((s) => ({
      ...s,
      coupons: s.coupons.includes(id) ? s.coupons.filter((x) => x !== id) : [...s.coupons, id],
    }));
  }, []);

  const resetAll = useCallback(() => setState({ ...DEFAULTS }), []);

  const resetBucket = useCallback((bucket) => {
    setState((s) => ({ ...s, [bucket]: DEFAULTS[bucket] }));
  }, []);

  const progress = useMemo(() => {
    const visitedCount = state.visited.filter((id) => COUNTED_SECTIONS.includes(id)).length;
    const total = COUNTED_SECTIONS.length;
    return {
      visitedCount,
      total,
      percent: Math.round((visitedCount / total) * 100),
    };
  }, [state.visited]);

  const value = useMemo(
    () => ({
      state,
      progress,
      visit,
      has,
      mark,
      addUnique,
      setGameScore,
      toggleCoupon,
      resetAll,
      resetBucket,
    }),
    [state, progress, visit, has, mark, addUnique, setGameScore, toggleCoupon, resetAll, resetBucket]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}
