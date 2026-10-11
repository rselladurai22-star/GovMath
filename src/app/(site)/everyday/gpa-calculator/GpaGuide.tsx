import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** GPA and course grades — the guide. Figures from src/lib/life/maths.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a GPA is" },
  { id: "scale", title: "The 4.0 scale" },
  { id: "credits", title: "Why credits matter" },
  { id: "example", title: "A worked example" },
  { id: "weighted", title: "Weighted GPA: honors and AP" },
  { id: "weighted-example", title: "The same courses, weighted" },
  { id: "a-plus", title: "Is an A+ worth more than an A?" },
  { id: "cumulative", title: "Cumulative GPA" },
  { id: "raise", title: "How fast can you raise a GPA?" },
  { id: "target", title: "The GPA you need this term" },
  { id: "course-grade", title: "Your grade in one course" },
  { id: "final", title: "The score you need on the final" },
  { id: "final-table", title: "Final exam targets at a glance" },
  { id: "percent-letter", title: "Percentages and letter grades" },
  { id: "special", title: "Pass/fail, repeats and withdrawals" },
  { id: "colleges", title: "How colleges read your GPA" },
  { id: "uk", title: "UK degree classifications" },
  { id: "tips", title: "Practical tips" },
  { id: "percent-to-gpa", title: "Turning a percentage average into a GPA" },
  { id: "which-report", title: "Which GPA to report" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "College Board BigFuture — How to convert your GPA to a 4.0 scale", href: "https://bigfuture.collegeboard.org/help-center/what-average-gpa" },
  { label: "University of Warwick — Undergraduate degree classification conventions (an example of one university's rules)", href: "https://warwick.ac.uk/services/aro/dar/quality/categories/examinations/conventions/ug20" },
];

