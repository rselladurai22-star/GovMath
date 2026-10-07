"use client";

import { apy, depositForGoal, monthsToGoal } from "@/lib/us/savings";
import { goalPath } from "@/lib/us/savings-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, Chips, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Mode = "deadline" | "monthly";

const SCHEMA = {
  mode: oneOf<Mode>("deadline", ["deadline", "monthly"]),
  goal: num(15_000, 0, 100_000_000),
  saved: num(2_000, 0, 100_000_000),
  months: num(12, 1, 600),
  monthly: num(500, 0, 1_000_000),
  rate: num(4, 0, 20),
  compare: num(0.38, 0, 20),
};
const ADVANCED = ["compare"] as const;

const PRESETS = [
  { value: "emergency", label: "Emergency fund", goal: 15_000, saved: 2_000, months: 12 },
  { value: "down", label: "Down payment", goal: 60_000, saved: 10_000, months: 36 },
  { value: "car", label: "Car", goal: 25_000, saved: 5_000, months: 24 },
  { value: "vacation", label: "Vacation", goal: 3_000, saved: 0, months: 10 },
] as const;

export default function GoalStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const done = v.saved >= v.goal;

  // Deadline mode: the monthly amount; monthly mode: the months it takes.
  const need = depositForGoal(v.goal, v.saved, v.rate, v.months);
  const needAtCompare = depositForGoal(v.goal, v.saved, v.compare, v.months);
  const takes = monthsToGoal(v.goal, v.saved, v.monthly, v.rate);
  const takesAtCompare = monthsToGoal(v.goal, v.saved, v.monthly, v.compare);
  const never = v.mode === "monthly" && !Number.isFinite(takes);

  const deposit = v.mode === "deadline" ? need : v.monthly;
  const months = v.mode === "deadline" ? Math.round(v.months) : Number.isFinite(takes) ? takes : 120;
  const path = goalPath(v.saved, deposit, v.rate, months);
  const end = path[path.length - 1];
  const interest = Math.max(0, end.balance - end.deposits);
  const yourMoney = end.deposits - Math.max(0, v.saved);
  const bal = path.map((p) => p.balance);
  const paid = path.map((p) => p.deposits);
  const preset = PRESETS.find((p) => p.goal === v.goal && p.saved === v.saved && p.months === v.months)?.value ?? null;

  const headline = done ? "Goal reached" : v.mode === "deadline" ? usd(need, true) : never ? "Never" : duration(takes);
  const eyebrow = v.mode === "deadline" ? `Save each month for ${duration(v.months)}` : "Time to reach your goal";

  return (
    <Studio
      title="Your savings goal"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my plan"
      onReset={st.reset}
      dock={{ label: eyebrow, value: headline }}
      inputs={
        <>
          <InputGroup title="Your goal">
            <Chips
              label="Example goals"
              value={preset}
              onChange={(k) => {
                const p = PRESETS.find((x) => x.value === k);
                if (!p) return;
                st.set("goal", p.goal);
                st.set("saved", p.saved);
                st.set("months", p.months);
              }}
              options={PRESETS.map((p) => ({ value: p.value, label: p.label }))}
            />
            <MoneyField label="Savings goal" value={v.goal} onChange={st.bind("goal")} symbol="$" slider={{ min: 0, max: 100_000, step: 500, ends: ["$0", "$100k"] }} />
            <MoneyField label="Already saved" value={v.saved} onChange={st.bind("saved")} symbol="$" />
            <StepperField label="Interest rate a year" value={v.rate} onChange={st.bind("rate")} step={0.05} min={0} max={20} unit="%" dp={2} info="Compounded monthly. The best online high-yield savings accounts paid around 4% in September 2026." />
          </InputGroup>
          <InputGroup title="Your plan">
            <Segmented
              label="What do you know?"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "deadline", label: "My deadline", note: "We work out the monthly amount." },
                { value: "monthly", label: "My monthly amount", note: "We work out how long it takes." },
              ]}
            />
            {v.mode === "deadline" ? (
              <StepperField label="Months to reach it" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={1} max={600} unit="months" dp={0} />
            ) : (
              <MoneyField label="You can save each month" value={v.monthly} onChange={st.bind("monthly")} symbol="$" slider={{ min: 0, max: 5_000, step: 25, ends: ["$0", "$5k"] }} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Compare with a rate of" value={v.compare} onChange={st.bind("compare")} step={0.05} min={0} max={20} unit="%" dp={2} optional info="The FDIC national average for savings accounts was about 0.38% in mid-2026." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={eyebrow}
        value={headline}
        unit={!done && v.mode === "deadline" ? "a month" : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          done ? (
            <>You already have {usd(v.saved)}, which meets your {usd(v.goal)} goal.</>
          ) : v.mode === "deadline" ? (
            <>
              Saving <b>{usd(need, true)}</b> a month for {duration(v.months)} turns your <b>{usd(v.saved)}</b> into <b>{usd(v.goal)}</b>. You put in <b>{usd(yourMoney)}</b> and interest adds <b>{usd(interest)}</b>.
            </>
          ) : never ? (
            <>With nothing going in each month and no interest, your savings won&apos;t reach {usd(v.goal)}. Add a monthly amount to see when you&apos;d get there.</>
          ) : (
            <>
              Saving <b>{usd(v.monthly)}</b> a month gets you from <b>{usd(v.saved)}</b> to <b>{usd(v.goal)}</b> in <b>{duration(takes)}</b>. Interest adds about <b>{usd(interest)}</b> along the way.
            </>
          )
        }
        badges={[`APY ${percent(apy(v.rate, "monthly"), 2)}`, `${usd(Math.max(0, v.goal - v.saved))} still to save`, `Interest ${usd(interest)}`]}
      />

      <Facts
        items={[
          { label: "Monthly saving", value: usd(deposit, true) },
          { label: "Time", value: never ? "Never" : duration(months) },
          { label: "Your deposits", value: usd(yourMoney) },
          { label: "Interest earned", value: usd(interest), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Deposits", value: "At the end of each month, the same amount every month" },
          { label: "Interest", value: `${v.rate}% a year, added monthly (APY ${percent(apy(v.rate, "monthly"), 2)}), rate unchanged` },
          { label: "Tax", value: "Not taken off; interest is taxable income" },
          { label: "Withdrawals", value: "None until you reach the goal" },
        ]}
      />

      {!done && !never && (
        <ResultCard title="Your path to the goal" sub="Balance month by month, and how much of it is your own deposits.">
          <AreaChart
            ariaLabel="Savings balance by month"
            series={[
              { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
              { key: "paid", label: "Your deposits", color: "#94a3b8", values: paid, dashed: true },
            ]}
            xLabel={(i) => `Mo ${i}`}
            yFormat={usdShort}
            initial={bal.length - 1}
            hint="Drag across the chart, or use the arrow keys, to read any month."
            readout={(i) => (
              <>
                Month <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, of which <b>{usd((bal[i] ?? 0) - (paid[i] ?? 0))}</b> is interest.
              </>
            )}
          />
          <SplitBar
            segments={[
              { label: "Already saved", value: Math.max(0, v.saved), display: usd(v.saved), color: "#94a3b8" },
              { label: "New deposits", value: Math.max(0, yourMoney), display: usd(yourMoney), color: "#0f9f6e" },
              { label: "Interest", value: interest, display: usd(interest), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      {!done && (
        <ResultCard title="Where you keep it matters" sub={`Your rate compared with ${v.compare}%.`}>
          {v.mode === "deadline" ? (
            <Compare
              head={["Rate", "Save each month"]}
              rows={[
                { label: `${v.rate}% a year`, value: usd(need, true), bar: needAtCompare > 0 ? Math.min(1, need / Math.max(need, needAtCompare)) : 1, current: true },
                {
                  label: `${v.compare}% a year`,
                  value: usd(needAtCompare, true),
                  delta: needAtCompare > need ? `+${usd(needAtCompare - need, true)}` : undefined,
                  deltaTone: "up",
                  bar: needAtCompare > 0 ? Math.min(1, needAtCompare / Math.max(need, needAtCompare)) : 0,
                },
              ]}
            />
          ) : (
            <Compare
              head={["Rate", "Time to goal"]}
              rows={[
                { label: `${v.rate}% a year`, value: Number.isFinite(takes) ? duration(takes) : "Never", bar: 1, current: true },
                { label: `${v.compare}% a year`, value: Number.isFinite(takesAtCompare) ? duration(takesAtCompare) : "Never", bar: 1 },
              ]}
            />
          )}
          <Callout title="Keep goal money safe">
            For goals within a few years, use a high-yield savings account, money market account or CD at an FDIC- or NCUA-insured institution, not stocks, which can fall just when you need the money.
          </Callout>
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        Savings rates are variable and can change at any time. Not financial advice.
      </p>
    </Studio>
  );
}
