/**
 * Home energy upgrades: solar panels, and a heat pump against a gas boiler.
 *
 * Energy prices come from the Ofgem price cap in ./costs (electricity VAT is
 * 0% from 1 October 2026 to 31 March 2027; gas keeps 5%). Every other figure
 * here is a named constant with its source, and every input can be changed by
 * the user in the calculators.
 */

import { BOILER_EFFICIENCY, TDCV_2026 } from "./costs";

const finite = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/* ── Carbon ────────────────────────────────────────────────────────────── */

/**
 * kg CO2e per kWh of UK grid electricity used: generation 0.13096 plus
 * transmission and distribution losses 0.01299. Source: DESNZ, "Greenhouse
 * gas reporting: conversion factors 2026" (flat file, revised July 2026).
 */
export const ELEC_CO2_KG = 0.13096 + 0.01299;
/** kg CO2e per kWh of natural gas (gross CV, as on bills). Same source. */
export const GAS_CO2_KG = 0.18231;

/* ── Solar panels ──────────────────────────────────────────────────────── */

export type SolarRegion = { id: string; name: string; place: string; yield: number };

/**
 * Yearly output of 1 kWp of panels facing south at 35°, kWh, with 14% system
 * losses, at a representative place in each region. Source: European
 * Commission Joint Research Centre, PVGIS 5.3 (PVcalc, SARAH3 data), queried
 * October 2026. MCS uses its own postcode-zone tables; results are close.
 */
export const SOLAR_REGIONS: SolarRegion[] = [
  { id: "london", name: "London", place: "London", yield: 1019 },
  { id: "south-east", name: "South East England", place: "Brighton", yield: 1156 },
  { id: "south-west", name: "South West England", place: "Exeter", yield: 1052 },
  { id: "east", name: "East of England", place: "Norwich", yield: 1030 },
  { id: "midlands", name: "Midlands", place: "Birmingham", yield: 968 },
  { id: "yorkshire", name: "Yorkshire and the Humber", place: "Leeds", yield: 952 },
  { id: "north-west", name: "North West England", place: "Manchester", yield: 886 },
  { id: "north-east", name: "North East England", place: "Newcastle", yield: 949 },
  { id: "south-wales", name: "South Wales", place: "Cardiff", yield: 1042 },
  { id: "mid-north-wales", name: "Mid and North Wales", place: "Aberystwyth", yield: 938 },
  { id: "south-scotland", name: "Southern and central Scotland", place: "Edinburgh", yield: 904 },
  { id: "west-scotland", name: "West of Scotland", place: "Glasgow", yield: 859 },
  { id: "north-scotland", name: "Highlands", place: "Inverness", yield: 811 },
  { id: "ni", name: "Northern Ireland", place: "Belfast", yield: 919 },
];

export function solarRegion(id: string): SolarRegion {
  return SOLAR_REGIONS.find((r) => r.id === id) ?? SOLAR_REGIONS[0];
}

export type Orientation = "s" | "se-sw" | "e-w" | "ne-nw" | "n" | "flat";

/**
 * Output against panels facing south at 35°. PVGIS 5.3, Birmingham, 14%
 * losses: south 968 kWh per kWp, south-east or south-west 903, east or west
 * 756, north-east or north-west 594, north 524, flat 805.
 */
export const ORIENTATION: Record<Orientation, { label: string; factor: number }> = {
  s: { label: "South", factor: 1 },
  "se-sw": { label: "South-east or south-west", factor: 903 / 968 },
  "e-w": { label: "East or west", factor: 756 / 968 },
  "ne-nw": { label: "North-east or north-west", factor: 594 / 968 },
  n: { label: "North", factor: 524 / 968 },
  flat: { label: "Flat roof, panels flat", factor: 805 / 968 },
};

export type Shading = "none" | "some" | "heavy";
/**
 * A simple shading allowance (our assumption: MCS installers do a detailed
 * shade survey). None loses nothing, some shade 10%, heavy shade 25%.
 */
export const SHADING: Record<Shading, { label: string; factor: number }> = {
  none: { label: "None", factor: 1 },
  some: { label: "Some (a chimney, a tree for part of the day)", factor: 0.9 },
  heavy: { label: "Heavy", factor: 0.75 },
};

