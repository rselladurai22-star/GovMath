"use client";

import { stampDuty } from "@/lib/tax/sdlt-2025";
import { lbtt, ltt } from "@/lib/tax/regional-stamp-duty";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  price: num(350_000, 0, 50_000_000),
  deposit: num(35_000, 0, 50_000_000),
  coOwned: bool(false),
  fittings: num(0, 0, 1_000_000),
  fees: num(2_500, 0, 100_000),
  lisa: bool(false),
};
const ADVANCED = ["coOwned", "fittings", "fees", "lisa"] as const;
const COLORS = { deposit: "#5b1e6e", tax: "#f59e0b", fees: "#2e0a3a", ftb: "#0f9f6e", mover: "#5b1e6e" };
const RELIEF_CAP = 500_000;
const LISA_CAP = 450_000;

export default function FTBStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const price = v.price;
  const chargeable = Math.max(0, price - Math.min(v.fittings, price));
  const eligible = !v.coOwned;
  const buyer = eligible ? "first-time" : "standard";
  const r = stampDuty(chargeable, buyer);
  const mover = stampDuty(chargeable, "standard").total;
  const lostToCap = eligible && chargeable > RELIEF_CAP;
  const relief = eligible ? Math.max(0, mover - r.total) : 0;
  const deposit = Math.min(v.deposit, price);
  const loan = Math.max(0, price - deposit);
  const ltv = price > 0 ? loan / price : 0;
  const cash = deposit + r.total + v.fees;
  const atCap = stampDuty(RELIEF_CAP, "first-time").total;
  const nearCap = eligible && chargeable > RELIEF_CAP && chargeable - RELIEF_CAP <= 50_000;
  const near300 = eligible && chargeable > 300_000 && chargeable <= 320_000;

  const nations = [
    { name: "England & NI", tax: "Stamp Duty", total: r.total, current: true },
    { name: "Scotland", tax: "LBTT", total: lbtt(chargeable, eligible ? "first-time" : "standard").total, current: false },
    { name: "Wales", tax: "LTT", total: ltt(chargeable).total, current: false },
  ];
  const maxNation = Math.max(...nations.map((x) => x.total), 1);

  const top = 1_000_000;
  const steps = 50;
  const curve = Array.from({ length: steps + 1 }, (_, i) => {
    const p = (top * i) / steps;
    return { price: p, ftb: stampDuty(p, "first-time").total, mover: stampDuty(p, "standard").total };
  });

  return (
    <Studio
      title="Your first home"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my Stamp Duty"
      onReset={st.reset}
      dock={{ label: "Stamp Duty", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="The purchase">
            <MoneyField
              label="Purchase price"
              value={v.price}
              onChange={st.bind("price")}
              big
              slider={{ min: 50_000, max: 800_000, step: 5_000, ends: ["£50k", "£800k"] }}
              hint="England or Northern Ireland. Relief applies up to £500,000."
            />
            <MoneyField label="Your deposit" value={v.deposit} onChange={st.bind("deposit")} slider={{ min: 0, max: 200_000, step: 1_000, ends: ["£0", "£200k"] }} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch
              label="A joint buyer has owned a home before"
              checked={v.coOwned}
              onChange={st.bind("coOwned")}
              optional
              hint="Relief only applies if every buyer is a first-time buyer."
            />
            <MoneyField label="Furniture and fittings in the price" value={v.fittings} onChange={st.bind("fittings")} optional hint="Movable items at a fair value are not taxed." />
            <MoneyField label="Legal, survey and mortgage fees" value={v.fees} onChange={st.bind("fees")} optional hint="A typical total is £2,000 to £3,500." />
            <Switch label="Using a Lifetime ISA" checked={v.lisa} onChange={st.bind("lisa")} optional hint="The bonus can only go towards a first home costing £450,000 or less." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={eligible ? "Your Stamp Duty as a first-time buyer" : "Your Stamp Duty"}
        value={gbp(r.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          price <= 0 ? (
            <>Enter the price to see your Stamp Duty.</>
          ) : !eligible ? (
            <>
              Because a joint buyer has owned a home before, first-time buyer relief does not apply. You pay the standard <b>{gbp(r.total)}</b>.
            </>
          ) : lostToCap ? (
            <>
              At <b>{gbp(price)}</b> the price is over £500,000, so relief is lost on the whole price. You pay <b>{gbp(r.total)}</b>, the same as a home mover.
            </>
          ) : r.total <= 0 ? (
            <>
              At <b>{gbp(price)}</b> you pay <b>no Stamp Duty</b>. A home mover would pay <b>{gbp(mover)}</b>.
            </>
          ) : (
            <>
              At <b>{gbp(price)}</b> you pay <b>{gbp(r.total)}</b>: 5% on the part above £300,000. Relief saves you <b>{gbp(relief)}</b> compared with a home mover.
            </>
          )
        }
        badges={[
          relief > 0 ? `Relief saves ${gbp(relief)}` : lostToCap ? "Over the £500k limit" : "No relief",
          `${percent(ltv)} loan to value`,
          `${gbp(cash)} cash needed`,
        ]}
      />

      <Facts
        items={[
          { label: "Stamp Duty", value: gbp(r.total) },
          { label: "Relief saves", value: gbp(relief), tone: relief > 0 ? "good" : undefined },
          { label: "Mortgage needed", value: gbp(loan), note: `${percent(ltv)} of the price` },
          { label: "Cash on completion", value: gbp(cash), note: "Deposit, tax and fees" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: "England or Northern Ireland" },
          { label: "Buyers", value: eligible ? "All first-time buyers" : "Not all first-time" },
          { label: "Use", value: "Your only or main home" },
          { label: "Residence", value: "UK resident" },
        ]}
      />

      {price > 0 && (
        <ResultCard title="Cash you need on completion day" sub="Your deposit, Stamp Duty and fees, before moving costs.">
          <SplitBar
            segments={[
              { label: "Deposit", value: deposit, display: gbp(deposit), color: COLORS.deposit },
              ...(r.total > 0 ? [{ label: "Stamp Duty", value: r.total, display: gbp(r.total), color: COLORS.tax }] : []),
              ...(v.fees > 0 ? [{ label: "Fees", value: v.fees, display: gbp(v.fees), color: COLORS.fees }] : []),
            ]}
            caption={
              <>
                Total <b>{gbp(cash)}</b>. Lenders usually want at least a 5% deposit; better rates start at 10%, 15% and 25%.
              </>
            }
          />
        </ResultCard>
      )}

      {price > 0 && (
        <ResultCard title="Worth knowing" sub="What could change your bill.">
          {nearCap && (
            <Callout tone="warn" title={`${gbp(chargeable - RELIEF_CAP)} over the £500,000 limit`}>
              At £500,000 you would pay <b>{gbp(atCap)}</b> instead of <b>{gbp(r.total)}</b>, a difference of <b>{gbp(r.total - atCap)}</b>. Genuine furniture and fittings at
              a fair value can reduce the taxable price.
            </Callout>
          )}
          {near300 && (
            <Callout title="Just over £300,000">
              Every pound above £300,000 is taxed at 5%. Agreeing £300,000 would save <b>{gbp(r.total)}</b>.
            </Callout>
          )}
          {!eligible && (
            <Callout tone="warn" title="Relief needs every buyer to qualify">
              If you bought alone, you would qualify. A home mover pays the standard rates on joint purchases where anyone has owned before.
            </Callout>
          )}
          {v.lisa && price > LISA_CAP && (
            <Callout tone="warn" title="Over the Lifetime ISA limit">
              The Lifetime ISA bonus can only be used for a first home costing £450,000 or less. Withdrawing for this purchase would trigger a 25% charge.
            </Callout>
          )}
          {v.lisa && price <= LISA_CAP && (
            <Callout tone="good" title="Lifetime ISA can be used">
              Your conveyancer requests the money from your ISA provider. The account must have been open for at least 12 months.
            </Callout>
          )}
          {relief > 0 && (
            <Callout tone="good" title={`Relief saves ${gbp(relief)}`}>
              A home mover would pay <b>{gbp(mover)}</b>. Your solicitor claims the relief on the Stamp Duty return.
            </Callout>
          )}
          {r.total <= 0 && eligible && (
            <Callout tone="good" title="Nothing to pay">
              Your solicitor still files a return with HMRC, but no tax is due.
            </Callout>
          )}
        </ResultCard>
      )}

      {price > 0 && (
        <ResultCard title="A first-time buyer elsewhere in the UK" sub="Scotland and Wales have their own rules.">
          <Compare
            head={["Where", "Tax"]}
            rows={nations.map((x) => ({
              label: (
                <>
                  {x.name} <span style={{ color: "var(--muted)" }}>· {x.tax}</span>
                </>
              ),
              value: gbp(x.total),
              delta: x.current ? undefined : `${x.total >= r.total ? "+" : "−"}${gbp(Math.abs(x.total - r.total))}`,
              deltaTone: x.total > r.total ? "up" : "down",
              bar: x.total / maxNation,
              current: x.current,
            }))}
          />
        </ResultCard>
      )}

      <ResultCard title="The £500,000 cliff edge" sub="First-time buyer Stamp Duty against a home mover's, by price.">
        <AreaChart
          ariaLabel="Stamp Duty for first-time buyers and home movers by price"
          series={[
            { key: "mover", label: "Home mover", color: COLORS.mover, values: curve.map((c) => c.mover), dashed: true },
            { key: "ftb", label: "First-time buyer", color: COLORS.ftb, values: curve.map((c) => c.ftb), fill: true },
          ]}
          xLabel={(i) => gbpShort(curve[i]?.price ?? 0)}
          yFormat={gbpShort}
          initial={Math.round((Math.min(chargeable, top) / top) * steps)}
          readout={(i) => {
            const c = curve[i];
            if (!c || c.price <= 0) return <>Drag along the chart to compare prices.</>;
            return (
              <>
                At <b>{gbp(c.price)}</b>: first-time buyer <b>{gbp(c.ftb)}</b>, home mover <b>{gbp(c.mover)}</b>.
              </>
            );
          }}
          hint="Drag across the chart, or use the arrow keys, to compare prices."
        />
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Rates from 1 April 2025, unchanged for 2026/27. Your conveyancer confirms the final figure on your return to HMRC.
      </p>
    </Studio>
  );
}
