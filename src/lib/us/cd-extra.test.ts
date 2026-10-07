import { describe, expect, it } from "vitest";
import { apy } from "./savings";
import { rateFromApy, valueByMonth } from "./cd-extra";

describe("CD helpers", () => {
  it("turns an APY back into the nominal rate", () => {
    const r = rateFromApy(4, "daily");
    expect(apy(r, "daily")).toBeCloseTo(0.04, 10);
    expect(rateFromApy(4, "annually")).toBeCloseTo(4, 10);
  });
  it("grows a deposit month by month", () => {
    const v = valueByMonth(10_000, 0.04, 12);
    expect(v.length).toBe(13);
    expect(v[12]).toBeCloseTo(10_400, 6);
  });
});
