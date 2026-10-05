/**
 * Capital Gains Tax on selling a UK home or buy-to-let, 2026/27.
 *
 * Private Residence Relief covers the share of the gain for the time it was
 * your main home, plus the final 9 months of ownership if it was your main
 * home at some point. Joint owners each pay on their share, each with their
 * own £3,000 annual exempt amount. Residential gains: 18% / 24%. Pure.
 */

import { capitalGainsTax, CGT_AEA_2025 } from "../tax/cgt";
import { personalAllowance } from "../tax/2026-27";

const FINAL_PERIOD_MONTHS = 9;

export type PropertyCgtInput = {
  salePrice: number;
  purchasePrice: number;
  /** Stamp Duty, legal and survey costs when buying. */
  buyingCosts: number;
  /** Estate agent and legal costs when selling. */
  sellingCosts: number;
  /** Capital improvements such as an extension (not repairs). */
  improvements: number;
  /** Months you owned the property. */
  monthsOwned: number;
  /** Months it was your only or main home. */
  monthsLived: number;
  /** Number of owners sharing the gain equally. */
  owners: number;
  /** Your other income for the year, before tax. */
  income: number;
  /** Capital losses brought forward from earlier years. */
  losses: number;
};

export type PropertyCgtResult = {
  gain: number;
  reliefShare: number;
  relief: number;
  chargeable: number;
  yourShare: number;
  lossesUsed: number;
  taxableGain: number;
  basicRateGain: number;
  higherRateGain: number;
  tax: number;
  /** Tax for all owners together, assuming the same income. */
  netProceeds: number;
  effectiveRate: number;
};

export function propertyCgt(input: PropertyCgtInput): PropertyCgtResult {
  const gain = Math.max(
    0,
    input.salePrice - input.purchasePrice - Math.max(0, input.buyingCosts) - Math.max(0, input.sellingCosts) - Math.max(0, input.improvements),
  );
  const owned = Math.max(1, Math.round(input.monthsOwned));
  const lived = Math.min(owned, Math.max(0, Math.round(input.monthsLived)));
  // Assumes you lived there first and let it (or left it) afterwards, so the
  // final 9 months fall after the time you lived there.
  const reliefMonths = lived > 0 ? Math.min(owned, lived + FINAL_PERIOD_MONTHS) : 0;
  const reliefShare = Math.min(1, reliefMonths / owned);
  const relief = gain * reliefShare;
  const chargeable = gain - relief;
  const owners = Math.max(1, Math.round(input.owners));
  const yourShare = chargeable / owners;
  const lossesUsed = Math.min(Math.max(0, input.losses), Math.max(0, yourShare - CGT_AEA_2025));
  const income = Math.max(0, input.income);
  const taxableIncome = Math.max(0, income - personalAllowance(income));
  const c = capitalGainsTax({ gain: yourShare - lossesUsed, taxableIncome, assetType: "property" });
  return {
    gain,
    reliefShare,
    relief,
    chargeable,
    yourShare,
    lossesUsed,
    taxableGain: c.taxableGain,
    basicRateGain: c.basicRateGain,
    higherRateGain: c.higherRateGain,
    tax: c.totalTax,
    netProceeds: input.salePrice - Math.max(0, input.sellingCosts) - c.totalTax * owners,
    effectiveRate: gain > 0 ? c.totalTax / (gain / owners) : 0,
  };
}

/** The 60-day deadline to report and pay, from the completion date (YYYY-MM-DD). */
export function cgtDeadline(completion: string): string {
  const d = new Date(`${completion}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  d.setUTCDate(d.getUTCDate() + 60);
  return d.toISOString().slice(0, 10);
}
