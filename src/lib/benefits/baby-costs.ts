/**
 * Cost of a baby, year by year to age 5, 2026/27 rules.
 *
 * Spending figures (pram, nappies, formula and so on) are EXAMPLES chosen to
 * illustrate the sums, not survey averages: prices vary widely and the user
 * can change every one. Help and pay come from the site's tested engines:
 *  - Child Benefit and the High Income Child Benefit Charge: family.ts / child-benefit.ts
 *  - Statutory Maternity Pay / Maternity Allowance and Statutory Paternity Pay: family.ts
 *  - Funded childcare hours (England) and Tax-Free Childcare: family.ts
 *  - Sure Start Maternity Grant / Best Start Grant: families.ts
 *  - Healthy Start: life/health.ts
 *
 * Feeding facts (NHS, checked October 2026): first infant formula is "the only
 * formula your baby needs" through the first year and cows' milk can be the
 * main drink from age 1 (nhs.uk/baby/breastfeeding-and-bottle-feeding/
 * bottle-feeding/types-of-formula); solid food starts at around 6 months
 * (nhs.uk/baby/weaning-and-feeding).
 */

import { freeHours, hicbcShare, maternityPay, paternityPay, taxFreeChildcarePlan, type ChildStage } from "./family";
import { CHILD_BENEFIT_2026_27 } from "./child-benefit";
import { maternityGrant } from "./families";
import { healthyStartOver } from "../life/health";

export type ItemKey = "pram" | "carSeat" | "cot" | "crib" | "monitor" | "changing" | "carrier" | "highchair" | "feedingKit";
export type Level = "budget" | "mid" | "premium";

/** Example one-off costs (£), not survey figures. */
export const ITEMS: { key: ItemKey; label: string; budget: number; mid: number; premium: number }[] = [
  { key: "pram", label: "Pram, pushchair or travel system", budget: 150, mid: 450, premium: 1000 },
  { key: "carSeat", label: "Car seat", budget: 60, mid: 150, premium: 300 },
  { key: "cot", label: "Cot or cot bed and mattress", budget: 80, mid: 200, premium: 450 },
  { key: "crib", label: "Moses basket or bedside crib", budget: 30, mid: 80, premium: 200 },
  { key: "monitor", label: "Baby monitor", budget: 20, mid: 60, premium: 150 },
  { key: "changing", label: "Changing mat, bath and towels", budget: 20, mid: 50, premium: 100 },
  { key: "carrier", label: "Sling or baby carrier", budget: 20, mid: 60, premium: 130 },
  { key: "highchair", label: "Highchair (from about 6 months)", budget: 20, mid: 60, premium: 200 },
  { key: "feedingKit", label: "Bottles, steriliser and breast pump", budget: 30, mid: 80, premium: 250 },
];

export const itemsFor = (level: Level): Record<ItemKey, number> =>
  Object.fromEntries(ITEMS.map((i) => [i.key, i[level]])) as Record<ItemKey, number>;

/** Example running costs (£), not survey figures. */
export const EXAMPLE_COSTS = {
  formulaMonthly: 50,
  disposableMonthly: 35,
  reusableKit: 300,
  reusableWashMonthly: 10,
  pottyAge: 2.5,
  clothesYear1: 300,
  clothesLater: 250,
  weaningFoodMonthly: 30,
  toddlerFoodMonthly: 60,
  otherMonthly: 30,
  childcareRate: 7.5,
  childcareHours: 30,
  childcareStartMonth: 12,
  childcareWeeks: 48,
} as const;

/** Funded hours stretch over 38 weeks a year (England). */
const FUNDED_TERM_WEEKS = 38;
/** Formula is needed for the first 12 months; solids start at about 6 months (NHS). */
const FORMULA_MONTHS = 12;
const SOLIDS_FROM_MONTH = 6;

export type Feeding = "breast" | "formula" | "mixed";
export type Nation = "england" | "wales" | "scotland" | "ni";

