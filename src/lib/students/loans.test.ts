import { describe, expect, it } from "vitest";
import { interestRate, maintenanceLoan2026, monthlyPayroll, over60Loan2026, projectLoan, repayments2026, studentCouncilTax, type StudentHomePerson } from "./loans";

describe("repayments 2026/27", () => {
  it("Plan 2 at £35,000", () => {
    const r = repayments2026({ salary: 35_000, plans: ["plan2"] });
    expect(r.yearly).toBeCloseTo((35_000 - 29_385) * 0.09, 6);
  });
  it("Plan 2 plus postgraduate", () => {
    const r = repayments2026({ salary: 40_000, plans: ["plan2", "postgrad"] });
    expect(r.yearly).toBeCloseTo((40_000 - 29_385) * 0.09 + (40_000 - 21_000) * 0.06, 6);
  });
  it("two undergraduate plans repay once, at the lowest threshold", () => {
    const r = repayments2026({ salary: 40_000, plans: ["plan1", "plan2"] });
    expect(r.lines.length).toBe(1);
    expect(r.lines[0].plan).toBe("plan1");
  });
});

describe("interest", () => {
  it("Plan 2 slides from RPI to the 6% cap", () => {
    expect(interestRate("plan2", 25_000)).toBeCloseTo(0.041, 6);
    expect(interestRate("plan2", 60_000)).toBeCloseTo(0.06, 6);
    expect(interestRate("plan2", 41_135)).toBeCloseTo(0.041 + 0.015, 6);
  });
  it("other plans", () => {
    expect(interestRate("plan5", 50_000)).toBeCloseTo(0.041, 6);
    expect(interestRate("postgrad", 50_000)).toBeCloseTo(0.06, 6);
    expect(interestRate("plan1", 50_000)).toBeCloseTo(0.041, 6);
  });
});

describe("projection", () => {
  it("a small balance on a high salary clears", () => {
    const r = projectLoan({ plan: "plan1", balance: 5_000, salary: 60_000, salaryGrowth: 0.03, rpi: 0.03, yearsRepaying: 5, extraMonthly: 0 });
    expect(r.clearedIn).not.toBeNull();
    expect(r.writtenOff).toBe(0);
  });
  it("a large Plan 5 balance on a modest salary is partly written off", () => {
    const r = projectLoan({ plan: "plan5", balance: 60_000, salary: 26_000, salaryGrowth: 0.03, rpi: 0.03, yearsRepaying: 0, extraMonthly: 0 });
    expect(r.yearsLeft).toBe(40);
    expect(r.writtenOff).toBeGreaterThan(0);
  });
});

describe("payroll deductions (GOV.UK worked examples)", () => {
  it("rounds down to whole pounds on the monthly threshold", () => {
    expect(monthlyPayroll("plan1", 33_000)).toBe(45);
    expect(monthlyPayroll("plan4", 36_000)).toBe(16);
    expect(monthlyPayroll("plan2", 35_000)).toBe(42);
    // Student Finance Wales parents' guide 2026/27: £30,000 a year repays £4 a month.
    expect(monthlyPayroll("plan2", 30_000)).toBe(4);
    expect(monthlyPayroll("plan2", 29_385)).toBe(0);
    expect(monthlyPayroll("plan2", 20_000)).toBe(0);
  });
});

describe("Plan 2 interest, SLC examples for 2026/27", () => {
  it("matches the published rates and the 6% cap", () => {
    expect(interestRate("plan2", 35_000)).toBeCloseTo(0.0482, 4);
    expect(interestRate("plan2", 40_000)).toBeCloseTo(0.0546, 4);
    expect(interestRate("plan2", 45_000)).toBeCloseTo(0.06, 6);
    expect(interestRate("plan2", 52_885)).toBeCloseTo(0.06, 6);
    expect(interestRate("plan2", 29_385)).toBeCloseTo(0.041, 6);
    expect(interestRate("plan2", 20_000, undefined, undefined, undefined, true)).toBeCloseTo(0.06, 6);
  });
});

