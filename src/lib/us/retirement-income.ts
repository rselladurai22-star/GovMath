/**
 * Retirement income for the US pages: Social Security benefits, required
 * minimum distributions, traditional IRA deductions, Roth conversions and
 * 529 college saving.
 *
 * Sources (2026 figures):
 * - SSA, "Benefit formula bend points" and the 2026 COLA fact sheet: PIA bend
 *   points $1,286 and $7,749 (from the 2024 average wage index, 69,846.57);
 *   COLA 2.8%; taxable maximum $184,500; retirement earnings test $24,480
 *   ($1 for every $2) and $65,160 in the year you reach full retirement age
 *   ($1 for every $3); maximum benefit at full retirement age $4,152.
 * - SSA, "Retirement age and benefit reduction" and "Delayed retirement
 *   credits": 5/9 of 1% a month for the first 36 months early, 5/12 of 1%
 *   after that; 2/3 of 1% a month (8% a year) after full retirement age to 70.
 * - IRS Publication 915: provisional income bases $25,000 / $32,000 and
 *   $34,000 / $44,000 (not indexed).
 * - IRS Publication 590-B (2025, updated April 2026), Appendix B: Table III
 *   (Uniform Lifetime) and Table II (Joint and Last Survivor). SECURE 2.0:
 *   RMDs from 73 (born 1951 to 1959) and 75 (born 1960 or later); excise tax
 *   25%, 10% if corrected within two years.
 * - IRS Notice 2025-67 (IR-2025-111): 2026 IRA deduction phase-outs, QCD
 *   limit $111,000.
 * - IRS Rev. Proc. 2025-32 section 4.42: 2026 annual gift exclusion $19,000.
 * - CMS, 2026 Medicare Parts A and B premiums: standard Part B $202.90 a
 *   month; IRMAA from modified AGI above $109,000 ($218,000 joint), two years
 *   back.
 * - College Board, Trends in College Pricing and Student Aid 2025, Table CP-1
 *   (2025-26 average published prices, enrollment-weighted).
 *
 * Pure functions; every figure quoted in the guides comes from here.
 */

import { grow } from "./savings";
import { rothVsTaxable } from "./savings-extra";
import { federalReturn, US_2026, type FilingStatus } from "./tax-2026";
import { stateTax } from "./state-tax-2026";

/* ── Social Security ─────────────────────────────────────────────── */

export const SS_2026 = {
  bendPoints: [1_286, 7_749] as const,
  /** Cost-of-living adjustment paid from January 2026. */
  cola: 0.028,
  wageBase: US_2026.socialSecurity.wageBase,
  /** Retirement earnings test: below full retirement age all year, and in the year you reach it. */
  earningsTest: { under: 24_480, fraYear: 65_160 },
  maxAtFra: 4_152,
  /** Average retired worker, January 2026 (SSA estimate). */
  averageRetired: 2_071,
} as const;

/** Full retirement age in months, by year of birth (people born on January 1 use the year before). */
export function fullRetirementAgeMonths(birthYear: number): number {
  if (birthYear <= 1954) return 66 * 12;
  if (birthYear >= 1960) return 67 * 12;
  return 66 * 12 + (birthYear - 1954) * 2;
}

/** "67" or "66 and 10 months". */
export function ageLabel(months: number): string {
  const y = Math.floor(months / 12);
  const m = Math.round(months - y * 12);
  return m === 0 ? `${y}` : `${y} and ${m} ${m === 1 ? "month" : "months"}`;
}

/** Share of the full benefit paid when claiming at `claimMonths` of age. */
export function claimFactor(claimMonths: number, fraMonths: number): number {
  const diff = Math.round(claimMonths - fraMonths);
  if (diff < 0) {
    const early = -diff;
    return 1 - (Math.min(36, early) * 5) / 900 - (Math.max(0, early - 36) * 5) / 1200;
  }
  const late = Math.min(diff, 70 * 12 - fraMonths);
  return 1 + (Math.max(0, late) * 2) / 300;
}

/** Primary insurance amount from AIME with the 2026 bend points, rounded down to the dime. */
export function pia(aime: number): number {
  const [b1, b2] = SS_2026.bendPoints;
  const a = Math.max(0, aime);
  const raw = 0.9 * Math.min(a, b1) + 0.32 * Math.max(0, Math.min(a, b2) - b1) + 0.15 * Math.max(0, a - b2);
  return Math.floor(raw * 10 + 1e-9) / 10;
}

/**
 * A simple AIME: today's salary (capped at the taxable maximum) for each year
 * worked, as if every year's earnings matched it after wage indexing, spread
 * over the 35 years the formula uses.
 */
export function aimeFromSalary(salary: number, years: number): number {
  const s = Math.min(Math.max(0, salary), SS_2026.wageBase);
  return Math.floor((s * Math.min(35, Math.max(0, years))) / 35 / 12);
}

export type ClaimRow = { age: number; months: number; factor: number; monthly: number; yearly: number; lifetime: number };

