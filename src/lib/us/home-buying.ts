/**
 * US home buying: rent vs buy over the years you stay, down payment options
 * and the time to save them, FHA loans (upfront and annual MIP), VA loans
 * (funding fee) and rental property returns (NOI, cap rate, cash-on-cash,
 * DSCR, depreciation and the return over a holding period).
 *
 * Built on the tested engines in loans.ts and mortgage.ts. Program figures are
 * named constants with their source; recheck them each year.
 */

import { amortize, monthlyPayment, type Schedule } from "./loans";
import { mortgage } from "./mortgage";

// ── Program figures ──────────────────────────────────────────────────────

/** FHFA, "Conforming Loan Limit Values for 2026" (November 25, 2025): one-unit baseline and high-cost ceiling. */
export const CONFORMING_2026 = { baseline: 832_750, ceiling: 1_249_125 };

/**
 * HUD Mortgagee Letter 2025-23 (December 11, 2025): 2026 FHA one-unit forward
 * mortgage limits. The floor applies in lower-cost counties, the ceiling in the
 * highest-cost ones (higher still in Alaska, Hawaii, Guam and the Virgin Islands).
 */
export const FHA_LIMITS_2026 = { floor: 541_287, ceiling: 1_249_125 };

/**
 * FHA rules: 3.5% minimum down with a credit score of 580 or more, 10% with
 * 500 to 579, not eligible below 500 (HUD Handbook 4000.1). Upfront MIP is
 * 1.75% of the base loan; the annual MIP table is from Mortgagee Letter 2023-05
 * (case numbers endorsed from March 20, 2023), with its $726,200 base loan line.
 */
export const FHA_RULES = { minDownPct: 3.5, lowScoreDownPct: 10, score35: 580, minScore: 500, upfrontMip: 0.0175, baseLoanLine: 726_200 };

/**
 * VA funding fee (VA.gov, rates from April 7, 2023, unchanged for 2026), as a
 * percent of the loan, for purchase and construction loans: [under 5% down,
 * 5% to under 10%, 10% or more].
 */
export const VA_FUNDING_FEE = { firstUse: [2.15, 1.5, 1.25], subsequent: [3.3, 1.5, 1.25], cashOutFirst: 2.15, cashOutSubsequent: 3.3, irrrl: 0.5 };

/**
 * VA residual income guide for loans of $80,000 or more (VA Lenders Handbook,
 * M26-7 chapter 4), monthly, by family size 1 to 5; add $80 for each member over 5.
 */
export const VA_RESIDUAL = {
  regions: ["Northeast", "Midwest", "South", "West"] as const,
  rows: [
    [450, 441, 441, 491],
    [755, 738, 738, 823],
    [909, 889, 889, 990],
    [1_025, 1_003, 1_003, 1_117],
    [1_062, 1_039, 1_039, 1_158],
  ],
  extraPerMember: 80,
};

/** IRS Publication 527: residential rental buildings are depreciated straight line over 27.5 years (mid-month convention). */
export const RENTAL_DEPRECIATION_YEARS = 27.5;

// ── Small helpers ────────────────────────────────────────────────────────

const pos = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

/** Monthly growth factor for a yearly percentage rate (compounded). */
function monthlyFromYearly(pct: number): number {
  return Math.pow(1 + pct / 100, 1 / 12) - 1;
}

/** Average of the start-of-month balances in each loan year (for FHA annual MIP). */
function yearlyAverageBalances(loan: number, s: Schedule): number[] {
  const out: number[] = [];
  let start = loan;
  let sum = 0;
  s.rows.forEach((r, k) => {
    sum += start;
    start = r.balance;
    if ((k + 1) % 12 === 0 || k === s.rows.length - 1) {
      // A short final year still charges MIP only for the months it runs.
      out.push(sum / 12);
      sum = 0;
    }
  });
  return out;
}

/**
 * Internal rate of return of yearly cash flows (flows[0] is the start, usually
 * negative). Found by bisection between -99% and +1,000%; null if the flows
 * never change sign.
 */
