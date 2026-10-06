"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, Segmented } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { formatDate } from "@/lib/life/calendar";
import { RENT_RULES, rentIncrease, type RentNation } from "@/lib/property/renting";

const SCHEMA = {
  nation: oneOf<RentNation>("england", ["england", "wales", "scotland", "ni"]),
  current: num(1_100, 0, 50_000),
  proposed: num(1_200, 0, 50_000),
  served: date("2026-10-01"),
  starts: date("2026-12-01"),
  last: date("2025-12-01"),
  income: num(0, 0, 100_000),
  market: num(0, 0, 50_000),
};
const ADVANCED = ["income", "market"] as const;

export default function RentIncreaseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const rules = RENT_RULES[v.nation];
  const r = rentIncrease({ nation: v.nation, current: v.current, proposed: v.proposed, served: v.served, starts: v.starts, lastChange: v.last, income: v.income, market: v.market });
  const rising = r.monthly > 0;
  const earliest = r.earliestByNotice > r.earliestByYear ? r.earliestByNotice : r.earliestByYear;
  const years = [1, 2, 3, 5].map((y) => ({ y, rent: v.current * Math.pow(1 + Math.max(0, r.share), y) }));
  const maxRent = Math.max(1, ...years.map((x) => x.rent));

  return (
    <Studio
      title="Your rent and the notice"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my rent increase"
      onReset={st.reset}
      dock={{ label: "Increase a month", value: gbp(r.monthly) }}
      inputs={
        <>
          <InputGroup title="Your tenancy">
            <Segmented
              label="Country"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England", note: "Private tenancies became assured periodic tenancies on 1 May 2026." },
                { value: "wales", label: "Wales", note: "Occupation contracts under the Renting Homes (Wales) Act." },
                { value: "scotland", label: "Scotland", note: "Private residential tenancies." },
                { value: "ni", label: "Northern Ireland", note: "Private tenancies under the Private Tenancies Act 2022." },
              ]}
            />
            <MoneyField label="Rent now, a month" value={v.current} onChange={st.bind("current")} />
            <MoneyField label="New rent proposed, a month" value={v.proposed} onChange={st.bind("proposed")} />
          </InputGroup>
          <InputGroup title="The dates">
            <DateField label="Date you got the notice" value={v.served} onChange={st.bind("served")} />
            <DateField label="Date the new rent starts" value={v.starts} onChange={st.bind("starts")} />
            <DateField label="When the tenancy began or the rent last went up" value={v.last} onChange={st.bind("last")} hint="Whichever is later." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Household take-home pay a month" value={v.income} onChange={st.bind("income")} optional hint="To see how much of your income the rent takes." />
            <MoneyField label="Rent for similar homes nearby, a month" value={v.market} onChange={st.bind("market")} optional hint="From listings for the same size and type of home in your area." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Increase a month"
        value={gbp(r.monthly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !rising ? (
            <>The new rent is not higher than your current rent.</>
          ) : (
            <>
              Your rent would rise by <b>{percent(r.share, 1)}</b>, {gbp(r.yearly)} a year.{" "}
              {r.valid ? (
                <>
                  On these dates the notice meets the {rules.label} timing rules, so the new rent can start on <b>{formatDate(v.starts, "medium")}</b> unless you challenge it.
                </>
              ) : (
                <>
                  On these dates the notice does <b>not</b> meet the {rules.label} timing rules. The earliest the new rent could start is <b>{formatDate(earliest, "medium")}</b>.
                </>
              )}
            </>
          )
        }
        badges={[rules.label, `${rules.noticeMonths} months' notice`, r.valid ? "Timing OK" : "Timing not OK"]}
      />

      <Facts
        items={[
          { label: "Increase a month", value: gbp(r.monthly) },
          { label: "Increase a year", value: gbp(r.yearly) },
          { label: "Rise", value: percent(r.share, 1), tone: r.share > 0.1 ? "warn" : undefined },
          { label: "Notice given", value: `${r.daysToStart} days`, tone: r.noticeOk ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rules", value: `${rules.label}: ${rules.noticeMonths} months' notice, once a year` },
          { label: "Once a year", value: v.nation === "england" ? "52 weeks from the last increase or the tenancy start" : "12 months from the last increase or the tenancy start" },
          { label: "Notice", value: `Using ${rules.form}` },
          { label: "Tenancy", value: "Private landlord. Social and regulated tenancies have different rules" },
        ]}
      />

      <ResultCard title="Timing checks" sub="Both must pass for the new rent to start on the date given.">
        <Compare
          head={["Rule", "Earliest start date"]}
          rows={[
            { label: `At least ${rules.noticeMonths} months' notice`, value: formatDate(r.earliestByNotice, "medium"), delta: r.noticeOk ? "Met" : "Not met", bar: r.noticeOk ? 1 : 0.35 },
            { label: "No more than once a year", value: formatDate(r.earliestByYear, "medium"), delta: r.yearOk ? "Met" : "Not met", bar: r.yearOk ? 1 : 0.35 },
          ]}
        />
      </ResultCard>

      {rising && v.current > 0 && (
        <ResultCard title="If it rose like this every year" sub={`Your rent with a ${percent(r.share, 1)} rise each year.`}>
          <Compare
            head={["After", "Rent a month"]}
            rows={[{ y: 0, rent: v.current }, ...years].map((x) => ({ label: x.y === 0 ? "Now" : `${x.y} year${x.y === 1 ? "" : "s"}`, value: gbp(x.rent), bar: x.rent / maxRent, current: x.y === 1 }))}
          />
        </ResultCard>
      )}

      <ResultCard title="What you can do" sub={`Your options in ${rules.label}.`}>
        {!r.valid && rising && (
          <Callout tone="warn" title="The notice is too early">
            {!r.noticeOk && <>You need at least {rules.noticeMonths} months&rsquo; notice. </>}
            {!r.yearOk && <>The rent can only go up once a year. </>}A notice that breaks these rules is not valid: keep paying your current rent and tell your landlord in
            writing. The earliest valid start date on these figures is {formatDate(earliest, "medium")}.
          </Callout>
        )}
        {v.nation === "england" && (
          <Callout title="Challenge it at the First-tier Tribunal">
            If you think the new rent is above the market rate, apply to {rules.challenge} before {formatDate(v.starts, "medium")}. The tribunal decides the market rent but cannot set it higher than your
            landlord asked for, and any increase only starts from its decision. Rent review clauses no longer count.
          </Callout>
        )}
        {v.nation === "scotland" && (
          <Callout title="Refer it to a rent officer">
            You can ask {rules.challenge} to decide a fair rent within 21 days of getting the notice (30 days from 1 April 2027). Rent control areas, if your council has one, can cap rises.
          </Callout>
        )}
        {v.nation === "wales" && (
          <Callout title="Challenge it at the tribunal">
            If you think the new rent is too high, you can apply to {rules.challenge} before the new rent starts.
          </Callout>
        )}
        {v.nation === "ni" && (
          <Callout title="Get advice">
            A rise within 12 months of the last one has no legal effect, so you do not have to pay it. Contact Housing Rights or your council if your landlord insists.
          </Callout>
        )}
        {r.aboveMarket !== null && (
          <Callout tone={r.aboveMarket > 0 ? "warn" : "good"} title={r.aboveMarket > 0 ? "Above similar homes" : "In line with similar homes"}>
            The new rent is {gbp(Math.abs(r.aboveMarket))} a month {r.aboveMarket > 0 ? "more" : "less"} than the rent you entered for similar homes nearby.
            {r.aboveMarket > 0 && v.nation === "england" ? " That is the kind of evidence the tribunal looks at." : ""}
          </Callout>
        )}
        {r.burdenAfter !== null && (
          <Callout tone={r.burdenAfter > 0.4 ? "warn" : "info"} title={`Rent would take ${percent(r.burdenAfter)} of your income`}>
            Up from {percent(r.burdenBefore ?? 0)}. If you are on a low income, check the <a href="/benefits/universal-credit">Universal Credit</a> or{" "}
            <a href="/benefits/housing-benefit">Housing Benefit</a> calculators, and the <a href="/benefits/local-housing-allowance">Local Housing Allowance</a> for your area.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Based on the Renters&rsquo; Rights Act 2025 (England), the Renting Homes (Wales) Act 2016, the Private Housing (Tenancies) (Scotland) Act 2016 and the Private Tenancies Act (Northern
        Ireland) 2022. General information, not legal advice.
      </p>
    </Studio>
  );
}
