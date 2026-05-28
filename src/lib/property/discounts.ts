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

export function rentARoom(annualRent: number): RentARoomResult {
  const r = Math.max(0, annualRent);
  return {
    annualRent: r,
    allowance: RENT_A_ROOM_ALLOWANCE,
    taxableAmount: Math.max(0, r - RENT_A_ROOM_ALLOWANCE),
    underAllowance: r <= RENT_A_ROOM_ALLOWANCE,
  };
}

export const SPD_RATE = 0.25;

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
