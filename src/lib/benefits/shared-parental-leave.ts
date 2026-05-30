/**
 * Shared Parental Leave & Pay (ShPL/ShPP) — UK 2025/26.
 *
 * The mother / primary adopter can curtail their maternity / adoption leave and pay
 * to share what’s left with the partner:
 *  - Up to 50 weeks of leave to share (52 minus the compulsory first 2 weeks).
 *  - Up to 37 weeks of statutory pay (39 SMP weeks minus 2 mandatory weeks at SMP).
 *
 * Statutory Shared Parental Pay (ShPP) for 2025/26 is the lower of:
 *  - £187.18 per week, OR
 *  - 90% of the parent’s average weekly earnings.
 *
 * Both parents must have continuous service of 26 weeks with their employer
 * by the 15th week before the due date.
 */

export const SHPP_WEEKLY_RATE = 187.18;
export const MAX_SHARED_LEAVE_WEEKS = 50;
export const MAX_SHARED_PAY_WEEKS = 37;

export type ShplInput = {
  parent1Weeks: number;
  parent2Weeks: number;
  parent1WeeklyEarnings: number;
  parent2WeeklyEarnings: number;
  /** Weeks of pay each parent will actually claim (must be within leave). */
  parent1PaidWeeks: number;
  parent2PaidWeeks: number;
};

export type ShplResult = {
  totalLeaveWeeks: number;
  unusedLeaveWeeks: number;
  totalPaidWeeks: number;
  parent1WeeklyPay: number;
  parent2WeeklyPay: number;
  parent1TotalPay: number;
  parent2TotalPay: number;
  combinedPay: number;
  exceedsLeaveCap: boolean;
  exceedsPayCap: boolean;
};

function statutoryPay(weeklyEarnings: number): number {
  const ninetyPct = 0.9 * Math.max(0, weeklyEarnings);
  return Math.min(SHPP_WEEKLY_RATE, ninetyPct);
}

export function sharedParentalLeave(input: ShplInput): ShplResult {
  const p1Leave = Math.max(0, input.parent1Weeks);
  const p2Leave = Math.max(0, input.parent2Weeks);
  const p1Pay = Math.max(0, Math.min(input.parent1PaidWeeks, p1Leave));
  const p2Pay = Math.max(0, Math.min(input.parent2PaidWeeks, p2Leave));
  const totalLeaveWeeks = p1Leave + p2Leave;
  const totalPaidWeeks = p1Pay + p2Pay;
  const parent1WeeklyPay = statutoryPay(input.parent1WeeklyEarnings);
  const parent2WeeklyPay = statutoryPay(input.parent2WeeklyEarnings);
  const parent1TotalPay = parent1WeeklyPay * p1Pay;
  const parent2TotalPay = parent2WeeklyPay * p2Pay;
  return {
    totalLeaveWeeks,
    unusedLeaveWeeks: Math.max(0, MAX_SHARED_LEAVE_WEEKS - totalLeaveWeeks),
    totalPaidWeeks,
    parent1WeeklyPay,
    parent2WeeklyPay,
    parent1TotalPay,
    parent2TotalPay,
    combinedPay: parent1TotalPay + parent2TotalPay,
    exceedsLeaveCap: totalLeaveWeeks > MAX_SHARED_LEAVE_WEEKS,
    exceedsPayCap: totalPaidWeeks > MAX_SHARED_PAY_WEEKS,
  };
}
