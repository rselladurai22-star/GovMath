import { describe, expect, it } from "vitest";
import { per, usd, usdShort } from "./format";

describe("per", () => {
  it("keeps the plural for anything but exactly 1", () => {
    expect(per(2, "children")).toBe("children");
    expect(per(0, "years")).toBe("years");
    expect(per(1.5, "years")).toBe("years");
    expect(per("1.0", "years")).toBe("years");
  });
  it("words a count of 1 in the singular", () => {
    expect(per(1, "children")).toBe("child");
    expect(per(1, "people")).toBe("person");
    expect(per(1, "years")).toBe("year");
    expect(per("1", "days")).toBe("day");
    expect(per(1, "copies")).toBe("copy");
    expect(per(1, "hours a week")).toBe("hour a week");
    expect(per(1, "%")).toBe("%");
  });
  it("handles the possessive", () => {
    expect(per(1, "weeks'")).toBe("week's");
    expect(per(2, "weeks'")).toBe("weeks'");
  });

  it("formats US dollars", () => {
    expect(usd(1234.4)).toBe("$1,234");
    expect(usd(1234.5, true)).toBe("$1,234.50");
    expect(usdShort(480_000)).toBe("$480k");
  });
});
