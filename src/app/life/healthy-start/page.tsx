import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HealthyStartStudio from "./HealthyStartStudio";
import HealthyStartGuide from "./HealthyStartGuide";

export const metadata: Metadata = {
  title: "Healthy Start Calculator (2026 Rates)",
  description:
    "Check whether you qualify for NHS Healthy Start and how much you would get from April 2026: £4.65 a week in pregnancy, £9.30 for babies under 1 and £4.65 for children aged 1 to 3, plus free vitamins.",
  alternates: { canonical: "/life/healthy-start" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/healthy-start", label: "Healthy Start" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Healthy Start in 2026?", a: "£4.65 a week from 10 weeks of pregnancy, £9.30 a week for each child under 1 and £4.65 a week for each child aged 1 to 3." },
  { q: "Who can get Healthy Start?", a: "People at least 10 weeks pregnant or with a child under 4 who get certain benefits, such as Universal Credit with family take-home pay of £408 a month or less. Pregnant under-18s qualify whatever their income." },
  { q: "What can I buy with a Healthy Start card?", a: "Plain cow's milk, fresh, frozen or tinned fruit and vegetables, pulses and first infant formula." },
  { q: "Are Healthy Start vitamins free?", a: "Yes, for eligible families, for pregnancy and for children up to 4." },
];

export default async function HealthyStartPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/child-benefit", "/benefits/maternity-pay", "/life/nhs-prescription-saver", "/benefits/free-childcare-hours"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="April 2026 rates"
      title="Healthy Start Calculator"
      lead="Check whether you qualify for Healthy Start, how much goes on your card, and what it adds up to over the next year."
      points={["Eligibility check", "Birthdays and due dates", "12-month total", "Free and private"]}
      guide={<HealthyStartGuide />}
      faqs={FAQS}
      related={related}
      note="Healthy Start rates from April 2026. Not a decision on your claim."
    >
      <HealthyStartStudio query={query} />
    </FlagshipPage>
  );
}