/**
 * Monthly benefit for a claim at each whole age from 62 to 70 (and at full
 * retirement age), in today's dollars, plus lifetime benefits to `lifeTo`.
 */
export function claimTable(piaAmount: number, birthYear: number, lifeTo = 85): { fra: number; rows: ClaimRow[]; atFra: ClaimRow } {
  const fra = fullRetirementAgeMonths(birthYear);
  const row = (months: number): ClaimRow => {
    const factor = claimFactor(months, fra);
    const monthly = Math.floor(piaAmount * factor);
    const paidMonths = Math.max(0, lifeTo * 12 - months);
    return { age: months / 12, months, factor, monthly, yearly: monthly * 12, lifetime: monthly * paidMonths };
  };
  const rows = [62, 63, 64, 65, 66, 67, 68, 69, 70].map((a) => row(a * 12));
  return { fra, rows, atFra: row(fra) };
}

/** Age (in months) when the later claim's running total catches up with the earlier one's; Infinity if never. */
export function breakEvenMonths(earlyMonthly: number, earlyAgeMonths: number, lateMonthly: number, lateAgeMonths: number): number {
  if (lateMonthly <= earlyMonthly) return Infinity;
  return Math.ceil((lateMonthly * lateAgeMonths - earlyMonthly * earlyAgeMonths) / (lateMonthly - earlyMonthly));
}

/** Benefits withheld under the earnings test for a year of `earnings` while claiming before full retirement age. */
export function earningsTestWithheld(yearlyBenefit: number, earnings: number, fraYear: boolean): number {
  const t = SS_2026.earningsTest;
  const over = Math.max(0, earnings - (fraYear ? t.fraYear : t.under));
  return Math.min(Math.max(0, yearlyBenefit), fraYear ? over / 3 : over / 2);
}

const SS_BASES: Record<FilingStatus, [number, number]> = {
  single: [25_000, 34_000],
  hoh: [25_000, 34_000],
  mfj: [32_000, 44_000],
  /** Married filing separately and living together: no base amount. */
  mfs: [0, 0],
};

/** Taxable part of Social Security benefits (IRS Publication 915 worksheet). */
export function taxableBenefits(benefits: number, otherIncome: number, status: FilingStatus, taxExemptInterest = 0): { provisional: number; taxable: number } {
  const b = Math.max(0, benefits);
  const provisional = Math.max(0, otherIncome) + Math.max(0, taxExemptInterest) + b / 2;
  const [base, upper] = SS_BASES[status];
  if (provisional <= base) return { provisional, taxable: 0 };
  if (provisional <= upper) return { provisional, taxable: Math.min(0.5 * b, 0.5 * (provisional - base)) };
  const taxable = Math.min(0.85 * b, 0.85 * (provisional - upper) + Math.min(0.5 * b, 0.5 * (upper - base)));
  return { provisional, taxable };
}

const RETURN_BASE = {
  wages: 0,
  otherIncome: 0,
  longTermGains: 0,
  selfEmployment: 0,
  preTax: 0,
  adjustments: 0,
  itemized: 0,
  blind: 0,
  children: 0,
  otherDependents: 0,
  overtimePremium: 0,
  tips: 0,
  withheld: 0,
};

/** Federal income tax caused by Social Security benefits on top of other ordinary retirement income. */
export function benefitTax(benefits: number, otherIncome: number, status: FilingStatus, over65: number): { provisional: number; taxable: number; taxWith: number; taxWithout: number; extra: number } {
  const t = taxableBenefits(benefits, otherIncome, status);
  const without = federalReturn({ ...RETURN_BASE, status, over65, nonInvestmentIncome: Math.max(0, otherIncome) }).totalTax;
  const withSs = federalReturn({ ...RETURN_BASE, status, over65, nonInvestmentIncome: Math.max(0, otherIncome) + t.taxable }).totalTax;
  return { ...t, taxWith: withSs, taxWithout: without, extra: withSs - without };
}

/* ── Required minimum distributions ──────────────────────────────── */

/** IRS Publication 590-B, Table III (Uniform Lifetime): applicable denominator by age 72 to 120. */
const UNIFORM = [27.4, 26.5, 25.5, 24.6, 23.7, 22.9, 22.0, 21.1, 20.2, 19.4, 18.5, 17.7, 16.8, 16.0, 15.2, 14.4, 13.7, 12.9, 12.2, 11.5, 10.8, 10.1, 9.5, 8.9, 8.4, 7.8, 7.3, 6.8, 6.4, 6.0, 5.6, 5.2, 4.9, 4.6, 4.3, 4.1, 3.9, 3.7, 3.5, 3.4, 3.3, 3.1, 3.0, 2.9, 2.8, 2.7, 2.5, 2.3, 2.0];

export function uniformDivisor(age: number): number {
  const a = Math.round(age);
  if (a < 72) return UNIFORM[0];
  return UNIFORM[Math.min(UNIFORM.length - 1, a - 72)];
}

