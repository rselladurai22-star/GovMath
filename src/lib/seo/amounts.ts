import { computeTakeHome, type StudentPlan, type TaxRegion } from "../tax/take-home-engine";
import { stampDuty, type BuyerType } from "../tax/sdlt-2025";
import { lbtt, ltt } from "../tax/regional-stamp-duty";
import { employeeCost, EMPLOYER } from "../business/company";
import { hicbc } from "../benefits/family";
import { NMW_2026 } from "../benefits/minimum-wage";
import { marriageAllowance, payRise, salarySacrifice } from "../tax/pay-and-perks";
import { PLANS_2026, repayments2026, type Plan } from "../students/loans";
import { monthlyPaymentFor } from "../property/mortgage-engine";
import { fullMovingBudget, type MoveBuyer } from "../property/moving-budget";

/**
 * The fixed amounts that get their own page: "£30,000 after tax" and
 * "Stamp Duty on £350,000". Each page's figures come from the site's tested
 * engines; this module only chooses the amounts and gathers the results.
 */

/** Salaries with a page: every £1,000 from £15,000 to £150,000, then a few round figures. */
export const SALARY_AMOUNTS: number[] = [
  ...Array.from({ length: 136 }, (_, i) => 15_000 + i * 1_000),
  160_000,
  175_000,
  200_000,
  250_000,
];

/** House prices with a page: every £25,000 from £100,000 to £1m, then every £100,000 to £2m. */
export const PRICE_AMOUNTS: number[] = [
  ...Array.from({ length: 37 }, (_, i) => 100_000 + i * 25_000),
  ...Array.from({ length: 10 }, (_, i) => 1_100_000 + i * 100_000),
];

/** Reads an amount from a URL segment; only listed amounts are valid. */
export function parseAmount(segment: string, list: number[]): number | undefined {
  if (!/^\d+$/.test(segment)) return undefined;
  const n = Number(segment);
  return list.includes(n) ? n : undefined;
}

/** The listed amounts either side of `n` (up to `each` on each side). */
export function neighbours(n: number, list: number[], each = 3): number[] {
  const i = list.indexOf(n);
  if (i < 0) return [];
  return list.slice(Math.max(0, i - each), i + each + 1);
}

export type PayLine = { label: string; tax: number; ni: number; loan: number; pension: number; takeHome: number };

export type SalaryFacts = {
  salary: number;
  takeHome: number;
  monthly: number;
  weekly: number;
  tax: number;
  ni: number;
  personalAllowance: number;
  effectiveRate: number;
  marginalRate: number;
  bands: { label: string; rate: number; income: number; tax: number }[];
  scotland: { takeHome: number; tax: number; marginalRate: number; bands: { label: string; rate: number; income: number; tax: number }[] };
  /** The same salary with common deductions, England, Wales and NI. */
  variants: PayLine[];
  /** Take-home per hour at 37.5 hours a week for 52 weeks. */
  hourlyGross: number;
  hourlyNet: number;
};

const line = (label: string, gross: number, pensionPct: number, plan: StudentPlan, region: TaxRegion = "ruk"): PayLine => {
  const t = computeTakeHome({ gross, bonus: 0, pensionPct, plan, region });
  return { label, tax: t.incomeTaxTotal, ni: t.ni.total, loan: t.studentLoan, pension: t.pensionContribution, takeHome: t.takeHome };
};

export function salaryFacts(salary: number): SalaryFacts {
  const r = computeTakeHome({ gross: salary, bonus: 0, pensionPct: 0, plan: "none", region: "ruk" });
  const s = computeTakeHome({ gross: salary, bonus: 0, pensionPct: 0, plan: "none", region: "scotland" });
  const hours = 37.5 * 52;
  return {
    salary,
    takeHome: r.takeHome,
    monthly: r.takeHome / 12,
    weekly: r.takeHome / 52,
    tax: r.incomeTaxTotal,
    ni: r.ni.total,
    personalAllowance: r.incomeTax.personalAllowance,
    effectiveRate: r.effectiveRate,
    marginalRate: r.marginalRate,
    bands: r.taxBands,
    scotland: { takeHome: s.takeHome, tax: s.incomeTaxTotal, marginalRate: s.marginalRate, bands: s.taxBands },
    variants: [
      line("No pension or student loan", salary, 0, "none"),
      line("5% pension by salary sacrifice", salary, 5, "none"),
      line("Plan 2 student loan", salary, 0, "plan2"),
      line("Plan 5 student loan", salary, 0, "plan5"),
      line("5% pension and Plan 2 loan", salary, 5, "plan2"),
    ],
    hourlyGross: salary / hours,
    hourlyNet: r.takeHome / hours,
  };
}

