import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import FreeHoursStudio from "./FreeHoursStudio";
import { longDate } from "./ChildcareTimeline";
import { ogFor } from "@/gm/og";
import { FUNDED, TFC, minimumQuarterEarnings, minimumWeeklyEarnings } from "@/lib/benefits/family";
import { addDays, childcareTimeline, termAfter } from "@/lib/benefits/childcare-dates";
import { NMW_2026 } from "@/lib/benefits/minimum-wage";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Childcare Funded Hours Calculator: 15 or 30",
  description:
    "Free childcare funded hours calculator for England, 2026/27. Check if you get 15 or 30 funded hours from 9 months old, and what you still pay your nursery.",
  alternates: { canonical: "/uk/benefits/free-childcare-hours" },
  openGraph: ogFor("/uk/benefits/free-childcare-hours"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/free-childcare-hours", label: "Free Childcare Hours" },
];

// Every figure in the text below comes from the engines, so it moves with the rules.
const m = (n: number) => gbp(n, true);
const WORKING_YEAR = FUNDED.workingHours * FUNDED.termWeeks;
const UNIVERSAL_YEAR = FUNDED.universalHours * FUNDED.termWeeks;
const TERMS = [
  { between: "1 September and 31 December", example: "2026-10-01" },
  { between: "1 January and 31 March", example: "2027-02-01" },
  { between: "1 April and 31 August", example: "2027-06-01" },
].map((r) => ({ ...r, starts: termAfter(r.example) }));
const dayMonth = (iso: string) => longDate(iso).replace(/ \d{4}$/, "");
const FLOORS = [
  { who: "21 or over", band: "national-living-wage" as const },
  { who: "18 to 20", band: "18-20" as const },
  { who: "Under 18, or an apprentice", band: "apprentice" as const },
].map((f) => ({ ...f, hourly: NMW_2026[f.band].hourly, weekly: minimumWeeklyEarnings(f.band), quarter: minimumQuarterEarnings(f.band) }));
// Two children born a day apart, either side of the 9-month cut-off.
const EDGE_A = childcareTimeline("2026-11-30");
const EDGE_B = childcareTimeline("2026-12-01");
const STRETCH_51 = WORKING_YEAR / 51;

