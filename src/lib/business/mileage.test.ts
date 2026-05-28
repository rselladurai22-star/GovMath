import { describe, expect, it } from "vitest";
import { mileageAllowance } from "./mileage";

describe("AMAP mileage", () => {
  it("car under 10k: all at 45p", () => {
    expect(mileageAllowance({ vehicle: "car", businessMiles: 5000 }).total).toBeCloseTo(2250, 2);
  });
  it("car at 15k: 10k×45p + 5k×25p", () => {
    expect(mileageAllowance({ vehicle: "car", businessMiles: 15_000 }).total).toBeCloseTo(4500 + 1250, 2);
  });
  it("motorcycle flat 24p", () => {
    expect(mileageAllowance({ vehicle: "motorcycle", businessMiles: 1000 }).total).toBeCloseTo(240, 2);
  });
  it("bicycle flat 20p", () => {
    expect(mileageAllowance({ vehicle: "bicycle", businessMiles: 1000 }).total).toBeCloseTo(200, 2);
  });
  it("passenger extra 5p (car only)", () => {
    expect(mileageAllowance({ vehicle: "car", businessMiles: 1000, passengerMiles: 500 }).passengerAllowance).toBeCloseTo(25, 2);
  });
});
