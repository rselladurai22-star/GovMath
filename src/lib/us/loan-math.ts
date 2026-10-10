/**
 * Loan maths for the US APR, simple interest, business loan, credit card
 * interest and loan comparison calculators. Built on the tested engines in
 * loans.ts (monthlyPayment, amortize) and housing-loans-extra.ts (loanWithFee).
 *
 * - APR follows Regulation Z's actuarial method for a single advance with
 *   equal monthly payments: the monthly rate that makes the payments repay
 *   the amount financed (loan minus prepaid finance charges), times 12.
 * - Simple interest: I = P × r × t with actual/365, actual/360 or 30/360 days.
 * - SBA 7(a): FY 2027 upfront guaranty fees (SBA Information Notice
 *   5000-881797, effective October 1, 2026, same tiers as FY 2026 notice
 *   5000-872051), guaranty shares and maximum rates (sba.gov 7(a) terms,
 *   conditions and eligibility; fixed-rate spreads from the SBA notice in the
 *   Federal Register, August 1, 2022).
 * - Credit cards: average daily balance, daily periodic rate = APR ÷ 365.
 */

import { amortize, monthlyPayment } from "./loans";
import { loanWithFee } from "./housing-loans-extra";

/* ── Dates (US style, no Intl so server and browser agree) ── */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function parts(iso: string): [number, number, number] | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** "2026-10-10" → "October 10, 2026". */
export function usDate(iso: string): string {
  const p = parts(iso);
  if (!p) return "";
  return `${MONTHS[p[1] - 1] ?? ""} ${p[2]}, ${p[0]}`;
}

/** Calendar days from `a` to `b` (negative if b is earlier). */
export function daysBetween(a: string, b: string): number {
  const pa = parts(a);
  const pb = parts(b);
  if (!pa || !pb) return 0;
  return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 86_400_000);
}

/** Days between two dates on the US 30/360 (bond basis) convention. */
export function days30360(a: string, b: string): number {
  const pa = parts(a);
  const pb = parts(b);
  if (!pa || !pb) return 0;
  const [y1, m1] = pa;
  const [y2, m2] = pb;
  let d1 = pa[2];
  let d2 = pb[2];
  if (d1 === 31) d1 = 30;
  if (d2 === 31 && d1 >= 30) d2 = 30;
  return 360 * (y2 - y1) + 30 * (m2 - m1) + (d2 - d1);
}

/** ISO date `days` after `iso`. */
export function addDays(iso: string, days: number): string {
  const p = parts(iso);
  if (!p) return iso;
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2]) + Math.round(days) * 86_400_000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

/* ── Solving for a rate ── */

/** Present value of `n` equal payments at periodic rate `i`. */
function pv(payment: number, i: number, n: number): number {
  if (i === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + i, -n))) / i;
}

/**
 * The periodic rate at which `n` equal payments (plus an optional lump sum at
 * the end) are worth exactly `amount` today. Bisection; null if the payments
 * total less than the amount (a negative rate). `hi` is the top of the search.
 */
export function solveRate(amount: number, payment: number, n: number, lump = 0, hi = 1): number | null {
  const a = Math.max(0, amount);
  const N = Math.max(1, Math.round(n));
  const worth = (i: number) => pv(payment, i, N) + lump / Math.pow(1 + i, N);
  if (a <= 0 || payment * N + lump < a - 1e-9) return null;
  let lo = 0;
  let top = hi;
  if (worth(top) > a) return top; // even the top rate is not enough: report the cap
  for (let k = 0; k < 200 && top - lo > 1e-12; k++) {
    const mid = (lo + top) / 2;
    if (worth(mid) > a) lo = mid;
    else top = mid;
  }
  return (lo + top) / 2;
}

/** APR (%) from a quoted monthly payment: the Regulation Z rate for `months` equal payments repaying `amountFinanced`. */
export function aprFromPayment(amountFinanced: number, payment: number, months: number): number | null {
  const i = solveRate(amountFinanced, payment, months, 0, 0.5);
  return i === null ? null : i * 12 * 100;
}

/** The highest APR the solvers report (50% a month). */
export const APR_CAP = 600;

export type AprResult = {
  /** The note amount you repay. */
  loan: number;
  payment: number;
  /** Fees that count as finance charges (points, origination, lender fees). */
  financeFees: number;
  /** Loan minus prepaid finance charges: what the APR is measured against. */
  amountFinanced: number;
  aprPct: number;
  /** Interest over the full term. */
  totalInterest: number;
  /** Interest plus finance-charge fees. */
  financeCharge: number;
  /** All payments. */
  totalOfPayments: number;
};

