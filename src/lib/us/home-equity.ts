/**
 * US home loan details for the amortization, mortgage payoff, HELOC, home
 * equity loan and mortgage points calculators, built on the tested fixed-rate
 * maths in loans.ts and mortgage.ts:
 * - a dated amortization schedule with monthly, yearly and one-time extra payments;
 * - paying a mortgage off early (extra, biweekly, lump sum or a target date) and
 *   prepaying against investing the same money;
 * - how much equity you can borrow under a combined loan-to-value (CLTV) limit;
 * - a HELOC's interest-only draw period and amortized repayment period;
 * - a home equity loan compared with a HELOC and a cash-out refinance;
 * - discount points: cost, rate, break-even and the net result over your stay;
 * - the share of mortgage interest that is deductible under the $750,000 cap.
 * Interest is charged monthly at the rate ÷ 12, as US mortgages are.
 */

import { amortize, monthlyPayment } from "./loans";

/**
 * Wall Street Journal prime rate, about 7.00% in October 2026: the Federal
 * Reserve raised its target range to 3.75%–4.00% on September 16, 2026
 * (federalreserve.gov press release), and prime sits 3 points above the top
 * of the range (Bankrate's WSJ prime rate table, updated October 6, 2026).
 */
export const PRIME_RATE = 7.0;
/** National average HELOC rate, about 7.33% (Bankrate survey, October 7, 2026). */
export const AVG_HELOC_RATE = 7.33;
/** Average 10-year home equity loan rate, about 8.66% (Bankrate survey, October 7, 2026). */
export const AVG_HOME_EQUITY_RATE = 8.66;
/**
 * Mortgage interest is deductible on up to $750,000 of acquisition debt
 * ($375,000 married filing separately) for loans taken out after December 15,
 * 2017; home equity interest only when the money buys, builds or substantially
 * improves the home. The One Big Beautiful Bill Act (P.L. 119-21, section
 * 70108) made both rules permanent (IRS Publication 936).
 */
export const MORTGAGE_DEBT_CAP = 750_000;

/* ── Dates (no Intl, so server and browser agree) ─────────────────── */

export type YM = { year: number; month: number };

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-12-01" → { year: 2026, month: 12 }; falls back to December 2026. */
export function parseYm(iso: string): YM {
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return { year: 2026, month: 12 };
  const month = Math.min(12, Math.max(1, Number(m[2])));
  return { year: Number(m[1]), month };
}

export function addMonths(d: YM, n: number): YM {
  const i = d.year * 12 + (d.month - 1) + Math.round(n);
  return { year: Math.floor(i / 12), month: (i % 12) + 1 };
}

/** "December 2026", or "Dec 2026" with `short`. */
export function monthYear(d: YM, short = false): string {
  const name = MONTH_NAMES[d.month - 1] ?? "";
  return `${short ? name.slice(0, 3) : name} ${d.year}`;
}

/** Whole months from `a` to `b` (positive when b is later). */
export function monthsBetween(a: YM, b: YM): number {
  return b.year * 12 + b.month - (a.year * 12 + a.month);
}

export const monthName = (m: number) => MONTH_NAMES[Math.min(12, Math.max(1, m)) - 1];

/* ── Amortization with extra payments ─────────────────────────────── */

export type ExtraPlan = {
  /** Extra principal every month. */
  monthly: number;
  /** Extra principal once a year, in calendar month `yearlyMonth` (1–12). */
  yearly: number;
  yearlyMonth: number;
  /** A one-time extra payment with payment number `oneTimeAt` (1 = the first payment). */
  oneTime: number;
  oneTimeAt: number;
};

export const NO_EXTRA: ExtraPlan = { monthly: 0, yearly: 0, yearlyMonth: 1, oneTime: 0, oneTimeAt: 1 };

export type DatedRow = {
  /** Payment number, from 1. */
  n: number;
  date: YM;
  /** The scheduled payment actually due (the last one is smaller). */
  payment: number;
  interest: number;
  /** Principal from the scheduled payment. */
  principal: number;
  /** Extra principal paid this month. */
  extra: number;
  balance: number;
};

