import { describe, expect, it } from "vitest";
import { annuity, compareSavings, drawdown, juniorIsa, psaTax } from "./savings";

describe("Fixed versus easy access", () => {
  it("compounds and taxes interest above the allowance", () => {
    const r = compareSavings({ amount: 20_000, easyRate: 0.035, fixedRate: 0.042, years: 2, atMaturity: false, otherIncome: 30_000, scotland: false, rates2027: false, isa: false });
    expect(r.fixedInterest).toBeCloseTo(20_000 * (1.042 ** 2 - 1), 6);
    expect(r.fixedTax).toBe(0);
    const big = compareSavings({ amount: 50_000, easyRate: 0.035, fixedRate: 0.042, years: 2, atMaturity: true, otherIncome: 30_000, scotland: false, rates2027: false, isa: false });
    expect(big.fixedTax).toBeCloseTo((50_000 * (1.042 ** 2 - 1) - 1000) * 0.2, 2);
    expect(compareSavings({ amount: 50_000, easyRate: 0.035, fixedRate: 0.042, years: 2, atMaturity: true, otherIncome: 30_000, scotland: false, rates2027: false, isa: true }).fixedTax).toBe(0);
  });
});

describe("Personal Savings Allowance", () => {
  it("gives basic-rate taxpayers £1,000", () => {
    const r = psaTax({ nonSavings: 30_000, savings: 1_500, dividends: 0, scotland: false, rates2027: false });
    expect(r.psa).toBe(1000);
    expect(r.tax).toBeCloseTo(100, 6);
    expect(r.tax2027).toBeCloseTo(110, 6);
    expect(r.headroom).toBe(1000);
  });
  it("uses the starting rate on low income", () => {
    const r = psaTax({ nonSavings: 14_000, savings: 5_000, dividends: 0, scotland: false, rates2027: false });
    expect(r.startingRate).toBeCloseTo(3_570, 6);
    expect(r.tax).toBeCloseTo((5_000 - 3_570 - 1_000) * 0.2, 6);
    expect(r.headroom).toBe(4_570);
  });
  it("gives higher-rate taxpayers £500", () => {
    expect(psaTax({ nonSavings: 60_000, savings: 1_000, dividends: 0, scotland: false, rates2027: false }).tax).toBeCloseTo(200, 6);
  });
});

describe("Junior ISA", () => {
  it("grows monthly saving to 18", () => {
    const r = juniorIsa({ lump: 0, monthly: 100, childAge: 0, growth: 0, fees: 0 });
    expect(r.value).toBeCloseTo(21_600, 6);
    expect(juniorIsa({ lump: 9_000, monthly: 100, childAge: 0, growth: 0.05, fees: 0 }).overAllowance).toBe(true);
  });
});

describe("Drawdown and annuity", () => {
  it("takes the lump sum and runs a pot down", () => {
    const r = drawdown({ pot: 200_000, age: 66, taxFree: "upfront", withdrawal: 10_000, growth: 0, inflation: 0, statePension: 12_547.6, spAge: 66, otherIncome: 0, scotland: false });
    expect(r.lumpSum).toBe(50_000);
    expect(r.runsOutAt).toBe(81);
    expect(r.firstYear?.tax).toBeCloseTo((12_547.6 + 10_000 - 12_570) * 0.2, 2);
  });
  it("caps the lump sum at the allowance", () => {
    expect(drawdown({ pot: 2_000_000, age: 60, taxFree: "upfront", withdrawal: 0, growth: 0, inflation: 0, statePension: 0, spAge: 67, otherIncome: 0, scotland: false }).lumpSum).toBe(268_275);
  });
  it("prices a level annuity", () => {
    const a = annuity({ pot: 100_000, takeTaxFree: true, rate: 0.075, escalation: 0, age: 66, statePension: 12_547.6, otherIncome: 0, scotland: false });
    expect(a.gross).toBeCloseTo(5_625, 6);
    expect(a.paybackYears).toBeCloseTo(75_000 / 5_625, 6);
  });
});
