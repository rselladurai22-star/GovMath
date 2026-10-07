/**
 * Federal student loan repayment plans for the US student loan page:
 * graduated payments, the tiered standard plan for loans made from July 1,
 * 2026, and the Repayment Assistance Plan (RAP) created by the One Big
 * Beautiful Bill Act (P.L. 119-21), open from July 1, 2026.
 *
 * RAP, as the law and the Department of Education describe it: the monthly
 * payment is a share of adjusted gross income (AGI) ÷ 12, 1% for AGI over
 * $10,000 up to $20,000, rising one point for each further $10,000, to 10%
 * over $100,000; $10 a month at $10,000 or less. It falls by $50 for each
 * dependent, but never below $10. Interest the payment does not cover is not
 * charged, and if a payment cuts principal by less than $50 the government
 * adds a match (the lesser of $50 or the payment, less the principal paid).
 * Any balance left after 360 qualifying payments (30 years) is forgiven.
 */

import type { ScheduleRow } from "./loans";

/** RAP share of AGI (0.01 to 0.10), or 0 at $10,000 or less (the $10 minimum applies). */
export function rapRate(agi: number): number {
  if (agi <= 10_000) return 0;
  return Math.min(10, Math.ceil(agi / 10_000) - 1) / 100;
}

/** The RAP monthly payment for an AGI and number of dependents. */
export function rapPayment(agi: number, dependents: number): number {
  const base = agi <= 10_000 ? 10 : (Math.max(0, agi) * rapRate(agi)) / 12;
  return Math.max(10, base - 50 * Math.max(0, Math.round(dependents)));
}

export type RapYear = { year: number; payment: number; balance: number };

export type Rap = {
  firstPayment: number;
  /** Payments made: until paid off, or 360 if the rest is forgiven. */
  months: number;
  paidOff: boolean;
  totalPaid: number;
  /** Unpaid interest not charged. */
  waivedInterest: number;
  /** Principal the government matched. */
  matched: number;
  /** Balance forgiven after 360 payments. */
  forgiven: number;
  years: RapYear[];
};

/**
 * Runs RAP month by month. AGI grows by `agiGrowthPct` a year (the payment is
 * recalculated each year); `extra` is paid on top of the required payment.
 */
export function rapPlan(balance: number, aprPct: number, agi: number, dependents: number, agiGrowthPct = 0, extra = 0, maxPayments = 360): Rap {
  const r = Math.max(0, aprPct) / 100 / 12;
  let b = Math.max(0, balance);
  let income = Math.max(0, agi);
  let required = rapPayment(income, dependents);
  const firstPayment = required;
  let totalPaid = 0;
  let waivedInterest = 0;
  let matched = 0;
  let m = 0;
  const years: RapYear[] = [{ year: 0, payment: required, balance: b }];
  while (b > 0.005 && m < maxPayments) {
    m += 1;
    if (m > 1 && (m - 1) % 12 === 0) {
      income *= 1 + agiGrowthPct / 100;
      required = rapPayment(income, dependents);
    }
    const interest = b * r;
    const pay = Math.min(b + interest, required + Math.max(0, extra));
    let principalPaid = 0;
    if (pay >= interest) principalPaid = pay - interest;
    else waivedInterest += interest - pay;
    const match = Math.min(Math.max(0, Math.min(50, required) - principalPaid), Math.max(0, b - principalPaid));
    b = Math.max(0, b - principalPaid - match);
    totalPaid += pay;
    matched += match;
    if (m % 12 === 0 || b <= 0.005) years.push({ year: Math.ceil(m / 12), payment: required, balance: b });
  }
  const paidOff = b <= 0.005;
  return { firstPayment, months: m, paidOff, totalPaid, waivedInterest, matched, forgiven: paidOff ? 0 : b, years };
}

/** Standard plan term for federal loans first made on or after July 1, 2026, by the amount borrowed. */
export function tieredStandardYears(balance: number): 10 | 15 | 20 | 25 {
  if (balance < 25_000) return 10;
  if (balance < 50_000) return 15;
  if (balance < 100_000) return 20;
  return 25;
}

export type Graduated = {
  first: number;
  last: number;
  rows: ScheduleRow[];
  months: number;
  totalInterest: number;
  totalPaid: number;
  /** The first payment does not cover the first month's interest. */
  belowInterest: boolean;
};

/** Balance left after `months` with a starting payment that rises `stepPct` every `stepEvery` months. */
function leftover(balance: number, r: number, months: number, first: number, stepEvery: number, g: number): number {
  let b = balance;
  for (let m = 1; m <= months; m++) {
    const pay = first * Math.pow(g, Math.floor((m - 1) / stepEvery));
    b = b * (1 + r) - pay;
  }
  return b;
}

/**
 * A graduated plan: payments start low and rise by `stepPct` every
 * `stepEvery` months, set so the loan is repaid in `months`. `extra` is
 * paid on top each month.
 */
export function graduatedPlan(balance: number, aprPct: number, months: number, stepPct: number, stepEvery = 24, extra = 0): Graduated {
  const r = Math.max(0, aprPct) / 100 / 12;
  const n = Math.max(1, Math.round(months));
  const g = 1 + Math.max(0, stepPct) / 100;
  const p = Math.max(0, balance);
  // The leftover balance is linear in the first payment: solve for zero.
  const at0 = leftover(p, r, n, 0, stepEvery, g);
  const at1 = leftover(p, r, n, 1, stepEvery, g);
  const first = at0 / (at0 - at1);
  let b = p;
  const rows: ScheduleRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let last = first;
  for (let m = 1; b > 0.005 && m <= n; m++) {
    const scheduled = first * Math.pow(g, Math.floor((m - 1) / stepEvery));
    last = scheduled;
    const interest = b * r;
    const pay = Math.min(b + interest, scheduled + Math.max(0, extra));
    b = Math.max(0, b + interest - pay);
    totalInterest += interest;
    totalPaid += pay;
    rows.push({ month: m, payment: pay, interest, principal: pay - interest, balance: b });
  }
  return { first, last, rows, months: rows.length, totalInterest, totalPaid, belowInterest: first < p * r };
}