export type DatedSchedule = {
  payment: number;
  rows: DatedRow[];
  months: number;
  totalInterest: number;
  /** Everything paid, scheduled and extra. */
  totalPaid: number;
  totalExtra: number;
  payoff: YM;
};

/**
 * A fixed-rate loan paid month by month from the first payment date, with any
 * extra principal. The scheduled payment never changes; extra payments only
 * shorten the loan (as on a US mortgage, unless you ask for a recast).
 */
export function datedSchedule(principal: number, aprPct: number, termMonths: number, first: YM, extra: ExtraPlan = NO_EXTRA, payment?: number): DatedSchedule {
  const r = Math.max(0, aprPct) / 100 / 12;
  const n = Math.max(1, Math.round(termMonths));
  const pay = payment ?? monthlyPayment(principal, aprPct, n);
  let balance = Math.max(0, principal);
  const rows: DatedRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let totalExtra = 0;
  for (let k = 1; balance > 0.005 && k <= 1_200; k++) {
    const date = addMonths(first, k - 1);
    const interest = balance * r;
    const due = Math.min(pay, balance + interest);
    if (due <= interest && k > 1) break; // a payment that never clears the interest
    const principalPart = due - interest;
    balance = Math.max(0, balance - principalPart);
    let ex = Math.max(0, extra.monthly);
    if (date.month === extra.yearlyMonth) ex += Math.max(0, extra.yearly);
    if (k === Math.round(extra.oneTimeAt)) ex += Math.max(0, extra.oneTime);
    ex = Math.min(ex, balance);
    balance = Math.max(0, balance - ex);
    totalInterest += interest;
    totalPaid += due + ex;
    totalExtra += ex;
    rows.push({ n: k, date, payment: due, interest, principal: principalPart, extra: ex, balance });
  }
  const months = balance > 0.005 ? Infinity : rows.length;
  return { payment: pay, rows, months, totalInterest, totalPaid, totalExtra, payoff: rows.length ? rows[rows.length - 1].date : first };
}

export type YearTotals = { year: number; payments: number; interest: number; principal: number; extra: number; balance: number; rows: DatedRow[] };

/** Totals by calendar year, with that year's rows. `principal` includes extra payments. */
export function byCalendarYear(s: DatedSchedule): YearTotals[] {
  const out: YearTotals[] = [];
  for (const r of s.rows) {
    let y = out[out.length - 1];
    if (!y || y.year !== r.date.year) {
      y = { year: r.date.year, payments: 0, interest: 0, principal: 0, extra: 0, balance: 0, rows: [] };
      out.push(y);
    }
    y.payments += r.payment + r.extra;
    y.interest += r.interest;
    y.principal += r.principal + r.extra;
    y.extra += r.extra;
    y.balance = r.balance;
    y.rows.push(r);
  }
  return out;
}

/** Balance at the end of each loan year (index 0 = the start), for charts. */
export function balanceByLoanYear(principal: number, s: DatedSchedule): number[] {
  const out = [Math.max(0, principal)];
  const years = Math.ceil(s.rows.length / 12);
  for (let y = 1; y <= years; y++) out.push(s.rows[Math.min(s.rows.length, y * 12) - 1]?.balance ?? 0);
  return out;
}

/** Interest paid by the end of each loan year (index 0 = 0). */
export function interestByLoanYear(s: DatedSchedule): number[] {
  const out = [0];
  let sum = 0;
  s.rows.forEach((r, i) => {
    sum += r.interest;
    if ((i + 1) % 12 === 0 || i === s.rows.length - 1) out.push(sum);
  });
  return out;
}

/** The first payment where more of the scheduled payment goes to principal than to interest (0 if from the start, Infinity if never). */
export function tippingPoint(s: DatedSchedule): number {
  const row = s.rows.find((r) => r.principal > r.interest);
  return row ? row.n : Infinity;
}

/* ── Paying a mortgage off early ───────────────────────────────────── */

export type PayoffInput = {
  balance: number;
  aprPct: number;
  monthsLeft: number;
  /** Extra principal every month. */
  extraMonthly: number;
  /** Pay half the payment every two weeks: 26 half payments, one extra payment a year, modelled as payment ÷ 12 more each month. */
  biweekly: boolean;
  /** One lump sum with the next payment. */
  lumpSum: number;
  /** Extra once a year, in calendar month `yearlyMonth`. */
  extraYearly: number;
  yearlyMonth: number;
  next: YM;
};

