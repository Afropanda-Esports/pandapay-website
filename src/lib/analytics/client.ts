/**
 * Browser entry for analytics. Imported once from base-layout.astro.
 *
 * Two tiers (MKT-007, MKT-009, MKT-010):
 *  - before a choice / after Decline: PostHog cookieless page views and anonymous named-event counts
 *    (ANONYMOUS_EVENTS, page-context props only; no ref, no identify);
 *  - after Accept: cookies allowed and every named event sent with full props.
 * dataLayer always receives named events (vendor-neutral, landing-page-spec §8).
 */
import { readConsent, safeStorage, shouldShowBanner, writeConsent, type Consent } from "./consent";
import { posthogConfig, installPostHogStub, type PostHogClient } from "./posthog";
import { createTracker, datasetToEvent } from "./track";
import { clearUtm, loadUtm, type Utm } from "./utm";

const KEY = import.meta.env.PUBLIC_POSTHOG_PROJECT_TOKEN as string | undefined;
const HOST = import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined;
const enabled = Boolean(KEY && HOST);

const local = safeStorage("localStorage");
const session = safeStorage("sessionStorage");
let consent: Consent = readConsent(local);
let utm: Utm = loadUtm(window.location.search, consent, session);
let posthog: PostHogClient | undefined;

const tracker = createTracker({
  dataLayer: () => {
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    return (w.dataLayer ??= []);
  },
  posthog: () => posthog,
  consent: () => consent,
  utm: () => utm,
});

export const track = tracker.track;

function startPostHog() {
  if (!enabled || posthog) return;
  try {
    posthog = installPostHogStub();
    posthog.init(KEY!, posthogConfig(HOST!, () => consent));
    if (consent === "granted") posthog.opt_in_capturing();
    else if (consent === "denied") posthog.opt_out_capturing();
  } catch {
    posthog = undefined;
  }
}

function setConsent(value: "granted" | "denied") {
  consent = value;
  writeConsent(local, value);
  if (value === "granted") {
    utm = loadUtm(window.location.search, consent, session);
    posthog?.opt_in_capturing();
  } else {
    clearUtm(session);
    posthog?.opt_out_capturing();
  }
  setBannerVisible(false);
}

function setBannerVisible(visible: boolean) {
  const banner = document.querySelector<HTMLElement>("[data-consent-banner]");
  if (!banner) return;
  banner.hidden = !visible;
  if (visible) banner.querySelector<HTMLElement>("[data-consent='accept']")?.focus({ preventScroll: true });
}

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const choice = target.closest<HTMLElement>("[data-consent]")?.dataset.consent;
  if (choice === "accept") return setConsent("granted");
  if (choice === "decline") return setConsent("denied");
  if (enabled && target.closest("[data-consent-open]")) {
    event.preventDefault(); // without analytics the link just opens the privacy policy
    return setBannerVisible(true);
  }

  const trackEl = target.closest<HTMLElement>("[data-track]");
  const named = trackEl ? datasetToEvent(trackEl.dataset) : null;
  if (named) track(named.event, named.props);

  const wa = target.closest<HTMLAnchorElement>('a[href*="wa.me"]');
  if (wa) {
    track("checkout_handoff", {
      href: wa.href,
      destination: "whatsapp",
      location: wa.dataset.location ?? trackEl?.dataset.location,
    });
  }

  // FAQ opened by the visitor (not the item that starts open on page load). Checked on the summary
  // click because the FAQ script animates and sets `open` after the click.
  const details = target.closest("summary")?.parentElement;
  if (details instanceof HTMLDetailsElement && details.dataset.question && !details.open) {
    track("faq_open", { question: details.dataset.question });
  }
}

export function startAnalytics() {
  document.addEventListener("click", onClick);
  setBannerVisible(shouldShowBanner(enabled, consent));

  // Load PostHog after the page has finished, so it never competes with first paint.
  const idle = (cb: () => void) =>
    "requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 3000 }) : setTimeout(cb, 1);
  if (document.readyState === "complete") idle(startPostHog);
  else window.addEventListener("load", () => idle(startPostHog), { once: true });
}
