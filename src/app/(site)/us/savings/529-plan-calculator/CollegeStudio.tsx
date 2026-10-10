"use client";

import { COLLEGE_COST_2025_26, collegePlan, GIFT_EXCLUSION_2026, ROTH_ROLLOVER_LIFETIME, SUPERFUND_YEARS, type CollegeType } from "@/lib/us/retirement-income";
import { grow } from "@/lib/us/savings";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const TYPES = ["publicIn", "publicOut", "private", "publicTwo", "custom"] as const;
type Choice = CollegeType | "custom";

const SCHEMA = {
  childAge: num(3, 0, 17),
  type: oneOf<Choice>("publicIn", TYPES),
  saved: num(5_000, 0, 10_000_000),
  ret: num(6, -10, 15),
  cover: num(100, 0, 100),
  custom: num(30_000, 0, 500_000),
  startAge: num(18, 14, 30),
  yearsIn: num(4, 1, 8),
  infl: num(4, 0, 10),
  planned: num(0, 0, 100_000),
  stateCap: num(0, 0, 1_000_000),
  stateRate: num(0, 0, 15),
};
const ADVANCED = ["custom", "startAge", "yearsIn", "infl", "planned", "stateCap", "stateRate"] as const;

export default function CollegeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const preset = v.type === "custom" ? null : COLLEGE_COST_2025_26[v.type];
  const costToday = preset ? preset.total : v.custom;
  const yearsUntil = Math.max(0, v.startAge - v.childAge);
  const plan = collegePlan({ costToday, yearsUntil, yearsInCollege: v.yearsIn, inflationPct: v.infl, saved: v.saved, returnPct: v.ret, cover: v.cover / 100, monthlyPlanned: v.planned });
  const months = yearsUntil * 12;
  const monthly = plan.monthlyNeeded;
  const grownStart = grow(v.saved, 0, v.ret, yearsUntil, "monthly").balance;
  const deposits = monthly * months;
  const growth = Math.max(0, plan.target - grownStart - deposits);
  const covered = grownStart >= plan.target;
  // Show the path for the planned amount if one is entered, otherwise for the amount needed.
  const shownMonthly = v.planned > 0 ? v.planned : monthly;
  const path = collegePlan({ costToday, yearsUntil, yearsInCollege: v.yearsIn, inflationPct: v.infl, saved: v.saved, returnPct: v.ret, cover: v.cover / 100, monthlyPlanned: shownMonthly }).path;
  const bal = path.map((p) => p.balance);
  const paid = path.map((p) => p.deposits);
  const target = path.map(() => plan.target);
  const stateSaving = (Math.min(monthly * 12, v.stateCap) * v.stateRate) / 100;
  const superfund = GIFT_EXCLUSION_2026 * SUPERFUND_YEARS;
  const typeLabel = preset ? preset.label : "Your own figure";

  return (
    <Studio
      title="Your 529 plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my 529 saving"
      onReset={st.reset}
      dock={{ label: "Save each month", value: usd(monthly) }}
      inputs={
        <>
          <InputGroup title="Your child and college">
            <StepperField label="Child's age now" value={v.childAge} onChange={(n) => st.set("childAge", Math.round(n))} step={1} min={0} max={17} unit="years" dp={0} />
            <SelectField
              label="Type of college"
              value={v.type}
              onChange={st.bind("type")}
              info="Average 2025-26 published tuition and fees plus housing and food, from the College Board. Books, transport and personal costs are extra."
              options={[
                { value: "publicIn", label: `Public 4-year, in-state (${usd(COLLEGE_COST_2025_26.publicIn.total)})` },
                { value: "publicOut", label: `Public 4-year, out-of-state (${usd(COLLEGE_COST_2025_26.publicOut.total)})` },
                { value: "private", label: `Private nonprofit 4-year (${usd(COLLEGE_COST_2025_26.private.total)})` },
                { value: "publicTwo", label: `Public 2-year (${usd(COLLEGE_COST_2025_26.publicTwo.total)})` },
                { value: "custom", label: "My own yearly cost" },
              ]}
            />
            <MoneyField label="Saved for college so far" value={v.saved} onChange={st.bind("saved")} symbol="$" />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={15} unit="%" dp={1} info="Age-based 529 portfolios start mostly in stocks and move to bonds and cash near college. 5% to 6% is a common planning figure; not guaranteed." />
            <StepperField label="Share of the cost to save for" value={v.cover} onChange={(n) => st.set("cover", Math.round(n))} step={5} min={0} max={100} unit="%" dp={0} info="Many families aim to save part, and cover the rest from income, aid and student loans." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {v.type === "custom" && <MoneyField label="Yearly cost in today's dollars" value={v.custom} onChange={st.bind("custom")} symbol="$" optional info="Look up the cost of attendance on a college's website, after any expected grants." />}
            <StepperField label="Age starting college" value={v.startAge} onChange={(n) => st.set("startAge", Math.round(n))} step={1} min={14} max={30} unit="years" dp={0} optional />
            <StepperField label="Years in college" value={v.yearsIn} onChange={(n) => st.set("yearsIn", Math.round(n))} step={1} min={1} max={8} unit="years" dp={0} optional />
            <StepperField label="College cost inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Published prices rose 2.9% (public) to 4.0% (private) for 2025-26; over decades they have risen faster than general inflation." />
            <MoneyField label="You plan to save each month" value={v.planned} onChange={st.bind("planned")} symbol="$" optional info="Enter an amount to see how far it gets you." />
            <MoneyField label="State deduction limit for 529 contributions" value={v.stateCap} onChange={st.bind("stateCap")} symbol="$" optional info="Many states let you deduct contributions to their own plan, up to a yearly limit. Leave at $0 if yours doesn't." />
            <StepperField label="Your state income tax rate" value={v.stateRate} onChange={st.bind("stateRate")} step={0.25} min={0} max={15} unit="%" dp={2} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Save each month"
        value={usd(monthly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          covered ? (
            <>
              Your <b>{usd(v.saved)}</b>{" "}could grow to <b>{usd(grownStart)}</b>{" "}by college, enough for the <b>{usd(plan.target)}</b>{" "}you want to cover. No more saving
              needed at these assumptions.
            </>
          ) : yearsUntil === 0 ? (
            <>College starts now, so there is no time left to save. You need <b>{usd(Math.max(0, plan.target - v.saved))}</b>{" "}more for {v.cover}% of the cost.</>
          ) : (
            <>
              {v.yearsIn} {per(v.yearsIn, "years")} {preset ? `at a ${typeLabel.toLowerCase()} college` : `at ${usd(costToday)} a year`} could cost <b>{usd(plan.totalFuture)}</b>{" "}by the time your child starts in{" "}
              {yearsUntil} {per(yearsUntil, "years")}. To have <b>{usd(plan.target)}</b>{" "}({v.cover}%) by then, save about <b>{usd(monthly)}</b>{" "}a month.
            </>
          )
        }
        badges={[`Total cost ${usd(plan.totalFuture)}`, `Today's prices ${usd(plan.totalToday)}`, `${yearsUntil} ${per(yearsUntil, "years")} to go`]}
      />

      <Facts
        items={[
          { label: "First year's cost", value: usd(plan.costs[0]?.cost ?? 0) },
          { label: "Your target", value: usd(plan.target) },
          { label: "Monthly saving needed", value: usd(monthly), tone: covered ? "good" : undefined },
          {
            label: v.planned > 0 ? "Your plan reaches" : "Savings now grow to",
            value: usd(v.planned > 0 ? plan.projected : grownStart),
            note: v.planned > 0 ? `${percent(Math.min(9.99, plan.coverShare))} of the target` : undefined,
            tone: v.planned > 0 ? (plan.coverShare >= 1 ? "good" : "warn") : undefined,
          },
        ]}
      />

      <Assumptions
        items={[
          { label: "Cost today", value: `${usd(costToday)} a year: ${typeLabel}` },
          { label: "Cost growth", value: `${v.infl}% a year until each year of college` },
          { label: "Target", value: `${v.cover}% of all ${v.yearsIn} years, saved by the first year` },
          { label: "Saving", value: `Monthly, the same every month, earning ${v.ret}% a year` },
          { label: "Withdrawals", value: "For qualified education costs, so tax-free" },
        ]}
      />

      {!covered && yearsUntil > 0 && (
        <ResultCard title="Where the money comes from" sub="Your target, split by source.">
          <SplitBar
            segments={[
              { label: "Savings you have, grown", value: Math.min(grownStart, plan.target), display: usd(Math.min(grownStart, plan.target)), color: "#5b1e6e" },
              { label: "Your monthly saving", value: deposits, display: usd(deposits), color: "#94a3b8" },
              { label: "Tax-free growth on it", value: growth, display: usd(growth), color: "#0f9f6e" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Your 529 balance over time" sub={`Saving ${usd(shownMonthly)} a month${v.planned > 0 ? " (your plan)" : ""}, against your target.`}>
        <AreaChart
          ariaLabel="529 balance by child's age"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "paid", label: "Put in", color: "#94a3b8", values: paid, dashed: true },
            { key: "target", label: "Target", color: "#f59e0b", values: target, dashed: true },
          ]}
          xLabel={(i) => `${v.childAge + i}`}
          yFormat={usdShort}
          initial={bal.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              Child aged <b>{v.childAge + i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, of which <b>{usd((bal[i] ?? 0) - (paid[i] ?? 0))}</b>{" "}is growth.
            </>
          )}
        />
        <DataTable
          summary="See the cost of each year"
          columns={["Year of college", "Child's age", "Cost", "In today's dollars"]}
          rows={plan.costs.map((c, i) => [`Year ${i + 1}`, String(v.startAge + i), usd(c.cost), usd(costToday)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways to save more, and what if plans change.">
        {stateSaving > 0 && (
          <Callout tone="good" title={`About ${usd(stateSaving)} a year off your state tax`}>
            Deducting up to {usd(v.stateCap)} of contributions at {v.stateRate}% saves about {usd(stateSaving)} a year. Most states require you to use their own
            plan; a few give the deduction for any state&apos;s plan.
          </Callout>
        )}
        <Callout title="Grandparents and superfunding">
          Anyone can contribute. A 529 gift can be spread over five years for the gift tax exclusion, so one person can put in up to {usd(superfund)} at once in
          2026 ({usd(superfund * 2)} for a married couple) without using their lifetime exemption. File Form 709 to make the election.
        </Callout>
        <Callout title="If your child doesn't need it all">
          You can change the beneficiary to another family member, use up to {usd(ROTH_ROLLOVER_LIFETIME)} over a lifetime for Roth IRA rollovers for the
          beneficiary (account open 15+ years), or withdraw it: earnings are then taxed plus a 10% penalty, waived for scholarships up to their amount.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. College costs and returns vary. Not tax or financial advice.
      </p>
    </Studio>
  );
}
