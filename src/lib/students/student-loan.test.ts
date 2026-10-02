import { describe, expect, it } from "vitest";
import { studentLoanRepayment, STUDENT_LOAN_2026_27 } from "./student-loan";

const round = (n: number) => Math.round(n * 100) / 100;

describe("studentLoanRepayment (2026/27)", () => {
  it("Plan 2 below threshold → no repayment", () => {
    const r = studentLoanRepayment("plan-2", 25_000);
    expect(r.annualRepayment).toBe(0);
    expect(r.monthlyRepayment).toBe(0);
  });

  it("Plan 2 £35,000 → 9% × (35000-29385) = £505.35/yr", () => {
    const r = studentLoanRepayment("plan-2", 35_000);
    expect(round(r.annualRepayment)).toBe(round((35_000 - 29_385) * 0.09));
  });

  it("Plan 5 has the lowest threshold (£25k)", () => {
    expect(STUDENT_LOAN_2026_27["plan-5"].threshold).toBe(25_000);
  });

  it("Plan 4 (Scotland) has highest threshold (£33,795)", () => {
    expect(STUDENT_LOAN_2026_27["plan-4"].threshold).toBe(33_795);
  });

  it("Postgrad uses 6% rate", () => {
    const r = studentLoanRepayment("postgrad", 30_000);
    expect(round(r.annualRepayment)).toBe(round((30_000 - 21_000) * 0.06));
  });

  it("monthly = annual / 12", () => {
    const r = studentLoanRepayment("plan-2", 40_000);
    expect(round(r.monthlyRepayment)).toBe(round(r.annualRepayment / 12));
  });
});
