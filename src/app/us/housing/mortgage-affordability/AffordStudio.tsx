"use client";

import { affordability } from "@/lib/us/mortgage";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Rule = "28-36" | "28-43" | "31-43" | "custom";

const SCHEMA = {
  income: num(100_000, 0, 100_000_000),
  debts: num(500, 0, 1_000_000),
  down: num(40_000, 0, 100_000_000),
  rate: num(7.25, 0, 30),
  years: oneOf<"15" | "20" | "30">("30", ["15", "20", "30"]),
  rule: oneOf<Rule>("28-36", ["28-36", "28-43", "31-43", "custom"]),
  front: num(28, 1, 100),
  back: num(36, 1, 100),
  taxRate: num(1, 0, 10),
  insurance: num(1_800, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  pmiRate: num(0.5, 0, 5),
};
const ADVANCED = ["rule", "front", "back", "taxRate", "insurance", "hoa", "pmiRate"] as const;

const PRESETS: Record<Exclude<Rule, "custom">, [number, number]> = {
  "28-36": [28, 36],
  "28-43": [28, 43],
  "31-43": [31, 43],
};

const RULE_LABEL: Record<Rule, string> = {
  "28-36": "28/36: the classic guideline",
  "28-43": "28/43: a common upper limit",
  "31-43": "31/43: FHA's standard limits",
  custom: "My own limits",
};

export default function AffordStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const [frontPct, backPct] = v.rule === "custom" ? [v.front, v.back] : PRESETS[v.rule];
  const base = {
    income: v.income,
    debts: v.debts,
    down: v.down,
    aprPct: v.rate,
    years: Number(v.years),
    taxRate: v.taxRate / 100,
    insurance: v.insurance,
    hoa: v.hoa,
    pmiRate: v.pmiRate / 100,
    frontLimit: frontPct / 100,
    backLimit: backPct / 100,
  };
  const a = affordability(base);
  const p = a.payment;
  const front = a.limitedBy === "front";
  const noDebts = v.debts > 0 ? affordability({ ...base, debts: 0 }) : a;
  const extraDown = [0, 10_000, 25_000, 50_000].map((d) => ({ d, r: d === 0 ? a : affordability({ ...base, down: v.down + d }) }));
  const rules = (["28-36", "28-43", "31-43"] as const).map((k) => ({ k, r: affordability({ ...base, frontLimit: PRESETS[k][0] / 100, backLimit: PRESETS[k][1] / 100 }) }));
  const nothing = a.price < 1;
  const dtiBack = a.grossMonthly > 0 ? (p.total + v.debts) / a.grossMonthly : 0;
  const dtiFront = a.grossMonthly > 0 ? p.total / a.grossMonthly : 0;

  return (
    <Studio
      title="Your home budget"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out what I can afford"
      onReset={st.reset}
      dock={{ label: "Home price you can afford", value: usd(a.price) }}
      inputs={
        <>
          <InputGroup title="Your money">
            <MoneyField label="Household income a year, before tax" symbol="$" value={v.income} onChange={st.bind("income")} slider={{ min: 20_000, max: 500_000, step: 1_000, ends: ["$20k", "$500k"] }} />
            <MoneyField
              label="Other debt payments a month"
              symbol="$"
              value={v.debts}
              onChange={st.bind("debts")}
              info="Car loans, student loans, credit card minimums, personal loans, child support. Not rent, utilities or groceries."
            />
            <MoneyField label="Down payment" symbol="$" value={v.down} onChange={st.bind("down")} />
          </InputGroup>
          <InputGroup title="The mortgage">
            <StepperField
              label="Interest rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.125}
              min={0}
              max={30}
              unit="%"
              dp={3}
              info="Freddie Mac's survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026."
            />
            <Segmented
              label="Loan term"
              value={v.years}
              onChange={st.bind("years")}
              options={[
                { value: "15", label: "15 years" },
                { value: "20", label: "20 years" },
                { value: "30", label: "30 years" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Debt-to-income limits"
              optional
              value={v.rule}
              onChange={st.bind("rule")}
              options={(Object.keys(RULE_LABEL) as Rule[]).map((k) => ({ value: k, label: RULE_LABEL[k] }))}
              info="The first figure caps the housing payment, the second all debts including housing, both as a share of gross monthly income. Fannie Mae allows up to 50% total with automated approval."
            />
            {v.rule === "custom" && (
              <>
                <StepperField label="Housing payment limit" optional value={v.front} onChange={st.bind("front")} step={1} min={1} max={100} unit="%" dp={0} />
                <StepperField label="All-debts limit" optional value={v.back} onChange={st.bind("back")} step={1} min={1} max={100} unit="%" dp={0} />
              </>
            )}
            <StepperField label="Property tax rate" optional value={v.taxRate} onChange={st.bind("taxRate")} step={0.05} min={0} max={10} unit="%" dp={2} info="About 1% of the price is typical; state averages run from about 0.3% to about 2.2%." />
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <StepperField
              label="PMI or mortgage insurance rate"
              optional
              value={v.pmiRate}
              onChange={st.bind("pmiRate")}
              step={0.05}
              min={0}
              max={5}
              unit="%"
              dp={2}
              info="Charged a year on the loan when you put down less than 20%. For an FHA loan, the annual premium is 0.55% on most 30-year loans with less than 5% down (HUD, since March 2023)."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Home price you can afford"
        value={usd(a.price)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          nothing ? (
            <>
              With these figures, no home price fits: your other debts already use up the {backPct}% all-debts limit, or the tax, insurance and dues alone are over the limit.
            </>
          ) : (
            <>
              With {usd(v.down)} down, you could borrow <b>{usd(a.loan)}</b>{" "}and buy a home for about <b>{usd(a.price)}</b>. The monthly payment of <b>{usd(p.total)}</b>{" "}is set by the{" "}
              <b>{front ? `${frontPct}% housing limit` : `${backPct}% all-debts limit`}</b>
              {front ? "." : `, because your other debts of ${usd(v.debts)} a month take up part of it.`}
            </>
          )
        }
        badges={[`Loan ${usd(a.loan)}`, `Housing ${percent(dtiFront, 0)} of income`, `All debts ${percent(dtiBack, 0)} of income`, front ? "Housing limit binds" : "All-debts limit binds"]}
      />

      <Facts
        items={[
          { label: "Gross income a month", value: usd(a.grossMonthly) },
          { label: `Housing limit (${frontPct}%)`, value: usd(a.frontMax), tone: front ? "warn" : undefined },
          { label: `All-debts room (${backPct}% less debts)`, value: usd(Math.max(0, a.backMax)), tone: front ? undefined : "warn" },
          { label: "Monthly payment", value: usd(p.total) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Limits", value: `Housing up to ${frontPct}% and all debts up to ${backPct}% of gross income` },
          { label: "Loan", value: `${v.rate}% fixed for ${v.years} years` },
          { label: "Tax and insurance", value: `Property tax ${v.taxRate}% of the price a year; insurance ${usd(v.insurance)} a year` },
          { label: "PMI", value: `${v.pmiRate}% a year of the loan while you have less than 20% down` },
          { label: "Not included", value: "Closing costs, moving, repairs and an emergency fund" },
        ]}
      />

      <ResultCard title="Your monthly payment" sub="At the price you can afford.">
        <SplitBar
          segments={[
            { label: "Principal and interest", value: p.principalAndInterest, display: usd(p.principalAndInterest), color: "#16a34a" },
            { label: "Property tax", value: p.taxMonthly, display: usd(p.taxMonthly), color: "#f59e0b" },
            { label: "Homeowners insurance", value: p.insuranceMonthly, display: usd(p.insuranceMonthly), color: "#5b1e6e" },
            { label: "PMI", value: p.pmiMonthly, display: usd(p.pmiMonthly), color: "#db2777" },
            { label: "HOA dues", value: p.hoa, display: usd(p.hoa), color: "#2e0a3a" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Each rule side by side" sub="The same income, debts and down payment.">
        <Statement
          columns={["Home price", "Payment", "Binds"]}
          rows={rules.map(({ k, r }) => ({
            label: RULE_LABEL[k].split(":")[0],
            values: [usd(r.price), usd(r.payment.total), r.limitedBy === "front" ? "Housing" : "All debts"],
          }))}
        />
      </ResultCard>

      <ResultCard title="What a bigger down payment changes" sub="Same income and limits, more cash up front.">
        <Statement
          columns={["Home price", "Loan", "PMI a month"]}
          rows={extraDown.map(({ d, r }) => ({
            label: d === 0 ? `${usd(v.down)} (yours)` : `${usd(v.down + d)} (+${usd(d)})`,
            values: [usd(r.price), usd(r.loan), usd(r.payment.pmiMonthly)],
          }))}
        />
        <p className="footnote">Extra cash down raises the price by a little less than the amount, because property tax rises with the price, and by more once you reach 20% down and PMI stops.</p>
      </ResultCard>

      {!front && v.debts > 0 && (
        <Callout title="Your other debts are the limit">
          Clearing your {usd(v.debts)} of monthly debt payments would raise the price you can afford to about {usd(noDebts.price)}, an extra {usd(noDebts.price - a.price)}.
        </Callout>
      )}

      <Callout tone="warn" title="What a lender approves is a ceiling, not a target">
        These limits use gross pay. Check the payment against your take-home pay, and leave room for repairs, savings and the costs of owning a home.
      </Callout>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate for planning. Lenders also look at your credit, savings and job history.
      </p>
    </Studio>
  );
}
