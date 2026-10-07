/**
 * US federal income tax and payroll tax for tax year 2026.
 *
 * Sources: IRS Rev. Proc. 2025-32 (brackets, standard deduction, additional
 * standard deduction, capital gains thresholds, child tax credit refundable
 * amount); IRS Notice 2025-67 and IR-2025-111 (401(k), IRA, Roth IRA
 * phase-outs); IRS Rev. Proc. 2025-19 (HSA); SSA 2026 fact sheet (wage base
 * $184,500); the One Big Beautiful Bill Act (Public Law 119-21: child tax
 * credit $2,200, senior deduction, tips and overtime deductions for 2025 to
 * 2028). Pure functions; every figure quoted in a guide comes from here.
 */

export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export const FILING_LABEL: Record<FilingStatus, string> = {
  single: "Single",
  mfj: "Married filing jointly",
  mfs: "Married filing separately",
  hoh: "Head of household",
};

/** Top of each bracket (taxable income), in order: 10%, 12%, 22%, 24%, 32%, 35%; 37% above. */
const TOPS: Record<FilingStatus, number[]> = {
  single: [12_400, 50_400, 105_700, 201_775, 256_225, 640_600],
  mfj: [24_800, 100_800, 211_400, 403_550, 512_450, 768_700],
  mfs: [12_400, 50_400, 105_700, 201_775, 256_225, 384_350],
  hoh: [17_700, 67_450, 105_700, 201_775, 256_225, 640_600],
};
export const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];

export const US_2026 = {
  standardDeduction: { single: 16_100, mfj: 32_200, mfs: 16_100, hoh: 24_150 } as Record<FilingStatus, number>,
  /** Extra standard deduction for each person who is 65 or older, and again for each who is blind. */
  additionalDeduction: { single: 2_050, hoh: 2_050, mfj: 1_650, mfs: 1_650 } as Record<FilingStatus, number>,
  /** Senior deduction (2025 to 2028): $6,000 a person 65 or over, less 6% of modified AGI above the threshold. */
  senior: { amount: 6_000, rate: 0.06, start: { single: 75_000, hoh: 75_000, mfj: 150_000, mfs: Infinity } as Record<FilingStatus, number> },
  socialSecurity: { rate: 0.062, wageBase: 184_500 },
  medicare: { rate: 0.0145, additionalRate: 0.009, additionalStart: { single: 200_000, hoh: 200_000, mfj: 250_000, mfs: 125_000 } as Record<FilingStatus, number> },
  /** Long-term capital gains: the 0% rate up to the first figure, 15% up to the second, 20% above (taxable income). */
  capitalGains: {
    single: [49_450, 545_500],
    mfj: [98_900, 613_700],
    mfs: [49_450, 306_850],
    hoh: [66_200, 579_600],
  } as Record<FilingStatus, [number, number]>,
  /** Net investment income tax: 3.8% above these modified AGI thresholds (not indexed). */
  niit: { rate: 0.038, start: { single: 200_000, hoh: 200_000, mfj: 250_000, mfs: 125_000 } as Record<FilingStatus, number> },
  childTaxCredit: {
    perChild: 2_200,
    refundable: 1_700,
    otherDependent: 500,
    phaseStart: { single: 200_000, hoh: 200_000, mfs: 200_000, mfj: 400_000 } as Record<FilingStatus, number>,
    /** $50 less for each $1,000 (or part) of modified AGI above the start. */
    phaseStep: 50,
  },
  /** Deductions for qualified overtime premium and qualified tips (2025 to 2028), each reduced by $100 per $1,000 of MAGI above the start. */
  overtime: { max: { single: 12_500, hoh: 12_500, mfs: 0, mfj: 25_000 } as Record<FilingStatus, number> },
  tips: { max: 25_000 },
  obbbaPhaseStart: { single: 150_000, hoh: 150_000, mfs: 150_000, mfj: 300_000 } as Record<FilingStatus, number>,
  limits: {
    k401: 24_500,
    k401CatchUp: 8_000,
    /** Ages 60 to 63 instead of the usual catch-up. */
    k401SuperCatchUp: 11_250,
    ira: 7_500,
    iraCatchUp: 1_100,
    hsaSelf: 4_400,
    hsaFamily: 8_750,
    hsaCatchUp: 1_000,
  },
  /** Roth IRA contribution phase-out ranges (modified AGI). */
  rothPhaseOut: { single: [153_000, 168_000], hoh: [153_000, 168_000], mfj: [242_000, 252_000], mfs: [0, 10_000] } as Record<FilingStatus, [number, number]>,
  /** The federal minimum wage (Fair Labor Standards Act). */
  minimumWage: 7.25,
} as const;

