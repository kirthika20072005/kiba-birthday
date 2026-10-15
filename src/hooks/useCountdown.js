import { useEffect, useMemo, useState } from 'react';

/* ------------------------------------------------------------------
   Timezone helpers so the countdown works no matter where in the
   world the birthday actually is. We convert a "wall clock" time in
   an IANA timezone into a real UTC timestamp.
   ------------------------------------------------------------------ */

function offsetMsAt(timeZone, date) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = {};
  for (const p of dtf.formatToParts(date)) parts[p.type] = p.value;
  const hour = parts.hour === '24' ? '00' : parts.hour;
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return asUtc - date.getTime();
}

/** Turn '2026-11-15T00:00:00' + 'Asia/Kolkata' into a UTC ms timestamp. */
export function zonedToUtc(dateStr, timeZone) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(
    String(dateStr).trim()
  );
  if (!m) {
    const fallback = Date.parse(dateStr);
    return Number.isNaN(fallback) ? Date.now() : fallback;
  }
  const [, y, mo, d, hh = '00', mi = '00', ss = '00'] = m;
  const wallAsUtc = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(hh), Number(mi), Number(ss));

  let tz = timeZone || 'UTC';
  try {
    // Validate the timezone once; fall back to UTC if it's wrong.
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
  } catch {
    tz = 'UTC';
  }

  let offset = offsetMsAt(tz, new Date(wallAsUtc));
  let ts = wallAsUtc - offset;
  // Second pass converges across DST boundaries.
  offset = offsetMsAt(tz, new Date(ts));
  ts = wallAsUtc - offset;
  return ts;
}

function breakdown(ms) {
  const total = Math.max(0, ms);
  const day = Math.floor(total / 86400000);
  const hour = Math.floor((total % 86400000) / 3600000);
  const minute = Math.floor((total % 3600000) / 60000);
  const second = Math.floor((total % 60000) / 1000);
  return { total, days: day, hours: hour, minutes: minute, seconds: second };
}

/**
 * Live countdown to `dateStr` in `timeZone`.
 *
 * status: 'future'  → still counting down
 *         'live'    → it's the birthday (within 24h of start)
 *         'past'    → more than a day has gone by
 */
export function useCountdown(dateStr, timeZone) {
  const target = useMemo(() => zonedToUtc(dateStr, timeZone), [dateStr, timeZone]);

  const compute = () => {
    const now = Date.now();
    const diff = target - now;
    if (diff > 0) return { status: 'future', ...breakdown(diff) };
    const since = now - target;
    if (since < 86400000) return { status: 'live', ...breakdown(0) };
    return { status: 'past', ...breakdown(0) };
  };

  const [state, setState] = useState(compute);

  useEffect(() => {
    setState(compute());
    const id = window.setInterval(() => {
      const next = compute();
      setState((prev) =>
        prev.status === next.status &&
        prev.days === next.days &&
        prev.hours === next.hours &&
        prev.minutes === next.minutes &&
        prev.seconds === next.seconds
          ? prev
          : next
      );
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return { ...state, target };
}
