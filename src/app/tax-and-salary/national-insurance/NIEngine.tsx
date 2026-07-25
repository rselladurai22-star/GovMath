"use client";

import { useMemo, useReducer, useState } from "react";
import Link from "next/link";
import { nationalInsurance, selfEmployedNI, TAX_YEAR_2025_26, type NIBreakdown } from "@/lib/tax/2025-26";
import { money, pct, useAnimatedNumber, Donut } from "@/components/decision/kit";
import { FONT, BLUE, BLUE_SOFT, BLUE_EDGE, GREEN, VIOLET, AMBER, T, CANVAS, R_LG, Card, Head, Group, Divider, Field, MoneyInput, Range } from "@/components/decision/ui";

const IconCoin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a2.5 2.5 0 00-2.5-1.5c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 01-2.5-1.5M12 6.5v11" /></svg>;
const IconChart = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V9m4 8V5m4 12v-4M5 21h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>;

const NI = TAX_YEAR_2025_26.ni;
const PT = NI.primaryThreshold;
const UEL = NI.upperEarningsLimit;

type Mode = "employee" | "self-employed";
type Snap = { income: number; mode: Mode; ni: NIBreakdown; afterNi: number; effRate: number; marginal: number };
function computeNI(income: number, mode: Mode): Snap {
  const ni = mode === "employee" ? nationalInsurance(income) : selfEmployedNI(income);
  const rates = mode === "employee" ? NI.rates : NI.class4Rates;
  const marginal = income <= PT ? 0 : income <= UEL ? rates.main : rates.upper;
  return { income, mode, ni, afterNi: Math.max(0, income - ni.total), effRate: income > 0 ? ni.total / income : 0, marginal };
}

/* ── state ──────────────────────────────────────────────────────── */
type State = { income: number; mode: Mode };
type Action = { type: "income"; value: number } | { type: "mode"; value: Mode } | { type: "reset" };
const INITIAL: State = { income: 35000, mode: "employee" };
function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "income": return { ...s, income: Math.max(0, a.value) };
    case "mode": return { ...s, mode: a.value };
    case "reset": return INITIAL;
  }
}

const TOOLS = [
  { href: "/tax-and-salary/salary-calculator", label: "Take-Home Pay" },
  { href: "/tax-and-salary/tax-bracket-checker", label: "Tax Brackets" },
  { href: "/tax-and-salary/bonus-tax", label: "Bonus Tax" },
  { href: "/tax-and-salary/hourly-to-salary", label: "Hourly to Salary" },
  { href: "/tax-and-salary/scottish-tax", label: "Scottish Tax" },
  { href: "/business/sole-trader-tax", label: "Sole Trader Tax" },
];

