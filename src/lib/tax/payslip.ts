/**
 * Pay-period deductions, 2026/27.
 *
 * Employee National Insurance and student loan repayments are worked out on
 * each payment using that period's thresholds, with no year-end adjustment.
 * Income Tax is cumulative under PAYE, so over a year it matches the annual
 * calculation; the month a bonus lands carries the extra tax that bonus causes.
 */

import { STUDENT_PLANS, type StudentPlan } from "./take-home-engine";

export type PayPeriod = "month" | "week";

/** HMRC Class 1 employee thresholds per pay period, 2026/27. */
export const NI_PERIOD_THRESHOLDS: Record<PayPeriod, { pt: number; uel: number }> = {
  month: { pt: 1048, uel: 4189 },
  week: { pt: 242, uel: 967 },
};

export const PERIODS_PER_YEAR: Record<PayPeriod, number> = { month: 12, week: 52 };

/** Employee Class 1 NI on one payment (category A). */
export function periodNI(pay: number, period: PayPeriod = "month"): number {
  const { pt, uel } = NI_PERIOD_THRESHOLDS[period];
  const p = Math.max(0, pay || 0);
  const main = Math.max(0, Math.min(p, uel) - pt) * 0.08;
  const upper = Math.max(0, p - uel) * 0.02;
  return main + upper;
}

/** Student loan repayment on one payment, using the period threshold. */
export function periodStudentLoan(pay: number, plan: StudentPlan, period: PayPeriod = "month"): number {
  if (plan === "none") return 0;
  const spec = STUDENT_PLANS[plan];
  const threshold = spec.threshold / PERIODS_PER_YEAR[period];
  return Math.max(0, (pay || 0) - threshold) * spec.rate;
}
