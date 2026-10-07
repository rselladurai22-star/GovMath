/**
 * US pay: the paycheck, salary and hourly conversions, overtime, sales tax
 * and tips. Built on tax-2026.ts and states.ts.
 */

import { federalReturn, fica, ordinaryTax, overtimeDeduction, standardDeduction, US_2026, type FilingStatus } from "./tax-2026";
import { stateByCode, stateIncomeTax } from "./states";

export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";
export const PERIODS: Record<PayFrequency, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };
export const FREQUENCY_LABEL: Record<PayFrequency, string> = { weekly: "Weekly", biweekly: "Every two weeks", semimonthly: "Twice a month", monthly: "Monthly" };

export type PaycheckInput = {
  /** Gross pay a year. */
  salary: number;
  frequency: PayFrequency;
  status: FilingStatus;
  /** Traditional (pre-tax) 401(k) or 403(b), as a share of pay (0.06 = 6%). */
  k401Pct: number;
  /** Roth 401(k), as a share of pay: taken after tax. */
  rothPct: number;
  /** Health, dental and vision premiums, HSA and FSA through a cafeteria plan, a year: free of income tax and FICA. */
  section125: number;
  /** Children under 17 claimed on Form W-4. */
  children: number;
  otherDependents: number;
  state: string;
  /** For states that ask: the share of pay you expect to pay in state and local income tax. */
  stateRate: number;
  /** Local income tax (city or county), as a share of pay. */
  localRate: number;
  /** Extra federal withholding a paycheck (Form W-4 step 4(c)). */
  extraWithholding: number;
};

export type PayLine = { year: number; period: number };

export type Paycheck = {
  periods: number;
  gross: PayLine;
  k401: PayLine;
  roth: PayLine;
  section125: PayLine;
  federal: PayLine;
  socialSecurity: PayLine;
  medicare: PayLine;
  state: PayLine;
  local: PayLine;
  net: PayLine;
  /** Wages subject to federal income tax. */
  federalWages: number;
  taxableIncome: number;
  marginalFederal: number;
  /** Federal, FICA, state and local tax as a share of gross pay. */
  taxShare: number;
  k401Capped: boolean;
};

const line = (year: number, periods: number): PayLine => ({ year, period: year / periods });

/**
 * A paycheck estimate: federal income tax is the year's tax on this job's pay
 * (as Form W-4's withholding tables aim for), spread over the paychecks, plus
 * any extra withholding.
 */
export function paycheck(i: PaycheckInput): Paycheck {
  const periods = PERIODS[i.frequency];
  const gross = Math.max(0, i.salary);
  const k401Raw = gross * Math.max(0, i.k401Pct);
  const k401 = Math.min(k401Raw, US_2026.limits.k401);
  const roth = Math.min(gross * Math.max(0, i.rothPct), Math.max(0, US_2026.limits.k401 - k401));
  const s125 = Math.min(Math.max(0, i.section125), gross);
  const ficaWages = gross - s125;
  const federalWages = Math.max(0, gross - s125 - k401);
  const ret = federalReturn({
    status: i.status,
    wages: gross - s125,
    otherIncome: 0,
    longTermGains: 0,
    selfEmployment: 0,
    preTax: k401,
    adjustments: 0,
    itemized: 0,
    over65: 0,
    blind: 0,
    children: i.children,
    otherDependents: i.otherDependents,
    overtimePremium: 0,
    tips: 0,
    withheld: 0,
  });
  // Withholding covers the tax after credits; refundable credits come back on the return, not through payroll.
  const federal = Math.max(0, ret.incomeTax) + Math.max(0, i.extraWithholding) * periods;
  const f = fica(ficaWages, i.status);
  const state = stateIncomeTax(i.state, federalWages, i.stateRate);
  const local = federalWages * Math.max(0, i.localRate);
  const net = gross - k401 - roth - s125 - federal - f.socialSecurity - f.medicare - f.additionalMedicare - state - local;
  return {
    periods,
    gross: line(gross, periods),
    k401: line(k401, periods),
    roth: line(roth, periods),
    section125: line(s125, periods),
    federal: line(federal, periods),
    socialSecurity: line(f.socialSecurity, periods),
    medicare: line(f.medicare + f.additionalMedicare, periods),
    state: line(state, periods),
    local: line(local, periods),
    net: line(net, periods),
    federalWages,
    taxableIncome: ret.taxable,
    marginalFederal: ret.ordinary.marginal,
    taxShare: gross > 0 ? (federal + f.total + state + local) / gross : 0,
    k401Capped: k401Raw > US_2026.limits.k401,
  };
}

/** The paycheck's state line in words, for the result. */
export function stateNote(code: string): string {
  const s = stateByCode(code);
  if (!s) return "";
  if (s.income.kind === "none") return `${s.name} has no state income tax on wages.`;
  if (s.income.kind === "flat") return `${s.name} has a flat income tax of ${(s.income.rate * 100).toFixed(2).replace(/0$/, "")}%.${s.income.note ? ` ${s.income.note}` : ""}`;
  return `${s.name}'s income tax rate depends on your income, so enter the share of your pay you expect to pay.`;
}

