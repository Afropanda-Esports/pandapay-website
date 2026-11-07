# Panda Pay — Landing Page Build Spec

Single-page Astro build. This file defines the layout system, section structure, interactions, motion and image stubs. Copy comes from the approved content doc and is never hardcoded in components (see §7).

Goal of the page, in order: say what Panda Pay is in the first screen → let the visitor explore the catalogue → explain the order flow end to end → remove doubt → convert on **Start on WhatsApp**.

---

## 0. Ground rules

- Astro, static output, no framework islands. Interactivity and GSAP live in plain `<script>` tags inside the component that owns them.
- Class names: BEM kebab-case (`.flow__step--active`). Styles colocated in each component's `<style>`.
- Colours: only `--color-orange`, `--color-black`, `--color-white`. Every grey (lines, muted text, hover wash) is black mixed with transparency, defined once as a token (§1). No other hues, no gradients except the stub hatch.
- One line weight everywhere: 1px. No drop shadows on cards; depth comes from lines and the hover wash.
- Corners: square for cells and stubs, `--radius-xs` for buttons and tags. Pills only for status tags.
- Every image slot is a `<Stub>` until the real asset exists (§6).
- Mobile-first CSS. Breakpoints come from the layout: `720px` (rails off, single column) and `1024px` (full desktop grid).

---

## 1. Tokens to add (`src/styles/tokens.css`)

Add under the semantic colours:

```css
  /* Lines and tints: black mixed with transparency, so only three colours exist */
  --color-line: color-mix(in srgb, var(--color-black) 10%, transparent);
  --color-line-strong: color-mix(in srgb, var(--color-black) 20%, transparent);
  --color-text-muted: color-mix(in srgb, var(--color-black) 62%, var(--color-white)); /* ≈ 5.4:1 on white */
  --color-wash: color-mix(in srgb, var(--color-black) 3%, transparent);              /* hover fill */
  --color-on-accent: var(--color-black);                                             /* text on orange: 6.85:1 */

  /* Inverted (dark) section */
  --color-line-inverse: color-mix(in srgb, var(--color-white) 14%, transparent);
  --color-text-muted-inverse: color-mix(in srgb, var(--color-white) 68%, var(--color-black));
```

And under Layout:

```css
  --frame-max: 80rem;                         /* 1280px content column between the rails */
  --frame-pad: clamp(1.25rem, 4vw, 3rem);     /* inner padding from the rails */
  --header-h: 3.5rem;                         /* 56px */
```

Never put white text on orange (2.85:1). Orange surfaces always carry `--color-on-accent`.

---

## 2. The line system

The whole page sits inside one framed column. Lines do four jobs: frame the page, end each section, divide cells inside a section, and mark section corners.

```
        ┌ rail                                             rail ┐
        │                                                       │
 header │ logo  │            nav             │  Start on WhatsApp │
        ├───────┴────────────────────────────┴───────────────────-┤ ← header rule
        │                                                       │
        │   Section heading               intro text            │
        │                                                       │
        ├──────────────┬──────────────┬─────────────────────────┤ ← cells: 1px gaps show the line
        │   cell       │   cell       │   cell                  │
        ├──────────────┴──────────────┴─────────────────────────┤
        +                                                       + ← section rule + corner markers
        │   next section …                                      │
```

Rules:

1. **Rails.** `.frame` wraps header, main and footer: `max-width: var(--frame-max)`, centred, `border-inline: 1px solid var(--color-line)`. The rails run the full page height because the frame is the parent of everything.
2. **Section rule.** Every `.section` has `border-bottom: 1px solid var(--color-line)`. The rule spans the frame, rail to rail.
3. **Cells.** A `.cells` grid draws internal dividers with the gap trick: `gap: 1px; background: var(--color-line)`, every child has `background: var(--color-surface)`. Cells bleed to the rails with a negative inline margin of `--frame-pad`, so their lines meet the rails cleanly. Rows must be full; add an empty `.cells__filler` cell if a row is short, or the line colour shows through.
4. **Corner markers.** `.section--marked` draws a small `+` (9px, 1px strokes, `--color-line-strong`) where its bottom rule meets each rail. Use it on every section except the header.
5. **Mobile (< 720px).** Rails and corner markers off. Section rules and cell dividers stay; cells stack to one column.
6. **Dark section.** The final call-to-action section inverts: black background, white text, lines in `--color-line-inverse`. The rails continue through it.

---

## 3. Primitives

Create `src/components/frame/` and `src/components/ui/`.

### `frame/frame.astro`

```astro
---
---
<div class="frame"><slot /></div>

<style>
  .frame {
    max-width: var(--frame-max);
    min-height: 100dvh;
    margin-inline: auto;
    border-inline: 1px solid var(--color-line);
  }
  @media (max-width: 720px) {
    .frame { border-inline: 0; }
  }
</style>
```

