import { describe, expect, it } from "vitest";
import { CA_2026, carerEarnings } from "./carers";

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
  it("allows earnings up to the £204 limit and no more", () => {
    expect(carerEarnings({ ...base, grossWeekly: 204 }).withinLimit).toBe(true);
    expect(carerEarnings({ ...base, grossWeekly: 204.02 }).withinLimit).toBe(false);
  });
  it("matches GOV.UK's care costs example: £100 earnings and £60 care costs allow £50", () => {
    const r = carerEarnings({ ...base, grossWeekly: 100, careCostsWeekly: 60 });
    expect(r.careAllowed).toBeCloseTo(50, 6);
    expect(r.counted).toBeCloseTo(50, 6);
  });
  it("charges National Insurance on gross pay when a pension is paid from it", () => {
    // £400 a week with £40 into a net pay pension: tax on £360, NI on £400.
    const withPension = carerEarnings({ ...base, grossWeekly: 400, pensionWeekly: 40 });
    const without = carerEarnings({ ...base, grossWeekly: 400 });
    expect(withPension.ni).toBeCloseTo(without.ni, 6);
    expect(withPension.tax).toBeLessThan(without.tax);
  });
  it("pays nothing in a week a one-off bonus takes earnings over the limit", () => {
    expect(carerEarnings({ ...base, grossWeekly: 150 }).withinLimit).toBe(true);
    expect(carerEarnings({ ...base, grossWeekly: 150 + 500 }).payable).toBe(0);
  });
});
