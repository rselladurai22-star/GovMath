"use client";

import { useMemo, useReducer, useState } from "react";
import Link from "next/link";
import {
  computeTakeHome,
  STUDENT_PLANS,
  STUDENT_PLAN_ORDER,
  type EngineInputs,
  type StudentPlan,
} from "@/lib/tax/take-home-engine";
import { money, pct, useAnimatedNumber, Donut } from "@/components/decision/kit";
import {
  FONT, BLUE, BLUE_SOFT, BLUE_EDGE, GREEN, VIOLET, AMBER, CORAL, T, CANVAS, R_LG,
  Card, Head, Group, Divider, Field, MoneyInput, Range,
} from "@/components/decision/ui";

/* ══════════════════════════════════════════════════════════════════
   Bonus Tax Engine — what a one-off bonus is really worth after HMRC.
   Reuses the tested 2025/26 take-home engine; the bonus figures are the
   marginal difference between "salary only" and "salary + bonus".
   ══════════════════════════════════════════════════════════════════ */

type BonusPicture = {
  bonus: number;
  cash: number;
  tax: number;
  ni: number;
  studentLoan: number;
  pension: number;
  deductions: number;
  keepRate: number;
  effRate: number;
  marginalBand: string;
  adjustedGross: number;
  inTrap: boolean;
};

function bonusPicture(salary: number, bonus: number, pensionPct: number, plan: StudentPlan): BonusPicture {
  const base = computeTakeHome({ gross: salary, bonus: 0, pensionPct, plan });
  const full = computeTakeHome({ gross: salary, bonus, pensionPct, plan });
  const cash = Math.max(0, full.takeHome - base.takeHome);
  const tax = Math.max(0, full.incomeTax.total - base.incomeTax.total);
  const ni = Math.max(0, full.ni.total - base.ni.total);
  const studentLoan = Math.max(0, full.studentLoan - base.studentLoan);
  const pension = Math.max(0, full.pensionContribution - base.pensionContribution);
  const deductions = tax + ni + studentLoan;
  const adj = full.adjustedGross;
  const band =
    adj > 125140 ? "45% additional rate"
    : adj > 100000 ? "60% (allowance taper)"
    : adj > 50270 ? "40% higher rate"
    : adj > 12570 ? "20% basic rate"
    : "0% (tax-free)";
  return {
    bonus,
    cash,
    tax,
    ni,
    studentLoan,
    pension,
    deductions,
    keepRate: bonus > 0 ? cash / bonus : 0,
    effRate: bonus > 0 ? deductions / bonus : 0,
    marginalBand: band,
    adjustedGross: adj,
    inTrap: adj > 100000 && adj <= 125140,
  };
}

/* ── state ──────────────────────────────────────────────────────── */
type State = { salary: number; bonus: number; pensionPct: number; plan: StudentPlan };
type Action =
  | { type: "salary"; value: number } | { type: "bonus"; value: number }
  | { type: "pension"; value: number } | { type: "plan"; value: StudentPlan } | { type: "reset" };
const INITIAL: State = { salary: 40000, bonus: 5000, pensionPct: 0, plan: "none" };
function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "salary": return { ...s, salary: Math.max(0, a.value) };
    case "bonus": return { ...s, bonus: Math.max(0, a.value) };
    case "pension": return { ...s, pensionPct: Math.min(60, Math.max(0, a.value)) };
    case "plan": return { ...s, plan: a.value };
    case "reset": return INITIAL;
  }
}

const IconGift = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8M2 8h20v4H2zM12 21V8M12 8S9.5 3 7 4.5 9 8 12 8zM12 8s2.5-5 5-3.5S15 8 12 8z" />
  </svg>
);
const IconChart = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V9m4 8V5m4 12v-4M5 21h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>;

