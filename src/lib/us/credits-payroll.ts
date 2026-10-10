/**
 * Family tax credits, hourly pay, raises and employer payroll costs for 2026.
 *
 * Sources:
 * - IRS Rev. Proc. 2025-32, sections 4.05 and 4.06: child tax credit $2,200,
 *   refundable amount $1,700; the 2026 earned income credit table and the
 *   $12,200 investment income limit.
 * - Schedule 8812 (Form 1040): the additional child tax credit is the smaller
 *   of (credit after the phase-out − credit used against tax), $1,700 a child
 *   and 15% of earned income over $2,500; with three or more children, the
 *   larger of that 15% figure and Social Security and Medicare withheld less
 *   the earned income credit.
 * - 26 U.S.C. § 32: EITC credit and phase-out percentages.
 * - IRS Publication 15 and Form 940 instructions: FUTA 6.0% on the first
 *   $7,000 a worker, less a credit of up to 5.4% for state unemployment tax.
 * - U.S. Department of Labor, ETA: FUTA credit reductions (2025 final:
 *   California 1.2%, U.S. Virgin Islands 4.5%; 2026 potential: California 1.5%,
 *   decided after November 10, 2026).
 * - U.S. Department of Labor, ETA: "Significant Provisions of State
 *   Unemployment Insurance Laws, Effective January 2026" (taxable wage bases
 *   and new employer base rates).
 * - BLS CPI release of September 11, 2026: CPI-U up 3.4% in the 12 months to
 *   August 2026.
 * - KFF 2025 Employer Health Benefits Survey: average single premium $9,325, of
 *   which workers paid $1,440.
 */

import { federalReturn, fica, US_2026, type FilingStatus } from "./tax-2026";
import { paycheck, PERIODS, type Paycheck, type PaycheckInput } from "./pay";

/* ── Child tax credit (Schedule 8812) ─────────────────────────────── */

export type ChildCreditInput = {
  status: FilingStatus;
  /** Qualifying children under 17 with a Social Security number valid for work. */
  children: number;
  /** Other dependents: older children, relatives, children without an SSN. */
  otherDependents: number;
  /** Modified AGI (for most people, AGI). */
  magi: number;
  /** Federal income tax before credits (Form 1040 line 18, less other credits). */
  taxBeforeCredits: number;
  /** Earned income for the refundable part (wages, net self-employment earnings). */
  earnedIncome: number;
  /** Social Security and Medicare withheld (and half of SE tax): used with 3 or more children. */
  payrollTaxes?: number;
  /** Earned income credit claimed: used with 3 or more children. */
  eitc?: number;
};

export type ChildCreditResult = {
  /** Before the phase-out. */
  full: number;
  reduction: number;
  /** After the phase-out (Schedule 8812 line 12). */
  credit: number;
  /** Used against income tax (line 14). */
  nonRefundable: number;
  /** Unused after the tax is cleared (line 16a). */
  unused: number;
  /** $1,700 for each qualifying child (line 16b). */
  refundCap: number;
  /** 15% of earned income over $2,500 (line 20). */
  earnedLimit: number;
  /** Social Security and Medicare less the EITC, for 3 or more children (line 25). */
  payrollLimit: number;
  /** Additional child tax credit: the refundable part (line 27). */
  refundable: number;
  /** What the credits are worth in total. */
  total: number;
  /** Credit after the phase-out that you cannot use (no tax and too little refundable room). */
  lost: number;
  /** Modified AGI from which the credit is gone completely (null when there is no credit). */
  zeroAt: number | null;
};

const CTC = US_2026.childTaxCredit;

/** Modified AGI above which the whole credit has phased out. */
export function childCreditZeroAt(status: FilingStatus, full: number): number | null {
  if (full <= 0) return null;
  const steps = Math.ceil(full / CTC.phaseStep);
  return CTC.phaseStart[status] + (steps - 1) * 1_000 + 1;
}

