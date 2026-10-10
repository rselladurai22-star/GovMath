"use client";

import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import { estimatedPlan } from "@/lib/us/withholding";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const NEXT = ["0", "1", "2", "3"] as const;
const NEXT_LABEL = ["Payment 1: April 15, 2026", "Payment 2: June 15, 2026", "Payment 3: September 15, 2026", "Payment 4: January 15, 2027"];

const SCHEMA = {
  status: oneOf<FilingStatus>("single", STATUSES),
  se: num(60_000, 0, 100_000_000),
  wages: num(0, 0, 100_000_000),
  withheld: num(0, 0, 100_000_000),
  knowPrior: bool(true),
  priorTax: num(8_000, 0, 100_000_000),
  next: oneOf<(typeof NEXT)[number]>("3", NEXT),
  paid1: num(2_000, 0, 100_000_000),
  paid2: num(2_000, 0, 100_000_000),
  paid3: num(2_000, 0, 100_000_000),
  priorAgi: num(60_000, 0, 100_000_000),
  other: num(0, 0, 100_000_000),
  pension: num(0, 0, 100_000_000),
  ltcg: num(0, 0, 100_000_000),
  adjust: num(0, 0, 1_000_000),
  itemized: num(0, 0, 100_000_000),
  children: num(0, 0, 15),
  qbi: bool(true),
};
const ADVANCED = ["priorAgi", "other", "pension", "ltcg", "adjust", "itemized", "children", "qbi"] as const;

const C = { withheld: "#1baf7a", paid: "#2a78d6", left: "#eb6834", rest: "#9aa1a9" };

