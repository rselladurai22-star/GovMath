import { Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Reverse take-home — the guide. Figures from src/lib/tax/reverse.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the calculator works backwards" },
  { id: "table", title: "Salary needed for common take-home pay" },
  { id: "example", title: "Worked example: £3,000 a month" },
  { id: "why-not-simple", title: "Why you cannot just add 25%" },
  { id: "scotland", title: "If you live in Scotland" },
  { id: "student-loans", title: "Student loans" },
  { id: "pension", title: "Pension contributions" },
  { id: "trap", title: "The £100,000 trap" },
  { id: "hourly", title: "Turning it into an hourly rate" },
  { id: "negotiating", title: "Using it in a pay negotiation" },
  { id: "limits", title: "What the calculator leaves out" },
  { id: "two-jobs", title: "Two jobs or extra income" },
  { id: "employer-cost", title: "What it costs your employer" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
  { label: "GOV.UK — Scottish Income Tax rates", href: "https://www.gov.uk/scottish-income-tax" },
  { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK — Income Tax: Personal Allowance reduction", href: "https://www.gov.uk/income-tax-rates/income-over-100000" },
];

export default function ReverseGuide() {
  return (
    <Guide
      kicker="The reverse salary guide"
      title="What salary gives me the take-home pay I want?"
      intro={
        <>
          Most salary calculators start with the gross figure on a job advert and work down to what you keep. This one works the other way: you
          say what you need in your bank each month, and it finds the salary that gets you there, after Income Tax, National Insurance, student
          loan and pension. This guide shows how it works, the salaries needed for common targets and the traps that make the sum less simple
          than it looks.
        </>
      }
      meta={["2026/27 tax year", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>To take home <strong>£2,000 a month</strong> in England, Wales or Northern Ireland in 2026/27 you need a salary of about <strong>£28,445</strong>.</li>
          <li>For <strong>£2,500 a month</strong> you need about <strong>£36,778</strong>, and for <strong>£3,000 a month</strong> about <strong>£45,112</strong>.</li>
          <li>Above about £50,000 each extra pound of take-home costs much more salary, because the 40% higher rate starts.</li>
          <li>A student loan, a pension contribution or living in Scotland all raise the salary you need.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£28,445", label: "Salary for £2,000 a month" },
            { value: "£45,112", label: "Salary for £3,000 a month" },
            { value: "£85,246", label: "Salary for £5,000 a month" },
            { value: "£12,570", label: "Tax-free Personal Allowance" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How the calculator works backwards">
        <p>
          There is no simple formula that turns take-home pay back into a salary, because tax and National Insurance change rate at several points:
          the Personal Allowance, the National Insurance thresholds, the higher rate, the student loan threshold and the taper above £100,000.
        </p>
        <p>
          So the calculator searches. It runs our normal take-home calculation, the same one behind the{" "}
          <a href="/tax-and-salary/salary-calculator">salary calculator</a>, on a range of salaries and narrows in until it finds the lowest salary
          whose take-home reaches your target, to the penny. Because it uses the full calculation, every rule the salary calculator applies is
          included automatically.
        </p>
      </GuideSection>

      <GuideSection id="table" n={3} kicker="Table" title="Salary needed for common take-home pay">
        <p>For 2026/27, with a standard 1257L tax code, no student loan and no pension contribution:</p>
        <DataTable
          caption="Salary needed for a monthly take-home, 2026/27"
          head={["Take-home a month", "England, Wales, NI", "Scotland", "With Plan 2 loan"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£1,500", "£20,112", "£20,057", "£20,112"],
            ["£2,000", "£28,445", "£28,390", "£28,445"],
            ["£2,500", "£36,778", "£36,825", "£37,835"],
            ["£3,000", "£45,112", "£45,953", "£47,358"],
            ["£3,500", "£54,211", "£57,130", "£58,771"],
            ["£4,000", "£64,556", "£67,844", "£71,016"],
            ["£5,000", "£85,246", "£90,080", "£95,506"],
            ["£6,000", "£109,059", "£122,107", "£130,839"],
          ]}
        />
        <p>
          Notice how the gaps grow. Going from £2,000 to £2,500 a month needs about £8,300 more salary; going from £5,000 to £6,000 needs almost
          £24,000 more.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="Worked example: £3,000 a month">
        <WorkedExample
          title="Take-home of £3,000 a month (£36,000 a year), England"
          steps={[
            { label: "Salary found", value: "£45,112" },
            { label: "Tax-free Personal Allowance", value: "£12,570" },
            { label: "Income Tax at 20% on £32,542", value: "£6,508" },
            { label: "National Insurance at 8% above £12,570", value: "£2,603" },
          ]}
          total={{ label: "Take-home: £45,112 − £6,508 − £2,603", value: "£36,000" }}
        />
        <p>
          At this salary you are still a basic-rate taxpayer, so 28p of every extra pound goes in Income Tax and National Insurance. Asking for
          £1,000 more salary would add about £720 a year to your take-home.
        </p>
      </GuideSection>

      <GuideSection id="why-not-simple" n={5} kicker="Rule of thumb" title="Why you cannot just add 25%">
        <p>
          A common shortcut is to add a quarter to your target. It works roughly for basic-rate pay but goes wrong elsewhere:
        </p>
        <ul>
          <li>
            Low pay: if your target is under the £12,570 Personal Allowance, you need no extra at all. £1,000 a month of take-home needs a salary of
            exactly £12,000.
          </li>
          <li>
            Middle pay: for £2,500 a month (£30,000 a year) the salary is £36,778, about 23% more than the take-home.
          </li>
          <li>
            Higher pay: for £5,000 a month (£60,000 a year) the salary is £85,246, 42% more, because everything over £50,270 is taxed at 40%
            plus 2% National Insurance.
          </li>
        </ul>
        <Callout title="The marginal rate is what matters">
          The calculator shows what share of any pay rise you keep. For basic-rate taxpayers it is 72p in the pound; for higher-rate taxpayers 58p;
          inside the £100,000 trap it falls to 38p.
        </Callout>
      </GuideSection>

      <GuideSection id="scotland" n={6} kicker="Scotland" title="If you live in Scotland">
        <p>
          Scotland sets its own Income Tax bands: starter 19%, basic 20%, intermediate 21%, higher 42%, advanced 45% and top 48%. National
          Insurance is the same across the UK. On modest salaries Scottish taxpayers pay slightly less, so the salary needed is a little lower:
          £28,390 rather than £28,445 for £2,000 a month. From around £30,000 the intermediate and higher rates take over, and for £4,000 a
          month a Scottish taxpayer needs about £3,300 more salary than someone in England.
        </p>
      </GuideSection>

      <GuideSection id="student-loans" n={7} kicker="Student loans" title="Student loans">
        <p>
          Student loan repayments come out of your pay like a tax: 9% of income above your plan&rsquo;s threshold (6% for postgraduate loans).
          For 2026/27 the thresholds are £26,900 for Plan 1, £29,385 for Plan 2, £33,795 for Plan 4 and £25,000 for Plan 5.
        </p>
        <p>
          With a Plan 2 loan, a take-home of £3,000 a month needs £47,358 rather than £45,112: over £2,200 more, because the loan takes 9p of
          every pound over the threshold. The higher your salary, the bigger the gap. Choose your plan under More options to include it.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={8} kicker="Pensions" title="Pension contributions">
        <p>
          The calculator treats your pension contribution as salary sacrifice, which comes off your pay before tax and National Insurance. That
          means a 5% contribution does not cost you the full 5% of take-home:
        </p>
        <ul>
          <li>without a pension, £2,500 a month needs a salary of £36,778;</li>
          <li>with 5% going into your pension, it needs £38,714, and £1,936 a year also goes into your pension pot.</li>
        </ul>
        <p>
          If your scheme takes contributions from net pay or as relief at source instead, your take-home is slightly different, but the
          difference is small for basic-rate taxpayers. See the <a href="/investing/workplace-pension">workplace pension calculator</a> for the
          detail.
        </p>
      </GuideSection>

      <GuideSection id="trap" n={9} kicker="High earners" title="The £100,000 trap">
        <p>
          Above £100,000 your Personal Allowance is reduced by £1 for every £2 of income, until it has gone at £125,140. On income in that range
          you pay 40% tax, plus 20% more as the allowance disappears, plus 2% National Insurance: you keep only 38p in the pound.
        </p>
        <p>
          In numbers: a salary of £100,000 gives a take-home of £68,557; a salary of £125,140 gives £78,111. That is £25,140 more salary for
          £9,553 more in your pocket. If your target take-home puts you in this range, the calculator warns you. Salary sacrifice into a pension
          is the usual way out, because it lowers the income the taper is measured on.
        </p>
      </GuideSection>

      <GuideSection id="hourly" n={10} kicker="Hourly pay" title="Turning it into an hourly rate">
        <p>
          The calculator divides the yearly salary by 52 weeks and your paid hours a week (37.5 unless you change it). For £2,000 a month that is
          £14.59 an hour; for £3,000 a month, £23.13 an hour. Compare it with the National Living Wage of £12.71 an hour for people aged 21 and
          over from April 2026, using the <a href="/tax-and-salary/minimum-wage">minimum wage checker</a>.
        </p>
        <p>
          If you are paid for fewer weeks, for example as a supply worker, divide by the number of weeks you actually work instead, or use the{" "}
          <a href="/tax-and-salary/hourly-to-salary">hourly to salary converter</a>.
        </p>
      </GuideSection>

      <GuideSection id="negotiating" n={11} kicker="Practical" title="Using it in a pay negotiation">
        <ul>
          <li>Work out your monthly budget first, then the take-home that covers it with some left over.</li>
          <li>Use the salary from the calculator as your minimum. Job offers are almost always quoted before tax.</li>
          <li>Compare offers on take-home, not salary: a higher employer pension contribution or a salary sacrifice scheme can be worth more than a slightly higher salary.</li>
          <li>Remember that a pay rise is taxed at your marginal rate. Use the <a href="/tax-and-salary/tax-bracket-checker">tax bracket checker</a> to see it.</li>
        </ul>
      </GuideSection>

      <GuideSection id="limits" n={12} kicker="Limits" title="What the calculator leaves out">
        <p>
          The result is for one job, paid evenly through the year, with the standard 1257L tax code. It does not include benefits in kind such as a
          company car, other income such as rent or self-employment, Marriage Allowance, or a tax code that collects tax owed from earlier years.
          Any of these change the salary you need. If you are on Universal Credit, a pay rise also reduces your award by 55p in each extra pound
          you take home: see the <a href="/benefits/universal-credit-taper">UC earnings taper calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="two-jobs" n={13} kicker="Other income" title="Two jobs or extra income">
        <p>
          The calculator assumes one job with the standard 1257L tax code. If you have a second job, your Personal Allowance is usually
          used up by the first, so the second is taxed from its first pound, often with a BR (20%) tax code. National Insurance is worked
          out on each job separately, so two smaller jobs can mean less National Insurance than one bigger one with the same total pay.
        </p>
        <p>
          Other income, such as rent from a lodger above the £7,500 Rent a Room limit, self-employed profits or savings interest over your
          allowance, is taxed through Self Assessment or your tax code. Any of it pushes up the salary you need from your main job for the
          same spending money.
        </p>
      </GuideSection>

      <GuideSection id="employer-cost" n={14} kicker="Employers" title="What it costs your employer">
        <p>
          Your salary is not the whole cost of employing you. On top of it, your employer pays 15% employer National Insurance on pay above
          £5,000 a year, at least 3% into your workplace pension on qualifying earnings, and sometimes the Apprenticeship Levy. A salary of
          £45,112, the figure for £3,000 a month take-home, costs an employer about £6,017 in National Insurance alone.
        </p>
        <p>
          That is why salary sacrifice can work well for both sides: pay given up for a pension saves employer National Insurance too, and
          some employers add that saving to your pension. See the <a href="/business/employer-ni-costs">employer NI calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Thresholds behind the calculation, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Personal Allowance", "£12,570"],
            ["Basic rate (20%) up to", "£50,270"],
            ["Additional rate (45%) from", "£125,140"],
            ["Personal Allowance taper starts", "£100,000"],
            ["Employee NI 8% between", "£12,570 and £50,270"],
            ["Employee NI above £50,270", "2%"],
            ["Plan 2 student loan threshold", "£29,385"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
