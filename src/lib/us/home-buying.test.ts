import { describe, expect, it } from "vitest";
import {
  downPaymentOptions,
  fhaAnnualMip,
  fhaLoan,
  fhaMinDownPct,
  irr,
  monthlyToSave,
  monthsToSave,
  rentalProperty,
  rentVsBuy,
  vaFundingFeePct,
  vaLoan,
  vaResidualIncome,
  type RentBuyInput,
  type RentalInput,
} from "./home-buying";
import { monthlyPayment } from "./loans";

describe("saving for a down payment", () => {
  it("is immediate when the target is already saved", () => {
    expect(monthsToSave(10_000, 12_000, 500, 4)).toBe(0);
  });
  it("matches simple division at 0%", () => {
    expect(monthsToSave(12_000, 0, 1_000, 0)).toBe(12);
    expect(monthlyToSave(12_000, 0, 12, 0)).toBeCloseTo(1_000, 6);
  });
  it("interest shortens the time and lowers the deposit", () => {
    expect(monthsToSave(40_000, 5_000, 1_000, 4)).toBeLessThan(35);
    expect(monthlyToSave(40_000, 5_000, 35, 4)).toBeLessThan(1_000);
  });
  it("monthlyToSave and monthsToSave agree", () => {
    const dep = monthlyToSave(50_000, 2_000, 48, 4);
    expect(monthsToSave(50_000, 2_000, dep + 0.01, 4)).toBe(48);
  });
  it("is Infinity with no deposits and no savings", () => {
    expect(monthsToSave(10_000, 0, 0, 4)).toBe(Infinity);
  });
});

describe("FHA", () => {
  it("minimum down by credit score", () => {
    expect(fhaMinDownPct(620)).toBe(3.5);
    expect(fhaMinDownPct(580)).toBe(3.5);
    expect(fhaMinDownPct(579)).toBe(10);
    expect(fhaMinDownPct(500)).toBe(10);
    expect(fhaMinDownPct(499)).toBeNull();
  });
  it("annual MIP table (ML 2023-05)", () => {
    expect(fhaAnnualMip(386_000, 0.965, 30)).toEqual({ rate: 0.0055, elevenYears: false });
    expect(fhaAnnualMip(380_000, 0.95, 30)).toEqual({ rate: 0.005, elevenYears: false });
    expect(fhaAnnualMip(360_000, 0.9, 30)).toEqual({ rate: 0.005, elevenYears: true });
    expect(fhaAnnualMip(800_000, 0.965, 30)).toEqual({ rate: 0.0075, elevenYears: false });
    expect(fhaAnnualMip(800_000, 0.9, 30)).toEqual({ rate: 0.007, elevenYears: true });
    expect(fhaAnnualMip(386_000, 0.965, 15)).toEqual({ rate: 0.004, elevenYears: false });
    expect(fhaAnnualMip(360_000, 0.9, 15)).toEqual({ rate: 0.0015, elevenYears: true });
    expect(fhaAnnualMip(800_000, 0.78, 15)).toEqual({ rate: 0.0015, elevenYears: true });
    expect(fhaAnnualMip(800_000, 0.85, 15)).toEqual({ rate: 0.004, elevenYears: true });
    expect(fhaAnnualMip(800_000, 0.95, 15)).toEqual({ rate: 0.0065, elevenYears: false });
  });
  it("finances the 1.75% upfront MIP and charges MIP for life at 3.5% down", () => {
    const f = fhaLoan({ price: 400_000, downPct: 3.5, aprPct: 7, years: 30, propertyTax: 4_000, insurance: 1_800, hoa: 0, financeUfmip: true });
    expect(f.baseLoan).toBe(386_000);
    expect(f.ufmip).toBeCloseTo(6_755, 6);
    expect(f.loan).toBeCloseTo(392_755, 6);
    expect(f.principalAndInterest).toBeCloseTo(monthlyPayment(392_755, 7, 360), 6);
    expect(f.mipMonths).toBe(360);
    // First-year MIP: 0.55% of the average balance, a little under 0.55% of the base loan.
    expect(f.mipMonthly).toBeLessThan((386_000 * 0.0055) / 12);
    expect(f.mipMonthly).toBeGreaterThan((380_000 * 0.0055) / 12);
    expect(f.mipByYear.length).toBe(30);
    expect(f.total).toBeCloseTo(f.principalAndInterest + f.mipMonthly + 4_000 / 12 + 150, 6);
    expect(f.cashForLoan).toBe(14_000);
  });
  it("stops MIP after 11 years at 10% down", () => {
    const f = fhaLoan({ price: 400_000, downPct: 10, aprPct: 7, years: 30, propertyTax: 0, insurance: 0, hoa: 0, financeUfmip: false });
    expect(f.mipMonths).toBe(132);
    expect(f.mipByYear[10]).toBeGreaterThan(0);
    expect(f.mipByYear[11]).toBe(0);
    expect(f.loan).toBe(360_000);
    expect(f.cashForLoan).toBeCloseTo(40_000 + 6_300, 6);
  });
});

