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

import { stampDuty } from "../tax/sdlt-2025";
import { lbtt, ltt } from "../tax/regional-stamp-duty";

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

export type MoveNation = "england" | "scotland" | "wales";
export type MoveBuyer = "first-time" | "standard" | "additional";

export type FullMoveInput = {
  price: number;
  deposit: number;
  nation: MoveNation;
  buyer: MoveBuyer;
  legal: number;
  survey: SurveyLevel;
  mortgageFee: number;
  removals: number;
  /** Selling a home as well? 0 = not selling. */
  salePrice: number;
  /** Estate agent fee, % of the sale price, before VAT. */
  agentPct: number;
  sellingLegal: number;
  /** Mortgage still owed on the home being sold. */
  saleMortgage: number;
  furnishing: number;
  contingencyPct: number;
};

export type FullMoveResult = {
  propertyTax: number;
  taxName: string;
  surveyCost: number;
  agentFee: number;
  buyingCosts: number;
  sellingCosts: number;
  contingency: number;
  /** All one-off costs, excluding the deposit. */
  costs: number;
  /** Cash released by the sale after the mortgage and selling costs. */
  equityReleased: number;
  /** Deposit plus all costs. */
  cashNeeded: number;
  /** Cash needed after using any equity from the sale. */
  shortfall: number;
};

/** Agent fees are usually quoted before VAT at 20%. */
const VAT_RATE = 0.2;

export function fullMovingBudget(input: FullMoveInput): FullMoveResult {
  const price = Math.max(0, input.price);
  const propertyTax =
    input.nation === "scotland"
      ? lbtt(price, input.buyer).total
      : input.nation === "wales"
        ? ltt(price, input.buyer === "additional").total
        : stampDuty(price, input.buyer).total;
  const taxName = input.nation === "scotland" ? "LBTT" : input.nation === "wales" ? "LTT" : "Stamp Duty";
  const surveyCost = SURVEY_COSTS[input.survey] ?? 0;
  const selling = input.salePrice > 0;
  const agentFee = selling ? input.salePrice * (Math.max(0, input.agentPct) / 100) * (1 + VAT_RATE) : 0;
  const buyingCosts = propertyTax + Math.max(0, input.legal) + surveyCost + Math.max(0, input.mortgageFee);
  const sellingCosts = selling ? agentFee + Math.max(0, input.sellingLegal) : 0;
  const moving = Math.max(0, input.removals) + Math.max(0, input.furnishing);
  const subtotal = buyingCosts + sellingCosts + moving;
  const contingency = subtotal * (Math.max(0, input.contingencyPct) / 100);
  const costs = subtotal + contingency;
  const equityReleased = selling ? Math.max(0, input.salePrice - Math.max(0, input.saleMortgage) - sellingCosts) : 0;
  const cashNeeded = Math.max(0, input.deposit) + costs;
  return {
    propertyTax,
    taxName,
    surveyCost,
    agentFee,
    buyingCosts,
    sellingCosts,
    contingency,
    costs,
    // Selling costs are paid from the sale proceeds, so they are already netted off here.
    equityReleased,
    cashNeeded,
    shortfall: Math.max(0, cashNeeded - sellingCosts - equityReleased),
  };
}
