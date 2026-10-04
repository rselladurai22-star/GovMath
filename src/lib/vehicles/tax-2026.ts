/**
 * Motoring taxes for 2026/27: Vehicle Excise Duty (car tax), company car
 * benefit in kind, electric car salary sacrifice, clean air zone charges and
 * SORN refunds.
 *
 * Sources: GOV.UK vehicle tax rate tables (from 1 April 2026); HMRC
 * "Company car benefit: the appropriate percentage" (480 appendix 2), 2026 to
 * 2027 table; van and fuel benefit charges 2026 to 2027; TfL; council clean air
 * zone pages; Scottish low emission zone regulations.
 */

import { incomeTax, nationalInsurance } from "../tax/2026-27";
import { scottishIncomeTax } from "../tax/scottish-2026-27";

/* ── Vehicle Excise Duty ────────────────────────────────────────── */

export type VedFuel = "petrol" | "diesel-rde2" | "diesel" | "alternative" | "electric";
export type VedEra = "2017" | "2001";

/** First-year rates for cars registered on or after 1 April 2017. [max CO2, standard, non-RDE2 diesel] */
export const VED_FIRST_YEAR: [number, number, number][] = [
  [0, 10, 10],
  [50, 115, 135],
  [75, 135, 280],
  [90, 280, 365],
  [100, 365, 405],
  [110, 405, 455],
  [130, 455, 560],
  [150, 560, 1_410],
  [170, 1_410, 2_270],
  [190, 2_270, 3_420],
  [225, 3_420, 4_850],
  [255, 4_850, 5_690],
  [Infinity, 5_690, 5_690],
];

/** Bands A to M for cars registered 1 March 2001 to 31 March 2017. [band, max CO2, 12-month rate] */
export const VED_BANDS_2001: [string, number, number][] = [
  ["A", 100, 20],
  ["B", 110, 20],
  ["C", 120, 35],
  ["D", 130, 170],
  ["E", 140, 200],
  ["F", 150, 225],
  ["G", 165, 275],
  ["H", 175, 325],
  ["I", 185, 360],
  ["J", 200, 410],
  ["K", 225, 445],
  ["L", 255, 760],
  ["M", Infinity, 790],
];

export const VED_2026 = {
  standard: 200,
  supplement: 440,
  supplementThreshold: 40_000,
  /** Zero-emission cars registered from 1 April 2025. */
  zevSupplementThreshold: 50_000,
  supplementYears: 5,
  /** Monthly Direct Debit costs 5% more. */
  directDebitUplift: 0.05,
  /** Electric Vehicle Excise Duty from April 2028, pence per mile. */
  evedPerMile: { electric: 0.03, plugIn: 0.015 },
} as const;

export type VedInput = {
  era: VedEra;
  fuel: VedFuel;
  co2: number;
  listPrice: number;
  /** For electric cars registered 2017 to March 2025: no supplement. */
  zevBefore2025?: boolean;
};

export type VedResult = {
  firstYear: number;
  /** Yearly rate from the second year, excluding the supplement. */
  standard: number;
  supplement: number;
  /** Yearly bill in years 2 to 6. */
  yearsTwoToSix: number;
  /** Yearly bill from year 7. */
  later: number;
  sixYearTotal: number;
  /** Paying the year-2 bill by monthly Direct Debit. */
  monthlyDirectDebit: number;
  band?: string;
};

export function ved2026(i: VedInput): VedResult {
  const co2 = Math.max(0, i.co2);
  if (i.era === "2001") {
    const electric = i.fuel === "electric";
    const row = electric ? VED_BANDS_2001[0] : VED_BANDS_2001.find(([, max]) => co2 <= max)!;
    const rate = row[2];
    return { firstYear: rate, standard: rate, supplement: 0, yearsTwoToSix: rate, later: rate, sixYearTotal: rate * 6, monthlyDirectDebit: (rate * (1 + VED_2026.directDebitUplift)) / 12, band: row[0] };
  }
  const electric = i.fuel === "electric";
  const row = VED_FIRST_YEAR.find(([max]) => (electric ? 0 : co2) <= max)!;
  const firstYear = electric ? 10 : i.fuel === "diesel" ? row[2] : row[1];
  const threshold = electric ? VED_2026.zevSupplementThreshold : VED_2026.supplementThreshold;
  const supplement = electric && i.zevBefore2025 ? 0 : i.listPrice > threshold ? VED_2026.supplement : 0;
  const yearly = VED_2026.standard + supplement;
  return {
    firstYear,
    standard: VED_2026.standard,
    supplement,
    yearsTwoToSix: yearly,
    later: VED_2026.standard,
    sixYearTotal: firstYear + yearly * VED_2026.supplementYears,
    monthlyDirectDebit: (yearly * (1 + VED_2026.directDebitUplift)) / 12,
  };
}

