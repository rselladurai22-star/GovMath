import { describe, expect, it } from "vitest";
import {
  affordabilityEstimate,
  amortisationSchedule,
  mortgageRepayment,
} from "./mortgage";

const round = (n: number, dp = 2) => {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
};

describe("mortgageRepayment", () => {
  it("matches a hand-worked £200k @ 5% over 25 years (~£1,169.18/mo)", () => {
    const r = mortgageRepayment(200_000, 5, 25);
    expect(round(r.monthlyPayment)).toBe(1169.18);
    expect(round(r.totalRepaid)).toBe(round(r.monthlyPayment * 300));
    expect(round(r.totalInterest)).toBe(round(r.totalRepaid - 200_000));
  });

  it("handles 0% interest as principal / months", () => {
    const r = mortgageRepayment(120_000, 0, 10);
    expect(round(r.monthlyPayment)).toBe(round(120_000 / 120));
    expect(round(r.totalInterest)).toBe(0);
  });

  it("returns zero monthly payment for zero loan", () => {
    expect(mortgageRepayment(0, 5, 25).monthlyPayment).toBe(0);
  });

  it("computes LTV when a property price is supplied", () => {
    const r = mortgageRepayment(180_000, 5, 25, 200_000);
    expect(r.ltv).toBeCloseTo(0.9, 6);
  });

  it("LTV is zero when no property price given", () => {
    expect(mortgageRepayment(180_000, 5, 25).ltv).toBe(0);
  });

  it("shorter term = higher monthly, lower total interest", () => {
    const a = mortgageRepayment(200_000, 5, 30);
    const b = mortgageRepayment(200_000, 5, 15);
    expect(b.monthlyPayment).toBeGreaterThan(a.monthlyPayment);
    expect(b.totalInterest).toBeLessThan(a.totalInterest);
  });
});

describe("amortisationSchedule", () => {
  it("produces one row per year of the term", () => {
    const rows = amortisationSchedule(200_000, 5, 25);
    expect(rows).toHaveLength(25);
  });

  it("final balance is effectively zero", () => {
    const rows = amortisationSchedule(200_000, 5, 25);
    expect(rows[rows.length - 1].balance).toBeLessThan(0.01);
  });

  it("interest portion shrinks each year, capital portion grows", () => {
    const rows = amortisationSchedule(200_000, 5, 25);
    expect(rows[0].interestPaid).toBeGreaterThan(rows[10].interestPaid);
    expect(rows[0].capitalPaid).toBeLessThan(rows[10].capitalPaid);
  });
});

describe("affordabilityEstimate", () => {
  it("uses 4.5x as the mid estimate", () => {
    const r = affordabilityEstimate(60_000);
    expect(r.mid).toBe(270_000);
    expect(r.low).toBe(240_000);
    expect(r.high).toBe(300_000);
  });

  it("combines two salaries", () => {
    const r = affordabilityEstimate(40_000, 30_000);
    expect(r.combined).toBe(70_000);
    expect(r.mid).toBe(70_000 * 4.5);
  });

  it("handles zero gracefully", () => {
    const r = affordabilityEstimate(0);
    expect(r.mid).toBe(0);
  });
});