/**
 * IRS Publication 590-B, Table II (Joint and Last Survivor), for owners aged
 * 72 to 105 whose spouse, the sole beneficiary, is more than 10 years
 * younger. Each row lists the factor for a spouse aged 30, 31, … up to the
 * owner's age minus 11.
 */
const JOINT: Record<number, string> = {
  72: "55.5 54.5 53.6 52.6 51.7 50.8 49.8 48.9 47.9 47.0 46.0 45.1 44.2 43.2 42.3 41.4 40.5 39.6 38.7 37.8 36.9 36.0 35.2 34.3 33.5 32.7 31.9 31.1 30.3 29.5 28.8 28.1",
  73: "55.5 54.5 53.6 52.6 51.7 50.7 49.8 48.8 47.9 46.9 46.0 45.1 44.1 43.2 42.3 41.4 40.4 39.5 38.6 37.7 36.8 36.0 35.1 34.2 33.4 32.6 31.7 30.9 30.1 29.4 28.6 27.9 27.2",
  74: "55.5 54.5 53.6 52.6 51.7 50.7 49.8 48.8 47.9 46.9 46.0 45.0 44.1 43.2 42.2 41.3 40.4 39.5 38.6 37.7 36.8 35.9 35.0 34.1 33.3 32.4 31.6 30.8 30.0 29.2 28.4 27.7 27.0 26.2",
  75: "55.5 54.5 53.5 52.6 51.6 50.7 49.7 48.8 47.8 46.9 45.9 45.0 44.1 43.1 42.2 41.3 40.3 39.4 38.5 37.6 36.7 35.8 34.9 34.1 33.2 32.4 31.5 30.7 29.9 29.1 28.3 27.5 26.8 26.1 25.3",
  76: "55.4 54.5 53.5 52.6 51.6 50.7 49.7 48.8 47.8 46.9 45.9 45.0 44.0 43.1 42.2 41.2 40.3 39.4 38.5 37.5 36.6 35.7 34.9 34.0 33.1 32.3 31.4 30.6 29.8 29.0 28.2 27.4 26.6 25.9 25.2 24.4",
  77: "55.4 54.5 53.5 52.6 51.6 50.7 49.7 48.8 47.8 46.9 45.9 45.0 44.0 43.1 42.1 41.2 40.3 39.3 38.4 37.5 36.6 35.7 34.8 33.9 33.0 32.2 31.3 30.5 29.7 28.8 28.0 27.3 26.5 25.7 25.0 24.3 23.5",
  78: "55.4 54.5 53.5 52.6 51.6 50.6 49.7 48.7 47.8 46.8 45.9 44.9 44.0 43.0 42.1 41.2 40.2 39.3 38.4 37.5 36.5 35.6 34.7 33.9 33.0 32.1 31.2 30.4 29.6 28.7 27.9 27.1 26.4 25.6 24.8 24.1 23.4 22.7",
  79: "55.4 54.5 53.5 52.5 51.6 50.6 49.7 48.7 47.8 46.8 45.9 44.9 44.0 43.0 42.1 41.1 40.2 39.3 38.3 37.4 36.5 35.6 34.7 33.8 32.9 32.0 31.2 30.3 29.5 28.7 27.8 27.0 26.2 25.5 24.7 23.9 23.2 22.5 21.8",
  80: "55.4 54.4 53.5 52.5 51.6 50.6 49.7 48.7 47.8 46.8 45.9 44.9 43.9 43.0 42.1 41.1 40.2 39.2 38.3 37.4 36.5 35.5 34.6 33.7 32.9 32.0 31.1 30.3 29.4 28.6 27.8 26.9 26.1 25.3 24.6 23.8 23.1 22.3 21.6 20.9",
  81: "55.4 54.4 53.5 52.5 51.6 50.6 49.7 48.7 47.7 46.8 45.8 44.9 43.9 43.0 42.0 41.1 40.1 39.2 38.3 37.3 36.4 35.5 34.6 33.7 32.8 31.9 31.1 30.2 29.3 28.5 27.7 26.9 26.0 25.2 24.5 23.7 22.9 22.2 21.5 20.7 20.0",
  82: "55.4 54.4 53.5 52.5 51.6 50.6 49.7 48.7 47.7 46.8 45.8 44.9 43.9 43.0 42.0 41.1 40.1 39.2 38.3 37.3 36.4 35.5 34.6 33.7 32.8 31.9 31.0 30.1 29.3 28.4 27.6 26.8 26.0 25.2 24.4 23.6 22.8 22.1 21.3 20.6 19.9 19.2",
  83: "55.4 54.4 53.5 52.5 51.6 50.6 49.6 48.7 47.7 46.8 45.8 44.9 43.9 43.0 42.0 41.1 40.1 39.2 38.2 37.3 36.4 35.4 34.5 33.6 32.7 31.8 31.0 30.1 29.2 28.4 27.5 26.7 25.9 25.1 24.3 23.5 22.7 22.0 21.2 20.5 19.7 19.0 18.3",
  84: "55.4 54.4 53.5 52.5 51.5 50.6 49.6 48.7 47.7 46.8 45.8 44.9 43.9 42.9 42.0 41.0 40.1 39.2 38.2 37.3 36.3 35.4 34.5 33.6 32.7 31.8 30.9 30.0 29.2 28.3 27.5 26.7 25.8 25.0 24.2 23.4 22.6 21.9 21.1 20.4 19.6 18.9 18.2 17.5",
  85: "55.4 54.4 53.5 52.5 51.5 50.6 49.6 48.7 47.7 46.8 45.8 44.8 43.9 42.9 42.0 41.0 40.1 39.1 38.2 37.3 36.3 35.4 34.5 33.6 32.7 31.8 30.9 30.0 29.1 28.3 27.4 26.6 25.8 25.0 24.1 23.3 22.6 21.8 21.0 20.3 19.5 18.8 18.1 17.4 16.7",
  86: "55.4 54.4 53.5 52.5 51.5 50.6 49.6 48.7 47.7 46.7 45.8 44.8 43.9 42.9 42.0 41.0 40.1 39.1 38.2 37.2 36.3 35.4 34.5 33.5 32.6 31.7 30.9 30.0 29.1 28.2 27.4 26.6 25.7 24.9 24.1 23.3 22.5 21.7 20.9 20.2 19.4 18.7 17.9 17.2 16.5 15.9",
  87: "55.4 54.4 53.4 52.5 51.5 50.6 49.6 48.7 47.7 46.7 45.8 44.8 43.9 42.9 42.0 41.0 40.1 39.1 38.2 37.2 36.3 35.4 34.4 33.5 32.6 31.7 30.8 29.9 29.1 28.2 27.4 26.5 25.7 24.9 24.0 23.2 22.4 21.6 20.9 20.1 19.3 18.6 17.8 17.1 16.4 15.7 15.1",
  88: "55.4 54.4 53.4 52.5 51.5 50.6 49.6 48.7 47.7 46.7 45.8 44.8 43.9 42.9 42.0 41.0 40.0 39.1 38.2 37.2 36.3 35.3 34.4 33.5 32.6 31.7 30.8 29.9 29.0 28.2 27.3 26.5 25.6 24.8 24.0 23.2 22.4 21.6 20.8 20.0 19.2 18.5 17.7 17.0 16.3 15.6 14.9 14.3",
  89: "55.4 54.4 53.4 52.5 51.5 50.6 49.6 48.7 47.7 46.7 45.8 44.8 43.9 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.3 35.3 34.4 33.5 32.6 31.7 30.8 29.9 29.0 28.2 27.3 26.4 25.6 24.8 24.0 23.1 22.3 21.5 20.7 20.0 19.2 18.4 17.7 16.9 16.2 15.5 14.8 14.2 13.5",
  90: "55.4 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.9 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.3 35.3 34.4 33.5 32.6 31.7 30.8 29.9 29.0 28.1 27.3 26.4 25.6 24.7 23.9 23.1 22.3 21.5 20.7 19.9 19.1 18.4 17.6 16.9 16.1 15.4 14.8 14.1 13.4 12.8",
  91: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.9 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.4 33.5 32.5 31.6 30.7 29.9 29.0 28.1 27.3 26.4 25.6 24.7 23.9 23.1 22.3 21.5 20.7 19.9 19.1 18.3 17.5 16.8 16.1 15.3 14.6 14.0 13.3 12.7 12.1",
  92: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.4 33.5 32.5 31.6 30.7 29.8 29.0 28.1 27.2 26.4 25.5 24.7 23.9 23.0 22.2 21.4 20.6 19.8 19.0 18.3 17.5 16.7 16.0 15.3 14.6 13.9 13.2 12.6 11.9 11.4",
  93: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.4 33.4 32.5 31.6 30.7 29.8 29.0 28.1 27.2 26.4 25.5 24.7 23.8 23.0 22.2 21.4 20.6 19.8 19.0 18.2 17.4 16.7 15.9 15.2 14.5 13.8 13.1 12.5 11.9 11.3 10.7",
  94: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.4 33.4 32.5 31.6 30.7 29.8 28.9 28.1 27.2 26.3 25.5 24.7 23.8 23.0 22.2 21.4 20.6 19.8 19.0 18.2 17.4 16.6 15.9 15.2 14.4 13.7 13.1 12.4 11.8 11.2 10.6 10.0",
  95: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.4 33.4 32.5 31.6 30.7 29.8 28.9 28.1 27.2 26.3 25.5 24.6 23.8 23.0 22.2 21.4 20.6 19.7 18.9 18.2 17.4 16.6 15.9 15.1 14.4 13.7 13.0 12.3 11.7 11.1 10.5 9.9 9.4",
  96: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.2 26.3 25.5 24.6 23.8 23.0 22.2 21.3 20.5 19.7 18.9 18.1 17.4 16.6 15.8 15.1 14.3 13.6 12.9 12.3 11.6 11.0 10.4 9.9 9.3 8.8",
  97: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.2 26.3 25.5 24.6 23.8 23.0 22.1 21.3 20.5 19.7 18.9 18.1 17.3 16.6 15.8 15.0 14.3 13.6 12.9 12.2 11.6 11.0 10.4 9.8 9.2 8.7 8.3",
  98: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.2 26.3 25.5 24.6 23.8 22.9 22.1 21.3 20.5 19.7 18.9 18.1 17.3 16.5 15.8 15.0 14.3 13.6 12.9 12.2 11.5 10.9 10.3 9.7 9.2 8.7 8.2 7.7",
  99: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.1 38.1 37.2 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.2 26.3 25.4 24.6 23.8 22.9 22.1 21.3 20.5 19.7 18.9 18.1 17.3 16.5 15.7 15.0 14.3 13.5 12.8 12.2 11.5 10.9 10.2 9.7 9.1 8.6 8.1 7.6 7.2",
  100: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.0 38.1 37.1 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.1 26.3 25.4 24.6 23.8 22.9 22.1 21.3 20.5 19.7 18.9 18.1 17.3 16.5 15.7 15.0 14.2 13.5 12.8 12.1 11.5 10.8 10.2 9.6 9.1 8.5 8.0 7.6 7.2 6.8",
  101: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.0 38.1 37.1 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.1 26.3 25.4 24.6 23.8 22.9 22.1 21.3 20.5 19.7 18.9 18.1 17.3 16.5 15.7 15.0 14.2 13.5 12.8 12.1 11.4 10.8 10.2 9.6 9.0 8.5 8.0 7.5 7.1 6.7 6.3",
  102: "55.3 54.4 53.4 52.5 51.5 50.6 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.0 38.1 37.1 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.1 26.3 25.4 24.6 23.7 22.9 22.1 21.3 20.5 19.7 18.8 18.0 17.3 16.5 15.7 14.9 14.2 13.5 12.8 12.1 11.4 10.8 10.1 9.6 9.0 8.5 8.0 7.5 7.0 6.6 6.3 5.9",
  103: "55.3 54.4 53.4 52.5 51.5 50.5 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.0 38.1 37.1 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.1 26.3 25.4 24.6 23.7 22.9 22.1 21.3 20.5 19.6 18.8 18.0 17.3 16.5 15.7 14.9 14.2 13.5 12.8 12.1 11.4 10.7 10.1 9.5 9.0 8.4 7.9 7.4 7.0 6.6 6.2 5.9 5.5",
  104: "55.3 54.4 53.4 52.5 51.5 50.5 49.6 48.6 47.7 46.7 45.8 44.8 43.8 42.9 41.9 41.0 40.0 39.0 38.1 37.1 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.1 26.3 25.4 24.6 23.7 22.9 22.1 21.3 20.5 19.6 18.8 18.0 17.2 16.5 15.7 14.9 14.2 13.5 12.7 12.0 11.4 10.7 10.1 9.5 8.9 8.4 7.9 7.4 7.0 6.6 6.2 5.8 5.5 5.2",
  105: "55.3 54.4 53.4 52.5 51.5 50.5 49.6 48.6 47.7 46.7 45.7 44.8 43.8 42.9 41.9 41.0 40.0 39.0 38.1 37.1 36.2 35.3 34.3 33.4 32.5 31.6 30.7 29.8 28.9 28.0 27.1 26.3 25.4 24.6 23.7 22.9 22.1 21.3 20.5 19.6 18.8 18.0 17.2 16.5 15.7 14.9 14.2 13.4 12.7 12.0 11.4 10.7 10.1 9.5 8.9 8.4 7.9 7.4 6.9 6.5 6.1 5.8 5.4 5.1 4.9",
};

