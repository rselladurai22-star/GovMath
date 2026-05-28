/**
 * National Minimum / Living Wage — rates from 1 April 2025.
 * Source: gov.uk minimum wage rates 2025.
 */

export const NMW_2025 = {
  "national-living-wage": { age: "21 and over", hourly: 12.21 },
  "18-20": { age: "18 to 20", hourly: 10.0 },
  "16-17": { age: "16 to 17", hourly: 7.55 },
  apprentice: { age: "Apprentice (under 19, or in 1st year)", hourly: 7.55 },
} as const;

export type NMWBand = keyof typeof NMW_2025;

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
  const required = NMW_2025[input.band].hourly;
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