/** Electric Vehicle Excise Duty from April 2028, on top of VED. */
export const eved = (miles: number, kind: "electric" | "plugIn") => Math.max(0, miles) * VED_2026.evedPerMile[kind];

/* ── Company car benefit in kind ────────────────────────────────── */

export type BikFuel = "electric" | "hybrid" | "petrol" | "diesel-rde2" | "diesel";

export const BIK_2026 = {
  fuelMultiplier: 29_200,
  vanBenefit: 4_170,
  vanFuel: 798,
  dieselSupplement: 0.04,
  max: 0.37,
  capitalContributionCap: 5_000,
  employerNi: 0.15,
  /** Zero-emission percentage by tax year. */
  zevByYear: { "2026/27": 0.04, "2027/28": 0.05, "2028/29": 0.07, "2029/30": 0.09 } as Record<string, number>,
} as const;

/** Appropriate percentage for 2026/27. `range` is the electric range in miles, used for 1 to 50 g/km. */
export function appropriatePercentage2026(fuel: BikFuel, co2: number, range = 0): number {
  if (fuel === "electric" || co2 <= 0) return 0.04;
  let p: number;
  if (co2 <= 50) {
    p = range >= 130 ? 0.04 : range >= 70 ? 0.07 : range >= 40 ? 0.1 : range >= 30 ? 0.14 : 0.16;
  } else if (co2 <= 54) p = 0.17;
  else if (co2 <= 59) p = 0.18;
  else if (co2 <= 64) p = 0.19;
  else if (co2 <= 69) p = 0.2;
  else if (co2 <= 79) p = 0.21;
  else p = Math.min(0.37, 0.22 + Math.floor((co2 - 80) / 5) * 0.01);
  if (fuel === "diesel") p = Math.min(BIK_2026.max, p + BIK_2026.dieselSupplement);
  return Math.round(p * 100) / 100;
}

export type CompanyCarInput = {
  listPrice: number;
  options: number;
  fuel: BikFuel;
  co2: number;
  range: number;
  capitalContribution: number;
  /** Yearly amount you pay for private use. */
  privateUsePayment: number;
  /** Days in the year the car was not available (30 or more in a row count). */
  unavailableDays: number;
  freeFuel: boolean;
  salary: number;
  scotland: boolean;
};

export type CompanyCarResult = {
  percent: number;
  price: number;
  cashEquivalent: number;
  fuelBenefit: number;
  taxable: number;
  taxRate: number;
  tax: number;
  monthly: number;
  employerNi: number;
};

/** Extra income tax on a benefit, worked out from your salary. */
export function taxOnBenefit(salary: number, benefit: number, scotland: boolean): number {
  const t = (g: number) => (scotland ? scottishIncomeTax(g).total : incomeTax(g).total);
  return t(salary + benefit) - t(salary);
}

export function companyCar2026(i: CompanyCarInput): CompanyCarResult {
  const percent = appropriatePercentage2026(i.fuel, i.co2, i.range);
  const price = Math.max(0, i.listPrice + i.options - Math.min(BIK_2026.capitalContributionCap, Math.max(0, i.capitalContribution)));
  const available = Math.max(0, 365 - Math.min(365, Math.max(0, i.unavailableDays))) / 365;
  const cashEquivalent = Math.max(0, price * percent * available - Math.max(0, i.privateUsePayment));
  const fuelBenefit = i.freeFuel && i.fuel !== "electric" ? BIK_2026.fuelMultiplier * percent * available : 0;
  const taxable = cashEquivalent + fuelBenefit;
  const tax = taxOnBenefit(Math.max(0, i.salary), taxable, i.scotland);
  return {
    percent,
    price,
    cashEquivalent,
    fuelBenefit,
    taxable,
    taxRate: taxable > 0 ? tax / taxable : 0,
    tax,
    monthly: tax / 12,
    employerNi: taxable * BIK_2026.employerNi,
  };
}

