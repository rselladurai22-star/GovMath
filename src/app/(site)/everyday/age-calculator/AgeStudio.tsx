"use client";

import type { ReactNode } from "react";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, Segmented } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { whole } from "@/components/flagship/format";
import { date, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { useToday } from "@/components/flagship/useToday";
import { formatDate } from "@/lib/life/calendar";
import { ageMilestones, ageOn, birthdayIn, daysFrom, isIsoDate, weekdayName, type LeapRule } from "@/lib/life/dates";

const SCHEMA = {
  dob: date("1990-06-15"),
  // "" means today, resolved in the browser so the default never goes stale.
  on: date(""),
  other: date(""),
  leap: oneOf<LeapRule>("mar1", ["mar1", "feb28"]),
};
const ADVANCED = ["other", "leap"] as const;

const medium = (iso: string) => formatDate(iso, "medium");
const long = (iso: string) => formatDate(iso, "long");
const plural = (n: number, word: string) => `${whole(n)} ${word}${n === 1 ? "" : "s"}`;
const ymdText = (y: number, m: number, d: number) => `${plural(y, "year")}, ${plural(m, "month")} and ${plural(d, "day")}`;
const inDays = (n: number) => (n === 0 ? "today" : n > 0 ? `in ${plural(n, "day")}` : `${plural(-n, "day")} ago`);

export default function AgeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  const on = v.on || today;
  const dobOk = isIsoDate(v.dob);
  const age = dobOk && on ? ageOn(v.dob, on, v.leap) : null;
  const isToday = !!today && on === today;
  const leapBaby = dobOk && v.dob.slice(5) === "02-29";

  const inputs = (
    <>
      <InputGroup title="Your dates">
        <DateField label="Date of birth" value={v.dob} onChange={st.bind("dob")} max={on ?? undefined} />
        <DateField
          label="Age on"
          value={on ?? ""}
          onChange={st.bind("on")}
          hint="Today unless you pick another date, for example a deadline, an exam or a future birthday."
        />
      </InputGroup>
      <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
        <DateField label="Compare with another date of birth" value={v.other} onChange={st.bind("other")} optional hint="Shows the age gap between two people." />
        <Segmented
          label="29 February birthdays in other years"
          value={v.leap}
          onChange={st.bind("leap")}
          optional
          options={[
            { value: "mar1", label: "1 March", note: "The new age starts on 1 March, the day after 28 February." },
            { value: "feb28", label: "28 February", note: "The new age starts on 28 February, the last day of the month." },
          ]}
        />
      </AdvancedOptions>
    </>
  );

  const studio = (children: ReactNode, dock = "") => (
    <Studio title="Your dates" ready={st.ready} onCalculate={st.calculate} calculateLabel="Work out my age" onReset={st.reset} dock={{ label: "Age", value: dock }} inputs={inputs}>
      {children}
    </Studio>
  );

  if (!on) return studio(<Answer eyebrow="Your age" value="…" sentence="Enter a date of birth to see your exact age." />);
  if (!dobOk || !age)
    return studio(
      <>
        <Answer eyebrow="Your age" value="Check the dates" sentence="Enter a date of birth that is on or before the date you want the age on." />
        <ResultCard title="Worth knowing">
          <Callout tone="warn" title="The date of birth is after the age date">
            Age can only be counted forward from a birth date. Swap the dates, or use the <a href="/everyday/date-calculator">date calculator</a>{" "}for days until a future date.
          </Callout>
        </ResultCard>
      </>,
    );

  const sinceLast = daysFrom(age.lastBirthday, on);
  const milestones = ageMilestones(v.dob);
  const nextMilestone = milestones.find((m) => m.date >= on);
  const bornYear = Number(v.dob.slice(0, 4));
  const upcoming = Array.from({ length: 6 }, (_, i) => {
    const year = Number(age.nextBirthday.slice(0, 4)) + i;
    const d = birthdayIn(v.dob, year, v.leap);
    return [String(year - bornYear), medium(d), weekdayName(d)];
  });
  const otherOk = isIsoDate(v.other);
  const [older, younger] = otherOk && v.other < v.dob ? [v.other, v.dob] : [v.dob, v.other];
  const gap = otherOk ? ageOn(older, younger, v.leap) : null;
  const when = isToday ? "Today" : `On ${long(on)}`;

  return studio(
    <>
      <Answer
        eyebrow={isToday ? "Your age today" : "Age on the date"}
        value={plural(age.years, "year")}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {when} {isToday ? "you are" : "the age is"} <b>{ymdText(age.years, age.months, age.days)}</b>{" "}old. You were born on a <b>{age.bornOn}</b>. The next birthday
            (turning {age.turning}) is on <b>{long(age.nextBirthday)}</b>, {inDays(age.daysToNext)}.
          </>
        }
        badges={[`${whole(age.totalDays)} days`, `${whole(age.totalWeeks)} weeks`, `Born on a ${age.bornOn}`]}
      />

      <Facts
        items={[
          { label: "Total months", value: whole(age.totalMonths) },
          { label: "Total weeks", value: `${whole(age.totalWeeks)} + ${plural(age.weekDays, "day")}` },
          { label: "Total days", value: whole(age.totalDays) },
          { label: "Total hours", value: whole(age.totalHours) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Date of birth", value: long(v.dob) },
          { label: "Age counted to", value: `${long(on)}${isToday ? " (today on this device)" : ""}` },
          { label: "Counting method", value: "Whole years, then whole months, then days, as people usually say their age" },
          { label: "Hours and minutes", value: "Whole days × 24, from midnight to midnight (time of birth not used)" },
          ...(leapBaby ? [{ label: "29 February birthday", value: v.leap === "mar1" ? "1 March in other years" : "28 February in other years" }] : []),
        ]}
      />

      <ResultCard title="Your year so far" sub="Days since the last birthday and until the next one.">
        <SplitBar
          segments={[
            { label: "Since last birthday", value: sinceLast, display: plural(sinceLast, "day"), color: "#2a78d6" },
            { label: "Until next birthday", value: age.daysToNext, display: plural(age.daysToNext, "day"), color: "#c3c8ce" },
          ]}
          caption={<>Next half birthday: {long(age.nextHalfBirthday)}.</>}
        />
      </ResultCard>

      <ResultCard title="Your age in other units">
        <Statement
          columns={["Age"]}
          rows={[
            { label: "Years, months and days", values: [ymdText(age.years, age.months, age.days)] },
            { label: "Months and days", values: [`${plural(age.totalMonths, "month")} ${plural(age.days, "day")}`] },
            { label: "Weeks and days", values: [`${plural(age.totalWeeks, "week")} ${plural(age.weekDays, "day")}`] },
            { label: "Days", values: [whole(age.totalDays)] },
            { label: "Hours", values: [whole(age.totalHours)] },
            { label: "Minutes", values: [whole(age.totalMinutes)] },
            { label: "Seconds (about)", values: [whole(age.totalDays * 86_400)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="Birthdays ahead" sub="The weekday each birthday falls on.">
        <Statement columns={["Date", "Day"]} rows={upcoming.map(([n, d, w]) => ({ label: `Turning ${n}`, values: [d, w] }))} />
      </ResultCard>

      <ResultCard title="Milestones" sub={nextMilestone ? `Next: ${nextMilestone.label} on ${long(nextMilestone.date)}.` : "Every milestone on the list has passed."}>
        <DataTable
          summary="See every milestone date"
          columns={["Milestone", "Date", "When"]}
          rows={milestones.map((m) => [m.label, medium(m.date), inDays(daysFrom(on, m.date))])}
        />
      </ResultCard>

      {gap && (
        <ResultCard title="Age gap" sub={`Between ${medium(older)} and ${medium(younger)}.`}>
          <Facts
            items={[
              { label: "Gap", value: ymdText(gap.years, gap.months, gap.days) },
              { label: "In days", value: whole(gap.totalDays) },
              { label: "In weeks", value: `${whole(gap.totalWeeks)} + ${plural(gap.weekDays, "day")}` },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing">
        {leapBaby && (
          <Callout title="Born on 29 February">
            In years without 29 February, the calculator counts your birthday on {v.leap === "mar1" ? "1 March" : "28 February"}. You can change this under More
            options. For a legal age (for example to buy alcohol or get a licence), the organisation checking follows its own country&rsquo;s rules.
          </Callout>
        )}
        <Callout title="Other date tools">
          Count the days between any two dates with the <a href="/uk/life/days-between-dates">days between dates calculator</a>, or add days, weeks and months to a date
          with the <a href="/everyday/date-calculator">date calculator</a>.
        </Callout>
      </ResultCard>
    </>,
    plural(age.years, "year"),
  );
}
