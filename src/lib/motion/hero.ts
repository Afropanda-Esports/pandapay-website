import { gsap, reducedMotion, fontsReady } from "./gsap";
import { splitLines } from "./split-lines";

interface SlideData {
  id: string;
  tone: "dark" | "light";
  href: string;
}

const MOBILE = "(max-width: 760px)";

/**
 * Hero service carousel.
 * - Intro: background → copy → cards rise from below → first card flips → pills.
 * - Every `interval` s: text exits up, new text enters from below, background
 *   crossfades, the button switches orange/black, the cards trade places.
 * - Pauses on hover/focus of the controls, when off-screen, when the tab is
 *   hidden, or when the user presses pause. Reduced motion: no autoplay, instant swaps.
 */
export function initHero(root: HTMLElement) {
  if (root.dataset.heroReady) return;
  root.dataset.heroReady = "true";

  const q = <T extends Element = HTMLElement>(sel: string) => [...root.querySelectorAll<T>(sel)] as T[];

  const stage = root.querySelector<HTMLElement>("[data-hero-stage]")!;
  const region = root.querySelector<HTMLElement>("[data-hero-slides-region]")!;
  const actions = root.querySelector<HTMLElement>("[data-hero-actions]")!;
  const cta = root.querySelector<HTMLAnchorElement>("[data-hero-cta]")!;
  const toggle = root.querySelector<HTMLButtonElement>("[data-hero-toggle]")!;
  const pillsWrap = root.querySelector<HTMLElement>("[data-hero-pills]")!;

  const bgs = q("[data-hero-bg]");
  const slides = q("[data-hero-slide]");
  const ctaTexts = q("[data-hero-cta-text]");
  const cards = q("[data-hero-card]");
  const cardInners = q("[data-hero-card-inner]");
  const pills = q<HTMLButtonElement>("[data-hero-pill]");
  const fills = q("[data-hero-pill-fill]");

  const data: SlideData[] = JSON.parse(root.dataset.heroSlides ?? "[]");
  const interval = Number(root.dataset.heroInterval) || 7;
  const n = slides.length;
  const reduce = reducedMotion();
  const mobile = window.matchMedia(MOBILE);

  let index = 0;
  let busy = false;
  let queued: number | null = null;
  let timer: gsap.core.Tween | null = null;
  const paused = { user: false, hover: false, focus: false, offscreen: false, hidden: false };

  // ---------- text splitting ----------
  const lines = new Map<HTMLElement, HTMLElement[]>();
  const split = () => {
    slides.forEach((slide) => {
      const parts = [...slide.querySelectorAll<HTMLElement>("[data-split]")];
      lines.set(slide, parts.flatMap((el) => splitLines(el)));
    });
  };
  const linesOf = (i: number) => lines.get(slides[i]!) ?? [];

  // ---------- card geometry ----------
  const tablet = window.matchMedia("(max-width: 1100px)");
  const activeSink = () => (mobile.matches ? 34 : tablet.matches ? 34 : 36);
  const restZ = (i: number) => i + 1; // left-to-right overlap
  const ACTIVE_Z = 10;
  const restOf = (i: number) => ({
    yPercent: Number(cards[i]!.dataset.sink ?? 55),
    rotation: Number(cards[i]!.dataset.rot ?? 0),
  });

  // ---------- state helpers ----------
  const applyMeta = (i: number) => {
    const d = data[i]!;
    stage.dataset.tone = d.tone;
    cta.dataset.variant = d.tone === "dark" ? "primary" : "dark";
    cta.href = d.href;
    cta.dataset.product = d.id;
    pills.forEach((p, k) => (k === i ? p.setAttribute("aria-current", "true") : p.removeAttribute("aria-current")));
    cards.forEach((c, k) => c.toggleAttribute("data-active", k === i));
    // let the nav (and anything else) follow the hero's tone
    document.dispatchEvent(new CustomEvent("panda:tone", { detail: { tone: d.tone, source: "hero" } }));
  };

  const setSlideAccess = (i: number) => {
    slides.forEach((s, k) => {
      const on = k === i;
      s.toggleAttribute("inert", !on);
      on ? s.removeAttribute("aria-hidden") : s.setAttribute("aria-hidden", "true");
    });
    ctaTexts.forEach((t, k) => t.setAttribute("aria-hidden", String(k !== i)));
  };

  /** Snap everything to slide i with no animation. */
  const snapTo = (i: number) => {
    slides.forEach((s, k) => {
      gsap.set(s, { autoAlpha: k === i ? 1 : 0 });
      gsap.set(linesOf(k), { yPercent: k === i ? 0 : 110 });
    });
    bgs.forEach((b, k) => gsap.set(b, { autoAlpha: k === i ? 1 : 0, scale: 1 }));
    // y/x: 0 cancels the no-JS CSS transforms, which GSAP would otherwise read as offsets
    ctaTexts.forEach((t, k) => gsap.set(t, { y: 0, yPercent: k === i ? 0 : 140 }));
    cards.forEach((c, k) =>
      gsap.set(c, k === i
        ? { x: 0, y: 0, yPercent: activeSink(), rotation: 0, zIndex: ACTIVE_Z }
        : { x: 0, y: 0, ...restOf(k), zIndex: restZ(k) }),
    );
    cardInners.forEach((inner, k) => gsap.set(inner, { rotationY: k === i ? 180 : 0 }));
    applyMeta(i);
    setSlideAccess(i);
  };

  // ---------- timer ----------
  const isPaused = () => Object.values(paused).some(Boolean);

  const syncPause = () => {
    if (timer) isPaused() ? timer.pause() : timer.resume();
    region.setAttribute("aria-live", paused.user || reduce ? "polite" : "off");
  };

  const startTimer = () => {
    timer?.kill();
    gsap.set(fills, { scaleX: 0 });
    if (reduce) return;
    timer = gsap.fromTo(
      fills[index]!,
      { scaleX: 0 },
      { scaleX: 1, duration: interval, ease: "none", onComplete: () => go((index + 1) % n) },
    );
    syncPause();
  };

  // ---------- transition ----------
  function go(next: number) {
    if (next === index && !busy) return;
    if (busy) {
      queued = next;
      return;
    }
    const prev = index;
    index = next;
    timer?.kill();
    gsap.set(fills, { scaleX: 0 });

    if (reduce) {
      snapTo(next);
      return;
    }

    busy = true;
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        busy = false;
        if (queued !== null && queued !== index) {
          const q2 = queued;
          queued = null;
          go(q2);
        } else {
          queued = null;
          startTimer();
        }
      },
    });

    const prevSlide = slides[prev]!;
    const nextSlide = slides[next]!;

    // 1. Copy out through the top
    tl.to(linesOf(prev), { yPercent: -110, duration: 0.45, ease: "power2.in", stagger: 0.03 }, 0)
      .to(ctaTexts[prev]!, { yPercent: -140, duration: 0.38, ease: "power2.in" }, 0)

      // 2. Background crossfade with a slow settle
      .fromTo(bgs[next]!, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power2.out" }, 0.15)
      .to(bgs[prev]!, { autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, 0.3)

      // 3. Swap tone, button colour, link, accessibility at the midpoint
      .add(() => {
        applyMeta(next);
        setSlideAccess(next);
      }, 0.35)
      .set(nextSlide, { autoAlpha: 1 }, 0.35)
      .set(prevSlide, { autoAlpha: 0 }, 0.55)

      // 4. New copy in from below
      .fromTo(linesOf(next), { yPercent: 110 }, { yPercent: 0, duration: 0.85, stagger: 0.05 }, 0.5)
      .fromTo(ctaTexts[next]!, { yPercent: 140 }, { yPercent: 0, duration: 0.6 }, 0.58)

      // 5. Cards: previous flips back and sinks, next rises and flips
      .to(cardInners[prev]!, { rotationY: 0, duration: 0.7, ease: "power2.inOut" }, 0)
      .to(cards[prev]!, { ...restOf(prev), duration: 0.85, ease: "power3.inOut" }, 0.1)
      .set(cards[prev]!, { zIndex: restZ(prev) }, 0.45)
      .set(cards[next]!, { zIndex: ACTIVE_Z }, 0.2)
      .to(cards[next]!, { yPercent: activeSink(), rotation: 0, duration: 0.9, ease: "power3.inOut" }, 0.2)
      .to(cardInners[next]!, { rotationY: 180, duration: 0.8, ease: "power2.inOut" }, 0.45);
  }

  // ---------- intro ----------
  const intro = () => {
    snapTo(0);
    document.documentElement.classList.remove("hero-pending");
    if (reduce) {
      region.setAttribute("aria-live", "polite");
      return;
    }

    const actionItems = [...actions.children];
    const pillItems = [...pillsWrap.children];

    gsap.set(bgs[0]!, { autoAlpha: 0, scale: 1.14 });
    gsap.set(linesOf(0), { yPercent: 110 });
    gsap.set(actionItems, { autoAlpha: 0, y: 24 });
    gsap.set(cards, { yPercent: 170 });
    gsap.set(cardInners[0]!, { rotationY: 0 });
    gsap.set(pillItems, { autoAlpha: 0, y: 12 });

    busy = true;
    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          busy = false;
          if (queued !== null && queued !== index) {
            const q2 = queued;
            queued = null;
            go(q2);
          } else {
            queued = null;
            startTimer();
          }
        },
      })
      // 1. image
      .to(bgs[0]!, { autoAlpha: 1, scale: 1, duration: 1.5 }, 0)
      // 2. text
      .to(linesOf(0), { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" }, 0.6)
      .to(actionItems, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.95)
      // 3. cards slide up into their places, then the first one rises and flips
      .to(cards, {
        yPercent: (k: number) => restOf(k).yPercent,
        rotation: (k: number) => restOf(k).rotation,
        duration: 1.1,
        stagger: 0.09,
      }, 1.05)
      .to(cards[0]!, { yPercent: activeSink(), rotation: 0, zIndex: ACTIVE_Z, duration: 0.8, ease: "power3.inOut" }, 1.85)
      .to(cardInners[0]!, { rotationY: 180, duration: 0.8, ease: "power2.inOut" }, 2.0)
      // 4. pills
      .to(pillItems, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, 2.1);
  };

  // ---------- events ----------
  pills.forEach((pill, i) => pill.addEventListener("click", () => go(i)));
  cards.forEach((card, i) => card.addEventListener("click", () => go(i)));

  pillsWrap.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const current = pills.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    e.preventDefault();
    const nextIdx = (current + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
    pills[nextIdx]!.focus();
    go(nextIdx);
  });

  toggle.addEventListener("click", () => {
    paused.user = !paused.user;
    toggle.setAttribute("aria-pressed", String(paused.user));
    toggle.setAttribute("aria-label", paused.user ? "Play rotation" : "Pause rotation");
    syncPause();
  });

  // Pause while the visitor is reading or about to click (controls, not the whole stage)
  [actions, pillsWrap].forEach((el) => {
    el.addEventListener("pointerenter", () => ((paused.hover = true), syncPause()));
    el.addEventListener("pointerleave", () => ((paused.hover = false), syncPause()));
  });
  root.addEventListener("focusin", () => ((paused.focus = true), syncPause()));
  root.addEventListener("focusout", (e) => {
    if (!root.contains(e.relatedTarget as Node)) {
      paused.focus = false;
      syncPause();
    }
  });

  document.addEventListener("visibilitychange", () => {
    paused.hidden = document.hidden;
    syncPause();
  });

  new IntersectionObserver(
    ([entry]) => {
      paused.offscreen = !entry!.isIntersecting;
      syncPause();
    },
    { threshold: 0.25 },
  ).observe(stage);

  // Re-measure lines when the width changes; re-place cards on breakpoint change
  let lastWidth = window.innerWidth;
  let resizeId = 0;
  const remeasure = () => {
    if (busy) {
      resizeId = window.setTimeout(remeasure, 300);
      return;
    }
    split();
    slides.forEach((_, k) => gsap.set(linesOf(k), { yPercent: k === index ? 0 : 110 }));
  };
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(resizeId);
    resizeId = window.setTimeout(remeasure, 200);
  });
  const replaceCards = () => {
    if (busy) return;
    cards.forEach((c, k) => gsap.set(c, k === index ? { yPercent: activeSink(), rotation: 0 } : restOf(k)));
  };
  mobile.addEventListener("change", replaceCards);
  tablet.addEventListener("change", replaceCards);

  // ---------- go ----------
  fontsReady().then(() => {
    split();
    intro();
  });
}
