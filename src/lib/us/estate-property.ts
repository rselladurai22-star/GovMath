/**
 * Estate tax, contractor vs employee pay, property tax, buyer closing costs
 * and seller net proceeds for 2026, built on tax-2026.ts, taxes-extra.ts,
 * state-tax-2026.ts and loans.ts.
 *
 * Sources:
 * - IRS "What's new: estate and gift tax": basic exclusion $15,000,000 for
 *   2026 (Public Law 119-21, indexed for inflation from 2027) and the annual
 *   gift exclusion of $19,000 a recipient.
 * - IRS Rev. Proc. 2025-32: $194,000 annual exclusion for gifts to a spouse
 *   who is not a US citizen (2026).
 * - Internal Revenue Code §2001(c): the unified rate schedule, 18% to 40%.
 * - Tax Foundation, "Estate and Inheritance Taxes by State" (rates and
 *   exemptions as of October 1, 2025).
 * - BLS Employer Costs for Employee Compensation, December 2025 (private
 *   industry: $46.15 an hour, of which $13.79 benefits).
 * - KFF 2025 Employer Health Benefits Survey (premiums $9,325 single,
 *   $26,993 family; workers pay about 16% and 26%).
 * - CFPB Regulation X (RESPA) §1024.17: escrow cushion of up to 1/6 of the
 *   year's escrow payments (two months).
 */

import { federalReturn, type FilingStatus } from "./tax-2026";
import { returnWithQbi, homeExclusion } from "./taxes-extra";
import { stateTax } from "./state-tax-2026";
import { monthlyPayment } from "./loans";

/* ── Estate and gift tax ─────────────────────────────────────── */

export const ESTATE_2026 = {
  /** Basic exclusion amount per person (IRS; Public Law 119-21). */
  exclusion: 15_000_000,
  /** Annual gift exclusion per recipient (IRS, 2026). */
  annualExclusion: 19_000,
  /** Annual exclusion for gifts to a spouse who is not a US citizen (Rev. Proc. 2025-32). */
  nonCitizenSpouse: 194_000,
  topRate: 0.4,
} as const;

/** IRC §2001(c): [bracket floor, rate]. */
export const UNIFIED_RATES: [number, number][] = [
  [0, 0.18],
  [10_000, 0.2],
  [20_000, 0.22],
  [40_000, 0.24],
  [60_000, 0.26],
  [80_000, 0.28],
  [100_000, 0.3],
  [150_000, 0.32],
  [250_000, 0.34],
  [500_000, 0.37],
  [750_000, 0.39],
  [1_000_000, 0.4],
];

/** Tentative tax on an amount under the unified rate schedule. */
export function tentativeTax(amount: number): number {
  const a = Math.max(0, amount);
  let tax = 0;
  UNIFIED_RATES.forEach(([floor, rate], i) => {
    const top = i + 1 < UNIFIED_RATES.length ? UNIFIED_RATES[i + 1][0] : Infinity;
    if (a > floor) tax += (Math.min(a, top) - floor) * rate;
  });
  return tax;
}

export type EstateInput = {
  /** Everything owned at death at fair market value, including life insurance you owned, retirement accounts and your share of joint property. */
  gross: number;
  /** Mortgages and other debts. */
  debts: number;
  /** Funeral, administration and legal costs. */
  expenses: number;
  /** Left to a surviving spouse who is a US citizen (unlimited marital deduction). */
  marital: number;
  /** Left to charity. */
  charitable: number;
  /** State estate or inheritance tax paid (deductible under §2058). */
  stateDeathTax: number;
  /** Taxable gifts made in life above the annual exclusion (adjusted taxable gifts). */
  lifetimeGifts: number;
  /** Gift tax actually paid on those gifts. */
  giftTaxPaid: number;
  /** Deceased spousal unused exclusion (portability), from the late spouse's Form 706. */
  dsue: number;
};

export type EstateResult = {
  deductions: number;
  taxableEstate: number;
  /** Taxable estate plus adjusted taxable gifts. */
  taxBase: number;
  /** Basic exclusion plus DSUE. */
  exclusion: number;
  tentative: number;
  credit: number;
  tax: number;
  /** Estate tax as a share of the gross estate. */
  effectiveRate: number;
  /** Exclusion left after lifetime gifts and the estate (0 if tax is due). */
  exclusionLeft: number;
  /** What passes to heirs other than the spouse and charity, after tax. */
  toHeirs: number;
};

