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

/** Care home means test — the guide. Figures from src/lib/life/care.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "limits", title: "The capital limits" },
  { id: "tariff", title: "Tariff income" },
  { id: "income", title: "How your income is used" },
  { id: "examples", title: "Worked examples" },
  { id: "home", title: "Your home" },
  { id: "deferred", title: "Deferred payment agreements" },
  { id: "top-ups", title: "Top-up fees" },
  { id: "nhs", title: "NHS-funded care" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "deprivation", title: "Giving money away" },
  { id: "couples", title: "Couples" },
  { id: "planning", title: "Planning ahead" },
  { id: "needs", title: "The needs assessment" },
  { id: "financial", title: "The financial assessment" },
  { id: "costs", title: "What care homes cost" },
  { id: "respite", title: "Respite and temporary stays" },
  { id: "benefits", title: "Benefits in a care home" },
  { id: "appeal", title: "Challenging a decision" },
  { id: "home-care", title: "Care at home instead" },
  { id: "choosing", title: "Choosing a care home" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Social care charging for care and support 2026 to 2027", href: "https://www.gov.uk/government/publications/social-care-charging-for-local-authorities-2026-to-2027/social-care-charging-for-care-and-support-2026-to-2027-local-authority-circular" },
  { label: "GOV.UK — Care and support statutory guidance", href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance" },
  { label: "NHS — Paying for your own care (self-funding)", href: "https://www.nhs.uk/social-care-and-support/money-work-and-benefits/paying-for-your-own-care-self-funding/" },
  { label: "NHS — NHS-funded nursing care", href: "https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-funded-nursing-care/" },
  { label: "NHS — NHS continuing healthcare", href: "https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/" },
];

export default function CareGuide() {
  return (
    <Guide
      kicker="The care home means test guide"
      title="Who pays for a care home in 2026/27"
      intro={
        <>
          Care homes often cost more than £1,000 a week. Whether the council helps depends on a means test of your savings, income and sometimes
          your home. This guide explains the limits in each UK nation, how tariff income works, what happens to your home, and how to protect
          what you can.
        </>
      }
      meta={["2026/27 limits", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            In England, with capital over <strong>£23,250</strong> you pay your own fees.
          </li>
          <li>
            Between £14,250 and £23,250 the council helps, but you pay from income plus <strong>£1 a week for every £250</strong> above
            £14,250.
          </li>
          <li>
            Below £14,250 only your income counts, and you keep at least <strong>£31.80 a week</strong> for personal expenses.
          </li>
          <li>Your home counts after 12 weeks, unless a partner or certain relatives still live there.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£23,250", label: "Upper capital limit, England" },
            { value: "£14,250", label: "Lower capital limit, England" },
            { value: "£31.80", label: "Personal expenses allowance" },
            { value: "12 weeks", label: "Before the home counts" },
          ]}
        />
      </GuideSection>

      <GuideSection id="limits" n={2} kicker="Thresholds" title="The capital limits">
        <p>
          Capital includes savings, investments, shares, premium bonds and property other than a home that is disregarded. It does not include
          personal possessions or the surrender value of most life insurance. The limits in England have not changed since 2010.
        </p>
        <DataTable
          caption="Capital limits for care home fees, 2026/27"
          head={["Capital", "England", "What happens"]}
          rows={[
            ["Over £23,250", "Self-funding", "You pay the full fee"],
            ["£14,250 to £23,250", "Council helps", "Income plus tariff income, less the allowance"],
            ["Under £14,250", "Council helps", "Income only, less the allowance"],
          ]}
        />
        <p>
          The cap on lifetime care costs that was planned for October 2025 was cancelled, so there is no limit on how much a self-funder can pay
          in England.
        </p>
      </GuideSection>

      <GuideSection id="tariff" n={3} kicker="Assumed income" title="Tariff income">
        <p>
          If your capital is between £14,250 and £23,250 in England, the council treats each £250, or part of £250, above £14,250 as £1 a week of
          income. It is not real income: it represents money you are expected to use from savings.
        </p>
        <DataTable
          caption="Tariff income in England"
          head={["Capital", "Tariff income a week"]}
          numeric={[1]}
          rows={[
            ["£14,250", "£0"],
            ["£15,000", "£3"],
            ["£18,000", "£15"],
            ["£20,000", "£23"],
            ["£23,250", "£36"],
          ]}
        />
        <p>
          Tariff income only reduces savings slowly. In our example below, capital takes over 15 years to fall from £23,250 to close to £14,250.
        </p>
      </GuideSection>

      <GuideSection id="income" n={4} kicker="Contribution" title="How your income is used">
        <p>
          If the council helps, most of your income goes towards the fees: State Pension, private pensions, Pension Credit and most benefits.
          You keep a personal expenses allowance of £31.80 a week in England for things like clothes, toiletries and hairdressing.
        </p>
        <p>
          Some income is ignored, such as the mobility part of DLA or PIP and, if a spouse lives at home, half of a private pension can be passed
          to them. Attendance Allowance stops after 28 days if the council funds the place.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Real numbers" title="Worked examples">
        <WorkedExample
          title="Savings of £10,000, income of £260 a week, council rate £1,000, fee £1,300"
          steps={[
            { label: "Income less the £31.80 allowance", value: "£228.20" },
            { label: "Council pays up to its rate", value: "£771.80" },
            { label: "Top-up needed for the dearer home", value: "£300.00" },
          ]}
          total={{ label: "You pay a week", value: "£228.20" }}
        />
        <WorkedExample
          title="Savings of £20,000, same income"
          steps={[
            { label: "Tariff income on £5,750 above £14,250", value: "£23" },
            { label: "Income plus tariff, less allowance", value: "£251.20" },
            { label: "Council pays", value: "£748.80" },
          ]}
          total={{ label: "You pay a week", value: "£251.20" }}
        />
        <WorkedExample
          title="Savings of £60,000, same income, fee £1,300"
          steps={[
            { label: "Fee", value: "£1,300" },
            { label: "Paid from income", value: "£260" },
            { label: "Paid from savings each week", value: "£1,040" },
          ]}
          total={{ label: "Time to reach £23,250", value: "About 8 months" }}
        />
      </GuideSection>

      <GuideSection id="home" n={6} kicker="Property" title="Your home">
        <p>The value of your home is counted as capital once you move into permanent care, unless it is still lived in by:</p>
        <ul>
          <li>your partner, former partner or civil partner (except if estranged);</li>
          <li>a relative aged 60 or over, or who is incapacitated;</li>
          <li>a child under 18 you are responsible for.</li>
        </ul>
        <p>
          The council must also ignore the home for the first 12 weeks of permanent care, and while you are in a temporary or respite stay. It can
          choose to ignore it in other cases, for example where a carer has given up their own home.
        </p>
        <Figure label="How long capital lasts at £1,040 a week" caption="Fee of £1,300, income of £260, until capital reaches £23,250.">
          <Bars
            items={[
              { label: "£60,000 savings", value: 8.2 },
              { label: "£40,000 + £250,000 home", value: 59.2 },
            ]}
            format={(n) => `${n.toFixed(1)} months`}
          />
        </Figure>
        <p>With a £250,000 home counted, capital of £290,000 would last about 4.9 years at the same rate.</p>
      </GuideSection>

      <GuideSection id="deferred" n={7} kicker="Keeping the home" title="Deferred payment agreements">
        <p>
          A deferred payment agreement lets the council pay your fees and secure the debt against your home. It is repaid when the home is sold,
          usually after your death. Councils in England must offer one if you have less than £23,250 apart from the home and the home is not
          disregarded. Interest and an administration fee are charged, so ask for the full cost in writing.
        </p>
        <Callout title="Renting out the home">
          Some families rent the home while a deferred payment agreement is in place. The rent counts as income towards the fees, so it can slow
          the build-up of the debt.
        </Callout>
      </GuideSection>

      <GuideSection id="top-ups" n={8} kicker="Choice" title="Top-up fees">
        <p>
          If the council funds your place, it pays up to its usual rate for the type of care you need. If you choose a more expensive home, a
          third party, usually a relative, must sign an agreement to pay the difference. In limited cases, such as during the first 12 weeks or
          under a deferred payment agreement, you can pay the top-up yourself.
        </p>
      </GuideSection>

      <GuideSection id="nhs" n={9} kicker="Health needs" title="NHS-funded care">
        <CompareCards
          columns={[
            {
              name: "NHS-funded nursing care",
              rows: [
                { label: "Who", value: "Anyone in a nursing home assessed as needing a registered nurse" },
                { label: "Amount", value: "£267.68 a week in England" },
                { label: "Means test", value: "None" },
              ],
            },
            {
              name: "NHS Continuing Healthcare",
              rows: [
                { label: "Who", value: "People whose needs are primarily health needs" },
                { label: "Amount", value: "The whole fee" },
                { label: "Means test", value: "None" },
              ],
            },
          ]}
        />
        <p>
          With a fee of £1,500 and nursing care, the NHS contribution of £267.68 reduces a self-funder&rsquo;s cost to £1,232.32 a week. Always ask
          for a Continuing Healthcare checklist assessment if needs are complex or unpredictable.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={10} kicker="Across the UK" title="Scotland, Wales and Northern Ireland">
        <DataTable
          caption="Care home limits and allowances, 2026/27"
          head={["Nation", "Upper limit", "Lower limit", "Personal allowance a week"]}
          numeric={[1, 2, 3]}
          rows={[
            ["England", "£23,250", "£14,250", "£31.80"],
            ["Scotland", "£36,750", "£22,750", "£37.65"],
            ["Wales", "£50,000", "—", "£46.35"],
            ["Northern Ireland", "£23,250", "£14,250", "£36.62"],
          ]}
        />
        <p>
          In Scotland, everyone assessed as needing personal care gets £260.30 a week towards it, plus £117.10 for nursing care, whatever their
          means. Wales has a single limit with no tariff income: below £50,000 the council helps and your savings are not used.
        </p>
      </GuideSection>

      <GuideSection id="deprivation" n={11} kicker="Warning" title="Giving money away">
        <p>
          If you give away money or property to avoid care fees, the council can treat you as still having it. This is called deprivation of
          assets. There is no time limit: what matters is whether avoiding fees was a significant reason at the time. Normal spending, paying
          debts and gifts made long before care was foreseeable are not usually treated as deprivation.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={12} kicker="Partners" title="Couples">
        <p>
          Only the resident&rsquo;s own capital and income are assessed. Joint savings are usually split equally. The partner&rsquo;s own money is not
          counted, and the home is ignored while they live there. Couples should check how accounts and property are held.
        </p>
      </GuideSection>

      <GuideSection id="planning" n={13} kicker="Steps" title="Planning ahead">
        <Timeline
          items={[
            { when: "Before care", what: "Get a needs assessment", detail: "Free from the council, whatever your means." },
            { when: "Choosing a home", what: "Ask the council's rate", detail: "So you know whether a top-up would be needed." },
            { when: "First 12 weeks", what: "Home disregarded", detail: "Time to decide about selling or deferring." },
            { when: "Nearing the limit", what: "Ask for a financial assessment", detail: "About three months before capital falls below the upper limit." },
          ]}
        />
      </GuideSection>

      <GuideSection id="needs" n={14} kicker="First step" title="The needs assessment">
        <p>
          Before any means test, the council carries out a needs assessment to decide what care you need and whether a care home is the right
          option. It is free for everyone, whatever their savings. Even self-funders benefit, because it identifies the type of care needed and
          can lead to NHS help or a deferred payment agreement.
        </p>
        <p>
          If you are leaving hospital, ask about intermediate care or reablement, which is free for up to six weeks and may avoid the need for a
          permanent move.
        </p>
      </GuideSection>

      <GuideSection id="financial" n={15} kicker="Paperwork" title="The financial assessment">
        <p>
          The council asks for details of income, savings and property, usually with bank statements for recent months. It then works out what
          you pay. You should get a written statement showing how it was calculated. Check every figure: mistakes in income or the treatment of
          joint accounts are common.
        </p>
        <ul>
          <li>Tell the council about disability-related costs and any money you owe.</li>
          <li>Make sure only your share of joint savings is counted.</li>
          <li>Ask for a review if your circumstances change.</li>
        </ul>
      </GuideSection>

      <GuideSection id="costs" n={16} kicker="Prices" title="What care homes cost">
        <p>
          Fees vary by region and by the level of care. Residential homes provide personal care. Nursing homes also have registered nurses on
          duty and usually cost more. Self-funders often pay noticeably more than the council rate for the same room, partly because council
          rates are negotiated in bulk.
        </p>
        <p>
          Ask every home for a written breakdown of what is included. Hairdressing, chiropody, outings, newspapers and phone calls are often
          extra, and some homes ask for a deposit or an advance payment.
        </p>
      </GuideSection>

      <GuideSection id="respite" n={17} kicker="Short stays" title="Respite and temporary stays">
        <p>
          For a temporary or respite stay, your home is ignored and the council may charge differently, sometimes a flat weekly amount. Carers
          can often get respite care through a carer&rsquo;s assessment. Check how long a stay can last before it is treated as permanent.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={18} kicker="Income" title="Benefits in a care home">
        <p>
          Pension Credit can continue in a care home and can rise because the home is no longer counted. If you pay your own fees, you can keep
          Attendance Allowance or the daily living part of PIP. If the council funds you, these usually stop after 28 days. Housing Benefit for the
          old home can continue for a short time during a move.
        </p>
      </GuideSection>

      <GuideSection id="appeal" n={19} kicker="Disputes" title="Challenging a decision">
        <p>
          If you disagree with the council&rsquo;s assessment, use its complaints procedure first. If that does not resolve it, you can go to the
          Local Government and Social Care Ombudsman, which is free. For NHS Continuing Healthcare decisions, ask the integrated care board for a
          review, then go to the Parliamentary and Health Service Ombudsman.
        </p>
      </GuideSection>

      <GuideSection id="home-care" n={20} kicker="Alternatives" title="Care at home instead">
        <p>
          For care at home, the council uses a similar means test, but your home is never counted. You keep a higher minimum income, and
          disability-related costs, such as extra heating or laundry, are allowed for. Many people can stay at home longer with a mix of paid
          carers, equipment, adaptations and family support.
        </p>
        <p>
          A Disabled Facilities Grant from the council can pay for adaptations such as stair lifts and level-access showers. It is means-tested for
          adults, but not for children.
        </p>
      </GuideSection>

      <GuideSection id="choosing" n={21} kicker="Finding the right place" title="Choosing a care home">
        <ul>
          <li>Read the latest inspection report from the Care Quality Commission, or the equivalent regulator in Scotland, Wales or Northern Ireland.</li>
          <li>Visit more than once, including at a mealtime, and talk to residents and families.</li>
          <li>Ask how fees rise each year and what notice is given.</li>
          <li>Check whether the home accepts the council rate if your savings may run out.</li>
        </ul>
        <p>Choosing a home that accepts council funding avoids having to move later, which can be distressing for residents.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£23,250", label: "Upper limit, England" },
            { value: "£14,250", label: "Lower limit, England" },
            { value: "£1 per £250", label: "Tariff income" },
            { value: "£31.80", label: "Personal expenses allowance" },
            { value: "£267.68", label: "NHS-funded nursing care a week" },
            { value: "£36,750", label: "Upper limit, Scotland" },
            { value: "£50,000", label: "Limit, Wales" },
            { value: "12 weeks", label: "Property disregard" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
