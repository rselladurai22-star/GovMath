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

/** Tax-Free Childcare — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the top-up works" },
  { id: "limits", title: "The yearly and quarterly limits" },
  { id: "who", title: "Who can get it" },
  { id: "what", title: "What you can pay for" },
  { id: "free-hours", title: "Using it with free childcare hours" },
  { id: "uc", title: "Tax-Free Childcare or Universal Credit?" },
  { id: "vouchers", title: "Childcare vouchers" },
  { id: "account", title: "Opening and running the account" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "examples", title: "Worked examples for families" },
  { id: "quarters", title: "Making the quarterly limit work" },
  { id: "worth", title: "Is it worth the effort?" },
  { id: "self-employed", title: "Self-employed parents" },
  { id: "paying-in", title: "Who can pay in, and getting money out" },
  { id: "compare-schemes", title: "How it fits with the other schemes" },
  { id: "reconfirm", title: "Reconfirming without problems" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
  { label: "GOV.UK — Tax-Free Childcare: what you'll get", href: "https://www.gov.uk/tax-free-childcare/what-youll-get" },
  { label: "GOV.UK — Tax-Free Childcare: eligibility", href: "https://www.gov.uk/tax-free-childcare/eligibility" },
  { label: "GOV.UK — Universal Credit and childcare", href: "https://www.gov.uk/universal-credit/what-youll-get" },
  { label: "GOV.UK — 30 hours free childcare", href: "https://www.gov.uk/30-hours-free-childcare" },
];

export default function TfcGuide() {
  return (
    <Guide
      kicker="The Tax-Free Childcare guide"
      title="Tax-Free Childcare explained"
      intro={
        <>
          Tax-Free Childcare adds £2 for every £8 working parents pay towards registered childcare, up to £2,000 a year for each
          child. It runs across the UK and works alongside free childcare hours. This guide explains the limits, who can use
          it, how it compares with Universal Credit, and how to avoid losing the top-up.
        </>
      }
      meta={["UK-wide, 2026/27", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You pay money into an online childcare account; the government adds <strong>25%</strong> of what you pay in.</li>
          <li>That is <strong>20%</strong> of the total cost of the childcare.</li>
          <li>The top-up is limited to <strong>£2,000 a year</strong> per child, or <strong>£4,000</strong> for a disabled child.</li>
          <li>For children up to 11, or 16 if disabled. Both parents must work and each earn under £100,000.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£2", label: "Added for every £8 you pay in" },
            { value: "£2,000", label: "Most top-up a year per child" },
            { value: "£10,000", label: "Spend for the full top-up" },
            { value: "£4,000", label: "Most top-up for a disabled child" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The maths" title="How the top-up works">
        <WorkedExample
          title="£6,000 of nursery fees for one child"
          steps={[
            { label: "Total childcare cost", value: "£6,000" },
            { label: "You pay in: 80%", value: "£4,800" },
            { label: "Government adds: 25% of £4,800", value: "£1,200" },
          ]}
          total={{ label: "Your saving", value: "£1,200" }}
        />
        <p>
          The top-up is the same whatever your tax rate, which is why it is called &ldquo;tax-free&rdquo;: it gives everyone
          the equivalent of basic-rate tax relief on childcare.
        </p>
        <Figure label="Top-up a year for one child" caption="20% of the cost, up to £2,000.">
          <Bars
            items={[
              { label: "£2,000 of childcare", value: 400 },
              { label: "£6,000", value: 1200 },
              { label: "£10,000", value: 2000 },
              { label: "£15,000", value: 2000 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="limits" n={3} kicker="Limits" title="The yearly and quarterly limits">
        <p>
          The £2,000 limit is applied as <strong>£500 every three months</strong> for each child, or £1,000 for a disabled
          child. Each three-month period starts from the date you opened the account.
        </p>
        <p>
          Unused top-up does not roll over. If you spend £2,500 in one quarter and nothing in the next, you get £500, not £1,000.
          Families with uneven costs, such as summer holiday clubs, can pay into the account early: money you pay in now gets
          topped up now and can be spent later.
        </p>
        <DataTable
          caption="Top-up for different spending, 2026/27"
          head={["Childcare a year", "Standard child", "Disabled child"]}
          numeric={[0, 1, 2]}
          rows={[
            ["£2,000", "£400", "£400"],
            ["£6,000", "£1,200", "£1,200"],
            ["£10,000", "£2,000", "£2,000"],
            ["£20,000", "£2,000", "£4,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={4} kicker="Eligibility" title="Who can get it">
        <p>You can usually get Tax-Free Childcare if:</p>
        <ul>
          <li>your child is 11 or under (or 16 or under if disabled), until 1 September after their birthday;</li>
          <li>you and your partner, if you have one, are both working, including self-employed, or on parental, sick or annual leave;</li>
          <li>you each expect to earn at least 16 hours a week at your National Minimum or Living Wage over the next three months: £203.36 a week at age 21 or over;</li>
          <li>neither of you has adjusted net income over £100,000;</li>
          <li>you are not getting Universal Credit, tax credits or childcare vouchers.</li>
        </ul>
        <p>
          If one partner cannot work because they get Carer&rsquo;s Allowance, Incapacity Benefit, Severe Disablement
          Allowance or contribution-based ESA, the working partner can still qualify.
        </p>
      </GuideSection>

      <GuideSection id="what" n={5} kicker="Uses" title="What you can pay for">
        <p>The account can pay any childcare provider that is registered and signed up to the scheme, including:</p>
        <ul>
          <li>nurseries and pre-schools;</li>
          <li>registered childminders and nannies;</li>
          <li>after-school and breakfast clubs;</li>
          <li>holiday clubs and play schemes.</li>
        </ul>
        <p>
          It cannot pay for school fees for normal school hours, or for a relative who looks after your child unless they are a
          registered childminder looking after other children too.
        </p>
      </GuideSection>

      <GuideSection id="free-hours" n={6} kicker="Combining" title="Using it with free childcare hours">
        <p>
          In England, working parents can get 30 funded hours a week for children from 9 months. Tax-Free Childcare can pay for
          everything the funded hours do not cover: extra hours, meals, consumables and holiday weeks.
        </p>
        <WorkedExample
          title="A 3-year-old: £16,320 of childcare, 1,140 funded hours worth £9,690"
          steps={[
            { label: "Left to pay after funded hours", value: "£6,630" },
            { label: "Tax-Free Childcare top-up: 20%", value: "£1,326" },
          ]}
          total={{ label: "You pay a year", value: "£5,304" }}
        />
        <p>
          The <a href="/benefits/free-childcare-hours">free childcare hours calculator</a> works this through for your own
          hours and rates.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={7} kicker="The big choice" title="Tax-Free Childcare or Universal Credit?">
        <p>
          You cannot get Tax-Free Childcare and Universal Credit at the same time. Universal Credit can repay up to{" "}
          <strong>85%</strong> of childcare costs, up to £1,071.09 a month for one child or £1,836.16 for two or more, so lower
          earners usually do better on Universal Credit.
        </p>
        <CompareCards
          columns={[
            {
              name: "Tax-Free Childcare",
              rows: [
                { label: "Help on £800 a month", value: "£1,920 a year" },
                { label: "Rate", value: "20% of costs" },
                { label: "Income", value: "No upper effect until £100,000" },
              ],
            },
            {
              name: "Universal Credit",
              rows: [
                { label: "Help on £800 a month", value: "Up to £8,160 a year" },
                { label: "Rate", value: "85% of costs" },
                { label: "Income", value: "Reduced by the 55% taper" },
              ],
            },
          ]}
        />
        <Callout tone="warn" title="Check before you switch">
          The Universal Credit figure is the most you could get. It falls as earnings rise, and stops when your earnings wipe out
          your award. If you apply for Universal Credit, your Tax-Free Childcare account closes, and you may not be able to go
          back straight away. Use the <a href="/benefits/universal-credit">Universal Credit calculator</a> first.
        </Callout>
      </GuideSection>

      <GuideSection id="vouchers" n={8} kicker="Older schemes" title="Childcare vouchers">
        <p>
          Employer childcare voucher schemes closed to new joiners in October 2018. If you were already in one, you can stay in
          it as long as you stay with that employer and do not take a break of a year or more. You cannot use vouchers and
          Tax-Free Childcare together, so compare them: for a basic-rate taxpayer, vouchers are worth up to about £930 a year per
          parent, while Tax-Free Childcare can be worth up to £2,000 per child.
        </p>
      </GuideSection>

      <GuideSection id="account" n={9} kicker="How to" title="Opening and running the account">
        <Timeline
          items={[
            { when: "Step 1", what: "Apply online", detail: "Through the government childcare service. One application covers Tax-Free Childcare and the working parent hours in England." },
            { when: "Step 2", what: "Pay in", detail: "By bank transfer, standing order or debit card. The top-up is added as soon as your money arrives." },
            { when: "Step 3", what: "Pay your provider", detail: "From the account, using the provider's reference. Payments usually arrive within a few days." },
            { when: "Every 3 months", what: "Reconfirm", detail: "Confirm you still meet the work and income rules, or the account is frozen." },
          ]}
        />
        <p>
          You can withdraw money you paid in, but the government loses the top-up on it. Money left when your child stops being
          eligible is returned to you, minus the government&rsquo;s share.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={10} kicker="Avoid" title="Common mistakes">
        <ul>
          <li>Forgetting to reconfirm every three months, which freezes the account.</li>
          <li>Paying the provider directly instead of through the account, so no top-up is added.</li>
          <li>Spending heavily in one quarter and missing the top-up in quieter ones.</li>
          <li>Not telling HMRC when income passes £100,000, which can lead to repaying top-ups and a penalty.</li>
          <li>Applying for Universal Credit without checking it really pays more.</li>
        </ul>
      </GuideSection>

      <GuideSection id="examples" n={11} kicker="Worked examples" title="Worked examples for families">
        <DataTable
          caption="Tax-Free Childcare for different families"
          head={["Family", "Childcare a year", "Top-up", "You pay"]}
          numeric={[1, 2, 3]}
          rows={[
            ["One child at nursery", "£12,000", "£2,000", "£10,000"],
            ["Nursery £9,000, plus £3,000 of after-school club for an older child", "£12,000", "£2,400", "£9,600"],
            ["Disabled child at nursery", "£14,000", "£2,800", "£11,200"],
            ["School-age child: after-school club and holidays", "£4,000", "£800", "£3,200"],
          ]}
        />
        <p>
          The limit is per child, so the same £12,000 spread across two children gets £400 more than £12,000 spent on one. Open
          an account for each child you pay childcare for, even if their costs are small.
        </p>
      </GuideSection>

      <GuideSection id="quarters" n={12} kicker="Practical" title="Making the quarterly limit work">
        <p>
          The top-up limit works in three-month periods from the date you opened the account: £500 per child, or £1,000 for a
          disabled child. Any top-up you do not use in a period is lost.
        </p>
        <WorkedExample
          title="Paying in £2,500 in one quarter for one child"
          steps={[
            { label: "Top-up at 25% of £2,500", value: "£625" },
            { label: "Limit for the quarter", value: "£500" },
          ]}
          total={{ label: "Top-up you get", value: "£500" }}
        />
        <p>
          If your costs are lumpy, for example a big summer holiday club bill, pay in steadily through the year so each quarter
          gets its £500. The money stays in the account until you use it, so you can save up in advance with the top-up already
          added.
        </p>
      </GuideSection>

      <GuideSection id="worth" n={13} kicker="Decisions" title="Is it worth the effort?">
        <p>
          The account takes a few minutes to set up and a few clicks every three months. In return, a family spending £10,000
          a year on childcare for one child gets £2,000. Even small amounts add up: £150 a month on after-school clubs earns
          £360 a year in top-ups.
        </p>
        <p>
          The main reason not to use it is if Universal Credit would pay more, or if you are in an old childcare voucher scheme
          that is worth more to you. For most working families, it is one of the most valuable things they can claim.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={14} kicker="Not employed" title="Self-employed parents">
        <p>
          Self-employed parents can use Tax-Free Childcare. The earnings test uses expected profit over the next three months,
          and if your business started within the last 12 months you do not have to meet the minimum earnings test at all.
        </p>
        <p>
          Profits can be averaged over the tax year if they vary from month to month. Keep a note of how you worked out your
          expected earnings, because HMRC can ask you to show it at a later check.
        </p>
      </GuideSection>

      <GuideSection id="paying-in" n={15} kicker="The account" title="Who can pay in, and getting money out">
        <p>
          Anyone can pay into a child&rsquo;s account, including grandparents and other relatives, and every £8 paid in still
          gets a £2 top-up, within the limits. Employers can pay in too, though that may be taxable.
        </p>
        <p>
          You can take your own money back out, but the government keeps its share: for each £8 you withdraw, the £2 top-up on
          it goes back. When a child is no longer eligible, or the account closes, any money left is returned the same way.
        </p>
        <Callout title="Pay as you go">
          Most families set up a monthly standing order into the account and pay the nursery from it each month. That keeps
          each quarter&rsquo;s top-up in use and avoids large balances sitting in the account.
        </Callout>
      </GuideSection>

      <GuideSection id="compare-schemes" n={16} kicker="The big picture" title="How it fits with the other schemes">
        <DataTable
          caption="Help with childcare costs for working families in England"
          head={["Scheme", "Help", "Can combine with Tax-Free Childcare?"]}
          rows={[
            ["Funded hours", "15 or 30 hours a week, 38 weeks", "Yes"],
            ["Universal Credit childcare", "Up to 85% of costs", "No"],
            ["Childcare vouchers (closed scheme)", "Up to about £930 a year per parent", "No"],
            ["Employer workplace nursery", "Tax-free nursery place", "Usually yes, for other costs"],
          ]}
        />
        <p>
          Funded hours and Tax-Free Childcare together usually give working families the most help, unless their income is low
          enough for Universal Credit to pay more.
        </p>
      </GuideSection>

      <GuideSection id="reconfirm" n={17} kicker="Admin" title="Reconfirming without problems">
        <p>
          Every three months you log in and confirm your circumstances. You get a reminder by email, and you can reconfirm up to
          four weeks before the deadline. If you also get the working parent funded hours, the same reconfirmation covers both.
        </p>
        <p>
          If you miss the deadline, your account is frozen and no top-up is added until you reconfirm, and your funded hours
          code may stop working. Setting a calendar reminder a week before each date avoids this.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "20%", label: "Share of childcare costs paid by the government" },
            { value: "£500", label: "Top-up limit per child each quarter" },
            { value: "£2,000", label: "Top-up limit per child each year" },
            { value: "£4,000", label: "Limit for a disabled child" },
            { value: "11", label: "Upper age (16 if disabled)" },
            { value: "£100,000", label: "Adjusted net income limit for each parent" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
