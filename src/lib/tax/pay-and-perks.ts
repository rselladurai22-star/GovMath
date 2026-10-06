/**
 * Pay rises, salary sacrifice and Marriage Allowance, 2026/27.
 *
 * All three build on the take-home engine, so Scottish bands, student loans
 * and the £100,000 Personal Allowance taper are included.
 */

import { hicbc } from "../benefits/family";
import { nationalInsurance, incomeTax } from "./2026-27";
import { scottishIncomeTax } from "./scottish-2026-27";
import { computeTakeHome, studentLoanRepayment, type StudentPlan, type TaxRegion } from "./take-home-engine";

/* ── Pay rise ──────────────────────────────────────────────────── */

export type PayRiseInput = {
  salary: number;
  newSalary: number;
  region: TaxRegion;
  plan: StudentPlan;
  /** Salary-sacrifice pension, % of salary. */
  pensionPct: number;
  /** Inflation over the year, as a decimal, to judge the real change. */
  inflation: number;
  /** Children you get Child Benefit for (for the High Income Child Benefit Charge). */
  children: number;
};

export type PayRiseResult = {
  rise: number;
  risePct: number;
  before: number;
  after: number;
  extra: number;
  /** Share of the rise you keep. */
  keptShare: number;
  /** Extra Child Benefit charge caused by the rise. */
  extraCharge: number;
  /** Extra take-home after any Child Benefit charge. */
  extraAfterCharge: number;
  /** Change in take-home after inflation. */
  realChange: number;
  realChangePct: number;
  /** Pay rise needed just to keep take-home level with inflation. */
  riseToMatchInflation: number;
};

const th = (gross: number, i: Pick<PayRiseInput, "region" | "plan" | "pensionPct">) =>
  computeTakeHome({ gross, bonus: 0, pensionPct: i.pensionPct, plan: i.plan, region: i.region }).takeHome;

export function payRise(i: PayRiseInput): PayRiseResult {
  const salary = Math.max(0, i.salary);
  const newSalary = Math.max(0, i.newSalary);
  const before = th(salary, i);
  const after = th(newSalary, i);
  const extra = after - before;
  const rise = newSalary - salary;
  const kids = Math.max(0, Math.floor(i.children));
  const charge = (gross: number) => (kids > 0 ? hicbc({ children: kids, income: gross * (1 - i.pensionPct / 100), pension: 0, giftAid: 0, weeks: 52 }).charge : 0);
  const extraCharge = charge(newSalary) - charge(salary);
  const extraAfterCharge = extra - extraCharge;
  const realAfter = (after - charge(newSalary)) / (1 + i.inflation);
  const realChange = realAfter - (before - charge(salary));
  // Smallest rise that keeps take-home level with inflation.
  const target = (before - charge(salary)) * (1 + i.inflation);
  let lo = salary;
  let hi = salary * 2 + 10_000;
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    if (th(mid, i) - charge(mid) >= target) hi = mid;
    else lo = mid;
  }
  return {
    rise,
    risePct: salary > 0 ? rise / salary : 0,
    before,
    after,
    extra,
    keptShare: rise > 0 ? extraAfterCharge / rise : 0,
    extraCharge,
    extraAfterCharge,
    realChange,
    realChangePct: before > 0 ? realChange / (before - charge(salary)) : 0,
    riseToMatchInflation: Math.max(0, hi - salary),
  };
}

/* ── Salary sacrifice ──────────────────────────────────────────── */

export type SacrificeKind = "pension" | "cycle" | "other";

export const SACRIFICE_2026 = { employerNiRate: 0.15, employerNiThreshold: 5_000, nlwHourly: 12.71 } as const;

export type SacrificeInput = {
  salary: number;
  /** Salary given up a year. */
  amount: number;
  kind: SacrificeKind;
  region: TaxRegion;
  plan: StudentPlan;
  /** Share (0 to 1) of the employer's NI saving the employer adds to your pension. */
  employerShare: number;
  /** Paid hours a week, for the minimum wage check. */
  hours: number;
};

export type SacrificeResult = {
  before: number;
  after: number;
  /** Fall in take-home pay. */
  cost: number;
  /** Amount sacrificed less what it costs you. */
  saving: number;
  taxSaved: number;
  niSaved: number;
  loanSaved: number;
  employerNiSaved: number;
  /** For a pension: what goes into the pot, including any employer NI added. */
  intoPension: number;
  /** Pay after sacrifice per hour. */
  hourly: number;
  belowMinimumWage: boolean;
};

function tax(gross: number, region: TaxRegion): number {
  return region === "scotland" ? scottishIncomeTax(gross).total : incomeTax(gross).total;
}

