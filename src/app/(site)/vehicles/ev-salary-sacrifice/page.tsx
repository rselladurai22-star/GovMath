import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EvSalSacStudio from "./EvSalSacStudio";
import EvSalSacGuide from "./EvSalSacGuide";

export const metadata: Metadata = {
  title: "EV Salary Sacrifice Calculator UK 2026/27",
  description:
    "See what an electric car through salary sacrifice really costs after income tax, National Insurance and 4% company car tax, and how much you save compared with leasing privately.",
  alternates: { canonical: "/vehicles/ev-salary-sacrifice" },
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
