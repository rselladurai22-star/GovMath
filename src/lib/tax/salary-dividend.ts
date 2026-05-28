/**
 * Director's Salary vs Dividend optimiser — 2025/26.
 *
 * Common patterns for small-company directors:
 *   (a) £0 salary, all dividends            (loses NI year for State Pension)
 *   (b) £12,570 salary (PA), rest dividends (most common — uses PA fully)
 *   (c) £nnn salary (NI Secondary Threshold), rest dividends
 *
 * We compute net cash to the director after Corporation Tax (on remaining
 * profit) + Income Tax + dividend tax + employee/employer NI.
 *
 * Corporation Tax 2025/26:
 *   small profits rate (≤£50k):    19%
 *   marginal relief band (£50k–£250k):  effective 26.5% on marginal £
 *   main rate (>£250k):            25%
 *
 * This optimiser is simplified: it assumes a single-director company,
 * one-person extraction, sufficient profit to cover the chosen salary,
 * salary is wholly deductible against CT.
 */

import { incomeTax, nationalInsurance } from "./2025-26";
import { dividendTax } from "./dividend";

export const CORP_TAX_2025_26 = {
  smallProfitsRate: 0.19,
  mainRate: 0.25,
  marginalRate: 0.265, // effective marginal between £50k and £250k
  smallProfitsLimit: 50000,
  upperLimit: 250000,
} as const;

/** Approximate CT due on annual profits. */
export function corporationTax(profit: number): number {
  if (profit <= 0) return 0;
  const c = CORP_TAX_2025_26;
  if (profit <= c.smallProfitsLimit) return profit * c.smallProfitsRate;
  if (profit >= c.upperLimit) return profit * c.mainRate;
  const small = c.smallProfitsLimit * c.smallProfitsRate;
  const marginal = (profit - c.smallProfitsLimit) * c.marginalRate;
  return small + marginal;
}

export type SalaryDividendInput = {
  /** Profit BEFORE salary, CT or dividends. */
  preTaxProfit: number;
  /** Director's chosen salary. */
  salary: number;
};

export type SalaryDividendResult = {
  salary: number;
  employerNI: number;
  profitAfterSalary: number;
  corporationTax: number;
  distributableDividends: number;
  incomeTaxOnSalary: number;
  employeeNI: number;
  dividendTax: number;
  takeHome: number;
};

const EMPLOYER_NI_RATE = 0.15; // 2025/26
const EMPLOYER_NI_THRESHOLD = 5000; // Secondary Threshold from April 2025

function employerNI(salary: number): number {
  return Math.max(0, salary - EMPLOYER_NI_THRESHOLD) * EMPLOYER_NI_RATE;
}

export function salaryDividendPlan(input: SalaryDividendInput): SalaryDividendResult {
  const salary = Math.max(0, input.salary);
  const empNI = employerNI(salary);
  const profitAfterSalary = Math.max(0, input.preTaxProfit - salary - empNI);
  const ct = corporationTax(profitAfterSalary);
  const distributable = Math.max(0, profitAfterSalary - ct);

  const it = incomeTax(salary).total;
  const eeNI = nationalInsurance(salary).total;
  const div = dividendTax(salary, distributable).total;

  const takeHome = salary - it - eeNI + distributable - div;

  return {
    salary,
    employerNI: empNI,
    profitAfterSalary,
    corporationTax: ct,
    distributableDividends: distributable,
    incomeTaxOnSalary: it,
    employeeNI: eeNI,
    dividendTax: div,
    takeHome,
  };
}
