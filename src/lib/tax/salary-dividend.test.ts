import { describe, expect, it } from "vitest";
import { corporationTax, salaryDividendPlan } from "./salary-dividend";

const round = (n: number) => Math.round(n * 100) / 100;

describe("corporationTax (2025/26)", () => {
  it("zero or negative profit → no tax", () => {
    expect(corporationTax(0)).toBe(0);
    expect(corporationTax(-100)).toBe(0);
  });

  it("small profits rate 19% up to £50k", () => {
    expect(corporationTax(40_000)).toBe(40_000 * 0.19);
    expect(corporationTax(50_000)).toBe(50_000 * 0.19);
  });

  it("marginal band 26.5% between £50k and £250k", () => {
    // 50000 × 19% + 50000 × 26.5% = 9500 + 13250 = 22750
    expect(corporationTax(100_000)).toBe(22_750);
  });

  it("main rate 25% at £250k+", () => {
    expect(corporationTax(250_000)).toBe(250_000 * 0.25);
  });
});

describe("salaryDividendPlan", () => {
  it("£0 salary path: all profit becomes dividends after CT", () => {
    const r = salaryDividendPlan({ preTaxProfit: 50_000, salary: 0 });
    expect(r.salary).toBe(0);
    expect(r.employerNI).toBe(0);
    expect(r.corporationTax).toBe(50_000 * 0.19);
    // Distributable = 50000 - 9500 = 40500
    expect(r.distributableDividends).toBe(40_500);
  });

  it("£12,570 salary path: uses PA, no IT, no employee NI", () => {
    const r = salaryDividendPlan({ preTaxProfit: 60_000, salary: 12_570 });
    expect(r.incomeTaxOnSalary).toBe(0);
    expect(r.employeeNI).toBe(0);
    // Employer NI: (12570 - 5000) × 15% = 1135.50
    expect(round(r.employerNI)).toBe(1135.5);
  });

  it("take-home is higher with optimal salary than zero salary (typically)", () => {
    const zero = salaryDividendPlan({ preTaxProfit: 60_000, salary: 0 });
    const pa = salaryDividendPlan({ preTaxProfit: 60_000, salary: 12_570 });
    expect(pa.takeHome).toBeGreaterThan(zero.takeHome);
  });
});
