/**
 * Self-employed tax engine, 2026/27: sole traders, CIS subcontractors and
 * Self Assessment payments on account.
 *
 *   Profit        turnover − allowable expenses (or the £1,000 trading allowance)
 *   Income Tax    on profit + other income, rUK or Scottish bands. Personal
 *                 pension contributions (relief at source) extend the bands.
 *   Class 4 NI    6% on profit £12,570–£50,270, 2% above
 *   Class 2 NI    none to pay; profit ≥ £7,105 gets the credit free. Voluntary
 *                 £3.65 a week below that.
 *   Student loan  plan rate on total income above the plan threshold
 *
 * Sources: gov.uk/self-employed-national-insurance-rates,
 * gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027.
 */

import { incomeTax, personalAllowance, selfEmployedNI } from "../tax/2026-27";
import { scottishIncomeTax } from "../tax/scottish-2026-27";
import { studentLoanRepayment, type StudentPlan } from "../tax/take-home-engine";

export const TRADING_ALLOWANCE = 1000;
/**
 * Class 2 NI is no longer compulsory (from April 2024). Profits at or above the
 * Small Profits Threshold get a State Pension credit without paying; below it,
 * voluntary Class 2 is £3.65 a week in 2026/27.
 */
export const SMALL_PROFITS_THRESHOLD = 7105;
export const VOLUNTARY_CLASS2_YEAR = Math.round(3.65 * 52 * 100) / 100;

/**
 * Income Tax with a personal pension contribution paid under relief at
 * source. The gross contribution reduces adjusted net income (for the
 * Personal Allowance taper) and extends the basic rate band, which is the
 * same as taxing (income − gross) and then charging basic rate on the part
 * of the contribution that sits above the Personal Allowance.
 */
export function incomeTaxWithPension(income: number, grossPension: number, scottish: boolean): number {
  const i = Math.max(0, income);
  const g = Math.min(i, Math.max(0, grossPension));
  const tax = (n: number) => (scottish ? scottishIncomeTax(n).total : incomeTax(n).total);
  if (g === 0) return tax(i);
  const pa = personalAllowance(i - g);
  return tax(i - g) + 0.2 * Math.min(g, Math.max(0, i - pa));
}

export type SelfEmployedInput = {
  turnover: number;
  expenses: number;
  /** Claim the £1,000 trading allowance instead of actual expenses. */
  tradingAllowance: boolean;
  /** Salary, pension or other taxable income, taxed first. */
  otherIncome: number;
  scottish: boolean;
  plan: StudentPlan;
  /** Gross personal pension contributions (relief at source). */
  pension: number;
  /** Pay voluntary Class 2 when profit is under the Small Profits Threshold. */
  voluntaryClass2: boolean;
};

export type SelfEmployedResult = {
  turnover: number;
  deduction: number;
  profit: number;
  /** Income Tax on everything. */
  incomeTaxTotal: number;
  /** Income Tax on the other income alone (already paid through PAYE if it is a salary). */
  incomeTaxOther: number;
  /** Extra Income Tax caused by the profit. */
  incomeTaxOnProfit: number;
  class4: number;
  class2: number;
  studentLoan: number;
  /** Everything the self-employment adds: Income Tax, NI and student loan. */
  totalOnProfit: number;
  keep: number;
  effectiveRate: number;
  /** Tax + NI on the next £100 of profit. */
  marginalRate: number;
  getsNiCredit: boolean;
  /** No tax return needed: turnover within the trading allowance. */
  belowTradingAllowance: boolean;
};

function core(i: SelfEmployedInput, profit: number) {
  const other = Math.max(0, i.otherIncome);
  const total = profit + other;
  const itTotal = incomeTaxWithPension(total, i.pension, i.scottish);
  const itOther = incomeTaxWithPension(other, Math.min(i.pension, other), i.scottish);
  const class4 = selfEmployedNI(profit).total;
  const sl = studentLoanRepayment(total, i.plan) - studentLoanRepayment(other, i.plan);
  return { itTotal, itOther, class4, sl };
}

