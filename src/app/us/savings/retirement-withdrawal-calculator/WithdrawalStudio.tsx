"use client";

import { sustainableWithdrawal, withdrawals } from "@/lib/us/investing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, per, percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const MODES = ["fixed", "percent"] as const;
const MAX_YEARS = 60;

const SCHEMA = {
  balance: num(1_000_000, 0, 1_000_000_000),
  mode: oneOf<(typeof MODES)[number]>("fixed", MODES),
  amount: num(40_000, 0, 100_000_000),
  pct: num(4, 0, 50),
  ret: num(5, -10, 15),
  infl: num(2.5, 0, 10),
  adjust: bool(true),
  target: num(30, 1, 60),
  fall: num(0, 0, 60),
  tax: num(0, 0, 50),
};
const ADVANCED = ["adjust", "target", "fall", "tax"] as const;

export default function WithdrawalStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const firstYearReturnPct = v.fall > 0 ? -v.fall : null;
  const p = withdrawals({
    balance: v.balance,
    mode: v.mode,
    amount: v.amount,
    pct: v.pct,
    inflationAdjust: v.adjust,
    returnPct: v.ret,
    inflationPct: v.infl,
    firstYearReturnPct,
    taxRate: v.tax / 100,
    maxYears: MAX_YEARS,
  });
  const target = Math.round(v.target);
  const sus = sustainableWithdrawal(v.balance, target, v.ret, v.infl, v.adjust, firstYearReturnPct);
  const horizons = Array.from(new Set([20, 25, 30, 35, 40, target])).sort((a, b) => a - b);
  const susRows = horizons.map((h) => ({ h, w: sustainableWithdrawal(v.balance, h, v.ret, v.infl, v.adjust, firstYearReturnPct) }));
  const topSus = Math.max(1, ...susRows.map((s) => s.w));
  const forever = p.lasts === Infinity;
  const lastsText = forever ? `${MAX_YEARS}+ years` : duration(p.lasts * 12);
  const meetsTarget = forever || p.lasts >= target;
  const fixed = v.mode === "fixed";

  const bal = [Math.max(0, v.balance), ...p.years.map((y) => y.end)];
  const real = [Math.max(0, v.balance), ...p.years.map((y) => y.real)];
  const step = p.years.length > 30 ? 5 : p.years.length > 15 ? 2 : 1;
  const rows = p.years.filter((y) => y.year === 1 || y.year % step === 0 || y.year === p.years.length);
  const firstYear = p.years[0];
  const lastIncome = p.years.length ? p.years[Math.min(p.years.length, target) - 1] : undefined;

  return (
    <Studio
      title="Your retirement withdrawals"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See how long it lasts"
      onReset={st.reset}
      dock={{ label: "Your money lasts", value: lastsText }}
      inputs={
        <>
          <InputGroup title="Savings">
            <MoneyField label="Savings at retirement" value={v.balance} onChange={st.bind("balance")} symbol="$" slider={{ min: 0, max: 3_000_000, step: 10_000, ends: ["$0", "$3m"] }} info="Everything you will draw on: 401(k), IRAs and other investments." />
          </InputGroup>
          <InputGroup title="Withdrawals">
            <RadioGroup
              label="Withdraw"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "fixed", label: "A dollar amount a year" },
                { value: "percent", label: "A percentage of the balance" },
              ]}
              info="A dollar amount gives steady income but can run out. A percentage of each year's balance never runs out, but your income rises and falls with the markets."
            />
            {fixed ? (
              <MoneyField label="First year's withdrawal" value={v.amount} onChange={st.bind("amount")} symbol="$" slider={{ min: 0, max: 200_000, step: 1_000, ends: ["$0", "$200k"] }} info="Before tax. It rises with inflation each year unless you turn that off under More options." />
            ) : (
              <StepperField label="Share of the balance each year" value={v.pct} onChange={st.bind("pct")} step={0.25} min={0} max={50} unit="%" dp={2} />
            )}
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.25} min={-10} max={15} unit="%" dp={2} info="After fees, before inflation. A balanced portfolio of stocks and bonds might assume 4% to 6%." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Raise withdrawals with inflation" checked={v.adjust} onChange={st.bind("adjust")} optional info="Keeps your spending power steady, as in the 4% rule. Turn off for a flat dollar amount." />
            <StepperField label="Plan for this many years" value={v.target} onChange={(n) => st.set("target", Math.round(n))} step={1} min={1} max={60} unit="years" dp={0} optional info="Used for the largest withdrawal that lasts this long. 30 years suits retiring in your mid-60s." />
            <StepperField label="Market fall in the first year" value={v.fall} onChange={st.bind("fall")} step={5} min={0} max={60} unit="%" dp={0} optional info="Tests sequence-of-returns risk: a loss in year 1, then your normal return." />
            <StepperField label="Tax on withdrawals" value={v.tax} onChange={st.bind("tax")} step={1} min={0} max={50} unit="%" dp={0} optional info="Your average tax rate on withdrawals from traditional 401(k) and IRA money. Roth withdrawals are usually tax-free." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your money lasts"
        value={lastsText}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          fixed ? (
            <>
              Taking <b>{usd(v.amount)}</b> a year{v.adjust ? `, rising ${v.infl}% a year with inflation,` : ""} from <b>{usd(v.balance)}</b>{" "}
              earning {v.ret}% a year{v.fall > 0 ? ` after a ${v.fall}% fall in year 1` : ""},{" "}
              {forever ? <>your savings last more than <b>{MAX_YEARS} years</b>.</> : <>your savings run out after <b>{lastsText}</b>.</>}
              {" "}The most you could take to last exactly {target} {per(target, "years")} is <b>{usd(sus)}</b> in the first year.
            </>
          ) : (
            <>
              Taking <b>{v.pct}%</b> of the balance each year never empties the account, but income changes with the balance: <b>{usd(firstYear?.withdrawn ?? 0)}</b> in year 1
              {lastIncome ? <> and <b>{usd(lastIncome.withdrawn)}</b> in year {lastIncome.year}, worth <b>{usd(lastIncome.realWithdrawn)}</b> in today&apos;s dollars</> : null}.
            </>
          )
        }
        badges={[`Withdrawal rate ${percent(p.rate, 2)}`, meetsTarget ? `Lasts your ${target} years` : `Short of ${target} years`, `Max for ${target} years: ${usd(sus)}`]}
      />

      <Facts
        items={[
          { label: "First year's withdrawal", value: usd(p.firstYear) },
          { label: "After tax, first year", value: usd(p.firstYear * (1 - v.tax / 100)) },
          { label: forever || !fixed ? `Withdrawn over ${p.years.length} years` : "Withdrawn in total", value: usd(p.totalWithdrawn) },
          { label: "Left at the end", value: usd(p.endBalance), tone: p.endBalance > 0 ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Return", value: `${v.ret}% a year, the same every year${v.fall > 0 ? `, except a ${v.fall}% loss in year 1` : ""}` },
          { label: "Withdrawals", value: fixed ? `${usd(v.amount)} in year 1, taken monthly${v.adjust ? `, rising ${v.infl}% a year` : ", the same every year"}` : `${v.pct}% of each year's starting balance, taken monthly` },
          { label: "Tax", value: v.tax ? `${v.tax}% of each withdrawal` : "Not taken off (withdrawals shown before tax)" },
          { label: "Other income", value: "Not included: Social Security and pensions reduce what you need to withdraw" },
        ]}
      />

      <ResultCard title="Your balance year by year" sub="What's left at the end of each year, and the same in today's dollars.">
        <AreaChart
          ariaLabel="Savings balance by year of retirement"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "real", label: "In today's dollars", color: "#94a3b8", values: real, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={bal.length - 1}
          readout={(i) => (
            <>
              End of year <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, worth <b>{usd(real[i] ?? 0)}</b> in today&apos;s dollars.
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Withdrawn", value: p.totalWithdrawn, display: usd(p.totalWithdrawn), color: "#0f9f6e" },
            { label: "Left at the end", value: Math.max(0, p.endBalance), display: usd(p.endBalance), color: "#94a3b8" },
          ]}
        />
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "Start", "Withdrawn", v.tax ? "After tax" : "In today's dollars", "Growth", "End"]}
          rows={rows.map((y) => [y.year, usd(y.start), usd(y.withdrawn), v.tax ? usd(y.afterTax) : usd(y.realWithdrawn), usd(y.growth), usd(y.end)])}
        />
      </ResultCard>

      <ResultCard title="The most you can take" sub={`Largest first-year withdrawal that lasts each period, at ${v.ret}% with ${v.adjust ? `${v.infl}% inflation raises` : "flat withdrawals"}.`}>
        <Compare
          head={["Must last", "First-year withdrawal"]}
          rows={susRows.map((s) => ({
            label: `${s.h} years${s.h === target ? " (your plan)" : ""}`,
            value: usd(s.w),
            delta: v.balance > 0 ? percent(s.w / v.balance, 2) : "",
            bar: s.w / topSus,
            current: s.h === target,
          }))}
        />
        <Callout title="The 4% rule">
          In 1994 William Bengen found that a 4% first-year withdrawal, raised with inflation, lasted at least 30 years in every historical period he tested, with a mix of stocks and bonds. The 1998 Trinity study reached a similar answer. It is a rule of thumb from US history, not a guarantee.
        </Callout>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Risks a steady average return hides.">
        {v.fall === 0 ? (
          <Callout title="Test a bad start">
            Losses early in retirement do the most damage, because you sell investments while prices are low. Set &quot;Market fall in the first year&quot; under More options to see how a 20% fall changes your plan.
          </Callout>
        ) : (
          <Callout tone="warn" title={`A ${v.fall}% fall in year 1`}>
            Losing money while you are withdrawing it shrinks the base that later growth works on. That is sequence-of-returns risk, and it is why many retirees keep a year or two of spending in cash or bonds.
          </Callout>
        )}
        {!meetsTarget && fixed && (
          <Callout tone="warn" title={`Your plan runs short by ${duration((target - p.lasts) * 12)}`}>
            Lowering the first-year withdrawal to {usd(sus)}, working longer, delaying Social Security or covering some spending with an annuity would help it last {target} years.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        A projection with steady returns. Real returns vary and can be negative. Not financial advice.
      </p>
    </Studio>
  );
}
