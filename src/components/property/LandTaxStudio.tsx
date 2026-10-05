"use client";

import { lbtt, LBTT_ADS_RATE, ltt, type RegionalResult } from "@/lib/tax/regional-stamp-duty";
import { stampDuty } from "@/lib/tax/sdlt-2025";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Buyer = "standard" | "first-time" | "additional";
type Nation = "scotland" | "wales";

const SCHEMA = {
  price: num(280_000, 0, 50_000_000),
  buyer: oneOf<Buyer>("standard", ["standard", "first-time", "additional"]),
  fittings: num(0, 0, 1_000_000),
  replacing: bool(false),
};
const ADVANCED = ["fittings", "replacing"] as const;
const COLORS = { standard: "#5b1e6e", firstTime: "#0f9f6e", additional: "#f59e0b" };

const NATION = {
  scotland: {
    tax: "LBTT",
    long: "Land and Buildings Transaction Tax",
    authority: "Revenue Scotland",
    refundWindow: "36 months",
    surchargeName: "Additional Dwelling Supplement",
    thresholds: { standard: [145_000, 250_000, 325_000, 750_000], "first-time": [175_000, 250_000, 325_000, 750_000], additional: [145_000, 250_000, 325_000, 750_000] },
  },
  wales: {
    tax: "LTT",
    long: "Land Transaction Tax",
    authority: "the Welsh Revenue Authority",
    refundWindow: "3 years",
    surchargeName: "higher residential rates",
    thresholds: { standard: [225_000, 400_000, 750_000, 1_500_000], "first-time": [225_000, 400_000, 750_000, 1_500_000], additional: [180_000, 250_000, 400_000, 750_000, 1_500_000] },
  },
} as const;

function taxFor(nation: Nation, price: number, buyer: Buyer): RegionalResult {
  return nation === "scotland" ? lbtt(price, buyer) : ltt(price, buyer === "additional");
}

