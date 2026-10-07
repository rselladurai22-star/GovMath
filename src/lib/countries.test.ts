import { describe, expect, it } from "vitest";
import { COUNTRIES, countryForIso, countryForPath } from "./countries";

describe("countries", () => {
  it("maps visitor locations to our countries", () => {
    expect(countryForIso("GB")).toBe("uk");
    expect(countryForIso("in")).toBe("in");
    expect(countryForIso("FR")).toBeUndefined();
    expect(countryForIso(null)).toBeUndefined();
  });

  it("knows which section a page is in", () => {
    expect(countryForPath("/uk")).toBe("uk");
    expect(countryForPath("/uk/benefits/universal-credit")).toBe("uk");
    expect(countryForPath("/")).toBeUndefined();
    expect(countryForPath("/about")).toBeUndefined();
    expect(countryForPath("/us/taxes/paycheck-calculator")).toBe("us");
    // Countries that are not live yet have no section.
    expect(countryForPath("/in/income-tax")).toBeUndefined();
  });

  it("has the UK and US live", () => {
    expect(COUNTRIES.filter((c) => c.live).map((c) => c.code)).toEqual(["uk", "us"]);
  });
});
