/**
 * Wealth building for the US savings pages: FIRE (financial independence,
 * retire early) with its Lean, Fat, Coast and Barista variants, the emergency
 * fund, net worth against the Federal Reserve's Survey of Consumer Finances,
 * dividend income with reinvestment and tax, and a high-yield savings
 * account against a regular one. Pure functions; every figure quoted in the
 * guides comes from here.
 *
 * Sources: Federal Reserve, "Changes in U.S. Family Finances from 2019 to
 * 2022: Evidence from the Survey of Consumer Finances" (October 2023),
 * Table 2 (net worth by age of reference person, thousands of 2022 dollars);
 * FDIC national rates (savings 0.37% on September 21, 2026); FDIC deposit
 * insurance ($250,000 per depositor, per insured bank, per ownership
 * category); IRS Topic 404 and Publication 550 (qualified dividends); tax
 * figures from tax-2026.ts.
 */

import { longTermGainsTax, niit, ordinaryTax, standardDeduction, type FilingStatus } from "./tax-2026";

/** Months searched before we call a target unreachable (100 years). */
const MAX_MONTHS = 1_200;

/** FDIC national average savings rate (%), September 21, 2026 (fdic.gov national rates). */
export const FDIC_NATIONAL_SAVINGS_2026 = 0.37;
/** FDIC national average money market rate (%), September 21, 2026. */
export const FDIC_NATIONAL_MONEY_MARKET_2026 = 0.63;
/** FDIC standard maximum deposit insurance amount. */
export const FDIC_LIMIT = 250_000;

/** Monthly growth factor minus one from a yearly rate (%), compounded so 12 months give exactly the yearly rate. */
export function monthlyRate(yearlyPct: number): number {
  return Math.pow(1 + Math.max(-99, yearlyPct) / 100, 1 / 12) - 1;
}

/** Real (after-inflation) yearly return, in %. */
export function realReturn(nominalPct: number, inflationPct: number): number {
  return ((1 + nominalPct / 100) / (1 + inflationPct / 100) - 1) * 100;
}

/* ------------------------------------------------------------------ FIRE */

/**
 * Months until a balance reaches `target`, saving `annualSave` a year in
 * twelve end-of-month deposits that rise by `saveGrowthPct` each year, at a
 * real return of `realPct`. Infinity if it takes more than 100 years.
 */
export function monthsToTarget(start: number, annualSave: number, realPct: number, target: number, saveGrowthPct = 0): number {
  const r = monthlyRate(realPct);
  let b = Math.max(0, start);
  let dep = Math.max(0, annualSave) / 12;
  if (b >= target) return 0;
  for (let m = 1; m <= MAX_MONTHS; m++) {
    b = b * (1 + r) + dep;
    if (b >= target) return m;
    if (m % 12 === 0) dep *= 1 + saveGrowthPct / 100;
  }
  return Infinity;
}

export const LEAN_SHARE = 0.7;
export const FAT_SHARE = 1.5;

export type FireInput = {
  age: number;
  /** Take-home pay a year (after tax and payroll deductions). */
  takeHome: number;
  /** Spending a year now. */
  spending: number;
  /** Invested savings toward FI today. */
  saved: number;
  /** Nominal yearly return before inflation, %. */
  returnPct: number;
  inflationPct: number;
  /** Safe withdrawal rate, % of the portfolio in the first year. */
  withdrawalPct: number;
  /** Retirement spending as a share of today's spending (1 = the same). */
  retireShare: number;
  /** Raise what you save by this much a year above inflation, %. */
  saveGrowthPct: number;
  /** Part-time income a year in early retirement, for Barista FIRE (today's dollars). */
  partTime: number;
  /** The age Coast FIRE aims at: savings left alone reach the FIRE number by then. */
  coastAge: number;
};

export type FireVariant = { number: number; months: number; age: number };

export type Fire = {
  annualSave: number;
  savingsRate: number;
  realPct: number;
  /** Retirement spending, today's dollars. */
  retireSpending: number;
  /** The FIRE number, today's dollars. */
  number: number;
  /** Months to FI (Infinity when it never gets there within 100 years). */
  months: number;
  fiAge: number;
  /** The FIRE number in the dollars of the year you reach it. */
  nominalNumber: number;
  /** How far along you are, 0–1. */
  progress: number;
  lean: FireVariant;
  fat: FireVariant;
  barista: FireVariant;
  coast: { needNow: number; reached: boolean; months: number; age: number };
  /** End-of-year balances in today's dollars, from today (index 0). */
  path: { age: number; balance: number }[];
};

