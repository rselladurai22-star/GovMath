import { describe, expect, it } from "vitest";
import { capitalTariff, housingElement, UC_DEFAULT_INPUT, universalCredit2026 } from "./uc-engine";

const uc = (x: Partial<typeof UC_DEFAULT_INPUT>) => universalCredit2026({ ...UC_DEFAULT_INPUT, ...x });

describe("Universal Credit 2026/27", () => {
  it("single 25+ with no income", () => {
    expect(uc({}).award).toBeCloseTo(424.9, 6);
  });
  it("every child counts: no two-child limit", () => {
    const r = uc({ couple: true, children: 3 });
    expect(r.maximum).toBeCloseTo(666.97 + 3 * 303.94, 6);
  });
  it("work allowance and 55% taper", () => {
    const r = uc({ children: 1, earnings: 1500, tenure: "private", rent: 800, lhaMonthly: 700 });
    expect(r.workAllowance).toBe(427);
    expect(r.housing).toBe(700);
    expect(r.earningsDeduction).toBeCloseTo((1500 - 427) * 0.55, 6);
    expect(r.housingShortfall).toBe(100);
  });
  it("childcare at 85% capped", () => {
    expect(uc({ children: 1, childcare: 2000, earnings: 1000 }).childcareElement).toBeCloseTo(1071.09, 6);
    expect(uc({ children: 2, childcare: 1000, earnings: 1000 }).childcareElement).toBeCloseTo(850, 6);
  });
  it("capital tariff and limit", () => {
    expect(capitalTariff(6000).deduction).toBe(0);
    expect(capitalTariff(6001).deduction).toBeCloseTo(4.35, 6);
    expect(capitalTariff(10000).deduction).toBeCloseTo(16 * 4.35, 6);
    expect(capitalTariff(16001).tooHigh).toBe(true);
  });
  it("social rent with one spare bedroom", () => {
    const h = housingElement({ tenure: "social", rent: 500, lhaMonthly: 0, spareBedrooms: 1, nonDependants: 0 });
    expect(h.housing).toBeCloseTo(430, 6);
  });
  it("benefit cap for a large family outside London", () => {
    const r = uc({ couple: true, children: 5, tenure: "private", rent: 1500, lhaMonthly: 1500 });
    expect(r.capApplies).toBe(true);
    expect(r.award).toBeLessThan(r.beforeCap);
  });
  it("earnings exempt from the cap", () => {
    expect(uc({ couple: true, children: 5, tenure: "private", rent: 1500, lhaMonthly: 1500, earnings: 900 }).capExempt).toBe(true);
  });
});

describe("Universal Credit edge cases from the page plan", () => {
  it("savings: nothing at £6,000, £4.35 for each £250 or part, and no award over £16,000", () => {
    expect(uc({ capital: 6000 }).award).toBeCloseTo(424.9, 6);
    expect(uc({ capital: 6250 }).capitalDeduction).toBeCloseTo(4.35, 6);
    expect(uc({ capital: 6250.01 }).capitalDeduction).toBeCloseTo(8.7, 6);
    expect(uc({ capital: 16000 }).capitalDeduction).toBeCloseTo(174, 6);
    expect(uc({ capital: 16000 }).award).toBeCloseTo(250.9, 6);
    const over = uc({ capital: 16000.01 });
    expect(over.capitalTooHigh).toBe(true);
    expect(over.award).toBe(0);
  });
  it("under 25", () => {
    expect(uc({ over25: false }).award).toBeCloseTo(338.58, 6);
    expect(uc({ couple: true, over25: false }).award).toBeCloseTo(528.34, 6);
  });
  it("a couple with one over State Pension age claims at the couple rate", () => {
    // A mixed-age couple claims Universal Credit, not Pension Credit; the older partner's pension counts in full.
    const r = uc({ couple: true, over25: true, otherIncome: 500 });
    expect(r.maximum).toBeCloseTo(666.97, 6);
    expect(r.award).toBeCloseTo(166.97, 6);
  });
  it("the cap: a couple with five children outside London", () => {
    const r = uc({ couple: true, children: 5, tenure: "private", rent: 1500, lhaMonthly: 1500 });
    const childBenefit = ((27.05 + 4 * 17.9) * 52) / 12;
    expect(r.beforeCap).toBeCloseTo(666.97 + 5 * 303.94 + 1500, 6);
    expect(r.capMonthly).toBe(1835);
    expect(r.capReduction).toBeCloseTo(r.beforeCap + childBenefit - 1835, 6);
    expect(r.award).toBeCloseTo(1835 - childBenefit, 6);
  });
  it("the cap is lifted by £881 of earnings, a health or carer element, or a disability benefit", () => {
    const big = { couple: true, children: 5, tenure: "private" as const, rent: 1500, lhaMonthly: 1500 };
    expect(uc({ ...big, earnings: 880.99 }).capApplies).toBe(true);
    expect(uc({ ...big, earnings: 881 }).capApplies).toBe(false);
    expect(uc({ ...big, health: "lcwra-new" }).capExempt).toBe(true);
    expect(uc({ ...big, carer: true }).capExempt).toBe(true);
    expect(uc({ ...big, capExemptBenefit: true }).capExempt).toBe(true);
    // Limited capability for work alone (no LCWRA) does not lift it.
    expect(uc({ ...big, health: "lcw" }).capExempt).toBe(false);
  });
  it("cap levels: London and elsewhere, single and family", () => {
    expect(uc({ capArea: "london" }).capMonthly).toBeCloseTo(1413.92, 2);
    expect(uc({}).capMonthly).toBeCloseTo(1229.42, 2);
    expect(uc({ capArea: "london", children: 1 }).capMonthly).toBeCloseTo(2110.25, 2);
    expect(uc({ couple: true }).capMonthly).toBe(1835);
    // A single renter with no children is capped once rent takes the award over £1,229.42.
    const single = uc({ tenure: "private", rent: 900, lhaMonthly: 900 });
    expect(single.capReduction).toBeCloseTo(424.9 + 900 - 14753 / 12, 6);
  });
  it("no housing costs: no housing element and the higher work allowance", () => {
    const r = uc({ children: 1, earnings: 1000 });
    expect(r.housing).toBe(0);
    expect(r.workAllowance).toBe(710);
    expect(r.earningsDeduction).toBeCloseTo(290 * 0.55, 6);
    // No children and no health element: no work allowance at all.
    expect(uc({ earnings: 500 }).earningsDeduction).toBeCloseTo(275, 6);
  });
  it("another adult at home takes £96.55 off the housing element", () => {
    expect(housingElement({ tenure: "private", rent: 800, lhaMonthly: 900, spareBedrooms: 0, nonDependants: 1 }).housing).toBeCloseTo(703.45, 6);
  });
});
