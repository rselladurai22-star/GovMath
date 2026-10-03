/**
 * UK Benefit Cap (2026/27 — gov.uk/benefit-cap).
 *
 * Annual caps:
 *   Greater London:
 *     - Single, no children:                £16,967
 *     - Couples (with or without children)
 *       OR single parents with children:   £25,323
 *   Outside Greater London:
 *     - Single, no children:                £14,753
 *     - Couples (with or without children)
 *       OR single parents with children:   £22,020
 *
 * (Weekly equivalents are simply ÷ 52.)
 *
 * The cap is applied by reducing Universal Credit (or Housing Benefit, legacy).
 * Many households are exempt — see EXEMPTIONS.
 */

export const EXEMPTIONS: string[] = [
  "You or your partner work and earn at least £881/month after tax",
  "You receive Working Tax Credit (legacy)",
  "You receive PIP, DLA, AA, or Carer’s Allowance",
  "You receive Industrial Injuries Benefits or War Pensions",
  "You receive Limited Capability for Work-Related Activity element of UC",
  "You receive Guardian’s Allowance",
];

export type Household = "single-no-children" | "family";
export type Location = "london" | "elsewhere";

const ANNUAL_CAP: Record<Location, Record<Household, number>> = {
  london:    { "single-no-children": 16967, family: 25323 },
  elsewhere: { "single-no-children": 14753, family: 22020 },
};

export type BenefitCapInput = {
  household: Household;
  location: Location;
  /** Total weekly benefits before cap. */
  weeklyBenefits: number;
};

export type BenefitCapResult = {
  annualCap: number;
  weeklyCap: number;
  weeklyBenefits: number;
  weeklyReduction: number;
  annualReduction: number;
  capApplies: boolean;
};

export function benefitCap(input: BenefitCapInput): BenefitCapResult {
  const annualCap = ANNUAL_CAP[input.location][input.household];
  const weeklyCap = annualCap / 52;
  const weeklyBenefits = Math.max(0, input.weeklyBenefits);
  const weeklyReduction = Math.max(0, weeklyBenefits - weeklyCap);
  return {
    annualCap,
    weeklyCap,
    weeklyBenefits,
    weeklyReduction,
    annualReduction: weeklyReduction * 52,
    capApplies: weeklyReduction > 0,
  };
}

/** Housing Benefit must be left with at least 50p a week after the cap. */
export const HB_MINIMUM_WEEKLY = 0.5;

export type HousingBenefitCapInput = BenefitCapInput & {
  /** Housing Benefit a week, included in weeklyBenefits. */
  weeklyHousingBenefit: number;
};

export type HousingBenefitCapResult = BenefitCapResult & {
  /** Housing Benefit left after the cap. */
  housingBenefitAfter: number;
  /** Part of the excess that cannot be taken because Housing Benefit runs out. */
  unrecovered: number;
};

/**
 * The legacy route: the cap is taken from Housing Benefit, which cannot fall
 * below 50p a week. Anything above that is not recovered.
 */
export function housingBenefitCap(input: HousingBenefitCapInput): HousingBenefitCapResult {
  const base = benefitCap(input);
  const hb = Math.max(0, Math.min(input.weeklyHousingBenefit, base.weeklyBenefits));
  const maxCut = Math.max(0, hb - HB_MINIMUM_WEEKLY);
  const cut = Math.min(base.weeklyReduction, maxCut);
  return {
    ...base,
    weeklyReduction: cut,
    annualReduction: cut * 52,
    capApplies: cut > 0,
    housingBenefitAfter: hb - cut,
    unrecovered: base.weeklyReduction - cut,
  };
}