function variant(i: FireInput, annualSave: number, realPct: number, spend: number): FireVariant {
  const number = Math.max(0, spend) / (Math.max(0.1, i.withdrawalPct) / 100);
  const months = monthsToTarget(i.saved, annualSave, realPct, number, i.saveGrowthPct);
  return { number, months, age: i.age + months / 12 };
}

export function fire(i: FireInput): Fire {
  const annualSave = Math.max(0, i.takeHome - i.spending);
  const savingsRate = i.takeHome > 0 ? annualSave / i.takeHome : 0;
  const realPct = realReturn(i.returnPct, i.inflationPct);
  const retireSpending = Math.max(0, i.spending * i.retireShare);
  const main = variant(i, annualSave, realPct, retireSpending);
  const lean = variant(i, annualSave, realPct, retireSpending * LEAN_SHARE);
  const fat = variant(i, annualSave, realPct, retireSpending * FAT_SHARE);
  const barista = variant(i, annualSave, realPct, Math.max(0, retireSpending - Math.max(0, i.partTime)));

  // Coast FIRE: the balance that, left alone, grows to the FIRE number by coastAge.
  const yearsLeft = Math.max(0, i.coastAge - i.age);
  const g = 1 + realPct / 100;
  const needNow = main.number / Math.pow(g, yearsLeft);
  let coastMonths = Infinity;
  {
    const r = monthlyRate(realPct);
    let b = Math.max(0, i.saved);
    let dep = annualSave / 12;
    for (let m = 0; m <= MAX_MONTHS; m++) {
      const ageNow = i.age + m / 12;
      const need = main.number / Math.pow(g, Math.max(0, i.coastAge - ageNow));
      if (b >= need) {
        coastMonths = m;
        break;
      }
      b = b * (1 + r) + dep;
      if ((m + 1) % 12 === 0) dep *= 1 + i.saveGrowthPct / 100;
    }
  }

  const span = Number.isFinite(main.months) ? Math.min(100, Math.max(5, Math.ceil(main.months / 12))) : 40;
  const path: { age: number; balance: number }[] = [{ age: i.age, balance: Math.max(0, i.saved) }];
  {
    const r = monthlyRate(realPct);
    let b = Math.max(0, i.saved);
    let dep = annualSave / 12;
    for (let m = 1; m <= span * 12; m++) {
      b = b * (1 + r) + dep;
      if (m % 12 === 0) {
        path.push({ age: i.age + m / 12, balance: b });
        dep *= 1 + i.saveGrowthPct / 100;
      }
    }
  }

  return {
    annualSave,
    savingsRate,
    realPct,
    retireSpending,
    number: main.number,
    months: main.months,
    fiAge: main.age,
    nominalNumber: Number.isFinite(main.months) ? main.number * Math.pow(1 + i.inflationPct / 100, main.months / 12) : Infinity,
    progress: main.number > 0 ? Math.min(1, Math.max(0, i.saved) / main.number) : 1,
    lean,
    fat,
    barista,
    coast: { needNow, reached: coastMonths === 0, months: coastMonths, age: i.age + coastMonths / 12 },
    path,
  };
}

/**
 * Years to FI at different savings rates for the same take-home pay and
 * starting balance: spending is what's left after saving, and retirement
 * spending is that times `retireShare`.
 */
export function savingsRateTable(
  takeHome: number,
  saved: number,
  realPct: number,
  withdrawalPct: number,
  retireShare = 1,
  rates: number[] = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7],
): { rate: number; save: number; spending: number; number: number; months: number }[] {
  return rates.map((rate) => {
    const save = Math.max(0, takeHome) * rate;
    const spending = Math.max(0, takeHome) - save;
    const number = (spending * retireShare) / (Math.max(0.1, withdrawalPct) / 100);
    return { rate, save, spending, number, months: monthsToTarget(saved, save, realPct, number) };
  });
}

/* ------------------------------------------------------- Emergency fund */

export type Earners = "one" | "two";
export type IncomeType = "salary" | "irregular";
export type JobOutlook = "stable" | "average" | "uncertain";

