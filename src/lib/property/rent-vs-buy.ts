/**
 * Rent or buy: net wealth year by year for a buyer and a renter who start
 * with the same cash. The buyer spends it on a deposit and buying costs; the
 * renter invests it. Each year, whoever has the lower housing cost invests
 * the difference. Buyer's wealth is home equity after selling costs plus any
 * investments. Pure and deterministic.
 */

import { stampDuty } from "../tax/sdlt-2025";

export type RentVsBuyInput = {
  price: number;
  deposit: number;
  ratePct: number;
  termYears: number;
  /** Monthly rent for an equivalent home. */
  rent: number;
  years: number;
  houseGrowthPct: number;
  rentGrowthPct: number;
  investReturnPct: number;
  /** Maintenance and insurance, % of the home's value a year. */
  maintenancePct: number;
  /** Legal, survey and mortgage fees on purchase. */
  buyingFees: number;
  /** Agent and legal fees when selling, % of the value. */
  sellingPct: number;
  firstTimeBuyer: boolean;
};

export type RentVsBuyYear = {
  year: number;
  buyerWealth: number;
  renterWealth: number;
  homeValue: number;
  balance: number;
  ownCost: number;
  rentCost: number;
};

export type RentVsBuyResult = {
  stampDuty: number;
  upfront: number;
  loan: number;
  monthlyPayment: number;
  firstYearOwn: number;
  firstYearRent: number;
  years: RentVsBuyYear[];
  /** First year in which buying leaves you better off, or null. */
  breakEvenYear: number | null;
  final: RentVsBuyYear;
  advantage: number;
};

export function rentVsBuy(raw: RentVsBuyInput): RentVsBuyResult {
  const price = Math.max(0, raw.price);
  const deposit = Math.min(price, Math.max(0, raw.deposit));
  const sdlt = stampDuty(price, raw.firstTimeBuyer ? "first-time" : "standard").total;
  const upfront = deposit + sdlt + Math.max(0, raw.buyingFees);
  const loan = price - deposit;
  const m = Math.max(0, raw.ratePct) / 100 / 12;
  const n = Math.max(1, Math.round(raw.termYears * 12));
  const pay = loan <= 0 ? 0 : m === 0 ? loan / n : (loan * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
  const g = raw.houseGrowthPct / 100;
  const rg = raw.rentGrowthPct / 100;
  const inv = raw.investReturnPct / 100;
  const invM = Math.pow(1 + inv, 1 / 12) - 1;
  const sell = Math.max(0, raw.sellingPct) / 100;
  const maint = Math.max(0, raw.maintenancePct) / 100;

  let balance = loan;
  let renterPot = upfront;
  let buyerPot = 0;
  let rent = Math.max(0, raw.rent);
  let value = price;
  let month = 0;
  const horizon = Math.max(1, Math.round(raw.years));
  const years: RentVsBuyYear[] = [
    { year: 0, buyerWealth: price * (1 - sell) - loan, renterWealth: upfront, homeValue: price, balance: loan, ownCost: 0, rentCost: 0 },
  ];
  let firstYearOwn = 0;
  let firstYearRent = 0;
  for (let y = 1; y <= horizon; y++) {
    let ownCost = 0;
    let rentCost = 0;
    for (let k = 0; k < 12; k++) {
      const interest = balance * m;
      const payment = balance > 0.005 && month < n ? Math.min(pay, balance + interest) : 0;
      balance = Math.max(0, balance + interest - payment);
      const own = payment + (value * maint) / 12;
      ownCost += own;
      rentCost += rent;
      renterPot *= 1 + invM;
      buyerPot *= 1 + invM;
      // Whoever pays less invests the difference.
      if (own > rent) renterPot += own - rent;
      else buyerPot += rent - own;
      value *= Math.pow(1 + g, 1 / 12);
      month++;
    }
    if (y === 1) {
      firstYearOwn = ownCost;
      firstYearRent = rentCost;
    }
    rent *= 1 + rg;
    years.push({
      year: y,
      buyerWealth: value * (1 - sell) - balance + buyerPot,
      renterWealth: renterPot,
      homeValue: value,
      balance,
      ownCost,
      rentCost,
    });
  }
  const be = years.find((y) => y.year > 0 && y.buyerWealth >= y.renterWealth);
  const final = years[years.length - 1];
  return {
    stampDuty: sdlt,
    upfront,
    loan,
    monthlyPayment: pay,
    firstYearOwn,
    firstYearRent,
    years,
    breakEvenYear: be ? be.year : null,
    final,
    advantage: final.buyerWealth - final.renterWealth,
  };
}
