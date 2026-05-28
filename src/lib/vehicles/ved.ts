/**
 * Vehicle Excise Duty (Car Tax) — 2025/26 rates.
 *
 * For cars registered on or after 1 April 2017:
 *   Year 1: first-year rate based on CO2 emissions.
 *   Year 2+: standard rate £195/year.
 *   Years 2–6: £425/year supplement if list price > £40,000 ("expensive car").
 *
 * From April 2025, electric cars also pay VED:
 *   New EV registered from 1 Apr 2025: £10 first-year, then £195 standard.
 *   The £425 expensive-car supplement also applies to EVs > £40k from 2025.
 *
 * Source: gov.uk Vehicle tax rate tables 2025/26.
 */

export type FuelType = "petrol-diesel" | "alternative" | "electric";

/** First-year ("showroom") VED bands for petrol/diesel cars (2025/26). */
const FIRST_YEAR_BANDS: Array<{ maxCo2: number; petrolDiesel: number; alternative: number }> = [
  { maxCo2: 0, petrolDiesel: 10, alternative: 10 },
  { maxCo2: 50, petrolDiesel: 110, alternative: 100 },
  { maxCo2: 75, petrolDiesel: 130, alternative: 120 },
  { maxCo2: 90, petrolDiesel: 270, alternative: 260 },
  { maxCo2: 100, petrolDiesel: 350, alternative: 340 },
  { maxCo2: 110, petrolDiesel: 390, alternative: 380 },
  { maxCo2: 130, petrolDiesel: 440, alternative: 430 },
  { maxCo2: 150, petrolDiesel: 540, alternative: 530 },
  { maxCo2: 170, petrolDiesel: 1360, alternative: 1350 },
  { maxCo2: 190, petrolDiesel: 2190, alternative: 2180 },
  { maxCo2: 225, petrolDiesel: 3300, alternative: 3290 },
  { maxCo2: 255, petrolDiesel: 4680, alternative: 4670 },
  { maxCo2: Infinity, petrolDiesel: 5490, alternative: 5480 },
];

export const VED_2025_26 = {
  standardRate: 195,
  expensiveCarSupplement: 425,
  expensiveCarThreshold: 40000,
  alternativeFuelStandardDiscount: 10, // £10 off standard for alternative fuel
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
    firstYear = VED_2025_26.electricFirstYear;
  } else {
    const band = FIRST_YEAR_BANDS.find((b) => input.co2 <= b.maxCo2)!;
    firstYear = input.fuel === "alternative" ? band.alternative : band.petrolDiesel;
  }

  const standard =
    input.fuel === "alternative"
      ? VED_2025_26.standardRate - VED_2025_26.alternativeFuelStandardDiscount
      : VED_2025_26.standardRate;

  const expensive =
    input.listPrice > VED_2025_26.expensiveCarThreshold
      ? VED_2025_26.expensiveCarSupplement
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
