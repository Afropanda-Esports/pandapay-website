/**
 * Living bento motion.
 *
 * Every motion is accounted for:
 *  1. Entrance (once, on scroll into view): heading lines rise, tiles settle in
 *     from a slight tilt, one after another.
 *  2. Each tile then runs its own clock (data-duration). The indicator ring fills
 *     over that time; when full, the tile moves to its next feature.
 *     Clocks start 1.1s apart, so no two tiles ever change together.
 *  3. A swap: copy lines leave upward, the indicator icon turns over, the media
 *     changes with the tile's own transition (rise / wipe-x / stack / wipe-y / zoom),
 *     new copy lines rise in.
 *  4. Clicking the indicator skips ahead. Hovering or focusing it holds the clock.
 *  5. Each tile pauses while it is off-screen, and all pause in a hidden tab.
 *  Reduced motion: no entrance, no autoplay; the indicator still swaps (instantly).
 */
import { gsap, reducedMotion, fontsReady } from "./gsap";
import { splitLines } from "./split-lines";

const C = 2 * Math.PI * 21; // ring circumference (r = 21)
const STAGGER_START = 1.1;
const TILT = [-4, 3, -2, 4, -3];

type Transition = "rise" | "wipe-x" | "stack" | "wipe-y" | "zoom";

interface Tile {
  el: HTMLElement;
  index: number;
  duration: number;
  transition: Transition;
  current: number;
  count: number;
  ring: SVGCircleElement;
  ind: HTMLButtonElement;
  icons: HTMLElement[];
  media: HTMLElement[];
  copies: HTMLElement[];
  titles: string[];
  timer: gsap.core.Tween | null;
  busy: boolean;
  visible: boolean;
  holds: Set<string>;
}

