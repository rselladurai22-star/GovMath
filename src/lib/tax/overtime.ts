/**
 * What overtime is worth after tax, 2026/27.
 *
 * Regular overtime (every pay period) raises your yearly income, so the extra
 * Income Tax is the annual difference spread across the year. One-off
 * overtime is taxed in the period it is paid, like a bonus. National
 * Insurance and student loan are always worked out per pay period.
 */

import { computeTakeHome, type StudentPlan, type TaxRegion } from "./take-home-engine";
import { periodNI, periodStudentLoan, PERIODS_PER_YEAR, type PayPeriod } from "./payslip";

export type OvertimeTier = { hours: number; multiplier: number };

export type OvertimeInput = {
  /** Basic yearly salary. */
  salary: number;
  /** Contracted hours a week, used to find the hourly rate. */
  hours: number;
  /** Overtime in each pay period. */
  tiers: OvertimeTier[];
  /** True if this overtime happens every pay period. */
  regular?: boolean;
  period?: PayPeriod;
  pensionPct?: number;
  /** Whether the pension percentage also applies to overtime pay. */
  pensionOnOvertime?: boolean;
  plan?: StudentPlan;
  region?: TaxRegion;
};

export type OvertimeResult = {
  hourly: number;
  /** Overtime pay in one pay period, before deductions. */
  gross: number;
  pension: number;
  tax: number;
  ni: number;
  studentLoan: number;
  /** Overtime pay kept in one pay period. */
  kept: number;
  overtimeHours: number;
  keptPerHour: number;
  /** Share of overtime pay lost to deductions, 0–1. */
  deductionRate: number;
  normalNet: number;
  overtimeNet: number;
};

export function overtimeOutcome(i: OvertimeInput): OvertimeResult {
  const period = i.period ?? "month";
  const n = PERIODS_PER_YEAR[period];
  const plan = i.plan ?? "none";
  const region = i.region ?? "ruk";
  const pct = Math.min(100, Math.max(0, i.pensionPct ?? 0)) / 100;
  const salary = Math.max(0, i.salary || 0);
  const hourly = i.hours > 0 ? salary / (i.hours * 52) : 0;
  const overtimeHours = i.tiers.reduce((a, t) => a + Math.max(0, t.hours), 0);
  const gross = i.tiers.reduce((a, t) => a + Math.max(0, t.hours) * hourly * Math.max(1, t.multiplier), 0);
  const pension = i.pensionOnOvertime ? gross * pct : 0;
  const cash = gross - pension;

  const basePay = (salary * (1 - pct)) / n;
  const base = computeTakeHome({ gross: salary * (1 - pct), bonus: 0, pensionPct: 0, plan: "none", region });
  const extraYear = i.regular === false ? cash : cash * n;
  const withOt = computeTakeHome({ gross: salary * (1 - pct), bonus: extraYear, pensionPct: 0, plan: "none", region });
  const tax = (withOt.incomeTaxTotal - base.incomeTaxTotal) / (i.regular === false ? 1 : n);

  const ni = periodNI(basePay + cash, period) - periodNI(basePay, period);
  const studentLoan = periodStudentLoan(basePay + cash, plan, period) - periodStudentLoan(basePay, plan, period);
  const kept = cash - tax - ni - studentLoan;
  const normalNet = basePay - base.incomeTaxTotal / n - periodNI(basePay, period) - periodStudentLoan(basePay, plan, period);

  return {
    hourly,
    gross,
    pension,
    tax,
    ni,
    studentLoan,
    kept,
    overtimeHours,
    keptPerHour: overtimeHours > 0 ? kept / overtimeHours : 0,
    deductionRate: cash > 0 ? (tax + ni + studentLoan) / cash : 0,
    normalNet,
    overtimeNet: normalNet + kept,
  };
}
