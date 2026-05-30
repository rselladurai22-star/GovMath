import { describe, it, expect } from "vitest";
import { checkRegistration, normaliseReg } from "./mot-history";

describe("MOT history checker", () => {
  it("normalises spaces and case", () => {
    expect(normaliseReg(" ab12 cde ")).toBe("AB12CDE");
  });
  it("accepts common UK plate formats", () => {
    expect(checkRegistration({ registration: "AB12 CDE" }).valid).toBe(true);
    expect(checkRegistration({ registration: "A1" }).valid).toBe(true);
  });
  it("rejects garbage", () => {
    expect(checkRegistration({ registration: "!!!" }).valid).toBe(false);
  });
  it("builds the DVSA URL when valid", () => {
    const r = checkRegistration({ registration: "AB12CDE" });
    expect(r.url).toContain("check-mot.service.gov.uk");
    expect(r.url).toContain("AB12CDE");
  });
});
