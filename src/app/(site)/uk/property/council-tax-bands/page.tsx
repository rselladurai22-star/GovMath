import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { BAND_D_AVG, bandMultiplier, councilBill, type CtBand, type CtNation } from "@/lib/property/council-tax-bands";
import { COUNCIL_BAND_D_2026 } from "@/lib/property/council-band-d-2026";
import { gbp } from "@/components/flagship/format";
import CouncilTaxStudio from "./CouncilTaxStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Council Tax Calculator 2026/27: Bill by Band",
  description:
    "Free council tax calculator for 2026/27. See the yearly and monthly bill for every band in England, Wales and Scotland, with discounts and premiums.",
  alternates: { canonical: "/uk/property/council-tax-bands" },
  openGraph: ogFor("/uk/property/council-tax-bands"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Renting & council tax" },
  { href: "/uk/property/council-tax-bands", label: "Council Tax Bands" },
];

// Every figure below comes from the engines and the published 2026/27 Band D data.
const avg = (nation: CtNation, band: CtBand) => BAND_D_AVG[nation] * bandMultiplier(nation, band);
const extremes = (nation: CtNation) => {
  const list = [...COUNCIL_BAND_D_2026[nation]].sort((a, b) => a[2] - b[2]);
  return { low: list[0], high: list[list.length - 1] };
};
const ENG = extremes("england");
const WAL = extremes("wales");
const SCO = extremes("scotland");
const ENG_TWELVE = councilBill({ nation: "england", band: "D", bandD: 0, adultsCounted: 2, disabledReduction: false, premiumPct: 0, instalments: 12 });
const ENG_TEN = councilBill({ nation: "england", band: "D", bandD: 0, adultsCounted: 2, disabledReduction: false, premiumPct: 0, instalments: 10 });
const ENG_DISABLED_A = councilBill({ nation: "england", band: "A", bandD: 0, adultsCounted: 2, disabledReduction: true, premiumPct: 0, instalments: 10 });
const BANDS: CtBand[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Will extending my home put it in a higher band?",
    a: "Not while you live there. The Valuation Office only looks again at the band when the home is next sold, and then values it as it would have been on the valuation date with the extension. A loft conversion or a large extension can move it up a band for the buyer, which is worth knowing when you sell.",
  },
  {
    q: "Can asking for a band review make my bill go up?",
    a: "Yes. The Valuation Office or assessor looks at the home afresh and can move it up as well as down, and it can review your neighbours' bands at the same time. Before you ask, check that most similar homes on your street really are in a lower band, and look at sale prices from the valuation period rather than today's.",
  },
  {
    q: "Do I pay council tax in February and March?",
    a: `Not usually. Bills run from April to March, and the council collects the year in 10 monthly instalments, from April to January, unless you ask for 12. On the England average Band D that is ${gbp(ENG_TEN.instalment, true)} for 10 months or ${gbp(ENG_TWELVE.instalment, true)} for 12. Ask your council before the year starts and it will spread the payments.`,
  },
  {
    q: "Does Northern Ireland have council tax?",
    a: "No. Homes in Northern Ireland pay domestic rates instead, worked out from the home's capital value on 1 January 2005 and a rate set by the district council and the Executive. The bands on this page do not apply there.",
  },
  {
    q: "What happens if I stop paying?",
    a: "Miss an instalment and the council sends a reminder. If you do not catch up within 7 days, or you miss more than once, you can lose the right to pay monthly and owe the whole year at once. The council can then get a liability order from the magistrates' court, add costs, and take the money from your wages or benefits. Contact the council early: most will agree a payment plan.",
  },
];

const SOURCES = [
  { label: "MHCLG: Council Tax levels set by local authorities in England 2026 to 2027", href: "https://www.gov.uk/government/statistics/council-tax-levels-set-by-local-authorities-in-england-2026-to-2027" },
  { label: "Welsh Government: Council Tax levels, April 2026 to March 2027", href: "https://www.gov.wales/council-tax-levels-april-2026-march-2027" },
  { label: "Scottish Government: Council Tax datasets, Council Tax by band 2026-27", href: "https://www.gov.scot/publications/council-tax-datasets/" },
  { label: "GOV.UK: challenge your Council Tax band", href: "https://www.gov.uk/challenge-council-tax-band" },
  { label: "GOV.UK: second homes and empty properties", href: "https://www.gov.uk/council-tax/second-homes-and-empty-properties" },
  { label: "GOV.UK: Council Tax discounts for disabled people", href: "https://www.gov.uk/council-tax/discounts-for-disabled-people" },
];

