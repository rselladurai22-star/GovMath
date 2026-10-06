import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SaasStudio from "./SaasStudio";
import SaasGuide from "./SaasGuide";

export const metadata: Metadata = {
  title: "SAAS Funding Calculator 2026/27: Bursary and Student Loan (Scotland)",
  description:
    "See how much SAAS funding you can get in 2026/27: the Young or Independent Students' Bursary and student loan by household income, free tuition in Scotland and Plan 4 repayments.",
  alternates: { canonical: "/students/saas-funding" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/students/saas-funding", label: "SAAS Funding Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much SAAS funding can I get in 2026/27?", a: "Up to £11,400 a year: a £2,000 Young Students' Bursary and a £9,400 loan if household income is £20,999 or less. The minimum is an £8,400 loan." },
  { q: "Is university free in Scotland?", a: "Tuition is free for Scottish students studying a first degree at a Scottish university. SAAS pays the fee. Living costs are not free." },
  { q: "Do I have to repay the Young Students' Bursary?", a: "No. The bursary is a grant. Only the student loan is repaid." },
  { q: "What household income does SAAS use?", a: "Your parents' gross taxable income for the previous tax year if you are a young student, or yours and your partner's if you are independent." },
  { q: "What if my household income is over £34,000?", a: "You get the minimum loan of £8,400 a year and no bursary. You do not need to send income details." },
  { q: "Who is an independent student?", a: "Students aged 25 or over, married, with children, or who have supported themselves for at least 3 years." },
  { q: "How do I repay a SAAS student loan?", a: "It is a Plan 4 loan: 9% of income over £33,795 a year, written off after 30 years." },
  { q: "Can I get SAAS funding to study in England?", a: "Yes. You get the same bursary and loan, plus a Tuition Fee Loan of up to £9,790 a year, because tuition is not free outside Scotland." },
  { q: "When should I apply to SAAS?", a: "From April, and by 30 June for funding to be ready at the start of term. You must reapply every year." },
  { q: "Can I get paid over 12 months?", a: "Yes. You can choose term-time payments or spread them over 12 months." },
  { q: "Is SAAS funding paid monthly?", a: "Yes. You can choose monthly payments during term or spread over 12 months." },
  { q: "Does the bursary depend on how much loan I take?", a: "No. The bursary is paid at the full amount for your income band, whatever loan you take." },
  { q: "What if my parents are separated?", a: "SAAS usually counts the income of the parent you live with and their partner, not the other parent." },
];

export default async function SaasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-4-student-loan", "/students/student-budget", "/students/degree-cost", "/students/welsh-student-finance", "/students/maintenance-loan", "/students/student-council-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Scotland, 2026/27"
      title="SAAS Funding Calculator"
      lead="See the bursary and student loan you can get from SAAS in 2026/27, how tuition is paid, and what you would repay."
      points={["Young and independent students", "Free tuition in Scotland", "Plan 4 repayments", "Free and private"]}
      guide={<SaasGuide />}
      faqs={FAQS}
      related={related}
      note="SAAS 2026/27 figures for full-time undergraduates. SAAS decides your award from your application."
    >
      <SaasStudio query={query} />
    </FlagshipPage>
  );
}
