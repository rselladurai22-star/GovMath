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

export type WorkLandmarks = {
  /** Gross pay a month at which the taper starts to bite (0 with no work allowance); null if never within the range. */
  taperStarts: number | null;
  /** Gross pay a month at which Income Tax or National Insurance starts; null if never within the range. */
  deductionsStart: number | null;
  /** Gross pay a month at which Universal Credit reaches zero; null if it never does within the range, or there is none to lose. */
  ucEnds: number | null;
};

/** Smallest gross pay in [0, max] at which `test` is true, for a test that stays true once it turns true. */
function firstGross(max: number, test: (gross: number) => boolean): number | null {
  if (test(0)) return 0;
  if (max <= 0 || !test(max)) return null;
  let lo = 0;
  let hi = max;
  for (let n = 0; n < 40; n++) {
    const mid = (lo + hi) / 2;
    if (test(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}

/**
 * Where the slope of income against pay changes, as gross pay a month up to
 * `maxGross`: the work allowance running out, tax and NI starting, and
 * Universal Credit ending.
 */
export function workLandmarks(i: Omit<WorkInput, "grossMonthly">, maxGross: number): WorkLandmarks {
  const at = (grossMonthly: number) => workPoint({ ...i, grossMonthly });
  const allowance = (gross: number) => universalCredit2026({ ...i.household, earnings: at(gross).ucEarnings }).workAllowance;
  const hasUc = at(0).uc > 0 || at(1).uc > 0;
  return {
    taperStarts: hasUc ? firstGross(maxGross, (g) => at(g).ucEarnings >= allowance(g)) : null,
    deductionsStart: firstGross(maxGross, (g) => at(g).tax + at(g).ni > 0.005),
    ucEnds: hasUc ? firstGross(maxGross, (g) => g > 0 && at(g).uc <= 0.005) : null,
  };
}
