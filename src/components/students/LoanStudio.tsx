"use client";

import { interestRate, PLANS_2026, projectLoan, repayments2026, type Plan } from "@/lib/students/loans";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent, per } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  salary: num(35_000, 0, 10_000_000),
  balance: num(45_000, 0, 1_000_000),
  growth: num(3, -5, 15),
  rpi: num(3, 0, 15),
  yearsRepaying: num(0, 0, 40),
  extra: num(0, 0, 10_000),
  postgrad: bool(false),
};
const ADVANCED = ["growth", "rpi", "yearsRepaying", "extra", "postgrad"] as const;

// One schema per set of defaults, created once so its identity is stable between renders.
const SCHEMAS = new Map<string, typeof SCHEMA>();
function schemaFor(salary: number, balance: number): typeof SCHEMA {
  const key = `${salary}:${balance}`;
  let sc = SCHEMAS.get(key);
  if (!sc) {
    sc = { ...SCHEMA, salary: num(salary, 0, 10_000_000), balance: num(balance, 0, 1_000_000) };
    SCHEMAS.set(key, sc);
  }
  return sc;
}

export default function LoanStudio({ query, plan, defaults }: { query: Query; plan: Plan; defaults?: { salary?: number; balance?: number } }) {
  const st = useStudio(schemaFor(defaults?.salary ?? 35_000, defaults?.balance ?? 45_000), query);
  const v = st.values;
  const spec = PLANS_2026[plan];
  const plans: Plan[] = plan !== "postgrad" && v.postgrad ? [plan, "postgrad"] : [plan];
  const now = repayments2026({ salary: v.salary, plans });
  const own = now.lines.find((l) => l.plan === plan) ?? now.lines[0];
  const rate = interestRate(plan, v.salary);
  const proj = projectLoan({ plan, balance: v.balance, salary: v.salary, salaryGrowth: v.growth / 100, rpi: v.rpi / 100, yearsRepaying: v.yearsRepaying, extraMonthly: v.extra });
  const balances = [v.balance, ...proj.path.map((p) => p.balance)];
  const paid = proj.path.reduce<number[]>((acc, p) => [...acc, (acc[acc.length - 1] ?? 0) + p.repaid], [0]);
  const salaries = [25_000, 35_000, 45_000, 60_000, 80_000].map((sal) => ({ sal, r: repayments2026({ salary: sal, plans: [plan] }) }));
  const maxSal = Math.max(1, ...salaries.map((x) => x.r.monthly));
  const step = Math.max(1, Math.ceil(proj.path.length / 8));
  const rows = proj.path.filter((p) => p.year % step === 0 || p.year === proj.path.length);

  return (
    <Studio
      title={`Your ${spec.label}`}
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my repayments"
      onReset={st.reset}
      dock={{ label: "Repayment a month", value: gbp(now.monthly, true) }}
      inputs={
        <>
          <InputGroup title="You">
            <MoneyField label="Salary a year" value={v.salary} onChange={st.bind("salary")} hint="Before tax. Include other income if you file Self Assessment." />
            <MoneyField label="Loan balance" value={v.balance} onChange={st.bind("balance")} hint="From your Student Loans Company online account." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Pay rises a year" value={v.growth} onChange={st.bind("growth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional />
            <StepperField label="Inflation (RPI) in future years" value={v.rpi} onChange={st.bind("rpi")} step={0.25} min={0} max={15} unit="%" dp={2} optional hint="Sets interest and threshold rises after this year." />
            <StepperField label="Years since repayments became due" value={v.yearsRepaying} onChange={(n) => st.set("yearsRepaying", Math.round(n))} step={1} min={0} max={40} unit="years" dp={0} optional hint={`${spec.label} is written off ${spec.writeOffYears} ${per(spec.writeOffYears, "years")} after the April you were first due to repay.`} />
            <MoneyField label="Extra voluntary payment a month" value={v.extra} onChange={st.bind("extra")} optional />
            {plan !== "postgrad" && <Switch label="I also have a Postgraduate Loan" checked={v.postgrad} onChange={st.bind("postgrad")} optional hint="Repaid at 6% above £21,000, on top of this plan." />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You repay each month"
        value={gbp(now.monthly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {spec.label} takes <b>{percent(spec.rate, 0)}</b> of your income above <b>{gbp(spec.threshold)}</b>
            {own ? <>, so you repay {gbp(own.yearly)} a year</> : null}
            {plans.length > 1 ? <>, plus {gbp(now.lines[1]?.yearly ?? 0)} on your Postgraduate Loan</> : null}. Interest is <b>{percent(rate, 1)}</b> this year.{" "}
            {proj.clearedIn !== null ? (
              <>
                On these assumptions you clear the loan in <b>{proj.clearedIn} {per(proj.clearedIn, "years")}</b>, repaying {gbp(proj.totalRepaid)} in total.
              </>
            ) : (
              <>
                On these assumptions you repay {gbp(proj.totalRepaid)} before the rest, about <b>{gbp(proj.writtenOff)}</b>, is written off after {proj.yearsLeft} more years.
              </>
            )}
          </>
        }
        badges={[`Threshold ${gbp(spec.threshold)}`, `Interest ${percent(rate, 1)}`, proj.clearedIn !== null ? `Cleared in ${proj.clearedIn} ${per(proj.clearedIn, "years")}` : "Likely written off"]}
      />

      <Facts
        items={[
          { label: "A month now", value: gbp(now.monthly, true) },
          { label: "A year now", value: gbp(now.yearly) },
          { label: "Total repaid", value: gbp(proj.totalRepaid) },
          { label: proj.clearedIn !== null ? "Paid off after" : "Written off", value: proj.clearedIn !== null ? `${proj.clearedIn} ${per(proj.clearedIn, "years")}` : gbp(proj.writtenOff) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Plan", value: `${spec.label}: ${spec.who}` },
          { label: "This year", value: `2026/27 threshold, interest from September 2026` },
          { label: "Future", value: `Pay up ${v.growth}% and RPI ${v.rpi}% a year` },
          { label: "Not included", value: "Breaks in work, changes to the rules" },
        ]}
      />

      <ResultCard title="Your balance over time" sub="Before any write-off.">
        <AreaChart
          ariaLabel="Loan balance over time"
          series={[
            { key: "bal", label: "Balance", color: "#5b1e6e", values: balances, fill: true },
            { key: "paid", label: "Repaid so far", color: "#16a34a", values: paid, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={gbpShort}
          initial={balances.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) => (
            <>
              Year <b>{i}</b>: balance <b>{gbp(balances[i] ?? 0)}</b>, repaid <b>{gbp(paid[i] ?? 0)}</b>
            </>
          )}
        />
        <Statement columns={["Salary", "Repaid", "Balance"]} rows={rows.map((p) => ({ label: `Year ${p.year}`, values: [gbp(p.salary), gbp(p.repaid), gbp(p.balance)] }))} />
      </ResultCard>

      <ResultCard title="Monthly repayments by salary" sub={`${spec.label}, 2026/27.`}>
        <Compare head={["Salary", "A month"]} rows={salaries.map((x) => ({ label: gbp(x.sal), value: gbp(x.r.monthly, true), bar: x.r.monthly / maxSal, current: Math.abs(x.sal - v.salary) < 1 }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you overpay.">
        {proj.clearedIn === null && v.extra > 0 && (
          <Callout tone="warn" title="Overpaying may not help">
            If the loan is likely to be written off anyway, extra payments reduce the amount written off rather than what you pay overall.
          </Callout>
        )}
        <Callout title="It works like a tax">Repayments come out of your pay through PAYE and stop if your income falls below the threshold. The balance does not affect your credit score.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Projection only. Future pay, inflation and rules will differ.
      </p>
    </Studio>
  );
}
