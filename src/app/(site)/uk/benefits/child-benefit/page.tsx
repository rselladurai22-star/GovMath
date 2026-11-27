import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { childBenefitFor, hicbc } from "@/lib/benefits/family";
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
// The High Income Child Benefit Charge on two children at £70,000, and what a £5,000 pension contribution saves.
const CHARGE_70 = hicbc({ children: 2, income: 70_000, pension: 0, giftAid: 0, weeks: 52 });
const CHARGE_70P = hicbc({ children: 2, income: 70_000, pension: 5_000, giftAid: 0, weeks: 52 });
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
  { label: "GOV.UK: Child Benefit, who can get it", href: "https://www.gov.uk/child-benefit/eligibility" },
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

      <h2>Who can claim</h2>
      <p>
        You can claim if you are responsible for bringing up a child under 16, or under 20 in approved education or training, and you live in the UK. Being responsible usually
        means the child lives with you, or you pay at least as much as the Child Benefit towards their keep, in money or in kind. Only one person can get it for each child: if two
        of you could claim, agree between you who does, or HMRC decides. Foster carers can claim as long as the council is not paying towards the child&rsquo;s keep, and adopters
        from the day the child comes to live with them.
      </p>
      <p>
        Your income does not affect whether you can claim. It only affects how much you keep, through the charge below, and the charge never takes back more than you were paid.
      </p>

      <h2>The High Income Child Benefit Charge</h2>
      <p>
        If you or your partner has adjusted net income over {gbp(NOW.hicbcStart)}, the higher earner pays back 1% of the Child Benefit for every £200 above it, through Self
        Assessment or their tax code, until it is all repaid at {gbp(NOW.hicbcEnd)}. On {gbp(70_000)} with two children, {Math.round(CHARGE_70.share * 100)}% is taken back:{" "}
        {gbp(CHARGE_70.charge)} of the {gbp(CHARGE_70.benefit)} a year, leaving {gbp(CHARGE_70.keep)}. A {gbp(5_000)} pension contribution counts against adjusted net income,
        cutting the charge to {gbp(CHARGE_70P.charge)}. The <Link href="/uk/benefits/high-income-child-benefit">High Income Child Benefit Charge calculator</Link>{" "}works out your
        own figure.
      </p>

      <h2>When it stops</h2>
      <p>
        On 31 August after your child&rsquo;s 16th birthday, unless you tell HMRC they are staying in approved education or training. It can then run until they turn 20, as long as they were
        accepted onto the course before 19.
      </p>
      <p>
        Approved education is full-time, non-advanced study: more than 12 hours a week on average of supervised study. A levels, T levels, GCSEs, the International Baccalaureate,
        Scottish Highers, NVQs up to level 3 and home education count. A degree, an HNC or HND, an access course and an apprenticeship do not, and nor does a course your child
        does through an employer. Payments also stop if your child starts work of 24 hours or more a week, or claims Universal Credit in their own right.
      </p>
      <p>
        If a 16 or 17-year-old leaves education and registers with a careers service or the armed forces, you can ask for Child Benefit to carry on for 20 weeks while they look
        for work or training.
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
