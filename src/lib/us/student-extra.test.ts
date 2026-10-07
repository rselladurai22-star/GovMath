import { describe, expect, it } from "vitest";
import { amortize } from "./loans";
import { graduatedPlan, rapPayment, rapPlan, rapRate, tieredStandardYears } from "./student-extra";

describe("RAP", () => {
  it("uses the AGI bands", () => {
    expect(rapRate(10_000)).toBe(0);
    expect(rapRate(10_001)).toBe(0.01);
    expect(rapRate(20_000)).toBe(0.01);
    expect(rapRate(20_001)).toBe(0.02);
    expect(rapRate(55_000)).toBe(0.05);
    expect(rapRate(100_000)).toBe(0.09);
    expect(rapRate(100_001)).toBe(0.1);
    expect(rapRate(250_000)).toBe(0.1);
  });
  it("prices the payment with dependents and the $10 floor", () => {
    expect(rapPayment(5_000, 0)).toBe(10);
    expect(rapPayment(60_000, 0)).toBeCloseTo(250, 6); // 5% of 60,000 ÷ 12
    expect(rapPayment(60_000, 2)).toBeCloseTo(150, 6);
    expect(rapPayment(30_000, 3)).toBe(10); // 2% → $50, less $150
  });
  it("waives unpaid interest and matches principal up to $50", () => {
    const p = rapPlan(30_000, 6.5, 25_000, 0); // $41.67 a month, interest $162.50
    expect(p.waivedInterest).toBeGreaterThan(0);
    expect(p.matched).toBeGreaterThan(0);
    expect(p.years[1].balance).toBeCloseTo(30_000 - 12 * 41.6667, 0); // principal falls by the payment each month
    expect(p.paidOff).toBe(false);
    expect(p.months).toBe(360);
    expect(p.forgiven).toBeGreaterThan(0);
  });
  it("pays off a small loan on a high income", () => {
    const p = rapPlan(20_000, 6.5, 120_000, 0);
    expect(p.firstPayment).toBeCloseTo(1_000, 6);
    expect(p.paidOff).toBe(true);
    expect(p.waivedInterest).toBe(0);
  });
});

describe("standard and graduated plans", () => {
  it("sets the new standard term by balance", () => {
    expect(tieredStandardYears(24_999)).toBe(10);
    expect(tieredStandardYears(25_000)).toBe(15);
    expect(tieredStandardYears(60_000)).toBe(20);
    expect(tieredStandardYears(100_000)).toBe(25);
  });
  it("repays a graduated loan in full on time", () => {
    const g = graduatedPlan(30_000, 6.5, 120, 8);
    expect(g.months).toBe(120);
    expect(g.rows[g.rows.length - 1].balance).toBeLessThan(0.01);
    expect(g.last / g.first).toBeCloseTo(Math.pow(1.08, 4), 6);
    expect(g.totalInterest).toBeGreaterThan(amortize(30_000, 6.5, 120).totalInterest);
  });
  it("is level when the step is zero", () => {
    const g = graduatedPlan(30_000, 6.5, 120, 0);
    expect(g.first).toBeCloseTo(amortize(30_000, 6.5, 120).payment, 6);
  });
});
