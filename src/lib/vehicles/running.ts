/**
 * Running costs: journey fuel cost, mileage allowance payments, petrol versus
 * electric over several years, and the cost of commuting by car, train, bus and
 * bike.
 *
 * Prices are defaults the user can change: RAC/Fuel Finder averages for late
 * September 2026 and the Ofgem price cap for October to December 2026.
 */

export const UK_GALLON = 4.54609;

export const PRICES_2026 = {
  /** Pence per litre, UK average, week ending 27 September 2026. */
  petrol: 173.8,
  diesel: 198.9,
  /** Ofgem price cap electricity unit rate, 1 October to 31 December 2026, pence per kWh. */
  homeElectric: 26.32,
  /** A typical overnight EV tariff, pence per kWh (example). */
  offPeak: 8,
  /** A typical public rapid charger, pence per kWh (example). */
  publicRapid: 75,
  /** National bus fare cap in England outside London until 31 December 2026, then £2. */
  busCap: 3,
  busCap2027: 2,
} as const;

/** HMRC approved mileage allowance payments, pence per business mile. */
export const AMAP = { carFirst: 45, carAfter: 25, threshold: 10_000, passenger: 5, motorcycle: 24, bicycle: 20 } as const;

/** HMRC advisory fuel rates from 1 September 2026, pence per mile. */
export const AFR_SEPT_2026 = {
  petrol: [
    ["1,400cc or less", 14],
    ["1,401cc to 2,000cc", 17],
    ["Over 2,000cc", 27],
  ],
  diesel: [
    ["1,600cc or less", 15],
    ["1,601cc to 2,000cc", 16],
    ["Over 2,000cc", 22],
  ],
  electricHome: 7,
  electricPublic: 15,
} as const;

/* ── Journey cost ───────────────────────────────────────────────── */

export type Efficiency = { kind: "mpg"; value: number } | { kind: "l100"; value: number } | { kind: "mikwh"; value: number };

/** Cost in pounds of driving `miles` given efficiency and a price in pence per litre or per kWh. */
export function driveCost(miles: number, eff: Efficiency, pricePence: number): { cost: number; units: number; perMile: number } {
  const m = Math.max(0, miles);
  let units = 0;
  if (eff.kind === "mpg") units = eff.value > 0 ? (m / eff.value) * UK_GALLON : 0;
  else if (eff.kind === "l100") units = (m * 1.609344 * Math.max(0, eff.value)) / 100;
  else units = eff.value > 0 ? m / eff.value : 0;
  const cost = (units * Math.max(0, pricePence)) / 100;
  return { cost, units, perMile: m > 0 ? cost / m : 0 };
}

export const mpgToL100 = (mpg: number) => (mpg > 0 ? (100 * UK_GALLON) / (mpg * 1.609344) : 0);

export type JourneyInput = { miles: number; returnTrip: boolean; eff: Efficiency; price: number; people: number; tolls: number; parking: number };

export type JourneyResult = { miles: number; fuel: number; units: number; total: number; perPerson: number; perMile: number; claim: number };

export function journeyCost(i: JourneyInput): JourneyResult {
  const miles = Math.max(0, i.miles) * (i.returnTrip ? 2 : 1);
  const d = driveCost(miles, i.eff, i.price);
  const total = d.cost + Math.max(0, i.tolls) + Math.max(0, i.parking);
  return { miles, fuel: d.cost, units: d.units, total, perPerson: total / Math.max(1, Math.round(i.people)), perMile: d.perMile, claim: (miles * AMAP.carFirst) / 100 };
}

/** Tax-free mileage allowance for business miles in a tax year. */
export function mileageAllowance(businessMiles: number, alreadyThisYear = 0, passengers = 0): number {
  const before = Math.max(0, alreadyThisYear);
  const m = Math.max(0, businessMiles);
  const first = Math.max(0, Math.min(m, AMAP.threshold - before));
  const after = m - first;
  return (first * AMAP.carFirst + after * AMAP.carAfter + m * Math.max(0, passengers) * AMAP.passenger) / 100;
}

/* ── Petrol versus electric ─────────────────────────────────────── */

export type PetrolEvInput = {
  milesPerYear: number;
  years: number;
  /** Petrol car. */
  mpg: number;
  fuelPrice: number;
  petrolServicing: number;
  petrolTax: number;
  petrolInsurance: number;
  petrolPrice: number;
  /** Electric car. */
  miPerKwh: number;
  homePrice: number;
  publicPrice: number;
  /** Share of charging at public chargers (0–1). */
  publicShare: number;
  evServicing: number;
  evTax: number;
  evInsurance: number;
  evPrice: number;
  /** Include the 3p a mile charge from April 2028 (counted from year 3). */
  eved: boolean;
  /** Value left at the end as a share of the price. */
  petrolResidual: number;
  evResidual: number;
};

export type PetrolEvYear = { year: number; petrol: number; ev: number; petrolTotal: number; evTotal: number };

export type PetrolEvResult = {
  petrolRunning: number;
  evRunning: number;
  petrolEnergy: number;
  evEnergy: number;
  evPerKwh: number;
  path: PetrolEvYear[];
  petrolTotal: number;
  evTotal: number;
  /** First year in which the EV's total cost is lower, or null. */
  breakEven: number | null;
  petrolPerMile: number;
  evPerMile: number;
};

