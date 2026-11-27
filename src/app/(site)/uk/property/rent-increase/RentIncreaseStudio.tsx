"use client";

import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { DateField, MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { formatDate } from "@/lib/life/calendar";
import { RENT_RULES, rentIncrease, type RentNation } from "@/lib/property/renting";

type FormAnswer = "yes" | "no" | "unsure";

const SCHEMA = {
  nation: oneOf<RentNation>("england", ["england", "wales", "scotland", "ni"]),
  current: num(1_100, 0, 50_000),
  proposed: num(1_200, 0, 50_000),
  served: date("2026-10-01"),
  starts: date("2026-12-01"),
  last: date("2025-12-01"),
  form: oneOf<FormAnswer>("yes", ["yes", "no", "unsure"]),
  fixed: bool(false),
  income: num(0, 0, 100_000),
  market: num(0, 0, 50_000),
};

const FORM_NAME: Record<RentNation, string> = {
  england: "Form 4A (section 13 notice)",
  wales: "Form RHW12",
  scotland: "the rent-increase notice form",
  ni: "a written notice with the new rent and its start date",
};

type Check = { name: string; ok: boolean | null; detail: string };

export default function RentIncreaseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const rules = RENT_RULES[v.nation];
  const r = rentIncrease({ nation: v.nation, current: v.current, proposed: v.proposed, served: v.served, starts: v.starts, lastChange: v.last, income: v.income, market: v.market });
  const rising = r.monthly > 0;
  const fixedTerm = v.fixed && (v.nation === "wales" || v.nation === "ni");
  const earliest = r.earliestByNotice > r.earliestByYear ? r.earliestByNotice : r.earliestByYear;
  const d = (iso: string) => formatDate(iso, "medium");

  const checks: Check[] = [
    {
      name: "The right form",
      ok: v.form === "yes" ? true : v.form === "no" ? false : null,
      detail:
        v.form === "yes"
          ? `Given on ${FORM_NAME[v.nation]}.`
          : v.form === "no"
            ? `It must be ${FORM_NAME[v.nation]}${v.nation === "england" ? ". A letter, an email without the form, or a rent review clause does not count" : ""}.`
            : `Look for ${FORM_NAME[v.nation]}. Without it the rise does not take effect.`,
    },
    {
      name: `At least ${rules.noticeMonths} months’ notice`,
      ok: r.noticeOk,
      detail: r.noticeOk
        ? `${r.daysToStart} days between getting the notice and the new rent: the earliest start was ${d(r.earliestByNotice)}.`
        : `Only ${Math.max(0, r.daysToStart)} days. With this notice the new rent cannot start before ${d(r.earliestByNotice)}.`,
    },
    {
      name: "Not within a year of the last rise",
      ok: r.yearOk,
      detail: r.yearOk
        ? `${v.nation === "england" ? "52 weeks" : "12 months"} after ${d(v.last)} is ${d(r.earliestByYear)}, and the rise starts on or after it.`
        : `${v.nation === "england" ? "52 weeks" : "12 months"} after ${d(v.last)} is ${d(r.earliestByYear)}. The rise is too early.`,
    },
    ...(r.rentDayOk !== null
      ? [
          {
            name: "Starts on a rent day",
            ok: r.rentDayOk,
            detail: r.rentDayOk
              ? "It starts on the day your rent period begins."
              : `A section 13 rise must start at the beginning of a rent period. ${d(v.starts)} is not the same day of the month as ${d(v.last)}: check your rent day.`,
          },
        ]
      : []),
  ];
  const failed = checks.filter((c) => c.ok === false);
  const unsure = checks.some((c) => c.ok === null);
  const verdict: "valid" | "invalid" | "check" | "flat" = !rising ? "flat" : fixedTerm || failed.length > 0 ? "invalid" : unsure ? "check" : "valid";

  const headline =
    verdict === "flat"
      ? "This is not a rent rise"
      : verdict === "valid"
        ? "This notice looks valid"
        : verdict === "check"
          ? "Valid on timing: check the form"
          : fixedTerm
            ? "Not during a fixed term"
            : failed.length === 1
              ? `Not valid: ${failed[0].name.toLowerCase()}`
              : `Not valid: ${failed.length} problems`;

  return (
    <Tool label="Rent increase checker">
      <div className="sa-ri">
        <div className="sa-ri-inputs">
          <Inputs title="Your notice">
            <SelectField
              label="Where the home is"
              hint="For private tenancies: assured periodic in England, occupation contracts in Wales, private residential tenancies in Scotland."
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England" },
                { value: "wales", label: "Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "ni", label: "Northern Ireland" },
              ]}
            />
            <div className="sa-ri-pair">
              <Mini label="Rent now, a month" value={v.current} onChange={st.bind("current")} prefix="£" max={50_000} wide />
              <Mini label="New rent, a month" value={v.proposed} onChange={st.bind("proposed")} prefix="£" max={50_000} wide />
            </div>
            <DateField label="Date you got the notice" value={v.served} onChange={(x) => x && st.set("served", x)} />
            <DateField label="Date the new rent starts" value={v.starts} onChange={(x) => x && st.set("starts", x)} />
            <DateField
              label={v.nation === "england" ? "When the tenancy began or the rent last went up" : "When you moved in or the rent last went up"}
              value={v.last}
              onChange={(x) => x && st.set("last", x)}
              hint="Whichever is later."
            />
            <Pills
              label={v.nation === "ni" ? "Was it in writing, with the new rent and its start date?" : `Was it on ${FORM_NAME[v.nation]}?`}
              value={v.form}
              onChange={st.bind("form")}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unsure", label: "Not sure" },
              ]}
            />
            {(v.nation === "wales" || v.nation === "ni") && (
              <Switch label="I am still in a fixed term" checked={v.fixed} onChange={st.bind("fixed")} hint="A fixed-term contract or tenancy agreement that has not yet ended." />
            )}
          </Inputs>
        </div>

        <div className="sa-ri-result">
          <div className={`sa-ri-verdict is-${verdict}`} aria-live="polite">
            <span className="sa-ri-mark" aria-hidden="true" />
            <div>
              <p className="sa-ri-kicker">{rules.label}</p>
              <p className="sa-ri-headline">{headline}</p>
              {rising && (verdict === "invalid" ? (
                <p className="sa-ri-sub">
                  {fixedTerm
                    ? "The rent can only change in a fixed term if your agreement has a rent review term, or you agree. Keep paying the current rent."
                    : failed.some((c) => c.name !== "The right form")
                      ? <>Keep paying {gbp(v.current)}. On these dates the earliest a valid rise could start is <b>{d(earliest)}</b>, with a fresh notice.</>
                      : <>Keep paying {gbp(v.current)} and ask your landlord for the correct form.</>}
                </p>
              ) : (
                <p className="sa-ri-sub">
                  The new rent of {gbp(v.proposed)} can start on <b>{d(v.starts)}</b> unless you challenge it{r.challengeBy ? <> by <b>{d(r.challengeBy)}</b></> : null}.
                </p>
              ))}
            </div>
          </div>

          {rising && (
            <ol className="sa-ri-checks" aria-label="Checks on the notice">
              {checks.map((c) => (
                <li key={c.name} className={c.ok === true ? "is-pass" : c.ok === false ? "is-fail" : "is-unsure"}>
                  <span className="sa-ri-tick" aria-hidden="true" />
                  <div>
                    <b>
                      {c.name}
                      <span className="sr-only">: {c.ok === true ? "passes" : c.ok === false ? "fails" : "not known"}</span>
                    </b>
                    <span>{c.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {rising && (
            <div className="sa-ri-cost">
              <p>
                <b>+{gbp(r.monthly)}</b>
                <span>a month</span>
              </p>
              <p>
                <b>+{gbp(r.yearly)}</b>
                <span>a year</span>
              </p>
              <p>
                <b>{percent(r.share, 1)}</b>
                <span>rise</span>
              </p>
              <p className="sa-ri-deadline">
                <b>{r.challengeBy ? d(r.challengeBy) : "No tribunal"}</b>
                <span>{r.challengeBy ? `last day to ${v.nation === "scotland" ? "refer it to Rent Service Scotland" : v.nation === "wales" ? "apply to the tribunal, for tenancies from before December 2022" : "apply to the tribunal"}` : "get advice from Housing Rights"}</span>
              </p>
            </div>
          )}

          <details className="sa-ri-more" open={v.market > 0 || v.income > 0 || undefined}>
            <summary>Compare with local rents and your income</summary>
            <div className="sa-ri-pair">
              <MoneyField label="Rent for similar homes nearby, a month" value={v.market} onChange={st.bind("market")} hint="From listings for the same size and type of home." />
              <MoneyField label="Household take-home pay, a month" value={v.income} onChange={st.bind("income")} />
            </div>
            {r.aboveMarket !== null && (
              <Flag tone={r.aboveMarket > 0 ? "warn" : "good"} title={r.aboveMarket > 0 ? `${gbp(r.aboveMarket)} a month above similar homes` : "In line with similar homes"}>
                {r.aboveMarket > 0
                  ? v.nation === "scotland"
                    ? "Evidence for a rent officer, but they set a market rent, and until 1 April 2027 it can come out higher than your landlord asked."
                    : v.nation === "wales"
                      ? "That is the evidence the tribunal looks at, if your tenancy began before 1 December 2022."
                      : "That is the evidence a tribunal looks at."
                  : "A challenge is unlikely to bring the rent down much."}
              </Flag>
            )}
            {r.burdenAfter !== null && (
              <p className="sa-ri-burden">
                Rent would take <b>{percent(r.burdenAfter)}</b> of your take-home pay, up from {percent(r.burdenBefore ?? 0)}.
              </p>
            )}
          </details>

          <Foot>
            <Caveat>
              A check of the legal timing and form for private tenancies, on the dates you enter. It cannot tell you whether the new rent is fair, and social and regulated tenancies follow
              other rules. General information, not legal advice.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
