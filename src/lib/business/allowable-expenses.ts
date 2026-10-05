import { selfEmployedTax, TRADING_ALLOWANCE } from "./self-employed";
/**
 * Self-employed allowable expenses estimator (UK 2026/27).
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

const MILEAGE_FIRST_10K = 0.45;
const MILEAGE_AFTER_10K = 0.25;

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

/* ── Flagship: expenses against your tax bill ─────────────────── */

export const WFH_FLAT_RATES = WFH_RATE;

export type ExpenseCategory =
  | "office"
  | "travel"
  | "stock"
  | "marketing"
  | "finance"
  | "premises"
  | "staff"
  | "training"
  | "clothing"
  | "other";

export type ExpensesStudyInput = {
  turnover: number;
  /** Itemised costs a year by category. */
  costs: Partial<Record<ExpenseCategory, number>>;
  /** Business miles by car or van, claimed at 45p / 25p. */
  miles: number;
  wfhBand: WfhHoursBand;
  wfhMonths: number;
  otherIncome: number;
  scottish: boolean;
};

export type ExpensesStudy = {
  itemised: number;
  mileage: number;
  wfh: number;
  total: number;
  /** Income Tax + Class 4 NI with no expenses at all. */
  taxWithout: number;
  taxWith: number;
  /** Tax and NI saved by claiming the expenses. */
  saved: number;
  /** Tax with the £1,000 trading allowance instead. */
  taxWithAllowance: number;
  /** True when the trading allowance beats the expenses. */
  allowanceBetter: boolean;
  profit: number;
};

export function expensesStudy(i: ExpensesStudyInput): ExpensesStudy {
  const itemised = Object.values(i.costs).reduce<number>((a, b) => a + Math.max(0, b ?? 0), 0);
  const miles = Math.max(0, i.miles);
  const mileage = Math.min(miles, 10_000) * MILEAGE_FIRST_10K + Math.max(0, miles - 10_000) * MILEAGE_AFTER_10K;
  const wfh = WFH_RATE[i.wfhBand] * Math.max(0, Math.min(12, i.wfhMonths));
  const total = itemised + mileage + wfh;
  const base = { turnover: i.turnover, otherIncome: i.otherIncome, scottish: i.scottish, plan: "none" as const, pension: 0, voluntaryClass2: false };
  const bill = (expenses: number, tradingAllowance = false) => {
    const r = selfEmployedTax({ ...base, expenses, tradingAllowance });
    return { tax: r.incomeTaxOnProfit + r.class4, profit: r.profit };
  };
  const without = bill(0);
  const withExp = bill(total);
  const withTa = bill(0, true);
  return {
    itemised,
    mileage,
    wfh,
    total,
    taxWithout: without.tax,
    taxWith: withExp.tax,
    saved: without.tax - withExp.tax,
    taxWithAllowance: withTa.tax,
    allowanceBetter: total < TRADING_ALLOWANCE && withTa.tax < withExp.tax,
    profit: withExp.profit,
  };
}
