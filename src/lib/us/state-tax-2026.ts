/**
 * 2026 state income tax on wages for every state and DC.
 *
 * Source: Tax Foundation, "State Individual Income Tax Rates and Brackets,
 * 2026" (spreadsheet published February 2026: rates, brackets, standard
 * deductions and personal exemptions for single and joint filers). Where a
 * state had not yet published its 2026 inflation adjustments the table uses
 * 2025 figures, and so do we. Changed by 2026 laws passed after that table,
 * all retroactive to January 1, 2026: Arkansas (top rate 3.7%), Georgia
 * (HB 463: 4.99%, $15,000/$30,000 standard deduction, $5,000 per dependent),
 * South Carolina (H.4216: 1.99% to $30,000 then 5.21%, a $15,000/$30,000
 * deduction in place of the federal one), Utah (SB 60: 4.45%) and West
 * Virginia (SB 392: every rate cut by 5%, from the WV Tax Division schedule).
 * California's deduction and credits come from the FTB's 2025 tables.
 *
 * Simplifications, shown to visitors in the calculators' assumptions:
 * - Taxable income starts from wages after pre-tax 401(k) and cafeteria plan
 *   deductions (Pennsylvania taxes 401(k) deferrals, so it starts before them).
 * - Head of household uses the single brackets; married filing separately
 *   uses half the joint brackets and deductions.
 * - Phase-outs are included where they reach ordinary incomes (Alabama,
 *   Connecticut, Maryland, Ohio, Utah, Wisconsin, Illinois, Oregon, Rhode
 *   Island); high-income "recapture" rules in Connecticut and New York, and
 *   Missouri's and Oregon's partial deduction of federal tax, are left out.
 * - Local income taxes (cities and counties) are a separate rate field.
 */

/** California State Disability Insurance, withheld on all wages in 2026 (no wage ceiling since 2024). */
export const CA_SDI = 0.013;

import type { FilingStatus } from "./tax-2026";

type Bracket = readonly [floor: number, rate: number];

type Graduated = {
  single: readonly Bracket[];
  /** Joint brackets; omitted when they are the same as single. */
  joint?: readonly Bracket[];
  /** Standard deduction [single, joint]. */
  ded?: readonly [number, number];
  /** Personal exemptions taken off income [single, joint, each dependent]. */
  ex?: readonly [number, number, number];
  /** Personal exemptions given as tax credits [single, joint, each dependent]. */
  cr?: readonly [number, number, number];
  /** Short notes for the result. */
  note?: string;
};

const flat = (rate: number, extra: Omit<Graduated, "single" | "joint"> = {}, floor = 0): Graduated => ({ single: [[floor, rate]], ...extra });
const double = (b: readonly Bracket[]): Bracket[] => b.map(([f, r]) => [f * 2, r]);

export const NO_INCOME_TAX = ["AK", "FL", "NV", "NH", "SD", "TN", "TX", "WA", "WY"] as const;

const CA_SINGLE: Bracket[] = [[0, 0.01], [11_079, 0.02], [26_264, 0.04], [41_452, 0.06], [57_542, 0.08], [72_724, 0.093], [371_479, 0.103], [445_771, 0.113], [742_953, 0.123], [1_000_000, 0.133]];
const HI_SINGLE: Bracket[] = [[0, 0.014], [9_600, 0.032], [14_400, 0.055], [19_200, 0.064], [24_000, 0.068], [36_000, 0.072], [48_000, 0.076], [125_000, 0.079], [175_000, 0.0825], [225_000, 0.09], [275_000, 0.1], [325_000, 0.11]];
const CT_SINGLE: Bracket[] = [[0, 0.02], [10_000, 0.045], [50_000, 0.055], [100_000, 0.06], [200_000, 0.065], [250_000, 0.069], [500_000, 0.0699]];
const OR_SINGLE: Bracket[] = [[0, 0.0475], [4_550, 0.0675], [11_400, 0.0875], [125_000, 0.099]];

