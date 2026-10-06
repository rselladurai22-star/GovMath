"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { DEPOSIT_RULES, depositReturn, ITEM_LIFE, RENT_RULES, type DeductionClaim, type RentNation } from "@/lib/property/renting";

type Kind = keyof typeof ITEM_LIFE;
const KINDS = Object.keys(ITEM_LIFE) as Kind[];

const SCHEMA = {
  nation: oneOf<RentNation>("england", ["england", "wales", "scotland", "ni"]),
  rent: num(1_100, 0, 50_000),
  deposit: num(1_269, 0, 100_000),
  protectedOk: bool(true),
  k1: oneOf<Kind>("carpet", KINDS),
  c1: num(900, 0, 50_000),
  a1: num(5, 0, 50),
  k2: oneOf<Kind>("cleaning", KINDS),
  c2: num(180, 0, 50_000),
  a2: num(0, 0, 50),
  k3: oneOf<Kind>("decoration", KINDS),
  c3: num(0, 0, 50_000),
  a3: num(3, 0, 50),
  k4: oneOf<Kind>("furniture", KINDS),
  c4: num(0, 0, 50_000),
  a4: num(2, 0, 50),
};
const ADVANCED = ["k3", "c3", "a3", "k4", "c4", "a4", "protectedOk"] as const;
const KIND_OPTIONS = KINDS.map((k) => ({ value: k, label: ITEM_LIFE[k].years > 0 ? `${ITEM_LIFE[k].label} (lasts about ${ITEM_LIFE[k].years} years)` : ITEM_LIFE[k].label }));

