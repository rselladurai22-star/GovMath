"use client";

import { freeHours, minimumWeeklyEarnings, taxFreeChildcarePlan, type ChildStage } from "@/lib/benefits/family";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, whole, per } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  stage: oneOf<ChildStage>("3-4", ["under9m", "9m-2", "2", "3-4"]),
  working: bool(true),
  benefits: bool(false),
  hours: num(40, 0, 60),
  weeks: num(48, 1, 52),
  rate: num(8.5, 0, 50),
  extras: num(0, 0, 500),
  earnings: num(0, 0, 100_000),
  over100k: bool(false),
};
const ADVANCED = ["weeks", "extras", "earnings", "over100k"] as const;
const COLORS = { funded: "#0f9f6e", tfc: "#5b1e6e", you: "#f59e0b" };
const STAGE_LABEL: Record<ChildStage, string> = { under9m: "Under 9 months", "9m-2": "9 months to 2 years", "2": "2 years old", "3-4": "3 or 4 years old" };
const MIN_EARNINGS = minimumWeeklyEarnings("national-living-wage");

export default function FreeHoursStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const earningsTooLow = v.earnings > 0 && v.earnings < MIN_EARNINGS;
  const working = v.working && !v.over100k && !earningsTooLow;
  const r = freeHours({ stage: v.stage, working, lowIncome: v.benefits, hoursUsed: v.hours, weeksUsed: v.weeks, hourlyRate: v.rate, extrasWeekly: v.extras });
  const tfc = working ? taxFreeChildcarePlan([{ cost: r.youPay, disabled: false }]) : null;
  const finalPay = tfc ? tfc.youPay : r.youPay;
  const lostWorking = v.working && !working && (v.stage === "9m-2" || v.stage === "2" || v.stage === "3-4");

  return (
    <Studio
      title="Your child and childcare"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my free hours"
      onReset={st.reset}
      dock={{ label: "Funded hours a week", value: `${r.hoursPerWeek} ${per(r.hoursPerWeek, "hours")}` }}
      inputs={
        <>
          <InputGroup title="Your child">
            <SelectField label="Child's age" value={v.stage} onChange={st.bind("stage")} options={(Object.keys(STAGE_LABEL) as ChildStage[]).map((k) => ({ value: k, label: STAGE_LABEL[k] }))} hint="Funding starts the term after your child reaches the age." />
            <Switch label="All parents in the household work" checked={v.working} onChange={st.bind("working")} hint={`Each earning at least ${gbp(MIN_EARNINGS, true)} a week (16 hours at the National Living Wage). Includes self-employed, and those on leave.`} />
            {!v.working && v.stage === "2" && <Switch label="Getting Universal Credit or certain other benefits" checked={v.benefits} onChange={st.bind("benefits")} hint="Some 2-year-olds get 15 hours whatever their parents' work, for example if you get Universal Credit with low earnings." />}
          </InputGroup>
          <InputGroup title="Your childcare">
            <StepperField label="Hours of childcare a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={60} unit="hours" dp={0} />
            <MoneyField label="Provider's hourly rate" value={v.rate} onChange={st.bind("rate")} pence />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks of childcare a year" value={v.weeks} onChange={st.bind("weeks")} step={1} min={1} max={52} unit="weeks" dp={0} optional hint="Term time only is 38 weeks. All year round is usually 48 to 51." />
            <MoneyField label="Extra charges a week" value={v.extras} onChange={st.bind("extras")} pence optional hint="Meals, nappies, trips: providers can charge for these on top of funded hours." />
            <MoneyField label="Lowest-earning parent's weekly earnings" value={v.earnings} onChange={st.bind("earnings")} optional hint="To check the minimum earnings test." />
            <Switch label="A parent has income over £100,000" checked={v.over100k} onChange={st.bind("over100k")} optional hint="Adjusted net income over £100,000 rules out the working parent hours." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Funded childcare"
        value={`${r.hoursPerWeek} ${per(r.hoursPerWeek, "hours")}`}
        unit={r.hoursPerWeek > 0 ? "a week, 38 weeks a year" : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.hoursPerWeek === 0 ? (
            v.stage === "under9m" ? (
              <>Funded hours start the term after your child turns 9 months, for working parents.</>
            ) : (
              <>You do not look eligible for funded hours at this age. Working parents get 30 hours from 9 months; some 2-year-olds get 15 hours if the family gets certain benefits.</>
            )
          ) : (
            <>
              That is <b>{whole(r.annualHours)}</b> funded hours a year, worth about <b>{gbp(r.value)}</b> at your provider&apos;s rate. Spread over {v.weeks} {per(v.weeks, "weeks")} it is about{" "}
              <b>{r.stretchedWeekly.toFixed(1)}</b> hours a week. You pay about <b>{gbp(finalPay)}</b> a year for the rest{tfc && tfc.topUp > 0 ? ", after Tax-Free Childcare" : ""}.
            </>
          )
        }
        badges={[STAGE_LABEL[v.stage], r.route === "working" ? "Working parent hours" : r.route === "universal" ? "Universal 15 hours" : r.route === "disadvantaged" ? "15 hours for 2-year-olds" : "Not eligible", "England"]}
      />

      <Facts
        items={[
          { label: "Funded hours a year", value: whole(r.annualHours) },
          { label: "Value of funded hours", value: gbp(r.value), tone: "good" },
          { label: "Childcare cost before help", value: gbp(r.fullCost) },
          { label: "You pay", value: gbp(finalPay), note: `About ${gbp(finalPay / 12)} a month` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Nation", value: "England" },
          { label: "Funded weeks", value: "38 a year, can be stretched" },
          { label: "Childcare", value: `${v.hours} ${per(v.hours, "hours")} for ${v.weeks} ${per(v.weeks, "weeks")} at ${gbp(v.rate, true)}` },
          { label: "Tax-Free Childcare", value: working ? "Used for the rest" : "Not eligible" },
        ]}
      />

      {r.fullCost > 0 && (
        <ResultCard title="Your childcare bill, split" sub="A year of childcare and who pays for it.">
          <SplitBar
            segments={[
              ...(r.value > 0 ? [{ label: "Funded hours", value: r.value, display: gbp(r.value), color: COLORS.funded }] : []),
              ...(tfc && tfc.topUp > 0 ? [{ label: "Tax-Free Childcare top-up", value: tfc.topUp, display: gbp(tfc.topUp), color: COLORS.tfc }] : []),
              { label: "You pay", value: finalPay, display: gbp(finalPay), color: COLORS.you },
            ]}
          />
          <Statement
            columns={["A year"]}
            rows={[
              { label: `${v.hours} ${per(v.hours, "hours")} × ${v.weeks} ${per(v.weeks, "weeks")} × ${gbp(v.rate, true)}`, values: [gbp(v.hours * v.weeks * v.rate)] },
              ...(v.extras > 0 ? [{ label: "Extra charges", values: [gbp(v.extras * v.weeks)] }] : []),
              ...(r.value > 0 ? [{ label: "Funded hours", values: [`−${gbp(r.value)}`], kind: "deduction" as const }] : []),
              ...(tfc && tfc.topUp > 0 ? [{ label: "Tax-Free Childcare (20%)", values: [`−${gbp(tfc.topUp)}`], kind: "deduction" as const }] : []),
              { label: "You pay", values: [gbp(finalPay)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Applying and keeping your place.">
        {lostWorking && (
          <Callout tone="warn" title="You may not meet the working parent test">
            {v.over100k
              ? "A parent with adjusted net income over £100,000 rules the household out of the working parent hours. A pension contribution can bring income back under the limit."
              : `Each parent needs to expect to earn at least ${gbp(MIN_EARNINGS, true)} a week on average over the next three months. Lower limits apply to under-21s and apprentices.`}
          </Callout>
        )}
        {r.route === "working" && (
          <Callout title="Reconfirm every three months">
            You get a code to give your provider, and must reconfirm your details every three months through your childcare account. Missing it can mean losing the place.
          </Callout>
        )}
        <Callout title="Apply the term before">
          Apply for the working parent hours before the end of the term before your child becomes eligible. Funding starts on 1 January, 1 April or 1 September.
        </Callout>
        <Callout title="Scotland, Wales and Northern Ireland">
          The schemes differ. In Scotland every 3 and 4-year-old, and some 2-year-olds, get 1,140 hours a year whatever their parents&apos; work.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England, 2026/27. Not financial advice.
      </p>
    </Studio>
  );
}