### `frame/section.astro`

```astro
---
interface Props {
  id?: string;
  tone?: "light" | "dark";
  marked?: boolean;
  class?: string;
}
const { id, tone = "light", marked = true, class: className } = Astro.props;
---
<section
  id={id}
  data-section={id}
  class:list={["section", `section--${tone}`, { "section--marked": marked }, className]}
>
  <slot />
</section>

<style>
  .section {
    position: relative;
    padding: var(--space-section) var(--frame-pad);
    border-bottom: 1px solid var(--color-line);
    scroll-margin-top: var(--header-h);
  }
  .section--dark {
    --color-line: var(--color-line-inverse);
    --color-text-muted: var(--color-text-muted-inverse);
    --color-surface: var(--color-black);
    background: var(--color-black);
    color: var(--color-white);
  }
  .section--marked::before,
  .section--marked::after {
    content: "";
    position: absolute;
    bottom: -5px;
    z-index: 1;
    width: 9px;
    height: 9px;
    background:
      linear-gradient(var(--color-line-strong) 0 0) center / 1px 100% no-repeat,
      linear-gradient(var(--color-line-strong) 0 0) center / 100% 1px no-repeat;
  }
  .section--marked::before { left: -5px; }
  .section--marked::after { right: -5px; }
  @media (max-width: 720px) {
    .section--marked::before,
    .section--marked::after { display: none; }
  }
</style>
```

### `frame/section-head.astro`

Heading on the left, intro on the right, bottom-aligned. Stacks on mobile.

```astro
---
interface Props { heading: string; intro?: string; id?: string }
const { heading, intro, id } = Astro.props;
---
<header class="section-head">
  <h2 class="section-head__title" id={id} data-reveal>{heading}</h2>
  {intro && <p class="section-head__intro" data-reveal>{intro}</p>}
  <slot />
</header>

<style>
  .section-head {
    display: grid;
    gap: var(--space-4);
    margin-bottom: var(--space-12);
  }
  .section-head__title { font-size: var(--text-3xl); max-width: 18ch; }
  .section-head__intro { color: var(--color-text-muted); max-width: 44ch; }
  @media (min-width: 1024px) {
    .section-head { grid-template-columns: 7fr 5fr; align-items: end; gap: var(--space-8); }
  }
</style>
```

### `frame/cells.astro`

```astro
---
interface Props { cols?: number; tabletCols?: number; class?: string }
const { cols = 3, tabletCols = 2, class: className } = Astro.props;
---
<div class:list={["cells", className]} style={`--cols:${cols};--cols-tablet:${tabletCols}`}>
  <slot />
</div>

<style>
  .cells {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1px;
    margin-inline: calc(var(--frame-pad) * -1);
    background: var(--color-line);
    border-block: 1px solid var(--color-line);
  }
  .cells > :global(*) {
    background: var(--color-surface);
    padding: var(--space-8) var(--frame-pad);
  }
  @media (min-width: 721px) {
    .cells { grid-template-columns: repeat(var(--cols-tablet), minmax(0, 1fr)); }
  }
  @media (min-width: 1024px) {
    .cells { grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); }
  }
</style>
```

A section that ends with a `.cells` row should set `padding-bottom: 0` so the last cell row sits on the section rule (the cells' bottom border and the section rule must not double up: drop `border-block-end` on the last cells, or drop the section's border with `.section--flush-end`).

### `ui/stub.astro`

Placeholder for every image. Same footprint as the final asset, so swapping it changes nothing in the layout.

```astro
---
interface Props {
  id: string;            // stable asset id, e.g. "flow-playstation-07"
  ratio?: string;        // CSS aspect-ratio, e.g. "3 / 4", "9 / 19.5"
  label?: string;        // what the final asset shows
  size?: string;         // final export size, e.g. "600×800"
  class?: string;
}
const { id, ratio = "4 / 3", label, size, class: className } = Astro.props;
---
<div
  class:list={["stub", className]}
  style={`aspect-ratio:${ratio}`}
  data-stub={id}
  role="img"
  aria-label={label ?? id}
>
  <span class="stub__id">{id}{size && ` · ${size}`}</span>
  {label && <span class="stub__label">{label}</span>}
</div>

<style>
  .stub {
    display: grid;
    place-content: center;
    gap: var(--space-1);
    width: 100%;
    padding: var(--space-4);
    border: 1px dashed var(--color-line-strong);
    background: repeating-linear-gradient(135deg, transparent 0 9px, var(--color-line) 9px 10px);
    color: var(--color-text-muted);
    text-align: center;
  }
  .stub__id {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .stub__label { font-size: var(--text-sm); max-width: 28ch; }
</style>
```