/** Federal estate tax for a death in 2026 (Form 706, simplified). */
export function estateTax(i: EstateInput): EstateResult {
  const gross = Math.max(0, i.gross);
  const raw = Math.max(0, i.debts) + Math.max(0, i.expenses) + Math.max(0, i.marital) + Math.max(0, i.charitable) + Math.max(0, i.stateDeathTax);
  const deductions = Math.min(gross, raw);
  const taxableEstate = gross - deductions;
  const taxBase = taxableEstate + Math.max(0, i.lifetimeGifts);
  const dsue = Math.min(Math.max(0, i.dsue), ESTATE_2026.exclusion);
  const exclusion = ESTATE_2026.exclusion + dsue;
  const tentative = tentativeTax(taxBase);
  const credit = tentativeTax(exclusion);
  const tax = Math.max(0, tentative - Math.max(0, i.giftTaxPaid) - credit);
  const passing = Math.max(0, gross - Math.min(gross, Math.max(0, i.debts) + Math.max(0, i.expenses) + Math.max(0, i.stateDeathTax)));
  const toHeirs = Math.max(0, passing - Math.max(0, i.marital) - Math.max(0, i.charitable) - tax);
  return {
    deductions,
    taxableEstate,
    taxBase,
    exclusion,
    tentative,
    credit,
    tax,
    effectiveRate: gross > 0 ? tax / gross : 0,
    exclusionLeft: Math.max(0, exclusion - taxBase),
    toHeirs,
  };
}

/** Gifts that use only the annual exclusion: recipients × $19,000 (× 2 if split with a spouse) × years. */
export function annualGifting(recipients: number, years: number, splitWithSpouse: boolean, perGift?: number): number {
  const cap = ESTATE_2026.annualExclusion * (splitWithSpouse ? 2 : 1);
  const each = Math.min(Math.max(0, perGift ?? cap), cap);
  return Math.max(0, Math.floor(recipients)) * Math.max(0, Math.floor(years)) * each;
}

export type StateDeathTax = { code: string; kind: "estate" | "inheritance" | "both"; estateExemption?: number; topRate: number };

/** Tax Foundation, rates and exemptions as of October 1, 2025 (many are indexed and change each year). */
export const STATE_DEATH_TAXES: StateDeathTax[] = [
  { code: "CT", kind: "estate", estateExemption: 13_990_000, topRate: 0.12 },
  { code: "HI", kind: "estate", estateExemption: 5_490_000, topRate: 0.2 },
  { code: "IL", kind: "estate", estateExemption: 4_000_000, topRate: 0.16 },
  { code: "ME", kind: "estate", estateExemption: 7_000_000, topRate: 0.12 },
  { code: "MD", kind: "both", estateExemption: 5_000_000, topRate: 0.16 },
  { code: "MA", kind: "estate", estateExemption: 2_000_000, topRate: 0.16 },
  { code: "MN", kind: "estate", estateExemption: 3_000_000, topRate: 0.16 },
  { code: "NY", kind: "estate", estateExemption: 7_160_000, topRate: 0.16 },
  { code: "OR", kind: "estate", estateExemption: 1_000_000, topRate: 0.16 },
  { code: "RI", kind: "estate", estateExemption: 1_802_431, topRate: 0.16 },
  { code: "VT", kind: "estate", estateExemption: 5_000_000, topRate: 0.16 },
  { code: "WA", kind: "estate", estateExemption: 3_000_000, topRate: 0.35 },
  { code: "DC", kind: "estate", estateExemption: 4_873_200, topRate: 0.16 },
  { code: "KY", kind: "inheritance", topRate: 0.16 },
  { code: "NE", kind: "inheritance", topRate: 0.15 },
  { code: "NJ", kind: "inheritance", topRate: 0.16 },
  { code: "PA", kind: "inheritance", topRate: 0.15 },
];

export function stateDeathTax(code: string): StateDeathTax | undefined {
  return STATE_DEATH_TAXES.find((s) => s.code === code);
}

/* ── 1099 contractor vs W-2 employee ─────────────────────────── */