export type Band = { rate: number; from: number; to: number; income: number; tax: number };

/** Ordinary income tax on taxable income, band by band. */
export function ordinaryTax(taxable: number, status: FilingStatus): { tax: number; bands: Band[]; marginal: number } {
  const t = Math.max(0, taxable);
  const tops = [...TOPS[status], Infinity];
  const bands: Band[] = [];
  let from = 0;
  let tax = 0;
  let marginal = RATES[0];
  tops.forEach((to, i) => {
    const income = Math.max(0, Math.min(t, to) - from);
    const owed = income * RATES[i];
    bands.push({ rate: RATES[i], from, to, income, tax: owed });
    tax += owed;
    if (t > from) marginal = RATES[i];
    from = to;
  });
  return { tax, bands, marginal };
}

/** The bracket tops for a filing status (for tables and charts). */
export function bracketTops(status: FilingStatus): number[] {
  return [...TOPS[status]];
}

/** Standard deduction, with the extra amount for each person 65+ and each person who is blind. */
export function standardDeduction(status: FilingStatus, over65 = 0, blind = 0): number {
  return US_2026.standardDeduction[status] + (Math.max(0, over65) + Math.max(0, blind)) * US_2026.additionalDeduction[status];
}

/** The senior deduction (2025 to 2028) for `people` aged 65 or over. */
export function seniorDeduction(status: FilingStatus, magi: number, people: number): number {
  const s = US_2026.senior;
  const each = Math.max(0, s.amount - Math.max(0, magi - s.start[status]) * s.rate);
  return each * Math.max(0, Math.min(people, status === "mfj" ? 2 : 1));
}

/** $100 off for each $1,000 (or part) of MAGI above the start, used by the tips and overtime deductions. */
function obbbaCap(max: number, magi: number, status: FilingStatus): number {
  const over = Math.max(0, magi - US_2026.obbbaPhaseStart[status]);
  return Math.max(0, max - Math.ceil(over / 1_000) * 100);
}

/** Deduction for the overtime premium (the "half" in time-and-a-half). Not available married filing separately. */
export function overtimeDeduction(premium: number, magi: number, status: FilingStatus): number {
  return Math.min(Math.max(0, premium), obbbaCap(US_2026.overtime.max[status], magi, status));
}

/** Deduction for qualified tips. Not available married filing separately. */
export function tipsDeduction(tips: number, magi: number, status: FilingStatus): number {
  if (status === "mfs") return 0;
  return Math.min(Math.max(0, tips), obbbaCap(US_2026.tips.max, magi, status));
}

export type Fica = { socialSecurity: number; medicare: number; additionalMedicare: number; total: number };

/** Employee Social Security and Medicare on wages (W-2 box 3 and 5 wages). */
export function fica(wages: number, status: FilingStatus): Fica {
  const w = Math.max(0, wages);
  const socialSecurity = Math.min(w, US_2026.socialSecurity.wageBase) * US_2026.socialSecurity.rate;
  const medicare = w * US_2026.medicare.rate;
  const additionalMedicare = Math.max(0, w - US_2026.medicare.additionalStart[status]) * US_2026.medicare.additionalRate;
  return { socialSecurity, medicare, additionalMedicare, total: socialSecurity + medicare + additionalMedicare };
}

