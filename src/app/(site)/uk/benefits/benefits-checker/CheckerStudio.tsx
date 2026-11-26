"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { checkEligibility, type Disability, type Help, type Tenure } from "@/lib/benefits/eligibility";

// Keys kept from the earlier checker, so old share links still work.
const SCHEMA = {
  stage: oneOf<"working" | "pension">("working", ["working", "pension"]),
  couple: bool(false),
  under25: bool(false),
  kids: num(0, 0, 10),
  youngest: num(5, 0, 19),
  pregnant: bool(false),
  tenure: oneOf<Tenure>("private", ["private", "social", "own", "none"]),
  rent: num(750, 0, 10_000),
  earnings: num(0, 0, 50_000),
  other: num(0, 0, 50_000),
  savings: num(0, 0, 10_000_000),
  disability: oneOf<Disability>("none", ["none", "daily", "work", "both"]),
  carer: bool(false),
  worked: bool(true),
  childcare: num(0, 0, 5_000),
  highest: num(0, 0, 1_000_000),
  over80: bool(false),
  mixed: bool(false),
  nrpf: bool(false),
};

const STEPS = ["Household", "Age", "Children", "Home", "Money in", "Savings", "Health", "Caring", "Anything else"] as const;
const STATUS: Record<Help["status"], string> = { likely: "Likely", check: "Worth checking", unlikely: "Probably not" };

/** A list of choices as large radio cards, for questions with more than three answers. */
function Cards<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string; note?: string }[] }) {
  return (
    <fieldset className="sa-bc-cards">
      <legend className="sr-only">{label}</legend>
      {options.map((o) => (
        <label key={o.value} className={value === o.value ? "is-on" : undefined}>
          <input type="radio" name={label} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          <span>
            <b>{o.label}</b>
            {o.note && <small>{o.note}</small>}
          </span>
        </label>
      ))}
    </fieldset>
  );
}

