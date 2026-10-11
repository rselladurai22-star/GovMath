/**
 * Household energy costs: what an appliance costs to run, and a gas and
 * electricity bill at the Ofgem price cap.
 *
 * Price cap figures are Great Britain averages for Direct Debit customers,
 * as published by Ofgem. Unit rates and standing charges already include VAT
 * at the rate in force for each period.
 */

import { PRICES_2026 } from "../vehicles/running";

/* ── Price cap ─────────────────────────────────────────────────────────── */

export type CapPeriod = {
  /** Plain-words label, e.g. "October to December 2026". */
  label: string;
  /** Electricity unit rate, pence per kWh (VAT included at `elecVat`). */
  elecUnit: number;
  /** Electricity standing charge, pence per day. */
  elecStanding: number;
  /** Gas unit rate, pence per kWh (VAT included at `gasVat`). */
  gasUnit: number;
  /** Gas standing charge, pence per day. */
  gasStanding: number;
  /** VAT rate included in the electricity figures. */
  elecVat: number;
  /** VAT rate included in the gas figures. */
  gasVat: number;
  /** Ofgem's typical yearly dual fuel bill by payment method, at 2026 typical use. */
  typical: { dd: number; sc: number; ppm: number; e7: number };
};

/**
 * 1 October to 31 December 2026 (cap period 17a), GB average, Direct Debit.
 * Source: Ofgem, "Changes to energy price cap between 1 October and
 * 31 December 2026" and "Energy price cap unit rates and standing charges"
 * (published 26 August 2026). Electricity carries no VAT from 1 October 2026
 * to 31 March 2027; gas keeps 5%. Typical bills: Ofgem letter "Energy price
 * cap (default tariff) update from 1 October 2026", 26 August 2026.
 */
export const CAP_OCT_DEC_2026: CapPeriod = {
  label: "October to December 2026",
  elecUnit: PRICES_2026.homeElectric, // 26.32p, shared with the vehicle calculators
  elecStanding: 54.83,
  gasUnit: 7.97,
  gasStanding: 29.68,
  elecVat: 0,
  gasVat: 0.05,
  typical: { dd: 1723, sc: 1861, ppm: 1678, e7: 1046 },
};

/**
 * 1 July to 30 September 2026, GB average, Direct Debit, 5% VAT on both fuels.
 * Source: Ofgem "Energy price cap unit rates and standing charges" (previous
 * period figures) and the 26 August 2026 cap letter (typical bills).
 */
export const CAP_JUL_SEP_2026: CapPeriod = {
  label: "July to September 2026",
  elecUnit: 26.11,
  elecStanding: 57.19,
  gasUnit: 7.33,
  gasStanding: 29.04,
  elecVat: 0.05,
  gasVat: 0.05,
  typical: { dd: 1663, sc: 1796, ppm: 1620, e7: 1039 },
};

/** The cap for 1 January to 31 March 2027 is due to be announced on this date (Ofgem). */
export const NEXT_CAP_ANNOUNCEMENT = "25 November 2026";
/** Electricity VAT is 0% from 1 October 2026 to 31 March 2027 (Ofgem, government decision). */
export const ELEC_VAT_ZERO_UNTIL = "31 March 2027";

/**
 * Typical Domestic Consumption Values from 1 July 2026, kWh a year.
 * Source: Ofgem, "Review of typical domestic consumption values: decision"
 * (27 May 2026), Table 1. Economy 7 split (Table 2): 58% day, 42% night.
 */
export const TDCV_2026 = {
  elec: { low: 1600, medium: 2500, high: 3800 },
  e7: { low: 1900, medium: 3400, high: 6100 },
  gas: { low: 6000, medium: 9500, high: 14000 },
  e7NightShare: 0.42,
} as const;

/** The previous (2023) values, used until 30 June 2026. Same source. */
export const TDCV_2023 = { elec: 2700, gas: 11500, e7: 3900 } as const;

/**
 * Gas boiler efficiency assumed when comparing an electric heater with
 * central heating. New gas boilers in England must be at least 92% ErP
 * efficient (Boiler Plus, BEIS 2018); real homes often do a little worse,
 * so we assume 90% and let the user change it.
 */
export const BOILER_EFFICIENCY = 0.9;

/** A typical overnight rate, pence per kWh (an example: check your own bill). */
export const OFF_PEAK_EXAMPLE = PRICES_2026.offPeak;

/* ── Appliances ────────────────────────────────────────────────────────── */

export type ApplianceId =
  | "kettle"
  | "microwave"
  | "air-fryer"
  | "oven"
  | "hob"
  | "slow-cooker"
  | "washing-machine"
  | "tumble-dryer"
  | "heat-pump-dryer"
  | "dishwasher"
  | "fridge-freezer"
  | "electric-heater"
  | "oil-radiator"
  | "halogen-heater"
  | "dehumidifier"
  | "heated-airer"
  | "electric-blanket"
  | "electric-shower"
  | "immersion"
  | "tv"
  | "games-console"
  | "laptop"
  | "desktop"
  | "hair-dryer"
  | "vacuum"
  | "ev-charger"
  | "custom";

