import { describe, expect, it } from "vitest";
import { formatDate } from "./calendar";

describe("formatDate", () => {
  it("formats without Intl", () => {
    expect(formatDate("2027-09-04")).toBe("Saturday 4 September 2027");
    expect(formatDate("2027-09-04", "short")).toBe("Sat 4 Sep");
    expect(formatDate("2027-09-04", "medium")).toBe("4 September 2027");
  });
});
