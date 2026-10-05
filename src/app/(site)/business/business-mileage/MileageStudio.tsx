"use client";

import { mileageClaim, MILEAGE_RATES, type MileageRole, type Vehicle } from "@/lib/business/mileage";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, whole } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Band = "basic" | "higher" | "additional";

const SCHEMA = {
  role: oneOf<MileageRole>("self", ["self", "employee"]),
  vehicle: oneOf<Vehicle>("car", ["car", "motorcycle", "bicycle"]),
  miles: num(8_000, 0, 200_000),
  prior: num(0, 0, 200_000),
  paid: num(0, 0, 100),
  passenger: num(0, 0, 200_000),
  band: oneOf<Band>("basic", ["basic", "higher", "additional"]),
};
const ADVANCED = ["prior", "paid", "passenger", "band"] as const;
const RELIEF: Record<MileageRole, Record<Band, number>> = {
  self: { basic: 0.26, higher: 0.42, additional: 0.47 },
  employee: { basic: 0.2, higher: 0.4, additional: 0.45 },
};
const VEHICLE_LABEL: Record<Vehicle, string> = { car: "Car or van", motorcycle: "Motorcycle", bicycle: "Bicycle" };
const pence = (n: number) => `${n.toFixed(n % 1 === 0 ? 0 : 1)}p`;

