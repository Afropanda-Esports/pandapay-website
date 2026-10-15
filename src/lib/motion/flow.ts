import { gsap, ScrollTrigger, reduced } from "./gsap";

export function initFlow(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>("[data-flow-stage]");
  if (!stage) return;

  const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
  const fill = root.querySelector<HTMLElement>("[data-rail-fill]");
  const progressSegs = [
    ...root.querySelectorAll<HTMLElement>("[data-progress-seg]"),
  ];
  const tabs = [...root.querySelectorAll<HTMLButtonElement>("[role=tab]")];

  let service = "playstation";
  let current = -1;

  const screens = () =>
    [
      ...root.querySelectorAll<HTMLElement>(
        `[data-screens="${service}"] [data-screen]`,
      ),
    ];

  const setStep = (i: number, force = false) => {
    if (i === current && !force) return;
    current = i;
    steps.forEach((s, k) => {
      s.toggleAttribute("data-active", k === i);
      const btn = s.querySelector("button");
      if (btn) {
        if (k === i) btn.setAttribute("aria-current", "step");
        else btn.removeAttribute("aria-current");
      }
    });
    progressSegs.forEach((seg, k) =>
      seg.toggleAttribute("data-active", k <= i),
    );
    screens().forEach((s, k) =>
      gsap.to(s, {
        autoAlpha: k === i ? 1 : 0,
        duration: reduced() ? 0 : 0.35,
        overwrite: true,
      }),
    );
  };

  const selectService = (next: string, tab: HTMLButtonElement) => {
    service = next;
    root
      .querySelectorAll<HTMLElement>("[data-screens]")
      .forEach((g) => (g.hidden = g.dataset.screens !== service));
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    setStep(Math.max(0, current), true);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () =>
      selectService(tab.dataset.service!, tab),
    );
    tab.addEventListener("keydown", (event) => {
      const i = tabs.indexOf(tab);
      let next = -1;
      if (event.key === "ArrowRight" || event.key === "ArrowDown")
        next = (i + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp")
        next = (i - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next < 0) return;
      event.preventDefault();
      tabs[next]?.focus();
      selectService(tabs[next]!.dataset.service!, tabs[next]!);
    });
  });

  if (reduced()) {
    root.classList.add("flow--reduced");
    setStep(0);
    steps.forEach((s, i) =>
      s.querySelector("button")?.addEventListener("click", () => setStep(i)),
    );
    return;
  }

  const st = ScrollTrigger.create({
    trigger: stage,
    start: () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-h")
        .trim();
      return `top top+=${raw || "4.75rem"}`;
    },
    end: () => "+=" + window.innerHeight * steps.length * 0.6,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (fill) gsap.set(fill, { scaleY: self.progress });
      setStep(
        Math.min(steps.length - 1, Math.floor(self.progress * steps.length)),
      );
    },
  });

  steps.forEach((s, i) =>
    s.querySelector("button")?.addEventListener("click", () =>
      window.scrollTo({
        top: st.start + ((st.end - st.start) * (i + 0.5)) / steps.length,
        behavior: "smooth",
      }),
    ),
  );

  setStep(0);
}
