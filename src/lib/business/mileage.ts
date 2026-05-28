/**
 * HMRC Approved Mileage Allowance Payments (AMAP) — 2025/26.
 *
 * Cars & vans:    45p first 10,000 business miles, 25p thereafter
 * Motorcycles:    24p flat
 * Bicycles:       20p flat
 * Passenger payment: extra 5p/mile per fellow employee passenger
 *
 * Self-employed claim simplified expenses at these same rates.
 */

export const MILEAGE_RATES = {
  car: { firstThreshold: 10_000, firstRate: 0.45, secondRate: 0.25 },
  motorcycle: { rate: 0.24 },
  bicycle: { rate: 0.2 },
  passengerExtra: 0.05,
} as const;

export type Vehicle = "car" | "motorcycle" | "bicycle";

export type MileageInput = {
  vehicle: Vehicle;
  businessMiles: number;
  passengerMiles?: number;
};

export type MileageResult = {
  vehicle: Vehicle;
  baseAllowance: number;
  passengerAllowance: number;
  total: number;
  firstBandMiles: number;
  secondBandMiles: number;
};

export function mileageAllowance(input: MileageInput): MileageResult {
  const miles = Math.max(0, input.businessMiles);
  const passenger = Math.max(0, input.passengerMiles ?? 0);
  let base = 0;
  let first = 0;
  let second = 0;
  if (input.vehicle === "car") {
    const t = MILEAGE_RATES.car.firstThreshold;
    first = Math.min(miles, t);
    second = Math.max(0, miles - t);
    base = first * MILEAGE_RATES.car.firstRate + second * MILEAGE_RATES.car.secondRate;
  } else if (input.vehicle === "motorcycle") {
    base = miles * MILEAGE_RATES.motorcycle.rate;
    first = miles;
  } else {
    base = miles * MILEAGE_RATES.bicycle.rate;
    first = miles;
  }
  const passengerAllowance = input.vehicle === "car" ? passenger * MILEAGE_RATES.passengerExtra : 0;
  return {
    vehicle: input.vehicle,
    baseAllowance: base,
    passengerAllowance,
    total: base + passengerAllowance,
    firstBandMiles: first,
    secondBandMiles: second,
  };
}
