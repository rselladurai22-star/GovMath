import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SharedOwnershipStudio from "./SharedOwnershipStudio";
import { ogFor } from "@/gm/og";
import SharedOwnershipGuide from "./SharedOwnershipGuide";

export const metadata: Metadata = {
  title: "Shared Ownership Calculator UK 2026",
  description:
    "Free shared ownership calculator. See the monthly mortgage, rent and service charge on your share, compared with buying outright, plus staircasing costs.",
  alternates: { canonical: "/uk/property/shared-ownership" },
  openGraph: ogFor("/uk/property/shared-ownership"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/shared-ownership", label: "Shared Ownership" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does shared ownership work?", a: "You buy a share of a home, usually 10% to 75%, with a mortgage, and pay rent to a housing provider on the rest. You can buy more shares later." },
  { q: "How much is the rent?", a: "Often around 2.75% a year of the value of the share you don't own for new homes, rising each year by a formula in your lease." },
  { q: "Who can buy through shared ownership?", a: "Usually households earning £80,000 or less (£90,000 in London) who are first-time buyers, used to own a home, or already own a shared ownership home." },
  { q: "What is staircasing?", a: "Buying more shares in your home, at its market value at the time. Your rent falls as your share rises." },
  { q: "Do I pay Stamp Duty on shared ownership?", a: "You choose: pay on your share now (with more possibly due once you own over 80%), or pay on the full value up front and nothing more later." },
  { q: "Can I rent out my shared ownership home?", a: "Usually not without your provider's permission, which is normally only given in exceptional circumstances." },
  { q: "Can I extend or renovate?", a: "You usually need the provider's permission for major changes, as set out in the lease." },
  { q: "What happens if I fall behind on rent?", a: "Missing rent puts your home at risk, just like missing mortgage payments. Contact your provider early if you are struggling." },
  { q: "Do I get my deposit back when I sell?", a: "You receive the value of your share at the time, less the mortgage still owed, so your deposit is part of your equity." },
  { q: "Is shared ownership worth it?", a: "It can be a good way onto the ladder if you cannot buy outright, especially if you plan to staircase. Compare the full monthly cost, including rising rent and service charges, with renting and with buying outright." },
  { q: "Can I pay off my mortgage early?", a: "Yes, subject to your mortgage terms. Paying off the mortgage does not reduce the rent, which is only reduced by buying more shares." },
  { q: "What if the value of the home falls?", a: "Your share falls in value too. Staircasing becomes cheaper, but if you sell, you receive less than you paid. The rent is not reduced because prices fall." },
];

export default async function SharedOwnershipPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/first-time-buyer", "/uk/property/mortgage-affordability", "/uk/property/mortgage-repayment", "/uk/property/rent-vs-buy", "/uk/property/stamp-duty-england", "/uk/property/moving-house-budget"].includes(c.href),
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
