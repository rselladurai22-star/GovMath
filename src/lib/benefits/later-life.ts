/**
 * Pension Credit, 2026/27 (and the Attendance Allowance rates, which the
 * benefits checker quotes).
 *
 * Rates: DWP "Benefit and pension rates 2026 to 2027".
 *
 * Pension Credit = Guarantee Credit + Savings Credit.
 *   Guarantee Credit tops weekly income up to the appropriate minimum guarantee:
 *   the standard amount plus additions for severe disability, caring and children.
 *   Savings Credit (only if you, or your partner, reached State Pension age before
 *   6 April 2016) is 60% of qualifying income above the threshold, up to a maximum,
 *   less 40% of income above the appropriate minimum guarantee.
 *   Capital: first £10,000 ignored, then £1 a week for each £500 or part. No upper limit.
 */

import { forYear, type RatesYear } from "./rates-year";

export const PC_2026 = {
  guarantee: { single: 238.0, couple: 363.25 },
  severeDisability: 86.05,
  carer: 48.15,
  child: { firstPre2017: 81.07, other: 69.98 },
  disabledChild: { lower: 37.93, higher: 118.46 },
  savingsThreshold: { single: 208.07, couple: 329.75 },
  savingsMax: { single: 17.96, couple: 20.1 },
  capitalDisregard: 10_000,
  /** Earnings ignored each week. */
  earningsDisregard: { single: 5, couple: 10, higher: 20 },
} as const;

/**
 * Proposed weekly rates from 6 April 2027: DWP "Proposed benefit and pension
 * rates 2027 to 2028" (Pension Credit section). The £10,000 capital disregard
 * and the earnings disregards are unchanged.
 */
export const PC_2027 = {
  guarantee: { single: 247.3, couple: 377.4 },
  severeDisability: 89.05,
  carer: 49.85,
  child: { firstPre2017: 83.91, other: 72.43 },
  disabledChild: { lower: 39.26, higher: 122.61 },
  savingsThreshold: { single: 216.32, couple: 342.74 },
  savingsMax: { single: 18.59, couple: 20.8 },
  capitalDisregard: 10_000,
  earningsDisregard: { single: 5, couple: 10, higher: 20 },
} as const;

type Widen<T> = { [K in keyof T]: T[K] extends number ? number : Widen<T[K]> };
export type PcRates = Widen<typeof PC_2026>;
export const pcRates = (year?: RatesYear): PcRates => forYear<PcRates>(year, PC_2026, PC_2027);

export const STATE_PENSION_2026 = { newFull: 241.3, basicFull: 184.9 } as const;
/** Proposed from 6 April 2027 (DWP): full new State Pension £250.70, basic £192.10. */
export const STATE_PENSION_2027 = { newFull: 250.7, basicFull: 192.1 } as const;
export const statePensionRates = (year?: RatesYear): { newFull: number; basicFull: number } => forYear<{ newFull: number; basicFull: number }>(year, STATE_PENSION_2026, STATE_PENSION_2027);

export const AA_2026 = { lower: 76.7, higher: 114.6 } as const;
/** Proposed from 6 April 2027 (DWP). */
export const AA_2027 = { lower: 79.4, higher: 118.6 } as const;

export type PensionCreditInput = {
  couple: boolean;
  /** State Pension a week (both partners together). */
  statePension: number;
  /** Private and workplace pensions a week. */
  otherPensions: number;
  /** Earnings a week after tax, NI and half of pension contributions. */
  earnings: number;
  /** Other income a week that counts, e.g. Carer's Allowance. */
  otherIncome: number;
  savings: number;
  /** Number of people qualifying for the severe disability addition (0 to 2). */
  severeDisability: number;
  /** Number of people who get or could get Carer's Allowance (0 to 2). */
  carers: number;
  children: number;
  firstChildPre2017: boolean;
  disabledChildrenLower: number;
  disabledChildrenHigher: number;
  /** You or your partner reached State Pension age before 6 April 2016. */
  savingsCreditEligible: boolean;
  /** Rates to use (default 2026/27). */
  year?: RatesYear;
};

