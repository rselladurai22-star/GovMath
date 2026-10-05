/**
 * Growth, inflation, financial independence and Premium Bonds.
 */

/* ── Compound growth ────────────────────────────────────────────── */

export type CompoundInput = {
  principal: number;
  monthly: number;
  /** Annual rate as a decimal. */
  rate: number;
  years: number;
  /** Times interest is added a year: 1, 4, 12 or 365. */
  periods: number;
  /** Yearly rise in the monthly contribution, as a decimal. */
  escalation?: number;
  /** Inflation as a decimal, to show today's money. */
  inflation?: number;
};

export type CompoundYear = { year: number; contributed: number; interest: number; balance: number; real: number };

export type CompoundResult = { schedule: CompoundYear[]; balance: number; contributed: number; interest: number; real: number; effectiveRate: number };

/** Annual equivalent rate for a nominal rate compounded `periods` times a year. */
export const aer = (rate: number, periods: number) => (periods >= 365 ? Math.exp(rate) - 1 : Math.pow(1 + rate / periods, periods) - 1);

export function compound(i: CompoundInput): CompoundResult {
  const years = Math.max(0, Math.min(100, Math.round(i.years)));
  // Work month by month using the monthly rate equivalent to the chosen compounding.
  const monthlyRate = Math.pow(1 + aer(i.rate, Math.max(1, i.periods)), 1 / 12) - 1;
  const inf = i.inflation ?? 0;
  let balance = Math.max(0, i.principal);
  let contributed = balance;
  let monthly = Math.max(0, i.monthly);
  const schedule: CompoundYear[] = [{ year: 0, contributed, interest: 0, balance, real: balance }];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
      contributed += monthly;
    }
    schedule.push({ year: y, contributed, interest: balance - contributed, balance, real: balance / Math.pow(1 + inf, y) });
    monthly *= 1 + (i.escalation ?? 0);
  }
  const last = schedule[schedule.length - 1];
  return { schedule, balance: last.balance, contributed: last.contributed, interest: last.interest, real: last.real, effectiveRate: aer(i.rate, Math.max(1, i.periods)) };
}

/** Years to double at a rate, exactly and by the rule of 72. */
export function doublingYears(rate: number): { exact: number; rule72: number } {
  return { exact: rate > 0 ? Math.log(2) / Math.log(1 + rate) : Infinity, rule72: rate > 0 ? 72 / (rate * 100) : Infinity };
}

/* ── Inflation ──────────────────────────────────────────────────── */

export const CPI_LATEST = { rate: 0.031, month: "August 2026", target: 0.02 } as const;

/** What something costing `price` today will cost after `years` of inflation. */
export const futureCost = (price: number, inflation: number, years: number) => price * Math.pow(1 + inflation, years);
/** Real return after inflation (Fisher). */
export const realReturn = (nominal: number, inflation: number) => (1 + nominal) / (1 + inflation) - 1;
/** Years for prices to double, or money to lose half its buying power. */
export const halvingYears = (inflation: number) => (inflation > 0 ? Math.log(2) / Math.log(1 + inflation) : Infinity);

/* ── Financial independence ─────────────────────────────────────── */

export type FireInput = {
  age: number;
  spend: number;
  pot: number;
  monthly: number;
  /** Real return a year, as a decimal (after inflation and charges). */
  realReturn: number;
  /** Safe withdrawal rate, as a decimal. */
  swr: number;
  /** State Pension a year in today's money, from `spa`. 0 to ignore. */
  statePension: number;
  spa: number;
};

export type FireResult = {
  target: number;
  /** Target without the State Pension. */
  targetNoSp: number;
  years: number;
  fiAge: number;
  coastAt: number;
  path: number[];
  reached: boolean;
};

/**
 * Pot needed: enough to draw (spend − State Pension) for ever at the safe
 * withdrawal rate, plus a bridge covering the State Pension until it starts,
 * discounted at the real return.
 */
export function fireTarget(spend: number, swr: number, statePension: number, yearsToSpa: number, realRet: number): number {
  const base = Math.max(0, spend - statePension) / Math.max(0.001, swr);
  const n = Math.max(0, yearsToSpa);
  const bridge = statePension > 0 && n > 0 ? (realRet > 0 ? statePension * (1 - Math.pow(1 + realRet, -n)) / realRet : statePension * n) : 0;
  return base + bridge;
}

