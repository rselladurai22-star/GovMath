import { describe, it, expect } from "vitest";
import { listFields, findField } from "./p45-p60";

describe("p45-p60 explainer", () => {
  it("lists P45 fields", () => {
    expect(listFields("P45").length).toBeGreaterThan(0);
    expect(listFields("P45").every((f) => f.doc === "P45")).toBe(true);
  });
  it("lists P60 fields", () => {
    expect(listFields("P60").length).toBeGreaterThan(0);
  });
  it("finds a field by substring", () => {
    expect(findField("tax code")?.field).toMatch(/tax code/i);
  });
});
