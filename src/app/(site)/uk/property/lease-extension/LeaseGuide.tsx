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

/** Lease extension premium — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who-can", title: "Who can extend a lease" },
  { id: "what-you-get", title: "What a statutory extension gives you" },
  { id: "formula", title: "How the premium is worked out" },
  { id: "term", title: "The term: ground rent as a lump sum" },
  { id: "reversion", title: "The reversion and the deferment rate" },
  { id: "marriage-value", title: "Marriage value and the 80-year cliff" },
  { id: "relativity", title: "Relativity: what your lease is worth now" },
  { id: "worked-example", title: "A full worked example" },
  { id: "years-left", title: "How the premium grows as the lease runs down" },
  { id: "rates", title: "How much the rates matter" },
  { id: "ground-rent", title: "High and rising ground rents" },
  { id: "costs", title: "The costs on top of the premium" },
  { id: "process", title: "The statutory process, step by step" },
  { id: "informal", title: "Informal deals with the freeholder" },
  { id: "act-2024", title: "The 2024 Act: what is changing" },
  { id: "wait-or-act", title: "Should you wait for the new rules?" },
  { id: "selling-mortgage", title: "Short leases, selling and mortgages" },
  { id: "houses-scotland", title: "Houses, Scotland and Northern Ireland" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Leasehold property: extending, changing or ending a lease", href: "https://www.gov.uk/leasehold-property/extending-changing-or-ending-a-lease" },
  { label: "legislation.gov.uk — Leasehold Reform, Housing and Urban Development Act 1993, Schedule 13", href: "https://www.legislation.gov.uk/ukpga/1993/28/schedule/13" },
  { label: "legislation.gov.uk — 1993 Act, section 42 (the tenant's notice)", href: "https://www.legislation.gov.uk/ukpga/1993/28/section/42" },
  { label: "legislation.gov.uk — Leasehold and Freehold Reform Act 2024", href: "https://www.legislation.gov.uk/ukpga/2024/22/contents" },
  { label: "legislation.gov.uk — Commencement No. 2 Regulations 2025 (two-year rule removed)", href: "https://www.legislation.gov.uk/uksi/2025/57/made" },
  { label: "GOV.UK — Leasehold enfranchisement valuation rates: consultation", href: "https://www.gov.uk/government/consultations/leasehold-enfranchisement-valuation-rates" },
  { label: "The Leasehold Advisory Service (LEASE)", href: "https://www.lease-advice.org/" },
];

export default function LeaseGuide() {
  return (
    <Guide
      kicker="The lease extension guide"
      title="How a lease extension premium is worked out"
      intro={
        <>
          If you own a leasehold flat in England or Wales, the lease shrinks every year, and so does the flat&rsquo;s value once it gets short. You have a legal right to
          extend it by 90 years, but you have to pay the freeholder a premium. This guide explains every part of that premium, why it jumps when the lease reaches 80
          years, what the 2024 Act will change and why it has not changed it yet. Every figure comes from the calculator above.
        </>
      }
      meta={["England and Wales", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          Under the rules in force in October 2026, the premium for a statutory lease extension is the freeholder&rsquo;s loss plus, if 80 years or fewer are left, half
          of the &ldquo;marriage value&rdquo;. You also pay your own legal and valuation fees and the freeholder&rsquo;s reasonable costs.
        </p>
        <p>For a flat worth £250,000 with a long lease, a £250 ground rent and the standard rates, the premium changes like this as the lease runs down:</p>
        <DataTable
          caption="Premium for a £250,000 flat, £250 ground rent, 5% deferment, 6.5% capitalisation"
          head={["Years left", "Current rules", "2024 Act method (not in force)"]}
          numeric={[1, 2]}
          rows={[
            ["90", "£6,922", "£6,961"],
            ["81", "£8,615", "£8,675"],
            ["80", "£16,548", "£8,916"],
            ["75", "£20,142", "£10,315"],
            ["70", "£24,432", "£12,099"],
            ["60", "£34,691", "£17,277"],
            ["50", "£48,195", "£25,702"],
          ]}
        />
        <p>
          Two things stand out. The premium almost doubles between 81 and 80 years, because marriage value starts. And the 2024 Act would roughly halve the cost of
          a short lease, but its valuation rules are not in force, and no one can yet say when they will be.
        </p>
      </GuideSection>

      <GuideSection id="who-can" n={2} kicker="Eligibility" title="Who can extend a lease">
        <p>
          The right to a new lease comes from the Leasehold Reform, Housing and Urban Development Act 1993. You usually qualify if your flat is in England or Wales and
          your lease was originally granted for more than 21 years. Most flats sold on long leases meet that easily.
        </p>
        <p>
          You used to have to own the flat for two years before using the right. That rule was removed on 31 January 2025 by the first changes from the Leasehold
          and Freehold Reform Act 2024 to come into force. You can now start the process as soon as you are the registered owner, which helps buyers of short-lease
          flats who want to extend straight away.
        </p>
        <p>
          A few leases are excluded, such as some business leases, some leases granted by charitable housing trusts and flats where the landlord is the Crown (although
          the Crown usually agrees to extend on similar terms). A solicitor will check this at the start.
        </p>
      </GuideSection>

      <GuideSection id="what-you-get" n={3} kicker="The new lease" title="What a statutory extension gives you">
        <p>Under the 1993 Act you get a new lease that:</p>
        <ul>
          <li>adds 90 years to the years you have left, so a lease with 75 years left becomes 165 years;</li>
          <li>has a peppercorn ground rent, which in practice means no ground rent at all;</li>
          <li>otherwise keeps the same terms as your existing lease, with only limited changes allowed.</li>
        </ul>
        <p>
          Losing the ground rent is part of what you pay for: the freeholder gives up the rent for the rest of the current lease, and is compensated for it in the
          premium. Once the 2024 Act valuation changes come in, the standard extension becomes 990 years, also at a peppercorn rent.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={4} kicker="The formula" title="How the premium is worked out">
        <p>Schedule 13 of the 1993 Act sets out the premium. In plain terms it has three parts:</p>
        <ol>
          <li>
            <strong>The fall in the value of the freeholder&rsquo;s interest.</strong>{" "}Today the freeholder owns two things: the ground rent until the lease ends (the
            &ldquo;term&rdquo;), and the right to get the flat back when it ends (the &ldquo;reversion&rdquo;). After the extension they lose the rent and must wait 90
            more years for the flat.
          </li>
          <li>
            <strong>Half the marriage value</strong>, if 80 years or fewer are left. This is the extra value created by putting a long lease back together, shared
            equally.
          </li>
          <li>
            <strong>Compensation</strong>{" "}for any other loss, which is rare for an ordinary flat and is not included in the calculator.
          </li>
        </ol>
        <p>
          The calculator values each part using the standard method valuers and tribunals use. You give it the flat&rsquo;s value, the years left and the ground rent;
          the rates and relativity sit under More options with sensible defaults.
        </p>
      </GuideSection>

      <GuideSection id="term" n={5} kicker="Part 1a" title="The term: ground rent as a lump sum">
        <p>
          The term is what the ground rent for the rest of the lease is worth today. Each future year&rsquo;s rent is discounted back at the{" "}
          <strong>capitalisation rate</strong>{" "}and added up. A £250 rent for 75 years at 6.5% is worth £3,812 today, far less than the £18,750 it adds up to, because
          money received decades from now is worth little now.
        </p>
        <WorkedExample
          title="Worked example: valuing the ground rent"
          steps={[
            { label: "Ground rent", value: "£250 a year" },
            { label: "Years left", value: "75" },
            { label: "Capitalisation rate", value: "6.5%" },
          ]}
          total={{ label: "Term value", value: "£3,812" }}
        />
        <p>
          For most flats with a modest fixed rent, the term is a small part of the premium. It matters much more when the ground rent is high or rises sharply, as
          section 12 explains.
        </p>
      </GuideSection>

      <GuideSection id="reversion" n={6} kicker="Part 1b" title="The reversion and the deferment rate">
        <p>
          The reversion is the value today of the freeholder getting the flat back, with vacant possession, when the lease ends. It starts from the freehold value of the
          flat and discounts it over the years left at the <strong>deferment rate</strong>.
        </p>
        <p>
          The deferment rate for flats has been 5% since the Sportelli case (Earl Cadogan v Sportelli, decided by the Lands Tribunal in 2006 and upheld by the Court of
          Appeal in 2007). Tribunals still start from it. In our example, a freehold value of £252,525 deferred 75 years at 5% is worth £6,503 today.
        </p>
        <p>
          After the extension the freeholder still gets the flat back, but 165 years from now instead of 75. That new reversion is worth only £81 today, so the
          freeholder&rsquo;s loss on the reversion is £6,503 − £81 = £6,422. Add the term, and the freeholder&rsquo;s total loss is £10,234.
        </p>
        <Callout title="Why the freehold value, not the flat value?">
          Valuers usually treat the freehold of a flat as worth about 1% more than the same flat on a very long lease, because a long lease still has a landlord, service
          charges and restrictions. A £250,000 long-lease value becomes a £252,525 freehold value. You can change this 1% under More options.
        </Callout>
      </GuideSection>

      <GuideSection id="marriage-value" n={7} kicker="Part 2" title="Marriage value and the 80-year cliff">
        <p>
          Marriage value is the value that appears when the leaseholder and freeholder&rsquo;s interests are combined. Before the extension, your short lease and the
          freeholder&rsquo;s interest together are worth less than a flat on a long lease. The extension unlocks the difference. The law says the freeholder gets half of
          it.
        </p>
        <WorkedExample
          title="Worked example: marriage value with 75 years left"
          steps={[
            { label: "Value after: extended lease", value: "£250,000" },
            { label: "Plus the freeholder's new reversion", value: "£81" },
            { label: "Less value before: current lease", note: "87.1% of £252,525", value: "−£219,949" },
            { label: "Less the freeholder's term and reversion now", value: "−£10,315" },
            { label: "Marriage value", value: "£19,816" },
          ]}
          total={{ label: "Freeholder's half", value: "£9,908" }}
        />
        <p>
          The crucial rule: when more than 80 years are left at the date you serve notice, marriage value is taken to be nil. The law treats a lease of over 80 years as
          long enough that there is nothing to unlock. As soon as the lease reaches 80 years, the full half share is added.
        </p>
        <Figure label="Premium either side of the 80-year line" caption="£250,000 flat, £250 ground rent, 5% deferment, 6.5% capitalisation, current rules.">
          <Bars
            items={[
              { label: "82 years", value: 8388 },
              { label: "81 years", value: 8615 },
              { label: "80 years", value: 16548 },
              { label: "79 years", value: 17304 },
              { label: "78 years", value: 17940 },
            ]}
          />
        </Figure>
        <p>
          In this example, moving from 81 to 80 years adds £7,933 to the premium, almost all of it the £7,695 half share of marriage value. That is why advisers urge
          leaseholders to serve notice well before 80 years.
        </p>
      </GuideSection>

      <GuideSection id="relativity" n={8} kicker="The hardest number" title="Relativity: what your lease is worth now">
        <p>
          To work out marriage value, the valuer needs the value of your flat with its current lease, assuming (by law) that the lease has no right to be extended. That
          value, as a share of the freehold value, is called <strong>relativity</strong>.
        </p>
        <p>
          There is rarely direct market evidence for a lease without extension rights, so valuers rely on published &ldquo;graphs of relativity&rdquo;. Our default
          comes from Savills&rsquo; 2016 relativity table for leases without Act rights, built on the analysis the Upper Tribunal considered in the 2016 Mundy case
          (Sloane Stanley Estate v Mundy). It is the most widely quoted starting point, although it is drawn from central London sales.
        </p>
        <DataTable
          caption="Default relativity by years left (share of the freehold value)"
          head={["Years left", "Relativity"]}
          numeric={[1]}
          rows={[
            ["80", "89.4%"],
            ["75", "87.1%"],
            ["70", "84.4%"],
            ["65", "81.5%"],
            ["60", "78.3%"],
            ["50", "70.9%"],
            ["40", "62.1%"],
            ["30", "51.5%"],
            ["20", "39.2%"],
          ]}
        />
        <p>
          Relativity is often the most argued-over number in a lease extension, and it moves the premium a lot. For our 75-year example the premium is £22,794 at 85%,
          £20,142 at the default 87.1% and £16,481 at 90%. Outside London, valuers sometimes argue for higher relativities, which lower the premium. If your valuer
          gives you a figure, enter it under More options.
        </p>
      </GuideSection>

      <GuideSection id="worked-example" n={9} kicker="All together" title="A full worked example">
        <p>Here is the whole calculation for the calculator&rsquo;s default flat: worth £250,000 with a long lease, 75 years left and a £250 ground rent.</p>
        <WorkedExample
          title="Lease extension premium: £250,000 flat, 75 years left"
          steps={[
            { label: "Term: £250 a year for 75 years at 6.5%", value: "£3,812" },
            { label: "Reversion: £252,525 deferred 75 years at 5%", value: "£6,503" },
            { label: "Less the new reversion after 165 years", value: "−£81" },
            { label: "Freeholder's loss", value: "£10,234" },
            { label: "Half the marriage value", value: "£9,908" },
            { label: "Premium", value: "£20,142" },
            { label: "Costs: your solicitor, your valuer, the freeholder's costs", note: "Example figures", value: "£3,800" },
          ]}
          total={{ label: "Total cost", value: "£23,942" }}
        />
        <p>
          The same flat under the 2024 Act method, using the same 5% and 6.5% rates as stand-ins for the rates the government will set, would cost £10,315 plus your own
          costs only: about £12,615 in all.
        </p>
      </GuideSection>

      <GuideSection id="years-left" n={10} kicker="Timing" title="How the premium grows as the lease runs down">
        <p>
          The shorter the lease, the more the reversion and the marriage value are worth, so the premium grows each year. It grows slowly above 80 years and much faster
          below it.
        </p>
        <Figure label="Premium by years left, current rules" caption="£250,000 flat at today's value, £250 ground rent, standard rates.">
          <Bars
            items={[
              { label: "90 years", value: 6922 },
              { label: "80 years", value: 16548 },
              { label: "70 years", value: 24432 },
              { label: "60 years", value: 34691 },
              { label: "50 years", value: 48195 },
              { label: "40 years", value: 66072 },
              { label: "30 years", value: 90460 },
              { label: "20 years", value: 123880 },
            ]}
          />
        </Figure>
        <p>
          These figures hold the flat&rsquo;s value fixed to show the effect of time alone. In real life prices change too, so the premium also moves with the property
          market. The chart in the calculator lets you read any lease length.
        </p>
        <p>
          Bigger flats cost more to extend in proportion. With 70 years left, a £150,000 flat costs about £15,419 and a £400,000 flat about £37,952.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={11} kicker="Sensitivity" title="How much the rates matter">
        <p>
          A higher rate means a lower premium, because it discounts the freeholder&rsquo;s future money more heavily. Under the current rules the deferment rate is fairly
          settled at 5% for flats, while the capitalisation rate varies more from case to case.
        </p>
        <DataTable
          caption="Premium for the 75-year example at different deferment rates"
          head={["Deferment rate", "Current rules", "2024 Act method"]}
          numeric={[1, 2]}
          rows={[
            ["4.5%", "£21,494", "£13,114"],
            ["5% (Sportelli)", "£20,142", "£10,315"],
            ["5.5%", "£19,190", "£8,366"],
            ["6.3%", "£18,218", "£6,396"],
          ]}
        />
        <p>
          The deferment rate matters far more under the 2024 Act method, because without marriage value the reversion is most of the premium. That is why the rates the
          government will prescribe are so contested. The capitalisation rate matters less here: 5% gives £20,672, 6.5% gives £20,142 and 8% gives £19,794.
        </p>
        <Callout tone="warn" title="The 6.3% figure is not a proposal">
          A Government Actuary&rsquo;s Department review published with the 2026 consultation gave 6.3% for flats under one approach. The government has not proposed it
          as the rate. It is shown only to illustrate how much the choice of rate matters.
        </Callout>
      </GuideSection>

      <GuideSection id="ground-rent" n={12} kicker="Ground rent" title="High and rising ground rents">
        <p>
          A high ground rent makes the term worth much more. With 70 years left on a £250,000 flat, a £250 rent gives a term of £3,799 and a premium of £24,432. A £1,000
          rent gives a term of £15,197 and a premium of £30,131.
        </p>
        <p>
          The 2024 Act takes aim at this. Its valuation method only counts ground rent up to 0.1% of the freehold value, which is £253 a year for our example flat. The
          same £1,000-rent flat would cost about £12,137 under that method.
        </p>
        <p>
          If your ground rent doubles every few years or rises with inflation, enter the current figure for a first estimate and ask your valuer to model the reviews.
          Rising rents are usually valued at a lower capitalisation rate, which raises the term.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={13} kicker="Costs" title="The costs on top of the premium">
        <p>Under the current rules you pay:</p>
        <ul>
          <li>your own solicitor;</li>
          <li>your own valuer, whose report should come before you serve notice;</li>
          <li>
            the freeholder&rsquo;s reasonable legal and valuation costs, under section 60 of the 1993 Act (but not their costs of a tribunal hearing, if there is one);
          </li>
          <li>tribunal fees if you cannot agree and apply to the First-tier Tribunal (Property Chamber) in England or the Leasehold Valuation Tribunal in Wales;</li>
          <li>a small Land Registry fee to register the new lease, and any lender&rsquo;s fees if you have a mortgage.</li>
        </ul>
        <p>
          The calculator uses example figures of £1,500, £800 and £1,500 for the first three. They are placeholders, not averages: fees vary with the firm, the area and
          how complicated the lease is, so get quotes and enter your own. Under the 2024 Act, leaseholders will generally no longer pay the freeholder&rsquo;s costs.
        </p>
      </GuideSection>

      <GuideSection id="process" n={14} kicker="Process" title="The statutory process, step by step">
        <Timeline
          items={[
            { when: "Step 1", what: "Get a valuation", detail: "A surveyor who knows lease extensions gives you a likely premium and a figure to propose." },
            { when: "Step 2", what: "Serve a section 42 notice", detail: "Your solicitor serves the formal notice on the freeholder. This fixes the valuation date and the years left used in the valuation." },
            { when: "Step 3", what: "Pay a deposit and allow access", detail: "The freeholder can ask for a deposit and inspect the flat for their own valuation." },
            { when: "Step 4", what: "Counter-notice", detail: "The freeholder has at least two months to reply, accepting the claim or giving their own figure." },
            { when: "Step 5", what: "Negotiate", detail: "Most cases settle between the two valuers." },
            { when: "Step 6", what: "Tribunal if needed", detail: "If you cannot agree, either side can apply to the tribunal within the time limits." },
            { when: "Step 7", what: "Complete", detail: "You pay the premium and costs, and the new lease is registered." },
          ]}
        />
        <p>
          The date you serve notice is what matters for the 80-year line. If you serve notice with 80 years and one month left, marriage value is nil even if the deal
          completes after the lease passes 80 years.
        </p>
      </GuideSection>

      <GuideSection id="informal" n={15} kicker="Alternatives" title="Informal deals with the freeholder">
        <p>
          You can also ask the freeholder for an informal extension. It can be quicker and cheaper in fees, but nothing obliges the freeholder to offer fair terms. Watch
          for:
        </p>
        <ul>
          <li>a shorter extension, such as 99 years in total instead of 90 extra years;</li>
          <li>a ground rent that stays or rises, instead of a peppercorn rent;</li>
          <li>new clauses, such as higher fees for consents.</li>
        </ul>
        <p>
          Compare any informal offer with the statutory premium from the calculator and your valuer. Many lenders now dislike leases with rising ground rents, which can
          make an informal deal a false economy when you come to sell or <a href="/uk/property/remortgage">remortgage</a>.
        </p>
      </GuideSection>

      <GuideSection id="act-2024" n={16} kicker="Reform" title="The 2024 Act: what is changing">
        <p>The Leasehold and Freehold Reform Act 2024 became law in May 2024. For lease extensions it will:</p>
        <CompareCards
          columns={[
            {
              name: "Current rules (in force)",
              rows: [
                { label: "Extension", value: "90 extra years" },
                { label: "Marriage value", value: "Half, under 80 years" },
                { label: "Rates", value: "Set by tribunals (5% flats)" },
                { label: "Ground rent in the term", value: "All of it" },
                { label: "Freeholder's costs", value: "You pay them" },
              ],
            },
            {
              name: "2024 Act (not in force)",
              rows: [
                { label: "Extension", value: "990 years" },
                { label: "Marriage value", value: "Abolished" },
                { label: "Rates", value: "Prescribed by government" },
                { label: "Ground rent in the term", value: "Capped at 0.1% of value" },
                { label: "Freeholder's costs", value: "Generally not payable" },
              ],
            },
          ]}
        />
        <p>
          Only some parts of the Act are in force, such as removing the two-year ownership rule. The valuation changes need the deferment and capitalisation rates to be
          set in regulations. The government consulted on those rates in 2026, with the consultation extended to close on 21 October 2026, and says it must also fix
          technical problems in the Act through new primary legislation first.
        </p>
        <p>
          Freeholders challenged the changes in court. The High Court dismissed the challenge in October 2025, and the case has since been given permission to go to
          the Court of Appeal. At the time of writing, no commencement date has been announced.
        </p>
      </GuideSection>

      <GuideSection id="wait-or-act" n={17} kicker="Decision" title="Should you wait for the new rules?">
        <p>There is no right answer for everyone, but these points help:</p>
        <ul>
          <li>
            <strong>Over 80 years left.</strong>{" "}There is no marriage value now, so the new rules would save less. The bigger risk is drifting below 80 while you wait.
          </li>
          <li>
            <strong>Just under 80.</strong>{" "}Waiting could save marriage value, but each year adds to the premium, and the timing of the reforms is uncertain.
          </li>
          <li>
            <strong>Short leases, say under 60 years.</strong>{" "}The potential saving is largest, but so is the cost of waiting, and selling or{" "}
            <a href="/uk/property/mortgage-affordability">borrowing against</a>{" "}the flat gets harder.
          </li>
          <li>
            <strong>Selling soon.</strong>{" "}A buyer&rsquo;s lender may insist on a longer lease. One option is to serve notice and assign the benefit of it to the buyer
            when you sell.
          </li>
        </ul>
        <p>
          Use the comparison in the calculator: the gap between the two methods is the most the reforms could save you on the premium, at the rates you entered. The
          real saving depends on the rates the government sets and the date the changes start.
        </p>
      </GuideSection>

      <GuideSection id="selling-mortgage" n={18} kicker="Practicalities" title="Short leases, selling and mortgages">
        <p>
          Many lenders want a lease to have a set number of years left at the end of the mortgage term, often 70 years or more, and some want more. Buyers who need a
          mortgage may walk away from a short lease, which is why short-lease flats often sell at a discount or to cash buyers.
        </p>
        <p>
          If you are budgeting for a move, add the extension to your <a href="/uk/property/moving-house-budget">moving house budget</a>. If you let the flat, the premium
          and costs are generally capital costs for tax rather than expenses against rent, which matters for{" "}
          <a href="/uk/property/property-capital-gains">Capital Gains Tax</a>{" "}when you sell. Landlords can check how an extension changes their returns with the{" "}
          <a href="/uk/property/buy-to-let-yield">buy-to-let yield calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="houses-scotland" n={19} kicker="Other cases" title="Houses, Scotland and Northern Ireland">
        <p>
          This calculator is for flats in England and Wales. Leasehold houses use a different law (the Leasehold Reform Act 1967) and a different method: most house
          owners buy the freehold instead, and the Sportelli deferment rate for houses is 4.75%.
        </p>
        <p>
          Scotland abolished long residential leases in 2015, converting most into ownership. Northern Ireland has its own ground rent and leasehold rules. If you own a
          share of a flat through <a href="/uk/property/shared-ownership">shared ownership</a>, the housing association is usually the landlord and the rules on extending
          differ, so ask them first.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "90 years", label: "Added by a statutory extension, at a peppercorn rent" },
            { value: "80 years", label: "Marriage value applies at or below this, at the notice date" },
            { value: "50%", label: "Freeholder's share of marriage value" },
            { value: "5%", label: "Deferment rate for flats (Sportelli)" },
            { value: "6% to 7%", label: "Most common capitalisation rates in tribunal decisions" },
            { value: "0.1%", label: "2024 Act cap on ground rent in the valuation, of the freehold value" },
            { value: "990 years", label: "Extension under the 2024 Act, once in force" },
            { value: "21 Oct 2026", label: "Valuation rates consultation closes" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
