import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Salary sacrifice — the guide. Figures from src/lib/tax/pay-and-perks.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How salary sacrifice works" },
  { id: "exempt", title: "Which benefits save tax" },
  { id: "examples", title: "Worked examples" },
  { id: "pension", title: "Pension salary sacrifice" },
  { id: "employer", title: "The employer's NI saving" },
  { id: "thresholds", title: "Using sacrifice around tax thresholds" },
  { id: "cycle", title: "Cycle to Work" },
  { id: "cars", title: "Electric cars" },
  { id: "other", title: "Tech, gym and other schemes" },
  { id: "minimum-wage", title: "The minimum wage limit" },
  { id: "downsides", title: "What a lower salary can affect" },
  { id: "2029", title: "The 2029 National Insurance cap" },
  { id: "changing", title: "Joining, changing and leaving" },
  { id: "self-employed", title: "If you are not an employee" },
  { id: "example-higher", title: "A higher-rate example" },
  { id: "bonus", title: "Sacrificing a bonus" },
  { id: "payslip", title: "How it shows on your payslip" },
  { id: "family", title: "Child Benefit and childcare" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "nmw-detail", title: "Checking the minimum wage yourself" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Salary sacrifice and the effects on employees", href: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
  { label: "GOV.UK — Optional remuneration arrangements", href: "https://www.gov.uk/guidance/optional-remuneration-arrangements" },
  { label: "GOV.UK — Cycle to Work scheme guidance", href: "https://www.gov.uk/government/publications/cycle-to-work-scheme-implementation-guidance" },
  { label: "GOV.UK — National Minimum Wage and salary sacrifice", href: "https://www.gov.uk/national-minimum-wage" },
  { label: "GOV.UK — Income Tax rates and allowances", href: "https://www.gov.uk/income-tax-rates" },
];