export type Payoff = {
  payment: number;
  /** The extra each month from the biweekly plan. */
  biweeklyExtra: number;
  base: DatedSchedule;
  plan: DatedSchedule;
  interestSaved: number;
  monthsSaved: number;
};

export function earlyPayoff(i: PayoffInput): Payoff {
  const n = Math.max(1, Math.round(i.monthsLeft));
  const payment = monthlyPayment(i.balance, i.aprPct, n);
  const biweeklyExtra = i.biweekly ? payment / 12 : 0;
  const base = datedSchedule(i.balance, i.aprPct, n, i.next);
  const plan = datedSchedule(i.balance, i.aprPct, n, i.next, {
    monthly: Math.max(0, i.extraMonthly) + biweeklyExtra,
    yearly: Math.max(0, i.extraYearly),
    yearlyMonth: i.yearlyMonth,
    oneTime: Math.max(0, i.lumpSum),
    oneTimeAt: 1,
  });
  return { payment, biweeklyExtra, base, plan, interestSaved: base.totalInterest - plan.totalInterest, monthsSaved: base.months - plan.months };
}

/**
 * The smallest extra monthly payment that clears the loan within `targetMonths`
 * (with any lump sum with the next payment), to the cent. 0 if no extra is needed.
 */
export function extraForTarget(balance: number, aprPct: number, monthsLeft: number, targetMonths: number, lumpSum = 0): number {
  const n = Math.max(1, Math.round(monthsLeft));
  const t = Math.max(1, Math.round(targetMonths));
  const first: YM = { year: 2026, month: 1 };
  const months = (x: number) => datedSchedule(balance, aprPct, n, first, { ...NO_EXTRA, monthly: x, oneTime: lumpSum, oneTimeAt: 1 }).months;
  if (months(0) <= t) return 0;
  let lo = 0;
  let hi = Math.max(1, balance);
  for (let k = 0; k < 100 && hi - lo > 0.001; k++) {
    const mid = (lo + hi) / 2;
    if (months(mid) <= t) hi = mid;
    else lo = mid;
  }
  return Math.ceil(hi * 100) / 100;
}

export type PrepayVsInvest = {
  /** Months compared: until the original payoff. */
  months: number;
  /** Investments at the original payoff date if you invest the extra and keep the loan. */
  investValue: number;
  /** Investments at the same date if you prepay, then invest the whole payment once the loan is gone. */
  prepayValue: number;
  /** prepayValue − investValue: positive when prepaying wins. */
  difference: number;
  /** The return at which the two come out equal (about the loan rate). */
  breakEvenReturnPct: number;
};

/**
 * Two people with the same monthly budget (payment plus extra, plus a lump sum
 * up front) until the original payoff date. One prepays and invests the full
 * budget once the loan is gone; the other pays the normal payment and invests
 * the rest. Growth is monthly at `returnPct` ÷ 12, before tax.
 */
export function prepayVsInvest(balance: number, aprPct: number, monthsLeft: number, extraMonthly: number, lumpSum: number, returnPct: number): PrepayVsInvest {
  const n = Math.max(1, Math.round(monthsLeft));
  const run = (ret: number) => {
    const r = Math.max(0, aprPct) / 100 / 12;
    const g = ret / 100 / 12;
    const pay = monthlyPayment(balance, aprPct, n);
    let loanA = Math.max(0, balance); // prepay
    let loanB = Math.max(0, balance); // invest
    let potA = 0;
    let potB = 0;
    for (let m = 1; m <= n; m++) {
      const budget = pay + Math.max(0, extraMonthly) + (m === 1 ? Math.max(0, lumpSum) : 0);
      potA *= 1 + g;
      potB *= 1 + g;
      // Prepay: everything to the loan until it is gone, then invest.
      const dueA = loanA > 0.005 ? loanA * (1 + r) : 0;
      const toLoanA = Math.min(budget, dueA);
      loanA = Math.max(0, dueA - toLoanA);
      potA += budget - toLoanA;
      // Invest: the normal payment only.
      const dueB = loanB > 0.005 ? loanB * (1 + r) : 0;
      const toLoanB = Math.min(pay, dueB);
      loanB = Math.max(0, dueB - toLoanB);
      potB += budget - toLoanB;
    }
    return { a: potA, b: potB };
  };
  const at = run(returnPct);
  // The return where both end level.
  let lo = -5;
  let hi = 30;
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2;
    const x = run(mid);
    if (x.a - x.b > 0) lo = mid;
    else hi = mid;
  }
  return { months: n, investValue: at.b, prepayValue: at.a, difference: at.a - at.b, breakEvenReturnPct: (lo + hi) / 2 };
}

