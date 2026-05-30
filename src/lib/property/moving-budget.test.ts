import { describe, it, expect } from "vitest";
import { movingBudget } from "./moving-budget";

describe("movingBudget", () => {
  it("sums all components", () => {
    const r = movingBudget({
      stampDuty: 5000,
      legalFees: 1500,
      surveyLevel: "homebuyer",
      mortgageFee: 999,
      removals: 800,
      epc: 60,
      agentFee: 0,
      contingencyPercent: 0,
    });
    // 5000 + 1500 + 600 + 999 + 800 + 60 = 8959
    expect(r.total).toBe(8959);
    expect(r.surveyCost).toBe(600);
  });

  it("applies contingency on top of subtotal", () => {
    const r = movingBudget({
      stampDuty: 0,
      legalFees: 1000,
      surveyLevel: "none",
      mortgageFee: 0,
      removals: 0,
      epc: 0,
      agentFee: 0,
      contingencyPercent: 10,
    });
    expect(r.contingency).toBe(100);
    expect(r.total).toBe(1100);
  });

  it("clamps negative inputs", () => {
    const r = movingBudget({
      stampDuty: -100,
      legalFees: 500,
      surveyLevel: "basic",
      mortgageFee: -50,
      removals: 0,
      epc: 0,
      agentFee: 0,
      contingencyPercent: 0,
    });
    expect(r.total).toBe(900); // 500 + 400 basic survey
  });
});