const JOINT_FROM = 30;

/** The Joint Life factor, or null when the table doesn't apply (gap of 10 years or less, or ages outside it). */
export function jointDivisor(age: number, spouseAge: number): number | null {
  const a = Math.round(age);
  const s = Math.round(spouseAge);
  if (a - s <= 10 || s < JOINT_FROM) return null;
  const row = JOINT[Math.min(105, a)];
  if (!row) return null;
  const v = Number(row.split(" ")[s - JOINT_FROM]);
  return Number.isFinite(v) ? v : null;
}

/** RMD starting age under SECURE 2.0, by year of birth. */
export function rmdStartAge(birthYear: number): number {
  if (birthYear >= 1960) return 75;
  if (birthYear >= 1951) return 73;
  return 72;
}

export type RmdYear = { year: number; age: number; startBalance: number; divisor: number; table: "uniform" | "joint"; rmd: number; endBalance: number };

export type RmdInput = {
  /** Balance on December 31 of the year before `fromYear`. */
  balance: number;
  birthYear: number;
  /** Spouse's year of birth if they are the sole beneficiary (0 if none). */
  spouseBirthYear: number;
  returnPct: number;
  fromYear: number;
  years: number;
};

/** Year-by-year RMDs: each year's RMD is the prior December 31 balance ÷ the factor; the RMD is taken at year end. */
export function rmdSchedule(i: RmdInput): RmdYear[] {
  const start = rmdStartAge(i.birthYear);
  const out: RmdYear[] = [];
  let bal = Math.max(0, i.balance);
  for (let k = 0; k < Math.max(1, Math.round(i.years)); k++) {
    const year = i.fromYear + k;
    const age = year - i.birthYear;
    const joint = i.spouseBirthYear > 0 ? jointDivisor(age, year - i.spouseBirthYear) : null;
    const divisor = joint ?? uniformDivisor(age);
    const rmd = age >= start ? bal / divisor : 0;
    const endBalance = Math.max(0, bal * (1 + i.returnPct / 100) - rmd);
    out.push({ year, age, startBalance: bal, divisor, table: joint ? "joint" : "uniform", rmd, endBalance });
    bal = endBalance;
  }
  return out;
}