/**
 * True APR of a fixed loan with points and fees (Regulation Z, single advance,
 * equal monthly payments). `financed` adds the fees to the loan (you still get
 * `amount`); otherwise they are paid at closing or taken from the cash.
 * Points are a percentage of the loan amount.
 */
export function trueApr(amount: number, ratePct: number, months: number, pointsPct: number, fees: number, financed: boolean): AprResult {
  const a = Math.max(0, amount);
  const pointsCost = (a * Math.max(0, pointsPct)) / 100;
  const financeFees = pointsCost + Math.max(0, fees);
  const lf = loanWithFee(a, ratePct, months, financeFees, financed);
  const n = Math.max(1, Math.round(months));
  return {
    loan: lf.borrowed,
    payment: lf.payment,
    financeFees,
    amountFinanced: lf.received,
    aprPct: lf.trueAprPct,
    totalInterest: lf.totalInterest,
    financeCharge: lf.financeCharge,
    totalOfPayments: lf.payment * n,
  };
}

/**
 * The effective APR if the loan is repaid in full after `keepMonths` (you sell
 * or refinance): fees are spread over fewer months, so it is higher than the
 * disclosed APR, which assumes the full term.
 */
export function aprIfRepaidEarly(amountFinanced: number, loan: number, ratePct: number, months: number, keepMonths: number): number {
  const n = Math.max(1, Math.round(months));
  const k = Math.max(1, Math.min(n, Math.round(keepMonths)));
  const pay = monthlyPayment(loan, ratePct, n);
  const s = amortize(loan, ratePct, n);
  const balance = k >= n ? 0 : (s.rows[k - 1]?.balance ?? 0);
  const i = solveRate(amountFinanced, pay, k, balance, 0.5);
  return i === null ? 0 : i * 12 * 100;
}

/** Regulation Z's accuracy tolerance for the APR on a regular loan (12 CFR 1026.22(a)(2)): 1/8 of a percentage point. */
export const REG_Z_TOLERANCE = 0.125;

/* ── Simple interest ── */

export type DayCount = "actual365" | "actual360" | "30-360";

export const DAY_COUNT_LABEL: Record<DayCount, string> = {
  actual365: "Actual/365",
  actual360: "Actual/360",
  "30-360": "30/360",
};

/** Simple interest: P × r × days ÷ year length (365 or 360). */
export function simpleInterest(principal: number, ratePct: number, days: number, basis: DayCount): number {
  const year = basis === "actual365" ? 365 : 360;
  return (Math.max(0, principal) * Math.max(0, ratePct)) / 100 * (Math.max(0, days) / year);
}

/** Interest compounded `perYear` times a year over `years` (daily uses 365). */
export function compoundInterest(principal: number, ratePct: number, years: number, perYear: number): number {
  const p = Math.max(0, principal);
  const r = Math.max(0, ratePct) / 100;
  const m = Math.max(1, perYear);
  return p * (Math.pow(1 + r / m, m * Math.max(0, years)) - 1);
}

/** The rate (%) that earns `interest` on `principal` over `days` as simple interest. */
export function simpleRateFor(principal: number, interest: number, days: number, basis: DayCount): number {
  const year = basis === "actual365" ? 365 : 360;
  if (principal <= 0 || days <= 0) return 0;
  return (interest / principal / (days / year)) * 100;
}

/* ── Business loans ── */

/** WSJ prime rate, 6.75% since December 11, 2025 (Dow Jones, checked October 2026). */
export const PRIME_2026 = 6.75;

/** Largest standard 7(a) loan. */
export const SBA_7A_MAX = 5_000_000;

/** SBA maximum spread over the base rate for a variable-rate 7(a) loan. */
export function sbaVariableSpread(amount: number): number {
  if (amount <= 50_000) return 6.5;
  if (amount <= 250_000) return 6;
  if (amount <= 350_000) return 4.5;
  return 3;
}

/** SBA maximum spread over prime for a fixed-rate 7(a) loan. */
export function sbaFixedSpread(amount: number): number {
  if (amount <= 25_000) return 8;
  if (amount <= 50_000) return 7;
  if (amount <= 250_000) return 6;
  return 5;
}

export type Sba7a = {
  /** Share of the loan SBA guarantees: 85% up to $150,000, 75% above. */
  guaranteeShare: number;
  guaranteed: number;
  /** Upfront guaranty fee, usually passed to the borrower. */
  upfrontFee: number;
  spreadPct: number;
  maxRatePct: number;
};

