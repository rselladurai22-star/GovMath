"use client";

import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { ADVANCE_2026, STANDARD_LABEL, ucAdvance, type StandardKey } from "@/lib/benefits/uc-advance";
import RepaymentCalendar from "./RepaymentCalendar";

const KEYS = Object.keys(STANDARD_LABEL) as StandardKey[];

const SCHEMA = {
  who: oneOf<StandardKey>("single25", KEYS),
  estimate: num(1_125, 0, 10_000),
  advance: num(800, 0, 10_000),
  months: num(24, 1, 24),
  other: num(0, 0, 1_000),
};

export default function AdvanceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = ucAdvance({ estimate: v.estimate, advance: v.advance, months: v.months, standard: v.who, otherDeductions: v.other });
  const room = Math.max(0, r.cap - Math.max(0, v.other));
  // The largest advance that 24 months of repayments can carry inside the cap, to the pound below.
  const fits = Math.min(r.max, Math.floor(room * ADVANCE_2026.maxMonths));
  const none = r.advance <= 0;

  return (
    <Tool label="Universal Credit advance calculator">
      <div className="sa-adv">
        <div className="sa-adv-setup">
          <Inputs tone="plain">
            <div className="sa-adv-claim">
              <Mini label="Your first payment (estimate)" value={v.estimate} onChange={st.bind("estimate")} prefix="£" suffix="a month" max={10_000} step={25} dp={2} wide hint="The most you can borrow. It is on the statement in your journal." />
              <SelectField label="Claiming as" value={v.who} onChange={st.bind("who")} options={KEYS.map((k) => ({ value: k, label: STANDARD_LABEL[k] }))} />
              <Mini label="Already taken off each month" value={v.other} onChange={st.bind("other")} prefix="£" max={1_000} step={5} dp={2} wide hint="An overpayment, an old advance, a fine. They share the cap." />
            </div>
            <div className="sa-adv-sliders">
              <MoneyField label="Advance you ask for" value={Math.min(v.advance, r.max)} onChange={st.bind("advance")} big slider={{ min: 0, max: Math.max(100, Math.round(r.max)), step: 25, ends: ["£0", gbp(r.max)] }} />
              <StepperField label="Repay over" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={1} max={ADVANCE_2026.maxMonths} unit="months" dp={0} />
            </div>
          </Inputs>
        </div>

        <div className="sa-adv-answer" aria-live="polite">
          <p className="sa-adv-kicker">Taken from each payment</p>
          <p className="sa-adv-monthly">
            <b>{gbp(r.monthly, true)}</b> <span>{none ? "" : `for ${r.months} ${r.months === 1 ? "month" : "months"}`}</span>
          </p>
          <dl className="sa-adv-two">
            <div>
              <dt>Your Universal Credit while you repay</dt>
              <dd>{gbp(r.paymentAfter, true)}</dd>
            </div>
            <div className="is-after">
              <dt>{none ? "With no advance" : `After month ${r.months}`}</dt>
              <dd>{gbp(Math.max(0, r.max - Math.max(0, v.other)), true)}</dd>
            </div>
          </dl>
          {r.overCap && (
            <Flag tone="warn" title={`${gbp(r.totalDeductions - r.cap, true)} over the 15% cap`}>
              {r.minMonthsForCap !== null ? (
                <>
                  Spread over {r.minMonthsForCap} months it fits.{" "}
                  <button type="button" className="textbutton sa-adv-linkbutton" onClick={() => st.set("months", r.minMonthsForCap ?? v.months)}>
                    Set {r.minMonthsForCap} months
                  </button>
                </>
              ) : room <= 0 ? (
                <>What is already taken off uses the whole cap. Ask DWP how the advance would be recovered before you take it.</>
              ) : (
                <>
                  Even 24 months is not enough. {gbp(fits)} is the most that fits.{" "}
                  <button type="button" className="textbutton sa-adv-linkbutton" onClick={() => { st.set("advance", fits); st.set("months", ADVANCE_2026.maxMonths); }}>
                    Set {gbp(fits)} over 24 months
                  </button>
                </>
              )}
            </Flag>
          )}
        </div>

        <div className="sa-adv-calpanel">
          <RepaymentCalendar months={r.months} monthly={r.monthly} other={Math.max(0, v.other)} cap={r.cap} during={r.paymentAfter} after={Math.max(0, r.max - Math.max(0, v.other))} />
          <ul className="sa-adv-legend" aria-hidden="true">
            <li>
              <i className="is-advance" />
              Advance repayment
            </li>
            {v.other > 0 && (
              <li>
                <i className="is-other" />
                Already taken off
              </li>
            )}
            {r.overCap && (
              <li>
                <i className="is-over" />
                Over the cap
              </li>
            )}
          </ul>
        </div>

        <Foot>
          <Caveat>
            Exact arithmetic at 2026/27 rates: no interest, equal repayments from your first payment. DWP decides how much to lend, and your Universal Credit itself will move with your earnings and rent.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
