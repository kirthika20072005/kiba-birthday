# A Little Universe — Birthday Website

An interactive, cinematic birthday website built with **React + Vite** (plain JavaScript, no backend).
Nineteen little "rooms" — a portal, countdown, cake, gallery, letters, a jar of reasons,
games, a star map, love coupons, a scripted chatbot, a garden, a secret vault, a treasure hunt,
gift boxes, and a final surprise — tied together by stars, petals, music, and confetti.

Everything is **placeholder content**. Drop in your own words and media any time.

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires Node 18+ (developed on Node 20).

---

## Personalize it (start here)

Almost everything you'll want to change lives in **`src/config/`**. Each file is commented and
uses obvious placeholders like `"[His Name]"`.

| File | What it controls |
|------|------------------|
| `src/config/site.js` | **Edit this first.** Names, nickname, the birthday date + timezone, and the portal/countdown copy. |
| `src/config/gallery.js` | Photos, captions, categories. |
| `src/config/videos.js` | Memory clips + the secret birthday video. |
| `src/config/letters.js` | The main letter, the 10 "Open When…" envelopes, and the future letter. |
| `src/config/reasons.js` | The 100 reasons (keep 100, or adjust the jar copy). |
| `src/config/quiz.js` | Game level 1 quiz questions. |
| `src/config/moods.js` | The "Right Now?" mood messages. |
| `src/config/chatbot.js` | Cupid's scripted questions + replies (fully offline). |
| `src/config/coupons.js` | Love coupons. |
| `src/config/flowers.js` | The flower garden + finale. |
| `src/config/gifts.js` | The virtual gift boxes. |
| `src/config/secrets.js` | The password vault + treasure-hunt clues. |
| `src/config/finalReveal.js` | The final video + closing letter. |
| `src/config/music.js` | The soundtrack tracks + player defaults. |

### The birthday date

In `src/config/site.js` change only this object to move the countdown:

```js
birthday: {
  date: '2026-11-15T00:00:00', // the moment the birthday begins
  timezone: 'Asia/Kolkata',     // any IANA timezone name
  label: 'Birthday',
},
```

The countdown handles daylight-saving correctly and shows a "it's your day" state on the day itself.

---

## Adding media

Files in **`public/`** are served from the site root. Drop your files here, then point the config
at them (relative paths, no leading slash):

```
public/assets/images/   →  src: 'assets/images/us-1.jpg'
public/assets/videos/   →  src: 'assets/videos/memory-1.mp4'
public/assets/audio/    →  src: 'assets/audio/song.mp3'
```

- **Images / video / audio are optional.** Every media slot has a graceful placeholder, so the
  site looks intentional even before you add anything.
- Video supports `mp4` / `webm`. You can also use a YouTube/Vimeo embed via the `embed` field.
- Recommended sizes: photos ~1600px on the long edge, video ≤ 1080p, audio `mp3`.

---

## The 19 sections

Portal · Countdown · The Cake · Memories · Videos · Love Letters · Open When… ·
100 Reasons · Games · Star Map · Future Letter · Love Coupons · Right Now? · Cupid (chatbot) ·
Garden · Secret Vault · Treasure Hunt · Gifts · Final Surprise

A left-edge navigation and an "explorer meter" track how much of the universe has been visited.
Progress is saved in the browser (`localStorage`) and can be reset from the footer.

---

## Features & behavior notes

- **Reduced motion:** everything respects `prefers-reduced-motion`; animations and confetti are
  toned down automatically.
- **Music:** browsers block autoplay, so the soundtrack starts only after the "Enter My World"
  click. The floating player controls volume and track.
- **Confetti:** sections fire bursts via a small internal event system — no styling needed.
- **Star map:** labeled as an artistic/fictional sky, not astronomical data.
- **No fake confirmations:** the site never claims something was "saved" or "sent" that isn't.

### ⚠️ The "secret" password is not real security

The vault password and treasure-hunt answers are **frontend-only** and readable in the page
source. It's a playful puzzle, not protection. **Do not put genuinely private content behind it.**
For real privacy you'd need a backend or authentication — out of scope for this project.

---

## Deployment

`vite.config.js` sets `base: './'`, so the build works from any subfolder.

**Netlify / Vercel** — connect the repo, build command `npm run build`, publish directory `dist`.

**GitHub Pages**

```bash
npm run build
# then publish the dist/ folder (e.g. push to a gh-pages branch)
```

Because paths are relative, no extra base-path config is needed.

---

## Tech stack

- **React 18** + **Vite 5** (JavaScript / JSX, no TypeScript)
- **canvas-confetti** for celebrations, **gsap** for a few timeline effects
- Hand-written CSS with design tokens (`src/styles/tokens.css`)
- No backend, no paid APIs, no tracking

---

## Project structure

```
src/
  config/      ← your content (edit here)
  context/     ← progress + music state (localStorage)
  hooks/       ← countdown, in-view, reduced-motion, localStorage
  lib/         ← helpers, media helpers, confetti
  components/
    effects/   ← star field, particles, petals, confetti layer
    ui/        ← Reveal, Modal, Envelope, GiftBox, Polaroid, Typewriter…
    layout/    ← Nav, MusicPlayer, CursorSparkles, Footer, SectionShell
    sections/  ← the 19 sections
  styles/      ← tokens, global, components, animations, responsive
public/assets/ ← your images, videos, audio (.gitkeep placeholders)
```

Enjoy building it. Replace every `"[…]"` with something true. ❤️
