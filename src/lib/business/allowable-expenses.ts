/**
 * Self-employed allowable expenses estimator (UK 2025/26).
 *
 * For sole traders using Self Assessment. Adds up the most common allowable
 * categories and applies HMRC’s simplified-expense flat rates where helpful:
 *
 *   - Working from home (simplified): £10/mo (25–50h), £18/mo (51–100h), £26/mo (101+h)
 *   - Mileage (own vehicle):          45p/mile first 10k, 25p/mile thereafter
 *   - Other categories taken as entered.
 *
 * Result is the deductible total against turnover. Higher allowable expenses =
 * lower taxable profit = lower income tax + Class 4 NI.
 */

export type WfhHoursBand = "none" | "low" | "mid" | "high";

const WFH_RATE: Record<WfhHoursBand, number> = {
  none: 0,
  low: 10,
  mid: 18,
  high: 26,
};

export const MILEAGE_FIRST_10K = 0.45;
export const MILEAGE_AFTER_10K = 0.25;

export type AllowableInput = {
  /** Office costs: stationery, phone, software, subscriptions. */
  officeAndAdmin: number;
  /** Bank charges, insurance, professional fees. */
  finance: number;
  /** Marketing & advertising. */
  marketing: number;
  /** Training & professional development for current trade. */
  training: number;
  /** Cost of stock / materials sold. */
  stock: number;
  /** Other genuine business expenses. */
  other: number;
  /** Working-from-home hours band (simplified). */
  wfhHoursBand: WfhHoursBand;
  /** Months of WFH in the year (max 12). */
  wfhMonths: number;
  /** Business miles in own vehicle. */
  businessMiles: number;
};

export type AllowableResult = {
  wfhFlat: number;
  mileageFlat: number;
  itemised: number;
  total: number;
  /** Approximate basic-rate tax + Class 4 NI saved (28% combined). */
  taxSavedApprox: number;
};

export function allowableExpenses(input: AllowableInput): AllowableResult {
  const wfhMonths = Math.max(0, Math.min(12, input.wfhMonths));
  const wfhFlat = WFH_RATE[input.wfhHoursBand] * wfhMonths;

  const miles = Math.max(0, input.businessMiles);
  const first = Math.min(miles, 10_000);
  const rest = Math.max(0, miles - 10_000);
  const mileageFlat = first * MILEAGE_FIRST_10K + rest * MILEAGE_AFTER_10K;

  const itemised =
    Math.max(0, input.officeAndAdmin) +
    Math.max(0, input.finance) +
    Math.max(0, input.marketing) +
    Math.max(0, input.training) +
    Math.max(0, input.stock) +
    Math.max(0, input.other);

  const total = wfhFlat + mileageFlat + itemised;
  return {
    wfhFlat,
    mileageFlat,
    itemised,
    total,
    taxSavedApprox: total * 0.28,
  };
}
