"use client";

import Link from "next/link";
import { Caveat, Flag, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { NI_SCHEMA, TaxYearCards, niTest, useToday } from "@/components/benefits/TaxYearCards";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { newStyleJsa, newStyleRates } from "@/lib/benefits/new-style";
import WeeksBar from "./WeeksBar";

// Keys kept from the earlier calculator, so old share links still work.
const SCHEMA = {
  age: oneOf<"over25" | "under25">("over25", ["over25", "under25"]),
  ...NI_SCHEMA,
  pension: num(0, 0, 5_000),
  earnings: num(0, 0, 5_000),
  hours: num(0, 0, 60),
  left: bool(false),
  rates: ratesParam(),
};

export default function JsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  const claimDate = v.claim || today;
  const t = niTest(v, claimDate, "jsa");
  const next = v.rates === "2027/28";
  const J = newStyleRates(v.rates).jsa;
  const r = newStyleJsa({ over25: v.age === "over25", pension: v.pension, earnings: v.earnings, hours: v.hours, year: v.rates });
  const paid = t.met && !r.tooManyHours;
  const weekly = paid ? r.weekly : 0;
  const m = (n: number) => gbp(n, true);
  const short = t.detail.filter((y) => !y.bOk).map((y) => y.label);

  const rows: Row[] = [
    { label: `Personal rate${v.age === "under25" ? " (under 25)" : ""}`, value: m(r.personal) },
    { label: `Pension over ${gbp(J.pensionThreshold)} a week`, note: "Taken off £1 for £1", value: r.pensionDeduction > 0 ? `−${m(r.pensionDeduction)}` : m(0), tone: r.pensionDeduction > 0 ? "bad" : "muted" },
    { label: `Pay over ${gbp(J.earningsDisregard)} a week`, note: "Taken off £1 for £1", value: r.earningsDeduction > 0 ? `−${m(r.earningsDeduction)}` : m(0), tone: r.earningsDeduction > 0 ? "bad" : "muted" },
    ...(!paid && r.weekly > 0 ? [{ label: t.met ? `Working ${J.hoursLimit} hours or more` : "National Insurance test not met", value: `−${m(r.weekly)}`, tone: "bad" as const }] : []),
    { label: "New Style JSA a week", value: m(weekly), strong: true },
  ];

  return (
    <Tool label="New Style JSA calculator">
      <div className="sa-ns sa-jsa">
        <div className="sa-ns-top">
          <div className="sa-jsa-left">
            <div className={`sa-ns-verdict${paid && weekly > 0 ? " is-yes" : " is-no"}`} aria-live="polite">
              <p className="sa-ns-kicker">{paid ? `You qualify${next ? " (April 2027 rates, proposed)" : ""}` : t.met ? "Your record qualifies, but nothing is paid" : "Not on this National Insurance record"}</p>
              <p className="sa-ns-amount">
                <b>{m(weekly)}</b> <span>a week</span>
              </p>
              <p className="sa-ns-sub">
                {!t.met ? (
                  !t.conditionA ? (
                    <>Neither year has enough Class 1 National Insurance paid. You need at least 26 weeks of pay at {gbp(t.detail[1].lel)} a week or more in one of them.</>
                  ) : (
                    <>
                      {short.join(" and ")} {short.length === 1 ? "falls" : "fall"} short of the paid-or-credited test. Credits often fill a gap: check your record.
                    </>
                  )
                ) : r.tooManyHours ? (
                  <>Working {J.hoursLimit} hours a week or more stops New Style JSA, whatever you earn.</>
                ) : weekly === 0 ? (
                  <>Your pension and pay take the whole amount.</>
                ) : (
                  <>
                    <b>{gbp(r.total)}</b> over the full {J.weeks} weeks, paid as {m(weekly * 2)} every two weeks.
                  </>
                )}
              </p>
              {!t.met && (
                <p className="sa-ns-alt">
                  <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}depends on income and savings instead of National Insurance.
                </p>
              )}
            </div>
            <Rows caption="How your weekly amount is worked out" rows={rows} />
          </div>

          <div className="sa-ns-claim">
            <WeeksBar weekly={weekly} personal={r.personal} weeks={J.weeks} money={m} />
            <Inputs tone="plain">
              <div className="sa-jsa-while">
                <Pills
                  label="Your age"
                  value={v.age}
                  onChange={st.bind("age")}
                  options={[
                    { value: "under25", label: "Under 25" },
                    { value: "over25", label: "25 or over" },
                  ]}
                />
                <Mini label="Part-time pay" value={v.earnings} onChange={st.bind("earnings")} prefix="£" suffix="a week" dp={2} step={5} hint="After tax, NI and half of any pension contribution." />
                <Mini label="Hours worked" value={v.hours} onChange={(x) => st.set("hours", x)} min={0} max={60} stepper hint={`Under ${J.hoursLimit} a week.`} />
                <Mini label="Pension" value={v.pension} onChange={st.bind("pension")} prefix="£" suffix="a week" dp={2} step={5} hint="Private or workplace, before tax." />
              </div>
            </Inputs>
          </div>
        </div>

        <h2 className="sa-ns-h">Your National Insurance record</h2>
        <TaxYearCards v={v} set={(k, x) => st.set(k as keyof typeof SCHEMA, x as never)} t={t} claimDate={claimDate} benefit="jsa" dateLabel="Date you claim" />

        <div className="sa-ns-bottom sa-jsa-bottom">
          <Inputs tone="plain">
            <label className="sa-ns-left">
              <input type="checkbox" checked={v.left} onChange={(e) => st.set("left", e.target.checked)} />
              <span>I left my job voluntarily, or was dismissed for misconduct</span>
            </label>
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
          </Inputs>
          {v.left && (
            <Flag tone="warn" title="Payments can be stopped for a while">
              You can still claim, but unless you had a good reason DWP can stop payment for 13 weeks (26 weeks for a second time within a year). Explain your reason when you claim; this calculator does not
              take a sanction off.
            </Flag>
          )}
        </div>

        <Foot>
          <Caveat>
            An estimate at {next ? "DWP’s proposed rates from 6 April 2027" : "2026/27 rates"}. The National Insurance check assumes steady pay in the weeks you worked; DWP decides from your actual record. It leaves out sanctions and the higher £20 earnings disregard for some jobs.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
