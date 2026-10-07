/**
 * Benefits eligibility checker, 2026/27: one set of household answers run
 * through the site's benefit engines, giving a list of what you are likely to
 * get, what is worth checking and what does not fit.
 *
 * It is a first look, not a decision: means-tested amounts come from the
 * Universal Credit and Pension Credit engines; disability and carer's benefits
 * depend on assessments, so they are shown as "worth checking" with their
 * weekly rates.
 */

import { CHILD_BENEFIT_2026_27 } from "./child-benefit";
import { CA_2026 } from "./carers";
import { AA_2026, pensionCredit2026, PC_DEFAULT_INPUT } from "./later-life";
import { PIP_2026 } from "./pip-assessment";
import { UC_DEFAULT_INPUT, universalCredit2026, type Health } from "./uc-engine";
import { HEALTHY_START } from "../life/health";

export const OTHER_HELP_2026 = {
  sureStart: 500,
  warmHome: 150,
  winterFuel: { under80: 200, over80: 300, incomeLimit: 35_000 },
} as const;

export type Tenure = "private" | "social" | "own" | "none";
export type Disability = "none" | "daily" | "work" | "both";

export type EligibilityInput = {
  /** You (and your partner) are over State Pension age. */
  pensionAge: boolean;
  over80: boolean;
  couple: boolean;
  over25: boolean;
  children: number;
  /** Age of the youngest child in years (0 for a baby). */
  youngest: number;
  pregnant: boolean;
  tenure: Tenure;
  /** Rent a month, including service charges. */
  rent: number;
  /** Household take-home pay a month. */
  earnings: number;
  /** Pensions and other income a month (State Pension included for pensioners). */
  otherIncome: number;
  savings: number;
  disability: Disability;
  /** Caring 35 hours a week or more for someone who gets a disability benefit. */
  carer: boolean;
  /** Worked as an employee in the last 2 to 3 years (for New Style JSA and ESA). */
  workedRecently: boolean;
  /** Paying for registered childcare. */
  childcare: number;
  /** Highest earner's yearly income before tax (for the Child Benefit charge). */
  highestIncome: number;
};

export type Status = "likely" | "check" | "unlikely";

export type Help = {
  key: string;
  name: string;
  href: string | null;
  status: Status;
  /** Estimated value a month, if one can be given. */
  monthly: number | null;
  /** One-off or yearly amount instead of monthly. */
  oneOff?: number;
  why: string;
};

export type EligibilityResult = {
  items: Help[];
  /** Total of the "likely" monthly amounts. */
  likelyMonthly: number;
  /** Total of the likely one-off and yearly payments. */
  likelyOneOff: number;
  ucAward: number;
  pcWeekly: number;
};

const wk2m = (w: number) => (w * 52) / 12;

