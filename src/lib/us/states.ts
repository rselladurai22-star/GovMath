/**
 * US state income tax (2026) and state sales tax rates (as of July 1, 2026).
 *
 * Income tax: states with no tax on wages, and the flat rates in force on
 * January 1, 2026, from the Tax Foundation's "State Individual Income Tax
 * Rates and Brackets, 2026", checked against a second source (Georgia's 4.99%
 * comes from its 2026 law, HB 111 as amended). States with graduated rates
 * are marked "ask": the calculators ask for the rate instead of
 * guessing, because their brackets and credits vary too much to summarize.
 * Utah has a flat rate too, but its 2026 rate was not confirmed when this was
 * written, so it also asks.
 * Ohio taxes non-business income over $26,050 at a flat 2.75%.
 *
 * Sales tax: the Tax Foundation's "State and Local Sales Tax Rates, Midyear
 * 2026" (state rate and average local rate, July 1, 2026).
 */

export type StateTax =
  | { kind: "none" }
  | { kind: "flat"; rate: number; note?: string }
  | { kind: "ask" };

export type State = { code: string; name: string; income: StateTax; sales: number; localAvg: number };

const none: StateTax = { kind: "none" };
const flat = (rate: number, note?: string): StateTax => ({ kind: "flat", rate, note });
const ask: StateTax = { kind: "ask" };

