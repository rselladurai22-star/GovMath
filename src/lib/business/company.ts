/**
 * Limited company engine, 2026/27: Corporation Tax with marginal relief,
 * the director's salary-and-dividend split, and the full cost of an
 * employee.
 *
 * Corporation Tax (financial years 2025 and 2026, unchanged):
 *   19% on profits up to £50,000, 25% from £250,000. In between, 25% less
 *   marginal relief = 3/200 × (£250,000 − augmented profits) × taxable ÷ augmented.
 *   Both limits are divided by 1 + associated companies and pro-rated for
 *   accounting periods shorter than 12 months.
 *
 * Employer NI 2026/27: 15% above £5,000 a year; Employment Allowance £10,500
 * (not for companies whose only employee is a director). 0% up to £50,270 for
 * employees under 21 and apprentices under 25.
 *
 * Sources: gov.uk/corporation-tax-rates, gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027.
 */

import { incomeTax, nationalInsurance } from "../tax/2026-27";
import { scottishIncomeTax } from "../tax/scottish-2026-27";
import { dividendTax } from "../tax/dividend";

const CT = {
  smallRate: 0.19,
  mainRate: 0.25,
  lowerLimit: 50_000,
  upperLimit: 250_000,
  /** Marginal relief fraction. */
  fraction: 3 / 200,
  /** Large companies pay by quarterly instalments above this. */
  largeLimit: 1_500_000,
} as const;

export type CorporationTaxInput = {
  /** Taxable profits for the period, after allowable expenses and capital allowances. */
  profit: number;
  /** Other companies under the same control (not counting this one). */
  associated: number;
  /** Length of the accounting period in months (1–12). */
  months: number;
  /** Dividends received from non-group companies (count towards augmented profits, not taxed). */
  dividendsReceived: number;
};

export type CorporationTaxResult = {
  profit: number;
  augmented: number;
  lowerLimit: number;
  upperLimit: number;
  band: "small" | "marginal" | "main" | "none";
  /** Tax at 25% before marginal relief. */
  atMainRate: number;
  marginalRelief: number;
  tax: number;
  effectiveRate: number;
  /** Tax on the next £100 of profit. */
  marginalRate: number;
  afterTax: number;
  /** Pays by quarterly instalments. */
  large: boolean;
};

function ctCore(profit: number, i: CorporationTaxInput) {
  const share = Math.min(12, Math.max(1, i.months)) / 12 / (1 + Math.max(0, Math.floor(i.associated)));
  const lower = CT.lowerLimit * share;
  const upper = CT.upperLimit * share;
  const n = Math.max(0, profit);
  const a = n + Math.max(0, i.dividendsReceived);
  if (n <= 0) return { tax: 0, relief: 0, lower, upper, a, band: "none" as const };
  if (a <= lower) return { tax: n * CT.smallRate, relief: 0, lower, upper, a, band: "small" as const };
  if (a >= upper) return { tax: n * CT.mainRate, relief: 0, lower, upper, a, band: "main" as const };
  const relief = CT.fraction * (upper - a) * (n / a);
  return { tax: n * CT.mainRate - relief, relief, lower, upper, a, band: "marginal" as const };
}

export function corporationTaxFull(i: CorporationTaxInput): CorporationTaxResult {
  const profit = Math.max(0, i.profit);
  const c = ctCore(profit, i);
  const next = ctCore(profit + 100, i);
  const share = Math.min(12, Math.max(1, i.months)) / 12 / (1 + Math.max(0, Math.floor(i.associated)));
  return {
    profit,
    augmented: c.a,
    lowerLimit: c.lower,
    upperLimit: c.upper,
    band: c.band,
    atMainRate: profit * CT.mainRate,
    marginalRelief: c.relief,
    tax: c.tax,
    effectiveRate: profit > 0 ? c.tax / profit : 0,
    marginalRate: (next.tax - c.tax) / 100,
    afterTax: profit - c.tax,
    large: c.a > CT.largeLimit * share,
  };
}

/* ── Employer costs ─────────────────────────────── */

