"use client";

import Link from "next/link";
import { TFC, taxFreeChildcarePlan, ucChildcareCeiling } from "@/lib/benefits/family";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { MoneyField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import TopUpBars from "./TopUpBars";

const SCHEMA = {
  kids: num(1, 1, 3),
  c1: num(6_000, 0, 200_000),
  c2: num(0, 0, 200_000),
  c3: num(0, 0, 200_000),
  d1: bool(false),
  d2: bool(false),
  d3: bool(false),
  uc: bool(false),
};
const COST_KEYS = ["c1", "c2", "c3"] as const;
const DIS_KEYS = ["d1", "d2", "d3"] as const;

export default function TfcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  // Older links set a second or third cost without a count.
  const kids = Math.max(Math.round(v.kids), v.c3 > 0 ? 3 : v.c2 > 0 ? 2 : 1);
  const children = COST_KEYS.slice(0, kids).map((k, i) => ({ cost: v[k], disabled: v[DIS_KEYS[i]] }));
  const r = taxFreeChildcarePlan(children);
  const uc = ucChildcareCeiling(children);
  const ucBetter = uc.annual > r.topUp + 0.5;
  const capped = r.children.some((c) => c.capped);
  const over = r.children.reduce((a, c) => a + Math.max(0, c.cost - c.cap / TFC.share), 0);
  const m = (n: number) => gbp(n);

  return (
    <Tool label="Tax-Free Childcare calculator">
      <div className="sa-tf">
        <div className="sa-tf-inputs">
          <Inputs tone="plain">
            <Pills
              label="Children in paid childcare"
              value={String(kids) as "1" | "2" | "3"}
              onChange={(x) => st.set("kids", Number(x))}
              options={[
                { value: "1", label: "One" },
                { value: "2", label: "Two" },
                { value: "3", label: "Three" },
              ]}
            />
            {COST_KEYS.slice(0, kids).map((k, i) => (
              <div key={k} className="sa-tf-child">
                {i === 0 ? (
                  <MoneyField
                    label={kids > 1 ? "First child's childcare a year" : "Childcare a year"}
                    value={v[k]}
                    onChange={st.bind(k)}
                    big
                    slider={{ min: 0, max: 20_000, step: 250, ends: ["£0", "£20k"] }}
                    hint="Nursery, childminder, nanny, breakfast, after-school and holiday clubs: what you pay a registered provider, after any funded hours."
                  />
                ) : (
                  <Mini label={`${i === 1 ? "Second" : "Third"} child's childcare a year`} value={v[k]} onChange={st.bind(k)} prefix="£" max={200_000} step={250} wide />
                )}
                <Switch label={kids > 1 ? `${["First", "Second", "Third"][i]} child is disabled` : "My child is disabled"} checked={v[DIS_KEYS[i]]} onChange={st.bind(DIS_KEYS[i])} hint="Gets DLA, PIP, Child or Adult Disability Payment, or is certified blind: a £4,000 limit, and the account runs to 16." />
              </div>
            ))}
          </Inputs>
        </div>

        <div className="sa-tf-answer" aria-live="polite">
          <p className="sa-tf-kicker">The government adds</p>
          <p className="sa-tf-big">
            <b>{m(r.topUp)}</b> a year
          </p>
          <p className="sa-tf-sub">
            On {m(r.cost)} of childcare you pay in <b>{m(r.youPay)}</b>, about {m(r.youPay / 12)} a month.
            {capped ? " At least one child is at the limit, so spending more adds nothing." : r.cost > 0 ? ` Every £8 you pay in becomes £10.` : ""}
          </p>
          <ul className="sa-tf-quarters">
            {r.children.map((c, i) => (
              <li key={i}>
                <span>{kids > 1 ? `Child ${i + 1}` : "Each quarter"}</span>
                <b>{m(c.topUp / 4)}</b> of {m(c.cap / 4)} a quarter
              </li>
            ))}
          </ul>
        </div>

        <div className="sa-tf-bars">
          <TopUpBars rows={r.children.map((c, i) => ({ label: kids > 1 ? `Child ${i + 1}${children[i].disabled ? " (disabled)" : ""}` : children[0].disabled ? "Your child (disabled)" : "Your child", ...c }))} money={m} share={TFC.share} />
        </div>

        <div className="sa-tf-uc">
          <Inputs tone="plain">
            <Pills label="Could you claim Universal Credit?" value={v.uc ? "yes" : "no"} onChange={(x) => st.set("uc", x === "yes")} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes, or not sure" }]} />
          </Inputs>
          {v.uc && (
            <div className="sa-tf-versus" aria-live="polite">
              <div className={!ucBetter ? "is-best" : undefined}>
                <p>Tax-Free Childcare</p>
                <b>{m(r.topUp)}</b>
                <span>20% of the bill, up to {m(TFC.capPerChild)} a child</span>
              </div>
              <div className={ucBetter ? "is-best" : undefined}>
                <p>Universal Credit childcare</p>
                <b>up to {m(uc.annual)}</b>
                <span>
                  85% of the bill, up to {gbp(uc.capMonthly, true)} a month{kids > 1 ? " for two or more" : ""}
                </span>
              </div>
              <p className="sa-tf-verdict">
                {ucBetter
                  ? `Universal Credit could pay up to ${m(uc.annual - r.topUp)} a year more, but only if your award is big enough to carry it: the childcare amount sits inside your Universal Credit and the taper on your pay can take it back.`
                  : "Tax-Free Childcare pays at least as much here, and it does not shrink as you earn more."}{" "}
                You cannot have both: <Link href="/uk/benefits/universal-credit">estimate your Universal Credit</Link> before you choose.
              </p>
            </div>
          )}
        </div>

        {over > 0.5 && (
          <Flag title={`${m(over)} of your spending gets no top-up`}>
            The top-up stops once a child&rsquo;s account has had {m(TFC.capPerChild)} in a year ({m(TFC.capDisabled)} for a disabled child), which is reached at {m(r.spendForMaxTopUp)} of childcare. The limit is per quarter, so a big summer bill can use only one quarter&rsquo;s {m(TFC.capPerChild / 4)}.
          </Flag>
        )}

        <Foot>
          <Caveat>Exact for the costs you enter, at the 2026/27 limits, if you pass the working parent test. It assumes costs are spread across the year: each quarter has its own limit.</Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
