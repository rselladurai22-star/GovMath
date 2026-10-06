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

/** NHS prescription charges — the guide. Figures from src/lib/life/health.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "charges", title: "Prescription charges in England" },
  { id: "ppc", title: "Prescription prepayment certificates" },
  { id: "break-even", title: "When a PPC is worth it" },
  { id: "hrt", title: "The HRT prepayment certificate" },
  { id: "exempt", title: "Who gets free prescriptions" },
  { id: "medical", title: "Medical exemptions" },
  { id: "low-income", title: "Low income and the NHS Low Income Scheme" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "buying", title: "How to buy a PPC" },
  { id: "refunds", title: "Refunds and backdating" },
  { id: "penalties", title: "Penalty charges" },
  { id: "saving", title: "Other ways to save" },
  { id: "what-is-item", title: "What counts as an item" },
  { id: "repeat", title: "Repeat prescriptions" },
  { id: "pharmacy-first", title: "Pharmacy First and minor illness" },
  { id: "appliances", title: "Appliances, wigs and fabric supports" },
  { id: "travel", title: "Travel and moving between nations" },
  { id: "history-charges", title: "How charges have changed" },
  { id: "dental-optical", title: "Dental, eye tests and glasses" },
  { id: "long-term", title: "Long-term conditions without an exemption" },
  { id: "carers", title: "Collecting for someone else" },
  { id: "scenarios", title: "Scenarios" },
  { id: "students", title: "Students and young adults" },
  { id: "rural", title: "Dispensing doctors and online pharmacies" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Get a prescription prepayment certificate", href: "https://www.gov.uk/get-a-ppc" },
  { label: "NHSBSA — HRT prescription prepayment certificate", href: "https://www.nhsbsa.nhs.uk/help-nhs-prescription-costs/nhs-hormone-replacement-therapy-prescription-prepayment-certificate-hrt-ppc" },
  { label: "NHS — Who can get free prescriptions", href: "https://www.nhs.uk/nhs-services/prescriptions/check-if-you-can-get-free-prescriptions/" },
  { label: "NHSBSA — Medical exemption certificates", href: "https://www.nhsbsa.nhs.uk/exemption-certificates/medical-exemption-certificates" },
  { label: "NHSBSA — NHS Low Income Scheme", href: "https://www.nhsbsa.nhs.uk/nhs-low-income-scheme" },
];

export default function PrescriptionGuide() {
  return (
    <Guide
      kicker="The prescription costs guide"
      title="NHS prescription charges and how to pay less"
      intro={
        <>
          In England a prescription costs £9.90 an item, unless you are exempt. If you need medicines regularly, a prepayment certificate can
          cut the cost to a fixed £114.50 a year. This guide explains the charges, who gets free prescriptions, when a certificate pays off, and how
          to avoid penalty charges.
        </>
      }
      meta={["2026/27 charges", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Each item costs <strong>£9.90</strong> in England. Prescriptions are free in Scotland, Wales and Northern Ireland.
          </li>
          <li>
            A 12-month PPC costs <strong>£114.50</strong> and covers every item. It pays off from 12 items a year.
          </li>
          <li>A 3-month PPC costs £32.05 and pays off from 4 items in 3 months.</li>
          <li>About nine in ten prescription items in England are dispensed free, mainly because of age or medical exemptions.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£9.90", label: "Per item" },
            { value: "£32.05", label: "3-month PPC" },
            { value: "£114.50", label: "12-month PPC" },
            { value: "£19.80", label: "HRT PPC for 12 months" },
          ]}
        />
      </GuideSection>

      <GuideSection id="charges" n={2} kicker="The cost" title="Prescription charges in England">
        <p>
          The charge is per item, not per prescription form. A form listing three medicines costs £29.70. The charge has been held at £9.90 since
          April 2023.
        </p>
        <DataTable
          caption="What you pay a year at £9.90 an item"
          head={["Items a month", "Items a year", "Cost a year"]}
          numeric={[1, 2]}
          rows={[
            ["0.5", "6", "£59.40"],
            ["1", "12", "£118.80"],
            ["2", "24", "£237.60"],
            ["3", "36", "£356.40"],
            ["4", "48", "£475.20"],
            ["6", "72", "£712.80"],
          ]}
        />
      </GuideSection>

      <GuideSection id="ppc" n={3} kicker="Fixed price" title="Prescription prepayment certificates">
        <CompareCards
          columns={[
            {
              name: "3-month PPC",
              rows: [
                { label: "Price", value: "£32.05" },
                { label: "Covers", value: "All your items for 3 months" },
                { label: "Best for", value: "Short courses of treatment" },
              ],
            },
            {
              name: "12-month PPC",
              rows: [
                { label: "Price", value: "£114.50" },
                { label: "Or", value: "10 monthly payments of £11.45" },
                { label: "Best for", value: "Regular, ongoing medicines" },
              ],
            },
          ]}
        />
        <p>
          A PPC covers all NHS prescriptions, including new ones you did not expect, such as antibiotics. It does not cover other NHS charges like
          dental treatment or glasses.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={4} kicker="The maths" title="When a PPC is worth it">
        <p>
          A 3-month PPC is cheaper than paying from the 4th item in 3 months. A 12-month PPC is cheaper from the 12th item in a year, which is one
          item a month.
        </p>
        <Figure label="Saving with a 12-month PPC" caption="Compared with paying £9.90 an item.">
          <Bars
            items={[
              { label: "1 item a month", value: 4.3 },
              { label: "2 a month", value: 123.1 },
              { label: "3 a month", value: 241.9 },
              { label: "4 a month", value: 360.7 },
              { label: "6 a month", value: 598.3 },
            ]}
          />
        </Figure>
        <WorkedExample
          title="Two regular items a month"
          steps={[
            { label: "Paying per item: 24 × £9.90", value: "£237.60" },
            { label: "Four 3-month PPCs", value: "£128.20" },
            { label: "One 12-month PPC", value: "£114.50" },
          ]}
          total={{ label: "Saving with the 12-month PPC", value: "£123.10" }}
        />
      </GuideSection>

      <GuideSection id="hrt" n={5} kicker="Menopause" title="The HRT prepayment certificate">
        <p>
          The HRT PPC costs £19.80, the price of two items, and covers listed hormone replacement therapy medicines for 12 months, whatever they
          are prescribed for. It does not cover other medicines.
        </p>
        <DataTable
          caption="One HRT item a month, plus other items"
          head={["Other items a month", "Cheapest option", "Cost a year"]}
          numeric={[2]}
          rows={[
            ["None", "HRT PPC", "£19.80"],
            ["1", "12-month PPC", "£114.50"],
          ]}
        />
        <p>
          With one HRT item and one other item a month, the HRT PPC plus paying for the other items would cost £138.60, so the full 12-month PPC is
          cheaper.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={6} kicker="Free" title="Who gets free prescriptions">
        <ul>
          <li>People aged 60 or over, and under 16.</li>
          <li>16 to 18-year-olds in full-time education.</li>
          <li>Pregnant women and those who have had a baby in the last 12 months, with a maternity exemption certificate.</li>
          <li>People with certain medical conditions, with a medical exemption certificate.</li>
          <li>People with a continuing physical disability that stops them going out without help, with a certificate.</li>
          <li>People getting certain benefits, or with an NHS tax credit exemption or HC2 certificate.</li>
          <li>NHS inpatients, and war pensioners for their accepted disability.</li>
        </ul>
      </GuideSection>

      <GuideSection id="medical" n={7} kicker="Conditions" title="Medical exemptions">
        <p>A medical exemption certificate gives free prescriptions for everything, not just the condition. It covers, among others:</p>
        <ul>
          <li>diabetes needing medication other than diet alone, and an underactive thyroid needing thyroxine;</li>
          <li>epilepsy needing continuous treatment;</li>
          <li>cancer, its effects, or the effects of its treatment;</li>
          <li>a permanent fistula needing a dressing or appliance;</li>
          <li>Addison&rsquo;s disease, hypoparathyroidism, myasthenia gravis and some other conditions.</li>
        </ul>
        <p>Ask your GP for the FP92A form. The certificate usually lasts 5 years.</p>
      </GuideSection>

      <GuideSection id="low-income" n={8} kicker="Low income" title="Low income and the NHS Low Income Scheme">
        <p>
          If you get Income Support, income-based JSA, income-related ESA, Pension Credit Guarantee Credit, or Universal Credit with earnings below
          a set limit, you get free prescriptions. If not, the NHS Low Income Scheme can give full help (HC2) or partial help (HC3) depending on your
          income and savings.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={9} kicker="Across the UK" title="Scotland, Wales and Northern Ireland">
        <p>
          Prescriptions are free for everyone in Scotland, Wales and Northern Ireland when dispensed there. If you live in Wales but use a GP in
          England, you can get an entitlement card for free prescriptions from an English pharmacy.
        </p>
      </GuideSection>

      <GuideSection id="buying" n={10} kicker="How to" title="How to buy a PPC">
        <Timeline
          items={[
            { when: "Online", what: "Buy at GOV.UK", detail: "Choose the start date and pay by card or Direct Debit." },
            { when: "Pharmacy", what: "Some pharmacies sell PPCs", detail: "Ask at the counter." },
            { when: "Phone", what: "Call the NHS Business Services Authority", detail: "If you cannot buy online." },
            { when: "Renewal", what: "Set a reminder", detail: "A 12-month PPC does not renew itself unless you choose to." },
          ]}
        />
      </GuideSection>

      <GuideSection id="refunds" n={11} kicker="Paid too much?" title="Refunds and backdating">
        <p>
          If you pay for a prescription and then buy a PPC, the PPC can be backdated by up to a month, as long as you ask the pharmacist for an FP57
          refund receipt when you pay. You can then claim back what you paid. FP57 receipts are also used if you are waiting for an exemption
          certificate.
        </p>
        <Callout tone="good" title="Always ask for an FP57">
          You cannot get one later, so ask whenever you pay but think you may be entitled to free prescriptions.
        </Callout>
      </GuideSection>

      <GuideSection id="penalties" n={12} kicker="Fines" title="Penalty charges">
        <p>
          If you claim free prescriptions you are not entitled to, the NHS can charge you the cost plus a penalty of up to five times the charge,
          capped at £100. Exemptions are checked. If you have a valid certificate but forgot to show it, you can usually challenge the penalty.
        </p>
      </GuideSection>

      <GuideSection id="saving" n={13} kicker="Tips" title="Other ways to save">
        <ul>
          <li>Ask your GP whether repeat items can be combined or supplied for longer periods.</li>
          <li>Check whether a cheaper over-the-counter version is suitable for minor items.</li>
          <li>Use a pharmacy that offers repeat prescription reminders so you do not run out.</li>
          <li>If you need dental care or glasses too, check whether the Low Income Scheme can help with those.</li>
        </ul>
      </GuideSection>

      <GuideSection id="what-is-item" n={14} kicker="Counting" title="What counts as an item">
        <p>
          Each different medicine, appliance or dressing on a prescription is a separate item, even if they are on the same form. Two strengths of
          the same medicine are usually two items. A larger quantity of the same medicine, for example two packs of the same tablets, can be one item
          if it is prescribed as one quantity. Ask your pharmacist how your prescription will be charged.
        </p>
        <p>
          Some products count as more than one item. For example, elastic stockings are charged per stocking, so a pair costs two charges.
        </p>
      </GuideSection>

      <GuideSection id="repeat" n={15} kicker="Regular medicines" title="Repeat prescriptions">
        <p>
          If you take the same medicines every month, ask your GP whether longer prescriptions are suitable. Two months of supply on one prescription
          costs one charge per item instead of two. Not every medicine can be prescribed for longer, but it is worth asking at a medication review.
        </p>
        <p>
          Electronic repeat dispensing lets your GP set up a batch of prescriptions that the pharmacy releases at intervals, so you do not have to
          reorder each time. The charge is the same, but it is easier to plan a PPC.
        </p>
      </GuideSection>

      <GuideSection id="pharmacy-first" n={16} kicker="Minor illness" title="Pharmacy First and minor illness">
        <p>
          Under the Pharmacy First service in England, pharmacists can treat some common conditions, such as sinusitis, sore throat, earache, infected
          insect bites, impetigo, shingles and urinary tract infections in women, and supply prescription medicines where needed. If a medicine is
          supplied, the normal prescription charge applies unless you are exempt or have a PPC.
        </p>
        <p>For many minor illnesses, buying a pharmacy medicine is cheaper than a prescription charge, so ask the pharmacist which is better value.</p>
      </GuideSection>

      <GuideSection id="appliances" n={17} kicker="Other items" title="Appliances, wigs and fabric supports">
        <p>
          Some items on prescription have their own charges, such as wigs and fabric supports like surgical bras and spinal supports. These are not
          covered by a PPC. The same exemptions apply, so people who get free prescriptions usually also get these items free.
        </p>
      </GuideSection>

      <GuideSection id="travel" n={18} kicker="Moving around" title="Travel and moving between nations">
        <p>
          Prescription charges depend on where the prescription is issued and where it is dispensed. Welsh residents registered with an English GP
          can apply for an entitlement card for free prescriptions. If you move from Scotland, Wales or Northern Ireland to England and register
          with a GP here, you will start paying charges unless you are exempt.
        </p>
        <p>If you are going abroad, ask your GP for enough medicine to last. A PPC covers the items but not any private prescriptions abroad.</p>
      </GuideSection>

      <GuideSection id="history-charges" n={19} kicker="Background" title="How charges have changed">
        <p>
          Prescription charges in England were reintroduced in 1968 with wide exemptions. The charge usually rose each April until 2023, when it
          reached £9.90. It has been held at that level since, along with the prices of PPCs. Wales abolished charges in 2007, Northern Ireland in
          2010 and Scotland in 2011.
        </p>
      </GuideSection>

      <GuideSection id="dental-optical" n={20} kicker="Other NHS costs" title="Dental, eye tests and glasses">
        <p>
          A PPC does not cover NHS dental charges or the cost of glasses. Many people who get free prescriptions because of low income also get free
          dental treatment, eye tests and help with glasses. People aged 60 or over get free NHS eye tests but still pay NHS dental charges unless
          they qualify on income.
        </p>
      </GuideSection>

      <GuideSection id="long-term" n={21} kicker="Chronic illness" title="Long-term conditions without an exemption">
        <p>
          Many common long-term conditions, such as asthma, high blood pressure, arthritis and depression, do not give a medical exemption. People
          with these conditions often need several items each month and are the main beneficiaries of a 12-month PPC. If you take two or more
          regular medicines, a PPC will almost always save money.
        </p>
      </GuideSection>

      <GuideSection id="carers" n={22} kicker="Family" title="Collecting for someone else">
        <p>
          You can collect a prescription for someone else. If they are exempt, tick the right box on the back of the form on their behalf and be
          ready to show evidence if asked. If they have a PPC, give the certificate number. Pharmacies may ask for proof, so keep certificates
          somewhere easy to find.
        </p>
      </GuideSection>

      <GuideSection id="scenarios" n={23} kicker="Examples" title="Scenarios">
        <DataTable
          caption="The cheapest option in common situations"
          head={["Situation", "Best option"]}
          rows={[
            ["One antibiotic course a year", "Pay per item"],
            ["One regular medicine a month", "12-month PPC, just"],
            ["Three regular medicines a month", "12-month PPC"],
            ["A short course of several medicines over 2 months", "3-month PPC"],
            ["HRT only", "HRT PPC"],
            ["Aged 60 or pregnant", "Free"],
          ]}
        />
      </GuideSection>

      <GuideSection id="students" n={24} kicker="Age 16 to 25" title="Students and young adults">
        <p>
          Prescriptions are free up to your 19th birthday if you are in full-time education. From 19, students pay unless they qualify through the
          NHS Low Income Scheme, which takes student income such as loans into account. Many students on low incomes qualify for full or partial
          help, so it is worth applying with an HC1 form before buying a PPC.
        </p>
        <p>
          Young people leaving care, and those on Universal Credit with low earnings, can also get free prescriptions. Check before you pay, as
          refunds are only possible with an FP57 receipt.
        </p>
      </GuideSection>

      <GuideSection id="rural" n={25} kicker="Where you collect" title="Dispensing doctors and online pharmacies">
        <p>
          In some rural areas, GP practices dispense medicines themselves. The same charges and exemptions apply, and a PPC works in exactly the same
          way. NHS online pharmacies deliver prescriptions free of charge; you still pay the normal prescription charge unless you are exempt or have
          a PPC.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={26} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£9.90", label: "Per item" },
            { value: "£32.05", label: "3-month PPC" },
            { value: "£114.50", label: "12-month PPC" },
            { value: "£11.45", label: "Monthly, 10 payments" },
            { value: "£19.80", label: "HRT PPC" },
            { value: "12", label: "Items a year to break even" },
            { value: "60", label: "Age for free prescriptions" },
            { value: "£100", label: "Maximum penalty charge" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
