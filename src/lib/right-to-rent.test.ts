import { describe, it, expect } from "vitest";
import { rightToRent } from "./right-to-rent";

describe("rightToRent", () => {
  it("UK citizens use List A docs", () => {
    const r = rightToRent({ nationality: "uk", ilrOrSettled: false });
    expect(r.list).toBe("A");
    expect(r.recheckRequired).toBe(false);
  });
  it("ILR holders use online share code, no recheck", () => {
    const r = rightToRent({ nationality: "non-eu", ilrOrSettled: true });
    expect(r.list).toBe("online-share-code");
    expect(r.recheckRequired).toBe(false);
  });
  it("Visa holders need recheck on expiry", () => {
    const r = rightToRent({ nationality: "non-eu", ilrOrSettled: false, visaExpiry: "2027-06-01", today: "2025-06-01" });
    expect(r.recheckRequired).toBe(true);
    expect(r.recheckDate).toBe("2027-06-01");
  });
});
