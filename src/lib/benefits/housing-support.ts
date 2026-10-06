/**
 * Housing Benefit and Council Tax Reduction, 2026/27.
 *
 * Both use the same "legacy" means test: an applicable amount (what the law
 * says a household needs each week) is compared with weekly income. If income
 * is at or below it, you get the maximum; above it, the award is tapered away:
 * 65p of each extra £1 for Housing Benefit, 20p for Council Tax Reduction.
 * People on Pension Credit Guarantee Credit, income-based JSA, income-related
 * ESA or Income Support are "passported" to the maximum.
 *
 * Rates: DWP "Benefit and pension rates 2026 to 2027" (Housing Benefit
 * personal allowances, premiums, disregards, capital rules and non-dependant
 * deductions). Council Tax Reduction non-dependant deductions: the Council Tax
 * Reduction Schemes (Prescribed Requirements) (England) (Amendment)
 * Regulations 2026 (SI 2026/27), which set the scheme for pensioners in
 * England. Working-age schemes in England are set by each council.
 */

import { lhaWeekly, type LhaCategory } from "./lha-engine";

export const HB_2026 = {
  personal: {
    singleUnder25: 75.65,
    single: 95.55,
    couple: 150.15,
    /** Reached State Pension age on or after 1 April 2021 (most pensioners now). */
    pensionSingle: 238.0,
    pensionCouple: 363.25,
    /** Reached State Pension age before 1 April 2021. */
    pensionSingleOlder: 256.0,
    pensionCoupleOlder: 383.35,
  },
  child: 87.88,
  premium: {
    disabilitySingle: 44.85,
    disabilityCouple: 64.0,
    enhancedSingle: 22.0,
    enhancedCouple: 31.4,
    severeSingle: 86.05,
    severeCoupleBoth: 172.1,
    disabledChild: 84.46,
    enhancedDisabledChild: 33.99,
    carer: 48.15,
  },
  disregard: { single: 5, couple: 10, higher: 20, loneParent: 25, additional: 17.1, childcareOne: 175, childcareTwoPlus: 300 },
  capital: { upper: 16_000, lowerWorkingAge: 6_000, lowerPension: 10_000, stepWorkingAge: 250, stepPension: 500 },
  taper: 0.65,
  /** Awards below 50p a week are not paid. */
  minimumWeekly: 0.5,
  /** Non-dependant deductions a week, by the non-dependant's gross weekly income. */
  nonDependant: {
    notWorking: 20.4,
    bands: [
      { below: 192, amount: 20.4 },
      { below: 279, amount: 46.85 },
      { below: 365, amount: 64.35 },
      { below: 485, amount: 105.2 },
      { below: 605, amount: 119.85 },
      { below: Infinity, amount: 131.45 },
    ],
  },
  /** Social-sector size criteria for working-age tenants. */
  spareRoom: { one: 0.14, twoOrMore: 0.25 },
} as const;

export const CTR_2026 = {
  taper: 0.2,
  /** Pensioner scheme in England (prescribed), also used here as the default elsewhere. */
  nonDependant: {
    notWorking: 5.2,
    bands: [
      { below: 279, amount: 5.2 },
      { below: 485, amount: 10.6 },
      { below: 605, amount: 13.3 },
      { below: Infinity, amount: 15.95 },
    ],
  },
} as const;

/* ── The shared means test ─────────────────────────────── */

export type AgeGroup = "working" | "pension";
export type Disability = "none" | "standard" | "enhanced";
/** A non-dependant's situation. "exempt" covers people on Pension Credit, under-25s on Universal Credit with no earnings, students and others with no deduction. */
export type NonDepBand = "exempt" | "not-working" | number;

export type MeansInput = {
  age: AgeGroup;
  couple: boolean;
  /** Claimant (single) aged under 25: lower personal allowance for working-age single people without children. */
  under25: boolean;
  /** Pensioners: reached State Pension age before 1 April 2021 (higher personal allowance). */
  olderPensioner: boolean;
  children: number;
  disabledChildren: number;
  enhancedDisabledChildren: number;
  /** Disability premium (working age): you or your partner get PIP, DLA or similar. "enhanced" = PIP enhanced daily living or DLA highest care. */
  disability: Disability;
  /** Severe disability premium: you get PIP daily living or DLA middle/high care, nobody is paid Carer's Allowance for you and no non-dependants live with you. */
  severe: boolean;
  /** Carer premium: you or your partner are entitled to Carer's Allowance. */
  carer: boolean;
  /** On Pension Credit Guarantee Credit, Income Support, income-based JSA or income-related ESA. */
  passported: boolean;
  /** Net weekly earnings: after tax, NI and half of any pension contributions. */
  earnings: number;
  /** Other weekly income that counts in full: State Pension, other pensions, Carer's Allowance, contribution-based JSA or ESA. */
  otherIncome: number;
  /** Registered childcare a week (working parents only). */
  childcare: number;
  /** Works enough hours for the additional earnings disregard: 30 a week, or 16 for parents and disabled people. */
  fullTime: boolean;
  savings: number;
};

