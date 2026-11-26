/**
 * Premium Bonds: the prize rate, the prize table and a seeded simulation of a year's prizes.
 */

/* ── Premium Bonds ───────────────────────────────────────────────── */

/**
 * NS&I: prize fund rate 4.35% and odds of 21,000 to 1 per £1 Bond each month,
 * both variable, from the September 2026 draw (nsandi.com/products/premium-bonds).
 * Prizes: the November 2026 draw as published on NS&I's "How we share out
 * Premium Bonds prizes" page (6,575,175 prizes worth £500,535,100).
 */
export const PREMIUM_BONDS = {
  rate: 0.0435,
  odds: 21_000,
  min: 25,
  max: 50_000,
  /** The draw the prize table is from. */
  draw: "November 2026",
  /** Prizes in a monthly draw. */
  prizes: [
    [1_000_000, 2],
    [100_000, 96],
    [50_000, 192],
    [25_000, 385],
    [10_000, 962],
    [5_000, 1_922],
    [1_000, 20_020],
    [500, 60_060],
    [100, 2_381_417],
    [50, 2_381_417],
    [25, 1_728_702],
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
  /** Chance of no prize at all in the year. */
  chanceNothing: number;
  /** Every simulated year's total, sorted from lowest to highest. */
  totals: number[];
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
    chanceNothing: Math.exp(-lambdaMonth * 12),
    totals,
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

/* ── A savings account to compare with, after tax ─────────────────── */

export type TaxBand = "none" | "basic" | "higher" | "additional";

/**
 * Personal Savings Allowance and the tax on savings interest above it, 2026/27
 * (GOV.UK: tax on savings interest). Basic-rate taxpayers have £1,000 tax-free,
 * higher-rate £500 and additional-rate none. "none" covers non-taxpayers and
 * those whose interest sits in the £5,000 starting rate for savings.
 * Savings rates rise to 22%, 42% and 47% from April 2027.
 */
export const SAVINGS_TAX: Record<TaxBand, { rate: number; psa: number; label: string }> = {
  none: { rate: 0, psa: Infinity, label: "Non-taxpayer or starting rate" },
  basic: { rate: 0.2, psa: 1_000, label: "Basic rate (20%)" },
  higher: { rate: 0.4, psa: 500, label: "Higher rate (40%)" },
  additional: { rate: 0.45, psa: 0, label: "Additional rate (45%)" },
};

export type SavingsAfterTax = { interest: number; tax: number; net: number; allowanceLeft: number };

/** A year's interest on `amount` at `rate`, after tax at `band`, with `psaUsed` of the allowance already used elsewhere. */
export function savingsAfterTax(amount: number, rate: number, band: TaxBand, psaUsed = 0): SavingsAfterTax {
  const b = SAVINGS_TAX[band];
  const interest = Math.max(0, amount) * Math.max(0, rate);
  const allowanceLeft = Math.max(0, b.psa - Math.max(0, psaUsed));
  const tax = Math.max(0, interest - allowanceLeft) * b.rate;
  return { interest, tax, net: interest - tax, allowanceLeft };
}

/** The interest rate a savings account must pay, before tax, to match `netRate` after tax (with no allowance left). */
export function grossEquivalent(netRate: number, band: TaxBand): number {
  return netRate / (1 - SAVINGS_TAX[band].rate);
}
