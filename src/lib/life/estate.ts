/**
 * Estates: Inheritance Tax, probate fees and Lasting Power of Attorney fees.
 *
 * Inheritance Tax (2026/27, rates frozen to April 2030):
 *  - Nil-rate band £325,000; residence nil-rate band £175,000 when a home goes
 *    to direct descendants, tapered by £1 for every £2 the estate exceeds £2m.
 *  - Unused bands transfer from a late spouse or civil partner (up to 100%).
 *  - Gifts made in the 7 years before death use the nil-rate band first. Tax on
 *    a gift above the band is reduced by taper relief after 3 years.
 *  - Spouse and charity gifts are exempt. If 10% or more of the baseline amount
 *    goes to charity, the rate on the rest is 36%.
 *  - From 6 April 2026, 100% business and agricultural relief applies to the
 *    first £2.5m of qualifying property (transferable between spouses), and 50%
 *    above that. Qualifying AIM shares get 50%.
 *  - From 6 April 2027, unused pension funds are part of the estate.
 */

export const IHT = {
  nrb: 325_000,
  rnrb: 175_000,
  taperStart: 2_000_000,
  rate: 0.4,
  charityRate: 0.36,
  reliefAllowance: 2_500_000,
} as const;

/** Taper relief on tax due on a gift, by complete years between gift and death. */
export function giftTaperRelief(yearsBeforeDeath: number): number {
  const y = Math.max(0, yearsBeforeDeath);
  if (y < 3) return 0;
  if (y < 4) return 0.2;
  if (y < 5) return 0.4;
  if (y < 6) return 0.6;
  if (y < 7) return 0.8;
  return 1;
}

export type IhtInput = {
  /** Value of the main home (after any mortgage). */
  home: number;
  homeToDescendants: boolean;
  /** Savings, investments, other property and belongings. */
  otherAssets: number;
  /** Debts and funeral costs. */
  debts: number;
  /** Unused defined contribution pension funds. */
  pension: number;
  /** Death on or after 6 April 2027, so pensions count. */
  pensionsCount: boolean;
  /** Business or agricultural property qualifying for 100% relief. */
  businessProperty: number;
  /** Shares on AIM that qualify for 50% relief. */
  aimShares: number;
  /** Left to a spouse or civil partner. */
  toSpouse: number;
  /** Left to charity. */
  toCharity: number;
  /** Share (0 to 100) of a late spouse's unused nil-rate bands. */
  transferPct: number;
  /** Chargeable gifts in the 7 years before death, after annual exemptions. */
  gifts: number;
  giftYearsAgo: number;
};

export type IhtResult = {
  gross: number;
  net: number;
  businessRelief: number;
  exempt: number;
  nrb: number;
  nrbUsedByGifts: number;
  nrbForEstate: number;
  rnrbMax: number;
  rnrb: number;
  taperLost: number;
  taxable: number;
  baseline: number;
  charityRateApplies: boolean;
  rate: number;
  estateTax: number;
  giftTax: number;
  giftTaperRelief: number;
  total: number;
  /** Estate after tax, before the spouse and charity shares. */
  effectiveRate: number;
  /** More left to charity needed to reach the 36% rate (0 if met or not useful). */
  charityNeeded: number;
};

export const IHT_DEFAULT: IhtInput = {
  home: 0,
  homeToDescendants: true,
  otherAssets: 0,
  debts: 0,
  pension: 0,
  pensionsCount: false,
  businessProperty: 0,
  aimShares: 0,
  toSpouse: 0,
  toCharity: 0,
  transferPct: 0,
  gifts: 0,
  giftYearsAgo: 0,
};

