import { describe, it, expect } from "vitest";
import { councilTax } from "./council-tax-bands";

describe("councilTax", () => {
  it("returns the Band D average for Band D in England", () => {
    const r = councilTax({ band: "D", nation: "england", singlePerson: false });
    expect(r.annualBill).toBe(2392);
  });

  it("applies 6/9 multiplier for Band A in England", () => {
    const r = councilTax({ band: "A", nation: "england", singlePerson: false });
    expect(r.annualBill).toBe(Math.round(2392 * (6 / 9)));
  });

  it("applies 25% single-person discount", () => {
    const r = councilTax({ band: "D", nation: "england", singlePerson: true });
    expect(r.discount).toBe(2392 * 0.25);
    expect(r.payable).toBe(2392 * 0.75);
  });

  it("uses Scottish multipliers when nation is scotland", () => {
    const r = councilTax({ band: "H", nation: "scotland", singlePerson: false });
    expect(r.annualBill).toBe(Math.round(1662 * (882 / 360)));
  });
});
