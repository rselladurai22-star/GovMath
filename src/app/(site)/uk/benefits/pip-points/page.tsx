import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import PipStudio from "./PipStudio";
import { ogFor } from "@/gm/og";
import { PIP_2026, pipScore } from "@/lib/benefits/pip-assessment";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "PIP Points Calculator: How Many Points Needed?",
  description:
    "Free PIP points calculator for all 12 activities. See if your points reach the standard (8) or enhanced (12) rate for daily living and mobility in 2026/27.",
  alternates: { canonical: "/uk/benefits/pip-points" },
  openGraph: ogFor("/uk/benefits/pip-points"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/pip-points", label: "PIP Points" },
];

// Figures from the engine, so they move with the rates.
const m = (n: number) => gbp(n, true);
const MOST = PIP_2026.daily.enhanced + PIP_2026.mobility.enhanced;
// Worked example: needs help to cook (4), help with hair or lower body washing (2), help to dress the lower body (2).
const EX = pipScore({ food: "e", washing: "d", dressing: "d" });
const EX_RELIABLE = pipScore({ food: "e", washing: "d", dressing: "d", toilet: "c" });

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does my income or savings affect PIP?",
    a: "No. You can get PIP while working, with savings, and alongside almost every other benefit. It is not counted as income for Universal Credit or Pension Credit.",
  },
  {
    q: "Can I claim PIP if I am over State Pension age?",
    a: "Not usually as a new claim: claim Attendance Allowance instead. You can make a new PIP claim over State Pension age only if you had PIP or Adult Disability Payment in the last 12 months.",
  },
  {
    q: "I live in Scotland. Does this apply to me?",
    a: "Scotland has Adult Disability Payment instead of PIP. It is scored on much the same activities and points and pays the same weekly rates, but you apply to Social Security Scotland and the way it is assessed differs.",
  },
  {
    q: "What does a PIP award lead to?",
    a: "The daily living part lets someone who cares for you 35 hours a week claim Carer's Allowance, and either part lifts the benefit cap. It can also add extra amounts to means-tested benefits such as Pension Credit.",
  },
];

const SOURCES = [
  { label: "PIP Regulations 2013, Schedule 1 (the activities, descriptors and points)", href: "https://www.legislation.gov.uk/uksi/2013/377/schedule/1" },
  { label: "PIP Regulations 2013, regulation 4 (safely, to an acceptable standard, repeatedly, in a reasonable time)", href: "https://www.legislation.gov.uk/uksi/2013/377/regulation/4" },
  { label: "PIP Regulations 2013, regulation 7 (more than 50% of days)", href: "https://www.legislation.gov.uk/uksi/2013/377/regulation/7" },
  { label: "DWP: PIP assessment guide part 2, the assessment criteria", href: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-2-the-assessment-criteria" },
  { label: "GOV.UK: PIP, what it is for and how it is assessed", href: "https://www.gov.uk/pip" },
  { label: "GOV.UK: PIP eligibility", href: "https://www.gov.uk/pip/eligibility" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 rates)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "GOV.UK: PIP, how to claim and after you've applied", href: "https://www.gov.uk/pip/how-to-claim" },
  { label: "GOV.UK: Challenge a benefit decision (mandatory reconsideration)", href: "https://www.gov.uk/mandatory-reconsideration" },
  { label: "GOV.UK: PIP if you're nearing the end of life", href: "https://www.gov.uk/pip/claiming-end-of-life" },
];

