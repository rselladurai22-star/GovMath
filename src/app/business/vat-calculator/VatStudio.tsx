"use client";

import { addVat, removeVat, VAT_RATES, type VatRateKey } from "@/lib/tax/vat";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Direction = "add" | "remove";

const RATES: { value: VatRateKey; label: string; note: string; fraction: string }[] = [
  { value: "standard", label: "20% standard", note: "Most goods and services.", fraction: "1/6" },
  { value: "reduced", label: "5% reduced", note: "Home energy, children's car seats, some home improvements.", fraction: "1/21" },
  { value: "zero", label: "0% zero", note: "Most food, books, children's clothes, public transport.", fraction: "none" },
];
const COLORS = { net: "#5b1e6e", vat: "#f59e0b" };

/** Round to whole pence once, keeping net + VAT = gross exactly. */
function toPence(v: { net: number; vat: number; gross: number }, direction: Direction) {
  const p = (n: number) => Math.round(n * 100) / 100;
  if (direction === "add") {
    const net = p(v.net);
    const vat = p(v.vat);
    return { net, vat, gross: p(net + vat) };
  }
  const gross = p(v.gross);
  const net = p(v.net);
  return { net, vat: p(gross - net), gross };
}

const SCHEMA = {
  amount: num(100, 0, 100_000_000),
  direction: oneOf<Direction>("add", ["add", "remove"]),
  rate: oneOf<VatRateKey>("standard", ["standard", "reduced", "zero"]),
  qty: num(1, 1, 100_000),
  flat: num(14.5, 0, 20),
  turnover: num(0, 0, 100_000_000),
};
const ADVANCED = ["qty", "flat", "turnover"] as const;
const THRESHOLD = 90_000;

