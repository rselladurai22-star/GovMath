import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import JsaStudio from "./JsaStudio";
import { ogFor } from "@/gm/og";
import { LEL, NEW_STYLE_2026, newStyleJsa, relevantYears, taxYearLabel } from "@/lib/benefits/new-style";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "New Style JSA Calculator: How Much You Get",
  description:
    "New Style JSA is £95.55 a week at 25 or over in 2026/27, for up to 26 weeks. Check if your National Insurance record qualifies and what you would get.",
  alternates: { canonical: "/uk/benefits/new-style-jsa" },
  openGraph: ogFor("/uk/benefits/new-style-jsa"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/new-style-jsa", label: "New Style JSA Calculator" },
];

// Every figure below comes from the engine, so it moves with the rates.
const J = NEW_STYLE_2026.jsa;
const m = (n: number) => gbp(n, true);
const yearsFor = (d: string) => relevantYears(d).map(taxYearLabel);
const [nowA, nowB] = yearsFor("2026-11-26");
const [janA, janB] = yearsFor("2027-01-03");
const [startA, startB] = relevantYears("2026-11-26");
const FULL = newStyleJsa({ over25: true, pension: 0, earnings: 0, hours: 0 });
// A worked example: £80 a week pension and £25 a week from a Saturday job.
const EX = newStyleJsa({ over25: true, pension: 80, earnings: 25, hours: 6 });

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I get New Style JSA if I was self-employed?",
    a: "Not on self-employment. New Style JSA counts only Class 1 contributions paid as an employee, so Class 2 and Class 4 do not help (share fishermen and volunteer development workers are the exceptions). New Style ESA does count self-employment, if illness is the reason you cannot work.",
  },
  {
    q: "When does the first payment arrive?",
    a: "There are 7 waiting days at the start, which are not paid, and then up to two weeks to the first payment, which may not be for the full amount. After that it is paid every two weeks.",
  },
  {
    q: "Can I study and claim New Style JSA?",
    a: "Part-time study is usually fine. Full-time study only if the course is at Level 4 or below, you get no maintenance loan, grant or bursary for it, and you can still meet the work search agreed with your work coach.",
  },
  {
    q: "Can I claim during a dispute with my employer?",
    a: "Not while you are involved in a trade dispute with your employer. You also cannot get it if illness or disability stops you working: claim New Style ESA instead.",
  },
];

const SOURCES = [
  { label: "GOV.UK: New Style JSA eligibility (the tax years for claims either side of 3 January 2027)", href: "https://www.gov.uk/jobseekers-allowance/eligibility" },
  { label: "GOV.UK: New Style JSA, how it works and what you'll get", href: "https://www.gov.uk/jobseekers-allowance" },
  { label: "Jobseekers Act 1995, section 2 (the contribution conditions)", href: "https://www.legislation.gov.uk/ukpga/1995/18/section/2" },
  { label: "Jobseeker's Allowance Regulations 2013, regulation 51 (pensions over £50)", href: "https://www.legislation.gov.uk/uksi/2013/378/regulation/51" },
  { label: "Jobseeker's Allowance Regulations 2013, Schedule (the £5 earnings disregard)", href: "https://www.legislation.gov.uk/uksi/2013/378/schedule" },
  { label: "Jobseeker's Allowance Regulations 2013, regulation 19 (sanction periods)", href: "https://www.legislation.gov.uk/uksi/2013/378/regulation/19" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 rates)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "HMRC: Rates and thresholds for employers 2026 to 2027 (Lower Earnings Limit)", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK: Check your National Insurance record", href: "https://www.gov.uk/check-national-insurance-record" },
];

function Notes() {
  return (
    <>
      <h2>The two National Insurance tests</h2>
      <p>
        A claim made on or before 2 January 2027 looks at {nowA} and {nowB}; from 3 January 2027 it looks at {janA} and {janB}. Two tests apply to those years, and you need both.
      </p>
      <ul>
        <li>
          <strong>Paid as an employee, in one year.</strong>{" "}Class 1 National Insurance actually paid on at least 26 times the year&rsquo;s Lower Earnings Limit, each week
          counting up to the limit: in practice 26 weeks earning at least {gbp(LEL[startB])} a week in {nowB}, or {gbp(LEL[startA])} in {nowA}.
        </li>
        <li>
          <strong>Paid or credited, in both years.</strong>{" "}At least 50 times the limit ({gbp(50 * LEL[startB])} for {nowB}). National Insurance credits, for example from
          Universal Credit, Carer&rsquo;s Allowance or sick pay, count here.
        </li>
      </ul>
      <p>Your personal tax account on GOV.UK shows each year&rsquo;s contributions and credits, which is quicker than piecing it together from payslips.</p>

      <h2>What reduces it</h2>
      <p>
        A private or workplace pension over {gbp(J.pensionThreshold)} a week, and part-time pay over {gbp(J.earningsDisregard)} a week, each come off pound for pound. With an{" "}
        {gbp(80)} pension and {gbp(25)} a week from a Saturday job, {m(EX.pensionDeduction)} and {m(EX.earningsDeduction)} come off the {m(EX.personal)}, leaving {m(EX.weekly)}. Pay
        is counted after tax, National Insurance and half of any pension contribution. Working {J.hoursLimit} hours a week or more stops it altogether.
      </p>

      <h2>What does not count</h2>
      <p>
        Savings and your partner&rsquo;s income and savings make no difference, which is why New Style JSA is often paid when{" "}
        <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}is not. You can have both: Universal Credit counts the JSA as income and pays less, so check
        what the two come to together, and the <Link href="/uk/benefits/uc-advance">advance calculator</Link>{" "}if you need money before the first Universal Credit payment.
      </p>

      <h2>After 26 weeks</h2>
      <p>
        New Style JSA lasts 182 days. At the full {m(FULL.weekly)} a week that is {gbp(FULL.total)} in all. When it ends, only Universal Credit can carry on, so claim it before then
        if you will still be out of work. You can get New Style JSA again after a full 182 days only once at least 12 weeks have passed and the new claim falls in a different
        benefit year. If you are not sure what else you could get, the <Link href="/uk/benefits/benefits-checker">benefits checker</Link>{" "}takes a couple of minutes.
      </p>
    </>
  );
}

export default async function NewStyleJsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/new-style-esa", "/uk/benefits/universal-credit", "/uk/benefits/benefits-checker", "/uk/benefits/uc-advance", "/uk/benefits/universal-credit-taper"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="New Style JSA Calculator"
      lead="Whether your National Insurance record gets you New Style Jobseeker’s Allowance, how much it pays a week and what it comes to over its 26 weeks."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <JsaStudio query={query} />
    </CalcPage>
  );
}
