import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { interestRate, monthlyPayroll, PLANS_2026, projectLoan } from "@/lib/students/loans";
import { gbp, percent } from "@/components/flagship/format";
import Plan2Studio from "./Plan2Studio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Student Loan Calculator: Plan 2 Repayments",
  description:
    "Free Plan 2 student loan calculator for 2026/27. See your monthly repayments, the interest rate, the total you repay and whether your loan will be written off.",
  alternates: { canonical: "/uk/students/plan-2-student-loan" },
  openGraph: ogFor("/uk/students/plan-2-student-loan"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students" },
  { href: "/uk/students/plan-2-student-loan", label: "Plan 2 Student Loan" },
];

// Every figure below comes from the engine: 2026/27 rules, then 3% pay rises and 3% RPI.
const P2 = PLANS_2026.plan2;
const PAY = (s: number) => monthlyPayroll("plan2", s);
const RATE = (s: number) => interestRate("plan2", s);
const project = (salary: number, extraMonthly = 0) => projectLoan({ plan: "plan2", balance: 45_000, salary, salaryGrowth: 0.03, rpi: 0.03, yearsRepaying: 0, extraMonthly });
const MID = project(35_000);
const MID_OVER = project(35_000, 100);
const HIGH = project(65_000);
const HIGH_OVER = project(65_000, 200);
const RISEN = Math.round(P2.threshold * 1.03 ** 3);
const FREEZE_COST = Math.round((RISEN - P2.threshold) * P2.rate);
const MONTHLY_THRESHOLD = Math.floor(P2.threshold / 12);

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does salary sacrifice lower my repayments?",
    a: "Yes. Repayments are worked out on your pay after salary sacrifice, so pension contributions, cycle-to-work or electric car schemes made through salary sacrifice reduce them. Ordinary pension contributions that are not salary sacrifice do not, because repayments are based on the same pay as National Insurance.",
  },
  {
    q: "I have two jobs. Do they add together?",
    a: `Not through payroll. Each employer only takes a repayment if that job alone pays more than the threshold (${gbp(MONTHLY_THRESHOLD)} a month), so two jobs on £1,500 a month each repay nothing. If you file a Self Assessment return, HMRC works out the repayment on your total income for the year instead.`,
  },
  {
    q: "Can I get a refund?",
    a: "Yes, if your income for the whole tax year was below the yearly threshold but you repaid in some months, for example because of a bonus or overtime, or if you keep repaying after the balance is cleared. Ask the Student Loans Company after the tax year ends.",
  },
  {
    q: "Will my student loan stop me getting a mortgage?",
    a: "It does not appear on your credit file and does not affect your credit score. Lenders can still take the monthly repayment into account when they work out how much they will lend, as they would any regular outgoing on your payslip.",
  },
  {
    q: "What if I move abroad?",
    a: "You still have to repay. Tell the Student Loans Company if you are leaving for more than three months. It sets a threshold for the country you move to and you pay it directly. If you do not keep your income details up to date, it can set a fixed monthly repayment and charges the highest interest rate.",
  },
];

