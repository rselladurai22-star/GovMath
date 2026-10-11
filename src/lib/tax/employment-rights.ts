/**
 * Leaving a job: statutory redundancy pay with tax, notice periods and final
 * pay, and holiday pay for irregular-hours and part-year workers (2026/27).
 *
 * Sources (checked October 2026):
 *  - Redundancy pay: gov.uk/redundancy-your-rights/redundancy-pay ("If you were
 *    made redundant on or after 6 April 2026, your weekly pay is capped at £751
 *    and the maximum statutory redundancy pay you can get is £22,530").
 *  - Northern Ireland: Department for the Economy, Employment Rights (Increase
 *    of Limits) Order (NI) 2026: the maximum week's pay rises from £749 to £783
 *    from 6 April 2026 (economy-ni.gov.uk news, March 2026).
 *  - Termination payments: first £30,000 of a termination award free of Income
 *    Tax and employee NI (ITEPA 2003 s403); pay in lieu of notice (post-
 *    employment notice pay) and holiday pay are earnings, taxed with NI; the
 *    employer pays Class 1A NI on an award above £30,000 (from 6 April 2020).
 *  - Notice: Employment Rights Act 1996 s86 (gov.uk/handing-in-your-notice,
 *    Acas "Notice periods"): employee 1 week after 1 month; employer 1 week
 *    from 1 month to 2 years, then 1 week per full year, up to 12 weeks.
 *  - Holiday: GOV.UK "Holiday pay and entitlement reforms from 1 January 2024":
 *    12.07% of hours worked in each pay period, for irregular-hours and
 *    part-year workers in leave years starting on or after 1 April 2024
 *    (Great Britain); rolled-up holiday pay at 12.07% of total pay; holiday pay
 *    averaged over the last 52 paid weeks, looking back up to 104 weeks.
 */

import { computeTakeHome, type TaxRegion } from "./take-home-engine";
import { periodNI } from "./payslip";
import { addDays, countDays, dateDiff, parse, type Nation } from "../life/calendar";
import { EMPLOYER } from "../business/company";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

/** Maximum week's pay for statutory redundancy, from 6 April 2026. */
export const REDUNDANCY_WEEK_CAP = { gb: 751, ni: 783 } as const;
/** The caps that applied from 6 April 2025 to 5 April 2026. */
export const REDUNDANCY_WEEK_CAP_2025 = { gb: 719, ni: 749 } as const;
/** Years of service counted, at most. */
export const MAX_SERVICE_YEARS = 20;
/** Full years of service needed to qualify. */
export const MIN_SERVICE_YEARS = 2;
/** Termination awards free of Income Tax and employee NI. */
export const TAX_FREE_TERMINATION = 30_000;
/** Employer Class 1A NI on a termination award above £30,000. */
export const CLASS_1A_RATE = EMPLOYER.niRate;
/** Statutory notice from an employer is capped at this many weeks. */
export const MAX_STATUTORY_NOTICE_WEEKS = 12;
/** Holiday for irregular-hours and part-year workers: 5.6 / 46.4 weeks. */
export const IRREGULAR_ACCRUAL = 0.1207;
/** Statutory holiday: 5.6 weeks, capped at 28 days. */
export const STATUTORY_WEEKS = 5.6;
export const STATUTORY_DAYS_CAP = 28;
/** Weeks worked in a full year once 5.6 weeks of leave are taken. */
export const WORKING_WEEKS = 52 - STATUTORY_WEEKS;

export type Workplace = "england-wales" | "scotland" | "northern-ireland";

const capFor = (w: Workplace) => (w === "northern-ireland" ? REDUNDANCY_WEEK_CAP.ni : REDUNDANCY_WEEK_CAP.gb);
const regionFor = (w: Workplace): TaxRegion => (w === "scotland" ? "scotland" : "ruk");
const pos = (n: number | undefined) => (Number.isFinite(n) ? Math.max(0, n as number) : 0);

/* ------------------------------------------------------------------ */
/* Redundancy pay                                                      */
/* ------------------------------------------------------------------ */

