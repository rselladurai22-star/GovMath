import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import EsaStudio from "./EsaStudio";
import { ogFor } from "@/gm/og";
import { LEL, NEW_STYLE_2026, NEW_STYLE_2027, newStyleEsa, relevantYears, taxYearLabel } from "@/lib/benefits/new-style";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "How Much Is New Style ESA? 2026/27 Calculator",
  description:
    "New Style ESA is £95.55 a week, or £145.90 in the support group, in 2026/27. Check if your National Insurance record qualifies and what you would get.",
  alternates: { canonical: "/uk/benefits/new-style-esa" },
  openGraph: ogFor("/uk/benefits/new-style-esa"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/new-style-esa", label: "New Style ESA Calculator" },
];

// Every figure below comes from the engine, so it moves with the rates.
const E = NEW_STYLE_2026.esa;
const m = (n: number) => gbp(n, true);
const yearsFor = (d: string) => relevantYears(d).map(taxYearLabel).join(" and ");
const NOW = yearsFor("2026-11-26");
const JAN = yearsFor("2027-01-03");
const [, later] = relevantYears("2026-11-26");
const PENSION_EXAMPLE = newStyleEsa({ over25: true, group: "wrag", pre2017: false, pension: 100, earnings: 0, hours: 0 }).pensionDeduction;
const SUPPORT = E.main + E.support;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I claim New Style ESA while I am on Statutory Sick Pay?",
    a: "Not for the same days. You can apply up to 3 months before your Statutory Sick Pay ends, and New Style ESA starts as soon as it stops.",
  },
  {
    q: "Can I get New Style ESA if I am self-employed?",
    a: "Yes. Unlike New Style JSA, it counts Class 2 contributions. Since April 2024 self-employed people with profits over the small profits threshold are treated as having paid them, so a full year of self-employment like that counts for both tests.",
  },
  {
    q: "What happens to New Style ESA at State Pension age?",
    a: "It stops. You can only claim it while you are under State Pension age; after that the State Pension, and Pension Credit on a low income, take its place.",
  },
  {
    q: "Can I claim again after the 365 days run out?",
    a: "Possibly. A new claim looks at the National Insurance you paid in the two full tax years before the year you claim in, so after a period back at work you may qualify again. You can also be moved to the support group if your health gets worse or you develop a new condition.",
  },
  {
    q: "Will New Style ESA go up in April 2027?",
    a: `Yes, without a new claim. Under DWP's proposed figures the main rate rises to ${m(NEW_STYLE_2027.esa.main)} and the support component to ${m(NEW_STYLE_2027.esa.support)}. Choose the April 2027 rates above to see your amount.`,
  },
];

const SOURCES = [
  { label: "GOV.UK: New Style ESA eligibility", href: "https://www.gov.uk/employment-support-allowance/eligibility" },
  { label: "GOV.UK: New Style ESA, what you'll get", href: "https://www.gov.uk/employment-support-allowance/what-youll-get" },
  { label: "GOV.UK: Working while you claim ESA", href: "https://www.gov.uk/employment-support-allowance/working-while-you-claim" },
  { label: "GOV.UK: How to claim ESA", href: "https://www.gov.uk/employment-support-allowance/how-to-claim" },
  { label: "Welfare Reform Act 2007, Schedule 1 (the contribution conditions)", href: "https://www.legislation.gov.uk/ukpga/2007/5/schedule/1" },
  { label: "Welfare Reform Act 2007, section 1A (the 365-day limit)", href: "https://www.legislation.gov.uk/ukpga/2007/5/section/1A" },
  { label: "ESA Regulations 2008, regulation 45 (permitted work)", href: "https://www.legislation.gov.uk/uksi/2008/794/regulation/45" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 rates)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "HMRC: Rates and thresholds for employers 2026 to 2027 (Lower Earnings Limit)", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK: Check your National Insurance record", href: "https://www.gov.uk/check-national-insurance-record" },
];

function Notes() {
  return (
    <>
      <h2>Which tax years count</h2>
      <p>
        It is not the year you fall ill that counts but the last two complete tax years before the benefit year, which starts on the first Sunday in January. If your illness began
        between 4 January 2026 and 2 January 2027, that is {NOW}; from 3 January 2027 it moves on to {JAN}. For ESA the date that matters is the start of the period you could not
        work, not the day you apply.
      </p>
      <p>
        You need two things. In one of the years, National Insurance actually paid on at least 26 times that year&rsquo;s Lower Earnings Limit, with each week counting up to the limit
        (in practice, 26 weeks of pay at {gbp(LEL[later])} a week or more in {taxYearLabel(later)}). And in both years, contributions paid or credited on at least 50 times the limit.
        Credits, for example while you were on Universal Credit, Carer&rsquo;s Allowance or sick pay, can fill the second test but never the first.
      </p>

      <h2>A pension or a little work</h2>
      <p>
        A private or workplace pension over {gbp(E.pensionThreshold)} a week takes half the excess: GOV.UK&rsquo;s example of {gbp(100)} a week takes off {m(PENSION_EXAMPLE)}. If the
        pension wipes out the payment you still get National Insurance credits, which protect your State Pension.
      </p>
      <p>
        You can do permitted work without losing anything: up to {gbp(E.permittedWorkLower)} a week at any hours, or up to {m(E.permittedWorkHigher)} a week if you work under 16 hours.
        Voluntary work has no limit. Tell the Jobcentre before you start.
      </p>

      <h2>Savings and your partner do not count</h2>
      <p>
        New Style ESA is paid on your own National Insurance record, so savings, a partner&rsquo;s pay and your partner&rsquo;s benefits make no difference. That is why it is worth
        claiming even when <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}would pay little or nothing.
      </p>
      <p>
        You can have both. Universal Credit takes the ESA off in full, but it can add a health element and help with rent, and the support group lifts the{" "}
        <Link href="/uk/benefits/benefit-cap">benefit cap</Link>. If you need help with the extra costs of your condition, look at{" "}
        <Link href="/uk/benefits/pip-points">PIP</Link>, which is separate and unaffected by ESA.
      </p>

      <h2>The support group and the 365 days</h2>
      <p>
        The Work Capability Assessment usually comes after 13 weeks. In the work-related activity group you keep {m(E.main)} a week, but payment stops 365 days after your claim
        began, counting the assessment phase. The support group pays {m(SUPPORT)} with no time limit. If the assessment takes longer than 13 weeks, the difference is back-paid
        once you are placed in a group.
      </p>
    </>
  );
}

export default async function NewStyleEsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/new-style-jsa", "/uk/benefits/universal-credit", "/uk/benefits/pip-points", "/uk/benefits/benefits-checker", "/uk/benefits/benefit-cap"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="New Style ESA Calculator"
      lead="Whether your National Insurance record qualifies you for New Style Employment and Support Allowance, and how much you get at each stage of the claim."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <EsaStudio query={query} />
    </CalcPage>
  );
}
