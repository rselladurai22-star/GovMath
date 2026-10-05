import { describe, expect, it } from "vitest";
import { computeTakeHome, marginalRate, studentLoanRepayment, taxBands } from "./take-home-engine";

describe("take-home engine", () => {
  it("matches the headline calc when there is no pension/loan/bonus", () => {
    const s = computeTakeHome({ gross: 35000, bonus: 0, pensionPct: 0, plan: "none" });
    // £35k: PA 12,570; tax on 22,430 @20% = 4,486; NI on 22,430 @8% = 1,794.40
    expect(s.incomeTax.total).toBeCloseTo(4486, 2);
    expect(s.ni.total).toBeCloseTo(1794.4, 2);
    expect(s.takeHome).toBeCloseTo(35000 - 4486 - 1794.4, 2);
    expect(s.studentLoan).toBe(0);
  });

  it("salary sacrifice lowers the assessed gross before tax and NI", () => {
    const base = computeTakeHome({ gross: 50000, bonus: 0, pensionPct: 0, plan: "none" });
    const sac = computeTakeHome({ gross: 50000, bonus: 0, pensionPct: 10, plan: "none" });
    expect(sac.pensionContribution).toBeCloseTo(5000, 2);
    expect(sac.adjustedGross).toBeCloseTo(45000, 2);
    // Sacrificing £5k should cost less than £5k in take-home (tax + NI saved).
    const takeHomeDrop = base.takeHome - sac.takeHome;
    expect(takeHomeDrop).toBeGreaterThan(0);
    expect(takeHomeDrop).toBeLessThan(5000);
  });

  it("applies Plan 2 student loan at 9% above £29,385", () => {
    expect(studentLoanRepayment(39385, "plan2")).toBeCloseTo(900, 2);
    expect(studentLoanRepayment(20000, "plan2")).toBe(0);
    const s = computeTakeHome({ gross: 40000, bonus: 0, pensionPct: 0, plan: "plan2" });
    expect(s.studentLoan).toBeCloseTo((40000 - 29385) * 0.09, 2);
  });

  it("surfaces the 60% marginal trap between £100k and £125,140", () => {
    const inTrap = marginalRate({ gross: 110000, bonus: 0, pensionPct: 0, plan: "none" });
    const belowTrap = marginalRate({ gross: 60000, bonus: 0, pensionPct: 0, plan: "none" });
    expect(inTrap).toBeGreaterThan(0.58);
    expect(inTrap).toBeLessThan(0.63);
    expect(belowTrap).toBeCloseTo(0.42, 2); // 40% tax + 2% NI
  });

});

describe("region-aware tax", () => {
  it("defaults to England, Wales & NI", () => {
    const s = computeTakeHome({ gross: 35000, bonus: 0, pensionPct: 0, plan: "none" });
    expect(s.incomeTaxTotal).toBeCloseTo(4486, 2);
  });

  it("uses Scottish bands when asked", () => {
    // £35k in Scotland: 3,967 @19% + 12,989 @20% + 5,474 @21% = 4,501.07.
    const s = computeTakeHome({ gross: 35000, bonus: 0, pensionPct: 0, plan: "none", region: "scotland" });
    expect(s.incomeTaxTotal).toBeCloseTo(4501.07, 2);
    expect(s.takeHome).toBeCloseTo(35000 - 4501.07 - 1794.4, 2);
  });

  it("Scottish marginal rate on £60k is 42% tax + 2% NI", () => {
    expect(marginalRate({ gross: 60000, bonus: 0, pensionPct: 0, plan: "none", region: "scotland" })).toBeCloseTo(0.44, 2);
  });
});

describe("taxBands", () => {
  it("splits £60k into allowance, basic and higher bands that sum to the total", () => {
    const bands = taxBands(60000);
    expect(bands.map((b) => b.label)).toEqual(["Tax-free allowance", "Basic rate", "Higher rate"]);
    expect(bands[0].income).toBe(12570);
    expect(bands[1].income).toBeCloseTo(37700, 2);
    expect(bands[2].income).toBeCloseTo(60000 - 50270, 2);
    const total = bands.reduce((a, b) => a + b.tax, 0);
    expect(total).toBeCloseTo(computeTakeHome({ gross: 60000, bonus: 0, pensionPct: 0, plan: "none" }).incomeTaxTotal, 2);
  });

  it("covers every Scottish band used", () => {
    const bands = taxBands(35000, "scotland");
    expect(bands.map((b) => b.label)).toEqual(["Tax-free allowance", "Starter rate", "Basic rate", "Intermediate rate"]);
    expect(bands.reduce((a, b) => a + b.income, 0)).toBeCloseTo(35000, 2);
  });

  it("keeps the allowance row even on a zero salary", () => {
    expect(taxBands(0)).toEqual([{ label: "Tax-free allowance", rate: 0, income: 0, tax: 0 }]);
  });
});
