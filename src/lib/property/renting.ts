/**
 * Private renting: rent increases and deposits, 2026/27.
 *
 * Rent increases
 *   England: since 1 May 2026 (Renters' Rights Act 2025) every private tenancy
 *   is an assured periodic tenancy and the only way to raise the rent is a
 *   section 13 notice: at least 2 months' notice, no more than once a year,
 *   and a tenant can ask the First-tier Tribunal to set a market rent before
 *   the new rent starts. The Tribunal cannot set more than the landlord asked
 *   for, and the new rent starts from its decision, not before.
 *   Wales: occupation contracts, at least 2 months' notice, once a year.
 *   Scotland: private residential tenancies, at least 3 months' notice, once
 *   in 12 months; the tenant can refer it to a rent officer.
 *   Northern Ireland: Private Tenancies Act (NI) 2022, at least 3 months'
 *   written notice and no more than once in 12 months (from 1 April 2025).
 *
 * Deposits
 *   England: up to 5 weeks' rent (6 weeks if the yearly rent is £50,000 or
 *   more), protected within 30 days. Wales: protected within 30 days; Welsh
 *   Ministers can set a limit by regulations. Scotland: up to 2 months' rent,
 *   protected within 30 working days. Northern Ireland: up to 1 month's rent,
 *   protected within 28 days. Courts can order up to 3 times the deposit if it
 *   is not protected in England, Wales and Scotland.
 */

import { parse } from "../life/calendar";

export type RentNation = "england" | "wales" | "scotland" | "ni";

export const RENT_RULES: Record<RentNation, { noticeMonths: number; label: string; form: string; challenge: string }> = {
  england: { noticeMonths: 2, label: "England", form: "a section 13 notice on the government form", challenge: "the First-tier Tribunal (Property Chamber)" },
  wales: { noticeMonths: 2, label: "Wales", form: "a notice of rent variation (form RHW12)", challenge: "the Residential Property Tribunal Wales" },
  scotland: { noticeMonths: 3, label: "Scotland", form: "a rent-increase notice", challenge: "a rent officer at Rent Service Scotland" },
  ni: { noticeMonths: 3, label: "Northern Ireland", form: "written notice", challenge: "the Housing Executive or Housing Rights for advice" },
};

const DAY = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);
const days = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / DAY);

/** The same day `n` months later, or the last day of that month if it is shorter. */
export function addMonths(date: string, n: number): string {
  const d = parse(date);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return iso(new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), last))));
}

export type RentIncreaseInput = {
  nation: RentNation;
  /** Monthly rent now. */
  current: number;
  /** Monthly rent proposed. */
  proposed: number;
  /** When the notice was served (received). */
  served: string;
  /** When the new rent is meant to start. */
  starts: string;
  /** When the tenancy began or the rent last went up, whichever is later. */
  lastChange: string;
  /** Net household income a month, for the affordability check. Optional. */
  income: number;
  /** Rent for similar homes nearby a month. Optional. */
  market: number;
};

export type RentIncreaseResult = {
  monthly: number;
  yearly: number;
  share: number;
  /** Earliest start date allowed by the notice period. */
  earliestByNotice: string;
  noticeOk: boolean;
  /** Earliest start date allowed by the once-a-year rule. */
  earliestByYear: string;
  yearOk: boolean;
  valid: boolean;
  daysToStart: number;
  /** Rent as a share of income, before and after. */
  burdenBefore: number | null;
  burdenAfter: number | null;
  /** How far the proposed rent is above (+) or below (−) similar homes, a month. */
  aboveMarket: number | null;
};

export function rentIncrease(i: RentIncreaseInput): RentIncreaseResult {
  const rules = RENT_RULES[i.nation];
  const monthly = i.proposed - i.current;
  const earliestByNotice = addMonths(i.served, rules.noticeMonths);
  // England counts 52 weeks; the other nations count 12 months.
  const earliestByYear = i.nation === "england" ? iso(new Date(parse(i.lastChange).getTime() + 364 * DAY)) : addMonths(i.lastChange, 12);
  const noticeOk = i.starts >= earliestByNotice;
  const yearOk = i.starts >= earliestByYear;
  return {
    monthly,
    yearly: monthly * 12,
    share: i.current > 0 ? monthly / i.current : 0,
    earliestByNotice,
    noticeOk,
    earliestByYear,
    yearOk,
    valid: noticeOk && yearOk,
    daysToStart: days(i.served, i.starts),
    burdenBefore: i.income > 0 ? i.current / i.income : null,
    burdenAfter: i.income > 0 ? i.proposed / i.income : null,
    aboveMarket: i.market > 0 ? i.proposed - i.market : null,
  };
}

