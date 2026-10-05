import { describe, expect, it } from "vitest";
import { salaryResult, stampDuty } from "./engines";

// The approved design pages show these figures; they must match the engines
// the rest of the site uses (and the design's own reference outputs).
describe("design bridge: salaryResult", () => {
  it("£35,000, 5% pension, England", () => {
    const r = salaryResult({ salary: 35000, bonus: 0, pension: 5, plan: "none", region: "ruk" });
    expect(r.net).toBeCloseTo(27459.6, 2);
    expect(r.tax).toBeCloseTo(4136, 2);
    expect(r.ni).toBeCloseTo(1654.4, 2);
    expect(r.bands.map((b) => b.name)).toEqual(["Basic", "Higher", "Additional"]);
  });

  it("£60,000, Scotland, Plan 2: every Scottish band, empty ones at £0", () => {
    const r = salaryResult({ salary: 60000, bonus: 0, pension: 5, plan: "plan2", region: "scotland" });
    expect(r.net / 12).toBeCloseTo(3286.83, 2);
    expect(r.bands.map((b) => b.name)).toEqual(["Starter", "Basic", "Intermediate", "Higher", "Advanced", "Top"]);
    expect(r.bands.find((b) => b.name === "Top")?.tax).toBe(0);
  });

  it("tapers the Personal Allowance above £100,000", () => {
    const r = salaryResult({ salary: 110000, bonus: 0, pension: 0, plan: "none", region: "ruk" });
    expect(r.allowance).toBe(7570);
  });
});

describe("design bridge: stampDuty", () => {
  it("matches England and NI rates", () => {
    expect(stampDuty(350000, "standard")).toBe(7500);
    expect(stampDuty(450000, "first-time")).toBe(7500);
    expect(stampDuty(600000, "additional")).toBe(50000);
    expect(stampDuty(1700000, "standard")).toBe(117750);
  });
});
