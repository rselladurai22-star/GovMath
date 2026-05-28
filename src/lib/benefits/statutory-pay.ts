/**
 * UK Statutory Sick Pay and Statutory Paternity Pay (2025/26).
 */

export const SSP_WEEKLY_2025 = 118.75; // April 2025
export const SPP_WEEKLY_2025 = 187.18; // statutory weekly flat
export const SPP_RATE_PCT = 0.9; // 90% of AWE if lower

export function statutorySickPay(weeksOff: number) {
  const eligibleWeeks = Math.max(0, Math.min(28, weeksOff));
  return {
    weeklyRate: SSP_WEEKLY_2025,
    eligibleWeeks,
    totalSSP: eligibleWeeks * SSP_WEEKLY_2025,
    waitingDays: 3,
  };
}

export function statutoryPaternityPay(averageWeeklyEarnings: number) {
  const ninetyPct = averageWeeklyEarnings * SPP_RATE_PCT;
  const weeklyPay = Math.min(SPP_WEEKLY_2025, ninetyPct);
  return {
    weeklyPay,
    weeks: 2,
    totalSPP: weeklyPay * 2,
    flatRateApplied: SPP_WEEKLY_2025 < ninetyPct,
  };
}
