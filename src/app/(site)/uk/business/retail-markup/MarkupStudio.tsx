"use client";

import { marginFromMarkup, markupFromMargin, priceForTarget, type PriceEnding } from "@/lib/business/margins";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Mode = "margin" | "markup";

const SCHEMA = {
  cost: num(25, 0, 10_000_000),
  mode: oneOf<Mode>("margin", ["margin", "markup"]),
  target: num(50, 0, 1000),
  extra: num(0, 0, 1_000_000),
  fee: num(0, 0, 50),
  vatReg: bool(false),
  vat: num(20, 0, 20),
  ending: oneOf<PriceEnding>("none", ["none", "99", "95", "whole"]),
};
const ADVANCED = ["extra", "fee", "vatReg", "vat", "ending"] as const;
const COLORS = { cost: "#94a3b8", fee: "#a46bb8", profit: "#0f9f6e", vat: "#f59e0b" };
const LADDER: Record<Mode, number[]> = { margin: [20, 30, 40, 50, 60, 70], markup: [25, 50, 75, 100, 150, 200] };

const pct = (n: number) => (Number.isFinite(n) ? percent(n, 1) : "n/a");

export default function MarkupStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const target = v.mode === "margin" ? Math.min(v.target, 99) : v.target;
  const vatRate = v.vatReg ? v.vat / 100 : 0;
  const inputs = { cost: v.cost, extraCost: v.extra, mode: v.mode, feePct: v.fee / 100, vatRate, ending: v.ending };
  const r = priceForTarget({ ...inputs, target: target / 100 });
  const other = v.mode === "margin" ? markupFromMargin(target / 100) : marginFromMarkup(target / 100);
  const ladder = Array.from(new Set([...LADDER[v.mode], target])).sort((a, b) => a - b).map((t) => ({ t, p: priceForTarget({ ...inputs, target: t / 100 }) }));
  const maxShelf = Math.max(...ladder.map((x) => x.p.shelf), 0.01);
  const plain = v.fee === 0 && v.extra === 0;

  return (
    <Studio
      title="Your cost and target"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my selling price"
      onReset={st.reset}
      dock={{ label: "Selling price", value: r.possible ? gbp(r.shelf, true) : "Not possible" }}
      inputs={
        <>
          <InputGroup title="The item">
            <MoneyField label="What it costs you" value={v.cost} onChange={st.bind("cost")} big pence hint="Before VAT if you are VAT-registered; including VAT if you are not." />
          </InputGroup>
          <InputGroup title="Your target">
            <Segmented
              label="Price by"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "margin", label: "Margin", note: "Profit as a share of the selling price." },
                { value: "markup", label: "Markup", note: "Profit as a share of the cost." },
              ]}
            />
            <StepperField label={v.mode === "margin" ? "Target margin" : "Target markup"} value={v.target} onChange={st.bind("target")} step={5} min={0} max={v.mode === "margin" ? 99 : 1000} unit="%" dp={1} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Extra cost per sale" value={v.extra} onChange={st.bind("extra")} pence optional hint="Postage, packaging, a gift box: anything you pay each time you sell one." />
            <StepperField label="Card or marketplace fee" value={v.fee} onChange={st.bind("fee")} step={0.5} min={0} max={50} unit="% of price" dp={1} optional hint="Taken from what the customer pays, such as a marketplace's commission." />
            <Switch label="I'm VAT-registered" checked={v.vatReg} onChange={st.bind("vatReg")} optional hint="VAT is added on top of your price, and goes to HMRC." />
            {v.vatReg && <StepperField label="VAT rate on the item" value={v.vat} onChange={st.bind("vat")} step={5} min={0} max={20} unit="%" dp={0} optional />}
            <SelectField
              label="Round the shelf price"
              value={v.ending}
              onChange={st.bind("ending")}
              optional
              options={[
                { value: "none", label: "Exact price" },
                { value: "99", label: "Up to the next …99p" },
                { value: "95", label: "Up to the next …95p" },
                { value: "whole", label: "Up to the next whole pound" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.vatReg ? "Shelf price including VAT" : "Your selling price"}
        value={r.possible ? gbp(r.shelf, true) : "Not possible"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !r.possible ? (
            <>A {target}% margin is not possible once the fee is taken. Lower the margin or the fee.</>
          ) : (
            <>
              To make a <b>{target}% {v.mode}</b> on a <b>{gbp(r.unitCost, true)}</b> cost, sell for <b>{gbp(r.shelf, true)}</b>
              {v.vatReg ? ` including VAT (${gbp(r.net, true)} before VAT)` : ""}. You keep <b>{gbp(r.profit, true)}</b> profit on each sale.
            </>
          )
        }
        badges={[
          v.mode === "margin" ? `Same as a ${pct(other)} markup` : `Same as a ${pct(other)} margin`,
          `${gbp(r.profit, true)} profit each`,
          ...(v.ending !== "none" ? ["Rounded up"] : []),
        ]}
      />

      <Facts
        items={[
          { label: "Price before VAT", value: gbp(r.net, true) },
          { label: "Profit each", value: gbp(r.profit, true), tone: r.profit < 0 ? "bad" : "good" },
          { label: "Actual margin", value: pct(r.marginPct), note: "Profit ÷ price before VAT" },
          { label: "Actual markup", value: pct(r.markupPct), note: "Profit ÷ total cost" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Cost per sale", value: v.extra > 0 ? `${gbp(v.cost, true)} + ${gbp(v.extra, true)} extra` : gbp(v.cost, true) },
          { label: "Fees", value: v.fee > 0 ? `${v.fee}% of the price paid` : "None" },
          { label: "VAT", value: v.vatReg ? `${v.vat}% added on top` : "Not VAT-registered" },
          { label: "Rounding", value: v.ending === "none" ? "Exact" : v.ending === "whole" ? "Up to a whole pound" : `Up to …${v.ending}p` },
        ]}
      />

      {r.possible && r.shelf > 0 && (
        <ResultCard title="Where the money goes" sub="What the customer pays, split up.">
          <SplitBar
            segments={[
              { label: "Your cost", value: r.unitCost, display: gbp(r.unitCost, true), color: COLORS.cost },
              ...(r.fee > 0 ? [{ label: "Fees", value: r.fee, display: gbp(r.fee, true), color: COLORS.fee }] : []),
              ...(r.profit > 0 ? [{ label: "Your profit", value: r.profit, display: gbp(r.profit, true), color: COLORS.profit }] : []),
              ...(r.vat > 0 ? [{ label: "VAT to HMRC", value: r.vat, display: gbp(r.vat, true), color: COLORS.vat }] : []),
            ]}
            caption={<>Customer pays <b>{gbp(r.shelf, true)}</b>.</>}
          />
        </ResultCard>
      )}

      {r.possible && !plain && (
        <ResultCard title="How the price is built" sub="Working back from your target so that fees and extras are covered.">
          <Statement
            columns={["Each sale"]}
            rows={[
              { label: "Customer pays", values: [gbp(r.shelf, true)] },
              ...(r.vat > 0 ? [{ label: "VAT to HMRC", values: [`−${gbp(r.vat, true)}`], kind: "deduction" as const }] : []),
              ...(r.fee > 0 ? [{ label: `Fee at ${v.fee}%`, values: [`−${gbp(r.fee, true)}`], kind: "deduction" as const }] : []),
              { label: "Item cost", values: [`−${gbp(v.cost, true)}`], kind: "deduction" },
              ...(v.extra > 0 ? [{ label: "Extra cost per sale", values: [`−${gbp(v.extra, true)}`], kind: "deduction" as const }] : []),
              { label: "Your profit", values: [gbp(r.profit, true)], kind: "total" },
            ]}
          />
          {v.fee > 0 && (
            <Callout title="Fees are priced in">
              A simple {target}% {v.mode} on cost would give {gbp(priceForTarget({ ...inputs, feePct: 0, ending: "none", target: target / 100 }).shelf, true)}, but the fee would then eat part of your profit. This price
              covers it.
            </Callout>
          )}
        </ResultCard>
      )}

      {v.cost > 0 && (
        <ResultCard title={`Prices at other ${v.mode}s`} sub="The same cost, priced at different targets.">
          <Compare
            head={[v.mode === "margin" ? "Margin" : "Markup", v.vatReg ? "Shelf price" : "Price"]}
            rows={ladder.map(({ t, p }) => ({
              label: `${t}% ${v.mode}`,
              value: p.possible ? gbp(p.shelf, true) : "Not possible",
              delta: p.possible ? `${gbp(p.profit, true)} profit` : undefined,
              bar: p.possible ? p.shelf / maxShelf : 0,
              current: t === target,
            }))}
          />
        </ResultCard>
      )}

      {r.possible && (
        <ResultCard title="Worth knowing" sub="Before you put the price on the shelf.">
          <Callout tone="warn" title={v.mode === "margin" ? `Adding ${target}% to the cost is not a ${target}% margin` : `A ${target}% markup is only a ${pct(other)} margin`}>
            {v.mode === "margin"
              ? `Cost plus ${target}% would be ${gbp(v.cost * (1 + target / 100), true)}, a margin of ${pct(marginFromMarkup(target / 100))}. To get a ${target}% margin you divide the cost by ${(1 - target / 100).toFixed(2)} instead.`
              : `If your accountant or lender talks in margin, they will see ${pct(other)}, not ${target}%.`}
          </Callout>
          {v.ending !== "none" && (
            <Callout tone="good" title="Rounding up adds a little profit">
              Rounding to {gbp(r.shelf, true)} lifts your margin to {pct(r.marginPct)}.
            </Callout>
          )}
          {!v.vatReg && (
            <Callout title="Not VAT-registered?">
              You must register once taxable sales pass £90,000 in any 12 months. After that you add VAT on top, so a price that works now may need a rethink.
            </Callout>
          )}
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        A pricing guide, not financial advice. Check competitors&apos; prices too.
      </p>
    </Studio>
  );
}