/** A rule-of-thumb number of months of essential costs to hold, from 3 to 12. */
export function suggestedMonths(o: { earners: Earners; income: IncomeType; dependents: boolean; homeowner: boolean; outlook: JobOutlook }): number {
  let m = o.earners === "two" ? 3 : 6;
  if (o.income === "irregular") m += 3;
  if (o.dependents) m += 1;
  if (o.homeowner) m += 1;
  if (o.outlook === "uncertain") m += 2;
  if (o.outlook === "stable" && m > 3) m -= 1;
  return Math.min(12, Math.max(3, m));
}

export type EmergencyInput = {
  /** Essential monthly costs by category. */
  costs: number[];
  months: number;
  current: number;
  monthlySave: number;
  /** Income you would still have each month if your pay stopped (partner's pay, unemployment benefits). */
  otherIncome: number;
  /** APY on the account the fund sits in, %. */
  apyPct: number;
  /** APY on a regular savings account, for comparison, %. */
  regularApyPct: number;
};

export type Emergency = {
  essentials: number;
  /** Monthly shortfall the fund has to cover once other income is counted. */
  monthlyNeed: number;
  target: number;
  gap: number;
  /** Months of cover the current fund gives (Infinity if other income covers everything). */
  coverNow: number;
  /** Months to reach the target (0 if already there, Infinity if never). */
  monthsToGoal: number;
  /** Interest from the target balance for a year, in the chosen account and a regular one. */
  yearInterest: number;
  yearInterestRegular: number;
  /** Interest earned while building the fund. */
  interestWhileBuilding: number;
  /** End-of-month balances while building, month 0 first (at most 120 months). */
  path: number[];
};

export function emergencyFund(i: EmergencyInput): Emergency {
  const essentials = i.costs.reduce((a, c) => a + Math.max(0, c), 0);
  const monthlyNeed = Math.max(0, essentials - Math.max(0, i.otherIncome));
  const target = monthlyNeed * Math.max(0, i.months);
  const current = Math.max(0, i.current);
  const gap = Math.max(0, target - current);
  const coverNow = monthlyNeed > 0 ? current / monthlyNeed : Infinity;
  const r = monthlyRate(i.apyPct);
  let b = current;
  let deposits = current;
  let months = b >= target ? 0 : Infinity;
  const path = [b];
  for (let m = 1; m <= MAX_MONTHS && months === Infinity; m++) {
    b = b * (1 + r) + Math.max(0, i.monthlySave);
    deposits += Math.max(0, i.monthlySave);
    if (m <= 120) path.push(b);
    if (b >= target) months = m;
  }
  const interestWhileBuilding = Number.isFinite(months) && months > 0 ? b - deposits : 0;
  return {
    essentials,
    monthlyNeed,
    target,
    gap,
    coverNow,
    monthsToGoal: months,
    yearInterest: target * (i.apyPct / 100),
    yearInterestRegular: target * (i.regularApyPct / 100),
    interestWhileBuilding,
    path,
  };
}

/* ------------------------------------------------------------ Net worth */

export type AgeGroup = "under35" | "35to44" | "45to54" | "55to64" | "65to74" | "75plus";

/**
 * Family net worth by age of the reference person, 2022 Survey of Consumer
 * Finances, in 2022 dollars (Federal Reserve Bulletin, October 2023, Table 2).
 */
export const SCF_2022: Record<AgeGroup | "all", { label: string; median: number; mean: number }> = {
  under35: { label: "Under 35", median: 39_000, mean: 183_500 },
  "35to44": { label: "35 to 44", median: 135_600, mean: 549_600 },
  "45to54": { label: "45 to 54", median: 247_200, mean: 975_800 },
  "55to64": { label: "55 to 64", median: 364_500, mean: 1_566_900 },
  "65to74": { label: "65 to 74", median: 409_900, mean: 1_794_600 },
  "75plus": { label: "75 or older", median: 335_600, mean: 1_624_100 },
  all: { label: "All families", median: 192_900, mean: 1_063_700 },
};

export function ageGroup(age: number): AgeGroup {
  if (age < 35) return "under35";
  if (age < 45) return "35to44";
  if (age < 55) return "45to54";
  if (age < 65) return "55to64";
  if (age < 75) return "65to74";
  return "75plus";
}

export type NetWorthInput = {
  cash: number;
  retirement: number;
  investments: number;
  home: number;
  vehicles: number;
  otherAssets: number;
  mortgage: number;
  auto: number;
  student: number;
  cards: number;
  otherDebts: number;
  age: number;
};

