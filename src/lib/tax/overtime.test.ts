import { describe, expect, it } from "vitest";
import { overtimeOutcome } from "./overtime";

describe("overtimeOutcome", () => {
  it("pays time and a half on the basic hourly rate", () => {
    const r = overtimeOutcome({ salary: 39_000, hours: 37.5, tiers: [{ hours: 10, multiplier: 1.5 }] });
    expect(r.hourly).toBeCloseTo(20, 6);
    expect(r.gross).toBeCloseTo(300, 6);
  });

  it("keeps 72p in the pound for a basic-rate earner", () => {
    const r = overtimeOutcome({ salary: 30_000, hours: 37.5, tiers: [{ hours: 10, multiplier: 1.5 }] });
    expect(r.kept / r.gross).toBeCloseTo(0.72, 4);
  });

  it("taxes regular overtime that crosses £50,270 at 40% on the part above", () => {
    const r = overtimeOutcome({ salary: 48_000, hours: 37.5, tiers: [{ hours: 20, multiplier: 1.5 }] });
    const yearExtra = r.gross * 12;
    const expectedTax = ((50_270 - 48_000) * 0.2 + (48_000 + yearExtra - 50_270) * 0.4) / 12;
    expect(r.tax).toBeCloseTo(expectedTax, 2);
  });

  it("adds a second tier at double time", () => {
    const r = overtimeOutcome({ salary: 39_000, hours: 37.5, tiers: [{ hours: 4, multiplier: 1.5 }, { hours: 2, multiplier: 2 }] });
    expect(r.gross).toBeCloseTo(4 * 30 + 2 * 40, 6);
    expect(r.overtimeHours).toBe(6);
  });

  it("can send part of overtime pay to the pension first", () => {
    const r = overtimeOutcome({ salary: 30_000, hours: 37.5, tiers: [{ hours: 10, multiplier: 1 }], pensionPct: 5, pensionOnOvertime: true });
    expect(r.pension).toBeCloseTo(r.gross * 0.05, 6);
  });
});
