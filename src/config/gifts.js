/* ============================================================
   VIRTUAL GIFT BOXES — Section 20
   ------------------------------------------------------------
   Smaller boxes first; the LAST one is the big mysterious one.
   Each `type` decides how the surprise is shown:
     'note'   -> reveal a text note
     'memory' -> reveal a memory + link to gallery
     'coupon' -> reveal a coupon (edit couponId to match coupons.js)
     'link'   -> open an external URL (a real gift / gift card)
     'final'  -> triggers the golden light + confetti
   ============================================================ */

export const GIFTS = [
  {
    id: 'g1',
    size: 'small',
    wrap: 'love',
    title: 'A Small Note',
    type: 'note',
    emoji: '💌',
    content: '“You are loved more than you know, exactly as you are. Keep this one for the days you forget.”',
    link: null,
    couponId: null,
  },
  {
    id: 'g2',
    size: 'small',
    wrap: 'gold',
    title: 'A Memory',
    type: 'memory',
    emoji: '📸',
    content: 'Open the gallery — one of those frames is my favourite, and I’d like to tell you why.',
    link: '#memories',
    couponId: null,
  },
  {
    id: 'g3',
    size: 'medium',
    wrap: 'purple',
    title: 'A Promise For You',
    type: 'note',
    emoji: '🎟️',
    content: 'Good for one thing of your choosing — just say the word and it’s yours.',
    link: null,
    couponId: null,
  },
  {
    id: 'g4',
    size: 'medium',
    wrap: 'pink',
    title: 'Something Real',
    type: 'note',
    emoji: '🎁',
    content:
      '“This one isn’t a thing you can unwrap — it’s a promise. Whatever you need, whenever you need it, I’m yours. Redeem any time, anywhere, forever.”',
    link: null,
    couponId: null,
  },
  {
    id: 'g5',
    size: 'large',
    wrap: 'mystery',
    title: 'The Last, Big One',
    type: 'final',
    emoji: '🔮',
    content:
      'This is the one I saved until last — not an object, just something I wanted to give you directly.',
    link: '#final',
    couponId: null,
  },
];
