"use client";

import { FRS, FRS_SECTORS, flatRateStudy } from "@/lib/business/flat-rate-vat";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const IDS = FRS_SECTORS.map((x) => x.id);

const SCHEMA = {
  sales: num(60_000, 0, 10_000_000),
  sector: oneOf<string>("it", IDS),
  costs: num(3_000, 0, 10_000_000),
  goods: num(600, 0, 10_000_000),
  first: bool(false),
  other: num(0, 0, 10_000_000),
  capital: num(0, 0, 10_000_000),
};
const ADVANCED = ["first", "other", "capital"] as const;

const rate = (n: number) => percent(n, 1);

export default function FlatRateStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const sector = FRS_SECTORS.find((x) => x.id === v.sector) ?? FRS_SECTORS[0];
  const r = flatRateStudy({ sales: v.sales, otherSales: v.other, costs: v.costs, goods: v.goods, capital: v.capital, sectorRate: sector.rate, firstYear: v.first });
  const flatWins = r.better === "flat";
  const diff = Math.abs(r.saving);
  const goodsNeeded = Math.max(r.flatTurnover * FRS.lctShare, FRS.lctFloor);
  const top = Math.max(r.standardVat, r.flatVat, 1);
  const sectorWithout = flatRateStudy({ sales: v.sales, otherSales: v.other, costs: v.costs, goods: Math.max(v.goods, goodsNeeded + 1), capital: v.capital, sectorRate: sector.rate, firstYear: v.first });

  return (
    <Studio
      title="Your business"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare VAT schemes"
      onReset={st.reset}
      dock={{ label: flatWins ? "Flat rate saves" : "Standard saves", value: gbp(diff) }}
      inputs={
        <>
          <InputGroup title="Your sales and trade">
            <MoneyField label="Sales a year before VAT" value={v.sales} onChange={st.bind("sales")} big slider={{ min: 0, max: 150_000, step: 1_000, ends: ["£0", "£150k"] }} hint="Sales you charge 20% VAT on." />
            <SelectField label="Your trade" value={v.sector} onChange={st.bind("sector")} options={FRS_SECTORS.map((x) => ({ value: x.id, label: `${x.label} (${rate(x.rate)})` }))} hint="Pick the one that best describes your main business activity." />
          </InputGroup>
          <InputGroup title="Your costs">
            <MoneyField label="Business costs with VAT a year" value={v.costs} onChange={st.bind("costs")} hint="Everything you buy that has 20% VAT on it, including the VAT. Under standard accounting you reclaim this VAT." />
            <MoneyField label="Of which, goods" value={v.goods} onChange={st.bind("goods")} hint="Physical goods used only in your business, including VAT. Not capital items, food, fuel or services. This decides the limited cost test." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="First year of VAT registration" checked={v.first} onChange={st.bind("first")} optional hint="1% off your flat rate until the day before your first anniversary of registering." />
            <MoneyField label="Zero-rated or exempt sales a year" value={v.other} onChange={st.bind("other")} optional hint="No VAT is charged on these, but the flat rate still applies to them." />
            <MoneyField label="Capital items of £2,000 or more, including VAT" value={v.capital} onChange={st.bind("capital")} optional hint="A single purchase such as a computer or machine. You can reclaim the VAT on these under either scheme." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.better === "tie" ? "Both schemes cost the same" : flatWins ? "The Flat Rate Scheme saves you" : "Standard VAT saves you"}
        value={gbp(diff)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Under standard accounting you would pay HMRC <b>{gbp(r.standardVat)}</b>. On the Flat Rate Scheme at <b>{rate(r.rateUsed)}</b> you would pay <b>{gbp(r.flatVat)}</b>.{" "}
            {r.limitedCost ? (
              <>
                Your goods spending is below the limited cost test, so the <b>16.5%</b> rate applies instead of the {rate(sector.rate)} rate for your trade.
              </>
            ) : (
              <>That is the {rate(sector.rate)} rate for your trade{v.first ? ", less the 1% first-year discount" : ""}.</>
            )}
          </>
        }
        badges={[`Flat rate ${rate(r.rateUsed)}`, r.limitedCost ? "Limited cost trader" : "Trade rate applies", r.canJoin ? "Can join the scheme" : "Over £150,000: cannot join"]}
      />

      <Facts
        items={[
          { label: "Standard VAT a year", value: gbp(r.standardVat), tone: !flatWins && r.better !== "tie" ? "good" : undefined },
          { label: "Flat rate VAT a year", value: gbp(r.flatVat), tone: flatWins ? "good" : undefined },
          { label: "VAT you keep on flat rate", value: gbp(r.flatKeep), note: "Counts as taxable income" },
          { label: "Goods for the limited cost test", value: gbp(v.goods), tone: r.limitedCost ? "warn" : "good", note: `Need at least ${gbp(goodsNeeded)}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Sales", value: "Standard-rated at 20%" },
          { label: "Trade", value: `${sector.label}, ${rate(sector.rate)}` },
          { label: "Costs", value: "All with 20% VAT" },
          { label: "Period", value: "A full year" },
        ]}
      />

      <ResultCard title="VAT you pay HMRC under each scheme" sub="For a year at these figures.">
        <Compare
          head={["Scheme", "VAT to pay"]}
          rows={[
            { label: "Standard accounting", value: gbp(r.standardVat), bar: Math.max(0, r.standardVat) / top, current: !flatWins },
            {
              label: `Flat Rate Scheme at ${rate(r.rateUsed)}`,
              value: gbp(r.flatVat),
              delta: r.better === "tie" ? undefined : `${flatWins ? "−" : "+"}${gbp(diff)}`,
              deltaTone: flatWins ? "down" : "up",
              bar: Math.max(0, r.flatVat) / top,
              current: flatWins,
            },
          ]}
        />
        <Statement
          columns={["Standard", "Flat rate"]}
          rows={[
            { label: "VAT charged to customers", values: [gbp(r.outputVat), gbp(r.outputVat)] },
            { label: "Flat rate applied to", values: ["n/a", gbp(r.flatTurnover)] },
            { label: "VAT reclaimed on costs", values: [`−${gbp(r.inputVat)}`, "£0"], kind: "deduction" },
            ...(r.capitalVat > 0 ? [{ label: "VAT reclaimed on capital items", values: [`−${gbp(r.capitalVat)}`, `−${gbp(r.capitalVat)}`], kind: "deduction" as const }] : []),
            { label: "VAT to pay HMRC", values: [gbp(r.standardVat), gbp(r.flatVat)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="The limited cost test" sub="Decides whether you can use your trade's rate or must pay 16.5%.">
        <Compare
          head={["Goods a year", "Amount"]}
          rows={[
            { label: "Your goods", value: gbp(v.goods), bar: goodsNeeded > 0 ? Math.min(1, v.goods / goodsNeeded) : 0, current: true },
            { label: `2% of your flat-rate turnover, or £1,000 if higher`, value: gbp(goodsNeeded), bar: 1 },
          ]}
        />
        <Callout tone={r.limitedCost ? "warn" : "good"} title={r.limitedCost ? "You count as a limited cost trader" : "You pass the test"}>
          {r.limitedCost
            ? `Your goods are below ${gbp(goodsNeeded)}, so you must use 16.5%. If they were above it, your ${rate(sector.rate)} trade rate would apply and you would pay ${gbp(sectorWithout.flatVat)}. Only goods count: not services, capital items, food, fuel or vehicle costs.`
            : `Your goods are above ${gbp(goodsNeeded)}, so you can use your trade's ${rate(sector.rate)} rate. Check this every VAT period: the test applies to each return, not the year as a whole.`}
        </Callout>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you switch scheme.">
        {r.costsBreakEven > 0 && (
          <Callout title={flatWins ? `Standard wins once costs pass ${gbp(r.costsBreakEven)}` : `Flat rate would only win with costs below ${gbp(r.costsBreakEven)}`}>
            At these sales and a {rate(r.rateUsed)} flat rate, the two schemes cost the same when your costs with VAT are {gbp(r.costsBreakEven)} a year.
          </Callout>
        )}
        {r.costsBreakEven <= 0 && (
          <Callout title="The flat rate costs more at any level of costs">
            At {rate(r.rateUsed)}, the flat rate VAT is more than the VAT you charge customers, so standard accounting is cheaper even with no costs at all.
          </Callout>
        )}
        {!r.canJoin && (
          <Callout tone="warn" title="Too big to join">
            You can only join if you expect taxable sales of £150,000 or less, before VAT, in the next 12 months.
          </Callout>
        )}
        {r.mustLeave && (
          <Callout tone="warn" title="You would have to leave">
            You must leave the scheme once your total income including VAT is more than £230,000 a year.
          </Callout>
        )}
        <Callout title="Simpler records, but check your margin">
          The flat rate saves working out VAT on every purchase, but the VAT you keep is taxable income. If you buy a lot, standard accounting usually works out cheaper.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        HMRC flat rates for 2026/27. Not tax advice; check your trade category with HMRC.
      </p>
    </Studio>
  );
}
