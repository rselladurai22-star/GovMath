import { describe, expect, it } from "vitest";
import { addMonths, depositCap, depositReturn, fairDeduction, rentIncrease } from "./renting";

describe("addMonths", () => {
  it("keeps the day or uses the month end", () => {
    expect(addMonths("2026-10-06", 2)).toBe("2026-12-06");
    expect(addMonths("2026-12-31", 2)).toBe("2027-02-28");
    expect(addMonths("2026-11-15", 3)).toBe("2027-02-15");
  });
});

describe("rent increases", () => {
  const base = { nation: "england" as const, current: 1_000, proposed: 1_100, served: "2026-10-01", starts: "2026-12-01", lastChange: "2025-11-01", income: 0, market: 0 };

  it("works out the rise", () => {
    const r = rentIncrease(base);
    expect(r.monthly).toBe(100);
    expect(r.yearly).toBe(1_200);
    expect(r.share).toBeCloseTo(0.1, 9);
  });

  it("needs 2 months' notice in England and 3 in Scotland", () => {
    expect(rentIncrease(base).noticeOk).toBe(true);
    expect(rentIncrease({ ...base, starts: "2026-11-30" }).noticeOk).toBe(false);
    expect(rentIncrease({ ...base, nation: "scotland" }).noticeOk).toBe(false);
    expect(rentIncrease({ ...base, nation: "scotland", starts: "2027-01-01" }).noticeOk).toBe(true);
  });

  it("allows one rise a year", () => {
    expect(rentIncrease(base).earliestByYear).toBe("2026-10-31");
    expect(rentIncrease({ ...base, lastChange: "2026-02-01" }).yearOk).toBe(false);
    expect(rentIncrease({ ...base, nation: "wales" }).earliestByYear).toBe("2026-11-01");
  });

  it("checks affordability and market rent when given", () => {
    const r = rentIncrease({ ...base, income: 2_500, market: 1_050 });
    expect(r.burdenAfter).toBeCloseTo(0.44, 9);
    expect(r.aboveMarket).toBe(50);
    expect(rentIncrease(base).burdenAfter).toBeNull();
  });
});

describe("deposits", () => {
  it("caps deposits by nation", () => {
    expect(depositCap("england", 1_300)).toBeCloseTo(1_500, 6);
    expect(depositCap("england", 5_000)).toBeCloseTo(((5_000 * 12) / 52) * 6, 6);
    expect(depositCap("scotland", 900)).toBe(1_800);
    expect(depositCap("ni", 900)).toBe(900);
    expect(depositCap("wales", 900)).toBeNull();
  });

  it("charges only the life an item had left", () => {
    const l = fairDeduction({ kind: "carpet", claimed: 800, age: 6, life: 8 });
    expect(l.fair).toBe(200);
    expect(fairDeduction({ kind: "carpet", claimed: 800, age: 10, life: 8 }).fair).toBe(0);
    expect(fairDeduction({ kind: "cleaning", claimed: 150, age: 0, life: 0 }).fair).toBe(150);
  });

  it("adds up what should come back", () => {
    const r = depositReturn({
      nation: "england",
      deposit: 1_500,
      monthlyRent: 1_300,
      protectedInTime: false,
      claims: [
        { kind: "carpet", claimed: 800, age: 6, life: 8 },
        { kind: "cleaning", claimed: 150, age: 0, life: 0 },
      ],
    });
    expect(r.fair).toBe(350);
    expect(r.back).toBe(1_150);
    expect(r.backIfAccepted).toBe(550);
    expect(r.penaltyRange).toEqual([1_500, 4_500]);
    expect(r.overCap).toBeCloseTo(0, 6);
  });
});
