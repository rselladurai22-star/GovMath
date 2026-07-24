"use client";

import { useMemo, useReducer, useState } from "react";
import Link from "next/link";
import {
  affordabilityEstimate,
  computeMortgage,
  formatMonths,
  MORTGAGE_COLORS,
  nextLtvBand,
  paymentAtRateShift,
  type MortgageInputs,
  type MortgageSnapshot,
  type MortgageType,
} from "@/lib/property/mortgage-engine";
import {
  C, PALETTE, money, pct, useAnimatedNumber,
  Card, CardTitle, Label, Explain, Segmented, Slider, TrackSlider, MoneyField,
  Stat, Donut, Legend, InsightTile, type InsightTone,
} from "@/components/decision/kit";

const MSEG = { capital: PALETTE.green, interest: PALETTE.coral };
const ltvColor = (ltv: number) => (ltv > 0.9 ? PALETTE.coral : ltv > 0.75 ? PALETTE.amber : C.accent);

/* ── state ──────────────────────────────────────────────────────── */
type State = MortgageInputs;
type Action =
  | { type: "price"; value: number } | { type: "deposit"; value: number } | { type: "rate"; value: number }
  | { type: "term"; value: number } | { type: "mode"; value: MortgageType } | { type: "overpayment"; value: number }
  | { type: "reset" };
const INITIAL: State = { price: 300000, deposit: 30000, ratePct: 4.5, termYears: 25, type: "repayment", overpayment: 0 };
function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "price": return { ...s, price: Math.max(0, a.value), deposit: Math.min(s.deposit, Math.max(0, a.value)) };
    case "deposit": return { ...s, deposit: Math.min(s.price, Math.max(0, a.value)) };
    case "rate": return { ...s, ratePct: Math.max(0, a.value) };
    case "term": return { ...s, termYears: Math.min(40, Math.max(1, a.value)) };
    case "mode": return { ...s, type: a.value };
    case "overpayment": return { ...s, overpayment: Math.max(0, a.value) };
    case "reset": return INITIAL;
  }
}

/* ════════════════════════════════════════════════════════════════ */
export default function MortgageEngine(props: Partial<MortgageInputs>) {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL, ...props });
  const snap = useMemo(() => computeMortgage(state), [state]);
  return (
    <div className="rk" style={{ color: C.body }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 22, paddingBottom: 30 }}>
        <div className="grid gap-4 lg:grid-cols-[336px_minmax(0,1fr)] items-start">
          <InputsCard state={state} dispatch={dispatch} snap={snap} />
          <div className="grid gap-4">
            <ResultCard snap={snap} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Total interest" value={money(snap.totalInterest)} sub={`${pct(snap.interestShare, 0)} of what you repay`} color={PALETTE.coral} />
              <Stat label={snap.inputs.type === "interest-only" ? "Owed at end" : "Paid off in"} value={snap.inputs.type === "interest-only" ? money(snap.balloon) : formatMonths(snap.payoffMonths)} sub={snap.inputs.type === "interest-only" ? "capital still due" : "with your plan"} />
              <Stat label="Loan-to-value" value={pct(snap.ltv, 0)} sub={`borrowing ${money(snap.loan)}`} color={ltvColor(snap.ltv)} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3" style={{ marginTop: 16 }}>
          <div className="lg:col-span-2"><BalanceCard state={state} snap={snap} /></div>
          <RateStressCard state={state} snap={snap} />
          <ScenariosCard state={state} snap={snap} />
          <div className="lg:col-span-2"><AffordabilityCard /></div>
          <NextStepsCard snap={snap} />
          <div className="lg:col-span-3"><InsightsCard snap={snap} /></div>
        </div>
      </div>
    </div>
  );
}

