import { describe, expect, it } from "vitest";
import { calculatorJsonLd } from "./schema";

describe("calculatorJsonLd", () => {
  it("marks calculators as free British English finance applications", () => {
    const ld = calculatorJsonLd("/uk/benefits/universal-credit-taper", "UC Taper Calculator", "d");
    expect(ld.inLanguage).toBe("en-GB");
    expect(ld.offers.priceCurrency).toBe("GBP");
    expect(ld.applicationCategory).toBe("FinanceApplication");
    expect(ld.url).toBe("https://sumatlas.com/uk/benefits/universal-credit-taper");
  });
});
