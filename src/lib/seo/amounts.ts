import { computeTakeHome, type StudentPlan, type TaxRegion } from "../tax/take-home-engine";
import { stampDuty, type BuyerType } from "../tax/sdlt-2025";
import { lbtt, ltt } from "../tax/regional-stamp-duty";

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
