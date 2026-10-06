/**
 * Freelancers and small businesses, 2026/27: the VAT registration threshold
 * test and the day rate needed for a target take-home as a sole trader.
 */

import { selfEmployedTax } from "./self-employed";
import type { StudentPlan } from "../tax/take-home-engine";

/* ── VAT registration threshold ────────────────────────────────── */

export const VAT_THRESHOLD_2026 = { register: 90_000, deregister: 88_000, rate: 0.2 } as const;

export type VatThresholdInput = {
  /** Taxable turnover over the last 12 months, including this month. */
  rolling: number;
  /** Turnover expected in the next 30 days alone. */
  next30: number;
  /** Turnover expected next month, and the month that drops out of the 12-month window. */
  nextMonth: number;
  droppingOut: number;
  /** Last day of the month the rolling total runs to (yyyy-mm-dd). */
  monthEnd: string;
  /** Share of sales to customers who cannot reclaim VAT (consumers), 0 to 1. */
  consumerShare: number;
  /** Yearly costs with VAT you could reclaim, VAT included. */
  costsWithVat: number;
};

export type VatThresholdResult = {
  overNow: boolean;
  overNext30: boolean;
  headroom: number;
  nextRolling: number;
  crossesNextMonth: boolean;
  /** Registration deadline and effective date if over the threshold now. */
  notifyBy: string | null;
  registeredFrom: string | null;
  /** If prices stay the same: VAT you would hand over on sales to consumers, less VAT reclaimed on costs, a year. */
  yearlyCost: number;
};

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return t.toISOString().slice(0, 10);
}

/** First day of the second month after the month ending on iso. */
function secondMonthStart(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10);
}

export function vatThreshold(i: VatThresholdInput): VatThresholdResult {
  const v = VAT_THRESHOLD_2026;
  const overNow = i.rolling > v.register;
  const overNext30 = i.next30 > v.register;
  const nextRolling = Math.max(0, i.rolling - i.droppingOut + i.nextMonth);
  // VAT on sales to consumers comes out of your price if prices stay the same; business customers can usually absorb it.
  const salesVat = (Math.max(0, i.rolling) * Math.max(0, Math.min(1, i.consumerShare)) * v.rate) / (1 + v.rate);
  const inputVat = (Math.max(0, i.costsWithVat) * v.rate) / (1 + v.rate);
  return {
    overNow,
    overNext30,
    headroom: v.register - i.rolling,
    nextRolling,
    crossesNextMonth: !overNow && nextRolling > v.register,
    notifyBy: overNow ? addDays(i.monthEnd, 30) : null,
    registeredFrom: overNow ? secondMonthStart(i.monthEnd) : null,
    yearlyCost: salesVat - inputVat,
  };
}

/* ── Day rate ──────────────────────────────────────────────────── */

export type DayRateInput = {
  /** Take-home pay wanted a year, after Income Tax, NI and student loan. */
  target: number;
  /** Business costs a year. */
  expenses: number;
  /** Personal pension contributions a year, gross. */
  pension: number;
  weeksOff: number;
  bankHolidays: number;
  sickDays: number;
  /** Days a year spent on admin, sales and training, which nobody pays for. */
  nonBillable: number;
  daysPerWeek: number;
  scottish: boolean;
  plan: StudentPlan;
};

export type DayRateResult = {
  billableDays: number;
  profit: number;
  turnover: number;
  dayRate: number;
  hourly: number;
  tax: number;
  ni: number;
  studentLoan: number;
  /** Turnover over the VAT registration threshold. */
  overVat: boolean;
};

export function billableDays(i: Pick<DayRateInput, "weeksOff" | "bankHolidays" | "sickDays" | "nonBillable" | "daysPerWeek">): number {
  return Math.max(0, (52 - i.weeksOff) * i.daysPerWeek - i.bankHolidays - i.sickDays - i.nonBillable);
}

export function dayRate(i: DayRateInput): DayRateResult {
  const days = billableDays(i);
  const keepAt = (profit: number) => {
    const r = selfEmployedTax({ turnover: profit, expenses: 0, tradingAllowance: false, otherIncome: 0, scottish: i.scottish, plan: i.plan, pension: i.pension, voluntaryClass2: false });
    // Relief at source: you pay 80% of the gross contribution.
    return { keep: r.keep - 0.8 * Math.max(0, i.pension), r };
  };
  const target = Math.max(0, i.target);
  let lo = 0;
  let hi = target * 3 + 10_000;
  for (let k = 0; k < 70; k++) {
    const mid = (lo + hi) / 2;
    if (keepAt(mid).keep >= target) hi = mid;
    else lo = mid;
  }
  const profit = Math.ceil(hi);
  const { r } = keepAt(profit);
  const turnover = profit + Math.max(0, i.expenses);
  const dayRateValue = days > 0 ? turnover / days : 0;
  return {
    billableDays: days,
    profit,
    turnover,
    dayRate: dayRateValue,
    hourly: dayRateValue / 7.5,
    tax: r.incomeTaxOnProfit,
    ni: r.class4 + r.class2,
    studentLoan: r.studentLoan,
    overVat: turnover > VAT_THRESHOLD_2026.register,
  };
}
