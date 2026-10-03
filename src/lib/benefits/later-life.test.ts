import { describe, expect, it } from "vitest";
import { attendanceAllowance2026, PC_DEFAULT_INPUT as D, pcTariffIncome, pensionCredit2026 } from "./later-life";

describe("Pension Credit 2026/27", () => {
  it("tops a single person up to £238", () => {
    const r = pensionCredit2026({ ...D, statePension: 200 });
    expect(r.guaranteeCredit).toBeCloseTo(38, 6);
    expect(r.savingsCredit).toBe(0);
  });
  it("adds severe disability and carer additions", () => {
    expect(pensionCredit2026({ ...D, severeDisability: 1 }).minimumGuarantee).toBeCloseTo(324.05, 6);
    expect(pensionCredit2026({ ...D, couple: true, severeDisability: 2, carers: 1 }).minimumGuarantee).toBeCloseTo(363.25 + 172.1 + 48.15, 6);
  });
  it("tariff income is £1 per £500 or part over £10,000", () => {
    expect(pcTariffIncome(10_000)).toBe(0);
    expect(pcTariffIncome(10_001)).toBe(1);
    expect(pcTariffIncome(12_000)).toBe(4);
  });
  it("ignores £5 of a single person's earnings", () => {
    const r = pensionCredit2026({ ...D, statePension: 200, earnings: 20 });
    expect(r.income).toBeCloseTo(215, 6);
  });
  it("savings credit reaches its maximum at the minimum guarantee", () => {
    const r = pensionCredit2026({ ...D, statePension: 238, savingsCreditEligible: true });
    expect(r.savingsCredit).toBeCloseTo(17.96, 2);
    expect(r.guaranteeCredit).toBe(0);
  });
  it("savings credit tapers away above the guarantee", () => {
    const r = pensionCredit2026({ ...D, statePension: 250, savingsCreditEligible: true });
    expect(r.savingsCredit).toBeCloseTo(17.96 - 0.4 * 12, 6);
    // Gone at 238 + 17.96 / 0.4
    expect(pensionCredit2026({ ...D, statePension: 283, savingsCreditEligible: true }).savingsCredit).toBe(0);
  });
});

describe("Attendance Allowance 2026/27", () => {
  it("lower rate for day or night, higher for both", () => {
    expect(attendanceAllowance2026({ dayNeeds: 2, nightNeeds: 0, terminallyIll: false, monthsNeeded: 12 }).weekly).toBe(76.7);
    expect(attendanceAllowance2026({ dayNeeds: 2, nightNeeds: 1, terminallyIll: false, monthsNeeded: 12 }).weekly).toBe(114.6);
  });
  it("terminal illness gets the higher rate without waiting", () => {
    const r = attendanceAllowance2026({ dayNeeds: 0, nightNeeds: 0, terminallyIll: true, monthsNeeded: 0 });
    expect(r.rate).toBe("higher");
    expect(r.waiting).toBe(false);
  });
  it("flags the six-month qualifying period", () => {
    const r = attendanceAllowance2026({ dayNeeds: 1, nightNeeds: 0, terminallyIll: false, monthsNeeded: 2 });
    expect(r.waiting).toBe(true);
    expect(r.monthsToWait).toBe(4);
  });
});
