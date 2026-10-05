/**
 * Emergency tax codes, 2026/27.
 *
 * With a normal code, PAYE is cumulative: each payday it looks at pay and
 * tax so far this tax year. Emergency codes ending W1, M1 or X are
 * non-cumulative, so each payment is taxed on its own as if it were a
 * normal month. BR taxes everything at the basic rate; 0T gives no
 * tax-free allowance at all.
 */

import { SCOTTISH_RATES_2026_27 } from "./scottish-2026-27";
import type { TaxRegion } from "./take-home-engine";

export type EmergencyCode = "M1" | "BR" | "0T";

/** Monthly tax-free pay for code 1257L: (1257 × 10 + 9) ÷ 12. */
const MONTHLY_FREE_PAY = 12_579 / 12;

/** Tax on taxable pay using band widths scaled to `share` of a year. */
export function bandTax(taxable: number, share: number, region: TaxRegion): number {
  let left = Math.max(0, taxable);
  const bands: [number, number][] =
    region === "scotland"
      ? [
          [SCOTTISH_RATES_2026_27.starter.width, 0.19],
          [SCOTTISH_RATES_2026_27.basic.width, 0.2],
          [SCOTTISH_RATES_2026_27.intermediate.width, 0.21],
          [SCOTTISH_RATES_2026_27.higher.width, 0.42],
          [SCOTTISH_RATES_2026_27.advanced.width, 0.45],
          [Infinity, 0.48],
        ]
      : [
          [37_700, 0.2],
          [125_140 - 50_270, 0.4],
          [Infinity, 0.45],
        ];
  let tax = 0;
  for (const [width, rate] of bands) {
    const w = width * share;
    const take = Math.min(left, w);
    tax += take * rate;
    left -= take;
    if (left <= 0) break;
  }
  return tax;
}

/** Tax on one month's pay under an emergency code. */
export function emergencyMonthTax(pay: number, code: EmergencyCode, region: TaxRegion = "ruk"): number {
  const p = Math.max(0, pay || 0);
  if (code === "BR") return p * 0.2; // BR and SBR are both 20%
  if (code === "0T") return bandTax(p, 1 / 12, region);
  return bandTax(p - MONTHLY_FREE_PAY, 1 / 12, region);
}

/** Correct cumulative tax due on total pay so far, after `months` months of the tax year. */
export function cumulativeTaxDue(payToDate: number, months: number, region: TaxRegion = "ruk"): number {
  const share = Math.min(12, Math.max(1, months)) / 12;
  return bandTax(payToDate - MONTHLY_FREE_PAY * Math.min(12, Math.max(1, months)), share, region);
}

export type EmergencyInput = {
  monthlyPay: number;
  code: EmergencyCode;
  /** Month of the tax year you started (1 = April … 12 = March). */
  startMonth: number;
  /** Payslips received in this job so far. */
  payslips: number;
  /** Pay and tax from earlier jobs this tax year (from your P45). */
  previousPay?: number;
  previousTax?: number;
  region?: TaxRegion;
};

export type EmergencyResult = {
  monthEmergency: number;
  monthCorrect: number;
  /** Tax taken in this job so far on the emergency code. */
  takenSoFar: number;
  /** Tax that should have been taken in this job so far. */
  dueSoFar: number;
  overpaidSoFar: number;
  /** Over- or under-payment by 5 April if the code is never corrected. */
  overpaidByYearEnd: number;
  currentMonth: number;
};

export function emergencyTax(i: EmergencyInput): EmergencyResult {
  const region = i.region ?? "ruk";
  const start = Math.min(12, Math.max(1, Math.round(i.startMonth)));
  const slips = Math.min(13 - start, Math.max(1, Math.round(i.payslips)));
  const n = start + slips - 1;
  const prevPay = Math.max(0, i.previousPay ?? 0);
  const prevTax = Math.max(0, i.previousTax ?? 0);
  const monthEmergency = emergencyMonthTax(i.monthlyPay, i.code, region);

  const due = (months: number, slipsInJob: number) =>
    Math.max(0, cumulativeTaxDue(prevPay + i.monthlyPay * slipsInJob, months, region) - prevTax);

  const dueSoFar = due(n, slips);
  const dueLastMonth = slips > 1 ? due(n - 1, slips - 1) : 0;
  const yearSlips = 13 - start;
  return {
    monthEmergency,
    monthCorrect: dueSoFar - dueLastMonth,
    takenSoFar: monthEmergency * slips,
    dueSoFar,
    overpaidSoFar: monthEmergency * slips - dueSoFar,
    overpaidByYearEnd: monthEmergency * yearSlips - due(12, yearSlips),
    currentMonth: n,
  };
}