export const STATE_TAX: Record<string, Graduated> = {
  AL: { single: [[0, 0.02], [500, 0.04], [3_000, 0.05]], joint: [[0, 0.02], [1_000, 0.04], [6_000, 0.05]], ded: [3_000, 8_500], ex: [1_500, 3_000, 1_000], note: "Alabama lets you deduct the federal income tax you pay." },
  AZ: flat(0.025, { ded: [8_350, 16_700], cr: [0, 0, 100] }),
  AR: { single: [[0, 0.02], [4_600, 0.037]], ded: [2_470, 4_940], cr: [29, 58, 29], note: "Arkansas uses lower rates for net income up to about $92,000, so this may be a little high." },
  CA: { single: CA_SINGLE, joint: [[0, 0.01], [22_158, 0.02], [52_528, 0.04], [82_904, 0.06], [115_084, 0.08], [145_448, 0.093], [742_958, 0.103], [891_542, 0.113], [1_000_000, 0.123], [1_485_906, 0.133]], ded: [5_706, 11_412], cr: [153, 306, 475], note: "California also takes 1.3% of wages for State Disability Insurance (SDI), included in the state line." },
  CO: flat(0.044, { ded: [16_100, 32_200] }),
  CT: { single: CT_SINGLE, joint: double(CT_SINGLE), ex: [15_000, 24_000, 0], note: "Connecticut's personal exemption phases out from $30,000 ($48,000 joint)." },
  DE: { single: [[2_000, 0.022], [5_000, 0.039], [10_000, 0.048], [20_000, 0.052], [25_000, 0.0555], [60_000, 0.066]], ded: [3_250, 6_500], cr: [110, 220, 110] },
  DC: { single: [[0, 0.04], [10_000, 0.06], [40_000, 0.065], [60_000, 0.085], [250_000, 0.0925], [500_000, 0.0975], [1_000_000, 0.1075]], ded: [16_100, 32_200] },
  GA: flat(0.0499, { ded: [15_000, 30_000], ex: [0, 0, 5_000] }),
  HI: { single: HI_SINGLE, joint: double(HI_SINGLE), ded: [4_400, 8_800], ex: [1_144, 2_288, 1_144] },
  ID: { single: [[4_811, 0.053]], joint: [[9_622, 0.053]], ded: [16_100, 32_200] },
  IL: flat(0.0495, { ex: [2_925, 5_850, 2_925] }),
  IN: flat(0.0295, { ex: [1_000, 2_000, 2_500], note: "Every Indiana county adds a local income tax, about 1% to 3%." }),
  IA: flat(0.038, { ded: [16_100, 32_200], cr: [40, 80, 40] }),
  KS: { single: [[0, 0.052], [23_000, 0.0558]], joint: [[0, 0.052], [46_000, 0.0558]], ded: [3_605, 8_240], ex: [9_160, 18_320, 2_320] },
  KY: flat(0.035, { ded: [3_360, 3_360], note: "Many Kentucky cities and counties add an occupational tax." }),
  LA: flat(0.03, { ded: [12_875, 25_750] }),
  ME: { single: [[0, 0.058], [27_399, 0.0675], [64_849, 0.0715]], joint: [[0, 0.058], [54_849, 0.0675], [129_749, 0.0715]], ded: [8_350, 16_700], ex: [5_300, 10_600, 0], cr: [0, 0, 305] },
  MD: { single: [[0, 0.02], [1_000, 0.03], [2_000, 0.04], [3_000, 0.0475], [100_000, 0.05], [125_000, 0.0525], [150_000, 0.055], [250_000, 0.0575], [500_000, 0.0625], [1_000_000, 0.065]], joint: [[0, 0.02], [1_000, 0.03], [2_000, 0.04], [3_000, 0.0475], [150_000, 0.05], [175_000, 0.0525], [225_000, 0.055], [300_000, 0.0575], [600_000, 0.0625], [1_200_000, 0.065]], ded: [3_350, 6_700], ex: [3_200, 6_400, 3_200], note: "Maryland counties add a local income tax of about 2.25% to 3.3%: enter it as local tax." },
  MA: { single: [[0, 0.05], [1_083_150, 0.09]], ex: [4_400, 8_800, 1_000] },
  MI: flat(0.0425, { ex: [5_900, 11_800, 5_900], note: "Some Michigan cities, such as Detroit, add a city income tax." }),
  MN: { single: [[0, 0.0535], [33_310, 0.068], [109_430, 0.0785], [203_150, 0.0985]], joint: [[0, 0.0535], [48_700, 0.068], [193_480, 0.0785], [337_930, 0.0985]], ded: [15_300, 30_600], ex: [0, 0, 5_300] },
  MS: { single: [[10_000, 0.04]], ded: [2_300, 4_600], ex: [6_000, 12_000, 1_500] },
  MO: { single: [[1_348, 0.02], [2_696, 0.025], [4_044, 0.03], [5_392, 0.035], [6_740, 0.04], [8_088, 0.045], [9_436, 0.047]], ded: [16_100, 32_200] },
  MT: { single: [[0, 0.047], [47_500, 0.0565]], joint: [[0, 0.047], [95_000, 0.0565]], ded: [16_100, 32_200] },
  NE: { single: [[0, 0.0246], [4_130, 0.0351], [24_760, 0.0455]], joint: [[0, 0.0246], [8_250, 0.0351], [49_530, 0.0455]], ded: [8_850, 17_700], cr: [176, 352, 176] },
  NJ: { single: [[0, 0.014], [20_000, 0.0175], [35_000, 0.035], [40_000, 0.05525], [75_000, 0.0637], [500_000, 0.0897], [1_000_000, 0.1075]], joint: [[0, 0.014], [20_000, 0.0175], [50_000, 0.0245], [70_000, 0.035], [80_000, 0.05525], [150_000, 0.0637], [500_000, 0.0897], [1_000_000, 0.1075]], ex: [1_000, 2_000, 1_500] },
  NM: { single: [[0, 0.015], [5_500, 0.032], [16_500, 0.043], [33_500, 0.047], [66_500, 0.049], [210_000, 0.059]], joint: [[0, 0.015], [8_000, 0.032], [25_000, 0.043], [50_000, 0.047], [100_000, 0.049], [315_000, 0.059]], ded: [16_100, 32_200], ex: [0, 0, 4_000] },
  NY: { single: [[0, 0.039], [8_500, 0.044], [11_700, 0.0515], [13_900, 0.054], [80_650, 0.059], [215_400, 0.0685], [1_077_550, 0.0965], [5_000_000, 0.103], [25_000_000, 0.109]], joint: [[0, 0.039], [17_150, 0.044], [23_600, 0.0515], [27_900, 0.054], [161_550, 0.059], [323_200, 0.0685], [2_155_350, 0.0965], [5_000_000, 0.103], [25_000_000, 0.109]], ded: [8_000, 16_050], ex: [0, 0, 1_000], note: "New York City and Yonkers add a local income tax: enter it as local tax (NYC is about 3.1% to 3.9%)." },
  NC: flat(0.0399, { ded: [12_750, 25_500] }),
  ND: { single: [[48_475, 0.0195], [244_825, 0.025]], joint: [[80_975, 0.0195], [298_075, 0.025]], ded: [16_100, 32_200] },
  OH: { single: [[26_050, 0.0275]], ex: [2_400, 4_800, 2_400], note: "Many Ohio cities add a local income tax of about 1% to 3%." },
  OK: { single: [[3_750, 0.025], [4_900, 0.035], [7_200, 0.045]], joint: [[7_500, 0.025], [9_800, 0.035], [14_400, 0.045]], ded: [6_350, 12_700], ex: [1_000, 2_000, 1_000] },
  OR: { single: OR_SINGLE, joint: double(OR_SINGLE), ded: [2_910, 5_820], cr: [256, 512, 256], note: "Oregon also lets you subtract part of your federal tax, which we leave out, so this may be a little high." },
  PA: flat(0.0307, { note: "Pennsylvania taxes 401(k) contributions, and most towns add a local earned income tax of about 1% to 3.9%." }),
  RI: { single: [[0, 0.0375], [82_050, 0.0475], [186_450, 0.0599]], ded: [11_200, 22_400], ex: [5_250, 10_500, 5_250] },
  SC: { single: [[0, 0.0199], [30_000, 0.0521]], ded: [15_000, 30_000] },
  UT: flat(0.0445),
  VT: { single: [[0, 0.0335], [49_400, 0.066], [119_700, 0.076], [249_700, 0.0875]], joint: [[0, 0.0335], [82_500, 0.066], [199_450, 0.076], [304_000, 0.0875]], ded: [7_650, 15_300], ex: [5_300, 10_600, 5_300] },
  VA: { single: [[0, 0.02], [3_000, 0.03], [5_000, 0.05], [17_000, 0.0575]], ded: [8_750, 17_500], ex: [930, 1_860, 930] },
  WV: { single: [[0, 0.0211], [10_000, 0.0281], [25_000, 0.0316], [40_000, 0.0422], [60_000, 0.0458]], ex: [2_000, 4_000, 2_000] },
  WI: { single: [[0, 0.035], [15_110, 0.044], [51_950, 0.053], [332_720, 0.0765]], joint: [[0, 0.035], [20_150, 0.044], [69_260, 0.053], [443_630, 0.0765]], ded: [13_960, 25_840], ex: [700, 1_400, 700] },
};

