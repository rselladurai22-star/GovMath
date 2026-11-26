/**
 * Family benefits engine, 2026/27: Child Benefit and the High Income Child
 * Benefit Charge, funded childcare, Tax-Free Childcare, and statutory
 * maternity, paternity and shared parental pay.
 *
 * Sources: DWP "Benefit and pension rates 2026/2027"; HMRC Child Benefit
 * rates 2026/27; gov.uk/30-hours-free-childcare; gov.uk/tax-free-childcare.
 */

import { incomeTax, nationalInsurance } from "../tax/2026-27";
import { childBenefitRates } from "./child-benefit";
import { forYear, type RatesYear } from "./rates-year";
import { NMW_2026, type NMWBand } from "./minimum-wage";
import { ucChildcare } from "./uc-engine";

export const LOWER_EARNINGS_LIMIT_WEEKLY = 129;
/** Statutory maternity, paternity, shared parental and adoption pay, and Maternity Allowance. */
export const STATUTORY_FLAT_RATE = 194.32;

/**
 * Proposed from 6 April 2027 (DWP "Proposed benefit and pension rates 2027 to
 * 2028"): SMP, SPP, ShPP, SAP and Maternity Allowance £201.11 a week, earnings
 * threshold £133. The Maternity Allowance threshold stays £30.
 */
export const STATUTORY_2027_28 = { flatRate: 201.11, lowerEarningsLimit: 133, maThreshold: 30 } as const;
export const STATUTORY_2026_27 = { flatRate: STATUTORY_FLAT_RATE, lowerEarningsLimit: LOWER_EARNINGS_LIMIT_WEEKLY, maThreshold: 30 } as const;

export type StatutoryRates = { flatRate: number; lowerEarningsLimit: number; maThreshold: number };
export const statutoryRates = (year?: RatesYear): StatutoryRates => forYear<StatutoryRates>(year, STATUTORY_2026_27, STATUTORY_2027_28);

/* ── Child Benefit ─────────────────────────────── */

export type ChildBenefitPlan = {
  weekly: number;
  /** Paid every four weeks. */
  fourWeekly: number;
  annual: number;
  /** For a part-year claim. */
  forWeeks: number;
};

export function childBenefitFor(children: number, weeks = 52, year?: RatesYear): ChildBenefitPlan {
  const n = Math.max(0, Math.floor(children));
  const c = childBenefitRates(year);
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
  /** Child Benefit rates to use (default 2026/27). The charge thresholds do not change. */
  year?: RatesYear;
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
  const c = childBenefitRates();
  if (ani <= c.hicbcStart) return 0;
  if (ani >= c.hicbcEnd) return 1;
  return Math.floor((ani - c.hicbcStart) / 200) / 100;
}

export function hicbc(i: HicbcInput): HicbcResult {
  const benefit = childBenefitFor(i.children, i.weeks, i.year).forWeeks;
  const ani = Math.max(0, i.income - Math.max(0, i.pension) - Math.max(0, i.giftAid));
  const share = hicbcShare(ani);
  // ITEPA 2003 s681C(3): the Child Benefit total and the charge are each
  // rounded down to whole pounds (pence are rounded first, so £4,199.00 held
  // as 4198.999… is not cut to £4,198).
  const pounds = (n: number) => Math.floor(Math.round(n * 100) / 100);
  const chargeAt = (s: number) => pounds(pounds(benefit) * s);
  const charge = chargeAt(share);
  // Marginal cost of £1,000 more salary: tax + employee NI + extra charge.
  const tax = (inc: number) => incomeTax(inc).total + nationalInsurance(inc).total;
  const extra = 1000;
  const after = chargeAt(hicbcShare(ani + extra));
  const marginalRate = (tax(i.income + extra) - tax(i.income) + after - charge) / extra;
  return {
    benefit,
    adjustedNetIncome: ani,
    share,
    charge,
    keep: benefit - charge,
    pensionToAvoid: Math.max(0, ani - childBenefitRates(i.year).hicbcStart),
    marginalRate,
    band: share === 0 ? "none" : share >= 1 ? "full" : "partial",
  };
}

/**
 * Who pays: the partner with the higher adjusted net income, whoever receives
 * the Child Benefit (ITEPA 2003 s681B). With equal incomes it stays with you.
 */
export function hicbcPayer(yourAdjustedNetIncome: number, partnerAdjustedNetIncome: number): "you" | "partner" {
  return partnerAdjustedNetIncome > yourAdjustedNetIncome ? "partner" : "you";
}

/* ── Funded childcare (England) ─────────────────────────────── */

export type ChildStage = "under9m" | "9m-2" | "2" | "3-4";

export const FUNDED = {
  /** Funded weeks a year; hours can be stretched over up to 52 weeks. */
  termWeeks: 38,
  workingHours: 30,
  universalHours: 15,
  /** Adjusted net income limit for each parent. */
  incomeLimit: 100_000,
  /** Minimum earnings: 16 hours a week at the parent's minimum wage. */
  minHours: 16,
} as const;

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
};

