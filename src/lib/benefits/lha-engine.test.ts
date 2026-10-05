import { describe, expect, it } from "vitest";
import { bedroomEntitlement, childBedrooms, lhaHelp, lhaMonthly, lhaNation, lhaWeekly, LHA_AREAS, LHA_AREAS_BY_NATION } from "./lha-engine";

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
  it("has 152 English, 18 Scottish and 22 Welsh areas", () => {
    expect(LHA_AREAS_BY_NATION.england.length).toBe(152);
    expect(LHA_AREAS_BY_NATION.scotland.length).toBe(18);
    expect(LHA_AREAS_BY_NATION.wales.length).toBe(22);
    expect(LHA_AREAS_BY_NATION.ni.length).toBe(8);
    expect(new Set(LHA_AREAS).size).toBe(200);
  });
  it("Scottish and Welsh weekly rates", () => {
    expect(lhaWeekly("Greater Glasgow", "1")).toBe(159.95);
    expect(lhaWeekly("Lothian", "4")).toBe(501.7);
    expect(lhaWeekly("Cardiff", "2")).toBe(189.86);
    expect(lhaWeekly("Flintshire", "shared")).toBe(87.5);
    expect(lhaNation("Cardiff")).toBe("wales");
    expect(lhaNation("Fife")).toBe("scotland");
    expect(lhaNation("Bristol")).toBe("england");
    expect(lhaWeekly("Nowhere", "1")).toBe(0);
  });
  it("Northern Ireland weekly and Universal Credit monthly rates", () => {
    expect(lhaNation("Belfast")).toBe("ni");
    expect(lhaWeekly("South East", "4")).toBe(199.12);
    expect(lhaWeekly("South West", "1")).toBe(88.68);
    // The Housing Executive's published Belfast monthly rates.
    expect((["shared", "1", "2", "3", "4"] as const).map((c) => lhaMonthly("Belfast", c))).toEqual([329.15, 605.47, 676.86, 752.07, 954.91]);
  });
  it("Universal Credit uses the published monthly rates", () => {
    expect(lhaMonthly("Bristol", "1")).toBe(900);
    expect(lhaMonthly("Cardiff", "1")).toBe(650);
    expect(lhaMonthly("West Lothian", "4")).toBe(1112.5);
    // Every area has a monthly rate within £10 of its weekly rate × 52 ÷ 12.
    for (const a of LHA_AREAS)
      for (const c of ["shared", "1", "2", "3", "4"] as const) expect(Math.abs(lhaMonthly(a, c) - (lhaWeekly(a, c) * 52) / 12)).toBeLessThan(10);
  });
  it("help uses the monthly rate when given", () => {
    const r = lhaHelp(207.12, 900, 0, 900);
    expect(r.monthlyShortfall).toBe(0);
    expect(r.monthlyHelp).toBe(900);
  });
  it("Ashford 2 bedrooms", () => expect(lhaWeekly("Ashford", "2")).toBe(195.62));
  it("monthly help and shortfall", () => {
    const r = lhaHelp(195.62, 1000);
    expect(r.monthlyRate).toBeCloseTo((195.62 * 52) / 12, 6);
    expect(r.monthlyShortfall).toBeCloseTo(1000 - (195.62 * 52) / 12, 6);
  });
});
