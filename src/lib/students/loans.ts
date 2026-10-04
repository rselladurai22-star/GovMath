/**
 * Student loans for 2026/27: repayment plans, interest and a lifetime
 * projection, plus the Student Finance England maintenance loan.
 *
 * Thresholds from 6 April 2026: Plan 1 £26,900, Plan 2 £29,385, Plan 4
 * £33,795, Plan 5 £25,000, Postgraduate £21,000. Repayment is 9% of income
 * above the threshold (6% for Postgraduate). Interest from 1 September 2026
 * to 31 August 2027 uses March 2026 RPI of 4.1%, with a 6% cap on Plan 2 and
 * Postgraduate loans. The Plan 2 threshold is frozen at £29,385 from April 2027
 * to April 2030.
 */

export type Plan = "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";

export const RPI_MARCH_2026 = 0.041;
export const INTEREST_CAP_2026 = 0.06;

export type PlanSpec = {
  label: string;
  threshold: number;
  rate: number;
  /** Years after the April you were first due to repay. */
  writeOffYears: number;
  who: string;
  /** How the threshold changes after 2026/27. */
  thresholdRule: "rpi" | "frozen-to-2030" | "frozen" | "rpi-from-2027";
};

export const PLANS_2026: Record<Plan, PlanSpec> = {
  plan1: { label: "Plan 1", threshold: 26_900, rate: 0.09, writeOffYears: 25, who: "England and Wales before September 2012, and Northern Ireland", thresholdRule: "rpi" },
  plan2: { label: "Plan 2", threshold: 29_385, rate: 0.09, writeOffYears: 30, who: "England and Wales, September 2012 to July 2023", thresholdRule: "frozen-to-2030" },
  plan4: { label: "Plan 4", threshold: 33_795, rate: 0.09, writeOffYears: 30, who: "Scotland", thresholdRule: "rpi" },
  plan5: { label: "Plan 5", threshold: 25_000, rate: 0.09, writeOffYears: 40, who: "England, courses starting from August 2023", thresholdRule: "rpi-from-2027" },
  postgrad: { label: "Postgraduate Loan", threshold: 21_000, rate: 0.06, writeOffYears: 30, who: "Master's and Doctoral loans in England and Wales", thresholdRule: "frozen" },
};

/** Plan 2 interest income thresholds for 2026/27. */
export const PLAN2_INTEREST = { lower: 29_385, upper: 52_885 } as const;

/** Interest rate for a plan at a given income, using RPI and the 2026/27 rules. */
export function interestRate(plan: Plan, income: number, rpi = RPI_MARCH_2026, bankRatePlus1 = 0.0475, cap = INTEREST_CAP_2026, studying = false): number {
  switch (plan) {
    case "plan1":
    case "plan4":
      return Math.min(rpi, bankRatePlus1);
    case "plan5":
      return rpi;
    case "postgrad":
      return Math.min(rpi + 0.03, cap);
    case "plan2": {
      if (studying) return Math.min(rpi + 0.03, cap);
      const t = Math.max(0, Math.min(1, (income - PLAN2_INTEREST.lower) / (PLAN2_INTEREST.upper - PLAN2_INTEREST.lower)));
      return Math.min(rpi + 0.03 * t, cap);
    }
  }
}

/** Yearly repayment on a salary for one plan. */
export function repayment(plan: Plan, salary: number, threshold = PLANS_2026[plan].threshold): number {
  const p = PLANS_2026[plan];
  return Math.max(0, salary - threshold) * p.rate;
}

export type RepayInput = { salary: number; plans: Plan[] };

export type RepayLine = { plan: Plan; threshold: number; rate: number; yearly: number; monthly: number; weekly: number };

/** Repayments this year. Undergraduate plans: you repay against the lowest threshold of the plans you hold. */
export function repayments2026(i: RepayInput): { lines: RepayLine[]; yearly: number; monthly: number } {
  const salary = Math.max(0, i.salary);
  const ug = i.plans.filter((p) => p !== "postgrad");
  const lines: RepayLine[] = [];
  if (ug.length) {
    const lowest = ug.reduce((a, b) => (PLANS_2026[b].threshold < PLANS_2026[a].threshold ? b : a), ug[0]);
    const y = repayment(lowest, salary);
    lines.push({ plan: lowest, threshold: PLANS_2026[lowest].threshold, rate: 0.09, yearly: y, monthly: y / 12, weekly: y / 52 });
  }
  if (i.plans.includes("postgrad")) {
    const y = repayment("postgrad", salary);
    lines.push({ plan: "postgrad", threshold: 21_000, rate: 0.06, yearly: y, monthly: y / 12, weekly: y / 52 });
  }
  const yearly = lines.reduce((a, l) => a + l.yearly, 0);
  return { lines, yearly, monthly: yearly / 12 };
}

export type ProjectionInput = {
  plan: Plan;
  balance: number;
  salary: number;
  /** Yearly pay rise, as a decimal. */
  salaryGrowth: number;
  /** RPI assumed for future years. */
  rpi: number;
  /** Years already passed since repayments became due. */
  yearsRepaying: number;
  /** Extra voluntary payment a month. */
  extraMonthly: number;
};

export type ProjectionYear = { year: number; salary: number; threshold: number; rate: number; repaid: number; interest: number; balance: number };

export type ProjectionResult = {
  path: ProjectionYear[];
  totalRepaid: number;
  totalInterest: number;
  writtenOff: number;
  clearedIn: number | null;
  yearsLeft: number;
};

