import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DegreeStudio from "./DegreeStudio";
import DegreeGuide from "./DegreeGuide";

export const metadata: Metadata = {
  title: "Cost of a Degree Calculator UK 2026: Fees, Loans and What You Repay",
  description:
    "Add up the full cost of a degree in England: £9,790 tuition fees, maintenance loans, interest while studying, and what you would repay on a Plan 5 loan over 40 years.",
  alternates: { canonical: "/students/degree-cost" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/students/degree-cost", label: "Cost of a Degree Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does a degree cost in England?", a: "Tuition fees are £9,790 a year in 2026/27, about £30,000 for three years. With maintenance loans, many students borrow £45,000 to £65,000." },
  { q: "How much will I owe when I graduate?", a: "What you borrowed plus interest at RPI while you study. A student borrowing £63,734 over three years would owe about £67,600 at 3% RPI." },
  { q: "How much will I actually repay?", a: "9% of your income over £25,000 for up to 40 years. On a £28,000 starting salary rising 4.5% a year, that is about £100,000 in total." },
  { q: "Does borrowing more mean repaying more?", a: "Often not. Most graduates repay the same amount whatever they borrowed, because repayments depend on income, and the rest is written off." },
  { q: "What interest is charged on Plan 5 loans?", a: "RPI only: 4.1% from September 2026. There is no extra interest while you study or on higher earnings." },
  { q: "When does the loan get written off?", a: "40 years after the April you were first due to repay." },
  { q: "Do my parents have to pay anything?", a: "The maintenance loan is reduced if household income is over £25,000, on the assumption parents help, but there is no legal duty." },
  { q: "Are tuition fees going up?", a: "The cap rose to £9,790 in 2026/27, and the government plans to raise it with inflation in future years." },
  { q: "Is a degree apprenticeship cheaper?", a: "Usually. Your employer and the government pay the fees, and you earn a wage, so you finish without a student loan." },
  { q: "Does the calculator cover Scotland and Wales?", a: "It uses Student Finance England rules. Use our SAAS and Welsh student finance calculators for those nations." },
  { q: "Can I pay off my student loan early?", a: "Yes, at any time and without a penalty. It only makes sense if you are likely to clear the loan before it is written off." },
  { q: "Do I repay my student loan if I move abroad?", a: "Yes. You repay the Student Loans Company directly, at a threshold set for your country, and must tell them if you leave the UK for more than 3 months." },
];

export default async function DegreeCostPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-5-student-loan", "/students/maintenance-loan", "/students/student-budget", "/students/saas-funding", "/students/welsh-student-finance", "/students/plan-2-student-loan"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 figures"
      title="Cost of a Degree Calculator"
      lead="Add up what a degree costs in fees and living costs, what you will owe when you graduate, and what you are likely to repay."
      points={["Tuition and maintenance", "Interest while studying", "Lifetime repayments", "Free and private"]}
      guide={<DegreeGuide />}
      faqs={FAQS}
      related={related}
      note="Projections depend on assumptions about inflation, fees and pay. Treat them as a guide, not a forecast."
    >
      <DegreeStudio query={query} />
    </FlagshipPage>
  );
}
