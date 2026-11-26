"use client";

import { studentCouncilTax, type StudentHomePerson } from "@/lib/students/loans";
import { Caveat, Flag, Foot, Hero, Inputs, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { MoneyField, SelectField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Nation = "england" | "wales" | "scotland" | "ni";

const SCHEMA = {
  students: num(3, 0, 20),
  // Adults who count: working, or not studying full time.
  others: num(0, 0, 20),
  pt: num(0, 0, 20),
  spouse: num(0, 0, 20),
  leaver: num(0, 0, 20),
  dis: num(0, 0, 20),
  bill: num(2_200, 0, 20_000),
  months: num(12, 0, 12),
  nation: oneOf<Nation>("england", ["england", "wales", "scotland", "ni"]),
};

type Key = "students" | "pt" | "others" | "spouse" | "leaver" | "dis";
const KINDS: { key: Key; kind: StudentHomePerson; add: string; chip: string; note: string }[] = [
  { key: "students", kind: "student", add: "Full-time student", chip: "Full-time student", note: "Not counted" },
  { key: "pt", kind: "counts", add: "Part-time student", chip: "Part-time student", note: "Counts" },
  { key: "others", kind: "counts", add: "Working adult", chip: "Working adult", note: "Counts" },
  { key: "spouse", kind: "spouse", add: "Student’s non-British partner", chip: "Non-British partner", note: "Not counted" },
  { key: "leaver", kind: "leaver", add: "School leaver under 20", chip: "School leaver", note: "Not counted" },
  { key: "dis", kind: "disregarded", add: "Apprentice or carer", chip: "Apprentice or carer", note: "Not counted" },
];
const MAX_PEOPLE = 12;

export default function CouncilTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const ni = v.nation === "ni";
  const count = (k: Key) => Math.max(0, Math.round(v[k]));
  const people = KINDS.flatMap((k) => Array.from({ length: count(k.key) }, () => k));
  const total = people.length;
  const r = studentCouncilTax({ people: people.map((p) => p.kind), bill: v.bill, months: v.months });
  const partYear = v.months < 12;
  const period = partYear ? `for ${v.months} ${v.months === 1 ? "month" : "months"}` : "a year";

  const verdict = ni
    ? "Northern Ireland has domestic rates, not council tax"
    : total === 0
      ? "Add the people who live there"
      : r.kind === "exempt"
        ? "Exempt: no council tax"
        : r.kind === "half"
          ? "Nobody counts: 50% off"
          : r.kind === "discount"
            ? "One adult counts: 25% off"
            : `${r.counted} adults count: the full bill`;

  return (
    <Tool label="Student council tax checker">
      <div className="sa-sct">
        <div className="sa-sct-house">
          <h2 className="sa-h">Who lives there</h2>
          <p className="sa-sct-help">Everyone aged 18 or over whose main home it is. Leave out children.</p>
          <ul className="sa-sct-people" aria-label={`${total} ${total === 1 ? "adult" : "adults"} in the home`}>
            {people.map((p, i) => (
              <li key={`${p.key}-${i}`} className={p.kind === "counts" ? "is-counts" : "is-not"}>
                <span>
                  <b>{p.chip}</b>
                  <small>{p.note}</small>
                </span>
                <button type="button" aria-label={`Remove a ${p.chip.toLowerCase()}`} onClick={() => st.set(p.key, Math.max(0, count(p.key) - 1))}>
                  ×
                </button>
              </li>
            ))}
            {total === 0 && <li className="sa-sct-empty">Nobody yet</li>}
          </ul>
          <div className="sa-sct-add" role="group" aria-label="Add someone">
            {KINDS.map((k) => (
              <button key={k.key} type="button" disabled={total >= MAX_PEOPLE} onClick={() => st.set(k.key, count(k.key) + 1)}>
                <span aria-hidden="true">+</span> {k.add}
              </button>
            ))}
          </div>
        </div>

        <div className="sa-sct-main">
          <Hero
            label={verdict}
            value={ni ? "Rates" : total === 0 ? "–" : gbp(r.pay)}
            unit={ni || total === 0 ? undefined : `to pay ${period}`}
            tone={ni || r.kind === "full" ? "ink" : "brand"}
            sub={
              ni ? (
                <>They follow different rules, and this checker does not cover them. In many rented homes the rates are included in the rent: check your tenancy agreement, or ask Land &amp; Property Services.</>
              ) : total === 0 ? undefined : r.kind === "exempt" ? (
                <>
                  Everyone is a full-time student{people.some((p) => p.kind !== "student") ? ", or someone treated like one," : ""} so the home is exempt and saves the whole {gbp(r.saving)}. You still have to ask the
                  council for the exemption.
                </>
              ) : r.kind === "full" ? (
                <>
                  Students are not counted, but with {r.counted} adults who are, there is no discount. Split between them that is about {gbp(r.perAdult)} each {period}; your council decides whose name goes on the bill.
                </>
              ) : (
                <>
                  That saves <b>{gbp(r.saving)}</b> on the {gbp(r.pay + r.saving)} bill.{" "}
                  {r.counted === 1 ? "The bill usually goes to the adult who counts, and the 25% comes off it." : "When nobody counts, the 50% discount applies; your council decides whose name goes on the bill."}
                </>
              )
            }
          />

          <Inputs tone="plain">
            <div className="sa-sct-bill">
              <MoneyField label="Full council tax for the year" value={v.bill} onChange={st.bind("bill")} hint="For the property’s band, before any discount. On your council’s website or the last bill." />
              <div className="sa-sct-row">
                <Mini label="Months like this" value={v.months} onChange={(n) => st.set("months", Math.max(0, Math.min(12, Math.round(n))))} min={0} max={12} stepper suffix="of 12" />
              </div>
                <SelectField
                  label="Nation"
                  value={v.nation}
                  onChange={st.bind("nation")}
                  options={[
                    { value: "england", label: "England" },
                    { value: "wales", label: "Wales" },
                    { value: "scotland", label: "Scotland" },
                    { value: "ni", label: "Northern Ireland" },
                  ]}
                />
            </div>
          </Inputs>

          {!ni && people.some((p) => p.key === "pt") && (
            <Flag title="Part-time students count">A course of under 21 hours a week, or shorter than a year, does not make someone a full-time student for council tax, even with a student card.</Flag>
          )}
          {!ni && r.kind === "exempt" && (
            <Flag tone="good" title="How to claim">
              Send the council a council tax certificate for each student. Your university or college issues them, often from the student portal. Apply again each academic year.
            </Flag>
          )}

          <Foot>
            <Caveat>
              The rules for England, Wales and Scotland. Exact for the bill you enter; the council decides who is a full-time student. This leaves out halls of residence, which are exempt
              anyway, and Council Tax Reduction.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
