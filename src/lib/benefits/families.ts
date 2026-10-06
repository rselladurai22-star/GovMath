/**
 * Families and childcare, 2026/27: child maintenance (the Child Maintenance
 * Service 2012 scheme), childcare costs after funded hours and Tax-Free
 * Childcare or Universal Credit, Statutory Adoption Pay, and the Sure Start
 * Maternity Grant (Best Start Grant in Scotland).
 */

import { freeHours, maternityPay, paternityPay, taxFreeChildcarePlan, type ChildStage, type MaternityResult } from "./family";
import { UC_CHILDCARE } from "./uc-engine";

/* ── Child maintenance ─────────────────────────────────────────── */

export const CMS_2026 = {
  nilBelow: 7,
  flat: 7,
  reducedFrom: 100,
  basicFrom: 200,
  plusFrom: 800,
  cap: 3_000,
  /** Reduced rate: % of income over £100, by qualifying children (1, 2, 3+) and relevant other children (0, 1, 2, 3+). */
  reduced: [
    [0.17, 0.25, 0.31],
    [0.141, 0.212, 0.264],
    [0.132, 0.199, 0.249],
    [0.124, 0.189, 0.238],
  ],
  basic: [0.12, 0.16, 0.19],
  basicPlus: [0.09, 0.12, 0.15],
  /** Basic and basic plus: income reduced for relevant other children (1, 2, 3+). */
  otherChildren: [0, 0.11, 0.14, 0.16],
  /** Shared care: [minimum nights a year, share taken off]. */
  sharedCare: [
    [175, 0.5],
    [156, 3 / 7],
    [104, 2 / 7],
    [52, 1 / 7],
  ] as [number, number][],
  /** Extra weekly reduction for each child at 175 nights or more. */
  equalCareExtra: 7,
  fees: { paying: 0.2, receiving: 0.04 },
} as const;

export type CmsRate = "nil" | "flat" | "reduced" | "basic" | "basic-plus";

export type CmsInput = {
  /** Paying parent's gross weekly income, before tax. */
  grossWeekly: number;
  /** Pension contributions a week, taken off income first. */
  pensionWeekly: number;
  /** Children this maintenance is for. */
  children: number;
  /** Other children the paying parent lives with and supports. */
  otherChildren: number;
  /** Nights a year the children stay with the paying parent. */
  nights: number;
  /** Paying parent gets a benefit such as Universal Credit with no earnings, or State Pension. */
  onBenefits: boolean;
  collect: boolean;
};

export type CmsResult = {
  rate: CmsRate;
  income: number;
  /** Weekly amount before shared care. */
  beforeShared: number;
  sharedShare: number;
  sharedReduction: number;
  weekly: number;
  /** With Collect and Pay: what the paying parent pays and the receiving parent gets. */
  payingWeekly: number;
  receivingWeekly: number;
  yearly: number;
  perChild: number;
};

export function sharedCareShare(nights: number): number {
  for (const [min, share] of CMS_2026.sharedCare) if (nights >= min) return share;
  return 0;
}

