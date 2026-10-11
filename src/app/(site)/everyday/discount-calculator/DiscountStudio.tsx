"use client";

import type { ReactNode } from "react";

import { addTax, applyDiscounts, multiBuy, originalFromSale, stackedPercent, unitPrice, type Discount } from "@/lib/life/maths";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Mode = "sale" | "original" | "deal" | "compare";
type Cur = "gbp" | "usd" | "eur";

const SCHEMA = {
  mode: oneOf<Mode>("sale", ["sale", "original", "deal", "compare"]),
  cur: oneOf<Cur>("gbp", ["gbp", "usd", "eur"]),
  price: num(80, 0, 10_000_000),
  kind: oneOf<"percent" | "amount">("percent", ["percent", "amount"]),
  off: num(25, 0, 10_000_000),
  extra: num(0, 0, 100),
  extra2: num(0, 0, 100),
  sale: num(45, 0, 10_000_000),
  pct: num(40, 0, 99),
  item: num(1.5, 0, 1_000_000),
  buy: num(2, 1, 50),
  free: num(1, 0, 50),
  pa: num(2.4, 0, 1_000_000),
  qa: num(500, 0, 1_000_000),
  pb: num(3.3, 0, 1_000_000),
  qb: num(750, 0, 1_000_000),
  tax: num(0, 0, 30),
};
const ADVANCED = ["extra", "extra2", "tax", "cur"] as const;
const SYMBOL: Record<Cur, string> = { gbp: "£", usd: "$", eur: "€" };
const CODE: Record<Cur, string> = { gbp: "GBP", usd: "USD", eur: "EUR" };

const MODES: { value: Mode; label: string }[] = [
  { value: "sale", label: "Sale price after a discount" },
  { value: "original", label: "Original price from a sale price" },
  { value: "deal", label: "Buy X get Y free (3 for 2)" },
  { value: "compare", label: "Compare two offers by unit price" },
];

const pc = (x: number) => `${Number(x.toFixed(2)).toLocaleString("en-GB")}%`;

