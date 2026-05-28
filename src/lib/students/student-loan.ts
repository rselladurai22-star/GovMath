/**
 * UK Student Loan repayments — 2025/26 thresholds.
 *
 * Plans:
 *   Plan 1 (England/Wales pre-Sep-2012, NI all): £26,065  threshold, 9%
 *   Plan 2 (England/Wales Sep 2012–Aug 2023):    £28,470  threshold, 9%
 *   Plan 4 (Scotland):                           £32,745  threshold, 9%
 *   Plan 5 (England Aug 2023+):                  £25,000  threshold, 9%
 *   Postgrad (PGL):                              £21,000  threshold, 6%
 *
 * Repayments are calculated on income above the threshold for each plan
 * separately. You can be on a Plan + PGL simultaneously.
 *
 * Reference: gov.uk student loan thresholds 2025/26.
 */

export type StudentLoanPlan = "plan-1" | "plan-2" | "plan-4" | "plan-5" | "postgrad";

export const STUDENT_LOAN_2025_26: Record<
  StudentLoanPlan,
  { threshold: number; ratePct: number; label: string }
> = {
  "plan-1": { threshold: 26065, ratePct: 9, label: "Plan 1" },
  "plan-2": { threshold: 28470, ratePct: 9, label: "Plan 2" },
  "plan-4": { threshold: 32745, ratePct: 9, label: "Plan 4 (Scotland)" },
  "plan-5": { threshold: 25000, ratePct: 9, label: "Plan 5" },
  postgrad: { threshold: 21000, ratePct: 6, label: "Postgraduate Loan" },
};

export type StudentLoanResult = {
  plan: StudentLoanPlan;
  threshold: number;
  ratePct: number;
  excessIncome: number;
  annualRepayment: number;
  monthlyRepayment: number;
};

export function studentLoanRepayment(
  plan: StudentLoanPlan,
  annualSalary: number
): StudentLoanResult {
  const spec = STUDENT_LOAN_2025_26[plan];
  const excess = Math.max(0, annualSalary - spec.threshold);
  const annual = excess * (spec.ratePct / 100);
  return {
    plan,
    threshold: spec.threshold,
    ratePct: spec.ratePct,
    excessIncome: excess,
    annualRepayment: annual,
    monthlyRepayment: annual / 12,
  };
}