export function childMaintenance(i: CmsInput): CmsResult {
  const c = CMS_2026;
  const kids = Math.max(1, Math.min(10, Math.floor(i.children)));
  const ki = Math.min(3, kids) - 1;
  const others = Math.max(0, Math.min(3, Math.floor(i.otherChildren)));
  const income = Math.min(c.cap, Math.max(0, i.grossWeekly - Math.max(0, i.pensionWeekly)));
  const share = sharedCareShare(i.nights);

  let rate: CmsRate;
  let amount: number;
  if (i.onBenefits) {
    rate = "flat";
    amount = c.flat;
  } else if (income < c.nilBelow) {
    rate = "nil";
    amount = 0;
  } else if (income <= c.reducedFrom) {
    rate = "flat";
    amount = c.flat;
  } else if (income < c.basicFrom) {
    rate = "reduced";
    amount = c.flat + (income - c.reducedFrom) * c.reduced[others][ki];
  } else {
    const adjusted = income * (1 - c.otherChildren[others]);
    const first = Math.min(adjusted, c.plusFrom);
    const rest = Math.max(0, adjusted - c.plusFrom);
    rate = adjusted > c.plusFrom ? "basic-plus" : "basic";
    amount = first * c.basic[ki] + rest * c.basicPlus[ki];
  }

  let weekly = amount;
  let sharedReduction = 0;
  if (rate === "flat") {
    // Flat rate on benefits falls to nil with shared care of 52 nights or more.
    if (i.onBenefits && share > 0) weekly = 0;
  } else if (rate !== "nil" && share > 0) {
    weekly = amount * (1 - share) - (share === 0.5 ? c.equalCareExtra * kids : 0);
    weekly = Math.max(c.flat, weekly);
  }
  sharedReduction = Math.max(0, amount - weekly);
  weekly = Math.round(weekly * 100) / 100;
  const payingWeekly = i.collect ? weekly * (1 + c.fees.paying) : weekly;
  const receivingWeekly = i.collect ? weekly * (1 - c.fees.receiving) : weekly;
  return {
    rate,
    income,
    beforeShared: amount,
    sharedShare: share,
    sharedReduction,
    weekly,
    payingWeekly,
    receivingWeekly,
    yearly: weekly * 52,
    perChild: weekly / kids,
  };
}

/* ── Childcare costs ───────────────────────────────────────────── */

export type CareStage = ChildStage | "school";

export type CareChild = { stage: CareStage; hours: number };

export type ChildcareInput = {
  children: CareChild[];
  hourlyRate: number;
  weeks: number;
  /** Every parent works and meets the minimum earnings test. */
  working: boolean;
  /** Getting certain benefits or on a low income (2-year-old offer). */
  lowIncome: boolean;
  /** Either parent has adjusted net income over £100,000 (no Tax-Free Childcare or working-parent hours). */
  over100k: boolean;
};

export type ChildcareChildResult = { stage: CareStage; hoursPerWeek: number; fullCost: number; funded: number; afterFunded: number; fundedWeekly: number };

export type ChildcareResult = {
  children: ChildcareChildResult[];
  fullCost: number;
  funded: number;
  afterFunded: number;
  /** Tax-Free Childcare top-up on what is left. */
  tfc: number;
  /** Universal Credit childcare element (85%, capped) on what is left, a year. */
  uc: number;
  afterTfc: number;
  afterUc: number;
  tfcAvailable: boolean;
};

export function childcareCosts(i: ChildcareInput): ChildcareResult {
  const weeks = Math.min(52, Math.max(1, i.weeks));
  const working = i.working && !i.over100k;
  const rows: ChildcareChildResult[] = i.children.map((ch) => {
    if (ch.stage === "school") {
      const fullCost = Math.max(0, ch.hours) * weeks * Math.max(0, i.hourlyRate);
      return { stage: ch.stage, hoursPerWeek: 0, fullCost, funded: 0, afterFunded: fullCost, fundedWeekly: 0 };
    }
    const f = freeHours({ stage: ch.stage, working, lowIncome: i.lowIncome, hoursUsed: ch.hours, weeksUsed: weeks, hourlyRate: i.hourlyRate, extrasWeekly: 0 });
    return { stage: ch.stage, hoursPerWeek: f.hoursPerWeek, fullCost: f.fullCost, funded: f.value, afterFunded: f.youPay, fundedWeekly: f.stretchedWeekly };
  });
  const fullCost = rows.reduce((a, r) => a + r.fullCost, 0);
  const funded = rows.reduce((a, r) => a + r.funded, 0);
  const afterFunded = rows.reduce((a, r) => a + r.afterFunded, 0);
  const tfcAvailable = i.working && !i.over100k;
  const tfc = tfcAvailable ? taxFreeChildcarePlan(rows.map((r) => ({ cost: r.afterFunded, disabled: false }))).topUp : 0;
  const n = rows.filter((r) => r.afterFunded > 0).length;
  const capMonthly = n >= 2 ? UC_CHILDCARE.maxTwoPlus : UC_CHILDCARE.maxOne;
  const uc = i.working ? Math.min((afterFunded / 12) * UC_CHILDCARE.share, capMonthly) * 12 : 0;
  return { children: rows, fullCost, funded, afterFunded, tfc, uc, afterTfc: afterFunded - tfc, afterUc: afterFunded - uc, tfcAvailable };
}