export default function SacrificeGuide() {
  return (
    <Guide
      kicker="The salary sacrifice guide"
      title="Is salary sacrifice worth it?"
      intro={
        <>
          Salary sacrifice means agreeing to a lower salary in return for a benefit your employer provides, such as a pension contribution, a bike or
          an <a href="/vehicles/petrol-vs-ev-cost">electric car</a>. Because the benefit is not taxed in the same way as pay, both you and your employer can save. How much depends on what the
          benefit is and which tax band you are in. This guide explains the rules for 2026/27, the benefits that save the most, and the catches.
        </>
      }
      meta={["2026/27 tax year", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>For pensions and Cycle to Work, you save <strong>Income Tax and National Insurance</strong>: each £1 costs a basic-rate taxpayer 72p.</li>
          <li>Higher-rate taxpayers pay <strong>58p</strong> per £1, and in the £100,000 trap as little as <strong>38p</strong>.</li>
          <li>Your employer saves <strong>15% National Insurance</strong> too, and may add it to your pension.</li>
          <li>Most other benefits, like tech or gym schemes, save only National Insurance.</li>
        </ul>
        <KeyStats
          items={[
            { value: "28%", label: "Saving, basic rate" },
            { value: "42%", label: "Saving, higher rate" },
            { value: "62%", label: "Saving, £100k to £125k" },
            { value: "15%", label: "Employer NI saved" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How salary sacrifice works">
        <p>
          You and your employer agree to change your contract so your salary is lower, and in return your employer provides a benefit worth the same
          amount. Because your salary is lower, you pay less Income Tax, National Insurance and student loan. Your employer pays less employer National
          Insurance. The benefit itself is either tax-free or taxed under special rules. It is a contractual change, so it should be agreed in writing,
          usually for at least a year.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={3} kicker="Rules" title="Which benefits save tax">
        <CompareCards
          columns={[
            {
              name: "Exempt: tax and NI saved",
              rows: [
                { label: "Examples", value: "Pension contributions, Cycle to Work, childcare vouchers (closed), ultra-low emission cars" },
                { label: "You save", value: "Income Tax, NI, student loan" },
                { label: "Employer saves", value: "15% NI" },
              ],
            },
            {
              name: "Optional remuneration: NI only",
              rows: [
                { label: "Examples", value: "Tech, gym, health screening, most cars" },
                { label: "You save", value: "NI and student loan" },
                { label: "Employer saves", value: "Nothing: Class 1A NI replaces it" },
              ],
            },
          ]}
        />
        <p>
          Since April 2017, the optional remuneration rules mean that for most benefits you are taxed on the salary you gave up, or the benefit&rsquo;s
          taxable value if higher. Pensions, pension advice, Cycle to Work, childcare and cars with emissions of 75g/km or less are protected.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="£2,000 into a pension on a £40,000 salary"
          steps={[
            { label: "Income Tax saved at 20%", value: "£400" },
            { label: "National Insurance saved at 8%", value: "£160" },
            { label: "Take-home falls by", value: "£1,440" },
            { label: "Employer NI saved at 15%", value: "£300" },
          ]}
          total={{ label: "You save a year", value: "£560" }}
        />
        <WorkedExample
          title="£2,000 for a tech scheme on the same salary"
          steps={[
            { label: "Income Tax saved", value: "£0" },
            { label: "National Insurance saved", value: "£160" },
          ]}
          total={{ label: "You save a year", value: "£160" }}
        />
      </GuideSection>

      <GuideSection id="pension" n={5} kicker="Pensions" title="Pension salary sacrifice">
        <p>
          Pension contributions are the most common use. Compared with a net pay or relief at source pension, sacrifice adds a National Insurance saving:
          8p in the pound for basic-rate taxpayers and 2p for higher-rate. The money goes into your pension as an employer contribution. On £60,000,
          sacrificing £5,000 into a pension costs £2,900 of take-home, a saving of £2,100. See the{" "}
          <a href="/investing/pension-tax-relief">pension tax relief calculator</a> to compare methods.
        </p>
      </GuideSection>

      <GuideSection id="employer" n={6} kicker="Employer" title="The employer's NI saving">
        <p>
          Employers pay 15% National Insurance on salary above £5,000 a year. When you sacrifice salary for a pension or bike, they save 15% of it. Some
          employers pass all or part of this into your pension, which can add 15% to your contribution for free. On £2,000 a year, that is an extra £300.
          Ask your employer whether they do this; the calculator lets you include it.
        </p>
      </GuideSection>

      <GuideSection id="thresholds" n={7} kicker="Strategy" title="Using sacrifice around tax thresholds">
        <ul>
          <li><strong>£50,270:</strong> sacrificing the salary above this keeps you a basic-rate taxpayer and doubles your Personal Savings Allowance. On £55,000, sacrificing £4,730 saves £1,987.</li>
          <li><strong>£60,000:</strong> keeps you clear of the <a href="/benefits/high-income-child-benefit">High Income Child Benefit Charge</a>.</li>
          <li><strong>£100,000:</strong> sacrifice wins back your Personal Allowance and keeps <a href="/benefits/free-childcare-hours">funded childcare</a>. On £105,000, sacrificing £5,000 costs only £1,900 of take-home.</li>
          <li><strong>Student loans:</strong> a lower salary also means lower repayments, a further 9% saving above your threshold.</li>
        </ul>
      </GuideSection>

      <GuideSection id="cycle" n={8} kicker="Bikes" title="Cycle to Work">
        <p>
          Through Cycle to Work your employer hires you a bike and safety equipment, and you repay it from your salary before tax and NI, usually over 12
          months. There is no fixed limit, though many schemes cap the value. At the end, you can usually buy the bike for a small fee or keep hiring it.
          A £1,500 e-bike costs a basic-rate taxpayer about £1,080 after the 28% saving, less the end-of-hire fee.
        </p>
      </GuideSection>

      <GuideSection id="cars" n={9} kicker="Cars" title="Electric cars">
        <p>
          Electric cars are one of the best-value sacrifices because the taxable benefit is small: 4% of the list price in 2026/27. Your sacrifice also
          covers insurance and servicing. The calculation is different from this page; use the{" "}
          <a href="/vehicles/ev-salary-sacrifice">EV salary sacrifice calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="other" n={10} kicker="Other schemes" title="Tech, gym and other schemes">
        <p>
          Schemes offering phones, laptops, gym membership or health checks are often called salary sacrifice, but under the optional remuneration rules
          you pay Income Tax on the salary given up. You still save National Insurance, 8% for most employees, and the cost is spread through payroll.
          They can be convenient, but the saving is small, and shopping around may cost less.
        </p>
      </GuideSection>

      <GuideSection id="minimum-wage" n={11} kicker="Limits" title="The minimum wage limit">
        <p>
          A salary sacrifice cannot take your cash pay below the National Minimum Wage for the hours you work. In 2026/27 the National Living Wage is
          £12.71 an hour for people aged 21 and over. On a full-time 37.5-hour week that is about £24,785 a year. Employers check this before agreeing a
          sacrifice; the calculator warns you if your pay would fall below it.
        </p>
      </GuideSection>

      <GuideSection id="downsides" n={12} kicker="Catches" title="What a lower salary can affect">
        <ul>
          <li><strong>Mortgages:</strong> lenders may use your reduced salary, cutting <a href="/property/mortgage-affordability">how much you can borrow</a>.</li>
          <li><strong>Statutory pay:</strong> maternity, paternity and sick pay are based on actual earnings, so a large sacrifice can reduce them.</li>
          <li><strong>Life cover and pay rises:</strong> some are linked to salary; check whether your employer uses the pre-sacrifice figure.</li>
          <li><strong>State benefits:</strong> very low earnings could affect your National Insurance record if pay falls below £129 a week.</li>
        </ul>
        <Callout title="Ask about the reference salary">
          Many employers keep a notional salary for pay rises, bonuses and pension calculations, so your sacrifice does not hold back future pay.
        </Callout>
      </GuideSection>

      <GuideSection id="2029" n={13} kicker="Coming changes" title="The 2029 National Insurance cap">
        <p>
          From April 2029, National Insurance relief on pension salary sacrifice will be capped: only the first £2,000 a year of sacrificed salary will be
          free of employee and employer National Insurance. Income Tax relief is not affected. The calculator uses today&rsquo;s rules, where there is no cap.
        </p>
      </GuideSection>

      <GuideSection id="changing" n={14} kicker="Practical" title="Joining, changing and leaving">
        <p>
          Sacrifice arrangements are normally agreed for at least a year and can only be changed at set times, such as the start of the scheme year,
          or after a life event like the birth of a child, marriage or a change of job. Pension sacrifice can often be changed more freely. If you leave
          your job during a bike or car scheme, you may have to pay off the rest from your final pay.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={15} kicker="Other workers" title="If you are not an employee">
        <p>
          Salary sacrifice is only for employees. Company directors can get a similar result by having their company pay pension contributions directly,
          which are deductible for Corporation Tax. Self-employed people get tax relief on personal pension contributions through relief at source and
          Self Assessment, but no National Insurance saving.
        </p>
      </GuideSection>

      <GuideSection id="example-higher" n={16} kicker="Example" title="A higher-rate example">
        <WorkedExample
          title="£5,000 into a pension on a £60,000 salary"
          steps={[
            { label: "Income Tax saved at 40%", value: "£2,000" },
            { label: "National Insurance saved at 2%", value: "£100" },
            { label: "Take-home falls by", value: "£2,900" },
            { label: "Employer NI saved", value: "£750" },
          ]}
          total={{ label: "You save a year", value: "£2,100" }}
        />
        <p>
          If the employer adds its £750 saving, £5,750 goes into the pension for a £2,900 fall in take-home: each pound in the pension costs about 50p.
        </p>
      </GuideSection>

      <GuideSection id="bonus" n={17} kicker="Bonuses" title="Sacrificing a bonus">
        <p>
          Many employers let you sacrifice some or all of a bonus into your pension. This can be especially valuable when the bonus would take you into a
          higher band or over £100,000 for the year. The sacrifice has to be agreed before the bonus is paid; you cannot redirect it afterwards. See the{" "}
          <a href="/tax-and-salary/bonus-tax">bonus tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="payslip" n={18} kicker="Payslips" title="How it shows on your payslip">
        <p>
          On your payslip, the sacrificed amount appears as a deduction before tax, often labelled with the scheme name, and your taxable pay and NIable pay
          are both reduced. For a pension, your employer&rsquo;s contribution increases by the same amount. Check the first payslip after joining to make sure
          the sacrifice has been taken before tax and National Insurance, not after.
        </p>
      </GuideSection>

      <GuideSection id="family" n={19} kicker="Families" title="Child Benefit and childcare">
        <p>
          Salary sacrifice reduces your adjusted net income, the figure used for the High Income Child Benefit Charge and for the £100,000 limit on funded
          childcare and <a href="/benefits/tax-free-childcare">Tax-Free Childcare</a>. For parents earning just over £60,000 or £100,000, a pension sacrifice can be worth far more than the tax and NI
          saving alone, because it can keep thousands of pounds of Child Benefit or childcare support.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={20} kicker="Scotland" title="Scottish taxpayers">
        <p>
          In Scotland the saving depends on your Scottish band: 19% or 20% for starter and basic-rate taxpayers, 21% for intermediate, 42% for higher, 45% for
          advanced and 48% for top-rate taxpayers, plus the same National Insurance saving as elsewhere. A <a href="/tax-and-salary/scottish-tax">Scottish taxpayer</a>{" "}earning £45,000 saves 42% Income Tax
          and 8% National Insurance on a pension sacrifice, so each £1 costs only 50p. Choose Scotland under More options to see your figures.
        </p>
      </GuideSection>

      <GuideSection id="nmw-detail" n={21} kicker="Minimum wage" title="Checking the minimum wage yourself">
        <p>
          Divide your salary after the sacrifice by 52 and by your paid hours a week to get your hourly rate. Compare it with the rate for your age: £12.71 at
          21 or over, £10.85 at 18 to 20 and £8.00 under 18 or as an apprentice in the first year. If you work variable hours, your employer has to check each
          pay period, so a sacrifice may be limited in months when you work more hours.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Salary sacrifice, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Employee NI", "8% to £50,270, 2% above"],
            ["Employer NI", "15% above £5,000"],
            ["Cost per £1, basic rate", "72p"],
            ["Cost per £1, higher rate", "58p"],
            ["Cost per £1, £100,000 to £125,140", "38p"],
            ["National Living Wage", "£12.71 an hour"],
            ["Pension sacrifice NI cap from April 2029", "£2,000 a year"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
