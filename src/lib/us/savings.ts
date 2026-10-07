/**
 * Saving and investing: compound growth with regular deposits, APY, CDs,
 * savings goals, 401(k) projections with an employer match, Roth IRA limits
 * and a retirement plan. 2026 limits come from tax-2026.ts.
 */

import { US_2026, type FilingStatus } from "./tax-2026";

export type Compounding = "daily" | "monthly" | "quarterly" | "annually";
export const PER_YEAR: Record<Compounding, number> = { daily: 365, monthly: 12, quarterly: 4, annually: 1 };

/** Annual percentage yield from a nominal rate. */
export function apy(ratePct: number, compounding: Compounding): number {
  const n = PER_YEAR[compounding];
  return Math.pow(1 + ratePct / 100 / n, n) - 1;
}

export type GrowthYear = { year: number; deposits: number; interest: number; balance: number; real: number };

export type Growth = {
  balance: number;
  deposits: number;
  interest: number;
  /** The final balance in today's dollars. */
  real: number;
  years: GrowthYear[];
};

/**
 * Grows a starting amount plus a monthly deposit (made at the end of each
 * month, rising each year by `depositGrowth`) at `ratePct` compounded as chosen.
 */
export function grow(start: number, monthly: number, ratePct: number, years: number, compounding: Compounding = "monthly", inflationPct = 0, depositGrowth = 0): Growth {
  const monthlyRate = Math.pow(1 + apy(ratePct, compounding), 1 / 12) - 1;
  let balance = Math.max(0, start);
  let deposits = balance;
  let dep = Math.max(0, monthly);
  const out: GrowthYear[] = [];
  const n = Math.max(0, Math.round(years * 12));
  for (let m = 1; m <= n; m++) {
    balance = balance * (1 + monthlyRate) + dep;
    deposits += dep;
    if (m % 12 === 0 || m === n) {
      const y = Math.ceil(m / 12);
      out.push({ year: y, deposits, interest: balance - deposits, balance, real: balance / Math.pow(1 + inflationPct / 100, m / 12) });
      if (m % 12 === 0) dep *= 1 + depositGrowth;
    }
  }
  return { balance, deposits, interest: balance - deposits, real: balance / Math.pow(1 + inflationPct / 100, n / 12), years: out };
}

export type Cd = {
  apy: number;
  maturity: number;
  interest: number;
  /** Early withdrawal penalty in dollars, if cashed in at `withdrawMonth`. */
  penalty: number;
  /** What you would get back at `withdrawMonth`, after the penalty. */
  earlyValue: number;
  /** Federal tax on the interest at the given rate (interest is taxed as ordinary income in the year credited). */
  tax: number;
};

/** A CD: deposit, rate, term in months, and an early withdrawal penalty in months of simple interest. */
export function cd(deposit: number, ratePct: number, months: number, compounding: Compounding, penaltyMonths: number, withdrawMonth: number, taxRate: number): Cd {
  const a = apy(ratePct, compounding);
  const d = Math.max(0, deposit);
  const t = Math.max(0, months) / 12;
  const maturity = d * Math.pow(1 + a, t);
  const at = Math.min(Math.max(0, withdrawMonth), months);
  const valueAt = d * Math.pow(1 + a, at / 12);
  const penalty = Math.min(valueAt, d * (ratePct / 100 / 12) * Math.max(0, penaltyMonths));
  return { apy: a, maturity, interest: maturity - d, penalty, earlyValue: valueAt - penalty, tax: (maturity - d) * Math.max(0, taxRate) };
}

/** The monthly deposit that reaches `goal` in `months` from `start` at `ratePct` (monthly compounding). */
export function depositForGoal(goal: number, start: number, ratePct: number, months: number): number {
  const r = ratePct / 100 / 12;
  const n = Math.max(1, Math.round(months));
  const grownStart = Math.max(0, start) * Math.pow(1 + r, n);
  const gap = Math.max(0, goal - grownStart);
  if (r === 0) return gap / n;
  return (gap * r) / (Math.pow(1 + r, n) - 1);
}

/** Months to reach `goal` with a monthly deposit (Infinity if it never does within 100 years). */
export function monthsToGoal(goal: number, start: number, monthly: number, ratePct: number): number {
  const r = ratePct / 100 / 12;
  let b = Math.max(0, start);
  for (let m = 0; m <= 1_200; m++) {
    if (b >= goal) return m;
    b = b * (1 + r) + Math.max(0, monthly);
  }
  return Infinity;
}

/** 2026 employee deferral limit for an age (catch-up at 50+, super catch-up at 60 to 63). */
export function k401Limit(age: number): number {
  const L = US_2026.limits;
  if (age >= 60 && age <= 63) return L.k401 + L.k401SuperCatchUp;
  if (age >= 50) return L.k401 + L.k401CatchUp;
  return L.k401;
}

export type K401Input = {
  age: number;
  retireAge: number;
  salary: number;
  balance: number;
  /** Your contribution as a share of pay. */
  pct: number;
  /** Employer match: `matchRate` of each dollar you put in, up to `matchUpTo` of pay (e.g. 50% up to 6%). */
  matchRate: number;
  matchUpTo: number;
  /** Non-elective employer contribution as a share of pay. */
  employerFlat: number;
  salaryGrowth: number;
  returnPct: number;
  /** Yearly fund fees as a share of the balance. */
  feePct: number;
  inflationPct: number;
};

export type K401Year = { age: number; you: number; employer: number; balance: number; real: number };

export type K401 = {
  balance: number;
  real: number;
  yourTotal: number;
  employerTotal: number;
  growth: number;
  /** Match left on the table this year by contributing less than the match needs. */
  missedMatch: number;
  firstYear: { you: number; employer: number; capped: boolean };
  years: K401Year[];
};

