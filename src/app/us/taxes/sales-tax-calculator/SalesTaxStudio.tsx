"use client";

import { addSalesTax, removeSalesTax } from "@/lib/us/pay";
import { STATES, stateByCode } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Mode = "add" | "remove";
const CODES = STATES.map((s) => s.code);
const DEFAULT_STATE = "CA";

/** The state's rate as a percentage, with or without the average local rate. */
function stateRate(code: string, local: boolean): number {
  const s = stateByCode(code);
  if (!s) return 0;
  return Math.round((s.sales + (local ? s.localAvg : 0)) * 100 * 1000) / 1000;
}

const SCHEMA = {
  mode: oneOf<Mode>("add", ["add", "remove"]),
  amount: num(100, 0, 1_000_000_000),
  state: oneOf<string>(DEFAULT_STATE, CODES),
  rate: num(stateRate(DEFAULT_STATE, true), 0, 30),
  local: bool(true),
  discount: num(0, 0, 100),
};
const ADVANCED = ["local", "discount"] as const;

const pct = (r: number) => `${Number(r.toFixed(3))}%`;

export default function SalesTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const s = stateByCode(v.state);
  const rate = v.rate / 100;
  const discounted = v.mode === "add" ? v.amount * (1 - v.discount / 100) : v.amount;
  const r = v.mode === "add" ? addSalesTax(discounted, rate) : removeSalesTax(v.amount, rate);
  const isStateRate = Math.abs(v.rate - stateRate(v.state, v.local)) < 0.0005;

  const pickState = (code: string) => {
    st.set("state", code);
    st.set("rate", stateRate(code, v.local));
  };
  const pickLocal = (on: boolean) => {
    st.set("local", on);
    st.set("rate", stateRate(v.state, on));
  };

  const everyState = [...STATES]
    .map((x) => {
      const combined = x.sales + x.localAvg;
      const t = v.mode === "add" ? addSalesTax(discounted, combined) : removeSalesTax(v.amount, combined);
      return { x, combined, t };
    })
    .sort((a, b) => b.combined - a.combined || a.x.name.localeCompare(b.x.name));

  return (
    <Studio
      title="Your purchase"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={v.mode === "add" ? "Calculate the total with tax" : "Calculate the price before tax"}
      onReset={st.reset}
      dock={{ label: v.mode === "add" ? "Total with tax" : "Price before tax", value: usd(v.mode === "add" ? r.gross : r.net, true) }}
      inputs={
        <>
          <InputGroup title="Price and tax">
            <Segmented
              label="I want to"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "add", label: "Add tax to a price" },
                { value: "remove", label: "Take tax out of a total" },
              ]}
            />
            <MoneyField label={v.mode === "add" ? "Price before tax" : "Total including tax"} value={v.amount} onChange={st.bind("amount")} symbol="$" pence max={1_000_000_000} />
            <SelectField label="State" value={v.state} onChange={pickState} options={STATES.map((x) => ({ value: x.code, label: x.name }))} info="Fills in the state rate plus the state's average local rate. Change the rate below if you know your exact one." />
            <StepperField label="Sales tax rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Your combined state and local rate. Check a receipt or your state's revenue department for the rate at your address." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => { st.resetKeys([...ADVANCED]); st.set("rate", stateRate(v.state, true)); }}>
            <Switch label="Include the average local rate" checked={v.local} onChange={pickLocal} optional info="Off: the state rate only. On: the state rate plus the average city and county rate." />
            {v.mode === "add" && (
              <StepperField label="Discount before tax" value={v.discount} onChange={st.bind("discount")} step={5} min={0} max={100} unit="%" dp={1} optional info="A store discount or coupon taken off before tax is added. Most states tax the price after a store coupon." />
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.mode === "add" ? `Total with ${pct(v.rate)} sales tax` : `Price before ${pct(v.rate)} sales tax`}
        value={usd(v.mode === "add" ? r.gross : r.net, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.mode === "add" ? (
            <>
              A price of <b>{usd(r.net, true)}</b>{v.discount > 0 ? ` (after ${v.discount}% off ${usd(v.amount, true)})` : ""} plus <b>{usd(r.tax, true)}</b> of sales tax comes to <b>{usd(r.gross, true)}</b>.
            </>
          ) : (
            <>
              A total of <b>{usd(r.gross, true)}</b> includes <b>{usd(r.tax, true)}</b> of sales tax, so the price before tax was <b>{usd(r.net, true)}</b>.
            </>
          )
        }
        badges={[s ? `${s.name}: ${isStateRate ? (v.local ? "state + average local" : "state rate only") : "your own rate"}` : "Your own rate", `Tax is ${pct(r.gross > 0 ? (r.tax / r.gross) * 100 : 0)} of the total`]}
      />

      <SplitBar
        segments={[
          { label: "Price before tax", value: r.net, display: usd(r.net, true), color: "#0f9f6e" },
          { label: "Sales tax", value: r.tax, display: usd(r.tax, true), color: "#f59e0b" },
        ]}
      />

      <Facts
        items={[
          { label: "Price before tax", value: usd(r.net, true) },
          { label: "Sales tax", value: usd(r.tax, true) },
          { label: "Total", value: usd(r.gross, true) },
          { label: "Rate", value: pct(v.rate) },
        ]}
      />

      <Assumptions
        items={[
          { label: "State", value: s ? `${s.name}: ${pct(s.sales * 100)} state${v.local ? ` + ${pct(s.localAvg * 100)} average local` : ""}` : "None" },
          { label: "Rate used", value: isStateRate ? pct(v.rate) : `${pct(v.rate)} (entered by you)` },
          { label: "Rates as of", value: "July 1, 2026 (Tax Foundation)" },
          { label: "Item", value: "Fully taxable (no food, clothing or other exemptions)" },
        ]}
        note="Your exact rate depends on the address of the sale. Type it in the rate box for an exact answer."
      />

      <ResultCard title={v.mode === "add" ? `${usd(discounted, true)} in every state` : `${usd(v.amount, true)} total in every state`} sub="State rate plus average local rate, highest first.">
        <DataTable
          summary="Show all 50 states and DC"
          columns={["State", "Combined rate", "Tax", v.mode === "add" ? "Total" : "Before tax"]}
          rows={everyState.map(({ x, combined, t }) => [x.name, pct(combined * 100), usd(t.tax, true), usd(v.mode === "add" ? t.gross : t.net, true)])}
        />
      </ResultCard>

      {s && s.sales === 0 && (
        <ResultCard title="Worth knowing" sub={`${s.name} and sales tax.`}>
          <Callout title={`${s.name} has no statewide sales tax`}>
            {s.localAvg > 0
              ? `Local governments in ${s.name} can still charge one; the average local rate is ${pct(s.localAvg * 100)}.`
              : `Most purchases in ${s.name} carry no general sales tax, though some items, such as lodging or meals, can have their own taxes.`}
          </Callout>
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        Rates from the Tax Foundation, July 1, 2026. Results are rounded to the cent.
      </p>
    </Studio>
  );
}