/** BLS ECEC, December 2025, private industry, per hour worked. */
export const BLS_ECEC = { total: 46.15, wages: 32.36, benefits: 13.79 } as const;
/** KFF 2025 Employer Health Benefits Survey: average premiums and the workers' share. */
export const KFF_2025 = { single: 9_325, family: 26_993, workerShareSingle: 0.16, workerShareFamily: 0.26 } as const;

export type W2Input = {
  salary: number;
  /** Your share of the health premium, taken pre-tax. */
  premiumShare: number;
  /** Employer 401(k) match as a share of salary (you are assumed to contribute enough to get it). */
  matchPct: number;
  /** Any other benefits you value in dollars (HSA seed, stipends, bonus). */
  otherBenefits: number;
  status: FilingStatus;
  state: string;
};

export type ContractorInput = {
  rate: number;
  /** Hours you can bill each week. */
  billableHours: number;
  /** Weeks you bill each year (after vacation, holidays, sick days and gaps between clients). */
  weeks: number;
  /** Business expenses: software, equipment, insurance, accounting, home office. */
  expenses: number;
  /** Health insurance you buy yourself (deductible as self-employed health insurance). */
  premium: number;
  /** Retirement savings to match the employer's contribution (SEP IRA or solo 401(k)); lowers income tax only. */
  retirement: number;
  qbi: boolean;
  status: FilingStatus;
  state: string;
};

export type W2Result = {
  salary: number;
  fica: number;
  federal: number;
  state: number;
  premiumShare: number;
  match: number;
  otherBenefits: number;
  /** Cash after tax and premium, plus the match and other benefits. */
  net: number;
};

export type ContractorResult = {
  gross: number;
  profit: number;
  seTax: number;
  federal: number;
  state: number;
  qbi: number;
  premium: number;
  expenses: number;
  /** Retirement money set aside (counted as value, like the match). */
  retirement: number;
  /** Cash after expenses, premium and tax, including the retirement savings. */
  net: number;
  hoursWorkedYear: number;
};

function baseReturn(status: FilingStatus) {
  return {
    status,
    wages: 0,
    otherIncome: 0,
    nonInvestmentIncome: 0,
    longTermGains: 0,
    selfEmployment: 0,
    preTax: 0,
    adjustments: 0,
    itemized: 0,
    over65: 0,
    blind: 0,
    children: 0,
    otherDependents: 0,
    overtimePremium: 0,
    tips: 0,
    withheld: 0,
  };
}

export function w2Value(i: W2Input): W2Result {
  const salary = Math.max(0, i.salary);
  const share = Math.min(salary, Math.max(0, i.premiumShare));
  const r = federalReturn({ ...baseReturn(i.status), wages: salary, preTax: share });
  // Cafeteria-plan premiums are free of FICA too.
  const ficaWages = salary - share;
  const ss = Math.min(ficaWages, 184_500) * 0.062;
  const med = ficaWages * 0.0145;
  const fica = ss + med + r.additionalMedicare;
  const federal = Math.max(0, r.incomeTax - r.credits.refundable + r.niit);
  const state = stateTax({ code: i.state, wages: ficaWages, status: i.status, dependents: 0, federalTax: federal }).tax;
  const match = salary * Math.max(0, i.matchPct) / 100;
  const other = Math.max(0, i.otherBenefits);
  return { salary, fica, federal, state, premiumShare: share, match, otherBenefits: other, net: salary - share - fica - federal - state + match + other };
}

export function contractorValue(i: ContractorInput): ContractorResult {
  const hoursWorkedYear = Math.max(0, i.billableHours) * Math.max(0, i.weeks);
  const gross = Math.max(0, i.rate) * hoursWorkedYear;
  const expenses = Math.max(0, i.expenses);
  const profit = Math.max(0, gross - expenses);
  const premium = Math.max(0, i.premium);
  const retirement = Math.max(0, i.retirement);
  const first = federalReturn({ ...baseReturn(i.status), selfEmployment: profit });
  // The self-employed health insurance deduction can't exceed profit less half the SE tax.
  const healthDeduction = Math.min(premium, Math.max(0, profit - first.se.deduction));
  // A SEP IRA is limited to 20% of profit less half the SE tax.
  const retirementDeduction = Math.min(retirement, Math.max(0, profit - first.se.deduction) * 0.2);
  const reductions = healthDeduction + retirementDeduction;
  const r = returnWithQbi({ ...baseReturn(i.status), selfEmployment: profit, adjustments: reductions }, i.qbi, reductions);
  const federal = Math.max(0, r.incomeTax - r.credits.refundable + r.niit + r.se.additionalMedicare);
  const state = stateTax({ code: i.state, wages: Math.max(0, r.agi), status: i.status, dependents: 0, federalTax: federal }).tax;
  const net = gross - expenses - premium - r.se.seTax - federal - state;
  return { gross, profit, seTax: r.se.seTax, federal, state, qbi: r.qbiDeduction, premium, expenses, retirement, net, hoursWorkedYear };
}

