"use client";

import { useEffect, useReducer, useState } from "react";
import {
  computeTakeHome,
  nextThreshold,
  STUDENT_PLAN_ORDER,
  STUDENT_PLANS,
  takeHomeCurve,
  type StudentPlan,
  type TaxRegion,
} from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import s from "@/components/flagship/Flagship.module.css";

const COLORS = { keep: "#0f9f6e", pension: "#7c3aed", tax: "#f59e0b", ni: "#4353ff", loan: "#db2777" };

type State = { salary: number; bonus: number; pension: number; plan: StudentPlan; region: TaxRegion };
type Action = { [K in keyof State]: { key: K; value: State[K] } }[keyof State] | { key: "reset" };

const DEFAULTS: State = { salary: 35_000, bonus: 0, pension: 5, plan: "none", region: "ruk" };

function reducer(st: State, a: Action): State {
  if (a.key === "reset") return DEFAULTS;
  return { ...st, [a.key]: a.value } as State;
}

/** Salary points for the "take-home across salaries" chart: £0 → a sensible ceiling. */
function chartRange(salary: number) {
  const top = Math.max(100_000, Math.ceil((salary * 2) / 10_000) * 10_000);
  return { top, steps: 40 };
}

export default function SalaryStudio({
  showResults,
  ...initial
}: Partial<State> & {
  /** Open with results showing, e.g. when arriving from a shared link. */
  showResults: boolean;
}) {
  const [st, set] = useReducer(reducer, { ...DEFAULTS, ...initial });
  const [ready, setReady] = useState(showResults);
  const [copied, setCopied] = useState(false);

  const inputs = { gross: st.salary, bonus: st.bonus, pensionPct: st.pension, plan: st.plan, region: st.region };
  const snap = computeTakeHome(inputs);
  const scot = st.region === "scotland";
  const pensionAmt = snap.pensionContribution;
  const loan = snap.studentLoan;
  const keepPence = Math.round(snap.keepRate * 100);
  const next = nextThreshold(snap.adjustedGross);
  const inTrap = snap.adjustedGross > 100_000 && snap.adjustedGross < 125_140;

  // What a pay rise is really worth.
  const rises = [1_000, 5_000, 10_000].map((r) => {
    const after = computeTakeHome({ ...inputs, gross: st.salary + r });
    return { r, extra: after.takeHome - snap.takeHome };
  });
  const maxRise = Math.max(...rises.map((x) => x.extra), 1);

  // Pension nudge: cost to take-home of putting 5% more into a pension.
  const pensionNudge = (() => {
    const more = computeTakeHome({ ...inputs, pensionPct: Math.min(60, st.pension + 5) });
    return { pension: more.pensionContribution - pensionAmt, cost: snap.takeHome - more.takeHome };
  })();

  const { top, steps } = chartRange(st.salary);
  const curve = takeHomeCurve({ gross: 0, bonus: 0, pensionPct: st.pension, plan: st.plan, region: st.region }, 0, top, steps);
  const grossAt = (i: number) => curve[i]?.gross ?? 0;
  const nearest = Math.round((Math.min(st.salary, top) / top) * steps);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      const q = new URLSearchParams({ salary: String(st.salary) });
      if (st.bonus) q.set("bonus", String(st.bonus));
      if (st.pension !== DEFAULTS.pension) q.set("pension", String(st.pension));
      if (st.plan !== "none") q.set("loan", st.plan);
      if (scot) q.set("region", "scotland");
      window.history.replaceState(null, "", `${window.location.pathname}?${q}`);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, st, scot]);

  const reset = () => {
    set({ key: "reset" });
    setReady(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the URL is still in the address bar */
    }
  };

  const per = (n: number) => [gbp(n, true), gbp(n / 12, true), gbp(n / 52, true)];

  return (
    <Studio
      title="Your pay"
      ready={ready}
      onCalculate={() => setReady(true)}
      calculateLabel="Calculate my take-home pay"
      onReset={reset}
      dock={{ label: "Take-home a month", value: gbp(snap.perPeriod.monthly, true) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField
              label="Yearly salary (before tax)"
              value={st.salary}
              onChange={(v) => set({ key: "salary", value: v })}
              max={10_000_000}
              big
              slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }}
            />
            <MoneyField
              label="Bonus this year"
              value={st.bonus}
              onChange={(v) => set({ key: "bonus", value: v })}
              max={10_000_000}
              hint="Optional. Taxed as part of your pay for the year."
            />
            <Segmented
              label="Where you live"
              value={st.region}
              onChange={(v) => set({ key: "region", value: v })}
              options={[
                { value: "ruk", label: "England, Wales & NI" },
                { value: "scotland", label: "Scotland", note: "Scotland has six Income Tax bands. National Insurance is the same UK-wide." },
              ]}
            />
          </InputGroup>

          <InputGroup title="Deductions">
            <StepperField
              label="Pension contribution"
              value={st.pension}
              onChange={(v) => set({ key: "pension", value: Math.round(v) })}
              step={1}
              min={0}
              max={60}
              unit="%"
              dp={0}
              aside={`${gbp(pensionAmt)} a year`}
              hint="Paid by salary sacrifice, so before tax and National Insurance. Auto-enrolment is usually at least 5%."
            />
            <SelectField
              label="Student loan"
              value={st.plan}
              onChange={(v) => set({ key: "plan", value: v })}
              options={STUDENT_PLAN_ORDER.map((id) => {
                const p = STUDENT_PLANS[id];
                return { value: id, label: id === "none" ? p.label : `${p.label}: ${Math.round(p.rate * 100)}% over ${gbp(p.threshold)}` };
              })}
              hint="Not sure? Plan 2 for English and Welsh courses started 2012 to 2023, Plan 5 from 2023."
            />
          </InputGroup>
        </>
      }
    >
      {/* 1. The answer */}
      <Answer
        eyebrow="Your take-home pay"
        value={gbp(snap.perPeriod.monthly, true)}
        unit="a month"
        actions={
          <button type="button" className={s.ghostBtn} onClick={share}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
            </svg>
            {copied ? "Link copied" : "Share"}
          </button>
        }
        sentence={
          snap.totalGross <= 0 ? (
            <>Enter your salary to see what you take home.</>
          ) : (
            <>
              On <b>{gbp(snap.totalGross)}</b>
              {st.bonus > 0 ? " including your bonus" : ""}, you take home <b>{gbp(snap.takeHome)}</b> a year. <b>{gbp(snap.incomeTaxTotal)}</b> goes in
              Income Tax and <b>{gbp(snap.ni.total)}</b> in National Insurance
              {loan > 0 && (
                <>
                  , with <b>{gbp(loan)}</b> to your student loan
                </>
              )}
              {pensionAmt > 0 && (
                <>
                  . <b>{gbp(pensionAmt)}</b> goes into your pension
                </>
              )}
              .
            </>
          )
        }
        badges={[
          `You keep ${percent(snap.keepRate, 1)}`,
          `${Math.round(snap.marginalRate * 100)}p of your next £1 is deducted`,
          scot ? "Scottish tax rates" : "England, Wales & NI rates",
        ]}
      />

      {/* 2. Pay per period */}
      <Facts
        items={[
          { label: "A year", value: gbp(snap.takeHome) },
          { label: "A month", value: gbp(snap.perPeriod.monthly) },
          { label: "A week", value: gbp(snap.perPeriod.weekly) },
          { label: "A working day", value: gbp(snap.perPeriod.daily), note: "Based on 260 days" },
        ]}
      />

      {/* 3. Payslip */}
      <ResultCard title="Your payslip" sub="How your pay is worked out, from gross pay down to what reaches your bank.">
        <Statement
          columns={["Year", "Month", "Week"]}
          rows={[
            { label: st.bonus > 0 ? "Salary and bonus" : "Gross pay", values: per(snap.totalGross) },
            ...(pensionAmt > 0 ? [{ label: "Pension", values: per(-pensionAmt), kind: "deduction" as const, swatch: COLORS.pension }] : []),
            { label: scot ? "Income Tax (Scottish)" : "Income Tax", values: per(-snap.incomeTaxTotal), kind: "deduction" as const, swatch: COLORS.tax },
            { label: "National Insurance", values: per(-snap.ni.total), kind: "deduction" as const, swatch: COLORS.ni },
            ...(loan > 0 ? [{ label: `Student loan (${STUDENT_PLANS[st.plan].short})`, values: per(-loan), kind: "deduction" as const, swatch: COLORS.loan }] : []),
            { label: "Take-home pay", values: per(snap.takeHome), kind: "total" as const, swatch: COLORS.keep },
          ]}
        />
      </ResultCard>

      {/* 4. Where every pound goes */}
      {snap.totalGross > 0 && (
        <ResultCard title="Where your pay goes" sub="Everything you earn this year, split by where it ends up.">
          <SplitBar
            segments={[
              { label: "You keep", value: snap.takeHome, display: gbp(snap.takeHome), color: COLORS.keep },
              ...(pensionAmt > 0 ? [{ label: "Your pension", value: pensionAmt, display: gbp(pensionAmt), color: COLORS.pension }] : []),
              { label: "Income Tax", value: snap.incomeTaxTotal, display: gbp(snap.incomeTaxTotal), color: COLORS.tax },
              { label: "National Insurance", value: snap.ni.total, display: gbp(snap.ni.total), color: COLORS.ni },
              ...(loan > 0 ? [{ label: "Student loan", value: loan, display: gbp(loan), color: COLORS.loan }] : []),
            ]}
            caption={
              <>
                Out of every <b>£1</b> you earn, you keep <b>{keepPence}p</b>
                {pensionAmt > 0 && (
                  <>
                    {" "}
                    and <b>{Math.round((pensionAmt / snap.totalGross) * 100)}p</b> goes into your pension
                  </>
                )}
                .
              </>
            }
          />
        </ResultCard>
      )}

      {/* 5. Income Tax by band */}
      {snap.totalGross > 0 && (
        <ResultCard
          title="Your Income Tax, band by band"
          sub={
            snap.adjustedGross > 100_000
              ? "Above £100,000 your tax-free allowance shrinks by £1 for every £2 you earn."
              : "Each slice of your pay is taxed at its own rate. Only the part above each threshold pays the higher rate."
          }
        >
          <Compare
            head={["Band", "Tax on that slice"]}
            rows={snap.taxBands.map((b) => ({
              label: (
                <>
                  {b.label} <span style={{ color: "var(--muted)" }}>· {percent(b.rate)}</span>
                </>
              ),
              value: gbp(b.tax),
              delta: `on ${gbp(b.income)}`,
              bar: snap.adjustedGross > 0 ? b.income / snap.adjustedGross : 0,
            }))}
          />
        </ResultCard>
      )}

      {/* 6. Pay rises */}
      {snap.totalGross > 0 && (
        <ResultCard title="What a pay rise is really worth" sub="How much more reaches your bank after tax, National Insurance, pension and student loan.">
          <Compare
            head={["Pay rise", "Extra take-home a year"]}
            rows={rises.map((x) => ({
              label: `+${gbp(x.r)} a year`,
              value: gbp(x.extra),
              delta: `${gbp(x.extra / 12)} a month`,
              deltaTone: "down",
              bar: x.extra / maxRise,
            }))}
          />
        </ResultCard>
      )}

      {/* 7. Tips */}
      {snap.totalGross > 0 && (
        <ResultCard title="Worth knowing" sub="Things that could change what you keep.">
          {inTrap && (
            <Callout tone="warn" title="You're in the £100k tax trap">
              Between £100,000 and £125,140 you lose £1 of tax-free allowance for every £2 you earn. Right now each extra £1 you earn loses about{" "}
              <b>{Math.round(snap.marginalRate * 100)}p</b> to {loan > 0 ? "tax, National Insurance and student loan" : "tax and National Insurance"}. Paying more into your pension is
              the usual way out.
            </Callout>
          )}
          {pensionNudge.pension > 0 && (
            <Callout title={`${gbp(pensionNudge.pension)} more in your pension costs you just ${gbp(pensionNudge.cost)}`}>
              Raising your pension by 5% of pay adds <b>{gbp(pensionNudge.pension)}</b> a year to your pot but only lowers your take-home by{" "}
              <b>{gbp(pensionNudge.cost)}</b> ({gbp(pensionNudge.cost / 12)} a month), because it comes off before tax.
            </Callout>
          )}
          {!scot && next && next.away <= 15_000 && (
            <Callout title={`You're ${gbp(next.away)} below ${next.label}`}>
              Pay above <b>{gbp(next.at)}</b> is taxed more heavily. Salary sacrifice can keep more of a pay rise below the line.
            </Callout>
          )}
          {loan > 0 && (
            <Callout title={`Your student loan takes ${gbp(loan / 12)} a month`}>
              You repay {Math.round(STUDENT_PLANS[st.plan].rate * 100)}% of earnings over {gbp(STUDENT_PLANS[st.plan].threshold)}. It stops when the loan
              is cleared or written off, and doesn&apos;t affect your credit score.
            </Callout>
          )}
          {!inTrap && pensionNudge.pension <= 0 && !(!scot && next && next.away <= 15_000) && loan <= 0 && (
            <Callout tone="good" title="Nothing unusual about your pay">
              You&apos;re on standard rates with no traps nearby.
            </Callout>
          )}
        </ResultCard>
      )}

      {/* 8. Across salaries */}
      <ResultCard title="Take-home across salaries" sub="How take-home grows as pay rises. The dashed line is pay before any deductions.">
        <AreaChart
          ariaLabel="Take-home pay by salary"
          series={[
            { key: "gross", label: "Gross pay", color: "#9aa0bf", values: curve.map((c) => c.gross), dashed: true },
            { key: "net", label: "Take-home", color: COLORS.keep, values: curve.map((c) => c.takeHome), fill: true },
          ]}
          xLabel={(i) => gbpShort(grossAt(i))}
          yFormat={gbpShort}
          initial={nearest}
          readout={(i) => {
            const c = curve[i];
            if (!c || c.gross <= 0) return <>Drag along the chart to compare salaries.</>;
            return (
              <>
                On <b>{gbp(c.gross)}</b> you&apos;d take home <b>{gbp(c.takeHome)}</b> a year (<b>{gbp(c.takeHome / 12)}</b> a month), keeping{" "}
                <b>{percent(c.keepRate)}</b>.
              </>
            );
          }}
          hint="Drag across the chart, or use the arrow keys, to compare salaries."
        />
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Estimates for the 2025/26 tax year on a standard {scot ? "S1257L" : "1257L"} tax code, paid in 12 equal monthly amounts. Your payslip may differ slightly.
      </p>
    </Studio>
  );
}
