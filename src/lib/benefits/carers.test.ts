import { describe, expect, it } from "vitest";
import { CA_2026, carerEarnings, maxGrossWithinLimit } from "./carers";

const base = { pensionWeekly: 0, careCostsWeekly: 0, scotland: false, overlapping: 0 };

describe("Carer's Allowance earnings", () => {
  it("pays in full under the limit with no tax", () => {
    const r = carerEarnings({ ...base, grossWeekly: 200 });
    expect(r.tax).toBe(0);
    expect(r.ni).toBe(0);
    expect(r.withinLimit).toBe(true);
    expect(r.payable).toBe(CA_2026.weekly);
  });
  it("loses everything just over the limit", () => {
    expect(carerEarnings({ ...base, grossWeekly: 205 }).payable).toBe(0);
  });
  it("half of pension contributions are deducted", () => {
    const r = carerEarnings({ ...base, grossWeekly: 220, pensionWeekly: 40 });
    expect(r.counted).toBeCloseTo(200, 6);
    expect(r.withinLimit).toBe(true);
  });
  it("care costs count up to half of net earnings", () => {
    const r = carerEarnings({ ...base, grossWeekly: 240, careCostsWeekly: 200 });
    expect(r.careAllowed).toBeCloseTo(120, 6);
    expect(r.counted).toBeCloseTo(120, 6);
  });
  it("State Pension overlaps", () => {
    const r = carerEarnings({ ...base, grossWeekly: 0, overlapping: 241.3 });
    expect(r.payable).toBe(0);
    expect(r.underlying).toBe(true);
    expect(carerEarnings({ ...base, grossWeekly: 0, overlapping: 50 }).payable).toBeCloseTo(36.45, 6);
  });
  it("finds the most gross pay within the limit", () => {
    const g = maxGrossWithinLimit(base);
    expect(g).toBeCloseTo(204, 1);
    expect(carerEarnings({ ...base, grossWeekly: g }).withinLimit).toBe(true);
    expect(carerEarnings({ ...base, grossWeekly: g + 0.02 }).withinLimit).toBe(false);
  });
});
