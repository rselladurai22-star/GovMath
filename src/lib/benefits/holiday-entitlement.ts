/**
 * Statutory holiday entitlement — UK Working Time Regulations 1998.
 *
 * Minimum: 5.6 weeks per year, including bank holidays.
 * For a 5-day week: 28 days. Cap at 28 days (Reg 13A).
 * Part-time: pro-rated based on days per week.
 *
 * Irregular-hour / part-year workers (from April 2024):
 *   12.07% accrual on hours worked in pay period.
 */

export const STATUTORY_WEEKS = 5.6;
export const STATUTORY_DAYS_CAP = 28;
export const IRREGULAR_ACCRUAL_PCT = 12.07;

export type HolidayInput = {
  daysPerWeek: number; // 0.5–7
  /** If true, return capped at 28 days (full-time minimum). */
  applyStatutoryCap?: boolean;
};

export type HolidayResult = {
  daysPerWeek: number;
  annualDays: number;
  bankHolidaysIncluded: boolean;
};

export function holidayEntitlement(input: HolidayInput): HolidayResult {
  const dpw = Math.max(0, Math.min(7, input.daysPerWeek));
  let days = dpw * STATUTORY_WEEKS;
  if (input.applyStatutoryCap !== false && days > STATUTORY_DAYS_CAP) {
    days = STATUTORY_DAYS_CAP;
  }
  return {
    daysPerWeek: dpw,
    annualDays: days,
    bankHolidaysIncluded: true,
  };
}

export type IrregularHolidayResult = {
  hoursWorkedInPeriod: number;
  hoursAccrued: number;
};

export function holidayFromIrregularHours(hoursWorkedInPeriod: number): IrregularHolidayResult {
  const hours = Math.max(0, hoursWorkedInPeriod);
  return { hoursWorkedInPeriod: hours, hoursAccrued: hours * (IRREGULAR_ACCRUAL_PCT / 100) };
}

export type HolidayPlanInput = {
  basis: "days" | "hours";
  /** Days worked a week (days basis). */
  daysPerWeek?: number;
  /** Hours worked a week (hours basis). */
  hoursPerWeek?: number;
  /** Your contract's holiday for a full year, in days, if more than statutory (days basis). */
  contractDays?: number;
  /** Months of the holiday year you are employed (1–12). */
  monthsEmployed?: number;
  /** Months of the holiday year worked so far, for holiday accrued in the first year. */
  monthsWorkedSoFar?: number;
  /** Weekly pay, for the value of a day or hour of holiday. */
  weeklyPay?: number;
};

export type HolidayPlanResult = {
  /** Statutory entitlement for a full year, in days or hours. */
  statutory: number;
  /** Your full-year entitlement (statutory or contract, whichever is more). */
  fullYear: number;
  /** Entitlement for the months you are employed. */
  thisYear: number;
  /** Accrued so far (first-year accrual: 1/12 a month). */
  accrued: number;
  unit: "days" | "hours";
  /** Value of one day or hour of holiday. */
  unitPay: number;
  /** Value of this year's entitlement. */
  value: number;
};

export function holidayPlan(i: HolidayPlanInput): HolidayPlanResult {
  const unit = i.basis;
  const statutory =
    unit === "days"
      ? Math.min(STATUTORY_DAYS_CAP, Math.max(0, Math.min(7, i.daysPerWeek ?? 5)) * STATUTORY_WEEKS)
      : Math.max(0, i.hoursPerWeek ?? 37.5) * STATUTORY_WEEKS;
  const fullYear = unit === "days" ? Math.max(statutory, i.contractDays ?? 0) : statutory;
  const months = Math.min(12, Math.max(0, i.monthsEmployed ?? 12));
  const thisYear = (fullYear * months) / 12;
  const accrued = (fullYear * Math.min(months, Math.max(0, i.monthsWorkedSoFar ?? months))) / 12;
  const perWeekUnits = unit === "days" ? Math.max(0.5, i.daysPerWeek ?? 5) : Math.max(0.5, i.hoursPerWeek ?? 37.5);
  const unitPay = Math.max(0, i.weeklyPay ?? 0) / perWeekUnits;
  return { statutory, fullYear, thisYear, accrued, unit, unitPay, value: thisYear * unitPay };
}
