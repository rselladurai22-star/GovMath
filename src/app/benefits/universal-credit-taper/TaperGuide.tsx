import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Universal Credit taper — the guide. Figures from src/lib/benefits/uc-work.ts and uc-engine.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "taper", title: "How the taper works" },
  { id: "work-allowance", title: "The work allowance" },
  { id: "tax", title: "Adding tax and National Insurance" },
  { id: "hours", title: "What extra hours are worth" },
  { id: "rates", title: "Your real rate of withdrawal" },
  { id: "pension", title: "Pension contributions on Universal Credit" },
  { id: "couples", title: "Couples and second earners" },
  { id: "self-employed", title: "Self-employed claimants" },
  { id: "timing", title: "Paydays and assessment periods" },
  { id: "leaving", title: "Earning your way off Universal Credit" },
  { id: "cap-link", title: "The taper and the benefit cap" },
  { id: "childcare-work", title: "Childcare costs and working more" },
  { id: "pay-rise", title: "A pay rise or more hours" },
  { id: "second-earner-example", title: "A second earner in numbers" },
  { id: "plan", title: "Planning your hours" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Universal Credit and earnings", href: "https://www.gov.uk/universal-credit/how-your-earnings-affect-your-payments" },
  { label: "GOV.UK — Universal Credit: what you'll get", href: "https://www.gov.uk/universal-credit/what-youll-get" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Universal Credit and self-employment", href: "https://www.gov.uk/self-employment-and-universal-credit" },
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
];

export default function TaperGuide() {
  return (
    <Guide
      kicker="The Universal Credit taper guide"
      title="How much you keep when you earn more on Universal Credit"
      intro={
        <>
          Universal Credit does not stop when you start work. It falls gradually as your pay rises, so working more always leaves you better
          off. But between the taper, Income Tax and National Insurance, the gain is often smaller than people expect. This guide shows how
          the sums work in 2026/27 and how to make extra hours count.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Universal Credit falls by <strong>55p for every £1</strong> of take-home pay above your work allowance.
          </li>
          <li>
            If you have children or a health condition, the first <strong>£427</strong> a month (with help for rent) or <strong>£710</strong>{" "}
            (without) is ignored.
          </li>
          <li>
            Once you also pay Income Tax and National Insurance, you keep about <strong>32p</strong> of each extra pound of gross pay.
          </li>
          <li>A pound paid into a pension costs you only about 32p, which makes pension saving unusually cheap on Universal Credit.</li>
        </ul>
        <KeyStats
          items={[
            { value: "55%", label: "Taper rate" },
            { value: "£427 / £710", label: "Work allowance a month" },
            { value: "32p", label: "Kept per extra £1 for a basic-rate taxpayer" },
            { value: "45p", label: "Kept per extra £1 below the tax threshold" },
          ]}
        />
      </GuideSection>

      <GuideSection id="taper" n={2} kicker="The rule" title="How the taper works">
        <p>
          Each month, Universal Credit starts from your maximum award, the total of your standard allowance and any elements for children,
          rent, health, caring and childcare. It then takes off 55% of your take-home pay above your work allowance. What is left is your
          award.
        </p>
        <p>
          The taper uses take-home pay, not gross pay. That means earnings after Income Tax, National Insurance and pension contributions.
          Your employer reports what they paid you each month through the PAYE system and the Department for Work and Pensions uses that
          figure automatically.
        </p>
        <Callout title="The taper is a straight line">
          There are no cliff edges in Universal Credit. Every extra pound of take-home pay reduces the award by the same 55p until the award
          reaches zero. That is a big change from the old tax credits and Jobseeker&rsquo;s Allowance, where working 16 hours or 30 hours
          could make a sudden difference.
        </Callout>
      </GuideSection>

      <GuideSection id="work-allowance" n={3} kicker="Earnings ignored" title="The work allowance">
        <p>Only some households get a work allowance. You get one if your claim includes:</p>
        <ul>
          <li>a child or qualifying young person; or</li>
          <li>limited capability for work, with or without work-related activity.</li>
        </ul>
        <CompareCards
          columns={[
            {
              name: "With housing costs",
              rows: [
                { label: "Work allowance", value: "£427 a month" },
                { label: "Applies when", value: "Your award includes help with rent" },
              ],
            },
            {
              name: "Without housing costs",
              rows: [
                { label: "Work allowance", value: "£710 a month" },
                { label: "Applies when", value: "You own your home or pay no rent" },
              ],
            },
            {
              name: "No children or health condition",
              rows: [
                { label: "Work allowance", value: "None" },
                { label: "Effect", value: "The taper starts at the first £1" },
              ],
            },
          ]}
        />
        <p>
          A couple has one work allowance between them, not one each. If one partner&rsquo;s pay already uses it up, every pound the other
          earns is tapered from the start.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={4} kicker="The full picture" title="Adding tax and National Insurance">
        <p>
          In 2026/27 Income Tax and National Insurance both start at £12,570 a year, about £1,047.50 a month. Above that, a basic-rate
          taxpayer in England, Wales or Northern Ireland pays 20% tax and 8% National Insurance, so £1 of gross pay becomes 72p of take-home
          pay. Universal Credit then takes 55% of that 72p.
        </p>
        <WorkedExample
          title="An extra £100 of gross pay, basic-rate taxpayer above the work allowance"
          steps={[
            { label: "Extra gross pay", value: "£100.00" },
            { label: "Income Tax at 20%", value: "−£20.00" },
            { label: "National Insurance at 8%", value: "−£8.00" },
            { label: "Extra take-home pay", value: "£72.00" },
            { label: "Universal Credit taper, 55% of £72", value: "−£39.60" },
          ]}
          total={{ label: "You keep", value: "£32.40" }}
        />
        <p>
          That is an effective tax rate of 67.6%, higher than the 45% additional rate of Income Tax. It is the price of a system that pays
          help to people in work, rather than stopping it the moment they find a job.
        </p>
      </GuideSection>

      <GuideSection id="hours" n={5} kicker="Real examples" title="What extra hours are worth">
        <p>
          Take a single parent with one child, no rent to pay and the National Living Wage of £12.71 an hour. Their maximum award is £728.84 a
          month and their work allowance is £710.
        </p>
        <DataTable
          caption="Single parent, one child, no rent, £12.71 an hour, 2026/27"
          head={["Hours a week", "Gross pay", "Take-home", "Universal Credit", "Total a month"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["0", "£0", "£0", "£728.84", "£728.84"],
            ["8", "£440.61", "£440.61", "£728.84", "£1,169.45"],
            ["16", "£881.23", "£881.23", "£634.67", "£1,515.89"],
            ["24", "£1,321.84", "£1,245.02", "£434.58", "£1,679.60"],
            ["30", "£1,652.30", "£1,482.96", "£303.71", "£1,786.67"],
            ["37.5", "£2,065.38", "£1,780.37", "£140.14", "£1,920.51"],
          ]}
        />
        <Figure label="Total income a month by hours worked" caption="Every step up adds income, but by less as tax and the taper both apply.">
          <Bars
            items={[
              { label: "0 hours", value: 728.84 },
              { label: "8 hours", value: 1169.45 },
              { label: "16 hours", value: 1515.89 },
              { label: "24 hours", value: 1679.6 },
              { label: "30 hours", value: 1786.67 },
              { label: "37.5 hours", value: 1920.51 },
            ]}
          />
        </Figure>
        <p>
          The first 8 hours are worth their full £440.61, because the pay sits inside the work allowance. Going from 16 to 24 hours adds
          £440.61 of gross pay but only £163.71 of income, 37p in the pound. Going from 30 to 37.5 hours adds £413.08 but only £133.84, or
          32p in the pound. Universal Credit for this family would stop at about 44 hours a week.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={6} kicker="Marginal rates" title="Your real rate of withdrawal">
        <p>How much of an extra pound you keep depends on where your pay sits:</p>
        <DataTable
          caption="Share of an extra £1 of gross pay you keep, England 2026/27"
          head={["Your situation", "You keep"]}
          numeric={[1]}
          rows={[
            ["Pay within your work allowance", "100p"],
            ["Above the work allowance, below the tax threshold", "45p"],
            ["Above the work allowance and the tax threshold", "32p"],
            ["Off Universal Credit, basic-rate taxpayer", "72p"],
          ]}
        />
        <p>
          Scottish taxpayers pay slightly different Income Tax rates, from 19% to 21% in the bands most claimants fall into, so their figure
          is a little either side of 32p. Student loan repayments, which start at different thresholds depending on your plan, reduce it
          further.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={7} kicker="A hidden boost" title="Pension contributions on Universal Credit">
        <p>
          Because Universal Credit counts pay after pension contributions, the same high withdrawal rate works in reverse when you save into a
          pension. For a basic-rate taxpayer, putting £100 a month into a workplace pension through salary sacrifice reduces take-home pay by
          £72, but Universal Credit rises by £39.60. Household income falls by only £32.40.
        </p>
        <WorkedExample
          title="£100 a month into a pension, single parent earning £2,000 gross"
          steps={[
            { label: "Pension contribution", value: "£100.00" },
            { label: "Take-home pay falls by", value: "−£72.00" },
            { label: "Universal Credit rises by", value: "+£39.60" },
          ]}
          total={{ label: "Real cost to you", value: "£32.40" }}
        />
        <p>
          Your employer usually adds a contribution of their own on top. Auto-enrolment means most employees aged 22 or over earning more than
          £10,000 a year are already saving 5% of qualifying earnings. Opting out would raise take-home pay but cut your Universal Credit, so
          you would gain far less than the contribution.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={8} kicker="Two earners" title="Couples and second earners">
        <p>
          A couple&rsquo;s earnings are added together. There is one work allowance and one taper for the household. The first partner&rsquo;s
          pay usually uses up the work allowance, so a second earner faces the 55% taper on their first pound, on top of tax once they pass
          £12,570 a year.
        </p>
        <p>
          The second earner&rsquo;s pay can still be worthwhile. It may unlock help with childcare, which pays back 85% of costs only when both
          partners work. It also lifts the household above the £881 a month earnings threshold for the benefit cap, which can be worth far
          more than the taper takes away.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={9} kicker="Working for yourself" title="Self-employed claimants">
        <p>
          If you are self-employed, you report your income and allowable expenses each month and the taper applies to the profit. After a
          12-month start-up period, the minimum income floor may treat you as earning at least the National Living Wage for the hours you are
          expected to work, usually 35 a week, less tax and National Insurance. Earning less than that does not raise your award.
        </p>
        <p>
          Losses and surplus earnings from earlier months can be carried forward, so a good month followed by a poor one can affect your award
          for several months.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={10} kicker="Monthly rhythm" title="Paydays and assessment periods">
        <p>
          Universal Credit is worked out on what you were paid in each monthly assessment period, not on what you earned in it. A one-off
          bonus or overtime payment reduces that month&rsquo;s award by 55p in the pound and the award returns the next month.
        </p>
        <Callout tone="warn" title="Weekly and four-weekly pay">
          If you are paid every four weeks, once a year two paydays fall in one assessment period. The award drops sharply that month and you
          may get nothing. It is not lost for good: the next month is based on one payday again.
        </Callout>
        <p>
          If a payday moves because of a weekend or bank holiday, tell the Department for Work and Pensions through your journal. In some
          cases they can treat the pay as belonging to the right month.
        </p>
      </GuideSection>

      <GuideSection id="leaving" n={11} kicker="The end of the claim" title="Earning your way off Universal Credit">
        <p>
          Your award reaches zero when 55% of your take-home pay above the work allowance equals your maximum award. The point varies widely.
          For a single person with no children and £500 of rent, it comes at about £1,682 of take-home pay, or £1,928 gross, which is a 35-hour
          week at the National Living Wage.
        </p>
        <p>
          If your earnings take you to zero, the claim stays open for up to six assessment periods. If your pay falls again in that time,
          payments restart without a new claim. That makes it safer to try a better-paid job or more hours.
        </p>
      </GuideSection>

      <GuideSection id="cap-link" n={12} kicker="Two systems" title="The taper and the benefit cap">
        <p>
          The benefit cap limits the total of most benefits for households not in work. Earning £881 a month or more after tax removes it
          completely. Sixteen hours a week at the £12.71 National Living Wage is £881.23 a month, enough to clear it.
        </p>
        <p>
          For a capped household, those first hours can be worth more than the pay itself. The{" "}
          <a href="/benefits/benefit-cap">benefit cap calculator</a> shows the effect for your household.
        </p>
      </GuideSection>

      <GuideSection id="childcare-work" n={13} kicker="Working parents" title="Childcare costs and working more">
        <p>
          Extra hours often mean extra childcare. Universal Credit pays back 85% of registered childcare costs, up to £1,071.09 a month for one
          child, and this is added to your maximum award before the taper is applied.
        </p>
        <WorkedExample
          title="Single parent, one child, 24 hours a week, £400 a month of childcare"
          steps={[
            { label: "Universal Credit without childcare costs", value: "£434.58" },
            { label: "Childcare element, 85% of £400", value: "+£340.00" },
            { label: "Universal Credit with childcare costs", value: "£774.58" },
            { label: "Childcare paid out", value: "−£400.00" },
          ]}
          total={{ label: "Net cost of the childcare", value: "£60.00" }}
        />
        <p>
          So the childcare costs this parent £60 a month, not £400. Report the costs in your journal in the assessment period you pay them,
          with a receipt or invoice, or they will not be included.
        </p>
      </GuideSection>

      <GuideSection id="pay-rise" n={14} kicker="Pay" title="A pay rise or more hours">
        <p>
          The taper treats every extra pound the same way, whether it comes from more hours, overtime or a higher hourly rate. A rise from
          £12.71 to £13.50 an hour on a 30-hour week adds £102.70 of gross pay a month. After tax, National Insurance and the taper, the
          household is £33.27 better off, about 32p in the pound.
        </p>
        <p>
          A pay rise has one advantage: it brings no extra travel or childcare costs. Extra hours can bring both, so add those to the
          calculation before you decide.
        </p>
      </GuideSection>

      <GuideSection id="second-earner-example" n={15} kicker="Couples" title="A second earner in numbers">
        <p>
          Take a couple with two children and social rent of £700, where one partner already takes home £1,200 a month. If the other partner
          starts 16 hours a week at the National Living Wage, earning £881.23 a month, their Universal Credit falls from £1,549.70 to
          £1,065.03.
        </p>
        <p>
          The household is £396.55 a month better off, which is 45p of each pound earned. Their pay is under the tax threshold, so only the
          taper applies.
        </p>
      </GuideSection>

      <GuideSection id="plan" n={16} kicker="Checklist" title="Planning your hours">
        <ol>
          <li>Work out your work allowance. Earnings inside it are yours to keep in full.</li>
          <li>Check whether reaching £881 a month would lift the benefit cap for your household.</li>
          <li>Add in childcare and travel costs, remembering the 85% childcare element.</li>
          <li>Consider paying more into a workplace pension, which costs you about a third of its value.</li>
          <li>Think about the timing of paydays, especially if you are paid weekly or four-weekly.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "55%", label: "Taper on take-home pay" },
            { value: "£427", label: "Work allowance with housing costs" },
            { value: "£710", label: "Work allowance without housing costs" },
            { value: "£12,570", label: "Tax and NI start, a year" },
            { value: "32.4p", label: "Kept per £1, basic-rate taxpayer" },
            { value: "£12.71", label: "National Living Wage an hour" },
            { value: "£881", label: "Earnings that remove the benefit cap" },
            { value: "6 months", label: "Claim stays open at a nil award" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