export type ServiceYear = {
  /** 1 = the most recent full year of service. */
  year: number;
  /** Your age during that year of service. */
  age: number;
  /** Weeks of pay that year earns: 0.5, 1 or 1.5. */
  weeks: number;
  /** Statutory pay for that year at the capped weekly pay. */
  pay: number;
};

/** Weeks for a year of service in which you were this age. */
export function weeksForAge(age: number): number {
  if (age < 22) return 0.5;
  if (age < 41) return 1;
  return 1.5;
}

/**
 * The years that count, most recent first. Service is counted back from the
 * redundancy date, at most 20 full years, and no earlier than age 16.
 */
export function serviceYears(age: number, years: number, weekPay: number): ServiceYear[] {
  const a = Math.floor(pos(age));
  const counted = Math.min(Math.floor(pos(years)), MAX_SERVICE_YEARS, Math.max(0, a - 16));
  const rows: ServiceYear[] = [];
  for (let y = 0; y < counted; y++) {
    const ageThen = a - y - 1;
    const weeks = weeksForAge(ageThen);
    rows.push({ year: y + 1, age: ageThen, weeks, pay: weeks * weekPay });
  }
  return rows;
}

export type RedundancyInput = {
  age: number;
  /** Full years of continuous service. */
  years: number;
  /** Gross weekly pay before tax. */
  weeklyPay: number;
  workplace?: Workplace;
  /** Enhanced scheme: multiple of the statutory weeks (1 = statutory only). */
  multiple?: number;
  /** Enhanced scheme pays on full weekly pay, ignoring the cap. */
  uncapped?: boolean;
  /** Contractual notice in weeks (0 = the statutory minimum). */
  contractNoticeWeeks?: number;
  /** Notice paid in lieu rather than worked. */
  pilon?: boolean;
  /** Untaken holiday owed, in days. */
  holidayDays?: number;
  daysPerWeek?: number;
  /** Other taxable pay already received this tax year. */
  otherPay?: number;
};

export type RedundancyResult = {
  eligible: boolean;
  cap: number;
  cappedWeekPay: number;
  capApplies: boolean;
  yearsCounted: number;
  weeks: number;
  rows: ServiceYear[];
  statutory: number;
  /** The redundancy payment you get: the higher of statutory and enhanced. */
  redundancy: number;
  enhancedExtra: number;
  noticeWeeks: number;
  statutoryNoticeWeeks: number;
  noticePay: number;
  holidayPay: number;
  taxFree: number;
  /** Termination award above £30,000: Income Tax, no employee NI. */
  excess: number;
  /** PILON plus holiday pay: Income Tax and NI. */
  earnings: number;
  incomeTax: number;
  ni: number;
  gross: number;
  net: number;
  employerClass1A: number;
};

/** Statutory minimum notice an employer must give, in weeks. */
export function employerNoticeWeeks(fullYears: number, months = fullYears * 12): number {
  if (months < 1) return 0;
  const y = Math.floor(pos(fullYears));
  if (y < 2) return 1;
  return Math.min(MAX_STATUTORY_NOTICE_WEEKS, y);
}

/** Statutory minimum notice an employee must give, in weeks. */
export function employeeNoticeWeeks(months: number): number {
  return months >= 1 ? 1 : 0;
}

