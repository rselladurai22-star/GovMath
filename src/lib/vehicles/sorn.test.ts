import { describe, it, expect } from "vitest";
import { sornRefund } from "./sorn";

describe("sornRefund", () => {
  it("refunds full annual minus any used months", () => {
    const r = sornRefund({ annualVed: 180, monthsRemaining: 12 });
    expect(r.refund).toBe(180);
  });
  it("rounds part months down", () => {
    const r = sornRefund({ annualVed: 180, monthsRemaining: 5.7 });
    expect(r.fullMonths).toBe(5);
    expect(r.refund).toBeCloseTo(15 * 5, 2);
  });
  it("returns zero when no months remaining", () => {
    expect(sornRefund({ annualVed: 200, monthsRemaining: 0 }).refund).toBe(0);
  });
});