export type StateTaxInput = {
  code: string;
  /** Wages after pre-tax 401(k) and cafeteria plan deductions. */
  wages: number;
  /** Traditional 401(k) deferrals already taken off `wages` (Pennsylvania adds them back). */
  k401?: number;
  status: FilingStatus;
  dependents: number;
  /** Federal income tax, for Alabama's deduction. */
  federalTax?: number;
};

export type StateTaxResult = {
  tax: number;
  taxable: number;
  /** Rate on the next dollar of wages. */
  marginal: number;
  deduction: number;
  exemptions: number;
  credits: number;
  kind: "none" | "flat" | "graduated";
};

function bracketsFor(g: Graduated, status: FilingStatus): Bracket[] {
  const joint = g.joint ?? g.single;
  if (status === "mfj") return [...joint];
  if (status === "mfs") return joint.map(([f, r]) => [f / 2, r]);
  return [...g.single];
}

function taxOn(income: number, brackets: Bracket[]): { tax: number; marginal: number } {
  let tax = 0;
  let marginal = 0;
  brackets.forEach(([floor, rate], i) => {
    const top = i + 1 < brackets.length ? brackets[i + 1][0] : Infinity;
    if (income > floor) {
      tax += (Math.min(income, top) - floor) * rate;
      marginal = rate;
    }
  });
  return { tax, marginal };
}

