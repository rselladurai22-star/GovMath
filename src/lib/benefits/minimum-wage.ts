/**
 * National Minimum / Living Wage — rates from 1 April 2026.
 * Source: gov.uk National Minimum Wage and National Living Wage rates.
 */

export const NMW_2026 = {
  "national-living-wage": { age: "21 and over", hourly: 12.71 },
  "18-20": { age: "18 to 20", hourly: 10.85 },
  "16-17": { age: "16 to 17", hourly: 8.0 },
  apprentice: { age: "Apprentice (under 19, or in 1st year)", hourly: 8.0 },
} as const;

export type NMWBand = keyof typeof NMW_2026;

export type NMWCheckInput = {
  band: NMWBand;
  hourlyPay: number;
  hoursPerWeek: number;
};

export type NMWCheckResult = {
  band: NMWBand;
  required: number;
  shortfallPerHour: number;
  weeklyShortfall: number;
  annualShortfall: number;
  compliant: boolean;
};

/** Most an employer can count for accommodation, from April 2026. */
export const ACCOMMODATION_OFFSET_DAILY = 11.1;

export type NMWAuditInput = {
  band: NMWBand;
  hourlyPay: number;
  /** Hours you are paid for each week. */
  paidHours: number;
  /** Required work you are not paid for, hours a week (e.g. opening up, training, travel between jobs). */
  unpaidHours?: number;
  /** Deductions or payments for things for the job, such as uniform or tools, £ a week. */
  deductionsPerWeek?: number;
  /** Accommodation provided by the employer. */
  accommodationNights?: number;
  /** What the employer charges for that accommodation, £ a week. */
  accommodationChargePerWeek?: number;
  /** How many weeks this has been going on, for back pay. */
  weeks?: number;
};

export type NMWAuditResult = {
  required: number;
  /** Pay that counts for the minimum wage, a week. */
  countedPay: number;
  hours: number;
  /** Real hourly rate for minimum wage purposes. */
  effectiveRate: number;
  shortfallPerHour: number;
  weeklyShortfall: number;
  owed: number;
  compliant: boolean;
  accommodationReduction: number;
};

/** Full minimum wage check, counting unpaid time, deductions and accommodation. */
export function minimumWageAudit(i: NMWAuditInput): NMWAuditResult {
  const required = NMW_2026[i.band].hourly;
  const hours = Math.max(0, i.paidHours) + Math.max(0, i.unpaidHours ?? 0);
  const offset = Math.min(7, Math.max(0, i.accommodationNights ?? 0)) * ACCOMMODATION_OFFSET_DAILY;
  const accommodationReduction = Math.max(0, (i.accommodationChargePerWeek ?? 0) - offset);
  const countedPay = Math.max(0, i.hourlyPay * Math.max(0, i.paidHours) - Math.max(0, i.deductionsPerWeek ?? 0) - accommodationReduction);
  const effectiveRate = hours > 0 ? countedPay / hours : 0;
  const weeklyShortfall = Math.max(0, required * hours - countedPay);
  return {
    required,
    countedPay,
    hours,
    effectiveRate,
    shortfallPerHour: hours > 0 ? weeklyShortfall / hours : 0,
    weeklyShortfall,
    owed: weeklyShortfall * Math.max(0, i.weeks ?? 0),
    compliant: weeklyShortfall < 0.005,
    accommodationReduction,
  };
}