### `ui/phone.astro`

A neutral device frame (not a replica of any real phone). The screen area holds stubs now and real screen SVGs later.

```astro
---
interface Props { class?: string }
const { class: className } = Astro.props;
---
<div class:list={["phone", className]}>
  <div class="phone__screen"><slot /></div>
</div>

<style>
  .phone {
    width: min(100%, 22rem);
    aspect-ratio: 9 / 19.5;
    padding: 0.5rem;
    border-radius: 2.25rem;
    background: var(--color-black);
  }
  .phone__screen {
    position: relative;
    height: 100%;
    overflow: hidden;
    border-radius: 1.75rem;
    background: var(--color-white);
  }
  .phone__screen > :global(*) { position: absolute; inset: 0; height: 100%; }
</style>
```

Inside `.phone__screen`, stubs use `ratio="auto"` and fill the screen.

### `ui/button-link.astro`

```astro
---
interface Props {
  href: string;
  variant?: "primary" | "secondary";
  track?: string;          // analytics event name (§8)
  location?: string;       // where on the page
  external?: boolean;
}
const { href, variant = "primary", track, location, external = false } = Astro.props;
---
<a
  class:list={["btn", `btn--${variant}`]}
  href={href}
  data-track={track}
  data-location={location}
  {...(external ? { target: "_blank", rel: "noopener" } : {})}
>
  <span class="btn__label"><slot /></span>
  <span class="btn__arrow" aria-hidden="true">→</span>
</a>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 3rem;
    padding: 0 var(--space-5);
    border-radius: var(--radius-xs);
    font-family: var(--font-display);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    transition: background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);
  }
  .btn__arrow { transition: transform var(--duration-normal) var(--ease-enter); }
  .btn:hover .btn__arrow, .btn:focus-visible .btn__arrow { transform: translateX(4px); }

  .btn--primary { background: var(--color-orange); color: var(--color-on-accent); }
  .btn--primary:hover { background: var(--color-black); color: var(--color-orange); }

  .btn--secondary { color: inherit; box-shadow: inset 0 0 0 1px var(--color-line-strong); }
  .btn--secondary:hover { background: var(--color-wash); }

  :global(.section--dark) .btn--primary:hover { background: var(--color-white); color: var(--color-black); }
</style>
```

### `ui/tag.astro`

Status tag used for *Coming soon*. Outline pill, muted text, uppercase mono `--text-xs`. A live product shows no tag.

---

## 4. Page structure

```astro
<!-- src/pages/index.astro -->
<BaseLayout>
  <Frame>
    <SiteHeader />
    <main>
      <Hero />          <!-- #top -->
      <Catalogue />     <!-- #products -->
      <HowItWorks />    <!-- #how-it-works  (pinned) -->
      <WhyPandaPay />   <!-- #why -->
      <Trust />         <!-- #trust -->
      <Faq />           <!-- #faq -->
      <FinalCta />      <!-- dark -->
    </main>
    <SiteFooter />
  </Frame>
</BaseLayout>
```

Replace `navbar.astro` with `site-header.astro`. The existing `hero.astro` is rebuilt to §5.2.

---

## 5. Sections

Desktop wireframes are at 1280px. Numbers in brackets are grid columns out of 12.

### 5.1 Header (`site-header.astro`)

```
│ [logo]  │  Products   How it works   FAQ   Support  │  Start on WhatsApp → │
```

- Sticky: `position: sticky; top: 0; z-index: 50; height: var(--header-h)`. Background white at 92% (`color-mix`) with `backdrop-filter: blur(8px)`. Bottom border `--color-line`.
- Three cells: logo cell (`border-right`), nav (centred links), CTA cell (`border-left`, orange background, full header height, no radius).
- Logo: `Logo White BG.svg` (wordmark), 28px tall.
- Nav links: `--text-sm`, muted. Hover → `--color-text` with a 1px underline drawn left to right (`background-size` transition). The current section's link is active; drive it with one `ScrollTrigger` per section toggling `aria-current="true"`.
- Mobile (< 1024px): logo cell · menu button cell (square, 56×56, `+` that rotates to `×`) · compact CTA cell ("Start"). The menu opens a full-width panel under the header: one link per row, rows separated by lines, 59px tall. Close it on link click and on Escape, and trap focus while it is open.

### 5.2 Hero (`hero.astro`)