/** A [single, joint] pair for a filing status (separate filers get half the joint amount). */
function pick(pair: readonly [number, number] | undefined, status: FilingStatus): number {
  if (!pair) return 0;
  if (status === "mfj") return pair[1];
  if (status === "mfs") return pair[1] / 2;
  return pair[0];
}

/** Share left after a linear phase-out from `start` to `end`. */
const kept = (income: number, start: number, end: number) => Math.max(0, Math.min(1, (end - income) / (end - start)));

export function stateTax(i: StateTaxInput): StateTaxResult {
  const g = STATE_TAX[i.code];
  if (!g) return { tax: 0, taxable: 0, marginal: 0, deduction: 0, exemptions: 0, credits: 0, kind: "none" };
  const s = i.status;
  const joint = s === "mfj";
  const deps = Math.max(0, Math.floor(i.dependents));
  const agi = Math.max(0, i.wages) + (i.code === "PA" ? Math.max(0, i.k401 ?? 0) : 0);

  let deduction = pick(g.ded, s);
  if (i.code === "SC" && s === "hoh") deduction = 22_500;
  if (i.code === "AL") {
    // Alabama's standard deduction slides down with income; dependents get $1,000, $500 or $300.
    deduction = joint ? Math.max(5_000, 8_500 - Math.ceil(Math.max(0, agi - 25_999) / 500) * 175) : Math.max(2_500, 3_000 - Math.ceil(Math.max(0, agi - 25_499) / 500) * 25);
    deduction += Math.max(0, i.federalTax ?? 0);
  }
  if (i.code === "WI") deduction *= joint ? kept(agi, 29_039, 159_690) : kept(agi, 20_119, 136_453);

  const ex = g.ex ?? [0, 0, 0];
  let personal = s === "mfj" ? ex[1] : s === "mfs" ? ex[1] / 2 : ex[0];
  let perDep = ex[2];
  if (i.code === "AL") perDep = agi <= 50_000 ? 1_000 : agi <= 100_000 ? 500 : 300;
  if (i.code === "NM") perDep = deps > 1 ? (4_000 * (deps - 1)) / deps : 0;
  if (i.code === "CT") personal = Math.max(0, personal - Math.ceil(Math.max(0, agi - (joint ? 48_000 : 30_000)) / 1_000) * 1_000);
  if (i.code === "MD") {
    const k = joint ? kept(agi, 150_000, 200_000) : kept(agi, 100_000, 150_000);
    personal *= k;
    perDep *= k;
  }
  if (i.code === "OH") {
    const each = agi <= 40_000 ? 2_400 : agi <= 80_000 ? 2_150 : agi < 500_000 ? 1_900 : 0;
    personal = each * (joint ? 2 : 1);
    perDep = each;
  }
  if (i.code === "IL" && agi > (joint ? 500_000 : 250_000)) personal = perDep = 0;
  if (i.code === "RI") {
    const k = kept(agi, 261_000, 290_800);
    deduction *= k;
    personal *= k;
    perDep *= k;
  }
  const exemptions = personal + perDep * deps;
  const taxable = Math.max(0, agi - deduction - exemptions);
  const { tax: gross, marginal } = taxOn(taxable, bracketsFor(g, s));

  let credits = 0;
  if (g.cr) credits = (s === "mfj" ? g.cr[1] : s === "mfs" ? g.cr[1] / 2 : g.cr[0]) + g.cr[2] * deps;
  if (i.code === "OR" && agi > (joint ? 200_000 : 100_000)) credits = 0;
  if (i.code === "UT") {
    // 6% of the federal standard deduction plus $2,111 per dependent, less 1.3% of income over the base.
    const base = (joint ? 32_200 : s === "hoh" ? 24_150 : 16_100) + 2_111 * deps;
    const start = joint ? 36_426 : 18_213;
    credits = Math.max(0, base * 0.06 - Math.max(0, agi - start) * 0.013);
  }
  const tax = Math.max(0, gross - credits);
  const kind = g.single.length === 1 && !g.joint ? "flat" : "graduated";
  return { tax, taxable, marginal: tax > 0 ? marginal : 0, deduction, exemptions, credits, kind };
}

/** The top rate, for summaries. */
export function topRate(code: string): number {
  const g = STATE_TAX[code];
  if (!g) return 0;
  return Math.max(...g.single.map(([, r]) => r), ...(g.joint ?? []).map(([, r]) => r));
}
