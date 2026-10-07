import {
  Bars,
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

/** Council tax bands — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What council tax is" },
  { id: "bands-england", title: "Bands in England" },
  { id: "bands-wales", title: "Bands in Wales" },
  { id: "bands-scotland", title: "Bands in Scotland" },
  { id: "ratios", title: "How bands set the bill" },
  { id: "averages", title: "Average bills for 2026/27" },
  { id: "your-bill", title: "Working out your own bill" },
  { id: "discounts", title: "Discounts and disregards" },
  { id: "exemptions", title: "Exemptions" },
  { id: "reductions", title: "Reductions for disability and low income" },
  { id: "premiums", title: "Second homes and empty homes" },
  { id: "paying", title: "Paying your bill" },
  { id: "challenge", title: "Challenging your band" },
  { id: "where", title: "Where the money goes" },
  { id: "ni", title: "Northern Ireland" },
  { id: "moving", title: "Council tax when you move" },
  { id: "renters", title: "Tenants, landlords and shared houses" },
  { id: "rises", title: "How bills rise each year" },
  { id: "mistakes", title: "Common mistakes on council tax bills" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Council Tax", href: "https://www.gov.uk/council-tax" },
  { label: "GOV.UK — Council Tax bands", href: "https://www.gov.uk/council-tax-bands" },
  { label: "GOV.WALES — Council Tax", href: "https://www.gov.wales/council-tax" },
  { label: "mygov.scot — Council Tax", href: "https://www.mygov.scot/council-tax" },
  { label: "Scottish Assessors — Council Tax bands", href: "https://www.saa.gov.uk/" },
];

export default function CouncilTaxGuide() {
  return (
    <Guide
      kicker="The council tax guide"
      title="Council tax bands, explained"
      intro={
        <>
          Your council tax depends on two things: the band your home is in and the charge your council sets. This guide explains
          the bands in England, Wales and Scotland, how the bill is worked out, the discounts and reductions you could claim,
          and what to do if you think your band is wrong.
        </>
      }
      meta={["2026/27", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What council tax is">
        <p>
          Council tax is a yearly charge on homes in England, Scotland and Wales that helps pay for local services such as
          rubbish collection, social care, schools, libraries, roads, police and fire services. It is usually paid by the adults
          who live in a home, whether they own it or rent it.
        </p>
        <p>
          Every home is placed in a band according to its value on a fixed date in the past, not what it is worth today. Each
          council then sets a charge for Band D, and the other bands pay a fixed fraction of that.
        </p>
      </GuideSection>

      <GuideSection id="bands-england" n={2} kicker="England" title="Bands in England">
        <p>England has eight bands, based on what a home would have sold for on <strong>1 April 1991</strong>:</p>
        <DataTable
          caption="England: values on 1 April 1991"
          head={["Band", "Value in 1991", "Share of Band D"]}
          rows={[
            ["A", "Up to £40,000", "6/9"],
            ["B", "£40,001 to £52,000", "7/9"],
            ["C", "£52,001 to £68,000", "8/9"],
            ["D", "£68,001 to £88,000", "9/9"],
            ["E", "£88,001 to £120,000", "11/9"],
            ["F", "£120,001 to £160,000", "13/9"],
            ["G", "£160,001 to £320,000", "15/9"],
            ["H", "Over £320,000", "18/9"],
          ]}
        />
        <p>
          Homes built since 1991 are given the band they would have been in had they existed then. England has never had a
          revaluation, so the bands still reflect 1991 prices.
        </p>
      </GuideSection>

      <GuideSection id="bands-wales" n={3} kicker="Wales" title="Bands in Wales">
        <p>
          Wales revalued homes using values on <strong>1 April 2003</strong> and added a ninth band, I, for the most valuable
          homes:
        </p>
        <DataTable
          caption="Wales: values on 1 April 2003"
          head={["Band", "Value in 2003", "Share of Band D"]}
          rows={[
            ["A", "Up to £44,000", "6/9"],
            ["B", "£44,001 to £65,000", "7/9"],
            ["C", "£65,001 to £91,000", "8/9"],
            ["D", "£91,001 to £123,000", "9/9"],
            ["E", "£123,001 to £162,000", "11/9"],
            ["F", "£162,001 to £223,000", "13/9"],
            ["G", "£223,001 to £324,000", "15/9"],
            ["H", "£324,001 to £424,000", "18/9"],
            ["I", "Over £424,000", "21/9"],
          ]}
        />
        <p>The Welsh Government plans a further revaluation, with new bands, so these may change in the coming years.</p>
      </GuideSection>

      <GuideSection id="bands-scotland" n={4} kicker="Scotland" title="Bands in Scotland">
        <p>
          Scotland uses values on <strong>1 April 1991</strong>, with lower thresholds than England. Since April 2017 the
          higher bands pay a larger share of Band D than before:
        </p>
        <DataTable
          caption="Scotland: values on 1 April 1991"
          head={["Band", "Value in 1991", "Share of Band D"]}
          rows={[
            ["A", "Up to £27,000", "240/360"],
            ["B", "£27,001 to £35,000", "280/360"],
            ["C", "£35,001 to £45,000", "320/360"],
            ["D", "£45,001 to £58,000", "360/360"],
            ["E", "£58,001 to £80,000", "473/360"],
            ["F", "£80,001 to £106,000", "585/360"],
            ["G", "£106,001 to £212,000", "705/360"],
            ["H", "Over £212,000", "882/360"],
          ]}
        />
      </GuideSection>

      <GuideSection id="ratios" n={5} kicker="The maths" title="How bands set the bill">
        <p>
          The council&apos;s Band D charge is the starting point. Every other band pays a fixed fraction of it. In England and
          Wales a Band A home pays two-thirds of Band D, and a Band H home pays twice Band D, so Band H pays three times as much as
          Band A.
        </p>
        <WorkedExample
          title="Band B in a council with a £2,100 Band D charge"
          steps={[
            { label: "Band D charge", value: "£2,100" },
            { label: "Band B ratio", note: "7/9 of Band D", value: "× 7/9" },
          ]}
          total={{ label: "Band B bill for the year", value: "£1,633" }}
        />
        <p>
          The calculator uses the national average Band D charge unless you enter your own council&apos;s figure under More
          options. Your council&apos;s figure is on your bill and its website.
        </p>
      </GuideSection>

      <GuideSection id="averages" n={6} kicker="Averages" title="Average bills for 2026/27">
        <p>Using the average Band D charge in each nation, bills before discounts look like this:</p>
        <DataTable
          caption="Average bills by band, 2026/27"
          head={["Band", "England", "Wales", "Scotland"]}
          numeric={[1, 2, 3]}
          rows={[
            ["A", "£1,595", "£1,522", "£1,108"],
            ["B", "£1,860", "£1,776", "£1,293"],
            ["C", "£2,126", "£2,029", "£1,477"],
            ["D", "£2,392", "£2,283", "£1,662"],
            ["E", "£2,924", "£2,790", "£2,184"],
            ["F", "£3,455", "£3,298", "£2,701"],
            ["G", "£3,987", "£3,805", "£3,255"],
            ["H", "£4,784", "£4,566", "£4,072"],
            ["I", "—", "£5,327", "—"],
          ]}
        />
        <Bars
          items={[
            { label: "England Band D", value: 2_392 },
            { label: "Wales Band D", value: 2_283 },
            { label: "Scotland Band D", value: 1_662 },
          ]}
        />
        <p>
          Bills vary a lot between councils, and parish or town councils can add a small extra charge. Treat the averages as a
          guide only.
        </p>
      </GuideSection>

      <GuideSection id="your-bill" n={7} kicker="Your bill" title="Working out your own bill">
        <Timeline
          items={[
            { when: "1", what: "Find your band", detail: "Search your postcode on GOV.UK for England and Wales, or the Scottish Assessors' website." },
            { when: "2", what: "Find your council's Band D charge", detail: "It is on your bill and the council's website, including any parish precept." },
            { when: "3", what: "Apply the band ratio", detail: "Multiply Band D by your band's fraction." },
            { when: "4", what: "Take off discounts and reductions", detail: "Such as the 25% single person discount." },
            { when: "5", what: "Add any premium", detail: "For second homes or long-term empty homes, if your council charges one." },
          ]}
        />
      </GuideSection>

      <GuideSection id="discounts" n={8} kicker="Discounts" title="Discounts and disregards">
        <p>A full bill assumes at least two adults live in the home. If fewer adults count, the bill falls:</p>
        <CompareCards
          columns={[
            { name: "One adult counted", rows: [{ label: "Discount", value: "25%" }, { label: "Example", value: "Living alone" }] },
            { name: "No adults counted", rows: [{ label: "Discount", value: "50%" }, { label: "Example", value: "All residents disregarded" }] },
          ]}
        />
        <p>Some people are &quot;disregarded&quot; and not counted, including:</p>
        <ul>
          <li><a href="/students/student-council-tax">full-time students</a>, student nurses and some apprentices and young people in training;</li>
          <li>people under 18, and 18 and 19-year-olds for whom <a href="/benefits/child-benefit">Child Benefit</a>{" "}is still paid;</li>
          <li>live-in carers, in many cases;</li>
          <li>people who are severely mentally impaired;</li>
          <li>people in hospital, a care home or prison, and some members of visiting forces.</li>
        </ul>
        <p>
          So a single parent living with a 17-year-old, or someone living with a full-time student, can still get the 25%
          single person discount.
        </p>
      </GuideSection>

      <GuideSection id="exemptions" n={9} kicker="Exemptions" title="Exemptions">
        <p>Some homes pay no council tax at all, for example when:</p>
        <ul>
          <li>everyone living there is a full-time student;</li>
          <li>everyone living there is under 18, or severely mentally impaired;</li>
          <li>the home is empty because the owner has moved into care or hospital, or has died (for a period);</li>
          <li>it is an annexe lived in by a dependent relative aged 65 or over, or who is disabled.</li>
        </ul>
        <p>Rules differ slightly between England, Scotland and Wales. Ask your council which apply.</p>
      </GuideSection>

      <GuideSection id="reductions" n={10} kicker="Reductions" title="Reductions for disability and low income">
        <p>
          <strong>Disabled band reduction.</strong> If your home has features essential for a disabled resident, such as an extra
          bathroom or kitchen, extra space for a wheelchair, or a room mainly used by them, you are billed as if your home were one
          band lower. Band A homes get a reduction of one-ninth of Band D instead.
        </p>
        <p>
          <strong><a href="/benefits/council-tax-reduction">Council Tax Reduction</a>.</strong> If you are on a low income or claim benefits, your council may reduce your bill,
          sometimes to zero. Each council in England sets its own scheme; Scotland and Wales have national schemes. Apply to your
          council.
        </p>
        <Callout tone="good" title="Claim even if you are unsure">
          Council Tax Reduction is separate from <a href="/benefits/universal-credit">Universal Credit</a>{" "}and not automatic. Many people who could get it never apply.
        </Callout>
      </GuideSection>

      <GuideSection id="premiums" n={11} kicker="Premiums" title="Second homes and empty homes">
        <p>Councils can charge extra on homes that are not anyone&apos;s main home:</p>
        <ul>
          <li><strong>England:</strong> up to 100% extra on second homes, and on homes empty for a year or more, rising for homes empty for longer.</li>
          <li><strong>Wales:</strong> up to 300% extra on second homes and long-term empty homes.</li>
          <li><strong>Scotland:</strong> up to 100% extra on second homes and many long-term empty homes.</li>
        </ul>
        <p>A 100% premium doubles the bill. Some exceptions apply, for example homes being actively marketed for sale or let for a limited period.</p>
      </GuideSection>

      <GuideSection id="paying" n={12} kicker="Paying" title="Paying your bill">
        <p>
          Bills are sent in March for the year from 1 April. By default you pay in 10 monthly instalments, from April to January,
          but you can ask to pay in 12. A £2,392 bill is £239.20 a month over 10 months or £199.33 over 12.
        </p>
        <p>
          If you miss a payment, the council can ask for the whole year&apos;s bill at once. Contact them straight away if you are
          struggling: they can often agree a plan.
        </p>
      </GuideSection>

      <GuideSection id="challenge" n={13} kicker="Challenges" title="Challenging your band">
        <p>
          If you think your band is wrong, compare it with similar homes on your street. In England and Wales you can ask the
          Valuation Office Agency to review it; in Scotland, your local assessor. You must keep paying while the review happens.
        </p>
        <Callout tone="warn" title="A review can move your band up">
          The review looks at your home afresh. If it was under-banded, the band can go up as well as down, and neighbours&apos;
          bands can change too.
        </Callout>
        <p>
          You can also appeal within six months of becoming the person who pays for a home, or if the home has changed, for
          example after part of it was demolished.
        </p>
      </GuideSection>

      <GuideSection id="where" n={14} kicker="Your money" title="Where the money goes">
        <p>
          Your bill is shared between the bodies that provide local services. In a two-tier area of England, it can include the
          county council, district council, police and crime commissioner, fire authority and a parish or town council. Each sets
          its own share, called a precept. In England, most councils can raise council tax by up to about 5% a year without
          holding a local referendum.
        </p>
      </GuideSection>

      <GuideSection id="ni" n={15} kicker="Northern Ireland" title="Northern Ireland">
        <p>
          Northern Ireland does not have council tax. Homes pay domestic rates instead, based on the home&apos;s capital value on
          1 January 2005, multiplied by a rate set by the Executive and the local council. There is a cap on the value used for
          the most expensive homes.
        </p>
      </GuideSection>

      <GuideSection id="moving" n={16} kicker="Moving home" title="Council tax when you move">
        <p>
          Council tax is charged by the day. When you move, your old council works out a final bill up to your moving date, and
          your new council charges you from the day you move in. If you have paid ahead for your old home, you get a refund.
        </p>
        <Timeline
          items={[
            { when: "Before you move", what: "Tell your old council", detail: "Give your moving date and forwarding address. Most councils have an online form." },
            { when: "When you move", what: "Register with the new council", detail: "Tell them the date you moved in and who lives with you, so discounts are applied." },
            { when: "First bill", what: "Check the band and discounts", detail: "Your first bill covers the rest of the year, split into the remaining monthly instalments." },
          ]}
        />
        <p>
          Because the year&apos;s bill is spread over fewer months when you move mid-year, the first few instalments can be higher
          than you expect. You can ask to spread them over the remaining months up to March.
        </p>
      </GuideSection>

      <GuideSection id="renters" n={17} kicker="Renting" title="Tenants, landlords and shared houses">
        <p>
          If you rent a whole home, you normally pay the council tax. In a house in multiple occupation, where tenants rent rooms
          on separate agreements and share facilities, the landlord is usually responsible and includes it in the rent.
        </p>
        <p>
          When a rented home is empty between tenancies, the landlord pays. Some councils give a short discount for empty homes;
          many do not, and long-term empty homes can attract a premium.
        </p>
        <p>
          If you share with friends on a joint tenancy, everyone named is jointly responsible for the whole bill, so it is worth
          agreeing how to split it.
        </p>
      </GuideSection>

      <GuideSection id="rises" n={18} kicker="Increases" title="How bills rise each year">
        <p>
          Councils set their charges each spring. In England most can raise council tax by up to just under 5% a year without a
          local referendum: 2.99% for general spending plus 2% for adult social care. A few councils have been allowed larger
          rises.
        </p>
        <WorkedExample
          title="A 4.99% rise on the average Band D bill"
          steps={[
            { label: "Band D this year", value: "£2,392" },
            { label: "Rise of 4.99%", value: "+£119" },
          ]}
          total={{ label: "Band D next year", value: "£2,511" }}
        />
        <p>Scotland and Wales set their own limits and arrangements, and rises there have also been significant in recent years.</p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Check your bill" title="Common mistakes on council tax bills">
        <p>Council tax bills are usually right, but a few mistakes come up again and again. Check yours for these:</p>
        <ul>
          <li>
            <strong>A missing discount.</strong> If you live alone, or everyone else in the home is disregarded, the <a href="/property/single-person-discount">25% discount</a>{" "}is not always
            added automatically. It can usually be backdated to when you became entitled.
          </li>
          <li>
            <strong>Old information about who lives there.</strong> When a student finishes their course, a partner moves out or a grown-up child
            leaves, tell the council so the discount, or the full charge, starts from the right date.
          </li>
          <li>
            <strong>Charged from the wrong date.</strong> Council tax is charged by the day. Check the start and end dates when you move, so you do
            not pay for days the previous or next occupier lived there.
          </li>
          <li>
            <strong>A premium that should not apply.</strong> Empty-home and second-home premiums have exceptions, for example homes being sold or
            let, or annexes used as part of the main home. Ask the council if one applies to you.
          </li>
          <li>
            <strong>Not claiming Council Tax Reduction.</strong> If your income is low, the reduction can cut the bill by up to 100%. It is separate
            from Universal Credit and must be claimed from the council.
          </li>
        </ul>
        <p>
          If you spot a mistake, write to the council&rsquo;s council tax team with the details and the date it started. If you are not happy
          with the answer, you can appeal to the valuation tribunal for your nation.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£2,392", label: "Average Band D in England" },
            { value: "£2,283", label: "Average Band D in Wales" },
            { value: "£1,662", label: "Average Band D in Scotland" },
            { value: "25%", label: "Single person discount" },
            { value: "10", label: "Default monthly instalments" },
            { value: "1991", label: "Valuation date in England and Scotland" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