/* ── Electric car salary sacrifice ──────────────────────────────── */

export type SalSacInput = {
  salary: number;
  /** Gross monthly amount sacrificed (lease, insurance, maintenance). */
  monthlySacrifice: number;
  /** P11D value (list price including options and VAT). */
  p11d: number;
  scotland: boolean;
  /** Tax year for the zero-emission percentage. */
  year: "2026/27" | "2027/28" | "2028/29" | "2029/30";
  /** Monthly cost of leasing the same car privately, from take-home pay. */
  privateLease: number;
};

export type SalSacResult = {
  sacrifice: number;
  taxSaved: number;
  niSaved: number;
  bik: number;
  bikTax: number;
  /** Fall in take-home pay a year. */
  netCost: number;
  netMonthly: number;
  privateYearly: number;
  saving: number;
  savingPct: number;
  /** Salary after the sacrifice, to check against the minimum wage and thresholds. */
  newSalary: number;
};

export function evSalarySacrifice2026(i: SalSacInput): SalSacResult {
  const salary = Math.max(0, i.salary);
  const sacrifice = Math.min(salary, Math.max(0, i.monthlySacrifice) * 12);
  const newSalary = salary - sacrifice;
  const tax = (g: number) => (i.scotland ? scottishIncomeTax(g).total : incomeTax(g).total);
  const pct = BIK_2026.zevByYear[i.year] ?? 0.04;
  const bik = Math.max(0, i.p11d) * pct;
  const taxSaved = tax(salary) - tax(newSalary);
  const niSaved = nationalInsurance(salary).total - nationalInsurance(newSalary).total;
  const bikTax = tax(newSalary + bik) - tax(newSalary);
  const netCost = sacrifice - taxSaved - niSaved + bikTax;
  const privateYearly = Math.max(0, i.privateLease) * 12;
  const saving = privateYearly - netCost;
  return {
    sacrifice,
    taxSaved,
    niSaved,
    bik,
    bikTax,
    netCost,
    netMonthly: netCost / 12,
    privateYearly,
    saving,
    savingPct: privateYearly > 0 ? saving / privateYearly : 0,
    newSalary,
  };
}

/* ── Clean air zones ────────────────────────────────────────────── */

export type ZoneVehicle = "car" | "van" | "motorbike";

export type Zone = {
  key: string;
  name: string;
  /** Daily charge for a non-compliant vehicle; 0 means that vehicle is not charged. */
  charge: Record<ZoneVehicle, number>;
  hours: string;
  kind: "daily" | "penalty";
  notes: string;
};

