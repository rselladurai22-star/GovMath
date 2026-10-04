import { describe, expect, it } from "vitest";
import { maxPenalty, rightToRentPlan } from "./right-to-rent";

describe("Right to Rent", () => {
  it("check window", () => {
    const r = rightToRentPlan({ status: "british-irish", start: "2026-11-01" });
    expect(r.earliestCheck).toBe("2026-10-04");
    expect(r.followUp).toBe(false);
    expect(r.method).toBe("manual");
  });
  it("follow-up is the later of permission end and 12 months", () => {
    expect(rightToRentPlan({ status: "time-limited", start: "2026-11-01", permissionEnds: "2027-03-01" }).followUpDue).toBe("2027-11-01");
    expect(rightToRentPlan({ status: "time-limited", start: "2026-11-01", permissionEnds: "2028-06-30" }).followUpDue).toBe("2028-06-30");
  });
  it("penalties", () => {
    expect(maxPenalty({ lodgers: 0, occupiers: 2, repeat: false })).toBe(20_000);
    expect(maxPenalty({ lodgers: 1, occupiers: 0, repeat: true })).toBe(10_000);
  });
});
