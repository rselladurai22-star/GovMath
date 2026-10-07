import { CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Tipping: the guide. Examples from tip() in src/lib/us/pay.ts; the tips deduction from tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How to work out a tip" },
  { id: "before-after", title: "Before or after tax?" },
  { id: "split", title: "Splitting the bill" },
  { id: "round", title: "Rounding up" },
  { id: "norms", title: "How much to tip" },
  { id: "service-charge", title: "Service charges and automatic gratuity" },
  { id: "screens", title: "Tip screens and counter service" },
  { id: "bad-service", title: "When service is poor" },
  { id: "why", title: "Why tips matter to servers" },
  { id: "no-tax-on-tips", title: "No tax on tips for workers" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Emily Post Institute: General tipping guide", href: "https://emilypost.com/advice/general-tipping-guide" },
  { label: "U.S. Department of Labor: Fact Sheet 15, tipped employees under the FLSA", href: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa" },
  { label: "IRS: One, Big, Beautiful Bill Act tax deductions for working Americans and seniors", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors" },
  { label: "IRS: Topic no. 761, tips (withholding and reporting)", href: "https://www.irs.gov/taxtopics/tc761" },
];

export default function TipGuide() {
  return (
    <Guide
      kicker="The tipping guide"
      title="How much to tip, and how to split the bill"
      intro={
        <>
          Tipping is part of paying for many services in the US, and the amounts can be confusing. This guide shows how to work out a tip in your head,
          whether to tip before or after tax, how to split a check fairly and what most people leave for common services.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Sit-down restaurants: 15% to 20% of the bill before tax.</li>
          <li>Tip = bill × tip rate. Total = bill + tax + tip.</li>
          <li>To split, divide the total by the number of people.</li>
        </ul>
        <KeyStats
          items={[
            { value: "15–20%", label: "Restaurant table service" },
            { value: "$14.40", label: "18% of an $80 bill" },
            { value: "$2.13", label: "Federal tipped cash wage an hour" },
            { value: "$25,000", label: "Tips workers can deduct a year" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How to work out a tip">
        <p>Multiply the bill by the tip rate as a decimal. In your head, it is easiest to start from 10%: move the decimal point one place to the left.</p>
        <DataTable
          caption="Tips on common bills"
          head={["Tip", "On $50", "On $100"]}
          numeric={[1, 2]}
          rows={[
            ["15%", "$7.50", "$15.00"],
            ["18%", "$9.00", "$18.00"],
            ["20%", "$10.00", "$20.00"],
            ["22%", "$11.00", "$22.00"],
            ["25%", "$12.50", "$25.00"],
          ]}
        />
        <ul>
          <li>20%: find 10% and double it.</li>
          <li>15%: find 10% and add half of it again.</li>
          <li>18%: find 20% and take off a tenth of the 20% figure.</li>
        </ul>
      </GuideSection>

      <GuideSection id="before-after" n={3} kicker="Etiquette" title="Before or after tax?">
        <p>
          The Emily Post Institute suggests working out restaurant tips on the bill before tax. Many people tip on the total for simplicity, which adds a
          little. On an $80 bill with $6.60 of tax, an 18% tip is $14.40 before tax or $15.59 after it.
        </p>
        <CompareCards
          columns={[
            {
              name: "Tip on the bill before tax",
              rows: [
                { label: "18% of $80", value: "$14.40" },
                { label: "Total", value: "$101.00" },
              ],
            },
            {
              name: "Tip on the total after tax",
              rows: [
                { label: "18% of $86.60", value: "$15.59" },
                { label: "Total", value: "$102.19" },
              ],
            },
          ]}
        />
        <p>
          The <a href="/us/taxes/sales-tax-calculator">sales tax calculator</a>{" "}shows the tax rate where you are if it is not printed on the check.
        </p>
      </GuideSection>

      <GuideSection id="split" n={4} kicker="Groups" title="Splitting the bill">
        <WorkedExample
          title="$150 bill, $12 tax, 20% tip, four people"
          steps={[
            { label: "Tip: 20% of $150", value: "$30.00" },
            { label: "Total: $150 + $12 + $30", value: "$192.00" },
            { label: "Each: $192 ÷ 4", value: "$48.00" },
          ]}
          total={{ label: "Each person pays", value: "$48.00" }}
        />
        <p>
          An even split is simplest. If one person ordered far more, it is fairer for each to pay their own items plus their share of tax and tip, at the
          same tip rate. Many restaurants will split a check by seat if you ask before ordering.
        </p>
      </GuideSection>

      <GuideSection id="round" n={5} kicker="Rounding" title="Rounding up">
        <p>
          Rounding each share up to a whole dollar makes paying easier and adds a little to the tip. A $64.50 bill with $5.50 tax and a 20% tip comes to
          $82.90, or $27.63 each for three people. If each pays $28, the tip rises from $12.90 to $14.00.
        </p>
      </GuideSection>

      <GuideSection id="norms" n={6} kicker="Guidelines" title="How much to tip">
        <p>These are common US guidelines, from the Emily Post Institute&rsquo;s tipping guide. They are customs, not rules, and they vary by region.</p>
        <DataTable
          caption="Common US tipping guidelines"
          head={["Service", "Usual tip"]}
          rows={[
            ["Sit-down restaurant", "15% to 20% of the bill before tax"],
            ["Buffet", "10%"],
            ["Bartender", "$1 to $2 a drink, or 15% to 20% of the tab"],
            ["Takeout", "Optional; about 10% for a large order or curbside service"],
            ["Food delivery", "10% to 15% of the bill; $2 to $5 for pizza"],
            ["Taxi", "15% to 20% of the fare"],
            ["Hair stylist or barber", "15% to 20%"],
            ["Hotel housekeeping", "$2 to $5 a night, left daily"],
            ["Valet parking", "$2 to $5 when the car comes back"],
            ["Coffee shop counter", "Optional"],
          ]}
        />
      </GuideSection>

      <GuideSection id="service-charge" n={7} kicker="Read the check" title="Service charges and automatic gratuity">
        <p>
          Some restaurants add a service charge, often 18% to 20% for groups of six or more. Read the bill before you tip so you don&rsquo;t pay twice. A
          service charge is set by the restaurant and is not legally a tip: it may go to staff, partly to the business, or toward wages. If you want to be
          sure your server benefits, ask, or leave a little extra in cash.
        </p>
      </GuideSection>

      <GuideSection id="screens" n={8} kicker="Card readers" title="Tip screens and counter service">
        <p>
          Payment tablets at coffee shops, food trucks and stores often suggest 18%, 20% or 25%, sometimes worked out on the total after tax. Those are
          prompts, not prices. Where you order and pick up at a counter, a tip is optional; leaving a dollar or rounding up is generous, and choosing
          &ldquo;no tip&rdquo; is acceptable. Check whether the suggested amounts are percentages of the bill before or after tax before you tap.
        </p>
      </GuideSection>

      <GuideSection id="bad-service" n={9} kicker="Etiquette" title="When service is poor">
        <p>
          If something went wrong, think about who caused it. A slow kitchen or a missing ingredient is rarely the server&rsquo;s fault. Many people still
          leave at least 10% and speak to a manager about real problems, which is more likely to get them fixed than a missing tip.
        </p>
      </GuideSection>

      <GuideSection id="why" n={10} kicker="Background" title="Why tips matter to servers">
        <p>
          Under the Fair Labor Standards Act, employers can pay tipped employees a cash wage of just $2.13 an hour and count tips toward the rest of the
          $7.25 federal minimum wage. If tips fall short, the employer must make up the difference. Several states, including California, require the full
          state minimum wage before tips. In much of the country, though, tips are most of a server&rsquo;s pay.
        </p>
      </GuideSection>

      <GuideSection id="no-tax-on-tips" n={11} kicker="Tax" title="No tax on tips for workers">
        <p>
          For tax years 2025 to 2028, people who earn tips in jobs that customarily received tips can deduct up to $25,000 of qualified tips a year from
          their federal taxable income. Cash and card tips both count, as do tips shared through a tip pool, if they are reported on a Form W-2, Form 1099
          or Form 4137.
        </p>
        <ul>
          <li>The deduction shrinks by $100 for each $1,000 of modified AGI above $150,000 ($300,000 on a joint return).</li>
          <li>You need a Social Security number on the return, and married couples must file jointly.</li>
          <li>You can claim it whether or not you itemize.</li>
          <li>Tips are still subject to Social Security and Medicare, and to state tax where the state taxes them.</li>
        </ul>
        <p>
          The <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}includes the tips deduction, and the{" "}
          <a href="/us/taxes/overtime-calculator">overtime calculator</a>{" "}covers the matching deduction for overtime.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={12} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "15–20%", label: "Restaurant tip, before tax" },
            { value: "10%", label: "Buffet, or a big takeout order" },
            { value: "$2.13", label: "Federal tipped cash wage" },
            { value: "$25,000", label: "Tips deduction limit, 2025–2028" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
