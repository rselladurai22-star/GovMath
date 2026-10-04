import { describe, expect, it } from "vitest";
import { capitalGains2026, incomeTax2026 } from "./tax";

describe("income ordering", () => {
  it("matches plain income tax for salary only", () => {
    expect(incomeTax2026({ nonSavings: 50_000, savings: 0, dividends: 0 }).total).toBeCloseTo((50_000 - 12_570) * 0.2, 6);
    expect(incomeTax2026({ nonSavings: 60_000, savings: 0, dividends: 0 }).total).toBeCloseTo(37_700 * 0.2 + (60_000 - 50_270) * 0.4, 6);
  });
  it("starting rate for savings and PSA", () => {
    const r = incomeTax2026({ nonSavings: 14_000, savings: 6_000, dividends: 0 });
    // Non-savings taxable 1,430 → starting band 3,570, PSA 1,000, taxed 1,430 at 20%.
    expect(r.startingRateUsed).toBeCloseTo(3_570, 6);
    expect(r.psaUsed).toBe(1_000);
    expect(r.savingsTax).toBeCloseTo(1_430 * 0.2, 6);
  });
  it("higher-rate PSA is £500", () => {
    const r = incomeTax2026({ nonSavings: 60_000, savings: 2_000, dividends: 0 });
    expect(r.psa).toBe(500);
    expect(r.savingsTax).toBeCloseTo(1_500 * 0.4, 6);
  });
  it("dividends: allowance and rates", () => {
    const r = incomeTax2026({ nonSavings: 30_000, savings: 0, dividends: 5_000 });
    expect(r.dividendTax).toBeCloseTo(4_500 * 0.1075, 6);
    const h = incomeTax2026({ nonSavings: 60_000, savings: 0, dividends: 5_000 });
    expect(h.dividendTax).toBeCloseTo(4_500 * 0.3575, 6);
  });
  it("dividends straddling the higher-rate threshold", () => {
    const r = incomeTax2026({ nonSavings: 45_000, savings: 0, dividends: 10_000 });
    // Taxable non-savings 32,430; allowance takes 32,430–32,930; basic to 37,700.
    expect(r.dividendTax).toBeCloseTo((37_700 - 32_930) * 0.1075 + (42_430 - 37_700) * 0.3575, 6);
  });
  it("relief-at-source extends the bands", () => {
    const a = incomeTax2026({ nonSavings: 60_000, savings: 0, dividends: 0 });
    const b = incomeTax2026({ nonSavings: 60_000, savings: 0, dividends: 0, bandExtension: 10_000 });
    // Only the £9,730 above £50,270 was taxed at 40%, so that much moves to 20%.
    expect(a.total - b.total).toBeCloseTo((60_000 - 50_270) * 0.2, 6);
  });
  it("2027 savings rates", () => {
    expect(incomeTax2026({ nonSavings: 30_000, savings: 3_000, dividends: 0, savings2027: true }).savingsTax).toBeCloseTo(2_000 * 0.22, 6);
  });
});

describe("Capital Gains Tax", () => {
  it("18% within the basic band, 24% above", () => {
    const r = capitalGains2026({ nonSavings: 40_000, savings: 0, dividends: 0, gains: 23_000 });
    // Band left: 37,700 − 27,430 = 10,270.
    expect(r.taxableGains).toBe(20_000);
    expect(r.tax).toBeCloseTo(10_270 * 0.18 + 9_730 * 0.24, 6);
  });
  it("losses", () => {
    const r = capitalGains2026({ nonSavings: 60_000, savings: 0, dividends: 0, gains: 10_000, currentLosses: 2_000, broughtForward: 10_000 });
    expect(r.lossesUsedBroughtForward).toBe(5_000);
    expect(r.lossesCarriedForward).toBe(5_000);
    expect(r.tax).toBe(0);
  });
  it("BADR at 18% uses the basic band first", () => {
    const r = capitalGains2026({ nonSavings: 30_000, savings: 0, dividends: 0, gains: 50_000, reliefGains: 100_000 });
    expect(r.reliefTax).toBeCloseTo(100_000 * 0.18, 6);
    expect(r.atBasic).toBe(0);
    expect(r.atHigher).toBe(47_000);
  });
});
