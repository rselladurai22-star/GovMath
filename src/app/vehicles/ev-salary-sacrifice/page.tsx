import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EvSalSacStudio from "./EvSalSacStudio";
import { ogFor } from "@/gm/og";
import EvSalSacGuide from "./EvSalSacGuide";

export const metadata: Metadata = {
  title: "EV Salary Sacrifice Calculator UK 2026/27",
  description:
    "Free electric car salary sacrifice calculator for 2026/27. See the real monthly cost after tax and NI savings, with benefit in kind included.",
  alternates: { canonical: "/vehicles/ev-salary-sacrifice" },
  openGraph: ogFor("/vehicles/ev-salary-sacrifice"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/ev-salary-sacrifice", label: "EV Salary Sacrifice" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much can I save with EV salary sacrifice?", a: "Typically 20% to 45% compared with leasing privately. On £45,000, a £450-a-month sacrifice for a £40,000 car costs about £351 a month in take-home pay." },
  { q: "Do I pay tax on a salary sacrifice electric car?", a: "Yes, company car tax at 4% of the list price in 2026/27, rising to 9% by 2029/30, taxed at your income tax rate." },
  { q: "Does salary sacrifice affect my pension?", a: "It can if your pension contributions are based on your salary after the sacrifice. Ask your employer which salary they use." },
  { q: "Why is salary sacrifice not worth it for petrol cars?", a: "Cars over 75 g/km are taxed on the salary given up under the optional remuneration rules, so there is no saving." },
  { q: "Can I get a plug-in hybrid through salary sacrifice?", a: "Yes. Plug-in hybrids at 75 g/km or less are also exempt from the optional remuneration rules, but they are taxed at 4% to 16% depending on electric range in 2026/27, and 18% from April 2028, so the saving is usually smaller." },
  { q: "Does my employer save money too?", a: "Yes. They save employer National Insurance at 15% on the salary sacrificed, but pay 15% on the car benefit." },
  { q: "Can I buy the car at the end?", a: "Not usually. The car goes back at the end of the lease, though some schemes offer a purchase option." },
  { q: "Does salary sacrifice affect my tax code?", a: "Your salary is lower, so less tax is taken through payroll. The company car benefit is either payrolled or collected through your tax code." },
  { q: "What happens at the end of the lease?", a: "The car is inspected and collected. You can usually choose a new car through the scheme, and your salary returns to normal if you do not." },
  { q: "Is the saving guaranteed?", a: "The tax and National Insurance rates and company car percentages can change. The rates for electric cars up to 2029/30 have already been set." },
  { q: "Can part-time workers join a scheme?", a: "Usually yes, as long as your pay after the sacrifice stays above the National Living Wage for the hours you work. Schemes check this when you apply." },
  { q: "Is my car insured if I change jobs?", a: "Cover usually continues until the car is returned or the lease is transferred. Check the early termination terms with the provider." },
  { q: "Does the car count towards my income for mortgage applications?", a: "Lenders usually look at your salary after the sacrifice, and some also count the monthly cost. Tell your lender about the scheme." },
];

export default async function EvSalSacPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/benefit-in-kind", "/vehicles/petrol-vs-ev-cost", "/vehicles/car-tax-ved", "/tax-and-salary/salary-sacrifice", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Electric cars"
      title="EV Salary Sacrifice Calculator"
      lead="See what an electric car through salary sacrifice really costs you, and how it compares with leasing privately."
      points={["Tax and NI saving", "4% company car tax", "Future rates", "Free and private"]}
      guide={<EvSalSacGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate only. Use your scheme's quote before you sign."
    >
      <EvSalSacStudio query={query} />
    </FlagshipPage>
  );
}
