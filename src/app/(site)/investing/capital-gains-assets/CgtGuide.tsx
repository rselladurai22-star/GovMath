import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Capital Gains Tax — the guide. Figures from src/lib/investing/tax.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What Capital Gains Tax is" },
  { id: "working-out", title: "Working out the gain" },
  { id: "rates", title: "Rates and the annual exempt amount" },
  { id: "bands", title: "How your income sets the rate" },
  { id: "examples", title: "Worked examples" },
  { id: "losses", title: "Using losses" },
  { id: "shares", title: "Shares and funds: the matching rules" },
  { id: "property", title: "Property" },
  { id: "crypto", title: "Cryptoassets" },
  { id: "business", title: "Business Asset Disposal Relief" },
  { id: "exempt", title: "What is exempt" },
  { id: "reducing", title: "Ways to reduce the bill" },
  { id: "reporting", title: "Reporting and paying" },
  { id: "spouses", title: "Spouses and civil partners" },
  { id: "gift-relief", title: "Gifts of business assets" },
  { id: "eis", title: "EIS and SEIS" },
  { id: "employee", title: "Employee share schemes" },
  { id: "non-residents", title: "Moving abroad and non-residents" },
  { id: "records", title: "Keeping records" },
  { id: "timing", title: "Timing a sale" },
  { id: "inherited", title: "Inherited assets" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Capital Gains Tax", href: "https://www.gov.uk/capital-gains-tax" },
  { label: "GOV.UK — Capital Gains Tax: what you pay it on, rates and allowances", href: "https://www.gov.uk/capital-gains-tax/rates" },
  { label: "GOV.UK — Tax when you sell shares", href: "https://www.gov.uk/tax-sell-shares" },
  { label: "GOV.UK — Report and pay Capital Gains Tax on UK property", href: "https://www.gov.uk/report-and-pay-your-capital-gains-tax" },
  { label: "GOV.UK — Business Asset Disposal Relief", href: "https://www.gov.uk/business-asset-disposal-relief" },
];