export default function DepositStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const slot = (k: Kind, claimed: number, age: number): DeductionClaim => ({ kind: k, claimed, age, life: ITEM_LIFE[k].years });
  const claims = [slot(v.k1, v.c1, v.a1), slot(v.k2, v.c2, v.a2), slot(v.k3, v.c3, v.a3), slot(v.k4, v.c4, v.a4)];
  const r = depositReturn({ nation: v.nation, deposit: v.deposit, monthlyRent: v.rent, claims, protectedInTime: v.protectedOk });
  const rules = DEPOSIT_RULES[v.nation];
  const nationLabel = RENT_RULES[v.nation].label;

  const item = (n: 1 | 2 | 3 | 4, optional = false) => {
    const kKey = `k${n}` as const;
    const cKey = `c${n}` as const;
    const aKey = `a${n}` as const;
    const kind = v[kKey];
    return (
      <>
        <SelectField label={`Deduction ${n}: what for`} value={kind} onChange={st.bind(kKey)} options={KIND_OPTIONS} optional={optional} />
        <MoneyField label={`Deduction ${n}: amount claimed`} value={v[cKey]} onChange={st.bind(cKey)} optional={optional} hint={n === 1 ? "What your landlord wants to keep. Leave at £0 if nothing." : undefined} />
        {ITEM_LIFE[kind].years > 0 && v[cKey] > 0 && (
          <StepperField label={`Deduction ${n}: age of the item`} value={v[aKey]} onChange={st.bind(aKey)} step={0.5} min={0} max={50} unit="years" dp={1} optional={optional} hint="How old it was when you moved out." />
        )}
      </>
    );
  };

  return (
    <Studio
      title="Your deposit and the deductions"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my deposit return"
      onReset={st.reset}
      dock={{ label: "Fair amount back", value: gbp(r.back) }}
      inputs={
        <>
          <InputGroup title="Your tenancy">
            <Segmented
              label="Country"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England" },
                { value: "wales", label: "Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "ni", label: "Northern Ireland" },
              ]}
            />
            <MoneyField label="Rent a month" value={v.rent} onChange={st.bind("rent")} />
            <MoneyField label="Deposit you paid" value={v.deposit} onChange={st.bind("deposit")} />
          </InputGroup>
          <InputGroup title="What your landlord wants to deduct">
            {item(1)}
            {item(2)}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {item(3, true)}
            {item(4, true)}
            <Switch label="My deposit was protected in a scheme on time" checked={v.protectedOk} onChange={st.bind("protectedOk")} optional hint={`Within ${rules.protectDays} of paying it, with the required information given to you.`} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Fair amount back"
        value={gbp(r.back)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.claimed > 0 ? (
            <>
              Your landlord wants to keep <b>{gbp(r.claimed)}</b>. Allowing for fair wear and tear, a fair deduction is about <b>{gbp(r.fair)}</b>, so you should get back around{" "}
              <b>{gbp(r.back)}</b> of your {gbp(v.deposit)} deposit, not {gbp(r.backIfAccepted)}.
            </>
          ) : (
            <>
              With no deductions claimed, you should get your whole <b>{gbp(v.deposit)}</b> deposit back.
            </>
          )
        }
        badges={[nationLabel, r.cap !== null ? `Cap ${gbp(r.cap, true)}` : "No fixed cap", v.protectedOk ? "Protected" : "Not protected"]}
      />

      <Facts
        items={[
          { label: "Claimed", value: gbp(r.claimed) },
          { label: "Fair deductions", value: gbp(r.fair) },
          { label: "You should get back", value: gbp(r.back), tone: "good" },
          { label: "Legal cap", value: r.cap !== null ? gbp(r.cap, true) : "None set", tone: r.overCap > 0.5 ? "bad" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Fair wear and tear", value: "Charges cut by the share of the item's life already used" },
          { label: "Item lives", value: "Typical figures, such as 8 years for a carpet and 5 for decorating" },
          { label: "Cleaning and rent", value: "Not reduced for age" },
          { label: "Rules", value: `${nationLabel}: protect within ${rules.protectDays}` },
        ]}
      />

      {r.lines.length > 0 && (
        <ResultCard title="Each deduction" sub="What was claimed and what is fair after wear and tear.">
          <Statement
            columns={["Claimed", "Fair"]}
            rows={[
              ...r.lines.map((l) => ({
                label: ITEM_LIFE[l.kind].years > 0 ? `${ITEM_LIFE[l.kind].label}, ${l.age} of ${l.life} years used (${percent(l.share)} left)` : ITEM_LIFE[l.kind].label,
                values: [gbp(l.claimed), gbp(l.fair)],
              })),
              { label: "Total", values: [gbp(r.claimed), gbp(r.fair)], kind: "total" as const },
            ]}
          />
        </ResultCard>
      )}

      {v.deposit > 0 && (
        <ResultCard title="Your deposit" sub={`${gbp(v.deposit)} paid.`}>
          <SplitBar
            segments={[
              { label: "Back to you", value: r.back, display: gbp(r.back), color: "#5b1e6e" },
              { label: "Fair deductions", value: Math.min(v.deposit, r.fair), display: gbp(Math.min(v.deposit, r.fair)), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="What to do next" sub={`Your rights in ${nationLabel}.`}>
        {r.overCap > 0.5 && (
          <Callout tone="warn" title="Your deposit is more than the legal limit">
            The most a landlord can take in {nationLabel} is {rules.cap}: {gbp(r.cap ?? 0, true)} here. You can ask for the {gbp(r.overCap, true)} extra back now.
          </Callout>
        )}
        {r.penaltyRange && (
          <Callout tone="warn" title="An unprotected deposit can mean compensation">
            If your deposit was not protected in time, a court can order your landlord to pay you {rules.penalty}: {r.penaltyRange[0] > 0 ? `${gbp(r.penaltyRange[0])} to ` : "up to "}
            {gbp(r.penaltyRange[1])} here, on top of the deposit.
          </Callout>
        )}
        {r.claimed > r.fair + 0.5 && (
          <Callout title="Use the free dispute service">
            Your deposit scheme offers free adjudication. Send your check-in and check-out reports, photos and the age of each item. The landlord has to prove each deduction.
          </Callout>
        )}
        <Callout title="When you should get it back">
          {v.nation === "england" || v.nation === "wales"
            ? "Your landlord must return the deposit within 10 days of you both agreeing the amount."
            : v.nation === "scotland"
              ? "Ask for the deposit back through the scheme as soon as the tenancy ends. Either side can raise a dispute if you cannot agree."
              : "Ask your landlord and the scheme for repayment when the tenancy ends. The scheme can resolve a dispute."}
        </Callout>
        <Callout title="Moving to a new home?">
          See what you might pay with our <a href="/life/pro-rata-rent">pro-rata rent calculator</a>, and check a new rent rise with the <a href="/property/rent-increase">rent increase checker</a>.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Based on the Tenant Fees Act 2019 and Housing Act 2004 (England), the Renting Homes (Wales) Act 2016, the Tenancy Deposit Schemes (Scotland) Regulations 2011 and the Private Tenancies
        Act (Northern Ireland) 2022. General information, not legal advice.
      </p>
    </Studio>
  );
}
