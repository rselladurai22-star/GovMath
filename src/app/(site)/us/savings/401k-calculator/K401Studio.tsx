"use client";

import { k401Limit, k401Projection } from "@/lib/us/savings";
import { US_2026 } from "@/lib/us/tax-2026";
import { catchUpMustBeRoth, ROTH_CATCH_UP_WAGES_2026 } from "@/lib/us/savings-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, usd, usdShort } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  age: num(30, 18, 80),
  retire: num(67, 19, 85),
  salary: num(75_000, 0, 10_000_000),
  balance: num(20_000, 0, 100_000_000),
  pct: num(6, 0, 100),
  matchRate: num(50, 0, 200),
  matchUpTo: num(6, 0, 100),
  flat: num(0, 0, 25),
  raise: num(3, 0, 15),
  ret: num(7, -10, 20),
  fee: num(0.5, 0, 3),
  infl: num(2.5, 0, 10),
};
const BASE = US_2026.limits.k401;
const ADVANCED = ["flat", "raise", "ret", "fee", "infl"] as const;

export default function K401Studio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const years = Math.max(0, Math.round(v.retire - v.age));
  const r = k401Projection({
    age: v.age,
    retireAge: v.retire,
    salary: v.salary,
    balance: v.balance,
    pct: v.pct / 100,
    matchRate: v.matchRate / 100,
    matchUpTo: v.matchUpTo / 100,
    employerFlat: v.flat / 100,
    salaryGrowth: v.raise,
    returnPct: v.ret,
    feePct: v.fee,
    inflationPct: v.infl,
  });
  const limit = k401Limit(v.age);
  const rothCatchUp = catchUpMustBeRoth(v.age, v.salary);
  const fullMatchPct = Math.min(v.matchUpTo, v.salary > 0 ? (limit / v.salary) * 100 : 0);

  const ages = [v.age, ...r.years.map((y) => y.age)];
  const bal = [Math.max(0, v.balance), ...r.years.map((y) => y.balance)];
  const real = [Math.max(0, v.balance), ...r.years.map((y) => y.real)];
  const step = years > 30 ? 5 : years > 12 ? 2 : 1;
  const rows = r.years.filter((y, i) => (i + 1) % step === 0 || i === r.years.length - 1);

  return (
    <Studio
      title="Your 401(k)"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my 401(k)"
      onReset={st.reset}
      dock={{ label: `At ${v.retire}`, value: usd(r.balance) }}
      inputs={
        <>
          <InputGroup title="You">
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={80} unit="years" dp={0} info="Your age now. It sets your 2026 contribution limit: catch-ups start at 50, with a bigger one from 60 to 63." />
            <StepperField label="Retirement age" value={v.retire} onChange={(n) => st.set("retire", Math.round(n))} step={1} min={19} max={85} unit="years" dp={0} />
            <MoneyField label="Annual salary" value={v.salary} onChange={st.bind("salary")} symbol="$" slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} />
            <MoneyField label="Current 401(k) balance" value={v.balance} onChange={st.bind("balance")} symbol="$" />
          </InputGroup>
          <InputGroup title="Contributions">
            <StepperField label="You contribute" value={v.pct} onChange={st.bind("pct")} step={1} min={0} max={100} unit="% of pay" dp={1} info="Your own pre-tax or Roth contributions as a share of salary. The calculator caps them at the 2026 limit for your age." />
            <StepperField label="Employer match" value={v.matchRate} onChange={st.bind("matchRate")} step={25} min={0} max={200} unit="% of yours" dp={0} info="How much your employer adds for each dollar you put in. A dollar-for-dollar match is 100%; 50 cents per dollar is 50%." />
            <StepperField label="Match applies up to" value={v.matchUpTo} onChange={st.bind("matchUpTo")} step={1} min={0} max={100} unit="% of pay" dp={1} info="The share of your pay the match covers. In a match of 50% up to 6%, this is 6%." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Employer non-elective contribution" value={v.flat} onChange={st.bind("flat")} step={0.5} min={0} max={25} unit="% of pay" dp={1} optional info="Money your employer puts in whether or not you contribute, for example a 3% safe harbor contribution or profit sharing." />
            <StepperField label="Pay rise each year" value={v.raise} onChange={st.bind("raise")} step={0.5} min={0} max={15} unit="%" dp={1} optional />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={20} unit="%" dp={1} optional info="Before fees. 7% is a common long-run assumption for a mostly stock portfolio. Returns are not guaranteed." />
            <StepperField label="Fund fees a year" value={v.fee} onChange={st.bind("fee")} step={0.05} min={0} max={3} unit="%" dp={2} optional info="The expense ratio of your funds plus any plan fee, as a share of the balance." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Used to show the balance in today's dollars." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your 401(k) at ${v.retire}`}
        value={usd(r.balance)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          years === 0 ? (
            <>Set a retirement age above your current age to see a projection.</>
          ) : (
            <>
              Over {years} {per(years, "years")} you put in <b>{usd(r.yourTotal)}</b>, your employer adds <b>{usd(r.employerTotal)}</b>{" "}and investment growth adds <b>{usd(r.growth)}</b>. In today&apos;s dollars the balance is worth
              about <b>{usd(r.real)}</b>.
            </>
          )
        }
        badges={[`2026 limit ${usd(limit)}`, `You: ${usd(r.firstYear.you)} this year`, `Employer: ${usd(r.firstYear.employer)} this year`]}
      />

      <Facts
        items={[
          { label: "Your contributions", value: usd(r.yourTotal) },
          { label: "Employer contributions", value: usd(r.employerTotal), tone: "good" },
          { label: "Investment growth", value: usd(r.growth), tone: r.growth >= 0 ? "good" : "bad" },
          { label: "In today's dollars", value: usd(r.real) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Contribution limit", value: `${usd(limit)} in 2026 at age ${v.age}, rising only with your age band (not with inflation)` },
          { label: "Return", value: `${v.ret}% a year before ${v.fee}% fees, the same every year` },
          { label: "Pay", value: `${usd(v.salary)} now, rising ${v.raise}% a year` },
          { label: "Timing", value: "Contributions spread through the year; no withdrawals or loans" },
          { label: "Tax", value: "None shown: traditional money is taxed when withdrawn, qualified Roth money is not" },
        ]}
      />

      <ResultCard title="Your balance by age" sub="Projected balance, and the same balance in today's dollars.">
        <AreaChart
          ariaLabel="401(k) balance by age"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "real", label: "In today's dollars", color: "#94a3b8", values: real, dashed: true },
          ]}
          xLabel={(i) => `${ages[i] ?? ""}`}
          yFormat={usdShort}
          initial={ages.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              At <b>{ages[i]}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, worth <b>{usd(real[i] ?? 0)}</b>{" "}in today&apos;s dollars.
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Starting balance", value: Math.max(0, v.balance), display: usd(v.balance), color: "#94a3b8" },
            { label: "Your contributions", value: r.yourTotal, display: usd(r.yourTotal), color: "#0f9f6e" },
            { label: "Employer contributions", value: r.employerTotal, display: usd(r.employerTotal), color: "#5b1e6e" },
            { label: "Investment growth", value: Math.max(0, r.growth), display: usd(r.growth), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="This year" sub="Your first year's contributions and the match.">
        {r.missedMatch > 0.5 ? (
          <Callout tone="warn" title={`You're leaving ${usd(r.missedMatch)} of match on the table`}>
            Your employer matches up to {v.matchUpTo}% of pay, but you contribute {v.pct}%. Raising your contribution to {Number(fullMatchPct.toFixed(1))}% would collect the full match this year: free money on top of your pay.
          </Callout>
        ) : (
          <Callout tone="good" title="You get the full employer match">
            Your contribution is high enough to collect every dollar of the match your employer offers.
          </Callout>
        )}
        {r.firstYear.capped && (
          <Callout tone="warn" title={`Capped at the ${usd(limit)} limit`}>
            {v.pct}% of your pay is more than the 2026 limit for your age, so your contributions stop at {usd(limit)}. You could save the rest in an IRA or a taxable account.
          </Callout>
        )}
        {v.age >= 50 && (
          <Callout title={rothCatchUp ? "Your catch-up must be Roth" : "Catch-up contributions"}>
            {rothCatchUp
              ? `From 2026, if your 2025 FICA wages from this employer were over ${usd(ROTH_CATCH_UP_WAGES_2026)}, catch-up contributions (the part above ${usd(BASE)}) must go in as Roth, after tax. We used your salary as a guide.`
              : `At ${v.age} you can add a catch-up of ${usd(limit - BASE)} on top of the ${usd(BASE)} limit. If your 2025 FICA wages from this employer were over ${usd(ROTH_CATCH_UP_WAGES_2026)}, it must go in as Roth.`}
          </Callout>
        )}
        <Callout title="Roth or traditional?">
          Traditional contributions lower your tax bill now and are taxed when you take them out. Roth contributions are taxed now and come out tax-free in retirement. The balance above is the same either way; what you keep after tax differs.
        </Callout>
      </ResultCard>

      {rows.length > 0 && (
        <ResultCard title="Year by year" sub="Contributions and balance at each age shown.">
          <DataTable
            summary="Show the yearly table"
            columns={["Age", "You", "Employer", "Balance", "Today's dollars"]}
            rows={rows.map((y) => [y.age, usd(y.you), usd(y.employer), usd(y.balance), usd(y.real)])}
          />
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        A projection, not a promise. Investment returns vary and can be negative. Not financial advice.
      </p>
    </Studio>
  );
}