export function redundancyPay(i: RedundancyInput): RedundancyResult {
  const workplace = i.workplace ?? "england-wales";
  const weekly = pos(i.weeklyPay);
  const cap = capFor(workplace);
  const cappedWeekPay = Math.min(weekly, cap);
  const rows = serviceYears(i.age, i.years, cappedWeekPay);
  const yearsCounted = rows.length;
  const eligible = Math.floor(pos(i.years)) >= MIN_SERVICE_YEARS && yearsCounted >= MIN_SERVICE_YEARS;
  const weeks = rows.reduce((s, r) => s + r.weeks, 0);
  const statutory = eligible ? weeks * cappedWeekPay : 0;
  const multiple = Math.max(1, Number.isFinite(i.multiple) ? (i.multiple as number) : 1);
  const enhancedBase = i.uncapped ? weekly : cappedWeekPay;
  const enhanced = eligible ? weeks * enhancedBase * multiple : 0;
  const redundancy = Math.max(statutory, enhanced);

  const statutoryNoticeWeeks = employerNoticeWeeks(i.years);
  const noticeWeeks = Math.max(statutoryNoticeWeeks, pos(i.contractNoticeWeeks));
  const noticePay = i.pilon ? noticeWeeks * weekly : 0;
  const dpw = Math.min(7, Math.max(1, pos(i.daysPerWeek) || 5));
  const holidayPay = pos(i.holidayDays) * (weekly / dpw);

  const taxFree = Math.min(redundancy, TAX_FREE_TERMINATION);
  const excess = redundancy - taxFree;
  const earnings = noticePay + holidayPay;

  const region = regionFor(workplace);
  const other = pos(i.otherPay);
  const base = computeTakeHome({ gross: other, bonus: 0, pensionPct: 0, plan: "none", region });
  const withPay = computeTakeHome({ gross: other + earnings + excess, bonus: 0, pensionPct: 0, plan: "none", region });
  const incomeTax = Math.max(0, withPay.incomeTaxTotal - base.incomeTaxTotal);
  const monthly = (weekly * 52) / 12;
  const ni = periodNI(monthly + earnings, "month") - periodNI(monthly, "month");

  const gross = redundancy + earnings;
  return {
    eligible,
    cap,
    cappedWeekPay,
    capApplies: weekly > cap,
    yearsCounted,
    weeks,
    rows,
    statutory,
    redundancy,
    enhancedExtra: redundancy - statutory,
    noticeWeeks,
    statutoryNoticeWeeks,
    noticePay,
    holidayPay,
    taxFree,
    excess,
    earnings,
    incomeTax,
    ni,
    gross,
    net: gross - incomeTax - ni,
    employerClass1A: excess * CLASS_1A_RATE,
  };
}

/** The most statutory redundancy pay possible (20 years at 1.5 weeks). */
export const maxStatutory = (w: Workplace = "england-wales") => MAX_SERVICE_YEARS * 1.5 * capFor(w);

/* ------------------------------------------------------------------ */
/* Notice period and final pay                                         */
/* ------------------------------------------------------------------ */

export type NoticeInput = {
  /** Who gives notice. */
  giver: "employer" | "employee";
  /** Date the job started (ISO). */
  started: string;
  /** Date notice is given (ISO). */
  noticeGiven: string;
  /** Contractual notice: amount and unit (0 = the statutory minimum). */
  contract: number;
  unit: "weeks" | "months";
  nation?: Nation;
  /** Yearly salary before tax. */
  salary: number;
  daysPerWeek?: number;
  /** Notice paid in lieu: employment ends the day notice is given. */
  pilon?: boolean;
  /** Garden leave: you stop work now but stay employed to the end of notice. */
  gardenLeave?: boolean;
  /** Holiday year start (ISO) and the year's entitlement in days. */
  leaveYearStart: string;
  entitlementDays?: number;
  takenDays?: number;
  /** Other deductions from the final pay (loans, overpayments). */
  deductions?: number;
  /** How the part-month's pay is worked out. */
  dayRate?: "working-days" | "calendar-days";
};

export type NoticeResult = {
  months: number;
  years: number;
  statutoryWeeks: number;
  statutoryEnd: string;
  contractEnd: string;
  /** Which notice applies: the longer of statutory and contractual. */
  source: "statutory" | "contract" | "none";
  noticeEnd: string;
  noticeDays: number;
  /** Your employment ends on this date. */
  employmentEnds: string;
  /** Last day you actually work. */
  lastWorkingDay: string;
  /** First day of the final pay period (calendar month). */
  periodStart: string;
  paidDays: number;
  periodDays: number;
  basicPay: number;
  holidayAccrued: number;
  holidayLeft: number;
  holidayPay: number;
  pilonPay: number;
  deductions: number;
  finalPay: number;
  dayPay: number;
  weekPay: number;
};

/** Add whole calendar months, clamping to the month end (31 Jan + 1 = 28 Feb). */
export function addMonths(iso: string, n: number): string {
  const d = parse(iso);
  const first = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
  const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(d.getUTCDate(), last))).toISOString().slice(0, 10);
}

