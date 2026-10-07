import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Benefits eligibility checker — the guide. Figures from src/lib/benefits/eligibility.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the checker works" },
  { id: "means-tested", title: "Means-tested and non-means-tested help" },
  { id: "working-age", title: "Help for working-age households" },
  { id: "pension-age", title: "Help at State Pension age" },
  { id: "families", title: "Help for families" },
  { id: "disability", title: "Help for disability and caring" },
  { id: "examples", title: "Worked examples" },
  { id: "unclaimed", title: "Why so much goes unclaimed" },
  { id: "passports", title: "Benefits that unlock other help" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "next", title: "What to do next" },
  { id: "couples", title: "Couples and mixed-age couples" },
  { id: "changes", title: "When your situation changes" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "evidence", title: "What to have ready" },
  { id: "scams", title: "Beware of benefit scams" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Benefits: check what you might get", href: "https://www.gov.uk/check-benefits-financial-support" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Universal Credit", href: "https://www.gov.uk/universal-credit" },
  { label: "GOV.UK — Pension Credit", href: "https://www.gov.uk/pension-credit" },
  { label: "GOV.UK — Warm Home Discount Scheme", href: "https://www.gov.uk/the-warm-home-discount-scheme" },
  { label: "GOV.UK — Winter Fuel Payment", href: "https://www.gov.uk/winter-fuel-payment" },
];

