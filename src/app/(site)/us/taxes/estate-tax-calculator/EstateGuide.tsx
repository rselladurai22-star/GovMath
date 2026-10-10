import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** US estate tax guide. Figures from src/lib/us/estate-property.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who-pays", title: "Who pays estate tax" },
  { id: "exclusion", title: "The $15 million exclusion" },
  { id: "gross-estate", title: "What counts in the estate" },
  { id: "deductions", title: "What comes off" },
  { id: "example", title: "A worked example" },
  { id: "rates", title: "The rate schedule" },
  { id: "unified", title: "Gifts and the estate share one exclusion" },
  { id: "annual", title: "The $19,000 annual exclusion" },
  { id: "gifting", title: "What a gifting plan saves" },
  { id: "marital", title: "Leaving everything to a spouse" },
  { id: "portability", title: "Portability and the DSUE" },
  { id: "noncitizen", title: "A spouse who is not a citizen" },
  { id: "charity", title: "Leaving money to charity" },
  { id: "states", title: "State estate and inheritance taxes" },
  { id: "basis", title: "Step-up in basis" },
  { id: "retirement", title: "Retirement accounts and life insurance" },
  { id: "filing", title: "Form 706 and deadlines" },
  { id: "history", title: "How the exclusion has changed" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: What's new — estate and gift tax (2026 basic exclusion and annual exclusion)", href: "https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax" },
  { label: "IRS: Estate tax", href: "https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax" },
  { label: "IRS: Frequently asked questions on gift taxes", href: "https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes" },
  { label: "IRS: Instructions for Form 706", href: "https://www.irs.gov/forms-pubs/about-form-706" },
  { label: "IRS: Revenue Procedure 2025-32 (2026 inflation adjustments)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "26 U.S. Code § 2001: Imposition and rate of tax", href: "https://www.law.cornell.edu/uscode/text/26/2001" },
  { label: "Tax Foundation: Estate and inheritance taxes by state", href: "https://taxfoundation.org/data/all/state/estate-inheritance-taxes/" },
];

const SCHEDULE: [number, number, number][] = [
  [0, 10_000, 18],
  [10_000, 20_000, 20],
  [20_000, 40_000, 22],
  [40_000, 60_000, 24],
  [60_000, 80_000, 26],
  [80_000, 100_000, 28],
  [100_000, 150_000, 30],
  [150_000, 250_000, 32],
  [250_000, 500_000, 34],
  [500_000, 750_000, 37],
  [750_000, 1_000_000, 39],
];

export default function EstateGuide() {
  return (
    <Guide
      kicker="The estate tax guide"
      title="How the federal estate tax works in 2026"
      intro={
        <>
          Very few estates pay federal estate tax: in 2026 each person can leave $15 million, and a married couple $30 million, before any is due. Above that the rate is 40%.
          This guide explains what counts in an estate, what comes off, how lifetime gifts and the $19,000 annual exclusion fit in, how portability works for couples, and
          which states tax estates far smaller than that.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>For deaths in 2026 the basic exclusion is {usd(15_000_000)} a person. It rises with inflation from 2027.</li>
          <li>Above the exclusion, every dollar is taxed at 40%.</li>
          <li>Everything left to a spouse who is a US citizen, and everything left to charity, is deducted in full.</li>
          <li>A {usd(20_000_000)} estate with {usd(800_000)} of debts and costs owes {usd(1_680_000)}, or 8.4% of the estate.</li>
          <li>Twelve states and Washington, DC, have their own estate tax, and five states tax inheritances. Several start at {usd(1_000_000)} to {usd(5_000_000)}.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$15m", label: "Basic exclusion per person, 2026" },
            { value: "40%", label: "Rate above the exclusion" },
            { value: usd(19_000), label: "Annual gift exclusion per recipient" },
            { value: "$30m", label: "What a couple can pass with portability" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who-pays" n={2} kicker="Basics" title="Who pays estate tax">
        <p>
          The federal estate tax is a tax on the transfer of property at death. It is paid by the estate, out of the assets, before heirs receive their shares. The heirs do not
          pay it themselves, and they do not report what they inherit as income. That is the main difference from an <strong>inheritance tax</strong>, which a handful of states
          charge to the person who inherits, at a rate that depends on how closely they were related.
        </p>
        <p>
          Because the exclusion is so high, only a tiny share of estates owe anything. Most families never file an estate tax return at all. The tax still matters to anyone
          with a large business, a lot of real estate, or a big life insurance policy, and to couples who want to keep the option of passing on two full exclusions.
        </p>
      </GuideSection>

      <GuideSection id="exclusion" n={3} kicker="2026" title="The $15 million exclusion">
        <p>
          The <strong>basic exclusion amount</strong>{" "}is {usd(15_000_000)} for a person who dies in 2026. The One Big Beautiful Bill Act (Public Law 119-21), signed in July
          2025, set it at that figure and made it permanent, with inflation increases from 2027. Before the law, the higher exclusion from the 2017 tax law was due to fall back
          to about half its level in 2026.
        </p>
        <p>
          The exclusion works as a credit, called the applicable credit amount. The IRS works out the tax on the whole estate using the rate schedule, then subtracts the tax that
          the schedule would charge on {usd(15_000_000)}: {usd(5_945_800)}. Since the schedule reaches 40% at {usd(1_000_000)}, the effect is simple: nothing is due up to the
          exclusion, and 40% is due on everything above it.
        </p>
      </GuideSection>

      <GuideSection id="gross-estate" n={4} kicker="What counts" title="What counts in the estate">
        <p>The gross estate is everything the person owned or controlled at death, at fair market value on the date of death. It includes:</p>
        <ul>
          <li>Homes, land and rental property, including the person&rsquo;s share of anything owned jointly.</li>
          <li>Bank accounts, brokerage accounts, stocks, bonds and funds.</li>
          <li>Traditional and Roth IRAs, 401(k)s and pensions with a survivor benefit.</li>
          <li>Business interests: a share of an LLC, partnership or corporation, valued as a whole.</li>
          <li>Life insurance on the person&rsquo;s life, if they owned the policy or could change the beneficiary.</li>
          <li>Cars, art, jewelry, collections and other personal property.</li>
          <li>Assets in a revocable living trust. A revocable trust avoids probate but not estate tax.</li>
        </ul>
        <p>
          Life insurance is the item that most often surprises families. A {usd(5_000_000)} policy owned by the insured person counts in full, even though the money goes straight
          to the beneficiary. An irrevocable life insurance trust that owns the policy keeps it out.
        </p>
      </GuideSection>

      <GuideSection id="deductions" n={5} kicker="Deductions" title="What comes off">
        <p>The taxable estate is the gross estate less these deductions:</p>
        <ul>
          <li><strong>Debts</strong>: mortgages, loans, credit cards and unpaid income tax.</li>
          <li><strong>Funeral and administration costs</strong>: the funeral, executor and attorney fees, appraisals and court costs.</li>
          <li><strong>The marital deduction</strong>: everything left to a spouse who is a US citizen, with no limit.</li>
          <li><strong>The charitable deduction</strong>: everything left to qualifying charities, with no limit.</li>
          <li><strong>State death taxes</strong>: estate or inheritance tax paid to a state.</li>
        </ul>
        <p>
          Taxable gifts made during life are then added back, because the estate and gift taxes share one exclusion. The calculator follows the same order: gross estate, less
          deductions, plus lifetime gifts, then the tax on the total less the credit.
        </p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Worked example" title="A worked example">
        <p>A widowed person dies in 2026 owning {usd(20_000_000)} of property, with a {usd(500_000)} mortgage and {usd(300_000)} of funeral and settlement costs.</p>
        <WorkedExample
          title="$20 million estate, single, 2026"
          steps={[
            { label: "Gross estate", value: usd(20_000_000) },
            { label: "Debts and costs", note: "$500,000 + $300,000", value: "−" + usd(800_000) },
            { label: "Taxable estate", value: usd(19_200_000) },
            { label: "Tentative tax on $19.2 million", value: usd(7_625_800) },
            { label: "Credit on the $15 million exclusion", value: "−" + usd(5_945_800) },
          ]}
          total={{ label: "Federal estate tax", value: usd(1_680_000) }}
        />
        <p>
          The {usd(4_200_000)} above the exclusion is taxed at 40%, which gives the same {usd(1_680_000)}. The heirs receive {usd(17_520_000)}. The tax is 8.4% of the gross
          estate, even though the rate on the top slice is 40%.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={7} kicker="Rates" title="The rate schedule">
        <p>
          The estate and gift taxes use one schedule in section 2001(c) of the tax code. It starts at 18% and climbs to 40% on amounts over {usd(1_000_000)}. The lower steps only
          matter in working out the credit: because the exclusion is far above {usd(1_000_000)}, any estate that owes tax pays 40% on every dollar over the exclusion.
        </p>
        <DataTable
          caption="Unified rate schedule (estate and gift tax)"
          head={["Amount", "Rate on this slice"]}
          numeric={[1]}
          rows={[...SCHEDULE.map(([a, b, r]) => [`${usd(a)} to ${usd(b)}`, `${r}%`]), ["Over $1,000,000", "40%"]]}
        />
        <p>
          The tentative tax on {usd(1_000_000)} is {usd(345_800)}, and on {usd(15_000_000)} it is {usd(5_945_800)}. That second figure is the 2026 credit.
        </p>
      </GuideSection>

      <GuideSection id="unified" n={8} kicker="Gift tax" title="Gifts and the estate share one exclusion">
        <p>
          The {usd(15_000_000)} covers both gifts made in life and the estate at death. Gifts above the annual exclusion are reported on Form 709 and use up part of it. Nobody
          pays gift tax until their lifetime taxable gifts pass the exclusion.
        </p>
        <p>
          At death, those taxable gifts are added back to the taxable estate. In the example, if the person had also made {usd(2_000_000)} of taxable gifts in life, the tax base
          becomes {usd(21_200_000)} and the estate tax rises from {usd(1_680_000)} to {usd(2_480_000)}. The gifts still helped: any growth on the money given away happened
          outside the estate.
        </p>
        <Callout title="The clawback question is settled">
          IRS regulations say gifts made while the exclusion was high won&rsquo;t be taxed later if the exclusion falls. With the 2026 law making {usd(15_000_000)} permanent, that
          matters less than it did in 2024 and 2025.
        </Callout>
      </GuideSection>

      <GuideSection id="annual" n={9} kicker="Annual exclusion" title="The $19,000 annual exclusion">
        <p>
          In 2026 you can give up to {usd(19_000)} to each person you choose without filing a gift tax return and without using any of your {usd(15_000_000)}. A married couple
          can give {usd(38_000)} to each person by splitting gifts (they file Form 709 to elect it unless each gives from their own money). The amount is the same as in 2025.
        </p>
        <p>Some gifts are free of gift tax with no limit at all:</p>
        <ul>
          <li>Tuition paid directly to a school or college.</li>
          <li>Medical bills paid directly to the doctor or hospital.</li>
          <li>Gifts to a spouse who is a US citizen.</li>
          <li>Gifts to charity and to political organizations.</li>
        </ul>
        <p>
          A gift of {usd(19_000)} into a 529 plan counts against the annual exclusion, but a special rule lets you count up to five years of exclusions at once, so you can
          front-load {usd(95_000)} for one child in a single year.
        </p>
      </GuideSection>

      <GuideSection id="gifting" n={10} kicker="Planning" title="What a gifting plan saves">
        <p>
          Annual gifts are the simplest way to shrink a taxable estate. Every dollar given away within the annual exclusion leaves the estate without touching the
          {" "}{usd(15_000_000)}.
        </p>
        <Bars
          format={usd}
          items={[
            { label: "One person, 4 recipients, 10 years", value: 760_000 },
            { label: "A couple, 4 recipients, 10 years", value: 1_520_000 },
            { label: "A couple, 6 recipients, 10 years", value: 2_280_000 },
          ]}
        />
        <p>
          On an estate already above the exclusion, each dollar moved out saves 40 cents. The couple giving to four children and grandchildren for ten years moves
          {" "}{usd(1_520_000)} out and saves {usd(608_000)} of estate tax, plus 40% of whatever that money would have earned. On an estate under the exclusion, gifts save no
          federal estate tax at all, though they may still save state estate tax.
        </p>
      </GuideSection>

      <GuideSection id="marital" n={11} kicker="Married couples" title="Leaving everything to a spouse">
        <p>
          Anything left to a surviving spouse who is a US citizen is deducted in full, so a married person who leaves everything to their spouse owes no estate tax on the first
          death, however large the estate. The tax is postponed, not removed: what the survivor still owns at their own death is taxed in their estate.
        </p>
        <p>
          Property can pass to a spouse outright or through a trust that qualifies for the deduction, such as a QTIP trust, which pays the survivor income for life and then
          goes to the children of the first marriage.
        </p>
      </GuideSection>

      <GuideSection id="portability" n={12} kicker="Portability" title="Portability and the DSUE">
        <p>
          When the first spouse dies, any exclusion they didn&rsquo;t use can pass to the survivor. This is the <strong>deceased spousal unused exclusion</strong>, or DSUE. It
          is not automatic: the executor must file Form 706 and elect it, even if no tax is due.
        </p>
        <p>
          Say a spouse died in 2025, when the exclusion was {usd(13_990_000)}, and left everything to the survivor. If portability was elected, the survivor who dies in 2026
          has {usd(15_000_000)} of their own plus {usd(13_990_000)} of DSUE: {usd(28_990_000)}. On a {usd(40_000_000)} estate, that brings the tax down from{" "}
          {usd(10_000_000)} to {usd(4_404_000)}.
        </p>
        <CompareCards
          columns={[
            { name: "No portability", rows: [{ label: "Exclusion", value: usd(15_000_000) }, { label: "Tax on $40m", value: usd(10_000_000) }] },
            { name: "Portability elected", rows: [{ label: "Exclusion", value: usd(28_990_000) }, { label: "Tax on $40m", value: usd(4_404_000) }] },
          ]}
        />
        <p>
          The DSUE is fixed at the figure when the first spouse died; it does not grow with inflation. It also comes from the most recent late spouse only, so it can be lost on
          remarriage if the new spouse dies first.
        </p>
      </GuideSection>

      <GuideSection id="noncitizen" n={13} kicker="Non-citizen spouse" title="A spouse who is not a citizen">
        <p>
          The unlimited marital deduction applies only to a spouse who is a US citizen. Property left to a non-citizen spouse is taxed unless it passes through a qualified
          domestic trust (QDOT), which postpones the tax until the money is paid out. During life, gifts to a non-citizen spouse are free of gift tax only up to {usd(194_000)}{" "}
          in 2026.
        </p>
      </GuideSection>

      <GuideSection id="charity" n={14} kicker="Charity" title="Leaving money to charity">
        <p>
          Bequests to qualifying charities are deducted in full. In the {usd(20_000_000)} example, leaving {usd(2_000_000)} to charity cuts the tax from {usd(1_680_000)} to
          {" "}{usd(880_000)}. The gift costs the other heirs only {usd(1_200_000)}, because {usd(800_000)} of it would otherwise have gone in tax.
        </p>
        <p>
          Retirement accounts are often the best assets to leave to charity: a charity pays no income tax on a traditional IRA, while a child would pay income tax on every
          withdrawal.
        </p>
      </GuideSection>

      <GuideSection id="states" n={15} kicker="States" title="State estate and inheritance taxes">
        <p>
          Twelve states and Washington, DC, charge their own estate tax, and five states charge an inheritance tax. Maryland charges both. Many state exemptions are far below
          the federal one, so a {usd(3_000_000)} estate can owe nothing federally and still owe a state.
        </p>
        <DataTable
          caption="State estate taxes (Tax Foundation, rates and exemptions as of October 1, 2025)"
          head={["State", "Exemption", "Top rate"]}
          numeric={[1, 2]}
          rows={[
            ["Oregon", usd(1_000_000), "16%"],
            ["Rhode Island", usd(1_802_431), "16%"],
            ["Massachusetts", usd(2_000_000), "16%"],
            ["Minnesota", usd(3_000_000), "16%"],
            ["Washington", usd(3_000_000), "35%"],
            ["Illinois", usd(4_000_000), "16%"],
            ["District of Columbia", usd(4_873_200), "16%"],
            ["Maryland", usd(5_000_000), "16%"],
            ["Vermont", usd(5_000_000), "16%"],
            ["Hawaii", usd(5_490_000), "20%"],
            ["Maine", usd(7_000_000), "12%"],
            ["New York", usd(7_160_000), "16%"],
            ["Connecticut", usd(13_990_000), "12%"],
          ]}
        />
        <p>
          The inheritance tax states are Kentucky, Maryland, Nebraska, New Jersey and Pennsylvania. Spouses are exempt in all five, and children are exempt everywhere except
          Nebraska and Pennsylvania, which tax them at low rates. Iowa ended its inheritance tax in 2025. Several exemptions are indexed and change each year, and New York has a
          &quot;cliff&quot;: an estate more than 5% over the exemption loses it entirely. The calculator flags these states but doesn&rsquo;t work out the state bill.
        </p>
      </GuideSection>

      <GuideSection id="basis" n={16} kicker="Income tax" title="Step-up in basis">
        <p>
          Heirs who inherit stocks, a home or other property get a new cost basis equal to its value at death. If a parent bought shares for {usd(100_000)} that are worth
          {" "}{usd(1_000_000)} at death, the child can sell them for {usd(1_000_000)} and owe no capital gains tax. This is often worth more to a family than estate planning,
          and it is a reason to keep highly appreciated assets until death rather than give them away. A gift during life keeps the giver&rsquo;s old basis.
        </p>
        <p>
          Our <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}shows what selling an inherited asset later would cost.
        </p>
      </GuideSection>

      <GuideSection id="retirement" n={17} kicker="Accounts" title="Retirement accounts and life insurance">
        <p>
          Traditional IRAs and 401(k)s are taxed twice in a large estate: estate tax on their value, then income tax when heirs withdraw. Most non-spouse heirs must empty an
          inherited account within ten years. Heirs can claim an income tax deduction for the estate tax paid on the account (income in respect of a decedent), which softens
          the overlap. A spouse can roll the account into their own IRA.
        </p>
        <p>
          Roth accounts carry no income tax for heirs. Converting to a Roth during life shrinks the estate by the income tax paid. Our{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a>{" "}shows how a Roth grows.
        </p>
      </GuideSection>

      <GuideSection id="filing" n={18} kicker="Paperwork" title="Form 706 and deadlines">
        <ul>
          <li>An estate must file Form 706 if the gross estate plus lifetime taxable gifts is over the exclusion, even if deductions bring the tax to zero.</li>
          <li>The return and any tax are due nine months after death. A six-month extension to file is available, but the tax is still due at nine months.</li>
          <li>To elect portability, a smaller estate can file within five years of death under a simplified IRS procedure.</li>
          <li>Gift tax returns (Form 709) are due by April 15 of the year after the gift: April 15, 2027, for gifts made in 2026.</li>
        </ul>
        <p>
          Estates that are mostly a family business can sometimes pay the tax over up to 14 years, and farms and businesses can use special-use valuation. An estate attorney or
          CPA handles these.
        </p>
      </GuideSection>

      <GuideSection id="history" n={19} kicker="History" title="How the exclusion has changed">
        <p>The exclusion has risen sharply over the past 25 years. A few markers:</p>
        <Bars
          format={usd}
          items={[
            { label: "2001", value: 675_000 },
            { label: "2009", value: 3_500_000 },
            { label: "2017", value: 5_490_000 },
            { label: "2018", value: 11_180_000 },
            { label: "2025", value: 13_990_000 },
            { label: "2026", value: 15_000_000 },
          ]}
        />
        <p>
          Because the figure is now indexed to inflation from 2027, it should keep rising slowly. Congress can change it again, so plans built around a single number are worth
          reviewing every few years.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Forgetting that life insurance you own counts in your estate.</li>
          <li>Skipping Form 706 on the first death and losing the survivor&rsquo;s DSUE.</li>
          <li>Ignoring state estate tax, which can start at {usd(1_000_000)}.</li>
          <li>Giving away appreciated assets in life and losing the step-up in basis, when cash would have done.</li>
          <li>Leaving everything to a non-citizen spouse without a QDOT.</li>
          <li>Assuming a revocable living trust removes assets from the taxable estate.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={21} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the gross estate at today&rsquo;s market values, including life insurance you own and retirement accounts.</li>
          <li>Enter debts, and anything left to a spouse or charity.</li>
          <li>Pick your state to see if it has its own estate or inheritance tax.</li>
          <li>Under More options, add taxable gifts from past Form 709s, any DSUE from a late spouse, and a gifting plan.</li>
          <li>Check the table to see how the tax changes as the estate grows.</li>
        </ol>
        <p>
          To see how an estate might grow before then, try our <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>; to plan income in retirement,
          the <a href="/us/savings/retirement-calculator">retirement calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026 figure"]}
          rows={[
            ["Basic exclusion per person", usd(15_000_000)],
            ["Couple with portability", usd(30_000_000)],
            ["Top estate and gift tax rate", "40%"],
            ["Annual gift exclusion per recipient", usd(19_000)],
            ["Annual gifts to a non-citizen spouse", usd(194_000)],
            ["Credit (tax on the exclusion)", usd(5_945_800)],
            ["Form 706 due", "9 months after death"],
            ["Form 709 due for 2026 gifts", "April 15, 2027"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