export default function VatStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const { amount: each, direction, rate: rateKey, qty, flat, turnover } = st.values;
  const amount = each * qty;

  const rate = VAT_RATES[rateKey];
  const meta = RATES.find((r) => r.value === rateKey)!;
  const r = toPence(direction === "add" ? addVat(amount, rate) : removeVat(amount, rate), direction);
  const answer = direction === "add" ? r.gross : r.net;
  const pct = `${Math.round(rate * 100)}%`;
  const atEach = RATES.map((x) => {
    const v = toPence(direction === "add" ? addVat(amount, VAT_RATES[x.value]) : removeVat(amount, VAT_RATES[x.value]), direction);
    return { ...x, result: direction === "add" ? v.gross : v.net, vat: v.vat };
  });
  const maxEach = Math.max(...atEach.map((x) => x.result), 1);
  // Flat Rate Scheme on these sales: a flat % of the VAT-inclusive total
  // versus the VAT actually charged.
  const flatVat = Math.round(r.gross * flat) / 100;
  const frs = {
    standardSchemeVat: r.vat,
    flatSchemeVat: flatVat,
    difference: r.vat - flatVat,
    betterScheme: Math.abs(r.vat - flatVat) < 0.005 ? "tie" : r.vat > flatVat ? "flat" : "standard",
  };
  const unit = qty > 1 ? toPence(direction === "add" ? addVat(each, rate) : removeVat(each, rate), direction) : null;
  const overThreshold = turnover > THRESHOLD;

  return (
    <Studio
      title="Your amount"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate VAT"
      onReset={st.reset}
      dock={{ label: direction === "add" ? "Including VAT" : "Before VAT", value: gbp(answer, true) }}
      inputs={
        <>
          <InputGroup title="The amount">
            <Segmented
              label="What do you want to do?"
              value={direction}
              onChange={st.bind("direction")}
              options={[
                { value: "add", label: "Add VAT", note: "You have a price before VAT and want the total." },
                { value: "remove", label: "Remove VAT", note: "You have a price that includes VAT and want to take it out." },
              ]}
            />
            <MoneyField
              label={direction === "add" ? "Price before VAT" : "Price including VAT"}
              value={each}
              onChange={st.bind("amount")}
              big
              pence
            />
          </InputGroup>
          <InputGroup title="VAT rate">
            <Segmented
              label="Which rate applies?"
              value={rateKey}
              onChange={st.bind("rate")}
              options={RATES.map((x) => ({ value: x.value, label: x.label.split(" ")[0], note: `${x.label}: ${x.note}` }))}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Quantity" value={qty} onChange={(n) => st.set("qty", Math.max(1, Math.round(n)))} step={1} min={1} max={100_000} unit="items" dp={0} optional hint="For several of the same item. VAT is worked out on the total, as on an invoice." />
            <StepperField
              label="Your Flat Rate Scheme percentage"
              value={flat}
              onChange={st.bind("flat")}
              step={0.5}
              min={0}
              max={20}
              unit="%"
              dp={1}
              optional
              hint="Only if you use the Flat Rate Scheme. Your rate depends on your trade; 16.5% if you're a limited cost trader."
            />
            <MoneyField label="Your taxable sales in the last 12 months" value={turnover} onChange={st.bind("turnover")} optional hint="To check against the £90,000 registration threshold." />
          </AdvancedOptions>
        </>
      }
    >
      {/* 1. The answer */}
      <Answer
        eyebrow={direction === "add" ? "Price including VAT" : "Price before VAT"}
        value={gbp(answer, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          rate === 0 ? (
            <>
              Zero-rated items carry no VAT, so <b>{gbp(amount, true)}</b> is the same before and after VAT.
            </>
          ) : direction === "add" ? (
            <>
              Adding {pct} VAT to <b>{gbp(r.net, true)}</b> gives <b>{gbp(r.gross, true)}</b>. The VAT is <b>{gbp(r.vat, true)}</b>.
            </>
          ) : (
            <>
              <b>{gbp(r.gross, true)}</b> including {pct} VAT is <b>{gbp(r.net, true)}</b> before VAT. The VAT inside it is <b>{gbp(r.vat, true)}</b>.
            </>
          )
        }
        badges={[`${pct} VAT rate`, ...(qty > 1 ? [`${qty} items`] : []), ...(rate > 0 ? [`VAT is ${meta.fraction} of the VAT-inclusive price`] : []), "UK rates"]}
      />

      {/* 2. Key figures */}
      <Facts
        items={[
          { label: "Before VAT", value: gbp(r.net, true) },
          { label: `VAT at ${pct}`, value: gbp(r.vat, true) },
          { label: "Including VAT", value: gbp(r.gross, true) },
          { label: "To remove VAT", value: rate > 0 ? `÷ ${(1 + rate).toFixed(2)}` : "Nothing to remove", note: rate > 0 ? `To add it, × ${(1 + rate).toFixed(2)}` : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "VAT rate", value: `${pct} (${meta.label.split(" ")[1]})` },
          { label: "Rounding", value: qty > 1 ? "On the invoice total, to the nearest penny" : "To the nearest penny" },
          { label: "Quantity", value: qty > 1 ? `${qty} items at ${gbp(each, true)}` : "One item" },
          { label: "Flat rate (for comparison)", value: `${flat}%` },
        ]}
        note="Check the rate for your goods or services on GOV.UK if you're not sure which applies."
      />

      {unit && (
        <ResultCard title={`${qty} items`} sub="Each item and the invoice total.">
          <Statement
            columns={["Each", `× ${qty}`]}
            rows={[
              { label: "Before VAT", values: [gbp(unit.net, true), gbp(r.net, true)] },
              { label: `VAT at ${pct}`, values: [gbp(unit.vat, true), gbp(r.vat, true)] },
              { label: "Including VAT", values: [gbp(unit.gross, true), gbp(r.gross, true)], kind: "total" },
            ]}
          />
          {Math.abs(unit.vat * qty - r.vat) >= 0.005 && (
            <p className={s.hint} style={{ marginTop: "0.9rem" }}>
              Rounding each item&apos;s VAT gives {gbp(unit.vat * qty, true)} instead. HMRC accepts either method if you use it consistently.
            </p>
          )}
        </ResultCard>
      )}

      {/* 3. Split */}
      {r.gross > 0 && rate > 0 && (
        <ResultCard title="What the customer pays" sub="The VAT-inclusive price, split into your money and HMRC's.">
          <SplitBar
            segments={[
              { label: "Before VAT (yours)", value: r.net, display: gbp(r.net, true), color: COLORS.net },
              { label: "VAT (to HMRC)", value: r.vat, display: gbp(r.vat, true), color: COLORS.vat },
            ]}
            caption={
              <>
                At {pct}, VAT is <b>{meta.fraction}</b> of any price that includes VAT, not {pct} of it.
              </>
            }
          />
        </ResultCard>
      )}

      {/* 4. Tips */}
      {amount > 0 && (
        <ResultCard title="Worth knowing" sub="The mistakes people make most often with VAT.">
          {direction === "remove" && rate > 0 && (
            <Callout tone="warn" title={`Don't just take ${pct} off`}>
              {pct} off <b>{gbp(r.gross, true)}</b> is <b>{gbp(r.gross * (1 - rate), true)}</b>, which is wrong. Divide by{" "}
              <b>{(1 + rate).toFixed(2)}</b> instead to get <b>{gbp(r.net, true)}</b>.
            </Callout>
          )}
          {rateKey === "zero" && (
            <Callout title="Zero-rated isn't the same as exempt">
              Zero-rated sales still count towards the £90,000 registration threshold, and you can reclaim VAT on related costs. Exempt sales (such as
              most insurance) do neither.
            </Callout>
          )}
          {turnover > 0 && (
            <Callout tone={overThreshold ? "warn" : "good"} title={overThreshold ? "You are over the registration threshold" : `${gbp(THRESHOLD - turnover)} below the threshold`}>
              {overThreshold
                ? "Taxable sales of more than £90,000 in a rolling 12 months mean you must register within 30 days of the end of the month you went over."
                : "Keep checking every month. The test is any rolling 12 months, not your tax year."}
            </Callout>
          )}
          <Callout title="You must register once sales pass £90,000">
            The VAT registration threshold is <b>£90,000</b> of taxable sales in any rolling 12 months, not per tax year. Check it every month.
          </Callout>
        </ResultCard>
      )}

      {/* 5. Each rate */}
      {amount > 0 && (
        <ResultCard title="At each UK VAT rate" sub={direction === "add" ? "The same price before VAT, with each rate added." : "The same VAT-inclusive price, with each rate taken out."}>
          <Compare
            head={["VAT rate", direction === "add" ? "Including VAT" : "Before VAT"]}
            rows={atEach.map((x) => ({
              label: x.label,
              value: gbp(x.result, true),
              delta: `VAT ${gbp(x.vat, true)}`,
              bar: x.result / maxEach,
              current: x.value === rateKey,
            }))}
          />
        </ResultCard>
      )}

      {/* 6. Flat Rate Scheme */}
      {rateKey === "standard" && r.net > 0 && (
        <ResultCard
          title="Standard VAT or the Flat Rate Scheme?"
          sub={`If these were your sales (${gbp(r.gross, true)} including VAT), here's what you'd pay HMRC under each scheme.`}
        >
          <Compare
            head={["Scheme", "VAT you pay HMRC"]}
            rows={[
              { label: "Standard accounting (20% of sales)", value: gbp(frs.standardSchemeVat, true), bar: 1, current: frs.betterScheme !== "flat" },
              {
                label: `Flat Rate Scheme (${flat}% of VAT-inclusive sales)`,
                value: gbp(frs.flatSchemeVat, true),
                delta: frs.betterScheme === "tie" ? undefined : `${frs.difference > 0 ? "−" : "+"}${gbp(Math.abs(frs.difference), true)}`,
                deltaTone: frs.difference > 0 ? "down" : "up",
                bar: frs.standardSchemeVat > 0 ? frs.flatSchemeVat / Math.max(frs.standardSchemeVat, frs.flatSchemeVat) : 0,
                current: frs.betterScheme === "flat",
              },
            ]}
          />
          <p className={s.hint} style={{ marginTop: "0.9rem" }}>
            Under standard accounting you can also reclaim the VAT on your business costs, which usually isn&apos;t possible on the Flat Rate Scheme. If you
            have high costs, standard accounting often works out cheaper.
          </p>
        </ResultCard>
      )}
    </Studio>
  );
}
