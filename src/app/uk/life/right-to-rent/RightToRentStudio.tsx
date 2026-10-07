"use client";

import { CHECK_WINDOW_DAYS, maxPenalty, R2R_PENALTY, rightToRentPlan, type Status } from "@/lib/life/right-to-rent";
import { formatDate } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  start: date("2026-11-01"),
  status: oneOf<Status>("british-irish", ["british-irish", "settled", "time-limited"]),
  ends: date("2027-09-30"),
  occupiers: num(2, 0, 20),
  lodgers: num(0, 0, 20),
  repeat: bool(false),
  agent: bool(false),
  wales: bool(false),
};
const ADVANCED = ["occupiers", "lodgers", "repeat", "agent", "wales"] as const;

const nice = (iso?: string) => (iso ? formatDate(iso, "medium") : "");

export default function RightToRentStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const plan = rightToRentPlan({ status: v.status, start: v.start, permissionEnds: v.status === "time-limited" ? v.ends : undefined });
  const penalty = maxPenalty({ lodgers: v.lodgers, occupiers: v.occupiers, repeat: v.repeat });
  const outside = v.wales;

  return (
    <Studio
      title="The tenancy"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check the dates"
      onReset={st.reset}
      dock={{ label: "Earliest check date", value: nice(plan.earliestCheck) }}
      inputs={
        <>
          <InputGroup title="Tenancy and tenant">
            <DateField label="Tenancy start date" value={v.start} onChange={st.bind("start")} />
            <SelectField
              label="The adult's immigration status"
              value={v.status}
              onChange={st.bind("status")}
              options={[
                { value: "british-irish", label: "British or Irish citizen" },
                { value: "settled", label: "Settled: indefinite leave, EU settled status or similar" },
                { value: "time-limited", label: "Time-limited permission, such as a visa or pre-settled status" },
              ]}
              hint="Check every adult who will live there as their main home, whether or not they are named on the tenancy."
            />
            {v.status === "time-limited" && <DateField label="Permission ends" value={v.ends} onChange={st.bind("ends")} hint="From the online check result." />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Adult occupiers (tenancy)" value={v.occupiers} onChange={(n) => st.set("occupiers", Math.round(n))} step={1} min={0} max={20} unit="adults" dp={0} optional hint="For the penalty estimate." />
            <StepperField label="Adult lodgers" value={v.lodgers} onChange={(n) => st.set("lodgers", Math.round(n))} step={1} min={0} max={20} unit="adults" dp={0} optional hint="Living in your own home." />
            <Switch label="A previous breach in the last 3 years" checked={v.repeat} onChange={st.bind("repeat")} optional />
            <Switch label="A letting agent has agreed in writing to do the checks" checked={v.agent} onChange={st.bind("agent")} optional />
            <Switch label="The property is in Wales, Scotland or Northern Ireland" checked={v.wales} onChange={st.bind("wales")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={outside ? "Right to Rent" : "Do the check between"}
        value={outside ? "Not required" : `${nice(plan.earliestCheck)}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          outside ? (
            <>Right to Rent checks only apply in England. Landlords in Wales, Scotland and Northern Ireland do not have to do them.</>
          ) : (
            <>
              Check this adult&apos;s right to rent between <b>{nice(plan.earliestCheck)}</b> and <b>{nice(plan.latestCheck)}</b>, no more than {CHECK_WINDOW_DAYS} {per(CHECK_WINDOW_DAYS, "days")} before the tenancy starts,{" "}
              {plan.method === "manual" ? <>by seeing their original documents with them present, or using a certified identity service</> : <>using the Home Office online service with their share code</>}.
              {plan.followUp ? (
                <>
                  {" "}
                  Because their permission is time-limited, do a follow-up check before <b>{nice(plan.followUpDue)}</b>.
                </>
              ) : (
                <> No follow-up check is needed.</>
              )}
            </>
          )
        }
        badges={outside ? ["England only"] : [plan.method === "manual" ? "Document check" : "Online share code", plan.followUp ? "Follow-up needed" : "One check", v.agent ? "Agent responsible" : "Landlord responsible"]}
      />

      <Facts
        items={[
          { label: "Earliest check", value: outside ? "—" : nice(plan.earliestCheck) },
          { label: "Latest check", value: outside ? "—" : nice(plan.latestCheck) },
          { label: "Follow-up", value: outside ? "—" : plan.followUp ? nice(plan.followUpDue) : "Not needed" },
          { label: "Maximum penalty", value: outside ? "—" : gbp(penalty), tone: "warn" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: "England" },
          { label: "First check", value: "Assumed on the start date" },
          { label: "Penalties", value: "From 13 February 2024" },
          { label: "Records", value: "Keep for a year after the tenancy ends" },
        ]}
      />

      {!outside && (
        <ResultCard title="Your checklist" sub="For this adult.">
          <Statement
            columns={["Date"]}
            rows={[
              { label: "Earliest date to check", values: [nice(plan.earliestCheck)] },
              { label: "Tenancy starts: check must be done by", values: [nice(plan.latestCheck)] },
              ...(plan.followUp ? [{ label: "Follow-up check due before", values: [nice(plan.followUpDue)] }] : []),
              { label: "Keep copies until", values: ["1 year after the tenancy ends"], kind: "total" as const },
            ]}
          />
        </ResultCard>
      )}

      {!outside && (
        <ResultCard title="Penalties for getting it wrong" sub="Civil penalty, per adult without the right to rent.">
          <Statement
            columns={["Lodger", "Occupier"]}
            rows={[
              { label: "First breach", values: [gbp(R2R_PENALTY.first.lodger), gbp(R2R_PENALTY.first.occupier)] },
              { label: "Repeat within 3 years", values: [gbp(R2R_PENALTY.repeat.lodger), gbp(R2R_PENALTY.repeat.occupier)] },
              { label: "Your maximum", values: ["", gbp(penalty)], kind: "total" as const },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Doing the check properly.">
        <Callout title="Check everyone the same way">
          You must check all adult occupiers, not only those you think may not be British. Treating applicants differently because of their nationality or ethnicity can be unlawful discrimination.
        </Callout>
        {plan.method === "online" && !outside && (
          <Callout title="Online checks only for most non-British citizens">
            Most people with permission to stay now have an eVisa, so you must use their share code on GOV.UK. Physical documents such as old residence permits are no longer accepted for most.
          </Callout>
        )}
        {v.agent && (
          <Callout tone="good" title="The agent takes on the liability">
            If a letting agent has agreed in writing to carry out the checks, the agent rather than you is liable for any penalty.
          </Callout>
        )}
        <Callout tone="warn" title="If a tenant fails a follow-up check">
          You must report it to the Home Office straight away to keep your protection from a penalty.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England only. Based on the Home Office code of practice. Not legal advice.
      </p>
    </Studio>
  );
}
