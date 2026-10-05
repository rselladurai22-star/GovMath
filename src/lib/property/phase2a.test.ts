import { describe, expect, it } from "vitest";
import { affordability, depositForLtv, targetCheck } from "./affordability";
import { breakEvenSavingsRate, overpaymentPlan, pmt } from "./overpayment-plan";
import { sharedOwnership } from "./shared-ownership";
import { buyToLet, purchaseTax } from "./buy-to-let";

const AFF = { income1: 45_000, income2: 0, variable: 0, variableShare: 0.5, commitments: 0, multiple: 4.5, deposit: 40_000, ratePct: 4.5, termYears: 25, stressPts: 3 };

describe("affordability", () => {
  it("multiplies assessed income", () => {
    const r = affordability(AFF);
    expect(r.maxLoan).toBe(202_500);
    expect(r.maxPrice).toBe(242_500);
  });
  it("counts half of variable pay and deducts commitments", () => {
    const r = affordability({ ...AFF, variable: 10_000, commitments: 250 });
    expect(r.assessedIncome).toBe(50_000);
    expect(r.maxLoan).toBe((50_000 - 3_000) * 4.5);
  });
  it("stressed payment is higher", () => {
    const r = affordability(AFF);
    expect(r.stressedPayment).toBeGreaterThan(r.monthlyPayment);
    expect(r.paymentShare).toBeGreaterThan(0.2);
    expect(r.paymentShare).toBeLessThan(0.45);
  });
  it("never goes negative", () => {
    expect(affordability({ ...AFF, commitments: 10_000 }).maxLoan).toBe(0);
  });
  it("target and deposit helpers", () => {
    expect(targetCheck(300_000, 30_000, 60_000).multipleNeeded).toBe(4.5);
    expect(depositForLtv(300_000, 0.9)).toBeCloseTo(30_000, 6);
  });
});

describe("overpayment plan", () => {
  const base = { balance: 200_000, ratePct: 5, years: 25, monthly: 200, lump: 0, yearlyLump: 0, mode: "term" as const };
  it("£200 a month off £200,000 at 5% over 25 years ends 74 months early", () => {
    const a = overpaymentPlan(base);
    expect(a.newMonths).toBe(226);
    expect(a.interestSaved).toBeCloseTo(41_842.6, 0);
  });
  it("no overpayment saves nothing", () => {
    const a = overpaymentPlan({ ...base, monthly: 0 });
    expect(a.interestSaved).toBeCloseTo(0, 4);
    expect(a.newMonths).toBe(300);
  });
  it("payment mode keeps the term and lowers the payment", () => {
    const a = overpaymentPlan({ ...base, mode: "payment" });
    expect(a.newMonths).toBeGreaterThan(290);
    expect(a.paymentAfterYear).toBeLessThan(a.payment);
    const t = overpaymentPlan(base);
    expect(t.interestSaved).toBeGreaterThan(a.interestSaved);
  });
  it("lump sum and yearly lumps count towards overpaid totals", () => {
    const a = overpaymentPlan({ ...base, monthly: 0, lump: 10_000, yearlyLump: 1_000 });
    expect(a.firstYearOverpaid).toBe(10_000);
    expect(a.totalOverpaid).toBeGreaterThan(10_000);
  });
  it("pmt and break-even", () => {
    expect(pmt(120, 0, 12)).toBe(10);
    expect(breakEvenSavingsRate(4, 0.2)).toBeCloseTo(5, 6);
  });
});

const SO = { value: 300_000, sharePct: 40, depositPct: 10, ratePct: 5, termYears: 25, rentPct: 2.75, serviceCharge: 150, growthPct: 3, rentRisePct: 3, staircaseYear: 0, staircaseTo: 0, firstTimeBuyer: true };

describe("shared ownership", () => {
  it("splits mortgage and rent", () => {
    const r = sharedOwnership(SO);
    expect(r.sharePrice).toBe(120_000);
    expect(r.deposit).toBe(12_000);
    expect(r.loan).toBe(108_000);
    expect(r.rent).toBeCloseTo((180_000 * 0.0275) / 12, 6);
    expect(r.monthly).toBeCloseTo(r.mortgage + r.rent + 150, 6);
  });
  it("stamp duty choices for a first-time buyer", () => {
    const r = sharedOwnership(SO);
    expect(r.sdlt.onShare).toBe(0);
    expect(r.sdlt.marketValue).toBe(0);
    const big = sharedOwnership({ ...SO, value: 600_000 });
    expect(big.sdlt.ftbRelief).toBe(false);
    expect(big.sdlt.marketValue).toBe(20_000);
  });
  it("staircasing cost and rent after", () => {
    const r = sharedOwnership({ ...SO, staircaseYear: 5, staircaseTo: 75, growthPct: 0, rentRisePct: 0 });
    expect(r.staircase?.cost).toBeCloseTo(105_000, 6);
    expect(r.staircase?.rentAfter).toBeCloseTo((r.rent * 25) / 60, 6);
  });
});

const BTL = { price: 250_000, rent: 1_300, depositPct: 25, ratePct: 5, interestOnly: true, termYears: 25, agentPct: 10, voidWeeks: 2, costs: 1_500, otherIncome: 40_000, nation: "england" as const, scottishTaxpayer: false, buyingCosts: 2_000 };

describe("buy to let", () => {
  it("yields", () => {
    const r = buyToLet(BTL);
    expect(r.grossYield).toBeCloseTo(15_600 / 250_000, 9);
    expect(r.rentCollected).toBeCloseTo(15_000, 6);
    expect(r.netOperating).toBeCloseTo(15_000 - 1_500 - 1_500, 6);
  });
  it("section 24: tax on profit before interest, 20% credit", () => {
    const r = buyToLet(BTL);
    expect(r.interest).toBeCloseTo(187_500 * 0.05, 6);
    // £12,000 profit: £10,270 at 20% (to £50,270) and £1,730 at 40%.
    expect(r.taxBeforeCredit).toBeCloseTo(10_270 * 0.2 + 1_730 * 0.4, 4);
    expect(r.financeCredit).toBeCloseTo(0.2 * 9_375, 6);
  });
  it("purchase tax by nation and cash in", () => {
    expect(purchaseTax(250_000, "england")).toBe(15_000);
    expect(purchaseTax(250_000, "scotland")).toBe(2_100 + 20_000);
    expect(purchaseTax(250_000, "wales")).toBe(9_000 + 5_950 + 0);
    const r = buyToLet(BTL);
    expect(r.cashIn).toBe(62_500 + 15_000 + 2_000);
  });
  it("repayment mortgage repays some capital", () => {
    const r = buyToLet({ ...BTL, interestOnly: false });
    expect(r.capitalRepaid).toBeGreaterThan(0);
    expect(r.interest).toBeLessThan(9_375);
  });
  it("rental cover", () => {
    const r = buyToLet(BTL);
    expect(r.icr).toBeCloseTo(15_600 / (187_500 * 0.055), 6);
    expect(r.maxLoanByIcr).toBeCloseTo(15_600 / 1.25 / 0.055, 4);
  });
});
