import {
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** P45 and P60 — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "difference", title: "P45 and P60 at a glance" },
  { id: "p45", title: "Your P45" },
  { id: "p45-use", title: "What to do with a P45" },
  { id: "p60", title: "Your P60" },
  { id: "check", title: "Checking your P60" },
  { id: "other-forms", title: "P11D, P800 and payslips" },
  { id: "dates", title: "Key dates in the tax year" },
  { id: "lost", title: "Lost or missing forms" },
  { id: "p60-table", title: "Expected tax at common salaries" },
  { id: "p45-table", title: "Tax to date on a P45" },
  { id: "several", title: "Several jobs or pensions" },
  { id: "mortgages", title: "Using your P60 for a mortgage or return" },
  { id: "leaving-tax", title: "What happens to your tax when you leave" },
  { id: "other-lines", title: "Statutory pay and student loans" },
  { id: "refund-times", title: "How long refunds take" },
  { id: "ni-check", title: "Checking National Insurance on your P60" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — P45, P60 and P11D forms: workers’ guide", href: "https://www.gov.uk/paye-forms-p45-p60-p11d" },
  { label: "GOV.UK — Check your Income Tax for the current year", href: "https://www.gov.uk/check-income-tax-current-year" },
  { label: "GOV.UK — Tax overpayments and underpayments", href: "https://www.gov.uk/tax-overpayments-and-underpayments" },
  { label: "GOV.UK — Claim a tax refund", href: "https://www.gov.uk/claim-tax-refund" },
  { label: "GOV.UK — Starter checklist for PAYE", href: "https://www.gov.uk/government/publications/paye-starter-checklist" },
];

