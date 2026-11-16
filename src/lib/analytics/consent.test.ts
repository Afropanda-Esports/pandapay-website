import { describe, expect, test } from "bun:test";
import { CONSENT_KEY, readConsent, shouldShowBanner, writeConsent } from "./consent";

const memory = () => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    m,
  };
};

describe("consent", () => {
  test("unset → null, banner shown when analytics enabled", () => {
    const s = memory();
    expect(readConsent(s)).toBeNull();
    expect(shouldShowBanner(true, readConsent(s))).toBe(true);
  });

  test("banner never shown when analytics is disabled (no key)", () => {
    expect(shouldShowBanner(false, null)).toBe(false);
  });

  test("granted and denied persist and hide the banner", () => {
    const s = memory();
    writeConsent(s, "granted");
    expect(s.m.get(CONSENT_KEY)).toBe("granted");
    expect(readConsent(s)).toBe("granted");
    expect(shouldShowBanner(true, readConsent(s))).toBe(false);
    writeConsent(s, "denied");
    expect(readConsent(s)).toBe("denied");
  });

  test("garbage value is treated as unset", () => {
    const s = memory();
    s.setItem(CONSENT_KEY, "maybe");
    expect(readConsent(s)).toBeNull();
  });

  test("storage unavailable or throwing never throws", () => {
    expect(readConsent(null)).toBeNull();
    const throwing = {
      getItem: () => { throw new Error("blocked"); },
      setItem: () => { throw new Error("blocked"); },
      removeItem: () => { throw new Error("blocked"); },
    };
    expect(readConsent(throwing)).toBeNull();
    expect(() => writeConsent(throwing, "granted")).not.toThrow();
  });
});