/**
 * Median installed cost per kW of small solar PV in Great Britain,
 * April 2025 to March 2026, including VAT where charged (0% on homes).
 * Source: DESNZ, "Solar PV cost data", Total Installed Capacity file,
 * published 28 May 2026 (MCS installation database).
 */
export const SOLAR_COST_PER_KW = { upTo4: 1595.06, from4to10: 1545.89 } as const;

/** A typical new panel, watts (an example: most new panels are rated about 400 to 450W). */
export const PANEL_WATTS = 430;

/**
 * Average Smart Export Guarantee payment per kWh exported, April 2024 to
 * March 2025: £56.97 million paid for 443.1 GWh. Source: Ofgem, "Smart
 * Export Guarantee Annual Report, April 2024 to March 2025" (Year 5).
 * About 12.9p. Tariffs ranged from about 1p to 15p flat, more on some
 * time-of-use deals.
 */
export const SEG_AVERAGE_PENCE = Math.round(((56.97e6 / 443.1e6) * 100) * 10) / 10;

/**
 * Share of the panels' output used in the home: our starting assumption, in
 * line with the ranges installers quote. Change it to match your own pattern
 * (MCS installers estimate it with the MCS self-consumption calculator).
 */
export const SELF_USE = { noBattery: 40, battery: 70 } as const;

/** Yearly loss of panel output, % (a typical panel warranty figure; editable). */
export const SOLAR_DEGRADATION = 0.5;

/**
 * Energy-saving materials, including solar panels, batteries and heat pumps,
 * are zero-rated for VAT when installed in homes in Great Britain until this
 * date; from 1 April 2027 they return to 5%. Source: HMRC VAT Notice 708/6.
 */
export const ESM_ZERO_VAT_UNTIL = "31 March 2027";

export function solarKwp(input: { by: "kwp" | "panels"; kwp: number; panels: number; panelWatts: number }): number {
  return input.by === "panels" ? (finite(input.panels) * finite(input.panelWatts)) / 1000 : finite(input.kwp);
}

/** Typical installed cost for a system size, from the DESNZ medians. */
export function solarTypicalCost(kwp: number): number {
  const k = finite(kwp);
  return k * (k <= 4 ? SOLAR_COST_PER_KW.upTo4 : SOLAR_COST_PER_KW.from4to10);
}

export type SolarYear = {
  year: number;
  generation: number;
  selfUsed: number;
  exported: number;
  saving: number;
  exportIncome: number;
  /** Benefit to date less the cost, pounds. */
  net: number;
};

export type SolarResult = {
  kwp: number;
  /** kWh in year 1. */
  generation: number;
  selfUsed: number;
  exported: number;
  /** Share of generation used at home, 0–1. */
  selfShare: number;
  /** Share of the household's use covered by the panels, 0–1. */
  coverage: number;
  /** Pounds, year 1. */
  billSaving: number;
  exportIncome: number;
  yearly: number;
  cost: number;
  /** Years to pay back the cost, or null if not within the period. */
  payback: number | null;
  /** Benefit over the whole period, pounds. */
  totalBenefit: number;
  /** Total benefit less the cost. */
  netReturn: number;
  /** kg CO2e a year, year 1. */
  co2: number;
  years: SolarYear[];
};

/** Year (fractional) at which the running total first reaches `cost`, or null. */
function paybackYear(cost: number, benefits: number[]): number | null {
  if (cost <= 0) return 0;
  let sum = 0;
  for (let i = 0; i < benefits.length; i++) {
    const b = benefits[i];
    if (b > 0 && sum + b >= cost) return i + (cost - sum) / b;
    sum += b;
  }
  return null;
}