describe("Plan 2 projection", () => {
  it("keeps the threshold frozen to 2029/30, then raises it", () => {
    const r = projectLoan({ plan: "plan2", balance: 200_000, salary: 40_000, salaryGrowth: 0, rpi: 0.03, yearsRepaying: 0, extraMonthly: 0 });
    expect(r.path.slice(0, 4).map((p) => p.threshold)).toEqual([29_385, 29_385, 29_385, 29_385]);
    expect(r.path[4].threshold).toBeCloseTo(29_385 * 1.03, 6);
    expect(r.yearsLeft).toBe(30);
  });
  it("keeps the interest band (£29,385 to £52,885) frozen with it, in England and Wales", () => {
    const top = projectLoan({ plan: "plan2", balance: 200_000, salary: 52_885, salaryGrowth: 0, rpi: 0.03, yearsRepaying: 0, extraMonthly: 0 });
    expect(top.path.slice(1, 4).map((p) => p.rate)).toEqual([0.06, 0.06, 0.06].map((x) => expect.closeTo(x, 9)));
    // Once the threshold rises in 2030/31 the same salary sits below the top of the band.
    expect(top.path[4].rate).toBeLessThan(0.06);
  });
  it("below the threshold nothing is repaid and the whole balance is written off", () => {
    const r = projectLoan({ plan: "plan2", balance: 40_000, salary: 25_000, salaryGrowth: 0, rpi: 0.03, yearsRepaying: 0, extraMonthly: 0 });
    expect(r.totalRepaid).toBe(0);
    expect(r.writtenOff).toBeGreaterThan(40_000);
    expect(r.clearedIn).toBeNull();
  });
  it("a high earner clears it before the write-off", () => {
    const r = projectLoan({ plan: "plan2", balance: 45_000, salary: 90_000, salaryGrowth: 0.03, rpi: 0.03, yearsRepaying: 0, extraMonthly: 0 });
    expect(r.clearedIn).not.toBeNull();
    expect(r.clearedIn!).toBeLessThan(30);
    expect(r.writtenOff).toBe(0);
  });
  it("the write-off year counts years already repaid", () => {
    const r = projectLoan({ plan: "plan2", balance: 45_000, salary: 30_000, salaryGrowth: 0.02, rpi: 0.03, yearsRepaying: 12, extraMonthly: 0 });
    expect(r.yearsLeft).toBe(18);
    expect(r.path.length).toBe(18);
  });
});

