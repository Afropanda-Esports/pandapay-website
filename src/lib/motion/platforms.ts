/**
 * Products section: a tab switch (Gift cards / Utilities) over two galleries.
 *
 * Every motion accounted for:
 *  0. Tabs: the black pill slides to the chosen tab; the title's lines swap
 *     (old up and out, new up and in); the old gallery fades, the new one's
 *     cards slide in from the right. A hidden gallery is paused.
 *  1. Entry (once): heading lines rise, the cards slide in from the right.
 *  2. Autoplay (only while on screen and not paused): the active card plays its
 *     images, one every `data-hold` seconds (five games per platform; one
 *     graphic per utility). Each new game fades in over the last
 *     while settling from a slight zoom. The platform's segment fills over the
 *     whole run.
 *  3. When the segment is full, the row glides to the next platform; the card
 *     it left resets to its first game once it's out of focus. After the last
 *     platform, it glides back to the first.
 *  4. The visitor can swipe, scroll sideways, drag, use arrow keys, or click a
 *     segment. The clock holds while they're moving the row, then the card they
 *     land on starts playing. Only the pause button stops autoplay.
 *  Reduced motion: starts paused; all changes are instant.
 */
import { gsap, reducedMotion, fontsReady } from "./gsap";
import { splitLines } from "./split-lines";

interface Gallery {
  hasEntered: () => boolean;
  cards: HTMLElement[];
  realign: () => void;
}

