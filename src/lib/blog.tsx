import Link from "next/link";
import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter title for search results (the page's <title>), when `title` is too long. */
  seoTitle?: string;
  description: string;
  /** ISO date for metadata + sorting. */
  date: string;
  /** Human label shown in the UI. */
  dateLabel: string;
  readingTime: string;
  category: string;
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "inheritance-tax-explained",
    title: "Inheritance Tax in 2026/27: how it is worked out, with real examples",
    seoTitle: "Inheritance Tax 2026/27: How It Works, Examples",
    description:
      "How Inheritance Tax is worked out in 2026/27: the £325,000 and £175,000 bands, couples, gifts, the £2m taper, charity, business relief and pensions from 2027.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "12 min read",
    category: "Everyday Life",
    body: (
      <>
        <p>
          Inheritance Tax is the tax paid on what a person leaves when they die. Most estates pay nothing, because the
          first £325,000 is tax free, a further £175,000 is tax free when a home goes to children or grandchildren, and
          everything left to a husband, wife or civil partner is exempt. But the allowances have been frozen since 2009
          and 2020, house prices have kept rising, and from April 2027 most unused pensions will count too. Each year
          more families find that a bill is due.
        </p>
        <p>
          This guide explains how the tax is worked out for deaths in the 2026/27 tax year, step by step, with worked
          examples for a single person, a married couple, a large estate, lifetime gifts, a charity gift, a family farm
          and a pension. Every figure comes from the same engine as our{" "}
          <Link href="/life/inheritance-tax">inheritance tax calculator</Link>, so you can put in your own numbers and
          check the result.
        </p>

        <h2>The sum in five steps</h2>
        <p>
          Every Inheritance Tax bill follows the same five steps. Getting each one right matters more than any clever
          planning idea.
        </p>
        <ol>
          <li>
            <strong>Add up the estate.</strong>{" "}Everything the person owned when they died: their home or their
            share of it, savings, investments, other property, cars, jewellery and belongings, and money owed to them.
            From 6 April 2027 most unused pension funds are added as well.
          </li>
          <li>
            <strong>Take off debts and funeral costs.</strong>{" "}A mortgage, credit cards, unpaid bills and a
            reasonable funeral all come off. The result is the net estate.
          </li>
          <li>
            <strong>Take off reliefs and exemptions.</strong>{" "}Business and agricultural relief, anything left to a
            spouse or civil partner, and anything left to charity.
          </li>
          <li>
            <strong>Take off the tax-free bands.</strong>{" "}The nil-rate band of £325,000, less any of it used up by
            gifts made in the last seven years, and the residence nil-rate band of up to £175,000.
          </li>
          <li>
            <strong>Charge 40% on the rest.</strong>{" "}Or 36% if at least 10% of the estate goes to charity.
          </li>
        </ol>
        <p>
          Both bands are frozen until at least April 2030. Because they do not rise with prices, a typical estate that
          was comfortably below the line ten years ago may now be above it.
        </p>

        <h2>What counts as part of the estate</h2>
        <p>
          The estate is wider than many people expect. As well as the obvious things, it includes:
        </p>
        <ul>
          <li>a share of anything owned jointly, such as half of a home held with a partner or a joint bank account;</li>
          <li>ISAs, which are free of Income Tax and Capital Gains Tax but not of Inheritance Tax;</li>
          <li>
            life insurance that pays out to the estate, unless the policy was written in trust so that it goes
            straight to the people named;
          </li>
          <li>assets held abroad, for people who are treated as long-term UK residents;</li>
          <li>
            gifts the person kept using, such as a house given to a child while the parent carried on living in it
            rent free (a &ldquo;gift with reservation of benefit&rdquo;);
          </li>
          <li>
            from 6 April 2027, unused defined contribution pension funds and most lump sums paid from a pension on
            death.
          </li>
        </ul>
        <p>
          A few things fall outside it: death-in-service lump sums from an employer, pensions already turned into an
          annuity that stops on death, and, until April 2027, unused pension funds that the scheme pays out at its
          discretion.
        </p>

        <h2>The nil-rate band: the first £325,000</h2>
        <p>
          Everyone has a nil-rate band of £325,000. The first £325,000 of the estate, after debts, reliefs and
          exemptions, is taxed at 0%. The band is shared between the estate and any gifts made in the seven years
          before death: gifts use it first, in the order they were made, and only what is left protects the estate.
          That is why a large gift a few years before death can leave the estate itself fully taxable, as one of the
          examples below shows.
        </p>

        <h2>The residence nil-rate band: up to £175,000 more</h2>
        <p>
          The residence nil-rate band adds up to £175,000 when a home, or a share of one, passes to direct
          descendants. Direct descendants are children, grandchildren and their children, including stepchildren,
          adopted and foster children, and their spouses or civil partners. Nieces, nephews, brothers, sisters and
          friends do not count.
        </p>
        <p>The band has three limits that catch people out:</p>
        <ul>
          <li>
            <strong>It is capped at the value of the home.</strong>{" "}If the home left to the children is worth
            £120,000, the band is £120,000, not £175,000.
          </li>
          <li>
            <strong>It must be a home the person lived in at some point.</strong>{" "}A buy-to-let flat they never lived
            in does not qualify.
          </li>
          <li>
            <strong>It tapers away on large estates.</strong>{" "}For every £2 the net estate is above £2 million, £1 of
            the band is lost. A single person loses all of it at £2.35 million.
          </li>
        </ul>
        <p>
          If the person sold their home or moved somewhere cheaper after 8 July 2015, for example into a smaller flat
          or into a care home, a &ldquo;downsizing addition&rdquo; can keep some or all of the band, provided other
          assets of the same value go to direct descendants.
        </p>

        <h2>Example 1: a single person with a home</h2>
        <p>
          Margaret is divorced, so she has no bands transferred from a late partner. She leaves a home worth £400,000 and £150,000 of savings and investments to her two
          daughters, and has £10,000 of debts and funeral costs.
        </p>
        <table>
          <thead>
            <tr>
              <th>Margaret&rsquo;s estate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Home</td><td>£400,000</td></tr>
            <tr><td>Savings and investments</td><td>£150,000</td></tr>
            <tr><td>Less debts and funeral</td><td>−£10,000</td></tr>
            <tr><td>Net estate</td><td>£540,000</td></tr>
            <tr><td>Less nil-rate band</td><td>−£325,000</td></tr>
            <tr><td>Less residence nil-rate band</td><td>−£175,000</td></tr>
            <tr><td>Taxable</td><td>£40,000</td></tr>
            <tr><td>Inheritance Tax at 40%</td><td>£16,000</td></tr>
          </tbody>
        </table>
        <p>
          The bill is £16,000, or about 3% of the net estate. Now change one detail: Margaret has no children and
          leaves everything to her nephew. The residence nil-rate band no longer applies, the taxable amount jumps to
          £215,000 and the bill becomes <strong>£86,000</strong>. Who inherits the home matters as much as what it is
          worth.
        </p>

        <h2>Married couples and civil partners</h2>
        <p>
          Anything left to a husband, wife or civil partner is free of Inheritance Tax, however large, as long as both
          are treated as UK resident for the tax. So when the first partner dies and leaves everything to the other,
          there is usually no tax at all, and none of their own bands are used.
        </p>
        <p>
          The unused share of both bands then passes to the surviving partner. When the survivor dies, their estate
          can use up to two nil-rate bands (£650,000) and two residence nil-rate bands (£350,000): £1 million in total.
          The transfer is made as a percentage, so if the first partner used 40% of their band on gifts to children,
          60% is carried over. It also works for a partner who died before the residence band existed: the survivor
          still gets their full 100% of it.
        </p>
        <table>
          <thead>
            <tr>
              <th>Surviving partner, full transfer, home £500,000 to children</th>
              <th>Other assets £300,000</th>
              <th>Other assets £600,000</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Net estate</td><td>£800,000</td><td>£1,100,000</td></tr>
            <tr><td>Nil-rate bands (2 × £325,000)</td><td>£650,000</td><td>£650,000</td></tr>
            <tr><td>Residence bands (2 × £175,000)</td><td>£350,000</td><td>£350,000</td></tr>
            <tr><td>Taxable</td><td>£0</td><td>£100,000</td></tr>
            <tr><td>Inheritance Tax</td><td>£0</td><td>£40,000</td></tr>
          </tbody>
        </table>
        <p>
          The transfer is not automatic. The executors must claim it on form IHT402 within two years of the second
          death, so keep the first partner&rsquo;s will, the value of their estate and any record of gifts. Unmarried
          partners, however long they have lived together, get neither the spouse exemption nor the transfer, which is
          one of the strongest financial arguments for marriage or civil partnership later in life.
        </p>

        <h2>Estates above £2 million: the taper</h2>
        <p>
          The residence band shrinks by £1 for every £2 the net estate is above £2 million. The taper is worked out on
          the net estate before reliefs and exemptions, so business property and gifts to a spouse still count towards
          the £2 million line. Three examples, each with an £800,000 home left to children:
        </p>
        <table>
          <thead>
            <tr>
              <th>Estate</th>
              <th>Residence band lost</th>
              <th>Residence band left</th>
              <th>Inheritance Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Single person, £2.2 million</td><td>£100,000</td><td>£75,000</td><td>£720,000</td></tr>
            <tr><td>Single person, £2.35 million</td><td>£175,000</td><td>£0</td><td>£810,000</td></tr>
            <tr><td>Surviving partner, full transfer, £2.2 million</td><td>£100,000</td><td>£250,000</td><td>£520,000</td></tr>
          </tbody>
        </table>
        <p>
          Between £2 million and £2.35 million, each extra £1 of estate costs 60p in tax for a single person: 40p on the
          pound itself and 20p because 50p of the residence band disappears. Gifts or charity legacies that bring the
          estate back under £2 million can therefore be unusually good value.
        </p>

        <h2>Gifts and the seven-year rule</h2>
        <p>
          Gifts made during a person&rsquo;s life are usually free of Inheritance Tax if they live for seven years
          afterwards. A gift to another person is a &ldquo;potentially exempt transfer&rdquo;: nothing is due when it
          is made, but if the giver dies within seven years it is brought back into the sum. Gifts into most trusts are
          different: they can be taxed at 20% straight away on anything above the nil-rate band.
        </p>
        <p>Some gifts are exempt from the start and never come back into the sum:</p>
        <ul>
          <li><strong>The annual exemption:</strong>{" "}£3,000 a tax year in total, and last year&rsquo;s unused £3,000 can be carried forward once.</li>
          <li><strong>Small gifts:</strong>{" "}up to £250 a person a tax year, to as many people as you like (but not to someone who also gets part of the £3,000).</li>
          <li><strong>Wedding and civil partnership gifts:</strong>{" "}£5,000 to a child, £2,500 to a grandchild, £1,000 to anyone else.</li>
          <li>
            <strong>Regular gifts out of surplus income:</strong>{" "}gifts that are part of a pattern, come from income
            rather than savings and leave you enough to keep your usual standard of living. There is no upper limit, but
            keep records of income, spending and gifts so the executors can prove it.
          </li>
          <li><strong>Gifts to a spouse, civil partner, charity or political party.</strong></li>
        </ul>
        <p>
          When a gift does come back into the sum, it uses up the nil-rate band first. Tax is only charged on the gift
          itself if it is bigger than the band, and that tax is cut by <strong>taper relief</strong> when the giver
          lived for more than three years after making it. Take a gift of £425,000 to a child (after exemptions), so
          £100,000 is above the band:
        </p>
        <table>
          <thead>
            <tr>
              <th>Years between gift and death</th>
              <th>Taper relief</th>
              <th>Tax on the gift</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Less than 3</td><td>0%</td><td>£40,000</td></tr>
            <tr><td>3 to 4</td><td>20%</td><td>£32,000</td></tr>
            <tr><td>4 to 5</td><td>40%</td><td>£24,000</td></tr>
            <tr><td>5 to 6</td><td>60%</td><td>£16,000</td></tr>
            <tr><td>6 to 7</td><td>80%</td><td>£8,000</td></tr>
            <tr><td>7 or more</td><td>100%</td><td>£0</td></tr>
          </tbody>
        </table>
        <p>
          Two points are often misunderstood. Taper relief reduces the tax on the gift, not the value of the gift, so
          it does nothing for a gift that fits inside the nil-rate band. And the gift still uses up the band for seven
          full years. In this example the giver also left £300,000 at death with no home going to children. Because the
          gift had already used all of the band, the whole £300,000 was taxed at 40%: <strong>£120,000</strong> on the
          estate on top of the tax on the gift. The person who received the gift normally pays the tax on it; the
          estate pays the rest.
        </p>
        <p>
          A gift of something other than cash, such as shares or a second property, can also trigger Capital Gains Tax
          for the giver at the time of the gift, whereas assets kept until death are free of Capital Gains Tax. Our{" "}
          <Link href="/investing/capital-gains-assets">capital gains tax calculator</Link> shows what a gift of an
          asset that has grown in value would cost now.
        </p>

        <h2>Leaving 10% to charity: the 36% rate</h2>
        <p>
          Gifts to charity are exempt, and if at least 10% of the &ldquo;baseline amount&rdquo; goes to charity, the
          rest of the taxable estate is charged at 36% instead of 40%. The baseline is roughly the estate after debts,
          reliefs, other exemptions and the nil-rate band, with the charity gift added back. The residence band is not
          taken off when working it out.
        </p>
        <p>
          Take David, who is single with no children and leaves £800,000 to friends and relatives. With no charity gift,
          the taxable amount is £475,000 and the bill is £190,000, so his heirs share £610,000. If he leaves £47,500 to
          charity (10% of the £475,000 baseline), the taxable amount falls to £427,500, the rate falls to 36% and the
          bill becomes £153,900. His heirs now share £598,600.
        </p>
        <p>
          So a £47,500 gift to charity costs his family only £11,400. The rest is paid for by the tax saved. If you
          are already planning a legacy, it is worth checking how close it is to the 10% line, and a will can be worded
          to pay &ldquo;whatever is needed to reach 10%&rdquo; so the gift stays right as values change.
        </p>

        <h2>Business, farms and AIM shares after April 2026</h2>
        <p>
          Business relief and agricultural relief used to take qualifying property out of the sum completely. From 6
          April 2026 the full 100% relief applies only to the first £2.5 million of qualifying business and
          agricultural property combined. Above that, relief is 50%, so the excess is effectively taxed at 20%. The
          £2.5 million allowance can be passed to a surviving spouse or civil partner in the same way as the nil-rate
          band, so a couple can shelter up to £5 million. Shares listed on AIM that qualify for business relief now get
          50% relief, whatever their value.
        </p>
        <table>
          <thead>
            <tr>
              <th>Farmer: farm £3m, home £600,000, other £200,000</th>
              <th>Single, no transfer</th>
              <th>Surviving partner, full transfer</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Net estate</td><td>£3,800,000</td><td>£3,800,000</td></tr>
            <tr><td>Business and agricultural relief</td><td>£2,750,000</td><td>£3,000,000</td></tr>
            <tr><td>Nil-rate band</td><td>£325,000</td><td>£650,000</td></tr>
            <tr><td>Residence band (lost to the taper)</td><td>£0</td><td>£0</td></tr>
            <tr><td>Inheritance Tax</td><td>£290,000</td><td>£60,000</td></tr>
          </tbody>
        </table>
        <p>
          Notice that the residence band is lost completely in both cases. The £2 million taper looks at the estate
          before reliefs, so a farm that pays little tax still pushes the estate over the line. Tax on qualifying
          business and farm property can be paid in ten equal yearly instalments, interest free, which helps families
          who do not want to sell land or shares to pay it.
        </p>
        <p>
          For AIM shares: a single person with £200,000 of qualifying AIM shares and £400,000 of other assets, no
          home, gets £100,000 of relief and pays £70,000. Without the relief it would be £110,000.
        </p>

        <h2>Pensions from 6 April 2027</h2>
        <p>
          This is the biggest change for most families. Until now, money left in a defined contribution pension, such
          as a workplace pension or a personal pension, has usually been outside the estate. For deaths on or after 6
          April 2027, most unused pension funds and lump sum death benefits will be added to the estate and share its
          bands. Pensions left to a spouse or civil partner stay exempt, and death-in-service benefits stay outside.
        </p>
        <p>
          Take Peter, single, with a home worth £450,000 that goes to his children, £100,000 of savings and £250,000
          left in his pension:
        </p>
        <table>
          <thead>
            <tr>
              <th>Peter&rsquo;s estate</th>
              <th>Death before 6 April 2027</th>
              <th>Death on or after 6 April 2027</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Estate counted</td><td>£550,000</td><td>£800,000</td></tr>
            <tr><td>Tax-free bands</td><td>£500,000</td><td>£500,000</td></tr>
            <tr><td>Taxable</td><td>£50,000</td><td>£300,000</td></tr>
            <tr><td>Inheritance Tax</td><td>£20,000</td><td>£120,000</td></tr>
          </tbody>
        </table>
        <p>
          The pension adds £100,000 of tax. And if Peter was 75 or older when he died, his children will also pay
          Income Tax at their own rate when they draw the pension money, on what is left after Inheritance Tax. For a
          higher-rate taxpayer that combination can take well over half of the pension.
        </p>
        <p>
          It changes the old advice to spend other savings first and leave the pension untouched. For some people it
          will now make sense to draw more from the pension during their lifetime, use the tax-free cash, or make
          regular gifts out of the extra income. Our{" "}
          <Link href="/investing/pension-drawdown">pension drawdown calculator</Link> shows the Income Tax on
          different withdrawal plans. Check your expression of wishes with each scheme too: a pension nominated to a
          spouse stays exempt.
        </p>

        <h2>Who pays and when</h2>
        <p>
          The executors (or administrators, if there is no will) work out the tax, report the estate to HMRC and pay
          the bill out of the estate. Beneficiaries do not normally pay it themselves, except on a gift made within
          seven years.
        </p>
        <ul>
          <li>
            <strong>The deadline:</strong>{" "}tax is due by the end of the sixth month after the month of death. A death
            on 10 October 2026 means payment by 30 April 2027. Interest is charged after that.
          </li>
          <li>
            <strong>Before probate:</strong>{" "}in England and Wales, at least part of the tax must usually be paid
            before the grant of probate is issued, which can be awkward when the money is tied up in the estate. Banks
            and building societies can pay it straight to HMRC from the person&rsquo;s accounts under the Direct
            Payment Scheme.
          </li>
          <li>
            <strong>Instalments:</strong>{" "}tax on a home, land or a business can be paid over ten years. Interest is
            charged on the home, but not on qualifying business or farm property.
          </li>
          <li>
            <strong>Probate fee:</strong>{" "}separately, applying for probate in England and Wales costs £526 for an
            estate worth more than £5,000 (from 13 July 2026). Our{" "}
            <Link href="/life/probate-fees">probate fees calculator</Link> adds the cost of extra copies.
          </li>
        </ul>
        <p>
          If shares or property are sold for less than their value at death within a year (shares) or four years
          (land and buildings), the executors can claim back the tax on the loss.
        </p>

        <h2>Legitimate ways to reduce the bill</h2>
        <p>
          There is no shortage of schemes sold as ways to avoid Inheritance Tax, and HMRC challenges many of them. The
          reliable steps are simple and are written into the rules on purpose:
        </p>
        <ol>
          <li>
            <strong>Make a will.</strong>{" "}Without one, the intestacy rules decide who inherits, which may not send
            the home to children, may leave less to an unmarried partner and may waste the residence band.
          </li>
          <li>
            <strong>Use the spouse exemption and the transfers.</strong>{" "}Keep records from the first death so the
            second can claim up to £1 million of bands.
          </li>
          <li>
            <strong>Give early and give from income.</strong>{" "}Use the £3,000 annual exemption every year, make
            regular gifts from surplus income with good records, and make larger gifts as early as you can afford, so
            the seven years start running.
          </li>
          <li>
            <strong>Put life cover in trust.</strong>{" "}A policy written in trust pays out outside the estate, and can
            be used to fund the bill.
          </li>
          <li>
            <strong>Think about charity.</strong>{" "}A legacy near the 10% line can cost your heirs much less than it
            gives.
          </li>
          <li>
            <strong>Review pension nominations</strong>{" "}before April 2027.
          </li>
          <li>
            <strong>Plan for later life.</strong>{" "}A Lasting Power of Attorney lets someone you trust manage your
            money if you cannot, including keeping up a pattern of regular gifts. Our{" "}
            <Link href="/life/power-of-attorney">power of attorney fees calculator</Link> shows the registration
            cost.
          </li>
        </ol>
        <p>
          Giving away too much too soon is the main risk. Keep enough to live on, to pay for care if you need it, and to
          stay independent. Gifts made to reduce a care home means test can be treated as &ldquo;deprivation of
          assets&rdquo; and counted anyway.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Forgetting gifts.</strong>{" "}Executors must report gifts from the seven years before death. Old bank
            statements are often the only record, so keep a simple list of what you give and when.
          </li>
          <li>
            <strong>Assuming the home is always protected.</strong>{" "}The residence band needs a home and direct
            descendants. A home left in a discretionary trust, or to a nephew, does not qualify.
          </li>
          <li>
            <strong>Valuing the home too low.</strong>{" "}HMRC checks property values and can charge penalties on careless
            under-valuations. Use a professional valuation for anything near a threshold.
          </li>
          <li>
            <strong>Missing the transfer claim.</strong>{" "}The surviving partner&rsquo;s executors must claim the unused
            bands within two years.
          </li>
          <li>
            <strong>Overlooking jointly owned assets.</strong>{" "}A joint account passes automatically to the other
            owner, but the deceased person&rsquo;s share still counts in their estate.
          </li>
        </ul>

        <h2>Scotland, Wales and Northern Ireland</h2>
        <p>
          Inheritance Tax is a UK-wide tax, so the bands, the rates and the gift rules are the same in all four
          nations. What differs is the legal process. Scotland has confirmation rather than probate, different rules
          on who inherits without a will, and &ldquo;legal rights&rdquo; that give a spouse and children a share of
          moveable property whatever the will says. Northern Ireland has its own probate office and fees.
        </p>

        <h2>The bottom line</h2>
        <p>
          For most single people the tax-free limit is £325,000, rising to £500,000 if a home goes to children or
          grandchildren. For most married couples and civil partners it is up to £1 million in total, as long as the
          second estate claims the first partner&rsquo;s unused bands. Above that, the tax is 40% of the excess, with
          lower rates for estates that leave 10% to charity and for business and farm property above £2.5 million.
          Gifts escape the tax after seven years, and pensions join the estate from April 2027.
        </p>
        <p>
          These figures are for deaths in 2026/27 and are general guidance, not tax or legal advice. For a large or
          complicated estate, or before making big gifts or setting up a trust, talk to a solicitor or a tax adviser.
          Put your own figures into the{" "}
          <Link href="/life/inheritance-tax">inheritance tax calculator</Link> to see where you stand today and after
          April 2027.
        </p>
      </>
    ),
  },
  {
    slug: "universal-credit-explained",
    title: "How Universal Credit is worked out in 2026/27, with worked examples",
    seoTitle: "How Universal Credit Is Worked Out in 2026/27",
    description:
      "Universal Credit 2026/27 step by step: standard allowance, child, health, childcare and housing elements, the £427 work allowance, 55% taper and benefit cap.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "12 min read",
    category: "Benefits",
    body: (
      <>
        <p>
          Universal Credit is the main benefit for people of working age on a low income, whether they are in work,
          looking for work, caring for someone or too ill to work. It replaced six older benefits, and it is paid
          monthly, based on what happened in the month before. That makes it flexible, but it also makes the amount
          hard to predict: it can change every month as your pay, rent or family changes.
        </p>
        <p>
          This guide explains how the award is worked out for 2026/27, from the building blocks to the deductions,
          with worked examples for a single renter, a couple with children, a lone parent paying for childcare, a large
          family hit by the benefit cap and someone with a health condition. Every figure comes from the same engine
          as our <Link href="/benefits/universal-credit">Universal Credit calculator</Link>, using the Department for
          Work and Pensions rates from April 2026.
        </p>

        <h2>Who can claim</h2>
        <p>In general you can claim Universal Credit if:</p>
        <ul>
          <li>you are 18 or over (16 and 17 year olds can claim in some cases, for example if they are caring for a child);</li>
          <li>you, or your partner if you have one, are under State Pension age;</li>
          <li>you and your partner have £16,000 or less in savings and investments between you;</li>
          <li>you live in the UK and meet the residence rules.</li>
        </ul>
        <p>
          Couples who live together claim jointly, and their income and savings are added together. There are no
          hours limits: you can work full time and still get Universal Credit if your pay is low compared with your
          rent and family size. Most full-time students cannot claim, unless, for example, they are responsible for a
          child.
        </p>

        <h2>Monthly assessment periods</h2>
        <p>
          Universal Credit works in monthly &ldquo;assessment periods&rdquo; that start on the day you claimed. If
          you claimed on the 12th, each period runs from the 12th of one month to the 11th of the next. The award is
          based on your circumstances and your take-home pay in that period, and it is paid about seven days after
          the period ends.
        </p>
        <p>
          That means the first payment arrives about five weeks after you claim. If you cannot manage until then, you
          can ask for an advance of up to your estimated first payment, repaid from later payments over up to 24
          months. Our <Link href="/benefits/uc-advance">Universal Credit advance calculator</Link> shows what the
          repayments would be.
        </p>

        <h2>The formula in one line</h2>
        <p>Every award follows the same sum:</p>
        <ol>
          <li>
            <strong>Add up the maximum award:</strong>{" "}the standard allowance plus any elements for children,
            disability or ill health, caring, childcare and housing.
          </li>
          <li>
            <strong>Take off 55% of your take-home pay</strong>{" "}above your work allowance, if you have one.
          </li>
          <li>
            <strong>Take off other income in full,</strong>{" "}such as a private pension or New Style Jobseeker&rsquo;s
            Allowance.
          </li>
          <li>
            <strong>Take off an amount for savings</strong>{" "}between £6,000 and £16,000.
          </li>
          <li>
            <strong>Apply the benefit cap</strong>{" "}if your household is not exempt.
          </li>
        </ol>
        <p>The rest of this guide takes each step in turn.</p>

        <h2>Step 1: the standard allowance</h2>
        <p>
          Everyone gets a standard allowance. It depends only on whether you are single or a couple and whether you
          are under 25.
        </p>
        <table>
          <thead>
            <tr>
              <th>Standard allowance 2026/27</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Single, under 25</td><td>£338.58</td></tr>
            <tr><td>Single, 25 or over</td><td>£424.90</td></tr>
            <tr><td>Couple, both under 25</td><td>£528.34</td></tr>
            <tr><td>Couple, one or both 25 or over</td><td>£666.97</td></tr>
          </tbody>
        </table>

        <h2>Step 2: elements for children</h2>
        <p>
          You get a child element of £303.94 a month for each child you are responsible for. If your eldest child was
          born before 6 April 2017, the first child gets a higher rate of £351.88. The two-child limit, which used to
          stop the child element for a third or later child born after April 2017, ended in April 2026, so every child
          now counts.
        </p>
        <p>
          A disabled child adds a further amount: £164.79 a month (the lower rate) if they get Disability Living
          Allowance or Child Disability Payment, or £514.71 (the higher rate) if they get the highest care rate or are
          certified as severely sight impaired.
        </p>

        <h2>Step 3: health and caring</h2>
        <p>
          If a health condition or disability limits your ability to work, you can be assessed through the Work
          Capability Assessment. If you are found to have limited capability for work and work-related activity
          (LCWRA), a health element is added:
        </p>
        <table>
          <thead>
            <tr>
              <th>Health element</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>New claims from 6 April 2026</td><td>£217.26</td></tr>
            <tr><td>Claims before April 2026, severe conditions or terminal illness</td><td>£429.80</td></tr>
            <tr><td>Limited capability for work only (claims before April 2017)</td><td>£158.76</td></tr>
          </tbody>
        </table>
        <p>
          If you care for a severely disabled person for at least 35 hours a week, and they get a qualifying
          disability benefit such as the daily living part of Personal Independence Payment, you get a carer element
          of £209.34 a month. You cannot get both the carer element and the health element for the same person.
        </p>

        <h2>Step 4: childcare costs</h2>
        <p>
          If you are in paid work (both of you, in a couple) and pay a registered childminder, nursery or club,
          Universal Credit pays back 85% of the cost, up to £1,071.09 a month for one child or £1,836.16 for two or
          more. You must report the costs, with proof of payment, in the same or the next assessment period. The
          element can also help with the first month&rsquo;s fees before you start a new job.
        </p>
        <p>
          It is worth comparing with Tax-Free Childcare, which pays 20% and cannot be used at the same time. On
          Universal Credit, 85% is almost always the better deal.
        </p>

        <h2>Step 5: help with housing costs</h2>
        <p>
          If you rent, a housing element is added. How much depends on who your landlord is:
        </p>
        <ul>
          <li>
            <strong>Private renters</strong>{" "}get the lower of their rent and the Local Housing Allowance (LHA) rate
            for the number of bedrooms they are allowed, in their area. Single people under 35 are usually limited to
            the rate for a room in a shared house. LHA rates have been frozen at their April 2024 level, so in many
            areas they now fall short of real rents. Our{" "}
            <Link href="/benefits/local-housing-allowance">Local Housing Allowance calculator</Link> finds the rate
            for your area.
          </li>
          <li>
            <strong>Social renters</strong>{" "}(council or housing association) get their full eligible rent, minus 14%
            if they have one spare bedroom or 25% for two or more (the &ldquo;bedroom tax&rdquo;).
          </li>
          <li>
            <strong>Adults living with you</strong>{" "}who are not your partner, such as a grown-up son or daughter,
            usually reduce the housing element by £96.55 a month each (the &ldquo;housing cost
            contribution&rdquo;), with exceptions, for example if they are under 21 or get certain disability benefits.
          </li>
          <li>
            <strong>Homeowners</strong>{" "}get no housing element for mortgage payments. Instead, after a waiting
            period, they can apply for a Support for Mortgage Interest loan, which is secured on the home.
          </li>
        </ul>

        <h2>Step 6: the work allowance and the 55% taper</h2>
        <p>
          Earnings reduce Universal Credit gradually rather than all at once. For every £1 of take-home pay (after
          Income Tax, National Insurance and pension contributions), the award falls by 55p. This is the{" "}
          &ldquo;taper&rdquo;.
        </p>
        <p>
          Some households can earn a set amount first without losing anything. This &ldquo;work allowance&rdquo; is
          only for claimants who are responsible for a child or who have limited capability for work:
        </p>
        <table>
          <thead>
            <tr>
              <th>Work allowance 2026/27</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>With a housing element</td><td>£427</td></tr>
            <tr><td>Without a housing element</td><td>£710</td></tr>
            <tr><td>No children and no health condition</td><td>£0</td></tr>
          </tbody>
        </table>
        <p>
          The work allowance is per household, not per person. A couple share one, and it is set against their
          combined take-home pay.
        </p>

        <h2>Example 1: a single renter with no children</h2>
        <p>
          Sam is 30, single and rents privately for £700 a month. The LHA rate for a one-bedroom home in their area is
          £650.
        </p>
        <table>
          <thead>
            <tr>
              <th>Sam, single, private rent</th>
              <th>Not working</th>
              <th>Take-home pay £1,000</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Standard allowance</td><td>£424.90</td><td>£424.90</td></tr>
            <tr><td>Housing element (LHA rate)</td><td>£650.00</td><td>£650.00</td></tr>
            <tr><td>Maximum award</td><td>£1,074.90</td><td>£1,074.90</td></tr>
            <tr><td>Less 55% of earnings (no work allowance)</td><td>£0</td><td>−£550.00</td></tr>
            <tr><td>Universal Credit a month</td><td>£1,074.90</td><td>£524.90</td></tr>
          </tbody>
        </table>
        <p>
          Sam pays the £50 gap between the rent and the LHA rate from the award either way. Their Universal Credit
          stops altogether once take-home pay reaches about £1,954 a month. Without the rent, a single person with no
          children loses all of their Universal Credit at take-home pay of about £773 a month.
        </p>

        <h2>Example 2: a couple with two children in social housing</h2>
        <p>
          Amira and Tom are in their thirties, have two children born after April 2017, rent from a housing
          association for £550 a month with no spare bedrooms, and take home £1,800 a month between them.
        </p>
        <table>
          <thead>
            <tr>
              <th>Amira and Tom</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Standard allowance (couple, 25 or over)</td><td>£666.97</td></tr>
            <tr><td>Child element (2 children)</td><td>£607.88</td></tr>
            <tr><td>Housing element</td><td>£550.00</td></tr>
            <tr><td>Maximum award</td><td>£1,824.85</td></tr>
            <tr><td>Earnings above the £427 work allowance</td><td>£1,373.00</td></tr>
            <tr><td>Less 55% of that</td><td>−£755.15</td></tr>
            <tr><td>Universal Credit</td><td>£1,069.70</td></tr>
          </tbody>
        </table>
        <p>
          Now suppose they had one spare bedroom and Tom&rsquo;s 22-year-old brother lived with them. The housing
          element would lose 14% of the rent (£77) and a housing cost contribution of £96.55, falling to £376.45, and
          their award would drop to <strong>£896.15</strong>. They would have to find £173.55 of the rent themselves,
          unless the brother pays towards it.
        </p>

        <h2>Example 3: a lone parent paying for childcare</h2>
        <p>
          Leah has one child, rents privately for £850 a month (LHA rate £800), pays a nursery £600 a month and takes
          home £1,200.
        </p>
        <table>
          <thead>
            <tr>
              <th>Leah</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Standard allowance (single, 25 or over)</td><td>£424.90</td></tr>
            <tr><td>Child element</td><td>£303.94</td></tr>
            <tr><td>Childcare costs (85% of £600)</td><td>£510.00</td></tr>
            <tr><td>Housing element (LHA rate)</td><td>£800.00</td></tr>
            <tr><td>Maximum award</td><td>£2,038.84</td></tr>
            <tr><td>Less 55% of (£1,200 − £427)</td><td>−£425.15</td></tr>
            <tr><td>Universal Credit</td><td>£1,613.69</td></tr>
          </tbody>
        </table>
        <p>
          The childcare element is the biggest single difference to whether work pays for parents. Leah must report
          the nursery bills every month; if she reports them late, that month&rsquo;s element can be lost.
        </p>

        <h2>How much of a pay rise you keep</h2>
        <p>
          On Universal Credit, extra pay is reduced three ways: Income Tax, National Insurance and pension
          contributions first, then 55% of what is left through the taper. Take a lone parent with one child who earns
          £1,500 a month before tax, pays 5% into a workplace pension and rents privately for £850 (LHA £800). She is
          offered extra hours worth £200 a month before tax:
        </p>
        <table>
          <thead>
            <tr>
              <th>Extra £200 a month before tax</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Income Tax and National Insurance</td><td>−£53.20</td></tr>
            <tr><td>Pension contribution (5%)</td><td>−£10.00</td></tr>
            <tr><td>Extra take-home pay</td><td>£136.80</td></tr>
            <tr><td>Universal Credit lost (55%)</td><td>−£75.24</td></tr>
            <tr><td>Better off by</td><td>£61.56</td></tr>
          </tbody>
        </table>
        <p>
          She keeps about 31p of each extra pound, plus £10 more in her pension. That is still a gain, and more hours
          can lead to better pay and more pension later, but it is far less than the headline figure. Our{" "}
          <Link href="/benefits/universal-credit-taper">Universal Credit taper calculator</Link> works this out for
          any pay rise, new job or change in hours.
        </p>

        <h2>Other income</h2>
        <p>
          Income that is not from work is usually taken off pound for pound, with no work allowance or taper. That
          includes:
        </p>
        <ul>
          <li>New Style Jobseeker&rsquo;s Allowance and New Style Employment and Support Allowance;</li>
          <li>Carer&rsquo;s Allowance;</li>
          <li>private and workplace pensions you are drawing;</li>
          <li>maintenance paid to you by a former partner for yourself (but not for your children);</li>
          <li>some rental income and student income.</li>
        </ul>
        <p>
          Some income is ignored completely: Child Benefit, Personal Independence Payment, Disability Living
          Allowance, Attendance Allowance, child maintenance and most charitable payments.
        </p>

        <h2>Savings and capital</h2>
        <p>
          The first £6,000 of savings and investments is ignored. Between £6,000 and £16,000, Universal Credit
          assumes an income of £4.35 a month for each £250 (or part of £250), and takes it off the award. Above
          £16,000 you cannot get Universal Credit at all.
        </p>
        <table>
          <thead>
            <tr>
              <th>Savings</th>
              <th>Monthly deduction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£6,000 or less</td><td>£0</td></tr>
            <tr><td>£6,001</td><td>£4.35</td></tr>
            <tr><td>£10,000</td><td>£69.60</td></tr>
            <tr><td>£16,000</td><td>£174.00</td></tr>
            <tr><td>More than £16,000</td><td>No Universal Credit</td></tr>
          </tbody>
        </table>
        <p>
          With £10,000 in savings, Sam from Example 1 would get £1,005.30 a month instead of £1,074.90. The value of
          your home is ignored, and so are pensions you have not started drawing. Deliberately spending or giving away
          money to get under the limit can be treated as &ldquo;notional capital&rdquo; and counted anyway, although
          ordinary spending, such as paying off debts or replacing a broken boiler, is fine.
        </p>

        <h2>The benefit cap</h2>
        <p>
          The benefit cap limits the total of most benefits a working-age household can get. For 2026/27 it is:
        </p>
        <table>
          <thead>
            <tr>
              <th>Benefit cap</th>
              <th>Greater London, a year</th>
              <th>Elsewhere, a year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Couples and lone parents</td><td>£25,323</td><td>£22,020</td></tr>
            <tr><td>Single people with no children</td><td>£16,967</td><td>£14,753</td></tr>
          </tbody>
        </table>
        <p>
          Outside London, that is £1,835 a month for a family. Child Benefit counts towards it, but the childcare
          element does not. Take a couple with four children renting privately for £1,400 a month, with no
          earnings:
        </p>
        <table>
          <thead>
            <tr>
              <th>Couple, four children, rent £1,400</th>
              <th>No earnings</th>
              <th>Take-home pay £900</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Universal Credit before the cap</td><td>£3,282.73</td><td>£3,022.58</td></tr>
            <tr><td>Child Benefit (counts towards the cap)</td><td>£349.92</td><td>£349.92</td></tr>
            <tr><td>Cap reduction</td><td>−£1,797.65</td><td>£0 (exempt)</td></tr>
            <tr><td>Universal Credit paid</td><td>£1,485.08</td><td>£3,022.58</td></tr>
          </tbody>
        </table>
        <p>
          The cap stops applying when household take-home pay reaches £881 a month (roughly 16 hours a week at the
          National Living Wage). In this example, earning £900 a month raises the household&rsquo;s income by more than
          £2,400: the cap reduction disappears and the taper takes only £260.15. Households that have been working
          steadily also get a nine-month &ldquo;grace period&rdquo; before the cap applies if their earnings fall.
        </p>
        <p>
          The cap also does not apply if anyone in the household gets the LCWRA health element, the carer element,
          Personal Independence Payment, Disability Living Allowance, Attendance Allowance, Carer&rsquo;s Allowance or a
          war pension. For example, a single person with the new health element and £600 social rent gets £1,242.16 a
          month, more than the single cap of £1,229.42, and keeps all of it. Our{" "}
          <Link href="/benefits/benefit-cap">benefit cap calculator</Link> checks your household.
        </p>

        <h2>Under 25s</h2>
        <p>
          A single person under 25 gets a standard allowance of £338.58 a month instead of £424.90. Young people renting
          privately are usually limited to the shared room rate of LHA until they are 35, with exceptions such as care
          leavers under 25 and some people who have lived in homeless hostels.
        </p>

        <h2>What can reduce a payment</h2>
        <ul>
          <li>
            <strong>Deductions:</strong>{" "}an advance, an overpayment, rent or energy arrears, council tax arrears and
            some fines can be repaid from your award. Most deductions together are capped at 15% of the standard
            allowance, and you can ask for lower repayments if you are in hardship.
          </li>
          <li>
            <strong>Sanctions:</strong>{" "}if you are expected to look for work and do not do what your claimant
            commitment says without a good reason, part of your standard allowance can be stopped for a time.
          </li>
          <li>
            <strong>Late reporting:</strong>{" "}changes such as a new partner, someone moving in or out, a change in rent
            or savings going over £6,000 must be reported. Late reports often lead to overpayments that are recovered
            later.
          </li>
          <li>
            <strong>Self-employment:</strong>{" "}after a start-up period, self-employed claimants who are expected to
            work full time are treated as earning at least the &ldquo;minimum income floor&rdquo;, roughly what they
            would earn at the National Living Wage, even if they earn less.
          </li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Assuming you cannot claim because you work.</strong>{" "}Many full-time workers with children or high
            rents qualify.
          </li>
          <li>
            <strong>Two pay days in one assessment period.</strong>{" "}If you are paid weekly or four-weekly, or your pay
            day moves because of a weekend, one month can show extra pay and a smaller award. It usually evens out the
            following month.
          </li>
          <li>
            <strong>Forgetting to report childcare.</strong>{" "}Costs reported late can be lost for good.
          </li>
          <li>
            <strong>Not checking the housing element.</strong>{" "}Make sure the right number of bedrooms and the right LHA
            area have been used.
          </li>
          <li>
            <strong>Missing other help.</strong>{" "}Council Tax Reduction is claimed separately from your council, and
            Universal Credit can open the door to free school meals, Healthy Start, cheaper broadband and energy
            schemes, and help with NHS costs.
          </li>
        </ul>

        <h2>Other help to check</h2>
        <p>
          Universal Credit is rarely the only support available. Our{" "}
          <Link href="/benefits/council-tax-reduction">Council Tax Reduction calculator</Link> estimates help with
          your council tax bill, and the{" "}
          <Link href="/benefits/benefits-checker">benefits checker</Link> runs through Universal Credit, Pension
          Credit, Child Benefit and other help in one go. If you have a disability or care for someone, check Personal
          Independence Payment and Carer&rsquo;s Allowance too: they are paid on top and can exempt you from the cap.
        </p>

        <h2>The bottom line</h2>
        <p>
          Universal Credit starts from a maximum award built from a standard allowance and elements for children,
          health, caring, childcare and rent. Take-home pay above any work allowance reduces it by 55p in the pound,
          other income reduces it pound for pound, savings over £6,000 reduce it a little and savings over £16,000 stop
          it. The benefit cap then limits the total for some households without work or disability.
        </p>
        <p>
          The figures here use the 2026/27 rates and are estimates. Your actual award is set by the Department for Work
          and Pensions and may differ, for example because of deductions or how your pay dates fall. Use the{" "}
          <Link href="/benefits/universal-credit">Universal Credit calculator</Link> for your own household, and get
          free advice from Citizens Advice if you think a decision is wrong: you can ask for a mandatory
          reconsideration within one month.
        </p>
      </>
    ),
  },
  {
    slug: "salary-sacrifice-worth-it",
    title: "Is salary sacrifice worth it? What it really saves in 2026/27",
    seoTitle: "Is Salary Sacrifice Worth It? 2026/27 Figures",
    description:
      "Salary sacrifice cuts Income Tax, NI and student loan repayments. Worked 2026/27 examples for pensions, Cycle to Work and other schemes, and the catches.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "8 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Salary sacrifice means agreeing with your employer to give up part of your salary in return for a benefit,
          usually a bigger pension contribution. Because the salary you give up is never paid to you, you pay no Income
          Tax, no National Insurance and no student loan repayment on it. The result is that a £1,000 pension
          contribution can cost you only £580 to £720 of take-home pay, and less still in some salary bands.
        </p>
        <p>
          This guide works through real 2026/27 examples, all from the same engine as our{" "}
          <Link href="/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>, and explains the catches:
          the minimum wage rule, the effect on mortgages and other benefits, and the National Insurance cap planned for
          2029.
        </p>

        <h2>How salary sacrifice saves money</h2>
        <p>
          Compare two ways of putting £1,500 a year into a workplace pension on a £30,000 salary in England. Paid out of
          your salary under the &ldquo;net pay&rdquo; or &ldquo;relief at source&rdquo; methods, you get Income Tax
          relief but still pay National Insurance on the full £30,000. By salary sacrifice, your salary becomes £28,500
          and the £1,500 goes straight into the pension, so both tax and National Insurance fall.
        </p>
        <table>
          <thead>
            <tr>
              <th>£30,000 salary, £1,500 sacrificed into a pension</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Take-home pay before</td><td>£25,119.60</td></tr>
            <tr><td>Take-home pay after</td><td>£24,039.60</td></tr>
            <tr><td>Fall in take-home pay</td><td>£1,080</td></tr>
            <tr><td>Income Tax saved</td><td>£300</td></tr>
            <tr><td>National Insurance saved</td><td>£120</td></tr>
            <tr><td>Paid into your pension</td><td>£1,500</td></tr>
          </tbody>
        </table>
        <p>
          So £1,500 goes into your pension for £1,080 out of your pocket: a saving of £420, or 28% of the amount
          sacrificed. That 28% is simply the basic rate of tax (20%) plus the main rate of employee National Insurance
          (8%).
        </p>

        <h2>What it saves at different salaries</h2>
        <p>
          The saving on each pound you sacrifice is your marginal rate of tax, National Insurance and student loan on
          the slice of salary you give up. Four 2026/27 examples, each sacrificing a pension contribution in England,
          Wales or Northern Ireland:
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary and sacrifice</th>
              <th>Cost to you</th>
              <th>Saving</th>
              <th>Saving as a share</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£30,000, sacrifice £1,500</td><td>£1,080</td><td>£420</td><td>28%</td></tr>
            <tr><td>£45,000 with a Plan 2 loan, sacrifice £2,250</td><td>£1,417.50</td><td>£832.50</td><td>37%</td></tr>
            <tr><td>£60,000, sacrifice £3,000</td><td>£1,740</td><td>£1,260</td><td>42%</td></tr>
            <tr><td>£105,000, sacrifice £5,000</td><td>£1,900</td><td>£3,100</td><td>62%</td></tr>
          </tbody>
        </table>
        <p>
          The Plan 2 example saves an extra £202.50 because student loan repayments are 9% of earnings above the
          threshold, and sacrificed salary is not counted. The £105,000 example is the most striking: bringing income
          back down to £100,000 restores £2,500 of Personal Allowance, so £5,000 goes into the pension for just £1,900
          of take-home pay. Our guide to the <Link href="/blog/100k-tax-trap">£100,000 tax trap</Link> explains why.
        </p>
        <p>
          In Scotland the saving can be larger, because the Scottish intermediate and higher rates are 21% and 42%. On
          £45,000 with £2,250 sacrificed, a Scottish taxpayer saves £933.48 against £630 for the same salary elsewhere
          in the UK (without a student loan).
        </p>

        <h2>Your employer saves too</h2>
        <p>
          Employers pay 15% National Insurance on earnings above £5,000 a year. When you sacrifice £1,500, your employer
          saves £225 of its own National Insurance. Some employers add part or all of that saving to your pension. If
          yours adds all of it, the £30,000 example puts £1,725 into your pension for the same £1,080 of take-home pay.
          It is worth asking HR whether your employer shares its saving.
        </p>

        <h2>Cycle to Work and other schemes</h2>
        <p>
          Pensions are not the only exempt benefit. Under the Cycle to Work scheme, giving up £1,000 of a £30,000 salary
          for a bike costs £720 of take-home pay, a saving of £280, because tax and National Insurance both fall.
          Electric car schemes work in a similar way, but you pay company car tax on the car, so use the{" "}
          <Link href="/vehicles/ev-salary-sacrifice">EV salary sacrifice calculator</Link> for those.
        </p>
        <p>
          Most other benefits fall under the &ldquo;optional remuneration&rdquo; rules. For them you still pay Income
          Tax on the salary you gave up, so only National Insurance falls. Sacrificing £1,200 of a £30,000 salary for
          such a benefit saves just £96 a year: the 8% National Insurance.
        </p>

        <h2>The catches</h2>
        <h3>You cannot go below the minimum wage</h3>
        <p>
          A sacrifice must not take your pay below the National Living Wage, £12.71 an hour for workers aged 21 and
          over from April 2026. On £26,000 for 37.5 hours a week, sacrificing £1,500 would leave £12.56 an hour, so your
          employer cannot agree it. A sacrifice of £1,000 leaves £12.82 an hour and is allowed.
        </p>
        <h3>A lower salary can affect other things</h3>
        <ul>
          <li>
            <strong>Mortgages:</strong>{" "}lenders may use your salary after sacrifice when working out how much you can
            borrow.
          </li>
          <li>
            <strong>Statutory pay:</strong>{" "}Statutory Maternity Pay, Statutory Sick Pay and similar payments depend on
            your earnings, so a big sacrifice can reduce them or make you ineligible.
          </li>
          <li>
            <strong>Life cover and pay rises:</strong>{" "}some employers base life insurance or percentage pay rises on
            the salary after sacrifice. Check your scheme&rsquo;s rules.
          </li>
          <li>
            <strong>Universal Credit and tax credits:</strong>{" "}lower earnings can mean more help, which is usually a
            good thing, but it does change the sums.
          </li>
        </ul>
        <h3>The National Insurance cap from April 2029</h3>
        <p>
          The government has announced that from April 2029 only the first £2,000 a year of pension contributions made
          by salary sacrifice will be free of National Insurance. Contributions above £2,000 will still save Income Tax,
          but both you and your employer will pay National Insurance on them. Until then, the full saving applies.
        </p>

        <h2>Is it worth it?</h2>
        <p>
          For most employees whose employer offers it, yes: salary sacrifice is the cheapest way to pay into a pension,
          because it saves National Insurance on top of Income Tax. It is most valuable for higher-rate taxpayers,
          anyone repaying a student loan, and anyone with income between £100,000 and £125,140. The main reasons to hold
          back are a mortgage application in the near future, a pay level close to the minimum wage, or plans to take
          family leave soon.
        </p>
        <p>
          To see the effect on your own pay, use the{" "}
          <Link href="/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>, or compare the different ways
          of getting tax relief with the <Link href="/investing/pension-tax-relief">pension tax relief calculator</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "marriage-allowance-explained",
    title: "Marriage Allowance in 2026/27: who gains £252, and how to claim four years back",
    seoTitle: "Marriage Allowance 2026/27: Who Gets £252?",
    description:
      "A low earner can pass £1,260 of Personal Allowance to a basic rate spouse, worth up to £252 a year. Who qualifies, when it does not pay, and how to backdate.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "7 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Marriage Allowance is one of the easiest tax savings in the UK, and one of the most often missed. If one of
          you earns less than the Personal Allowance and the other pays tax at the basic rate, the lower earner can
          transfer <strong>£1,260</strong>{" "}of their allowance to their partner. That cuts the higher earner&rsquo;s tax
          by up to <strong>£252 a year</strong>, and you can claim for up to four earlier years too.
        </p>
        <p>
          This guide uses 2026/27 figures from the same engine as our{" "}
          <Link href="/tax-and-salary/marriage-allowance">Marriage Allowance calculator</Link>, so you can check your own
          incomes there.
        </p>

        <h2>Who can claim</h2>
        <ul>
          <li>You are married or in a civil partnership. Living together is not enough.</li>
          <li>
            The lower earner&rsquo;s income is £12,570 or less (the Personal Allowance). Income includes pensions,
            savings interest above any tax-free amounts, rent and other taxable income.
          </li>
          <li>
            The higher earner pays tax at the basic rate: income up to £50,270 in England, Wales or Northern Ireland.
            In Scotland, they must pay no more than the intermediate rate, up to £43,662.
          </li>
          <li>
            Neither of you was born before 6 April 1935. Couples where one was are looked after by the Married
            Couple&rsquo;s Allowance instead.
          </li>
        </ul>

        <h2>How much it is worth</h2>
        <p>
          The higher earner&rsquo;s tax falls by 20% of £1,260, which is £252. The lower earner&rsquo;s own allowance
          falls to £11,310. If they earn £11,310 or less, that costs them nothing, so the couple gains the full £252.
          If they earn between £11,310 and £12,570, they pay some tax on the slice above £11,310, and the gain is
          smaller.
        </p>
        <table>
          <thead>
            <tr>
              <th>Lower earner&rsquo;s income</th>
              <th>Higher earner&rsquo;s income</th>
              <th>Couple gains each year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£8,000</td><td>£30,000</td><td>£252</td></tr>
            <tr><td>£11,500</td><td>£30,000</td><td>£214</td></tr>
            <tr><td>£12,000</td><td>£30,000</td><td>£114</td></tr>
            <tr><td>£12,570</td><td>£30,000</td><td>Nothing: it costs as much as it saves</td></tr>
            <tr><td>£8,000</td><td>£13,000</td><td>£86 (the higher earner only pays £86 tax)</td></tr>
            <tr><td>£8,000</td><td>£55,000</td><td>Not eligible: higher rate taxpayer</td></tr>
          </tbody>
        </table>
        <p>
          The £12,000 example is easy to get wrong: the higher earner saves £252, but the lower earner now pays £138
          of tax on the £690 above £11,310, leaving a gain of £114. Claim only if the household comes out ahead.
        </p>

        <h2>Claiming for earlier years</h2>
        <p>
          You can backdate a claim for up to four tax years if you were eligible in each of them. In 2026/27 that
          means 2022/23, 2023/24, 2024/25 and 2025/26. The allowance was £1,260 in each of those years, so a couple who
          gain the full amount every year can receive <strong>£1,260 in total</strong>: £252 this year and £1,008
          backdated. HMRC pays backdated amounts as a lump sum to the higher earner.
        </p>

        <h2>How to claim</h2>
        <p>
          The lower earner applies on GOV.UK, free of charge. It takes a few minutes and needs both National Insurance
          numbers. You do not need to use a claims company: they charge a share of the refund for something you can do
          yourself.
        </p>
        <p>
          Once it is in place, HMRC changes both <Link href="/tax-and-salary/tax-code-decoder">tax codes</Link>. The
          higher earner&rsquo;s code ends in M (for example 1383M) and the lower earner&rsquo;s ends in N (for example
          1131N). The allowance renews each year automatically until you cancel it or your circumstances change.
        </p>

        <h2>When to cancel</h2>
        <ul>
          <li>
            The lower earner&rsquo;s income rises above £12,570, or the higher earner moves into the higher rate band
            (perhaps after a <Link href="/tax-and-salary/pay-rise">pay rise</Link>).
          </li>
          <li>You divorce, end a civil partnership, or your partner dies (special rules apply on bereavement).</li>
        </ul>
        <p>
          If you claim when you are not entitled, HMRC will ask for the tax back, so review the claim each April.
        </p>

        <h2>Scotland</h2>
        <p>
          In Scotland the rules are the same, except that the higher earner must not pay tax above the intermediate
          rate (21%). A Scottish higher earner on £45,000 is above the £43,662 limit and cannot receive the allowance.
          The saving is still worked out at 20%, so a couple where the lower earner earns £8,000 and the higher earner
          £40,000 still gain £252.
        </p>

        <p>
          Check your own figures, including backdating, with the{" "}
          <Link href="/tax-and-salary/marriage-allowance">Marriage Allowance calculator</Link>, and see what else you
          take home with the <Link href="/tax-and-salary/salary-calculator">salary calculator</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "uk-take-home-pay-explained",
    title: "How UK take-home pay works in 2026/27: a plain-English guide",
    seoTitle: "How UK Take-Home Pay Works in 2026/27",
    description:
      "Income Tax, National Insurance, the Personal Allowance and the hidden 60% trap: what comes out of your salary in 2026/27, with a worked example.",
    date: "2026-05-20",
    dateLabel: "20 May 2026",
    readingTime: "8 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          You agree a salary, then your first payslip arrives and it&apos;s
          noticeably smaller than you expected. Where did the money go? In the
          UK, the gap between your <strong>gross</strong> salary (what you
          agreed) and your <strong>take-home</strong> pay (what hits your bank)
          comes down to two main deductions: <strong>Income Tax</strong> and{" "}
          <strong>National Insurance</strong>. This guide explains both for the{" "}
          <strong>2026/27 tax year</strong>, in plain English, with a worked
          example you can follow.
        </p>
        <p>
          Want the number first and the theory second? Run your figure through
          the{" "}
          <Link href="/tax-and-salary/salary-calculator">
            Salary &amp; Take-Home Pay Calculator
          </Link>{" "}
          and come back here to understand it.
        </p>

        <h2>The two deductions that shrink your salary</h2>
        <p>
          For a standard employee paid through PAYE (Pay As You Earn), almost
          all of the difference between gross and net pay is these two:
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> — paid to HMRC on most of your income
            above a tax-free allowance.
          </li>
          <li>
            <strong>National Insurance (NI)</strong> — a separate contribution
            that funds the State Pension and some benefits.
          </li>
        </ul>
        <p>
          Pensions and student loans can also reduce your pay, but we&apos;ll
          set those aside to keep the core picture clear.
        </p>

        <h2>Step 1: Your Personal Allowance (the tax-free bit)</h2>
        <p>
          Everyone gets a <strong>Personal Allowance</strong>{" "}— an amount you
          can earn before paying any Income Tax. For 2026/27 it&apos;s{" "}
          <strong>£12,570</strong>. Earn less than that and you pay no Income
          Tax at all.
        </p>
        <p>
          There&apos;s a catch for higher earners: once your income passes{" "}
          <strong>£100,000</strong>, your Personal Allowance shrinks by £1 for
          every £2 you earn above that line, disappearing entirely at £125,140.
          More on why that matters below.
        </p>

        <h2>Step 2: The Income Tax bands</h2>
        <p>
          Income Tax in England, Wales and Northern Ireland is{" "}
          <em>banded</em>. You don&apos;t pay one rate on everything — you pay
          each rate only on the slice of income that falls inside its band. For
          2026/27:
        </p>
        <table>
          <thead>
            <tr>
              <th>Band</th>
              <th>Taxable income</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Personal Allowance</td>
              <td>Up to £12,570</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Basic rate</td>
              <td>£12,571 – £50,270</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>Higher rate</td>
              <td>£50,271 – £125,140</td>
              <td>40%</td>
            </tr>
            <tr>
              <td>Additional rate</td>
              <td>Over £125,140</td>
              <td>45%</td>
            </tr>
          </tbody>
        </table>
        <p>
          The key idea: a pay rise that pushes you into the higher-rate band
          does <strong>not</strong> mean all your income is suddenly taxed at
          40%. Only the pounds above £50,270 are. Scotland uses a different,
          six-band system — see the{" "}
          <Link href="/tax-and-salary/scottish-tax">
            Scottish Income Tax calculator
          </Link>{" "}
          if that&apos;s you.
        </p>

        <h2>Step 3: National Insurance</h2>
        <p>
          On top of Income Tax, employees pay Class 1 National Insurance. For
          2026/27 the employee rates are:
        </p>
        <ul>
          <li>
            <strong>0%</strong> on earnings up to £12,570.
          </li>
          <li>
            <strong>8%</strong> on earnings between £12,570 and £50,270.
          </li>
          <li>
            <strong>2%</strong> on earnings above £50,270.
          </li>
        </ul>
        <p>
          NI is calculated on your earnings, separately from Income Tax. You can
          break it down with the{" "}
          <Link href="/tax-and-salary/national-insurance">
            National Insurance calculator
          </Link>
          .
        </p>

        <h2>A worked example: £35,000 salary</h2>
        <p>Let&apos;s put it together for someone earning £35,000 a year.</p>
        <ul>
          <li>
            <strong>Income Tax:</strong> the first £12,570 is tax-free. That
            leaves £22,430 taxed at 20% = <strong>£4,486</strong>.
          </li>
          <li>
            <strong>National Insurance:</strong> 8% on the £22,430 between
            £12,570 and £35,000 = <strong>£1,794</strong>.
          </li>
          <li>
            <strong>Total deductions:</strong> £4,486 + £1,794 ={" "}
            <strong>£6,280</strong>.
          </li>
          <li>
            <strong>Take-home pay:</strong> £35,000 − £6,280 ={" "}
            <strong>£28,720 a year</strong>, or about £2,393 a month.
          </li>
        </ul>
        <p>
          That&apos;s an effective tax rate of roughly 18% — even though the
          person is a &quot;20% taxpayer&quot;. The difference is the tax-free
          allowance dragging the average down.
        </p>

        <h2>The hidden 60% tax trap</h2>
        <p>
          Here&apos;s the quirk that surprises people most. Between{" "}
          <strong>£100,000 and £125,140</strong>, every extra £1 you earn does
          two things: it&apos;s taxed at 40%, <em>and</em> it removes 50p of
          your Personal Allowance, which is itself then taxed. The combined
          effect is an effective marginal rate of <strong>60%</strong>. A pay
          rise into this band is often worth far less than it looks — and paying
          into a pension is a common way to step back below the line.
        </p>

        <h2>What this guide leaves out</h2>
        <p>
          To stay readable, the example above ignores a few things that can
          change your real payslip:
        </p>
        <ul>
          <li>
            <strong>Workplace pensions</strong>, especially salary sacrifice,
            which reduce both take-home and taxable pay.
          </li>
          <li>
            <strong>Student loan repayments</strong> (Plans 1, 2, 4, 5 and
            postgraduate), each with its own threshold.
          </li>
          <li>
            <strong>Non-standard tax codes</strong> like BR, 0T or K, which can
            change your tax dramatically.
          </li>
        </ul>
        <p>
          For the headline number, the{" "}
          <Link href="/tax-and-salary/salary-calculator">
            take-home calculator
          </Link>{" "}
          is the fastest way to see where you stand — and if you&apos;re
          weighing up a raise, the{" "}
          <Link href="/tax-and-salary/tax-bracket-checker">
            Tax Bracket Checker
          </Link>{" "}
          shows what each band actually costs.
        </p>

        <h2>The bottom line</h2>
        <p>
          UK take-home pay isn&apos;t random — it&apos;s a tax-free allowance,
          then banded Income Tax, then National Insurance layered on top. Once
          you see the slices, your payslip stops being a mystery. Bookmark the
          calculators you need, and remember: the figures here are estimates for
          general guidance, not personal advice. Always check your own tax code
          and circumstances.
        </p>
      </>
    ),
  },
  {
    slug: "100k-tax-trap",
    title: "The £100,000 tax trap: why a pay rise can cost you 62% and how to keep more",
    seoTitle: "The £100,000 Tax Trap: 62% Tax Explained",
    description:
      "Earn £100,000 to £125,140 and you lose your Personal Allowance and childcare help. What that costs in 2026/27, and how pension contributions win it back.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Most people expect a pay rise to make them better off, and almost always it does. But there is one stretch of
          income in the UK where the tax system takes far more than the headline rates suggest. Between{" "}
          <strong>£100,000 and £125,140</strong>, an employee in England, Wales or Northern Ireland keeps just{" "}
          <strong>38p of every extra pound</strong>. For parents of young children, crossing £100,000 by even £1 can also
          switch off thousands of pounds of childcare support.
        </p>
        <p>
          This guide explains where the trap comes from, what it costs in real pounds for 2026/27, and the legal, common
          ways to step back out of it. Every figure here comes from the same engine as our{" "}
          <Link href="/tax-and-salary/salary-calculator">Salary &amp; Take-Home Pay Calculator</Link>, so you can check
          your own numbers there.
        </p>

        <h2>Where the trap comes from</h2>
        <p>
          Everyone starts with a tax-free <strong>Personal Allowance of £12,570</strong>. Once your{" "}
          <em>adjusted net income</em> goes above £100,000, that allowance is reduced by £1 for every £2 of income over
          the line. By £125,140 it has gone completely.
        </p>
        <p>
          So each extra £2 you earn in this band does two things. It is taxed at the 40% higher rate, and it removes £1 of
          allowance, which means another £1 of your income that used to be tax-free is now taxed at 40% too. Put
          together:
        </p>
        <ul>
          <li>
            Income Tax on the £2 itself: <strong>80p</strong> (40%).
          </li>
          <li>
            Income Tax on the £1 of lost allowance: <strong>40p</strong>.
          </li>
          <li>
            Total: <strong>£1.20 of tax on £2</strong>, an effective rate of <strong>60%</strong>.
          </li>
        </ul>
        <p>
          Add 2% employee National Insurance and the marginal rate on salary is <strong>62%</strong>. Above £125,140 the
          allowance is already gone, so the rate falls back to the 45% additional rate plus 2% NI: 47%. That is the odd
          shape of the UK system: the marginal rate between £100,000 and £125,140 is higher than the rate above it.
        </p>

        <h2>What it costs in real pounds</h2>
        <p>Here is a salary of £100,000, £110,000 and £125,140 in 2026/27, with no pension or student loan:</p>
        <table>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Personal Allowance</th>
              <th>Income Tax</th>
              <th>National Insurance</th>
              <th>Take-home</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£100,000</td>
              <td>£12,570</td>
              <td>£27,432</td>
              <td>£4,010.60</td>
              <td>£68,557.40</td>
            </tr>
            <tr>
              <td>£110,000</td>
              <td>£7,570</td>
              <td>£33,432</td>
              <td>£4,210.60</td>
              <td>£72,357.40</td>
            </tr>
            <tr>
              <td>£125,140</td>
              <td>£0</td>
              <td>£42,516</td>
              <td>£4,513.40</td>
              <td>£78,110.60</td>
            </tr>
          </tbody>
        </table>
        <p>
          A £10,000 rise from £100,000 to £110,000 adds just <strong>£3,800</strong> to take-home pay. Going all the way
          to £125,140, a rise of £25,140, adds <strong>£9,553.20</strong>. You can see the band-by-band picture for any
          salary in the <Link href="/tax-and-salary/tax-bracket-checker">Tax Bracket Checker</Link>.
        </p>
        <p>
          In Scotland the trap is steeper still. The Personal Allowance taper is the same, but the income it pulls into
          tax meets the 45% advanced rate, so the marginal rate on salary is <strong>69.5%</strong> including NI. A
          Scottish taxpayer going from £100,000 to £110,000 keeps £3,050 of the £10,000. The{" "}
          <Link href="/tax-and-salary/scottish-tax">Scottish Income Tax calculator</Link> shows the full picture.
        </p>

        <h2>The childcare cliff for parents</h2>
        <p>
          The tax taper is gradual. The childcare rules are not. Two valuable schemes use the same £100,000 adjusted net
          income test, and each one is all or nothing:
        </p>
        <ul>
          <li>
            <strong>Funded childcare hours for working parents</strong>{" "}in England: up to 30 hours a week, 38 weeks a
            year (1,140 hours) for children from 9 months until they start school. If either parent&rsquo;s adjusted net
            income is expected to be over £100,000, the family loses the working-parent hours. The universal 15 hours for
            3 and 4-year-olds stay. Check eligibility with the{" "}
            <Link href="/benefits/free-childcare-hours">free childcare hours calculator</Link>.
          </li>
          <li>
            <strong>Tax-Free Childcare</strong>: the government adds £2 for every £8 you pay into a childcare account, up
            to <strong>£2,000 a year per child</strong> (£4,000 for a disabled child). Same £100,000 limit, for either
            parent. See the <Link href="/benefits/tax-free-childcare">Tax-Free Childcare calculator</Link>.
          </li>
        </ul>
        <p>
          With two young children in nursery, going £1 over the line can cost more in lost support than the whole of a
          modest pay rise. Child Benefit is a separate matter: the High Income Child Benefit Charge claws it back
          between £60,000 and £80,000, so by £100,000 it has already gone in full (worth £2,337.40 a year for two
          children in 2026/27). The{" "}
          <Link href="/benefits/high-income-child-benefit">High Income Child Benefit calculator</Link> covers that
          earlier band.
        </p>

        <h2>The fix: reduce your adjusted net income</h2>
        <p>
          Every rule above is tested on <strong>adjusted net income</strong>, not on your salary. Adjusted net income is
          your total taxable income less certain deductions, mainly pension contributions and Gift Aid donations. So the
          same tool fixes all three problems at once: put the excess into a pension.
        </p>
        <p>
          Take someone on £110,000 who pays an extra <strong>£10,000</strong> into their pension through salary
          sacrifice. Their pay for tax falls to £100,000, they get their full Personal Allowance back, and their
          take-home falls by only <strong>£3,800</strong>. In other words, £10,000 lands in the pension at a cost of
          £3,800: an effective 62% boost, before any employer top-up. If their adjusted net income is now £100,000 or
          less, the childcare support comes back too.
        </p>
        <p>The method of paying in changes the mechanics, but not much the outcome:</p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>How it works</th>
              <th>Cost of £10,000 into the pension at £110,000</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salary sacrifice</td>
              <td>You give up salary; your employer pays it in. Saves tax and NI.</td>
              <td>£3,800</td>
            </tr>
            <tr>
              <td>Net pay arrangement</td>
              <td>Paid from your gross pay before tax. Saves tax, not NI.</td>
              <td>£4,000</td>
            </tr>
            <tr>
              <td>Relief at source</td>
              <td>
                You pay £8,000; the provider adds £2,000. You claim the other £4,000 back through Self Assessment.
              </td>
              <td>£4,000 (after the claim)</td>
            </tr>
          </tbody>
        </table>
        <p>
          With relief at source, the claim matters: if you don&rsquo;t file a tax return or ask HMRC, you miss the
          higher-rate relief <em>and</em> the Personal Allowance stays reduced. Many people in this band are owed money
          for this reason. The <Link href="/investing/pension-tax-relief">pension tax relief calculator</Link> works out
          each method for your salary.
        </p>

        <h2>Bonuses, timing and other ways in</h2>
        <p>
          The trap often catches people through a one-off. A bonus, a big overtime month, savings interest or dividends
          all count towards adjusted net income for the tax year. A few points worth knowing:
        </p>
        <ul>
          <li>
            <strong>Bonus sacrifice.</strong> Many employers let you sacrifice part or all of a bonus into your pension.
            It must be agreed before the bonus is paid. Our <Link href="/tax-and-salary/bonus-tax">bonus tax calculator</Link>{" "}
            shows what a bonus is worth with and without it.
          </li>
          <li>
            <strong>It is a tax-year test.</strong>{" "}Income from 6 April to 5 April counts. A contribution made in March
            reduces that year&rsquo;s figure; one made in May counts towards the next.
          </li>
          <li>
            <strong>Gift Aid.</strong> Donations to charity reduce adjusted net income by the grossed-up amount. A £800
            donation counts as £1,000.
          </li>
          <li>
            <strong>Savings and dividends count.</strong> Interest above your Personal Savings Allowance and dividends
            still add to adjusted net income, even if some are tax-free. Moving savings into an ISA keeps them out of
            the calculation.
          </li>
        </ul>

        <h2>Limits and things to watch</h2>
        <ul>
          <li>
            <strong>The annual allowance.</strong>{" "}You can normally get tax relief on pension savings of up to £60,000 a
            year (including your employer&rsquo;s contributions), or 100% of your earnings if less. Unused allowance
            from the three previous years can be carried forward.
          </li>
          <li>
            <strong>Pension money is locked away.</strong>{" "}You can&rsquo;t normally draw it until 55 (57 from April
            2028). If you need the cash for a house deposit or school fees, this strategy has a real cost.
          </li>
          <li>
            <strong>Salary sacrifice lowers your contractual pay.</strong> That can affect mortgage applications, life
            cover and statutory pay such as maternity pay. Check with your employer first.
          </li>
          <li>
            <strong>Changes from April 2029.</strong> The government plans to cap the NI saving on salary sacrifice
            pension contributions at £2,000 a year. Income Tax relief is unaffected, so the trap fix still works; the
            extra NI saving shrinks for large sacrifices.
          </li>
        </ul>

        <h2>A simple checklist</h2>
        <ul>
          <li>Estimate your adjusted net income for the whole tax year, including bonuses, interest and dividends.</li>
          <li>If it is between £100,000 and £125,140, work out how much you would need to pay into a pension to get back to £100,000.</li>
          <li>If you have young children in childcare, treat £100,000 as a hard line for <em>each</em> parent.</li>
          <li>If you use relief at source, make sure you claim the extra relief through Self Assessment.</li>
          <li>Run the numbers in the <Link href="/investing/workplace-pension">workplace pension calculator</Link> before changing your contribution.</li>
        </ul>

        <h2>The bottom line</h2>
        <p>
          The £100,000 trap is not a reason to turn down a pay rise: you are always better off in cash terms, just by
          much less than you would expect. But for anyone in this band, every pound paid into a pension is unusually
          cheap, and for parents of young children, staying at or under £100,000 can be worth thousands. These figures
          are estimates for 2026/27 and general guidance, not personal financial advice.
        </p>
      </>
    ),
  },
  {
    slug: "plan-2-vs-plan-5-student-loans",
    title: "Plan 2 vs Plan 5 student loans: what you will actually repay",
    seoTitle: "Plan 2 vs Plan 5 Student Loans: What You Repay",
    description:
      "Plan 2 vs Plan 5 for 2026/27: thresholds, interest and write-off compared with lifetime projections, and when overpaying your student loan helps or wastes money.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Students",
    body: (
      <>
        <p>
          If you started an undergraduate course in England from August 2023, your loan is on <strong>Plan 5</strong>.
          If you started between September 2012 and July 2023 (in England or Wales), you are on <strong>Plan 2</strong>.
          The two look similar on paper, but they behave very differently over a working life. This guide compares them
          for 2026/27, using the same engine as our{" "}
          <Link href="/students/plan-2-student-loan">Plan 2</Link> and{" "}
          <Link href="/students/plan-5-student-loan">Plan 5</Link> calculators.
        </p>

        <h2>The rules side by side</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Plan 2</th>
              <th>Plan 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Repayment threshold 2026/27</td>
              <td>£29,385 a year</td>
              <td>£25,000 a year</td>
            </tr>
            <tr>
              <td>Repayment rate</td>
              <td>9% of income above the threshold</td>
              <td>9% of income above the threshold</td>
            </tr>
            <tr>
              <td>Threshold in future</td>
              <td>Frozen at £29,385 until April 2030</td>
              <td>Rises with RPI from April 2027</td>
            </tr>
            <tr>
              <td>Interest (September 2026 to August 2027)</td>
              <td>RPI to RPI + 3% depending on income, capped at 6%</td>
              <td>RPI only: 4.1%</td>
            </tr>
            <tr>
              <td>Written off</td>
              <td>30 years after you were first due to repay</td>
              <td>40 years after you were first due to repay</td>
            </tr>
          </tbody>
        </table>
        <p>
          On Plan 2, interest depends on what you earn: 4.1% (RPI) on income up to £29,385, rising on a sliding scale to
          RPI + 3% at £52,885, with the 6% cap applying this year. Someone on £40,000 is charged about 5.46%; anyone earning
          about £44,300 or more hits the 6% cap.
        </p>

        <h2>What comes out of your pay each month</h2>
        <p>
          Repayments depend only on your income, not on how much you borrowed. Plan 5&rsquo;s lower threshold means you
          repay more at every salary:
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Plan 2 a month</th>
              <th>Plan 5 a month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£25,000</td>
              <td>£0</td>
              <td>£0</td>
            </tr>
            <tr>
              <td>£30,000</td>
              <td>£4.61</td>
              <td>£37.50</td>
            </tr>
            <tr>
              <td>£35,000</td>
              <td>£42.11</td>
              <td>£75.00</td>
            </tr>
            <tr>
              <td>£40,000</td>
              <td>£79.61</td>
              <td>£112.50</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£154.61</td>
              <td>£187.50</td>
            </tr>
            <tr>
              <td>£60,000</td>
              <td>£229.61</td>
              <td>£262.50</td>
            </tr>
          </tbody>
        </table>
        <p>
          The gap is a steady £32.89 a month (£394.65 a year) once you earn above the Plan 2 threshold. That is 9% of the
          £4,385 difference between the two thresholds. Repayments are taken through PAYE alongside tax and NI; the{" "}
          <Link href="/tax-and-salary/salary-calculator">take-home pay calculator</Link> includes them.
        </p>

        <h2>What you repay over a lifetime</h2>
        <p>
          The real difference is the length of the term. Here are projections for a £50,000 balance, starting to repay
          now, with pay rising 3% a year and RPI at 3% from 2027:
        </p>
        <table>
          <thead>
            <tr>
              <th>Starting salary</th>
              <th>Plan 2: total repaid</th>
              <th>Plan 2: written off</th>
              <th>Plan 5: total repaid</th>
              <th>Plan 5: written off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£28,000</td>
              <td>£4,467</td>
              <td>£191,013</td>
              <td>£20,358</td>
              <td>£130,640</td>
            </tr>
            <tr>
              <td>£35,000</td>
              <td>£34,266</td>
              <td>£168,232</td>
              <td>£67,861</td>
              <td>£50,831</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£98,493</td>
              <td>£59,176</td>
              <td>£73,611</td>
              <td>£0 (cleared in year 24)</td>
            </tr>
          </tbody>
        </table>
        <p>Three things stand out:</p>
        <ul>
          <li>
            <strong>Most people on Plan 2 never clear the loan.</strong> Even a graduate starting on £50,000 still has a
            balance written off after 30 years in this projection, having repaid nearly twice what they borrowed.
          </li>
          <li>
            <strong>Plan 5 takes more from middle earners.</strong> At £35,000, a Plan 5 borrower repays roughly double
            what a Plan 2 borrower would, because the threshold is lower and the payments run for 40 years instead of
            30.
          </li>
          <li>
            <strong>Plan 5 is cheaper for high earners.</strong> Lower interest (RPI only) means a Plan 5 borrower on
            £50,000 clears the loan in 24 years and repays about £25,000 less than on Plan 2.
          </li>
        </ul>
        <p>
          The written-off figures look alarming, but you never pay them. Once the term ends, whatever is left is
          cancelled. The balance you see in your online account is, for many people, not a debt you will ever repay.
        </p>

        <h2>Should you overpay?</h2>
        <p>
          This is where most people go wrong. Overpaying only saves money if you were going to clear the loan anyway. If
          you are heading for a write-off, every extra pound simply replaces a pound that would have been cancelled.
        </p>
        <p>Here is the effect of overpaying £100 a month on a £50,000 Plan 5 loan:</p>
        <ul>
          <li>
            <strong>Starting salary £35,000:</strong> total repaid rises from £67,861 to <strong>£80,818</strong>. The
            loan is cleared in year 31, but you have paid nearly £13,000 more. Overpaying costs money.
          </li>
          <li>
            <strong>Starting salary £50,000:</strong> total repaid falls from £73,611 to <strong>£65,395</strong>, and
            the loan is cleared in year 17 instead of year 24. Overpaying saves about £8,200.
          </li>
        </ul>
        <p>
          The calculators show both paths for your own balance and pay. As a rough rule, overpaying makes sense only if
          you expect your earnings to be high enough to clear the loan well before the write-off date. Otherwise, the
          money usually does more in a pension (with tax relief) or a{" "}
          <Link href="/investing/isa-vs-gia">stocks and shares ISA</Link>, or towards a house deposit.
        </p>

        <h2>Common questions</h2>
        <h3>Does a student loan affect my mortgage?</h3>
        <p>
          It is not a debt on your credit file, but lenders count the monthly repayment as an outgoing when they work
          out how much to lend. A Plan 5 borrower on £40,000 has £112.50 a month taken into account. Our{" "}
          <Link href="/property/mortgage-affordability">mortgage affordability calculator</Link> lets you include it.
        </p>
        <h3>What if I have a Plan 2 loan and a Postgraduate Loan?</h3>
        <p>
          You repay both at once: 9% above the Plan 2 threshold and 6% above £21,000 for the Postgraduate Loan. See the{" "}
          <Link href="/students/postgrad-loan">Postgraduate Loan calculator</Link>.
        </p>
        <h3>What if I move abroad?</h3>
        <p>
          You must tell the Student Loans Company. Repayments are then set using the threshold for the country you live
          in, and you pay them directly instead of through PAYE.
        </p>
        <h3>I&rsquo;m starting university. What will I borrow?</h3>
        <p>
          Tuition fee loans plus maintenance loans of up to several thousand pounds a year. The{" "}
          <Link href="/students/maintenance-loan">maintenance loan calculator</Link> shows your entitlement from
          household income.
        </p>

        <h2>The bottom line</h2>
        <p>
          A student loan works more like a 9% graduate tax for 30 or 40 years than a normal debt. Plan 5 takes more from
          middle earners and less from high earners than Plan 2. Before you overpay, check whether you would ever clear
          the loan; for most people, you won&rsquo;t, and the money is better used elsewhere. These are projections
          based on assumptions about pay and inflation, not a guarantee.
        </p>
      </>
    ),
  },
  {
    slug: "first-time-buyer-costs",
    title: "Buying your first home in 2026/27: the real cost, from deposit to monthly payments",
    seoTitle: "First-Time Buyer Costs 2026/27: The Real Total",
    description:
      "Stamp Duty relief, deposit, legal fees, surveys and mortgage payments for first-time buyers in England, Scotland and Wales, worked through for a £350,000 home.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Property",
    body: (
      <>
        <p>
          The deposit is the number everyone focuses on, but it is only part of the cash you need to buy your first
          home. Stamp Duty, legal fees, a survey, a mortgage fee and the move itself all come on top. This guide walks
          through each cost for 2026/27, with a full worked example, so you can plan for the real total. The figures
          use the same engines as our <Link href="/property/first-time-buyer">first-time buyer calculator</Link> and{" "}
          <Link href="/property/moving-house-budget">moving house budget calculator</Link>.
        </p>

        <h2>1. The deposit</h2>
        <p>
          Most lenders need at least 5% of the price, but the rate you are offered improves as the deposit grows. The
          usual steps are 5%, 10%, 15%, 25% and 40%. Moving from a 5% to a 10% deposit often makes a noticeable
          difference to the rate.
        </p>
        <p>
          If you are aged 18 to 39, a <strong>Lifetime ISA</strong> can help: you can save up to £4,000 a year and the
          government adds 25% (up to £1,000 a year). The home must cost £450,000 or less, and you must have held the
          account for at least 12 months. Withdraw for any other reason before 60 and you pay a 25% charge, which takes
          back more than the bonus.
        </p>

        <h2>2. Stamp Duty and its equivalents</h2>
        <p>
          In England and Northern Ireland, first-time buyers pay no Stamp Duty on the first £300,000 and 5% on the part
          from £300,001 to £500,000. Above £500,000 the relief is lost completely and you pay the normal rates on the
          whole price. Scotland and Wales have their own taxes with different rules:
        </p>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>England / NI: first-time buyer</th>
              <th>England / NI: other buyers</th>
              <th>Scotland LBTT: first-time buyer</th>
              <th>Wales LTT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£250,000</td>
              <td>£0</td>
              <td>£2,500</td>
              <td>£1,500</td>
              <td>£1,500</td>
            </tr>
            <tr>
              <td>£300,000</td>
              <td>£0</td>
              <td>£5,000</td>
              <td>£4,000</td>
              <td>£4,500</td>
            </tr>
            <tr>
              <td>£350,000</td>
              <td>£2,500</td>
              <td>£7,500</td>
              <td>£7,750</td>
              <td>£7,500</td>
            </tr>
            <tr>
              <td>£450,000</td>
              <td>£7,500</td>
              <td>£12,500</td>
              <td>£17,750</td>
              <td>£14,250</td>
            </tr>
            <tr>
              <td>£500,000</td>
              <td>£10,000</td>
              <td>£15,000</td>
              <td>£22,750</td>
              <td>£18,000</td>
            </tr>
            <tr>
              <td>£510,000</td>
              <td>£15,500</td>
              <td>£15,500</td>
              <td>£23,750</td>
              <td>£18,750</td>
            </tr>
          </tbody>
        </table>
        <p>
          Note the cliff at £500,000: a first-time buyer in England pays £10,000 at £500,000 but £15,500 at £510,000.
          Wales has no first-time buyer relief, but its tax only starts above £225,000. To qualify in England, every
          buyer must be a first-time buyer, and the home must be your main residence. Check your figure with the{" "}
          <Link href="/property/stamp-duty-england">Stamp Duty calculator</Link>, the{" "}
          <Link href="/property/lbtt-scotland">LBTT calculator</Link> or the{" "}
          <Link href="/property/ltt-wales">LTT calculator</Link>.
        </p>

        <h2>3. Legal fees, survey and mortgage fee</h2>
        <ul>
          <li>
            <strong>Conveyancing:</strong> typically £1,200 to £2,000 including VAT and searches for a straightforward
            purchase. Leasehold flats cost more, as there is more paperwork.
          </li>
          <li>
            <strong>Survey:</strong>{" "}the lender&rsquo;s valuation is not a survey. A RICS Level 2 (HomeBuyer) report
            costs around £600; a Level 3 building survey, for older or unusual homes, around £1,000.
          </li>
          <li>
            <strong>Mortgage arrangement fee:</strong> often £999, though fee-free deals exist at a slightly higher
            rate. You can usually add the fee to the loan, but you then pay interest on it.
          </li>
          <li>
            <strong>Removals and setting up:</strong> from a few hundred pounds for a van to £1,000 or more for a full
            removal firm, plus anything you need to furnish the place.
          </li>
        </ul>

        <h2>A worked example: £350,000 in England</h2>
        <p>
          A first-time buyer in England buys a £350,000 home with a 10% deposit of £35,000. They pay £1,500 in legal
          fees, £600 for a HomeBuyer survey, a £999 mortgage fee and £1,000 for removals, and keep a 10% buffer for
          surprises:
        </p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deposit (10%)</td>
              <td>£35,000</td>
            </tr>
            <tr>
              <td>Stamp Duty (first-time buyer relief)</td>
              <td>£2,500</td>
            </tr>
            <tr>
              <td>Legal fees</td>
              <td>£1,500</td>
            </tr>
            <tr>
              <td>HomeBuyer survey</td>
              <td>£600</td>
            </tr>
            <tr>
              <td>Mortgage fee</td>
              <td>£999</td>
            </tr>
            <tr>
              <td>Removals</td>
              <td>£1,000</td>
            </tr>
            <tr>
              <td>10% contingency on the costs</td>
              <td>£659.90</td>
            </tr>
            <tr>
              <td>
                <strong>Total cash needed</strong>
              </td>
              <td>
                <strong>£42,258.90</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          On top of the deposit, the costs come to about £7,259. Without first-time buyer relief, the same purchase
          would need £47,758.90, because Stamp Duty would be £7,500 instead of £2,500.
        </p>

        <h2>4. The monthly payment</h2>
        <p>
          The mortgage in our example is £315,000. At an interest rate of 4.5%, the monthly repayment depends heavily on
          the term:
        </p>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Monthly payment</th>
              <th>Total paid over the term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25 years</td>
              <td>£1,750.87</td>
              <td>£525,262</td>
            </tr>
            <tr>
              <td>30 years</td>
              <td>£1,596.06</td>
              <td>£574,581</td>
            </tr>
            <tr>
              <td>35 years</td>
              <td>£1,490.76</td>
              <td>£626,119</td>
            </tr>
          </tbody>
        </table>
        <p>
          Stretching from 25 to 35 years saves about £260 a month but adds about £100,900 of interest if the rate stayed
          the same throughout. A rate of 5% instead of 4.5% on the 25-year mortgage would push the payment up to
          £1,841.46. Rates change, so try your own figures in the{" "}
          <Link href="/property/mortgage-repayment">mortgage repayment calculator</Link>, and use the{" "}
          <Link href="/property/mortgage-overpayment">overpayment calculator</Link> to see how regular overpayments
          shorten a long term.
        </p>

        <h2>5. How much can you borrow?</h2>
        <p>
          Most lenders cap borrowing at about 4 to 4.5 times household income, and some go to 5 or 5.5 times for
          higher earners or certain professions. They also stress-test whether you could afford the payments if rates
          rose, and take account of commitments such as car finance, childcare and student loan repayments. The{" "}
          <Link href="/property/mortgage-affordability">mortgage affordability calculator</Link> gives a realistic range.
        </p>

        <h2>Other routes to a first home</h2>
        <ul>
          <li>
            <strong>Shared ownership:</strong> buy a share (often 25% to 75%) and pay rent on the rest. The deposit is
            smaller, but you pay rent, service charges and a mortgage. The{" "}
            <Link href="/property/shared-ownership">shared ownership calculator</Link> adds it all up.
          </li>
          <li>
            <strong>Buying with someone else:</strong> joint incomes raise what you can borrow. For first-time buyer
            relief in England, every buyer must be a first-time buyer.
          </li>
          <li>
            <strong>Keep renting for now:</strong>{" "}buying isn&rsquo;t always cheaper. The{" "}
            <Link href="/property/rent-vs-buy">rent vs buy calculator</Link> compares the two over time.
          </li>
        </ul>

        <h2>Ongoing costs to budget for</h2>
        <p>
          Once you own the home, budget for buildings insurance (often required by the lender), council tax, energy
          and water, maintenance (a common rule of thumb is 1% of the property&rsquo;s value a year), and, for
          leasehold flats, ground rent and service charges. The{" "}
          <Link href="/property/council-tax-bands">council tax calculator</Link> estimates the bill by band, and if you
          live alone the{" "}
          <Link href="/property/single-person-discount">single person discount</Link> takes 25% off it.
        </p>

        <h2>The bottom line</h2>
        <p>
          For a typical first home, plan for the deposit plus roughly £5,000 to £10,000 of costs, depending on the price
          and where you buy. First-time buyer relief makes a large difference in England up to £500,000, and the
          mortgage term changes the monthly payment far more than most people expect. These figures are estimates for
          2026/27 and general guidance, not mortgage or financial advice.
        </p>
      </>
    ),
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