/** The child tax credit and credit for other dependents, as Schedule 8812 works them out. */
export function childCredit(i: ChildCreditInput): ChildCreditResult {
  const kids = Math.max(0, Math.floor(i.children));
  const others = Math.max(0, Math.floor(i.otherDependents));
  const full = kids * CTC.perChild + others * CTC.otherDependent;
  const reduction = Math.min(full, (Math.ceil(Math.max(0, i.magi - CTC.phaseStart[i.status]) / 1_000) * CTC.phaseStep));
  const credit = full - reduction;
  const nonRefundable = Math.min(credit, Math.max(0, i.taxBeforeCredits));
  const unused = credit - nonRefundable;
  const refundCap = kids * CTC.refundable;
  const earnedLimit = Math.max(0, Math.max(0, i.earnedIncome) - 2_500) * 0.15;
  const payrollLimit = kids >= 3 ? Math.max(0, (i.payrollTaxes ?? 0) - (i.eitc ?? 0)) : 0;
  const refundable = kids > 0 ? Math.min(unused, refundCap, Math.max(earnedLimit, payrollLimit)) : 0;
  return {
    full,
    reduction,
    credit,
    nonRefundable,
    unused,
    refundCap,
    earnedLimit,
    payrollLimit,
    refundable,
    total: nonRefundable + refundable,
    lost: unused - refundable,
    zeroAt: childCreditZeroAt(i.status, full),
  };
}

export type FamilyInput = {
  status: FilingStatus;
  wages: number;
  /** Net self-employment profit. */
  selfEmployment?: number;
  /** Interest, dividends and other income (not earned). */
  otherIncome?: number;
  /** Pre-tax 401(k), HSA and cafeteria plan deductions from wages. */
  preTax?: number;
  children: number;
  otherDependents: number;
  /** Itemized deductions, if more than the standard deduction. */
  itemized?: number;
};

export type FamilyCredits = {
  agi: number;
  taxBeforeCredits: number;
  earnedIncome: number;
  eitc: number;
  ctc: ChildCreditResult;
  /** Federal income tax left after the non-refundable credit. */
  taxAfterCredits: number;
};

/** The child tax credit for a household from its income: works out AGI, tax before credits and the EITC first. */
export function familyCredits(i: FamilyInput): FamilyCredits {
  const se = Math.max(0, i.selfEmployment ?? 0);
  const base = federalReturn({
    status: i.status,
    wages: Math.max(0, i.wages),
    otherIncome: Math.max(0, i.otherIncome ?? 0),
    longTermGains: 0,
    selfEmployment: se,
    preTax: Math.max(0, i.preTax ?? 0),
    adjustments: 0,
    itemized: Math.max(0, i.itemized ?? 0),
    over65: 0,
    blind: 0,
    children: 0,
    otherDependents: 0,
    overtimePremium: 0,
    tips: 0,
    withheld: 0,
  });
  const wagesAfter = Math.max(0, i.wages - Math.max(0, i.preTax ?? 0));
  const earnedIncome = wagesAfter + Math.max(0, base.se.earnings - base.se.deduction);
  const credit = eitc({
    status: i.status,
    children: i.children,
    earnedIncome,
    agi: base.agi,
    investmentIncome: Math.max(0, i.otherIncome ?? 0),
  });
  const payrollTaxes = fica(Math.max(0, i.wages), i.status).total + base.se.seTax / 2;
  const ctc = childCredit({
    status: i.status,
    children: i.children,
    otherDependents: i.otherDependents,
    magi: base.agi,
    taxBeforeCredits: base.incomeTax,
    earnedIncome,
    payrollTaxes,
    eitc: credit.credit,
  });
  return { agi: base.agi, taxBeforeCredits: base.incomeTax, earnedIncome, eitc: credit.credit, ctc, taxAfterCredits: base.incomeTax - ctc.nonRefundable };
}

/* ── Earned income tax credit ─────────────────────────────────────── */

