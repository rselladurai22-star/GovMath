/** Number formatting shared by every flagship calculator. */

const fmt = new Map<string, Intl.NumberFormat>();
function nf(key: string, opts: Intl.NumberFormatOptions) {
  let f = fmt.get(key);
  if (!f) {
    f = new Intl.NumberFormat("en-GB", opts);
    fmt.set(key, f);
  }
  return f;
}

/** £1,234 (or £1,234.56 with `pence`). */
export function gbp(n: number, pence = false): string {
  const v = Number.isFinite(n) ? n : 0;
  return pence
    ? nf("gbp2", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
    : nf("gbp0", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(Math.round(v));
}

/** £1.2k / £480k / £1.3m — for chart axes where space is tight. */
export function gbpShort(n: number): string {
  const a = Math.abs(n);
  if (a >= 1_000_000) return `£${(n / 1_000_000).toFixed(a >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}m`;
  if (a >= 1_000) return `£${Math.round(n / 1_000)}k`;
  return `£${Math.round(n)}`;
}

/** $1,234 (or $1,234.56 with `cents`), for the US calculators. */
export function usd(n: number, cents = false): string {
  const v = Number.isFinite(n) ? n : 0;
  return cents
    ? nf("usd2", { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
    : nf("usd0", { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(Math.round(v));
}

/** $1.2k / $480k / $1.3m — for chart axes. */
export function usdShort(n: number): string {
  return gbpShort(n).replace("£", "$");
}

/** 12,345 */
export function whole(n: number): string {
  return nf("whole", { maximumFractionDigits: 0 }).format(Math.round(Number.isFinite(n) ? n : 0));
}

/** 0.2 → "20%"; `dp` decimal places. */
export function percent(share: number, dp = 0): string {
  return `${(share * 100).toFixed(dp)}%`;
}

/** 302 months → "25 years 2 months". */
export function duration(months: number): string {
  const m = Math.max(0, Math.round(months));
  const y = Math.floor(m / 12);
  const r = m % 12;
  const ys = y === 1 ? "1 year" : `${y} years`;
  const ms = r === 1 ? "1 month" : `${r} months`;
  if (y === 0) return ms;
  if (r === 0) return ys;
  return `${ys} ${ms}`;
}

const IRREGULAR: Record<string, string> = { children: "child", people: "person" };

/**
 * A unit worded for its count: per(1, "years") is "year", per(2, "years")
 * "years", per(1, "children") "child", per(1, "weeks'") "week's". The count
 * can be a number or the text shown beside it; only exactly 1 is singular.
 */
export function per(n: number | string, unit: string): string {
  if (typeof n === "number" ? n !== 1 : n.trim() !== "1") return unit;
  if (unit.endsWith("'")) return `${per(1, unit.slice(0, -1))}'s`;
  const [first, ...rest] = unit.split(" ");
  const tail = rest.length ? ` ${rest.join(" ")}` : "";
  if (IRREGULAR[first]) return IRREGULAR[first] + tail;
  if (/^[a-z]+ies$/.test(first)) return first.slice(0, -3) + "y" + tail;
  if (/^[a-z]+s$/.test(first)) return first.slice(0, -1) + tail;
  return unit;
}
