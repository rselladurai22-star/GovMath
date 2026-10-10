"use client";

import { amortize } from "@/lib/us/loans";
import { graduatedPlan, rapPlan, rapRate, tieredStandardYears } from "@/lib/us/student-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Plan = "standard" | "tiered" | "extended" | "graduated" | "extgrad" | "rap";
const PLANS: Plan[] = ["standard", "tiered", "extended", "graduated", "extgrad", "rap"];
const OLD_PLANS: Plan[] = ["standard", "graduated", "extended", "extgrad", "rap"];
const NEW_PLANS: Plan[] = ["tiered", "rap"];

const SCHEMA = {
  kind: oneOf<"federal" | "private">("federal", ["federal", "private"]),
  balance: num(30_000, 0, 2_000_000),
  rate: num(6.52, 0, 20),
  plan: oneOf<Plan>("standard", PLANS),
  years: num(10, 1, 30),
  extra: num(0, 0, 100_000),
  newLoan: bool(false),
  agi: num(50_000, 0, 10_000_000),
  deps: num(0, 0, 10),
  agiGrowth: num(3, 0, 10),
  step: num(8, 0, 20),
};
const ADVANCED = ["newLoan", "agi", "deps", "agiGrowth", "step"] as const;

type Result = {
  plan: Plan;
  label: string;
  first: number;
  last: number;
  months: number;
  totalPaid: number;
  interest: number;
  forgiven: number;
  /** Balance at the end of each year, starting with year 0. */
  yearly: number[];
  note?: string;
};

function yearlyFrom(start: number, balances: number[]): number[] {
  const out = [start];
  for (let m = 12; m <= balances.length; m += 12) out.push(balances[m - 1]);
  if (balances.length % 12 !== 0) out.push(balances[balances.length - 1] ?? 0);
  return out;
}