function Notes() {
  return (
    <>
      <h2>Points, rates and who can claim</h2>
      <p>
        PIP has two parts, scored separately. In each part, 8 points gives the standard rate and 12 points the enhanced rate.
      </p>
      <div className="sa-tablewrap">
        <table>
          <caption className="sr-only">PIP weekly rates for 2026/27 by points</caption>
          <thead>
            <tr>
              <th scope="col">Part</th>
              <th scope="col">8 to 11 points</th>
              <th scope="col">12 points or more</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Daily living</th>
              <td>{m(PIP_2026.daily.standard)} a week</td>
              <td>{m(PIP_2026.daily.enhanced)} a week</td>
            </tr>
            <tr>
              <th scope="row">Mobility</th>
              <td>{m(PIP_2026.mobility.standard)} a week</td>
              <td>{m(PIP_2026.mobility.enhanced)} a week</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        It is paid every 4 weeks, whatever your income or savings, and whether or not you work. You can claim from age 16 if a long-term condition makes everyday tasks or getting
        around harder and you expect the difficulties to last at least 12 months from when they started. New claims usually have to start before State Pension age; after that,
        Attendance Allowance takes its place. In Scotland, Adult Disability Payment has replaced PIP for new claims.
      </p>

      <h2>Reliably is what changes the answer</h2>
      <p>
        You only count as able to do something if you can do it safely, to an acceptable standard, as often as it needs doing, and in no more than twice the time it would take
        someone without your condition. If you can wash yourself but it leaves you exhausted for the rest of the day, or you could fall in the shower without someone nearby, you
        cannot do it reliably, and a higher descriptor applies.
      </p>
      <p>
        Pick the line that applies on more than half of days over a year. If two lines each apply on more than half of days, the higher one counts. Only one line counts in each
        activity, so do not add two lines together.
      </p>

      <h2>How a score builds</h2>
      <p>
        Points add up within each part: the ten daily living activities together, and the two mobility activities together. Needing help to cook a meal, help to wash below the
        waist and help to dress your lower body scores {EX.daily} points, the standard daily living rate of {m(EX.dailyWeekly)} a week. Needing someone to prompt you to use the
        toilet as well takes it to {EX_RELIABLE.daily} points, {EX_RELIABLE.dailyToNext} short of the enhanced rate. Both parts at the enhanced rate come to {m(MOST)} a week.
      </p>

      <h2>Evidence that helps</h2>
      <p>
        Describe a bad day and a typical day, how long tasks take, what happens when you try, and who helps. Letters from your GP, consultant, nurse, occupational therapist or
        support worker carry most weight when they describe what you cannot do rather than only naming a diagnosis. A diary of a week or two, and statements from people who help
        you, show how often things happen.
      </p>
      <p>
        If someone will care for you, the <Link href="/uk/benefits/carers-earnings">Carer&rsquo;s Allowance calculator</Link>{" "}checks their earnings. On a low income, also
        look at <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}and, if you have recently stopped work, <Link href="/uk/benefits/new-style-esa">New Style ESA</Link>.
      </p>

      <h2>From claim to decision</h2>
      <p>
        After the first call or letter, DWP sends the &ldquo;How your disability affects you&rdquo; form, which you have a month to return; ask for more time if you need it. A health
        professional may then assess you, at a centre, at home, by phone or by video, usually for about an hour, and you can bring someone with you. The decision letter gives the
        points for each activity and an award of between 9 months and 10 years.
      </p>
      <p>
        If the points look wrong, ask for a mandatory reconsideration within a month of the decision letter, saying which descriptors you think apply and why. If that does not
        change it, you can appeal to an independent tribunal within a month of the reconsideration notice. Use the calculator with the decision letter beside you to see which
        activities make the difference.
      </p>

      <h2>If you may have 12 months or less to live</h2>
      <p>
        Under the special rules for end of life there is no points test and no assessment. You get the enhanced daily living rate of {m(PIP_2026.daily.enhanced)} a week, and the
        mobility part depends on your needs. Ask a doctor or nurse for form SR1, and call the PIP claim line to start a special rules claim; someone can do this for you.
      </p>

      <h2>The review of PIP</h2>
      <p>
        The government is reviewing the PIP assessment. Until any change becomes law, the activities, descriptors and points on this page are the ones DWP uses.
      </p>
    </>
  );
}

export default async function PipPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/carers-earnings", "/uk/benefits/universal-credit", "/uk/benefits/benefit-cap", "/uk/benefits/new-style-esa", "/uk/benefits/benefits-checker"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="PIP Points Calculator"
      lead="Score yourself against the 12 PIP activities, as they are written in the regulations, and see which rate each part points to."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <PipStudio query={query} />
    </CalcPage>
  );
}