export function minimumWeeklyEarnings(band: NMWBand): number {
  return Math.round(NMW_2026[band].hourly * FUNDED.minHours * 100) / 100;
}

/** The earnings floor over the three months after applying: 16 hours a week at the parent's minimum wage, × 52 ÷ 4 (GOV.UK prints £2,643.68 for 21 and over). */
export function minimumQuarterEarnings(band: NMWBand): number {
  return Math.round(((minimumWeeklyEarnings(band) * 52) / 4) * 100) / 100;
}

export type ParentWork = {
  /** In work, starting a job, or on leave (maternity, paternity, shared parental, adoption, sick or annual leave). */
  works: boolean;
  /** Not working but counts as working: on carer's leave, Carer's Allowance, contribution-based ESA, the UC LCW or carer element, Incapacity Benefit or National Insurance credits, with a working partner. */
  covered?: boolean;
  /** Which minimum wage applies: 21 and over, 18 to 20, or under 18 and apprentices. */
  band: NMWBand;
  /** Gross weekly earnings expected over the next three months, if known (0 = not entered, taken as enough). */
  weekly?: number;
  /** Self-employed and started the business less than 12 months ago: the earnings floor does not apply. */
  newlySelfEmployed?: boolean;
  /** Expected adjusted net income over £100,000 this tax year. */
  over100k: boolean;
};

export type WorkingParentResult = {
  passes: boolean;
  /** Why each parent fails, if they do (null = passes). */
  parents: ("not-working" | "low-earnings" | "over-100k" | null)[];
};

/**
 * The working parent test for Free Childcare for Working Parents and
 * Tax-Free Childcare (GOV.UK, "check you're eligible"). Each parent in the
 * household must work and expect to earn at least 16 hours a week at their
 * minimum wage, and neither may have adjusted net income over £100,000.
 * One parent may instead be covered by a benefit or carer's leave while the
 * other works.
 */
export function workingParentTest(parents: ParentWork[]): WorkingParentResult {
  const anyWorks = parents.some((p) => p.works);
  const why = parents.map((p) => {
    if (p.over100k) return "over-100k" as const;
    if (!p.works) return p.covered && anyWorks ? null : ("not-working" as const);
    const w = p.weekly ?? 0;
    if (w > 0 && !p.newlySelfEmployed && Math.round(w * 100) < Math.round(minimumWeeklyEarnings(p.band) * 100)) return "low-earnings" as const;
    return null;
  });
  return { passes: parents.length > 0 && why.every((r) => r === null), parents: why };
}

/** What a year of childcare costs with a number of funded hours a week (funded hours come in 38 weeks a year, and can be stretched over the weeks used). */
export function fundedCost(hoursPerWeek: number, i: { hoursUsed: number; weeksUsed: number; hourlyRate: number; extrasWeekly: number }): FreeHoursResult {
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

/**
 * The most Universal Credit's childcare costs element could pay over a year:
 * 85% of the costs, up to the monthly maximum for one child or for two or
 * more. It is part of the maximum award, so the taper on earnings and other
 * income can take some or all of it back: this is the ceiling, not the award.
 */
export function ucChildcareCeiling(children: TfcChild[], year?: RatesYear): { annual: number; capMonthly: number; capped: boolean } {
  const r = ucChildcare(year);
  const paying = children.filter((c) => c.cost > 0);
  const cost = paying.reduce((a, c) => a + c.cost, 0);
  const capMonthly = paying.length >= 2 ? r.maxTwoPlus : r.maxOne;
  const raw = cost * r.share;
  return { annual: paying.length === 0 ? 0 : Math.min(raw, capMonthly * 12), capMonthly, capped: raw > capMonthly * 12 };
}

/* ── Statutory maternity, paternity and shared parental pay ─────────────── */

/** 90% of average weekly earnings, capped at the flat rate. */
function cappedWeekly(awe: number, flatRate = STATUTORY_FLAT_RATE): number {
  return Math.min(flatRate, 0.9 * Math.max(0, awe));
}

export type PayWeek = {
  week: number;
  /** The date this pay week starts (when a start date is given). */
  starts?: string;
  statutory: number;
  employer: number;
  total: number;
  /** "first" = weeks 1 to 6, "flat" = weeks 7 to 39, "unpaid" = weeks 40 on. */
  kind: "first" | "flat" | "unpaid";
};

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
  /** Statutory rates to use (default 2026/27). With "2027/28" and a start date, weeks before the April 2027 uprating keep the 2026/27 rate. */
  year?: RatesYear;
  /** The first day of maternity pay (ISO date). */
  startIso?: string;
  /** The tax year of the qualifying week, which sets the earnings threshold (default: `year`). */
  qualifyingYear?: RatesYear;
};