export default function EstimatedStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const next = Number(v.next);
  const paid = [v.paid1, v.paid2, v.paid3, 0];
  const plan = estimatedPlan({
    status: v.status,
    wages: v.wages,
    otherIncome: v.other,
    nonInvestmentIncome: v.pension,
    longTermGains: v.ltcg,
    selfEmployment: v.se,
    preTax: 0,
    adjustments: v.adjust,
    itemized: v.itemized,
    over65: 0,
    blind: 0,
    children: Math.round(v.children),
    otherDependents: 0,
    overtimePremium: 0,
    tips: 0,
    withheld: v.withheld,
    priorTax: v.knowPrior ? v.priorTax : null,
    priorAgi: v.priorAgi,
    paid,
    next,
    useQbi: v.qbi,
  });
  const { ret, est } = plan;
  const paidSoFar = paid.slice(0, next).reduce((a, b) => a + b, 0);
  const remaining = 4 - next;
  const nothingNeeded = est.underThreshold || plan.stillNeeded <= 0;
  const basisText = est.basis === "current" ? "90% of your 2026 tax" : est.basis === "prior110" ? "110% of your 2025 tax" : "100% of your 2025 tax";
  const income = ret.grossIncome;
  const setAside = income > 0 ? Math.max(0, ret.totalTax - v.withheld) / income : 0;

  const harbors = [
    { label: "90% of your 2026 tax", value: ret.totalTax * 0.9 },
    ...(v.knowPrior ? [{ label: v.priorAgi > (v.status === "mfs" ? 75_000 : 150_000) ? "110% of your 2025 tax" : "100% of your 2025 tax", value: v.priorTax * (v.priorAgi > (v.status === "mfs" ? 75_000 : 150_000) ? 1.1 : 1) }] : []),
    { label: "All of your 2026 tax", value: ret.totalTax },
  ];
  const maxHarbor = Math.max(1, ...harbors.map((h) => h.value));

  return (
    <Studio
      title="Your 2026 estimated tax"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my payments"
      onReset={st.reset}
      dock={{ label: "Each payment left", value: usd(plan.perRemaining) }}
      inputs={
        <>
          <InputGroup title="Your 2026 income">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Self-employment profit for 2026" symbol="$" value={v.se} onChange={st.bind("se")} slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="1099, freelance, gig and business income after expenses, for the whole year." />
            <MoneyField label="Wages for 2026" symbol="$" value={v.wages} onChange={st.bind("wages")} info="Any W-2 pay for the year, yours or (if filing jointly) your spouse's." />
            <MoneyField label="Federal tax withheld in 2026" symbol="$" value={v.withheld} onChange={st.bind("withheld")} info="Expected for the whole year from paychecks, pensions and other payments." />
          </InputGroup>
          <InputGroup title="Last year and payments">
            <Switch label="I filed a 2025 return" checked={v.knowPrior} onChange={st.bind("knowPrior")} info="Last year's tax gives the easiest safe harbor. If you didn't file for 2025, only the 90% rule applies (unless you owed no tax at all for a full 12-month 2025)." />
            {v.knowPrior && <MoneyField label="Total tax on your 2025 return" symbol="$" value={v.priorTax} onChange={st.bind("priorTax")} info="Line 24 of your 2025 Form 1040, less refundable credits." />}
            <SelectField label="Next payment due" value={v.next} onChange={st.bind("next")} options={NEXT.map((n, k) => ({ value: n, label: NEXT_LABEL[k] }))} />
            {next > 0 && <MoneyField label="Paid by April 15, 2026" symbol="$" value={v.paid1} onChange={st.bind("paid1")} />}
            {next > 1 && <MoneyField label="Paid by June 15, 2026" symbol="$" value={v.paid2} onChange={st.bind("paid2")} />}
            {next > 2 && <MoneyField label="Paid by September 15, 2026" symbol="$" value={v.paid3} onChange={st.bind("paid3")} />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {v.knowPrior && <MoneyField label="Your 2025 AGI" symbol="$" value={v.priorAgi} onChange={st.bind("priorAgi")} optional info="Above $150,000 ($75,000 married filing separately) the prior-year safe harbor is 110% of last year's tax." />}
            <MoneyField label="Interest, dividends and short-term gains" symbol="$" value={v.other} onChange={st.bind("other")} optional />
            <MoneyField label="Pensions, IRA withdrawals, rental profit and other income" symbol="$" value={v.pension} onChange={st.bind("pension")} optional />
            <MoneyField label="Long-term capital gains and qualified dividends" symbol="$" value={v.ltcg} onChange={st.bind("ltcg")} optional />
            <MoneyField label="Adjustments to income" symbol="$" value={v.adjust} onChange={st.bind("adjust")} optional info="SEP or solo 401(k) contributions, self-employed health insurance, deductible IRA, student loan interest." />
            <MoneyField label="Itemized deductions" symbol="$" value={v.itemized} onChange={st.bind("itemized")} optional />
            <StepperField label="Children under 17" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={15} unit="children" dp={0} optional />
            {v.se > 0 && <Switch label="Claim the 20% QBI deduction" checked={v.qbi} onChange={st.bind("qbi")} optional info="The qualified business income deduction for sole proprietors, assuming no employees." />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={nothingNeeded ? "No more estimated payments needed" : remaining === 1 ? "Your last 2026 payment" : `Each of your ${remaining} remaining payments`}
        value={usd(plan.perRemaining)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          nothingNeeded ? (
            <>
              Your 2026 tax is about <b>{usd(ret.totalTax)}</b>. With <b>{usd(v.withheld + paidSoFar)}</b>{" "}withheld and paid, you already meet the safe harbor{est.underThreshold ? " (you owe under $1,000)" : ""}. Any balance of{" "}
              <b>{usd(Math.max(0, plan.dueAtFiling))}</b>{" "}is due by April 15, 2027.
            </>
          ) : (
            <>
              Your 2026 tax is about <b>{usd(ret.totalTax)}</b>. To avoid a penalty you need <b>{usd(est.required)}</b>{" "}paid in ({basisText}). After <b>{usd(v.withheld + paidSoFar)}</b>{" "}withheld and paid, pay{" "}
              <b>{usd(plan.perRemaining)}</b>{" "}on each remaining due date, then <b>{usd(Math.max(0, plan.dueAtFiling))}</b>{" "}by April 15, 2027.
            </>
          )
        }
        badges={[`Safe harbor: ${basisText}`, `Set aside ${percent(setAside)} of income`, `Penalty if caught up: ${usd(plan.penaltyIfCaughtUp)}`]}
      />

      <Facts
        items={[
          { label: "2026 tax", value: usd(ret.totalTax) },
          { label: "Safe harbor to pay in", value: usd(est.required) },
          { label: "Still to pay in estimates", value: usd(plan.stillNeeded), tone: plan.stillNeeded > 0 ? "warn" : "good" },
          { label: "Penalty if you pay nothing more", value: usd(plan.penaltyIfNothing), tone: plan.penaltyIfNothing > 0 ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026, filed by April 15, 2027" },
          { label: "Taxes included", value: "Federal income tax, self-employment tax, 3.8% net investment income tax and 0.9% additional Medicare tax" },
          { label: "Withholding", value: "Counted as paid evenly on the four due dates, as the IRS treats it" },
          { label: "Penalty", value: "IRS underpayment rate: 7%, 6% from April to June 2026, then 7% (7% assumed for 2027), simple interest to the date paid" },
          { label: "Not included", value: "State estimated tax, the annualized income method, farmers and fishers" },
        ]}
      />

      <ResultCard title="Your 2026 tax, paid and to pay" sub="Withholding, what you have paid and what is left.">
        <SplitBar
          segments={[
            { label: "Withheld", value: v.withheld, display: usd(v.withheld), color: C.withheld },
            { label: "Estimates paid", value: paidSoFar, display: usd(paidSoFar), color: C.paid },
            { label: "Estimates still to pay", value: plan.stillNeeded, display: usd(plan.stillNeeded), color: C.left },
            { label: "Due with your return", value: Math.max(0, plan.dueAtFiling), display: usd(Math.max(0, plan.dueAtFiling)), color: C.rest },
          ].filter((s, i) => i === 0 || s.value > 0)}
        />
      </ResultCard>

      <ResultCard title="Your payment schedule" sub="Form 1040-ES due dates for 2026.">
        <Statement
          columns={["Payment", "Status"]}
          rows={[
            ...plan.schedule.map((s) => ({ label: `${s.label}: ${s.due}`, values: [usd(s.amount), s.past ? "Made" : "To pay"] })),
            { label: "Balance with your return: April 15, 2027", values: [usd(Math.max(0, plan.dueAtFiling)), plan.dueAtFiling > 0 ? "To pay" : "None"], kind: "total" },
          ]}
        />
        <p className="footnote">To cover the whole bill instead of the safe harbor, pay {usd(plan.perRemainingFull)} on each remaining date.</p>
      </ResultCard>

      <ResultCard title="The safe harbors" sub="Pay in the smallest of these by the due dates and there is no penalty.">
        <Compare
          head={["Rule", "Pay in"]}
          rows={harbors.map((h) => ({ label: h.label, value: usd(h.value), bar: h.value / maxHarbor, current: Math.abs(h.value - est.required) < 0.5 }))}
        />
        <p className="footnote">Or owe less than $1,000 after withholding. The penalty is worked out payment by payment, so catching up late cuts it but may not clear it.</p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Quarterly payments in 2026.">
        {plan.penaltyIfCaughtUp > 0 && (
          <Callout tone="warn" title="An earlier payment fell short">
            Earlier payments were below a quarter of the safe harbor, so a penalty of about {usd(plan.penaltyIfCaughtUp)} builds up even if you catch up now. Withholding is treated as paid evenly through the year, so asking an employer to
            withhold more before December 31 clears more of it than a late estimated payment.
          </Callout>
        )}
        {plan.penaltyIfNothing > 0 && (
          <Callout title="If you pay nothing more">
            Leaving it all until April 15, 2027 would cost a penalty of about {usd(plan.penaltyIfNothing)}, on top of the {usd(Math.max(0, ret.totalTax - v.withheld - paidSoFar))} you owe.
          </Callout>
        )}
        {ret.se.seTax > 0 && (
          <Callout title="Self-employment tax is part of it">
            {usd(ret.se.seTax)} of your bill is self-employment tax, the 15.3% Social Security and Medicare that an employer would otherwise split with you.
          </Callout>
        )}
        <Callout title="How to pay">
          Pay through IRS Direct Pay, your IRS online account or EFTPS, and choose &ldquo;1040-ES&rdquo; and tax year 2026. You can pay early, or more than once a quarter. Most states with an income tax want their own estimated payments too.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for tax year 2026. Not tax advice.
      </p>
    </Studio>
  );
}
