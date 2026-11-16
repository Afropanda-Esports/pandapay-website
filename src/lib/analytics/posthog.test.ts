import { describe, expect, test } from "bun:test";
import { allowEvent, posthogConfig } from "./posthog";

describe("posthog config", () => {
  test("cookieless until opt-in; no autocapture, replay or exception capture", () => {
    const cfg = posthogConfig("https://eu.i.posthog.com", () => null);
    expect(cfg.api_host).toBe("https://eu.i.posthog.com");
    expect(cfg.cookieless_mode).toBe("on_reject");
    expect(cfg.opt_out_capturing_by_default).toBe(true);
    expect(cfg.autocapture).toBe(false);
    expect(cfg.disable_session_recording).toBe(true);
    expect(cfg.person_profiles).toBe("identified_only");
    expect(cfg.capture_exceptions).toBe(false);
  });

  test("before a choice or after decline only page views/leaves are sent", () => {
    for (const c of [null, "denied"] as const) {
      expect(allowEvent("$pageview", c)).toBe(true);
      expect(allowEvent("$pageleave", c)).toBe(true);
      expect(allowEvent("cta_primary", c)).toBe(false);
      expect(allowEvent("$identify", c)).toBe(false);
      expect(allowEvent("$exception", c)).toBe(false);
    }
  });

  test("after accept every event is allowed", () => {
    expect(allowEvent("cta_primary", "granted")).toBe(true);
  });

  test("before_send drops disallowed events using the live consent value", () => {
    let consent: "granted" | "denied" | null = null;
    const cfg = posthogConfig("https://eu.i.posthog.com", () => consent);
    const ev = { event: "cta_primary", properties: {} };
    expect(cfg.before_send(ev)).toBeNull();
    consent = "granted";
    expect(cfg.before_send(ev)).toEqual(ev);
    expect(cfg.before_send(null)).toBeNull();
  });
});
