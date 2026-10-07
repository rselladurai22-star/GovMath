import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AmountPage from "@/components/AmountPage";
import { Bars, Callout, DataTable, Guide, GuideSection, KeyStats, SERIES, type Source, type TocItem } from "@/components/guide/Guide";
import { gbp, percent } from "@/components/flagship/format";
import { AMOUNT_PAGES_LIVE, BUYING_COSTS, LENDING, PRICE_AMOUNTS, SALARY_AMOUNTS, neighbours, parseAmount, priceExtras, stampDutyFacts } from "@/lib/seo/amounts";
import { ogFor } from "@/gm/og";

type Params = Promise<{ price: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return AMOUNT_PAGES_LIVE ? PRICE_AMOUNTS.map((n) => ({ price: String(n) })) : [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const price = parseAmount((await params).price, PRICE_AMOUNTS);
  if (!price) return {};
  const f = stampDutyFacts(price);
  return {
    title: `Stamp Duty on ${gbp(price)} (2026/27)`,
    description: `Stamp Duty on a ${gbp(price)} home in England or NI is ${gbp(f.mover.total)} for a home mover, ${gbp(f.firstTime.total)} for a first-time buyer and ${gbp(f.additional.total)} on a second home.`,
    alternates: { canonical: `/uk/property/stamp-duty-on/${price}` },
    openGraph: ogFor("/uk/property/stamp-duty-england"),
  };
}

const SOURCES: Source[] = [
  { label: "GOV.UK: Stamp Duty Land Tax residential rates", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
  { label: "GOV.UK: Higher rates for additional residential property", href: "https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property" },
  { label: "Revenue Scotland: LBTT rates and bands", href: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property" },
  { label: "Welsh Revenue Authority: LTT rates", href: "https://www.gov.wales/land-transaction-tax-rates-and-bands" },
  { label: "GOV.UK: Stamp Duty relief for first-time buyers", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
  { label: "MoneyHelper: Mortgage affordability", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/how-much-can-i-afford-to-borrow-for-a-mortgage" },
];

const TOC: TocItem[] = [
  { id: "home-mover", title: "Home movers" },
  { id: "first-time-buyer", title: "First-time buyers" },
  { id: "second-home", title: "Second homes and buy-to-let" },
  { id: "scotland-wales", title: "Scotland and Wales" },
  { id: "thresholds", title: "Near a threshold" },
  { id: "mortgage", title: "Deposit and mortgage" },
  { id: "cash", title: "Cash you need to buy" },
  { id: "paying", title: "When and how you pay" },
  { id: "nearby", title: "Nearby prices" },
];

const bandRows = (r: { breakdown: { band: string; rate: number; taxableInBand: number; tax: number }[] }) =>
  r.breakdown.map((b) => [b.band.replace(" – ", " to "), percent(b.rate), gbp(b.taxableInBand), gbp(b.tax)]);

/** What is special about this price, in plain words. */
function positionNote(price: number): string {
  const p = gbp(price);
  if (price <= 125_000)
    return `${p} is within the £125,000 nil-rate band, so a home mover or first-time buyer pays no Stamp Duty at all. The 5% surcharge on second homes still applies from the first pound, because it is charged on every band.`;
  if (price <= 250_000)
    return `${p} is in the 2% band, which covers the part of a price from £125,001 to £250,000. Only the ${gbp(price - 125_000)} above £125,000 is taxed, which is why the bill is small compared with the price.`;
  if (price <= 300_000)
    return `${p} reaches the 5% band above £250,000. This is the range where first-time buyer relief is worth most: a first-time buyer pays nothing on a home up to £300,000.`;
  if (price <= 500_000)
    return `${p} is in the range where first-time buyer relief still applies but is partial: nothing on the first £300,000, then 5% on the rest. Home movers pay 2% from £125,001 and 5% from £250,001.`;
  if (price < 925_000)
    return `${p} is above the £500,000 limit for first-time buyer relief, so everyone buying a main home pays the standard rates. The whole price above £250,000 is in the 5% band.`;
  if (price <= 1_500_000)
    return `${p} reaches the 10% band, which applies to the part of a price from £925,001 to £1.5 million. Each extra £1,000 of price now costs £100 in Stamp Duty for a home mover.`;
  return `${p} reaches the top 12% band on the part above £1.5 million. Each extra £1,000 of price costs £120 for a home mover, or £170 on a second home.`;
}

export default async function StampDutyOnPage({ params }: { params: Params }) {
  const price = parseAmount((await params).price, PRICE_AMOUNTS);
  if (!AMOUNT_PAGES_LIVE || !price) notFound();
  const f = stampDutyFacts(price);
  const p = gbp(price);
  const near = neighbours(price, PRICE_AMOUNTS, 3);
  const calc = `/uk/property/stamp-duty-england?price=${price}`;
  const x = priceExtras(price);
  const ten = x.deposits[1];
  const salaryFor = (income: number) => SALARY_AMOUNTS.find((a) => a >= income);
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
    { q: `What salary do I need to buy a ${p} house?`, a: `With a 10% deposit of ${gbp(ten.deposit)}, you would borrow ${gbp(ten.loan)}. At ${LENDING.multiple} times income that needs a household income of about ${gbp(ten.incomeNeeded)}. Repayments at ${LENDING.ratePct}% over ${LENDING.termYears} years are ${gbp(ten.monthly)} a month.` },
    { q: `How much cash do I need to buy a ${p} home?`, a: `About ${gbp(x.cash[0].cashNeeded)} for a first-time buyer with a 10% deposit: the ${gbp(ten.deposit)} deposit plus ${gbp(x.cash[0].costs)} of Stamp Duty, legal fees, survey, mortgage fee and removals. A home mover needs about ${gbp(x.cash[1].cashNeeded)}.` },
  ];

  return (
    <AmountPage
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/uk/property", label: "Mortgages & property" },
        { href: "/uk/property/stamp-duty-on", label: "Stamp Duty by price" },
        { href: `/uk/property/stamp-duty-on/${price}`, label: p },
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
            If you are buying your next main home, you pay {gbp(f.mover.total)} on {p}, an effective rate of {percent(f.mover.effectiveRate, 2)}.
          </p>
          <p>{positionNote(price)}</p>
          <DataTable head={["Band", "Rate", "Price in band", "Tax"]} numeric={[1, 2, 3]} rows={bandRows(f.mover)} />
        </GuideSection>

        <GuideSection id="first-time-buyer" n={2} kicker="Relief" title="First-time buyers">
          <p>{ftbNote}</p>
          {price <= 500_000 && <DataTable head={["Band", "Rate", "Price in band", "Tax"]} numeric={[1, 2, 3]} rows={bandRows(f.firstTime)} />}
          <p>
            Everyone buying must be a first-time buyer, and the home must be your main residence. The{" "}
            <a href="/uk/property/first-time-buyer">first-time buyer calculator</a> also adds up your deposit and other costs.
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
          <Bars
            items={[
              { label: "England and NI (SDLT)", value: f.mover.total, color: SERIES[0] },
              { label: "Scotland (LBTT)", value: f.scotland.mover, color: SERIES[1] },
              { label: "Wales (LTT)", value: f.wales.mover, color: SERIES[2] },
            ]}
            format={(n) => gbp(n)}
          />
          <p>
            Wales has no separate first-time buyer relief. Work out the details with the <a href="/uk/property/lbtt-scotland">LBTT calculator</a> or the{" "}
            <a href="/uk/property/ltt-wales">LTT calculator</a>.
          </p>
        </GuideSection>

        <GuideSection id="thresholds" n={5} kicker="Thresholds" title="Near a threshold">
          <p>
            Each extra £1,000 above {p} adds {gbp(x.nextThousand)} of Stamp Duty for a home mover.
            {x.edgeBelow
              ? ` The nearest band edge below is ${gbp(x.edgeBelow.price)}, where the bill is ${gbp(x.edgeBelow.tax)}: ${gbp(f.mover.total - x.edgeBelow.tax)} less than on ${p}.`
              : " There is no band edge below this price: it is within the nil-rate band."}
          </p>
          {price > 300_000 && price <= 500_000 && (
            <Callout tone="info" title="First-time buyers">
              Every £1,000 above £300,000 costs a first-time buyer £50. Negotiating {p} down to £300,000 would save {gbp(f.firstTime.total)} in Stamp Duty.
            </Callout>
          )}
          {price > 500_000 && price <= 600_000 && (
            <Callout tone="warn" title="The £500,000 cliff edge">
              First-time buyer relief stops completely above £500,000. At £500,000 a first-time buyer pays £10,000; at {p} they pay {gbp(f.firstTime.total)}.
            </Callout>
          )}
          <p>
            Buyers sometimes agree a lower price and pay separately for furniture and fittings. That is allowed only for genuine moveable items at a fair
            value: HMRC can challenge inflated amounts.
          </p>
        </GuideSection>

        <GuideSection id="mortgage" n={6} kicker="Mortgage" title={`Deposit and mortgage on ${p}`}>
          <p>
            How much you put down changes the loan, the monthly payment and the income a lender wants to see. These use a {LENDING.ratePct}% rate over{" "}
            {LENDING.termYears} years and a lending limit of {LENDING.multiple} times income.
          </p>
          <DataTable
            head={["Deposit", "Amount", "Loan", "A month", "Income needed"]}
            numeric={[1, 2, 3, 4]}
            rows={x.deposits.map((d) => {
              const sal = salaryFor(d.incomeNeeded);
              return [
                `${d.pct}%`,
                gbp(d.deposit),
                gbp(d.loan),
                gbp(d.monthly),
                sal ? <a key={d.pct} href={`/uk/tax-and-salary/salary-after-tax/${sal}`}>{gbp(d.incomeNeeded)}</a> : gbp(d.incomeNeeded),
              ];
            })}
          />
          <p>
            The income is for the household, so two buyers can add their salaries together. Lenders also check spending, debts and credit record. Try your own
            figures in the <a href="/uk/property/mortgage-affordability">mortgage affordability calculator</a> or the{" "}
            <a href="/uk/property/mortgage-repayment">mortgage repayment calculator</a>.
          </p>
        </GuideSection>

        <GuideSection id="cash" n={7} kicker="Cash" title="Cash you need to buy">
          <DataTable
            head={["", "First-time buyer", "Home mover"]}
            numeric={[1, 2]}
            rows={[
              ["10% deposit", gbp(ten.deposit), gbp(ten.deposit)],
              ["Stamp Duty", gbp(x.cash[0].tax), gbp(x.cash[1].tax)],
              ["Legal fees, survey, mortgage fee and removals", gbp(x.cash[0].fees), gbp(x.cash[1].fees)],
              [<strong key="t">Cash needed</strong>, <strong key="f">{gbp(x.cash[0].cashNeeded)}</strong>, <strong key="m">{gbp(x.cash[1].cashNeeded)}</strong>],
            ]}
          />
          <p>
            Fees are typical figures: {gbp(BUYING_COSTS.legal)} for conveyancing, a homebuyer survey, a {gbp(BUYING_COSTS.mortgageFee)} mortgage fee and{" "}
            {gbp(BUYING_COSTS.removals)} for removals. A home mover selling a home also pays estate agent and selling legal fees, usually from the sale
            proceeds. The <a href="/uk/property/moving-house-budget">moving house costs calculator</a> lets you change every figure.
          </p>
        </GuideSection>

        <GuideSection id="paying" n={8} kicker="Paying" title="When and how you pay">
          <p>
            Your conveyancer usually files the return and pays HMRC for you. The tax is due within 14 days of completion and cannot be paid in
            instalments, so on {p} you need {gbp(f.mover.total)} ready on completion day as a home mover
            {f.firstTime.total < f.mover.total ? `, or ${gbp(f.firstTime.total)} as a first-time buyer` : ""}. Most conveyancers ask for it a few days
            before completion, along with the deposit.
          </p>
        </GuideSection>

        <GuideSection id="nearby" n={9} kicker="Compare" title="Nearby prices">
          <DataTable
            head={["Price", "Home mover", "First-time buyer", "Second home"]}
            numeric={[1, 2, 3]}
            rows={near.map((n) => {
              const g = stampDutyFacts(n);
              return [
                n === price ? <strong key={n}>{gbp(n)}</strong> : <a key={n} href={`/uk/property/stamp-duty-on/${n}`}>Stamp Duty on {gbp(n)}</a>,
                gbp(g.mover.total),
                gbp(g.firstTime.total),
                gbp(g.additional.total),
              ];
            })}
          />
          <p>
            See <Link href="/uk/property/stamp-duty-on">Stamp Duty at every price from £100,000 to £2 million</Link>, or use the{" "}
            <a href={calc}>Stamp Duty calculator</a> for any price.
          </p>
        </GuideSection>
      </Guide>
    </AmountPage>
  );
}