/** Bisection on a rising function: the input in [lo, hi] where f(x) reaches target. */
function solve(f: (x: number) => number, target: number, lo: number, hi: number): number {
  if (f(hi) < target) return Infinity;
  let a = lo;
  let b = hi;
  for (let k = 0; k < 80; k++) {
    const m = (a + b) / 2;
    if (f(m) < target) a = m;
    else b = m;
  }
  return b;
}

/** The contractor hourly rate whose net matches the W-2 job's net. Infinity if no rate up to $5,000 an hour does. */
export function breakEvenRate(w2: W2Input, c: ContractorInput): number {
  const target = w2Value(w2).net;
  if (Math.max(0, c.billableHours) * Math.max(0, c.weeks) <= 0) return Infinity;
  return solve((rate) => contractorValue({ ...c, rate }).net, target, 0, 5_000);
}

/** The W-2 salary whose net matches the contractor offer's net. */
export function equivalentSalary(w2: W2Input, c: ContractorInput): number {
  const target = contractorValue(c).net;
  if (target <= 0) return 0;
  return solve((salary) => w2Value({ ...w2, salary }).net, target, 0, 50_000_000);
}

/* ── Property tax ────────────────────────────────────────────── */

export type PropertyTaxInput = {
  value: number;
  /** "rate": an effective rate on market value; "mill": mills on assessed value. */
  mode: "rate" | "mill";
  ratePct: number;
  mills: number;
  /** Assessed value as a share of market value (mill mode). */
  assessmentPct: number;
  homestead: number;
  senior: number;
  otherExemption: number;
  /** Dollar credits taken off the bill (circuit breakers, rebates). */
  credits: number;
};

export type PropertyTaxResult = {
  assessed: number;
  exemptions: number;
  taxable: number;
  /** Tax before credits. */
  gross: number;
  tax: number;
  monthly: number;
  /** Tax as a share of market value. */
  effectiveRate: number;
  /** What the exemptions and credits save. */
  saved: number;
};

export function propertyTax(i: PropertyTaxInput): PropertyTaxResult {
  const value = Math.max(0, i.value);
  const assessed = i.mode === "mill" ? (value * Math.max(0, i.assessmentPct)) / 100 : value;
  const rate = i.mode === "mill" ? Math.max(0, i.mills) / 1_000 : Math.max(0, i.ratePct) / 100;
  const exemptions = Math.min(assessed, Math.max(0, i.homestead) + Math.max(0, i.senior) + Math.max(0, i.otherExemption));
  const taxable = assessed - exemptions;
  const gross = taxable * rate;
  const tax = Math.max(0, gross - Math.max(0, i.credits));
  return { assessed, exemptions, taxable, gross, tax, monthly: tax / 12, effectiveRate: value > 0 ? tax / value : 0, saved: assessed * rate - tax };
}

/** Mills from a rate on assessed value: 1 mill = $1 per $1,000. */
export const millsFromPct = (pct: number) => pct * 10;

/** Yearly tax over `years` with the taxable value growing by `growthPct` a year (rate and exemptions held). */
export function propertyTaxPath(i: PropertyTaxInput, growthPct: number, years: number): number[] {
  const out: number[] = [];
  for (let y = 0; y <= years; y++) out.push(propertyTax({ ...i, value: i.value * Math.pow(1 + growthPct / 100, y) }).tax);
  return out;
}

/** RESPA lets the servicer hold a cushion of up to 1/6 of the year's escrow (two months). */
export function escrowCushion(yearly: number): number {
  return Math.max(0, yearly) / 6;
}

