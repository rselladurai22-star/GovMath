import { describe, expect, it } from "vitest";
import { studentLoanRepayment, STUDENT_LOAN_2025_26 } from "./student-loan";

const round = (n: number) => Math.round(n * 100) / 100;

describe("studentLoanRepayment (2025/26)", () => {
  it("Plan 2 below threshold → no repayment", () => {
    const r = studentLoanRepayment("plan-2", 25_000);
    expect(r.annualRepayment).toBe(0);
    expect(r.monthlyRepayment).toBe(0);
  });

  it("Plan 2 £35,000 → 9% × (35000-28470) = £587.70/yr", () => {
    const r = studentLoanRepayment("plan-2", 35_000);
    expect(round(r.annualRepayment)).toBe(round((35_000 - 28_470) * 0.09));
  });

  it("Plan 5 has the lowest threshold (£25k)", () => {
    expect(STUDENT_LOAN_2025_26["plan-5"].threshold).toBe(25_000);
  });

  it("Plan 4 (Scotland) has highest threshold (£32,745)", () => {
    expect(STUDENT_LOAN_2025_26["plan-4"].threshold).toBe(32_745);
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
