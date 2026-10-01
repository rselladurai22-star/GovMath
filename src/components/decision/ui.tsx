"use client";

import type { ReactNode, CSSProperties } from "react";

/* ══════════════════════════════════════════════════════════════════
   Decision-engine UI kit — the premium fintech design system shared by
   every calculator (Inter, blue primary). Domain engines compose these
   primitives instead of re-declaring tokens and inputs.
   ══════════════════════════════════════════════════════════════════ */

export const FONT = "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif";
export const BLUE = "#4353ff";
export const BLUE_HOVER = "#0d1330";
export const BLUE_SOFT = "#eef0ff";
export const BLUE_EDGE = "#e6e8f2";
export const GREEN = "#16a34a";
export const GREEN_SOFT = "#f0fdf4";
export const VIOLET = "#8b5cf6";
export const AMBER = "#f59e0b";
export const CORAL = "#ef4444";

export const T = {
  ink: "#0d1330",
  body: "#343b5c",
  mute: "#4a5170",
  subtle: "#98a2b3",
  line: "#e6e8f2",
  tint: "#f7f8ff",
};
export const CANVAS = "#f7f8ff";
export const R_LG = 24;
export const R_MD = 22;

/* ── surfaces ───────────────────────────────────────────────────── */
export function Card({ children, className = "", radius = R_MD, hover = true, style }: { children: ReactNode; className?: string; radius?: number; hover?: boolean; style?: CSSProperties }) {
  return (
    <div className={`${hover ? "gm-card " : ""}${className}`} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: radius, boxShadow: "0 1px 2px rgba(13,19,48,0.04), 0 30px 60px -44px rgba(87,70,245,0.55)", ...style }}>
      {children}
    </div>
  );
}

export function Head({ icon, title, right }: { icon: ReactNode; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3" style={{ marginBottom: 16 }}>
      <div className="flex items-center gap-2.5" style={{ minWidth: 0 }}>
        <span style={{ width: 30, height: 30, flex: "none", display: "grid", placeItems: "center", borderRadius: 10, background: "var(--brand-gradient)", color: "#fff", boxShadow: "0 10px 18px -10px rgba(87,70,245,0.8)" }}>{icon}</span>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em", fontFamily: FONT }}>{title}</h3>
      </div>
      {right && <div style={{ flex: "none" }}>{right}</div>}
    </div>
  );
}

export function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5170", marginBottom: 12 }}>{label}</div>
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
      {hint && <div style={{ fontSize: 12.5, color: T.mute, marginTop: 7, lineHeight: 1.45 }}>{hint}</div>}
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
        style={{ width: "100%", background: "#fff", border: "1.5px solid #d5d9ee", borderRadius: 14, padding: big ? "12px 40px 12px 27px" : "11px 40px 11px 26px", fontSize: big ? 18 : 16, fontWeight: 700, color: T.ink, outline: "none", fontVariantNumeric: "tabular-nums" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(67,83,255,0.12)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#d5d9ee"; e.currentTarget.style.boxShadow = "none"; }} />
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
        <span style={{ fontSize: 12, color: T.mute }}>{minLabel}</span>
        <span style={{ fontSize: 12, color: T.mute }}>{maxLabel}</span>
      </div>
    </div>
  );
}