function createGallery(root: HTMLElement): Gallery | null {
  const track = root.querySelector<HTMLElement>("[data-gallery]");
  if (!track) return null;
  const reduce = reducedMotion();
  const T = Number(root.dataset.hold) || 3;

  const cards = [...root.querySelectorAll<HTMLElement>("[data-card]")];
  const games = cards.map((c) => [...c.querySelectorAll<HTMLElement>("[data-game]")]);
  const fills = [...root.querySelectorAll<HTMLElement>("[data-fill]")];
  const segments = [...root.querySelectorAll<HTMLButtonElement>("[data-segment]")];
  const playBtn = root.querySelector<HTMLButtonElement>("[data-play]")!;
  if (!cards.length) return null;

  let active = 0;
  const shown = cards.map(() => 0); // game index currently visible per card
  let run: gsap.core.Timeline | null = null;
  let userPaused = reduce;
  let inView = false;
  let pageHidden = document.hidden;
  let autoScrolling = false;
  let interacting = false; // the visitor is moving the row right now
  let entered = false;

  /* ---------------- helpers ---------------- */

  const padLeft = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const targetFor = (i: number) => cards[i]!.offsetLeft - padLeft();

  function setPlayState() {
    const playing = !userPaused;
    playBtn.dataset.state = playing ? "playing" : "paused";
    playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  function markActive(i: number) {
    active = i;
    cards.forEach((c, k) => c.toggleAttribute("data-active", k === i));
    segments.forEach((s, k) => (k === i ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current")));
  }

  function setFills(i: number, current = 0) {
    fills.forEach((f, k) => gsap.set(f, { scaleX: k < i ? 1 : k === i ? current : 0 }));
  }

  function showGame(c: number, k: number, instant = false) {
    const list = games[c]!;
    const prev = shown[c]!;
    if (k === prev) return;
    shown[c] = k;
    const inc = list[k]!;
    const out = list[prev]!;
    gsap.killTweensOf([inc, out]);
    if (instant || reduce) {
      gsap.set(out, { autoAlpha: 0, scale: 1, zIndex: 0 });
      gsap.set(inc, { autoAlpha: 1, scale: 1, zIndex: 1 });
      return;
    }
    gsap.set(out, { zIndex: 0 });
    gsap.set(inc, { zIndex: 1 });
    gsap.fromTo(inc, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" });
    gsap.to(out, { autoAlpha: 0, duration: 0.4, delay: 0.8, onComplete: () => gsap.set(out, { scale: 1 }) });
  }

  function resetCard(c: number) {
    games[c]!.forEach((g, k) => gsap.set(g, { autoAlpha: k === 0 ? 1 : 0, scale: 1, zIndex: k === 0 ? 1 : 0 }));
    shown[c] = 0;
  }

  /* ---------------- autoplay ---------------- */

  const blocked = () => userPaused || interacting || !inView || pageHidden || !entered;

  function buildRun(i: number) {
    run?.kill();
    const n = games[i]!.length;
    run = gsap.timeline({ paused: true, onComplete: () => advance() });
    run.fromTo(fills[i]!, { scaleX: 0 }, { scaleX: 1, duration: n * T, ease: "none" }, 0);
    for (let k = 1; k < n; k += 1) run.call(showGame, [i, k], k * T);
  }

  function refresh() {
    if (!run) return;
    if (blocked() || autoScrolling) run.pause();
    else run.resume();
  }

  function glideTo(i: number, onDone?: () => void) {
    const from = active;
    const x = Math.min(targetFor(i), track!.scrollWidth - track!.clientWidth);
    autoScrolling = true;
    track!.setAttribute("data-auto", "");
    gsap.to(track!, {
      scrollLeft: x,
      duration: reduce ? 0 : i < from ? 1.4 : 1.1,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        track!.removeAttribute("data-auto");
        autoScrolling = false;
        onDone?.();
      },
    });
  }

  function advance() {
    const prev = active;
    const next = (active + 1) % cards.length;
    if (next === 0) setFills(0, 0); // looped: start the segments over
    markActive(next);
    glideTo(next, () => {
      resetCard(prev);
      buildRun(next);
      refresh();
    });
  }

  let settleTimer = 0;

  /** Hold the clock while the visitor moves the row; settle once they stop. */
  function hold(wait = 400) {
    interacting = true;
    refresh();
    clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, wait);
  }

  /* ---------------- user scrolling ---------------- */

  track.addEventListener(
    "scroll",
    () => {
      if (autoScrolling) return;
      hold(160);
    },
    { passive: true },
  );

  /** After the user moves the row: find the card at the left edge and make it active. */
  function settle() {
    if (drag) return; // still dragging; pointerup settles
    interacting = false;
    const x = track!.scrollLeft;
    let best = 0;
    let dist = Infinity;
    cards.forEach((_, i) => {
      const d = Math.abs(targetFor(i) - x);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    if (best === active) {
      refresh(); // same card: carry on where it was
      return;
    }
    const prev = active;
    markActive(best);
    resetCard(prev);
    setFills(best, 0);
    buildRun(best);
    refresh();
  }

  // the visitor is moving the row: hold the clock until they stop
  track.addEventListener("wheel", (e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && hold(), { passive: true });
  track.addEventListener("touchstart", () => hold(600), { passive: true });
  track.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) hold();
  });

  // click-and-drag for mouse users
  let drag: { x: number; left: number; moved: boolean } | null = null;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    gsap.killTweensOf(track);
    autoScrolling = false;
    track.removeAttribute("data-auto");
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 4) {
      drag.moved = true;
      track.setAttribute("data-dragging", "");
      interacting = true;
      refresh();
    }
    if (drag.moved) track.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    if (!moved) return;
    track.removeAttribute("data-dragging");
    // snap to the nearest card ourselves (snap is off while dragging)
    settle();
    glideTo(active, refresh);
  });

  /* ---------------- controls ---------------- */

  playBtn.addEventListener("click", () => {
    userPaused = !userPaused;
    setPlayState();
    if (!userPaused && run && run.progress() >= 1) buildRun(active);
    refresh();
  });

  segments.forEach((s, i) =>
    s.addEventListener("click", () => {
      const prev = active;
      markActive(i);
      setFills(i, 0);
      glideTo(i, () => {
        if (prev !== i) resetCard(prev);
        buildRun(i);
        refresh();
      });
    }),
  );

  // keep the active card aligned when the layout changes
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    gsap.killTweensOf(track);
    autoScrolling = false;
    track.removeAttribute("data-auto");
    track.scrollLeft = targetFor(active);
  });

  document.addEventListener("visibilitychange", () => {
    pageHidden = document.hidden;
    refresh();
  });

  new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting);
      if (inView) enter();
      refresh();
    },
    { threshold: 0.45 },
  ).observe(track);

  /* ---------------- entry ---------------- */

  function enter() {
    if (entered) return;
    entered = true;
    if (reduce) return;
    gsap.fromTo(
      cards,
      { x: 120, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out", stagger: 0.08, clearProps: "transform" },
    );
  }

  /* ---------------- boot ---------------- */

  markActive(0);
  setFills(0, 0);
  setPlayState();
  buildRun(0);

  if (!reduce) gsap.set(cards, { autoAlpha: 0 });

  return {
    hasEntered: () => entered,
    cards,
    realign: () => {
      gsap.killTweensOf(track);
      autoScrolling = false;
      track.removeAttribute("data-auto");
      track.scrollLeft = targetFor(active);
    },
  };
}

