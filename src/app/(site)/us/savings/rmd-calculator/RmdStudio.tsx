"use client";

import { QCD_LIMIT_2026, rmdPenalty, rmdSchedule, rmdStartAge } from "@/lib/us/retirement-income";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const YEAR = 2026;

const SCHEMA = {
  balance: num(500_000, 0, 100_000_000),
  age: num(75, 60, 100),
  ret: num(5, -10, 15),
  spouse: bool(false),
  spouseAge: num(60, 30, 99),
  toAge: num(95, 75, 110),
  taxRate: num(22, 0, 60),
  taken: num(0, 0, 100_000_000),
  qcd: num(0, 0, 10_000_000),
};
const ADVANCED = ["toAge", "taxRate", "taken", "qcd"] as const;

export default function RmdStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const born = YEAR - v.age;
  const start = rmdStartAge(born);
  const firstYear = born + start;
  const years = Math.max(1, v.toAge - v.age + 1);
  const rows = rmdSchedule({ balance: v.balance, birthYear: born, spouseBirthYear: v.spouse ? YEAR - v.spouseAge : 0, returnPct: v.ret, fromYear: YEAR, years });
  const now = rows[0];
  const due = now.rmd > 0;
  const first = rows.find((r) => r.rmd > 0);
  const shown = due ? now : first;
  const qcd = Math.min(v.qcd, QCD_LIMIT_2026);
  const left = due ? Math.max(0, now.rmd - v.taken - (v.age >= 71 ? qcd : 0)) : 0;
  const taxable = due ? Math.max(0, now.rmd - (v.age >= 71 ? qcd : 0)) : 0;
  const tax = (taxable * v.taxRate) / 100;
  const totalRmd = rows.reduce((s, r) => s + r.rmd, 0);
  const gapOk = v.spouse && v.age - v.spouseAge > 10;

  const bal = rows.map((r) => r.startBalance);
  const cum = rows.map((_, i) => rows.slice(0, i + 1).reduce((s, r) => s + r.rmd, 0));

  const answerValue = shown ? usd(shown.rmd) : usd(0);
  const eyebrow = due ? `Your ${YEAR} required minimum distribution` : first ? `Your first RMD, in ${first.year}` : "No RMD in this period";

  return (
    <Studio
      title="Your RMD"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my RMD"
      onReset={st.reset}
      dock={{ label: due ? `${YEAR} RMD` : "First RMD", value: answerValue }}
      inputs={
        <>
          <InputGroup title="Your account">
            <MoneyField label="Balance on December 31, 2025" value={v.balance} onChange={st.bind("balance")} symbol="$" slider={{ min: 0, max: 3_000_000, step: 10_000, ends: ["$0", "$3m"] }} info="The year-end value of the IRA (or 401(k)) from your December statement. Work out each account separately and add them up." />
            <StepperField label="Your age at the end of 2026" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={60} max={100} unit="years" dp={0} info="Your age on your birthday in 2026. RMDs start at 73 if you were born from 1951 to 1959, or 75 if born in 1960 or later." />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={15} unit="%" dp={1} info="Used to project future balances and RMDs. A mix of stocks and bonds might average 4% to 6%; not guaranteed." />
            <Switch label="My spouse is my sole beneficiary and more than 10 years younger" checked={v.spouse} onChange={st.bind("spouse")} info="Then you use the IRS Joint Life table, which gives a smaller RMD." />
            {v.spouse && (
              <StepperField label="Your spouse's age at the end of 2026" value={v.spouseAge} onChange={(n) => st.set("spouseAge", Math.round(n))} step={1} min={30} max={99} unit="years" dp={0} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Project until age" value={v.toAge} onChange={(n) => st.set("toAge", Math.round(n))} step={1} min={75} max={110} unit="years" dp={0} optional />
            <StepperField label="Your tax rate on withdrawals" value={v.taxRate} onChange={st.bind("taxRate")} step={1} min={0} max={60} unit="%" dp={0} optional info="Federal plus state rate on the next dollar of income. RMDs are taxed as ordinary income." />
            <MoneyField label="Already withdrawn this year" value={v.taken} onChange={st.bind("taken")} symbol="$" optional info="Every withdrawal in the year counts toward the RMD." />
            <MoneyField label="Qualified charitable distributions" value={v.qcd} onChange={st.bind("qcd")} symbol="$" optional info={`From 70½, up to ${usd(QCD_LIMIT_2026)} in 2026 can go straight from an IRA to charity. It counts toward your RMD and isn't taxed.`} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={eyebrow}
        value={answerValue}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          due ? (
            <>
              With <b>{usd(v.balance)}</b>{" "}at the end of 2025 and a factor of <b>{now.divisor}</b>{" "}from the IRS {now.table === "joint" ? "Joint Life" : "Uniform Lifetime"} table, you must
              withdraw at least <b>{usd(now.rmd)}</b>{" "}by December 31, 2026{v.age === start ? <> (or April 1, 2027 for this first one)</> : null}. That is{" "}
              {percent(now.rmd / Math.max(1, v.balance), 1)} of the balance.
            </>
          ) : first ? (
            <>
              You don&apos;t need to take an RMD for 2026. Your RMDs start at <b>{start}</b>, in <b>{first.year}</b>. If your account grows {v.ret}% a year, the
              first one would be about <b>{usd(first.rmd)}</b>.
            </>
          ) : (
            <>Your RMDs start at {start}, in {firstYear}, after the end of this projection.</>
          )
        }
        badges={[`RMD age ${start}`, shown ? `Factor ${shown.divisor}` : `From ${firstYear}`, `${usd(totalRmd)} in RMDs to ${v.toAge}`]}
      />

      <Facts
        items={[
          { label: "RMD age", value: `${start} (in ${firstYear})` },
          { label: due ? "2026 factor" : "First factor", value: shown ? String(shown.divisor) : "–" },
          { label: due ? "Still to take in 2026" : "First RMD year", value: due ? usd(left) : String(first?.year ?? firstYear), tone: due && left > 0 ? "warn" : "good" },
          { label: due ? "Tax on this RMD" : "Balance then", value: due ? usd(tax) : usd(first?.startBalance ?? 0) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Table", value: gapOk ? "IRS Joint Life table (spouse more than 10 years younger, sole beneficiary)" : "IRS Uniform Lifetime table" },
          { label: "Return", value: `${v.ret}% a year, steady` },
          { label: "Withdrawals", value: "Exactly the RMD, taken at the end of each year" },
          { label: "Tax", value: `${v.taxRate}% on the taxable part` },
          { label: "Accounts", value: "Traditional IRA or 401(k) you own, not inherited" },
        ]}
      />

      {shown && (
        <ResultCard title={due ? "Your 2026 RMD" : `Your first RMD, in ${shown.year}`} sub="What must come out, and what can stay invested.">
          <SplitBar
            segments={[
              { label: "Required withdrawal", value: shown.rmd, display: usd(shown.rmd), color: "#f59e0b" },
              { label: "Can stay invested", value: Math.max(0, shown.startBalance - shown.rmd), display: usd(Math.max(0, shown.startBalance - shown.rmd)), color: "#0f9f6e" },
            ]}
          />
          <p className="footnote">
            {usd(shown.startBalance)} ÷ {shown.divisor} = {usd(shown.rmd)}. You can always take more; taking more doesn&apos;t lower next year&apos;s RMD
            except through a lower balance.
          </p>
        </ResultCard>
      )}

      <ResultCard title="Your RMDs year by year" sub={`Balance at the start of each year and RMDs taken so far, to age ${v.toAge}.`}>
        <AreaChart
          ariaLabel="IRA balance and total RMDs by age"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "cum", label: "Total RMDs taken", color: "#f59e0b", values: cum, dashed: true },
          ]}
          xLabel={(i) => `${rows[i]?.age ?? ""}`}
          yFormat={usdShort}
          initial={0}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              At <b>{rows[i]?.age}</b>{" "}({rows[i]?.year}): balance <b>{usd(rows[i]?.startBalance ?? 0)}</b>, RMD <b>{usd(rows[i]?.rmd ?? 0)}</b>.
            </>
          )}
        />
        <DataTable
          summary="See the schedule"
          columns={["Year", "Age", "Balance Dec 31 before", "Factor", "RMD", "Share"]}
          rows={rows.map((r) => [String(r.year), String(r.age), usd(r.startBalance), r.rmd > 0 ? String(r.divisor) : "–", usd(r.rmd), r.rmd > 0 ? percent(r.rmd / Math.max(1, r.startBalance), 1) : "–"])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Deadlines, penalties and ways to lower the tax.">
        {due && left > 0 && (
          <Callout tone="warn" title={`Missing it costs ${usd(rmdPenalty(left, false))}`}>
            The excise tax is 25% of any RMD not taken by the deadline, cut to 10% ({usd(rmdPenalty(left, true))}) if you take it and file Form 5329 within the
            correction window, usually two years.
          </Callout>
        )}
        {v.spouse && !gapOk && (
          <Callout title="Uniform table used">Your spouse isn&apos;t more than 10 years younger, so the Uniform Lifetime table applies.</Callout>
        )}
        {v.age === start && (
          <Callout title="Your first RMD can wait until April 1">
            The first RMD can be delayed until April 1 of the following year, but then you take two in that year, which can push you into a higher bracket.
          </Callout>
        )}
        <Callout title="Give to charity from your IRA">
          From 70½, a qualified charitable distribution of up to {usd(QCD_LIMIT_2026)} in 2026 counts toward your RMD and isn&apos;t taxed, which is usually
          better than taking the RMD and deducting a gift.
        </Callout>
        <Callout title="Still working?">
          If you still work and don&apos;t own 5% or more of the company, you can usually delay RMDs from that employer&apos;s 401(k) until you retire. IRAs
          have no such exception. Roth IRAs have no RMDs for the owner.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate using IRS Publication 590-B tables. Your IRA provider calculates the official figure. Not tax advice.
      </p>
    </Studio>
  );
}