export function checkEligibility(i: EligibilityInput): EligibilityResult {
  const items: Help[] = [];
  const kids = Math.max(0, Math.floor(i.children));
  const hasKids = kids > 0;
  const renting = i.tenure === "private" || i.tenure === "social";

  // ── Universal Credit or Pension Credit
  let ucAward = 0;
  let pcWeekly = 0;
  if (!i.pensionAge) {
    const health: Health = i.disability === "work" || i.disability === "both" ? "lcwra-new" : "none";
    const uc = universalCredit2026({
      ...UC_DEFAULT_INPUT,
      couple: i.couple,
      over25: i.over25,
      children: kids,
      health,
      carer: i.carer,
      tenure: i.tenure === "own" ? "mortgage" : i.tenure,
      rent: renting ? i.rent : 0,
      // Private rent is assumed to be within the Local Housing Allowance.
      lhaMonthly: i.rent,
      childcare: i.childcare,
      earnings: i.earnings,
      otherIncome: i.otherIncome,
      capital: i.savings,
    });
    ucAward = uc.award;
    items.push({
      key: "uc",
      name: "Universal Credit",
      href: "/uk/benefits/universal-credit",
      status: uc.capitalTooHigh ? "unlikely" : ucAward >= 1 ? "likely" : "unlikely",
      monthly: ucAward >= 1 ? ucAward : null,
      why: uc.capitalTooHigh
        ? "Savings over £16,000 rule it out."
        : ucAward >= 1
          ? `Estimated from your household, ${renting ? "rent, " : ""}income and savings.`
          : "Your income is above the level where Universal Credit stops.",
    });
  } else {
    const pc = pensionCredit2026({
      ...PC_DEFAULT_INPUT,
      couple: i.couple,
      statePension: (Math.max(0, i.otherIncome) * 12) / 52,
      earnings: (Math.max(0, i.earnings) * 12) / 52,
      savings: i.savings,
      carers: i.carer ? 1 : 0,
      children: kids,
    });
    pcWeekly = pc.weekly;
    items.push({
      key: "pc",
      name: "Pension Credit",
      href: "/uk/benefits/pension-credit",
      status: pcWeekly >= 0.01 ? "likely" : "unlikely",
      monthly: pcWeekly >= 0.01 ? wk2m(pcWeekly) : null,
      why: pcWeekly >= 0.01 ? "Your income is below the minimum guarantee." : "Your income is above the minimum guarantee.",
    });
  }
  const meansTested = ucAward >= 1 || pcWeekly >= 0.01;

  // ── Help with rent
  if (i.pensionAge && renting) {
    items.push({
      key: "hb",
      name: "Housing Benefit",
      href: "/uk/benefits/housing-benefit",
      status: pcWeekly > 0 ? "likely" : "check",
      monthly: pcWeekly > 0 ? i.rent : null,
      why: pcWeekly > 0 ? "Guarantee Credit gives maximum Housing Benefit, up to the rent limit for your area." : "Pensioners who rent claim Housing Benefit from the council. It depends on income and savings.",
    });
  }

  // ── Council Tax Reduction
  items.push({
    key: "ctr",
    name: "Council Tax Reduction",
    href: "/uk/benefits/council-tax-reduction",
    status: meansTested ? "likely" : i.savings > 16_000 && !i.pensionAge ? "unlikely" : "check",
    monthly: null,
    why: meansTested ? "People on Universal Credit or Pension Credit usually get a large reduction." : "Each council sets its own scheme. Worth checking on a low income.",
  });

  // ── Children
  if (hasKids) {
    const cbWeekly = CHILD_BENEFIT_2026_27.firstChildWeekly + (kids - 1) * CHILD_BENEFIT_2026_27.additionalChildWeekly;
    const charge = i.highestIncome > CHILD_BENEFIT_2026_27.hicbcStart;
    items.push({
      key: "cb",
      name: "Child Benefit",
      href: "/uk/benefits/child-benefit",
      status: "likely",
      monthly: wk2m(cbWeekly),
      why: charge ? "Paid for every child. Some or all is taken back through tax as the highest earner is over £60,000." : "Paid for every child under 16, or under 20 in approved education.",
    });
  }
  if ((i.pregnant || (hasKids && i.youngest < 4)) && ucAward >= 1 && i.earnings <= HEALTHY_START.ucEarningsLimit) {
    const weekly = (i.pregnant ? HEALTHY_START.pregnancy : 0) + (hasKids && i.youngest < 1 ? HEALTHY_START.under1 : hasKids && i.youngest < 4 ? HEALTHY_START.age1to4 : 0);
    items.push({ key: "hs", name: "Healthy Start", href: "/uk/life/healthy-start", status: "likely", monthly: wk2m(weekly), why: "Universal Credit with family take-home pay of £408 a month or less." });
  }
  if (i.pregnant || (hasKids && i.youngest < 1)) {
    const first = !hasKids || (kids === 1 && i.youngest < 1 && !i.pregnant);
    items.push({
      key: "ssmg",
      name: "Sure Start Maternity Grant",
      href: "/uk/benefits/sure-start-maternity-grant",
      status: meansTested && first ? "likely" : meansTested ? "check" : "unlikely",
      monthly: null,
      oneOff: meansTested && first ? OTHER_HELP_2026.sureStart : undefined,
      why: meansTested ? (first ? "A one-off £500 for a first baby on a qualifying benefit." : "Usually only for a first child, unless you are expecting twins or more.") : "Needs a qualifying benefit such as Universal Credit.",
    });
  }
  if (hasKids && i.youngest < 5) {
    items.push({
      key: "hours",
      name: "Funded childcare hours",
      href: "/uk/benefits/free-childcare-hours",
      status: i.youngest >= 3 ? "likely" : "check",
      monthly: null,
      why: i.youngest >= 3 ? "Every 3 and 4-year-old in England gets 15 hours; working parents get 30." : "From 9 months in England if you work, or from 2 on some benefits.",
    });
  }
  if (hasKids && i.youngest < 12 && i.earnings > 0 && !i.pensionAge) {
    items.push({
      key: "tfc",
      name: "Tax-Free Childcare",
      href: "/uk/benefits/tax-free-childcare",
      status: ucAward >= 1 ? "check" : i.highestIncome > 100_000 ? "unlikely" : "check",
      monthly: null,
      why: ucAward >= 1 ? "You cannot have it alongside Universal Credit childcare costs: compare the two." : i.highestIncome > 100_000 ? "Not available if either parent earns over £100,000." : "Up to £2,000 a child a year if every parent works.",
    });
  }

  // ── Disability and caring
  if (i.disability === "daily" || i.disability === "both") {
    if (i.pensionAge) {
      items.push({ key: "aa", name: "Attendance Allowance", href: "/uk/benefits/attendance-allowance", status: "check", monthly: null, why: `Not means-tested. ${gbpWeek(AA_2026.lower)} or ${gbpWeek(AA_2026.higher)} a week if you need help with personal care.` });
    } else {
      items.push({ key: "pip", name: "Personal Independence Payment", href: "/uk/benefits/pip-points", status: "check", monthly: null, why: `Not means-tested. From ${gbpWeek(PIP_2026.mobility.standard)} to ${gbpWeek(PIP_2026.daily.enhanced + PIP_2026.mobility.enhanced)} a week, decided by an assessment.` });
    }
  }
  if (!i.pensionAge && (i.disability === "work" || i.disability === "both") && i.workedRecently) {
    items.push({ key: "esa", name: "New Style ESA", href: "/uk/benefits/new-style-esa", status: "check", monthly: null, why: "Paid on your National Insurance record if illness stops you working. Not affected by savings." });
  }
  if (!i.pensionAge && i.disability === "none" && i.workedRecently && i.earnings < 1_000) {
    items.push({ key: "jsa", name: "New Style JSA", href: "/uk/benefits/new-style-jsa", status: "check", monthly: null, why: "Up to 26 weeks on your National Insurance record if you are out of work. Not affected by savings." });
  }
  if (i.carer) {
    items.push({ key: "ca", name: "Carer's Allowance", href: "/uk/benefits/carers-earnings", status: "check", monthly: null, why: `${gbpWeek(CA_2026.weekly)} a week if your own earnings are £${CA_2026.earningsLimit} a week or less after allowable expenses.` });
  }

  // ── Bills
  items.push({
    key: "whd",
    name: "Warm Home Discount",
    href: null,
    status: meansTested ? "likely" : "unlikely",
    monthly: null,
    oneOff: meansTested ? OTHER_HELP_2026.warmHome : undefined,
    why: meansTested ? "£150 off your electricity bill each winter for households on means-tested benefits." : "For households on means-tested benefits.",
  });
  if (i.pensionAge) {
    const amount = i.over80 ? OTHER_HELP_2026.winterFuel.over80 : OTHER_HELP_2026.winterFuel.under80;
    items.push({ key: "wfp", name: "Winter Fuel Payment", href: null, status: "likely", monthly: null, oneOff: amount, why: "Paid automatically at State Pension age. Taken back through tax if your own income is over £35,000." });
  }

  const likely = items.filter((x) => x.status === "likely");
  return {
    items,
    likelyMonthly: likely.reduce((a, x) => a + (x.monthly ?? 0), 0),
    likelyOneOff: likely.reduce((a, x) => a + (x.oneOff ?? 0), 0),
    ucAward,
    pcWeekly,
  };
}

const gbpWeek = (n: number) => `£${n.toFixed(2)}`;
