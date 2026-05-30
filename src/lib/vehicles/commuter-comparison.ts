/**
 * Commuter comparison: rail season ticket vs driving.
 *
 * Assumptions:
 *  - Litres-per-gallon conversion uses the UK gallon (4.546 L).
 *  - Driving cost = (round-trip miles × days × weeks) / mpg × litres-per-gallon × pence-per-litre.
 *  - Parking is per working day.
 *  - Wear & tear default: 12p/mile (HMRC AMAP residual after fuel ~ approximate running cost).
 */

export const UK_GALLON_LITRES = 4.546;
export const DEFAULT_WEAR_PENCE_PER_MILE = 12;

export type CommuterInput = {
  /** Annual rail season ticket cost. Pass 0 if comparing pay-as-you-go. */
  annualSeasonTicket: number;
  /** One-way distance to work in miles. */
  oneWayMiles: number;
  /** Real-world fuel economy in miles per UK gallon. */
  mpg: number;
  /** Pump price in pence per litre. */
  pencePerLitre: number;
  /** Daily parking cost at work end. */
  parkingPerDay: number;
  /** Days commuted per week. */
  daysPerWeek: number;
  /** Working weeks per year (52 minus holiday/WFH). */
  weeksPerYear: number;
  /** Optional override of wear-and-tear pence per mile. */
  wearPencePerMile?: number;
};

export type CommuterResult = {
  /** Annual cost of taking the train. */
  railAnnual: number;
  /** Annual fuel cost. */
  fuelAnnual: number;
  /** Annual parking cost. */
  parkingAnnual: number;
  /** Annual wear & tear estimate. */
  wearAnnual: number;
  /** Total annual driving cost. */
  drivingAnnual: number;
  /** railAnnual − drivingAnnual. Positive = rail more expensive. */
  difference: number;
  /** Which option is cheaper. */
  cheaper: "rail" | "drive" | "equal";
};

export function commuterComparison(input: CommuterInput): CommuterResult {
  const days = Math.max(0, Math.min(7, input.daysPerWeek));
  const weeks = Math.max(0, Math.min(53, input.weeksPerYear));
  const annualMiles = input.oneWayMiles * 2 * days * weeks;
  const gallons = input.mpg > 0 ? annualMiles / input.mpg : 0;
  const litres = gallons * UK_GALLON_LITRES;
  const fuelAnnual = (litres * input.pencePerLitre) / 100;
  const parkingAnnual = input.parkingPerDay * days * weeks;
  const wearAnnual = annualMiles * ((input.wearPencePerMile ?? DEFAULT_WEAR_PENCE_PER_MILE) / 100);
  const drivingAnnual = fuelAnnual + parkingAnnual + wearAnnual;
  const railAnnual = Math.max(0, input.annualSeasonTicket);
  const difference = railAnnual - drivingAnnual;
  const cheaper: "rail" | "drive" | "equal" =
    Math.abs(difference) < 1 ? "equal" : difference > 0 ? "drive" : "rail";
  return {
    railAnnual,
    fuelAnnual,
    parkingAnnual,
    wearAnnual,
    drivingAnnual,
    difference,
    cheaper,
  };
}
