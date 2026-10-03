import { describe, expect, it } from "vitest";
import { PIP_ACTIVITIES, pipBand, pipScore } from "./pip-assessment";

describe("PIP assessment", () => {
  it("has 10 daily living and 2 mobility activities", () => {
    expect(PIP_ACTIVITIES.filter((a) => a.component === "daily")).toHaveLength(10);
    expect(PIP_ACTIVITIES.filter((a) => a.component === "mobility")).toHaveLength(2);
  });
  it("bands at 8 and 12 points", () => {
    expect(pipBand(7)).toBe("none");
    expect(pipBand(8)).toBe("standard");
    expect(pipBand(12)).toBe("enhanced");
  });
  it("scores nothing by default", () => {
    expect(pipScore({}).weekly).toBe(0);
  });
  it("adds up chosen descriptors", () => {
    const r = pipScore({ food: "e", washing: "d", dressing: "d", moving: "b", journeys: "b" });
    expect(r.daily).toBe(8);
    expect(r.dailyBand).toBe("standard");
    expect(r.mobility).toBe(8);
    expect(r.weekly).toBeCloseTo(76.7 + 30.3, 6);
    expect(r.dailyToNext).toBe(4);
  });
  it("enhanced on both components", () => {
    const r = pipScore({ moving: "f", toilet: "f", washing: "f" });
    expect(r.weekly).toBeCloseTo(114.6 + 80, 6);
  });
});