export default function MileageStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const employee = v.role === "employee";
  const rate = RELIEF[v.role][v.band];
  const input = { role: v.role, vehicle: v.vehicle, miles: v.miles, priorMiles: v.prior, passengerMiles: v.passenger, employerPence: v.paid, reliefRate: rate };
  const r = mileageClaim(input);
  const headline = employee ? r.reliefClaim : r.approved;
  const ladder = [2_000, 5_000, 10_000, 15_000, 20_000].map((m) => ({ m, x: mileageClaim({ ...input, miles: m }) }));
  const maxLadder = Math.max(...ladder.map((l) => l.x.approved), 1);

  return (
    <Studio
      title="Your business journeys"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my mileage claim"
      onReset={st.reset}
      dock={{ label: employee ? "Relief to claim" : "Mileage to claim", value: gbp(headline, true) }}
      inputs={
        <>
          <InputGroup title="Who is claiming">
            <Segmented
              label="You are"
              value={v.role}
              onChange={st.bind("role")}
              options={[
                { value: "self", label: "Self-employed", note: "Claim the mileage rate as a business expense instead of actual vehicle costs." },
                { value: "employee", label: "An employee", note: "Using your own vehicle for work. Your employer may pay you a mileage allowance." },
              ]}
            />
          </InputGroup>
          <InputGroup title="Your journeys">
            <Segmented
              label="Vehicle"
              value={v.vehicle}
              onChange={st.bind("vehicle")}
              options={[
                { value: "car", label: "Car or van", note: "45p a mile for the first 10,000 business miles in the tax year, then 25p." },
                { value: "motorcycle", label: "Motorcycle", note: "24p a mile." },
                { value: "bicycle", label: "Bicycle", note: "20p a mile." },
              ]}
            />
            <StepperField label="Business miles this tax year" value={v.miles} onChange={st.bind("miles")} step={100} min={0} max={200_000} unit="miles" dp={0} hint="Not your commute to a regular workplace." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {v.vehicle === "car" && <StepperField label="Business miles already claimed this tax year" value={v.prior} onChange={st.bind("prior")} step={100} min={0} max={200_000} unit="miles" dp={0} optional hint="They count towards the 10,000 miles at 45p." />}
            {employee && <StepperField label="Your employer pays" value={v.paid} onChange={st.bind("paid")} step={1} min={0} max={100} unit="p a mile" dp={1} optional hint="0 if your employer pays nothing." />}
            {employee && v.vehicle === "car" && <StepperField label="Miles with a colleague as passenger" value={v.passenger} onChange={st.bind("passenger")} step={100} min={0} max={200_000} unit="miles" dp={0} optional hint="Your employer can pay up to 5p a mile more tax-free." />}
            <Segmented
              label="Your top rate of tax"
              value={v.band}
              onChange={st.bind("band")}
              optional
              options={[
                { value: "basic", label: "Basic", note: employee ? "20% Income Tax." : "20% Income Tax plus 6% Class 4 NI." },
                { value: "higher", label: "Higher", note: employee ? "40% Income Tax." : "40% Income Tax plus 2% Class 4 NI." },
                { value: "additional", label: "Additional", note: employee ? "45% Income Tax." : "45% Income Tax plus 2% Class 4 NI." },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={employee ? "Mileage Allowance Relief to claim" : "Mileage you can claim"}
        value={gbp(headline, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          employee ? (
            r.reliefClaim > 0 ? (
              <>
                HMRC&apos;s approved rate for <b>{whole(v.miles)}</b> miles is <b>{gbp(r.approved, true)}</b>. Your employer pays <b>{gbp(r.employerPaid, true)}</b>, so you can claim tax relief on the
                <b> {gbp(r.reliefClaim, true)}</b> difference. That saves you about <b>{gbp(r.taxSaved, true)}</b> in tax.
              </>
            ) : (
              <>
                Your employer pays <b>{gbp(r.employerPaid, true)}</b>, which is at least the approved <b>{gbp(r.approved, true)}</b>, so there is nothing to claim.
                {r.taxableExcess > 0 ? <> The <b>{gbp(r.taxableExcess, true)}</b> above it is taxable pay.</> : null}
              </>
            )
          ) : (
            <>
              <b>{whole(v.miles)}</b> business miles by {VEHICLE_LABEL[v.vehicle].toLowerCase()} give a <b>{gbp(r.approved, true)}</b> expense. It cuts your tax and National Insurance by about{" "}
              <b>{gbp(r.taxSaved, true)}</b>.
            </>
          )
        }
        badges={[`${pence(r.averagePence)} a mile on average`, `Saves about ${gbp(r.taxSaved)}`, VEHICLE_LABEL[v.vehicle]]}
      />

      <Facts
        items={[
          { label: "Approved amount", value: gbp(r.approved, true), note: "HMRC rates" },
          ...(v.vehicle === "car" ? [{ label: "At 45p", value: `${whole(r.atFirstRate)} miles` }, { label: "At 25p", value: `${whole(r.atSecondRate)} miles` }] : []),
          employee ? { label: "Employer pays", value: gbp(r.employerPaid, true) } : { label: "Tax and NI saved", value: gbp(r.taxSaved, true), tone: "good" as const },
          ...(v.vehicle !== "car" ? [{ label: "Rate", value: v.vehicle === "motorcycle" ? "24p a mile" : "20p a mile" }] : []),
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Rates", value: "HMRC approved mileage rates" },
          { label: "Relief at", value: `${Math.round(rate * 100)}%${employee ? " Income Tax" : " tax and NI"}` },
          ...(v.prior > 0 ? [{ label: "Earlier miles", value: `${whole(v.prior)} this tax year` }] : []),
        ]}
      />

      {v.miles > 0 && (
        <ResultCard title="How the claim is worked out" sub="The approved rates for this tax year.">
          <Statement
            columns={["Amount"]}
            rows={[
              ...(v.vehicle === "car"
                ? [
                    ...(r.atFirstRate > 0 ? [{ label: `${whole(r.atFirstRate)} miles at 45p`, values: [gbp(r.atFirstRate * MILEAGE_RATES.car.firstRate, true)] }] : []),
                    ...(r.atSecondRate > 0 ? [{ label: `${whole(r.atSecondRate)} miles at 25p`, values: [gbp(r.atSecondRate * MILEAGE_RATES.car.secondRate, true)] }] : []),
                  ]
                : [{ label: `${whole(v.miles)} miles at ${v.vehicle === "motorcycle" ? "24p" : "20p"}`, values: [gbp(r.approved, true)] }]),
              { label: "Approved amount", values: [gbp(r.approved, true)], kind: "total" as const },
              ...(employee
                ? [
                    { label: `Paid by your employer at ${pence(v.paid)}`, values: [`−${gbp(r.employerPaid, true)}`], kind: "deduction" as const },
                    { label: r.reliefClaim > 0 ? "Relief you can claim" : "Taxable excess", values: [gbp(r.reliefClaim > 0 ? r.reliefClaim : r.taxableExcess, true)], kind: "total" as const },
                  ]
                : []),
              { label: `Tax saved at ${Math.round(rate * 100)}%`, values: [gbp(r.taxSaved, true)] },
            ]}
          />
          {r.passenger > 0 && (
            <Callout title={`Passenger payments of up to ${gbp(r.passenger, true)} are tax-free`}>
              Your employer can pay up to 5p a mile extra for carrying a colleague on business. You cannot claim relief if they do not pay it.
            </Callout>
          )}
        </ResultCard>
      )}

      <ResultCard title="Claims at other mileages" sub={`${VEHICLE_LABEL[v.vehicle]}, a full tax year${v.prior > 0 ? ", after your earlier miles" : ""}.`}>
        <Compare
          head={["Business miles", "Approved amount"]}
          rows={ladder.map(({ m, x }) => ({
            label: `${whole(m)} miles`,
            value: gbp(x.approved),
            delta: `${pence(x.averagePence)} a mile`,
            bar: x.approved / maxLadder,
            current: m === v.miles,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="What counts, and what to keep.">
        <Callout tone="warn" title="Commuting does not count">
          Travel between home and a permanent workplace is private. Journeys to a temporary workplace, a client or a supplier usually count.
        </Callout>
        {!employee && v.vehicle === "bicycle" && (
          <Callout tone="warn" title="Bicycles are not in simplified expenses">
            The self-employed flat rates cover cars, vans and motorcycles only. For a bicycle, claim the business share of its actual costs instead. The 20p figure is the employee rate, as a guide.
          </Callout>
        )}
        {!employee && (
          <Callout title="Mileage rate or actual costs, not both">
            Using the mileage rate replaces fuel, insurance, repairs, servicing and the cost of the vehicle itself. Once you use it for a vehicle, you must keep using it for as long as you
            use that vehicle in the business. Parking, tolls and congestion charges can still be claimed on top.
          </Callout>
        )}
        {employee && (
          <Callout title="How to claim">
            Claim online or with form P87 if your expenses are £2,500 or less and you do not file a tax return. Above that, claim through Self Assessment. You can claim for the last four tax
            years.
          </Callout>
        )}
        <Callout title="Keep a mileage log">
          Record the date, start and end points, purpose and miles for each business journey. HMRC can ask for it.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        HMRC approved mileage rates for 2026/27. Not tax advice.
      </p>
    </Studio>
  );
}
