import { describe, expect, it } from "vitest";
import { councilTaxReduction, ctrNonDep, hbNonDep, housingBenefit, meansTest, tariffIncome, weeklyFromAnnual, type MeansInput } from "./housing-support";
import { lhaWeekly } from "./lha-engine";

const base: MeansInput = {
  age: "pension",
  couple: false,
  under25: false,
  olderPensioner: false,
  children: 0,
  disabledChildren: 0,
  enhancedDisabledChildren: 0,
  disability: "none",
  severe: false,
  carer: false,
  passported: false,
  earnings: 0,
  otherIncome: 0,
  childcare: 0,
  fullTime: false,
  savings: 0,
};

describe("means test", () => {
  it("uses the 2026/27 personal allowances", () => {
    expect(meansTest(base).applicableAmount).toBe(238);
    expect(meansTest({ ...base, olderPensioner: true }).applicableAmount).toBe(256);
    expect(meansTest({ ...base, couple: true }).applicableAmount).toBe(363.25);
    expect(meansTest({ ...base, age: "working" }).applicableAmount).toBe(95.55);
    expect(meansTest({ ...base, age: "working", under25: true }).applicableAmount).toBe(75.65);
    expect(meansTest({ ...base, age: "working", couple: true }).applicableAmount).toBe(150.15);
  });

  it("adds children and premiums", () => {
    const r = meansTest({ ...base, age: "working", children: 2, disabledChildren: 1, disability: "enhanced", carer: true });
    expect(r.applicableAmount).toBeCloseTo(95.55 + 2 * 87.88 + 84.46 + 44.85 + 22 + 48.15, 6);
    // No disability premium for pensioners.
    expect(meansTest({ ...base, disability: "standard" }).applicableAmount).toBe(238);
  });

  it("charges tariff income on savings", () => {
    expect(tariffIncome(6_000, "working")).toBe(0);
    expect(tariffIncome(6_001, "working")).toBe(1);
    expect(tariffIncome(10_000, "working")).toBe(16);
    expect(tariffIncome(10_000, "pension")).toBe(0);
    expect(tariffIncome(12_000, "pension")).toBe(4);
    expect(meansTest({ ...base, savings: 16_001 }).overCapital).toBe(true);
    expect(meansTest({ ...base, savings: 50_000, passported: true }).overCapital).toBe(false);
  });

  it("disregards part of earnings", () => {
    expect(meansTest({ ...base, age: "working", earnings: 200 }).earningsDisregard).toBe(5);
    expect(meansTest({ ...base, age: "working", couple: true, earnings: 200 }).earningsDisregard).toBe(10);
    expect(meansTest({ ...base, age: "working", children: 1, earnings: 300, fullTime: true, childcare: 250 }).earningsDisregard).toBeCloseTo(25 + 17.1 + 175, 6);
    expect(meansTest({ ...base, age: "working", earnings: 3 }).earningsDisregard).toBe(3);
  });
});

describe("non-dependant deductions", () => {
  it("follow the 2026/27 tables", () => {
    expect(hbNonDep("not-working")).toBe(20.4);
    expect(hbNonDep(191.99)).toBe(20.4);
    expect(hbNonDep(192)).toBe(46.85);
    expect(hbNonDep(400)).toBe(105.2);
    expect(hbNonDep(605)).toBe(131.45);
    expect(hbNonDep("exempt")).toBe(0);
    expect(ctrNonDep("not-working")).toBe(5.2);
    expect(ctrNonDep(300)).toBe(10.6);
    expect(ctrNonDep(700)).toBe(15.95);
  });
});

describe("Housing Benefit", () => {
  const hb = {
    ...base,
    landlord: "social" as const,
    rent: 120,
    ineligible: 0,
    lhaArea: "Bristol",
    lhaCategory: "1" as const,
    lhaOverride: 0,
    spareRooms: 0,
    nonDependants: [],
    noNonDepDeductions: false,
  };

  it("pays the full eligible rent on Pension Credit Guarantee Credit", () => {
    const r = housingBenefit({ ...hb, passported: true, otherIncome: 300 });
    expect(r.weekly).toBe(120);
  });

  it("tapers 65p for each £1 above the applicable amount", () => {
    const r = housingBenefit({ ...hb, otherIncome: 268 });
    expect(r.excess).toBeCloseTo(30, 6);
    expect(r.weekly).toBeCloseTo(120 - 19.5, 6);
  });

  it("limits private rent to the LHA rate", () => {
    const r = housingBenefit({ ...hb, landlord: "private", rent: 400 });
    expect(r.lhaRate).toBe(lhaWeekly("Bristol", "1"));
    expect(r.eligibleRent).toBe(Math.min(400, lhaWeekly("Bristol", "1")));
  });

  it("cuts social rent for spare bedrooms for working-age tenants only", () => {
    expect(housingBenefit({ ...hb, age: "working", passported: true, spareRooms: 1 }).weekly).toBeCloseTo(120 * 0.86, 6);
    expect(housingBenefit({ ...hb, age: "working", passported: true, spareRooms: 2 }).weekly).toBeCloseTo(90, 6);
    expect(housingBenefit({ ...hb, passported: true, spareRooms: 2 }).weekly).toBe(120);
  });

  it("takes off non-dependant deductions unless exempt", () => {
    expect(housingBenefit({ ...hb, passported: true, nonDependants: ["not-working"] }).weekly).toBeCloseTo(99.6, 6);
    expect(housingBenefit({ ...hb, passported: true, nonDependants: ["not-working"], noNonDepDeductions: true }).weekly).toBe(120);
  });

  it("pays nothing above £16,000 savings or below 50p", () => {
    expect(housingBenefit({ ...hb, savings: 20_000 }).weekly).toBe(0);
    expect(housingBenefit({ ...hb, otherIncome: 238 + 120 / 0.65 - 0.5 }).weekly).toBe(0);
  });
});

describe("Council Tax Reduction", () => {
  const ct = { ...base, nation: "england" as const, annualBill: 2_000, maxShare: 0.8, taper: 0.2, nonDependants: [], noNonDepDeductions: false };

  it("works a week as a year × 7 ÷ 365", () => {
    expect(weeklyFromAnnual(365)).toBe(7);
  });

  it("gives pensioners up to the full bill with a 20% taper", () => {
    expect(councilTaxReduction({ ...ct, passported: true }).annual).toBeCloseTo(2_000, 6);
    const r = councilTaxReduction({ ...ct, otherIncome: 288 });
    expect(r.weekly).toBeCloseTo(weeklyFromAnnual(2_000) - 10, 6);
  });

  it("uses the council's maximum and taper for working age in England", () => {
    const r = councilTaxReduction({ ...ct, age: "working", passported: true });
    expect(r.annual).toBeCloseTo(1_600, 6);
    expect(r.national).toBe(false);
  });

  it("uses the national scheme for working age in Wales and Scotland", () => {
    expect(councilTaxReduction({ ...ct, age: "working", nation: "wales", passported: true }).annual).toBeCloseTo(2_000, 6);
    expect(councilTaxReduction({ ...ct, age: "working", nation: "scotland", passported: true }).national).toBe(true);
  });
});
