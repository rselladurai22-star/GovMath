"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { formatDate } from "@/lib/life/calendar";
import { VAT_THRESHOLD_2026, vatThreshold } from "@/lib/business/freelance";

const SCHEMA = {
  rolling: num(84_000, 0, 100_000_000),
  monthEnd: date("2026-09-30"),
  nextMonth: num(8_000, 0, 10_000_000),
  dropping: num(5_000, 0, 10_000_000),
  next30: num(8_000, 0, 100_000_000),
  consumers: num(100, 0, 100),
  costs: num(6_000, 0, 10_000_000),
};
const ADVANCED = ["next30", "consumers", "costs"] as const;

export default function VatThresholdStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = vatThreshold({ rolling: v.rolling, next30: v.next30, nextMonth: v.nextMonth, droppingOut: v.dropping, monthEnd: v.monthEnd, consumerShare: v.consumers / 100, costsWithVat: v.costs });
  const T = VAT_THRESHOLD_2026;
  const status = r.overNow ? "Register now" : r.overNext30 ? "Register now: next 30 days" : r.crossesNextMonth ? "Over next month" : "Below the threshold";
  const used = Math.min(1.2, v.rolling / T.register);

  return (
    <Studio
      title="Your turnover"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check the VAT threshold"
      onReset={st.reset}
      dock={{ label: "Status", value: status }}
      inputs={
        <>
          <InputGroup title="The last 12 months">
            <MoneyField label="Taxable turnover in the last 12 months" value={v.rolling} onChange={st.bind("rolling")} big slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} hint="Sales that are not exempt from VAT, including zero-rated sales. Not profit." />
            <DateField label="Last day of the month this runs to" value={v.monthEnd} onChange={st.bind("monthEnd")} />
          </InputGroup>
          <InputGroup title="Next month">
            <MoneyField label="Turnover expected next month" value={v.nextMonth} onChange={st.bind("nextMonth")} />
            <MoneyField label="Turnover in the month that drops out" value={v.dropping} onChange={st.bind("dropping")} hint="The month 12 months ago, which leaves the rolling total next month." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Turnover expected in the next 30 days alone" value={v.next30} onChange={st.bind("next30")} optional hint="If this alone is over £90,000, you must register straight away." />
            <StepperField label="Sales to consumers" value={v.consumers} onChange={st.bind("consumers")} step={5} min={0} max={100} unit="%" dp={0} optional hint="Customers who cannot reclaim VAT, so you may have to absorb it if you keep prices the same." />
            <MoneyField label="Costs a year with VAT you could reclaim" value={v.costs} onChange={st.bind("costs")} optional hint="Including VAT. Once registered you reclaim the VAT on these." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="VAT registration"
        value={status}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.overNow ? (
            <>
              Your rolling turnover of <b>{gbp(v.rolling)}</b> is over £90,000. Register by <b>{formatDate(r.notifyBy ?? v.monthEnd, "medium")}</b>; you will be VAT registered from <b>{formatDate(r.registeredFrom ?? v.monthEnd, "medium")}</b>.
            </>
          ) : r.overNext30 ? (
            <>You expect more than £90,000 in the next 30 days alone, so you must register by the end of that 30-day period, and charge VAT from its start.</>
          ) : (
            <>
              You are <b>{gbp(r.headroom)}</b> below the £90,000 threshold. Next month your rolling total would be <b>{gbp(r.nextRolling)}</b>
              {r.crossesNextMonth ? <>, <b>over the threshold</b>: you would then have 30 days to register.</> : <>, still below it.</>}
            </>
          )
        }
        badges={[`Rolling ${gbp(v.rolling)}`, `${percent(v.rolling / T.register)} of the threshold`, "Threshold £90,000"]}
      />

      <Facts
        items={[
          { label: "Headroom", value: gbp(Math.max(0, r.headroom)), tone: r.headroom < 10_000 ? "warn" : "good" },
          { label: "Rolling total next month", value: gbp(r.nextRolling), tone: r.nextRolling > T.register ? "bad" : undefined },
          { label: "Deregistration threshold", value: gbp(T.deregister) },
          { label: "Yearly VAT cost if prices stay", value: gbp(Math.max(0, r.yearlyCost)) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Threshold", value: "£90,000 to register, £88,000 to deregister, from April 2024" },
          { label: "Test", value: "Rolling 12 months, checked at the end of each month" },
          { label: "Turnover", value: "Taxable supplies only; exempt sales do not count" },
          { label: "VAT rate", value: "20% standard rate on all sales" },
        ]}
      />

      <ResultCard title="Your rolling total" sub="Against the £90,000 threshold.">
        <Compare
          head={["Period", "Turnover"]}
          rows={[
            { label: "Last 12 months", value: gbp(v.rolling), bar: Math.min(1, used), delta: percent(v.rolling / T.register), current: true },
            { label: "Next month's 12 months", value: gbp(r.nextRolling), bar: Math.min(1, r.nextRolling / T.register / 1.2), delta: percent(r.nextRolling / T.register) },
            { label: "Threshold", value: gbp(T.register), bar: 1 / 1.2 },
          ]}
        />
      </ResultCard>

      <ResultCard title="What it means">
        {r.yearlyCost > 0 && (
          <Callout tone="warn" title={`Registering could cost about ${gbp(r.yearlyCost)} a year`}>
            If you keep your prices the same, a sixth of what consumers pay goes to HMRC as VAT, less the VAT you reclaim on costs. Business customers can usually reclaim VAT, so you can add it to their prices.
          </Callout>
        )}
        <Callout title="Consider the Flat Rate Scheme">
          Small businesses can pay a fixed percentage of turnover instead of working out VAT on every sale and cost. Compare with the <a href="/business/flat-rate-vat">Flat Rate VAT calculator</a>.
        </Callout>
        <Callout title="Late registration is costly">
          If you register late, HMRC backdates your registration and you owe VAT on sales since then, whether or not you charged it, plus a penalty.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 VAT thresholds. Some businesses must register whatever their turnover, for example those based outside the UK.
      </p>
    </Studio>
  );
}
