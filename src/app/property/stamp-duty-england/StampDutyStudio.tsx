"use client";

import { useEffect, useState } from "react";
import { stampDuty, type BuyerType } from "@/lib/tax/sdlt-2025";
import { acrossNations, additionalSurcharge, nearThreshold, sdltCurve } from "@/lib/tax/stamp-duty-insights";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { InputGroup, MoneyField, Segmented } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import s from "@/components/flagship/Flagship.module.css";

const BUYERS: { value: BuyerType; label: string; long: string; note: string }[] = [
  { value: "standard", label: "Moving home", long: "home mover", note: "Replacing your main home, or buying one after previously owning a home." },
  { value: "first-time", label: "First-time", long: "first-time buyer", note: "Every buyer has never owned a home, anywhere in the world. Relief applies up to £500,000." },
  { value: "additional", label: "2nd home", long: "second home or buy-to-let", note: "Second home or buy-to-let: you'll own more than one home after buying. A 5% surcharge applies to the whole price." },
];
const COLORS = { standard: "#5b1e6e", firstTime: "#0f9f6e", additional: "#f59e0b" };
const DEFAULTS = { price: 295_000, buyer: "standard" as BuyerType };

export default function StampDutyStudio({
  initialPrice,
  initialBuyer,
  showResults,
}: {
  initialPrice: number;
  initialBuyer: BuyerType;
  showResults: boolean;
}) {
  const [price, setPrice] = useState(initialPrice);
  const [buyer, setBuyer] = useState<BuyerType>(initialBuyer);
  const [ready, setReady] = useState(showResults);
  const [copied, setCopied] = useState(false);

  const r = stampDuty(price, buyer);
  const b = BUYERS.find((x) => x.value === buyer)!;
  const lostRelief = buyer === "first-time" && r.appliedScheme === "standard" && price > 0;
  const moverTax = buyer === "first-time" && !lostRelief ? stampDuty(price, "standard").total : 0;
  const near = nearThreshold(price, buyer);
  const surcharge = buyer === "additional" ? additionalSurcharge(price) : 0;
  const byBuyer = BUYERS.map((x) => ({ ...x, total: stampDuty(price, x.value).total }));
  const maxByBuyer = Math.max(...byBuyer.map((x) => x.total), 1);
  const nations = acrossNations(price, buyer);
  const maxNation = Math.max(...nations.map((n) => n.total), 1);

  const top = Math.max(1_000_000, Math.ceil((price * 2) / 100_000) * 100_000);
  const steps = 40;
  const curve = sdltCurve(top, steps);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      const q = new URLSearchParams({ price: String(price) });
      if (buyer !== "standard") q.set("buyer", buyer);
      window.history.replaceState(null, "", `${window.location.pathname}?${q}`);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, price, buyer]);

  const reset = () => {
    setPrice(DEFAULTS.price);
    setBuyer(DEFAULTS.buyer);
    setReady(false);
    window.history.replaceState(null, "", window.location.pathname);
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the URL is still in the address bar */
    }
  };

  return (
    <Studio
      title="Your purchase"
      ready={ready}
      onCalculate={() => setReady(true)}
      calculateLabel="Calculate my Stamp Duty"
      onReset={reset}
      dock={{ label: "Stamp Duty", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="The property">
            <MoneyField
              label="Purchase price"
              value={price}
              onChange={setPrice}
              max={50_000_000}
              big
              slider={{ min: 0, max: 2_000_000, step: 5_000, ends: ["£0", "£2m"] }}
              hint="England and Northern Ireland, residential, from 1 April 2025."
            />
          </InputGroup>
          <InputGroup title="About you">
            <Segmented label="You are buying as a" value={buyer} onChange={setBuyer} options={BUYERS.map((x) => ({ value: x.value, label: x.label, note: x.note }))} />
          </InputGroup>
        </>
      }
    >
      {/* 1. The answer */}
      <Answer
        eyebrow="Your Stamp Duty"
        value={gbp(r.total)}
        actions={
          <button type="button" className={s.ghostBtn} onClick={share}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
            </svg>
            {copied ? "Link copied" : "Share"}
          </button>
        }
        sentence={
          price <= 0 ? (
            <>Enter the purchase price to see your Stamp Duty.</>
          ) : r.total <= 0 ? (
            <>
              Buying for <b>{gbp(price)}</b> as a {b.long}, you pay <b>no Stamp Duty</b>.
            </>
          ) : (
            <>
              Buying for <b>{gbp(price)}</b> as a {b.long}, you pay <b>{gbp(r.total)}</b> in Stamp Duty, which is{" "}
              <b>{percent(r.effectiveRate, 2)}</b> of the price. Your solicitor pays it to HMRC within 14 days of completion.
            </>
          )
        }
        badges={[
          `${percent(r.effectiveRate, 2)} effective rate`,
          lostRelief ? "First-time relief not available over £500k" : moverTax > r.total ? `First-time relief saves ${gbp(moverTax - r.total)}` : b.label,
          "England & Northern Ireland",
        ]}
      />

      {/* 2. Key figures */}
      <Facts
        items={[
          { label: "Stamp Duty", value: gbp(r.total) },
          { label: "Effective rate", value: percent(r.effectiveRate, 2), note: "Of the purchase price" },
          { label: "Price plus Stamp Duty", value: gbp(price + r.total) },
          buyer === "additional"
            ? { label: "Of which surcharge", value: gbp(surcharge), note: "Refundable in some cases", tone: "warn" }
            : moverTax > r.total
              ? { label: "Relief saves you", value: gbp(moverTax - r.total), note: "Versus a home mover", tone: "good" }
              : { label: "Due", value: "14 days", note: "After completion" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Property", value: "Residential, freehold" },
          { label: "Where", value: "England or Northern Ireland" },
          { label: "Completion", value: "On or after 1 April 2025" },
          { label: "Buyers", value: "UK residents" },
        ]}
        note="Buying leasehold, from abroad or in Scotland or Wales? The guide below explains what changes."
      />

      {/* 3. Band by band */}
      {price > 0 && (
        <ResultCard
          title="How it's worked out"
          sub="Stamp Duty is charged in slices. Each rate applies only to the part of the price inside its band."
        >
          <Compare
            head={["Price slice", "Tax on that slice"]}
            rows={r.breakdown.map((row) => ({
              label: (
                <>
                  {row.band} <span style={{ color: "var(--muted)" }}>· {percent(row.rate)}</span>
                </>
              ),
              value: gbp(row.tax),
              delta: `on ${gbp(row.taxableInBand)}`,
              bar: price > 0 ? row.taxableInBand / price : 0,
            }))}
          />
        </ResultCard>
      )}

      {/* 4. Tips */}
      {price > 0 && (
        <ResultCard title="Worth knowing" sub="Things that could change what you pay.">
          {lostRelief && (
            <Callout tone="warn" title="First-time buyer relief stops at £500,000">
              Above £500,000 first-time buyers pay the same as home movers on the whole price. At exactly £500,000 you&apos;d pay{" "}
              <b>{gbp(stampDuty(500_000, "first-time").total)}</b>.
            </Callout>
          )}
          {near && (
            <Callout title={`${gbp(near.over)} over the ${gbp(near.threshold)} threshold`}>
              Agreeing a price of <b>{gbp(near.threshold)}</b> would cut your Stamp Duty by <b>{gbp(near.saving)}</b>. Genuine furniture and fittings
              bought separately at a fair value don&apos;t count towards the price.
            </Callout>
          )}
          {buyer === "additional" && surcharge > 0 && (
            <Callout title={`The second-home surcharge adds ${gbp(surcharge)}`}>
              If this replaces your main home and you sell the old one within 3 years, you can usually claim the surcharge back from HMRC.
            </Callout>
          )}
          {moverTax > r.total && (
            <Callout tone="good" title={`First-time buyer relief saves you ${gbp(moverTax - r.total)}`}>
              A home mover would pay <b>{gbp(moverTax)}</b> on the same price. Relief only applies if <b>every</b> buyer is a first-time buyer.
            </Callout>
          )}
          {r.total <= 0 && (
            <Callout tone="good" title="No Stamp Duty to pay">
              Your solicitor will usually still file a return with HMRC, but there&apos;s nothing to pay.
            </Callout>
          )}
          {!lostRelief && !near && surcharge <= 0 && moverTax <= r.total && r.total > 0 && (
            <Callout title="Budget for it on completion day">
              Stamp Duty is usually paid from your own funds at completion. Plan to have <b>{gbp(r.total)}</b> ready alongside your deposit and
              fees.
            </Callout>
          )}
        </ResultCard>
      )}

      {/* 5. By buyer type */}
      {price > 0 && (
        <ResultCard title="If you were buying differently" sub="The same price for each type of buyer.">
          <Compare
            head={["Buyer", "Stamp Duty"]}
            rows={byBuyer.map((x) => ({
              label: x.label === "2nd home" ? "Second home or buy-to-let" : x.label === "First-time" ? "First-time buyer" : x.label,
              value: gbp(x.total),
              delta: x.value === buyer ? undefined : `${x.total >= r.total ? "+" : "−"}${gbp(Math.abs(x.total - r.total))}`,
              deltaTone: x.total > r.total ? "up" : "down",
              bar: x.total / maxByBuyer,
              current: x.value === buyer,
            }))}
          />
        </ResultCard>
      )}

      {/* 6. Across the UK */}
      {price > 0 && (
        <ResultCard title="The same home elsewhere in the UK" sub="Scotland and Wales have their own property taxes with different bands.">
          <Compare
            head={["Where", "Tax"]}
            rows={nations.map((n, i) => ({
              label: (
                <>
                  {n.nation} <span style={{ color: "var(--muted)" }}>· {n.tax}</span>
                </>
              ),
              value: gbp(n.total),
              delta: i === 0 ? undefined : `${n.total >= r.total ? "+" : "−"}${gbp(Math.abs(n.total - r.total))}`,
              deltaTone: n.total > r.total ? "up" : "down",
              bar: n.total / maxNation,
              current: i === 0,
            }))}
          />
        </ResultCard>
      )}

      {/* 7. Across prices */}
      <ResultCard title="Stamp Duty across prices" sub="How the bill rises with the price for each type of buyer.">
        <AreaChart
          ariaLabel="Stamp Duty by purchase price"
          series={[
            { key: "add", label: "Second home", color: COLORS.additional, values: curve.map((c) => c.additional) },
            { key: "std", label: "Moving home", color: COLORS.standard, values: curve.map((c) => c.standard), fill: buyer === "standard" },
            { key: "ftb", label: "First-time buyer", color: COLORS.firstTime, values: curve.map((c) => c.firstTime), fill: buyer === "first-time" },
          ]}
          xLabel={(i) => gbpShort(curve[i]?.price ?? 0)}
          yFormat={gbpShort}
          initial={Math.round((Math.min(price, top) / top) * steps)}
          readout={(i) => {
            const c = curve[i];
            if (!c || c.price <= 0) return <>Drag along the chart to compare prices.</>;
            return (
              <>
                At <b>{gbp(c.price)}</b>: moving home <b>{gbp(c.standard)}</b>, first-time buyer <b>{gbp(c.firstTime)}</b>, second home{" "}
                <b>{gbp(c.additional)}</b>.
              </>
            );
          }}
          hint="Drag across the chart, or use the arrow keys, to compare prices."
        />
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Residential freehold purchases in England and Northern Ireland completing from 1 April 2025. Your conveyancer will confirm the final figure.
      </p>
    </Studio>
  );
}
