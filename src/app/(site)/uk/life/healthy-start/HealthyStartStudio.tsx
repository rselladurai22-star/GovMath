"use client";

import { HEALTHY_START, healthyStartEligible, healthyStartOver, healthyStartPregnancyOnly } from "@/lib/life/health";
import { Caveat, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Benefit = "uc-low" | "uc-high" | "other" | "esa" | "none";
type Main = "uc" | "other" | "esa" | "none";

const SCHEMA = {
  benefit: oneOf<Benefit>("uc-low", ["uc-low", "uc-high", "other", "esa", "none"]),
  pregnant: bool(false),
  weeks: num(14, 0, 42),
  kids: num(1, 0, 4),
  age1: num(6, 0, 59),
  age2: num(30, 0, 59),
  age3: num(30, 0, 59),
  age4: num(30, 0, 59),
  under18: bool(false),
  scot: bool(false),
};
const AGE_KEYS = ["age1", "age2", "age3", "age4"] as const;
const LIMIT = HEALTHY_START.ucEarningsLimit;
const p = (n: number) => gbp(n, true);
const ageText = (months: number) => (months < 12 ? `${months} month${months === 1 ? "" : "s"}` : `${Math.floor(months / 12)} year${months >= 24 ? "s" : ""}${months % 12 ? ` ${months % 12} month${months % 12 === 1 ? "" : "s"}` : ""}`);

export default function HealthyStartStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const main: Main = v.benefit === "uc-low" || v.benefit === "uc-high" ? "uc" : v.benefit;
  const ages = AGE_KEYS.slice(0, Math.round(v.kids)).map((k) => Math.round(v[k]));
  const under4 = ages.filter((a) => a < 48);
  const q = {
    ucLowEarnings: v.benefit === "uc-low",
    otherBenefit: v.benefit === "other",
    esa: v.benefit === "esa",
    under18: v.under18,
    pregnant: v.pregnant,
    hasChildUnder4: under4.length > 0,
  };
  const eligible = healthyStartEligible(q);
  const pregOnly = healthyStartPregnancyOnly(q);
  const pregWeeks = v.pregnant ? Math.max(1, Math.round(v.weeks)) : 0;
  const year = healthyStartOver(52, under4, pregWeeks, pregOnly);
  const weekly = eligible ? year.weekly[0] : 0;
  const changeAt = year.weekly.findIndex((w) => Math.abs(w - year.weekly[0]) > 0.005);
  const changeWeek = pregWeeks + changeAt;
  const changeReason =
    v.pregnant && changeWeek === HEALTHY_START.pregnancyFromWeek
      ? "when the pregnancy payments start"
      : v.pregnant && changeWeek === 40
        ? "when the baby is due"
        : (() => {
            // The same arithmetic as healthyStartOver: a child crosses 1 (or 4) in the first week where months reach 12 (or 48).
            const at = (a: number, months: number) => Math.ceil(((months - a) * 52) / 12);
            const i = under4.findIndex((a) => (a < 12 && at(a, 12) === changeAt) || at(a, 48) === changeAt);
            const turns = i >= 0 && under4[i] < 12 && at(under4[i], 12) === changeAt ? 1 : 4;
            return i >= 0 ? `when ${under4.length > 1 ? `child ${i + 1}` : "your child"} turns ${turns}` : "as a child has a birthday";
          })();

  const lines: { label: string; weekly: number }[] = [];
  if (v.pregnant && pregWeeks >= HEALTHY_START.pregnancyFromWeek && pregWeeks < 40) lines.push({ label: "Your pregnancy", weekly: HEALTHY_START.pregnancy });
  if (!pregOnly)
    under4.forEach((a, i) => lines.push({ label: `Child ${i + 1}, ${ageText(a)}`, weekly: a < 12 ? HEALTHY_START.under1 : HEALTHY_START.age1to4 }));
  const nobody = !v.pregnant && under4.length === 0;
  const waitWeeks = v.pregnant && pregWeeks < HEALTHY_START.pregnancyFromWeek ? HEALTHY_START.pregnancyFromWeek - pregWeeks : 0;

  const why = nobody
    ? "Healthy Start is for people more than 10 weeks pregnant or with a child under 4."
    : v.benefit === "uc-high"
      ? `On Universal Credit, your family's take-home pay from work must be ${gbp(LIMIT)} a month or less.`
      : v.benefit === "esa"
        ? "Income-related ESA on its own only qualifies during pregnancy."
        : "You need one of the qualifying benefits, unless you are pregnant and under 18.";

  return (
    <Tool label="Healthy Start calculator">
      <div className="sa-hs">
        <div className="sa-hs-inputs">
          <Inputs tone="plain">
            <Pills
              label="Where you live"
              value={v.scot ? "scot" : "ewni"}
              onChange={(x) => st.set("scot", x === "scot")}
              options={[
                { value: "ewni", label: "England, Wales or NI" },
                { value: "scot", label: "Scotland" },
              ]}
            />
            <ol className="sa-hs-qs">
              <li>
                <p className="sa-hs-q">Are you pregnant, or do you have children under 4?</p>
                <Switch label="I am pregnant" checked={v.pregnant} onChange={st.bind("pregnant")} />
                <div className="sa-hs-fields">
                  {v.pregnant && <Mini label="Weeks pregnant" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} min={1} max={42} stepper />}
                  <Mini label="Children under 4" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} min={0} max={4} stepper />
                </div>
                {v.kids > 0 && (
                  <div className="sa-hs-ages">
                    {AGE_KEYS.slice(0, Math.round(v.kids)).map((k, i) => (
                      <Mini key={k} label={`Child ${i + 1}, age in months`} value={v[k]} onChange={(n) => st.set(k, Math.round(n))} min={0} max={47} stepper />
                    ))}
                  </div>
                )}
                {v.pregnant && <Switch label="I am under 18" checked={v.under18} onChange={st.bind("under18")} hint="Pregnant under-18s qualify without a benefit, until the baby is born." />}
              </li>
              {!v.scot && (
                <li>
                  <p className="sa-hs-q">Which of these do you get?</p>
                  <SelectField
                    label="Benefit"
                    value={main}
                    onChange={(x) => st.set("benefit", x === "uc" ? (v.benefit === "uc-high" ? "uc-high" : "uc-low") : x)}
                    options={[
                      { value: "uc", label: "Universal Credit" },
                      { value: "other", label: "Pension Credit with a child addition, Income Support or income-based JSA" },
                      { value: "esa", label: "Income-related ESA only" },
                      { value: "none", label: "None of these" },
                    ]}
                  />
                </li>
              )}
              {!v.scot && main === "uc" && (
                <li>
                  <p className="sa-hs-q">Is your family&rsquo;s take-home pay from work {gbp(LIMIT)} a month or less?</p>
                  <Pills
                    label={`Take-home pay ${gbp(LIMIT)} a month or less`}
                    hideLabel
                    value={v.benefit === "uc-high" ? "no" : "yes"}
                    onChange={(x) => st.set("benefit", x === "yes" ? "uc-low" : "uc-high")}
                    options={[
                      { value: "yes", label: `Yes, ${gbp(LIMIT)} or less` },
                      { value: "no", label: "No, more" },
                    ]}
                  />
                  <p className="sa-hs-hint">Earnings after tax and National Insurance, for you and your partner together, as shown on your Universal Credit statement. Benefits do not count.</p>
                </li>
              )}
            </ol>
          </Inputs>
        </div>

        <div className="sa-hs-result" aria-live="polite">
          {v.scot ? (
            <div className="sa-hs-card is-off">
              <p className="sa-hs-cardtop">Scotland</p>
              <p className="sa-hs-cardbig">Best Start Foods</p>
              <p className="sa-hs-cardsub">Healthy Start does not run in Scotland. Social Security Scotland pays Best Start Foods instead, onto a similar card, with its own rules and rates.</p>
              <a className="sa-hs-cardlink" href="https://www.mygov.scot/best-start-grant-best-start-foods" target="_blank" rel="noopener noreferrer">
                Check Best Start Foods on mygov.scot
              </a>
            </div>
          ) : eligible && weekly > 0 ? (
            <>
              <div className="sa-hs-card" role="group" aria-label={`Healthy Start card: ${p(weekly * 4)} added every 4 weeks`}>
                <p className="sa-hs-cardtop">Your Healthy Start card</p>
                <p className="sa-hs-cardbig">{p(weekly * 4)}</p>
                <p className="sa-hs-cardsub">added every 4 weeks ({p(weekly)} a week)</p>
                <ul className="sa-hs-lines">
                  {lines.map((l) => (
                    <li key={l.label}>
                      <span>{l.label}</span>
                      <b>{p(l.weekly * 4)}</b>
                    </li>
                  ))}
                </ul>
                <span className="sa-hs-chip" aria-hidden="true" />
              </div>
              <p className="sa-hs-year">
                About <b>{gbp(year.total)}</b> over the next 12 months, plus free vitamins.
                {changeAt > 0 && (
                  <>
                    {" "}
                    In about {changeAt} weeks it {year.weekly[changeAt] > weekly ? "rises" : "falls"} to {p(year.weekly[changeAt] * 4)} every 4 weeks, {changeReason}.
                  </>
                )}
                {pregOnly && " This claim covers the pregnancy only: it ends when the baby is born unless you then get a qualifying benefit, so reapply then."}
              </p>
            </>
          ) : eligible && waitWeeks > 0 ? (
            <div className="sa-hs-card is-off">
              <p className="sa-hs-cardtop">Your Healthy Start card</p>
              <p className="sa-hs-cardbig">Not yet</p>
              <p className="sa-hs-cardsub">
                Pregnancy payments of {p(HEALTHY_START.pregnancy * 4)} every 4 weeks start from the 10th week, in {waitWeeks} {waitWeeks === 1 ? "week" : "weeks"}. You can apply now.
              </p>
            </div>
          ) : (
            <div className="sa-hs-card is-off">
              <p className="sa-hs-cardtop">Healthy Start</p>
              <p className="sa-hs-cardbig">Not on these answers</p>
              <p className="sa-hs-cardsub">{why}</p>
            </div>
          )}
        </div>

        <Foot>
          <Caveat>
            Exact card amounts at the rates from April 2026, for England, Wales and Northern Ireland. Ages are rounded to whole months, so a change can come a week or two either side. NHSBSA checks your benefits before paying.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