/** Excise tax on an RMD shortfall: 25%, or 10% if corrected within the correction window. */
export function rmdPenalty(shortfall: number, corrected: boolean): number {
  return Math.max(0, shortfall) * (corrected ? 0.1 : 0.25);
}

export const QCD_LIMIT_2026 = 111_000;

/* ── Traditional IRA ─────────────────────────────────────────────── */

/** 2026 deduction phase-out ranges (modified AGI) when you or your spouse is covered by a workplace plan. */
export const IRA_DEDUCTION_2026 = {
  coveredSingle: [81_000, 91_000] as [number, number],
  coveredJoint: [129_000, 149_000] as [number, number],
  spouseCovered: [242_000, 252_000] as [number, number],
  separate: [0, 10_000] as [number, number],
};

export type IraDeduction = {
  /** Most you can contribute (age and earned income). */
  limit: number;
  /** How much of that you can deduct. */
  deductible: number;
  phase: "full" | "partial" | "none";
  range: [number, number] | null;
};

/** How much of a 2026 traditional IRA contribution is deductible (IRS Publication 590-A worksheet: round up to $10, at least $200). */
export function iraDeduction(magi: number, status: FilingStatus, covered: boolean, spouseCovered: boolean, age: number, earned: number): IraDeduction {
  const L = US_2026.limits;
  const limit = Math.min(L.ira + (age >= 50 ? L.iraCatchUp : 0), Math.max(0, earned));
  let range: [number, number] | null = null;
  const R = IRA_DEDUCTION_2026;
  if (status === "mfs" && (covered || spouseCovered)) range = R.separate;
  else if (covered) range = status === "mfj" ? R.coveredJoint : R.coveredSingle;
  else if (status === "mfj" && spouseCovered) range = R.spouseCovered;
  if (!range) return { limit, deductible: limit, phase: "full", range };
  const [lo, hi] = range;
  if (magi <= lo) return { limit, deductible: limit, phase: "full", range };
  if (magi >= hi) return { limit, deductible: 0, phase: "none", range };
  let d = limit * ((hi - magi) / (hi - lo));
  d = Math.ceil(d / 10) * 10;
  if (d < 200) d = 200;
  return { limit, deductible: Math.min(limit, d), phase: "partial", range };
}

