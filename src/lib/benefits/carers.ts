/**
 * Carer's Allowance and the earnings limit, 2026/27.
 *
 * £86.45 a week. Paid only if earnings after deductions are £204 a week or less.
 * Earnings counted = gross − Income Tax − Class 1 NI − half of pension
 * contributions − care costs while you work (up to half of the net figure).
 * Earning a penny over the limit loses the whole week's allowance.
 * Overlapping benefits: State Pension and some others are paid instead of
 * Carer's Allowance; if they are less, the difference is paid.
 */

import { incomeTax, nationalInsurance } from "../tax/2026-27";
import { scottishIncomeTax } from "../tax/scottish-2026-27";

export const CA_2026 = { weekly: 86.45, earningsLimit: 204, hoursCaring: 35 } as const;

export type CarerEarningsInput = {
  /** Gross pay a week. */
  grossWeekly: number;
  /** Pension contributions a week, taken from pay. */
  pensionWeekly: number;
  /** Paid to someone (not a close relative) to look after the person you care for, or a child under 16, while you work. */
  careCostsWeekly: number;
  scotland: boolean;
  /** State Pension or other overlapping benefit a week. */
  overlapping: number;
};

export type CarerEarningsResult = {
  tax: number;
  ni: number;
  net: number;
  pensionAllowed: number;
  careAllowed: number;
  counted: number;
  withinLimit: boolean;
  headroom: number;
  /** Carer's Allowance actually paid a week. */
  payable: number;
  /** Only underlying entitlement because of an overlapping benefit. */
  underlying: boolean;
  /** Take-home pay plus Carer's Allowance a week. */
  total: number;
};

/** Weekly Income Tax and NI on weekly gross pay, annualised. */
function weeklyTaxNi(grossWeekly: number, pensionWeekly: number, scotland: boolean) {
  const annual = Math.max(0, grossWeekly - pensionWeekly) * 52;
  const tax = (scotland ? scottishIncomeTax(annual).total : incomeTax(annual).total) / 52;
  const ni = nationalInsurance(annual).total / 52;
  return { tax, ni };
}

export function carerEarnings(i: CarerEarningsInput): CarerEarningsResult {
  const gross = Math.max(0, i.grossWeekly);
  const pension = Math.min(gross, Math.max(0, i.pensionWeekly));
  const { tax, ni } = weeklyTaxNi(gross, pension, i.scotland);
  const net = Math.max(0, gross - tax - ni);
  const pensionAllowed = pension / 2;
  const afterPension = Math.max(0, net - pensionAllowed);
  const careAllowed = Math.min(Math.max(0, i.careCostsWeekly), afterPension / 2);
  const counted = Math.max(0, afterPension - careAllowed);
  const withinLimit = counted <= CA_2026.earningsLimit;
  const overlapping = Math.max(0, i.overlapping);
  const entitlement = withinLimit ? CA_2026.weekly : 0;
  const payable = Math.max(0, entitlement - overlapping);
  return {
    tax,
    ni,
    net,
    pensionAllowed,
    careAllowed,
    counted,
    withinLimit,
    headroom: CA_2026.earningsLimit - counted,
    payable,
    underlying: withinLimit && overlapping >= CA_2026.weekly,
    total: Math.max(0, net - pension) + payable,
  };
}

