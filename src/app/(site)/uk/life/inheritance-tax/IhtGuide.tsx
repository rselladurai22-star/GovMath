import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Inheritance Tax — the guide. Figures from src/lib/life/estate.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "bands", title: "The two tax-free bands" },
  { id: "couples", title: "Married couples and civil partners" },
  { id: "examples", title: "How much tax at different estate sizes" },
  { id: "taper", title: "Estates over £2 million" },
  { id: "gifts", title: "Gifts and the 7-year rule" },
  { id: "exempt-gifts", title: "Gifts that are always exempt" },
  { id: "charity", title: "Leaving 10% to charity" },
  { id: "business", title: "Business and farm relief from April 2026" },
  { id: "pensions", title: "Pensions from April 2027" },
  { id: "paying", title: "Paying the tax" },
  { id: "planning", title: "Planning ideas" },
  { id: "what-counts", title: "What counts in the estate" },
  { id: "downsizing", title: "Downsizing and the residence band" },
  { id: "trusts", title: "Trusts in brief" },
  { id: "insurance", title: "Life insurance and Inheritance Tax" },
  { id: "mistakes", title: "Mistakes executors make" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Inheritance Tax", href: "https://www.gov.uk/inheritance-tax" },
  { label: "GOV.UK — Inheritance Tax thresholds and interest rates", href: "https://www.gov.uk/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates" },
  { label: "GOV.UK — Gifts and the 7-year rule", href: "https://www.gov.uk/inheritance-tax/gifts" },
  { label: "GOV.UK — Changes to agricultural property relief and business property relief", href: "https://www.gov.uk/government/publications/changes-to-agricultural-property-relief-and-business-property-relief" },
  { label: "GOV.UK — Residence nil rate band", href: "https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band" },
];

