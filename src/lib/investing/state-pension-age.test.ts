import { describe, it, expect } from "vitest";
import { statePensionAge } from "./state-pension-age";

describe("statePensionAge", () => {
  it("gives SPA of 66 for someone born before 6 Apr 1960", () => {
    const r = statePensionAge({ dob: "1955-06-15" });
    expect(r.spaYears).toBe(66);
    expect(r.spaMonths).toBe(0);
  });

  it("gives SPA of 67 for typical 1970s births", () => {
    const r = statePensionAge({ dob: "1975-01-10" });
    expect(r.spaYears).toBe(67);
  });

  it("gives SPA of 68 for births from 6 Apr 1978 onwards", () => {
    const r = statePensionAge({ dob: "1985-09-01" });
    expect(r.spaYears).toBe(68);
  });

  it("returns sliding-scale months for the 1960/61 transition", () => {
    const r = statePensionAge({ dob: "1960-09-15" });
    expect(r.spaYears).toBe(66);
    expect(r.spaMonths).toBeGreaterThan(0);
    expect(r.spaMonths).toBeLessThan(12);
  });
});