/* ── Deposits ──────────────────────────────────────────── */

export const DEPOSIT_RULES: Record<RentNation, { protectDays: string; cap: string; penalty: string }> = {
  england: { protectDays: "30 days", cap: "5 weeks' rent (6 weeks if the rent is £50,000 a year or more)", penalty: "1 to 3 times the deposit" },
  wales: { protectDays: "30 days", cap: "no fixed limit in law yet: Welsh Ministers can set one by regulations", penalty: "1 to 3 times the deposit" },
  scotland: { protectDays: "30 working days", cap: "2 months' rent", penalty: "up to 3 times the deposit" },
  ni: { protectDays: "28 days", cap: "1 month's rent", penalty: "a fixed penalty from the council" },
};

/** The legal maximum deposit for a monthly rent, or null where there is no fixed cap. */
export function depositCap(nation: RentNation, monthlyRent: number): number | null {
  const rent = Math.max(0, monthlyRent);
  const weekly = (rent * 12) / 52;
  switch (nation) {
    case "england":
      return weekly * (rent * 12 >= 50_000 ? 6 : 5);
    case "scotland":
      return rent * 2;
    case "ni":
      return rent;
    case "wales":
      return null;
  }
}

/** Typical useful lives, in years, that deposit schemes use when weighing fair wear and tear. */
export const ITEM_LIFE: Record<string, { label: string; years: number }> = {
  carpet: { label: "Carpet", years: 8 },
  decoration: { label: "Painting and decorating", years: 5 },
  sofa: { label: "Sofa or armchair", years: 8 },
  mattress: { label: "Mattress", years: 7 },
  furniture: { label: "Other furniture", years: 10 },
  appliance: { label: "Kitchen appliance", years: 8 },
  flooring: { label: "Hard flooring", years: 15 },
  cleaning: { label: "Cleaning", years: 0 },
  rent: { label: "Unpaid rent or bills", years: 0 },
};

export type DeductionClaim = {
  kind: keyof typeof ITEM_LIFE;
  /** What the landlord is asking for. */
  claimed: number;
  /** Age of the item when the tenancy ended, in years. */
  age: number;
  /** Useful life in years; 0 means the claim is not reduced for age. */
  life: number;
};

export type DeductionLine = DeductionClaim & { fair: number; reduction: number; share: number };

/**
 * A fair deduction for damage beyond fair wear and tear: the landlord should not
 * end up better off than before ("betterment"), so a replacement is charged in
 * proportion to the useful life the item had left.
 */
export function fairDeduction(c: DeductionClaim): DeductionLine {
  const claimed = Math.max(0, c.claimed);
  const share = c.life > 0 ? Math.max(0, 1 - Math.max(0, c.age) / c.life) : 1;
  const fair = claimed * share;
  return { ...c, claimed, share, fair, reduction: claimed - fair };
}

export type DepositInput = {
  nation: RentNation;
  deposit: number;
  monthlyRent: number;
  claims: DeductionClaim[];
  /** Was the deposit protected in a government-approved scheme in time? */
  protectedInTime: boolean;
};

export type DepositResult = {
  cap: number | null;
  overCap: number;
  lines: DeductionLine[];
  claimed: number;
  fair: number;
  /** What you should get back if the fair deductions apply. */
  back: number;
  /** What you get back if every claim is accepted. */
  backIfAccepted: number;
  /** Possible award if the deposit was not protected (England, Wales, Scotland). */
  penaltyRange: [number, number] | null;
};

export function depositReturn(i: DepositInput): DepositResult {
  const deposit = Math.max(0, i.deposit);
  const cap = depositCap(i.nation, i.monthlyRent);
  const lines = i.claims.filter((c) => c.claimed > 0).map(fairDeduction);
  const claimed = lines.reduce((a, l) => a + l.claimed, 0);
  const fair = lines.reduce((a, l) => a + l.fair, 0);
  const penaltyRange: [number, number] | null =
    i.protectedInTime || i.nation === "ni" ? null : i.nation === "scotland" ? [0, deposit * 3] : [deposit, deposit * 3];
  return {
    cap,
    overCap: cap === null ? 0 : Math.max(0, deposit - cap),
    lines,
    claimed,
    fair,
    back: Math.max(0, deposit - fair),
    backIfAccepted: Math.max(0, deposit - claimed),
    penaltyRange,
  };
}
