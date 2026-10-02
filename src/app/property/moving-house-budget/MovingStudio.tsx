"use client";

import { fullMovingBudget, SURVEY_COSTS, type MoveBuyer, type MoveNation, type SurveyLevel } from "@/lib/property/moving-budget";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  price: num(350_000, 0, 20_000_000),
  deposit: num(50_000, 0, 20_000_000),
  sale: num(0, 0, 20_000_000),
  saleMortgage: num(0, 0, 20_000_000),
  nation: oneOf<MoveNation>("england", ["england", "scotland", "wales"]),
  buyer: oneOf<MoveBuyer>("standard", ["first-time", "standard", "additional"]),
  legal: num(1_500, 0, 50_000),
  survey: oneOf<SurveyLevel>("homebuyer", ["none", "basic", "homebuyer", "full"]),
  mortgageFee: num(999, 0, 20_000),
  removals: num(1_000, 0, 50_000),
  agent: num(1.2, 0, 5),
  sellLegal: num(1_200, 0, 50_000),
  furnishing: num(0, 0, 200_000),
  contingency: num(10, 0, 50),
};
const ADVANCED = ["nation", "legal", "survey", "mortgageFee", "removals", "agent", "sellLegal", "furnishing", "contingency"] as const;
const COLORS = { tax: "#f59e0b", legal: "#4353ff", survey: "#0ea5e9", mortgage: "#7c3aed", selling: "#e11d48", moving: "#0f9f6e", contingency: "#94a3b8" };

