import { describe, expect, it } from "vitest";
import { compoundInterest } from "./compound-interest";

const round = (n: number) => Math.round(n * 100) / 100;

describe("compoundInterest", () => {
  it("principal only, 0% → returns principal unchanged", () => {
    const r = compoundInterest({
      principal: 10_000,
      monthlyContribution: 0,
      annualRatePct: 0,
      years: 10,
    });
    expect(r.futureValue).toBe(10_000);
    expect(r.totalInterest).toBe(0);
    expect(r.totalContributions).toBe(10_000);
  });

  it("£1000 at 10% annual compounded annually for 1y → £1100", () => {
    const r = compoundInterest({
      principal: 1000,
      monthlyContribution: 0,
      annualRatePct: 10,
      years: 1,
      compoundsPerYear: 1,
    });
    expect(round(r.futureValue)).toBe(1100);
  });

  it("£1000 at 10% annual compounded annually for 10y → ≈ £2593.74", () => {
    const r = compoundInterest({
      principal: 1000,
      monthlyContribution: 0,
      annualRatePct: 10,
      years: 10,
      compoundsPerYear: 1,
    });
    expect(round(r.futureValue)).toBe(2593.74);
  });

  it("monthly contributions only, 0% → total = contributions only", () => {
    const r = compoundInterest({
      principal: 0,
      monthlyContribution: 200,
      annualRatePct: 0,
      years: 5,
    });
    expect(r.futureValue).toBe(200 * 12 * 5);
    expect(r.totalInterest).toBe(0);
  });

  it("realistic projection: £5k + £200/mo at 6% for 20y is in the right ballpark", () => {
    const r = compoundInterest({
      principal: 5000,
      monthlyContribution: 200,
      annualRatePct: 6,
      years: 20,
    });
    expect(r.futureValue).toBeGreaterThan(90_000);
    expect(r.futureValue).toBeLessThan(110_000);
    // Total contributions = 5000 + 200·12·20 = 53,000
    expect(r.totalContributions).toBe(53_000);
    // Interest is the gap
    expect(round(r.totalContributions + r.totalInterest)).toBe(r.futureValue);
  });

  it("schedule has one entry per year and ends at the final value", () => {
    const r = compoundInterest({
      principal: 1000,
      monthlyContribution: 0,
      annualRatePct: 5,
      years: 10,
      compoundsPerYear: 1,
    });
    expect(r.schedule).toHaveLength(10);
    expect(r.schedule[9]?.balance).toBe(r.futureValue);
  });

  it("balance grows monotonically with positive contributions and rate", () => {
    const r = compoundInterest({
      principal: 0,
      monthlyContribution: 100,
      annualRatePct: 5,
      years: 5,
    });
    for (let i = 1; i < r.schedule.length; i++) {
      expect(r.schedule[i]!.balance).toBeGreaterThan(r.schedule[i - 1]!.balance);
    }
  });

  it("compounding more often gives a higher result (rate > 0)", () => {
    const a = compoundInterest({
      principal: 10_000,
      monthlyContribution: 0,
      annualRatePct: 10,
      years: 10,
      compoundsPerYear: 1,
    });
    const b = compoundInterest({
      principal: 10_000,
      monthlyContribution: 0,
      annualRatePct: 10,
      years: 10,
      compoundsPerYear: 12,
    });
    expect(b.futureValue).toBeGreaterThan(a.futureValue);
  });

  it("zero principal, zero contributions, any rate → zero", () => {
    const r = compoundInterest({
      principal: 0,
      monthlyContribution: 0,
      annualRatePct: 8,
      years: 30,
    });
    expect(r.futureValue).toBe(0);
  });
});
