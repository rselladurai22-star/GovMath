"use client";

import { emergencyFund, FDIC_NATIONAL_SAVINGS_2026, suggestedMonths, type Earners, type IncomeType, type JobOutlook } from "@/lib/us/wealth";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const COVER = ["auto", "3", "4", "6", "9", "12"] as const;
type Cover = (typeof COVER)[number];

const SCHEMA = {
  housing: num(1_800, 0, 1_000_000),
  food: num(600, 0, 1_000_000),
  utilities: num(350, 0, 1_000_000),
  transport: num(450, 0, 1_000_000),
  current: num(5_000, 0, 100_000_000),
  save: num(500, 0, 1_000_000),
  insurance: num(300, 0, 1_000_000),
  debt: num(250, 0, 1_000_000),
  childcare: num(0, 0, 1_000_000),
  other: num(250, 0, 1_000_000),
  earners: oneOf<Earners>("one", ["one", "two"]),
  income: oneOf<IncomeType>("salary", ["salary", "irregular"]),
  outlook: oneOf<JobOutlook>("average", ["stable", "average", "uncertain"]),
  kids: bool(false),
  owner: bool(false),
  cover: oneOf<Cover>("auto", COVER),
  otherIncome: num(0, 0, 1_000_000),
  apy: num(4, 0, 10),
  regular: num(FDIC_NATIONAL_SAVINGS_2026, 0, 10),
};
const ADVANCED = ["insurance", "debt", "childcare", "other", "earners", "income", "outlook", "kids", "owner", "cover", "otherIncome", "apy", "regular"] as const;

const COLORS = ["#0f9f6e", "#f59e0b", "#5b1e6e", "#2e0a3a", "#db2777", "#8e4ba3", "#0ea5e9", "#94a3b8"];