const isWorkingDay = (iso: string, nation: Nation) => countDays(iso, iso, nation).working === 1;
/** Weekdays, counting bank holidays as paid days for salaried staff. */
const paidWeekdays = (a: string, b: string, nation: Nation) => {
  const c = countDays(a, b, nation);
  return c.working + c.holidays.length;
};
const valid = (iso: string) => /^\d{4}-\d{2}-\d{2}$/.test(iso) && !Number.isNaN(parse(iso).getTime());

export function noticeAndFinalPay(i: NoticeInput): NoticeResult {
  const nation = i.nation ?? "england-and-wales";
  const given = valid(i.noticeGiven) ? i.noticeGiven : "2026-10-30";
  const started = valid(i.started) && i.started <= given ? i.started : given;
  const diff = dateDiff(started, given);
  const months = diff.totalMonths;
  const years = diff.years;
  const statutoryWeeks = i.giver === "employer" ? employerNoticeWeeks(years, months) : employeeNoticeWeeks(months);
  const statutoryEnd = addDays(given, statutoryWeeks * 7);
  const amount = Math.floor(pos(i.contract));
  const contractEnd = amount > 0 ? (i.unit === "months" ? addMonths(given, amount) : addDays(given, amount * 7)) : given;
  const source: NoticeResult["source"] = contractEnd > statutoryEnd ? "contract" : statutoryWeeks > 0 ? "statutory" : "none";
  const noticeEnd = source === "contract" ? contractEnd : statutoryEnd;
  const noticeDays = Math.round((parse(noticeEnd).getTime() - parse(given).getTime()) / 86_400_000);

  const salary = pos(i.salary);
  const dpw = Math.min(7, Math.max(1, pos(i.daysPerWeek) || 5));
  const weekPay = salary / 52;
  const dayPay = weekPay / dpw;

  const employmentEnds = i.pilon ? given : noticeEnd;
  let lastWorkingDay = i.pilon || i.gardenLeave ? given : employmentEnds;
  for (let k = 0; k < 10 && !isWorkingDay(lastWorkingDay, nation); k++) lastWorkingDay = addDays(lastWorkingDay, -1);

  // Final pay period: the calendar month in which employment ends.
  const end = parse(employmentEnds);
  const periodStart = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1)).toISOString().slice(0, 10);
  const monthEnd = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
  const from = started > periodStart ? started : periodStart;
  let paidDays: number;
  let periodDays: number;
  let basicPay: number;
  if (i.dayRate === "calendar-days") {
    paidDays = Math.round((end.getTime() - parse(from).getTime()) / 86_400_000) + 1;
    periodDays = Math.round((parse(monthEnd).getTime() - parse(periodStart).getTime()) / 86_400_000) + 1;
    basicPay = (salary / 12) * (paidDays / periodDays);
  } else {
    paidDays = (paidWeekdays(from, employmentEnds, nation) * dpw) / 5;
    periodDays = (paidWeekdays(periodStart, monthEnd, nation) * dpw) / 5;
    basicPay = periodDays > 0 ? (salary / 12) * (paidDays / periodDays) : 0;
  }

  // Holiday: entitlement × share of the leave year employed, less days taken.
  const ent = Number.isFinite(i.entitlementDays) && (i.entitlementDays as number) > 0 ? (i.entitlementDays as number) : Math.min(STATUTORY_DAYS_CAP, STATUTORY_WEEKS * dpw);
  const ly = valid(i.leaveYearStart) && i.leaveYearStart <= employmentEnds ? i.leaveYearStart : addMonths(employmentEnds, -11);
  const lyStart = ly > employmentEnds ? employmentEnds : ly;
  const lyEnd = addDays(addMonths(lyStart, 12), -1);
  const lyDays = Math.round((parse(lyEnd).getTime() - parse(lyStart).getTime()) / 86_400_000) + 1;
  const empFrom = started > lyStart ? started : lyStart;
  const empDays = Math.max(0, Math.round((end.getTime() - parse(empFrom).getTime()) / 86_400_000) + 1);
  const holidayAccrued = ent * Math.min(1, empDays / lyDays);
  const holidayLeft = holidayAccrued - pos(i.takenDays);
  const holidayPay = holidayLeft * dayPay;

  let pilonPay = 0;
  if (i.pilon) pilonPay = source === "contract" && i.unit === "months" ? (salary / 12) * amount : weekPay * (source === "contract" ? amount : statutoryWeeks);
  const deductions = pos(i.deductions);
  const finalPay = basicPay + holidayPay + pilonPay - deductions;

  return {
    months,
    years,
    statutoryWeeks,
    statutoryEnd,
    contractEnd,
    source,
    noticeEnd,
    noticeDays,
    employmentEnds,
    lastWorkingDay,
    periodStart,
    paidDays,
    periodDays,
    basicPay,
    holidayAccrued,
    holidayLeft,
    holidayPay,
    pilonPay,
    deductions,
    finalPay,
    dayPay,
    weekPay,
  };
}

