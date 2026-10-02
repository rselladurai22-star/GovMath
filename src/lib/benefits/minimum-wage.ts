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

export function checkMinimumWage(input: NMWCheckInput): NMWCheckResult {
  const required = NMW_2026[input.band].hourly;
  const shortfall = Math.max(0, required - input.hourlyPay);
  return {
    band: input.band,
    required,
    shortfallPerHour: shortfall,
    weeklyShortfall: shortfall * input.hoursPerWeek,
    annualShortfall: shortfall * input.hoursPerWeek * 52,
    compliant: shortfall === 0,
  };
}