export default function CheckerGuide() {
  return (
    <Guide
      kicker="The benefits checker guide"
      title="What benefits can I get in 2026/27?"
      intro={
        <>
          Billions of pounds of benefits go unclaimed every year, mostly because people do not know they qualify. This checker takes one set of
          answers about your household and runs them through our calculators for Universal Credit, Pension Credit, Child Benefit and the rest,
          then sorts what you could get into likely, worth checking and probably not. This guide explains each kind of help and how they fit
          together.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Working-age households on a low income claim <strong>Universal Credit</strong>; pensioners claim <strong>Pension Credit</strong>.</li>
          <li>Both open the door to more help: Council Tax Reduction, the £150 Warm Home Discount, <a href="/life/nhs-prescription-saver">free prescriptions</a>{" "}and more.</li>
          <li><strong>Child Benefit</strong>, <strong>PIP</strong>, <strong><a href="/benefits/attendance-allowance">Attendance Allowance</a></strong> and <strong>Carer&rsquo;s Allowance</strong> are not affected by savings.</li>
          <li>The checker is a first look. Use the linked calculator for each benefit before you claim.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£424.90", label: "UC standard allowance, single 25+, a month" },
            { value: "£238.00", label: "Pension Credit guarantee, single, a week" },
            { value: "£27.05", label: "Child Benefit, first child, a week" },
            { value: "£16,000", label: "Savings limit for Universal Credit" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How the checker works">
        <p>
          You answer a short list of questions: who lives with you, your home, your income and savings, and whether health or caring affects you.
          The checker then works out:
        </p>
        <ul>
          <li>Universal Credit with the same engine as our <a href="/benefits/universal-credit">Universal Credit calculator</a>, or Pension Credit with the <a href="/benefits/pension-credit">Pension Credit calculator</a>&rsquo;s;</li>
          <li>Child Benefit, Healthy Start and the <a href="/benefits/sure-start-maternity-grant">Sure Start Maternity Grant</a>{" "}from their 2026/27 rates;</li>
          <li>which other help depends on an assessment or details it has not asked, such as PIP, Carer&rsquo;s Allowance and <a href="/benefits/new-style-jsa">New Style JSA</a>.</li>
        </ul>
        <p>
          It assumes your rent is within the Local Housing Allowance for your area. If it is higher, Universal Credit covers less; check with the{" "}
          <a href="/benefits/local-housing-allowance">Local Housing Allowance calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="means-tested" n={3} kicker="Two kinds" title="Means-tested and non-means-tested help">
        <CompareCards
          columns={[
            {
              name: "Means-tested",
              rows: [
                { label: "Examples", value: "Universal Credit, Pension Credit, Housing Benefit, Council Tax Reduction" },
                { label: "Depends on", value: "Household income and savings" },
                { label: "Partner's income", value: "Counts" },
              ],
            },
            {
              name: "Not means-tested",
              rows: [
                { label: "Examples", value: "Child Benefit, PIP, Attendance Allowance, Carer's Allowance, New Style JSA and ESA" },
                { label: "Depends on", value: "Your needs, children or National Insurance" },
                { label: "Partner's income", value: "Does not count (except the Child Benefit charge)" },
              ],
            },
          ]}
        />
        <p>
          Many people assume that owning a home, having some savings or working rules them out. Often it does not: Universal Credit can be paid to
          working households, Pension Credit ignores the first £10,000 of savings, and the non-means-tested benefits ignore savings altogether.
        </p>
      </GuideSection>

      <GuideSection id="working-age" n={4} kicker="Working age" title="Help for working-age households">
        <ul>
          <li>
            <strong>Universal Credit</strong> combines a standard allowance with extra for children, rent, disability, caring and childcare, then
            reduces by 55p for every pound of take-home pay above any work allowance. Savings over £16,000 rule it out.
          </li>
          <li><strong>New Style JSA and ESA</strong> pay a flat amount based on your <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}record, whatever your savings.</li>
          <li><strong><a href="/benefits/council-tax-reduction">Council Tax Reduction</a></strong> comes from your council and can cut your bill substantially.</li>
        </ul>
      </GuideSection>

      <GuideSection id="pension-age" n={5} kicker="Pensioners" title="Help at State Pension age">
        <ul>
          <li>
            <strong>Pension Credit</strong> tops weekly income up to £238.00 for a single person or £363.25 for a couple in 2026/27. Even a small
            award unlocks maximum Housing Benefit, Council Tax Reduction and a free TV licence for over-75s.
          </li>
          <li><strong>Housing Benefit</strong> is still how pensioners get help with rent.</li>
          <li><strong>Winter Fuel Payment</strong> of £200, or £300 at 80 or over, is paid automatically; it is taken back through tax if your income is over £35,000.</li>
          <li><strong>Attendance Allowance</strong> helps with care needs, whatever your income.</li>
        </ul>
      </GuideSection>

      <GuideSection id="families" n={6} kicker="Families" title="Help for families">
        <ul>
          <li><strong>Child Benefit:</strong> £27.05 a week for the first child and £17.90 for each other child. If the highest earner has income over £60,000, some is taken back.</li>
          <li><strong>Universal Credit child element:</strong> for every child since the two-child limit ended in April 2026.</li>
          <li><strong>Funded childcare hours</strong> in England from 9 months for working parents, and 15 hours for every 3 and 4-year-old.</li>
          <li><strong>Tax-Free Childcare</strong> adds £2 for every £8 you pay, up to £2,000 a child a year, if you work and are not on Universal Credit.</li>
          <li><strong>Healthy Start</strong> and the <strong>Sure Start Maternity Grant</strong> for low-income families with a baby or young child.</li>
        </ul>
      </GuideSection>

      <GuideSection id="disability" n={7} kicker="Health and caring" title="Help for disability and caring">
        <ul>
          <li><strong>PIP</strong> (working age): from £30.30 to £194.60 a week, depending on points scored for daily living and mobility.</li>
          <li><strong>Attendance Allowance</strong> (pension age): £76.70 or £114.60 a week.</li>
          <li><strong>Carer&rsquo;s Allowance:</strong> £86.45 a week if you care 35 hours or more and earn no more than £204 a week.</li>
          <li><strong>Universal Credit health and carer elements</strong> add to the award if you are on Universal Credit.</li>
        </ul>
        <Callout title="These do not reduce each other">
          PIP and Attendance Allowance are not counted as income for Universal Credit or Pension Credit, and they can add to them, for example
          through the severe disability addition or by making a carer eligible.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={8} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Couple with two children (youngest 2), council tenants, rent £550, take-home £1,800 a month"
          steps={[
            { label: "Universal Credit", value: "£1,069.70 a month" },
            { label: "Child Benefit", value: "£194.78 a month" },
            { label: "Council Tax Reduction", value: "Likely" },
            { label: "Warm Home Discount", value: "£150 a year" },
          ]}
          total={{ label: "Likely help a month", value: "£1,264.48" }}
        />
        <WorkedExample
          title="Single pensioner renting from the council at £450, income £800 a month, savings £5,000"
          steps={[
            { label: "Pension Credit", value: "£53.38 a week (£231.33 a month)" },
            { label: "Housing Benefit", value: "Full rent, £450 a month" },
            { label: "Council Tax Reduction", value: "Likely" },
            { label: "Winter Fuel Payment and Warm Home Discount", value: "£350 a year" },
          ]}
          total={{ label: "Likely help a month", value: "£681.33" }}
        />
      </GuideSection>

      <GuideSection id="unclaimed" n={9} kicker="Take-up" title="Why so much goes unclaimed">
        <p>
          Government estimates suggest hundreds of thousands of pensioners who could get Pension Credit do not claim it, and many working families
          miss Universal Credit or Tax-Free Childcare. The common reasons are thinking you earn too much, owning your home, having some savings or
          not wanting to ask. A ten-minute check can be worth thousands of pounds a year.
        </p>
      </GuideSection>

      <GuideSection id="passports" n={10} kicker="Gateways" title="Benefits that unlock other help">
        <p>Getting Universal Credit or Pension Credit often brings other help automatically or on request:</p>
        <ul>
          <li>Council Tax Reduction and the Warm Home Discount;</li>
          <li>free prescriptions, dental treatment and eye tests (with income limits on Universal Credit);</li>
          <li>Healthy Start, free school meals and the Sure Start Maternity Grant;</li>
          <li>social tariffs for broadband and water, and the Household Support Fund from your council;</li>
          <li>cheaper travel and leisure in many areas.</li>
        </ul>
      </GuideSection>

      <GuideSection id="nations" n={11} kicker="Where you live" title="Scotland, Wales and Northern Ireland">
        <p>
          Universal Credit, Pension Credit and Child Benefit are UK-wide. Scotland replaces several benefits with its own: the Scottish Child
          Payment, Best Start Grants instead of the Sure Start Maternity Grant, Adult Disability Payment instead of PIP, Pension Age Disability
          Payment instead of Attendance Allowance, and Carer Support Payment. Funded childcare hours differ in Scotland, Wales and Northern Ireland.
          The checker uses the rules for England.
        </p>
      </GuideSection>

      <GuideSection id="next" n={12} kicker="Action" title="What to do next">
        <ol>
          <li>Open the calculator for each likely benefit to get a fuller estimate.</li>
          <li>Claim the main benefit first: Universal Credit or Pension Credit.</li>
          <li>Apply for the others; many need a separate claim.</li>
          <li>Ask for free advice from Citizens Advice, Turn2us or your council&rsquo;s welfare rights service if anything is unclear.</li>
        </ol>
      </GuideSection>

      <GuideSection id="couples" n={13} kicker="Couples" title="Couples and mixed-age couples">
        <p>
          Benefits are worked out for the household. If you live with a partner you claim Universal Credit or Pension Credit together,
          and both your incomes and savings count. Non-means-tested help, such as PIP or Carer&rsquo;s Allowance, is claimed by the person
          it is for.
        </p>
        <p>
          Where one partner has reached State Pension age and the other has not, the couple is a mixed-age couple. Since May 2019 they
          usually claim Universal Credit, not Pension Credit, until the younger partner reaches State Pension age. Couples already
          getting Pension Credit or pension-age Housing Benefit before then keep it while they stay entitled. The checker treats you as
          pension age only if you both are.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={14} kicker="Changes" title="When your situation changes">
        <p>
          Entitlement can change quickly. Run the checker again, and tell the DWP, HMRC or your council, if:
        </p>
        <ul>
          <li>you or your partner start or stop work, or your hours or pay change;</li>
          <li>a baby is born, a child leaves school or a child moves in or out;</li>
          <li>you move home, or your rent changes;</li>
          <li>someone becomes ill or disabled, or starts caring for someone;</li>
          <li>you reach State Pension age;</li>
          <li>your savings go above or below £6,000 or £16,000.</li>
        </ul>
        <p>
          Reporting promptly avoids overpayments, which have to be paid back, and makes sure you get any increase from the right date.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={15} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Assuming a job rules you out.</strong> Universal Credit tops up low pay, and many families with two earners still get some.</li>
          <li><strong>Counting your home as savings.</strong> The home you live in is ignored for every benefit here.</li>
          <li><strong>Missing Pension Credit.</strong> Even a small award is worth claiming for the help it unlocks.</li>
          <li><strong>Not claiming PIP or Attendance Allowance.</strong> They are not means-tested, and can increase other benefits.</li>
          <li><strong>Leaving it late.</strong> Most benefits are paid from the date you claim, so every week of delay is money lost.</li>
        </ul>
      </GuideSection>

      <GuideSection id="evidence" n={16} kicker="Preparing" title="What to have ready">
        <ul>
          <li>National Insurance numbers for you and your partner;</li>
          <li>recent payslips, or your business records if self-employed;</li>
          <li>bank statements and details of savings and investments;</li>
          <li>your tenancy agreement and rent, or mortgage details;</li>
          <li>childcare invoices, if you pay for registered childcare.</li>
        </ul>
      </GuideSection>

      <GuideSection id="scams" n={17} kicker="Safety" title="Beware of benefit scams">
        <p>
          You never have to pay anyone to claim a benefit. The DWP, HMRC and councils do not charge for claims or ask for your bank PIN. Be wary of
          social media posts promising cost of living payments or grants if you click a link, and of anyone offering to make a claim for you in return
          for a fee or your login details. Claim through GOV.UK, your council, or with help from a free advice service.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Main rates used by the checker, 2026/27"
          head={["Help", "Rate"]}
          rows={[
            ["Universal Credit, single 25 or over", "£424.90 a month"],
            ["Universal Credit, couple 25 or over", "£666.97 a month"],
            ["Pension Credit guarantee", "£238.00 single, £363.25 couple, a week"],
            ["Child Benefit", "£27.05 first child, £17.90 others, a week"],
            ["Carer's Allowance", "£86.45 a week"],
            ["Sure Start Maternity Grant", "£500 once"],
            ["Warm Home Discount", "£150 a year"],
            ["Winter Fuel Payment", "£200, or £300 at 80 or over"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
