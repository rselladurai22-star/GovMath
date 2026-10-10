"use client";

import { bestPrescriptionPlan, PRESCRIPTION, prescriptionPlans } from "@/lib/life/health";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Nation = "england" | "free";
type Exempt = "none" | "age" | "young" | "pregnancy" | "medical" | "income" | "other";

const SCHEMA = {
  items: num(2, 0, 30),
  hrt: num(0, 0, 10),
  nation: oneOf<Nation>("england", ["england", "free"]),
  exempt: oneOf<Exempt>("none", ["none", "age", "young", "pregnancy", "medical", "income", "other"]),
};
const ADVANCED = ["hrt", "exempt"] as const;
const XS = Array.from({ length: 17 }, (_, i) => i * 0.25);

const EXEMPT_TEXT: Record<Exempt, string> = {
  none: "",
  age: "People aged 60 or over get free prescriptions.",
  young: "Under-16s, and 16 to 18-year-olds in full-time education, get free prescriptions.",
  pregnancy: "A maternity exemption certificate covers pregnancy and 12 months after the birth.",
  medical: "A medical exemption certificate covers all your prescriptions, not just those for the condition.",
  income: "Universal Credit (with earnings below the limit), Income Support, income-based JSA, income-related ESA, Pension Credit Guarantee Credit or an HC2 certificate give free prescriptions.",
  other: "War pension and some other exemptions also mean free prescriptions.",
};

