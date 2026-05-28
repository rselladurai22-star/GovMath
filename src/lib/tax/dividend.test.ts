import { describe, expect, it } from "vitest";
import { dividendTax } from "./dividend";

const round = (n: number) => Math.round(n * 100) / 100;

describe("dividendTax (2025/26)", () => {
  it("zero dividends → zero tax", () => {
    expect(dividendTax(50_000, 0).total).toBe(0);
  });

  it("£500 dividend allowance is tax-free", () => {
    // Basic-rate earner with £500 dividends — entirely in allowance.
    const r = dividendTax(30_000, 500);
    expect(r.allowanceUsed).toBe(500);
    expect(r.total).toBe(0);
  });

  it("basic-rate dividends above allowance at 8.75%", () => {
    // Salary 30k uses full PA. £1,500 dividends: £500 allowance, £1,000 at 8.75%
    const r = dividendTax(30_000, 1_500);
    expect(r.allowanceUsed).toBe(500);
    expect(round(r.basic)).toBe(round(1_000 * 0.0875));
    expect(r.higher).toBe(0);
  });

  it("dividends spanning basic→higher band", () => {
    // Salary 50,000 (just under basic-band top of 50,270). 
    // £20,000 dividends: £500 allowance, £(50270-50000-500)=£-230? actually £270 left in basic band.
    // So 500 in allowance, then 50270-50500=−230 → 0 basic, remainder 19,500 in higher.
    // Wait: salary 50000 + 500 allowance = 50500 which already exceeds basicBandTop 50270.
    // → All £19,500 of remaining taxed dividends are at higher 33.75%.
    const r = dividendTax(50_000, 20_000);
    expect(r.allowanceUsed).toBe(500);
    expect(round(r.basic)).toBe(0);
    expect(round(r.higher)).toBe(round(19_500 * 0.3375));
  });

  it("dividends entirely above £125,140 → 39.35%", () => {
    const r = dividendTax(200_000, 10_000);
    expect(r.allowanceUsed).toBe(500);
    // Taxed 9500 all at additional rate
    expect(round(r.additional)).toBe(round(9_500 * 0.3935));
  });

  it("unused PA absorbs dividends tax-free first", () => {
    // Other income £8,000 leaves £4,570 of PA unused.
    const r = dividendTax(8_000, 5_000);
    expect(round(r.paUsedByDividends)).toBe(round(12_570 - 8_000));
    // Remaining dividends 5000 - 4570 = 430, all within £500 allowance → no tax
    expect(r.total).toBe(0);
  });
});
