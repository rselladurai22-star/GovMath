import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DivSalaryStudio from "./DivSalaryStudio";
import DivSalaryGuide from "./DivSalaryGuide";

export const metadata: Metadata = {
  title: "Dividend vs Salary Calculator for Directors (2026/27)",
  description:
    "Find the most tax-efficient salary and dividend split for a company director in 2026/27, with the Employment Allowance, pension contributions and a sole trader comparison.",
  alternates: { canonical: "/business/dividend-vs-salary" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/dividend-vs-salary", label: "Dividend vs Salary" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the best director's salary for 2026/27?", a: "For most single-director companies, £12,570 with the rest as dividends. If the company can claim the Employment Allowance, a higher salary is often better." },
  { q: "What are the dividend tax rates for 2026/27?", a: "10.75% in the basic rate band, 35.75% in the higher rate band and 39.35% in the additional rate band, after a £500 allowance." },
  { q: "Does a £12,570 salary cost employer National Insurance?", a: "Yes, 15% on the £7,570 above £5,000, which is £1,135.50, unless the Employment Allowance covers it. The salary and NI both reduce Corporation Tax." },
  { q: "What salary do I need for a State Pension year?", a: "At least the Lower Earnings Limit, £6,708 for 2026/27. No NI is paid on a salary between that and £12,570, but the year still counts." },
  { q: "Is a limited company better than being a sole trader?", a: "Not always. In 2026/27, if all profit is paid out, a sole trader often keeps more. The company route helps most when profit is left in the company or paid into a pension." },
];

export default async function DivSalaryPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/corporation-tax", "/business/employer-ni-costs", "/business/sole-trader-tax", "/investing/dividend-tax", "/business/payment-on-account", "/investing/pension-tax-relief"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Dividend vs Salary Calculator"
      lead="Find the salary and dividend split that leaves you the most from your company's profit, after every layer of tax."
      points={["Best salary found for you", "Employment Allowance", "Sole trader comparison", "Free and private"]}
      guide={<DivSalaryGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 tax rules, single director and shareholder. Not tax advice."
    >
      <DivSalaryStudio query={query} />
    </FlagshipPage>
  );
}