export type PayRates = { hourly: number; daily: number; weekly: number; biweekly: number; semimonthly: number; monthly: number; annual: number };

/** Every pay period from an hourly rate (hours a week, paid weeks a year, working days a week). */
export function fromHourly(hourly: number, hoursPerWeek: number, weeksPerYear = 52, daysPerWeek = 5): PayRates {
  const h = Math.max(0, hourly);
  const weekly = h * Math.max(0, hoursPerWeek);
  const annual = weekly * Math.max(0, weeksPerYear);
  return {
    hourly: h,
    daily: daysPerWeek > 0 ? weekly / daysPerWeek : 0,
    weekly,
    biweekly: annual / 26,
    semimonthly: annual / 24,
    monthly: annual / 12,
    annual,
  };
}

/** The same, from a salary. */
export function fromSalary(salary: number, hoursPerWeek: number, weeksPerYear = 52, daysPerWeek = 5): PayRates {
  const hours = Math.max(0, hoursPerWeek) * Math.max(0, weeksPerYear);
  return fromHourly(hours > 0 ? Math.max(0, salary) / hours : 0, hoursPerWeek, weeksPerYear, daysPerWeek);
}

export type OvertimeWeek = {
  regularPay: number;
  overtimePay: number;
  doubleTimePay: number;
  total: number;
  /** The extra pay above the regular rate for the overtime hours: what the overtime deduction covers. */
  premium: number;
  overtimeRate: number;
};

/** A week's pay with overtime at `multiplier` × the regular rate and double time at 2×. */
export function overtimeWeek(rate: number, regularHours: number, overtimeHours: number, multiplier = 1.5, doubleTimeHours = 0): OvertimeWeek {
  const r = Math.max(0, rate);
  const regularPay = r * Math.max(0, regularHours);
  const overtimePay = r * multiplier * Math.max(0, overtimeHours);
  const doubleTimePay = r * 2 * Math.max(0, doubleTimeHours);
  // The deduction covers only the FLSA premium: half the regular rate for time-and-a-half hours.
  const premium = r * 0.5 * Math.max(0, overtimeHours) + r * 0.5 * Math.max(0, doubleTimeHours);
  return { regularPay, overtimePay, doubleTimePay, total: regularPay + overtimePay + doubleTimePay, premium, overtimeRate: r * multiplier };
}

export type OvertimeYear = { premium: number; deduction: number; taxSaved: number; marginal: number };

/**
 * The yearly overtime deduction (2025 to 2028) and the federal income tax it
 * saves, for someone whose other pay puts them at `annualPay` before it.
 */
export function overtimeSaving(premiumPerYear: number, annualPay: number, status: FilingStatus): OvertimeYear {
  const deduction = overtimeDeduction(premiumPerYear, annualPay, status);
  const taxable = Math.max(0, annualPay - standardDeduction(status));
  const before = ordinaryTax(taxable, status);
  const after = ordinaryTax(Math.max(0, taxable - deduction), status);
  return { premium: premiumPerYear, deduction, taxSaved: before.tax - after.tax, marginal: before.marginal };
}

export type SalesTax = { net: number; tax: number; gross: number };

/** Add tax to a price before tax. */
export function addSalesTax(price: number, rate: number): SalesTax {
  const net = Math.max(0, price);
  const tax = net * Math.max(0, rate);
  return { net, tax, gross: net + tax };
}

/** Take tax out of a price that includes it. */
export function removeSalesTax(total: number, rate: number): SalesTax {
  const gross = Math.max(0, total);
  const net = gross / (1 + Math.max(0, rate));
  return { net, tax: gross - net, gross };
}

export type Tip = { tip: number; total: number; perPerson: number; tipPerPerson: number; roundedPerPerson: number; effectiveTip: number };

/**
 * A tip on the bill before tax (as most etiquette guides suggest) or after it,
 * split between people, with an option to round each share up to the dollar.
 */
export function tip(subtotal: number, tax: number, tipRate: number, people: number, onTotal = false, roundUp = false): Tip {
  const sub = Math.max(0, subtotal);
  const t = Math.max(0, tax);
  const base = onTotal ? sub + t : sub;
  const tipAmount = base * Math.max(0, tipRate);
  const total = sub + t + tipAmount;
  const n = Math.max(1, Math.floor(people));
  const perPerson = total / n;
  const roundedPerPerson = roundUp ? Math.ceil(perPerson - 1e-9) : perPerson;
  const effectiveTip = roundedPerPerson * n - sub - t;
  return { tip: tipAmount, total, perPerson, tipPerPerson: tipAmount / n, roundedPerPerson, effectiveTip };
}
