/**
 * Vehicle Excise Duty (Car Tax) — 2026/27 rates (from 1 April 2026).
 *
 * For cars registered on or after 1 April 2017:
 *   Year 1: first-year rate based on CO2 emissions.
 *   Year 2+: standard rate £200/year.
 *   Years 2–6: £440/year supplement if list price > £40,000 ("expensive car").
 *
 * Electric cars pay VED too: £10 first-year, then the £200 standard rate.
 * For zero-emission cars the expensive-car supplement starts above £50,000.
 * Alternative-fuel cars (hybrids) pay the same rates as petrol and diesel.
 *
 * Source: gov.uk Vehicle tax rate tables.
 */

export type FuelType = "petrol-diesel" | "alternative" | "electric";

/** First-year ("showroom") VED bands for petrol/diesel cars (2026/27). */
const FIRST_YEAR_BANDS: Array<{ maxCo2: number; petrolDiesel: number; alternative: number }> = [
  { maxCo2: 0, petrolDiesel: 10, alternative: 10 },
  { maxCo2: 50, petrolDiesel: 115, alternative: 115 },
  { maxCo2: 75, petrolDiesel: 135, alternative: 135 },
  { maxCo2: 90, petrolDiesel: 280, alternative: 280 },
  { maxCo2: 100, petrolDiesel: 365, alternative: 365 },
  { maxCo2: 110, petrolDiesel: 405, alternative: 405 },
  { maxCo2: 130, petrolDiesel: 455, alternative: 455 },
  { maxCo2: 150, petrolDiesel: 560, alternative: 560 },
  { maxCo2: 170, petrolDiesel: 1410, alternative: 1410 },
  { maxCo2: 190, petrolDiesel: 2270, alternative: 2270 },
  { maxCo2: 225, petrolDiesel: 3420, alternative: 3420 },
  { maxCo2: 255, petrolDiesel: 4850, alternative: 4850 },
  { maxCo2: Infinity, petrolDiesel: 5690, alternative: 5690 },
];

export const VED_2026_27 = {
  standardRate: 200,
  expensiveCarSupplement: 440,
  expensiveCarThreshold: 40000,
  /** Zero-emission cars only pay the supplement above £50,000 from April 2026. */
  electricExpensiveCarThreshold: 50000,
  alternativeFuelStandardDiscount: 0, // the £10 discount ended in April 2025
  electricFirstYear: 10,
} as const;

export type VEDInput = {
  co2: number;
  fuel: FuelType;
  listPrice: number;
};

export type VEDResult = {
  firstYearRate: number;
  standardRate: number;
  expensiveCarSupplement: number;
  fiveYearTotal: number; // years 2–6 combined
  totalSixYears: number;
};

export function ved(input: VEDInput): VEDResult {
  let firstYear: number;
  if (input.fuel === "electric") {
    firstYear = VED_2026_27.electricFirstYear;
  } else {
    const band = FIRST_YEAR_BANDS.find((b) => input.co2 <= b.maxCo2)!;
    firstYear = input.fuel === "alternative" ? band.alternative : band.petrolDiesel;
  }

  const standard =
    input.fuel === "alternative"
      ? VED_2026_27.standardRate - VED_2026_27.alternativeFuelStandardDiscount
      : VED_2026_27.standardRate;

  const expensive =
    input.listPrice >
    (input.fuel === "electric"
      ? VED_2026_27.electricExpensiveCarThreshold
      : VED_2026_27.expensiveCarThreshold)
      ? VED_2026_27.expensiveCarSupplement
      : 0;

  // Standard rate + expensive supplement applies for years 2–6 (5 years).
  const fiveYearTotal = (standard + expensive) * 5;
  const totalSixYears = firstYear + fiveYearTotal;

  return {
    firstYearRate: firstYear,
    standardRate: standard,
    expensiveCarSupplement: expensive,
    fiveYearTotal,
    totalSixYears,
  };
}
