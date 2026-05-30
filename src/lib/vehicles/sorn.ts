/**
 * SORN (Statutory Off-Road Notification) — VED refund estimator.
 *
 * When you SORN a vehicle, DVLA refunds the full unused months of VED
 * (rounded down). Refund cheque normally arrives in 6 weeks.
 *
 * Surrender direct debits cancel automatically. Insurance must remain (unless
 * the vehicle is kept on private property and SORNed).
 */

export type SornInput = {
  annualVed: number;
  /** Months remaining on current VED period (0-12). */
  monthsRemaining: number;
};

export type SornResult = {
  monthlyVed: number;
  refund: number;
  fullMonths: number;
};

export function sornRefund(input: SornInput): SornResult {
  const annual = Math.max(0, input.annualVed);
  const months = Math.max(0, Math.min(12, Math.floor(input.monthsRemaining)));
  const monthlyVed = annual / 12;
  return {
    monthlyVed,
    fullMonths: months,
    refund: monthlyVed * months,
  };
}
