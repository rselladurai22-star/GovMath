/**
 * Lease extension premium for a flat in England and Wales.
 *
 * Current rules (October 2026): the Leasehold Reform, Housing and Urban
 * Development Act 1993, Schedule 13. A statutory extension adds 90 years to the
 * unexpired term at a peppercorn ground rent. The premium is:
 *
 *   the fall in the value of the landlord's interest (diminution)
 *     = capitalised ground rent for the rest of the term
 *     + the landlord's reversion (freehold value deferred to the lease end)
 *     − the landlord's new reversion after the extension
 * + half the marriage value, only when 80 years or fewer are left
 *     marriage value = (extended lease + landlord's new interest)
 *                    − (existing lease + landlord's current interest)
 *
 * The leaseholder also pays the landlord's reasonable legal and valuation costs
 * (section 60 of the 1993 Act).
 *
 * 2024 Act method: the Leasehold and Freehold Reform Act 2024 replaces this with
 * a "standard valuation method": no marriage value, ground rent in the term
 * capped at 0.1% of the freehold vacant possession value, rates prescribed by
 * the government, a 990-year extension and, generally, no liability for the
 * landlord's costs. Not in force: the government consulted on the rates until
 * 21 October 2026 and says fixes to the Act are needed first; the freeholders'
 * challenge is due at the Court of Appeal. Source: GOV.UK, "Leasehold
 * enfranchisement valuation rates" consultation (updated 7 September 2026).
 */

/** Years added by a statutory lease extension under the 1993 Act (s.56). */
export const EXTENSION_YEARS_1993 = 90;
/** Extension term under the 2024 Act once in force. */
export const EXTENSION_YEARS_2024 = 990;
/** Marriage value is ignored when more than 80 years are left (1993 Act, Sch. 13 para 4(2A)). */
export const MARRIAGE_VALUE_YEARS = 80;
/** Landlord's share of marriage value (1993 Act, Sch. 13 para 4(2)). */
export const MARRIAGE_VALUE_SHARE = 0.5;
/** Deferment rate for flats from Earl Cadogan v Sportelli (Lands Tribunal 2006, Court of Appeal 2007). */
export const SPORTELLI_FLATS = 0.05;
/** Deferment rate for houses from the same case. */
export const SPORTELLI_HOUSES = 0.0475;
/** Capitalisation rate default. GOV.UK consultation (2026): tribunal decisions used 4.5% to 9%, most 6% to 7%. */
export const CAPITALISATION_DEFAULT = 0.065;
/** 2024 Act: ground rent counted in the term is capped at 0.1% of the freehold vacant possession value. */
export const LFRA_RENT_CAP = 0.001;
/** Usual allowance between a long lease (say 999 years) and the freehold vacant possession value. */
export const FREEHOLD_UPLIFT_DEFAULT = 0.01;

/**
 * Savills 2016 "unenfranchiseable" relativity (value of a lease without Act
 * rights as a share of the freehold value), whole years 11 to 80.
 * Source: Savills Research, "Spotlight: Leasehold Enfranchisement, Analysis of
 * Relativity", May 2016, built on the Savills 2015 graph considered by the
 * Upper Tribunal in Sloane Stanley Estate v Mundy [2016] UKUT 223 (LC).
 */
const UNENF: Record<number, number> = {
  11: 26.1, 12: 27.7, 13: 29.2, 14: 30.7, 15: 32.2, 16: 33.6, 17: 35.1, 18: 36.5, 19: 37.8, 20: 39.2,
  21: 40.5, 22: 41.8, 23: 43.1, 24: 44.4, 25: 45.6, 26: 46.8, 27: 48.0, 28: 49.2, 29: 50.3, 30: 51.5,
  31: 52.9, 32: 54.0, 33: 55.1, 34: 56.1, 35: 57.2, 36: 58.2, 37: 59.2, 38: 60.2, 39: 61.1, 40: 62.1,
  41: 63.1, 42: 64.0, 43: 64.9, 44: 65.8, 45: 66.7, 46: 67.5, 47: 68.4, 48: 69.2, 49: 70.1, 50: 70.9,
  51: 71.7, 52: 72.5, 53: 73.2, 54: 74.0, 55: 74.7, 56: 75.5, 57: 76.2, 58: 76.9, 59: 77.6, 60: 78.3,
  61: 79.0, 62: 79.6, 63: 80.3, 64: 80.9, 65: 81.5, 66: 82.1, 67: 82.7, 68: 83.3, 69: 83.9, 70: 84.4,
  71: 85.0, 72: 85.5, 73: 86.1, 74: 86.6, 75: 87.1, 76: 87.6, 77: 88.0, 78: 88.5, 79: 88.9, 80: 89.4,
};

