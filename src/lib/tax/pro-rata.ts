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
