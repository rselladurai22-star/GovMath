import { describe, expect, it } from "vitest";
import {
  annuityBalances,
  annuityCost,
  annuityFactor,
  annuityFvFactor,
  annuityIncome,
  cpiAdjust,
  cpiFor,
  CPI_ANNUAL,
  futureInflation,
  hsaGrowth,
  hsaLimit,
  hsaTax,
  inflationIn,
  invest,
  investScenarios,
  latestAnnualInflation,
  lifeExpectancy,
  sustainableWithdrawal,
  withdrawals,
} from "./investing";
import { grow } from "./savings";

describe("HSA", () => {
  it("uses the 2026 limits with the 55+ catch-up and prorates by month", () => {
    expect(hsaLimit("self", 40)).toBe(4_400);
    expect(hsaLimit("family", 40)).toBe(8_750);
    expect(hsaLimit("self", 55)).toBe(5_400);
    expect(hsaLimit("family", 60, 6)).toBe(4_875);
  });

  it("counts the employer's money toward the limit and saves FICA only through payroll", () => {
    const base = { coverage: "self" as const, age: 40, months: 12, wages: 80_000, status: "single" as const, state: "TX", dependents: 0, contribution: 4_400, employer: 1_000, payroll: true };
    const t = hsaTax(base);
    expect(t.yours).toBe(3_400);
    expect(t.overLimit).toBe(1_000);
    expect(t.federal).toBeCloseTo(3_400 * 0.22, 6);
    expect(t.fica).toBeCloseTo(3_400 * 0.0765, 6);
    expect(t.state).toBe(0);
    const direct = hsaTax({ ...base, payroll: false });
    expect(direct.fica).toBe(0);
    expect(direct.federal).toBeCloseTo(t.federal, 6);
  });

  it("gives no state saving in California or New Jersey", () => {
    const base = { coverage: "family" as const, age: 45, months: 12, wages: 120_000, status: "mfj" as const, dependents: 2, contribution: 8_750, employer: 0, payroll: true };
    expect(hsaTax({ ...base, state: "CA" }).state).toBe(0);
    expect(hsaTax({ ...base, state: "NJ" }).stateTaxed).toBe(true);
    expect(hsaTax({ ...base, state: "NY" }).state).toBeGreaterThan(0);
  });

  it("grows like grow() when nothing is spent", () => {
    const h = hsaGrowth(0, 4_400, 0, 7, 40, 65);
    const g = grow(0, 4_400 / 12, 7, 25, "annually");
    expect(h.balance).toBeCloseTo(g.balance, 2);
    const spent = hsaGrowth(1_000, 1_200, 5_000, 5, 40, 45);
    expect(spent.balance).toBeGreaterThanOrEqual(0);
    expect(spent.spent).toBeLessThanOrEqual(1_000 + spent.deposits + spent.growth + 0.01);
  });
});

describe("investing", () => {
  const base = { start: 10_000, monthly: 500, returnPct: 7, feePct: 0, years: 30, increasePct: 0, inflationPct: 2.5, taxable: false, yieldPct: 1.5, dividendTaxRate: 0.15, gainsTaxRate: 0.15 };

  it("matches grow() with no fees and no tax", () => {
    const x = invest(base);
    const g = grow(10_000, 500, 7, 30, "annually");
    expect(x.balance).toBeCloseTo(g.balance, 4);
    expect(x.feeDrag).toBeCloseTo(0, 6);
    expect(x.afterSale).toBe(x.balance);
  });

  it("fees lower the balance by more than the fees charged", () => {
    const x = invest({ ...base, feePct: 1 });
    expect(x.feeDrag).toBeGreaterThan(x.feesPaid);
    expect(x.balance + x.feeDrag).toBeCloseTo(invest(base).balance, 4);
  });

  it("a taxable account ends lower after tax", () => {
    const t = invest({ ...base, taxable: true });
    expect(t.dividendTax).toBeGreaterThan(0);
    expect(t.afterSale).toBeLessThan(invest(base).balance);
  });

  it("scenarios rise with the return", () => {
    const s = investScenarios(base, [4, 6, 8]);
    expect(s[0].balance).toBeLessThan(s[1].balance);
    expect(s[1].balance).toBeLessThan(s[2].balance);
  });
});

