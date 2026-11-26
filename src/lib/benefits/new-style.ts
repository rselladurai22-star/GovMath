/**
 * New Style Jobseeker's Allowance and New Style Employment and Support
 * Allowance, 2026/27 (weekly).
 *
 * Source: DWP "Benefit and pension rates 2026 to 2027".
 *
 * Both are contributory: they depend on Class 1 National Insurance paid (or
 * credited) in the two complete tax years before the benefit year, not on
 * savings or a partner's income. Both count in full as unearned income for
 * Universal Credit.
 *
 *   JSA = personal rate − pension over £50 a week (£1 for £1)
 *                       − part-time earnings over £5 a week (£1 for £1)
 *   ESA = basic rate (assessment phase) or main phase rate + support component
 *         − half of pension over £85 a week
 */

import { forYear, type RatesYear } from "./rates-year";

export const NEW_STYLE_2026 = {
  jsa: { under25: 75.65, over25: 95.55, weeks: 26, pensionThreshold: 50, earningsDisregard: 5, hoursLimit: 16 },
  esa: {
    assessment: { under25: 75.65, over25: 95.55 },
    main: 95.55,
    /** Work-related activity component: only claims made before 3 April 2017. */
    wrac: 37.95,
    support: 50.35,
    assessmentWeeks: 13,
    /** Work-related activity group: paid for 365 days (52 weeks). */
    wragWeeks: 52,
    pensionThreshold: 85,
    permittedWorkHigher: 203.5,
    permittedWorkLower: 20,
  },
  waitingDays: 7,
} as const;

/**
 * Proposed weekly rates from 6 April 2027: DWP "Proposed benefit and pension
 * rates 2027 to 2028" (Jobseeker's Allowance personal rates; contributory ESA
 * personal allowances and components; permitted work limits). The JSA pension
 * threshold (£50), the £5 earnings disregard and the ESA pension threshold
 * (£85) are unchanged.
 */
export const NEW_STYLE_2027 = {
  jsa: { under25: 78.3, over25: 98.9, weeks: 26, pensionThreshold: 50, earningsDisregard: 5, hoursLimit: 16 },
  esa: {
    assessment: { under25: 78.3, over25: 98.9 },
    main: 98.9,
    wrac: 39.3,
    support: 52.1,
    assessmentWeeks: 13,
    wragWeeks: 52,
    pensionThreshold: 85,
    permittedWorkHigher: 211.5,
    permittedWorkLower: 20,
  },
  waitingDays: 7,
} as const;

type Widen<T> = { [K in keyof T]: T[K] extends number ? number : Widen<T[K]> };
export type NewStyleRates = Widen<typeof NEW_STYLE_2026>;

export const newStyleRates = (year?: RatesYear): NewStyleRates => forYear<NewStyleRates>(year, NEW_STYLE_2026, NEW_STYLE_2027);

/**
 * Lower Earnings Limit a week for each tax year (the year it starts). The
 * contribution conditions are multiples of it.
 */
export const LEL: Record<number, number> = { 2022: 123, 2023: 123, 2024: 123, 2025: 125, 2026: 129 };

/**
 * The two tax years that count for a claim. The benefit year starts on the
 * first Sunday in January, and uses the last two complete tax years before it:
 * a claim made between 4 January 2026 and 2 January 2027 uses 2023/24 and
 * 2024/25.
 */
export function relevantYears(claimDate: string): [number, number] {
  const parsed = new Date(`${claimDate}T00:00:00Z`);
  // An unfinished date box falls back to today.
  const d = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const y = d.getUTCFullYear();
  // First Sunday of January in year y.
  const jan1 = new Date(Date.UTC(y, 0, 1));
  const firstSunday = 1 + ((7 - jan1.getUTCDay()) % 7);
  const benefitYear = d.getUTCMonth() === 0 && d.getUTCDate() < firstSunday ? y - 1 : y;
  // Benefit year starting in January Y: last complete tax years are (Y-3)/(Y-2) and (Y-2)/(Y-1).
  return [benefitYear - 3, benefitYear - 2];
}

export const taxYearLabel = (start: number) => `${start}/${String((start + 1) % 100).padStart(2, "0")}`;

