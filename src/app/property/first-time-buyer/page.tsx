import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FTBStudio from "./FTBStudio";
import { ogFor } from "@/gm/og";
import FTBGuide from "./FTBGuide";

export const metadata: Metadata = {
  title: "First-Time Buyer Stamp Duty Calculator 2026/27",
  description:
    "Free first-time buyer Stamp Duty calculator. Pay 0% to £300,000 and 5% to £500,000. See the £500,000 cliff edge and the cash you need to complete.",
  alternates: { canonical: "/property/first-time-buyer" },
  openGraph: ogFor("/property/first-time-buyer"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/first-time-buyer", label: "First-Time Buyer" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much Stamp Duty does a first-time buyer pay?", a: "Nothing on the first £300,000 and 5% on the part from £300,001 to £500,000. Above £500,000 relief does not apply and the standard rates are used on the whole price." },
  { q: "What happens above £500,000?", a: "You lose the relief entirely. At £500,000 a first-time buyer pays £10,000; at £500,001 they pay £15,000 at the standard rates." },
  { q: "Can I get relief if my partner has owned a home?", a: "No. Every buyer must be a first-time buyer. If anyone buying has owned a home anywhere in the world, the standard rates apply." },
  { q: "Does a Lifetime ISA affect Stamp Duty?", a: "No, but you can only use a Lifetime ISA towards a first home costing £450,000 or less without a 25% withdrawal charge." },
  { q: "Do first-time buyers pay Stamp Duty in Scotland and Wales?", a: "Scotland has LBTT with a £175,000 0% band for first-time buyers. Wales has LTT with no first-time buyer relief but a £225,000 0% band for everyone." },
  { q: "I inherited a share of a house as a child. Am I a first-time buyer?", a: "Probably not. Any interest in a residential property anywhere in the world counts as ownership, including an inherited share. Ask your conveyancer to check the details." },
  { q: "Does it matter if I owned a home abroad?", a: "Yes. Homes outside the UK count, so previous overseas ownership rules you out." },
  { q: "Do I need to live in the home?", a: "Yes. It must be your only or main residence. Buying a first property to let out does not qualify." },
  { q: "What if the price changes after I agree it?", a: "Stamp Duty is worked out on the final price at completion, so a renegotiated price changes the tax." },
  { q: "Can I add Stamp Duty to my mortgage?", a: "Not directly. You need the money at completion, though borrowing more and keeping more cash back has the same effect." },
];

export default async function FTBPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/stamp-duty-england", "/property/mortgage-affordability", "/property/mortgage-repayment", "/property/shared-ownership", "/property/moving-house-budget", "/property/rent-vs-buy"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="First-Time Buyer Stamp Duty Calculator"
      lead="See what you pay as a first-time buyer, how much relief saves and the cash you need on completion day."
      points={["0% to £300,000", "£500,000 cliff edge", "Cash needed on the day", "Free and private"]}
      guide={<FTBGuide />}
      faqs={FAQS}
      related={related}
      note="England and Northern Ireland, residential purchases by UK residents. An estimate: your conveyancer will confirm the figure on your SDLT return."
    >
      <FTBStudio query={query} />
    </FlagshipPage>
  );
}
