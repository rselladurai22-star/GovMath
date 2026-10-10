/**
 * US withholding, bonuses, quarterly estimated tax and state comparisons for
 * 2026, built on tax-2026.ts, taxes-extra.ts and state-tax-2026.ts.
 *
 * Sources:
 * - IRS Publication 15-T (2026), Worksheet 1A and the Annual Percentage
 *   Method tables: the Step 2 offset of $12,900 (married filing jointly) or
 *   $8,600 (everyone else); the standard tables are the 2026 brackets shifted
 *   by the standard deduction less that offset, and the Step 2 checkbox
 *   tables use half the brackets and half the standard deduction. Married
 *   filing separately uses the single table.
 * - IRS Form W-4 (2026): Step 3 ($2,200 a child under 17, $500 per other
 *   dependent, if total income is $200,000 or less, $400,000 joint) and the
 *   Step 4(b) Deductions Worksheet (tips up to $25,000 and overtime up to
 *   $12,500/$25,000 under $150,000/$300,000 of income; car loan interest up
 *   to $10,000 under $100,000/$200,000; $6,000 per person 65+ under
 *   $75,000/$150,000; adjustments; itemized deductions above the standard
 *   deduction, cut to 94% above the top bracket's start).
 * - IRS Publication 15 (2026), supplemental wages: 22% optional flat rate,
 *   37% mandatory on supplemental wages over $1 million in the year.
 * - California EDD, DE 231PS: 10.23% flat rate on bonuses and stock options.
 * - New York State NYS-50-T-NYS (1/26): 11.70% supplemental withholding rate.
 * - IRS quarterly interest rates: underpayment rate 7% (Q1 2026), 6% (Q2),
 *   7% (Q3) and 7% (Q4 2026); 2027 assumed to stay at 7%.
 */

import { federalReturn, ordinaryTax, US_2026, type FilingStatus, type ReturnInput, type ReturnResult } from "./tax-2026";
import { estimatedPayments, returnWithQbi, type Estimated } from "./taxes-extra";
import { CA_SDI, STATE_TAX, stateTax } from "./state-tax-2026";

/* ── Paycheck withholding (Publication 15-T, percentage method) ─────────── */

export const W4_2026 = {
  /** Worksheet 1A line 1g: taken off when the Step 2 box is not checked. */
  step2Offset: { mfj: 12_900, other: 8_600 },
  childCredit: 2_200,
  otherDependentCredit: 500,
  /** Step 3 applies only if total income is at or below this. */
  step3Limit: { mfj: 400_000, other: 200_000 },
  /** Deductions Worksheet income limits ("less than"). */
  tipsOvertimeLimit: { mfj: 300_000, other: 150_000 },
  carLoanLimit: { mfj: 200_000, other: 100_000 },
  carLoanMax: 10_000,
  seniorLimit: { mfj: 150_000, other: 75_000 },
  senior: 6_000,
  /** Deductions Worksheet line 9: itemized deductions are cut to 94% above this. */
  itemizedLimitStart: { single: 640_600, hoh: 640_600, mfj: 768_700, mfs: 384_350 } as Record<FilingStatus, number>,
  /** Employers withhold the 0.9% additional Medicare tax on wages over this, whatever the filing status. */
  additionalMedicareWithholding: 200_000,
};

const pickMfj = <T,>(pair: { mfj: T; other: T }, status: FilingStatus): T => (status === "mfj" ? pair.mfj : pair.other);

export type W4Entries = {
  /** Step 2(c): the two-jobs box. */
  step2: boolean;
  /** Step 3: credits, a year. */
  step3: number;
  /** Step 4(a): other income, a year. */
  step4a: number;
  /** Step 4(b): deductions, a year. */
  step4b: number;
  /** Step 4(c): extra withholding each paycheck. */
  step4c: number;
};

export const BLANK_W4: W4Entries = { step2: false, step3: 0, step4a: 0, step4b: 0, step4c: 0 };

/**
 * Federal income tax withheld from one paycheck under the 2026 percentage
 * method (Worksheet 1A, Form W-4 from 2020 or later). `taxableWages` is pay
 * for the period after pre-tax 401(k) and cafeteria plan deductions.
 */
