import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Pay rise — the guide. Figures from src/lib/tax/pay-and-perks.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "marginal", title: "Your marginal rate decides what you keep" },
  { id: "bands", title: "How much you keep at each salary" },
  { id: "examples", title: "Worked examples" },
  { id: "higher-rate", title: "Crossing into the higher rate" },
  { id: "trap", title: "The £100,000 trap" },
  { id: "child-benefit", title: "Pay rises and Child Benefit" },
  { id: "student-loans", title: "Student loans" },
  { id: "scotland", title: "Scotland" },
  { id: "inflation", title: "Real pay: beating inflation" },
  { id: "timing", title: "When the rise shows on your payslip" },
  { id: "pension", title: "Putting part of a rise into your pension" },
  { id: "benefits", title: "Pay rises and benefits" },
  { id: "asking", title: "Asking for a pay rise" },
  { id: "promotion", title: "Weighing up a promotion or new job" },
  { id: "example-trap", title: "A £100,000 example" },
  { id: "inflation-history", title: "Why real pay matters" },
  { id: "part-year", title: "A rise part-way through the year" },
  { id: "self-employed", title: "If you are self-employed" },
  { id: "negotiating-total", title: "Looking at the whole package" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — National Insurance rates", href: "https://www.gov.uk/national-insurance-rates-letters" },
  { label: "GOV.UK — High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "ONS — Consumer price inflation", href: "https://www.ons.gov.uk/economy/inflationandpriceindices" },
  { label: "GOV.UK — Scottish Income Tax", href: "https://www.gov.uk/scottish-income-tax" },
];

export default function PayRiseGuide() {
  return (
    <Guide
      kicker="The pay rise guide"
      title="What is my pay rise really worth?"
      intro={
        <>
          A pay rise always looks bigger on the offer letter than in your bank account. Income Tax, National Insurance, student loan repayments and
          pension contributions all take a share, and at some salaries the share is far bigger than people expect. Then inflation eats into what is
          left. This guide explains how much of a rise you actually keep in 2026/27, where the expensive bands are, and how to judge whether a rise
          keeps you ahead of prices.
        </>
      }
      meta={["2026/27 tax year", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Basic-rate taxpayers keep <strong>72p of every £1</strong> of a pay rise: 20% goes in Income Tax and 8% in National Insurance.</li>
          <li>Higher-rate taxpayers keep <strong>58p</strong>; inside the £100,000 trap, only <strong>38p</strong>.</li>
          <li>A student loan takes another 9p in every pound above its threshold.</li>
          <li>With inflation at 3.1%, a 3.1% rise on £28,000 still leaves you about £106 a year worse off in real terms, because tax takes more of the rise.</li>
        </ul>
        <KeyStats
          items={[
            { value: "72p", label: "Kept per £1, basic rate" },
            { value: "58p", label: "Kept per £1, higher rate" },
            { value: "38p", label: "Kept per £1, £100k to £125k" },
            { value: "3.1%", label: "CPI, August 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="marginal" n={2} kicker="Method" title="Your marginal rate decides what you keep">
        <p>
          What matters for a pay rise is not your average tax rate but your marginal rate: the share of the next pound you earn that goes in
          deductions. Someone on £30,000 pays about 16% of their whole salary in Income Tax and National Insurance, but 28% of any rise. The
          calculator works out your take-home before and after the rise with the full 2026/27 rules, so every threshold you cross is counted
          exactly, including a rise that straddles two bands.
        </p>
      </GuideSection>

      <GuideSection id="bands" n={3} kicker="Table" title="How much you keep at each salary">
        <DataTable
          caption="Share of a pay rise you keep, England, Wales and NI, 2026/27, no student loan or pension"
          head={["Salary range", "Income Tax", "NI", "You keep"]}
          rows={[
            ["£12,570 to £50,270", "20%", "8%", "72p in £1"],
            ["£50,270 to £100,000", "40%", "2%", "58p in £1"],
            ["£100,000 to £125,140", "60% (allowance withdrawn)", "2%", "38p in £1"],
            ["Over £125,140", "45%", "2%", "53p in £1"],
          ]}
        />
        <p>Child Benefit, a student loan or Universal Credit can push these figures lower.</p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="5% rise on £30,000 (to £31,500)"
          steps={[
            { label: "Pay rise", value: "£1,500" },
            { label: "Income Tax at 20%", value: "− £300" },
            { label: "National Insurance at 8%", value: "− £120" },
          ]}
          total={{ label: "Extra take-home a year (£90 a month)", value: "£1,080" }}
        />
        <WorkedExample
          title="5% rise on £50,000 (to £52,500)"
          steps={[
            { label: "Pay rise", value: "£2,500" },
            { label: "£270 taxed at 28%, £2,230 at 42%", value: "− £1,012.20" },
          ]}
          total={{ label: "Extra take-home a year (60% kept)", value: "£1,487.80" }}
        />
      </GuideSection>

      <GuideSection id="higher-rate" n={5} kicker="£50,270" title="Crossing into the higher rate">
        <p>
          Above £50,270, Income Tax rises from 20% to 40%, but National Insurance falls from 8% to 2%, so the combined rate rises from 28% to 42%.
          A rise that takes you over the line is taxed at both rates, which is why the £50,000 example keeps 60% rather than 72% or 58%. Higher-rate
          taxpayers also see their Personal Savings Allowance halve to £500, so interest on savings can cost more too.
        </p>
      </GuideSection>

      <GuideSection id="trap" n={6} kicker="£100,000" title="The £100,000 trap">
        <p>
          Between £100,000 and £125,140, you lose £1 of tax-free Personal Allowance for every £2 you earn, which adds 20% to the 40% rate. With 2%
          National Insurance, you keep only 38p in the pound. A 5% rise from £100,000 to £105,000 adds just £1,900 to your take-home. Parents in
          this band also lose 30 hours of funded childcare and Tax-Free Childcare, which can make a rise cost money overall. Salary sacrifice into a
          pension is the usual way to stay under £100,000.
        </p>
      </GuideSection>

      <GuideSection id="child-benefit" n={7} kicker="Families" title="Pay rises and Child Benefit">
        <p>
          If you or your partner get Child Benefit and the higher earner&rsquo;s income is between £60,000 and £80,000, 1% of the Child Benefit is
          taken back for every £200 of income over £60,000. With two children, a rise from £60,000 to £63,000 adds £1,740 of take-home, but £351 goes
          in the charge: you keep 46% of the rise. The calculator includes the charge when you enter your number of children. See the{" "}
          <a href="/benefits/high-income-child-benefit">High Income Child Benefit Charge calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="student-loans" n={8} kicker="Student loans" title="Student loans">
        <p>
          Above your plan&rsquo;s threshold, student loan repayments take 9% of any rise (6% for postgraduate loans). A basic-rate taxpayer on Plan 2
          keeps 63p in the pound rather than 72p: a £2,000 rise on £35,000 adds £1,260 a year. For many graduates the loan will be written off before
          it is repaid, so these repayments work like an extra tax rather than paying down a debt.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={9} kicker="Scotland" title="Scotland">
        <p>
          Scottish taxpayers have six bands: 19%, 20%, 21%, 42%, 45% and 48%. On a rise from £35,000 to £37,000, in the 21% intermediate band, a Scottish
          taxpayer keeps £1,420 of the £2,000, compared with £1,440 elsewhere in the UK. The Scottish higher rate of 42% starts at £43,663, earlier than
          the UK&rsquo;s £50,270, so Scottish rises in the £44,000 to £50,000 range keep only 50p in the pound.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Real pay" title="Real pay: beating inflation">
        <p>
          A rise only makes you better off if your take-home grows faster than prices. Because tax takes a bigger share of the rise than of your whole
          salary, you need a slightly bigger percentage rise than the inflation rate to stand still. With inflation at 3.1%, someone on £28,000 needs
          about £1,020 more, a 3.6% rise, just to keep their take-home in line with prices. The calculator shows the rise you need to beat inflation.
        </p>
        <Callout title="Frozen thresholds">
          The Personal Allowance and higher-rate threshold are frozen until April 2031. As pay rises with inflation, more of it is taxed at higher
          rates: a hidden tax rise known as fiscal drag.
        </Callout>
      </GuideSection>

      <GuideSection id="timing" n={11} kicker="Payslips" title="When the rise shows on your payslip">
        <p>
          A rise usually starts in the next pay run after it is agreed. Backdated rises are often paid as a lump sum, which can be taxed at a higher
          rate in that month because PAYE treats it as if you were paid that much every month. Any overpaid tax is normally corrected over the rest of
          the tax year. A rise part-way through the year only counts for the months it is paid, so your first year&rsquo;s gain is smaller than the
          full-year figure in the calculator.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={12} kicker="Pensions" title="Putting part of a rise into your pension">
        <p>
          Paying more into a pension by salary sacrifice saves Income Tax and National Insurance on the amount you sacrifice. For a basic-rate taxpayer
          each £1 in the pension costs 72p of take-home; for a higher-rate taxpayer, 58p; inside the £100,000 trap, 38p. Raising your pension contribution
          at the same time as a pay rise means you never miss the money. See the <a href="/tax-and-salary/salary-sacrifice">salary sacrifice calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={13} kicker="Benefits" title="Pay rises and benefits">
        <p>
          On Universal Credit, each extra pound of take-home reduces your award by 55p once you are above any work allowance. A basic-rate taxpayer then
          keeps 72p × 45% = about 32p of each pound of rise. Help with childcare, prescriptions and council tax may change too. A rise is still worth
          having, but it is worth checking the whole picture with the <a href="/benefits/universal-credit-taper">UC taper calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="asking" n={14} kicker="Negotiating" title="Asking for a pay rise">
        <ul>
          <li>Collect evidence: market rates for your job, your achievements and any new responsibilities.</li>
          <li>Use the take-home figure, not just the salary, to decide what rise you need.</li>
          <li>Ask for the rise to beat inflation as a minimum, so your pay does not fall in real terms.</li>
          <li>Consider the whole package: pension contributions, holiday, flexible working and training can be worth as much as salary.</li>
        </ul>
      </GuideSection>

      <GuideSection id="promotion" n={15} kicker="Comparing" title="Weighing up a promotion or new job">
        <CompareCards
          columns={[
            {
              name: "Pay rise in your current job",
              rows: [
                { label: "Take-home", value: "As the calculator shows" },
                { label: "Pension", value: "Same scheme, usually same percentage" },
                { label: "Risk", value: "Low" },
              ],
            },
            {
              name: "New job at a higher salary",
              rows: [
                { label: "Take-home", value: "Compare after tax, NI and pension" },
                { label: "Pension", value: "Employer contribution may differ" },
                { label: "Risk", value: "New probation period, travel costs" },
              ],
            },
          ]}
        />
        <p>Use the <a href="/tax-and-salary/reverse-take-home">reverse take-home calculator</a> to work out the salary a new job would need to pay.</p>
      </GuideSection>

      <GuideSection id="example-trap" n={16} kicker="Example" title="A £100,000 example">
        <WorkedExample
          title="5% rise from £100,000 to £105,000"
          steps={[
            { label: "Pay rise", value: "£5,000" },
            { label: "Income Tax at 40%, plus £2,500 of allowance lost at 40%", value: "− £3,000" },
            { label: "National Insurance at 2%", value: "− £100" },
          ]}
          total={{ label: "Extra take-home a year (38% kept)", value: "£1,900" }}
        />
      </GuideSection>

      <GuideSection id="inflation-history" n={17} kicker="Real pay" title="Why real pay matters">
        <p>
          Over the long run, what matters is whether your pay buys more each year. When inflation was high in 2022 and 2023, many people received the largest
          cash pay rises in decades but were still worse off in real terms. Tracking your take-home after inflation, rather than your headline salary, gives a
          truer picture of whether your living standards are rising.
        </p>
      </GuideSection>

      <GuideSection id="part-year" n={18} kicker="Timing" title="A rise part-way through the year">
        <p>
          If your rise starts in, say, October, only half of it is paid in the 2026/27 tax year. The calculator compares full years, so your gain in the first
          tax year is about half the figure shown, and the full gain arrives the following year. PAYE spreads your Personal Allowance and bands across the year,
          so the tax on the higher pay in the second half is worked out correctly by the end of March as long as your tax code is right.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={19} kicker="Self-employed" title="If you are self-employed">
        <p>
          For sole traders, the same idea applies to extra profit: Income Tax at 20% or 40% plus Class 4 National Insurance at 6% or 2%. A basic-rate sole trader
          keeps 74p of each extra pound of profit, slightly more than an employee, because self-employed National Insurance is lower. See the{" "}
          <a href="/business/sole-trader-tax">sole trader tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="negotiating-total" n={20} kicker="Package" title="Looking at the whole package">
        <p>
          A pay rise is not the only way to be better off. A higher employer pension contribution goes into your pension without any tax or National Insurance,
          so £1,000 more from your employer is worth more than £1,000 more salary. Extra holiday, flexible hours and a shorter commute all have real value too.
          When you compare offers, add them up.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Thresholds that change what you keep, 2026/27"
          head={["Threshold", "Amount"]}
          rows={[
            ["Personal Allowance", "£12,570"],
            ["Higher rate starts", "£50,270"],
            ["Child Benefit charge", "£60,000 to £80,000"],
            ["Personal Allowance taper", "£100,000 to £125,140"],
            ["Plan 2 student loan threshold", "£29,385"],
            ["Plan 5 student loan threshold", "£25,000"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
