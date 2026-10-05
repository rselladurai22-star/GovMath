import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CarersStudio from "./CarersStudio";
import CarersGuide from "./CarersGuide";

export const metadata: Metadata = {
  title: "Carer's Allowance Earnings Limit Calculator (2026/27)",
  description:
    "Check whether your pay keeps you within the £204 a week Carer's Allowance earnings limit for 2026/27. Applies tax, NI, half of pension contributions and care costs, and shows how many hours you can work.",
  alternates: { canonical: "/benefits/carers-earnings" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/carers-earnings", label: "Carer's Allowance Earnings" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Carer's Allowance earnings limit in 2026/27?", a: "£204 a week after Income Tax, National Insurance, half of your pension contributions and some care costs." },
  { q: "How much is Carer's Allowance in 2026/27?", a: "£86.45 a week, or £4,495.40 a year." },
  { q: "How many hours can I work on Carer's Allowance?", a: "About 16 hours a week at the £12.71 National Living Wage. At higher pay, fewer hours." },
  { q: "What happens if I earn over the limit?", a: "You lose the whole week's Carer's Allowance. There is no taper, so even a small amount over costs £86.45." },
];

export default async function CarersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/attendance-allowance", "/benefits/pip-points", "/benefits/universal-credit", "/benefits/pension-credit", "/tax-and-salary/minimum-wage"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Carer's Allowance Earnings Calculator"
      lead="Check whether your pay keeps you within the £204 earnings limit, and how many hours you can work without losing Carer's Allowance."
      points={["Real deductions", "Hours limit", "Pension and care costs", "Free and private"]}
      guide={<CarersGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not financial advice."
    >
      <CarersStudio query={query} />
    </FlagshipPage>
  );
}
