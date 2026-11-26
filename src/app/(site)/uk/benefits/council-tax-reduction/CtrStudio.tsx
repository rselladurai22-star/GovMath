"use client";

import Link from "next/link";
import { HouseholdFields, MEANS_ADVANCED, MEANS_SCHEMA, MeansAdvancedFields, meansFrom } from "@/components/benefits/MeansFields";
import MeansStatement, { type MeansStep } from "@/components/benefits/MeansStatement";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { CTR_2026, CTR_SCHEME_RANGE, HB_2026, councilTaxReduction, type CtrNation } from "@/lib/benefits/housing-support";
import SchemeRange from "./SchemeRange";

const SCHEMA = {
  ...MEANS_SCHEMA,
  nation: oneOf<CtrNation>("england", ["england", "wales", "scotland"]),
  bill: num(2_000, 0, 20_000),
  maxPct: num(80, 0, 100),
  taperPct: num(20, 0, 100),
};
const MORE = [...MEANS_ADVANCED] as const;
const NATION_LABEL: Record<CtrNation, string> = { england: "England", wales: "Wales", scotland: "Scotland" };

export default function CtrStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const pension = v.age === "pension";
  const input = { ...meansFrom(v), nation: v.nation, annualBill: v.bill, maxShare: v.maxPct / 100, taper: v.taperPct / 100 };
  const r = councilTaxReduction(input);
  const local = !r.national;
  const best = councilTaxReduction({ ...input, maxShare: CTR_SCHEME_RANGE.generous.maxShare, taper: CTR_SCHEME_RANGE.generous.taper });
  const worst = councilTaxReduction({ ...input, maxShare: CTR_SCHEME_RANGE.strict.maxShare, taper: CTR_SCHEME_RANGE.strict.taper });
  const m = (n: number) => gbp(n);
  const w = (n: number) => gbp(n, true);
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  const guarantee = v.couple ? HB_2026.personal.pensionCouple : HB_2026.personal.pensionSingle;
  const showPc = pension && !v.passport && !r.overCapital && r.income < guarantee;
  const showSpd = !v.couple && v.nondeps === 0 && r.leftToPay > 0.5;

  const steps: MeansStep[] = [
    { label: `The scheme pays up to ${pct(r.maxShare)} of the bill`, cut: r.weeklyBill * (1 - r.maxShare) },
    { label: "For other adults living with you", note: `${Math.round(v.nondeps)} non-dependant deduction${v.nondeps === 1 ? "" : "s"}`, cut: Math.min(r.nonDepDeduction, r.weeklyBill * r.maxShare) },
    { label: `${pct(r.taper)} of income above your applicable amount`, note: `Income ${w(r.income)} a week against ${w(r.applicableAmount)}`, cut: r.overCapital ? 0 : r.taperCut },
    { label: "Savings over £16,000", note: "Without Guarantee Credit, nothing is paid", cut: r.overCapital ? r.maximum : 0 },
  ];

  return (
    <Tool label="Council Tax Reduction calculator">
      <div className="sa-ct">
        <div className="sa-ct-route">
          <Inputs tone="plain">
            <div className="sa-ct-routeq">
              <Pills
                label="Who is claiming"
                value={v.age}
                onChange={st.bind("age")}
                options={[
                  { value: "pension", label: "State Pension age" },
                  { value: "working", label: "Working age" },
                ]}
              />
              <Pills
                label="Where you live"
                value={v.nation}
                onChange={st.bind("nation")}
                options={[
                  { value: "england", label: "England" },
                  { value: "wales", label: "Wales" },
                  { value: "scotland", label: "Scotland" },
                ]}
              />
              <Mini label="Council tax bill for the year" value={v.bill} onChange={st.bind("bill")} prefix="£" max={20_000} step={50} wide hint="After any discount, such as the 25% for living alone." />
            </div>
            <p className="sa-ct-routehint">
              {pension
                ? `Pensioners everywhere follow national rules: up to the whole bill, falling by ${pct(CTR_2026.taper)} of income above your needs.`
                : local
                  ? "In England each council sets its own working-age scheme, so the answer is a range until you enter your council's figures."
                  : `${NATION_LABEL[v.nation]} has one national scheme for everyone, paying up to the whole bill.`}
            </p>
          </Inputs>
        </div>

        <div className="sa-ct-inputs">
          <Inputs tone="plain">
            <h2 className="sa-ct-h">You and your income</h2>
            <HouseholdFields v={v} set={st.set} passportLabel={pension ? "I get Pension Credit Guarantee Credit" : "I get income-based JSA, income-related ESA or Income Support"} />
            {local && (
              <div className="sa-ct-dials">
                <h2 className="sa-ct-h">Your council&rsquo;s scheme</h2>
                <div className="sa-ct-dialrow">
                  <Mini label="Most it pays" value={v.maxPct} onChange={(n) => st.set("maxPct", Math.round(n))} suffix="% of the bill" max={100} step={5} stepper />
                  <Mini label="Taper" value={v.taperPct} onChange={(n) => st.set("taperPct", Math.round(n))} suffix="p per £1" max={100} step={1} stepper />
                </div>
                <p className="sa-ct-hint">Search &ldquo;council tax support scheme&rdquo; and your council&rsquo;s name: the scheme document states both. Some councils use income bands instead of a taper.</p>
              </div>
            )}
            <AdvancedOptions description="Other adults at home, disability, carers and childcare." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <MeansAdvancedFields v={v} set={st.set} />
            </AdvancedOptions>
          </Inputs>
        </div>

        <div className="sa-ct-result">
          <div className={`sa-ct-answer${r.annual > 0.5 ? "" : " is-none"}`} aria-live="polite">
            <p className="sa-ct-kicker">{local ? "Your council's scheme, as entered" : "Council Tax Reduction"}</p>
            <p className="sa-ct-big">
              <b>{m(r.annual)}</b> a year
            </p>
            <p className="sa-ct-sub">
              {r.overCapital
                ? "Savings over £16,000 rule you out, unless you get Pension Credit Guarantee Credit."
                : r.annual > 0.5
                  ? `${w(r.weekly)} a week off a ${m(v.bill)} bill. ${r.leftToPay > 0.5 ? `That leaves ${m(r.leftToPay)} to pay, about ${m(r.leftToPay / 12)} a month.` : "That covers the whole bill."}`
                  : `Your income is ${w(r.excess)} a week above what the scheme says you need.`}
            </p>
            {local && !r.overCapital && (
              <p className="sa-ct-range">
                Across English schemes: <b>{m(worst.annual)}</b> to <b>{m(best.annual)}</b> a year
              </p>
            )}
          </div>
          {local ? (
            <SchemeRange bill={v.bill} low={worst.annual} high={best.annual} yours={r.annual} money={m} />
          ) : (
            <MeansStatement
              start={r.weeklyBill}
              startLabel="Council tax a week"
              steps={steps}
              resultLabel="Council Tax Reduction a week"
              money={w}
              caption="How your Council Tax Reduction is worked out, week by week"
              note={
                v.passport
                  ? "On Guarantee Credit or a passport benefit, income is not checked."
                  : !r.overCapital && r.excess <= 0
                    ? `Your income of ${w(r.income)} a week is within your applicable amount of ${w(r.applicableAmount)}, so nothing is tapered.`
                    : undefined
              }
            />
          )}
        </div>

        {(showPc || showSpd) && (
          <div className="sa-ct-flags">
            {showPc && (
              <Flag title="You may be missing Pension Credit">
                Your income is under the {w(guarantee)} a week Guarantee Credit tops {v.couple ? "a couple" : "a single pensioner"} up to. If you qualify, it pays your whole council tax with no income check: try the{" "}
                <Link href="/uk/benefits/pension-credit">Pension Credit calculator</Link>.
              </Flag>
            )}
            {showSpd && (
              <Flag title="Living alone?">
                Take off the <Link href="/uk/property/single-person-discount">25% single person discount</Link>{" "}first and enter the bill after it: you can have both.
              </Flag>
            )}
          </div>
        )}

        <Foot>
          <Caveat>
            An estimate for 2026/27 using the national means test and DWP&rsquo;s Housing Benefit rates.{" "}
            {local ? "The range runs from a scheme like the pensioner one (100%, 20p) to a stricter one (70%, 25p); your council's scheme decides." : v.nation === "england" ? "Exact rules for England's pensioner scheme apart from rounding." : `${NATION_LABEL[v.nation]} sets its own figures, which are close to these.`}
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
