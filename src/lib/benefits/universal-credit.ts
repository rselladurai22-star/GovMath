/**
 * Universal Credit estimator — 2025/26 monthly rates.
 *
 * Source: gov.uk Universal Credit rates 2025/26 (uprated April 2025).
 * This is a simplified estimator, not an HMRC/DWP entitlement decision.
 */

export const UC_RATES_2025_26 = {
  standardAllowance: {
    singleUnder25: 316.98,
    single25Plus: 400.14,
    coupleBothUnder25: 497.55,
    coupleEither25Plus: 628.10,
  },
  childElement: {
    firstChildPre2017: 339.00,
    perChildPost2017: 292.81,
  },
  workAllowance: {
    withHousing: 411,
    withoutHousing: 684,
  },
  taperRate: 0.55,
  capital: {
    lowerLimit: 6000,
    upperLimit: 16000,
    tariffPer250: 4.35,
  },
} as const;

export type Household = "single-under-25" | "single-25-plus" | "couple-both-under-25" | "couple-either-25-plus";

export type UniversalCreditInput = {
  household: Household;
  /** Total dependent children (under 16, or under 20 in approved education). */
  children: number;
  /** First child born before 6 April 2017 unlocks the higher first-child rate. */
  firstChildPre2017?: boolean;
  /** Monthly rent included as housing element (capped externally to LHA). */
  monthlyRent: number;
  /** Combined net (take-home) monthly earnings. */
  monthlyEarnings: number;
  /** Eligible for a work allowance (responsible for a child OR limited capability for work). */
  hasWorkAllowance: boolean;
  /** Total household savings/capital. */
  capital: number;
};

export type UniversalCreditResult = {
  standardAllowance: number;
  childElement: number;
  housingElement: number;
  maximumAward: number;
  workAllowance: number;
  taperedEarnings: number;
  capitalDeduction: number;
  estimatedAward: number;
  /** True when capital >= £16k — claimant is ineligible. */
  capitalIneligible: boolean;
};

function standardAllowance(h: Household): number {
  const s = UC_RATES_2025_26.standardAllowance;
  switch (h) {
    case "single-under-25":
      return s.singleUnder25;
    case "single-25-plus":
      return s.single25Plus;
    case "couple-both-under-25":
      return s.coupleBothUnder25;
    case "couple-either-25-plus":
      return s.coupleEither25Plus;
  }
}

function childElement(children: number, firstChildPre2017: boolean): number {
  if (children <= 0) return 0;
  const { firstChildPre2017: firstPre, perChildPost2017: per } =
    UC_RATES_2025_26.childElement;
  // Two-child limit applies for third and subsequent children born on/after 6 Apr 2017
  // (with exceptions not modelled). Cap eligible children at 2.
  const eligible = Math.min(children, 2);
  const first = firstChildPre2017 ? firstPre : per;
  const rest = (eligible - 1) * per;
  return first + rest;
}

function capitalDeduction(capital: number): { deduction: number; ineligible: boolean } {
  const { lowerLimit, upperLimit, tariffPer250 } = UC_RATES_2025_26.capital;
  if (capital >= upperLimit) return { deduction: 0, ineligible: true };
  if (capital <= lowerLimit) return { deduction: 0, ineligible: false };
  // £4.35 per £250 (or part thereof) above £6k.
  const steps = Math.ceil((capital - lowerLimit) / 250);
  return { deduction: steps * tariffPer250, ineligible: false };
}

export function universalCredit(input: UniversalCreditInput): UniversalCreditResult {
  const sa = standardAllowance(input.household);
  const ce = childElement(input.children, input.firstChildPre2017 ?? false);
  const he = Math.max(0, input.monthlyRent);
  const max = sa + ce + he;

  const wa = input.hasWorkAllowance
    ? he > 0
      ? UC_RATES_2025_26.workAllowance.withHousing
      : UC_RATES_2025_26.workAllowance.withoutHousing
    : 0;

  const earningsAbove = Math.max(0, input.monthlyEarnings - wa);
  const tapered = earningsAbove * UC_RATES_2025_26.taperRate;

  const cap = capitalDeduction(input.capital);
  if (cap.ineligible) {
    return {
      standardAllowance: sa,
      childElement: ce,
      housingElement: he,
      maximumAward: max,
      workAllowance: wa,
      taperedEarnings: tapered,
      capitalDeduction: 0,
      estimatedAward: 0,
      capitalIneligible: true,
    };
  }

  const award = Math.max(0, max - tapered - cap.deduction);

  return {
    standardAllowance: sa,
    childElement: ce,
    housingElement: he,
    maximumAward: max,
    workAllowance: wa,
    taperedEarnings: tapered,
    capitalDeduction: cap.deduction,
    estimatedAward: award,
    capitalIneligible: false,
  };
}