export function irr(flows: number[]): number | null {
  const npv = (r: number) => flows.reduce((acc, f, t) => acc + f / Math.pow(1 + r, t), 0);
  const hasNeg = flows.some((f) => f < 0);
  const hasPos = flows.some((f) => f > 0);
  if (!hasNeg || !hasPos) return null;
  let lo = -0.99;
  let hi = 10;
  let flo = npv(lo);
  if (flo * npv(hi) > 0) return null;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    const fm = npv(mid);
    if (fm * flo <= 0) hi = mid;
    else {
      lo = mid;
      flo = fm;
    }
  }
  return (lo + hi) / 2;
}

// ── Saving for a down payment ────────────────────────────────────────────

/** Months to grow `saved` to `target` with `monthly` deposits at an APY (Infinity if over 100 years). */
export function monthsToSave(target: number, saved: number, monthly: number, apyPct: number): number {
  const r = monthlyFromYearly(apyPct);
  let b = pos(saved);
  for (let m = 0; m <= 1_200; m++) {
    if (b >= target - 0.005) return m;
    b = b * (1 + r) + pos(monthly);
  }
  return Infinity;
}

/** The monthly deposit that turns `saved` into `target` in `months` at an APY. */
export function monthlyToSave(target: number, saved: number, months: number, apyPct: number): number {
  const r = monthlyFromYearly(apyPct);
  const n = Math.max(1, Math.round(months));
  const gap = Math.max(0, target - pos(saved) * Math.pow(1 + r, n));
  if (r === 0) return gap / n;
  return (gap * r) / (Math.pow(1 + r, n) - 1);
}

// ── FHA ──────────────────────────────────────────────────────────────────

/** Minimum FHA down payment (percent) for a credit score, or null below 500. */
export function fhaMinDownPct(score: number): number | null {
  if (score >= FHA_RULES.score35) return FHA_RULES.minDownPct;
  if (score >= FHA_RULES.minScore) return FHA_RULES.lowScoreDownPct;
  return null;
}

export type FhaMip = {
  /** Annual MIP as a share of the loan a year (0.0055 = 0.55%). */
  rate: number;
  /** True if annual MIP stops after 11 years; false if it lasts the whole term. */
  elevenYears: boolean;
};

/** The annual MIP rate and its duration (Mortgagee Letter 2023-05). `ltv` is the base loan ÷ value. */
export function fhaAnnualMip(baseLoan: number, ltv: number, termYears: number): FhaMip {
  const e = 1e-9;
  const big = baseLoan > FHA_RULES.baseLoanLine;
  if (termYears > 15) {
    if (ltv <= 0.9 + e) return { rate: big ? 0.007 : 0.005, elevenYears: true };
    if (ltv <= 0.95 + e) return { rate: big ? 0.007 : 0.005, elevenYears: false };
    return { rate: big ? 0.0075 : 0.0055, elevenYears: false };
  }
  if (!big) return ltv <= 0.9 + e ? { rate: 0.0015, elevenYears: true } : { rate: 0.004, elevenYears: false };
  if (ltv <= 0.78 + e) return { rate: 0.0015, elevenYears: true };
  if (ltv <= 0.9 + e) return { rate: 0.004, elevenYears: true };
  return { rate: 0.0065, elevenYears: false };
}

export type FhaInput = {
  price: number;
  /** Down payment as a percent of the price. */
  downPct: number;
  aprPct: number;
  years: number;
  /** Property tax a year. */
  propertyTax: number;
  /** Homeowners insurance a year. */
  insurance: number;
  /** HOA dues a month. */
  hoa: number;
  /** Add the upfront MIP to the loan (usual) instead of paying it at closing. */
  financeUfmip: boolean;
};

export type FhaLoan = {
  down: number;
  baseLoan: number;
  ltv: number;
  ufmip: number;
  /** The loan you repay: base loan plus any financed upfront MIP. */
  loan: number;
  mip: FhaMip;
  /** Months annual MIP is paid. */
  mipMonths: number;
  principalAndInterest: number;
  /** Annual MIP in the first year, a month. */
  mipMonthly: number;
  /** Annual MIP a month in each loan year (0 once it stops). */
  mipByYear: number[];
  /** All annual MIP paid over its duration. */
  annualMipTotal: number;
  taxMonthly: number;
  insuranceMonthly: number;
  hoa: number;
  /** The first month's full payment. */
  total: number;
  schedule: Schedule;
  /** Cash at closing for the down payment and any unfinanced upfront MIP (closing costs not included). */
  cashForLoan: number;
};

