"use client";

import { netWorth, SCF_2022, type AgeGroup } from "@/lib/us/wealth";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  age: num(40, 18, 100),
  cash: num(15_000, 0, 1_000_000_000),
  retirement: num(90_000, 0, 1_000_000_000),
  investments: num(20_000, 0, 1_000_000_000),
  home: num(400_000, 0, 1_000_000_000),
  vehicles: num(20_000, 0, 1_000_000_000),
  mortgage: num(300_000, 0, 1_000_000_000),
  auto: num(15_000, 0, 1_000_000_000),
  student: num(25_000, 0, 1_000_000_000),
  cards: num(5_000, 0, 1_000_000_000),
  otherAssets: num(0, 0, 1_000_000_000),
  otherDebts: num(0, 0, 1_000_000_000),
  income: num(0, 0, 100_000_000),
};
const ADVANCED = ["otherAssets", "otherDebts", "income"] as const;
const GROUPS: AgeGroup[] = ["under35", "35to44", "45to54", "55to64", "65to74", "75plus"];

export default function NetWorthStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const n = netWorth(v);
  const scf = SCF_2022[n.group];
  const negative = n.net < 0;
  const dta = Number.isFinite(n.debtToAsset) ? percent(n.debtToAsset, 0) : "No assets";
  const multiple = n.vsMedian >= 0 ? `${n.vsMedian.toFixed(2)}×` : "Below zero";
  const rule = v.income > 0 ? (v.age * v.income) / 10 : 0;

  return (
    <Studio
      title="Your net worth"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate net worth"
      onReset={st.reset}
      dock={{ label: "Net worth", value: usd(n.net) }}
      inputs={
        <>
          <InputGroup title="What you own">
            <StepperField label="Your age" value={v.age} onChange={(x) => st.set("age", Math.round(x))} step={1} min={18} max={100} unit="years" dp={0} info="Used to compare you with families of the same age in the Federal Reserve's survey." />
            <MoneyField label="Cash and savings" value={v.cash} onChange={st.bind("cash")} symbol="$" info="Checking, savings, money market accounts and CDs." />
            <MoneyField label="Retirement accounts" value={v.retirement} onChange={st.bind("retirement")} symbol="$" info="401(k), 403(b), IRAs, Roth IRAs and HSAs, at today's balance." />
            <MoneyField label="Other investments" value={v.investments} onChange={st.bind("investments")} symbol="$" info="Brokerage accounts, stocks, funds, bonds, crypto and 529 plans." />
            <MoneyField label="Home value" value={v.home} onChange={st.bind("home")} symbol="$" info="What it would sell for today, not what you paid. Include other real estate." />
            <MoneyField label="Vehicles" value={v.vehicles} onChange={st.bind("vehicles")} symbol="$" info="Private-party sale value, which is usually below the dealer price." />
          </InputGroup>
          <InputGroup title="What you owe">
            <MoneyField label="Mortgage balance" value={v.mortgage} onChange={st.bind("mortgage")} symbol="$" info="Include any home equity loan or HELOC balance." />
            <MoneyField label="Auto loans" value={v.auto} onChange={st.bind("auto")} symbol="$" />
            <MoneyField label="Student loans" value={v.student} onChange={st.bind("student")} symbol="$" />
            <MoneyField label="Credit card balances" value={v.cards} onChange={st.bind("cards")} symbol="$" info="What you owe today, including balances you will pay in full this month." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Other assets" value={v.otherAssets} onChange={st.bind("otherAssets")} symbol="$" optional info="A business stake, cash-value life insurance, money owed to you, or valuables you would really sell." />
            <MoneyField label="Other debts" value={v.otherDebts} onChange={st.bind("otherDebts")} symbol="$" optional info="Personal loans, medical bills, buy now pay later, 401(k) loans, money owed to family and tax due." />
            <MoneyField label="Household income a year" value={v.income} onChange={st.bind("income")} symbol="$" optional info="Optional. Adds the 'age × income ÷ 10' rule of thumb from The Millionaire Next Door." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your net worth"
        value={usd(n.net)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You own <b>{usd(n.assets)}</b>{" "}and owe <b>{usd(n.liabilities)}</b>. {negative ? "Your debts are larger than your assets, which is common early in a career, especially with student loans." : null}{" "}
            The median family aged {scf.label.toLowerCase()} had <b>{usd(scf.median)}</b>{" "}in the Federal Reserve&apos;s 2022 survey, so you have{" "}
            {n.net >= 0 ? <b>{multiple} the median</b> : <b>less than zero</b>}.
          </>
        }
        badges={[`Debt-to-asset ${dta}`, `Home equity ${usd(n.homeEquity)}`, `Age group ${scf.label}`]}
      />

      <Facts
        items={[
          { label: "Total assets", value: usd(n.assets) },
          { label: "Total debts", value: usd(n.liabilities) },
          { label: "Net worth without your home", value: usd(n.excludingHome), tone: n.excludingHome >= 0 ? "good" : "warn" },
          { label: "Debt-to-asset ratio", value: dta, tone: !Number.isFinite(n.debtToAsset) || n.debtToAsset > 0.8 ? "bad" : n.debtToAsset > 0.5 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        note="Change any figure above; other assets, other debts and income are under More options."
        items={[
          { label: "Values", value: "What things would sell for today, before selling costs" },
          { label: "Retirement accounts", value: "At full balance, before income tax on withdrawals" },
          { label: "Comparison", value: "Survey of Consumer Finances 2022, families by age of the head, in 2022 dollars" },
        ]}
      />

      <ResultCard title="What you own" sub="Your assets by type.">
        <SplitBar
          segments={[
            { label: "Cash and savings", value: v.cash, display: usd(v.cash), color: "#0f9f6e" },
            { label: "Retirement accounts", value: v.retirement, display: usd(v.retirement), color: "#5b1e6e" },
            { label: "Other investments", value: v.investments, display: usd(v.investments), color: "#2e0a3a" },
            { label: "Home", value: v.home, display: usd(v.home), color: "#f59e0b" },
            { label: "Vehicles", value: v.vehicles, display: usd(v.vehicles), color: "#0ea5e9" },
            { label: "Other assets", value: v.otherAssets, display: usd(v.otherAssets), color: "#94a3b8" },
          ].filter((s) => s.value > 0)}
        />
      </ResultCard>

      <ResultCard title="Your balance sheet" sub="Assets less debts, with the figures lenders and planners look at.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Total assets", values: [usd(n.assets)] },
            { label: "Mortgage", values: [usd(v.mortgage)], kind: "deduction" },
            { label: "Auto loans", values: [usd(v.auto)], kind: "deduction" },
            { label: "Student loans", values: [usd(v.student)], kind: "deduction" },
            { label: "Credit cards", values: [usd(v.cards)], kind: "deduction" },
            ...(v.otherDebts > 0 ? [{ label: "Other debts", values: [usd(v.otherDebts)], kind: "deduction" as const }] : []),
            { label: "Net worth", values: [usd(n.net)], kind: "total" },
            { label: "Home equity (home less mortgage)", values: [usd(n.homeEquity)] },
            { label: "Liquid net worth (cash and investments less non-mortgage debt)", values: [usd(n.liquid)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="How you compare" sub="Median net worth by age of the family head, Federal Reserve Survey of Consumer Finances 2022 (2022 dollars).">
        <BarChart
          rows={GROUPS.map((g) => ({
            label: SCF_2022[g].label,
            note: `Mean ${usd(SCF_2022[g].mean)}`,
            value: SCF_2022[g].median,
            display: usd(SCF_2022[g].median),
            current: g === n.group,
          }))}
          caption="Half of families have more than the median and half less. The mean is far higher because a small number of very wealthy families pull it up."
        />
        <Statement
          columns={["Median", "Mean"]}
          rows={[
            { label: `Families aged ${scf.label.toLowerCase()}`, values: [usd(scf.median), usd(scf.mean)] },
            { label: "You", values: [usd(n.net), `${multiple} the median`], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Reading your number.">
        {rule > 0 && (
          <Callout title={`The 'age × income ÷ 10' rule: ${usd(rule)}`}>
            The Millionaire Next Door suggested a simple benchmark: your age times your yearly household income, divided by ten. You are at{" "}
            {percent(n.net / rule, 0)} of it. It is a rough yardstick that suits mid-career earners better than young ones.
          </Callout>
        )}
        {Number.isFinite(n.debtToAsset) && n.debtToAsset > 0.5 && (
          <Callout tone="warn" title="Debts above half your assets">
            A debt-to-asset ratio over 50% is common with a new mortgage or student loans, but it leaves little room if home prices fall. Paying down
            high-interest debt first raises net worth fastest.
          </Callout>
        )}
        <Callout title="Track the trend, not the number">
          Work it out once or twice a year with the same method. Rising net worth shows your saving and debt payoff are working, whatever the
          averages say.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Survey figures are for families, in 2022 dollars. Not financial advice.
      </p>
    </Studio>
  );
}