/* ── inputs ─────────────────────────────────────────────────────── */
function InputsCard({ state, dispatch, snap }: { state: State; dispatch: React.Dispatch<Action>; snap: MortgageSnapshot }) {
  const [advanced, setAdvanced] = useState(() => state.type !== "repayment" || state.overpayment > 0);
  const depositPct = state.price > 0 ? state.deposit / state.price : 0;
  return (
    <Card className="lg:sticky lg:top-[74px]" pad={0}>
      <div className="flex items-center justify-between" style={{ padding: "16px 18px 12px" }}>
        <h2 style={{ fontSize: 18.5, fontWeight: 700, color: C.ink, margin: 0 }}>Your mortgage</h2>
        <button type="button" onClick={() => dispatch({ type: "reset" })} style={{ fontSize: 14, fontWeight: 600, color: C.body, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 13px", background: "#fff" }}>Reset</button>
      </div>
      <div style={{ padding: "4px 18px 18px" }} className="space-y-5">
        <div>
          <Label>Property price</Label>
          <MoneyField big value={state.price} onChange={(v) => dispatch({ type: "price", value: v })} />
          <TrackSlider value={state.price} onChange={(v) => dispatch({ type: "price", value: v })} max={1000000} step={5000} minLabel="£0" maxLabel="£1m" />
        </div>

        <div>
          <Label>Deposit</Label>
          <MoneyField value={state.deposit} onChange={(v) => dispatch({ type: "deposit", value: v })} />
          <TrackSlider value={state.deposit} onChange={(v) => dispatch({ type: "deposit", value: v })} max={Math.max(1, state.price)} step={5000} minLabel="£0" maxLabel={money(state.price)} />
          <Explain>{pct(depositPct, 0)} down — you&rsquo;d borrow <strong style={{ color: C.body }}>{money(snap.loan)}</strong> at <strong style={{ color: ltvColor(snap.ltv) }}>{pct(snap.ltv, 0)} LTV</strong>. Lower LTV unlocks better rates.</Explain>
        </div>

        <Slider label="Interest rate" value={state.ratePct} min={0} max={10} step={0.1} onChange={(v) => dispatch({ type: "rate", value: v })} format={(v) => `${v.toFixed(1)}%`}
          hint="Most UK deals fix for 2–5 years, then revert higher. Use your fixed rate here." />

        <Slider label="Term" value={state.termYears} min={5} max={40} step={1} onChange={(v) => dispatch({ type: "term", value: v })} format={(v) => `${v} yrs`}
          hint="A shorter term means higher monthly payments but far less total interest." />

        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 4 }}>
          <button type="button" onClick={() => setAdvanced((x) => !x)} aria-expanded={advanced} className="flex items-center justify-between w-full" style={{ padding: "9px 0", background: "none", border: 0, cursor: "pointer" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>Advanced options</span>
            <span className="flex items-center gap-2">
              <span style={{ fontSize: 13, color: C.mute }}>overpay · interest-only</span>
              <span style={{ display: "inline-block", transition: "transform .2s", transform: advanced ? "rotate(180deg)" : "none", color: C.mute, fontSize: 12 }}>▾</span>
            </span>
          </button>
          {advanced && (
            <div className="space-y-5" style={{ paddingTop: 8 }}>
              <div>
                <Label>Repayment type</Label>
                <Segmented value={state.type} onChange={(v) => dispatch({ type: "mode", value: v as MortgageType })} options={[{ value: "repayment", label: "Repayment" }, { value: "interest-only", label: "Interest-only" }]} />
                <Explain>Repayment clears the loan by the end. Interest-only keeps payments low but leaves the full loan owed.</Explain>
              </div>
              <Slider label="Monthly overpayment" value={state.overpayment} min={0} max={1000} step={25} onChange={(v) => dispatch({ type: "overpayment", value: v })} format={(v) => money(v)}
                hint={snap.overpayment.active ? `Clears the loan ${formatMonths(snap.overpayment.monthsSaved)} early and saves ${money(snap.overpayment.interestSaved)}.` : "Most lenders let you overpay 10% a year with no penalty."} />
            </div>
          )}
        </div>
      </div>
      {snap.ltv > 0.95 && (
        <div style={{ padding: "12px 18px", borderTop: `1px solid ${C.line}`, background: "#fdf2ef" }}>
          <p style={{ fontSize: 13.5, color: "#b8431f", margin: 0, lineHeight: 1.5, fontWeight: 600 }}>LTV is above 95% — most lenders will need a bigger deposit.</p>
        </div>
      )}
      <div style={{ padding: "11px 18px", borderTop: `1px solid ${C.line}`, background: C.tint, borderRadius: "0 0 16px 16px" }}>
        <p style={{ fontSize: 13, color: C.mute, margin: 0, lineHeight: 1.5 }}>UK repayment mortgage · 2025 · estimate · your lender&rsquo;s Key Facts Illustration is binding.</p>
      </div>
    </Card>
  );
}

/* ── result ─────────────────────────────────────────────────────── */
function ResultCard({ snap }: { snap: MortgageSnapshot }) {
  const animated = useAnimatedNumber(snap.monthlyPayment);
  const io = snap.inputs.type === "interest-only";
  const capital = snap.loan - snap.balloon;
  const donutSegs = [
    { label: "Capital (the loan)", value: capital, color: MSEG.capital },
    { label: "Interest", value: snap.totalInterest, color: MSEG.interest },
  ];
  const totalCost = snap.totalRepaid + snap.balloon;
  return (
    <Card pad={20}>
      <div className="flex items-center justify-between gap-3" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: C.mute }}>Your monthly payment{io ? " · interest-only" : ""}</div>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: C.mute }}>{snap.inputs.ratePct}% · {snap.inputs.termYears} yrs</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] items-center justify-items-center sm:justify-items-stretch">
        <Donut segments={donutSegs} centerTop="Total cost" centerValue={money(totalCost)} />
        <div style={{ minWidth: 0, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 46, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{money(animated)}</span>
            <span style={{ fontSize: 16.5, fontWeight: 500, color: C.mute }}>/ month</span>
          </div>
          <div style={{ fontSize: 15, color: C.body, marginTop: 6, marginBottom: 16 }}>{money(snap.loan)} over {snap.inputs.termYears} years{snap.overpayment.active ? ` · +${money(snap.inputs.overpayment)} overpay` : ""}</div>
          <Legend rows={[
            { label: "Capital (the loan)", value: money(capital), pct: pct(capital / (capital + snap.totalInterest), 0), color: MSEG.capital },
            { label: "Interest", value: money(snap.totalInterest), pct: pct(snap.interestShare, 0), color: MSEG.interest },
          ]} />
          {snap.overpayment.active && snap.overpayment.monthsSaved > 0 && (
            <div style={{ marginTop: 14, background: "#eef8f2", border: "1px solid #cdeadd", borderRadius: 10, padding: "11px 13px", fontSize: 14, color: "#0a6f43" }}>
              Overpaying clears it <strong>{formatMonths(snap.overpayment.monthsSaved)} early</strong> and saves <strong>{money(snap.overpayment.interestSaved)}</strong> in interest.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ── balance timeline ───────────────────────────────────────────── */
function BalanceCard({ state, snap }: { state: State; snap: MortgageSnapshot }) {
  const baseline = useMemo(() => computeMortgage({ ...state, overpayment: 0 }), [state]);
  const [hover, setHover] = useState<number | null>(null);
  const years = snap.inputs.termYears;
  const W = 820, H = 210, padL = 6, padR = 6, padT = 12, padB = 22;
  const loan = snap.loan || 1;
  const bars = snap.schedule;
  const barW = (W - padL - padR) / years;
  const x = (yr: number) => padL + (yr - 1) * barW;
  const y = (bal: number) => padT + (1 - bal / loan) * (H - padT - padB);
  const basePath = baseline.schedule.map((row, i) => `${i === 0 ? "M" : "L"}${(x(row.year) + barW / 2).toFixed(1)},${y(row.balance).toFixed(1)}`).join(" ");
  const active = hover != null ? bars[hover] : null;
  return (
    <Card>
      <CardTitle right={<span style={{ fontSize: 13, color: C.mute }}>hover any year</span>}>How your balance falls</CardTitle>
      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }} onMouseLeave={() => setHover(null)}>
          {bars.map((row, i) => {
            const bh = (H - padT - padB) - (y(row.balance) - padT);
            const color = row.interestDominant ? MORTGAGE_COLORS.interestDominant : MORTGAGE_COLORS.capitalDominant;
            return (
              <g key={row.year} onMouseEnter={() => setHover(i)}>
                <rect x={x(row.year) + barW * 0.12} y={y(row.balance)} width={barW * 0.76} height={Math.max(0, bh)} rx={2} fill={color} opacity={hover != null && hover !== i ? 0.5 : 1} style={{ transition: "opacity .15s" }} />
                <rect x={x(row.year)} y={padT} width={barW} height={H - padT - padB} fill="transparent" />
              </g>
            );
          })}
          {snap.overpayment.active && <path d={basePath} fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />}
          {active && <line x1={x(active.year) + barW / 2} y1={padT} x2={x(active.year) + barW / 2} y2={H - padB} stroke={C.ink} strokeWidth="1" opacity="0.3" />}
          {[1, Math.round(years / 2), years].map((yr) => <text key={yr} x={x(yr) + barW / 2} y={H - 7} textAnchor="middle" style={{ fontSize: 10, fontWeight: 600 }} fill={C.subtle}>Yr {yr}</text>)}
        </svg>
        {active && (
          <div style={{ position: "absolute", top: 2, left: `clamp(4px, ${((x(active.year) + barW / 2) / W) * 100}%, calc(100% - 180px))`, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "8px 11px", pointerEvents: "none", boxShadow: C.shadow }}>
            <div style={{ fontSize: 11, color: C.mute, fontWeight: 600 }}>End of year {active.year}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, fontVariantNumeric: "tabular-nums" }}>{money(active.balance)} left</div>
            <div style={{ fontSize: 11.5, color: C.mute, marginTop: 1 }}><span style={{ color: PALETTE.coral }}>{money(active.interest)} interest</span> · <span style={{ color: C.accent }}>{money(active.capital)} capital</span></div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5" style={{ marginTop: 10 }}>
        <LegendDot color={MORTGAGE_COLORS.interestDominant} label="Interest-heavy years" />
        <LegendDot color={MORTGAGE_COLORS.capitalDominant} label="Capital-heavy years" />
        {snap.overpayment.active && <LegendDot color={C.ink} label="Without overpayment" dashed />}
      </div>
    </Card>
  );
}
function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return <span className="inline-flex items-center gap-2" style={{ fontSize: 14, color: C.body }}><span style={{ width: 13, height: dashed ? 0 : 11, borderTop: dashed ? `2px dashed ${color}` : undefined, borderRadius: 3, background: dashed ? "transparent" : color }} />{label}</span>;
}

/* ── rate stress ────────────────────────────────────────────────── */
function RateStressCard({ state, snap }: { state: State; snap: MortgageSnapshot }) {
  const rows = [-1, 0, 1, 2].map((d) => ({ d, payment: paymentAtRateShift(state, d) }));
  const max = Math.max(...rows.map((r) => r.payment));
  return (
    <Card>
      <CardTitle>If rates move</CardTitle>
      <div className="space-y-2.5">
        {rows.map((r) => {
          const now = r.d === 0;
          return (
            <div key={r.d} className="flex items-center gap-2.5">
              <div style={{ width: 48, fontSize: 14, fontWeight: 700, color: now ? C.accent : C.body, fontVariantNumeric: "tabular-nums", flex: "none" }}>{(state.ratePct + r.d).toFixed(1)}%</div>
              <div style={{ flex: 1, height: 24, background: C.tint, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${(r.payment / max) * 100}%`, height: "100%", background: now ? C.accent : r.d < 0 ? MORTGAGE_COLORS.capitalDominant : MORTGAGE_COLORS.interestDominant, borderRadius: 6, transition: "width .4s" }} />
              </div>
              <div style={{ width: 72, textAlign: "right", fontSize: 14, fontWeight: 700, color: C.ink, fontVariantNumeric: "tabular-nums", flex: "none" }}>{money(r.payment)}</div>
            </div>
          );
        })}
      </div>
      <Explain>A <strong style={{ color: C.body }}>2% rise</strong> at renewal adds <strong style={{ color: PALETTE.coral }}>{money(paymentAtRateShift(state, 2) - snap.monthlyPayment)}</strong>/month. Lenders stress-test you against this.</Explain>
    </Card>
  );
}

/* ── scenarios ──────────────────────────────────────────────────── */
function ScenariosCard({ state, snap }: { state: State; snap: MortgageSnapshot }) {
  const scen: { id: string; label: string; inputs: State }[] = [
    { id: "over", label: `Overpay +£150/mo`, inputs: { ...state, overpayment: state.overpayment + 150 } },
    ...(state.termYears > 10 ? [{ id: "term", label: `Term ${state.termYears - 5} years`, inputs: { ...state, termYears: state.termYears - 5 } }] : []),
    { id: "rate", label: "Rate rises 1%", inputs: { ...state, ratePct: state.ratePct + 1 } },
  ].slice(0, 3);
  const rows = scen.map((s) => ({ ...s, snap: computeMortgage(s.inputs) }));
  return (
    <Card>
      <CardTitle>What if…</CardTitle>
      <div className="space-y-2.5">
        {rows.map((s) => {
          const d = s.snap.totalInterest - snap.totalInterest; const good = d < 0;
          return (
            <div key={s.id} className="flex items-center justify-between" style={{ padding: "9px 11px", borderRadius: 10, background: C.tint }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{s.label}</div>
                <div style={{ fontSize: 13.5, color: C.mute, fontVariantNumeric: "tabular-nums" }}>{money(s.snap.monthlyOutgoing)}/mo · {formatMonths(s.snap.payoffMonths)}</div>
              </div>
              <div style={{ fontSize: 15.5, fontWeight: 700, color: good ? C.accent : PALETTE.coral, fontVariantNumeric: "tabular-nums", flex: "none", textAlign: "right" }}>
                {good ? "−" : "+"}{money(Math.abs(d))}<div style={{ fontSize: 11.5, fontWeight: 500, color: C.subtle }}>interest</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── affordability ──────────────────────────────────────────────── */
function AffordabilityCard() {
  const [s1, setS1] = useState(35000);
  const [s2, setS2] = useState(0);
  const est = affordabilityEstimate(s1, s2);
  const cells = [{ m: "4×", v: est.low, hi: false }, { m: "4.5×", v: est.mid, hi: true }, { m: "5×", v: est.high, hi: false }];
  return (
    <Card>
      <CardTitle right={<span style={{ fontSize: 13, color: C.mute }}>income multiples</span>}>What could you borrow?</CardTitle>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-center">
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Your salary</Label><MoneyField value={s1} onChange={setS1} /></div>
          <div><Label>Second salary</Label><MoneyField value={s2} onChange={setS2} /></div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {cells.map((c) => (
            <div key={c.m} style={{ borderRadius: 12, padding: "15px 10px", textAlign: "center", background: c.hi ? C.accent : C.tint, color: c.hi ? "#fff" : C.ink }}>
              <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.75 }}>{c.m}</div>
              <div style={{ fontSize: 21, fontWeight: 800, marginTop: 3, fontVariantNumeric: "tabular-nums" }}>{money(c.v)}</div>
              {c.hi && <div style={{ fontSize: 11, marginTop: 1, color: "#d9f2e6" }}>typical cap</div>}
            </div>
          ))}
        </div>
      </div>
      <Explain>A multiple is only a ceiling — lenders&rsquo; affordability tests often lend less than 4.5×.</Explain>
    </Card>
  );
}

/* ── insights ───────────────────────────────────────────────────── */
function buildInsights(snap: MortgageSnapshot) {
  const list: { tone: InsightTone; title: string; body: string; figure?: string }[] = [];
  const nb = nextLtvBand(snap.ltv);
  if (nb) {
    const targetDeposit = snap.inputs.price * (1 - nb.band.max);
    const extra = targetDeposit - snap.inputs.deposit;
    if (extra > 0) list.push({ tone: "opportunity", title: `A ${money(extra)} bigger deposit unlocks better rates`, figure: nb.band.label, body: `You're at ${pct(snap.ltv, 0)} LTV. Reaching ${nb.band.label} (${nb.band.note.toLowerCase()}) needs about ${money(extra)} more deposit.` });
  }
  if (!snap.overpayment.active && snap.inputs.type === "repayment") {
    const t = computeMortgage({ ...snap.inputs, overpayment: 100 });
    list.push({ tone: "opportunity", title: "£100/month saves thousands", figure: money(t.overpayment.interestSaved), body: `Overpaying £100 a month clears your mortgage ${formatMonths(t.overpayment.monthsSaved)} early and saves ${money(t.overpayment.interestSaved)} in interest.` });
  }
  list.push({ tone: snap.interestShare > 0.4 ? "risk" : "info", title: "The true cost of borrowing", figure: money(snap.totalInterest), body: `Over ${snap.inputs.termYears} years you'll pay ${money(snap.totalInterest)} in interest — ${pct(snap.interestShare, 0)} of everything you repay. A shorter term is the biggest lever.` });
  const rise = paymentAtRateShift(snap.inputs, 2) - snap.monthlyPayment;
  list.push({ tone: "risk", title: "Budget for the reversion rate", figure: `+${money(rise)}`, body: `Most deals fix for 2–5 years then revert higher. A 2% rise pushes your payment up ${money(rise)}/month.` });
  if (snap.inputs.type === "interest-only") list.push({ tone: "risk", title: "You'll still owe the full loan", figure: money(snap.balloon), body: `Interest-only repays no capital — you need a plan to clear ${money(snap.balloon)} at the end of the term.` });
  return list.slice(0, 4);
}
function InsightsCard({ snap }: { snap: MortgageSnapshot }) {
  const items = useMemo(() => buildInsights(snap), [snap]);
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
function NextStepsCard({ snap }: { snap: MortgageSnapshot }) {
  const steps: { title: string; href: string }[] = [];
  if (snap.inputs.type === "repayment") steps.push({ title: "Model overpayments", href: "/property/mortgage-overpayment" });
  steps.push({ title: "What can you borrow?", href: "/property/mortgage-affordability" });
  steps.push({ title: "Budget the Stamp Duty", href: "/property/stamp-duty-england" });
  if (snap.ltv > 0.85) steps.push({ title: "First-time buyer?", href: "/property/first-time-buyer" });
  steps.push({ title: "Rent vs buy", href: "/property/rent-vs-buy" });
  return (
    <Card>
      <CardTitle>Next steps</CardTitle>
      <div className="space-y-1">
        {steps.slice(0, 4).map((s, i, arr) => (
          <Link key={s.href} href={s.href} className="rk-tool flex items-center justify-between" style={{ padding: "10px 2px", borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none", ["--cat-color" as string]: C.accent }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{s.title}</span>
            <span style={{ color: C.accent, fontWeight: 700 }}>→</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