/** Federal (and optional state) tax saved now by an IRA deduction, from the tax engines. */
export function deductionSaving(income: number, deduction: number, status: FilingStatus, stateCode = ""): { federal: number; state: number; total: number; rate: number } {
  const base = { ...RETURN_BASE, status, over65: 0, nonInvestmentIncome: Math.max(0, income) };
  const federal = federalReturn(base).totalTax - federalReturn({ ...base, adjustments: Math.max(0, deduction) }).totalTax;
  const st = stateCode
    ? stateTax({ code: stateCode, wages: income, status, dependents: 0 }).tax - stateTax({ code: stateCode, wages: Math.max(0, income - deduction), status, dependents: 0 }).tax
    : 0;
  const total = federal + st;
  return { federal, state: st, total, rate: deduction > 0 ? total / deduction : 0 };
}

export type IraCompare = {
  /** Traditional IRA balance at the end. */
  ira: number;
  /** After-tax basis from nondeductible contributions (comes out tax-free). */
  basis: number;
  /** Tax due if all of it came out at the retirement rate. */
  withdrawalTax: number;
  iraAfterTax: number;
  /** Same out-of-pocket cost invested in a taxable account, after selling. */
  taxableAfterSale: number;
  /** Same out-of-pocket cost in a Roth IRA. */
  roth: number;
  contributed: number;
  outOfPocket: number;
  path: { year: number; balance: number; deposits: number }[];
};

/**
 * A traditional IRA vs a taxable account and a Roth IRA for the same cost
 * to you. Each year you put in `yearly`, of which `deductibleYearly` is
 * deducted at `taxNowRate`; the tax saved lowers your cost, so the
 * alternatives get `yearly − tax saved`.
 */