/* ════════════════════════════════════════════════════════════════ */
export default function BonusEngine({ initialSalary = 40000 }: { initialSalary?: number }) {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL, salary: initialSalary });
  const [showResults, setShowResults] = useState(false);
  const pic = useMemo(() => bonusPicture(state.salary, state.bonus, state.pensionPct, state.plan), [state]);
  const inputs: EngineInputs = { gross: state.salary, bonus: state.bonus, pensionPct: state.pensionPct, plan: state.plan };

  const calculate = () => {
    setShowResults(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => document.getElementById("bt-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
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

          <div id="bt-results" className="grid gap-4 grid-cols-1" style={{ minWidth: 0, scrollMarginTop: 74 }}>
            {showResults ? (
              <>
                <SummaryCard pic={pic} />
                <BreakdownCard pic={pic} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <SacrificeCard state={state} pic={pic} />
                  <MarginalCard pic={pic} />
                </div>
                <InsightsCard pic={pic} state={state} />
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
          <button type="button" onClick={calculate} className="gm-cta flex items-center justify-center gap-2" style={{ width: "100%", padding: "14px 12px", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15.5, border: 0, cursor: "pointer" }}>
            <IconGift /> Calculate Bonus
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LEFT — inputs
   ══════════════════════════════════════════════════════════════════ */
function DetailsCard({ state, dispatch, onCalculate, onReset, calculated }: { state: State; dispatch: React.Dispatch<Action>; onCalculate: () => void; onReset: () => void; calculated: boolean }) {
  return (
    <Card hover={false} className="gm-inputs-panel lg:sticky lg:top-[74px]" radius={R_LG} style={{ padding: 0 }}>
      <div className="gm-inputs-head flex items-center justify-between" style={{ padding: "13px 18px 12px", borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-2">
          <span style={{ width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 9, background: BLUE_SOFT, color: BLUE }}><IconGift /></span>
          <h2 style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em", fontFamily: FONT }}>Your Details</h2>
        </div>
        <button type="button" onClick={onReset} className="flex items-center gap-1.5" style={{ fontSize: 12.5, fontWeight: 600, color: T.mute, background: "none", border: 0, cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.9-2M20 15A8 8 0 015.1 17" /></svg>
          Clear
        </button>
      </div>

      <div className="gm-inputs-body gm-scroll" style={{ padding: "14px 18px 16px" }}>
        <Group label="Income">
          <Field label="Annual salary" hint="Your normal gross pay, before the bonus.">
            <MoneyInput big value={state.salary} onChange={(v) => dispatch({ type: "salary", value: v })} />
            <Range value={state.salary} min={0} max={200000} step={1000} onChange={(v) => dispatch({ type: "salary", value: v })} minLabel="£0" maxLabel="£200k+" />
          </Field>
          <Field label="Bonus amount" hint="The one-off gross bonus you're being paid.">
            <MoneyInput big value={state.bonus} onChange={(v) => dispatch({ type: "bonus", value: v })} icon={<IconGift />} />
            <Range value={state.bonus} min={0} max={50000} step={500} onChange={(v) => dispatch({ type: "bonus", value: v })} minLabel="£0" maxLabel="£50k+" />
          </Field>
        </Group>

        <Divider />

        <Group label="Adjustments">
          <Field label="Sacrifice into pension" right={`${state.pensionPct}%`} hint={state.pensionPct > 0 ? "Applied to salary + bonus, before tax." : "Divert part of your bonus into your pension to dodge tax."}>
            <Range value={state.pensionPct} min={0} max={40} step={1} onChange={(v) => dispatch({ type: "pension", value: v })} minLabel="0%" maxLabel="40%" />
          </Field>
          <Field label="Student loan plan" info hint="Adds 9% (6% postgrad) on the bonus above your plan's threshold.">
            <div className="grid grid-cols-3 gap-1.5">
              {STUDENT_PLAN_ORDER.map((p) => {
                const on = state.plan === p;
                return (
                  <button key={p} type="button" onClick={() => dispatch({ type: "plan", value: p })} style={{ fontSize: 12.5, fontWeight: 700, padding: "9px 3px", borderRadius: 9, border: `1.5px solid ${on ? BLUE : T.line}`, background: on ? BLUE : "#fff", color: on ? "#fff" : T.body, cursor: "pointer", transition: "all .12s" }}>
                    {STUDENT_PLANS[p].short}
                  </button>
                );
              })}
            </div>
          </Field>
        </Group>
      </div>

      <div className="gm-inputs-foot" style={{ padding: "12px 18px" }}>
        <button type="button" onClick={onCalculate} className="gm-cta flex items-center justify-center gap-2" style={{ width: "100%", padding: "12px 12px", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14.5, border: 0, cursor: "pointer" }}>
          <IconGift /> {calculated ? "Update Results" : "Calculate Bonus"}
        </button>
        <div className="flex items-center justify-center gap-1.5" style={{ fontSize: 12, color: T.mute, marginTop: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
          {calculated ? "Results update as you edit" : "England, Wales & NI · 2025/26"}
        </div>
      </div>
    </Card>
  );
}

/* ── empty state ────────────────────────────────────────────────── */
function EmptyState({ onCalculate }: { onCalculate: () => void }) {
  const points = [
    { icon: "💷", label: "Bonus in your bank" },
    { icon: "📊", label: "Tax & NI on the bonus" },
    { icon: "🪙", label: "Sacrifice comparison" },
    { icon: "⚠️", label: "60% trap warning" },
  ];
  return (
    <Card hover={false} radius={R_LG} style={{ padding: "28px 24px" }}>
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 440, margin: "0 auto" }}>
        <span style={{ width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: 15, background: BLUE_SOFT, color: BLUE, marginBottom: 14 }}><IconGift /></span>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: "-0.02em", fontFamily: FONT }}>See your real bonus</h3>
        <p style={{ fontSize: 14, color: T.mute, marginTop: 7, lineHeight: 1.5, maxWidth: 380 }}>
          Enter your salary and bonus on the left, then press <strong style={{ color: T.body }}>Calculate</strong> to see what actually lands in your bank.
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
          <IconGift /> Calculate Bonus
        </button>
      </div>
    </Card>
  );
}

/* ── summary ────────────────────────────────────────────────────── */
function SummaryCard({ pic }: { pic: BonusPicture }) {
  const animated = useAnimatedNumber(pic.cash);
  const stats = [
    { label: "Bonus (gross)", value: money(pic.bonus), sub: "before tax" },
    { label: "Tax + NI", value: money(pic.tax + pic.ni), sub: `${pct(pic.effRate, 0)} of bonus`, color: CORAL },
    { label: "You keep", value: `${Math.round(pic.keepRate * 100)}p`, sub: "per £1 of bonus", color: GREEN },
    { label: pic.studentLoan > 0 ? "Student loan" : "Pension", value: money(pic.studentLoan > 0 ? pic.studentLoan : pic.pension), sub: "from the bonus", color: pic.studentLoan > 0 ? VIOLET : BLUE },
  ];
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<IconGift />} title="Your Bonus, After Tax" />
      <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
        <span style={{ fontSize: 46, fontWeight: 800, color: GREEN, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{money(animated)}</span>
        <span style={{ fontSize: 15, fontWeight: 500, color: T.mute }}>lands in your bank · from {money(pic.bonus)} gross</span>
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

/* ── breakdown (donut) ──────────────────────────────────────────── */
function BreakdownCard({ pic }: { pic: BonusPicture }) {
  const segs = [
    { key: "cash", label: "In your bank", value: pic.cash, color: GREEN, yours: true },
    { key: "pension", label: "Pension", value: pic.pension, color: BLUE, yours: true },
    { key: "tax", label: "Income Tax", value: pic.tax, color: CORAL, yours: false },
    { key: "ni", label: "National Insurance", value: pic.ni, color: AMBER, yours: false },
    { key: "sl", label: "Student loan", value: pic.studentLoan, color: VIOLET, yours: false },
  ].filter((s) => s.value > 0.5);
  const g = pic.bonus || 1;
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={IconChart} title="Where Your Bonus Goes" right={<span style={{ fontSize: 12.5, color: T.mute }}>{money(pic.bonus)} bonus</span>} />
      <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] items-center justify-items-center sm:justify-items-stretch">
        <Donut segments={segs.map((s) => ({ label: s.label, value: s.value, color: s.color }))} centerTop="You keep" centerValue={`${Math.round(pic.keepRate * 100)}p`} size={184} sw={22} />
        <div style={{ width: "100%", minWidth: 0 }} className="space-y-3">
          {segs.map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between" style={{ fontSize: 14, marginBottom: 5 }}>
                <span className="flex items-center gap-2"><span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} /><span style={{ color: T.ink, fontWeight: 600 }}>{s.label}</span></span>
                <span className="flex items-baseline gap-2.5">
                  <span style={{ fontWeight: 700, color: s.yours ? T.ink : s.color, fontVariantNumeric: "tabular-nums" }}>{s.yours ? "" : "−"}{money(s.value)}</span>
                  <span style={{ fontSize: 12.5, color: T.subtle, width: 40, textAlign: "right" }}>{pct(s.value / g, 0)}</span>
                </span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: T.tint, overflow: "hidden" }}>
                <div style={{ width: `${(s.value / g) * 100}%`, height: "100%", background: s.color, borderRadius: 999, transition: "width .4s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ── sacrifice comparison ───────────────────────────────────────── */
function SacrificeCard({ state, pic }: { state: State; pic: BonusPicture }) {
  // Sacrifice the *whole* bonus into pension: no cash, but the full bonus lands
  // in the pension pot and the tax/NI is avoided entirely.
  const sacrificed = pic.bonus;
  const forgoneCash = pic.cash;
  const taxSaved = pic.deductions;
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" /></svg>} title="Take Cash or Sacrifice?" />
      <div className="grid grid-cols-2 gap-3">
        <div style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "13px 14px", background: T.tint }}>
          <div style={{ fontSize: 12, color: T.mute, fontWeight: 600 }}>Take as cash</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: GREEN, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{money(pic.cash)}</div>
          <div style={{ fontSize: 11.5, color: T.subtle, marginTop: 2 }}>in your bank now</div>
        </div>
        <div style={{ border: `1px solid ${BLUE_EDGE}`, borderRadius: 12, padding: "13px 14px", background: BLUE_SOFT }}>
          <div style={{ fontSize: 12, color: T.mute, fontWeight: 600 }}>Sacrifice to pension</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: BLUE, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{money(sacrificed)}</div>
          <div style={{ fontSize: 11.5, color: T.subtle, marginTop: 2 }}>into your pot</div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: T.body, marginTop: 12, lineHeight: 1.55 }}>
        Sacrificing the whole bonus puts <strong style={{ color: BLUE }}>{money(sacrificed)}</strong> into your pension for just{" "}
        <strong style={{ color: T.ink }}>{money(forgoneCash)}</strong> of forgone take-home — the{" "}
        <strong style={{ color: GREEN }}>{money(taxSaved)}</strong> gap is tax and NI you never pay.
      </p>
    </Card>
  );
}

/* ── marginal band ──────────────────────────────────────────────── */
function MarginalCard({ pic }: { pic: BonusPicture }) {
  const keep = Math.round(pic.keepRate * 1000);
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <Head icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>} title="How It's Taxed" />
      <div className="flex items-center gap-4">
        <div style={{ position: "relative", width: 118, height: 74, flex: "none" }}>
          <svg width="118" height="74" viewBox="0 0 118 74">
            <path d="M 12,66 A 47,47 0 0 1 106,66" fill="none" stroke={T.tint} strokeWidth="11" strokeLinecap="round" />
            <path d="M 12,66 A 47,47 0 0 1 106,66" fill="none" stroke={pic.inTrap ? CORAL : GREEN} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${Math.min(1, Math.max(0, pic.keepRate)) * Math.PI * 47} ${Math.PI * 47}`} />
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 2, textAlign: "center" }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: T.ink, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{keep}p</div>
            <div style={{ fontSize: 11.5, color: T.mute }}>per £1</div>
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, color: T.body, lineHeight: 1.55 }}>
            {pic.inTrap ? (
              <>Your bonus lands in the <strong style={{ color: CORAL }}>60% trap</strong> (£100k–£125,140), where the Personal Allowance tapers away.</>
            ) : (
              <>Your bonus is taxed at the <strong style={{ color: T.ink }}>{pic.marginalBand}</strong>, plus National Insurance.</>
            )}
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
function buildInsights(pic: BonusPicture, state: State) {
  const list: { tone: InsightTone; title: string; body: string; figure?: string }[] = [];
  if (pic.inTrap) list.push({ tone: "risk", title: "The 60% tax trap", figure: pct(pic.effRate, 0), body: "Between £100k and £125,140 every £2 of bonus removes £1 of tax-free allowance. Sacrificing the bonus into your pension avoids it entirely." });
  if (state.pensionPct === 0 && pic.deductions > 0) list.push({ tone: "opportunity", title: "Sacrifice beats cash for tax", figure: money(pic.deductions), body: `Paying the bonus straight into your pension would save the ${money(pic.deductions)} of tax and NI you'd otherwise lose.` });
  list.push({ tone: "info", title: "Your payslip may look worse", body: `In the month it's paid, PAYE often over-deducts because it assumes the big pay-packet repeats all year. You get the excess back over following months — the ${money(pic.cash)} here is the annual truth.` });
  if (pic.studentLoan > 0) list.push({ tone: "info", title: "Student loan takes a slice", figure: money(pic.studentLoan), body: "9% (6% postgrad) applies to the bonus above your plan's threshold, on top of tax and NI." });
  if (!pic.inTrap && state.pensionPct === 0 && pic.effRate < 0.35) list.push({ tone: "win", title: "A clean bonus", body: `You keep ${Math.round(pic.keepRate * 100)}p of every £1 — this bonus falls in a low-tax band.` });
  return list.slice(0, 4);
}
function InsightsCard({ pic, state }: { pic: BonusPicture; state: State }) {
  const items = useMemo(() => buildInsights(pic, state), [pic, state]);
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
  { href: "/tax-and-salary/salary-calculator", label: "Take-Home Pay" },
  { href: "/tax-and-salary/tax-bracket-checker", label: "Tax Brackets" },
  { href: "/tax-and-salary/national-insurance", label: "National Insurance" },
  { href: "/investing/pension-tax-relief", label: "Pension Tax Relief" },
  { href: "/tax-and-salary/overtime", label: "Overtime" },
  { href: "/calculators", label: "All Calculators" },
];
function ToolsRow() {
  return (
    <Card radius={R_LG} style={{ padding: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: "0 0 14px", fontFamily: FONT }}>Explore More Salary Tools</h3>
      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="flex flex-col items-center gap-2 text-center" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: "16px 10px", transition: "all .14s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = BLUE_EDGE; e.currentTarget.style.background = BLUE_SOFT; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.background = "#fff"; }}>
            <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 10, background: BLUE_SOFT, color: BLUE }}><IconGift /></span>
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
      <span>England, Wales & NI · tax code 1257L</span>
      <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" /></svg>We respect your privacy. No data is stored.</span>
    </div>
  );
}
