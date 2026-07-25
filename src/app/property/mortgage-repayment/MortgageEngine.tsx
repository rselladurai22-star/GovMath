"use client";

import { useMemo, useReducer, useState } from "react";
import Link from "next/link";
import {
  computeMortgage,
  formatMonths,
  monthlyPaymentFor,
  nextLtvBand,
  paymentAtRateShift,
  type MortgageInputs,
  type MortgageSnapshot,
  type MortgageType,
} from "@/lib/property/mortgage-engine";
import { stampDuty } from "@/lib/tax/sdlt-2025";
import { money, pct, useAnimatedNumber, Donut } from "@/components/decision/kit";

/* ══════════════════════════════════════════════════════════════════
   Palette — clean fintech, blue primary. Inter for maximum legibility.
   ══════════════════════════════════════════════════════════════════ */
const FONT = "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif";
const BLUE = "#0a66ff";       // primary
const BLUE_HOVER = "#0057e7"; // primary hover
const BLUE_SOFT = "#eff6ff";  // soft blue surface
const BLUE_EDGE = "#dbeafe";
const GREEN = "#16a34a";
const GREEN_SOFT = "#f0fdf4";
const VIOLET = "#8b5cf6";
const AMBER = "#f59e0b";
const CORAL = "#ef4444";

const T = {
  ink: "#0f172a",     // primary text
  body: "#475569",    // secondary text
  mute: "#64748b",    // muted text
  subtle: "#94a3b8",
  line: "#e2e8f0",    // border
  tint: "#f8fafc",    // page background / soft neutral
  panel: "#f8fafc",
};
const CANVAS = "#f8fafc";
const R_LG = 18; // large cards
const R_MD = 14; // standard cards

const ARRANGEMENT_FEE = 999;
const ltvColor = (ltv: number) => (ltv > 0.9 ? CORAL : ltv > 0.8 ? AMBER : GREEN);

/* ── state ──────────────────────────────────────────────────────── */
type State = MortgageInputs & {
  includeStampDuty: boolean;
  includeFees: boolean;
  includeOverpayment: boolean;
};
type Action =
  | { type: "price"; value: number } | { type: "deposit"; value: number } | { type: "rate"; value: number }
  | { type: "term"; value: number } | { type: "mode"; value: MortgageType } | { type: "overpayment"; value: number }
  | { type: "toggle"; key: "includeStampDuty" | "includeFees" | "includeOverpayment" }
  | { type: "reset" };

const INITIAL: State = {
  price: 350000, deposit: 70000, ratePct: 4.75, termYears: 25, type: "repayment", overpayment: 0,
  includeStampDuty: true, includeFees: true, includeOverpayment: false,
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "price": return { ...s, price: Math.max(0, a.value), deposit: Math.min(s.deposit, Math.max(0, a.value)) };
    case "deposit": return { ...s, deposit: Math.min(s.price, Math.max(0, a.value)) };
    case "rate": return { ...s, ratePct: Math.min(15, Math.max(0, a.value)) };
    case "term": return { ...s, termYears: Math.min(40, Math.max(1, a.value)) };
    case "mode": return { ...s, type: a.value };
    case "overpayment": return { ...s, overpayment: Math.max(0, a.value) };
    case "toggle": {
      const next = { ...s, [a.key]: !s[a.key] };
      if (a.key === "includeOverpayment" && s.includeOverpayment) next.overpayment = 0;
      return next;
    }
    case "reset": return INITIAL;
  }
}

