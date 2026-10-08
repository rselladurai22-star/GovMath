/**
 * US state income tax (2026) and state sales tax rates (as of July 1, 2026).
 *
 * Income tax: whether and how each state taxes wages comes from
 * state-tax-2026.ts (2026 brackets, deductions and exemptions for every state).
 *
 * Sales tax: the Tax Foundation's "State and Local Sales Tax Rates, Midyear
 * 2026" (state rate and average local rate, July 1, 2026).
 */

import { STATE_TAX, stateTax, topRate } from "./state-tax-2026";
import type { FilingStatus } from "./tax-2026";

export type StateTax = { kind: "none" } | { kind: "flat"; rate: number; note?: string } | { kind: "graduated"; top: number; note?: string };

export type State = { code: string; name: string; income: StateTax; sales: number; localAvg: number };

/** How a state taxes wages, from the 2026 tables in state-tax-2026.ts. */
function incomeOf(code: string): StateTax {
  const g = STATE_TAX[code];
  if (!g) return { kind: "none" };
  if (g.single.length === 1 && !g.joint) return { kind: "flat", rate: g.single[0][1], note: g.note };
  return { kind: "graduated", top: topRate(code), note: g.note };
}

export const STATES: State[] = [
  { code: "AL", name: "Alabama", income: incomeOf("AL"), sales: 0.04, localAvg: 0.0546 },
  { code: "AK", name: "Alaska", income: incomeOf("AK"), sales: 0, localAvg: 0.0182 },
  { code: "AZ", name: "Arizona", income: incomeOf("AZ"), sales: 0.056, localAvg: 0.0294 },
  { code: "AR", name: "Arkansas", income: incomeOf("AR"), sales: 0.065, localAvg: 0.0298 },
  { code: "CA", name: "California", income: incomeOf("CA"), sales: 0.0725, localAvg: 0.0178 },
  { code: "CO", name: "Colorado", income: incomeOf("CO"), sales: 0.029, localAvg: 0.0499 },
  { code: "CT", name: "Connecticut", income: incomeOf("CT"), sales: 0.0635, localAvg: 0 },
  { code: "DE", name: "Delaware", income: incomeOf("DE"), sales: 0, localAvg: 0 },
  { code: "DC", name: "District of Columbia", income: incomeOf("DC"), sales: 0.06, localAvg: 0 },
  { code: "FL", name: "Florida", income: incomeOf("FL"), sales: 0.06, localAvg: 0.0098 },
  { code: "GA", name: "Georgia", income: incomeOf("GA"), sales: 0.04, localAvg: 0.0356 },
  { code: "HI", name: "Hawaii", income: incomeOf("HI"), sales: 0.04, localAvg: 0.005 },
  { code: "ID", name: "Idaho", income: incomeOf("ID"), sales: 0.06, localAvg: 0.0003 },
  { code: "IL", name: "Illinois", income: incomeOf("IL"), sales: 0.0625, localAvg: 0.0273 },
  { code: "IN", name: "Indiana", income: incomeOf("IN"), sales: 0.07, localAvg: 0 },
  { code: "IA", name: "Iowa", income: incomeOf("IA"), sales: 0.06, localAvg: 0.0094 },
  { code: "KS", name: "Kansas", income: incomeOf("KS"), sales: 0.065, localAvg: 0.0221 },
  { code: "KY", name: "Kentucky", income: incomeOf("KY"), sales: 0.06, localAvg: 0 },
  { code: "LA", name: "Louisiana", income: incomeOf("LA"), sales: 0.05, localAvg: 0.0513 },
  { code: "ME", name: "Maine", income: incomeOf("ME"), sales: 0.055, localAvg: 0 },
  { code: "MD", name: "Maryland", income: incomeOf("MD"), sales: 0.06, localAvg: 0 },
  { code: "MA", name: "Massachusetts", income: incomeOf("MA"), sales: 0.0625, localAvg: 0 },
  { code: "MI", name: "Michigan", income: incomeOf("MI"), sales: 0.06, localAvg: 0 },
  { code: "MN", name: "Minnesota", income: incomeOf("MN"), sales: 0.06875, localAvg: 0.0126 },
  { code: "MS", name: "Mississippi", income: incomeOf("MS"), sales: 0.07, localAvg: 0.0006 },
  { code: "MO", name: "Missouri", income: incomeOf("MO"), sales: 0.04225, localAvg: 0.0422 },
  { code: "MT", name: "Montana", income: incomeOf("MT"), sales: 0, localAvg: 0 },
  { code: "NE", name: "Nebraska", income: incomeOf("NE"), sales: 0.055, localAvg: 0.0148 },
  { code: "NV", name: "Nevada", income: incomeOf("NV"), sales: 0.0685, localAvg: 0.0139 },
  { code: "NH", name: "New Hampshire", income: incomeOf("NH"), sales: 0, localAvg: 0 },
  { code: "NJ", name: "New Jersey", income: incomeOf("NJ"), sales: 0.06625, localAvg: 0 },
  { code: "NM", name: "New Mexico", income: incomeOf("NM"), sales: 0.04875, localAvg: 0.028 },
  { code: "NY", name: "New York", income: incomeOf("NY"), sales: 0.04, localAvg: 0.0454 },
  { code: "NC", name: "North Carolina", income: incomeOf("NC"), sales: 0.0475, localAvg: 0.0235 },
  { code: "ND", name: "North Dakota", income: incomeOf("ND"), sales: 0.05, localAvg: 0.0209 },
  { code: "OH", name: "Ohio", income: incomeOf("OH"), sales: 0.0575, localAvg: 0.0154 },
  { code: "OK", name: "Oklahoma", income: incomeOf("OK"), sales: 0.045, localAvg: 0.0456 },
  { code: "OR", name: "Oregon", income: incomeOf("OR"), sales: 0, localAvg: 0 },
  { code: "PA", name: "Pennsylvania", income: incomeOf("PA"), sales: 0.06, localAvg: 0.0034 },
  { code: "RI", name: "Rhode Island", income: incomeOf("RI"), sales: 0.07, localAvg: 0 },
  { code: "SC", name: "South Carolina", income: incomeOf("SC"), sales: 0.06, localAvg: 0.0149 },
  { code: "SD", name: "South Dakota", income: incomeOf("SD"), sales: 0.042, localAvg: 0.0191 },
  { code: "TN", name: "Tennessee", income: incomeOf("TN"), sales: 0.07, localAvg: 0.0261 },
  { code: "TX", name: "Texas", income: incomeOf("TX"), sales: 0.0625, localAvg: 0.0195 },
  { code: "UT", name: "Utah", income: incomeOf("UT"), sales: 0.061, localAvg: 0.0132 },
  { code: "VT", name: "Vermont", income: incomeOf("VT"), sales: 0.06, localAvg: 0.0043 },
  { code: "VA", name: "Virginia", income: incomeOf("VA"), sales: 0.053, localAvg: 0.0047 },
  { code: "WA", name: "Washington", income: incomeOf("WA"), sales: 0.065, localAvg: 0.0307 },
  { code: "WV", name: "West Virginia", income: incomeOf("WV"), sales: 0.06, localAvg: 0.006 },
  { code: "WI", name: "Wisconsin", income: incomeOf("WI"), sales: 0.05, localAvg: 0.0072 },
  { code: "WY", name: "Wyoming", income: incomeOf("WY"), sales: 0.04, localAvg: 0.0139 },
];