export default function PrescriptionStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const free = v.nation === "free" || v.exempt !== "none";
  const plans = prescriptionPlans(v.items, v.hrt);
  const best = bestPrescriptionPlan(v.items, v.hrt);
  const payg = plans[0].annual;
  const saving = payg - best.annual;
  const maxPlan = Math.max(1, ...plans.map((p) => p.annual));
  const paygCurve = XS.map((x) => x * 12 * PRESCRIPTION.item);
  const ppcCurve = XS.map((x) => (x > 0 ? PRESCRIPTION.ppc12 : 0));
  const ppc3Curve = XS.map((x) => (x > 0 ? PRESCRIPTION.ppc3 * 4 : 0));

  return (
    <Studio
      title="Your prescriptions"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare ways to pay"
      onReset={st.reset}
      dock={{ label: "Cheapest a year", value: free ? "Free" : gbp(best.annual, true) }}
      inputs={
        <>
          <InputGroup title="How many">
            <StepperField label="Items a month" value={v.items} onChange={st.bind("items")} step={0.5} min={0} max={30} unit="items" dp={1} hint="Each medicine on a prescription is one item. Use 0.5 for every other month." />
            <SelectField
              label="Where you get prescriptions"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England" },
                { value: "free", label: "Scotland, Wales or Northern Ireland" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="HRT items a month" value={v.hrt} onChange={st.bind("hrt")} step={0.5} min={0} max={10} unit="items" dp={1} optional hint="Listed HRT medicines can be covered by the cheaper HRT PPC." />
            <SelectField
              label="Exemption"
              value={v.exempt}
              onChange={st.bind("exempt")}
              optional
              options={[
                { value: "none", label: "None" },
                { value: "age", label: "Aged 60 or over" },
                { value: "young", label: "Under 16, or 16 to 18 in full-time education" },
                { value: "pregnancy", label: "Pregnant or had a baby in the last 12 months" },
                { value: "medical", label: "Medical exemption certificate" },
                { value: "income", label: "Low income or qualifying benefit" },
                { value: "other", label: "War pension or other" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={free ? "Your prescriptions" : "Cheapest way to pay"}
        value={free ? "Free" : gbp(best.annual, true)}
        unit={free ? undefined : "a year"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          free ? (
            <>{v.nation === "free" ? "Prescriptions are free in Scotland, Wales and Northern Ireland." : EXEMPT_TEXT[v.exempt]} You should not pay anything.</>
          ) : v.items + v.hrt <= 0 ? (
            <>Enter how many items you get a month.</>
          ) : best.key === "payg" ? (
            <>
              At {v.items + v.hrt} {v.items + v.hrt === 1 ? "item" : "items"} a month, paying <b>{gbp(PRESCRIPTION.item, true)}</b> each is cheapest: <b>{gbp(payg, true)}</b> a year. A 12-month PPC becomes
              worth it from 12 items a year.
            </>
          ) : (
            <>
              A <b>{best.label.toLowerCase()}</b> costs <b>{gbp(best.annual, true)}</b> a year, against <b>{gbp(payg, true)}</b> paying per item. You save <b>{gbp(saving, true)}</b>.
              {best.key === "ppc12" ? <> You can spread it over 10 monthly payments of <b>{gbp(PRESCRIPTION.ppc12Instalment, true)}</b>.</> : null}
            </>
          )
        }
        badges={free ? ["Exempt"] : [`${gbp(PRESCRIPTION.item, true)} an item`, `12-month PPC ${gbp(PRESCRIPTION.ppc12, true)}`, saving > 0 ? `Save ${gbp(saving)}` : "Pay as you go"]}
      />

      <Facts
        items={[
          { label: "Items a year", value: String((v.items + v.hrt) * 12) },
          { label: "Paying per item", value: free ? "£0" : gbp(payg, true) },
          { label: "Cheapest", value: free ? "Free" : gbp(best.annual, true) },
          { label: "Saving a year", value: free ? gbp(payg, true) : gbp(saving, true), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Charge", value: `${gbp(PRESCRIPTION.item, true)} per item, England 2026/27` },
          { label: "3-month PPC", value: gbp(PRESCRIPTION.ppc3, true) },
          { label: "12-month PPC", value: `${gbp(PRESCRIPTION.ppc12, true)}, or 10 × ${gbp(PRESCRIPTION.ppc12Instalment, true)}` },
          { label: "HRT PPC", value: `${gbp(PRESCRIPTION.hrtPpc, true)} for listed HRT` },
        ]}
      />

      {!free && v.items + v.hrt > 0 && (
        <ResultCard title="Every way to pay" sub="Cost over 12 months.">
          <Compare head={["Option", "A year"]} rows={plans.map((p) => ({ label: p.label, value: gbp(p.annual, true), delta: p.key === best.key ? "Cheapest" : `+${gbp(p.annual - best.annual, true)}`, bar: p.annual / maxPlan, current: p.key === best.key }))} />
        </ResultCard>
      )}

      {!free && (
        <ResultCard title="When a PPC pays off" sub="Yearly cost by items a month.">
          <AreaChart
            ariaLabel="Yearly prescription cost by items a month"
            series={[
              { key: "payg", label: "Pay per item", color: "#f59e0b", values: paygCurve },
              { key: "ppc12", label: "12-month PPC", color: "#16a34a", values: ppcCurve, dashed: true },
              { key: "ppc3", label: "3-month PPCs", color: "#5b1e6e", values: ppc3Curve, dashed: true },
            ]}
            xLabel={(i) => `${XS[i]}`}
            yFormat={(n) => gbp(Math.round(n))}
            initial={Math.min(XS.length - 1, Math.round(v.items * 4))}
            hint="Drag across the chart, or use the arrow keys, to read any number of items a month."
            readout={(i) => (
              <>
                <b>{XS[i]}</b> items a month: per item <b>{gbp(paygCurve[i] ?? 0, true)}</b>, 12-month PPC <b>{gbp(ppcCurve[i] ?? 0, true)}</b>.
              </>
            )}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Avoiding charges and fines.">
        <Callout tone="warn" title="Check before you tick a box">
          Claiming a free prescription you are not entitled to can lead to a penalty charge of up to £100 on top of the cost. If you are unsure, pay and ask for a refund receipt (FP57).
        </Callout>
        <Callout title="Buy a PPC before you need it">
          A PPC can be backdated by up to a month if you bought it within a month of paying for a prescription, as long as you got an FP57 receipt.
        </Callout>
        {v.hrt === 0 && (
          <Callout title="On HRT?">
            The HRT PPC costs {gbp(PRESCRIPTION.hrtPpc, true)} for 12 months of listed HRT medicines. Add HRT items under More options to compare.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England charges for 2026/27. Not medical advice.
      </p>
    </Studio>
  );
}
