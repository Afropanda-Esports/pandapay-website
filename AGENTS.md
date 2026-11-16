# AGENTS.md — Panda Pay Africa marketing site (`panda-pay`)

> Canonical context for any AI agent working in this repo. Read at the start of every session.
> Progress: `FEATURES.json` · Harness state: `skills/.harness/STATE.md` · Design: `docs/design-system-v2.md`,
> `docs/landing-page-spec.md` · Conventions: `ARCHITECTURE.md`, `frontend-architecture.config.json`

---

## Stack

- **Framework:** Astro 7 (static output), `.astro` components first
- **Motion:** GSAP (`src/lib/motion/*`), CSS for simple transitions; `prefers-reduced-motion` required
- **Styling:** plain CSS with tokens (`src/styles/tokens.css`, `global.css`, `reset.css`, `typography.css`); BEM-style kebab-case classes
- **Package manager:** Bun (`bun.lock`) · **Node:** >= 22.12
- **No React.** Do not add a framework island just to host animation or a click handler — use a plain `<script>`.

## Architecture

Static marketing site for Panda Pay Africa: an AI payment agent on WhatsApp for gaming & lifestyle gift cards,
airtime, data and bills, paid by Naira bank transfer. Every primary CTA opens WhatsApp — there is no checkout here.

```
src/
  pages/        index.astro, about.astro, articles.astro, privacy.md, terms.md, refunds.md
  layouts/      base-layout.astro (head, SEO, analytics listener), legal-layout.astro
  components/   site-nav, site-footer, sections/{hero,features,flow,platforms,faq}, ui/{button,logo,feature-icon}
  content/      home.ts — all homepage copy + WhatsApp prefill messages
  lib/          site.ts (brand facts, waLink), motion/*, analytics/* (consent, PostHog, events)
public/         fonts, brand, images, videos, favicons
docs/           design + landing-page spec
```

## Critical rules / invariants

- **Brand:** always "Panda Pay Africa"; say Nigeria (not Lagos) in public copy. Brand facts live in `src/lib/site.ts` only.
- **WhatsApp links:** build every `wa.me` URL with `waLink(text)` from `src/lib/site.ts`. Never hardcode the number.
- **Copy:** lives in `src/content/home.ts`; components render it, they don't own it.
- **No checkout, order status, voucher codes or payment flows** on this site.
- **No fabricated social proof** (testimonials, customer counts, metrics) without verified evidence.
- **Analytics** (landing-page-spec §8): mark clickable elements with `data-track` + `data-location`; one delegated
  listener in `base-layout.astro` pushes to `window.dataLayer`; every `wa.me` click emits `checkout_handoff`.
  Analytics code lives in `src/lib/analytics/` (`client.ts` is the browser entry). Before consent / after Decline,
  PostHog runs cookieless and sends page views only; named events and cookies only after Accept (privacy §13).
  Use `track()` for new events — never call `posthog` directly from components.
- **Performance:** static first; heavy scripts load lazily.

## How we work here

### Repo commands

- **Default branch:** `main`
- **Install:** `bun install`
- **Dev:** `bun dev` (http://localhost:4321) — agents: `bunx astro dev --background`, manage with `astro dev stop|status|logs`
- **Build:** `bun run build` → `dist/`
- **Preview:** `bun run preview`
- **Test:** `bun test` (Bun built-in runner; added in MKT-007)
- **Brand assets:** `bun run brand:assets`, `bun run brand:favicons`

### Environment

| Variable | Purpose |
|----------|---------|
| `PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog project token (EU project). Unset → analytics off, no consent banner |
| `PUBLIC_POSTHOG_HOST` | `https://eu.i.posthog.com` |

### Agent process

1. **BOOT** — Read this file + `FEATURES.json` + `skills/.harness/STATE.md` + recent `git log`. Pick highest-priority `FAIL`.
2. **CONTRACT** — Non-trivial work: write `skills/.harness/contracts/<id>.md` from `skills/.harness/templates/SPRINT_CONTRACT.md`; human approves and confirms the branch.
3. **IMPLEMENT** — Minimal diff on the confirmed feature branch; `bun test` and `bun run build`.
4. **VERIFY** — Run the feature's `verify` command(s); check desktop + 390px in a browser.
5. **REVIEW** — `harness-review` skill + `templates/REVIEW.md` in chat before staging.
6. **PASS** — Human sets `PASS` only after verify is green.
- **Git publish gate:** never commit, push or open a PR without an explicit "commit", "push" or "open PR".

## Astro docs

Full documentation: https://docs.astro.build — consult before related work:
[routing](https://docs.astro.build/en/guides/routing/) ·
[components](https://docs.astro.build/en/basics/astro-components/) ·
[framework components](https://docs.astro.build/en/guides/framework-components/) ·
[content collections](https://docs.astro.build/en/guides/content-collections/) ·
[styling](https://docs.astro.build/en/guides/styling/) ·
[i18n](https://docs.astro.build/en/guides/internationalization/)

## Off limits

- Checkout, order status, admin, agent chat — other repos (`pandapay-store`, `pandapay-admin`, `pandapay-be`).
- Backend API changes — `pandapay-be` session.

## Conventions I keep getting wrong (correct me here)

- Reaching for React or a new dependency where an `.astro` component or a plain `<script>` will do.
