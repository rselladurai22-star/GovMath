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
import {
  C, PALETTE, money, pct, useAnimatedNumber,
  Card, CardTitle, Label, Explain, Segmented, Slider, TrackSlider, MoneyField,
  Stat, Donut, Legend, Gauge, InsightTile, type InsightTone,
} from "@/components/decision/kit";

const SEG: Record<AllocationKey, string> = {
  takeHome: PALETTE.green,
  pension: PALETTE.blue,
  incomeTax: PALETTE.coral,
  ni: PALETTE.amber,
  studentLoan: PALETTE.violet,
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
type Action = { type: "salary"; value: number } | { type: "pension"; value: number } | { type: "bonus"; value: number } | { type: "plan"; value: StudentPlan } | { type: "reset" };
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
  const annualSalary = state.salary;
  const inputs: EngineInputs = useMemo(() => ({ gross: annualSalary, bonus: state.bonus, pensionPct: state.pensionPct, plan: state.plan }), [annualSalary, state.bonus, state.pensionPct, state.plan]);
  const snap = useMemo(() => computeTakeHome(inputs), [inputs]);

  return (
    <div className="rk" style={{ color: C.body }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 22, paddingBottom: 30 }}>
        <div className="grid gap-4 lg:grid-cols-[336px_minmax(0,1fr)] items-start">
          <InputsCard state={state} dispatch={dispatch} snap={snap} />
          <div className="grid gap-4">
            <ResultCard snap={snap} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Every month" value={money(snap.takeHome / 12)} sub="in your pocket" />
              <Stat label="Effective rate" value={pct(snap.effectiveRate)} sub={`${money(snap.totalDeductions)} to tax + NI`} color={PALETTE.coral} />
              <Stat label="Keep-rate" value={`${Math.round(snap.keepRate * 100)}p`} sub="of every £1" color={C.accent} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3" style={{ marginTop: 16 }}>
          <BreakdownCard snap={snap} />
          <ScenariosCard inputs={inputs} snap={snap} />
          <MarginalCard snap={snap} inputs={inputs} />
          <div className="lg:col-span-2"><CurveCard inputs={inputs} annualSalary={annualSalary} dispatch={dispatch} /></div>
          <NextStepsCard snap={snap} inputs={inputs} />
          <div className="lg:col-span-3"><InsightsCard snap={snap} inputs={inputs} /></div>
        </div>
      </div>
    </div>
  );
}

