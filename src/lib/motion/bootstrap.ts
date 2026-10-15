import { gsap, ScrollTrigger, reduced, ready } from "./gsap";
import { wrapLines, resetTextSplit } from "./text-splitting";
import { initFlow } from "./flow";

function visibleHeadline(
  selector: string,
): HTMLElement | null {
  const nodes = [
    ...document.querySelectorAll<HTMLElement>(selector),
  ];
  if (!nodes.length) return null;
  return (
    nodes.find((el) => getComputedStyle(el).display !== "none") ?? nodes[0]!
  );
}

function initReveals() {
  if (reduced()) return;

  gsap.set("[data-reveal]", { autoAlpha: 0, y: 24 });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        overwrite: true,
        onComplete: () => {
          els.forEach((el) => {
            (el as HTMLElement).style.visibility = "inherit";
          });
        },
      }),
  });
}

function initNavSections() {
  document.querySelectorAll<HTMLElement>("[data-section]").forEach((section) => {
    const id = section.dataset.section;
    if (!id || id === "footer" || id === "placeholder") return;
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (!self.isActive) return;
        document
          .querySelectorAll<HTMLAnchorElement>("[data-nav-section]")
          .forEach((link) => {
            const match = link.dataset.navSection === id;
            if (match) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
      },
    });
  });
}

function initHero() {
  const headline = visibleHeadline("[data-hero-headline]");
  if (!headline) return;

  if (reduced()) {
    gsap.set(
      "[data-hero-headline], [data-hero-subhead], [data-hero-actions], [data-hero-phone]",
      { clearProps: "all" },
    );
    return;
  }

  let tween: gsap.core.Tween | null = null;

  const splitAndAnimate = (animate: boolean) => {
    const target = visibleHeadline("[data-hero-headline]");
    if (!target) return;
    if (tween) tween.kill();
    gsap.killTweensOf(target.querySelectorAll("[data-motion-unit]"));
    resetTextSplit(target);
    const lines = wrapLines(target);
    if (!lines.length) return;
    if (animate) {
      tween = gsap.from(lines, {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
      });
    } else {
      gsap.set(lines, { yPercent: 0 });
    }
  };

  splitAndAnimate(true);

  gsap.from("[data-hero-subhead], [data-hero-actions]", {
    y: 24,
    autoAlpha: 0,
    duration: 0.7,
    delay: 0.35,
    stagger: 0.08,
  });
  gsap.from("[data-hero-phone]", {
    y: 32,
    autoAlpha: 0,
    duration: 0.9,
    delay: 0.45,
  });

  ScrollTrigger.addEventListener("refreshInit", () => {
    splitAndAnimate(false);
  });
}

function initFinalCta() {
  const finalHeadline = document.querySelector<HTMLElement>(
    "[data-final-headline]",
  );
  const finalMark = document.querySelector<HTMLElement>("[data-final-mark]");
  if (!finalHeadline || reduced()) return;

  let lineTween: gsap.core.Tween | null = null;

  const splitFinal = (animate: boolean) => {
    if (lineTween) lineTween.kill();
    gsap.killTweensOf(finalHeadline.querySelectorAll("[data-motion-unit]"));
    resetTextSplit(finalHeadline);
    const lines = wrapLines(finalHeadline);
    if (!lines.length) return;
    if (animate) {
      lineTween = gsap.from(lines, {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        scrollTrigger: {
          trigger: finalHeadline,
          start: "top 80%",
          once: true,
        },
      });
    } else {
      gsap.set(lines, { yPercent: 0 });
    }
  };

  splitFinal(true);

  if (finalMark) {
    gsap.from(finalMark, {
      scale: 0.92,
      autoAlpha: 0,
      duration: 0.9,
      scrollTrigger: {
        trigger: finalMark,
        start: "top 85%",
        once: true,
      },
    });
  }

  ScrollTrigger.addEventListener("refreshInit", () => {
    splitFinal(false);
  });
}

function initCatalogue() {
  const root = document.querySelector<HTMLElement>("#products");
  if (!root) return;

  let viewed = false;
  ScrollTrigger.create({
    trigger: root,
    start: "top 50%",
    once: true,
    onEnter: () => {
      if (viewed) return;
      viewed = true;
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "catalog_view" });
    },
  });

  if (reduced()) return;

  const pillars = [
    "#pillar-6",
    "#pillar-5",
    "#pillar-1",
    "#pillar-4",
    "#pillar-2",
    "#pillar-3",
  ];
  const targets = pillars
    .map((sel) => root.querySelector(sel))
    .filter(Boolean);

  if (targets.length) {
    gsap.from(targets, {
      yPercent: 60,
      autoAlpha: 0,
      stagger: 0.08,
      ease: "power3.out",
      duration: 0.9,
      scrollTrigger: {
        trigger: root.querySelector(".product__svg") ?? root,
        start: "top 60%",
        once: true,
      },
    });
  }
}

export function bootstrapMotion() {
  ready(() => {
    initReveals();
    initNavSections();
    initHero();
    initCatalogue();

    const flow = document.querySelector<HTMLElement>("[data-flow]");
    if (flow) initFlow(flow);

    initFinalCta();
  });
}