function Notes() {
  return (
    <>
      <h2>Why the band matters more than the house</h2>
      <p>
        Your bill is your council&rsquo;s Band D charge times a fixed ratio for your band. In England and Wales the ratios run in ninths, from 6/9 for Band A to 18/9 for Band H (and 21/9
        for Band I in Wales), so a Band H home pays three times a Band A home in the same street. Scotland uses 360ths and steeper ratios for the top bands.
      </p>
      <div className="sa-tablewrap">
        <table>
          <caption className="sr-only">Average council tax by band, 2026/27, before discounts</caption>
          <thead>
            <tr>
              <th scope="col">Band</th>
              <th scope="col">England</th>
              <th scope="col">Wales</th>
              <th scope="col">Scotland</th>
            </tr>
          </thead>
          <tbody>
            {BANDS.map((b) => (
              <tr key={b}>
                <th scope="row">{b}</th>
                <td>{gbp(avg("england", b))}</td>
                <td>{gbp(avg("wales", b))}</td>
                <td>{gbp(avg("scotland", b))}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">I</th>
              <td>–</td>
              <td>{gbp(avg("wales", "I"))}</td>
              <td>–</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Where you live matters almost as much. Band D in England runs from {gbp(ENG.low[2])} in {ENG.low[1]} to {gbp(ENG.high[2])} in {ENG.high[1]}; in Wales from {gbp(WAL.low[2])} in{" "}
        {WAL.low[1]} to {gbp(WAL.high[2])} in {WAL.high[1]}; and in Scotland from {gbp(SCO.low[2])} in {SCO.low[1]} to {gbp(SCO.high[2])} in {SCO.high[1]}. Scottish bills also carry
        Scottish Water&rsquo;s water and waste water charges, which are not in these figures.
      </p>

      <h2>Your band is a 1991 price, not today&rsquo;s</h2>
      <p>
        Homes in England and Scotland were banded on what they would have sold for on 1 April 1991, and in Wales on 1 April 2003. Bands have not been revalued since, so two homes worth the
        same today can sit in different bands, and new-build homes are given the band they would have had then. Today&rsquo;s value tells you nothing directly: what counts is how your home
        compares with similar ones nearby.
      </p>

      <h2>Checking and challenging a band</h2>
      <p>
        Look up your neighbours&rsquo; bands on GOV.UK (or the Scottish Assessors&rsquo; site). If most homes of the same type, size and age on your street are in a lower band, you have
        evidence. You have a legal right to challenge if you started paying council tax on the home less than 6 months ago, the band changed in the last 6 months, or the home or the area
        has physically changed. Otherwise you can ask for a band review with up to 5 similar homes in a lower band, or sale prices from 1 April 1989 to 31 March 1993 (1 April 2001 to 31
        March 2005 in Wales). Keep paying the current bill while it is looked at; if the band falls, the council refunds the difference, usually back to when you became liable.
      </p>

      <h2>What changes the bill in your band</h2>
      <ul>
        <li>
          <strong>Who lives there.</strong>{" "}One adult who counts gets 25% off, and none gets 50% off. The <Link href="/uk/property/single-person-discount">single person discount calculator</Link>{" "}
          checks who is disregarded.
        </li>
        <li>
          <strong>A low income.</strong>{" "}<Link href="/uk/benefits/council-tax-reduction">Council Tax Reduction</Link>{" "}can cut the bill by up to 100% for pension-age households, and by
          whatever your council&rsquo;s scheme allows for working-age ones.
        </li>
        <li>
          <strong>Disability.</strong>{" "}If your home has an extra room, bathroom or wheelchair space a disabled resident needs, you are billed one band lower. In Band A, one-ninth of Band D
          comes off instead: {gbp(ENG_DISABLED_A.payable)} rather than {gbp(ENG_DISABLED_A.fullBill)} at the England average.
        </li>
        <li>
          <strong>Second and empty homes.</strong>{" "}Councils in England can double the bill on second homes and homes empty for a year, triple it after 5 years and quadruple it after 10.
          Wales allows up to 300% extra; Scotland up to 100%.
        </li>
        <li>
          <strong>Students.</strong>{" "}A home where everyone is a full-time student pays nothing: see the <Link href="/uk/students/student-council-tax">student council tax calculator</Link>.
        </li>
      </ul>
    </>
  );
}

export default async function CouncilTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/single-person-discount", "/uk/benefits/council-tax-reduction", "/uk/students/student-council-tax", "/uk/life/pro-rata-rent", "/uk/benefits/universal-credit"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Council Tax Band Calculator"
      lead="Your 2026/27 council tax for any band A to H (I in Wales), at your council's Band D rate, a year and a month, with discounts and premiums."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CouncilTaxStudio query={query} />
    </CalcPage>
  );
}