/**
 * An FHA purchase loan. Annual MIP each year is the rate times the average
 * scheduled balance of the base loan over that year, ÷ 12, as HUD charges it.
 */
export function fhaLoan(i: FhaInput): FhaLoan {
  const price = pos(i.price);
  const down = Math.min(price, (price * pos(i.downPct)) / 100);
  const baseLoan = Math.max(0, price - down);
  const ltv = price > 0 ? baseLoan / price : 0;
  const ufmip = baseLoan * FHA_RULES.upfrontMip;
  const loan = baseLoan + (i.financeUfmip ? ufmip : 0);
  const months = Math.max(1, Math.round(i.years * 12));
  const mip = fhaAnnualMip(baseLoan, ltv, i.years);
  const mipMonths = baseLoan > 0 ? (mip.elevenYears ? Math.min(132, months) : months) : 0;
  const schedule = amortize(loan, i.aprPct, months);
  const baseSchedule = amortize(baseLoan, i.aprPct, months);
  const avg = yearlyAverageBalances(baseLoan, baseSchedule);
  const mipYears = Math.ceil(mipMonths / 12);
  const mipByYear = avg.map((b, y) => (y < mipYears ? (b * mip.rate) / 12 : 0));
  const annualMipTotal = mipByYear.reduce((a, m) => a + m * 12, 0);
  const principalAndInterest = monthlyPayment(loan, i.aprPct, months);
  const taxMonthly = pos(i.propertyTax) / 12;
  const insuranceMonthly = pos(i.insurance) / 12;
  const mipMonthly = mipByYear[0] ?? 0;
  return {
    down,
    baseLoan,
    ltv,
    ufmip,
    loan,
    mip,
    mipMonths,
    principalAndInterest,
    mipMonthly,
    mipByYear,
    annualMipTotal,
    taxMonthly,
    insuranceMonthly,
    hoa: pos(i.hoa),
    total: principalAndInterest + mipMonthly + taxMonthly + insuranceMonthly + pos(i.hoa),
    schedule,
    cashForLoan: down + (i.financeUfmip ? 0 : ufmip),
  };
}

// ── VA ───────────────────────────────────────────────────────────────────

/** VA funding fee for a purchase, as a percent of the loan (0 if exempt). */
export function vaFundingFeePct(downShare: number, firstUse: boolean, exempt: boolean): number {
  if (exempt) return 0;
  const t = firstUse ? VA_FUNDING_FEE.firstUse : VA_FUNDING_FEE.subsequent;
  const e = 1e-9;
  if (downShare >= 0.1 - e) return t[2];
  if (downShare >= 0.05 - e) return t[1];
  return t[0];
}

/** VA residual income guide for a family size and region (loans of $80,000 or more). */
export function vaResidualIncome(familySize: number, region: number): number {
  const size = Math.max(1, Math.round(familySize));
  const col = Math.min(3, Math.max(0, Math.round(region)));
  const base = VA_RESIDUAL.rows[Math.min(5, size) - 1][col];
  return base + Math.max(0, size - 5) * VA_RESIDUAL.extraPerMember;
}

export type VaInput = {
  price: number;
  down: number;
  aprPct: number;
  years: number;
  firstUse: boolean;
  /** Exempt from the funding fee (service-connected disability compensation, Purple Heart on active duty, DIC). */
  exempt: boolean;
  /** Add the funding fee to the loan instead of paying it at closing. */
  financeFee: boolean;
  propertyTax: number;
  insurance: number;
  hoa: number;
};

export type VaLoan = {
  down: number;
  downShare: number;
  baseLoan: number;
  feePct: number;
  fee: number;
  loan: number;
  principalAndInterest: number;
  taxMonthly: number;
  insuranceMonthly: number;
  hoa: number;
  total: number;
  schedule: Schedule;
  /** Payment and interest if the fee were paid in cash instead (base loan only). */
  basePayment: number;
  /** Extra interest over the term from financing the fee. */
  feeInterest: number;
  cashForLoan: number;
};

