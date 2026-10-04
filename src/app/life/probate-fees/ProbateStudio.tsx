"use client";

import { PROBATE, probateFee2026 } from "@/lib/life/estate";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  estate: num(250_000, 0, 100_000_000),
  copies: num(4, 0, 50),
  later: num(0, 0, 50),
  route: oneOf<"self" | "pro">("self", ["self", "pro"]),
  proPct: num(2, 0, 10),
  vat: bool(true),
  ownHome: bool(true),
  joint: bool(false),
};
const ADVANCED = ["later", "proPct", "vat", "ownHome", "joint"] as const;
const LADDER = [5_000, 50_000, 150_000, 325_000, 500_000, 1_000_000];

export default function ProbateStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = probateFee2026(v.estate, v.copies, v.later);
  const pro = v.route === "pro" ? v.estate * (v.proPct / 100) * (v.vat ? 1.2 : 1) : 0;
  const total = r.total + pro;
  const likelyNeeded = v.estate > PROBATE.threshold && (v.ownHome || !v.joint);
  const oldTotal = (r.waived ? 0 : PROBATE.previousFee) + Math.max(0, Math.floor(v.copies)) * 1.5;
  const maxPct = Math.max(...LADDER.map((e) => (e <= PROBATE.threshold ? 0 : PROBATE.fee / e)));

  return (
    <Studio
      title="The estate"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out probate fees"
      onReset={st.reset}
      dock={{ label: "Probate costs", value: gbp(total, true) }}
      inputs={
        <>
          <InputGroup title="Estate and copies">
            <MoneyField label="Value of the estate" value={v.estate} onChange={st.bind("estate")} hint="Everything the person owned in their sole name, before debts." />
            <StepperField label="Extra official copies with the application" value={v.copies} onChange={st.bind("copies")} step={1} min={0} max={50} unit="copies" dp={0} hint="One for each bank, building society, pension or share registrar is a good rule." />
            <Segmented
              label="Who applies"
              value={v.route}
              onChange={st.bind("route")}
              options={[
                { value: "self", label: "Applying yourself" },
                { value: "pro", label: "Solicitor or probate firm" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Copies ordered later" value={v.later} onChange={st.bind("later")} step={1} min={0} max={50} unit="copies" dp={0} optional hint="£16 each after you have applied." />
            {v.route === "pro" && <StepperField label="Professional fee" value={v.proPct} onChange={st.bind("proPct")} step={0.25} min={0} max={10} unit="% of estate" dp={2} optional hint="Often 1% to 5%, or a fixed fee for a grant-only service." />}
            {v.route === "pro" && <Switch label="Fee plus VAT" checked={v.vat} onChange={st.bind("vat")} optional />}
            <Switch label="They owned a home in their sole name" checked={v.ownHome} onChange={st.bind("ownHome")} optional hint="Selling or transferring it almost always needs probate." />
            <Switch label="Everything was jointly owned with a spouse" checked={v.joint} onChange={st.bind("joint")} optional hint="Joint assets usually pass to the survivor without probate." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Probate fees"
        value={gbp(total, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.waived ? (
            <>
              There is no application fee for an estate of {gbp(PROBATE.threshold)} or less. {r.copies + r.later > 0 ? <>Copies cost <b>{gbp(r.copies + r.later, true)}</b>.</> : null}
            </>
          ) : (
            <>
              The court fee is <b>{gbp(PROBATE.fee)}</b>, plus <b>{gbp(r.copies, true)}</b> for {v.copies} {v.copies === 1 ? "copy" : "copies"}
              {r.later > 0 ? <> and <b>{gbp(r.later, true)}</b> for later copies</> : null}.{" "}
              {pro > 0 ? <>With professional fees of about <b>{gbp(pro)}</b>, the total is <b>{gbp(total)}</b>.</> : <>That is <b>{percent(r.total / Math.max(1, v.estate), 2)}</b> of the estate.</>}
            </>
          )
        }
        badges={[r.waived ? "No court fee" : `${gbp(PROBATE.fee)} court fee`, `Copies £${PROBATE.copyWithApplication} each now`, likelyNeeded ? "Probate likely needed" : "Probate may not be needed"]}
      />

      <Facts
        items={[
          { label: "Application fee", value: gbp(r.application) },
          { label: "Copies", value: gbp(r.copies + r.later, true) },
          { label: "Before 13 July 2026", value: gbp(oldTotal, true), note: "£300 fee, £1.50 copies" },
          { label: "Total", value: gbp(total, true), tone: "warn" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: "England and Wales" },
          { label: "Fees from", value: "13 July 2026" },
          { label: "Threshold", value: "No fee at £5,000 or less" },
          { label: "Professional fees", value: v.route === "pro" ? `${v.proPct}% of the estate${v.vat ? " plus VAT" : ""}` : "None" },
        ]}
      />

      <ResultCard title="Your costs" sub="Paid when you apply, except later copies.">
        <Statement
          columns={["Cost"]}
          rows={[
            { label: "Probate application fee", values: [gbp(r.application, true)] },
            { label: `${v.copies} extra ${v.copies === 1 ? "copy" : "copies"} at £${PROBATE.copyWithApplication}`, values: [gbp(r.copies, true)] },
            ...(v.later > 0 ? [{ label: `${v.later} later ${v.later === 1 ? "copy" : "copies"} at £${PROBATE.copyLater}`, values: [gbp(r.later, true)] }] : []),
            ...(pro > 0 ? [{ label: `Professional fee${v.vat ? " including VAT" : ""}`, values: [gbp(pro, true)] }] : []),
            { label: "Total", values: [gbp(total, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="The court fee as a share of the estate" sub="A flat fee falls as a share as estates get bigger.">
        <Compare
          head={["Estate", "Fee"]}
          rows={LADDER.map((e) => {
            const fee = e <= PROBATE.threshold ? 0 : PROBATE.fee;
            return { label: gbp(e), value: gbp(fee), delta: fee ? percent(fee / e, 2) : "Free", bar: maxPct > 0 ? fee / e / maxPct : 0 };
          })}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you apply.">
        {!likelyNeeded && (
          <Callout tone="good" title="You may not need probate">
            Jointly owned property and money usually pass straight to the surviving owner. Banks often release smaller balances without a grant. Ask each organisation what it needs.
          </Callout>
        )}
        <Callout title="Order copies now, not later">
          Extra copies cost £2 each with the application but £16 each afterwards. Each bank or pension provider will want to see one.
        </Callout>
        <Callout title="Inheritance Tax comes first">
          If Inheritance Tax is due, most of it must be paid before the grant is issued. The <a href="/life/inheritance-tax">Inheritance Tax calculator</a> estimates the bill.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Court fees from 13 July 2026, England and Wales. Professional fees vary widely.
      </p>
    </Studio>
  );
}
