"use client";

import { expensesStudy, WFH_FLAT_RATES, type WfhHoursBand } from "@/lib/business/allowable-expenses";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  turnover: num(40_000, 0, 10_000_000),
  office: num(1_200, 0, 10_000_000),
  miles: num(3_000, 0, 200_000),
  travel: num(0, 0, 10_000_000),
  stock: num(0, 0, 10_000_000),
  marketing: num(600, 0, 10_000_000),
  finance: num(300, 0, 10_000_000),
  premises: num(0, 0, 10_000_000),
  staff: num(0, 0, 10_000_000),
  training: num(0, 0, 10_000_000),
  clothing: num(0, 0, 10_000_000),
  other: num(0, 0, 10_000_000),
  wfh: oneOf<WfhHoursBand>("mid", ["none", "low", "mid", "high"]),
  months: num(12, 0, 12),
  income: num(0, 0, 10_000_000),
  scot: bool(false),
};
const ADVANCED = ["premises", "staff", "training", "clothing", "other", "wfh", "months", "income", "scot"] as const;
const PALETTE = ["#5b1e6e", "#0f9f6e", "#f59e0b", "#a46bb8", "#e11d48", "#0ea5e9", "#64748b", "#14b8a6", "#f97316", "#84cc16", "#94a3b8", "#6366f1"];

