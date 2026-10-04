import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, type Source, type TocItem } from "@/components/guide/Guide";

/** Driving licence at 70 — the guide. Dates from src/lib/vehicles/rules.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rules", title: "The renewal rules" },
  { id: "examples", title: "Example renewal dates" },
  { id: "how", title: "How to renew" },
  { id: "health", title: "Health and eyesight" },
  { id: "eye-tests", title: "Proposed compulsory eye tests" },
  { id: "categories", title: "What you can drive after 70" },
  { id: "insurance", title: "Insurance and older drivers" },
  { id: "stopping", title: "Deciding when to stop driving" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "renewing-tips", title: "Tips for a smooth renewal" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Renew your driving licence if you're 70 or over", href: "https://www.gov.uk/renew-driving-licence-at-70" },
  { label: "GOV.UK — Health conditions and driving", href: "https://www.gov.uk/health-conditions-and-driving" },
  { label: "GOV.UK — Driving eyesight rules", href: "https://www.gov.uk/driving-eyesight-rules" },
  { label: "Department for Transport — Road safety strategy (January 2026)", href: "https://www.gov.uk/government/publications/road-safety-strategy" },
];

export default function LicenceGuide() {
  return (
    <Guide
      kicker="The licence at 70 guide"
      title="Renewing your driving licence at 70 and over"
      intro={
        <>
          Your car driving licence runs out when you turn 70. To keep driving, you renew it, free of charge, and then again every three years.
          This guide explains the dates, how to renew, the health and eyesight rules, and the changes the government has proposed.
        </>
      }
      meta={["2026 rules", "7 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Your licence expires on your 70th birthday, then every three years: at 73, 76, 79 and so on.</li>
          <li>Renewing is free online or by post, and you can apply up to 90 days before.</li>
          <li>You must meet the eyesight standard and tell the DVLA about relevant medical conditions.</li>
          <li>There is no driving test or medical at 70; you declare that you are fit to drive.</li>
        </ul>
        <KeyStats
          items={[
            { value: "70", label: "First renewal" },
            { value: "3 years", label: "Then every" },
            { value: "Free", label: "Cost of renewal" },
            { value: "90 days", label: "Earliest you can apply" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rules" n={2} kicker="Rules" title="The renewal rules">
        <p>
          Car and motorbike licences in Great Britain are issued until your 70th birthday. At 70 you must renew to keep driving, and each
          renewal lasts three years. The DVLA sends a reminder, form D46P, about 90 days before, but you can renew without it.
        </p>
        <p>
          Separately, the photo on a photocard licence must be updated every 10 years. Under 70, that costs £14 online. From 70 a new photo is
          included in the free renewal when you need one.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={3} kicker="Dates" title="Example renewal dates">
        <DataTable
          head={["Date of birth", "Renew at 70", "Apply from", "Next renewal"]}
          rows={[
            ["10 March 1956", "10 March 2026", "10 December 2025", "10 March 2029"],
            ["15 June 1957", "15 June 2027", "17 March 2027", "15 June 2030"],
          ]}
        />
        <p>Someone born on 20 January 1950 is 76 and next renews on 20 January 2029, aged 79.</p>
      </GuideSection>

      <GuideSection id="how" n={4} kicker="How to" title="How to renew">
        <Timeline
          items={[
            { when: "Online", what: "GOV.UK, free", detail: "Usually the fastest. You need your address history for 3 years and your National Insurance number." },
            { when: "By post", what: "The D46P reminder or a D1 form", detail: "Free. Send a new passport-style photo if asked." },
            { when: "Afterwards", what: "New licence in about a week online", detail: "Postal applications take longer. You can usually keep driving while the DVLA deals with it." },
          ]}
        />
        <Callout tone="warn" title="Use GOV.UK only">Some websites charge to &ldquo;help&rdquo; you renew. Renewal at 70 is free on GOV.UK.</Callout>
      </GuideSection>

      <GuideSection id="health" n={5} kicker="Health" title="Health and eyesight">
        <p>
          When you renew, you declare that you meet the eyesight standard and list any medical conditions that could affect your driving.
          You must be able to read a car number plate from 20 metres, with glasses or contact lenses if you need them, and have adequate field
          of vision.
        </p>
        <p>
          Conditions you must report include certain heart conditions, diabetes treated with insulin, epilepsy, glaucoma, dementia and
          conditions that affect both eyes. The DVLA may ask your doctor for information or ask for an eyesight test before deciding.
        </p>
      </GuideSection>

      <GuideSection id="eye-tests" n={6} kicker="Changes" title="Proposed compulsory eye tests">
        <p>
          In January 2026 the government&rsquo;s road safety strategy proposed making eyesight tests compulsory for drivers aged 70 and over at
          each renewal, instead of relying on self-declaration. It consulted on how this would work. Until any change becomes law, the current
          self-declaration rules apply. A regular eye test is still a good idea: they are free on the NHS for people aged 60 and over.
        </p>
      </GuideSection>

      <GuideSection id="categories" n={7} kicker="Categories" title="What you can drive after 70">
        <CompareCards
          columns={[
            { name: "Kept automatically", rows: [{ label: "Cars", value: "Category B" }, { label: "Motorbikes", value: "If you already had them" }] },
            { name: "Need a medical", rows: [{ label: "Minibuses, larger vans", value: "Categories C1 and D1" }, { label: "How", value: "D4 medical report with the renewal" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="insurance" n={8} kicker="Insurance" title="Insurance and older drivers">
        <p>
          Insurers may ask about your age, health and licence status. Driving with an expired licence can invalidate your insurance, so renew in
          good time. Premiums often rise from the late 70s; shopping around and comparing specialist insurers can help.
        </p>
      </GuideSection>

      <GuideSection id="stopping" n={9} kicker="Decisions" title="Deciding when to stop driving">
        <p>
          There is no upper age limit for driving. Many people drive safely into their 80s and 90s. Signs it may be time to think again include
          near misses, getting lost on familiar routes, or difficulty judging gaps. A driving assessment from a mobility centre gives
          independent advice. If you stop, you can surrender your licence to the DVLA, and many areas offer free bus travel from State Pension
          age.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={10} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Missing the reminder.</strong> If you do not get a D46P, you still need to renew.</li>
          <li><strong>Paying a third-party site.</strong> Renewal is free on GOV.UK.</li>
          <li><strong>Not declaring a condition.</strong> This can lead to a fine and invalidate insurance.</li>
        </ul>
      </GuideSection>

      <GuideSection id="renewing-tips" n={11} kicker="Tips" title="Tips for a smooth renewal">
        <ul>
          <li>Apply as soon as the 90-day window opens, so there is time if the DVLA needs medical information.</li>
          <li>Have your National Insurance number and addresses for the last three years ready if renewing online.</li>
          <li>Get an eye test first if you have not had one recently, so you can declare your eyesight with confidence.</li>
          <li>Keep a note of your next renewal date: the calculator shows every date from 70 to 100.</li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={12} kicker="FAQs" title="Common questions">
        <h3>Do I have to take a test at 70?</h3>
        <p>No. There is no driving test or compulsory medical for a car licence at 70, only a declaration.</p>
        <h3>Can I keep driving while my renewal is processed?</h3>
        <p>Usually yes, if you have applied, meet the medical standards and your doctor has not told you not to drive.</p>
        <h3>Is it different in Northern Ireland?</h3>
        <p>The rules are similar: renewal at 70 and every three years, through the DVA rather than the DVLA.</p>
        <h3>What if I have moved house?</h3>
        <p>Update your address when you renew. You must also tell the DVLA whenever you move, or you could be fined up to £1,000.</p>
        <h3>Do I need a new photo?</h3>
        <p>Only if your photo is more than 10 years old or no longer looks like you. Online, the DVLA can often use your passport photo.</p>
        <h3>Can someone renew for me?</h3>
        <p>A family member or friend can help you fill in the form, but you must sign the declaration yourself, as it is about your own fitness to drive.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "70", label: "First renewal" },
            { value: "Every 3 years", label: "After 70" },
            { value: "£0", label: "Cost at 70 and over" },
            { value: "20 metres", label: "Number plate eyesight test" },
            { value: "£1,000", label: "Maximum fine for driving unlicensed" },
            { value: "£14", label: "Photocard renewal under 70" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
