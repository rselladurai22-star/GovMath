import { describe, it, expect } from "vitest";
import { prescriptionSaver } from "./nhs-prescription";

describe("prescriptionSaver", () => {
  it("recommends pay-as-you-go for occasional users", () => {
    const r = prescriptionSaver({ itemsPerMonth: 0.5 });
    expect(r.bestOption).toBe("pay-as-you-go");
  });

  it("recommends 12-month PPC for heavy users", () => {
    const r = prescriptionSaver({ itemsPerMonth: 3 });
    expect(r.bestOption).toBe("12-month-ppc");
  });

  it("calculates correct annual pay-as-you-go cost", () => {
    const r = prescriptionSaver({ itemsPerMonth: 2 });
    expect(r.annualPayAsYouGo).toBeCloseTo(2 * 12 * 9.90, 2);
  });

  it("shows annual saving vs cheapest option", () => {
    const r = prescriptionSaver({ itemsPerMonth: 5 });
    expect(r.annualSaving).toBeGreaterThan(0);
  });
});
