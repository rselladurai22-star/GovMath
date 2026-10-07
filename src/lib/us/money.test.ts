import { describe, expect, it } from "vitest";
import { amortize, autoLoan, debtToIncome, minimumOnly, monthlyPayment, payoffPlan } from "./loans";
import { affordability, mortgage, refinance, rentAffordability } from "./mortgage";
import { apy, cd, depositForGoal, grow, k401Limit, k401Projection, monthsToGoal, retirement, rothLimit } from "./savings";

describe("US loans", () => {
  it("prices a fixed-rate loan", () => {
    // $300,000 at 6% over 30 years: $1,798.65 a month.
    expect(monthlyPayment(300_000, 6, 360)).toBeCloseTo(1_798.65, 2);
    expect(monthlyPayment(12_000, 0, 12)).toBe(1_000);
    const s = amortize(300_000, 6, 360);
    expect(s.months).toBe(360);
    expect(s.totalInterest).toBeCloseTo(1_798.65 * 360 - 300_000, -1);
    const fast = amortize(300_000, 6, 360, 200);
    expect(fast.months).toBeLessThan(300);
  });

  it("builds an auto loan with tax after the trade-in", () => {
    const a = autoLoan({ price: 35_000, down: 3_000, tradeIn: 5_000, tradeOwed: 0, rebate: 0, salesTaxRate: 0.06, taxAfterTradeIn: true, fees: 500, financeTaxAndFees: true, aprPct: 7, months: 60 });
    expect(a.salesTax).toBeCloseTo(1_800, 6);
    expect(a.amountFinanced).toBeCloseTo(35_000 - 5_000 - 3_000 + 2_300, 6);
    expect(a.payment).toBeCloseTo(monthlyPayment(29_300, 7, 60), 6);
  });

  it("shows how long minimum card payments take", () => {
    const m = minimumOnly(5_000, 24);
    expect(m.months).toBeGreaterThan(150);
    expect(m.totalInterest).toBeGreaterThan(4_000);
  });

  it("works out debt-to-income", () => {
    const d = debtToIncome(6_000, 1_680, 480);
    expect(d.front).toBeCloseTo(0.28, 6);
    expect(d.back).toBeCloseTo(0.36, 6);
  });

  it("clears debts faster with the avalanche on interest, the snowball on the first win", () => {
    const debts = [
      { name: "Card", balance: 6_000, aprPct: 24, minimum: 150 },
      { name: "Store", balance: 1_200, aprPct: 18, minimum: 40 },
      { name: "Car", balance: 9_000, aprPct: 7, minimum: 250 },
    ];
    const snow = payoffPlan(debts, 300, "snowball");
    const ava = payoffPlan(debts, 300, "avalanche");
    expect(snow.order[0]).toBe(1);
    expect(ava.order[0]).toBe(0);
    expect(ava.totalInterest).toBeLessThanOrEqual(snow.totalInterest);
    expect(snow.clearedMonth[1]).toBeLessThan(ava.clearedMonth[1]);
    expect(Number.isFinite(ava.months)).toBe(true);
  });
});