/* ════════════════════════════════════════════════════════════════ */
export default function NIEngine({ initialIncome = 35000 }: { initialIncome?: number }) {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL, income: initialIncome });
  const [showResults, setShowResults] = useState(false);
  const snap = useMemo(() => computeNI(state.income, state.mode), [state]);

  const calculate = () => {
    setShowResults(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024) requestAnimationFrame(() => document.getElementById("ni-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const clear = () => {
    dispatch({ type: "reset" });
    setShowResults(false);
    if (typeof window !== "undefined") requestAnimationFrame(() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div style={{ fontFamily: FONT, color: T.body, background: CANVAS }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 24, paddingBottom: showResults ? 32 : 96 }}>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] items-start">
          <DetailsCard state={state} dispatch={dispatch} onCalculate={calculate} onReset={clear} calculated={showResults} />
          <div id="ni-results" className="grid gap-4 grid-cols-1" style={{ minWidth: 0, scrollMarginTop: 74 }}>
            {showResults ? (
              <>
                <SummaryCard snap={snap} />
                <BreakdownCard snap={snap} />
                <InsightsCard snap={snap} />
              </>
            ) : (
              <EmptyState onCalculate={calculate} />
            )}
            <ToolsRow />
            <FootBar />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── details ────────────────────────────────────────────────────── */
function DetailsCard({ state, dispatch, onCalculate, onReset, calculated }: { state: State; dispatch: React.Dispatch<Action>; onCalculate: () => void; onReset: () => void; calculated: boolean }) {
  const self = state.mode === "self-employed";
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
        <Group label="Your status">
          <Field label="Employment type" hint={self ? "Class 4 NI on trading profits (6% / 2%)." : "Class 1 employee NI (8% / 2%)."}>
            <div className="grid grid-cols-2 gap-2">
              {([{ v: "employee", l: "Employed" }, { v: "self-employed", l: "Self-employed" }] as const).map((o) => {
                const on = state.mode === o.v;
                return <button key={o.v} type="button" onClick={() => dispatch({ type: "mode", value: o.v })} style={{ padding: "11px 6px", borderRadius: 11, border: `1.5px solid ${on ? BLUE : T.line}`, background: on ? BLUE : "#fff", color: on ? "#fff" : T.body, fontWeight: 700, fontSize: 13.5, cursor: "pointer", transition: "all .12s" }}>{o.l}</button>;
              })}
            </div>
          </Field>
        </Group>

        <Divider />

        <Group label={self ? "Trading profit" : "Income"}>
          <Field label={self ? "Annual profit" : "Gross salary"} hint={self ? "Your profit after allowable expenses." : "Your total annual pay before deductions."}>
            <MoneyInput big value={state.income} onChange={(v) => dispatch({ type: "income", value: v })} icon={<IconCoin />} />
            <Range value={state.income} min={0} max={200000} step={1000} onChange={(v) => dispatch({ type: "income", value: v })} minLabel="£0" maxLabel="£200k+" />
          </Field>
        </Group>
      </div>

      <div className="gm-inputs-foot" style={{ padding: "12px 18px" }}>
        <button type="button" onClick={onCalculate} className="gm-cta flex items-center justify-center gap-2" style={{ width: "100%", padding: "12px 12px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <IconCoin />
          {calculated ? "Update Results" : "Calculate NI"}
        </button>
        <div className="flex items-center justify-center gap-1.5" style={{ fontSize: 12, color: T.mute, marginTop: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
          {calculated ? "Results update as you edit" : "UK-wide · 2025/26 rates"}
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ onCalculate }: { onCalculate: () => void }) {
  const points = [{ icon: "💷", label: "Annual & monthly NI" }, { icon: "📊", label: "Band-by-band split" }, { icon: "📈", label: "Effective NI rate" }, { icon: "💡", label: "Plain-English insights" }];
  return (
    <Card hover={false} radius={R_LG} style={{ padding: "28px 24px" }}>
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 440, margin: "0 auto" }}>
        <span style={{ width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: 15, background: BLUE_SOFT, color: BLUE, marginBottom: 14 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a2.5 2.5 0 00-2.5-1.5c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 01-2.5-1.5M12 6.5v11" /></svg>
        </span>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: "-0.02em", fontFamily: FONT }}>See your National Insurance</h3>
        <p style={{ fontSize: 14, color: T.mute, marginTop: 7, lineHeight: 1.5, maxWidth: 380 }}>
          Enter your income on the left, then press <strong style={{ color: T.body }}>Calculate</strong> to see exactly what you pay in NI.
        </p>
        <div className="grid grid-cols-2 gap-2" style={{ width: "100%", marginTop: 18 }}>
          {points.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5" style={{ border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px", background: T.tint, textAlign: "left" }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.body }}>{p.label}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={onCalculate} className="gm-cta flex items-center justify-center gap-2" style={{ marginTop: 18, padding: "12px 28px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <IconCoin />
          Calculate NI
        </button>
      </div>
    </Card>
  );
}

/* ── summary ────────────────────────────────────────────────────── */
const PERIOD = [{ key: "year", label: "Year", div: 1, word: "year" }, { key: "month", label: "Month", div: 12, word: "month" }, { key: "week", label: "Week", div: 52, word: "week" }];
function SummaryCard({ snap }: { snap: Snap }) {
  const [basis, setBasis] = useState("month");
  const p = PERIOD.find((x) => x.key === basis)!;
  const animated = useAnimatedNumber(snap.ni.total / p.div);
  const stats = [
    { label: snap.mode === "self-employed" ? "Profit" : "Gross income", value: money(snap.income / p.div), sub: `per ${p.word}` },
    { label: "After NI", value: money(snap.afterNi / p.div), sub: `per ${p.word}`, color: GREEN },
    { label: "Effective NI rate", value: pct(snap.effRate, 1), sub: "of income", color: VIOLET },
    { label: "Marginal NI", value: pct(snap.marginal, 0), sub: "on the next £1", color: BLUE },
  ];
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<IconCoin />} title="Your National Insurance"
        right={<div style={{ display: "inline-flex", background: T.tint, borderRadius: 9, padding: 3, gap: 2 }}>
          {PERIOD.map((x) => (
            <button key={x.key} type="button" onClick={() => setBasis(x.key)} style={{ fontSize: 12.5, fontWeight: 600, padding: "6px 12px", borderRadius: 7, border: 0, cursor: "pointer", background: basis === x.key ? "#fff" : "transparent", color: basis === x.key ? BLUE : T.mute, boxShadow: basis === x.key ? "0 1px 2px rgba(15,23,42,0.12)" : "none" }}>{x.label}</button>
          ))}
        </div>} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
        <span style={{ fontSize: 46, fontWeight: 800, color: T.ink, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{money(animated)}</span>
        <span style={{ fontSize: 15, fontWeight: 500, color: T.mute }}>NI / {p.word} · {money(snap.ni.total)} a year</span>
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

/* ── breakdown ──────────────────────────────────────────────────── */
function BreakdownCard({ snap }: { snap: Snap }) {
  const total = snap.income || 1;
  const mainPct = snap.mode === "self-employed" ? "6%" : "8%";
  const segs = [
    { label: "Kept (after NI)", value: snap.afterNi, color: GREEN, sub: "yours" },
    { label: `NI main band · ${mainPct}`, value: snap.ni.mainBand, color: BLUE, sub: `${money(PT)}–${money(UEL)}` },
    { label: "NI upper band · 2%", value: snap.ni.upperBand, color: AMBER, sub: `above ${money(UEL)}` },
  ].filter((s) => s.value > 0.5);
  const donutSegs = segs.map((s) => ({ label: s.label, value: s.value, color: s.color }));
  const keep = snap.income > 0 ? snap.afterNi / snap.income : 0;
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={IconChart} title="Where It Goes" right={<span style={{ fontSize: 12.5, color: T.mute }}>{money(snap.income)} income</span>} />
      <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] items-center justify-items-center sm:justify-items-stretch">
        <Donut segments={donutSegs} centerTop="You keep" centerValue={`${Math.round(keep * 100)}p`} size={184} sw={22} />
        <div style={{ width: "100%", minWidth: 0 }} className="space-y-3">
          {segs.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between" style={{ fontSize: 14, marginBottom: 5 }}>
                <span className="flex items-center gap-2"><span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} /><span style={{ color: T.ink, fontWeight: 600 }}>{s.label}</span></span>
                <span className="flex items-baseline gap-2.5">
                  <span style={{ fontWeight: 700, color: T.ink, fontVariantNumeric: "tabular-nums" }}>{money(s.value)}</span>
                  <span style={{ fontSize: 12.5, color: T.subtle, width: 42, textAlign: "right" }}>{pct(s.value / total, 0)}</span>
                </span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: T.tint, overflow: "hidden" }}>
                <div style={{ width: `${(s.value / total) * 100}%`, height: "100%", background: s.color, borderRadius: 999, transition: "width .4s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ── insights ───────────────────────────────────────────────────── */
function InsightsCard({ snap }: { snap: Snap }) {
  const items: { tone: "info" | "good" | "warn"; title: string; body: string; figure?: string }[] = [];
  if (snap.income <= PT) items.push({ tone: "good", title: "You pay no National Insurance", figure: "£0", body: `You earn below the ${money(PT)} threshold, so no NI is due at all this year.` });
  else {
    items.push({ tone: "info", title: "The upper-earnings drop", figure: pct(snap.marginal, 0), body: `NI is ${snap.mode === "self-employed" ? "6%" : "8%"} between ${money(PT)} and ${money(UEL)}, then falls to just 2% above ${money(UEL)} — so higher earners pay a smaller marginal NI rate.` });
    const monthly = snap.ni.total / 12;
    items.push({ tone: "info", title: "What it costs you monthly", figure: money(monthly), body: `Your NI works out at about ${money(monthly)} a month — a separate deduction from Income Tax, and it funds the State Pension and NHS.` });
  }
  if (snap.mode === "employee") items.push({ tone: "info", title: "Your employer pays too", body: `On top of your NI, your employer pays a further ~15% secondary Class 1 NI on your salary above the threshold — a hidden cost of employing you.` });
  const tone = { info: { bar: BLUE, chip: "#1d4ed8", bg: BLUE_SOFT, label: "Worth knowing" }, good: { bar: GREEN, chip: "#15803d", bg: "#f0fdf4", label: "Good news" }, warn: { bar: AMBER, chip: "#b45309", bg: "#fffbeb", label: "Note" } };
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={IconChart} title="What This Means" />
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {items.slice(0, 4).map((ins, i) => {
          const tt = tone[ins.tone];
          return (
            <div key={i} style={{ borderLeft: `3px solid ${tt.bar}`, background: tt.bg, borderRadius: "0 10px 10px 0", padding: "13px 15px" }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: tt.chip }}>{tt.label}</span>
                {ins.figure && <span style={{ fontSize: 17, fontWeight: 800, color: tt.chip, fontVariantNumeric: "tabular-nums" }}>{ins.figure}</span>}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginTop: 5 }}>{ins.title}</div>
              <p style={{ fontSize: 13.5, color: T.body, marginTop: 4, lineHeight: 1.5 }}>{ins.body}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── tools + foot ───────────────────────────────────────────────── */
function ToolsRow() {
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: "0 0 14px", fontFamily: FONT }}>Explore More Salary Tools</h3>
      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="flex flex-col items-center gap-2 text-center" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "16px 10px", transition: "all .14s" }}
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
      <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 8v4l3 2" /></svg>Source: HMRC · 2025/26 rates</span>
      <span>Class 1 & Class 4 NI · UK-wide</span>
      <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" /></svg>We respect your privacy. No data is stored.</span>
    </div>
  );
}
