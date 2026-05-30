/**
 * NS&I Premium Bonds — expected annual prize estimator.
 *
 * The prize fund rate is the average return across all bondholders.
 * Each £1 bond is one entry into the monthly draw. Prizes range £25 → £1m.
 *
 * Current rate (as at June 2025): 3.80% AER tax-free.
 * Min holding £25, max £50,000.
 *
 * This calculator gives the EXPECTED win (rate × holding ÷ 12 × 12 = rate × holding),
 * but you can win much more or much less. Most months small holdings win nothing.
 */

export const MIN_BONDS = 25;
export const MAX_BONDS = 50_000;
export const DEFAULT_PRIZE_RATE = 0.038; // 3.80%

export type PremiumBondsInput = {
  holding: number;
  /** Annualised prize fund rate as a decimal (e.g. 0.038 for 3.80%). */
  prizeFundRate: number;
  years: number;
};

export type PremiumBondsResult = {
  holding: number;
  expectedAnnualPrizes: number;
  expectedMonthlyPrizes: number;
  expectedTotal: number;
  /** Equivalent gross yield needed in a taxable account at basic / higher rate. */
  basicRateEquivalent: number;
  higherRateEquivalent: number;
  /** Median number of months per year a £1,000 holding wins anything (approx). */
  medianMonthsWinning: number;
};

export function premiumBonds(input: PremiumBondsInput): PremiumBondsResult {
  const holding = Math.max(0, Math.min(MAX_BONDS, input.holding));
  const rate = Math.max(0, input.prizeFundRate);
  const years = Math.max(0, input.years);
  const expectedAnnualPrizes = holding * rate;
  return {
    holding,
    expectedAnnualPrizes,
    expectedMonthlyPrizes: expectedAnnualPrizes / 12,
    expectedTotal: expectedAnnualPrizes * years,
    basicRateEquivalent: rate / (1 - 0.20),
    higherRateEquivalent: rate / (1 - 0.40),
    // Rough heuristic from NS&I distribution: small holdings rarely win.
    medianMonthsWinning: Math.min(12, Math.floor(holding / 1000)),
  };
}
