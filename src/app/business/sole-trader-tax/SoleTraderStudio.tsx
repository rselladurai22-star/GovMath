"use client";

import { poaPlan, selfEmployedTax, SMALL_PROFITS_THRESHOLD, TRADING_ALLOWANCE, VOLUNTARY_CLASS2_YEAR } from "@/lib/business/self-employed";
import { STUDENT_PLAN_ORDER, STUDENT_PLANS, type StudentPlan } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  turnover: num(50_000, 0, 10_000_000),
  expenses: num(10_000, 0, 10_000_000),
  ta: bool(false),
  other: num(0, 0, 10_000_000),
  scot: bool(false),
  plan: oneOf<StudentPlan>("none", STUDENT_PLAN_ORDER),
  pension: num(0, 0, 1_000_000),
  class2: bool(false),
  first: bool(false),
};
const ADVANCED = ["ta", "other", "scot", "plan", "pension", "class2", "first"] as const;
const minus = (n: number, pence = false) => (n > 0.005 ? `−${gbp(n, pence)}` : "£0");
const COLORS = { tax: "#e11d48", ni: "#f59e0b", sl: "#a46bb8", keep: "#0f9f6e", class2: "#94a3b8" };

export default function SoleTraderStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { turnover: v.turnover, expenses: v.expenses, tradingAllowance: v.ta, otherIncome: v.other, scottish: v.scot, plan: v.plan, pension: v.pension, voluntaryClass2: v.class2 };
  const r = selfEmployedTax(input);
  const alt = selfEmployedTax({ ...input, tradingAllowance: !v.ta });
  const altBetter = alt.totalOnProfit + 0.5 < r.totalOnProfit;
  // Self Assessment bill: Income Tax not covered by PAYE, plus Class 4; student loan and Class 2 are due but excluded from payments on account.
  const saBill = r.incomeTaxOnProfit + r.class4;
  const saOther = r.studentLoan + r.class2;
  const plan = poaPlan({ lastBill: saBill, lastOther: saOther, lastPoasPaid: 0, lastAtSource: v.other > 0 ? r.incomeTaxOther : 0, thisBill: saBill, thisOther: saOther, reduceTo: -1 });
  const setAside = r.totalOnProfit / 12;
  const noTax = r.totalOnProfit <= 0;
  const levels = [20_000, 30_000, 40_000, 50_000, 75_000, 100_000, 125_000];
  const ladder = Array.from(new Set([...levels, Math.round(r.profit)]))
    .filter((p) => p > 0)
    .sort((a, b) => a - b)
    .map((p) => ({ p, x: selfEmployedTax({ ...input, turnover: p, expenses: 0, tradingAllowance: false }) }));

  return (
    <Studio
      title="Your self-employment"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my tax"
      onReset={st.reset}
      dock={{ label: "Tax and NI", value: gbp(r.totalOnProfit) }}
      inputs={
        <>
          <InputGroup title="This tax year">
            <MoneyField label="Turnover" value={v.turnover} onChange={st.bind("turnover")} big slider={{ min: 0, max: 200_000, step: 1_000, ends: ["£0", "£200k"] }} hint="Everything you invoiced or took, before expenses. 6 April 2026 to 5 April 2027." />
            {!v.ta && <MoneyField label="Allowable expenses" value={v.expenses} onChange={st.bind("expenses")} hint="Costs wholly and exclusively for the business: stock, tools, travel, phone, insurance." />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label={`Use the £${TRADING_ALLOWANCE.toLocaleString("en-GB")} trading allowance instead`} checked={v.ta} onChange={st.bind("ta")} optional hint="Deduct a flat £1,000 instead of your actual expenses. Worth it if your costs are under £1,000." />
            <MoneyField label="Other income this year" value={v.other} onChange={st.bind("other")} optional hint="A salary, pension or rent. It uses your tax-free allowance first, so it sets the rate on your profit." />
            <Segmented
              label="Where you live"
              value={v.scot ? "scot" : "ruk"}
              onChange={(x) => st.set("scot", x === "scot")}
              optional
              options={[
                { value: "ruk", label: "England, Wales & NI" },
                { value: "scot", label: "Scotland", note: "Scottish Income Tax rates. Class 4 NI is the same everywhere." },
              ]}
            />
            <SelectField
              label="Student loan"
              value={v.plan}
              onChange={st.bind("plan")}
              optional
              options={STUDENT_PLAN_ORDER.map((id) => {
                const p = STUDENT_PLANS[id];
                return { value: id, label: id === "none" ? p.label : `${p.label}: ${Math.round(p.rate * 100)}% over ${gbp(p.threshold)}` };
              })}
            />
            <MoneyField label="Personal pension contributions (gross)" value={v.pension} onChange={st.bind("pension")} optional hint="Including the 20% the pension provider claims back. Higher-rate relief comes off your tax bill." />
            <Switch label="Pay voluntary Class 2 NI" checked={v.class2} onChange={st.bind("class2")} optional hint={`£3.65 a week (${gbp(VOLUNTARY_CLASS2_YEAR, true)} a year) to protect your State Pension if profit is under ${gbp(SMALL_PROFITS_THRESHOLD)}.`} />
            <Switch label="This is my first year of self-employment" checked={v.first} onChange={st.bind("first")} optional hint="Shows the larger first January bill." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Tax and NI on your profit"
        value={gbp(r.totalOnProfit)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.belowTradingAllowance ? (
            <>
              Turnover of <b>{gbp(r.turnover)}</b> is within the £1,000 trading allowance, so there is no tax to pay and you do not need to register for Self Assessment for it.
            </>
          ) : noTax ? (
            <>
              Your profit of <b>{gbp(r.profit)}</b> is covered by your tax-free allowances, so there is no tax to pay. You still need to file a Self Assessment return.
            </>
          ) : (
            <>
              On a profit of <b>{gbp(r.profit)}</b> you pay <b>{gbp(r.incomeTaxOnProfit)}</b> Income Tax and <b>{gbp(r.class4)}</b> Class 4 National Insurance
              {r.studentLoan > 0 ? <> plus <b>{gbp(r.studentLoan)}</b> student loan</> : null}. You keep <b>{gbp(r.keep)}</b>, about <b>{gbp(r.keep / 12)}</b> a month.
            </>
          )
        }
        badges={[`${percent(r.effectiveRate, 1)} of profit`, `${percent(r.marginalRate, 0)} on your next £1`, `Set aside ${gbp(setAside)} a month`]}
      />

      <Facts
        items={[
          { label: "Profit", value: gbp(r.profit), note: v.ta ? "After the £1,000 allowance" : "Turnover − expenses" },
          { label: "Income Tax", value: gbp(r.incomeTaxOnProfit), tone: "warn" },
          { label: "Class 4 NI", value: gbp(r.class4), tone: "warn" },
          { label: "You keep", value: gbp(r.keep), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Tax rates", value: v.scot ? "Scottish" : "England, Wales or NI" },
          { label: "Other income", value: v.other > 0 ? gbp(v.other) : "None" },
          { label: "Expenses", value: v.ta ? "£1,000 trading allowance" : gbp(v.expenses) },
        ]}
      />

      {r.profit > 0 && (
        <ResultCard title="Where your profit goes" sub="A year's profit, split.">
          <SplitBar
            segments={[
              ...(r.incomeTaxOnProfit > 0 ? [{ label: "Income Tax", value: r.incomeTaxOnProfit, display: gbp(r.incomeTaxOnProfit), color: COLORS.tax }] : []),
              ...(r.class4 > 0 ? [{ label: "Class 4 NI", value: r.class4, display: gbp(r.class4), color: COLORS.ni }] : []),
              ...(r.studentLoan > 0 ? [{ label: "Student loan", value: r.studentLoan, display: gbp(r.studentLoan), color: COLORS.sl }] : []),
              ...(r.class2 > 0 ? [{ label: "Voluntary Class 2", value: r.class2, display: gbp(r.class2, true), color: COLORS.class2 }] : []),
              { label: "You keep", value: Math.max(0, r.keep), display: gbp(r.keep), color: COLORS.keep },
            ]}
          />
        </ResultCard>
      )}

      {r.turnover > 0 && (
        <ResultCard title="Your tax calculation" sub="How the bill is built up.">
          <Statement
            columns={["A year"]}
            rows={[
              { label: "Turnover", values: [gbp(r.turnover)] },
              { label: v.ta ? "Trading allowance" : "Allowable expenses", values: [minus(r.deduction)], kind: "deduction" },
              { label: "Profit", values: [gbp(r.profit)], kind: "total" },
              { label: "Income Tax", values: [minus(r.incomeTaxOnProfit)], kind: "deduction" },
              { label: "Class 4 National Insurance", values: [`−${gbp(r.class4)}`], kind: "deduction" },
              ...(r.studentLoan > 0 ? [{ label: "Student loan", values: [minus(r.studentLoan)], kind: "deduction" as const }] : []),
              ...(r.class2 > 0 ? [{ label: "Voluntary Class 2", values: [`−${gbp(r.class2, true)}`], kind: "deduction" as const }] : []),
              { label: "You keep", values: [gbp(r.keep)], kind: "total" },
            ]}
          />
          {(altBetter || (!v.ta && v.expenses < TRADING_ALLOWANCE && r.turnover > TRADING_ALLOWANCE)) && (
            <Callout tone="good" title={v.ta ? `Claiming expenses saves ${gbp(r.totalOnProfit - alt.totalOnProfit)}` : `The trading allowance saves ${gbp(r.totalOnProfit - alt.totalOnProfit)}`}>
              {v.ta
                ? "Your actual expenses are more than £1,000, so claiming them gives a lower bill."
                : "Your expenses are under £1,000. Claiming the flat £1,000 trading allowance instead gives a lower bill."}
            </Callout>
          )}
        </ResultCard>
      )}

      {saBill > 0 && (
        <ResultCard title="When you pay" sub={v.first ? "Your first Self Assessment bill, for 2026/27." : "Self Assessment for 2026/27, assuming last year's profit was about the same."}>
          <Statement
            columns={["Amount"]}
            rows={
              v.first
                ? [
                    { label: "31 January 2028: 2026/27 tax in full", values: [gbp(saBill + saOther)] },
                    ...(plan.needsPoa ? [{ label: "31 January 2028: 1st payment on account for 2027/28", values: [gbp(plan.poaSet)] }] : []),
                    { label: "Due on 31 January 2028", values: [gbp(saBill + saOther + (plan.needsPoa ? plan.poaSet : 0))], kind: "total" as const },
                    ...(plan.needsPoa ? [{ label: "31 July 2028: 2nd payment on account", values: [gbp(plan.poaSet)] }] : []),
                  ]
                : [
                    ...(plan.needsPoa
                      ? [
                          { label: "31 January 2027: 1st payment on account", values: [gbp(plan.poaSet)] },
                          { label: "31 July 2027: 2nd payment on account", values: [gbp(plan.poaSet)] },
                        ]
                      : []),
                    { label: "31 January 2028: balancing payment", values: [gbp(saBill + saOther - 2 * plan.poaSet)], kind: "total" as const },
                  ]
            }
          />
          <Callout title={plan.needsPoa ? `Payments on account of ${gbp(plan.poaSet)} each` : "No payments on account"}>
            {plan.needsPoa
              ? v.first
                ? "In your first year the whole bill and half of next year's land on the same January, so the first payment is about one and a half times a year's tax. Put money aside from the start."
                : "Each is half of the previous year's Income Tax and Class 4 NI. Student loan and Class 2 are paid with the balancing payment instead."
              : plan.reason === "at-source"
                ? "More than 80% of your tax is collected through PAYE, so you pay the rest in one go by 31 January."
                : "Your Self Assessment bill is under £1,000, so you pay it in one go by 31 January."}
          </Callout>
        </ResultCard>
      )}

      {ladder.length > 1 && (
        <ResultCard title="Tax at other profit levels" sub="With your other settings unchanged.">
          <Compare
            head={["Profit", "You keep"]}
            rows={ladder.map(({ p, x }) => ({
              label: gbp(p),
              value: gbp(x.keep),
              delta: `${percent(x.effectiveRate, 1)} tax`,
              bar: x.keep / Math.max(...ladder.map((l) => l.x.keep), 1),
              current: p === Math.round(r.profit),
            }))}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Things that change the bill.">
        {r.profit > 0 && r.profit < SMALL_PROFITS_THRESHOLD && !v.class2 && (
          <Callout tone="warn" title="This year may not count for your State Pension">
            Profit under {gbp(SMALL_PROFITS_THRESHOLD)} gets no free National Insurance credit. Paying voluntary Class 2 at £3.65 a week keeps the year on your record.
          </Callout>
        )}
        {r.getsNiCredit && (
          <Callout tone="good" title="Your State Pension year is protected">
            With profit of {gbp(SMALL_PROFITS_THRESHOLD)} or more, you get a National Insurance credit without paying Class 2.
          </Callout>
        )}
        {r.profit > 100_000 && (
          <Callout tone="warn" title="The 60% band">
            Your tax-free allowance shrinks by £1 for every £2 of income over £100,000. Pension contributions bring your income back down and restore it.
          </Callout>
        )}
        {r.turnover > 50_000 && (
          <Callout title="Making Tax Digital applies to you">
            From 6 April 2026, sole traders and landlords whose self-employment and property income was over £50,000 in 2024/25 must keep digital records and send HMRC quarterly updates. The limit falls to £30,000 from April 2027.
          </Callout>
        )}
        {r.turnover > 90_000 && (
          <Callout tone="warn" title="Check VAT registration">
            Once taxable sales pass £90,000 in any 12 months you must register for VAT.
          </Callout>
        )}
        <Callout title="Keep records for five years">
          You need to keep records of sales and expenses for at least five years after the 31 January filing deadline.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Tax year 6 April 2026 to 5 April 2027. Not tax advice.
      </p>
    </Studio>
  );
}
