"use client";

import { useState } from "react";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { PIP_ACTIVITIES, letterOf, pipRates, pipScore, resolveCode, type PipBand } from "@/lib/benefits/pip-assessment";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { AdvancedOptions, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import PipMeters from "./PipMeters";

const CODES = ["a", "b", "c", "d", "e", "f", "g"] as const;
type Code = (typeof CODES)[number];
const pick = () => oneOf<Code>("a", CODES);

// Keys kept from the earlier calculator, so old share links still work.
const SCHEMA = {
  food: pick(),
  eating: pick(),
  therapy: pick(),
  washing: pick(),
  toilet: pick(),
  dressing: pick(),
  speaking: pick(),
  reading: pick(),
  people: pick(),
  money: pick(),
  journeys: pick(),
  moving: pick(),
  terminal: bool(false),
  monthsHad: num(6, 0, 600),
  carer: bool(false),
  rates: ratesParam(),
};
type ActivityKey = Exclude<keyof typeof SCHEMA, "terminal" | "monthsHad" | "carer" | "rates">;
const MORE = ["terminal", "monthsHad"] as const;

export default function PipStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const next = v.rates === "2027/28";
  const R = pipRates(v.rates);
  const choices = Object.fromEntries(PIP_ACTIVITIES.map((a) => [a.id, v[a.id as ActivityKey]]));
  const sc = pipScore(choices, v.rates);
  // Special rules (nearing the end of life): the enhanced daily living rate without points.
  const dailyBand: PipBand = v.terminal ? "enhanced" : sc.dailyBand;
  const dailyWeekly = dailyBand === "none" ? 0 : R.daily[dailyBand];
  const weekly = dailyWeekly + sc.mobilityWeekly;
  const m = (n: number) => gbp(n, true);
  const tooSoon = !v.terminal && v.monthsHad < 3 && weekly > 0;
  const toggle = (id: string) =>
    setOpen((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  const allOpen = open.size === PIP_ACTIVITIES.length;

  const group = (component: "daily" | "mobility", first: number) =>
    PIP_ACTIVITIES.filter((a) => a.component === component).map((a, i) => {
      const chosen = resolveCode(a.id, v[a.id as ActivityKey]);
      const d = a.descriptors.find((x) => x.code === chosen) ?? a.descriptors[0];
      const isOpen = open.has(a.id);
      const n = first + i;
      return (
        <li key={a.id} className={`sa-pip-act${isOpen ? " is-open" : ""}${d.points > 0 ? " has-points" : ""}`}>
          <h4>
            <button type="button" id={`pip-${a.id}-head`} aria-expanded={isOpen} aria-controls={`pip-${a.id}-panel`} onClick={() => toggle(a.id)}>
              <span className="sa-pip-num">{n}</span>
              <span className="sa-pip-title">
                {a.title}
                <small>{d.points > 0 ? `${letterOf(d)}. ${d.text}` : "No difficulty chosen"}</small>
              </span>
              <span className="sa-pip-pts">
                {d.points} <small>{d.points === 1 ? "pt" : "pts"}</small>
              </span>
            </button>
          </h4>
          <div id={`pip-${a.id}-panel`} role="region" aria-labelledby={`pip-${a.id}-head`} hidden={!isOpen}>
            <fieldset className="sa-pip-choices">
              <legend className="sr-only">{a.title}: the descriptor that applies on more than half of days</legend>
              {a.descriptors.map((x) => (
                <label key={x.code} className={x.code === d.code ? "is-on" : undefined}>
                  <input type="radio" name={`pip-${a.id}`} value={x.code} checked={x.code === d.code} onChange={() => st.set(a.id as ActivityKey, x.code as Code)} />
                  <span className="sa-pip-letter">{letterOf(x)}</span>
                  <span className="sa-pip-text">{x.text}</span>
                  <span className="sa-pip-p">{x.points}</span>
                </label>
              ))}
            </fieldset>
          </div>
        </li>
      );
    });

  return (
    <Tool label="PIP points calculator">
      <div className="sa-pip">
        <aside className="sa-pip-panel" aria-label="Your PIP score">
          <div className="sa-pip-total" aria-live="polite">
            <p>PIP a week{next ? " from April 2027 (proposed)" : ""}</p>
            <b>{m(weekly)}</b>
            <span>{weekly > 0 ? `${m(weekly * 4)} every four weeks, ${gbp(weekly * 52)} a year` : "8 points in either part starts an award"}</span>
          </div>
          <PipMeters daily={sc.daily} mobility={sc.mobility} dailyBand={dailyBand} mobilityBand={sc.mobilityBand} dailyWeekly={dailyWeekly} mobilityWeekly={sc.mobilityWeekly} money={m} terminal={v.terminal} />
          <ShareButton copied={st.copied} onClick={st.share} />
        </aside>

        <div className="sa-pip-main">
          <div className="sa-pip-intro">
            <p>
              For each activity, choose the line that applies to you on <b>more than half of days</b>, and only count what you can do safely, to a good standard, as often as you
              need to and in no more than twice the usual time.
            </p>
            <button type="button" className="textbutton gm-share-link" onClick={() => setOpen(allOpen ? new Set() : new Set(PIP_ACTIVITIES.map((a) => a.id)))}>
              {allOpen ? "Close all activities" : "Open all activities"}
            </button>
          </div>

          <h3 className="sa-pip-h">
            Daily living <span>10 activities · {sc.daily} points</span>
          </h3>
          <ol className="sa-pip-list">{group("daily", 1)}</ol>
          <h3 className="sa-pip-h">
            Mobility <span>2 activities · {sc.mobility} points</span>
          </h3>
          <ol className="sa-pip-list">{group("mobility", 11)}</ol>

          {tooSoon && (
            <Flag tone="warn" title="The required period">
              You normally need to have had these difficulties for 3 months and expect them to last at least 9 more. You can start a claim during the 3 months.
            </Flag>
          )}

          <Inputs tone="plain">
            <AdvancedOptions description="Nearing the end of life, and how long you have had these difficulties." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <Switch label="I am nearing the end of life" checked={v.terminal} onChange={st.bind("terminal")} hint="Expected to live 12 months or less: the enhanced daily living rate is paid without an assessment." />
              <div className="sa-pip-months">
                <Mini label="Months you have had these difficulties" value={v.monthsHad} onChange={(x) => st.set("monthsHad", Math.round(x))} min={0} max={600} stepper />
              </div>
            </AdvancedOptions>
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
          </Inputs>
        </div>

        <Foot>
          <Caveat>
            A self-check against the descriptors in the regulations, at {next ? "DWP’s proposed rates from 6 April 2027" : "2026/27 rates"}. Only DWP can decide a claim, from your form, evidence and
            assessment.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
