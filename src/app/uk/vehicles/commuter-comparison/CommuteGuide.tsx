import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Commuter comparison — the guide. Figures from src/lib/vehicles/running.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "car-costs", title: "What driving to work really costs" },
  { id: "example", title: "A worked example" },
  { id: "train", title: "Season tickets and the 2026 fare freeze" },
  { id: "hybrid", title: "Hybrid working changes the sums" },
  { id: "bus", title: "The bus fare cap" },
  { id: "bike", title: "Cycling and the Cycle to Work scheme" },
  { id: "zones", title: "Parking and clean air zones" },
  { id: "time", title: "Time, reliability and comfort" },
  { id: "tax", title: "Tax: commuting is not a business journey" },
  { id: "sharing", title: "Car sharing" },
  { id: "electric", title: "Commuting in an electric car" },
  { id: "mixing", title: "Mixing modes" },
  { id: "employer", title: "Help from your employer" },
  { id: "moving", title: "Moving house or changing job" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "walking", title: "Walking and running" },
  { id: "two-wheels", title: "Motorbikes and scooters" },
  { id: "london", title: "Commuting in London" },
  { id: "long-view", title: "The long view" },
  { id: "checklist", title: "Working out your best option" },
  { id: "review", title: "Keeping your costs under review" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Rail fares freeze", href: "https://www.gov.uk/government/news/passengers-save-millions-as-rail-fare-freeze-starts" },
  { label: "GOV.UK — Bus fare cap", href: "https://www.gov.uk/guidance/3-national-bus-fare-cap" },
  { label: "GOV.UK — Cycle to Work scheme guidance", href: "https://www.gov.uk/government/publications/cycle-to-work-scheme-implementation-guidance" },
  { label: "HMRC — Travel and subsistence: commuting", href: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim32100" },
];

export default function CommuteGuide() {
  return (
    <Guide
      kicker="The commuting cost guide"
      title="Is it cheaper to drive or take the train to work?"
      intro={
        <>
          Commuting is one of the biggest regular costs for many workers. This guide compares driving, the train, the bus and cycling, using
          real 2026 prices, and shows how parking, hybrid working and clean air zones change the answer.
        </>
      }
      meta={["2026 fares and prices", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A 12-mile commute by car, five days a week for 46 weeks, costs about £3,012 a year with £6 a day parking.</li>
          <li>A £2,400 season ticket is cheaper; the bus at the £3 cap costs £1,380.</li>
          <li>Without paid parking, the same drive costs £1,632, and the car becomes cheaper than the train.</li>
          <li>Working three days a week, daily rail fares can beat a season ticket.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£13.09", label: "Driving a day in the example" },
            { value: "£10.43", label: "Train a day with a season" },
            { value: "£6", label: "Bus a day at the £3 cap" },
            { value: "Frozen", label: "Regulated rail fares to March 2027" },
          ]}
        />
      </GuideSection>

      <GuideSection id="car-costs" n={2} kicker="Driving" title="What driving to work really costs">
        <p>
          Fuel is the cost most people notice, but it is often not the biggest. Parking, extra wear and tear, and any zone charges can add more.
          The calculator includes fuel, parking, wear at 12p a mile by default, and any daily zone charge. It leaves out insurance, <a href="/uk/vehicles/car-tax-ved">car tax</a>{" "}and
          depreciation, which you would usually pay anyway if you keep the car for other trips.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="12 miles each way, 5 days a week, 46 weeks, 45 mpg at 173.8p"
          steps={[
            { label: "Miles a year: 12 × 2 × 230 days", value: "5,520" },
            { label: "Fuel", value: "£969.20" },
            { label: "Parking at £6 a day", value: "£1,380" },
            { label: "Wear at 12p a mile", value: "£662.40" },
          ]}
          total={{ label: "Driving a year", value: "£3,011.60" }}
        />
        <Figure label="A year of commuting, 12 miles each way" caption="5 days a week for 46 weeks.">
          <Bars
            items={[
              { label: "Bike", value: 150 },
              { label: "Bus (£3 cap)", value: 1380 },
              { label: "Car, free parking", value: 1631.6 },
              { label: "Train season", value: 2400 },
              { label: "Car, £6 parking", value: 3011.6 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="train" n={4} kicker="Rail" title="Season tickets and the 2026 fare freeze">
        <p>
          Regulated rail fares in England, including most season tickets and commuter returns, have been frozen until March 2027, the first
          freeze in 30 years. A season ticket gives unlimited travel between two stations and is usually much cheaper than daily returns if you
          travel most days. Many employers offer interest-free season ticket loans, repaid from your salary over the year.
        </p>
      </GuideSection>

      <GuideSection id="hybrid" n={5} kicker="Hybrid working" title="Hybrid working changes the sums">
        <DataTable
          caption="12 miles each way, 46 weeks, £2,400 season or £14 daily return"
          head={["Days a week", "Car", "Train", "Bus"]}
          numeric={[1, 2, 3]}
          rows={[
            ["5", "£3,012", "£2,400", "£1,380"],
            ["3", "£1,807", "£1,932", "£828"],
            ["2", "£1,205", "£1,288", "£552"],
          ]}
        />
        <p>
          If you travel three days a week or fewer, an annual season ticket may cost more than paying daily. Flexi season tickets, valid for 8
          days of travel in 28, are designed for part-week commuters. The calculator uses whichever is cheaper of the season ticket and daily
          fares you enter.
        </p>
      </GuideSection>

      <GuideSection id="bus" n={6} kicker="Bus" title="The bus fare cap">
        <p>
          In England outside London, single fares on most bus routes are capped at £3 until the end of December 2026. From 1 January 2027 the
          cap is due to fall to £2 for 12 months. At £2, the example commute by bus would cost £920 a year. Weekly and monthly bus passes can
          be cheaper still. In London, bus fares are set by TfL and the Hopper fare lets you change buses within an hour for one fare.
        </p>
      </GuideSection>

      <GuideSection id="bike" n={7} kicker="Cycling" title="Cycling and the Cycle to Work scheme">
        <p>
          Cycling is by far the cheapest way to commute once you have a bike. Through the Cycle to Work scheme, your employer buys the bike and
          you pay for it from your salary before tax and <a href="/uk/tax-and-salary/national-insurance">National Insurance</a>. A £1,000 bike costs a basic-rate taxpayer about £720, and a
          higher-rate taxpayer about £580.
        </p>
        <CompareCards
          columns={[
            { name: "Basic-rate taxpayer", rows: [{ label: "Saving on £1,000", value: "£280" }, { label: "Cost", value: "£720" }] },
            { name: "Higher-rate taxpayer", rows: [{ label: "Saving on £1,000", value: "£420" }, { label: "Cost", value: "£580" }] },
          ]}
        />
        <p>E-bikes make longer commutes realistic and are included in most schemes.</p>
      </GuideSection>

      <GuideSection id="zones" n={8} kicker="Charges" title="Parking and clean air zones">
        <p>
          Paid parking can double the cost of driving. In the example, £6 a day adds £1,380 a year. If your car does not meet the standard for
          London&rsquo;s ULEZ, £12.50 a day adds £2,875, taking the cost of driving to £5,887. The{" "}
          <a href="/uk/vehicles/clean-air-zones">clean air zone calculator</a> checks the charges in each city.
        </p>
      </GuideSection>

      <GuideSection id="time" n={9} kicker="Beyond cost" title="Time, reliability and comfort">
        <ul>
          <li><strong>Time:</strong> the train may be faster at peak times; driving may be faster for cross-country journeys.</li>
          <li><strong>Use of time:</strong> on public transport you can read, rest or work.</li>
          <li><strong>Reliability:</strong> both trains and roads have delays; check the record on your route.</li>
          <li><strong>Health:</strong> cycling and walking part of the way build exercise into your day.</li>
        </ul>
      </GuideSection>

      <GuideSection id="tax" n={10} kicker="Tax" title="Tax: commuting is not a business journey">
        <p>
          Travel between home and your permanent workplace counts as commuting, so you cannot claim tax relief or a tax-free mileage allowance
          for it. Journeys to a temporary workplace, such as a client site for less than 24 months, can count as business travel. The{" "}
          <a href="/uk/vehicles/fuel-cost-journey">fuel cost calculator</a> works out individual trips.
        </p>
        <Callout title="Season ticket loans">An interest-free season ticket loan from your employer of up to £10,000 is not a taxable benefit.</Callout>
      </GuideSection>

      <GuideSection id="sharing" n={11} kicker="Sharing" title="Car sharing">
        <p>
          Sharing the drive with a colleague halves the cost of fuel, parking and wear for each of you. In the example, each person would pay
          about £1,506 a year instead of £3,012, cheaper than the season ticket. Some employers offer priority parking spaces for car sharers.
          As long as you only share costs and do not make a profit, you do not need special insurance.
        </p>
      </GuideSection>

      <GuideSection id="electric" n={12} kicker="Electric" title="Commuting in an electric car">
        <p>
          An <a href="/uk/vehicles/petrol-vs-ev-cost">electric car</a>{" "}charged at home transforms the cost of driving to work. The example&rsquo;s 5,520 miles a year would cost about
          £126 in electricity on an 8p overnight tariff, or £415 at the 26.32p price cap, against £969 in petrol. With parking at £6 a day and
          wear at 10p a mile, driving an electric car would cost about £2,058 a year, still a little less than the season ticket. Some
          workplaces offer free charging, which is not taxed as a benefit.
        </p>
      </GuideSection>

      <GuideSection id="mixing" n={13} kicker="Combining" title="Mixing modes">
        <p>
          Many commuters combine options: driving to a station with free or cheap parking and taking the train for the rest, or cycling to the
          station. Park and ride sites around many cities offer cheap all-day parking with a bus into the centre. If you combine modes, add
          the costs of each part. You can use this calculator for the drive to the station and the train separately.
        </p>
      </GuideSection>

      <GuideSection id="employer" n={14} kicker="Work" title="Help from your employer">
        <ul>
          <li><strong>Season ticket loans:</strong> interest-free, repaid from your salary over a year.</li>
          <li><strong>Cycle to Work:</strong> a bike and safety kit through <a href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice</a>.</li>
          <li><strong>Workplace parking and charging:</strong> free parking or charging at work is not a taxable benefit.</li>
          <li><strong>Flexible or hybrid working:</strong> you can ask for it from your first day of employment.</li>
        </ul>
      </GuideSection>

      <GuideSection id="moving" n={15} kicker="Big decisions" title="Moving house or changing job">
        <p>
          When comparing a job with a longer commute, or a cheaper home further out, count the commuting cost as part of the deal. A season
          ticket of £4,500 a year is paid from taxed income; a basic-rate taxpayer needs to earn about £6,250 more before tax to cover it, and a
          higher-rate taxpayer about £7,760. Time spent travelling matters too.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={16} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Counting only fuel.</strong> Parking and wear often cost more.</li>
          <li><strong>Buying an annual season ticket for part-week travel.</strong> Check daily and flexi fares.</li>
          <li><strong>Forgetting holidays.</strong> Most people commute 44 to 47 weeks a year.</li>
          <li><strong>Ignoring zone charges.</strong> An older car in a clean air zone can double the cost of driving.</li>
        </ul>
      </GuideSection>

      <GuideSection id="walking" n={17} kicker="Free" title="Walking and running">
        <p>
          For journeys of up to two or three miles, walking or running is free and often as quick as the bus at rush hour. Many commuters walk
          part of the way, for example from a cheaper station or car park further out, which can cut both cost and time spent in traffic.
        </p>
      </GuideSection>

      <GuideSection id="two-wheels" n={18} kicker="Two wheels" title="Motorbikes and scooters">
        <p>
          A small motorbike or moped uses far less fuel than a car, often parks free, and can filter through traffic. Insurance, protective
          clothing and training add to the cost. Privately owned electric scooters cannot legally be used on public roads, pavements or cycle
          lanes; only scooters in official rental schemes can.
        </p>
      </GuideSection>

      <GuideSection id="london" n={19} kicker="London" title="Commuting in London">
        <p>
          In London, pay-as-you-go fares on the Tube, buses and many rail services are capped daily and weekly when you use the same contactless
          card or Oyster. For part-week commuters, the caps can make pay-as-you-go cheaper than a season ticket. Driving into central London
          adds the £18 congestion charge, and an older car also pays the £12.50 ULEZ charge, so very few commuters drive into the centre.
        </p>
      </GuideSection>

      <GuideSection id="long-view" n={20} kicker="Over time" title="The long view">
        <p>
          Commuting costs add up over a working life. At about £3,012 a year, the driving commute in the example would cost more than £30,000
          over ten years at today&rsquo;s prices. Switching to the bus at £1,380 a year would save over £16,000 over the same period. Even
          changing how you travel two days a week, for example cycling in summer, can make a real difference.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={21} kicker="Summary" title="Working out your best option">
        <ol>
          <li>Measure the distance and how many days a week you actually travel.</li>
          <li>Find your real fuel economy and what parking costs at work.</li>
          <li>Check the season ticket price, the daily return fare and any flexi tickets.</li>
          <li>Look up the bus fare and whether weekly passes are cheaper.</li>
          <li>Ask your employer about Cycle to Work, season ticket loans, parking and charging.</li>
          <li>Put the figures into the calculator and try a few different weeks.</li>
        </ol>
      </GuideSection>

      <GuideSection id="review" n={22} kicker="Review" title="Keeping your costs under review">
        <p>
          The cheapest way to get to work rarely stays the same for long. Fuel prices change every week, rail fares are
          set each year, bus fare caps are reviewed, and your own pattern of office days shifts with your job. A choice
          that was right when you started can quietly become the expensive one.
        </p>
        <ul>
          <li>Run the comparison again whenever fares, fuel prices or your office days change.</li>
          <li>Check renewal dates for season tickets and car insurance, and compare before you renew rather than after.</li>
          <li>Keep a month of receipts, tickets and parking charges: real figures beat guesses.</li>
          <li>Ask your employer each year what help is on offer, as schemes and season ticket loans come and go.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={23} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£3", label: "Bus fare cap in 2026" },
            { value: "£2", label: "Bus fare cap from January 2027" },
            { value: "March 2027", label: "Rail fare freeze runs to" },
            { value: "28%", label: "Cycle to Work saving, basic rate" },
            { value: "£12.50", label: "London ULEZ a day" },
            { value: "173.8p", label: "Petrol a litre" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
