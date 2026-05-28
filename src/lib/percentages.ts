/**
 * Plain-English percentage helpers — what% of x, x is what% of y, % change.
 */

export function percentOf(percent: number, of: number): number {
  return (percent / 100) * of;
}

export function whatPercent(part: number, whole: number): number {
  if (whole === 0) return 0;
  return (part / whole) * 100;
}

export function percentChange(from: number, to: number): number {
  if (from === 0) return 0;
  return ((to - from) / Math.abs(from)) * 100;
}

export function addPercent(value: number, percent: number): number {
  return value * (1 + percent / 100);
}

export function subtractPercent(value: number, percent: number): number {
  return value * (1 - percent / 100);
}