export type EitcRow = {
  /** Credit percentage (phase-in). */
  rate: number;
  /** Earned income at which the maximum credit is reached. */
  earnedAmount: number;
  max: number;
  /** Phase-out percentage. */
  phaseRate: number;
  /** Phase-out starts above this AGI or earned income (all other statuses / married filing jointly). */
  start: number;
  startJoint: number;
  /** No credit at or above this (all other statuses / married filing jointly). */
  end: number;
  endJoint: number;
};

/** 2026 EITC table (Rev. Proc. 2025-32 §4.06; percentages from 26 U.S.C. § 32(b)). Index = qualifying children, 3 means three or more. */
export const EITC_2026: EitcRow[] = [
  { rate: 0.0765, earnedAmount: 8_680, max: 664, phaseRate: 0.0765, start: 10_860, startJoint: 18_140, end: 19_540, endJoint: 26_820 },
  { rate: 0.34, earnedAmount: 13_020, max: 4_427, phaseRate: 0.1598, start: 23_890, startJoint: 31_160, end: 51_593, endJoint: 58_863 },
  { rate: 0.4, earnedAmount: 18_290, max: 7_316, phaseRate: 0.2106, start: 23_890, startJoint: 31_160, end: 58_629, endJoint: 65_899 },
  { rate: 0.45, earnedAmount: 18_290, max: 8_231, phaseRate: 0.2106, start: 23_890, startJoint: 31_160, end: 62_974, endJoint: 70_244 },
];

/** No EITC if investment income is more than this in 2026. */
export const EITC_INVESTMENT_LIMIT = 12_200;

export type EitcInput = {
  status: FilingStatus;
  children: number;
  earnedIncome: number;
  agi: number;
  investmentIncome?: number;
  /** For no qualifying children: you (or your spouse, if joint) must be 25 to 64. Defaults to true. */
  ageOk?: boolean;
  /** Married filing separately is allowed only under the separated-spouse rules. Defaults to false. */
  separatedSpouse?: boolean;
};

export type EitcResult = {
  credit: number;
  row: EitcRow;
  /** Which stage the income is in. */
  stage: "none" | "phase-in" | "plateau" | "phase-out" | "over";
  start: number;
  end: number;
  /** Why the credit is zero, when it is. */
  blocked: null | "investment" | "age" | "mfs" | "income" | "no-earnings";
  /** Credit change for each extra $1 earned (positive in the phase-in, negative in the phase-out). */
  perDollar: number;
};

/**
 * The 2026 EITC by formula: the smaller of credit% × earned income (capped at
 * the maximum) and the maximum less phase-out% × (the larger of AGI and
 * earned income − the threshold). The IRS table works in $50 steps, so it can
 * differ by a few dollars.
 */
export function eitc(i: EitcInput): EitcResult {
  const k = Math.min(3, Math.max(0, Math.floor(i.children)));
  const row = EITC_2026[k];
  const joint = i.status === "mfj";
  const start = joint ? row.startJoint : row.start;
  const end = joint ? row.endJoint : row.end;
  const earned = Math.max(0, i.earnedIncome);
  const bigger = Math.max(earned, Math.max(0, i.agi));
  const phaseIn = Math.min(row.max, earned * row.rate);
  const phaseOut = Math.max(0, row.max - Math.max(0, bigger - start) * row.phaseRate);
  let credit = Math.round(Math.max(0, Math.min(phaseIn, phaseOut)));
  let blocked: EitcResult["blocked"] = null;
  if (i.status === "mfs" && !i.separatedSpouse) blocked = "mfs";
  else if (Math.max(0, i.investmentIncome ?? 0) > EITC_INVESTMENT_LIMIT) blocked = "investment";
  else if (k === 0 && i.ageOk === false) blocked = "age";
  else if (earned <= 0) blocked = "no-earnings";
  else if (credit <= 0) blocked = "income";
  if (blocked) credit = 0;
  let stage: EitcResult["stage"] = "none";
  if (!blocked) {
    if (bigger >= end) stage = "over";
    else if (bigger > start && phaseOut < phaseIn) stage = "phase-out";
    else if (earned < row.earnedAmount) stage = "phase-in";
    else stage = "plateau";
  } else if (blocked === "income") stage = "over";
  const perDollar = blocked ? 0 : stage === "phase-in" ? row.rate : stage === "phase-out" ? -row.phaseRate : 0;
  return { credit, row, stage, start, end, blocked, perDollar };
}

