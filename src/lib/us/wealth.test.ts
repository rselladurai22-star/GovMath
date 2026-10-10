import { describe, expect, it } from "vitest";
import {
  ageGroup,
  dividendPlan,
  dividendTax,
  emergencyFund,
  fire,
  monthsToTarget,
  netWorth,
  realReturn,
  savingsAccount,
  savingsRateTable,
  SCF_2022,
  suggestedMonths,
  type FireInput,
} from "./wealth";

const BASE: FireInput = {
  age: 30,
  takeHome: 80_000,
  spending: 50_000,
  saved: 100_000,
  returnPct: 7,
  inflationPct: 2.5,
  withdrawalPct: 4,
  retireShare: 1,
  saveGrowthPct: 0,
  partTime: 20_000,
  coastAge: 65,
};

describe("FIRE", () => {
  it("uses 25 times spending at a 4% withdrawal rate", () => {
    const f = fire(BASE);
    expect(f.number).toBe(1_250_000);
    expect(f.annualSave).toBe(30_000);
    expect(f.savingsRate).toBeCloseTo(0.375, 6);
    expect(f.realPct).toBeCloseTo(4.39, 2);
  });

  it("reaches the target in the month the engine reports", () => {
    const f = fire(BASE);
    expect(Number.isFinite(f.months)).toBe(true);
    expect(monthsToTarget(100_000, 30_000, f.realPct, 1_250_000)).toBe(f.months);
    // Lean needs less, Fat more, Barista less than the full number.
    expect(f.lean.months).toBeLessThan(f.months);
    expect(f.fat.months).toBeGreaterThan(f.months);
    expect(f.barista.number).toBe(750_000);
    expect(f.barista.months).toBeLessThan(f.months);
  });

  it("works out Coast FIRE", () => {
    const f = fire(BASE);
    expect(f.coast.needNow).toBeCloseTo(1_250_000 / Math.pow(1 + f.realPct / 100, 35), 2);
    const rich = fire({ ...BASE, saved: 400_000 });
    expect(rich.coast.reached).toBe(true);
    expect(rich.coast.months).toBe(0);
  });

  it("never reaches FI with no savings and no balance", () => {
    const f = fire({ ...BASE, saved: 0, spending: 80_000 });
    expect(f.months).toBe(Infinity);
    expect(f.nominalNumber).toBe(Infinity);
    expect(f.path.length).toBe(41);
  });

  it("is already there when savings exceed the number", () => {
    expect(fire({ ...BASE, saved: 2_000_000 }).months).toBe(0);
  });

  it("builds a savings-rate table that falls as the rate rises", () => {
    const t = savingsRateTable(80_000, 0, 5, 4);
    for (let k = 1; k < t.length; k++) expect(t[k].months).toBeLessThan(t[k - 1].months);
  });

  it("gives a real return", () => {
    expect(realReturn(7, 2.5)).toBeCloseTo(4.3902, 3);
  });
});

describe("emergency fund", () => {
  it("suggests months from the situation", () => {
    expect(suggestedMonths({ earners: "two", income: "salary", dependents: false, homeowner: false, outlook: "average" })).toBe(3);
    expect(suggestedMonths({ earners: "one", income: "salary", dependents: false, homeowner: false, outlook: "average" })).toBe(6);
    expect(suggestedMonths({ earners: "one", income: "irregular", dependents: true, homeowner: true, outlook: "uncertain" })).toBe(12);
    expect(suggestedMonths({ earners: "two", income: "salary", dependents: false, homeowner: false, outlook: "stable" })).toBe(3);
  });

  it("sizes and builds the fund", () => {
    const e = emergencyFund({ costs: [2_000, 600, 300, 400], months: 6, current: 3_000, monthlySave: 500, otherIncome: 0, apyPct: 4, regularApyPct: 0.37 });
    expect(e.essentials).toBe(3_300);
    expect(e.target).toBe(19_800);
    expect(e.gap).toBe(16_800);
    expect(e.coverNow).toBeCloseTo(3_000 / 3_300, 6);
    expect(e.monthsToGoal).toBeGreaterThan(28);
    expect(e.monthsToGoal).toBeLessThan(34);
    expect(e.yearInterest).toBeCloseTo(792, 6);
  });

  it("handles other income covering everything and no saving", () => {
    const e = emergencyFund({ costs: [1_000], months: 6, current: 0, monthlySave: 0, otherIncome: 2_000, apyPct: 4, regularApyPct: 0.37 });
    expect(e.target).toBe(0);
    expect(e.monthsToGoal).toBe(0);
    expect(e.coverNow).toBe(Infinity);
    const never = emergencyFund({ costs: [1_000], months: 6, current: 0, monthlySave: 0, otherIncome: 0, apyPct: 4, regularApyPct: 0.37 });
    expect(never.monthsToGoal).toBe(Infinity);
  });
});

