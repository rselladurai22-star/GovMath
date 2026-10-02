import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SharedOwnershipStudio from "./SharedOwnershipStudio";
import SharedOwnershipGuide from "./SharedOwnershipGuide";

export const metadata: Metadata = {
  title: "Shared Ownership Calculator (England, 2026)",
  description:
    "Monthly mortgage, rent and service charge for a shared ownership home, compared with buying outright. Plus staircasing costs, rent rises and your Stamp Duty choices.",
  alternates: { canonical: "/property/shared-ownership" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/shared-ownership", label: "Shared Ownership" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does shared ownership work?", a: "You buy a share of a home, usually 10% to 75%, with a mortgage, and pay rent to a housing provider on the rest. You can buy more shares later." },
  { q: "How much is the rent?", a: "Often around 2.75% a year of the value of the share you don't own for new homes, rising each year by a formula in your lease." },
  { q: "Who can buy through shared ownership?", a: "Usually households earning £80,000 or less (£90,000 in London) who are first-time buyers, used to own a home, or already own a shared ownership home." },
  { q: "What is staircasing?", a: "Buying more shares in your home, at its market value at the time. Your rent falls as your share rises." },
  { q: "Do I pay Stamp Duty on shared ownership?", a: "You choose: pay on your share now (with more possibly due once you own over 80%), or pay on the full value up front and nothing more later." },
];

export default async function SharedOwnershipPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/first-time-buyer", "/property/mortgage-affordability", "/property/mortgage-repayment", "/property/rent-vs-buy", "/property/stamp-duty-england", "/property/moving-house-budget"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026"
      title="Shared Ownership Calculator"
      lead="Your monthly mortgage, rent and service charge, how it compares with buying outright, and what staircasing would cost."
      points={["Mortgage, rent and charges", "Against buying outright", "Staircasing and Stamp Duty", "Free and private"]}
      guide={<SharedOwnershipGuide />}
      faqs={FAQS}
      related={related}
      note="Illustrative, England rules. Your provider's key information document and lease set the actual rent, increases and staircasing terms."
    >
      <SharedOwnershipStudio query={query} />
    </FlagshipPage>
  );
}
