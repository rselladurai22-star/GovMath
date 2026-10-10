import { describe, expect, it } from "vitest";
import { amortize, monthlyPayment } from "./loans";
import {
  addMonths,
  balanceByLoanYear,
  byCalendarYear,
  datedSchedule,
  deductibleShare,
  earlyPayoff,
  equityAvailable,
  equityOptions,
  extraForTarget,
  heloc,
  interestByLoanYear,
  monthYear,
  monthsBetween,
  NO_EXTRA,
  parseYm,
  pointsGainByYear,
  pointsOption,
  pointsTaxValue,
  prepayVsInvest,
  tippingPoint,
} from "./home-equity";

const DEC_2026 = { year: 2026, month: 12 };

describe("dates", () => {
  it("parses, adds and formats months", () => {
    expect(parseYm("2026-12-01")).toEqual(DEC_2026);
    expect(parseYm("junk")).toEqual(DEC_2026);
    expect(addMonths(DEC_2026, 1)).toEqual({ year: 2027, month: 1 });
    expect(addMonths(DEC_2026, 359)).toEqual({ year: 2056, month: 11 });
    expect(monthYear({ year: 2056, month: 11 })).toBe("November 2056");
    expect(monthYear({ year: 2027, month: 9 }, true)).toBe("Sep 2027");
    expect(monthsBetween(DEC_2026, { year: 2027, month: 12 })).toBe(12);
  });
});

describe("datedSchedule", () => {
  it("matches the plain amortization with no extra", () => {
    const s = datedSchedule(300_000, 6.5, 360, DEC_2026);
    const a = amortize(300_000, 6.5, 360);
    expect(s.months).toBe(360);
    expect(s.totalInterest).toBeCloseTo(a.totalInterest, 4);
    expect(s.payment).toBeCloseTo(1_896.2, 2);
    expect(monthYear(s.payoff)).toBe("November 2056");
    expect(s.totalExtra).toBe(0);
  });

  it("applies monthly, yearly and one-time extras", () => {
    const monthly = datedSchedule(300_000, 6.5, 360, DEC_2026, { ...NO_EXTRA, monthly: 200 });
    expect(monthly.months).toBeLessThan(360);
    // The same as the plain engine's constant extra.
    const a = amortize(300_000, 6.5, 360, 200);
    expect(monthly.months).toBe(a.months);
    expect(monthly.totalInterest).toBeCloseTo(a.totalInterest, 4);

    const yearly = datedSchedule(300_000, 6.5, 360, DEC_2026, { ...NO_EXTRA, yearly: 2_400, yearlyMonth: 12 });
    expect(yearly.rows[0].extra).toBe(2_400);
    expect(yearly.rows[1].extra).toBe(0);
    expect(yearly.rows[12].extra).toBe(2_400);

    const once = datedSchedule(300_000, 6.5, 360, DEC_2026, { ...NO_EXTRA, oneTime: 10_000, oneTimeAt: 13 });
    expect(once.rows[12].extra).toBe(10_000);
    expect(once.totalExtra).toBe(10_000);
    expect(once.months).toBeLessThan(360);
  });

  it("never overpays and balances the books", () => {
    const s = datedSchedule(10_000, 5, 60, DEC_2026, { ...NO_EXTRA, oneTime: 50_000, oneTimeAt: 1 });
    expect(s.months).toBe(1);
    expect(s.rows[0].balance).toBe(0);
    const t = datedSchedule(300_000, 6.5, 360, DEC_2026, { ...NO_EXTRA, monthly: 300 });
    expect(t.totalPaid - t.totalInterest).toBeCloseTo(300_000, 4);
  });

  it("handles a zero rate", () => {
    const s = datedSchedule(12_000, 0, 12, DEC_2026);
    expect(s.payment).toBe(1_000);
    expect(s.totalInterest).toBe(0);
    expect(s.months).toBe(12);
  });

  it("groups by calendar year and loan year", () => {
    const s = datedSchedule(300_000, 6.5, 360, DEC_2026);
    const years = byCalendarYear(s);
    expect(years[0].year).toBe(2026);
    expect(years[0].rows.length).toBe(1);
    expect(years[1].rows.length).toBe(12);
    expect(years[years.length - 1].year).toBe(2056);
    const sum = years.reduce((x, y) => x + y.interest, 0);
    expect(sum).toBeCloseTo(s.totalInterest, 4);
    const bal = balanceByLoanYear(300_000, s);
    expect(bal.length).toBe(31);
    expect(bal[30]).toBeCloseTo(0, 4);
    const int = interestByLoanYear(s);
    expect(int[int.length - 1]).toBeCloseTo(s.totalInterest, 4);
    expect(tippingPoint(s)).toBeGreaterThan(200);
    expect(tippingPoint(datedSchedule(100_000, 6.5, 120, DEC_2026))).toBe(1);
  });
});