/** Savills 2015 enfranchiseable curve: 0.106 + 0.894 × (1 − 0.972^x). Same source. */
function enfranchiseable(years: number): number {
  return 0.106 + (1 - 0.106) * (1 - Math.pow(0.972, years));
}

/**
 * Default relativity for a lease with `years` left, as a share of the freehold
 * value (0–1). 11 to 80 years: the unenfranchiseable table, interpolated.
 * Under 11 years: the enfranchiseable curve scaled to meet the table at 11.
 * Over 80 years: the enfranchiseable curve (marriage value is ignored there,
 * so relativity only converts between values), never above the long-lease level.
 */
export function defaultRelativity(years: number, uplift = FREEHOLD_UPLIFT_DEFAULT): number {
  const y = Math.max(0, years);
  if (y <= 0) return 0;
  if (y < 11) return enfranchiseable(y) * (UNENF[11] / 100 / enfranchiseable(11));
  if (y <= 80) {
    const lo = Math.floor(y);
    const hi = Math.min(80, lo + 1);
    const a = UNENF[lo] / 100;
    const b = UNENF[hi] / 100;
    return a + (b - a) * (y - lo);
  }
  return Math.min(1 - uplift, Math.max(UNENF[80] / 100, enfranchiseable(y)));
}

/** Present value of £1 a year for n years at rate r (years purchase). */
export function yearsPurchase(n: number, r: number): number {
  if (n <= 0) return 0;
  if (r <= 0) return n;
  return (1 - Math.pow(1 + r, -n)) / r;
}

/** Present value of £1 receivable in n years at rate r. */
export function deferFactor(n: number, r: number): number {
  return Math.pow(1 + Math.max(0, r), -Math.max(0, n));
}

export type LeaseInput = {
  /** Flat value, £. */
  value: number;
  /** What `value` is: with a long (extended) lease, or as it is with the current lease. */
  basis: "long" | "current";
  /** Years left on the lease. */
  years: number;
  /** Current ground rent, £ a year. */
  groundRent: number;
  /** Deferment rate, 0–1. */
  deferment: number;
  /** Capitalisation rate, 0–1. */
  capitalisation: number;
  /** Relativity override, 0–1. 0 or missing uses `defaultRelativity`. */
  relativity?: number;
  /** Freehold value above the long-lease value, 0–1. */
  uplift?: number;
  /** Your solicitor, £. */
  ownLegal?: number;
  /** Your valuer, £. */
  ownValuer?: number;
  /** Landlord's legal and valuation costs you pay under current rules, £. */
  landlordCosts?: number;
};

export type LeaseValuation = {
  freeholdValue: number;
  extendedValue: number;
  existingValue: number;
  relativity: number;
  term: number;
  reversion: number;
  newReversion: number;
  diminution: number;
  marriageValue: number;
  marriageShare: number;
  premium: number;
  costs: number;
  total: number;
};

export type LeaseResult = {
  current: LeaseValuation;
  /** The 2024 Act method, not yet in force. */
  act2024: LeaseValuation & { cappedRent: number };
  /** Premium with 80 years 0 months left vs just over (1993 Act). */
  marriageApplies: boolean;
  /** Years until the lease reaches 80, or 0 if already there. */
  yearsTo80: number;
};

