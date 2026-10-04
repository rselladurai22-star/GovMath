import { describe, expect, it } from "vitest";
import { aer, AVERAGE_PRIZE, compound, doublingYears, fire, fireTarget, futureCost, halvingYears, PREMIUM_BONDS, premiumBondsYear, realReturn, todaysMoney } from "./growth";

describe("compound", () => {
  it("annual compounding of a lump sum", () => {
    expect(compound({ principal: 10_000, monthly: 0, rate: 0.05, years: 10, periods: 1 }).balance).toBeCloseTo(10_000 * 1.05 ** 10, 4);
  });
  it("monthly contributions at 0%", () => {
    const r = compound({ principal: 0, monthly: 100, rate: 0, years: 2, periods: 12 });
    expect(r.balance).toBeCloseTo(2_400, 6);
    expect(r.interest).toBeCloseTo(0, 6);
  });
  it("AER and doubling", () => {
    expect(aer(0.05, 12)).toBeCloseTo(0.051162, 5);
    expect(doublingYears(0.06).rule72).toBe(12);
    expect(doublingYears(0.06).exact).toBeCloseTo(11.896, 3);
  });
});

describe("inflation", () => {
  it("future cost and today's money", () => {
    expect(futureCost(100, 0.03, 10)).toBeCloseTo(134.39, 2);
    expect(todaysMoney(100, 0.03, 10)).toBeCloseTo(74.41, 2);
    expect(realReturn(0.05, 0.03)).toBeCloseTo(0.019417, 5);
    expect(halvingYears(0.02)).toBeCloseTo(35.0, 1);
  });
});

describe("FIRE", () => {
  it("4% rule target", () => {
    expect(fireTarget(30_000, 0.04, 0, 0, 0.04)).toBe(750_000);
  });
  it("State Pension cuts the target, plus a bridge", () => {
    const t = fireTarget(30_000, 0.04, 12_000, 10, 0);
    expect(t).toBe(450_000 + 120_000);
  });
  it("years to FI", () => {
    const r = fire({ age: 30, spend: 30_000, pot: 750_000, monthly: 0, realReturn: 0.04, swr: 0.04, statePension: 0, spa: 68 });
    expect(r.years).toBe(0);
    const r2 = fire({ age: 30, spend: 30_000, pot: 0, monthly: 2_000, realReturn: 0.04, swr: 0.04, statePension: 0, spa: 68 });
    expect(r2.years).toBeGreaterThan(20);
    expect(r2.years).toBeLessThan(25);
  });
});

describe("Premium Bonds", () => {
  it("prize table matches the published rate", () => {
    expect((12 * AVERAGE_PRIZE) / PREMIUM_BONDS.odds).toBeCloseTo(0.0435, 3);
  });
  it("simulated year", () => {
    const r = premiumBondsYear(50_000);
    expect(r.expected).toBeCloseTo(2_175, 6);
    expect(r.chanceAnyWin).toBeGreaterThan(0.99);
    expect(r.median).toBeLessThan(r.expected);
    const small = premiumBondsYear(1_000);
    expect(small.chanceAnyWin).toBeCloseTo(1 - Math.exp(-12_000 / 21_000), 6);
  });
});