/** The credit at each earned income from 0 to past the end of the phase-out, for a chart (AGI = earned income). */
export function eitcCurve(status: FilingStatus, children: number, step = 1_000): { income: number; credit: number }[] {
  const k = Math.min(3, Math.max(0, Math.floor(children)));
  const end = status === "mfj" ? EITC_2026[k].endJoint : EITC_2026[k].end;
  const out: { income: number; credit: number }[] = [];
  const s = status === "mfs" ? "single" : status;
  for (let x = 0; x <= end + step; x += step) out.push({ income: x, credit: eitc({ status: s, children: k, earnedIncome: x, agi: x }).credit });
  return out;
}

/* ── Hourly paycheck ──────────────────────────────────────────────── */

export type HourlyInput = Omit<PaycheckInput, "salary"> & {
  rate: number;
  /** Regular (straight-time) hours a week. */
  hours: number;
  /** Overtime hours a week. */
  overtimeHours: number;
  /** Overtime multiplier, usually 1.5. */
  overtimeMultiplier: number;
  /** Paid weeks a year. */
  weeks: number;
};

export type HourlyResult = {
  pay: Paycheck;
  weeklyGross: number;
  regularWeekly: number;
  overtimeWeekly: number;
  annualGross: number;
  /** Hours worked in a year. */
  annualHours: number;
  /** Take-home pay for each hour worked. */
  netPerHour: number;
  /** The overtime premium a year (the half in time and a half) that counts for the overtime deduction. */
  overtimePremium: number;
  /** Federal income tax the overtime deduction saves on the return (withholding does not include it). */
  overtimeTaxSaving: number;
  /** Gross pay in one paycheck. */
  grossPerPaycheck: number;
};

function returnFor(i: HourlyInput, annual: number, premium: number) {
  const s125 = Math.min(Math.max(0, i.section125), annual);
  const k401 = Math.min(annual * Math.max(0, i.k401Pct), US_2026.limits.k401);
  return federalReturn({
    status: i.status,
    wages: annual - s125,
    otherIncome: 0,
    longTermGains: 0,
    selfEmployment: 0,
    preTax: k401,
    adjustments: 0,
    itemized: 0,
    over65: 0,
    blind: 0,
    children: i.children,
    otherDependents: i.otherDependents,
    overtimePremium: premium,
    tips: 0,
    withheld: 0,
  });
}

/** Take-home pay from an hourly rate, regular hours and overtime, on paycheck() from pay.ts. */
export function hourlyPaycheck(i: HourlyInput): HourlyResult {
  const rate = Math.max(0, i.rate);
  const weeks = Math.max(0, Math.min(52, i.weeks));
  const regularWeekly = rate * Math.max(0, i.hours);
  const overtimeWeekly = rate * Math.max(1, i.overtimeMultiplier) * Math.max(0, i.overtimeHours);
  const weeklyGross = regularWeekly + overtimeWeekly;
  const annualGross = weeklyGross * weeks;
  const pay = paycheck({ ...i, salary: annualGross });
  const annualHours = (Math.max(0, i.hours) + Math.max(0, i.overtimeHours)) * weeks;
  // Only the FLSA half-time premium qualifies, and only up to half the regular rate per overtime hour.
  const overtimePremium = rate * 0.5 * Math.max(0, i.overtimeHours) * weeks;
  const withOt = overtimePremium > 0 && i.status !== "mfs" ? returnFor(i, annualGross, overtimePremium).incomeTax : 0;
  const without = overtimePremium > 0 && i.status !== "mfs" ? returnFor(i, annualGross, 0).incomeTax : 0;
  return {
    pay,
    weeklyGross,
    regularWeekly,
    overtimeWeekly,
    annualGross,
    annualHours,
    netPerHour: annualHours > 0 ? pay.net.year / annualHours : 0,
    overtimePremium,
    overtimeTaxSaving: Math.max(0, without - withOt),
    grossPerPaycheck: annualGross / PERIODS[i.frequency],
  };
}

