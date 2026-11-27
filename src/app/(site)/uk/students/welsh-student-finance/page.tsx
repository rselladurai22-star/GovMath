import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { WALES_2026, WALES_GRANT, wales2026 } from "@/lib/students/nations";
import { interestRate, PLAN2_INTEREST, PLANS_2026, repayments2026 } from "@/lib/students/loans";
import { gbp, percent } from "@/components/flagship/format";
import WalesStudio from "./WalesStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Student Finance Wales Calculator 2026/27",
  description:
    "Free Student Finance Wales calculator for 2026/27. See your Welsh Government Learning Grant and maintenance loan by household income and where you live.",
  alternates: { canonical: "/uk/students/welsh-student-finance" },
  openGraph: ogFor("/uk/students/welsh-student-finance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students" },
  { href: "/uk/students/welsh-student-finance", label: "Welsh Student Finance Calculator" },
];

// Every figure below comes from the Student Finance Wales 2026/27 table in the engine.
const W = WALES_2026;
const A25 = wales2026(25_000, "away");
const A45 = wales2026(45_000, "away");
const ABASE = wales2026(80_000, "away");
const P2 = PLANS_2026.plan2;
const REPAY_32 = repayments2026({ salary: 32_000, plans: ["plan2"] });
const RATE_LOW = interestRate("plan2", 25_000);
const RATE_CAP = interestRate("plan2", 60_000);
const SPECIAL_SUPPORT = 5_181;
const PRIVATE_FEE_LOAN = 6_525;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I take a smaller Maintenance Loan and still get the whole grant?",
    a: "Yes. Student Finance Wales works out your Learning Grant first and pays it in full; the loan is the rest of the total, and you can ask for less of it or none. If you ask for more loan than you are entitled to, you are simply given the lower amount.",
  },
  {
    q: "What if my parents' income has fallen since 2024/25?",
    a: "If it has dropped by at least 15% in the current tax year, your parents can ask for a new assessment on the lower figure. That moves more of your support from loan to grant. The estimate is checked once the tax year ends.",
  },
  {
    q: "What happens if my parents will not share their income?",
    a: `You can still apply without an income assessment and get the ${gbp(WALES_GRANT.minGrant)} base grant with the rest as loan. If you later ask to be assessed on household income, you may get more grant and less loan, and have to pay back some of the Maintenance Loan you were already paid.`,
  },
  {
    q: "Do Welsh students get the same package at an English or Scottish university?",
    a: "Yes. Student Finance Wales supports students who normally live in Wales wherever in the UK they study, with the same grant and loan rates. Scottish degrees often last four years, so you borrow for an extra year.",
  },
  {
    q: "Should I make voluntary repayments to clear the loan?",
    a: "Think hard first. Anything left is written off 30 years after you are first due to repay, and voluntary repayments cannot be refunded, so for many graduates they only reduce the amount written off. A single £5 voluntary payment is, however, enough to trigger the £1,500 partial cancellation.",
  },
];

