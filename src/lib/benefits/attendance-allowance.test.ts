import { describe, it, expect } from "vitest";
import { attendanceAllowance } from "./attendance-allowance";

describe("attendanceAllowance", () => {
  it("pays lower rate for day-only care needs", () => {
    const r = attendanceAllowance({ careNeeded: "day-only", terminallyIll: false });
    expect(r.rate).toBe("lower");
    expect(r.weekly).toBe(73.90);
  });

  it("pays higher rate for day-and-night care", () => {
    const r = attendanceAllowance({ careNeeded: "day-and-night", terminallyIll: false });
    expect(r.weekly).toBe(110.40);
  });

  it("always pays higher rate when terminally ill", () => {
    const r = attendanceAllowance({ careNeeded: "none", terminallyIll: true });
    expect(r.rate).toBe("higher");
  });

  it("computes annual award correctly", () => {
    const r = attendanceAllowance({ careNeeded: "night-only", terminallyIll: false });
    expect(r.annual).toBeCloseTo(73.90 * 52, 2);
  });
});
