import { describe, expect, it } from "vitest";
import { budgetChanges, dividendRise2026, yearResult, type BudgetInput } from "./budget-changes";

const BASE: BudgetInput = {
  salary: 45_000,
  sacrificePct: 0,
  rasGross: 0,
  savings: 0,
  dividends: 0,
  property: 0,
  financeCosts: 0,
  region: "ruk",
  plan: "none",
  payGrowth: 0,
};

describe("salary only", () => {
  it("is unchanged across the frozen years with no pay growth", () => {
    const r = budgetChanges(BASE);
    const first = r.years[0];
    expect(first.incomeTax).toBeCloseTo(6_486, 2);
    expect(first.employeeNi).toBeCloseTo(2_594.4, 2);
    for (const y of r.years) expect(y.totalTax).toBeCloseTo(first.totalTax, 6);
    expect(r.freezeCost.every((x) => x === 0)).toBe(true);
  });

  it("pay growth with frozen thresholds costs more than indexed thresholds", () => {
    const r = budgetChanges({ ...BASE, payGrowth: 3 });
    expect(r.freezeCost[4]).toBeGreaterThan(0);
    expect(r.years[4].salary).toBeCloseTo(45_000 * 1.03 ** 4, 6);
  });
});

describe("savings and property", () => {
  it("savings tax rises 2 points from 2027/28", () => {
    const r = budgetChanges({ ...BASE, savings: 3_000 });
    // Basic-rate: £1,000 PSA, £2,000 taxed at 20% then 22%.
    expect(r.years[0].savingsTax).toBeCloseTo(400, 6);
    expect(r.years[1].savingsTax).toBeCloseTo(440, 6);
    expect(r.ruleEffect[1].savings).toBeCloseTo(40, 6);
  });

  it("property rates rise 2 points and finance relief moves to 22%", () => {
    const r = budgetChanges({ ...BASE, property: 10_000, financeCosts: 4_000 });
    expect(r.years[0].propertyExtra).toBe(0);
    expect(r.years[1].propertyExtra).toBeCloseTo(200, 6);
    expect(r.years[0].financeRelief).toBeCloseTo(800, 6);
    expect(r.years[1].financeRelief).toBeCloseTo(880, 6);
    expect(r.ruleEffect[1].property).toBeCloseTo(120, 6);
  });

  it("Scotland keeps today's property rates", () => {
    const r = budgetChanges({ ...BASE, region: "scotland", property: 10_000 });
    expect(r.years[1].propertyExtra).toBe(0);
  });
});

describe("salary sacrifice cap", () => {
  it("charges NI above £2,000 from 2029/30", () => {
    const r = budgetChanges({ ...BASE, sacrificePct: 10 });
    expect(r.years[2].sacrificeNi).toBe(0);
    expect(r.years[3].sacrificeOverCap).toBeCloseTo(2_500, 6);
    expect(r.years[3].sacrificeNi).toBeCloseTo(200, 6);
    expect(r.years[3].employerNiExtra).toBeCloseTo(375, 6);
  });
});

describe("student loan and dividends", () => {
  it("Plan 2 at 9% above £29,385", () => {
    expect(yearResult({ ...BASE, plan: "plan2" }, 1).studentLoan).toBeCloseTo((45_000 - 29_385) * 0.09, 6);
  });

  it("dividend rise is 2 points on taxed dividends below the additional rate", () => {
    expect(dividendRise2026({ ...BASE, dividends: 5_500 })).toBeCloseTo(100, 6);
  });

  it("guards bad inputs", () => {
    const r = budgetChanges({ ...BASE, salary: NaN, payGrowth: Infinity });
    for (const y of r.years) expect(Number.isFinite(y.net)).toBe(true);
  });
});
