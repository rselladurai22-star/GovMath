/**
 * Universal Credit engine, 2026/27 (monthly).
 *
 * Source: DWP "Benefit and pension rates 2026/2027" (rates from April 2026).
 * The two-child limit was removed from 6 April 2026, so every child gets the
 * child element. New claims from April 2026 get the lower health element.
 *
 *   award = standard allowance + child, disabled child, health, carer,
 *           childcare and housing elements
 *         − 55% of net earnings above the work allowance
 *         − other income (£1 for £1)
 *         − £4.35 for each £250 (or part) of capital between £6,000 and £16,000
 *   then the benefit cap, unless the household is exempt.
 */

import { CHILD_BENEFIT_2026_27 } from "./child-benefit";

export const UC_2026 = {
  standard: { singleUnder25: 338.58, single25: 424.9, coupleUnder25: 528.34, couple25: 666.97 },
  child: { firstPre2017: 351.88, each: 303.94 },
  disabledChild: { lower: 164.79, higher: 514.71 },
  /** Limited capability for work (claims before April 2017 only). */
  lcw: 158.76,
  /** Health element for new claims from 6 April 2026. */
  lcwraNew: 217.26,
  /** Health element for claims before April 2026, severe conditions or terminal illness. */
  lcwraProtected: 429.8,
  carer: 209.34,
  workAllowance: { withHousing: 427, noHousing: 710 },
  taper: 0.55,
  nonDependant: 96.55,
  capital: { lower: 6000, upper: 16000, per250: 4.35 },
} as const;

export const UC_CHILDCARE = { share: 0.85, maxOne: 1071.09, maxTwoPlus: 1836.16 } as const;

export const BENEFIT_CAP = {
  /** Annual caps. */
  london: { single: 16967, family: 25323 },
  elsewhere: { single: 14753, family: 22020 },
  /** Household earnings that exempt you: 16 hours a week at the National Living Wage, monthly. */
  earningsExemption: 881,
} as const;

export type Health = "none" | "lcw" | "lcwra-new" | "lcwra-protected";
export type Tenure = "none" | "private" | "social" | "mortgage";
export type CapArea = "london" | "elsewhere";

export type UcInput = {
  couple: boolean;
  /** At least one adult is 25 or over. */
  over25: boolean;
  children: number;
  /** Eldest child born before 6 April 2017 (higher first-child rate). */
  firstBornPre2017: boolean;
  disabledLower: number;
  disabledHigher: number;
  health: Health;
  carer: boolean;
  tenure: Tenure;
  /** Monthly rent including eligible service charges. */
  rent: number;
  /** Private renters: monthly Local Housing Allowance for your bedroom entitlement. */
  lhaMonthly: number;
  /** Social renters: spare bedrooms (0, 1, or 2 or more). */
  spareBedrooms: number;
  /** Adults living with you who are not your partner, such as grown-up children. */
  nonDependants: number;
  /** Monthly childcare costs paid to a registered provider. */
  childcare: number;
  /** Household take-home pay a month (after tax, NI and pension). */
  earnings: number;
  /** Other monthly income counted in full, such as a pension or New Style JSA. */
  otherIncome: number;
  capital: number;
  /** Benefit cap */
  capArea: CapArea;
  /** Someone gets PIP, DLA, Attendance Allowance, Carer's Allowance or a war pension: cap does not apply. */
  capExemptBenefit: boolean;
  /** Other benefits counted in the cap each month, apart from Child Benefit. */
  otherCappedBenefits: number;
  /** Child Benefit received: counts towards the cap. */
  includeChildBenefit: boolean;
};

export type UcElement = { key: string; label: string; amount: number };

export type UcResult = {
  elements: UcElement[];
  maximum: number;
  housing: number;
  /** Rent not covered by the housing element. */
  housingShortfall: number;
  childcareElement: number;
  workAllowance: number;
  earningsDeduction: number;
  otherIncomeDeduction: number;
  capitalDeduction: number;
  capitalTooHigh: boolean;
  /** Award before the benefit cap. */
  beforeCap: number;
  capApplies: boolean;
  capExempt: boolean;
  capExemptReason: string | null;
  capMonthly: number;
  capReduction: number;
  award: number;
  /** Earnings at which UC stops. */
  breakEvenEarnings: number;
};

function standardAllowance(i: UcInput): number {
  const s = UC_2026.standard;
  if (i.couple) return i.over25 ? s.couple25 : s.coupleUnder25;
  return i.over25 ? s.single25 : s.singleUnder25;
}

function childrenElement(children: number, firstBornPre2017: boolean): number {
  const n = Math.max(0, Math.floor(children));
  if (n === 0) return 0;
  return (firstBornPre2017 ? UC_2026.child.firstPre2017 : UC_2026.child.each) + (n - 1) * UC_2026.child.each;
}

export function capitalTariff(capital: number): { deduction: number; tooHigh: boolean } {
  const c = Math.max(0, capital);
  if (c > UC_2026.capital.upper) return { deduction: 0, tooHigh: true };
  if (c <= UC_2026.capital.lower) return { deduction: 0, tooHigh: false };
  return { deduction: Math.ceil((c - UC_2026.capital.lower) / 250) * UC_2026.capital.per250, tooHigh: false };
}