function Tick({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="sa-bc-tick">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}

function amountOf(h: Help): string | null {
  if (h.monthly !== null) return `about ${gbp(h.monthly)} a month`;
  if (h.oneOff !== undefined) return h.key === "ssmg" ? `${gbp(h.oneOff)} once` : `${gbp(h.oneOff)} a year`;
  return null;
}

function Card({ h }: { h: Help }) {
  const amount = amountOf(h);
  return (
    <li className={`sa-bc-item is-${h.status}`}>
      <div className="sa-bc-itemhead">
        <span className="sa-bc-status">{STATUS[h.status]}</span>
        {amount && <b className="sa-bc-amt">{amount}</b>}
      </div>
      <h3>{h.href ? <Link href={h.href}>{h.name}</Link> : h.name}</h3>
      <p>{h.why}</p>
    </li>
  );
}

export default function CheckerStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  // A shared link opens on the answer; a fresh visit starts at the first question.
  const [step, setStep] = useState<number>(st.ready ? STEPS.length : 0);
  const head = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (moved.current) head.current?.focus();
  }, [step]);
  const go = (n: number) => {
    moved.current = true;
    setStep(n);
  };

  const pension = v.stage === "pension";
  const mixed = v.couple && v.mixed && !pension;
  const renting = v.tenure === "private" || v.tenure === "social";
  const r = checkEligibility({
    pensionAge: pension,
    over80: v.over80,
    couple: v.couple,
    over25: !v.under25,
    children: v.kids,
    youngest: v.youngest,
    pregnant: v.pregnant,
    tenure: v.tenure,
    rent: renting ? v.rent : 0,
    earnings: v.earnings,
    otherIncome: v.other,
    savings: v.savings,
    disability: v.disability,
    carer: v.carer,
    workedRecently: v.worked,
    childcare: v.childcare,
    highestIncome: v.highest,
    mixedAge: mixed,
    nrpf: v.nrpf,
  });
  const rank = (s: Help["status"]) => r.items.filter((x) => x.status === s).sort((a, b) => (b.monthly ?? (b.oneOff ?? 0) / 12) - (a.monthly ?? (a.oneOff ?? 0) / 12));
  const likely = rank("likely");
  const check = rank("check");
  const no = rank("unlikely");
  const done = step >= STEPS.length;
  const age = pension ? "pension" : mixed ? "mixed" : "working";
  const setAge = (x: string) => {
    st.set("stage", x === "pension" ? "pension" : "working");
    st.set("mixed", x === "mixed");
  };
  const they = v.couple ? "you or your partner" : "you";

  const question: ReactNode[] = [
    <>
      <p className="sa-bc-q">Do you live with a partner?</p>
      <Pills label="Do you live with a partner?" hideLabel value={v.couple ? "couple" : "single"} onChange={(x) => st.set("couple", x === "couple")} options={[{ value: "single", label: "No, just me" }, { value: "couple", label: "Yes, a partner" }]} />
      <p className="sa-bc-help">Married, civil partners or living together as a couple. Children come later.</p>
    </>,
    <>
      <p className="sa-bc-q">{v.couple ? "Have you and your partner reached State Pension age?" : "Have you reached State Pension age?"}</p>
      <Cards
        label="State Pension age"
        value={age}
        onChange={setAge}
        options={[
          { value: "working", label: v.couple ? "Neither of us" : "Not yet", note: "Under 66 (rising to 67 between 2026 and 2028)." },
          { value: "pension", label: v.couple ? "Both of us" : "Yes" },
          ...(v.couple ? [{ value: "mixed", label: "One of us has" }] : []),
        ]}
      />
      {!pension && (
        <div className="sa-bc-sub">
          <Tick checked={v.under25} onChange={st.bind("under25")}>
            {v.couple ? "We are both under 25" : "I am under 25"}
          </Tick>
        </div>
      )}
    </>,
    <>
      <p className="sa-bc-q">Do any children live with you?</p>
      <div className="sa-bc-row">
        <Mini label="Children" value={v.kids} onChange={(x) => st.set("kids", Math.round(x))} min={0} max={10} stepper hint="Under 16, or under 20 in school or college." />
        {v.kids > 0 && <Mini label="Age of the youngest" value={v.youngest} onChange={(x) => st.set("youngest", Math.round(x))} min={0} max={19} stepper suffix="years" />}
      </div>
      <Tick checked={v.pregnant} onChange={st.bind("pregnant")}>
        Someone in the household is pregnant
      </Tick>
    </>,
    <>
      <p className="sa-bc-q">What is your home?</p>
      <Cards
        label="Your home"
        value={v.tenure}
        onChange={st.bind("tenure")}
        options={[
          { value: "private", label: "I rent from a private landlord" },
          { value: "social", label: "I rent from the council or a housing association" },
          { value: "own", label: "I own it, with or without a mortgage" },
          { value: "none", label: "Something else", note: "For example living with family." },
        ]}
      />
      {renting && (
        <div className="sa-bc-row">
          <Mini label="Rent a month" value={v.rent} onChange={st.bind("rent")} prefix="£" max={10_000} step={25} wide hint="With service charges, without bills." />
        </div>
      )}
    </>,
    <>
      <p className="sa-bc-q">What comes in each month?</p>
      <div className="sa-bc-row">
        <Mini label={v.couple ? "Take-home pay, both of you" : "Take-home pay"} value={v.earnings} onChange={st.bind("earnings")} prefix="£" suffix="a month" max={50_000} step={50} wide hint="After tax and National Insurance." />
        <Mini label={pension || mixed ? "Pensions and other income" : "Other income"} value={v.other} onChange={st.bind("other")} prefix="£" suffix="a month" max={50_000} step={50} wide hint="Leave out Child Benefit and disability benefits." />
      </div>
      {!pension && (
        <Tick checked={v.worked} onChange={st.bind("worked")}>
          {v.couple ? "One of us" : "I"} worked as an employee at some point in the last 2 to 3 years
        </Tick>
      )}
    </>,
    <>
      <p className="sa-bc-q">How much do {v.couple ? "you both" : "you"} have in savings?</p>
      <div className="sa-bc-row">
        <Mini label="Savings and investments" value={v.savings} onChange={st.bind("savings")} prefix="£" max={10_000_000} step={500} wide hint="Not your home or a pension you have not taken." />
      </div>
    </>,
    <>
      <p className="sa-bc-q">Does a health condition or disability affect {they}?</p>
      <Cards
        label="Health"
        value={v.disability}
        onChange={st.bind("disability")}
        options={[
          { value: "none", label: "No" },
          { value: "daily", label: "It makes daily life or getting around harder" },
          { value: "work", label: "It stops me working, or limits the work I can do" },
          { value: "both", label: "Both of these" },
        ]}
      />
    </>,
    <>
      <p className="sa-bc-q">Do you look after someone for 35 hours a week or more?</p>
      <Pills label="Caring 35 hours a week" hideLabel value={v.carer ? "yes" : "no"} onChange={(x) => st.set("carer", x === "yes")} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]} />
      <p className="sa-bc-help">Someone who gets a disability benefit such as PIP daily living or Attendance Allowance.</p>
    </>,
    <>
      <p className="sa-bc-q">A few last details</p>
      <div className="sa-bc-row">
        {v.kids > 0 && <Mini label="Childcare costs" value={v.childcare} onChange={st.bind("childcare")} prefix="£" suffix="a month" max={5_000} step={25} wide hint="Registered childcare only." />}
        {v.kids > 0 && <Mini label="Highest earner's pay before tax" value={v.highest} onChange={st.bind("highest")} prefix="£" suffix="a year" max={1_000_000} step={1_000} wide />}
      </div>
      {pension && (
        <Tick checked={v.over80} onChange={st.bind("over80")}>
          {v.couple ? "One of us is" : "I am"} 80 or over
        </Tick>
      )}
      <Tick checked={v.nrpf} onChange={st.bind("nrpf")}>
        Someone&rsquo;s visa says &ldquo;no recourse to public funds&rdquo;
      </Tick>
    </>,
  ];

  return (
    <Tool label="Benefits checker">
      <div className="sa-bc">
        <ol className="sa-bc-progress" aria-label="Questions">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step ? "is-done" : i === step ? "is-now" : undefined}>
              <button type="button" onClick={() => go(i)} aria-current={i === step ? "step" : undefined} aria-label={`Question ${i + 1}: ${s}`}>
                <span aria-hidden="true">{s}</span>
              </button>
            </li>
          ))}
          <li className={done ? "is-now" : undefined}>
            <button type="button" onClick={() => go(STEPS.length)} aria-current={done ? "step" : undefined}>
              Results
            </button>
          </li>
        </ol>

        {!done ? (
          <div className="sa-bc-step">
            <h2 ref={head} tabIndex={-1} className="sa-bc-count">
              Question {step + 1} of {STEPS.length}
            </h2>
            <Inputs tone="plain" onSubmit={() => go(step + 1)}>
              {question[step]}
              <div className="sa-bc-nav">
                {step > 0 && (
                  <button type="button" className="sa-bc-back" onClick={() => go(step - 1)}>
                    Back
                  </button>
                )}
                <button type="submit" className="sa-bc-next">
                  {step === STEPS.length - 1 ? "See what I could get" : "Next"}
                </button>
                <button type="button" className="sa-bc-skip" onClick={() => go(STEPS.length)}>
                  Skip to results
                </button>
              </div>
            </Inputs>
          </div>
        ) : (
          <div className="sa-bc-results" aria-live="polite">
            <h2 ref={head} tabIndex={-1} className="sr-only">
              Your results
            </h2>
            {r.nrpf ? (
              <Flag tone="warn" title="We have not assessed public funds">
                With no recourse to public funds, claiming most benefits can affect your immigration status, and this checker cannot tell you which apply. Get free advice before you
                claim, from Citizens Advice or a local law centre. Benefits paid on your National Insurance record, listed below, are not public funds.
              </Flag>
            ) : (
              <div className="sa-bc-summary">
                <p>
                  {likely.length > 0 ? (
                    <>
                      You are likely to get <b>{likely.length}</b> {likely.length === 1 ? "kind" : "kinds"} of help
                      {r.likelyMonthly > 0 && (
                        <>
                          , worth about <b>{gbp(r.likelyMonthly)} a month</b>
                        </>
                      )}
                      {r.likelyOneOff > 0 && <> plus {gbp(r.likelyOneOff)} in yearly or one-off payments</>}.
                    </>
                  ) : (
                    <>Nothing stands out as likely on these answers.</>
                  )}{" "}
                  {check.length > 0 && (
                    <>
                      {check.length} more {check.length === 1 ? "is" : "are"} worth checking.
                    </>
                  )}
                </p>
                <button type="button" className="sa-bc-back" onClick={() => go(0)}>
                  Change my answers
                </button>
              </div>
            )}
            {(likely.length > 0 || check.length > 0) && (
              <ol className="sa-bc-list">
                {[...likely, ...check].map((h) => (
                  <Card key={h.key} h={h} />
                ))}
              </ol>
            )}
            {no.length > 0 && (
              <details className="sa-bc-no">
                <summary>Probably not ({no.length})</summary>
                <ol className="sa-bc-list">
                  {no.map((h) => (
                    <Card key={h.key} h={h} />
                  ))}
                </ol>
              </details>
            )}
          </div>
        )}

        <Foot>
          <Caveat>A first look at 2026/27 rules for England, not a decision. Amounts are rough: each calculator linked above asks the details that decide them.</Caveat>
          {done && <ShareButton copied={st.copied} onClick={st.share} />}
        </Foot>
      </div>
    </Tool>
  );
}