export default function CgtGuide() {
  return (
    <Guide
      kicker="The Capital Gains Tax guide"
      title="Capital Gains Tax in 2026/27"
      intro={
        <>
          Capital Gains Tax is charged on the profit when you sell or give away something that has gone up in value, such as shares, funds, a
          second property or cryptoassets. With the tax-free allowance now just £3,000, far more people pay it than a few years ago. This guide
          explains how the gain and the rate are worked out, the rules for each type of asset, and legal ways to pay less.
        </>
      }
      meta={["2026/27 rules", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            The first <strong>£3,000</strong> of gains each tax year is tax-free.
          </li>
          <li>
            Gains are taxed at <strong>18%</strong> within your unused basic-rate band and <strong>24%</strong> above it.
          </li>
          <li>The same rates apply to shares, property and most other assets.</li>
          <li>
            Business Asset Disposal Relief gives <strong>18%</strong> on qualifying business sales from 6 April 2026.
          </li>
          <li>Gains inside ISAs and pensions, and on your main home, are usually tax-free.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£3,000", label: "Annual exempt amount" },
            { value: "18%", label: "Basic-rate band" },
            { value: "24%", label: "Above the basic-rate band" },
            { value: "60 days", label: "To report UK property sales" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What Capital Gains Tax is">
        <p>
          Capital Gains Tax applies when you &ldquo;dispose&rdquo; of an asset: selling it, giving it away, swapping it, or receiving compensation for
          it. You pay tax on the gain, not on the whole amount you receive. Gifts are treated as if you sold at market value, except gifts to a
          spouse, civil partner or charity.
        </p>
        <p>
          UK residents pay Capital Gains Tax on assets anywhere in the world. Companies pay Corporation Tax on their gains instead.
        </p>
      </GuideSection>

      <GuideSection id="working-out" n={3} kicker="The gain" title="Working out the gain">
        <p>The gain is what you received, less what you paid and the costs of buying, improving and selling.</p>
        <WorkedExample
          title="Shares bought for £30,000 and sold for £60,000, with £500 of dealing costs"
          steps={[
            { label: "Sale price", value: "£60,000" },
            { label: "Less purchase price", value: "−£30,000" },
            { label: "Less costs", value: "−£500" },
          ]}
          total={{ label: "Gain", value: "£29,500" }}
        />
        <p>
          Allowable costs include broker fees, stamp duty, legal fees, estate agent fees and the cost of improvements that add value. Repairs,
          maintenance, mortgage interest and the costs of owning the asset are not allowed.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={4} kicker="Rates" title="Rates and the annual exempt amount">
        <DataTable
          caption="Capital Gains Tax rates, 2026/27"
          head={["", "Within the basic-rate band", "Above it"]}
          rows={[
            ["Shares, funds, crypto, other assets", "18%", "24%"],
            ["Residential property", "18%", "24%"],
            ["Business Asset Disposal Relief", "18%", "18%"],
            ["Investors' Relief", "18%", "18%"],
          ]}
        />
        <p>
          The annual exempt amount was cut from £12,300 to £6,000 in April 2023, and to £3,000 in April 2024. It cannot be carried forward, so it
          is lost if you do not use it in the tax year.
        </p>
      </GuideSection>

      <GuideSection id="bands" n={5} kicker="Your rate" title="How your income sets the rate">
        <p>
          Your taxable income, including savings and dividends, uses up the basic-rate band first. Gains then fill whatever is left at 18%, with the
          rest at 24%. Scottish taxpayers use the UK bands for gains, not the Scottish ones.
        </p>
        <Figure label="Tax on a gain, by income" caption="Salary of £30,000 compared with £70,000, 2026/27.">
          <Bars
            items={[
              { label: "£10k gain, £30k salary", value: 1260 },
              { label: "£10k gain, £70k salary", value: 1680 },
              { label: "£50k gain, £30k salary", value: 10064 },
              { label: "£50k gain, £70k salary", value: 11280 },
            ]}
          />
        </Figure>
        <Callout tone="good" title="Pension contributions and Gift Aid help">
          Personal pension contributions and Gift Aid donations extend your basic-rate band, which means more of a gain can be taxed at 18%.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Real numbers" title="Worked examples">
        <WorkedExample
          title="The £29,500 gain, with a salary of £45,000"
          steps={[
            { label: "Gain", value: "£29,500" },
            { label: "Annual exempt amount", value: "−£3,000" },
            { label: "Basic-rate band left: £37,700 − £32,430", value: "£5,270" },
            { label: "£5,270 at 18%", value: "£949" },
            { label: "£21,230 at 24%", value: "£5,095" },
          ]}
          total={{ label: "Capital Gains Tax", value: "£6,044" }}
        />
        <DataTable
          caption="Tax on different gains, 2026/27"
          head={["Gain", "Salary £30,000", "Salary £70,000"]}
          numeric={[1, 2]}
          rows={[
            ["£5,000", "£360", "£480"],
            ["£10,000", "£1,260", "£1,680"],
            ["£20,000", "£3,060", "£4,080"],
            ["£50,000", "£10,064", "£11,280"],
            ["£100,000", "£22,064", "£23,280"],
          ]}
        />
      </GuideSection>

      <GuideSection id="losses" n={7} kicker="Losses" title="Using losses">
        <p>
          Losses made in the same tax year are set against gains in full, even if that wastes the annual exempt amount. Unused losses carry forward
          indefinitely, but you must report them to HMRC within four years of the end of the tax year you made them. Brought-forward losses are only
          used to bring your gains down to the exempt amount, so the allowance is not wasted.
        </p>
        <WorkedExample
          title="Gains of £12,000, losses of £4,000 this year and £8,000 brought forward"
          steps={[
            { label: "Gains less this year's losses", value: "£8,000" },
            { label: "Brought-forward losses used", value: "£5,000" },
            { label: "Left to set against the exempt amount", value: "£3,000" },
          ]}
          total={{ label: "Tax, with £3,000 of losses still to carry forward", value: "£0" }}
        />
      </GuideSection>

      <GuideSection id="shares" n={8} kicker="Investments" title="Shares and funds: the matching rules">
        <p>When you sell shares in a company you bought at different times, the cost is worked out using three rules, in order:</p>
        <ol>
          <li>Shares bought on the same day.</li>
          <li>Shares bought in the following 30 days (the &ldquo;bed and breakfasting&rdquo; rule).</li>
          <li>The rest from a pool, at the average cost of all the shares you hold.</li>
        </ol>
        <p>
          Accumulation units in funds add reinvested income to your cost, so keep the annual statements. Dividends are taxed separately as income.
        </p>
      </GuideSection>

      <GuideSection id="property" n={9} kicker="Homes" title="Property">
        <p>
          Your main home is usually exempt through Private Residence Relief. Second homes and buy-to-let properties are taxed at 18% and 24%. If you
          lived in a property for part of the time you owned it, part of the gain is exempt, and the final 9 months of ownership always qualify. The{" "}
          <a href="/property/property-capital-gains">property Capital Gains Tax calculator</a> covers this in detail.
        </p>
        <Callout tone="warn" title="Report within 60 days">
          UK residents must report and pay tax on a UK residential property sale within 60 days of completion.
        </Callout>
      </GuideSection>

      <GuideSection id="crypto" n={10} kicker="Digital assets" title="Cryptoassets">
        <p>
          Selling, swapping one token for another, or spending crypto are all disposals. The same pooling rules as shares apply. Keep records of
          every transaction in pounds at the time. From 2026, UK crypto platforms report customers&rsquo; transactions to HMRC under international
          reporting rules, so gains are easier for HMRC to spot.
        </p>
      </GuideSection>

      <GuideSection id="business" n={11} kicker="Business owners" title="Business Asset Disposal Relief">
        <p>
          If you sell all or part of a trading business, or shares in your own trading company where you hold at least 5% and work for it, gains up
          to a £1 million lifetime limit are taxed at the reduced rate. The rate rose from 10% to 14% in April 2025 and to 18% from 6 April 2026.
        </p>
        <WorkedExample
          title="A £500,000 business gain, salary £60,000"
          steps={[
            { label: "Gain less exempt amount", value: "£497,000" },
            { label: "At 18%", value: "£89,460" },
          ]}
          total={{ label: "Saving compared with 24%", value: "£29,820" }}
        />
      </GuideSection>

      <GuideSection id="exempt" n={12} kicker="Tax-free" title="What is exempt">
        <CompareCards
          columns={[
            {
              name: "Usually exempt",
              rows: [
                { label: "Wrappers", value: "ISAs and pensions" },
                { label: "Home", value: "Your main home" },
                { label: "Government bonds", value: "Gilts and Premium Bonds" },
                { label: "Personal items", value: "Cars, and items under £6,000" },
              ],
            },
            {
              name: "Usually taxable",
              rows: [
                { label: "Investments", value: "Shares and funds outside ISAs" },
                { label: "Property", value: "Second homes and buy-to-let" },
                { label: "Crypto", value: "All disposals" },
                { label: "Valuables", value: "Items over £6,000" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="reducing" n={13} kicker="Planning" title="Ways to reduce the bill">
        <ul>
          <li>Use the £3,000 exempt amount every year, selling gradually rather than all at once.</li>
          <li>Split a sale across two tax years, either side of 5 April, to use two exempt amounts and two basic-rate bands.</li>
          <li>Transfer assets to a spouse or civil partner before selling, so both allowances and bands are used.</li>
          <li>Pay into a pension or give to charity with Gift Aid to extend your basic-rate band.</li>
          <li>Move investments into an ISA each year using &ldquo;bed and ISA&rdquo;.</li>
          <li>Claim all allowable costs and report losses.</li>
        </ul>
        <DataTable
          caption="The £29,500 gain with a £45,000 salary"
          head={["Approach", "Tax"]}
          numeric={[1]}
          rows={[
            ["Sell everything in one tax year", "£6,044"],
            ["Half now, half after 5 April", "£5,008"],
            ["Give half to a spouse earning £20,000 first", "£4,619"],
          ]}
        />
      </GuideSection>

      <GuideSection id="reporting" n={14} kicker="Deadlines" title="Reporting and paying">
        <Timeline
          items={[
            { when: "Within 60 days", what: "UK residential property", detail: "Report and pay through a Capital Gains Tax on UK property account." },
            { when: "By 31 January", what: "Other gains", detail: "In your Self Assessment return for the tax year." },
            { when: "Any time", what: "Real-time service", detail: "If you do not file a tax return, report gains as they happen." },
          ]}
        />
        <p>You must report gains if your total proceeds are over £50,000, even if no tax is due, or if you have a gain above the exempt amount.</p>
      </GuideSection>

      <GuideSection id="spouses" n={15} kicker="Couples" title="Spouses and civil partners">
        <p>
          Transfers between spouses or civil partners who live together are treated as giving neither gain nor loss. The receiving partner takes
          over the original cost. That means a couple can put assets into the name of whoever pays less tax, or share them so that both annual exempt
          amounts and both basic-rate bands are used. The transfer must be a genuine gift with no strings attached.
        </p>
        <p>
          Separating couples have until the end of the third tax year after they stop living together to transfer assets without a gain, and longer
          where transfers are part of a formal divorce agreement.
        </p>
      </GuideSection>

      <GuideSection id="gift-relief" n={16} kicker="Family businesses" title="Gifts of business assets">
        <p>
          If you give away business assets or shares in an unlisted trading company, you and the person receiving them can claim gift holdover relief.
          The gain is not taxed now; instead it reduces the recipient&rsquo;s base cost, so tax is paid when they eventually sell. Gifts into most
          trusts can also qualify for holdover relief.
        </p>
      </GuideSection>

      <GuideSection id="eis" n={17} kicker="Venture investing" title="EIS and SEIS">
        <p>
          Shares bought under the Enterprise Investment Scheme or Seed Enterprise Investment Scheme are free of Capital Gains Tax if held for at least
          3 years and the income tax relief was given. Investing a gain in EIS shares can defer the tax on that gain until the EIS shares are sold, and
          SEIS can exempt half of a reinvested gain. These are high-risk investments in small companies, so the tax relief should not be the only
          reason to invest.
        </p>
      </GuideSection>

      <GuideSection id="employee" n={18} kicker="Work shares" title="Employee share schemes">
        <p>
          Shares from Save As You Earn (Sharesave) and Share Incentive Plans can be moved into an ISA within set time limits, sheltering future gains.
          Enterprise Management Incentive options can qualify for Business Asset Disposal Relief without the 5% holding test. Shares from other
          schemes may have been taxed as income when you received them, which increases your base cost, so check payslips and award letters.
        </p>
      </GuideSection>

      <GuideSection id="non-residents" n={19} kicker="International" title="Moving abroad and non-residents">
        <p>
          Non-residents pay UK Capital Gains Tax on UK land and property, but generally not on shares. If you leave the UK for fewer than five full tax
          years, gains made while abroad on assets you owned before leaving can be taxed when you return. Get advice before selling large holdings
          around a move abroad.
        </p>
      </GuideSection>

      <GuideSection id="records" n={20} kicker="Paperwork" title="Keeping records">
        <ul>
          <li>Contract notes or statements showing what you paid and when.</li>
          <li>Dividend reinvestment and fund statements for accumulation units.</li>
          <li>Receipts for improvements to property, and solicitor&rsquo;s completion statements.</li>
          <li>For crypto, a record of every trade in pounds, including fees.</li>
        </ul>
        <p>Keep records for at least a year after the Self Assessment deadline, and longer for assets you still own.</p>
      </GuideSection>

      <GuideSection id="timing" n={21} kicker="Planning" title="Timing a sale">
        <p>
          The tax year ends on 5 April. Selling on 6 April instead of 5 April gives you a new exempt amount and a fresh basic-rate band, and delays the
          payment deadline by a year. In a year when your income is lower, such as after retiring or during a career break, more of a gain falls into
          the 18% band.
        </p>
      </GuideSection>

      <GuideSection id="inherited" n={22} kicker="Inheritance" title="Inherited assets">
        <p>
          When you inherit something, your base cost for Capital Gains Tax is its value at the date of death, as agreed for probate. Any rise in
          value before then is never taxed as a gain. If you sell soon after inheriting, there is usually little or no gain. Executors who sell
          assets during the administration of an estate pay Capital Gains Tax themselves, with their own exempt amount in the tax year of death and
          the two following years.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={23} kicker="FAQs" title="Common questions">
        <h3>Do I pay Capital Gains Tax on my home?</h3>
        <p>Not usually, if it has been your main home throughout and the garden is under half a hectare.</p>
        <h3>Do I pay Capital Gains Tax on gifts to my children?</h3>
        <p>Yes. A gift is treated as a sale at market value, so tax may be due even though you receive nothing.</p>
        <h3>Can I carry forward the £3,000 allowance?</h3>
        <p>No. It is lost if not used in the tax year.</p>
        <h3>Is Capital Gains Tax charged on death?</h3>
        <p>No. Heirs inherit at the market value on the date of death, though Inheritance Tax may apply.</p>
        <h3>Do I pay Capital Gains Tax on investment funds in an ISA?</h3>
        <p>No. Gains inside an ISA are tax-free and do not need to be reported.</p>
        <h3>Is there Capital Gains Tax on selling a car?</h3>
        <p>No. Private cars are exempt, even classic cars that rise in value.</p>
        <h3>What if I sell at a loss?</h3>
        <p>
          Report the loss to HMRC within four years. It can then be set against future gains, so it is worth claiming even if you have no gains this
          year.
        </p>
        <h3>Does Capital Gains Tax push me into a higher income tax band?</h3>
        <p>No. Gains do not change your income tax, although your income decides whether a gain is taxed at 18% or 24%.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={24} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£3,000", label: "Annual exempt amount" },
            { value: "18%", label: "Basic-rate band" },
            { value: "24%", label: "Higher rate" },
            { value: "18%", label: "Business Asset Disposal Relief" },
            { value: "£1m", label: "BADR lifetime limit" },
            { value: "£37,700", label: "Basic-rate band" },
            { value: "60 days", label: "Property reporting" },
            { value: "£50,000", label: "Proceeds that must be reported" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
