/**
 * What announced tax changes mean for one person's income, tax year by tax
 * year from 2026/27 to 2030/31.
 *
 * Only measures already announced and, where stated, legislated are modelled
 * (all from GOV.UK, Budget 2025, 26 November 2025, and its tax documents):
 *  - Income Tax Personal Allowance (£12,570), basic rate limit (£37,700),
 *    additional rate threshold (£125,140) and the matching employee NI
 *    thresholds held until 5 April 2031. ("Maintaining the Personal Allowance
 *    and the basic rate limit … until 5 April 2031", HMRC policy paper.)
 *  - Dividend ordinary and upper rates up 2 points from 6 April 2026
 *    (10.75%, 35.75%; additional 39.35% unchanged).
 *  - Savings rates 22/42/47% from 6 April 2027 (UK-wide); starting rate for
 *    savings held at £5,000 to 5 April 2031.
 *  - Property income rates 22/42/47% from 6 April 2027 in England, Wales and
 *    Northern Ireland; finance cost relief at the property basic rate (22%).
 *    The UK government will "engage with" the Scottish and Welsh governments
 *    about setting their own property rates. ("Change to tax rates for
 *    property, savings and dividend income — technical note".)
 *  - Salary sacrifice pension contributions above £2,000 a year pay employee
 *    and employer Class 1 NI from 6 April 2029. ("Salary sacrifice reform for
 *    pension contributions effective from 6 April 2029", HMRC.)
 *  - Plan 2 student loan threshold held at £29,385 for three years from
 *    April 2027 (to 2029/30). Budget 2025.
 *
 * Not announced, so held at 2026/27 levels: Scottish Income Tax rates and
 * bands (set each year by the Scottish Parliament), the Plan 2 threshold in
 * 2030/31, the dividend allowance and the Personal Savings Allowance.
 *
 * Uses the investing tax engine (income order, allowances, Scotland) and the
 * 2026/27 employee NI engine; neither is changed here.
 */

import { incomeTax2026, INV_2026 } from "../investing/tax";
import { nationalInsurance } from "./2026-27";
import { SACRIFICE_2026 } from "./pay-and-perks";

export const BUDGET_2026_DATE = "28 October 2026";

export const TAX_YEARS = ["2026/27", "2027/28", "2028/29", "2029/30", "2030/31"] as const;
export type TaxYear = (typeof TAX_YEARS)[number];

export const CHANGES = {
  /** Thresholds held to 5 April 2031 (last frozen year 2030/31). */
  thresholdsFrozenTo: "5 April 2031",
  savingsRates2027: [0.22, 0.42, 0.47] as const,
  propertyRates2027: [0.22, 0.42, 0.47] as const,
  /** Rise in each property rate from 2027/28. */
  propertyRise: 0.02,
  /** Finance cost relief rate: basic rate, then the property basic rate. */
  financeRelief: { before: 0.2, from2027: 0.22 },
  /** Dividend rates before and from 6 April 2026. */
  dividend2025: [0.0875, 0.3375, 0.3935] as const,
  dividend2026: INV_2026.dividend,
  /** Salary sacrifice NI relief cap from 6 April 2029. */
  sacrificeCap: 2_000,
  sacrificeCapFromYear: 3, // index into TAX_YEARS: 2029/30
  employerNiRate: SACRIFICE_2026.employerNiRate,
  /** Plan 2 threshold, held from April 2027 to 2029/30. */
  plan2Threshold: 29_385,
  plan2Rate: 0.09,
} as const;

export type BudgetInput = {
  /** Gross salary in 2026/27, £ a year. */
  salary: number;
  /** Salary sacrifice pension, % of salary. */
  sacrificePct: number;
  /** Personal pension contributions with relief at source, gross £ a year. */
  rasGross: number;
  /** Taxable savings interest outside ISAs, £ a year. */
  savings: number;
  /** Dividends outside ISAs and pensions, £ a year. */
  dividends: number;
  /** Rental profit before mortgage interest, £ a year. */
  property: number;
  /** Mortgage interest and other finance costs on residential lets, £ a year. */
  financeCosts: number;
  region: "ruk" | "scotland";
  plan: "none" | "plan2";
  /** Yearly pay growth, % (salary only). */
  payGrowth: number;
};

