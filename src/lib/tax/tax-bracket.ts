/**
 * Which Income Tax band you are in, 2026/27.
 *
 * Income for this purpose is gross pay less salary sacrifice, and less the
 * grossed-up value of personal pension contributions and Gift Aid. Those
 * extend your basic-rate band and reduce your adjusted net income, which for
 * finding your band has the same effect as reducing your income.
 */

import { computeTakeHome, marginalRate, type TaxRegion } from "./take-home-engine";

export type BandId = "none" | "starter" | "basic" | "intermediate" | "higher" | "taper" | "advanced" | "additional" | "top";

export const BAND_INFO: Record<BandId, { name: string; rate: number }> = {
  none: { name: "Below the tax-free allowance", rate: 0 },
  starter: { name: "Starter rate", rate: 0.19 },
  basic: { name: "Basic rate", rate: 0.2 },
  intermediate: { name: "Intermediate rate", rate: 0.21 },
  higher: { name: "Higher rate", rate: 0.4 },
  taper: { name: "Allowance taper (the 60% trap)", rate: 0.6 },
  advanced: { name: "Advanced rate", rate: 0.45 },
  additional: { name: "Additional rate", rate: 0.45 },
  top: { name: "Top rate", rate: 0.48 },
};

/** Band edges on adjusted income, low to high, for each region. */
const EDGES: Record<TaxRegion, { at: number; id: BandId }[]> = {
  ruk: [
    { at: 12_570, id: "basic" },
    { at: 50_270, id: "higher" },
    { at: 100_000, id: "taper" },
    { at: 125_140, id: "additional" },
  ],
  scotland: [
    { at: 12_570, id: "starter" },
    { at: 16_537, id: "basic" },
    { at: 29_526, id: "intermediate" },
    { at: 43_662, id: "higher" },
    { at: 75_000, id: "advanced" },
    { at: 100_000, id: "taper" },
    { at: 125_140, id: "top" },
  ],
};

export type BracketInput = {
  /** Gross employment or self-employed income a year. */
  income: number;
  region?: TaxRegion;
  /** Salary sacrifice pension, % of income. */
  sacrificePct?: number;
  /** Personal pension contributions paid net (relief at source), £ a year. */
  personalPensionNet?: number;
  /** Gift Aid donations paid, £ a year. */
  giftAidNet?: number;
};

export type BracketResult = {
  adjusted: number;
  band: BandId;
  /** Income Tax rate on the next £1. */
  taxRate: number;
  /** Income Tax plus employee NI on the next £1 of pay. */
  marginal: number;
  incomeTax: number;
  /** Income Tax as a share of gross income. */
  effective: number;
  next: { band: BandId; at: number; away: number } | null;
  previous: { band: BandId; at: number; over: number } | null;
};

function adjustedIncome(i: BracketInput): number {
  const income = Math.max(0, i.income || 0);
  const sacrifice = income * Math.min(100, Math.max(0, i.sacrificePct ?? 0)) / 100;
  const gross = (Math.max(0, i.personalPensionNet ?? 0) + Math.max(0, i.giftAidNet ?? 0)) / 0.8;
  return Math.max(0, income - sacrifice - gross);
}

export function bandFor(adjusted: number, region: TaxRegion = "ruk"): BandId {
  let band: BandId = "none";
  for (const e of EDGES[region]) if (adjusted > e.at) band = e.id;
  return band;
}

export function taxBracket(i: BracketInput): BracketResult {
  const region = i.region ?? "ruk";
  const adjusted = adjustedIncome(i);
  const band = bandFor(adjusted, region);
  const snap = computeTakeHome({ gross: adjusted, bonus: 0, pensionPct: 0, plan: "none", region });
  const edges = EDGES[region];
  const nextEdge = edges.find((e) => e.at >= adjusted);
  const prevEdges = edges.filter((e) => e.at < adjusted);
  const prevEdge = prevEdges[prevEdges.length - 1];
  return {
    adjusted,
    band,
    taxRate: BAND_INFO[band].rate,
    marginal: marginalRate({ gross: adjusted, bonus: 0, pensionPct: 0, plan: "none", region }),
    incomeTax: snap.incomeTaxTotal,
    effective: i.income > 0 ? snap.incomeTaxTotal / i.income : 0,
    next: nextEdge ? { band: nextEdge.id, at: nextEdge.at, away: nextEdge.at - adjusted } : null,
    previous: prevEdge ? { band: prevEdge.id, at: prevEdge.at, over: adjusted - prevEdge.at } : null,
  };
}
