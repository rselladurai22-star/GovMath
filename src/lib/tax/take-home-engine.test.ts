import { describe, expect, it } from "vitest";
import {
  computeTakeHome,
  marginalRate,
  studentLoanRepayment,
  nextThreshold,
} from "./take-home-engine";

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

  it("applies Plan 2 student loan at 9% above £28,470", () => {
    expect(studentLoanRepayment(38470, "plan2")).toBeCloseTo(900, 2);
    expect(studentLoanRepayment(20000, "plan2")).toBe(0);
    const s = computeTakeHome({ gross: 40000, bonus: 0, pensionPct: 0, plan: "plan2" });
    expect(s.studentLoan).toBeCloseTo((40000 - 28470) * 0.09, 2);
  });

  it("surfaces the 60% marginal trap between £100k and £125,140", () => {
    const inTrap = marginalRate({ gross: 110000, bonus: 0, pensionPct: 0, plan: "none" });
    const belowTrap = marginalRate({ gross: 60000, bonus: 0, pensionPct: 0, plan: "none" });
    expect(inTrap).toBeGreaterThan(0.58);
    expect(inTrap).toBeLessThan(0.63);
    expect(belowTrap).toBeCloseTo(0.42, 2); // 40% tax + 2% NI
  });

  it("reports distance to the next threshold", () => {
    const n = nextThreshold(45000);
    expect(n?.at).toBe(50270);
    expect(n?.away).toBeCloseTo(5270, 2);
  });
});