describe("net worth", () => {
  it("adds assets, takes off debts and compares with the SCF", () => {
    const n = netWorth({ cash: 15_000, retirement: 90_000, investments: 20_000, home: 400_000, vehicles: 20_000, otherAssets: 0, mortgage: 300_000, auto: 15_000, student: 25_000, cards: 5_000, otherDebts: 0, age: 40 });
    expect(n.assets).toBe(545_000);
    expect(n.liabilities).toBe(345_000);
    expect(n.net).toBe(200_000);
    expect(n.homeEquity).toBe(100_000);
    expect(n.excludingHome).toBe(100_000);
    expect(n.liquid).toBe(-10_000);
    expect(n.group).toBe("35to44");
    expect(n.median).toBe(135_600);
    expect(n.debtToAsset).toBeCloseTo(345 / 545, 6);
  });

  it("uses the published 2022 SCF table", () => {
    expect(SCF_2022.all.median).toBe(192_900);
    expect(SCF_2022.under35.median).toBe(39_000);
    expect(SCF_2022["65to74"].mean).toBe(1_794_600);
    expect(ageGroup(34)).toBe("under35");
    expect(ageGroup(75)).toBe("75plus");
  });

  it("handles no assets", () => {
    const n = netWorth({ cash: 0, retirement: 0, investments: 0, home: 0, vehicles: 0, otherAssets: 0, mortgage: 0, auto: 0, student: 10_000, cards: 0, otherDebts: 0, age: 25 });
    expect(n.debtToAsset).toBe(Infinity);
    expect(n.net).toBe(-10_000);
  });
});

describe("dividends", () => {
  it("taxes qualified dividends in the 0% band at nothing", () => {
    // Single, $40,000 AGI: taxable $23,900, so $10,000 of qualified dividends stays under $49,450.
    const t = dividendTax(40_000, 10_000, 1, "single");
    expect(t.incomeTax).toBeCloseTo(0, 6);
    expect(t.ifAllOrdinary).toBeCloseTo(1_200, 6);
  });

  it("taxes qualified dividends at 15% in the middle", () => {
    const t = dividendTax(120_000, 10_000, 1, "single");
    expect(t.incomeTax).toBeCloseTo(1_500, 6);
    expect(t.niit).toBe(0);
    expect(t.ifAllOrdinary).toBeCloseTo(1_800 * 0.22 + 8_200 * 0.24, 6);
  });

  it("adds the NIIT above $200,000", () => {
    const t = dividendTax(250_000, 10_000, 1, "single");
    expect(t.niit).toBeCloseTo(380, 6);
  });

  it("grows faster with DRIP and pays cash without it", () => {
    const base = { start: 50_000, monthly: 500, yieldPct: 3, dividendGrowthPct: 5, priceGrowthPct: 4, years: 20 };
    const drip = dividendPlan({ ...base, drip: true });
    const cash = dividendPlan({ ...base, drip: false });
    expect(drip.value).toBeGreaterThan(cash.value);
    expect(drip.cash).toBe(0);
    expect(cash.cash).toBeCloseTo(cash.totalDividends, 6);
    expect(drip.deposits).toBe(170_000);
    expect(drip.years.length).toBe(20);
    expect(drip.firstYearDividends).toBeGreaterThan(1_500);
    expect(drip.firstYearDividends).toBeLessThan(1_800);
  });

  it("matches a plain price path with no yield", () => {
    const p = dividendPlan({ start: 10_000, monthly: 0, yieldPct: 0, dividendGrowthPct: 0, priceGrowthPct: 7, years: 10, drip: true });
    expect(p.value).toBeCloseTo(10_000 * Math.pow(1.07, 10), 4);
  });
});

describe("savings account", () => {
  it("earns the APY on a single deposit over a year", () => {
    const s = savingsAccount({ deposit: 10_000, monthly: 0, apyPct: 4, laterChange: 0, years: 1, taxRate: 0, fee: 0 });
    expect(s.interest).toBeCloseTo(400, 6);
    expect(s.afterTax).toBeCloseTo(10_400, 6);
  });

  it("takes tax and fees", () => {
    const s = savingsAccount({ deposit: 10_000, monthly: 0, apyPct: 4, laterChange: 0, years: 1, taxRate: 0.22, fee: 5 });
    expect(s.fees).toBe(60);
    expect(s.tax).toBeGreaterThan(0);
    expect(s.afterTax).toBeLessThan(s.balance);
  });

  it("applies a later rate change after 12 months", () => {
    const flat = savingsAccount({ deposit: 10_000, monthly: 0, apyPct: 4, laterChange: 0, years: 3, taxRate: 0, fee: 0 });
    const cut = savingsAccount({ deposit: 10_000, monthly: 0, apyPct: 4, laterChange: -1, years: 3, taxRate: 0, fee: 0 });
    expect(cut.balance).toBeCloseTo(10_000 * 1.04 * 1.03 * 1.03, 4);
    expect(cut.balance).toBeLessThan(flat.balance);
  });
});
