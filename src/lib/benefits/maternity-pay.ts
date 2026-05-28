/**
 * Statutory Maternity Pay (SMP) — 2025/26.
 *
 * 39 weeks paid:
 *   Weeks 1–6:   90% of Average Weekly Earnings (AWE), no cap.
 *   Weeks 7–39:  lower of £187.18 or 90% of AWE.
 * Final 13 weeks (40–52): unpaid.
 *
 * Eligibility (not modelled): 26 weeks continuous service by 15th week
 * before EWC, AWE ≥ Lower Earnings Limit (£125/week 2025/26).
 */

export const SMP_2025_26 = {
  flatRate: 187.18,
  hi90Weeks: 6,
  flatWeeks: 33,
  unpaidWeeks: 13,
} as const;

export type SMPResult = {
  awe: number;
  high90Weekly: number;
  flatWeekly: number;
  high90Total: number;
  flatTotal: number;
  total39Weeks: number;
};

export function statutoryMaternityPay(averageWeeklyEarnings: number): SMPResult {
  const awe = Math.max(0, averageWeeklyEarnings);
  const c = SMP_2025_26;
  const ninety = awe * 0.9;
  const high90 = ninety; // weeks 1–6, no cap
  const flat = Math.min(c.flatRate, ninety); // weeks 7–39
  return {
    awe,
    high90Weekly: high90,
    flatWeekly: flat,
    high90Total: high90 * c.hi90Weeks,
    flatTotal: flat * c.flatWeeks,
    total39Weeks: high90 * c.hi90Weeks + flat * c.flatWeeks,
  };
}
