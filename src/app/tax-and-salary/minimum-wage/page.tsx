import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MinWageStudio from "./MinWageStudio";
import MinWageGuide from "./MinWageGuide";

export const metadata: Metadata = {
  title: "Minimum Wage Checker (UK, April 2026 rates)",
  description:
    "Check whether you are paid the National Living Wage or minimum wage for your age from April 2026, counting unpaid time, work costs and accommodation, and estimate back pay owed.",
  alternates: { canonical: "/tax-and-salary/minimum-wage" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/minimum-wage", label: "Minimum Wage" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the minimum wage from April 2026?", a: "£12.71 an hour for workers aged 21 and over (the National Living Wage), £10.85 for 18 to 20 year olds, and £8.00 for 16 and 17 year olds and apprentices." },
  { q: "Can unpaid time take me below the minimum wage?", a: "Yes. Required work you are not paid for, such as opening up, security checks or travel between jobs, counts as working time. Your pay divided by all those hours must still meet the minimum." },
  { q: "Can my employer charge me for my uniform?", a: "They can, but if the cost takes your pay below the minimum wage for the hours you work, they are breaking the law. Work costs count as a deduction from pay for minimum wage purposes." },
  { q: "Do tips count towards the minimum wage?", a: "No. Tips, gratuities and service charges must be paid on top of at least the minimum wage." },
  { q: "What can I do if I am underpaid?", a: "Raise it with your employer, get free advice from Acas on 0300 123 1100, or complain to HMRC, which enforces the minimum wage. Employers must pay arrears at today's rates and can be fined." },
];

export default async function MinimumWagePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/hourly-to-salary", "/tax-and-salary/salary-calculator", "/tax-and-salary/overtime", "/tax-and-salary/holiday-entitlement", "/tax-and-salary/statutory-sick-pay", "/benefits/universal-credit"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="April 2026 rates"
      title="Minimum Wage Checker"
      lead="Check your pay against the legal minimum for your age, counting unpaid time, work costs and accommodation."
      points={["April 2026 rates", "Unpaid time and deductions", "Back pay estimate", "Free and private"]}
      guide={<MinWageGuide />}
      faqs={FAQS}
      related={related}
      note="A simplified check using rates from 1 April 2026. HMRC assesses pay over each pay reference period. Not legal advice: contact Acas for help with your situation."
    >
      <MinWageStudio query={query} />
    </FlagshipPage>
  );
}
