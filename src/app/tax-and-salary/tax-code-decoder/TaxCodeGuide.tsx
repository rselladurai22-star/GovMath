import {
  Callout,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Tax codes — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What a tax code does" },
  { id: "1257l", title: "Reading 1257L" },
  { id: "letters", title: "What the letters mean" },
  { id: "why-change", title: "Why your code changes" },
  { id: "benefits", title: "Company benefits and your code" },
  { id: "k-codes", title: "K codes" },
  { id: "high-earners", title: "Over £100,000" },
  { id: "two-jobs", title: "Two jobs or a pension" },
  { id: "check", title: "Checking and changing your code" },
  { id: "situations", title: "Codes for common situations" },
  { id: "pensioners", title: "Tax codes for pensioners" },
  { id: "new-year", title: "Tax codes and the new tax year" },
  { id: "coding-notice", title: "Reading a coding notice" },
  { id: "estimates", title: "How HMRC estimates your income" },
  { id: "untaxed", title: "Rent, savings and other untaxed income" },
  { id: "split", title: "Splitting your allowance between two jobs" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax codes", href: "https://www.gov.uk/tax-codes" },
  { label: "GOV.UK — What your tax code means", href: "https://www.gov.uk/tax-codes/what-your-tax-code-means" },
  { label: "GOV.UK — Check your Income Tax for the current year", href: "https://www.gov.uk/check-income-tax-current-year" },
  { label: "GOV.UK — Marriage Allowance", href: "https://www.gov.uk/marriage-allowance" },
  { label: "GOV.UK — Tax relief for employees", href: "https://www.gov.uk/tax-relief-for-employees" },
];

export default function TaxCodeGuide() {
  return (
    <Guide
      kicker="The tax code guide"
      title="Tax codes, explained clearly"
      intro={
        <>
          Your tax code is a short mix of numbers and letters on your payslip, and it decides how much Income Tax your
          employer takes. A wrong code is one of the most common reasons people overpay or underpay tax. This guide
          explains how to read any code and what to do if yours looks wrong.
        </>
      }
      meta={["2026/27 tax year", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What a tax code does">
        <p>
          HMRC gives every employer and pension provider a tax code for each person they pay. The code tells payroll two
          things: how much of your pay is tax-free, and whether to work out tax across the year or on each payment
          separately.
        </p>
        <p>
          It does not tell payroll your tax band. The bands are applied to whatever pay is left after the tax-free
          amount. That is why two people with the same code can pay very different amounts of tax.
        </p>
      </GuideSection>

      <GuideSection id="1257l" n={2} kicker="The standard code" title="Reading 1257L">
        <p>
          <strong>1257L</strong> is the code most people have for 2026/27. The number is the tax-free allowance divided
          by ten, and L means you get the standard Personal Allowance.
        </p>
        <WorkedExample
          title="Decoding 1257L"
          steps={[
            { label: "Number", note: "1257 × 10", value: "£12,570 tax-free a year" },
            { label: "Monthly tax-free pay", note: "Payroll uses £12,579 ÷ 12", value: "£1,048.25" },
            { label: "Weekly tax-free pay", note: "£12,579 ÷ 52", value: "£241.90" },
          ]}
          total={{ label: "Letter L", value: "Standard Personal Allowance" }}
        />
        <p>
          Payroll adds £9 to the allowance (making £12,579) so that the code covers the full allowance after rounding. The
          difference is never more than a couple of pounds of tax a year.
        </p>
      </GuideSection>

      <GuideSection id="letters" n={3} kicker="Letters" title="What the letters mean">
        <DataTable
          caption="Tax code letters and prefixes"
          head={["Part", "Meaning"]}
          rows={[
            ["L", "Standard tax-free Personal Allowance"],
            ["M", "Marriage Allowance: you receive 10% of your partner’s allowance"],
            ["N", "Marriage Allowance: you transfer 10% to your partner"],
            ["T", "Other calculations, often income over £100,000"],
            ["0T", "No tax-free allowance; normal bands apply"],
            ["BR", "All pay taxed at 20%, usually a second job or pension"],
            ["D0", "All pay taxed at 40% (21% in Scotland)"],
            ["D1", "All pay taxed at 45% (42% in Scotland)"],
            ["NT", "No tax taken"],
            ["K", "Deductions exceed your allowance: an amount is added to taxable pay"],
            ["S or C at the start", "Scottish or Welsh taxpayer"],
            ["W1, M1 or X at the end", "Emergency code: each payslip taxed on its own"],
          ]}
        />
      </GuideSection>

      <GuideSection id="why-change" n={4} kicker="Adjustments" title="Why your code changes">
        <p>
          HMRC adjusts your code to collect or give back tax through payroll, so you do not need to deal with it at the
          end of the year. Common reasons include:
        </p>
        <ul>
          <li><strong><a href="/tax-and-salary/marriage-allowance">Marriage Allowance</a>:</strong> receiving it gives 1383M (£13,830); giving it gives 1131N (£11,310).</li>
          <li><strong>Work expenses:</strong> a £60 uniform cleaning allowance raises the allowance to £12,630, code 1263L.</li>
          <li><strong>Company benefits:</strong> the taxable value of a car, fuel or medical insurance lowers your allowance.</li>
          <li><strong>Untaxed income:</strong> rental profits or <a href="/investing/savings-interest">savings interest</a>{" "}above your allowance can be taxed through your code.</li>
          <li><strong>Tax you owe:</strong> small underpayments from earlier years, usually up to £3,000, can be collected through your code.</li>
          <li><strong>Pension or Gift Aid relief:</strong> higher-rate relief can be given by raising your allowance.</li>
        </ul>
      </GuideSection>

      <GuideSection id="benefits" n={5} kicker="Example" title="Company benefits and your code">
        <WorkedExample
          title="Private medical insurance worth £1,200 a year"
          steps={[
            { label: "Personal Allowance", value: "£12,570" },
            { label: "Less taxable value of the benefit", value: "−£1,200" },
            { label: "Allowance in your code", value: "£11,370" },
          ]}
          total={{ label: "New tax code", value: "1137L" }}
        />
        <p>
          For a basic-rate taxpayer that costs £240 a year in tax, collected a little each payday. Some employers instead
          &ldquo;payroll&rdquo; benefits by adding them to your taxable pay, in which case your code stays at 1257L.
        </p>
      </GuideSection>

      <GuideSection id="k-codes" n={6} kicker="K codes" title="K codes">
        <p>
          If your adjustments are bigger than your allowance, the number is added to your taxable pay instead. A code of
          <strong> K475</strong> means £4,750 is added to your pay before tax is worked out. This often happens with
          expensive company cars or when collecting tax on large untaxed income.
        </p>
        <Callout title="The 50% limit">
          Under a K code, the tax taken in any pay period cannot be more than half of your pay for that period. Anything
          that cannot be collected is carried forward.
        </Callout>
      </GuideSection>

      <GuideSection id="high-earners" n={7} kicker="High earners" title="Over £100,000">
        <p>
          Between £100,000 and £125,140 of adjusted net income, your Personal Allowance falls by £1 for every £2. HMRC
          usually reflects this in your code based on your expected income. Someone expected to earn £110,000 has £7,570
          of allowance left, so their code might be 757L.
        </p>
        <p>
          If your income changes during the year, for example through a <a href="/tax-and-salary/bonus-tax">bonus</a>, your code may not keep up. Any
          underpayment is collected later through your code or Self Assessment. Pension contributions that bring you
          back below £100,000 can restore the allowance.
        </p>
      </GuideSection>

      <GuideSection id="two-jobs" n={8} kicker="More than one income" title="Two jobs or a pension">
        <p>
          You only get one Personal Allowance. HMRC normally gives it all to your main job or pension, and your other
          income gets BR (taxed at 20%) or D0 (40%) if you are a higher-rate taxpayer overall.
        </p>
        <p>
          If your main job pays less than £12,570, HMRC can split the allowance so the unused part goes to your second
          job. You can ask for this through the HMRC app or by calling. Otherwise you would pay too much tax during the
          year and get it back later.
        </p>
      </GuideSection>

      <GuideSection id="check" n={9} kicker="Checking" title="Checking and changing your code">
        <Timeline
          items={[
            { when: "Look", what: "Find your code", detail: "It is on your payslip, P45, P60 and in the HMRC app or personal tax account." },
            { when: "Understand", what: "Read your coding notice", detail: "HMRC’s coding notice lists every addition and deduction behind your code." },
            { when: "Correct", what: "Update HMRC", detail: "Tell HMRC about changes to your income, benefits or jobs in the app or online. They send your employer a new code." },
            { when: "Recover", what: "Get overpaid tax back", detail: "Usually through your next payslip, or after the tax year ends." },
          ]}
        />
        <Callout tone="warn" title="Your employer cannot change your code">
          Payroll must use the code HMRC sends. If it looks wrong, contact HMRC, not your employer.
        </Callout>
      </GuideSection>

      <GuideSection id="situations" n={10} kicker="Reference" title="Codes for common situations">
        <DataTable
          caption="Typical codes for 2026/27"
          head={["Situation", "Typical code"]}
          rows={[
            ["One job, no adjustments", "1257L"],
            ["Living in Scotland", "S1257L"],
            ["Living in Wales", "C1257L"],
            ["Receiving Marriage Allowance", "1383M"],
            ["Transferring Marriage Allowance", "1131N"],
            ["Second job, basic-rate taxpayer", "BR"],
            ["Second job, higher-rate taxpayer", "D0"],
            ["New job without a P45", "1257L M1 or W1"],
            ["Income about £110,000", "757L"],
            ["Income over £125,140", "0T"],
            ["Large company benefits", "K code"],
          ]}
        />
      </GuideSection>

      <GuideSection id="pensioners" n={11} kicker="Retirement" title="Tax codes for pensioners">
        <p>
          The State Pension is taxable but paid without tax deducted. HMRC collects the tax through the code on your
          private or <a href="/investing/workplace-pension">workplace pension</a>{" "}instead, by reducing your allowance by the State Pension.
        </p>
        <WorkedExample
          title="Full new State Pension plus a workplace pension"
          steps={[
            { label: "Personal Allowance", value: "£12,570" },
            { label: "Less State Pension for 2026/27", value: "−£12,547.60" },
            { label: "Allowance left for the workplace pension", value: "£22.40" },
          ]}
          total={{ label: "Code on the workplace pension", value: "2L" }}
        />
        <p>
          A very low code like this is correct, not a mistake. It means almost all of the workplace pension is taxed at
          20%, because the State Pension has used the allowance. If you keep working past <a href="/investing/state-pension-age">State Pension age</a>, the same
          applies to your job.
        </p>
      </GuideSection>

      <GuideSection id="new-year" n={12} kicker="Each April" title="Tax codes and the new tax year">
        <p>
          Your code can change on 6 April. HMRC sends a coding notice before the new tax year if your code is changing,
          for example to reflect a new State Pension amount or a change in benefits. If you are on the standard 1257L
          code, your employer simply carries it forward.
        </p>
        <p>
          Emergency codes do not carry forward: at the start of a new tax year, codes with W1, M1 or X are normally
          replaced by the cumulative version. It is a good moment to check your code in the HMRC app.
        </p>
      </GuideSection>

      <GuideSection id="coding-notice" n={13} kicker="Coding notices" title="Reading a coding notice">
        <p>
          A coding notice lists the allowances and deductions behind your code. It starts with your Personal Allowance,
          adds anything that increases your tax-free pay, subtracts anything HMRC needs to collect tax on, and divides the
          result by ten.
        </p>
        <WorkedExample
          title="A coding notice with a company car and work expenses"
          steps={[
            { label: "Personal Allowance", value: "£12,570" },
            { label: "Flat-rate expenses for uniform", value: "+£60" },
            { label: "Company car benefit", value: "−£3,000" },
            { label: "Underpaid tax from last year, as an allowance reduction", value: "−£500" },
            { label: "Total allowances", value: "£9,130" },
          ]}
          total={{ label: "Tax code", value: "913L" }}
        />
        <p>
          The underpayment line is not the tax owed itself: it is the amount of allowance that, taxed at your rate,
          collects the tax. At 20%, £500 of lost allowance collects £100 of tax over the year.
        </p>
      </GuideSection>

      <GuideSection id="estimates" n={14} kicker="Estimates" title="How HMRC estimates your income">
        <p>
          Some adjustments depend on how much HMRC expects you to earn, such as the £100,000 allowance taper, higher-rate
          relief on pension contributions, and whether you pay tax on savings interest. HMRC bases these on your pay so
          far and your previous years.
        </p>
        <p>
          If your income is going to change, for example because you have a pay rise, go part-time or receive a large
          bonus, update your estimated income in the HMRC app. HMRC then recalculates your code, which avoids a large
          underpayment or overpayment at the end of the year. Your estimate is not a commitment, and you can change it
          as often as you need.
        </p>
      </GuideSection>

      <GuideSection id="untaxed" n={15} kicker="Other income" title="Rent, savings and other untaxed income">
        <p>
          If you have income that is not taxed at source, HMRC can collect the tax through your code instead of asking you
          to pay it separately. Common examples are:
        </p>
        <ul>
          <li>Rental profits under £2,500 a year, if you do not file a Self Assessment return.</li>
          <li>Savings interest above your Personal Savings Allowance, which HMRC learns about from banks.</li>
          <li>Taxable State benefits, such as the State Pension or <a href="/benefits/carers-earnings">Carer&rsquo;s Allowance</a>, alongside a job.</li>
        </ul>
        <p>
          The adjustment is an estimate based on the latest information HMRC has. If your savings interest falls, for
          example because rates drop or you move money into an ISA, tell HMRC so the deduction can be reduced.
        </p>
      </GuideSection>

      <GuideSection id="split" n={16} kicker="Two jobs" title="Splitting your allowance between two jobs">
        <p>
          If your main job pays less than £12,570, you are not using all of your allowance there, but your second job on a
          BR code still taxes every pound at 20%. HMRC can split the allowance so the unused part moves to the second job.
        </p>
        <WorkedExample
          title="Main job £9,000, second job £6,000"
          steps={[
            { label: "Allowance needed by the main job", value: "£9,000" },
            { label: "Unused allowance", note: "£12,570 − £9,000", value: "£3,570" },
            { label: "Main job code", value: "900L" },
            { label: "Second job code", note: "Instead of BR", value: "357L" },
          ]}
          total={{ label: "Tax saved during the year on the second job", value: "about £714" }}
        />
        <p>
          Without the split you would still get the £714 back after the tax year ends, but splitting the allowance means
          it stays in your pay each month. You can ask for this in the HMRC app or by phone.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "1257L", label: "Standard tax code" },
            { value: "£12,570", label: "Personal Allowance" },
            { value: "1383M / 1131N", label: "Marriage Allowance codes" },
            { value: "£1,260", label: "Allowance transferred by Marriage Allowance" },
            { value: "50%", label: "Most tax a K code can take from a payment" },
            { value: "£100,000", label: "Allowance starts to shrink" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
