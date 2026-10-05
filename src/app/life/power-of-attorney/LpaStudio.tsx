"use client";

import { DEPUTY, deputyCost, LPA, lpaFee2026 } from "@/lib/life/estate";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Help = "none" | "reduction" | "exemption";

const SCHEMA = {
  people: num(2, 1, 2),
  finance: bool(true),
  health: bool(true),
  help: oneOf<Help>("none", ["none", "reduction", "exemption"]),
  route: oneOf<"self" | "pro">("self", ["self", "pro"]),
  proFee: num(400, 0, 5_000),
  vat: bool(true),
  years: num(5, 1, 30),
  minimal: bool(false),
};
const ADVANCED = ["help", "proFee", "vat", "years", "minimal"] as const;

export default function LpaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const types = (v.finance ? 1 : 0) + (v.health ? 1 : 0);
  const count = types * v.people;
  const fees = lpaFee2026(count, v.help);
  const pro = v.route === "pro" ? count * v.proFee * (v.vat ? 1.2 : 1) : 0;
  const total = fees.total + pro;
  const deputy = deputyCost(v.years, v.minimal) * v.people;
  const rows = [
    { label: "Registering yourself", value: fees.total },
    { label: "With a solicitor", value: fees.total + count * v.proFee * (v.vat ? 1.2 : 1) },
    { label: `Deputyship instead, ${v.years} years`, value: deputy },
  ];
  const maxRow = Math.max(1, ...rows.map((r) => r.value));

  return (
    <Studio
      title="Your LPAs"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out the cost"
      onReset={st.reset}
      dock={{ label: "Total cost", value: gbp(total) }}
      inputs={
        <>
          <InputGroup title="Who and which types">
            <Segmented
              label="Making LPAs for"
              value={v.people === 2 ? "two" : "one"}
              onChange={(x) => st.set("people", x === "two" ? 2 : 1)}
              options={[
                { value: "one", label: "One person" },
                { value: "two", label: "A couple" },
              ]}
            />
            <Switch label="Property and financial affairs" checked={v.finance} onChange={st.bind("finance")} hint="Bank accounts, bills, selling a home." />
            <Switch label="Health and welfare" checked={v.health} onChange={st.bind("health")} hint="Care, medical treatment and where you live." />
            <Segmented
              label="Who prepares them"
              value={v.route}
              onChange={st.bind("route")}
              options={[
                { value: "self", label: "Ourselves" },
                { value: "pro", label: "A solicitor" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Help with the fee"
              value={v.help}
              onChange={st.bind("help")}
              options={[
                { value: "none", label: "None" },
                { value: "reduction", label: "Half fee", note: "Income under £12,000." },
                { value: "exemption", label: "No fee", note: "On certain means-tested benefits." },
              ]}
            />
            {v.route === "pro" && <MoneyField label="Solicitor's fee per LPA" value={v.proFee} onChange={st.bind("proFee")} optional hint="Fixed fees vary widely." />}
            {v.route === "pro" && <Switch label="Fee plus VAT" checked={v.vat} onChange={st.bind("vat")} optional />}
            <StepperField label="Years a deputy might be needed" value={v.years} onChange={st.bind("years")} step={1} min={1} max={30} unit="years" dp={0} optional hint="For comparison with having no LPA." />
            <Switch label="Minimal supervision (assets under £21,000)" checked={v.minimal} onChange={st.bind("minimal")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Cost of your LPAs"
        value={gbp(total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          count === 0 ? (
            <>Choose at least one type of LPA.</>
          ) : (
            <>
              Registering <b>{count}</b> {count === 1 ? "LPA" : "LPAs"} costs <b>{gbp(fees.total)}</b> in fees{fees.saving > 0 ? <>, after <b>{gbp(fees.saving)}</b> of help</> : null}.
              {pro > 0 ? <> With solicitor&apos;s fees of <b>{gbp(pro)}</b>, the total is <b>{gbp(total)}</b>.</> : null} Without LPAs, a court deputyship could cost about <b>{gbp(deputy)}</b> over {v.years}{" "}
              years.
            </>
          )
        }
        badges={[`${gbp(fees.each)} per LPA`, `${count} ${count === 1 ? "LPA" : "LPAs"}`, v.route === "pro" ? "Solicitor" : "Doing it yourselves"]}
      />

      <Facts
        items={[
          { label: "Fee per LPA", value: gbp(fees.each) },
          { label: "Registration fees", value: gbp(fees.total) },
          { label: "Solicitor", value: gbp(pro) },
          { label: "Total", value: gbp(total), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: "England and Wales" },
          { label: "Fee", value: `${gbp(LPA.fee)} per LPA` },
          { label: "Deputy fees", value: `${gbp(DEPUTY.application)} + ${gbp(DEPUTY.assessment)}, then ${gbp(v.minimal ? DEPUTY.minimalSupervision : DEPUTY.supervision)} a year` },
          { label: "Security bond", value: "Not included" },
        ]}
      />

      <ResultCard title="Breakdown" sub="One-off costs.">
        <Statement
          columns={["Cost"]}
          rows={[
            { label: `${count} × registration at ${gbp(fees.each)}`, values: [gbp(fees.total)] },
            ...(pro > 0 ? [{ label: `${count} × solicitor at ${gbp(v.proFee)}${v.vat ? " plus VAT" : ""}`, values: [gbp(pro)] }] : []),
            { label: "Total", values: [gbp(total)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="LPAs compared with a deputyship" sub="What it costs if someone loses capacity without an LPA.">
        <Compare head={["Route", "Cost"]} rows={rows.map((r) => ({ label: r.label, value: gbp(r.value), bar: r.value / maxRow, current: r.label.startsWith(v.route === "self" ? "Registering" : "With") }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you register.">
        <Callout title="Make them while you can">
          An LPA can only be made while the person has mental capacity. After that, the family must apply to the Court of Protection, which is slower and costs more every year.
        </Callout>
        {!v.health && (
          <Callout tone="warn" title="Consider health and welfare too">
            Without a health and welfare LPA, nobody has the legal right to make decisions about your care, even a spouse or next of kin.
          </Callout>
        )}
        <Callout title="Mistakes cost £46 to fix">
          If the Office of the Public Guardian finds a mistake, you can usually correct it and reapply within 3 months for £{LPA.resubmit}.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England and Wales fees. Scotland and Northern Ireland have their own systems. Not legal advice.
      </p>
    </Studio>
  );
}
