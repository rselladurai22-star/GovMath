/**
 * Investing and retirement income (US): health savings accounts, investment
 * growth after fees and tax, inflation (CPI-U), annuities and retirement
 * withdrawals. Pure functions; every figure quoted in a guide comes from here.
 *
 * Sources:
 * - HSA contribution limits: US_2026.limits in tax-2026.ts (IRS Rev. Proc. 2025-19).
 *   HDHP minimum deductible and out-of-pocket maximum for 2026: IRS Rev. Proc.
 *   2025-19 (https://www.irs.gov/pub/irs-drop/rp-25-19.pdf).
 * - CPI-U (all items, US city average, 1982-84 = 100, not seasonally adjusted):
 *   BLS series CUUR0000SA0, annual averages 1913 to 2025 and monthly values for
 *   2026. BLS did not publish an October 2025 index (federal shutdown).
 * - Life expectancy: IRS Single Life Table (Treas. Reg. 1.401(a)(9)-9,
 *   Publication 590-B Appendix B, Table I), used here only to estimate how long
 *   a lifetime annuity pays.
 */

import { US_2026, federalReturn, fica, type FilingStatus } from "./tax-2026";
import { stateTax } from "./state-tax-2026";

/* ── Health savings accounts ─────────────────────────────── */

export type HsaCoverage = "self" | "family";

/** 2026 HSA and HDHP figures (IRS Rev. Proc. 2025-19). */
export const HSA_2026 = {
  limit: { self: US_2026.limits.hsaSelf, family: US_2026.limits.hsaFamily } as Record<HsaCoverage, number>,
  /** Extra contribution allowed from age 55 (not indexed). */
  catchUp: US_2026.limits.hsaCatchUp,
  catchUpAge: 55,
  hdhpMinDeductible: { self: 1_700, family: 3_400 } as Record<HsaCoverage, number>,
  hdhpOutOfPocketMax: { self: 8_500, family: 17_000 } as Record<HsaCoverage, number>,
  /** Additional tax on withdrawals not spent on qualified medical expenses before 65. */
  penalty: 0.2,
} as const;

/** States whose income tax does not follow the federal HSA deduction. */
export const HSA_TAXED_STATES = ["CA", "NJ"] as const;

export function hsaStateTaxed(code: string): boolean {
  return (HSA_TAXED_STATES as readonly string[]).includes(code);
}

/** 2026 contribution limit (yours plus your employer's), prorated by months of HDHP coverage. */
export function hsaLimit(coverage: HsaCoverage, age: number, months = 12): number {
  const share = Math.max(0, Math.min(12, Math.round(months))) / 12;
  const catchUp = age >= HSA_2026.catchUpAge ? HSA_2026.catchUp : 0;
  return (HSA_2026.limit[coverage] + catchUp) * share;
}

export type HsaInput = {
  coverage: HsaCoverage;
  age: number;
  /** Months of HDHP coverage in 2026. */
  months: number;
  wages: number;
  status: FilingStatus;
  state: string;
  dependents: number;
  /** What you want to put in this year. */
  contribution: number;
  employer: number;
  /** Through payroll (a cafeteria plan), which also saves Social Security and Medicare tax. */
  payroll: boolean;
};

export type HsaTax = {
  limit: number;
  /** Your contribution after the limit (the employer's money counts first). */
  yours: number;
  employer: number;
  total: number;
  /** How much of what you wanted to put in goes over the limit. */
  overLimit: number;
  federal: number;
  fica: number;
  state: number;
  saved: number;
  /** What your own contribution really costs after the tax saved. */
  netCost: number;
  /** Tax saved per dollar you contribute. */
  rate: number;
  stateTaxed: boolean;
};

