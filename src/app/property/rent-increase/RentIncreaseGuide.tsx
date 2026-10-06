import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Rent increases — the guide. Figures from src/lib/property/renting.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "changed", title: "What changed in England in May 2026" },
  { id: "section-13", title: "The section 13 notice" },
  { id: "timing", title: "Notice and the once-a-year rule" },
  { id: "examples", title: "Worked examples" },
  { id: "market-rent", title: "What a market rent means" },
  { id: "tribunal", title: "Challenging a rise at the tribunal" },
  { id: "wales", title: "Wales" },
  { id: "scotland", title: "Scotland" },
  { id: "ni", title: "Northern Ireland" },
  { id: "compare", title: "The four nations side by side" },
  { id: "afford", title: "If you cannot afford the new rent" },
  { id: "landlords", title: "For landlords" },
  { id: "negotiate", title: "Negotiating with your landlord" },
  { id: "social", title: "Council and housing association rents" },
  { id: "benefits", title: "Rent rises and benefits" },
  { id: "records", title: "Keeping good records" },
  { id: "advice", title: "Free advice" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Guide to the Renters' Rights Act", href: "https://www.gov.uk/government/publications/guide-to-the-renters-rights-act/guide-to-the-renters-rights-act" },
  { label: "GOV.UK — Private renting: rent disputes", href: "https://www.gov.uk/private-renting/rent-disputes" },
  { label: "GOV.UK — Tenancy deposit protection", href: "https://www.gov.uk/tenancy-deposit-protection" },
  { label: "Legislation — Private Tenancies Act (Northern Ireland) 2022, section 7", href: "https://www.legislation.gov.uk/nia/2022/20/section/7" },
  { label: "Shelter Scotland — Rent increases in private residential tenancies", href: "https://scotland.shelter.org.uk/housing_advice/tenants_rights/rent_increase_prt" },
  { label: "GOV.WALES — Renting homes: tenants", href: "https://www.gov.wales/renting-homes-tenants" },
];