export type BabyCostInput = {
  nation: Nation;
  items: Record<ItemKey, number>;
  feeding: Feeding;
  formulaMonthly: number;
  nappies: "disposable" | "reusable";
  disposableMonthly: number;
  reusableKit: number;
  reusableWashMonthly: number;
  /** Age (years) when nappies stop. */
  pottyAge: number;
  clothesYear1: number;
  clothesLater: number;
  weaningFoodMonthly: number;
  toddlerFoodMonthly: number;
  otherMonthly: number;
  /** Childcare: hours a week (0 for none), hourly rate, weeks a year and the age in months it starts. */
  childcareHours: number;
  childcareRate: number;
  childcareWeeks: number;
  childcareStartMonth: number;
  /** All parents work (needed for working-parent funded hours and Tax-Free Childcare). */
  working: boolean;
  /** Either parent has adjusted net income over £100,000. */
  over100k: boolean;
  useTfc: boolean;
  /** Children under 16 already in the family. */
  otherChildren: number;
  /** On Universal Credit or another qualifying benefit (maternity grant). */
  benefit: boolean;
  /** Eligible for Healthy Start. */
  healthyStart: boolean;
  /** Higher earner's adjusted net income, for the Child Benefit charge. */
  higherIncome: number;
  /** Mother's average weekly earnings before leave, and leave pattern. */
  motherWeekly: number;
  motherService: boolean;
  leaveWeeks: number;
  fullPayWeeks: number;
  halfPayWeeks: number;
  /** Partner's weekly earnings and paternity leave. */
  partnerWeekly: number;
  partnerService: boolean;
  partnerWeeks: 0 | 1 | 2;
  partnerFullPayWeeks: number;
};

export type YearRow = {
  year: number;
  /** One-off items (and a reusable nappy kit) in year 1. */
  items: number;
  feeding: number;
  nappies: number;
  clothes: number;
  food: number;
  other: number;
  /** Childcare after funded hours, before Tax-Free Childcare. */
  childcare: number;
  /** Value of funded hours used. */
  funded: number;
  childBenefit: number;
  grant: number;
  healthyStart: number;
  tfc: number;
  spend: number;
  help: number;
  net: number;
};

export type BabyCostResult = {
  years: YearRow[];
  year1: YearRow;
  /** Totals over all years shown. */
  total: { spend: number; help: number; net: number; childcare: number };
  /** Gross pay lost during leave. */
  leave: { motherPay: number; motherNormal: number; motherDrop: number; route: "smp" | "ma" | "none"; partnerPay: number; partnerDrop: number; drop: number };
  /** Net cost of year 1 plus the drop in pay. */
  year1WithLeave: number;
  childBenefitWeekly: number;
  hicbcShare: number;
};

const pos = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

/** Months of [from, to) that fall in year y (months 12(y−1) to 12y). */
function monthsIn(y: number, from: number, to: number): number {
  const a = Math.max(12 * (y - 1), from);
  const b = Math.min(12 * y, to);
  return Math.max(0, b - a);
}

const stageAt = (month: number): ChildStage => (month < 9 ? "under9m" : month < 24 ? "9m-2" : month < 36 ? "2" : "3-4");

/** Childcare in year y: cost after funded hours (England only), and the funded value. */
function childcareYear(y: number, i: BabyCostInput): { afterFunded: number; funded: number } {
  const hours = pos(i.childcareHours);
  const rate = pos(i.childcareRate);
  const weeks = Math.min(52, pos(i.childcareWeeks));
  if (hours === 0 || rate === 0 || weeks === 0) return { afterFunded: 0, funded: 0 };
  const start = Math.max(0, Math.round(i.childcareStartMonth));
  let afterFunded = 0;
  let funded = 0;
  for (let m = 12 * (y - 1); m < 12 * y; m++) {
    if (m < start) continue;
    const used = hours * weeks / 12;
    let fundedHours = 0;
    if (i.nation === "england") {
      const entitled = freeHours({ stage: stageAt(m), working: i.working && !i.over100k, lowIncome: false, hoursUsed: hours, weeksUsed: 52, hourlyRate: 1, extrasWeekly: 0 }).hoursPerWeek;
      fundedHours = Math.min(used, (entitled * FUNDED_TERM_WEEKS) / 12);
    }
    afterFunded += (used - fundedHours) * rate;
    funded += fundedHours * rate;
  }
  return { afterFunded, funded };
}

