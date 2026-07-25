"use client";

import { useMemo, useReducer, useRef, useState } from "react";
import Link from "next/link";
import {
  computeTakeHome,
  STUDENT_PLANS,
  STUDENT_PLAN_ORDER,
  UK_MEDIAN_FULL_TIME,
  nextThreshold,
  takeHomeCurve,
  thresholdMarkers,
  type AllocationKey,
  type EngineInputs,
  type StudentPlan,
  type TakeHomeSnapshot,
} from "@/lib/tax/take-home-engine";
import { money, pct, useAnimatedNumber, Donut } from "@/components/decision/kit";

/* ══════════════════════════════════════════════════════════════════
   Premium fintech palette — Inter, blue primary. Shared .gm-* CSS.
   ══════════════════════════════════════════════════════════════════ */
const FONT = "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif";
const BLUE = "#0a66ff";
const BLUE_HOVER = "#0057e7";
const BLUE_SOFT = "#eff6ff";
const BLUE_EDGE = "#dbeafe";
const GREEN = "#16a34a";
const VIOLET = "#8b5cf6";
const AMBER = "#f59e0b";
const CORAL = "#ef4444";

const T = {
  ink: "#0f172a",
  body: "#475569",
  mute: "#64748b",
  subtle: "#94a3b8",
  line: "#e2e8f0",
  tint: "#f8fafc",
};
const CANVAS = "#f8fafc";
const R_LG = 18;
const R_MD = 14;

const SEG: Record<AllocationKey, string> = {
  takeHome: GREEN,
  pension: BLUE,
  incomeTax: CORAL,
  ni: AMBER,
  studentLoan: VIOLET,
};
const SEG_LABEL: Record<AllocationKey, string> = {
  takeHome: "Take-home",
  pension: "Pension",
  incomeTax: "Income Tax",
  ni: "National Insurance",
  studentLoan: "Student loan",
};

/* ── state ──────────────────────────────────────────────────────── */
type State = { salary: number; pensionPct: number; bonus: number; plan: StudentPlan };
type Action =
  | { type: "salary"; value: number } | { type: "pension"; value: number }
  | { type: "bonus"; value: number } | { type: "plan"; value: StudentPlan } | { type: "reset" };
const INITIAL: State = { salary: 35000, pensionPct: 0, bonus: 0, plan: "none" };
function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "salary": return { ...s, salary: Math.max(0, a.value) };
    case "pension": return { ...s, pensionPct: Math.min(60, Math.max(0, a.value)) };
    case "bonus": return { ...s, bonus: Math.max(0, a.value) };
    case "plan": return { ...s, plan: a.value };
    case "reset": return INITIAL;
  }
}

/* ════════════════════════════════════════════════════════════════ */
export default function TakeHomeEngine({ initialSalary = 35000 }: { initialSalary?: number }) {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL, salary: initialSalary });
  const [showResults, setShowResults] = useState(false);
  const inputs: EngineInputs = useMemo(() => ({ gross: state.salary, bonus: state.bonus, pensionPct: state.pensionPct, plan: state.plan }), [state]);
  const snap = useMemo(() => computeTakeHome(inputs), [inputs]);

  const calculate = () => {
    setShowResults(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => document.getElementById("th-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };
  const clear = () => {
    dispatch({ type: "reset" });
    setShowResults(false);
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <div style={{ fontFamily: FONT, color: T.body, background: CANVAS }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 24, paddingBottom: showResults ? 32 : 96 }}>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] items-start">
          <DetailsCard state={state} dispatch={dispatch} snap={snap} onCalculate={calculate} onReset={clear} calculated={showResults} />

          <div id="th-results" className="grid gap-4 grid-cols-1" style={{ minWidth: 0, scrollMarginTop: 74 }}>
            {showResults ? (
              <>
                <SummaryCard snap={snap} />
                <BreakdownCard snap={snap} />
                <CurveCard inputs={inputs} annualSalary={state.salary} dispatch={dispatch} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <ScenariosCard inputs={inputs} snap={snap} />
                  <MarginalCard snap={snap} inputs={inputs} />
                </div>
                <InsightsCard snap={snap} inputs={inputs} />
              </>
            ) : (
              <EmptyState onCalculate={calculate} />
            )}
            <ToolsRow />
            <FootBar />
          </div>
        </div>
      </div>

      {!showResults && (
        <div className="lg:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: "#fff", borderTop: `1px solid ${T.line}`, boxShadow: "0 -6px 20px -12px rgba(15,23,42,0.25)", padding: "12px 16px calc(12px + env(safe-area-inset-bottom))" }}>
          <button type="button" onClick={calculate} className="gm-cta flex items-center justify-center gap-2"
            style={{ width: "100%", padding: "14px 12px", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15.5, border: 0, cursor: "pointer" }}>
            <IconCoin />
            Calculate Take-Home
          </button>
        </div>
      )}
    </div>
  );
}

