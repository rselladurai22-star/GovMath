/**
 * Early repayment charges (ERCs) on a fixed or discounted mortgage deal.
 *
 * Two questions:
 * - "full": what it costs to leave the deal now (to move, remortgage or pay
 *   off), and whether switching to a lower rate now beats waiting for the
 *   charge to fall or the deal to end;
 * - "part": what an overpayment above the yearly allowance costs, and whether
 *   the interest it saves is worth the charge.
 *
 * The charge is a percentage of the amount repaid. Many lenders step it down
 * each year of the deal (for example 5%, 4%, 3%, 2%, 1% on a five-year fix);
 * we count deal years back from the end of the deal.
 */

import { monthlyPaymentFor } from "./mortgage-engine";

export type ErcInput = {
  balance: number;
  /** Rate on the current deal, %. */
  rate: number;
  /** Years left on the whole mortgage. */
  termYears: number;
  /** Months left on the current deal, during which the charge applies. */
  dealMonthsLeft: number;
  /** Charge today, % of the amount repaid. */
  ercNow: number;
  /** Percentage points the charge falls at the start of each new deal year. */
  stepDown: number;
  /** Overpayment allowed each year without a charge, % of the balance. */
  allowancePct: number;
  /** Overpayments already made this deal year. */
  allowanceUsed: number;
  /** On repaying in full, the lender charges only the amount above the unused allowance. */
  deductAllowanceOnFull: boolean;
};

/** Charge, %, at a number of months from now. */
export function ercPctAt(i: Pick<ErcInput, "dealMonthsLeft" | "ercNow" | "stepDown">, monthsFromNow: number): number {
  const left = Math.max(0, Math.round(i.dealMonthsLeft) - Math.max(0, monthsFromNow));
  if (left <= 0) return 0;
  const yearsNow = Math.ceil(Math.max(1, Math.round(i.dealMonthsLeft)) / 12);
  const yearsThen = Math.ceil(left / 12);
  return Math.max(0, i.ercNow - Math.max(0, i.stepDown) * (yearsNow - yearsThen));
}

/** Months from now until the charge next falls (the next deal-year boundary), or the deal ends. */
function stepMonths(dealMonthsLeft: number): number[] {
  const n = Math.max(0, Math.round(dealMonthsLeft));
  const out: number[] = [];
  for (let m = n % 12 === 0 ? 12 : n % 12; m <= n; m += 12) out.push(m);
  return out;
}

export function unusedAllowance(i: ErcInput): number {
  return Math.max(0, (Math.max(0, i.balance) * Math.max(0, i.allowancePct)) / 100 - Math.max(0, i.allowanceUsed));
}

type Run = { paid: number; interest: number; end: number; months: number };

/** Amortise at a fixed monthly payment for up to `months` months. */
function amortise(balance: number, ratePct: number, payment: number, months: number): Run {
  const r = ratePct / 100 / 12;
  let bal = balance;
  let paid = 0;
  let interest = 0;
  let m = 0;
  for (; m < months && bal > 0.005; m++) {
    const int = bal * r;
    const p = Math.min(payment, bal + int);
    bal = bal + int - p;
    paid += p;
    interest += int;
  }
  return { paid, interest, end: Math.max(0, bal), months: m };
}

export type FullRepayInput = ErcInput & {
  /** Rate on the new deal you would switch to, %. */
  newRate: number;
};

export type WaitOption = {
  /** Months from now. */
  months: number;
  ercPct: number;
  erc: number;
  /** Extra interest paid by staying on the current rate until then, rather than switching now. */
  extraInterest: number;
  /** Gain from switching now instead of waiting until then: interest saved less the higher charge. */
  switchNowGain: number;
};

export type FullRepayResult = {
  chargeable: number;
  ercPct: number;
  erc: number;
  currentMonthly: number;
  newMonthly: number;
  waits: WaitOption[];
  /** Gain from switching now rather than at the end of the deal. */
  gainVsDealEnd: number;
  /** The best moment to switch among now, each step-down and the deal end. */
  best: { months: number; gain: number };
  /** New rate at which switching now breaks even with waiting to the deal end (null if never). */
  breakEvenRate: number | null;
};

function chargeOnFull(i: ErcInput, balance: number): number {
  const unused = i.deductAllowanceOnFull ? Math.max(0, (balance * Math.max(0, i.allowancePct)) / 100 - Math.max(0, i.allowanceUsed)) : 0;
  return Math.max(0, balance - unused);
}

function interestOver(balance: number, rate: number, termYears: number, months: number): Run {
  return amortise(balance, rate, monthlyPaymentFor(balance, rate, termYears, "repayment"), months);
}

