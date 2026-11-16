/**
 * Visitor consent for non-essential analytics (privacy policy §13).
 * The choice itself is strictly necessary storage: without it the banner would reappear on every page.
 */
export type Consent = "granted" | "denied" | null;

export type KeyValueStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const CONSENT_KEY = "panda_consent";

export function readConsent(storage: Pick<Storage, "getItem"> | null): Consent {
  try {
    const value = storage?.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(storage: Pick<Storage, "setItem"> | null, value: "granted" | "denied"): void {
  try {
    storage?.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the banner will simply ask again next visit.
  }
}

export function shouldShowBanner(analyticsEnabled: boolean, consent: Consent): boolean {
  return analyticsEnabled && consent === null;
}

/** localStorage when the browser allows it, otherwise null. */
export function safeStorage(kind: "localStorage" | "sessionStorage"): KeyValueStorage | null {
  try {
    return window[kind];
  } catch {
    return null;
  }
}