export function vaLoan(i: VaInput): VaLoan {
  const price = pos(i.price);
  const down = Math.min(price, pos(i.down));
  const downShare = price > 0 ? down / price : 0;
  const baseLoan = Math.max(0, price - down);
  const feePct = baseLoan > 0 ? vaFundingFeePct(downShare, i.firstUse, i.exempt) : 0;
  const fee = (baseLoan * feePct) / 100;
  const loan = baseLoan + (i.financeFee ? fee : 0);
  const months = Math.max(1, Math.round(i.years * 12));
  const schedule = amortize(loan, i.aprPct, months);
  const principalAndInterest = monthlyPayment(loan, i.aprPct, months);
  const basePayment = monthlyPayment(baseLoan, i.aprPct, months);
  const taxMonthly = pos(i.propertyTax) / 12;
  const insuranceMonthly = pos(i.insurance) / 12;
  const feeInterest = i.financeFee && fee > 0 ? (principalAndInterest - basePayment) * months - fee : 0;
  return {
    down,
    downShare,
    baseLoan,
    feePct,
    fee,
    loan,
    principalAndInterest,
    taxMonthly,
    insuranceMonthly,
    hoa: pos(i.hoa),
    total: principalAndInterest + taxMonthly + insuranceMonthly + pos(i.hoa),
    schedule,
    basePayment,
    feeInterest,
    cashForLoan: down + (i.financeFee ? 0 : fee),
  };
}

// ── Down payment options ─────────────────────────────────────────────────

export type DownProgram = "conventional" | "fha";
export type DownChoice = { key: string; label: string; pct: number; program: DownProgram };

export const DOWN_CHOICES: DownChoice[] = [
  { key: "c3", label: "3% conventional", pct: 3, program: "conventional" },
  { key: "f35", label: "3.5% FHA", pct: 3.5, program: "fha" },
  { key: "c5", label: "5% conventional", pct: 5, program: "conventional" },
  { key: "c10", label: "10% conventional", pct: 10, program: "conventional" },
  { key: "c20", label: "20% conventional", pct: 20, program: "conventional" },
];

export type DownInput = {
  price: number;
  aprPct: number;
  /** Rate on the FHA option (often a little different). */
  fhaAprPct: number;
  years: number;
  /** PMI on conventional loans under 20% down, a share of the loan a year (0.005 = 0.5%). */
  pmiRate: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  /** Closing costs as a share of the price (0.03 = 3%). */
  closingShare: number;
};

export type DownRow = DownChoice & {
  down: number;
  /** The loan you repay (FHA includes the financed 1.75% upfront MIP). */
  loan: number;
  principalAndInterest: number;
  /** PMI or annual MIP in the first month. */
  insuranceMonthly: number;
  /** Months of PMI or MIP; for FHA, the whole term when it lasts for life. */
  insuranceMonths: number;
  insuranceForLife: boolean;
  /** All PMI or annual MIP paid, plus the FHA upfront MIP. */
  insuranceTotal: number;
  total: number;
  closingCosts: number;
  cashToClose: number;
  totalInterest: number;
  /** Everything paid over the first five years: cash to close plus 60 payments (housing costs included). */
  fiveYear: number;
  jumbo: boolean;
};