/** Federal, payroll and state tax saved by your 2026 HSA contribution. */
export function hsaTax(i: HsaInput): HsaTax {
  const limit = hsaLimit(i.coverage, i.age, i.months);
  const employer = Math.min(Math.max(0, i.employer), limit);
  const room = Math.max(0, limit - employer);
  const wanted = Math.max(0, i.contribution);
  const yours = Math.min(wanted, room, Math.max(0, i.wages));
  const base = {
    status: i.status,
    wages: i.wages,
    otherIncome: 0,
    longTermGains: 0,
    selfEmployment: 0,
    preTax: 0,
    adjustments: 0,
    itemized: 0,
    over65: i.age >= 65 ? 1 : 0,
    blind: 0,
    children: 0,
    otherDependents: 0,
    overtimePremium: 0,
    tips: 0,
    withheld: 0,
  };
  const before = federalReturn(base).totalTax;
  const after = federalReturn(i.payroll ? { ...base, preTax: yours } : { ...base, adjustments: yours }).totalTax;
  const federal = Math.max(0, before - after);
  const ficaSaved = i.payroll ? fica(i.wages, i.status).total - fica(Math.max(0, i.wages - yours), i.status).total : 0;
  const stateTaxed = hsaStateTaxed(i.state);
  const stBefore = stateTax({ code: i.state, wages: i.wages, status: i.status, dependents: i.dependents }).tax;
  const stAfter = stateTax({ code: i.state, wages: Math.max(0, i.wages - yours), status: i.status, dependents: i.dependents }).tax;
  const state = stateTaxed ? 0 : Math.max(0, stBefore - stAfter);
  const saved = federal + ficaSaved + state;
  return {
    limit,
    yours,
    employer,
    total: yours + employer,
    overLimit: Math.max(0, wanted - yours),
    federal,
    fica: ficaSaved,
    state,
    saved,
    netCost: yours - saved,
    rate: yours > 0 ? saved / yours : 0,
    stateTaxed,
  };
}

export type HsaYear = { age: number; deposits: number; spent: number; balance: number; real: number };

export type HsaGrowth = { balance: number; real: number; deposits: number; spent: number; growth: number; years: HsaYear[] };

/**
 * Grows an HSA from `age` to `toAge`: `yearly` goes in and `medical` comes out
 * each year (both spread monthly, both rising with `costGrowthPct` for medical
 * costs), invested at `returnPct`. The balance never goes below zero.
 */
export function hsaGrowth(start: number, yearly: number, medical: number, returnPct: number, age: number, toAge: number, costGrowthPct = 0, inflationPct = 0): HsaGrowth {
  const r = Math.pow(1 + returnPct / 100, 1 / 12) - 1;
  const n = Math.max(0, Math.round(toAge - age));
  let balance = Math.max(0, start);
  let deposits = 0;
  let spent = 0;
  const years: HsaYear[] = [];
  for (let y = 0; y < n; y++) {
    const inMonth = Math.max(0, yearly) / 12;
    const outMonth = (Math.max(0, medical) * Math.pow(1 + costGrowthPct / 100, y)) / 12;
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + inMonth;
      deposits += inMonth;
      const take = Math.min(balance, outMonth);
      balance -= take;
      spent += take;
    }
    years.push({ age: age + y + 1, deposits, spent, balance, real: balance / Math.pow(1 + inflationPct / 100, y + 1) });
  }
  return {
    balance,
    real: balance / Math.pow(1 + inflationPct / 100, n),
    deposits,
    spent,
    growth: balance + spent - deposits - Math.max(0, start),
    years,
  };
}

/* ── Investment growth after fees and tax ─────────────────── */

export type InvestInput = {
  start: number;
  monthly: number;
  /** Return a year before fees. */
  returnPct: number;
  /** Fund expense ratio and any advisory fee, a year, as a share of the balance. */
  feePct: number;
  years: number;
  /** Monthly contribution rises by this much once a year. */
  increasePct: number;
  inflationPct: number;
  /** Taxable brokerage account (dividends taxed yearly, gains on selling) or a tax-advantaged one. */
  taxable: boolean;
  /** Dividend yield, part of the return, taxed each year in a taxable account. */
  yieldPct: number;
  dividendTaxRate: number;
  gainsTaxRate: number;
};

export type InvestYear = { year: number; contributions: number; balance: number; noFees: number; fees: number; real: number };

export type Investment = {
  balance: number;
  /** After paying capital gains tax on selling everything (taxable account only; equal to balance otherwise). */
  afterSale: number;
  contributions: number;
  growth: number;
  /** Fees charged over the years. */
  feesPaid: number;
  /** The same plan with no fees, minus the actual balance: fees plus the growth they would have earned. */
  feeDrag: number;
  noFees: number;
  dividendTax: number;
  gainsTax: number;
  real: number;
  realAfterSale: number;
  years: InvestYear[];
};

/**
 * Month by month: growth, then the fee (a twelfth of the yearly rate on the
 * balance), then the contribution at the end of the month. In a taxable
 * account the dividend part of the return is taxed each December and the tax
 * paid from the account; on selling, the gain over the cost basis is taxed.
 */
