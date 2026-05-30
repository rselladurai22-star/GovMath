/**
 * England undergraduate Maintenance Loan — Plan 5 (new students from 2023/24).
 *
 * 2025/26 maximum annual loans (gov.uk):
 *  - Living at home (parental):           £8,877
 *  - Living away (outside London):        £10,544
 *  - Living away (in London):             £13,762
 *  - Studying abroad as part of UK course: £12,070
 *
 * Means-test taper (full-year course):
 *  - No reduction if household income ≤ £25,000.
 *  - For income above £25,000, loan reduces by £1 for every £8.42 of income
 *    until it hits the residual (minimum) loan for that accommodation type:
 *      Home minimum:    £4,915
 *      Away minimum:    £6,853
 *      London minimum:  £8,610
 *      Abroad minimum:  £7,851
 *
 * Loan is paid in 3 termly instalments.
 */

export type AccommodationType = "home" | "away" | "london" | "abroad";

type Band = { max: number; min: number };

const BANDS: Record<AccommodationType, Band> = {
  home:    { max: 8877,  min: 4915 },
  away:    { max: 10544, min: 6853 },
  london:  { max: 13762, min: 8610 },
  abroad:  { max: 12070, min: 7851 },
};

export const TAPER_THRESHOLD = 25000;
export const TAPER_RATE = 8.42; // £1 of loan reduction per £8.42 of household income above threshold

export type MaintenanceLoanInput = {
  householdIncome: number;
  accommodation: AccommodationType;
};

export type MaintenanceLoanResult = {
  accommodation: AccommodationType;
  maxLoan: number;
  minLoan: number;
  loan: number;
  reduction: number;
  perTerm: number;
};

export function maintenanceLoan(input: MaintenanceLoanInput): MaintenanceLoanResult {
  const band = BANDS[input.accommodation];
  const income = Math.max(0, input.householdIncome);
  const reduction = income > TAPER_THRESHOLD ? (income - TAPER_THRESHOLD) / TAPER_RATE : 0;
  const tapered = Math.max(band.min, band.max - reduction);
  const loan = Math.round(tapered);
  return {
    accommodation: input.accommodation,
    maxLoan: band.max,
    minLoan: band.min,
    loan,
    reduction: Math.round(band.max - loan),
    perTerm: Math.round(loan / 3),
  };
}
