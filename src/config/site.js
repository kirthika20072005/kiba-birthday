/* ============================================================
   SITE — names, birthday, palette
   ------------------------------------------------------------
   >>> THIS IS THE MAIN FILE TO EDIT. <<<
   Everything marked with square brackets is a placeholder.
   Replace it with your own words and there is nowhere else to
   edit names or dates.
   ============================================================ */

export const SITE = {
  /* --- who it's for and who made it --- */
  hisName: 'Chottu',
  nickname: 'chottu',
  yourName: 'Bujik',
  hisInitials: 'C',

  /* --- THE BIRTHDAY -------------------------------------------------
     Change ONLY this object to move the countdown.
     `date` is the moment the birthday begins.
     `timezone` is an IANA timezone (the same names used in the
     server below: "Asia/Kolkata", "America/New_York", "Europe/Paris"…).
     Find yours: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     ------------------------------------------------------------------ */
  birthday: {
    date: '2026-10-16T00:00:00',
    timezone: 'Asia/Kolkata',
    label: 'Birthday',
  },

  /* --- section copy --- */
  portalMessage: 'Someone has created a little universe just for you…',
  portalEnterLabel: 'Enter My World',
  welcomeTitle: 'Welcome to Your Own Little Universe',
  countdownLead: 'Until the day the world got even luckier than it already was.',
  countdownPast: 'It’s your day. It’s been your day.',

  /* --- palette (optional runtime copy of tokens, for JS canvas) --- */
  palette: {
    pink: '#ff7bc0',
    lavender: '#c9b8ff',
    purple: '#b25cff',
    gold: '#ffd479',
    cream: '#fff4e6',
    starWhite: '#ffffff',
    bg: '#070312',
  },
};

/** Handy display name that falls back gracefully. */
export const HIS = SITE.nickname?.trim() || SITE.hisName;
export const YOU = SITE.yourName;
