import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Child maintenance — the guide. Figures from src/lib/benefits/families.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "options", title: "Your three options" },
  { id: "income", title: "Which income counts" },
  { id: "rates", title: "The five rates" },
  { id: "examples", title: "Worked examples" },
  { id: "other-children", title: "Other children the paying parent supports" },
  { id: "shared-care", title: "Shared care" },
  { id: "fees", title: "Direct Pay and Collect and Pay" },
  { id: "changes", title: "When things change" },
  { id: "variations", title: "Variations: asking for a different amount" },
  { id: "enforcement", title: "If payments are not made" },
  { id: "benefits", title: "Child maintenance and benefits" },
  { id: "reform", title: "Changes on the way" },
  { id: "self-employed", title: "Self-employed and company directors" },
  { id: "example-second", title: "A second-family example" },
  { id: "talking", title: "Agreeing an amount yourselves" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — How the Child Maintenance Service works out child maintenance", href: "https://www.gov.uk/how-child-maintenance-is-worked-out" },
  { label: "GOV.UK — Child maintenance: Direct Pay and Collect and Pay", href: "https://www.gov.uk/child-maintenance-service/paying-and-receiving" },
  { label: "nidirect — Child maintenance rates explained", href: "https://www.nidirect.gov.uk/articles/child-maintenance-rates-explained-2012-scheme" },
  { label: "GOV.UK — Child maintenance: shared care", href: "https://www.gov.uk/how-child-maintenance-is-worked-out/shared-care" },
  { label: "Legislation — Child Support Act 1991, Schedule 1", href: "https://www.legislation.gov.uk/ukpga/1991/48/schedule/1" },
];

