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

/** IR35 — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What IR35 is" },
  { id: "who-decides", title: "Who decides your status" },
  { id: "tests", title: "What decides your status" },
  { id: "inside", title: "Inside IR35: how you are paid" },
  { id: "outside", title: "Outside IR35: how you are paid" },
  { id: "compare", title: "Inside and outside compared" },
  { id: "day-rates", title: "Setting a day rate" },
  { id: "challenging", title: "Challenging a determination" },
  { id: "history", title: "A short history of IR35" },
  { id: "per-day", title: "Take-home per day billed" },
  { id: "pensions", title: "Pensions for contractors" },
  { id: "expenses", title: "Expenses inside and outside" },
  { id: "signals", title: "Signs a contract is inside or outside" },
  { id: "going-contracting", title: "Moving from a permanent job to contracting" },
  { id: "umbrella-payslip", title: "Reading an umbrella payslip" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Understanding off-payroll working (IR35)", href: "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35" },
  { label: "GOV.UK — Check employment status for tax (CEST)", href: "https://www.gov.uk/guidance/check-employment-status-for-tax" },
  { label: "GOV.UK — Corporation Tax rates and reliefs", href: "https://www.gov.uk/corporation-tax-rates" },
  { label: "GOV.UK — Tax on dividends", href: "https://www.gov.uk/tax-on-dividends" },
  { label: "GOV.UK — Umbrella companies: guidance for workers", href: "https://www.gov.uk/guidance/working-through-an-umbrella-company" },
];

export default function IR35Guide() {
  return (
    <Guide
      kicker="The IR35 guide"
      title="IR35 and contractor take-home, explained"
      intro={
        <>
          IR35 decides whether a contractor working through their own company is taxed like a business or like an
          employee. The difference can be worth thousands of pounds a year. This guide explains how status is decided,
          how you are paid inside and outside IR35, and what the numbers look like for 2026/27.
        </>
      }
      meta={["2026/27 tax year", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What IR35 is">
        <p>
          IR35, also called the off-payroll working rules, applies when you provide your services through an
          intermediary, usually your own limited company, to a client. If you would be an employee of the client were it
          not for your company, the contract is <strong>inside IR35</strong> and you must be taxed broadly like an
          employee. If you are genuinely in business on your own account, it is <strong>outside IR35</strong>.
        </p>
        <p>
          The rules exist because paying yourself through a company (a small salary plus dividends) usually costs less in
          tax and National Insurance than a salary of the same value, and avoids employer NI altogether.
        </p>
      </GuideSection>

      <GuideSection id="who-decides" n={2} kicker="Responsibility" title="Who decides your status">
        <CompareCards
          columns={[
            {
              name: "Medium or large client",
              rows: [
                { label: "Who decides", value: "The client" },
                { label: "You receive", value: "A Status Determination Statement" },
                { label: "Who pays PAYE if inside", value: "The fee-payer (client or agency)" },
              ],
            },
            {
              name: "Small client",
              rows: [
                { label: "Who decides", value: "Your own company" },
                { label: "You receive", value: "Nothing from the client" },
                { label: "Who pays PAYE if inside", value: "Your company (a deemed payment)" },
              ],
            },
          ]}
        />
        <p>
          A client is small if it meets at least two of these: turnover of £15 million or less, a balance sheet of £7.5
          million or less, and 50 or fewer employees. Since April 2021 all public sector clients decide status, whatever
          their size.
        </p>
      </GuideSection>

      <GuideSection id="tests" n={3} kicker="The tests" title="What decides your status">
        <p>Status depends on the reality of the working relationship, not just the contract. The main factors are:</p>
        <ul>
          <li>
            <strong>Control</strong>: does the client decide how, when and where you work, or only what you deliver?
          </li>
          <li>
            <strong>Substitution</strong>: can you send someone else to do the work, and would the client have to accept
            them?
          </li>
          <li>
            <strong>Mutuality of obligation</strong>: must the client offer work and must you accept it?
          </li>
          <li>
            <strong>Financial risk and being in business</strong>: do you bear costs, fix mistakes at your own expense,
            have several clients, and market your services?
          </li>
          <li>
            <strong>Part and parcel</strong>: are you treated like staff, with line management, staff benefits or an
            email signature showing the client&rsquo;s name?
          </li>
        </ul>
        <p>
          HMRC&rsquo;s Check Employment Status for Tax (CEST) tool gives a view based on your answers. HMRC stands by its
          result if the information you give is accurate.
        </p>
      </GuideSection>

      <GuideSection id="inside" n={4} kicker="Inside IR35" title="Inside IR35: how you are paid">
        <p>
          Most contractors inside IR35 use an <strong>umbrella company</strong>, which employs them, invoices the agency
          and pays them through PAYE. The umbrella takes its fee, then pays employer National Insurance (15% above £5,000)
          and the 0.5% Apprenticeship Levy out of the contract income, before paying you a salary.
        </p>
        <WorkedExample
          title="Inside IR35: £500 a day for 220 days, £25 a week umbrella fee"
          steps={[
            { label: "Contract income", value: "£110,000" },
            { label: "Umbrella fee", note: "£25 × 52", value: "−£1,300" },
            { label: "Employer NI and Apprenticeship Levy", value: "−£13,938" },
            { label: "Your gross salary", value: "£94,762" },
            { label: "Income Tax", value: "−£25,337" },
            { label: "National Insurance", value: "−£3,906" },
          ]}
          total={{ label: "Take-home", value: "£65,519" }}
        />
        <Callout tone="warn" title="Watch out for umbrella schemes">
          Some umbrella companies promise unusually high take-home through loans or bonuses that avoid tax. HMRC treats
          these as tax avoidance and you remain liable. From April 2026, recruitment agencies became responsible for
          making sure umbrella companies they use account for PAYE correctly.
        </Callout>
      </GuideSection>

      <GuideSection id="outside" n={5} kicker="Outside IR35" title="Outside IR35: how you are paid">
        <p>
          Outside IR35 your company invoices the client and pays its costs. A common approach is a salary of £12,570,
          which uses your tax-free allowance, with the remaining profit paid as dividends after Corporation Tax.
        </p>
        <WorkedExample
          title="Outside IR35: £500 a day for 220 days, £2,000 of costs"
          steps={[
            { label: "Company income", value: "£110,000" },
            { label: "Costs, salary and employer NI", note: "£2,000 + £12,570 + £1,135.50", value: "−£15,706" },
            { label: "Corporation Tax", note: "19% to £50,000, then 26.5% marginal", value: "−£21,238" },
            { label: "Dividends paid", value: "£73,056" },
            { label: "Dividend tax", note: "10.75% then 35.75%", value: "−£16,639" },
          ]}
          total={{ label: "Take-home, including the £12,570 salary", value: "£68,988" }}
        />
        <p>
          A sole-director company cannot claim the Employment Allowance, so employer NI is due on salary above £5,000.
          Some directors take a salary of £5,000 instead, which avoids employer NI but uses less of their tax-free
          allowance. A salary below £6,708 also means the year does not count towards your State Pension.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={6} kicker="Comparison" title="Inside and outside compared">
        <DataTable
          caption="Take-home at different day rates, 220 days, 2026/27"
          head={["Day rate", "Contract income", "Inside IR35", "Outside IR35", "Difference"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£300", "£66,000", "£43,424", "£48,209", "£4,785"],
            ["£400", "£88,000", "£54,472", "£58,598", "£4,127"],
            ["£500", "£110,000", "£65,519", "£68,988", "£3,468"],
            ["£700", "£154,000", "£82,201", "£87,520", "£5,319"],
          ]}
        />
        <Figure label="Take-home on £500 a day for 220 days">
          <Bars
            items={[
              { label: "Inside IR35", value: 65519 },
              { label: "Outside IR35", value: 68988 },
            ]}
          />
        </Figure>
        <p>
          The gap is smaller than many people expect, because Corporation Tax and dividend tax rates have risen in recent
          years. Outside IR35 also means paying your own accountant, insurance and other costs, and getting no holiday
          pay, sick pay or pension contributions from an employer.
        </p>
      </GuideSection>

      <GuideSection id="day-rates" n={7} kicker="Pricing" title="Setting a day rate">
        <p>
          A day rate needs to cover more than a salary does. When comparing an inside IR35 role with a permanent job,
          remember that:
        </p>
        <ul>
          <li>Employer NI and the Apprenticeship Levy come out of your rate inside IR35, not the client&rsquo;s budget.</li>
          <li>You are only paid for days you work: holidays, bank holidays, sickness and gaps between contracts are unpaid.</li>
          <li>There is no employer pension contribution, which is often worth 3% to 10% of salary in a permanent job.</li>
        </ul>
        <p>
          Rules of thumb for converting day rates to salaries are unreliable, because tax bands, employer costs and the
          number of days you actually bill all change the answer. Use the calculator&rsquo;s equivalent salary figure,
          which finds the permanent salary with the same take-home as your outside IR35 income.
        </p>
      </GuideSection>

      <GuideSection id="challenging" n={8} kicker="Disputes" title="Challenging a determination">
        <Timeline
          items={[
            { when: "Step 1", what: "Read the Status Determination Statement", detail: "It must give the client’s conclusion and the reasons for it." },
            { when: "Step 2", what: "Raise a disagreement", detail: "Write to the client explaining why you disagree, with evidence about how you actually work." },
            { when: "Step 3", what: "Client responds within 45 days", detail: "They must either confirm the determination with reasons or change it." },
          ]}
        />
        <p>
          If a contract is inside IR35, you can still claim some expenses through the umbrella, but not the full range
          available to a business. You keep the right to challenge future contracts on their own facts.
        </p>
      </GuideSection>

      <GuideSection id="history" n={9} kicker="Background" title="A short history of IR35">
        <Timeline
          items={[
            { when: "April 2000", what: "IR35 introduced", detail: "Contractors’ own companies had to decide their status and pay any tax due." },
            { when: "April 2017", what: "Public sector reform", detail: "Public sector clients became responsible for deciding status." },
            { when: "April 2021", what: "Private sector reform", detail: "Medium and large private clients took over the decision too." },
            { when: "April 2024", what: "Offset for tax already paid", detail: "When a client gets status wrong, tax the worker already paid can be set against what HMRC claims." },
          ]}
        />
      </GuideSection>

      <GuideSection id="per-day" n={10} kicker="Reference" title="Take-home per day billed">
        <DataTable
          caption="Take-home per day billed, 220 days, 2026/27"
          head={["Day rate", "Inside IR35", "Outside IR35"]}
          numeric={[1, 2]}
          rows={[
            ["£250", "£170.28", "£186.50"],
            ["£350", "£222.49", "£242.74"],
            ["£600", "£335.48", "£359.78"],
            ["£800", "£419.53", "£439.49"],
          ]}
        />
        <p>
          Outside IR35 figures assume £2,000 of costs and a £12,570 salary; inside figures assume a £25 a week umbrella
          fee. Your accountant&rsquo;s fees, insurance and other costs reduce the outside figures further.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={11} kicker="Pensions" title="Pensions for contractors">
        <p>
          Outside IR35, your company can pay into your pension as an employer contribution. It is a business cost, so it
          reduces Corporation Tax, and there is no National Insurance or dividend tax on it. For many contractors this is
          the most tax-efficient way to extract profit.
        </p>
        <p>
          Inside IR35, salary sacrifice through your umbrella company gives tax and NI relief at your marginal rate. In
          both cases, total contributions are normally limited by the £60,000 annual allowance, and outside IR35 the
          contribution must be justifiable as a business expense.
        </p>
      </GuideSection>

      <GuideSection id="expenses" n={12} kicker="Expenses" title="Expenses inside and outside">
        <CompareCards
          columns={[
            {
              name: "Inside IR35",
              rows: [
                { label: "Travel to the client", value: "Usually not claimable" },
                { label: "Equipment", value: "Limited" },
                { label: "Accountant", value: "Not needed" },
              ],
            },
            {
              name: "Outside IR35",
              rows: [
                { label: "Travel to temporary sites", value: "Usually claimable" },
                { label: "Equipment and software", value: "Claimable" },
                { label: "Accountant and insurance", value: "Business costs" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="signals" n={13} kicker="Indicators" title="Signs a contract is inside or outside">
        <CompareCards
          columns={[
            {
              name: "Points towards inside",
              rows: [
                { label: "Hours and place", value: "Set by the client" },
                { label: "Substitution", value: "Not allowed in practice" },
                { label: "Work", value: "Ongoing, like staff" },
                { label: "Management", value: "Line-managed by the client" },
              ],
            },
            {
              name: "Points towards outside",
              rows: [
                { label: "Hours and place", value: "Your choice" },
                { label: "Substitution", value: "A genuine right" },
                { label: "Work", value: "A defined project" },
                { label: "Risk", value: "You fix errors at your cost" },
              ],
            },
          ]}
        />
        <p>
          No single factor decides status. Tribunals and HMRC look at the whole picture, including what actually happens
          day to day, not just what the contract says. A contract with a substitution clause that would never be used in
          practice carries little weight.
        </p>
      </GuideSection>

      <GuideSection id="going-contracting" n={14} kicker="Career choice" title="Moving from a permanent job to contracting">
        <p>
          Contracting can pay more, but compare like with like. A permanent salary usually comes with paid holiday,
          bank holidays, sick pay, an employer pension contribution, and often other benefits such as life cover. As a
          contractor you are paid only for the days you bill, and gaps between contracts can be long.
        </p>
        <p>
          Before switching, work out how many days you can realistically bill in a year, add up the costs of running a
          company or using an umbrella, and keep a cash buffer of at least three to six months of spending. Use the
          equivalent salary figure in the calculator to compare an offer with your current job.
        </p>
      </GuideSection>

      <GuideSection id="umbrella-payslip" n={15} kicker="Payslips" title="Reading an umbrella payslip">
        <p>
          An umbrella payslip has two parts. The first shows the <strong>assignment income</strong>: the money the agency
          paid the umbrella for your work. The second shows your <strong>employment</strong>: your gross pay and the normal
          deductions.
        </p>
        <WorkedExample
          title="One month on £500 a day, 20 days"
          steps={[
            { label: "Assignment income", note: "20 × £500", value: "£10,000.00" },
            { label: "Umbrella fee", value: "−£100.00" },
            { label: "Employer NI and Apprenticeship Levy", value: "−£1,274.46" },
            { label: "Gross pay to you", value: "£8,625.54" },
          ]}
          total={{ label: "Then Income Tax, NI and pension are deducted as normal", value: "PAYE" }}
        />
        <p>
          Check that the assignment income matches your timesheets and that the gross pay is clearly shown. If a payslip
          shows large non-taxable &ldquo;expenses&rdquo;, &ldquo;loans&rdquo; or &ldquo;bonuses&rdquo; that make your
          take-home look unusually high, it may be a tax avoidance scheme, and HMRC can ask you to pay the tax.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={16} kicker="Questions" title="Common questions">
        <h3>Do I get employment rights inside IR35?</h3>
        <p>
          Not from the client. IR35 is a tax rule. If you use an umbrella company, you are its employee and get statutory
          rights such as holiday pay and Statutory Sick Pay from it.
        </p>
        <h3>Can I claim expenses inside IR35?</h3>
        <p>
          Only limited expenses, broadly the same as an employee could claim. Travel to a single long-term workplace is
          not usually allowed.
        </p>
        <h3>Should I close my company if all my work is inside IR35?</h3>
        <p>
          Many contractors do, to save accountancy costs. If you expect outside work in future, you might keep it dormant.
          Speak to an accountant before deciding.
        </p>
        <h3>Is the calculator advice on my status?</h3>
        <p>
          No. It compares the money under each route. Your status depends on the facts of each contract.
        </p>
        <h3>What happens if HMRC disagrees with my client’s decision?</h3>
        <p>
          If a client wrongly treats a contract as outside IR35, HMRC normally pursues the fee-payer for the unpaid tax and
          National Insurance. Since April 2024, tax you have already paid on that income through your company can be set
          against what is owed.
        </p>
        <h3>Do I need to register for VAT?</h3>
        <p>
          Outside IR35, your company must register for VAT if its taxable turnover goes over £90,000 in a rolling 12 months.
          VAT you charge is passed to HMRC, so it is not part of your take-home. Inside IR35 through an umbrella, VAT is
          handled by the umbrella.
        </p>
        <h3>Is it better to leave profit in my company?</h3>
        <p>
          Sometimes. Profit kept in the company has paid Corporation Tax but not dividend tax, so leaving some there can
          reduce your tax bill if your personal income would otherwise go above £50,270 or £100,000. You can then take it
          in a later year when your income is lower, or pay it into your pension.
        </p>
        <h3>How many days should I assume I will bill?</h3>
        <p>
          Many contractors plan on 200 to 220 days a year, allowing for holidays, bank holidays, sickness and gaps between
          contracts. Be cautious in your first year, when gaps are more likely.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "15%", label: "Employer NI above £5,000" },
            { value: "0.5%", label: "Apprenticeship Levy taken by umbrellas" },
            { value: "19% to 25%", label: "Corporation Tax rates" },
            { value: "10.75% / 35.75%", label: "Dividend tax, basic and higher rate" },
            { value: "£500", label: "Dividend allowance" },
            { value: "45 days", label: "For a client to answer a status disagreement" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
