"use client";

import { hicbc, hicbcPayer } from "@/lib/benefits/family";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Flag, Foot, Inputs, Rows, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { AdvancedOptions } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import IncomeLine from "./IncomeLine";

const SCHEMA = {
  children: num(2, 1, 15),
  income: num(70_000, 0, 10_000_000),
  pension: num(0, 0, 10_000_000),
  gift: num(0, 0, 10_000_000),
  partner: num(0, 0, 10_000_000),
  weeks: num(52, 1, 52),
  rates: ratesParam(),
};
const ADVANCED = ["gift", "partner", "weeks"] as const;

export default function HicbcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const year = v.rates;
  const next = year === "2027/28";
  const n = Math.max(1, Math.round(v.children));
  const shared = { children: n, weeks: v.weeks, year };
  const mine = hicbc({ ...shared, income: v.income, pension: v.pension, giftAid: v.gift });
  // Where the income would sit with no pension contributions (Gift Aid still taken off).
  const noPension = hicbc({ ...shared, income: v.income, pension: 0, giftAid: v.gift });
  const partnerPays = hicbcPayer(mine.adjustedNetIncome, v.partner) === "partner";
  const theirs = hicbc({ ...shared, income: v.partner, pension: 0, giftAid: 0 });
  const r = partnerPays ? theirs : mine;
  const saved = noPension.charge - mine.charge;
  const partYear = v.weeks < 52;
  const period = partYear ? `for ${v.weeks} ${v.weeks === 1 ? "week" : "weeks"}` : "for the year";

  const setBefore = (x: number) => st.set("income", Math.max(0, x + v.gift));
  const setAfter = (x: number) => st.set("pension", Math.max(0, Math.round(noPension.adjustedNetIncome - x)));

  return (
    <Tool label="High Income Child Benefit Charge calculator">
      <div className="sa-hicbc">
        <div className="sa-hicbc-answer" aria-live="polite">
          <p className="sa-hicbc-kicker">
            {partnerPays ? "Your partner’s charge" : "Your charge"} {period}
            {next ? ", at April 2027 rates (proposed)" : ""}
          </p>
          <p className="sa-hicbc-charge">
            <b>{gbp(r.charge)}</b>
            <span>
              {r.band === "none" ? "nothing to pay back" : r.band === "full" ? "all of your Child Benefit" : `${percent(r.share, 0)} of your Child Benefit`}
            </span>
          </p>
          <Rows
            caption="Child Benefit received, the charge and what you keep"
            rows={[
              { label: `Child Benefit for ${n} ${n === 1 ? "child" : "children"}`, value: gbp(r.benefit, true) },
              { label: "Charge", note: r.band === "partial" ? `${gbp(r.adjustedNetIncome - 60_000)} over £60,000, at 1% for every £200` : undefined, value: r.charge > 0 ? `−${gbp(r.charge)}` : gbp(0), tone: r.charge > 0 ? "bad" : undefined },
              { label: "You keep", value: gbp(r.keep, true), strong: true, tone: "good" },
            ]}
          />
          {partnerPays ? (
            <Flag title="Your partner pays, not you">
              Their {gbp(v.partner)} is higher than your {gbp(mine.adjustedNetIncome)}, so the charge is worked out on their income and goes on their tax bill. A pension contribution only helps if they make it.
            </Flag>
          ) : (
            <>
              {saved > 0 && (
                <Flag tone="good" title={`Your pension contributions save ${gbp(saved)}`}>
                  Without them the charge would be {gbp(noPension.charge)}.
                </Flag>
              )}
              {mine.band !== "none" && (
                <div className="sa-hicbc-fix">
                  <p>
                    {gbp(mine.pensionToAvoid)} more into a pension would bring your income to £60,000 and remove the charge.
                  </p>
                  <button type="button" className="textbutton sa-hicbc-linkbutton" onClick={() => st.set("pension", Math.round(v.pension + mine.pensionToAvoid))}>
                    Show me that
                  </button>
                </div>
              )}
              {mine.band === "partial" && (
                <p className="sa-hicbc-margin">
                  Your next £1,000 of pay costs <b>{gbp(mine.marginalRate * 1000)}</b> in Income Tax, National Insurance and extra charge.
                </p>
              )}
            </>
          )}
        </div>

        <div className="sa-hicbc-main">
          <h2 className="sa-hicbc-h">Where {partnerPays ? "your income sits" : "you sit"} between £60,000 and £80,000</h2>
          <p className="sa-hicbc-hint">Drag your income along the line. Drag the green marker left to see what a pension contribution does.</p>
          <IncomeLine
            before={{ income: noPension.adjustedNetIncome, share: noPension.share, charge: noPension.charge }}
            after={{ income: mine.adjustedNetIncome, share: mine.share, charge: mine.charge }}
            onBefore={setBefore}
            onAfter={setAfter}
            partner={partnerPays ? v.partner : undefined}
            whose="Your"
          />
          <Inputs tone="plain">
            <div className="sa-hicbc-fields">
              <Mini label="Children" value={n} onChange={(x) => st.set("children", Math.max(1, Math.round(x)))} min={1} max={15} stepper />
              <Mini
                label="Your income a year"
                value={v.income}
                onChange={st.bind("income")}
                prefix="£"
                step={500}
                wide
                hint="Before tax: pay after any salary sacrifice, profit, rent, interest and dividends."
              />
              <Mini
                label="Pension contributions a year"
                value={v.pension}
                onChange={st.bind("pension")}
                prefix="£"
                step={500}
                wide
                hint="From your own pocket, plus the 20% your provider adds. Leave out salary sacrifice."
              />
            </div>
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
            <AdvancedOptions description="Gift Aid, your partner’s income and a part-year claim." changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
              <div className="sa-hicbc-fields">
                <Mini label="Gift Aid donations a year" value={v.gift} onChange={st.bind("gift")} prefix="£" step={100} wide hint="What you gave plus the 25% the charity claims." />
                <Mini label="Partner’s adjusted net income" value={v.partner} onChange={st.bind("partner")} prefix="£" step={500} wide hint="Whoever has the higher income pays." />
                <Mini label="Weeks of Child Benefit this tax year" value={v.weeks} onChange={(x) => st.set("weeks", Math.max(1, Math.round(x)))} min={1} max={52} suffix="of 52" stepper />
              </div>
            </AdvancedOptions>
          </Inputs>
        </div>

        <Foot>
          <Caveat>
            Exact for the adjusted net income you enter: the law rounds the charge down to whole pounds. {next ? "Uses the proposed Child Benefit rates from 6 April 2027 (Budget 2026)." : "2026/27 Child Benefit rates."} It leaves out
            trading losses and other less common reliefs.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
