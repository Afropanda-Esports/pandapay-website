# Panda Pay — Design System v2

**Status:** replaces the line, grid and neubrutalist direction in `landing-page-spec.md` (§1–§3 and every section layout in §5). Still valid from v1: the copy wiring (`src/content/home.ts`), `waLink()`, the analytics events (§8), stubs (§6) and the accessibility rules (§10).

**Sources:**
- The PandaPay Brand Guidelines (2026, Nighcode Designs).
- The Tactile Motion System (embossed surfaces and scroll set pieces).
- How calendly.com builds its page (measured in the browser, October 2026).

---

## 0. The idea in one paragraph

The page is a run of **rounded stages**: big inset panels that switch between the three brand colours as you scroll. Inside them, **tactile objects** (buttons, pads, the phone) feel pressable and are lit from the top. A **power-ease motion vocabulary** moves everything: things enter fast and settle softly, never bounce except when touched. The colour changes are the "pattern breaks". Each one marks a new chapter of the story: discover → pick → pay → receive → trust → start.

| v1 (removed) | v2 |
|---|---|
| Page framed by 1px rails, cells divided by lines | Inset rounded stages, no rules, separation by colour and space |
| Neubrutalist buttons (3px border, hard offset shadow) | Embossed pill buttons (edge, lip, belly, curve, lift) |
| Flat white page, one dark section | Black / white / orange stages alternating as pattern breaks |
| Ranade + Excon | Clash Grotesk (headings) + Poppins (body) + a mono for labels |
| Pin-and-scrub step list | Calendly-style sticky visual, plus a scaling window and a card deck |

---

## 1. Brand foundations (from the guidelines)

- **Colours:** White `#FFFFFF`, Eerie Black `#0C0C0C`, Orange `#FF6B01`. The logo SVGs use `#FF6B00`; the difference is invisible. Keep the token at `#FF6B00` so the logo and UI match exactly, unless the founder wants the guide's value.
- **Type:** Clash Grotesk for headings, Poppins for sub-headings and body. Both are already in `public/fonts/`.
- **Logo:** horizontal and stacked lockups only. "pay" stays lowercase. No re-stacking, no rotation, nothing inside the clear space (x = the height of the "p" bowl). On orange, use the white or black panda versions shown on the guide's lockup page.
- **Creative direction:** the guide explicitly moves *away* from "abstract gradients, credit card lines, or generic lightning bolts" towards an expressive, mascot-driven identity. So:
  - The panda mark appears as a character in motion moments: the loader, the final CTA, the 404 page.
  - No fintech gradient blobs. The only gradients are the button curve and soft lighting on surfaces.

**Two flags before using guide assets on the site**

