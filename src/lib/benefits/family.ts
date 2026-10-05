/**
 * Family benefits engine, 2026/27: Child Benefit and the High Income Child
 * Benefit Charge, funded childcare, Tax-Free Childcare, and statutory
 * maternity, paternity and shared parental pay.
 *
 * Sources: DWP "Benefit and pension rates 2026/2027"; HMRC Child Benefit
 * rates 2026/27; gov.uk/30-hours-free-childcare; gov.uk/tax-free-childcare.
 */

import { incomeTax, nationalInsurance } from "../tax/2026-27";
import { CHILD_BENEFIT_2026_27 } from "./child-benefit";
import { NMW_2026, type NMWBand } from "./minimum-wage";

export const LOWER_EARNINGS_LIMIT_WEEKLY = 129;
/** Statutory maternity, paternity, shared parental and adoption pay, and Maternity Allowance. */
export const STATUTORY_FLAT_RATE = 194.32;

/* ── Child Benefit ─────────────────────────────── */

export type ChildBenefitPlan = {
  weekly: number;
  /** Paid every four weeks. */
  fourWeekly: number;
  annual: number;
  /** For a part-year claim. */
  forWeeks: number;
};

export function childBenefitFor(children: number, weeks = 52): ChildBenefitPlan {
  const n = Math.max(0, Math.floor(children));
  const c = CHILD_BENEFIT_2026_27;
  const weekly = n === 0 ? 0 : c.firstChildWeekly + (n - 1) * c.additionalChildWeekly;
  const w = Math.min(52, Math.max(0, weeks));
  return { weekly, fourWeekly: weekly * 4, annual: weekly * 52, forWeeks: weekly * w };
}

export type HicbcInput = {
  children: number;
  /** Total taxable income before the deductions below. */
  income: number;
  /** Personal pension contributions, gross (relief at source). */
  pension: number;
  /** Gift Aid donations, gross. */
  giftAid: number;
  /** Weeks of Child Benefit in the tax year. */
  weeks: number;
};

export type HicbcResult = {
  benefit: number;
  adjustedNetIncome: number;
  /** Share of the benefit clawed back, 0–1. */
  share: number;
  charge: number;
  keep: number;
  /** Extra gross pension needed to bring income down to £60,000. */
  pensionToAvoid: number;
  /** Income Tax, NI and charge on the next £1,000 of income. */
  marginalRate: number;
  band: "none" | "partial" | "full";
};

/** The charge is 1% for every £200 above £60,000, rounded down to whole 1%. */
export function hicbcShare(ani: number): number {
  const c = CHILD_BENEFIT_2026_27;
  if (ani <= c.hicbcStart) return 0;
  if (ani >= c.hicbcEnd) return 1;
  return Math.floor((ani - c.hicbcStart) / 200) / 100;
}

export function hicbc(i: HicbcInput): HicbcResult {
  const benefit = childBenefitFor(i.children, i.weeks).forWeeks;
  const ani = Math.max(0, i.income - Math.max(0, i.pension) - Math.max(0, i.giftAid));
  const share = hicbcShare(ani);
  const charge = benefit * share;
  // Marginal cost of £1,000 more salary: tax + employee NI + extra charge.
  const tax = (inc: number) => incomeTax(inc).total + nationalInsurance(inc).total;
  const extra = 1000;
  const after = hicbcShare(ani + extra) * benefit;
  const marginalRate = (tax(i.income + extra) - tax(i.income) + after - charge) / extra;
  return {
    benefit,
    adjustedNetIncome: ani,
    share,
    charge,
    keep: benefit - charge,
    pensionToAvoid: Math.max(0, ani - CHILD_BENEFIT_2026_27.hicbcStart),
    marginalRate,
    band: share === 0 ? "none" : share >= 1 ? "full" : "partial",
  };
}

/* ── Funded childcare (England) ─────────────────────────────── */

export type ChildStage = "under9m" | "9m-2" | "2" | "3-4";

const FUNDED = {
  /** Funded weeks a year; hours can be stretched over up to 52 weeks. */
  termWeeks: 38,
  workingHours: 30,
  universalHours: 15,
  /** Adjusted net income limit for each parent. */
  incomeLimit: 100_000,
  /** Minimum earnings: 16 hours a week at the parent's minimum wage. */
  minHours: 16,
} as const;

export type FreeHoursInput = {
  stage: ChildStage;
  /** Every parent in the household meets the work test. */
  working: boolean;
  /** Getting certain benefits or on a low income (2-year-old offer). */
  lowIncome: boolean;
  /** Hours of childcare used a week. */
  hoursUsed: number;
  /** Weeks a year childcare is used. */
  weeksUsed: number;
  /** Provider's hourly rate. */
  hourlyRate: number;
  /** Extra charges a week for meals, consumables and so on. */
  extrasWeekly: number;
};

