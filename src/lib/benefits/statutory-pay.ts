/**
 * UK Statutory Sick Pay and Statutory Paternity Pay (2026/27).
 *
 * From 6 April 2026 SSP is paid from the first day of sickness (no waiting
 * days) and the Lower Earnings Limit no longer applies. The weekly amount is
 * the lower of 80% of average weekly earnings or the flat rate.
 */

export const SSP_WEEKLY_2026 = 123.25; // flat weekly rate from 6 April 2026
export const SSP_RATE_PCT = 0.8; // 80% of AWE if lower
export const SPP_WEEKLY_2026 = 194.32; // statutory weekly flat
export const SPP_RATE_PCT = 0.9; // 90% of AWE if lower

export function statutorySickPay(weeksOff: number, averageWeeklyEarnings?: number) {
  const eligibleWeeks = Math.max(0, Math.min(28, weeksOff));
  const eightyPct =
    averageWeeklyEarnings === undefined ? Infinity : Math.max(0, averageWeeklyEarnings) * SSP_RATE_PCT;
  const weeklyRate = Math.min(SSP_WEEKLY_2026, eightyPct);
  return {
    weeklyRate,
    eligibleWeeks,
    totalSSP: eligibleWeeks * weeklyRate,
    waitingDays: 0,
    flatRateApplied: SSP_WEEKLY_2026 <= eightyPct,
  };
}

export function statutoryPaternityPay(averageWeeklyEarnings: number) {
  const ninetyPct = averageWeeklyEarnings * SPP_RATE_PCT;
  const weeklyPay = Math.min(SPP_WEEKLY_2026, ninetyPct);
  return {
    weeklyPay,
    weeks: 2,
    totalSPP: weeklyPay * 2,
    flatRateApplied: SPP_WEEKLY_2026 < ninetyPct,
  };
}

export type SickPeriodInput = {
  averageWeeklyEarnings: number;
  /** Days you normally work each week (qualifying days). */
  qualifyingDays: number;
  /** Qualifying days off sick in this spell. */
  daysOff: number;
  /** Weeks of SSP already paid in a linked spell (within 8 weeks). */
  weeksAlreadyPaid?: number;
  /** Company sick pay: weeks on full pay, then weeks on half pay. */
  fullPayWeeks?: number;
  halfPayWeeks?: number;
};

export type SickPeriodResult = {
  weeklyRate: number;
  dailyRate: number;
  daysPaid: number;
  daysLeft: number;
  ssp: number;
  /** What company sick pay would give for the same days (SSP counts towards it). */
  companyPay: number;
  /** The better of SSP and company sick pay. */
  youGet: number;
  flatRateApplied: boolean;
};

export function sickPeriod(i: SickPeriodInput): SickPeriodResult {
  const q = Math.min(7, Math.max(1, Math.round(i.qualifyingDays)));
  const base = statutorySickPay(1, i.averageWeeklyEarnings);
  const dailyRate = base.weeklyRate / q;
  const maxDays = Math.max(0, 28 - Math.max(0, i.weeksAlreadyPaid ?? 0)) * q;
  const days = Math.max(0, Math.round(i.daysOff));
  const daysPaid = Math.min(days, maxDays);
  const ssp = daysPaid * dailyRate;
  const dayPay = Math.max(0, i.averageWeeklyEarnings) / q;
  const fullDays = Math.max(0, i.fullPayWeeks ?? 0) * q;
  const halfDays = Math.max(0, i.halfPayWeeks ?? 0) * q;
  const companyPay = Math.min(days, fullDays) * dayPay + Math.min(Math.max(0, days - fullDays), halfDays) * dayPay * 0.5;
  return {
    weeklyRate: base.weeklyRate,
    dailyRate,
    daysPaid,
    daysLeft: Math.max(0, maxDays - daysPaid),
    ssp,
    companyPay,
    youGet: Math.max(ssp, companyPay),
    flatRateApplied: base.flatRateApplied,
  };
}
