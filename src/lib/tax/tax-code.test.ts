import { describe, it, expect } from "vitest";
import { decodeTaxCode } from "./tax-code";

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
