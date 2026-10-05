"use client";

import { annualAllowance, PENSION_2026, pensionRelief, type ReliefMethod } from "@/lib/investing/wrappers";
import { hicbc } from "@/lib/benefits/family";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  salary: num(60_000, 0, 10_000_000),
  contribution: num(6_000, 0, 1_000_000),
  method: oneOf<ReliefMethod>("ras", ["ras", "net-pay", "sacrifice"]),
  scotland: bool(false),
  employer: num(3_000, 0, 1_000_000),
  niShare: num(0, 0, 100),
  children: num(0, 0, 10),
};
const ADVANCED = ["scotland", "employer", "niShare", "children"] as const;
const METHOD_LABEL: Record<ReliefMethod, string> = { ras: "Relief at source", "net-pay": "Net pay", sacrifice: "Salary sacrifice" };
const SALARIES = Array.from({ length: 41 }, (_, i) => i * 5_000);

export default function PensionReliefStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const run = (method: ReliefMethod, salary = v.salary, g = v.contribution) => pensionRelief({ salary, contribution: g, method, scotland: v.scotland, employerNiShare: v.niShare / 100, employerContribution: v.employer });
  const r = run(v.method);
  const cb = (pension: number) => (v.children > 0 ? hicbc({ children: v.children, income: v.salary, pension, giftAid: 0, weeks: 52 }).charge : 0);
  const cbSaving = v.children > 0 ? cb(0) - cb(r.relievable) : 0;
  const netCost = Math.max(0, r.netCost - cbSaving);
  const reliefRate = v.contribution > 0 ? 1 - netCost / v.contribution : 0;
  const methods: ReliefMethod[] = ["ras", "net-pay", "sacrifice"];
  const compare = methods.map((m) => ({ m, cost: run(m).netCost - (v.children > 0 ? cb(0) - cb(run(m).relievable) : 0) }));
  const maxCost = Math.max(1, ...compare.map((c) => c.cost));
  const curve = SALARIES.map((sal) => (1 - run(v.method, sal, 1_000).netCost / 1_000) * 100);
  const threshold = v.method === "sacrifice" ? v.salary : v.salary - v.contribution;
  const adjusted = v.salary + v.employer + (v.method === "sacrifice" ? v.contribution : 0);
  const aa = annualAllowance(threshold, adjusted);
  const totalIn = r.totalIntoPension + v.employer;

  return (
    <Studio
      title="Your pay and pension"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my tax relief"
      onReset={st.reset}
      dock={{ label: "Real cost to you", value: gbp(netCost) }}
      inputs={
        <>
          <InputGroup title="This tax year">
            <MoneyField label="Salary" value={v.salary} onChange={st.bind("salary")} hint="Before tax and before any salary sacrifice." />
            <MoneyField label="Your pension contribution (gross)" value={v.contribution} onChange={st.bind("contribution")} hint="The total going into your pension, including tax relief." />
            <Segmented
              label="How you pay in"
              value={v.method}
              onChange={st.bind("method")}
              options={[
                { value: "ras", label: "Relief at source", note: "Personal pensions, SIPPs and many workplace schemes. You pay 80%." },
                { value: "net-pay", label: "Net pay", note: "Taken from pay before tax." },
                { value: "sacrifice", label: "Salary sacrifice", note: "Your salary is reduced; saves National Insurance too." },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Scottish taxpayer" checked={v.scotland} onChange={st.bind("scotland")} optional />
            <MoneyField label="Employer contribution a year" value={v.employer} onChange={st.bind("employer")} optional hint="For the annual allowance check." />
            {v.method === "sacrifice" && <StepperField label="Employer NI saving passed on" value={v.niShare} onChange={st.bind("niShare")} step={5} min={0} max={100} unit="%" dp={0} optional hint="Some employers add their 15% NI saving to your pension." />}
            <StepperField label="Children you get Child Benefit for" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional hint="Pension contributions can reduce the High Income Child Benefit Charge." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your contribution really costs"
        value={gbp(netCost)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Putting <b>{gbp(v.contribution)}</b> into your pension by {METHOD_LABEL[v.method].toLowerCase()} costs you <b>{gbp(netCost)}</b> after <b>{gbp(r.incomeTaxRelief)}</b> of tax relief
            {r.employeeNiSaving > 0 ? <> and <b>{gbp(r.employeeNiSaving)}</b> of National Insurance savings</> : null}
            {cbSaving > 0 ? <>, plus <b>{gbp(cbSaving)}</b> less Child Benefit charge</> : null}. That is relief of <b>{percent(reliefRate, 0)}</b>.
            {v.method === "ras" && r.claimBack > 0 ? <> Claim <b>{gbp(r.claimBack)}</b> of it back through Self Assessment.</> : null}
          </>
        }
        badges={[METHOD_LABEL[v.method], `${percent(reliefRate, 0)} relief`, r.paAfter > r.paBefore ? "Restores Personal Allowance" : `Allowance ${gbpShort(aa)}`]}
      />

      <Facts
        items={[
          { label: "Into your pension", value: gbp(totalIn), note: "Including employer" },
          { label: "Tax relief", value: gbp(r.incomeTaxRelief), tone: "good" },
          { label: "NI saved", value: gbp(r.employeeNiSaving) },
          { label: "Real cost", value: gbp(netCost) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Income", value: "Salary only" },
          { label: "Relief at source", value: "Higher-rate relief claimed via Self Assessment" },
          { label: "Annual allowance", value: gbp(aa) },
        ]}
      />

      <ResultCard title="Where the money comes from" sub={`${gbp(v.contribution)} gross contribution.`}>
        <Statement
          columns={["Amount"]}
          rows={[
            { label: v.method === "ras" ? "You pay from take-home pay" : "Reduction in take-home pay", values: [gbp(r.fromPay)] },
            ...(v.method === "ras" ? [{ label: "Basic-rate relief added by the provider", values: [gbp(r.basicAtSource)] }] : [{ label: "Income Tax saved", values: [gbp(r.incomeTaxRelief)] }]),
            ...(r.employeeNiSaving > 0 ? [{ label: "National Insurance saved", values: [gbp(r.employeeNiSaving)] }] : []),
            ...(v.method === "ras" && r.claimBack > 0 ? [{ label: "Higher-rate relief you claim back", values: [`−${gbp(r.claimBack)}`], kind: "deduction" as const }] : []),
            ...(cbSaving > 0 ? [{ label: "Child Benefit charge reduced by", values: [`−${gbp(cbSaving)}`], kind: "deduction" as const }] : []),
            { label: "Real cost to you", values: [gbp(netCost)], kind: "total" as const },
            ...(r.employerNiToPension > 0 ? [{ label: "Employer NI saving added to your pension", values: [gbp(r.employerNiToPension)] }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="By each method" sub="Same gross contribution.">
        <Compare head={["Method", "Real cost"]} rows={compare.map((c) => ({ label: METHOD_LABEL[c.m], value: gbp(c.cost), bar: c.cost / maxCost, current: c.m === v.method }))} />
      </ResultCard>

      <ResultCard title="Relief at different salaries" sub={`For each £1,000 paid in by ${METHOD_LABEL[v.method].toLowerCase()}.`}>
        <AreaChart
          ariaLabel="Tax relief rate by salary"
          series={[{ key: "rate", label: "Relief rate", color: "#16a34a", values: curve, fill: true }]}
          xLabel={(i) => gbpShort(SALARIES[i] ?? 0)}
          yFormat={(n) => `${Math.round(n)}%`}
          initial={Math.min(SALARIES.length - 1, Math.round(v.salary / 5_000))}
          hint="Drag across the chart, or use the arrow keys, to read any salary."
          readout={(i) => (
            <>
              Salary <b>{gbp(SALARIES[i] ?? 0)}</b>: relief <b>{Math.round(curve[i] ?? 0)}%</b>, so £1,000 costs <b>{gbp(1_000 - (curve[i] ?? 0) * 10)}</b>.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Limits and traps.">
        {v.contribution + v.employer > aa && (
          <Callout tone="warn" title="Over the annual allowance">
            Contributions of {gbp(v.contribution + v.employer)} are above your allowance of {gbp(aa)}. You may be able to carry forward unused allowance from the last three years; otherwise a tax charge applies.
          </Callout>
        )}
        {v.method === "ras" && r.claimBack > 0 && (
          <Callout title="Claim your higher-rate relief">
            Relief at source only adds 20%. Claim the rest through Self Assessment, or by asking HMRC to adjust your tax code.
          </Callout>
        )}
        {v.method === "net-pay" && v.salary < 12_570 && (
          <Callout tone="warn" title="Net pay and low earners">
            Under net pay you get no relief at source if you earn less than the Personal Allowance. HMRC can make a top-up payment to eligible low earners after the tax year ends.
          </Callout>
        )}
        <Callout title={`Annual allowance ${gbp(PENSION_2026.annualAllowance)}`}>
          Total contributions from you and your employer can be up to {gbp(PENSION_2026.annualAllowance)} a year, or 100% of your earnings for your own contributions. It tapers to {gbp(PENSION_2026.minimumTapered)} for the highest earners.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rules. Not financial advice.
      </p>
    </Studio>
  );
}
