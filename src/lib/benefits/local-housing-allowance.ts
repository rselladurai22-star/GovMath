/**
 * Local Housing Allowance (LHA) — UK 2025/26.
 *
 * LHA sets the maximum housing element of Universal Credit / Housing Benefit
 * for private tenants. Rates are set by BRMA (Broad Rental Market Area) and
 * frozen at April 2024 levels for 2025/26.
 *
 * Bedroom entitlement rules:
 *   - Shared accommodation rate: single under 35 (some exceptions)
 *   - 1 bed: couple, or single adult 35+, or single with one child sharing
 *   - 1 bed per couple
 *   - 1 bed per adult (non-couple)
 *   - 1 bed per 2 children under 10
 *   - 1 bed per 2 same-sex children 10–15
 *   - 1 bed per single child 16+
 *
 * Sample BRMA rates (April 2024 freeze) — full table at gov.uk/lha-direct.
 */

export type LhaRate = "shared" | "1-bed" | "2-bed" | "3-bed" | "4-bed";
export type LhaArea = "inner-london" | "outer-london" | "core-cities" | "rest-of-uk";

const LHA: Record<LhaArea, Record<LhaRate, number>> = {
  "inner-london":   { shared: 184.93, "1-bed": 365.92, "2-bed": 450.41, "3-bed": 580.18, "4-bed": 793.07 },
  "outer-london":   { shared: 130.07, "1-bed": 247.40, "2-bed": 310.68, "3-bed": 365.92, "4-bed": 471.23 },
  "core-cities":    { shared: 89.34,  "1-bed": 161.97, "2-bed": 195.62, "3-bed": 229.32, "4-bed": 322.19 },
  "rest-of-uk":     { shared: 81.92,  "1-bed": 132.69, "2-bed": 161.50, "3-bed": 195.62, "4-bed": 253.15 },
};

export type Household = {
  adults: number;
  childrenUnder10: number;
  childrenOver10: number;
  singleUnder35: boolean;
};

export function bedroomEntitlement(h: Household): LhaRate {
  if (h.adults === 1 && h.singleUnder35 && h.childrenUnder10 === 0 && h.childrenOver10 === 0) {
    return "shared";
  }
  const adultBeds = h.adults === 2 ? 1 : h.adults; // couple = 1
  const u10Beds = Math.ceil(h.childrenUnder10 / 2);
  const o10Beds = Math.ceil(h.childrenOver10 / 2); // simplification (gendered rule applied generously)
  const total = adultBeds + u10Beds + o10Beds;
  if (total <= 1) return "1-bed";
  if (total === 2) return "2-bed";
  if (total === 3) return "3-bed";
  return "4-bed";
}

export type LhaInput = {
  area: LhaArea;
  household: Household;
  /** Actual contractual rent per week. */
  weeklyRent: number;
};

export type LhaResult = {
  entitlement: LhaRate;
  cap: number;
  weeklyHelp: number;
  shortfall: number;
  monthlyHelp: number;
};

export function lha(input: LhaInput): LhaResult {
  const entitlement = bedroomEntitlement(input.household);
  const cap = LHA[input.area][entitlement];
  const weeklyRent = Math.max(0, input.weeklyRent);
  const weeklyHelp = Math.min(cap, weeklyRent);
  return {
    entitlement,
    cap,
    weeklyHelp,
    shortfall: Math.max(0, weeklyRent - cap),
    monthlyHelp: (weeklyHelp * 52) / 12,
  };
}