export function solarStudy(input: {
  kwp: number;
  /** kWh per kWp for the region. */
  yieldPerKwp: number;
  orientation: Orientation;
  shading: Shading;
  /** Household electricity use a year, kWh. */
  useKwh: number;
  /** % of the output used at home. */
  selfUsePct: number;
  /** Pence per kWh. */
  unitRate: number;
  segRate: number;
  /** Total upfront cost, pounds (panels plus any battery). */
  cost: number;
  years?: number;
  /** % a year. */
  degradation?: number;
  /** % a year rise in the electricity and export rates. */
  priceRise?: number;
}): SolarResult {
  const kwp = finite(input.kwp);
  const years = Math.max(1, Math.round(input.years ?? 25));
  const fac = (ORIENTATION[input.orientation] ?? ORIENTATION.s).factor * (SHADING[input.shading] ?? SHADING.none).factor;
  const gen1 = kwp * finite(input.yieldPerKwp) * fac;
  const use = finite(input.useKwh);
  const share = Math.min(100, finite(input.selfUsePct)) / 100;
  const deg = Math.min(10, finite(input.degradation ?? SOLAR_DEGRADATION)) / 100;
  const rise = (Number.isFinite(input.priceRise ?? 0) ? input.priceRise ?? 0 : 0) / 100;
  const cost = finite(input.cost);

  const rows: SolarYear[] = [];
  const benefits: number[] = [];
  let cum = 0;
  for (let y = 1; y <= years; y++) {
    const gen = gen1 * Math.pow(1 - deg, y - 1);
    const self = Math.min(gen * share, use);
    const exp = gen - self;
    const p = Math.pow(1 + rise, y - 1);
    const saving = (self * finite(input.unitRate) * p) / 100;
    const income = (exp * finite(input.segRate) * p) / 100;
    benefits.push(saving + income);
    cum += saving + income;
    rows.push({ year: y, generation: gen, selfUsed: self, exported: exp, saving, exportIncome: income, net: cum - cost });
  }
  const first = rows[0];
  return {
    kwp,
    generation: first.generation,
    selfUsed: first.selfUsed,
    exported: first.exported,
    selfShare: first.generation > 0 ? first.selfUsed / first.generation : 0,
    coverage: use > 0 ? first.selfUsed / use : 0,
    billSaving: first.saving,
    exportIncome: first.exportIncome,
    yearly: first.saving + first.exportIncome,
    cost,
    payback: kwp > 0 ? paybackYear(cost, benefits) : null,
    totalBenefit: cum,
    netReturn: cum - cost,
    co2: first.generation * ELEC_CO2_KG,
    years: rows,
  };
}

/* ── Heat pump vs gas boiler ───────────────────────────────────────────── */

/**
 * Boiler Upgrade Scheme grant towards an air source or ground source heat
 * pump, England and Wales. An extra £1,500 is available until March 2027
 * only where the home is heated by oil or LPG and has no mains gas. Source:
 * GOV.UK, "Apply for the Boiler Upgrade Scheme: what you can get".
 */
export const BUS_GRANT = 7500;
export const BUS_OFF_GAS_EXTRA = 1500;
/** BUS grant for an air-to-air heat pump (same source). */
export const BUS_AIR_TO_AIR = 2500;

/**
 * Median reported cost of an air-to-water heat pump installed under the
 * Boiler Upgrade Scheme, April to June 2026, before the grant; lower and
 * upper quartiles £11,128 and £15,627. Source: DESNZ, "Boiler Upgrade Scheme
 * statistics: August 2026", Table Q1.1A (Ofgem, MCS).
 */
export const HP_MEDIAN_COST = 12908;
export const HP_COST_QUARTILES = { lower: 11128, upper: 15627 } as const;

/**
 * Seasonal performance of air source heat pumps measured in homes: median
 * SPF H4 2.78 in the Electrification of Heat demonstration project (742
 * heat pumps). Source: DESNZ, "Alternative low carbon heating technology
 * costs: analytical annex", note 46, citing the EoH report. We use 2.8.
 */
export const HP_SCOP_DEFAULT = 2.8;

/** A replacement gas boiler, pounds: an example figure only. Use your own quote. */
export const BOILER_COST_EXAMPLE = 3000;

export type HouseSize = "small" | "medium" | "large";

/**
 * Gas a year by home, kWh, from Ofgem's Typical Domestic Consumption Values
 * (low, medium, high) from 1 July 2026, in ./costs.
 */
export const HOUSE_GAS: Record<HouseSize, { label: string; kwh: number }> = {
  small: { label: "Flat or small house (low use)", kwh: TDCV_2026.gas.low },
  medium: { label: "Typical house (medium use)", kwh: TDCV_2026.gas.medium },
  large: { label: "Large house (high use)", kwh: TDCV_2026.gas.high },
};

/** Heat the home needs a year, kWh: the gas burned times the boiler's efficiency. */
export function heatDemand(gasKwh: number, boilerEff = BOILER_EFFICIENCY): number {
  return finite(gasKwh) * Math.min(1, finite(boilerEff));
}