export type ContributionInput = {
  claimDate: string;
  /** Pay as an employee in the earlier and later relevant tax year (gross, for the year). */
  earningsEarlier: number;
  earningsLater: number;
  /** Got National Insurance credits for the whole of the year (for example on Carer's Allowance or UC). */
  creditedEarlier: boolean;
  creditedLater: boolean;
  /** Weeks of the year the pay was earned in (default 52: steady pay all year). */
  weeksEarlier?: number;
  weeksLater?: number;
  /**
   * New Style ESA only: self-employed all year with profits at or above the
   * small profits threshold, so Class 2 contributions were paid or treated as
   * paid for every week (JSA counts Class 1 only).
   */
  selfEmployedEarlier?: boolean;
  selfEmployedLater?: boolean;
  /** Which benefit: ESA also counts Class 2 contributions. Default "jsa". */
  benefit?: "jsa" | "esa";
};

export type ContributionYear = {
  /** "2024/25". */
  label: string;
  /** The year's Lower Earnings Limit a week. */
  lel: number;
  /** Condition A: earnings counted (each week capped at the LEL), Class 2 added for ESA. */
  counted: number;
  /** 26 × LEL. */
  countedNeeded: number;
  /** Condition B: earnings factor paid, treated as paid or credited. */
  factor: number;
  /** 50 × LEL. */
  factorNeeded: number;
  /** Condition A met by this year on its own. */
  aOk: boolean;
  /** Condition B met for this year. */
  bOk: boolean;
  /** Weekly pay was under the LEL, so no Class 1 counted at all. */
  underLel: boolean;
};

export type ContributionResult = {
  years: [string, string];
  /** Condition A: earnings of 26 × LEL with Class 1 paid in one year. */
  paidNeeded: number;
  /** Condition B: 50 × LEL paid or credited in each year. */
  eachYearNeeded: [number, number];
  conditionA: boolean;
  conditionB: boolean;
  /** Condition B, year by year. */
  yearOk: [boolean, boolean];
  /** Each year's figures, earlier year first. */
  detail: [ContributionYear, ContributionYear];
  met: boolean;
};

const lelFor = (start: number) => LEL[start] ?? LEL[Math.max(...Object.keys(LEL).map(Number))];

function yearTest(start: number, earnings: number, weeks: number, credited: boolean, selfEmployed: boolean): ContributionYear {
  const lel = lelFor(start);
  const wk = Math.min(52, Math.max(1, Math.round(weeks)));
  const pay = Math.max(0, earnings);
  // Class 1 is only paid (or treated as paid) in weeks earning at least the
  // LEL; for condition A each such week counts at most the LEL (Jobseekers
  // Act 1995 s2(2B), Welfare Reform Act 2007 Sch 1 para 1(3A)).
  const underLel = pay > 0 && pay / wk < lel;
  const classOne = underLel ? 0 : pay;
  const class2 = selfEmployed ? 52 * lel : 0;
  const counted = (classOne > 0 ? Math.min(classOne, wk * lel) : 0) + class2;
  const factor = credited ? Math.max(classOne + class2, 52 * lel) : classOne + class2;
  return {
    label: taxYearLabel(start),
    lel,
    counted,
    countedNeeded: 26 * lel,
    factor,
    factorNeeded: 50 * lel,
    aOk: counted > 0 && counted >= 26 * lel,
    bOk: factor >= 50 * lel,
    underLel,
  };
}

/**
 * The two contribution conditions, from each year's pay as an employee and
 * the weeks it was earned in (steady pay within those weeks is assumed).
 * Condition A: in one of the two years, Class 1 (or, for ESA, Class 2) paid
 * on earnings of at least 26 × that year's Lower Earnings Limit, each week
 * counting up to the LEL. Condition B: in each year, paid or credited
 * earnings of at least 50 × LEL.
 */
export function contributionTest(i: ContributionInput): ContributionResult {
  const [a, b] = relevantYears(i.claimDate);
  const esa = i.benefit === "esa";
  const ya = yearTest(a, i.earningsEarlier, i.weeksEarlier ?? 52, i.creditedEarlier, esa && !!i.selfEmployedEarlier);
  const yb = yearTest(b, i.earningsLater, i.weeksLater ?? 52, i.creditedLater, esa && !!i.selfEmployedLater);
  const conditionA = ya.aOk || yb.aOk;
  return {
    years: [ya.label, yb.label],
    paidNeeded: 26 * Math.min(ya.lel, yb.lel),
    eachYearNeeded: [ya.factorNeeded, yb.factorNeeded],
    conditionA,
    conditionB: ya.bOk && yb.bOk,
    yearOk: [ya.bOk, yb.bOk],
    detail: [ya, yb],
    met: conditionA && ya.bOk && yb.bOk,
  };
}