/* ── Buyer closing costs ─────────────────────────────────────── */

export type ClosingInput = {
  price: number;
  downPct: number;
  ratePct: number;
  years: number;
  originationPct: number;
  points: number;
  /** Appraisal, credit report, underwriting, flood and tax service fees. */
  lenderFees: number;
  appraisal: number;
  /** Lender's and owner's title insurance as a share of the price. */
  titlePct: number;
  /** Settlement, escrow or attorney fee. */
  settlement: number;
  recording: number;
  /** Transfer tax paid by the buyer, as a share of the price. */
  transferPct: number;
  /** Mortgage or intangible tax on the loan, as a share of the loan. */
  mortgageTaxPct: number;
  inspection: number;
  /** Days of interest from closing to the end of the month. */
  prepaidDays: number;
  insuranceYear: number;
  propertyTaxYear: number;
  /** Months of property tax and insurance held in escrow at closing. */
  taxMonths: number;
  insuranceMonths: number;
  sellerCredit: number;
  lenderCredit: number;
  earnest: number;
};

export type ClosingResult = {
  loan: number;
  down: number;
  lender: number;
  services: number;
  government: number;
  prepaids: number;
  escrow: number;
  /** All closing costs before credits. */
  total: number;
  credits: number;
  /** Closing costs after credits. */
  net: number;
  /** Closing costs (before credits, excluding prepaids and escrow) as a share of the price. */
  feesPct: number;
  /** Closing costs (before credits) as a share of the price. */
  totalPct: number;
  cashToClose: number;
  dailyInterest: number;
  payment: number;
  items: { group: "lender" | "services" | "government" | "prepaids" | "escrow"; label: string; amount: number }[];
};

export function closingCosts(i: ClosingInput): ClosingResult {
  const price = Math.max(0, i.price);
  const down = Math.min(price, (price * Math.max(0, i.downPct)) / 100);
  const loan = price - down;
  const dailyInterest = (loan * Math.max(0, i.ratePct)) / 100 / 365;
  const items: ClosingResult["items"] = [
    { group: "lender", label: "Origination fee", amount: (loan * Math.max(0, i.originationPct)) / 100 },
    { group: "lender", label: "Discount points", amount: (loan * Math.max(0, i.points)) / 100 },
    { group: "lender", label: "Other lender fees", amount: Math.max(0, i.lenderFees) },
    { group: "services", label: "Appraisal", amount: loan > 0 ? Math.max(0, i.appraisal) : 0 },
    { group: "services", label: "Title insurance", amount: (price * Math.max(0, i.titlePct)) / 100 },
    { group: "services", label: "Settlement or attorney fee", amount: Math.max(0, i.settlement) },
    { group: "services", label: "Home inspection", amount: Math.max(0, i.inspection) },
    { group: "government", label: "Recording fees", amount: Math.max(0, i.recording) },
    { group: "government", label: "Transfer tax (buyer's share)", amount: (price * Math.max(0, i.transferPct)) / 100 },
    { group: "government", label: "Mortgage tax", amount: (loan * Math.max(0, i.mortgageTaxPct)) / 100 },
    { group: "prepaids", label: "Prepaid interest", amount: dailyInterest * Math.max(0, i.prepaidDays) },
    { group: "prepaids", label: "First year of homeowners insurance", amount: Math.max(0, i.insuranceYear) },
    { group: "escrow", label: "Property tax into escrow", amount: (Math.max(0, i.propertyTaxYear) / 12) * Math.max(0, i.taxMonths) },
    { group: "escrow", label: "Insurance into escrow", amount: (Math.max(0, i.insuranceYear) / 12) * Math.max(0, i.insuranceMonths) },
  ];
  const sum = (g: ClosingResult["items"][number]["group"]) => items.filter((x) => x.group === g).reduce((a, x) => a + x.amount, 0);
  const lender = sum("lender");
  const services = sum("services");
  const government = sum("government");
  const prepaids = sum("prepaids");
  const escrow = sum("escrow");
  const total = lender + services + government + prepaids + escrow;
  const credits = Math.min(total, Math.max(0, i.sellerCredit) + Math.max(0, i.lenderCredit));
  const net = total - credits;
  const payment = loan > 0 ? monthlyPayment(loan, i.ratePct, Math.max(1, Math.round(i.years * 12))) : 0;
  return {
    loan,
    down,
    lender,
    services,
    government,
    prepaids,
    escrow,
    total,
    credits,
    net,
    feesPct: price > 0 ? (lender + services + government) / price : 0,
    totalPct: price > 0 ? total / price : 0,
    cashToClose: Math.max(0, down + net - Math.max(0, i.earnest)),
    dailyInterest,
    payment,
    items,
  };
}