export function downPaymentRow(c: DownChoice, i: DownInput): DownRow {
  const price = pos(i.price);
  const closingCosts = price * pos(i.closingShare);
  const months = Math.max(1, Math.round(i.years * 12));
  if (c.program === "fha") {
    const f = fhaLoan({ price, downPct: c.pct, aprPct: i.fhaAprPct, years: i.years, propertyTax: i.propertyTax, insurance: i.insurance, hoa: i.hoa, financeUfmip: true });
    let five = 0;
    for (let m = 0; m < Math.min(60, months); m++) {
      five += f.principalAndInterest + (f.mipByYear[Math.floor(m / 12)] ?? 0) + f.taxMonthly + f.insuranceMonthly + f.hoa;
    }
    return {
      ...c,
      down: f.down,
      loan: f.loan,
      principalAndInterest: f.principalAndInterest,
      insuranceMonthly: f.mipMonthly,
      insuranceMonths: f.mipMonths,
      insuranceForLife: !f.mip.elevenYears,
      insuranceTotal: f.annualMipTotal + f.ufmip,
      total: f.total,
      closingCosts,
      cashToClose: f.down + closingCosts,
      totalInterest: f.schedule.totalInterest,
      fiveYear: f.down + closingCosts + five,
      jumbo: false,
    };
  }
  const down = (price * c.pct) / 100;
  const m = mortgage({ price, down, aprPct: i.aprPct, years: i.years, propertyTax: i.propertyTax, insurance: i.insurance, hoa: i.hoa, pmiRate: i.pmiRate, extra: 0 });
  const five = m.total * Math.min(60, months) - m.pmiMonthly * Math.max(0, Math.min(60, months) - m.pmiMonths);
  return {
    ...c,
    down,
    loan: m.loan,
    principalAndInterest: m.principalAndInterest,
    insuranceMonthly: m.pmiMonthly,
    insuranceMonths: m.pmiMonths,
    insuranceForLife: false,
    insuranceTotal: m.pmiTotal,
    total: m.total,
    closingCosts,
    cashToClose: down + closingCosts,
    totalInterest: m.schedule.totalInterest,
    fiveYear: down + closingCosts + five,
    jumbo: m.loan > CONFORMING_2026.baseline,
  };
}

export function downPaymentOptions(i: DownInput, extraPct?: number): DownRow[] {
  const rows = DOWN_CHOICES.map((c) => downPaymentRow(c, i));
  if (extraPct !== undefined && !DOWN_CHOICES.some((c) => c.program === "conventional" && c.pct === extraPct)) {
    const custom = downPaymentRow({ key: "custom", label: `${extraPct}% conventional`, pct: extraPct, program: "conventional" }, i);
    return [...rows, custom].sort((a, b) => a.pct - b.pct || (a.program === "fha" ? 1 : -1));
  }
  return rows;
}

// ── Rent vs buy ──────────────────────────────────────────────────────────

export type RentBuyInput = {
  price: number;
  /** Down payment, percent of the price. */
  downPct: number;
  aprPct: number;
  years: number;
  /** Buying closing costs, percent of the price. */
  buyClosingPct: number;
  /** Selling costs (agent commissions, transfer tax, fees), percent of the sale price. */
  sellCostPct: number;
  /** Property tax, percent of the home's value a year. */
  taxRatePct: number;
  /** Homeowners insurance in year one. */
  insurance: number;
  /** HOA dues a month in year one. */
  hoa: number;
  /** Maintenance and repairs, percent of the home's value a year. */
  maintenancePct: number;
  /** PMI, percent of the loan a year while under 20% equity (78% of the price on schedule). */
  pmiPct: number;
  /** Home price growth a year, percent. */
  appreciationPct: number;
  /** Growth of insurance and HOA dues a year, percent. */
  costGrowthPct: number;
  /** Rent a month today. */
  rent: number;
  rentGrowthPct: number;
  /** Renters insurance a year. */
  rentersInsurance: number;
  /** Return on money invested instead (yearly, percent). */
  investReturnPct: number;
  /** Tax on investment gains when you cash in (percent). Home gains are assumed covered by the $250,000/$500,000 exclusion. */
  gainsTaxPct: number;
  /** Years to compare. */
  stay: number;
};

export type RentBuyYear = {
  year: number;
  homeValue: number;
  balance: number;
  /** Home value less selling costs less the loan, plus any money the buyer invested. */
  buyNetWorth: number;
  rentNetWorth: number;
  buyCostYear: number;
  rentCostYear: number;
};

export type RentBuy = {
  upfront: number;
  closingCosts: number;
  loan: number;
  firstBuyMonthly: number;
  firstRentMonthly: number;
  years: RentBuyYear[];
  /** First year buying leaves you better off and stays ahead to the end; null if renting wins throughout. */
  breakEvenYear: number | null;
  final: RentBuyYear;
  /** Buying minus renting at the end (positive: buying wins). */
  advantage: number;
  /** Money that does not come back, over the whole stay. */
  buyUnrecoverable: { interest: number; tax: number; insurance: number; maintenance: number; hoa: number; pmi: number; closing: number; selling: number; total: number };
  rentUnrecoverable: { rent: number; insurance: number; total: number };
  /** Price ÷ a year's rent. */
  priceToRent: number;
};

