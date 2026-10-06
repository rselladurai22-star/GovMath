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

/** PIP points — the guide. Figures from src/lib/benefits/pip-assessment.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rates", title: "How much PIP is" },
  { id: "who", title: "Who can get PIP" },
  { id: "points", title: "How the points system works" },
  { id: "daily", title: "The daily living activities" },
  { id: "mobility", title: "The mobility activities" },
  { id: "reliably", title: "The reliability test" },
  { id: "examples", title: "Worked examples" },
  { id: "process", title: "How a claim works" },
  { id: "evidence", title: "Evidence that helps" },
  { id: "challenge", title: "If you disagree with the decision" },
  { id: "unlocks", title: "What a PIP award unlocks" },
  { id: "other", title: "PIP and other benefits" },
  { id: "aids", title: "Aids and appliances" },
  { id: "fluctuating", title: "Conditions that come and go" },
  { id: "mental-health", title: "Mental health and PIP" },
  { id: "reviews", title: "Award reviews" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Personal Independence Payment", href: "https://www.gov.uk/pip" },
  { label: "GOV.UK — PIP assessment guide", href: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers" },
  { label: "Legislation.gov.uk — The Social Security (Personal Independence Payment) Regulations 2013", href: "https://www.legislation.gov.uk/uksi/2013/377/schedule/1" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Challenge a benefit decision", href: "https://www.gov.uk/mandatory-reconsideration" },
];

export default function PipGuide() {
  return (
    <Guide
      kicker="The PIP points guide"
      title="PIP points and rates in 2026/27"
      intro={
        <>
          Personal Independence Payment helps with the extra costs of a long-term health condition or disability. It is not means-tested and
          you can get it in or out of work. Whether you get it, and how much, depends on points scored in 12 everyday activities. This guide
          explains every activity, the points, the rates and how to make a strong claim.
        </>
      }
      meta={["2026/27 rates", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>PIP has two parts: daily living and mobility. Each is scored separately.</li>
          <li>
            <strong>8 to 11 points</strong> in a part gives the standard rate. <strong>12 or more</strong> gives the enhanced rate.
          </li>
          <li>
            The most you can get is <strong>£194.60 a week</strong>, or £10,119.20 a year.
          </li>
          <li>It is based on how your condition affects you, not on the condition itself.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£114.60", label: "Enhanced daily living, a week" },
            { value: "£76.70", label: "Standard daily living, a week" },
            { value: "£80.00", label: "Enhanced mobility, a week" },
            { value: "£30.30", label: "Standard mobility, a week" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="How much PIP is">
        <p>PIP is paid every four weeks. The 2026/27 rates apply from April 2026.</p>
        <DataTable
          caption="PIP combinations, 2026/27"
          head={["Award", "A week", "Every 4 weeks", "A year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Standard daily living only", "£76.70", "£306.80", "£3,988.40"],
            ["Enhanced daily living only", "£114.60", "£458.40", "£5,959.20"],
            ["Standard mobility only", "£30.30", "£121.20", "£1,575.60"],
            ["Enhanced mobility only", "£80.00", "£320.00", "£4,160.00"],
            ["Standard daily living and standard mobility", "£107.00", "£428.00", "£5,564.00"],
            ["Enhanced daily living and enhanced mobility", "£194.60", "£778.40", "£10,119.20"],
          ]}
        />
        <Figure label="PIP a year by award" caption="The two components can be combined in any mix.">
          <Bars
            items={[
              { label: "Std mobility", value: 1575.6 },
              { label: "Std daily living", value: 3988.4 },
              { label: "Enh mobility", value: 4160 },
              { label: "Enh daily living", value: 5959.2 },
              { label: "Both enhanced", value: 10119.2 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Eligibility" title="Who can get PIP">
        <ul>
          <li>You are aged 16 or over and under State Pension age when you claim.</li>
          <li>You have had difficulties for at least 3 months and expect them to last at least 9 more months.</li>
          <li>You normally live in England, Wales or Northern Ireland. In Scotland, Adult Disability Payment has replaced PIP.</li>
        </ul>
        <p>
          Your income, savings and whether you work make no difference. If you are terminally ill, with a life expectancy of 12 months or less,
          you can claim under special rules: you get the enhanced daily living rate straight away and the claim is fast-tracked. Children
          under 16 get Disability Living Allowance instead, and people over State Pension age claim{" "}
          <a href="/benefits/attendance-allowance">Attendance Allowance</a>.
        </p>
      </GuideSection>

      <GuideSection id="points" n={4} kicker="Scoring" title="How the points system works">
        <p>
          There are 10 daily living activities and 2 mobility activities. Each has a list of descriptors, from &ldquo;can do this
          unaided&rdquo; (0 points) up to the most severe difficulty. You score the descriptor that applies to you on more than half of days
          over a year. If two descriptors apply, you get the higher one.
        </p>
        <p>
          Points from each daily living activity are added together, and points from the two mobility activities are added together. They
          never mix: 6 points in each part is not 12.
        </p>
        <CompareCards
          columns={[
            {
              name: "Daily living",
              rows: [
                { label: "Activities", value: "10" },
                { label: "Standard rate", value: "8 to 11 points" },
                { label: "Enhanced rate", value: "12 points or more" },
              ],
            },
            {
              name: "Mobility",
              rows: [
                { label: "Activities", value: "2" },
                { label: "Standard rate", value: "8 to 11 points" },
                { label: "Enhanced rate", value: "12 points or more" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="daily" n={5} kicker="Daily living" title="The daily living activities">
        <DataTable
          caption="Highest points available in each daily living activity"
          head={["Activity", "Top score", "Examples of what scores"]}
          numeric={[1]}
          rows={[
            ["Preparing food", "8", "Using a perching stool, needing prompting, or only using a microwave"],
            ["Taking nutrition", "10", "Needing food cut up, prompting to eat, or a feeding tube"],
            ["Managing treatments", "8", "Help with medication, or hours of therapy a week"],
            ["Washing and bathing", "8", "A bath board or seat, help getting in or out, help washing"],
            ["Managing toilet needs", "8", "Grab rails, a raised seat, or help with incontinence"],
            ["Dressing and undressing", "8", "Help with buttons, socks or shoes, or choosing clothes"],
            ["Communicating verbally", "12", "A hearing aid, or support to understand information"],
            ["Reading", "8", "Aids other than glasses, or prompting to understand"],
            ["Mixing with other people", "8", "Prompting or support because of anxiety or distress"],
            ["Budgeting", "6", "Help with bills or with simple money decisions"],
          ]}
        />
        <p>
          The activities cover mental health conditions, learning disabilities and sensory impairments as well as physical conditions.
          Prompting means someone reminding, encouraging or explaining. Supervision means someone being there to keep you safe.
        </p>
      </GuideSection>

      <GuideSection id="mobility" n={6} kicker="Mobility" title="The mobility activities">
        <p>
          <strong>Planning and following journeys</strong> is about your ability to work out and follow a route, and whether anxiety or
          distress stops you going out. It scores up to 12 points if you cannot follow even a familiar route without another person, an
          assistance dog or an orientation aid.
        </p>
        <p>
          <strong>Moving around</strong> is about physically standing and moving, with any aid you would normally use, such as a stick. The key
          distances are 200 metres, 50 metres and 20 metres.
        </p>
        <DataTable
          caption="Moving around descriptors"
          head={["How far you can reliably stand and move", "Points"]}
          numeric={[1]}
          rows={[
            ["More than 200 metres", "0"],
            ["More than 50 metres, up to 200", "4"],
            ["More than 20 metres, up to 50, unaided", "8"],
            ["More than 20 metres, up to 50, using an aid", "10"],
            ["More than 1 metre, up to 20", "12"],
            ["1 metre or less", "12"],
          ]}
        />
      </GuideSection>

      <GuideSection id="reliably" n={7} kicker="The key test" title="The reliability test">
        <p>You can only be treated as able to do an activity if you can do it:</p>
        <ul>
          <li>
            <strong>safely</strong>, without risk of harm to you or anyone else;
          </li>
          <li>
            <strong>to an acceptable standard</strong>;
          </li>
          <li>
            <strong>repeatedly</strong>, as often as reasonably needed;
          </li>
          <li>
            <strong>in a reasonable time</strong>, no more than twice as long as someone without your condition.
          </li>
        </ul>
        <Callout tone="good" title="Describe a bad day and a typical day">
          If you can walk 100 metres once but then need to rest for an hour, you cannot reliably walk 100 metres. Explain pain, fatigue,
          breathlessness and what happens afterwards, not just what you can manage once.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={8} kicker="Real examples" title="Worked examples">
        <WorkedExample
          title="Arthritis in the hands and knees"
          steps={[
            { label: "Preparing food: needs help to prepare a meal", value: "4" },
            { label: "Washing: needs help to wash below the waist", value: "2" },
            { label: "Dressing: needs help with the lower body", value: "2" },
            { label: "Medication: needs help opening packs", value: "1" },
            { label: "Daily living total", note: "Standard rate", value: "9 points" },
            { label: "Moving around: 50 to 200 metres", value: "4" },
            { label: "Planning journeys: needs prompting", value: "4" },
            { label: "Mobility total", note: "Standard rate", value: "8 points" },
          ]}
          total={{ label: "PIP a week", value: "£107.00" }}
        />
        <WorkedExample
          title="Severe anxiety and depression"
          steps={[
            { label: "Mixing with people: needs social support", value: "4" },
            { label: "Budgeting: needs help with complex decisions", value: "2" },
            { label: "Preparing food: needs prompting", value: "2" },
            { label: "Medication: needs prompting", value: "1" },
            { label: "Daily living total", note: "Standard rate", value: "9 points" },
            { label: "Journeys: cannot go out because of overwhelming distress", note: "Standard rate", value: "10 points" },
          ]}
          total={{ label: "PIP a week", value: "£107.00" }}
        />
        <p>
          In both examples, three more daily living points would mean the enhanced rate of £114.60 instead of £76.70, an extra £1,970.80 a
          year.
        </p>
      </GuideSection>

      <GuideSection id="process" n={9} kicker="Claiming" title="How a claim works">
        <Timeline
          items={[
            { when: "Step 1", what: "Start the claim", detail: "By phone or online. This date is when payment can start from." },
            { when: "Step 2", what: "Fill in 'How your disability affects you'", detail: "Usually within one month. This form matters most." },
            { when: "Step 3", what: "Assessment", detail: "By phone, video or in person with a health professional." },
            { when: "Step 4", what: "Decision letter", detail: "Shows the points for each activity and how long the award lasts." },
          ]}
        />
        <p>
          Claims typically take several months. Payments are backdated to the date you started the claim, so start it as soon as you can.
        </p>
      </GuideSection>

      <GuideSection id="evidence" n={10} kicker="Strong claims" title="Evidence that helps">
        <ul>
          <li>Letters from your GP, consultant, nurse, occupational therapist or mental health worker describing how the condition affects you.</li>
          <li>Care plans, prescriptions lists and hospital letters.</li>
          <li>A diary of a week or two, showing what you could and could not do, and how long things took.</li>
          <li>A statement from someone who helps you, such as a family member or support worker.</li>
        </ul>
        <p>
          On the form, go through each activity and explain which descriptor applies and why, with examples. Do not assume the assessor knows
          what your diagnosis means for you day to day.
        </p>
      </GuideSection>

      <GuideSection id="challenge" n={11} kicker="Disputes" title="If you disagree with the decision">
        <p>
          You can ask for a <strong>mandatory reconsideration</strong> within one month of the decision letter. Explain which descriptors you
          think should apply and send any new evidence. If the decision does not change, you can appeal to an independent tribunal.
        </p>
        <p>
          Appeals succeed in a large share of PIP cases that reach a tribunal, often because the panel hears directly from the claimant. Note
          that the tribunal looks at the whole award, so it can lower as well as raise it.
        </p>
      </GuideSection>

      <GuideSection id="unlocks" n={12} kicker="Passports" title="What a PIP award unlocks">
        <DataTable
          caption="Extra help linked to PIP"
          head={["Help", "Who qualifies"]}
          rows={[
            ["Carer's Allowance for your carer", "Any daily living award"],
            ["Exemption from the benefit cap", "Any PIP award"],
            ["Motability Scheme", "Enhanced mobility"],
            ["Free vehicle tax", "Enhanced mobility"],
            ["50% off vehicle tax", "Standard mobility"],
            ["Blue Badge (automatic)", "8 or more points in moving around, or some journey-planning scores"],
            ["Disabled Persons Railcard", "Any PIP award"],
          ]}
        />
        <p>
          PIP can also add extra amounts to other benefits, such as the severe disability addition in Pension Credit, and some councils
          give Council Tax discounts or free bus passes.
        </p>
      </GuideSection>

      <GuideSection id="other" n={13} kicker="Interactions" title="PIP and other benefits">
        <p>
          PIP is ignored as income for Universal Credit, Housing Benefit and Pension Credit, so it never reduces them. It is tax-free. It does
          not affect the Universal Credit health element, which depends on a separate Work Capability Assessment.
        </p>
        <p>
          When you reach State Pension age you keep PIP, and the award is usually reviewed less often. You cannot claim PIP for the first time
          after State Pension age, but you can claim Attendance Allowance instead.
        </p>
      </GuideSection>

      <GuideSection id="aids" n={14} kicker="Scoring" title="Aids and appliances">
        <p>
          Many descriptors score points simply because you need an aid or appliance, such as a perching stool to cook, a shower seat, grab rails,
          a raised toilet seat, adapted cutlery or a dressing aid. What counts is whether you <em>need</em> it, not whether you have it.
        </p>
        <p>
          If an occupational therapist has assessed you or you have been given equipment, say so on the form. If you would struggle without an
          aid you do not yet have, explain why you need it.
        </p>
      </GuideSection>

      <GuideSection id="fluctuating" n={15} kicker="Good and bad days" title="Conditions that come and go">
        <p>
          The 50% rule decides which descriptor applies when your condition varies. A descriptor applies if it is true on more than half of the
          days in a 12-month period. If a higher descriptor applies on 40% of days and a lower one on 30%, so that together they apply on more
          than half, you score the one that applies most often: here, the higher one.
        </p>
        <p>
          Keep a diary for a few weeks, noting good and bad days. It turns &ldquo;it varies&rdquo; into evidence the decision maker can use.
        </p>
      </GuideSection>

      <GuideSection id="mental-health" n={16} kicker="Hidden conditions" title="Mental health and PIP">
        <p>
          More than a third of people getting PIP have a mental health condition as their main condition. The activities that matter most are mixing with other people, making
          budgeting decisions, planning and following journeys, and needing prompting to prepare food, eat, wash, dress or take medication.
        </p>
        <p>
          Prompting counts even if you could physically do the task. If you would not wash or eat for days without someone encouraging you,
          that scores points. A letter from a community mental health team, psychiatrist or support worker is particularly useful.
        </p>
      </GuideSection>

      <GuideSection id="reviews" n={17} kicker="After the award" title="Award reviews">
        <p>
          Before your award ends you will be sent a review form. Fill it in as carefully as the first claim, even if nothing has changed, and
          send new evidence. People over State Pension age, and those with conditions that will not improve, often get long awards with only a
          light-touch review.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "8", label: "Points for the standard rate" },
            { value: "12", label: "Points for the enhanced rate" },
            { value: "£194.60", label: "Most PIP a week" },
            { value: "£10,119.20", label: "Most PIP a year" },
            { value: "12", label: "Activities assessed" },
            { value: "3 + 9", label: "Months before and after" },
            { value: "1 month", label: "To ask for a reconsideration" },
            { value: "16", label: "Minimum age to claim" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
