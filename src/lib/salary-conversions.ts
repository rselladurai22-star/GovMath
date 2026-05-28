/**
 * Salary conversion helpers — pro-rata work and hourly ↔ annual conversion.
 */

export const UK_DEFAULTS = {
  /** A "standard" full-time week per gov.uk/ACAS guidance. */
  fullTimeHoursPerWeek: 37.5,
  weeksPerYear: 52,
} as const;

export type ProRataInput = {
  fullTimeSalary: number;
  partTimeHoursPerWeek: number;
  fullTimeHoursPerWeek?: number;
};

export type ProRataResult = {
  fraction: number;
  annual: number;
  monthly: number;
  weekly: number;
  daily: number;
};

export function proRataSalary(input: ProRataInput): ProRataResult {
  const fth = input.fullTimeHoursPerWeek ?? UK_DEFAULTS.fullTimeHoursPerWeek;
  if (fth <= 0) {
    return { fraction: 0, annual: 0, monthly: 0, weekly: 0, daily: 0 };
  }
  const fraction = input.partTimeHoursPerWeek / fth;
  const annual = input.fullTimeSalary * fraction;
  return {
    fraction,
    annual,
    monthly: annual / 12,
    weekly: annual / UK_DEFAULTS.weeksPerYear,
    daily: annual / (UK_DEFAULTS.weeksPerYear * 5), // 5-day work week
  };
}

export type HourlyInput = {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear?: number;
};

export type HourlyResult = {
  weekly: number;
  monthly: number;
  annual: number;
};

export function hourlyToSalary(input: HourlyInput): HourlyResult {
  const w = input.weeksPerYear ?? UK_DEFAULTS.weeksPerYear;
  const weekly = input.hourlyRate * input.hoursPerWeek;
  const annual = weekly * w;
  return { weekly, monthly: annual / 12, annual };
}

export type SalaryToHourlyResult = {
  hourly: number;
  weekly: number;
  monthly: number;
};

export function salaryToHourly(
  annualSalary: number,
  hoursPerWeek: number,
  weeksPerYear: number = UK_DEFAULTS.weeksPerYear
): SalaryToHourlyResult {
  if (hoursPerWeek <= 0 || weeksPerYear <= 0) {
    return { hourly: 0, weekly: 0, monthly: 0 };
  }
  const weekly = annualSalary / weeksPerYear;
  const monthly = annualSalary / 12;
  const hourly = weekly / hoursPerWeek;
  return { hourly, weekly, monthly };
}