export function fire(i: FireInput): FireResult {
  const targetNoSp = Math.max(0, i.spend) / Math.max(0.001, i.swr);
  const monthlyRate = Math.pow(1 + i.realReturn, 1 / 12) - 1;
  let pot = Math.max(0, i.pot);
  const path = [pot];
  let years = Infinity;
  let target = fireTarget(i.spend, i.swr, i.statePension, i.spa - i.age, i.realReturn);
  if (pot >= target) years = 0;
  for (let y = 1; y <= 70 && years === Infinity; y++) {
    for (let m = 0; m < 12; m++) pot = pot * (1 + monthlyRate) + Math.max(0, i.monthly);
    path.push(pot);
    target = fireTarget(i.spend, i.swr, i.statePension, i.spa - (i.age + y), i.realReturn);
    if (pot >= target) years = y;
  }
  // Coast: the pot today that would grow, with no more saving, to the target by the State Pension age.
  const yrsToSpa = Math.max(0, i.spa - i.age);
  const coastAt = fireTarget(i.spend, i.swr, i.statePension, 0, i.realReturn) / Math.pow(1 + i.realReturn, yrsToSpa);
  return { target, targetNoSp, years, fiAge: i.age + years, coastAt, path, reached: years !== Infinity };
}

/* ── Premium Bonds (from the September 2026 draw) ───────────────── */

export const PREMIUM_BONDS = {
  rate: 0.0435,
  odds: 21_000,
  min: 25,
  max: 50_000,
  /** Estimated prizes in a monthly draw. */
  prizes: [
    [1_000_000, 2],
    [100_000, 95],
    [50_000, 192],
    [25_000, 382],
    [10_000, 954],
    [5_000, 1_909],
    [1_000, 19_892],
    [500, 59_676],
    [100, 2_366_135],
    [50, 2_366_135],
    [25, 1_717_659],
  ] as [number, number][],
} as const;

const totalPrizes = PREMIUM_BONDS.prizes.reduce((a, [, n]) => a + n, 0);
export const AVERAGE_PRIZE = PREMIUM_BONDS.prizes.reduce((a, [v, n]) => a + v * n, 0) / totalPrizes;

/** Small, fast, seeded random numbers so results are the same every time. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function poisson(lambda: number, rnd: () => number): number {
  if (lambda > 30) {
    // Normal approximation for large holdings.
    const u = Math.max(1e-12, rnd());
    const v = rnd();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * z));
  }
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= rnd();
  } while (p > L);
  return k - 1;
}

const cumulative = (() => {
  let c = 0;
  return PREMIUM_BONDS.prizes.map(([v, n]) => {
    c += n / totalPrizes;
    return [v, c] as [number, number];
  });
})();

function drawPrize(rnd: () => number): number {
  const u = rnd();
  for (const [v, c] of cumulative) if (u <= c) return v;
  return 25;
}

export type BondsResult = {
  holding: number;
  expected: number;
  winsPerYear: number;
  chanceAnyWin: number;
  median: number;
  p10: number;
  p90: number;
  medianRate: number;
  chanceBeatRate: number;
};

/** Expected and simulated prizes over a year for a holding. */
export function premiumBondsYear(holding: number, rate: number = PREMIUM_BONDS.rate, sims = 4_000, seed = 42): BondsResult {
  const h = Math.max(0, Math.min(PREMIUM_BONDS.max, Math.floor(holding)));
  const scale = rate / PREMIUM_BONDS.rate;
  const lambdaMonth = h / PREMIUM_BONDS.odds;
  const rnd = mulberry32(seed);
  const totals: number[] = [];
  for (let s = 0; s < sims; s++) {
    let sum = 0;
    for (let m = 0; m < 12; m++) {
      const wins = poisson(lambdaMonth, rnd);
      for (let w = 0; w < wins; w++) sum += drawPrize(rnd);
    }
    totals.push(sum * scale);
  }
  totals.sort((a, b) => a - b);
  const q = (p: number) => totals[Math.min(totals.length - 1, Math.floor(p * totals.length))];
  const expected = h * rate;
  return {
    holding: h,
    expected,
    winsPerYear: lambdaMonth * 12,
    chanceAnyWin: 1 - Math.exp(-lambdaMonth * 12),
    median: q(0.5),
    p10: q(0.1),
    p90: q(0.9),
    medianRate: h > 0 ? q(0.5) / h : 0,
    chanceBeatRate: totals.filter((t) => t >= expected).length / totals.length,
  };
}
