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
