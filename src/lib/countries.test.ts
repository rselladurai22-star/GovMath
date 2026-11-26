import { describe, expect, it } from "vitest";
import { COUNTRIES, countryForPath } from "./countries";

describe("countries", () => {
  it("knows which section a page is in", () => {
    expect(countryForPath("/uk")).toBe("uk");
    expect(countryForPath("/uk/benefits/universal-credit")).toBe("uk");
    expect(countryForPath("/")).toBeUndefined();
    expect(countryForPath("/about")).toBeUndefined();
    // The US section is no longer live.
    expect(countryForPath("/us/taxes/paycheck-calculator")).toBeUndefined();
  });

  it("has only the UK live", () => {
    expect(COUNTRIES.filter((c) => c.live).map((c) => c.code)).toEqual(["uk"]);
  });
});