/* ── inputs ─────────────────────────────────────────────────────── */
function InputsCard({ state, dispatch, snap }: { state: State; dispatch: React.Dispatch<Action>; snap: TakeHomeSnapshot }) {
  const [advanced, setAdvanced] = useState(() => state.plan !== "none" || state.bonus > 0);
  return (
    <Card className="lg:sticky lg:top-[74px]" pad={0}>
      <div className="flex items-center justify-between" style={{ padding: "16px 18px 12px" }}>
        <h2 style={{ fontSize: 18.5, fontWeight: 700, color: C.ink, margin: 0 }}>Your details</h2>
        <button type="button" onClick={() => dispatch({ type: "reset" })} style={{ fontSize: 14, fontWeight: 600, color: C.body, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 13px", background: "#fff" }}>Reset</button>
      </div>
      <div style={{ padding: "4px 18px 18px" }} className="space-y-5">
        <div>
          <Label>Gross salary <span style={{ fontWeight: 500, color: C.subtle }}>· per year</span></Label>
          <MoneyField big value={state.salary} onChange={(v) => dispatch({ type: "salary", value: v })} />
          <TrackSlider value={state.salary} onChange={(v) => dispatch({ type: "salary", value: v })} max={200000} step={1000} minLabel="£0" maxLabel="£200k+" />
          <Explain>Type it in, or drag the slider. This is your total pay before tax, National Insurance and pension.</Explain>
        </div>

        <Slider label="Pension contribution" value={state.pensionPct} min={0} max={30} step={1} onChange={(v) => dispatch({ type: "pension", value: v })} format={(v) => `${v}%`}
          hint={state.pensionPct > 0 ? `${money(snap.pensionContribution)} a year, taken before tax — so it costs you less than it adds.` : "Paid before tax via salary sacrifice. Most workplaces auto-enrol you at 5%."} />

        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 4 }}>
          <button type="button" onClick={() => setAdvanced((a) => !a)} aria-expanded={advanced} className="flex items-center justify-between w-full" style={{ padding: "9px 0", background: "none", border: 0, cursor: "pointer" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>Advanced options</span>
            <span className="flex items-center gap-2">
              <span style={{ fontSize: 13, color: C.mute }}>student loan · bonus</span>
              <span style={{ display: "inline-block", transition: "transform .2s", transform: advanced ? "rotate(180deg)" : "none", color: C.mute, fontSize: 12 }}>▾</span>
            </span>
          </button>
          {advanced && (
            <div className="space-y-5" style={{ paddingTop: 8 }}>
              <div>
                <Label>Student loan plan</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {STUDENT_PLAN_ORDER.map((p) => {
                    const on = state.plan === p;
                    return <button key={p} type="button" onClick={() => dispatch({ type: "plan", value: p })} style={{ fontSize: 13.5, fontWeight: 600, padding: "10px 3px", borderRadius: 8, border: `1.5px solid ${on ? C.accent : C.line}`, background: on ? C.accent : "#fff", color: on ? "#fff" : C.body, transition: "all .12s" }}>{STUDENT_PLANS[p].short}</button>;
                  })}
                </div>
                <Explain>Only if you&rsquo;re repaying a UK student loan. Most English graduates since 2012 are on <strong style={{ color: C.body }}>Plan 2</strong>. It&rsquo;s 9% of income above the threshold.</Explain>
              </div>
              <div>
                <Label>Annual bonus</Label>
                <MoneyField value={state.bonus} onChange={(v) => dispatch({ type: "bonus", value: v })} />
                <Explain>A one-off payment on top of salary. Taxed the same way, but it can tip you into a higher band.</Explain>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "11px 18px", borderTop: `1px solid ${C.line}`, background: C.tint, borderRadius: "0 0 16px 16px" }}>
        <p style={{ fontSize: 13, color: C.mute, margin: 0, lineHeight: 1.5 }}>England, Wales &amp; NI · 2025/26 tax year · assumes tax code 1257L · updates live.</p>
      </div>
    </Card>
  );
}

/* ── result ─────────────────────────────────────────────────────── */
const PERIOD = [
  { key: "year", label: "Year", div: 1, word: "year" },
  { key: "month", label: "Month", div: 12, word: "month" },
  { key: "week", label: "Week", div: 52, word: "week" },
];
function ResultCard({ snap }: { snap: TakeHomeSnapshot }) {
  const [basis, setBasis] = useState("month");
  const p = PERIOD.find((x) => x.key === basis)!;
  const animated = useAnimatedNumber(snap.takeHome / p.div);
  const donutSegs = snap.allocation.map((s) => ({ label: SEG_LABEL[s.key], value: s.amount, color: SEG[s.key] }));
  const legendRows = snap.allocation.map((s) => ({ label: SEG_LABEL[s.key], value: money(s.amount / p.div), pct: pct(s.share, 0), color: SEG[s.key] }));
  return (
    <Card pad={20}>
      <div className="flex items-center justify-between gap-3" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: C.mute }}>Your take-home pay</div>
        <div style={{ width: 228, flex: "none" }}><Segmented value={basis} onChange={setBasis} options={PERIOD.map((x) => ({ value: x.key, label: x.label }))} /></div>
      </div>
      <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] items-center justify-items-center sm:justify-items-stretch">
        <Donut segments={donutSegs} centerTop={`Per ${p.word}`} centerValue={money(animated)} />
        <div style={{ minWidth: 0, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 46, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{money(animated)}</span>
            <span style={{ fontSize: 16.5, fontWeight: 500, color: C.mute }}>/ {p.word}</span>
          </div>
          <div style={{ fontSize: 15, color: C.body, marginTop: 6, marginBottom: 16 }}>from {money(snap.totalGross / p.div)} gross a {p.word}</div>
          <Legend rows={legendRows} />
        </div>
      </div>
    </Card>
  );
}

/* ── breakdown ──────────────────────────────────────────────────── */
function BreakdownCard({ snap }: { snap: TakeHomeSnapshot }) {
  const g = snap.totalGross || 1;
  return (
    <Card>
      <CardTitle right={<span style={{ fontSize: 13, color: C.mute }}>{money(snap.totalGross)} gross</span>}>Breakdown</CardTitle>
      <div className="space-y-3">
        {snap.allocation.map((s) => (
          <div key={s.key}>
            <div className="flex items-center justify-between" style={{ fontSize: 15, marginBottom: 5 }}>
              <span className="flex items-center gap-2"><span style={{ width: 10, height: 10, borderRadius: 3, background: SEG[s.key] }} /><span style={{ color: C.ink, fontWeight: 600 }}>{SEG_LABEL[s.key]}</span></span>
              <span style={{ fontWeight: 700, color: s.yours ? C.ink : SEG[s.key], fontVariantNumeric: "tabular-nums" }}>{s.yours ? "" : "−"}{money(s.amount)}</span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: C.tint, overflow: "hidden" }}>
              <div style={{ width: `${(s.amount / g) * 100}%`, height: "100%", background: SEG[s.key], borderRadius: 999, transition: "width .4s" }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── scenarios ──────────────────────────────────────────────────── */
type Scenario = { id: string; label: string; inputs: EngineInputs };
function buildScenarios(inputs: EngineInputs, snap: TakeHomeSnapshot): Scenario[] {
  const out: Scenario[] = [{ id: "raise", label: "+£5,000 pay rise", inputs: { ...inputs, gross: inputs.gross + 5000 } }];
  if (inputs.pensionPct < 15) out.push({ id: "pension", label: `Pension +5%`, inputs: { ...inputs, pensionPct: inputs.pensionPct + 5 } });
  const adj = snap.adjustedGross;
  if (adj > 100000 && adj <= 125140) { const need = ((adj - 100000) / snap.totalGross) * 100 + inputs.pensionPct; out.push({ id: "trap", label: "Duck under £100k", inputs: { ...inputs, pensionPct: Math.min(60, Math.ceil(need)) } }); }
  else if (inputs.gross < 50270) out.push({ id: "toHigher", label: "Earn £50,270", inputs: { ...inputs, gross: 50270 } });
  return out.slice(0, 3);
}
function ScenariosCard({ inputs, snap }: { inputs: EngineInputs; snap: TakeHomeSnapshot }) {
  const rows = useMemo(() => buildScenarios(inputs, snap), [inputs, snap]).map((s) => ({ ...s, snap: computeTakeHome(s.inputs) }));
  return (
    <Card>
      <CardTitle>What if…</CardTitle>
      <div className="space-y-2.5">
        {rows.map((s) => {
          const d = s.snap.takeHome - snap.takeHome; const up = d >= 0;
          return (
            <div key={s.id} className="flex items-center justify-between" style={{ padding: "9px 11px", borderRadius: 10, background: C.tint }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{s.label}</div>
                <div style={{ fontSize: 13.5, color: C.mute, fontVariantNumeric: "tabular-nums" }}>{money(s.snap.takeHome)} take-home</div>
              </div>
              <div style={{ fontSize: 16.5, fontWeight: 700, color: up ? C.accent : PALETTE.coral, fontVariantNumeric: "tabular-nums", flex: "none" }}>{up ? "+" : "−"}{money(Math.abs(d))}</div>
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
  return (
    <Card>
      <CardTitle>Your next £1,000</CardTitle>
      <div className="flex items-center gap-4">
        <Gauge value={snap.marginalKeep} color={trap ? PALETTE.coral : C.accent} centerValue={money(snap.marginalKeep * 1000)} centerSub="you keep" />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14.5, color: C.body, lineHeight: 1.55 }}>
            {trap ? <>You&rsquo;re in the <strong style={{ color: PALETTE.coral }}>60% zone</strong>. A pay rise here is largely lost to tax.</> : <>Taxed at your <strong style={{ color: C.ink }}>{pct(snap.marginalRate, 0)}</strong> marginal rate.{inputs.pensionPct === 0 && " Pension sacrifice keeps it all."}</>}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── income curve ───────────────────────────────────────────────── */
function CurveCard({ inputs, annualSalary, dispatch }: { inputs: EngineInputs; annualSalary: number; dispatch: React.Dispatch<Action> }) {
  const [mode, setMode] = useState<"takeHome" | "keep">("takeHome");
  const W = 820, H = 220, padL = 6, padR = 6, padT = 14, padB = 24, MAX = 160000;
  const curve = useMemo(() => takeHomeCurve(inputs, 0, MAX, 130), [inputs]);
  const markers = useMemo(() => thresholdMarkers(), []);
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState(false);
  const maxTH = curve[curve.length - 1].takeHome;
  const x = (g: number) => padL + (g / MAX) * (W - padL - padR);
  const yTH = (v: number) => padT + (1 - v / maxTH) * (H - padT - padB);
  const yK = (v: number) => padT + (1 - v) * (H - padT - padB);
  const path = useMemo(() => curve.map((pt, i) => `${i === 0 ? "M" : "L"}${x(pt.gross).toFixed(1)},${(mode === "takeHome" ? yTH(pt.takeHome) : yK(pt.keepRate)).toFixed(1)}`).join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [curve, mode]);
  const area = `${path} L${x(MAX).toFixed(1)},${(H - padB).toFixed(1)} L${x(0).toFixed(1)},${(H - padB).toFixed(1)} Z`;
  const bands = [{ f: 0, t: 12570, c: "#eef7f2" }, { f: 12570, t: 50270, c: "#f7fbf9" }, { f: 50270, t: 100000, c: "#fdf5ef" }, { f: 100000, t: 125140, c: "#fdeeeb" }, { f: 125140, t: MAX, c: "#f4f1fc" }];
  const here = useMemo(() => computeTakeHome(inputs), [inputs]);
  const mx = x(Math.min(annualSalary, MAX));
  const my = mode === "takeHome" ? yTH(here.takeHome) : yK(here.keepRate);
  const setFromX = (clientX: number) => { const rc = svgRef.current?.getBoundingClientRect(); if (!rc) return; const g = Math.round((Math.min(1, Math.max(0, (clientX - rc.left) / rc.width)) * MAX) / 500) * 500; dispatch({ type: "salary", value: g }); };
  return (
    <Card>
      <CardTitle right={<div style={{ width: 200 }}><Segmented value={mode} onChange={(v) => setMode(v as "takeHome" | "keep")} options={[{ value: "takeHome", label: "Take-home" }, { value: "keep", label: "Keep-rate" }]} /></div>}>Explore any salary</CardTitle>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", cursor: drag ? "grabbing" : "crosshair", touchAction: "none" }}
          onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setDrag(true); setFromX(e.clientX); }} onPointerMove={(e) => drag && setFromX(e.clientX)} onPointerUp={() => setDrag(false)} onPointerLeave={() => setDrag(false)}
          role="slider" aria-label="Salary explorer" aria-valuemin={0} aria-valuemax={MAX} aria-valuenow={Math.round(annualSalary)} tabIndex={0}
          onKeyDown={(e) => { if (e.key === "ArrowRight") dispatch({ type: "salary", value: Math.min(MAX, annualSalary + 1000) }); if (e.key === "ArrowLeft") dispatch({ type: "salary", value: Math.max(0, annualSalary - 1000) }); }}>
          {bands.map((b) => <rect key={b.f} x={x(b.f)} y={padT} width={x(b.t) - x(b.f)} height={H - padT - padB} fill={b.c} />)}
          <defs><linearGradient id="cf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.accent} stopOpacity="0.18" /><stop offset="100%" stopColor={C.accent} stopOpacity="0" /></linearGradient></defs>
          <path d={area} fill="url(#cf2)" />
          <path d={path} fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinejoin="round" />
          {markers.map((m) => (<g key={m.id}><line x1={x(m.gross)} y1={padT} x2={x(m.gross)} y2={H - padB} stroke="#d4ddd8" strokeWidth="1" strokeDasharray="3 3" /><text x={x(m.gross) + 4} y={padT + 11} style={{ fontSize: 10, fontWeight: 600 }} fill="#9aa6a0">{m.label}</text></g>))}
          <line x1={mx} y1={padT} x2={mx} y2={H - padB} stroke={C.ink} strokeWidth="1.5" />
          <circle cx={mx} cy={my} r="7" fill="#fff" stroke={C.ink} strokeWidth="2.5" /><circle cx={mx} cy={my} r="3" fill={C.accent} />
        </svg>
        <div style={{ position: "absolute", top: 2, left: `clamp(4px, ${(mx / W) * 100}%, calc(100% - 150px))`, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "6px 10px", pointerEvents: "none", boxShadow: C.shadow }}>
          <div style={{ fontSize: 11, color: C.mute }}>{money(annualSalary)}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.accent, fontVariantNumeric: "tabular-nums" }}>{mode === "takeHome" ? money(here.takeHome) : `${Math.round(here.keepRate * 100)}p / £1`}</div>
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: C.mute, marginTop: 8 }}>Drag the marker · shaded zones are the 20% / 40% / 60% / 45% tax bands.</p>
    </Card>
  );
}

/* ── insights ───────────────────────────────────────────────────── */
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
    <Card>
      <CardTitle>What this means for you</CardTitle>
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {items.map((ins, i) => <InsightTile key={i} tone={ins.tone} title={ins.title} body={ins.body} figure={ins.figure} />)}
      </div>
    </Card>
  );
}

/* ── next steps ─────────────────────────────────────────────────── */
function NextStepsCard({ snap, inputs }: { snap: TakeHomeSnapshot; inputs: EngineInputs }) {
  const steps: { title: string; href: string }[] = [];
  const adj = snap.adjustedGross;
  if (adj > 100000) steps.push({ title: "Beat the 60% trap", href: "/investing/pension-tax-relief" });
  else if (inputs.pensionPct === 0) steps.push({ title: "Check pension relief", href: "/investing/pension-tax-relief" });
  if (inputs.plan !== "none") steps.push({ title: "Project your student loan", href: `/students/${inputs.plan === "pg" ? "postgrad-loan" : `plan-${inputs.plan.replace("plan", "")}-student-loan`}` });
  if (inputs.bonus > 0) steps.push({ title: "Understand bonus tax", href: "/tax-and-salary/bonus-tax" });
  steps.push({ title: "Scottish taxpayer?", href: "/tax-and-salary/scottish-tax" });
  steps.push({ title: "National Insurance detail", href: "/tax-and-salary/national-insurance" });
  return (
    <Card>
      <CardTitle>Next steps</CardTitle>
      <div className="space-y-1">
        {steps.slice(0, 4).map((s, i) => (
          <Link key={s.href} href={s.href} className="rk-tool flex items-center justify-between" style={{ padding: "10px 2px", borderBottom: i < 3 ? `1px solid ${C.line}` : "none", ["--cat-color" as string]: C.accent }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{s.title}</span>
            <span style={{ color: C.accent, fontWeight: 700 }}>→</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
