import { describe, it, expect } from "vitest";
import { healthyStart } from "./healthy-start";

describe("healthyStart", () => {
  it("returns zero with no qualifying status", () => {
    expect(healthyStart({ pregnant: false, childrenUnder1: 0, children1To4: 0 }).weekly).toBe(0);
  });
  it("pays £4.65 during pregnancy", () => {
    expect(healthyStart({ pregnant: true, childrenUnder1: 0, children1To4: 0 }).weekly).toBe(4.65);
  });
  it("pays £9.30 per under-1", () => {
    expect(healthyStart({ pregnant: false, childrenUnder1: 1, children1To4: 0 }).weekly).toBe(9.30);
  });
  it("sums all eligible amounts", () => {
    const r = healthyStart({ pregnant: true, childrenUnder1: 1, children1To4: 2 });
    expect(r.weekly).toBeCloseTo(4.65 + 9.30 + 4.65 * 2, 2);
  });
});