export default function LandTaxStudio({ nation, query }: { nation: Nation; query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const n = NATION[nation];
  // Wales has no first-time buyer relief.
  const buyer: Buyer = nation === "wales" && v.buyer === "first-time" ? "standard" : v.buyer;
  const chargeable = Math.max(0, v.price - Math.min(v.fittings, v.price));
  const r = taxFor(nation, chargeable, buyer);
  const plain = taxFor(nation, v.price, buyer).total;
  const fittingsSaving = plain - r.total;
  const mover = taxFor(nation, chargeable, "standard").total;
  const surcharge = buyer === "additional" ? Math.max(0, r.total - mover) : 0;
  const ftbSaving = buyer === "first-time" ? Math.max(0, mover - r.total) : 0;

  // Just over a threshold?
  const below = n.thresholds[buyer].filter((t) => t < chargeable);
  const edge = below[below.length - 1];
  const near =
    edge !== undefined && chargeable - edge <= chargeable * 0.05 && buyer !== "additional"
      ? { threshold: edge, over: chargeable - edge, saving: r.total - taxFor(nation, edge, buyer).total }
      : null;

  const buyers: { value: Buyer; label: string; long: string; note: string }[] = [
    { value: "standard", label: "Moving home", long: "home mover", note: "Buying your only or main home, having owned one before." },
    ...(nation === "scotland"
      ? [{ value: "first-time" as Buyer, label: "First-time", long: "first-time buyer", note: "Every buyer has never owned a home anywhere. The 0% band runs to £175,000." }]
      : []),
    {
      value: "additional",
      label: "2nd home",
      long: "second home or buy-to-let buyer",
      note:
        nation === "scotland"
          ? `You will own more than one home. The ${percent(LBTT_ADS_RATE)} Additional Dwelling Supplement applies to the whole price from £40,000.`
          : "You will own more than one home. Higher rates apply to the whole price from £40,000.",
    },
  ];
  const b = buyers.find((x) => x.value === buyer) ?? buyers[0];

  const byBuyer = buyers.map((x) => ({ ...x, total: taxFor(nation, chargeable, x.value).total }));
  const maxByBuyer = Math.max(...byBuyer.map((x) => x.total), 1);
  const ukBuyer = buyer;
  const nations = [
    { name: "Scotland", tax: "LBTT", total: lbtt(chargeable, ukBuyer).total, current: nation === "scotland" },
    { name: "Wales", tax: "LTT", total: ltt(chargeable, ukBuyer === "additional").total, current: nation === "wales" },
    { name: "England & NI", tax: "Stamp Duty", total: stampDuty(chargeable, ukBuyer).total, current: false },
  ].sort((a, b2) => Number(b2.current) - Number(a.current));
  const maxNation = Math.max(...nations.map((x) => x.total), 1);

  const top = Math.max(1_000_000, Math.ceil((chargeable * 2) / 100_000) * 100_000);
  const steps = 40;
  const curve = Array.from({ length: steps + 1 }, (_, i) => {
    const p = (top * i) / steps;
    return { price: p, standard: taxFor(nation, p, "standard").total, firstTime: taxFor(nation, p, "first-time").total, additional: taxFor(nation, p, "additional").total };
  });

  return (
    <Studio
      title="Your purchase"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={`Calculate my ${n.tax}`}
      onReset={st.reset}
      dock={{ label: n.tax, value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="The property">
            <MoneyField
              label="Purchase price"
              value={v.price}
              onChange={st.bind("price")}
              max={50_000_000}
              big
              slider={{ min: 0, max: 2_000_000, step: 5_000, ends: ["£0", "£2m"] }}
              hint={`Residential property in ${nation === "scotland" ? "Scotland" : "Wales"}.`}
            />
            <Segmented label="You are buying as a" value={buyer} onChange={st.bind("buyer")} options={buyers.map((x) => ({ value: x.value, label: x.label, note: x.note }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField
              label="Furniture and fittings in the price"
              value={v.fittings}
              onChange={st.bind("fittings")}
              optional
              hint="Items you could take away, such as curtains, white goods or furniture, at a fair value. They are not taxed."
            />
            {buyer === "additional" && (
              <Switch
                label="This replaces your main home"
                checked={v.replacing}
                onChange={st.bind("replacing")}
                optional
                hint={`If you sell your previous main home within ${n.refundWindow}, you can claim the extra tax back.`}
              />
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your ${n.tax}`}
        value={gbp(r.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.price <= 0 ? (
            <>Enter the purchase price to see your {n.tax}.</>
          ) : r.total <= 0 ? (
            <>
              Buying for <b>{gbp(v.price)}</b> as a {b.long}, you pay <b>no {n.tax}</b>.
            </>
          ) : (
            <>
              Buying for <b>{gbp(v.price)}</b> as a {b.long}, you pay <b>{gbp(r.total)}</b> in {n.tax}, which is <b>{percent(r.total / v.price, 2)}</b> of the price.
              {buyer === "additional" && v.replacing && surcharge > 0 && (
                <>
                  {" "}
                  If you sell your old home within {n.refundWindow}, you can reclaim <b>{gbp(surcharge)}</b>.
                </>
              )}
            </>
          )
        }
        badges={[
          `${percent(v.price > 0 ? r.total / v.price : 0, 2)} effective rate`,
          ftbSaving > 0 ? `First-time relief saves ${gbp(ftbSaving)}` : surcharge > 0 ? `${gbp(surcharge)} surcharge` : b.label,
          nation === "scotland" ? "Scotland" : "Wales",
        ]}
      />

      <Facts
        items={[
          { label: n.tax, value: gbp(r.total) },
          { label: "Effective rate", value: percent(v.price > 0 ? r.total / v.price : 0, 2) },
          { label: "Price plus tax", value: gbp(v.price + r.total) },
          surcharge > 0
            ? { label: "Of which surcharge", value: gbp(surcharge), tone: "warn", note: v.replacing ? "Refundable if you sell" : undefined }
            : ftbSaving > 0
              ? { label: "Relief saves you", value: gbp(ftbSaving), tone: "good" }
              : fittingsSaving > 0
                ? { label: "Fittings save you", value: gbp(fittingsSaving), tone: "good" }
                : { label: "Return due", value: "30 days", note: "After completion" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Property", value: "Residential" },
          { label: "Where", value: nation === "scotland" ? "Scotland" : "Wales" },
          { label: "Taxed on", value: v.fittings > 0 ? `${gbp(chargeable)} (less fittings)` : "The full price" },
          { label: "Rates", value: "2026/27" },
        ]}
      />

      {chargeable > 0 && (
        <ResultCard title="How it's worked out" sub={`${n.tax} is charged in slices. Each rate applies only to the part of the price inside its band.`}>
          <Compare
            head={["Price slice", "Tax on that slice"]}
            rows={r.breakdown.map((row) => ({
              label: (
                <>
                  {row.band} <span style={{ color: "var(--muted)" }}>· {percent(row.rate, row.rate * 100 % 1 ? 1 : 0)}</span>
                </>
              ),
              value: gbp(row.tax),
              delta: `on ${gbp(row.taxableInBand)}`,
              bar: chargeable > 0 ? row.taxableInBand / chargeable : 0,
            }))}
          />
        </ResultCard>
      )}

      {v.price > 0 && (
        <ResultCard title="Worth knowing" sub="Things that could change what you pay.">
          {near && near.saving >= 1 && (
            <Callout title={`${gbp(near.over)} over the ${gbp(near.threshold)} threshold`}>
              A price of <b>{gbp(near.threshold)}</b> would cut your {n.tax} by <b>{gbp(near.saving)}</b>. Furniture and fittings sold at a fair value are not taxed.
            </Callout>
          )}
          {surcharge > 0 && (
            <Callout tone="warn" title={`The ${n.surchargeName} add ${gbp(surcharge)}`}>
              {v.replacing ? (
                <>
                  Because this replaces your main home, you can claim the {gbp(surcharge)} back from {n.authority} if you sell your previous home within {n.refundWindow} of buying this one.
                </>
              ) : (
                <>
                  If this purchase replaces your main home and you sell the old one within {n.refundWindow}, you can usually claim it back. Turn on &quot;This replaces your main
                  home&quot; under More options.
                </>
              )}
            </Callout>
          )}
          {ftbSaving > 0 && (
            <Callout tone="good" title={`First-time buyer relief saves ${gbp(ftbSaving)}`}>
              In Scotland the 0% band rises from £145,000 to £175,000, worth up to £600. Every buyer must be a first-time buyer.
            </Callout>
          )}
          {nation === "wales" && v.buyer === "first-time" && (
            <Callout title="No first-time buyer relief in Wales">
              Wales has no separate first-time buyer rates. Instead the 0% band covers the first £225,000 for everyone buying their only home.
            </Callout>
          )}
          {r.total <= 0 && (
            <Callout tone="good" title={`No ${n.tax} to pay`}>
              Your solicitor may still need to file a return with {n.authority}.
            </Callout>
          )}
          <Callout title="File and pay within 30 days">
            Your solicitor files the {n.tax} return and pays {n.authority} within 30 days of completion, usually from funds you provide on the day.
          </Callout>
        </ResultCard>
      )}

      {v.price > 0 && (
        <ResultCard title="If you were buying differently" sub="The same price for each type of buyer.">
          <Compare
            head={["Buyer", n.tax]}
            rows={byBuyer.map((x) => ({
              label: x.value === "additional" ? "Second home or buy-to-let" : x.value === "first-time" ? "First-time buyer" : "Moving home",
              value: gbp(x.total),
              delta: x.value === buyer ? undefined : `${x.total >= r.total ? "+" : "−"}${gbp(Math.abs(x.total - r.total))}`,
              deltaTone: x.total > r.total ? "up" : "down",
              bar: x.total / maxByBuyer,
              current: x.value === buyer,
            }))}
          />
        </ResultCard>
      )}

      {v.price > 0 && (
        <ResultCard title="The same home elsewhere in the UK" sub="Each nation has its own property tax and bands.">
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

      <ResultCard title={`${n.tax} across prices`} sub="How the bill rises with the price for each type of buyer.">
        <AreaChart
          ariaLabel={`${n.tax} by purchase price`}
          series={[
            { key: "add", label: "Second home", color: COLORS.additional, values: curve.map((c) => c.additional) },
            { key: "std", label: "Moving home", color: COLORS.standard, values: curve.map((c) => c.standard), fill: buyer !== "additional" },
            ...(nation === "scotland" ? [{ key: "ftb", label: "First-time buyer", color: COLORS.firstTime, values: curve.map((c) => c.firstTime) }] : []),
          ]}
          xLabel={(i) => gbpShort(curve[i]?.price ?? 0)}
          yFormat={gbpShort}
          initial={Math.round((Math.min(chargeable, top) / top) * steps)}
          readout={(i) => {
            const c = curve[i];
            if (!c || c.price <= 0) return <>Drag along the chart to compare prices.</>;
            return (
              <>
                At <b>{gbp(c.price)}</b>: moving home <b>{gbp(c.standard)}</b>
                {nation === "scotland" && (
                  <>
                    , first-time buyer <b>{gbp(c.firstTime)}</b>
                  </>
                )}
                , second home <b>{gbp(c.additional)}</b>.
              </>
            );
          }}
          hint="Drag across the chart, or use the arrow keys, to compare prices."
        />
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Residential rates for 2026/27. Your solicitor will confirm the final figure with {n.authority}.
      </p>
    </Studio>
  );
}
