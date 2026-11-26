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

const RPI_MARCH_2026 = 0.041;
const INTEREST_CAP_2026 = 0.06;

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
const PLAN2_INTEREST = { lower: 29_385, upper: 52_885 } as const;

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
function repayment(plan: Plan, salary: number, threshold = PLANS_2026[plan].threshold): number {
  const p = PLANS_2026[plan];
  return Math.max(0, salary - threshold) * p.rate;
}

/**
 * What an employer takes from one month's pay. Payroll uses the published
 * monthly threshold (the yearly one divided by 12 and rounded down) and
 * rounds the 9% down to a whole pound, as in GOV.UK's worked examples.
 */
export function monthlyPayroll(plan: Plan, salary: number, threshold = PLANS_2026[plan].threshold): number {
  const p = PLANS_2026[plan];
  return Math.floor(Math.max(0, Math.max(0, salary) / 12 - Math.floor(threshold / 12)) * p.rate + 1e-9);
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
    // Plan 2's interest band moves with the repayment threshold, so later years compare salary to the uprated band.
    const bandIncome = salary * (spec.threshold / threshold);
    const rate = y === 1 ? interestRate(i.plan, salary) : interestRate(i.plan, bandIncome, i.rpi, i.rpi + 1, 1);
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

type LivingRates = {
  label: string;
  /** Full-year maximum (Education (Student Support) Regulations 2011, reg. 80A(2)). */
  max: number;
  /** Final-year maximum (reg. 80A(3)): the final year is shorter. */
  finalMax: number;
  /** The non-means-tested part (reg. 105(6A)), and in a final year (reg. 105(6B)). */
  min: number;
  finalMin: number;
  /** £1 off for every complete £… of household income over £25,000. */
  divisor: number;
  /** Students who can claim benefits, such as lone parents (reg. 80B): a higher maximum, tapered faster up to £42,875. */
  benefits: { max: number; finalMax: number; divisor: number; finalDivisor: number };
  /** Long Courses Loan for each week beyond 30 weeks and 3 days (reg. 81(5)). */
  longWeek: number;
};

/**
 * 2026/27 rates from S.I. 2026/130 (amending the Education (Student Support)
 * Regulations 2011), matching Student Finance England's "How you're assessed
 * and paid 2026 to 2027". Categories A to D in the regulations: with parents,
 * London, abroad, elsewhere.
 */
export const MAINTENANCE_2026: Record<Living, LivingRates> = {
  home: { label: "Living with parents", max: 9_118, finalMax: 8_579, min: 4_013, finalMin: 3_687, divisor: 6.54, benefits: { max: 10_757, finalMax: 10_255, divisor: 4.088, finalDivisor: 4.054 }, longWeek: 77 },
  away: { label: "Away from home, outside London", max: 10_830, finalMax: 10_242, min: 5_048, finalMin: 4_693, divisor: 6.47, benefits: { max: 12_345, finalMax: 11_800, divisor: 4.179, finalDivisor: 4.137 }, longWeek: 116 },
  london: { label: "Away from home, in London", max: 14_135, finalMax: 13_096, min: 7_039, finalMin: 6_413, divisor: 6.36, benefits: { max: 15_415, finalMax: 14_447, divisor: 4.37, finalDivisor: 4.295 }, longWeek: 149 },
  abroad: { label: "A year studying abroad", max: 12_403, finalMax: 11_103, min: 5_996, finalMin: 5_210, divisor: 6.41, benefits: { max: 13_806, finalMax: 12_597, divisor: 4.265, finalDivisor: 4.174 }, longWeek: 161 },
};

export const STUDENT_SUPPORT_2026 = {
  tuitionFee: 9_790,
  accelerated: 11_750,
  incomeThreshold: 25_000,
  /** Where the faster taper for students who can claim benefits ends. */
  benefitsKnee: 42_875,
  /** Students aged 60 or over: a loan for living costs of up to £4,582, £1 off for every £4.16 over £25,000, nil below £50 (reg. 80C). */
  over60: { max: 4_582, divisor: 4.16, floor: 50 },
  /** Allowance taken off parents' income for each other dependent child. */
  childAllowance: 1_130,
} as const;

export type MaintenanceOptions = {
  /** The final year of the course (a shorter year, so lower rates). */
  finalYear?: boolean;
  /** Can claim benefits while studying, for example a lone parent or some disabled students. */
  benefits?: boolean;
  /** A care leaver: household income is not used, so the maximum is available (from 2026/27). */
  careLeaver?: boolean;
};

export type MaintenanceResult = {
  loan: number;
  max: number;
  min: number;
  /** Taken off the maximum because of household income: the support families are expected to make up. */
  reduction: number;
  /** About a third of the loan, paid at the start of each term. */
  perTerm: number;
  /** Household income at which the loan reaches its minimum. */
  minAt: number;
};

const complete = (amount: number, per: number) => Math.floor(Math.max(0, amount) / per + 1e-9);

/** The 2026/27 Maintenance Loan for a full-time student who started on or after 1 August 2016. */
export function maintenanceLoan2026(income: number, living: Living, opts: MaintenanceOptions = {}): MaintenanceResult {
  const r = MAINTENANCE_2026[living];
  const t = STUDENT_SUPPORT_2026.incomeThreshold;
  const min = opts.finalYear ? r.finalMin : r.min;
  const x = Math.max(0, income);
  let max: number;
  let cut: number;
  let minAt: number;
  if (opts.benefits) {
    const b = r.benefits;
    max = opts.finalYear ? b.finalMax : b.max;
    const d1 = opts.finalYear ? b.finalDivisor : b.divisor;
    const knee = STUDENT_SUPPORT_2026.benefitsKnee;
    cut = complete(Math.min(x, knee) - t, d1) + complete(x - knee, r.divisor);
    const atKnee = complete(knee - t, d1);
    minAt = max - atKnee <= min ? t + (max - min) * d1 : knee + (max - min - atKnee) * r.divisor;
  } else {
    max = opts.finalYear ? r.finalMax : r.max;
    cut = complete(x - t, r.divisor);
    minAt = t + (max - min) * r.divisor;
  }
  if (opts.careLeaver) cut = 0;
  const loan = Math.max(min, max - cut);
  return { loan, max, min, reduction: max - loan, perTerm: Math.round(loan / 3), minAt: Math.ceil(minAt) };
}

/** Students aged 60 or over on the first day of the course: a means-tested loan for living costs (reg. 80C). */
export function over60Loan2026(income: number, careLeaver = false): number {
  const o = STUDENT_SUPPORT_2026.over60;
  const loan = careLeaver ? o.max : o.max - complete(income - STUDENT_SUPPORT_2026.incomeThreshold, o.divisor);
  return loan < o.floor ? 0 : loan;
}

/* ── Council tax for students ──────────────────────────────────── */

/**
 * The adults (18 or over) in a student home, for council tax in England,
 * Wales and Scotland:
 * - student: a full-time student (a course of a year or more and 21+ hours a
 *   week; or under 20 and studying up to A level for 12+ hours a week)
 * - spouse: a student's husband, wife, civil partner or dependant who is not
 *   a British citizen and whose visa bars them from paid work or benefits
 * - leaver: a school or college leaver under 20 who finished after 30 April,
 *   until 1 November
 * - disregarded: anyone else who is not counted (an apprentice on £195 a week
 *   or less, a student nurse, a live-in carer and others)
 * - counts: anyone else, including part-time students and anyone working
 * Sources: Council Tax (Exempt Dwellings) Order 1992, Class N; Local
 * Government Finance Act 1992, Schedule 1; Council Tax (Additional Provisions
 * for Discount Disregards) Regulations 1992, Classes C and E; GOV.UK.
 */
export type StudentHomePerson = "student" | "spouse" | "leaver" | "disregarded" | "counts";

export type CouncilTaxInput = {
  people: StudentHomePerson[];
  /** Full yearly bill for the property. */
  bill: number;
  /** Months of the year the household is like this. */
  months: number;
};

export type CouncilTaxResult = {
  kind: "exempt" | "half" | "discount" | "full";
  /** Share of the bill taken off. */
  rate: number;
  /** Adults who count. */
  counted: number;
  pay: number;
  saving: number;
  /** The bill split between the adults who count (who are the ones liable). */
  perAdult: number;
};

/** Exempt when everyone is a student (or a non-British spouse or a school leaver); otherwise 50%, 25% or nothing off by how many adults count. */
export function studentCouncilTax(i: CouncilTaxInput): CouncilTaxResult {
  const share = Math.max(0, Math.min(12, i.months)) / 12;
  const bill = Math.max(0, i.bill) * share;
  const people = i.people;
  const counted = people.filter((p) => p === "counts").length;
  const relevant = (p: StudentHomePerson) => p === "student" || p === "spouse" || p === "leaver";
  const exempt = people.length > 0 && people.every(relevant) && people.some((p) => p === "student");
  const rate = exempt ? 1 : counted === 0 && people.length > 0 ? 0.5 : counted === 1 ? 0.25 : 0;
  const kind = exempt ? "exempt" : rate === 0.5 ? "half" : rate === 0.25 ? "discount" : "full";
  const pay = bill * (1 - rate);
  return { kind, rate, counted, pay, saving: bill - pay, perAdult: counted > 0 ? pay / counted : pay };
}