/* ======================= section: tabs + titles ======================= */

export function initPlatforms(root: HTMLElement) {
  const reduce = reducedMotion();
  const panels = [...root.querySelectorAll<HTMLElement>("[data-panel]")];
  const tabs = [...root.querySelectorAll<HTMLButtonElement>("[data-tab]")];
  const titles = [...root.querySelectorAll<HTMLElement>("[data-title]")];
  const pill = root.querySelector<HTMLElement>("[data-tab-pill]");
  const galleries = new Map(panels.map((p) => [p.dataset.panel!, createGallery(p)]));
  let current = tabs.find((t) => t.getAttribute("aria-selected") === "true")?.dataset.tab ?? "gift-cards";
  let titlesSplit = false;
  let headingShown = false;

  const linesOf = (el?: Element | null) => (el ? [...el.querySelectorAll<HTMLElement>(".line__inner")] : []);
  const titleFor = (id: string) => titles.find((t) => t.dataset.title === id);

  function placePill(instant = false) {
    const tab = tabs.find((t) => t.dataset.tab === current);
    if (!pill || !tab) return;
    const vars = { x: tab.offsetLeft, width: tab.offsetWidth };
    if (instant || reduce) gsap.set(pill, vars);
    else gsap.to(pill, { ...vars, duration: 0.55, ease: "power3.inOut" });
  }

  function select(id: string, focus = false) {
    if (id === current) return;
    const prev = current;
    current = id;

    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    placePill();

    // title swap
    const outT = titleFor(prev);
    const inT = titleFor(id);
    outT?.setAttribute("aria-hidden", "true");
    inT?.removeAttribute("aria-hidden");
    if (reduce || !titlesSplit) {
      outT?.removeAttribute("data-active");
      inT?.setAttribute("data-active", "");
    } else {
      gsap.to(linesOf(outT), {
        yPercent: -110,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.04,
        onComplete: () => outT?.removeAttribute("data-active"),
      });
      inT?.setAttribute("data-active", "");
      gsap.fromTo(linesOf(inT), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.3 });
    }

    // panel swap
    const outP = panels.find((p) => p.dataset.panel === prev);
    const inP = panels.find((p) => p.dataset.panel === id);
    const show = () => {
      if (outP) {
        outP.hidden = true;
        gsap.set(outP, { clearProps: "opacity" });
      }
      if (!inP) return;
      inP.hidden = false;
      const g = galleries.get(id);
      g?.realign();
      // first showing animates itself (gallery entry); after that, slide in here
      if (g?.hasEntered() && !reduce) {
        gsap.fromTo(
          g.cards,
          { x: 80, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.06, clearProps: "transform" },
        );
      }
    };
    if (reduce || !outP) show();
    else gsap.to(outP, { opacity: 0, duration: 0.25, ease: "power1.out", onComplete: show });
  }

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t.dataset.tab!));
    t.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]!;
      select(next.dataset.tab!, true);
    });
  });

  // heading entry, once, when the section comes into view
  new IntersectionObserver(
    (entries, io) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      headingShown = true;
      if (reduce || !titlesSplit) return;
      gsap.fromTo(linesOf(titleFor(current)), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.06 });
    },
    { threshold: 0.25 },
  ).observe(root);

  root.setAttribute("data-ready", "");
  placePill(true);

  fontsReady().then(() => {
    placePill(true);
    if (reduce) return;
    titles.forEach((t) => splitLines(t));
    titlesSplit = true;
    if (!headingShown) gsap.set(linesOf(titleFor(current)), { yPercent: 110 });
  });

  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    placePill(true);
    if (!reduce && titlesSplit) {
      titles.forEach((t) => splitLines(t));
      titles.forEach((t) => gsap.set(linesOf(t), { yPercent: 0 }));
    }
  });
}