const finite = (n: number, d = 0) => (Number.isFinite(n) ? n : d);

/** Values shared by both methods. */
function values(i: LeaseInput) {
  const uplift = Math.min(0.2, Math.max(0, i.uplift ?? FREEHOLD_UPLIFT_DEFAULT));
  const years = Math.max(0, finite(i.years));
  const rel = i.relativity && i.relativity > 0 ? Math.min(1 - uplift, i.relativity) : defaultRelativity(years, uplift);
  const value = Math.max(0, finite(i.value));
  let freeholdValue: number;
  if (i.basis === "current") freeholdValue = rel > 0 ? value / rel : 0;
  else freeholdValue = value / (1 - uplift);
  return { uplift, years, rel, freeholdValue, extendedValue: freeholdValue * (1 - uplift), existingValue: rel * freeholdValue };
}

export function leaseExtension(i: LeaseInput): LeaseResult {
  const v = values(i);
  const d = Math.max(0.001, finite(i.deferment, SPORTELLI_FLATS));
  const c = Math.max(0.001, finite(i.capitalisation, CAPITALISATION_DEFAULT));
  const rent = Math.max(0, finite(i.groundRent));
  const ownCosts = Math.max(0, i.ownLegal ?? 0) + Math.max(0, i.ownValuer ?? 0);
  const llCosts = Math.max(0, i.landlordCosts ?? 0);

  // 1993 Act.
  const term = rent * yearsPurchase(v.years, c);
  const reversion = v.freeholdValue * deferFactor(v.years, d);
  const newReversion = v.freeholdValue * deferFactor(v.years + EXTENSION_YEARS_1993, d);
  const diminution = Math.max(0, term + reversion - newReversion);
  const marriageApplies = v.years <= MARRIAGE_VALUE_YEARS;
  const marriageValue = marriageApplies
    ? Math.max(0, v.extendedValue + newReversion - (v.existingValue + term + reversion))
    : 0;
  const marriageShare = marriageValue * MARRIAGE_VALUE_SHARE;
  const premium = diminution + marriageShare;
  const costs = ownCosts + llCosts;

  // 2024 Act standard valuation method (not in force).
  const cappedRent = Math.min(rent, LFRA_RENT_CAP * v.freeholdValue);
  const term24 = cappedRent * yearsPurchase(v.years, c);
  const newRev24 = v.freeholdValue * deferFactor(v.years + EXTENSION_YEARS_2024, d);
  const dim24 = Math.max(0, term24 + reversion - newRev24);

  const base = { freeholdValue: v.freeholdValue, extendedValue: v.extendedValue, existingValue: v.existingValue, relativity: v.rel };
  return {
    current: { ...base, term, reversion, newReversion, diminution, marriageValue, marriageShare, premium, costs, total: premium + costs },
    act2024: {
      ...base,
      cappedRent,
      term: term24,
      reversion,
      newReversion: newRev24,
      diminution: dim24,
      marriageValue: 0,
      marriageShare: 0,
      premium: dim24,
      costs: ownCosts,
      total: dim24 + ownCosts,
    },
    marriageApplies,
    yearsTo80: Math.max(0, v.years - MARRIAGE_VALUE_YEARS),
  };
}

/**
 * Premium at each number of years left, holding the freehold value fixed:
 * how the cost grows as the lease runs down. Returns from `from` down to `to`.
 * The freehold value is worked out once, at the lease's real length, so the
 * curve shows the effect of time alone.
 */
export function premiumCurve(i: LeaseInput, from = 99, to = 20): { years: number; current: number; act2024: number }[] {
  const fixed = values(i);
  const base: LeaseInput = { ...i, basis: "long", value: fixed.extendedValue, relativity: 0 };
  const out: { years: number; current: number; act2024: number }[] = [];
  for (let y = Math.round(from); y >= Math.round(to); y--) {
    const r = leaseExtension({ ...base, years: y });
    out.push({ years: y, current: r.current.premium, act2024: r.act2024.premium });
  }
  return out;
}
