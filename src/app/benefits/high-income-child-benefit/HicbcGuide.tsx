import {
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Bars,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** High Income Child Benefit Charge — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the charge works" },
  { id: "ani", title: "Adjusted net income" },
  { id: "who-pays", title: "Who pays it" },
  { id: "marginal", title: "The hidden tax rate" },
  { id: "pension", title: "Using pension contributions" },
  { id: "other-ways", title: "Other ways to reduce it" },
  { id: "opt-out", title: "Opting out of payments" },
  { id: "paying", title: "Registering and paying" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "families", title: "Three families, worked through" },
  { id: "self-employed", title: "Self-employed people and landlords" },
  { id: "changes", title: "Changes during the year" },
  { id: "paye", title: "Paying through your tax code" },
  { id: "late", title: "If you have not paid it before" },
  { id: "decide", title: "Should you take the payments?" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "GOV.UK — Stop or restart Child Benefit payments", href: "https://www.gov.uk/child-benefit-tax-charge/stop-child-benefit" },
  { label: "GOV.UK — Tax relief on pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
  { label: "GOV.UK — Gift Aid: donating through your tax return", href: "https://www.gov.uk/donating-to-charity/gift-aid" },
];

export default function HicbcGuide() {
  return (
    <Guide
      kicker="The High Income Child Benefit Charge guide"
      title="The High Income Child Benefit Charge explained"
      intro={
        <>
          If you or your partner earns more than £60,000, part of your family&rsquo;s Child Benefit is taken back through a tax
          charge, and all of it at £80,000. The charge creates one of the highest effective tax rates in the system. This guide
          explains how it is worked out, who pays, and the legitimate ways to reduce it.
        </>
      }
      meta={["2026/27 tax year", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The charge applies if either partner&rsquo;s <strong>adjusted net income</strong> is over £60,000.</li>
          <li>It is <strong>1% of the Child Benefit for every £200</strong> of income above £60,000.</li>
          <li>At £80,000 or more, the charge equals all of the Child Benefit.</li>
          <li>The partner with the higher income pays it, through Self Assessment or their tax code.</li>
        </ul>
        <DataTable
          caption="Charge on a full year of Child Benefit, 2026/27"
          head={["Adjusted net income", "1 child", "2 children", "3 children"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["£62,000", "£140.66", "£233.74", "£326.82"],
            ["£65,000", "£351.65", "£584.35", "£817.05"],
            ["£70,000", "£703.30", "£1,168.70", "£1,634.10"],
            ["£75,000", "£1,054.95", "£1,753.05", "£2,451.15"],
            ["£80,000", "£1,406.60", "£2,337.40", "£3,268.20"],
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The maths" title="How the charge works">
        <p>
          Take your adjusted net income, subtract £60,000, divide by £200 and round down. The result is the percentage of your
          Child Benefit that is taken back.
        </p>
        <WorkedExample
          title="Two children, adjusted net income £70,000"
          steps={[
            { label: "Child Benefit for the year", value: "£2,337.40" },
            { label: "Income above £60,000", value: "£10,000" },
            { label: "£10,000 ÷ £200", value: "50%" },
          ]}
          total={{ label: "Charge", value: "£1,168.70" }}
        />
        <p>
          The percentage is rounded down to a whole number, so income of £60,199 gives no charge and £60,200 gives 1%. The
          charge is worked out on the Child Benefit actually paid in the tax year, so a baby born part-way through the year means
          a smaller charge.
        </p>
        <p>
          The threshold rose from £50,000 to £60,000 in April 2024, and the band widened from £10,000 to £20,000, which halved
          the rate at which Child Benefit is withdrawn.
        </p>
      </GuideSection>

      <GuideSection id="ani" n={3} kicker="The income test" title="Adjusted net income">
        <p>The charge uses <strong>adjusted net income</strong>, not your salary. Broadly:</p>
        <ul>
          <li>start with all your taxable income: salary, bonus, self-employed profit, rental profit, savings interest and dividends;</li>
          <li>take off trading losses;</li>
          <li>take off the gross amount of personal pension contributions paid with relief at source;</li>
          <li>take off the gross amount of Gift Aid donations.</li>
        </ul>
        <p>
          Pension contributions taken from your pay before tax, through a net pay scheme or salary sacrifice, are already left
          out of your taxable pay, so you do not deduct them again. Interest within the Personal Savings Allowance and dividends
          within the dividend allowance still count.
        </p>
      </GuideSection>

      <GuideSection id="who-pays" n={4} kicker="Couples" title="Who pays it">
        <p>
          The charge is paid by whichever partner has the higher adjusted net income, whoever receives the Child Benefit. A
          partner means someone you are married to, in a civil partnership with, or living with as a couple.
        </p>
        <CompareCards
          columns={[
            {
              name: "Two earners on £55,000",
              rows: [
                { label: "Household income", value: "£110,000" },
                { label: "Higher income", value: "£55,000" },
                { label: "Charge", value: "£0" },
              ],
            },
            {
              name: "One earner on £70,000",
              rows: [
                { label: "Household income", value: "£70,000" },
                { label: "Higher income", value: "£70,000" },
                { label: "Charge (2 children)", value: "£1,168.70" },
              ],
            },
          ]}
        />
        <p>
          Because the test is on individual income, a single-earner family can pay the charge while a better-off two-earner
          family pays nothing. The charge also applies if you live with a partner who is not the child&rsquo;s parent.
        </p>
      </GuideSection>

      <GuideSection id="marginal" n={5} kicker="Effective rates" title="The hidden tax rate">
        <p>
          Between £60,000 and £80,000, every £1 of extra income costs 40% Income Tax, 2% National Insurance and some Child
          Benefit. The more children you have, the higher the combined rate.
        </p>
        <Figure label="Income Tax, NI and charge on the next £1,000 of salary, £60,000 to £80,000" caption="England, Wales and NI, 2026/27, a full year of Child Benefit.">
          <Bars
            format={(n) => `${n.toFixed(1)}%`}
            items={[
              { label: "1 child", value: 49.03 },
              { label: "2 children", value: 53.69 },
              { label: "3 children", value: 58.34 },
            ]}
          />
        </Figure>
        <p>
          A pay rise from £60,000 to £70,000 adds £5,800 to take-home pay
          after Income Tax and NI, but a family with two children loses £1,168.70 of Child Benefit, so they are only £4,631.30
          better off.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={6} kicker="Planning" title="Using pension contributions">
        <p>
          Paying into a pension is the most common way to bring adjusted net income back down to £60,000. Every £1 of gross
          contribution reduces adjusted net income by £1.
        </p>
        <WorkedExample
          title="Income £70,000, two children, £10,000 gross into a personal pension"
          steps={[
            { label: "You pay in from take-home pay", value: "£8,000" },
            { label: "Pension provider claims basic-rate relief", value: "+£2,000" },
            { label: "Higher-rate relief through your tax return", value: "£2,000" },
            { label: "Child Benefit charge removed", value: "£1,168.70" },
          ]}
          total={{ label: "Net cost of £10,000 in your pension", value: "£4,831.30" }}
        />
        <p>
          That is effective relief of more than 50%. Salary sacrifice can work even better, because it also saves National
          Insurance: sacrificing £5,000 to go from £65,000 to £60,000 saves £2,100 of Income Tax and NI plus £584.35 of charge for
          a family with two children. Pension money is locked away until at least 55, rising to 57 from 2028.
        </p>
      </GuideSection>

      <GuideSection id="other-ways" n={7} kicker="Planning" title="Other ways to reduce it">
        <ul>
          <li>
            <strong>Gift Aid.</strong> A £1,000 donation is £1,250 gross and reduces adjusted net income by that much. At £70,000
            with two children, it cuts the charge by £163.62.
          </li>
          <li>
            <strong>Moving savings or investments.</strong> Interest and dividends count towards income. Holding them in an ISA,
            or in the name of a lower-earning spouse, keeps them out.
          </li>
          <li>
            <strong>Timing a bonus.</strong> Income counts in the tax year it is paid. A bonus paid into a pension through bonus
            sacrifice does not count at all.
          </li>
          <li>
            <strong>Self-employed expenses and losses.</strong> Claiming all your allowable expenses lowers profit, and
            therefore adjusted net income.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="opt-out" n={8} kicker="Choices" title="Opting out of payments">
        <p>
          If your income will be £80,000 or more, the charge takes back all the Child Benefit. Many families choose to stop the
          payments rather than receive them and pay them back.
        </p>
        <Callout tone="warn" title="Stop the payments, not the claim">
          Keep the claim in place and ask to stop the payments. The parent at home still gets National Insurance credits towards
          their State Pension while a child is under 12, and the child gets a National Insurance number automatically at 16. You
          can restart payments if your income falls.
        </Callout>
        <p>
          If your income is between £60,000 and £80,000, taking the payments is always worth it: you keep part of the benefit.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={9} kicker="Deadlines" title="Registering and paying">
        <Timeline
          items={[
            { when: "During the year", what: "Choose how to pay", detail: "Employed people can ask HMRC to collect the charge through their tax code instead of filing a tax return." },
            { when: "5 October", what: "Register for Self Assessment", detail: "After the end of the first tax year you owe the charge, if it is not being collected through PAYE." },
            { when: "31 January", what: "File and pay", detail: "Report the Child Benefit received and pay the charge with any other tax due." },
          ]}
        />
        <p>
          HMRC uses information from employers and Child Benefit records to spot people who should be paying. If you have not
          registered, you may be charged a penalty as well as the tax. Act quickly if you realise you owe it.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={10} kicker="Avoid" title="Common mistakes">
        <ul>
          <li>Using salary instead of adjusted net income, which ignores pension contributions and adds other income.</li>
          <li>Assuming household income matters: only the higher individual income does.</li>
          <li>Forgetting that a new partner&rsquo;s income counts from the date you start living together.</li>
          <li>Cancelling the Child Benefit claim instead of stopping payments, which loses National Insurance credits.</li>
          <li>Forgetting a bonus or a one-off dividend that pushes income over £60,000 in a single year.</li>
        </ul>
      </GuideSection>

      <GuideSection id="families" n={11} kicker="Worked examples" title="Three families, worked through">
        <DataTable
          caption="High Income Child Benefit Charge, 2026/27"
          head={["Family", "Adjusted net income", "Charge", "Kept", "Pension to avoid it"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["One child, salary £64,000", "£64,000", "£281.32", "£1,125.28", "£4,000"],
            ["Three children, £72,000 with £4,000 pension", "£68,000", "£1,307.28", "£1,960.92", "£8,000 more"],
            ["Two children, £85,000", "£85,000", "£2,337.40", "£0", "£25,000 more"],
          ]}
        />
        <p>
          For the first family, a £4,000 gross pension contribution, costing £3,200 from take-home pay before higher-rate
          relief, saves the whole £281.32 charge as well as £800 of higher-rate tax. For the third, cutting income to £60,000
          would need £25,000 more in the pension; stopping the payments while keeping the claim may be the simpler choice.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={12} kicker="Other income" title="Self-employed people and landlords">
        <p>
          Self-employed profit and rental profit count in full towards adjusted net income. A salary of £58,000 with £5,000 of
          rental profit gives £63,000, a charge of £350.61 for two children, even though the salary alone is under £60,000.
        </p>
        <ul>
          <li>Claim every allowable expense: it reduces profit and the charge together.</li>
          <li>Personal pension contributions made before 5 April count for that tax year.</li>
          <li>Income from a jointly owned rental property is usually split 50:50 between spouses, which can help.</li>
        </ul>
        <p>
          Because profits are only known at the year end, the charge often comes as a surprise on the tax return. Estimate it
          early and decide on pension contributions before 5 April.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={13} kicker="Changes" title="Changes during the year">
        <p>
          The charge is based on Child Benefit received while the higher earner was part of the household. If a baby is born
          part-way through the year, or you start living with a new partner, only the weeks after that count.
        </p>
        <WorkedExample
          title="Two children, income £70,000, partner moves in halfway through the year"
          steps={[
            { label: "Child Benefit received while living together: 26 weeks", value: "£1,168.70" },
            { label: "Charge: 50%", value: "£584.35" },
          ]}
          total={{ label: "Charge for the year", value: "£584.35" }}
        />
        <p>
          If you separate, the charge stops from that date unless you are the one receiving the Child Benefit. If two people in
          the household earn over £60,000, only the higher earner pays.
        </p>
      </GuideSection>

      <GuideSection id="paye" n={14} kicker="Without a tax return" title="Paying through your tax code">
        <p>
          Employed people who only need to file a tax return for the charge can ask HMRC to collect it through PAYE instead,
          using the online service. HMRC adjusts your tax code so the charge is spread over the following year&rsquo;s pay.
        </p>
        <ul>
          <li>You still need to tell HMRC how much Child Benefit your household gets.</li>
          <li>If you already file a tax return for other reasons, report the charge there instead.</li>
          <li>Check your tax code notice each year: if your income or children change, the amount collected may be wrong.</li>
        </ul>
        <p>
          Collecting through PAYE avoids the January bill and payments on account, and stops the charge pushing you into Self
          Assessment just for this.
        </p>
      </GuideSection>

      <GuideSection id="late" n={15} kicker="Catching up" title="If you have not paid it before">
        <p>
          Many people only find out about the charge years later. If you should have paid it, tell HMRC as soon as possible.
          HMRC can usually go back four years, or longer if you were careless.
        </p>
        <p>
          You will owe the charge and interest. Penalties may also apply, but they are lower, and sometimes waived, if you come
          forward yourself before HMRC contacts you and you had a reasonable excuse, such as not knowing a new partner&rsquo;s
          income.
        </p>
        <Callout title="Check both partners' incomes each year">
          The commonest cause of missed charges is one partner&rsquo;s income rising past £60,000 through a pay rise, bonus or
          new job while the other receives the Child Benefit.
        </Callout>
      </GuideSection>

      <GuideSection id="decide" n={16} kicker="Choices" title="Should you take the payments?">
        <CompareCards
          columns={[
            {
              name: "Take the payments",
              rows: [
                { label: "Best when", value: "Income under £80,000" },
                { label: "You keep", value: "Part of the benefit" },
                { label: "Admin", value: "Pay the charge each year" },
              ],
            },
            {
              name: "Stop the payments, keep the claim",
              rows: [
                { label: "Best when", value: "Income £80,000 or more" },
                { label: "You keep", value: "NI credits, no charge" },
                { label: "Admin", value: "Restart if income falls" },
              ],
            },
          ]}
        />
        <p>
          If your income is close to £80,000 and may fall, taking the payments and paying the charge keeps your options open. You
          can stop or restart payments at any time.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={17} kicker="FAQs" title="Common questions">
        <h3>Is the charge based on household income?</h3>
        <p>No. It is based on the higher individual income of the two partners.</p>
        <h3>Does a salary sacrifice pension reduce the charge?</h3>
        <p>Yes. The sacrificed pay is not taxable income, so it never counts towards adjusted net income.</p>
        <h3>What if my partner does not want me to know their income?</h3>
        <p>HMRC will not share it, but you can each check your own position. The person with the higher income is responsible.</p>
        <h3>What happens if I separate during the year?</h3>
        <p>The charge only covers the weeks you were living together as a couple, or weeks you received the benefit yourself.</p>
        <h3>Do I pay the charge if the child lives with my ex-partner?</h3>
        <p>Not if you are not receiving the Child Benefit and do not live with the person who is.</p>
        <h3>Does the charge apply to Guardian&rsquo;s Allowance?</h3>
        <p>No. Only Child Benefit is taken back by the charge.</p>
        <h3>Is the charge the same in Scotland?</h3>
        <p>Yes. Adjusted net income is worked out the same way, though Scottish Income Tax rates differ, so the combined marginal rate is a little higher.</p>
        <h3>Can I pay the charge in instalments?</h3>
        <p>If it is collected through your tax code it is spread over the year automatically. Through Self Assessment it is due by 31 January, but HMRC can agree a payment plan.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£60,000", label: "Charge starts" },
            { value: "£80,000", label: "All Child Benefit repaid" },
            { value: "1% per £200", label: "Rate of the charge" },
            { value: "£2,337.40", label: "Child Benefit for two children" },
            { value: "53.7%", label: "Marginal rate with two children" },
            { value: "5 October", label: "Self Assessment registration deadline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