export default function StudentLoanStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const federal = v.kind === "federal";
  const allowed = v.newLoan ? NEW_PLANS : OLD_PLANS;
  const plan: Plan = federal ? (allowed.includes(v.plan) ? v.plan : allowed[0]) : "standard";
  const tierYears = tieredStandardYears(v.balance);

  const fixed = (p: Plan, label: string, months: number, extra: number): Result => {
    const s = amortize(v.balance, v.rate, months, extra);
    const rows = s.rows.map((r) => r.balance);
    return { plan: p, label, first: s.payment, last: s.payment, months: s.months, totalPaid: s.totalPaid, interest: s.totalInterest, forgiven: 0, yearly: yearlyFrom(v.balance, rows) };
  };
  const graduated = (p: Plan, label: string, months: number, extra: number): Result => {
    const g = graduatedPlan(v.balance, v.rate, months, v.step, 24, extra);
    return {
      plan: p,
      label,
      first: g.first,
      last: g.last,
      months: g.months,
      totalPaid: g.totalPaid,
      interest: g.totalInterest,
      forgiven: 0,
      yearly: yearlyFrom(v.balance, g.rows.map((r) => r.balance)),
      note: g.belowInterest ? "The first payments are below the interest charged, so the balance grows at first. The federal plans set payments at least equal to the interest." : undefined,
    };
  };
  const rap = (extra: number): Result => {
    const r = rapPlan(v.balance, v.rate, v.agi, v.deps, v.agiGrowth, extra);
    const principalByYou = v.balance - r.forgiven - r.matched;
    return {
      plan: "rap",
      label: "Repayment Assistance Plan (RAP)",
      first: r.firstPayment,
      last: r.years[r.years.length - 1]?.payment ?? r.firstPayment,
      months: r.months,
      totalPaid: r.totalPaid,
      interest: Math.max(0, r.totalPaid - principalByYou),
      forgiven: r.forgiven,
      yearly: r.years.map((y) => y.balance),
      note: r.waivedInterest > 0 || r.matched > 0 ? `Unpaid interest not charged: ${usd(r.waivedInterest)}. Principal matched by the government: ${usd(r.matched)}.` : undefined,
    };
  };
  const build = (p: Plan, extra: number): Result => {
    if (p === "tiered") return fixed(p, `Standard plan (${tierYears} years, new loans)`, tierYears * 12, extra);
    if (p === "extended") return fixed(p, "Extended fixed (25 years)", 300, extra);
    if (p === "graduated") return graduated(p, "Graduated (10 years)", 120, extra);
    if (p === "extgrad") return graduated(p, "Extended graduated (25 years)", 300, extra);
    if (p === "rap") return rap(extra);
    return federal ? fixed(p, "Standard (10 years)", 120, extra) : fixed(p, `Private loan (${v.years} years)`, Math.round(v.years * 12), extra);
  };

  const r = build(plan, v.extra);
  const noExtra = v.extra > 0 ? build(plan, 0) : r;
  const savedInterest = noExtra.interest - r.interest;
  const savedMonths = noExtra.months - r.months;
  const all = federal ? allowed.map((p) => build(p, v.extra)) : [12 * 5, 12 * 10, 12 * 15, 12 * 20].map((m) => ({ ...fixed("standard", `${m / 12} years`, m, v.extra) }));
  const maxCost = Math.max(1, ...all.map((x) => x.totalPaid));
  const base = federal ? build(v.newLoan ? "tiered" : "standard", 0) : noExtra;
  const n = Math.max(r.yearly.length, base.yearly.length);

  return (
    <Studio
      title="Your student loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my payments"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(r.first, true) }}
      inputs={
        <>
          <InputGroup title="Your loan">
            <Segmented
              label="Type of loan"
              value={v.kind}
              onChange={st.bind("kind")}
              options={[
                { value: "federal", label: "Federal", note: "Direct Loans from the Department of Education. They have fixed rates and income-driven plans." },
                { value: "private", label: "Private", note: "From a bank, credit union or online lender, including refinanced loans." },
              ]}
            />
            <MoneyField symbol="$" label="Loan balance" value={v.balance} onChange={st.bind("balance")} slider={{ min: 1_000, max: 200_000, step: 500, ends: ["$1k", "$200k"] }} />
            <StepperField
              label="Interest rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.01}
              min={0}
              max={18}
              unit="%"
              dp={3}
              info="Federal loans made from July 1, 2026 to June 30, 2027: 6.52% for undergraduates, 8.07% for graduate students, 9.07% for PLUS loans. For several loans, use a weighted average."
            />
            {federal ? (
              <SelectField
                label="Repayment plan"
                value={plan}
                onChange={st.bind("plan")}
                options={allowed.map((p) => ({
                  value: p,
                  label:
                    p === "standard"
                      ? "Standard (10 years)"
                      : p === "tiered"
                        ? `Standard for new loans (${tierYears} years)`
                        : p === "extended"
                          ? "Extended fixed (25 years)"
                          : p === "graduated"
                            ? "Graduated (10 years)"
                            : p === "extgrad"
                              ? "Extended graduated (25 years)"
                              : "Repayment Assistance Plan (RAP)",
                }))}
                info="Loans first made on or after July 1, 2026 can use only the new standard plan or RAP. Turn that on under More options."
              />
            ) : (
              <StepperField label="Loan term" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={25} unit="years" dp={0} />
            )}
            <MoneyField symbol="$" label="Extra payment each month" value={v.extra} onChange={st.bind("extra")} info="Paid on top of the required payment and used to reduce the balance." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="My loans were first made on or after July 1, 2026" checked={v.newLoan} onChange={st.bind("newLoan")} optional info="New federal loans have two plans: a standard plan of 10 to 25 years set by the amount you owe, and RAP." />
            <MoneyField symbol="$" label="Adjusted gross income (for RAP)" value={v.agi} onChange={st.bind("agi")} optional info="From your federal tax return. If you are married and file jointly, use your joint AGI." />
            <StepperField label="Dependents (for RAP)" value={v.deps} onChange={(n) => st.set("deps", Math.round(n))} step={1} min={0} max={10} unit="dependents" dp={0} optional />
            <StepperField label="Income growth a year (for RAP)" value={v.agiGrowth} onChange={st.bind("agiGrowth")} step={0.5} min={0} max={10} unit="%" dp={1} optional />
            <StepperField label="Graduated plan: rise every 2 years" value={v.step} onChange={st.bind("step")} step={1} min={0} max={20} unit="%" dp={0} optional info="Your servicer sets the real steps. We assume equal rises every two years." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.first !== r.last && plan !== "rap" ? "First monthly payment" : "Monthly payment"}
        value={usd(r.first + v.extra, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            On the <b>{r.label}</b>, you {r.forgiven > 0 ? "pay for" : "repay the loan in"} <b>{duration(r.months)}</b>, paying <b>{usd(r.totalPaid)}</b>{" "}in all, of which{" "}
            <b>{usd(r.interest)}</b>{" "}is interest.
            {r.forgiven > 0 ? <> The remaining <b>{usd(r.forgiven)}</b>{" "}is forgiven after 30 years.</> : null}
            {v.extra > 0 && savedInterest > 0 ? (
              <>
                {" "}
                Paying {usd(v.extra)} extra a month saves {usd(savedInterest)} and {duration(savedMonths)}.
              </>
            ) : null}
          </>
        }
        badges={[
          v.extra > 0 ? `${usd(r.first, true)} required + ${usd(v.extra)} extra` : `${percent(v.rate / 100, 2)} interest`,
          r.first !== r.last ? `Rises to ${usd(r.last, true)}` : `${duration(r.months)}`,
          ...(plan === "rap" ? [`${v.agi <= 10_000 ? "$10 minimum" : `${percent(rapRate(v.agi))} of AGI`}`] : []),
        ]}
      />

      <Facts
        items={[
          { label: plan === "rap" || r.first !== r.last ? "First payment" : "Monthly payment", value: usd(r.first, true) },
          { label: "Time to repay", value: duration(r.months) },
          { label: "Total interest", value: usd(r.interest), tone: "warn" },
          { label: "Total paid", value: usd(r.totalPaid) },
          ...(r.forgiven > 0 ? [{ label: "Forgiven after 30 years", value: usd(r.forgiven), tone: "good" as const }] : []),
        ]}
      />

      <Assumptions
        items={[
          { label: "Interest", value: `${v.rate}% fixed, charged monthly on the balance` },
          { label: "Start", value: "Repayment starts now; no grace period, deferment or forbearance" },
          ...(plan === "rap"
            ? [
                { label: "RAP payment", value: `${v.agi <= 10_000 ? "$10 a month" : `${percent(rapRate(v.agi))} of AGI ÷ 12`}, less $50 per dependent, at least $10` },
                { label: "Income", value: `${usd(v.agi)} AGI, rising ${v.agiGrowth}% a year` },
              ]
            : []),
          ...(plan === "graduated" || plan === "extgrad" ? [{ label: "Graduated steps", value: `Payments rise ${v.step}% every two years` }] : []),
          { label: "Tax", value: "Forgiveness and the student loan interest deduction are not included" },
        ]}
      />

      <ResultCard title="Where your payments go" sub={r.label}>
        <SplitBar
          segments={[
            { label: "Principal", value: Math.max(0, r.totalPaid - r.interest), display: usd(Math.max(0, r.totalPaid - r.interest)), color: "#0f9f6e" },
            { label: "Interest", value: r.interest, display: usd(r.interest), color: "#f59e0b" },
            ...(r.forgiven > 0 ? [{ label: "Forgiven", value: r.forgiven, display: usd(r.forgiven), color: "#5b1e6e" }] : []),
          ]}
        />
        {r.note && <p className="footnote">{r.note}</p>}
      </ResultCard>

      <ResultCard title={federal ? "Compare repayment plans" : "Compare loan terms"} sub={federal ? (v.newLoan ? "Plans for loans made from July 1, 2026." : "Plans for loans made before July 1, 2026.") : "Same balance and rate."}>
        <Compare
          head={[federal ? "Plan" : "Term", "Total paid"]}
          rows={all.map((x) => ({
            label: `${x.label} · ${usd(x.first, true)}${x.first !== x.last ? ` to ${usd(x.last, true)}` : ""} a month · ${duration(x.months)}`,
            value: usd(x.totalPaid),
            delta: x.forgiven > 0 ? `${usd(x.forgiven)} forgiven` : `${usd(x.interest)} interest`,
            bar: x.totalPaid / maxCost,
            current: federal ? x.plan === plan : x.months === r.months,
          }))}
        />
      </ResultCard>

      <ResultCard title="Your balance over time" sub={`${r.label} against ${base.label.toLowerCase()} with no extra payments.`}>
        <AreaChart
          ariaLabel="Loan balance by year"
          series={[
            { key: "you", label: r.label, color: "#0f9f6e", values: r.yearly, fill: true },
            ...(base.label !== r.label || v.extra > 0 ? [{ key: "base", label: base.label, color: "#94a3b8", values: base.yearly, dashed: true }] : []),
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, n - 1)}
          readout={(i) => (
            <>
              After year <b>{i}</b>: <b>{usd(r.yearly[i] ?? 0)}</b>{" "}left on your plan, <b>{usd(base.yearly[i] ?? 0)}</b>{" "}on the {base.label.toLowerCase()}.
            </>
          )}
        />
        <DataTable summary="Year-by-year balance" columns={["Year", "Balance left"]} rows={r.yearly.map((b, i) => [`Year ${i}`, usd(b)])} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you choose a plan.">
        {federal && (
          <Callout title="Federal rules changed on July 1, 2026">
            New loans can use only the new standard plan or RAP. SAVE has ended, and PAYE and ICR end by July 1, 2028. Income-Based Repayment stays open for older
            loans. Check your options on studentaid.gov or with your servicer.
          </Callout>
        )}
        {!federal && (
          <Callout tone="warn" title="Refinancing federal loans into a private loan is permanent">
            A private loan has no income-driven plan, no RAP, no Public Service Loan Forgiveness and fewer hardship options. Only refinance federal loans if you are sure you will not need them.
          </Callout>
        )}
        {r.first < (v.balance * v.rate) / 100 / 12 && plan !== "rap" && (
          <Callout tone="warn" title="Payments start below the interest">
            Early payments do not cover the interest, so the balance grows before it falls. Paying a little extra at the start avoids this.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Your servicer calculates your actual payment. RAP figures follow the published formula and may change with new rules.
      </p>
    </Studio>
  );
}