export type StampDutyFacts = {
  price: number;
  mover: ReturnType<typeof stampDuty>;
  firstTime: ReturnType<typeof stampDuty>;
  additional: ReturnType<typeof stampDuty>;
  scotland: { mover: number; firstTime: number; additional: number };
  wales: { mover: number; additional: number };
};

export function stampDutyFacts(price: number): StampDutyFacts {
  const sd = (b: BuyerType) => stampDuty(price, b);
  return {
    price,
    mover: sd("standard"),
    firstTime: sd("first-time"),
    additional: sd("additional"),
    scotland: { mover: lbtt(price).total, firstTime: lbtt(price, "first-time").total, additional: lbtt(price, "additional").total },
    wales: { mover: ltt(price).total, additional: ltt(price, true).total },
  };
}

/* ── Extra figures that make each amount page specific to its amount ── */

/** Lending assumptions, matching the affordability calculator's defaults. */
export const LENDING = { multiple: 4.5, ratePct: 4.5, termYears: 25 } as const;

export type SalaryExtras = {
  /** Employer NI and the minimum 3% auto-enrolment pension on top of the salary. */
  employer: { ni: number; pension: number; total: number };
  /** Extra take-home from a £1,000 rise, and from a 5% rise. */
  rise1000: number;
  rise5pct: { rise: number; extra: number };
  /** What £100 a month more into a pension by salary sacrifice costs you a month. */
  pension100: number;
  /** High Income Child Benefit Charge for one and two children (no pension). */
  childBenefit: { children: number; benefit: number; charge: number; keep: number }[];
  /** Pension needed to bring income back to £60,000 and avoid the charge. */
  pensionToAvoidCharge: number;
  /** Rough mortgage borrowing on this salary alone. */
  mortgage: { loan: number; priceWith10: number; monthly: number; shareOfTakeHome: number };
  /** Student loan repayments by plan. */
  loans: { plan: Plan; label: string; threshold: number; yearly: number; monthly: number }[];
  /** Household gain from Marriage Allowance if a partner earns under £12,570 (0 if not eligible). */
  marriageGain: number;
  /** Hours a week this salary pays for at the National Living Wage. */
  nlwHoursPerWeek: number;
  /** Full-time pay (37.5 hours) at the National Living Wage. */
  nlwFullTime: number;
};