/* ── Home equity: what you can borrow ──────────────────────────────── */

export type Equity = {
  /** Equity now: value − everything owed. */
  equity: number;
  /** Loan-to-value now (all liens ÷ value). */
  cltvNow: number;
  /** Total debt the lender allows: value × CLTV limit. */
  maxDebt: number;
  /** What you could borrow on top: maxDebt − owed (never below 0). */
  available: number;
};

/** Borrowing power under a combined loan-to-value limit (`cltvPct`, e.g. 85). */
export function equityAvailable(homeValue: number, owed: number, cltvPct: number): Equity {
  const v = Math.max(0, homeValue);
  const o = Math.max(0, owed);
  const maxDebt = (v * Math.max(0, cltvPct)) / 100;
  return { equity: v - o, cltvNow: v > 0 ? o / v : 0, maxDebt, available: Math.max(0, maxDebt - o) };
}

/* ── HELOC ─────────────────────────────────────────────────────────── */

export type HelocInput = {
  /** Amount drawn in all. */
  draw: number;
  /** Index (prime) plus the lender's margin. */
  primePct: number;
  marginPct: number;
  drawYears: number;
  repayYears: number;
  /** Draw it all now, or in equal amounts each month of the draw period. */
  pattern: "now" | "even";
  /** Rate change from the start of the repayment period, in points (a stress test). */
  rateChange: number;
  /** Yearly fee, charged in the draw period. */
  annualFee: number;
};

export type HelocMonth = { month: number; phase: "draw" | "repay"; rate: number; payment: number; interest: number; balance: number };

export type Heloc = {
  ratePct: number;
  repayRatePct: number;
  /** Interest-only payment once everything is drawn (the largest draw-period payment). */
  drawPayment: number;
  /** First month's payment. */
  firstPayment: number;
  /** Payment in the repayment period. */
  repayPayment: number;
  /** repayPayment − drawPayment: the payment shock when the draw period ends. */
  jump: number;
  drawInterest: number;
  repayInterest: number;
  totalInterest: number;
  fees: number;
  months: HelocMonth[];
};

export function heloc(i: HelocInput): Heloc {
  const draw = Math.max(0, i.draw);
  const ratePct = Math.max(0, i.primePct + i.marginPct);
  const repayRatePct = Math.max(0, ratePct + i.rateChange);
  const D = Math.max(0, Math.round(i.drawYears * 12));
  const R = Math.max(1, Math.round(i.repayYears * 12));
  const r = ratePct / 100 / 12;
  const months: HelocMonth[] = [];
  let balance = i.pattern === "now" || D === 0 ? draw : 0;
  let drawInterest = 0;
  for (let m = 1; m <= D; m++) {
    if (i.pattern === "even") balance = (draw * m) / D;
    const interest = balance * r;
    drawInterest += interest;
    months.push({ month: m, phase: "draw", rate: ratePct, payment: interest, interest, balance });
  }
  const repay = amortize(balance, repayRatePct, R);
  repay.rows.forEach((row) => months.push({ month: D + row.month, phase: "repay", rate: repayRatePct, payment: row.payment, interest: row.interest, balance: row.balance }));
  const drawPayment = draw * r;
  const repayPayment = draw > 0 ? repay.payment : 0;
  return {
    ratePct,
    repayRatePct,
    drawPayment: D > 0 ? drawPayment : 0,
    firstPayment: months[0]?.payment ?? 0,
    repayPayment,
    jump: repayPayment - (D > 0 ? drawPayment : 0),
    drawInterest,
    repayInterest: repay.totalInterest,
    totalInterest: drawInterest + repay.totalInterest,
    fees: Math.max(0, i.annualFee) * Math.ceil(D / 12),
    months,
  };
}

