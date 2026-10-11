import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Pregnancy due date guide. Every date comes from src/lib/life/pregnancy.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "naegele", title: "How a due date is worked out" },
  { id: "why-period", title: "Why weeks count from your period" },
  { id: "cycle", title: "Adjusting for your cycle length" },
  { id: "conception", title: "From a conception date" },
  { id: "ivf", title: "From an IVF transfer" },
  { id: "scan", title: "From a dating scan" },
  { id: "weeks-days", title: "Reading weeks and days" },
  { id: "trimesters", title: "The three trimesters" },
  { id: "timeline", title: "Key dates in pregnancy" },
  { id: "scans", title: "Your NHS scans" },
  { id: "viability", title: "24 weeks and viability" },
  { id: "term", title: "Full term, 40 weeks and 42 weeks" },
  { id: "accuracy", title: "How accurate is a due date?" },
  { id: "irregular", title: "Irregular periods and other cases" },
  { id: "twins", title: "Twins and more" },
  { id: "work", title: "Dates that matter at work (UK)" },
  { id: "money", title: "Money and help to plan" },
  { id: "first-steps", title: "First steps when you find out" },
  { id: "not-advice", title: "When to get help" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NHS: Due date calculator", href: "https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/" },
  { label: "NHS: Ultrasound scans in pregnancy", href: "https://www.nhs.uk/pregnancy/your-pregnancy-care/ultrasound-scans/" },
  { label: "NHS: Pregnancy week by week", href: "https://www.nhs.uk/pregnancy/week-by-week/" },
  { label: "NHS: Inducing labour", href: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/inducing-labour/" },
  { label: "NHS Start for Life: 24 weeks pregnant", href: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-24/" },
  { label: "NHS: Fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
  { label: "GOV.UK: Maternity pay and leave", href: "https://www.gov.uk/maternity-pay-leave" },
];

export default function DueDateGuide() {
  return (
    <Guide
      kicker="The due date guide"
      title="How your due date is worked out"
      intro={
        <>
          A due date is the day a pregnancy reaches 40 weeks. It is worked out from the first day of your last period, from the date you conceived, from an
          IVF transfer or from a dating scan. This guide explains each method, how to read &quot;weeks and days&quot;, the key dates along the way and why
          only a small share of babies arrive on the day itself. It is general information, not medical advice.
        </>
      }
      meta={["NHS-based", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Add <strong>280 days (40 weeks)</strong> to the first day of your last period.</li>
          <li>If your cycle is longer or shorter than 28 days, move the date by the difference.</li>
          <li>From a conception date, add 266 days. From a 5-day IVF transfer, add 261 days; from a 3-day transfer, 263 days.</li>
          <li>Pregnancy normally lasts <strong>37 to 42 weeks</strong>, so treat the due date as the middle of a window, not an appointment.</li>
        </ul>
        <KeyStats
          items={[
            { value: "280 days", label: "From the last period to the due date" },
            { value: "266 days", label: "From conception to the due date" },
            { value: "37 to 42", label: "Weeks: the normal length of pregnancy" },
            { value: "11 to 14", label: "Weeks: the NHS dating scan" },
          ]}
        />
      </GuideSection>

      <GuideSection id="naegele" n={2} kicker="The rule" title="How a due date is worked out">
        <p>
          The usual method is called Naegele&rsquo;s rule, after the German obstetrician who described it in the 19th century. Take the first day of your
          last menstrual period (often shortened to LMP) and add 280 days. A shortcut gives the same answer: add one year, take away three months and add
          seven days.
        </p>
        <WorkedExample
          title="Last period started on 1 September 2026, 28-day cycle"
          steps={[
            { label: "First day of last period", value: "1 September 2026" },
            { label: "Add 280 days (40 weeks)", value: "+280 days" },
          ]}
          total={{ label: "Estimated due date", value: "Tuesday 8 June 2027" }}
        />
        <p>
          The calculator above does this for you, and also shows how many weeks and days pregnant you are today, which trimester you are in and the dates
          of your scans.
        </p>
      </GuideSection>

      <GuideSection id="why-period" n={3} kicker="Counting" title="Why weeks count from your period">
        <p>
          It surprises many people that pregnancy is counted from the start of the last period, about two weeks before conception. The reason is
          practical: most people know when their period started, but few know the day they conceived. Counting from the period gives everyone, including
          midwives and doctors, the same starting point.
        </p>
        <p>
          So at &quot;4 weeks pregnant&quot;, the embryo is about two weeks old. The 40 weeks of pregnancy include roughly two weeks before conception and
          38 weeks after it.
        </p>
      </GuideSection>

      <GuideSection id="cycle" n={4} kicker="Cycle length" title="Adjusting for your cycle length">
        <p>
          Naegele&rsquo;s rule assumes a 28-day cycle, with ovulation around day 14. The NHS says ovulation happens around 10 to 16 days before the next
          period, so with a longer cycle you ovulate later, and with a shorter cycle earlier. The calculator moves the due date by the difference between
          your cycle and 28 days.
        </p>
        <DataTable
          caption="Last period on 1 September 2026"
          head={["Usual cycle", "Due date"]}
          rows={[
            ["24 days", "Friday 4 June 2027"],
            ["28 days", "Tuesday 8 June 2027"],
            ["35 days", "Tuesday 15 June 2027"],
          ]}
        />
        <p>
          The NHS treats cycles of 21 to 35 days as normal. Measure from the first day of one period to the day before the next. If your cycles vary a lot,
          use an average, and expect the dating scan to give a more reliable date.
        </p>
      </GuideSection>

      <GuideSection id="conception" n={5} kicker="Method two" title="From a conception date">
        <p>
          If you know the date you conceived, for example from ovulation tests or a single possible date, add 266 days (38 weeks). Conception on 15
          September 2026 gives the same due date as the example above: Tuesday 8 June 2027.
        </p>
        <p>
          Bear in mind that sperm can survive for up to 7 days, so conception can happen several days after sex. The date of sex is not always the date of
          conception. If you are trying to conceive, the <a href="/everyday/ovulation-calculator">ovulation calculator</a>{" "}shows your likely fertile days.
        </p>
      </GuideSection>

      <GuideSection id="ivf" n={6} kicker="Method three" title="From an IVF transfer">
        <p>
          With IVF the timing is known exactly. An embryo transferred on day 5 after egg collection (a blastocyst) is five days past fertilisation, so the
          due date is 266 − 5 = 261 days after the transfer. For a day-3 embryo it is 263 days.
        </p>
        <CompareCards
          columns={[
            { name: "5-day transfer", rows: [{ label: "Transfer", value: "15 September 2026" }, { label: "Add", value: "261 days" }, { label: "Due date", value: "Thursday 3 June 2027" }] },
            { name: "3-day transfer", rows: [{ label: "Transfer", value: "15 September 2026" }, { label: "Add", value: "263 days" }, { label: "Due date", value: "Saturday 5 June 2027" }] },
          ]}
        />
        <p>Your fertility clinic will give you a due date too; use theirs if it differs, as they know the details of your treatment.</p>
      </GuideSection>

      <GuideSection id="scan" n={7} kicker="Method four" title="From a dating scan">
        <p>
          The NHS offers a dating scan at 11 to 14 weeks. The sonographer measures the baby from head to bottom and gives the pregnancy as weeks and days,
          for example 12+2. That measurement is usually more accurate than a period date, so the scan date becomes your official due date.
        </p>
        <WorkedExample
          title="Dating scan on 26 November 2026 shows 12+2"
          steps={[
            { label: "Scan date", value: "26 November 2026" },
            { label: "Count back 12 weeks 2 days", value: "1 September 2026" },
            { label: "Add 280 days", value: "+280 days" },
          ]}
          total={{ label: "Due date", value: "Tuesday 8 June 2027" }}
        />
        <p>Choose &quot;Dating scan result&quot; in the calculator and enter the scan date and the weeks and days from your report.</p>
      </GuideSection>

      <GuideSection id="weeks-days" n={8} kicker="Notation" title="Reading weeks and days">
        <p>
          Midwives write the stage of pregnancy as completed weeks plus days. &quot;12+3&quot; means 12 weeks and 3 days. You are &quot;in your 13th
          week&quot; at 12+3, because 12 weeks are complete. This is why apps and leaflets can seem a week apart: some count completed weeks, others the
          week you are in. The calculator uses completed weeks, like your notes.
        </p>
      </GuideSection>

      <GuideSection id="trimesters" n={9} kicker="Stages" title="The three trimesters">
        <p>Pregnancy is split into three trimesters. The NHS uses these week ranges:</p>
        <DataTable
          head={["Trimester", "Weeks", "In the example (due 8 June 2027)"]}
          rows={[
            ["First", "Up to the end of week 12", "Until 30 November 2026"],
            ["Second", "Weeks 13 to 27", "From 1 December 2026"],
            ["Third", "From week 28 to birth", "From 16 March 2027"],
          ]}
        />
        <p>
          The first trimester is when the baby&rsquo;s organs form and when many people feel most tired and sick. The second often feels easier, and
          movements are usually felt in it. The third is about growth and getting ready for birth.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={10} kicker="Calendar" title="Key dates in pregnancy">
        <p>For a last period on 1 September 2026, the calculator gives these dates:</p>
        <Timeline
          items={[
            { when: "29 September 2026 (4+0)", what: "Missed period", detail: "Most home tests can detect pregnancy from around now." },
            { when: "17 November to 7 December 2026", what: "Dating scan window (11 to 14 weeks)" },
            { when: "5 to 25 January 2027", what: "20-week scan window (18 to 21 weeks)" },
            { when: "16 February 2027 (24+0)", what: "Viability" },
            { when: "18 May 2027 (37+0)", what: "Full term" },
            { when: "8 June 2027 (40+0)", what: "Due date" },
            { when: "15 June 2027 (41+0)", what: "Induction usually offered" },
            { when: "22 June 2027 (42+0)", what: "End of the normal range" },
          ]}
        />
      </GuideSection>

      <GuideSection id="scans" n={11} kicker="Antenatal care" title="Your NHS scans">
        <p>
          In England, the NHS offers at least two scans. The <strong>dating scan</strong>, at 11 to 14 weeks, checks how far along you are, whether there is
          more than one baby, and can include screening for Down&rsquo;s, Edwards&rsquo; and Patau&rsquo;s syndromes if you choose. The{" "}
          <strong>mid-pregnancy screening scan</strong>, between 18 and 21 weeks and often called the 20-week scan, looks at how the baby is developing.
        </p>
        <p>
          The hospital books these, but knowing the windows helps you plan time off. You have the right to paid time off work for antenatal appointments.
        </p>
      </GuideSection>

      <GuideSection id="viability" n={12} kicker="Milestone" title="24 weeks and viability">
        <p>
          The NHS describes 24 weeks as the point at which a baby is considered viable: born now, with the right neonatal care, the baby could survive.
          Chances improve with every extra week in the womb. It is a milestone many parents feel relieved to reach, but care is always tailored to the
          individual baby.
        </p>
      </GuideSection>

      <GuideSection id="term" n={13} kicker="The end" title="Full term, 40 weeks and 42 weeks">
        <ul>
          <li><strong>Before 37 weeks:</strong> premature (preterm) birth.</li>
          <li><strong>37 to 42 weeks:</strong> the normal range. A baby born in this window is called term.</li>
          <li><strong>40 weeks:</strong> the due date.</li>
          <li><strong>41 weeks:</strong> the NHS offers induction if labour has not started.</li>
          <li><strong>42 weeks:</strong> if you choose not to be induced, you should be offered extra monitoring of the baby.</li>
        </ul>
      </GuideSection>

      <GuideSection id="accuracy" n={14} kicker="Reality check" title="How accurate is a due date?">
        <p>
          Only a small share of babies are born on their due date. Most arrive in the weeks either side, which is why the NHS describes a normal pregnancy
          as lasting 37 to 42 weeks. First babies often come a little later than later babies, and cycle length, the exact day of ovulation and the
          baby&rsquo;s own timing all play a part.
        </p>
        <Callout title="Plan for a window, not a day">
          Have the hospital bag, car seat and paperwork ready by 37 weeks, and think of the due date as the middle of a five-week window.
        </Callout>
      </GuideSection>

      <GuideSection id="irregular" n={15} kicker="Special cases" title="Irregular periods and other cases">
        <p>A period-based date is less reliable if:</p>
        <ul>
          <li>your periods are irregular, or you do not remember the date;</li>
          <li>you conceived soon after stopping hormonal contraception, or while breastfeeding;</li>
          <li>you had bleeding in early pregnancy that looked like a period.</li>
        </ul>
        <p>
          In these cases, use the calculator for a rough idea and rely on the dating scan for your official date. Tell your midwife if you are not sure of
          your dates; they may arrange an earlier scan.
        </p>
      </GuideSection>

      <GuideSection id="twins" n={16} kicker="Multiples" title="Twins and more">
        <p>
          The due date is worked out the same way for twins, but twins are more likely to be born early, and the NHS usually plans birth before 40 weeks.
          Your care team will give you a plan based on the type of twin pregnancy. The key dates in this calculator are for a single baby.
        </p>
      </GuideSection>

      <GuideSection id="work" n={17} kicker="UK employment" title="Dates that matter at work (UK)">
        <p>
          In the UK, employees must tell their employer about the pregnancy, the due date and when they want leave to start by the end of the 15th week
          before the due date: around 25 weeks. Maternity leave can start up to 11 weeks before the due date, around 29 weeks.
        </p>
        <p>
          Your due date also decides your qualifying week for Statutory Maternity Pay. The <a href="/uk/benefits/maternity-pay">maternity pay calculator</a>{" "}
          works out what you will get, and the <a href="/uk/benefits/paternity-pay">paternity pay calculator</a>{" "}does the same for partners. Turn on
          &quot;Show UK dates&quot; in the calculator to add these dates to your list.
        </p>
      </GuideSection>

      <GuideSection id="money" n={18} kicker="Planning" title="Money and help to plan">
        <p>
          A due date is also a budgeting date. The <a href="/uk/benefits/baby-cost-calculator">cost of a baby calculator</a>{" "}adds up first-year costs and the
          help you can get. On a low income in the UK, you may be able to claim the <a href="/uk/benefits/sure-start-maternity-grant">Sure Start Maternity
          Grant</a>{" "}from 11 weeks before the due date, and <a href="/uk/life/healthy-start">Healthy Start</a>{" "}from 10 weeks of pregnancy.
        </p>
      </GuideSection>

      <GuideSection id="first-steps" n={19} kicker="Next steps" title="First steps when you find out">
        <ul>
          <li>Contact a GP or midwife to book your first (booking) appointment. In England you can often refer yourself to maternity services online.</li>
          <li>Take a daily folic acid supplement until 12 weeks, as the NHS recommends.</li>
          <li>Stop smoking and drinking alcohol; ask your pharmacist before taking any medicine.</li>
          <li>Write down the first day of your last period: you will be asked for it.</li>
        </ul>
      </GuideSection>

      <GuideSection id="not-advice" n={20} kicker="Safety" title="When to get help">
        <Callout title="This calculator is not medical advice">
          It gives estimates from standard rules. Contact your midwife, maternity unit or GP, or call NHS 111, if you have bleeding, pain, fewer baby
          movements, or any worry. In an emergency, call 999. Outside the UK, contact your doctor or local emergency number.
        </Callout>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Pregnancy dates at a glance"
          head={["What", "When"]}
          rows={[
            ["Due date from last period", "+280 days (cycle length − 28 days)"],
            ["Due date from conception", "+266 days"],
            ["Due date from IVF transfer", "+261 days (5-day) or +263 days (3-day)"],
            ["Dating scan", "11 to 14 weeks"],
            ["Mid-pregnancy scan", "18 to 21 weeks"],
            ["Second trimester", "Weeks 13 to 27"],
            ["Third trimester", "From week 28"],
            ["Viability", "24 weeks"],
            ["Full term", "37 to 42 weeks"],
            ["Induction offered", "41 weeks"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
