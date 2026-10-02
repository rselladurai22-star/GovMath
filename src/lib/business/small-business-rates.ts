/**
 * Small Business Rate Relief (SBRR) — England 2026/27.
 *
 * Source: gov.uk/calculate-your-business-rates
 *
 * Standard formula:
 *   Annual rates = rateable value × multiplier
 *   - Small business multiplier:    43.2p (38.2p retail, hospitality, leisure)  RV up to £50,999
 *   - Standard multiplier:          48.0p (43.0p retail, hospitality, leisure)  RV £51,000–£499,999
 *   - Large property multiplier:    50.8p  RV £500,000+ (all uses)
 *
 * SBRR (only one property in England):
 *   - RV ≤ £12,000:  100% relief (zero bill)
 *   - RV £12,001–£14,999: tapered — 100% × (15,000 − RV) / 3,000
 *   - RV £15,000–£50,999: small business multiplier, no extra relief
 *
 * Welsh and Scottish reliefs differ — this calc covers England only.
 */

export const SMALL_MULTIPLIER = 0.432;
export const STANDARD_MULTIPLIER = 0.48;
/** Lower multipliers for retail, hospitality and leisure (RHL) properties. */
export const SMALL_RHL_MULTIPLIER = 0.382;
export const STANDARD_RHL_MULTIPLIER = 0.43;
/** Properties with a rateable value of £500,000 or more. */
export const LARGE_MULTIPLIER = 0.508;
export const LARGE_THRESHOLD = 500000;
export const SBRR_UPPER_TAPER = 15000;
export const SBRR_LOWER = 12000;

export type RatesInput = {
  rateableValue: number;
  onlyProperty: boolean;
  /** Wholly or mainly used for retail, hospitality or leisure. */
  retailHospitalityLeisure?: boolean;
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
  const rhl = input.retailHospitalityLeisure ?? false;
  const multiplier =
    rv >= LARGE_THRESHOLD
      ? LARGE_MULTIPLIER
      : rv <= 50999
        ? rhl ? SMALL_RHL_MULTIPLIER : SMALL_MULTIPLIER
        : rhl ? STANDARD_RHL_MULTIPLIER : STANDARD_MULTIPLIER;
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
