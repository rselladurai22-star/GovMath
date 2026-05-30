/**
 * UK Benefit Cap (2025/26 — gov.uk/benefit-cap).
 *
 * Annual caps:
 *   Greater London:
 *     - Single, no children:                £18,837.36
 *     - Couples (with or without children)
 *       OR single parents with children:   £28,116.72
 *   Outside Greater London:
 *     - Single, no children:                £16,395.66
 *     - Couples (with or without children)
 *       OR single parents with children:   £24,496.32
 *
 * (Weekly equivalents are simply ÷ 52.)
 *
 * The cap is applied by reducing Universal Credit (or Housing Benefit, legacy).
 * Many households are exempt — see EXEMPTIONS.
 */

export const EXEMPTIONS: string[] = [
  "You or your partner work and earn at least £846/month after tax",
  "You receive Working Tax Credit (legacy)",
  "You receive PIP, DLA, AA, or Carer&rsquo;s Allowance",
  "You receive Industrial Injuries Benefits or War Pensions",
  "You receive Limited Capability for Work-Related Activity element of UC",
  "You receive Guardian&rsquo;s Allowance",
];

export type Household = "single-no-children" | "family";
export type Location = "london" | "elsewhere";

const ANNUAL_CAP: Record<Location, Record<Household, number>> = {
  london:    { "single-no-children": 18837.36, family: 28116.72 },
  elsewhere: { "single-no-children": 16395.66, family: 24496.32 },
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