export const ZONES_2026: Zone[] = [
  { key: "london-ulez", name: "London ULEZ", charge: { car: 12.5, van: 12.5, motorbike: 12.5 }, hours: "Every day, 24 hours (except Christmas Day)", kind: "daily", notes: "Covers all London boroughs." },
  { key: "birmingham", name: "Birmingham Clean Air Zone", charge: { car: 8, van: 8, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "Inside the A4540 Middleway ring road." },
  { key: "bristol", name: "Bristol Clean Air Zone", charge: { car: 9, van: 9, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "City centre zone." },
  { key: "bath", name: "Bath Clean Air Zone", charge: { car: 0, van: 9, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "Private cars are not charged; taxis and vans are." },
  { key: "sheffield", name: "Sheffield Clean Air Zone", charge: { car: 0, van: 10, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "Private cars are not charged." },
  { key: "tyneside", name: "Newcastle and Gateshead Clean Air Zone", charge: { car: 0, van: 12.5, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "Private cars are not charged." },
  { key: "bradford", name: "Bradford Clean Air Zone", charge: { car: 0, van: 9, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "Private cars are not charged; taxis and vans are." },
  { key: "portsmouth", name: "Portsmouth Clean Air Zone", charge: { car: 0, van: 0, motorbike: 0 }, hours: "Every day, 24 hours", kind: "daily", notes: "Only taxis, buses, coaches and lorries are charged." },
  { key: "scotland-lez", name: "Scottish low emission zone (Glasgow, Edinburgh, Aberdeen, Dundee)", charge: { car: 60, van: 60, motorbike: 0 }, hours: "Every day, 24 hours", kind: "penalty", notes: "No daily charge: entering is banned and caught vehicles get a penalty." },
];

export const LONDON_CC = { daily: 18, evAutoPayDiscount: 0.25, hours: "7am to 6pm weekdays, noon to 6pm weekends and bank holidays" } as const;

/** Compliance with Euro 4 petrol and Euro 6 diesel, by first registration year. */
export function zoneCompliant(fuel: "petrol" | "diesel" | "hybrid" | "electric", regYear: number): boolean {
  if (fuel === "electric") return true;
  if (fuel === "diesel") return regYear >= 2016;
  return regYear >= 2006;
}

/** Scottish LEZ penalties: £60, doubling for each repeat within 90 days, capped at £480 for cars and vans. */
export function lezPenalties(entries: number, payEarly = false): number[] {
  const out: number[] = [];
  let p = 60;
  for (let k = 0; k < Math.max(0, Math.floor(entries)); k++) {
    out.push(payEarly ? p / 2 : p);
    p = Math.min(480, p * 2);
  }
  return out;
}

export type ZoneCostInput = {
  zone: string;
  vehicle: ZoneVehicle;
  compliant: boolean;
  daysPerWeek: number;
  weeks: number;
  /** London only: also count the congestion charge on these days. */
  congestion: boolean;
  electric: boolean;
};

export type ZoneCostResult = { daily: number; congestionDaily: number; weekly: number; yearly: number; days: number; charged: boolean };

export function zoneCost(i: ZoneCostInput): ZoneCostResult {
  const z = ZONES_2026.find((x) => x.key === i.zone) ?? ZONES_2026[0];
  const days = Math.max(0, Math.min(7, i.daysPerWeek)) * Math.max(0, Math.min(52, i.weeks));
  const daily = i.compliant ? 0 : z.charge[i.vehicle];
  const congestionDaily = z.key === "london-ulez" && i.congestion ? LONDON_CC.daily * (i.electric ? 1 - LONDON_CC.evAutoPayDiscount : 1) : 0;
  if (z.kind === "penalty") {
    const yearly = daily > 0 ? lezPenalties(days).reduce((a, b) => a + b, 0) : 0;
    return { daily, congestionDaily: 0, weekly: days > 0 ? yearly / Math.max(1, i.weeks) : 0, yearly, days, charged: daily > 0 };
  }
  const per = daily + congestionDaily;
  return { daily, congestionDaily, weekly: per * Math.max(0, Math.min(7, i.daysPerWeek)), yearly: per * days, days, charged: per > 0 };
}

/* ── SORN ───────────────────────────────────────────────────────── */

export const SORN_PENALTY = { late: 80, earlyPay: 40, court: 1_000 } as const;

/** Full calendar months of tax left after the month DVLA gets the SORN. */
export function sornRefundMonths(sornDate: string, taxExpiry: string): number {
  const [sy, sm] = sornDate.split("-").map(Number);
  const [ey, em] = taxExpiry.split("-").map(Number);
  // Tax runs to the end of the month before the expiry month shown on the reminder.
  const months = (ey - sy) * 12 + (em - sm) - 1;
  return Math.max(0, Math.min(12, months));
}

export type SornInput = {
  sornDate: string;
  taxExpiry: string;
  /** Yearly vehicle tax. */
  yearlyTax: number;
  monthlyInsurance: number;
  /** Months the car will stay off the road. */
  monthsOff: number;
};

export type SornResult = { months: number; refund: number; taxSaved: number; insuranceSaved: number; total: number };

export function sornPlan(i: SornInput): SornResult {
  const months = sornRefundMonths(i.sornDate, i.taxExpiry);
  const monthly = Math.max(0, i.yearlyTax) / 12;
  const refund = monthly * months;
  const off = Math.max(0, i.monthsOff);
  const taxSaved = monthly * off;
  const insuranceSaved = Math.max(0, i.monthlyInsurance) * off;
  return { months, refund, taxSaved, insuranceSaved, total: taxSaved + insuranceSaved };
}