/**
 * SBA 7(a) loan facts for FY 2027 (loans approved October 1, 2026 to
 * September 30, 2027). `waiver` applies the 0% upfront fee for loans of
 * $700,000 or less to manufacturers, food supply chain and rural businesses.
 */
export function sba7a(amount: number, months: number, fixed: boolean, primePct: number, waiver = false): Sba7a {
  const a = Math.min(SBA_7A_MAX, Math.max(0, amount));
  const guaranteeShare = a <= 150_000 ? 0.85 : 0.75;
  const guaranteed = a * guaranteeShare;
  let upfrontFee: number;
  if (waiver && a <= 700_000) upfrontFee = 0;
  else if (months <= 12) upfrontFee = guaranteed * 0.0025;
  else if (a <= 150_000) upfrontFee = guaranteed * 0.02;
  else if (a <= 700_000) upfrontFee = guaranteed * 0.03;
  else upfrontFee = Math.min(guaranteed, 1_000_000) * 0.035 + Math.max(0, guaranteed - 1_000_000) * 0.0375;
  const spreadPct = fixed ? sbaFixedSpread(a) : sbaVariableSpread(a);
  return { guaranteeShare, guaranteed, upfrontFee, spreadPct, maxRatePct: primePct + spreadPct };
}

export type CashAdvance = {
  /** Total paid back: advance × factor rate. */
  payback: number;
  /** Factor cost plus fees. */
  cost: number;
  payments: number;
  payment: number;
  periodsPerYear: number;
  /** The cost as an APR (nominal, per-payment rate × payments a year). */
  aprPct: number;
  /** True if the APR hit the solver cap. */
  capped: boolean;
};

/** Business days a year for daily remittances. */
export const BUSINESS_DAYS = 252;

/**
 * A merchant cash advance with a factor rate, repaid in equal daily (business
 * day) or weekly amounts over about `months`, as an APR. `fee` comes out of
 * the cash you receive.
 */
export function cashAdvanceApr(advance: number, factor: number, months: number, freq: "daily" | "weekly", fee = 0): CashAdvance {
  const a = Math.max(0, advance);
  const payback = a * Math.max(1, factor);
  const periodsPerYear = freq === "daily" ? BUSINESS_DAYS : 52;
  const payments = Math.max(1, Math.round((Math.max(0.25, months) / 12) * periodsPerYear));
  const payment = payback / payments;
  const received = Math.max(0, a - Math.max(0, fee));
  const top = APR_CAP / 100 / periodsPerYear * 10;
  const i = solveRate(received, payment, payments, 0, top);
  const aprPct = i === null ? 0 : i * periodsPerYear * 100;
  return { payback, cost: payback - a + Math.max(0, fee), payments, payment, periodsPerYear, aprPct, capped: i !== null && i >= top - 1e-12 };
}

/** Debt service coverage ratio: yearly cash flow for debt ÷ yearly debt payments. Infinity with no debt. */
export function dscr(cashFlow: number, debtService: number): number {
  if (debtService <= 0) return Infinity;
  return cashFlow / debtService;
}

/** The DSCR most SBA and bank lenders look for. */
export const DSCR_TARGET = 1.25;

/* ── Credit card interest ── */

export type CardCycleInput = {
  /** Balance at the start of the billing cycle (last statement). */
  balance: number;
  aprPct: number;
  /** Days in the billing cycle. */
  days: number;
  /** New purchases this cycle, posted on `purchaseDay`. */
  purchases: number;
  purchaseDay: number;
  /** Payment this cycle, credited on `paymentDay`. */
  payment: number;
  paymentDay: number;
  /** You paid the last statement in full, so the grace period applies. */
  grace: boolean;
  /** Add each day's interest to the balance (most issuers). */
  compoundDaily?: boolean;
  /** 365 (most issuers) or 360. */
  yearDays?: number;
};

export type CardCycle = {
  dailyRate: number;
  averageDailyBalance: number;
  interest: number;
  /** Balance at the end of the cycle, with the interest. */
  endBalance: number;
  /** True if no interest was charged because of the grace period. */
  graceApplied: boolean;
  /** Balance at the end of each day. */
  daily: number[];
};

/**
 * One billing cycle by the average daily balance method (including new
 * purchases): each day's balance times the daily periodic rate (APR ÷ 365).
 * With a grace period and the statement balance paid in full, no interest;
 * paid in part, interest only on the unpaid part and on new purchases.
 * `averageDailyBalance` is the balance subject to interest.
 */