export const EMPLOYER = {
  niRate: 0.15,
  secondaryThreshold: 5_000,
  /** Upper secondary threshold for under-21s and apprentices under 25. */
  upperSecondary: 50_270,
  employmentAllowance: 10_500,
  /** Automatic enrolment qualifying earnings band, frozen for 2026/27. */
  aeLower: 6_240,
  aeUpper: 50_270,
  aeTrigger: 10_000,
  aeEmployerMin: 0.03,
} as const;

/** Employer Class 1 NI on one employee's pay for the year. */
export function employerNi(pay: number, relief: "none" | "under21" | "apprentice" = "none"): number {
  const p = Math.max(0, pay);
  if (relief !== "none") return Math.max(0, p - EMPLOYER.upperSecondary) * EMPLOYER.niRate;
  return Math.max(0, p - EMPLOYER.secondaryThreshold) * EMPLOYER.niRate;
}

export type EmployeeCostInput = {
  salary: number;
  bonus: number;
  /** Employer pension contribution as a share of qualifying earnings (or of pay if `pensionOnFullPay`). */
  pensionPct: number;
  pensionOnFullPay: boolean;
  /** Employee salary sacrifice into pension, as a share of salary. */
  sacrificePct: number;
  relief: "none" | "under21" | "apprentice";
  /** Taxable benefits in kind a year (Class 1A NI at 15%). */
  benefits: number;
  headcount: number;
  /** Apply the Employment Allowance against the whole payroll. */
  employmentAllowance: boolean;
};

export type EmployeeCost = {
  /** Pay after any salary sacrifice. */
  pay: number;
  sacrificed: number;
  employerNi: number;
  class1a: number;
  pension: number;
  /** Cost of one employee before the Employment Allowance. */
  costEach: number;
  /** Extra cost on top of gross pay (salary + bonus), as a share. */
  onCost: number;
  team: number;
  teamNi: number;
  allowanceUsed: number;
  /** Whole payroll after the Employment Allowance. */
  teamCost: number;
  /** Employer NI saved by the salary sacrifice, each. */
  sacrificeNiSaving: number;
};

export function employeeCost(i: EmployeeCostInput): EmployeeCost {
  const gross = Math.max(0, i.salary) + Math.max(0, i.bonus);
  const sacrificed = Math.max(0, i.salary) * Math.min(1, Math.max(0, i.sacrificePct));
  const pay = gross - sacrificed;
  const ni = employerNi(pay, i.relief);
  const class1a = Math.max(0, i.benefits) * EMPLOYER.niRate;
  const qualifying = Math.max(0, Math.min(pay + sacrificed, EMPLOYER.aeUpper) - EMPLOYER.aeLower);
  const base = i.pensionOnFullPay ? pay + sacrificed : qualifying;
  const pension = base * Math.max(0, i.pensionPct) + sacrificed;
  const costEach = pay + ni + class1a + pension;
  const n = Math.max(1, Math.floor(i.headcount));
  const teamNi = (ni + class1a) * n;
  const allowanceUsed = i.employmentAllowance ? Math.min(EMPLOYER.employmentAllowance, ni * n) : 0;
  const team = costEach * n;
  return {
    pay,
    sacrificed,
    employerNi: ni,
    class1a,
    pension,
    costEach,
    onCost: gross > 0 ? costEach / gross - 1 : 0,
    team,
    teamNi,
    allowanceUsed,
    teamCost: team - allowanceUsed,
    sacrificeNiSaving: employerNi(gross, i.relief) - ni,
  };
}

/* ── Director: salary and dividends ─────────────────────────────── */

export type DirectorInput = {
  /** Company profit before the director's salary, employer NI and Corporation Tax. */
  profit: number;
  salary: number;
  /** Employer pension contribution (deductible, no NI). */
  pension: number;
  /** The company can claim the Employment Allowance (has another employee). */
  employmentAllowance: boolean;
  scottish: boolean;
  associated: number;
  /** Other personal income, such as a job or rent, taxed first. */
  otherIncome: number;
};

