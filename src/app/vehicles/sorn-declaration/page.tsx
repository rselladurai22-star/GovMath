import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SornStudio from "./SornStudio";
import SornGuide from "./SornGuide";

export const metadata: Metadata = {
  title: "SORN Refund Calculator: Car Tax Refund When Off the Road",
  description:
    "Work out your vehicle tax refund when you make a SORN, how timing affects it, and what you save while a car is off the road. Plus the rules and penalties.",
  alternates: { canonical: "/vehicles/sorn-declaration" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/sorn-declaration", label: "SORN Refund" },
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
  const related = CALCULATORS.filter((c) => ["/vehicles/car-tax-ved", "/vehicles/mot-history-checker", "/vehicles/petrol-vs-ev-cost"].includes(c.href));
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
