"use client";

import { escrowCushion, propertyTax, propertyTaxPath } from "@/lib/us/estate-property";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  value: num(400_000, 0, 100_000_000),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  mode: oneOf<"rate" | "mill">("rate", ["rate", "mill"]),
  ratePct: num(propertyTaxPct("US"), 0, 10),
  mills: num(20, 0, 300),
  assessmentPct: num(100, 0, 100),
  homestead: num(0, 0, 10_000_000),
  senior: num(0, 0, 10_000_000),
  other: num(0, 0, 10_000_000),
  credits: num(0, 0, 1_000_000),
  growth: num(3, 0, 15),
};
const ADVANCED = ["senior", "other", "credits", "growth"] as const;

const nameOf = (code: string) => (code === "US" ? "US average" : (STATES.find((s) => s.code === code)?.name ?? code));

export default function PropertyTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    value: v.value,
    mode: v.mode,
    ratePct: v.ratePct,
    mills: v.mills,
    assessmentPct: v.assessmentPct,
    homestead: v.homestead,
    senior: v.senior,
    otherExemption: v.other,
    credits: v.credits,
  };
  const r = propertyTax(input);
  const path = propertyTaxPath(input, v.growth, 10);
  const total10 = path.slice(1).reduce((a, b) => a + b, 0);
  const cushion = escrowCushion(r.tax);
  const notAssessed = Math.max(0, v.value - r.assessed);
  const byState = STATES.map((s) => ({ code: s.code, name: s.name, pct: propertyTaxPct(s.code), tax: (v.value * propertyTaxPct(s.code)) / 100 })).sort((a, b) => b.tax - a.tax);
  const usTax = (v.value * propertyTaxPct("US")) / 100;
  const pick = [...byState.slice(0, 4), ...byState.slice(-4)];
  if (v.state !== "US" && !pick.some((p) => p.code === v.state)) {
    const mine = byState.find((p) => p.code === v.state);
    if (mine) pick.splice(4, 0, mine);
  }
  const bars = [
    ...pick.map((p) => ({ label: p.name, note: `${p.pct}%`, value: p.tax, display: usd(p.tax), current: p.code === v.state })),
    { label: "US average", note: `${propertyTaxPct("US")}%`, value: usTax, display: usd(usTax), current: v.state === "US" },
  ].sort((a, b) => b.value - a.value);
  const rank = v.state === "US" ? 0 : byState.findIndex((p) => p.code === v.state) + 1;

  return (
    <Studio
      title="Your property tax"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my property tax"
      onReset={st.reset}
      dock={{ label: "Property tax a year", value: usd(r.tax) }}
      inputs={
        <>
          <InputGroup title="The home and the tax">
            <MoneyField label="Home value" symbol="$" value={v.value} onChange={st.bind("value")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} info="Market value, or the assessor's market value from your notice." />
            <SelectField
              label="State"
              value={v.state}
              onChange={(code) => {
                st.set("state", code);
                st.set("ratePct", propertyTaxPct(code));
                st.set("mode", "rate");
              }}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Fills in the typical rate for ${nameOf(v.state)} (${propertyTaxPct(v.state)}% of value: median tax ÷ median home value, Census Bureau, 2024). Your county and city set the real rate.`}
            />
            <Segmented
              label="Work it out from"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "rate", label: "A rate of value" },
                { value: "mill", label: "Mill rate and assessment" },
              ]}
            />
            {v.mode === "rate" ? (
              <StepperField label="Effective tax rate" value={v.ratePct} onChange={st.bind("ratePct")} step={0.01} min={0} max={10} unit="%" dp={2} aside={`${usd(r.tax)} a year`} />
            ) : (
              <>
                <StepperField
                  label="Mill rate"
                  value={v.mills}
                  onChange={st.bind("mills")}
                  step={0.5}
                  min={0}
                  max={300}
                  unit="mills"
                  dp={3}
                  info="Dollars of tax per $1,000 of assessed value, adding up the county, city, school district and other levies on your bill."
                />
                <StepperField
                  label="Assessment ratio"
                  value={v.assessmentPct}
                  onChange={st.bind("assessmentPct")}
                  step={1}
                  min={0}
                  max={100}
                  unit="% of value"
                  dp={1}
                  aside={`${usd(r.assessed)} assessed`}
                  info="The share of market value that is taxed. Many states assess at 100%; others use a fixed share, such as 40% or 10%."
                />
              </>
            )}
            <MoneyField label="Homestead exemption" symbol="$" value={v.homestead} onChange={st.bind("homestead")} info="Taken off the assessed value of your main home. Amounts vary widely; some apply only to school taxes. Apply through your county." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Senior or disability exemption" symbol="$" optional value={v.senior} onChange={st.bind("senior")} info="Many states and counties take more off the value for owners 65 or older or with a disability." />
            <MoneyField label="Other exemptions" symbol="$" optional value={v.other} onChange={st.bind("other")} info="Veterans, disabled veterans, agricultural use and similar." />
            <MoneyField label="Credits or rebates a year" symbol="$" optional value={v.credits} onChange={st.bind("credits")} info="Dollar amounts taken off the bill itself, such as a circuit-breaker credit or state rebate." />
            <StepperField label="Value growth a year" optional value={v.growth} onChange={st.bind("growth")} step={0.5} min={0} max={15} unit="%" dp={1} info="For the 10-year view. Some states cap yearly rises in assessed value for homesteads (California 2%, Florida 3%)." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Property tax a year"
        value={usd(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            On a {usd(v.value)} home{v.mode === "mill" ? `, assessed at ${usd(r.assessed)}` : ""}, the tax is <b>{usd(r.tax)}</b>{" "}a year, or <b>{usd(r.monthly)}</b>{" "}a month
            through escrow. That is <b>{percent(r.effectiveRate, 2)}</b>{" "}of the home&rsquo;s value
            {r.saved > 0 ? <>, after exemptions and credits that save {usd(r.saved)}</> : null}.
          </>
        }
        badges={[`${percent(r.effectiveRate, 2)} of value`, `${usd(r.monthly)} a month`, r.saved > 0 ? `Saving ${usd(r.saved)}` : "No exemptions entered", rank > 0 ? `${nameOf(v.state)}: #${rank} highest of 51` : "US average rate"]}
      />

      <Facts
        items={[
          { label: "Tax a year", value: usd(r.tax) },
          { label: "Monthly escrow", value: usd(r.monthly) },
          { label: "Taxable value", value: usd(r.taxable) },
          { label: "Exemptions save", value: usd(r.saved), tone: r.saved > 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Method", value: v.mode === "rate" ? `${v.ratePct}% of value, after exemptions` : `${v.mills} mills on ${v.assessmentPct}% of value, after exemptions` },
          { label: "Exemptions", value: r.exemptions > 0 ? `${usd(r.exemptions)} off the ${v.mode === "rate" ? "value" : "assessed value"}, applied to every levy` : "None" },
          { label: "Credits", value: v.credits > 0 ? `${usd(v.credits)} off the bill` : "None" },
          { label: "Growth", value: `${v.growth}% a year in value; rates and exemptions held flat` },
          { label: "Not included", value: "Special assessments, HOA dues, rate changes, senior freezes and assessment caps" },
        ]}
      />

      <ResultCard title="How your home is taxed" sub="The home's value, split into what is taxed and what isn't.">
        <SplitBar
          segments={[
            { label: "Taxed value", value: r.taxable, display: usd(r.taxable), color: "#eb6834" },
            { label: "Exempt", value: r.exemptions, display: usd(r.exemptions), color: "#1baf7a" },
            { label: "Not assessed", value: notAssessed, display: usd(notAssessed), color: "#c3c8ce" },
          ]}
          caption={v.mode === "mill" ? `${v.mills} mills = $${v.mills} for every $1,000 of taxable value.` : "With an effective rate, the whole value is treated as assessed."}
        />
      </ResultCard>

      <ResultCard title="The same home in other states" sub="At each state's typical rate, before exemptions.">
        <BarChart rows={bars} caption="Typical rate: median real estate tax ÷ median home value (Census Bureau, ACS 2024). Counties within a state vary a lot." />
        <DataTable summary="All 50 states and DC" columns={["Rank", "State", "Typical rate", "Tax on this home"]} rows={byState.map((p, i) => [i + 1, p.name, `${p.pct}%`, usd(p.tax)])} />
      </ResultCard>

      <ResultCard title="The next 10 years" sub={`If the value grows ${v.growth}% a year and the rate stays the same.`}>
        <AreaChart
          ariaLabel="Property tax by year"
          series={[{ key: "tax", label: "Property tax", color: "#f59e0b", values: path, fill: true }]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, path.length - 1)}
          readout={(i) => (
            <>
              Year <b>{i}</b>: <b>{usd(path[i] ?? 0)}</b>{" "}a year, {usd((path[i] ?? 0) / 12)} a month.
            </>
          )}
        />
        <p className="footnote">Over 10 years you would pay about {usd(total10)}.</p>
      </ResultCard>

      <ResultCard title="Paying through escrow" sub="How your mortgage servicer collects the tax.">
        <Facts
          items={[
            { label: "Added to each payment", value: usd(r.monthly) },
            { label: "Cushion the servicer may hold", value: usd(cushion), note: "Up to 2 months (RESPA)" },
          ]}
        />
      </ResultCard>

      {v.homestead === 0 && (
        <Callout title="Check for a homestead exemption">
          Most states lower the tax on a main home, but you usually have to apply once through the county assessor. Enter the amount above to see the saving.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a tax bill. Your county assessor and tax collector have the real figures.
      </p>
    </Studio>
  );
}