export default function IhtGuide() {
  return (
    <Guide
      kicker="The Inheritance Tax guide"
      title="Inheritance Tax in 2026/27"
      intro={
        <>
          Inheritance Tax is charged at 40% on the part of an estate above the tax-free allowances. Most estates pay nothing, but rising house
          prices, frozen allowances and the inclusion of pensions from April 2027 mean more families will. This guide explains the allowances,
          gifts, reliefs and the big changes of 2026 and 2027, with worked examples.
        </>
      }
      meta={["2026/27 rules", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Everyone has a <strong>£325,000</strong> nil-rate band. Leaving a home to children or grandchildren adds up to{" "}
            <strong>£175,000</strong>.
          </li>
          <li>A married couple or civil partners can pass on up to £1 million tax-free between them.</li>
          <li>
            Above that, the rate is <strong>40%</strong>, or 36% if at least 10% of the estate goes to charity.
          </li>
          <li>The allowances are frozen until April 2030. Unused pensions will count from April 2027.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£325,000", label: "Nil-rate band" },
            { value: "£175,000", label: "Residence nil-rate band" },
            { value: "£1m", label: "Couple's combined allowance" },
            { value: "40%", label: "Rate above the allowances" },
          ]}
        />
      </GuideSection>

      <GuideSection id="bands" n={2} kicker="Allowances" title="The two tax-free bands">
        <p>
          The <strong>nil-rate band</strong> of £325,000 applies to every estate. It has not changed since 2009 and is frozen until April 2030.
        </p>
        <p>
          The <strong>residence nil-rate band</strong> of up to £175,000 applies when a home the person lived in passes to their direct
          descendants: children, grandchildren, step-children, adopted and foster children, and their spouses. It is limited to the value of
          the home. If they sold or downsized after July 2015, it can still be claimed against other assets left to descendants.
        </p>
        <WorkedExample
          title="A single person with a £450,000 home and £250,000 of other assets, leaving everything to their children"
          steps={[
            { label: "Estate", value: "£700,000" },
            { label: "Nil-rate band", value: "−£325,000" },
            { label: "Residence nil-rate band", value: "−£175,000" },
            { label: "Taxable", value: "£200,000" },
          ]}
          total={{ label: "Inheritance Tax at 40%", value: "£80,000" }}
        />
        <p>Left to nieces and nephews instead, the residence band would not apply and the tax would be £150,000.</p>
      </GuideSection>

      <GuideSection id="couples" n={3} kicker="Spouses" title="Married couples and civil partners">
        <p>
          Anything left to a spouse or civil partner is exempt. Any part of the first partner&rsquo;s nil-rate bands that is not used passes to the
          survivor, so on the second death the estate can have up to £650,000 of nil-rate band and £350,000 of residence band.
        </p>
        <CompareCards
          columns={[
            {
              name: "Married or civil partners",
              rows: [
                { label: "Gifts to each other", value: "Exempt" },
                { label: "Unused bands", value: "Pass to the survivor" },
                { label: "Most tax-free", value: "£1,000,000" },
              ],
            },
            {
              name: "Unmarried partners",
              rows: [
                { label: "Gifts to each other", value: "Taxable" },
                { label: "Unused bands", value: "Lost" },
                { label: "Most tax-free", value: "£500,000 each" },
              ],
            },
          ]}
        />
        <p>
          The transfer is claimed by the <a href="/uk/life/probate-fees">executors</a>{" "}on the second death, using form IHT402. They will need details of the first estate, so keep
          the paperwork.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="The numbers" title="How much tax at different estate sizes">
        <DataTable
          caption="Inheritance Tax by estate size, with a home passed to children"
          head={["Estate", "Single person", "Widowed, full transfer"]}
          numeric={[1, 2]}
          rows={[
            ["£500,000", "£0", "£0"],
            ["£750,000", "£100,000", "£0"],
            ["£1,000,000", "£200,000", "£0"],
            ["£1,500,000", "£400,000", "£200,000"],
            ["£2,000,000", "—", "£400,000"],
            ["£3,000,000", "—", "£940,000"],
          ]}
        />
        <Figure label="Inheritance Tax for a widowed parent" caption="With a full transfer of the late spouse's bands.">
          <Bars
            items={[
              { label: "£1m", value: 0 },
              { label: "£1.5m", value: 200000 },
              { label: "£2m", value: 400000 },
              { label: "£3m", value: 940000 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="taper" n={5} kicker="Larger estates" title="Estates over £2 million">
        <p>
          The residence nil-rate band is reduced by £1 for every £2 the estate is worth above £2 million. For a single person it disappears at
          £2.35 million. For a widowed person with a full transfer, it disappears at £2.7 million. The test uses the estate&rsquo;s value after
          debts but before reliefs and exemptions.
        </p>
        <DataTable
          caption="Widowed person with a full transfer and a £1 million home"
          head={["Estate", "Residence band left", "Inheritance Tax"]}
          numeric={[1, 2]}
          rows={[
            ["£2,200,000", "£250,000", "£520,000"],
            ["£2,400,000", "£150,000", "£640,000"],
            ["£2,700,000", "£0", "£820,000"],
          ]}
        />
        <p>
          Between £2 million and the end of the taper, each extra £1 of estate costs 60p in tax: 40% on the pound itself and 20p from the lost
          allowance.
        </p>
      </GuideSection>

      <GuideSection id="gifts" n={6} kicker="Lifetime gifts" title="Gifts and the 7-year rule">
        <p>
          Gifts to people are &ldquo;potentially exempt&rdquo;. If the giver lives for 7 years, they fall out of the estate. If not, they are added
          back and use up the nil-rate band first, before the rest of the estate.
        </p>
        <Timeline
          items={[
            { when: "0 to 3 years", what: "Full 40% on any tax due on the gift", detail: "And the gift uses the nil-rate band first." },
            { when: "3 to 4 years", what: "32%", detail: "Taper relief of 20%." },
            { when: "4 to 5 years", what: "24%", detail: "Taper relief of 40%." },
            { when: "5 to 6 years", what: "16%", detail: "Taper relief of 60%." },
            { when: "6 to 7 years", what: "8%", detail: "Taper relief of 80%." },
            { when: "7 years or more", what: "Nothing", detail: "The gift is outside the estate." },
          ]}
        />
        <WorkedExample
          title="A £400,000 gift to a son 4½ years before death, estate of £500,000 including a £300,000 home"
          steps={[
            { label: "Gift above the £325,000 band", value: "£75,000" },
            { label: "Tax at 40%, less 40% taper relief", note: "Paid by the son", value: "£18,000" },
            { label: "Estate: nil-rate band used up by the gift", value: "£0 left" },
            { label: "Estate tax: £500,000 less £175,000 residence band, at 40%", value: "£130,000" },
          ]}
          total={{ label: "Total Inheritance Tax", value: "£148,000" }}
        />
        <Callout tone="warn" title="Taper relief only reduces tax on the gift itself">
          A common misunderstanding: if a gift is within the nil-rate band, there is no tax on it to taper. It still uses the band, so the
          estate pays more. Only after 7 years does the band come back.
        </Callout>
      </GuideSection>

      <GuideSection id="exempt-gifts" n={7} kicker="Tax-free giving" title="Gifts that are always exempt">
        <DataTable
          caption="Exempt gifts"
          head={["Gift", "Limit"]}
          rows={[
            ["Annual exemption", "£3,000 a year, plus last year's if unused"],
            ["Small gifts", "£250 a person a year, if no other gift to them"],
            ["Wedding or civil partnership", "£5,000 from a parent, £2,500 from a grandparent, £1,000 from anyone else"],
            ["Regular gifts from surplus income", "No limit, if your standard of living is not affected"],
            ["To a spouse or civil partner", "No limit, if both are UK-resident"],
            ["To charities and political parties", "No limit"],
          ]}
        />
        <p>
          Gifts out of surplus income are the most valuable and least used. Keep a record of income, spending and gifts each year so the
          executors can prove the pattern.
        </p>
      </GuideSection>

      <GuideSection id="charity" n={8} kicker="Giving" title="Leaving 10% to charity">
        <p>
          If at least 10% of the &ldquo;baseline amount&rdquo; goes to charity, the rate on the rest of the taxable estate falls from 40% to 36%. The
          baseline is the estate after debts, reliefs, exemptions and the nil-rate band, with the charity gift added back.
        </p>
        <WorkedExample
          title="A £1 million estate with a £500,000 home, left to children"
          steps={[
            { label: "Tax with no charity gift", value: "£200,000" },
            { label: "Baseline amount", value: "£675,000" },
            { label: "10% to charity", value: "£67,500" },
            { label: "Tax at 36% on the rest", value: "£155,700" },
          ]}
          total={{ label: "Cost to the family of the £67,500 gift", value: "£23,200" }}
        />
      </GuideSection>

      <GuideSection id="business" n={9} kicker="New rules" title="Business and farm relief from April 2026">
        <p>
          Since 6 April 2026, business property relief and agricultural property relief give 100% relief on the first £2.5 million of qualifying
          property combined, and 50% above that. A spouse or civil partner can inherit any unused part of the allowance, so a couple can pass on
          up to £5 million of qualifying assets free of Inheritance Tax, on top of the nil-rate bands. Shares on AIM get 50% relief.
        </p>
        <WorkedExample
          title="A £3 million family business, plus a £500,000 home and £200,000 of savings, to the children"
          steps={[
            { label: "Estate", value: "£3,700,000" },
            { label: "100% relief on £2.5 million", value: "−£2,500,000" },
            { label: "50% relief on the other £500,000", value: "−£250,000" },
            { label: "Nil-rate band", value: "−£325,000" },
            { label: "Residence band, lost to the taper", value: "£0" },
            { label: "Taxable", value: "£625,000" },
          ]}
          total={{ label: "Inheritance Tax", value: "£250,000" }}
        />
        <p>Tax on business and farm property can be paid in 10 yearly instalments, interest-free.</p>
      </GuideSection>

      <GuideSection id="pensions" n={10} kicker="From April 2027" title="Pensions from April 2027">
        <p>
          For deaths on or after 6 April 2027, most unused pension funds and death benefits will be part of the estate. That ends their role as a
          way to pass money on free of Inheritance Tax. Pensions left to a spouse or civil partner stay exempt, as do death-in-service benefits.
        </p>
        <WorkedExample
          title="A single parent with a £400,000 home, £150,000 savings and a £300,000 pension"
          steps={[
            { label: "Inheritance Tax before April 2027", value: "£20,000" },
            { label: "Inheritance Tax from April 2027", value: "£140,000" },
          ]}
          total={{ label: "Extra tax", value: "£120,000" }}
        />
        <p>
          Beneficiaries may also pay Income Tax on the pension if the person dies at 75 or over, so the combined rate on inherited pensions can
          be high. Many people are now reviewing whether to draw pensions earlier and spend or give the money.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={11} kicker="Practicalities" title="Paying the tax">
        <ul>
          <li>Inheritance Tax is due by the end of the sixth month after the death. Interest is charged after that.</li>
          <li>Most of it must be paid before probate is granted, often from the deceased&rsquo;s bank accounts through the Direct Payment Scheme.</li>
          <li>Tax on property can be paid in 10 yearly instalments, with interest.</li>
          <li>Tax on lifetime gifts is paid by the person who received the gift.</li>
        </ul>
      </GuideSection>

      <GuideSection id="planning" n={12} kicker="Reducing the bill" title="Planning ideas">
        <ol>
          <li>Make a will, so the home passes to descendants and spouse exemptions are used.</li>
          <li>Use the annual £3,000 exemption and give regularly from surplus income.</li>
          <li>Make larger gifts early, so the 7-year clock starts sooner.</li>
          <li>Consider life insurance written in trust to pay the expected bill.</li>
          <li>Review pensions before April 2027.</li>
          <li>Take professional advice before setting up trusts, which have their own tax rules.</li>
        </ol>
      </GuideSection>

      <GuideSection id="what-counts" n={13} kicker="Valuation" title="What counts in the estate">
        <p>
          The estate is everything the person owned at death, at its open market value on the day they died, less debts and reasonable funeral
          costs. That includes:
        </p>
        <ul>
          <li>their home, or their share of a jointly owned home;</li>
          <li>bank and building society accounts, cash ISAs and premium bonds;</li>
          <li>shares, funds, stocks and shares ISAs and other investments;</li>
          <li>cars, jewellery, antiques and household contents;</li>
          <li>money owed to them, and their share of any business;</li>
          <li>gifts with reservation, such as a home given away but still lived in rent-free.</li>
        </ul>
        <p>
          Life insurance paid out to the estate counts too, unless the policy is written in trust. Jointly owned property is split according to
          each owner&rsquo;s share; for spouses it is usually half each.
        </p>
      </GuideSection>

      <GuideSection id="downsizing" n={14} kicker="Moving home" title="Downsizing and the residence band">
        <p>
          People who sold a larger home or moved into care after 8 July 2015 do not lose the residence nil-rate band. The &ldquo;downsizing
          addition&rdquo; lets the estate claim the band against other assets left to direct descendants, up to the amount that would have been
          available on the old home.
        </p>
        <p>
          The rules are detailed, and executors must claim the addition on form IHT436. Keep records of the sale price and date of any home sold
          in later life.
        </p>
      </GuideSection>

      <GuideSection id="trusts" n={15} kicker="Advanced planning" title="Trusts in brief">
        <p>
          Putting assets into most trusts during your lifetime is a chargeable transfer. Anything above the nil-rate band is taxed at 20%
          straight away, and the trust may pay up to 6% every ten years and when assets leave it. Assets in trust are normally outside your
          estate after 7 years.
        </p>
        <p>
          Trusts can protect assets for children or vulnerable beneficiaries, but they are complex and have their own Income Tax and Capital
          Gains Tax rules. Take professional advice before setting one up.
        </p>
      </GuideSection>

      <GuideSection id="insurance" n={16} kicker="Paying the bill" title="Life insurance and Inheritance Tax">
        <p>
          A whole-of-life policy written in trust pays out on death without forming part of the estate. Many couples use a joint &ldquo;second
          death&rdquo; policy sized to the expected Inheritance Tax bill, so the family can pay it without selling the home. Premiums paid from
          surplus income can be exempt gifts.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={17} kicker="Avoid these" title="Mistakes executors make">
        <ul>
          <li>Forgetting to claim the late spouse&rsquo;s unused nil-rate bands.</li>
          <li>Undervaluing property or shares, which can lead to penalties.</li>
          <li>Missing lifetime gifts made in the 7 years before death.</li>
          <li>Paying the tax late: interest starts at the end of the sixth month after death.</li>
          <li>Distributing the estate before HMRC has agreed the figures.</li>
        </ul>
      <p>
          Planning ahead also means deciding who can act for you if you lose capacity: the <a href="/uk/life/power-of-attorney">power of attorney cost calculator</a> shows the fees to register a Lasting Power of Attorney.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£325,000", label: "Nil-rate band" },
            { value: "£175,000", label: "Residence nil-rate band" },
            { value: "£2m", label: "Residence band taper starts" },
            { value: "40%", label: "Main rate" },
            { value: "36%", label: "Rate with 10% to charity" },
            { value: "7 years", label: "Gift rule" },
            { value: "£2.5m", label: "100% business and farm relief" },
            { value: "6 April 2027", label: "Pensions join the estate" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