export function k401Projection(i: K401Input): K401 {
  const years: K401Year[] = [];
  let balance = Math.max(0, i.balance);
  let salary = Math.max(0, i.salary);
  let yourTotal = 0;
  let employerTotal = 0;
  const n = Math.max(0, Math.round(i.retireAge - i.age));
  const net = (1 + i.returnPct / 100) * (1 - i.feePct / 100) - 1;
  let first = { you: 0, employer: 0, capped: false };
  for (let y = 0; y < n; y++) {
    const age = i.age + y;
    const wanted = salary * Math.max(0, i.pct);
    const you = Math.min(wanted, k401Limit(age));
    const match = Math.min(you, salary * Math.max(0, i.matchUpTo)) * Math.max(0, i.matchRate);
    const employer = match + salary * Math.max(0, i.employerFlat);
    if (y === 0) first = { you, employer, capped: wanted > you };
    // Contributions arrive through the year: half a year's growth on average.
    balance = balance * (1 + net) + (you + employer) * (1 + net / 2);
    yourTotal += you;
    employerTotal += employer;
    years.push({ age: age + 1, you, employer, balance, real: balance / Math.pow(1 + i.inflationPct / 100, y + 1) });
    salary *= 1 + i.salaryGrowth / 100;
  }
  const fullMatch = Math.min(Math.max(0, i.salary) * i.matchUpTo, k401Limit(i.age)) * i.matchRate;
  return {
    balance,
    real: balance / Math.pow(1 + i.inflationPct / 100, n),
    yourTotal,
    employerTotal,
    growth: balance - Math.max(0, i.balance) - yourTotal - employerTotal,
    missedMatch: Math.max(0, fullMatch - (first.employer - Math.max(0, i.salary) * Math.max(0, i.employerFlat))),
    firstYear: first,
    years,
  };
}

/** 2026 Roth IRA contribution allowed for a modified AGI (rounded up to $10, at least $200 inside the range, as the IRS worksheet does). */
export function rothLimit(magi: number, status: FilingStatus, age: number, earned: number): { limit: number; full: number; phase: "full" | "partial" | "none" } {
  const L = US_2026.limits;
  const full = Math.min(L.ira + (age >= 50 ? L.iraCatchUp : 0), Math.max(0, earned));
  const [lo, hi] = US_2026.rothPhaseOut[status];
  if (magi <= lo) return { limit: full, full, phase: "full" };
  if (magi >= hi) return { limit: 0, full, phase: "none" };
  let reduced = full * (1 - (magi - lo) / (hi - lo));
  reduced = Math.ceil(reduced / 10) * 10;
  if (reduced < 200) reduced = 200;
  return { limit: Math.min(full, reduced), full, phase: "partial" };
}

export type RetireInput = {
  age: number;
  retireAge: number;
  lifeTo: number;
  saved: number;
  monthly: number;
  returnPct: number;
  /** Return after retiring (usually lower). */
  retiredReturnPct: number;
  inflationPct: number;
  /** Spending wanted in retirement, a year in today's dollars. */
  spending: number;
  /** Social Security and pensions a year, in today's dollars. */
  socialSecurity: number;
};

export type Retirement = {
  atRetirement: number;
  /** Nest egg needed at retirement to pay the gap until `lifeTo`, in future dollars. */
  needed: number;
  /** The 4% rule figure: 25 × the yearly gap, in today's dollars. */
  fourPercent: number;
  gapToday: number;
  /** Extra a month needed now to close any shortfall. */
  extraMonthly: number;
  /** Age the money runs out (or lifeTo if it lasts). */
  lastsTo: number;
  path: { age: number; balance: number }[];
};

/** Projects savings to retirement, then draws the inflation-adjusted gap each year. */
export function retirement(i: RetireInput): Retirement {
  const work = Math.max(0, i.retireAge - i.age);
  const g = grow(i.saved, i.monthly, i.returnPct, work, "monthly");
  const infl = 1 + i.inflationPct / 100;
  const gapToday = Math.max(0, i.spending - i.socialSecurity);
  const path: { age: number; balance: number }[] = [{ age: i.age, balance: Math.max(0, i.saved) }];
  g.years.forEach((y) => path.push({ age: i.age + y.year, balance: y.balance }));
  let b = g.balance;
  let lastsTo = i.lifeTo;
  const retiredYears = Math.max(0, i.lifeTo - i.retireAge);
  for (let k = 0; k < retiredYears; k++) {
    const draw = gapToday * Math.pow(infl, work + k);
    b = (b - draw) * (1 + i.retiredReturnPct / 100);
    if (b < 0) {
      lastsTo = i.retireAge + k;
      path.push({ age: i.retireAge + k + 1, balance: 0 });
      break;
    }
    path.push({ age: i.retireAge + k + 1, balance: b });
  }
  // Present value at retirement of the drawings (start of each year).
  let needed = 0;
  for (let k = 0; k < retiredYears; k++) needed += (gapToday * Math.pow(infl, work + k)) / Math.pow(1 + i.retiredReturnPct / 100, k);
  const shortfall = Math.max(0, needed - g.balance);
  const r = Math.pow(1 + i.returnPct / 100, 1 / 12) - 1;
  const n = Math.round(work * 12);
  const extraMonthly = shortfall > 0 && n > 0 ? (r > 0 ? (shortfall * r) / (Math.pow(1 + r, n) - 1) : shortfall / n) : 0;
  return { atRetirement: g.balance, needed, fourPercent: gapToday * 25, gapToday, extraMonthly, lastsTo, path };
}
