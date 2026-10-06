"use client";

import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { JISA_2026, juniorIsa } from "@/lib/investing/savings";
import { CPI_LATEST } from "@/lib/investing/growth";

type Kind = "cash" | "stocks";
const DEFAULT_GROWTH: Record<Kind, number> = { cash: 3.5, stocks: 5 };

const SCHEMA = {
  age: num(0, 0, 17),
  monthly: num(100, 0, 750),
  lump: num(0, 0, 9_000),
  kind: oneOf<Kind>("stocks", ["cash", "stocks"]),
  growth: num(5, -5, 15),
  fees: num(0.5, 0, 3),
};
const ADVANCED = ["growth", "fees"] as const;

export default function JisaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const fees = v.kind === "cash" ? 0 : v.fees / 100;
  const r = juniorIsa({ lump: v.lump, monthly: v.monthly, childAge: v.age, growth: v.growth / 100, fees });
  const real = r.value / Math.pow(1 + CPI_LATEST.rate, r.years);
  const scenarios = [
    { label: "Cash at 3.5%", g: 0.035, f: 0 },
    { label: "Shares at 4%, 0.5% fees", g: 0.04, f: 0.005 },
    { label: "Shares at 5%, 0.5% fees", g: 0.05, f: 0.005 },
    { label: "Shares at 7%, 0.5% fees", g: 0.07, f: 0.005 },
  ].map((s) => ({ ...s, v: juniorIsa({ lump: v.lump, monthly: v.monthly, childAge: v.age, growth: s.g, fees: s.f }).value }));
  const maxS = Math.max(1, ...scenarios.map((s) => s.v));

  return (
    <Studio
      title="Your child and your savings plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See what it grows to"
      onReset={st.reset}
      dock={{ label: "At 18", value: gbp(r.value) }}
      inputs={
        <>
          <InputGroup title="Your plan">
            <StepperField label="Child's age now" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={0} max={17} unit="years" dp={0} />
            <MoneyField label="Paid in each month" value={v.monthly} onChange={st.bind("monthly")} slider={{ min: 0, max: 750, step: 10, ends: ["£0", "£750"] }} hint="Parents, grandparents and friends can all pay in, up to £9,000 a year in total." />
            <MoneyField label="Lump sum now" value={v.lump} onChange={st.bind("lump")} />
            <Segmented
              label="Type of Junior ISA"
              value={v.kind}
              onChange={(k) => {
                st.set("kind", k);
                st.set("growth", DEFAULT_GROWTH[k]);
              }}
              options={[
                { value: "cash", label: "Cash" },
                { value: "stocks", label: "Stocks and shares" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label={v.kind === "cash" ? "Interest rate" : "Growth a year, before fees"} value={v.growth} onChange={st.bind("growth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional hint="Stock market returns vary from year to year and can be negative." />
            {v.kind === "stocks" && <StepperField label="Fees a year" value={v.fees} onChange={st.bind("fees")} step={0.05} min={0} max={3} unit="%" dp={2} optional hint="Platform and fund charges together." />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Value at 18"
        value={gbp(r.value)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Paying in <b>{gbp(r.contributed)}</b> over {r.years} {r.years === 1 ? "year" : "years"} could grow to <b>{gbp(r.value)}</b> by your child&rsquo;s 18th birthday, of which <b>{gbp(r.growth)}</b> is growth. In
            today&rsquo;s prices that is about {gbp(real)}. All of it is tax-free, and it becomes your child&rsquo;s money at 18.
          </>
        }
        badges={[v.kind === "cash" ? "Cash Junior ISA" : "Stocks and shares", `${percent((v.growth / 100) - fees, 1)} a year after fees`, `${r.years} years to 18`]}
      />

      <Facts
        items={[
          { label: "Paid in", value: gbp(r.contributed) },
          { label: "Growth", value: gbp(r.growth), tone: r.growth >= 0 ? "good" : "warn" },
          { label: "In today's prices", value: gbp(real), note: `At ${percent(CPI_LATEST.rate, 1)} inflation` },
          { label: "This year's payments", value: gbp(r.firstYear), tone: r.overAllowance ? "bad" : undefined, note: `Limit ${gbp(JISA_2026.allowance)}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Growth", value: `${percent(v.growth / 100, 1)} a year, steady${v.kind === "stocks" ? `, less ${percent(fees, 2)} fees` : ""}` },
          { label: "Payments", value: "The same every month until 18, not increased with inflation" },
          { label: "Allowance", value: "£9,000 a year, frozen until 2030" },
          { label: "Tax", value: "None on interest, dividends or gains" },
        ]}
      />

      <ResultCard title="How it builds up" sub="Value at each birthday.">
        <AreaChart
          ariaLabel="Junior ISA value by age"
          series={[
            { key: "value", label: "Value", color: "#0f9f6e", values: r.path.map((p) => p.value), fill: true },
            { key: "paid", label: "Paid in", color: "#94a3b8", values: r.path.map((p) => p.contributed), dashed: true },
          ]}
          xLabel={(i) => `Age ${r.path[i]?.age ?? ""}`}
          yFormat={gbpShort}
          initial={r.path.length - 1}
          readout={(i) => {
            const p = r.path[i];
            if (!p) return null;
            return (
              <>
                At <b>{p.age}</b>: worth <b>{gbp(p.value)}</b>, {gbp(p.contributed)} paid in.
              </>
            );
          }}
          hint="Drag across the chart, or use the arrow keys, to read any birthday."
        />
        <SplitBar
          segments={[
            { label: "Paid in", value: r.contributed, display: gbp(r.contributed), color: "#5b1e6e" },
            { label: "Growth", value: Math.max(0, r.growth), display: gbp(Math.max(0, r.growth)), color: "#0f9f6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Cash or shares?" sub="The same payments with different returns.">
        <Compare head={["Return", "At 18"]} rows={scenarios.map((s) => ({ label: s.label, value: gbp(s.v), bar: s.v / maxS }))} />
      </ResultCard>

      <ResultCard title="Things to know">
        {r.overAllowance && (
          <Callout tone="warn" title="Over the £9,000 limit">
            Payments into a child&rsquo;s Junior ISAs cannot total more than £9,000 in a tax year (6 April to 5 April). Spread a large gift over several years.
          </Callout>
        )}
        <Callout title="It belongs to your child">
          Money in a Junior ISA cannot be taken out before 18, except if the child is terminally ill. At 18 it becomes an adult ISA in their name, and they decide what to do with it.
        </Callout>
        <Callout title="The £100 rule for other children's savings">
          If money a parent gives a child outside an ISA earns more than £100 a year in interest, all the interest is taxed as the parent&rsquo;s income. Junior ISAs are not affected.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Investments can fall as well as rise, and past returns do not predict future ones.
      </p>
    </Studio>
  );
}