export type Appliance = {
  id: ApplianceId;
  name: string;
  /** Typical power while on, watts (check the rating plate). */
  watts: number;
  /** Typical minutes per use. */
  minutes: number;
  /** Typical uses. */
  freq: number;
  per: "day" | "week";
  /** Share of the time the heating element or compressor is actually drawing power, 0–100. */
  cycling: number;
  /** True for heaters, whose heat could come from gas central heating instead. */
  heat?: boolean;
};

/**
 * Typical figures. Wattages are common rating-plate values; real models vary,
 * so every figure can be changed in the calculator.
 */
export const APPLIANCES: Appliance[] = [
  { id: "kettle", name: "Kettle", watts: 3000, minutes: 3, freq: 4, per: "day", cycling: 100 },
  { id: "microwave", name: "Microwave", watts: 1200, minutes: 5, freq: 2, per: "day", cycling: 100 },
  { id: "air-fryer", name: "Air fryer", watts: 1500, minutes: 20, freq: 1, per: "day", cycling: 100 },
  { id: "oven", name: "Electric oven", watts: 2400, minutes: 45, freq: 1, per: "day", cycling: 60 },
  { id: "hob", name: "Electric hob (one ring)", watts: 1500, minutes: 20, freq: 1, per: "day", cycling: 70 },
  { id: "slow-cooker", name: "Slow cooker", watts: 200, minutes: 480, freq: 2, per: "week", cycling: 100 },
  { id: "washing-machine", name: "Washing machine (40°C)", watts: 500, minutes: 90, freq: 4, per: "week", cycling: 100 },
  { id: "tumble-dryer", name: "Tumble dryer (vented or condenser)", watts: 2500, minutes: 75, freq: 3, per: "week", cycling: 100 },
  { id: "heat-pump-dryer", name: "Heat pump tumble dryer", watts: 800, minutes: 120, freq: 3, per: "week", cycling: 100 },
  { id: "dishwasher", name: "Dishwasher", watts: 600, minutes: 100, freq: 5, per: "week", cycling: 100 },
  { id: "fridge-freezer", name: "Fridge freezer", watts: 30, minutes: 1440, freq: 1, per: "day", cycling: 100 },
  { id: "electric-heater", name: "Electric heater (fan or convector)", watts: 2000, minutes: 180, freq: 1, per: "day", cycling: 100, heat: true },
  { id: "oil-radiator", name: "Oil-filled radiator", watts: 1500, minutes: 240, freq: 1, per: "day", cycling: 60, heat: true },
  { id: "halogen-heater", name: "Halogen heater", watts: 1200, minutes: 180, freq: 1, per: "day", cycling: 100, heat: true },
  { id: "dehumidifier", name: "Dehumidifier (compressor)", watts: 300, minutes: 480, freq: 1, per: "day", cycling: 100 },
  { id: "heated-airer", name: "Heated clothes airer", watts: 300, minutes: 240, freq: 3, per: "week", cycling: 100 },
  { id: "electric-blanket", name: "Electric blanket", watts: 100, minutes: 60, freq: 1, per: "day", cycling: 100, heat: true },
  { id: "electric-shower", name: "Electric shower", watts: 9500, minutes: 8, freq: 1, per: "day", cycling: 100 },
  { id: "immersion", name: "Immersion heater", watts: 3000, minutes: 60, freq: 1, per: "day", cycling: 100 },
  { id: "tv", name: "TV", watts: 100, minutes: 240, freq: 1, per: "day", cycling: 100 },
  { id: "games-console", name: "Games console", watts: 150, minutes: 120, freq: 1, per: "day", cycling: 100 },
  { id: "laptop", name: "Laptop", watts: 50, minutes: 360, freq: 1, per: "day", cycling: 100 },
  { id: "desktop", name: "Desktop computer and screen", watts: 200, minutes: 240, freq: 1, per: "day", cycling: 100 },
  { id: "hair-dryer", name: "Hair dryer", watts: 2000, minutes: 10, freq: 1, per: "day", cycling: 100 },
  { id: "vacuum", name: "Vacuum cleaner", watts: 800, minutes: 20, freq: 3, per: "week", cycling: 100 },
  { id: "ev-charger", name: "Electric car home charger (7kW)", watts: 7000, minutes: 240, freq: 2, per: "week", cycling: 100 },
  { id: "custom", name: "Something else (enter its watts)", watts: 1000, minutes: 60, freq: 1, per: "day", cycling: 100 },
];

export function applianceById(id: string): Appliance {
  return APPLIANCES.find((a) => a.id === id) ?? APPLIANCES[APPLIANCES.length - 1];
}

const finite = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export type RunningCost = {
  kwhPerUse: number;
  usesPerDay: number;
  kwhPerDay: number;
  kwhPerYear: number;
  /** Pounds. */
  perUse: number;
  perHour: number;
  perDay: number;
  perWeek: number;
  perMonth: number;
  perYear: number;
};