describe("US mortgages", () => {
  it("adds taxes, insurance and PMI to the payment", () => {
    const m = mortgage({ price: 400_000, down: 40_000, aprPct: 6.5, years: 30, propertyTax: 4_800, insurance: 1_800, hoa: 0, pmiRate: 0.005, extra: 0 });
    expect(m.loan).toBe(360_000);
    expect(m.principalAndInterest).toBeCloseTo(monthlyPayment(360_000, 6.5, 360), 6);
    expect(m.pmiMonthly).toBeCloseTo(150, 6);
    expect(m.total).toBeCloseTo(m.principalAndInterest + 400 + 150 + 150, 6);
    expect(m.pmiMonths).toBeGreaterThan(80);
    const twenty = mortgage({ price: 400_000, down: 80_000, aprPct: 6.5, years: 30, propertyTax: 0, insurance: 0, hoa: 0, pmiRate: 0.005, extra: 0 });
    expect(twenty.pmiMonthly).toBe(0);
  });

  it("finds the price that fits 28/36", () => {
    const a = affordability({ income: 100_000, debts: 500, down: 50_000, aprPct: 6.5, years: 30, taxRate: 0.011, insurance: 1_800, hoa: 0, pmiRate: 0.005, frontLimit: 0.28, backLimit: 0.36 });
    expect(a.payment.total).toBeLessThanOrEqual(Math.min(a.frontMax, a.backMax) + 0.01);
    expect(a.payment.total).toBeGreaterThan(Math.min(a.frontMax, a.backMax) - 5);
    expect(a.limitedBy).toBe("front");
  });

  it("works out the refinance break-even", () => {
    const r = refinance({ balance: 300_000, currentAprPct: 7.5, monthsLeft: 336, newAprPct: 6, newYears: 30, closingCosts: 6_000, rollIn: false, cashOut: 0 });
    expect(r.monthlySaving).toBeGreaterThan(200);
    expect(r.breakEvenMonths).toBe(Math.ceil(6_000 / r.monthlySaving));
  });

  it("gives rent rules of thumb", () => {
    const r = rentAffordability(60_000, 4_000, 600, 0);
    expect(r.thirty).toBe(1_500);
    expect(r.fortyTimes).toBe(1_500);
    expect(r.budget).toBe(1_400);
    expect(r.comfortable).toBe(1_400);
    expect(r.incomeFor(2_000).fortyTimes).toBe(80_000);
  });
});

describe("US savings", () => {
  it("compounds deposits", () => {
    expect(apy(5, "annually")).toBeCloseTo(0.05, 9);
    expect(apy(5, "daily")).toBeCloseTo(0.051267, 5);
    // $10,000 for 10 years at 7% a year, no deposits.
    expect(grow(10_000, 0, 7, 10, "annually").balance).toBeCloseTo(19_671.51, 1);
    const g = grow(0, 100, 0, 2);
    expect(g.balance).toBe(2_400);
  });

  it("values a CD and its penalty", () => {
    const c = cd(10_000, 4.5, 12, "annually", 3, 6, 0.22);
    expect(c.maturity).toBeCloseTo(10_450, 6);
    expect(c.penalty).toBeCloseTo(112.5, 6);
    expect(c.tax).toBeCloseTo(99, 6);
  });

  it("plans a savings goal both ways", () => {
    const dep = depositForGoal(10_000, 0, 0, 20);
    expect(dep).toBe(500);
    expect(monthsToGoal(10_000, 0, 500, 0)).toBe(20);
    const d = depositForGoal(20_000, 1_000, 4, 36);
    expect(monthsToGoal(20_000, 1_000, d + 0.01, 4)).toBe(36);
  });

  it("applies 2026 401(k) limits and the match", () => {
    expect(k401Limit(40)).toBe(24_500);
    expect(k401Limit(55)).toBe(32_500);
    expect(k401Limit(61)).toBe(35_750);
    const k = k401Projection({ age: 30, retireAge: 31, salary: 80_000, balance: 0, pct: 0.04, matchRate: 0.5, matchUpTo: 0.06, employerFlat: 0, salaryGrowth: 0, returnPct: 0, feePct: 0, inflationPct: 0 });
    expect(k.firstYear.you).toBe(3_200);
    expect(k.firstYear.employer).toBe(1_600);
    expect(k.missedMatch).toBe(800);
    expect(k.balance).toBe(4_800);
  });

  it("phases out Roth IRA contributions", () => {
    expect(rothLimit(100_000, "single", 30, 100_000).limit).toBe(7_500);
    expect(rothLimit(160_500, "single", 30, 160_500).limit).toBe(3_750);
    expect(rothLimit(170_000, "single", 30, 170_000).limit).toBe(0);
    expect(rothLimit(100_000, "mfj", 55, 100_000).limit).toBe(8_600);
    expect(rothLimit(100_000, "single", 30, 4_000).limit).toBe(4_000);
  });

  it("tests whether savings last through retirement", () => {
    const r = retirement({ age: 35, retireAge: 65, lifeTo: 90, saved: 50_000, monthly: 1_000, returnPct: 7, retiredReturnPct: 5, inflationPct: 2.5, spending: 60_000, socialSecurity: 24_000 });
    expect(r.gapToday).toBe(36_000);
    expect(r.fourPercent).toBe(900_000);
    expect(r.atRetirement).toBeGreaterThan(1_000_000);
    expect(r.path[0].age).toBe(35);
  });
});
