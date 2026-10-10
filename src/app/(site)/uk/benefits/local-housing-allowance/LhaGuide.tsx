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

/** Local Housing Allowance — the guide. Figures from src/lib/benefits/lha-engine.ts and lha-england.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What Local Housing Allowance is" },
  { id: "areas", title: "Broad Rental Market Areas" },
  { id: "bedrooms", title: "How many bedrooms you are allowed" },
  { id: "examples", title: "Bedroom examples" },
  { id: "shared", title: "The shared accommodation rate" },
  { id: "extra-rooms", title: "Extra bedrooms" },
  { id: "rates", title: "Rates around Great Britain" },
  { id: "freeze", title: "The freeze and what it means" },
  { id: "shortfall", title: "If your rent is more than the LHA" },
  { id: "uc-hb", title: "LHA on Universal Credit and Housing Benefit" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "landlord", title: "Paying your landlord directly" },
  { id: "finding", title: "Finding a home within the LHA" },
  { id: "changes", title: "Changes you must report" },
  { id: "challenge", title: "Challenging a decision" },
  { id: "landlords", title: "For landlords" },
  { id: "rent-officer", title: "How rates are set" },
  { id: "young", title: "Young people and the shared rate in practice" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Local Housing Allowance rates", href: "https://www.gov.uk/government/collections/local-housing-allowance-lha-rates" },
  { label: "GOV.UK — Housing Benefit: what you'll get", href: "https://www.gov.uk/housing-benefit/what-youll-get" },
  { label: "GOV.UK — Housing and Universal Credit", href: "https://www.gov.uk/housing-and-universal-credit" },
  { label: "GOV.UK — Discretionary Housing Payments", href: "https://www.gov.uk/government/publications/discretionary-housing-payments-guidance-manual" },
  { label: "Valuation Office Agency — LHA rates", href: "https://lha-direct.voa.gov.uk/" },
  { label: "GOV.UK — Universal Credit LHA rates 2024 to 2025", href: "https://www.gov.uk/government/publications/universal-credit-local-housing-allowance-rates-2024-to-2025" },
  { label: "Scottish Government — Local Housing Allowance rates 2024-2025", href: "https://www.gov.scot/publications/local-housing-allowance-rates-2024-2025/" },
  { label: "Welsh Government — Local Housing Allowance rates April 2024 to March 2025", href: "https://www.gov.wales/node/59785" },
];

export default function LhaGuide() {
  return (
    <Guide
      kicker="The Local Housing Allowance guide"
      title="Local Housing Allowance in 2026/27"
      intro={
        <>
          If you rent from a private landlord and get Universal Credit or <a href="/uk/benefits/housing-benefit">Housing Benefit</a>, the Local Housing Allowance sets the most rent the
          benefit will cover. It depends on where you live and how many bedrooms your household is allowed. This guide explains the bedroom
          rules, the shared rate for under-35s, the 2026/27 freeze and what to do if your rent is higher.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Local Housing Allowance (LHA) is the most rent <a href="/uk/benefits/universal-credit">Universal Credit</a>{" "}or Housing Benefit pays for a private tenancy.</li>
          <li>
            There is a rate for each of 200 areas: 152 in England, 18 in Scotland, 22 in Wales and 8 in Northern Ireland, for shared
            accommodation and for one to four bedrooms.
          </li>
          <li>Universal Credit uses its own monthly rates; Housing Benefit uses weekly rates.</li>
          <li>
            Rates were reset in April 2024 and have been <strong>frozen</strong> since, including for 2026/27.
          </li>
          <li>Single people under 35 without children usually get only the shared accommodation rate.</li>
          <li>If your rent is higher than your LHA, you pay the difference from other income.</li>
        </ul>
        <KeyStats
          items={[
            { value: "200", label: "Rental areas in the UK" },
            { value: "4", label: "Most bedrooms covered" },
            { value: "35", label: "Age the shared rate stops" },
            { value: "Frozen", label: "Rates in 2026/27" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What Local Housing Allowance is">
        <p>
          LHA is not a separate benefit. It is a limit used inside Universal Credit and Housing Benefit. Rent officers collect private rents
          in each area (the Valuation Office Agency in England, and the rent officer services of the Scottish and Welsh Governments) and the rates were last set at the 30th percentile of local rents, so in theory the cheapest three in ten
          homes of the right size are affordable.
        </p>
        <p>
          It applies to most private tenancies. It does not apply to council or housing association homes, where your actual rent is used
          instead, subject to the removal of the spare room subsidy. Some supported and exempt accommodation is also outside the LHA rules.
        </p>
      </GuideSection>

      <GuideSection id="areas" n={3} kicker="Where you live" title="Broad Rental Market Areas">
        <p>
          England is divided into 152 Broad Rental Market Areas, or BRMAs, Scotland into 18 and Wales into 22. Each covers a town or city and the places around it where people
          could reasonably live and still reach the same services. They do not follow council boundaries: a council can be split between two
          areas, and an area can cover several councils.
        </p>
        <p>
          Your area depends on your address, not your landlord&rsquo;s. Your council or the Valuation Office Agency&rsquo;s LHA Direct service
          can tell you which one you are in.
        </p>
      </GuideSection>

      <GuideSection id="bedrooms" n={4} kicker="The size rules" title="How many bedrooms you are allowed">
        <p>You are allowed one bedroom for each of the following people or pairs:</p>
        <ul>
          <li>an adult couple;</li>
          <li>any other person aged 16 or over;</li>
          <li>two children of the same sex under 16;</li>
          <li>two children under 10, whatever their sex;</li>
          <li>any other child.</li>
        </ul>
        <p>
          The rules always use the fewest rooms possible, so the calculator pairs children in the way that gives the smallest number. LHA
          stops at four bedrooms, however large the household.
        </p>
        <Callout title="Birthdays change the answer">
          When a child turns 10 or 16, the household may need an extra room. Tell the Department for Work and Pensions or your council so the
          rate can be increased.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Bedroom examples">
        <DataTable
          caption="Bedroom entitlement for some common households"
          head={["Household", "Bedrooms"]}
          numeric={[1]}
          rows={[
            ["Couple with no children", "1"],
            ["Couple, boy 12 and girl 8", "3"],
            ["Couple, boys 12 and 7, girl 4", "3"],
            ["Couple, girls 11 and 14, boy 3, son 19", "4"],
            ["Couple, five children and a son of 19", "4 (5 needed)"],
          ]}
        />
        <WorkedExample
          title="A couple with a boy of 12, a boy of 7 and a girl of 4"
          steps={[
            { label: "The couple", value: "1 room" },
            { label: "The two boys share (same sex, under 16)", value: "1 room" },
            { label: "The girl", value: "1 room" },
          ]}
          total={{ label: "Bedrooms allowed", value: "3" }}
        />
        <p>
          The girl could share with the 7-year-old boy instead, as both are under 10, but the 12-year-old would then need his own room. Either
          way the answer is three.
        </p>
      </GuideSection>

      <GuideSection id="shared" n={6} kicker="Under 35s" title="The shared accommodation rate">
        <p>
          A single person under 35 with no children usually gets the shared accommodation rate, the cost of a room in a shared house, even if
          they rent a self-contained flat. In Bristol that is £511.33 a month on Universal Credit (£117.68 a week on Housing Benefit),
          compared with £900 a month (£207.12 a week) for one bedroom.
        </p>
        <p>You get the one-bedroom rate instead if you are under 35 and:</p>
        <ul>
          <li>a care leaver under 25;</li>
          <li>getting the daily living part of <a href="/uk/benefits/pip-points">PIP</a>, or the middle or higher care rate of DLA;</li>
          <li>aged 25 or over and have spent at least three months in a homeless hostel and accepted support;</li>
          <li>an ex-offender managed under multi-agency public protection arrangements;</li>
          <li>a victim of domestic abuse or modern slavery, in some circumstances.</li>
        </ul>
        <p>A couple of any age, and anyone with a child, always gets at least the one-bedroom rate.</p>
      </GuideSection>

      <GuideSection id="extra-rooms" n={7} kicker="Special cases" title="Extra bedrooms">
        <CompareCards
          columns={[
            {
              name: "You can get an extra room for",
              rows: [
                { label: "Overnight carer", value: "A non-resident carer who stays overnight regularly" },
                { label: "Disabled child", value: "A child who cannot share because of a disability" },
                { label: "Disabled adult", value: "A couple who cannot share a room because of disability" },
                { label: "Foster carers", value: "Approved foster carers, between placements too" },
              ],
            },
            {
              name: "No extra room for",
              rows: [
                { label: "Lodgers", value: "Their rent is treated as your income instead" },
                { label: "Visiting children", value: "If they live mainly with the other parent" },
                { label: "Study or office", value: "A room for work or storage" },
              ],
            },
          ]}
        />
        <p>
          You may need evidence, such as a letter from a doctor or social worker. Each extra bedroom still counts towards the four-bedroom
          maximum.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={8} kicker="The numbers" title="Rates around Great Britain">
        <p>Rates vary widely. A one-bedroom home in Central London is covered more than four times as much as one in North Powys.</p>
        <DataTable
          caption="Weekly LHA rates in some areas, 2026/27"
          head={["Area", "Shared", "1 bed", "2 bed", "3 bed", "4 bed"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["Birmingham", "£78.61", "£159.95", "£172.60", "£189.86", "£253.15"],
            ["Bristol", "£117.68", "£207.12", "£252.00", "£299.18", "£425.75"],
            ["Central Greater Manchester", "£94.72", "£178.36", "£201.37", "£218.63", "£310.68"],
            ["Outer South London", "£131.02", "£218.63", "£276.16", "£345.21", "£448.77"],
            ["Inner North London", "£163.00", "£331.39", "£412.86", "£497.10", "£704.22"],
            ["Greater Glasgow", "£103.56", "£159.95", "£195.62", "£223.23", "£414.25"],
            ["Lothian (Edinburgh)", "£109.32", "£172.60", "£223.23", "£316.44", "£501.70"],
            ["Cardiff", "£84.25", "£149.59", "£189.86", "£212.88", "£299.18"],
          ]}
        />
        <Figure label="One-bedroom LHA a week" caption="The lowest and highest areas in Great Britain, with four big cities.">
          <Bars
            items={[
              { label: "North Powys", value: 74.79 },
              { label: "Cardiff", value: 149.59 },
              { label: "Birmingham", value: 159.95 },
              { label: "Glasgow", value: 159.95 },
              { label: "Manchester", value: 178.36 },
              { label: "Bristol", value: 207.12 },
              { label: "Central London", value: 331.39 },
            ]}
          />
        </Figure>
        <p>
          Universal Credit has its own monthly rates, set from monthly rents rather than converted from the weekly ones. They are close to
          the weekly rate × 52 ÷ 12 but often a little higher. The two-bedroom rate in Central Greater Manchester is £201.37 a week for
          Housing Benefit, which would be £872.60 a month, but Universal Credit pays up to £875.00.
        </p>
      </GuideSection>

      <GuideSection id="freeze" n={9} kicker="Policy" title="The freeze and what it means">
        <Timeline
          items={[
            { when: "April 2020", what: "Rates reset to the 30th percentile", detail: "Then frozen in cash terms." },
            { when: "April 2024", what: "Rates reset again", detail: "Based on September 2023 rents." },
            { when: "April 2025", what: "Frozen", detail: "No increase despite rising rents." },
            { when: "April 2026", what: "Frozen for 2026/27", detail: "The same rates still apply." },
          ]}
        />
        <p>
          Because private rents have kept rising since the rates were set, fewer homes fall within them each year. Many tenants now have a gap
          between their rent and the help they get, even in the cheapest homes in their area.
        </p>
      </GuideSection>

      <GuideSection id="shortfall" n={10} kicker="Paying the gap" title="If your rent is more than the LHA">
        <WorkedExample
          title="A couple with two children in Bristol, rent £1,300 a month"
          steps={[
            { label: "Bedrooms allowed", value: "2 or 3" },
            { label: "Two-bedroom LHA", note: "Universal Credit monthly rate", value: "£1,095.00" },
            { label: "Rent", value: "£1,300.00" },
          ]}
          total={{ label: "Shortfall a month (two bedrooms)", value: "£205.00" }}
        />
        <p>
          If the children are a boy and a girl and one is 10 or over, they need separate rooms. The three-bedroom rate of £1,300.00 a month
          then applies and the whole rent is covered.
        </p>
        <p>Ways to deal with a shortfall:</p>
        <ul>
          <li>apply to your council for a Discretionary Housing Payment;</li>
          <li>check whether anyone qualifies for an extra bedroom or a shared-rate exemption;</li>
          <li>ask your landlord whether the rent includes services that are not eligible, which may be separated;</li>
          <li>consider a cheaper home, or one in a nearby area with a higher rate.</li>
        </ul>
      </GuideSection>

      <GuideSection id="uc-hb" n={11} kicker="Which benefit" title="LHA on Universal Credit and Housing Benefit">
        <p>
          Most working-age tenants claim help with rent through Universal Credit, which pays the housing element monthly and usually to you.
          You can ask for it to be paid straight to your landlord if you are in arrears or would struggle to manage. Pensioners claim Housing
          Benefit from their council instead, which uses the weekly LHA rates. Universal Credit has its own monthly rates for the same
          areas, often a few pounds a month higher than the weekly rate converted.
        </p>
        <p>
          On Universal Credit, each other adult living with you may reduce the housing element by £96.55 a month. On Housing Benefit, a
          similar non-dependant deduction applies at weekly rates linked to their income.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={12} kicker="Elsewhere in the UK" title="Scotland, Wales and Northern Ireland">
        <p>
          Scotland, Wales and Northern Ireland use the same bedroom rules and the same freeze, but their rates are set locally: by the
          Scottish Government for 18 areas, Rent Officers Wales for 22 and the Northern Ireland Housing Executive for 8. Choose the
          country in the calculator to see them.
        </p>
        <DataTable
          caption="One-bedroom LHA in Scotland, Wales and Northern Ireland, 2026/27"
          head={["Area", "Housing Benefit a week", "Universal Credit a month"]}
          numeric={[1, 2]}
          rows={[
            ["Greater Glasgow", "£159.95", "£695.00"],
            ["Lothian (Edinburgh)", "£172.60", "£750.00"],
            ["Aberdeen and Shire", "£109.32", "£475.00"],
            ["Cardiff", "£149.59", "£650.00"],
            ["Swansea", "£120.82", "£525.00"],
            ["North Powys", "£74.79", "£325.00"],
            ["Belfast", "£139.34", "£605.47"],
            ["South East (Lisburn, Bangor)", "£109.62", "£476.33"],
            ["North West (Derry)", "£99.23", "£431.18"],
          ]}
        />
        <p>
          Some areas cover several councils. Lothian includes the City of Edinburgh, East Lothian and Midlothian, and Highland and Islands
          runs from Moray to Shetland. West Cheshire crosses into Wales but uses the English rates. Northern Ireland&rsquo;s areas go by
          postcode: Belfast is BT1 to BT16, for example, and South East covers Lisburn, Bangor, Newtownards and Downpatrick. There,
          Universal Credit is normally paid twice a month and the housing element goes straight to your landlord. Scotland gives
          Discretionary Housing Payments to fully offset the removal of the spare room subsidy for social tenants, and Northern Ireland
          has its own welfare mitigation payments for it.
        </p>
      </GuideSection>

      <GuideSection id="landlord" n={13} kicker="Payments" title="Paying your landlord directly">
        <p>
          Universal Credit normally pays the housing element to you, as part of your monthly payment, and you pay your landlord. You can ask
          for a managed payment to your landlord if you are struggling to pay rent, have debts or have a health condition that makes managing
          money difficult. Your landlord can also ask for one if you owe at least two months&rsquo; rent.
        </p>
        <p>
          On Housing Benefit, the council can pay your landlord directly if you are vulnerable or have eight weeks or more of arrears.
        </p>
      </GuideSection>

      <GuideSection id="finding" n={14} kicker="Moving home" title="Finding a home within the LHA">
        <p>
          Before you sign a tenancy, check the rate for the number of bedrooms you are allowed in that area. A larger home than your
          entitlement does not raise the rate. A smaller one is fine: you get the lower of your rent and your rate.
        </p>
        <p>
          Areas next to each other can have quite different rates, so the boundary matters. A family allowed two bedrooms in Outer South London
          gets up to £1,196.69 a month, against £872.60 in Central Greater Manchester. Councils can help with deposits and rent in advance,
          and some run schemes that match tenants with landlords who accept benefit claimants.
        </p>
        <Callout title="Refusing benefit claimants is unlawful">
          Courts have found blanket &ldquo;no DSS&rdquo; policies to be unlawful discrimination, and the Renters&rsquo; Rights Act makes
          refusing tenants because they get benefits illegal in England.
        </Callout>
      </GuideSection>

      <GuideSection id="changes" n={15} kicker="Staying right" title="Changes you must report">
        <p>Tell the Department for Work and Pensions or your council straight away if:</p>
        <ul>
          <li>someone moves in or out, or a child turns 10 or 16;</li>
          <li>you turn 35, which ends the shared accommodation rate;</li>
          <li>your rent or service charges change;</li>
          <li>you move to a different address, even in the same area.</li>
        </ul>
        <p>
          Some changes raise your rate. Others lower it, and a late report can lead to an overpayment that you have to repay.
        </p>
      </GuideSection>

      <GuideSection id="challenge" n={16} kicker="Disputes" title="Challenging a decision">
        <p>
          If you think your bedroom entitlement or your area is wrong, ask for a mandatory reconsideration within one month on Universal Credit,
          or ask the council to look again on Housing Benefit. You can then appeal to an independent tribunal. Common errors include missing an
          overnight carer, a disabled child who cannot share, or a shared-rate exemption.
        </p>
      </GuideSection>

      <GuideSection id="landlords" n={17} kicker="Letting" title="For landlords">
        <p>
          If you let to tenants on benefits, the LHA tells you the most rent their benefit will cover. A tenant can still pay more from other
          income, but rents above the rate carry a higher risk of arrears. You can ask for a managed payment if your tenant falls two months
          behind on Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="rent-officer" n={18} kicker="Behind the numbers" title="How rates are set">
        <p>
          Rent officers at the Valuation Office Agency collect details of private lettings in each area: the rent, the number of bedrooms and
          whether the property is shared. They exclude homes let to people on benefits so the rates reflect the open market. When rates are
          reset, each one is set at the 30th percentile, meaning three in ten local rents for that size are at or below it.
        </p>
        <p>
          Every rate is also limited by a national maximum for its size, which is why several central London areas share identical rates,
          such as £331.39 a week for one bedroom. In some areas the rate for a shared room is less than half the one-bedroom rate.
        </p>
      </GuideSection>

      <GuideSection id="young" n={19} kicker="Under 35s" title="Young people and the shared rate in practice">
        <p>
          The shared rate is designed for a room in a house where you share a kitchen, bathroom or living room. If you rent a self-contained
          studio or one-bedroom flat while under 35, you still get only the shared rate unless an exemption applies, so the gap can be large.
          In Bristol it is £89.44 a week between the shared and one-bedroom rates.
        </p>
        <p>
          Your rate changes to the one-bedroom rate from your 35th birthday, or as soon as you have a child living with you or move in with a
          partner. Tell the Department for Work and Pensions when this happens.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "200", label: "Broad Rental Market Areas in the UK" },
            { value: "4", label: "Maximum bedrooms" },
            { value: "35", label: "Shared rate age limit" },
            { value: "30th", label: "Percentile of rents when last set" },
            { value: "£331.39", label: "Highest one-bedroom rate a week" },
            { value: "£74.79", label: "Lowest one-bedroom rate a week" },
            { value: "£704.22", label: "Highest four-bedroom rate a week" },
            { value: "£1,439.97", label: "Highest one-bedroom rate a month on Universal Credit" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