export type YearResult = {
  year: TaxYear;
  salary: number;
  sacrifice: number;
  /** Sacrifice above the £2,000 cap that now pays NI. */
  sacrificeOverCap: number;
  incomeTax: number;
  nonSavingsTax: number;
  savingsTax: number;
  dividendTax: number;
  /** Extra tax from the property rates (2 points on taxable rental profit). */
  propertyExtra: number;
  financeRelief: number;
  employeeNi: number;
  /** Employee NI on the sacrifice above the cap. */
  sacrificeNi: number;
  /** Extra employer NI on the sacrifice above the cap (not your money, but often passed on). */
  employerNiExtra: number;
  studentLoan: number;
  /** All Income Tax, NI and student loan. */
  totalTax: number;
  /** Everything received after tax, NI, student loan, finance costs and pension. */
  net: number;
  /** Gross income from every source. */
  gross: number;
};

const pos = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

function clamp(i: BudgetInput): BudgetInput {
  return {
    salary: pos(i.salary),
    sacrificePct: Math.min(100, pos(i.sacrificePct)),
    rasGross: pos(i.rasGross),
    savings: pos(i.savings),
    dividends: pos(i.dividends),
    property: pos(i.property),
    financeCosts: pos(i.financeCosts),
    region: i.region === "scotland" ? "scotland" : "ruk",
    plan: i.plan === "plan2" ? "plan2" : "none",
    payGrowth: Math.min(20, Math.max(-20, Number.isFinite(i.payGrowth) ? i.payGrowth : 0)),
  };
}

/** One tax year's figures. `t` is the index into TAX_YEARS. */
export function yearResult(raw: BudgetInput, t: number): YearResult {
  const i = clamp(raw);
  const salary = i.salary * Math.pow(1 + i.payGrowth / 100, t);
  const sacrifice = salary * (i.sacrificePct / 100);
  const pay = Math.max(0, salary - sacrifice);
  const from2027 = t >= 1;
  const capOn = t >= CHANGES.sacrificeCapFromYear;
  const scotland = i.region === "scotland";

  const it = incomeTax2026({
    nonSavings: pay + i.property,
    savings: i.savings,
    dividends: i.dividends,
    bandExtension: i.rasGross,
    scotland,
    savings2027: from2027,
  });

  // Allowances go against pay first, so rental profit is the top slice of
  // non-savings income. Every property rate is 2 points higher from 2027/28.
  const paLeft = Math.max(0, it.pa - pay);
  const taxableProperty = Math.max(0, i.property - paLeft);
  const propertyRatesApply = from2027 && !scotland;
  const propertyExtra = propertyRatesApply ? taxableProperty * CHANGES.propertyRise : 0;

  // Finance cost relief: a tax reduction at the (property) basic rate, limited
  // to the rental profit. The adjusted-total-income limit is not modelled.
  const reliefRate = propertyRatesApply ? CHANGES.financeRelief.from2027 : CHANGES.financeRelief.before;
  const financeRelief = Math.min(i.financeCosts, i.property) * reliefRate;

  const sacrificeOverCap = capOn ? Math.max(0, sacrifice - CHANGES.sacrificeCap) : 0;
  const niBase = nationalInsurance(pay).total;
  const employeeNi = nationalInsurance(pay + sacrificeOverCap).total;
  const sacrificeNi = employeeNi - niBase;
  const employerNiExtra = sacrificeOverCap * CHANGES.employerNiRate;

  const studentLoan = i.plan === "plan2" ? Math.max(0, pay - CHANGES.plan2Threshold) * CHANGES.plan2Rate : 0;

  const incomeTax = Math.max(0, it.total + propertyExtra - financeRelief);
  const totalTax = incomeTax + employeeNi + studentLoan;
  const gross = salary + i.savings + i.dividends + i.property;
  const net = gross - sacrifice - i.financeCosts - totalTax - i.rasGross * 0.8;

  return {
    year: TAX_YEARS[t],
    salary,
    sacrifice,
    sacrificeOverCap,
    incomeTax,
    nonSavingsTax: it.nonSavingsTax,
    savingsTax: it.savingsTax,
    dividendTax: it.dividendTax,
    propertyExtra,
    financeRelief,
    employeeNi,
    sacrificeNi,
    employerNiExtra,
    studentLoan,
    totalTax,
    net,
    gross,
  };
}

