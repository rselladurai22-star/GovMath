import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AmountPage from "@/components/AmountPage";
import { Callout, DataTable, Guide, GuideSection, KeyStats, type Source, type TocItem } from "@/components/guide/Guide";
import { gbp, percent } from "@/components/flagship/format";
import { PRICE_AMOUNTS, neighbours, parseAmount, stampDutyFacts } from "@/lib/seo/amounts";
import { ogFor } from "@/gm/og";

type Params = Promise<{ price: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return PRICE_AMOUNTS.map((n) => ({ price: String(n) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const price = parseAmount((await params).price, PRICE_AMOUNTS);
  if (!price) return {};
  const f = stampDutyFacts(price);
  return {
    title: `Stamp Duty on ${gbp(price)} (2026/27)`,
    description: `Stamp Duty on a ${gbp(price)} home in England or NI is ${gbp(f.mover.total)} for a home mover, ${gbp(f.firstTime.total)} for a first-time buyer and ${gbp(f.additional.total)} on a second home.`,
    alternates: { canonical: `/property/stamp-duty-on/${price}` },
    openGraph: ogFor("/property/stamp-duty-england"),
  };
}

const SOURCES: Source[] = [
  { label: "GOV.UK: Stamp Duty Land Tax residential rates", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
  { label: "GOV.UK: Higher rates for additional residential property", href: "https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property" },
  { label: "Revenue Scotland: LBTT rates and bands", href: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property" },
  { label: "Welsh Revenue Authority: LTT rates", href: "https://www.gov.wales/land-transaction-tax-rates-and-bands" },
];

const TOC: TocItem[] = [
  { id: "home-mover", title: "Home movers" },
  { id: "first-time-buyer", title: "First-time buyers" },
  { id: "second-home", title: "Second homes and buy-to-let" },
  { id: "scotland-wales", title: "Scotland and Wales" },
  { id: "paying", title: "When and how you pay" },
  { id: "nearby", title: "Nearby prices" },
];

const bandRows = (r: { breakdown: { band: string; rate: number; taxableInBand: number; tax: number }[] }) =>
  r.breakdown.map((b) => [b.band.replace(" – ", " to "), percent(b.rate), gbp(b.taxableInBand), gbp(b.tax)]);

export default async function StampDutyOnPage({ params }: { params: Params }) {
  const price = parseAmount((await params).price, PRICE_AMOUNTS);
  if (!price) notFound();
  const f = stampDutyFacts(price);
  const p = gbp(price);
  const near = neighbours(price, PRICE_AMOUNTS, 3);
  const calc = `/property/stamp-duty-england?price=${price}`;
  const ftbNote =
    price <= 300_000
      ? `First-time buyers pay no Stamp Duty on a home costing up to £300,000, so on ${p} you pay nothing: a saving of ${gbp(f.mover.total)} on what a home mover pays.`
      : price <= 500_000
        ? `First-time buyers pay nothing on the first £300,000 and 5% on the ${gbp(price - 300_000)} above it: ${gbp(f.firstTime.total)}, a saving of ${gbp(f.mover.total - f.firstTime.total)} on what a home mover pays.`
        : `First-time buyer relief only applies to homes costing £500,000 or less. At ${p} a first-time buyer pays the standard rates, the same ${gbp(f.mover.total)} as a home mover.`;

  const faqs = [
    { q: `How much Stamp Duty is due on a ${p} house?`, a: `${gbp(f.mover.total)} if you are moving home in England or Northern Ireland, ${gbp(f.firstTime.total)} if you are a first-time buyer, and ${gbp(f.additional.total)} if it is a second home or buy-to-let (2026/27 rates).` },
    { q: `Do first-time buyers pay Stamp Duty on ${p}?`, a: ftbNote },
    { q: `How much is the second home surcharge on ${p}?`, a: `${gbp(f.additional.total - f.mover.total)}: an extra 5% on the whole price, on top of the ${gbp(f.mover.total)} a home mover pays.` },
    { q: `What is the tax on a ${p} home in Scotland or Wales?`, a: `In Scotland, Land and Buildings Transaction Tax is ${gbp(f.scotland.mover)} for a home mover and ${gbp(f.scotland.firstTime)} for a first-time buyer. In Wales, Land Transaction Tax is ${gbp(f.wales.mover)} for a main home.` },
  ];

  return (
    <AmountPage
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/property", label: "Mortgages & property" },
        { href: "/property/stamp-duty-on", label: "Stamp Duty by price" },
        { href: `/property/stamp-duty-on/${price}`, label: p },
      ]}
      title={`Stamp Duty on ${p}`}
      lead={`On a ${p} home in England or Northern Ireland, Stamp Duty Land Tax is ${gbp(f.mover.total)} for a home mover (${percent(f.mover.effectiveRate, 1)} of the price), ${gbp(f.firstTime.total)} for a first-time buyer and ${gbp(f.additional.total)} for a second home, at 2026/27 rates.`}
      summary={
        <KeyStats
          items={[
            { value: gbp(f.mover.total), label: "Home mover" },
            { value: gbp(f.firstTime.total), label: "First-time buyer" },
            { value: gbp(f.additional.total), label: "Second home or buy-to-let" },
          ]}
        />
      }
      cta={{ href: calc, label: `Check the Stamp Duty on ${p} in the calculator` }}
      faqs={faqs}
    >
      <Guide
        kicker="Explained"
        title={`Stamp Duty on ${p}: the breakdown`}
        intro="Stamp Duty is charged in slices: each rate applies only to the part of the price that falls in its band. These are the 2026/27 rates for England and Northern Ireland."
        toc={TOC}
        sources={SOURCES}
      >
        <GuideSection id="home-mover" n={1} kicker="Standard rates" title="Home movers">
          <p>
            If you are buying your next main home, you pay {gbp(f.mover.total)} on {p}.
          </p>
          <DataTable head={["Band", "Rate", "Price in band", "Tax"]} numeric={[1, 2, 3]} rows={bandRows(f.mover)} />
        </GuideSection>

        <GuideSection id="first-time-buyer" n={2} kicker="Relief" title="First-time buyers">
          <p>{ftbNote}</p>
          {price <= 500_000 && <DataTable head={["Band", "Rate", "Price in band", "Tax"]} numeric={[1, 2, 3]} rows={bandRows(f.firstTime)} />}
          <p>
            Everyone buying must be a first-time buyer, and the home must be your main residence. The{" "}
            <a href="/property/first-time-buyer">first-time buyer calculator</a> also adds up your deposit and other costs.
          </p>
        </GuideSection>

        <GuideSection id="second-home" n={3} kicker="Higher rates" title="Second homes and buy-to-let">
          <p>
            If you will own more than one home at the end of the day you complete, a 5% surcharge applies to every band. On {p} that is{" "}
            {gbp(f.additional.total)} in total, {gbp(f.additional.total - f.mover.total)} more than a home mover pays.
          </p>
          <DataTable head={["Band", "Rate", "Price in band", "Tax"]} numeric={[1, 2, 3]} rows={bandRows(f.additional)} />
          <Callout title="Replacing your main home">
            If you buy before selling, you pay the surcharge but can claim it back if you sell your previous main home within 3 years.
          </Callout>
        </GuideSection>

        <GuideSection id="scotland-wales" n={4} kicker="Other nations" title="Scotland and Wales">
          <p>Scotland and Wales have their own taxes instead of Stamp Duty. On a {p} home:</p>
          <DataTable
            head={["", "England and NI", "Scotland (LBTT)", "Wales (LTT)"]}
            numeric={[1, 2, 3]}
            rows={[
              ["Home mover", gbp(f.mover.total), gbp(f.scotland.mover), gbp(f.wales.mover)],
              ["First-time buyer", gbp(f.firstTime.total), gbp(f.scotland.firstTime), gbp(f.wales.mover)],
              ["Second home", gbp(f.additional.total), gbp(f.scotland.additional), gbp(f.wales.additional)],
            ]}
          />
          <p>
            Wales has no separate first-time buyer relief. Work out the details with the <a href="/property/lbtt-scotland">LBTT calculator</a> or the{" "}
            <a href="/property/ltt-wales">LTT calculator</a>.
          </p>
        </GuideSection>

        <GuideSection id="paying" n={5} kicker="Paying" title="When and how you pay">
          <p>
            Your conveyancer usually files the return and pays HMRC for you. The tax is due within 14 days of completion and cannot be paid in
            instalments, so it needs to be in your budget alongside the deposit, legal fees and survey. The{" "}
            <a href="/property/moving-house-budget">moving house costs calculator</a> adds them up.
          </p>
        </GuideSection>

        <GuideSection id="nearby" n={6} kicker="Compare" title="Nearby prices">
          <DataTable
            head={["Price", "Home mover", "First-time buyer", "Second home"]}
            numeric={[1, 2, 3]}
            rows={near.map((n) => {
              const g = stampDutyFacts(n);
              return [
                n === price ? <strong key={n}>{gbp(n)}</strong> : <a key={n} href={`/property/stamp-duty-on/${n}`}>Stamp Duty on {gbp(n)}</a>,
                gbp(g.mover.total),
                gbp(g.firstTime.total),
                gbp(g.additional.total),
              ];
            })}
          />
          <p>
            See <Link href="/property/stamp-duty-on">Stamp Duty at every price from £100,000 to £2 million</Link>, or use the{" "}
            <a href={calc}>Stamp Duty calculator</a> for any price.
          </p>
        </GuideSection>
      </Guide>
    </AmountPage>
  );
}