export function stateByCode(code: string): State | undefined {
  return STATES.find((s) => s.code === code);
}

/** State income tax on wages (see state-tax-2026.ts for what is included). */
export function stateIncomeTax(code: string, taxableWages: number, status: FilingStatus = "single", dependents = 0, k401 = 0): number {
  return stateTax({ code, wages: taxableWages, status, dependents, k401 }).tax;
}

/**
 * Property tax on owner-occupied homes as a share of value: the median real
 * estate taxes paid (ACS table B25103) divided by the median home value
 * (B25077), American Community Survey 2024 1-year estimates, U.S. Census
 * Bureau, by state. The same measure as the Tax Foundation's 2026 table.
 * Rates vary a lot by county and town; these are statewide typical figures.
 */
export const PROPERTY_TAX: Record<string, number> = { AK: 0.0106, AL: 0.0038, AR: 0.0052, AZ: 0.0043, CA: 0.0071, CO: 0.0049, CT: 0.0166, DC: 0.0063, DE: 0.0047, FL: 0.0075, GA: 0.0074, HI: 0.0027, IA: 0.0129, ID: 0.0043, IL: 0.0192, IN: 0.0074, KS: 0.0125, KY: 0.0071, LA: 0.0053, MA: 0.0100, MD: 0.0095, ME: 0.0091, MI: 0.0118, MN: 0.0102, MO: 0.0079, MS: 0.0065, MT: 0.0069, NC: 0.0061, ND: 0.0096, NE: 0.0142, NH: 0.0146, NJ: 0.0189, NM: 0.0063, NV: 0.0047, NY: 0.0145, OH: 0.0122, OK: 0.0075, OR: 0.0078, PA: 0.0116, RI: 0.0107, SC: 0.0045, SD: 0.0102, TN: 0.0045, TX: 0.0131, UT: 0.0049, VA: 0.0071, VT: 0.0142, WA: 0.0079, WI: 0.0125, WV: 0.0052, WY: 0.0057 };

/** The national figure on the same basis ($3,211 on a $360,600 home). */
export const US_PROPERTY_TAX = 0.0089;

/** A state's typical property tax rate in percent (two decimals), or the US figure for "US". */
export function propertyTaxPct(code: string): number {
  return Math.round((PROPERTY_TAX[code] ?? US_PROPERTY_TAX) * 10_000) / 100;
}
