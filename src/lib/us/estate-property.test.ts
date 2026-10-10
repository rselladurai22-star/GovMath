import { describe, expect, it } from "vitest";
import {
  annualGifting,
  breakEvenRate,
  closingCosts,
  contractorValue,
  ESTATE_2026,
  equivalentSalary,
  escrowCushion,
  estateTax,
  millsFromPct,
  propertyTax,
  propertyTaxPath,
  saleProceeds,
  stateDeathTax,
  tentativeTax,
  w2Value,
} from "./estate-property";

const ZERO = { gross: 0, debts: 0, expenses: 0, marital: 0, charitable: 0, stateDeathTax: 0, lifetimeGifts: 0, giftTaxPaid: 0, dsue: 0 };

describe("estate tax", () => {
  it("uses the §2001(c) schedule", () => {
    expect(tentativeTax(10_000)).toBe(1_800);
    expect(tentativeTax(1_000_000)).toBe(345_800);
    expect(tentativeTax(15_000_000)).toBe(5_945_800);
    expect(tentativeTax(-5)).toBe(0);
  });
  it("owes nothing up to the $15 million exclusion", () => {
    expect(ESTATE_2026.exclusion).toBe(15_000_000);
    const r = estateTax({ ...ZERO, gross: 15_000_000 });
    expect(r.tax).toBe(0);
    expect(r.exclusionLeft).toBe(0);
    expect(estateTax({ ...ZERO, gross: 10_000_000 }).exclusionLeft).toBe(5_000_000);
  });
  it("taxes the excess at 40%", () => {
    const r = estateTax({ ...ZERO, gross: 20_000_000, debts: 500_000, expenses: 300_000 });
    expect(r.taxableEstate).toBe(19_200_000);
    expect(r.tax).toBeCloseTo(1_680_000, 6);
    expect(r.toHeirs).toBeCloseTo(17_520_000, 6);
  });
  it("adds lifetime gifts back and subtracts gift tax paid", () => {
    const r = estateTax({ ...ZERO, gross: 20_000_000, debts: 500_000, expenses: 300_000, lifetimeGifts: 2_000_000 });
    expect(r.tax).toBeCloseTo(2_480_000, 6);
    const paid = estateTax({ ...ZERO, gross: 10_000_000, lifetimeGifts: 16_000_000, giftTaxPaid: 400_000 });
    expect(paid.tax).toBeCloseTo(0.4 * 11_000_000 - 400_000, 6);
  });
  it("marital and charitable deductions and portability lower the tax", () => {
    expect(estateTax({ ...ZERO, gross: 30_000_000, marital: 30_000_000 }).tax).toBe(0);
    expect(estateTax({ ...ZERO, gross: 40_000_000, dsue: 13_990_000 }).tax).toBeCloseTo(4_404_000, 6);
    // DSUE can't exceed the basic exclusion.
    expect(estateTax({ ...ZERO, gross: 40_000_000, dsue: 99_000_000 }).exclusion).toBe(30_000_000);
  });
  it("never goes negative when deductions exceed the estate", () => {
    const r = estateTax({ ...ZERO, gross: 1_000_000, debts: 2_000_000 });
    expect(r.taxableEstate).toBe(0);
    expect(r.toHeirs).toBe(0);
  });
  it("annual gifting", () => {
    expect(annualGifting(4, 10, false)).toBe(760_000);
    expect(annualGifting(4, 10, true)).toBe(1_520_000);
    expect(annualGifting(4, 10, false, 50_000)).toBe(760_000);
  });
  it("lists state death taxes", () => {
    expect(stateDeathTax("MA")?.estateExemption).toBe(2_000_000);
    expect(stateDeathTax("MD")?.kind).toBe("both");
    expect(stateDeathTax("PA")?.kind).toBe("inheritance");
    expect(stateDeathTax("TX")).toBeUndefined();
  });
});

const W = { salary: 100_000, premiumShare: 1_440, matchPct: 4, otherBenefits: 0, status: "single" as const, state: "TX" };
const C = { rate: 75, billableHours: 32, weeks: 46, expenses: 5_000, premium: 9_325, retirement: 4_000, qbi: true, status: "single" as const, state: "TX" };

describe("1099 vs W-2", () => {
  it("values the W-2 job", () => {
    const r = w2Value(W);
    expect(r.fica).toBeCloseTo(98_560 * 0.0765, 6);
    expect(r.federal).toBeCloseTo(12_853.2, 2);
    expect(r.net).toBeCloseTo(82_166.96, 2);
  });
  it("values the contract", () => {
    const r = contractorValue(C);
    expect(r.gross).toBe(110_400);
    expect(r.seTax).toBeCloseTo(14_892.55, 2);
    expect(r.qbi).toBeCloseTo(13_705.75, 2);
    expect(r.federal).toBeCloseTo(6_773.06, 2);
    expect(r.net).toBeCloseTo(74_409.4, 2);
  });
  it("QBI raises the contractor's net", () => {
    expect(contractorValue({ ...C, qbi: false }).net).toBeLessThan(contractorValue(C).net);
  });
  it("finds the break-even rate and equivalent salary", () => {
    const be = breakEvenRate(W, C);
    expect(contractorValue({ ...C, rate: be }).net).toBeCloseTo(w2Value(W).net, 2);
    expect(be).toBeCloseTo(82.58, 1);
    const eq = equivalentSalary(W, C);
    expect(w2Value({ ...W, salary: eq }).net).toBeCloseTo(contractorValue(C).net, 2);
  });
  it("handles zero billable time", () => {
    expect(breakEvenRate(W, { ...C, weeks: 0 })).toBe(Infinity);
    expect(contractorValue({ ...C, weeks: 0 }).gross).toBe(0);
  });
});