export function initFeatures(root: HTMLElement) {
  const reduce = reducedMotion();
  const tiles: Tile[] = [...root.querySelectorAll<HTMLElement>("[data-tile]")].map((el, index) => {
    const copies = [...el.querySelectorAll<HTMLElement>("[data-copy]")];
    return {
      el,
      index,
      duration: Number(el.dataset.duration) || 6,
      transition: (el.dataset.transition as Transition) || "zoom",
      current: 0,
      count: copies.length,
      ring: el.querySelector<SVGCircleElement>("[data-ring]")!,
      ind: el.querySelector<HTMLButtonElement>("[data-ind]")!,
      icons: [...el.querySelectorAll<HTMLElement>("[data-ind-icon]")],
      media: [...el.querySelectorAll<HTMLElement>("[data-media]")],
      copies,
      titles: copies.map((c) => c.querySelector(".bento-copy__title")?.textContent?.trim() ?? ""),
      timer: null,
      busy: false,
      visible: false,
      holds: new Set(),
    };
  });
  if (!tiles.length) return;

  const heading = [...root.querySelectorAll<HTMLElement>("[data-features-split]")];
  const splitEls = () => [...root.querySelectorAll<HTMLElement>("[data-split]"), ...heading];
  const linesOf = (el: Element) => [...el.querySelectorAll<HTMLElement>(".line__inner")];

  let entered = false;
  let pageHidden = document.hidden;

  /* ---------------- helpers ---------------- */

  function updateMeta(t: Tile) {
    const next = (t.current + 1) % t.count;
    t.ind.setAttribute("aria-label", `Show next: ${t.titles[next]}`);
  }

  function syncVideos() {
    for (const t of tiles) {
      t.media.forEach((m, i) => {
        const v = m.querySelector("video");
        if (!v) return;
        if (i === t.current && t.visible && !pageHidden) v.play().catch(() => {});
        else v.pause();
      });
    }
  }

  const blocked = (t: Tile) => !entered || !t.visible || pageHidden || t.holds.size > 0;

  function startTimer(t: Tile, delay = 0) {
    t.timer?.kill();
    if (reduce || t.count < 2) return;
    t.timer = gsap.fromTo(
      t.ring,
      { strokeDashoffset: C },
      {
        strokeDashoffset: 0,
        duration: t.duration,
        delay,
        ease: "none",
        onComplete: () => go(t, (t.current + 1) % t.count),
      },
    );
    if (blocked(t)) t.timer.pause();
  }

  function refreshTimer(t: Tile) {
    if (!t.timer || t.busy) return;
    if (blocked(t)) t.timer.pause();
    else t.timer.resume();
  }

  const refreshAll = () => {
    tiles.forEach(refreshTimer);
    syncVideos();
  };

  /* ---------------- media transitions ---------------- */

  function mediaSwap(tl: gsap.core.Timeline, type: Transition, from: HTMLElement, to: HTMLElement, at: number) {
    gsap.set(from, { zIndex: 1 });
    gsap.set(to, { zIndex: 2 });

    switch (type) {
      case "rise":
        tl.to(from, { y: -30, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, at).fromTo(
          to,
          { y: 40, scale: 0.96, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
          at + 0.25,
        );
        break;
      case "wipe-x":
        tl.fromTo(
          to,
          { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
          at,
        )
          .to(from, { x: -48, duration: 1, ease: "expo.inOut" }, at)
          .set(from, { autoAlpha: 0 });
        break;
      case "wipe-y":
        tl.fromTo(
          to,
          { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
          at,
        )
          .to(from, { y: -48, duration: 1, ease: "expo.inOut" }, at)
          .set(from, { autoAlpha: 0 });
        break;
      case "stack":
        tl.to(from, { scale: 0.9, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, at).fromTo(
          to,
          { scale: 1.08, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
          at + 0.15,
        );
        break;
      default: // zoom
        tl.to(from, { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, at).fromTo(
          to,
          { scale: 1.1, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.1, ease: "power2.out" },
          at,
        );
    }
    tl.set(from, { clearProps: "transform,clipPath,zIndex" });
    tl.set(to, { clearProps: "clipPath" });
  }

  /* ---------------- swap ---------------- */

  function go(t: Tile, next: number) {
    if (t.busy || next === t.current) return;
    const prev = t.current;
    t.current = next;
    updateMeta(t);
    t.timer?.kill();

    const oldCopy = t.copies[prev]!;
    const newCopy = t.copies[next]!;

    if (reduce) {
      gsap.set([t.media[prev], t.icons[prev], oldCopy], { autoAlpha: 0 });
      gsap.set([t.media[next], t.icons[next], newCopy], { autoAlpha: 1 });
      gsap.set(linesOf(newCopy), { yPercent: 0 });
      syncVideos();
      return;
    }

    t.busy = true;
    const tl = gsap.timeline({
      onComplete: () => {
        t.busy = false;
        startTimer(t);
      },
    });

    // ring drains back
    tl.to(t.ring, { strokeDashoffset: C, duration: 0.45, ease: "power2.inOut" }, 0);

    // copy out
    tl.to(linesOf(oldCopy), { yPercent: -110, duration: 0.4, ease: "power2.in", stagger: 0.03 }, 0).set(
      oldCopy,
      { autoAlpha: 0 },
    );

    // icon turns over
    tl.to(t.icons[prev]!, { rotation: -90, scale: 0.5, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0).fromTo(
      t.icons[next]!,
      { rotation: 90, scale: 0.5, autoAlpha: 0 },
      { rotation: 0, scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(2)" },
      0.3,
    );

    // media
    mediaSwap(tl, t.transition, t.media[prev]!, t.media[next]!, 0.1);
    tl.call(syncVideos, [], 0.1);

    // copy in
    tl.set(newCopy, { autoAlpha: 1 }, 0.35).fromTo(
      linesOf(newCopy),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 },
      0.35,
    );
  }

  /* ---------------- interaction ---------------- */

  for (const t of tiles) {
    t.ind.addEventListener("click", () => go(t, (t.current + 1) % t.count));
    const hold = (on: boolean, why: string) => () => {
      if (on) t.holds.add(why);
      else t.holds.delete(why);
      refreshTimer(t);
    };
    t.ind.addEventListener("pointerenter", hold(true, "hover"));
    t.ind.addEventListener("pointerleave", hold(false, "hover"));
    t.ind.addEventListener("focus", hold(true, "focus"));
    t.ind.addEventListener("blur", hold(false, "focus"));
  }

  document.addEventListener("visibilitychange", () => {
    pageHidden = document.hidden;
    refreshAll();
  });

  /* ---------------- split + resize ---------------- */

  function split() {
    splitEls().forEach((el) => splitLines(el));
    // only the active copy shows its lines; hidden copies get positioned on entry
    for (const t of tiles) gsap.set(linesOf(t.copies[t.current]!), { yPercent: entered || reduce ? 0 : 110 });
    if (entered || reduce) gsap.set(heading.flatMap(linesOf), { yPercent: 0 });
  }

  let resizeTimer = 0;
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (tiles.some((t) => t.busy)) return;
      split();
    }, 200);
  });

  /* ---------------- entrance ---------------- */

  function enter() {
    if (entered) return;
    entered = true;

    if (reduce) {
      gsap.set(tiles.map((t) => t.el), { autoAlpha: 1 });
      syncVideos();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => tiles.forEach((t) => startTimer(t, t.index * STAGGER_START)),
    });

    tl.fromTo(
      heading.flatMap(linesOf),
      { yPercent: 110 },
      { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.06 },
      0,
    ).to(
      tiles.map((t) => t.el),
      { autoAlpha: 1, y: 0, rotation: 0, scale: 1, duration: 1.1, ease: "power3.out", stagger: 0.1 },
      0.15,
    );

    tiles.forEach((t, i) => {
      const at = 0.55 + i * 0.1;
      tl.fromTo(
        linesOf(t.copies[0]!),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 },
        at,
      ).fromTo(
        t.ind,
        { scale: 0.6, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(2)" },
        at + 0.1,
      );
    });

    tl.set(
      tiles.map((t) => t.el),
      { clearProps: "transform" },
    );
    tl.call(syncVideos);
  }

  /* ---------------- boot ---------------- */

  tiles.forEach(updateMeta);
  gsap.set(
    tiles.map((t) => t.ring),
    { strokeDasharray: C, strokeDashoffset: C },
  );

  if (!reduce) {
    gsap.set(
      tiles.map((t) => t.el),
      { autoAlpha: 0, y: 60, scale: 0.94, rotation: (i) => TILT[i % TILT.length] },
    );
  }

  fontsReady().then(() => {
    split();

    const entryIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          entryIO.disconnect();
          enter();
        }
      },
      { threshold: 0.12 },
    );
    entryIO.observe(root.querySelector(".bento") ?? root);

    // each tile keeps time only while you can see it
    const tileIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const t = tiles.find((x) => x.el === e.target);
          if (t) t.visible = e.isIntersecting;
        }
        refreshAll();
      },
      { threshold: 0.35 },
    );
    tiles.forEach((t) => tileIO.observe(t.el));
  });
}
