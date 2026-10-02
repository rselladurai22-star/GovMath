import { describe, expect, it } from "vitest";
import { niBreakdown, niCurve, niMarginalRate, qualifyingYear } from "./ni-insights";

describe("niBreakdown", () => {
  it("splits an employee's £60k into the 0%, 8% and 2% bands", () => {
    const r = niBreakdown(60_000, "employee");
    expect(r.bands.map((b) => [b.rate, Math.round(b.income), Math.round(b.ni * 100) / 100])).toEqual([
      [0, 12_570, 0],
      [0.08, 37_700, 3_016],
      [0.02, 9_730, 194.6],
    ]);
    expect(r.total).toBeCloseTo(3_210.6, 2);
  });

  it("uses 6% for the self-employed main band", () => {
    // £35k profit: 6% × £22,430 = £1,345.80.
    expect(niBreakdown(35_000, "self-employed").total).toBeCloseTo(1_345.8, 2);
  });

  it("keeps only the tax-free band below the threshold", () => {
    const r = niBreakdown(10_000, "employee");
    expect(r.total).toBe(0);
    expect(r.bands).toHaveLength(1);
    expect(r.bands[0].income).toBe(10_000);
  });
});

describe("niMarginalRate", () => {
  it("follows the bands", () => {
    expect(niMarginalRate(10_000, "employee")).toBe(0);
    expect(niMarginalRate(30_000, "employee")).toBe(0.08);
    expect(niMarginalRate(30_000, "self-employed")).toBe(0.06);
    expect(niMarginalRate(80_000, "employee")).toBe(0.02);
  });
});

describe("qualifyingYear", () => {
  it("uses the Lower Earnings Limit for employees and Small Profits Threshold for the self-employed", () => {
    expect(qualifyingYear(6_500, "employee")).toBe(true);
    expect(qualifyingYear(6_499, "employee")).toBe(false);
    expect(qualifyingYear(6_845, "self-employed")).toBe(true);
    expect(qualifyingYear(6_800, "self-employed")).toBe(false);
  });
});

describe("niCurve", () => {
  it("samples both modes", () => {
    const c = niCurve(100_000, 4);
    expect(c).toHaveLength(5);
    expect(c[0]).toEqual({ income: 0, employee: 0, selfEmployed: 0 });
    expect(c[4].employee).toBeGreaterThan(c[4].selfEmployed);
  });
});
