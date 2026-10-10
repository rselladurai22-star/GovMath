"use client";

import { deductionSaving, iraCompare, iraDeduction } from "@/lib/us/retirement-income";
import { rothLimit } from "@/lib/us/savings";
import { STATES } from "@/lib/us/states";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "hoh", "mfs"] as const;

const SCHEMA = {
  age: num(40, 18, 90),
  retire: num(65, 19, 100),
  status: oneOf<FilingStatus>("single", STATUSES),
  magi: num(85_000, 0, 10_000_000),
  covered: bool(true),
  spouseCovered: bool(false),
  want: num(7_500, 0, 100_000),
  balance: num(20_000, 0, 100_000_000),
  ret: num(7, -10, 20),
  earned: num(0, 0, 10_000_000),
  state: text("", 2),
  retireRate: num(15, 0, 60),
  yieldPct: num(1.5, 0, 10),
  investTax: num(15, 0, 40),
};
const ADVANCED = ["earned", "state", "retireRate", "yieldPct", "investTax"] as const;

export default function IraStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const earned = v.earned > 0 ? v.earned : v.magi;
  const spouseCovered = v.status === "mfj" || v.status === "mfs" ? v.spouseCovered : false;
  const ded = iraDeduction(v.magi, v.status, v.covered, spouseCovered, v.age, earned);
  const yearly = Math.min(v.want, ded.limit);
  const deductible = Math.min(yearly, ded.deductible);
  const stateCode = STATES.some((s) => s.code === v.state) ? v.state : "";
  const saving = deductionSaving(v.magi, deductible, v.status, stateCode);
  const years = Math.max(0, Math.round(v.retire - v.age));
  const cmp = iraCompare(v.balance, yearly, deductible, saving.rate, v.retireRate / 100, v.ret, years, v.yieldPct, v.investTax / 100);
  // The comparison covers new saving only: the starting balance is pre-tax money with no equivalent elsewhere.
  const fresh = iraCompare(0, yearly, deductible, saving.rate, v.retireRate / 100, v.ret, years, v.yieldPct, v.investTax / 100);
  const roth = rothLimit(v.magi, v.status, v.age, earned);
  const nondeductible = yearly - deductible;
  const best = Math.max(1, fresh.iraAfterTax, fresh.roth, fresh.taxableAfterSale);

  const bal = cmp.path.map((p) => p.balance);
  const paid = cmp.path.map((p) => p.deposits);
  const stateName = STATES.find((s) => s.code === stateCode)?.name;

  const phaseText =
    ded.phase === "full" ? "Fully deductible" : ded.phase === "partial" ? `Partly deductible: ${usd(ded.deductible)}` : "Not deductible at your income";

  return (
    <Studio
      title="Your traditional IRA"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my IRA"
      onReset={st.reset}
      dock={{ label: `At ${v.retire}`, value: usd(cmp.ira) }}
      inputs={
        <>
          <InputGroup title="You">
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={90} unit="years" dp={0} info="From 50 (by December 31) you can add a $1,100 catch-up." />
            <StepperField label="Age you'll start withdrawals" value={v.retire} onChange={(n) => st.set("retire", Math.round(n))} step={1} min={19} max={100} unit="years" dp={0} info="Withdrawals before 59½ usually cost a 10% penalty on top of income tax." />
            <SelectField label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Modified AGI for 2026" value={v.magi} onChange={st.bind("magi")} symbol="$" slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="Roughly your adjusted gross income before any IRA deduction. Also used to work out the tax the deduction saves." />
            <Switch label="I'm covered by a retirement plan at work" checked={v.covered} onChange={st.bind("covered")} info="Box 13 of your W-2 is ticked if you were an active participant in a 401(k), 403(b), pension or similar plan for the year." />
            {(v.status === "mfj" || v.status === "mfs") && <Switch label="My spouse is covered by a plan at work" checked={v.spouseCovered} onChange={st.bind("spouseCovered")} />}
          </InputGroup>
          <InputGroup title="Saving">
            <MoneyField label="You want to contribute each year" value={v.want} onChange={st.bind("want")} symbol="$" info="We cap it at the 2026 limit for your age and earned income." />
            <MoneyField label="Traditional IRA balance now" value={v.balance} onChange={st.bind("balance")} symbol="$" />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={20} unit="%" dp={1} info="7% is a common long-run assumption for a mostly stock portfolio. Not guaranteed." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Earned income, if different" value={v.earned} onChange={st.bind("earned")} symbol="$" optional info="Wages and self-employment income. You can't contribute more than this (a spouse's earnings count for a spousal IRA)." />
            <SelectField
              label="State, for the state tax saving"
              value={stateCode}
              onChange={(s) => st.set("state", s)}
              optional
              options={[{ value: "", label: "Leave out state tax" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
            />
            <StepperField label="Your tax rate on withdrawals in retirement" value={v.retireRate} onChange={st.bind("retireRate")} step={1} min={0} max={60} unit="%" dp={0} optional info="Federal plus state. Many retirees pay 10% to 22% federal on their marginal dollar." />
            <StepperField label="Dividend yield in a taxable account" value={v.yieldPct} onChange={st.bind("yieldPct")} step={0.25} min={0} max={10} unit="%" dp={2} optional />
            <StepperField label="Tax rate on dividends and gains" value={v.investTax} onChange={st.bind("investTax")} step={1} min={0} max={40} unit="%" dp={0} optional info="15% for most people; 0% at low incomes, 20% (plus 3.8%) at high incomes." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your traditional IRA at ${v.retire}`}
        value={usd(cmp.ira)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You can put in <b>{usd(yearly)}</b>{" "}for 2026, of which <b>{usd(deductible)}</b>{" "}is deductible, saving about <b>{usd(saving.total)}</b>{" "}of tax
            now. Over {years} {per(years, "years")} the account could reach <b>{usd(cmp.ira)}</b>; after {v.retireRate}% tax on withdrawals you would keep about{" "}
            <b>{usd(cmp.iraAfterTax)}</b>.
          </>
        }
        badges={[phaseText, `Tax saved now ${usd(saving.total)}`, `Costs you ${usd(yearly - saving.total)} a year`]}
      />

      <Facts
        items={[
          { label: "2026 contribution", value: usd(yearly) },
          { label: "Deductible", value: usd(deductible), tone: ded.phase === "full" ? "good" : ded.phase === "partial" ? "warn" : "bad" },
          { label: "Tax saved now", value: usd(saving.total), note: deductible > 0 ? `${percent(saving.rate, 1)} of the deduction` : undefined, tone: "good" },
          { label: "After tax at withdrawal", value: usd(cmp.iraAfterTax) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Contributions", value: `${usd(yearly)} a year, spread monthly, the same every year` },
          { label: "Tax saved", value: `From the 2026 federal tax engine${stateName ? ` and ${stateName} tax` : ""} at your income` },
          { label: "Return", value: `${v.ret}% a year, steady, after fund costs` },
          { label: "Withdrawal", value: `Everything at ${v.retireRate}%, except nondeductible contributions` },
          { label: "Limits and brackets", value: "Held at 2026 levels" },
        ]}
      />

      <ResultCard title="What you keep after tax" sub="The account at the start of withdrawals, split into what you keep and the tax due on it.">
        <SplitBar
          segments={[
            { label: "You keep", value: Math.max(0, cmp.iraAfterTax), display: usd(cmp.iraAfterTax), color: "#0f9f6e" },
            { label: "Tax on withdrawals", value: Math.max(0, cmp.withdrawalTax), display: usd(cmp.withdrawalTax), color: "#f59e0b" },
          ]}
        />
        <AreaChart
          ariaLabel="Traditional IRA balance by age"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "paid", label: "Put in", color: "#94a3b8", values: paid, dashed: true },
          ]}
          xLabel={(i) => `${v.age + i}`}
          yFormat={usdShort}
          initial={bal.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              At <b>{v.age + i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, of which <b>{usd((bal[i] ?? 0) - (paid[i] ?? 0))}</b>{" "}is growth.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Traditional IRA, Roth IRA or taxable account" sub={`New saving only, for the same cost to you of ${usd(yearly - saving.total)} a year, after all tax.`}>
        <Compare
          head={["Account", "You keep"]}
          rows={[
            { label: "Traditional IRA", value: usd(fresh.iraAfterTax), bar: Math.max(0, fresh.iraAfterTax / best), current: true },
            { label: roth.limit > 0 ? "Roth IRA" : "Roth IRA (over the income limit)", value: usd(fresh.roth), bar: Math.max(0, fresh.roth / best) },
            { label: "Taxable brokerage account", value: usd(fresh.taxableAfterSale), bar: Math.max(0, fresh.taxableAfterSale / best) },
          ]}
        />
        <p className="footnote">
          Deducting at {percent(saving.rate, 1)} now and paying {v.retireRate}% later: the traditional IRA wins when your rate in retirement is lower than today,
          the Roth when it is higher. The starting balance is left out of this comparison.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Rules that affect your IRA.">
        {ded.phase !== "full" && ded.range && (
          <Callout tone="warn" title={ded.phase === "none" ? "No deduction at your income" : "Partly deductible"}>
            Because {v.covered ? "you are" : "your spouse is"} covered by a plan at work, the deduction phases out between {usd(ded.range[0])} and{" "}
            {usd(ded.range[1])} of modified AGI. {nondeductible > 0 ? `${usd(nondeductible)} a year would go in after tax: record it on Form 8606 so it isn't taxed twice.` : ""}{" "}
            {ded.phase === "none" && roth.limit === 0 ? "A backdoor Roth (convert the nondeductible contribution) is often better." : ""}
          </Callout>
        )}
        {v.want > ded.limit && (
          <Callout title={`Capped at ${usd(ded.limit)}`}>The 2026 IRA limit is $7,500, or $8,600 from age 50, and no more than your earned income. It is shared with any Roth IRA contributions.</Callout>
        )}
        {v.retire < 60 && (
          <Callout tone="warn" title="Early withdrawals">Money taken out before 59½ usually costs a 10% penalty on top of income tax, with exceptions such as disability, a first home ($10,000) and substantially equal payments.</Callout>
        )}
        <Callout title="Required minimum distributions">
          From 73 (or 75 if born in 1960 or later) you must take a minimum amount out each year and pay tax on it. Roth IRAs have no such rule.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Returns vary and are not guaranteed. Not tax or financial advice.
      </p>
    </Studio>
  );
}