/* ── Statutory Adoption Pay ────────────────────────────────────── */

export type AdoptionInput = {
  awe: number;
  /** Employed by the same employer for 26 weeks by the week you were matched. */
  service: boolean;
  fullPayWeeks: number;
  halfPayWeeks: number;
  leaveWeeks: number;
};

/**
 * Statutory Adoption Pay: 6 weeks at 90% of average weekly earnings, then 33
 * weeks at the lower of £194.32 or 90%. Unlike maternity, there is no
 * Maternity Allowance fallback: without SAP there is no statutory pay.
 */
export function adoptionPay(i: AdoptionInput): MaternityResult & { eligible: boolean } {
  const r = maternityPay(i);
  const eligible = r.route === "smp";
  if (eligible) return { ...r, eligible };
  const weeks = r.weeks.map((w) => ({ ...w, statutory: 0, employer: 0, total: 0 }));
  return { ...r, route: "none", firstSix: 0, remaining: 0, statutoryTotal: 0, employerTopUp: 0, total: 0, weeks, eligible };
}

export { paternityPay };

/* ── Sure Start Maternity Grant / Best Start Grant ─────────────── */

export const MATERNITY_GRANT_2026 = {
  sureStart: 500,
  bestStart: { first: 796.65, later: 398.35, extraBaby: 398.35 },
} as const;

export type GrantInput = {
  scotland: boolean;
  /** On a qualifying benefit such as Universal Credit or Pension Credit. */
  benefit: boolean;
  /** Babies expected (2 for twins). */
  babies: number;
  /** Other children under 16 already in the family. */
  otherChildren: number;
  /** Scotland: parent under 18, or 18 or 19 and still dependent. */
  youngParent: boolean;
};

export type GrantResult = { eligible: boolean; amount: number; scheme: "Sure Start Maternity Grant" | "Best Start Grant"; reason: string };

export function maternityGrant(i: GrantInput): GrantResult {
  const babies = Math.max(1, Math.min(4, Math.floor(i.babies)));
  const others = Math.max(0, Math.floor(i.otherChildren));
  if (i.scotland) {
    const b = MATERNITY_GRANT_2026.bestStart;
    if (!i.benefit && !i.youngParent) return { eligible: false, amount: 0, scheme: "Best Start Grant", reason: "You need a qualifying benefit, unless you are under 18 (or 18 or 19 and dependent on a parent)." };
    const amount = (others === 0 ? b.first : b.later) + (babies - 1) * b.extraBaby;
    return { eligible: true, amount, scheme: "Best Start Grant", reason: others === 0 ? "First child: the higher payment." : "You have older children: the lower payment." };
  }
  if (!i.benefit) return { eligible: false, amount: 0, scheme: "Sure Start Maternity Grant", reason: "You need a qualifying benefit such as Universal Credit or Pension Credit." };
  const grants = others === 0 ? babies : babies - 1;
  if (grants <= 0) return { eligible: false, amount: 0, scheme: "Sure Start Maternity Grant", reason: "You already have a child under 16, and you are not expecting a multiple birth." };
  return {
    eligible: true,
    amount: grants * MATERNITY_GRANT_2026.sureStart,
    scheme: "Sure Start Maternity Grant",
    reason: others === 0 ? "No other children under 16." : "A multiple birth: a grant for each extra baby.",
  };
}
