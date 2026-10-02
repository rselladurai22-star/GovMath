import { describe, expect, it } from "vitest";
import { bandFor, taxBracket } from "./tax-bracket";

describe("taxBracket", () => {
  it("places £35,000 in the basic rate band", () => {
    const r = taxBracket({ income: 35_000 });
    expect(r.band).toBe("basic");
    expect(r.next?.at).toBe(50_270);
    expect(r.next?.away).toBe(15_270);
  });
  it("places £110,000 in the 60% allowance taper", () => {
    const r = taxBracket({ income: 110_000 });
    expect(r.band).toBe("taper");
    expect(r.marginal).toBeCloseTo(0.62, 2);
    expect(r.previous?.over).toBe(10_000);
  });
  it("treats net pension contributions as grossed up", () => {
    const r = taxBracket({ income: 58_270, personalPensionNet: 6_400 });
    expect(r.adjusted).toBeCloseTo(50_270, 6);
    expect(r.band).toBe("basic");
  });
  it("uses the Scottish bands", () => {
    expect(bandFor(45_000, "scotland")).toBe("higher");
    expect(bandFor(30_000, "scotland")).toBe("intermediate");
    expect(bandFor(80_000, "scotland")).toBe("advanced");
    expect(bandFor(130_000, "scotland")).toBe("top");
  });
  it("salary sacrifice lowers adjusted income", () => {
    expect(taxBracket({ income: 100_000, sacrificePct: 10 }).band).toBe("higher");
  });
});
