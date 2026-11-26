"use client";

import Link from "next/link";
import { Caveat, Flag, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { NI_SCHEMA, SE_SCHEMA, TaxYearCards, niTest, useToday } from "@/components/benefits/TaxYearCards";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { newStyleEsa, newStyleRates, type EsaGroup } from "@/lib/benefits/new-style";
import EsaTimeline from "./EsaTimeline";

// Keys kept from the earlier calculator, so old share links still work.
const SCHEMA = {
  age: oneOf<"over25" | "under25">("over25", ["over25", "under25"]),
  group: oneOf<EsaGroup>("assessment", ["assessment", "wrag", "support"]),
  ...NI_SCHEMA,
  ...SE_SCHEMA,
  pension: num(0, 0, 5_000),
  earnings: num(0, 0, 5_000),
  hours: num(0, 0, 60),
  pre2017: bool(false),
  rates: ratesParam(),
};
const MORE = ["pension", "earnings", "hours", "pre2017"] as const;
const GROUP: Record<EsaGroup, string> = { assessment: "assessment phase", wrag: "work-related activity group", support: "support group" };

export default function EsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  const claimDate = v.claim || today;
  const t = niTest(v, claimDate, "esa");
  const next = v.rates === "2027/28";
  const E = newStyleRates(v.rates).esa;
  const over25 = v.age === "over25";
  const at = (group: EsaGroup) => newStyleEsa({ over25, group, pre2017: v.pre2017, pension: v.pension, earnings: v.earnings, hours: v.hours, year: v.rates });
  const r = at(v.group);
  const paid = t.met && r.permittedWorkOk;
  const weekly = paid ? r.weekly : 0;
  const m = (n: number) => gbp(n, true);
  const short = t.detail.filter((y) => !y.bOk).map((y) => y.label);

  const rows: Row[] = [
    { label: v.group === "assessment" ? `Assessment rate${over25 ? "" : " (under 25)"}` : "Main phase rate", value: m(r.basic) },
    ...(r.component > 0 ? [{ label: r.componentLabel ?? "Component", value: `+${m(r.component)}` }] : []),
    ...(r.pensionDeduction > 0 ? [{ label: `Half of your pension over ${gbp(E.pensionThreshold)} a week`, value: `−${m(r.pensionDeduction)}`, tone: "bad" as const }] : []),
    ...(!paid && r.weekly > 0 ? [{ label: t.met ? "Over the permitted work limits" : "National Insurance test not met", value: `−${m(r.weekly)}`, tone: "bad" as const }] : []),
    { label: "New Style ESA a week", value: m(weekly), strong: true },
  ];

  return (
    <Tool label="New Style ESA calculator">
      <div className="sa-ns sa-esa">
        <div className="sa-ns-top">
          <div className={`sa-ns-verdict${paid ? " is-yes" : " is-no"}`} aria-live="polite">
            <p className="sa-ns-kicker">{paid ? `You qualify${next ? " (April 2027 rates, proposed)" : ""}` : t.met ? "Your record qualifies, but nothing is paid" : "Not on this National Insurance record"}</p>
            <p className="sa-ns-amount">
              <b>{m(weekly)}</b> <span>a week</span>
            </p>
            <p className="sa-ns-sub">
              {!t.met ? (
                !t.conditionA ? (
                  <>Neither year has enough paid National Insurance. You need at least 26 weeks of pay at {gbp(t.detail[1].lel)} a week or more in one of them.</>
                ) : (
                  <>
                    {short.join(" and ")} {short.length === 1 ? "falls" : "fall"} short of the paid-or-credited test. Credits for sickness, caring or Universal Credit often fill a gap: check your record.
                  </>
                )
              ) : !r.permittedWorkOk ? (
                <>
                  Your work is over the permitted work limits ({gbp(E.permittedWorkLower)} a week at any hours, or under 16 hours and up to {m(E.permittedWorkHigher)}), so ESA would stop.
                </>
              ) : weekly === 0 ? (
                <>Your pension takes the whole amount, but you would still get National Insurance credits.</>
              ) : (
                <>
                  Paid as {m(weekly * 2)} every two weeks in the {GROUP[v.group]}.{" "}
                  {v.group === "assessment" ? `If the assessment puts you in the support group it rises to ${m(at("support").weekly)}.` : v.group === "support" ? "There is no time limit." : "It stops 365 days after your claim began."}
                </>
              )}
            </p>
            {!t.met && (
              <p className="sa-ns-alt">
                <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}does not depend on National Insurance and can include a health element.
              </p>
            )}
          </div>

          <div className="sa-ns-claim">
            <Inputs tone="plain">
              <div className="sa-ns-pills">
                <Pills
                  label="Your age"
                  value={v.age}
                  onChange={st.bind("age")}
                  options={[
                    { value: "under25", label: "Under 25" },
                    { value: "over25", label: "25 or over" },
                  ]}
                />
                <Pills
                  label="Stage of your claim"
                  value={v.group}
                  onChange={st.bind("group")}
                  options={[
                    { value: "assessment", label: "Assessment" },
                    { value: "wrag", label: "Work-related" },
                    { value: "support", label: "Support" },
                  ]}
                />
              </div>
            </Inputs>
            <EsaTimeline group={v.group} assessment={at("assessment").weekly} wrag={at("wrag").weekly} support={at("support").weekly} money={m} paid={paid} />
          </div>
        </div>

        <h2 className="sa-ns-h">Your National Insurance record</h2>
        <TaxYearCards v={v} set={(k, x) => st.set(k as keyof typeof SCHEMA, x as never)} t={t} claimDate={claimDate} benefit="esa" dateLabel="Date you became too ill to work" />

        <div className="sa-ns-bottom">
          <Inputs tone="plain">
            <AdvancedOptions description="A pension, permitted work, a claim from before April 2017." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <div className="sa-ns-more">
                <Mini label="Private or workplace pension" value={v.pension} onChange={st.bind("pension")} prefix="£" suffix="a week" dp={2} step={5} wide hint={`Before tax. Half of anything over ${gbp(E.pensionThreshold)} comes off.`} />
                <Mini label="Pay from permitted work" value={v.earnings} onChange={st.bind("earnings")} prefix="£" suffix="a week" dp={2} step={5} wide />
                <Mini label="Hours of that work" value={v.hours} onChange={(x) => st.set("hours", x)} min={0} max={60} stepper suffix="a week" />
              </div>
              <Switch label="My claim started before 3 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} hint={`Older claims in the work-related activity group keep the ${m(E.wrac)} component.`} />
            </AdvancedOptions>
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
          </Inputs>
          <div className="sa-ns-sums">
            <Rows caption="How your weekly amount is worked out" rows={rows} />
            {paid && (
              <p className="sa-ns-uc">
                Universal Credit counts it as {m(r.monthlyForUc)} a month of income.
              </p>
            )}
          </div>
        </div>

        {paid && v.group === "wrag" && (
          <Flag title="The 365-day limit">If your condition gets worse, ask to be reassessed before the year runs out: the support group has no time limit.</Flag>
        )}

        <Foot>
          <Caveat>
            An estimate at {next ? "DWP’s proposed rates from 6 April 2027" : "2026/27 rates"}. The National Insurance check assumes steady pay in the weeks you worked; DWP decides from your actual record, and the Work Capability Assessment decides the group.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
