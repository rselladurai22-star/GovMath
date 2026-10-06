import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import WalesStudio from "./WalesStudio";
import WalesGuide from "./WalesGuide";

export const metadata: Metadata = {
  title: "Student Finance Wales Calculator 2026/27: Grant and Loan",
  description:
    "Work out your Welsh Government Learning Grant and Maintenance Loan for 2026/27 from household income: £12,590 a year away from home, £10,685 at home and £15,720 in London.",
  alternates: { canonical: "/students/welsh-student-finance" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/students/welsh-student-finance", label: "Welsh Student Finance Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much student finance do Welsh students get in 2026/27?", a: "£12,590 a year living away from home outside London, £10,685 living with parents and £15,720 in London, split between a grant and a loan." },
  { q: "How much of it is a grant?", a: "It depends on household income: up to £8,260 away from home at £18,370 or less, falling to £1,020 at £59,200 or more." },
  { q: "Do I repay the Welsh Government Learning Grant?", a: "No. Only the Maintenance Loan and Tuition Fee Loan are repaid." },
  { q: "Does household income change the total?", a: "No. Everyone gets the same total; higher income means less grant and more loan." },
  { q: "What tuition fee loan can Welsh students get?", a: "Up to £9,790 a year in 2026/27, paid straight to the university, wherever in the UK you study." },
  { q: "What loan plan are Welsh students on?", a: "Plan 2: 9% of income over £29,385, written off after 30 years." },
  { q: "What is the £1,500 loan cancellation?", a: "Welsh students can have up to £1,500 of their Maintenance Loan written off when they make their first repayment." },
  { q: "Which year's income is used?", a: "For courses starting in 2026/27, household taxable income in the 2024/25 tax year." },
  { q: "Can I get more if I have children?", a: "Yes. You may get a Special Support Grant, Childcare Grant and Parents' Learning Allowance." },
  { q: "Does it matter if I study in England?", a: "No. Welsh students get the same support wherever they study in the UK." },
  { q: "Can I choose to take less loan and still get the full grant?", a: "Yes. The grant is paid whatever loan you take, so you can ask for a smaller Maintenance Loan." },
  { q: "When is Welsh student finance paid?", a: "In three instalments, at the start of each term, once your university confirms you have enrolled." },
  { q: "Do Welsh students studying in Scotland get the same support?", a: "Yes, the same grant and loan wherever you study in the UK, though Scottish degrees often last 4 years." },
  { q: "Is the Welsh Learning Grant taxable or counted for benefits?", a: "It is not taxable. Student income is treated differently for benefits, so check with the DWP if you claim." },
];

export default async function WelshFinancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-2-student-loan", "/students/student-budget", "/students/degree-cost", "/students/saas-funding", "/students/maintenance-loan", "/students/student-council-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Wales, 2026/27"
      title="Welsh Student Finance Calculator"
      lead="Work out your Welsh Government Learning Grant and Maintenance Loan from household income, and what you will repay."
      points={["Grant and loan split", "Home, away or London", "Plan 2 repayments", "Free and private"]}
      guide={<WalesGuide />}
      faqs={FAQS}
      related={related}
      note="Student Finance Wales 2026/27 figures for full-time undergraduates. Student Finance Wales decides your award."
    >
      <WalesStudio query={query} />
    </FlagshipPage>
  );
}
