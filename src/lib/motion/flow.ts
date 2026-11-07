/**
 * How it works: pinned scroll scene.
 *
 * Scroll is the only clock here (the hero runs on time, the bento on five
 * clocks). Every motion maps to the visitor's scroll:
 *  1. Entry (scrubbed, before the pin): the phone rises, the reticle opens up,
 *     the statement words settle in.
 *  2. While pinned, scroll position picks the screen (one per step; a video
 *     screen plays from the start when it comes in and pauses when it leaves). Screens move like app
 *     navigation: forward pushes in from the right, back pulls in from the left.
 *  3. Crossing into a new step: its word lights up, its pill turns black, its
 *     You/We detail opens, the aim line slides to it, and the reticle locks on
 *     (brackets turn 45°, rings tighten with a small snap).
 *  4. Each step's ring fills with scroll progress through that step.
 *  5. Click a step to scroll to it.
 *  Idle: the reticle's outer ring drifts, only while the section is on screen.
 *  Reduced motion: still scroll-driven, but every change is instant.
 */
import { gsap, reducedMotion, fontsReady } from "./gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const C = 2 * Math.PI * 20; // step ring circumference (r = 20)
const HOLD = 0.6; // extra screens' worth of scroll to rest on the last screen
const MOBILE = "(max-width: 899px)";