1. **The guide's triangle, circle, cross and square motif.** It is PlayStation's controller-button symbol set (Sony's trademark). It is also in green, red, lilac and pink, outside the three-colour palette. Keep it off the website unless the founder confirms they're cleared to use it.
2. **The guide's application imagery.** It includes third-party game key art (Halo, Forza Horizon, EA FC, Roblox and others). That's fine in an internal mock-up but needs licences on a live site.

---

## 2. What Calendly does, and what we take

Measured on calendly.com at 1280px:

| Pattern | How Calendly builds it | Panda Pay use |
|---|---|---|
| **Inset stage** | Each major section is a 64px-radius panel inside 8px (mobile) / 24px (tablet+) page padding, `overflow: clip`. The hero's product card floats inside it at a 48px radius. | Every section is a stage. Hero, scaling window and final CTA are full stages; the others sit on the page background. |
| **Sticky visual** | The left column scrolls through 4 features, each about 820px tall. The right column holds a 580×580 visual, 80px radius, `position: sticky; top: 204px`, crossfading per feature. | "How it works": steps scroll, the phone stays put and its screen changes. Replaces the v1 pin-and-scrub. It's lighter, works on every device, and nothing is trapped in a pinned track. |
| **Dark proof section** | Dark stage with a stack of absolutely positioned white cards (64px radius) shuffled as a deck. | Trust section as a deck of trust cards. Real testimonials slot in later. |
| **Closing marquee** | A row of preview cards looping under the final CTA. | Order-status chips looping ("Payment confirmed", "Code delivered") as a living ticker. |
| **Header** | Sticky; gains a shadow once you scroll. | Floating raised pill nav (tactile nav bar) that tightens on scroll. |
| **Controls** | 16–20px radius, 150ms colour transitions. | Pill buttons, embossed recipe (§5). |

---

## 3. Tokens (`src/styles/tokens.css`)

Remove: `--color-line*`, `--frame-*`, `--border-btn`, `--shadow-btn*`, `--radius-btn`. Replace the colour and surface block with:

```css
@property --tint {            /* animatable accent, follows the active stage */
  syntax: "<color>";
  inherits: true;
  initial-value: #ff6b00;
}

:root {
  /* Brand */
  --orange: #ff6b00;
  --black: #0c0c0c;
  --white: #ffffff;

  /* Derived steps (mixes of the three brand colours only) */
  --orange-deep: color-mix(in oklab, var(--orange) 78%, var(--black));   /* edges on orange */
  --orange-soft: color-mix(in oklab, var(--orange) 12%, var(--white));   /* tinted wells on white */
  --black-raised: color-mix(in oklab, var(--black) 88%, var(--white));   /* #242424-ish plates on black */
  --black-well: color-mix(in oklab, var(--black) 96%, var(--white));
  --white-well: color-mix(in oklab, var(--black) 5%, var(--white));      /* #f2f2f2 */
  --ink-muted-on-white: color-mix(in oklab, var(--black) 64%, var(--white));
  --ink-muted-on-black: color-mix(in oklab, var(--white) 66%, var(--black));

  /* Page */
  --page-bg: var(--white);
  --page-pad: clamp(0.5rem, 1.6vw, 1.5rem);           /* 8 → 24px around stages */
  --stage-radius: clamp(2rem, 4vw, 4rem);              /* 32 → 64px */
  --stage-pad: clamp(1.25rem, 5vw, 5rem);
  --content-max: 76rem;
  --radius-card: clamp(1.5rem, 2.4vw, 2rem);           /* 24 → 32 */
  --radius-visual: clamp(2rem, 5vw, 5rem);             /* the sticky visual: 80 on desktop */
  --radius-pad: 0.875rem;                              /* 14px square pads */

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);          /* ≈ power3.out, for CSS */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);       /* ≈ power2.inOut */
  --press: cubic-bezier(0.3, 0.7, 0.4, 1);
  --dur-press: 140ms;
  --dur-ui: 220ms;
  --dur-tint: 700ms;

  transition: --tint var(--dur-tint) var(--ease-in-out);
}
```

### Identities (one voice, three palettes)

Each stage declares `data-id`. The identity changes colours only; spacing, type, radius, the button recipe and the motion never change.

```css
[data-id="house"] {          /* Eerie Black: hero, scaling window, final CTA, footer */
  --bg: var(--black); --surface: var(--black-raised); --well: var(--black-well);
  --ink: var(--white); --muted: var(--ink-muted-on-black);
  --edge: #000; --tint: var(--orange);
}
[data-id="paper"] {          /* White: catalogue, why, FAQ */
  --bg: var(--white); --surface: var(--white); --well: var(--white-well);
  --ink: var(--black); --muted: var(--ink-muted-on-white);
  --edge: color-mix(in oklab, var(--black) 22%, var(--white)); --tint: var(--orange);
}
[data-id="signal"] {         /* Orange: pattern breaks (trust, the scaling window's inside) */
  --bg: var(--orange); --surface: color-mix(in oklab, var(--orange) 88%, var(--white));
  --well: var(--orange-deep);
  --ink: var(--black); --muted: color-mix(in oklab, var(--black) 72%, var(--orange));
  --edge: var(--orange-deep); --tint: var(--black);
}
```

**Contrast rules:**
- Black on orange is 6.85:1. White on orange is 2.85:1, so never use it for text.
- Muted ink on black and on white both stay above 4.5:1.
- On orange, muted text is black at 72%, never grey.

---

## 4. Typography

| Role | Face | Size | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| Display (hero, final CTA) | Clash Grotesk 600 | `clamp(3rem, 1.6rem + 6vw, 7.5rem)` | 0.92 | −0.035em | Sentence case, matching the guide. Char reveal. |
| H2 (stage headings) | Clash Grotesk 600 | `clamp(2.25rem, 1.4rem + 3.4vw, 4.5rem)` | 0.98 | −0.03em | Line reveal. |
| H3 (cards, steps) | Clash Grotesk 500 | `clamp(1.375rem, 1.1rem + 1vw, 2rem)` | 1.1 | −0.02em | |
| Index numerals | Clash Grotesk 700 | 2× the H2 size | 0.85 | 0 | Outline only (`-webkit-text-stroke: 1px var(--muted); color: transparent`), echoing the guide's "01 / 02 / 03" chapter markers. |
| Lead | Poppins 300 | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` | 1.5 | 0 | Word reveal. |
| Body | Poppins 400 | `clamp(1rem, 0.95rem + 0.2vw, 1.0625rem)` | 1.6 | 0 | |
| Buttons | Poppins 500 | 15px (sm 13.5, xl 22) | 1 | 0.01em | |
| Eyebrow / labels / readouts | Mono 500 | 11–12px | 1.2 | 0.12em, uppercase, tabular-nums | Order IDs, "₦", status, step counters. |

**Font files to add**
- `poppins-medium.woff2` (500) for buttons, and `poppins-semibold.woff2` (600).
- A mono, either self-hosted **JetBrains Mono** 500 (OFL) or **Geist Mono** 500 (OFL). Until it's added, the stack falls back to `ui-monospace`.

**Preloads:** `clash-grotesk-semibold` and `poppins-regular` only.

---

## 5. Buttons and tactile surfaces

### 5.1 Directional logic

- **One light source, from the top.**
  - Raised things (buttons, pads, plates) catch light on their top lip and darken at the bottom.
  - Recessed things (the phone screen, wells, inputs) are the inverse.
- **Motion follows the same axis as the light.**
  - Hover: the object rises 1px, a 1.06 brightness lift, no colour change.
  - Press: it sinks 1px, and the highlight flips to the bottom.
- **Forward is right.** Every button that leads to WhatsApp carries a trailing arrow:
  - Hover: the arrow travels +4px.
  - Click: it shoots +12px and fades before the handoff, so the button reads as "go".
- **Up is confirm.** A success state, such as "Code copied" in a demo, lifts its LED dot and pulses once upward. It never shakes.

### 5.2 Recipe (`src/components/ui/button.astro` + `.btn` in a global layer)

```css
.btn {
  --b-base: var(--orange); --b-ink: var(--black); --b-edge: var(--orange-deep);
  --b-gloss: .55; --b-shade: rgb(120 40 0 / .28);

  display: inline-flex; align-items: center; justify-content: center; gap: .6em;
  min-height: 48px; padding: 0 22px; border-radius: 999px;
  border: 1px solid var(--b-edge);
  background-color: var(--b-base);
  background-image: linear-gradient(180deg,
    rgb(255 255 255 / calc(var(--b-gloss) * .45)) 0%,
    rgb(255 255 255 / 0) 55%,
    rgb(0 0 0 / .08) 100%);
  color: var(--b-ink);
  font: 500 15px/1 var(--font-sans); letter-spacing: .01em; text-decoration: none;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / var(--b-gloss)),
    inset 0 -3px 6px var(--b-shade),
    inset 0 0 0 1px rgb(255 255 255 / .05),
    0 1px 2px rgb(0 0 0 / .3),
    0 10px 18px -10px rgb(0 0 0 / .6);
  transition: transform var(--dur-press) var(--press), box-shadow var(--dur-press), filter .2s;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.btn:hover { filter: brightness(1.06); transform: translateY(-1px); }
.btn:active, .btn.is-pressed {
  transform: translateY(1px);
  background-image: linear-gradient(180deg, rgb(0 0 0 / .12), rgb(255 255 255 / 0) 60%);
  box-shadow: inset 0 2px 6px var(--b-shade), inset 0 1px 2px rgb(0 0 0 / .25), 0 1px 0 rgb(255 255 255 / .06);
}
.btn:focus-visible { outline: 2px solid var(--tint); outline-offset: 3px; }

.btn__arrow { transition: transform var(--dur-ui) var(--ease-out); }
.btn:hover .btn__arrow { transform: translateX(4px); }

/* Variants: tokens only */
.btn--dark  { --b-base: var(--black-raised); --b-ink: var(--white); --b-edge: #000; --b-gloss: .14; --b-shade: rgb(0 0 0 / .5); }
.btn--light { --b-base: var(--white); --b-ink: var(--black); --b-edge: color-mix(in oklab, var(--black) 28%, var(--white)); --b-gloss: .95; --b-shade: rgb(0 0 0 / .14); }
.btn--sm { min-height: 38px; padding: 0 16px; font-size: 13.5px; }
.btn--xl { min-height: 88px; padding: 0 48px; font-size: 22px; }
.btn--icon { width: 44px; padding: 0; }

/* Per identity: primary = highest contrast against the stage */
[data-id="house"]  .btn--secondary { --b-base: var(--black-raised); --b-ink: var(--white); --b-edge: #000; --b-gloss: .14; --b-shade: rgb(0 0 0 / .5); }
[data-id="paper"]  .btn--secondary { --b-base: var(--white); --b-ink: var(--black); --b-edge: color-mix(in oklab, var(--black) 28%, var(--white)); --b-gloss: .95; --b-shade: rgb(0 0 0 / .14); }
[data-id="signal"] .btn            { --b-base: var(--black); --b-ink: var(--orange); --b-edge: #000; --b-gloss: .16; --b-shade: rgb(0 0 0 / .55); }
[data-id="signal"] .btn--secondary { --b-base: color-mix(in oklab, var(--orange) 88%, var(--white)); --b-ink: var(--black); --b-edge: var(--orange-deep); --b-gloss: .6; --b-shade: rgb(120 40 0 / .3); }
```

**Mark-up:**

```html
<a class="btn" href="…" data-track="cta_primary" data-location="hero">
  <span class="btn__label">Start on WhatsApp</span>
  <svg class="btn__arrow">…</svg>
</a>
```

The arrow is a 16px stroke icon. Use a chat-bubble glyph if you want a leading icon: not the WhatsApp logo, whose use is governed by Meta's brand rules.

**Click script for WhatsApp CTAs** (`lib/motion/buttons.ts`):

```ts
document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>(".btn[href*='wa.me']");
  if (!btn || reduced()) return;
  gsap.timeline()
    .to(btn.querySelector(".btn__arrow"), { x: 12, autoAlpha: 0, duration: 0.25, ease: "power2.in" })
    .set(btn.querySelector(".btn__arrow"), { x: -8 })
    .to(btn.querySelector(".btn__arrow"), { x: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" }, "+=0.3");
});
```

The link still opens normally; the animation never blocks navigation.

### 5.3 The rest of the family

| Element | Where | Treatment |
|---|---|---|
| **Pad** (radius 14px) | Catalogue picker, How it works service switcher | Button recipe, square. "On" = dark fill + orange LED dot (`::after`, 6px). Coming-soon pads show the LED off and are `aria-disabled`, not clickable. On tap: `gsap.fromTo(el, {scale:.9}, {scale:1, duration:.5, ease:"elastic.out(1.1,.45)"})`. |
| **Device plate** (the phone) | Hero, sticky visual, scaling window | Raised black plate: radius 44px, 1px `#000` edge, `inset 0 1px 0 rgb(255 255 255/.18)`, `inset 0 -8px 16px rgb(0 0 0/.35)`, `0 40px 70px -40px rgb(0 0 0/.7)`. The screen inside is recessed: `inset 0 3px 8px rgb(0 0 0/.45)`. No screw dots on a phone. |
| **Card** | Why, Trust, FAQ | Flat `--surface`, `--radius-card`, no emboss. The recipe is reserved for things you press. On white stages, cards sit on `--white-well` with no border. |
| **Well** | Code box in screens, the FAQ answer area, inputs | Recessed: `--well` fill, `inset 0 2px 6px rgb(0 0 0/.18)`, `0 1px 0 rgb(255 255 255/.5)` bottom lip on light stages. |
| **Nav bar** | Header | Raised pill: black at 82% with `backdrop-filter: blur(14px)`, 1px `#000` edge, `inset 0 1px 0 rgb(255 255 255/.1)`. Reads on every stage colour. |

**Don'ts**
- No big blurry outer shadows in the background colour (neumorphism).
- Never drop the edge.
- Never apply the recipe to text links or every card.
- Only one light direction.

---

## 6. Motion vocabulary (GSAP "power" flow)

`lib/motion/gsap.ts` defaults stay `ease: "power3.out", duration: 0.8`. Rules:

| Job | Ease | Duration | Notes |
|---|---|---|---|
| Enter (anything appearing) | `power3.out`; `expo.out` for headline chars | .8 / 1.0 | Fast start, long settle. |
| Exit | `power2.in` | .35–.45 | Exits are always shorter than entries. |
| Stage-to-stage (colour, clip, scale) | `power2.inOut` (`none` when scrubbed) | scrub .7 | |
| Hover / press | CSS `--press` | 140ms | |
| Touched pads, LEDs | `elastic.out(1.1,.45)` | .5 | The only bounce on the page, and only on user input. |
| Loops (marquee, typing dots) | `none` | — | Pause off-screen with IntersectionObserver. |

**Text reveals** (use the existing `text-splitting.ts`, after `document.fonts.ready`):

- **Chars:** display headlines. Each char wraps in `.c > .ci`; animate from `yPercent:115, rotate:6` with stagger `.025`.
- **Words:** the hero lead. From `yPercent:105` with stagger `.012`.
- **Lines:** H2s. From `yPercent:110` with stagger `.08`, triggered at `top 80%`.
- **Scrub fade:** the one long "Why" statement. Words go from opacity .14 to 1, from `top 80%` to `bottom 45%`. Naira amounts and step numbers take `--tint`.
- **Accessibility:** keep a visually hidden copy of each split text, and mark the split spans `aria-hidden`.

**The tint:**
- `--tint` animates through `@property` whenever a stage becomes active. A ScrollTrigger on each `[data-id]` stage sets `document.documentElement.style.setProperty('--tint', …)`, firing between `top center` and `bottom center`.
- What follows `--tint`: the nav's CTA, the progress line in the nav, focus rings, and the active pad's LED.

---

## 7. The page, as a directional flow

The colours alternate so that every chapter break is a colour break. It reads as a story:

```
┌ house  ┐  1 Hero         "Your gaming and digital services store. On WhatsApp."
│ paper  │  2 Catalogue    pick what you want            (interactive picker)
│ house→ │  3 Scaling      "One chat. No app."           (window opens to signal-orange)
│ paper  │  4 How it works the order, step by step       (sticky phone)
│ paper  │  5 Why          built for how you already pay (scrub statement + bento)
│ signal │  6 Trust        your money, accounted for     (card deck)   ← pattern break
│ paper  │  7 FAQ
└ house  ┘  8 Final CTA + footer                         (marquee of real order states)
```

### 7.1 Header

- Floating raised-pill nav, 12px from the top. Contents: logo, links, and a `btn--sm` "Start on WhatsApp" that follows `--tint`.
- On scroll past 40px, the pill tightens (padding 8px → 4px) and gains a 2px orange progress line along its bottom edge (`scaleX` from page progress).
- On mobile, the menu opens as a black sheet. Links stagger in with line reveals.

### 7.2 Hero — `data-id="house"`, full stage

- **Layout:** a stage with `--stage-radius` inside `--page-pad`, min-height `calc(100svh - 2 * var(--page-pad))`. Desktop columns 7/5: copy left, phone right. On mobile, the phone sits under the copy, cropped by the stage's bottom edge (peeking up).
- **Load timeline:**
  1. Chars reveal.
  2. The lead's words, overlapping at .35s.
  3. The proof row (mono labels).
  4. The buttons rise 16px.
  5. The phone plate opens with `clip-path: inset(0 50% 0 50% round 44px)` → `inset(0 0 0 0 round 44px)` over .9s with `power3.inOut`.
  6. The chat messages enter one by one (`#hero-msg-1…5`, `y:24 → 0`, stagger .35). The code box's dots shimmer once.
- **Interactive:** "Copy code" and "How to redeem" in the screen are hit areas. Tapping "Copy code" plays a pad press and a tiny "Copied" chip rising from the button. Nothing real is copied; the code is masked.
- **Asset:** `src/assets/illustrations/panda-pay-hero-phone-1170x2532.svg`, the screen built earlier, recoloured to the house palette. Chat background `--black-well`, incoming bubbles `--black-raised` with white ink, outgoing bubbles orange with black ink. **Needs regenerating for the dark stage.**

### 7.3 Catalogue — `data-id="paper"`

- **Heading row:** H2 line reveal; intro on the right.
- **The picker is a live demo, not a grid of cards.**
  - Left: a row of pads (PlayStation gift cards · PlayStation Plus · More gaming · Airtime · Data · Electricity · Cable TV).
  - Right: a 3:4 visual stage at `--radius-visual`, holding the matching illustration (`panda-pay-playstation-600x800.webp`, `…-plus-…`).
- **Selecting a live pad:**
  - The pad LED lights.
  - The visual swaps with a vertical clip wipe (`inset(100% 0 0 0)` → `inset(0)`, .6s, `power3.inOut`).
  - The name and line below change with a line reveal.
  - The CTA updates its `href` to that product's `waLink(message)`.
- **Coming-soon pads:** LED off, a mono "Soon" label, `aria-disabled="true"`. Tapping one gives a small shake-free nudge (`x: 3 → 0`, `power2.out`) and shows "Coming soon" in the description slot.
- **Mobile:** the pads become a horizontal scroll strip above the visual.
- **Tracking:** `category_interaction` on every pad and `cta_product` on the buy button.

### 7.4 Scaling window — `data-id="house"` around a `signal` window

- A 100svh section, pinned for `+=150%`, scrub .7.
- A full-bleed orange window animates `clip-path` from `inset(38% 32% 10% 32% round 40px)` (desktop) / `inset(40% 12% 12% 12% round 32px)` (mobile) → `inset(0 round 0)`. Its content (a large phone plate showing the catalogue screen, plus the statement) scales 1.6 → 1 at the same time.
- The section heading ("One chat. No app. Every order on record.") fades up and out at about 35%. Three mono labels rise at about 62%: "No app to install", "Pay from any Nigerian bank", "Track every order in chat".
- When the window is fully open, `--tint` becomes black: the page has entered the orange chapter.
- **Reduced motion or no JS:** a static orange stage with the statement and labels.

### 7.5 How it works — `data-id="paper"`, sticky visual

Calendly's pattern, adapted:
- **Layout:** two columns. The left column holds 9 step blocks, each `min-height: 70svh` with its content centred. The right column holds the device plate (max 380px wide) inside a 580×580 `--radius-visual` stage on `--white-well`, `position: sticky; top: calc(50svh - 290px)`.
- **Above the steps:** the service switcher as pads (PlayStation · Airtime · Data · Electricity · Cable TV). Switching swaps the screen set and keeps the current step.
- **Per step, entering the centre band:** a ScrollTrigger at `top center` → `bottom center` does three things:
  - Sets the active step: its index numeral turns `--tint`, its text goes to full ink, and the others fade to 40%.
  - Crossfades the screen (`autoAlpha`, .35s).
  - Advances a thin progress arc around the visual stage (SVG `stroke-dashoffset`).
- **Mobile:** the visual becomes sticky at the top (`top: 72px`, 46svh tall) and the steps scroll beneath it.
- This replaces `lib/motion/flow.ts`'s pin and scrub. Keep its tab and click logic and drop the pin.
- **Screens:** `flow-{service}-{01–09}` stubs until the SVG screens exist, all in the same house-style chat UI as the hero.

### 7.6 Why — `data-id="paper"`

- One scrub-fade statement across the full width. Suggested text, built from the existing benefit lines: *"No new app. Pay in Naira from any Nigerian bank. Get the right card for your region, see only what's in stock, and keep every order in one chat."*
- Under it, a bento of 6 cards on `--white-well`, two sizes:
  - Big cards: No new app, Pay in Naira.
  - Small cards: the rest.
- Each card has a small line icon that draws on (`stroke-dashoffset`) as the card enters.

### 7.7 Trust — `data-id="signal"` full stage (the main pattern break)

- The orange stage with black ink.
- The six trust cards are a **deck**: absolutely stacked white cards at `--radius-card`, slightly rotated (−3°, 2°, −1°…).
- Scrolling through the section (pinned `+=120%` on desktop) flicks each top card up and away (`yPercent:-120, rotate:-8`, `power2.in`) and brings the next forward (`scale .94 → 1`, `power3.out`). A mono counter reads "02 / 06".
- **Mobile or reduced motion:** the cards become a vertical list.
- The "Real customers" card stays a stub until approved testimonials and figures exist.
- **Support row:** "Stuck on an order?" with a `.btn` (black, because it's on orange).

### 7.8 FAQ — `data-id="paper"`

- A two-column layout: heading and "Still stuck? Message us" on the left, questions on the right.
- Each question is a row on `--white-well`, radius 20px, 8px apart.
- When a question opens, its answer sits in a recessed well, the `+` rotates to `×` (power3.out), and the height animates with `interpolate-size` where supported.

### 7.9 Final CTA and footer — `data-id="house"`, full stage

- The display headline char-reveals. The panda mark (`brand/icon-white.png`, upgraded to the SVG) does a single peek: it rises from behind the stage's bottom edge (`yPercent: 40 → 0`, `expo.out`), the "peek-a-boo" from the guide.
- `btn--xl` "Start on WhatsApp".
- **Marquee:** under the button, one looping row of order-state chips. These are real states from the product flow, not reviews: *Payment confirmed · Code delivered · Order PP-xxxxx · Delivered*. Pause on hover; stop with reduced motion.
- **Footer:** continues the house stage. Link columns in Poppins, headings in mono labels, the small print at 70% white.

---

## 8. Layout primitives (replace `components/frame/*`)

| Component | Purpose |
|---|---|
| `Stage.astro` (`id`, `identity: "house" \| "paper" \| "signal"`, `full?: boolean`) | Section wrapper. `full` = inset rounded panel with `--page-pad` margin. Otherwise the stage background is the page itself, with `--stage-pad` padding. Sets `data-id` and `data-section`. |
| `StageHead.astro` (`heading`, `intro?`, `index?`) | H2 with line reveal, optional outlined index numeral ("01"), intro on the right at ≥1024px. |
| `Button.astro` (`href`, `variant`, `size`, `track`, `location`, `arrow?`) | Replaces `button-link.astro`. |
| `Pad.astro` (`active`, `disabled`, `led?`) | Picker and switcher controls. |
| `Device.astro` | Replaces `phone.astro` with the raised plate and recessed screen. |
| `Card.astro` | Flat card. |
| `Marquee.astro` | Loop with duplicated track, `aria-hidden` copy, IntersectionObserver pause. |

**Delete:**
- `frame/frame.astro`, `frame/cells.astro`, `frame/section.astro`, `frame/section-head.astro`
- `ui/button-link.astro` once `Button` is in
- `.section--marked` and the corner markers
- The `.js [data-reveal]` hiding rule if it still targets cell layouts.

---

## 9. Responsive and reduced motion

- **Breakpoints:** 760px (stacked vs side by side, matching the tactile system) and 1024px (full desktop composition).
- **Mobile (≤760px):**
  - No horizontal pins.
  - The scaling window keeps its pin but uses the mobile inset.
  - The trust deck becomes a list.
  - The sticky visual sits at the top.
- **Reduced motion:**
  - No pins, no scrubs, no char splitting.
  - Every stage shows in its final state.
  - The tint switches instantly.
  - Pads still light up, and every demo still works.
- **No JS:** the stacked layout is the default. JS adds `.is-enhanced` to `<html>` before any hiding happens. Nothing below the fold is ever left at `opacity: 0` without JS, and there's a 1.6s failsafe that reveals the hero headline.
- `overflow-x: clip` on `html, body`. Side gutter `max(16px, env(safe-area-inset-left))`.

---

## 10. Build order

1. Tokens, identities and `@property --tint`. Fonts: add Poppins 500/600 and a mono.
2. `Stage`, `StageHead`, `Button`, `Pad`, `Device`, `Card`. Remove the frame primitives and v1 button tokens.
3. Header pill and footer.
4. Static sections in the order of §7, all stubs in place.
5. Motion:
   1. Hero load timeline.
   2. Line and word reveals.
   3. Tint switching.
   4. Catalogue picker.
   5. Sticky visual.
   6. Scaling window.
   7. Trust deck.
   8. Marquee.
6. Regenerate the hero screen for the house palette, then the flow screens (PlayStation first).
7. QA at 360 / 768 / 1024 / 1280 / 1440, reduced motion on and off, no JS.

### Done when

- No rails, cell lines or hard offset shadows remain anywhere.
- Every colour on the page is orange, black, white or a mix of them; every pressable thing uses the emboss recipe; nothing else does.
- Each stage switch moves `--tint` smoothly, and the nav CTA, focus rings and LEDs follow it.
- Every demo (hero screen, catalogue picker, service switcher) works by touch and keyboard, and with reduced motion.
- No fake reviews or invented metrics. Every unconfirmed figure is a stub or sample value flagged in `home.ts`.