export type SelfEmployment = {
  /** Net earnings from self-employment: 92.35% of net profit. */
  earnings: number;
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  /** Self-employment tax (Schedule SE), without the additional Medicare tax. */
  seTax: number;
  /** Half of the SE tax, deducted above the line. */
  deduction: number;
};

/** Self-employment tax on net profit, after any W-2 wages that already used part of the wage base. */
export function selfEmploymentTax(netProfit: number, status: FilingStatus, w2Wages = 0): SelfEmployment {
  const earnings = Math.max(0, netProfit) * 0.9235;
  if (earnings < 400) return { earnings, socialSecurity: 0, medicare: 0, additionalMedicare: 0, seTax: 0, deduction: 0 };
  const room = Math.max(0, US_2026.socialSecurity.wageBase - Math.max(0, w2Wages));
  const socialSecurity = Math.min(earnings, room) * 0.124;
  const medicare = earnings * 0.029;
  const threshold = Math.max(0, US_2026.medicare.additionalStart[status] - Math.max(0, w2Wages));
  const additionalMedicare = Math.max(0, earnings - threshold) * US_2026.medicare.additionalRate;
  const seTax = socialSecurity + medicare;
  return { earnings, socialSecurity, medicare, additionalMedicare, seTax, deduction: seTax / 2 };
}

export type CapitalGainsTax = { zero: number; fifteen: number; twenty: number; tax: number };

/** Tax on long-term gains and qualified dividends, stacked on top of ordinary taxable income. */
export function longTermGainsTax(ordinaryTaxable: number, gains: number, status: FilingStatus): CapitalGainsTax {
  const [zeroTop, fifteenTop] = US_2026.capitalGains[status];
  const base = Math.max(0, ordinaryTaxable);
  const g = Math.max(0, gains);
  const zero = Math.max(0, Math.min(base + g, zeroTop) - base);
  const fifteen = Math.max(0, Math.min(base + g, fifteenTop) - Math.max(base, zeroTop));
  const twenty = g - zero - fifteen;
  return { zero, fifteen, twenty, tax: fifteen * 0.15 + twenty * 0.2 };
}

/** Net investment income tax: 3.8% of the smaller of investment income and MAGI above the threshold. */
export function niit(magi: number, investmentIncome: number, status: FilingStatus): number {
  return Math.max(0, Math.min(Math.max(0, investmentIncome), Math.max(0, magi - US_2026.niit.start[status]))) * US_2026.niit.rate;
}

export type ChildCredit = { credit: number; nonRefundable: number; refundable: number };

/**
 * Child tax credit ($2,200 a child under 17) and the $500 credit for other
 * dependants, after the phase-out. The non-refundable part is limited to the
 * tax; up to $1,700 a child of the rest is refundable (15% of earned income
 * above $2,500).
 */
export function childTaxCredit(children: number, otherDependents: number, magi: number, status: FilingStatus, taxBeforeCredits: number, earnedIncome: number): ChildCredit {
  const c = US_2026.childTaxCredit;
  const full = Math.max(0, children) * c.perChild + Math.max(0, otherDependents) * c.otherDependent;
  const cut = Math.ceil(Math.max(0, magi - c.phaseStart[status]) / 1_000) * c.phaseStep;
  const credit = Math.max(0, full - cut);
  const nonRefundable = Math.min(credit, Math.max(0, taxBeforeCredits));
  const childPart = Math.max(0, Math.min(credit, Math.max(0, children) * c.perChild) - nonRefundable);
  const refundable = Math.min(childPart, Math.max(0, children) * c.refundable, Math.max(0, earnedIncome - 2_500) * 0.15);
  return { credit, nonRefundable, refundable };
}

