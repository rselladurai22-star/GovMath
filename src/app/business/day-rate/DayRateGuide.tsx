import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Freelance day rate — the guide. Figures from src/lib/business/freelance.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "method", title: "Working backwards from take-home" },
  { id: "days", title: "How many days you can really bill" },
  { id: "table", title: "Day rates for common targets" },
  { id: "example", title: "Worked example" },
  { id: "tax", title: "Tax and National Insurance for sole traders" },
  { id: "vs-salary", title: "Why a day rate is more than salary ÷ 260" },
  { id: "costs", title: "Business costs to include" },
  { id: "vat", title: "VAT and your day rate" },
  { id: "pension", title: "Paying into a pension" },
  { id: "market", title: "Checking your rate against the market" },
  { id: "limited", title: "Sole trader or limited company?" },
  { id: "ir35", title: "IR35 and contracting" },
  { id: "cash-flow", title: "Cash flow and setting money aside" },
  { id: "raising", title: "Raising your rate" },
  { id: "first-year", title: "Your first year as a freelancer" },
  { id: "hourly", title: "Day rates, hourly rates and project prices" },
  { id: "insurance", title: "Insurance and protection" },
  { id: "national-insurance", title: "Your State Pension record" },
  { id: "example-part-time", title: "A part-time example" },
  { id: "utilisation", title: "Utilisation: the number that matters most" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Self-employed National Insurance rates", href: "https://www.gov.uk/self-employed-national-insurance-rates" },
  { label: "GOV.UK — Income Tax rates and allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — Expenses if you're self-employed", href: "https://www.gov.uk/expenses-if-youre-self-employed" },
  { label: "GOV.UK — VAT registration", href: "https://www.gov.uk/register-for-vat" },
  { label: "GOV.UK — Understanding off-payroll working (IR35)", href: "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35" },
];

