import { describe, expect, it } from "vitest";
import { interestRate, maintenanceLoan2026, projectLoan, repayments2026, studentCouncilTax } from "./loans";

describe("repayments 2026/27", () => {
  it("Plan 2 at £35,000", () => {
    const r = repayments2026({ salary: 35_000, plans: ["plan2"] });
    expect(r.yearly).toBeCloseTo((35_000 - 29_385) * 0.09, 6);
  });
  it("Plan 2 plus postgraduate", () => {
    const r = repayments2026({ salary: 40_000, plans: ["plan2", "postgrad"] });
    expect(r.yearly).toBeCloseTo((40_000 - 29_385) * 0.09 + (40_000 - 21_000) * 0.06, 6);
  });
  it("two undergraduate plans repay once, at the lowest threshold", () => {
    const r = repayments2026({ salary: 40_000, plans: ["plan1", "plan2"] });
    expect(r.lines.length).toBe(1);
    expect(r.lines[0].plan).toBe("plan1");
  });
});

describe("interest", () => {
  it("Plan 2 slides from RPI to the 6% cap", () => {
    expect(interestRate("plan2", 25_000)).toBeCloseTo(0.041, 6);
    expect(interestRate("plan2", 60_000)).toBeCloseTo(0.06, 6);
    expect(interestRate("plan2", 41_135)).toBeCloseTo(0.041 + 0.015, 6);
  });
  it("other plans", () => {
    expect(interestRate("plan5", 50_000)).toBeCloseTo(0.041, 6);
    expect(interestRate("postgrad", 50_000)).toBeCloseTo(0.06, 6);
    expect(interestRate("plan1", 50_000)).toBeCloseTo(0.041, 6);
  });
});

describe("projection", () => {
  it("a small balance on a high salary clears", () => {
    const r = projectLoan({ plan: "plan1", balance: 5_000, salary: 60_000, salaryGrowth: 0.03, rpi: 0.03, yearsRepaying: 5, extraMonthly: 0 });
    expect(r.clearedIn).not.toBeNull();
    expect(r.writtenOff).toBe(0);
  });
  it("a large Plan 5 balance on a modest salary is partly written off", () => {
    const r = projectLoan({ plan: "plan5", balance: 60_000, salary: 26_000, salaryGrowth: 0.03, rpi: 0.03, yearsRepaying: 0, extraMonthly: 0 });
    expect(r.yearsLeft).toBe(40);
    expect(r.writtenOff).toBeGreaterThan(0);
  });
});

describe("maintenance loan", () => {
  it("matches the official away-from-home table", () => {
    expect(maintenanceLoan2026(25_000, "away").loan).toBe(10_830);
    expect(maintenanceLoan2026(30_000, "away").loan).toBe(10_058);
    expect(maintenanceLoan2026(35_000, "away").loan).toBe(9_285);
    expect(maintenanceLoan2026(60_000, "away").loan).toBe(5_421);
    expect(maintenanceLoan2026(42_875, "away").loan).toBe(8_068);
    expect(maintenanceLoan2026(62_410, "away").loan).toBe(5_048);
    expect(maintenanceLoan2026(100_000, "london").loan).toBe(7_039);
  });
});

describe("council tax", () => {
  it("cases", () => {
    expect(studentCouncilTax({ students: 4, others: 0, bill: 2_000, months: 12 }).pay).toBe(0);
    expect(studentCouncilTax({ students: 2, others: 1, bill: 2_000, months: 12 }).pay).toBe(1_500);
    expect(studentCouncilTax({ students: 1, others: 2, bill: 2_000, months: 12 }).pay).toBe(2_000);
    expect(studentCouncilTax({ students: 1, others: 1, bill: 2_400, months: 6 }).pay).toBe(900);
  });
});
