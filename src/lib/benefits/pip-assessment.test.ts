import { describe, expect, it } from "vitest";
import { PIP_ACTIVITIES, letterOf, pipBand, pipScore } from "./pip-assessment";

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
  it("scores washing descriptor 4b (an aid or appliance) at 2 points, as in Schedule 1", () => {
    expect(pipScore({ washing: "b" }).daily).toBe(2);
  });
  it("has managing therapy as six descriptors a to f, with 3b worth 1 point", () => {
    const therapy = PIP_ACTIVITIES.find((a) => a.id === "therapy")!;
    expect(therapy.descriptors.map(letterOf)).toEqual(["a", "b", "c", "d", "e", "f"]);
    expect(therapy.descriptors.map((x) => x.points)).toEqual([0, 1, 2, 4, 6, 8]);
    // An old share link's "c" (help with medication, 1 point) still scores 1.
    expect(pipScore({ therapy: "c" }).daily).toBe(1);
    expect(pipScore({ therapy: "g" }).daily).toBe(8);
  });
  it("matches the points in Schedule 1 for every activity", () => {
    const points = Object.fromEntries(PIP_ACTIVITIES.map((a) => [a.id, a.descriptors.map((x) => x.points)]));
    expect(points).toEqual({
      food: [0, 2, 2, 2, 4, 8],
      eating: [0, 2, 2, 4, 6, 10],
      therapy: [0, 1, 2, 4, 6, 8],
      washing: [0, 2, 2, 2, 3, 4, 8],
      toilet: [0, 2, 2, 4, 6, 8],
      dressing: [0, 2, 2, 2, 4, 8],
      speaking: [0, 2, 4, 8, 12],
      reading: [0, 2, 2, 4, 8],
      people: [0, 2, 4, 8],
      money: [0, 2, 4, 6],
      journeys: [0, 4, 8, 10, 10, 12],
      moving: [0, 4, 8, 10, 12, 12],
    });
  });
  it("puts the band edges at 7/8 and 11/12, separately for each component", () => {
    expect(pipScore({ food: "e", washing: "e" }).dailyBand).toBe("none"); // 4 + 3 = 7
    expect(pipScore({ food: "e", washing: "f" }).dailyBand).toBe("standard"); // 4 + 4 = 8
    expect(pipScore({ food: "f", washing: "e" }).dailyToNext).toBe(1); // 11
    expect(pipScore({ food: "f", washing: "f" }).dailyBand).toBe("enhanced"); // 12
    const mobilityOnly = pipScore({ moving: "e" });
    expect(mobilityOnly.dailyBand).toBe("none");
    expect(mobilityOnly.mobilityBand).toBe("enhanced");
    expect(mobilityOnly.weekly).toBe(80);
  });
});
