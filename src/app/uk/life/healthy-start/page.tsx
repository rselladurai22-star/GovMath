import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HealthyStartStudio from "./HealthyStartStudio";
import { ogFor } from "@/gm/og";
import HealthyStartGuide from "./HealthyStartGuide";

export const metadata: Metadata = {
  title: "Healthy Start Calculator 2026",
  description:
    "Free Healthy Start checker. See if you qualify for the NHS Healthy Start card and how much you get each week for fruit, vegetables, milk and formula.",
  alternates: { canonical: "/uk/life/healthy-start" },
  openGraph: ogFor("/uk/life/healthy-start"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/healthy-start", label: "Healthy Start" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Healthy Start in 2026?", a: "£4.65 a week from 10 weeks of pregnancy, £9.30 a week for each child under 1 and £4.65 a week for each child aged 1 to 3." },
  { q: "Who can get Healthy Start?", a: "People at least 10 weeks pregnant or with a child under 4 who get certain benefits, such as Universal Credit with family take-home pay of £408 a month or less. Pregnant under-18s qualify whatever their income." },
  { q: "What can I buy with a Healthy Start card?", a: "Plain cow's milk, fresh, frozen or tinned fruit and vegetables, pulses and first infant formula." },
  { q: "Are Healthy Start vitamins free?", a: "Yes, for eligible families, for pregnancy and for children up to 4." },
  { q: "Can I get Healthy Start if I work?", a: "Yes, if you get Universal Credit and your family's take-home pay is £408 a month or less." },
  { q: "Does Healthy Start affect my other benefits?", a: "No. It is not counted as income for other benefits." },
  { q: "Can I use the card in any shop?", a: "In most shops that take Mastercard, but only for eligible foods." },
  { q: "Is Healthy Start backdated?", a: "Only in limited cases, so apply as soon as you qualify." },
  { q: "What happens to money left on the card?", a: "It stays on the card for you to use, but unused money can be removed after a long period of inactivity." },
  { q: "Can a dad or other carer apply?", a: "Yes. The person claiming the qualifying benefit for the child can apply, whether they are a mum, dad, grandparent or other carer." },
  { q: "Do I need to reapply each year?", a: "No. Payments continue while you are eligible, but you must report changes such as a new baby or a change in benefits." },
];

export default async function HealthyStartPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/child-benefit", "/uk/benefits/maternity-pay", "/uk/life/nhs-prescription-saver", "/uk/benefits/free-childcare-hours"].includes(c.href));
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