export function invest(i: InvestInput): Investment {
  const gross = Math.pow(1 + i.returnPct / 100, 1 / 12) - 1;
  const fee = Math.max(0, i.feePct) / 100 / 12;
  const n = Math.max(0, Math.round(i.years * 12));
  let bal = Math.max(0, i.start);
  let noFees = bal;
  let basis = bal;
  let contributions = bal;
  let dep = Math.max(0, i.monthly);
  let feesPaid = 0;
  let dividendTax = 0;
  let yearDiv = 0;
  let yearDivNoFee = 0;
  const years: InvestYear[] = [];
  const divRate = i.taxable ? Math.max(0, i.yieldPct) / 100 / 12 : 0;
  for (let m = 1; m <= n; m++) {
    yearDiv += bal * divRate;
    yearDivNoFee += noFees * divRate;
    bal *= 1 + gross;
    const f = bal * fee;
    bal -= f;
    feesPaid += f;
    bal += dep;
    noFees = noFees * (1 + gross) + dep;
    contributions += dep;
    basis += dep;
    if (m % 12 === 0 || m === n) {
      if (i.taxable) {
        const tax = Math.max(0, yearDiv) * Math.max(0, i.dividendTaxRate);
        dividendTax += tax;
        bal -= tax;
        basis += Math.max(0, yearDiv) - tax;
        noFees -= Math.max(0, yearDivNoFee) * Math.max(0, i.dividendTaxRate);
      }
      yearDiv = 0;
      yearDivNoFee = 0;
      const y = Math.ceil(m / 12);
      years.push({ year: y, contributions, balance: bal, noFees, fees: feesPaid, real: bal / Math.pow(1 + i.inflationPct / 100, m / 12) });
      if (m % 12 === 0) dep *= 1 + Math.max(0, i.increasePct) / 100;
    }
  }
  const gainsTax = i.taxable ? Math.max(0, bal - basis) * Math.max(0, i.gainsTaxRate) : 0;
  const afterSale = bal - gainsTax;
  const deflator = Math.pow(1 + i.inflationPct / 100, n / 12);
  return {
    balance: bal,
    afterSale,
    contributions,
    growth: bal - contributions,
    feesPaid,
    feeDrag: noFees - bal,
    noFees,
    dividendTax,
    gainsTax,
    real: bal / deflator,
    realAfterSale: afterSale / deflator,
    years,
  };
}

/** The same plan at several returns (before fees). */
export function investScenarios(i: InvestInput, returns: number[]): { returnPct: number; balance: number; afterSale: number; real: number }[] {
  return returns.map((r) => {
    const x = invest({ ...i, returnPct: r });
    return { returnPct: r, balance: x.balance, afterSale: x.afterSale, real: x.realAfterSale };
  });
}

/** Average fund expense ratios, 2025 (ICI, March 2026, asset-weighted). */
export const FUND_FEES_2025 = { equityMutualFunds: 0.4, bondMutualFunds: 0.36, indexEquityEtfs: 0.14 } as const;

/* ── Inflation (CPI-U) ────────────────────────────────────── */

/** CPI-U annual averages, 1913 to 2025 (BLS, CUUR0000SA0). Three decimals from 2007, as BLS publishes them. */
export const CPI_ANNUAL: Record<number, number> = {
  1913: 9.9, 1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.1, 1919: 17.3, 1920: 20.0, 1921: 17.9, 1922: 16.8,
  1923: 17.1, 1924: 17.1, 1925: 17.5, 1926: 17.7, 1927: 17.4, 1928: 17.1, 1929: 17.1, 1930: 16.7, 1931: 15.2, 1932: 13.7,
  1933: 13.0, 1934: 13.4, 1935: 13.7, 1936: 13.9, 1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0, 1941: 14.7, 1942: 16.3,
  1943: 17.3, 1944: 17.6, 1945: 18.0, 1946: 19.5, 1947: 22.3, 1948: 24.1, 1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.5,
  1953: 26.7, 1954: 26.9, 1955: 26.8, 1956: 27.2, 1957: 28.1, 1958: 28.9, 1959: 29.1, 1960: 29.6, 1961: 29.9, 1962: 30.2,
  1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.4, 1967: 33.4, 1968: 34.8, 1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8,
  1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9, 1977: 60.6, 1978: 65.2, 1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5,
  1983: 99.6, 1984: 103.9, 1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0, 1990: 130.7, 1991: 136.2, 1992: 140.3,
  1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9, 1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2, 2001: 177.1, 2002: 179.9,
  2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.342, 2008: 215.303, 2009: 214.537, 2010: 218.056, 2011: 224.939,
  2012: 229.594, 2013: 232.957, 2014: 236.736, 2015: 237.017, 2016: 240.007, 2017: 245.12, 2018: 251.107, 2019: 255.657,
  2020: 258.811, 2021: 270.97, 2022: 292.655, 2023: 304.702, 2024: 313.689, 2025: 321.943,
};