export function petrolVsEv(i: PetrolEvInput): PetrolEvResult {
  const miles = Math.max(0, i.milesPerYear);
  const years = Math.max(1, Math.min(15, Math.round(i.years)));
  const share = Math.max(0, Math.min(1, i.publicShare));
  const evPerKwh = i.homePrice * (1 - share) + i.publicPrice * share;
  const petrolEnergy = driveCost(miles, { kind: "mpg", value: i.mpg }, i.fuelPrice).cost;
  const evEnergy = driveCost(miles, { kind: "mikwh", value: i.miPerKwh }, evPerKwh).cost;
  const petrolRunning = petrolEnergy + i.petrolServicing + i.petrolTax + i.petrolInsurance;
  const evRunningBase = evEnergy + i.evServicing + i.evTax + i.evInsurance;
  const path: PetrolEvYear[] = [{ year: 0, petrol: 0, ev: 0, petrolTotal: Math.max(0, i.petrolPrice), evTotal: Math.max(0, i.evPrice) }];
  let pt = Math.max(0, i.petrolPrice);
  let et = Math.max(0, i.evPrice);
  let breakEven: number | null = et <= pt ? 0 : null;
  for (let y = 1; y <= years; y++) {
    const ev = evRunningBase + (i.eved && y >= 3 ? miles * 0.03 : 0);
    pt += petrolRunning;
    et += ev;
    path.push({ year: y, petrol: petrolRunning, ev, petrolTotal: pt, evTotal: et });
    if (breakEven === null && et <= pt) breakEven = y;
  }
  const petrolTotal = pt - Math.max(0, i.petrolPrice) * Math.max(0, i.petrolResidual);
  const evTotal = et - Math.max(0, i.evPrice) * Math.max(0, i.evResidual);
  return {
    petrolRunning,
    evRunning: evRunningBase,
    petrolEnergy,
    evEnergy,
    evPerKwh,
    path,
    petrolTotal,
    evTotal,
    breakEven,
    petrolPerMile: miles > 0 ? petrolEnergy / miles : 0,
    evPerMile: miles > 0 ? evEnergy / miles : 0,
  };
}

/* ── Commuting ──────────────────────────────────────────────────── */

export type CommuteInput = {
  oneWayMiles: number;
  daysPerWeek: number;
  weeks: number;
  /** Car. */
  mpg: number;
  fuelPrice: number;
  parkingPerDay: number;
  /** Wear, tyres and servicing in pence per mile. */
  wearPence: number;
  zonePerDay: number;
  /** Train: yearly season ticket, or daily return fare if no season. */
  seasonTicket: number;
  dailyRail: number;
  /** Bus: single fare per trip (capped at £3 in England outside London in 2026). */
  busSingle: number;
  /** Cycling: yearly cost of the bike and kit. */
  bikeYearly: number;
};

export type CommuteOption = { key: "car" | "train" | "bus" | "bike"; label: string; yearly: number; perDay: number; available: boolean };

export function commuteCosts(i: CommuteInput): { days: number; miles: number; options: CommuteOption[]; carParts: { fuel: number; parking: number; wear: number; zone: number } } {
  const days = Math.max(0, Math.min(7, Math.round(i.daysPerWeek))) * Math.max(0, Math.min(52, Math.round(i.weeks)));
  const miles = Math.max(0, i.oneWayMiles) * 2 * days;
  const fuel = driveCost(miles, { kind: "mpg", value: i.mpg }, i.fuelPrice).cost;
  const parking = Math.max(0, i.parkingPerDay) * days;
  const wear = (miles * Math.max(0, i.wearPence)) / 100;
  const zone = Math.max(0, i.zonePerDay) * days;
  const car = fuel + parking + wear + zone;
  const payg = Math.max(0, i.dailyRail) * days;
  const train = i.seasonTicket > 0 && payg > 0 ? Math.min(i.seasonTicket, payg) : i.seasonTicket > 0 ? i.seasonTicket : payg;
  const bus = Math.max(0, i.busSingle) * 2 * days;
  const bike = Math.max(0, i.bikeYearly);
  const per = (y: number) => (days > 0 ? y / days : 0);
  return {
    days,
    miles,
    carParts: { fuel, parking, wear, zone },
    options: [
      { key: "car", label: "Car", yearly: car, perDay: per(car), available: true },
      { key: "train", label: "Train", yearly: train, perDay: per(train), available: train > 0 },
      { key: "bus", label: "Bus", yearly: bus, perDay: per(bus), available: bus > 0 },
      { key: "bike", label: "Bike", yearly: bike, perDay: per(bike), available: i.oneWayMiles <= 15 },
    ],
  };
}

/** Cycle to Work: saving from buying a bike through salary sacrifice. */
export function cycleToWork(price: number, taxRate: number, niRate: number): { saving: number; cost: number } {
  const p = Math.max(0, price);
  const saving = p * (Math.max(0, taxRate) + Math.max(0, niRate));
  return { saving, cost: p - saving };
}
