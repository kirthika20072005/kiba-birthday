/* ============================================================
   SOUNDTRACK — Section 22 + the floating player (Section 2)
   ------------------------------------------------------------
   ⚠️ Autoplay is blocked by browsers: music starts only after
   a user gesture (the "Enter My World" button counts).

   Add your own files to  public/assets/audio/ e.g.
     public/assets/audio/song.mp3
   then set  src: 'assets/audio/song.mp3'

   `art` is an optional cover image. The player works with local
   files; a remote URL also works if CORS is fine.
   ============================================================ */

export const TRACKS = [
  {
    id: 'track-1',
    title: 'Our Song (placeholder)',
    artist: 'Add an artist name',
    src: 'assets/audio/track-1.mp3',
    art: null,
  },
  {
    id: 'track-2',
    title: 'A slower one (placeholder)',
    artist: 'Add an artist name',
    src: 'assets/audio/track-2.mp3',
    art: null,
  },
];

/* Set the first track to `null` to hide the player until you add music. */
export const DEFAULT_TRACK_INDEX = 0;

/* When a track file is missing we show this instead of failing. */
export const MUSIC_MISSING_HINT =
  'Add a file at public/assets/audio/track-1.mp3 (or edit src/config/music.js) to hear music here.';