/* ── Raise ────────────────────────────────────────────────────────── */

/** CPI-U, 12 months to August 2026 (BLS, September 11, 2026). */
export const CPI_LATEST = 0.034;

export type RaiseInput = Omit<PaycheckInput, "salary"> & {
  /** Current pay a year. */
  oldPay: number;
  /** "pct": value is a share (0.04 = 4%); "amount": dollars a year. */
  mode: "pct" | "amount";
  value: number;
  /** Inflation over the year of the raise. */
  inflation: number;
};

export type RaiseResult = {
  oldPay: number;
  newPay: number;
  raise: number;
  pct: number;
  before: Paycheck;
  after: Paycheck;
  /** Extra take-home pay a year. */
  netRaise: number;
  /** Share of the raise you keep after tax and 401(k). */
  kept: number;
  /** Tax on each extra dollar (federal, FICA, state, local). */
  taxOnRaise: number;
  /** Real raise after inflation: (1 + raise) ÷ (1 + inflation) − 1. */
  real: number;
  /** New pay in today's dollars. */
  realNewPay: number;
  /** Raise needed just to keep up with inflation, in dollars. */
  keepUp: number;
};

export function raise(i: RaiseInput): RaiseResult {
  const oldPay = Math.max(0, i.oldPay);
  const amount = i.mode === "pct" ? oldPay * i.value : i.value;
  const newPay = Math.max(0, oldPay + amount);
  const raiseAmt = newPay - oldPay;
  const pct = oldPay > 0 ? raiseAmt / oldPay : 0;
  const before = paycheck({ ...i, salary: oldPay });
  const after = paycheck({ ...i, salary: newPay });
  const netRaise = after.net.year - before.net.year;
  const save = after.k401.year + after.roth.year - before.k401.year - before.roth.year;
  const kept = raiseAmt > 0 ? netRaise / raiseAmt : 0;
  const taxOnRaise = raiseAmt > 0 ? (raiseAmt - netRaise - save) / raiseAmt : 0;
  const infl = Math.max(-0.5, i.inflation);
  const real = (1 + pct) / (1 + infl) - 1;
  return {
    oldPay,
    newPay,
    raise: raiseAmt,
    pct,
    before,
    after,
    netRaise,
    kept,
    taxOnRaise,
    real,
    realNewPay: newPay / (1 + infl),
    keepUp: oldPay * infl,
  };
}

export type RaiseYear = { year: number; pay: number; real: number; flat: number };

/** Pay after `years` of the same raise each year, in dollars of the day and today's dollars, against no raise. */
export function raisePath(pay: number, rate: number, inflation: number, years: number): RaiseYear[] {
  const out: RaiseYear[] = [];
  const n = Math.max(0, Math.min(50, Math.floor(years)));
  for (let y = 0; y <= n; y++) {
    const p = Math.max(0, pay) * Math.pow(1 + rate, y);
    out.push({ year: y, pay: p, real: p / Math.pow(1 + inflation, y), flat: Math.max(0, pay) / Math.pow(1 + inflation, y) });
  }
  return out;
}

/** Years for pay to double at a steady yearly raise (null when the raise is zero or less). */
export function yearsToDouble(rate: number): number | null {
  if (!(rate > 0)) return null;
  return Math.log(2) / Math.log(1 + rate);
}