/* ── Home equity loan vs HELOC vs cash-out refinance ───────────────── */

export type EquityOptionsInput = {
  /** Cash needed. */
  cash: number;
  /** First mortgage now. */
  owed: number;
  mortgagePct: number;
  monthsLeft: number;
  /** Home equity loan. */
  helPct: number;
  helYears: number;
  helCosts: number;
  /** HELOC (drawn in full now). */
  helocPct: number;
  helocDrawYears: number;
  helocRepayYears: number;
  helocCosts: number;
  /** Cash-out refinance: a new first mortgage for owed + cash (+ costs if rolled in). */
  refiPct: number;
  refiYears: number;
  refiCosts: number;
};

export type EquityOption = {
  key: "hel" | "heloc" | "refi";
  /** All mortgage payments in the first month (first mortgage + new borrowing). */
  monthlyNow: number;
  /** All mortgage payments later (after a HELOC's draw period ends; the same for the others). */
  monthlyLater: number;
  /** Interest still to pay on all home debt, plus upfront costs. */
  totalCost: number;
  /** Extra cost over keeping only the current mortgage. */
  extraCost: number;
};

export function equityOptions(i: EquityOptionsInput): { keepPayment: number; keepInterest: number; options: EquityOption[] } {
  const n = Math.max(1, Math.round(i.monthsLeft));
  const keep = amortize(i.owed, i.mortgagePct, n);
  const keepPayment = i.owed > 0 ? keep.payment : 0;
  const keepInterest = keep.totalInterest;

  const hel = amortize(i.cash, i.helPct, Math.max(1, Math.round(i.helYears * 12)));
  const helCost = keepInterest + hel.totalInterest + Math.max(0, i.helCosts);

  const h = heloc({ draw: i.cash, primePct: i.helocPct, marginPct: 0, drawYears: i.helocDrawYears, repayYears: i.helocRepayYears, pattern: "now", rateChange: 0, annualFee: 0 });
  const helocCost = keepInterest + h.totalInterest + Math.max(0, i.helocCosts);

  const refiLoan = Math.max(0, i.owed) + Math.max(0, i.cash);
  const refi = amortize(refiLoan, i.refiPct, Math.max(1, Math.round(i.refiYears * 12)));
  const refiCost = refi.totalInterest + Math.max(0, i.refiCosts);

  const base = keepInterest;
  return {
    keepPayment,
    keepInterest,
    options: [
      { key: "hel", monthlyNow: keepPayment + (i.cash > 0 ? hel.payment : 0), monthlyLater: keepPayment + (i.cash > 0 ? hel.payment : 0), totalCost: helCost, extraCost: helCost - base },
      {
        key: "heloc",
        monthlyNow: keepPayment + (i.helocDrawYears > 0 ? h.drawPayment : h.repayPayment),
        monthlyLater: keepPayment + h.repayPayment,
        totalCost: helocCost,
        extraCost: helocCost - base,
      },
      { key: "refi", monthlyNow: refiLoan > 0 ? refi.payment : 0, monthlyLater: refiLoan > 0 ? refi.payment : 0, totalCost: refiCost, extraCost: refiCost - base },
    ],
  };
}

/**
 * Share of home loan interest that is deductible (for itemizers): home equity
 * borrowing counts only when it buys, builds or substantially improves the
 * home, and only the first $750,000 of qualifying debt counts.
 */
export function deductibleShare(firstMortgage: number, equityDebt: number, forHome: boolean, cap = MORTGAGE_DEBT_CAP): { mortgage: number; equity: number } {
  const f = Math.max(0, firstMortgage);
  const e = forHome ? Math.max(0, equityDebt) : 0;
  const qualifying = f + e;
  const share = qualifying > cap ? cap / qualifying : 1;
  return { mortgage: f > 0 ? share : 0, equity: forHome && e > 0 ? share : 0 };
}

