import { describe, it, expect } from "vitest";
import { employerNI } from "./employer-ni";

describe("employerNI", () => {
  it("charges 15% over £5k", () => {
    const r = employerNI({ annualSalary: 35_000 });
    expect(r.niableEarnings).toBe(30_000);
    expect(r.grossEmployerNI).toBeCloseTo(4500, 0);
  });

  it("zero NI when below threshold", () => {
    const r = employerNI({ annualSalary: 4000 });
    expect(r.grossEmployerNI).toBe(0);
  });

  it("applies Employment Allowance offset", () => {
    const r = employerNI({ annualSalary: 35_000, employmentAllowance: true });
    expect(r.employmentAllowance).toBe(4500);
    expect(r.totalEmploymentCost).toBe(35_000);
  });
});
