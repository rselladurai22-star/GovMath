import { describe, expect, it } from "vitest";
import { bedroomEntitlement, childBedrooms, lhaHelp, lhaWeekly, LHA_AREAS } from "./lha-engine";

const none = { boysUnder10: 0, girlsUnder10: 0, boys10to15: 0, girls10to15: 0 };
const base = { couple: false, under35: false, sharedExempt: false, otherAdults: 0, children: none, overnightCarer: false, disabledChildrenOwnRoom: 0 };

describe("child bedrooms", () => {
  it("two under-10s of either sex share", () => expect(childBedrooms({ ...none, boysUnder10: 1, girlsUnder10: 1 })).toBe(1));
  it("a boy and girl aged 12 and 13 need two rooms", () => expect(childBedrooms({ ...none, boys10to15: 1, girls10to15: 1 })).toBe(2));
  it("older boy shares with younger brother", () => expect(childBedrooms({ ...none, boys10to15: 1, boysUnder10: 1, girlsUnder10: 1 })).toBe(2));
  it("three girls: two 10-15, one under 10", () => expect(childBedrooms({ ...none, girls10to15: 2, girlsUnder10: 1 })).toBe(2));
});

describe("bedroom entitlement", () => {
  it("single under 35: shared rate", () => expect(bedroomEntitlement({ ...base, under35: true }).category).toBe("shared"));
  it("exempt single under 35: one bedroom", () => expect(bedroomEntitlement({ ...base, under35: true, sharedExempt: true }).category).toBe("1"));
  it("couple with a boy 12 and girl 8: three bedrooms", () => {
    expect(bedroomEntitlement({ ...base, couple: true, children: { ...none, boys10to15: 1, girlsUnder10: 1 } }).category).toBe("3");
  });
  it("caps at four", () => {
    const r = bedroomEntitlement({ ...base, couple: true, otherAdults: 2, children: { ...none, boys10to15: 1, girls10to15: 1 } });
    expect(r.rooms).toBe(5);
    expect(r.category).toBe("4");
    expect(r.overCap).toBe(true);
  });
  it("disabled child who cannot share", () => {
    expect(bedroomEntitlement({ ...base, couple: true, children: { ...none, boysUnder10: 2 }, disabledChildrenOwnRoom: 1 }).rooms).toBe(3);
  });
});

describe("LHA rates", () => {
  it("has the 152 English areas", () => expect(LHA_AREAS.length).toBe(152));
  it("Ashford 2 bedrooms", () => expect(lhaWeekly("Ashford", "2")).toBe(195.62));
  it("monthly help and shortfall", () => {
    const r = lhaHelp(195.62, 1000);
    expect(r.monthlyRate).toBeCloseTo((195.62 * 52) / 12, 6);
    expect(r.monthlyShortfall).toBeCloseTo(1000 - (195.62 * 52) / 12, 6);
  });
});