describe("inflation", () => {
  it("has every year from 1913 to 2025", () => {
    for (let y = 1913; y <= 2025; y++) expect(CPI_ANNUAL[y]).toBeGreaterThan(0);
  });

  it("adjusts both ways", () => {
    const a = cpiAdjust(100, 2000, 2025);
    expect(a.value).toBeCloseTo((100 * 321.943) / 172.2, 6);
    const b = cpiAdjust(a.value, 2025, 2000);
    expect(b.value).toBeCloseTo(100, 6);
    expect(a.average).toBeCloseTo(b.average, 10);
    expect(cpiFor(2026)).toBe(334.98);
  });

  it("year rates and the latest 12 months", () => {
    expect(inflationIn(1980)).toBeCloseTo(82.4 / 72.6 - 1, 10);
    expect(latestAnnualInflation()).toBeCloseTo(334.98 / 323.976 - 1, 10);
    expect(futureInflation(100, 3, 10).cost).toBeCloseTo(134.39, 2);
  });
});

describe("annuities", () => {
  it("matches the closed-form ordinary annuity", () => {
    const i = 0.05 / 12;
    const n = 240;
    expect(annuityFactor(5, 20)).toBeCloseTo((1 - Math.pow(1 + i, -n)) / i, 8);
    expect(annuityFactor(5, 20, 12, "due")).toBeCloseTo(((1 - Math.pow(1 + i, -n)) / i) * (1 + i), 8);
    expect(annuityFvFactor(5, 20)).toBeCloseTo((Math.pow(1 + i, n) - 1) / i, 6);
  });

  it("income and cost are inverses, and the notional balance runs to zero", () => {
    const a = annuityIncome(200_000, 5, 20);
    const c = annuityCost(a.payment, 5, 20);
    expect(c.premium).toBeCloseTo(200_000, 4);
    const bal = annuityBalances(200_000, a.payment, 5, 20);
    expect(bal[bal.length - 1]).toBeLessThan(0.01);
    const due = annuityIncome(200_000, 5, 20, 12, "due");
    expect(due.payment).toBeLessThan(a.payment);
    expect(annuityBalances(200_000, due.payment, 5, 20, 12, "due").at(-1)!).toBeLessThan(0.01);
  });

  it("rising payments start lower; zero rate is a straight split", () => {
    expect(annuityIncome(100_000, 5, 20, 12, "ordinary", 2).payment).toBeLessThan(annuityIncome(100_000, 5, 20).payment);
    expect(annuityIncome(120_000, 0, 10).payment).toBeCloseTo(1_000, 8);
    expect(annuityIncome(120_000, 0, 10).breakEvenYears).toBeCloseTo(10, 8);
  });

  it("reads the IRS Single Life Table", () => {
    expect(lifeExpectancy(65)).toBe(22.9);
    expect(lifeExpectancy(70)).toBe(18.8);
    expect(lifeExpectancy(30)).toBe(45.7);
  });
});

describe("withdrawals", () => {
  it("lasts forever when the return covers a flat withdrawal", () => {
    const p = withdrawals({ balance: 1_000_000, mode: "fixed", amount: 30_000, pct: 0, inflationAdjust: false, returnPct: 5, inflationPct: 2.5 });
    expect(p.lasts).toBe(Infinity);
  });

  it("runs out with no growth after balance ÷ withdrawal years", () => {
    const p = withdrawals({ balance: 400_000, mode: "fixed", amount: 40_000, pct: 0, inflationAdjust: false, returnPct: 0, inflationPct: 0 });
    expect(p.lasts).toBeCloseTo(10, 6);
    expect(p.totalWithdrawn).toBeCloseTo(400_000, 4);
  });

  it("the sustainable withdrawal empties the account in exactly N years", () => {
    const w = sustainableWithdrawal(1_000_000, 30, 5, 2.5, true);
    const p = withdrawals({ balance: 1_000_000, mode: "fixed", amount: w, pct: 0, inflationAdjust: true, returnPct: 5, inflationPct: 2.5, maxYears: 40 });
    expect(p.lasts).toBeGreaterThan(29.9);
    expect(p.lasts).toBeLessThan(30.1);
  });

  it("a percentage withdrawal never runs out", () => {
    const p = withdrawals({ balance: 500_000, mode: "percent", amount: 0, pct: 5, inflationAdjust: false, returnPct: 0, inflationPct: 0, maxYears: 30 });
    expect(p.lasts).toBe(Infinity);
    expect(p.endBalance).toBeGreaterThan(0);
  });

  it("a bad first year shortens the plan", () => {
    const a = withdrawals({ balance: 1_000_000, mode: "fixed", amount: 50_000, pct: 0, inflationAdjust: true, returnPct: 5, inflationPct: 2.5 });
    const b = withdrawals({ balance: 1_000_000, mode: "fixed", amount: 50_000, pct: 0, inflationAdjust: true, returnPct: 5, inflationPct: 2.5, firstYearReturnPct: -20 });
    expect(b.lasts).toBeLessThan(a.lasts);
  });
});
