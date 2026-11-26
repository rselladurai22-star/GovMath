import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { MAINTENANCE_2026, maintenanceLoan2026, PLANS_2026, STUDENT_SUPPORT_2026 } from "@/lib/students/loans";
import { gbp } from "@/components/flagship/format";
import MaintenanceStudio from "./MaintenanceStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Maintenance Loan Calculator 2026/27 (England)",
  description:
    "Free student maintenance loan calculator for 2026/27 (Student Finance England). See how much you get by household income, living at home, away or in London.",
  alternates: { canonical: "/uk/students/maintenance-loan" },
  openGraph: ogFor("/uk/students/maintenance-loan"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students" },
  { href: "/uk/students/maintenance-loan", label: "Maintenance Loan" },
];

// Every figure below comes from the 2026/27 engine (S.I. 2026/130 rates).
const M = MAINTENANCE_2026;
const AWAY = M.away;
const at = (x: number) => maintenanceLoan2026(x, "away");
const AT40 = at(40_000);
const AT55 = at(55_000);
const MIN_AT = at(0).minAt;
const WEEKLY_GAP_40 = AT40.reduction / 39;
const FINAL_AWAY = maintenanceLoan2026(0, "away", { finalYear: true }).loan;
const BEN_AWAY = maintenanceLoan2026(0, "away", { benefits: true }).loan;
const BEN_30 = maintenanceLoan2026(30_000, "away", { benefits: true }).loan;
const P5 = PLANS_2026.plan5;
const OTHER_CHILD = STUDENT_SUPPORT_2026.childAllowance;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do my own part-time earnings reduce the loan?",
    a: "No. Student Finance England does not ask about money you earn from a job during the academic year, including evening, weekend and holiday work. It only counts your own unearned income, such as savings interest, rent or dividends, and that is added to your parents' income.",
  },
  {
    q: "What happens if my parents will not give their income details?",
    a: `You are assessed as if your household income is too high for anything above the minimum, so you get only the part that does not depend on income: ${gbp(AWAY.min)} away from home outside London in 2026/27. If you have no contact with your parents, or they cannot be traced, you can apply as an independent student with a letter from a social worker, teacher, doctor or adviser who knows your situation.`,
  },
  {
    q: "My parents' income has dropped since 2024/25. Can that be used instead?",
    a: "Yes, if it has fallen by 15% or more. Your parents can ask Student Finance England to use their expected income for the current tax year (2026/27). It is checked against their actual income once the tax year ends, so an estimate that turns out too low can lead to an overpayment you have to repay.",
  },
  {
    q: "Is the Maintenance Loan paid if I have not registered at university?",
    a: "No. The first instalment is released once your university or college confirms you have registered and started the course, which is why the first payment can arrive a few days into term. Your Notification of Entitlement shows the dates and amounts of all three instalments.",
  },
  {
    q: "Are maintenance grants coming back?",
    a: "Not for 2026/27. The government said in the November 2025 Budget that it will fund a new means-tested maintenance grant for students on certain courses from the 2028/29 academic year. Courses starting on or after 1 January 2027 also move to the Lifelong Learning Entitlement, which has its own rules.",
  },
];