export function withholdingPerPaycheck(taxableWages: number, periods: number, status: FilingStatus, w4: W4Entries = BLANK_W4): number {
  const p = Math.max(1, periods);
  const annual = Math.max(0, taxableWages) * p;
  const table: FilingStatus = status === "mfs" ? "single" : status;
  const adjusted = Math.max(0, annual + Math.max(0, w4.step4a) - Math.max(0, w4.step4b) - (w4.step2 ? 0 : pickMfj(W4_2026.step2Offset, status)));
  const std = US_2026.standardDeduction[table];
  const tentative = w4.step2
    ? ordinaryTax(2 * Math.max(0, adjusted - std / 2), table).tax / 2
    : ordinaryTax(Math.max(0, adjusted - (std - pickMfj(W4_2026.step2Offset, status))), table).tax;
  return Math.max(0, tentative - Math.max(0, w4.step3)) / p + Math.max(0, w4.step4c);
}

export type W4Input = {
  status: FilingStatus;
  /** Paychecks a year at this job. */
  periods: number;
  /** Gross pay each paycheck. */
  payPerPeriod: number;
  /** Pre-tax 401(k), HSA and cafeteria plan deductions each paycheck. */
  preTaxPerPeriod: number;
  /** Paychecks still to come in 2026 (0 to periods). */
  paychecksLeft: number;
  /** Federal income tax withheld so far this year at this job. */
  ytdWithheld: number;
  /** Federal income tax withheld from each paycheck now. */
  currentPerPeriod: number;
  /** Gross pay so far this year at this job; 0 means "the same every paycheck". */
  ytdPay: number;
  /** A second job or a working spouse (joint filers): wages for the year and federal tax they will have withheld. */
  otherJobWages: number;
  otherJobWithholding: number;
  /** Interest, dividends and other income with no withholding. */
  otherIncome: number;
  /** Student loan interest, deductible IRA contributions and other adjustments. */
  adjustments: number;
  itemized: number;
  children: number;
  otherDependents: number;
  over65: number;
  tips: number;
  overtimePremium: number;
  /** The refund you would like (0 for break-even). */
  targetRefund: number;
};

export type W4Plan = {
  ret: ReturnResult;
  /** This job's gross wages for the year. */
  jobWages: number;
  /** What the federal income tax withholding should total (after the employer's additional Medicare withholding). */
  target: number;
  /** Withholding for the year if nothing changes. */
  projected: number;
  /** Refund (positive) or balance due (negative) if nothing changes. */
  refundIfUnchanged: number;
  /** Recommended W-4 for this job (the highest-paying job). */
  w4: W4Entries;
  /** Withholding each paycheck with the recommended W-4. */
  newPerPeriod: number;
  /** Refund (positive) or balance due with the recommended W-4. */
  refundWithNew: number;
  /** Withholding each paycheck with a blank W-4 and these entries left out. */
  blankPerPeriod: number;
  /** Per paycheck change from today. */
  changePerPeriod: number;
  /** True when nothing more can be withheld because the year's pay is over. */
  noPaychecksLeft: boolean;
  /** True when even a large Step 4(b) can't stop a refund bigger than the target (too much already withheld). */
  overWithheldAlready: boolean;
};

/** The Step 4(b) Deductions Worksheet (2026 Form W-4), line 15. */
export function deductionsWorksheet(i: { status: FilingStatus; totalIncome: number; tips: number; overtimePremium: number; carLoanInterest?: number; over65: number; adjustments: number; itemized: number }): number {
  const s = i.status;
  const income = Math.max(0, i.totalIncome);
  const under = (limit: { mfj: number; other: number }) => income < pickMfj(limit, s);
  const tips = under(W4_2026.tipsOvertimeLimit) && s !== "mfs" ? Math.min(Math.max(0, i.tips), US_2026.tips.max) : 0;
  const ot = under(W4_2026.tipsOvertimeLimit) && s !== "mfs" ? Math.min(Math.max(0, i.overtimePremium), US_2026.overtime.max[s]) : 0;
  const car = under(W4_2026.carLoanLimit) ? Math.min(Math.max(0, i.carLoanInterest ?? 0), W4_2026.carLoanMax) : 0;
  const line4 = under(W4_2026.seniorLimit) ? W4_2026.senior * Math.max(0, Math.min(i.over65, s === "mfj" ? 2 : 1)) : 0;
  const line7 = Math.max(0, i.itemized);
  const line8b = Math.max(0, income - line4);
  const line10 = line8b > W4_2026.itemizedLimitStart[s] ? line7 * 0.94 : line7;
  const std = US_2026.standardDeduction[s];
  const line14 = line10 > std ? line10 - std : 0;
  return tips + ot + car + line4 + Math.max(0, i.adjustments) + line14;
}

