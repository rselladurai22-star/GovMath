"use client";

import { amortize, payoffPlan, type Debt, type PayoffResult } from "@/lib/us/loans";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  extra: num(200, 0, 100_000),
  method: oneOf<"avalanche" | "snowball">("avalanche", ["avalanche", "snowball"]),
  d1Name: text("Visa card", 24),
  d1Bal: num(6_000, 0, 10_000_000),
  d1Apr: num(24, 0, 40),
  d1Min: num(180, 0, 1_000_000),
  d2Name: text("Store card", 24),
  d2Bal: num(1_200, 0, 10_000_000),
  d2Apr: num(29, 0, 40),
  d2Min: num(40, 0, 1_000_000),
  d3Name: text("Car loan", 24),
  d3Bal: num(9_000, 0, 10_000_000),
  d3Apr: num(7.5, 0, 40),
  d3Min: num(280, 0, 1_000_000),
  d4Name: text("Personal loan", 24),
  d4Bal: num(4_000, 0, 10_000_000),
  d4Apr: num(12, 0, 40),
  d4Min: num(130, 0, 1_000_000),
  d5Name: text("Debt 5", 24),
  d5Bal: num(0, 0, 10_000_000),
  d5Apr: num(0, 0, 40),
  d5Min: num(0, 0, 1_000_000),
  d6Name: text("Debt 6", 24),
  d6Bal: num(0, 0, 10_000_000),
  d6Apr: num(0, 0, 40),
  d6Min: num(0, 0, 1_000_000),
};
type Values = { [K in keyof typeof SCHEMA]: (typeof SCHEMA)[K]["def"] };
type Slot = 1 | 2 | 3 | 4 | 5 | 6;
const keys = (i: Slot) => ({ name: `d${i}Name`, bal: `d${i}Bal`, apr: `d${i}Apr`, min: `d${i}Min` }) as { name: keyof Values; bal: keyof Values; apr: keyof Values; min: keyof Values };
const ADVANCED = ["d5Name", "d5Bal", "d5Apr", "d5Min", "d6Name", "d6Bal", "d6Apr", "d6Min"] as const;

