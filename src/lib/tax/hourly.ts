/**
 * Converting between hourly pay and a yearly salary.
 *
 * Paid holiday is part of a salaried year, so the default is 52 paid weeks.
 * Use fewer weeks for unpaid time off (for example 47 for a contractor
 * who takes five weeks off unpaid).
 */

export type HourlyInput = {
  /** Basic hours a week. */
  hours: number;
  /** Paid weeks a year. */
  weeks?: number;
  /** Overtime hours a week, paid at `overtimeRate` × the basic rate. */
  overtimeHours?: number;
  overtimeRate?: number;
};

export type PayBreakdown = {
  hourly: number;
  annualBasic: number;
  annualOvertime: number;
  annual: number;
  monthly: number;
  weekly: number;
  /** Hours paid in a year, overtime included. */
  annualHours: number;
};

function weeksOf(i: HourlyInput) {
  return Math.min(52, Math.max(1, i.weeks ?? 52));
}

/** Yearly pay from an hourly rate. */
export function fromHourly(rate: number, i: HourlyInput): PayBreakdown {
  const weeks = weeksOf(i);
  const hours = Math.max(0, i.hours || 0);
  const otHours = Math.max(0, i.overtimeHours || 0);
  const otRate = Math.max(1, i.overtimeRate ?? 1.5);
  const hourly = Math.max(0, rate || 0);
  const annualBasic = hourly * hours * weeks;
  const annualOvertime = hourly * otRate * otHours * weeks;
  const annual = annualBasic + annualOvertime;
  return { hourly, annualBasic, annualOvertime, annual, monthly: annual / 12, weekly: annual / 52, annualHours: (hours + otHours) * weeks };
}

/** Hourly rate from a yearly salary (basic hours only). */
export function fromSalary(salary: number, i: HourlyInput): PayBreakdown {
  const weeks = weeksOf(i);
  const hours = Math.max(0, i.hours || 0);
  const hourly = hours > 0 ? Math.max(0, salary || 0) / (hours * weeks) : 0;
  return fromHourly(hourly, i);
}
