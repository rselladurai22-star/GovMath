import { describe, expect, it } from "vitest";
import { calculatorJsonLd } from "./schema";

describe("calculatorJsonLd", () => {
  it("marks US calculators as US English priced in dollars", () => {
    const ld = calculatorJsonLd("/us/taxes/paycheck-calculator", "Paycheck Calculator", "d");
    expect(ld.inLanguage).toBe("en-US");
    expect(ld.offers.priceCurrency).toBe("USD");
  });

  it("keeps UK and Everyday calculators in British English and pounds", () => {
    for (const path of ["/uk/property/mortgage-repayment", "/everyday/bmi-calculator"]) {
      const ld = calculatorJsonLd(path, "Calculator", "d");
      expect(ld.inLanguage).toBe("en-GB");
      expect(ld.offers.priceCurrency).toBe("GBP");
    }
  });
});
