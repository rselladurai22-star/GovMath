/**
 * Take-Home Decision Engine — 2025/26 (England, Wales & NI).
 *
 * Composes the pure band functions in `2025-26.ts` and layers on the three
 * things a real payslip has that the headline calculator omits: salary-
 * sacrifice pension, student-loan plans, and one-off bonuses. Everything here
 * is pure and deterministic so it can drive live scenario exploration on the
 * client and be unit-tested on the server.
 *
 * Model notes:
 *  - Salary sacrifice reduces gross *before* Income Tax and NI (its whole
 *    point) and also before student-loan assessment, matching how a sacrifice
 *    arrangement lowers contractual pay.
 *  - Bonus is treated as ordinary earnings (added to gross) — the annualised
 *    model can't reproduce month-of-payment PAYE spikes, which we flag in copy.
 *  - NI uses the existing annualised Class 1 approximation.
 */

import {
  incomeTax,
  nationalInsurance,
  TAX_YEAR_2025_26,
  type IncomeTaxBreakdown,
  type NIBreakdown,
} from "./2025-26";

export type StudentPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "pg";

export type StudentPlanSpec = {
  id: StudentPlan;
  label: string;
  short: string;
  threshold: number;
  rate: number;
};

/** Student-loan repayment plans, 2025/26 annual thresholds. */
export const STUDENT_PLANS: Record<StudentPlan, StudentPlanSpec> = {
  none: { id: "none", label: "No student loan", short: "None", threshold: Infinity, rate: 0 },
  plan1: { id: "plan1", label: "Plan 1 (pre-2012)", short: "Plan 1", threshold: 26065, rate: 0.09 },
  plan2: { id: "plan2", label: "Plan 2 (2012–2023)", short: "Plan 2", threshold: 28470, rate: 0.09 },
  plan4: { id: "plan4", label: "Plan 4 (Scotland)", short: "Plan 4", threshold: 32745, rate: 0.09 },
  plan5: { id: "plan5", label: "Plan 5 (from 2023)", short: "Plan 5", threshold: 25000, rate: 0.09 },
  pg: { id: "pg", label: "Postgraduate Loan", short: "Postgrad", threshold: 21000, rate: 0.06 },
};

export const STUDENT_PLAN_ORDER: StudentPlan[] = [
  "none",
  "plan2",
  "plan1",
  "plan4",
  "plan5",
  "pg",
];

/** Approximate UK median full-time gross salary (ONS ASHE 2024), for context. */
export const UK_MEDIAN_FULL_TIME = 37430;

export function studentLoanRepayment(assessable: number, plan: StudentPlan): number {
  const spec = STUDENT_PLANS[plan];
  if (plan === "none" || assessable <= spec.threshold) return 0;
  return (assessable - spec.threshold) * spec.rate;
}

export type EngineInputs = {
  /** Base annual gross salary, before any sacrifice. */
  gross: number;
  /** One-off annual bonus, treated as ordinary earnings. */
  bonus: number;
  /** Salary-sacrifice pension, as a % of (salary + bonus). */
  pensionPct: number;
  plan: StudentPlan;
};

export type TakeHomeSnapshot = {
  inputs: EngineInputs;
  /** salary + bonus, before sacrifice. */
  totalGross: number;
  pensionContribution: number;
  /** totalGross − pension: the figure tax/NI/SL are assessed on. */
  adjustedGross: number;
  incomeTax: IncomeTaxBreakdown;
  ni: NIBreakdown;
  studentLoan: number;
  /** Sum of tax + NI + student loan (money that leaves for good). */
  totalDeductions: number;
  /** adjustedGross − deductions: cash in the bank. */
  takeHome: number;
  /** Deductions as a share of totalGross, 0–1 (pension excluded). */
  effectiveRate: number;
  /** Share of totalGross you keep as cash, 0–1. */
  keepRate: number;
  /** Marginal deduction rate on the next £1 of gross, 0–1. */
  marginalRate: number;
  /** Cash kept from the next £1 of gross, 0–1 (1 − marginalRate). */
  marginalKeep: number;
  perPeriod: { monthly: number; weekly: number; daily: number };
  /** What each pound of total gross becomes. */
  allocation: AllocationSegment[];
};

export type AllocationKey = "takeHome" | "incomeTax" | "ni" | "studentLoan" | "pension";

export type AllocationSegment = {
  key: AllocationKey;
  label: string;
  amount: number;
  /** Share of total gross, 0–1. */
  share: number;
  color: string;
  /** True for money that benefits the user (take-home or pension). */
  yours: boolean;
};

export const ALLOCATION_COLORS: Record<AllocationKey, string> = {
  takeHome: "#3f7d63",
  incomeTax: "#b0492f",
  ni: "#c9a35c",
  studentLoan: "#7d6a9e",
  pension: "#8fa3b8",
};

const ALLOCATION_LABELS: Record<AllocationKey, string> = {
  takeHome: "Take-home",
  incomeTax: "Income Tax",
  ni: "National Insurance",
  studentLoan: "Student loan",
  pension: "Pension",
};

function clampInputs(raw: EngineInputs): EngineInputs {
  return {
    gross: Math.max(0, raw.gross || 0),
    bonus: Math.max(0, raw.bonus || 0),
    pensionPct: Math.min(100, Math.max(0, raw.pensionPct || 0)),
    plan: raw.plan ?? "none",
  };
}