/** Checks 2026 withholding and recommends Form W-4 entries for the rest of the year. */
export function w4Plan(i: W4Input): W4Plan {
  const periods = Math.max(1, Math.round(i.periods));
  const left = Math.max(0, Math.min(periods, Math.round(i.paychecksLeft)));
  const pay = Math.max(0, i.payPerPeriod);
  const pre = Math.min(pay, Math.max(0, i.preTaxPerPeriod));
  const ytdPay = i.ytdPay > 0 ? i.ytdPay : pay * (periods - left);
  const ytdPre = i.ytdPay > 0 ? (pay > 0 ? (ytdPay * pre) / pay : 0) : pre * (periods - left);
  const jobWages = ytdPay + pay * left;
  const preTax = ytdPre + pre * left;
  const otherWages = Math.max(0, i.otherJobWages);
  const otherWithheld = Math.max(0, i.otherJobWithholding);
  const employerAddl =
    (Math.max(0, jobWages - W4_2026.additionalMedicareWithholding) + Math.max(0, otherWages - W4_2026.additionalMedicareWithholding)) * US_2026.medicare.additionalRate;
  const base: ReturnInput = {
    status: i.status,
    wages: jobWages + otherWages,
    otherIncome: Math.max(0, i.otherIncome),
    longTermGains: 0,
    selfEmployment: 0,
    preTax,
    adjustments: Math.max(0, i.adjustments),
    itemized: Math.max(0, i.itemized),
    over65: i.over65,
    blind: 0,
    children: i.children,
    otherDependents: i.otherDependents,
    overtimePremium: i.overtimePremium,
    tips: i.tips,
    withheld: 0,
  };
  const ret = federalReturn(base);
  const target = Math.max(0, ret.totalTax - employerAddl + Math.max(0, i.targetRefund));
  const ytd = Math.max(0, i.ytdWithheld);
  const projected = ytd + Math.max(0, i.currentPerPeriod) * left + otherWithheld;
  const refundOf = (withheld: number) => withheld + employerAddl - ret.totalTax;

  const totalIncome = jobWages + otherWages + Math.max(0, i.otherIncome);
  const step3 = totalIncome <= pickMfj(W4_2026.step3Limit, i.status) ? Math.max(0, Math.round(i.children)) * W4_2026.childCredit + Math.max(0, Math.round(i.otherDependents)) * W4_2026.otherDependentCredit : 0;
  const step4a = Math.max(0, i.otherIncome);
  const step4b = deductionsWorksheet({ status: i.status, totalIncome, tips: i.tips, overtimePremium: i.overtimePremium, over65: i.over65, adjustments: i.adjustments, itemized: i.itemized });
  const taxablePer = pay - pre;
  const blankPerPeriod = withholdingPerPaycheck(taxablePer, periods, i.status);
  const entries: W4Entries = { step2: false, step3, step4a, step4b, step4c: 0 };
  const basicPer = withholdingPerPaycheck(taxablePer, periods, i.status, entries);
  const projectedWith = (per: number) => ytd + per * left + otherWithheld;

  let w4 = entries;
  let overWithheldAlready = false;
  if (left > 0) {
    const gap = target - projectedWith(basicPer);
    if (Math.round(gap / left) >= 1) {
      // Whole dollars a paycheck, as payroll systems take them.
      w4 = { ...entries, step4c: Math.round(gap / left) };
    } else if (gap < -left) {
      // Too much withheld: raise Step 4(b) until the withholding left just covers the target.
      const at = (extra: number) => projectedWith(withholdingPerPaycheck(taxablePer, periods, i.status, { ...entries, step4b: step4b + extra }));
      if (at(10_000_000) > target) {
        // Even withholding nothing more leaves more than the target: the refund is already locked in.
        overWithheldAlready = true;
      } else {
        let lo = 0;
        let hi = 10_000_000;
        for (let k = 0; k < 60; k++) {
          const mid = (lo + hi) / 2;
          if (at(mid) > target) lo = mid;
          else hi = mid;
        }
        // Round down to $100 so withholding stays just above the target.
        w4 = { ...entries, step4b: step4b + Math.floor(lo / 100) * 100 };
      }
    }
  }
  const newPerPeriod = left > 0 ? withholdingPerPaycheck(taxablePer, periods, i.status, w4) : 0;
  return {
    ret,
    jobWages,
    target,
    projected,
    refundIfUnchanged: refundOf(projected),
    w4,
    newPerPeriod,
    refundWithNew: left > 0 ? refundOf(projectedWith(newPerPeriod)) : refundOf(projected),
    blankPerPeriod,
    changePerPeriod: newPerPeriod - Math.max(0, i.currentPerPeriod),
    noPaychecksLeft: left === 0,
    overWithheldAlready,
  };
}