/* ── Employer payroll tax ─────────────────────────────────────────── */

/** FUTA: 6.0% on the first $7,000 a worker, less up to 5.4% credit for state unemployment tax paid on time. */
export const FUTA = { rate: 0.06, maxCredit: 0.054, wageBase: 7_000 } as const;

/** FUTA credit reductions: final for 2025 (paid with the 2025 Form 940), potential for 2026 (final after November 10, 2026). */
export const FUTA_CREDIT_REDUCTION = {
  2025: { CA: 0.012, VI: 0.045 } as Record<string, number>,
  2026: { CA: 0.015 } as Record<string, number>,
};

/**
 * 2026 state unemployment tax (SUTA): taxable wage base and new employer base
 * rate from the Department of Labor's "Significant Provisions of State UI Laws,
 * Effective January 2026". `newRate` null: the state sets a new employer's rate
 * from the industry average. Higher rates can apply by industry; surcharges and
 * employee contributions are not included.
 */
export const SUTA_2026: Record<string, { base: number; newRate: number | null }> = {
  AL: { base: 8_000, newRate: 0.027 },
  AK: { base: 54_200, newRate: 0.01 },
  AZ: { base: 8_000, newRate: 0.02 },
  AR: { base: 7_000, newRate: 0.018 },
  CA: { base: 7_000, newRate: 0.034 },
  CO: { base: 30_600, newRate: 0.0153 },
  CT: { base: 27_000, newRate: 0.019 },
  DE: { base: 14_500, newRate: 0.01 },
  DC: { base: 9_000, newRate: 0.027 },
  FL: { base: 7_000, newRate: 0.027 },
  GA: { base: 9_500, newRate: 0.0264 },
  HI: { base: 64_500, newRate: 0.024 },
  ID: { base: 58_300, newRate: 0.01 },
  IL: { base: 14_250, newRate: 0.028 },
  IN: { base: 9_500, newRate: 0.025 },
  IA: { base: 20_400, newRate: 0.01 },
  KS: { base: 15_100, newRate: 0.0175 },
  KY: { base: 12_000, newRate: 0.027 },
  LA: { base: 7_000, newRate: null },
  ME: { base: 12_000, newRate: 0.0223 },
  MD: { base: 8_500, newRate: 0.026 },
  MA: { base: 15_000, newRate: 0.0242 },
  MI: { base: 9_000, newRate: 0.027 },
  MN: { base: 44_000, newRate: null },
  MS: { base: 14_000, newRate: 0.01 },
  MO: { base: 9_000, newRate: 0.02376 },
  MT: { base: 47_300, newRate: null },
  NE: { base: 9_000, newRate: 0.0125 },
  NV: { base: 43_700, newRate: 0.0295 },
  NH: { base: 14_000, newRate: 0.027 },
  NJ: { base: 44_800, newRate: 0.028 },
  NM: { base: 34_800, newRate: null },
  NY: { base: 17_600, newRate: 0.04025 },
  NC: { base: 34_200, newRate: 0.01 },
  ND: { base: 46_600, newRate: 0.01 },
  OH: { base: 9_000, newRate: 0.027 },
  OK: { base: 25_000, newRate: 0.015 },
  OR: { base: 56_700, newRate: 0.024 },
  PA: { base: 10_000, newRate: 0.03822 },
  RI: { base: 30_800, newRate: 0.01 },
  SC: { base: 14_000, newRate: 0.01 },
  SD: { base: 15_000, newRate: 0.012 },
  TN: { base: 7_000, newRate: 0.027 },
  TX: { base: 9_000, newRate: 0.027 },
  UT: { base: 50_700, newRate: null },
  VT: { base: 15_400, newRate: 0.01 },
  VA: { base: 8_000, newRate: 0.025 },
  WA: { base: 78_200, newRate: null },
  WV: { base: 9_500, newRate: 0.027 },
  WI: { base: 14_000, newRate: 0.025 },
  WY: { base: 33_800, newRate: null },
};