export type ReturnInput = {
  status: FilingStatus;
  wages: number;
  /** Interest, short-term gains, retirement income and other ordinary income. */
  otherIncome: number;
  /** Long-term capital gains and qualified dividends. */
  longTermGains: number;
  /** Net self-employment profit. */
  selfEmployment: number;
  /** Pre-tax 401(k), HSA and similar contributions taken from wages. */
  preTax: number;
  /** IRA, student loan interest and other above-the-line deductions. */
  adjustments: number;
  /** Itemized deductions; the larger of these and the standard deduction is used. */
  itemized: number;
  over65: number;
  blind: number;
  children: number;
  otherDependents: number;
  /** Qualified overtime premium and qualified tips, for the 2025–2028 deductions. */
  overtimePremium: number;
  tips: number;
  /** Federal income tax already withheld or paid. */
  withheld: number;
};

export type ReturnResult = {
  grossIncome: number;
  agi: number;
  deduction: number;
  deductionType: "standard" | "itemized";
  seniorDeduction: number;
  overtimeDeduction: number;
  tipsDeduction: number;
  taxable: number;
  ordinaryTaxable: number;
  ordinary: { tax: number; bands: Band[]; marginal: number };
  gains: CapitalGainsTax;
  incomeTax: number;
  credits: ChildCredit;
  se: SelfEmployment;
  niit: number;
  additionalMedicare: number;
  totalTax: number;
  /** Positive: refund. Negative: amount still owed. */
  refund: number;
  effectiveRate: number;
};

/** A simplified Form 1040 for 2026. */
export function federalReturn(i: ReturnInput): ReturnResult {
  const s = i.status;
  const se = selfEmploymentTax(i.selfEmployment, s, i.wages);
  const wagesAfterPreTax = Math.max(0, i.wages - i.preTax);
  const grossIncome = wagesAfterPreTax + Math.max(0, i.otherIncome) + Math.max(0, i.longTermGains) + Math.max(0, i.selfEmployment);
  const agi = Math.max(0, grossIncome - se.deduction - Math.max(0, i.adjustments));
  const std = standardDeduction(s, i.over65, i.blind);
  const deductionType = i.itemized > std ? "itemized" : "standard";
  const deduction = Math.max(std, Math.max(0, i.itemized));
  const senior = seniorDeduction(s, agi, i.over65);
  const ot = s === "mfs" ? 0 : overtimeDeduction(i.overtimePremium, agi, s);
  const tp = tipsDeduction(i.tips, agi, s);
  const taxable = Math.max(0, agi - deduction - senior - ot - tp);
  const gainsInTaxable = Math.min(Math.max(0, i.longTermGains), taxable);
  const ordinaryTaxable = taxable - gainsInTaxable;
  const ordinary = ordinaryTax(ordinaryTaxable, s);
  const gains = longTermGainsTax(ordinaryTaxable, gainsInTaxable, s);
  const before = ordinary.tax + gains.tax;
  const earned = wagesAfterPreTax + Math.max(0, se.earnings - se.deduction);
  const credits = childTaxCredit(i.children, i.otherDependents, agi, s, before, earned);
  const incomeTax = before - credits.nonRefundable;
  const investment = Math.max(0, i.otherIncome) + Math.max(0, i.longTermGains);
  const n = niit(agi, investment, s);
  const medicareWages = Math.max(0, i.wages);
  const addl = fica(medicareWages, s).additionalMedicare + se.additionalMedicare;
  const totalTax = incomeTax + se.seTax + n + addl;
  const refund = Math.max(0, i.withheld) + credits.refundable - totalTax;
  return {
    grossIncome,
    agi,
    deduction,
    deductionType,
    seniorDeduction: senior,
    overtimeDeduction: ot,
    tipsDeduction: tp,
    taxable,
    ordinaryTaxable,
    ordinary,
    gains,
    incomeTax,
    credits,
    se,
    niit: n,
    additionalMedicare: addl,
    totalTax: totalTax - credits.refundable,
    refund,
    effectiveRate: grossIncome > 0 ? (totalTax - credits.refundable) / grossIncome : 0,
  };
}
