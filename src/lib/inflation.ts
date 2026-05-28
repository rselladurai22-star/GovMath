/**
 * Real return after inflation.
 *
 * realReturn = (1 + nominal) / (1 + inflation) - 1   (Fisher)
 * futureValueReal = present * (1 + nominal)^n / (1 + inflation)^n
 *
 * Purchasing power: how much your money is "worth" in today's pounds
 * after `years` of inflation.
 */

export type InflationResult = {
  present: number;
  years: number;
  nominalRatePct: number;
  inflationPct: number;
  nominalFuture: number;
  realFuture: number;
  purchasingPowerLossPct: number;
};

export function inflationImpact(
  present: number,
  years: number,
  nominalRatePct: number,
  inflationPct: number
): InflationResult {
  const n = Math.max(0, years);
  const r = nominalRatePct / 100;
  const i = inflationPct / 100;
  const nominalFuture = present * Math.pow(1 + r, n);
  const realFuture = nominalFuture / Math.pow(1 + i, n);
  const purchasingPowerLoss = present > 0 ? 1 - realFuture / nominalFuture : 0;
  return {
    present,
    years: n,
    nominalRatePct,
    inflationPct,
    nominalFuture,
    realFuture,
    purchasingPowerLossPct: purchasingPowerLoss,
  };
}