export function iraCompare(start: number, yearly: number, deductibleYearly: number, taxNowRate: number, retireRate: number, returnPct: number, years: number, yieldPct: number, investTaxRate: number): IraCompare {
  const n = Math.max(0, Math.round(years));
  const g = grow(start, Math.max(0, yearly) / 12, returnPct, n, "monthly");
  const saved = Math.max(0, deductibleYearly) * Math.max(0, taxNowRate);
  const outYearly = Math.max(0, yearly - saved);
  const basis = Math.max(0, yearly - deductibleYearly) * n;
  const withdrawalTax = Math.max(0, g.balance - basis) * Math.max(0, retireRate);
  const cmp = rothVsTaxable(0, outYearly / 12, returnPct, n, yieldPct, investTaxRate, investTaxRate);
  return {
    ira: g.balance,
    basis,
    withdrawalTax,
    iraAfterTax: g.balance - withdrawalTax,
    taxableAfterSale: cmp.taxableAfterSale,
    roth: cmp.roth,
    contributed: Math.max(0, yearly) * n,
    outOfPocket: outYearly * n,
    path: [{ year: 0, balance: Math.max(0, start), deposits: Math.max(0, start) }, ...g.years.map((y) => ({ year: y.year, balance: y.balance, deposits: y.deposits }))],
  };
}

/* ── Roth conversion ─────────────────────────────────────────────── */

export const IRMAA_2026 = { single: 109_000, joint: 218_000, partB: 202.9 } as const;

export type ConversionInput = {
  status: FilingStatus;
  /** Other ordinary income this year (wages, pensions, IRA withdrawals). */
  income: number;
  conversion: number;
  over65: number;
  /** Two-letter state code, or "" for none. */
  state: string;
  years: number;
  returnPct: number;
  /** Your expected tax rate on traditional withdrawals in retirement (federal + state), as a fraction. */
  retireRate: number;
  /** Pay the tax from money outside the IRA (true) or from the converted amount (false). */
  payOutside: boolean;
  /** Yield and tax rate on the outside money if it stayed in a taxable account. */
  yieldPct: number;
  investTaxRate: number;
};

export type Conversion = {
  federal: number;
  state: number;
  tax: number;
  /** Tax as a share of the conversion. */
  rate: number;
  marginalBefore: number;
  marginalAfter: number;
  agiAfter: number;
  /** Roth balance at the end (tax-free). */
  roth: number;
  /** Traditional IRA after paying the retirement rate, plus the outside money kept invested. */
  keep: number;
  traditionalAfterTax: number;
  outsideAfterSale: number;
  advantage: number;
  /** Retirement tax rate at which converting and not converting come out the same. */
  breakEvenRate: number;
  irmaaRisk: boolean;
  path: { year: number; roth: number; keep: number }[];
};

export function rothConversion(i: ConversionInput): Conversion {
  const base = { ...RETURN_BASE, status: i.status, over65: Math.max(0, i.over65) };
  const c = Math.max(0, i.conversion);
  const before = federalReturn({ ...base, nonInvestmentIncome: Math.max(0, i.income) });
  const after = federalReturn({ ...base, nonInvestmentIncome: Math.max(0, i.income) + c });
  const federal = after.totalTax - before.totalTax;
  const st = i.state
    ? stateTax({ code: i.state, wages: Math.max(0, i.income) + c, status: i.status, dependents: 0 }).tax - stateTax({ code: i.state, wages: Math.max(0, i.income), status: i.status, dependents: 0 }).tax
    : 0;
  const tax = federal + st;
  const n = Math.max(0, Math.round(i.years));
  const growth = Math.pow(1 + i.returnPct / 100, n);
  const path: { year: number; roth: number; keep: number }[] = [];
  const outside = (yrs: number) => (i.payOutside && tax > 0 ? rothVsTaxable(tax, 0, i.returnPct, yrs, i.yieldPct, i.investTaxRate, i.investTaxRate).taxableAfterSale : 0);
  for (let y = 0; y <= n; y++) {
    const g = Math.pow(1 + i.returnPct / 100, y);
    const roth = (i.payOutside ? c : Math.max(0, c - tax)) * g;
    const keep = c * g * (1 - i.retireRate) + outside(y);
    path.push({ year: y, roth, keep });
  }
  const roth = (i.payOutside ? c : Math.max(0, c - tax)) * growth;
  const outsideAfterSale = outside(n);
  const traditionalAfterTax = c * growth * (1 - i.retireRate);
  const keep = traditionalAfterTax + outsideAfterSale;
  // Tie when c·g·(1 − t) + outside = roth.
  const breakEvenRate = c > 0 ? 1 - (roth - outsideAfterSale) / (c * growth) : 0;
  const threshold = i.status === "mfj" ? IRMAA_2026.joint : IRMAA_2026.single;
  return {
    federal,
    state: st,
    tax,
    rate: c > 0 ? tax / c : 0,
    marginalBefore: before.ordinary.marginal,
    marginalAfter: after.ordinary.marginal,
    agiAfter: after.agi,
    roth,
    keep,
    traditionalAfterTax,
    outsideAfterSale,
    advantage: roth - keep,
    breakEvenRate,
    irmaaRisk: after.agi > threshold,
    path,
  };
}