```
├───────────────────────────────────────────────┬──────────────────────────┤
│                                               │                          │
│  H1  Your gaming and digital                  │      ┌──────────┐        │
│      services store. On WhatsApp.     [7]     │      │  phone   │  [5]   │
│                                               │      │  stub    │        │
│  Subhead (max 46ch)                           │      └──────────┘        │
│  [Start on WhatsApp →]  See how it works      │                          │
├───────────────┬───────────────────────────────┼──────────────────────────┤
│ No app to     │ Pay from any Nigerian bank    │ Track every order in chat│  ← proof strip [4|4|4]
│ install       │                               │                          │
└───────────────┴───────────────────────────────┴──────────────────────────┘
```

- Section: `padding-bottom: 0`. Top row is a 2-cell grid `7fr 5fr` with a vertical line between (use `.cells` with `--cols:2` and `grid-template-columns: 7fr 5fr` override).
- H1: `--text-display`, `--line-height-tight`, letter-spacing −0.04em, max 14ch. On mobile, use the short headline from content (`hero.headlineShort`) under 480px.
- Subhead: `--text-lg`, light weight, muted, max 46ch.
- Actions: primary `ButtonLink` to WhatsApp (`track="cta_primary" location="hero"`) and a secondary text link to `#how-it-works`.
- Right cell: `<Phone>` holding `<Stub id="hero-phone" ratio="auto" label="Completed order: payment confirmed, then the code delivered (masked)" size="1170×2532" />`. Vertically centred, cell background `--color-wash`.
- Proof strip: three cells, each a 24px icon stub (`icon-no-app`, `icon-bank`, `icon-track`) and the line, `--text-sm`.
- Mobile: text → actions → phone (max 280px wide, centred) → proof strip stacked.
- Motion on load (§9): H1 split into lines, each line rises from a clip (`yPercent: 110 → 0`, stagger 0.08); subhead and actions fade up after it; the phone rises 32px and fades in; the proof cells fade up with stagger. Total under 1.4s.

### 5.3 Catalogue (`catalogue.astro`, `#products`)

```
│  H2 Everything you top up, in one chat.          intro                      │
├────────────────────────────────────┬───────────────────────────────────────┤
│ ┌───────────────────────────────┐  │ ┌──────────────────────────────────┐  │
│ │ illustration 3:4              │  │ │ illustration 3:4                 │  │
│ │ gaming-gift-cards             │  │ │ ps-plus                          │  │
│ └───────────────────────────────┘  │ └──────────────────────────────────┘  │
│ PlayStation gift cards        [6]  │ PlayStation Plus               [6]    │
│ line                               │ line                                  │
│ Buy on WhatsApp →                  │ Buy on WhatsApp →                     │
├────────────┬────────────┬──────────┴──┬────────────┬───────────────────────┤
│ More gaming│ Airtime    │ Mobile data │ Electricity│ Cable TV              │ ← 5 compact cells
│ COMING SOON│ COMING SOON│ COMING SOON │ COMING SOON│ COMING SOON           │
├────────────┴────────────┴─────────────┴────────────┴───────────────────────┤
│ Prices are in Naira …  (footnote, --text-xs, muted)                        │
```

- Live products row: 2 cells. Each cell is a `<article class="product">` with the illustration on top (aspect 3:4, max-height 480px, `object-fit: contain`), then the H3 name, the line, and a "Buy on WhatsApp →" link.
  - `gaming-gift-cards` already exists: inline `/public/illustrations/gaming-gift-cards.svg` (import with `?raw` and `set:html`) so GSAP can reach `#pillar-1`…`#pillar-6`. Leave its official-asset slots empty until Sony assets arrive.
  - `ps-plus`: `<Stub id="product-ps-plus" ratio="3 / 4" size="600×800" label="PlayStation Plus illustration" />`.
- Whole card is clickable: the link uses a stretched `::after { content: ""; position: absolute; inset: 0 }` on a `position: relative` card. The link opens WhatsApp with the prefilled message for that product (`waLink(product.message)`), `data-track="cta_product" data-product="{slug}"`.
- Hover / focus-within (desktop): cell background → `--color-wash`; the illustration scales to 1.02 over `--duration-slow`; the arrow nudges 4px; the cell's top border turns orange (`box-shadow: inset 0 2px 0 var(--color-orange)`).
- Coming-soon row: 5 compact cells (`--cols:5`, tablet 2 with a filler, mobile 1). Each shows the name (`--text-lg`), its line (muted, `--text-sm`) and a `Tag`. Text at 60% opacity, no link, no hover state. They are not clickable.
- Footnote: a final full-width cell, `--text-xs`, muted.
- Motion: cells fade up on enter (batch). The gift-card pillars rise from the floor once the illustration is 40% in view: `gsap.from("#pillar-n", { yPercent: 60, autoAlpha: 0, stagger: 0.08, ease: "power3.out", duration: 0.9 })`, far pillars first.
- Tracking: `catalog_view` fires once when the section is 50% in view.

