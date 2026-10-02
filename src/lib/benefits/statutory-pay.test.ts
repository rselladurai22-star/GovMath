import { describe, expect, it } from "vitest";
import { sickPeriod, statutorySickPay } from "./statutory-pay";

describe("statutorySickPay (from April 2026)", () => {
  it("pays the flat rate when 80% of earnings is higher", () => {
    expect(statutorySickPay(1, 500).weeklyRate).toBe(123.25);
  });
  it("pays 80% of earnings when that is lower", () => {
    expect(statutorySickPay(1, 100).weeklyRate).toBeCloseTo(80, 6);
  });
  it("has no waiting days", () => {
    expect(statutorySickPay(2, 500).waitingDays).toBe(0);
  });
});

describe("sickPeriod", () => {
  it("splits the weekly rate across qualifying days", () => {
    const r = sickPeriod({ averageWeeklyEarnings: 500, qualifyingDays: 5, daysOff: 3 });
    expect(r.dailyRate).toBeCloseTo(24.65, 6);
    expect(r.ssp).toBeCloseTo(73.95, 6);
  });
  it("stops after 28 weeks across linked spells", () => {
    const r = sickPeriod({ averageWeeklyEarnings: 500, qualifyingDays: 5, daysOff: 20, weeksAlreadyPaid: 26 });
    expect(r.daysPaid).toBe(10);
    expect(r.daysLeft).toBe(0);
  });
  it("compares company sick pay", () => {
    const r = sickPeriod({ averageWeeklyEarnings: 500, qualifyingDays: 5, daysOff: 10, fullPayWeeks: 1, halfPayWeeks: 1 });
    expect(r.companyPay).toBeCloseTo(500 + 250, 6);
    expect(r.youGet).toBeCloseTo(750, 6);
  });
});
