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

/** Healthy Start — the guide. Figures from src/lib/life/health.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "amounts", title: "How much you get" },
  { id: "who", title: "Who qualifies" },
  { id: "uc", title: "The £408 Universal Credit limit" },
  { id: "under18", title: "Pregnant under-18s" },
  { id: "over-time", title: "What it adds up to" },
  { id: "buy", title: "What you can buy" },
  { id: "vitamins", title: "Free vitamins" },
  { id: "card", title: "The Healthy Start card" },
  { id: "applying", title: "How to apply" },
  { id: "changes", title: "When your payments change" },
  { id: "scotland", title: "Scotland: Best Start Foods" },
  { id: "other-help", title: "Other help for families" },
  { id: "tips", title: "Getting the most from your card" },
  { id: "history", title: "How Healthy Start has changed" },
  { id: "pregnancy-food", title: "Eating well in pregnancy" },
  { id: "babies", title: "Feeding babies and toddlers" },
  { id: "budget", title: "Making the money go further" },
  { id: "problems", title: "If something goes wrong" },
  { id: "uptake", title: "Why families miss out" },
  { id: "checklist", title: "A quick eligibility checklist" },
  { id: "assessment", title: "Universal Credit assessment periods" },
  { id: "professionals", title: "Help from midwives and health visitors" },
  { id: "working-families", title: "Working families" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NHS Healthy Start", href: "https://www.healthystart.nhs.uk/" },
  { label: "NHS Healthy Start — Get help to buy food and milk", href: "https://www.healthystart.nhs.uk/get-help-to-buy-food-and-milk/" },
  { label: "GOV.UK — Healthy Start", href: "https://www.gov.uk/healthy-start" },
  { label: "Social Security Scotland — Best Start Foods", href: "https://www.mygov.scot/best-start-grant-best-start-foods" },
  { label: "NHS — Vitamins, supplements and nutrition in pregnancy", href: "https://www.nhs.uk/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/" },
];

export default function HealthyStartGuide() {
  return (
    <Guide
      kicker="The Healthy Start guide"
      title="Healthy Start in 2026/27"
      intro={
        <>
          Healthy Start puts money on a prepaid card to help pregnant women and families with young children buy milk, fruit, vegetables, pulses
          and infant formula. The amounts rose in April 2026. Many eligible families still do not claim. This guide explains who qualifies, how
          much it is worth, and how to apply.
        </>
      }
      meta={["April 2026 rates", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            <strong>£4.65 a week</strong> from 10 weeks of pregnancy.
          </li>
          <li>
            <strong>£9.30 a week</strong> for each child under 1.
          </li>
          <li>
            <strong>£4.65 a week</strong> for each child aged 1 to 3.
          </li>
          <li>You usually need Universal Credit with family <a href="/tax-and-salary/salary-calculator">take-home pay</a>{" "}of £408 a month or less, or certain other benefits.</li>
          <li>Free vitamins for pregnancy and for children up to 4 are included.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£4.65", label: "Pregnancy, a week" },
            { value: "£9.30", label: "Baby under 1, a week" },
            { value: "£4.65", label: "Child aged 1 to 3, a week" },
            { value: "£408", label: "Universal Credit take-home pay limit a month" },
          ]}
        />
      </GuideSection>

      <GuideSection id="amounts" n={2} kicker="Rates" title="How much you get">
        <p>The payments rose from April 2026, from £4.25 and £8.50 a week. Money is added to your card every 4 weeks.</p>
        <DataTable
          caption="Healthy Start from April 2026"
          head={["Who", "A week", "Every 4 weeks", "A year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Pregnancy, from 10 weeks", "£4.65", "£18.60", "—"],
            ["Child under 1", "£9.30", "£37.20", "£483.60"],
            ["Child aged 1 to 3", "£4.65", "£18.60", "£241.80"],
          ]}
        />
        <p>
          Payments are added for each eligible child, so a family with a baby and a toddler gets £13.95 a week, or £55.80 every 4 weeks.
        </p>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Eligibility" title="Who qualifies">
        <p>You can get Healthy Start if you are at least 10 weeks pregnant or have a child under 4, and you get one of:</p>
        <ul>
          <li>Universal Credit, with family take-home pay from work of £408 a month or less;</li>
          <li>Income Support;</li>
          <li>income-based Jobseeker&rsquo;s Allowance;</li>
          <li><a href="/benefits/pension-credit">Pension Credit</a>{" "}that includes the child addition;</li>
          <li>income-related Employment and Support Allowance, if you are pregnant.</li>
        </ul>
        <p>
          You also need to live in England, Wales or Northern Ireland. People with no recourse to public funds may qualify in some circumstances,
          such as if they have a child who is a British citizen. Check the Healthy Start website for details.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={4} kicker="Earnings" title="The £408 Universal Credit limit">
        <p>
          The £408 limit is your household&rsquo;s take-home pay from work in a monthly Universal Credit assessment period: earnings after tax,
          National Insurance and pension contributions. It is not your Universal Credit award. If both partners work, their pay is added together.
        </p>
        <Callout tone="warn" title="Check after a pay rise">
          Because the limit is low, a few more hours of work can take you over it. If your earnings rise above £408, tell Healthy Start, as you may
          no longer qualify.
        </Callout>
      </GuideSection>

      <GuideSection id="under18" n={5} kicker="Young parents" title="Pregnant under-18s">
        <p>
          If you are under 18 and pregnant, you qualify for Healthy Start whatever your income and whether or not you get any benefits. Once your
          baby is born, you will need one of the qualifying benefits to keep getting the money.
        </p>
      </GuideSection>

      <GuideSection id="over-time" n={6} kicker="The total" title="What it adds up to">
        <WorkedExample
          title="From 10 weeks of pregnancy to a child's 4th birthday"
          steps={[
            { label: "30 weeks of pregnancy at £4.65", value: "£139.50" },
            { label: "52 weeks under 1 at £9.30", value: "£483.60" },
            { label: "156 weeks aged 1 to 3 at £4.65", value: "£725.40" },
          ]}
          total={{ label: "Total over the journey", value: "£1,348.50" }}
        />
        <Figure label="Healthy Start over 12 months" caption="Different family situations, from today.">
          <Bars
            items={[
              { label: "Toddler", value: 241.8 },
              { label: "10 weeks pregnant", value: 344.1 },
              { label: "New baby", value: 483.6 },
              { label: "Toddler + 20 weeks pregnant", value: 632.4 },
              { label: "Baby + toddler", value: 664.95 },
            ]}
          />
        </Figure>
        <p>
          The calculator projects the next 12 months for your family, including birthdays and a due date, so you can see when payments change.
        </p>
      </GuideSection>

      <GuideSection id="buy" n={7} kicker="Spending" title="What you can buy">
        <CompareCards
          columns={[
            {
              name: "You can buy",
              rows: [
                { label: "Milk", value: "Plain cow's milk: whole, semi-skimmed or skimmed" },
                { label: "Fruit and veg", value: "Fresh, frozen or tinned, with nothing added" },
                { label: "Pulses", value: "Fresh, dried or tinned beans, lentils and peas" },
                { label: "Formula", value: "First infant formula based on cow's milk" },
              ],
            },
            {
              name: "You cannot buy",
              rows: [
                { label: "Flavoured", value: "Flavoured milk or fruit with added sugar or salt" },
                { label: "Other formula", value: "Follow-on or growing-up milks" },
                { label: "Other food", value: "Anything else in the shop" },
              ],
            },
          ]}
        />
        <p>Shops cannot always tell which items are eligible, so it is your responsibility to use the card only for the right foods.</p>
      </GuideSection>

      <GuideSection id="vitamins" n={8} kicker="Free" title="Free vitamins">
        <p>
          Healthy Start vitamins are free for eligible families. Pregnancy vitamins contain folic acid, vitamin C and vitamin D. Children&rsquo;s
          vitamin drops contain vitamins A, C and D, and are suitable from birth to 4 years. Ask your midwife, health visitor or local pharmacy where
          to collect them.
        </p>
        <p>
          The NHS recommends a daily vitamin D supplement for everyone in autumn and winter, and folic acid before and during early pregnancy.
        </p>
      </GuideSection>

      <GuideSection id="card" n={9} kicker="Using it" title="The Healthy Start card">
        <p>
          The card is a prepaid Mastercard with a PIN. It works in shops that accept Mastercard, including supermarkets, corner shops and market
          stalls, but not online. Any money you do not spend stays on the card. If you do not use it for a while, it may be removed, so spend it
          regularly.
        </p>
        <p>You can check your balance online or by phone. Report a lost or stolen card straight away.</p>
      </GuideSection>

      <GuideSection id="applying" n={10} kicker="Claiming" title="How to apply">
        <Timeline
          items={[
            { when: "Step 1", what: "Apply online", detail: "Through the NHS Healthy Start website, or by phone." },
            { when: "Step 2", what: "Eligibility checked", detail: "Against your benefit records." },
            { when: "Step 3", what: "Card posted", detail: "With money on it if you are eligible." },
            { when: "Every 4 weeks", what: "Money added", detail: "Automatically, while you are eligible." },
          ]}
        />
        <p>
          Apply as soon as you are 10 weeks pregnant. Backdating is limited, so a late application usually means lost money. You will need your
          National Insurance number and due date or children&rsquo;s dates of birth.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={11} kicker="Over time" title="When your payments change">
        <ul>
          <li>When your baby is born, tell Healthy Start so the payment rises to £9.30 a week.</li>
          <li>At your child&rsquo;s first birthday, the payment falls to £4.65 a week.</li>
          <li>At their fourth birthday, the payment for that child stops.</li>
          <li>If your benefits or earnings change so you no longer qualify, the payments stop.</li>
        </ul>
      </GuideSection>

      <GuideSection id="scotland" n={12} kicker="Scotland" title="Scotland: Best Start Foods">
        <p>
          In Scotland, Healthy Start was replaced by Best Start Foods, run by Social Security Scotland. It has different amounts, a higher
          eligibility threshold and different rules for children under 3. Check mygov.scot if you live in Scotland.
        </p>
      </GuideSection>

      <GuideSection id="other-help" n={13} kicker="More support" title="Other help for families">
        <DataTable
          caption="Other help for families with young children"
          head={["Help", "What it is"]}
          rows={[
            ["Sure Start Maternity Grant", "A one-off £500 payment for a first baby in England, Wales and Northern Ireland, on certain benefits"],
            ["Free prescriptions", "During pregnancy and for 12 months after the birth"],
            ["Free NHS dental care", "During pregnancy and for 12 months after the birth"],
            ["Free early education", "Funded childcare hours for eligible 2-year-olds and all 3 and 4-year-olds"],
            ["Child Benefit", "£27.05 a week for the eldest child"],
          ]}
        />
      </GuideSection>

      <GuideSection id="tips" n={14} kicker="Tips" title="Getting the most from your card">
        <ul>
          <li>Frozen fruit and vegetables are cheap, keep well and count as eligible.</li>
          <li>Tinned beans, lentils and chickpeas stretch meals further.</li>
          <li>Check the balance before shopping, so you know what you can spend.</li>
          <li>Use your card at local markets if they take Mastercard, where fresh produce can be cheaper.</li>
        </ul>
      </GuideSection>

      <GuideSection id="history" n={15} kicker="Background" title="How Healthy Start has changed">
        <p>
          Healthy Start replaced the Welfare Food Scheme in 2006, using paper vouchers that could be swapped for milk, fruit and vegetables. In 2021
          the vouchers were replaced by a prepaid card in England, Wales and Northern Ireland, which can be used in more shops and is easier to top
          up. The weekly amounts rose in 2021 and again in April 2026, to £4.65 and £9.30.
        </p>
      </GuideSection>

      <GuideSection id="pregnancy-food" n={16} kicker="Pregnancy" title="Eating well in pregnancy">
        <p>
          The NHS recommends plenty of fruit and vegetables, starchy foods, protein such as beans, pulses, fish, eggs and lean meat, and dairy foods
          during pregnancy. Healthy Start money covers several of these. Take 400 micrograms of folic acid a day until the 12th week, and 10
          micrograms of vitamin D a day throughout. Healthy Start pregnancy vitamins contain both.
        </p>
        <p>
          Avoid some foods in pregnancy, such as unpasteurised milk, some soft cheeses and raw or undercooked meat. Your midwife can give you a full
          list.
        </p>
      </GuideSection>

      <GuideSection id="babies" n={17} kicker="Young children" title="Feeding babies and toddlers">
        <p>
          The higher rate for babies under 1 reflects the cost of first infant formula for families who use it. If you breastfeed, the card can be
          used for healthy food for you instead. From around 6 months, babies start solid foods, and fruit, vegetables and pulses become part of
          their diet.
        </p>
        <p>
          From 12 months, whole cow&rsquo;s milk can be given as a main drink. Follow-on and growing-up milks are not needed and cannot be bought
          with the card.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={18} kicker="Value" title="Making the money go further">
        <DataTable
          caption="What £18.60 every 4 weeks can buy, as a rough guide"
          head={["Item", "Typical use"]}
          rows={[
            ["Milk", "Several large bottles of semi-skimmed milk"],
            ["Frozen vegetables", "Bags of peas, sweetcorn and mixed vegetables"],
            ["Tinned pulses", "Tins of chickpeas, beans or lentils"],
            ["Fresh fruit", "Bananas, apples and seasonal fruit"],
          ]}
        />
        <p>
          Prices vary, but buying supermarket own-brand frozen and tinned produce stretches the money furthest. Combining Healthy Start with other
          help, such as free school meals for older children, can make a real difference to a family&rsquo;s food budget.
        </p>
      </GuideSection>

      <GuideSection id="problems" n={19} kicker="Help" title="If something goes wrong">
        <ul>
          <li>If your card is declined, check the balance and that the shop accepts Mastercard.</li>
          <li>If payments stop, check whether your benefits or earnings have changed, or whether a child has turned 4.</li>
          <li>If your card is lost or stolen, report it straight away so the balance can be protected.</li>
          <li>If you are refused and think you qualify, contact Healthy Start with your benefit details.</li>
        </ul>
      </GuideSection>

      <GuideSection id="uptake" n={20} kicker="Take-up" title="Why families miss out">
        <p>
          Many eligible families do not claim. Common reasons are not knowing the scheme exists, assuming working families cannot get it, or not
          realising that it is separate from Universal Credit and needs its own application. Health visitors, midwives, children&rsquo;s centres
          and food banks can all help you apply.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={21} kicker="Quick check" title="A quick eligibility checklist">
        <ol>
          <li>Are you at least 10 weeks pregnant, or do you have a child under 4?</li>
          <li>Do you live in England, Wales or Northern Ireland?</li>
          <li>Do you get Universal Credit with family take-home pay of £408 a month or less, or another qualifying benefit?</li>
          <li>Or are you under 18 and pregnant?</li>
        </ol>
        <p>If you answered yes to the first two, and yes to either of the last two, apply now.</p>
      </GuideSection>

      <GuideSection id="assessment" n={22} kicker="Universal Credit" title="Universal Credit assessment periods">
        <p>
          Healthy Start looks at your take-home pay in your Universal Credit assessment period. If your pay varies from month to month, you might
          be under the £408 limit in some months and over it in others. If you are refused because of one high month, check again when your pay
          returns to its usual level, and keep your Universal Credit statements as evidence.
        </p>
        <p>
          The limit applies to earnings from work. Universal Credit itself, <a href="/benefits/child-benefit">Child Benefit</a>{" "}and most other benefits are not counted towards the £408.
        </p>
      </GuideSection>

      <GuideSection id="professionals" n={23} kicker="Support" title="Help from midwives and health visitors">
        <p>
          Midwives and health visitors can tell you about Healthy Start, help you apply, and show you where to collect free vitamins. Some local
          areas give out vitamins at children&rsquo;s centres, family hubs or pharmacies. If you are not sure where to go, ask at your next
          appointment or contact your local family hub.
        </p>
      </GuideSection>

      <GuideSection id="working-families" n={24} kicker="In work" title="Working families">
        <p>
          Healthy Start is not only for families who are out of work. A parent working part-time on a low wage can be well under the £408 limit,
          especially in the months after having a baby or while on unpaid parental leave. <a href="/benefits/maternity-pay">Statutory Maternity Pay</a>{" "}counts as earnings for Universal
          Credit, so check your take-home figure each month while you are on maternity leave.
        </p>
        <WorkedExample
          title="A family with a 6-month-old baby and a 2-year-old, on Universal Credit with take-home pay of £350 a month"
          steps={[
            { label: "Baby under 1", value: "£9.30 a week" },
            { label: "Child aged 1 to 3", value: "£4.65 a week" },
            { label: "Total", value: "£13.95 a week" },
          ]}
          total={{ label: "Paid every 4 weeks", value: "£55.80" }}
        />
      <p>
          For a quick check of adult weight against NHS ranges, use the <a href="/life/bmi-uk-nhs">BMI calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£4.65", label: "Pregnancy, a week" },
            { value: "£9.30", label: "Under 1, a week" },
            { value: "£4.65", label: "Aged 1 to 3, a week" },
            { value: "10 weeks", label: "Of pregnancy to start" },
            { value: "4", label: "Age payments stop" },
            { value: "£408", label: "Universal Credit take-home pay limit" },
            { value: "4 weeks", label: "How often money is added" },
            { value: "£1,348.50", label: "Pregnancy to 4th birthday" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
