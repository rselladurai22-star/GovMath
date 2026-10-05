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

/** Emergency tax codes — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What an emergency tax code is" },
  { id: "why", title: "Why you might be on one" },
  { id: "codes", title: "How each code works" },
  { id: "mid-year", title: "Starting a job mid-year" },
  { id: "first-job", title: "BR on a first job" },
  { id: "checklist", title: "The starter checklist" },
  { id: "fix", title: "Getting your code fixed" },
  { id: "refunds", title: "Getting overpaid tax back" },
  { id: "second-jobs", title: "Second jobs and pensions" },
  { id: "by-month", title: "Overpayment by start month" },
  { id: "pensions", title: "Emergency tax on pension withdrawals" },
  { id: "students", title: "Students, graduates and returners" },
  { id: "weekly", title: "Weekly pay" },
  { id: "why-emergency", title: "Why HMRC uses emergency codes" },
  { id: "payslip-check", title: "Spotting an emergency code on your payslip" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Emergency tax codes", href: "https://www.gov.uk/tax-codes/emergency-tax-codes" },
  { label: "GOV.UK — Starter checklist for PAYE", href: "https://www.gov.uk/government/publications/paye-starter-checklist" },
  { label: "GOV.UK — Check your Income Tax for the current year", href: "https://www.gov.uk/check-income-tax-current-year" },
  { label: "GOV.UK — Claim a tax refund", href: "https://www.gov.uk/claim-tax-refund" },
  { label: "GOV.UK — Tax codes", href: "https://www.gov.uk/tax-codes" },
];

export default function EmergencyGuide() {
  return (
    <Guide
      kicker="The emergency tax guide"
      title="Emergency tax codes, explained clearly"
      intro={
        <>
          An emergency tax code is a temporary code your employer uses when HMRC has not yet sent the right one. It often
          means you pay too much tax for a few months. This guide explains how each emergency code works, how much you
          might overpay, and how to get the code fixed and your money back.
        </>
      }
      meta={["2026/27 tax year", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What an emergency tax code is">
        <p>
          Your tax code tells your employer how much tax-free pay to give you and how to tax the rest. The standard code
          for 2026/27 is <strong>1257L</strong>. Normally PAYE is <strong>cumulative</strong>: each payday it looks at
          your pay and tax since 6 April and puts things right, including giving you any tax-free allowance you have
          not used yet.
        </p>
        <p>
          An emergency code is used until HMRC can work out the right one. The most common is 1257L followed by
          <strong> W1</strong> (weekly pay), <strong>M1</strong> (monthly pay) or <strong>X</strong>. These letters mean
          the code is <strong>non-cumulative</strong>: each payslip is taxed on its own, as if it were the only pay
          period in the year.
        </p>
      </GuideSection>

      <GuideSection id="why" n={2} kicker="Causes" title="Why you might be on one">
        <ul>
          <li>You start a new job and your employer does not have a P45 from your last job.</li>
          <li>You start working for the first time, or after a gap, part-way through the tax year.</li>
          <li>You start getting a workplace or private pension.</li>
          <li>You start or stop receiving a company benefit, such as a company car.</li>
          <li>You were self-employed or claiming benefits and are now employed.</li>
        </ul>
      </GuideSection>

      <GuideSection id="codes" n={3} kicker="The codes" title="How each code works">
        <DataTable
          caption="Emergency and temporary codes"
          head={["Code", "Tax-free pay", "What it means", "Tax on £2,500 a month"]}
          numeric={[3]}
          rows={[
            ["1257L (cumulative)", "£12,570 a year, caught up", "The normal code: everything evens out over the year", "Depends on pay so far"],
            ["1257L M1, W1 or X", "£1,048.25 a month", "A month's allowance, with no catch-up", "£290.35"],
            ["BR", "None", "Every pound at 20%", "£500.00"],
            ["0T", "None", "No allowance, normal bands", "£500.00"],
          ]}
        />
        <p>
          In Scotland the same codes start with an S, such as S1257L M1 or SBR, and use the Scottish bands. In Wales they
          start with a C.
        </p>
      </GuideSection>

      <GuideSection id="mid-year" n={4} kicker="Example" title="Starting a job mid-year">
        <p>
          If you have not worked since April, you have built up unused tax-free allowance. With a cumulative code your
          first payslips would have little or no tax. With 1257L M1, that unused allowance is ignored.
        </p>
        <WorkedExample
          title="Starting in October on £2,500 a month, no other income since April"
          steps={[
            { label: "Tax each month on 1257L M1", value: "£290.35" },
            { label: "Tax due on 3 months’ pay with a cumulative code", note: "£7,500 is less than 9 months of allowance", value: "£0.00" },
            { label: "Overpaid after 3 payslips", value: "£871.05" },
          ]}
          total={{ label: "Overpaid by 5 April if never corrected", value: "£1,257.90" }}
        />
        <p>
          Over the whole tax year this person earns £15,000. Tax due is £484.20, but six months on M1 takes £1,742.10.
        </p>
      </GuideSection>

      <GuideSection id="first-job" n={5} kicker="Example" title="BR on a first job">
        <p>
          If your employer has no information at all, they may use BR, which taxes every pound at 20%. On a first job
          starting in April, that can take far too much.
        </p>
        <WorkedExample
          title="First job from April, £2,000 a month, BR code"
          steps={[
            { label: "Tax each month on BR", value: "£400.00" },
            { label: "Correct tax on 3 months’ pay", value: "£571.05" },
            { label: "Overpaid after 3 payslips", value: "£628.95" },
          ]}
          total={{ label: "Overpaid by 5 April if never corrected", value: "£2,515.80" }}
        />
      </GuideSection>

      <GuideSection id="checklist" n={6} kicker="New starters" title="The starter checklist">
        <p>
          If you do not have a P45, your employer will ask you to complete the HMRC starter checklist. The statement you
          choose decides the code you start on:
        </p>
        <DataTable
          caption="Starter checklist statements"
          head={["Statement", "When to choose it", "Starting code"]}
          rows={[
            ["A", "This is your first job since 6 April, and you have had no taxable benefits or pension", "1257L, cumulative"],
            ["B", "This is now your only job, but you had another since 6 April or received taxable benefits", "1257L M1 or W1"],
            ["C", "You have another job or receive a pension", "BR"],
          ]}
        />
        <p>
          Choosing the right statement is the quickest way to avoid emergency tax. If you have a P45, give it to your new
          employer instead: it carries your pay and tax so far, so they can use a cumulative code from the start.
        </p>
      </GuideSection>

      <GuideSection id="fix" n={7} kicker="Fixing it" title="Getting your code fixed">
        <Timeline
          items={[
            { when: "Straight away", what: "Give your employer your P45 or starter checklist", detail: "This is the information payroll needs to use the right code." },
            { when: "Within days", what: "Check your code online", detail: "Use the HMRC app or your personal tax account to see your code and tell HMRC about your new job and expected pay." },
            { when: "Next payslip or two", what: "HMRC sends a new code", detail: "Your employer applies it, usually on a cumulative basis, and refunds overpaid tax through payroll." },
          ]}
        />
        <Callout title="Check the code on your payslip">
          Once the M1, W1 or X disappears, your code is cumulative again. If it still shows after two or three payslips,
          contact HMRC.
        </Callout>
      </GuideSection>

      <GuideSection id="refunds" n={8} kicker="Refunds" title="Getting overpaid tax back">
        <ul>
          <li>
            <strong>Through your pay:</strong> once a cumulative code is applied, the overpayment usually comes back in
            your next payslip as a tax refund.
          </li>
          <li>
            <strong>After the tax year:</strong> if it has not been refunded by 5 April, HMRC compares your pay and tax for
            the year and sends a P800 calculation, usually between June and the end of November. You can then claim the
            refund online.
          </li>
          <li>
            <strong>If you have stopped working:</strong> you can claim a refund during the year without waiting for
            the year to end.
          </li>
        </ul>
        <Callout tone="warn" title="Beware of refund scams">
          HMRC never tells you about a refund by text or email with a link. Use the HMRC app or GOV.UK directly. Refund
          agents can claim for you, but they charge a fee you can avoid.
        </Callout>
      </GuideSection>

      <GuideSection id="second-jobs" n={9} kicker="More than one income" title="Second jobs and pensions">
        <p>
          BR is not always an emergency code. If you have two jobs, your tax-free allowance normally goes to your main job,
          and the second job uses BR (or D0 if your total income reaches the higher rate). That is correct, not a
          mistake.
        </p>
        <p>
          The first payment from a new pension is often taxed on an emergency code too. If you take a lump sum from your
          pension, it can be taxed as if you will receive the same every month, leading to large overpayments you can
          reclaim.
        </p>
      </GuideSection>

      <GuideSection id="by-month" n={10} kicker="Reference" title="Overpayment by start month">
        <p>
          The later in the year you start, the more unused allowance an emergency code ignores, until near the end of the
          year when there are fewer months left to overpay. These figures assume £2,500 a month on 1257L M1, no other
          income since April, and a code that is never corrected.
        </p>
        <DataTable
          caption="Overpaid by 5 April, £2,500 a month, 1257L M1"
          head={["Started in", "Overpaid by 5 April"]}
          numeric={[1]}
          rows={[
            ["April", "£0.00"],
            ["June", "£419.30"],
            ["August", "£838.60"],
            ["October", "£1,257.90"],
            ["December", "£1,161.40"],
            ["February", "£580.70"],
          ]}
        />
        <p>
          Starting in April with no other income, M1 gives the same result as a cumulative code, because you have no
          unused allowance from earlier months.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={11} kicker="Pensions" title="Emergency tax on pension withdrawals">
        <p>
          The first taxable withdrawal from a pension under flexible access is usually taxed on an emergency code. A
          one-off lump sum is then taxed as if you will receive the same amount every month, which can mean thousands of
          pounds of overpaid tax.
        </p>
        <p>You can reclaim it without waiting for the end of the tax year, using one of three HMRC forms:</p>
        <ul>
          <li><strong>P55</strong> if you have taken part of your pension and are not taking regular payments.</li>
          <li><strong>P53Z</strong> if you have emptied your pension and have other income.</li>
          <li><strong>P50Z</strong> if you have emptied your pension and have no other income.</li>
        </ul>
      </GuideSection>

      <GuideSection id="students" n={12} kicker="New workers" title="Students, graduates and returners">
        <p>
          Graduates starting their first job in the autumn are often on emergency codes, and are especially likely to
          overpay because they have unused allowance from April. Complete the starter checklist carefully: if this is your
          first job since 6 April, choose statement A to get the normal cumulative code straight away.
        </p>
        <p>
          The same applies when returning to work after a career break, parental leave or time on benefits. If you claimed
          Jobseeker&rsquo;s Allowance or Employment and Support Allowance, your P45 from the Jobcentre helps payroll get
          your tax right.
        </p>
      </GuideSection>

      <GuideSection id="weekly" n={13} kicker="Weekly pay" title="Weekly pay">
        <p>
          If you are paid weekly, the emergency code is 1257L W1. Each week you get one fifty-second of the allowance,
          £241.90, and one fifty-second of each band. On £500 a week that means about £51.62 of tax each week.
        </p>
        <p>
          Weekly-paid workers who start mid-year overpay in the same way as monthly-paid ones, and the fix is the same:
          give your employer a P45 or starter checklist, and check your code in the HMRC app.
        </p>
      </GuideSection>

      <GuideSection id="why-emergency" n={14} kicker="Background" title="Why HMRC uses emergency codes">
        <p>
          Emergency codes protect against under-taxing. If payroll gave every new starter a full cumulative allowance
          without knowing their history, someone who had already used their allowance in an earlier job would pay too
          little and face a bill later. A non-cumulative code is a cautious middle ground: you get a share of the
          allowance each payday, but no catch-up.
        </p>
        <p>
          The cost of that caution falls on people who have not worked earlier in the year, such as graduates, people
          returning from a break, and anyone between jobs for a few months. They are the ones who most often overpay, and
          the ones who benefit most from giving their employer accurate information early.
        </p>
      </GuideSection>

      <GuideSection id="payslip-check" n={15} kicker="Payslips" title="Spotting an emergency code on your payslip">
        <p>Look for the tax code near the top of your payslip. Signs of an emergency or temporary code include:</p>
        <ul>
          <li>W1, M1 or X after the code, or a &ldquo;basis&rdquo; field that says non-cumulative or week 1.</li>
          <li>A code of BR or 0T when this is your only job.</li>
          <li>Tax that is much higher than a colleague on similar pay.</li>
          <li>Year-to-date tax that does not fall even though you started mid-year.</li>
        </ul>
        <p>
          If you see any of these, check your code in the HMRC app, which shows the code HMRC has sent your employer, and
          update your income details. If the app shows the right code but your payslip does not, ask payroll when they
          will apply it.
        </p>
        <Callout title="What if I paid too little?">
          Emergency codes can lead to underpaying when you have more than one job. HMRC normally collects up to £3,000 of
          underpaid tax through your code the next year, spread over 12 months, rather than asking for it in one go.
        </Callout>
      </GuideSection>

      <GuideSection id="questions" n={16} kicker="Questions" title="Common questions">
        <h3>How long does an emergency tax code last?</h3>
        <p>Usually one to three payslips, until HMRC sends your employer the right code.</p>
        <h3>Will I always get the money back?</h3>
        <p>
          If you overpaid, yes, either through payroll or after the tax year ends. Emergency codes can occasionally lead
          to underpaying, for example on a second job; HMRC then collects it through your code the following year.
        </p>
        <h3>Does an emergency code affect National Insurance?</h3>
        <p>No. National Insurance is worked out on each payment anyway, and does not depend on your tax code.</p>
        <h3>Can I ask my employer to stop using it?</h3>
        <p>
          Your employer must use the code HMRC gives them. The way to change it is to give them your P45 or contact HMRC.
        </p>
        <h3>I started in April. Why am I on an emergency code?</h3>
        <p>
          Usually because your employer had no P45 or starter checklist. If you started in April with no other income, an
          M1 code gives almost the same result as a cumulative one, so you may not be overpaying at all.
        </p>
        <h3>Can a refund agent get my money back faster?</h3>
        <p>
          No. They use the same HMRC process you can use yourself for free, and take a share of your refund as their fee.
        </p>
        <h3>Will my employer know I was overtaxed?</h3>
        <p>
          Payroll applies whatever code HMRC sends. Once the correct cumulative code arrives, the payroll system works out
          the overpayment automatically and refunds it on your next payday.
        </p>
        <h3>Does an emergency code affect my student loan?</h3>
        <p>
          No. Student loan repayments are worked out on each payment using the plan threshold, whatever your tax code.
          They depend on your pay, not your tax-free allowance.
        </p>
        <h3>Is an emergency code the same as being on the wrong code?</h3>
        <p>Not quite. An emergency code is temporary by design; a wrong code is a mistake. Both are fixed the same way.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "1257L", label: "Standard tax code" },
            { value: "£1,048.25", label: "Monthly tax-free pay on 1257L" },
            { value: "£241.90", label: "Weekly tax-free pay on 1257L" },
            { value: "20%", label: "Tax on every pound with code BR" },
            { value: "W1, M1, X", label: "Letters that mean non-cumulative" },
            { value: "P800", label: "HMRC’s end-of-year tax calculation" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
