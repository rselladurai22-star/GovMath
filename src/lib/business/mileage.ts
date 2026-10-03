/**
 * HMRC Approved Mileage Allowance Payments (AMAP) — 2026/27.
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

/* ── Flagship: a year's claim ─────────────────────────── */

export type MileageRole = "self" | "employee";

export type MileageClaimInput = {
  role: MileageRole;
  vehicle: Vehicle;
  /** Business miles in this claim. */
  miles: number;
  /** Business miles already driven earlier in this tax year (counts towards the 10,000). */
  priorMiles: number;
  /** Miles with a fellow employee as passenger (employees only). */
  passengerMiles: number;
  /** What the employer pays per mile, in pence (employees only). */
  employerPence: number;
  /** Rate of tax relief on the claim: Income Tax (employees) or Income Tax + Class 4 NI (self-employed). */
  reliefRate: number;
};

export type MileageClaim = {
  /** HMRC approved amount for these miles. */
  approved: number;
  atFirstRate: number;
  atSecondRate: number;
  passenger: number;
  /** Employees: what the employer pays. */
  employerPaid: number;
  /** Employees: approved amount above what the employer pays, claimable as Mileage Allowance Relief. */
  reliefClaim: number;
  /** Employees: employer payments above the approved amount, taxable. */
  taxableExcess: number;
  /** Tax (and NI for the self-employed) saved by the claim. */
  taxSaved: number;
  /** Average pence per mile across this claim. */
  averagePence: number;
};

export function mileageClaim(i: MileageClaimInput): MileageClaim {
  const miles = Math.max(0, i.miles);
  const prior = Math.max(0, i.priorMiles);
  let atFirstRate = 0;
  let atSecondRate = 0;
  let approved = 0;
  if (i.vehicle === "car") {
    const room = Math.max(0, MILEAGE_RATES.car.firstThreshold - prior);
    atFirstRate = Math.min(miles, room);
    atSecondRate = miles - atFirstRate;
    approved = atFirstRate * MILEAGE_RATES.car.firstRate + atSecondRate * MILEAGE_RATES.car.secondRate;
  } else {
    atFirstRate = miles;
    approved = miles * (i.vehicle === "motorcycle" ? MILEAGE_RATES.motorcycle.rate : MILEAGE_RATES.bicycle.rate);
  }
  const employee = i.role === "employee";
  // Passenger payments are tax-free if paid, but cannot be claimed as relief if not.
  const passenger = employee && i.vehicle === "car" ? Math.min(Math.max(0, i.passengerMiles), miles) * MILEAGE_RATES.passengerExtra : 0;
  const employerPaid = employee ? (miles * Math.max(0, i.employerPence)) / 100 : 0;
  const reliefClaim = employee ? Math.max(0, approved - employerPaid) : 0;
  const taxableExcess = employee ? Math.max(0, employerPaid - approved - passenger) : 0;
  const deductible = employee ? reliefClaim : approved;
  return {
    approved,
    atFirstRate,
    atSecondRate,
    passenger,
    employerPaid,
    reliefClaim,
    taxableExcess,
    taxSaved: deductible * Math.max(0, i.reliefRate),
    averagePence: miles > 0 ? (approved / miles) * 100 : 0,
  };
}