/** "March 2029" for `months` from now. */
function monthsFromNow(months: number): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function DebtPayoffStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values as Values;
  const slots: Slot[] = [1, 2, 3, 4, 5, 6];
  const all: (Debt & { slot: Slot })[] = slots.map((i) => {
    const k = keys(i);
    return { slot: i, name: String(v[k.name]).trim() || `Debt ${i}`, balance: Number(v[k.bal]), aprPct: Number(v[k.apr]), minimum: Number(v[k.min]) };
  });
  const debts = all.filter((d) => d.balance > 0);
  const total = debts.reduce((s, d) => s + d.balance, 0);
  const minimums = debts.reduce((s, d) => s + d.minimum, 0);
  const snow = payoffPlan(debts, v.extra, "snowball");
  const aval = payoffPlan(debts, v.extra, "avalanche");
  const chosen: PayoffResult = v.method === "snowball" ? snow : aval;
  const other = v.method === "snowball" ? aval : snow;
  const done = Number.isFinite(chosen.months);
  const own = debts.map((d) => amortize(d.balance, d.aprPct, 0, 0, d.minimum));
  const ownMonths = own.reduce((m, s) => Math.max(m, s.months), 0);
  const ownInterest = own.reduce((s, x) => s + x.totalInterest, 0);
  const shortfall = debts.filter((d) => d.minimum <= (d.balance * d.aprPct) / 100 / 12);
  const diff = other.totalInterest - chosen.totalInterest;
  const label = v.method === "snowball" ? "Snowball" : "Avalanche";
  const otherLabel = v.method === "snowball" ? "Avalanche" : "Snowball";
  const snowBal = [total, ...snow.balances];
  const avalBal = [total, ...aval.balances];
  const maxInt = Math.max(1, snow.totalInterest, aval.totalInterest, Number.isFinite(ownMonths) ? ownInterest : 0);
  const when = (m: number) => (Number.isFinite(m) ? `${duration(m)} (${monthsFromNow(m)})` : "Never");

  const debtFields = (i: Slot, optional = false) => {
    const k = keys(i);
    return (
      <InputGroup key={i} title={`Debt ${i}`}>
        <TextField label={`Debt ${i} name`} value={String(v[k.name])} onChange={(s) => st.set(k.name, s as never)} maxLength={24} optional={optional} />
        <MoneyField symbol="$" label="Balance" value={Number(v[k.bal])} onChange={(n) => st.set(k.bal, n as never)} optional={optional} />
        <StepperField label="Interest rate (APR)" value={Number(v[k.apr])} onChange={(n) => st.set(k.apr, n as never)} step={0.25} min={0} max={36} unit="%" dp={2} optional={optional} />
        <MoneyField symbol="$" label="Minimum payment" value={Number(v[k.min])} onChange={(n) => st.set(k.min, n as never)} optional={optional} />
      </InputGroup>
    );
  };

  return (
    <Studio
      title="Your debts"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare payoff plans"
      onReset={st.reset}
      dock={{ label: "Debt-free in", value: done ? duration(chosen.months) : "Never" }}
      inputs={
        <>
          {debtFields(1)}
          {debtFields(2)}
          {debtFields(3)}
          {debtFields(4)}
          <InputGroup title="Your plan">
            <MoneyField symbol="$" label="Extra each month, on top of the minimums" value={v.extra} onChange={st.bind("extra")} slider={{ min: 0, max: 2_000, step: 25, ends: ["$0", "$2,000"] }} />
            <Segmented
              label="Method"
              value={v.method}
              onChange={st.bind("method")}
              options={[
                { value: "avalanche", label: "Avalanche: highest rate first", note: "Saves the most interest." },
                { value: "snowball", label: "Snowball: smallest balance first", note: "Clears whole debts sooner, for quick wins." },
              ]}
            />
          </InputGroup>
          <AdvancedOptions title="More debts" description="Optional. Add a fifth and sixth debt." changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {debtFields(5, true)}
            {debtFields(6, true)}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Debt-free with the ${label.toLowerCase()}`}
        value={total <= 0 ? "No debts" : done ? duration(chosen.months) : "Never"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          total <= 0 ? (
            <>Enter a balance for at least one debt.</>
          ) : !done ? (
            <>
              Your payments of <b>{usd(minimums + v.extra)}</b> a month do not keep up with the interest. Raise the minimums or the extra amount.
            </>
          ) : (
            <>
              Paying <b>{usd(minimums + v.extra)}</b> a month clears <b>{usd(total)}</b> of debt by <b>{monthsFromNow(chosen.months)}</b>, with <b>{usd(chosen.totalInterest)}</b> of
              interest.{" "}
              {Math.abs(diff) < 1 ? (
                <>The {otherLabel.toLowerCase()} method costs the same here.</>
              ) : diff > 0 ? (
                <>
                  That is {usd(diff)} less than the {otherLabel.toLowerCase()} method.
                </>
              ) : (
                <>
                  The {otherLabel.toLowerCase()} method would save {usd(-diff)} more.
                </>
              )}
            </>
          )
        }
        badges={[`${debts.length} ${debts.length === 1 ? "debt" : "debts"}`, `${usd(minimums)} minimums + ${usd(v.extra)} extra`, ...(Number.isFinite(ownMonths) && done ? [`Saves ${usd(Math.max(0, ownInterest - chosen.totalInterest))} vs minimums only`] : [])]}
      />

      <Facts
        items={[
          { label: "Total debt", value: usd(total) },
          { label: "Monthly budget", value: usd(minimums + v.extra) },
          { label: "Time to debt-free", value: done ? duration(chosen.months) : "Never" },
          { label: "Total interest", value: done ? usd(chosen.totalInterest) : "—", tone: "warn" },
          { label: "Debt-free date", value: done ? monthsFromNow(chosen.months) : "—", tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Budget", value: "The total of every minimum plus your extra stays the same each month; when a debt is cleared its minimum rolls on to the next" },
          { label: "Interest", value: "Each APR charged monthly at APR ÷ 12; no new borrowing or fees" },
          { label: "Order", value: "Avalanche: highest APR first (ties: smaller balance). Snowball: smallest balance first (ties: higher APR)" },
          { label: "Start", value: "Payments start next month" },
        ]}
      />

      {done && (
        <ResultCard title="Where your payments go" sub={`${label} method.`}>
          <SplitBar
            segments={[
              { label: "Debt repaid", value: total, display: usd(total), color: "#0f9f6e" },
              { label: "Interest", value: chosen.totalInterest, display: usd(chosen.totalInterest), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Snowball vs avalanche" sub="Same budget, different order.">
        <Compare
          head={["Plan", "Interest"]}
          rows={[
            { label: `Avalanche · ${when(aval.months)}`, value: Number.isFinite(aval.months) ? usd(aval.totalInterest) : "Never paid off", bar: aval.totalInterest / maxInt, current: v.method === "avalanche" },
            { label: `Snowball · ${when(snow.months)}`, value: Number.isFinite(snow.months) ? usd(snow.totalInterest) : "Never paid off", bar: snow.totalInterest / maxInt, current: v.method === "snowball" },
            {
              label: `Minimums only, no roll-over · ${when(ownMonths)}`,
              value: Number.isFinite(ownMonths) ? usd(ownInterest) : "Never paid off",
              bar: Number.isFinite(ownMonths) ? ownInterest / maxInt : 1,
            },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your payoff order" sub={`${label} method: when each debt is cleared.`}>
        <DataTable
          summary="Order and payoff dates"
          columns={["Order", "Debt", "Balance", "APR", "Cleared in"]}
          rows={chosen.order.map((i, n) => [n + 1, debts[i].name, usd(debts[i].balance), `${debts[i].aprPct}%`, chosen.clearedMonth[i] > 0 ? `${duration(chosen.clearedMonth[i])} (${monthsFromNow(chosen.clearedMonth[i])})` : "Not cleared"])}
        />
      </ResultCard>

      <ResultCard title="Total balance over time" sub="Both methods, month by month.">
        <AreaChart
          ariaLabel="Total debt by month"
          series={[
            { key: "aval", label: "Avalanche", color: "#0f9f6e", values: avalBal, fill: v.method === "avalanche" },
            { key: "snow", label: "Snowball", color: "#f59e0b", values: snowBal, fill: v.method === "snowball", dashed: v.method !== "snowball" },
          ]}
          xLabel={(i) => `M${i}`}
          yFormat={usdShort}
          initial={Math.min(12, avalBal.length - 1)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: avalanche <b>{usd(avalBal[i] ?? 0)}</b> left, snowball <b>{usd(snowBal[i] ?? 0)}</b> left.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Making the plan stick.">
        {shortfall.length > 0 && (
          <Callout tone="warn" title="A minimum payment does not cover its interest">
            {shortfall.map((d) => d.name).join(", ")}: the minimum is less than the interest charged each month, so that debt would grow on its own. The plan still works if your total
            budget is enough, but check the minimum on your statement.
          </Callout>
        )}
        <Callout title="Keep the budget the same">
          The plan works because the money freed by each cleared debt goes to the next one. If you spend it instead, you lose most of the benefit.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Lenders may charge interest daily and change rates or minimums.
      </p>
    </Studio>
  );
}
