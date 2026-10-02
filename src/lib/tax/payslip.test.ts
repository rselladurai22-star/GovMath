import { describe, expect, it } from "vitest";
import { periodNI, periodStudentLoan } from "./payslip";

describe("periodNI", () => {
  it("charges nothing up to the monthly Primary Threshold", () => {
    expect(periodNI(1048)).toBe(0);
  });
  it("charges 8% between the monthly thresholds", () => {
    expect(periodNI(3000)).toBeCloseTo((3000 - 1048) * 0.08, 2);
  });
  it("charges 2% above the monthly Upper Earnings Limit", () => {
    expect(periodNI(8000)).toBeCloseTo((4189 - 1048) * 0.08 + (8000 - 4189) * 0.02, 2);
  });
  it("uses weekly thresholds for weekly pay", () => {
    expect(periodNI(500, "week")).toBeCloseTo((500 - 242) * 0.08, 2);
  });
});

describe("periodStudentLoan", () => {
  it("uses the monthly share of the Plan 2 threshold", () => {
    expect(periodStudentLoan(3000, "plan2")).toBeCloseTo((3000 - 29385 / 12) * 0.09, 2);
  });
  it("is zero with no plan or below the threshold", () => {
    expect(periodStudentLoan(3000, "none")).toBe(0);
    expect(periodStudentLoan(2000, "plan2")).toBe(0);
  });
});
