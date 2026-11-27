/**
 * Pro-rata pay and holiday for part-time and part-year work.
 *
 * Part-time workers must not be treated less favourably than comparable
 * full-time workers, so pay and holiday scale by the share of full-time
 * hours (or days) worked.
 */

export type ProRataInput = {
  fullTimeSalary: number;
  /** Measure the job by hours or by days. */
  basis?: "hours" | "days";
  hours?: number;
  fullTimeHours?: number;
  days?: number;
  fullTimeDays?: number;
  /** Months of the year you are employed (1–12). */
  months?: number;
  /** Full-time holiday in days, including bank holidays. */
  fullTimeHolidayDays?: number;
};

export type ProRataResult = {
  /** Share of a full-time job, 0–1+. */
  fte: number;
  /** Pro-rata salary for a full year. */
  salary: number;
  /** What you earn in the months you work. */
  earnedThisYear: number;
  /** Holiday in full-time-length days, pro-rated for hours and months. */
  holidayDays: number;
  /** The same holiday in hours. */
  holidayHours: number;
  hourly: number;
};

export function proRata(i: ProRataInput): ProRataResult {
  const basis = i.basis ?? "hours";
  const ftHours = Math.max(0.5, i.fullTimeHours ?? 37.5);
  const ftDays = Math.max(1, i.fullTimeDays ?? 5);
  const fte =
    basis === "hours"
      ? Math.max(0, i.hours ?? ftHours) / ftHours
      : Math.max(0, i.days ?? ftDays) / ftDays;
  const months = Math.min(12, Math.max(0, i.months ?? 12));
  const salary = Math.max(0, i.fullTimeSalary || 0) * fte;
  const ftHoliday = Math.max(0, i.fullTimeHolidayDays ?? 33);
  const holidayDays = ftHoliday * fte * (months / 12);
  const yourWeeklyHours = basis === "hours" ? Math.max(0, i.hours ?? ftHours) : ftHours * fte;
  return {
    fte,
    salary,
    earnedThisYear: salary * (months / 12),
    holidayDays,
    holidayHours: holidayDays * (ftHours / ftDays),
    hourly: yourWeeklyHours > 0 ? salary / (yourWeeklyHours * 52) : 0,
  };
}

/* ── Statutory holiday and term-time pay (GOV.UK: Holiday entitlement) ─── */

/** 5.6 weeks' paid holiday a year, capped at 28 days. */
const STATUTORY_WEEKS = 5.6;
const STATUTORY_CAP_DAYS = 28;
/** Part-year and irregular-hours workers accrue 12.07% of hours worked (5.6 ÷ 46.4), from leave years starting 1 April 2024. */
const PART_YEAR_ACCRUAL = 0.1207;

/** The legal minimum holiday in days for a regular week of `daysPerWeek` days. */
export function statutoryHolidayDays(daysPerWeek: number): number {
  return Math.min(STATUTORY_CAP_DAYS, STATUTORY_WEEKS * Math.max(0, daysPerWeek));
}

export type TermTimeResult = {
  /** Weeks worked plus the holiday they earn: the weeks of pay a year. */
  paidWeeks: number;
  /** Holiday earned, in weeks, at the statutory 12.07% (or the contract's own figure). */
  holidayWeeks: number;
  /** Yearly salary for the weeks paid. */
  salary: number;
};

/**
 * Pay for a job worked only some weeks of the year (term-time only): the
 * pro rata salary for the hours, then scaled by the weeks paid. A worker
 * with no paid holiday of their own earns at least 12.07% of the weeks they
 * work as holiday, so 39 working weeks bring about 43.7 paid weeks.
 * `holidayWeeks`, when given, replaces that statutory minimum.
 */
export function termTime(proRataSalary: number, weeksWorked: number, holidayWeeks?: number): TermTimeResult {
  const worked = Math.min(52, Math.max(0, weeksWorked));
  const hol = holidayWeeks !== undefined ? Math.max(0, holidayWeeks) : worked * PART_YEAR_ACCRUAL;
  const paidWeeks = Math.min(52, worked + hol);
  return { paidWeeks, holidayWeeks: paidWeeks - worked, salary: Math.max(0, proRataSalary) * (paidWeeks / 52) };
}
