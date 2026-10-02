import { describe, expect, it } from "vitest";
import { bandsFor, councilBill } from "./council-tax-bands";
import { rentARoomCompare, singlePersonDiscountForDays } from "./discounts";
import { cgtDeadline, propertyCgt } from "./property-cgt";
import { rentVsBuy } from "./rent-vs-buy";
import { fullMovingBudget } from "./moving-budget";
import { incomeTax } from "../tax/2026-27";

const BILL = { nation: "england" as const, band: "D" as const, bandD: 2_000, adultsCounted: 2, disabledReduction: false, premiumPct: 0, instalments: 10 };

describe("council bill", () => {
  it("band ratios and discounts", () => {
    expect(councilBill(BILL).payable).toBe(2_000);
    expect(councilBill({ ...BILL, band: "A" }).payable).toBeCloseTo(2_000 * 6 / 9, 6);
    expect(councilBill({ ...BILL, adultsCounted: 1 }).payable).toBe(1_500);
    expect(councilBill({ ...BILL, adultsCounted: 0 }).payable).toBe(1_000);
    expect(councilBill(BILL).instalment).toBe(200);
  });
  it("disabled band reduction", () => {
    const r = councilBill({ ...BILL, disabledReduction: true });
    expect(r.billedBand).toBe("C");
    expect(r.payable).toBeCloseTo(2_000 * 8 / 9, 6);
    expect(councilBill({ ...BILL, band: "A", disabledReduction: true }).payable).toBeCloseTo(2_000 * 5 / 9, 6);
  });
  it("second home premium", () => {
    expect(councilBill({ ...BILL, premiumPct: 100 }).payable).toBe(4_000);
  });
  it("Wales has band I", () => {
    expect(bandsFor("wales")).toContain("I");
    expect(bandsFor("england")).not.toContain("I");
  });
});

describe("single person discount by days", () => {
  it("pro-rates", () => {
    const r = singlePersonDiscountForDays({ annualBill: 2_190, daysAlone: 73 });
    expect(r.discount).toBeCloseTo(2_190 * 0.25 * 0.2, 6);
  });
});

describe("rent a room", () => {
  const tax = (i: number) => incomeTax(i).total;
  it("tax-free under the allowance", () => {
    const r = rentARoomCompare({ receipts: 7_000, expenses: 1_000, shared: false, otherIncome: 30_000 }, tax);
    expect(r.schemeTax).toBe(0);
    expect(r.automatic).toBe(true);
  });
  it("taxes receipts above the allowance at your rate", () => {
    const r = rentARoomCompare({ receipts: 9_000, expenses: 1_000, shared: false, otherIncome: 30_000 }, tax);
    expect(r.schemeTax).toBeCloseTo(300, 6);
    expect(r.normalTax).toBeCloseTo(1_600, 6);
    expect(r.best).toBe("scheme");
  });
  it("halves when shared and prefers normal with high expenses", () => {
    const r = rentARoomCompare({ receipts: 6_000, expenses: 5_000, shared: true, otherIncome: 30_000 }, tax);
    expect(r.allowance).toBe(3_750);
    expect(r.best).toBe("normal");
  });
});

describe("property CGT", () => {
  const base = { salePrice: 350_000, purchasePrice: 220_000, buyingCosts: 5_000, sellingCosts: 5_000, improvements: 0, monthsOwned: 120, monthsLived: 0, owners: 1, income: 50_270, losses: 0 };
  it("buy-to-let gain at 24% for a higher-rate taxpayer", () => {
    const r = propertyCgt(base);
    expect(r.gain).toBe(120_000);
    expect(r.tax).toBeCloseTo((120_000 - 3_000) * 0.24, 6);
  });
  it("private residence relief with the final 9 months", () => {
    const r = propertyCgt({ ...base, monthsLived: 51 });
    expect(r.reliefShare).toBeCloseTo(0.5, 9);
    expect(r.chargeable).toBe(60_000);
  });
  it("lived there throughout means no tax", () => {
    expect(propertyCgt({ ...base, monthsLived: 120 }).tax).toBe(0);
  });
  it("joint owners each get an allowance", () => {
    const r = propertyCgt({ ...base, owners: 2 });
    expect(r.yourShare).toBe(60_000);
    expect(r.tax).toBeCloseTo(57_000 * 0.24, 6);
  });
  it("uses basic-rate band first", () => {
    const r = propertyCgt({ ...base, income: 30_000 });
    // Taxable income 17,430: basic band left 20,270.
    expect(r.basicRateGain).toBeCloseTo(20_270, 6);
  });
  it("deadline", () => {
    expect(cgtDeadline("2026-05-01")).toBe("2026-06-30");
  });
});

describe("rent vs buy", () => {
  const base = { price: 300_000, deposit: 30_000, ratePct: 4.5, termYears: 25, rent: 1_300, years: 10, houseGrowthPct: 3, rentGrowthPct: 3, investReturnPct: 5, maintenancePct: 1, buyingFees: 2_500, sellingPct: 1.5, firstTimeBuyer: true };
  it("starts equal and tracks both", () => {
    const r = rentVsBuy(base);
    expect(r.years[0].renterWealth).toBe(r.upfront);
    expect(r.years.length).toBe(11);
    expect(r.stampDuty).toBe(0);
  });
  it("zero growth and returns favours renting when rent is low", () => {
    const r = rentVsBuy({ ...base, houseGrowthPct: 0, rent: 600 });
    expect(r.advantage).toBeLessThan(0);
  });
  it("higher house growth favours buying", () => {
    const a = rentVsBuy(base).advantage;
    const b = rentVsBuy({ ...base, houseGrowthPct: 6 }).advantage;
    expect(b).toBeGreaterThan(a);
  });
});

describe("full moving budget", () => {
  it("buying and selling", () => {
    const r = fullMovingBudget({ price: 400_000, deposit: 60_000, nation: "england", buyer: "standard", legal: 1_500, survey: "homebuyer", mortgageFee: 999, removals: 1_000, salePrice: 300_000, agentPct: 1.2, sellingLegal: 1_200, saleMortgage: 150_000, furnishing: 0, contingencyPct: 0 });
    expect(r.propertyTax).toBe(10_000);
    expect(r.agentFee).toBeCloseTo(4_320, 6);
    expect(r.costs).toBeCloseTo(10_000 + 1_500 + 600 + 999 + 4_320 + 1_200 + 1_000, 6);
    expect(r.equityReleased).toBeCloseTo(300_000 - 150_000 - 5_520, 6);
  });
  it("Scotland and Wales taxes", () => {
    const b = { price: 300_000, deposit: 30_000, buyer: "standard" as const, legal: 0, survey: "none" as const, mortgageFee: 0, removals: 0, salePrice: 0, agentPct: 0, sellingLegal: 0, saleMortgage: 0, furnishing: 0, contingencyPct: 0 };
    expect(fullMovingBudget({ ...b, nation: "scotland" }).propertyTax).toBe(4_600);
    expect(fullMovingBudget({ ...b, nation: "wales" }).propertyTax).toBe(4_500);
  });
});
