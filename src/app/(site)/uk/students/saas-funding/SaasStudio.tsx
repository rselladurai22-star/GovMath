"use client";

import { Caveat, Foot, Hero, Inputs, Tool } from "@/components/calc/kit";
import { Pills } from "@/components/calc/fields";
import { MoneyField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { SAAS_2026, saas2026 } from "@/lib/students/nations";

const SCHEMA = {
  who: oneOf<"young" | "independent">("young", ["young", "independent"]),
  income: num(30_000, 0, 1_000_000),
  where: oneOf<"scotland" | "ruk">("scotland", ["scotland", "ruk"]),
  // Course length and salary: kept so older shared links still open; the page no longer asks for them.
  years: num(4, 1, 6),
  salary: num(35_000, 0, 500_000),
};

const BAND_LABEL = ["£20,999 or less", "£21,000 to £23,999", "£24,000 to £33,999", "£34,000 or more"];
const BAND_SHORT = ["Up to £20,999", "£21,000–£23,999", "£24,000–£33,999", "£34,000 and over"];

export default function SaasStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const independent = v.who === "independent";
  const r = saas2026(v.income, independent);
  const bands = independent ? SAAS_2026.independent : SAAS_2026.young;
  const top = 12_000;
  const kind = independent ? "Independent" : "Young";

  return (
    <Tool label="SAAS funding calculator">
      <div className="sa-saas">
        <div className="sa-saas-inputs">
          <Inputs title="You and your household">
            <Pills
              label="Type of student"
              value={v.who}
              onChange={st.bind("who")}
              options={[
                { value: "young", label: "Young" },
                { value: "independent", label: "Independent" },
              ]}
            />
            <p className="sa-saas-who">
              {independent
                ? "25 or over, married or in a civil partnership, living with a partner, a parent, or self-supporting for 3 years before the course."
                : "Under 25 on the first day of the course, no children, not married or living with a partner, and not self-supporting for 3 years."}
            </p>
            <MoneyField
              label={independent ? "Your income and your partner’s" : "Household income"}
              value={v.income}
              onChange={st.bind("income")}
              slider={{ min: 0, max: 50_000, step: 250, ends: ["£0", "£50,000"] }}
              hint={
                independent
                  ? "Gross taxable income for the last tax year: yours, and your husband’s, wife’s, civil partner’s or partner’s if you live together."
                  : "Your parents’ gross taxable income for the last tax year (the parent you live with and their partner, if they are separated). Over £34,000 you do not need to send it."
              }
            />
            <Pills
              label="Where you will study"
              value={v.where}
              onChange={st.bind("where")}
              options={[
                { value: "scotland", label: "In Scotland" },
                { value: "ruk", label: "Elsewhere in the UK" },
              ]}
            />
          </Inputs>
        </div>

        <div className="sa-saas-main">
          <Hero
            label={`Your SAAS living-cost support for 2026/27`}
            value={gbp(r.total)}
            unit="a year"
            sub={
              <>
                <b>{gbp(r.bursary)}</b> {kind} Students&rsquo; Bursary, which you never repay, and a <b>{gbp(r.loan)}</b> student loan. Spread over the year that is about{" "}
                <b>{gbp(r.total / 12)}</b> a month.
              </>
            }
          />

          <figure className="sa-saas-ladder" role="img" aria-label={`${kind} student support by household income band in 2026/27: ${bands.map((b, i) => `${BAND_LABEL[i]}, ${gbp(b.bursary)} bursary and ${gbp(b.loan)} loan`).join("; ")}. Your band: ${BAND_LABEL[r.band]}.`}>
            <div className="sa-saas-steps" aria-hidden="true">
              {bands.map((b, i) => (
                <div key={i} className={`sa-saas-step${i === r.band ? " is-on" : ""}`}>
                  <span className="sa-saas-total">{gbp(b.bursary + b.loan)}</span>
                  <div className="sa-saas-bar" style={{ height: `${((b.bursary + b.loan) / top) * 100}%` }}>
                    {b.bursary > 0 && (
                      <span className="sa-saas-bursary" style={{ flexGrow: b.bursary }}>
                        {b.bursary >= 900 ? gbp(b.bursary) : ""}
                      </span>
                    )}
                    <span className="sa-saas-loan" style={{ flexGrow: b.loan }}>
                      {gbp(b.loan)}
                    </span>
                  </div>
                  <span className="sa-saas-band">
                    {BAND_SHORT[i]}
                    {i === r.band && <em>Your band</em>}
                  </span>
                </div>
              ))}
            </div>
            <figcaption>
              <span>
                <i className="is-bursary" aria-hidden="true" />
                Bursary, not repaid
              </span>
              <span>
                <i className="is-loan" aria-hidden="true" />
                Student loan, repaid on Plan 4
              </span>
            </figcaption>
          </figure>

          <dl className="sa-saas-fees">
            <div>
              <dt>Tuition</dt>
              <dd>
                {v.where === "scotland" ? (
                  <>
                    <b>Free.</b> SAAS pays your university {gbp(SAAS_2026.scottishFee)} a year for a first degree, and you never repay it.
                  </>
                ) : (
                  <>
                    <b>A Tuition Fee Loan of up to {gbp(SAAS_2026.rukFeeLoan)} a year</b>, paid to your university and added to the same Plan 4 loan. Tuition is only free in Scotland.
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Repaying</dt>
              <dd>9% of income over {gbp(SAAS_2026.plan4Threshold)} a year, from the April after you leave. Anything left after 30 years is written off.</dd>
            </div>
          </dl>

          <Foot>
            <Caveat>
              Exact at the SAAS 2026/27 bands for a full-time first degree or HNC/HND. SAAS confirms your award from your application; this leaves out the Care Experienced Students&rsquo; Bursary,
              Lone Parents&rsquo; Grant and Disabled Students&rsquo; Allowance.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
