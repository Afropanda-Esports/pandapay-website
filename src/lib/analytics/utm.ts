import type { Consent, KeyValueStorage } from "./consent";

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Campaign tags kept for the rest of the session, only after consent. */
export const UTM_STORAGE_KEY = "panda_utm";

export function readUtm(search: string): Utm {
  const params = new URLSearchParams(search);
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

/**
 * UTMs for this page. The URL always wins. Without consent nothing is read from or written to
 * storage, so tags live only in memory for the current page.
 */
export function loadUtm(search: string, consent: Consent, storage: KeyValueStorage | null): Utm {
  const fromUrl = readUtm(search);
  if (consent !== "granted" || !storage) return fromUrl;
  try {
    if (Object.keys(fromUrl).length) {
      storage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(storage.getItem(UTM_STORAGE_KEY) || "{}") as Utm;
  } catch {
    return fromUrl;
  }
}

export function clearUtm(storage: KeyValueStorage | null): void {
  try {
    storage?.removeItem(UTM_STORAGE_KEY);
  } catch {
    // ignore
  }
}