export type NetWorth = {
  assets: number;
  liabilities: number;
  net: number;
  /** Liabilities ÷ assets (Infinity when there are debts and no assets). */
  debtToAsset: number;
  homeEquity: number;
  /** Net worth without the home and the mortgage. */
  excludingHome: number;
  /** Cash and taxable investments less consumer debts (cards, auto, student, other). */
  liquid: number;
  group: AgeGroup;
  median: number;
  mean: number;
  /** Net worth as a multiple of the age group's median. */
  vsMedian: number;
};

export function netWorth(i: NetWorthInput): NetWorth {
  const p = (n: number) => Math.max(0, n);
  const assets = p(i.cash) + p(i.retirement) + p(i.investments) + p(i.home) + p(i.vehicles) + p(i.otherAssets);
  const consumer = p(i.auto) + p(i.student) + p(i.cards) + p(i.otherDebts);
  const liabilities = p(i.mortgage) + consumer;
  const net = assets - liabilities;
  const group = ageGroup(i.age);
  const { median, mean } = SCF_2022[group];
  return {
    assets,
    liabilities,
    net,
    debtToAsset: assets > 0 ? liabilities / assets : liabilities > 0 ? Infinity : 0,
    homeEquity: p(i.home) - p(i.mortgage),
    excludingHome: net - (p(i.home) - p(i.mortgage)),
    liquid: p(i.cash) + p(i.investments) - consumer,
    group,
    median,
    mean,
    vsMedian: net / median,
  };
}

/* ------------------------------------------------------------ Dividends */

export type DividendTax = {
  dividends: number;
  qualified: number;
  nonQualified: number;
  /** Federal income tax on the dividends (qualified at 0/15/20%, the rest at ordinary rates). */
  incomeTax: number;
  niit: number;
  total: number;
  /** The same dividends taxed entirely as ordinary income (plus NIIT). */
  ifAllOrdinary: number;
  effective: number;
};

/**
 * Federal tax caused by a year's dividends, for a household with `agi` of
 * other income (before the dividends) taking the standard deduction.
 * Non-qualified dividends stack on ordinary income; qualified dividends sit
 * on top and use the long-term capital gains rates. NIIT applies at 3.8%
 * above the thresholds.
 */
export function dividendTax(agi: number, dividends: number, qualifiedShare: number, status: FilingStatus): DividendTax {
  const d = Math.max(0, dividends);
  const qualified = d * Math.min(1, Math.max(0, qualifiedShare));
  const nonQualified = d - qualified;
  const baseTaxable = Math.max(0, Math.max(0, agi) - standardDeduction(status));
  const before = ordinaryTax(baseTaxable, status).tax;
  // Dividends first fill any unused standard deduction.
  const taxableAll = Math.max(0, Math.max(0, agi) + d - standardDeduction(status));
  const qualifiedIn = Math.min(qualified, taxableAll);
  const ordinaryPart = taxableAll - qualifiedIn;
  const incomeTax = ordinaryTax(ordinaryPart, status).tax + longTermGainsTax(ordinaryPart, qualifiedIn, status).tax - before;
  const n = niit(Math.max(0, agi) + d, d, status);
  const ifAllOrdinary = ordinaryTax(taxableAll, status).tax - before + n;
  const total = incomeTax + n;
  return { dividends: d, qualified, nonQualified, incomeTax, niit: n, total, ifAllOrdinary, effective: d > 0 ? total / d : 0 };
}

export type DividendInput = {
  start: number;
  monthly: number;
  /** Dividend yield on today's price, %. */
  yieldPct: number;
  /** Yearly growth of the dividend per share, %. */
  dividendGrowthPct: number;
  /** Yearly growth of the share price, %. */
  priceGrowthPct: number;
  years: number;
  drip: boolean;
};

export type DividendYear = {
  year: number;
  deposits: number;
  dividends: number;
  /** Dividends paid out in cash so far (no DRIP). */
  cashTotal: number;
  value: number;
  /** Yearly dividend income at the end of the year (the forward run rate). */
  income: number;
};

export type DividendPlan = {
  value: number;
  deposits: number;
  totalDividends: number;
  /** Dividends taken as cash (0 with DRIP). */
  cash: number;
  /** Yearly dividend income at the end. */
  finalIncome: number;
  firstYearDividends: number;
  /** Final yearly income ÷ total deposits. */
  yieldOnCost: number;
  years: DividendYear[];
};

