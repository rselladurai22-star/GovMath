/**
 * Care Home Means Test — England 2025/26.
 *
 * Source: gov.uk/care-home-financial-help
 *
 * When social services arrange a care home, the local authority means-tests:
 *
 *  - Capital ≥ £23,250:   Full self-funder — pay full fees yourself.
 *  - Capital £14,250–£23,250: Local authority part-funds; you have "tariff income"
 *                              of £1/week per £250 (or part of) above £14,250.
 *  - Capital ≤ £14,250:   Capital ignored; income alone determines your contribution.
 *
 * Weekly contribution = (weekly income + tariff income − Personal Expenses Allowance £30.65)
 * If less than the council’s usual rate, the council pays the gap.
 *
 * Wales and Scotland have higher thresholds; this calculator covers England.
 */

export const UPPER_CAPITAL = 23250;
export const LOWER_CAPITAL = 14250;
export const PEA_WEEKLY = 30.65;
export const TARIFF_BAND = 250;

export type CareMeansInput = {
  capital: number;
  weeklyIncome: number;
  /** Weekly cost of the care home (the council’s usual or your chosen home). */
  weeklyCareCost: number;
};

export type CareMeansResult = {
  selfFunder: boolean;
  tariffIncome: number;
  yourContribution: number;
  councilContribution: number;
  notes: string;
};

export function careHomeMeansTest(input: CareMeansInput): CareMeansResult {
  const capital = Math.max(0, input.capital);
  const income = Math.max(0, input.weeklyIncome);
  const cost = Math.max(0, input.weeklyCareCost);
  if (capital >= UPPER_CAPITAL) {
    return {
      selfFunder: true,
      tariffIncome: 0,
      yourContribution: cost,
      councilContribution: 0,
      notes: "Self-funder: capital is above £23,250 — you pay the full weekly cost.",
    };
  }
  const tariffIncome = capital > LOWER_CAPITAL ? Math.ceil((capital - LOWER_CAPITAL) / TARIFF_BAND) : 0;
  const counted = income + tariffIncome - PEA_WEEKLY;
  const yourContribution = Math.max(0, Math.min(cost, counted));
  const councilContribution = Math.max(0, cost - yourContribution);
  return {
    selfFunder: false,
    tariffIncome,
    yourContribution,
    councilContribution,
    notes: capital <= LOWER_CAPITAL
      ? "Capital below £14,250 — only income is used to calculate your share."
      : "Capital between £14,250 and £23,250 — partial council support with tariff income added.",
  };
}
