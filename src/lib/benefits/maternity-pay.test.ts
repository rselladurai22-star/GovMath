import { describe, expect, it } from "vitest";
import { statutoryMaternityPay } from "./maternity-pay";

describe("SMP", () => {
  it("high earner caps at flat rate weeks 7-39", () => {
    const r = statutoryMaternityPay(1000);
    expect(r.high90Weekly).toBeCloseTo(900, 2);
    expect(r.flatWeekly).toBeCloseTo(187.18, 2);
  });
  it("low earner uses 90% throughout", () => {
    const r = statutoryMaternityPay(150);
    expect(r.high90Weekly).toBeCloseTo(135, 2);
    expect(r.flatWeekly).toBeCloseTo(135, 2);
  });
  it("total 39 weeks", () => {
    const r = statutoryMaternityPay(500);
    // 6 * 450 + 33 * 187.18 = 2700 + 6176.94 = 8876.94
    expect(r.total39Weeks).toBeCloseTo(2700 + 33 * 187.18, 2);
  });
});