export function cardCycle(c: CardCycleInput): CardCycle {
  const days = Math.max(1, Math.round(c.days));
  const dailyRate = Math.max(0, c.aprPct) / 100 / (c.yearDays ?? 365);
  const pDay = Math.min(days, Math.max(1, Math.round(c.purchaseDay)));
  const payDay = Math.min(days, Math.max(1, Math.round(c.paymentDay)));
  const graceApplied = c.grace && c.payment >= c.balance - 0.005;
  // Regulation Z 1026.54: with a grace period, no interest on the part of the
  // statement balance repaid within it, even if the rest is not.
  const sheltered = c.grace ? Math.min(Math.max(0, c.payment), Math.max(0, c.balance)) : 0;
  let b = Math.max(0, c.balance);
  let interest = 0;
  let sum = 0;
  const daily: number[] = [];
  for (let d = 1; d <= days; d++) {
    if (d === pDay) b += Math.max(0, c.purchases);
    if (d === payDay) b = Math.max(0, b - Math.max(0, c.payment));
    const subject = d < payDay ? Math.max(0, b - sheltered) : b;
    sum += subject;
    const di = graceApplied ? 0 : subject * dailyRate;
    interest += di;
    if (c.compoundDaily) b += di;
    daily.push(b);
  }
  const endBalance = c.compoundDaily ? b : b + interest;
  return { dailyRate, averageDailyBalance: sum / days, interest, endBalance, graceApplied, daily };
}

export type CardMonth = { month: number; startBalance: number; interest: number; payment: number; purchases: number; endBalance: number };

export type CardYear = { months: CardMonth[]; totalInterest: number; totalPaid: number; endBalance: number };

/**
 * Twelve billing cycles at a fixed payment and the same spending each month.
 * Grace applies in a month only if the previous statement was paid in full.
 */
export function cardYear(c: CardCycleInput, cycles = 12): CardYear {
  const months: CardMonth[] = [];
  let balance = Math.max(0, c.balance);
  let grace = c.grace;
  let totalInterest = 0;
  let totalPaid = 0;
  for (let m = 1; m <= cycles; m++) {
    const due = balance;
    const pay = Math.min(Math.max(0, c.payment), balance + Math.max(0, c.purchases));
    const cy = cardCycle({ ...c, balance, payment: pay, grace });
    months.push({ month: m, startBalance: balance, interest: cy.interest, payment: pay, purchases: Math.max(0, c.purchases), endBalance: cy.endBalance });
    totalInterest += cy.interest;
    totalPaid += pay;
    grace = pay >= due - 0.005;
    balance = cy.endBalance;
  }
  return { months, totalInterest, totalPaid, endBalance: balance };
}

/* ── Comparing loan offers ── */

export type Offer = {
  /** Interest rate before fees (%). */
  ratePct: number;
  months: number;
  /** Upfront fees in dollars (origination, points, closing costs). */
  fees: number;
  /** Fees added to the loan instead of paid upfront. */
  financed: boolean;
};

export type OfferResult = {
  payment: number;
  totalInterest: number;
  fees: number;
  /** Interest plus fees. */
  totalCost: number;
  /** All payments plus fees paid upfront. */
  totalPaid: number;
  aprPct: number;
  /** Interest plus fees paid by the end of each month, from month 0 (fees on day one). */
  cumulativeCost: number[];
};

export function offer(amount: number, o: Offer): OfferResult {
  const fee = Math.max(0, o.fees);
  const n = Math.max(1, Math.round(o.months));
  const lf = loanWithFee(amount, o.ratePct, n, fee, o.financed);
  const s = amortize(lf.borrowed, o.ratePct, n);
  const cumulativeCost = [fee];
  let c = fee;
  for (const r of s.rows) {
    c += r.interest;
    cumulativeCost.push(c);
  }
  return {
    payment: lf.payment,
    totalInterest: s.totalInterest,
    fees: fee,
    totalCost: s.totalInterest + fee,
    totalPaid: s.totalPaid + (o.financed ? 0 : fee),
    aprPct: lf.trueAprPct,
    cumulativeCost,
  };
}

/**
 * The first month at which `a` has cost no more than `b` so far (interest
 * plus fees), when `a` starts dearer because of its fees. 0 if `a` is never
 * dearer; null if it never catches up while both loans run.
 */
export function breakEvenMonth(a: OfferResult, b: OfferResult): number | null {
  if (a.cumulativeCost[0] <= b.cumulativeCost[0]) return 0;
  const n = Math.min(a.cumulativeCost.length, b.cumulativeCost.length);
  for (let k = 1; k < n; k++) if (a.cumulativeCost[k] <= b.cumulativeCost[k]) return k;
  return null;
}