export type BudgetResult = {
  years: YearResult[];
  /** Change in each year against 2026/27 at the same income (pay growth ignored): the rule changes alone. */
  ruleEffect: { year: TaxYear; savings: number; property: number; sacrifice: number; total: number }[];
  /**
   * With pay growth: extra tax and NI in each year compared with thresholds
   * that had risen in line with pay (the cost of the freeze). 0 with no growth.
   */
  freezeCost: number[];
  /** Change in total tax, 2030/31 vs 2026/27, including pay growth. */
  totalChange: number;
};

/** Every year, plus the effect of the rule changes alone and of the freeze. */
export function budgetChanges(raw: BudgetInput): BudgetResult {
  const i = clamp(raw);
  const years = TAX_YEARS.map((_, t) => yearResult(i, t));

  const flat = { ...i, payGrowth: 0 };
  const base = yearResult(flat, 0);
  const ruleEffect = TAX_YEARS.map((year, t) => {
    const y = yearResult(flat, t);
    const savings = y.savingsTax - base.savingsTax;
    const property = y.propertyExtra - (y.financeRelief - base.financeRelief);
    const sacrifice = y.sacrificeNi;
    return { year, savings, property, sacrifice, total: y.totalTax - base.totalTax };
  });

  // Indexed counterfactual: the same year's rules on income deflated by pay
  // growth, scaled back up. Tax rules are homogeneous in money terms, so this
  // equals tax with every threshold and allowance raised in line with pay.
  const freezeCost = TAX_YEARS.map((_, t) => {
    const g = Math.pow(1 + i.payGrowth / 100, t);
    if (i.payGrowth <= 0 || t === 0) return 0;
    const real = yearResult(
      {
        ...i,
        payGrowth: 0,
        salary: years[t].salary / g,
        rasGross: i.rasGross / g,
        savings: i.savings / g,
        dividends: i.dividends / g,
        property: i.property / g,
        financeCosts: i.financeCosts / g,
      },
      t,
    );
    // The £2,000 cap and the student loan threshold are indexed too.
    return years[t].totalTax - real.totalTax * g;
  });

  return { years, ruleEffect, freezeCost, totalChange: years[years.length - 1].totalTax - years[0].totalTax };
}

/** Extra dividend tax from the April 2026 rise, at the same income (2026/27 vs 2025/26 rates). */
export function dividendRise2026(raw: BudgetInput): number {
  const i = clamp(raw);
  const pay = Math.max(0, i.salary * (1 - i.sacrificePct / 100));
  const it = incomeTax2026({
    nonSavings: pay + i.property,
    savings: i.savings,
    dividends: i.dividends,
    bandExtension: i.rasGross,
    scotland: i.region === "scotland",
  });
  const start = it.taxableNonSavings + it.taxableSavings + it.dividendAllowanceUsed;
  const end = it.taxableNonSavings + it.taxableSavings + it.taxableDividends;
  const belowAdditional = Math.max(0, Math.min(end, it.additionalLimit) - start);
  return belowAdditional * 0.02;
}
