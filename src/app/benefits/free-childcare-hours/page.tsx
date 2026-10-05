import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FreeHoursStudio from "./FreeHoursStudio";
import FreeHoursGuide from "./FreeHoursGuide";

export const metadata: Metadata = {
  title: "Free Childcare Hours Calculator (England, 30 Hours)",
  description:
    "Check how many funded childcare hours you can get in England, from 9 months to school age, what they are worth at your nursery's rate and what you still pay.",
  alternates: { canonical: "/benefits/free-childcare-hours" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/free-childcare-hours", label: "Free Childcare Hours" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Who gets 30 hours free childcare?", a: "Working parents in England with children from 9 months to school age, where each parent earns at least £203.36 a week (age 21 and over) and has adjusted net income of £100,000 or less." },
  { q: "Do all 3-year-olds get free childcare?", a: "Yes. Every 3 and 4-year-old in England gets 15 hours a week, 570 hours a year, whatever their parents' work." },
  { q: "Are the 30 hours really free?", a: "The hours themselves are, but providers can charge for meals, consumables and extra hours." },
  { q: "Can I stretch the hours over the year?", a: "Yes, if your provider offers it. The 1,140 hours can be spread over more than 38 weeks, giving fewer hours each week." },
  { q: "Can I use Tax-Free Childcare as well?", a: "Yes. Tax-Free Childcare can pay for hours and charges not covered by the funded hours." },
];

export default async function FreeHoursPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/tax-free-childcare", "/benefits/child-benefit", "/benefits/universal-credit", "/benefits/maternity-pay", "/benefits/shared-parental-leave", "/benefits/high-income-child-benefit"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="England 2026/27"
      title="Free Childcare Hours Calculator"
      lead="See how many funded childcare hours your child can get, what they are worth, and what is left to pay."
      points={["From 9 months", "Stretched or term time", "With Tax-Free Childcare", "Free and private"]}
      guide={<FreeHoursGuide />}
      faqs={FAQS}
      related={related}
      note="England, 2026/27. Not financial advice."
    >
      <FreeHoursStudio query={query} />
    </FlagshipPage>
  );
}
