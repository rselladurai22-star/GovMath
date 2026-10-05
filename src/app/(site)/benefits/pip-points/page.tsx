import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PipStudio from "./PipStudio";
import PipGuide from "./PipGuide";

export const metadata: Metadata = {
  title: "PIP Points Calculator (2026/27 Rates)",
  description:
    "Score yourself against all 12 official PIP activities and descriptors. See your daily living and mobility points, the rate they point to, and what 2026/27 PIP is worth a week and a year.",
  alternates: { canonical: "/benefits/pip-points" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/pip-points", label: "PIP Points" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How many points do I need for PIP?", a: "8 points in a component for the standard rate and 12 for the enhanced rate. Daily living and mobility are scored separately." },
  { q: "How much is PIP in 2026/27?", a: "Daily living is £76.70 or £114.60 a week. Mobility is £30.30 or £80.00 a week. The most you can get is £194.60 a week." },
  { q: "Is PIP means-tested?", a: "No. Your income, savings and whether you work make no difference." },
  { q: "Which descriptor should I choose?", a: "The one that applies on more than half of days, judged on whether you can do the activity safely, well, repeatedly and in a reasonable time." },
];

export default async function PipPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/attendance-allowance", "/benefits/carers-earnings", "/benefits/universal-credit", "/benefits/benefit-cap", "/vehicles/car-tax-ved"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="PIP Points Calculator"
      lead="Check your Personal Independence Payment points against all 12 official activities, and see the rate and amount they point to."
      points={["All 12 activities", "Official descriptors", "Daily living and mobility", "Free and private"]}
      guide={<PipGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 PIP rates. A self-check, not a decision."
    >
      <PipStudio query={query} />
    </FlagshipPage>
  );
}
