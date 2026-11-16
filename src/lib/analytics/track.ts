import type { Consent } from "./consent";
import type { Utm } from "./utm";

type Props = Record<string, unknown>;

export interface Capturer {
  capture: (event: string, properties?: Props) => void;
}

interface TrackerDeps {
  dataLayer: () => Props[];
  posthog: () => Capturer | undefined;
  consent: () => Consent;
  utm: () => Utm;
}

/**
 * One call site for every named event (landing-page-spec §8).
 * `dataLayer` stays vendor-neutral and always receives the event; PostHog only after consent.
 */
export function createTracker(deps: TrackerDeps) {
  return {
    track(event: string, props: Props = {}) {
      const payload = { ...props, ...deps.utm() };
      deps.dataLayer().push({ event, ...payload });
      if (deps.consent() !== "granted") return;
      try {
        deps.posthog()?.capture(event, payload);
      } catch {
        // PostHog blocked or failed: never break the page.
      }
    },
  };
}

/** `data-track="x" data-location="hero"` → { event: "x", props: { location: "hero" } } */
export function datasetToEvent(dataset: DOMStringMap): { event: string; props: Record<string, string> } | null {
  const { track, ...rest } = dataset;
  if (!track) return null;
  const props: Record<string, string> = {};
  for (const [k, v] of Object.entries(rest)) if (v !== undefined) props[k] = v;
  return { event: track, props };
}