export default function EmergencyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const suggested = suggestedMonths({ earners: v.earners, income: v.income, dependents: v.kids, homeowner: v.owner, outlook: v.outlook });
  const months = v.cover === "auto" ? suggested : Number(v.cover);
  const cats = [
    { label: "Housing", value: v.housing },
    { label: "Food and groceries", value: v.food },
    { label: "Utilities and phone", value: v.utilities },
    { label: "Transportation", value: v.transport },
    { label: "Insurance and health care", value: v.insurance },
    { label: "Minimum debt payments", value: v.debt },
    { label: "Childcare", value: v.childcare },
    { label: "Other essentials", value: v.other },
  ];
  const e = emergencyFund({ costs: cats.map((c) => c.value), months, current: v.current, monthlySave: v.save, otherIncome: v.otherIncome, apyPct: v.apy, regularApyPct: v.regular });
  const done = e.gap <= 0;
  const never = !Number.isFinite(e.monthsToGoal);
  const coverText = Number.isFinite(e.coverNow) ? `${e.coverNow.toFixed(1)} months` : "Indefinitely";
  const path = e.path.slice(0, Number.isFinite(e.monthsToGoal) ? Math.min(e.path.length, e.monthsToGoal + 1) : 61);
  const target = path.map(() => e.target);
  const tiers = [3, 6, 9, 12];

  return (
    <Studio
      title="Your emergency fund"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my fund"
      onReset={st.reset}
      dock={{ label: `Target (${months} months)`, value: usd(e.target) }}
      inputs={
        <>
          <InputGroup title="Essential costs a month">
            <MoneyField label="Rent or mortgage" value={v.housing} onChange={st.bind("housing")} symbol="$" info="Include property tax, homeowners or renters insurance and HOA dues if you pay them monthly." />
            <MoneyField label="Food and groceries" value={v.food} onChange={st.bind("food")} symbol="$" info="Groceries, not restaurants: in an emergency you would cut back." />
            <MoneyField label="Utilities and phone" value={v.utilities} onChange={st.bind("utilities")} symbol="$" />
            <MoneyField label="Transportation" value={v.transport} onChange={st.bind("transport")} symbol="$" info="Car payment, gas, insurance and transit." />
          </InputGroup>
          <InputGroup title="Your fund">
            <MoneyField label="Saved so far" value={v.current} onChange={st.bind("current")} symbol="$" />
            <MoneyField label="You can save a month" value={v.save} onChange={st.bind("save")} symbol="$" slider={{ min: 0, max: 2_000, step: 25, ends: ["$0", "$2k"] }} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Insurance and health care" value={v.insurance} onChange={st.bind("insurance")} symbol="$" optional info="Health premiums (remember you may have to pay the full COBRA premium if you lose your job), prescriptions and life insurance." />
            <MoneyField label="Minimum debt payments" value={v.debt} onChange={st.bind("debt")} symbol="$" optional info="Credit card minimums, student loans and personal loans. Car payments go under transportation." />
            <MoneyField label="Childcare" value={v.childcare} onChange={st.bind("childcare")} symbol="$" optional />
            <MoneyField label="Other essentials" value={v.other} onChange={st.bind("other")} symbol="$" optional info="Toiletries, pet food, basic clothing and anything else you couldn't drop." />
            <RadioGroup label="Earners in your household" value={v.earners} onChange={st.bind("earners")} optional options={[{ value: "one", label: "One" }, { value: "two", label: "Two or more" }]} />
            <RadioGroup label="Your income" value={v.income} onChange={st.bind("income")} optional options={[{ value: "salary", label: "Steady pay" }, { value: "irregular", label: "Self-employed or irregular" }]} />
            <RadioGroup label="Job security" value={v.outlook} onChange={st.bind("outlook")} optional options={[{ value: "stable", label: "Stable" }, { value: "average", label: "Average" }, { value: "uncertain", label: "Uncertain" }]} />
            <Switch label="You have dependents" checked={v.kids} onChange={st.bind("kids")} optional />
            <Switch label="You own your home" checked={v.owner} onChange={st.bind("owner")} optional info="Homeowners face repair bills a landlord would otherwise pay." />
            <SelectField
              label="Months of cover"
              value={v.cover}
              onChange={st.bind("cover")}
              optional
              options={COVER.map((c) => ({ value: c, label: c === "auto" ? `Our suggestion (${suggested} months)` : `${c} months` }))}
            />
            <MoneyField label="Income you'd still have a month" value={v.otherIncome} onChange={st.bind("otherIncome")} symbol="$" optional info="A partner's take-home pay or unemployment benefits you would expect. The fund only has to cover the rest." />
            <StepperField label="Savings account APY" value={v.apy} onChange={st.bind("apy")} step={0.05} min={0} max={10} unit="%" dp={2} optional info="Top online high-yield savings accounts paid around 4% to 4.3% in early October 2026. Rates change." />
            <StepperField label="Regular savings APY, for comparison" value={v.regular} onChange={st.bind("regular")} step={0.05} min={0} max={10} unit="%" dp={2} optional info="The FDIC national average was 0.37% on September 21, 2026." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Emergency fund target (${months} months)`}
        value={usd(e.target)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          e.target === 0 ? (
            <>Your other income covers your essential costs, so you don&apos;t need a fund for lost pay. A small cushion for surprise bills is still wise.</>
          ) : done ? (
            <>
              Your essentials come to <b>{usd(e.monthlyNeed)}</b>{" "}a month to cover, so {months} months is <b>{usd(e.target)}</b>. Your <b>{usd(v.current)}</b>{" "}already
              covers it, with {usd(v.current - e.target)} to spare.
            </>
          ) : never ? (
            <>
              Your essentials come to <b>{usd(e.monthlyNeed)}</b>{" "}a month to cover, so {months} months is <b>{usd(e.target)}</b>. You are{" "}
              <b>{usd(e.gap)}</b>{" "}short. Set aside something each month to start closing the gap.
            </>
          ) : (
            <>
              Your essentials come to <b>{usd(e.monthlyNeed)}</b>{" "}a month to cover, so {months} months is <b>{usd(e.target)}</b>. Saving{" "}
              <b>{usd(v.save)}</b>{" "}a month at {v.apy}% APY, you close the <b>{usd(e.gap)}</b>{" "}gap in <b>{duration(e.monthsToGoal)}</b>.
            </>
          )
        }
        badges={[`Covers ${coverText} now`, `Suggested: ${suggested} months`, `${usd(e.yearInterest)} a year at ${v.apy}%`]}
      />

      <Facts
        items={[
          { label: "Essential costs a month", value: usd(e.essentials) },
          { label: "Still to save", value: usd(e.gap), tone: done ? "good" : "warn" },
          { label: "Time to goal", value: done ? "Done" : never ? "Not at this rate" : duration(e.monthsToGoal) },
          { label: "Your fund covers", value: coverText, tone: e.coverNow >= months ? "good" : e.coverNow >= 1 ? "warn" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Months of cover", value: v.cover === "auto" ? `${months}, our suggestion for your situation` : `${months}, your choice` },
          { label: "Essential costs", value: `${usd(e.essentials)} a month${v.otherIncome ? `, less ${usd(v.otherIncome)} of other income` : ""}` },
          { label: "Savings", value: `${usd(v.save)} at the end of each month, at ${v.apy}% APY` },
          { label: "Tax", value: "Interest shown before tax (it is taxed as ordinary income)" },
        ]}
      />

      <ResultCard title="Where the money goes" sub="Your essential monthly costs: what the fund has to keep paying.">
        <SplitBar segments={cats.filter((c) => c.value > 0).map((c, i) => ({ label: c.label, value: c.value, display: usd(c.value), color: COLORS[i % COLORS.length] }))} />
      </ResultCard>

      <ResultCard title="How big at each level" sub="The fund at different lengths of cover, and how long each takes at your saving rate.">
        <Statement
          columns={["Fund", "Time to reach"]}
          rows={tiers.map((m) => {
            const t = emergencyFund({ costs: cats.map((c) => c.value), months: m, current: v.current, monthlySave: v.save, otherIncome: v.otherIncome, apyPct: v.apy, regularApyPct: v.regular });
            return {
              label: `${m} months${m === months ? " (your target)" : ""}`,
              values: [usd(t.target), t.gap <= 0 ? "Reached" : Number.isFinite(t.monthsToGoal) ? duration(t.monthsToGoal) : "Not at this rate"],
              kind: m === months ? ("total" as const) : undefined,
            };
          })}
        />
      </ResultCard>

      {!done && !never && path.length > 1 && (
        <ResultCard title="Building your fund" sub="Your balance month by month, with interest, against the target.">
          <AreaChart
            ariaLabel="Emergency fund balance by month"
            series={[
              { key: "bal", label: "Balance", color: "#0f9f6e", values: path, fill: true },
              { key: "target", label: "Target", color: "#f59e0b", values: target, dashed: true },
            ]}
            xLabel={(i) => `M${i}`}
            yFormat={usdShort}
            initial={path.length - 1}
            hint="Drag across the chart, or use the arrow keys, to read any month."
            readout={(i) => (
              <>
                Month <b>{i}</b>: <b>{usd(path[i] ?? 0)}</b>, enough for {e.monthlyNeed > 0 ? ((path[i] ?? 0) / e.monthlyNeed).toFixed(1) : "0"} months of essentials.
              </>
            )}
          />
        </ResultCard>
      )}

      <ResultCard title="Where to keep it" sub={`A year's interest on your ${usd(e.target)} target.`}>
        <Statement
          columns={["APY", "Interest a year"]}
          rows={[
            { label: "High-yield savings", values: [`${v.apy}%`, usd(e.yearInterest)], kind: "total" },
            { label: "Regular savings (national average)", values: [`${v.regular}%`, usd(e.yearInterestRegular)] },
          ]}
        />
        <Callout title="Safe, separate and quick to reach">
          Keep the fund in an FDIC-insured bank or NCUA-insured credit union account, separate from your checking account so it isn&apos;t spent by
          accident, and where you can move money in a day or two. Insurance covers up to $250,000 per depositor, per bank, per ownership category.
        </Callout>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Building it without stalling everything else.">
        {e.coverNow < 1 && (
          <Callout tone="warn" title="Start with a starter fund">
            If you have less than a month of costs saved, aim first for $1,000 or one month of essentials. That covers most car repairs and medical
            bills without a credit card.
          </Callout>
        )}
        <Callout title="Automate it">
          Set up an automatic transfer on payday, or split your direct deposit so part goes straight to savings. Tax refunds and bonuses can fill the
          gap faster.
        </Callout>
        {v.debt > 0 && (
          <Callout title="Fund first, then extra debt payments">
            Keep paying your minimums while you build a starter fund. Then put extra toward high-interest debt and the rest of the fund.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        A rule of thumb, not financial advice. Savings rates are variable and change often.
      </p>
    </Studio>
  );
}
