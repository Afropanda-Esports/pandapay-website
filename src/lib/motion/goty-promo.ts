import { gsap, reducedMotion } from "./gsap";

const SCROLL_COMPACT = 48;

/**
 * Fixed GTA VI promo pill under the nav.
 * - Scroll: morphs 124×24 → 24×24 ping.
 * - Open: blur backdrop + flip card from pill to center; locks page scroll.
 * - Close: reverse; Escape / backdrop / pill toggle.
 */
export function initGotyPromo(root: HTMLElement) {
  if (root.dataset.gotyReady) return;
  root.dataset.gotyReady = "true";

  const pill = root.querySelector<HTMLButtonElement>("[data-goty-pill]")!;
  const overlay = root.querySelector<HTMLElement>("[data-goty-overlay]")!;
  const backdrop = root.querySelector<HTMLElement>("[data-goty-backdrop]")!;
  const card = root.querySelector<HTMLElement>("[data-goty-card]")!;
  const inner = root.querySelector<HTMLElement>("[data-goty-card-inner]")!;
  const labelOpen = pill.dataset.ariaOpen ?? "Show offer";
  const labelClose = pill.dataset.ariaClose ?? "Close offer";

  const reduce = reducedMotion();
  let open = false;
  let busy = false;
  let tween: gsap.core.Timeline | null = null;

  const setCompact = () => {
    const compact = window.scrollY > SCROLL_COMPACT;
    root.toggleAttribute("data-compact", compact);
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking || open) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCompact();
        ticking = false;
      });
    },
    { passive: true },
  );
  setCompact();

  const lockScroll = (locked: boolean) => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
  };

  const pillOrigin = () => {
    const pr = pill.getBoundingClientRect();
    const cr = card.getBoundingClientRect();
    const px = pr.left + pr.width / 2;
    const py = pr.top + pr.height / 2;
    const cx = cr.left + cr.width / 2;
    const cy = cr.top + cr.height / 2;
    const scale = Math.max(0.08, Math.min(pr.width / cr.width, pr.height / cr.height));
    return { x: px - cx, y: py - cy, scale };
  };

  const setOpenState = (next: boolean) => {
    open = next;
    root.toggleAttribute("data-open", next);
    pill.setAttribute("aria-expanded", String(next));
    pill.setAttribute("aria-label", next ? labelClose : labelOpen);
    lockScroll(next);
    if (!next) setCompact();
  };

  const openOverlay = () => {
    if (busy || open) return;
    busy = true;
    tween?.kill();

    overlay.hidden = false;
    // Clear leftover close transforms so getBoundingClientRect is the
    // centered full-size card; otherwise reopen measures the already-
    // shrunk pill pose and the grow path collapses to a flip-only tween.
    gsap.set(card, { x: 0, y: 0, scale: 1, autoAlpha: 0 });
    gsap.set(inner, { rotationY: 0 });
    void card.offsetWidth;

    if (reduce) {
      gsap.set(backdrop, { autoAlpha: 1 });
      gsap.set(card, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
      gsap.set(inner, { rotationY: 180 });
      setOpenState(true);
      busy = false;
      return;
    }

    const origin = pillOrigin();
    gsap.set(backdrop, { autoAlpha: 0 });
    gsap.set(card, { x: origin.x, y: origin.y, scale: origin.scale, autoAlpha: 1 });
    gsap.set(inner, { rotationY: 0 });

    tween = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          busy = false;
        },
      })
      .add(() => setOpenState(true), 0)
      .to(backdrop, { autoAlpha: 1, duration: 0.35 }, 0)
      .to(card, { x: 0, y: 0, scale: 1, duration: 0.7 }, 0)
      .to(inner, { rotationY: 180, duration: 0.7, ease: "power2.inOut" }, 0);
  };

  const closeOverlay = () => {
    if (busy || !open) return;
    busy = true;
    tween?.kill();

    if (reduce) {
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(card, { autoAlpha: 0 });
      gsap.set(inner, { rotationY: 0 });
      setOpenState(false);
      overlay.hidden = true;
      busy = false;
      return;
    }

    const origin = pillOrigin();
    tween = gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          overlay.hidden = true;
          gsap.set(card, { x: 0, y: 0, scale: 1, autoAlpha: 0 });
          gsap.set(inner, { rotationY: 0 });
          busy = false;
        },
      })
      .to(inner, { rotationY: 0, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(card, { x: origin.x, y: origin.y, scale: origin.scale, duration: 0.55 }, 0)
      .to(backdrop, { autoAlpha: 0, duration: 0.35 }, 0.15)
      .add(() => setOpenState(false), 0.5);
  };

  const toggle = () => (open ? closeOverlay() : openOverlay());

  pill.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });

  overlay.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("[data-goty-close]")) closeOverlay();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      closeOverlay();
    }
  });

  // Don't follow the WA link until the front is showing (open + not busy mid-flip-in)
  card.addEventListener("click", (e) => {
    if (!open || busy) {
      e.preventDefault();
      return;
    }
  });
}
