import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ProRataStudio from "./ProRataStudio";
import ProRataGuide from "./ProRataGuide";

export const metadata: Metadata = {
  title: "Pro Rata Salary Calculator (UK, 2026/27)",
  description:
    "Work out your pro-rata salary, take-home pay and holiday for part-time or part-year work, by hours or days a week. 2026/27 tax rates.",
  alternates: { canonical: "/tax-and-salary/pro-rata" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/pro-rata", label: "Pro Rata" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out a pro-rata salary?", a: "Multiply the full-time salary by your hours and divide by the full-time hours. For example, £40,000 pro rata for 30 hours where full time is 37.5 hours is £40,000 × 30 ÷ 37.5 = £32,000 a year." },
  { q: "What does FTE mean?", a: "Full-time equivalent: your hours as a share of full time. 30 hours out of 37.5 is 0.8 FTE, or 80%." },
  { q: "How much holiday do part-time workers get?", a: "The same 5.6 weeks a year as full-timers, made up of your own working days. On three days a week the statutory minimum is 16.8 days, including bank holidays." },
  { q: "Do part-time workers pay less tax?", a: "As a share of pay, usually yes. The £12,570 tax-free allowance is the same whatever you earn, so it covers a bigger share of a smaller salary. Working 80% of full time typically leaves you with around 82% of the full-time take-home." },
  { q: "What if I start a job part-way through the year?", a: "You only earn for the months you work, but you still have the whole year's tax-free allowance. If you had no other income that year, you may be due a tax refund after 5 April." },
  { q: "Is a pro-rata salary the same as an hourly rate?", a: "It works out at the same hourly rate as the full-time job. If a job pays £40,000 for 37.5 hours, the hourly rate is £20.51 whether you work 15 hours or 37.5." },
  { q: "Do part-time workers get bank holidays?", a: "You are entitled to 5.6 weeks of paid holiday, which can include bank holidays. Most employers pro-rate bank holidays into your total entitlement. If your contract only gives bank holidays when they fall on your working days, check that your total still meets the statutory minimum." },
  { q: "Will going part-time affect my pension?", a: "Contributions are usually a percentage of your actual pay, so they fall in line with your salary. In a final salary or career average scheme, the pension you build up each year is also based on your actual pay." },
  { q: "Can my employer refuse a request to go part-time?", a: "Yes, but only for one of eight business reasons set out in law, such as extra costs or an inability to reorganise work. They must consult you before refusing and reply within two months." },
];

export default async function ProRataPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/hourly-to-salary", "/tax-and-salary/holiday-entitlement", "/tax-and-salary/overtime", "/benefits/universal-credit", "/tax-and-salary/tax-code-decoder"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Pro Rata Salary Calculator"
      lead="Turn a full-time salary into your part-time pay, take-home and holiday, by hours or days."
      points={["Hours or days", "Pro-rata holiday", "Part-year starters", "Free and private"]}
      guide={<ProRataGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for the 2026/27 tax year, assuming a standard tax code. GovMath is not affiliated with HMRC. Check your contract for your exact hours and holiday."
    >
      <ProRataStudio query={query} />
    </FlagshipPage>
  );
}
