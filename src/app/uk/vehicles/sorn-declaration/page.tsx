import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SornStudio from "./SornStudio";
import { ogFor } from "@/gm/og";
import SornGuide from "./SornGuide";

export const metadata: Metadata = {
  title: "SORN Refund Calculator: How Much Car Tax Back?",
  description:
    "Free SORN refund calculator. See how much car tax you get back when you declare SORN, how timing affects the refund, and the rules while off the road.",
  alternates: { canonical: "/uk/vehicles/sorn-declaration" },
  openGraph: ogFor("/uk/vehicles/sorn-declaration"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/vehicles", label: "Vehicles" },
  { href: "/uk/vehicles/sorn-declaration", label: "SORN Refund" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much tax do I get back with a SORN?", a: "Every full calendar month left after the month the DVLA gets the SORN. On £200 a year, that is £16.67 a month." },
  { q: "Does it matter what day of the month I SORN?", a: "No. The month the DVLA receives it is not refunded, so any day that month gives the same refund." },
  { q: "Do I need insurance for a SORN car?", a: "No, but many people keep fire and theft cover while it is stored." },
  { q: "Can I drive a SORN car?", a: "Only to a pre-booked MOT. It must be kept off public roads." },
  { q: "Does a SORN last forever?", a: "Yes, until the car is taxed, sold, scrapped or exported. You do not renew it." },
  { q: "Can I SORN a car with no tax left?", a: "Yes. You must make a SORN or tax the car as soon as the tax runs out, or you risk the £80 penalty." },
  { q: "Can I get a refund on a car I sold?", a: "Yes. Tell the DVLA you sold it, and any full months left are refunded automatically." },
];

export default async function SornPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/vehicles/car-tax-ved", "/uk/vehicles/mot-history-checker", "/uk/vehicles/petrol-vs-ev-cost"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Vehicle tax"
      title="SORN Refund Calculator"
      lead="See how much vehicle tax you get back when you take a car off the road."
      points={["Full-month refunds", "Timing", "Insurance saving", "Free and private"]}
      guide={<SornGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate only. The DVLA works out the exact refund."
    >
      <SornStudio query={query} />
    </FlagshipPage>
  );
}
