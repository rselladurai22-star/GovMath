/**
 * Company car Benefit-in-Kind (BIK).
 *
 * BIK value = list price × BIK% × marginal tax rate.
 *
 * BIK% depends on CO2 emissions. Electric cars (zero-emission) are taxed
 * at 4% for 2026/27 (up from 3% in 2025/26), rising to 5% in 2027/28 and 9% by 2029/30.
 *
 * Petrol/diesel rates are banded by CO2 in 5 g/km steps (HMRC appropriate
 * percentages for 2026/27, each 1pp higher than 2025/26, capped at 37%).
 */

const RATES_2026: Array<[number, number]> = [
  [50, 0.16], // 1–50 g/km depends on electric range; we use the under-30-mile rate
  [54, 0.17],
  [59, 0.18],
  [64, 0.19],
  [69, 0.20],
  [74, 0.21],
  [79, 0.22],
  [84, 0.23],
  [89, 0.24],
  [94, 0.25],
  [99, 0.26],
  [104, 0.27],
  [109, 0.28],
  [114, 0.29],
  [119, 0.30],
  [124, 0.31],
  [129, 0.32],
  [134, 0.33],
  [139, 0.34],
  [144, 0.35],
  [149, 0.36],
  [Infinity, 0.37], // 150 g/km and above
];

export const EV_BIK_RATE_2026 = 0.04;

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
    bikPercent = EV_BIK_RATE_2026;
  } else {
    const co2 = input.co2gPerKm ?? 0;
    bikPercent = RATES_2026.find(([cap]) => co2 <= cap)?.[1] ?? 0.37;
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
