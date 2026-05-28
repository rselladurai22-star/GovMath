/**
 * Company car Benefit-in-Kind (BIK).
 *
 * BIK value = list price × BIK% × marginal tax rate.
 *
 * BIK% depends on CO2 emissions. Electric cars (zero-emission) are taxed
 * at 3% for 2025/26 (up from 2% in 2024/25), rising 1pp per year to 9% by 2029/30.
 *
 * Petrol/diesel rates are heavily banded by CO2. We use a simplified gov.uk
 * 2025/26 lookup table.
 */

const RATES_2025: Array<[number, number]> = [
  [50, 0.15], // 1–50 g/km depends on electric range; we approximate
  [55, 0.17],
  [60, 0.18],
  [65, 0.19],
  [70, 0.20],
  [75, 0.21],
  [80, 0.22],
  [85, 0.23],
  [90, 0.24],
  [95, 0.25],
  [100, 0.26],
  [105, 0.27],
  [110, 0.28],
  [115, 0.29],
  [120, 0.30],
  [125, 0.31],
  [130, 0.32],
  [135, 0.33],
  [140, 0.34],
  [145, 0.35],
  [150, 0.36],
  [155, 0.37],
  [160, 0.37],
  [Infinity, 0.37],
];

export const EV_BIK_RATE_2025 = 0.03;

export type BIKInput = {
  listPrice: number;
  fuelType: "electric" | "petrol" | "diesel";
  co2gPerKm?: number;
  /** Marginal income tax rate (0.20 / 0.40 / 0.45). */
  marginalRate: number;
};

export type BIKResult = {
  bikPercent: number;
  cashEquivalent: number;
  annualTax: number;
  monthlyTax: number;
};

export function companyCarBIK(input: BIKInput): BIKResult {
  let bikPercent: number;
  if (input.fuelType === "electric") {
    bikPercent = EV_BIK_RATE_2025;
  } else {
    const co2 = input.co2gPerKm ?? 0;
    bikPercent = RATES_2025.find(([cap]) => co2 <= cap)?.[1] ?? 0.37;
    if (input.fuelType === "diesel") bikPercent = Math.min(0.37, bikPercent + 0.04); // 4% diesel supplement (non-RDE2)
  }
  const cashEquivalent = input.listPrice * bikPercent;
  const annualTax = cashEquivalent * input.marginalRate;
  return {
    bikPercent,
    cashEquivalent,
    annualTax,
    monthlyTax: annualTax / 12,
  };
}