/** Interest in the first 12 months of a fixed loan. */
export function firstYearInterest(principal: number, aprPct: number, months: number): number {
  return amortize(principal, aprPct, months).rows.slice(0, 12).reduce((s, r) => s + r.interest, 0);
}

/* ── Discount points ───────────────────────────────────────────────── */

export type PointsOption = {
  points: number;
  /** Cost of the points (negative for a lender credit). */
  cost: number;
  ratePct: number;
  payment: number;
  /** Monthly saving against no points (negative with a credit). */
  saving: number;
  /** Months for the payment saving to repay the cost; for a credit, the month the higher payments use it up. Infinity if never. */
  breakEven: number;
  /** Months until savings plus the lower balance repay the cost (the fuller test). */
  breakEvenWithBalance: number;
  /** Net gain by the end of your stay: payment savings + lower balance − cost. */
  netAtStay: number;
  /** Interest over your stay. */
  interestAtStay: number;
};

/**
 * One point costs 1% of the loan and cuts the rate by `perPoint` points
 * (lenders price their own; 0.25 is a common figure). Negative points are
 * lender credits that raise the rate by the same step.
 */
export function pointsOption(loan: number, baseRatePct: number, years: number, points: number, perPoint: number, stayYears: number): PointsOption {
  const n = Math.max(1, Math.round(years * 12));
  const stay = Math.min(n, Math.max(1, Math.round(stayYears * 12)));
  const ratePct = Math.max(0, baseRatePct - points * perPoint);
  const cost = (loan * points) / 100;
  const base = amortize(loan, baseRatePct, n);
  const opt = amortize(loan, ratePct, n);
  const saving = base.payment - opt.payment;
  const breakEven = cost === 0 ? 0 : saving !== 0 && cost / saving > 0 ? Math.ceil(cost / saving) : Infinity;
  const balAt = (s: typeof base, m: number) => (m <= 0 ? loan : (s.rows[m - 1]?.balance ?? 0));
  const gainAt = (m: number) => saving * m + (balAt(base, m) - balAt(opt, m)) - cost;
  let breakEvenWithBalance = Infinity;
  if (cost === 0) breakEvenWithBalance = 0;
  else if (cost > 0) {
    for (let m = 1; m <= n; m++)
      if (gainAt(m) >= 0) {
        breakEvenWithBalance = m;
        break;
      }
  } else {
    for (let m = 1; m <= n; m++)
      if (gainAt(m) < 0) {
        breakEvenWithBalance = m;
        break;
      }
  }
  return {
    points,
    cost,
    ratePct,
    payment: opt.payment,
    saving,
    breakEven,
    breakEvenWithBalance,
    netAtStay: gainAt(stay),
    interestAtStay: opt.rows.slice(0, stay).reduce((s, r) => s + r.interest, 0),
  };
}

/**
 * Tax value of points for an itemizer: points on a loan to buy your main home
 * can usually be deducted in the year paid; refinance points are deducted
 * evenly over the loan's term (IRS Topic 504). Returns the first year's saving.
 */
export function pointsTaxValue(cost: number, purpose: "buy" | "refi", years: number, marginalPct: number): { firstYear: number; perYear: number } {
  const c = Math.max(0, cost);
  const t = Math.max(0, marginalPct) / 100;
  if (purpose === "buy") return { firstYear: c * t, perYear: 0 };
  const perYear = (c / Math.max(1, years)) * t;
  return { firstYear: perYear, perYear };
}

/**
 * For the chart: payment savings plus the lower balance at the end of each
 * year (index 0 = closing), against the points' cost. Where the line crosses
 * the cost is the fuller break-even.
 */
export function pointsGainByYear(loan: number, baseRatePct: number, years: number, points: number, perPoint: number): number[] {
  const n = Math.max(1, Math.round(years * 12));
  const base = amortize(loan, baseRatePct, n);
  const opt = amortize(loan, Math.max(0, baseRatePct - points * perPoint), n);
  const saving = base.payment - opt.payment;
  const out = [0];
  for (let y = 1; y * 12 <= n; y++) {
    const m = y * 12;
    out.push(saving * m + ((base.rows[m - 1]?.balance ?? 0) - (opt.rows[m - 1]?.balance ?? 0)));
  }
  return out;
}