export default function DiscountStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const sym = SYMBOL[v.cur];
  const fmt = new Intl.NumberFormat("en-GB", { style: "currency", currency: CODE[v.cur], currencyDisplay: "narrowSymbol", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const m = (x: number) => fmt.format(Number.isFinite(x) ? x : 0);
  const unit = (x: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: CODE[v.cur], currencyDisplay: "narrowSymbol", minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(Number.isFinite(x) ? x : 0);

  // Sale price
  const discounts: Discount[] = [{ kind: v.kind, value: v.kind === "percent" ? Math.min(v.off, 100) : v.off }];
  if (v.extra > 0) discounts.push({ kind: "percent", value: v.extra });
  if (v.extra2 > 0) discounts.push({ kind: "percent", value: v.extra2 });
  const sale = applyDiscounts(v.price, discounts);
  const naive = discounts.reduce((a, d) => a + (d.kind === "percent" ? d.value : 0), 0);
  const allPercent = discounts.every((d) => d.kind === "percent");

  // Original price
  const orig = originalFromSale(v.sale, v.pct);

  // Deal
  const deal = multiBuy(v.item, v.buy, v.free);

  // Compare
  const ua = unitPrice(v.pa, v.qa);
  const ub = unitPrice(v.pb, v.qb);
  const cheaper = ua === ub ? "same" : (ua > 0 && (ua < ub || ub === 0)) ? "a" : "b";
  const diff = ua > 0 && ub > 0 ? (Math.abs(ua - ub) / Math.max(ua, ub)) * 100 : 0;

  let eyebrow = "";
  let value = "";
  let sentence: ReactNode = null;
  let payable = 0;
  switch (v.mode) {
    case "sale":
      eyebrow = "You pay";
      value = m(sale.final);
      payable = sale.final;
      sentence = (
        <>
          {m(v.price)} with {sale.steps.map((s) => s.label.replace(/^(\d+(\.\d+)?) off$/, (_, a) => `${m(Number(a))} off`)).join(", then ") || "no discount"}{" "}
          comes to <b>{m(sale.final)}</b>. You save <b>{m(sale.saved)}</b>, which is {pc(sale.effectivePercent)} off.
        </>
      );
      break;
    case "original":
      eyebrow = "Original price";
      value = m(orig);
      payable = v.sale;
      sentence =
        v.pct > 0 ? (
          <>
            A sale price of {m(v.sale)} after {pc(v.pct)} off means the original price was <b>{m(orig)}</b>. The discount was worth <b>{m(orig - v.sale)}</b>.
          </>
        ) : (
          <>With no discount, the original price is the same as the price you pay.</>
        );
      break;
    case "deal":
      eyebrow = "Price per item";
      value = m(deal.perItem);
      payable = deal.pay;
      sentence = (
        <>
          Buy {v.buy}, get {v.free} free: you take home {deal.items} items for <b>{m(deal.pay)}</b>, or <b>{m(deal.perItem)}</b>{" "}each. That is the same as{" "}
          <b>{pc(deal.percentOff)}</b>{" "}off, but only if you would use every item.
        </>
      );
      break;
    case "compare":
      eyebrow = cheaper === "same" ? "Same unit price" : `Offer ${cheaper === "a" ? "A" : "B"} is cheaper`;
      value = cheaper === "same" ? unit(ua) : unit(Math.min(ua || ub, ub || ua));
      payable = cheaper === "b" ? v.pb : v.pa;
      sentence =
        ua > 0 && ub > 0 ? (
          <>
            Offer A costs {unit(ua)} per unit and offer B {unit(ub)}.{" "}
            {cheaper === "same" ? "They cost the same per unit." : <>Offer {cheaper === "a" ? "A" : "B"} is <b>{pc(diff)}</b>{" "}cheaper per unit.</>}
          </>
        ) : (
          <>Enter a price and a quantity for both offers.</>
        );
      break;
  }
  const withTax = addTax(payable, v.tax);

  return (
    <Studio
      title="Your discount"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the discount"
      onReset={st.reset}
      dock={{ label: eyebrow, value }}
      inputs={
        <>
          <InputGroup title="What do you want to work out?">
            <SelectField label="Calculation" value={v.mode} onChange={st.bind("mode")} options={MODES} />
            {v.mode === "sale" && (
              <>
                <MoneyField label="Original price" value={v.price} onChange={st.bind("price")} pence symbol={sym} />
                <Segmented label="Discount type" value={v.kind} onChange={st.bind("kind")} options={[{ value: "percent", label: "% off" }, { value: "amount", label: `${sym} off` }]} />
                {v.kind === "percent" ? (
                  <StepperField label="Discount" value={Math.min(v.off, 100)} onChange={st.bind("off")} step={1} min={0} max={100} unit="%" dp={2} />
                ) : (
                  <MoneyField label="Amount off" value={v.off} onChange={st.bind("off")} pence symbol={sym} />
                )}
              </>
            )}
            {v.mode === "original" && (
              <>
                <MoneyField label="Sale price you paid" value={v.sale} onChange={st.bind("sale")} pence symbol={sym} />
                <StepperField label="Discount that was taken off" value={v.pct} onChange={st.bind("pct")} step={1} min={0} max={99} unit="%" dp={2} />
              </>
            )}
            {v.mode === "deal" && (
              <>
                <MoneyField label="Price of one item" value={v.item} onChange={st.bind("item")} pence symbol={sym} />
                <StepperField label="Buy" value={v.buy} onChange={(x) => st.set("buy", Math.max(1, Math.round(x)))} step={1} min={1} max={10} unit="items" dp={0} />
                <StepperField label="Get free" value={v.free} onChange={(x) => st.set("free", Math.round(x))} step={1} min={0} max={10} unit="items" dp={0} info="3 for 2 is buy 2 get 1 free. Buy one get one free is buy 1 get 1." />
              </>
            )}
            {v.mode === "compare" && (
              <>
                <MoneyField label="Offer A price" value={v.pa} onChange={st.bind("pa")} pence symbol={sym} />
                <StepperField label="Offer A quantity" value={v.qa} onChange={st.bind("qa")} step={1} min={0} max={5000} unit="units" dp={2} info="Grams, millilitres, items or sheets: use the same unit for both offers." />
                <MoneyField label="Offer B price" value={v.pb} onChange={st.bind("pb")} pence symbol={sym} />
                <StepperField label="Offer B quantity" value={v.qb} onChange={st.bind("qb")} step={1} min={0} max={5000} unit="units" dp={2} />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Currency"
              value={v.cur}
              onChange={st.bind("cur")}
              optional
              options={[
                { value: "gbp", label: "Pounds (£)" },
                { value: "usd", label: "Dollars ($)" },
                { value: "eur", label: "Euros (€)" },
              ]}
            />
            {v.mode === "sale" && (
              <>
                <StepperField label="Extra % off at the till" value={v.extra} onChange={st.bind("extra")} step={1} min={0} max={100} unit="%" dp={2} optional info="A second discount taken from the already reduced price, such as an extra 10% with a voucher." />
                <StepperField label="A further % off" value={v.extra2} onChange={st.bind("extra2")} step={1} min={0} max={100} unit="%" dp={2} optional info="A third discount, such as a staff or student discount, taken from the price left after the first two." />
              </>
            )}
            <StepperField label="Sales tax to add" value={v.tax} onChange={st.bind("tax")} step={0.25} min={0} max={30} unit="%" dp={3} optional info="UK and EU shelf prices already include VAT, so leave this at 0. In the US, sales tax is usually added at the till." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={eyebrow}
        value={value}
        unit={v.mode === "compare" ? "per unit" : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {sentence}
            {v.tax > 0 && v.mode !== "compare" && (
              <>
                {" "}
                With {pc(v.tax)} sales tax added at the till, you pay <b>{m(withTax)}</b>.
              </>
            )}
          </>
        }
        badges={[MODES.find((x) => x.value === v.mode)!.label, `Currency: ${sym}`]}
      />

      {v.mode === "sale" && (
        <>
          <SplitBar
            segments={[
              { label: "You pay", value: sale.final, display: m(sale.final), color: "#2a78d6" },
              { label: "You save", value: sale.saved, display: m(sale.saved), color: "#1baf7a" },
            ]}
          />
          <Facts
            items={[
              { label: "Original price", value: m(v.price) },
              { label: "You save", value: m(sale.saved), tone: "good" },
              { label: "Total discount", value: pc(sale.effectivePercent) },
              { label: "You pay", value: m(sale.final) },
            ]}
          />
          <ResultCard title="How it is worked out" sub="Each discount is taken from the price left by the one before.">
            <Statement
              columns={["Amount"]}
              rows={[
                { label: "Original price", values: [m(v.price)] },
                ...sale.steps.map((s) => ({ label: s.label.replace(/^(\d+(\.\d+)?) off$/, (_, a) => `${m(Number(a))} off`), values: [`−${m(s.off)}`], kind: "deduction" as const })),
                { label: "You pay", values: [m(sale.final)], kind: "total" as const },
              ]}
            />
          </ResultCard>
          {discounts.length > 1 && allPercent && (
            <Callout title="Stacked discounts do not add up">
              {discounts.map((d) => pc(d.value)).join(" then ")} off is {pc(stackedPercent(discounts.map((d) => d.value)))} off in total, not {pc(naive)}, because each
              later discount is taken from a smaller price.
            </Callout>
          )}
        </>
      )}

      {v.mode === "original" && (
        <>
          <Facts
            items={[
              { label: "Original price", value: m(orig) },
              { label: "You paid", value: m(v.sale) },
              { label: "Discount", value: m(orig - v.sale), tone: "good" },
              { label: "Share you paid", value: pc(100 - v.pct) },
            ]}
          />
          <ResultCard title="How it is worked out" sub="Divide by what was left, not add the percentage back.">
            <Statement
              columns={["Value"]}
              rows={[
                { label: `100% − ${pc(v.pct)}`, values: [pc(100 - v.pct)] },
                { label: `${m(v.sale)} ÷ ${Number((1 - v.pct / 100).toFixed(4))}`, values: [m(orig)], kind: "total" as const },
              ]}
            />
          </ResultCard>
          <Callout title="A common mistake">
            Adding {pc(v.pct)} back to {m(v.sale)} gives {m(v.sale * (1 + v.pct / 100))}, which is wrong: the discount was a percentage of the higher original price.
          </Callout>
        </>
      )}

      {v.mode === "deal" && (
        <>
          <SplitBar
            segments={[
              { label: `${v.buy} paid for`, value: v.buy, display: m(deal.pay), color: "#2a78d6" },
              { label: `${v.free} free`, value: v.free, display: m(v.item * v.free), color: "#1baf7a" },
            ]}
          />
          <Facts
            items={[
              { label: "Items", value: String(deal.items) },
              { label: "You pay", value: m(deal.pay) },
              { label: "Each works out at", value: m(deal.perItem) },
              { label: "Same as", value: `${pc(deal.percentOff)} off`, tone: "good" },
            ]}
          />
          <Callout tone="warn" title="Only a saving if you use them">
            If you would have bought one item at {m(v.item)}, the deal costs you {m(deal.pay - v.item)} more. Compare the unit price with other sizes and brands too.
          </Callout>
        </>
      )}

      {v.mode === "compare" && (
        <>
          <Facts
            items={[
              { label: "Offer A per unit", value: unit(ua), tone: cheaper === "a" ? "good" : undefined },
              { label: "Offer B per unit", value: unit(ub), tone: cheaper === "b" ? "good" : undefined },
              { label: "Per 100 units, A", value: m(ua * 100) },
              { label: "Per 100 units, B", value: m(ub * 100) },
            ]}
          />
          <Callout title="Same units for both">
            Unit prices only compare fairly if both quantities are in the same unit, for example grams and grams. Convert kilograms to grams (× 1,000) first.
          </Callout>
        </>
      )}

      <Assumptions
        items={[
          { label: "Stacked discounts", value: "Each one taken from the reduced price" },
          { label: "Amount off", value: "Taken before any later % off" },
          { label: "Sales tax", value: v.tax > 0 ? `${pc(v.tax)} added after discounts` : "None added (UK/EU prices include VAT)" },
          { label: "Rounding", value: "To the penny or cent, for display" },
        ]}
      />

      <p className="footnote" style={{ textAlign: "center" }}>
        Shops may round each step differently, so the till can differ by a penny or cent.
      </p>
    </Studio>
  );
}