export function salarySacrifice(i: SacrificeInput): SacrificeResult {
  const salary = Math.max(0, i.salary);
  const amount = Math.min(salary, Math.max(0, i.amount));
  const reduced = salary - amount;
  const before = computeTakeHome({ gross: salary, bonus: 0, pensionPct: 0, plan: i.plan, region: i.region }).takeHome;
  const taxBefore = tax(salary, i.region);
  const niBefore = nationalInsurance(salary).total;
  const loanBefore = studentLoanRepayment(salary, i.plan);
  // Exempt benefits (pension, cycle to work): Income Tax and NI fall. Other
  // benefits fall under the optional remuneration rules: Income Tax is on the
  // salary given up, so only NI and student loan fall.
  const exempt = i.kind !== "other";
  const taxAfter = exempt ? tax(reduced, i.region) : taxBefore;
  const niAfter = nationalInsurance(reduced).total;
  const loanAfter = studentLoanRepayment(reduced, i.plan);
  const after = reduced - taxAfter - niAfter - loanAfter;
  const cost = before - after;
  const niable = (x: number) => Math.max(0, x - SACRIFICE_2026.employerNiThreshold);
  const employerNiSaved = exempt ? (niable(salary) - niable(reduced)) * SACRIFICE_2026.employerNiRate : 0;
  const intoPension = i.kind === "pension" ? amount + employerNiSaved * Math.max(0, Math.min(1, i.employerShare)) : 0;
  const hourly = i.hours > 0 ? reduced / 52 / i.hours : 0;
  return {
    before,
    after,
    cost,
    saving: amount - cost,
    taxSaved: taxBefore - taxAfter,
    niSaved: niBefore - niAfter,
    loanSaved: loanBefore - loanAfter,
    employerNiSaved,
    intoPension,
    hourly,
    belowMinimumWage: i.hours > 0 && hourly < SACRIFICE_2026.nlwHourly,
  };
}

/* ── Marriage Allowance ────────────────────────────────────────── */

export const MARRIAGE_ALLOWANCE = {
  transfer: 1_260,
  rate: 0.2,
  personalAllowance: 12_570,
  basicLimit: 50_270,
  /** Scottish recipients must not pay more than the intermediate rate. */
  scottishLimit: 43_662,
  /** Earlier years that can still be claimed in 2026/27, each worth £252. */
  backdateYears: ["2022/23", "2023/24", "2024/25", "2025/26"],
} as const;

export type MarriageInput = {
  /** Lower earner, who transfers allowance. */
  transferorIncome: number;
  /** Higher earner, who receives it. */
  recipientIncome: number;
  transferorScotland: boolean;
  recipientScotland: boolean;
  /** Years of backdating to include (0 to 4). */
  backdate: number;
};

export type MarriageResult = {
  eligible: boolean;
  reason: string;
  /** Tax reduction for the recipient this year. */
  recipientSaving: number;
  /** Extra tax the transferor pays because their allowance falls to £11,310. */
  transferorCost: number;
  /** Household gain this year. */
  netGain: number;
  backdated: number;
  total: number;
};

export function marriageAllowance(i: MarriageInput): MarriageResult {
  const m = MARRIAGE_ALLOWANCE;
  const t = Math.max(0, i.transferorIncome);
  const r = Math.max(0, i.recipientIncome);
  const recipientLimit = i.recipientScotland ? m.scottishLimit : m.basicLimit;
  const no = (reason: string): MarriageResult => ({ eligible: false, reason, recipientSaving: 0, transferorCost: 0, netGain: 0, backdated: 0, total: 0 });
  if (t > m.personalAllowance) return no("The lower earner's income is above the £12,570 Personal Allowance.");
  if (r <= m.personalAllowance) return no("The higher earner's income is within their own Personal Allowance, so the extra allowance would save nothing.");
  if (r > recipientLimit) return no(i.recipientScotland ? "The higher earner pays Scottish Income Tax above the intermediate rate." : "The higher earner pays tax above the basic rate.");
  const recipientTax = tax(r, i.recipientScotland ? "scotland" : "ruk");
  const recipientSaving = Math.min(m.transfer * m.rate, recipientTax);
  const reducedPa = m.personalAllowance - m.transfer;
  const transferorCost = Math.max(0, Math.min(m.transfer, t - reducedPa)) * (i.transferorScotland ? 0.19 : 0.2);
  const netGain = Math.max(0, recipientSaving - transferorCost);
  const years = Math.max(0, Math.min(m.backdateYears.length, Math.round(i.backdate)));
  // Backdated years assume the same incomes, so the same gain each year.
  const backdated = netGain * years;
  return {
    eligible: netGain > 0,
    reason: netGain > 0 ? "You can transfer £1,260 of Personal Allowance." : "The transfer would cost the lower earner as much as it saves.",
    recipientSaving,
    transferorCost,
    netGain,
    backdated,
    total: netGain + backdated,
  };
}