### 5.4 How it works (`how-it-works.astro`, `#how-it-works`) — the pinned story

```
│  H2 From "hi" to delivered, in one conversation.     intro                 │
├────────────┬────────────┬────────────┬────────────┬────────────────────────┤
│ PlayStation│ Airtime ·  │ Data ·     │ Electricity│ Cable TV · soon        │ ← tabs (cells)
├────────────┴────────────┴────────────┴─┬──────────┴────────────────────────┤
│ ┃ 1  Say hi.                            │                                   │
│ ┃ 2  Pick a category.                   │          ┌──────────┐             │
│ ┃ 3  Choose the brand or network.  [6]  │          │  phone   │     [6]     │
│ ┃ 4  Match your region.   ← active      │          │  screen  │             │
│ │ 5  Pick your product.                 │          │  n / 9   │             │
│ │ …                                     │          └──────────┘             │
│ │ 9  Delivered.                         │                                   │
├────────────────────────────────────────┴───────────────────────────────────┤
│ One chat. No app. Every order on record.               [Try it on WhatsApp →]│
```

Structure:

```html
<section id="how-it-works" data-flow>
  <!-- section head -->
  <div class="flow__stage" data-flow-stage>          <!-- this is what gets pinned -->
    <div class="flow__tabs" role="tablist">…5 tab buttons…</div>
    <div class="flow__body">
      <ol class="flow__steps">
        <span class="flow__rail"><span class="flow__rail-fill" data-rail-fill></span></span>
        <li class="flow__step" data-step="0"><button>…number, title, line…</button></li>
        … 9 steps
      </ol>
      <div class="flow__device">
        <Phone>
          <div data-screens="playstation"> 9 × <Stub data-screen /> </div>
          <div data-screens="airtime" hidden> … </div>
          …
        </Phone>
        <p class="flow__counter"><span data-step-count>01</span> / 09</p>
      </div>
    </div>
  </div>
  <!-- closing row: line + CTA -->
</section>
```

- **Tabs**: a 5-cell strip. Each tab is a `<button role="tab">` filling its cell. Active tab: 2px orange inset bottom line and full-strength text; the others are muted. Coming-soon services show a small `soon` tag inside the tab but stay selectable (the flow still demonstrates them). Arrow keys move between tabs. Clicking a tab shows that service's screen set and keeps the current step.
- **Steps**: 9 rows separated by 1px lines. Each row: number (mono, `--text-xs`), title (`--text-lg`, display font), one line (muted). Inactive rows sit at 45% opacity; the active row at 100%, with its line expanded. On desktop only the active step's line is visible (height animation); the others show their title only.
- **Rail**: a 1px vertical track (`--color-line`) on the left edge of the step list, with an orange fill (`transform-origin: top; transform: scaleY(progress)`).
- **Device**: `Phone` centred in the right cell. Screens are stacked absolutely; only the active one is visible (crossfade 0.35s). Counter under the phone: `04 / 09`, mono.
- **Screen stubs**: `flow-{service}-{nn}` for services `playstation | airtime | data | electricity | cable` and steps `01`–`09`, ratio `auto` (fills the screen), size 1170×2532. The label is the step title plus the service example (from content). PlayStation's set is built first; the others can share PlayStation's stubs until their screens exist.

Pin and scrub (desktop and tablet, ≥ 721px):

```ts
import { gsap, ScrollTrigger, reduced, ready } from "@/lib/motion/gsap";

ready(() => {
  const root = document.querySelector<HTMLElement>("[data-flow]");
  if (!root) return;
  const stage = root.querySelector<HTMLElement>("[data-flow-stage]")!;
  const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
  const fill = root.querySelector<HTMLElement>("[data-rail-fill]")!;
  const counter = root.querySelector<HTMLElement>("[data-step-count]")!;
  let service = "playstation";
  let current = -1;

  const screens = () =>
    [...root.querySelectorAll<HTMLElement>(`[data-screens="${service}"] [data-screen]`)];

  const setStep = (i: number, force = false) => {
    if (i === current && !force) return;
    current = i;
    steps.forEach((s, k) => s.toggleAttribute("data-active", k === i));
    screens().forEach((s, k) => gsap.to(s, { autoAlpha: k === i ? 1 : 0, duration: 0.35, overwrite: true }));
    counter.textContent = String(i + 1).padStart(2, "0");
  };

  if (reduced()) { setStep(0); return; }   // reduced motion: no pin, click-to-step only

  const st = ScrollTrigger.create({
    trigger: stage,
    start: "top top+=56",                       // under the sticky header
    end: () => "+=" + window.innerHeight * steps.length * 0.6,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(fill, { scaleY: self.progress });
      setStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
    },
  });

  steps.forEach((s, i) =>
    s.querySelector("button")!.addEventListener("click", () =>
      window.scrollTo({ top: st.start + ((st.end - st.start) * (i + 0.5)) / steps.length, behavior: "smooth" })
    )
  );

  root.querySelectorAll<HTMLButtonElement>("[role=tab]").forEach((tab) =>
    tab.addEventListener("click", () => {
      service = tab.dataset.service!;
      root.querySelectorAll<HTMLElement>("[data-screens]").forEach((g) => (g.hidden = g.dataset.screens !== service));
      root.querySelectorAll("[role=tab]").forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      setStep(current, true);
    })
  );

  setStep(0);
});
```

