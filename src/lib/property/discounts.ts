/**
 * Property micro-calculators:
 *   - Rent a Room Scheme: £7,500/yr tax-free for letting furnished room in main residence.
 *   - Single Person Council Tax Discount: 25% off the bill.
 */

export const RENT_A_ROOM_ALLOWANCE = 7500;

export type RentARoomResult = {
  annualRent: number;
  allowance: number;
  taxableAmount: number;
  underAllowance: boolean;
};

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

export type RentARoomCompareInput = {
  /** Gross receipts in the tax year, including anything charged for meals, cleaning or bills. */
  receipts: number;
  /** Allowable expenses if using the normal method. */
  expenses: number;
  /** True if someone else also receives rent from the same home. */
  shared: boolean;
  /** Your other taxable income, for the tax rate. */
  otherIncome: number;
};

export type RentARoomCompare = {
  allowance: number;
  /** Profit taxed under the Rent a Room scheme (receipts above the allowance). */
  schemeTaxable: number;
  /** Profit taxed under the normal method (receipts less expenses). */
  normalTaxable: number;
  schemeTax: number;
  normalTax: number;
  best: "scheme" | "normal" | "either";
  automatic: boolean;
  mustReport: boolean;
};

/**
 * Rent a Room relief against the normal method. Under the scheme, receipts up
 * to the allowance are tax-free and are not reported; above it you can pay tax
 * on receipts above the allowance, or use the normal method. Halved if shared.
 */
export function rentARoomCompare(input: RentARoomCompareInput, taxOn: (income: number) => number): RentARoomCompare {
  const allowance = input.shared ? RENT_A_ROOM_ALLOWANCE / 2 : RENT_A_ROOM_ALLOWANCE;
  const receipts = Math.max(0, input.receipts);
  const schemeTaxable = Math.max(0, receipts - allowance);
  const normalTaxable = Math.max(0, receipts - Math.max(0, input.expenses));
  const other = Math.max(0, input.otherIncome);
  const schemeTax = taxOn(other + schemeTaxable) - taxOn(other);
  const normalTax = taxOn(other + normalTaxable) - taxOn(other);
  const best = Math.abs(schemeTax - normalTax) < 0.5 ? "either" : schemeTax < normalTax ? "scheme" : "normal";
  return {
    allowance,
    schemeTaxable,
    normalTaxable,
    schemeTax,
    normalTax,
    best: schemeTaxable <= 0 && normalTaxable <= 0 ? "either" : best,
    automatic: receipts <= allowance,
    mustReport: receipts > allowance,
  };
}