export function babyCosts(i: BabyCostInput, yearsShown = 5): BabyCostResult {
  const n = Math.max(1, Math.min(5, Math.round(yearsShown)));
  const potty = Math.round(Math.min(5, pos(i.pottyAge)) * 12);
  const others = Math.max(0, Math.floor(pos(i.otherChildren)));
  const cbWeekly = others === 0 ? CHILD_BENEFIT_2026_27.firstChildWeekly : CHILD_BENEFIT_2026_27.additionalChildWeekly;
  const share = hicbcShare(pos(i.higherIncome));
  const grant = maternityGrant({ scotland: i.nation === "scotland", benefit: i.benefit, babies: 1, otherChildren: others, youngParent: false }).amount;
  const itemsTotal = Object.values(i.items).reduce((a, b) => a + pos(b), 0);
  const formulaShare = i.feeding === "formula" ? 1 : i.feeding === "mixed" ? 0.5 : 0;
  const tfcOn = i.useTfc && i.working && !i.over100k;

  const years: YearRow[] = [];
  for (let y = 1; y <= n; y++) {
    const items = y === 1 ? itemsTotal + (i.nappies === "reusable" ? pos(i.reusableKit) : 0) : 0;
    const feeding = monthsIn(y, 0, FORMULA_MONTHS) * pos(i.formulaMonthly) * formulaShare;
    const nappyMonths = monthsIn(y, 0, potty);
    const nappies = nappyMonths * (i.nappies === "disposable" ? pos(i.disposableMonthly) : pos(i.reusableWashMonthly));
    const clothes = y === 1 ? pos(i.clothesYear1) : pos(i.clothesLater);
    const food = monthsIn(y, SOLIDS_FROM_MONTH, 12) * pos(i.weaningFoodMonthly) + monthsIn(y, 12, 60) * pos(i.toddlerFoodMonthly);
    const other = 12 * pos(i.otherMonthly);
    const cc = childcareYear(y, i);
    // Child Benefit for the new child, less the charge (52 weeks a year).
    const childBenefit = cbWeekly * 52 * (1 - share);
    const hs = i.healthyStart ? healthyStartOver(52, [12 * (y - 1)], 0).total : 0;
    const tfc = tfcOn ? taxFreeChildcarePlan([{ cost: cc.afterFunded, disabled: false }]).topUp : 0;
    const g = y === 1 ? grant : 0;
    const spend = items + feeding + nappies + clothes + food + other + cc.afterFunded;
    const help = childBenefit + g + hs + tfc;
    years.push({ year: y, items, feeding, nappies, clothes, food, other, childcare: cc.afterFunded, funded: cc.funded, childBenefit, grant: g, healthyStart: hs, tfc, spend, help, net: spend - help });
  }

  const m = maternityPay({ awe: pos(i.motherWeekly), service: i.motherService, fullPayWeeks: pos(i.fullPayWeeks), halfPayWeeks: pos(i.halfPayWeeks), leaveWeeks: pos(i.leaveWeeks) });
  const motherDrop = pos(i.motherWeekly) > 0 ? Math.max(0, m.normalPay - m.total) : 0;
  const p =
    i.partnerWeeks > 0 && pos(i.partnerWeekly) > 0
      ? paternityPay({ awe: pos(i.partnerWeekly), service: i.partnerService, weeks: i.partnerWeeks as 1 | 2, fullPayWeeks: pos(i.partnerFullPayWeeks) })
      : null;
  const partnerDrop = p ? p.shortfall : 0;
  const leave = { motherPay: m.total, motherNormal: m.normalPay, motherDrop, route: m.route, partnerPay: p ? p.total : 0, partnerDrop, drop: motherDrop + partnerDrop };

  const sum = (k: keyof YearRow) => years.reduce((a, r) => a + r[k], 0);
  return {
    years,
    year1: years[0],
    total: { spend: sum("spend"), help: sum("help"), net: sum("net"), childcare: sum("childcare") },
    leave,
    year1WithLeave: years[0].net + leave.drop,
    childBenefitWeekly: cbWeekly * (1 - share),
    hicbcShare: share,
  };
}

/** The default example household, used by the page and the guide. */
export const EXAMPLE_INPUT: BabyCostInput = {
  nation: "england",
  items: itemsFor("mid"),
  feeding: "formula",
  formulaMonthly: EXAMPLE_COSTS.formulaMonthly,
  nappies: "disposable",
  disposableMonthly: EXAMPLE_COSTS.disposableMonthly,
  reusableKit: EXAMPLE_COSTS.reusableKit,
  reusableWashMonthly: EXAMPLE_COSTS.reusableWashMonthly,
  pottyAge: EXAMPLE_COSTS.pottyAge,
  clothesYear1: EXAMPLE_COSTS.clothesYear1,
  clothesLater: EXAMPLE_COSTS.clothesLater,
  weaningFoodMonthly: EXAMPLE_COSTS.weaningFoodMonthly,
  toddlerFoodMonthly: EXAMPLE_COSTS.toddlerFoodMonthly,
  otherMonthly: EXAMPLE_COSTS.otherMonthly,
  childcareHours: EXAMPLE_COSTS.childcareHours,
  childcareRate: EXAMPLE_COSTS.childcareRate,
  childcareWeeks: EXAMPLE_COSTS.childcareWeeks,
  childcareStartMonth: EXAMPLE_COSTS.childcareStartMonth,
  working: true,
  over100k: false,
  useTfc: true,
  otherChildren: 0,
  benefit: false,
  healthyStart: false,
  higherIncome: 35_000,
  motherWeekly: 600,
  motherService: true,
  leaveWeeks: 39,
  fullPayWeeks: 0,
  halfPayWeeks: 0,
  partnerWeekly: 600,
  partnerService: true,
  partnerWeeks: 2,
  partnerFullPayWeeks: 0,
};
