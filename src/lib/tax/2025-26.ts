/**
 * UK tax engine for the 2025/26 tax year.
 *
 * Scope of this module:
 *   - England, Wales & Northern Ireland Income Tax bands
 *   - Class 1 employee National Insurance
 *   - Personal Allowance taper above £100,000
 *
 * Scotland uses a different Income Tax band structure and is intentionally
 * out of scope for v1 — add a separate module when needed.
 *
 * All monetary values are GBP, annual unless otherwise noted.
 * Functions are pure and deterministic — safe to call on the server or client.
 */

export const TAX_YEAR_2025_26 = {
  label: "2025/26",
  personalAllowance: 12570,
  /** Personal Allowance starts tapering at £1 per £2 above this income. */
  paTaperStart: 100000,
  /** PA is fully eroded once income reaches this level. */
  paTaperEnd: 125140,
  incomeTax: {
    basicRateBand: 37700, // band width above PA at 20%
    higherRateUpper: 125140, // additional rate kicks in above this
    rates: { basic: 0.2, higher: 0.4, additional: 0.45 },
  },
  ni: {
    /** Class 1 employee Primary Threshold (annual). */
    primaryThreshold: 12570,
    /** Class 1 employee Upper Earnings Limit (annual). */
    upperEarningsLimit: 50270,
    rates: { main: 0.08, upper: 0.02 },
    /**
     * Class 4 (self-employed) shares the same thresholds as Class 1 but
     * applies lower rates: 6% main / 2% upper from April 2024.
     */
    class4Rates: { main: 0.06, upper: 0.02 },
  },
} as const;

/** Personal Allowance after income-based taper. */
export function personalAllowance(gross: number): number {
  const t = TAX_YEAR_2025_26;
  if (gross <= t.paTaperStart) return t.personalAllowance;
  if (gross >= t.paTaperEnd) return 0;
  const reduction = (gross - t.paTaperStart) / 2;
  return Math.max(0, t.personalAllowance - reduction);
}

export type IncomeTaxBreakdown = {
  personalAllowance: number;
  taxableIncome: number;
  basic: number;
  higher: number;
  additional: number;
  total: number;
};

/** Income tax owed on a gross annual salary (England/Wales/NI, 2025/26). */
export function incomeTax(gross: number): IncomeTaxBreakdown {
  const t = TAX_YEAR_2025_26.incomeTax;
  const pa = personalAllowance(gross);
  const taxable = Math.max(0, gross - pa);

  const basicBand = Math.min(taxable, t.basicRateBand);
  const remainderAfterBasic = Math.max(0, taxable - t.basicRateBand);

  // Higher-rate band runs from PA+basicBand up to higherRateUpper.
  // Width depends on remaining PA, so compute against income directly.
  const higherBandWidth = Math.max(
    0,
    t.higherRateUpper - (pa + t.basicRateBand)
  );
  const higherBand = Math.min(remainderAfterBasic, higherBandWidth);
  const additionalBand = Math.max(0, remainderAfterBasic - higherBandWidth);

  const basic = basicBand * t.rates.basic;
  const higher = higherBand * t.rates.higher;
  const additional = additionalBand * t.rates.additional;

  return {
    personalAllowance: pa,
    taxableIncome: taxable,
    basic,
    higher,
    additional,
    total: basic + higher + additional,
  };
}

export type NIBreakdown = {
  mainBand: number;
  upperBand: number;
  total: number;
};

/** Class 1 employee NI on a gross annual salary (2025/26). */
export function nationalInsurance(gross: number): NIBreakdown {
  const { primaryThreshold, upperEarningsLimit, rates } =
    TAX_YEAR_2025_26.ni;

  if (gross <= primaryThreshold) {
    return { mainBand: 0, upperBand: 0, total: 0 };
  }

  const mainBandWidth = Math.max(
    0,
    Math.min(gross, upperEarningsLimit) - primaryThreshold
  );
  const upperBandWidth = Math.max(0, gross - upperEarningsLimit);

  const mainBand = mainBandWidth * rates.main;
  const upperBand = upperBandWidth * rates.upper;

  return { mainBand, upperBand, total: mainBand + upperBand };
}

/**
 * Class 4 self-employed NI on annual trading profits (2025/26).
 * Same thresholds as Class 1, lower rates (6% / 2%).
 * Class 2 was effectively abolished from April 2024 and is out of scope.
 */
export function selfEmployedNI(profit: number): NIBreakdown {
  const { primaryThreshold, upperEarningsLimit, class4Rates } =
    TAX_YEAR_2025_26.ni;

  if (profit <= primaryThreshold) {
    return { mainBand: 0, upperBand: 0, total: 0 };
  }

  const mainBandWidth = Math.max(
    0,
    Math.min(profit, upperEarningsLimit) - primaryThreshold
  );
  const upperBandWidth = Math.max(0, profit - upperEarningsLimit);

  const mainBand = mainBandWidth * class4Rates.main;
  const upperBand = upperBandWidth * class4Rates.upper;

  return { mainBand, upperBand, total: mainBand + upperBand };
}

export type TakeHomeResult = {
  gross: number;
  incomeTax: IncomeTaxBreakdown;
  ni: NIBreakdown;
  /** Annual net pay after Income Tax and NI. */
  takeHome: number;
  /** Effective tax rate including NI, 0–1. */
  effectiveRate: number;
  perPeriod: {
    monthly: number;
    weekly: number;
    daily: number;
  };
};

/** Headline take-home calculation for a PAYE employee, 2025/26. */
export function takeHomePay(gross: number): TakeHomeResult {
  const safeGross = Math.max(0, gross || 0);
  const tax = incomeTax(safeGross);
  const ni = nationalInsurance(safeGross);
  const takeHome = safeGross - tax.total - ni.total;

  return {
    gross: safeGross,
    incomeTax: tax,
    ni,
    takeHome,
    effectiveRate: safeGross > 0 ? (tax.total + ni.total) / safeGross : 0,
    perPeriod: {
      monthly: takeHome / 12,
      weekly: takeHome / 52,
      daily: takeHome / 260, // working days approximation
    },
  };
}
