/**
 * Local Housing Allowance: bedroom entitlement and the housing help a private
 * renter can get through Universal Credit or Housing Benefit.
 *
 * Size criteria (gov.uk/housing-benefit/what-youll-get):
 *   one bedroom for each: couple; other person aged 16 or over; two children
 *   of the same sex under 16; two children under 10; any other child;
 *   a non-resident overnight carer; a disabled child who cannot share.
 * Single people under 35 without children get the shared accommodation rate
 * unless an exemption applies. LHA stops at four bedrooms.
 */

import { LHA_ENGLAND_2024 } from "./lha-england";

export type LhaCategory = "shared" | "1" | "2" | "3" | "4";

export type ChildCounts = {
  boysUnder10: number;
  girlsUnder10: number;
  boys10to15: number;
  girls10to15: number;
};

export type BedroomInput = {
  couple: boolean;
  /** Single claimant aged under 35 (ignored for couples). */
  under35: boolean;
  /** Exempt from the shared rate, e.g. care leaver under 25, disability benefit, domestic abuse. */
  sharedExempt: boolean;
  /** Other adults aged 16 or over in the household, such as grown-up children. */
  otherAdults: number;
  children: ChildCounts;
  /** Needs a bedroom for a non-resident overnight carer. */
  overnightCarer: boolean;
  /** Disabled children who cannot share a bedroom. */
  disabledChildrenOwnRoom: number;
};

/**
 * Fewest rooms for children under 16: pairs of same-sex under-16s or any two
 * under-10s. Pair 10 to 15-year-olds by sex first; an odd one out shares with
 * a same-sex under-10 (never worse than leaving them alone); the remaining
 * under-10s pair with anyone.
 */
export function childBedrooms(c: ChildCounts): number {
  const b1 = Math.max(0, Math.floor(c.boys10to15));
  const g1 = Math.max(0, Math.floor(c.girls10to15));
  let bu = Math.max(0, Math.floor(c.boysUnder10));
  let gu = Math.max(0, Math.floor(c.girlsUnder10));
  let rooms = Math.floor(b1 / 2) + Math.floor(g1 / 2);
  let lb = b1 % 2;
  let lg = g1 % 2;
  if (lb && bu > 0) {
    rooms += 1;
    bu -= 1;
    lb = 0;
  }
  if (lg && gu > 0) {
    rooms += 1;
    gu -= 1;
    lg = 0;
  }
  return rooms + lb + lg + Math.ceil((bu + gu) / 2);
}

export type BedroomResult = {
  rooms: number;
  category: LhaCategory;
  sharedRate: boolean;
  /** Rooms needed above the four-bedroom cap. */
  overCap: boolean;
};

export function bedroomEntitlement(i: BedroomInput): BedroomResult {
  const totalChildren = i.children.boysUnder10 + i.children.girlsUnder10 + i.children.boys10to15 + i.children.girls10to15;
  const disabledOwn = Math.min(Math.max(0, i.disabledChildrenOwnRoom), totalChildren);
  const sharedRate = !i.couple && i.under35 && !i.sharedExempt && totalChildren === 0 && i.otherAdults === 0;
  // A disabled child who cannot share takes their own room; the rest are paired as normal.
  const reduced = { ...i.children };
  let toRemove = disabledOwn;
  for (const key of ["boys10to15", "girls10to15", "boysUnder10", "girlsUnder10"] as const) {
    const take = Math.min(reduced[key], toRemove);
    reduced[key] -= take;
    toRemove -= take;
  }
  const rooms = 1 + Math.max(0, Math.floor(i.otherAdults)) + childBedrooms(reduced) + disabledOwn + (i.overnightCarer ? 1 : 0);
  const capped = Math.min(4, rooms);
  return {
    rooms,
    category: sharedRate ? "shared" : (String(capped) as LhaCategory),
    sharedRate,
    overCap: rooms > 4,
  };
}

export const LHA_AREAS = LHA_ENGLAND_2024.map((r) => r[0]);

/** Weekly LHA for an English BRMA and category. */
export function lhaWeekly(area: string, category: LhaCategory): number {
  const row = LHA_ENGLAND_2024.find((r) => r[0] === area);
  if (!row) return 0;
  const idx = { shared: 1, "1": 2, "2": 3, "3": 4, "4": 5 }[category];
  return row[idx] as number;
}

/** Universal Credit uses the monthly equivalent of the weekly rate. */
export const weeklyToMonthly = (w: number) => (w * 52) / 12;

export type LhaHelp = {
  weeklyRate: number;
  monthlyRate: number;
  /** Help towards rent before other deductions. */
  monthlyHelp: number;
  monthlyShortfall: number;
  /** The rate that would apply with one more bedroom (to compare). */
  nextRateMonthly: number;
};

export function lhaHelp(weeklyRate: number, monthlyRent: number, nextWeeklyRate = 0): LhaHelp {
  const monthlyRate = weeklyToMonthly(Math.max(0, weeklyRate));
  const rent = Math.max(0, monthlyRent);
  const monthlyHelp = Math.min(rent, monthlyRate);
  return {
    weeklyRate,
    monthlyRate,
    monthlyHelp,
    monthlyShortfall: Math.max(0, rent - monthlyRate),
    nextRateMonthly: weeklyToMonthly(nextWeeklyRate),
  };
}
