"use client";

import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { compareSavings } from "@/lib/investing/savings";
import { CPI_LATEST } from "@/lib/investing/growth";

const SCHEMA = {
  amount: num(20_000, 0, 10_000_000),
  easy: num(3.5, 0, 20),
  fixed: num(4.2, 0, 20),
  years: num(2, 1, 10),
  income: num(35_000, 0, 1_000_000),
  pay: oneOf<"yearly" | "maturity">("yearly", ["yearly", "maturity"]),
  isa: bool(false),
  scotland: bool(false),
  r2027: bool(false),
};
const ADVANCED = ["pay", "isa", "scotland", "r2027"] as const;

export default function SavingsStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = compareSavings({
    amount: v.amount,
    easyRate: v.easy / 100,
    fixedRate: v.fixed / 100,
    years: v.years,
    atMaturity: v.pay === "maturity",
    otherIncome: v.income,
    scotland: v.scotland,
    rates2027: v.r2027,
    isa: v.isa,
  });
  const fixedWins = r.advantage >= 0;
  const inflation = CPI_LATEST.rate;
  const realFixed = (1 + v.fixed / 100) / (1 + inflation) - 1;
  const rates = [-1, -0.5, 0, 0.5, 1].map((d) => Math.max(0, v.easy + d));
  const ladder = rates.map((e) => ({ e, x: compareSavings({ amount: v.amount, easyRate: e / 100, fixedRate: v.fixed / 100, years: v.years, atMaturity: v.pay === "maturity", otherIncome: v.income, scotland: v.scotland, rates2027: v.r2027, isa: v.isa }) }));
  const maxL = Math.max(1, ...ladder.map((l) => Math.abs(l.x.advantage)));

  return (
    <Studio
      title="Your savings and the two accounts"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare the accounts"
      onReset={st.reset}
      dock={{ label: fixedWins ? "Fixed earns more" : "Easy access earns more", value: gbp(Math.abs(r.advantage)) }}
      inputs={
        <>
          <InputGroup title="Your savings">
            <MoneyField label="Amount to save" value={v.amount} onChange={st.bind("amount")} big slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }} />
            <StepperField label="Easy-access rate (AER)" value={v.easy} onChange={st.bind("easy")} step={0.05} min={0} max={20} unit="%" dp={2} hint="Easy-access rates can change at any time; we assume this one stays the same." />
            <StepperField label="Fixed rate (AER)" value={v.fixed} onChange={st.bind("fixed")} step={0.05} min={0} max={20} unit="%" dp={2} />
            <StepperField label="Fixed for" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={10} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="Tax">
            <MoneyField label="Your other income a year" value={v.income} onChange={st.bind("income")} hint="Salary, pension and other taxable income before tax. Sets your Personal Savings Allowance." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Fixed account pays interest"
              value={v.pay}
              onChange={st.bind("pay")}
              optional
              options={[
                { value: "yearly", label: "Each year" },
                { value: "maturity", label: "At the end", note: "All the interest is taxed in the year it is paid, which can use up your allowance at once." },
              ]}
            />
            <Switch label="Both are cash ISAs" checked={v.isa} onChange={st.bind("isa")} optional hint="No tax on interest. £20,000 a year allowance; a £12,000 cash limit for under-65s from April 2027." />
            <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional />
            <Switch label="Use savings tax rates from April 2027" checked={v.r2027} onChange={st.bind("r2027")} optional hint="Tax on savings interest rises to 22%, 42% and 47%." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={fixedWins ? "Fixed earns you more" : "Easy access earns you more"}
        value={gbp(Math.abs(r.advantage))}
        unit={`after tax over ${v.years} ${v.years === 1 ? "year" : "years"}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            The fixed account turns {gbp(v.amount)} into <b>{gbp(r.fixedAfterTax)}</b> after tax, the easy-access account into <b>{gbp(r.easyAfterTax)}</b>.{" "}
            {r.fixedTax + r.easyTax > 0 ? (
              <>
                Tax takes {gbp(r.fixedTax)} from the fixed interest and {gbp(r.easyTax)} from the easy-access interest.
              </>
            ) : (
              <>All the interest is within your tax-free allowances.</>
            )}
          </>
        }
        badges={[`${percent(v.fixed / 100, 2)} fixed`, `${percent(v.easy / 100, 2)} easy access`, v.isa ? "Cash ISA" : "Taxable account"]}
      />

      <Facts
        items={[
          { label: "Fixed: interest", value: gbp(r.fixedInterest) },
          { label: "Easy access: interest", value: gbp(r.easyInterest) },
          { label: "Tax on interest", value: gbp(r.fixedTax), note: `Easy access: ${gbp(r.easyTax)}` },
          { label: "Fixed rate after inflation", value: percent(realFixed, 2), tone: realFixed < 0 ? "warn" : "good", note: `CPI ${percent(inflation, 1)}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "Both stay the same for the whole term; interest is added each year" },
          { label: "Tax", value: v.isa ? "Cash ISA: no tax" : `2026/27 Income Tax${v.r2027 ? " with April 2027 savings rates" : ""}, with your other income` },
          { label: "Other savings", value: "No other interest using your Personal Savings Allowance" },
          { label: "Access", value: "Nothing is withdrawn from the fixed account early" },
        ]}
      />

      <ResultCard title="Your savings over time" sub="Balance before tax.">
        <AreaChart
          ariaLabel="Balance in the fixed and easy-access accounts"
          series={[
            { key: "fixed", label: "Fixed", color: "#5b1e6e", values: [v.amount, ...r.path.map((p) => p.fixed)], fill: true },
            { key: "easy", label: "Easy access", color: "#0f9f6e", values: [v.amount, ...r.path.map((p) => p.easy)] },
          ]}
          xLabel={(i) => (i === 0 ? "Now" : `Year ${i}`)}
          yFormat={gbpShort}
          initial={r.path.length}
          readout={(i) => (i === 0 ? <>Starting with {gbp(v.amount)}.</> : <>After year {i}: fixed <b>{gbp(r.path[i - 1].fixed)}</b>, easy access <b>{gbp(r.path[i - 1].easy)}</b>.</>)}
          hint="Drag across the chart, or use the arrow keys, to read any year."
        />
        <Statement
          columns={["Fixed", "Easy access"]}
          rows={[
            { label: "Interest", values: [gbp(r.fixedInterest), gbp(r.easyInterest)] },
            { label: "Tax", values: [`− ${gbp(r.fixedTax)}`, `− ${gbp(r.easyTax)}`], kind: "deduction" },
            { label: "Balance after tax", values: [gbp(r.fixedAfterTax), gbp(r.easyAfterTax)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="If the easy-access rate were different" sub={`Fixed at ${percent(v.fixed / 100, 2)}; gain from fixing, after tax.`}>
        <Compare head={["Easy-access rate", "Fixing gains"]} rows={ladder.map((l) => ({ label: percent(l.e / 100, 2), value: gbp(l.x.advantage), deltaTone: l.x.advantage < 0 ? "up" : undefined, bar: Math.abs(l.x.advantage) / maxL, current: l.e === v.easy }))} />
      </ResultCard>

      <ResultCard title="What it means">
        {v.pay === "maturity" && !v.isa && r.fixedTax > 0 && (
          <Callout tone="warn" title="Interest paid at the end is taxed in one year">
            Taking the interest each year instead would spread it across your allowances. Some accounts let you choose.
          </Callout>
        )}
        <Callout title="Fixing means giving up access">
          Most fixed accounts do not allow withdrawals, or charge a penalty of some months&rsquo; interest. Keep an emergency fund in easy access first.
        </Callout>
        <Callout title="Protected up to £120,000">
          Since December 2025 the Financial Services Compensation Scheme protects up to £120,000 per person, per banking group.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 tax rules. Real accounts may compound monthly and easy-access rates change; this compares the two on stated AERs.
      </p>
    </Studio>
  );
}
