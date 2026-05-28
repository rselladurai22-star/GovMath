import { describe, expect, it } from "vitest";
import { soleTraderTax } from "./sole-trader";

const round = (n: number) => Math.round(n * 100) / 100;

describe("soleTraderTax (2025/26)", () => {
  it("profit at PA → no tax, no NI", () => {
    const r = soleTraderTax(12_570);
    expect(r.incomeTax).toBe(0);
    expect(r.class4NI).toBe(0);
    expect(r.totalTax).toBe(0);
    expect(r.netProfit).toBe(12_570);
  });

  it("£30,000 profit → both IT and Class 4 NI", () => {
    const r = soleTraderTax(30_000);
    // Taxable income = 30000 − 12570 = 17430 × 20% = 3486
    expect(round(r.incomeTax)).toBe(3486);
    // Class 4 NI = (30000 − 12570) × 6% = 1045.80
    expect(round(r.class4NI)).toBe(round(17_430 * 0.06));
    expect(round(r.netProfit)).toBe(round(30_000 - r.totalTax));
  });

  it("profits ≥ SPT (£6,725) get automatic NI credit", () => {
    expect(soleTraderTax(7_000).getsAutomaticNICredit).toBe(true);
    expect(soleTraderTax(6_000).getsAutomaticNICredit).toBe(false);
  });

  it("£100k profit triggers higher-rate IT", () => {
    const r = soleTraderTax(100_000);
    expect(r.totalTax).toBeGreaterThan(20_000);
    expect(r.effectiveRate).toBeGreaterThan(0.27);
  });
});
