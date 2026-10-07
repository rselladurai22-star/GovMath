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

/** Free childcare hours — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "ages", title: "What you get at each age" },
  { id: "work-test", title: "The working parent test" },
  { id: "two-year-olds", title: "15 hours for some 2-year-olds" },
  { id: "stretching", title: "Term time or stretched over the year" },
  { id: "costs", title: "What funded hours do and do not cover" },
  { id: "example", title: "Worked examples" },
  { id: "applying", title: "Applying and the eligibility code" },
  { id: "combining", title: "Combining with other help" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "dates", title: "When the funding starts: examples" },
  { id: "providers", title: "Choosing a provider" },
  { id: "school-age", title: "After your child starts school" },
  { id: "monthly", title: "A monthly view of the cost" },
  { id: "send", title: "Children with special educational needs" },
  { id: "changes", title: "If your work or income changes" },
  { id: "myths", title: "Common misunderstandings" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Childcare Choices", href: "https://www.childcarechoices.gov.uk/" },
  { label: "GOV.UK — 30 hours free childcare", href: "https://www.gov.uk/30-hours-free-childcare" },
  { label: "GOV.UK — Free childcare for working parents: eligibility", href: "https://www.gov.uk/free-childcare-if-working" },
  { label: "GOV.UK — Help paying for childcare: 2-year-olds", href: "https://www.gov.uk/help-with-childcare-costs/free-childcare-2-year-olds" },
  { label: "GOV.UK — Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
];

export default function FreeHoursGuide() {
  return (
    <Guide
      kicker="The free childcare guide"
      title="Free childcare hours in England"
      intro={
        <>
          Since September 2025, working parents in England can get 30 hours a week of funded childcare from the age of 9 months
          until their child starts school. Every 3 and 4-year-old gets at least 15 hours. This guide explains who qualifies,
          what the hours really cover, how stretching works and how to combine them with Tax-Free Childcare.
        </>
      }
      meta={["England, 2026/27", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Working parents: <strong>30 hours a week</strong> for children aged 9 months to school age.</li>
          <li>All 3 and 4-year-olds: <strong>15 hours a week</strong>, whatever their parents do.</li>
          <li>Some 2-year-olds in families getting certain benefits: <strong>15 hours a week</strong>.</li>
          <li>Hours are for 38 weeks a year, or fewer hours a week spread over more weeks.</li>
        </ul>
        <KeyStats
          items={[
            { value: "1,140", label: "Funded hours a year at 30 hours" },
            { value: "570", label: "Funded hours a year at 15 hours" },
            { value: "£203.36", label: "Minimum weekly earnings for each parent" },
            { value: "£100,000", label: "Income limit for each parent" },
          ]}
        />
      </GuideSection>

      <GuideSection id="ages" n={2} kicker="Entitlement" title="What you get at each age">
        <DataTable
          caption="Funded hours in England from September 2025"
          head={["Child's age", "Working parents", "Other families"]}
          rows={[
            ["Under 9 months", "None", "None"],
            ["9 months to 2 years", "30 hours", "None"],
            ["2 years", "30 hours", "15 hours if on certain benefits"],
            ["3 and 4 years", "30 hours", "15 hours for everyone"],
          ]}
        />
        <p>
          Funding starts the term after your child reaches the age, on 1 January, 1 April or 1 September. A child born in
          October turns 9 months in July, so the funded hours start on 1 September. They continue until the child starts
          reception class, usually the September after their fourth birthday.
        </p>
      </GuideSection>

      <GuideSection id="work-test" n={3} kicker="Eligibility" title="The working parent test">
        <p>
          In a two-parent household, <strong>both</strong> parents must meet the test; a single parent must meet it alone. Each
          parent must expect, over the next three months, to:
        </p>
        <ul>
          <li>
            earn on average at least 16 hours a week at their National Minimum or Living Wage: <strong>£203.36</strong> a week for
            those aged 21 and over, £173.60 for 18 to 20-year-olds and £128 for under-18s and apprentices;
          </li>
          <li>
            have adjusted net income of <strong>£100,000 or less</strong> in the tax year.
          </li>
        </ul>
        <p>
          The self-employed can use expected profit, and new businesses are exempt from the minimum earnings test for their
          first year. Parents on maternity, paternity, <a href="/benefits/adoption-pay">adoption</a>{" "}or sick leave still count as working. If one parent cannot work
          because they are disabled, have caring responsibilities or get certain benefits, the other parent can still qualify.
        </p>
        <Callout tone="warn" title="The £100,000 cliff edge">
          If either parent&rsquo;s adjusted net income goes over £100,000, the household loses the working parent hours
          entirely. A pension contribution or Gift Aid can bring income back under the limit and keep thousands of pounds of
          funding.
        </Callout>
      </GuideSection>

      <GuideSection id="two-year-olds" n={4} kicker="Targeted help" title="15 hours for some 2-year-olds">
        <p>
          Two-year-olds can get 15 hours a week, whatever their parents&rsquo; work, if the family gets certain support,
          including:
        </p>
        <ul>
          <li><a href="/benefits/universal-credit">Universal Credit</a>{" "}with household take-home earnings of £15,400 a year or less;</li>
          <li>income-based Jobseeker&rsquo;s Allowance, income-related ESA or Income Support;</li>
          <li>some support for people with no recourse to public funds.</li>
        </ul>
        <p>
          Children who are looked after by the council, have an education, health and care plan, get Disability Living
          Allowance, or have left care through adoption or a special guardianship order also qualify. Apply through your local
          council.
        </p>
      </GuideSection>

      <GuideSection id="stretching" n={5} kicker="Using the hours" title="Term time or stretched over the year">
        <p>
          The entitlement is a number of hours a year: <strong>1,140</strong> for 30 hours and <strong>570</strong> for 15 hours.
          Nurseries open all year often spread them over more weeks.
        </p>
        <CompareCards
          columns={[
            {
              name: "Term time only",
              rows: [
                { label: "Weeks", value: "38" },
                { label: "Funded hours a week", value: "30" },
                { label: "Best for", value: "Pre-schools, school nurseries" },
              ],
            },
            {
              name: "Stretched",
              rows: [
                { label: "Weeks", value: "48" },
                { label: "Funded hours a week", value: "About 23.75" },
                { label: "Best for", value: "Year-round nurseries, childminders" },
              ],
            },
          ]}
        />
        <p>
          Not every provider offers stretching, and some limit which sessions are funded. Ask how they apply the hours before you
          accept a place.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={6} kicker="The small print" title="What funded hours do and do not cover">
        <p>
          The hours are free at the point of use: a provider cannot charge a top-up fee for them. Providers can, though, charge
          for:
        </p>
        <ul>
          <li>meals and snacks;</li>
          <li>consumables such as nappies and sun cream;</li>
          <li>optional activities and trips;</li>
          <li>any hours you use beyond the funded hours.</li>
        </ul>
        <p>
          These charges must be voluntary, or you must be offered a way to bring your own food or supplies. In practice many
          families find that &ldquo;30 free hours&rdquo; still comes with a monthly bill.
        </p>
      </GuideSection>

      <GuideSection id="example" n={7} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="A 3-year-old, 40 hours a week, 48 weeks, £8.50 an hour, working parents"
          steps={[
            { label: "Childcare used: 1,920 hours", value: "£16,320" },
            { label: "Funded hours: 1,140 × £8.50", value: "−£9,690" },
            { label: "Left to pay", value: "£6,630" },
            { label: "Tax-Free Childcare: 20% of £6,630", value: "−£1,326" },
          ]}
          total={{ label: "You pay a year", value: "£5,304" }}
        />
        <p>
          Without the working parent hours, the same child would get the universal 570 hours, worth £4,845, leaving £11,475 to
          pay. The working test is worth about £4,845 a year here, before Tax-Free Childcare.
        </p>
        <WorkedExample
          title="A 1-year-old, 30 hours a week, 51 weeks, £9.50 an hour, working parents"
          steps={[
            { label: "Childcare used: 1,530 hours", value: "£14,535" },
            { label: "Funded hours: 1,140 × £9.50", value: "−£10,830" },
          ]}
          total={{ label: "Left to pay before Tax-Free Childcare", value: "£3,705" }}
        />
        <p>
          A family using 30 hours a week in term time only, 38 weeks a year, pays nothing for the hours themselves, apart from
          any meals or consumables.
        </p>
      </GuideSection>

      <GuideSection id="applying" n={8} kicker="How to apply" title="Applying and the eligibility code">
        <Timeline
          items={[
            { when: "Term before", what: "Apply online", detail: "Through the government childcare service. Apply by 31 August, 31 December or 31 March to start the following term." },
            { when: "After applying", what: "Get your code", detail: "You get an 11-digit code to give to your provider with your National Insurance number and your child's date of birth." },
            { when: "Every 3 months", what: "Reconfirm your details", detail: "Log in and confirm you still meet the work and income tests. You get reminders by email." },
          ]}
        />
        <p>
          If you stop meeting the test, you usually keep the hours until the end of a short grace period, which lets you find
          work again or adjust childcare. The universal 15 hours for 3 and 4-year-olds are claimed directly through your provider
          without a code.
        </p>
      </GuideSection>

      <GuideSection id="combining" n={9} kicker="More help" title="Combining with other help">
        <ul>
          <li>
            <strong>Tax-Free Childcare:</strong> can be used alongside funded hours to pay for extra hours, meals and holiday
            clubs. The government adds 20%, up to £2,000 a year per child. See the{" "}
            <a href="/benefits/tax-free-childcare">Tax-Free Childcare calculator</a>.
          </li>
          <li>
            <strong>Universal Credit <a href="/benefits/childcare-costs">childcare costs</a>:</strong> UC can repay up to 85% of what you pay for childcare. You cannot
            use Tax-Free Childcare at the same time, but you can use funded hours with either.
          </li>
          <li>
            <strong>Employer schemes:</strong> some employers offer workplace nurseries or older childcare voucher schemes.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="nations" n={10} kicker="Elsewhere" title="Scotland, Wales and Northern Ireland">
        <p>
          <strong>Scotland:</strong>{" "}all 3 and 4-year-olds, and eligible 2-year-olds, get 1,140 hours a year of funded early
          learning and childcare, regardless of their parents&rsquo; work.
        </p>
        <p>
          <strong>Wales:</strong> 3 and 4-year-olds get early education, and working parents can claim up to 30 hours a week in
          total through the Childcare Offer for Wales. Flying Start supports some younger children.
        </p>
        <p>
          <strong>Northern Ireland:</strong> a pre-school place is offered in the year before school, and a separate childcare
          subsidy scheme helps working families.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={11} kicker="Timing" title="When the funding starts: examples">
        <DataTable
          caption="Working parent hours start dates"
          head={["Child's birthday", "Turns 9 months", "Funded hours start", "Apply by"]}
          rows={[
            ["15 October 2025", "15 July 2026", "1 September 2026", "31 August 2026"],
            ["10 February 2026", "10 November 2026", "1 January 2027", "31 December 2026"],
            ["20 May 2026", "20 February 2027", "1 April 2027", "31 March 2027"],
          ]}
        />
        <p>
          Apply early: the code can be issued up to 16 weeks before you are eligible, and many nurseries need it before they
          confirm a funded place. The same pattern applies when a child turns 3 and moves on to the universal hours.
        </p>
      </GuideSection>

      <GuideSection id="providers" n={12} kicker="Choosing childcare" title="Choosing a provider">
        <p>Funded hours can be used at any provider that is registered and offers funded places, including:</p>
        <ul>
          <li>day nurseries and pre-schools;</li>
          <li>nursery classes in schools;</li>
          <li>registered childminders.</li>
        </ul>
        <p>Before you sign up, ask:</p>
        <ul>
          <li>How are the funded hours applied: term time only, or stretched?</li>
          <li>Which sessions are funded, and can you choose the days?</li>
          <li>What do meals, nappies and other extras cost, and are they optional?</li>
          <li>What is the rate for hours above the funded hours?</li>
          <li>Do they accept Tax-Free Childcare payments?</li>
        </ul>
        <p>
          Comparing the total yearly cost, not just the <a href="/tax-and-salary/hourly-to-salary">hourly rate</a>, gives a truer picture. A nursery with a lower hourly rate
          but a high daily charge for meals can work out dearer.
        </p>
      </GuideSection>

      <GuideSection id="school-age" n={13} kicker="Older children" title="After your child starts school">
        <p>
          Funded hours stop when your child starts reception class. For school-age children, help with childcare costs comes
          from:
        </p>
        <ul>
          <li>Tax-Free Childcare, until the September after they turn 11 (16 if disabled);</li>
          <li>Universal Credit childcare costs, if you claim UC;</li>
          <li>breakfast and after-school clubs, which many primary schools in England are expanding.</li>
        </ul>
        <p>
          Holiday clubs are often the biggest cost for working parents of school-age children. Paying for them through
          Tax-Free Childcare saves 20%.
        </p>
      </GuideSection>

      <GuideSection id="monthly" n={14} kicker="Budgeting" title="A monthly view of the cost">
        <p>
          Most nurseries bill monthly, often spreading a year&rsquo;s fees over 12 equal payments. For a 3-year-old in nursery
          40 hours a week for 48 weeks at £8.50 an hour:
        </p>
        <DataTable
          caption="Yearly and monthly cost, England, 2026/27"
          head={["Situation", "A year", "A month"]}
          numeric={[1, 2]}
          rows={[
            ["No funded hours", "£16,320", "£1,360"],
            ["Universal 15 hours only", "£11,475", "£956"],
            ["Working parent 30 hours", "£6,630", "£553"],
            ["30 hours plus Tax-Free Childcare", "£5,304", "£442"],
          ]}
        />
        <p>
          The difference between the universal hours and the working parent hours is worth about £400 a month here, which is
          why the earnings and income tests matter so much.
        </p>
      </GuideSection>

      <GuideSection id="send" n={15} kicker="Extra support" title="Children with special educational needs">
        <p>
          Children with special educational needs or disabilities get the same funded hours, and providers must make reasonable
          adjustments so they can use them. Councils have extra funding to help:
        </p>
        <ul>
          <li>the Disability Access Fund, a yearly payment to the provider for 3 and 4-year-olds who get Disability Living Allowance;</li>
          <li>a special educational needs inclusion fund, to support children with lower-level needs;</li>
          <li>the 2-year-old offer, open to any 2-year-old who gets Disability Living Allowance or has an education, health and care plan.</li>
        </ul>
        <p>Speak to your provider and your council&rsquo;s family information service about what is available locally.</p>
      </GuideSection>

      <GuideSection id="changes" n={16} kicker="Keeping the hours" title="If your work or income changes">
        <p>
          If you stop meeting the working parent test, for example after losing a job, you do not lose the place straight away.
          A grace period lets you keep the funded hours for a time, usually until the end of the following term, while you find
          work or rearrange childcare.
        </p>
        <p>
          If a parent&rsquo;s income rises above £100,000 because of a bonus or promotion, the household stops qualifying from
          the next reconfirmation. A pension contribution or Gift Aid donation made in the same tax year can bring adjusted net
          income back down.
        </p>
      </GuideSection>

      <GuideSection id="myths" n={17} kicker="Clearing up" title="Common misunderstandings">
        <ul>
          <li><strong>&ldquo;30 hours means 30 hours every week of the year.&rdquo;</strong> It is 1,140 hours a year, usually 38 weeks.</li>
          <li><strong>&ldquo;It is means-tested on household income.&rdquo;</strong> Each parent is tested separately, with a £100,000 limit each.</li>
          <li><strong>&ldquo;Part-time workers cannot qualify.&rdquo;</strong> 16 hours a week at <a href="/tax-and-salary/minimum-wage">minimum wage</a>{" "}is enough.</li>
          <li><strong>&ldquo;It is automatic.&rdquo;</strong> The working parent hours need an application and a code.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "30 hours", label: "Working parents, 9 months to school" },
            { value: "15 hours", label: "All 3 and 4-year-olds" },
            { value: "1,140", label: "Funded hours a year at 30 hours" },
            { value: "38 weeks", label: "Standard funded year" },
            { value: "£203.36", label: "Weekly earnings needed, age 21+" },
            { value: "£100,000", label: "Adjusted net income limit" },
            { value: "3 months", label: "How often you reconfirm" },
            { value: "£15,400", label: "UC earnings limit for the 2-year-old offer" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
