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

/** CIS — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who CIS applies to" },
  { id: "rates", title: "The three rates" },
  { id: "labour", title: "Labour, materials and VAT" },
  { id: "reverse-charge", title: "CIS and the VAT reverse charge" },
  { id: "registering", title: "Registering as a subcontractor" },
  { id: "refunds", title: "Getting your money back" },
  { id: "gross", title: "Gross payment status" },
  { id: "contractors", title: "If you are the contractor" },
  { id: "changes", title: "Changes from April 2026" },
  { id: "companies", title: "Limited companies under CIS" },
  { id: "problems", title: "When something goes wrong" },
  { id: "budget", title: "Budgeting under CIS" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — What you must do as a CIS subcontractor", href: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor" },
  { label: "GOV.UK — What you must do as a CIS contractor", href: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor" },
  { label: "HMRC — Construction Industry Scheme guide (CIS 340)", href: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340" },
  { label: "GOV.UK — VAT domestic reverse charge for building and construction services", href: "https://www.gov.uk/guidance/vat-domestic-reverse-charge-for-building-and-construction-services" },
  { label: "GOV.UK — Get gross payment status", href: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/how-to-get-gross-payment-status" },
];

export default function CisGuide() {
  return (
    <Guide
      kicker="The CIS guide"
      title="The Construction Industry Scheme, explained"
      intro={
        <>
          Under the Construction Industry Scheme, contractors take tax from subcontractors&rsquo; pay and send it to HMRC.
          It is not an extra tax: it is an advance payment of your own Income Tax and National Insurance. This guide explains
          the rates, what the deduction is taken from, how VAT fits in, and how to get back what is overpaid.
        </>
      }
      meta={["Construction", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Contractors deduct <strong>20%</strong> from a registered subcontractor&rsquo;s labour, <strong>30%</strong> if they are not registered, and nothing if they have gross payment status.</li>
          <li>The deduction is taken from <strong>labour only</strong>, never from materials or VAT.</li>
          <li>It counts towards your tax bill. Most sole traders get some back after their tax return, because their expenses and tax-free allowance mean they owe less than 20% of labour.</li>
        </ul>
        <WorkedExample
          title="£2,000 labour plus £800 materials, registered subcontractor"
          steps={[
            { label: "Invoice total", value: "£2,800" },
            { label: "CIS at 20% of labour", value: "−£400" },
          ]}
          total={{ label: "Paid to you", value: "£2,400" }}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Scope" title="Who CIS applies to">
        <p>
          CIS covers most construction work in the UK: building, alteration, repair, decorating, demolition, and installing
          heating, lighting, power, water and ventilation. It does not cover professional work such as architecture or
          surveying, carpet fitting, or simply delivering materials.
        </p>
        <CompareCards
          columns={[
            {
              name: "Contractor",
              rows: [
                { label: "Who", value: "Pays subcontractors for construction work" },
                { label: "Also", value: "Non-construction firms spending £3m+ a year on construction" },
                { label: "Must", value: "Register, verify, deduct and file monthly returns" },
              ],
            },
            {
              name: "Subcontractor",
              rows: [
                { label: "Who", value: "Does construction work for a contractor" },
                { label: "Can be", value: "Sole trader, partnership or company" },
                { label: "Should", value: "Register to get 20% instead of 30%" },
              ],
            },
          ]}
        />
        <p>
          A homeowner paying for work on their own home is not a contractor and does not deduct CIS. Many tradespeople are both
          contractors and subcontractors: they work for a main contractor and also pay others.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Rates" title="The three rates">
        <DataTable
          caption="CIS deduction on £2,000 labour and £800 materials"
          head={["Status", "Rate", "Deducted", "Paid to you"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Gross payment status", "0%", "£0", "£2,800"],
            ["Registered subcontractor", "20%", "£400", "£2,400"],
            ["Not registered or not verified", "30%", "£600", "£2,200"],
          ]}
        />
        <p>
          Before paying you for the first time, the contractor must <strong>verify</strong> you with HMRC, which tells them
          which rate to use. If HMRC cannot match your details, for example because your name or Unique Taxpayer Reference is
          wrong, the contractor has to use 30%.
        </p>
      </GuideSection>

      <GuideSection id="labour" n={4} kicker="What is deducted" title="Labour, materials and VAT">
        <p>
          The deduction applies to the payment <strong>minus</strong>:
        </p>
        <ul>
          <li>VAT;</li>
          <li>materials you bought for the job, at cost;</li>
          <li>plant hire, consumables and fuel for plant used on the job (but not fuel for travelling);</li>
          <li>the Construction Industry Training Board levy, if you pay it.</li>
        </ul>
        <p>
          What is left is treated as labour. Your own travel, tools you keep and other overheads are not taken off before the
          deduction; you claim them as expenses on your tax return instead.
        </p>
        <Callout tone="warn" title="Itemise materials on every invoice">
          If your invoice shows one figure for the job, the contractor may deduct 20% from all of it. On a £2,800 job that is
          £560 instead of £400. Always show materials separately and keep the receipts: a contractor can ask for evidence.
        </Callout>
      </GuideSection>

      <GuideSection id="reverse-charge" n={5} kicker="VAT" title="CIS and the VAT reverse charge">
        <p>
          Since March 2021, most construction services between VAT-registered businesses within CIS use the{" "}
          <strong>domestic reverse charge</strong>. The subcontractor does not charge VAT; the contractor accounts for it on
          their own VAT return instead.
        </p>
        <CompareCards
          columns={[
            {
              name: "Normal VAT",
              rows: [
                { label: "Labour and materials", value: "£2,800" },
                { label: "VAT charged", value: "£560" },
                { label: "CIS deducted", value: "−£400" },
                { label: "Paid to you", value: "£2,960" },
              ],
            },
            {
              name: "Reverse charge",
              rows: [
                { label: "Labour and materials", value: "£2,800" },
                { label: "VAT charged", value: "None" },
                { label: "CIS deducted", value: "−£400" },
                { label: "Paid to you", value: "£2,400" },
              ],
            },
          ]}
        />
        <p>
          The reverse charge does not apply when you work for the end user, such as a building owner who is not in the
          construction business, or to work that is zero-rated. Your invoice must say the reverse charge applies and show the
          VAT the customer must account for.
        </p>
        <p>
          Subcontractors under the reverse charge often reclaim more VAT on materials than they charge, so they may get VAT
          repayments. Monthly VAT returns can help cash flow.
        </p>
      </GuideSection>

      <GuideSection id="registering" n={6} kicker="Getting set up" title="Registering as a subcontractor">
        <Timeline
          items={[
            { when: "Step 1", what: "Register as self-employed", detail: "Sole traders register for Self Assessment and get a Unique Taxpayer Reference." },
            { when: "Step 2", what: "Register for CIS", detail: "Online, or by phone to the CIS helpline. Companies and partnerships register separately." },
            { when: "Step 3", what: "Give contractors your details", detail: "Your legal name, trading name, UTR and National Insurance number so they can verify you." },
            { when: "Each month", what: "Collect your statements", detail: "Every contractor who deducts CIS must give you a payment and deduction statement." },
          ]}
        />
        <p>
          Registering takes the deduction from 30% to 20% straight away. On £30,000 of labour, that is £3,000 more in your
          pocket during the year rather than waiting for a refund after it ends.
        </p>
      </GuideSection>

      <GuideSection id="refunds" n={7} kicker="Refunds" title="Getting your money back">
        <p>
          Your CIS deductions are a credit against your Income Tax and Class 4 National Insurance for the year. Because the
          20% is taken from labour before your expenses and before your Personal Allowance, most sole traders have paid too
          much by the end of the year.
        </p>
        <WorkedExample
          title="A year of £30,000 labour, £5,000 materials, £9,000 of costs"
          steps={[
            { label: "Profit", note: "£35,000 − £9,000", value: "£26,000" },
            { label: "Income Tax and Class 4 NI owed", value: "£3,492" },
            { label: "CIS deducted at 20% of £30,000", value: "£6,000" },
          ]}
          total={{ label: "Refund after the tax return", value: "£2,508" }}
        />
        <DataTable
          caption="Refund or bill in different years, 2026/27"
          head={["Year", "Profit", "Tax owed", "CIS deducted", "Result"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Part year: £12k labour, £3k costs", "£9,000", "£0", "£2,400", "£2,400 back"],
            ["Typical: £30k labour, £9k costs", "£26,000", "£3,492", "£6,000", "£2,508 back"],
            ["Same, unregistered at 30%", "£26,000", "£3,492", "£9,000", "£5,508 back"],
            ["Busy: £60k labour, £15k costs", "£55,000", "£11,789", "£12,000", "£211 back"],
            ["£10k labour alongside a £35k job", "£8,500", "£1,700", "£2,000", "£300 back"],
          ]}
        />
        <p>
          Sole traders and partners claim the credit on their Self Assessment return. You can file as soon as the tax year ends
          on 5 April; the earlier you file, the sooner the refund arrives. Limited companies reclaim CIS through their monthly
          payroll submissions instead.
        </p>
        <Callout title="Keep every statement">
          HMRC checks your claimed deductions against contractors&rsquo; returns. Missing statements or mismatched figures are
          the most common reason refunds are delayed.
        </Callout>
      </GuideSection>

      <GuideSection id="gross" n={8} kicker="No deductions" title="Gross payment status">
        <p>
          With gross payment status, contractors pay you in full and you pay your own tax through Self Assessment. It helps cash
          flow, but you must budget for the bill yourself: in the busy example above, £11,789 would be due by 31 January.
        </p>
        <p>To qualify, you need:</p>
        <ul>
          <li>
            <strong>construction turnover</strong> of at least £30,000 a year as a sole trader, excluding VAT and materials, paid
            through a bank account (partnerships and companies have their own tests);
          </li>
          <li>a <strong>good compliance record</strong>: tax returns filed and tax paid on time in the past 12 months;</li>
          <li>a business run substantially through a bank account.</li>
        </ul>
        <p>HMRC reviews gross payment status every year and can remove it if you file or pay late.</p>
      </GuideSection>

      <GuideSection id="contractors" n={9} kicker="Contractors" title="If you are the contractor">
        <ul>
          <li>Register as a contractor before taking on subcontractors.</li>
          <li>Check whether each worker is employed or self-employed: CIS is only for the self-employed.</li>
          <li>Verify each new subcontractor with HMRC before their first payment.</li>
          <li>Deduct at the right rate from the labour part of each payment.</li>
          <li>Give each subcontractor a statement and file a CIS300 return by the 19th of each month.</li>
          <li>Pay the deductions to HMRC by the 22nd if you pay electronically.</li>
        </ul>
        <p>
          A late monthly return costs £100 straight away, with more if it is two, six and twelve months late. Penalties can
          mount quickly if several returns are missed.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={10} kicker="New rules" title="Changes from April 2026">
        <p>From 6 April 2026, several changes took effect to tackle fraud and tidy up the scheme:</p>
        <ul>
          <li>
            HMRC can remove gross payment status <strong>immediately</strong> where a business knew, or should have known,
            that a payment was connected to fraud.
          </li>
          <li>
            A business that loses gross payment status for fraud or serious non-compliance must wait <strong>five years</strong>{" "}
            before reapplying, instead of one.
          </li>
          <li>Local authorities and other public bodies working as subcontractors are taken out of the scheme.</li>
        </ul>
        <p>For most honest subcontractors nothing changes day to day, but it is a reason to know who you are working with.</p>
      </GuideSection>

      <GuideSection id="companies" n={11} kicker="Companies" title="Limited companies under CIS">
        <p>
          A limited company subcontractor has deductions taken in the same way, at 20% or 30% of labour, unless it has gross
          payment status. The difference is how it gets the money back.
        </p>
        <p>
          A company does not wait for a tax return. Instead, it sets the CIS deducted from its income against the PAYE and
          National Insurance it owes HMRC each month for its own employees, reporting the amounts on its Employer Payment
          Summary. Anything left over at the end of the tax year can be reclaimed from HMRC or set against Corporation Tax.
        </p>
        <p>
          The gross payment status turnover test for a company is £30,000 for each director, or £100,000 for the company as a
          whole if that is lower. Partnerships use the same approach for each partner.
        </p>
      </GuideSection>

      <GuideSection id="problems" n={12} kicker="Disputes" title="When something goes wrong">
        <p>Problems with CIS are usually about the wrong rate, a missing statement or deductions HMRC cannot match.</p>
        <ul>
          <li>
            <strong>Deducted at 30% when you are registered:</strong> ask the contractor to verify you again with the correct
            name and UTR. The overpaid amount still counts towards your tax.
          </li>
          <li>
            <strong>No statement:</strong> ask the contractor. They must give one by the 19th of the month after the payment.
          </li>
          <li>
            <strong>Deductions not on HMRC&rsquo;s records:</strong> HMRC checks your claim against contractors&rsquo; monthly
            returns. If a contractor has not filed, give HMRC your statements and payment records.
          </li>
          <li>
            <strong>Deductions from materials:</strong> send the contractor a corrected invoice showing materials separately.
          </li>
        </ul>
        <p>
          Keep copies of every invoice and statement for at least five years. They are your proof that tax was paid on your
          behalf.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={13} kicker="Cash flow" title="Budgeting under CIS">
        <p>
          Because CIS takes 20% of your labour before you see it, it feels as if your tax is already paid. For most
          subcontractors it is, and then some. But it is worth checking each year, because two situations leave a bill to pay:
        </p>
        <ul>
          <li>
            <strong>Higher profits.</strong> Once your profit passes £50,270, the top slice is taxed at 40% plus 2% NI, so 20%
            of labour may not cover it. In the busy example above, the refund shrinks to £211.
          </li>
          <li>
            <strong>Work outside CIS.</strong> Jobs for homeowners, and any other self-employed income, have no deduction at
            all. The tax on them is due by 31 January.
          </li>
        </ul>
        <p>
          With gross payment status, nothing is deducted, so you need to put aside money for tax yourself, and you may have
          payments on account. The <a href="/business/payment-on-account">payment on account calculator</a> shows the
          dates.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "20%", label: "Registered subcontractor" },
            { value: "30%", label: "Not registered or not verified" },
            { value: "0%", label: "Gross payment status" },
            { value: "£30,000", label: "Turnover test for gross status (sole trader)" },
            { value: "19th", label: "Monthly CIS300 return deadline" },
            { value: "22nd", label: "Electronic payment deadline" },
            { value: "£100", label: "Penalty for a late monthly return" },
            { value: "5 years", label: "Wait to reapply after losing gross status for fraud" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
