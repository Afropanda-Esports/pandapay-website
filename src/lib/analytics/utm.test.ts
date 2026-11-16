import { describe, expect, test } from "bun:test";
import { UTM_STORAGE_KEY, loadUtm, readUtm } from "./utm";

const memory = () => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    m,
  };
};

describe("utm", () => {
  test("reads only the five utm_* keys", () => {
    expect(readUtm("?utm_source=linkedin&utm_campaign=week1&fbclid=x&ref=y")).toEqual({
      utm_source: "linkedin",
      utm_campaign: "week1",
    });
  });

  test("no utm → empty object", () => {
    expect(readUtm("")).toEqual({});
  });

  test("without consent nothing is written to storage", () => {
    const s = memory();
    expect(loadUtm("?utm_source=x", null, s)).toEqual({ utm_source: "x" });
    expect(loadUtm("?utm_source=x", "denied", s)).toEqual({ utm_source: "x" });
    expect(s.m.size).toBe(0);
  });

  test("with consent the landing utm is kept for later pages in the session", () => {
    const s = memory();
    loadUtm("?utm_source=linkedin", "granted", s);
    expect(s.m.get(UTM_STORAGE_KEY)).toBe(JSON.stringify({ utm_source: "linkedin" }));
    expect(loadUtm("", "granted", s)).toEqual({ utm_source: "linkedin" });
  });

  test("stored utm is ignored without consent", () => {
    const s = memory();
    s.setItem(UTM_STORAGE_KEY, JSON.stringify({ utm_source: "old" }));
    expect(loadUtm("", "denied", s)).toEqual({});
  });
});