/* ── shared shell ───────────────────────────────────────────────── */
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
function IconCoin() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a2.5 2.5 0 00-2.5-1.5c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 01-2.5-1.5M12 6.5v11" /></svg>;
}
const IconChart = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V9m4 8V5m4 12v-4M5 21h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>;

/* ══════════════════════════════════════════════════════════════════
   LEFT — Your details
   ══════════════════════════════════════════════════════════════════ */
function DetailsCard({ state, dispatch, snap, onCalculate, onReset, calculated }: { state: State; dispatch: React.Dispatch<Action>; snap: TakeHomeSnapshot; onCalculate: () => void; onReset: () => void; calculated: boolean }) {
  return (
    <Card hover={false} className="gm-inputs-panel lg:sticky lg:top-[74px]" radius={R_LG} style={{ padding: 0 }}>
      <div className="gm-inputs-head flex items-center justify-between" style={{ padding: "13px 18px 12px", borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-2">
          <span style={{ width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 9, background: BLUE_SOFT, color: BLUE }}><IconCoin /></span>
          <h2 style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em", fontFamily: FONT }}>Your Details</h2>
        </div>
        <button type="button" onClick={onReset} className="flex items-center gap-1.5" style={{ fontSize: 12.5, fontWeight: 600, color: T.mute, background: "none", border: 0, cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.9-2M20 15A8 8 0 015.1 17" /></svg>
          Clear
        </button>
      </div>

      <div className="gm-inputs-body gm-scroll" style={{ padding: "14px 18px 16px" }}>
        <Group label="Income">
          <Field label="Gross salary" hint="Your total pay before tax, NI and pension.">
            <MoneyInput big value={state.salary} onChange={(v) => dispatch({ type: "salary", value: v })} icon={<IconCoin />} />
            <Range value={state.salary} min={0} max={200000} step={1000} onChange={(v) => dispatch({ type: "salary", value: v })} minLabel="£0" maxLabel="£200k+" />
          </Field>
          <Field label="Annual bonus" hint="A one-off payment on top of salary.">
            <MoneyInput value={state.bonus} onChange={(v) => dispatch({ type: "bonus", value: v })} />
          </Field>
        </Group>

        <Divider />

        <Group label="Deductions">
          <Field label="Pension contribution" right={`${state.pensionPct}%`} hint={state.pensionPct > 0 ? `${money(snap.pensionContribution)} a year, taken before tax.` : "Salary sacrifice, paid before tax. Auto-enrol is usually 5%."}>
            <Range value={state.pensionPct} min={0} max={30} step={1} onChange={(v) => dispatch({ type: "pension", value: v })} minLabel="0%" maxLabel="30%" />
          </Field>
          <Field label="Student loan plan" info hint="Only if you're repaying a UK student loan. Most 2012–2023 grads are Plan 2.">
            <div className="grid grid-cols-3 gap-1.5">
              {STUDENT_PLAN_ORDER.map((p) => {
                const on = state.plan === p;
                return (
                  <button key={p} type="button" onClick={() => dispatch({ type: "plan", value: p })}
                    style={{ fontSize: 12.5, fontWeight: 700, padding: "9px 3px", borderRadius: 9, border: `1.5px solid ${on ? BLUE : T.line}`, background: on ? BLUE : "#fff", color: on ? "#fff" : T.body, cursor: "pointer", transition: "all .12s" }}>
                    {STUDENT_PLANS[p].short}
                  </button>
                );
              })}
            </div>
          </Field>
        </Group>
      </div>

      <div className="gm-inputs-foot" style={{ padding: "12px 18px" }}>
        <button type="button" onClick={onCalculate} className="gm-cta flex items-center justify-center gap-2"
          style={{ width: "100%", padding: "12px 12px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <IconCoin />
          {calculated ? "Update Results" : "Calculate Take-Home"}
        </button>
        <div className="flex items-center justify-center gap-1.5" style={{ fontSize: 12, color: T.mute, marginTop: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
          {calculated ? "Results update as you edit" : "England, Wales & NI · 2025/26"}
        </div>
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
      {hint && <div style={{ fontSize: 11.5, color: T.subtle, marginTop: 7, lineHeight: 1.45 }}>{hint}</div>}
    </div>
  );
}
function MoneyInput({ value, onChange, icon, big }: { value: number; onChange: (v: number) => void; icon?: React.ReactNode; big?: boolean }) {
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

/* ── empty state ────────────────────────────────────────────────── */
function EmptyState({ onCalculate }: { onCalculate: () => void }) {
  const points = [
    { icon: "💷", label: "Monthly take-home" },
    { icon: "📊", label: "Tax & NI breakdown" },
    { icon: "📈", label: "Income curve" },
    { icon: "💡", label: "Smart insights" },
  ];
  return (
    <Card hover={false} radius={R_LG} style={{ padding: "28px 24px" }}>
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 440, margin: "0 auto" }}>
        <span style={{ width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: 15, background: BLUE_SOFT, color: BLUE, marginBottom: 14 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a2.5 2.5 0 00-2.5-1.5c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 01-2.5-1.5M12 6.5v11" /></svg>
        </span>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: "-0.02em", fontFamily: FONT }}>See your take-home pay</h3>
        <p style={{ fontSize: 14, color: T.mute, marginTop: 7, lineHeight: 1.5, maxWidth: 380 }}>
          Enter your salary and details on the left, then press <strong style={{ color: T.body }}>Calculate</strong> to see exactly what lands in your bank.
        </p>
        <div className="grid grid-cols-2 gap-2" style={{ width: "100%", marginTop: 18 }}>
          {points.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5" style={{ border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px", background: T.tint, textAlign: "left" }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.body }}>{p.label}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={onCalculate} className="gm-cta flex items-center justify-center gap-2"
          style={{ marginTop: 18, padding: "12px 28px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <IconCoin />
          Calculate Take-Home
        </button>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Summary — headline + stat strip
   ══════════════════════════════════════════════════════════════════ */
const PERIOD = [
  { key: "year", label: "Year", div: 1, word: "year" },
  { key: "month", label: "Month", div: 12, word: "month" },
  { key: "week", label: "Week", div: 52, word: "week" },
];
function SummaryCard({ snap }: { snap: TakeHomeSnapshot }) {
  const [basis, setBasis] = useState("month");
  const p = PERIOD.find((x) => x.key === basis)!;
  const animated = useAnimatedNumber(snap.takeHome / p.div);
  const taxNi = snap.incomeTax.total + snap.ni.total;
  const stats = [
    { label: "Gross pay", value: money(snap.totalGross / p.div), sub: `per ${p.word}` },
    { label: "Income Tax + NI", value: money(taxNi / p.div), sub: `${pct(snap.effectiveRate, 1)} effective`, color: CORAL },
    { label: "Keep-rate", value: `${Math.round(snap.keepRate * 100)}p`, sub: "of every £1", color: GREEN },
    { label: snap.studentLoan > 0 ? "Student loan" : "Pension", value: money((snap.studentLoan > 0 ? snap.studentLoan : snap.pensionContribution) / p.div), sub: `per ${p.word}`, color: snap.studentLoan > 0 ? VIOLET : BLUE },
  ];
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<IconCoin />} title="Your Take-Home Pay"
        right={<div style={{ display: "inline-flex", background: T.tint, borderRadius: 9, padding: 3, gap: 2 }}>
          {PERIOD.map((x) => (
            <button key={x.key} type="button" onClick={() => setBasis(x.key)}
              style={{ fontSize: 12.5, fontWeight: 600, padding: "6px 12px", borderRadius: 7, border: 0, cursor: "pointer", background: basis === x.key ? "#fff" : "transparent", color: basis === x.key ? BLUE : T.mute, boxShadow: basis === x.key ? "0 1px 2px rgba(15,23,42,0.12)" : "none" }}>{x.label}</button>
          ))}
        </div>} />

      <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
        <span style={{ fontSize: 46, fontWeight: 800, color: GREEN, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{money(animated)}</span>
        <span style={{ fontSize: 15, fontWeight: 500, color: T.mute }}>/ {p.word} · from {money(snap.totalGross / p.div)} gross</span>
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
    </Card>
  );
}

/* ── breakdown (donut + legend + bars) ──────────────────────────── */
function BreakdownCard({ snap }: { snap: TakeHomeSnapshot }) {
  const g = snap.totalGross || 1;
  const donutSegs = snap.allocation.map((s) => ({ label: SEG_LABEL[s.key], value: s.amount, color: SEG[s.key] }));
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={IconChart} title="Where Your Money Goes" right={<span style={{ fontSize: 12.5, color: T.mute }}>{money(snap.totalGross)} gross</span>} />
      <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] items-center justify-items-center sm:justify-items-stretch">
        <Donut segments={donutSegs} centerTop="You keep" centerValue={`${Math.round(snap.keepRate * 100)}p`} size={184} sw={22} />
        <div style={{ width: "100%", minWidth: 0 }} className="space-y-3">
          {snap.allocation.map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between" style={{ fontSize: 14, marginBottom: 5 }}>
                <span className="flex items-center gap-2"><span style={{ width: 10, height: 10, borderRadius: 3, background: SEG[s.key] }} /><span style={{ color: T.ink, fontWeight: 600 }}>{SEG_LABEL[s.key]}</span></span>
                <span className="flex items-baseline gap-2.5">
                  <span style={{ fontWeight: 700, color: s.yours ? T.ink : SEG[s.key], fontVariantNumeric: "tabular-nums" }}>{s.yours ? "" : "−"}{money(s.amount)}</span>
                  <span style={{ fontSize: 12.5, color: T.subtle, width: 40, textAlign: "right" }}>{pct(s.share, 0)}</span>
                </span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: T.tint, overflow: "hidden" }}>
                <div style={{ width: `${(s.amount / g) * 100}%`, height: "100%", background: SEG[s.key], borderRadius: 999, transition: "width .4s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Income curve — drag to explore any salary
   ══════════════════════════════════════════════════════════════════ */
function CurveCard({ inputs, annualSalary, dispatch }: { inputs: EngineInputs; annualSalary: number; dispatch: React.Dispatch<Action> }) {
  const [mode, setMode] = useState<"takeHome" | "keep">("takeHome");
  const W = 820, H = 240, padL = 52, padR = 16, padT = 16, padB = 28, MAX = 160000;
  const curve = useMemo(() => takeHomeCurve(inputs, 0, MAX, 130), [inputs]);
  const markers = useMemo(() => thresholdMarkers(), []);
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState(false);
  const maxTH = curve[curve.length - 1].takeHome || 1;
  const x = (grossVal: number) => padL + (grossVal / MAX) * (W - padL - padR);
  const yTH = (v: number) => padT + (1 - v / maxTH) * (H - padT - padB);
  const yK = (v: number) => padT + (1 - v) * (H - padT - padB);
  const path = useMemo(() => curve.map((pt, i) => `${i === 0 ? "M" : "L"}${x(pt.gross).toFixed(1)},${(mode === "takeHome" ? yTH(pt.takeHome) : yK(pt.keepRate)).toFixed(1)}`).join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [curve, mode]);
  const area = `${path} L${x(MAX).toFixed(1)},${(H - padB).toFixed(1)} L${x(0).toFixed(1)},${(H - padB).toFixed(1)} Z`;
  const here = useMemo(() => computeTakeHome(inputs), [inputs]);
  const mx = x(Math.min(annualSalary, MAX));
  const my = mode === "takeHome" ? yTH(here.takeHome) : yK(here.keepRate);
  const yTicks = mode === "takeHome" ? [0, 0.5, 1].map((f) => f * maxTH) : [0, 0.5, 1];
  const setFromX = (clientX: number) => { const rc = svgRef.current?.getBoundingClientRect(); if (!rc) return; const grossVal = Math.round((Math.min(1, Math.max(0, (clientX - rc.left) / rc.width)) * MAX) / 500) * 500; dispatch({ type: "salary", value: grossVal }); };
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 5-6" /></svg>}
        title="Explore Any Salary"
        right={<div style={{ display: "inline-flex", background: T.tint, borderRadius: 9, padding: 3, gap: 2 }}>
          {([{ v: "takeHome", l: "Take-home" }, { v: "keep", l: "Keep-rate" }] as const).map((o) => (
            <button key={o.v} type="button" onClick={() => setMode(o.v)}
              style={{ fontSize: 12.5, fontWeight: 600, padding: "6px 12px", borderRadius: 7, border: 0, cursor: "pointer", background: mode === o.v ? "#fff" : "transparent", color: mode === o.v ? BLUE : T.mute, boxShadow: mode === o.v ? "0 1px 2px rgba(15,23,42,0.12)" : "none" }}>{o.l}</button>
          ))}
        </div>} />
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible", cursor: drag ? "grabbing" : "crosshair", touchAction: "none" }}
          onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setDrag(true); setFromX(e.clientX); }} onPointerMove={(e) => drag && setFromX(e.clientX)} onPointerUp={() => setDrag(false)} onPointerLeave={() => setDrag(false)}
          role="slider" aria-label="Salary explorer" aria-valuemin={0} aria-valuemax={MAX} aria-valuenow={Math.round(annualSalary)} tabIndex={0}
          onKeyDown={(e) => { if (e.key === "ArrowRight") dispatch({ type: "salary", value: Math.min(MAX, annualSalary + 1000) }); if (e.key === "ArrowLeft") dispatch({ type: "salary", value: Math.max(0, annualSalary - 1000) }); }}>
          <defs><linearGradient id="thFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={BLUE} stopOpacity="0.18" /><stop offset="100%" stopColor={BLUE} stopOpacity="0" /></linearGradient></defs>
          {yTicks.map((v, i) => (
            <g key={i}>
              <line x1={padL} y1={mode === "takeHome" ? yTH(v) : yK(v)} x2={W - padR} y2={mode === "takeHome" ? yTH(v) : yK(v)} stroke={T.line} strokeWidth="1" />
              <text x={padL - 8} y={(mode === "takeHome" ? yTH(v) : yK(v)) + 3.5} textAnchor="end" style={{ fontSize: 10.5, fontWeight: 600 }} fill={T.subtle}>{mode === "takeHome" ? `£${Math.round(v / 1000)}k` : `${Math.round(v * 100)}p`}</text>
            </g>
          ))}
          <path d={area} fill="url(#thFill)" />
          <path d={path} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {markers.map((m) => (<g key={m.id}><line x1={x(m.gross)} y1={padT} x2={x(m.gross)} y2={H - padB} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" /><text x={x(m.gross) + 4} y={padT + 11} style={{ fontSize: 10, fontWeight: 600 }} fill={T.subtle}>{m.label}</text></g>))}
          <line x1={mx} y1={padT} x2={mx} y2={H - padB} stroke={T.ink} strokeWidth="1.5" />
          <circle cx={mx} cy={my} r="6.5" fill="#fff" stroke={T.ink} strokeWidth="2.5" /><circle cx={mx} cy={my} r="3" fill={BLUE} />
        </svg>
        <div style={{ position: "absolute", top: 2, left: `clamp(4px, ${(mx / W) * 100}%, calc(100% - 150px))`, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 10, padding: "7px 11px", pointerEvents: "none", boxShadow: "0 8px 24px -8px rgba(15,23,42,0.25)" }}>
          <div style={{ fontSize: 11, color: T.mute, fontWeight: 600 }}>{money(annualSalary)} gross</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: BLUE, fontVariantNumeric: "tabular-nums" }}>{mode === "takeHome" ? money(here.takeHome) : `${Math.round(here.keepRate * 100)}p / £1`}</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: T.subtle, marginTop: 10 }}>Drag the marker to explore any salary. Dashed lines mark the key tax thresholds.</p>
    </Card>
  );
}

/* ── scenarios ──────────────────────────────────────────────────── */
type Scenario = { id: string; label: string; inputs: EngineInputs };
function buildScenarios(inputs: EngineInputs, snap: TakeHomeSnapshot): Scenario[] {
  const out: Scenario[] = [{ id: "raise", label: "+£5,000 pay rise", inputs: { ...inputs, gross: inputs.gross + 5000 } }];
  if (inputs.pensionPct < 15) out.push({ id: "pension", label: "Pension +5%", inputs: { ...inputs, pensionPct: inputs.pensionPct + 5 } });
  const adj = snap.adjustedGross;
  if (adj > 100000 && adj <= 125140) { const need = ((adj - 100000) / snap.totalGross) * 100 + inputs.pensionPct; out.push({ id: "trap", label: "Duck under £100k", inputs: { ...inputs, pensionPct: Math.min(60, Math.ceil(need)) } }); }
  else if (inputs.gross < 50270) out.push({ id: "toHigher", label: "Earn £50,270", inputs: { ...inputs, gross: 50270 } });
  return out.slice(0, 3);
}
function ScenariosCard({ inputs, snap }: { inputs: EngineInputs; snap: TakeHomeSnapshot }) {
  const rows = useMemo(() => buildScenarios(inputs, snap), [inputs, snap]).map((s) => ({ ...s, snap: computeTakeHome(s.inputs) }));
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3m8-3v3M3 9h18M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" /></svg>} title="What If Scenarios" />
      <div className="space-y-2.5">
        {rows.map((s) => {
          const d = s.snap.takeHome - snap.takeHome; const up = d >= 0;
          return (
            <div key={s.id} className="flex items-center justify-between gap-3" style={{ padding: "10px 12px", borderRadius: 10, background: T.tint }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>{s.label}</div>
                <div style={{ fontSize: 12.5, color: T.mute, fontVariantNumeric: "tabular-nums" }}>{money(s.snap.takeHome)} take-home</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: up ? GREEN : CORAL, fontVariantNumeric: "tabular-nums", flex: "none", whiteSpace: "nowrap" }}>{up ? "+" : "−"}{money(Math.abs(d))}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── marginal ───────────────────────────────────────────────────── */
function MarginalCard({ snap, inputs }: { snap: TakeHomeSnapshot; inputs: EngineInputs }) {
  const trap = snap.marginalRate >= 0.58;
  const keep = Math.round(snap.marginalKeep * 1000);
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>} title="Your Next £1,000" />
      <div className="flex items-center gap-4">
        <div style={{ position: "relative", width: 118, height: 74, flex: "none" }}>
          <svg width="118" height="74" viewBox="0 0 118 74">
            <path d="M 12,66 A 47,47 0 0 1 106,66" fill="none" stroke={T.tint} strokeWidth="11" strokeLinecap="round" />
            <path d="M 12,66 A 47,47 0 0 1 106,66" fill="none" stroke={trap ? CORAL : GREEN} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${Math.min(1, Math.max(0, snap.marginalKeep)) * Math.PI * 47} ${Math.PI * 47}`} />
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 2, textAlign: "center" }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: T.ink, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>£{keep}</div>
            <div style={{ fontSize: 11.5, color: T.mute }}>you keep</div>
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, color: T.body, lineHeight: 1.55 }}>
            {trap ? <>You&rsquo;re in the <strong style={{ color: CORAL }}>60% zone</strong>. A pay rise here is largely lost to tax.</> : <>Taxed at your <strong style={{ color: T.ink }}>{pct(snap.marginalRate, 0)}</strong> marginal rate.{inputs.pensionPct === 0 && " Pension sacrifice keeps it all."}</>}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── insights ───────────────────────────────────────────────────── */
type InsightTone = "opportunity" | "risk" | "win" | "info";
const TONE: Record<InsightTone, { bar: string; chip: string; label: string }> = {
  opportunity: { bar: GREEN, chip: "#0a6f43", label: "Opportunity" },
  risk: { bar: CORAL, chip: "#b8431f", label: "Watch out" },
  win: { bar: GREEN, chip: "#0a6f43", label: "Good news" },
  info: { bar: BLUE, chip: "#1e40af", label: "Worth knowing" },
};
function buildInsights(snap: TakeHomeSnapshot, inputs: EngineInputs) {
  const list: { tone: InsightTone; title: string; body: string; figure?: string }[] = [];
  const adj = snap.adjustedGross;
  if (adj > 100000 && adj <= 125140) list.push({ tone: "risk", title: "The 60% tax trap", figure: pct(snap.marginalRate, 0), body: `Between £100k and £125,140 your allowance vanishes — each extra £1 is taxed at ${pct(snap.marginalRate, 0)}. Pension sacrifice undoes it.` });
  if (inputs.pensionPct === 0) { const t = computeTakeHome({ ...inputs, pensionPct: 5 }); const cost = snap.takeHome - t.takeHome; list.push({ tone: "opportunity", title: "Pension is near-free money", figure: money(t.pensionContribution - cost), body: `5% adds ${money(t.pensionContribution)} to your pot for just ${money(cost)} less take-home — the gap is tax you'd have paid.` }); }
  const nt = nextThreshold(adj);
  if (nt && nt.away < 8000 && nt.away > 0) list.push({ tone: "info", title: `${money(nt.away)} from ${nt.label}`, body: "Income over this point is taxed at the higher rate." });
  const med = computeTakeHome({ gross: UK_MEDIAN_FULL_TIME, bonus: 0, pensionPct: 0, plan: "none" });
  const diff = snap.takeHome - med.takeHome;
  list.push({ tone: diff >= 0 ? "win" : "info", title: diff >= 0 ? "Above UK average" : "Below UK average", figure: `${diff >= 0 ? "+" : "−"}${money(Math.abs(diff))}`, body: `The average full-time salary (${money(UK_MEDIAN_FULL_TIME)}) nets about ${money(med.takeHome)} a year.` });
  if (snap.studentLoan > 0) list.push({ tone: "info", title: "Student loan", figure: money(snap.studentLoan), body: `${money(snap.studentLoan / 12)}/month, only on income over ${money(STUDENT_PLANS[inputs.plan].threshold)}.` });
  return list.slice(0, 4);
}
function InsightsCard({ snap, inputs }: { snap: TakeHomeSnapshot; inputs: EngineInputs }) {
  const items = useMemo(() => buildInsights(snap, inputs), [snap, inputs]);
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<span style={{ fontSize: 15, lineHeight: 1 }}>💡</span>} title="What This Means For You" />
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
        {items.map((ins, i) => {
          const t = TONE[ins.tone];
          return (
            <div key={i} style={{ borderLeft: `3px solid ${t.bar}`, background: T.tint, borderRadius: "0 10px 10px 0", padding: "13px 15px" }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: t.chip }}>{t.label}</span>
                {ins.figure && <span style={{ fontSize: 17, fontWeight: 800, color: t.chip, fontVariantNumeric: "tabular-nums" }}>{ins.figure}</span>}
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, marginTop: 5 }}>{ins.title}</div>
              <p style={{ fontSize: 13, color: T.body, marginTop: 4, lineHeight: 1.5 }}>{ins.body}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── tools + footer ─────────────────────────────────────────────── */
const TOOLS = [
  { href: "/tax-and-salary/tax-bracket-checker", label: "Tax Bracket Checker" },
  { href: "/investing/pension-tax-relief", label: "Pension Tax Relief" },
  { href: "/tax-and-salary/bonus-tax", label: "Bonus Tax" },
  { href: "/tax-and-salary/national-insurance", label: "National Insurance" },
  { href: "/tax-and-salary/scottish-tax", label: "Scottish Tax" },
  { href: "/calculators", label: "All Calculators" },
];
function ToolsRow() {
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: "0 0 14px", fontFamily: FONT }}>Explore More Salary Tools</h3>
      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="flex flex-col items-center gap-2 text-center"
            style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "16px 10px", transition: "all .14s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = BLUE_EDGE; e.currentTarget.style.background = BLUE_SOFT; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.background = "#fff"; }}>
            <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 10, background: BLUE_SOFT, color: BLUE }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a2.5 2.5 0 00-2.5-1.5c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 01-2.5-1.5M12 6.5v11" /></svg>
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
        Source: HMRC · 2025/26 rates
      </span>
      <span>England, Wales & NI · tax code 1257L</span>
      <span className="flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" /></svg>
        We respect your privacy. No data is stored.
      </span>
    </div>
  );
}
