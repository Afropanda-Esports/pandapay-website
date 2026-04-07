# Theme Toggle — Execution Plan

## Overview

This document is a step-by-step implementation plan for adding a light/dark mode toggle to PandaPay. No code is written here — this is purely a design and sequencing document for the implementer.

---

## Audit Summary

Before planning the fix, here is every hardcoded color found in the codebase and why it's a problem for theming:

| File | Line | Value | Context | Problem |
|------|------|-------|---------|---------|
| `Hero.tsx` | 22 | `bg-[#0A0A0A]/50` | Dark overlay on hero image | Hardcoded; `#0A0A0A` = `background` token |
| `Navbar.tsx` | 59 | `rgba(204,53,0,0.25)` in `boxShadow` | Desktop "Shop now" glow | No shadow token for primary glow |
| `Navbar.tsx` | 118 | `rgba(204,53,0,0.35)` in `boxShadow` | Mobile "Shop now" glow | Same as above |
| `Solution.tsx` | 36 | `border-[#2A2A2A]` | Feature card border on mobile | `#2A2A2A` = `border` token |
| `MicroStory.tsx` | 17 | `to-[#CC5500]/50` | Left decorative line gradient | Hardcoded accent (also a typo — should be `#CC3500` = `primary-500`) |
| `MicroStory.tsx` | 21 | `border-[#CC5500]/50` | Badge border | Same typo issue |
| `MicroStory.tsx` | 24 | `#CC550000` in `boxShadow` | Badge inset shadow (0% alpha = invisible) | Hardcoded but irrelevant (fully transparent) |
| `MicroStory.tsx` | 34 | `to-[#CC5500]/50` | Right decorative line gradient | Same as line 17 |
| `MicroStory.tsx` | 40 | `color: "#A3A3A3"` | Story paragraph 1 text | `#A3A3A3` ≈ `neutral-300` but not an exact token |
| `MicroStory.tsx` | 51 | `color: "#E0E0E0"` | Story paragraph 2 text | `#E0E0E0` ≈ `neutral-100` (#E1E1E3) — essentially the same |
| `Testimonial.tsx` | 12 | `bg-[#FCA065]` | Tunde's card bg | Custom warm orange, not in palette |
| `Testimonial.tsx` | 22 | `bg-[#FFDBB5]` | Ama's card bg | Custom peach, not in palette |
| `Testimonial.tsx` | 32 | `bg-[#FFFFFF]` | Olu's card bg (center) | Plain white |
| `Testimonial.tsx` | 42 | `bg-[#FFD1AF]` | Kofi's card bg | Custom tan/peach |
| `Testimonial.tsx` | 52 | `bg-[#FFAD73]` | Ahmed's card bg | Custom lighter orange |

**Files with zero hardcoded colors (already clean):**
`BrowseCatalog.tsx`, `BrowseCatalog_Alternate.tsx`, `Painpoint.tsx`, `FAQ.tsx`, `ExploreShop.tsx`, `Footer.tsx`, `TestimonialCard.tsx`, `NotFoundPage.tsx`, `LandingPage.tsx`, `Marquee.tsx`, `App.tsx`, `main.tsx`

---

## Architecture Decision

### Approach: CSS Custom Properties + `.dark` class on `<html>`

**Why not Tailwind `darkMode: 'media'`?**
Media-query-based dark mode cannot be toggled by the user — it only follows the OS setting. We need a toggle, so we need class-based.

**Why not a React context with conditional class names per component?**
That would require passing theme state as props everywhere and rebuilding className strings throughout. It doesn't scale and would require touching every component's markup.

**Correct approach for Tailwind CSS v4:**
Tailwind v4 uses CSS variables natively. Every utility like `bg-background` compiles to `background-color: var(--color-background)`. This means: if you change the value of `--color-background` in CSS, every component using `bg-background` automatically gets the correct color — zero JavaScript required per component.

The strategy:
1. The `@theme` block in `index.css` **registers** semantic tokens with placeholder values.
2. `:root` defines the **light mode** values for those tokens.
3. `html.dark` (or `:root.dark`) overrides them with **dark mode** values.
4. A small React context + hook toggles the `dark` class on `<html>` and persists the preference to `localStorage`.
5. The toggle UI lives in `Navbar`.

This means **zero component-level changes** for anything already using design tokens correctly. Only the 13 violations listed above need to be fixed.

---

## Phase 1 — Design the Semantic Token Layer

### 1A. Understand what the current tokens actually are

The `@theme` block currently defines **palette tokens** — raw color values at specific shades. These are not inherently light or dark; they just exist. The **semantic** layer (which values to use for "background", "surface", etc.) is embedded in `index.css` as fixed values:

```
--color-background: #0a0a0a   ← this is dark-mode-hardcoded
--color-surface:    #121212   ← same
--color-border:     #2a2a2a   ← same
```

And `body` uses:
```
background-color: var(--color-background)  ← good pattern, wrong value setup
color: var(--color-neutral-100)            ← hardcoded to dark-mode shade
```

### 1B. Semantic Token Table

These are the tokens that must change between themes. Every token listed here must be overridden per theme. Token names that do **not** appear here stay the same in both themes (primary, secondary, success, error, warning, info palettes are brand colors and don't invert).

| Token | Light Value | Dark Value | Used For |
|-------|------------|------------|----------|
| `--color-background` | `#ffffff` | `#0a0a0a` | Page background |
| `--color-surface` | `#f5f5f5` | `#121212` | Card/section backgrounds |
| `--color-surface-raised` | `#ebebeb` | `#1c1c1d` | Elevated surfaces (modals, dropdowns) |
| `--color-border` | `#d4d4d6` | `#2a2a2a` | All borders |
| `--color-border-subtle` | `#e8e8ea` | `#1c1c1d` | Subtle dividers |
| `--color-text-primary` | `#0a0a0a` | `#e1e1e3` | Body/default text |
| `--color-text-secondary` | `#3d3d3f` | `#9a9a9c` | Sub-labels, secondary info |
| `--color-text-muted` | `#737375` | `#737375` | Hints, placeholders (neutral-500 = same both ways) |
| `--color-text-inverse` | `#ffffff` | `#0a0a0a` | Text on colored backgrounds |
| `--color-overlay` | `rgba(255,255,255,0.5)` | `rgba(10,10,10,0.5)` | Image overlays, scrims |
| `--color-nav-bg` | `rgba(255,255,255,0.9)` | `rgba(0,0,0,1)` | Mobile nav overlay background |
| `--shadow-primary-glow-sm` | `0 0 16px 0 rgba(204,53,0,0.20)` | `0 0 16px 0 rgba(204,53,0,0.25)` | Navbar button glow (small) |
| `--shadow-primary-glow-md` | `0 0 24px 0 rgba(204,53,0,0.25)` | `0 0 24px 0 rgba(204,53,0,0.35)` | Navbar button glow (medium) |

**Testimonial card colors** — these are intentionally warm/colorful and sit on top of whatever the page background is. They work in both themes. However their text (`text-neutral-900`) must remain dark since the cards are always light-colored. These stay as-is — they are not semantic tokens. The five values get named as palette tokens, not theme-sensitive ones:

| Token | Value | Card |
|-------|-------|------|
| `--color-testimonial-1` | `#fca065` | Tunde |
| `--color-testimonial-2` | `#ffdbb5` | Ama |
| `--color-testimonial-3` | `#ffffff` | Olu |
| `--color-testimonial-4` | `#ffd1af` | Kofi |
| `--color-testimonial-5` | `#ffad73` | Ahmed |

These cards always have light/warm backgrounds and always use `text-neutral-900` for text — that relationship is intentional and correct in both themes.

### 1C. Note on `neutral-900` in `body` baseline

Currently `body` sets `color: var(--color-neutral-100)` — this hardcodes the dark-mode text color. This must be changed to `color: var(--color-text-primary)` so the base text color flips with the theme.

---

## Phase 2 — Restructure `src/index.css`

### 2A. Expand the `@theme` block

The `@theme` block gets two additions:

**1. New semantic tokens (registered with `initial` so Tailwind knows they exist):**
```
--color-text-primary: initial
--color-text-secondary: initial
--color-text-muted: initial
--color-text-inverse: initial
--color-surface-raised: initial
--color-border-subtle: initial
--color-overlay: initial
--color-nav-bg: initial
--shadow-primary-glow-sm: initial
--shadow-primary-glow-md: initial
```

**2. Testimonial palette tokens (fixed values, not theme-sensitive):**
```
--color-testimonial-1: #fca065
--color-testimonial-2: #ffdbb5
--color-testimonial-3: #ffffff
--color-testimonial-4: #ffd1af
--color-testimonial-5: #ffad73
```

### 2B. Add `:root` block (light mode = default)

After the `@theme` block, add a `:root` rule that sets the light values for every semantic token:

```css
:root {
  --color-background:    #ffffff;
  --color-surface:       #f5f5f5;
  --color-surface-raised: #ebebeb;
  --color-border:        #d4d4d6;
  --color-border-subtle: #e8e8ea;
  --color-text-primary:  #0a0a0a;
  --color-text-secondary: #3d3d3f;
  --color-text-muted:    #737375;
  --color-text-inverse:  #ffffff;
  --color-overlay:       rgba(255, 255, 255, 0.5);
  --color-nav-bg:        rgba(255, 255, 255, 0.95);
  --shadow-primary-glow-sm: 0 0 16px 0 rgba(204, 53, 0, 0.20);
  --shadow-primary-glow-md: 0 0 24px 0 rgba(204, 53, 0, 0.25);
}
```

### 2C. Add `html.dark` block (dark mode overrides)

```css
html.dark {
  --color-background:    #0a0a0a;
  --color-surface:       #121212;
  --color-surface-raised: #1c1c1d;
  --color-border:        #2a2a2a;
  --color-border-subtle: #1c1c1d;
  --color-text-primary:  #e1e1e3;
  --color-text-secondary: #9a9a9c;
  --color-text-muted:    #737375;
  --color-text-inverse:  #0a0a0a;
  --color-overlay:       rgba(10, 10, 10, 0.5);
  --color-nav-bg:        rgba(0, 0, 0, 1);
  --shadow-primary-glow-sm: 0 0 16px 0 rgba(204, 53, 0, 0.25);
  --shadow-primary-glow-md: 0 0 24px 0 rgba(204, 53, 0, 0.35);
}
```

### 2D. Fix the `body` baseline

Change:
```css
body {
  color: var(--color-neutral-100);   ← remove this
  ...
}
```
To:
```css
body {
  color: var(--color-text-primary);  ← uses the semantic token
  ...
}
```

### 2E. No changes to `@keyframes` or `@utility` blocks

Animation keyframes don't use colors. Marquee utilities are fine as-is.

---

## Phase 3 — Theme Context and Hook

### 3A. File to create: `src/context/ThemeContext.tsx`

This file provides:
- A React context holding `theme: 'light' | 'dark'`
- A `toggleTheme` function
- The provider component that wraps the app

**Logic the provider must implement:**
1. On mount, read `localStorage.getItem('theme')`.
2. If no stored value, read `window.matchMedia('(prefers-color-scheme: dark)').matches` — respect OS preference as the default.
3. Apply the resolved theme by adding/removing the `dark` class on `document.documentElement` (the `<html>` element).
4. On `toggleTheme`, flip the theme, update state, write to `localStorage`, and update the class on `<html>`.
5. Export a `useTheme()` hook that components use to read `theme` and call `toggleTheme`.

**Important:** The `dark` class must be applied to `<html>`, not `<body>` or any inner element, because `html.dark` in CSS needs to target the root.

**Flash of wrong theme (FOUT) prevention:** 
This is a known problem with localStorage-based themes. Because React hydrates after HTML loads, there can be a brief flash of the wrong theme. The fix is a small inline script in `index.html` (before any JS loads) that reads localStorage and applies the class immediately. This script runs synchronously and prevents the flash.

The script to add inside `<head>` in `index.html`:
```html
<script>
  (function() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

### 3B. File to create: `src/hooks/useTheme.ts`

A simple re-export of the context consumer for convenience (consumers import from here, not from the context file directly). This keeps import paths clean for future consumers.

Alternatively, `useTheme` can live directly in `ThemeContext.tsx` and be exported from there — one less file. Either approach works; decide based on project scale preference.

### 3C. Update `src/main.tsx`

Wrap `<App />` with `<ThemeProvider>`:

```
BrowserRouter
  └── ThemeProvider          ← add this
        └── App
```

The provider must be inside `BrowserRouter` (so it has access to router context if needed), but outside `App` (so it wraps all routes).

---

## Phase 4 — Toggle Component

### 4A. File to create: `src/components/ThemeToggle.tsx`

A self-contained button component:
- Calls `useTheme()` to get current theme and `toggleTheme`
- Renders a sun icon in dark mode (click → go light) and a moon icon in light mode (click → go dark)
- Lucide React already has `Sun` and `Moon` icons — no new dependencies needed
- Styled to match the navbar's visual language: small, minimal, icon-only button
- Accessible: `aria-label="Switch to light mode"` / `aria-label="Switch to dark mode"` (dynamic)

### 4B. Where to place it in `Navbar.tsx`

**Desktop:** Insert between the nav links and the "Shop now" button in the right-side flex container.

**Mobile overlay:** Insert near the "Shop now" CTA, likely just above it — it should be visible when the mobile menu is open.

The toggle does not require changing the Navbar's overall layout, just inserting the `<ThemeToggle />` component in two places within the existing flex/flex-col structures.

---

## Phase 5 — Fix All Hardcoded Color Violations

This phase modifies existing component files. Each change is surgical — only the hardcoded value is touched.

### 5A. `Hero.tsx` — 1 fix

| What | From | To |
|------|------|----|
| Hero overlay div | `bg-[#0A0A0A]/50` | `bg-overlay` (uses new semantic token) |

Note: `bg-overlay` won't work directly because `--color-overlay` already includes the alpha in the rgba value. The implementation needs to apply this as a CSS variable in `style={{ backgroundColor: 'var(--color-overlay)' }}` or define a separate `--color-overlay` that is just the base color, and use Tailwind's opacity modifier. The cleanest approach: define two tokens — `--color-overlay-bg: #0a0a0a` (dark) / `#ffffff` (light) and use `bg-overlay-bg/50` in Tailwind. Alternatively: just use `style={{ backgroundColor: 'var(--color-overlay)' }}` directly. Discuss with implementer.

### 5B. `Navbar.tsx` — 2 fixes

| What | From | To |
|------|------|----|
| Desktop "Shop now" `style.boxShadow` | `'0 0 16px 0 rgba(204,53,0,0.25)'` | `'var(--shadow-primary-glow-sm)'` |
| Mobile "Shop now" `style.boxShadow` | `'0 0 24px 0 rgba(204,53,0,0.35)'` | `'var(--shadow-primary-glow-md)'` |

Also: The mobile overlay currently uses `bg-black` (line 77). In light mode, a pure-black full-screen overlay will look wrong. Change to use `--color-nav-bg`:
- `className="fixed inset-0 z-50 bg-black ..."` → `style={{ backgroundColor: 'var(--color-nav-bg)' }}` and remove `bg-black`

### 5C. `Solution.tsx` — 1 fix

| What | From | To |
|------|------|----|
| Mobile feature card border | `border-[#2A2A2A]` | `border-border` |

### 5D. `MicroStory.tsx` — 5 fixes (+ 1 no-op)

| What | From | To |
|------|------|----|
| Left gradient line | `to-[#CC5500]/50` | `to-primary-500/50` (also fixes the typo: `#CC5500` → `#CC3500`) |
| Badge border | `border-[#CC5500]/50` | `border-primary-500/50` |
| Badge shadow (line 24) | `#CC550000 inset` | `transparent` or remove the shadow entirely (it's already 0% alpha — invisible) |
| Right gradient line | `to-[#CC5500]/50` | `to-primary-500/50` |
| Paragraph 1 text color | `style={{ color: "#A3A3A3" }}` | Replace with `className` using `text-neutral-300` (closest match: #9a9a9c) or `text-text-secondary` semantic token |
| Paragraph 2 text color | `style={{ color: "#E0E0E0" }}` | Replace with `className` using `text-neutral-100` (#E1E1E3 ≈ #E0E0E0) or `text-text-primary` semantic token |

**Note on `#CC5500` vs `#CC3500`:** The primary-500 token is `#CC3500`. The MicroStory uses `#CC5500` (slightly different hue). This appears to be a typo since they're visually close and the intent is clearly to use the brand's primary color. The fix should use `primary-500`.

**Note on paragraph colors:** The design intent is that paragraph 1 is "dimmed" (muted) and paragraph 2 is "bright" (primary text). In light mode, `text-text-secondary` and `text-text-primary` achieve exactly this effect. The inline style approach should be replaced with className-based tokens so themes work.

### 5E. `Testimonial.tsx` — 5 fixes (tokenize the card colors)

The `bgColor` values are passed as className strings to `TestimonialCard`. These five values (`bg-[#FCA065]`, `bg-[#FFDBB5]`, etc.) need to be converted to use the testimonial palette tokens defined in Phase 2A.

| Card | From | To |
|------|------|-----|
| Tunde | `bg-[#FCA065]` | `bg-testimonial-1` |
| Ama | `bg-[#FFDBB5]` | `bg-testimonial-2` |
| Olu | `bg-[#FFFFFF]` | `bg-testimonial-3` |
| Kofi | `bg-[#FFD1AF]` | `bg-testimonial-4` |
| Ahmed | `bg-[#FFAD73]` | `bg-testimonial-5` |

These tokens are **not** theme-sensitive (they're palette tokens, not semantic tokens). The warm card colors are intentional and work on both light and dark backgrounds. The text inside cards is `text-neutral-900` — correct for both themes since the cards are always warm/light.

---

## Phase 6 — Tailwind v4 Arbitrary Value Consideration

Tailwind v4 does not auto-discover CSS custom properties in arbitrary values unless the variable is registered. When using `bg-testimonial-1` (where `--color-testimonial-1` is registered in `@theme`), Tailwind generates the correct utility. But for `style={{ boxShadow: 'var(--shadow-primary-glow-sm)' }}` — this is a raw CSS custom property reference and will work without Tailwind, since it's in an inline style.

One edge case: the Tailwind `maskImage` and gradient utilities using opacity modifiers (e.g., `to-primary-500/50`) require the color to be registered in `@theme` with a value that supports alpha modification. Tailwind v4 handles this natively for registered colors — `primary-500` is registered so `primary-500/50` works.

---

## Order of Execution

The phases must be done in this order to avoid broken states at any point:

```
1. index.css restructure (Phase 2)
   → The CSS foundation must exist before any component touches the tokens
   → After this step: dark class on <html> can be tested manually in DevTools

2. ThemeContext + hook (Phase 3A + 3B)
   → No UI yet, but the logic is in place

3. main.tsx update (Phase 3C)
   → Wraps app with provider

4. index.html script (Phase 3A — FOUT prevention)
   → Must go in before any JS bundle loads

5. ThemeToggle component (Phase 4A)
   → Built but not placed anywhere yet

6. Navbar integration (Phase 4B)
   → Adds toggle to both desktop and mobile layouts

7. Fix hardcoded colors — in any order (Phase 5A–5E)
   → Each fix is independent
   → Recommend: Solution.tsx, Navbar.tsx, Hero.tsx, MicroStory.tsx, Testimonial.tsx
```

---

## Files Changed Summary

| File | Type of Change |
|------|---------------|
| `src/index.css` | Add semantic tokens to @theme, add `:root` (light) block, add `html.dark` block, fix body text color |
| `index.html` | Add inline FOUT-prevention script to `<head>` |
| `src/main.tsx` | Wrap app with `ThemeProvider` |
| `src/context/ThemeContext.tsx` | **New file** — provider + hook |
| `src/components/ThemeToggle.tsx` | **New file** — toggle button UI |
| `src/components/Navbar.tsx` | Add `<ThemeToggle />` (×2), fix mobile overlay bg, fix shadow variables |
| `src/components/sections/Hero.tsx` | Fix overlay color |
| `src/components/sections/Solution.tsx` | Fix border token |
| `src/components/sections/MicroStory.tsx` | Fix gradient/border (#CC5500→primary-500), fix inline text colors |
| `src/components/sections/Testimonial.tsx` | Tokenize 5 card bg colors |

**Total new files: 2**
**Total modified files: 8**
**Files untouched: everything else**

---

## Open Questions / Decisions for the Implementer

1. **Light mode background — pure white or off-white?** The plan uses `#ffffff`. If it looks too harsh, `#fafafa` is a common alternative. The rest of the light palette is derived from this choice.

2. **Hero section in light mode:** The hero uses a dark photographic background image with a dark overlay. In light mode, the overlay should lighten rather than darken. The current `bg-[#0A0A0A]/50` overlay makes the image dark. In light mode, this should probably not be applied at all, or use a very light semi-transparent overlay. Requires a design decision — the `--color-overlay` token approach handles this but the exact light-mode overlay appearance needs to be agreed on.

3. **Testimonial card colors in light mode:** The warm orange/peach testimonial cards currently sit on a near-black background. In light mode, they sit on a white/light background. They will likely look fine but should be visually reviewed — some shades may need slight lightening for light mode. The current plan keeps them as fixed palette tokens (not theme-sensitive). If they need adjustment per theme, they'd move from palette tokens to semantic tokens.

4. **`#A3A3A3` in MicroStory** is not an exact match to any existing neutral token. `neutral-300` = `#9a9a9c` is the closest. If the exact shade matters for the design, a new `--color-neutral-350` token could be added, or it can just use `neutral-300`.

5. **Is light mode actually desired for Painpoints/Solution SVGs?** These sections use SVG files (`Painpoints.svg`, `desktop.svg`, `Wrapper.svg`) that are baked as images with dark-mode-appropriate colors. In light mode, these SVGs may look odd. Options: create light-mode variants of the SVGs, or use CSS `filter: invert()` conditionally, or accept that these images look best in dark mode.
