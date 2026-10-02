import { describe, expect, it } from "vitest";
import { cumulativeTaxDue, emergencyMonthTax, emergencyTax } from "./emergency-tax";

describe("emergency tax", () => {
  it("1257L M1 gives a month's allowance and month-sized bands", () => {
    expect(emergencyMonthTax(2500, "M1")).toBeCloseTo((2500 - 12579 / 12) * 0.2, 2);
  });
  it("BR taxes every pound at 20%", () => {
    expect(emergencyMonthTax(2500, "BR")).toBeCloseTo(500, 6);
  });
  it("0T gives no allowance", () => {
    expect(emergencyMonthTax(2500, "0T")).toBeCloseTo(500, 6);
  });
  it("matches cumulative tax when you start in April with no other income", () => {
    const r = emergencyTax({ monthlyPay: 2500, code: "M1", startMonth: 1, payslips: 3 });
    expect(r.overpaidSoFar).toBeCloseTo(0, 2);
  });
  it("overtaxes a mid-year starter with no earlier income", () => {
    const r = emergencyTax({ monthlyPay: 2500, code: "M1", startMonth: 7, payslips: 1 });
    // Cumulative: six months of unused allowance are available in October.
    expect(r.dueSoFar).toBeCloseTo(0, 2);
    expect(r.overpaidSoFar).toBeCloseTo(r.monthEmergency, 2);
  });
  it("cumulative tax for a full year equals the annual calculation", () => {
    expect(cumulativeTaxDue(30_000, 12)).toBeCloseTo((30_000 - 12_579) * 0.2, 2);
  });
  it("BR on a first job overtaxes heavily", () => {
    const r = emergencyTax({ monthlyPay: 2000, code: "BR", startMonth: 1, payslips: 2 });
    expect(r.overpaidSoFar).toBeCloseTo(2 * 400 - (4000 - 2 * 12579 / 12) * 0.2, 2);
  });
});
