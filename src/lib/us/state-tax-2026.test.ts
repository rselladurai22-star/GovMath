import { describe, expect, it } from "vitest";
import { STATE_TAX, stateTax } from "./state-tax-2026";
import { PROPERTY_TAX, propertyTaxPct, STATES } from "./states";

const t = (code: string, wages: number, status: "single" | "mfj" | "mfs" | "hoh" = "single", dependents = 0, k401 = 0) => stateTax({ code, wages, status, dependents, k401 }).tax;

describe("2026 state income tax", () => {
  it("covers every state and DC", () => {
    expect(STATES).toHaveLength(51);
    const taxed = STATES.filter((s) => s.income.kind !== "none").map((s) => s.code);
    expect(taxed).toHaveLength(42);
    taxed.forEach((c) => expect(STATE_TAX[c]).toBeDefined());
    expect(t("TX", 80_000)).toBe(0);
    expect(t("WA", 80_000)).toBe(0);
  });

  it("works through graduated brackets with deductions and credits", () => {
    // California, single, $50,000: $44,294 taxable through four brackets, less the $153 credit.
    expect(t("CA", 50_000)).toBeCloseTo(110.79 + 303.7 + 607.52 + 170.52 - 153, 6);
    // New York, joint, $100,000, two children: $81,950 taxable.
    expect(t("NY", 100_000, "mfj", 2)).toBeCloseTo(668.85 + 283.8 + 221.45 + 2_918.7, 6);
  });

  it("matches West Virginia's own 2026 schedule after the 5% cut", () => {
    // $48,000 taxable: $1,106.50 plus 4.22% of $8,000.
    expect(t("WV", 50_000)).toBeCloseTo(1_444.1, 6);
  });

  it("applies the 2026 laws and phase-outs", () => {
    expect(t("OH", 50_000)).toBeCloseTo((50_000 - 2_150 - 26_050) * 0.0275, 6);
    expect(t("SC", 50_000, "hoh")).toBeCloseTo(27_500 * 0.0199, 6);
    expect(t("UT", 50_000)).toBeCloseTo(50_000 * 0.0445 - (966 - (50_000 - 18_213) * 0.013), 6);
    expect(t("CT", 40_000)).toBeCloseTo(200 + 25_000 * 0.045, 6);
    expect(t("GA", 60_000, "single", 1)).toBeCloseTo((60_000 - 15_000 - 5_000) * 0.0499, 6);
  });

  it("taxes Pennsylvania 401(k) contributions", () => {
    expect(t("PA", 70_000, "single", 0, 5_000)).toBeCloseTo(75_000 * 0.0307, 6);
  });

  it("never returns a negative tax", () => {
    STATES.forEach((s) => {
      [0, 5_000, 40_000, 250_000].forEach((w) => {
        const r = t(s.code, w, "mfj", 3);
        expect(r).toBeGreaterThanOrEqual(0);
        expect(Number.isFinite(r)).toBe(true);
      });
    });
  });
});

describe("State property tax rates", () => {
  it("has a typical rate for every state and DC", () => {
    STATES.forEach((s) => expect(PROPERTY_TAX[s.code]).toBeGreaterThan(0));
    expect(propertyTaxPct("NJ")).toBe(1.89);
    expect(propertyTaxPct("HI")).toBe(0.27);
    expect(propertyTaxPct("US")).toBe(0.89);
  });
});
