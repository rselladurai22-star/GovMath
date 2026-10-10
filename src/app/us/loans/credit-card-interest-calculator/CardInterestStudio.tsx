"use client";

import { cardCycle, cardYear, type CardCycleInput } from "@/lib/us/loan-math";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  balance: num(5_000, 0, 1_000_000),
  apr: num(22, 0, 40),
  payment: num(200, 0, 1_000_000),
  purchases: num(500, 0, 1_000_000),
  grace: bool(false),
  days: num(30, 25, 31),
  purchaseDay: num(10, 1, 31),
  paymentDay: num(20, 1, 31),
  compound: bool(true),
  year: oneOf<"365" | "360">("365", ["365", "360"]),
};
const ADVANCED = ["days", "purchaseDay", "paymentDay", "compound", "year"] as const;

const ratePct = (n: number) => `${(n * 100).toFixed(5)}%`;

export default function CardInterestStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const days = Math.round(v.days);
  const input: CardCycleInput = {
    balance: v.balance,
    aprPct: v.apr,
    days,
    purchases: v.purchases,
    purchaseDay: Math.min(days, v.purchaseDay),
    payment: v.payment,
    paymentDay: Math.min(days, v.paymentDay),
    grace: v.grace,
    compoundDaily: v.compound,
    yearDays: Number(v.year),
  };
  const c = cardCycle(input);
  const yr = cardYear(input);
  const yearPurchases = v.purchases * 12;
  // The same month with the payment made on the first day or the last day of the cycle.
  const early = cardCycle({ ...input, paymentDay: 1 });
  const late = cardCycle({ ...input, paymentDay: days });
  const noPay = cardCycle({ ...input, payment: 0 });
  const monthlyRate = v.apr / 12;
  const paidDown = Math.max(0, v.payment - c.interest);
  const growing = yr.endBalance > v.balance + 0.005;
  const bal = [v.balance, ...yr.months.map((m) => m.endBalance)];
  const cumInt = yr.months.reduce<number[]>((acc, m) => [...acc, acc[acc.length - 1] + m.interest], [0]);
  const maxInt = Math.max(1, early.interest, late.interest, noPay.interest, c.interest);

  return (
    <Studio
      title="Your card"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my interest"
      onReset={st.reset}
      dock={{ label: "Interest this month", value: usd(c.interest, true) }}
      inputs={
        <>
          <InputGroup title="This billing cycle">
            <MoneyField label="Balance at the start of the cycle" symbol="$" value={v.balance} onChange={st.bind("balance")} pence slider={{ min: 0, max: 20_000, step: 100, ends: ["$0", "$20k"] }} />
            <StepperField
              label="Purchase APR"
              value={v.apr}
              onChange={st.bind("apr")}
              step={0.25}
              min={0}
              max={36}
              unit="%"
              dp={2}
              info="On your statement. The Federal Reserve put the average at about 22.4% for accounts charged interest in August 2026."
            />
            <MoneyField label="New purchases this cycle" symbol="$" value={v.purchases} onChange={st.bind("purchases")} pence />
            <MoneyField label="Payment this cycle" symbol="$" value={v.payment} onChange={st.bind("payment")} pence />
            <Switch
              label="I paid my last statement in full"
              checked={v.grace}
              onChange={st.bind("grace")}
              info="If you paid the whole statement balance by the due date, most cards give a grace period: no interest on purchases, as long as you pay this statement in full too."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Days in the billing cycle" optional value={v.days} onChange={st.bind("days")} step={1} min={25} max={31} unit="days" dp={0} />
            <StepperField label="Day the purchases post" optional value={v.purchaseDay} onChange={st.bind("purchaseDay")} step={1} min={1} max={31} unit="days" dp={0} info="Day 1 is the first day of the cycle. We put all of the month's purchases on one day." />
            <StepperField label="Day your payment is credited" optional value={v.paymentDay} onChange={st.bind("paymentDay")} step={1} min={1} max={31} unit="days" dp={0} />
            <Switch label="Add interest to the balance each day" optional checked={v.compound} onChange={st.bind("compound")} info="Most issuers compound daily: each day's interest is added to the balance, and the next day's interest is charged on it." />
            <Segmented
              label="Daily rate"
              optional
              value={v.year}
              onChange={st.bind("year")}
              options={[
                { value: "365", label: "APR ÷ 365" },
                { value: "360", label: "APR ÷ 360" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Interest this billing cycle"
        value={usd(c.interest, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          c.graceApplied ? (
            <>
              Because you paid last month in full and your payment covers the {usd(v.balance, true)}{" "}statement balance, the grace period applies and you pay <b>no interest</b>{" "}
              this cycle.
            </>
          ) : (
            <>
              An average daily balance of <b>{usd(c.averageDailyBalance, true)}</b>{" "}at a daily rate of {ratePct(c.dailyRate)}{" "}for {days} days costs{" "}
              <b>{usd(c.interest, true)}</b>{" "}in interest. Of your {usd(v.payment, true)}{" "}payment, {usd(paidDown, true)}{" "}is left after this month&rsquo;s interest. Over 12
              months on the same pattern you would pay <b>{usd(yr.totalInterest)}</b>{" "}in interest.
            </>
          )
        }
        badges={[`Daily rate ${ratePct(c.dailyRate)}`, `Monthly rate about ${monthlyRate.toFixed(2)}%`, `New balance ${usd(c.endBalance, true)}`]}
      />

      <Facts
        items={[
          { label: "Average daily balance", value: usd(c.averageDailyBalance, true) },
          { label: "Interest this cycle", value: usd(c.interest, true), tone: c.interest > 0 ? "warn" : "good" },
          { label: "New statement balance", value: usd(c.endBalance, true) },
          { label: "Interest over 12 months", value: usd(yr.totalInterest), tone: yr.totalInterest > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Method", value: "Average daily balance, including new purchases" },
          { label: "Daily periodic rate", value: `APR ÷ ${v.year} = ${ratePct(c.dailyRate)}${v.compound ? ", compounded daily" : ", not compounded"}` },
          { label: "Timing", value: `${days}-day cycle; purchases post on day ${input.purchaseDay}, payment credited on day ${input.paymentDay}` },
          { label: "Not included", value: "Cash advances (no grace period), balance transfers, fees and penalty APRs" },
        ]}
      />

      <ResultCard title="Your new statement balance" sub="What makes up the balance at the end of the cycle.">
        <SplitBar
          segments={[
            { label: "Balance carried after your payment", value: Math.max(0, v.balance - v.payment), display: usd(Math.max(0, v.balance - v.payment)), color: "#16a34a" },
            { label: "New purchases", value: Math.max(0, c.endBalance - c.interest - Math.max(0, v.balance - v.payment)), display: usd(Math.max(0, c.endBalance - c.interest - Math.max(0, v.balance - v.payment))), color: "#0ea5e9" },
            { label: "Interest", value: c.interest, display: usd(c.interest), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your balance day by day" sub="Each day's balance is charged the daily rate.">
        <AreaChart
          ariaLabel="Daily balance through the billing cycle"
          series={[{ key: "d", label: "Daily balance", color: "#16a34a", values: [v.balance, ...c.daily], fill: true }]}
          xLabel={(i) => `${i}`}
          yFormat={usdShort}
          initial={Math.min(input.paymentDay, c.daily.length)}
          hint="Drag across the chart, or use the arrow keys, to read any day."
          readout={(i) => (
            <>
              Day <b>{i}</b>: balance <b>{usd(i === 0 ? v.balance : (c.daily[i - 1] ?? 0), true)}</b>.
            </>
          )}
        />
      </ResultCard>

      {!c.graceApplied && (
        <ResultCard title="When you pay matters" sub="The same payment on different days of the cycle.">
          <Compare
            head={["Payment", "Interest"]}
            rows={[
              { label: "On day 1", value: usd(early.interest, true), bar: early.interest / maxInt, delta: `${usd(Math.abs(c.interest - early.interest), true)} less` },
              { label: `On day ${input.paymentDay} (yours)`, value: usd(c.interest, true), bar: c.interest / maxInt, current: true },
              { label: `On day ${days}`, value: usd(late.interest, true), bar: late.interest / maxInt },
              { label: "No payment", value: usd(noPay.interest, true), bar: noPay.interest / maxInt },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="The next 12 months" sub={`Paying ${usd(v.payment)} and spending ${usd(v.purchases)} each month.`}>
        <Facts
          items={[
            { label: "Interest", value: usd(yr.totalInterest), tone: "warn" },
            { label: "Paid", value: usd(yr.totalPaid) },
            { label: "New purchases", value: usd(yearPurchases) },
            { label: "Balance after a year", value: usd(yr.endBalance, true), tone: growing ? "bad" : "good" },
          ]}
        />
        <AreaChart
          ariaLabel="Card balance over 12 months"
          series={[
            { key: "b", label: "Balance", color: "#16a34a", values: bal, fill: true },
            { key: "i", label: "Interest so far", color: "#f59e0b", values: cumInt },
          ]}
          xLabel={(i) => `${i}`}
          yFormat={usdShort}
          initial={12}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, interest so far <b>{usd(cumInt[i] ?? 0)}</b>.
            </>
          )}
        />
        <DataTable
          summary="Month by month"
          columns={["Month", "Start balance", "Purchases", "Payment", "Interest", "End balance"]}
          rows={yr.months.map((m) => [m.month, usd(m.startBalance, true), usd(m.purchases, true), usd(m.payment, true), usd(m.interest, true), usd(m.endBalance, true)])}
        />
      </ResultCard>

      {growing ? (
        <Callout tone="warn" title="Your balance is growing">
          New purchases and interest add more than your payment takes off, so the balance rises to {usd(yr.endBalance)} in a year. Our{" "}
          <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a>{" "}shows the payment that clears it.
        </Callout>
      ) : !v.grace && v.payment >= v.balance + v.purchases ? (
        <Callout tone="good" title="You are about to get your grace period back">
          Pay the full statement balance and, from the next cycle, new purchases should be interest-free again.
        </Callout>
      ) : (
        <Callout title="Paying in full stops the interest">
          Pay the whole statement balance by the due date each month and most cards charge no interest on purchases at all.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. Your card agreement sets the balance method, the daily rate and the grace period; your statement shows the interest charged.
      </p>
    </Studio>
  );
}