export function projectLoan(i: ProjectionInput): ProjectionResult {
  const spec = PLANS_2026[i.plan];
  const yearsLeft = Math.max(0, spec.writeOffYears - Math.max(0, Math.round(i.yearsRepaying)));
  let balance = Math.max(0, i.balance);
  let salary = Math.max(0, i.salary);
  let threshold = spec.threshold;
  const path: ProjectionYear[] = [];
  let totalRepaid = 0;
  let totalInterest = 0;
  let clearedIn: number | null = balance <= 0 ? 0 : null;
  for (let y = 1; y <= yearsLeft && balance > 0; y++) {
    const rate = y === 1 ? interestRate(i.plan, salary) : interestRate(i.plan, salary, i.rpi, i.rpi + 1, 1);
    const interest = balance * rate;
    const due = repayment(i.plan, salary, threshold) + Math.max(0, i.extraMonthly) * 12;
    const repaid = Math.min(balance + interest, due);
    balance = balance + interest - repaid;
    totalRepaid += repaid;
    totalInterest += interest;
    path.push({ year: y, salary, threshold, rate, repaid, interest, balance });
    if (balance <= 0.005 && clearedIn === null) {
      clearedIn = y;
      balance = 0;
    }
    salary *= 1 + i.salaryGrowth;
    // Thresholds after 2026/27 (year 1 here).
    const calendarYear = 2026 + y;
    if (spec.thresholdRule === "rpi" || (spec.thresholdRule === "rpi-from-2027" && calendarYear >= 2027) || (spec.thresholdRule === "frozen-to-2030" && calendarYear >= 2030)) threshold *= 1 + i.rpi;
  }
  return { path, totalRepaid, totalInterest, writtenOff: clearedIn === null ? balance : 0, clearedIn, yearsLeft };
}

/* ── Maintenance loan (Student Finance England, 2026/27) ────────── */

export type Living = "home" | "away" | "london" | "abroad";

/**
 * Maximum at £25,000 household income or less, falling in a straight line to
 * the minimum at `minAt`. The away-from-home figures are from the official
 * 2026/27 table; home and London minimums from published 2026/27 guides; the
 * abroad minimum and its income point are estimates.
 */
export const MAINTENANCE_2026: Record<Living, { max: number; min: number; minAt: number; label: string }> = {
  home: { max: 9_118, min: 4_013, minAt: 58_347, label: "Living with parents" },
  away: { max: 10_830, min: 5_048, minAt: 62_410, label: "Away from home, outside London" },
  london: { max: 14_135, min: 7_039, minAt: 70_131, label: "Away from home, in London" },
  abroad: { max: 12_403, min: 5_947, minAt: 66_770, label: "Studying abroad" },
};

export const STUDENT_SUPPORT_2026 = {
  tuitionFee: 9_790,
  accelerated: 11_750,
  incomeThreshold: 25_000,
  over60: 4_582,
  parentsLearning: { max: 2_024, min: 50 },
  childcareWeekly: { one: 199.62, two: 342.24 },
  adultDependants: 3_545,
} as const;

export function maintenanceLoan2026(income: number, living: Living): { loan: number; max: number; min: number; reduction: number; perTerm: number } {
  const b = MAINTENANCE_2026[living];
  const x = Math.max(0, income);
  let loan: number;
  if (x <= STUDENT_SUPPORT_2026.incomeThreshold) loan = b.max;
  else if (x >= b.minAt) loan = b.min;
  else loan = b.max - ((b.max - b.min) * (x - STUDENT_SUPPORT_2026.incomeThreshold)) / (b.minAt - STUDENT_SUPPORT_2026.incomeThreshold);
  // Student Finance England rounds the reduction down, so the loan rounds up.
  loan = Math.ceil(loan - 1e-9);
  return { loan, max: b.max, min: b.min, reduction: b.max - loan, perTerm: Math.round(loan / 3) };
}

/* ── Council tax for students ──────────────────────────────────── */

export type CouncilTaxInput = {
  /** Full-time students (and others who are disregarded, such as student nurses and under-25 apprentices). */
  students: number;
  /** Adults who are not disregarded. */
  others: number;
  /** Full yearly bill for the property. */
  bill: number;
  /** Months of the year the household is in this situation. */
  months: number;
};

export type CouncilTaxResult = { kind: "exempt" | "discount" | "full"; pay: number; saving: number; perAdult: number; explanation: string };

export function studentCouncilTax(i: CouncilTaxInput): CouncilTaxResult {
  const s = Math.max(0, Math.floor(i.students));
  const o = Math.max(0, Math.floor(i.others));
  const share = Math.max(0, Math.min(12, i.months)) / 12;
  const bill = Math.max(0, i.bill) * share;
  if (o === 0 && s > 0) return { kind: "exempt", pay: 0, saving: bill, perAdult: 0, explanation: "Everyone living there is a full-time student or otherwise disregarded, so the home is exempt." };
  if (o === 1) return { kind: "discount", pay: bill * 0.75, saving: bill * 0.25, perAdult: bill * 0.75, explanation: "Students are disregarded, so with one other adult the bill gets the 25% single person discount." };
  return { kind: "full", pay: bill, saving: 0, perAdult: o > 0 ? bill / o : bill, explanation: "With two or more adults who are not students, the full bill is due." };
}