- Pin distance: about 0.6 viewport heights per step (about 5.4 screens in all). Tune by feel, but never so short that a step flashes past.
- Mobile (≤ 720px): still pinned, stacked vertically. Tabs become a horizontally scrollable chip row; the phone sits on top (max 62vh tall); below it, only the active step's number, title and line, swapping with a 0.3s fade. The rail becomes a horizontal 9-segment progress bar above the step text.
- Reduced motion: no pin and no scrub. All 9 steps show as a list, clicking a step swaps the screen, and tabs still work.
- Closing row: one cell, the line on the left (`--text-xl`) and `ButtonLink` on the right (`track="cta_primary" location="flow"`).
- Tracking: a tab click fires `category_interaction` with `data-service`.

### 5.5 Why Panda Pay (`why.astro`, `#why`)

```
│  H2 Built for how you already pay.                                          │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ 01                 [ic] │ 02                 [ic] │ 03                 [ic] │
│ No new app              │ Pay in Naira            │ The right card for your │
│ line                    │ line                    │ region …                │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ 04 …                    │ 05 …                    │ 06 …                    │
```

- `Cells` with 3 columns (tablet 2, mobile 1). Each cell is at least 240px tall, content pinned to the bottom (`display: grid; align-content: end`).
- Top-left of each cell: index `01`–`06` in mono `--text-xs`, muted. Top-right: an icon stub, `<Stub id="icon-why-{slug}" ratio="1 / 1" size="40×40" />` at 40px.
- H3 `--text-xl`; line muted, max 32ch.
- Hover: background wash, and the icon rotates −6° and lifts 2px.
- Motion: cells fade up with stagger (batch).

### 5.6 Trust (`trust.astro`, `#trust`)

```
├──────────────────────────┬──────────────────────────┬──────────────────────┤
│ H2 Your money and your   │ Genuine codes, never     │ You'll know when we  │
│ code, accounted for. [4] │ resold                   │ have your money      │
│ (sticky inside its cell) ├──────────────────────────┼──────────────────────┤
│                          │ Delivery you can track   │ If it fails, you're  │
│                          │                          │ covered              │
│                          ├──────────────────────────┼──────────────────────┤
│                          │ We keep only what we need│ Real customers …     │
├──────────────────────────┴──────────────────────────┴──────────────────────┤
│ Stuck on an order? Message us …                    [Message support →]     │
```

- Desktop grid `4fr 8fr`. The left cell holds the H2, `position: sticky; top: calc(var(--header-h) + var(--space-8))`. The right side is a nested 2×3 `Cells`.
- Each trust cell: H3 (`--text-lg`), body (muted). Where the copy mentions a policy, the policy name is a link to the policy page.
- The "Real customers, real orders" cell is a placeholder until approved testimonials exist: `<Stub id="trust-testimonials" ratio="16 / 9" label="Approved testimonials and order figures" />`. Never render invented quotes or numbers.
- The support row is full width: the line, plus a secondary `ButtonLink` to WhatsApp (`track="support_click"`).
- Mobile: H2, then the cells stacked, then the support row.

### 5.7 FAQ (`faq.astro`, `#faq`)

```
├──────────────────────────┬─────────────────────────────────────────────────┤
│ H2 Questions, answered.  │ What can I buy on Panda Pay?                  + │
│                    [4]   ├─────────────────────────────────────────────────┤
│ Still stuck?             │ Do I need to download an app?                 + │
│ Message us on WhatsApp → ├─────────────────────────────────────────────────┤
│                          │ …                                         [8]   │
```

- Native `<details>` / `<summary>` per question, rows separated by 1px lines. The summary row is at least 64px tall, question in `--text-lg`, with a `+` icon on the right that rotates 45° when open.
- Open and close animation: use CSS `interpolate-size: allow-keywords` with a `::details-content` block-size transition where supported, and no animation elsewhere (still fully usable). No JS needed.
- Several questions can be open at once.
- Answer text muted, max 60ch, with `padding-bottom: var(--space-6)`.
- Tracking: a `toggle` listener fires `faq_open` with the question slug when one opens.

