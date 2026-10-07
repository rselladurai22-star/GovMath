"use client";

import { retirement } from "@/lib/us/savings";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, usd, usdShort } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  age: num(35, 18, 90),
  retire: num(67, 19, 90),
  life: num(92, 20, 110),
  saved: num(50_000, 0, 100_000_000),
  monthly: num(800, 0, 1_000_000),
  spending: num(60_000, 0, 10_000_000),
  ss: num(24_000, 0, 1_000_000),
  ret: num(7, -10, 20),
  retired: num(5, -10, 20),
  infl: num(2.5, 0, 10),
};
const ADVANCED = ["ret", "retired", "infl", "life"] as const;

export default function RetirementStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const retireAge = Math.max(v.age, v.retire);
  const lifeTo = Math.max(retireAge, v.life);
  const r = retirement({
    age: v.age,
    retireAge,
    lifeTo,
    saved: v.saved,
    monthly: v.monthly,
    returnPct: v.ret,
    retiredReturnPct: v.retired,
    inflationPct: v.infl,
    spending: v.spending,
    socialSecurity: v.ss,
  });
  const work = retireAge - v.age;
  const f = Math.pow(1 + v.infl / 100, work);
  const atToday = r.atRetirement / f;
  const shortfall = Math.max(0, r.needed - r.atRetirement);
  const onTrack = shortfall < 1;
  const fourPctIncome = atToday * 0.04;
  const coveredBySs = Math.min(v.ss, v.spending);

  const ages = r.path.map((p) => p.age);
  const bal = r.path.map((p) => p.balance);

  return (
    <Studio
      title="Your retirement plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my retirement"
      onReset={st.reset}
      dock={{ label: onTrack ? "On track" : "Shortfall", value: onTrack ? usd(r.atRetirement) : usd(shortfall) }}
      inputs={
        <>
          <InputGroup title="Timing">
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={90} unit="years" dp={0} />
            <StepperField label="Retirement age" value={v.retire} onChange={(n) => st.set("retire", Math.round(n))} step={1} min={19} max={90} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="Savings">
            <MoneyField label="Retirement savings now" value={v.saved} onChange={st.bind("saved")} symbol="$" info="Everything set aside for retirement: 401(k), 403(b), IRAs and other investments." />
            <MoneyField label="You save each month" value={v.monthly} onChange={st.bind("monthly")} symbol="$" slider={{ min: 0, max: 5_000, step: 50, ends: ["$0", "$5k"] }} info="Include your employer's match." />
          </InputGroup>
          <InputGroup title="Retirement income">
            <MoneyField label="Yearly spending in retirement" value={v.spending} onChange={st.bind("spending")} symbol="$" info="In today's dollars, before tax. Many people plan on 70% to 80% of their pay before retirement." />
            <MoneyField label="Social Security and pensions a year" value={v.ss} onChange={st.bind("ss")} symbol="$" info="In today's dollars. Your estimate is in your my Social Security account at ssa.gov. The average retired worker got about $2,071 a month in January 2026." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Return before retirement" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={20} unit="%" dp={1} optional info="A year, after fees and before inflation." />
            <StepperField label="Return in retirement" value={v.retired} onChange={st.bind("retired")} step={0.5} min={-10} max={20} unit="%" dp={1} optional info="Usually lower, as portfolios hold more bonds and cash." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Your spending and Social Security rise with it each year." />
            <StepperField label="Plan to age" value={v.life} onChange={(n) => st.set("life", Math.round(n))} step={1} min={20} max={110} unit="years" dp={0} optional info="Plan for longer than average so you don't run out." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={onTrack ? "You're on track" : "You may fall short"}
        value={onTrack ? usd(r.atRetirement) : usd(shortfall)}
        unit={onTrack ? `saved by ${retireAge}` : "shortfall at retirement"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          onTrack ? (
            <>
              You could have <b>{usd(r.atRetirement)}</b>{" "}at {retireAge} (<b>{usd(atToday)}</b>{" "}in today&apos;s dollars). You need about <b>{usd(r.needed)}</b>{" "}to pay your spending gap to age {lifeTo}, so your
              money should last.
            </>
          ) : (
            <>
              You could have <b>{usd(r.atRetirement)}</b>{" "}at {retireAge}, but you need about <b>{usd(r.needed)}</b>. The money runs out at about <b>{r.lastsTo}</b>.{" "}
              {work > 0 ? (
                <>
                  Saving about <b>{usd(r.extraMonthly)}</b>{" "}more a month would close the gap.
                </>
              ) : (
                <>Retiring later or spending less would help.</>
              )}
            </>
          )
        }
        badges={[`Money lasts to ${r.lastsTo}`, `4% rule target ${usd(r.fourPercent)}`, `Yearly gap ${usd(r.gapToday)}`]}
      />

      <Facts
        items={[
          { label: "Saved at retirement", value: usd(r.atRetirement), note: `${usd(atToday)} in today's dollars` },
          { label: "Needed at retirement", value: usd(r.needed) },
          { label: "Extra a month to be on track", value: usd(r.extraMonthly), tone: r.extraMonthly > 0 ? "warn" : "good" },
          { label: "Money lasts to age", value: `${r.lastsTo}`, tone: r.lastsTo >= lifeTo ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Saving", value: `${usd(v.monthly)} a month for ${work} ${per(work, "years")}, the same each month` },
          { label: "Returns", value: `${v.ret}% a year before retirement, ${v.retired}% after` },
          { label: "Spending", value: `${usd(v.spending)} a year in today's dollars, rising ${v.infl}% a year, taken at the start of each year` },
          { label: "Social Security", value: `${usd(v.ss)} a year in today's dollars, rising with inflation, from retirement` },
          { label: "Tax", value: "Not included: enter spending before tax" },
        ]}
      />

      <ResultCard title="Your savings by age" sub="Growing until you retire, then paying your spending gap.">
        <AreaChart
          ariaLabel="Retirement savings by age"
          series={[{ key: "bal", label: "Savings", color: "#0f9f6e", values: bal, fill: true }]}
          xLabel={(i) => `${ages[i] ?? ""}`}
          yFormat={usdShort}
          initial={Math.min(work, bal.length - 1)}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              At <b>{ages[i]}</b>: savings of <b>{usd(bal[i] ?? 0)}</b>
              {(ages[i] ?? 0) <= retireAge ? " while you are still saving" : " after the year's spending"}.
            </>
          )}
        />
        <SplitBar
          caption="Your yearly spending in retirement, in today's dollars."
          segments={[
            { label: "Social Security and pensions", value: coveredBySs, display: usd(coveredBySs), color: "#5b1e6e" },
            { label: "From your savings", value: r.gapToday, display: usd(r.gapToday), color: "#0f9f6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="The 4% rule check" sub="A second, more cautious way to test the plan.">
        <Callout tone={atToday >= r.fourPercent ? "good" : "warn"} title={atToday >= r.fourPercent ? "You pass the 4% rule" : "Short of the 4% rule"}>
          The 4% rule suggests saving 25 times the yearly gap your savings must cover: {usd(r.fourPercent)} in today&apos;s dollars. You are on course for {usd(atToday)} in today&apos;s dollars, which at 4% would pay about{" "}
          {usd(fourPctIncome)} a year, rising with inflation.
        </Callout>
        {v.retire < 67 && v.ss > 0 && (
          <Callout title="Claiming Social Security early">
            Full retirement age is 67 for anyone born in 1960 or later. Claiming at 62 cuts your benefit by up to 30% for life, so make sure the Social Security figure you entered matches the age you will claim.
          </Callout>
        )}
        {lifeTo <= retireAge && <Callout title="Check your ages">Your plan-to age is not after your retirement age, so there are no retirement years to pay for.</Callout>}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        A projection, not a promise. Returns, inflation and Social Security can all differ from these assumptions. Not financial advice.
      </p>
    </Studio>
  );
}
