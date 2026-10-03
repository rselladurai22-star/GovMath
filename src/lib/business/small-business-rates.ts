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

/* ── Flagship: a year's bill ───────────────────────────── */

export const CHARITY_RELIEF = 0.8;
/** Supporting Small Business relief caps the rise for those losing small business relief at the 2026 revaluation. */
export const SSB_MIN_CAP = 800;

export type RatesStudyInput = RatesInput & {
  /** Charity or community amateur sports club: 80% mandatory relief. */
  charity: boolean;
  /** Days the property is occupied in the 365-day rates year. */
  days: number;
  /** Last year's bill (2025/26), to show the change. 0 to skip. */
  lastBill: number;
};

export type RatesStudy = RatesResult & {
  /** Relief from charity status, after small business rate relief. */
  charityRelief: number;
  /** Bill for the whole year if occupied throughout. */
  fullYear: number;
  /** Bill for the days occupied. */
  bill: number;
  monthly: number;
  /** Change against last year, if given. */
  change: number;
  /** Increase is above £800, so Supporting Small Business or transitional relief may apply. */
  mayGetCap: boolean;
  /** RV at which small business rate relief runs out. */
  reliefEndsAt: number;
};

export function ratesStudy(i: RatesStudyInput): RatesStudy {
  const base = smallBusinessRates(i);
  const charityRelief = i.charity ? base.payable * CHARITY_RELIEF : 0;
  const fullYear = base.payable - charityRelief;
  const days = Math.min(365, Math.max(0, i.days));
  const bill = (fullYear * days) / 365;
  const change = i.lastBill > 0 ? bill - i.lastBill : 0;
  return {
    ...base,
    charityRelief,
    fullYear,
    bill,
    monthly: bill / 10,
    change,
    mayGetCap: i.lastBill > 0 && change > SSB_MIN_CAP,
    reliefEndsAt: SBRR_UPPER_TAPER,
  };
}