export function salaryExtras(salary: number): SalaryExtras {
  const base = { region: "ruk" as const, plan: "none" as const, pensionPct: 0, inflation: 0, children: 0 };
  const cost = employeeCost({ salary, bonus: 0, pensionPct: EMPLOYER.aeEmployerMin, pensionOnFullPay: false, sacrificePct: 0, relief: "none", benefits: 0, headcount: 1, employmentAllowance: false });
  const fivePct = payRise({ ...base, salary, newSalary: salary * 1.05 });
  const sacrifice = salarySacrifice({ salary, amount: 1_200, kind: "pension", region: "ruk", plan: "none", employerShare: 0, hours: 0 });
  const childBenefit = [1, 2].map((children) => {
    const h = hicbc({ children, income: salary, pension: 0, giftAid: 0, weeks: 52 });
    return { children, benefit: h.benefit, charge: h.charge, keep: h.keep };
  });
  const loan = salary * LENDING.multiple;
  const monthly = monthlyPaymentFor(loan, LENDING.ratePct, LENDING.termYears, "repayment");
  const takeHome = computeTakeHome({ gross: salary, bonus: 0, pensionPct: 0, plan: "none", region: "ruk" }).takeHome;
  const plans: Plan[] = ["plan1", "plan2", "plan4", "plan5", "postgrad"];
  const nlw = NMW_2026["national-living-wage"].hourly;
  return {
    employer: { ni: cost.employerNi, pension: cost.pension, total: cost.costEach },
    rise1000: payRise({ ...base, salary, newSalary: salary + 1_000 }).extra,
    rise5pct: { rise: fivePct.rise, extra: fivePct.extra },
    pension100: sacrifice.cost / 12,
    childBenefit,
    pensionToAvoidCharge: Math.max(0, salary - 60_000),
    mortgage: { loan, priceWith10: loan / 0.9, monthly, shareOfTakeHome: monthly / (takeHome / 12) },
    loans: plans.map((plan) => {
      const r = repayments2026({ salary, plans: [plan] });
      return { plan, label: PLANS_2026[plan].label, threshold: PLANS_2026[plan].threshold, yearly: r.yearly, monthly: r.monthly };
    }),
    marriageGain: marriageAllowance({ transferorIncome: 0, recipientIncome: salary, transferorScotland: false, recipientScotland: false, backdate: 0 }).netGain,
    nlwHoursPerWeek: salary / 52 / nlw,
    nlwFullTime: nlw * 37.5 * 52,
  };
}

/** Typical one-off buying costs, matching the moving house calculator's defaults. */
export const BUYING_COSTS = { legal: 1_500, survey: "homebuyer", mortgageFee: 999, removals: 1_000 } as const;

/** England and Northern Ireland band edges, for the "near a threshold" notes. */
const SDLT_EDGES = [125_000, 250_000, 925_000, 1_500_000];

export type PriceExtras = {
  /** Deposit, loan, monthly payment and the income a lender would want, at common deposit sizes. */
  deposits: { pct: number; deposit: number; loan: number; monthly: number; incomeNeeded: number }[];
  /** Cash to complete for a first-time buyer and a home mover (10% deposit, no sale). */
  cash: { buyer: MoveBuyer; tax: number; fees: number; costs: number; cashNeeded: number }[];
  /** Extra Stamp Duty on the next £1,000 of price (home mover). */
  nextThousand: number;
  /** The band edge just below the price, and the tax there (home mover). */
  edgeBelow: { price: number; tax: number } | null;
};

export function priceExtras(price: number): PriceExtras {
  const deposits = [5, 10, 15, 25].map((pct) => {
    const deposit = (price * pct) / 100;
    const loan = price - deposit;
    return { pct, deposit, loan, monthly: monthlyPaymentFor(loan, LENDING.ratePct, LENDING.termYears, "repayment"), incomeNeeded: loan / LENDING.multiple };
  });
  const cash = (["first-time", "standard"] as MoveBuyer[]).map((buyer) => {
    const r = fullMovingBudget({
      price,
      deposit: price * 0.1,
      nation: "england",
      buyer,
      legal: BUYING_COSTS.legal,
      survey: BUYING_COSTS.survey,
      mortgageFee: BUYING_COSTS.mortgageFee,
      removals: BUYING_COSTS.removals,
      salePrice: 0,
      agentPct: 0,
      sellingLegal: 0,
      saleMortgage: 0,
      furnishing: 0,
      contingencyPct: 0,
    });
    return { buyer, tax: r.propertyTax, fees: r.costs - r.propertyTax, costs: r.costs, cashNeeded: r.cashNeeded };
  });
  const below = SDLT_EDGES.filter((e) => e < price).at(-1);
  return {
    deposits,
    cash,
    nextThousand: stampDuty(price + 1_000).total - stampDuty(price).total,
    edgeBelow: below ? { price: below, tax: stampDuty(below).total } : null,
  };
}

/** The nearest listed amount at or below `n` (or the lowest one). */
export function nearestAtOrBelow(n: number, list: number[]): number {
  return list.filter((a) => a <= n).at(-1) ?? list[0];
}
