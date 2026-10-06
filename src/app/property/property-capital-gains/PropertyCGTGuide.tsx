import {
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Capital Gains Tax on property — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "when", title: "When you pay CGT on property" },
  { id: "gain", title: "Working out the gain" },
  { id: "costs", title: "Costs you can deduct" },
  { id: "rates", title: "Rates and the annual exempt amount" },
  { id: "example", title: "A worked example" },
  { id: "income", title: "How your income sets the rate" },
  { id: "prr", title: "Private Residence Relief" },
  { id: "prr-example", title: "Example: a former home let out" },
  { id: "absence", title: "Time away from home" },
  { id: "joint", title: "Joint owners, spouses and civil partners" },
  { id: "losses", title: "Losses" },
  { id: "reporting", title: "Reporting and paying in 60 days" },
  { id: "special", title: "Inherited and gifted property" },
  { id: "reduce", title: "Legitimate ways to reduce the bill" },
  { id: "improvements-example", title: "Example: deducting improvements" },
  { id: "part", title: "Selling part of a property or land" },
  { id: "company", title: "Property owned through a company" },
  { id: "non-resident", title: "Non-residents and moving abroad" },
  { id: "records", title: "Records to keep" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax when you sell property", href: "https://www.gov.uk/tax-sell-property" },
  { label: "GOV.UK — Tax when you sell your home (Private Residence Relief)", href: "https://www.gov.uk/tax-sell-home" },
  { label: "GOV.UK — Report and pay CGT on UK property", href: "https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-sold-a-property-in-the-uk-on-or-after-6-april-2020" },
  { label: "GOV.UK — Capital Gains Tax rates and allowances", href: "https://www.gov.uk/capital-gains-tax/rates" },
  { label: "HMRC — Private Residence Relief (HS283)", href: "https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet" },
];

