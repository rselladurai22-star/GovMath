/**
 * Statutory redundancy pay (UK, 2026/27).
 *
 * Per gov.uk:
 *  - 0.5 week's pay for each full year of service under age 22
 *  - 1   week's pay for each full year of service aged 22–40
 *  - 1.5 weeks' pay for each full year of service aged 41+
 *  - Max 20 years of service counted
 *  - Weekly pay capped at £751 (Apr 2026; £783 in Northern Ireland)
 *  - Total cap £22,530 (= 20 × 1.5 × £751)
 *  - Statutory redundancy pay is tax-free up to £30k
 */

const WEEKLY_PAY_CAP_2026 = 751;
export const MAX_YEARS = 20;

export type RedundancyInput = {
  ageAtRedundancy: number;
  yearsOfService: number;
  weeklyPay: number;
};

export type RedundancyResult = {
  weeksDue: number;
  cappedWeeklyPay: number;
  statutoryPayment: number;
  taxFree: number;
  yearsCounted: number;
};

export function statutoryRedundancy(input: RedundancyInput): RedundancyResult {
  const cappedWeeklyPay = Math.min(input.weeklyPay, WEEKLY_PAY_CAP_2026);
  const yearsCounted = Math.min(Math.floor(input.yearsOfService), MAX_YEARS);

  // Walk back from current age, counting each completed year of service
  let weeks = 0;
  for (let y = 0; y < yearsCounted; y++) {
    const ageInThatYear = input.ageAtRedundancy - y - 1; // age at start of that year of service
    if (ageInThatYear < 22) weeks += 0.5;
    else if (ageInThatYear < 41) weeks += 1;
    else weeks += 1.5;
  }

  const statutoryPayment = weeks * cappedWeeklyPay;
  const taxFree = Math.min(statutoryPayment, 30_000);

  return {
    weeksDue: weeks,
    cappedWeeklyPay,
    statutoryPayment,
    taxFree,
    yearsCounted,
  };
}

/** Northern Ireland has its own, higher weekly cap. */
const WEEKLY_PAY_CAP_NI_2026 = 783;
export const TAX_FREE_TERMINATION = 30_000;

/** Statutory minimum notice from an employer: 1 week after a month, then 1 week a year from 2 years, up to 12. */
export function statutoryNoticeWeeks(years: number): number {
  const y = Math.floor(Math.max(0, years));
  if (y < 2) return 1;
  return Math.min(12, y);
}

export type PackageInput = {
  age: number;
  years: number;
  weeklyPay: number;
  nation?: "gb" | "ni";
  /** Employer pays statutory weeks on full weekly pay, ignoring the cap. */
  uncapped?: boolean;
  /** Any extra redundancy payment on top, £. */
  enhancedExtra?: number;
  /** Notice in your contract, weeks (0 = statutory only). */
  contractNoticeWeeks?: number;
  /** Paid in lieu instead of working the notice. */
  payInLieu?: boolean;
  /** Holiday owed, in days, and your pay for a day. */
  holidayDays?: number;
  daysPerWeek?: number;
};

export type PackageResult = {
  statutory: number;
  redundancy: number;
  weeksDue: number;
  noticeWeeks: number;
  noticePay: number;
  holidayPay: number;
  taxFree: number;
  taxable: number;
  total: number;
  capUsed: number;
  capApplies: boolean;
};

export function redundancyPackage(i: PackageInput): PackageResult {
  const cap = i.nation === "ni" ? WEEKLY_PAY_CAP_NI_2026 : WEEKLY_PAY_CAP_2026;
  const base = statutoryRedundancy({ ageAtRedundancy: i.age, yearsOfService: i.years, weeklyPay: Math.min(i.weeklyPay, cap) });
  const statutory = base.weeksDue * Math.min(Math.max(0, i.weeklyPay), cap);
  const redundancy = (i.uncapped ? base.weeksDue * Math.max(0, i.weeklyPay) : statutory) + Math.max(0, i.enhancedExtra ?? 0);
  const noticeWeeks = Math.max(statutoryNoticeWeeks(i.years), Math.max(0, i.contractNoticeWeeks ?? 0));
  const noticePay = i.payInLieu ? noticeWeeks * Math.max(0, i.weeklyPay) : 0;
  const dayPay = Math.max(0, i.weeklyPay) / Math.max(1, i.daysPerWeek ?? 5);
  const holidayPay = Math.max(0, i.holidayDays ?? 0) * dayPay;
  const taxFree = Math.min(redundancy, TAX_FREE_TERMINATION);
  return {
    statutory,
    redundancy,
    weeksDue: base.weeksDue,
    noticeWeeks,
    noticePay,
    holidayPay,
    taxFree,
    taxable: redundancy - taxFree + noticePay + holidayPay,
    total: redundancy + noticePay + holidayPay,
    capUsed: cap,
    capApplies: i.weeklyPay > cap,
  };
}