export function selfEmployedTax(i: SelfEmployedInput): SelfEmployedResult {
  const turnover = Math.max(0, i.turnover);
  const deduction = i.tradingAllowance ? Math.min(turnover, TRADING_ALLOWANCE) : Math.max(0, i.expenses);
  const profit = Math.max(0, turnover - deduction);
  const c = core(i, profit);
  const getsNiCredit = profit >= SMALL_PROFITS_THRESHOLD;
  const class2 = !getsNiCredit && i.voluntaryClass2 && turnover > 0 ? VOLUNTARY_CLASS2_YEAR : 0;
  const incomeTaxOnProfit = Math.max(0, c.itTotal - c.itOther);
  const totalOnProfit = incomeTaxOnProfit + c.class4 + c.sl + class2;
  const next = core(i, profit + 100);
  const marginalRate = (next.itTotal - next.itOther + next.class4 - (c.itTotal - c.itOther + c.class4)) / 100;
  return {
    turnover,
    deduction,
    profit,
    incomeTaxTotal: c.itTotal,
    incomeTaxOther: c.itOther,
    incomeTaxOnProfit,
    class4: c.class4,
    class2,
    studentLoan: c.sl,
    totalOnProfit,
    keep: profit - totalOnProfit,
    effectiveRate: profit > 0 ? totalOnProfit / profit : 0,
    marginalRate,
    getsNiCredit,
    belowTradingAllowance: turnover <= TRADING_ALLOWANCE,
  };
}

/* ── Payments on account ─────────────────────────────── */

const POA = {
  /** No payments on account if the Self Assessment bill is under £1,000… */
  minBill: 1000,
  /** …or more than 80% of the year's tax was collected at source. */
  atSourceShare: 0.8,
} as const;

export type PoaInput = {
  /** Last year's (2025/26) Self Assessment bill: Income Tax and Class 4 NI. */
  lastBill: number;
  /** Student loan, Class 2 and Capital Gains Tax in last year's bill: due, but not used for payments on account. */
  lastOther: number;
  /** Payments on account already made towards last year. 0 in your first year. */
  lastPoasPaid: number;
  /** Tax deducted at source last year, mainly PAYE. */
  lastAtSource: number;
  /** This year's (2026/27) expected Income Tax and Class 4 NI through Self Assessment. */
  thisBill: number;
  /** Student loan, Class 2 and CGT expected this year. */
  thisOther: number;
  /** Ask HMRC to reduce each payment on account to this. Negative to leave as set. */
  reduceTo: number;
};

export type PoaPayment = { date: string; label: string; amount: number; kind: "balance" | "poa" };

export type PoaPlan = {
  needsPoa: boolean;
  /** Why no payments on account are needed, if so. */
  reason: "under-1000" | "at-source" | null;
  /** Each payment on account for this year, as HMRC sets it. */
  poaSet: number;
  /** Each payment on account actually paid (after any reduction). */
  poa: number;
  /** Balancing payment for last year (negative = refund or credit). */
  lastBalance: number;
  /** 31 January 2027: last year's balance plus the first payment on account. */
  january: number;
  july: number;
  /** Balancing payment for this year, due 31 January 2028. */
  thisBalance: number;
  /** First payment on account for next year, also 31 January 2028. */
  nextPoa: number;
  nextJanuary: number;
  /** Total paid towards this year's tax. */
  thisYearTotal: number;
  /** True when the reduction takes payments below what this year's bill needs. */
  underpaidByReduction: boolean;
  schedule: PoaPayment[];
};

function poaFor(bill: number, atSource: number) {
  const b = Math.max(0, bill);
  if (b < POA.minBill) return { needs: false, reason: "under-1000" as const };
  const total = b + Math.max(0, atSource);
  if (total > 0 && atSource / total > POA.atSourceShare) return { needs: false, reason: "at-source" as const };
  return { needs: true, reason: null };
}