export default function P45P60Guide() {
  return (
    <Guide
      kicker="The P45 and P60 guide"
      title="P45 and P60, explained clearly"
      intro={
        <>
          Your P45 and P60 are the two most important tax documents most employees ever receive. They record your pay and
          tax, carry information from one job to the next, and are the quickest way to check whether you paid the right
          tax. This guide explains each form, what to do with it, and how to check the figures.
        </>
      }
      meta={["Current rules", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="difference" n={1} kicker="At a glance" title="P45 and P60 at a glance">
        <CompareCards
          columns={[
            {
              name: "P45",
              rows: [
                { label: "When", value: "When you leave a job" },
                { label: "Covers", value: "6 April to your leaving date" },
                { label: "Used for", value: "Your next job, refunds, benefits" },
              ],
            },
            {
              name: "P60",
              rows: [
                { label: "When", value: "By 31 May each year" },
                { label: "Covers", value: "The whole tax year to 5 April" },
                { label: "Used for", value: "Checking tax, mortgages, returns" },
              ],
            },
          ]}
        />
        <p>
          You get a P60 from every employer you are working for on 5 April, and from a pension provider if you receive a
          pension. You get a P45 from each employer you leave during the year. Many employers now provide both
          electronically.
        </p>
      </GuideSection>

      <GuideSection id="p45" n={2} kicker="P45" title="Your P45">
        <p>
          A P45 shows your pay and tax from 6 April up to the day you left, and the tax code used on your last payslip.
          Your employer sends the leaving details to HMRC through payroll and gives you the rest of the form:
        </p>
        <ul>
          <li><strong>Part 1A</strong> is your copy. Keep it.</li>
          <li><strong>Parts 2 and 3</strong> go to your next employer, or to the Jobcentre if you claim benefits.</li>
        </ul>
        <DataTable
          caption="The key boxes on a P45"
          head={["Box", "What it shows"]}
          rows={[
            ["Tax code at leaving date", "The code on your final payslip, and whether it was Week 1 or Month 1"],
            ["Last entries: week or month number", "How far into the tax year you were paid"],
            ["Total pay to date", "Taxable pay from 6 April, including any earlier jobs if your employer used your previous P45"],
            ["Total tax to date", "Income Tax deducted in the same period"],
            ["Student loan deductions", "Whether repayments should continue in your next job"],
          ]}
        />
      </GuideSection>

      <GuideSection id="p45-use" n={3} kicker="Using it" title="What to do with a P45">
        <p>
          Give parts 2 and 3 to your new employer as soon as you start. Payroll uses the pay and tax to date to carry on
          your cumulative tax from where your last job stopped, which avoids an emergency tax code.
        </p>
        <WorkedExample
          title="Leaving in September (month 6) on £32,000 a year, code 1257L"
          steps={[
            { label: "Total pay to date", note: "6 months", value: "£16,000.00" },
            { label: "Tax-free pay for 6 months", note: "£12,579 × 6 ÷ 12", value: "£6,289.50" },
            { label: "Taxable pay", value: "£9,710.50" },
          ]}
          total={{ label: "Tax to date should be about", value: "£1,942.10" }}
        />
        <p>
          If you do not have a P45, your new employer will ask you to fill in the starter checklist instead. If you are not
          going straight into a new job, keep your P45: you may need it to claim a tax refund or benefits.
        </p>
      </GuideSection>

      <GuideSection id="p60" n={4} kicker="P60" title="Your P60">
        <p>
          A P60 summarises a whole tax year in one job: your pay, the Income Tax and National Insurance deducted, your
          final tax code, and any statutory payments such as maternity or sick pay. Your employer must give it to you by
          <strong> 31 May</strong>.
        </p>
        <p>You will need it to:</p>
        <ul>
          <li>check you paid the right tax for the year,</li>
          <li>fill in a Self Assessment tax return,</li>
          <li>prove your income for a mortgage, loan or benefit claim, and</li>
          <li>claim back tax, for example on work expenses.</li>
        </ul>
      </GuideSection>

      <GuideSection id="check" n={5} kicker="Checking" title="Checking your P60">
        <p>
          You can check the tax on your P60 in a few steps. Take your pay, subtract the tax-free amount from your tax code,
          and work out the tax on the rest using the bands. The calculator above does this for you.
        </p>
        <WorkedExample
          title="A P60 showing £32,000 of pay and £3,900 of tax, code 1257L"
          steps={[
            { label: "Pay in this employment", value: "£32,000" },
            { label: "Tax-free pay", note: "Code 1257L", value: "£12,579" },
            { label: "Taxable pay at 20%", value: "£19,421" },
            { label: "Tax due", value: "£3,884.20" },
          ]}
          total={{ label: "Difference from £3,900", value: "£15.80: about right" }}
        />
        <p>
          Small differences are normal because of rounding and pay dates. A difference of hundreds of pounds usually
          means a wrong or emergency tax code at some point in the year, or income from another job or pension that
          shared your allowance.
        </p>
        <Callout title="Scottish taxpayers">
          Scottish bands change more often than the rest of the UK&rsquo;s. Check your P60 against the bands for the year it
          covers: 2025/26 Scottish bands were lower than the 2026/27 ones used in the calculator.
        </Callout>
      </GuideSection>

      <GuideSection id="other-forms" n={6} kicker="Related forms" title="P11D, P800 and payslips">
        <ul>
          <li>
            <strong>P11D</strong>: shows the taxable value of company benefits, such as a car or private medical
            insurance. Employers give you the details by 6 July.
          </li>
          <li>
            <strong>P800</strong>: HMRC&rsquo;s own calculation if you paid too much or too little tax through PAYE.
            Usually sent between June and the end of November.
          </li>
          <li>
            <strong>Payslips</strong>: show each payment. Your employer must give you one every time you are paid,
            including the hours if your pay varies with time worked.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="dates" n={7} kicker="Timeline" title="Key dates in the tax year">
        <Timeline
          items={[
            { when: "6 April", what: "Tax year starts", detail: "New tax codes and rates apply." },
            { when: "31 May", what: "P60 deadline", detail: "Employers must give you a P60 for the year that ended on 5 April." },
            { when: "6 July", what: "P11D deadline", detail: "Details of taxable benefits for the previous year." },
            { when: "June to November", what: "P800s are sent", detail: "HMRC calculations for PAYE overpayments and underpayments." },
            { when: "31 January", what: "Self Assessment deadline", detail: "For online returns covering the tax year that ended the previous April." },
          ]}
        />
      </GuideSection>

      <GuideSection id="lost" n={8} kicker="Missing forms" title="Lost or missing forms">
        <p>
          HMRC cannot issue a replacement P45 or P60. If you lose one, ask your former employer for a copy or a statement of
          earnings. You can also see your pay and tax for previous years in the HMRC app or your personal tax account,
          which is often enough for a refund claim or a mortgage application.
        </p>
        <p>
          If an employer will not give you a P45 when you leave or a P60 by 31 May, they are breaking the law. Ask in
          writing first; if that fails, contact HMRC.
        </p>
      </GuideSection>

      <GuideSection id="p60-table" n={9} kicker="Reference" title="Expected tax at common salaries">
        <DataTable
          caption="Expected Income Tax for a full year on code 1257L, England, Wales or NI"
          head={["Pay on P60", "Expected tax"]}
          numeric={[1]}
          rows={[
            ["£20,000", "£1,484.20"],
            ["£30,000", "£3,484.20"],
            ["£45,000", "£6,484.20"],
            ["£60,000", "£11,428.40"],
          ]}
        />
        <p>
          These use the payroll allowance of £12,579 for code 1257L. If your P60 shows a figure within a few pounds, your
          tax is right. Bigger differences usually come from a code that changed during the year.
        </p>
      </GuideSection>

      <GuideSection id="p45-table" n={10} kicker="Reference" title="Tax to date on a P45">
        <DataTable
          caption="Expected tax to date on a £30,000 salary, code 1257L"
          head={["Leaving after", "Pay to date", "Tax to date"]}
          numeric={[1, 2]}
          rows={[
            ["3 months (June)", "£7,500.00", "£871.05"],
            ["6 months (September)", "£15,000.00", "£1,742.10"],
            ["9 months (December)", "£22,500.00", "£2,613.15"],
          ]}
        />
        <p>
          If the tax to date on your P45 is much higher than this, you may have been on an emergency code. Your next
          employer will correct it using the P45 figures, or you can claim a refund if you are not working.
        </p>
      </GuideSection>

      <GuideSection id="several" n={11} kicker="More than one income" title="Several jobs or pensions">
        <p>
          You get a separate P60 from each employer or pension provider you have on 5 April. To check your tax, add up the
          pay and tax across all of them: your tax-free allowance is shared, so a second job on a BR code will show 20%
          tax on every pound, which is correct if your main job uses the whole allowance.
        </p>
        <p>
          Enter your other jobs under More options in the calculator to check the total. The HMRC app shows all your PAYE
          income for the year in one place.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={12} kicker="Using it" title="Using your P60 for a mortgage or return">
        <p>
          Lenders usually ask for your latest P60 alongside recent payslips to confirm your income. If you changed jobs
          recently, you may need your P45 and payslips from the new job instead.
        </p>
        <p>
          If you fill in a Self Assessment tax return, copy the pay and tax figures from each P60 and P45 into the
          employment pages. Keep the documents for at least 22 months after the end of the tax year they relate to, or
          longer if you file late.
        </p>
      </GuideSection>

      <GuideSection id="leaving-tax" n={13} kicker="Leaving" title="What happens to your tax when you leave">
        <p>
          Your last employer works out your final pay, including any holiday pay owed, and records your pay and tax to
          date on your P45. Anything paid after the P45 is issued, such as a late bonus, is taxed using code 0T on a
          non-cumulative basis, so no tax-free allowance is given against it.
        </p>
        <p>
          If you then have a gap before your next job, you may have built up unused allowance. Your new employer will use
          your P45 to give you that allowance, which often means little or no tax on your first payslip. If you do not go
          back to work in the same tax year, you can claim a refund from HMRC.
        </p>
      </GuideSection>

      <GuideSection id="other-lines" n={14} kicker="Other figures" title="Statutory pay and student loans">
        <p>
          Your P60 also shows statutory payments made through payroll during the year, such as Statutory Maternity Pay,
          Statutory Paternity Pay, Statutory Sick Pay and Shared Parental Pay. These are taxable and are already included
          in your total pay.
        </p>
        <p>
          Student loan repayments made through payroll are shown separately. Compare them with the balance in your
          Student Loans Company account: if your income for the year was below your plan&rsquo;s threshold but
          repayments were taken, for example because of a bonus month, you can ask for a refund.
        </p>
      </GuideSection>

      <GuideSection id="refund-times" n={15} kicker="Refunds" title="How long refunds take">
        <ul>
          <li>
            <strong>Through payroll:</strong> usually your next payday after HMRC sends your employer a corrected code.
          </li>
          <li>
            <strong>P800 after the tax year:</strong> usually issued between June and the end of November. If you claim
            online, payment normally arrives within about five working days.
          </li>
          <li>
            <strong>Claims by post or for earlier years:</strong> can take several weeks. You can usually claim for the
            last four tax years.
          </li>
        </ul>
        <p>
          You never need to pay a refund company to claim tax back from HMRC; it is free to do yourself.
        </p>
      </GuideSection>

      <GuideSection id="ni-check" n={16} kicker="National Insurance" title="Checking National Insurance on your P60">
        <p>
          Your P60 shows the employee National Insurance taken during the year and the earnings it was charged on, split
          into bands. National Insurance is worked out on each payment, not over the year, so you cannot check it with
          a single annual calculation if your pay varied.
        </p>
        <p>
          For steady monthly pay in 2026/27, it should be about 8% of the pay between £1,048 and £4,189 each month, plus 2%
          of anything above £4,189. On £32,000 a year paid evenly that is about £1,554 for the year. A month with a large
          bonus usually means slightly less NI overall, because more of it falls in the 2% band.
        </p>
        <p>
          The P60 also shows earnings at the Lower Earnings Limit. If those are recorded, the year counts towards your
          State Pension even if you paid little or no National Insurance. Check your National Insurance record in the
          HMRC app to make sure each year has been counted.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={17} kicker="Questions" title="Common questions">
        <h3>Do I get a P60 if I left my job before 5 April?</h3>
        <p>No. You get a P45 when you leave instead. The P60 only comes from employers you work for on 5 April.</p>
        <h3>Should my P45 include pay from my previous job?</h3>
        <p>
          If your employer used your previous P45, the &ldquo;total pay to date&rdquo; includes it, and the form separately
          shows pay in that job.
        </p>
        <h3>My P60 tax looks too high. What should I do?</h3>
        <p>
          Check your tax code and any other income for the year, then look in the HMRC app. If you overpaid, HMRC usually
          refunds it automatically through a P800, or you can claim.
        </p>
        <h3>Does my P60 show student loan repayments?</h3>
        <p>Yes, P60s include student loan deductions made through payroll during the year.</p>
        <h3>Do pension providers issue P60s?</h3>
        <p>Yes. If you receive a pension taxed through PAYE, the provider gives you a P60 each year, just like an employer.</p>
        <h3>What if the figures on my P45 look wrong?</h3>
        <p>
          Ask your former employer to check them against your payslips. If the pay or tax to date is wrong, they can issue
          a corrected P45 or send updated figures to HMRC, and your next employer can then use the right numbers.
        </p>
        <h3>Is my P60 the same as my payslip?</h3>
        <p>No. A payslip covers one payment; the P60 adds up every payment in the tax year from that employer.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "31 May", label: "P60 deadline for the previous tax year" },
            { value: "6 July", label: "P11D deadline" },
            { value: "Part 1A", label: "Your copy of the P45" },
            { value: "Parts 2 and 3", label: "For your next employer" },
            { value: "£12,579", label: "Payroll tax-free pay for 1257L" },
            { value: "P800", label: "HMRC’s tax calculation" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
