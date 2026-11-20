import { describe, expect, mock, test } from "bun:test";
import type { Consent } from "./consent";
import { createTracker, datasetToEvent } from "./track";

const setup = (consent: Consent, withPostHog = true) => {
  const dataLayer: Record<string, unknown>[] = [];
  const capture = mock((_e: string, _p?: Record<string, unknown>) => {});
  const tracker = createTracker({
    dataLayer: () => dataLayer,
    posthog: () => (withPostHog ? { capture } : undefined),
    consent: () => consent,
    utm: () => ({ utm_source: "linkedin" }),
  });
  return { dataLayer, capture, tracker };
};

describe("track", () => {
  test("always pushes to dataLayer with utm", () => {
    const { dataLayer, tracker } = setup(null);
    tracker.track("cta_primary", { location: "hero" });
    expect(dataLayer).toEqual([{ event: "cta_primary", location: "hero", utm_source: "linkedin" }]);
  });

  test("before a choice or after decline, anonymous events reach PostHog with anonymous props only", () => {
    for (const c of [null, "denied"] as Consent[]) {
      const { capture, tracker } = setup(c);
      tracker.track("checkout_handoff", { location: "hero", destination: "whatsapp", ref: "PP-ABC123", email: "a@b.c" });
      expect(capture).toHaveBeenCalledWith("checkout_handoff", {
        location: "hero",
        destination: "whatsapp",
        utm_source: "linkedin",
      });
    }
  });

  test("before a choice or after decline, events off the anonymous list never reach PostHog", () => {
    for (const c of [null, "denied"] as Consent[]) {
      const { capture, dataLayer, tracker } = setup(c);
      tracker.track("x", { location: "hero" });
      expect(capture).not.toHaveBeenCalled();
      expect(dataLayer).toHaveLength(1);
    }
  });

  test("after accept every event reaches PostHog with all props", () => {
    const { capture, tracker } = setup("granted");
    tracker.track("cta_primary", { location: "hero", ref: "PP-ABC123" });
    expect(capture).toHaveBeenCalledWith("cta_primary", { location: "hero", ref: "PP-ABC123", utm_source: "linkedin" });
  });

  test("PostHog missing (blocked) never throws", () => {
    const { tracker } = setup("granted", false);
    expect(() => tracker.track("cta_primary")).not.toThrow();
  });

  test("datasetToEvent drops the track key, keeps context", () => {
    expect(datasetToEvent({ track: "cta_primary", location: "hero" })).toEqual({
      event: "cta_primary",
      props: { location: "hero" },
    });
    expect(datasetToEvent({ location: "hero" })).toBeNull();
  });
});
