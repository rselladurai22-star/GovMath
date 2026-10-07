import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import IhtStudio from "./IhtStudio";
import { ogFor } from "@/gm/og";
import IhtGuide from "./IhtGuide";

export const metadata: Metadata = {
  title: "Inheritance Tax Calculator UK 2026/27",
  description:
    "Free inheritance tax calculator for 2026/27. Work out IHT with the nil-rate band, residence nil-rate band, gifts and taper, spouse transfers and reliefs.",
  alternates: { canonical: "/life/inheritance-tax" },
  openGraph: ogFor("/life/inheritance-tax"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/inheritance-tax", label: "Inheritance Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Inheritance Tax threshold in 2026/27?", a: "£325,000, plus up to £175,000 more when a home passes to children or grandchildren. Both are frozen until April 2030." },
  { q: "How much can a married couple leave tax-free?", a: "Up to £1 million, because unused allowances pass to the surviving spouse or civil partner." },
  { q: "What is the 7-year rule?", a: "Gifts to people are free of Inheritance Tax if the giver lives for 7 years. Earlier gifts are added back to the estate." },
  { q: "Will pensions be subject to Inheritance Tax?", a: "Yes, for deaths on or after 6 April 2027, most unused pension funds will be part of the estate." },
  { q: "Who pays Inheritance Tax?", a: "The executors pay it from the estate. Beneficiaries do not usually pay it themselves, except on lifetime gifts." },
  { q: "Do I pay tax on money I inherit?", a: "No Income Tax is due on an inheritance itself, but you may pay tax on income or gains it produces later." },
  { q: "Does Inheritance Tax apply to a home left to my partner?", a: "Only if you are not married or in a civil partnership. Gifts between spouses are exempt." },
  { q: "Are the allowances going up?", a: "No. Both bands are frozen until April 2030." },
  { q: "Is a home owned jointly with my spouse taxed when I die?", a: "Your share passes to your spouse free of Inheritance Tax. The whole home is then counted in the survivor's estate." },
  { q: "Can I give my home to my children and keep living in it?", a: "Not without paying them a full market rent. Otherwise it is a gift with reservation of benefit and stays in your estate, and the residence nil-rate band may be affected." },
  { q: "Do I need to report an estate that owes no tax?", a: "Usually only the figures given in the probate application. A full IHT400 is needed for larger or more complex estates." },
];

export default async function IhtPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/probate-fees", "/life/power-of-attorney", "/life/care-home-means-test", "/investing/capital-gains-assets", "/investing/pension-tax-relief"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Inheritance Tax Calculator"
      lead="Work out the Inheritance Tax on an estate, with spouse transfers, gifts, charity, business relief and the pension changes coming in April 2027."
      points={["Both nil-rate bands", "Gifts and the 7-year rule", "2026 and 2027 changes", "Free and private"]}
      guide={<IhtGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rules. Not legal or tax advice."
    >
      <IhtStudio query={query} />
    </FlagshipPage>
  );
}
