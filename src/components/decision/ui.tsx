"use client";

import type { ReactNode, CSSProperties } from "react";

/* ══════════════════════════════════════════════════════════════════
   Decision-engine UI kit — the premium fintech design system shared by
   every calculator (Inter, blue primary). Domain engines compose these
   primitives instead of re-declaring tokens and inputs.
   ══════════════════════════════════════════════════════════════════ */

export const FONT = "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif";
export const BLUE = "#0a66ff";
export const BLUE_HOVER = "#0057e7";
export const BLUE_SOFT = "#eff6ff";
export const BLUE_EDGE = "#dbeafe";
export const GREEN = "#16a34a";
export const GREEN_SOFT = "#f0fdf4";
export const VIOLET = "#8b5cf6";
export const AMBER = "#f59e0b";
export const CORAL = "#ef4444";

export const T = {
  ink: "#0f172a",
  body: "#475569",
  mute: "#64748b",
  subtle: "#94a3b8",
  line: "#e2e8f0",
  tint: "#f8fafc",
};
export const CANVAS = "#f8fafc";
export const R_LG = 18;
export const R_MD = 14;

/* ── surfaces ───────────────────────────────────────────────────── */
export function Card({ children, className = "", radius = R_MD, hover = true, style }: { children: ReactNode; className?: string; radius?: number; hover?: boolean; style?: CSSProperties }) {
  return (
    <div className={`${hover ? "gm-card " : ""}${className}`} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: radius, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 12px 28px -24px rgba(15,23,42,0.14)", ...style }}>
      {children}
    </div>
  );
}

export function Head({ icon, title, right }: { icon: ReactNode; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3" style={{ marginBottom: 16 }}>
      <div className="flex items-center gap-2.5" style={{ minWidth: 0 }}>
        <span style={{ width: 30, height: 30, flex: "none", display: "grid", placeItems: "center", borderRadius: 9, background: BLUE_SOFT, color: BLUE }}>{icon}</span>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em", fontFamily: FONT }}>{title}</h3>
      </div>
      {right && <div style={{ flex: "none" }}>{right}</div>}
    </div>
  );
}

export function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.subtle, marginBottom: 12 }}>{label}</div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: T.line, margin: "16px 0" }} />;
}

/* ── field system ───────────────────────────────────────────────── */
export function Field({ label, right, hint, info, children }: { label: string; right?: string; hint?: string; info?: boolean; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 7 }}>
        <label className="flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 600, color: T.body }}>
          {label}
          {info && <span style={{ width: 14, height: 14, display: "inline-grid", placeItems: "center", borderRadius: "50%", border: `1px solid ${T.subtle}`, color: T.subtle, fontSize: 9.5, fontWeight: 700 }}>i</span>}
        </label>
        {right && <span style={{ fontSize: 12.5, fontWeight: 700, color: T.mute, fontVariantNumeric: "tabular-nums" }}>{right}</span>}
      </div>
      {children}
      {hint && <div style={{ fontSize: 11.5, color: T.subtle, marginTop: 7, lineHeight: 1.45 }}>{hint}</div>}
    </div>
  );
}

export function MoneyInput({ value, onChange, icon, big }: { value: number; onChange: (v: number) => void; icon?: ReactNode; big?: boolean }) {
  const display = value === 0 ? "" : value.toLocaleString("en-GB");
  return (
    <div className="relative">
      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.mute, fontSize: big ? 17 : 16, fontWeight: 600, zIndex: 1 }}>£</span>
      <input type="text" inputMode="numeric" value={display} placeholder="0"
        onChange={(e) => { const digits = e.target.value.replace(/[^\d]/g, ""); onChange(digits === "" ? 0 : Number(digits)); }}
        style={{ width: "100%", background: "#fff", border: `1.5px solid ${T.line}`, borderRadius: 11, padding: big ? "12px 40px 12px 27px" : "11px 40px 11px 26px", fontSize: big ? 18 : 16, fontWeight: 700, color: T.ink, outline: "none", fontVariantNumeric: "tabular-nums" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(10,102,255,0.12)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.boxShadow = "none"; }} />
      {icon && <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: T.subtle }}>{icon}</span>}
    </div>
  );
}

export function Range({ value, min, max, step, onChange, minLabel, maxLabel }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; minLabel: string; maxLabel: string }) {
  const p = Math.min(1, Math.max(0, (value - min) / (max - min)));
  return (
    <div style={{ marginTop: 12 }}>
      <input type="range" min={min} max={max} step={step} value={Math.min(Math.max(value, min), max)} onChange={(e) => onChange(Number(e.target.value))} className="rk-range"
        style={{ width: "100%", ["--rk-accent" as string]: BLUE, background: `linear-gradient(90deg, ${BLUE} ${p * 100}%, ${T.line} ${p * 100}%)` }} />
      <div className="flex items-center justify-between" style={{ marginTop: 6 }}>
        <span style={{ fontSize: 11.5, color: T.subtle }}>{minLabel}</span>
        <span style={{ fontSize: 11.5, color: T.subtle }}>{maxLabel}</span>
      </div>
    </div>
  );
}