const SOURCES = [
  { label: "GOV.UK: student finance for new full-time students, 2026 to 2027", href: "https://www.gov.uk/student-finance/new-fulltime-students" },
  { label: "Student Finance England: how you’re assessed and paid, 2026 to 2027", href: "https://www.gov.uk/government/publications/student-finance-how-youre-assessed-and-paid/student-finance-how-youre-assessed-and-paid-2026-to-2027" },
  { label: "S.I. 2026/130: the 2026/27 loan amounts and income divisors", href: "https://www.legislation.gov.uk/uksi/2026/130/contents/made" },
  { label: "GOV.UK: Long Courses Loan", href: "https://www.gov.uk/guidance/guidance-for-students-who-qualify-for-a-long-courses-loan" },
  { label: "GOV.UK: extra help for students with children, adult dependants or a disability", href: "https://www.gov.uk/extra-money-pay-university" },
  { label: "GOV.UK: repaying your student loan, how much you repay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
];

function Notes() {
  return (
    <>
      <h2>What counts as household income</h2>
      <p>
        For most students starting in 2026/27 it is your parents&rsquo; taxable income for the 2024/25 tax year, before tax and National Insurance, plus that of a parent&rsquo;s husband, wife
        or partner who lives with them. Student Finance England gets it from HMRC. Pension contributions come off first, and so does {gbp(OTHER_CHILD)} for every other child your parents
        support, so two parents earning a combined £45,000 with two younger children are assessed on {gbp(45_000 - 2 * OTHER_CHILD)}, not £45,000, before any pension contributions. If your parents are separated, only the parent you live with
        (and their partner) counts.
      </p>
      <p>
        You are an independent student, and your parents&rsquo; income is ignored, if you are 25 or over when the academic year starts, have been married or in a civil partnership, look after
        a child, have supported yourself for three years, or are permanently estranged from your parents. Then your own income counts, and your partner&rsquo;s if you are married or 25 or over
        and live together. Care leavers can borrow the maximum from 2026/27 whatever the household income.
      </p>

      <h2>The gap is the help your family is expected to give</h2>
      <p>
        Above £25,000, the loan falls by £1 for every £{AWAY.divisor.toFixed(2)} of household income if you live away from home outside London, until it reaches {gbp(AWAY.min)} at{" "}
        {gbp(MIN_AT)}. The amount taken off is not paid by anyone else: the system assumes your parents will make it up, but nothing obliges them to. At £40,000 the loan is {gbp(AT40.loan)},{" "}
        {gbp(AT40.reduction)} below the maximum, which is about {gbp(WEEKLY_GAP_40)} a week over the academic year. At £55,000 the gap is {gbp(AT55.reduction)}.
      </p>
      <p>
        Talk about it before term starts. Many students find out in their first week that their loan does not cover rent, and the gap shown here is often the reason. If your parents cannot
        help, your university&rsquo;s hardship fund and bursaries are the first places to ask.
      </p>

      <h2>Where you live changes the maximum</h2>
      <p>
        The 2026/27 maximums are {gbp(M.home.max)} living with your parents, {gbp(AWAY.max)} away from home outside London, {gbp(M.london.max)} in London and {gbp(M.abroad.max)} for a year
        abroad. &ldquo;London&rdquo; means a course at a university in the London area, not just living there. The final year of a course is shorter, so its rates are lower: {gbp(FINAL_AWAY)}{" "}
        at most away from home outside London. Tell Student Finance England if you move back home mid-course, because the lower rate then applies.
      </p>

      <h2>Extra for long courses, disabilities and children</h2>
      <p>
        If your course runs for more than 30 weeks and 3 days in the year, as many medical, dental and nursing years do, the Long Courses Loan adds up to £{AWAY.longWeek} for each extra week away
        from home outside London (£{M.london.longWeek} in London, £{M.home.longWeek} at home). Students who can claim benefits, such as lone parents and some disabled students, get a higher
        maximum of {gbp(BEN_AWAY)} away from home, and at £30,000 household income would get {gbp(BEN_30)}{" "}instead of {gbp(at(30_000).loan)}. Disabled Students&rsquo; Allowance, the
        Childcare Grant, Parents&rsquo; Learning Allowance and the Adult Dependants&rsquo; Grant are paid on top and are not repaid.
      </p>

      <h2>Paying it back</h2>
      <p>
        If you start an undergraduate course in England after July 2023, your Maintenance Loan and Tuition Fee Loan join one {P5.label} balance. You repay {Math.round(P5.rate * 100)}% of your
        income above {gbp(P5.threshold)} a year, taken through your pay, and anything left is written off after {P5.writeOffYears} years. How much you borrowed does not change the monthly
        amount. Students from Wales and earlier English starters are on Plan 2: the <Link href="/uk/students/plan-2-student-loan">Plan 2 calculator</Link>{" "}shows how that works, and Welsh and
        Scottish students should use the <Link href="/uk/students/welsh-student-finance">Student Finance Wales</Link>{" "}and <Link href="/uk/students/saas-funding">SAAS</Link>{" "}calculators,
        because their support is different. Living in an all-student house? Check the <Link href="/uk/students/student-council-tax">student council tax checker</Link>{" "}before the first bill arrives.
      </p>
    </>
  );
}

export default async function MaintenancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/student-council-tax", "/uk/students/plan-2-student-loan", "/uk/students/saas-funding", "/uk/students/welsh-student-finance"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Maintenance Loan Calculator"
      lead="Your 2026/27 Maintenance Loan from Student Finance England, from your household income and where you will live, and how much your family is expected to add."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <MaintenanceStudio query={query} />
    </CalcPage>
  );
}
