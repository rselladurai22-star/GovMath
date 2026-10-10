"use client";

import { transferPlan } from "@/lib/us/borrowing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  balance: num(6_000, 0, 10_000_000),
  apr: num(24, 0, 40),
  feePct: num(3, 0, 10),
  promoMonths: num(18, 0, 36),
  afterApr: num(24, 0, 40),
  payment: num(300, 0, 1_000_000),
  promoApr: num(0, 0, 40),
};
const ADVANCED = ["promoApr"] as const;
const GRID_FEES = [3, 4, 5];
const GRID_MONTHS = [12, 15, 18, 21];

export default function BalanceTransferStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const promo = Math.round(v.promoMonths);
  const p = transferPlan(v.balance, v.apr, v.feePct, promo, v.promoApr, v.afterApr, v.payment);
  const t = p.transfer;
  const tDone = Number.isFinite(t.months);
  const sDone = Number.isFinite(p.stay.months);
  const clear = transferPlan(v.balance, v.apr, v.feePct, promo, v.promoApr, v.afterApr, Math.ceil(p.payToClear * 100) / 100);
  const leftover = tDone && t.leftAtPromoEnd > 0.5 && t.months > promo;
  const afterInterest = t.totalInterest;
  const maxPaid = Math.max(1, sDone ? p.stay.totalPaid : 0, tDone ? t.totalPaid : 0, clear.transfer.totalPaid);
  const chartLen = Math.min(240, Math.max(tDone ? t.months : 0, sDone ? p.stay.months : 0, promo, 12));
  const stayBal = Array.from({ length: chartLen + 1 }, (_, m) => (m === 0 ? v.balance : p.stay.rows[m - 1]?.balance ?? (sDone ? 0 : p.stay.rows[p.stay.rows.length - 1]?.balance ?? v.balance)));
  const tBal = Array.from({ length: chartLen + 1 }, (_, m) => (m === 0 ? v.balance + t.fee : t.rows[m - 1]?.balance ?? (tDone ? 0 : t.rows[t.rows.length - 1]?.balance ?? v.balance + t.fee)));
  const stayInterestMonth = (v.balance * v.apr) / 1200;

  return (
    <Studio
      title="Your balance transfer"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare the transfer"
      onReset={st.reset}
      dock={{ label: "Payment to clear in the 0% period", value: usd(p.payToClear, true) }}
      inputs={
        <>
          <InputGroup title="The card and the offer">
            <MoneyField symbol="$" label="Balance to transfer" value={v.balance} onChange={st.bind("balance")} slider={{ min: 500, max: 30_000, step: 250, ends: ["$500", "$30k"] }} />
            <StepperField label="Current card APR" value={v.apr} onChange={st.bind("apr")} step={0.25} min={0} max={40} unit="%" dp={2} info="On your statement. The Federal Reserve put the average on cards charged interest at about 22% in August 2026." />
            <StepperField label="Transfer fee" value={v.feePct} onChange={st.bind("feePct")} step={0.5} min={0} max={10} unit="%" dp={1} aside={usd((v.balance * v.feePct) / 100)} info="Usually 3% to 5% of the amount moved, with a minimum of about $5. Some cards charge 3% for transfers in the first months and 5% after." />
            <StepperField label="0% intro period" value={v.promoMonths} onChange={st.bind("promoMonths")} step={1} min={0} max={36} unit="months" dp={0} info="The longest offers in 2026 run about 21 months. The intro rate must last at least 6 months by law." />
            <StepperField label="APR after the intro period" value={v.afterApr} onChange={st.bind("afterApr")} step={0.25} min={0} max={40} unit="%" dp={2} info="The new card's go-to rate, shown in its terms." />
            <MoneyField symbol="$" label="Monthly payment" value={v.payment} onChange={st.bind("payment")} info="The same amount is paid in both cases, so the comparison is fair." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Intro APR" optional value={v.promoApr} onChange={st.bind("promoApr")} step={0.25} min={0} max={40} unit="%" dp={2} info="Usually 0%. Some offers have a low rate instead, such as 1.99%." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={p.comparable ? (p.saving >= 0 ? "The transfer saves" : "The transfer costs more by") : "Payment to clear in the intro period"}
        value={p.comparable ? usd(Math.abs(p.saving)) : usd(p.payToClear, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.balance <= 0 ? (
            <>Enter the balance you want to move.</>
          ) : !tDone ? (
            <>
              At {usd(v.payment)} a month the balance on the new card would never be paid off once the intro rate ends. Pay at least <b>{usd(p.payToClear, true)}</b>{" "}a month to
              clear it in {promo} months.
            </>
          ) : !sDone ? (
            <>
              On your current card, {usd(v.payment)} a month does not cover the interest of about {usd(stayInterestMonth)}, so the debt never shrinks. After the transfer it is paid
              off in <b>{duration(t.months)}</b>, with a <b>{usd(t.fee)}</b>{" "}fee and <b>{usd(t.totalInterest)}</b>{" "}of interest.
            </>
          ) : (
            <>
              Paying <b>{usd(v.payment)}</b>{" "}a month, the transfer clears the debt in <b>{duration(t.months)}</b>{" "}for <b>{usd(t.totalPaid)}</b>{" "}in all, including the{" "}
              <b>{usd(t.fee)}</b>{" "}fee. Staying put takes <b>{duration(p.stay.months)}</b>{" "}and costs <b>{usd(p.stay.totalPaid)}</b>. To clear it before the intro period ends,
              pay <b>{usd(p.payToClear, true)}</b>{" "}a month.
            </>
          )
        }
        badges={[`Fee ${usd(t.fee)}`, `${promo} months at ${v.promoApr}%`, leftover ? `${usd(t.leftAtPromoEnd)} left when the intro ends` : "Cleared within the intro period"]}
      />

      <Facts
        items={[
          { label: "Transfer fee", value: usd(t.fee) },
          { label: "Payment to clear in time", value: usd(p.payToClear, true), tone: "good" },
          { label: "Left when the intro ends", value: usd(t.leftAtPromoEnd), tone: leftover ? "warn" : "good" },
          { label: "Interest staying put", value: sDone ? usd(p.stay.totalInterest) : "Never paid off", tone: "warn" },
          { label: "Interest after transfer", value: tDone ? usd(t.totalInterest) : "Never paid off" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Payment", value: `${usd(v.payment)} every month on both cards, paid on time` },
          { label: "Transfer", value: `${v.feePct}% fee added to the balance on day one; ${v.promoApr}% for ${promo} months, then ${v.afterApr}%` },
          { label: "Interest", value: "Charged monthly at APR ÷ 12 (cards actually charge daily; the difference is small)" },
          { label: "Not included", value: "New purchases, annual fees and a rate change if you pay late" },
        ]}
      />

      {tDone && (
        <ResultCard title="What the transfer costs" sub="Every dollar paid on the new card.">
          <SplitBar
            segments={[
              { label: "Balance repaid", value: v.balance, display: usd(v.balance), color: "#16a34a" },
              { label: "Transfer fee", value: t.fee, display: usd(t.fee), color: "#db2777" },
              { label: "Interest after the intro", value: afterInterest, display: usd(afterInterest), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Stay, transfer, or transfer and clear it" sub="Total paid, fee and interest included.">
        <Compare
          head={["Plan · payment · time", "Total paid"]}
          rows={[
            { label: `Stay on your card · ${usd(v.payment)} · ${sDone ? duration(p.stay.months) : "never"}`, value: sDone ? usd(p.stay.totalPaid) : "Never paid off", bar: sDone ? p.stay.totalPaid / maxPaid : 1 },
            { label: `Transfer · ${usd(v.payment)} · ${tDone ? duration(t.months) : "never"}`, value: tDone ? usd(t.totalPaid) : "Never paid off", bar: tDone ? t.totalPaid / maxPaid : 1, current: true },
            {
              label: `Transfer and clear it · ${usd(p.payToClear, true)} · ${duration(clear.transfer.months)}`,
              value: usd(clear.transfer.totalPaid),
              bar: clear.transfer.totalPaid / maxPaid,
            },
          ]}
        />
      </ResultCard>

      <ResultCard title="Balance over time" sub="Your current card vs the new card, same payment.">
        <AreaChart
          ariaLabel="Balance by month"
          series={[
            { key: "stay", label: "Stay on your card", color: "#f59e0b", values: stayBal, dashed: true },
            { key: "bt", label: "Balance transfer", color: "#16a34a", values: tBal, fill: true },
          ]}
          xLabel={(i) => `M${i}`}
          yFormat={usdShort}
          initial={Math.min(promo || 12, chartLen)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: current card <b>{usd(stayBal[i] ?? 0)}</b>, new card <b>{usd(tBal[i] ?? 0)}</b>
              {i === promo ? " (the intro rate ends)" : ""}.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Fee and intro length" sub={`Saving vs staying put, paying ${usd(v.payment)} a month.`}>
        <DataTable
          summary="Saving and payment to clear for each fee and intro period"
          columns={["Fee", ...GRID_MONTHS.map((m) => `${m} months`)]}
          rows={GRID_FEES.map((f) => [
            `${f}%`,
            ...GRID_MONTHS.map((m) => {
              const g = transferPlan(v.balance, v.apr, f, m, v.promoApr, v.afterApr, v.payment);
              return `${g.comparable ? usd(g.saving) : "—"} (clear: ${usd(g.payToClear)}/mo)`;
            }),
          ])}
        />
      </ResultCard>

      {leftover && (
        <Callout tone="warn" title={`${usd(t.leftAtPromoEnd)} is left when the intro rate ends`}>
          From month {promo + 1} that balance is charged {v.afterApr}%. Paying {usd(p.payToClear, true)} a month instead clears it in time, with no interest at all.
        </Callout>
      )}
      {p.comparable && p.saving < 0 && (
        <Callout tone="warn" title="The fee is more than the interest you would save">
          At this payment you would clear the balance quickly anyway, so the fee costs more than it saves. Paying extra on your current card may be cheaper.
        </Callout>
      )}
      <Callout title="Protect the 0% rate">
        Pay at least the minimum on time every month: a late payment can cost you the intro rate, and once a payment is 60 days late the issuer can raise the rate on the whole balance. Avoid new purchases on the transfer card, which may be charged
        interest from day one, and do not run the old card back up.
      </Callout>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. The card&apos;s terms show the exact fee, intro period and rate; transfers can take a couple of weeks to go through.
      </p>
    </Studio>
  );
}