export default function MovingStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const selling = v.sale > 0;
  const r = fullMovingBudget({
    price: v.price,
    deposit: v.deposit,
    nation: v.nation,
    buyer: v.buyer,
    legal: v.legal,
    survey: v.survey,
    mortgageFee: v.mortgageFee,
    removals: v.removals,
    salePrice: v.sale,
    agentPct: v.agent,
    sellingLegal: v.sellLegal,
    saleMortgage: v.saleMortgage,
    furnishing: v.furnishing,
    contingencyPct: v.contingency,
  });
  const fromSale = selling ? r.equityReleased : 0;
  const coveredBySale = selling && r.shortfall <= 0;

  return (
    <Studio
      title="Your move"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my moving costs"
      onReset={st.reset}
      dock={{ label: "Moving costs", value: gbp(r.costs) }}
      inputs={
        <>
          <InputGroup title="Buying">
            <MoneyField label="Price of your new home" value={v.price} onChange={st.bind("price")} big slider={{ min: 50_000, max: 1_500_000, step: 5_000, ends: ["£50k", "£1.5m"] }} />
            <MoneyField label="Your deposit" value={v.deposit} onChange={st.bind("deposit")} />
            <Segmented
              label="You are buying as a"
              value={v.buyer}
              onChange={st.bind("buyer")}
              options={[
                { value: "first-time", label: "First-time" },
                { value: "standard", label: "Moving home" },
                { value: "additional", label: "2nd home" },
              ]}
            />
          </InputGroup>
          <InputGroup title="Selling">
            <MoneyField label="Sale price of your current home" value={v.sale} onChange={st.bind("sale")} hint="Leave at £0 if you are not selling." />
            {selling && <MoneyField label="Mortgage left on it" value={v.saleMortgage} onChange={st.bind("saleMortgage")} />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Where you are buying"
              value={v.nation}
              onChange={st.bind("nation")}
              optional
              options={[
                { value: "england", label: "England or NI" },
                { value: "scotland", label: "Scotland" },
                { value: "wales", label: "Wales" },
              ]}
            />
            <MoneyField label="Legal fees for buying" value={v.legal} onChange={st.bind("legal")} optional hint="Conveyancing, searches and registration, including VAT." />
            <SelectField
              label="Survey"
              value={v.survey}
              onChange={st.bind("survey")}
              optional
              options={[
                { value: "none", label: "No survey" },
                { value: "basic", label: `Level 1, condition report (about ${gbp(SURVEY_COSTS.basic)})` },
                { value: "homebuyer", label: `Level 2, homebuyer (about ${gbp(SURVEY_COSTS.homebuyer)})` },
                { value: "full", label: `Level 3, building survey (about ${gbp(SURVEY_COSTS.full)})` },
              ]}
            />
            <MoneyField label="Mortgage arrangement and valuation fees" value={v.mortgageFee} onChange={st.bind("mortgageFee")} optional />
            <MoneyField label="Removals" value={v.removals} onChange={st.bind("removals")} optional hint="From a few hundred pounds for a van to £2,000 or more for a large home." />
            {selling && <StepperField label="Estate agent fee" value={v.agent} onChange={st.bind("agent")} step={0.1} min={0} max={5} unit="% + VAT" dp={1} optional />}
            {selling && <MoneyField label="Legal fees for selling" value={v.sellLegal} onChange={st.bind("sellLegal")} optional />}
            <MoneyField label="Furniture and setting up" value={v.furnishing} onChange={st.bind("furnishing")} optional hint="Furniture, appliances, curtains and decorating." />
            <StepperField label="Contingency" value={v.contingency} onChange={st.bind("contingency")} step={5} min={0} max={50} unit="%" dp={0} optional hint="A buffer for the unexpected." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your moving costs"
        value={gbp(r.costs)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Buying for <b>{gbp(v.price)}</b>
            {selling && <> and selling for {gbp(v.sale)}</>}, your costs come to about <b>{gbp(r.costs)}</b>, including <b>{gbp(r.propertyTax)}</b> {r.taxName}. With your{" "}
            {gbp(v.deposit)} deposit you need <b>{gbp(r.cashNeeded)}</b> in total
            {selling && (
              <>
                , and your sale releases <b>{gbp(fromSale)}</b> after the mortgage and selling costs
              </>
            )}
            .
          </>
        }
        badges={[`${gbp(r.propertyTax)} ${r.taxName}`, `${gbp(r.cashNeeded)} with deposit`, selling ? (coveredBySale ? "Covered by your sale" : `${gbp(r.shortfall)} still to find`) : "Not selling"]}
      />

      <Facts
        items={[
          { label: r.taxName, value: gbp(r.propertyTax) },
          { label: "Other buying costs", value: gbp(r.buyingCosts - r.propertyTax) },
          { label: selling ? "Selling costs" : "Removals and setting up", value: gbp(selling ? r.sellingCosts : v.removals + v.furnishing) },
          selling
            ? { label: "Cash still to find", value: gbp(r.shortfall), tone: r.shortfall > 0 ? "warn" : "good", note: "After using your sale" }
            : { label: "Cash needed with deposit", value: gbp(r.cashNeeded) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: v.nation === "england" ? "England or NI" : v.nation === "scotland" ? "Scotland" : "Wales" },
          { label: "Legal fees", value: `${gbp(v.legal)} to buy${selling ? `, ${gbp(v.sellLegal)} to sell` : ""}` },
          { label: "Survey", value: v.survey === "none" ? "None" : `${gbp(r.surveyCost)}` },
          { label: "Contingency", value: `${v.contingency}%` },
        ]}
      />

      <ResultCard title="Where the money goes" sub="Every one-off cost of the move, excluding your deposit.">
        <SplitBar
          segments={[
            { label: r.taxName, value: r.propertyTax, display: gbp(r.propertyTax), color: COLORS.tax },
            { label: "Legal fees", value: v.legal + (selling ? v.sellLegal : 0), display: gbp(v.legal + (selling ? v.sellLegal : 0)), color: COLORS.legal },
            ...(r.surveyCost > 0 ? [{ label: "Survey", value: r.surveyCost, display: gbp(r.surveyCost), color: COLORS.survey }] : []),
            ...(v.mortgageFee > 0 ? [{ label: "Mortgage fees", value: v.mortgageFee, display: gbp(v.mortgageFee), color: COLORS.mortgage }] : []),
            ...(r.agentFee > 0 ? [{ label: "Estate agent", value: r.agentFee, display: gbp(r.agentFee), color: COLORS.selling }] : []),
            ...(v.removals + v.furnishing > 0 ? [{ label: "Removals and setting up", value: v.removals + v.furnishing, display: gbp(v.removals + v.furnishing), color: COLORS.moving }] : []),
            ...(r.contingency > 0 ? [{ label: "Contingency", value: r.contingency, display: gbp(r.contingency), color: COLORS.contingency }] : []),
          ]}
        />
      </ResultCard>

      {selling && (
        <ResultCard title="Your sale and your purchase" sub="How the money flows on completion day.">
          <Statement
            columns={["Amount"]}
            rows={[
              { label: "Sale price", values: [gbp(v.sale)] },
              { label: "Mortgage repaid", values: [`−${gbp(Math.min(v.saleMortgage, v.sale))}`], kind: "deduction" },
              { label: "Estate agent and legal fees", values: [`−${gbp(r.sellingCosts)}`], kind: "deduction" },
              { label: "Equity released", values: [gbp(r.equityReleased)], kind: "total" },
              { label: "Deposit for the new home", values: [`−${gbp(v.deposit)}`], kind: "deduction" },
              { label: "Buying and moving costs", values: [`−${gbp(r.costs - r.sellingCosts)}`], kind: "deduction" },
              { label: r.equityReleased >= v.deposit + r.costs - r.sellingCosts ? "Left over" : "Still to find", values: [gbp(Math.abs(r.equityReleased - (v.deposit + r.costs - r.sellingCosts)))], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Timing and ways to save.">
        <Callout title="When each cost is paid">
          Surveys and mortgage valuation fees are paid early, often before you know the purchase will go ahead. The deposit is paid at exchange, and {r.taxName}, legal fees and the
          estate agent at completion.
        </Callout>
        {v.buyer === "additional" && (
          <Callout tone="warn" title="Second home rates">
            You pay the higher rates if you will own two homes. If this replaces your main home and you sell the old one later, you can usually claim the extra back.
          </Callout>
        )}
        <Callout title="Get quotes">
          Conveyancing, removals and surveys vary widely. Two or three quotes for each can save hundreds of pounds.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Estimates. Property tax uses 2026/27 rates; other costs are typical figures you can change under More options.
      </p>
    </Studio>
  );
}
