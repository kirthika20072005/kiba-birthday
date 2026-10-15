/* ============================================================
   VIDEOS — memory clips + the secret birthday video (Section 7)
   ------------------------------------------------------------
   Drop your files into public/assets/videos/ e.g.
     public/assets/videos/us-summer.mp4
   then set  src: 'assets/videos/us-summer.mp4'

   Supported: mp4 / webm (Safari prefers mp4). You may also use
   an external URL (YouTube/Vimeo embeds are handled via `embed`).

   `poster` = a thumbnail image shown before play (fallback to a
   gradient card if null).
   ============================================================ */

export const VIDEOS = [
  {
    id: 'memory-1',
    title: 'That trip we keep talking about',
    caption: 'A little clip from a day I never want to forget.',
    date: '2025-04-20',
    src: 'assets/videos/memory-1.mp4',
    poster: null,
    embed: null, // e.g. 'https://www.youtube.com/embed/VIDEO_ID'
    icon: 'film',
    isBirthday: false,
  },
];

/* ------------------------------------------------------------
   THE SPECIAL BIRTHDAY VIDEO
   This is the one that shows the headphones warning first.
   ------------------------------------------------------------ */
export const BIRTHDAY_VIDEO = {
  id: 'birthday',
  title: 'A Message From My Heart',
  preRoll: 'Put on your headphones. I made something special just for you.',
  afterRoll:
    '…and every word of it is true. Happy birthday, my love.',
  src: 'assets/videos/birthday-message.mp4',
  poster: null,
  embed: null,
  icon: 'film',
};

/* Graceful note shown if a video file is missing. */
export const VIDEO_MISSING_HINT =
  'Video not added yet — drop your file into public/assets/videos/ to see it here.';