export function initFlow(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>("[data-flow-stage]");
  if (!stage) return;
  const reduce = reducedMotion();

  const screens = [...root.querySelectorAll<HTMLElement>("[data-screen]")];
  const items = [...root.querySelectorAll<HTMLElement>("[data-item]")];
  const btns = [...root.querySelectorAll<HTMLButtonElement>("[data-step-btn]")];
  const rings = [...root.querySelectorAll<SVGCircleElement>("[data-ring]")];
  const details = [...root.querySelectorAll<HTMLElement>("[data-detail]")];
  const words = [...root.querySelectorAll<HTMLElement>("[data-word]")];
  const phone = root.querySelector<HTMLElement>("[data-phone]")!;
  const reticle = root.querySelector<SVGSVGElement>("[data-reticle]")!;
  const retOuter = reticle.querySelector<SVGGElement>("[data-ret-outer]")!;
  const retTicks = reticle.querySelector<SVGGElement>("[data-ret-ticks]")!;
  const retBrackets = reticle.querySelector<SVGGElement>("[data-ret-brackets]")!;
  const retRing = reticle.querySelector<SVGCircleElement>("[data-ret-ring]")!;
  const aimPath = root.querySelector<SVGPathElement>("[data-aim-path]");
  const aimA = root.querySelector<SVGCircleElement>("[data-aim-a]");
  const aimB = root.querySelector<SVGCircleElement>("[data-aim-b]");

  // each screen takes `data-scroll` units of scroll (one unit ≈ half a screen height);
  // videos get more, so there's time to watch them while the step is pinned
  const stepOf = screens.map((s) => Number(s.dataset.step) || 0);
  const weight = screens.map((s) => Number(s.dataset.scroll) || 1);
  const screenStart = weight.map((_, i) => weight.slice(0, i).reduce((a, b) => a + b, 0));
  const N = weight.reduce((a, b) => a + b, 0);
  const steps = items.length;
  const start = Array.from({ length: steps }, (_, s) => screenStart[stepOf.indexOf(s)] ?? 0);
  const count = Array.from({ length: steps }, (_, s) =>
    weight.reduce((sum, w, i) => sum + (stepOf[i] === s ? w : 0), 0),
  );
  const span = N + HOLD;
  if (!screens.length || !steps) return;
  const videos = screens.map((s) => s.querySelector("video"));
  let sectionOn = false;

  let screen = 0;
  let step = 0;
  const isMobile = () => window.matchMedia(MOBILE).matches;

  /* ---------------- screens ---------------- */

  gsap.set(screens, { autoAlpha: 0, xPercent: 0 });
  gsap.set(screens[0]!, { autoAlpha: 1 });

  /** Only the visible screen's video plays, from the start each time it comes in. */
  function syncVideos(restart = false) {
    videos.forEach((v, i) => {
      if (!v) return;
      if (i === screen && sectionOn && !reduce) {
        if (restart) v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }

  function showScreen(next: number) {
    if (next === screen) return;
    gsap.delayedCall(0, () => syncVideos(true));
    const dir = next > screen ? 1 : -1;
    const out = screens[screen]!;
    const inc = screens[next]!;
    screen = next;

    gsap.killTweensOf(screens);
    screens.forEach((s) => {
      if (s !== out && s !== inc) gsap.set(s, { autoAlpha: 0, xPercent: 0, zIndex: 0 });
    });

    if (reduce) {
      gsap.set(out, { autoAlpha: 0, xPercent: 0 });
      gsap.set(inc, { autoAlpha: 1, xPercent: 0 });
      return;
    }

    if (dir > 0) {
      // push: the new screen slides over from the right, the old one recedes left
      gsap.set(inc, { zIndex: 2 });
      gsap.set(out, { zIndex: 1 });
      gsap.fromTo(inc, { xPercent: 100, autoAlpha: 1 }, { xPercent: 0, duration: 0.7, ease: "power3.out" });
      gsap.to(out, { xPercent: -28, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
    } else {
      // pop: the current screen slides away right, the previous one returns from the left
      gsap.set(out, { zIndex: 2 });
      gsap.set(inc, { zIndex: 1 });
      gsap.fromTo(inc, { xPercent: -28, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" });
      gsap.to(out, { xPercent: 100, duration: 0.6, ease: "power3.inOut", onComplete: () => gsap.set(out, { autoAlpha: 0 }) });
    }
  }

  /* ---------------- aim line (desktop) ---------------- */

  const aimPos = { x1: 0, y1: 0, x2: 0, y2: 0 };
  let aimReady = false;

  function drawAim() {
    if (!aimPath || !aimA || !aimB) return;
    const { x1, y1, x2, y2 } = aimPos;
    const mid = x1 + (x2 - x1) * 0.5;
    aimPath.setAttribute("d", `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`);
    aimA.setAttribute("cx", String(x1));
    aimA.setAttribute("cy", String(y1));
    aimB.setAttribute("cx", String(x2));
    aimB.setAttribute("cy", String(y2));
  }

  /** Where the step's button will sit once the details have finished resizing. */
  function finalButtonRect(s: number) {
    const saved = details.map((d) => d.style.height);
    details.forEach((d, i) => (d.style.height = i === s ? "auto" : "0px"));
    const rect = btns[s]!.getBoundingClientRect();
    details.forEach((d, i) => (d.style.height = saved[i]!));
    return rect;
  }

  function aimAt(s: number, instant = false) {
    if (!aimPath || isMobile()) return;
    const sr = stage!.getBoundingClientRect();
    const pr = phone.getBoundingClientRect();
    const br = finalButtonRect(s);
    const y2 = br.top + br.height / 2 - sr.top;
    const target = {
      x1: pr.right - sr.left + 18,
      y1: Math.min(Math.max(y2, pr.top - sr.top + 70), pr.bottom - sr.top - 70),
      x2: br.left - sr.left - 12,
      y2,
    };
    gsap.killTweensOf(aimPos);
    if (instant || reduce || !aimReady) {
      Object.assign(aimPos, target);
      drawAim();
      aimReady = true;
      return;
    }
    gsap.to(aimPos, { ...target, duration: 0.7, ease: "power3.inOut", onUpdate: drawAim });
  }

  /* ---------------- steps ---------------- */

  function lockOn() {
    if (reduce) return;
    gsap.to(retBrackets, { rotation: "+=45", svgOrigin: "500 500", duration: 0.9, ease: "power3.inOut" });
    gsap.fromTo(
      [retRing, retBrackets],
      { scale: 1.08 },
      { scale: 1, svgOrigin: "500 500", duration: 1, ease: "elastic.out(1, 0.55)", overwrite: "auto" },
    );
    gsap.fromTo(retTicks, { opacity: 0.35 }, { opacity: 1, duration: 0.6, ease: "power1.out" });
  }

  function setStep(next: number, instant = false) {
    const prev = step;
    step = next;

    items.forEach((el, i) => el.toggleAttribute("data-active", i === next));
    words.forEach((el, i) => el.toggleAttribute("data-active", i === next));
    btns.forEach((b, i) => (i === next ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));

    if (!isMobile()) {
      gsap.killTweensOf(details);
      if (instant || reduce) {
        details.forEach((d, i) => gsap.set(d, { height: i === next ? "auto" : 0 }));
      } else if (prev !== next) {
        details.forEach((d, i) => {
          if (i !== next && i !== prev) gsap.set(d, { height: 0 });
        });
        gsap.fromTo(details[prev]!, { height: details[prev]!.offsetHeight }, { height: 0, duration: 0.5, ease: "power3.inOut" });
        gsap.fromTo(details[next]!, { height: 0 }, { height: "auto", duration: 0.6, ease: "power3.inOut" });
      }
    }

    if (prev !== next && !instant) lockOn();

    // measured against the final layout, so the line travels with the list
    aimAt(next, instant || reduce);
  }

  /* ---------------- scroll ---------------- */

  function apply(p: number) {
    const f = p * span;
    let nextScreen = 0;
    screenStart.forEach((st, i) => {
      if (f >= st) nextScreen = i;
    });
    const nextStep = stepOf[nextScreen]!;

    rings.forEach((ring, s) => {
      const len = count[s]! + (s === steps - 1 ? HOLD : 0);
      const prog = Math.min(1, Math.max(0, (f - start[s]!) / len));
      gsap.set(ring, { strokeDashoffset: C * (1 - prog) });
    });

    if (nextStep !== step) setStep(nextStep);
    showScreen(nextScreen);
  }

  const vhPerScreen = () => (isMobile() ? 0.38 : 0.48);

  const pin = ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: () => `+=${Math.round(span * vhPerScreen() * window.innerHeight)}`,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => apply(self.progress),
    onRefresh: (self) => {
      apply(self.progress);
      aimAt(step, true);
    },
  });

  btns.forEach((b, s) =>
    b.addEventListener("click", () => {
      const p = (start[s]! + 0.05) / span;
      const top = pin.start + p * (pin.end - pin.start);
      window.scrollTo({ top: Math.ceil(top), behavior: reduce ? "auto" : "smooth" });
    }),
  );

  /* ---------------- entry + idle ---------------- */

  if (!reduce) {
    const entry = { trigger: root, start: "top bottom", end: "top top" };
    gsap.fromTo(phone, { y: 90, scale: 0.92 }, { y: 0, scale: 1, ease: "none", scrollTrigger: { ...entry, scrub: 0.6 } });
    gsap.fromTo(
      reticle,
      { scale: 0.7, rotation: -30, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, ease: "none", scrollTrigger: { ...entry, scrub: 0.8 } },
    );
    gsap.fromTo(
      words,
      { yPercent: 40, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { ...entry, start: "top 80%", scrub: 0.6 } },
    );

    const drift = gsap.to(retOuter, {
      rotation: 360,
      svgOrigin: "500 500",
      duration: 140,
      repeat: -1,
      ease: "none",
      paused: true,
    });
    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? drift.play() : drift.pause()),
    });
  }

  // videos only run while the section is on screen
  ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      sectionOn = self.isActive;
      syncVideos();
    },
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? videos.forEach((v) => v?.pause()) : syncVideos()));
  if (reduce) videos.forEach((v) => v && (v.controls = true));

  /* ---------------- boot ---------------- */

  setStep(0, true);
  apply(0);

  // details only live on desktop; reset them when crossing the breakpoint
  window.matchMedia(MOBILE).addEventListener("change", () => {
    gsap.set(details, { clearProps: "height" });
    if (!isMobile()) setStep(step, true);
  });

  fontsReady().then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
