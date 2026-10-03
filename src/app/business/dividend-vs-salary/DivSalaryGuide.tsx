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

/** Dividend vs salary — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "layers", title: "The layers of tax" },
  { id: "salary", title: "Choosing a salary" },
  { id: "dividends", title: "How dividends are taxed" },
  { id: "worked", title: "A full worked example" },
  { id: "allowance", title: "The Employment Allowance" },
  { id: "higher", title: "Higher profits" },
  { id: "pension", title: "Employer pension contributions" },
  { id: "company-or-not", title: "Company or sole trader?" },
  { id: "rules", title: "Rules for paying dividends" },
  { id: "timing", title: "Timing dividends across tax years" },
  { id: "retaining", title: "Leaving profit in the company" },
  { id: "spouse", title: "A spouse or partner as shareholder" },
  { id: "loans", title: "Director's loans" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax on dividends", href: "https://www.gov.uk/tax-on-dividends" },
  { label: "GOV.UK — Paying yourself as a company director", href: "https://www.gov.uk/running-a-limited-company/taking-money-out-of-a-limited-company" },
  { label: "GOV.UK — Rates and thresholds for employers 2026 to 2027", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK — Employment Allowance", href: "https://www.gov.uk/claim-employment-allowance" },
  { label: "GOV.UK — Corporation Tax rates", href: "https://www.gov.uk/corporation-tax-rates" },
];

export default function DivSalaryGuide() {
  return (
    <Guide
      kicker="The director's pay guide"
      title="Salary or dividends: paying yourself from your company"
      intro={
        <>
          Most owner-directors pay themselves a small salary and take the rest of the profit as dividends. The right salary
          depends on your profit, whether the company can claim the Employment Allowance, and the dividend tax rates that rose
          in April 2026. This guide walks through every layer of tax, with worked examples from the calculator.
        </>
      }
      meta={["2026/27 tax year", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            For most one-person companies in 2026/27 the best salary is <strong>£12,570</strong>, with the rest of the profit
            paid as dividends.
          </li>
          <li>
            If the company can claim the <strong>Employment Allowance</strong>, because someone other than a sole director is
            on the payroll, a higher salary often wins.
          </li>
          <li>
            Dividend tax rose to <strong>10.75%</strong> and <strong>35.75%</strong> in April 2026, so the company route saves
            less than it used to, and on many profit levels a sole trader now keeps more.
          </li>
        </ul>
        <DataTable
          caption="What a single director keeps with the best salary, all profit paid out, 2026/27"
          head={["Company profit", "Best salary", "You keep", "Sole trader keeps"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["£30,000", "£12,570", "£24,403", "£25,468"],
            ["£50,000", "£12,570", "£38,862", "£40,268"],
            ["£80,000", "£12,570", "£55,765", "£57,711"],
            ["£100,000", "£12,570", "£65,210", "£69,311"],
            ["£150,000", "£87,610", "£87,464", "£92,040"],
          ]}
        />
        <p>
          The comparison ignores the extra costs of running a company, such as accountancy and filing, which widen the gap
          further.
        </p>
      </GuideSection>

      <GuideSection id="layers" n={2} kicker="How it fits together" title="The layers of tax">
        <p>Money that reaches a director from their company can be taxed up to five times:</p>
        <Timeline
          items={[
            { when: "Salary", what: "Employer National Insurance", detail: "15% on salary above £5,000, paid by the company. It is deductible for Corporation Tax." },
            { when: "Salary", what: "Income Tax and employee NI", detail: "Income Tax above £12,570; employee NI at 8% above £12,570 and 2% above £50,270." },
            { when: "Profit", what: "Corporation Tax", detail: "19% to 25% on what is left after salary, employer NI and pension contributions." },
            { when: "Dividends", what: "Dividend tax", detail: "On dividends above the £500 allowance, at 10.75%, 35.75% or 39.35%." },
          ]}
        />
        <p>
          Salary is deductible for Corporation Tax but attracts National Insurance. Dividends carry no National Insurance but
          are paid from profit that has already borne Corporation Tax. The best mix balances the two.
        </p>
      </GuideSection>

      <GuideSection id="salary" n={3} kicker="Salary" title="Choosing a salary">
        <DataTable
          caption="£80,000 of profit, single director, no Employment Allowance"
          head={["Salary", "Employer NI", "Corporation Tax", "You keep"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["£0", "£0", "£17,450", "£54,161"],
            ["£5,000", "£0", "£16,125", "£55,012"],
            ["£6,708", "£256", "£15,604", "£55,182"],
            ["£12,570", "£1,136", "£13,818", "£55,765"],
          ]}
        />
        <h3>Why £12,570 usually wins</h3>
        <p>
          A salary up to £12,570 uses your Personal Allowance, so there is no Income Tax or employee NI on it. It does cost
          employer NI above £5,000, but the salary and that NI both save Corporation Tax at 19% to 26.5%, which more than covers
          it. Taking the same money as dividends would mean paying Corporation Tax first and dividend tax afterwards.
        </p>
        <h3>The State Pension</h3>
        <p>
          A salary of at least the <strong>Lower Earnings Limit</strong>, £6,708 in 2026/27, makes the year count towards
          your State Pension even though no employee NI is paid. A salary of £0 or £5,000 does not. With 35 qualifying years
          needed for the full new State Pension, this is worth more than the few hundred pounds of tax involved.
        </p>
      </GuideSection>

      <GuideSection id="dividends" n={4} kicker="Dividends" title="How dividends are taxed">
        <p>
          Dividends sit on top of your other income, including your salary. The first <strong>£500</strong> is tax-free; above
          that, the rate depends on which Income Tax band the dividends fall in.
        </p>
        <DataTable
          caption="Dividend tax rates"
          head={["Band", "Until April 2026", "From April 2026"]}
          rows={[
            ["Basic rate", "8.75%", "10.75%"],
            ["Higher rate", "33.75%", "35.75%"],
            ["Additional rate", "39.35%", "39.35%"],
          ]}
        />
        <p>
          The dividend allowance does not add to your basic rate band: £500 of dividends inside the basic band still uses up
          £500 of it. Scottish taxpayers pay Scottish rates on their salary but the UK dividend rates and bands above.
        </p>
        <Callout title="Paid through Self Assessment">
          Dividend tax is not taken at source. Directors who take dividends above £500 must file a tax return and may have
          payments on account. See the <a href="/business/payment-on-account">payment on account calculator</a>.
        </Callout>
      </GuideSection>

      <GuideSection id="worked" n={5} kicker="Worked example" title="A full worked example">
        <WorkedExample
          title="£80,000 profit, £12,570 salary, no Employment Allowance"
          steps={[
            { label: "Company profit before salary", value: "£80,000" },
            { label: "Salary", value: "−£12,570" },
            { label: "Employer NI: 15% of £7,570", value: "−£1,136" },
            { label: "Corporation Tax on £66,295", value: "−£13,818" },
            { label: "Dividends paid", value: "£52,476" },
            { label: "Dividend tax", value: "−£9,282" },
            { label: "Salary after tax and NI", value: "£12,570" },
          ]}
          total={{ label: "You keep", value: "£55,765" }}
        />
        <p>
          Of the £80,000, £24,235 goes in tax: £13,818 Corporation Tax, £1,136 employer NI and £9,282 dividend tax. The same
          profit as a sole trader would leave £57,711, about £1,946 more, before any company running costs.
        </p>
      </GuideSection>

      <GuideSection id="allowance" n={6} kicker="Employment Allowance" title="The Employment Allowance">
        <p>
          The Employment Allowance takes up to <strong>£10,500</strong> a year off a company&rsquo;s employer NI bill. Since
          April 2025 there is no upper size limit, but one rule matters for small companies: a company whose{" "}
          <strong>only employee is a single director</strong> cannot claim it.
        </p>
        <p>
          If the company has another employee, such as a second director on a salary or a genuine member of staff, the
          allowance usually covers the director&rsquo;s employer NI as well. That changes the best salary:
        </p>
        <CompareCards
          columns={[
            {
              name: "£80,000 profit, no allowance",
              rows: [
                { label: "Best salary", value: "£12,570" },
                { label: "You keep", value: "£55,765" },
              ],
            },
            {
              name: "£80,000 profit, with allowance",
              rows: [
                { label: "£12,570 salary", value: "£56,301" },
                { label: "Best salary", value: "£75,000" },
                { label: "You keep", value: "£56,838" },
              ],
            },
          ]}
        />
        <p>
          With the allowance, salary costs no employer NI until the allowance runs out at £75,000. Salary taxed at 42% in the
          higher rate band then beats dividends, which bear Corporation Tax at 26.5% and dividend tax at 35.75%. The allowance
          has to cover all your employees, though, so the real best salary depends on the rest of your payroll.
        </p>
      </GuideSection>

      <GuideSection id="higher" n={7} kicker="Larger profits" title="Higher profits">
        <p>
          Once dividends reach the higher rate band, the combined tax on a pound of profit paid as a dividend is high: Corporation
          Tax at 25% to 26.5%, then 35.75% on what is left. A higher-rate salary costs 15% employer NI, 40% Income Tax and 2%
          employee NI, but saves Corporation Tax.
        </p>
        <p>
          After the 2026 dividend rise, the two are close, and the calculator finds that at £150,000 of profit a single director
          keeps slightly more with a salary of about £87,610 than with £12,570: £87,464 against £86,759. The difference is
          small and sensitive to other income, so check your own figures.
        </p>
        <Callout tone="warn" title="The £100,000 trap still applies">
          Salary and dividends together count towards adjusted net income. Above £100,000 you lose £1 of Personal Allowance for
          every £2, so leaving profit in the company or paying more into a pension can be worth far more than fine-tuning the
          split.
        </Callout>
      </GuideSection>

      <GuideSection id="pension" n={8} kicker="Pensions" title="Employer pension contributions">
        <p>
          An employer pension contribution is often the most tax-efficient way to take money out. It is deductible for
          Corporation Tax, carries no National Insurance, and is not taxed as your income when it goes in.
        </p>
        <WorkedExample
          title="£80,000 profit, £12,570 salary, plus £10,000 into a pension"
          steps={[
            { label: "Take-home without the pension", value: "£55,765" },
            { label: "Take-home with the pension", value: "£51,043" },
            { label: "Paid into your pension", value: "+£10,000" },
          ]}
          total={{ label: "Total value to you", value: "£61,043" }}
        />
        <p>
          The £10,000 pension costs you only £4,722 of take-home pay. Pension money is locked away until at least 55 (57 from
          2028), and the annual allowance of £60,000 applies to all contributions together.
        </p>
      </GuideSection>

      <GuideSection id="company-or-not" n={9} kicker="Structure" title="Company or sole trader?">
        <p>
          In 2026/27 a sole trader keeps more than a single-director company paying out all its profit, at every level in the
          table above. The company route can still make sense when:
        </p>
        <ul>
          <li>you leave profit in the company to reinvest, so dividend tax is deferred;</li>
          <li>you use employer pension contributions heavily;</li>
          <li>a spouse or partner is a genuine shareholder with an unused basic rate band;</li>
          <li>limited liability, investment or contracts require a company;</li>
          <li>the Employment Allowance applies because the company employs others.</li>
        </ul>
        <p>
          Compare with the <a href="/business/sole-trader-tax">sole trader tax calculator</a> and the{" "}
          <a href="/business/corporation-tax">Corporation Tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={10} kicker="Paperwork" title="Rules for paying dividends">
        <ul>
          <li>Dividends can only be paid from <strong>distributable profits</strong>: accumulated profits after tax.</li>
          <li>The directors must decide to pay them, usually recorded in board minutes.</li>
          <li>Each payment needs a dividend voucher showing the date, the company, the shareholder and the amount.</li>
          <li>Dividends are paid to shareholders in proportion to their shares, unless there are different share classes.</li>
          <li>Salary must go through payroll with Real Time Information submissions to HMRC.</li>
        </ul>
        <Callout tone="warn" title="Illegal dividends">
          A dividend paid without enough distributable profits can be reclaimed from the shareholder, and HMRC may treat it as
          salary or a loan. Check the company&rsquo;s accounts before each payment.
        </Callout>
      </GuideSection>

      <GuideSection id="timing" n={11} kicker="Planning" title="Timing dividends across tax years">
        <p>
          Dividends are taxed in the tax year they are paid, so spreading them evenly can keep more of them in the basic rate
          band. With a £12,570 salary each year:
        </p>
        <CompareCards
          columns={[
            {
              name: "£87,000 in one tax year",
              rows: [
                { label: "Dividend tax", value: "£21,624" },
                { label: "Band reached", value: "Higher rate" },
              ],
            },
            {
              name: "£43,500 in each of two years",
              rows: [
                { label: "Dividend tax", value: "£12,145 in total" },
                { label: "Saving", value: "£9,479" },
              ],
            },
          ]}
        />
        <p>
          A dividend paid on 5 April falls in one tax year and a dividend paid on 6 April in the next, so a few days can make a
          big difference. The company must have enough distributable profits at the date of each payment.
        </p>
      </GuideSection>

      <GuideSection id="retaining" n={12} kicker="Planning" title="Leaving profit in the company">
        <p>
          The calculator assumes all profit is paid out, which shows the full tax. Many directors take only enough to use the
          basic rate band and leave the rest in the company.
        </p>
        <WorkedExample
          title="£100,000 of profit: everything out, or basic rate only"
          steps={[
            { label: "Paid out in full: £67,176 of dividends", value: "£14,537 dividend tax" },
            { label: "You keep if all paid out", value: "£65,210" },
            { label: "Basic rate only: £37,700 of dividends", value: "£3,999 dividend tax" },
            { label: "You keep this year", value: "£46,271" },
          ]}
          total={{ label: "Left in the company after Corporation Tax", value: "£29,476" }}
        />
        <p>
          The profit left in the company has paid Corporation Tax but no dividend tax yet. It can be paid out in a later year
          when your income is lower, invested in the business, or paid into a pension. Holding large cash balances for years
          with no business purpose can cause problems if the company is sold or wound up, so get advice if it builds up.
        </p>
      </GuideSection>

      <GuideSection id="spouse" n={13} kicker="Family" title="A spouse or partner as shareholder">
        <p>
          If a spouse or civil partner genuinely owns shares, dividends on their shares are taxed at their rates, which can use
          an unused Personal Allowance and basic rate band.
        </p>
        <p>
          On £67,176 of dividends, one director with a £12,570 salary pays £14,537 of dividend tax. Split equally with a
          spouse who has no other income, the total falls to £5,763.
        </p>
        <Callout tone="warn" title="It has to be real">
          The shares must be an outright gift with full rights to income and capital. Arrangements that only divert dividends,
          such as shares with no rights except to dividends, can be caught by the settlements rules, and the income taxed as
          yours. Take advice before giving shares away.
        </Callout>
      </GuideSection>

      <GuideSection id="loans" n={14} kicker="Borrowing" title="Director's loans">
        <p>
          Money you take from the company that is not salary, dividends or expenses goes into a{" "}
          <strong>director&rsquo;s loan account</strong>. If the loan is still outstanding nine months after the company&rsquo;s
          year end, the company pays a temporary tax charge on it, at the higher dividend rate, which it gets back once the
          loan is repaid.
        </p>
        <p>
          Loans over £10,000 at no or low interest can also create a taxable benefit in kind. Borrowing from the company is
          not a way to avoid tax on extracting profit; it only delays the decision.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={15} kicker="FAQs" title="Common questions">
        <h3>Can I pay myself only dividends?</h3>
        <p>
          Yes, but you lose the Corporation Tax saving on a tax-free salary, and the year does not count for your State Pension
          unless you pay voluntary NI.
        </p>
        <h3>Should I take a salary of £5,000 or £12,570?</h3>
        <p>
          Without the Employment Allowance, £12,570 still usually leaves more after tax in 2026/27, despite the employer NI
          above £5,000, because the salary and NI save Corporation Tax.
        </p>
        <h3>Do I need to take all the profit out?</h3>
        <p>
          No. Profit left in the company has paid Corporation Tax but no dividend tax. Many directors take only what they need
          and keep within the basic rate band.
        </p>
        <h3>When are dividends taxed?</h3>
        <p>In the tax year they are paid, through your Self Assessment return, due by 31 January after the year ends.</p>
        <h3>Does the Employment Allowance apply if my spouse is also a director?</h3>
        <p>Not if the only people paid are directors and there is just one of them. With two directors on the payroll, the company can usually claim it.</p>
        <h3>Is it worth paying myself through payroll every month?</h3>
        <p>Yes for the salary part. A director's salary must go through PAYE, and a regular monthly salary keeps the records simple. Dividends can be paid when profits allow.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Usual best salary" },
            { value: "£6,708", label: "Lower Earnings Limit for a State Pension year" },
            { value: "£5,000", label: "Employer NI threshold" },
            { value: "15%", label: "Employer NI rate" },
            { value: "£10,500", label: "Employment Allowance" },
            { value: "£500", label: "Dividend allowance" },
            { value: "10.75% / 35.75%", label: "Basic and higher dividend rates" },
            { value: "19% to 25%", label: "Corporation Tax" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