export type HeatYear = { year: number; boiler: number; heatPump: number; boilerTotal: number; heatPumpTotal: number };

export type HeatResult = {
  heatKwh: number;
  gasKwh: number;
  hpKwh: number;
  boiler: { fuel: number; standing: number; total: number; upfront: number; co2: number };
  heatPump: { fuel: number; standing: number; total: number; upfront: number; co2: number };
  /** Yearly running saving with the heat pump (negative: it costs more). */
  saving: number;
  /** Extra upfront cost of the heat pump after the grant, pounds (can be negative). */
  extraUpfront: number;
  /** Years for running savings to repay the extra upfront cost; 0 if no extra cost; null if never within the period. */
  payback: number | null;
  /** SCOP at which the heat pump's running cost equals the boiler's, or null. */
  breakEvenScop: number | null;
  /** Cost of each over the period, upfront plus running. */
  boilerPeriod: number;
  heatPumpPeriod: number;
  co2Saving: number;
  years: HeatYear[];
};

export function heatPumpVsBoiler(input: {
  heatKwh: number;
  boilerEff: number;
  scop: number;
  /** Pence per kWh and pence per day. */
  gasUnit: number;
  gasStanding: number;
  elecUnit: number;
  /** True if you keep a gas supply (a gas hob, say), so its standing charge stays. */
  keepGas: boolean;
  boilerCost: number;
  hpCost: number;
  grant: number;
  years?: number;
  /** % a year rise in gas and electricity prices. */
  gasRise?: number;
  elecRise?: number;
}): HeatResult {
  const heat = finite(input.heatKwh);
  const eff = Math.min(1, finite(input.boilerEff)) || BOILER_EFFICIENCY;
  const scop = finite(input.scop) || HP_SCOP_DEFAULT;
  const years = Math.max(1, Math.round(input.years ?? 15));
  const gasKwh = heat / eff;
  const hpKwh = heat / scop;
  const standing = (finite(input.gasStanding) * 365) / 100;
  const bFuel = (gasKwh * finite(input.gasUnit)) / 100;
  const hFuel = (hpKwh * finite(input.elecUnit)) / 100;
  const hStanding = input.keepGas ? standing : 0;
  const bUp = finite(input.boilerCost);
  const hUp = Math.max(0, finite(input.hpCost) - finite(input.grant));
  const gr = (Number.isFinite(input.gasRise ?? 0) ? input.gasRise ?? 0 : 0) / 100;
  const er = (Number.isFinite(input.elecRise ?? 0) ? input.elecRise ?? 0 : 0) / 100;

  const rows: HeatYear[] = [];
  let bt = bUp;
  let ht = hUp;
  const savings: number[] = [];
  for (let y = 1; y <= years; y++) {
    const g = Math.pow(1 + gr, y - 1);
    const e = Math.pow(1 + er, y - 1);
    const b = (bFuel + standing) * g;
    const h = hFuel * e + hStanding * g;
    bt += b;
    ht += h;
    savings.push(b - h);
    rows.push({ year: y, boiler: b, heatPump: h, boilerTotal: bt, heatPumpTotal: ht });
  }
  const extra = hUp - bUp;
  const bTotal = bFuel + standing;
  const hTotal = hFuel + hStanding;
  // Running costs equal when heat / scop × elec = gas fuel + standing saved.
  const room = bFuel + standing - hStanding;
  const breakEven = room > 0 && heat > 0 && finite(input.elecUnit) > 0 ? (heat * finite(input.elecUnit)) / 100 / room : null;
  return {
    heatKwh: heat,
    gasKwh,
    hpKwh,
    boiler: { fuel: bFuel, standing, total: bTotal, upfront: bUp, co2: gasKwh * GAS_CO2_KG },
    heatPump: { fuel: hFuel, standing: hStanding, total: hTotal, upfront: hUp, co2: hpKwh * ELEC_CO2_KG },
    saving: bTotal - hTotal,
    extraUpfront: extra,
    payback: extra <= 0 ? 0 : paybackYear(extra, savings),
    breakEvenScop: breakEven,
    boilerPeriod: bt,
    heatPumpPeriod: ht,
    co2Saving: gasKwh * GAS_CO2_KG - hpKwh * ELEC_CO2_KG,
    years: rows,
  };
}
