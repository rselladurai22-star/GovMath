"use client";

import { Caveat, Foot, Hero, Inputs, Tool } from "@/components/calc/kit";
import { Pills } from "@/components/calc/fields";
import { MoneyField } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { WALES_2026, WALES_GRANT, wales2026, type WalesLiving } from "@/lib/students/nations";

const SCHEMA = {
  income: num(35_000, 0, 1_000_000),
  living: oneOf<WalesLiving>("away", ["home", "away", "london"]),
  // Course length and salary: kept so older shared links still open; the page no longer asks for them.
  years: num(3, 1, 6),
  salary: num(32_000, 0, 500_000),
};

const WHERE: Record<WalesLiving, string> = {
  home: "living with your parents",
  away: "living away from home outside London",
  london: "studying in London",
};

export default function WalesStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = wales2026(v.income, v.living);
  const w = WALES_2026[v.living];
  const g = (n: number) => `${(n / r.total) * 100}%`;
  const share = r.grant / r.total;
  const band = v.income <= WALES_GRANT.fullTo ? "full" : v.income >= WALES_GRANT.minFrom ? "base" : "taper";

  return (
    <Tool label="Student Finance Wales calculator">
      <div className="sa-sfw">
        <div className="sa-sfw-inputs">
          <Inputs title="Your household">
            <MoneyField
              label="Household income"
              value={v.income}
              onChange={st.bind("income")}
              slider={{ min: 0, max: 80_000, step: 250, ends: ["£0", "£80,000"] }}
              hint="Your parents’ taxable income for the 2024/25 tax year, or yours and your partner’s if you are an independent student."
            />
            <Pills
              label="Where you will live in term time"
              value={v.living}
              onChange={st.bind("living")}
              options={[
                { value: "home", label: "At home" },
                { value: "away", label: "Away" },
                { value: "london", label: "London" },
              ]}
            />
          </Inputs>
        </div>

        <div className="sa-sfw-main">
          <Hero
            label="Your student finance for living costs, 2026/27"
            value={gbp(r.total)}
            unit="a year"
            sub={
              <>
                <b>{gbp(r.grant)}</b> of it is a Welsh Government Learning Grant you never repay ({percent(share, 0)}), and <b>{gbp(r.loan)}</b> is a Maintenance Loan, {WHERE[v.living]}.
              </>
            }
          />

          <figure className="sa-sfw-split" role="img" aria-label={`Of ${gbp(r.total)} a year, ${gbp(r.grant)} is grant and ${gbp(r.loan)} is loan. The grant can be anything from ${gbp(WALES_GRANT.minGrant)} to ${gbp(w.maxGrant)}; the total stays the same.`}>
            <div className="sa-sfw-track" aria-hidden="true">
              <span className="sa-sfw-range" style={{ left: g(WALES_GRANT.minGrant), width: g(w.maxGrant - WALES_GRANT.minGrant) }} />
              <span className="sa-sfw-grant" style={{ width: g(r.grant) }}>
                <b>Grant</b> {gbp(r.grant)}
              </span>
              <span className="sa-sfw-loan" style={{ left: g(r.grant) }}>
                <b>Loan</b> {gbp(r.loan)}
              </span>
            </div>
            <div className="sa-sfw-scale" aria-hidden="true">
              <span>
                Least grant <b>{gbp(WALES_GRANT.minGrant)}</b> at {gbp(WALES_GRANT.minFrom)} or more
              </span>
              <span>
                Most grant <b>{gbp(w.maxGrant)}</b> at {gbp(WALES_GRANT.fullTo)} or less
              </span>
            </div>
            <figcaption>
              The bar is always {gbp(r.total)}. As household income rises, the grant (green) shrinks and the loan takes its place; the shaded stretch is how far the grant can move.
            </figcaption>
          </figure>

          <dl className="sa-sfw-facts">
            <div>
              <dt>Each term</dt>
              <dd>
                About <b>{gbp(r.total / 3)}</b>, grant and loan together, paid at the start of term
              </dd>
            </div>
            <div>
              <dt>Tuition</dt>
              <dd>A Tuition Fee Loan of up to {gbp(WALES_GRANT.feeLoan)} a year, paid to your university anywhere in the UK</dd>
            </div>
            <div>
              <dt>Written off</dt>
              <dd>Up to {gbp(WALES_GRANT.cancellation)} of your first Maintenance Loan when you make your first repayment</dd>
            </div>
          </dl>
          <p className="sa-sfw-band">
            {band === "full"
              ? `At ${gbp(WALES_GRANT.fullTo)} or less you get the most grant there is; earning less does not add any more.`
              : band === "base"
                ? `At ${gbp(WALES_GRANT.minFrom)} or more everyone gets the ${gbp(WALES_GRANT.minGrant)} base grant, and higher income makes no further difference.`
                : `Between ${gbp(WALES_GRANT.fullTo)} and ${gbp(WALES_GRANT.minFrom)}, each extra £1,000 of household income turns about ${gbp(((w.maxGrant - WALES_GRANT.minGrant) / (WALES_GRANT.minFrom - WALES_GRANT.fullTo)) * 1000)} of grant into loan.`}
          </p>

          <Foot>
            <Caveat>
              Exact at the published 2026/27 Student Finance Wales incomes, and within about £1 between them, for a full-time undergraduate who started in or after August 2018. Student
              Finance Wales confirms your figure; this leaves out the Special Support Grant, Childcare Grant and other extra help.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
