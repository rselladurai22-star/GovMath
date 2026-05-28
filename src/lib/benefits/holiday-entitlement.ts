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