export const STATES: State[] = [
  { code: "AL", name: "Alabama", income: ask, sales: 0.04, localAvg: 0.0546 },
  { code: "AK", name: "Alaska", income: none, sales: 0, localAvg: 0.0182 },
  { code: "AZ", name: "Arizona", income: flat(0.025), sales: 0.056, localAvg: 0.0294 },
  { code: "AR", name: "Arkansas", income: ask, sales: 0.065, localAvg: 0.0298 },
  { code: "CA", name: "California", income: ask, sales: 0.0725, localAvg: 0.0178 },
  { code: "CO", name: "Colorado", income: flat(0.044), sales: 0.029, localAvg: 0.0499 },
  { code: "CT", name: "Connecticut", income: ask, sales: 0.0635, localAvg: 0 },
  { code: "DE", name: "Delaware", income: ask, sales: 0, localAvg: 0 },
  { code: "DC", name: "District of Columbia", income: ask, sales: 0.06, localAvg: 0 },
  { code: "FL", name: "Florida", income: none, sales: 0.06, localAvg: 0.0098 },
  { code: "GA", name: "Georgia", income: flat(0.0499), sales: 0.04, localAvg: 0.0356 },
  { code: "HI", name: "Hawaii", income: ask, sales: 0.04, localAvg: 0.005 },
  { code: "ID", name: "Idaho", income: flat(0.053), sales: 0.06, localAvg: 0.0003 },
  { code: "IL", name: "Illinois", income: flat(0.0495), sales: 0.0625, localAvg: 0.0273 },
  { code: "IN", name: "Indiana", income: flat(0.0295, "Most counties add a local income tax of about 1% to 3%."), sales: 0.07, localAvg: 0 },
  { code: "IA", name: "Iowa", income: flat(0.038), sales: 0.06, localAvg: 0.0094 },
  { code: "KS", name: "Kansas", income: ask, sales: 0.065, localAvg: 0.0221 },
  { code: "KY", name: "Kentucky", income: flat(0.035, "Many cities and counties add an occupational tax."), sales: 0.06, localAvg: 0 },
  { code: "LA", name: "Louisiana", income: flat(0.03), sales: 0.05, localAvg: 0.0513 },
  { code: "ME", name: "Maine", income: ask, sales: 0.055, localAvg: 0 },
  { code: "MD", name: "Maryland", income: ask, sales: 0.06, localAvg: 0 },
  { code: "MA", name: "Massachusetts", income: flat(0.05, "Income over about $1.1 million pays an extra 4%."), sales: 0.0625, localAvg: 0 },
  { code: "MI", name: "Michigan", income: flat(0.0425, "Some cities, such as Detroit, add a city income tax."), sales: 0.06, localAvg: 0 },
  { code: "MN", name: "Minnesota", income: ask, sales: 0.06875, localAvg: 0.0126 },
  { code: "MS", name: "Mississippi", income: flat(0.04, "The first $10,000 of taxable income is tax-free."), sales: 0.07, localAvg: 0.0006 },
  { code: "MO", name: "Missouri", income: ask, sales: 0.04225, localAvg: 0.0422 },
  { code: "MT", name: "Montana", income: ask, sales: 0, localAvg: 0 },
  { code: "NE", name: "Nebraska", income: ask, sales: 0.055, localAvg: 0.0148 },
  { code: "NV", name: "Nevada", income: none, sales: 0.0685, localAvg: 0.0139 },
  { code: "NH", name: "New Hampshire", income: none, sales: 0, localAvg: 0 },
  { code: "NJ", name: "New Jersey", income: ask, sales: 0.06625, localAvg: 0 },
  { code: "NM", name: "New Mexico", income: ask, sales: 0.04875, localAvg: 0.028 },
  { code: "NY", name: "New York", income: ask, sales: 0.04, localAvg: 0.0454 },
  { code: "NC", name: "North Carolina", income: flat(0.0399), sales: 0.0475, localAvg: 0.0235 },
  { code: "ND", name: "North Dakota", income: ask, sales: 0.05, localAvg: 0.0209 },
  { code: "OH", name: "Ohio", income: flat(0.0275, "Applies to income over $26,050; many cities add a local income tax."), sales: 0.0575, localAvg: 0.0154 },
  { code: "OK", name: "Oklahoma", income: ask, sales: 0.045, localAvg: 0.0456 },
  { code: "OR", name: "Oregon", income: ask, sales: 0, localAvg: 0 },
  { code: "PA", name: "Pennsylvania", income: flat(0.0307, "Most municipalities add a local earned income tax."), sales: 0.06, localAvg: 0.0034 },
  { code: "RI", name: "Rhode Island", income: ask, sales: 0.07, localAvg: 0 },
  { code: "SC", name: "South Carolina", income: ask, sales: 0.06, localAvg: 0.0149 },
  { code: "SD", name: "South Dakota", income: none, sales: 0.042, localAvg: 0.0191 },
  { code: "TN", name: "Tennessee", income: none, sales: 0.07, localAvg: 0.0261 },
  { code: "TX", name: "Texas", income: none, sales: 0.0625, localAvg: 0.0195 },
  { code: "UT", name: "Utah", income: ask, sales: 0.061, localAvg: 0.0132 },
  { code: "VT", name: "Vermont", income: ask, sales: 0.06, localAvg: 0.0043 },
  { code: "VA", name: "Virginia", income: ask, sales: 0.053, localAvg: 0.0047 },
  { code: "WA", name: "Washington", income: none, sales: 0.065, localAvg: 0.0307 },
  { code: "WV", name: "West Virginia", income: ask, sales: 0.06, localAvg: 0.006 },
  { code: "WI", name: "Wisconsin", income: ask, sales: 0.05, localAvg: 0.0072 },
  { code: "WY", name: "Wyoming", income: none, sales: 0.04, localAvg: 0.0139 },
];

export function stateByCode(code: string): State | undefined {
  return STATES.find((s) => s.code === code);
}

/**
 * State income tax on wages for the paycheck calculators. No-tax states pay
 * nothing; flat-rate states use their rate on wages after pre-tax deductions
 * (Ohio only above $26,050, Mississippi above $10,000); the other states use
 * the rate the visitor enters.
 */
export function stateIncomeTax(code: string, taxableWages: number, enteredRate: number): number {
  const s = stateByCode(code);
  const w = Math.max(0, taxableWages);
  if (!s || s.income.kind === "none") return 0;
  if (s.income.kind === "ask") return w * Math.max(0, enteredRate);
  if (code === "OH") return Math.max(0, w - 26_050) * s.income.rate;
  if (code === "MS") return Math.max(0, w - 10_000) * s.income.rate;
  return w * s.income.rate;
}
