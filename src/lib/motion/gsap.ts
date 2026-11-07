import { gsap } from "gsap";

gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap };

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Resolve once web fonts are ready (or after `timeout` ms, whichever first). */
export const fontsReady = (timeout = 1200) =>
  Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise<void>((resolve) => setTimeout(resolve, timeout)),
  ]).catch(() => undefined);
