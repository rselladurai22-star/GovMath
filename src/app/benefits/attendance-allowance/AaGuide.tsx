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

/** Attendance Allowance — the guide. Figures from src/lib/benefits/later-life.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rates", title: "How much it is" },
  { id: "who", title: "Who can get it" },
  { id: "day", title: "Help during the day" },
  { id: "night", title: "Help at night" },
  { id: "terminal", title: "Terminal illness: the special rules" },
  { id: "pension-credit", title: "The boost to Pension Credit" },
  { id: "carers", title: "Attendance Allowance and your carer" },
  { id: "claiming", title: "How to claim" },
  { id: "form", title: "Filling in the form" },
  { id: "care-homes", title: "Hospitals and care homes" },
  { id: "decisions", title: "Decisions, reviews and challenges" },
  { id: "myths", title: "Common myths" },
  { id: "conditions", title: "Conditions that often qualify" },
  { id: "refused", title: "Why claims are refused" },
  { id: "council-tax", title: "Council Tax help" },
  { id: "dementia", title: "Dementia and memory problems" },
  { id: "abroad", title: "Living or travelling abroad" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Attendance Allowance", href: "https://www.gov.uk/attendance-allowance" },
  { label: "GOV.UK — Attendance Allowance: eligibility", href: "https://www.gov.uk/attendance-allowance/eligibility" },
  { label: "GOV.UK — Pension Credit: what you'll get", href: "https://www.gov.uk/pension-credit/what-youll-get" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Carer's Allowance", href: "https://www.gov.uk/carers-allowance" },
];

export default function AaGuide() {
  return (
    <Guide
      kicker="The Attendance Allowance guide"
      title="Attendance Allowance in 2026/27"
      intro={
        <>
          Attendance Allowance is paid to people over <a href="/investing/state-pension-age">State Pension age</a>{" "}who need help with personal care or supervision because of an illness
          or disability. It is not means-tested, it is tax-free, and you do not need anyone to actually be caring for you. Hundreds of
          thousands of pensioners who could get it do not claim. This guide explains the rates, the rules and the extra help it can unlock.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            <strong>£76.70 a week</strong> if you need help during the day <em>or</em> at night.
          </li>
          <li>
            <strong>£114.60 a week</strong> if you need help during the day <em>and</em> at night, or you are terminally ill.
          </li>
          <li>Your income and savings make no difference, and you can spend it however you like.</li>
          <li>It can add £86.05 a week to Pension Credit and help your carer get Carer&rsquo;s Allowance.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£76.70", label: "Lower rate a week" },
            { value: "£114.60", label: "Higher rate a week" },
            { value: "£5,959.20", label: "Higher rate a year" },
            { value: "6 months", label: "Qualifying period" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="How much it is">
        <DataTable
          caption="Attendance Allowance, 2026/27"
          head={["Rate", "A week", "Every 4 weeks", "A year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Lower: day or night", "£76.70", "£306.80", "£3,988.40"],
            ["Higher: day and night, or terminally ill", "£114.60", "£458.40", "£5,959.20"],
          ]}
        />
        <p>
          It is usually paid every four weeks into a bank account. The rates match the two daily living rates of <a href="/benefits/pip-points">PIP</a>, and they rise every
          April. Attendance Allowance has no mobility part, so difficulties with walking alone do not qualify unless they mean you need help
          with care or supervision.
        </p>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Eligibility" title="Who can get it">
        <ul>
          <li>You have reached State Pension age.</li>
          <li>You have a physical or mental disability or illness, including sight or hearing loss, dementia or a learning disability.</li>
          <li>You need help with personal care, or someone to watch over you to keep you safe.</li>
          <li>You have needed that help for at least six months, unless you are terminally ill.</li>
          <li>You normally live in England, Wales or Northern Ireland. Scotland has Pension Age Disability Payment instead.</li>
        </ul>
        <p>
          If you already get PIP or Disability Living Allowance when you reach State Pension age, you keep it instead of moving to Attendance
          Allowance.
        </p>
      </GuideSection>

      <GuideSection id="day" n={4} kicker="Daytime needs" title="Help during the day">
        <p>The day condition is met if, throughout the day, you need:</p>
        <ul>
          <li>frequent help with bodily functions, such as washing, dressing, eating, using the toilet or taking medication; or</li>
          <li>continual supervision to avoid substantial danger to yourself or others, for example because of falls or confusion.</li>
        </ul>
        <p>
          &ldquo;Frequent&rdquo; means several times through the day, not just once in the morning. It is about the help you reasonably need,
          even if you manage alone because nobody is there. If you struggle to dress, take a long time, or fall in the shower, explain that.
        </p>
      </GuideSection>

      <GuideSection id="night" n={5} kicker="Night-time needs" title="Help at night">
        <p>The night condition is met if, at night, you need:</p>
        <ul>
          <li>help with bodily functions two or more times, or once for 20 minutes or more; or</li>
          <li>another person to be awake for long periods, or frequently, to watch over you.</li>
        </ul>
        <CompareCards
          columns={[
            {
              name: "Lower rate",
              rows: [
                { label: "Day", value: "Frequent help or continual supervision" },
                { label: "Or night", value: "Repeated or prolonged help, or watching over" },
                { label: "A week", value: "£76.70" },
              ],
            },
            {
              name: "Higher rate",
              rows: [
                { label: "Day and night", value: "Both conditions met" },
                { label: "Or", value: "Terminally ill" },
                { label: "A week", value: "£114.60" },
              ],
            },
          ]}
        />
        <p>Meeting the night condition as well as the day condition adds £37.90 a week, or £1,970.80 a year.</p>
      </GuideSection>

      <GuideSection id="terminal" n={6} kicker="Special rules" title="Terminal illness: the special rules">
        <p>
          If a doctor or nurse thinks you may have 12 months or less to live, you can claim under the special rules. You get the higher rate
          straight away, with no six-month wait and no need to describe your care needs. Ask your doctor or specialist nurse for an SR1 form,
          which they send to the Department for Work and Pensions.
        </p>
        <p>
          Someone else can claim on your behalf without you knowing the prognosis. Claims under the special rules are usually dealt with
          within a few weeks.
        </p>
      </GuideSection>

      <GuideSection id="pension-credit" n={7} kicker="Extra money" title="The boost to Pension Credit">
        <p>
          Attendance Allowance is ignored as income for Pension Credit. Better still, if you live alone and nobody gets Carer&rsquo;s Allowance
          for looking after you, it adds a severe disability addition of £86.05 a week to the amount Pension Credit tops you up to. A single
          person&rsquo;s guarantee rises from £238.00 to £324.05.
        </p>
        <WorkedExample
          title="A single pensioner with the full new State Pension of £241.30, getting the higher rate"
          steps={[
            { label: "Pension Credit before", note: "Income is above £238", value: "£0.00" },
            { label: "Guarantee with the severe disability addition", value: "£324.05" },
            { label: "Pension Credit after", note: "£324.05 − £241.30", value: "£82.75" },
            { label: "Attendance Allowance", value: "£114.60" },
          ]}
          total={{ label: "Extra a year", value: "£10,262.20" }}
        />
        <Figure label="Extra income a year from a higher-rate award" caption="Single pensioners living alone, by weekly State Pension.">
          <Bars
            items={[
              { label: "£200 a week", value: 10433.8 },
              { label: "£241.30 a week", value: 10262.2 },
              { label: "£280 a week", value: 8249.8 },
            ]}
          />
        </Figure>
        <p>
          Getting Pension Credit, even a small amount, also opens the door to full Housing Benefit, <a href="/benefits/council-tax-reduction">Council Tax Reduction</a>, a free TV licence at
          75 or over, and Cold Weather Payments. The <a href="/benefits/pension-credit">Pension Credit calculator</a> works out your award.
        </p>
      </GuideSection>

      <GuideSection id="carers" n={8} kicker="Family" title="Attendance Allowance and your carer">
        <p>
          Anyone who looks after you for at least 35 hours a week can claim Carer&rsquo;s Allowance of £86.45 a week once you get Attendance
          Allowance, if they earn £204 a week or less after deductions. They also get <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}credits towards their own State
          Pension.
        </p>
        <Callout tone="warn" title="Think before your carer claims">
          If you get the severe disability addition in Pension Credit, it stops when someone is paid Carer&rsquo;s Allowance for looking after
          you. The household could be worse off. If your carer is over State Pension age, they may only get underlying entitlement, which
          still adds a carer addition of £48.15 to their own Pension Credit. The{" "}
          <a href="/benefits/carers-earnings">Carer&rsquo;s Allowance calculator</a> helps check.
        </Callout>
      </GuideSection>

      <GuideSection id="claiming" n={9} kicker="Claiming" title="How to claim">
        <Timeline
          items={[
            { when: "Step 1", what: "Get the form", detail: "Call the Attendance Allowance helpline or download the AA1 form." },
            { when: "Step 2", what: "Fill it in and post it", detail: "If you request the form by phone, your claim can be backdated to that date." },
            { when: "Step 3", what: "A possible check", detail: "The DWP may contact your GP or arrange a visit, though most claims are decided on paper." },
            { when: "Step 4", what: "Decision", detail: "Usually within a couple of months. Payments are backdated to the claim date." },
          ]}
        />
        <p>Attendance Allowance cannot be backdated before your claim, so start as soon as you think you qualify.</p>
      </GuideSection>

      <GuideSection id="form" n={10} kicker="Strong claims" title="Filling in the form">
        <ul>
          <li>Describe a typical day and a bad day, from getting up to going to bed, and through the night.</li>
          <li>Say how long each task takes, how often you need help, and what happens if you try alone.</li>
          <li>Mention falls, near misses, forgetting medication, and any times you have been unsafe.</li>
          <li>Include letters from your GP, nurse, occupational therapist or a care plan.</li>
          <li>Ask a family member or friend to complete the statement section.</li>
        </ul>
        <Callout title="Free help with the form">
          Age UK, Citizens Advice and many local councils will help you complete the form, often at home.
        </Callout>
      </GuideSection>

      <GuideSection id="care-homes" n={11} kicker="Where you live" title="Hospitals and care homes">
        <p>
          Attendance Allowance stops after 28 days in an NHS hospital. It also stops after 28 days in a care home if the council pays any of the
          fees. If you pay your <a href="/life/care-home-means-test">care home fees</a>{" "}in full yourself, you keep it. Short stays are linked together if they are no more than 28 days
          apart, so tell the Department for Work and Pensions about every stay.
        </p>
      </GuideSection>

      <GuideSection id="decisions" n={12} kicker="Decisions" title="Decisions, reviews and challenges">
        <p>
          Awards are usually indefinite, though some are for a fixed period. If your needs increase, for example you now need help at night,
          ask for the higher rate. If you are refused, ask for a mandatory reconsideration within one month, then appeal to a tribunal if
          needed.
        </p>
      </GuideSection>

      <GuideSection id="myths" n={13} kicker="Clearing up" title="Common myths">
        <DataTable
          caption="What people often get wrong"
          head={["Myth", "The truth"]}
          rows={[
            ["My savings are too high", "Attendance Allowance is not means-tested"],
            ["I need a carer already", "It is about the help you need, not what you get"],
            ["It will reduce my State Pension", "It does not affect it"],
            ["I must spend it on care", "You can spend it on anything"],
            ["I cannot walk far, so I qualify", "There is no mobility part; it is about personal care"],
          ]}
        />
      </GuideSection>

      <GuideSection id="conditions" n={14} kicker="Examples" title="Conditions that often qualify">
        <p>
          Attendance Allowance is based on the help you need, not on a diagnosis, but it is often awarded to people living with:
        </p>
        <ul>
          <li>arthritis, osteoporosis or other conditions that make washing and dressing difficult;</li>
          <li>dementia, Alzheimer&rsquo;s disease or other memory problems that mean someone has to keep an eye on you;</li>
          <li>Parkinson&rsquo;s disease, multiple sclerosis or the effects of a stroke;</li>
          <li>heart or lung conditions such as heart failure or COPD that leave you breathless and tired;</li>
          <li>sight or hearing loss that makes it unsafe to cook, bathe or take medication alone;</li>
          <li>depression, anxiety or other mental health conditions where you need prompting to eat, wash or take medication;</li>
          <li>incontinence, or needing help to get to and use the toilet.</li>
        </ul>
        <p>
          Many people have several conditions that together mean they need help. Describe all of them, and how they combine, rather than
          focusing on one.
        </p>
      </GuideSection>

      <GuideSection id="refused" n={15} kicker="Avoid these" title="Why claims are refused">
        <ul>
          <li>
            <strong>Describing a good day.</strong> Many people play down their difficulties out of pride. Describe what usually happens.
          </li>
          <li>
            <strong>Leaving out what you cannot do safely.</strong> If you manage to bathe alone but have fallen, say so.
          </li>
          <li>
            <strong>Not mentioning the night.</strong> Getting up to use the toilet, needing help to turn over, or being confused at night can
            mean the higher rate.
          </li>
          <li>
            <strong>Not enough evidence.</strong> A short letter from your GP or a care plan can make a big difference.
          </li>
          <li>
            <strong>Claiming too early.</strong> Unless you are terminally ill, the help must have been needed for six months.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="council-tax" n={16} kicker="Your bill" title="Council Tax help">
        <p>
          Attendance Allowance can help with Council Tax in more than one way. If you have a severe mental impairment, such as advanced dementia,
          and get Attendance Allowance, you can be disregarded for Council Tax. If you live alone, the bill may then be cut to nothing, or by
          25% if one other adult lives with you.
        </p>
        <p>
          If your home has been adapted for a disability, for example with an extra bathroom or room for a wheelchair, you may also get the
          Disabled Band Reduction, which charges you as if your home were one band lower. Ask your council about both.
        </p>
      </GuideSection>

      <GuideSection id="dementia" n={17} kicker="Memory" title="Dementia and memory problems">
        <p>
          People with dementia often qualify because they need someone to keep an eye on them to stay safe, to prompt them to eat, wash and
          take medication, and to help at night if they are confused or wander. You do not need to have physical difficulties.
        </p>
        <p>
          If the person you care for cannot manage their own claim, you can fill in the form for them and sign it, or apply to become their
          appointee so you can deal with the Department for Work and Pensions on their behalf.
        </p>
      </GuideSection>

      <GuideSection id="abroad" n={18} kicker="Travel" title="Living or travelling abroad">
        <p>
          You can usually keep getting Attendance Allowance during a temporary absence abroad of up to 13 weeks, or 26 weeks if you are going
          for medical treatment. Tell the Department for Work and Pensions before you go. If you move abroad permanently, you may be able to
          keep it in some European countries, depending on your circumstances.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£76.70", label: "Lower rate a week" },
            { value: "£114.60", label: "Higher rate a week" },
            { value: "£86.05", label: "Pension Credit severe disability addition" },
            { value: "£86.45", label: "Carer's Allowance a week" },
            { value: "6 months", label: "Qualifying period" },
            { value: "12 months", label: "Life expectancy for special rules" },
            { value: "28 days", label: "Before it stops in hospital" },
            { value: "£0", label: "Effect of savings" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