/* ── New Style JSA ───────────────────────────────────────── */

export type JsaInput = {
  over25: boolean;
  /** Private or workplace pension a week, before tax. */
  pension: number;
  /** Part-time earnings a week after tax, NI and half of pension contributions. */
  earnings: number;
  /** Hours of paid work a week. 16 or more ends JSA. */
  hours: number;
  /** Rates to use (default 2026/27). */
  year?: RatesYear;
};

export type JsaResult = {
  personal: number;
  pensionDeduction: number;
  earningsDeduction: number;
  weekly: number;
  fortnightly: number;
  /** Over the 182 days (26 weeks). */
  total: number;
  /** As counted by Universal Credit: weekly × 52 ÷ 12. */
  monthlyForUc: number;
  tooManyHours: boolean;
};

export function newStyleJsa(i: JsaInput): JsaResult {
  const r = newStyleRates(i.year).jsa;
  const personal = i.over25 ? r.over25 : r.under25;
  const tooManyHours = i.hours >= r.hoursLimit;
  const pensionDeduction = Math.max(0, i.pension - r.pensionThreshold);
  const earningsDeduction = Math.max(0, i.earnings - r.earningsDisregard);
  const weekly = tooManyHours ? 0 : round2(Math.max(0, personal - pensionDeduction - earningsDeduction));
  return {
    personal,
    pensionDeduction,
    earningsDeduction,
    weekly,
    fortnightly: weekly * 2,
    total: weekly * r.weeks,
    monthlyForUc: (weekly * 52) / 12,
    tooManyHours,
  };
}

/* ── New Style ESA ───────────────────────────────────────── */

export type EsaGroup = "assessment" | "wrag" | "support";

export type EsaInput = {
  over25: boolean;
  group: EsaGroup;
  /** Claim made before 3 April 2017 (keeps the work-related activity component). */
  pre2017: boolean;
  pension: number;
  /** Permitted work earnings a week. */
  earnings: number;
  /** Hours of permitted work a week. */
  hours: number;
  /** Rates to use (default 2026/27). */
  year?: RatesYear;
};

export type EsaResult = {
  basic: number;
  component: number;
  componentLabel: string | null;
  pensionDeduction: number;
  weekly: number;
  fortnightly: number;
  /** Weeks it can be paid for: 52 in the work-related activity group, unlimited (null) in the support group. */
  limitWeeks: number | null;
  monthlyForUc: number;
  permittedWorkOk: boolean;
};

export function newStyleEsa(i: EsaInput): EsaResult {
  const r = newStyleRates(i.year).esa;
  const basic = i.group === "assessment" ? (i.over25 ? r.assessment.over25 : r.assessment.under25) : r.main;
  let component = 0;
  let componentLabel: string | null = null;
  if (i.group === "support") {
    component = r.support;
    componentLabel = "Support component";
  } else if (i.group === "wrag" && i.pre2017) {
    component = r.wrac;
    componentLabel = "Work-related activity component";
  }
  const pensionDeduction = Math.max(0, i.pension - r.pensionThreshold) / 2;
  // Permitted work (ESA Regulations 2008 reg 45): up to £20 a week at any hours,
  // or under 16 hours and up to £203.50 a week (£211.50 from April 2027).
  // Unpaid voluntary work is unlimited. Anything more ends ESA.
  const permittedWorkOk = i.earnings <= 0 || i.earnings <= r.permittedWorkLower || (i.hours < 16 && i.earnings <= r.permittedWorkHigher);
  const weekly = permittedWorkOk ? round2(Math.max(0, basic + component - pensionDeduction)) : 0;
  return {
    basic,
    component,
    componentLabel,
    pensionDeduction,
    weekly,
    fortnightly: weekly * 2,
    limitWeeks: i.group === "support" ? null : r.wragWeeks,
    monthlyForUc: (weekly * 52) / 12,
    permittedWorkOk,
  };
}

const round2 = (n: number) => Math.round(n * 100) / 100;
