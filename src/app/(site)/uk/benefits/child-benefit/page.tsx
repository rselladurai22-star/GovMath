import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { childBenefitFor } from "@/lib/benefits/family";
import { childBenefitRates } from "@/lib/benefits/child-benefit";
import { gbp } from "@/components/flagship/format";
import ChildBenefitStudio from "./ChildBenefitStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "How Much Is Child Benefit? 2026/27 Calculator",
  description:
    "Child Benefit is £27.05 a week for the eldest child and £17.90 for each other child in 2026/27. See the total for 1, 2, 3 or 4 children a week, month and year.",
  alternates: { canonical: "/uk/benefits/child-benefit" },
  openGraph: ogFor("/uk/benefits/child-benefit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/child-benefit", label: "Child Benefit" },
];

// Every figure in the text below comes from the engine, so it moves with the rates.
const NOW = childBenefitRates("2026/27");
const NEXT = childBenefitRates("2027/28");
const week = (n: number) => gbp(childBenefitFor(n).weekly, true);
const RATES = [1, 2, 3, 4, 5, 6].map((n) => ({ n, now: childBenefitFor(n), next: childBenefitFor(n, 52, "2027/28") }));

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much is Child Benefit for 1, 2, 3 or 4 children in 2026?",
    a: `From 6 April 2026 it is ${week(1)} a week for one child, ${week(2)} for two, ${week(3)} for three and ${week(4)} for four. That is ${gbp(NOW.firstChildWeekly, true)} for the eldest or only child plus ${gbp(NOW.additionalChildWeekly, true)} for each other child, with no limit on the number of children.`,
  },
  {
    q: "How much will Child Benefit be from April 2027?",
    a: `The proposed rates from 6 April 2027 are ${gbp(NEXT.firstChildWeekly, true)} a week for the eldest or only child and ${gbp(NEXT.additionalChildWeekly, true)} for each other child (Budget 2026). For two children that is ${gbp(childBenefitFor(2, 52, "2027/28").weekly, true)} a week, or ${gbp(childBenefitFor(2, 52, "2027/28").annual, true)} a year: ${gbp(childBenefitFor(2, 52, "2027/28").annual - childBenefitFor(2).annual, true)} more than now. They are final once Parliament approves them.`,
  },
  {
    q: "When is Child Benefit paid?",
    a: "Every four weeks, on a Monday or Tuesday, into one bank account. You can ask to be paid weekly if you are a single parent or you get certain other benefits, such as Universal Credit.",
  },
  {
    q: "We have separated and have one child each. Who gets the higher rate?",
    a: `Both of you. Each household gets ${gbp(NOW.firstChildWeekly, true)} a week for its own eldest child. If two families move in together, only one eldest rate is paid for the household and the other children get ${gbp(NOW.additionalChildWeekly, true)} each.`,
  },
  {
    q: "Does Child Benefit count as income for Universal Credit?",
    a: "No. Universal Credit ignores it, so claiming Child Benefit does not reduce your award. It does count towards the benefit cap.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Child Benefit, what you'll get", href: "https://www.gov.uk/child-benefit/what-youll-get" },
  { label: "GOV.UK: Child Benefit when your child turns 16", href: "https://www.gov.uk/child-benefit-16-19" },
  { label: "GOV.UK: High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "Income Tax (Earnings and Pensions) Act 2003, section 681C: the amount of the charge", href: "https://www.legislation.gov.uk/ukpga/2003/1/section/681C" },
  { label: "HMRC: Budget 2026 overview of tax legislation and rates, Annex A (rates from April 2027)", href: "https://www.gov.uk/government/publications/budget-2026-overview-of-tax-legislation-and-rates-ootlar" },
];

function Notes() {
  return (
    <>
      <h2>Child Benefit rates for 1 to 6 children</h2>
      <div className="sa-tablewrap">
        <table className="sa-cb-rates">
          <thead>
            <tr>
              <th scope="col">Children</th>
              <th scope="col">A week</th>
              <th scope="col">Every 4 weeks</th>
              <th scope="col">A year</th>
              <th scope="col">A week from April 2027</th>
            </tr>
          </thead>
          <tbody>
            {RATES.map(({ n, now, next }) => (
              <tr key={n}>
                <th scope="row">{n}</th>
                <td>{gbp(now.weekly, true)}</td>
                <td>{gbp(now.fourWeekly, true)}</td>
                <td>{gbp(now.annual, true)}</td>
                <td>{gbp(next.weekly, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The first three columns are the 2026/27 rates; the last is the proposed rate from 6 April 2027. Each child after the sixth adds another {gbp(NOW.additionalChildWeekly, true)} a week.
      </p>

      <h2>When it stops</h2>
      <p>
        On 31 August after your child&rsquo;s 16th birthday, unless you tell HMRC they are staying in approved education or training. It can then run until they turn 20, as long as they were
        accepted onto the course before 19.
      </p>
      <p>
        A levels, T levels, Scottish Highers and NVQs up to level 3 count. University, an HNC and an apprenticeship do not.
      </p>

      <h2>Claim it even if you will not keep it</h2>
      <p>
        A claim does two things besides paying you. It gives a parent who is not working, or earns too little to pay National Insurance, credits towards their State Pension until the child is
        12. And it means your child is sent a National Insurance number just before they turn 16.
      </p>
      <p>
        So if one of you earns over £80,000, where the <Link href="/uk/benefits/high-income-child-benefit">High Income Child Benefit Charge</Link>{" "}takes back every pound, claim and tick the box
        to opt out of payments. You can also check a <Link href="/uk/benefits/maternity-pay">maternity pay</Link>{" "}or{" "}
        <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</Link>{" "}estimate while you are here.
      </p>
      <p>
        Claim as soon as the birth is registered. HMRC backdates a claim by three months at most.
      </p>
    </>
  );
}

export default async function ChildBenefitPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/high-income-child-benefit", "/uk/benefits/free-childcare-hours", "/uk/benefits/tax-free-childcare", "/uk/benefits/universal-credit", "/uk/benefits/maternity-pay", "/uk/benefits/benefit-cap"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Child Benefit Calculator"
      lead="How much Child Benefit you get for your children in 2026/27: a week, every four weeks and a year."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <ChildBenefitStudio query={query} />
    </CalcPage>
  );
}
