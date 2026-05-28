import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import DaysBetweenCalculator from "./DaysBetweenCalculator";

export const metadata: Metadata = {
  title: "Days Between Two Dates Calculator (UK)",
  description:
    "Calculate the number of days, working days, weeks, months and years between any two dates — UK calendar.",
};

export default function DaysBetweenPage() {
  return (
    <CalculatorShell
      category="Life Events"
      updatedLabel="UK calendar"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Life Events" },
        { href: "/life/days-between-dates", label: "Days Between Dates" },
      ]}
      title="Days Between Two Dates"
      intro="Count the days, working days, weeks, or full Y/M/D breakdown between any two dates — useful for notice periods, contract end dates, visa overstays and tenancy calculations."
      calculator={<DaysBetweenCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Dates are normalised to midnight UTC, then the difference is
                divided by exactly 86,400,000 ms. Using UTC avoids the
                off-by-one errors that British Summer Time creates around
                March and October date arithmetic.
              </p>
              <ul>
                <li>
                  <strong>Exclusive days</strong> — same date returns 0; useful
                  for &ldquo;days from / days until&rdquo;.
                </li>
                <li>
                  <strong>Inclusive days</strong> — same date returns 1; useful
                  for counting nights stayed, days served, etc.
                </li>
                <li>
                  <strong>Working days</strong> — counts Monday–Friday only,
                  inclusive of both endpoints. Bank holidays not deducted.
                </li>
                <li>
                  <strong>Calendar Y/M/D</strong> — the natural &ldquo;3 years,
                  2 months, 17 days&rdquo; breakdown.
                </li>
              </ul>
            </>
          }
          officialRules={
            <>
              <p>Common UK date-counting conventions:</p>
              <ul>
                <li>
                  <strong>Notice periods</strong> usually count from the day
                  after notice is given; check your contract for
                  &ldquo;clear days&rdquo; vs &ldquo;calendar days&rdquo;.
                </li>
                <li>
                  <strong>Court deadlines</strong> generally exclude weekends
                  and bank holidays for periods of 5 days or less (CPR 2.8).
                </li>
                <li>
                  <strong>UK Visa overstay</strong> calculated from the day
                  after leave expires; a 1-day overstay can ban re-entry for
                  10 years in some routes.
                </li>
                <li>
                  <strong>Tenancy break clauses</strong> typically require
                  &ldquo;two clear months&rdquo; notice — meaning the notice
                  period excludes both the day given and the move-out day.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "Inclusive vs exclusive matters legally",
              body: "&ldquo;30 days from today&rdquo; could mean day 30 or day 31, depending on context. Banking, court and tenancy conventions all differ. Always re-read the original document.",
            },
            {
              title: "Working days here don't exclude bank holidays",
              body: "We count Mon–Fri only. UK bank holidays (8 a year in England/Wales, 9 in Scotland, 10 in NI) need to be deducted manually if your purpose requires it.",
            },
            {
              title: "Months are imprecise",
              body: "A &ldquo;month&rdquo; can mean 28, 29, 30 or 31 days. Our Y/M/D breakdown uses calendar arithmetic, which gives the natural answer most people expect — but for legal/contract use, count exact days where possible.",
            },
            {
              title: "Time zones can shift by a day",
              body: "If you&rsquo;re comparing dates from emails or systems in different time zones, a 23:00 UTC timestamp can appear as &ldquo;next day&rdquo; in BST. We assume both inputs are UK calendar dates.",
            },
          ]}
          faqs={[
            {
              question: "Does it count today?",
              answer:
                "The exclusive count does not. The inclusive count does. Pick whichever matches your purpose.",
            },
            {
              question: "Can I enter past dates?",
              answer:
                "Yes — the calculator works in either direction. Order of inputs doesn&rsquo;t matter.",
            },
            {
              question: "Are bank holidays excluded from working days?",
              answer:
                "No. We only exclude weekends. Bank holidays vary by UK nation and would need to be deducted manually.",
            },
          ]}
          disclaimer="Calendar arithmetic only. For legal deadlines, check whether your context uses clear days, working days excluding bank holidays, or another convention."
        />
      }
    />
  );
}
