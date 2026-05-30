import { describe, it, expect } from "vitest";
import { healthyStart } from "./healthy-start";

describe("healthyStart", () => {
  it("returns zero with no qualifying status", () => {
    expect(healthyStart({ pregnant: false, childrenUnder1: 0, children1To4: 0 }).weekly).toBe(0);
  });
  it("pays £4.25 during pregnancy", () => {
    expect(healthyStart({ pregnant: true, childrenUnder1: 0, children1To4: 0 }).weekly).toBe(4.25);
  });
  it("pays £8.50 per under-1", () => {
    expect(healthyStart({ pregnant: false, childrenUnder1: 1, children1To4: 0 }).weekly).toBe(8.50);
  });
  it("sums all eligible amounts", () => {
    const r = healthyStart({ pregnant: true, childrenUnder1: 1, children1To4: 2 });
    expect(r.weekly).toBeCloseTo(4.25 + 8.50 + 4.25 * 2, 2);
  });
});
