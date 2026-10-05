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

/** Universal Credit — the guide. Pure server component. Figures from src/lib/benefits/uc-engine.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the award is built" },
  { id: "standard", title: "The standard allowance" },
  { id: "children", title: "Children and disabled children" },
  { id: "housing", title: "Help with rent" },
  { id: "health", title: "Health and carer elements" },
  { id: "childcare", title: "Childcare costs" },
  { id: "earnings", title: "Working: the work allowance and the taper" },
  { id: "income-savings", title: "Other income and savings" },
  { id: "cap", title: "The benefit cap" },
  { id: "payments", title: "Assessment periods and payments" },
  { id: "claiming", title: "How to claim" },
  { id: "commitments", title: "Your claimant commitment" },
  { id: "mistakes", title: "Mistakes that cost money" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Universal Credit", href: "https://www.gov.uk/universal-credit" },
  { label: "GOV.UK — Universal Credit: what you'll get", href: "https://www.gov.uk/universal-credit/what-youll-get" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Benefit cap", href: "https://www.gov.uk/benefit-cap" },
  { label: "GOV.UK — Universal Credit and childcare", href: "https://www.gov.uk/guidance/universal-credit-and-childcare" },
];

export default function UcGuide() {
  return (
    <Guide
      kicker="The Universal Credit guide"
      title="Universal Credit in 2026/27"
      intro={
        <>
          Universal Credit is the main benefit for working-age people on a low income, in or out of work. It is one monthly payment that adds
          together amounts for you, your children, your rent and any health condition or caring, then takes off part of what you earn. This
          guide explains every part of the sum with 2026/27 rates and real examples.
        </>
      }
      meta={["2026/27 rates", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            A single person aged 25 or over gets a standard allowance of <strong>£424.90 a month</strong>. A couple where one is 25 or over
            gets <strong>£666.97</strong>.
          </li>
          <li>
            Each child adds <strong>£303.94 a month</strong>, or £351.88 for an eldest child born before 6 April 2017. Since April 2026 there
            is no two-child limit.
          </li>
          <li>Rent is covered up to the Local Housing Allowance (private) or your actual rent (social), less any deductions.</li>
          <li>
            Earnings reduce the award by <strong>55p for every £1</strong> of take-home pay above your work allowance.
          </li>
          <li>Savings over £16,000 rule you out, and the benefit cap limits the total for most households not in work.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£424.90", label: "Single, 25 or over, a month" },
            { value: "£666.97", label: "Couple, a month" },
            { value: "£303.94", label: "Each child, a month" },
            { value: "55%", label: "Taper on earnings" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The sum" title="How the award is built">
        <p>Every Universal Credit award is worked out in the same three steps, once a month:</p>
        <ol>
          <li>
            <strong>Add up the maximum award.</strong> This is the standard allowance plus every element that applies to you: children,
            disabled children, housing, a health condition, caring and childcare.
          </li>
          <li>
            <strong>Take off income.</strong> 55% of earnings above any work allowance, all of most other income, and an assumed income from
            savings between £6,000 and £16,000.
          </li>
          <li>
            <strong>Apply the benefit cap</strong> if it covers your household.
          </li>
        </ol>
        <DataTable
          caption="Universal Credit monthly amounts from April 2026"
          head={["Element", "A month"]}
          numeric={[1]}
          rows={[
            ["Standard allowance: single under 25", "£338.58"],
            ["Standard allowance: single 25 or over", "£424.90"],
            ["Standard allowance: couple, both under 25", "£528.34"],
            ["Standard allowance: couple, one or both 25 or over", "£666.97"],
            ["Child: eldest born before 6 April 2017", "£351.88"],
            ["Child: each other child", "£303.94"],
            ["Disabled child addition: lower", "£164.79"],
            ["Disabled child addition: higher", "£514.71"],
            ["Health element (LCWRA): new claims from April 2026", "£217.26"],
            ["Health element (LCWRA): earlier claims and protected groups", "£429.80"],
            ["Limited capability for work (claims before April 2017)", "£158.76"],
            ["Carer element", "£209.34"],
            ["Childcare: most for one child", "£1,071.09"],
            ["Childcare: most for two or more", "£1,836.16"],
          ]}
        />
      </GuideSection>

      <GuideSection id="standard" n={3} kicker="The core amount" title="The standard allowance">
        <p>
          Everyone gets a standard allowance. It depends only on whether you claim as a single person or a couple and on your age. A couple
          gets one joint allowance, not two singles: £666.97 compared with £849.80 for two single people over 25. That is why couples who live
          together must claim together, and why moving in with a partner usually lowers the total.
        </p>
        <p>
          If one member of a couple is 25 or over, you get the higher couple rate. If one partner has reached State Pension age and the other
          has not, you usually claim Universal Credit as a couple until the younger partner reaches State Pension age too.
        </p>
      </GuideSection>

      <GuideSection id="children" n={4} kicker="Families" title="Children and disabled children">
        <p>
          You get a child element for each child you are responsible for who is under 16, or under 20 and in approved non-advanced education
          or training. The two-child limit was removed from April 2026, so a third or later child now adds £303.94 a month like any other.
        </p>
        <Figure label="Child elements a month by number of children" caption="Children born from 6 April 2017 onwards. Every child counts from April 2026.">
          <Bars
            items={[
              { label: "1 child", value: 303.94 },
              { label: "2 children", value: 607.88 },
              { label: "3 children", value: 911.82 },
              { label: "4 children", value: 1215.76 },
            ]}
          />
        </Figure>
        <p>
          A disabled child adds a further amount. The lower addition (£164.79) applies to a child getting any rate of Disability Living
          Allowance or Personal Independence Payment. The higher addition (£514.71) applies to a child on the highest rate of the DLA care
          component, the enhanced PIP daily living component, or who is certified as severely sight impaired.
        </p>
      </GuideSection>

      <GuideSection id="housing" n={5} kicker="Rent" title="Help with rent">
        <p>The housing element depends on who you rent from.</p>
        <CompareCards
          columns={[
            {
              name: "Private renters",
              rows: [
                { label: "Limit", value: "Local Housing Allowance for your area and bedroom need" },
                { label: "Under 35, single", value: "Usually the shared accommodation rate" },
                { label: "2026/27", value: "Rates frozen at April 2024 levels" },
              ],
            },
            {
              name: "Social renters",
              rows: [
                { label: "Limit", value: "Your actual eligible rent" },
                { label: "Spare room", value: "14% off for one, 25% for two or more" },
                { label: "Paid to", value: "You, unless a managed payment is set up" },
              ],
            },
          ]}
        />
        <p>
          Universal Credit has its own monthly Local Housing Allowance rates. They are close to the weekly Housing Benefit rate converted
          to a month, but often a few pounds higher. For example, the one-bedroom rate in Bristol is £900 a month on Universal Credit,
          against £207.12 a week for Housing Benefit. A single person over 35 renting a £900 flat there gets a housing element of the full
          £900. If they are not working, the benefit cap then takes £95.48 off their award. The{" "}
          <a href="/benefits/local-housing-allowance">Local Housing Allowance calculator</a> works out your bedroom entitlement and the rate for
          any area of England, Scotland or Wales.
        </p>
        <p>
          Each other adult living with you, such as a grown-up son or daughter, usually means a housing cost contribution of £96.55 a month is
          taken off. Some are exempt, including people getting PIP, DLA or Carer&rsquo;s Allowance and anyone under 21. If you own your home,
          Universal Credit does not pay a housing element. You may be able to get a Support for Mortgage Interest loan instead.
        </p>
      </GuideSection>

      <GuideSection id="health" n={6} kicker="Illness and caring" title="Health and carer elements">
        <p>
          If a Work Capability Assessment finds you have limited capability for work and work-related activity (LCWRA), you get the health
          element and no longer have to look for work. From 6 April 2026, new claims get <strong>£217.26 a month</strong>. People already
          getting it before then keep <strong>£429.80</strong>, and so do new claimants who meet the severe conditions criteria or are
          terminally ill.
        </p>
        <p>
          The carer element of <strong>£209.34</strong>{" "}is for someone caring for at least 35 hours a week for a person getting a qualifying
          disability benefit. You do not have to get Carer&rsquo;s Allowance, but if you do, it is taken off your Universal Credit in full.
          One person cannot get both the carer element and the health element: you get whichever is higher.
        </p>
        <Callout title="The health element also changes your work allowance">
          Having LCW or LCWRA gives you a work allowance, so you can earn some money before your award starts to fall, even with no children.
        </Callout>
      </GuideSection>

      <GuideSection id="childcare" n={7} kicker="Working parents" title="Childcare costs">
        <p>
          If you work and pay a registered childminder, nursery or after-school club, Universal Credit pays back <strong>85%</strong> of the
          cost, up to £1,071.09 a month for one child or £1,836.16 for two or more. In a couple, both of you must normally be working. There
          is no minimum number of hours.
        </p>
        <p>
          You must report the cost in the assessment period it was paid, with proof, and you can claim up-front help with the first month
          through the Flexible Support Fund. Universal Credit childcare cannot be used at the same time as{" "}
          <a href="/benefits/tax-free-childcare">Tax-Free Childcare</a>, so compare the two. Most people on Universal Credit are better off
          with the 85%.
        </p>
      </GuideSection>

      <GuideSection id="earnings" n={8} kicker="Work" title="Working: the work allowance and the taper">
        <p>
          Universal Credit uses your take-home pay: earnings after tax, National Insurance and pension contributions. If you have children or a
          health condition, the first part of your earnings is ignored. This is the work allowance: <strong>£427 a month</strong> if you get
          help with rent, or <strong>£710</strong> if you do not. Above that, the award falls by 55p for every extra £1.
        </p>
        <WorkedExample
          title="A single parent with one child, no rent, earning £1,000 a month"
          steps={[
            { label: "Standard allowance", value: "£424.90" },
            { label: "Child element", value: "£303.94" },
            { label: "Maximum award", value: "£728.84" },
            { label: "Earnings above the £710 work allowance", note: "£1,000 − £710 = £290", value: "£290.00" },
            { label: "55% of that", value: "−£159.50" },
          ]}
          total={{ label: "Universal Credit a month", value: "£569.34" }}
        />
        <p>
          Someone with no children and no health condition has no work allowance, so the taper starts from the first pound. A single person
          renting the £900 Bristol flat above and earning £1,000 gets £772.42 a month: the maximum of £1,322.42 less £550.
        </p>
        <WorkedExample
          title="A couple with two children, social rent of £650, earning £1,800 a month"
          steps={[
            { label: "Standard allowance (couple)", value: "£666.97" },
            { label: "Child elements", value: "£607.88" },
            { label: "Housing element", value: "£650.00" },
            { label: "Maximum award", value: "£1,924.85" },
            { label: "55% of earnings above £427", note: "£1,373 × 55%", value: "−£755.15" },
          ]}
          total={{ label: "Universal Credit a month", value: "£1,169.70" }}
        />
        <p>
          That family would keep getting some Universal Credit until take-home pay reached about £3,927 a month. Because only 55p in every
          pound is withdrawn, working more always leaves you better off, though for a basic-rate taxpayer, income tax and National Insurance on top mean you keep
          only about 32p of an extra pound of gross pay.
        </p>
        <p>
          Self-employed claimants who have been trading for more than 12 months may be treated as earning at least the minimum income floor,
          roughly 35 hours a week at the National Living Wage, even if they earn less.
        </p>
      </GuideSection>

      <GuideSection id="income-savings" n={9} kicker="Means test" title="Other income and savings">
        <p>
          Unearned income is taken off pound for pound. That includes New Style Jobseeker&rsquo;s Allowance and ESA, Carer&rsquo;s Allowance,
          most pensions, and maintenance paid to you by a former partner. Child maintenance, Child Benefit, PIP and DLA are ignored.
        </p>
        <p>
          Savings, investments and property other than your home count as capital. The first £6,000 is ignored. Between £6,000 and £16,000,
          every £250 or part of £250 is treated as £4.35 a month of income. With £16,000 or more you cannot get Universal Credit at all.
        </p>
        <DataTable
          caption="Assumed income from savings"
          head={["Savings", "Taken off a month"]}
          numeric={[1]}
          rows={[
            ["£6,000 or less", "£0"],
            ["£8,000", "£34.80"],
            ["£10,000", "£69.60"],
            ["£12,000", "£104.40"],
            ["£15,000", "£156.60"],
            ["£16,000 or more", "Not eligible"],
          ]}
        />
      </GuideSection>

      <GuideSection id="cap" n={10} kicker="The limit" title="The benefit cap">
        <p>
          The benefit cap limits the total of most working-age benefits. In 2026/27 it is £1,835 a month for couples and families outside
          London (£22,020 a year) and £1,229.42 for single people (£14,753). In Greater London it is £2,110.25 and £1,413.92. Child Benefit
          counts towards the cap, but the childcare element does not.
        </p>
        <p>
          The cap does not apply if your household earns at least £881 a month after tax, or if anyone gets the health element, the carer
          element, PIP, DLA, Attendance Allowance, Carer&rsquo;s Allowance or certain other benefits. If you lose a job where you earned at
          least that much, you get a nine-month grace period before the cap applies.
        </p>
        <WorkedExample
          title="A couple in London with three children, social rent of £1,600, not working"
          steps={[
            { label: "Maximum award", note: "£666.97 + £911.82 + £1,600", value: "£3,178.79" },
            { label: "Plus Child Benefit counted for the cap", value: "£272.35" },
            { label: "Cap for a London family", value: "£2,110.25" },
            { label: "Reduction", value: "−£1,340.89" },
          ]}
          total={{ label: "Universal Credit a month", value: "£1,837.90" }}
        />
        <p>
          If one partner found work paying £881 a month, the cap would go and their Universal Credit would rise to £2,929.09, even after the
          taper. The <a href="/benefits/benefit-cap">benefit cap calculator</a> shows how it affects your household.
        </p>
      </GuideSection>

      <GuideSection id="payments" n={11} kicker="Timing" title="Assessment periods and payments">
        <p>
          Universal Credit runs in monthly assessment periods starting on the day you claim. Your payment arrives seven days after each one
          ends, so the first payment comes about five weeks after you claim. It is based on what you were actually paid in that period, as
          reported by your employer through Real Time Information.
        </p>
        <Callout tone="warn" title="Two paydays in one period">
          If you are paid weekly, fortnightly or four-weekly, some assessment periods will contain an extra payday and your award will drop
          that month. A payday moved early for a bank holiday can have the same effect. It evens out over the year.
        </Callout>
        <p>
          You can ask for an advance payment while you wait for the first payment. It is a loan repaid from future payments, usually over 24
          months. Couples get one payment into one account, though you can ask for a split payment in exceptional cases.
        </p>
      </GuideSection>

      <GuideSection id="claiming" n={12} kicker="Getting started" title="How to claim">
        <Timeline
          items={[
            { when: "Day 1", what: "Make your claim online", detail: "Your assessment period starts on the day you submit." },
            { when: "Week 1 to 2", what: "Verify your identity and attend an interview", detail: "Bring proof of rent, ID and bank details." },
            { when: "Any time", what: "Ask for an advance if you need it", detail: "Repaid from later payments." },
            { when: "About 5 weeks", what: "First payment", detail: "Then every month on the same date." },
          ]}
        />
        <p>
          You claim online at GOV.UK and manage the claim through your online journal. If you cannot use the internet, the Universal Credit
          helpline can take a claim by phone. Citizens Advice runs a free Help to Claim service.
        </p>
      </GuideSection>

      <GuideSection id="commitments" n={13} kicker="Work search" title="Your claimant commitment">
        <p>
          Unless you have the health element, care for a young child or are earning above a threshold, you agree a claimant commitment with
          your work coach. It sets out what you must do to look for or prepare for work, usually up to 35 hours a week of job search for
          someone with no limits on their availability. Parents of children under 3 have lighter requirements, and parents of children aged 3
          to 12 are expected to work or look for work in school hours.
        </p>
        <p>
          Missing an appointment or not doing what you agreed can lead to a sanction, which reduces the standard allowance for a set period.
          If you have a good reason, tell your work coach straight away.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={14} kicker="Avoid these" title="Mistakes that cost money">
        <ul>
          <li>
            <strong>Not reporting childcare costs on time.</strong> They must be reported in the assessment period they were paid, or by the end
            of the next one.
          </li>
          <li>
            <strong>Forgetting the health assessment.</strong> If a condition limits your work, send a fit note so a Work Capability Assessment
            can be arranged.
          </li>
          <li>
            <strong>Claiming separately as a couple.</strong> Living together without declaring a partner is fraud and leads to overpayments.
          </li>
          <li>
            <strong>Not checking the start date.</strong> Claim as soon as you need to. Universal Credit is rarely backdated, and only by up to
            one month for specific reasons.
          </li>
          <li>
            <strong>Ignoring pension contributions.</strong> Paying into a pension lowers your take-home pay, so it raises your Universal Credit
            as well as building savings.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={15} kicker="FAQs" title="Common questions">
        <h3>Is there still a two-child limit?</h3>
        <p>No. From April 2026 every child attracts a child element of £303.94 a month, or £351.88 for an eldest child born before April 2017.</p>
        <h3>Can I get Universal Credit if I work full time?</h3>
        <p>Yes, if your pay is low enough or your rent or family large enough. There is no limit on hours.</p>
        <h3>Do students get Universal Credit?</h3>
        <p>Most full-time students cannot, but student parents, some disabled students and some couples can.</p>
        <h3>Does Universal Credit count my partner&rsquo;s income?</h3>
        <p>Yes. A couple is assessed together, so both incomes and both sets of savings count.</p>
        <h3>Is Universal Credit taxed?</h3>
        <p>No. It is not taxable income.</p>
        <h3>What happens to Universal Credit at State Pension age?</h3>
        <p>
          When you and any partner have both reached State Pension age, you move to Pension Credit and, if you rent, Housing Benefit instead.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£424.90", label: "Single, 25 or over" },
            { value: "£666.97", label: "Couple, one or both 25 or over" },
            { value: "£303.94", label: "Each child" },
            { value: "£427 / £710", label: "Work allowance with or without housing" },
            { value: "55%", label: "Taper" },
            { value: "85%", label: "Childcare costs met" },
            { value: "£16,000", label: "Savings limit" },
            { value: "£881", label: "Earnings that lift the benefit cap" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
