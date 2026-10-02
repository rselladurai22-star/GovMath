"use client";

import { BAND_INFO, bandFor, taxBracket } from "@/lib/tax/tax-bracket";
import { computeTakeHome, type TaxRegion } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  income: num(55_000),
  region: oneOf<TaxRegion>("ruk", ["ruk", "scotland"]),
  pension: num(0, 0, 60),
  personal: num(0),
  giftAid: num(0),
};
const ADVANCED = ["pension", "personal", "giftAid"] as const;

const PSA: Record<string, string> = { none: "£1,000", basic: "£1,000", higher: "£500", taper: "£500", additional: "£0" };
const DIVIDEND: Record<string, string> = { none: "10.75%", basic: "10.75%", higher: "35.75%", taper: "35.75%", additional: "39.35%" };

export default function TaxBracketStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { income: v.income, region: v.region, sacrificePct: v.pension, personalPensionNet: v.personal, giftAidNet: v.giftAid };
  const r = taxBracket(input);
  const info = BAND_INFO[r.band];
  const snap = computeTakeHome({ gross: r.adjusted, bonus: 0, pensionPct: 0, plan: "none", region: v.region });
  const ukBand = bandFor(r.adjusted, "ruk");
  const scot = v.region === "scotland";
  const maEligible = r.adjusted > 12_570 && (scot ? ["starter", "basic", "intermediate"].includes(r.band) : r.band === "basic");

  // What it costs to drop to the band below by paying into a pension.
  const drop = r.previous && r.band !== "none" && r.band !== "starter" && r.band !== "basic"
    ? (() => {
        const over = r.previous.over;
        const after = computeTakeHome({ gross: r.adjusted - over, bonus: 0, pensionPct: 0, plan: "none", region: v.region });
        return { over, cost: snap.takeHome - after.takeHome, net: over * 0.8 };
      })()
    : null;

  const bands = snap.taxBands;
  const maxBand = Math.max(...bands.map((b) => b.income), 1);

  return (
    <Studio
      title="Your income"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my tax band"
      onReset={st.reset}
      dock={{ label: "Your tax band", value: `${percent(r.taxRate)} · ${info.name}` }}
      inputs={
        <>
          <InputGroup title="Your income">
            <MoneyField
              label="Yearly income (before tax)"
              value={v.income}
              onChange={st.bind("income")}
              big
              slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }}
              hint="Salary, bonus and self-employed profit for the tax year. Leave out savings and dividends."
            />
            <Segmented
              label="Where you live"
              value={v.region}
              onChange={st.bind("region")}
              options={[
                { value: "ruk", label: "England, Wales & NI" },
                { value: "scotland", label: "Scotland", note: "Scotland has six Income Tax bands." },
              ]}
            />
          </InputGroup>
          <AdvancedOptions
            changed={st.changed([...ADVANCED])}
            onReset={() => st.resetKeys([...ADVANCED])}
            description="Optional. Pension contributions and Gift Aid can move you into a lower band."
          >
            <StepperField label="Salary sacrifice pension" value={v.pension} onChange={(n) => st.set("pension", Math.round(n))} step={1} min={0} max={60} unit="%" optional />
            <MoneyField
              label="Personal pension contributions you pay, a year"
              value={v.personal}
              onChange={st.bind("personal")}
              optional
              hint="The amount you pay into a SIPP or relief-at-source scheme. We gross it up by 25% for the tax relief."
            />
            <MoneyField label="Gift Aid donations, a year" value={v.giftAid} onChange={st.bind("giftAid")} optional hint="What you gave to charity with Gift Aid." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your top tax band"
        value={percent(r.taxRate)}
        unit={info.name}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.band === "none" ? (
            <>
              Your income is within the <b>£12,570</b> tax-free allowance, so you pay no Income Tax.
            </>
          ) : r.band === "taper" ? (
            <>
              Your income is between <b>£100,000</b> and <b>£125,140</b>, where your tax-free allowance is withdrawn. Each extra £1 costs <b>{percent(r.marginal)}</b> in
              tax and NI, so you keep just <b>{Math.round((1 - r.marginal) * 100)}p</b>.
            </>
          ) : (
            <>
              The top slice of your income is taxed at <b>{percent(r.taxRate)}</b>. With National Insurance, <b>{percent(r.marginal)}</b> of each extra £1 is
              deducted, so you keep <b>{Math.round((1 - r.marginal) * 100)}p</b>. Only income above <b>{gbp(r.previous?.at ?? 0)}</b> is taxed at this rate.
            </>
          )
        }
        badges={[`${percent(r.effective, 1)} effective tax rate`, REGION_LABEL[v.region], r.adjusted !== v.income ? `Adjusted income ${gbp(r.adjusted)}` : "No reliefs entered"]}
      />

      <Facts
        items={[
          { label: "Income Tax a year", value: gbp(r.incomeTax) },
          { label: "Effective rate", value: percent(r.effective, 1), note: "Of your income" },
          { label: "Kept from the next £1", value: `${Math.round((1 - r.marginal) * 100)}p`, tone: "good" },
          r.next ? { label: `To ${BAND_INFO[r.next.band].name.toLowerCase()}`, value: gbp(r.next.away), note: `At ${gbp(r.next.at)}` } : { label: "Next band", value: "None", note: "You are in the top band" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Tax code", value: "1257L" },
          { label: "Income", value: "Earned income only" },
          { label: "National Insurance", value: "Employee rates" },
        ]}
      />

      {bands.length > 1 && (
        <ResultCard title="Your income, band by band" sub="Each band is taxed at its own rate. Moving into a higher band only affects the income inside it.">
          <Compare
            head={["Band", "Tax on that slice"]}
            rows={bands.map((b, i) => ({
              label: (
                <>
                  {b.label} <span style={{ color: "var(--muted)" }}>· {percent(b.rate)}</span>
                </>
              ),
              value: gbp(b.tax),
              delta: `on ${gbp(b.income)}`,
              bar: b.income / maxBand,
              current: i === bands.length - 1,
            }))}
          />
        </ResultCard>
      )}

      {drop && (
        <ResultCard title="Move down a band" sub="Paying into a pension lowers the income your band is based on.">
          <Callout tone="good" title={`${gbp(drop.over)} into your pension would take you back to ${gbp(r.previous?.at ?? 0)}`}>
            Your take-home pay would fall by only about <b>{gbp(drop.cost)}</b>, because the rest is tax you no longer pay. Through a personal pension you would pay{" "}
            <b>{gbp(drop.net)}</b> and claim the rest of the relief through Self Assessment.
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Your band affects more than Income Tax" sub="Allowances and rates that depend on your band.">
        <Facts
          items={[
            { label: "Personal Savings Allowance", value: PSA[ukBand], note: "Interest you can earn tax-free" },
            { label: "Dividend tax rate", value: DIVIDEND[ukBand], note: "After the £500 allowance" },
            { label: "Capital Gains Tax", value: ukBand === "basic" || ukBand === "none" ? "18% / 24%" : "24%", note: "After the £3,000 exemption" },
            { label: "Pension tax relief", value: percent(r.taxRate), note: "On contributions" },
          ]}
        />
        {scot && (
          <p className={s.hint}>Savings, dividends and capital gains use the UK-wide bands, even for Scottish taxpayers.</p>
        )}
        {r.adjusted > 60_000 && (
          <Callout tone="warn" title="Child Benefit is being clawed back">
            Above £60,000 of adjusted net income the High Income Child Benefit Charge recovers 1% of Child Benefit for every £200, all of it by £80,000.
          </Callout>
        )}
        {maEligible && (
          <Callout title="Marriage Allowance could save you £252">
            If your spouse or civil partner earns under £12,570, they can transfer £1,260 of their allowance to you, cutting your tax by up to £252 a year.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>2026/27 rates. Adjusted income = income less pension contributions and Gift Aid, grossed up.</p>
    </Studio>
  );
}
