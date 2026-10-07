"use client";

import { cgtDeadline, propertyCgt } from "@/lib/property/property-cgt";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  sale: num(350_000, 0, 50_000_000),
  purchase: num(220_000, 0, 50_000_000),
  income: num(40_000, 0, 10_000_000),
  buyCosts: num(5_000, 0, 5_000_000),
  sellCosts: num(5_000, 0, 5_000_000),
  improvements: num(0, 0, 10_000_000),
  owned: num(10, 0.5, 60),
  lived: num(0, 0, 60),
  owners: oneOf<"1" | "2">("1", ["1", "2"]),
  losses: num(0, 0, 10_000_000),
  completion: date(""),
};
const ADVANCED = ["buyCosts", "sellCosts", "improvements", "owned", "lived", "owners", "losses", "completion"] as const;
const COLORS = { relief: "#0f9f6e", allowance: "#94a3b8", basic: "#f59e0b", higher: "#e11d48" };

function longDate(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function PropertyCGTStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const owners = Number(v.owners);
  const r = propertyCgt({
    salePrice: v.sale,
    purchasePrice: v.purchase,
    buyingCosts: v.buyCosts,
    sellingCosts: v.sellCosts,
    improvements: v.improvements,
    monthsOwned: v.owned * 12,
    monthsLived: Math.min(v.lived, v.owned) * 12,
    owners,
    income: v.income,
    losses: v.losses,
  });
  const deadline = v.completion ? cgtDeadline(v.completion) : "";
  const exemptUsed = Math.min(3_000, Math.max(0, r.yourShare - r.lossesUsed));
  const fullyRelieved = r.gain > 0 && r.chargeable <= 0;

  return (
    <Studio
      title="Your sale"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my Capital Gains Tax"
      onReset={st.reset}
      dock={{ label: owners > 1 ? "Your CGT" : "CGT to pay", value: gbp(r.tax) }}
      inputs={
        <>
          <InputGroup title="The property">
            <MoneyField label="Sale price" value={v.sale} onChange={st.bind("sale")} big slider={{ min: 50_000, max: 1_500_000, step: 5_000, ends: ["£50k", "£1.5m"] }} />
            <MoneyField label="What you paid for it" value={v.purchase} onChange={st.bind("purchase")} hint="Or its market value when you inherited or were given it." />
            <MoneyField label="Your other income this tax year" value={v.income} onChange={st.bind("income")} hint="Salary, pension and other income before tax. Sets your rate: 18% or 24%." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Costs of buying" value={v.buyCosts} onChange={st.bind("buyCosts")} optional hint="Stamp Duty, legal fees and survey." />
            <MoneyField label="Costs of selling" value={v.sellCosts} onChange={st.bind("sellCosts")} optional hint="Estate agent and legal fees." />
            <MoneyField label="Improvements" value={v.improvements} onChange={st.bind("improvements")} optional hint="An extension, loft conversion or new kitchen. Not repairs or decorating." />
            <StepperField label="Years you owned it" value={v.owned} onChange={st.bind("owned")} step={0.5} min={0.5} max={60} unit="years" dp={1} optional />
            <StepperField label="Years it was your main home" value={v.lived} onChange={st.bind("lived")} step={0.5} min={0} max={60} unit="years" dp={1} optional hint="Private Residence Relief covers this time plus the last 9 months." />
            <Segmented
              label="Owned by"
              value={v.owners}
              onChange={st.bind("owners")}
              optional
              options={[
                { value: "1", label: "Just me" },
                { value: "2", label: "Two of us equally", note: "Each owner pays on half the gain, with their own £3,000 allowance. We assume the same income." },
              ]}
            />
            <MoneyField label="Capital losses from earlier years" value={v.losses} onChange={st.bind("losses")} optional />
            <DateField label="Completion date" value={v.completion} onChange={st.bind("completion")} optional hint="To work out your 60-day deadline." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={owners > 1 ? "Your Capital Gains Tax (each)" : "Capital Gains Tax to pay"}
        value={gbp(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.gain <= 0 ? (
            <>After costs there is no gain, so there is no Capital Gains Tax to pay.</>
          ) : fullyRelieved ? (
            <>
              Your gain of <b>{gbp(r.gain)}</b> is fully covered by Private Residence Relief because it was your main home. There is nothing to pay or report.
            </>
          ) : (
            <>
              Your gain is <b>{gbp(r.gain)}</b>
              {r.relief > 0 && (
                <>
                  , of which <b>{gbp(r.relief)}</b> is covered by Private Residence Relief
                </>
              )}
              . {owners > 1 ? <>Your half of the taxable gain is {gbp(r.yourShare)}. </> : null}After the £3,000 allowance you pay <b>{gbp(r.tax)}</b>
              {deadline && (
                <>
                  , reported and paid by <b>{longDate(deadline)}</b>
                </>
              )}
              .
            </>
          )
        }
        badges={[`${gbp(r.gain)} gain`, r.higherRateGain > 0 ? (r.basicRateGain > 0 ? "18% and 24%" : "24% rate") : "18% rate", deadline ? `Due ${longDate(deadline)}` : "Due within 60 days"]}
      />

      <Facts
        items={[
          { label: "Total gain", value: gbp(r.gain) },
          { label: "Residence relief", value: gbp(r.relief), tone: r.relief > 0 ? "good" : undefined, note: r.relief > 0 ? `${percent(r.reliefShare)} of the gain` : undefined },
          { label: owners > 1 ? "Taxable, your share" : "Taxable gain", value: gbp(r.taxableGain) },
          { label: "Effective rate", value: percent(r.effectiveRate, 1), note: "Of your share of the gain" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Residence", value: "UK resident" },
          { label: "Owners", value: owners > 1 ? "Two, equal shares" : "One" },
          { label: "Main home", value: v.lived > 0 ? "Lived there first" : "Never lived there" },
        ]}
      />

      {r.gain > 0 && (
        <ResultCard title="How the gain is taxed" sub={owners > 1 ? "Your half of the gain." : "From the whole gain to the tax."}>
          <Statement
            columns={["Amount"]}
            rows={[
              { label: "Sale price", values: [gbp(v.sale)] },
              { label: "Purchase price", values: [`−${gbp(v.purchase)}`], kind: "deduction" },
              { label: "Buying, selling and improvement costs", values: [`−${gbp(v.buyCosts + v.sellCosts + v.improvements)}`], kind: "deduction" },
              { label: "Gain", values: [gbp(r.gain)], kind: "total" },
              ...(r.relief > 0 ? [{ label: "Private Residence Relief", values: [`−${gbp(r.relief)}`], kind: "deduction" as const }] : []),
              ...(owners > 1 ? [{ label: "Your half", values: [gbp(r.yourShare)] }] : []),
              ...(r.lossesUsed > 0 ? [{ label: "Losses used", values: [`−${gbp(r.lossesUsed)}`], kind: "deduction" as const }] : []),
              { label: "Annual exempt amount", values: [`−${gbp(exemptUsed)}`], kind: "deduction" },
              { label: "Taxed at 18%", values: [gbp(r.basicRateGain)] },
              { label: "Taxed at 24%", values: [gbp(r.higherRateGain)] },
              { label: "Capital Gains Tax", values: [gbp(r.tax)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {r.gain > 0 && (
        <ResultCard title="Where the gain goes" sub={owners > 1 ? "Your half of the gain." : "Relief, allowance and tax on the gain."}>
          <SplitBar
            segments={[
              ...(r.relief > 0 ? [{ label: "Residence relief", value: r.relief / owners, display: gbp(r.relief / owners), color: COLORS.relief }] : []),
              { label: "Tax-free allowance and losses", value: exemptUsed + r.lossesUsed, display: gbp(exemptUsed + r.lossesUsed), color: COLORS.allowance },
              ...(r.basicRateGain > 0 ? [{ label: "Taxed at 18%", value: r.basicRateGain, display: gbp(r.basicRateGain), color: COLORS.basic }] : []),
              ...(r.higherRateGain > 0 ? [{ label: "Taxed at 24%", value: r.higherRateGain, display: gbp(r.higherRateGain), color: COLORS.higher }] : []),
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Reporting, deadlines and reliefs.">
        {r.tax > 0 && (
          <Callout tone="warn" title="Report and pay within 60 days">
            Use HMRC&apos;s UK property account to report the sale and pay within 60 days of completion{deadline ? <>, by {longDate(deadline)}</> : null}. Late reporting brings
            penalties and interest.
          </Callout>
        )}
        {owners === 1 && r.tax > 0 && (
          <Callout title="Joint ownership can halve the tax">
            Married couples and civil partners can transfer assets between them without CGT. If each owns half before the sale, each has a £3,000 allowance and their own
            basic-rate band. Take advice before doing this.
          </Callout>
        )}
        {r.basicRateGain > 0 && r.higherRateGain > 0 && (
          <Callout title="Your rate depends on your income">
            The part of the gain that fits in your unused basic-rate band is taxed at 18%; the rest at 24%. Pension contributions can extend the band.
          </Callout>
        )}
        <Callout title="Keep your records">
          Keep purchase and sale documents, invoices for improvements and evidence of when you lived there. HMRC can ask for them.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 residential rates and allowances. Assumes you lived there before letting it. Not tax advice.
      </p>
    </Studio>
  );
}