export default function RentIncreaseGuide() {
  return (
    <Guide
      kicker="The rent increase guide"
      title="Rent increases in 2026"
      intro={
        <>
          Landlords can put the rent up, but only in the right way and not too often. The rules changed in England on 1 May 2026 under the
          Renters&rsquo; Rights Act, and Wales, Scotland and Northern Ireland each have their own. This guide explains the notice you should
          get, how often rent can rise, how to judge whether a rise is fair and how to challenge it.
        </>
      }
      meta={["2026 rules", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>In England, private rents can only go up through a <strong>section 13 notice</strong>, once a year, with at least 2 months&rsquo; notice.</li>
          <li>Wales needs 2 months&rsquo; notice; Scotland and Northern Ireland need 3. All four nations allow one rise a year.</li>
          <li>There is no fixed cap on the size of a rise in England, Wales or Northern Ireland, but the rent should not go above the market rate.</li>
          <li>In England you can ask the First-tier Tribunal to decide the market rent before the new rent starts. It cannot set more than the landlord asked.</li>
          <li>A notice that breaks the timing rules is not valid: keep paying your current rent and say so in writing.</li>
        </ul>
        <KeyStats
          items={[
            { value: "2 months", label: "Notice in England and Wales" },
            { value: "3 months", label: "Notice in Scotland and NI" },
            { value: "1", label: "Rise allowed each year" },
            { value: "1 May 2026", label: "Renters' Rights Act tenancy changes" },
          ]}
        />
      </GuideSection>

      <GuideSection id="changed" n={2} kicker="England" title="What changed in England in May 2026">
        <p>
          On 1 May 2026 assured shorthold tenancies were replaced by assured periodic tenancies. Fixed terms became rolling tenancies, section 21
          &ldquo;no-fault&rdquo; evictions ended, and the way rent goes up changed:
        </p>
        <ul>
          <li>every private rent increase now uses the statutory section 13 process;</li>
          <li>rent review clauses in tenancy agreements no longer work;</li>
          <li>the tribunal cannot set a rent higher than the landlord proposed;</li>
          <li>a rise decided by the tribunal starts from the date of its decision, not the date in the notice, and it can be put back by up to 2 more months in cases of hardship.</li>
        </ul>
        <p>
          The aim is to stop rent rises being used as a back-door eviction, while still letting landlords charge the market rate.
        </p>
      </GuideSection>

      <GuideSection id="section-13" n={3} kicker="The form" title="The section 13 notice">
        <p>
          The notice is a short government form that sets out the new rent and the date it starts. It must be served on you in a way
          your tenancy allows, often by post, by hand or by email if you have agreed to that. A letter or text saying the rent is going up is not
          enough on its own.
        </p>
        <p>
          If you are happy with the rise, you do nothing: just pay the new amount from the start date. If you are not, you can negotiate with
          your landlord or apply to the tribunal before the start date.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={4} kicker="Dates" title="Notice and the once-a-year rule">
        <p>Two dates decide whether a rise can start when the notice says:</p>
        <ol>
          <li>
            <strong>Notice period.</strong> The start date must be at least 2 months after you get the notice in England and Wales, or 3 months in
            Scotland and Northern Ireland.
          </li>
          <li>
            <strong>Once a year.</strong> In England the new rent cannot start until 52 weeks after the last increase or the start of the tenancy.
            In Wales, Scotland and Northern Ireland it is 12 months.
          </li>
        </ol>
        <p>The calculator checks both and gives the earliest start date that would be valid.</p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="A rise from £1,100 to £1,200 a month in England"
          steps={[
            { label: "Increase", value: "£100 a month, 9.1%" },
            { label: "Extra a year", value: "£1,200" },
            { label: "Notice received 1 October 2026: earliest start by notice", value: "1 December 2026" },
            { label: "Last rise 1 December 2025: earliest start by the 52-week rule", value: "30 November 2026" },
          ]}
          total={{ label: "Start date of 1 December 2026", value: "Valid" }}
        />
        <p>
          If the same notice arrived on 15 October, the earliest valid start would be 15 December 2026. If the last rise had been on 1 March 2026,
          the earliest would be 28 February 2027. In Scotland, with 3 months&rsquo; notice, a notice received on 1 October 2026 could not take
          effect before 1 January 2027.
        </p>
        <DataTable
          caption="£1,100 a month rising by 9.1% each year"
          head={["After", "Rent a month"]}
          numeric={[1]}
          rows={[
            ["1 year", "£1,200.00"],
            ["2 years", "£1,309.09"],
            ["3 years", "£1,428.10"],
            ["5 years", "£1,699.56"],
          ]}
        />
      </GuideSection>

      <GuideSection id="market-rent" n={6} kicker="Fair rent" title="What a market rent means">
        <p>
          The market rent is what your home would let for if it were advertised today, on the same terms, in its current condition. It is not
          your rent plus inflation, and it ignores improvements you have made yourself.
        </p>
        <p>To judge whether a rise is fair:</p>
        <ul>
          <li>look at homes of the same size and type advertised within a mile or two;</li>
          <li>adjust for differences: parking, a garden, condition, furnishings, energy rating;</li>
          <li>keep screenshots of the listings with dates, in case you need evidence.</li>
        </ul>
        <Callout title="Enter it in the calculator">
          Add the rent of similar homes under More options to see how far above or below them the new rent is.
        </Callout>
      </GuideSection>

      <GuideSection id="tribunal" n={7} kicker="England" title="Challenging a rise at the tribunal">
        <Timeline
          items={[
            { when: "Before the start date", what: "Apply to the First-tier Tribunal (Property Chamber)", detail: "Tell your landlord you have applied. Keep paying the current rent." },
            { when: "A few weeks later", what: "Evidence", detail: "Both sides can send evidence of local rents. The tribunal may inspect the property." },
            { when: "Decision", what: "The tribunal sets the market rent", detail: "It cannot be more than your landlord asked for." },
            { when: "From the decision", what: "The new rent starts", detail: "Not backdated. It can be delayed by up to 2 more months for hardship." },
          ]}
        />
        <p>
          Challenging a rise is not a reason for eviction, and section 21 no-fault evictions have ended. If you fall into serious rent
          arrears, though, the landlord may have grounds for possession, so keep paying the rent you owe now.
        </p>
      </GuideSection>

      <GuideSection id="wales" n={8} kicker="Wales" title="Wales">
        <p>
          In Wales, private tenants have occupation contracts under the Renting Homes (Wales) Act 2016. For a periodic standard contract, the
          landlord must give at least 2 months&rsquo; notice using the prescribed form (RHW12), and can only raise the rent once a year. If you
          think the new rent is too high, you can apply to the Residential Property Tribunal before it starts.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={9} kicker="Scotland" title="Scotland">
        <p>
          Private residential tenancies allow one rise in any 12 months, with at least 3 months&rsquo; written notice on the prescribed form. You
          can ask a rent officer at Rent Service Scotland to look at it within 21 days of getting the notice; this goes up to 30 days from 1 April
          2027, when rent officers will also be unable to set a rent above the landlord&rsquo;s figure.
        </p>
        <p>
          The Housing (Scotland) Act 2025 lets councils and Scottish Ministers set up rent control areas. Inside one, rents in existing tenancies can
          rise by no more than CPI plus 1%, up to 6% a year. The framework started on 1 April 2026, but no area has been designated yet.
        </p>
      </GuideSection>

      <GuideSection id="ni" n={10} kicker="Northern Ireland" title="Northern Ireland">
        <p>
          Under the Private Tenancies Act (Northern Ireland) 2022, from 1 April 2025 rent cannot go up within 12 months of the start of the
          tenancy or the last increase, and you must get 3 months&rsquo; written notice. An increase made too early has no legal effect, so you do
          not have to pay it. Housing Rights can advise if your landlord insists.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={11} kicker="Summary" title="The four nations side by side">
        <CompareCards
          columns={[
            {
              name: "England and Wales",
              rows: [
                { label: "Notice", value: "2 months" },
                { label: "How often", value: "Once a year" },
                { label: "Challenge", value: "Tribunal, before the start date" },
              ],
            },
            {
              name: "Scotland and Northern Ireland",
              rows: [
                { label: "Notice", value: "3 months" },
                { label: "How often", value: "Once in 12 months" },
                { label: "Challenge", value: "Rent officer (Scotland); advice (NI)" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="afford" n={12} kicker="Help" title="If you cannot afford the new rent">
        <ul>
          <li>Talk to your landlord early. Many prefer a smaller rise to an empty home.</li>
          <li>
            Check whether you can get help with rent through <a href="/benefits/universal-credit">Universal Credit</a> or{" "}
            <a href="/benefits/housing-benefit">Housing Benefit</a>. Private rents are limited to the{" "}
            <a href="/benefits/local-housing-allowance">Local Housing Allowance</a>.
          </li>
          <li>If you already get help with rent, ask your council for a Discretionary Housing Payment to cover a shortfall.</li>
          <li>Report the new rent to the DWP or council straight away so your award is updated.</li>
          <li>If you decide to move, you must give the notice your tenancy requires: at least 2 months in England.</li>
        </ul>
      </GuideSection>

      <GuideSection id="landlords" n={13} kicker="Landlords" title="For landlords">
        <p>
          To raise the rent in England, serve a section 13 notice with at least 2 months&rsquo; notice, no sooner than 52 weeks after the last
          increase. Set a rent you could justify with local evidence. A rise above the market rate is likely to be cut by the tribunal, and the
          delay means you may not get the new rent for months.
        </p>
      </GuideSection>

      <GuideSection id="negotiate" n={14} kicker="Talking it through" title="Negotiating with your landlord">
        <p>
          Many rent rises are settled without any tribunal. Landlords know that an empty home, a new letting fee and a few weeks without rent can
          cost more than a smaller increase. Before you reply:
        </p>
        <ul>
          <li>gather two or three listings for similar homes nearby, with their rents and dates;</li>
          <li>list anything that makes your home less valuable than those, such as outstanding repairs or an old kitchen;</li>
          <li>point out your record as a tenant: rent always paid on time, the home well kept;</li>
          <li>suggest a figure, or a smaller rise now with another in a year&rsquo;s time.</li>
        </ul>
        <p>
          Put any agreement in writing, including the new rent and the date it starts. Keep it with your tenancy papers, because the next rise
          is counted from that date.
        </p>
      </GuideSection>

      <GuideSection id="social" n={15} kicker="Social housing" title="Council and housing association rents">
        <p>
          Social rents follow different rules. In England, council and housing association rents usually go up once a year in April, within a limit
          set by the government&rsquo;s rent policy, which links rises to inflation (CPI plus 1%). Landlords must give at least 4 weeks&rsquo;
          notice of the new rent. Scotland, Wales and Northern Ireland have their own social rent policies.
        </p>
        <p>
          The calculator is for private tenancies. If you rent from a council or housing association and think a rise is wrong, ask your landlord
          to explain it and use their complaints procedure; in England you can then go to the Housing Ombudsman.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={16} kicker="Universal Credit and Housing Benefit" title="Rent rises and benefits">
        <p>
          If you get help with rent, report the new rent as soon as it starts. Universal Credit and Housing Benefit only cover private rents up to
          the Local Housing Allowance for your area, which is frozen at April 2024 levels for 2026/27, so a rise may not be covered in full.
        </p>
        <p>
          A 10% rise on a rent already above the Local Housing Allowance comes straight out of your other income. Check how much is covered with
          the <a href="/benefits/local-housing-allowance">Local Housing Allowance calculator</a>, and ask your council for a Discretionary Housing
          Payment if the gap is hard to meet.
        </p>
      </GuideSection>

      <GuideSection id="records" n={17} kicker="Practical" title="Keeping good records">
        <ul>
          <li>Keep every rent increase notice, with the envelope or email showing when it arrived.</li>
          <li>Keep a note of every rent change and its start date. The once-a-year rule runs from the last rise.</li>
          <li>Pay rent by bank transfer, not cash, so you have proof of what you paid and when.</li>
          <li>Write down any repairs you have reported and when; they may be relevant to the market rent.</li>
        </ul>
        <p>
          A simple record makes it easy to show that a notice was too early, and gives the tribunal the evidence it needs if you challenge a
          rise.
        </p>
      </GuideSection>

      <GuideSection id="advice" n={18} kicker="Help" title="Free advice">
        <p>
          If you are unsure whether a notice is valid, or how to apply to the tribunal, get free advice before the start date. Shelter and
          Citizens Advice help tenants in England, Shelter Cymru in Wales, Shelter Scotland in Scotland and Housing Rights in Northern Ireland. Many
          councils also have a private renting or tenancy relations officer who can speak to your landlord for you.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={19} kicker="FAQs" title="Common questions">
        <h3>Can my landlord increase the rent during a fixed term?</h3>
        <p>In England fixed terms no longer exist for private tenancies: all are periodic, and rises use section 13 once a year.</p>
        <h3>Does the rule apply to council and housing association homes?</h3>
        <p>Social landlords have their own rent rules, usually a yearly rise in April set by government policy.</p>
        <h3>What if I pay the new rent by mistake?</h3>
        <p>Paying the new amount can be taken as accepting it. Get advice quickly if you think the notice was not valid.</p>
        <h3>Can the landlord put the rent up when a new tenant moves in?</h3>
        <p>Yes. The rules are about existing tenancies. A new tenancy can start at the advertised rent, and in England the Renters&rsquo; Rights Act stops landlords accepting bids above it.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Rent increase rules at a glance"
          head={["Rule", "England", "Wales", "Scotland", "Northern Ireland"]}
          rows={[
            ["Notice", "2 months", "2 months", "3 months", "3 months"],
            ["How often", "52 weeks", "12 months", "12 months", "12 months"],
            ["Fixed cap", "No", "No", "In rent control areas", "No"],
            ["Challenge", "First-tier Tribunal", "Residential Property Tribunal", "Rent officer", "Advice"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
