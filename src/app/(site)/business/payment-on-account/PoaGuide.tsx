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

/** Payments on account — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who has to make them" },
  { id: "dates", title: "The payment dates" },
  { id: "first-year", title: "Your first year" },
  { id: "steady", title: "A steady year" },
  { id: "changing", title: "When your income changes" },
  { id: "reducing", title: "Reducing your payments on account" },
  { id: "excluded", title: "What is left out" },
  { id: "late", title: "Paying late" },
  { id: "ways", title: "Ways to pay and to budget" },
  { id: "mtd", title: "Making Tax Digital and payments on account" },
  { id: "job", title: "Starting or leaving a job" },
  { id: "landlords", title: "Landlords, partners and others" },
  { id: "statement", title: "Checking HMRC's figures" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Understand your Self Assessment tax bill: payments on account", href: "https://www.gov.uk/understand-self-assessment-bill/payments-on-account" },
  { label: "GOV.UK — Pay your Self Assessment tax bill", href: "https://www.gov.uk/pay-self-assessment-tax-bill" },
  { label: "GOV.UK — Reduce payments on account (SA303)", href: "https://www.gov.uk/government/publications/self-assessment-claim-to-reduce-payments-on-account-sa303" },
  { label: "GOV.UK — Self Assessment deadlines", href: "https://www.gov.uk/self-assessment-tax-returns/deadlines" },
  { label: "GOV.UK — Estimate your penalty for late Self Assessment", href: "https://www.gov.uk/estimate-self-assessment-penalties" },
];

export default function PoaGuide() {
  return (
    <Guide
      kicker="The payments on account guide"
      title="Payments on account, explained"
      intro={
        <>
          If you pay tax through Self Assessment, HMRC usually asks you to pay towards next year&rsquo;s bill in advance, in two
          instalments called payments on account. They are why the first January bill for a new sole trader is so large, and
          why your bill can jump or fall from one year to the next. This guide explains how they work and how to plan for them.
        </>
      }
      meta={["Self Assessment", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          A payment on account is an advance payment towards your next Self Assessment bill. Each one is{" "}
          <strong>half of your previous year&rsquo;s bill</strong>, and they are due on <strong>31 January</strong> and{" "}
          <strong>31 July</strong>. When you file your return, a <strong>balancing payment</strong> settles any difference.
        </p>
        <KeyStats
          items={[
            { value: "50%", label: "Each payment on account, of last year's bill" },
            { value: "31 Jan / 31 Jul", label: "When they are due" },
            { value: "£1,000", label: "No payments on account below this" },
            { value: "80%", label: "Or if this share is taxed at source" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Who" title="Who has to make them">
        <p>You make payments on account unless one of two things is true:</p>
        <ul>
          <li>
            your last Self Assessment bill was <strong>less than £1,000</strong>; or
          </li>
          <li>
            more than <strong>80%</strong> of all the tax you owed for the year was already deducted at source, mainly through
            PAYE on a salary or pension.
          </li>
        </ul>
        <DataTable
          caption="Do you need payments on account?"
          head={["Situation", "Self Assessment bill", "Taxed at source", "Payments on account?"]}
          numeric={[1, 2]}
          rows={[
            ["Small side income", "£950", "£0", "No: under £1,000"],
            ["Employee with some freelance work", "£1,800", "£8,000", "No: 82% at source"],
            ["Employee with more freelance work", "£3,000", "£7,000", "Yes: £1,500 each"],
            ["Full-time sole trader", "£8,000", "£0", "Yes: £4,000 each"],
          ]}
        />
        <p>
          Employed people with a little extra income often avoid payments on account entirely, because most of their tax is
          collected through PAYE. Full-time sole traders and landlords nearly always make them.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={3} kicker="Timing" title="The payment dates">
        <p>For the 2026/27 tax year, which runs from 6 April 2026 to 5 April 2027, the payments fall like this:</p>
        <Timeline
          items={[
            { when: "31 January 2027", what: "First payment on account for 2026/27", detail: "Paid alongside the balancing payment for 2025/26." },
            { when: "31 July 2027", what: "Second payment on account for 2026/27", detail: "The same amount again." },
            { when: "31 January 2028", what: "Balancing payment for 2026/27", detail: "The 2026/27 bill minus the two payments on account, plus the first payment on account for 2027/28." },
          ]}
        />
        <p>
          The first payment on account is due before the tax year it relates to has even ended. HMRC is collecting tax as you
          earn, rather than up to 22 months later.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={4} kicker="Year one" title="Your first year">
        <p>
          In your first year of self-employment, nothing is due until the January after the tax year ends. Then the whole
          first year&rsquo;s bill and the first payment on account for the next year fall due together.
        </p>
        <WorkedExample
          title="First year, £8,000 bill"
          steps={[
            { label: "Balancing payment: whole first-year bill", value: "£8,000" },
            { label: "First payment on account for next year", note: "Half of £8,000", value: "£4,000" },
            { label: "Due on the first 31 January", value: "£12,000" },
            { label: "Second payment on account, 31 July", value: "£4,000" },
          ]}
          total={{ label: "Paid in six months", value: "£16,000" }}
        />
        <Callout tone="warn" title="Two years' tax in six months">
          After a first year with no tax bills, you pay a year and a half&rsquo;s tax in January and a further half-year in July.
          This is the single most common cash-flow shock for new sole traders. Save from your first invoice.
        </Callout>
      </GuideSection>

      <GuideSection id="steady" n={5} kicker="Normal years" title="A steady year">
        <p>
          Once you are established and your profit is stable, payments on account smooth out the bill. Each January you pay a
          small balancing payment plus half of the year&rsquo;s tax, and each July the other half.
        </p>
        <WorkedExample
          title="A £7,000 bill last year, £8,000 this year"
          steps={[
            { label: "Payments on account already made towards 2025/26", note: "2 × £3,500", value: "£7,000" },
            { label: "2025/26 bill", value: "£8,000" },
            { label: "Balancing payment for 2025/26", value: "£1,000" },
            { label: "First payment on account for 2026/27", note: "Half of £8,000", value: "£4,000" },
          ]}
          total={{ label: "Due on 31 January 2027", value: "£5,000" }}
        />
        <Figure label="Payments for a £8,000 bill that stays the same" caption="After the first year, each date carries about half a year's tax.">
          <Bars
            items={[
              { label: "31 January 2027", value: 5000 },
              { label: "31 July 2027", value: 4000 },
              { label: "31 January 2028", value: 4000 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="changing" n={6} kicker="Ups and downs" title="When your income changes">
        <p>
          Because payments on account are based on last year&rsquo;s bill, a change in profit shows up a year late. A good year
          means a bigger January bill the year after; a bad year means you have paid too much and get some back.
        </p>
        <CompareCards
          columns={[
            {
              name: "Bill rises from £6,000 to £10,000",
              rows: [
                { label: "Payments on account", value: "£3,000 each" },
                { label: "31 January 2028 balance", value: "£4,000" },
                { label: "Plus next year's first payment", value: "£5,000" },
                { label: "Due 31 January 2028", value: "£9,000" },
              ],
            },
            {
              name: "Bill falls from £10,000 to £6,000",
              rows: [
                { label: "Payments on account", value: "£5,000 each" },
                { label: "Overpaid for 2026/27", value: "£4,000" },
                { label: "Next year's first payment", value: "£3,000" },
                { label: "Net on 31 January 2028", value: "£1,000 back" },
              ],
            },
          ]}
        />
        <p>
          A rising income is the harder case: the extra tax arrives all at once with a bigger payment on account on top. If
          your profit is growing fast, save a percentage of every invoice rather than relying on last year&rsquo;s bill as a
          guide.
        </p>
      </GuideSection>

      <GuideSection id="reducing" n={7} kicker="Paying less" title="Reducing your payments on account">
        <p>
          If you expect this year&rsquo;s bill to be lower, you can ask HMRC to reduce your payments on account, either in your
          online account or on form <strong>SA303</strong>. You might do this after a quiet year, a move into employment, a big
          pension contribution or higher expenses.
        </p>
        <WorkedExample
          title="Last year £10,000, this year expected £6,000"
          steps={[
            { label: "Payments on account as set", value: "2 × £5,000" },
            { label: "Reduced to", value: "2 × £3,000" },
          ]}
          total={{ label: "Cash kept in the business until January 2028", value: "£4,000" }}
        />
        <Callout tone="warn" title="Do not cut too far">
          If you reduce your payments and the final bill turns out higher, HMRC charges interest on the shortfall from the
          original due dates. Reducing to £1,000 each when the bill is £6,000 leaves £4,000 to pay in January 2028, plus
          interest. Deliberately or carelessly claiming too big a reduction can also lead to a penalty.
        </Callout>
        <p>You can also reduce them to zero if you expect no Self Assessment bill at all, for example after stopping trading.</p>
      </GuideSection>

      <GuideSection id="excluded" n={8} kicker="The detail" title="What is left out">
        <p>
          Payments on account are based on your Income Tax and Class 4 National Insurance only. These are paid with the
          balancing payment, but never in advance:
        </p>
        <ul>
          <li>student loan and postgraduate loan repayments;</li>
          <li>voluntary Class 2 National Insurance;</li>
          <li>Capital Gains Tax.</li>
        </ul>
        <WorkedExample
          title="An £8,000 bill plus £1,200 of student loan"
          steps={[
            { label: "Income Tax and Class 4", value: "£8,000" },
            { label: "Student loan", value: "£1,200" },
            { label: "Each payment on account", note: "Half of £8,000 only", value: "£4,000" },
          ]}
          total={{ label: "Balancing payment each January", value: "£1,200" }}
        />
        <p>
          So if you repay a student loan through Self Assessment, expect a January balancing payment every year, even when your
          profit is stable. Capital Gains Tax on residential property is different again: it is due within 60 days of the sale.
        </p>
      </GuideSection>

      <GuideSection id="late" n={9} kicker="Penalties" title="Paying late">
        <p>
          Interest is charged on any late payment, including payments on account, from the day after it was due. The rate is
          the Bank of England base rate plus 4%.
        </p>
        <p>Late payment penalties apply only to the balancing payment:</p>
        <DataTable
          caption="Late payment penalties on the balancing payment"
          head={["Still unpaid after", "Penalty"]}
          rows={[
            ["30 days", "5% of the tax unpaid"],
            ["6 months", "A further 5%"],
            ["12 months", "A further 5%"],
          ]}
        />
        <p>
          Filing late is penalised separately: £100 straight away, then daily penalties after three months and further
          penalties at six and twelve months. File on time even if you cannot pay, and contact HMRC about a payment plan.
          Sole traders and landlords within Making Tax Digital move to a newer system from 2026/27: penalty points for late submissions, and late payment
          penalties of 3% of tax unpaid after 15 days and a further 3% after 30 days, then a daily rate.
        </p>
      </GuideSection>

      <GuideSection id="ways" n={10} kicker="Practical" title="Ways to pay and to budget">
        <ul>
          <li>
            <strong>Save a percentage of every invoice</strong> in a separate account. Many sole traders put aside 20% to 30%.
          </li>
          <li>
            <strong>Budget payment plan:</strong> pay HMRC weekly or monthly by direct debit towards your next bill, if you are
            up to date with earlier payments.
          </li>
          <li>
            <strong>Time to Pay:</strong> if you owe £30,000 or less and cannot pay in full, you can usually set up a monthly
            plan online, though interest still applies.
          </li>
          <li>
            <strong>Pay through your tax code:</strong> if you also have a job and owe less than £3,000, filing online by
            30 December lets HMRC collect the balancing payment through PAYE over the following tax year. Payments on account
            cannot be collected this way.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="mtd" n={11} kicker="New rules" title="Making Tax Digital and payments on account">
        <p>
          Making Tax Digital for Income Tax started in April 2026 for sole traders and landlords with income over £50,000. It
          brings quarterly updates to HMRC, but it does <strong>not</strong> change when you pay. Payments on account are still
          due on 31 January and 31 July, and the balancing payment on 31 January.
        </p>
        <p>
          One benefit of the quarterly updates is that HMRC&rsquo;s estimate of your tax builds up through the year. That makes
          it easier to judge whether to reduce your payments on account, or to save more because your bill is heading up.
        </p>
      </GuideSection>

      <GuideSection id="job" n={12} kicker="Changing circumstances" title="Starting or leaving a job">
        <p>
          A change in how your income is taxed can switch payments on account on or off. If you take a job and most of your tax
          is then collected through PAYE, more than 80% of your tax may be taxed at source. HMRC applies the test to the latest
          return, so the change usually shows up a year later, and you can ask to reduce your payments on account in the
          meantime.
        </p>
        <p>
          The reverse also happens. If you leave a job to go self-employed, your first Self Assessment bill may be the first one
          over £1,000, and payments on account start from the next January.
        </p>
        <WorkedExample
          title="Leaving a job part-way through the year"
          steps={[
            { label: "PAYE collected from the job", value: "£7,000" },
            { label: "Self Assessment bill on the new business", value: "£3,000" },
            { label: "Share of tax collected at source", value: "70%" },
          ]}
          total={{ label: "Each payment on account", value: "£1,500" }}
        />
      </GuideSection>

      <GuideSection id="landlords" n={13} kicker="Not just sole traders" title="Landlords, partners and others">
        <p>
          Payments on account apply to anyone who pays tax through Self Assessment, not just sole traders. Common cases:
        </p>
        <ul>
          <li>
            <strong>Landlords</strong>, whose rental profit is not taxed at source. The bill includes Income Tax on rent but no
            National Insurance.
          </li>
          <li>
            <strong>Partners</strong> in a business partnership, who each pay on their share of the profit.
          </li>
          <li>
            <strong>Company directors</strong> taking dividends above the £500 dividend allowance, because dividend tax is not
            deducted at source.
          </li>
          <li>
            <strong>Higher earners</strong> paying the High Income Child Benefit Charge or with large savings interest.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="statement" n={14} kicker="Checks" title="Checking HMRC's figures">
        <p>
          After you file, your HMRC online account shows a statement of everything due. Check that:
        </p>
        <ul>
          <li>each payment on account is half of the Income Tax and Class 4 NI on your latest return, not the whole bill;</li>
          <li>student loan and Capital Gains Tax are in the balancing payment, not the payments on account;</li>
          <li>any payments on account you have already made have been credited against the right year;</li>
          <li>any reduction you asked for has been applied.</li>
        </ul>
        <p>
          If something looks wrong, contact HMRC before the due date. Paying the amount you believe is right and querying the
          rest stops interest building on anything you do owe.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={15} kicker="FAQs" title="Common questions">
        <h3>Are payments on account extra tax?</h3>
        <p>No. They are advance payments of the same tax. Any overpayment is refunded or set against your next bill.</p>
        <h3>Why do I have to pay tax for a year that has not finished?</h3>
        <p>
          The rules collect tax roughly as the year goes on, as PAYE does for employees, rather than waiting until up to 22
          months after the income was earned.
        </p>
        <h3>Do I get a refund if I overpay?</h3>
        <p>
          Yes. If your payments on account were more than the final bill, the excess is set against your next payment or
          refunded if you ask.
        </p>
        <h3>What if I stop being self-employed?</h3>
        <p>
          If you expect no Self Assessment bill for the year, ask HMRC to reduce your payments on account to zero. You still
          need to file the final year&rsquo;s return.
        </p>
        <h3>Where can I see my payments on account?</h3>
        <p>In your HMRC online account, under Self Assessment, along with every amount due and paid.</p>
        <h3>Do payments on account apply to Capital Gains Tax?</h3>
        <p>No. Capital Gains Tax is paid with the balancing payment, or within 60 days for UK residential property, and never through payments on account.</p>
        <h3>What happens if I file my return late?</h3>
        <p>Your payments on account are still due on 31 January and 31 July, and interest runs on anything paid late. You also get late filing penalties, and HMRC may estimate the tax you owe until your return arrives.</p>
        <h3>Can I pay more than my payment on account?</h3>
        <p>Yes. Any extra is held as a credit and used against your next payment, which can help if you know your bill is going up.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "31 January", label: "Balancing payment and 1st payment on account" },
            { value: "31 July", label: "2nd payment on account" },
            { value: "50%", label: "Of last year's Income Tax and Class 4, each" },
            { value: "£1,000", label: "No payments on account below this bill" },
            { value: "80%", label: "Or if this much was taxed at source" },
            { value: "SA303", label: "Form to reduce them" },
            { value: "Base + 4%", label: "Late payment interest" },
            { value: "5%", label: "Penalty after 30 days on the balancing payment" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
