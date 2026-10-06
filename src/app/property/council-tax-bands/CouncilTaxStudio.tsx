"use client";

import { BAND_D_AVG, BAND_RANGES, bandMultiplier, bandsFor, councilBill, type CtBand, type CtNation } from "@/lib/property/council-tax-bands";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const ALL_BANDS: CtBand[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const SCHEMA = {
  nation: oneOf<CtNation>("england", ["england", "wales", "scotland"]),
  band: oneOf<CtBand>("D", ALL_BANDS),
  bandD: num(0, 0, 10_000),
  adults: num(2, 0, 10),
  disabled: bool(false),
  premium: num(0, 0, 300),
  months: oneOf<"10" | "12">("10", ["10", "12"]),
};
const ADVANCED = ["bandD", "disabled", "premium", "months"] as const;
const NATION_LABEL: Record<CtNation, string> = { england: "England", wales: "Wales", scotland: "Scotland" };
const VALUATION: Record<CtNation, string> = { england: "1 April 1991", wales: "1 April 2003", scotland: "1 April 1991" };

function rangeLabel(nation: CtNation, band: CtBand): string {
  const list = BAND_RANGES[nation];
  const i = list.findIndex((b) => b.band === band);
  if (i < 0) return "";
  const lo = i === 0 ? 0 : (list[i - 1].upTo ?? 0) + 1;
  const hi = list[i].upTo;
  return hi === null ? `Over ${gbp(lo - 1)}` : i === 0 ? `Up to ${gbp(hi)}` : `${gbp(lo)} to ${gbp(hi)}`;
}

export default function CouncilTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const bands = bandsFor(v.nation);
  const band: CtBand = bands.includes(v.band) ? v.band : "D";
  const r = councilBill({
    nation: v.nation,
    band,
    bandD: v.bandD,
    adultsCounted: v.adults,
    disabledReduction: v.disabled,
    premiumPct: v.premium,
    instalments: Number(v.months),
  });
  const usingAverage = v.bandD <= 0;
  const all = bands.map((b) => ({ band: b, bill: r.bandD * bandMultiplier(v.nation, b) }));
  const saved = Math.max(0, r.discount + r.reduction);

  return (
    <Studio
      title=""
      variant="clear"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my council tax"
      onReset={st.reset}
      dock={{ label: "Council tax a year", value: gbp(r.payable) }}
      inputs={
        <>
          <InputGroup title="Your home">
            <RadioGroup
              label="Where you live"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England" },
                { value: "wales", label: "Wales" },
                { value: "scotland", label: "Scotland" },
              ]}
              info="Each nation has its own bands and valuation date. Northern Ireland has domestic rates instead of council tax."
            />
            <SelectField
              label="Council tax band"
              value={band}
              onChange={st.bind("band")}
              options={bands.map((b) => ({ value: b, label: `Band ${b} (${rangeLabel(v.nation, b)})` }))}
              info={
                <>
                  Your band is on your council tax bill. It is based on what your home was worth on {VALUATION[v.nation]}, not today. You can also look it up on GOV.UK
                  {v.nation === "scotland" ? " or the Scottish Assessors' website" : ""}.
                </>
              }
            />
            <StepperField
              label="Adults living there"
              value={v.adults}
              onChange={st.bind("adults")}
              step={1}
              min={0}
              max={10}
              unit=""
              dp={0}
              info="Count people aged 18 or over. Leave out anyone who is disregarded, such as full-time students, student nurses, apprentices, live-in carers and people who are severely mentally impaired. One adult gets 25% off; none gets 50% off."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField
              label="Your council's Band D charge"
              value={v.bandD}
              onChange={st.bind("bandD")}
              optional
              info={`It is on your bill or your council's website, including any parish and police charges. Leave it at £0 to use the ${NATION_LABEL[v.nation]} average of ${gbp(BAND_D_AVG[v.nation])}.`}
            />
            <Switch
              label="Disabled band reduction"
              checked={v.disabled}
              onChange={st.bind("disabled")}
              optional
              info="If your home has a feature a disabled resident needs, such as an extra bathroom, an extra room or space for a wheelchair, you are billed at the band below."
            />
            <StepperField
              label="Second or empty home premium"
              value={v.premium}
              onChange={st.bind("premium")}
              step={25}
              min={0}
              max={300}
              unit="%"
              dp={0}
              optional
              info="Councils can charge extra on second homes and homes empty for a long time: up to 100% in England and Scotland, and up to 300% in Wales."
            />
            <RadioGroup
              label="Pay in"
              value={v.months}
              onChange={st.bind("months")}
              optional
              options={[
                { value: "10", label: "10 instalments" },
                { value: "12", label: "12 instalments" },
              ]}
              info="Councils bill in 10 monthly instalments by default. You can ask to pay over 12 months instead, which lowers each payment."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Band ${band} council tax${usingAverage ? ", average" : ""}`}
        value={gbp(r.payable)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {band === "D" ? <>Band D is the benchmark band. </> : <>Band {band} pays {bandFraction(v.nation, band)} of the Band D charge. </>}{usingAverage ? <>At the {NATION_LABEL[v.nation]} average</> : <>At your council&apos;s rate</>} that is{" "}
            <b>{gbp(r.fullBill)}</b> a year
            {r.discount > 0 && (
              <>
                , less a <b>{Math.round(r.discountRate * 100)}% discount</b> of {gbp(r.discount)}
              </>
            )}
            {r.reduction > 0 && <>, less a disability reduction of {gbp(r.reduction)}</>}
            {r.premium > 0 && <>, plus a premium of {gbp(r.premium)}</>}. You pay <b>{gbp(r.instalment, true)}</b> a month over {v.months} {per(v.months, "months")}.
          </>
        }
        badges={[`Band ${band}`, `${gbp(r.instalment, true)} × ${v.months}`, r.discountRate > 0 ? `${Math.round(r.discountRate * 100)}% discount` : "No discount"]}
      />

      <ResultCard title="Your bill" sub={saved > 0 ? `${gbp(r.payable)} to pay after ${gbp(saved)} off.` : `${gbp(r.payable)} a year, with no discount.`}>
        <SplitBar
          segments={[
            { label: "You pay", value: r.payable, display: gbp(r.payable), color: "#2a78d6" },
            ...(saved > 0 ? [{ label: "Discounts and reductions", value: saved, display: gbp(saved), color: "#1baf7a" }] : []),
          ]}
        />
      </ResultCard>

      <Facts
        items={[
          { label: "A year", value: gbp(r.payable) },
          { label: `Monthly (×${v.months})`, value: gbp(r.instalment, true) },
          { label: "A week", value: gbp(r.weekly, true) },
          { label: "Band D charge", value: gbp(r.bandD), note: usingAverage ? `${NATION_LABEL[v.nation]} average` : "Your council" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Charge", value: usingAverage ? `${NATION_LABEL[v.nation]} average Band D` : "Your council's Band D" },
          { label: "Year", value: "2026/27" },
          { label: "Adults counted", value: String(v.adults) },
          { label: "Reductions", value: v.disabled ? "Disabled band reduction" : "None" },
        ]}
        note="Council tax varies by council and parish. Enter your own Band D charge under More options for an exact figure."
      />

      <ResultCard title="Your bill, step by step" sub="How the discounts and premiums apply.">
        <Statement
          columns={["A year"]}
          rows={[
            { label: `Band ${band} charge`, values: [gbp(r.fullBill)] },
            ...(r.reduction > 0 ? [{ label: `Disabled reduction (billed as Band ${r.billedBand === band ? `${band}, reduced` : r.billedBand})`, values: [`−${gbp(r.reduction)}`], kind: "deduction" as const }] : []),
            ...(r.discount > 0 ? [{ label: `${Math.round(r.discountRate * 100)}% discount`, values: [`−${gbp(r.discount)}`], kind: "deduction" as const }] : []),
            ...(r.premium > 0 ? [{ label: `${v.premium}% premium`, values: [`+${gbp(r.premium)}`] }] : []),
            { label: "You pay", values: [gbp(r.payable)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title={`Every band in ${NATION_LABEL[v.nation]}`} sub={`At a Band D charge of ${gbp(r.bandD)}, before discounts.`}>
        <BarChart
          rows={all.map((x) => ({ label: `Band ${x.band}`, note: rangeLabel(v.nation, x.band), value: x.bill, display: gbp(x.bill), current: x.band === band }))}
          caption={`Your band, ${band}, is shown in blue.`}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways your bill could be lower.">
        {v.adults >= 2 && (
          <Callout title="Is anyone disregarded?">
            Full-time students, student nurses, apprentices, carers, people who are severely mentally impaired and some others are not counted. If only one adult counts,
            you get 25% off; if none do, 50% off.
          </Callout>
        )}
        {v.adults === 1 && (
          <Callout tone="good" title="Single person discount applied">
            Living alone, or with only disregarded adults, gives 25% off. Apply to your council if it is not on your bill.
          </Callout>
        )}
        <Callout title="Council Tax Reduction">
          If you are on a low income or claim benefits, your council may reduce your bill by up to 100%. See what you could get with our{" "}
          <a href="/benefits/council-tax-reduction">Council Tax Reduction calculator</a>.
        </Callout>
        <Callout title="Think your band is wrong?">
          Compare with similar homes nearby. In England and Wales you can ask the Valuation Office Agency to check it; in Scotland, your local assessor. A check can also
          move a band up.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27. Averages are national figures; your council&apos;s charge, including any parish or police precept, may differ.
      </p>
    </Studio>
  );
}

function bandFraction(nation: CtNation, band: CtBand): string {
  if (nation === "scotland") {
    const f: Partial<Record<CtBand, string>> = { A: "240/360", B: "280/360", C: "320/360", D: "all", E: "473/360", F: "585/360", G: "705/360", H: "882/360" };
    return f[band] ?? "";
  }
  const f: Record<CtBand, string> = { A: "6/9", B: "7/9", C: "8/9", D: "all", E: "11/9", F: "13/9", G: "15/9", H: "18/9", I: "21/9" };
  return f[band];
}