/* ── Bonuses (supplemental wages) ─────────────────────────────────────────── */

export const SUPPLEMENTAL_2026 = { rate: 0.22, overMillionRate: 0.37, million: 1_000_000 };

/** States with a published flat withholding rate for bonuses that we have checked against the state's own 2026 guidance. */
export const STATE_BONUS_RATE: Record<string, { rate: number; source: string }> = {
  CA: { rate: 0.1023, source: "California EDD (DE 231PS): 10.23% on bonuses and stock options" },
  NY: { rate: 0.117, source: "New York NYS-50-T-NYS (2026): 11.70% supplemental rate" },
};

/** Federal withholding on supplemental wages at the flat rate: 22%, and 37% on the part of the year's supplemental wages over $1 million. */
export function supplementalFlat(amount: number, earlierSupplemental = 0): number {
  const a = Math.max(0, amount);
  const before = Math.max(0, earlierSupplemental);
  const room = Math.max(0, SUPPLEMENTAL_2026.million - before);
  const low = Math.min(a, room);
  return low * SUPPLEMENTAL_2026.rate + (a - low) * SUPPLEMENTAL_2026.overMillionRate;
}

export type BonusInput = {
  bonus: number;
  /** Regular salary for the year (gross). */
  salary: number;
  /** Paychecks a year, for the aggregate method. */
  periods: number;
  status: FilingStatus;
  state: string;
  children: number;
  otherDependents: number;
  /** Traditional 401(k) taken from the bonus, as a share (0.06 = 6%). */
  k401Pct: number;
  /** Traditional 401(k) from salary for the year, in dollars. */
  salaryK401: number;
  /** Supplemental wages already paid this year (earlier bonuses, commissions). */
  earlierSupplemental: number;
  method: "flat" | "aggregate";
  /** Local income tax rate on the bonus (city or county). */
  localRate: number;
};

export type BonusResult = {
  k401: number;
  taxableBonus: number;
  flatFederal: number;
  aggregateFederal: number;
  /** Federal income tax withheld with the chosen method. */
  federalWithheld: number;
  socialSecurity: number;
  medicare: number;
  stateWithheld: number;
  /** Where the state withholding figure comes from. */
  stateBasis: "published" | "flat" | "extra" | "none";
  local: number;
  takeHome: number;
  /** The extra federal income tax the bonus really adds to your 2026 bill. */
  trueFederal: number;
  /** The extra state income tax (and California SDI) the bonus really adds. */
  trueState: number;
  /** Federal withheld less the real extra tax: positive comes back as a refund, negative is owed. */
  federalDifference: number;
  /** Real marginal rate of federal income tax on the bonus. */
  federalRate: number;
};

function returnFor(status: FilingStatus, wages: number, preTax: number, children: number, others: number): ReturnResult {
  return federalReturn({
    status,
    wages,
    otherIncome: 0,
    longTermGains: 0,
    selfEmployment: 0,
    preTax,
    adjustments: 0,
    itemized: 0,
    over65: 0,
    blind: 0,
    children,
    otherDependents: others,
    overtimePremium: 0,
    tips: 0,
    withheld: 0,
  });
}

