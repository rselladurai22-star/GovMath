import { describe, it, expect } from "vitest";
import { licenceAt70 } from "./licence-at-70";

describe("licenceAt70", () => {
  it("sets next renewal to 70 for under-70s", () => {
    const r = licenceAt70({ dateOfBirth: "1960-06-15", today: "2025-06-15" });
    expect(r.ageYears).toBe(65);
    expect(r.nextRenewalAge).toBe(70);
  });
  it("flags must-renew at 70+", () => {
    const r = licenceAt70({ dateOfBirth: "1950-01-01", today: "2025-06-15" });
    expect(r.must70Renew).toBe(true);
  });
  it("advances in 3-year steps after 70", () => {
    const r = licenceAt70({ dateOfBirth: "1953-01-01", today: "2025-06-15" });
    // 72 years old → next renewal at 73
    expect(r.nextRenewalAge).toBe(73);
  });
});
