/**
 * Shared Ownership: monthly costs now, Stamp Duty choices, and what it costs
 * to buy more shares ("staircasing") later. England rules. Pure functions.
 */

import { monthlyPaymentFor } from "./mortgage-engine";
import { stampDuty } from "../tax/sdlt-2025";

export type SharedOwnershipInput = {
  value: number;
  sharePct: number;
  /** Deposit as a % of the share price. */
  depositPct: number;
  ratePct: number;
  termYears: number;
  /** Yearly rent as a % of the share you do not own. */
  rentPct: number;
  /** Monthly service charge and ground rent. */
  serviceCharge: number;
  /** Yearly house price growth, %. */
  growthPct: number;
  /** Yearly rent increase, %. */
  rentRisePct: number;
  /** Year in which you buy more shares (0 = never). */
  staircaseYear: number;
  /** Share you own after staircasing, %. */
  staircaseTo: number;
  firstTimeBuyer: boolean;
};

export type SharedOwnershipResult = {
  sharePrice: number;
  deposit: number;
  loan: number;
  mortgage: number;
  rent: number;
  serviceCharge: number;
  monthly: number;
  /** The same home bought outright with the same cash deposit. */
  outright: { loan: number; mortgage: number; monthly: number; ltv: number };
  sdlt: { onShare: number; marketValue: number; ftbRelief: boolean };
  staircase: null | {
    year: number;
    valueThen: number;
    cost: number;
    shareBought: number;
    rentBefore: number;
    rentAfter: number;
  };
  /** Rent a month in each year, 1-based, for the next 10 years (before staircasing). */
  rentByYear: number[];
};

const pct = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));

export function sharedOwnership(raw: SharedOwnershipInput): SharedOwnershipResult {
  const value = Math.max(0, raw.value || 0);
  const share = pct(raw.sharePct, 10, 100) / 100;
  const sharePrice = value * share;
  const deposit = sharePrice * (pct(raw.depositPct, 0, 100) / 100);
  const loan = Math.max(0, sharePrice - deposit);
  const mortgage = monthlyPaymentFor(loan, Math.max(0, raw.ratePct), raw.termYears, "repayment");
  const rentYearly = value * (1 - share) * (Math.max(0, raw.rentPct) / 100);
  const rent = rentYearly / 12;
  const serviceCharge = Math.max(0, raw.serviceCharge || 0);

  const outrightLoan = Math.max(0, value - deposit);
  const outrightMortgage = monthlyPaymentFor(outrightLoan, Math.max(0, raw.ratePct), raw.termYears, "repayment");

  // First-time buyer relief needs the full market value to be £500,000 or less.
  const ftbRelief = raw.firstTimeBuyer && value <= 500_000;
  const buyer = ftbRelief ? "first-time" : "standard";

  const growth = Math.max(-0.2, (raw.growthPct || 0) / 100);
  const rise = Math.max(0, (raw.rentRisePct || 0) / 100);
  const rentByYear = Array.from({ length: 10 }, (_, y) => rent * Math.pow(1 + rise, y));

  let staircase: SharedOwnershipResult["staircase"] = null;
  const target = pct(raw.staircaseTo, 0, 100) / 100;
  if (raw.staircaseYear > 0 && target > share) {
    const year = Math.round(raw.staircaseYear);
    const valueThen = value * Math.pow(1 + growth, year);
    const shareBought = target - share;
    const rentBefore = valueThen > 0 ? rent * Math.pow(1 + rise, year) : 0;
    staircase = {
      year,
      valueThen,
      cost: valueThen * shareBought,
      shareBought,
      rentBefore,
      // Rent falls in proportion to the share you still do not own.
      rentAfter: 1 - share > 0 ? (rentBefore * (1 - target)) / (1 - share) : 0,
    };
  }

  return {
    sharePrice,
    deposit,
    loan,
    mortgage,
    rent,
    serviceCharge,
    monthly: mortgage + rent + serviceCharge,
    outright: { loan: outrightLoan, mortgage: outrightMortgage, monthly: outrightMortgage + serviceCharge, ltv: value > 0 ? outrightLoan / value : 0 },
    sdlt: {
      onShare: stampDuty(sharePrice, buyer).total,
      marketValue: stampDuty(value, buyer).total,
      ftbRelief,
    },
    staircase,
    rentByYear,
  };
}
