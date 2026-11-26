/**
 * Student finance outside England, 2026/27.
 *
 * Scotland (SAAS): tuition is free at Scottish universities; living-cost
 * support is a bursary plus a Plan 4 loan, by household income band.
 * Wales (Student Finance Wales): every student gets the same total support,
 * split between a Welsh Government Learning Grant (tapered by household income
 * from £18,370 to £59,200, minimum £1,020) and a Plan 2 Maintenance Loan.
 * Sources: SAAS parent and carer funding information 2026/27; Student Finance
 * Wales 2026/27 tables.
 */

/* ── Scotland ──────────────────────────────────────────────────── */

export type SaasBand = { upTo: number; bursary: number; loan: number };

export const SAAS_2026 = {
  young: [
    { upTo: 20_999, bursary: 2_000, loan: 9_400 },
    { upTo: 23_999, bursary: 1_125, loan: 9_400 },
    { upTo: 33_999, bursary: 500, loan: 9_400 },
    { upTo: Infinity, bursary: 0, loan: 8_400 },
  ] as SaasBand[],
  independent: [
    { upTo: 20_999, bursary: 1_000, loan: 10_400 },
    { upTo: 23_999, bursary: 0, loan: 10_400 },
    { upTo: 33_999, bursary: 0, loan: 9_900 },
    { upTo: Infinity, bursary: 0, loan: 8_400 },
  ] as SaasBand[],
  /** Tuition fee SAAS pays to a Scottish university for a Scottish student. */
  scottishFee: 1_820,
  /** Tuition Fee Loan to study elsewhere in the UK. */
  rukFeeLoan: 9_790,
  plan4Threshold: 33_795,
} as const;

export type SaasResult = { bursary: number; loan: number; total: number; band: number; monthly: number };

export function saas2026(income: number, independent: boolean): SaasResult {
  const bands = independent ? SAAS_2026.independent : SAAS_2026.young;
  const x = Math.max(0, Math.floor(income));
  const band = bands.findIndex((b) => x <= b.upTo);
  const b = bands[band];
  return { bursary: b.bursary, loan: b.loan, total: b.bursary + b.loan, band, monthly: (b.bursary + b.loan) / 12 };
}

/* ── Wales ─────────────────────────────────────────────────────── */

export type WalesLiving = "home" | "away" | "london";

export const WALES_2026: Record<WalesLiving, { total: number; maxGrant: number; label: string }> = {
  home: { total: 10_685, maxGrant: 7_020, label: "Living with parents" },
  away: { total: 12_590, maxGrant: 8_260, label: "Away from home, outside London" },
  london: { total: 15_720, maxGrant: 10_325, label: "Away from home, in London" },
};
export const WALES_GRANT = { minGrant: 1_020, fullTo: 18_370, minFrom: 59_200, feeLoan: 9_790, cancellation: 1_500 } as const;

export type WalesResult = { grant: number; loan: number; total: number; monthly: number };

/**
 * Grant at each household income in the published 2026/27 table (living with
 * parents, away, London). Student Finance Wales rounds its taper, so between
 * these points the grant is interpolated in a straight line.
 */
const WALES_TABLE: [number, number, number, number][] = [
  [18_370, 7020, 8260, 10325],
  [20_000, 6781, 7971, 9954],
  [25_000, 6046, 7085, 8814],
  [30_000, 5311, 6198, 7674],
  [35_000, 4577, 5311, 6535],
  [40_000, 3842, 4425, 5395],
  [45_000, 3107, 3538, 4255],
  [50_000, 2372, 2651, 3116],
  [55_000, 1638, 1765, 1976],
  [59_200, 1020, 1020, 1020],
];
const COL: Record<WalesLiving, 1 | 2 | 3> = { home: 1, away: 2, london: 3 };

export function wales2026(income: number, living: WalesLiving): WalesResult {
  const w = WALES_2026[living];
  const c = COL[living];
  const x = Math.max(0, income);
  let grant: number = WALES_GRANT.minGrant;
  if (x <= WALES_TABLE[0][0]) grant = w.maxGrant;
  else
    for (let k = 1; k < WALES_TABLE.length; k++) {
      const [x0, x1] = [WALES_TABLE[k - 1][0], WALES_TABLE[k][0]];
      if (x <= x1) {
        const [g0, g1] = [WALES_TABLE[k - 1][c], WALES_TABLE[k][c]];
        grant = Math.round(g0 + ((g1 - g0) * (x - x0)) / (x1 - x0));
        break;
      }
    }
  return { grant, loan: w.total - grant, total: w.total, monthly: w.total / 12 };
}
