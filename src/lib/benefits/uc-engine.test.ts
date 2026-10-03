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