/** Core computation for a full pay picture. */
export function computeTakeHome(raw: EngineInputs): TakeHomeSnapshot {
  const inputs = clampInputs(raw);
  const totalGross = inputs.gross + inputs.bonus;
  const pensionContribution = (inputs.pensionPct / 100) * totalGross;
  const adjustedGross = Math.max(0, totalGross - pensionContribution);

  const tax = incomeTax(adjustedGross);
  const ni = nationalInsurance(adjustedGross);
  const studentLoan = studentLoanRepayment(adjustedGross, inputs.plan);

  const totalDeductions = tax.total + ni.total + studentLoan;
  const takeHome = Math.max(0, adjustedGross - totalDeductions);

  const allocation: AllocationSegment[] = (
    [
      ["takeHome", takeHome, true],
      ["pension", pensionContribution, true],
      ["incomeTax", tax.total, false],
      ["ni", ni.total, false],
      ["studentLoan", studentLoan, false],
    ] as [AllocationKey, number, boolean][]
  )
    .filter(([, amount]) => amount > 0.5)
    .map(([key, amount, yours]) => ({
      key,
      label: ALLOCATION_LABELS[key],
      amount,
      share: totalGross > 0 ? amount / totalGross : 0,
      color: ALLOCATION_COLORS[key],
      yours,
    }));

  const marginal = marginalRate(inputs);

  return {
    inputs,
    totalGross,
    pensionContribution,
    adjustedGross,
    incomeTax: tax,
    ni,
    studentLoan,
    totalDeductions,
    takeHome,
    effectiveRate: totalGross > 0 ? totalDeductions / totalGross : 0,
    keepRate: totalGross > 0 ? takeHome / totalGross : 0,
    marginalRate: marginal,
    marginalKeep: 1 - marginal,
    perPeriod: {
      monthly: takeHome / 12,
      weekly: takeHome / 52,
      daily: takeHome / 260,
    },
    allocation,
  };
}

/**
 * Deduction rate on the next £1 of *gross* salary, holding pension % and plan
 * fixed. Uses a small forward step so band edges, the £100k 60% trap, the NI
 * drop at the UEL and student-loan thresholds all surface naturally.
 */
export function marginalRate(raw: EngineInputs, step = 100): number {
  const inputs = clampInputs(raw);
  const here = takeHomeCash(inputs);
  const there = takeHomeCash({ ...inputs, gross: inputs.gross + step });
  // Extra pension diverted by the higher gross isn't a deduction — add it back
  // so marginalRate reflects only tax/NI/SL, matching the allocation model.
  const extraGross = step;
  const kept = there.takeHome + (there.pension - here.pension) - here.takeHome;
  return Math.min(1, Math.max(0, 1 - kept / extraGross));
}

function takeHomeCash(inputs: EngineInputs): { takeHome: number; pension: number } {
  const totalGross = inputs.gross + inputs.bonus;
  const pension = (inputs.pensionPct / 100) * totalGross;
  const adjusted = Math.max(0, totalGross - pension);
  const tax = incomeTax(adjusted).total;
  const ni = nationalInsurance(adjusted).total;
  const sl = studentLoanRepayment(adjusted, inputs.plan);
  return { takeHome: Math.max(0, adjusted - tax - ni - sl), pension };
}

/** Sampled take-home curve across a gross-salary range, for the income graph. */
export function takeHomeCurve(
  base: EngineInputs,
  from: number,
  to: number,
  steps = 120
): { gross: number; takeHome: number; keepRate: number }[] {
  const out: { gross: number; takeHome: number; keepRate: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const gross = from + ((to - from) * i) / steps;
    const snap = computeTakeHome({ ...base, gross, bonus: 0 });
    out.push({
      gross,
      takeHome: snap.takeHome,
      keepRate: snap.keepRate,
    });
  }
  return out;
}

export type ThresholdMarker = {
  id: string;
  gross: number;
  label: string;
  note: string;
};

/** Key band edges on the gross axis, for annotating the income curve. */
export function thresholdMarkers(): ThresholdMarker[] {
  const t = TAX_YEAR_2025_26;
  return [
    { id: "pa", gross: t.personalAllowance, label: "Tax-free ends", note: "Personal Allowance — £12,570" },
    { id: "higher", gross: t.ni.upperEarningsLimit, label: "40% band", note: "Higher-rate threshold — £50,270" },
    { id: "trap", gross: t.paTaperStart, label: "60% trap", note: "Personal Allowance starts to vanish — £100,000" },
    { id: "paGone", gross: t.paTaperEnd, label: "45% band", note: "Additional rate; Allowance fully gone — £125,140" },
  ];
}

export type Insight = {
  id: string;
  tone: "opportunity" | "risk" | "info" | "win";
  title: string;
  body: string;
  /** Optional headline figure to render prominently. */
  figure?: string;
};

/** Distance (in gross £) to the next meaningful tax threshold above you. */
export function nextThreshold(adjustedGross: number): { label: string; at: number; away: number } | null {
  const t = TAX_YEAR_2025_26;
  const edges = [
    { label: "the 40% higher-rate band", at: t.ni.upperEarningsLimit },
    { label: "the £100k 60% trap", at: t.paTaperStart },
    { label: "the 45% additional-rate band", at: t.paTaperEnd },
  ];
  for (const e of edges) {
    if (adjustedGross < e.at) return { label: e.label, at: e.at, away: e.at - adjustedGross };
  }
  return null;
}