/**
 * Year-by-year comparison. Both households start with the same cash (down
 * payment plus closing costs). The renter invests it; each month whoever pays
 * less invests the difference. Net worth counts the home at its value less
 * selling costs and the loan balance, and investments after tax on gains.
 */
export function rentVsBuy(i: RentBuyInput): RentBuy {
  const price = pos(i.price);
  const down = Math.min(price, (price * pos(i.downPct)) / 100);
  const loan = Math.max(0, price - down);
  const closingCosts = (price * pos(i.buyClosingPct)) / 100;
  const upfront = down + closingCosts;
  const n = Math.max(1, Math.round(i.years * 12));
  const r = pos(i.aprPct) / 100 / 12;
  const pi = monthlyPayment(loan, i.aprPct, n);
  const stay = Math.max(1, Math.min(40, Math.round(i.stay)));
  const inv = monthlyFromYearly(i.investReturnPct);
  const app = monthlyFromYearly(i.appreciationPct);
  const gainsTax = pos(i.gainsTaxPct) / 100;

  let balance = loan;
  let value = price;
  let rentInv = upfront;
  let rentBasis = upfront;
  let buyInv = 0;
  let buyBasis = 0;
  let rent = pos(i.rent);
  let insurance = pos(i.insurance);
  let hoa = pos(i.hoa);
  let rentersIns = pos(i.rentersInsurance);
  const pmiOn = loan > price * 0.8;
  const bu = { interest: 0, tax: 0, insurance: 0, maintenance: 0, hoa: 0, pmi: 0, closing: closingCosts, selling: 0, total: 0 };
  const ru = { rent: 0, insurance: 0, total: 0 };
  const years: RentBuyYear[] = [];
  let firstBuyMonthly = 0;
  let firstRentMonthly = 0;
  let yearValueStart = price;
  let buyCostYear = 0;
  let rentCostYear = 0;

  for (let m = 1; m <= stay * 12; m++) {
    const interest = balance * r;
    const pay = balance > 0.005 ? Math.min(pi, balance + interest) : 0;
    const principal = Math.max(0, pay - interest);
    const pmi = pmiOn && balance > price * 0.78 ? (loan * pos(i.pmiPct)) / 100 / 12 : 0;
    const tax = (yearValueStart * pos(i.taxRatePct)) / 100 / 12;
    const maint = (yearValueStart * pos(i.maintenancePct)) / 100 / 12;
    const buyCost = pay + pmi + tax + insurance / 12 + hoa + maint;
    const rentCost = rent + rentersIns / 12;
    if (m === 1) {
      firstBuyMonthly = buyCost;
      firstRentMonthly = rentCost;
    }
    bu.interest += balance > 0.005 ? interest : 0;
    bu.tax += tax;
    bu.insurance += insurance / 12;
    bu.maintenance += maint;
    bu.hoa += hoa;
    bu.pmi += pmi;
    ru.rent += rent;
    ru.insurance += rentersIns / 12;
    buyCostYear += buyCost;
    rentCostYear += rentCost;
    balance = Math.max(0, balance - principal);
    value *= 1 + app;
    rentInv *= 1 + inv;
    buyInv *= 1 + inv;
    const diff = buyCost - rentCost;
    if (diff > 0) {
      rentInv += diff;
      rentBasis += diff;
    } else {
      buyInv += -diff;
      buyBasis += -diff;
    }
    if (m % 12 === 0) {
      const sell = (value * pos(i.sellCostPct)) / 100;
      const afterTax = (bal: number, basis: number) => bal - Math.max(0, bal - basis) * gainsTax;
      years.push({
        year: m / 12,
        homeValue: value,
        balance,
        buyNetWorth: value - sell - balance + afterTax(buyInv, buyBasis),
        rentNetWorth: afterTax(rentInv, rentBasis),
        buyCostYear,
        rentCostYear,
      });
      buyCostYear = 0;
      rentCostYear = 0;
      yearValueStart = value;
      rent *= 1 + i.rentGrowthPct / 100;
      insurance *= 1 + i.costGrowthPct / 100;
      hoa *= 1 + i.costGrowthPct / 100;
      rentersIns *= 1 + i.costGrowthPct / 100;
    }
  }
  const final = years[years.length - 1];
  bu.selling = (final.homeValue * pos(i.sellCostPct)) / 100;
  bu.total = bu.interest + bu.tax + bu.insurance + bu.maintenance + bu.hoa + bu.pmi + bu.closing + bu.selling;
  ru.total = ru.rent + ru.insurance;
  let breakEvenYear: number | null = null;
  for (let k = years.length - 1; k >= 0; k--) {
    if (years[k].buyNetWorth >= years[k].rentNetWorth) breakEvenYear = years[k].year;
    else break;
  }
  return {
    upfront,
    closingCosts,
    loan,
    firstBuyMonthly,
    firstRentMonthly,
    years,
    breakEvenYear,
    final,
    advantage: final.buyNetWorth - final.rentNetWorth,
    buyUnrecoverable: bu,
    rentUnrecoverable: ru,
    priceToRent: i.rent > 0 ? price / (i.rent * 12) : Infinity,
  };
}

