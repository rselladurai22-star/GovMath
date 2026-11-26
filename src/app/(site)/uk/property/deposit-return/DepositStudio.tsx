"use client";

import { useState } from "react";
import { Caveat, Flag, Foot, Hero, Inputs, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { SelectField, Switch } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { DEPOSIT_RULES, depositReturn, ITEM_LIFE, type DeductionClaim, type RentNation } from "@/lib/property/renting";

type Kind = keyof typeof ITEM_LIFE;
const KINDS = Object.keys(ITEM_LIFE) as Kind[];
type Slot = 1 | 2 | 3 | 4;
const SLOTS: Slot[] = [1, 2, 3, 4];

const SCHEMA = {
  nation: oneOf<RentNation>("england", ["england", "wales", "scotland", "ni"]),
  rent: num(1_100, 0, 50_000),
  deposit: num(1_269, 0, 100_000),
  protectedOk: bool(true),
  k1: oneOf<Kind>("carpet", KINDS),
  c1: num(900, 0, 50_000),
  a1: num(5, 0, 50),
  l1: num(0, 0, 50),
  k2: oneOf<Kind>("cleaning", KINDS),
  c2: num(180, 0, 50_000),
  a2: num(0, 0, 50),
  l2: num(0, 0, 50),
  k3: oneOf<Kind>("decoration", KINDS),
  c3: num(0, 0, 50_000),
  a3: num(3, 0, 50),
  l3: num(0, 0, 50),
  k4: oneOf<Kind>("furniture", KINDS),
  c4: num(0, 0, 50_000),
  a4: num(2, 0, 50),
  l4: num(0, 0, 50),
};
const KIND_OPTIONS = KINDS.map((k) => ({ value: k, label: ITEM_LIFE[k].label }));

export default function DepositStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const lifeOf = (n: Slot) => {
    const own = v[`l${n}`];
    const std = ITEM_LIFE[v[`k${n}`]].years;
    return std > 0 ? (own > 0 ? own : std) : 0;
  };
  const claims: DeductionClaim[] = SLOTS.map((n) => ({ kind: v[`k${n}`], claimed: v[`c${n}`], age: v[`a${n}`], life: lifeOf(n) }));
  const r = depositReturn({ nation: v.nation, deposit: v.deposit, monthlyRent: v.rent, claims, protectedInTime: v.protectedOk });
  const rules = DEPOSIT_RULES[v.nation];
  const used = SLOTS.filter((n) => v[`c${n}`] > 0);
  const [shown, setShown] = useState(() => Math.max(1, ...used));
  const rows = SLOTS.slice(0, Math.max(shown, ...used, 1));
  const capLabel = v.nation === "england" ? (v.rent * 12 >= 50_000 ? "6 weeks’ rent" : "5 weeks’ rent") : v.nation === "scotland" ? "2 months’ rent" : v.nation === "ni" ? "1 month’s rent" : "";

  return (
    <Tool label="Deposit return calculator">
      <div className="sa-dep">
        <div className="sa-dep-top">
          <Inputs tone="plain">
            <div className="sa-dep-basics">
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
              <Mini label="Rent a month" value={v.rent} onChange={st.bind("rent")} prefix="£" max={50_000} wide />
              <Mini label="Deposit you paid" value={v.deposit} onChange={st.bind("deposit")} prefix="£" max={100_000} wide />
            </div>
          </Inputs>
          <div className={`sa-dep-cap${r.overCap > 0.5 ? " is-over" : ""}`}>
            {r.cap === null ? (
              <p>
                <b>No fixed cap in Wales.</b> Welsh Ministers can set one by regulations but have not yet.
              </p>
            ) : r.overCap > 0.5 ? (
              <p>
                <b>{gbp(r.overCap, true)} over the legal limit.</b> The most a landlord can take is {capLabel}, {gbp(r.cap, true)}. Ask for the excess back now, whatever happens to the rest.
              </p>
            ) : (
              <p>
                <b>Within the legal limit.</b> The most a landlord can take is {capLabel}: {gbp(r.cap, true)}.
              </p>
            )}
          </div>
        </div>

        <div className="sa-dep-main">
          <section className="sa-dep-sheet" aria-labelledby="dep-sheet-h">
            <h2 className="sa-h" id="dep-sheet-h">
              What your landlord wants to keep
            </h2>
            <div className="sa-dep-cols" aria-hidden="true">
              <span>Item</span>
              <span>Claimed</span>
              <span>Age when you left</span>
              <span>Expected life</span>
              <span>Fair</span>
            </div>
            <ol className="sa-dep-lines">
              {rows.map((n) => {
                const kind = v[`k${n}`];
                const claimed = v[`c${n}`];
                const life = lifeOf(n);
                const ages = ITEM_LIFE[kind].years > 0;
                const line = claims[n - 1];
                const share = life > 0 ? Math.max(0, 1 - line.age / life) : 1;
                const fair = Math.max(0, claimed) * share;
                return (
                  <li key={n} className="sa-dep-line">
                    <div className="sa-dep-item">
                      <SelectField label={`Deduction ${n}`} value={kind} onChange={st.bind(`k${n}`)} options={KIND_OPTIONS} />
                    </div>
                    <Mini label="Claimed" value={claimed} onChange={st.bind(`c${n}`)} prefix="£" max={50_000} />
                    {ages ? (
                      <>
                        <Mini label="Age when you left" value={v[`a${n}`]} onChange={st.bind(`a${n}`)} suffix="yrs" step={0.5} dp={1} max={50} />
                        <Mini label="Expected life" value={life} onChange={(x) => st.set(`l${n}`, x === ITEM_LIFE[kind].years ? 0 : x)} suffix="yrs" step={1} dp={1} min={1} max={50} />
                      </>
                    ) : (
                      <p className="sa-dep-noage">Not reduced for age: the cost itself is what counts.</p>
                    )}
                    <div className="sa-dep-fair" aria-live="polite">
                      <span className="sa-dep-life" role="img" aria-label={ages ? `${percent(share)} of its life left` : "Charged in full"}>
                        <span style={{ width: `${share * 100}%` }} />
                      </span>
                      <b>{gbp(fair)}</b>
                      <small>{claimed > 0 ? (ages ? `${percent(share)} of life left` : "in full if justified") : "nothing claimed"}</small>
                    </div>
                  </li>
                );
              })}
            </ol>
            {rows.length < 4 && (
              <button type="button" className="sa-dep-add" onClick={() => setShown(rows.length + 1)}>
                + Add a deduction
              </button>
            )}
          </section>

          <div className="sa-dep-answer">
            <Hero
              label="You should get back"
              value={gbp(r.back)}
              sub={
                r.claimed > 0 ? (
                  <>
                    Of the <b>{gbp(r.claimed)}</b> claimed, about <b>{gbp(r.fair)}</b> is fair once wear and tear is allowed for. If every claim stood, you would get {gbp(r.backIfAccepted)}.
                  </>
                ) : (
                  <>No deductions entered, so the whole deposit.</>
                )
              }
            />
            <figure className="sa-dep-split" role="img" aria-label={`Deposit ${gbp(v.deposit)}: ${gbp(r.back)} back, ${gbp(Math.min(r.fair, v.deposit))} fair deductions, ${gbp(Math.max(0, Math.min(r.claimed, v.deposit) - Math.min(r.fair, v.deposit)))} claimed above fair`}>
              <div aria-hidden="true">
                <span className="is-back" style={{ flex: r.back }} />
                <span className="is-fair" style={{ flex: Math.min(r.fair, v.deposit) }} />
                <span className="is-extra" style={{ flex: Math.max(0, Math.min(r.claimed, v.deposit) - Math.min(r.fair, v.deposit)) }} />
              </div>
              <figcaption>
                <span className="is-back">Back to you</span>
                <span className="is-fair">Fair deductions</span>
                <span className="is-extra">Claimed beyond fair</span>
              </figcaption>
            </figure>
            <Switch
              label="My deposit was protected in a scheme on time"
              checked={v.protectedOk}
              onChange={st.bind("protectedOk")}
              hint={`Within ${rules.protectDays} of paying it, with the scheme’s details given to you.`}
            />
            {r.penaltyRange && (
              <Flag tone="warn" title={r.penaltyRange[0] > 0 ? `A court can award ${gbp(r.penaltyRange[0])} to ${gbp(r.penaltyRange[1])}` : `A tribunal can award up to ${gbp(r.penaltyRange[1])}`}>
                {v.nation === "scotland" ? "Apply to the First-tier Tribunal within 3 months of the tenancy ending." : "On top of getting the deposit itself back. Get advice from Shelter or Citizens Advice before you claim."}
              </Flag>
            )}
            <Foot>
              <Caveat>
                An estimate of what a deposit scheme adjudicator is likely to allow: they look at evidence, item by item, and expected lives vary with quality. Unpaid rent and real cleaning
                costs are charged in full.
              </Caveat>
              <ShareButton copied={st.copied} onClick={st.share} />
            </Foot>
          </div>
        </div>
      </div>
    </Tool>
  );
}