/* ════════════════════════════════════════════════════════════════ */
export default function MortgageEngine(props: Partial<MortgageInputs>) {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL, ...props });
  const [showResults, setShowResults] = useState(false);
  const snap = useMemo(() => computeMortgage(state), [state]);
  const sdlt = useMemo(() => stampDuty(state.price, "standard").total, [state.price]);
  const fees = state.includeFees ? ARRANGEMENT_FEE : 0;

  const calculate = () => {
    setShowResults(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() =>
        document.getElementById("mortgage-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };
  const clear = () => {
    dispatch({ type: "reset" });
    setShowResults(false);
    if (typeof window !== "undefined") {
      requestAnimationFrame(() =>
        document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  return (
    <div style={{ fontFamily: FONT, color: T.body, background: CANVAS }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 24, paddingBottom: showResults ? 32 : 96 }}>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] items-start">
          {/* LEFT — inputs */}
          <DetailsCard state={state} dispatch={dispatch} snap={snap} sdlt={sdlt} onCalculate={calculate} onReset={clear} calculated={showResults} />

          {/* RIGHT — results (empty until Calculate) */}
          <div id="mortgage-results" className="grid gap-4 grid-cols-1" style={{ minWidth: 0, scrollMarginTop: 74 }}>
            {showResults ? (
              <>
                <SummaryCard snap={snap} sdlt={sdlt} fees={fees} state={state} />
                <BreakdownCard snap={snap} />
                <BalanceCard snap={snap} />
                <AmortisationCard snap={snap} />
                <AffordabilityCard snap={snap} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <RateComparisonCard state={state} snap={snap} />
                  <ScenariosCard state={state} snap={snap} />
                </div>
                <InsightsCard state={state} snap={snap} />
              </>
            ) : (
              <EmptyState onCalculate={calculate} />
            )}
            <ToolsRow />
            <FootBar />
          </div>
        </div>
      </div>

      {/* Mobile sticky Calculate bar (design doc §6) — only before results */}
      {!showResults && (
        <div className="lg:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: "#fff", borderTop: `1px solid ${T.line}`, boxShadow: "0 -6px 20px -12px rgba(15,23,42,0.25)", padding: "12px 16px calc(12px + env(safe-area-inset-bottom))" }}>
          <button type="button" onClick={calculate}
            style={{ width: "100%", padding: "14px 12px", borderRadius: 12, background: BLUE, color: "#fff", fontWeight: 700, fontSize: 15.5, border: 0, cursor: "pointer" }}
            className="flex items-center justify-center gap-2">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><path strokeLinecap="round" d="M8 6h8M8 10h8M8 14h4" /></svg>
            Calculate Mortgage
          </button>
        </div>
      )}
    </div>
  );
}

/* ── shared card shell ──────────────────────────────────────────── */
function Card({ children, className = "", radius = R_MD, hover = true, style }: { children: React.ReactNode; className?: string; radius?: number; hover?: boolean; style?: React.CSSProperties }) {
  return (
    <div className={`${hover ? "gm-card " : ""}${className}`} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: radius, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 12px 28px -24px rgba(15,23,42,0.14)", ...style }}>
      {children}
    </div>
  );
}
function Head({ icon, title, right }: { icon: React.ReactNode; title: string; right?: React.ReactNode }) {
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
const IconHome = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" /></svg>;
const IconChart = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V9m4 8V5m4 12v-4M5 21h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>;

/* ══════════════════════════════════════════════════════════════════
   LEFT — Your Mortgage Details
   ══════════════════════════════════════════════════════════════════ */
function DetailsCard({ state, dispatch, snap, sdlt, onCalculate, onReset, calculated }: { state: State; dispatch: React.Dispatch<Action>; snap: MortgageSnapshot; sdlt: number; onCalculate: () => void; onReset: () => void; calculated: boolean }) {
  return (
    <Card hover={false} className="gm-inputs-panel lg:sticky lg:top-[74px]" radius={R_LG} style={{ padding: 0 }}>
      {/* Header */}
      <div className="gm-inputs-head flex items-center justify-between" style={{ padding: "13px 18px 12px", borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-2">
          <span style={{ width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 9, background: BLUE_SOFT, color: BLUE }}>{IconHome}</span>
          <h2 style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em", fontFamily: FONT }}>Your Mortgage Details</h2>
        </div>
        <button type="button" onClick={onReset} className="flex items-center gap-1.5" style={{ fontSize: 12.5, fontWeight: 600, color: T.mute, background: "none", border: 0, cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.9-2M20 15A8 8 0 015.1 17" /></svg>
          Clear
        </button>
      </div>

      {/* Scrollable body — grouped, differentiated sections */}
      <div className="gm-inputs-body gm-scroll" style={{ padding: "14px 18px 16px" }}>
        <Group label="Property">
          <Field label="Property Value">
            <MoneyInput value={state.price} onChange={(v) => dispatch({ type: "price", value: v })} icon={IconHome} big />
            <Range value={state.price} min={50000} max={5000000} step={5000} onChange={(v) => dispatch({ type: "price", value: v })} minLabel="£50,000" maxLabel="£5,000,000" />
          </Field>
          <Field label="Deposit" right={`${pct(1 - snap.ltv, 1)} LTV`}>
            <div className="flex items-stretch gap-2">
              <div style={{ flex: 1, minWidth: 0 }}>
                <MoneyInput value={state.deposit} onChange={(v) => dispatch({ type: "deposit", value: v })} />
              </div>
              <DepositPercent price={state.price} deposit={state.deposit} onChange={(v) => dispatch({ type: "deposit", value: v })} />
            </div>
            <Range value={state.deposit} min={0} max={Math.max(1, state.price)} step={5000} onChange={(v) => dispatch({ type: "deposit", value: v })} minLabel="£0" maxLabel={money(state.price)} />
          </Field>
          <div className="flex items-center justify-between" style={{ background: BLUE_SOFT, border: `1px solid ${BLUE_EDGE}`, borderRadius: 11, padding: "11px 14px" }}>
            <div>
              <div style={{ fontSize: 11.5, color: T.mute, fontWeight: 600 }}>Mortgage Amount</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: BLUE, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", marginTop: 1 }}>{money(snap.loan)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11.5, color: T.mute, fontWeight: 600 }}>LTV</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: ltvColor(snap.ltv), marginTop: 2 }}>{pct(snap.ltv, 0)}</div>
            </div>
          </div>
        </Group>

        <Divider />

        <Group label="The loan">
          <Field label="Mortgage Term">
            <div className="grid grid-cols-5 gap-1.5">
              {[15, 20, 25, 30, 35].map((t) => {
                const on = state.termYears === t;
                return (
                  <button key={t} type="button" onClick={() => dispatch({ type: "term", value: t })}
                    style={{ fontSize: 12.5, fontWeight: 700, padding: "8px 2px", borderRadius: 9, border: `1.5px solid ${on ? BLUE : T.line}`, background: on ? BLUE : "#fff", color: on ? "#fff" : T.body, cursor: "pointer", transition: "all .12s", lineHeight: 1.15 }}>
                    {t}<div style={{ fontSize: 9, fontWeight: 600, opacity: on ? 0.85 : 0.55 }}>years</div>
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Interest Rate (Annual)" hint="Market avg: 4.5% – 5.5%" info>
            <RateStepper value={state.ratePct} onChange={(v) => dispatch({ type: "rate", value: v })} />
          </Field>
          <Field label="Mortgage Type">
            <div className="grid grid-cols-2 gap-2">
              {([{ v: "repayment", l: "Repayment" }, { v: "interest-only", l: "Interest Only" }] as const).map((o) => {
                const on = state.type === o.v;
                return (
                  <button key={o.v} type="button" onClick={() => dispatch({ type: "mode", value: o.v })}
                    style={{ padding: "10px 6px", borderRadius: 10, border: `1.5px solid ${on ? BLUE : T.line}`, background: on ? BLUE : "#fff", color: on ? "#fff" : T.body, fontWeight: 700, fontSize: 13.5, cursor: "pointer", transition: "all .12s" }}>
                    {o.l}
                  </button>
                );
              })}
            </div>
          </Field>
        </Group>

        <Divider />

        <Group label="Options">
          <div className="space-y-2.5">
            <Check label="Include Stamp Duty" checked={state.includeStampDuty} onChange={() => dispatch({ type: "toggle", key: "includeStampDuty" })} note={money(sdlt)} />
            <Check label="Include arrangement fees" checked={state.includeFees} onChange={() => dispatch({ type: "toggle", key: "includeFees" })} note={money(ARRANGEMENT_FEE)} />
            <Check label="Include monthly overpayment" checked={state.includeOverpayment} onChange={() => dispatch({ type: "toggle", key: "includeOverpayment" })} />
          </div>
          {state.includeOverpayment && (
            <Field label="Monthly Overpayment" right={money(state.overpayment)} info>
              <MoneyInput value={state.overpayment} onChange={(v) => dispatch({ type: "overpayment", value: v })} />
              <Range value={state.overpayment} min={0} max={2000} step={25} onChange={(v) => dispatch({ type: "overpayment", value: v })} minLabel="£0" maxLabel="£2,000" />
              {snap.overpayment.active && (
                <p style={{ fontSize: 12, color: T.mute, marginTop: 7, lineHeight: 1.5 }}>
                  Clears the loan <strong style={{ color: GREEN }}>{formatMonths(snap.overpayment.monthsSaved)}</strong> early, saves <strong style={{ color: GREEN }}>{money(snap.overpayment.interestSaved)}</strong>.
                </p>
              )}
            </Field>
          )}
        </Group>
      </div>

      {/* Pinned action footer */}
      <div className="gm-inputs-foot" style={{ padding: "12px 18px" }}>
        <button type="button" onClick={onCalculate}
          className="gm-cta flex items-center justify-center gap-2"
          style={{ width: "100%", padding: "12px 12px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><path strokeLinecap="round" d="M8 6h8M8 10h8M8 14h4" /></svg>
          {calculated ? "Update Results" : "Calculate Mortgage"}
        </button>
        <div className="flex items-center justify-center gap-1.5" style={{ fontSize: 12, color: T.mute, marginTop: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
          {calculated ? "Results update as you edit" : "Free · private · instant"}
        </div>
      </div>
    </Card>
  );
}

/* ── empty state (before Calculate) ─────────────────────────────── */
function EmptyState({ onCalculate }: { onCalculate: () => void }) {
  const points = [
    { icon: "💷", label: "Monthly payment" },
    { icon: "📊", label: "Total cost & interest" },
    { icon: "🏡", label: "Affordability check" },
    { icon: "📉", label: "Balance over time" },
  ];
  return (
    <Card hover={false} radius={R_LG} style={{ padding: "28px 24px" }}>
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 440, margin: "0 auto" }}>
        <span style={{ width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: 15, background: BLUE_SOFT, color: BLUE, marginBottom: 14 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="16" height="20" rx="2.5" /><path strokeLinecap="round" d="M8 6h8M8 10h3M13 10h3M8 14h3M13 14h3M8 18h3" /></svg>
        </span>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: "-0.02em", fontFamily: FONT }}>See your mortgage results</h3>
        <p style={{ fontSize: 14, color: T.mute, marginTop: 7, lineHeight: 1.5, maxWidth: 380 }}>
          Enter your details on the left, then press <strong style={{ color: T.body }}>Calculate</strong> to reveal your full breakdown.
        </p>

        <div className="grid grid-cols-2 gap-2" style={{ width: "100%", marginTop: 18 }}>
          {points.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5" style={{ border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px", background: T.tint, textAlign: "left" }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.body }}>{p.label}</span>
            </div>
          ))}
        </div>

        <button type="button" onClick={onCalculate}
          className="gm-cta flex items-center justify-center gap-2"
          style={{ marginTop: 18, padding: "12px 28px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><path strokeLinecap="round" d="M8 6h8M8 10h8M8 14h4" /></svg>
          Calculate Mortgage
        </button>
      </div>
    </Card>
  );
}

/* ── input primitives ───────────────────────────────────────────── */
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.subtle, marginBottom: 12 }}>{label}</div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ height: 1, background: T.line, margin: "16px 0" }} />;
}
function Field({ label, right, hint, info, children }: { label: string; right?: string; hint?: string; info?: boolean; children: React.ReactNode }) {
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
      {hint && <div style={{ fontSize: 11.5, color: T.subtle, marginTop: 7 }}>{hint}</div>}
    </div>
  );
}
function MoneyInput({ value, onChange, icon, big }: { value: number; onChange: (v: number) => void; icon?: React.ReactNode; big?: boolean }) {
  // type=text + inputMode=numeric so we can show comma separators (design doc §8.1).
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
const DEPOSIT_PCTS = [5, 10, 15, 20, 25, 30, 40];
function DepositPercent({ price, deposit, onChange }: { price: number; deposit: number; onChange: (v: number) => void }) {
  const current = price > 0 ? Math.round((deposit / price) * 100) : 0;
  const inList = DEPOSIT_PCTS.includes(current);
  return (
    <div className="relative" style={{ flex: "none" }}>
      <select
        aria-label="Deposit as a percentage of property value"
        value={inList ? String(current) : "custom"}
        onChange={(e) => { const p = Number(e.target.value); if (!Number.isNaN(p)) onChange(Math.round((price * p) / 100)); }}
        style={{ height: "100%", appearance: "none", WebkitAppearance: "none", background: T.tint, border: `1.5px solid ${T.line}`, borderRadius: 11, padding: "0 30px 0 13px", fontSize: 14, fontWeight: 700, color: T.ink, cursor: "pointer", outline: "none", fontVariantNumeric: "tabular-nums" }}>
        {!inList && <option value="custom">{current}%</option>}
        {DEPOSIT_PCTS.map((p) => <option key={p} value={p}>{p}%</option>)}
      </select>
      <span style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: T.mute, fontSize: 10 }}>▾</span>
    </div>
  );
}
function Range({ value, min, max, step, onChange, minLabel, maxLabel }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; minLabel: string; maxLabel: string }) {
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
function RateStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const step = (d: number) => onChange(Math.round((value + d) * 100) / 100);
  return (
    <div className="relative">
      <input type="number" step={0.05} min={0} max={15} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", background: "#fff", border: `1.5px solid ${T.line}`, borderRadius: 11, padding: "11px 44px 11px 14px", fontSize: 16, fontWeight: 700, color: T.ink, outline: "none", fontVariantNumeric: "tabular-nums" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(10,102,255,0.12)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.boxShadow = "none"; }} />
      <span style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", color: T.mute, fontSize: 15, fontWeight: 700 }}>%</span>
      <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 2 }}>
        <button type="button" onClick={() => step(0.05)} style={stepBtn}>▲</button>
        <button type="button" onClick={() => step(-0.05)} style={stepBtn}>▼</button>
      </div>
    </div>
  );
}
const stepBtn: React.CSSProperties = { width: 24, height: 15, display: "grid", placeItems: "center", background: T.tint, border: `1px solid ${T.line}`, borderRadius: 4, color: T.mute, fontSize: 7, cursor: "pointer", lineHeight: 1 };

function Check({ label, checked, onChange, note }: { label: string; checked: boolean; onChange: () => void; note?: string }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center justify-between w-full" style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}>
      <span className="flex items-center gap-2.5">
        <span style={{ width: 19, height: 19, borderRadius: 6, border: `1.5px solid ${checked ? BLUE : T.subtle}`, background: checked ? BLUE : "#fff", display: "grid", placeItems: "center", flex: "none", transition: "all .12s" }}>
          {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>}
        </span>
        <span style={{ fontSize: 13.5, color: T.body, fontWeight: 500 }}>{label}</span>
      </span>
      {note && <span style={{ fontSize: 12.5, color: T.mute, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{note}</span>}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════
   RIGHT — Summary headline + stat strip
   ══════════════════════════════════════════════════════════════════ */
function SummaryCard({ snap, sdlt, fees, state }: { snap: MortgageSnapshot; sdlt: number; fees: number; state: State }) {
  const [basis, setBasis] = useState<"monthly" | "yearly">("monthly");
  const io = snap.inputs.type === "interest-only";
  const value = basis === "monthly" ? snap.monthlyOutgoing : snap.monthlyOutgoing * 12;
  const animated = useAnimatedNumber(value);
  const upfront = (state.includeStampDuty ? sdlt : 0) + fees;
  const stats = [
    { label: "Total Repayable", value: money(snap.totalRepaid + snap.balloon), sub: "" },
    { label: "Total Interest", value: money(snap.totalInterest), sub: `${pct(snap.interestShare, 1)} of total`, color: VIOLET },
    { label: "Initial LTV", value: pct(snap.ltv, 0), sub: "Loan to Value", color: ltvColor(snap.ltv) },
    { label: state.includeStampDuty ? "Stamp Duty" : "Upfront fees", value: money(state.includeStampDuty ? sdlt : fees), sub: "Estimated" },
  ];
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" /></svg>}
        title="Your Mortgage Summary"
        right={<button type="button" className="flex items-center gap-1.5" style={{ fontSize: 12.5, fontWeight: 600, color: T.mute, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 9, padding: "7px 12px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
          Download PDF
        </button>} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 46, fontWeight: 800, color: GREEN, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{money(animated)}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: T.mute }}>/ {basis === "monthly" ? "month" : "year"}{io ? " · interest-only" : ""}</span>
        </div>
        <div style={{ display: "inline-flex", background: T.tint, borderRadius: 9, padding: 3, gap: 2 }}>
          {(["monthly", "yearly"] as const).map((b) => (
            <button key={b} type="button" onClick={() => setBasis(b)}
              style={{ fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 7, border: 0, cursor: "pointer", textTransform: "capitalize", background: basis === b ? "#fff" : "transparent", color: basis === b ? BLUE : T.mute, boxShadow: basis === b ? "0 1px 2px rgba(15,23,42,0.12)" : "none" }}>{b}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ marginTop: 18 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "13px 14px", background: T.tint }}>
            <div style={{ fontSize: 12, color: T.mute, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color || T.ink, marginTop: 4, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{s.value}</div>
            {s.sub && <div style={{ fontSize: 11, color: T.subtle, marginTop: 2 }}>{s.sub}</div>}
          </div>
        ))}
      </div>
      {upfront > 0 && (
        <div style={{ fontSize: 12, color: T.mute, marginTop: 12 }}>
          Estimated upfront cost (stamp duty{fees ? " + fees" : ""}): <strong style={{ color: T.ink }}>{money(upfront)}</strong>
        </div>
      )}
    </Card>
  );
}

/* ── breakdown (donut + legend + tip) ───────────────────────────── */
function BreakdownCard({ snap }: { snap: MortgageSnapshot }) {
  const capital = snap.loan - snap.balloon;
  const totalRepay = capital + snap.totalInterest;
  const homeShare = totalRepay > 0 ? capital / totalRepay : 0;
  const suggest = useMemo(() => computeMortgage({ ...snap.inputs, overpayment: snap.inputs.overpayment + 200 }), [snap.inputs]);
  const extraInterestSaved = suggest.overpayment.interestSaved - snap.overpayment.interestSaved;
  const extraMonthsSaved = suggest.overpayment.monthsSaved - snap.overpayment.monthsSaved;
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={IconChart} title="Repayment Breakdown" />
      <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] items-center justify-items-center sm:justify-items-stretch">
        <Donut segments={[{ label: "Amount you borrow", value: capital, color: GREEN }, { label: "Interest", value: snap.totalInterest, color: VIOLET }]} centerTop="Goes to your home" centerValue={pct(homeShare, 1)} size={184} sw={22} />
        <div style={{ width: "100%", minWidth: 0 }}>
          <LegendRow color={GREEN} label="Amount You Borrow" value={money(capital)} pct={pct(homeShare, 1)} />
          <LegendRow color={VIOLET} label="Total Interest" value={money(snap.totalInterest)} pct={pct(snap.interestShare, 1)} />
          <div className="flex items-center justify-between" style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
            <span style={{ fontSize: 14.5, color: T.ink, fontWeight: 700 }}>Total Repayable</span>
            <span className="flex items-baseline gap-3">
              <span style={{ fontSize: 15, fontWeight: 800, color: T.ink, fontVariantNumeric: "tabular-nums" }}>{money(totalRepay)}</span>
              <span style={{ fontSize: 13, color: T.subtle, width: 42, textAlign: "right" }}>100%</span>
            </span>
          </div>
        </div>
      </div>
      {snap.inputs.type === "repayment" && extraInterestSaved > 300 && (
        <div className="flex items-start gap-2.5" style={{ marginTop: 18, background: BLUE_SOFT, border: `1px solid ${BLUE_EDGE}`, borderRadius: 12, padding: "13px 15px" }}>
          <span style={{ fontSize: 15 }}>💡</span>
          <span style={{ fontSize: 13.5, color: "#1e40af", lineHeight: 1.55 }}>
            By overpaying just <strong>£200 per month</strong>{snap.overpayment.active ? " more" : ""}, you could save <strong>{money(extraInterestSaved)}</strong> in interest and pay off your mortgage <strong>{formatMonths(extraMonthsSaved)} earlier</strong>.
          </span>
        </div>
      )}
    </Card>
  );
}
function LegendRow({ color, label, value, pct: p }: { color: string; label: string; value: string; pct: string }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "7px 0" }}>
      <span className="flex items-center gap-2.5">
        <span style={{ width: 11, height: 11, borderRadius: 3, background: color, flex: "none" }} />
        <span style={{ fontSize: 14, color: T.body, fontWeight: 500 }}>{label}</span>
      </span>
      <span className="flex items-baseline gap-3">
        <span style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, fontVariantNumeric: "tabular-nums" }}>{value}</span>
        <span style={{ fontSize: 13, color: T.subtle, width: 42, textAlign: "right" }}>{p}</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Balance Over Time — line chart with Balance / Interest / Equity tabs
   ══════════════════════════════════════════════════════════════════ */
