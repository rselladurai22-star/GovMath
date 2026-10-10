import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The bonus tax guide. Figures from src/lib/us/withholding.ts (bonusTax, grossUpBonus, supplementalFlat), tax year 2026. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "supplemental", title: "Bonuses are supplemental wages" },
  { id: "flat", title: "The 22% flat rate" },
  { id: "example", title: "Example: a $10,000 bonus" },
  { id: "aggregate", title: "The aggregate method" },
  { id: "withheld-vs-owed", title: "Withheld is not the same as owed" },
  { id: "low-high", title: "Lower and higher salaries" },
  { id: "fica", title: "Social Security and Medicare on a bonus" },
  { id: "million", title: "Bonuses over $1 million" },
  { id: "states", title: "State tax on bonuses" },
  { id: "state-table", title: "A $10,000 bonus in eight states" },
  { id: "k401", title: "Putting a bonus into your 401(k)" },
  { id: "gross-up", title: "Grossed-up bonuses" },
  { id: "timing", title: "December or January?" },
  { id: "other-pay", title: "Commissions, severance, RSUs and back pay" },
  { id: "plan", title: "What to do with the difference" },
  { id: "myths", title: "Myths about bonus tax" },
  { id: "checklist", title: "Checklist when a bonus lands" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS: Publication 15 (2026), Employer's Tax Guide, supplemental wages", href: "https://www.irs.gov/publications/p15" },
  { label: "IRS: Publication 15-T (2026), Federal Income Tax Withholding Methods", href: "https://www.irs.gov/pub/irs-pdf/p15t.pdf" },
  { label: "IRS: Topic 560, Additional Medicare tax", href: "https://www.irs.gov/taxtopics/tc560" },
  { label: "Social Security Administration: Contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
  { label: "California EDD: DE 231PS, withholding on supplemental wages", href: "https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de231ps.pdf" },
  { label: "New York State: NYS-50-T-NYS (2026) withholding tables and methods", href: "https://www.tax.ny.gov/pdf/publications/withholding/nys50_t_nys.pdf" },
];

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function BonusGuide() {
  return (
    <Guide
      kicker="The bonus tax guide"
      title="How a bonus is taxed in 2026, and why the withholding looks so high"
      intro={
        <>
          A bonus is taxed exactly like salary, but it is withheld differently. Employers usually take a flat 22% for federal income tax, plus Social Security, Medicare and state tax, which
          can make a bonus check look small. This guide explains the rules, shows real 2026 figures, and shows how to tell whether you will get some back at tax time.
        </>
      }
      meta={["Tax year 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Federal withholding on a separate bonus is usually a flat 22%, and 37% on any part of the year&rsquo;s bonuses over $1 million.</li>
          <li>Social Security (6.2%) and Medicare (1.45%) come off too, plus state tax in most states.</li>
          <li>Your real tax on the bonus depends on your bracket. If it is below 22%, some comes back; above 22%, you owe more.</li>
          <li>From a $10,000 bonus on an $80,000 salary in Texas, you keep $7,035.</li>
        </ul>
        <KeyStats
          items={[
            { value: "22%", label: "Federal flat rate on bonuses" },
            { value: "37%", label: "Rate on bonuses over $1 million" },
            { value: "7.65%", label: "Social Security and Medicare" },
            { value: "$7,035", label: "Kept from $10,000 (Texas, $80,000 salary)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="supplemental" n={2} kicker="Rules" title="Bonuses are supplemental wages">
        <p>
          The IRS calls pay outside your regular salary or hourly wages &ldquo;supplemental wages&rdquo;: bonuses, commissions, overtime paid separately, severance, back pay, awards and
          prizes, taxable fringe benefits and the income from exercising non-qualified stock options or vesting restricted stock units. Employers can withhold on them in two ways: a flat
          percentage or the aggregate method.
        </p>
      </GuideSection>

      <GuideSection id="flat" n={3} kicker="Method 1" title="The 22% flat rate">
        <p>
          If the bonus is paid separately from your regular pay, or shown as a separate amount on the same check, and tax was withheld from your regular wages this year or last, the employer
          can simply withhold 22%. It ignores your Form W-4: no filing status, no children, no deductions. Most large employers use this method because it is simple.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="Example: a $10,000 bonus">
        <WorkedExample
          title="$10,000 bonus, $80,000 salary, single, Texas (no state income tax)"
          steps={[
            { label: "Bonus", value: "$10,000" },
            { label: "Federal income tax at 22%", value: "−$2,200" },
            { label: "Social Security at 6.2%", value: "−$620" },
            { label: "Medicare at 1.45%", value: "−$145" },
          ]}
          total={{ label: "Bonus check", value: "$7,035" }}
        />
        <p>
          At $80,000 the next dollars of salary are taxed at 22%, so for this worker the flat rate is right on: the bonus adds exactly $2,200 to the 2026 tax bill. Nothing comes back and
          nothing more is owed.
        </p>
      </GuideSection>

      <GuideSection id="aggregate" n={5} kicker="Method 2" title="The aggregate method">
        <p>
          If the bonus is lumped in with a regular paycheck without being split out, payroll must use the aggregate method. It adds the bonus to that paycheck, works out withholding on the total
          with the normal tables as if you were paid that much every payday, and subtracts what it would have withheld on the regular pay alone.
        </p>
        <CompareCards
          columns={[
            {
              name: "Flat rate",
              rows: [
                { label: "Federal withheld", value: "$2,200" },
                { label: "Real extra tax", value: "$2,200" },
                { label: "Back at tax time", value: "$0" },
              ],
            },
            {
              name: "Aggregate, biweekly pay",
              rows: [
                { label: "Federal withheld", value: "$2,822" },
                { label: "Real extra tax", value: "$2,200" },
                { label: "Back at tax time", value: "$622" },
              ],
            },
            {
              name: "Aggregate, monthly pay",
              rows: [
                { label: "Federal withheld", value: "$2,330" },
                { label: "Real extra tax", value: "$2,200" },
                { label: "Back at tax time", value: "$130" },
              ],
            },
          ]}
        />
        <p>
          The same $10,000 bonus on an $80,000 salary: the aggregate method treats a biweekly paycheck of $13,077 as if it came 26 times a year, which reaches the 35% withholding
          band. The extra comes back as a refund, but not until 2027.
        </p>
      </GuideSection>

      <GuideSection id="withheld-vs-owed" n={6} kicker="Key idea" title="Withheld is not the same as owed">
        <p>
          Withholding is only a down payment. Your bonus is added to your other income on your 2026 return and taxed at your real brackets. If more was withheld than the bonus actually adds to
          your tax, the difference is part of your refund; if less, it shows up as a smaller refund or a balance due. The calculator&rsquo;s &ldquo;Withheld now versus your real tax&rdquo;
          card shows both, and the <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows which bracket your bonus falls in.
        </p>
      </GuideSection>

      <GuideSection id="low-high" n={7} kicker="Examples" title="Lower and higher salaries">
        <DataTable
          caption="A $10,000 bonus, flat 22% withholding, Texas, 2026"
          head={["Salary and status", "Federal withheld", "Real extra federal tax", "At tax time"]}
          numeric={[1, 2, 3]}
          rows={[
            ["$40,000, single", "$2,200", "$1,200", "$1,000 back"],
            ["$120,000, married jointly, 2 children", "$2,200", "$1,200", "$1,000 back"],
            ["$80,000, single", "$2,200", "$2,200", "Even"],
            ["$180,000, single", "$2,200", "$2,400", "$200 more to pay"],
            ["$250,000, single", "$2,200", "$3,200", "$1,000 more to pay"],
          ]}
        />
        <Bars
          format={(n) => `${n}%`}
          items={[
            { label: "$40,000", value: 12 },
            { label: "$80,000", value: 22 },
            { label: "$180,000", value: 24 },
            { label: "$250,000", value: 32 },
          ]}
        />
        <p>
          The bars show the real federal rate on the bonus for a single filer. Below about $66,500 of salary (single) the flat rate over-withholds; well above $121,800 it under-withholds. If you
          are in the 32% bracket or higher, set aside the extra or add it to Step 4(c) of your W-4 with the <a href="/us/taxes/w4-withholding-calculator">W-4 withholding calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="fica" n={8} kicker="Payroll tax" title="Social Security and Medicare on a bonus">
        <p>
          Social Security tax is 6.2% on pay up to the 2026 wage base of $184,500; above it, nothing. Medicare is 1.45% on all pay, and employers add 0.9% Additional Medicare Tax once your
          pay from them passes $200,000 in the calendar year.
        </p>
        <ul>
          <li>On a $180,000 salary, only $4,500 of a $10,000 bonus is under the wage base: $279 of Social Security instead of $620.</li>
          <li>On a $250,000 salary, there is no Social Security on the bonus, but Medicare is $235 (2.35%).</li>
        </ul>
        <p>These taxes are final: there is no refund of Social Security or Medicare when you file, unless two employers together took Social Security on more than $184,500.</p>
      </GuideSection>

      <GuideSection id="million" n={9} kicker="Large bonuses" title="Bonuses over $1 million">
        <p>
          Once your supplemental wages from one employer pass $1 million in a calendar year, withholding on the excess must be 37%, whatever your W-4 says, even if you claimed exempt. The first $1
          million can still be withheld at 22%.
        </p>
        <WorkedExample
          title="A $1.5 million bonus on a $500,000 salary, single, Texas"
          steps={[
            { label: "22% on the first $1,000,000", value: "$220,000" },
            { label: "37% on the other $500,000", value: "$185,000" },
            { label: "Federal withheld", value: "$405,000" },
            { label: "Real extra federal tax on the bonus", value: "$551,866" },
          ]}
          total={{ label: "Still to pay with the return", value: "$146,866" }}
        />
        <p>Large bonuses and equity payouts are where underpayment bites hardest; an estimated payment soon after the bonus is the usual fix.</p>
      </GuideSection>

      <GuideSection id="states" n={10} kicker="State tax" title="State tax on bonuses">
        <p>Each state sets its own withholding rules for supplemental pay. They fall into three groups:</p>
        <ul>
          <li>
            <strong>States with a published bonus rate.</strong>{" "}California withholds 10.23% on bonuses and stock options (6.6% on other supplemental pay), plus 1.3% State Disability
            Insurance. New York&rsquo;s 2026 supplemental rate is 11.70%, and New York City adds 4.25%.
          </li>
          <li>
            <strong>Flat-tax states.</strong>{" "}States such as Illinois (4.95%), Pennsylvania (3.07%), North Carolina (3.99%) and Massachusetts (5%) tax all pay at one rate, so the bonus
            is withheld at about that rate.
          </li>
          <li>
            <strong>No income tax.</strong>{" "}Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming take nothing.
          </li>
        </ul>
        <p>
          Other states either use their normal withholding tables or offer an optional flat rate. For those, the calculator shows the extra state tax the bonus really adds to your year, from
          the 2026 state brackets. The <a href="/us/taxes/state-income-tax-calculator">state income tax calculator</a>{" "}compares all 50 states.
        </p>
      </GuideSection>

      <GuideSection id="state-table" n={11} kicker="Comparison" title="A $10,000 bonus in eight states">
        <DataTable
          caption="$10,000 bonus, $80,000 salary, single, flat federal 22%, 2026"
          head={["State", "State withheld", "Real extra state tax", "Bonus check"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Texas", "$0", "$0", "$7,035"],
            ["Pennsylvania", "$307", "$307", "$6,728"],
            ["North Carolina", "$399", "$399", "$6,636"],
            ["Illinois", "$495", "$495", "$6,540"],
            ["Massachusetts", "$500", "$500", "$6,535"],
            ["California (with SDI)", "$1,153", "$1,060", "$5,882"],
            ["New York", "$1,170", "$547", "$5,865"],
          ]}
        />
        <p>
          New York&rsquo;s 11.70% supplemental rate is far above the 5.4% and 5.9% brackets an $80,000 earner pays, so about $623 of the state withholding comes back on the New York return. The
          California rate of 10.23% is also above this worker&rsquo;s 9.3% bracket, so about $93 comes back there.
        </p>
      </GuideSection>

      <GuideSection id="k401" n={12} kicker="Saving" title="Putting a bonus into your 401(k)">
        <p>
          Many plans take your usual deferral percentage from bonuses too, and some let you set a separate bonus rate. A traditional 401(k) deferral comes off before federal income tax (and
          state tax in most states), but Social Security and Medicare still apply.
        </p>
        <WorkedExample
          title="The $10,000 bonus with 10% going to a traditional 401(k)"
          steps={[
            { label: "401(k) deferral", value: "$1,000" },
            { label: "Federal at 22% on $9,000", value: "$1,980" },
            { label: "Social Security and Medicare on $10,000", value: "$765" },
          ]}
          total={{ label: "Bonus check", value: "$6,255" }}
        />
        <p>
          Saving $1,000 cuts the check by only $780, because $220 of tax is deferred. The 2026 limit is $24,500, plus $8,000 at 50 or older; the{" "}
          <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows how it grows.
        </p>
      </GuideSection>

      <GuideSection id="gross-up" n={13} kicker="For employers" title="Grossed-up bonuses">
        <p>
          A grossed-up bonus is sized so the employee receives a set amount after withholding. Because every extra dollar of bonus is itself withheld, the gross is well above the net: to hand an
          $80,000 Texas employee $5,000 after the 22% flat rate and payroll taxes, the bonus must be about $7,107. In a state with income tax, it is higher still. Enter the take-home you want
          under More options to see the gross.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={14} kicker="Planning" title="December or January?">
        <Timeline
          items={[
            { when: "Paid by December 31, 2026", what: "Counts as 2026 income", detail: "Taxed on your 2026 return, filed by April 15, 2027." },
            { when: "Paid in January 2027", what: "Counts as 2027 income", detail: "A year later to pay; useful if your 2027 income will be lower, for example after retiring." },
            { when: "Any time", what: "Social Security restarts each January", detail: "If your pay is near the wage base, a January bonus pays 6.2% that a December one may not." },
          ]}
        />
        <p>
          Employees rarely choose the date, and you can&rsquo;t defer a bonus you have already earned and been offered just by not cashing the check. But if a choice is offered in advance, the
          year matters most when your income or tax rate will change.
        </p>
      </GuideSection>

      <GuideSection id="other-pay" n={15} kicker="Related pay" title="Commissions, severance, RSUs and back pay">
        <p>
          The same supplemental rules cover commissions, severance and back pay. Restricted stock units are taxed as wages when they vest, and employers often sell some shares to cover 22%
          withholding; at high incomes that leaves a gap. Non-qualified stock option exercises work the same way. Overtime paid with your regular wages is not supplemental, though the overtime
          premium may be deductible from 2025 to 2028; see the <a href="/us/taxes/overtime-calculator">overtime calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="plan" n={16} kicker="Action" title="What to do with the difference">
        <CompareCards
          columns={[
            {
              name: "Over-withheld (bracket below 22%)",
              rows: [
                { label: "What happens", value: "The excess is part of your refund" },
                { label: "To get it sooner", value: "Lower withholding on later paychecks with a W-4 change" },
              ],
            },
            {
              name: "Under-withheld (bracket above 22%)",
              rows: [
                { label: "What happens", value: "Smaller refund or a bill in April" },
                { label: "To avoid it", value: "Set aside the gap, add Step 4(c), or make an estimated payment" },
              ],
            },
          ]}
        />
        <Callout tone="warn" title="Watch the $1,000 line">
          Owing $1,000 or more at filing can bring an underpayment penalty unless your withholding covered 90% of this year&rsquo;s tax or 100% of last year&rsquo;s (110% above $150,000 of AGI).
        </Callout>
      </GuideSection>

      <GuideSection id="myths" n={17} kicker="Clearing up" title="Myths about bonus tax">
        <ul>
          <li>
            <strong>&ldquo;Bonuses are taxed at a higher rate.&rdquo;</strong>{" "}No. They are taxed at the same brackets as salary; only the withholding is different.
          </li>
          <li>
            <strong>&ldquo;A bonus can push all my income into a higher bracket.&rdquo;</strong>{" "}No. Only the dollars above a bracket line are taxed at the higher rate.
          </li>
          <li>
            <strong>&ldquo;The 22% is the final tax.&rdquo;</strong>{" "}No. It is settled on your return.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="checklist" n={18} kicker="To do" title="Checklist when a bonus lands">
        <ul>
          <li>Check the pay stub: which method was used and how much state tax was taken.</li>
          <li>Find your real rate on the bonus in the calculator above.</li>
          <li>If you will owe, set the gap aside or update your W-4 for the rest of the year.</li>
          <li>Decide on a 401(k) or IRA contribution while the cash is fresh.</li>
          <li>
            Check your <a href="/us/taxes/paycheck-calculator">regular paycheck</a>{" "}afterwards: a large bonus can use up the Social Security wage base and raise later checks.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "22%", label: "Federal flat rate, up to $1 million" },
            { value: "37%", label: "Federal rate above $1 million" },
            { value: usd(184_500), label: "Social Security wage base" },
            { value: "0.9%", label: "Extra Medicare above $200,000" },
            { value: "10.23%", label: "California bonus rate" },
            { value: "11.70%", label: "New York supplemental rate" },
            { value: "$24,500", label: "401(k) limit" },
            { value: "April 15, 2027", label: "2026 returns due" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
