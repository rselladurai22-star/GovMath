import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DivSalaryStudio from "./DivSalaryStudio";
import { ogFor } from "@/gm/og";
import DivSalaryGuide from "./DivSalaryGuide";

export const metadata: Metadata = {
  title: "Dividend vs Salary Calculator UK 2026/27",
  description:
    "Free director salary and dividend calculator for 2026/27. Compare tax, NI and Corporation Tax to find the most tax-efficient mix for your company.",
  alternates: { canonical: "/business/dividend-vs-salary" },
  openGraph: ogFor("/business/dividend-vs-salary"),
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
  { q: "Can I pay myself only dividends?", a: "Yes, but you lose the Corporation Tax saving on a tax-free salary, and the year does not count for your State Pension unless you pay voluntary NI." },
  { q: "Should I take a salary of £5,000 or £12,570?", a: "Without the Employment Allowance, £12,570 still usually leaves more after tax in 2026/27, despite the employer NI above £5,000, because the salary and NI save Corporation Tax." },
  { q: "Do I need to take all the profit out?", a: "No. Profit left in the company has paid Corporation Tax but no dividend tax. Many directors take only what they need and keep within the basic rate band." },
  { q: "When are dividends taxed?", a: "In the tax year they are paid, through your Self Assessment return, due by 31 January after the year ends." },
  { q: "Does the Employment Allowance apply if my spouse is also a director?", a: "Not if the only people paid are directors and there is just one of them. With two directors on the payroll, the company can usually claim it." },
  { q: "Is it worth paying myself through payroll every month?", a: "Yes for the salary part. A director's salary must go through PAYE, and a regular monthly salary keeps the records simple. Dividends can be paid when profits allow." },
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
