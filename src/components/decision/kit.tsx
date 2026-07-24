"use client";

/**
 * Decision Engine kit — the shared visual language for every calculator
 * dashboard. Compact, white, modern-sans. Domain engines compose these
 * primitives; they never restyle from scratch.
 */

import { useEffect, useRef, useState } from "react";

/* ── theme ──────────────────────────────────────────────────────── */
export const C = {
  ink: "#0c1611",
  body: "#33433c",
  mute: "#525c56",
  subtle: "#7c847f",
  line: "#e6e8ea",
  tint: "#f4f5f6",
  accent: "#0f9a5e",
  accentDeep: "#0a6f43",
  shadow: "0 1px 3px rgba(12,22,17,0.05), 0 14px 32px -16px rgba(12,22,17,0.14)",
};

/** Vivid semantic palette for charts / breakdowns. */
export const PALETTE = {
  green: "#12a566",
  blue: "#3b82f6",
  coral: "#f2663c",
  amber: "#f6a723",
  violet: "#7c6cf0",
  teal: "#0ea5a5",
  slate: "#64748b",
};

/* ── format ─────────────────────────────────────────────────────── */
const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
export const money = (n: number) => GBP0.format(Math.round(n));
export const pct = (n: number, dp = 1) => `${(n * 100).toFixed(dp)}%`;

/* ── hooks ──────────────────────────────────────────────────────── */
export function usePrefersReducedMotion() {
  const [r, setR] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setR(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return r;
}

export function useAnimatedNumber(target: number, duration = 460) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  useEffect(() => {
    if (reduced) return;
    fromRef.current = display;
    startRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    const tick = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(fromRef.current + (target - fromRef.current) * e);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);
  return reduced ? target : display;
}

/* ── surfaces ───────────────────────────────────────────────────── */
export function Card({ children, className = "", pad = 18, style }: { children: React.ReactNode; className?: string; pad?: number; style?: React.CSSProperties }) {
  return <div className={className} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, boxShadow: C.shadow, padding: pad, ...style }}>{children}</div>;
}

export function CardTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: "-0.01em" }}>{children}</h3>
      {right}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ fontSize: 15, fontWeight: 600, color: C.ink, display: "block", marginBottom: 7 }}>{children}</label>;
}

export function Explain({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14.5, color: C.mute, lineHeight: 1.55, margin: "9px 0 0" }}>{children}</p>;
}

/* ── controls ───────────────────────────────────────────────────── */
export function Segmented({ value, onChange, options, className = "" }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; className?: string }) {
  return (
    <div role="radiogroup" className={className} style={{ display: "grid", gridTemplateColumns: `repeat(${options.length},1fr)`, gap: 2, background: C.tint, borderRadius: 9, padding: 2 }}>
      {options.map((o) => {
        const on = value === o.value;
        return <button key={o.value} type="button" role="radio" aria-checked={on} onClick={() => onChange(o.value)} style={{ fontSize: 14.5, fontWeight: 600, padding: "9px 4px", borderRadius: 7, border: 0, cursor: "pointer", background: on ? "#fff" : "transparent", color: on ? C.ink : C.mute, boxShadow: on ? "0 1px 2px rgba(16,24,40,0.12)" : "none", transition: "all .15s" }}>{o.label}</button>;
      })}
    </div>
  );
}

/** Labelled slider with an inline value and optional hint. */
export function Slider({ label, value, min, max, step, onChange, format, hint }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string; hint?: string }) {
  const p = (value - min) / (max - min);
  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
        <Label>{label}</Label>
        <span style={{ fontSize: 17.5, fontWeight: 700, color: C.ink, fontVariantNumeric: "tabular-nums" }}>{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="rk-range" style={{ width: "100%", background: `linear-gradient(90deg, ${C.accent} ${p * 100}%, ${C.line} ${p * 100}%)` }} aria-label={label} />
      {hint && <Explain>{hint}</Explain>}
    </div>
  );
}

/** Bare track slider with end labels — pairs with a typed field above. */
export function TrackSlider({ value, onChange, min = 0, max, step, minLabel, maxLabel }: { value: number; onChange: (v: number) => void; min?: number; max: number; step: number; minLabel: string; maxLabel: string }) {
  const p = Math.min(1, Math.max(0, (value - min) / (max - min)));
  return (
    <div style={{ marginTop: 12 }}>
      <input type="range" min={min} max={max} step={step} value={Math.min(Math.max(value, min), max)} onChange={(e) => onChange(Number(e.target.value))} className="rk-range" style={{ width: "100%", background: `linear-gradient(90deg, ${C.accent} ${p * 100}%, ${C.line} ${p * 100}%)` }} aria-label="Slider" />
      <div className="flex items-center justify-between" style={{ marginTop: 6 }}>
        <span style={{ fontSize: 13, color: C.subtle }}>{minLabel}</span>
        <span style={{ fontSize: 13, color: C.subtle }}>{maxLabel}</span>
      </div>
    </div>
  );
}