/**
 * Shares bought at a price that grows each month; dividends paid quarterly
 * on the shares held, at a per-share rate that grows each month. With DRIP
 * every dividend buys more shares at that day's price; without, it is paid
 * out. Deposits arrive at the end of each month. Taxes are not taken from
 * the account (see dividendTax).
 */
export function dividendPlan(i: DividendInput): DividendPlan {
  const pg = monthlyRate(i.priceGrowthPct);
  const dg = monthlyRate(i.dividendGrowthPct);
  let price = 1;
  let dps = Math.max(0, i.yieldPct) / 100; // yearly dividend per share at price 1
  let shares = Math.max(0, i.start);
  let deposits = shares;
  let total = 0;
  let cash = 0;
  let yearDivs = 0;
  let firstYear = 0;
  const years: DividendYear[] = [];
  const n = Math.max(0, Math.round(i.years * 12));
  for (let m = 1; m <= n; m++) {
    price *= 1 + pg;
    dps *= 1 + dg;
    if (m % 3 === 0) {
      const paid = (shares * dps) / 4;
      total += paid;
      yearDivs += paid;
      if (i.drip) shares += paid / price;
      else cash += paid;
    }
    const dep = Math.max(0, i.monthly);
    shares += dep / price;
    deposits += dep;
    if (m % 12 === 0 || m === n) {
      if (m <= 12) firstYear = yearDivs;
      years.push({ year: Math.ceil(m / 12), deposits, dividends: yearDivs, cashTotal: cash, value: shares * price, income: shares * dps });
      yearDivs = 0;
    }
  }
  const finalIncome = shares * dps;
  return {
    value: shares * price,
    deposits,
    totalDividends: total,
    cash,
    finalIncome,
    firstYearDividends: firstYear,
    yieldOnCost: deposits > 0 ? finalIncome / deposits : 0,
    years,
  };
}

/* ------------------------------------------------- High-yield savings */

export type SavingsAccountInput = {
  deposit: number;
  monthly: number;
  apyPct: number;
  /** Change in the APY after the first 12 months, percentage points. */
  laterChange: number;
  years: number;
  /** Combined tax rate on interest (federal + state), as a share. */
  taxRate: number;
  /** Monthly maintenance fee, dollars. */
  fee: number;
};

export type SavingsAccount = {
  balance: number;
  deposits: number;
  interest: number;
  tax: number;
  fees: number;
  /** Balance if the tax on each year's interest is paid out of the account. */
  afterTax: number;
  years: { year: number; balance: number; interest: number; afterTax: number }[];
};

/**
 * A savings account: interest credited monthly at the APY's monthly
 * equivalent, deposits at the end of each month, fees taken monthly. Tax on
 * each year's interest is shown separately, and in `afterTax` it is paid
 * from the account each December.
 */
export function savingsAccount(i: SavingsAccountInput): SavingsAccount {
  let b = Math.max(0, i.deposit);
  let bt = b;
  let deposits = b;
  let interest = 0;
  let tax = 0;
  let fees = 0;
  let yearInterestT = 0;
  const years: SavingsAccount["years"] = [];
  const n = Math.max(0, Math.round(i.years * 12));
  for (let m = 1; m <= n; m++) {
    const apyNow = Math.max(0, m <= 12 ? i.apyPct : i.apyPct + i.laterChange);
    const r = monthlyRate(apyNow);
    const earned = b * r;
    const earnedT = bt * r;
    const fee = Math.min(Math.max(0, i.fee), b + earned);
    b += earned - fee + Math.max(0, i.monthly);
    bt += earnedT - Math.min(Math.max(0, i.fee), bt + earnedT) + Math.max(0, i.monthly);
    interest += earned;
    fees += fee;
    yearInterestT += earnedT;
    deposits += Math.max(0, i.monthly);
    if (m % 12 === 0 || m === n) {
      const t = Math.max(0, yearInterestT) * Math.max(0, i.taxRate);
      bt -= t;
      tax += t;
      yearInterestT = 0;
      years.push({ year: Math.ceil(m / 12), balance: b, interest, afterTax: bt });
    }
  }
  return { balance: b, deposits, interest, tax, fees, afterTax: bt, years };
}
