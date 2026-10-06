/**
 * Universal Credit advances, 2026/27.
 *
 * A new claim advance is up to one month's estimated Universal Credit, paid
 * while you wait for the first payment (about 5 weeks). It is an interest-free
 * loan repaid from later payments over up to 24 months. Since April 2025 the
 * total taken from a payment for most debts (advances, overpayments,
 * third-party debts) is capped at 15% of the standard allowance.
 *
 * A budgeting advance is a smaller loan for one-off costs, for people who have
 * been on Universal Credit (or certain benefits) for 6 months.
 */

import { UC_2026 } from "./uc-engine";

export const ADVANCE_2026 = {
  maxMonths: 24,
  /** Overall deductions cap, share of the standard allowance. */
  capShare: 0.15,
  budgeting: { single: 348, couple: 464, children: 812, months: 12, earningsSingle: 2_600, earningsCouple: 3_600 },
} as const;

export type StandardKey = keyof typeof UC_2026.standard;

export const STANDARD_LABEL: Record<StandardKey, string> = {
  singleUnder25: "Single, under 25",
  single25: "Single, 25 or over",
  coupleUnder25: "Couple, both under 25",
  couple25: "Couple, one or both 25 or over",
};

export type AdvanceInput = {
  /** Estimated monthly Universal Credit. */
  estimate: number;
  /** Advance asked for. Capped at the estimate. */
  advance: number;
  /** Months to repay over, 1 to 24. */
  months: number;
  standard: StandardKey;
  /** Other deductions already taken each month that count towards the cap. */
  otherDeductions: number;
};

export type AdvanceResult = {
  advance: number;
  /** Most you could ask for. */
  max: number;
  months: number;
  monthly: number;
  /** Universal Credit paid after the repayment, a month. */
  paymentAfter: number;
  cap: number;
  /** Repayment plus other deductions, a month. */
  totalDeductions: number;
  overCap: boolean;
  /** Fewest months that keep the repayment within the cap after other deductions. */
  minMonthsForCap: number | null;
  /** First 12 months of payments. */
  schedule: { month: number; repayment: number; paid: number; owed: number }[];
};

export function ucAdvance(i: AdvanceInput): AdvanceResult {
  const max = Math.max(0, i.estimate);
  const advance = Math.min(max, Math.max(0, i.advance));
  const months = Math.min(ADVANCE_2026.maxMonths, Math.max(1, Math.round(i.months)));
  const monthly = advance / months;
  const cap = UC_2026.standard[i.standard] * ADVANCE_2026.capShare;
  const other = Math.max(0, i.otherDeductions);
  const totalDeductions = monthly + other;
  const room = cap - other;
  const minMonths = advance <= 0 ? 1 : room > 0 ? Math.ceil(advance / room) : null;
  const minMonthsForCap = minMonths !== null && minMonths <= ADVANCE_2026.maxMonths ? minMonths : null;
  const schedule: AdvanceResult["schedule"] = [];
  let owed = advance;
  for (let m = 1; m <= Math.min(12, Math.max(months, 1)); m++) {
    const repayment = Math.min(owed, monthly);
    owed -= repayment;
    schedule.push({ month: m, repayment, paid: Math.max(0, max - repayment - other), owed });
  }
  return {
    advance,
    max,
    months,
    monthly,
    paymentAfter: Math.max(0, max - monthly - other),
    cap,
    totalDeductions,
    overCap: totalDeductions > cap + 0.005,
    minMonthsForCap,
    schedule,
  };
}

/** Budgeting advance limit for a household. */
export function budgetingAdvanceMax(couple: boolean, children: boolean): number {
  const b = ADVANCE_2026.budgeting;
  return children ? b.children : couple ? b.couple : b.single;
}