export default function DayRateGuide() {
  return (
    <Guide
      kicker="The day rate guide"
      title="How much should I charge per day as a freelancer?"
      intro={
        <>
          Setting a day rate is one of the hardest decisions for a new freelancer. Charge too little and you work long hours for less than you earned as
          an employee; charge too much and you struggle to win work. The best starting point is the income you need. This guide works backwards from your
          take-home pay to the rate that delivers it, counting the days you can really bill, your costs and the tax a sole trader pays in 2026/27.
        </>
      }
      meta={["2026/27 tax year", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Most freelancers can bill about <strong>200 days</strong> a year, not 260, once holidays, bank holidays, sickness and admin are counted.</li>
          <li>To take home <strong>£40,000</strong> as a sole trader, with £3,000 of costs and 202 billable days, you need about <strong>£261 a day</strong>.</li>
          <li>An employee would need a salary of about £50,763 for the same take-home, partly because self-employed National Insurance is lower.</li>
          <li>Above £90,000 of turnover you must register for VAT.</li>
        </ul>
        <KeyStats
          items={[
            { value: "202", label: "Billable days in the example" },
            { value: "£261", label: "Day rate for £40,000 take-home" },
            { value: "6%", label: "Class 4 NI on profit" },
            { value: "£90,000", label: "VAT threshold" },
          ]}
        />
      </GuideSection>

      <GuideSection id="method" n={2} kicker="Method" title="Working backwards from take-home">
        <ol>
          <li>Decide the take-home pay you need for the year.</li>
          <li>Find the profit that leaves that much after Income Tax, Class 4 National Insurance and any student loan.</li>
          <li>Add your business costs to get the turnover you need.</li>
          <li>Divide by the days you can actually bill.</li>
        </ol>
        <p>
          The calculator does all four steps, using the same sole trader tax engine as our <a href="/business/sole-trader-tax">sole trader tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="days" n={3} kicker="Billable days" title="How many days you can really bill">
        <DataTable
          caption="A typical freelancer's year"
          head={["Item", "Days"]}
          numeric={[1]}
          rows={[
            ["Weekdays in a year (52 × 5)", "260"],
            ["Holidays (5 weeks)", "− 25"],
            ["Bank holidays", "− 8"],
            ["Sickness", "− 5"],
            ["Admin, sales and training", "− 20"],
            ["Billable days", "202"],
          ]}
        />
        <p>
          Gaps between contracts are the biggest unknown. In your first year, or in a slow market, you might bill far fewer days. Add extra non-billable
          days to see how your rate changes.
        </p>
      </GuideSection>

      <GuideSection id="table" n={4} kicker="Table" title="Day rates for common targets">
        <DataTable
          caption="Day rate needed, 202 billable days, £3,000 costs, England, 2026/27"
          head={["Take-home a year", "Profit needed", "Day rate", "Employee salary for the same take-home"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£30,000", "£36,125", "£194", "£36,778"],
            ["£40,000", "£49,638", "£261", "£50,763"],
            ["£50,000", "£66,705", "£345", "£68,004"],
            ["£60,000", "£83,946", "£430", "£85,246"],
            ["£80,000", "£127,283", "£645 + VAT", "£128,705"],
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Worked example" title="Worked example">
        <WorkedExample
          title="£40,000 take-home, £3,000 of costs, 202 billable days"
          steps={[
            { label: "Profit needed", value: "£49,638" },
            { label: "Income Tax", value: "£7,413.60" },
            { label: "Class 4 National Insurance", value: "£2,224.08" },
            { label: "Turnover: profit + £3,000 costs", value: "£52,638" },
          ]}
          total={{ label: "Day rate: £52,638 ÷ 202", value: "£260.58" }}
        />
      </GuideSection>

      <GuideSection id="tax" n={6} kicker="Tax" title="Tax and National Insurance for sole traders">
        <p>
          Sole traders pay Income Tax on profit at the same rates as employees: 20% from £12,570, 40% from £50,270. National Insurance is different:
          Class 4 at 6% between £12,570 and £50,270 and 2% above, instead of an employee&rsquo;s 8%. Class 2 is no longer compulsory, but people with
          profits under £7,105 can pay it voluntarily to protect their State Pension. Tax is paid through Self Assessment, not through each invoice.
        </p>
      </GuideSection>

      <GuideSection id="vs-salary" n={7} kicker="Comparison" title="Why a day rate is more than salary ÷ 260">
        <CompareCards
          columns={[
            {
              name: "Employee",
              rows: [
                { label: "Paid holiday", value: "28 days including bank holidays" },
                { label: "Sick pay", value: "At least SSP" },
                { label: "Pension", value: "Employer pays at least 3%" },
                { label: "Costs", value: "Paid by the employer" },
              ],
            },
            {
              name: "Freelancer",
              rows: [
                { label: "Paid holiday", value: "None" },
                { label: "Sick pay", value: "None" },
                { label: "Pension", value: "All your own" },
                { label: "Costs", value: "Yours: equipment, insurance, software" },
              ],
            },
          ]}
        />
        <p>
          A freelancer charging £200 a day for 202 days earns £40,400 a year in turnover; an employee on a salary of £52,000 divided by 260 days would
          seem to earn the same per day, but with paid holiday, sick pay and pension on top.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={8} kicker="Expenses" title="Business costs to include">
        <ul>
          <li>Professional indemnity and public liability insurance;</li>
          <li>software, subscriptions, phone and broadband (the business share);</li>
          <li>equipment such as a laptop, spread over its life;</li>
          <li>accountant&rsquo;s fees and bank charges;</li>
          <li>travel to client sites that are not your regular workplace;</li>
          <li>training, memberships and marketing.</li>
        </ul>
        <p>Allowable costs reduce your taxable profit. Check what counts with the <a href="/business/allowable-expenses">allowable expenses checker</a>.</p>
      </GuideSection>

      <GuideSection id="vat" n={9} kicker="VAT" title="VAT and your day rate">
        <p>
          Once your turnover goes over £90,000 in any 12 months, you must register for VAT and add 20% to your invoices. Business clients usually reclaim
          it, so it does not cost them anything, but consumers cannot. In the table, a £80,000 take-home needs turnover of £130,283, well over the
          threshold. See the <a href="/business/vat-threshold">VAT threshold checker</a>.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={10} kicker="Retirement" title="Paying into a pension">
        <p>
          Without an employer, your pension is up to you. Contributions to a personal pension get basic-rate tax relief added by the provider, and
          higher-rate taxpayers claim the rest through Self Assessment. Enter a yearly contribution under More options to include it in your day rate.
          Even a few hundred pounds a month makes a large difference over a working life.
        </p>
      </GuideSection>

      <GuideSection id="market" n={11} kicker="Pricing" title="Checking your rate against the market">
        <p>
          The calculator gives the rate you need; the market decides the rate you can get. Check job boards and freelancer platforms for your skills and
          area, ask other freelancers, and look at agency rates. If the market rate is well below what you need, you may need to specialise, find better-paying
          clients or reduce costs. If it is above, charge it.
        </p>
      </GuideSection>

      <GuideSection id="limited" n={12} kicker="Structure" title="Sole trader or limited company?">
        <p>
          A limited company pays Corporation Tax on profit and you pay yourself through a mix of salary and dividends. At higher profits this can save tax,
          though the gap has narrowed since dividend tax and Corporation Tax rose. There is more admin and accountancy cost. Compare with the{" "}
          <a href="/business/dividend-vs-salary">dividend vs salary calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="ir35" n={13} kicker="Contractors" title="IR35 and contracting">
        <p>
          Contractors working through their own company may fall inside IR35 if the work looks like employment. Inside IR35, the client or fee-payer deducts
          tax and National Insurance as if you were an employee, which lowers take-home considerably. Check with the{" "}
          <a href="/tax-and-salary/ir35-take-home">IR35 take-home calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="cash-flow" n={14} kicker="Practical" title="Cash flow and setting money aside">
        <p>
          Self-employed tax is paid on 31 January and 31 July. In your second year, the January bill can include the whole of your first year&rsquo;s tax plus
          a payment on account for the next. A simple rule is to move a share of every invoice, often 25% to 30%, into a separate savings account. Keep three
          months of costs as a buffer for gaps between work.
        </p>
        <Callout title="Late payment">
          Business clients who pay late can be charged statutory interest of 8% above the Bank of England base rate, plus a fixed fee.
        </Callout>
      </GuideSection>

      <GuideSection id="raising" n={15} kicker="Growth" title="Raising your rate">
        <p>
          Review your rate at least once a year. Raise it for new clients first, and give existing clients notice. As your experience and reputation grow,
          and as prices and costs rise, your rate should rise too; otherwise inflation quietly cuts your real income each year.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={16} kicker="Getting started" title="Your first year as a freelancer">
        <p>
          The first year is usually the hardest. It takes time to find clients, so expect fewer billable days, perhaps 120 to 160, while you build a
          reputation and a pipeline of work. You may also have set-up costs such as a laptop, website and insurance. Many freelancers start with savings
          covering three to six months of living costs, or keep some part-time employment while they build up. Use the calculator with a higher number of
          unpaid days to see the rate you would need in a slow first year, and remember that tax on your first year is not due until 31 January after the
          end of the tax year.
        </p>
      </GuideSection>

      <GuideSection id="hourly" n={17} kicker="Pricing models" title="Day rates, hourly rates and project prices">
        <p>
          Day rates suit work where clients book your time, such as consultancy, design and development. Hourly rates suit short or variable tasks, such as
          tutoring or repairs. Project prices suit clearly defined pieces of work and can earn more if you are efficient, but carry the risk of overruns.
          Whichever you use, the calculation underneath is the same: your yearly income need divided by the time you can sell. If you quote by the project,
          estimate the days it will take and multiply by your day rate, then add a margin for changes.
        </p>
      </GuideSection>

      <GuideSection id="insurance" n={18} kicker="Protection" title="Insurance and protection">
        <p>
          Freelancers have no employer to provide sick pay or death-in-service cover. Many take out professional indemnity insurance, which some clients
          require, and public liability insurance if they work on client sites. Income protection insurance pays a monthly income if illness stops you
          working for a long period. These policies cost money, so include them in your business costs or personal budget when you set your rate.
        </p>
      </GuideSection>

      <GuideSection id="national-insurance" n={19} kicker="State Pension" title="Your State Pension record">
        <p>
          With profits above the Small Profits Threshold of £7,105, you get a National Insurance credit towards your State Pension without paying Class 2. If
          your profits are lower, for example in a quiet first year, you can pay voluntary Class 2 contributions of £3.65 a week to protect your record. You
          need 35 qualifying years for the full new State Pension.
        </p>
      </GuideSection>

      <GuideSection id="example-part-time" n={20} kicker="Part-time" title="A part-time example">
        <p>
          Someone who wants £25,000 take-home from three days a week has about 120 billable days after holidays and admin. With £2,000 of costs, the calculator
          shows the rate needed: set days worked a week to 3 and adjust the unpaid days. Part-time freelancing often needs a higher day rate than full time,
          because fixed costs such as insurance and software are spread over fewer days.
        </p>
      </GuideSection>

      <GuideSection id="utilisation" n={21} kicker="Utilisation" title="Utilisation: the number that matters most">
        <p>
          Utilisation is the share of your available days that you actually bill. At 202 billable days out of 260 weekdays, it is 78%. Many freelancers find 60%
          to 75% is realistic once they count quiet spells. Every 10 days of lost billing on a £261 day rate costs £2,610 of turnover, so a slightly higher rate
          can protect you against gaps. Track your billed days each month to see how close you are to your plan.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Sole trader tax, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Personal Allowance", "£12,570"],
            ["Basic rate 20%", "£12,571 to £50,270"],
            ["Class 4 NI", "6% to £50,270, 2% above"],
            ["Small Profits Threshold", "£7,105"],
            ["VAT registration threshold", "£90,000"],
            ["Trading allowance", "£1,000"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
