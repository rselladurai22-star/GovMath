/**
 * Contractor take-home inside and outside IR35, 2026/27.
 *
 * Inside IR35 (via an umbrella company): the umbrella takes its margin, then
 * pays employer NI (15% above £5,000) and the 0.5% Apprenticeship Levy out of
 * the assignment income before paying you a salary taxed through PAYE.
 *
 * Outside IR35 (through your own limited company): the company pays you a
 * salary (default £12,570), pays employer NI on it (no Employment Allowance
 * for a sole-director company), pays Corporation Tax on the profit, and pays
 * the rest out as dividends.
 */

import { computeTakeHome, type StudentPlan, type TaxRegion } from "./take-home-engine";
import { corporationTax } from "./salary-dividend";
import { dividendTax } from "./dividend";
import { incomeTax, nationalInsurance } from "./2026-27";
import { scottishIncomeTax } from "./scottish-2026-27";

export const EMPLOYER_NI_RATE = 0.15;
export const SECONDARY_THRESHOLD = 5_000;
export const APPRENTICESHIP_LEVY = 0.005;

export type IR35Input = {
  dayRate: number;
  days: number;
  /** Umbrella margin, £ a week (inside). */
  umbrellaWeekly?: number;
  /** Business expenses through the company, £ a year (outside). */
  expenses?: number;
  /** Director's salary (outside). */
  salary?: number;
  /** Employer pension contribution from the company, £ a year (outside). */
  companyPension?: number;
  /** Salary sacrifice pension through the umbrella, % (inside). */
  pensionPct?: number;
  plan?: StudentPlan;
  region?: TaxRegion;
};

export type InsideResult = {
  income: number;
  margin: number;
  employerCosts: number;
  grossSalary: number;
  pension: number;
  incomeTax: number;
  ni: number;
  studentLoan: number;
  takeHome: number;
};

export type OutsideResult = {
  income: number;
  expenses: number;
  salary: number;
  employerNI: number;
  pension: number;
  profit: number;
  corporationTax: number;
  dividends: number;
  salaryTax: number;
  salaryNI: number;
  dividendTax: number;
  takeHome: number;
};

export function insideIR35(i: IR35Input): InsideResult {
  const income = Math.max(0, i.dayRate) * Math.max(0, i.days);
  const margin = Math.max(0, i.umbrellaWeekly ?? 25) * 52;
  const pot = Math.max(0, income - margin);
  // pot = G + 15% × (G − 5,000) + 0.5% × G, when G is above the threshold.
  const grossSalary =
    pot > SECONDARY_THRESHOLD * (1 + APPRENTICESHIP_LEVY)
      ? (pot + EMPLOYER_NI_RATE * SECONDARY_THRESHOLD) / (1 + EMPLOYER_NI_RATE + APPRENTICESHIP_LEVY)
      : pot / (1 + APPRENTICESHIP_LEVY);
  const snap = computeTakeHome({ gross: grossSalary, bonus: 0, pensionPct: i.pensionPct ?? 0, plan: i.plan ?? "none", region: i.region ?? "ruk" });
  return {
    income,
    margin,
    employerCosts: pot - grossSalary,
    grossSalary,
    pension: snap.pensionContribution,
    incomeTax: snap.incomeTaxTotal,
    ni: snap.ni.total,
    studentLoan: snap.studentLoan,
    takeHome: snap.takeHome,
  };
}

export function outsideIR35(i: IR35Input): OutsideResult {
  const income = Math.max(0, i.dayRate) * Math.max(0, i.days);
  const expenses = Math.max(0, i.expenses ?? 0);
  const pension = Math.max(0, i.companyPension ?? 0);
  const salary = Math.min(Math.max(0, i.salary ?? 12_570), Math.max(0, income - expenses - pension));
  const employerNI = Math.max(0, salary - SECONDARY_THRESHOLD) * EMPLOYER_NI_RATE;
  const profit = Math.max(0, income - expenses - pension - salary - employerNI);
  const ct = corporationTax(profit);
  const dividends = profit - ct;
  const region = i.region ?? "ruk";
  const salaryTax = region === "scotland" ? scottishIncomeTax(salary).total : incomeTax(salary).total;
  const salaryNI = nationalInsurance(salary).total;
  const divTax = dividendTax(salary, dividends).total;
  // Student loans count dividends too; repaid through Self Assessment.
  const plan = i.plan ?? "none";
  const sl = plan === "none" ? 0 : computeTakeHome({ gross: salary + dividends, bonus: 0, pensionPct: 0, plan, region }).studentLoan;
  return {
    income,
    expenses,
    salary,
    employerNI,
    pension,
    profit,
    corporationTax: ct,
    dividends,
    salaryTax,
    salaryNI,
    dividendTax: divTax + sl,
    takeHome: salary - salaryTax - salaryNI + dividends - divTax - sl,
  };
}
