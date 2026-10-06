import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RentARoomStudio from "./RentARoomStudio";
import RentARoomGuide from "./RentARoomGuide";

export const metadata: Metadata = {
  title: "Rent a Room Tax Calculator (2026/27)",
  description:
    "Check whether your lodger income is tax-free under the £7,500 Rent a Room scheme, and if not, whether the scheme or the normal method gives less tax.",
  alternates: { canonical: "/property/rent-a-room" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/rent-a-room", label: "Rent a Room" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much can I earn tax-free from a lodger?", a: "Up to £7,500 a year under the Rent a Room scheme, or £3,750 each if someone else also receives rent from the home." },
  { q: "Does the limit include bills?", a: "Yes. It is a limit on everything you receive, including charges for meals, cleaning and bills." },
  { q: "What if I earn more than £7,500?", a: "Register for Self Assessment and either pay tax on the amount above £7,500, or use the normal method and deduct your actual expenses." },
  { q: "Do I need to tell HMRC if I earn under £7,500?", a: "No. The relief is automatic and you do not need to report it." },
  { q: "Does Rent a Room apply to Airbnb?", a: "It can, for furnished rooms in your main home while you live there." },
  { q: "Does it apply to Airbnb guests?", a: "It can, if the guests stay in a furnished room in your main home while you live there. Letting the whole home while you are away does not qualify." },
  { q: "What if my lodger only stays a few months?", a: "You still get the full £7,500 limit for the tax year. It is not divided by the number of months." },
  { q: "Can I claim the scheme and expenses together?", a: "No. Under the scheme you cannot deduct any expenses." },
  { q: "Do I have to protect a lodger's deposit?", a: "Not usually. Deposit protection rules apply to assured shorthold tenancies, not lodgers who live with you." },
  { q: "Is the limit different in Scotland or Wales?", a: "No. Rent a Room is a UK-wide Income Tax relief. Scottish taxpayers pay Scottish rates on any taxable amount." },
  { q: "Does Rent a Room affect Capital Gains Tax when I sell?", a: "Having a lodger who shares your home does not normally reduce Private Residence Relief, so you would not usually pay CGT on your home because of it." },
  { q: "Can a lodger stay if I rent my home?", a: "Only if your tenancy allows it. Ask your landlord for written permission first." },
];

export default async function RentARoomPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/buy-to-let-yield", "/property/single-person-discount", "/tax-and-salary/tax-bracket-checker", "/property/property-capital-gains", "/business/sole-trader-tax", "/property/council-tax-bands"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Rent a Room Calculator"
      lead="See whether your lodger income is tax-free, and which method gives the least tax if you earn more."
      points={["£7,500 tax-free", "Scheme or normal method", "Shared homes", "Free and private"]}
      guide={<RentARoomGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27. Applies to furnished rooms in your main home. Not tax advice."
    >
      <RentARoomStudio query={query} />
    </FlagshipPage>
  );
}