export type MeansResult = {
  applicableAmount: number;
  lines: { label: string; amount: number }[];
  earningsDisregard: number;
  tariffIncome: number;
  /** Weekly income counted in the means test. */
  income: number;
  /** Income above the applicable amount. */
  excess: number;
  /** Savings over £16,000 rule you out (unless on Pension Credit Guarantee Credit). */
  overCapital: boolean;
};

/** £1 a week of assumed income for each £250 (or £500 for pensioners) or part above the lower limit. */
export function tariffIncome(savings: number, age: AgeGroup): number {
  const c = HB_2026.capital;
  const lower = age === "pension" ? c.lowerPension : c.lowerWorkingAge;
  const step = age === "pension" ? c.stepPension : c.stepWorkingAge;
  if (savings <= lower) return 0;
  return Math.ceil((savings - lower) / step);
}

export function meansTest(i: MeansInput): MeansResult {
  const p = HB_2026.personal;
  const pr = HB_2026.premium;
  const pension = i.age === "pension";
  const lines: { label: string; amount: number }[] = [];
  const parent = i.children > 0;

  const personal = pension
    ? i.couple
      ? i.olderPensioner
        ? p.pensionCoupleOlder
        : p.pensionCouple
      : i.olderPensioner
        ? p.pensionSingleOlder
        : p.pensionSingle
    : i.couple
      ? p.couple
      : i.under25 && !parent
        ? p.singleUnder25
        : p.single;
  lines.push({ label: i.couple ? "Personal allowance (couple)" : "Personal allowance", amount: personal });

  const kids = Math.max(0, Math.round(i.children));
  if (kids > 0) lines.push({ label: `Child allowance × ${kids}`, amount: kids * HB_2026.child });
  const disabledKids = Math.min(kids, Math.max(0, Math.round(i.disabledChildren)));
  if (disabledKids > 0) lines.push({ label: `Disabled child premium × ${disabledKids}`, amount: disabledKids * pr.disabledChild });
  const enhancedKids = Math.min(disabledKids, Math.max(0, Math.round(i.enhancedDisabledChildren)));
  if (enhancedKids > 0) lines.push({ label: `Enhanced disability premium (child) × ${enhancedKids}`, amount: enhancedKids * pr.enhancedDisabledChild });

  // The disability and enhanced disability premiums are for working-age claimants only.
  if (!pension && i.disability !== "none") {
    lines.push({ label: "Disability premium", amount: i.couple ? pr.disabilityCouple : pr.disabilitySingle });
    if (i.disability === "enhanced") lines.push({ label: "Enhanced disability premium", amount: i.couple ? pr.enhancedCouple : pr.enhancedSingle });
  }
  if (i.severe) lines.push({ label: "Severe disability premium", amount: pr.severeSingle });
  if (i.carer) lines.push({ label: "Carer premium", amount: pr.carer });

  const applicableAmount = lines.reduce((a, l) => a + l.amount, 0);

  // Earnings disregard: the highest one that applies, never more than the earnings.
  const d = HB_2026.disregard;
  const higher = (!pension && i.disability !== "none") || i.carer;
  const base = !i.couple && parent ? d.loneParent : higher ? d.higher : i.couple ? d.couple : d.single;
  const earnings = Math.max(0, i.earnings);
  const childcareCap = kids >= 2 ? d.childcareTwoPlus : d.childcareOne;
  const childcare = parent && earnings > 0 ? Math.min(Math.max(0, i.childcare), childcareCap) : 0;
  const additional = i.fullTime && earnings > 0 ? d.additional : 0;
  const earningsDisregard = Math.min(earnings, base + additional + childcare);

  const tariff = tariffIncome(Math.max(0, i.savings), i.age);
  const overCapital = !i.passported && i.savings > HB_2026.capital.upper;
  const income = i.passported ? 0 : Math.max(0, earnings - earningsDisregard) + Math.max(0, i.otherIncome) + tariff;
  const excess = Math.max(0, income - applicableAmount);
  return { applicableAmount, lines, earningsDisregard: i.passported ? 0 : earningsDisregard, tariffIncome: tariff, income, excess, overCapital };
}

/** The deduction for one non-dependant, from a band table. */
function nonDepFrom(table: { notWorking: number; bands: readonly { below: number; amount: number }[] }, band: NonDepBand): number {
  if (band === "exempt") return 0;
  if (band === "not-working") return table.notWorking;
  return table.bands.find((b) => band < b.below)?.amount ?? 0;
}
export const hbNonDep = (band: NonDepBand) => nonDepFrom(HB_2026.nonDependant, band);
export const ctrNonDep = (band: NonDepBand) => nonDepFrom(CTR_2026.nonDependant, band);

/* ── Housing Benefit ───────────────────────────────────── */

export type Landlord = "private" | "social" | "supported";

