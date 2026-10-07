import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Clean air zones — the guide. Figures from src/lib/vehicles/tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What clean air zones are" },
  { id: "standards", title: "Which vehicles are compliant" },
  { id: "zones", title: "Zones and charges in 2026" },
  { id: "london", title: "London: ULEZ and the congestion charge" },
  { id: "classes", title: "Why some zones do not charge cars" },
  { id: "scotland", title: "Scotland's low emission zones" },
  { id: "costs", title: "What it adds up to" },
  { id: "paying", title: "Paying and penalties" },
  { id: "exemptions", title: "Exemptions and discounts" },
  { id: "options", title: "If your vehicle is not compliant" },
  { id: "checking", title: "Checking a vehicle before you buy" },
  { id: "why", title: "Why zones exist" },
  { id: "vans", title: "Van drivers and small businesses" },
  { id: "visitors", title: "Hire cars, visitors and foreign vehicles" },
  { id: "trips", title: "Planning a trip into a zone" },
  { id: "future", title: "What may change" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "health", title: "Pollution and health" },
  { id: "switching", title: "Switching to a compliant vehicle" },
  { id: "checklist", title: "A quick checklist" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Driving in a clean air zone", href: "https://www.gov.uk/clean-air-zones" },
  { label: "Transport for London — ULEZ", href: "https://tfl.gov.uk/modes/driving/ultra-low-emission-zone" },
  { label: "Transport for London — Congestion Charge", href: "https://tfl.gov.uk/modes/driving/congestion-charge" },
  { label: "Low Emission Zones Scotland", href: "https://www.lowemissionzones.scot/" },
];

