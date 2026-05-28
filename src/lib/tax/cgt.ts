/**
 * UK Capital Gains Tax (2024/25 post-Autumn Budget rules, applied 30 Oct 2024).
 *
 * Rates after 30 Oct 2024:
 *  - Non-residential assets: 18% basic / 24% higher
 *  - Residential property:   18% basic / 24% higher (unified — previously 18/28)
 *  - Annual exempt amount (AEA): £3,000
 */

export const CGT_AEA_2025 = 3_000;
export const BASIC_RATE_BAND_2025 = 37_700; // basic-rate band size
export const PERSONAL_ALLOWANCE_2025 = 12_570;

export type CGTInput = {
  gain: number;
  /** Other taxable income for the year (after personal allowance). */
  taxableIncome: number;
  assetType: "property" | "other";
  alreadyUsedAEA?: number;
};

export type CGTResult = {
  taxableGain: number;
  basicRateGain: number;
  higherRateGain: number;
  taxAtBasic: number;
  taxAtHigher: number;
  totalTax: number;
  effectiveRate: number;
};

export function capitalGainsTax(input: CGTInput): CGTResult {
  const aeaRemaining = Math.max(0, CGT_AEA_2025 - (input.alreadyUsedAEA ?? 0));
  const taxableGain = Math.max(0, input.gain - aeaRemaining);
  // Basic-rate band remaining is £37,700 minus other taxable income (already net of PA)
  const basicHeadroom = Math.max(0, BASIC_RATE_BAND_2025 - Math.max(0, input.taxableIncome));
  const basicRateGain = Math.min(taxableGain, basicHeadroom);
  const higherRateGain = taxableGain - basicRateGain;

  // Post-Oct-2024: unified 18/24 for both asset types
  const basicRate = 0.18;
  const higherRate = 0.24;

  const taxAtBasic = basicRateGain * basicRate;
  const taxAtHigher = higherRateGain * higherRate;
  const totalTax = taxAtBasic + taxAtHigher;
  const effectiveRate = taxableGain > 0 ? totalTax / taxableGain : 0;

  return {
    taxableGain,
    basicRateGain,
    higherRateGain,
    taxAtBasic,
    taxAtHigher,
    totalTax,
    effectiveRate,
  };
}