/** Largest extra ordinary income (a conversion) that stays in the current federal bracket, found from the tax engine. */
export function roomInBracket(income: number, status: FilingStatus, over65: number): { room: number; rate: number } {
  const base = { ...RETURN_BASE, status, over65: Math.max(0, over65) };
  const marginal = (x: number) => {
    const r = federalReturn({ ...base, nonInvestmentIncome: Math.max(0, income) + x });
    return r.taxable > 0 ? r.ordinary.marginal : 0;
  };
  const now = marginal(0);
  const rate = now === 0 ? 0.1 : now;
  if (rate >= 0.37) return { room: 0, rate };
  let lo = 0;
  let hi = 2_000_000;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (marginal(mid) <= rate) lo = mid;
    else hi = mid;
  }
  const whole = Math.round(lo);
  return { room: marginal(whole) <= rate ? whole : Math.floor(lo), rate };
}

/* ── 529 college saving ──────────────────────────────────────────── */

/** College Board, 2025-26 average published tuition and fees plus housing and food (full-time undergraduates). */
export const COLLEGE_COST_2025_26 = {
  publicTwo: { label: "Public two-year, in-district", tuition: 4_150, total: 15_000 },
  publicIn: { label: "Public four-year, in-state", tuition: 11_950, total: 25_850 },
  publicOut: { label: "Public four-year, out-of-state", tuition: 31_880, total: 45_780 },
  private: { label: "Private nonprofit four-year", tuition: 45_000, total: 60_920 },
} as const;

export type CollegeType = keyof typeof COLLEGE_COST_2025_26;

/** 2026 annual gift tax exclusion; a 529 gift can be spread over five years ("superfunding"). */
export const GIFT_EXCLUSION_2026 = 19_000;
export const SUPERFUND_YEARS = 5;
/** Lifetime limit on 529 to Roth IRA rollovers (SECURE 2.0), within the yearly IRA limit. */
export const ROTH_ROLLOVER_LIFETIME = 35_000;
/** Federal yearly limit on 529 money for K-12 tuition and expenses from 2026 (was $10,000). */
export const K12_LIMIT_2026 = 20_000;

export type CollegePlanInput = {
  /** Yearly cost in today's dollars. */
  costToday: number;
  yearsUntil: number;
  yearsInCollege: number;
  inflationPct: number;
  saved: number;
  returnPct: number;
  /** Share of the cost to cover from savings (0 to 1). */
  cover: number;
  /** What you plan to save each month (to project). */
  monthlyPlanned: number;
};

export type CollegePlan = {
  costs: { year: number; cost: number }[];
  totalFuture: number;
  totalToday: number;
  target: number;
  monthlyNeeded: number;
  projected: number;
  /** What the planned saving covers, as a share of the target. */
  coverShare: number;
  path: { year: number; balance: number; deposits: number }[];
};

/**
 * Cost of college at the inflation rate and the monthly saving needed to have
 * the full amount by the first year (a cautious target: money still invested
 * during college would earn a little more).
 */
export function collegePlan(i: CollegePlanInput): CollegePlan {
  const n = Math.max(0, Math.round(i.yearsUntil));
  const k = Math.max(1, Math.round(i.yearsInCollege));
  const costs = Array.from({ length: k }, (_, j) => ({ year: n + j, cost: Math.max(0, i.costToday) * Math.pow(1 + i.inflationPct / 100, n + j) }));
  const totalFuture = costs.reduce((s, c) => s + c.cost, 0);
  const target = totalFuture * Math.min(1, Math.max(0, i.cover));
  const months = n * 12;
  let monthlyNeeded = 0;
  if (months > 0) {
    // grow() compounds monthly at exactly returnPct ÷ 12, so the usual annuity factor matches it.
    const r = i.returnPct / 100 / 12;
    const gap = Math.max(0, target - grow(i.saved, 0, i.returnPct, n, "monthly").balance);
    monthlyNeeded = r === 0 ? gap / months : (gap * r) / (Math.pow(1 + r, months) - 1);
  }
  const g = grow(i.saved, i.monthlyPlanned, i.returnPct, n, "monthly");
  return {
    costs,
    totalFuture,
    totalToday: Math.max(0, i.costToday) * k,
    target,
    monthlyNeeded,
    projected: g.balance,
    coverShare: target > 0 ? g.balance / target : 1,
    path: [{ year: 0, balance: Math.max(0, i.saved), deposits: Math.max(0, i.saved) }, ...g.years.map((y) => ({ year: y.year, balance: y.balance, deposits: y.deposits }))],
  };
}