describe("VA", () => {
  it("funding fee tiers", () => {
    expect(vaFundingFeePct(0, true, false)).toBe(2.15);
    expect(vaFundingFeePct(0, false, false)).toBe(3.3);
    expect(vaFundingFeePct(0.05, false, false)).toBe(1.5);
    expect(vaFundingFeePct(0.0999, true, false)).toBe(1.5);
    expect(vaFundingFeePct(0.1, true, false)).toBe(1.25);
    expect(vaFundingFeePct(0, true, true)).toBe(0);
  });
  it("finances the fee into the loan", () => {
    const v = vaLoan({ price: 400_000, down: 0, aprPct: 6.75, years: 30, firstUse: true, exempt: false, financeFee: true, propertyTax: 0, insurance: 0, hoa: 0 });
    expect(v.fee).toBeCloseTo(8_600, 6);
    expect(v.loan).toBeCloseTo(408_600, 6);
    expect(v.feeInterest).toBeGreaterThan(0);
    expect(v.cashForLoan).toBe(0);
    const cash = vaLoan({ price: 400_000, down: 0, aprPct: 6.75, years: 30, firstUse: true, exempt: false, financeFee: false, propertyTax: 0, insurance: 0, hoa: 0 });
    expect(cash.loan).toBe(400_000);
    expect(cash.cashForLoan).toBeCloseTo(8_600, 6);
  });
  it("residual income guide", () => {
    expect(vaResidualIncome(1, 0)).toBe(450);
    expect(vaResidualIncome(4, 3)).toBe(1_117);
    expect(vaResidualIncome(7, 2)).toBe(1_039 + 160);
  });
});

describe("down payment options", () => {
  const base = { price: 400_000, aprPct: 7.25, fhaAprPct: 7.25, years: 30, pmiRate: 0.005, propertyTax: 3_560, insurance: 1_800, hoa: 0, closingShare: 0.03 };
  it("lists five options; 20% has no PMI and FHA has life MIP", () => {
    const rows = downPaymentOptions(base);
    expect(rows.map((r) => r.key)).toEqual(["c3", "f35", "c5", "c10", "c20"]);
    const c20 = rows.find((r) => r.key === "c20")!;
    expect(c20.insuranceMonthly).toBe(0);
    expect(c20.cashToClose).toBe(80_000 + 12_000);
    const fha = rows.find((r) => r.key === "f35")!;
    expect(fha.insuranceForLife).toBe(true);
    expect(fha.loan).toBeCloseTo(386_000 * 1.0175, 6);
    // Bigger down payment, smaller payment.
    expect(rows.find((r) => r.key === "c3")!.total).toBeGreaterThan(rows.find((r) => r.key === "c10")!.total);
  });
  it("adds a custom percentage", () => {
    const rows = downPaymentOptions(base, 15);
    expect(rows.some((r) => r.key === "custom" && r.pct === 15)).toBe(true);
  });
});