/** Rate used when a state sets new employer rates by industry. */
export const SUTA_FALLBACK_RATE = 0.027;

/** KFF 2025 Employer Health Benefits Survey: average single premium $9,325, workers paid $1,440. */
export const HEALTH_2025 = { singlePremium: 9_325, singleWorker: 1_440, familyPremium: 26_993, familyWorker: 6_850 } as const;

export type EmployerInput = {
  /** Gross wages a year for one employee. */
  wages: number;
  /** Paid hours a week. */
  hours: number;
  /** Paid weeks a year. */
  weeks: number;
  /** State unemployment tax rate and taxable wage base. */
  sutaRate: number;
  sutaBase: number;
  /** FUTA credit reduction for the state (e.g. 0.015). */
  futaReduction: number;
  /** Employer health and other benefit premiums a year. */
  benefits: number;
  /** 401(k) match as a share of wages. */
  matchPct: number;
  /** Workers' compensation as a share of wages. */
  workersCompPct: number;
  /** Other employer payroll taxes (state disability, paid leave, local) as a share of wages. */
  otherPct: number;
  /** Paid days off a year (vacation, holidays, sick), for the cost per hour worked. */
  paidDaysOff: number;
  /** Employer is exempt from FUTA (e.g. a 501(c)(3) charity). */
  futaExempt?: boolean;
};

export type EmployerCost = {
  wages: number;
  socialSecurity: number;
  medicare: number;
  futa: number;
  futaRate: number;
  suta: number;
  workersComp: number;
  other: number;
  match: number;
  benefits: number;
  /** Employer payroll taxes: FICA, FUTA, SUTA and other. */
  taxes: number;
  /** Everything the employer pays: wages, taxes, benefits and insurance. */
  total: number;
  /** Cost on top of wages, as a share of wages. */
  overhead: number;
  paidHours: number;
  workedHours: number;
  perPaidHour: number;
  perWorkedHour: number;
  hourlyWage: number;
};

/** What one employee costs an employer in a year. */
export function employerCost(i: EmployerInput): EmployerCost {
  const wages = Math.max(0, i.wages);
  const socialSecurity = Math.min(wages, US_2026.socialSecurity.wageBase) * US_2026.socialSecurity.rate;
  const medicare = wages * US_2026.medicare.rate;
  const futaRate = i.futaExempt ? 0 : Math.min(FUTA.rate, FUTA.rate - FUTA.maxCredit + Math.max(0, i.futaReduction));
  const futa = Math.min(wages, FUTA.wageBase) * futaRate;
  const suta = Math.min(wages, Math.max(0, i.sutaBase)) * Math.max(0, i.sutaRate);
  const workersComp = wages * Math.max(0, i.workersCompPct);
  const other = wages * Math.max(0, i.otherPct);
  const match = wages * Math.max(0, i.matchPct);
  const benefits = Math.max(0, i.benefits);
  const taxes = socialSecurity + medicare + futa + suta + other;
  const total = wages + taxes + workersComp + match + benefits;
  const paidHours = Math.max(0, i.hours) * Math.max(0, i.weeks);
  const daily = Math.max(0, i.hours) / 5;
  const workedHours = Math.max(0, paidHours - Math.max(0, i.paidDaysOff) * daily);
  return {
    wages,
    socialSecurity,
    medicare,
    futa,
    futaRate,
    suta,
    workersComp,
    other,
    match,
    benefits,
    taxes,
    total,
    overhead: wages > 0 ? (total - wages) / wages : 0,
    paidHours,
    workedHours,
    perPaidHour: paidHours > 0 ? total / paidHours : 0,
    perWorkedHour: workedHours > 0 ? total / workedHours : 0,
    hourlyWage: paidHours > 0 ? wages / paidHours : 0,
  };
}