export type HousingBenefitInput = MeansInput & {
  landlord: Landlord;
  /** Weekly rent, including eligible service charges. */
  rent: number;
  /** Weekly charges Housing Benefit does not cover: energy, water, meals, some services. */
  ineligible: number;
  /** Private tenants: the Local Housing Allowance area and rate category. */
  lhaArea: string;
  lhaCategory: LhaCategory;
  /** Private tenants: a weekly LHA rate to use instead of the area rate. */
  lhaOverride: number;
  /** Social tenants of working age: bedrooms more than the household is allowed. */
  spareRooms: number;
  /** Non-dependants living with you, each described by their situation or gross weekly income. */
  nonDependants: NonDepBand[];
  /** You or your partner get Attendance Allowance, PIP daily living, DLA care or are registered blind: no non-dependant deductions. */
  noNonDepDeductions: boolean;
};

export type HousingBenefitResult = MeansResult & {
  eligibleRent: number;
  lhaRate: number | null;
  spareRoomCut: number;
  nonDepDeduction: number;
  maximum: number;
  taperCut: number;
  weekly: number;
  /** What is left of the rent for you to pay each week. */
  shortfall: number;
};

export function housingBenefit(i: HousingBenefitInput): HousingBenefitResult {
  const m = meansTest(i);
  const rent = Math.max(0, i.rent - Math.max(0, i.ineligible));
  let eligibleRent = rent;
  let lhaRate: number | null = null;
  let spareRoomCut = 0;
  if (i.landlord === "private") {
    lhaRate = i.lhaOverride > 0 ? i.lhaOverride : lhaWeekly(i.lhaArea, i.lhaCategory);
    eligibleRent = Math.min(rent, lhaRate);
  } else if (i.landlord === "social" && i.age === "working" && i.spareRooms > 0) {
    spareRoomCut = rent * (i.spareRooms >= 2 ? HB_2026.spareRoom.twoOrMore : HB_2026.spareRoom.one);
    eligibleRent = rent - spareRoomCut;
  }
  const nonDepDeduction = i.noNonDepDeductions ? 0 : i.nonDependants.reduce<number>((a, b) => a + hbNonDep(b), 0);
  const maximum = Math.max(0, eligibleRent - nonDepDeduction);
  const taperCut = m.excess * HB_2026.taper;
  let weekly = m.overCapital ? 0 : Math.max(0, maximum - taperCut);
  if (weekly < HB_2026.minimumWeekly) weekly = 0;
  return { ...m, eligibleRent, lhaRate, spareRoomCut, nonDepDeduction, maximum, taperCut, weekly, shortfall: Math.max(0, i.rent - weekly) };
}

/* ── Council Tax Reduction ─────────────────────────────── */

export type CtrNation = "england" | "wales" | "scotland";

export type CouncilTaxReductionInput = MeansInput & {
  nation: CtrNation;
  /** Yearly council tax after any discounts, such as the 25% single person discount. */
  annualBill: number;
  /** Working age in England only: the most your council's scheme pays, as a share of the bill (0 to 1). */
  maxShare: number;
  /** Working age in England only: your council's taper (0 to 1). */
  taper: number;
  nonDependants: NonDepBand[];
  noNonDepDeductions: boolean;
};

export type CouncilTaxReductionResult = MeansResult & {
  weeklyBill: number;
  maxShare: number;
  taper: number;
  nonDepDeduction: number;
  maximum: number;
  taperCut: number;
  weekly: number;
  annual: number;
  /** What is left of the yearly bill to pay. */
  leftToPay: number;
  /** Rules come from the national scheme (pensioners everywhere; everyone in Wales and Scotland). */
  national: boolean;
};

/** Council tax is worked out by the day, so a week is a year's bill × 7 ÷ 365. */
export const weeklyFromAnnual = (annual: number) => (Math.max(0, annual) * 7) / 365;

export function councilTaxReduction(i: CouncilTaxReductionInput): CouncilTaxReductionResult {
  const m = meansTest(i);
  const national = i.age === "pension" || i.nation !== "england";
  const maxShare = national ? 1 : Math.min(1, Math.max(0, i.maxShare));
  const taper = national ? CTR_2026.taper : Math.min(1, Math.max(0, i.taper));
  const weeklyBill = weeklyFromAnnual(i.annualBill);
  const nonDepDeduction = i.noNonDepDeductions ? 0 : i.nonDependants.reduce<number>((a, b) => a + ctrNonDep(b), 0);
  const maximum = Math.max(0, weeklyBill * maxShare - nonDepDeduction);
  const taperCut = m.excess * taper;
  const weekly = m.overCapital ? 0 : Math.max(0, maximum - taperCut);
  const annual = (weekly * 365) / 7;
  return { ...m, weeklyBill, maxShare, taper, nonDepDeduction, maximum, taperCut, weekly, annual, leftToPay: Math.max(0, i.annualBill - annual), national };
}