/** CPI-U monthly index for 2026 so far (January to August; BLS, not seasonally adjusted). */
export const CPI_2026_MONTHLY = [325.252, 326.785, 330.213, 333.02, 335.123, 333.952, 333.918, 334.98] as const;
/** CPI-U, August 2025, for the 12-month change to the latest month. */
export const CPI_AUG_2025 = 323.976;
export const CPI_LATEST = { year: 2026, month: "August", index: CPI_2026_MONTHLY[CPI_2026_MONTHLY.length - 1] } as const;

export const CPI_FIRST_YEAR = 1913;
/** 2026 uses the latest monthly index, so 2026 is "today". */
export const CPI_LAST_YEAR = 2026;

/** The index for a year: the annual average, or for 2026 the latest month. */
export function cpiFor(year: number): number {
  const y = Math.max(CPI_FIRST_YEAR, Math.min(CPI_LAST_YEAR, Math.round(year)));
  return y === CPI_LAST_YEAR ? CPI_LATEST.index : CPI_ANNUAL[y];
}

/** Inflation over the 12 months to the latest index. */
export function latestAnnualInflation(): number {
  return CPI_LATEST.index / CPI_AUG_2025 - 1;
}

/** Inflation in a year: its annual average over the year before (2026: the latest 12 months). */
export function inflationIn(year: number): number {
  const y = Math.round(year);
  if (y === CPI_LAST_YEAR) return latestAnnualInflation();
  if (y <= CPI_FIRST_YEAR || y > 2025) return 0;
  return CPI_ANNUAL[y] / CPI_ANNUAL[y - 1] - 1;
}

export type CpiAdjust = {
  value: number;
  fromIndex: number;
  toIndex: number;
  /** Total change in prices between the years. */
  cumulative: number;
  /** Compound average a year. */
  average: number;
  years: number;
  /** What a dollar in the first year buys in the second, in first-year dollars. */
  dollarWorth: number;
};

/** What `amount` in `from` is worth in `to` dollars (either direction). */
export function cpiAdjust(amount: number, from: number, to: number): CpiAdjust {
  const fromIndex = cpiFor(from);
  const toIndex = cpiFor(to);
  const ratio = toIndex / fromIndex;
  const years = Math.abs(Math.round(to) - Math.round(from));
  const up = Math.round(to) >= Math.round(from) ? ratio : 1 / ratio;
  return {
    value: amount * ratio,
    fromIndex,
    toIndex,
    cumulative: ratio - 1,
    average: years > 0 ? Math.pow(up, 1 / years) - 1 : 0,
    years,
    dollarWorth: 1 / ratio,
  };
}

/** Future cost of something at an assumed inflation rate, and what today's amount will buy then. */
export function futureInflation(amount: number, ratePct: number, years: number): { cost: number; buyingPower: number } {
  const f = Math.pow(1 + ratePct / 100, Math.max(0, years));
  return { cost: amount * f, buyingPower: amount / f };
}

/** Years for prices to double at a rate. */
export function doublingYears(ratePct: number): number {
  return ratePct > 0 ? Math.log(2) / Math.log(1 + ratePct / 100) : Infinity;
}

/* ── Annuities ────────────────────────────────────────────── */

/** IRS Single Life Table (Publication 590-B, Appendix B, Table I), ages 40 to 100. */
const SINGLE_LIFE: number[] = [
  45.7, 44.8, 43.8, 42.9, 41.9, 41.0, 40.0, 39.0, 38.1, 37.1, // 40-49
  36.2, 35.3, 34.3, 33.4, 32.5, 31.6, 30.6, 29.8, 28.9, 28.0, // 50-59
  27.1, 26.2, 25.4, 24.5, 23.7, 22.9, 22.0, 21.2, 20.4, 19.6, // 60-69
  18.8, 18.0, 17.2, 16.4, 15.6, 14.8, 14.1, 13.3, 12.6, 11.9, // 70-79
  11.2, 10.5, 9.9, 9.3, 8.7, 8.1, 7.6, 7.1, 6.6, 6.1, // 80-89
  5.7, 5.3, 4.9, 4.6, 4.3, 4.0, 3.7, 3.4, 3.2, 3.0, 2.8, // 90-100
];

