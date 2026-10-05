import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SSPStudio from "./SSPStudio";
import SSPGuide from "./SSPGuide";

export const metadata: Metadata = {
  title: "Statutory Sick Pay Calculator (UK, 2026/27)",
  description:
    "Work out Statutory Sick Pay under the April 2026 rules: paid from day one, the lower of £123.25 a week or 80% of earnings, with daily rates, linked spells and company sick pay.",
  alternates: { canonical: "/tax-and-salary/statutory-sick-pay" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/statutory-sick-pay", label: "Statutory Sick Pay" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Statutory Sick Pay in 2026/27?", a: "The lower of £123.25 a week or 80% of your average weekly earnings, from 6 April 2026. For a five-day week that is up to £24.65 a day." },
  { q: "Is SSP paid from the first day?", a: "Yes. Since 6 April 2026 there are no unpaid waiting days. SSP is paid from the first day you are off sick." },
  { q: "Do I need to earn a minimum amount to get SSP?", a: "No. The Lower Earnings Limit test was removed in April 2026. Low earners get 80% of their average weekly earnings instead." },
  { q: "How long is SSP paid for?", a: "Up to 28 weeks in a period of sickness. Spells less than 8 weeks apart are linked and share the same 28 weeks." },
  { q: "Is SSP taxed?", a: "Yes. SSP is paid through payroll and Income Tax and National Insurance are deducted as normal." },
];

export default async function SSPPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/holiday-entitlement", "/benefits/universal-credit", "/benefits/maternity-pay", "/tax-and-salary/minimum-wage", "/benefits/pip-points"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="April 2026 rules"
      title="Statutory Sick Pay Calculator"
      lead="Your sick pay under the April 2026 rules, from the first day off, with daily rates and company sick pay."
      points={["Paid from day one", "80% rule for low earners", "Company sick pay compared", "Free and private"]}
      guide={<SSPGuide />}
      faqs={FAQS}
      related={related}
      note="Statutory minimum from 6 April 2026. Your employer may pay more under your contract. Not legal advice."
    >
      <SSPStudio query={query} />
    </FlagshipPage>
  );
}
