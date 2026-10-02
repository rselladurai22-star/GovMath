/**
 * England undergraduate Maintenance Loan — Plan 5 (new students from 2023/24).
 *
 * 2026/27 maximum annual loans (gov.uk):
 *  - Living at home (parental):           £9,118
 *  - Living away (outside London):        £10,830
 *  - Living away (in London):             £14,135
 *  - Studying abroad as part of UK course: £12,403
 *
 * Means-test taper (full-year course):
 *  - No reduction if household income ≤ £25,000.
 *  - For income above £25,000, loan reduces by about £1 for every £6.47 of
 *    income until it hits the minimum loan for that accommodation type
 *    (away from home outside London reaches its minimum at £62,410):
 *      Home minimum:    £4,013
 *      Away minimum:    £5,048
 *      London minimum:  £7,039
 *      Abroad minimum:  £5,947
 *
 * Loan is paid in 3 termly instalments.
 */

export type AccommodationType = "home" | "away" | "london" | "abroad";

type Band = { max: number; min: number };

const BANDS: Record<AccommodationType, Band> = {
  home:    { max: 9118,  min: 4013 },
  away:    { max: 10830, min: 5048 },
  london:  { max: 14135, min: 7039 },
  abroad:  { max: 12403, min: 5947 },
};

export const TAPER_THRESHOLD = 25000;
export const TAPER_RATE = 6.47; // £1 of loan reduction per £6.47 of household income above threshold

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