describe("property tax", () => {
  const P = { value: 400_000, mode: "rate" as const, ratePct: 0.89, mills: 0, assessmentPct: 100, homestead: 0, senior: 0, otherExemption: 0, credits: 0 };
  it("applies an effective rate", () => {
    expect(propertyTax(P).tax).toBeCloseTo(3_560, 6);
    expect(propertyTax({ ...P, homestead: 50_000, ratePct: 0.75 }).tax).toBeCloseTo(2_625, 6);
  });
  it("applies mills to assessed value less exemptions", () => {
    const r = propertyTax({ ...P, value: 350_000, mode: "mill", mills: 60, assessmentPct: 40, homestead: 25_000 });
    expect(r.assessed).toBe(140_000);
    expect(r.tax).toBeCloseTo(6_900, 6);
    expect(r.saved).toBeCloseTo(1_500, 6);
    expect(millsFromPct(1.5)).toBe(15);
  });
  it("caps exemptions and credits at the bill", () => {
    expect(propertyTax({ ...P, homestead: 999_999 }).tax).toBe(0);
    expect(propertyTax({ ...P, credits: 10_000 }).tax).toBe(0);
  });
  it("projects and cushions", () => {
    const path = propertyTaxPath(P, 3, 10);
    expect(path).toHaveLength(11);
    expect(path[10]).toBeCloseTo(3_560 * 1.03 ** 10, 6);
    expect(escrowCushion(3_600)).toBe(600);
  });
});

describe("closing costs", () => {
  const CL = { price: 400_000, downPct: 10, ratePct: 7.25, years: 30, originationPct: 0.5, points: 0, lenderFees: 1_200, appraisal: 650, titlePct: 0.5, settlement: 800, recording: 150, transferPct: 0, mortgageTaxPct: 0, inspection: 450, prepaidDays: 15, insuranceYear: 1_800, propertyTaxYear: 3_560, taxMonths: 3, insuranceMonths: 2, sellerCredit: 0, lenderCredit: 0, earnest: 0 };
  it("adds up each group", () => {
    const r = closingCosts(CL);
    expect(r.loan).toBe(360_000);
    expect(r.lender).toBe(3_000);
    expect(r.services).toBe(3_900);
    expect(r.prepaids).toBeCloseTo(1_800 + (360_000 * 0.0725 * 15) / 365, 6);
    expect(r.escrow).toBeCloseTo(1_190, 6);
    expect(r.total).toBeCloseTo(11_112.6, 1);
    expect(r.cashToClose).toBeCloseTo(51_112.6, 1);
    expect(r.payment).toBeCloseTo(2_455.83, 2);
  });
  it("credits and earnest money lower the cash to close", () => {
    expect(closingCosts({ ...CL, sellerCredit: 6_000 }).cashToClose).toBeCloseTo(45_112.6, 1);
    expect(closingCosts({ ...CL, sellerCredit: 99_000 }).net).toBe(0);
    expect(closingCosts({ ...CL, earnest: 8_000 }).cashToClose).toBeCloseTo(43_112.6, 1);
  });
  it("cash purchase has no loan costs", () => {
    const r = closingCosts({ ...CL, downPct: 100 });
    expect(r.loan).toBe(0);
    expect(r.payment).toBe(0);
    expect(r.items.find((x) => x.label === "Appraisal")?.amount).toBe(0);
  });
});

describe("home sale proceeds", () => {
  const S = { price: 450_000, payoff: 250_000, listingPct: 2.5, buyerAgentPct: 2.5, concessions: 0, transferPct: 0, otherPct: 1, prep: 0, taxProration: 0, purchase: 300_000, improvements: 20_000, mainHome: true, longTerm: true, status: "mfj" as const, otherIncome: 120_000, state: "TX" };
  it("nets out costs and the payoff", () => {
    const r = saleProceeds(S);
    expect(r.sellingCosts).toBe(27_000);
    expect(r.proceeds).toBe(173_000);
    expect(r.gain).toBe(103_000);
    expect(r.taxableGain).toBe(0);
    expect(r.walkAway).toBe(173_000);
  });
  it("taxes the gain above the exclusion", () => {
    const r = saleProceeds({ ...S, price: 1_200_000, purchase: 400_000, payoff: 300_000, status: "single" });
    expect(r.excluded).toBe(250_000);
    expect(r.taxableGain).toBe(458_000);
    // 15%/20% stacked on $103,900 of ordinary taxable income, plus 3.8% NIIT on $378,000.
    expect(r.federalTax).toBeCloseTo(441_600 * 0.15 + 16_400 * 0.2 + 378_000 * 0.038, 2);
    expect(saleProceeds({ ...S, price: 1_200_000, purchase: 400_000, payoff: 300_000, status: "single", state: "CA" }).stateTax).toBeGreaterThan(0);
  });
  it("taxes a rental or short-term sale in full", () => {
    expect(saleProceeds({ ...S, mainHome: false }).federalTax).toBeCloseTo(13_785, 2);
    expect(saleProceeds({ ...S, mainHome: false, longTerm: false }).federalTax).toBeGreaterThan(13_785);
  });
  it("shows a shortfall when underwater", () => {
    const r = saleProceeds({ ...S, price: 300_000, payoff: 290_000 });
    expect(r.proceeds).toBe(-8_000);
    expect(r.gain).toBe(0);
  });
});