export function inheritanceTax2026(i: IhtInput): IhtResult {
  const pos = (n: number) => Math.max(0, n || 0);
  const pension = i.pensionsCount ? pos(i.pension) : 0;
  const gross = pos(i.home) + pos(i.otherAssets) + pos(i.businessProperty) + pos(i.aimShares) + pension;
  const net = Math.max(0, gross - pos(i.debts));

  const bp = pos(i.businessProperty);
  const full = Math.min(bp, IHT.reliefAllowance * (1 + Math.min(100, pos(i.transferPct)) / 100));
  const businessRelief = full + (bp - full) * 0.5 + pos(i.aimShares) * 0.5;

  const afterRelief = Math.max(0, net - businessRelief);
  const toSpouse = Math.min(pos(i.toSpouse), afterRelief);
  const toCharity = Math.min(pos(i.toCharity), afterRelief - toSpouse);
  const exempt = toSpouse + toCharity;

  const t = 1 + Math.min(100, pos(i.transferPct)) / 100;
  const nrb = IHT.nrb * t;
  const gifts = pos(i.gifts);
  const nrbUsedByGifts = Math.min(nrb, gifts);
  const nrbForEstate = nrb - nrbUsedByGifts;

  // Residence nil-rate band: capped at the home's value, tapered above £2m.
  const rnrbMax = i.homeToDescendants ? Math.min(IHT.rnrb * t, pos(i.home)) : 0;
  const taperLost = Math.min(rnrbMax, Math.max(0, net - IHT.taperStart) / 2);
  const rnrb = rnrbMax - taperLost;

  const chargeable = Math.max(0, afterRelief - exempt);
  const taxable = Math.max(0, chargeable - nrbForEstate - rnrb);

  // Baseline for the charity rate: after reliefs, other exemptions and the
  // nil-rate band, with the charity gift added back. The RNRB is not deducted.
  const baseline = Math.max(0, afterRelief - toSpouse - nrbForEstate);
  const charityRateApplies = toCharity > 0 && toCharity >= 0.1 * baseline;
  const rate = charityRateApplies ? IHT.charityRate : IHT.rate;
  const estateTax = taxable * rate;
  const charityNeeded = !charityRateApplies && taxable > 0 ? Math.max(0, 0.1 * baseline - toCharity) : 0;

  const giftExcess = Math.max(0, gifts - nrb);
  const relief = giftTaperRelief(i.giftYearsAgo);
  const giftTax = giftExcess * IHT.rate * (1 - relief);

  const total = estateTax + giftTax;
  return {
    gross,
    net,
    businessRelief,
    exempt,
    nrb,
    nrbUsedByGifts,
    nrbForEstate,
    rnrbMax,
    rnrb,
    taperLost,
    taxable,
    baseline,
    charityRateApplies,
    rate,
    estateTax,
    giftTax,
    giftTaperRelief: relief,
    total,
    effectiveRate: net > 0 ? estateTax / net : 0,
    charityNeeded,
  };
}

/* ── Probate (England and Wales, from 13 July 2026) ─────────────── */

export const PROBATE = {
  threshold: 5_000,
  fee: 526,
  /** Copies ordered with the application. */
  copyWithApplication: 2,
  /** Copies ordered later. */
  copyLater: 16,
  previousFee: 300,
} as const;

export type ProbateFeeResult = { application: number; copies: number; later: number; total: number; waived: boolean };

export function probateFee2026(estate: number, copiesNow: number, copiesLater = 0): ProbateFeeResult {
  const waived = Math.max(0, estate) <= PROBATE.threshold;
  const application = waived ? 0 : PROBATE.fee;
  const copies = Math.max(0, Math.floor(copiesNow)) * PROBATE.copyWithApplication;
  const later = Math.max(0, Math.floor(copiesLater)) * PROBATE.copyLater;
  return { application, copies, later, total: application + copies + later, waived };
}

/* ── Lasting Power of Attorney (England and Wales) ─────────────── */

export const LPA = { fee: 92, resubmit: 46, reductionIncome: 12_000 } as const;

export type LpaFeeResult = { each: number; count: number; total: number; saving: number };

export function lpaFee2026(count: number, help: "none" | "reduction" | "exemption"): LpaFeeResult {
  const n = Math.max(0, Math.floor(count));
  const each = help === "exemption" ? 0 : help === "reduction" ? LPA.fee / 2 : LPA.fee;
  return { each, count: n, total: each * n, saving: (LPA.fee - each) * n };
}

/** Court of Protection deputyship, the route if no LPA is in place. */
export const DEPUTY = { application: 432, assessment: 100, supervision: 320, minimalSupervision: 35 } as const;

/** Court and OPG fees for a property and affairs deputy over a number of years (excluding the security bond). */
export function deputyCost(years: number, minimal = false): number {
  const y = Math.max(1, Math.floor(years));
  return DEPUTY.application + DEPUTY.assessment + y * (minimal ? DEPUTY.minimalSupervision : DEPUTY.supervision);
}
