/**
 * Small Business Rate Relief (SBRR) — England 2025/26.
 *
 * Source: gov.uk/calculate-your-business-rates
 *
 * Standard formula:
 *   Annual rates = rateable value × multiplier
 *   - Small business multiplier:    49.9p (£0.499)  for RV up to £50,999
 *   - Standard multiplier:          54.6p (£0.546)  for RV £51,000+
 *
 * SBRR (only one property in England):
 *   - RV ≤ £12,000:  100% relief (zero bill)
 *   - RV £12,001–£14,999: tapered — 100% × (15,000 − RV) / 3,000
 *   - RV £15,000–£50,999: small business multiplier, no extra relief
 *
 * Welsh and Scottish reliefs differ — this calc covers England only.
 */

export const SMALL_MULTIPLIER = 0.499;
export const STANDARD_MULTIPLIER = 0.546;
export const SBRR_UPPER_TAPER = 15000;
export const SBRR_LOWER = 12000;

export type RatesInput = {
  rateableValue: number;
  onlyProperty: boolean;
};

export type RatesResult = {
  multiplier: number;
  grossRates: number;
  reliefPercent: number;
  reliefAmount: number;
  payable: number;
};

export function smallBusinessRates(input: RatesInput): RatesResult {
  const rv = Math.max(0, input.rateableValue);
  const multiplier = rv <= 50999 ? SMALL_MULTIPLIER : STANDARD_MULTIPLIER;
  const grossRates = rv * multiplier;

  let reliefPercent = 0;
  if (input.onlyProperty) {
    if (rv <= SBRR_LOWER) reliefPercent = 100;
    else if (rv < SBRR_UPPER_TAPER) reliefPercent = (100 * (SBRR_UPPER_TAPER - rv)) / 3000;
  }
  const reliefAmount = grossRates * (reliefPercent / 100);
  return {
    multiplier,
    grossRates,
    reliefPercent,
    reliefAmount,
    payable: grossRates - reliefAmount,
  };
}
