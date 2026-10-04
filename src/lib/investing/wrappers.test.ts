import { describe, expect, it } from "vitest";
import { annualAllowance, isaVsGia, pensionRelief } from "./wrappers";

describe("pension relief", () => {
  it("basic-rate taxpayer: 20% by every method", () => {
    const ras = pensionRelief({ salary: 35_000, contribution: 1_000, method: "ras" });
    expect(ras.basicAtSource).toBeCloseTo(200, 6);
    expect(ras.claimBack).toBeCloseTo(0, 6);
    expect(ras.netCost).toBeCloseTo(800, 6);
    const np = pensionRelief({ salary: 35_000, contribution: 1_000, method: "net-pay" });
    expect(np.netCost).toBeCloseTo(800, 6);
  });
  it("salary sacrifice adds NI savings", () => {
    const r = pensionRelief({ salary: 35_000, contribution: 1_000, method: "sacrifice" });
    expect(r.employeeNiSaving).toBeCloseTo(80, 6);
    expect(r.employerNiSaving).toBeCloseTo(150, 6);
    expect(r.netCost).toBeCloseTo(720, 6);
  });
  it("higher-rate relief at source claimed back", () => {
    const r = pensionRelief({ salary: 70_000, contribution: 10_000, method: "ras" });
    expect(r.basicAtSource).toBeCloseTo(2_000, 6);
    expect(r.claimBack).toBeCloseTo(2_000, 6);
    expect(r.netCost).toBeCloseTo(6_000, 6);
  });
  it("the £100k trap gives 60% relief", () => {
    const r = pensionRelief({ salary: 110_000, contribution: 10_000, method: "net-pay" });
    expect(r.incomeTaxRelief).toBeCloseTo(6_000, 6);
    expect(r.paAfter).toBe(12_570);
  });
  it("non-taxpayer relief at source up to £3,600", () => {
    const r = pensionRelief({ salary: 0, contribution: 3_600, method: "ras" });
    expect(r.basicAtSource).toBeCloseTo(720, 6);
    expect(pensionRelief({ salary: 0, contribution: 3_600, method: "net-pay" }).incomeTaxRelief).toBe(0);
  });
  it("tapered annual allowance", () => {
    expect(annualAllowance(150_000, 300_000)).toBe(60_000);
    expect(annualAllowance(250_000, 300_000)).toBe(40_000);
    expect(annualAllowance(400_000, 400_000)).toBe(10_000);
  });
});

describe("ISA vs GIA", () => {
  it("ISA grows tax-free; GIA pays dividend tax", () => {
    const r = isaVsGia({ lump: 20_000, monthly: 0, years: 10, growth: 0.04, dividendYield: 0.02, interestYield: 0, turnover: 0, otherIncome: 60_000, sellAtEnd: false });
    expect(r.isaFinal).toBeCloseTo(20_000 * 1.06 ** 10, 4);
    expect(r.giaFinal).toBeLessThan(r.isaFinal);
    expect(r.advantage).toBeGreaterThan(0);
  });
  it("little difference within allowances", () => {
    const r = isaVsGia({ lump: 5_000, monthly: 0, years: 1, growth: 0.04, dividendYield: 0.02, interestYield: 0, turnover: 0, otherIncome: 30_000, sellAtEnd: true });
    expect(Math.abs(r.advantage)).toBeLessThan(1);
  });
  it("flags contributions over £20,000", () => {
    expect(isaVsGia({ lump: 50_000, monthly: 0, years: 2, growth: 0.04, dividendYield: 0.02, interestYield: 0, turnover: 0, otherIncome: 30_000, sellAtEnd: true }).overAllowance).toBe(true);
  });
});
