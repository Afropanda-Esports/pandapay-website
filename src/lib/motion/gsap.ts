import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap, ScrollTrigger };

export const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run after fonts settle (or after a short timeout if fonts never resolve),
 * so split text and pin distances measure correctly.
 */
export const ready = (fn: () => void) => {
  const run = () =>
    requestAnimationFrame(() => {
      fn();
      ScrollTrigger.refresh();
    });

  const fonts = document.fonts?.ready ?? Promise.resolve();
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 300));

  Promise.race([fonts, timeout]).then(run).catch(run);
};
