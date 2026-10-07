"use client";

import { apy, grow, type Compounding } from "@/lib/us/savings";
import { doubling } from "@/lib/us/savings-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const COMPOUNDING = ["daily", "monthly", "quarterly", "annually"] as const;
const COMP_LABEL: Record<Compounding, string> = { daily: "Daily", monthly: "Monthly", quarterly: "Quarterly", annually: "Once a year" };

const SCHEMA = {
  start: num(10_000, 0, 100_000_000),
  monthly: num(200, 0, 1_000_000),
  rate: num(7, -20, 50),
  years: num(20, 1, 100),
  comp: oneOf<Compounding>("monthly", COMPOUNDING),
  depGrowth: num(0, 0, 20),
  infl: num(2.5, 0, 20),
};
const ADVANCED = ["comp", "depGrowth", "infl"] as const;

export default function CompoundStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const g = grow(v.start, v.monthly, v.rate, v.years, v.comp, v.infl, v.depGrowth / 100);
  const yieldPct = apy(v.rate, v.comp);
  const d = doubling(yieldPct * 100);
  const bal = [Math.max(0, v.start), ...g.years.map((y) => y.balance)];
  const paid = [Math.max(0, v.start), ...g.years.map((y) => y.deposits)];
  const step = v.years > 30 ? 5 : v.years > 15 ? 2 : 1;
  const rows = g.years.filter((y) => y.year % step === 0 || y.year === g.years.length);
  const interestShare = g.balance > 0 ? Math.max(0, g.interest) / g.balance : 0;

  return (
    <Studio
      title="Your savings"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate growth"
      onReset={st.reset}
      dock={{ label: `After ${v.years} ${per(v.years, "years")}`, value: usd(g.balance) }}
      inputs={
        <>
          <InputGroup title="Money in">
            <MoneyField label="Starting amount" value={v.start} onChange={st.bind("start")} symbol="$" />
            <MoneyField label="Monthly deposit" value={v.monthly} onChange={st.bind("monthly")} symbol="$" slider={{ min: 0, max: 3_000, step: 25, ends: ["$0", "$3k"] }} />
          </InputGroup>
          <InputGroup title="Growth">
            <StepperField label="Interest rate or return a year" value={v.rate} onChange={st.bind("rate")} step={0.25} min={-20} max={50} unit="%" dp={2} info="The yearly rate before compounding (APR). For a savings account quoted as an APY, choose the compounding the bank uses, or enter the APY with yearly compounding." />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={100} unit="years" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField label="Interest compounds" value={v.comp} onChange={st.bind("comp")} optional options={COMPOUNDING.map((c) => ({ value: c, label: COMP_LABEL[c] }))} />
            <StepperField label="Raise deposits each year by" value={v.depGrowth} onChange={st.bind("depGrowth")} step={0.5} min={0} max={20} unit="%" dp={1} optional info="To keep pace with raises. Deposits go up once a year." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={20} unit="%" dp={2} optional info="Shows the result in today's dollars. The Federal Reserve aims for 2% over time." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`After ${v.years} ${per(v.years, "years")}`}
        value={usd(g.balance)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You put in <b>{usd(g.deposits)}</b>{" "}and {g.interest >= 0 ? "earn" : "lose"} <b>{usd(Math.abs(g.interest))}</b>
            {g.interest >= 0 ? " of interest, so your money grows to " : ", so your balance ends at "}
            <b>{usd(g.balance)}</b>. In today&apos;s dollars, after{" "}
            {v.infl}% inflation, that is worth about <b>{usd(g.real)}</b>.
          </>
        }
        badges={[`APY ${percent(yieldPct, 3)}`, d.exact === Infinity ? "Never doubles" : `Doubles in ${d.exact.toFixed(1)} years`, `${percent(interestShare, 0)} from interest`]}
      />

      <Facts
        items={[
          { label: "Total deposits", value: usd(g.deposits) },
          { label: "Interest earned", value: usd(g.interest), tone: g.interest >= 0 ? "good" : "bad" },
          { label: "Final balance", value: usd(g.balance) },
          { label: "In today's dollars", value: usd(g.real) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% a year, compounded ${COMP_LABEL[v.comp].toLowerCase()} (APY ${percent(yieldPct, 3)})` },
          { label: "Deposits", value: `At the end of each month${v.depGrowth ? `, rising ${v.depGrowth}% a year` : ""}` },
          { label: "Tax", value: "None taken off (as in a 401(k) or IRA)" },
          { label: "Inflation", value: `${v.infl}% a year` },
        ]}
      />

      <ResultCard title="Growth over time" sub="Your balance compared with what you deposited; the gap is interest.">
        <AreaChart
          ariaLabel="Balance and deposits by year"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "paid", label: "Deposits", color: "#94a3b8", values: paid, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={bal.length - 1}
          readout={(i) => (
            <>
              Year <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, deposits <b>{usd(paid[i] ?? 0)}</b>, interest <b>{usd((bal[i] ?? 0) - (paid[i] ?? 0))}</b>.
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Deposits", value: g.deposits, display: usd(g.deposits), color: "#94a3b8" },
            { label: "Interest", value: Math.max(0, g.interest), display: usd(g.interest), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Year by year" sub="Deposits, interest and balance at the end of each year shown.">
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "Deposits", "Interest", "Balance", "Today's dollars"]}
          rows={rows.map((y) => [y.year, usd(y.deposits), usd(y.interest), usd(y.balance), usd(y.real)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Making compounding work for you.">
        <Callout title={d.exact === Infinity ? "The rule of 72" : `The rule of 72: about ${d.rule72.toFixed(1)} years`}>
          {d.exact === Infinity
            ? "At a zero or negative rate your money never doubles. Divide 72 by a positive rate to estimate the years it takes."
            : `Divide 72 by the rate to estimate how long money takes to double. At an APY of ${percent(yieldPct, 2)} the exact figure is ${d.exact.toFixed(1)} years.`}
        </Callout>
        <Callout title="Time does the heavy lifting">
          The longer you leave money alone, the bigger the share of the balance that is interest rather than your own deposits. Starting a few years earlier often matters more than saving a little more each month.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Investment returns vary and are not guaranteed. Not financial advice.
      </p>
    </Studio>
  );
}
