"use client";

import { affordability, depositForLtv, targetCheck } from "@/lib/property/affordability";
import { stampDuty } from "@/lib/tax/sdlt-2025";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, Chips, Field, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  income1: num(45_000, 0, 5_000_000),
  income2: num(0, 0, 5_000_000),
  deposit: num(40_000, 0, 50_000_000),
  multiple: num(4.5, 3, 6.5),
  variable: num(0, 0, 5_000_000),
  commitments: num(0, 0, 100_000),
  rate: num(4.5, 0, 15),
  term: num(25, 5, 40),
  stress: num(3, 0, 6),
  target: num(0, 0, 50_000_000),
  ftb: bool(true),
};
const ADVANCED = ["multiple", "variable", "commitments", "rate", "term", "stress", "target", "ftb"] as const;
const COLORS = { loan: "#5b1e6e", deposit: "#0f9f6e", tax: "#f59e0b" };
const MULTIPLES = [4, 4.5, 5, 5.5];

export default function AffordabilityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = affordability({
    income1: v.income1,
    income2: v.income2,
    variable: v.variable,
    variableShare: 0.5,
    commitments: v.commitments,
    multiple: v.multiple,
    deposit: v.deposit,
    ratePct: v.rate,
    termYears: v.term,
    stressPts: v.stress,
  });
  const sdlt = stampDuty(r.maxPrice, v.ftb ? "first-time" : "standard").total;
  const cashNeeded = v.deposit + sdlt;
  const ranges = MULTIPLES.map((m) => ({ m, loan: Math.max(0, (r.assessedIncome - r.commitmentsYearly) * m) }));
  const maxRange = Math.max(...ranges.map((x) => x.loan), 1);
  const t = v.target > 0 ? targetCheck(v.target, v.deposit, Math.max(1, r.assessedIncome - r.commitmentsYearly)) : null;
  const ltvSteps = [0.95, 0.9, 0.85, 0.75, 0.6].filter((b) => b < r.ltv - 0.0001);
  const nextBand = ltvSteps[0];
  const nextBandDeposit = nextBand !== undefined ? depositForLtv(r.maxPrice, nextBand) : 0;
  const joint = v.income2 > 0;
  const stretched = r.stressedShare > 0.5;
  const stressRate = `${+(v.rate + v.stress).toFixed(2)}%`;

  return (
    <Studio
      title="Your finances"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See what I could borrow"
      onReset={st.reset}
      dock={{ label: "You could borrow", value: gbp(r.maxLoan) }}
      inputs={
        <>
          <InputGroup title="Income and deposit">
            <MoneyField label="Your yearly income before tax" value={v.income1} onChange={st.bind("income1")} big slider={{ min: 0, max: 200_000, step: 1_000, ends: ["£0", "£200k"] }} hint="Basic salary, or average profit if self-employed." />
            <MoneyField label="Second buyer's yearly income" value={v.income2} onChange={st.bind("income2")} hint="Leave at £0 if buying alone." />
            <MoneyField label="Your deposit" value={v.deposit} onChange={st.bind("deposit")} slider={{ min: 0, max: 250_000, step: 1_000, ends: ["£0", "£250k"] }} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Field label="Income multiple" optional hint="Most lenders use 4 to 4.5 times. Some go to 5.5 times for higher earners.">
              <Chips label="Income multiple" value={MULTIPLES.includes(v.multiple) ? v.multiple : null} onChange={st.bind("multiple")} options={MULTIPLES.map((m) => ({ value: m, label: `${m}×` }))} />
            </Field>
            <MoneyField label="Bonus, overtime or commission a year" value={v.variable} onChange={st.bind("variable")} optional hint="We count half, as many lenders do." />
            <MoneyField label="Monthly debts and childcare" value={v.commitments} onChange={st.bind("commitments")} optional hint="Loans, car finance, credit card payments and childcare." />
            <StepperField label="Mortgage rate" value={v.rate} onChange={st.bind("rate")} step={0.1} min={0} max={15} unit="%" optional />
            <StepperField label="Mortgage term" value={v.term} onChange={st.bind("term")} step={1} min={5} max={40} unit="years" dp={0} optional />
            <StepperField label="Stress test: rate rise" value={v.stress} onChange={st.bind("stress")} step={0.5} min={0} max={6} unit="points" dp={1} optional hint="Lenders check you could still pay if rates rose." />
            <MoneyField label="A home you are looking at" value={v.target} onChange={st.bind("target")} optional hint="Check whether a particular price is within reach." />
            <Switch label="First-time buyer" checked={v.ftb} onChange={st.bind("ftb")} optional hint="For the Stamp Duty estimate (England and NI)." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You could borrow about"
        value={gbp(r.maxLoan)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.maxLoan <= 0 ? (
            <>Enter your income to see an estimate. Commitments larger than your income leave nothing to borrow.</>
          ) : (
            <>
              At <b>{v.multiple}×</b> {joint ? "your joint" : "your"} income, a lender might offer about <b>{gbp(r.maxLoan)}</b>. With your <b>{gbp(v.deposit)}</b> deposit
              that buys a home up to <b>{gbp(r.maxPrice)}</b>, with payments of about <b>{gbp(r.monthlyPayment)}</b> a month.
            </>
          )
        }
        badges={[`${percent(r.ltv)} loan to value`, `${gbp(r.monthlyPayment)} a month`, `${percent(r.paymentShare)} of take-home pay`]}
      />

      <Facts
        items={[
          { label: "Maximum price", value: gbp(r.maxPrice) },
          { label: "Monthly payment", value: gbp(r.monthlyPayment), note: `At ${v.rate}% over ${v.term} years` },
          { label: `If rates rise ${v.stress} points`, value: gbp(r.stressedPayment), tone: stretched ? "warn" : undefined },
          { label: "Cash needed", value: gbp(cashNeeded), note: "Deposit and Stamp Duty" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Income multiple", value: `${v.multiple}×` },
          { label: "Bonus counted", value: v.variable > 0 ? "Half" : "None entered" },
          { label: "Mortgage", value: `${v.rate}%, ${v.term} years, repayment` },
          { label: "Stamp Duty", value: v.ftb ? "First-time buyer, England" : "Home mover, England" },
        ]}
      />

      {r.maxPrice > 0 && (
        <ResultCard title="How the purchase adds up" sub="Your mortgage and deposit, plus the Stamp Duty on top.">
          <SplitBar
            segments={[
              { label: "Mortgage", value: r.maxLoan, display: gbp(r.maxLoan), color: COLORS.loan },
              { label: "Deposit", value: v.deposit, display: gbp(v.deposit), color: COLORS.deposit },
              ...(sdlt > 0 ? [{ label: "Stamp Duty", value: sdlt, display: gbp(sdlt), color: COLORS.tax }] : []),
            ]}
            caption={
              <>
                Home up to <b>{gbp(r.maxPrice)}</b>. Allow another £2,000 to £3,500 for legal, survey and lender fees.
              </>
            }
          />
        </ResultCard>
      )}

      {r.assessedIncome > 0 && (
        <ResultCard title="How the multiple changes it" sub="Lenders differ. The same income at common multiples.">
          <Compare
            head={["Income multiple", "Loan"]}
            rows={ranges.map((x) => ({
              label: `${x.m}× income`,
              value: gbp(x.loan),
              delta: x.m === v.multiple ? undefined : `${x.loan >= r.maxLoan ? "+" : "−"}${gbp(Math.abs(x.loan - r.maxLoan))}`,
              deltaTone: x.loan > r.maxLoan ? "up" : "down",
              bar: x.loan / maxRange,
              current: x.m === v.multiple,
            }))}
          />
        </ResultCard>
      )}

      {t && (
        <ResultCard title={`Could you buy at ${gbp(v.target)}?`} sub="What a lender would need to agree.">
          <Facts
            items={[
              { label: "Mortgage needed", value: gbp(t.loan) },
              { label: "Loan to value", value: percent(t.ltv), tone: t.ltv > 0.95 ? "bad" : undefined },
              { label: "Income multiple needed", value: Number.isFinite(t.multipleNeeded) ? `${t.multipleNeeded.toFixed(1)}×` : "—", tone: t.multipleNeeded > v.multiple ? "warn" : "good" },
              { label: "Shortfall", value: gbp(Math.max(0, t.loan - r.maxLoan)), tone: t.loan > r.maxLoan ? "warn" : "good" },
            ]}
          />
          {t.loan > r.maxLoan ? (
            <Callout tone="warn" title="Above your estimated limit">
              You would need about <b>{gbp(t.loan - r.maxLoan)}</b> more deposit, or a lender willing to go to <b>{t.multipleNeeded.toFixed(1)}×</b> income.
            </Callout>
          ) : (
            <Callout tone="good" title="Within your estimated limit">
              This price needs <b>{t.multipleNeeded.toFixed(1)}×</b> your assessed income, within the {v.multiple}× used here.
            </Callout>
          )}
        </ResultCard>
      )}

      {r.maxLoan > 0 && (
        <ResultCard title="Worth knowing" sub="What lenders look at besides the multiple.">
          {stretched ? (
            <Callout tone="warn" title="Payments would be stretched if rates rose">
              At {stressRate} the payment would be <b>{gbp(r.stressedPayment)}</b>, about <b>{percent(r.stressedShare)}</b> of your take-home pay. Lenders may offer less.
            </Callout>
          ) : (
            <Callout tone="good" title="Comfortable even if rates rise">
              At {stressRate} the payment would be <b>{gbp(r.stressedPayment)}</b>, about <b>{percent(r.stressedShare)}</b> of your take-home pay of {gbp(r.takeHomeMonthly)} a month.
            </Callout>
          )}
          {v.commitments > 0 && (
            <Callout title={`Your commitments cut the loan by ${gbp(r.commitmentsYearly * v.multiple)}`}>
              Each £100 a month of debt or childcare reduces what you could borrow by about <b>{gbp(r.costPer100)}</b>. Clearing a loan before applying can help.
            </Callout>
          )}
          {nextBand !== undefined && (
            <Callout title={`A deposit of ${gbp(nextBandDeposit)} reaches ${percent(nextBand)} LTV`}>
              Lenders price in loan-to-value bands. Moving into the next band down usually unlocks a lower rate.
            </Callout>
          )}
          <Callout title="Get a decision in principle">
            A lender or broker can give a decision in principle with a soft credit check. It is the quickest way to confirm a figure before you make offers.
          </Callout>
        </ResultCard>
      )}

      <p className={s.hint} style={{ textAlign: "center" }}>
        An estimate based on common lender rules. Each lender uses its own model, including your credit history and full outgoings.
      </p>
    </Studio>
  );
}
