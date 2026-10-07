import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EmployerCostStudio from "./EmployerCostStudio";
import { ogFor } from "@/gm/og";
import EmployerCostGuide from "./EmployerCostGuide";

export const metadata: Metadata = {
  title: "Employer NI Calculator UK 2026/27",
  description:
    "Free employer cost calculator for 2026/27. See employer NI at 15%, the Employment Allowance, pension and the true cost of hiring someone.",
  alternates: { canonical: "/business/employer-ni-costs" },
  openGraph: ogFor("/business/employer-ni-costs"),
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
  { q: "Is employer NI deducted from the employee's pay?", a: "No. Employer NI is a cost to the business on top of pay. The employee pays their own NI separately." },
  { q: "Do I pay employer NI on a director's salary?", a: "Yes, on the same basis, though directors' NI is worked out on an annual earnings period." },
  { q: "Is employer NI an allowable expense?", a: "Yes. It reduces your taxable profit, whether you are a sole trader or a company." },
  { q: "Do I pay employer NI on pension contributions?", a: "No. Employer pension contributions are free of NI, which is why salary sacrifice saves money." },
  { q: "What about part-time staff?", a: "The same rules apply to what they earn. Someone on £8,000 a year costs £450 in employer NI, because pay above £5,000 is charged at 15%." },
  { q: "Do I pay employer NI on expenses I reimburse?", a: "Not on genuine business expenses, such as mileage at the approved rates or travel costs, as long as they are paid back at cost." },
  { q: "Does employer NI apply to statutory pay such as maternity pay?", a: "Yes. Statutory Maternity, Paternity and Sick Pay are earnings, so employer NI applies above the threshold. Small employers can reclaim most statutory parental pay from HMRC." },
  { q: "How do I claim the Employment Allowance?", a: "Through your payroll software, by marking it on an Employer Payment Summary. You claim it once per tax year, and it is used up against your employer NI each month." },
  { q: "Can I pass the cost of employer NI on to my employees?", a: "Not by deducting it from their pay: employer NI is a cost the business must bear. In practice, higher employer costs can affect pay rises and hiring, but each employee's contract sets their pay, and any reduction needs their agreement." },
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
