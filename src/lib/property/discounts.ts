/**
 * Single Person Council Tax Discount: 25% off the bill.
 */

const SPD_RATE = 0.25;

export type SPDResult = {
  fullBill: number;
  discount: number;
  payable: number;
  monthlySaving: number;
};

export function singlePersonDiscount(annualBill: number): SPDResult {
  const b = Math.max(0, annualBill);
  const discount = b * SPD_RATE;
  return {
    fullBill: b,
    discount,
    payable: b - discount,
    monthlySaving: discount / 12,
  };
}

export type SpdPeriodInput = {
  annualBill: number;
  /** Days in the year you lived alone (or with only disregarded adults). */
  daysAlone: number;
  daysInYear?: number;
};

/** Single person discount for part of a year, worked out by day. */
export function singlePersonDiscountForDays(input: SpdPeriodInput) {
  const days = input.daysInYear ?? 365;
  const d = Math.min(days, Math.max(0, input.daysAlone));
  const full = singlePersonDiscount(input.annualBill);
  const discount = full.discount * (d / days);
  return { ...full, days: d, discount, payable: full.fullBill - discount };
}

/* ── Who counts: disregards, discounts and exemptions ─────────────────── */

/**
 * How an adult (18 or over) who lives in the home is treated for council tax.
 * "counts" is an ordinary adult. The rest are disregarded (Local Government
 * Finance Act 1992, Schedule 1; GOV.UK "Who has to pay"):
 * - student: a full-time student, or 18 or 19 and in full-time education
 * - smi: severely mentally impaired (a doctor's certificate and a qualifying benefit)
 * - carer: a live-in carer for someone who is not their partner or child under 18
 * - apprentice: an apprentice or trainee on no more than £195 a week, or under 25 and funded by the ESFA
 * - other: another disregarded group (student nurse, foreign language assistant, diplomat and others)
 * Children under 18 are not counted at all, so they are never listed.
 */
export type Occupant = "counts" | "student" | "smi" | "carer" | "apprentice" | "other";

export type HouseholdDiscount = {
  /** Share of the bill taken off: 0, 0.25, 0.5 or 1 (exempt). */
  rate: number;
  /** Adults who count. */
  counted: number;
  status: "none" | "single" | "all-disregarded" | "exempt";
  /** Why the home is exempt: everyone a student (Class N), or SMI with only SMI or students (Class U). */
  exemption: "students" | "smi" | null;
};

/**
 * The discount or exemption for the adults who live in a home.
 * GOV.UK: 25% if one adult counts; 50% if everyone is disregarded; no bill
 * when everyone is a full-time student; a 100% discount when the severely
 * mentally impaired live alone or only with other SMI adults or full-time students.
 */
export function householdDiscount(people: Occupant[]): HouseholdDiscount {
  const counted = people.filter((p) => p === "counts").length;
  if (people.length > 0 && people.every((p) => p === "student")) return { rate: 1, counted: 0, status: "exempt", exemption: "students" };
  if (people.some((p) => p === "smi") && people.every((p) => p === "smi" || p === "student")) return { rate: 1, counted: 0, status: "exempt", exemption: "smi" };
  if (counted === 0) return { rate: 0.5, counted, status: "all-disregarded", exemption: null };
  if (counted === 1) return { rate: 0.25, counted, status: "single", exemption: null };
  return { rate: 0, counted, status: "none", exemption: null };
}

export type HouseholdBill = HouseholdDiscount & {
  fullBill: number;
  /** Discount for the days entered (pro-rated by day). */
  discount: number;
  payable: number;
  days: number;
  /** The discount over a whole year at this rate. */
  fullYearDiscount: number;
  instalment: number;
};

/** The year's bill for a household, with the discount for `days` of the year (365 by default). */
export function householdBill(input: { annualBill: number; people: Occupant[]; days?: number; instalments?: number }): HouseholdBill {
  const h = householdDiscount(input.people);
  const fullBill = Math.max(0, input.annualBill);
  const days = Math.min(365, Math.max(0, Math.round(input.days ?? 365)));
  const fullYearDiscount = fullBill * h.rate;
  const discount = fullYearDiscount * (days / 365);
  const payable = fullBill - discount;
  const n = input.instalments === 12 ? 12 : 10;
  return { ...h, fullBill, discount, payable, days, fullYearDiscount, instalment: payable / n };
}
