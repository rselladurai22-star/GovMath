import { describe, expect, it } from "vitest";
import { deputyCost, giftTaperRelief, IHT_DEFAULT as D, inheritanceTax2026 as iht, lpaFee2026, probateFee2026 } from "./estate";

describe("Inheritance Tax 2026/27", () => {
  it("no tax within the nil-rate bands", () => {
    expect(iht({ ...D, home: 400_000, otherAssets: 100_000 }).total).toBe(0);
  });
  it("40% above both bands", () => {
    const r = iht({ ...D, home: 400_000, otherAssets: 300_000 });
    expect(r.taxable).toBe(200_000);
    expect(r.total).toBe(80_000);
  });
  it("RNRB is capped at the home value and lost if not to descendants", () => {
    expect(iht({ ...D, home: 100_000, otherAssets: 500_000 }).rnrb).toBe(100_000);
    expect(iht({ ...D, home: 400_000, otherAssets: 300_000, homeToDescendants: false }).total).toBe(150_000);
  });
  it("tapers the RNRB above £2m", () => {
    const r = iht({ ...D, home: 1_000_000, otherAssets: 1_200_000 });
    expect(r.taperLost).toBe(100_000);
    expect(r.rnrb).toBe(75_000);
  });
  it("transfers a late spouse's bands", () => {
    const r = iht({ ...D, home: 500_000, otherAssets: 500_000, transferPct: 100 });
    expect(r.nrb).toBe(650_000);
    expect(r.rnrb).toBe(350_000);
    expect(r.total).toBe(0);
  });
  it("spouse gifts are exempt", () => {
    expect(iht({ ...D, home: 500_000, otherAssets: 2_000_000, toSpouse: 2_500_000 }).total).toBe(0);
  });
  it("36% rate with 10% to charity", () => {
    const r = iht({ ...D, otherAssets: 1_325_000, homeToDescendants: false, toCharity: 100_000 });
    expect(r.baseline).toBe(1_000_000);
    expect(r.charityRateApplies).toBe(true);
    expect(r.total).toBeCloseTo(900_000 * 0.36, 6);
  });
  it("gifts use the nil-rate band first", () => {
    const r = iht({ ...D, otherAssets: 500_000, homeToDescendants: false, gifts: 200_000, giftYearsAgo: 2 });
    expect(r.nrbForEstate).toBe(125_000);
    expect(r.total).toBe(150_000);
  });
  it("taper relief on a gift above the band", () => {
    expect(giftTaperRelief(4.5)).toBe(0.4);
    const r = iht({ ...D, gifts: 425_000, giftYearsAgo: 4.5 });
    expect(r.giftTax).toBeCloseTo(100_000 * 0.4 * 0.6, 6);
  });
  it("business relief: 100% to £2.5m, 50% above", () => {
    const r = iht({ ...D, businessProperty: 3_500_000, homeToDescendants: false });
    expect(r.businessRelief).toBe(3_000_000);
    expect(r.total).toBe((500_000 - 325_000) * 0.4);
  });
  it("pensions count only from April 2027", () => {
    expect(iht({ ...D, pension: 400_000 }).total).toBe(0);
    expect(iht({ ...D, pension: 400_000, pensionsCount: true, homeToDescendants: false }).total).toBe(30_000);
  });
});

describe("probate and LPA fees", () => {
  it("probate", () => {
    expect(probateFee2026(5_000, 0).total).toBe(0);
    expect(probateFee2026(200_000, 3).total).toBe(532);
    expect(probateFee2026(200_000, 0, 2).later).toBe(32);
  });
  it("LPA", () => {
    expect(lpaFee2026(4, "none").total).toBe(368);
    expect(lpaFee2026(2, "reduction").total).toBe(92);
    expect(lpaFee2026(2, "exemption").total).toBe(0);
  });
});

describe("deputyship", () => {
  it("adds yearly supervision", () => {
    expect(deputyCost(1)).toBe(852);
    expect(deputyCost(5)).toBe(432 + 100 + 1600);
  });
});