/** £-prefixed numeric field. */
export function MoneyField({ value, onChange, big }: { value: number; onChange: (v: number) => void; big?: boolean }) {
  return (
    <div className="relative">
      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.mute, fontSize: big ? 18 : 17, fontWeight: 600 }}>£</span>
      <input type="number" inputMode="numeric" min={0} value={value === 0 ? "" : value} placeholder="0" onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", border: `1.5px solid ${C.line}`, borderRadius: 11, padding: big ? "13px 12px 13px 28px" : "12px 12px 12px 27px", fontSize: big ? 20 : 17, fontWeight: 700, color: C.ink, outline: "none", fontVariantNumeric: "tabular-nums" }} />
    </div>
  );
}

/* ── data displays ──────────────────────────────────────────────── */
export function Stat({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <Card pad={16}>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: C.mute }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: color || C.ink, marginTop: 3, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{value}</div>
      {sub && <div style={{ fontSize: 14, color: C.mute, marginTop: 3 }}>{sub}</div>}
    </Card>
  );
}

export type DonutSegment = { label: string; value: number; color: string };
export function Donut({ segments, centerTop, centerValue, size = 168, sw = 22 }: { segments: DonutSegment[]; centerTop: string; centerValue: string; size?: number; sw?: number }) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const shares = segments.map((s) => s.value / total);
  const r = (size - sw) / 2, cx = size / 2, cy = size / 2, CIRC = 2 * Math.PI * r;
  const offsets = shares.map((_, i) => shares.slice(0, i).reduce((a, x) => a + x, 0));
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.tint} strokeWidth={sw} />
        {segments.map((s, i) => {
          const dash = shares[i] * CIRC;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw} strokeDasharray={`${dash} ${CIRC - dash}`} strokeDashoffset={-offsets[i] * CIRC} transform={`rotate(-90 ${cx} ${cy})`} style={{ transition: "stroke-dasharray .4s, stroke-dashoffset .4s" }} />;
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: C.mute, fontWeight: 600 }}>{centerTop}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{centerValue}</div>
        </div>
      </div>
    </div>
  );
}

/** Colour-coded legend rows (dot · label · value · optional %). */
export function Legend({ rows }: { rows: { label: string; value: string; pct?: string; color: string; strong?: boolean }[] }) {
  return (
    <div className="space-y-2" style={{ width: "100%" }}>
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between" style={{ fontSize: 15 }}>
          <span className="flex items-center gap-2.5" style={{ minWidth: 0 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: row.color, flex: "none" }} />
            <span style={{ color: C.body, whiteSpace: "nowrap", fontWeight: 500 }}>{row.label}</span>
          </span>
          <span className="flex items-baseline gap-2.5" style={{ flex: "none" }}>
            <span style={{ fontWeight: 700, color: C.ink, fontVariantNumeric: "tabular-nums" }}>{row.value}</span>
            {row.pct && <span style={{ color: C.subtle, fontSize: 14, width: 44, textAlign: "right" }}>{row.pct}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Gauge({ value, color, centerValue, centerSub }: { value: number; color: string; centerValue: string; centerSub: string }) {
  const v = useAnimatedNumber(Math.min(1, Math.max(0, value)));
  const W = 132, H = 78, r = 54, cx = W / 2, cy = 68, len = Math.PI * r;
  const arc = `M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`;
  return (
    <div style={{ position: "relative", width: W, height: H, flex: "none" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <path d={arc} fill="none" stroke={C.tint} strokeWidth={12} strokeLinecap="round" />
        <path d={arc} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeDasharray={`${v * len} ${len}`} style={{ transition: "stroke-dasharray .1s linear" }} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 2, textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.ink, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{centerValue}</div>
        <div style={{ fontSize: 12.5, color: C.mute }}>{centerSub}</div>
      </div>
    </div>
  );
}

/** Insight card with a coloured accent bar. */
export type InsightTone = "opportunity" | "risk" | "win" | "info";
const TONE: Record<InsightTone, { bar: string; chip: string; label: string }> = {
  opportunity: { bar: C.accent, chip: C.accentDeep, label: "Opportunity" },
  risk: { bar: PALETTE.coral, chip: "#b8431f", label: "Watch out" },
  win: { bar: C.accent, chip: C.accentDeep, label: "Good news" },
  info: { bar: PALETTE.blue, chip: "#2563c9", label: "Worth knowing" },
};
export function InsightTile({ tone, title, body, figure, label }: { tone: InsightTone; title: string; body: string; figure?: string; label?: string }) {
  const t = TONE[tone];
  return (
    <div style={{ borderLeft: `3px solid ${t.bar}`, background: C.tint, borderRadius: "0 10px 10px 0", padding: "13px 15px" }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: t.chip }}>{label || t.label}</span>
        {figure && <span style={{ fontSize: 19, fontWeight: 800, color: t.chip, fontVariantNumeric: "tabular-nums" }}>{figure}</span>}
      </div>
      <div style={{ fontSize: 16.5, fontWeight: 700, color: C.ink, marginTop: 5 }}>{title}</div>
      <p style={{ fontSize: 14.5, color: C.body, marginTop: 4, lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}