export default function ExpensesStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = expensesStudy({
    turnover: v.turnover,
    costs: {
      office: v.office,
      travel: v.travel,
      stock: v.stock,
      marketing: v.marketing,
      finance: v.finance,
      premises: v.premises,
      staff: v.staff,
      training: v.training,
      clothing: v.clothing,
      other: v.other,
    },
    miles: v.miles,
    wfhBand: v.wfh,
    wfhMonths: v.months,
    otherIncome: v.income,
    scottish: v.scot,
  });
  const parts = [
    { label: "Office, phone and software", value: v.office },
    { label: "Mileage at 45p / 25p", value: r.mileage },
    { label: "Other travel", value: v.travel },
    { label: "Stock and materials", value: v.stock },
    { label: "Marketing", value: v.marketing },
    { label: "Insurance, bank and professional fees", value: v.finance },
    { label: "Premises", value: v.premises },
    { label: "Staff and subcontractors", value: v.staff },
    { label: "Training", value: v.training },
    { label: "Uniforms and protective clothing", value: v.clothing },
    { label: "Working from home", value: r.wfh },
    { label: "Other", value: v.other },
  ].filter((p) => p.value > 0);
  const rate = r.total > 0 ? r.saved / r.total : 0;

  return (
    <Studio
      title="Your business costs"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my expenses"
      onReset={st.reset}
      dock={{ label: "Tax saved", value: gbp(r.saved) }}
      inputs={
        <>
          <InputGroup title="Your business">
            <MoneyField label="Turnover this tax year" value={v.turnover} onChange={st.bind("turnover")} big slider={{ min: 0, max: 150_000, step: 1_000, ends: ["£0", "£150k"] }} hint="To work out the tax your expenses save." />
          </InputGroup>
          <InputGroup title="Your costs this tax year">
            <MoneyField label="Office, phone, internet and software" value={v.office} onChange={st.bind("office")} hint="The business share only." />
            <StepperField label="Business miles by car or van" value={v.miles} onChange={st.bind("miles")} step={100} min={0} max={200_000} unit="miles" dp={0} hint="Claimed at 45p, then 25p after 10,000 miles." />
            <MoneyField label="Other travel" value={v.travel} onChange={st.bind("travel")} hint="Trains, buses, parking, tolls and hotels for business trips." />
            <MoneyField label="Stock and materials" value={v.stock} onChange={st.bind("stock")} hint="Goods to resell and materials used in your work." />
            <MoneyField label="Marketing and advertising" value={v.marketing} onChange={st.bind("marketing")} />
            <MoneyField label="Insurance, bank charges and accountancy" value={v.finance} onChange={st.bind("finance")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Business premises" value={v.premises} onChange={st.bind("premises")} optional hint="Rent, business rates, utilities and repairs for a workshop, shop or office." />
            <MoneyField label="Staff and subcontractors" value={v.staff} onChange={st.bind("staff")} optional hint="Wages, employer NI and pension, and payments to freelancers." />
            <MoneyField label="Training" value={v.training} onChange={st.bind("training")} optional hint="Courses that keep your current skills up to date." />
            <MoneyField label="Uniforms and protective clothing" value={v.clothing} onChange={st.bind("clothing")} optional hint="Not everyday clothes, even if you only wear them for work." />
            <MoneyField label="Other business costs" value={v.other} onChange={st.bind("other")} optional hint="Professional subscriptions, small tools, postage, trade journals." />
            <SelectField
              label="Hours working from home a month"
              value={v.wfh}
              onChange={st.bind("wfh")}
              optional
              options={[
                { value: "none", label: "Under 25 hours" },
                { value: "low", label: `25 to 50 hours: £${WFH_FLAT_RATES.low} a month` },
                { value: "mid", label: `51 to 100 hours: £${WFH_FLAT_RATES.mid} a month` },
                { value: "high", label: `101 hours or more: £${WFH_FLAT_RATES.high} a month` },
              ]}
              hint="The simplified flat rate. You can claim a share of actual bills instead."
            />
            {v.wfh !== "none" && <StepperField label="Months working from home" value={v.months} onChange={st.bind("months")} step={1} min={0} max={12} unit="months" dp={0} optional />}
            <MoneyField label="Other income this year" value={v.income} onChange={st.bind("income")} optional hint="A salary or pension. It sets the tax rate on your profit." />
            <Switch label="You pay Scottish Income Tax" checked={v.scot} onChange={st.bind("scot")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your expenses save you"
        value={gbp(r.saved)}
        unit="in tax and NI"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.allowanceBetter ? (
            <>
              Your expenses come to <b>{gbp(r.total)}</b>, which is less than the £1,000 trading allowance. Claiming the allowance instead would cut your bill to{" "}
              <b>{gbp(r.taxWithAllowance)}</b>.
            </>
          ) : (
            <>
              Claiming <b>{gbp(r.total)}</b> of allowable expenses brings your profit down to <b>{gbp(r.profit)}</b>. Your Income Tax and Class 4 NI fall from{" "}
              <b>{gbp(r.taxWithout)}</b> to <b>{gbp(r.taxWith)}</b>
              {r.total > 0 ? <>: every £100 of expenses saves about <b>{gbp(rate * 100)}</b></> : null}.
            </>
          )
        }
        badges={[`${gbp(r.total)} of expenses`, `${percent(rate, 0)} saved on each £1`, r.allowanceBetter ? "Trading allowance is better" : "Expenses beat the £1,000 allowance"]}
      />

      <Facts
        items={[
          { label: "Total expenses", value: gbp(r.total) },
          { label: "Profit after expenses", value: gbp(r.profit) },
          { label: "Tax and NI", value: gbp(r.taxWith), tone: "warn" },
          { label: "Saved by claiming", value: gbp(r.saved), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Business", value: "Sole trader, cash basis" },
          { label: "Tax year", value: "2026/27" },
          { label: "Mileage", value: "Simplified rates, not actual car costs" },
          { label: "Working from home", value: v.wfh === "none" ? "Not claimed" : "Simplified flat rate" },
        ]}
      />

      {parts.length > 0 && (
        <ResultCard title="Your expenses by type" sub="What makes up the total.">
          <SplitBar segments={parts.map((p, i) => ({ label: p.label, value: p.value, display: gbp(p.value), color: PALETTE[i % PALETTE.length] }))} />
        </ResultCard>
      )}

      {v.turnover > 0 && (
        <ResultCard title="With and without your expenses" sub="Income Tax and Class 4 NI on the same turnover.">
          <Statement
            columns={["No expenses", "£1,000 allowance", "Your expenses"]}
            rows={[
              { label: "Turnover", values: [gbp(v.turnover), gbp(v.turnover), gbp(v.turnover)] },
              { label: "Deducted", values: ["£0", `−${gbp(Math.min(1000, v.turnover))}`, `−${gbp(r.total)}`], kind: "deduction" },
              { label: "Tax and NI", values: [gbp(r.taxWithout), gbp(r.taxWithAllowance), gbp(r.taxWith)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="The rules HMRC applies.">
        <Callout title="Wholly and exclusively for the business">
          A cost is allowable if it is only for the business. If something has private use too, such as a phone or a car, claim only the business share.
        </Callout>
        <Callout tone="warn" title="Not allowable">
          Your own drawings, everyday clothes, commuting, fines, client entertainment and the capital part of loan repayments cannot be claimed.
        </Callout>
        {v.miles > 0 && (
          <Callout title="Mileage replaces car costs">
            Using the 45p rate means you cannot also claim fuel, insurance or repairs for that vehicle. Parking and tolls can still be claimed.
          </Callout>
        )}
        <Callout title="Big purchases">
          Equipment such as a laptop or van is a capital cost. On the cash basis you usually deduct it in full in the year you buy it; otherwise claim capital allowances.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Sole traders, 2026/27. Not tax advice.
      </p>
    </Studio>
  );
}