function gainNowVsWait(i: FullRepayInput, months: number, newRate: number): WaitOption {
  const balance = Math.max(0, i.balance);
  const ercNowAmt = (chargeOnFull(i, balance) * ercPctAt(i, 0)) / 100;
  // Staying: current rate for `months`, then the balance at that point is charged.
  const stay = interestOver(balance, i.rate, i.termYears, months);
  // Switching now: new rate for the same months, on the same remaining term.
  const sw = interestOver(balance, newRate, i.termYears, months);
  const pct = ercPctAt(i, months);
  const erc = (chargeOnFull(i, stay.end) * pct) / 100;
  // Compare total cost over the period: payments plus balance left, so the
  // difference is the interest gap. The charge paid later is the alternative.
  const extraInterest = stay.paid + stay.end - (sw.paid + sw.end);
  return { months, ercPct: pct, erc, extraInterest, switchNowGain: extraInterest - (ercNowAmt - erc) };
}

export function fullRepayment(i: FullRepayInput): FullRepayResult {
  const balance = Math.max(0, i.balance);
  const chargeable = chargeOnFull(i, balance);
  const ercPct = ercPctAt(i, 0);
  const erc = (chargeable * ercPct) / 100;
  const waits = stepMonths(i.dealMonthsLeft).map((m) => gainNowVsWait(i, m, i.newRate));
  const last = waits[waits.length - 1];
  const gainVsDealEnd = last ? last.switchNowGain : -erc;
  // Best time: maximise the gain of that moment over waiting to the deal end.
  const options = [{ months: 0, gain: gainVsDealEnd }, ...waits.map((w) => ({ months: w.months, gain: gainVsDealEnd - w.switchNowGain }))];
  const best = options.reduce((a, b) => (b.gain > a.gain + 0.005 ? b : a));
  let breakEvenRate: number | null = null;
  if (last) {
    const f = (x: number) => gainNowVsWait(i, last.months, x).switchNowGain;
    if (f(0) > 0 && f(i.rate) <= 0) {
      let lo = 0;
      let hi = i.rate;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (f(mid) > 0) lo = mid;
        else hi = mid;
      }
      breakEvenRate = (lo + hi) / 2;
    }
  }
  return {
    chargeable,
    ercPct,
    erc,
    currentMonthly: monthlyPaymentFor(balance, i.rate, i.termYears, "repayment"),
    newMonthly: monthlyPaymentFor(balance, i.newRate, i.termYears, "repayment"),
    waits,
    gainVsDealEnd,
    best,
    breakEvenRate,
  };
}

export type OverpayInput = ErcInput & {
  /** Lump sum to pay off now. */
  lump: number;
};

export type OverpayResult = {
  lump: number;
  freeAmount: number;
  chargeable: number;
  ercPct: number;
  erc: number;
  /** Interest saved by the end of the current deal. */
  savedInDeal: number;
  /** Interest saved over the whole mortgage, keeping the same monthly payment. */
  savedOverTerm: number;
  /** Months taken off the mortgage. */
  monthsSooner: number;
  /** Interest saved in the deal less the charge. */
  netInDeal: number;
  /** Interest saved over the term less the charge. */
  netOverTerm: number;
  /** Paying only the free amount now and the rest when the deal ends instead. */
  split: { savedOverTerm: number };
};

function lumpEffect(balance: number, rate: number, termYears: number, lump: number, dealMonths: number) {
  const pay = monthlyPaymentFor(balance, rate, termYears, "repayment");
  const n = Math.max(1, Math.round(termYears * 12));
  const base = amortise(balance, rate, pay, n);
  const after = amortise(Math.max(0, balance - lump), rate, pay, n);
  const baseDeal = amortise(balance, rate, pay, dealMonths);
  const afterDeal = amortise(Math.max(0, balance - lump), rate, pay, dealMonths);
  return {
    pay,
    savedOverTerm: base.interest - after.interest,
    savedInDeal: baseDeal.interest - afterDeal.interest,
    monthsSooner: base.months - after.months,
  };
}

export function overpayment(i: OverpayInput): OverpayResult {
  const balance = Math.max(0, i.balance);
  const lump = Math.min(Math.max(0, i.lump), balance);
  const freeAmount = Math.min(lump, unusedAllowance(i));
  const chargeable = lump - freeAmount;
  const ercPct = ercPctAt(i, 0);
  const erc = (chargeable * ercPct) / 100;
  const dealMonths = Math.max(0, Math.round(i.dealMonthsLeft));
  const e = lumpEffect(balance, i.rate, i.termYears, lump, dealMonths);
  // Split: the free amount now, the rest the day the deal ends (no charge then).
  const n = Math.max(1, Math.round(i.termYears * 12));
  const base = amortise(balance, i.rate, e.pay, n);
  const first = amortise(Math.max(0, balance - freeAmount), i.rate, e.pay, dealMonths);
  const rest = amortise(Math.max(0, first.end - chargeable), i.rate, e.pay, n - first.months);
  const splitSaved = base.interest - (first.interest + rest.interest);
  return {
    lump,
    freeAmount,
    chargeable,
    ercPct,
    erc,
    savedInDeal: e.savedInDeal,
    savedOverTerm: e.savedOverTerm,
    monthsSooner: e.monthsSooner,
    netInDeal: e.savedInDeal - erc,
    netOverTerm: e.savedOverTerm - erc,
    split: { savedOverTerm: splitSaved },
  };
}
