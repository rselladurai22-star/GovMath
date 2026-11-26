"use client";

import { useState } from "react";
import { childBenefitFor, hicbc } from "@/lib/benefits/family";
import { childBenefitRates } from "@/lib/benefits/child-benefit";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Flag, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { MoneyField, Switch } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import KeptBar from "./KeptBar";

const SCHEMA = {
  children: num(2, 1, 15),
  weeks: num(52, 1, 52),
  income: num(0, 0, 10_000_000),
  stayHome: bool(false),
  rates: ratesParam(),
};

const ORDINAL = ["", "Eldest or only child", "2nd child", "3rd child", "4th child", "5th child", "6th child"];

export default function ChildBenefitStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const year = v.rates;
  const next = year === "2027/28";
  const CB = childBenefitRates(year);
  const n = Math.max(1, Math.round(v.children));
  const r = childBenefitFor(n, v.weeks, year);
  const partYear = v.weeks < 52;
  const [weeksOpen, setWeeksOpen] = useState(false);
  const asked = v.income > 0;
  const charge = asked ? hicbc({ children: n, income: v.income, pension: 0, giftAid: 0, weeks: v.weeks, year }) : null;

  const perChild: Row[] =
    n <= 6
      ? Array.from({ length: n }, (_, i) => ({ label: n === 1 ? "Your child" : ORDINAL[i + 1], value: gbp(i === 0 ? CB.firstChildWeekly : CB.additionalChildWeekly, true) }))
      : [
          { label: ORDINAL[1], value: gbp(CB.firstChildWeekly, true) },
          { label: `${n - 1} other children`, note: `${gbp(CB.additionalChildWeekly, true)} each`, value: gbp(CB.additionalChildWeekly * (n - 1), true) },
        ];

  return (
    <Tool label="Child Benefit calculator">
      <div className="sa-cb">
        <div className="sa-cb-band">
          <Inputs tone="plain">
            <div className="sa-cb-count">
              <Mini label="Children you claim for" value={n} onChange={(x) => st.set("children", Math.max(1, Math.round(x)))} min={1} max={15} stepper />
              <div className="sa-cb-kids" aria-hidden="true">
                {Array.from({ length: n }, (_, i) => (
                  <i key={i} className={i === 0 ? "is-eldest" : undefined} />
                ))}
              </div>
            </div>
          </Inputs>
          <div className="sa-cb-amounts" aria-live="polite">
            <p className="sa-cb-kicker">
              Child Benefit for {n} {n === 1 ? "child" : "children"}
              {next ? ", from April 2027 (proposed)" : ""}
            </p>
            <p className="sa-cb-week">
              <b>{gbp(r.weekly, true)}</b> <span>a week</span>
            </p>
            <div className="sa-cb-rest">
              <p>
                <b>{gbp(r.fourWeekly, true)}</b> <span>every four weeks, which is how it is paid</span>
              </p>
              <p>
                <b>{gbp(partYear ? r.forWeeks : r.annual, true)}</b> <span>{partYear ? `for ${v.weeks} ${v.weeks === 1 ? "week" : "weeks"} of this tax year` : "a year"}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="sa-cb-lower">
          <div className="sa-cb-ledger">
            <h3 className="sa-cb-h">Child by child, a week</h3>
            <Rows caption="Weekly Child Benefit for each child" rows={[...perChild, { label: "Total a week", value: gbp(r.weekly, true), strong: true }]} />
            <Inputs tone="plain">
              <RatesChoice value={v.rates} onChange={st.bind("rates")} />
              {partYear || weeksOpen ? (
                <div className="sa-cb-weeks">
                  <Mini label="Weeks you claim in this tax year" value={v.weeks} onChange={(x) => st.set("weeks", Math.max(1, Math.round(x)))} min={1} max={52} suffix="of 52" stepper hint="Fewer if a baby arrives, or a teenager leaves education, part-way through." />
                </div>
              ) : (
                <button type="button" className="textbutton sa-cb-linkbutton" onClick={() => setWeeksOpen(true)}>
                  Claiming for only part of the tax year?
                </button>
              )}
            </Inputs>
          </div>

          <div className={`sa-cb-charge${asked ? " is-open" : ""}`}>
            <Inputs tone="plain">
              <Switch label="Does anyone in the household earn over £60,000?" checked={asked} onChange={(on) => st.set("income", on ? 70_000 : 0)} />
              {asked && (
                <MoneyField
                  label="Higher earner’s income a year"
                  value={v.income}
                  onChange={st.bind("income")}
                  slider={{ min: 50_000, max: 90_000, step: 200, ends: ["£50,000", "£90,000"] }}
                  hint="Their taxable income before the Personal Allowance, less pension contributions and Gift Aid. Only the higher earner’s income counts, not the two added together."
                />
              )}
            </Inputs>
            {charge ? (
              <>
                <KeptBar keep={charge.keep} charge={charge.charge} share={charge.share} partYear={partYear} />
                {charge.band === "full" && (
                  <Flag title="The charge takes all of it">
                    Claim anyway and choose not to be paid. The claim still gives a parent who is not working National Insurance credits, and your child gets a National Insurance number at 16.
                  </Flag>
                )}
                {charge.band === "partial" && (
                  <p className="sa-cb-chargenote">
                    {percent(charge.share, 0)} is repaid: 1% for every £200 of income over £60,000. Paying {gbp(charge.pensionToAvoid)} more into a pension would bring income back to £60,000 and remove the charge.
                  </p>
                )}
                {charge.band === "none" && <p className="sa-cb-chargenote">At £60,000 or less there is no charge. You keep every pound.</p>}
              </>
            ) : (
              <p className="sa-cb-chargenote">If not, you keep all of it and can stop here.</p>
            )}
          </div>
        </div>

        {v.stayHome && (
          <Flag tone="good" title="A parent at home, or earning under £6,708">
            Put the claim in their name. It gives them National Insurance credits towards the State Pension until the youngest child is 12.
          </Flag>
        )}

        <Foot>
          <Caveat>
            {next ? "Proposed rates from 6 April 2027 (Budget 2026), final once Parliament approves them." : "Exact at the 2026/27 rates."} The charge figure is an estimate: it takes the income you enter as the higher earner’s
            adjusted net income.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
