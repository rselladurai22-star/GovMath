"use client";

import { poaPlan } from "@/lib/business/self-employed";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  last: num(8_000, 0, 10_000_000),
  paid: num(0, 0, 10_000_000),
  next: num(8_000, 0, 10_000_000),
  lastOther: num(0, 0, 10_000_000),
  nextOther: num(0, 0, 10_000_000),
  paye: num(0, 0, 10_000_000),
  reduce: bool(false),
  reduceTo: num(0, 0, 10_000_000),
};
const ADVANCED = ["lastOther", "nextOther", "paye", "reduce", "reduceTo"] as const;

const money = (n: number) => (n < 0 ? `${gbp(-n)} back` : gbp(n));

export default function PoaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = poaPlan({
    lastBill: v.last,
    lastOther: v.lastOther,
    lastPoasPaid: v.paid,
    lastAtSource: v.paye,
    thisBill: v.next,
    thisOther: v.nextOther,
    reduceTo: v.reduce ? v.reduceTo : -1,
  });
  const first = v.paid === 0;
  const dates = [
    { label: "31 January 2027", value: r.january },
    { label: "31 July 2027", value: r.july },
    { label: "31 January 2028", value: r.nextJanuary },
  ];
  const top = Math.max(...dates.map((d) => Math.abs(d.value)), 1);
  const lower = r.needsPoa && v.next < v.last && !v.reduce;
  const suggested = Math.max(0, v.next / 2);
  const freed = r.poaSet * 2 - suggested * 2;
  const monthly = Math.max(0, r.january) / 4;

  return (
    <Studio
      title="Your Self Assessment"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See my payment dates"
      onReset={st.reset}
      dock={{ label: "Due 31 January 2027", value: money(r.january) }}
      inputs={
        <>
          <InputGroup title="Last year: 2025/26">
            <MoneyField label="Your 2025/26 tax bill" value={v.last} onChange={st.bind("last")} big slider={{ min: 0, max: 50_000, step: 250, ends: ["£0", "£50k"] }} hint="Income Tax and Class 4 NI from your 2025/26 tax return, before any payments on account." />
            <MoneyField label="Payments on account already made for 2025/26" value={v.paid} onChange={st.bind("paid")} hint="The amounts you paid in January and July 2026. Enter 0 if 2025/26 was your first year." />
          </InputGroup>
          <InputGroup title="This year: 2026/27">
            <MoneyField label="Expected 2026/27 tax bill" value={v.next} onChange={st.bind("next")} hint="Your best estimate of this year's Income Tax and Class 4 NI. The sole trader calculator can work it out." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="2025/26 student loan, Class 2 and Capital Gains Tax" value={v.lastOther} onChange={st.bind("lastOther")} optional hint="Due with the balancing payment, but never part of payments on account." />
            <MoneyField label="2026/27 student loan, Class 2 and Capital Gains Tax" value={v.nextOther} onChange={st.bind("nextOther")} optional />
            <MoneyField label="Tax taken through PAYE in 2025/26" value={v.paye} onChange={st.bind("paye")} optional hint="From a job or pension. If over 80% of your tax was taken this way, you do not make payments on account." />
            <Switch label="Ask HMRC to reduce my payments on account" checked={v.reduce} onChange={st.bind("reduce")} optional hint="If you expect a lower bill this year. Too big a cut means interest later." />
            {v.reduce && <MoneyField label="Reduce each payment to" value={v.reduceTo} onChange={st.bind("reduceTo")} optional />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Due on 31 January 2027"
        value={money(r.january)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.needsPoa ? (
            <>
              That is <b>{money(r.lastBalance)}</b> to settle 2025/26 plus your first payment on account of <b>{gbp(r.poa)}</b> towards 2026/27. Another <b>{gbp(r.july)}</b> is due on 31 July
              2027{first ? ". Because 2025/26 was your first year, January is the big one" : ""}.
            </>
          ) : (
            <>
              {r.reason === "at-source" ? "More than 80% of your tax is collected through PAYE" : "Your 2025/26 bill is under £1,000"}, so there are no payments on account. You just pay{" "}
              <b>{money(r.lastBalance)}</b> for 2025/26 by 31 January 2027.
            </>
          )
        }
        badges={[r.needsPoa ? `${gbp(r.poa)} per payment on account` : "No payments on account", `31 July: ${gbp(r.july)}`, `31 January 2028: ${money(r.nextJanuary)}`]}
      />

      <Facts
        items={[
          { label: "31 January 2027", value: money(r.january), tone: "warn" },
          { label: "31 July 2027", value: gbp(r.july) },
          { label: "31 January 2028", value: money(r.nextJanuary), note: r.nextPoa > 0 ? `Includes ${gbp(r.nextPoa)} for 2027/28` : undefined },
          { label: "Each payment on account", value: gbp(r.poa), note: r.poa < r.poaSet ? `Reduced from ${gbp(r.poaSet)}` : "Half of last year's bill" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Payments on account", value: "Half of 2025/26 Income Tax and Class 4" },
          { label: "Next year's test", value: "Same PAYE share as 2025/26" },
          { label: "Tax years", value: "2025/26 and 2026/27" },
        ]}
        note="Your HMRC online account shows the exact amounts due."
      />

      <ResultCard title="Your payment dates" sub="Every Self Assessment payment over the next 18 months.">
        <Compare
          head={["Date", "Amount"]}
          rows={dates.map((d, i) => ({ label: d.label, value: money(d.value), bar: Math.abs(d.value) / top, current: i === 0 }))}
        />
        <Statement
          columns={["Amount"]}
          rows={[
            ...r.schedule.map((p) => ({ label: `${p.date}: ${p.label}`, values: [money(p.amount)] })),
            { label: "Total 2026/27 tax and repayments", values: [gbp(r.thisYearTotal)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      {lower && (
        <ResultCard title="You could reduce your payments" sub="Your 2026/27 bill looks lower than 2025/26.">
          <Callout tone="good" title={`Reducing to ${gbp(suggested)} each frees up ${gbp(freed)}`}>
            You can ask HMRC to cut your payments on account online or with form SA303 if you expect this year&apos;s bill to be lower. Be realistic: if the final bill is higher,
            HMRC charges interest on the shortfall from each original due date.
          </Callout>
        </ResultCard>
      )}

      {r.underpaidByReduction && (
        <ResultCard title="Your reduction may be too big" sub="The reduced payments do not cover this year's expected bill.">
          <Callout tone="warn" title={`${gbp(v.next - 2 * r.poa)} short`}>
            Interest is charged on the difference from 31 January and 31 July 2027 until you pay, at the Bank of England base rate plus 4%. A penalty can apply if a reduction was careless.
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Keeping on top of the bill.">
        {r.january > 0 && (
          <Callout title={`Save about ${gbp(monthly)} a month from October`}>
            That covers the 31 January payment if you start putting money aside now. HMRC&apos;s budget payment plan lets you pay by direct debit in instalments instead.
          </Callout>
        )}
        {r.lastBalance < 0 && (
          <Callout tone="good" title="You overpaid for 2025/26">
            Your payments on account were more than the bill, so HMRC owes you {gbp(-r.lastBalance)}. It is usually set against the January payment, or you can ask for it back.
          </Callout>
        )}
        <Callout title="Late payment costs">
          Interest runs from the day after each due date. A balancing payment still unpaid after 30 days also gets a 5% penalty, with more after six and twelve months. Penalties do not apply to payments on account.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Self Assessment for 2025/26 and 2026/27. Not tax advice.
      </p>
    </Studio>
  );
}
