/* ============================================================
   GALLERY — our little universe (Section 6)
   ------------------------------------------------------------
   Photos live in  public/assets/images/  as  us-04.jpeg …
   us-38.jpeg  (renamed from the WhatsApp exports; us-01 … us-03
   were deleted).
   (files in `public/` are served from the site root, no leading
   slash needed).

   Each photo:
     src      : image path, or null to show a graceful placeholder
     caption  : short caption under the polaroid
     note     : a personal note shown in the lightbox
     date     : 'YYYY-MM-DD' or null
     category : 'favorites' | 'cute' | 'funny' | 'special'
     emoji    : fallback art used when the image is missing

   Keep categories in CATEGORIES if you want to rename them.
   ============================================================ */

export const CATEGORIES = [
  { id: 'all', label: 'Everything', emoji: '🌌' },
  { id: 'favorites', label: 'Favorite Memories', emoji: '💖' },
  { id: 'cute', label: 'Cute Moments', emoji: '🐾' },
  { id: 'funny', label: 'Funny Moments', emoji: '🤣' },
  { id: 'special', label: 'Special Days', emoji: '🌟' },
];

export const GALLERY = [
  {
    src: 'assets/images/us-04.jpeg',
    caption: 'The day we celebrated you',
    note: '“You make every ordinary day feel like a festival — but that day, the whole world was celebrating you, and so was I.”',
    date: null,
    category: 'special',
    emoji: '🎂',
  },
  {
    src: 'assets/images/us-05.jpeg',
    caption: 'Late-night nonsense',
    note: '“Proof that my favourite time of day is whatever o’clock it is when you’re being ridiculous next to me.”',
    date: null,
    category: 'funny',
    emoji: '🌙',
  },
  {
    src: 'assets/images/us-06.jpeg',
    caption: 'Hand in hand',
    note: '“Your hand in mine still feels like the first time — like I found the place I was always supposed to be.”',
    date: '2025-05-18',
    category: 'favorites',
    emoji: '🤝',
  },
  {
    src: 'assets/images/us-07.jpeg',
    caption: 'Silly grin detector',
    note: '“That grin should be illegal. Every time you do that, I forget whatever I was saying.”',
    date: null,
    category: 'cute',
    emoji: '😊',
  },
  {
    src: 'assets/images/us-08.jpeg',
    caption: 'A day worth remembering',
    note: '“Some days are loud and some are quiet — this one was ours, and that’s what made it unforgettable.”',
    date: null,
    category: 'special',
    emoji: '🎗️',
  },
  {
    src: 'assets/images/us-09.jpeg',
    caption: 'Us, being us',
    note: '“No posing, no pretending — just us, exactly as we are, and exactly as I love.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-10.jpeg',
    caption: 'That look',
    note: '“If you ever wonder what you look like when you’re happy — it’s this. I memorised it.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-11.jpeg',
    caption: 'Can’t stop laughing',
    note: '“My cheeks hurt, I couldn’t breathe, and I wouldn’t trade that laugh for anything.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-12.jpeg',
    caption: 'A little celebration',
    note: '“We don’t need a reason to celebrate — but having you is reason enough every single day.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-13.jpeg',
    caption: 'Favorite memory',
    note: '“If I could replay one moment on loop forever, it would be this one.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-14.jpeg',
    caption: 'Cute overload',
    note: '“Warning: excessive cuteness. Side effects include smiling at your phone like an idiot.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-15.jpeg',
    caption: 'Goofy times',
    note: '“You bring out the silliest version of me, and honestly? She’s my favourite version.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-16.jpeg',
    caption: 'A special day',
    note: '“Not marked on any calendar, but marked forever in my heart.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-17.jpeg',
    caption: 'Just us',
    note: '“Crowded rooms fade away when it’s just us. It’s always just us.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-18.jpeg',
    caption: 'Sweet moment',
    note: '“Soft smiles, warm hearts — this is what happiness looks like up close.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-19.jpeg',
    caption: 'Silly us',
    note: '“Normal is overrated. I’ll take silly-with-you over anything, any day.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-20.jpeg',
    caption: 'Worth framing',
    note: '“Some moments deserve a frame. This one deserves a whole gallery.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-21.jpeg',
    caption: 'My favorite view',
    note: '“Mountains, oceans, sunsets — none of them stand a chance against this view.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-22.jpeg',
    caption: 'Pocketful of cute',
    note: '“I keep this one in my pocket for bad days. One look and everything feels lighter.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-23.jpeg',
    caption: 'Laugh attack',
    note: '“You started it. You always start it. Please never stop starting it.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-24.jpeg',
    caption: 'Golden day',
    note: '“Everything glowed that day — or maybe that’s just what the world looks like when I’m with you.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-25.jpeg',
    caption: 'Heart-full moment',
    note: '“My heart was so full in this moment, I swear it grew a size.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-26.jpeg',
    caption: 'Soft smiles',
    note: '“No big gestures, no grand words — just your soft smile, and that was everything.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-27.jpeg',
    caption: 'Comedy gold',
    note: '“I’d pay good money to watch that moment again. Actually — I’d pay anything.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-28.jpeg',
    caption: 'Shiny happy us',
    note: '“Happiness looks good on us. Really, really good.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-29.jpeg',
    caption: 'Forever favorite',
    note: '“Out of every moment we’ve ever had, this one sits in a very special place.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-30.jpeg',
    caption: 'Cuteness, kept',
    note: '“Kept forever: this moment, this smile, this boy.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-31.jpeg',
    caption: 'Inside joke energy',
    note: '“Nobody else would understand why this is funny. That’s exactly why I love it.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-32.jpeg',
    caption: 'A day to keep',
    note: '“I’m keeping this day. It’s mine now. Ours, I mean — it’s ours.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-33.jpeg',
    caption: 'Us again',
    note: '“Us again, as always, exactly where we belong — together.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-34.jpeg',
    caption: 'Little joys',
    note: '“Happiness isn’t always big. Sometimes it’s this small, this quiet, this perfect.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
  {
    src: 'assets/images/us-35.jpeg',
    caption: 'That funny day',
    note: '“I still think about that day and laugh out loud. People stare. Worth it.”',
    date: null,
    category: 'funny',
    emoji: '🤣',
  },
  {
    src: 'assets/images/us-36.jpeg',
    caption: 'Special, just because',
    note: '“No occasion, no reason — just you, just me, just special.”',
    date: null,
    category: 'special',
    emoji: '🌟',
  },
  {
    src: 'assets/images/us-37.jpeg',
    caption: 'One more favorite',
    note: '“I keep saying I can’t pick a favourite, and then moments like this happen.”',
    date: null,
    category: 'favorites',
    emoji: '💖',
  },
  {
    src: 'assets/images/us-38.jpeg',
    caption: 'Stay cute with me',
    note: '“Promise me we’ll always be this cute. Actually — promise me we’ll always be us.”',
    date: null,
    category: 'cute',
    emoji: '🐾',
  },
];

/* Optional: a 3D rotating photo wall (toggled in the UI). */
export const PHOTO_WALL_ENABLED = true;
