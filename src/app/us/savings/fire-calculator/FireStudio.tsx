"use client";

import { fire, savingsRateTable } from "@/lib/us/wealth";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  age: num(30, 16, 80),
  takeHome: num(80_000, 0, 10_000_000),
  spending: num(50_000, 0, 10_000_000),
  saved: num(100_000, 0, 100_000_000),
  ret: num(7, -5, 15),
  infl: num(2.5, 0, 10),
  wr: num(4, 2, 6),
  retireShare: num(100, 40, 200),
  saveGrowth: num(0, 0, 10),
  partTime: num(20_000, 0, 1_000_000),
  coastAge: num(65, 40, 80),
};
const ADVANCED = ["ret", "infl", "wr", "retireShare", "saveGrowth", "partTime", "coastAge"] as const;

/** "15 years 9 months", "Now" or a plain "not within 100 years". */
function when(months: number): string {
  if (!Number.isFinite(months)) return "Not within 100 years";
  return months === 0 ? "Already there" : duration(months);
}
function atAge(age: number, months: number): string {
  if (!Number.isFinite(months)) return "Not in sight";
  return `Age ${Math.floor(age + months / 12)}`;
}

export default function FireStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    age: v.age,
    takeHome: v.takeHome,
    spending: v.spending,
    saved: v.saved,
    returnPct: v.ret,
    inflationPct: v.infl,
    withdrawalPct: v.wr,
    retireShare: v.retireShare / 100,
    saveGrowthPct: v.saveGrowth,
    partTime: v.partTime,
    coastAge: v.coastAge,
  };
  const f = fire(input);
  const table = savingsRateTable(v.takeHome, v.saved, f.realPct, v.wr, v.retireShare / 100);
  const reached = f.months === 0;
  const never = !Number.isFinite(f.months);
  const spendsAll = v.spending >= v.takeHome;
  const balances = f.path.map((p) => p.balance);
  const target = f.path.map(() => f.number);
  const coastLabel = f.coast.reached ? "Already coasting" : Number.isFinite(f.coast.months) ? `${when(f.coast.months)} (age ${Math.floor(f.coast.age)})` : "Not within 100 years";

  return (
    <Studio
      title="Your FIRE plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my FIRE date"
      onReset={st.reset}
      dock={{ label: "Financially independent", value: reached ? "Now" : never ? "Not in sight" : atAge(v.age, f.months) }}
      inputs={
        <>
          <InputGroup title="You today">
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={16} max={80} unit="years" dp={0} />
            <MoneyField label="Take-home pay a year" value={v.takeHome} onChange={st.bind("takeHome")} symbol="$" slider={{ min: 20_000, max: 300_000, step: 1_000, ends: ["$20k", "$300k"] }} info="Pay after federal and state income tax, Social Security and Medicare. Count 401(k) and IRA contributions as savings, so add them back in." />
            <MoneyField label="Spending a year" value={v.spending} onChange={st.bind("spending")} symbol="$" slider={{ min: 10_000, max: 200_000, step: 1_000, ends: ["$10k", "$200k"] }} info="Everything you spend in a year: housing, food, travel, insurance and the rest. What you don't spend, you save." />
            <MoneyField label="Invested savings so far" value={v.saved} onChange={st.bind("saved")} symbol="$" info="401(k), IRA, HSA and brokerage balances you will live on. Leave out your home equity and your emergency fund." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.25} min={-5} max={15} unit="%" dp={2} optional info="Before inflation and after fund fees. Many planners use 6% to 7% for a stock-heavy portfolio; returns vary a lot from year to year." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Everything is worked out in today's dollars, using the return after inflation." />
            <StepperField label="Withdrawal rate" value={v.wr} onChange={st.bind("wr")} step={0.25} min={2} max={6} unit="%" dp={2} optional info="The share of your portfolio you take in the first year, then raise with inflation. 4% gives the familiar 25 times spending; early retirees often use 3.25% to 3.5% for a longer retirement." />
            <StepperField label="Retirement spending vs today" value={v.retireShare} onChange={st.bind("retireShare")} step={5} min={40} max={200} unit="%" dp={0} optional info="100% means you plan to spend the same as now. Lower it if your mortgage will be paid off; raise it for health insurance or travel." />
            <StepperField label="Raise savings each year by" value={v.saveGrowth} onChange={st.bind("saveGrowth")} step={0.5} min={0} max={10} unit="%" dp={1} optional info="Above inflation, for example by saving part of each raise." />
            <MoneyField label="Part-time income in retirement" value={v.partTime} onChange={st.bind("partTime")} symbol="$" optional info="For Barista FIRE: income a year from part-time work, in today's dollars, that pays part of your spending." />
            <StepperField label="Coast FIRE target age" value={v.coastAge} onChange={(n) => st.set("coastAge", Math.round(n))} step={1} min={40} max={80} unit="years" dp={0} optional info="The age by which savings left alone should grow to your FIRE number." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Financially independent"
        value={reached ? "Now" : never ? "Not in sight" : atAge(v.age, f.months)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          reached ? (
            <>
              Your <b>{usd(v.saved)}</b>{" "}already covers your FIRE number of <b>{usd(f.number)}</b>. At a {v.wr}% withdrawal rate it could pay{" "}
              <b>{usd(v.saved * (v.wr / 100))}</b>{" "}a year, rising with inflation.
            </>
          ) : never ? (
            <>
              Your FIRE number is <b>{usd(f.number)}</b>, but{" "}
              {spendsAll ? "you are spending all of your take-home pay, so nothing is going into savings." : "at this savings rate and return your investments don't reach it within 100 years."}{" "}
              Try spending less or a higher savings rate in the table below.
            </>
          ) : (
            <>
              Saving <b>{usd(f.annualSave)}</b>{" "}a year ({percent(f.savingsRate, 0)} of take-home pay), you reach your FIRE number of{" "}
              <b>{usd(f.number)}</b>{" "}in <b>{when(f.months)}</b>, at about age {Math.floor(f.fiAge)}. In the dollars of that year the number is about{" "}
              <b>{usd(f.nominalNumber)}</b>.
            </>
          )
        }
        badges={[`Savings rate ${percent(f.savingsRate, 0)}`, `${percent(f.progress, 0)} of the way`, `Real return ${f.realPct.toFixed(2)}%`]}
      />

      <Facts
        items={[
          { label: "FIRE number", value: usd(f.number), note: `${(100 / v.wr).toFixed(1)} × spending` },
          { label: "Savings rate", value: percent(f.savingsRate, 0), tone: f.savingsRate >= 0.25 ? "good" : f.savingsRate > 0 ? "warn" : "bad" },
          { label: "Time to FI", value: when(f.months) },
          { label: "Coast FIRE", value: f.coast.reached ? "Reached" : usd(f.coast.needNow), note: f.coast.reached ? undefined : `needed now to coast to ${v.coastAge}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Return", value: `${v.ret}% a year before inflation, ${f.realPct.toFixed(2)}% after ${v.infl}% inflation` },
          { label: "Withdrawal rate", value: `${v.wr}% in the first year, then raised with inflation` },
          { label: "Retirement spending", value: `${usd(f.retireSpending)} a year (${v.retireShare}% of today's)` },
          { label: "Savings", value: `Take-home pay minus spending, saved monthly${v.saveGrowth ? `, rising ${v.saveGrowth}% a year` : ""}` },
          { label: "Money", value: "In today's dollars; taxes on withdrawals not included" },
        ]}
      />

      <ResultCard title="How far along you are" sub="Your invested savings against your FIRE number.">
        <SplitBar
          segments={[
            { label: "Saved so far", value: Math.min(v.saved, f.number), display: usd(Math.min(v.saved, f.number)), color: "#0f9f6e" },
            { label: "Still to go", value: Math.max(0, f.number - v.saved), display: usd(Math.max(0, f.number - v.saved)), color: "#c9ced6" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Five kinds of FIRE" sub="Each version needs a different nest egg. Times assume you keep saving as now.">
        <Statement
          columns={["Target", "Time", "Age"]}
          rows={[
            { label: `Lean FIRE (${usdShort(f.retireSpending * 0.7)} a year)`, values: [usd(f.lean.number), when(f.lean.months), atAge(v.age, f.lean.months)] },
            { label: `FIRE (${usdShort(f.retireSpending)} a year)`, values: [usd(f.number), when(f.months), atAge(v.age, f.months)], kind: "total" },
            { label: `Fat FIRE (${usdShort(f.retireSpending * 1.5)} a year)`, values: [usd(f.fat.number), when(f.fat.months), atAge(v.age, f.fat.months)] },
            { label: `Barista FIRE (${usdShort(v.partTime)} part-time pay)`, values: [usd(f.barista.number), when(f.barista.months), atAge(v.age, f.barista.months)] },
            { label: `Coast FIRE (to ${v.coastAge})`, values: [usd(f.coast.needNow), coastLabel, f.coast.reached ? `Age ${v.age}` : atAge(v.age, f.coast.months)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your path to FI" sub="Invested savings each year in today's dollars, against your FIRE number.">
        <AreaChart
          ariaLabel="Invested savings by age against the FIRE number"
          series={[
            { key: "bal", label: "Invested savings", color: "#0f9f6e", values: balances, fill: true },
            { key: "target", label: "FIRE number", color: "#f59e0b", values: target, dashed: true },
          ]}
          xLabel={(i) => `${f.path[i]?.age ?? ""}`}
          yFormat={usdShort}
          initial={balances.length - 1}
          readout={(i) => (
            <>
              Age <b>{f.path[i]?.age}</b>: <b>{usd(balances[i] ?? 0)}</b>, which is {percent(f.number > 0 ? (balances[i] ?? 0) / f.number : 1, 0)} of your FIRE number.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Years to FI by savings rate" sub={`For ${usd(v.takeHome)} of take-home pay, starting from ${usd(v.saved)}. Spending is whatever you don't save.`}>
        <DataTable
          summary="Show the savings-rate table"
          columns={["Savings rate", "Saving a year", "Spending a year", "FIRE number", "Time to FI"]}
          rows={table.map((t) => [percent(t.rate, 0), usd(t.save), usd(t.spending), usd(t.number), when(t.months)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you hand in your notice.">
        {v.wr > 4 && (
          <Callout tone="warn" title="A high withdrawal rate">
            The 4% rule was tested over 30-year retirements. Retiring early can mean 40 or 50 years of withdrawals, so many early retirees plan on 3.25% to 3.5%.
          </Callout>
        )}
        <Callout title="Getting at your money before 59½">
          Most 401(k) and IRA withdrawals before 59½ carry a 10% extra tax. Ways around it include Roth IRA contributions (which you can take out at any time), the rule of 55 for a 401(k) from the job you leave, and a series of substantially equal payments under section 72(t).
        </Callout>
        <Callout title="Health insurance until Medicare">
          Medicare starts at 65. Until then you need cover from the Marketplace, a spouse&apos;s plan or COBRA. Put a realistic premium into your retirement spending.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Investment returns vary and are not guaranteed. Not financial advice.
      </p>
    </Studio>
  );
}
