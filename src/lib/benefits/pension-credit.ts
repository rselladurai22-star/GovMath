/**
 * Pension Credit — Guarantee Credit element (UK 2025/26).
 *
 * Source: gov.uk/pension-credit
 *
 * Guarantee Credit tops up weekly income to:
 *   - Single:  £227.10/week
 *   - Couple:  £346.60/week (both over State Pension Age)
 *
 * Above the guarantee, "Savings Credit" gives a small reward to those who saved,
 * but is closed to people who reached SPA after 6 Apr 2016. We focus on Guarantee Credit.
 *
 * Capital under £10,000 is ignored.
 * Capital over £10,000: counts as £1/week of "tariff income" per £500 (or part of £500).
 */

export const SINGLE_GUARANTEE = 227.10;
export const COUPLE_GUARANTEE = 346.60;
export const CAPITAL_FLOOR = 10_000;

export type PensionCreditInput = {
  household: "single" | "couple";
  weeklyIncome: number;
  capital: number;
};

export type PensionCreditResult = {
  threshold: number;
  tariffIncome: number;
  totalIncome: number;
  weeklyAward: number;
  annualAward: number;
};

export function pensionCredit(input: PensionCreditInput): PensionCreditResult {
  const threshold = input.household === "single" ? SINGLE_GUARANTEE : COUPLE_GUARANTEE;
  const capital = Math.max(0, input.capital);
  const tariffIncome =
    capital > CAPITAL_FLOOR
      ? Math.ceil((capital - CAPITAL_FLOOR) / 500)
      : 0;
  const totalIncome = Math.max(0, input.weeklyIncome) + tariffIncome;
  const weeklyAward = Math.max(0, threshold - totalIncome);
  return {
    threshold,
    tariffIncome,
    totalIncome,
    weeklyAward,
    annualAward: weeklyAward * 52,
  };
}
