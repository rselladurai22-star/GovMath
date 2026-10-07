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

/** Right to Rent — the guide. Figures from src/lib/life/right-to-rent.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who must be checked" },
  { id: "who-checks", title: "Who does the check" },
  { id: "when", title: "When to check" },
  { id: "how", title: "Three ways to check" },
  { id: "evisas", title: "eVisas and share codes" },
  { id: "follow-up", title: "Follow-up checks" },
  { id: "penalties", title: "Penalties" },
  { id: "statutory-excuse", title: "The statutory excuse" },
  { id: "records", title: "Keeping records" },
  { id: "discrimination", title: "Avoiding discrimination" },
  { id: "exempt", title: "Lets that are exempt" },
  { id: "tenants", title: "For tenants" },
  { id: "nations", title: "Wales, Scotland and Northern Ireland" },
  { id: "documents", title: "Acceptable documents for British and Irish citizens" },
  { id: "euss", title: "EU citizens and settled or pre-settled status" },
  { id: "students", title: "Students and short lets" },
  { id: "lodgers", title: "Lodgers in your own home" },
  { id: "agents", title: "Working with letting agents" },
  { id: "failing", title: "If someone does not have the right to rent" },
  { id: "renters-rights", title: "Right to Rent and the Renters' Rights Act" },
  { id: "step-by-step", title: "A step-by-step check" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Check your tenant's right to rent", href: "https://www.gov.uk/check-tenant-right-to-rent-documents" },
  { label: "GOV.UK — Right to rent: landlord's code of practice", href: "https://www.gov.uk/government/publications/right-to-rent-landlords-code-of-practice" },
  { label: "GOV.UK — View a tenant's right to rent", href: "https://www.gov.uk/view-right-to-rent" },
  { label: "GOV.UK — Prove your right to rent in England", href: "https://www.gov.uk/prove-right-to-rent" },
  { label: "GOV.UK — Civil penalty fines for landlords", href: "https://www.gov.uk/government/news/tripling-of-fines-for-those-supporting-illegal-migrants" },
];

export default function RightToRentGuide() {
  return (
    <Guide
      kicker="The Right to Rent guide"
      title="Right to Rent checks in England"
      intro={
        <>
          Landlords in England must check that every adult who will live in their property has the right to rent before the tenancy starts.
          Getting it wrong can cost up to £10,000 per occupier for a first breach. This guide explains who to check, when, how, and how to protect
          yourself, with the rules that apply in 2026.
        </>
      }
      meta={["England", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Check every adult who will live in the property as their main home, within 28 days before the tenancy starts.</li>
          <li>British and Irish citizens: check original documents in person or through a certified identity service.</li>
          <li>Almost everyone else: use the Home Office online service with their share code.</li>
          <li>People with time-limited permission need a follow-up check.</li>
          <li>
            Penalties go up to <strong>£10,000 per occupier</strong> for a first breach and £20,000 for a repeat.
          </li>
        </ul>
        <KeyStats
          items={[
            { value: "28 days", label: "Most before the tenancy starts" },
            { value: "£10,000", label: "First breach, per occupier" },
            { value: "£20,000", label: "Repeat breach, per occupier" },
            { value: "1 year", label: "Keep records after the tenancy" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Scope" title="Who must be checked">
        <p>
          You must check every adult aged 18 or over who will live in the property as their only or main home, whether or not they are named on the
          tenancy agreement. That includes partners, adult children and lodgers. Children under 18 do not need checking, but you should check them
          when they turn 18 if they still live there.
        </p>
        <p>You must check everyone, including people you assume are British. Checking only some tenants can be discrimination.</p>
      </GuideSection>

      <GuideSection id="who-checks" n={3} kicker="Responsibility" title="Who does the check">
        <CompareCards
          columns={[
            {
              name: "Landlord",
              rows: [
                { label: "Responsible", value: "By default" },
                { label: "Includes", value: "Homeowners taking in lodgers" },
              ],
            },
            {
              name: "Letting agent",
              rows: [
                { label: "Responsible", value: "If agreed in writing" },
                { label: "Effect", value: "The agent is liable for penalties instead" },
              ],
            },
          ]}
        />
        <p>
          A tenant who sublets or takes in a lodger becomes a landlord for that person and must do the check. If an agent takes on the checks, keep
          the written agreement.
        </p>
      </GuideSection>

      <GuideSection id="when" n={4} kicker="Timing" title="When to check">
        <p>
          The check must be made no more than 28 days before the start of the tenancy. Checks made earlier do not count, and checks made after the
          tenant moves in leave you without protection for that period.
        </p>
        <WorkedExample
          title="A tenancy starting on 1 November 2026"
          steps={[
            { label: "Earliest date for the check", value: "4 October 2026" },
            { label: "Latest date for the check", value: "1 November 2026" },
          ]}
          total={{ label: "Window", value: "28 days" }}
        />
      </GuideSection>

      <GuideSection id="how" n={5} kicker="Methods" title="Three ways to check">
        <DataTable
          caption="Right to Rent check methods"
          head={["Method", "For", "How"]}
          rows={[
            ["Online check", "Most non-British and non-Irish citizens", "Use the share code at GOV.UK and check the photo matches"],
            ["Manual document check", "British and Irish citizens", "See original documents from the approved list, in person or by live video with the originals in hand"],
            ["Identity service (IDVT)", "British and Irish citizens with a valid passport", "Use a certified identity service provider, which may charge a fee"],
          ]}
        />
        <p>
          For a manual check, the tenant must be present, in person or by live video, and you must have the original documents in your possession.
          Check that photos match and dates are valid, then take copies of every relevant page and record the date.
        </p>
      </GuideSection>

      <GuideSection id="evisas" n={6} kicker="Digital status" title="eVisas and share codes">
        <p>
          Most people with permission to be in the UK now have an eVisa instead of a physical document. They generate a share code at GOV.UK, which
          you enter with their date of birth. The result shows their photo and whether their right to rent is unlimited or time-limited.
        </p>
        <Callout tone="warn" title="Save the result">
          Download or print the online check result and keep it with the date of the check. Without it, you cannot prove you did the check.
        </Callout>
        <p>
          If a person cannot show their right to rent, for example because they have an outstanding application, you can ask the Home Office Landlord
          Checking Service, which normally replies within 2 <a href="/life/days-between-dates">working days</a>.
        </p>
      </GuideSection>

      <GuideSection id="follow-up" n={7} kicker="Time-limited" title="Follow-up checks">
        <p>
          If the tenant&rsquo;s permission is time-limited, you must do a follow-up check just before the later of the end of their permission or 12
          months after your previous check.
        </p>
        <DataTable
          caption="Follow-up dates for a tenancy starting 1 November 2026"
          head={["Permission ends", "Follow-up check before"]}
          rows={[
            ["1 March 2027", "1 November 2027 (12 months)"],
            ["30 June 2028", "30 June 2028 (end of permission)"],
          ]}
        />
        <p>
          If the tenant no longer has the right to rent at the follow-up check, you must report it to the Home Office straight away. You do not have
          to evict them, but failing to report it removes your protection.
        </p>
      </GuideSection>

      <GuideSection id="penalties" n={8} kicker="Fines" title="Penalties">
        <DataTable
          caption="Civil penalties from 13 February 2024"
          head={["Breach", "Per lodger", "Per occupier"]}
          numeric={[1, 2]}
          rows={[
            ["First breach", "£5,000", "£10,000"],
            ["Repeat within 3 years", "£10,000", "£20,000"],
          ]}
        />
        <p>
          A landlord who lets to two adults without the right to rent could face a penalty of up to £20,000 for a first breach. Knowingly letting to
          someone without the right to rent is a criminal offence that can lead to up to 5 years in prison.
        </p>
      </GuideSection>

      <GuideSection id="statutory-excuse" n={9} kicker="Protection" title="The statutory excuse">
        <p>
          If you carry out the check correctly, keep the records and do any follow-up checks, you have a &ldquo;statutory excuse&rdquo;. That means
          you will not be fined even if the tenant later turns out not to have the right to rent, unless you knew. The excuse only covers the period
          after a correct check.
        </p>
      </GuideSection>

      <GuideSection id="records" n={10} kicker="Paperwork" title="Keeping records">
        <ul>
          <li>Keep copies of documents or the online check result for the length of the tenancy and one year after it ends.</li>
          <li>Record the date of every check.</li>
          <li>Store records securely, in line with data protection law, and destroy them once they are no longer needed.</li>
        </ul>
      </GuideSection>

      <GuideSection id="discrimination" n={11} kicker="Fair treatment" title="Avoiding discrimination">
        <p>
          The Equality Act 2010 applies to Right to Rent checks. Treat every applicant the same way, check everyone, and do not refuse someone just
          because their right to rent is time-limited or because they cannot show a particular document. Many people have a right to rent shown only
          online.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={12} kicker="Exceptions" title="Lets that are exempt">
        <p>Some accommodation is outside the scheme, including:</p>
        <ul>
          <li>social housing allocated by a council;</li>
          <li>care homes, hospitals and hospices;</li>
          <li>hostels and refuges for homeless people or those escaping abuse;</li>
          <li>student halls of residence, and accommodation provided by an employer in some cases;</li>
          <li>long leases of 7 years or more.</li>
        </ul>
        <p>Check the full list in the code of practice before relying on an exemption.</p>
      </GuideSection>

      <GuideSection id="tenants" n={13} kicker="Renters" title="For tenants">
        <p>
          If you are not British or Irish, get a share code from GOV.UK before you start looking for somewhere to live. British and Irish citizens
          should have a passport or other approved documents ready. If you have an outstanding application or appeal, tell the landlord, who can ask
          the Home Office to confirm your right to rent.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={14} kicker="Across the UK" title="Wales, Scotland and Northern Ireland">
        <p>Right to Rent checks only apply in England. Landlords in Wales, Scotland and Northern Ireland do not have to carry them out.</p>
      </GuideSection>

      <GuideSection id="timeline" n={15} kicker="Summary" title="A typical timeline">
        <Timeline
          items={[
            { when: "Up to 28 days before", what: "Do the check", detail: "Online or with documents, for every adult." },
            { when: "Tenancy start", what: "Check complete", detail: "Records saved with the date." },
            { when: "Before 12 months or permission ends", what: "Follow-up check", detail: "For time-limited permission only." },
            { when: "1 year after the tenancy ends", what: "Destroy records", detail: "Unless needed for another reason." },
          ]}
        />
      </GuideSection>

      <GuideSection id="documents" n={16} kicker="Manual checks" title="Acceptable documents for British and Irish citizens">
        <p>The Home Office publishes lists of acceptable documents. For British and Irish citizens, these include:</p>
        <ul>
          <li>a UK or Irish passport, current or expired;</li>
          <li>a UK birth or adoption certificate, together with evidence such as a letter from a government department or a bank;</li>
          <li>a certificate of naturalisation or registration as a British citizen, with supporting evidence.</li>
        </ul>
        <p>
          Some documents only count when combined with others, so check the current list before accepting them. Never accept photocopies, and
          check that documents look genuine and belong to the person in front of you.
        </p>
      </GuideSection>

      <GuideSection id="euss" n={17} kicker="EU citizens" title="EU citizens and settled or pre-settled status">
        <p>
          Most EU, EEA and Swiss citizens living in the UK have status under the EU Settlement Scheme, which is shown online. Settled status gives an
          unlimited right to rent, so no follow-up check is needed. Pre-settled status is time-limited in the online result, although many
          holders are now converted to settled status automatically. Follow what the online check shows on the day you make it.
        </p>
        <p>An EU passport or identity card on its own is no longer proof of the right to rent.</p>
      </GuideSection>

      <GuideSection id="students" n={18} kicker="Short stays" title="Students and short lets">
        <p>
          International students renting private accommodation must be checked like anyone else, usually through a share code, and need follow-up
          checks if their permission ends during the tenancy. Holiday lets of less than 3 months are generally outside the scheme, but a short let
          to someone living there as their main home is not.
        </p>
      </GuideSection>

      <GuideSection id="lodgers" n={19} kicker="Your own home" title="Lodgers in your own home">
        <p>
          If you take in a lodger, you are the landlord for Right to Rent purposes and must check them. The penalty for letting to a lodger without
          the right to rent is lower than for a tenancy: up to £5,000 for a first breach and £10,000 for a repeat. The check itself is the same.
        </p>
      </GuideSection>

      <GuideSection id="agents" n={20} kicker="Agents" title="Working with letting agents">
        <p>
          Many landlords use a letting agent for checks. Make sure your agreement says in writing that the agent will do the initial and follow-up
          checks. Ask for copies of the records, so you can show the checks were done if needed. If the agreement does not cover follow-up checks,
          you remain responsible for them.
        </p>
      </GuideSection>

      <GuideSection id="failing" n={21} kicker="Problems" title="If someone does not have the right to rent">
        <p>
          You must not let the property to someone who does not have the right to rent. If an existing tenant fails a follow-up check, report them to
          the Home Office straight away. The Home Office may then issue a notice that allows you to end the tenancy. Do not try to evict a tenant
          without following the proper legal process.
        </p>
      </GuideSection>

      <GuideSection id="renters-rights" n={22} kicker="New rules" title="Right to Rent and the Renters' Rights Act">
        <p>
          The Renters&rsquo; Rights Act changes how tenancies work in England, but Right to Rent checks still apply. Landlords also cannot refuse
          tenants simply because they receive benefits or have children. The immigration check remains a legal requirement and is not a reason to
          treat applicants differently in other ways.
        </p>
      </GuideSection>

      <GuideSection id="step-by-step" n={23} kicker="How to" title="A step-by-step check">
        <ol>
          <li>Ask every adult applicant how they will prove their right to rent: documents or a share code.</li>
          <li>For a share code, enter it with their date of birth at GOV.UK and check the photo matches the person.</li>
          <li>For documents, see the originals with the person present, in person or by live video.</li>
          <li>Save the online result or take clear copies, and write the date of the check on them.</li>
          <li>Diarise any follow-up check, and repeat the process before the date.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={24} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "28 days", label: "Check window" },
            { value: "18", label: "Age to be checked" },
            { value: "£5,000", label: "First breach, per lodger" },
            { value: "£10,000", label: "First breach, per occupier" },
            { value: "£20,000", label: "Repeat breach, per occupier" },
            { value: "12 months", label: "Latest follow-up interval" },
            { value: "2 days", label: "Landlord Checking Service reply" },
            { value: "5 years", label: "Maximum prison sentence" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