/** Remaining life expectancy in years at an age (IRS Single Life Table; ages 40 to 100). */
export function lifeExpectancy(age: number): number {
  const a = Math.max(40, Math.min(100, Math.round(age)));
  return SINGLE_LIFE[a - 40];
}

export type AnnuityTiming = "ordinary" | "due";

/**
 * Present value of one dollar a period for `periods` periods at `ratePct` a
 * year (compounded `perYear` times), payments rising by `risePct` once a year.
 * Ordinary: paid at the end of each period. Due: at the start.
 */
export function annuityFactor(ratePct: number, years: number, perYear = 12, timing: AnnuityTiming = "ordinary", risePct = 0): number {
  const i = ratePct / 100 / perYear;
  const n = Math.max(0, Math.round(years * perYear));
  let pv = 0;
  for (let k = 1; k <= n; k++) {
    const amount = Math.pow(1 + risePct / 100, Math.floor((k - 1) / perYear));
    const t = timing === "due" ? k - 1 : k;
    pv += amount / Math.pow(1 + i, t);
  }
  return pv;
}

/** Future value (at the last payment, or one period after it for an annuity due) of one dollar a period. */
export function annuityFvFactor(ratePct: number, years: number, perYear = 12, timing: AnnuityTiming = "ordinary"): number {
  const i = ratePct / 100 / perYear;
  const n = Math.max(0, Math.round(years * perYear));
  return annuityFactor(ratePct, years, perYear, timing) * Math.pow(1 + i, n);
}

export type Annuity = {
  /** First payment each period. */
  payment: number;
  /** Lump sum (premium or present value). */
  premium: number;
  periods: number;
  years: number;
  /** Total paid out over the term, undiscounted. */
  totalPaid: number;
  /** Paid out minus the premium. */
  interest: number;
  /** Years of payments to get the premium back, undiscounted. */
  breakEvenYears: number;
  /** Share of each payment that is your own money back (premium ÷ total payments). */
  returnOfPremium: number;
  /** Future value of the payments at the end of the term, at the same rate. */
  futureValue: number;
};

function annuityResult(payment: number, premium: number, ratePct: number, years: number, perYear: number, timing: AnnuityTiming, risePct: number): Annuity {
  const n = Math.max(0, Math.round(years * perYear));
  let totalPaid = 0;
  let cum = 0;
  let breakEven = Infinity;
  for (let k = 1; k <= n; k++) {
    const p = payment * Math.pow(1 + risePct / 100, Math.floor((k - 1) / perYear));
    totalPaid += p;
    cum += p;
    if (breakEven === Infinity && cum >= premium - 1e-6) breakEven = k / perYear;
  }
  const i = ratePct / 100 / perYear;
  let fv = 0;
  for (let k = 1; k <= n; k++) {
    const p = payment * Math.pow(1 + risePct / 100, Math.floor((k - 1) / perYear));
    const t = timing === "due" ? n - k + 1 : n - k;
    fv += p * Math.pow(1 + i, t);
  }
  return {
    payment,
    premium,
    periods: n,
    years: n / perYear,
    totalPaid,
    interest: totalPaid - premium,
    breakEvenYears: breakEven,
    returnOfPremium: totalPaid > 0 ? Math.min(1, premium / totalPaid) : 0,
    futureValue: fv,
  };
}

/** The payment a lump sum buys. */
export function annuityIncome(premium: number, ratePct: number, years: number, perYear = 12, timing: AnnuityTiming = "ordinary", risePct = 0): Annuity {
  const f = annuityFactor(ratePct, years, perYear, timing, risePct);
  const payment = f > 0 ? Math.max(0, premium) / f : 0;
  return annuityResult(payment, Math.max(0, premium), ratePct, years, perYear, timing, risePct);
}

/** The lump sum that buys a payment. */
export function annuityCost(payment: number, ratePct: number, years: number, perYear = 12, timing: AnnuityTiming = "ordinary", risePct = 0): Annuity {
  const premium = Math.max(0, payment) * annuityFactor(ratePct, years, perYear, timing, risePct);
  return annuityResult(Math.max(0, payment), premium, ratePct, years, perYear, timing, risePct);
}

