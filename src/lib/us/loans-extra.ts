/**
 * Extra loan helpers for the US auto loan and credit card pages: a balance
 * transfer with a promotional rate, and the 2025–2028 car loan interest
 * deduction limit (One Big Beautiful Bill Act, IRS Schedule 1-A).
 */

import type { Schedule, ScheduleRow } from "./loans";

export type BalanceTransfer = Schedule & {
  /** The transfer fee, added to the balance on day one. */
  fee: number;
  /** Balance left when the promotional rate ends (0 if cleared before). */
  leftAtPromoEnd: number;
};

/**
 * Moves a card balance to a new card: the fee (a share of the balance) is
 * added to the balance, `promoAprPct` applies for `promoMonths` (usually 0%),
 * then `afterAprPct`. A fixed `payment` is made each month.
 */
export function balanceTransfer(
  balance: number,
  feePct: number,
  promoMonths: number,
  promoAprPct: number,
  afterAprPct: number,
  payment: number,
  maxMonths = 1_200,
): BalanceTransfer {
  const fee = Math.max(0, balance) * Math.max(0, feePct) / 100;
  let b = Math.max(0, balance) + fee;
  const pay = Math.max(0, payment);
  const promo = Math.max(0, Math.round(promoMonths));
  const rows: ScheduleRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let leftAtPromoEnd = 0;
  for (let m = 1; b > 0.005 && m <= maxMonths; m++) {
    const apr = m <= promo ? promoAprPct : afterAprPct;
    const interest = (b * Math.max(0, apr)) / 100 / 12;
    if (pay <= interest) break; // the payment never clears the interest
    const due = Math.min(b + interest, pay);
    b = Math.max(0, b + interest - due);
    totalInterest += interest;
    totalPaid += due;
    rows.push({ month: m, payment: due, interest, principal: due - interest, balance: b });
    if (m === promo) leftAtPromoEnd = b;
  }
  return { payment: pay, rows, months: b > 0.005 ? Infinity : rows.length, totalInterest, totalPaid, fee, leftAtPromoEnd };
}

/** Car loan interest deduction, 2025 to 2028: the most a year, before the phase-out. */
export const CAR_INTEREST_CAP = 10_000;

/**
 * The most car loan interest you can deduct in a year: $10,000, cut by $200
 * for each $1,000 (or part of $1,000) of modified AGI over $100,000
 * ($200,000 married filing jointly). Gone at $150,000 ($250,000).
 */
export function carInterestDeductionLimit(magi: number, joint: boolean): number {
  const over = Math.max(0, magi - (joint ? 200_000 : 100_000));
  return Math.max(0, CAR_INTEREST_CAP - 200 * Math.ceil(over / 1_000));
}