const SOURCES = [
  { label: "Student Finance Wales: what’s available for full-time students", href: "https://www.studentfinancewales.co.uk/undergraduate-finance/full-time/tuition-fee-and-living-cost-students/what-s-available/" },
  { label: "Student Finance Wales: notes for full-time students 2026/27 (PN1)", href: "https://studentfinancewales.co.uk/media/3qklw05b/sfw_pn1_notes_2627_e_o.pdf" },
  { label: "Student Finance Wales: parents’ guide 2026/27", href: "https://www.studentfinancewales.co.uk/media/rpwlr5nu/sfw_parents_guide_to_student_finance_2627_o_e.pdf" },
  { label: "GOV.UK: Welsh partial loan cancellation", href: "https://www.gov.uk/guidance/welsh-partial-loan-cancellation" },
  { label: "GOV.UK: repaying your student loan, how much you repay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "Welsh Government: written statement on Plan 2 repayment thresholds (11 November 2026)", href: "https://www.gov.wales/written-statement-plan-2-student-loan-repayment-thresholds" },
];

function Notes() {
  return (
    <>
      <h2>Everyone gets the same total</h2>
      <p>
        Wales gives every full-time undergraduate the same amount for living costs, whatever their family earns: {gbp(W.home.total)} living with parents, {gbp(W.away.total)} away from home
        outside London and {gbp(W.london.total)} studying in London. Household income only changes how that total is split. The grant part is worked out first, and the Maintenance Loan fills
        the rest. No other part of the UK does this: in England a higher household income means less money, while in Wales it means the same money with more of it repayable.
      </p>

      <h2>How the split slides with household income</h2>
      <p>
        At {gbp(WALES_GRANT.fullTo)} or less you get the full grant, {gbp(W.away.maxGrant)} away from home. It then falls steadily to the {gbp(WALES_GRANT.minGrant)} base grant at{" "}
        {gbp(WALES_GRANT.minFrom)}, which everyone gets. So a student away from home on {gbp(25_000)} household income gets {gbp(A25.grant)} grant and {gbp(A25.loan)} loan; on {gbp(45_000)}{" "}
        it is {gbp(A45.grant)} grant and {gbp(A45.loan)} loan; from {gbp(WALES_GRANT.minFrom)} up it is {gbp(ABASE.grant)} and {gbp(ABASE.loan)}.
      </p>
      <p>
        Household income is your parents&rsquo; taxable income for the last complete tax year, 2024/25 for a course starting in 2026/27, including wages, savings interest and taxable benefits,
        confirmed with HMRC. Tell Student Finance Wales about other children your parents support, especially any also in higher education, because that lowers the assessed income.
      </p>

      <h2>Where you live and study</h2>
      <p>
        The London rate is for students at a London university, and the home rate for anyone living with their parents during term. Change where you live and the total changes, so update your
        account if you move back home. Tuition is separate: a Tuition Fee Loan of up to {gbp(WALES_GRANT.feeLoan)} a year goes straight to your university, anywhere in the UK, and does not
        depend on income. At a private college that is not subject to a fee cap, the loan stops at {gbp(PRIVATE_FEE_LOAN)}.
      </p>

      <h2>Paying back, and the £1,500 that is written off</h2>
      <p>
        Welsh students are on {P2.label}, even those who started after 2023. You repay {Math.round(P2.rate * 100)}% of your income above {gbp(P2.threshold)} in 2026/27, through your pay,
        from the April after you leave: on {gbp(32_000)} that is {gbp(REPAY_32.yearly)} a year. Interest from September 2026 runs from {percent(RATE_LOW, 1)} on lower incomes to a capped{" "}
        {percent(RATE_CAP, 0)}, and anything left is written off after {P2.writeOffYears} years. The Welsh Government confirmed on 11 November 2026 that the {gbp(P2.threshold)}{" "}
        threshold, and the {gbp(PLAN2_INTEREST.lower)} to {gbp(PLAN2_INTEREST.upper)} band over which interest rises, stay frozen for Welsh borrowers for 2027/28 to 2029/30, as
        they do in England, because the shared repayment system cannot run different thresholds. The <Link href="/uk/students/plan-2-student-loan">Plan 2 student loan calculator</Link>{" "}
        projects your own balance.
      </p>
      <p>
        The Welsh Government also cancels up to {gbp(WALES_GRANT.cancellation)} of your first Maintenance Loan once you make your first repayment, whether through your pay or a voluntary
        payment. It happens once, and only up to what is left of that first year&rsquo;s loan after the repayment.
      </p>

      <h2>Extra help on top</h2>
      <p>
        Lone parents, some disabled students and others who can claim benefits get a Special Support Grant of up to {gbp(SPECIAL_SUPPORT)} instead of the Learning Grant, without it reducing
        the Maintenance Loan. The Childcare Grant, Parents&rsquo; Learning Allowance, Adult Dependants&rsquo; Grant and Disabled Students&rsquo; Allowance are not repaid either. Students
        from England and Scotland are funded differently: see the <Link href="/uk/students/maintenance-loan">Maintenance Loan calculator</Link>{" "}and the{" "}
        <Link href="/uk/students/saas-funding">SAAS funding calculator</Link>. If everyone in your house is a full-time student, the{" "}
        <Link href="/uk/students/student-council-tax">student council tax checker</Link>{" "}shows how to get the exemption.
      </p>
    </>
  );
}

export default async function WelshFinancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/plan-2-student-loan", "/uk/students/saas-funding", "/uk/students/maintenance-loan", "/uk/students/student-council-tax"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Welsh Student Finance Calculator"
      lead="How your 2026/27 Student Finance Wales support splits between the Welsh Government Learning Grant, which you keep, and the Maintenance Loan, which you repay."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <WalesStudio query={query} />
    </CalcPage>
  );
}
