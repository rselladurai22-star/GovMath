import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FreeHoursStudio from "./FreeHoursStudio";
import { ogFor } from "@/gm/og";
import FreeHoursGuide from "./FreeHoursGuide";

export const metadata: Metadata = {
  title: "Free Childcare Hours Calculator 2026/27",
  description:
    "Free calculator for England's funded childcare hours from 9 months to school age. See what your hours are worth at your nursery's rate and what you still pay.",
  alternates: { canonical: "/benefits/free-childcare-hours" },
  openGraph: ogFor("/benefits/free-childcare-hours"),
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
  { q: "Can I use the hours with a childminder?", a: "Yes, if the childminder is registered with Ofsted or a childminder agency and offers funded places." },
  { q: "Can I split the hours between two providers?", a: "Usually yes, though there may be limits on how many sessions a day count. Check with both providers." },
  { q: "Do I lose the hours if I go on maternity leave with a new baby?", a: "No. Parents on statutory leave still count as working for the older child's hours." },
  { q: "Do the hours count as income for benefits?", a: "No. Funded hours are not paid to you, so they do not affect your other benefits." },
  { q: "What if my income changes during the year?", a: "The test is about what you expect to earn over the next three months. Reconfirm honestly each time; if you stop qualifying, a grace period usually applies." },
  { q: "Do both parents have to work if we are separated?", a: "No. The test applies to the parents in the child's household. A single parent only needs to meet it themselves." },
  { q: "Can I use funded hours at a nursery in another council area?", a: "Yes. Funding follows the child, so you can use a provider near your work rather than your home, as long as it offers funded places." },
  { q: "What if my nursery is full?", a: "Your council must help you find a funded place. Contact its family information service." },
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