// ── Rental property ──────────────────────────────────────────────────────

export type RentalInput = {
  price: number;
  /** Down payment, percent of the price. */
  downPct: number;
  /** Closing costs paid in cash. */
  closingCosts: number;
  /** Repairs before renting, paid in cash. */
  rehab: number;
  aprPct: number;
  years: number;
  /** Rent a month. */
  rent: number;
  /** Other income a month (parking, laundry, pet fees). */
  otherIncome: number;
  vacancyPct: number;
  /** Property management, percent of collected rent. */
  managementPct: number;
  /** Repairs, percent of rent. */
  maintenancePct: number;
  /** Capital expenditures reserve (roof, HVAC, appliances), percent of rent. */
  capexPct: number;
  propertyTax: number;
  insurance: number;
  /** HOA dues a month. */
  hoa: number;
  /** Utilities and other owner costs a month. */
  utilities: number;
  appreciationPct: number;
  rentGrowthPct: number;
  expenseGrowthPct: number;
  /** Years held before selling. */
  hold: number;
  sellCostPct: number;
  /** Share of the price that is land (not depreciable), percent. */
  landPct: number;
};

export type RentalYear = {
  year: number;
  income: number;
  expenses: number;
  noi: number;
  debtService: number;
  cashFlow: number;
  interest: number;
  depreciation: number;
  /** NOI less mortgage interest and depreciation: the taxable rental profit or loss before other deductions. */
  taxable: number;
  value: number;
  balance: number;
  equity: number;
};

export type Rental = {
  down: number;
  loan: number;
  cashInvested: number;
  grossRent: number;
  /** Gross yearly income after vacancy. */
  effectiveIncome: number;
  vacancy: number;
  expenses: { management: number; maintenance: number; capex: number; tax: number; insurance: number; hoa: number; utilities: number; total: number };
  noi: number;
  debtService: number;
  cashFlow: number;
  capRate: number;
  cashOnCash: number;
  /** NOI ÷ debt service (Infinity with no loan). */
  dscr: number;
  /** Monthly rent ÷ price. */
  onePercent: number;
  /** Price ÷ yearly gross rent. */
  grm: number;
  /** Occupancy needed to cover expenses and the mortgage. */
  breakEvenOccupancy: number;
  /** Depreciation a full year. */
  depreciationYear: number;
  years: RentalYear[];
  sale: { price: number; costs: number; payoff: number; proceeds: number };
  totalCashFlow: number;
  /** Cash flow plus sale proceeds less the cash invested. */
  totalProfit: number;
  /** Internal rate of return before tax, a year (null if undefined). */
  irr: number | null;
  equityMultiple: number;
  depreciationTotal: number;
};

