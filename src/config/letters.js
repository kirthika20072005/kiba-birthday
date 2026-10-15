/* ============================================================
   LETTERS — three things:
     MAIN_LETTER    : the big sealed birthday letter (Section 8)
     OPEN_WHEN      : the "Open When…" envelope collection (Section 9)
     FUTURE_LETTER  : a message from your future selves (Section 13)
   ------------------------------------------------------------
   All text is editable. Keep the lines you like and tweak the rest
   to sound like you.
   ============================================================ */

/* ---------------- Section 8 : the main letter ---------------- */
export const MAIN_LETTER = {
  envelopeName: 'Happy Birthday, My Love',
  // The first line is typed out with a typewriter effect:
  openLine: 'To the person who makes my whole world softer…',
  paragraphs: [
    'Chottu, if you’re reading this, it means my plan worked and you’re scrolling through a whole universe I built just for you. Every star here is something I feel about you but almost never say out loud.',
    'The first thing I thought of when I started writing this was your laugh — the real one, not the polite one. And the small thing you do that nobody else notices: the way you always check whether I reached home safe. There’s a version of me that only exists around you — softer, braver, happier — and I like her the most.',
    'Don’t worry about making it perfect. Say the true thing. If a paragraph feels too much, keep it anyway — this is the page where you are allowed to say everything.',
    'Happy birthday. Thank you for being born, and for ending up here, in my life.',
  ],
  signOff: 'With all my love,',
  signature: 'Bujik',
  ps: 'P.S. There’s still so much of this universe left to explore. Keep scrolling. ❤️',
};

/* ---------------- Section 9 : "Open When…" ---------------- */
/* Give each one a `hue` (0-360) to vary the paper colour. */
export const OPEN_WHEN = [
  {
    id: 'miss-me',
    hue: 340,
    seal: '💌',
    title: 'Open when you miss me',
    letter:
      'Hi, baby. I miss you too — probably at the exact same second you’re reading this. Close your eyes and pretend I’m stealing your hoodie and refusing to give it back. I’ll be there soon; until then, I’m right here in your pocket.',
  },
  {
    id: 'sad',
    hue: 265,
    seal: '🌧️',
    title: 'Open when you feel sad',
    letter:
      'Hey, it’s okay to feel low today. You don’t have to be strong for me — just be honest with me. I’m not going anywhere, not today, not ever. Drink some water, breathe with me, and remember: this feeling passes, but I don’t.',
  },
  {
    id: 'hug',
    hue: 25,
    seal: '🤗',
    title: 'Open when you need a hug',
    letter:
      'Okay, incoming. My arms around your neck, your arms around my waist, my head tucked exactly where it fits under your chin. I’m holding on tight and I’m not letting go for at least a full minute. Feel that? That’s me, right there with you.',
  },
  {
    id: 'lonely',
    hue: 220,
    seal: '🌌',
    title: 'Open when you feel lonely',
    letter:
      'You’re never as alone as you feel right now. I’m in your morning song, in that street we walked, in the smell of your favourite food. And tonight, look at the sky — same stars, same me thinking of you.',
  },
  {
    id: 'motivation',
    hue: 150,
    seal: '🔥',
    title: 'Open when you need motivation',
    letter:
      'Listen to me: you’ve done hard things before, and you did them brilliantly. This one is no different — it’s just new. One small step, then the next. I believe in you completely, and I’m cheering embarrassingly loudly.',
  },
  {
    id: 'smile',
    hue: 55,
    seal: '😄',
    title: 'Open when you want to smile',
    letter:
      'Remember the time you laughed so hard you made that weird snorting sound and then laughed harder because of the sound? Yeah. That. I’m picturing your face right now and grinning like an idiot. Smile, chottu — it’s your best look.',
  },
  {
    id: 'why-love-you',
    hue: 305,
    seal: '💜',
    title: 'Open when you wonder why I love you',
    letter:
      'Where do I start? The way you check if I ate. The way you get excited about the smallest things. The way you pretend you’re tough but melt completely around me. I love you in a hundred unglamorous, everyday ways — and I’d choose you again in every lifetime.',
  },
  {
    id: 'reassurance',
    hue: 190,
    seal: '🫶',
    title: 'Open when you need reassurance',
    letter:
      'Let me be very clear: I choose you. Not because you’re perfect, but because you’re you. You don’t have to earn my love and there’s no score being kept here. On your worst day, my answer is still you.',
  },
  {
    id: 'anniversary',
    hue: 0,
    seal: '💍',
    title: 'Open on our next anniversary',
    letter:
      'If you’re opening this on our anniversary — happy anniversary, my love. Look how far we’ve come since the day this universe was built for you. Whatever year this is, I hope we’re still this us. I love you more than the last time I wrote it.',
  },
  {
    id: 'future',
    hue: 45,
    seal: '🔭',
    title: 'Open when you want to imagine our future',
    letter:
      'Picture it with me: our own place, morning coffee in mismatched mugs, a wall full of these photos. Slow Sundays, big dreams, and us — older, maybe grayer, definitely still laughing at the same silly things. That’s where we’re headed, chottu.',
  },
];

/* ---------------- Section 13 : future letter ---------------- */
export const FUTURE_LETTER = {
  title: 'A Little Message From Our Future',
  subtitle: 'Written now, read later.',
  buttonLabel: 'Dream With Me',
  paragraphs: [
    'Dear us, five years from now — if you’re reading this together, curled up somewhere cozy, then every wish in this letter already came true.',
    'Picture an ordinary Tuesday five years from now. Where are the coffee mugs? What’s on the wall? Which argument are we still having, gently, because we know each other too well by then?',
    'Write down the adventures we still want — the cities, the small ambitions, the silly goals. Write down the things I hope we never stop doing.',
    'Whatever happens, I hope we still laugh the same way. I hope you still look at me like you do now.',
  ],
  signature: 'Us — five years from now, probably still this much in love. 🌙',
};