export default function CazGuide() {
  return (
    <Guide
      kicker="The clean air zone guide"
      title="Clean air zone and ULEZ charges in 2026"
      intro={
        <>
          Several UK cities charge older, more polluting vehicles to drive in. The charges, the vehicles affected and the rules differ from
          city to city. This guide explains which vehicles are compliant, what each zone charges in 2026, how London&rsquo;s ULEZ and
          congestion charge combine, and what Scotland&rsquo;s low emission zones mean for drivers.
        </>
      }
      meta={["2026 charges", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Petrol cars usually comply if registered from 2006; diesel cars if registered from September 2015.</li>
          <li>London&rsquo;s ULEZ charges non-compliant cars £12.50 a day. Birmingham charges £8 and Bristol £9.</li>
          <li>Bath, Bradford, Sheffield, Newcastle and Gateshead charge vans and taxis but not private cars. Portsmouth charges neither.</li>
          <li>Scotland&rsquo;s zones ban non-compliant vehicles, with penalties from £60.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£12.50", label: "London ULEZ a day" },
            { value: "£18", label: "London congestion charge" },
            { value: "£8 / £9", label: "Birmingham / Bristol cars" },
            { value: "£60", label: "First Scottish LEZ penalty" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What clean air zones are">
        <p>
          Clean air zones are areas where councils charge or restrict the most polluting vehicles to cut nitrogen dioxide levels. Cameras read
          number plates, and the system checks each vehicle against its emissions standard. Compliant vehicles drive in for free, and you do
          not need to register.
        </p>
        <p>
          The charge is per day, not per journey. Driving in and out several times on the same day costs the same as one trip.
        </p>
      </GuideSection>

      <GuideSection id="standards" n={3} kicker="Standards" title="Which vehicles are compliant">
        <DataTable
          head={["Vehicle", "Standard", "Usually registered from"]}
          rows={[
            ["Petrol car or van", "Euro 4", "2006 (some from 2001)"],
            ["Diesel car or van", "Euro 6", "September 2015"],
            ["Motorbike (London)", "Euro 3", "July 2007"],
            ["Electric", "Zero emission", "Always compliant"],
          ]}
        />
        <p>
          The year is a guide only. Some older cars meet the standard and some newer ones do not. The official checkers use the exact Euro
          rating for your registration.
        </p>
      </GuideSection>

      <GuideSection id="zones" n={4} kicker="Charges" title="Zones and charges in 2026">
        <DataTable
          caption="Daily charges for non-compliant vehicles"
          head={["Zone", "Car", "Van", "Lorry, bus or coach"]}
          rows={[
            ["London ULEZ", "£12.50", "£12.50", "£100 (LEZ)"],
            ["Birmingham", "£8", "£8", "£50"],
            ["Bristol", "£9", "£9", "£100"],
            ["Bath", "Not charged", "£9", "£100"],
            ["Bradford", "Not charged", "£9", "£50"],
            ["Sheffield", "Not charged", "£10", "£50"],
            ["Newcastle and Gateshead", "Not charged", "£12.50", "£50"],
            ["Portsmouth", "Not charged", "Not charged", "£50"],
          ]}
        />
      </GuideSection>

      <GuideSection id="london" n={5} kicker="London" title="London: ULEZ and the congestion charge">
        <p>
          The ULEZ covers all London boroughs and runs every day except Christmas Day. Separately, the congestion charge covers central London
          from 7am to 6pm on weekdays and noon to 6pm at weekends and on <a href="/uk/life/bank-holidays">bank holidays</a>. It rose to £18 a day on 2 January 2026.
        </p>
        <WorkedExample
          title="Non-compliant car driving into central London 5 days a week, 46 weeks"
          steps={[
            { label: "ULEZ: £12.50 × 230 days", value: "£2,875" },
            { label: "Congestion charge: £18 × 230 days", value: "£4,140" },
          ]}
          total={{ label: "A year", value: "£7,015" }}
        />
        <p>
          Electric cars no longer drive free in the congestion zone. Since January 2026 they pay it too, with a 25% discount for drivers using
          Auto Pay: £13.50 a day, or £3,105 a year at the same rate of driving. Electric cars remain exempt from the ULEZ.
        </p>
      </GuideSection>

      <GuideSection id="classes" n={6} kicker="Classes" title="Why some zones do not charge cars">
        <CompareCards
          columns={[
            { name: "Class B", rows: [{ label: "Charges", value: "Buses, coaches, taxis, private hire, lorries" }, { label: "Example", value: "Portsmouth" }] },
            { name: "Class C", rows: [{ label: "Charges", value: "Class B plus vans and minibuses" }, { label: "Example", value: "Bath, Bradford, Sheffield, Tyneside" }] },
            { name: "Class D", rows: [{ label: "Charges", value: "Class C plus private cars" }, { label: "Example", value: "Birmingham, Bristol" }] },
          ]}
        />
        <p>Councils chose the class needed to bring pollution within legal limits. A Class C zone charges vans but not private cars.</p>
      </GuideSection>

      <GuideSection id="scotland" n={7} kicker="Scotland" title="Scotland's low emission zones">
        <p>
          Glasgow, Edinburgh, Aberdeen and Dundee have low emission zones. Unlike English zones, there is no daily charge: non-compliant
          vehicles are not allowed in. Each entry gets a penalty of £60, halved if paid within 14 days. Repeat entries within 90 days double the
          penalty each time, up to £480 for cars and vans.
        </p>
        <Figure label="Penalties for repeat entries" caption="Each within 90 days of the last.">
          <Bars
            items={[
              { label: "1st", value: 60 },
              { label: "2nd", value: 120 },
              { label: "3rd", value: 240 },
              { label: "4th", value: 480 },
              { label: "5th", value: 480 },
            ]}
            format={(n) => `£${n}`}
          />
        </Figure>
        <p>Ten entries in quick succession would cost £3,780, or £1,890 with every penalty paid early.</p>
      </GuideSection>

      <GuideSection id="costs" n={8} kicker="Totals" title="What it adds up to">
        <Figure label="Yearly cost for a non-compliant car or van, 5 days a week" caption="46 weeks a year.">
          <Bars
            items={[
              { label: "Birmingham car", value: 1840 },
              { label: "Bristol car", value: 2070 },
              { label: "Sheffield van", value: 2300 },
              { label: "London ULEZ car", value: 2875 },
              { label: "Tyneside van", value: 2875 },
            ]}
          />
        </Figure>
        <p>
          For a regular commuter, the charges quickly add up to more than the value of an older car. Even one day a week in the ULEZ costs
          £575 a year.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={9} kicker="Paying" title="Paying and penalties">
        <ul>
          <li><strong>English clean air zones:</strong> pay online up to 6 days before, on the day, or by midnight 6 days after.</li>
          <li><strong>London ULEZ:</strong> pay by midnight on the third day after you drive in, or set up Auto Pay.</li>
          <li><strong>Penalties:</strong> £120 in English zones (£60 if paid within 14 days) and £180 in London (£90 if paid within 14 days), on top of the charge.</li>
        </ul>
        <Callout tone="warn" title="Use official sites only">
          Unofficial websites charge extra fees. Pay through GOV.UK for English zones and TfL for London.
        </Callout>
      </GuideSection>

      <GuideSection id="exemptions" n={10} kicker="Exemptions" title="Exemptions and discounts">
        <ul>
          <li>Vehicles in the disabled tax class, and some wheelchair-accessible vehicles, are exempt in most zones.</li>
          <li>Historic vehicles over 40 years old are exempt from the ULEZ.</li>
          <li>Some councils give temporary exemptions to local residents, workers on low incomes or people attending hospital.</li>
          <li>London residents in the congestion zone can get a 90% discount on the congestion charge.</li>
        </ul>
      </GuideSection>

      <GuideSection id="options" n={11} kicker="Choices" title="If your vehicle is not compliant">
        <ul>
          <li>Plan routes around the zone. Signs show the boundary, and sat navs and apps can avoid it.</li>
          <li>Park and ride, or public transport for the final part of the journey.</li>
          <li>Replace the vehicle. Check scrappage grants: London and some cities have run schemes for people on certain benefits and small businesses.</li>
          <li>Check whether a retrofit is approved for your vehicle, mainly for vans and buses.</li>
        </ul>
      </GuideSection>

      <GuideSection id="checking" n={12} kicker="Buying" title="Checking a vehicle before you buy">
        <p>
          A cheap older diesel can cost more to drive into a city than it saved at purchase. Check the registration on the official checker
          before buying, especially if you live or work near a zone. The <a href="/uk/vehicles/commuter-comparison">commuter comparison</a>{" "}
          includes zone charges when comparing car and public transport costs.
        </p>
      </GuideSection>

      <GuideSection id="why" n={13} kicker="Background" title="Why zones exist">
        <p>
          Road traffic is the biggest source of nitrogen dioxide in most UK cities, and older diesel engines produce far more of it than
          petrol or newer diesel engines. The government required councils with the worst pollution to bring levels within legal limits as
          quickly as possible. Some chose charging zones, others chose traffic changes or funding for cleaner buses and taxis.
        </p>
        <p>
          Zones that charge are meant to encourage people to switch to cleaner vehicles rather than to raise money. As more vehicles comply,
          the number of drivers paying falls, and some councils review whether their zone is still needed.
        </p>
      </GuideSection>

      <GuideSection id="vans" n={14} kicker="Business" title="Van drivers and small businesses">
        <p>
          Vans are charged in almost every English zone, and older diesel vans are the vehicles most likely to fail the standard. A trader
          with a 2014 diesel van working inside the Sheffield zone five days a week for 46 weeks would pay £2,300 a year. In Newcastle and
          Gateshead it would be £2,875.
        </p>
        <p>
          Charges paid for business journeys are an allowable business expense for the self-employed and companies. Some councils have
          offered grants or interest-free loans towards replacing older vans, so check with the council before buying.
        </p>
      </GuideSection>

      <GuideSection id="visitors" n={15} kicker="Visitors" title="Hire cars, visitors and foreign vehicles">
        <ul>
          <li><strong>Hire cars:</strong> most are new enough to comply, but check the agreement on who pays any charge or penalty.</li>
          <li><strong>Foreign-registered vehicles:</strong> must be registered with TfL before driving in London, even if compliant, or they can be treated as non-compliant.</li>
          <li><strong>Courtesy cars and borrowed vehicles:</strong> the registered keeper receives any penalty, so agree who pays in advance.</li>
        </ul>
      </GuideSection>

      <GuideSection id="trips" n={16} kicker="Planning" title="Planning a trip into a zone">
        <ol>
          <li>Check your vehicle on the official checker for the city you are visiting.</li>
          <li>If it is not compliant, decide whether to pay, park outside, or use park and ride.</li>
          <li>Pay through the official service on the day, or within the deadline afterwards.</li>
          <li>In London, think about Auto Pay if you drive in often, so you never miss a payment.</li>
        </ol>
        <p>
          Hospital visits, appointments and short trips into a zone are easy to forget. A reminder on your phone for the payment deadline can
          save a £120 or £180 penalty.
        </p>
      </GuideSection>

      <GuideSection id="future" n={17} kicker="Changes" title="What may change">
        <p>
          Charges and rules are set locally and can change. London&rsquo;s congestion charge is due to rise in line with public transport fares,
          and the discount for electric cars on Auto Pay is due to fall in steps to 12.5% by 2030. Some English councils review their zones
          regularly, and could change which vehicles are charged as air quality improves. Always check the official site before you travel.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Assuming a newer car is compliant.</strong> Some diesels registered in late 2015 and 2016 are still Euro 5.</li>
          <li><strong>Paying through a third-party website.</strong> They add fees and are not needed.</li>
          <li><strong>Forgetting the congestion charge.</strong> In central London it applies to compliant and electric cars too.</li>
          <li><strong>Missing the deadline.</strong> The penalty is far more than the charge.</li>
        </ul>
      </GuideSection>

      <GuideSection id="health" n={19} kicker="Health" title="Pollution and health">
        <p>
          Nitrogen dioxide and fine particles from exhausts are linked to asthma, heart and lung disease, and poorer development of
          children&rsquo;s lungs. They are highest near busy roads in city centres, which is why zones focus there. Studies of London&rsquo;s
          ULEZ found roadside nitrogen dioxide fell sharply in central London after it started, as most vehicles switched to compliant ones.
        </p>
      </GuideSection>

      <GuideSection id="switching" n={20} kicker="Replacing" title="Switching to a compliant vehicle">
        <p>
          If you drive into a zone often, replacing a non-compliant car can pay for itself. A London commuter paying the ULEZ five days a week
          spends £2,875 a year, enough to cover much of the gap between an old diesel and a compliant <a href="/uk/vehicles/petrol-vs-ev-cost">petrol car</a>. A compliant used petrol car
          from 2006 onwards, or a diesel from late 2015 onwards, avoids the charge in every zone.
        </p>
        <p>
          Before buying, check the exact car on the official checker, as Euro ratings vary between models of the same year. An electric car
          avoids every clean air zone charge, though in central London it still pays the congestion charge at a discount.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={21} kicker="Summary" title="A quick checklist">
        <ol>
          <li>Check your registration on the official checker for each zone you drive in.</li>
          <li>Work out how often you drive in, and what it costs a year with this calculator.</li>
          <li>Set a reminder or Auto Pay so you never miss a payment deadline.</li>
          <li>Look for local exemptions or grants if you are on a low income or run a small business.</li>
          <li>When you next change vehicle, choose one that meets the standard everywhere.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£12.50", label: "London ULEZ" },
            { value: "£18", label: "Congestion charge" },
            { value: "£13.50", label: "Electric car with Auto Pay" },
            { value: "£8", label: "Birmingham" },
            { value: "£9", label: "Bristol" },
            { value: "£60 to £480", label: "Scottish LEZ penalties" },
            { value: "Euro 4 / Euro 6", label: "Petrol / diesel standard" },
            { value: "£180", label: "London penalty charge" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
