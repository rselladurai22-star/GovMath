import { describe, expect, it } from "vitest";
import { bestSalary, corporationTaxFull, directorPlan, employeeCost, employerNi } from "./company";
import { ratesStudy } from "./small-business-rates";

const ct = (profit: number, extra: Partial<Parameters<typeof corporationTaxFull>[0]> = {}) =>
  corporationTaxFull({ profit, associated: 0, months: 12, dividendsReceived: 0, ...extra });

describe("corporationTaxFull", () => {
  it("small profits rate", () => {
    expect(ct(40_000).tax).toBeCloseTo(7600, 6);
  });
  it("marginal relief at £100,000", () => {
    const r = ct(100_000);
    expect(r.marginalRelief).toBeCloseTo(2250, 6);
    expect(r.tax).toBeCloseTo(22_750, 6);
    expect(r.marginalRate).toBeCloseTo(0.265, 6);
  });
  it("main rate", () => {
    expect(ct(300_000).tax).toBeCloseTo(75_000, 6);
  });
  it("associated company halves the limits", () => {
    const r = ct(40_000, { associated: 1 });
    expect(r.lowerLimit).toBe(25_000);
    expect(r.tax).toBeCloseTo(40_000 * 0.25 - 0.015 * (125_000 - 40_000), 6);
  });
  it("short accounting period pro-rates the limits", () => {
    expect(ct(30_000, { months: 6 }).band).toBe("marginal");
  });
  it("dividends received raise the rate but are not taxed", () => {
    const r = ct(50_000, { dividendsReceived: 10_000 });
    expect(r.band).toBe("marginal");
    expect(r.tax).toBeCloseTo(12_500 - 0.015 * 190_000 * (50_000 / 60_000), 6);
  });
});

describe("employer costs", () => {
  it("15% above £5,000", () => {
    expect(employerNi(30_000)).toBeCloseTo(3750, 6);
  });
  it("under-21 relief up to £50,270", () => {
    expect(employerNi(30_000, "under21")).toBe(0);
  });
  it("full employee cost with auto-enrolment pension", () => {
    const r = employeeCost({ salary: 30_000, bonus: 0, pensionPct: 0.03, pensionOnFullPay: false, sacrificePct: 0, relief: "none", benefits: 0, headcount: 1, employmentAllowance: false });
    expect(r.pension).toBeCloseTo((30_000 - 6240) * 0.03, 6);
    expect(r.costEach).toBeCloseTo(30_000 + 3750 + 712.8, 6);
  });
  it("Employment Allowance across a team", () => {
    const r = employeeCost({ salary: 30_000, bonus: 0, pensionPct: 0, pensionOnFullPay: false, sacrificePct: 0, relief: "none", benefits: 0, headcount: 4, employmentAllowance: true });
    expect(r.allowanceUsed).toBe(10_500);
    expect(r.teamCost).toBeCloseTo(4 * 33_750 - 10_500, 6);
  });
  it("salary sacrifice saves employer NI", () => {
    const r = employeeCost({ salary: 40_000, bonus: 0, pensionPct: 0, pensionOnFullPay: false, sacrificePct: 0.05, relief: "none", benefits: 0, headcount: 1, employmentAllowance: false });
    expect(r.sacrificeNiSaving).toBeCloseTo(300, 6);
  });
});

describe("directorPlan", () => {
  const base = { profit: 80_000, pension: 0, employmentAllowance: false, scottish: false, associated: 0, otherIncome: 0 };
  it("£12,570 salary, rest as dividends", () => {
    const r = directorPlan({ ...base, salary: 12_570 });
    expect(r.employerNi).toBeCloseTo(1135.5, 6);
    expect(r.incomeTax).toBe(0);
    expect(r.employeeNi).toBe(0);
    expect(r.profitBeforeTax).toBeCloseTo(80_000 - 12_570 - 1135.5, 6);
    expect(r.qualifyingYear).toBe(true);
  });
  it("Employment Allowance removes the employer NI cost", () => {
    expect(directorPlan({ ...base, salary: 12_570, employmentAllowance: true }).employerNi).toBe(0);
  });
  it("never pays more salary and employer NI than the profit", () => {
    for (const ea of [false, true]) {
      for (const profit of [3000, 30_000, 100_000]) {
        const r = directorPlan({ ...base, profit, salary: 1_000_000, employmentAllowance: ea });
        expect(r.salary + r.employerNi).toBeLessThanOrEqual(profit + 0.01);
        expect(r.salary + r.employerNi).toBeGreaterThan(profit - 0.01);
      }
    }
  });
  it("finds a best salary at least as good as the usual choices", () => {
    const best = bestSalary(base);
    for (const s of [0, 5000, 12_570]) expect(best.takeHome).toBeGreaterThanOrEqual(directorPlan({ ...base, salary: s }).takeHome - 0.01);
  });
});

describe("ratesStudy", () => {
  it("pro-rates and applies charity relief", () => {
    const r = ratesStudy({ rateableValue: 30_000, onlyProperty: false, charity: true, days: 365, lastBill: 0 });
    expect(r.fullYear).toBeCloseTo(30_000 * 0.432 * 0.2, 6);
    const half = ratesStudy({ rateableValue: 30_000, onlyProperty: false, charity: false, days: 182.5, lastBill: 0 });
    expect(half.bill).toBeCloseTo(30_000 * 0.432 / 2, 6);
  });
});
