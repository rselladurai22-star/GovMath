/**
 * Statutory redundancy pay (UK, 2025/26).
 *
 * Per gov.uk:
 *  - 0.5 week's pay for each full year of service under age 22
 *  - 1   week's pay for each full year of service aged 22–40
 *  - 1.5 weeks' pay for each full year of service aged 41+
 *  - Max 20 years of service counted
 *  - Weekly pay capped at £719 (Apr 2025)
 *  - Total cap £21,570 (= 20 × 1.5 × £719)
 *  - Statutory redundancy pay is tax-free up to £30k
 */

export const WEEKLY_PAY_CAP_2025 = 719;
export const MAX_YEARS = 20;

export type RedundancyInput = {
  ageAtRedundancy: number;
  yearsOfService: number;
  weeklyPay: number;
};

export type RedundancyResult = {
  weeksDue: number;
  cappedWeeklyPay: number;
  statutoryPayment: number;
  taxFree: number;
  yearsCounted: number;
};

export function statutoryRedundancy(input: RedundancyInput): RedundancyResult {
  const cappedWeeklyPay = Math.min(input.weeklyPay, WEEKLY_PAY_CAP_2025);
  const yearsCounted = Math.min(Math.floor(input.yearsOfService), MAX_YEARS);

  // Walk back from current age, counting each completed year of service
  let weeks = 0;
  for (let y = 0; y < yearsCounted; y++) {
    const ageInThatYear = input.ageAtRedundancy - y - 1; // age at start of that year of service
    if (ageInThatYear < 22) weeks += 0.5;
    else if (ageInThatYear < 41) weeks += 1;
    else weeks += 1.5;
  }

  const statutoryPayment = weeks * cappedWeeklyPay;
  const taxFree = Math.min(statutoryPayment, 30_000);

  return {
    weeksDue: weeks,
    cappedWeeklyPay,
    statutoryPayment,
    taxFree,
    yearsCounted,
  };
}