export default function PropertyCGTGuide() {
  return (
    <Guide
      kicker="The property CGT guide"
      title="Capital Gains Tax on property, explained"
      intro={
        <>
          Selling a buy-to-let, a second home or a former home can mean paying Capital Gains Tax. This guide explains how the
          gain is worked out, the 18% and 24% rates, Private Residence Relief, joint ownership, and the 60-day deadline to report
          and pay.
        </>
      }
      meta={["2026/27 rules", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="when" n={1} kicker="The basics" title="When you pay CGT on property">
        <p>You may pay Capital Gains Tax when you sell, give away or otherwise dispose of a property that has risen in value, such as:</p>
        <ul>
          <li>a buy-to-let or other rental property;</li>
          <li>a second home or holiday home;</li>
          <li>a home you used to live in but let out or left empty for a while;</li>
          <li>inherited property that rose in value after you inherited it;</li>
          <li>land, or part of your garden if sold separately and it is large.</li>
        </ul>
        <p>
          You do not usually pay CGT when you sell your only or main home that you lived in throughout, thanks to Private Residence
          Relief.
        </p>
      </GuideSection>

      <GuideSection id="gain" n={2} kicker="The gain" title="Working out the gain">
        <p>The gain is what you sold the property for, minus what you paid and your allowable costs:</p>
        <WorkedExample
          title="The gain"
          steps={[
            { label: "Sale price", value: "£350,000" },
            { label: "Purchase price", value: "−£220,000" },
            { label: "Costs of buying", note: "Stamp Duty, legal, survey", value: "−£5,000" },
            { label: "Costs of selling", note: "Estate agent, legal", value: "−£5,000" },
          ]}
          total={{ label: "Gain", value: "£120,000" }}
        />
        <p>
          If you were given the property or inherited it, use its market value at that time instead of a purchase price. If you
          gave it to someone other than a spouse or civil partner, use its market value when you gave it.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={3} kicker="Deductions" title="Costs you can deduct">
        <CompareCards
          columns={[
            {
              name: "You can deduct",
              rows: [
                { label: "Buying", value: "Stamp Duty, legal fees, survey" },
                { label: "Selling", value: "Estate agent, legal fees" },
                { label: "Improvements", value: "Extension, loft conversion, new kitchen" },
                { label: "Defending title", value: "Legal costs to defend ownership" },
              ],
            },
            {
              name: "You cannot deduct",
              rows: [
                { label: "Repairs", value: "Repairs and maintenance" },
                { label: "Decorating", value: "Redecorating and like-for-like replacements" },
                { label: "Mortgage", value: "Mortgage interest and fees" },
                { label: "Running costs", value: "Costs already claimed against rent" },
              ],
            },
          ]}
        />
        <p>Keep invoices for improvements. HMRC can ask for evidence, sometimes years later.</p>
      </GuideSection>

      <GuideSection id="rates" n={4} kicker="Rates" title="Rates and the annual exempt amount">
        <p>
          Everyone has an annual exempt amount of <strong>£3,000</strong>. Gains above that are taxed at:
        </p>
        <DataTable
          caption="CGT rates on residential property, 2026/27"
          head={["Part of the gain", "Rate"]}
          rows={[
            ["Within your unused basic-rate band", "18%"],
            ["Above the basic-rate band", "24%"],
          ]}
        />
        <p>
          The higher rate on residential property fell from 28% to 24% in April 2024. The annual exempt amount fell from £12,300
          in 2022/23 to £3,000 from 2024/25, which has brought many smaller gains into tax.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Worked example" title="A worked example">
        <p>A landlord earning £40,000 sells a buy-to-let they never lived in, with the £120,000 gain from above:</p>
        <WorkedExample
          title="CGT on a £120,000 gain"
          steps={[
            { label: "Gain", value: "£120,000" },
            { label: "Annual exempt amount", value: "−£3,000" },
            { label: "£10,270 at 18%", note: "Unused basic-rate band", value: "£1,849" },
            { label: "£106,730 at 24%", value: "£25,615" },
          ]}
          total={{ label: "Capital Gains Tax", value: "£27,464" }}
        />
        <p>That is an effective rate of 22.9% on the gain. It must be reported and paid within 60 days of completion.</p>
      </GuideSection>

      <GuideSection id="income" n={6} kicker="Your rate" title="How your income sets the rate">
        <p>
          Gains are added on top of your taxable income. The part that fits in your unused basic-rate band is taxed at 18%; the
          rest at 24%. The basic-rate band is £37,700 of taxable income above the Personal Allowance.
        </p>
        <DataTable
          caption="CGT on a £120,000 gain by income"
          head={["Other income", "Taxed at 18%", "Taxed at 24%", "CGT"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£25,000", "£25,270", "£91,730", "£26,564"],
            ["£40,000", "£10,270", "£106,730", "£27,464"],
            ["£60,000", "£0", "£117,000", "£28,080"],
          ]}
        />
        <p>
          Because a large gain uses up the basic-rate band quickly, the difference between a lower and higher earner is often
          smaller than people expect. Selling in a year when your income is lower, such as after retiring, can help a little.
        </p>
      </GuideSection>

      <GuideSection id="prr" n={7} kicker="Relief" title="Private Residence Relief">
        <p>
          Private Residence Relief (PRR) means you pay no CGT on the gain for any period a property was your only or main home.
          You also get relief for the <strong>last 9 months</strong> you owned it, as long as it was your main home at some point,
          even if you had moved out.
        </p>
        <p>
          If the home was your main residence for only part of the time, the relief is worked out as a fraction: months of relief
          divided by months owned. The calculator assumes you lived there first and let it or left it afterwards.
        </p>
        <Callout title="Lettings relief is now limited">
          Lettings relief used to add up to £40,000 of extra relief for letting a former home. Since April 2020 it only applies if
          you lived in the property at the same time as your tenant.
        </Callout>
      </GuideSection>

      <GuideSection id="prr-example" n={8} kicker="Worked example" title="Example: a former home let out">
        <p>
          The same property was bought for £220,000, lived in for 5 years, then let out for 5 years and sold for £350,000. The
          owner earns £40,000.
        </p>
        <WorkedExample
          title="A former home let for 5 years"
          steps={[
            { label: "Gain", value: "£120,000" },
            { label: "Relief share", note: "(60 months lived + 9 final months) ÷ 120 months", value: "57.5%" },
            { label: "Private Residence Relief", value: "−£69,000" },
            { label: "Chargeable gain", value: "£51,000" },
          ]}
          total={{ label: "Capital Gains Tax", value: "£10,904" }}
        />
        <p>Living there first cut the tax from £27,464 to £10,904.</p>
      </GuideSection>

      <GuideSection id="absence" n={9} kicker="Absences" title="Time away from home">
        <p>Some periods away still count as living there, if the home was your main residence both before and after:</p>
        <ul>
          <li>up to 3 years in total for any reason;</li>
          <li>up to 4 years if your job meant you had to live elsewhere in the UK;</li>
          <li>any length of time if you worked abroad.</li>
        </ul>
        <p>
          The final period relief is 36 months instead of 9 if you, or your spouse, are disabled or moving into a care home. These
          rules are detailed, so check HMRC&apos;s helpsheet or take advice.
        </p>
      </GuideSection>

      <GuideSection id="joint" n={10} kicker="Couples" title="Joint owners, spouses and civil partners">
        <p>
          Joint owners each pay CGT on their share of the gain. Each has their own £3,000 exempt amount and their own basic-rate
          band. Two owners with £40,000 incomes splitting the £120,000 gain would each pay £13,064, £26,128 together, about
          £1,336 less than one owner.
        </p>
        <p>
          Married couples and civil partners can transfer assets to each other with no CGT. Moving a share into joint names before
          a sale can use both allowances and both basic-rate bands. If you separate, transfers are also free of CGT for up to three
          years after you stop living together, and longer under a court order.
        </p>
      </GuideSection>

      <GuideSection id="losses" n={11} kicker="Losses" title="Losses">
        <p>
          If you make a loss on a property, you can set it against gains in the same tax year, or carry it forward to future years
          if you report it to HMRC within four years. Losses brought forward are used only to bring your gains down to the annual
          exempt amount, so you do not waste them.
        </p>
      </GuideSection>

      <GuideSection id="reporting" n={12} kicker="Deadlines" title="Reporting and paying in 60 days">
        <Timeline
          items={[
            { when: "Completion", what: "The sale completes", detail: "The 60-day clock starts on the completion date, not exchange." },
            { when: "Within 60 days", what: "Report and pay", detail: "Use HMRC's UK property account to report the gain and pay an estimate of the tax." },
            { when: "By 31 January", what: "Self Assessment", detail: "If you file a tax return, include the gain. Any difference is settled then." },
          ]}
        />
        <p>
          You only need to report within 60 days if there is tax to pay. Non-UK residents must report all disposals of UK property
          within 60 days, even if no tax is due. Late reporting and payment bring penalties and interest.
        </p>
      </GuideSection>

      <GuideSection id="special" n={13} kicker="Special cases" title="Inherited and gifted property">
        <p>
          <strong>Inherited property.</strong> There is no CGT when you inherit. When you sell, the gain is measured from the
          probate value, so selling soon after inheriting often produces little or no gain.
        </p>
        <p>
          <strong>Gifts.</strong> Giving a property to anyone other than a spouse or civil partner counts as selling it at market
          value, so CGT can be due even though you received nothing. The gift may also have Inheritance Tax consequences.
        </p>
      </GuideSection>

      <GuideSection id="reduce" n={14} kicker="Planning" title="Legitimate ways to reduce the bill">
        <ul>
          <li>Claim every allowable cost, including Stamp Duty and improvement work.</li>
          <li>Use both spouses&apos; allowances and basic-rate bands through joint ownership.</li>
          <li>Time the sale for a year when your income is lower.</li>
          <li>Make pension contributions in the year of sale, which can extend your basic-rate band.</li>
          <li>Use capital losses from other assets.</li>
          <li>If it was your home, make sure Private Residence Relief, including the final 9 months, is claimed.</li>
        </ul>
      </GuideSection>

      <GuideSection id="improvements-example" n={15} kicker="Worked example" title="Example: deducting improvements">
        <p>
          The landlord in the earlier example spent £20,000 on a rear extension. That is a capital improvement, so it comes off the
          gain:
        </p>
        <WorkedExample
          title="The same sale with a £20,000 extension"
          steps={[
            { label: "Gain before improvements", value: "£120,000" },
            { label: "Extension", value: "−£20,000" },
            { label: "Gain", value: "£100,000" },
          ]}
          total={{ label: "Capital Gains Tax", value: "£22,664" }}
        />
        <p>
          That saves £4,800, 24% of the extension&apos;s cost. Replacing a kitchen with a similar one, by contrast, is usually a
          repair and is not deductible from the gain, though it may be deductible from rental income instead.
        </p>
      </GuideSection>

      <GuideSection id="part" n={16} kicker="Special cases" title="Selling part of a property or land">
        <p>
          If you sell part of your garden or land, the gain is worked out using a share of the original cost. Private Residence
          Relief usually covers gardens and grounds up to half a hectare, including the building, if they are enjoyed with the
          home. If you sell land separately after selling the house, relief may not apply.
        </p>
        <p>Selling a share of a property, for example to a partner, is a disposal of that share and CGT can be due on it.</p>
      </GuideSection>

      <GuideSection id="company" n={17} kicker="Companies" title="Property owned through a company">
        <p>
          A company does not pay Capital Gains Tax. Gains on property it sells are part of its profits and pay Corporation Tax at
          19% to 25%. Getting the money out of the company then means dividends or salary, which are taxed again. Moving a
          property you own personally into a company counts as selling it at market value, so CGT, and usually Stamp Duty, can be
          due.
        </p>
      </GuideSection>

      <GuideSection id="non-resident" n={18} kicker="Overseas" title="Non-residents and moving abroad">
        <p>
          Non-UK residents pay UK CGT on gains from UK property, usually only on the gain since April 2015 for residential property.
          They must report every sale within 60 days, even if there is no tax to pay.
        </p>
        <p>
          If you are moving abroad, selling before you leave or after you return can change what is due. Some countries also tax
          the same gain, with relief under a double tax agreement. Take advice before selling around a move.
        </p>
      </GuideSection>

      <GuideSection id="records" n={19} kicker="Paperwork" title="Records to keep">
        <p>HMRC can check your CGT calculation, sometimes years later. Keep:</p>
        <ul>
          <li>the completion statements from when you bought and sold;</li>
          <li>your Stamp Duty return and legal and estate agent invoices;</li>
          <li>invoices for improvements, with dates, and photos if you have them;</li>
          <li>evidence of when the property was your main home, such as council tax bills, bank statements and the electoral roll;</li>
          <li>valuations used for inherited or gifted property.</li>
        </ul>
        <p>Keep them for at least a year after the Self Assessment deadline for the tax year of the sale, and longer if you can.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£3,000", label: "Annual exempt amount" },
            { value: "18% / 24%", label: "CGT rates on residential property" },
            { value: "9 months", label: "Final period always covered by home relief" },
            { value: "60 days", label: "To report and pay after completion" },
            { value: "£37,700", label: "Basic-rate band that sets the 18% portion" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