/**
 * What an appliance costs to run. `rate` is pence per kWh. Standing charges
 * are not included: you pay them whether the appliance is on or not.
 */
export function runningCost(input: { watts: number; minutes: number; freq: number; per: "day" | "week"; cycling: number; rate: number }): RunningCost {
  const kw = finite(input.watts) / 1000;
  const share = Math.min(100, finite(input.cycling)) / 100;
  const hours = finite(input.minutes) / 60;
  const kwhPerUse = kw * hours * share;
  const usesPerDay = input.per === "week" ? finite(input.freq) / 7 : finite(input.freq);
  const kwhPerDay = kwhPerUse * usesPerDay;
  const pounds = finite(input.rate) / 100;
  const perDay = kwhPerDay * pounds;
  return {
    kwhPerUse,
    usesPerDay,
    kwhPerDay,
    kwhPerYear: kwhPerDay * 365,
    perUse: kwhPerUse * pounds,
    perHour: kw * share * pounds,
    perDay,
    perWeek: perDay * 7,
    perMonth: (perDay * 365) / 12,
    perYear: perDay * 365,
  };
}

/** Cost of the same heat from a gas boiler: kWh of heat ÷ efficiency × gas unit rate (pounds). */
export function gasHeatCost(kwhHeat: number, gasRate: number, efficiency = BOILER_EFFICIENCY): number {
  const eff = efficiency > 0 ? Math.min(1, efficiency) : BOILER_EFFICIENCY;
  return (finite(kwhHeat) / eff) * (finite(gasRate) / 100);
}

/* ── Energy bill ───────────────────────────────────────────────────────── */

export type Payment = "dd" | "sc" | "ppm";

export type FuelBill = {
  kwh: number;
  units: number;
  standing: number;
  /** VAT included in `total`. */
  vat: number;
  total: number;
};

export type EnergyBill = {
  elec: FuelBill;
  gas: FuelBill;
  /** Adjustment for paying by standard credit or prepayment (estimate). */
  paymentAdjust: number;
  year: number;
  month: number;
  day: number;
};

function fuel(kwh: number, unit: number, standing: number, vatRate: number, days: number): FuelBill {
  const units = (finite(kwh) * finite(unit)) / 100;
  const st = (finite(standing) * days) / 100;
  const total = units + st;
  return { kwh: finite(kwh), units, standing: st, vat: (total * vatRate) / (1 + vatRate), total };
}

/**
 * A yearly bill at a cap period's rates. Standard credit and prepayment are
 * estimated by scaling with Ofgem's typical bills for each payment method,
 * since Ofgem publishes the average unit rates for Direct Debit only.
 */
export function energyBill(input: {
  elecKwh: number;
  gasKwh: number;
  hasGas: boolean;
  cap: CapPeriod;
  payment?: Payment;
  /** Optional own rates (pence); 0 or missing uses the cap. */
  own?: { elecUnit?: number; elecStanding?: number; gasUnit?: number; gasStanding?: number };
  days?: number;
}): EnergyBill {
  const days = input.days ?? 365;
  const c = input.cap;
  const o = input.own ?? {};
  const pick = (own: number | undefined, cap: number) => (own && own > 0 ? own : cap);
  const elec = fuel(input.elecKwh, pick(o.elecUnit, c.elecUnit), pick(o.elecStanding, c.elecStanding), c.elecVat, days);
  const gas = input.hasGas ? fuel(input.gasKwh, pick(o.gasUnit, c.gasUnit), pick(o.gasStanding, c.gasStanding), c.gasVat, days) : fuel(0, 0, 0, 0, days);
  const base = elec.total + gas.total;
  const pay = input.payment ?? "dd";
  const factor = pay === "dd" ? 1 : c.typical[pay] / c.typical.dd;
  const year = base * factor;
  return { elec, gas, paymentAdjust: year - base, year, month: year / 12, day: year / days };
}

/**
 * Work back from a monthly Direct Debit to yearly use, splitting it in the
 * same ratio as Ofgem's typical use (2,500 kWh electricity to 9,500 kWh gas).
 * Returns the scale applied to the typical values.
 */
export function usageFromSpend(monthly: number, cap: CapPeriod, hasGas: boolean): { elecKwh: number; gasKwh: number; scale: number } {
  const yearly = finite(monthly) * 12;
  const fixed = (cap.elecStanding * 365 + (hasGas ? cap.gasStanding * 365 : 0)) / 100;
  const perScale = (TDCV_2026.elec.medium * cap.elecUnit + (hasGas ? TDCV_2026.gas.medium * cap.gasUnit : 0)) / 100;
  const scale = Math.max(0, (yearly - fixed) / perScale);
  return { elecKwh: TDCV_2026.elec.medium * scale, gasKwh: hasGas ? TDCV_2026.gas.medium * scale : 0, scale };
}
