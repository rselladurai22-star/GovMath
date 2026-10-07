import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PipStudio from "./PipStudio";
import { ogFor } from "@/gm/og";
import PipGuide from "./PipGuide";

export const metadata: Metadata = {
  title: "PIP Points Calculator 2026/27",
  description:
    "Free PIP points calculator for all 12 activities. See if your points reach the standard or enhanced rate for daily living and mobility, and the 2026/27 amount.",
  alternates: { canonical: "/uk/benefits/pip-points" },
  openGraph: ogFor("/uk/benefits/pip-points"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/pip-points", label: "PIP Points" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How many points do I need for PIP?", a: "8 points in a component for the standard rate and 12 for the enhanced rate. Daily living and mobility are scored separately." },
  { q: "How much is PIP in 2026/27?", a: "Daily living is £76.70 or £114.60 a week. Mobility is £30.30 or £80.00 a week. The most you can get is £194.60 a week." },
  { q: "Is PIP means-tested?", a: "No. Your income, savings and whether you work make no difference." },
  { q: "Which descriptor should I choose?", a: "The one that applies on more than half of days, judged on whether you can do the activity safely, well, repeatedly and in a reasonable time." },
  { q: "Can I work and get PIP?", a: "Yes. PIP does not depend on whether you work or how much you earn." },
  { q: "Do I need a diagnosis?", a: "No. PIP looks at how your condition affects you, though medical evidence helps to show this." },
  { q: "How long does a PIP award last?", a: "Awards are usually reviewed after a set period, from a year to ten years, depending on how your condition may change." },
  { q: "What if my condition gets worse?", a: "Report the change. You may get more, but the whole award is looked at again." },
  { q: "Is PIP changing?", a: "The government is reviewing the PIP assessment. Until any change is made law, the points system on this page is the one used." },
  { q: "Will PIP affect my partner's benefits?", a: "No. It is your benefit, not counted as household income, and it can increase means-tested benefits through extra amounts." },
  { q: "Can I get PIP and drive?", a: "Yes. Tell the DVLA if your condition affects your driving, but PIP itself does not stop you holding a licence." },
];

export default async function PipPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/attendance-allowance", "/uk/benefits/carers-earnings", "/uk/benefits/universal-credit", "/uk/benefits/benefit-cap", "/uk/vehicles/car-tax-ved"].includes(c.href));
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
