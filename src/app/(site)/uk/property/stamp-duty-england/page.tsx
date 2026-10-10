import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import type { BuyerType } from "@/lib/tax/sdlt-2025";
import StampDutyStudio from "./StampDutyStudio";
import { ogFor } from "@/gm/og";
import StampDutyGuide from "./StampDutyGuide";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator UK 2026/27 (England & NI)",
  description:
    "Free Stamp Duty calculator for England and NI 2026/27. See your SDLT bill band by band, with first-time buyer relief and the 5% second-home surcharge.",
  alternates: { canonical: "/uk/property/stamp-duty-england" },
  openGraph: ogFor("/uk/property/stamp-duty-england"),
};

type SearchParams = Promise<{ price?: string; buyer?: string }>;

function parsePrice(raw: string | undefined): number {
  if (!raw) return 295_000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 295_000;
  return Math.min(n, 50_000_000);
}

function parseBuyer(raw: string | undefined): BuyerType {
  if (raw === "first-time" || raw === "additional") return raw;
  return "standard";
}

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/stamp-duty-england", label: "Stamp Duty (England & NI)" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the Stamp Duty rates for 2026/27?", a: "For a home mover: 0% up to £125,000, 2% to £250,000, 5% to £925,000, 10% to £1.5 million and 12% above. Each rate applies only to the part of the price in that band." },
  { q: "How much Stamp Duty do first-time buyers pay?", a: "Nothing on the first £300,000 and 5% from £300,001 to £500,000. Above £500,000 the standard rates apply to the whole price." },
  { q: "How much is the second home surcharge?", a: "5% on top of every band, from the first pound, for purchases of £40,000 or more." },
  { q: "When do I pay Stamp Duty?", a: "Your conveyancer files the return and pays HMRC within 14 days of completion." },
  { q: "Can I get the surcharge back?", a: "Yes, if the new home replaces your main home and you sell your previous main home within 3 years." },
  { q: "Does Stamp Duty depend on my deposit?", a: "No. It is worked out on the price, whether you pay cash or borrow 95%." },
  { q: "I am buying before selling. Do I pay the surcharge?", a: "Yes, if you own two homes at the end of the day of completion. Claim it back once you sell your old home within 3 years." },
  { q: "Do I pay Stamp Duty on a garage or parking space?", a: "If bought with the home, it is part of the same purchase. Bought separately, non-residential rates may apply." },
  { q: "Is Stamp Duty due on a house swap or part exchange?", a: "Each side is a purchase, but there are reliefs for part exchanges with house builders. Ask your conveyancer." },
  { q: "Can I pay Stamp Duty in instalments?", a: "No. It is due in full within 14 days of completion." },
  { q: "Do I pay Stamp Duty on a home I am given?", a: "Not if nothing is paid. If you take over the giver's mortgage, the amount of debt you take on counts as the price." },
  { q: "Is Stamp Duty the same in Northern Ireland?", a: "Yes. Northern Ireland uses the same Stamp Duty Land Tax rates and rules as England." },
];

export default async function StampDutyPage({ searchParams }: { searchParams: SearchParams }) {
  const { price, buyer } = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/first-time-buyer", "/uk/property/lbtt-scotland", "/uk/property/ltt-wales", "/uk/property/moving-house-budget", "/uk/property/mortgage-repayment", "/uk/property/buy-to-let-yield"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Stamp Duty Calculator"
      lead="See exactly how much Stamp Duty Land Tax you'll pay on a home in England or Northern Ireland, and how to pay less."
      points={["Rates from 1 April 2025", "First-time buyer relief", "Compare with Scotland and Wales", "Free and private"]}
      guide={<StampDutyGuide />}
      faqs={FAQS}
      related={related}
      note="Residential purchases in England and Northern Ireland completing from 1 April 2025. An estimate: your conveyancer will confirm the figure on your SDLT return."
    >
      <StampDutyStudio initialPrice={parsePrice(price)} initialBuyer={parseBuyer(buyer)} showResults={Boolean(price || buyer)} />
    </FlagshipPage>
  );
}