const SOURCES = [
  { label: "GOV.UK: repaying your student loan, how much you repay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "Student Loans Company: how interest is calculated, Plan 2", href: "https://www.gov.uk/guidance/how-interest-is-calculated-plan-2" },
  { label: "GOV.UK: when your student loan gets written off or cancelled", href: "https://www.gov.uk/repaying-your-student-loan/when-your-student-loan-gets-written-off-or-cancelled" },
  { label: "GOV.UK: which repayment plan you are on", href: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
  { label: "HM Treasury: Budget 2025, Plan 2 threshold frozen from April 2027", href: "https://www.gov.uk/government/publications/budget-2025-document/budget-2025-html" },
];

function Notes() {
  return (
    <>
      <h2>For most people it works like a graduate tax</h2>
      <p>
        What you repay depends on what you earn, not on what you owe. {P2.label} takes {Math.round(P2.rate * 100)}% of everything you earn above {gbp(P2.threshold)} a year, straight from
        your pay: about {gbp(PAY(30_000))} a month on £30,000, {gbp(PAY(40_000))} on £40,000 and {gbp(PAY(50_000))} on £50,000. Two people on the same salary pay the same each month, one
        owing £20,000 and the other £70,000. The balance only decides whether you finish before the {P2.writeOffYears}-year write-off.
      </p>
      <p>
        Most Plan 2 borrowers do not finish. With a {gbp(45_000)} balance and a £35,000 salary rising 3% a year, you would repay about {gbp(MID.totalRepaid)} over 30 years and have{" "}
        {gbp(MID.writtenOff)} written off. Someone on £65,000 with the same balance clears it in {HIGH.clearedIn ?? "over 30"} years, after repaying {gbp(HIGH.totalRepaid)}.
      </p>

      <h2>Interest depends on your income</h2>
      <p>
        From 1 September 2026 the rate is set by March 2026 RPI of 4.1%. While you study, and once you earn £52,885 or more, it is RPI plus 3%, which would be 7.1%, but a cap holds it at{" "}
        {percent(RATE(60_000), 0)} until 31 August 2027. In between, it slides up from {percent(RATE(29_385), 1)} at the threshold: {percent(RATE(35_000), 2)} at £35,000 and{" "}
        {percent(RATE(40_000), 2)} at £40,000. The Student Loans Company adds RPI each month and settles the rest once HMRC confirms your income for the year, so your statement can jump
        after the tax year ends.
      </p>

      <h2>The threshold is frozen until 2030</h2>
      <p>
        The threshold is {gbp(P2.threshold)} for 2026/27 and, after the November 2025 Budget, stays there for three more years, to April 2030. Pay rises in that time all count towards
        repayments. If it had risen by 3% a year instead, it would be about {gbp(RISEN)} by 2029/30, so on any salary above that the freeze costs about {gbp(FREEZE_COST)} a year in extra
        repayments.
      </p>

      <h2>Should you overpay?</h2>
      <p>
        Only if you are likely to clear the loan anyway. On £35,000, paying an extra £100 a month raises what you repay in total from {gbp(MID.totalRepaid)} to {gbp(MID_OVER.totalRepaid)},
        because the loan is still written off at the end and the extra only shrinks what is cancelled. On £65,000, an extra £200 a month brings the total down from {gbp(HIGH.totalRepaid)} to{" "}
        {gbp(HIGH_OVER.totalRepaid)} and clears it {(HIGH.clearedIn ?? 0) - (HIGH_OVER.clearedIn ?? 0)} years sooner. Voluntary payments are not refunded, so try your own figures with the
        overpay switch before you commit.
      </p>
      <p>
        Plan 2 covers English undergraduates who started between September 2012 and July 2023, and Welsh students since 2012. If you started in England from August 2023 you are on Plan 5;{" "}
        <Link href="/blog/plan-2-vs-plan-5-student-loans">Plan 2 vs Plan 5</Link>{" "}compares the two. Students still choosing a course can use the{" "}
        <Link href="/uk/students/maintenance-loan">Maintenance Loan calculator</Link>{" "}or, from Wales, the <Link href="/uk/students/welsh-student-finance">Student Finance Wales calculator</Link>
        . If you work part time, the <Link href="/uk/tax-and-salary/pro-rata">pro rata salary calculator</Link>{" "}shows the pay these repayments are worked out on.
      </p>
    </>
  );
}

export default async function Plan2Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/maintenance-loan", "/uk/students/student-council-tax", "/uk/students/saas-funding", "/uk/students/welsh-student-finance"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Plan 2 Student Loan Calculator"
      lead="What your Plan 2 student loan takes from your pay each month in 2026/27, and whether you will clear it or have it written off after 30 years."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <Plan2Studio query={query} />
    </CalcPage>
  );
}
