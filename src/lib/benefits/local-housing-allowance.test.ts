import { describe, it, expect } from "vitest";
import { lha, bedroomEntitlement } from "./local-housing-allowance";

describe("bedroomEntitlement", () => {
  it("assigns shared rate to single adults under 35", () => {
    expect(bedroomEntitlement({ adults: 1, childrenUnder10: 0, childrenOver10: 0, singleUnder35: true })).toBe("shared");
  });

  it("gives 1 bed to single over 35", () => {
    expect(bedroomEntitlement({ adults: 1, childrenUnder10: 0, childrenOver10: 0, singleUnder35: false })).toBe("1-bed");
  });

  it("gives 2 beds to couple with 1 child under 10", () => {
    expect(bedroomEntitlement({ adults: 2, childrenUnder10: 1, childrenOver10: 0, singleUnder35: false })).toBe("2-bed");
  });
});

describe("lha", () => {
  it("caps help at the LHA rate when rent exceeds it", () => {
    const r = lha({
      area: "core-cities",
      household: { adults: 2, childrenUnder10: 2, childrenOver10: 0, singleUnder35: false },
      weeklyRent: 300,
    });
    expect(r.entitlement).toBe("2-bed");
    expect(r.weeklyHelp).toBe(195.62);
    expect(r.shortfall).toBeCloseTo(300 - 195.62, 2);
  });

  it("pays full rent when below cap", () => {
    const r = lha({
      area: "rest-of-uk",
      household: { adults: 1, childrenUnder10: 0, childrenOver10: 0, singleUnder35: false },
      weeklyRent: 100,
    });
    expect(r.weeklyHelp).toBe(100);
    expect(r.shortfall).toBe(0);
  });
});