/** Take-home from a 2026 bonus, with federal withholding by the flat or aggregate method and the tax it really adds. */
export function bonusTax(i: BonusInput): BonusResult {
  const s = i.status;
  const bonus = Math.max(0, i.bonus);
  const salary = Math.max(0, i.salary);
  const salaryK401 = Math.min(Math.max(0, i.salaryK401), US_2026.limits.k401, salary);
  const k401 = Math.min(bonus * Math.max(0, i.k401Pct), Math.max(0, US_2026.limits.k401 - salaryK401));
  const taxableBonus = bonus - k401;
  const periods = Math.max(1, Math.round(i.periods));

  const flatFederal = supplementalFlat(taxableBonus, i.earlierSupplemental);
  const w4: W4Entries = {
    ...BLANK_W4,
    step3: Math.max(0, Math.round(i.children)) * W4_2026.childCredit + Math.max(0, Math.round(i.otherDependents)) * W4_2026.otherDependentCredit,
  };
  const regular = (salary - salaryK401) / periods;
  const aggregateFederal = Math.max(0, (withholdingPerPaycheck(regular + taxableBonus, periods, s, w4) - withholdingPerPaycheck(regular, periods, s, w4)));
  // Over $1 million of supplemental wages, the 37% rate is mandatory whatever the method.
  const overMillion = Math.max(0, taxableBonus - Math.max(0, SUPPLEMENTAL_2026.million - Math.max(0, i.earlierSupplemental)));
  const federalWithheld = i.method === "flat" || overMillion > 0 ? flatFederal : aggregateFederal;

  const ssRoom = Math.max(0, US_2026.socialSecurity.wageBase - salary);
  const socialSecurity = Math.min(bonus, ssRoom) * US_2026.socialSecurity.rate;
  const overAddl = Math.max(0, salary + bonus - W4_2026.additionalMedicareWithholding) - Math.max(0, salary - W4_2026.additionalMedicareWithholding);
  const medicare = bonus * US_2026.medicare.rate + overAddl * US_2026.medicare.additionalRate;

  const children = Math.max(0, Math.round(i.children));
  const others = Math.max(0, Math.round(i.otherDependents));
  const without = returnFor(s, salary, salaryK401, children, others);
  const withB = returnFor(s, salary + bonus, salaryK401 + k401, children, others);
  const trueFederal = withB.totalTax - withB.additionalMedicare - (without.totalTax - without.additionalMedicare);

  const deps = children + others;
  const stWithout = stateTax({ code: i.state, wages: salary - salaryK401, k401: salaryK401, status: s, dependents: deps, federalTax: Math.max(0, without.incomeTax) });
  const stWith = stateTax({ code: i.state, wages: salary + bonus - salaryK401 - k401, k401: salaryK401 + k401, status: s, dependents: deps, federalTax: Math.max(0, withB.incomeTax) });
  const sdi = i.state === "CA" ? bonus * CA_SDI : 0;
  const trueState = stWith.tax - stWithout.tax + sdi;
  const published = STATE_BONUS_RATE[i.state];
  const g = STATE_TAX[i.state];
  let stateBasis: BonusResult["stateBasis"] = "none";
  let stateWithheld = 0;
  if (published) {
    stateBasis = "published";
    stateWithheld = taxableBonus * published.rate + sdi;
  } else if (g && g.single.length === 1 && !g.joint) {
    stateBasis = "flat";
    stateWithheld = Math.max(0, taxableBonus * g.single[0][1]);
  } else if (g) {
    stateBasis = "extra";
    stateWithheld = Math.max(0, trueState);
  }
  const local = taxableBonus * Math.max(0, i.localRate);
  const takeHome = bonus - k401 - federalWithheld - socialSecurity - medicare - stateWithheld - local;
  return {
    k401,
    taxableBonus,
    flatFederal,
    aggregateFederal,
    federalWithheld,
    socialSecurity,
    medicare,
    stateWithheld,
    stateBasis,
    local,
    takeHome,
    trueFederal,
    trueState,
    federalDifference: federalWithheld - trueFederal,
    federalRate: bonus > 0 ? trueFederal / bonus : 0,
  };
}