export type FreeHoursResult = {
  hoursPerWeek: number;
  annualHours: number;
  /** Funded hours a week if spread over the weeks used. */
  stretchedWeekly: number;
  /** Value of the funded hours at your provider's rate. */
  value: number;
  /** Total cost of the childcare you use, before funding. */
  fullCost: number;
  /** What you pay after the funded hours. */
  youPay: number;
  route: "working" | "universal" | "disadvantaged" | "none";
};

export function minimumWeeklyEarnings(band: NMWBand): number {
  return NMW_2026[band].hourly * FUNDED.minHours;
}

export function freeHours(i: FreeHoursInput): FreeHoursResult {
  let hoursPerWeek = 0;
  let route: FreeHoursResult["route"] = "none";
  if (i.stage === "3-4") {
    hoursPerWeek = i.working ? FUNDED.workingHours : FUNDED.universalHours;
    route = i.working ? "working" : "universal";
  } else if (i.stage === "9m-2" || i.stage === "2") {
    if (i.working) {
      hoursPerWeek = FUNDED.workingHours;
      route = "working";
    } else if (i.stage === "2" && i.lowIncome) {
      hoursPerWeek = FUNDED.universalHours;
      route = "disadvantaged";
    }
  }
  const annualHours = hoursPerWeek * FUNDED.termWeeks;
  const weeks = Math.min(52, Math.max(1, i.weeksUsed));
  const usedHours = Math.max(0, i.hoursUsed) * weeks;
  const fundedUsed = Math.min(annualHours, usedHours);
  const rate = Math.max(0, i.hourlyRate);
  const extras = Math.max(0, i.extrasWeekly) * weeks;
  const fullCost = usedHours * rate + extras;
  return {
    hoursPerWeek,
    annualHours,
    stretchedWeekly: annualHours / weeks,
    value: fundedUsed * rate,
    fullCost,
    youPay: Math.max(0, fullCost - fundedUsed * rate),
    route,
  };
}

/* ── Tax-Free Childcare ─────────────────────────────── */

export const TFC = {
  /** Government adds £2 for every £8 you pay in: 20% of the total. */
  share: 0.2,
  capPerChild: 2000,
  capDisabled: 4000,
} as const;

export type TfcChild = { cost: number; disabled: boolean };

export type TfcResult = {
  /** Total childcare cost a year. */
  cost: number;
  topUp: number;
  youPay: number;
  /** Per child: top-up and whether it hits the cap. */
  children: { cost: number; topUp: number; capped: boolean; cap: number }[];
  /** Spending at which the top-up reaches the cap, per standard child. */
  spendForMaxTopUp: number;
};

export function taxFreeChildcarePlan(children: TfcChild[]): TfcResult {
  const rows = children.map((c) => {
    const cap = c.disabled ? TFC.capDisabled : TFC.capPerChild;
    const raw = Math.max(0, c.cost) * TFC.share;
    return { cost: Math.max(0, c.cost), topUp: Math.min(cap, raw), capped: raw >= cap, cap };
  });
  const cost = rows.reduce((a, r) => a + r.cost, 0);
  const topUp = rows.reduce((a, r) => a + r.topUp, 0);
  return { cost, topUp, youPay: cost - topUp, children: rows, spendForMaxTopUp: TFC.capPerChild / TFC.share };
}

/* ── Statutory maternity, paternity and shared parental pay ─────────────── */

/** 90% of average weekly earnings, capped at the flat rate. */
function cappedWeekly(awe: number): number {
  return Math.min(STATUTORY_FLAT_RATE, 0.9 * Math.max(0, awe));
}

export type PayWeek = { week: number; statutory: number; employer: number; total: number };

export type MaternityInput = {
  /** Average weekly earnings in the 8 weeks before the qualifying week. */
  awe: number;
  /** Employed by the same employer for 26 weeks by the qualifying week. */
  service: boolean;
  /** Employer scheme: weeks at full pay, then weeks at half pay (including SMP). */
  fullPayWeeks: number;
  halfPayWeeks: number;
  /** Weeks of leave taken (up to 52). */
  leaveWeeks: number;
};

export type MaternityResult = {
  route: "smp" | "ma" | "none";
  firstSix: number;
  remaining: number;
  statutoryTotal: number;
  employerTopUp: number;
  total: number;
  /** Normal pay over the same weeks, for comparison. */
  normalPay: number;
  weeks: PayWeek[];
};

