/**
 * Premium Bonds: the prize rate, the prize table and a seeded simulation of a year's prizes.
 */

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