/* ── Seller net proceeds ─────────────────────────────────────── */

export type SaleInput = {
  price: number;
  payoff: number;
  listingPct: number;
  buyerAgentPct: number;
  concessions: number;
  /** Seller's transfer tax, as a share of the price. */
  transferPct: number;
  /** Title, escrow, attorney and other seller closing costs, as a share of the price. */
  otherPct: number;
  /** Repairs, staging and moving costs before the sale (cash, not deducted from the gain unless improvements). */
  prep: number;
  /** Property tax you owe for the part of the year you owned it, not yet paid. */
  taxProration: number;
  /** For the gain: what you paid plus buying costs, and improvements. */
  purchase: number;
  improvements: number;
  /** Owned and lived in it as your main home for 2 of the last 5 years. */
  mainHome: boolean;
  /** Held more than a year (long-term gain). */
  longTerm: boolean;
  status: FilingStatus;
  /** Other income for the year (wages and similar). */
  otherIncome: number;
  state: string;
};

export type SaleResult = {
  commission: number;
  listing: number;
  buyerAgent: number;
  transfer: number;
  other: number;
  sellingCosts: number;
  /** Price less selling costs, concessions, proration and payoff. */
  proceeds: number;
  basis: number;
  gain: number;
  excluded: number;
  taxableGain: number;
  federalTax: number;
  stateTax: number;
  /** Proceeds less tax and prep costs. */
  walkAway: number;
  /** Proceeds before the mortgage payoff: your equity after costs. */
  equityAfterCosts: number;
};

export function saleProceeds(i: SaleInput): SaleResult {
  const price = Math.max(0, i.price);
  const listing = (price * Math.max(0, i.listingPct)) / 100;
  const buyerAgent = (price * Math.max(0, i.buyerAgentPct)) / 100;
  const commission = listing + buyerAgent;
  const transfer = (price * Math.max(0, i.transferPct)) / 100;
  const other = (price * Math.max(0, i.otherPct)) / 100;
  const concessions = Math.max(0, i.concessions);
  const sellingCosts = commission + transfer + other + concessions;
  const equityAfterCosts = price - sellingCosts - Math.max(0, i.taxProration);
  const proceeds = equityAfterCosts - Math.max(0, i.payoff);
  // Concessions lower the amount realized; repairs before the sale do not change the basis unless improvements.
  const basis = Math.max(0, i.purchase) + Math.max(0, i.improvements);
  const gain = Math.max(0, price - sellingCosts - basis);
  const excluded = i.mainHome ? homeExclusion(gain, i.status) : 0;
  const taxableGain = gain - excluded;
  const base = baseReturn(i.status);
  const income = Math.max(0, i.otherIncome);
  const without = federalReturn({ ...base, wages: income });
  const withGain = federalReturn({ ...base, wages: income, longTermGains: i.longTerm ? taxableGain : 0, otherIncome: i.longTerm ? 0 : taxableGain });
  const federalTax = Math.max(0, withGain.totalTax - withGain.credits.refundable - (without.totalTax - without.credits.refundable));
  const st0 = stateTax({ code: i.state, wages: income, status: i.status, dependents: 0, federalTax: without.incomeTax }).tax;
  const st1 = stateTax({ code: i.state, wages: income + taxableGain, status: i.status, dependents: 0, federalTax: withGain.incomeTax }).tax;
  const stateTaxAmt = Math.max(0, st1 - st0);
  return {
    commission,
    listing,
    buyerAgent,
    transfer,
    other,
    sellingCosts,
    proceeds,
    basis,
    gain,
    excluded,
    taxableGain,
    federalTax,
    stateTax: stateTaxAmt,
    walkAway: proceeds - federalTax - stateTaxAmt - Math.max(0, i.prep),
    equityAfterCosts,
  };
}
