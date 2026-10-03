/**
 * Working more on Universal Credit: gross pay to take-home pay (Income Tax,
 * National Insurance, pension) and then the Universal Credit award, so the
 * real gain from extra hours or a pay rise can be measured.
 */

import { computeTakeHome, type TaxRegion } from "../tax/take-home-engine";
import { universalCredit2026, type UcInput } from "./uc-engine";

export type WorkInput = {
  /** Your gross pay a month. */
  grossMonthly: number;
  /** Pension contribution as a % of gross pay (deducted before tax). */
  pensionPct: number;
  region: TaxRegion;
  /** Partner's take-home pay a month, already after deductions. */
  partnerNet: number;
  /** Household for Universal Credit; earnings are filled in here. */
  household: UcInput;
};

export type WorkPoint = {
  gross: number;
  pension: number;
  tax: number;
  ni: number;
  /** Your take-home pay a month. */
  net: number;
  /** Household earnings used by Universal Credit. */
  ucEarnings: number;
  uc: number;
  /** Your take-home pay, partner's pay and Universal Credit. */
  total: number;
};

export function workPoint(i: WorkInput): WorkPoint {
  const gross = Math.max(0, i.grossMonthly);
  const t = computeTakeHome({ gross: gross * 12, bonus: 0, pensionPct: i.pensionPct, plan: "none", region: i.region });
  const net = t.takeHome / 12;
  const partner = Math.max(0, i.partnerNet);
  const ucEarnings = net + partner;
  const uc = universalCredit2026({ ...i.household, earnings: ucEarnings }).award;
  return {
    gross,
    pension: t.pensionContribution / 12,
    tax: t.incomeTaxTotal / 12,
    ni: t.ni.total / 12,
    net,
    ucEarnings,
    uc,
    total: net + partner + uc,
  };
}

export type WorkChange = {
  before: WorkPoint;
  after: WorkPoint;
  extraGross: number;
  /** Change in household income a month. */
  gain: number;
  /** Share of extra gross pay kept, 0 to 1. */
  keep: number;
  /** Share of extra gross pay lost to tax, NI, pension and Universal Credit. */
  effectiveRate: number;
  lostToUc: number;
  lostToTaxNi: number;
  lostToPension: number;
};

export function workChange(i: WorkInput, extraGross: number): WorkChange {
  const before = workPoint(i);
  const after = workPoint({ ...i, grossMonthly: i.grossMonthly + extraGross });
  const gain = after.total - before.total;
  const extra = Math.max(0, extraGross);
  return {
    before,
    after,
    extraGross: extra,
    gain,
    keep: extra > 0 ? gain / extra : 0,
    effectiveRate: extra > 0 ? 1 - gain / extra : 0,
    lostToUc: before.uc - after.uc,
    lostToTaxNi: after.tax + after.ni - before.tax - before.ni,
    lostToPension: after.pension - before.pension,
  };
}

/** Gross monthly pay from an hourly rate and weekly hours. */
export const monthlyFromHours = (hourly: number, hours: number) => (Math.max(0, hourly) * Math.max(0, hours) * 52) / 12;