export function housingElement(i: Pick<UcInput, "tenure" | "rent" | "lhaMonthly" | "spareBedrooms" | "nonDependants">) {
  const rent = Math.max(0, i.rent);
  if (i.tenure === "none" || i.tenure === "mortgage" || rent === 0) return { eligibleRent: 0, reduction: 0, nonDep: 0, housing: 0, shortfall: rent };
  let eligibleRent = rent;
  let reduction = 0;
  if (i.tenure === "private") eligibleRent = Math.min(rent, Math.max(0, i.lhaMonthly));
  if (i.tenure === "social") {
    const spare = Math.max(0, Math.floor(i.spareBedrooms));
    reduction = rent * (spare >= 2 ? 0.25 : spare === 1 ? 0.14 : 0);
  }
  const nonDep = Math.max(0, Math.floor(i.nonDependants)) * UC_2026.nonDependant;
  const housing = Math.max(0, eligibleRent - reduction - nonDep);
  return { eligibleRent, reduction, nonDep, housing, shortfall: rent - housing };
}

export function universalCredit2026(i: UcInput): UcResult {
  const elements: UcElement[] = [];
  const add = (key: string, label: string, amount: number) => {
    if (amount > 0) elements.push({ key, label, amount });
  };
  add("standard", "Standard allowance", standardAllowance(i));
  add("child", `Child element (${i.children} ${i.children === 1 ? "child" : "children"})`, childrenElement(i.children, i.firstBornPre2017));
  add("disabled-lower", "Disabled child addition (lower)", Math.max(0, i.disabledLower) * UC_2026.disabledChild.lower);
  add("disabled-higher", "Disabled child addition (higher)", Math.max(0, i.disabledHigher) * UC_2026.disabledChild.higher);
  const health = i.health === "lcw" ? UC_2026.lcw : i.health === "lcwra-new" ? UC_2026.lcwraNew : i.health === "lcwra-protected" ? UC_2026.lcwraProtected : 0;
  add("health", i.health === "lcw" ? "Limited capability for work" : "Health element (LCWRA)", health);
  add("carer", "Carer element", i.carer ? UC_2026.carer : 0);
  const kidsInCare = i.children > 0 && i.childcare > 0;
  const childcareCap = i.children >= 2 ? UC_CHILDCARE.maxTwoPlus : UC_CHILDCARE.maxOne;
  // Childcare costs are only met when every adult in the household is in paid work.
  const childcareElement = kidsInCare && i.earnings > 0 ? Math.min(Math.max(0, i.childcare) * UC_CHILDCARE.share, childcareCap) : 0;
  add("childcare", "Childcare costs (85%)", childcareElement);
  const h = housingElement(i);
  add("housing", "Housing element", h.housing);
  const maximum = elements.reduce((a, e) => a + e.amount, 0);

  const hasWorkAllowance = i.children > 0 || i.health !== "none";
  const workAllowance = hasWorkAllowance ? (h.housing > 0 ? UC_2026.workAllowance.withHousing : UC_2026.workAllowance.noHousing) : 0;
  const earnings = Math.max(0, i.earnings);
  const earningsDeduction = Math.max(0, earnings - workAllowance) * UC_2026.taper;
  const otherIncomeDeduction = Math.max(0, i.otherIncome);
  const cap = capitalTariff(i.capital);
  const beforeCap = cap.tooHigh ? 0 : Math.max(0, maximum - earningsDeduction - otherIncomeDeduction - cap.deduction);

  // Benefit cap
  const family = i.couple || i.children > 0;
  const capAnnual = BENEFIT_CAP[i.capArea][family ? "family" : "single"];
  const capMonthly = capAnnual / 12;
  let capExemptReason: string | null = null;
  if (earnings >= BENEFIT_CAP.earningsExemption) capExemptReason = "Household earnings of £881 a month or more";
  else if (i.health === "lcwra-new" || i.health === "lcwra-protected") capExemptReason = "Health element (LCWRA) in the award";
  else if (i.carer) capExemptReason = "Carer element in the award";
  else if (i.capExemptBenefit) capExemptReason = "Someone gets a disability or carer's benefit";
  const cb = i.includeChildBenefit && i.children > 0 ? ((CHILD_BENEFIT_2026_27.firstChildWeekly + (i.children - 1) * CHILD_BENEFIT_2026_27.additionalChildWeekly) * 52) / 12 : 0;
  // The cap does not reduce the childcare costs element.
  const counted = Math.max(0, beforeCap - childcareElement) + cb + Math.max(0, i.otherCappedBenefits);
  const excess = capExemptReason ? 0 : Math.max(0, counted - capMonthly);
  const capReduction = Math.min(excess, Math.max(0, beforeCap - childcareElement));
  const award = beforeCap - capReduction;

  // Earnings at which the tapered award reaches zero (ignoring the cap).
  const room = maximum - otherIncomeDeduction - cap.deduction;
  const breakEvenEarnings = room > 0 ? workAllowance + room / UC_2026.taper : 0;

  return {
    elements,
    maximum,
    housing: h.housing,
    housingShortfall: h.shortfall,
    childcareElement,
    workAllowance,
    earningsDeduction,
    otherIncomeDeduction,
    capitalDeduction: cap.deduction,
    capitalTooHigh: cap.tooHigh,
    beforeCap,
    capApplies: capReduction > 0,
    capExempt: capExemptReason !== null,
    capExemptReason,
    capMonthly,
    capReduction,
    award,
    breakEvenEarnings,
  };
}

/** A blank household for building inputs. */
export const UC_DEFAULT_INPUT: UcInput = {
  couple: false,
  over25: true,
  children: 0,
  firstBornPre2017: false,
  disabledLower: 0,
  disabledHigher: 0,
  health: "none",
  carer: false,
  tenure: "none",
  rent: 0,
  lhaMonthly: 0,
  spareBedrooms: 0,
  nonDependants: 0,
  childcare: 0,
  earnings: 0,
  otherIncome: 0,
  capital: 0,
  capArea: "elsewhere",
  capExemptBenefit: false,
  otherCappedBenefits: 0,
  includeChildBenefit: true,
};