describe("earlyPayoff", () => {
  const base = { balance: 300_000, aprPct: 6.5, monthsLeft: 324, extraMonthly: 0, biweekly: false, lumpSum: 0, extraYearly: 0, yearlyMonth: 1, next: DEC_2026 };

  it("saves nothing with no extra", () => {
    const p = earlyPayoff(base);
    expect(p.interestSaved).toBeCloseTo(0, 6);
    expect(p.monthsSaved).toBe(0);
    expect(p.base.months).toBe(324);
  });

  it("biweekly adds one payment a year", () => {
    const p = earlyPayoff({ ...base, biweekly: true });
    expect(p.biweeklyExtra).toBeCloseTo(p.payment / 12, 6);
    expect(p.monthsSaved).toBeGreaterThan(36);
    expect(p.interestSaved).toBeGreaterThan(0);
  });

  it("finds the extra for a target and hits it", () => {
    const x = extraForTarget(300_000, 6.5, 324, 240);
    const s = datedSchedule(300_000, 6.5, 324, DEC_2026, { ...NO_EXTRA, monthly: x });
    expect(s.months).toBeLessThanOrEqual(240);
    const less = datedSchedule(300_000, 6.5, 324, DEC_2026, { ...NO_EXTRA, monthly: x - 0.5 });
    expect(less.months).toBeGreaterThan(240);
    // Close to the payment difference for a 240-month loan.
    expect(x).toBeCloseTo(monthlyPayment(300_000, 6.5, 240) - monthlyPayment(300_000, 6.5, 324), 0);
    expect(extraForTarget(300_000, 6.5, 324, 400)).toBe(0);
  });

  it("prepaying beats investing below the loan rate and loses above it", () => {
    const low = prepayVsInvest(300_000, 6.5, 324, 300, 0, 4);
    const high = prepayVsInvest(300_000, 6.5, 324, 300, 0, 9);
    expect(low.difference).toBeGreaterThan(0);
    expect(high.difference).toBeLessThan(0);
    expect(low.breakEvenReturnPct).toBeCloseTo(6.5, 1);
  });
});

