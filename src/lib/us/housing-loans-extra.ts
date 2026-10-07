/**
 * Small helpers for the US mortgage, refinance and loan calculators, built on
 * the tested engines in loans.ts and mortgage.ts:
 * - PMI milestones under the Homeowners Protection Act (request at 80% of the
 *   original value on the actual schedule, automatic end at 78% on the
 *   original schedule, final end at the loan's midpoint);
 * - the true APR of a loan with an origination fee;
 * - cumulative costs over time for a refinance, for the chart.
 */

import { amortize, monthlyPayment, type Schedule } from "./loans";

export type PmiMilestones = {
  /** Month the balance reaches 80% of the price with any extra payments (you can ask to cancel). 0 if it starts there. */
  requestMonth: number;
  /** Month the original schedule (no extra payments) reaches 78% of the price: automatic end. */
  automaticMonth: number;
  /** The loan's midpoint: PMI must end by then if you are current. */
  midpointMonth: number;
};

function firstAt(s: Schedule, limit: number): number {
  const row = s.rows.find((r) => r.balance <= limit + 0.005);
  return row ? row.month : s.rows.length;
}

export function pmiMilestones(price: number, loan: number, aprPct: number, years: number, extra: number): PmiMilestones {
  const months = Math.max(1, Math.round(years * 12));
  const midpointMonth = Math.ceil(months / 2);
  if (price <= 0 || loan <= price * 0.8) return { requestMonth: 0, automaticMonth: 0, midpointMonth };
  const actual = amortize(loan, aprPct, months, Math.max(0, extra));
  const original = amortize(loan, aprPct, months);
  return {
    requestMonth: Math.min(firstAt(actual, price * 0.8), midpointMonth),
    automaticMonth: Math.min(firstAt(original, price * 0.78), midpointMonth),
    midpointMonth,
  };
}

export type FeeApr = {
  /** Cash you actually receive. */
  received: number;
  /** The amount you repay over the term. */
  borrowed: number;
  payment: number;
  /** The rate that makes the payments repay only the cash received: the APR including the fee. */
  trueAprPct: number;
  totalInterest: number;
  /** Interest plus the fee: the full cost of borrowing. */
  financeCharge: number;
};

/**
 * A fixed loan with an origination fee. With `feeFinanced` the fee is added to
 * the balance (you get `amount`); otherwise it is taken off the cash you receive
 * (you repay `amount`, get `amount - fee`).
 */
export function loanWithFee(amount: number, aprPct: number, months: number, fee: number, feeFinanced: boolean): FeeApr {
  const a = Math.max(0, amount);
  const f = Math.min(Math.max(0, fee), feeFinanced ? Infinity : a);
  const n = Math.max(1, Math.round(months));
  const borrowed = feeFinanced ? a + f : a;
  const received = feeFinanced ? a : a - f;
  const payment = monthlyPayment(borrowed, aprPct, n);
  const totalInterest = payment * n - borrowed;
  let trueAprPct = Math.max(0, aprPct);
  if (received > 0 && f > 0) {
    let lo = 0;
    let hi = 1_000;
    for (let k = 0; k < 200 && hi - lo > 1e-9; k++) {
      const mid = (lo + hi) / 2;
      if (monthlyPayment(received, mid, n) < payment) lo = mid;
      else hi = mid;
    }
    trueAprPct = (lo + hi) / 2;
  }
  return { received, borrowed, payment, trueAprPct, totalInterest, financeCharge: totalInterest + f };
}

export type RefiPoint = { year: number; keep: number; refi: number };

/**
 * Money paid out by the end of each year: keeping the current loan, or
 * refinancing (upfront costs on day one, then the new payments). Cash out is
 * not netted off, so the lines compare what leaves your account.
 */
export function refiTimeline(
  balance: number,
  currentAprPct: number,
  monthsLeft: number,
  newLoan: number,
  newAprPct: number,
  newYears: number,
  upfront: number,
): RefiPoint[] {
  const n1 = Math.max(1, Math.round(monthsLeft));
  const n2 = Math.max(1, Math.round(newYears * 12));
  const p1 = monthlyPayment(balance, currentAprPct, n1);
  const p2 = monthlyPayment(newLoan, newAprPct, n2);
  const years = Math.ceil(Math.max(n1, n2) / 12);
  const out: RefiPoint[] = [{ year: 0, keep: 0, refi: Math.max(0, upfront) }];
  for (let y = 1; y <= years; y++) {
    const m = y * 12;
    out.push({ year: y, keep: p1 * Math.min(m, n1), refi: Math.max(0, upfront) + p2 * Math.min(m, n2) });
  }
  return out;
}
