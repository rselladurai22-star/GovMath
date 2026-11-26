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