describe("equity and HELOC", () => {
  it("works out borrowing power", () => {
    const e = equityAvailable(500_000, 300_000, 85);
    expect(e.maxDebt).toBe(425_000);
    expect(e.available).toBe(125_000);
    expect(e.cltvNow).toBeCloseTo(0.6, 6);
    expect(equityAvailable(300_000, 290_000, 80).available).toBe(0);
  });

  it("charges interest only in the draw period, then amortizes", () => {
    const h = heloc({ draw: 50_000, primePct: 7, marginPct: 0.5, drawYears: 10, repayYears: 20, pattern: "now", rateChange: 0, annualFee: 50 });
    expect(h.ratePct).toBe(7.5);
    expect(h.drawPayment).toBeCloseTo(312.5, 6);
    expect(h.repayPayment).toBeCloseTo(monthlyPayment(50_000, 7.5, 240), 6);
    expect(h.drawInterest).toBeCloseTo(312.5 * 120, 4);
    expect(h.months.length).toBe(360);
    expect(h.fees).toBe(500);
    expect(h.jump).toBeGreaterThan(0);
  });

  it("draws evenly and stress-tests the rate", () => {
    const h = heloc({ draw: 60_000, primePct: 7, marginPct: 0, drawYears: 5, repayYears: 10, pattern: "even", rateChange: 2, annualFee: 0 });
    expect(h.firstPayment).toBeCloseTo((1_000 * 7) / 1200, 6);
    expect(h.months[59].balance).toBeCloseTo(60_000, 6);
    expect(h.repayRatePct).toBe(9);
    expect(h.repayPayment).toBeCloseTo(monthlyPayment(60_000, 9, 120), 6);
  });

  it("compares a home equity loan, HELOC and cash-out refinance", () => {
    const o = equityOptions({
      cash: 50_000,
      owed: 250_000,
      mortgagePct: 4,
      monthsLeft: 300,
      helPct: 8.66,
      helYears: 15,
      helCosts: 1_000,
      helocPct: 7.5,
      helocDrawYears: 10,
      helocRepayYears: 20,
      helocCosts: 500,
      refiPct: 7.3,
      refiYears: 30,
      refiCosts: 9_000,
    });
    expect(o.keepPayment).toBeCloseTo(monthlyPayment(250_000, 4, 300), 6);
    const [hel, h, refi] = o.options;
    expect(hel.monthlyNow).toBeCloseTo(o.keepPayment + monthlyPayment(50_000, 8.66, 180), 6);
    expect(h.monthlyNow).toBeLessThan(h.monthlyLater);
    expect(refi.monthlyNow).toBeCloseTo(monthlyPayment(300_000, 7.3, 360), 6);
    // Refinancing a 4% mortgage at 7.3% costs far more than a second loan.
    expect(refi.extraCost).toBeGreaterThan(hel.extraCost);
  });

  it("limits the deductible share", () => {
    expect(deductibleShare(400_000, 50_000, true)).toEqual({ mortgage: 1, equity: 1 });
    expect(deductibleShare(400_000, 50_000, false)).toEqual({ mortgage: 1, equity: 0 });
    const s = deductibleShare(700_000, 100_000, true);
    expect(s.equity).toBeCloseTo(750 / 800, 6);
  });
});

describe("points", () => {
  it("costs 1% a point and breaks even on the saving", () => {
    const p = pointsOption(400_000, 7, 30, 1, 0.25, 10);
    expect(p.cost).toBe(4_000);
    expect(p.ratePct).toBe(6.75);
    const saving = monthlyPayment(400_000, 7, 360) - monthlyPayment(400_000, 6.75, 360);
    expect(p.saving).toBeCloseTo(saving, 6);
    expect(p.breakEven).toBe(Math.ceil(4_000 / saving));
    expect(p.breakEvenWithBalance).toBeLessThanOrEqual(p.breakEven);
    expect(p.netAtStay).toBeGreaterThan(0);
  });

  it("is a loss if you leave early", () => {
    const p = pointsOption(400_000, 7, 30, 2, 0.25, 2);
    expect(p.netAtStay).toBeLessThan(0);
  });

  it("treats lender credits the other way round", () => {
    const c = pointsOption(400_000, 7, 30, -1, 0.25, 3);
    expect(c.cost).toBe(-4_000);
    expect(c.ratePct).toBe(7.25);
    expect(c.saving).toBeLessThan(0);
    expect(c.netAtStay).toBeGreaterThan(0);
    expect(Number.isFinite(c.breakEven)).toBe(true);
  });

  it("no points is the baseline", () => {
    const p = pointsOption(400_000, 7, 30, 0, 0.25, 10);
    expect(p.cost).toBe(0);
    expect(p.saving).toBe(0);
    expect(p.breakEven).toBe(0);
    expect(p.netAtStay).toBe(0);
  });

  it("values the tax deduction", () => {
    expect(pointsTaxValue(4_000, "buy", 30, 22).firstYear).toBeCloseTo(880, 6);
    expect(pointsTaxValue(4_000, "refi", 30, 22).perYear).toBeCloseTo((4_000 / 30) * 0.22, 6);
  });
});

describe("pointsGainByYear", () => {
  it("rises past the cost at the fuller break-even", () => {
    const g = pointsGainByYear(400_000, 7, 30, 1, 0.25);
    expect(g.length).toBe(31);
    expect(g[0]).toBe(0);
    const p = pointsOption(400_000, 7, 30, 1, 0.25, 10);
    expect(g[10]).toBeCloseTo(p.netAtStay + p.cost, 6);
  });
});
