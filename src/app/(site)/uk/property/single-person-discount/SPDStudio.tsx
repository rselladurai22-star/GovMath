"use client";

import { householdBill, type Occupant } from "@/lib/property/discounts";
import { Caveat, Flag, Foot, Hero, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { MoneyField, SelectField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Me = Exclude<Occupant, "counts"> | "counts";
const ME: { value: Me; label: string }[] = [
  { value: "counts", label: "An adult who counts (most people)" },
  { value: "student", label: "A full-time student" },
  { value: "smi", label: "Severely mentally impaired" },
  { value: "carer", label: "A live-in carer" },
  { value: "apprentice", label: "An apprentice or trainee" },
  { value: "other", label: "Another disregarded group" },
];

const SCHEMA = {
  bill: num(2_280, 0, 20_000),
  // Other adults (18+) who live there. Older links paired this with
  // `disregarded` ("they are all disregarded"); the groups below replace it.
  others: num(0, 0, 10),
  disregarded: bool(false),
  me: oneOf<Me>("counts", ["counts", "student", "smi", "carer", "apprentice", "other"]),
  ost: num(0, 0, 10),
  osmi: num(0, 0, 10),
  ocare: num(0, 0, 10),
  oapp: num(0, 0, 10),
  odis: num(0, 0, 10),
  days: num(365, 0, 365),
  months: oneOf<"10" | "12">("10", ["10", "12"]),
};

type GroupKey = "ost" | "osmi" | "ocare" | "oapp" | "odis";
const GROUPS: { key: GroupKey; kind: Occupant; label: string; hint: string }[] = [
  { key: "ost", kind: "student", label: "Full-time students", hint: "At college or university, or 18 or 19 and still at school or college" },
  { key: "ocare", kind: "carer", label: "Live-in carers", hint: "Caring for someone who is not their partner or child under 18" },
  { key: "oapp", kind: "apprentice", label: "Apprentices or trainees", hint: "On £195 a week or less, or under 25 and funded by the ESFA" },
  { key: "osmi", kind: "smi", label: "Severely mentally impaired", hint: "With a doctor’s certificate and a qualifying benefit" },
  { key: "odis", kind: "other", label: "Another disregarded group", hint: "Student nurse, foreign language assistant, diplomat and others" },
];

const TAG: Record<Occupant, string> = { counts: "Counts", student: "Student", smi: "SMI", carer: "Carer", apprentice: "Apprentice", other: "Disregarded" };

export default function SPDStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const others = Math.round(v.others);
  const groupTotal = GROUPS.reduce((a, g) => a + Math.round(v[g.key]), 0);
  // An old link that said "they are all disregarded" without naming groups.
  const legacyAll = v.disregarded && groupTotal === 0;

  const people: Occupant[] = [v.me];
  let left = others;
  if (legacyAll) {
    for (let i = 0; i < others; i++) people.push("other");
    left = 0;
  } else {
    for (const g of GROUPS) {
      const n = Math.min(left, Math.round(v[g.key]));
      for (let i = 0; i < n; i++) people.push(g.kind);
      left -= n;
    }
  }
  for (let i = 0; i < left; i++) people.push("counts");

  const n = Number(v.months);
  const r = householdBill({ annualBill: v.bill, people, days: v.days, instalments: n });
  const partYear = r.days < 365;
  const pct = Math.round(r.rate * 100);
  const monthBefore = r.fullBill / n;

  const setOthers = (x: number) => {
    const next = Math.max(0, Math.min(10, Math.round(x)));
    st.set("others", next);
    if (legacyAll) {
      st.set("disregarded", false);
      st.set("odis", next);
    }
  };
  const setGroup = (key: GroupKey) => (x: number) => {
    if (legacyAll) {
      st.set("disregarded", false);
      st.set("odis", 0);
    }
    st.set(key, Math.max(0, Math.round(x)));
  };
  const room = (key: GroupKey) => (legacyAll ? 0 : others - groupTotal + Math.round(v[key]));

  const heroLabel =
    r.status === "exempt" ? "Exempt: you save the whole bill" : r.rate > 0 ? `Your ${pct}% discount saves` : "No discount for this household";
  const heroValue = r.status === "exempt" ? gbp(r.fullBill) : gbp(r.discount);

  return (
    <Tool label="Single person discount calculator">
      <div className="sa-spd">
        <div className="sa-spd-inputs">
          <Inputs title="Your bill and who lives with you">
            <MoneyField
              label="Full council tax bill for the year"
              value={v.bill}
              onChange={st.bind("bill")}
              slider={{ min: 500, max: 5_000, step: 10, ends: ["£500", "£5,000"] }}
              hint="Before any discount: the annual charge on your bill for your band. In Scotland include the water and waste water charges."
            />
            <SelectField label="You are" value={v.me} onChange={st.bind("me")} options={ME} />
            <Mini label="Other adults (18 or over) who live there" value={others} onChange={setOthers} min={0} max={10} stepper hint="Children under 18 never count, so leave them out." />
            {others > 0 && (
              <fieldset className="sa-spd-groups">
                <legend>Are any of them disregarded?</legend>
                {GROUPS.map((g) => (
                  <div key={g.key} className="sa-spd-group">
                    <span>
                      <b>{g.label}</b>
                      <small>{g.hint}</small>
                    </span>
                    <Mini label={`${g.label} among them`} value={legacyAll ? 0 : Math.round(v[g.key])} onChange={setGroup(g.key)} min={0} max={Math.max(0, room(g.key))} stepper />
                  </div>
                ))}
                {legacyAll && <p className="sa-spd-legacy">This link says all {others} are disregarded. Choose their groups to be exact.</p>}
              </fieldset>
            )}
            <div className="sa-spd-when">
              <Mini label="Days of the year this applies" value={r.days} onChange={(x) => st.set("days", Math.max(0, Math.min(365, Math.round(x))))} min={0} max={365} suffix="of 365" hint="Fewer if someone moved in or out this year." />
              <Pills
                label="Instalments"
                value={v.months}
                onChange={st.bind("months")}
                options={[
                  { value: "10", label: "10" },
                  { value: "12", label: "12" },
                ]}
              />
            </div>
          </Inputs>
        </div>

        <div className="sa-spd-result">
          <ul className="sa-spd-people" aria-label={`Who lives there: ${people.map((p, i) => `${i === 0 ? "you" : "another adult"}, ${p === "counts" ? "counts" : TAG[p].toLowerCase()}`).join("; ")}`}>
            {people.map((p, i) => (
              <li key={i} className={p === "counts" ? "is-counted" : "is-disregarded"}>
                <i aria-hidden="true" />
                <span>{i === 0 ? "You" : `Adult ${i + 1}`}</span>
                <b>{TAG[p]}</b>
              </li>
            ))}
          </ul>
          <p className="sa-spd-count">
            {r.status === "exempt"
              ? r.exemption === "students"
                ? "Everyone is a full-time student, so the home is exempt."
                : "Severely mentally impaired, living alone or only with other SMI adults or students: a 100% discount."
              : r.counted === 0
                ? "Nobody counts, so the bill is halved."
                : `${r.counted} ${r.counted === 1 ? "adult counts" : "adults count"}. ${r.counted === 1 ? "One is the most you can have for the 25% discount." : "With two or more, there is no discount."}`}
          </p>

          <Hero
            label={heroLabel}
            value={heroValue}
            unit={r.status === "exempt" || r.rate > 0 ? (partYear ? `for ${r.days} days` : "a year") : undefined}
            tone={r.rate > 0 ? "brand" : "ink"}
            sub={
              r.rate > 0 ? (
                <>
                  You pay <b>{gbp(r.payable)}</b> this year: <b>{gbp(r.instalment, true)}</b> a month over {n} months, down from {gbp(monthBefore, true)}.
                </>
              ) : (
                <>Two or more adults who count pay the full {gbp(r.fullBill)}: {gbp(r.instalment, true)} a month over {n} months.</>
              )
            }
          />

          <figure className="sa-spd-bills" role="img" aria-label={`Full bill ${gbp(r.fullBill)}, less ${gbp(r.discount)}, leaves ${gbp(r.payable)} to pay`}>
            <div className="sa-spd-bill">
              <span>Full bill</span>
              <b>{gbp(r.fullBill)}</b>
              <small>{gbp(monthBefore, true)} × {n}</small>
            </div>
            <div className={`sa-spd-gap${r.discount > 0 ? " is-on" : ""}`} aria-hidden="true">
              <span>{r.discount > 0 ? `−${gbp(r.discount)}` : "No change"}</span>
              <small>{r.status === "exempt" ? "Exempt" : r.rate > 0 ? `${pct}% off` : "0% off"}</small>
            </div>
            <div className={`sa-spd-bill is-after${r.discount > 0 ? " is-lower" : ""}`}>
              <span>You pay</span>
              <b>{gbp(r.payable)}</b>
              <small>{gbp(r.instalment, true)} × {n}</small>
            </div>
          </figure>

          {r.status === "none" && v.me === "counts" && (
            <Flag title="Check each adult again">Anyone in the groups on the left does not count. If all but one of you are disregarded, the 25% applies.</Flag>
          )}
          {r.status === "exempt" && (
            <Flag tone="good" title="Ask for an exemption, not a discount">
              {r.exemption === "students"
                ? "Send the council a student certificate from each college or university. Until it is applied, you will still get a bill."
                : "You need a certificate from a doctor and proof of a qualifying benefit, such as PIP or Attendance Allowance. Ask the council for its form."}
            </Flag>
          )}

          <Foot>
            <Caveat>
              Exact for the bill you enter, by day if you give fewer than 365. Your council decides whether each person is disregarded; this does not include Council Tax Reduction or the
              disabled band reduction.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