export type DirectorPlan = {
  salary: number;
  employerNi: number;
  pension: number;
  profitBeforeTax: number;
  corporationTax: number;
  dividends: number;
  incomeTax: number;
  employeeNi: number;
  dividendTax: number;
  /** Cash to the director after all personal tax. */
  takeHome: number;
  /** Take-home plus the pension contribution. */
  totalValue: number;
  /** All tax: CT, employer and employee NI, Income Tax and dividend tax. */
  totalTax: number;
  /** Salary at or above the Lower Earnings Limit: the year counts for State Pension. */
  qualifyingYear: boolean;
};

export const LOWER_EARNINGS_LIMIT = 6_708;

/** All post-tax profit is paid out as dividends in the same tax year. */
/** Highest salary the profit can pay once employer NI is added. */
function maxSalary(profit: number, employmentAllowance: boolean): number {
  const p = Math.max(0, profit);
  if (p <= EMPLOYER.secondaryThreshold) return p;
  const plain = (p + EMPLOYER.niRate * EMPLOYER.secondaryThreshold) / (1 + EMPLOYER.niRate);
  if (!employmentAllowance) return plain;
  // While the allowance covers the NI, salary can use the whole profit.
  if (employerNi(p) <= EMPLOYER.employmentAllowance) return p;
  return (p + EMPLOYER.niRate * EMPLOYER.secondaryThreshold + EMPLOYER.employmentAllowance) / (1 + EMPLOYER.niRate);
}

export function directorPlan(i: DirectorInput): DirectorPlan {
  const salary = Math.max(0, Math.min(i.salary, maxSalary(i.profit, i.employmentAllowance)));
  const ni = employerNi(salary);
  const eniCost = i.employmentAllowance ? Math.max(0, ni - EMPLOYER.employmentAllowance) : ni;
  const pension = Math.max(0, Math.min(i.pension, Math.max(0, i.profit - salary - eniCost)));
  const profitBeforeTax = Math.max(0, i.profit - salary - eniCost - pension);
  const ct = corporationTaxFull({ profit: profitBeforeTax, associated: i.associated, months: 12, dividendsReceived: 0 }).tax;
  const dividends = Math.max(0, profitBeforeTax - ct);
  const other = Math.max(0, i.otherIncome);
  const earned = salary + other;
  const itFn = (n: number) => (i.scottish ? scottishIncomeTax(n).total : incomeTax(n).total);
  // Tax on salary is the extra Income Tax it adds on top of other income.
  const it = itFn(earned) - itFn(other);
  // Dividends sit on top of all other income.
  const dt = dividendTax(earned, dividends).total;
  const eeNi = nationalInsurance(salary).total;
  const takeHome = salary - it - eeNi + dividends - dt;
  return {
    salary,
    employerNi: eniCost,
    pension,
    profitBeforeTax,
    corporationTax: ct,
    dividends,
    incomeTax: it,
    employeeNi: eeNi,
    dividendTax: dt,
    takeHome,
    totalValue: takeHome + pension,
    totalTax: ct + eniCost + it + eeNi + dt,
    qualifyingYear: salary >= LOWER_EARNINGS_LIMIT,
  };
}

/** Search salaries in £100 steps, then £10 around the best, for the highest take-home. */
export function bestSalary(i: Omit<DirectorInput, "salary">): DirectorPlan {
  const top = Math.floor(maxSalary(i.profit, i.employmentAllowance));
  const better = (a: DirectorPlan, b: DirectorPlan) => (b.takeHome > a.takeHome + 0.005 ? b : a);
  let best = directorPlan({ ...i, salary: 0 });
  // The usual thresholds can sit between the £100 steps.
  for (const s of [5_000, LOWER_EARNINGS_LIMIT, 12_570, 50_270, top]) if (s <= top) best = better(best, directorPlan({ ...i, salary: s }));
  for (let s = 100; s <= top; s += 100) best = better(best, directorPlan({ ...i, salary: s }));
  const centre = best.salary;
  for (let s = Math.max(0, centre - 100); s <= Math.min(top, centre + 100); s += 10) best = better(best, directorPlan({ ...i, salary: s }));
  return best;
}

