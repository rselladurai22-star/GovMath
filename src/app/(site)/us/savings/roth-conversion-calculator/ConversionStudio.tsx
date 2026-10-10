"use client";

import { IRMAA_2026, roomInBracket, rothConversion } from "@/lib/us/retirement-income";
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
  status: oneOf<FilingStatus>("mfj", STATUSES),
  income: num(60_000, 0, 10_000_000),
  conversion: num(50_000, 0, 10_000_000),
  age: num(63, 18, 100),
  years: num(15, 0, 50),
  retireRate: num(22, 0, 60),
  state: text("", 2),
  payOutside: bool(true),
  ret: num(6, -10, 20),
  yieldPct: num(1.5, 0, 10),
  investTax: num(15, 0, 40),
};
const ADVANCED = ["state", "payOutside", "ret", "yieldPct", "investTax"] as const;

export default function ConversionStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const stateCode = STATES.some((s) => s.code === v.state) ? v.state : "";
  const stateName = STATES.find((s) => s.code === stateCode)?.name;
  const over65 = v.age >= 65 ? (v.status === "mfj" ? 2 : 1) : 0;
  const c = rothConversion({
    status: v.status,
    income: v.income,
    conversion: v.conversion,
    over65,
    state: stateCode,
    years: v.years,
    returnPct: v.ret,
    retireRate: v.retireRate / 100,
    payOutside: v.payOutside,
    yieldPct: v.yieldPct,
    investTaxRate: v.investTax / 100,
  });
  const room = roomInBracket(v.income, v.status, over65);
  const wins = c.advantage > 0.5;
  const best = Math.max(1, c.roth, c.keep);
  const irmaaLine = v.status === "mfj" ? IRMAA_2026.joint : IRMAA_2026.single;
  const roth = c.path.map((p) => p.roth);
  const keep = c.path.map((p) => p.keep);
  const net = Math.max(0, v.conversion - (v.payOutside ? 0 : c.tax));

  return (
    <Studio
      title="Your Roth conversion"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the conversion"
      onReset={st.reset}
      dock={{ label: "Tax on conversion", value: usd(c.tax) }}
      inputs={
        <>
          <InputGroup title="This year">
            <SelectField label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Other taxable income in 2026" value={v.income} onChange={st.bind("income")} symbol="$" slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="Wages, pensions, IRA withdrawals, interest and the taxable part of Social Security, before the standard deduction." />
            <MoneyField label="Amount to convert" value={v.conversion} onChange={st.bind("conversion")} symbol="$" slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="Pre-tax money moved from a traditional IRA or 401(k) to a Roth IRA. All of it is taxable this year." />
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={100} unit="years" dp={0} info="From 65 you get a larger standard deduction and the 2025–2028 senior deduction, which the conversion can shrink." />
          </InputGroup>
          <InputGroup title="Later">
            <StepperField label="Years until you'd spend it" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={0} max={50} unit="years" dp={0} />
            <StepperField label="Your tax rate on withdrawals then" value={v.retireRate} onChange={st.bind("retireRate")} step={1} min={0} max={60} unit="%" dp={0} info="Federal plus state rate you expect on traditional IRA withdrawals in retirement. The key number." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="State"
              value={stateCode}
              onChange={(s) => st.set("state", s)}
              optional
              info="We tax the conversion like wages. Some states exempt part of retirement income; check yours."
              options={[{ value: "", label: "Leave out state tax" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
            />
            <Switch label="Pay the tax from savings outside the IRA" checked={v.payOutside} onChange={st.bind("payOutside")} optional info="Usually best: the whole conversion lands in the Roth. Otherwise the tax comes out of the converted amount." />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={20} unit="%" dp={1} optional />
            <StepperField label="Dividend yield on outside savings" value={v.yieldPct} onChange={st.bind("yieldPct")} step={0.25} min={0} max={10} unit="%" dp={2} optional />
            <StepperField label="Tax rate on dividends and gains" value={v.investTax} onChange={st.bind("investTax")} step={1} min={0} max={40} unit="%" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Tax on the conversion"
        value={usd(c.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Converting <b>{usd(v.conversion)}</b>{" "}adds about <b>{usd(c.tax)}</b>{" "}to your 2026 tax bill, an average of <b>{percent(c.rate, 1)}</b>. After {v.years}{" "}
            {per(v.years, "years")}, the Roth would hold <b>{usd(c.roth)}</b>{" "}tax-free, against <b>{usd(c.keep)}</b>{" "}if you don&apos;t convert and pay {v.retireRate}% later.{" "}
            {wins ? <>Converting comes out <b>{usd(c.advantage)}</b>{" "}ahead.</> : <>Not converting comes out <b>{usd(-c.advantage)}</b>{" "}ahead.</>}
          </>
        }
        badges={[`Average rate ${percent(c.rate, 1)}`, `Top bracket ${percent(c.marginalAfter)}`, `Break-even rate ${percent(Math.max(0, c.breakEvenRate), 1)}`]}
      />

      <Facts
        items={[
          { label: "Federal tax", value: usd(c.federal) },
          { label: stateName ? `${stateName} tax` : "State tax", value: stateName ? usd(c.state) : "Not included" },
          { label: "Bracket before → after", value: `${percent(c.marginalBefore)} → ${percent(c.marginalAfter)}`, tone: c.marginalAfter > c.marginalBefore ? "warn" : "good" },
          { label: "Break-even future rate", value: percent(Math.max(0, c.breakEvenRate), 1), note: "Convert if you expect to pay more than this later" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax now", value: `2026 federal brackets${stateName ? ` and ${stateName} tax` : ""}, ${FILING_LABEL[v.status].toLowerCase()}, standard deduction` },
          { label: "Tax paid from", value: v.payOutside ? "Savings outside the IRA, which would otherwise stay invested in a taxable account" : "The converted amount itself" },
          { label: "Growth", value: `${v.ret}% a year, the same in both accounts` },
          { label: "Later", value: `Traditional withdrawals taxed at ${v.retireRate}%; Roth withdrawals qualified and tax-free` },
        ]}
      />

      <ResultCard title="Where the conversion goes" sub="The amount converted, split between tax and what lands in the Roth.">
        <SplitBar
          segments={[
            { label: v.payOutside ? "Into the Roth" : "Into the Roth after tax", value: net, display: usd(net), color: "#0f9f6e" },
            { label: v.payOutside ? "Federal tax (paid from savings)" : "Federal tax", value: Math.max(0, c.federal), display: usd(c.federal), color: "#f59e0b" },
            ...(c.state > 0 ? [{ label: "State tax", value: c.state, display: usd(c.state), color: "#5b1e6e" }] : []),
          ]}
        />
        <p className="footnote">
          Your current bracket ({percent(room.rate)}) has about {usd(room.room)} of room left before the next rate starts. Converting up to that amount keeps
          the whole conversion at {percent(room.rate)} or less.
        </p>
      </ResultCard>

      <ResultCard title="Convert or keep it traditional" sub={`What you would have after ${v.years} ${per(v.years, "years")}, after all tax.`}>
        <Compare
          head={["Choice", "You keep"]}
          rows={[
            { label: "Convert to Roth", value: usd(c.roth), bar: c.roth / best, current: wins },
            {
              label: v.payOutside ? "Don't convert (IRA after tax + savings kept)" : "Don't convert (IRA after tax)",
              value: usd(c.keep),
              bar: c.keep / best,
              current: !wins,
            },
          ]}
        />
        <AreaChart
          ariaLabel="Value after tax: Roth conversion compared with keeping the traditional IRA"
          series={[
            { key: "roth", label: "Convert to Roth", color: "#0f9f6e", values: roth, fill: true },
            { key: "keep", label: "Don't convert", color: "#f59e0b", values: keep, dashed: true },
          ]}
          xLabel={(i) => `${v.age + i}`}
          yFormat={usdShort}
          initial={roth.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              At <b>{v.age + i}</b>: Roth <b>{usd(roth[i] ?? 0)}</b>, not converting <b>{usd(keep[i] ?? 0)}</b>{" "}after tax.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Rules that change the answer.">
        {c.irmaaRisk && v.age >= 63 && (
          <Callout tone="warn" title="Medicare surcharge (IRMAA)">
            Your 2026 modified AGI of about {usd(c.agiAfter)} is above {usd(irmaaLine)}. Medicare looks back two years, so in 2028 your Part B and D premiums
            could rise above the standard {usd(IRMAA_2026.partB, true)} a month (2026 figures).
          </Callout>
        )}
        {c.marginalAfter > c.marginalBefore && (
          <Callout title="The conversion crosses into a higher bracket">
            Part of it is taxed at {percent(c.marginalAfter)}. Converting {usd(room.room)} this year and the rest next year could lower the total tax.
          </Callout>
        )}
        {!v.payOutside && v.age < 60 && (
          <Callout tone="warn" title="Paying the tax from the IRA under 59½">
            Money withheld for tax isn&apos;t converted, so it counts as an early withdrawal and usually costs a 10% penalty too.
          </Callout>
        )}
        <Callout title="The five-year rules">
          Each conversion has its own five-year clock for the 10% penalty if you are under 59½. Earnings are tax-free only once you are 59½ and five years have
          passed since your first Roth contribution or conversion. Conversions can&apos;t be undone.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate based on 2026 tax brackets and steady returns. Not tax or financial advice.
      </p>
    </Studio>
  );
}