export function rentalProperty(i: RentalInput): Rental {
  const price = pos(i.price);
  const down = Math.min(price, (price * pos(i.downPct)) / 100);
  const loan = Math.max(0, price - down);
  const cashInvested = down + pos(i.closingCosts) + pos(i.rehab);
  const n = Math.max(1, Math.round(i.years * 12));
  const pi = loan > 0 ? monthlyPayment(loan, i.aprPct, n) : 0;
  const schedule = amortize(loan, i.aprPct, n);
  const hold = Math.max(1, Math.min(40, Math.round(i.hold)));
  const basis = (price + pos(i.rehab) + pos(i.closingCosts)) * (1 - Math.min(100, pos(i.landPct)) / 100);
  const depreciationYear = basis / RENTAL_DEPRECIATION_YEARS;

  const yearFigures = (y: number) => {
    const rg = Math.pow(1 + i.rentGrowthPct / 100, y - 1);
    const eg = Math.pow(1 + i.expenseGrowthPct / 100, y - 1);
    const gross = (pos(i.rent) + pos(i.otherIncome)) * 12 * rg;
    const vacancy = (gross * Math.min(100, pos(i.vacancyPct))) / 100;
    const effective = gross - vacancy;
    const management = (effective * pos(i.managementPct)) / 100;
    const maintenance = (gross * pos(i.maintenancePct)) / 100;
    const capex = (gross * pos(i.capexPct)) / 100;
    const tax = pos(i.propertyTax) * eg;
    const insurance = pos(i.insurance) * eg;
    const hoa = pos(i.hoa) * 12 * eg;
    const utilities = pos(i.utilities) * 12 * eg;
    const total = management + maintenance + capex + tax + insurance + hoa + utilities;
    return { gross, vacancy, effective, expenses: { management, maintenance, capex, tax, insurance, hoa, utilities, total }, noi: effective - total };
  };

  const y1 = yearFigures(1);
  const debtService = pi * 12;
  const years: RentalYear[] = [];
  let depLeft = basis;
  let depreciationTotal = 0;
  for (let y = 1; y <= hold; y++) {
    const f = yearFigures(y);
    const rows = schedule.rows.slice((y - 1) * 12, y * 12);
    const interest = rows.reduce((a, r) => a + r.interest, 0);
    const ds = rows.reduce((a, r) => a + r.payment, 0);
    const balance = y * 12 <= schedule.rows.length ? schedule.rows[y * 12 - 1].balance : 0;
    // Mid-month convention, placed in service in January: 11.5 months in year one.
    const dep = Math.min(depLeft, y === 1 ? (depreciationYear * 11.5) / 12 : depreciationYear);
    depLeft -= dep;
    depreciationTotal += dep;
    const value = price * Math.pow(1 + i.appreciationPct / 100, y);
    years.push({
      year: y,
      income: f.effective,
      expenses: f.expenses.total,
      noi: f.noi,
      debtService: ds,
      cashFlow: f.noi - ds,
      interest,
      depreciation: dep,
      taxable: f.noi - interest - dep,
      value,
      balance,
      equity: value - balance,
    });
  }
  const last = years[years.length - 1];
  const saleCosts = (last.value * pos(i.sellCostPct)) / 100;
  const proceeds = last.value - saleCosts - last.balance;
  const totalCashFlow = years.reduce((a, y) => a + y.cashFlow, 0);
  const flows = [-cashInvested, ...years.map((y, k) => y.cashFlow + (k === years.length - 1 ? proceeds : 0))];
  const cashFlow = y1.noi - debtService;
  return {
    down,
    loan,
    cashInvested,
    grossRent: y1.gross,
    effectiveIncome: y1.effective,
    vacancy: y1.vacancy,
    expenses: y1.expenses,
    noi: y1.noi,
    debtService,
    cashFlow,
    capRate: price > 0 ? y1.noi / price : 0,
    cashOnCash: cashInvested > 0 ? cashFlow / cashInvested : 0,
    dscr: debtService > 0 ? y1.noi / debtService : Infinity,
    onePercent: price > 0 ? pos(i.rent) / price : 0,
    grm: i.rent > 0 ? price / (pos(i.rent) * 12) : Infinity,
    breakEvenOccupancy: y1.gross > 0 ? Math.min(9.99, (y1.expenses.total + debtService) / y1.gross) : 0,
    depreciationYear,
    years,
    sale: { price: last.value, costs: saleCosts, payoff: last.balance, proceeds },
    totalCashFlow,
    totalProfit: totalCashFlow + proceeds - cashInvested,
    irr: irr(flows),
    equityMultiple: cashInvested > 0 ? (totalCashFlow + proceeds) / cashInvested : 0,
    depreciationTotal,
  };
}