/** Balance left in the annuity's notional account at the end of each year (for a chart). */
export function annuityBalances(premium: number, payment: number, ratePct: number, years: number, perYear = 12, timing: AnnuityTiming = "ordinary", risePct = 0): number[] {
  const i = ratePct / 100 / perYear;
  const n = Math.max(0, Math.round(years * perYear));
  let b = Math.max(0, premium);
  const out = [b];
  for (let k = 1; k <= n; k++) {
    const p = payment * Math.pow(1 + risePct / 100, Math.floor((k - 1) / perYear));
    b = timing === "due" ? (b - p) * (1 + i) : b * (1 + i) - p;
    if (k % perYear === 0 || k === n) out.push(Math.max(0, b));
  }
  return out;
}

/* ── Retirement withdrawals ───────────────────────────────── */

export type WithdrawInput = {
  balance: number;
  /** "fixed": a dollar amount a year (first year); "percent": a share of each year's starting balance. */
  mode: "fixed" | "percent";
  amount: number;
  pct: number;
  /** Raise the fixed amount with inflation each year. */
  inflationAdjust: boolean;
  returnPct: number;
  inflationPct: number;
  /** A one-off return in the first year (e.g. -20 for a market fall); null to use returnPct. */
  firstYearReturnPct?: number | null;
  /** Tax on withdrawals, as a share (traditional 401(k)/IRA money). */
  taxRate?: number;
  maxYears?: number;
};

export type WithdrawYear = { year: number; start: number; withdrawn: number; afterTax: number; growth: number; end: number; real: number; realWithdrawn: number };

export type WithdrawPlan = {
  /** Years the money lasts, to the month (Infinity if it lasts past maxYears). */
  lasts: number;
  totalWithdrawn: number;
  endBalance: number;
  endReal: number;
  firstYear: number;
  /** First year's withdrawal as a share of the starting balance. */
  rate: number;
  years: WithdrawYear[];
};

/**
 * Draws money monthly (a twelfth of the year's amount at the start of each
 * month), then grows what is left at the month's share of the yearly return.
 */
export function withdrawals(i: WithdrawInput): WithdrawPlan {
  const max = i.maxYears ?? 60;
  const infl = 1 + i.inflationPct / 100;
  const tax = Math.max(0, Math.min(1, i.taxRate ?? 0));
  let b = Math.max(0, i.balance);
  let lasts = Infinity;
  let total = 0;
  const years: WithdrawYear[] = [];
  const firstYear = i.mode === "fixed" ? Math.max(0, i.amount) : b * Math.max(0, i.pct) / 100;
  for (let y = 0; y < max; y++) {
    const ret = y === 0 && i.firstYearReturnPct != null ? i.firstYearReturnPct : i.returnPct;
    const r = Math.pow(1 + ret / 100, 1 / 12) - 1;
    const start = b;
    const yearly = i.mode === "fixed" ? Math.max(0, i.amount) * (i.inflationAdjust ? Math.pow(infl, y) : 1) : start * Math.max(0, i.pct) / 100;
    let taken = 0;
    let growth = 0;
    for (let m = 0; m < 12; m++) {
      const want = yearly / 12;
      const take = Math.min(b, want);
      b -= take;
      taken += take;
      if (take < want - 1e-9 && lasts === Infinity) {
        lasts = y + (m + take / want) / 12;
      }
      const g = b * r;
      b += g;
      growth += g;
    }
    total += taken;
    const deflate = Math.pow(infl, y + 1);
    years.push({ year: y + 1, start, withdrawn: taken, afterTax: taken * (1 - tax), growth, end: b, real: b / deflate, realWithdrawn: taken / Math.pow(infl, y) });
    if (b <= 0.005) {
      if (lasts === Infinity) lasts = y + 1;
      break;
    }
  }
  return {
    lasts,
    totalWithdrawn: total,
    endBalance: b,
    endReal: b / Math.pow(infl, years.length),
    firstYear,
    rate: i.balance > 0 ? firstYear / i.balance : 0,
    years,
  };
}

/** The largest first-year fixed withdrawal that lasts `years` years (the balance reaches zero at the end). */
export function sustainableWithdrawal(balance: number, years: number, returnPct: number, inflationPct: number, inflationAdjust: boolean, firstYearReturnPct: number | null = null): number {
  const b = Math.max(0, balance);
  const n = Math.max(1, Math.round(years));
  if (b === 0) return 0;
  const run = (amount: number) =>
    withdrawals({ balance: b, mode: "fixed", amount, pct: 0, inflationAdjust, returnPct, inflationPct, firstYearReturnPct, maxYears: n });
  let lo = 0;
  let hi = b * 2;
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2;
    const p = run(mid);
    if (p.lasts === Infinity || p.lasts >= n) lo = mid;
    else hi = mid;
  }
  return lo;
}
