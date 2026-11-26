/**
 * Single Person Council Tax Discount: 25% off the bill.
 */

const SPD_RATE = 0.25;

export type SPDResult = {
  fullBill: number;
  discount: number;
  payable: number;
  monthlySaving: number;
};

export function singlePersonDiscount(annualBill: number): SPDResult {
  const b = Math.max(0, annualBill);
  const discount = b * SPD_RATE;
  return {
    fullBill: b,
    discount,
    payable: b - discount,
    monthlySaving: discount / 12,
  };
}

export type SpdPeriodInput = {
  annualBill: number;
  /** Days in the year you lived alone (or with only disregarded adults). */
  daysAlone: number;
  daysInYear?: number;
};

/** Single person discount for part of a year, worked out by day. */
export function singlePersonDiscountForDays(input: SpdPeriodInput) {
  const days = input.daysInYear ?? 365;
  const d = Math.min(days, Math.max(0, input.daysAlone));
  const full = singlePersonDiscount(input.annualBill);
  const discount = full.discount * (d / days);
  return { ...full, days: d, discount, payable: full.fullBill - discount };
}
