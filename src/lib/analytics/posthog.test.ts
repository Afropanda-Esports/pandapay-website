import { describe, expect, test } from "bun:test";
import { allowEvent, ANONYMOUS_EVENTS, anonymousProps, posthogConfig } from "./posthog";

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

  test("before a choice or after decline only anonymous events are sent", () => {
    for (const c of [null, "denied"] as const) {
      for (const e of ["$pageview", "$pageleave", "cta_primary", "cta_faq", "cta_platform", "cta_lifestyle", "cta_utility", "faq_ask", "faq_open", "checkout_handoff"]) {
        expect(allowEvent(e, c)).toBe(true);
      }
      expect(allowEvent("$identify", c)).toBe(false);
      expect(allowEvent("$exception", c)).toBe(false);
      expect(allowEvent("$opt_in", c)).toBe(false);
      expect(allowEvent("custom_event", c)).toBe(false);
    }
  });

  test("anonymous event list is exactly the site's named events plus page views/leaves", () => {
    expect([...ANONYMOUS_EVENTS].sort()).toEqual(
      ["$pageleave", "$pageview", "checkout_handoff", "cta_faq", "cta_lifestyle", "cta_platform", "cta_primary", "cta_utility", "faq_ask", "faq_open"],
    );
  });

  test("anonymousProps keeps only context and campaign tags", () => {
    expect(
      anonymousProps({
        location: "hero",
        question: "Is it safe?",
        destination: "whatsapp",
        href: "https://wa.me/2348000000000?text=Hi",
        utm_source: "linkedin",
        utm_campaign: "launch",
        ref: "PP-ABC123",
        email: "a@b.c",
        $set: { name: "x" },
      }),
    ).toEqual({
      location: "hero",
      question: "Is it safe?",
      destination: "whatsapp",
      href: "https://wa.me/2348000000000?text=Hi",
      utm_source: "linkedin",
      utm_campaign: "launch",
    });
  });

  test("after accept every event is allowed", () => {
    expect(allowEvent("cta_primary", "granted")).toBe(true);
  });

  test("before_send drops disallowed events using the live consent value", () => {
    let consent: "granted" | "denied" | null = null;
    const cfg = posthogConfig("https://eu.i.posthog.com", () => consent);
    const ev = { event: "custom_event", properties: {} };
    expect(cfg.before_send(ev)).toBeNull();
    consent = "granted";
    expect(cfg.before_send(ev)).toEqual(ev);
    expect(cfg.before_send(null)).toBeNull();
  });
});
