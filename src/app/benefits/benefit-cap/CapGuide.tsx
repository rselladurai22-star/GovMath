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

/** Benefit cap — the guide. Figures from src/lib/benefits/uc-engine.ts and benefit-cap.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "amounts", title: "How much the cap is" },
  { id: "counted", title: "Which benefits count" },
  { id: "exempt", title: "Who is exempt" },
  { id: "uc", title: "How the cap works on Universal Credit" },
  { id: "working", title: "Why the first hours of work matter so much" },
  { id: "grace", title: "The grace period" },
  { id: "hb", title: "The cap on Housing Benefit" },
  { id: "who-hit", title: "Who the cap hits hardest" },
  { id: "dhp", title: "Discretionary Housing Payments" },
  { id: "steps", title: "What to do if you are capped" },
  { id: "london", title: "London and the rest of England" },
  { id: "new-baby", title: "When a new baby arrives" },
  { id: "moving", title: "Moving home and the cap" },
  { id: "challenge", title: "Challenging a cap decision" },
  { id: "exempt-example", title: "What an exemption is worth" },
  { id: "history", title: "How the cap has changed" },
  { id: "budget", title: "Budgeting on a capped award" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Benefit cap", href: "https://www.gov.uk/benefit-cap" },
  { label: "GOV.UK — Benefit cap amounts", href: "https://www.gov.uk/benefit-cap/benefit-cap-amounts" },
  { label: "GOV.UK — When you're not affected by the benefit cap", href: "https://www.gov.uk/benefit-cap/when-youre-not-affected" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Discretionary Housing Payments", href: "https://www.gov.uk/government/publications/discretionary-housing-payments-guidance-manual" },
];

export default function CapGuide() {
  return (
    <Guide
      kicker="The benefit cap guide"
      title="The benefit cap in 2026/27"
      intro={
        <>
          The benefit cap limits how much a working-age household can get from most benefits. It mainly affects larger families and people
          with high rents who are not working. This guide explains the limits, what counts, who is exempt, and why even a few hours of work can
          make a large difference.
        </>
      }
      meta={["2026/27 limits", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Outside London the cap is <strong>£22,020 a year</strong> for couples and families and <strong>£14,753</strong> for single people.
          </li>
          <li>
            In Greater London it is <strong>£25,323</strong> and <strong>£16,967</strong>.
          </li>
          <li>The limits have not changed for 2026/27, even though benefit rates went up.</li>
          <li>
            You are exempt if your household earns at least <strong>£881 a month</strong> after tax, or someone gets a disability or carer&rsquo;s
            benefit.
          </li>
        </ul>
        <KeyStats
          items={[
            { value: "£1,835", label: "Family cap a month outside London" },
            { value: "£2,110.25", label: "Family cap a month in London" },
            { value: "£881", label: "Monthly earnings that lift the cap" },
            { value: "9 months", label: "Grace period after losing work" },
          ]}
        />
      </GuideSection>

      <GuideSection id="amounts" n={2} kicker="The limits" title="How much the cap is">
        <p>
          A &ldquo;family&rdquo; here means a couple, with or without children, or a single parent whose child lives with them. Universal
          Credit uses the monthly figure. Housing Benefit uses the weekly one.
        </p>
        <DataTable
          caption="Benefit cap amounts, 2026/27"
          head={["Household", "A year", "A month", "A week"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Couple or family, outside London", "£22,020", "£1,835.00", "£423.46"],
            ["Single, outside London", "£14,753", "£1,229.42", "£283.71"],
            ["Couple or family, Greater London", "£25,323", "£2,110.25", "£486.98"],
            ["Single, Greater London", "£16,967", "£1,413.92", "£326.29"],
          ]}
        />
        <p>
          The cap was last raised in April 2023 and has been frozen since. As each April&rsquo;s uprating increases the benefits themselves,
          more households reach the limit each year.
        </p>
      </GuideSection>

      <GuideSection id="counted" n={3} kicker="What is added up" title="Which benefits count">
        <CompareCards
          columns={[
            {
              name: "Counted",
              rows: [
                { label: "Universal Credit", value: "Except the childcare element" },
                { label: "Child Benefit", value: "In full" },
                { label: "Legacy benefits", value: "Housing Benefit, Child Tax Credit, income-related ESA and JSA, Income Support" },
                { label: "New Style benefits", value: "New Style JSA and ESA" },
                { label: "Others", value: "Maternity Allowance, Widowed Parent's Allowance, Severe Disablement Allowance" },
              ],
            },
            {
              name: "Not counted",
              rows: [
                { label: "Childcare", value: "The Universal Credit childcare element" },
                { label: "Pensions", value: "State Pension and Pension Credit" },
                { label: "Statutory pay", value: "SMP, SSP and other employer payments" },
                { label: "One-off help", value: "Cold weather and similar payments" },
              ],
            },
          ]}
        />
        <p>
          Child Benefit counts towards the cap even though it is paid separately by HMRC. For a family with three children it is £272.35 a
          month, which comes straight off the room left for Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={4} kicker="Ways out" title="Who is exempt">
        <p>The cap does not apply if anyone in your household:</p>
        <ul>
          <li>earns at least £881 a month after tax, on its own or added to their partner&rsquo;s pay, on Universal Credit;</li>
          <li>qualifies for Working Tax Credit, on legacy benefits;</li>
          <li>
            gets Personal Independence Payment, Disability Living Allowance, Attendance Allowance, Carer&rsquo;s Allowance, Guardian&rsquo;s
            Allowance, War Pensions or Industrial Injuries Benefits;
          </li>
          <li>has the health element (LCWRA) or carer element in their Universal Credit, or gets ESA with the support component;</li>
          <li>is single and has reached State Pension age.</li>
        </ul>
        <Callout tone="good" title="Disabled children count">
          The exemption applies when a child in the household gets Disability Living Allowance or PIP, not only when an adult does.
        </Callout>
      </GuideSection>

      <GuideSection id="uc" n={5} kicker="The main route" title="How the cap works on Universal Credit">
        <p>
          Each month, the Department for Work and Pensions works out your Universal Credit as normal, adds Child Benefit and any other counted
          benefit, and compares the total with the cap. Anything over the cap is taken off your Universal Credit. The childcare element is
          protected and paid in full.
        </p>
        <WorkedExample
          title="A couple with three children outside London, social rent of £1,100, not working"
          steps={[
            { label: "Standard allowance", value: "£666.97" },
            { label: "Child elements", value: "£911.82" },
            { label: "Housing element", value: "£1,100.00" },
            { label: "Universal Credit before the cap", value: "£2,678.79" },
            { label: "Plus Child Benefit", value: "£272.35" },
            { label: "Over the £1,835 cap by", value: "−£1,116.14" },
          ]}
          total={{ label: "Universal Credit a month", value: "£1,562.65" }}
        />
        <p>
          The family loses £1,116.14 a month, £13,393.68 a year. With rent of £1,100 out of a capped award of £1,562.65, little is left for
          living costs once rent is paid.
        </p>
      </GuideSection>

      <GuideSection id="working" n={6} kicker="Work" title="Why the first hours of work matter so much">
        <p>
          For a capped household, the first pound of earnings does not reduce benefits at all, because the taper only shrinks the amount above
          the cap. Earnings then lift the cap completely at £881 a month.
        </p>
        <DataTable
          caption="The same family at different take-home pay"
          head={["Take-home pay", "Universal Credit", "Cap reduction", "Pay plus Universal Credit"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£0", "£1,562.65", "£1,116.14", "£1,562.65"],
            ["£500", "£1,562.65", "£1,075.99", "£2,062.65"],
            ["£881", "£2,429.09", "£0", "£3,310.09"],
          ]}
        />
        <Figure label="Pay plus Universal Credit a month" caption="Reaching £881 a month removes the cap and adds £866.44 of Universal Credit.">
          <Bars
            items={[
              { label: "Not working", value: 1562.65 },
              { label: "£500 a month", value: 2062.65 },
              { label: "£881 a month", value: 3310.09 },
            ]}
          />
        </Figure>
        <p>
          At £500 a month the family keeps every penny of their pay. At £881, roughly 16 hours a week at the £12.71 National Living Wage,
          the cap goes and their Universal Credit rises by £866.44 a month. Few changes in the benefits system are worth as much.
        </p>
        <p>
          A couple can combine their earnings to reach £881.
        </p>
      </GuideSection>

      <GuideSection id="grace" n={7} kicker="Breathing space" title="The grace period">
        <p>
          If you or your partner stop work, or your earnings fall below £881, you may get a nine-month grace period before the cap applies.
          On Universal Credit you qualify if your earnings were at least the threshold in each of the 12 months before. On Housing Benefit you
          need to have worked for 50 of the previous 52 weeks.
        </p>
        <Timeline
          items={[
            { when: "Month 0", what: "Job ends or earnings drop", detail: "Tell the Department for Work and Pensions straight away." },
            { when: "Months 1 to 9", what: "Grace period", detail: "Your award is paid in full, without the cap." },
            { when: "Month 10", what: "Cap applies", detail: "Unless you are working again or another exemption applies." },
          ]}
        />
      </GuideSection>

      <GuideSection id="hb" n={8} kicker="Legacy benefits" title="The cap on Housing Benefit">
        <p>
          Households still on legacy benefits, such as Child Tax Credit with Housing Benefit, have the cap applied weekly by their council. It
          is taken from Housing Benefit, which must be left with at least 50p a week.
        </p>
        <WorkedExample
          title="A family outside London with £480 of weekly benefits, including £180 Housing Benefit"
          steps={[
            { label: "Benefits counted", value: "£480.00" },
            { label: "Weekly cap", value: "£423.46" },
            { label: "Reduction to Housing Benefit", value: "−£56.54" },
          ]}
          total={{ label: "Housing Benefit left a week", value: "£123.46" }}
        />
        <p>
          That is £2,940 a year. Most legacy claims have now been moved to Universal Credit, where the cap is applied monthly instead.
        </p>
      </GuideSection>

      <GuideSection id="who-hit" n={9} kicker="In practice" title="Who the cap hits hardest">
        <p>
          The cap mainly reaches households with several children, high rents, or both. With the two-child limit removed in April 2026, larger
          families now get a child element for every child, which pushes more of them into the cap rather than out of it.
        </p>
        <DataTable
          caption="Example capped households outside London, not working"
          head={["Household", "Before the cap", "Cap takes off", "Universal Credit"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Single parent, 2 children, rent £950", "£1,982.78", "£342.56", "£1,640.22"],
            ["Couple, 3 children, rent £1,100", "£2,678.79", "£1,116.14", "£1,562.65"],
            ["Couple, 5 children, rent £1,300", "£3,486.67", "£2,079.15", "£1,407.52"],
          ]}
        />
        <p>
          A single person with no children and rent of £800 is just under their cap, with Universal Credit of £1,224.90 a month. The same
          person with rent of £900 would lose about £93 a month.
        </p>
      </GuideSection>

      <GuideSection id="dhp" n={10} kicker="Extra help" title="Discretionary Housing Payments">
        <p>
          Councils can pay a Discretionary Housing Payment to help with rent when the cap leaves a shortfall. It is not a benefit you are
          entitled to: each council has a fixed budget and decides who to help. Payments are usually for a few months, to give you time to
          find work, move to cheaper housing or claim an exemption.
        </p>
        <p>
          Apply to your council&rsquo;s housing benefit team, even if you get Universal Credit. Explain your plan, for example looking for 16
          hours of work, and include your budget.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={11} kicker="Action plan" title="What to do if you are capped">
        <ol>
          <li>
            <strong>Check every exemption.</strong> A claim for PIP, DLA for a child, or Carer&rsquo;s Allowance can lift the cap completely
            and backdate it.
          </li>
          <li>
            <strong>Ask for a Work Capability Assessment</strong> if a health condition limits your work. The LCWRA health element makes you
            exempt.
          </li>
          <li>
            <strong>Aim for £881 a month</strong> of household take-home pay. The <a href="/benefits/universal-credit-taper">taper calculator</a>{" "}
            shows what extra hours are worth.
          </li>
          <li>
            <strong>Apply for a Discretionary Housing Payment</strong> to cover the gap while you make changes.
          </li>
          <li>
            <strong>Get advice.</strong> Citizens Advice and local welfare rights services check claims for free.
          </li>
        </ol>
      </GuideSection>

      <GuideSection id="london" n={12} kicker="Location" title="London and the rest of England">
        <p>
          The higher London cap only applies inside Greater London. The couple with three children and £1,100 of rent would lose £1,116.14 a
          month outside London but £840.89 in London, where the cap is £275.25 a month higher.
        </p>
        <p>
          Rents in London are much higher, though, so capped London households usually face bigger gaps. Moving out of London lowers your rent
          but also lowers your cap.
        </p>
      </GuideSection>

      <GuideSection id="new-baby" n={13} kicker="Growing families" title="When a new baby arrives">
        <p>
          When a capped family has another child, Universal Credit adds a child element of £303.94 a month and Child Benefit adds £77.57 a
          month. But if the household was already over the cap, none of that reaches them. In fact, because Child Benefit counts towards the
          cap, the family&rsquo;s Universal Credit falls.
        </p>
        <WorkedExample
          title="The same couple outside London with a fourth child"
          steps={[
            { label: "Universal Credit before the cap", value: "£2,982.73" },
            { label: "Cap reduction", value: "−£1,497.65" },
            { label: "Universal Credit", note: "Was £1,562.65 with three children", value: "£1,485.08" },
          ]}
          total={{ label: "Universal Credit plus Child Benefit", value: "Unchanged" }}
        />
        <p>
          Statutory Maternity Pay is not a benefit for the cap, but Maternity Allowance is. Earnings while on paid maternity leave can count
          towards the £881 earnings exemption, so check with your work coach.
        </p>
      </GuideSection>

      <GuideSection id="moving" n={14} kicker="Housing" title="Moving home and the cap">
        <p>
          Because the housing element is usually the largest part of a capped award, rent decides how much the cap takes. A cheaper home cuts
          the amount over the cap pound for pound until you drop below it. The council can sometimes help with a deposit or rent in advance
          through a Discretionary Housing Payment or local welfare scheme.
        </p>
        <p>
          A move into temporary accommodation arranged by the council can be treated differently, as some of these costs are paid through
          Housing Benefit rather than Universal Credit. Ask the council how it will be assessed.
        </p>
      </GuideSection>

      <GuideSection id="challenge" n={15} kicker="Disputes" title="Challenging a cap decision">
        <p>
          If you think the cap has been applied wrongly, for example because someone gets a disability benefit or your earnings were over £881,
          ask for a mandatory reconsideration within one month of the decision. You can do this through your Universal Credit journal. If the
          decision stays the same, you can appeal to an independent tribunal.
        </p>
        <p>
          Common mistakes include not recording an exempt benefit received by a child, missing the grace period, and using the wrong cap for
          an address on the edge of London.
        </p>
      </GuideSection>

      <GuideSection id="exempt-example" n={16} kicker="The difference" title="What an exemption is worth">
        <p>
          A single parent with two children and £950 of social rent loses £342.56 a month to the cap when not working. If one of the children
          is awarded Disability Living Allowance, the cap no longer applies and Universal Credit rises to £1,982.78 a month, before adding the
          disabled child element and the DLA itself.
        </p>
      </GuideSection>

      <GuideSection id="history" n={17} kicker="Background" title="How the cap has changed">
        <Timeline
          items={[
            { when: "2013", what: "Cap introduced", detail: "£26,000 a year for families, the same everywhere in Great Britain." },
            { when: "2016", what: "Cap lowered", detail: "Cut to £20,000 outside London and £23,000 in London, with a lower cap for single people." },
            { when: "April 2023", what: "Cap raised by 10.1%", detail: "To today's £22,020 and £25,323 for families." },
            { when: "April 2026", what: "Still frozen", detail: "The 2026/27 limits are the same as in 2023." },
          ]}
        />
        <p>
          The cap is reviewed at least once every five years. Because it is frozen while benefits rise, the gap between a household&rsquo;s full
          entitlement and what it can actually receive grows a little each April.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={18} kicker="Money" title="Budgeting on a capped award">
        <p>
          A capped award can leave very little after rent. Ask for the housing element to be paid straight to your landlord if that helps you
          keep up with rent. Check whether you can get Council Tax Reduction, help with water charges through a social tariff, and the Warm Home
          Discount, none of which count towards the cap.
        </p>
        <p>
          Free school meals and the Healthy Start scheme also sit outside the cap. Local welfare assistance schemes run by councils can help with
          one-off costs such as cookers, beds or travel to a job interview.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£22,020", label: "Family cap a year outside London" },
            { value: "£14,753", label: "Single cap a year outside London" },
            { value: "£25,323", label: "Family cap a year in London" },
            { value: "£16,967", label: "Single cap a year in London" },
            { value: "£881", label: "Monthly earnings for exemption" },
            { value: "9 months", label: "Grace period" },
            { value: "50p", label: "Minimum Housing Benefit a week" },
            { value: "£0", label: "Cap on the childcare element" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