type SeriesKey = "balance" | "interest" | "equity";
function BalanceCard({ snap }: { snap: MortgageSnapshot }) {
  const [tab, setTab] = useState<SeriesKey>("balance");
  const [hover, setHover] = useState<number | null>(null);
  const price = snap.inputs.price;

  const series = useMemo(() => {
    const bal: number[] = [snap.loan];
    const cumInt: number[] = [0];
    const eq: number[] = [price - snap.loan];
    let running = 0;
    for (const row of snap.schedule) {
      running += row.interest;
      bal.push(row.balance);
      cumInt.push(running);
      eq.push(price - row.balance);
    }
    return { balance: bal, interest: cumInt, equity: eq };
  }, [snap, price]);

  const data = series[tab];
  const years = data.length - 1;
  const W = 820, H = 240, padL = 52, padR = 16, padT = 16, padB = 28;
  const maxV = Math.max(...data, 1);
  const x = (i: number) => padL + (i / Math.max(1, years)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / maxV) * (H - padT - padB);
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${path} L${x(years).toFixed(1)},${(H - padB).toFixed(1)} L${x(0).toFixed(1)},${(H - padB).toFixed(1)} Z`;
  const color = tab === "balance" ? BLUE : tab === "interest" ? VIOLET : GREEN;
  const label = tab === "balance" ? "Outstanding balance" : tab === "interest" ? "Interest paid" : "Your equity";
  const ticks = [0, Math.round(years / 4), Math.round(years / 2), Math.round((years * 3) / 4), years].filter((v, i, a) => a.indexOf(v) === i);
  const yTicks = [0, 0.5, 1].map((f) => f * maxV);

  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 5-6" /></svg>}
        title="Balance Over Time"
        right={<div style={{ display: "inline-flex", background: T.tint, borderRadius: 9, padding: 3, gap: 2 }}>
          {(["balance", "interest", "equity"] as const).map((k) => (
            <button key={k} type="button" onClick={() => setTab(k)}
              style={{ fontSize: 12.5, fontWeight: 600, padding: "6px 12px", borderRadius: 7, border: 0, cursor: "pointer", textTransform: "capitalize", background: tab === k ? "#fff" : "transparent", color: tab === k ? BLUE : T.mute, boxShadow: tab === k ? "0 1px 2px rgba(15,23,42,0.12)" : "none" }}>{k}</button>
          ))}
        </div>} />

      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }} onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={T.line} strokeWidth="1" />
              <text x={padL - 8} y={y(v) + 3.5} textAnchor="end" style={{ fontSize: 10.5, fontWeight: 600 }} fill={T.subtle}>£{Math.round(v / 1000)}k</text>
            </g>
          ))}
          <path d={area} fill="url(#areaFill)" />
          <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {/* hover targets */}
          {data.map((_, i) => (
            <rect key={i} x={x(i) - (W - padL - padR) / years / 2} y={padT} width={(W - padL - padR) / years} height={H - padT - padB} fill="transparent" onMouseEnter={() => setHover(i)} />
          ))}
          {hover != null && (
            <g>
              <line x1={x(hover)} y1={padT} x2={x(hover)} y2={H - padB} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx={x(hover)} cy={y(data[hover])} r="4.5" fill="#fff" stroke={color} strokeWidth="2.5" />
            </g>
          )}
          {ticks.map((yr) => <text key={yr} x={x(yr)} y={H - 8} textAnchor="middle" style={{ fontSize: 10.5, fontWeight: 600 }} fill={T.subtle}>Year {yr}</text>)}
        </svg>
        {hover != null && (
          <div style={{ position: "absolute", top: 0, left: `clamp(0px, ${(x(hover) / W) * 100}%, calc(100% - 150px))`, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 10, padding: "9px 12px", pointerEvents: "none", boxShadow: "0 8px 24px -8px rgba(15,23,42,0.25)" }}>
            <div style={{ fontSize: 11, color: T.mute, fontWeight: 600 }}>Year {hover}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.ink, fontVariantNumeric: "tabular-nums" }}>{money(data[hover])}</div>
            <div style={{ fontSize: 11, color: T.subtle, marginTop: 1 }}>{label}</div>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Amortisation schedule (first years)
   ══════════════════════════════════════════════════════════════════ */
function AmortisationCard({ snap }: { snap: MortgageSnapshot }) {
  const [full, setFull] = useState(false);
  let opening = snap.loan;
  const rows = snap.schedule.map((r) => {
    const row = { year: r.year, opening, interest: r.interest, principal: r.capital, closing: r.balance };
    opening = r.balance;
    return row;
  });
  const shown = full ? rows : rows.slice(0, 5);
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
        title="Amortisation Schedule"
        right={<button type="button" onClick={() => setFull((f) => !f)} style={{ fontSize: 12.5, fontWeight: 600, color: BLUE, background: "none", border: 0, cursor: "pointer", whiteSpace: "nowrap" }}>{full ? "Show less" : "View Full Schedule"}</button>} />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontVariantNumeric: "tabular-nums" }}>
          <thead>
            <tr>
              {["Year", "Opening Balance", "Interest", "Principal", "Closing Balance"].map((h, i) => (
                <th key={h} style={{ textAlign: i === 0 ? "left" : "right", fontSize: 11.5, fontWeight: 600, color: T.mute, padding: "0 8px 10px", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.year} style={{ borderTop: `1px solid ${T.line}` }}>
                <td style={{ textAlign: "left", fontSize: 13, fontWeight: 700, color: T.ink, padding: "10px 8px" }}>{r.year}</td>
                <td style={{ textAlign: "right", fontSize: 13, color: T.body, padding: "10px 8px" }}>{money(r.opening)}</td>
                <td style={{ textAlign: "right", fontSize: 13, color: VIOLET, padding: "10px 8px" }}>{money(r.interest)}</td>
                <td style={{ textAlign: "right", fontSize: 13, color: GREEN, padding: "10px 8px" }}>{money(r.principal)}</td>
                <td style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: T.ink, padding: "10px 8px" }}>{money(r.closing)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11.5, color: T.subtle, marginTop: 12 }}>Figures are illustrative and may vary based on actual lender terms.</p>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Affordability Check
   ══════════════════════════════════════════════════════════════════ */
function AffordabilityCard({ snap }: { snap: MortgageSnapshot }) {
  const [salary, setSalary] = useState(90000);
  const lti = salary > 0 ? snap.loan / salary : 0;
  const takeHomeMonthly = (salary * 0.72) / 12;
  const costShare = takeHomeMonthly > 0 ? snap.monthlyOutgoing / takeHomeMonthly : 1;
  const deposit = 1 - snap.ltv;
  const affordable = lti <= 4.5 && costShare <= 0.4 && snap.ltv <= 0.9;
  const ltiPct = Math.min(1, lti / 6);
  const checks = [
    { ok: costShare <= 0.35, text: `Monthly cost is ${pct(costShare, 0)} of your estimated take-home pay`, tag: costShare <= 0.35 ? "Below 35%" : "High" },
    { ok: deposit >= 0.1, text: "Deposit meets typical lender requirements", tag: pct(deposit, 0) },
    { ok: snap.ltv <= 0.9, text: `LTV of ${pct(snap.ltv, 0)} is within mainstream lending criteria`, tag: snap.ltv <= 0.8 ? "Good" : snap.ltv <= 0.9 ? "OK" : "High" },
  ];
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4z" /></svg>}
        title="Affordability Check"
        right={<span className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", color: affordable ? GREEN : AMBER, background: affordable ? "#ecfdf3" : "#fffbeb", border: `1px solid ${affordable ? "#bbf7d0" : "#fde68a"}`, borderRadius: 999, padding: "5px 11px" }}>
          {affordable ? "Looks Affordable" : "Check carefully"}
          {affordable && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>}
        </span>} />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        {/* Left — income + LTI gauge */}
        <div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.mute, display: "block", marginBottom: 6 }}>Household income (used for the ratios)</label>
            <MoneyInput value={salary} onChange={setSalary} />
          </div>
          <div style={{ background: T.tint, border: `1px solid ${T.line}`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 13, color: T.mute, fontWeight: 600 }}>Your Loan to Income Ratio</div>
            <div className="flex items-baseline gap-2.5" style={{ marginTop: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: lti <= 4.5 ? GREEN : CORAL, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{lti.toFixed(1)}x</span>
              <span style={{ fontSize: 12.5, color: T.mute }}>{lti <= 4.5 ? "Within recommended 3.5x – 4.5x" : "Above typical lending limits"}</span>
            </div>
            <div style={{ position: "relative", height: 8, borderRadius: 999, marginTop: 12, background: "linear-gradient(90deg, #22c55e 0%, #eab308 55%, #ef4444 100%)" }}>
              <div style={{ position: "absolute", top: -3, left: `calc(${ltiPct * 100}% - 7px)`, width: 14, height: 14, borderRadius: "50%", background: "#fff", border: `2.5px solid ${T.ink}`, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </div>
            <div className="flex items-center justify-between" style={{ marginTop: 6, fontSize: 10.5, color: T.subtle, fontWeight: 600 }}>
              <span>0x</span><span>3.5x</span><span>4.5x</span><span>6x</span>
            </div>
          </div>
        </div>

        {/* Right — checklist */}
        <div className="space-y-3">
          {checks.map((c, i) => (
            <div key={c.text} className="flex items-center justify-between gap-3" style={{ borderBottom: i < checks.length - 1 ? `1px solid ${T.line}` : "none", paddingBottom: i < checks.length - 1 ? 12 : 0 }}>
              <span className="flex items-center gap-2.5" style={{ minWidth: 0 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", flex: "none", display: "grid", placeItems: "center", background: c.ok ? "#ecfdf3" : "#fffbeb", color: c.ok ? GREEN : AMBER }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">{c.ok ? <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />}</svg>
                </span>
                <span style={{ fontSize: 13.5, color: T.body, lineHeight: 1.35 }}>{c.text}</span>
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ok ? GREEN : AMBER, flex: "none" }}>{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Rate comparison
   ══════════════════════════════════════════════════════════════════ */
const LENDERS = [
  { name: "Halifax", delta: -0.13 },
  { name: "Barclays", delta: 0 },
  { name: "Nationwide", delta: 0.09 },
  { name: "HSBC", delta: 0.14 },
];
function RateComparisonCard({ state, snap }: { state: State; snap: MortgageSnapshot }) {
  const base = snap.monthlyPayment;
  const rows = LENDERS.map((l) => {
    const payment = monthlyPaymentFor(snap.loan, Math.max(0, state.ratePct + l.delta), state.termYears, state.type);
    return { ...l, rate: state.ratePct + l.delta, payment, diff: payment - base };
  });
  return (
    <Card style={{ padding: 18 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: 0, fontFamily: FONT }}>Rate Comparison</h3>
        <span style={{ fontSize: 12, fontWeight: 600, color: BLUE }}>View latest rates →</span>
      </div>
      <div className="space-y-1">
        {rows.map((r) => {
          const selected = r.delta === 0;
          return (
            <div key={r.name} className="flex items-center justify-between" style={{ padding: "9px 10px", borderRadius: 10, background: selected ? BLUE_SOFT : "transparent", border: selected ? `1px solid ${BLUE_EDGE}` : "1px solid transparent" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{r.name}</div>
                <div style={{ fontSize: 12, color: T.mute, fontVariantNumeric: "tabular-nums" }}>{r.rate.toFixed(2)}%</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, fontVariantNumeric: "tabular-nums" }}>{money(r.payment)}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: selected ? BLUE : r.diff < 0 ? GREEN : CORAL }}>
                  {selected ? "Selected" : r.diff < 0 ? `Save ${money(-r.diff)}/mo` : `+${money(r.diff)}/mo`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   What-if scenarios
   ══════════════════════════════════════════════════════════════════ */
function ScenariosCard({ state, snap }: { state: State; snap: MortgageSnapshot }) {
  const base = snap.monthlyPayment;
  const scenarios = [
    { label: `Interest Rate at ${(state.ratePct + 0.75).toFixed(1)}%`, inputs: { ...state, ratePct: state.ratePct + 0.75 } },
    { label: "10% Larger Deposit", inputs: { ...state, deposit: Math.min(state.price, state.deposit + state.price * 0.1) } },
    ...(state.termYears > 10 ? [{ label: `${state.termYears - 5} Year Shorter Term`, inputs: { ...state, termYears: state.termYears - 5 } }] : []),
  ].slice(0, 3);
  const rows = scenarios.map((s) => {
    const p = computeMortgage(s.inputs).monthlyPayment;
    return { ...s, payment: p, pctChange: base > 0 ? (p - base) / base : 0 };
  });
  return (
    <Card style={{ padding: 18 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: 0, fontFamily: FONT }}>What If Scenarios</h3>
      </div>
      <div className="space-y-2.5">
        {rows.map((r) => {
          const up = r.pctChange > 0;
          return (
            <div key={r.label} className="flex items-center justify-between gap-3" style={{ padding: "10px 12px", borderRadius: 10, background: T.tint }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, minWidth: 0 }}>{r.label}</span>
              <span className="flex items-center gap-2.5" style={{ flex: "none" }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{money(r.payment)}/mo</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: up ? CORAL : GREEN, background: up ? "#fef2f2" : "#ecfdf3", borderRadius: 6, padding: "3px 7px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                  {up ? "+" : ""}{(r.pctChange * 100).toFixed(1)}%
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: BLUE, marginTop: 12, textAlign: "center" }}>Explore more scenarios →</div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Insights & next steps
   ══════════════════════════════════════════════════════════════════ */
function InsightsCard({ state, snap }: { state: State; snap: MortgageSnapshot }) {
  const nb = nextLtvBand(snap.ltv);
  const betterRate = nb ? monthlyPaymentFor(snap.loan, Math.max(0, state.ratePct - 0.25), state.termYears, state.type) : snap.monthlyPayment;
  const rateSave = snap.monthlyPayment - betterRate;
  const over = computeMortgage({ ...state, overpayment: state.overpayment + 100 });
  const monthsSooner = over.overpayment.monthsSaved;

  const items = [
    nb && rateSave > 0
      ? { icon: "🏦", title: "Save for a larger deposit", body: "Reduce your LTV to get better rates", tag: `Save ${money(rateSave)}/mo` }
      : { icon: "🏦", title: "Strong deposit position", body: "You're already in a competitive LTV band", tag: "Good" },
    { icon: "📈", title: "Consider overpayments", body: `Save on interest with £100/mo more`, tag: `Pay off ${formatMonths(monthsSooner)} sooner` },
    { icon: "🔍", title: "Compare live mortgage deals", body: "Find the best rate for your situation", tag: "View deals" },
  ];
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 15 }}>💡</span>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: T.ink, margin: 0, fontFamily: FONT }}>Insights &amp; Next Steps</h3>
      </div>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "14px 15px", background: T.tint }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: 8 }}>
              <span style={{ width: 30, height: 30, flex: "none", display: "grid", placeItems: "center", borderRadius: 9, background: "#fff", border: `1px solid ${T.line}`, fontSize: 15 }}>{it.icon}</span>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, lineHeight: 1.25 }}>{it.title}</div>
            </div>
            <div style={{ fontSize: 12.5, color: T.mute, lineHeight: 1.45, flex: 1 }}>{it.body}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: BLUE, marginTop: 10 }}>{it.tag} →</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Explore more property tools + footer bar
   ══════════════════════════════════════════════════════════════════ */
const TOOLS = [
  { href: "/property/stamp-duty-england", label: "Stamp Duty Calculator" },
  { href: "/property/mortgage-affordability", label: "Rent Affordability" },
  { href: "/property/first-time-buyer", label: "First Time Buyer Guide" },
  { href: "/property/rent-vs-buy", label: "Buy vs Rent Calculator" },
  { href: "/property/mortgage-overpayment", label: "Remortgage Calculator" },
  { href: "/calculators", label: "All Calculators" },
];
function ToolsRow() {
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: "0 0 14px", fontFamily: FONT }}>Explore More Property Tools</h3>
      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="flex flex-col items-center gap-2 text-center"
            style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "16px 10px", transition: "all .14s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = BLUE_EDGE; e.currentTarget.style.background = BLUE_SOFT; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.background = "#fff"; }}>
            <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 10, background: BLUE_SOFT, color: BLUE }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" /></svg>
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.body, lineHeight: 1.3 }}>{t.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
function FootBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" style={{ fontSize: 11.5, color: T.subtle, padding: "4px 0" }}>
      <span className="flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 8v4l3 2" /></svg>
        Source: Bank of England, FCA, MoneyHelper
      </span>
      <span>Rates indicative · 2025/26</span>
      <span className="flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" /></svg>
        We respect your privacy. No data is stored.
      </span>
    </div>
  );
}