### 5.8 Final call to action (`final-cta.astro`) — dark

```
├────────────────────────────────────────────────────┬───────────────────────┤
│                                                    │                       │
│  Your next top-up is one message away.   [8]       │   panda mark (orange) │
│  Say hi to Panda Pay on WhatsApp …                 │         [4]           │
│  [Start on WhatsApp →]   Read the FAQ              │                       │
│                                                    │                       │
```

- `Section tone="dark"`. H2 at `--text-display` size. Primary button (orange on black). Secondary link to `#faq`, styled white-muted.
- Right cell: the panda icon (`Logo Icon Orange.svg`) at about 220px, centred. This is a brand asset, not a stub.
- Motion: the headline splits into lines and rises from a clip on enter. The panda mark scales from 0.92 to 1 and fades in.
- `track="cta_primary" location="final"`.

### 5.9 Footer (`site-footer.astro`)

```
├──────────────────────────┬────────────┬────────────┬────────────┬──────────┤
│ [wordmark]               │ Shop       │ Help       │ Company    │ Legal    │
│ tagline (muted)    [4]   │ links [2]  │ links [2]  │ links [2]  │ links [2]│
├──────────────────────────┴────────────┴────────────┴────────────┴──────────┤
│ info@pandapay.africa · +234 704 386 4368 · 12 Olu Adebayo Street, Isolo…   │
├────────────────────────────────────────────────────────────────────────────┤
│ small print paragraphs, --text-xs, muted, max 90ch                          │
```

- Column headings use H3 styling at `--text-sm`, uppercase, with the display font.
- Links: muted, hover → text colour. Email and phone use `mailto:` and `tel:`.
- Policy pages (privacy, terms, refund and delivery) and the articles page get placeholder routes (`/privacy`, `/terms`, `/refunds`, `/articles`), each rendering a single framed section saying "Coming soon" until the copy is approved.

---

## 6. Stubs and assets

Every stub uses its final `id`, ratio and export size, so the swap is a one-line change.

| Stub id | Section | Ratio | Export size | Final asset |
| --- | --- | --- | --- | --- |
| `hero-phone` | Hero | screen fill | 1170×2532 | Completed-order WhatsApp screen (SVG) |
| `icon-no-app`, `icon-bank`, `icon-track` | Hero strip | 1:1 | 24×24 | Line icons, SVG |
| `product-ps-giftcards` | Catalogue | 3:4 | 600×800 | **Done**: `/illustrations/gaming-gift-cards.svg` (inline) |
| `product-ps-plus` | Catalogue | 3:4 | 600×800 | Low-poly illustration, same style |
| `flow-{service}-{01–09}` | How it works | screen fill | 1170×2532 | WhatsApp flow screens (45 total; PlayStation first) |
| `icon-why-{slug}` ×6 | Why | 1:1 | 40×40 | Line icons |
| `trust-testimonials` | Trust | 16:9 | — | Approved quotes and figures (not an image) |

Swap pattern, from:

```astro
<Stub id="product-ps-plus" ratio="3 / 4" size="600×800" label="PlayStation Plus illustration" />
```

to:

```astro
<img src="/illustrations/ps-plus.svg" alt="…" width="600" height="800" loading="lazy" decoding="async" />
```

or, for anything GSAP animates inside the SVG:

```astro
---
import psPlus from "/public/illustrations/ps-plus.svg?raw";
---
<div class="product__art" set:html={psPlus} />
```

Rules: keep the same `aspect-ratio` on the wrapper; `loading="lazy"` for everything below the hero; give real alt text when the stub is replaced.

---

## 7. Content wiring

- `src/content/home.ts` holds every string on the page as one typed object: `hero`, `catalogue.products[]` (with `slug`, `name`, `line`, `status: "live" | "soon"`, `message`), `flow.services[]`, `flow.steps[]`, `why[]`, `trust[]`, `faq[]`, `finalCta`, `footer`. Components only read from it. Paste the copy from the approved doc as is.
- A product's or category's `status` is the only switch between the live card and the coming-soon cell.
- Extend `src/lib/site.ts`:

```ts
export const site = {
  name: "Panda Pay",
  title: "Panda Pay — PlayStation Gift Cards, Airtime & Data on WhatsApp | Nigeria",
  description:
    "Buy PlayStation gift cards, PlayStation Plus, airtime and data on WhatsApp. Pay by Naira bank transfer and get your code or top-up in the same chat.",
  url: "https://www.pandapay.africa/",
  whatsapp: "2347043864368", // confirm this is the verified business number
  // …existing fields
};

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
```

- `meta theme-color` in `base-layout.astro` should be `#ffffff` (the page is white). Orange is too loud for the browser chrome.

