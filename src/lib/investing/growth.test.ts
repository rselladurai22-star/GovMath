import { describe, expect, it } from "vitest";
import { AVERAGE_PRIZE, grossEquivalent, PREMIUM_BONDS, premiumBondsYear, savingsAfterTax } from "./growth";

describe("Premium Bonds", () => {
  it("prize table matches the published rate and the November 2026 totals", () => {
    expect((12 * AVERAGE_PRIZE) / PREMIUM_BONDS.odds).toBeCloseTo(0.0435, 3);
    expect(PREMIUM_BONDS.prizes.reduce((a, [, n]) => a + n, 0)).toBe(6_575_175);
    expect(PREMIUM_BONDS.prizes.reduce((a, [v, n]) => a + v * n, 0)).toBe(500_535_100);
  });
  it("simulated year", () => {
    const r = premiumBondsYear(50_000);
    expect(r.expected).toBeCloseTo(2_175, 6);
    expect(r.chanceAnyWin).toBeGreaterThan(0.99);
    expect(r.median).toBeLessThan(r.expected);
    const small = premiumBondsYear(1_000);
    expect(small.chanceAnyWin).toBeCloseTo(1 - Math.exp(-12_000 / 21_000), 6);
  });
  it("the £25 minimum mostly wins nothing", () => {
    const r = premiumBondsYear(25);
    expect(r.chanceNothing).toBeCloseTo(Math.exp(-300 / 21_000), 9);
    expect(r.median).toBe(0);
    expect(r.p90).toBe(0);
  });
  it("caps at £50,000 and keeps the simulation repeatable", () => {
    expect(premiumBondsYear(80_000).holding).toBe(50_000);
    expect(premiumBondsYear(10_000).median).toBe(premiumBondsYear(10_000).median);
    expect(premiumBondsYear(10_000).totals).toHaveLength(4_000);
    const t = premiumBondsYear(10_000).totals;
    expect(t[0]).toBeLessThanOrEqual(t[t.length - 1]);
  });
});

describe("savings after tax (2026/27 Personal Savings Allowance)", () => {
  it("basic rate: £1,000 tax-free, 20% above", () => {
    expect(savingsAfterTax(20_000, 0.04, "basic").net).toBe(800);
    expect(savingsAfterTax(50_000, 0.04, "basic").net).toBeCloseTo(2_000 - 200, 6);
  });
  it("higher rate: £500, additional rate: none", () => {
    expect(savingsAfterTax(20_000, 0.04, "higher").net).toBeCloseTo(800 - 300 * 0.4, 6);
    expect(savingsAfterTax(20_000, 0.04, "additional").net).toBeCloseTo(800 * 0.55, 6);
    expect(savingsAfterTax(20_000, 0.04, "basic", 900).net).toBeCloseTo(800 - 700 * 0.2, 6);
    expect(savingsAfterTax(50_000, 0.05, "none").tax).toBe(0);
  });
  it("gross equivalent of the prize rate", () => {
    expect(grossEquivalent(0.0435, "higher")).toBeCloseTo(0.0725, 6);
  });
});
