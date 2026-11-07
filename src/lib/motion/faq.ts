/**
 * FAQ motion.
 *
 *  1. Entry (once, on scroll into view): heading lines rise, the intro and
 *     button fade up, the questions rise in one after another.
 *  2. Opening a question: its card turns black, the + turns into ×, the answer
 *     eases open and its text drifts up into place. The previously open one
 *     closes at the same time, so only one answer is ever open.
 *  3. Closing: the answer eases shut, then the card returns to cream.
 *  Without JS the <details> elements still open and close natively.
 *  Reduced motion: no entry, instant open/close.
 */
import { gsap, reducedMotion, fontsReady } from "./gsap";
import { splitLines } from "./split-lines";

export function initFaq(root: HTMLElement) {
  const reduce = reducedMotion();
  const items = [...root.querySelectorAll<HTMLDetailsElement>("[data-faq-item]")];
  const heading = root.querySelector<HTMLElement>("[data-faq-split]");
  const fades = [...root.querySelectorAll<HTMLElement>("[data-faq-fade]")];
  if (!items.length) return;

  const body = (d: HTMLDetailsElement) => d.querySelector<HTMLElement>("[data-faq-body]")!;
  const inner = (d: HTMLDetailsElement) => d.querySelector<HTMLElement>("[data-faq-inner]")!;

  function open(d: HTMLDetailsElement) {
    d.open = true;
    d.setAttribute("data-open", "");
    if (reduce) return;
    gsap.killTweensOf([body(d), inner(d)]);
    gsap.fromTo(body(d), { height: 0 }, { height: "auto", duration: 0.6, ease: "power3.inOut", clearProps: "height" });
    gsap.fromTo(inner(d), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.12, ease: "power3.out" });
  }

  function close(d: HTMLDetailsElement) {
    d.removeAttribute("data-open");
    if (reduce) {
      d.open = false;
      return;
    }
    gsap.killTweensOf([body(d), inner(d)]);
    gsap.to(inner(d), { autoAlpha: 0, duration: 0.2, ease: "power1.out" });
    gsap.fromTo(
      body(d),
      { height: body(d).offsetHeight },
      {
        height: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          d.open = false;
          gsap.set([body(d), inner(d)], { clearProps: "height,opacity,visibility,transform" });
        },
      },
    );
  }

  items.forEach((d) => {
    d.querySelector("summary")!.addEventListener("click", (e) => {
      e.preventDefault();
      if (d.hasAttribute("data-open")) {
        close(d);
        return;
      }
      items.forEach((o) => o !== d && o.hasAttribute("data-open") && close(o));
      open(d);
    });
  });

  /* ---------------- entry ---------------- */

  if (reduce) return;

  let entered = false;
  let split = false;
  gsap.set([...fades, ...items], { autoAlpha: 0, y: 30 });

  const enter = () => {
    if (entered) return;
    entered = true;
    const lines = heading && split ? [...heading.querySelectorAll<HTMLElement>(".line__inner")] : [];
    const tl = gsap.timeline();
    if (lines.length) tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.06 }, 0);
    tl.to(fades, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.25);
    tl.to(items, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, clearProps: "transform" }, 0.2);
  };

  fontsReady().then(() => {
    if (heading) {
      splitLines(heading);
      split = true;
      if (!entered) gsap.set(heading.querySelectorAll(".line__inner"), { yPercent: 110 });
    }
    new IntersectionObserver(
      (entries, io) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        enter();
      },
      { threshold: 0.2 },
    ).observe(root);
  });

  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastW || !heading || !split) return;
    lastW = window.innerWidth;
    splitLines(heading);
    if (entered) gsap.set(heading.querySelectorAll(".line__inner"), { yPercent: 0 });
  });
}
