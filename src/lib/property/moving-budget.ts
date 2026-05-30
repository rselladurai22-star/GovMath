/**
 * Moving-house budget estimator (UK).
 *
 * Sums the typical one-off costs of buying & moving:
 *  - Stamp Duty (England/NI) — user enters the figure they got from our SDLT calc
 *  - Legal / conveyancing fees
 *  - Survey (Level 1 basic, Level 2 homebuyer, Level 3 building)
 *  - Mortgage arrangement / valuation fee
 *  - Removals
 *  - EPC (only needed if selling and don’t already have one)
 *  - Estate agent fees (only for sellers, default 1.2% of sale price)
 *  - Misc contingency (10% default)
 */

export type SurveyLevel = "none" | "basic" | "homebuyer" | "full";

export const SURVEY_COSTS: Record<SurveyLevel, number> = {
  none: 0,
  basic: 400,
  homebuyer: 600,
  full: 1000,
};

export type MovingInput = {
  stampDuty: number;
  legalFees: number;
  surveyLevel: SurveyLevel;
  mortgageFee: number;
  removals: number;
  epc: number;
  agentFee: number;
  contingencyPercent: number;
};

export type MovingResult = {
  surveyCost: number;
  contingency: number;
  total: number;
};

export function movingBudget(input: MovingInput): MovingResult {
  const surveyCost = SURVEY_COSTS[input.surveyLevel] ?? 0;
  const subtotal =
    Math.max(0, input.stampDuty) +
    Math.max(0, input.legalFees) +
    surveyCost +
    Math.max(0, input.mortgageFee) +
    Math.max(0, input.removals) +
    Math.max(0, input.epc) +
    Math.max(0, input.agentFee);
  const contingency = subtotal * (Math.max(0, input.contingencyPercent) / 100);
  return { surveyCost, contingency, total: subtotal + contingency };
}
