import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EmployerCostStudio from "./EmployerCostStudio";
import EmployerCostGuide from "./EmployerCostGuide";

export const metadata: Metadata = {
  title: "Employer NI Calculator: True Cost of an Employee (2026/27)",
  description:
    "Work out employer National Insurance at 15% above £5,000, workplace pension and the full cost of an employee or team, with the Employment Allowance and salary sacrifice.",
  alternates: { canonical: "/business/employer-ni-costs" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/employer-ni-costs", label: "Employer NI" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the employer NI rate for 2026/27?", a: "15% on each employee's earnings above £5,000 a year (£417 a month)." },
  { q: "How much does a £30,000 employee cost?", a: "About £34,463 a year: £3,750 employer NI and £712.80 minimum pension on top of the salary." },
  { q: "What is the Employment Allowance?", a: "Up to £10,500 a year off your employer NI bill. Most employers can claim it, but not a company whose only employee is a single director." },
  { q: "Is there employer NI on under-21s?", a: "No employer NI on earnings up to £50,270 for employees under 21 or apprentices under 25." },
  { q: "Does salary sacrifice save employer NI?", a: "Yes. Pay sacrificed into a pension is not earnings, so you save 15% employer NI on it and the employee saves their NI too." },
];

export default async function EmployerCostPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/dividend-vs-salary", "/business/corporation-tax", "/tax-and-salary/national-insurance", "/tax-and-salary/salary-calculator", "/tax-and-salary/minimum-wage", "/business/break-even"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 employer rates"
      title="Employer NI Calculator"
      lead="See the true cost of an employee or a team: employer National Insurance, pension and the reliefs that cut the bill."
      points={["15% above £5,000", "Employment Allowance", "Pension and sacrifice", "Free and private"]}
      guide={<EmployerCostGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 employer rates. Not tax advice."
    >
      <EmployerCostStudio query={query} />
    </FlagshipPage>
  );
}