describe("rent vs buy", () => {
  const input: RentBuyInput = {
    price: 400_000,
    downPct: 20,
    aprPct: 7,
    years: 30,
    buyClosingPct: 3,
    sellCostPct: 6,
    taxRatePct: 1,
    insurance: 1_800,
    hoa: 0,
    maintenancePct: 1,
    pmiPct: 0.5,
    appreciationPct: 3,
    costGrowthPct: 3,
    rent: 2_200,
    rentGrowthPct: 3,
    rentersInsurance: 180,
    investReturnPct: 6,
    gainsTaxPct: 15,
    stay: 15,
  };
  it("returns a year per year of the stay and a consistent final figure", () => {
    const r = rentVsBuy(input);
    expect(r.years.length).toBe(15);
    expect(r.final.year).toBe(15);
    expect(r.upfront).toBe(80_000 + 12_000);
    expect(r.advantage).toBeCloseTo(r.final.buyNetWorth - r.final.rentNetWorth, 6);
    // Year one: selling costs and closing costs put buying behind.
    expect(r.years[0].buyNetWorth).toBeLessThan(r.years[0].rentNetWorth);
  });
  it("cheap rent makes renting win; high rent makes buying win sooner", () => {
    const cheap = rentVsBuy({ ...input, rent: 1_000 });
    expect(cheap.breakEvenYear).toBeNull();
    const dear = rentVsBuy({ ...input, rent: 3_500 });
    const mid = rentVsBuy(input);
    expect(dear.breakEvenYear).not.toBeNull();
    if (mid.breakEvenYear !== null) expect(dear.breakEvenYear!).toBeLessThanOrEqual(mid.breakEvenYear);
  });
  it("with no growth and no returns, the buyer's equity equals principal repaid less costs", () => {
    const r = rentVsBuy({ ...input, appreciationPct: 0, investReturnPct: 0, gainsTaxPct: 0, sellCostPct: 0, stay: 1 });
    const y = r.years[0];
    expect(y.homeValue).toBeCloseTo(400_000, 6);
    expect(y.rentNetWorth + y.buyNetWorth).toBeGreaterThan(0);
  });
});

describe("rental property", () => {
  const input: RentalInput = {
    price: 300_000,
    downPct: 25,
    closingCosts: 9_000,
    rehab: 0,
    aprPct: 7.5,
    years: 30,
    rent: 2_500,
    otherIncome: 0,
    vacancyPct: 5,
    managementPct: 8,
    maintenancePct: 5,
    capexPct: 5,
    propertyTax: 3_600,
    insurance: 1_500,
    hoa: 0,
    utilities: 0,
    appreciationPct: 3,
    rentGrowthPct: 3,
    expenseGrowthPct: 3,
    hold: 10,
    sellCostPct: 6,
    landPct: 20,
  };
  it("works out NOI, cap rate, cash-on-cash and DSCR", () => {
    const r = rentalProperty(input);
    const gross = 30_000;
    const eff = gross * 0.95;
    const exp = eff * 0.08 + gross * 0.05 + gross * 0.05 + 3_600 + 1_500;
    expect(r.noi).toBeCloseTo(eff - exp, 6);
    expect(r.capRate).toBeCloseTo(r.noi / 300_000, 9);
    const ds = monthlyPayment(225_000, 7.5, 360) * 12;
    expect(r.debtService).toBeCloseTo(ds, 6);
    expect(r.cashFlow).toBeCloseTo(r.noi - ds, 6);
    expect(r.cashInvested).toBe(75_000 + 9_000);
    expect(r.cashOnCash).toBeCloseTo((r.noi - ds) / 84_000, 9);
    expect(r.dscr).toBeCloseTo(r.noi / ds, 9);
    expect(r.onePercent).toBeCloseTo(2_500 / 300_000, 9);
  });
  it("depreciates the building over 27.5 years with a mid-month first year", () => {
    const r = rentalProperty(input);
    const basis = 309_000 * 0.8;
    expect(r.depreciationYear).toBeCloseTo(basis / 27.5, 6);
    expect(r.years[0].depreciation).toBeCloseTo(((basis / 27.5) * 11.5) / 12, 6);
    expect(r.years[1].depreciation).toBeCloseTo(basis / 27.5, 6);
  });
  it("profit adds up and the IRR discounts the flows to zero", () => {
    const r = rentalProperty(input);
    expect(r.totalProfit).toBeCloseTo(r.totalCashFlow + r.sale.proceeds - r.cashInvested, 6);
    const flows = [-r.cashInvested, ...r.years.map((y, k) => y.cashFlow + (k === r.years.length - 1 ? r.sale.proceeds : 0))];
    const npv = flows.reduce((a, f, t) => a + f / Math.pow(1 + r.irr!, t), 0);
    expect(Math.abs(npv)).toBeLessThan(0.01);
  });
  it("all cash has no debt service and an infinite DSCR", () => {
    const r = rentalProperty({ ...input, downPct: 100 });
    expect(r.debtService).toBe(0);
    expect(r.dscr).toBe(Infinity);
    expect(r.cashOnCash).toBeCloseTo(r.noi / 309_000, 9);
  });
});

describe("irr", () => {
  it("finds 10% on a simple flow", () => {
    expect(irr([-100, 110])!).toBeCloseTo(0.1, 6);
  });
  it("is null when flows never turn positive", () => {
    expect(irr([-100, -10])).toBeNull();
  });
});
