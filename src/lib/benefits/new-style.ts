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
  const d = new Date(`${claimDate}T00:00:00Z`);
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
  met: boolean;
};

/**
 * Contribution conditions, from yearly earnings. Class 1 is only "paid" on
 * earnings above the Lower Earnings Limit each week, so steady weekly pay is
 * assumed; irregular pay may give a different answer.
 */
export function contributionTest(i: ContributionInput): ContributionResult {
  const [a, b] = relevantYears(i.claimDate);
  const lelA = LEL[a] ?? 123;
  const lelB = LEL[b] ?? 123;
  const paidNeeded = 26 * Math.min(lelA, lelB);
  const conditionA = (i.earningsEarlier >= 26 * lelA && i.earningsEarlier > 0) || (i.earningsLater >= 26 * lelB && i.earningsLater > 0);
  const okA = i.creditedEarlier || i.earningsEarlier >= 50 * lelA;
  const okB = i.creditedLater || i.earningsLater >= 50 * lelB;
  return {
    years: [taxYearLabel(a), taxYearLabel(b)],
    paidNeeded,
    eachYearNeeded: [50 * lelA, 50 * lelB],
    conditionA,
    conditionB: okA && okB,
    yearOk: [okA, okB],
    met: conditionA && okA && okB,
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
  const r = NEW_STYLE_2026.jsa;
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
  const r = NEW_STYLE_2026.esa;
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
  // Permitted work: under 16 hours and up to £203.50 a week. Anything more ends ESA.
  const permittedWorkOk = i.earnings <= 0 || (i.hours < 16 && i.earnings <= r.permittedWorkHigher);
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