export default function GpaGuide() {
  return (
    <Guide
      kicker="The GPA guide"
      title="How GPA and course grades are worked out"
      intro={
        <>
          A grade point average sums up your grades in one number. This guide shows how it is calculated, how honors and AP courses change it, how a
          single term moves your cumulative GPA, and how to work out the score you need on a final exam. Schools set their own rules, so check yours
          where it differs.
        </>
      }
      meta={["Worked examples", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Each letter grade has a value in grade points: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.</li>
          <li>GPA = total of (grade points × credits) ÷ total credits.</li>
          <li>Weighted GPA adds points for harder courses, commonly +0.5 for honors and +1.0 for AP.</li>
          <li>Score needed on a final = (target − current × (1 − weight)) ÷ weight.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3.33", label: "Unweighted GPA, our example" },
            { value: "3.66", label: "Same courses, weighted" },
            { value: "3.32", label: "3.2 over 60 credits + 3.8 over 15" },
            { value: "86%", label: "Needed on a 35% final for an 85%" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a GPA is">
        <p>
          GPA stands for grade point average. It is used by most high schools and colleges in the United States. Each grade is turned into a number of points, and the points are averaged, with bigger courses counting
          for more. The result is a single figure, usually between 0 and 4, that schools, colleges and employers use to compare students.
        </p>
        <p>
          A GPA is a weighted mean, with credits as the weights. The <a href="/everyday/average-calculator">average calculator</a>{" "}explains weighted
          means in more detail.
        </p>
      </GuideSection>

      <GuideSection id="scale" n={3} kicker="Scale" title="The 4.0 scale">
        <DataTable
          caption="The common US 4.0 scale (schools vary)"
          head={["Letter", "Grade points", "Letter", "Grade points"]}
          numeric={[1, 3]}
          rows={[
            ["A+", "4.0 (some 4.33)", "C+", "2.3"],
            ["A", "4.0", "C", "2.0"],
            ["A−", "3.7", "C−", "1.7"],
            ["B+", "3.3", "D+", "1.3"],
            ["B", "3.0", "D", "1.0"],
            ["B−", "2.7", "D−", "0.7"],
            ["", "", "F", "0"],
          ]}
        />
        <p>
          The College Board notes that the way letter grades map to percentages and points varies between schools. The calculator uses the table above;
          change the A+ value under More options if your school uses 4.33.
        </p>
      </GuideSection>

      <GuideSection id="credits" n={4} kicker="Weights" title="Why credits matter">
        <p>
          Credits (or credit hours, or units) show how big a course is. A four-credit science course with labs counts for more than a two-credit
          elective. An A in a four-credit course raises your GPA twice as much as an A in a two-credit course. If every course in your school has the
          same weight, give each one 1 credit and the GPA becomes a simple average.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Example" title="A worked example">
        <WorkedExample
          title="Five courses, 15 credits"
          steps={[
            { label: "A × 3 credits", value: "12.0" },
            { label: "B+ × 4 credits", value: "13.2" },
            { label: "A− × 3 credits", value: "11.1" },
            { label: "B × 3 credits", value: "9.0" },
            { label: "C+ × 2 credits", value: "4.6" },
            { label: "Quality points ÷ credits", value: "49.9 ÷ 15" },
          ]}
          total={{ label: "Unweighted GPA", value: "3.33" }}
        />
        <p>These are the calculator&rsquo;s starting values, so you can follow along and then change them to your own grades.</p>
      </GuideSection>

      <GuideSection id="weighted" n={6} kicker="Weighting" title="Weighted GPA: honors and AP">
        <p>
          Many high schools reward harder courses by adding points. The College Board says weighting varies between school districts. The most common
          pattern is +0.5 for honors and +1.0 for Advanced Placement (AP) or International Baccalaureate (IB) courses, so an A in an AP course counts as
          5.0. Some schools add the same amount for both, or use a 5.0 or 6.0 scale. Set your school&rsquo;s bonuses under More options.
        </p>
        <Callout title="No bonus on a fail">
          Most schools do not add the bonus to an F, and neither does this calculator. An F in an AP course still counts as 0.
        </Callout>
      </GuideSection>

      <GuideSection id="weighted-example" n={7} kicker="Example" title="The same courses, weighted">
        <p>If the A was in an AP course and the B+ in an honors course:</p>
        <CompareCards
          columns={[
            {
              name: "Unweighted",
              rows: [
                { label: "AP A", value: "4.0 × 3 = 12.0" },
                { label: "Honors B+", value: "3.3 × 4 = 13.2" },
                { label: "Quality points", value: "49.9" },
                { label: "GPA", value: "3.33" },
              ],
            },
            {
              name: "Weighted",
              rows: [
                { label: "AP A", value: "5.0 × 3 = 15.0" },
                { label: "Honors B+", value: "3.8 × 4 = 15.2" },
                { label: "Quality points", value: "54.9" },
                { label: "GPA", value: "3.66" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="a-plus" n={8} kicker="Scale" title="Is an A+ worth more than an A?">
        <p>
          At most schools, no: both are 4.0, the top of the scale. At schools that give an A+ 4.33, two three-credit courses with an A+ and an A
          average 4.165 rather than 4.0. Choose the A+ value under More options to match your transcript.
        </p>
      </GuideSection>

      <GuideSection id="cumulative" n={9} kicker="Overall" title="Cumulative GPA">
        <p>
          Your cumulative GPA covers every term so far. Do not average the term GPAs: weight each one by its credits. Enter your GPA and credits so far
          under More options.
        </p>
        <WorkedExample
          title="3.2 over 60 credits, then 3.8 over 15"
          steps={[
            { label: "3.2 × 60", value: "192" },
            { label: "3.8 × 15", value: "57" },
            { label: "(192 + 57) ÷ 75", value: "3.32" },
          ]}
          total={{ label: "New cumulative GPA", value: "3.32" }}
        />
      </GuideSection>

      <GuideSection id="raise" n={10} kicker="Overall" title="How fast can you raise a GPA?">
        <p>Each term counts for less as your credits build up. A perfect 4.0 over 15 credits, starting from 3.2:</p>
        <DataTable
          caption="Cumulative GPA after a 4.0 term of 15 credits"
          head={["Credits so far", "GPA so far", "After a 4.0 term"]}
          numeric={[0, 1, 2]}
          rows={[
            ["15", "3.2", "3.60"],
            ["30", "3.2", "3.47"],
            ["60", "3.2", "3.36"],
            ["90", "3.2", "3.31"],
          ]}
        />
        <p>The earlier you improve, the more it moves the overall figure.</p>
      </GuideSection>

      <GuideSection id="target" n={11} kicker="Planning" title="The GPA you need this term">
        <p>
          Set a target cumulative GPA under More options and the calculator shows the term GPA you need. From 3.2 over 60 credits, reaching 3.3 needs a
          3.7 over a 15-credit term. Reaching 3.5 would need 4.7, which is above the scale, so it would take more than one term. From 2.8 over 90
          credits, reaching 3.0 in one 15-credit term would need 4.2, which is also out of reach.
        </p>
      </GuideSection>

      <GuideSection id="course-grade" n={12} kicker="Course grade" title="Your grade in one course">
        <p>
          Most courses weight their parts: for example homework 20%, quizzes 20%, a midterm 25% and a final exam 35%. Your grade so far is the weighted
          average of the parts already marked, scaled to the weight they cover.
        </p>
        <WorkedExample
          title="Homework 92%, quizzes 85%, midterm 78%"
          steps={[
            { label: "92 × 20 + 85 × 20 + 78 × 25", value: "5,490" },
            { label: "÷ (20 + 20 + 25)", value: "÷ 65" },
          ]}
          total={{ label: "Grade so far", value: "84.46%" }}
        />
      </GuideSection>

      <GuideSection id="final" n={13} kicker="Final exam" title="The score you need on the final">
        <p>The marks so far fill 65% of the course and the final fills 35%. To finish on 85%:</p>
        <WorkedExample
          title="Target 85% with a 35% final"
          steps={[
            { label: "84.46 × 0.65", value: "54.9" },
            { label: "85 − 54.9", value: "30.1" },
            { label: "30.1 ÷ 0.35", value: "86" },
          ]}
          total={{ label: "Needed on the final", value: "86%" }}
        />
      </GuideSection>

      <GuideSection id="final-table" n={14} kicker="Table" title="Final exam targets at a glance">
        <DataTable
          caption="With 84.46% so far and a final worth 35%"
          head={["Target grade", "Needed on the final"]}
          numeric={[1]}
          rows={[
            ["80%", "71.7%"],
            ["85%", "86.0%"],
            ["90%", "100.3% (out of reach without extra credit)"],
          ]}
        />
        <p>
          The weight of the final matters. With the same 84.46% so far, reaching 90% needs 95.5% if the final is worth 50% of the course. Someone on
          84% with a final worth 30% would need 104% for a 90%.
        </p>
      </GuideSection>

      <GuideSection id="percent-letter" n={15} kicker="Scale" title="Percentages and letter grades">
        <p>
          Many US schools use 93% and above for an A, 90% for an A−, 87% for a B+, 83% for a B, 80% for a B−, and so on down to 60% for a D−. Others use
          plain ten-point bands. The calculator uses the first set to label your grade; your syllabus has the rules that count.
        </p>
        <p>
          If you need to turn marks into a percentage first, such as 47 out of 55, use the <a href="/everyday/percentage-calculator">percentage calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="special" n={16} kicker="Rules" title="Pass/fail, repeats and withdrawals">
        <ul>
          <li>Pass/fail courses usually carry credits but no grade points, so they are left out of the GPA.</li>
          <li>A withdrawal (W) usually does not count. An incomplete (I) may turn into an F if not finished.</li>
          <li>When you repeat a course, some schools replace the old grade and others average both.</li>
          <li>Transfer credits often count towards your degree but not your GPA.</li>
        </ul>
        <p>Your school&rsquo;s catalog or registrar has the exact rules.</p>
      </GuideSection>

      <GuideSection id="colleges" n={17} kicker="Admissions" title="How colleges read your GPA">
        <p>
          The College Board notes that many colleges recalculate applicants&rsquo; GPAs on their own scale and may not count every course or weight. They
          also look at how demanding your courses were. A strong weighted GPA from AP and honors courses can carry more weight than a slightly higher
          unweighted GPA from easier ones.
        </p>
        <Timeline
          items={[
            { when: "Grade 9–10", what: "Every grade counts", detail: "Early terms have the biggest effect on your final cumulative GPA." },
            { when: "Grade 11", what: "The most watched year", detail: "Often the last full year colleges see before applying." },
            { when: "Grade 12", what: "Keep it steady", detail: "Offers can depend on finishing the year well." },
          ]}
        />
        <p>
          Paying for college is the next question: the <a href="/us/savings/529-plan-calculator">529 plan calculator</a>{" "}and the{" "}
          <a href="/us/loans/student-loan-calculator">student loan calculator</a>{" "}help with that.
        </p>
      </GuideSection>

      <GuideSection id="uk" n={18} kicker="UK" title="UK degree classifications">
        <p>UK universities do not usually use a 4.0 GPA. Honours degrees are classed by an average mark, commonly:</p>
        <DataTable
          caption="Usual UK honours degree bands (each university sets its own rules)"
          head={["Class", "Usual average mark"]}
          rows={[
            ["First", "70% and above"],
            ["Upper second (2:1)", "60–69%"],
            ["Lower second (2:2)", "50–59%"],
            ["Third", "40–49%"],
          ]}
        />
        <p>
          There is no official conversion between degree classes and US GPAs; universities and employers use their own tables. UK students can plan their
          money with the <a href="/uk/students/student-budget">student budget calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="tips" n={19} kicker="Practical" title="Practical tips">
        <ul>
          <li>Check your school&rsquo;s scale: A+ value, honors and AP bonuses, and whether it rounds GPAs.</li>
          <li>Use the credits on your transcript, not the hours you spend in class.</li>
          <li>Work out the score you need before the final, so you know how much revision to plan.</li>
          <li>When a target is out of reach in one term, set a two- or three-term plan instead.</li>
          <li>Keep your own record each term; it is easier than rebuilding it from old transcripts.</li>
        </ul>
      </GuideSection>

      <GuideSection id="percent-to-gpa" n={20} kicker="Converting" title="Turning a percentage average into a GPA">
        <p>
          Some schools report percentages rather than letters. To estimate a GPA, turn each course&rsquo;s percentage into a letter using your
          school&rsquo;s cut-offs, then into grade points, then average by credits. Converting your overall percentage average in one step is less
          accurate, because the scale is not a straight line: an 89% and a 90% are one point apart but a whole grade step apart on many scales.
        </p>
        <WorkedExample
          title="Four courses: B+, B, A− and B"
          steps={[
            { label: "B+ (3.3) × 3 + B (3.0) × 3", value: "18.9" },
            { label: "A− (3.7) × 3 + B (3.0) × 4", value: "23.1" },
            { label: "42.0 ÷ 13 credits", value: "3.23" },
          ]}
          total={{ label: "GPA", value: "3.23" }}
        />
      </GuideSection>

      <GuideSection id="which-report" n={21} kicker="Applications" title="Which GPA to report">
        <p>
          Application forms usually say which figure they want. If a form asks for an unweighted GPA, give the 4.0 figure from your transcript, not the
          weighted one. If it asks for your GPA &ldquo;as shown on your transcript&rdquo;, give exactly that, with the scale it uses (for example
          &ldquo;4.2 on a 5.0 weighted scale&rdquo;). Never round up: colleges see your transcript and will notice.
        </p>
        <p>
          Scholarships often set a minimum GPA, such as 3.0. Check whether they mean weighted or unweighted, and whether they use your cumulative or
          most recent term GPA.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={22} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Averaging term GPAs without weighting them by credits, which gives a light term as much say as a full one.</li>
          <li>Adding honors or AP bonuses to an unweighted GPA.</li>
          <li>Counting pass/fail courses as 4.0 or 0.</li>
          <li>Forgetting that an A+ is worth 4.0, not more, at most schools.</li>
          <li>Treating a needed score above 100% as a typo. It means the target cannot be reached on the final alone.</li>
        </ul>
        <Callout tone="warn" title="Check the syllabus weights">
          A course where the final counts 50% behaves very differently from one where it counts 20%. Use the weights in your syllabus, not a guess.
        </Callout>
      </GuideSection>

      <GuideSection id="key-numbers" n={23} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4.0", label: "An A on the standard scale" },
            { value: "+0.5", label: "Common honors bonus" },
            { value: "+1.0", label: "Common AP or IB bonus" },
            { value: "Σ(points × credits) ÷ Σcredits", label: "GPA" },
            { value: "(T − C × (1 − w)) ÷ w", label: "Score needed on a final" },
            { value: "70%", label: "Usual UK First" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