/** The gross bonus that leaves `net` after withholding (a "grossed-up" bonus). */
export function grossUpBonus(net: number, i: Omit<BonusInput, "bonus">): number {
  const want = Math.max(0, net);
  if (want === 0) return 0;
  let lo = want;
  let hi = want * 4 + 1_000;
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2;
    if (bonusTax({ ...i, bonus: mid }).takeHome < want) lo = mid;
    else hi = mid;
  }
  return hi;
}

/* ── Quarterly estimated tax ─────────────────────────────────────────────── */

/** IRS underpayment interest rates by quarter (the estimated tax penalty rate). 2027 is assumed. */
export const UNDERPAYMENT_RATES: { from: string; rate: number }[] = [
  { from: "2026-01-01", rate: 0.07 },
  { from: "2026-04-01", rate: 0.06 },
  { from: "2026-07-01", rate: 0.07 },
  { from: "2026-10-01", rate: 0.07 },
  { from: "2027-01-01", rate: 0.07 },
];

/** The 2026 installment due dates and the April 15, 2027 filing deadline, as ISO dates. */
export const DUE_DATES_2026 = ["2026-04-15", "2026-06-15", "2026-09-15", "2027-01-15"];
export const FILING_DEADLINE_2027 = "2027-04-15";

const day = (iso: string) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86_400_000);

/** Simple interest at the IRS underpayment rate on `amount` from one date to another (each year counted as 365 days). */
export function underpaymentInterest(amount: number, fromIso: string, toIso: string): number {
  const a = Math.max(0, amount);
  const start = day(fromIso);
  const end = day(toIso);
  if (a <= 0 || end <= start) return 0;
  let total = 0;
  UNDERPAYMENT_RATES.forEach((r, k) => {
    const segStart = Math.max(start, day(r.from));
    const segEnd = Math.min(end, k + 1 < UNDERPAYMENT_RATES.length ? day(UNDERPAYMENT_RATES[k + 1].from) : Infinity);
    if (segEnd > segStart) total += (a * r.rate * (segEnd - segStart)) / 365;
  });
  return total;
}

/**
 * The estimated tax penalty (Form 2210, regular method, simplified): each
 * installment needs a quarter of the required annual payment; withholding
 * counts as paid in four equal parts on the due dates; payments are applied
 * to the oldest shortfall first; whatever is still short at April 15, 2027
 * accrues until then.
 */
export function estimatedPenalty(required: number, withheld: number, payments: { date: string; amount: number }[]): { penalty: number; shortfalls: number[] } {
  const need = Math.max(0, required) / 4;
  const w = Math.max(0, withheld) / 4;
  type Open = { date: string; amount: number };
  const open: Open[] = [];
  let credit = 0;
  let penalty = 0;
  const shortfalls: number[] = [];
  const events = [
    ...DUE_DATES_2026.map((d, k) => ({ date: d, kind: "due" as const, k })),
    ...payments.filter((p) => p.amount > 0).map((p) => ({ date: p.date, kind: "pay" as const, amount: p.amount })),
  ].sort((a, b) => day(a.date) - day(b.date) || (a.kind === "pay" ? -1 : 1));
  const pay = (amount: number, date: string) => {
    let left = amount;
    while (left > 0 && open.length) {
      const o = open[0];
      const used = Math.min(left, o.amount);
      penalty += underpaymentInterest(used, o.date, date);
      o.amount -= used;
      left -= used;
      if (o.amount <= 1e-9) open.shift();
    }
    credit += left;
  };
  for (const e of events) {
    if (e.kind === "pay") {
      pay(e.amount, e.date);
      continue;
    }
    pay(w, e.date);
    const covered = Math.min(credit, need);
    credit -= covered;
    const short = need - covered;
    shortfalls[e.k] = short;
    if (short > 0) open.push({ date: e.date, amount: short });
  }
  for (const o of open) penalty += underpaymentInterest(o.amount, o.date, FILING_DEADLINE_2027);
  return { penalty, shortfalls };
}

export type EstimatedPlanInput = ReturnInput & {
  /** Last year's total tax, or null if unknown or no return. */
  priorTax: number | null;
  priorAgi: number;
  /** Estimated payments already made for 2026, in order (one per installment). */
  paid: number[];
  /** Which installment is next (0 to 3); earlier ones are past. */
  next: number;
  useQbi: boolean;
};

