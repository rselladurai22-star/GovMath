import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RentIncreaseStudio from "./RentIncreaseStudio";
import { ogFor } from "@/gm/og";
import RentIncreaseGuide from "./RentIncreaseGuide";

export const metadata: Metadata = {
  title: "Rent Increase Calculator UK: Is It Legal?",
  description:
    "Free rent increase checker for England, Scotland, Wales and Northern Ireland. Check the notice, the once-a-year rule and how to challenge a rise.",
  alternates: { canonical: "/uk/property/rent-increase" },
  openGraph: ogFor("/uk/property/rent-increase"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/rent-increase", label: "Rent Increase Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much notice must a landlord give for a rent increase?", a: "At least 2 months in England and Wales, and at least 3 months in Scotland and Northern Ireland, in writing." },
  { q: "How often can my landlord put the rent up?", a: "Once a year. In England a new rent cannot start within 52 weeks of the last increase or the start of the tenancy; in Wales, Scotland and Northern Ireland, within 12 months." },
  { q: "Is there a limit on how much my rent can go up?", a: "There is no fixed cap in England, Wales or Northern Ireland, but in England you can ask the First-tier Tribunal to set a market rent if you think the rise is too high. In Scotland, rent control areas can cap rises once councils designate them." },
  { q: "Can I challenge a rent increase under the Renters' Rights Act?", a: "Yes. Apply to the First-tier Tribunal before the new rent starts. It cannot set a rent higher than your landlord asked for, and any increase only applies from its decision." },
  { q: "Can my landlord use a rent review clause?", a: "Not in England since 1 May 2026. All private rent increases must use a section 13 notice." },
  { q: "What percentage rent increase is reasonable?", a: "It depends on local rents. Compare the new rent with similar homes advertised nearby. A rise that takes your rent above the market rate can be challenged in England." },
  { q: "Can my landlord increase the rent during a fixed term?", a: "In England fixed terms no longer exist for private tenancies: all are periodic, and rises use section 13 once a year." },
  { q: "Does the rule apply to council and housing association homes?", a: "Social landlords have their own rent rules, usually a yearly rise in April set by government policy." },
  { q: "What if I pay the new rent by mistake?", a: "Paying the new amount can be taken as accepting it. Get advice quickly if you think the notice was not valid." },
  { q: "Can the landlord put the rent up when a new tenant moves in?", a: "Yes. The rules are about existing tenancies. A new tenancy can start at the advertised rent, and in England the Renters' Rights Act stops landlords accepting bids above it." },
];

export default async function RentIncreasePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/deposit-return", "/uk/life/pro-rata-rent", "/uk/benefits/local-housing-allowance", "/uk/benefits/housing-benefit", "/uk/property/rent-vs-buy", "/uk/life/right-to-rent"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 rules"
      title="Rent Increase Checker"
      lead="Check whether a rent rise follows the rules on notice and timing, what it costs you, and how to challenge it."
      points={["England, Wales, Scotland and NI", "Renters' Rights Act 2025", "Notice and once-a-year checks", "Free and private"]}
      guide={<RentIncreaseGuide />}
      faqs={FAQS}
      related={related}
      note="General information about private tenancies, not legal advice."
    >
      <RentIncreaseStudio query={query} />
    </FlagshipPage>
  );
}
