/**
 * What a one-off bonus is really worth, 2026/27.
 *
 * Income Tax is cumulative under PAYE, so the tax on a bonus is the extra
 * tax it causes over the year. National Insurance and student loan are
 * charged on the payment it arrives in, using that pay period's thresholds,
 * and are not recalculated at the year end.
 */

import { computeTakeHome, type StudentPlan, type TaxRegion } from "./take-home-engine";
import { periodNI, periodStudentLoan, PERIODS_PER_YEAR, type PayPeriod } from "./payslip";

export type BonusInput = {
  salary: number;
  bonus: number;
  /** Salary-sacrifice pension on salary, % of salary. */
  pensionPct?: number;
  /** Part of the bonus paid into the pension by sacrifice, £. */
  bonusToPension?: number;
  plan?: StudentPlan;
  region?: TaxRegion;
  period?: PayPeriod;
};

export type PayslipLine = { gross: number; tax: number; ni: number; studentLoan: number; net: number };

export type BonusResult = {
  bonus: number;
  cashBonus: number;
  toPension: number;
  tax: number;
  ni: number;
  studentLoan: number;
  /** Cash you keep from the bonus. */
  kept: number;
  /** Share of the cash bonus lost to tax, NI and student loan, 0–1. */
  deductionRate: number;
  normal: PayslipLine;
  bonusPeriod: PayslipLine;
  /** Salary after sacrifice, plus the cash bonus. */
  yearIncome: number;
};

export function bonusOutcome(input: BonusInput): BonusResult {
  const period = input.period ?? "month";
  const n = PERIODS_PER_YEAR[period];
  const plan = input.plan ?? "none";
  const region = input.region ?? "ruk";
  const bonus = Math.max(0, input.bonus || 0);
  const toPension = Math.min(bonus, Math.max(0, input.bonusToPension || 0));
  const cashBonus = bonus - toPension;
  const salary = Math.max(0, input.salary || 0) * (1 - Math.min(100, Math.max(0, input.pensionPct || 0)) / 100);

  const base = computeTakeHome({ gross: salary, bonus: 0, pensionPct: 0, plan: "none", region });
  const withBonus = computeTakeHome({ gross: salary, bonus: cashBonus, pensionPct: 0, plan: "none", region });

  const normalPay = salary / n;
  const bonusPay = normalPay + cashBonus;
  const normalTax = base.incomeTaxTotal / n;
  const tax = withBonus.incomeTaxTotal - base.incomeTaxTotal;
  const ni = periodNI(bonusPay, period) - periodNI(normalPay, period);
  const studentLoan = periodStudentLoan(bonusPay, plan, period) - periodStudentLoan(normalPay, plan, period);
  const kept = cashBonus - tax - ni - studentLoan;

  const line = (gross: number, t: number): PayslipLine => {
    const nI = periodNI(gross, period);
    const sl = periodStudentLoan(gross, plan, period);
    return { gross, tax: t, ni: nI, studentLoan: sl, net: gross - t - nI - sl };
  };

  return {
    bonus,
    cashBonus,
    toPension,
    tax,
    ni,
    studentLoan,
    kept,
    deductionRate: cashBonus > 0 ? (tax + ni + studentLoan) / cashBonus : 0,
    normal: line(normalPay, normalTax),
    bonusPeriod: line(bonusPay, normalTax + tax),
    yearIncome: salary + cashBonus,
  };
}