export type PcLine = { key: string; label: string; amount: number };

export type PensionCreditResult = {
  guaranteeLines: PcLine[];
  minimumGuarantee: number;
  tariffIncome: number;
  earningsDisregard: number;
  /** Income counted for Pension Credit, a week. */
  income: number;
  guaranteeCredit: number;
  savingsCredit: number;
  weekly: number;
  annual: number;
  /** Most weekly income at which some Guarantee Credit is still paid. */
  incomeHeadroom: number;
};

export function pcTariffIncome(savings: number): number {
  const over = Math.max(0, savings - PC_2026.capitalDisregard);
  return Math.ceil(over / 500);
}

export function pensionCredit2026(i: PensionCreditInput): PensionCreditResult {
  const P = pcRates(i.year);
  const who = i.couple ? "couple" : "single";
  const lines: PcLine[] = [];
  const add = (key: string, label: string, amount: number) => {
    if (amount > 0) lines.push({ key, label, amount });
  };
  add("standard", i.couple ? "Standard minimum guarantee (couple)" : "Standard minimum guarantee", P.guarantee[who]);
  const sd = Math.min(i.couple ? 2 : 1, Math.max(0, Math.floor(i.severeDisability)));
  add("severe", "Severe disability addition", sd * P.severeDisability);
  const carers = Math.min(i.couple ? 2 : 1, Math.max(0, Math.floor(i.carers)));
  add("carer", "Carer addition", carers * P.carer);
  const kids = Math.max(0, Math.floor(i.children));
  const childAmount = kids === 0 ? 0 : (i.firstChildPre2017 ? P.child.firstPre2017 : P.child.other) + (kids - 1) * P.child.other;
  add("children", `Children (${kids})`, childAmount);
  add("disabled-lower", "Disabled child (lower)", Math.max(0, i.disabledChildrenLower) * P.disabledChild.lower);
  add("disabled-higher", "Disabled child (higher)", Math.max(0, i.disabledChildrenHigher) * P.disabledChild.higher);
  const minimumGuarantee = lines.reduce((a, l) => a + l.amount, 0);

  const disregardCap = sd > 0 || carers > 0 ? P.earningsDisregard.higher : P.earningsDisregard[who];
  const earnings = Math.max(0, i.earnings);
  const earningsDisregard = Math.min(earnings, disregardCap);
  const tariffIncome = pcTariffIncome(i.savings);
  const income = Math.max(0, i.statePension) + Math.max(0, i.otherPensions) + (earnings - earningsDisregard) + Math.max(0, i.otherIncome) + tariffIncome;

  const guaranteeCredit = Math.max(0, minimumGuarantee - income);
  let savingsCredit = 0;
  if (i.savingsCreditEligible) {
    const threshold = P.savingsThreshold[who];
    const max = P.savingsMax[who];
    const reward = Math.min(max, 0.6 * Math.max(0, income - threshold));
    savingsCredit = Math.max(0, reward - 0.4 * Math.max(0, income - minimumGuarantee));
  }
  const weekly = guaranteeCredit + savingsCredit;
  return {
    guaranteeLines: lines,
    minimumGuarantee,
    tariffIncome,
    earningsDisregard,
    income,
    guaranteeCredit,
    savingsCredit,
    weekly,
    annual: weekly * 52,
    incomeHeadroom: minimumGuarantee,
  };
}

export const PC_DEFAULT_INPUT: PensionCreditInput = {
  couple: false,
  statePension: 0,
  otherPensions: 0,
  earnings: 0,
  otherIncome: 0,
  savings: 0,
  severeDisability: 0,
  carers: 0,
  children: 0,
  firstChildPre2017: false,
  disabledChildrenLower: 0,
  disabledChildrenHigher: 0,
  savingsCreditEligible: false,
};