/** SMP: 6 weeks at 90% of AWE, 33 weeks at the lower of £194.32 or 90%. Maternity Allowance: 39 weeks at the lower rate. */
export function maternityPay(i: MaternityInput): MaternityResult {
  const awe = Math.max(0, i.awe);
  const eligibleSmp = i.service && awe >= LOWER_EARNINGS_LIMIT_WEEKLY;
  // Maternity Allowance needs average earnings of at least £30 a week.
  const route: MaternityResult["route"] = eligibleSmp ? "smp" : awe >= 30 ? "ma" : "none";
  const firstSix = route === "smp" ? 0.9 * awe : route === "ma" ? cappedWeekly(awe) : 0;
  const remaining = route === "none" ? 0 : cappedWeekly(awe);
  const leave = Math.min(52, Math.max(0, Math.round(i.leaveWeeks)));
  const weeks: PayWeek[] = [];
  for (let w = 1; w <= leave; w++) {
    const statutory = w <= 6 ? firstSix : w <= 39 ? remaining : 0;
    let scheme = 0;
    if (w <= i.fullPayWeeks) scheme = awe;
    else if (w <= i.fullPayWeeks + i.halfPayWeeks) scheme = awe / 2;
    // Employer schemes are usually "inclusive of SMP": you get the higher of the two.
    const employer = route === "smp" ? Math.max(0, scheme - statutory) : 0;
    weeks.push({ week: w, statutory, employer, total: statutory + employer });
  }
  const statutoryTotal = weeks.reduce((a, w) => a + w.statutory, 0);
  const employerTopUp = weeks.reduce((a, w) => a + w.employer, 0);
  return { route, firstSix, remaining, statutoryTotal, employerTopUp, total: statutoryTotal + employerTopUp, normalPay: awe * leave, weeks };
}

export type PaternityInput = {
  awe: number;
  service: boolean;
  weeks: 1 | 2;
  /** Employer pays full pay for this many of the weeks. */
  fullPayWeeks: number;
};

export type PaternityResult = {
  eligiblePay: boolean;
  weekly: number;
  statutory: number;
  employerTopUp: number;
  total: number;
  normalPay: number;
  /** Pay lost compared with normal earnings. */
  shortfall: number;
};

export function paternityPay(i: PaternityInput): PaternityResult {
  const awe = Math.max(0, i.awe);
  const eligiblePay = i.service && awe >= LOWER_EARNINGS_LIMIT_WEEKLY;
  const weekly = eligiblePay ? cappedWeekly(awe) : 0;
  const statutory = weekly * i.weeks;
  const full = Math.min(i.weeks, Math.max(0, i.fullPayWeeks));
  const employerTopUp = Math.max(0, awe - weekly) * full;
  const total = statutory + employerTopUp;
  const normalPay = awe * i.weeks;
  return { eligiblePay, weekly, statutory, employerTopUp, total, normalPay, shortfall: Math.max(0, normalPay - total) };
}

export type SharedInput = {
  /** Mother's (or primary adopter's) average weekly earnings. */
  aweA: number;
  /** Partner's average weekly earnings. */
  aweB: number;
  /** Weeks of maternity leave the mother takes before ending it (at least 2). */
  maternityWeeks: number;
  /** Weeks of shared parental leave the partner takes. */
  partnerWeeks: number;
  /** Weeks of shared parental leave the mother takes after her maternity leave. */
  motherSharedWeeks: number;
};

export type SharedResult = {
  maternityWeeks: number;
  sharedLeaveAvailable: number;
  sharedPayAvailable: number;
  partnerWeeks: number;
  motherSharedWeeks: number;
  partnerPaidWeeks: number;
  motherSharedPaidWeeks: number;
  partnerWeekly: number;
  motherShppWeekly: number;
  motherPay: number;
  partnerPay: number;
  total: number;
  /** Leave left unused out of 52 weeks. */
  unusedLeave: number;
  /** Paid weeks left unused out of 39. */
  unusedPay: number;
  overLeave: boolean;
};

export function sharedParental(i: SharedInput): SharedResult {
  const m = Math.min(52, Math.max(2, Math.round(i.maternityWeeks)));
  const leaveLeft = 52 - m;
  const payLeft = Math.max(0, 39 - m);
  const partnerWeeks = Math.max(0, Math.round(i.partnerWeeks));
  const motherSharedWeeks = Math.max(0, Math.round(i.motherSharedWeeks));
  // Paid weeks go to the partner first, then the mother's shared weeks.
  const partnerPaidWeeks = Math.min(partnerWeeks, payLeft);
  const motherSharedPaidWeeks = Math.min(motherSharedWeeks, payLeft - partnerPaidWeeks);
  const smp = maternityPay({ awe: i.aweA, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: m });
  const partnerWeekly = cappedWeekly(i.aweB);
  const motherShppWeekly = cappedWeekly(i.aweA);
  const motherPay = smp.statutoryTotal + motherShppWeekly * motherSharedPaidWeeks;
  const partnerPay = partnerWeekly * partnerPaidWeeks;
  return {
    maternityWeeks: m,
    sharedLeaveAvailable: leaveLeft,
    sharedPayAvailable: payLeft,
    partnerWeeks,
    motherSharedWeeks,
    partnerPaidWeeks,
    motherSharedPaidWeeks,
    partnerWeekly,
    motherShppWeekly,
    motherPay,
    partnerPay,
    total: motherPay + partnerPay,
    unusedLeave: Math.max(0, leaveLeft - partnerWeeks - motherSharedWeeks),
    unusedPay: Math.max(0, payLeft - partnerPaidWeeks - motherSharedPaidWeeks),
    overLeave: partnerWeeks + motherSharedWeeks > leaveLeft,
  };
}
