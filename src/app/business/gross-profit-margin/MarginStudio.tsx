"use client";

import { discountImpact, marginStudy } from "@/lib/business/margins";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent, whole } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  price: num(100, 0, 10_000_000),
  cost: num(40, 0, 10_000_000),
  incVat: bool(false),
  vat: num(20, 0, 20),
  units: num(0, 0, 100_000_000),
  overheads: num(0, 0, 100_000_000),
  discount: num(10, 0, 90),
};
const ADVANCED = ["incVat", "vat", "units", "overheads", "discount"] as const;
const COLORS = { cost: "#94a3b8", profit: "#0f9f6e", vat: "#f59e0b", loss: "#e11d48" };
const DISCOUNTS = [0, 0.05, 0.1, 0.15, 0.2, 0.25];

const pct = (n: number) => percent(n, 1);

export default function MarginStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const vatRate = v.vat / 100;
  const r = marginStudy({ price: v.price, cost: v.cost, priceIncVat: v.incVat, vatRate, units: v.units, overheads: v.overheads });
  const loss = r.profit < 0;
  const totals = v.units > 0;
  const chosen = discountImpact(r.netPrice, r.cost, v.discount / 100);
  const discountRows = Array.from(new Set([...DISCOUNTS, v.discount / 100])).sort((a, b) => a - b).map((d) => discountImpact(r.netPrice, r.cost, d));
  const maxProfit = Math.max(...discountRows.map((d) => d.profit), 0.01);

  return (
    <Studio
      title="Your price and cost"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my margin"
      onReset={st.reset}
      dock={{ label: "Gross margin", value: pct(r.marginPct) }}
      inputs={
        <>
          <InputGroup title="One item or service">
            <MoneyField label="Selling price" value={v.price} onChange={st.bind("price")} big pence hint={v.incVat ? "Including VAT, as the customer sees it." : "Before VAT. Change this under More options if your price includes VAT."} />
            <MoneyField label="What it costs you" value={v.cost} onChange={st.bind("cost")} pence hint="Direct cost only: stock, materials, packaging. Before VAT if you are VAT-registered." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="My selling price includes VAT" checked={v.incVat} onChange={st.bind("incVat")} optional hint="Margin is worked out on the price before VAT, because the VAT goes to HMRC." />
            {v.incVat && <StepperField label="VAT rate on the sale" value={v.vat} onChange={st.bind("vat")} step={5} min={0} max={20} unit="%" dp={0} optional />}
            <StepperField label="Units sold a year" value={v.units} onChange={st.bind("units")} step={100} min={0} max={100_000_000} unit="units" dp={0} optional hint="To see your yearly gross profit." />
            <MoneyField label="Overheads a year" value={v.overheads} onChange={st.bind("overheads")} optional hint="Rent, wages, software, insurance: costs that do not change with each sale." />
            <StepperField label="Discount to test" value={v.discount} onChange={st.bind("discount")} step={5} min={0} max={90} unit="%" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your gross margin"
        value={pct(r.marginPct)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.netPrice <= 0 ? (
            <>Enter a selling price to see your margin.</>
          ) : loss ? (
            <>
              You lose <b>{gbp(-r.profit, true)}</b> on every sale: it costs <b>{gbp(r.cost, true)}</b> but sells for <b>{gbp(r.netPrice, true)}</b>
              {v.incVat ? " before VAT" : ""}.
            </>
          ) : (
            <>
              You make <b>{gbp(r.profit, true)}</b> gross profit on every <b>{gbp(r.netPrice, true)}</b> sale{v.incVat ? " before VAT" : ""}. That is a{" "}
              <b>{pct(r.marginPct)}</b> margin, or a <b>{pct(r.markupPct)}</b> markup on cost.
            </>
          )
        }
        badges={[`${pct(r.markupPct)} markup`, `${gbp(r.profit, true)} profit each`, ...(totals ? [`${gbp(r.grossProfit)} gross profit a year`] : [])]}
      />

      <Facts
        items={[
          { label: "Gross profit each", value: gbp(r.profit, true), tone: loss ? "bad" : "good" },
          { label: "Gross margin", value: pct(r.marginPct), note: "Profit ÷ price" },
          { label: "Markup", value: r.cost > 0 ? pct(r.markupPct) : "n/a", note: "Profit ÷ cost" },
          totals
            ? { label: "Net profit a year", value: gbp(r.netProfit), tone: r.netProfit < 0 ? "bad" : "good", note: `${pct(r.netMarginPct)} net margin` }
            : { label: "Cost as a share of price", value: r.netPrice > 0 ? pct(r.cost / r.netPrice) : "n/a" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Price", value: v.incVat ? `Includes ${v.vat}% VAT, taken out first` : "Before VAT" },
          { label: "Cost", value: "Direct cost of each sale only" },
          { label: "Overheads", value: v.overheads > 0 ? `${gbp(v.overheads)} a year` : "Not included" },
          { label: "Units a year", value: totals ? whole(v.units) : "Not entered" },
        ]}
      />

      {r.netPrice > 0 && (
        <ResultCard title="Where each sale goes" sub={v.incVat ? "The price the customer pays, split three ways." : "The selling price, split into cost and profit."}>
          <SplitBar
            segments={[
              { label: "Cost", value: Math.min(r.cost, r.netPrice), display: gbp(r.cost, true), color: COLORS.cost },
              ...(r.profit > 0 ? [{ label: "Gross profit", value: r.profit, display: gbp(r.profit, true), color: COLORS.profit }] : []),
              ...(r.vat > 0 ? [{ label: "VAT to HMRC", value: r.vat, display: gbp(r.vat, true), color: COLORS.vat }] : []),
            ]}
            caption={
              loss ? (
                <>The cost is more than the price, so there is no profit to show.</>
              ) : (
                <>
                  Out of every £1 of sales before VAT, <b>{Math.round(r.marginPct * 100)}p</b> is gross profit.
                </>
              )
            }
          />
        </ResultCard>
      )}

      {totals && (
        <ResultCard title="Your year" sub={`${whole(v.units)} sales at ${gbp(r.netPrice, true)} each.`}>
          <Statement
            columns={["A year"]}
            rows={[
              { label: "Sales before VAT", values: [gbp(r.revenue)] },
              { label: "Direct costs", values: [`−${gbp(r.cost * r.units)}`], kind: "deduction" },
              { label: "Gross profit", values: [gbp(r.grossProfit)], kind: "total" },
              { label: "Overheads", values: [`−${gbp(r.overheads)}`], kind: "deduction" },
              { label: "Net profit before tax", values: [gbp(r.netProfit)], kind: "total" },
            ]}
          />
          {r.overheads > 0 && (
            <Callout tone={r.netProfit >= 0 ? "good" : "warn"} title={Number.isFinite(r.breakEvenUnits) ? `You need ${whole(Math.ceil(r.breakEvenUnits))} sales to cover overheads` : "Each sale loses money"}>
              {Number.isFinite(r.breakEvenUnits)
                ? r.netProfit >= 0
                  ? `You sell ${whole(v.units)}, so you are ${whole(v.units - Math.ceil(r.breakEvenUnits))} sales above break-even.`
                  : `You sell ${whole(v.units)}, so you are ${whole(Math.ceil(r.breakEvenUnits) - v.units)} sales short of break-even.`
                : "No number of sales can cover overheads until the price is above the cost."}
            </Callout>
          )}
        </ResultCard>
      )}

      {r.profit > 0 && (
        <ResultCard title="What a discount really costs" sub="The extra sales you need to earn the same gross profit after a price cut.">
          <Compare
            head={["Discount", "Profit each"]}
            rows={discountRows.map((d) => ({
              label: d.discount === 0 ? "Full price" : `${Math.round(d.discount * 100)}% off`,
              value: gbp(d.profit, true),
              delta: d.discount === 0 ? `${pct(d.marginPct)} margin` : Number.isFinite(d.extraSalesNeeded) ? `+${pct(d.extraSalesNeeded)} sales` : "Loss",
              deltaTone: d.discount === 0 ? undefined : "up",
              bar: Math.max(0, d.profit) / maxProfit,
              current: Math.abs(d.discount - v.discount / 100) < 1e-9,
            }))}
          />
          {v.discount > 0 && (
            <Callout tone="warn" title={Number.isFinite(chosen.extraSalesNeeded) ? `${v.discount}% off needs ${pct(chosen.extraSalesNeeded)} more sales` : `${v.discount}% off wipes out your profit`}>
              {Number.isFinite(chosen.extraSalesNeeded)
                ? `Your margin falls from ${pct(r.marginPct)} to ${pct(chosen.marginPct)}. To make the same gross profit you need to sell ${whole(Math.ceil((1 + chosen.extraSalesNeeded) * 100))} for every 100 you sell now.`
                : "The discounted price is at or below your cost, so extra sales only add to the loss."}
            </Callout>
          )}
        </ResultCard>
      )}

      {r.netPrice > 0 && (
        <ResultCard title="Worth knowing" sub="The checks that catch most pricing mistakes.">
          <Callout title="Margin and markup are not the same">
            A {pct(r.marginPct)} margin is a {pct(r.markupPct)} markup. If a supplier or buyer quotes one, check which they mean before you agree a price.
          </Callout>
          {!v.incVat && (
            <Callout title="Leave VAT out of the sum">
              If you are VAT-registered, work out margin on the price before VAT. The VAT is HMRC&apos;s money, so including it overstates your margin.
            </Callout>
          )}
          <Callout title="Gross margin is not take-home">
            Overheads, then Income Tax or Corporation Tax, come out of gross profit. Add your overheads under More options to see net profit.
          </Callout>
        </ResultCard>
      )}

      <p className={s.hint} style={{ textAlign: "center" }}>
        Figures before tax. A pricing guide, not financial advice.
      </p>
    </Studio>
  );
}
