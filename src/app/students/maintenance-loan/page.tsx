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
  { q: "Is the final year different?", a: "Yes. The final year is shorter, so the loan is a little lower. The calculator shows the amount for other years." },
  { q: "Do my part-time earnings reduce the loan?", a: "Usually not. Your own earnings during the course are not normally counted." },
  { q: "Can I borrow less than I am offered?", a: "Yes. You can choose a smaller amount, and change it later in the year." },
  { q: "What if my parents will not give their income details?", a: "Contact Student Finance England. You can usually get the minimum loan without their details, and in some cases, such as estrangement, be assessed as independent." },
  { q: "Can I get more if my course is longer than 30 weeks?", a: "Yes. A Long Courses Loan adds an amount for each extra week of attendance, for example on some medical and accelerated courses." },
  { q: "Do I pay the maintenance loan back separately?", a: "No. It joins your tuition fee loan in one Plan 5 balance, repaid at 9% of income above £25,000." },
  { q: "Is there a maintenance grant?", a: "Not for most students starting in 2026/27 in England. The government has announced plans to bring back maintenance grants for some students later in the decade; check GOV.UK for the latest." },
  { q: "Will I get the same amount every year?", a: "Not necessarily. Household income is reassessed each year, and the final year is lower because it is shorter." },
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
