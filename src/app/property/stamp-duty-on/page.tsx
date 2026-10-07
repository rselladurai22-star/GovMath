import type { Metadata } from "next";
import AmountPage from "@/components/AmountPage";
import { DataTable, Guide, GuideSection, type Source, type TocItem } from "@/components/guide/Guide";
import { gbp } from "@/components/flagship/format";
import { PRICE_AMOUNTS, stampDutyFacts } from "@/lib/seo/amounts";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Stamp Duty by House Price 2026/27",
  description:
    "Stamp Duty at every house price from £100,000 to £2 million in 2026/27: home movers, first-time buyers and second homes in England and NI, with full breakdowns.",
  alternates: { canonical: "/property/stamp-duty-on" },
  openGraph: ogFor("/property/stamp-duty-england"),
};

const SOURCES: Source[] = [
  { label: "GOV.UK: Stamp Duty Land Tax residential rates", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
];

const BANDS: [string, number, number][] = [
  ["£100,000 to £300,000", 100_000, 300_000],
  ["£325,000 to £500,000", 325_000, 500_000],
  ["£525,000 to £1 million", 525_000, 1_000_000],
  ["£1.1 million to £2 million", 1_100_000, 2_000_000],
];

const TOC: TocItem[] = BANDS.map(([label, lo]) => ({ id: `from-${lo}`, title: label }));

export default function StampDutyByPrice() {
  return (
    <AmountPage
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/property", label: "Mortgages & property" },
        { href: "/property/stamp-duty-on", label: "Stamp Duty by price" },
      ]}
      title="Stamp Duty by house price"
      lead="Stamp Duty Land Tax in England and Northern Ireland at every price from £100,000 to £1 million in £25,000 steps, then to £2 million. Pick a price for the band-by-band breakdown and the Scottish and Welsh equivalents."
      cta={{ href: "/property/stamp-duty-england", label: "Work out any price in the calculator" }}
    >
      <Guide
        kicker="All prices"
        title="Stamp Duty at each price"
        intro="2026/27 rates. Home movers pay the standard rates, first-time buyers get relief up to £500,000, and second homes pay a 5% surcharge."
        toc={TOC}
        sources={SOURCES}
      >
        {BANDS.map(([label, lo, hi], i) => (
          <GuideSection key={lo} id={`from-${lo}`} n={i + 1} kicker="Prices" title={label}>
            <DataTable
              head={["Price", "Home mover", "First-time buyer", "Second home"]}
              numeric={[1, 2, 3]}
              rows={PRICE_AMOUNTS.filter((n) => n >= lo && n <= hi).map((n) => {
                const f = stampDutyFacts(n);
                return [
                  <a key={n} href={`/property/stamp-duty-on/${n}`}>
                    Stamp Duty on {gbp(n)}
                  </a>,
                  gbp(f.mover.total),
                  gbp(f.firstTime.total),
                  gbp(f.additional.total),
                ];
              })}
            />
          </GuideSection>
        ))}
      </Guide>
    </AmountPage>
  );
}
