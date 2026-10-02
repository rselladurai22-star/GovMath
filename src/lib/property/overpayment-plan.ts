/**
 * Mortgage overpayment plan, month by month.
 *
 * Supports a regular monthly overpayment, a one-off lump sum now and a lump
 * sum every year, with either a shorter term (payment unchanged) or a lower
 * payment (term unchanged, payment recalculated each month). Pure.
 */

export type OverpayMode = "term" | "payment";

export type OverpayInput = {
  balance: number;
  ratePct: number;
  years: number;
  monthly: number;
  lump: number;
  /** Lump sum paid at the start of each later year (months 13, 25 ...). */
  yearlyLump: number;
  mode: OverpayMode;
};

export type OverpayYear = { year: number; balance: number; baseBalance: number; interest: number; baseInterest: number };

export type OverpayResult = {
  payment: number;
  baseInterest: number;
  newInterest: number;
  interestSaved: number;
  baseMonths: number;
  newMonths: number;
  monthsSaved: number;
  /** In payment mode: the payment after a year of overpaying. */
  paymentAfterYear: number;
  /** Total overpaid in the first 12 months, including the lump sum. */
  firstYearOverpaid: number;
  /** Total extra paid in, over the whole plan. */
  totalOverpaid: number;
  years: OverpayYear[];
};

export function pmt(principal: number, monthlyRate: number, months: number): number {
  if (months <= 0) return principal;
  if (monthlyRate === 0) return principal / months;
  const pow = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * pow) / (pow - 1);
}

type Run = { months: number; interest: number; yearEnd: number[]; yearInterest: number[]; paymentAfterYear: number; overpaid: number; firstYear: number };

function run(balance0: number, r: number, n: number, payment: number, extra: { monthly: number; lump: number; yearlyLump: number }, mode: OverpayMode): Run {
  let balance = Math.max(0, balance0 - extra.lump);
  let overpaid = Math.min(balance0, extra.lump);
  let firstYear = overpaid;
  let interest = 0;
  let months = 0;
  let pay = payment;
  let paymentAfterYear = payment;
  const yearEnd: number[] = [];
  const yearInterest: number[] = [];
  let yInterest = 0;
  while (balance > 0.005 && months < n * 2) {
    if (months > 0 && months % 12 === 0 && extra.yearlyLump > 0) {
      const l = Math.min(balance, extra.yearlyLump);
      balance -= l;
      overpaid += l;
    }
    if (mode === "payment" && months > 0) pay = pmt(balance, r, Math.max(1, n - months));
    const i = balance * r;
    interest += i;
    yInterest += i;
    let principal = pay - i;
    let over = extra.monthly;
    if (principal > balance) {
      principal = balance;
      over = 0;
    } else if (principal + over > balance) over = balance - principal;
    balance -= principal + over;
    overpaid += over;
    if (months < 12) firstYear += over;
    months++;
    if (months === 12) paymentAfterYear = mode === "payment" ? pmt(balance, r, Math.max(1, n - 12)) : pay;
    if (months % 12 === 0 || balance <= 0.005) {
      yearEnd.push(Math.max(0, balance));
      yearInterest.push(yInterest);
      yInterest = 0;
    }
  }
  return { months, interest, yearEnd, yearInterest, paymentAfterYear, overpaid, firstYear };
}

export function overpaymentPlan(input: OverpayInput): OverpayResult {
  const balance = Math.max(0, input.balance || 0);
  const r = Math.max(0, input.ratePct || 0) / 100 / 12;
  const n = Math.max(1, Math.round((input.years || 1) * 12));
  const payment = pmt(balance, r, n);
  const none = { monthly: 0, lump: 0, yearlyLump: 0 };
  const base = run(balance, r, n, payment, none, "term");
  const plan = run(
    balance,
    r,
    n,
    payment,
    { monthly: Math.max(0, input.monthly || 0), lump: Math.max(0, input.lump || 0), yearlyLump: Math.max(0, input.yearlyLump || 0) },
    input.mode,
  );
  const span = Math.ceil(base.months / 12);
  const years: OverpayYear[] = Array.from({ length: span + 1 }, (_, y) => ({
    year: y,
    balance: y === 0 ? balance : (plan.yearEnd[y - 1] ?? 0),
    baseBalance: y === 0 ? balance : (base.yearEnd[y - 1] ?? 0),
    interest: y === 0 ? 0 : (plan.yearInterest[y - 1] ?? 0),
    baseInterest: y === 0 ? 0 : (base.yearInterest[y - 1] ?? 0),
  }));
  return {
    payment,
    baseInterest: base.interest,
    newInterest: plan.interest,
    interestSaved: Math.max(0, base.interest - plan.interest),
    baseMonths: base.months,
    newMonths: plan.months,
    monthsSaved: Math.max(0, base.months - plan.months),
    paymentAfterYear: plan.paymentAfterYear,
    firstYearOverpaid: plan.firstYear,
    totalOverpaid: plan.overpaid,
    years,
  };
}

/** Pre-tax savings rate that matches the mortgage rate, for a given tax rate. */
export function breakEvenSavingsRate(mortgageRatePct: number, taxRate: number): number {
  return mortgageRatePct / Math.max(0.01, 1 - taxRate);
}