/* ------------------------------------------------------------------ */
/* Holiday pay for irregular hours                                     */
/* ------------------------------------------------------------------ */

export type IrregularInput = {
  /** Hours worked in this pay period. */
  hours: number;
  /** Total pay for those hours, before tax (all rates, overtime included). */
  pay: number;
  period: "week" | "month";
  /** Weeks a year you actually work (46.4 for all year, fewer for part-year). */
  weeksWorked?: number;
  /** Reference period: total pay and hours over the last 52 paid weeks. */
  refPay?: number;
  refHours?: number;
  refWeeks?: number;
};

export type IrregularResult = {
  /** Holiday hours accrued this period, exact and rounded to the nearest hour. */
  accrued: number;
  accruedRounded: number;
  /** Rolled-up holiday pay for this period. */
  rolledUp: number;
  hourly: number;
  weeklyHours: number;
  /** Over a year at this pattern. */
  yearHours: number;
  yearAccrued: number;
  yearRolledUp: number;
  /** A regular worker's 5.6 weeks at the same weekly hours. */
  regularHours: number;
  /** Average weekly pay and hourly pay from the reference period. */
  avgWeekPay: number;
  avgHourly: number;
  refFromInputs: boolean;
  /** Pay for this period's accrued hours at the average hourly rate. */
  accruedValue: number;
  /** Pay for a year's accrued holiday at the average hourly rate. */
  yearValue: number;
};

/** Holiday hours from hours worked, with GOV.UK's nearest-hour rounding. */
export function accrueHours(hours: number): { exact: number; rounded: number } {
  const exact = pos(hours) * IRREGULAR_ACCRUAL;
  return { exact, rounded: Math.floor(exact + 0.5) };
}

/** Rolled-up holiday pay on a period's total pay, to the penny. */
export function rolledUpPay(pay: number): number {
  return Math.round(pos(pay) * IRREGULAR_ACCRUAL * 100) / 100;
}

export function irregularHoliday(i: IrregularInput): IrregularResult {
  const hours = pos(i.hours);
  const pay = pos(i.pay);
  const weeksInPeriod = i.period === "month" ? 52 / 12 : 1;
  const weeklyHours = hours / weeksInPeriod;
  const weeksWorked = Math.min(WORKING_WEEKS, Number.isFinite(i.weeksWorked) && (i.weeksWorked as number) > 0 ? (i.weeksWorked as number) : WORKING_WEEKS);
  const yearHours = weeklyHours * weeksWorked;
  const hourly = hours > 0 ? pay / hours : 0;
  const { exact, rounded } = accrueHours(hours);

  const refPay = pos(i.refPay);
  const refHours = pos(i.refHours);
  const refWeeks = Math.min(52, Math.max(1, pos(i.refWeeks) || 52));
  const refFromInputs = refPay > 0 && refHours > 0;
  const avgHourly = refFromInputs ? refPay / refHours : hourly;
  const avgWeekPay = refPay > 0 ? refPay / refWeeks : hourly * weeklyHours;

  return {
    accrued: exact,
    accruedRounded: rounded,
    rolledUp: rolledUpPay(pay),
    hourly,
    weeklyHours,
    yearHours,
    yearAccrued: yearHours * IRREGULAR_ACCRUAL,
    yearRolledUp: hourly * yearHours * IRREGULAR_ACCRUAL,
    regularHours: weeklyHours * STATUTORY_WEEKS,
    avgWeekPay,
    avgHourly,
    refFromInputs,
    accruedValue: exact * avgHourly,
    yearValue: yearHours * IRREGULAR_ACCRUAL * avgHourly,
  };
}
