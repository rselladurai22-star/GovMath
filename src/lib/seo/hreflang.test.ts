import { describe, expect, it } from "vitest";
import { CALCULATORS } from "../calculators";
import { HREFLANG_PAIRS, alternatesFor, hreflangFor } from "./hreflang";

describe("hreflang pairs", () => {
  const live = new Map(CALCULATORS.map((c) => [c.href, c.country]));

  it("pairs a live UK page with a live US page", () => {
    for (const [uk, us] of HREFLANG_PAIRS) {
      expect(live.get(uk), uk).toBe("uk");
      expect(live.get(us), us).toBe("us");
    }
  });

  it("uses each page in one pair only", () => {
    const paths = HREFLANG_PAIRS.flat();
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives both pages of a pair the same reciprocal tags, including themselves", () => {
    for (const [uk, us] of HREFLANG_PAIRS) {
      const tags = { "en-GB": uk, "en-US": us };
      expect(hreflangFor(uk)).toEqual(tags);
      expect(hreflangFor(us)).toEqual(tags);
      expect(alternatesFor(us)).toEqual({ canonical: us, languages: tags });
    }
  });

  it("links the country homes with / as the default", () => {
    const tags = { "en-GB": "/uk", "en-US": "/us", "x-default": "/" };
    expect(hreflangFor("/uk")).toEqual(tags);
    expect(hreflangFor("/us")).toEqual(tags);
    expect(hreflangFor("/")).toEqual(tags);
  });

  it("leaves pages without a twin alone", () => {
    expect(alternatesFor("/everyday/bmi-calculator")).toEqual({ canonical: "/everyday/bmi-calculator" });
    expect(hreflangFor("/uk/business/vat-calculator")).toBeUndefined();
  });
});
