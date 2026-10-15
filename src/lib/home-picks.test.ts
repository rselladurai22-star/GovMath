import { describe, expect, it } from "vitest";
import { POPULAR_EVERYDAY, POPULAR_UK, POPULAR_US, pick } from "./home-picks";

describe("home page picks", () => {
  it("lists live calculators from the right country, each once", () => {
    for (const [hrefs, country] of [
      [POPULAR_UK, "uk"],
      [POPULAR_US, "us"],
      [POPULAR_EVERYDAY, "global"],
    ] as const) {
      expect(pick(hrefs).map((c) => c.country)).toEqual(hrefs.map(() => country));
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });

  it("refuses a path with no calculator", () => {
    expect(() => pick(["/uk/no-such-page"])).toThrow();
  });
});
