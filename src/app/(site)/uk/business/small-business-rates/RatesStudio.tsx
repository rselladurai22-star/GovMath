"use client";

import { LARGE_THRESHOLD, ratesStudy, SBRR_LOWER, SBRR_UPPER_TAPER } from "@/lib/business/small-business-rates";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent, per } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  rv: num(14_000, 0, 100_000_000),
  rhl: bool(false),
  only: bool(true),
  charity: bool(false),
  days: num(365, 1, 365),
  last: num(0, 0, 100_000_000),
};
const ADVANCED = ["charity", "days", "last"] as const;
const COLORS = { relief: "#0f9f6e", pay: "#e11d48", charity: "#5b1e6e" };
const pence = (m: number) => `${(m * 100).toFixed(1)}p`;

export default function RatesStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { rateableValue: v.rv, retailHospitalityLeisure: v.rhl, onlyProperty: v.only, charity: v.charity, days: v.days, lastBill: v.last };
  const r = ratesStudy(input);
  const ladder = Array.from(new Set([10_000, 12_000, 13_500, 15_000, 25_000, 50_000, 75_000, Math.round(v.rv)]))
    .filter((x) => x > 0)
    .sort((a, b) => a - b)
    .map((x) => ({ x, b: ratesStudy({ ...input, rateableValue: x, days: 365, lastBill: 0 }) }));
  const maxBill = Math.max(...ladder.map((l) => l.b.fullYear), 1);
  const smallMult = v.rv < 51_000;
  const tapering = v.only && v.rv > SBRR_LOWER && v.rv < SBRR_UPPER_TAPER;
  const multiplierName = v.rv >= LARGE_THRESHOLD ? "high-value multiplier" : `${smallMult ? "small business" : "standard"}${v.rhl ? " retail, hospitality and leisure" : ""} multiplier`;

  return (
    <Studio
      title="Your business property"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my business rates"
      onReset={st.reset}
      dock={{ label: "Rates to pay", value: gbp(r.bill) }}
      inputs={
        <>
          <InputGroup title="The property">
            <MoneyField label="Rateable value" value={v.rv} onChange={st.bind("rv")} big slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100k"] }} hint="From the Valuation Office Agency. New values from the 2026 revaluation apply from 1 April 2026." />
            <Switch label="Used mainly for retail, hospitality or leisure" checked={v.rhl} onChange={st.bind("rhl")} hint="Shops, cafés, pubs, restaurants, hotels, gyms and similar. They get lower multipliers from April 2026." />
            <Switch label="This is my only business property" checked={v.only} onChange={st.bind("only")} hint="Small business rate relief needs this, or other properties each under £2,900." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Charity or community sports club" checked={v.charity} onChange={st.bind("charity")} optional hint="80% mandatory relief, and councils can top it up." />
            <StepperField label="Days occupied in the rates year" value={v.days} onChange={(n) => st.set("days", Math.round(n))} step={1} min={1} max={365} unit="days" dp={0} optional hint="If you move in or out during 1 April 2026 to 31 March 2027." />
            <MoneyField label="Last year's bill" value={v.last} onChange={st.bind("last")} optional hint="Your 2025/26 bill, to see how much it has changed." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Business rates to pay"
        value={gbp(r.bill)}
        unit={v.days < 365 ? `for ${v.days} ${per(v.days, "days")}` : "a year"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.bill <= 0 && r.reliefPercent >= 100 ? (
            <>
              With a rateable value of <b>{gbp(v.rv)}</b> and only one property, small business rate relief takes the whole <b>{gbp(r.grossRates)}</b> bill to <b>£0</b>.
            </>
          ) : (
            <>
              A rateable value of <b>{gbp(v.rv)}</b> × the <b>{pence(r.multiplier)}</b> {multiplierName} gives <b>{gbp(r.grossRates)}</b>.{" "}
              {r.reliefAmount > 0 ? (
                <>
                  Small business rate relief of <b>{percent(r.reliefPercent / 100, 0)}</b> takes off <b>{gbp(r.reliefAmount)}</b>.{" "}
                </>
              ) : null}
              {r.charityRelief > 0 ? <>Charity relief takes off <b>{gbp(r.charityRelief)}</b>. </> : null}
              You pay <b>{gbp(r.bill)}</b>, or about <b>{gbp(r.monthly)}</b> a month over 10 instalments.
            </>
          )
        }
        badges={[`${pence(r.multiplier)} multiplier`, `${percent(r.reliefPercent / 100, 0)} small business relief`, "England, 2026/27"]}
      />

      <Facts
        items={[
          { label: "Before relief", value: gbp(r.grossRates) },
          { label: "Small business relief", value: gbp(r.reliefAmount), tone: r.reliefAmount > 0 ? "good" : undefined, note: `${percent(r.reliefPercent / 100, 0)}` },
          { label: "To pay", value: gbp(r.bill), tone: r.bill > 0 ? "warn" : "good" },
          v.last > 0
            ? { label: "Change from last year", value: `${r.change >= 0 ? "+" : "−"}${gbp(Math.abs(r.change))}`, tone: r.change > 0 ? "bad" : "good" }
            : { label: "Monthly (10 instalments)", value: gbp(r.monthly) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Nation", value: "England" },
          { label: "Rates year", value: "1 April 2026 to 31 March 2027" },
          { label: "Multiplier", value: `${pence(r.multiplier)}, ${multiplierName}` },
          { label: "Other reliefs", value: "Transitional and supporting small business relief not included" },
        ]}
        note="Your council's bill is the final word. It may include reliefs we cannot see."
      />

      {r.grossRates > 0 && (
        <ResultCard title="Your bill and relief" sub="The full rates charge, split into relief and what you pay.">
          <SplitBar
            segments={[
              ...(r.reliefAmount > 0 ? [{ label: "Small business rate relief", value: r.reliefAmount, display: gbp(r.reliefAmount), color: COLORS.relief }] : []),
              ...(r.charityRelief > 0 ? [{ label: "Charity relief", value: r.charityRelief, display: gbp(r.charityRelief), color: COLORS.charity }] : []),
              ...(r.fullYear > 0 ? [{ label: "You pay", value: r.fullYear, display: gbp(r.fullYear), color: COLORS.pay }] : []),
            ]}
          />
          <Statement
            columns={["2026/27"]}
            rows={[
              { label: "Rateable value", values: [gbp(v.rv)] },
              { label: `× ${pence(r.multiplier)} multiplier`, values: [gbp(r.grossRates)] },
              ...(r.reliefAmount > 0 ? [{ label: `Small business rate relief (${percent(r.reliefPercent / 100, 0)})`, values: [`−${gbp(r.reliefAmount)}`], kind: "deduction" as const }] : []),
              ...(r.charityRelief > 0 ? [{ label: "Charity relief (80%)", values: [`−${gbp(r.charityRelief)}`], kind: "deduction" as const }] : []),
              ...(v.days < 365 ? [{ label: `For ${v.days} of 365 days`, values: [gbp(r.bill)] }] : []),
              { label: "To pay", values: [gbp(r.bill)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Bills at other rateable values" sub="Relief falls away between £12,000 and £15,000.">
        <Compare
          head={["Rateable value", "Bill a year"]}
          rows={ladder.map(({ x, b }) => ({
            label: gbp(x),
            value: gbp(b.fullYear),
            delta: b.reliefPercent > 0 ? `${Math.round(b.reliefPercent)}% relief` : undefined,
            deltaTone: "down",
            bar: b.fullYear / maxBill,
            current: x === Math.round(v.rv),
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Reliefs and checks.">
        {tapering && (
          <Callout title="You are in the taper">
            Between £12,000 and £15,000 the relief falls by about 3.3 percentage points for every £100 of rateable value. A successful challenge to your valuation could be worth a lot.
          </Callout>
        )}
        {!v.only && v.rv <= SBRR_UPPER_TAPER && (
          <Callout tone="warn" title="Other properties can stop the relief">
            You can keep small business rate relief on your main property if each other property has a rateable value under £2,900 and the total is under £20,000, or £28,000 in London.
          </Callout>
        )}
        {r.mayGetCap && (
          <Callout tone="good" title="Your increase may be capped">
            Your bill is up by more than £800. If you lost small business or rural rate relief at the 2026 revaluation, Supporting Small Business relief limits the rise to £800 or the
            transitional relief cap, whichever is higher. Councils apply it automatically.
          </Callout>
        )}
        <Callout title="Ask your council">
          Small business rate relief is not always applied automatically. Contact your council if your bill does not show it, and check your rateable value on GOV.UK.
        </Callout>
        <Callout title="Scotland, Wales and Northern Ireland">
          This calculator uses the rules for England. The other nations have their own multipliers and relief schemes.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England, rates year 2026/27. Not financial advice.
      </p>
    </Studio>
  );
}
