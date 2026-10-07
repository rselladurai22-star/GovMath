"use client";

import { amortize, cardMinimum, minimumOnly, monthlyPayment, type Schedule } from "@/lib/us/loans";
import { balanceTransfer } from "@/lib/us/loans-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  balance: num(6_000, 0, 1_000_000),
  apr: num(22, 0, 40),
  mode: oneOf<"pay" | "months">("pay", ["pay", "months"]),
  payment: num(300, 0, 100_000),
  months: num(24, 1, 360),
  minPct: num(1, 0, 10),
  minFloor: num(25, 0, 500),
  bt: bool(false),
  btFee: num(3, 0, 10),
  btMonths: num(18, 0, 36),
  btPromo: num(0, 0, 40),
  btApr: num(22, 0, 40),
};
const ADVANCED = ["minPct", "minFloor", "bt", "btFee", "btMonths", "btPromo", "btApr"] as const;

const when = (s: Schedule) => (Number.isFinite(s.months) ? duration(s.months) : "Never");

export default function CardPayoffStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const firstInterest = (v.balance * v.apr) / 100 / 12;
  const pay = v.mode === "pay" ? v.payment : monthlyPayment(v.balance, v.apr, v.months);
  const plan = amortize(v.balance, v.apr, v.mode === "months" ? v.months : 0, 0, pay);
  const never = !Number.isFinite(plan.months) && v.balance > 0;
  const minimum = minimumOnly(v.balance, v.apr, v.minPct / 100, v.minFloor);
  const firstMin = cardMinimum(v.balance, v.apr, v.minPct / 100, v.minFloor);
  const transfer = balanceTransfer(v.balance, v.btFee, v.btMonths, v.btPromo, v.btApr, pay);
  const saved = Number.isFinite(minimum.months) && Number.isFinite(plan.months) ? minimum.totalInterest - plan.totalInterest : 0;
  const options = [
    { label: "Minimum payments only", s: minimum, pay: `${usd(firstMin, true)} falling` },
    { label: "Your plan", s: plan, pay: usd(pay, true) },
    ...(v.bt ? [{ label: `Balance transfer (${v.btFee}% fee)`, s: transfer as Schedule, pay: usd(pay, true) }] : []),
  ];
  const maxInt = Math.max(1, ...options.map((o) => (Number.isFinite(o.s.months) ? o.s.totalInterest + (o.s === transfer ? transfer.fee : 0) : 0)));
  const planBal = [v.balance, ...plan.rows.map((r) => r.balance)];
  const minBal = [v.balance, ...minimum.rows.map((r) => r.balance)];
  const btBal = [v.balance + transfer.fee, ...transfer.rows.map((r) => r.balance)];
  const yearly = Array.from({ length: Math.ceil(plan.rows.length / 12) }, (_, y) => {
    const part = plan.rows.slice(y * 12, y * 12 + 12);
    return [`Year ${y + 1}`, usd(part.reduce((s, r) => s + r.payment, 0)), usd(part.reduce((s, r) => s + r.interest, 0)), usd(part[part.length - 1]?.balance ?? 0)];
  });

  return (
    <Studio
      title="Your credit card"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my payoff"
      onReset={st.reset}
      dock={{ label: "Debt-free in", value: never ? "Never" : duration(plan.months) }}
      inputs={
        <>
          <InputGroup title="Your card">
            <MoneyField symbol="$" label="Card balance" value={v.balance} onChange={st.bind("balance")} slider={{ min: 500, max: 30_000, step: 100, ends: ["$500", "$30k"] }} />
            <StepperField label="Interest rate (APR)" value={v.apr} onChange={st.bind("apr")} step={0.25} min={0} max={36} unit="%" dp={2} info="On your statement. The average for cards charged interest was about 22% in 2026." />
          </InputGroup>
          <InputGroup title="Your plan">
            <Segmented
              label="How do you want to pay it off?"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "pay", label: "Pay a fixed amount each month" },
                { value: "months", label: "Clear it by a set time" },
              ]}
            />
            {v.mode === "pay" ? (
              <MoneyField symbol="$" label="Monthly payment" value={v.payment} onChange={st.bind("payment")} slider={{ min: 25, max: 2_000, step: 5, ends: ["$25", "$2,000"] }} />
            ) : (
              <StepperField label="Pay it off in" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={1} max={120} unit="months" dp={0} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Minimum payment: share of balance" value={v.minPct} onChange={st.bind("minPct")} step={0.5} min={0} max={5} unit="%" dp={1} optional info="Most cards set the minimum at 1% of the balance plus that month's interest and fees, or a floor such as $25 or $35, whichever is more. Some use 2% plus interest." />
            <MoneyField symbol="$" label="Minimum payment floor" value={v.minFloor} onChange={st.bind("minFloor")} optional />
            <Switch label="Compare a balance transfer" checked={v.bt} onChange={st.bind("bt")} optional info="Move the balance to a card with a 0% introductory rate. You pay a transfer fee, usually 3% to 5%, added to the balance." />
            {v.bt && (
              <>
                <StepperField label="Transfer fee" value={v.btFee} onChange={st.bind("btFee")} step={0.5} min={0} max={10} unit="%" dp={1} optional />
                <StepperField label="Introductory period" value={v.btMonths} onChange={(n) => st.set("btMonths", Math.round(n))} step={1} min={0} max={36} unit="months" dp={0} optional />
                <StepperField label="Introductory APR" value={v.btPromo} onChange={st.bind("btPromo")} step={0.25} min={0} max={30} unit="%" dp={2} optional />
                <StepperField label="APR after the introductory period" value={v.btApr} onChange={st.bind("btApr")} step={0.25} min={0} max={36} unit="%" dp={2} optional />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Debt-free in"
        value={never ? "Never" : v.balance <= 0 ? "Now" : duration(plan.months)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          never ? (
            <>
              A payment of <b>{usd(pay, true)}</b>{" "}does not cover the <b>{usd(firstInterest, true)}</b>{" "}of interest charged in the first month, so the balance never falls. Pay
              at least <b>{usd(firstInterest + 1, true)}</b>{" "}a month.
            </>
          ) : (
            <>
              Paying <b>{usd(pay, true)}</b>{" "}a month clears {usd(v.balance)} in <b>{duration(plan.months)}</b>{" "}with <b>{usd(plan.totalInterest)}</b>{" "}of interest.
              {Number.isFinite(minimum.months) ? (
                <>
                  {" "}
                  Paying only the minimum would take {duration(minimum.months)} and cost {usd(minimum.totalInterest)} in interest.
                </>
              ) : null}
            </>
          )
        }
        badges={[`First month's interest ${usd(firstInterest, true)}`, `Minimum now ${usd(firstMin, true)}`, ...(saved > 0 ? [`Saves ${usd(saved)} vs minimum`] : [])]}
      />

      <Facts
        items={[
          { label: "Monthly payment", value: usd(pay, true) },
          { label: "Time to pay off", value: when(plan) },
          { label: "Total interest", value: never ? "Grows forever" : usd(plan.totalInterest), tone: "warn" },
          { label: "Total paid", value: never ? "—" : usd(plan.totalPaid) },
          { label: "Interest saved vs minimum", value: usd(Math.max(0, saved)), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Interest", value: `${v.apr}% APR charged monthly at APR ÷ 12 (cards charge daily, which differs by cents)` },
          { label: "New spending", value: "None: the card is not used while you pay it off" },
          { label: "Minimum payment", value: `The larger of ${usd(v.minFloor)} and ${v.minPct}% of the balance plus the month's interest` },
          { label: "Fees", value: "No annual or late fees" },
          ...(v.bt ? [{ label: "Balance transfer", value: `${v.btFee}% fee added on day one, ${v.btPromo}% for ${v.btMonths} months, then ${v.btApr}%` }] : []),
        ]}
      />

      {!never && plan.totalPaid > 0 && (
        <ResultCard title="Where your payments go" sub="Your plan, start to finish.">
          <SplitBar
            segments={[
              { label: "Balance repaid", value: v.balance, display: usd(v.balance), color: "#0f9f6e" },
              { label: "Interest", value: plan.totalInterest, display: usd(plan.totalInterest), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Compare your options" sub="Total interest and time to clear the card.">
        <Compare
          head={["Option", "Interest"]}
          rows={options.map((o) => {
            const cost = (Number.isFinite(o.s.months) ? o.s.totalInterest : 0) + (o.s === transfer ? transfer.fee : 0);
            return {
              label: `${o.label} · ${o.pay} · ${when(o.s)}`,
              value: Number.isFinite(o.s.months) ? usd(cost) : "Never paid off",
              delta: o.s === transfer ? `incl. ${usd(transfer.fee)} fee` : undefined,
              bar: Number.isFinite(o.s.months) ? cost / maxInt : 1,
              current: o.label === "Your plan",
            };
          })}
        />
        {v.bt && Number.isFinite(transfer.months) && transfer.leftAtPromoEnd > 0 && (
          <Callout tone="warn" title="Balance left when the 0% ends">
            At {usd(pay, true)} a month you would still owe {usd(transfer.leftAtPromoEnd)} when the introductory rate ends after {v.btMonths} months. To clear it in time, pay{" "}
            {usd(v.btMonths > 0 ? (v.balance + transfer.fee) / v.btMonths : 0, true)} a month.
          </Callout>
        )}
      </ResultCard>

      <ResultCard title="Your balance over time" sub="Your plan against paying only the minimum.">
        <AreaChart
          ariaLabel="Card balance by month"
          series={[
            { key: "plan", label: "Your plan", color: "#0f9f6e", values: planBal, fill: true },
            { key: "min", label: "Minimum only", color: "#f59e0b", values: minBal },
            ...(v.bt ? [{ key: "bt", label: "Balance transfer", color: "#2e0a3a", values: btBal, dashed: true }] : []),
          ]}
          xLabel={(i) => `M${i}`}
          yFormat={usdShort}
          initial={Math.min(12, planBal.length - 1)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: your plan <b>{usd(planBal[i] ?? 0)}</b>, minimum only <b>{usd(minBal[i] ?? 0)}</b>
              {v.bt ? (
                <>
                  , transfer <b>{usd(btBal[i] ?? 0)}</b>
                </>
              ) : null}
              .
            </>
          )}
        />
        {!never && <DataTable summary="Year-by-year schedule" columns={["Year", "Paid", "Interest", "Balance left"]} rows={yearly} />}
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Clearing card debt faster.">
        <Callout title="Stop adding to the balance">
          This plan assumes you stop using the card. Any new purchases add to the balance and, unless you pay the full statement balance, they start charging interest too.
        </Callout>
        <Callout title="Ask for a lower rate">
          Card issuers sometimes cut the APR for customers with a good payment record who ask. A few points off the rate shortens the payoff and cuts the interest.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Your card agreement sets how interest and the minimum payment are worked out.
      </p>
    </Studio>
  );
}