describe("maintenance loan 2026/27 (SFE table and S.I. 2026/130)", () => {
  // SFE "How you're assessed and paid 2026 to 2027": away, London, home.
  const table: [number, number, number, number][] = [
    [25_000, 10_830, 14_135, 9_118],
    [30_000, 10_058, 13_349, 8_354],
    [35_000, 9_285, 12_563, 7_589],
    [40_000, 8_512, 11_777, 6_825],
    [42_875, 8_068, 11_325, 6_385],
    [45_000, 7_739, 10_991, 6_060],
  ];
  it("matches the official table", () => {
    for (const [x, a, l, h] of table) {
      expect(maintenanceLoan2026(x, "away").loan).toBe(a);
      expect(maintenanceLoan2026(x, "london").loan).toBe(l);
      expect(maintenanceLoan2026(x, "home").loan).toBe(h);
    }
  });
  it("is the maximum at £25,000 or less", () => {
    expect(maintenanceLoan2026(0, "away").loan).toBe(10_830);
    expect(maintenanceLoan2026(18_000, "home").loan).toBe(9_118);
    expect(maintenanceLoan2026(25_006, "away").loan).toBe(10_830);
    expect(maintenanceLoan2026(25_007, "away").loan).toBe(10_829);
  });
  it("reaches the minimum at the published income points", () => {
    expect(maintenanceLoan2026(62_410, "away")).toMatchObject({ loan: 5_048, reduction: 5_782 });
    expect(maintenanceLoan2026(70_131, "london")).toMatchObject({ loan: 7_039, reduction: 7_096 });
    // SFE's table prints £58,347 for living with parents, but £1 in every £6.54 (reg. 80A) only takes off the full £5,105 at £58,387.
    expect(maintenanceLoan2026(58_387, "home")).toMatchObject({ loan: 4_013, reduction: 5_105 });
    expect(maintenanceLoan2026(0, "home").minAt).toBe(58_387);
    expect(maintenanceLoan2026(150_000, "away").loan).toBe(5_048);
    expect(maintenanceLoan2026(150_000, "abroad").loan).toBe(5_996);
    expect(maintenanceLoan2026(0, "abroad").loan).toBe(12_403);
    expect(maintenanceLoan2026(0, "away").minAt).toBe(62_410);
  });
  it("final year rates are lower", () => {
    expect(maintenanceLoan2026(20_000, "away", { finalYear: true }).loan).toBe(10_242);
    expect(maintenanceLoan2026(20_000, "london", { finalYear: true }).loan).toBe(13_096);
    expect(maintenanceLoan2026(20_000, "home", { finalYear: true }).loan).toBe(8_579);
    expect(maintenanceLoan2026(100_000, "away", { finalYear: true }).loan).toBe(4_693);
    // SFE: the final-year minimum away from home is reached at £60,907 (an assessment of £5,549).
    expect(maintenanceLoan2026(60_907, "away", { finalYear: true }).reduction).toBe(5_549);
  });
  it("students who can claim benefits get more below £42,875 (SFE table)", () => {
    expect(maintenanceLoan2026(25_000, "away", { benefits: true }).loan).toBe(12_345);
    expect(maintenanceLoan2026(30_000, "away", { benefits: true }).loan).toBe(11_149);
    expect(maintenanceLoan2026(30_000, "london", { benefits: true }).loan).toBe(14_271);
    expect(maintenanceLoan2026(30_000, "home", { benefits: true }).loan).toBe(9_534);
    expect(maintenanceLoan2026(42_875, "away", { benefits: true }).loan).toBe(8_068);
    expect(maintenanceLoan2026(45_000, "away", { benefits: true }).loan).toBe(7_740);
    expect(maintenanceLoan2026(45_000, "home", { benefits: true }).loan).toBe(6_061);
    expect(maintenanceLoan2026(45_000, "london", { benefits: true }).loan).toBe(10_991);
    expect(maintenanceLoan2026(100_000, "away", { benefits: true }).loan).toBe(5_048);
  });
  it("care leavers can borrow the maximum whatever the income", () => {
    expect(maintenanceLoan2026(80_000, "away", { careLeaver: true }).loan).toBe(10_830);
  });
  it("students aged 60 or over (reg. 80C and the SFE table)", () => {
    expect(over60Loan2026(25_000)).toBe(4_582);
    expect(over60Loan2026(30_000)).toBe(3_381);
    expect(over60Loan2026(35_000)).toBe(2_179);
    expect(over60Loan2026(40_000)).toBe(977);
    expect(over60Loan2026(43_854)).toBe(50);
    expect(over60Loan2026(43_858)).toBe(0);
  });
});

describe("student council tax", () => {
  const ct = (people: StudentHomePerson[], bill = 2_000, months = 12) => studentCouncilTax({ people, bill, months });
  it("all full-time students: exempt", () => {
    expect(ct(["student", "student", "student", "student"])).toMatchObject({ kind: "exempt", pay: 0 });
  });
  it("a non-British spouse who cannot work keeps the exemption", () => {
    expect(ct(["student", "spouse"]).kind).toBe("exempt");
  });
  it("one adult who counts: 25% off", () => {
    expect(ct(["student", "student", "counts"])).toMatchObject({ kind: "discount", pay: 1_500 });
  });
  it("a part-time student counts like anyone working", () => {
    expect(ct(["student", "counts", "counts"])).toMatchObject({ kind: "full", pay: 2_000, perAdult: 1_000 });
  });
  it("students with an apprentice: nobody counts, so 50% off", () => {
    expect(ct(["student", "disregarded"])).toMatchObject({ kind: "half", pay: 1_000 });
  });
  it("part of the year", () => {
    expect(ct(["student", "counts"], 2_400, 6).pay).toBe(900);
  });
  it("an empty household pays the full bill", () => {
    expect(ct([]).kind).toBe("full");
  });
});
