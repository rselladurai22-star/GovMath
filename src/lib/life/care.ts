/**
 * Care home means test, 2026/27, for the four UK nations.
 *
 * England and Northern Ireland: capital over £23,250 means you pay in full.
 * Between £14,250 and £23,250, each £250 (or part) counts as £1 a week of
 * income. Scotland uses £36,750 and £22,750. Wales has a single £50,000 limit
 * with no tariff income.
 *
 * You pay your assessed income (plus tariff income) less the personal
 * allowance, up to the council's rate. The council pays the rest. A more
 * expensive home needs a third-party top-up.
 */

export type Nation = "england" | "scotland" | "wales" | "ni";

export const CARE_2026: Record<Nation, { upper: number; lower: number; allowance: number; tariff: boolean; label: string }> = {
  england: { upper: 23_250, lower: 14_250, allowance: 31.8, tariff: true, label: "England" },
  scotland: { upper: 36_750, lower: 22_750, allowance: 37.65, tariff: true, label: "Scotland" },
  wales: { upper: 50_000, lower: 50_000, allowance: 46.35, tariff: false, label: "Wales" },
  ni: { upper: 23_250, lower: 14_250, allowance: 36.62, tariff: true, label: "Northern Ireland" },
};

/** NHS-funded nursing care in England, a week from April 2026. */
export const FNC_2026 = { standard: 267.68, higher: 368.24 } as const;
/** Scotland's free personal and nursing care payments, a week. */
export const SCOTLAND_FREE_CARE = { personal: 260.3, nursing: 117.1 } as const;

export type CareInput = {
  nation: Nation;
  /** Savings and investments. */
  savings: number;
  /** Value of the home, counted unless disregarded. */
  home: number;
  /** A partner or qualifying relative still lives in the home, so it is ignored. */
  homeDisregarded: boolean;
  /** Weekly income: pensions and most benefits. */
  income: number;
  /** Weekly fee of the chosen home. */
  fee: number;
  /** The council's usual weekly rate for that type of care. */
  councilRate: number;
  /** Nursing care, so NHS-funded nursing care (England) or free nursing care (Scotland) applies. */
  nursing: boolean;
};

export type CareResult = {
  capital: number;
  selfFunder: boolean;
  tariff: number;
  /** Your weekly contribution while council-funded. */
  you: number;
  council: number;
  topUp: number;
  /** NHS or Scottish government money towards the fee. */
  stateCare: number;
  /** Weekly cost to you as a self-funder (fee less state care). */
  selfFundCost: number;
  /** Weekly amount by which capital falls while self-funding. */
  burn: number;
  /** Weeks until capital falls to the upper limit (Infinity if it never does). */
  weeksToLimit: number;
};

export function tariffIncome(capital: number, nation: Nation): number {
  const r = CARE_2026[nation];
  if (!r.tariff) return 0;
  return capital > r.lower ? Math.ceil((Math.min(capital, r.upper) - r.lower) / 250) : 0;
}

export function careMeansTest(i: CareInput): CareResult {
  const r = CARE_2026[i.nation];
  const capital = Math.max(0, i.savings) + (i.homeDisregarded ? 0 : Math.max(0, i.home));
  const income = Math.max(0, i.income);
  const fee = Math.max(0, i.fee);
  const rate = Math.max(0, Math.min(i.councilRate || fee, fee));

  let stateCare = 0;
  if (i.nation === "england" && i.nursing) stateCare = FNC_2026.standard;
  if (i.nation === "scotland") stateCare = SCOTLAND_FREE_CARE.personal + (i.nursing ? SCOTLAND_FREE_CARE.nursing : 0);
  stateCare = Math.min(stateCare, fee);

  const selfFunder = capital > r.upper;
  const selfFundCost = Math.max(0, fee - stateCare);
  const burn = Math.max(0, selfFundCost - income);
  const weeksToLimit = selfFunder ? (burn > 0 ? (capital - r.upper) / burn : Infinity) : 0;

  const tariff = tariffIncome(capital, i.nation);
  const funded = Math.max(0, rate - stateCare);
  const you = selfFunder ? selfFundCost : Math.min(funded, Math.max(0, income + tariff - r.allowance));
  const council = selfFunder ? 0 : Math.max(0, funded - you);
  const topUp = selfFunder ? 0 : Math.max(0, fee - rate);

  return { capital, selfFunder, tariff, you, council, topUp, stateCare, selfFundCost, burn, weeksToLimit };
}

export type SpendPoint = { week: number; capital: number; youPay: number; council: number };

/**
 * Week-by-week projection of capital. A self-funder pays the fee (less any
 * state care) from income first and capital second. Once capital is at or
 * below the upper limit, the council funds up to its rate: income less the
 * personal allowance is paid from income and tariff income from capital.
 * Capital stops falling at the lower limit. A top-up above the council rate is
 * assumed to come from a third party.
 */
export function spendDown(i: CareInput, weeks: number): SpendPoint[] {
  const r = CARE_2026[i.nation];
  let capital = Math.max(0, i.savings) + (i.homeDisregarded ? 0 : Math.max(0, i.home));
  const out: SpendPoint[] = [];
  for (let w = 0; w <= weeks; w++) {
    const res = careMeansTest({ ...i, savings: capital, home: 0, homeDisregarded: true });
    out.push({ week: w, capital, youPay: res.you, council: res.council });
    const fromIncome = res.selfFunder ? Math.max(0, i.income) : Math.max(0, i.income - r.allowance);
    capital = Math.max(0, capital - Math.max(0, res.you - fromIncome));
  }
  return out;
}