---

## 8. Analytics hooks

No vendor is assumed. Mark elements with `data-track` (plus context attributes), and add one delegated listener in `base-layout.astro` that pushes `{ event, ...dataset }` to `window.dataLayer` if it exists.

| Event | Fires on | Attributes |
| --- | --- | --- |
| `cta_primary` | Any Start on WhatsApp / Try it click | `data-location` (header, hero, flow, final) |
| `cta_product` | Product Buy click | `data-product` |
| `checkout_handoff` | Every click to `wa.me` (add it automatically in the listener) | `href` |
| `catalog_view` | Catalogue 50% in view, once | — |
| `category_interaction` | Flow tab click | `data-service` |
| `faq_open` | `details` opened | `data-question` |
| `support_click` | Support links | `data-location` |

Campaign attribution: on load, read `utm_*` from the URL, keep it in `sessionStorage`, and include it in every push.

---

## 9. Motion system

Create `src/lib/motion/gsap.ts`:

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap, ScrollTrigger };

export const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run after fonts load, so split text and pin distances measure correctly. */
export const ready = (fn: () => void) =>
  document.fonts.ready.then(() => requestAnimationFrame(() => { fn(); ScrollTrigger.refresh(); }));
```

Shared reveal (one script in `base-layout.astro`):

```ts
import { gsap, ScrollTrigger, reduced, ready } from "@/lib/motion/gsap";

ready(() => {
  if (reduced()) return;
  gsap.set("[data-reveal]", { autoAlpha: 0, y: 24 });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08 }),
  });
});
```

To avoid a flash before JS runs, add an inline script in `<head>` that puts `class="js"` on `<html>`, and in CSS hide reveals only when JS and motion are both available: `@media (prefers-reduced-motion: no-preference) { .js [data-reveal] { visibility: hidden; } }`. GSAP's `autoAlpha` restores visibility.

Headline line reveals use the existing `wrapLines()` from `@/lib/motion/text-splitting` (already wraps each line in a `data-motion-clip`): `gsap.from(unitsOf(el), { yPercent: 110, stagger: 0.08, duration: 0.9 })`. Call `resetTextSplit(el)` and re-split on `ScrollTrigger`'s `refreshInit` when the viewport width changes.

| Moment | What moves | Values |
| --- | --- | --- |
| Hero load | H1 lines, subhead, actions, phone, proof strip | lines `yPercent 110→0`, stagger .08; others `y 24→0`, `autoAlpha`; phone `y 32→0` |
| Cells entering | `[data-reveal]` | `y 24→0`, stagger .08, once |
| Gift-card illustration | `#pillar-1…6` | `yPercent 60→0`, stagger .08, far pillars first |
| How it works | pin, rail fill, step state, screen crossfade | §5.4 |
| Final CTA | headline lines, panda mark | lines as hero; mark `scale .92→1` |

Hard rules: animate only `transform` and `opacity`. Scope every selector to its section root. No motion on reduced-motion beyond instant state changes. Never hide content that has no JS fallback.

---

## 10. Accessibility

- One `h1` (hero). Each section's heading is an `h2` with an `id`, and the section has `aria-labelledby` pointing to it.
- The menu button has `aria-expanded` and `aria-controls`. Tabs use `role="tablist"`/`tab`/`tabpanel` with `aria-selected` and arrow-key support.
- Steps are buttons inside the list items; the active one gets `aria-current="step"`.
- Focus ring: the existing `:focus-visible` outline in `--color-focus-ring` (black). On the dark section, override it to white.
- Coming-soon cells are plain text, not disabled links.
- Minimum tap target 44×44. Body text never below `--text-sm`.

---

## 11. Build order

1. Tokens (§1), then `Frame`, `Section`, `SectionHead`, `Cells`, `Stub`, `Phone`, `ButtonLink`, `Tag`.
2. `home.ts` with all copy; `site.ts` updates.
3. Header, then Footer (gives the frame its top and bottom).
4. Hero, Catalogue, Why, Trust, FAQ, Final CTA, all static with stubs.
5. How it works, static first, then the pin and scrub.
6. Motion pass: reveals, hero load, pillars, final CTA.
7. Analytics listener and events.
8. Check at 360, 768, 1024, 1280 and 1440 widths, with reduced motion on and off.

### Done when

- The rails run unbroken from header to footer at ≥ 721px, and every section ends on a rule with corner markers.
- No colour on the page beyond orange, black, white and their black or white mixes.
- Every image position is a stub with its final id, or the final asset.
- The How it works section pins, steps advance with scroll, steps can be clicked, tabs switch screens, and with reduced motion the section is fully usable without pinning.
- Every WhatsApp link opens the verified number with the right prefilled text and fires its event.
