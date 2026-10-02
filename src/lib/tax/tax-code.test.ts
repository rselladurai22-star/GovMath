import { describe, it, expect } from "vitest";
import { decodeTaxCode, taxUnderCode } from "./tax-code";

describe("decodeTaxCode", () => {
  it("decodes the standard 1257L code", () => {
    const r = decodeTaxCode("1257L");
    expect(r.valid).toBe(true);
    expect(r.type).toBe("standard");
    expect(r.personalAllowance).toBe(12570);
    expect(r.region).toBe("rUK");
    expect(r.emergency).toBe(false);
  });

  it("detects emergency suffix W1", () => {
    const r = decodeTaxCode("1257LW1");
    expect(r.emergency).toBe(true);
    expect(r.type).toBe("standard");
  });

  it("detects Scottish prefix S", () => {
    const r = decodeTaxCode("S1257L");
    expect(r.region).toBe("scotland");
    expect(r.personalAllowance).toBe(12570);
  });

  it("decodes BR (basic rate)", () => {
    const r = decodeTaxCode("BR");
    expect(r.type).toBe("br");
    expect(r.personalAllowance).toBe(0);
  });

  it("decodes K codes with negative allowance", () => {
    const r = decodeTaxCode("K500");
    expect(r.type).toBe("k");
    expect(r.personalAllowance).toBe(-5000);
  });

  it("flags invalid codes", () => {
    const r = decodeTaxCode("ZZZ999");
    expect(r.valid).toBe(false);
    expect(r.type).toBe("unknown");
  });
});

describe("taxUnderCode", () => {
  it("1257L on £30,000", () => {
    expect(taxUnderCode(30_000, decodeTaxCode("1257L"))).toBeCloseTo(3_486, 2);
  });
  it("BR taxes all pay at 20%", () => {
    expect(taxUnderCode(10_000, decodeTaxCode("BR"))).toBeCloseTo(2_000, 6);
  });
  it("K codes add to taxable pay", () => {
    expect(taxUnderCode(30_000, decodeTaxCode("K100"))).toBeCloseTo((30_000 + 1_000) * 0.2, 2);
  });
  it("Scottish D0 is 21%", () => {
    expect(taxUnderCode(10_000, decodeTaxCode("SD0"))).toBeCloseTo(2_100, 6);
  });
  it("NT means no tax", () => {
    expect(taxUnderCode(50_000, decodeTaxCode("NT"))).toBe(0);
  });
});