export function poaPlan(i: PoaInput): PoaPlan {
  const last = poaFor(i.lastBill, i.lastAtSource);
  const poaSet = last.needs ? i.lastBill / 2 : 0;
  const poa = last.needs && i.reduceTo >= 0 ? Math.min(poaSet, i.reduceTo) : poaSet;
  const lastBalance = i.lastBill + i.lastOther - i.lastPoasPaid;
  const january = lastBalance + poa;
  const thisDue = Math.max(0, i.thisBill) + Math.max(0, i.thisOther);
  const thisBalance = thisDue - 2 * poa;
  // Next year's payments on account are based on this year's bill, judged with this year's PAYE share assumed the same.
  const next = poaFor(i.thisBill, i.lastAtSource);
  const nextPoa = next.needs ? i.thisBill / 2 : 0;
  const schedule: PoaPayment[] = [
    { date: "31 January 2027", label: "Balancing payment for 2025/26", amount: lastBalance, kind: "balance" },
    ...(poa > 0 ? [{ date: "31 January 2027", label: "1st payment on account for 2026/27", amount: poa, kind: "poa" as const }] : []),
    ...(poa > 0 ? [{ date: "31 July 2027", label: "2nd payment on account for 2026/27", amount: poa, kind: "poa" as const }] : []),
    { date: "31 January 2028", label: "Balancing payment for 2026/27", amount: thisBalance, kind: "balance" },
    ...(nextPoa > 0 ? [{ date: "31 January 2028", label: "1st payment on account for 2027/28", amount: nextPoa, kind: "poa" as const }] : []),
  ];
  return {
    needsPoa: last.needs,
    reason: last.reason,
    poaSet,
    poa,
    lastBalance,
    january,
    july: poa,
    thisBalance,
    nextPoa,
    nextJanuary: thisBalance + nextPoa,
    thisYearTotal: thisDue,
    underpaidByReduction: poa < poaSet && 2 * poa < Math.max(0, i.thisBill),
    schedule,
  };
}

/* ── Construction Industry Scheme ────────────────────── */

export type CisStatus = "registered" | "unregistered" | "gross";
export const CIS_RATES: Record<CisStatus, number> = { registered: 0.2, unregistered: 0.3, gross: 0 };

export type CisInvoiceInput = {
  labour: number;
  /** Materials, plant hire, fuel for the job and consumables you bought. */
  materials: number;
  status: CisStatus;
  /** VAT-registered subcontractor. */
  vatRegistered: boolean;
  /** Domestic reverse charge applies (VAT-registered contractor, not the end user). */
  reverseCharge: boolean;
};

export type CisInvoice = {
  rate: number;
  net: number;
  deduction: number;
  vat: number;
  /** VAT the contractor accounts for under the reverse charge instead of paying you. */
  reverseChargeVat: number;
  invoiceTotal: number;
  /** What lands in your bank. */
  paid: number;
};

/** One CIS invoice. The deduction is on labour only, never on materials or VAT. */
export function cisInvoice(i: CisInvoiceInput): CisInvoice {
  const labour = Math.max(0, i.labour);
  const materials = Math.max(0, i.materials);
  const rate = CIS_RATES[i.status];
  const net = labour + materials;
  const deduction = labour * rate;
  const vatDue = i.vatRegistered ? net * 0.2 : 0;
  const vat = i.reverseCharge ? 0 : vatDue;
  return {
    rate,
    net,
    deduction,
    vat,
    reverseChargeVat: i.reverseCharge ? vatDue : 0,
    invoiceTotal: net + vat,
    paid: net + vat - deduction,
  };
}

export type CisYearInput = {
  /** Labour invoiced in the tax year. */
  labour: number;
  /** All allowable costs, including materials you bought. */
  expenses: number;
  /** Materials included in invoices (part of turnover). */
  materials: number;
  status: CisStatus;
  otherIncome: number;
  scottish: boolean;
};

export type CisYear = {
  turnover: number;
  profit: number;
  deducted: number;
  /** Income Tax + Class 4 NI the work actually costs. */
  owed: number;
  /** Positive = refund due; negative = more to pay. */
  refund: number;
};

/** A sole trader's CIS year: deductions taken against the tax actually due. */
export function cisYear(i: CisYearInput): CisYear {
  const labour = Math.max(0, i.labour);
  const materials = Math.max(0, i.materials);
  const turnover = labour + materials;
  const r = selfEmployedTax({
    turnover,
    expenses: Math.max(0, i.expenses),
    tradingAllowance: false,
    otherIncome: i.otherIncome,
    scottish: i.scottish,
    plan: "none",
    pension: 0,
    voluntaryClass2: false,
  });
  const deducted = labour * CIS_RATES[i.status];
  const owed = r.incomeTaxOnProfit + r.class4;
  return { turnover, profit: r.profit, deducted, owed, refund: deducted - owed };
}
