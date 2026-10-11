"use client";

import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { defaultRelativity, leaseExtension, LFRA_RENT_CAP, MARRIAGE_VALUE_YEARS, premiumCurve } from "@/lib/property/lease-extension";

const COLORS = { term: "#2a78d6", reversion: "#1baf7a", marriage: "#eb6834", costs: "#9aa1a9", act: "#4a3aa7" };

type Basis = "long" | "current";

const SCHEMA = {
  value: num(250_000, 0, 20_000_000),
  basis: oneOf<Basis>("long", ["long", "current"]),
  years: num(75, 0, 999),
  rent: num(250, 0, 100_000),
  deferment: num(5, 0, 20),
  cap: num(6.5, 0, 20),
  relativity: num(0, 0, 100),
  uplift: num(1, 0, 20),
  ownLegal: num(1_500, 0, 100_000),
  ownValuer: num(800, 0, 100_000),
  llCosts: num(1_500, 0, 100_000),
};
const ADVANCED = ["deferment", "cap", "relativity", "uplift", "ownLegal", "ownValuer", "llCosts"] as const;

export default function LeaseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    value: v.value,
    basis: v.basis,
    years: v.years,
    groundRent: v.rent,
    deferment: v.deferment / 100,
    capitalisation: v.cap / 100,
    relativity: v.relativity / 100,
    uplift: v.uplift / 100,
    ownLegal: v.ownLegal,
    ownValuer: v.ownValuer,
    landlordCosts: v.llCosts,
  };
  const r = leaseExtension(input);
  const c = r.current;
  const a = r.act2024;
  const empty = v.value <= 0 || v.years <= 0;
  const curve = premiumCurve(input, 99, 20);
  const startIdx = Math.max(0, Math.min(curve.length - 1, 99 - Math.round(v.years)));
  const autoRel = v.relativity <= 0;
  const netReversion = Math.max(0, c.reversion - c.newReversion);
  const rentCapped = v.rent > a.cappedRent + 0.5;
  const ladder = [99, 90, 85, 81, 80, 75, 70, 65, 60, 50, 40, 30].map((y) => {
    const p = curve.find((x) => x.years === y);
    return [`${y} years`, gbp(p?.current ?? 0), gbp(p?.act2024 ?? 0)];
  });

  return (
    <Studio
      title="Your flat and lease"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my premium"
      onReset={st.reset}
      dock={{ label: "Premium", value: gbp(c.premium) }}
      inputs={
        <>
          <InputGroup title="Your flat and lease">
            <MoneyField
              label="Flat value"
              value={v.value}
              onChange={st.bind("value")}
              big
              slider={{ min: 0, max: 1_500_000, step: 5_000, ends: ["£0", "£1.5m"] }}
              hint="What the flat would sell for. Choose below whether this is its value with a long lease or as it is now."
            />
            <Segmented
              label="That value is"
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "long", label: "With a long lease", note: "The value once the lease is extended, or of a similar flat with 125 years or more. Estate agents usually quote this." },
                { value: "current", label: "As it is now", note: "The value with the lease you have now. We convert it with the relativity under More options." },
              ]}
            />
            <StepperField
              label="Years left on the lease"
              value={v.years}
              onChange={st.bind("years")}
              step={1}
              min={0}
              max={999}
              unit="years"
              dp={1}
              hint="Check the start date and term on your lease or the Land Registry title, then count the years left today."
            />
            <MoneyField
              label="Ground rent a year"
              value={v.rent}
              onChange={st.bind("rent")}
              hint="What you pay the freeholder now. If it rises in steps, use the current figure for a first estimate."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label="Deferment rate"
              value={v.deferment}
              onChange={st.bind("deferment")}
              step={0.25}
              min={1}
              max={12}
              unit="%"
              dp={2}
              hint="Discounts the freeholder's right to get the flat back when the lease ends. 5% for flats is the rate set in the Sportelli case and still used by tribunals."
            />
            <StepperField
              label="Capitalisation rate"
              value={v.cap}
              onChange={st.bind("cap")}
              step={0.25}
              min={1}
              max={12}
              unit="%"
              dp={2}
              hint="Turns the ground rent into a lump sum. Tribunal decisions used 4.5% to 9%, most often 6% to 7%. A rising ground rent usually takes a lower rate."
            />
            <StepperField
              label="Relativity (0 = our default)"
              value={v.relativity}
              onChange={st.bind("relativity")}
              step={0.5}
              min={0}
              max={99}
              unit="%"
              dp={1}
              hint={`Your current lease's value as a share of the freehold value. Leave at 0 to use ${percent(defaultRelativity(v.years), 1)} for ${Math.round(v.years)} years, from Savills' published relativity table. A valuer may use a different figure, especially outside central London.`}
            />
            <StepperField
              label="Freehold value above a long lease"
              value={v.uplift}
              onChange={st.bind("uplift")}
              step={0.5}
              min={0}
              max={10}
              unit="%"
              dp={1}
              hint="Valuers usually treat a flat with a very long lease as worth about 1% less than the same flat held freehold."
            />
            <MoneyField label="Your solicitor" value={v.ownLegal} onChange={st.bind("ownLegal")} optional hint="An example figure. Get a quote: fees vary with the firm and how complex the lease is." />
            <MoneyField label="Your valuer" value={v.ownValuer} onChange={st.bind("ownValuer")} optional hint="An example figure for a surveyor's valuation report." />
            <MoneyField
              label="Freeholder's costs you pay"
              value={v.llCosts}
              onChange={st.bind("llCosts")}
              optional
              hint="Under the current rules you pay the freeholder's reasonable legal and valuation costs. An example figure."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Estimated lease extension premium"
        value={gbp(c.premium)}
        unit="under the rules in force"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          empty ? (
            <>Enter the flat&rsquo;s value and the years left to see an estimate.</>
          ) : r.marriageApplies ? (
            <>
              With <b>{v.years} years</b>{" "}left, the premium includes <b>{gbp(c.marriageShare)}</b>{" "}of marriage value. With costs, expect about <b>{gbp(c.total)}</b>{" "}in all.
            </>
          ) : (
            <>
              With more than 80 years left there is no marriage value. With costs, expect about <b>{gbp(c.total)}</b>{" "}in all. The premium jumps once the lease reaches 80 years
              {r.yearsTo80 > 0 && <> (in about {r.yearsTo80.toFixed(r.yearsTo80 < 2 ? 1 : 0)} years)</>}.
            </>
          )
        }
        badges={["1993 Act rules", `${v.deferment}% deferment`, `${percent(c.relativity, 1)} relativity`]}
      />

      <Facts
        items={[
          { label: "Premium plus costs", value: gbp(c.total) },
          { label: "Half the marriage value", value: gbp(c.marriageShare), tone: c.marriageShare > 0 ? ("warn" as const) : undefined },
          { label: "2024 Act method (not in force)", value: gbp(a.premium), note: "Same rates, no marriage value" },
          r.marriageApplies
            ? { label: "Marriage value", value: "Payable", note: "80 years or fewer left", tone: "bad" as const }
            : { label: "Years until 80", value: `${r.yearsTo80.toFixed(1)}`, tone: r.yearsTo80 < 3 ? ("warn" as const) : ("good" as const) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rules", value: "Leasehold Reform, Housing and Urban Development Act 1993" },
          { label: "Freehold value", value: gbp(c.freeholdValue) },
          { label: "Extended lease value", value: gbp(c.extendedValue) },
          { label: "Current lease value", value: `${gbp(c.existingValue)} (${percent(c.relativity, 1)}${autoRel ? ", default" : ""})` },
          { label: "Rates", value: `${v.deferment}% deferment, ${v.cap}% capitalisation` },
        ]}
        note="A statutory extension adds 90 years at a peppercorn (zero) ground rent. The estimate assumes no intermediate landlord, no development value and a flat in England or Wales."
      />

      {!empty && (
        <ResultCard title="What the premium is made of" sub="The freeholder's loss, plus their half of the marriage value, plus the costs you pay.">
          <SplitBar
            segments={[
              { label: "Ground rent (term)", value: c.term, display: gbp(c.term), color: COLORS.term },
              { label: "Reversion", value: netReversion, display: gbp(netReversion), color: COLORS.reversion },
              ...(c.marriageShare > 0 ? [{ label: "Half the marriage value", value: c.marriageShare, display: gbp(c.marriageShare), color: COLORS.marriage }] : []),
              ...(c.costs > 0 ? [{ label: "Costs", value: c.costs, display: gbp(c.costs), color: COLORS.costs }] : []),
            ]}
          />
        </ResultCard>
      )}

      {!empty && (
        <ResultCard title="The valuation, step by step" sub="How the premium is built under the current rules and under the 2024 Act method.">
          <Statement
            columns={["Current rules", "2024 Act method"]}
            rows={[
              { label: "Ground rent counted", values: [gbp(v.rent), gbp(a.cappedRent)] },
              { label: "Term: ground rent as a lump sum", values: [gbp(c.term), gbp(a.term)], swatch: COLORS.term },
              { label: "Reversion: the flat back at the end", values: [gbp(c.reversion), gbp(a.reversion)], swatch: COLORS.reversion },
              { label: "Less the freeholder's new reversion", values: [gbp(-c.newReversion), gbp(-a.newReversion)], kind: "deduction" },
              { label: "Freeholder's loss (diminution)", values: [gbp(c.diminution), gbp(a.diminution)] },
              { label: "Marriage value", values: [gbp(c.marriageValue), "None"] },
              { label: "Half the marriage value", values: [gbp(c.marriageShare), "None"], swatch: COLORS.marriage },
              { label: "Premium", values: [gbp(c.premium), gbp(a.premium)], kind: "total" },
              { label: "Costs you pay", values: [gbp(c.costs), gbp(a.costs)], swatch: COLORS.costs },
              { label: "Total", values: [gbp(c.total), gbp(a.total)], kind: "total" },
            ]}
          />
          <p className="footnote">
            Marriage value is the extra value unlocked by the extension: {gbp(c.extendedValue)} + {gbp(c.newReversion)} − ({gbp(c.existingValue)} + {gbp(c.term)} +{" "}
            {gbp(c.reversion)}).
          </p>
        </ResultCard>
      )}

      {!empty && (
        <ResultCard title="Current rules or the 2024 Act" sub="The same flat and rates under each method. Only the current rules can be used today.">
          <Compare
            head={["Method", "Premium"]}
            rows={[
              { label: "Current rules (1993 Act)", value: gbp(c.premium), bar: 1, current: true },
              {
                label: "2024 Act method, once in force",
                value: gbp(a.premium),
                bar: c.premium > 0 ? Math.min(1, a.premium / c.premium) : 0,
                delta: a.premium < c.premium ? `${gbp(c.premium - a.premium)} less` : a.premium > c.premium ? `${gbp(a.premium - c.premium)} more` : undefined,
                deltaTone: "down",
              },
            ]}
          />
          <Callout tone="warn" title="The 2024 Act valuation rules are not in force">
            The Leasehold and Freehold Reform Act 2024 abolishes marriage value, but the government has not yet set the deferment and capitalisation rates it needs, and
            freeholders are challenging the changes in the Court of Appeal. No date has been set. The 2024 Act figure uses your rates as a stand-in for the rates the
            government will set, so treat it as a rough guide.
          </Callout>
        </ResultCard>
      )}

      {!empty && (
        <ResultCard title="How the premium grows as the lease runs down" sub="The same flat at today's value, with each number of years left. Note the jump at 80 years.">
          <AreaChart
            ariaLabel="Lease extension premium by years left on the lease"
            series={[
              { key: "cur", label: "Current rules", color: COLORS.marriage, values: curve.map((p) => p.current), fill: true },
              { key: "act", label: "2024 Act method", color: COLORS.act, values: curve.map((p) => p.act2024), dashed: true },
            ]}
            xLabel={(i) => `${curve[i]?.years ?? ""} yrs`}
            yFormat={gbpShort}
            initial={startIdx}
            hint="Drag across the chart, or use the arrow keys, to read any lease length."
            readout={(i) => {
              const p = curve[i];
              if (!p) return <>Drag along the chart to compare lease lengths.</>;
              return (
                <>
                  With <b>{p.years} years</b>{" "}left: about <b>{gbp(p.current)}</b>{" "}under the current rules
                  {p.years <= MARRIAGE_VALUE_YEARS ? " (marriage value included)" : ""}, or <b>{gbp(p.act2024)}</b>{" "}under the 2024 Act method.
                </>
              );
            }}
          />
        </ResultCard>
      )}

      {!empty && (
        <ResultCard title="Worth knowing" sub="What these figures mean for you.">
          {!r.marriageApplies && r.yearsTo80 <= 5 && (
            <Callout tone="warn" title="Serve notice before the lease reaches 80 years">
              The premium is fixed at the date your formal notice (a section 42 notice) is served. Serving it while more than 80 years are left keeps marriage value out,
              even if the extension completes later. Allow time to get a valuation and a solicitor first.
            </Callout>
          )}
          {r.marriageApplies && (
            <Callout title="The premium keeps rising each year you wait">
              Below 80 years the premium grows faster as the lease shortens, and short leases are harder to sell or mortgage. Extending sooner usually costs less, unless
              you are prepared to wait for the 2024 Act changes, which have no start date.
            </Callout>
          )}
          {rentCapped && (
            <Callout title="High ground rent">
              Your ground rent is above 0.1% of the freehold value ({gbp(a.cappedRent)} a year). The 2024 Act would only count rent up to that level in the valuation,
              which is why its figure is lower. Under the current rules the whole rent counts.
            </Callout>
          )}
          <Callout title="This is an estimate, not a valuation">
            The real premium depends on a valuer&rsquo;s view of the flat&rsquo;s value, the relativity and the rates, and on any agreement with the freeholder. Get a
            report from a surveyor who knows lease extensions before you serve notice: the figure in the notice must be realistic.
          </Callout>
        </ResultCard>
      )}

      <DataTable summary="Premium by years left (current rules and 2024 Act method)" columns={["Years left", "Current rules", "2024 Act method"]} rows={ladder} />

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimates for flats in England and Wales. Ground rent cap under the 2024 Act: {LFRA_RENT_CAP * 100}% of the freehold value.
      </p>
    </Studio>
  );
}