const FAQS: { q: string; a: string }[] = [
  {
    q: "What about Scotland, Wales and Northern Ireland?",
    a: "This calculator covers England only. Scotland gives 1,140 funded hours a year to every 3 and 4-year-old, and to some 2-year-olds, whatever their parents' work. Wales and Northern Ireland run their own schemes, with their own ages and hours, so check with your council or the Welsh and Northern Ireland government websites.",
  },
  {
    q: "Can I use the hours with a childminder, or split them between two settings?",
    a: "Yes to both, if the childminder is registered with Ofsted or a childminder agency and offers funded places. DfE's guidance lets a child use funded hours at up to two sites in a single day, with no session longer than 10 hours, and not before 6am or after 8pm.",
  },
  {
    q: "Do funded hours affect my Universal Credit or Tax-Free Childcare?",
    a: "Funded hours are paid to the provider, not to you, so they are not income for any benefit. What you pay for extra hours can still be claimed: Universal Credit can pay back up to 85% of it, or Tax-Free Childcare can add 20%, but you cannot use both at once.",
  },
  {
    q: "What if I cannot find a nursery with a funded place?",
    a: "Contact your council's Family Information Service. Councils have a duty to secure enough funded places for eligible children in their area, and can tell you which providers near you have space. Funding follows the child, so a nursery near your work counts as much as one near home.",
  },
  {
    q: "Can I apply if I am about to go back to work after maternity leave?",
    a: "Yes. Parents on maternity, paternity, shared parental or adoption leave already count as working for an older child. For the new baby, GOV.UK sets windows by your return date: return between 1 October and 31 January and you apply from 1 September to 31 December, for the hours from January; the other terms follow the same pattern.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Free Childcare for Working Parents (overview)", href: "https://www.gov.uk/free-childcare-if-working" },
  { label: "GOV.UK: Check you're eligible (the earnings floor and £100,000 limit)", href: "https://www.gov.uk/free-childcare-if-working/check-youre-eligible" },
  { label: "GOV.UK: When to apply (term start dates and deadlines)", href: "https://www.gov.uk/free-childcare-if-working/when-to-apply" },
  { label: "GOV.UK: 15 hours free childcare for 2 year olds", href: "https://www.gov.uk/help-with-childcare-costs/15-hours-free-childcare-early-learning-2-year-olds" },
  { label: "GOV.UK: 15 hours free childcare for 3 and 4-year-olds", href: "https://www.gov.uk/help-with-childcare-costs/free-childcare-and-education-for-3-to-4-year-olds" },
  { label: "DfE: Early education and childcare, statutory guidance from 1 April 2026 (charges, stretching, grace periods)", href: "https://www.gov.uk/government/publications/early-education-and-childcare--2/early-education-and-childcare-valid-from-1-april-2026" },
  { label: "GOV.UK: National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
];

function Notes() {
  return (
    <>
      <h2>Three start dates a year</h2>
      <p>
        Every funded offer starts at the beginning of the term after your child reaches the age: 9 months for the working parent hours, 2 for the 15 hours some families get, and 3 for
        the universal hours. There are three start dates, and three matching deadlines for applying.
      </p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Your child reaches the age between</th>
              <th scope="col">Hours start</th>
              <th scope="col">Apply by</th>
            </tr>
          </thead>
          <tbody>
            {TERMS.map((r) => (
              <tr key={r.between}>
                <th scope="row">{r.between}</th>
                <td>{dayMonth(r.starts)}</td>
                <td>{dayMonth(addDays(r.starts, -1))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A single day can move the start by four months. A baby born on {longDate(EDGE_A.dob)} turns 9 months on {longDate(EDGE_A.working.reached)} and can start on{" "}
        {longDate(EDGE_A.working.starts)}; one born on {longDate(EDGE_B.dob)} reaches 9 months a day later, in the next term, and waits until {longDate(EDGE_B.working.starts)}. You can
        apply from 23 weeks old, and it is worth doing early: a code issued before the deadline holds the place even if your work changes just after it.
      </p>

      <h2>Who counts as working</h2>
      <p>
        Each parent in the household has to be in work, starting a job, or on sick, annual, maternity, paternity, shared parental or adoption leave, and expect to earn at least 16 hours a
        week at their own minimum wage over the next three months. Neither may expect adjusted net income over £100,000 for the tax year.
      </p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Your age</th>
              <th scope="col">Minimum wage</th>
              <th scope="col">A week</th>
              <th scope="col">Over 3 months</th>
            </tr>
          </thead>
          <tbody>
            {FLOORS.map((f) => (
              <tr key={f.who}>
                <th scope="row">{f.who}</th>
                <td>{m(f.hourly)}</td>
                <td>{m(f.weekly)}</td>
                <td>{m(f.quarter)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Only earnings from work count: not dividends, interest, rent from property or pensions. If your pay is irregular, or you are self-employed, you can use your expected average over
        the tax year instead. If you started your business less than 12 months ago the floor does not apply at all. A partner who is not working still counts if they get Carer&rsquo;s
        Allowance, contribution-based ESA, the health or carer element of Universal Credit, or National Insurance credits, or are on carer&rsquo;s leave, while you work.
      </p>
      <p>
        The £100,000 line is a cliff: a pound over loses all the working parent hours and{" "}
        <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</Link>{" "}with them. Pension contributions and Gift Aid lower adjusted net income, which is why many parents
        near the line pay more into a pension; the <Link href="/uk/benefits/high-income-child-benefit">High Income Child Benefit Charge calculator</Link>{" "}shows how that also helps with
        Child Benefit.
      </p>

      <h2>Stretching the hours</h2>
      <p>
        The 30 hours are {WORKING_YEAR.toLocaleString("en-GB")} hours a year and the 15 hours are {UNIVERSAL_YEAR.toLocaleString("en-GB")}, set as 38 term-time weeks. Most nurseries are
        open all year, so many spread the hours instead: {WORKING_YEAR.toLocaleString("en-GB")} hours over 51 weeks is about {STRETCH_51.toFixed(1)} hours a week. Whether you can stretch
        depends on your provider. Hours you do not use in the year are lost.
      </p>

      <h2>What a nursery can still charge for</h2>
      <p>
        The funded hours themselves must be free. A nursery can charge for meals and snacks, consumables such as nappies and sun cream, optional activities and extra hours, but only
        as voluntary extras: you must be able to opt out, for example by sending food or nappies in, and a place cannot depend on paying for them. Top-up fees, registration fees,
        non-refundable deposits and general &ldquo;sustainability&rdquo; charges on the free hours are not allowed, and invoices should itemise every charge. If a provider insists, tell
        your council, which is expected to step in.
      </p>

      <h2>Keeping your code</h2>
      <p>
        After you apply you get an 11-digit code to give your provider with your National Insurance number and your child&rsquo;s date of birth. Every three months you sign in and
        confirm your details. If you stop qualifying, a grace period keeps the place funded until the end of that funding block, or the next one if it happens late in the term, which
        gives time to find work. A child cannot start a new working parent place during a grace period, and 3 and 4-year-olds keep the 15 universal hours afterwards. The Tax-Free
        Childcare account opened at the same time pays {Math.round(TFC.share * 100)}% of the bill for hours beyond the funded ones (£2 for every £8 you pay in), up to {gbp(TFC.capPerChild)} a year; if you also claim{" "}
        <Link href="/uk/benefits/universal-credit">Universal Credit</Link>, you choose one or the other.
      </p>
    </>
  );
}

export default async function FreeHoursPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/tax-free-childcare", "/uk/benefits/child-benefit", "/uk/benefits/universal-credit", "/uk/benefits/maternity-pay", "/uk/benefits/high-income-child-benefit"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Free Childcare Hours Calculator"
      lead="When your child's funded hours start, whether you get 15 or 30 a week, and what nursery will still cost after them."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <FreeHoursStudio query={query} />
    </CalcPage>
  );
}
