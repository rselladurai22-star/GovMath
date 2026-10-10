"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { remortgage } from "@/lib/property/remortgage";

const SCHEMA = {
  balance: num(200_000, 0, 10_000_000),
  current: num(7.5, 0, 20),
  rate: num(4.5, 0, 20),
  term: num(20, 1, 40),
  deal: num(2, 1, 10),
  fee: num(999, 0, 20_000),
  addFee: bool(false),
  other: num(0, 0, 20_000),
  erc: num(0, 0, 10),
};
const ADVANCED = ["addFee", "other", "erc"] as const;

export default function RemortgageStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { balance: v.balance, currentRate: v.current, newRate: v.rate, termYears: v.term, dealYears: v.deal, fee: v.fee, addFee: v.addFee, otherCosts: v.other, ercPct: v.erc };
  const r = remortgage(input);
  const worth = r.netSaving > 0;
  const rates = [-1, -0.5, 0, 0.5, 1].map((d) => Math.max(0, v.rate + d)).map((x) => ({ x, r: remortgage({ ...input, newRate: x }) }));
  const maxR = Math.max(1, ...rates.map((x) => Math.abs(x.r.netSaving)));
  const feeIn = remortgage({ ...input, addFee: !v.addFee });

  return (
    <Studio
      title="Your mortgage and the new deal"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare my remortgage"
      onReset={st.reset}
      dock={{ label: worth ? "You save" : "It costs", value: gbp(Math.abs(r.netSaving)) }}
      inputs={
        <>
          <InputGroup title="Your mortgage now">
            <MoneyField label="Mortgage balance" value={v.balance} onChange={st.bind("balance")} big slider={{ min: 0, max: 1_000_000, step: 5_000, ends: ["£0", "£1m"] }} />
            <StepperField label="Rate you will pay if you stay" value={v.current} onChange={st.bind("current")} step={0.05} min={0} max={20} unit="%" dp={2} hint="Usually your lender's standard variable rate once your current deal ends." />
            <StepperField label="Years left on the mortgage" value={v.term} onChange={(n) => st.set("term", Math.round(n))} step={1} min={1} max={40} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="The new deal">
            <StepperField label="New rate" value={v.rate} onChange={st.bind("rate")} step={0.05} min={0} max={20} unit="%" dp={2} />
            <StepperField label="Length of the deal" value={v.deal} onChange={(n) => st.set("deal", Math.round(n))} step={1} min={1} max={10} unit="years" dp={0} />
            <MoneyField label="Arrangement fee" value={v.fee} onChange={st.bind("fee")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Add the fee to the mortgage" checked={v.addFee} onChange={st.bind("addFee")} optional hint="You then pay interest on it for the whole term." />
            <MoneyField label="Other costs" value={v.other} onChange={st.bind("other")} optional hint="Legal, valuation or broker fees. Many remortgage deals include free legal work and valuation." />
            <StepperField label="Early repayment charge" value={v.erc} onChange={st.bind("erc")} step={0.5} min={0} max={10} unit="%" dp={1} optional hint="If you leave your current deal before it ends, often 1% to 5% of the balance." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={worth ? `You save over ${v.deal} ${v.deal === 1 ? "year" : "years"}` : `It costs you over ${v.deal} ${v.deal === 1 ? "year" : "years"}`}
        value={gbp(Math.abs(r.netSaving))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Your monthly payment would {r.monthlySaving >= 0 ? "fall" : "rise"} from <b>{gbp(r.currentMonthly, true)}</b> to <b>{gbp(r.newMonthly, true)}</b>, {gbp(Math.abs(r.monthlySaving), true)} a month.{" "}
            {r.upfront > 0 && r.breakEvenMonths !== null ? <>The {gbp(r.upfront)} of upfront costs is paid back in <b>{r.breakEvenMonths} months</b>. </> : null}
            After fees{r.erc > 0 ? " and the early repayment charge" : ""}, the new deal leaves you <b>{gbp(Math.abs(r.netSaving))}</b> {worth ? "better" : "worse"} off by the end of the deal.
          </>
        }
        badges={[`${percent(v.rate / 100, 2)} new rate`, `${v.deal}-year deal`, worth ? "Worth switching" : "Not worth it"]}
      />

      <Facts
        items={[
          { label: "Monthly payment now", value: gbp(r.currentMonthly, true) },
          { label: "New monthly payment", value: gbp(r.newMonthly, true), tone: r.monthlySaving > 0 ? "good" : "warn" },
          { label: "Upfront costs", value: gbp(r.upfront), note: r.erc > 0 ? `Including ${gbp(r.erc)} ERC` : undefined },
          { label: "Break-even", value: r.breakEvenMonths === null ? "Never" : `${r.breakEvenMonths} months` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Mortgage", value: "Repayment, paid monthly, over the years left" },
          { label: "Staying", value: `${percent(v.current / 100, 2)} for the whole period` },
          { label: "Fee", value: v.addFee ? "Added to the loan" : "Paid upfront" },
          { label: "Saving", value: "Lower payments plus lower balance at the end of the deal, less upfront costs" },
        ]}
      />

      <ResultCard title={`Over the ${v.deal}-year deal`}>
        <Statement
          columns={["Stay", "Switch"]}
          rows={[
            { label: "Monthly payment", values: [gbp(r.currentMonthly, true), gbp(r.newMonthly, true)] },
            { label: "Paid over the deal", values: [gbp(r.currentPaid), gbp(r.newPaid)] },
            { label: "Balance at the end", values: [gbp(r.currentEnd), gbp(r.newEnd)] },
            { label: "Upfront costs", values: ["£0", gbp(r.upfront)], kind: "deduction" },
            { label: "Better off by switching", values: ["", gbp(r.netSaving)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="At other new rates" sub="Gain from switching over the deal.">
        <Compare head={["New rate", "Gain"]} rows={rates.map((x) => ({ label: percent(x.x / 100, 2), value: gbp(x.r.netSaving), deltaTone: x.r.netSaving < 0 ? "up" : undefined, bar: Math.abs(x.r.netSaving) / maxR, current: x.x === v.rate }))} />
      </ResultCard>

      <ResultCard title="Things to check">
        {v.fee > 0 && (
          <Callout title={v.addFee ? "Paying the fee upfront instead" : "Adding the fee to the loan instead"}>
            {v.addFee ? "Paying it upfront" : "Adding it to the mortgage"} would leave you {gbp(Math.abs(feeIn.netSaving - r.netSaving))} {feeIn.netSaving > r.netSaving ? "better" : "worse"} off over the deal. Over the full term, adding a fee
            costs interest for every year of the mortgage.
          </Callout>
        )}
        {r.erc > 0 && (
          <Callout tone="warn" title={`An early repayment charge of ${gbp(r.erc)}`}>
            Most lenders let you arrange a new deal up to 6 months ahead, then switch on the day your current deal ends, with no charge.
          </Callout>
        )}
        <Callout title="Compare a product transfer">
          Your current lender may offer a new deal with no legal work or affordability checks. Compare its rate and fee with the whole market, ideally through a broker.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An illustration with fixed rates. Lenders decide what you can borrow and charge.
      </p>
    </Studio>
  );
}