export default function CmsGuide() {
  return (
    <Guide
      kicker="The child maintenance guide"
      title="How child maintenance is worked out"
      intro={
        <>
          When parents separate, the parent who does not have the children living with them most of the time usually pays child maintenance to
          the one who does. You can agree an amount yourselves, or use the Child Maintenance Service (CMS), which works it out from a fixed
          formula. This guide explains that formula step by step: which income counts, the five rates, the reductions for other children and
          shared care, and the fees if the CMS collects the money.
        </>
      }
      meta={["2012 scheme", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The CMS uses the paying parent&rsquo;s <strong>gross weekly income</strong>, before tax, less pension contributions.</li>
          <li>On income of £200 to £800 a week the <strong>basic rate</strong> is 12% for one child, 16% for two and 19% for three or more.</li>
          <li>On a £30,000 salary that is about <strong>£69 a week</strong> for one child.</li>
          <li>The amount falls if the paying parent supports other children or has the children to stay 52 nights a year or more.</li>
          <li>Direct Pay is free; Collect and Pay adds a 20% fee for the paying parent and takes 4% from the receiving parent.</li>
        </ul>
        <KeyStats
          items={[
            { value: "12%", label: "Basic rate, one child" },
            { value: "£7", label: "Flat rate a week" },
            { value: "£3,000", label: "Weekly income limit" },
            { value: "52 nights", label: "Shared care starts" },
          ]}
        />
      </GuideSection>

      <GuideSection id="options" n={2} kicker="Choices" title="Your three options">
        <CompareCards
          columns={[
            {
              name: "Family-based arrangement",
              rows: [
                { label: "Amount", value: "Whatever you agree" },
                { label: "Cost", value: "Free" },
                { label: "Enforceable", value: "No" },
              ],
            },
            {
              name: "Child Maintenance Service",
              rows: [
                { label: "Amount", value: "Set by the formula" },
                { label: "Cost", value: "Free with Direct Pay; fees with Collect and Pay" },
                { label: "Enforceable", value: "Yes" },
              ],
            },
          ]}
        />
        <p>
          A third route is a court order, usually made as part of a divorce settlement. After a year a court order can be replaced by a CMS
          calculation if either parent applies. Courts can also order top-up maintenance when the paying parent&rsquo;s income is above the CMS
          limit, and maintenance for school fees or a disabled child&rsquo;s extra costs.
        </p>
      </GuideSection>

      <GuideSection id="income" n={3} kicker="Income" title="Which income counts">
        <p>
          The CMS asks HMRC for the paying parent&rsquo;s gross income in the latest tax year it has, usually from two years before, and divides
          it by 365 and multiplies by 7 to get a weekly figure. It includes pay, self-employed profit, pensions and taxable benefits. If current
          income is at least 25% different from that figure, the CMS uses current income instead.
        </p>
        <ul>
          <li>Contributions to a pension, including a workplace pension, are taken off.</li>
          <li>Income over £3,000 a week (£156,429 a year) is ignored.</li>
          <li>The receiving parent&rsquo;s income does not count at all.</li>
        </ul>
      </GuideSection>

      <GuideSection id="rates" n={4} kicker="Rates" title="The five rates">
        <DataTable
          caption="Child maintenance rates by gross weekly income"
          head={["Rate", "Gross weekly income", "One child", "Two", "Three or more"]}
          rows={[
            ["Nil", "Under £7", "£0", "£0", "£0"],
            ["Flat", "£7 to £100, or on benefits", "£7", "£7", "£7"],
            ["Reduced", "£100.01 to £199.99", "£7 + 17%", "£7 + 25%", "£7 + 31%"],
            ["Basic", "£200 to £800", "12%", "16%", "19%"],
            ["Basic plus", "£800.01 to £3,000", "+ 9%", "+ 12%", "+ 15%"],
          ]}
        />
        <p>
          The reduced rate percentages apply to income above £100. Basic plus means the basic rate on the first £800 a week and the lower
          percentage on the rest. The flat rate also applies if the paying parent gets a benefit such as Universal Credit with no earnings, the
          State Pension, Pension Credit, JSA or ESA.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="One child, paying parent earns £30,000 a year"
          steps={[
            { label: "Weekly income: £30,000 ÷ 365 × 7", value: "£575.34" },
            { label: "Basic rate for one child", value: "12%" },
          ]}
          total={{ label: "Child maintenance a week (about £299 a month)", value: "£69.04" }}
        />
        <WorkedExample
          title="Two children, income £1,200 a week"
          steps={[
            { label: "16% of the first £800", value: "£128.00" },
            { label: "12% of the next £400", value: "£48.00" },
          ]}
          total={{ label: "Child maintenance a week", value: "£176.00" }}
        />
        <WorkedExample
          title="One child, income £150 a week"
          steps={[
            { label: "Flat amount", value: "£7.00" },
            { label: "17% of the £50 over £100", value: "£8.50" },
          ]}
          total={{ label: "Child maintenance a week", value: "£15.50" }}
        />
      </GuideSection>

      <GuideSection id="other-children" n={6} kicker="Second families" title="Other children the paying parent supports">
        <p>
          If the paying parent lives with other children, such as children with a new partner or stepchildren, or gets Child Benefit for them,
          their income is reduced before the basic rate is applied: by 11% for one other child, 14% for two and 16% for three or more.
        </p>
        <p>
          For example, on £600 a week with two children to pay for and one other child at home, income is reduced by 11% to £534, and 16% of
          that is £85.44 a week rather than £96. At the reduced rate there is a separate table of lower percentages instead.
        </p>
        <DataTable
          caption="Reduced rate percentages with other children"
          head={["Other children", "One child", "Two", "Three or more"]}
          numeric={[1, 2, 3]}
          rows={[
            ["None", "17%", "25%", "31%"],
            ["One", "14.1%", "21.2%", "26.4%"],
            ["Two", "13.2%", "19.9%", "24.9%"],
            ["Three or more", "12.4%", "18.9%", "23.8%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="shared-care" n={7} kicker="Overnight stays" title="Shared care">
        <p>When the children stay overnight with the paying parent, the amount is reduced by bands of nights a year:</p>
        <DataTable
          caption="Shared care reductions"
          head={["Nights a year", "Reduction"]}
          rows={[
            ["52 to 103", "One-seventh"],
            ["104 to 155", "Two-sevenths"],
            ["156 to 174", "Three-sevenths"],
            ["175 or more", "Half, plus £7 a week for each child"],
          ]}
        />
        <p>
          Two children, paying parent on £500 a week: the basic amount is £80. With 104 nights a year it falls to £57.14; with 180 nights to £26.
          The amount cannot go below £7 a week unless the paying parent is on the flat rate because of benefits, when 52 nights or more
          reduces it to nothing. The CMS uses the pattern you agree, or the past 12 months.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={8} kicker="Paying" title="Direct Pay and Collect and Pay">
        <p>
          With <strong>Direct Pay</strong>, the CMS works out the amount and the paying parent pays it straight to the receiving parent, usually
          by standing order. There are no fees, and the £20 application fee was scrapped in February 2024.
        </p>
        <p>
          With <strong>Collect and Pay</strong>, the CMS takes the money from the paying parent, often straight from their wages, and passes it on.
          The paying parent pays 20% on top and the receiving parent loses 4%. On £60 a week, the paying parent pays £72 and the receiving parent
          gets £57.60. Collect and Pay is used if the paying parent does not pay under Direct Pay, or if Direct Pay would not be safe.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={9} kicker="Reviews" title="When things change">
        <p>
          The CMS reviews the calculation every year using the latest HMRC figures. Between reviews, tell the CMS if the paying parent&rsquo;s income
          changes by 25% or more, the number of children changes, or the shared care pattern changes. A child stops counting at 16, or at 20 if
          they stay in approved education.
        </p>
      </GuideSection>

      <GuideSection id="variations" n={10} kicker="Special cases" title="Variations: asking for a different amount">
        <p>Either parent can ask for a variation. The paying parent can ask for less because of:</p>
        <ul>
          <li>the costs of a disabled child they live with;</li>
          <li>travel costs for staying contact;</li>
          <li>a mortgage or loan they pay on the receiving parent&rsquo;s home;</li>
          <li>boarding school fees.</li>
        </ul>
        <p>The receiving parent can ask for more if the paying parent has unearned income such as rent or dividends over £2,500 a year, or has reduced their income to avoid paying.</p>
      </GuideSection>

      <GuideSection id="enforcement" n={11} kicker="Arrears" title="If payments are not made">
        <Timeline
          items={[
            { when: "Missed payment on Direct Pay", what: "Move to Collect and Pay", detail: "The receiving parent tells the CMS, which takes over collection with fees." },
            { when: "Arrears build up", what: "Deductions from earnings or bank accounts", detail: "The CMS can take money straight from wages or bank accounts." },
            { when: "Still unpaid", what: "Court action", detail: "Liability orders, bailiffs, charges on property, loss of a driving licence or passport, and in the end prison." },
          ]}
        />
      </GuideSection>

      <GuideSection id="benefits" n={12} kicker="Benefits" title="Child maintenance and benefits">
        <p>
          Child maintenance you receive is ignored completely for Universal Credit, Housing Benefit, Child Benefit and Tax-Free Childcare. Paying
          it does not reduce your own Universal Credit either. It is not taxable for either parent.
        </p>
        <Callout title="Check what else you could get">
          A parent bringing up children alone is often entitled to more than they expect. Try the <a href="/benefits/benefits-checker">benefits checker</a>.
        </Callout>
      </GuideSection>

      <GuideSection id="reform" n={13} kicker="Reform" title="Changes on the way">
        <p>
          The government plans to end Direct Pay and move every CMS case into a reformed collection service, with a lower fee structure, to give
          receiving parents more certainty and protect victims of domestic abuse. It needs new legislation and is expected no earlier than 2027/28.
          Until then, the rules on this page apply.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={14} kicker="Income types" title="Self-employed and company directors">
        <p>
          For self-employed paying parents, the CMS uses taxable profit from the Self Assessment return, after allowable expenses, not turnover.
          Company directors are assessed on the salary they take; dividends are unearned income, which the receiving parent can ask the CMS to add
          through a variation if they are over £2,500 a year. If you think a paying parent is keeping income low through a company, give the CMS
          as much detail as you can.
        </p>
      </GuideSection>

      <GuideSection id="example-second" n={15} kicker="Example" title="A second-family example">
        <WorkedExample
          title="Two children to pay for, one other child at home, income £600 a week"
          steps={[
            { label: "Gross weekly income", value: "£600.00" },
            { label: "Less 11% for one other child", value: "− £66.00" },
            { label: "Income used", value: "£534.00" },
            { label: "Basic rate for two children: 16%", value: "£85.44" },
          ]}
          total={{ label: "Child maintenance a week", value: "£85.44" }}
        />
      </GuideSection>

      <GuideSection id="talking" n={16} kicker="Family arrangements" title="Agreeing an amount yourselves">
        <p>
          If you can talk to each other, a family-based arrangement can be quicker and more flexible than the CMS. You can agree to cover costs
          directly, such as school uniform or clubs, and change the amount as circumstances change. Write down what you agree, how and when it will
          be paid, and when you will review it. If it breaks down, either of you can apply to the CMS at any time.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Child maintenance at a glance"
          head={["Item", "Amount"]}
          rows={[
            ["Flat rate", "£7 a week"],
            ["Basic rate: 1 / 2 / 3+ children", "12% / 16% / 19%"],
            ["Basic plus above £800 a week", "9% / 12% / 15%"],
            ["Other children: income reduced by", "11% / 14% / 16%"],
            ["Income limit", "£3,000 a week"],
            ["Collect and Pay fees", "20% paying, 4% receiving"],
            ["Application fee", "None"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