export type EstimatedPlan = {
  ret: ReturnResult;
  est: Estimated;
  /** What still has to be paid in estimates to meet the safe harbor, after withholding and payments made. */
  stillNeeded: number;
  /** Each remaining installment (from `next` on) to meet the safe harbor. */
  perRemaining: number;
  /** Each remaining installment to cover the whole bill. */
  perRemainingFull: number;
  /** Penalty if you pay `perRemaining` on each remaining due date. */
  penaltyIfCaughtUp: number;
  /** Penalty if you pay nothing more until April 15, 2027. */
  penaltyIfNothing: number;
  /** Balance due at filing (positive) after withholding, payments made and the remaining safe-harbor payments. */
  dueAtFiling: number;
  /** A schedule: each installment's due date, payment and the cumulative paid. */
  schedule: { label: string; due: string; amount: number; past: boolean }[];
};

/** A 2026 quarterly estimated tax plan for any mix of income, with what is left to pay and a penalty estimate. */
export function estimatedPlan(i: EstimatedPlanInput): EstimatedPlan {
  const ret = returnWithQbi({ ...i, withheld: 0 }, i.useQbi);
  const withheld = Math.max(0, i.withheld);
  const est = estimatedPayments(ret.totalTax, withheld, i.status, i.priorTax, i.priorAgi);
  const next = Math.max(0, Math.min(3, Math.round(i.next)));
  const paid = [0, 1, 2, 3].map((k) => (k < next ? Math.max(0, i.paid[k] ?? 0) : 0));
  const paidTotal = paid.reduce((a, b) => a + b, 0);
  const remaining = 4 - next;
  const stillNeeded = Math.max(0, est.required - withheld - paidTotal);
  const perRemaining = stillNeeded / remaining;
  const perRemainingFull = Math.max(0, ret.totalTax - withheld - paidTotal) / remaining;
  const madeEvents = paid.map((amount, k) => ({ date: DUE_DATES_2026[k], amount }));
  const future = [0, 1, 2, 3].filter((k) => k >= next).map((k) => ({ date: DUE_DATES_2026[k], amount: perRemaining }));
  const owesNothing = est.underThreshold;
  const penaltyIfCaughtUp = owesNothing ? 0 : estimatedPenalty(est.required, withheld, [...madeEvents, ...future]).penalty;
  const penaltyIfNothing = owesNothing ? 0 : estimatedPenalty(est.required, withheld, madeEvents).penalty;
  const labels = ["Payment 1", "Payment 2", "Payment 3", "Payment 4"];
  const dueWords = ["April 15, 2026", "June 15, 2026", "September 15, 2026", "January 15, 2027"];
  return {
    ret,
    est,
    stillNeeded,
    perRemaining,
    perRemainingFull,
    penaltyIfCaughtUp,
    penaltyIfNothing,
    dueAtFiling: ret.totalTax - withheld - paidTotal - stillNeeded,
    schedule: [0, 1, 2, 3].map((k) => ({ label: labels[k], due: dueWords[k], amount: k < next ? paid[k] : perRemaining, past: k < next })),
  };
}

/* ── State income tax, every state side by side ──────────────────────────── */

export type StateRow = { code: string; tax: number; effective: number; marginal: number; kind: "none" | "flat" | "graduated" };

/**
 * State income tax on the same wages in every state and DC, cheapest first.
 * `marginal` is the tax on the next $1,000 of wages, so phase-outs show up.
 */
export function stateComparison(codes: string[], wages: number, status: FilingStatus, dependents: number, k401 = 0): StateRow[] {
  const w = Math.max(0, wages);
  const taxable = Math.max(0, w - Math.max(0, k401));
  return codes
    .map((code) => {
      const r = stateTax({ code, wages: taxable, k401: Math.max(0, k401), status, dependents });
      const up = stateTax({ code, wages: taxable + 1_000, k401: Math.max(0, k401), status, dependents });
      return { code, tax: r.tax, effective: w > 0 ? r.tax / w : 0, marginal: (up.tax - r.tax) / 1_000, kind: r.kind };
    })
    .sort((a, b) => a.tax - b.tax || a.code.localeCompare(b.code));
}
