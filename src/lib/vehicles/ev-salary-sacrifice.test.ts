import { describe, expect, it } from "vitest";
import { evSalarySacrifice } from "./ev-salary-sacrifice";

const round = (n: number) => Math.round(n * 100) / 100;

describe("evSalarySacrifice (2025/26 BIK 3%)", () => {
  it("basic rate saver: marginal 28% on £500 sac", () => {
    const r = evSalarySacrifice({
      grossMonthlyLease: 500,
      p11d: 40_000,
      incomeTaxRate: 0.2,
      niRate: 0.08,
    });
    expect(round(r.marginalRate)).toBe(0.28);
    expect(round(r.taxSaving)).toBe(round(500 * 12 * 0.28));
    // BIK = 40000 × 3% × 20% = £240/yr
    expect(round(r.bikAnnual)).toBe(240);
  });

  it("higher rate saver gets bigger tax saving but bigger BIK", () => {
    const basic = evSalarySacrifice({
      grossMonthlyLease: 500,
      p11d: 40_000,
      incomeTaxRate: 0.2,
      niRate: 0.08,
    });
    const higher = evSalarySacrifice({
      grossMonthlyLease: 500,
      p11d: 40_000,
      incomeTaxRate: 0.4,
      niRate: 0.02,
    });
    expect(higher.taxSaving).toBeGreaterThan(basic.taxSaving);
    expect(higher.bikAnnual).toBeGreaterThan(basic.bikAnnual);
    // Higher-rate saver should usually still come out ahead net
    expect(higher.netAnnual).toBeLessThan(basic.netAnnual);
  });

  it("net annual = gross - tax saving + BIK", () => {
    const r = evSalarySacrifice({
      grossMonthlyLease: 600,
      p11d: 45_000,
      incomeTaxRate: 0.4,
      niRate: 0.02,
    });
    expect(round(r.netAnnual)).toBe(
      round(600 * 12 - r.taxSaving + r.bikAnnual)
    );
  });

  it("sacrifice always cheaper than private monthly (basic-rate, modest BIK)", () => {
    const r = evSalarySacrifice({
      grossMonthlyLease: 500,
      p11d: 35_000,
      incomeTaxRate: 0.2,
      niRate: 0.08,
    });
    expect(r.annualSavingVsPrivate).toBeGreaterThan(0);
  });
});