export type MaternityResult = {
  route: "smp" | "ma" | "none";
  /** Weekly statutory pay in weeks 1 to 6 and 7 to 39 (at the first week's rate). */
  firstSix: number;
  remaining: number;
  statutoryTotal: number;
  employerTopUp: number;
  total: number;
  /** Normal pay over the same weeks, for comparison. */
  normalPay: number;
  /** The earnings threshold that applied. */
  threshold: number;
  weeks: PayWeek[];
};

/**
 * When the April 2027 rates start. HMRC uprates SMP from the first Sunday in
 * April ("The SMP rate applies from 5 April 2026. All other rates apply from
 * 6 April 2026": HMRC rates and thresholds for employers 2026 to 2027), so
 * from 4 April 2027; Maternity Allowance, a DWP benefit, from 6 April 2027.
 */
export const UPRATING_2027 = { smp: "2027-04-04", ma: "2027-04-06" } as const;

const isoPlusDays = (iso: string, days: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`;
};

/** SMP: 6 weeks at 90% of AWE, 33 weeks at the lower of the flat rate or 90%. Maternity Allowance: 39 weeks at the lower of the two. */
export function maternityPay(i: MaternityInput): MaternityResult {
  const awe = Math.max(0, i.awe);
  const threshold = statutoryRates(i.qualifyingYear ?? i.year);
  const eligibleSmp = i.service && awe >= threshold.lowerEarningsLimit;
  // Maternity Allowance needs earnings of at least £30 a week in 13 of the 66 weeks before the due week.
  const route: MaternityResult["route"] = eligibleSmp ? "smp" : awe >= threshold.maThreshold ? "ma" : "none";
  const switchDate = route === "ma" ? UPRATING_2027.ma : UPRATING_2027.smp;
  const ratesFor = (starts?: string): StatutoryRates =>
    i.year === "2027/28" && starts !== undefined && starts < switchDate ? STATUTORY_2026_27 : statutoryRates(i.year);
  const firstRates = ratesFor(i.startIso);
  const firstSix = route === "smp" ? 0.9 * awe : route === "ma" ? cappedWeekly(awe, firstRates.flatRate) : 0;
  const remaining = route === "none" ? 0 : cappedWeekly(awe, firstRates.flatRate);
  const leave = Math.min(52, Math.max(0, Math.round(i.leaveWeeks)));
  const weeks: PayWeek[] = [];
  for (let w = 1; w <= leave; w++) {
    const starts = i.startIso ? isoPlusDays(i.startIso, (w - 1) * 7) : undefined;
    const flat = route === "none" ? 0 : cappedWeekly(awe, ratesFor(starts).flatRate);
    const kind: PayWeek["kind"] = w <= 6 ? "first" : w <= 39 ? "flat" : "unpaid";
    const statutory = kind === "first" ? (route === "smp" ? 0.9 * awe : flat) : kind === "flat" ? flat : 0;
    let scheme = 0;
    if (w <= i.fullPayWeeks) scheme = awe;
    else if (w <= i.fullPayWeeks + i.halfPayWeeks) scheme = awe / 2;
    // Employer schemes are usually "inclusive of SMP": you get the higher of the two.
    const employer = route === "smp" ? Math.max(0, scheme - statutory) : 0;
    weeks.push({ week: w, starts, statutory, employer, total: statutory + employer, kind });
  }
  const statutoryTotal = weeks.reduce((a, w) => a + w.statutory, 0);
  const employerTopUp = weeks.reduce((a, w) => a + w.employer, 0);
  return { route, firstSix, remaining, statutoryTotal, employerTopUp, total: statutoryTotal + employerTopUp, normalPay: awe * leave, threshold: threshold.lowerEarningsLimit, weeks };
}

export type MaternityDates = {
  /** Expected week of childbirth: the Sunday to Saturday week the due date falls in. */
  ewcStart: string;
  /** Qualifying week: the 15th week before the expected week (Sunday to Saturday). */
  qwStart: string;
  qwEnd: string;
  /** Tell your employer by the end of the qualifying week. */
  noticeBy: string;
  /** The earliest leave and pay can start: the Sunday 11 weeks before the expected week. */
  earliestStart: string;
  /** Latest start date with the employer for 26 weeks' continuous service by the end of the qualifying week (GOV.UK employer guide: "at least 26 weeks up to any day in the qualifying week"). */
  startedBy: string;
};

/** The statutory dates that follow from a due date (GOV.UK, maternity pay and leave). */
export function maternityDates(dueIso: string): MaternityDates {
  const [y, m, d] = dueIso.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const ewcStart = isoPlusDays(dueIso, -dow);
  const qwStart = isoPlusDays(ewcStart, -15 * 7);
  const qwEnd = isoPlusDays(qwStart, 6);
  return { ewcStart, qwStart, qwEnd, noticeBy: qwEnd, earliestStart: isoPlusDays(ewcStart, -11 * 7), startedBy: isoPlusDays(qwStart, -25 * 7) };
}

/** The tax year (6 April to 5 April) a date falls in, as one of the two rate years. */
export const ratesYearOf = (iso: string): RatesYear => (iso >= "2027-04-06" ? "2027/28" : "2026/27");
