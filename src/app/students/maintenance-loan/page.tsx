import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MaintenanceStudio from "./MaintenanceStudio";
import MaintenanceGuide from "./MaintenanceGuide";

export const metadata: Metadata = {
  title: "Student Maintenance Loan Calculator 2026/27 (Student Finance England)",
  description:
    "Work out your 2026/27 maintenance loan from household income and where you will live: up to £10,830 away from home, £14,135 in London or £9,118 living with parents.",
  alternates: { canonical: "/students/maintenance-loan" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students & Graduates" },
  { href: "/students/maintenance-loan", label: "Maintenance Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the maximum maintenance loan for 2026/27?", a: "£10,830 living away from home outside London, £14,135 in London and £9,118 living with parents." },
  { q: "What household income gets the full loan?", a: "£25,000 or less. Above that, the loan falls until it reaches the minimum." },
  { q: "When is the maintenance loan paid?", a: "In three instalments, one at the start of each term, straight into your bank account once you have registered at your university or college." },
  { q: "Do I have to pay the maintenance loan back?", a: "Yes. It is added to your student loan balance. On Plan 5 you repay 9% of your income above £25,000 a year, and anything left is written off after 40 years." },
  { q: "What is the minimum maintenance loan?", a: "£5,048 away from home outside London, £7,039 in London and £4,013 living with parents." },
  { q: "How much will I get with £40,000 household income?", a: "About £8,512 a year living away from home outside London." },
];

export default async function MaintenancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-5-student-loan", "/students/student-council-tax", "/students/plan-2-student-loan"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student finance"
      title="Maintenance Loan Calculator"
      lead="Work out your 2026/27 maintenance loan from household income and where you will live."
      points={["2026/27 amounts", "Household income test", "Total borrowing", "Free and private"]}
      guide={<MaintenanceGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate only. Student Finance England confirms your amount."
    >
      <MaintenanceStudio query={query} />
    </FlagshipPage>
  );
}
