import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Childcare costs — the guide. Figures from src/lib/benefits/families.ts (England, 2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "three-kinds", title: "Three kinds of help" },
  { id: "funded-hours", title: "Funded hours in England" },
  { id: "tfc", title: "Tax-Free Childcare" },
  { id: "uc", title: "Universal Credit childcare" },
  { id: "which", title: "Tax-Free Childcare or Universal Credit?" },
  { id: "examples", title: "Worked examples" },
  { id: "babies", title: "Before 9 months" },
  { id: "school-age", title: "School-age children" },
  { id: "hidden", title: "Extras and hidden costs" },
  { id: "salary-sacrifice", title: "Workplace schemes and older vouchers" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "timeline", title: "When to apply" },
  { id: "providers", title: "Nurseries, childminders and nannies" },
  { id: "couples", title: "Separated parents and couples" },
  { id: "reduce", title: "Ways to bring the bill down" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Childcare Choices", href: "https://www.childcarechoices.gov.uk/" },
  { label: "GOV.UK — 30 hours free childcare", href: "https://www.gov.uk/30-hours-free-childcare" },
  { label: "GOV.UK — Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
  { label: "GOV.UK — Universal Credit and childcare", href: "https://www.gov.uk/universal-credit-childcare-costs" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
];

export default function ChildcareGuide() {
  return (
    <Guide
      kicker="The childcare costs guide"
      title="What childcare really costs after the help you can get"
      intro={
        <>
          Childcare is one of the biggest bills a working family faces, but very few parents pay the full price. In England, <a href="/benefits/free-childcare-hours">funded hours</a>,
          Tax-Free Childcare and Universal Credit can each take a large share off the bill, and choosing the right combination can be worth
          thousands of pounds a year. This guide explains each kind of help, who gets it, and how to work out what you will actually pay.
        </>
      }
      meta={["England, 2026/27", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Working parents in England get <strong>30 funded hours a week</strong>, for 38 weeks a year, from the term after a child turns 9 months until they start school.</li>
          <li>Every 3 and 4-year-old gets <strong>15 hours</strong>, whether or not the parents work.</li>
          <li><strong><a href="/benefits/tax-free-childcare">Tax-Free Childcare</a></strong> adds £2 for every £8 you pay, up to £2,000 a child a year.</li>
          <li><strong>Universal Credit</strong> pays back 85% of costs, up to £1,071.09 a month for one child or £1,836.16 for two or more.</li>
          <li>You can have funded hours with either, but not Tax-Free Childcare and Universal Credit together.</li>
        </ul>
        <KeyStats
          items={[
            { value: "30 hours", label: "Funded a week for working parents" },
            { value: "1,140", label: "Funded hours a year" },
            { value: "£2,000", label: "Tax-Free Childcare a child a year" },
            { value: "85%", label: "Universal Credit refund" },
          ]}
        />
      </GuideSection>

      <GuideSection id="three-kinds" n={2} kicker="Overview" title="Three kinds of help">
        <CompareCards
          columns={[
            {
              name: "Funded hours",
              rows: [
                { label: "What", value: "Hours paid straight to the provider" },
                { label: "Ages", value: "9 months to school" },
                { label: "Work test", value: "For 30 hours, yes" },
              ],
            },
            {
              name: "Tax-Free Childcare",
              rows: [
                { label: "What", value: "20% top-up on what you pay" },
                { label: "Ages", value: "Up to 11 (16 if disabled)" },
                { label: "Work test", value: "Yes" },
              ],
            },
            {
              name: "Universal Credit",
              rows: [
                { label: "What", value: "85% of costs refunded" },
                { label: "Ages", value: "Up to 16" },
                { label: "Work test", value: "Any paid work" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="funded-hours" n={3} kicker="Funded hours" title="Funded hours in England">
        <p>
          Since September 2025, working parents in England can get 30 funded hours a week for children from 9 months old until they start
          reception. Every 3 and 4-year-old also gets 15 universal hours, and some 2-year-olds get 15 hours if the family gets certain benefits or
          is on a low income.
        </p>
        <p>
          To count as working, each parent must expect to earn at least 16 hours a week at their <a href="/tax-and-salary/minimum-wage">minimum wage</a>{" "}over the next three months (about
          £203 a week at the National Living Wage of £12.71), and neither can have adjusted net income over £100,000. You reconfirm every three
          months.
        </p>
        <Callout title="Hours, not money">
          Funded hours are 30 hours for 38 weeks: 1,140 hours a year. Many nurseries stretch them over 48 to 51 weeks, giving about 22 to 24
          hours a week. The value to you depends on your provider&rsquo;s <a href="/tax-and-salary/hourly-to-salary">hourly rate</a>.
        </Callout>
      </GuideSection>

      <GuideSection id="tfc" n={4} kicker="Top-up" title="Tax-Free Childcare">
        <p>
          You open an online childcare account and pay in. For every £8 you pay, the government adds £2, up to £500 every three months for
          each child (£2,000 a year), or £1,000 a quarter (£4,000 a year) for a disabled child. You then pay your registered provider from the
          account. To get the full £2,000 you need to spend £8,000 a year on a child&rsquo;s childcare, after funded hours.
        </p>
        <p>
          It is for children up to 11, or 16 if disabled, and has the same work and £100,000 income tests as the 30 hours. You cannot get it while
          you or your partner claim Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={5} kicker="Universal Credit" title="Universal Credit childcare">
        <p>
          If you get Universal Credit and you work (any amount, and both partners in a couple), Universal Credit includes 85% of your childcare
          costs, up to £1,071.09 a month for one child or £1,836.16 for two or more in 2026/27. You report what you paid each month with proof, and
          the DWP can now pay upfront costs such as a deposit or the first month&rsquo;s fees before you start work.
        </p>
        <p>
          Because Universal Credit is tapered as your earnings rise, the childcare element can be paid even on fairly good earnings when childcare
          costs are high. Try the <a href="/benefits/universal-credit">Universal Credit calculator</a> with your costs included.
        </p>
      </GuideSection>

      <GuideSection id="which" n={6} kicker="Choosing" title="Tax-Free Childcare or Universal Credit?">
        <p>
          If you are entitled to Universal Credit, its 85% usually beats Tax-Free Childcare&rsquo;s 20% by a wide margin. But if your income is
          close to the point where Universal Credit stops, you might get only a small award, and Tax-Free Childcare could be worth more. Work out
          both: the calculator shows each side by side. You can switch from one to the other, but you must close your Tax-Free Childcare account
          when you claim Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={7} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="One child aged 3, 40 hours a week, 48 weeks, £7 an hour"
          steps={[
            { label: "Full cost", value: "£13,440" },
            { label: "30 funded hours (1,140 hours × £7)", value: "− £7,980" },
            { label: "Left to pay", value: "£5,460" },
            { label: "Tax-Free Childcare (20%)", value: "− £1,092" },
          ]}
          total={{ label: "You pay a year (£364 a month)", value: "£4,368" }}
        />
        <p>On Universal Credit, the same family would get £4,641 back and pay £819 a year.</p>
        <WorkedExample
          title="One child aged 18 months, 50 hours a week, 51 weeks, £8.50 an hour"
          steps={[
            { label: "Full cost", value: "£21,675" },
            { label: "30 funded hours", value: "− £9,690" },
            { label: "Left to pay", value: "£11,985" },
            { label: "Tax-Free Childcare, capped", value: "− £2,000" },
          ]}
          total={{ label: "You pay a year", value: "£9,985" }}
        />
        <p>With Universal Credit instead of Tax-Free Childcare, 85% of £11,985 is £10,187, leaving £1,798 to pay.</p>
      </GuideSection>

      <GuideSection id="babies" n={8} kicker="Babies" title="Before 9 months">
        <p>
          There are no funded hours for babies under 9 months, so this is often the most expensive time. Full-time nursery for a baby at £8.50 an
          hour for 50 hours a week over 51 weeks costs £21,675. Tax-Free Childcare takes off at most £2,000, leaving £19,675; Universal Credit
          can pay up to £12,853 a year for one child. Many parents time the return to work with the funded hours, or use <a href="/benefits/shared-parental-leave">shared parental leave</a>{" "}to
          cover the gap.
        </p>
      </GuideSection>

      <GuideSection id="school-age" n={9} kicker="Older children" title="School-age children">
        <p>
          Once a child is in school there are no funded hours, but breakfast clubs, after-school clubs, holiday clubs and childminders can all be
          paid through Tax-Free Childcare (until 11) or Universal Credit (until 16), as long as they are registered. Free breakfast clubs are being
          rolled out in state primary schools in England from 2025, which can cut the cost of early starts.
        </p>
      </GuideSection>

      <GuideSection id="hidden" n={10} kicker="Extras" title="Extras and hidden costs">
        <p>
          Funded hours are meant to be free, but providers can charge for meals, nappies, trips and activities, as long as these are voluntary or
          you can bring your own. Ask for a written breakdown. Other costs to plan for:
        </p>
        <ul>
          <li>registration fees and deposits, often a month&rsquo;s fees;</li>
          <li>fees for <a href="/life/bank-holidays">bank holidays</a>{" "}and closure days in some settings;</li>
          <li>late collection charges;</li>
          <li>the summer holidays, when term-time funding stops.</li>
        </ul>
      </GuideSection>

      <GuideSection id="salary-sacrifice" n={11} kicker="Employers" title="Workplace schemes and older vouchers">
        <p>
          Employer childcare vouchers closed to new joiners in October 2018. If you still get them, you can keep them as long as you stay with the
          same employer, but you cannot have them alongside Tax-Free Childcare. For basic-rate taxpayers with one child, Tax-Free Childcare is
          usually worth more; compare before you switch, as you cannot go back. Some employers also run workplace nurseries, which can be a
          tax-free benefit.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={12} kicker="Where you live" title="Scotland, Wales and Northern Ireland">
        <p>
          Tax-Free Childcare and Universal Credit are UK-wide, but funded hours differ. Scotland gives 1,140 funded hours a year to all 3 and
          4-year-olds and eligible 2-year-olds. Wales offers funded hours to 3 and 4-year-olds of working parents through the Childcare Offer, and
          Flying Start in some areas. Northern Ireland is introducing its own childcare subsidy. The calculator uses England&rsquo;s rules.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={13} kicker="Dates" title="When to apply">
        <Timeline
          items={[
            { when: "By 31 August", what: "Child starts in September", detail: "Get your funded hours code and give it to your provider." },
            { when: "By 31 December", what: "Child starts in January", detail: "Codes must be issued before the term starts." },
            { when: "By 31 March", what: "Child starts in April", detail: "Apply up to 16 weeks before your child turns 9 months." },
            { when: "Every 3 months", what: "Reconfirm", detail: "For working-parent hours and Tax-Free Childcare." },
          ]}
        />
      </GuideSection>

      <GuideSection id="providers" n={14} kicker="Types of care" title="Nurseries, childminders and nannies">
        <p>
          The kind of care you choose affects both the price and the help you can get. Funded hours, Tax-Free Childcare and Universal Credit
          childcare all need a registered provider.
        </p>
        <ul>
          <li><strong>Day nurseries</strong> are usually open 8am to 6pm all year and often the most expensive per hour for under-2s, because staff ratios are higher for babies.</li>
          <li><strong>Childminders</strong> look after a small group in their own home and are often more flexible on hours. Registered childminders can offer funded hours.</li>
          <li><strong>Pre-schools and school nurseries</strong> often run in term time only and may offer funded hours with few or no extra charges.</li>
          <li><strong>Nannies</strong> work in your home. They can be paid through Tax-Free Childcare or Universal Credit only if they are registered with Ofsted (on the voluntary register), and you become their employer.</li>
        </ul>
      </GuideSection>

      <GuideSection id="couples" n={15} kicker="Households" title="Separated parents and couples">
        <p>
          The work test for funded hours and Tax-Free Childcare applies to every parent in the household. If you live with a partner, both of you
          must meet it, unless one is unable to work because of illness, disability or caring and gets certain benefits. Separated parents
          each apply for their own childcare account, based on their own household, and can both pay into a child&rsquo;s account up to the
          same overall limit.
        </p>
        <p>
          For Universal Credit, a couple must both be in work to get the childcare element, unless one partner cannot work for one of the same
          reasons.
        </p>
      </GuideSection>

      <GuideSection id="reduce" n={16} kicker="Saving money" title="Ways to bring the bill down">
        <ul>
          <li>Ask how your provider charges for funded hours: stretched over the year or term time only, and what the extras cost.</li>
          <li>Compare a mix of care, such as a childminder for early starts and a pre-school for funded hours.</li>
          <li>Use holiday clubs run by schools or councils, which are often cheaper than private ones, and check the Holiday Activities and Food programme for children on free school meals.</li>
          <li>If you work for a large employer, ask about workplace nurseries or flexible hours that cut the hours of care you need.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Childcare help in England, 2026/27"
          head={["Help", "Amount"]}
          rows={[
            ["Working-parent funded hours", "30 a week, 38 weeks, from 9 months"],
            ["Universal hours (3 and 4-year-olds)", "15 a week"],
            ["Tax-Free Childcare", "20%, up to £2,000 a child (£4,000 if disabled)"],
            ["Universal Credit childcare", "85%, up to £1,071.09 (1 child) or £1,836.16 (2+) a month"],
            ["Income limit for working-parent help", "£100,000 adjusted net income each"],
            ["Minimum earnings", "16 hours a week at your minimum wage"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
