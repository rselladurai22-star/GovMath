import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Housing Benefit — the guide. Figures from src/lib/benefits/housing-support.ts (DWP 2026/27 rates). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who can claim Housing Benefit" },
  { id: "how", title: "How the sum works" },
  { id: "eligible-rent", title: "Eligible rent" },
  { id: "private", title: "Private tenants and the Local Housing Allowance" },
  { id: "social", title: "Social tenants and spare bedrooms" },
  { id: "applicable", title: "Your applicable amount" },
  { id: "income", title: "What counts as income" },
  { id: "earnings", title: "Earnings and disregards" },
  { id: "savings", title: "Savings and tariff income" },
  { id: "non-dependants", title: "Other adults in your home" },
  { id: "examples", title: "Worked examples" },
  { id: "taper", title: "The 65% taper in practice" },
  { id: "pension-credit", title: "Pension Credit and Housing Benefit" },
  { id: "extra-help", title: "Benefit cap and extra help" },
  { id: "claiming", title: "How to claim and backdating" },
  { id: "changes", title: "Changes you must report" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Housing Benefit", href: "https://www.gov.uk/housing-benefit" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Housing Benefit: what you'll get", href: "https://www.gov.uk/housing-benefit/what-youll-get" },
  { label: "GOV.UK — Local Housing Allowance rates", href: "https://www.gov.uk/government/collections/local-housing-allowance-lha-rates" },
  { label: "GOV.UK — Discretionary Housing Payments guidance", href: "https://www.gov.uk/government/publications/discretionary-housing-payments-guidance-manual" },
  { label: "GOV.UK — Housing Benefit claims processing guidance", href: "https://www.gov.uk/government/publications/housing-benefit-claims-processing-guidance" },
];

export default function HbGuide() {
  return (
    <Guide
      kicker="The Housing Benefit guide"
      title="Housing Benefit in 2026/27"
      intro={
        <>
          Housing Benefit helps with rent if you are on a low income. It is now mainly for people over State Pension age and people in
          supported or temporary housing. This guide explains who can claim, how councils work out the amount, what counts as income and
          savings, and the rules that can leave you paying part of the rent yourself.
        </>
      }
      meta={["2026/27 rates", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Housing Benefit is paid by your council and covers some or all of your rent, but not energy, water or meals.</li>
          <li>You can make a new claim if you have reached State Pension age, or if you live in supported, sheltered or temporary housing.</li>
          <li>The most you can get is your eligible rent, less any deductions for other adults who live with you.</li>
          <li>
            If your income is above your <strong>applicable amount</strong>, the award falls by <strong>65p for every £1</strong> over it.
          </li>
          <li>Pension Credit Guarantee Credit gives you the maximum without an income check.</li>
          <li>Savings over £16,000 rule you out, unless you get Guarantee Credit.</li>
        </ul>
        <KeyStats
          items={[
            { value: "65%", label: "Taper on income above your needs" },
            { value: "£238.00", label: "Single pensioner applicable amount a week" },
            { value: "£16,000", label: "Savings limit for most claims" },
            { value: "3 months", label: "Backdating for pensioners" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who can claim Housing Benefit">
        <p>
          Universal Credit has replaced Housing Benefit for most working-age people. If you are under State Pension age and rent an ordinary
          home, you will usually claim help with rent through Universal Credit&rsquo;s housing element instead. You can still make a new
          claim for Housing Benefit if:
        </p>
        <ul>
          <li>you, or both of you if you are a couple, have reached State Pension age (now rising from 66 to 67);</li>
          <li>you are a couple where one of you is over State Pension age and you are already getting Pension Credit;</li>
          <li>you live in supported, sheltered or &ldquo;specified&rdquo; accommodation, where the landlord provides care, support or supervision;</li>
          <li>you live in temporary accommodation arranged by the council because you are homeless.</li>
        </ul>
        <p>
          People who already had Housing Benefit before Universal Credit arrived in their area may still be getting it while the DWP moves
          them across. You also need to be liable to pay rent on the home you live in, and in most cases be habitually resident in the UK.
        </p>
        <Callout title="Not sure which to claim?">
          If you are working age and rent from a private landlord, a council or a housing association in an ordinary home, check the{" "}
          <a href="/benefits/universal-credit">Universal Credit calculator</a> instead.
        </Callout>
      </GuideSection>

      <GuideSection id="how" n={3} kicker="The method" title="How the sum works">
        <p>Councils work out Housing Benefit on a weekly basis in four steps:</p>
        <ol>
          <li>
            <strong>Eligible rent.</strong> Your rent, less charges it does not cover, limited by the Local Housing Allowance (private renters)
            or the spare room rules (working-age social renters).
          </li>
          <li>
            <strong>Maximum Housing Benefit.</strong> Eligible rent less a deduction for each other adult who lives with you.
          </li>
          <li>
            <strong>Applicable amount.</strong>{" "}A weekly figure for your household&rsquo;s needs, built from personal allowances and premiums.
          </li>
          <li>
            <strong>Taper.</strong> If your weekly income is above the applicable amount, 65% of the difference comes off the maximum.
          </li>
        </ol>
        <p>
          Anything under 50p a week is not paid. If you get Pension Credit Guarantee Credit, income-based Jobseeker&rsquo;s Allowance,
          income-related Employment and Support Allowance or Income Support, your income is treated as nil, so you get the maximum.
        </p>
      </GuideSection>

      <GuideSection id="eligible-rent" n={4} kicker="Step one" title="Eligible rent">
        <p>
          Eligible rent is the part of your rent Housing Benefit can pay. It includes most service charges for the building, such as
          cleaning shared areas, lifts and communal gardens. It does not include:
        </p>
        <ul>
          <li>energy for your own home: heating, hot water, lighting and cooking, if included in the rent;</li>
          <li>water and sewerage charges;</li>
          <li>meals provided by the landlord;</li>
          <li>charges for personal care or support, which are paid in other ways.</li>
        </ul>
        <p>
          If your rent includes energy and the amount is not set out separately, the council takes off fixed weekly amounts. For 2026/27
          these are £35.25 for heating, £4.10 for hot water, £2.85 for lighting and £4.10 for cooking. Enter any such charges under More
          options in the calculator.
        </p>
      </GuideSection>

      <GuideSection id="private" n={5} kicker="Private renting" title="Private tenants and the Local Housing Allowance">
        <p>
          If you rent from a private landlord, your eligible rent is capped at the Local Housing Allowance (LHA) for your area and the
          number of bedrooms your household is allowed. LHA rates were last set in April 2024 and are frozen for 2026/27. Single people
          under 35 without children usually get only the shared accommodation rate.
        </p>
        <p>
          For example, a pensioner renting a one-bedroom flat in Bristol for £900 a month (£207.69 a week) has their eligible rent limited to
          the £207.12 Bristol one-bedroom rate. Our <a href="/benefits/local-housing-allowance">Local Housing Allowance calculator</a> finds
          your rate and bedroom entitlement.
        </p>
        <Callout title="Supported housing is different">
          Rents in supported or exempt accommodation are not limited by the LHA in the same way, though the council can still refer a very
          high rent to a rent officer.
        </Callout>
      </GuideSection>

      <GuideSection id="social" n={6} kicker="Council and housing association homes" title="Social tenants and spare bedrooms">
        <p>
          If you rent from a council or housing association and are of working age, your eligible rent is cut if you have more bedrooms than
          the rules allow. This is the removal of the spare room subsidy, often called the bedroom tax:
        </p>
        <DataTable
          caption="Spare room reduction for working-age social tenants"
          head={["Spare bedrooms", "Cut to eligible rent", "On a £110 weekly rent"]}
          numeric={[2]}
          rows={[
            ["One", "14%", "£15.40 a week"],
            ["Two or more", "25%", "£27.50 a week"],
          ]}
        />
        <p>
          The cut does not apply once you, or your partner, reach State Pension age, or if you live in supported housing. The bedroom rules are
          the same as for the Local Housing Allowance: one room for each couple, each other adult, two children of the same sex under 16 and
          two children under 10, with extra rooms for an overnight carer or a disabled child who cannot share.
        </p>
      </GuideSection>

      <GuideSection id="applicable" n={7} kicker="Your needs" title="Your applicable amount">
        <p>
          The applicable amount is the weekly sum the law says your household needs to live on. It is the personal allowance for you (and
          your partner), plus an allowance for each child and any premiums you qualify for.
        </p>
        <DataTable
          caption="Housing Benefit personal allowances and premiums, a week, 2026/27"
          head={["Part", "Amount"]}
          numeric={[1]}
          rows={[
            ["Single, 25 or over (or lone parent)", "£95.55"],
            ["Single under 25, no children", "£75.65"],
            ["Couple, working age", "£150.15"],
            ["Single, State Pension age (reached it from April 2021)", "£238.00"],
            ["Couple, State Pension age (reached it from April 2021)", "£363.25"],
            ["Single pensioner who reached State Pension age before April 2021", "£256.00"],
            ["Couple, both reached State Pension age before April 2021", "£383.35"],
            ["Each child", "£87.88"],
            ["Disability premium (working age): single / couple", "£44.85 / £64.00"],
            ["Enhanced disability premium: single / couple", "£22.00 / £31.40"],
            ["Severe disability premium", "£86.05"],
            ["Disabled child premium", "£84.46"],
            ["Carer premium", "£48.15"],
          ]}
        />
        <p>
          The family premium was removed for new claims from May 2016, so it is left out here. The disability premiums for working-age claimants
          usually depend on getting <a href="/benefits/pip-points">PIP</a>{" "}or DLA; the severe disability premium also needs you to live without other adults and for nobody to be
          paid <a href="/benefits/carers-earnings">Carer&rsquo;s Allowance</a>{" "}for looking after you.
        </p>
      </GuideSection>

      <GuideSection id="income" n={8} kicker="Step three" title="What counts as income">
        <CompareCards
          columns={[
            {
              name: "Counts in full",
              rows: [
                { label: "Pensions", value: "State Pension and private pensions" },
                { label: "Carer's Allowance", value: "All of it" },
                { label: "Contributory benefits", value: "New Style JSA and ESA" },
                { label: "Tariff income", value: "From savings over the limit" },
              ],
            },
            {
              name: "Ignored",
              rows: [
                { label: "Child Benefit", value: "Ignored" },
                { label: "Child maintenance", value: "Ignored" },
                { label: "PIP, DLA, Attendance Allowance", value: "Ignored" },
                { label: "Winter Fuel Payment", value: "Ignored" },
              ],
            },
          ]}
        />
        <p>
          Earnings count after tax, National Insurance and half of any pension contributions, less a small disregard. Savings Credit, the part
          of Pension Credit for some older pensioners, counts as income. Spousal and adult maintenance has a £15 weekly disregard.
        </p>
      </GuideSection>

      <GuideSection id="earnings" n={9} kicker="Working" title="Earnings and disregards">
        <p>A part of your net earnings is ignored each week. You get the highest of these that applies:</p>
        <DataTable
          caption="Earnings disregards, a week"
          head={["Situation", "Disregard"]}
          numeric={[1]}
          rows={[
            ["Single person", "£5"],
            ["Couple", "£10"],
            ["Disability or carer premium, or certain jobs", "£20"],
            ["Lone parent", "£25"],
            ["Additional disregard (30 hours, or 16 for parents and disabled people)", "+£17.10"],
            ["Registered childcare, one child / two or more", "Up to £175 / £300"],
          ]}
        />
        <p>
          Childcare costs are only taken into account if you (and your partner, if you have one) work at least 16 hours a week, and the
          childcare is registered or approved.
        </p>
      </GuideSection>

      <GuideSection id="savings" n={10} kicker="Capital" title="Savings and tariff income">
        <p>
          Housing Benefit does not count interest on savings. Instead it assumes your savings give you a weekly &ldquo;tariff income&rdquo;:
        </p>
        <DataTable
          caption="Tariff income from savings"
          head={["Savings", "Pension age", "Working age"]}
          numeric={[1, 2]}
          rows={[
            ["£6,000 or less", "£0", "£0"],
            ["£8,000", "£0", "£8 a week"],
            ["£10,000", "£0", "£16 a week"],
            ["£12,000", "£4 a week", "£24 a week"],
            ["£15,000", "£10 a week", "£36 a week"],
            ["Over £16,000", "No Housing Benefit*", "No Housing Benefit"],
          ]}
        />
        <p>
          * Unless you get Pension Credit Guarantee Credit, which has no savings limit. Pensioners have £1 a week assumed for each £500 (or
          part) over £10,000; working-age claimants £1 for each £250 (or part) over £6,000. Your home, and a property you are trying to sell,
          are usually ignored.
        </p>
      </GuideSection>

      <GuideSection id="non-dependants" n={11} kicker="Other adults" title="Other adults in your home">
        <p>
          A non-dependant is another adult who lives with you, such as a grown-up son or daughter or a relative, but not your partner, a lodger
          or a joint tenant. The council assumes they contribute to the rent and takes a fixed amount off your Housing Benefit:
        </p>
        <DataTable
          caption="Non-dependant deductions from Housing Benefit, a week, 2026/27"
          head={["Their gross weekly income", "Deduction"]}
          numeric={[1]}
          rows={[
            ["Not working, or under £192", "£20.40"],
            ["£192 to £278.99", "£46.85"],
            ["£279 to £364.99", "£64.35"],
            ["£365 to £484.99", "£105.20"],
            ["£485 to £604.99", "£119.85"],
            ["£605 or more", "£131.45"],
          ]}
        />
        <p>
          No deduction is made if you or your partner get <a href="/benefits/attendance-allowance">Attendance Allowance</a>, the daily living part of PIP or the care part of DLA, or are
          registered blind. There is also none for a non-dependant who is under 18, on Pension Credit, a full-time student, or under 25 and
          getting Universal Credit without earnings.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={12} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="A single pensioner in a housing association flat"
          steps={[
            { label: "Rent", value: "£120.00 a week" },
            { label: "State Pension and a small workplace pension", value: "£301.30 a week" },
            { label: "Tariff income on £12,000 savings", value: "£4.00 a week" },
            { label: "Income counted", value: "£305.30" },
            { label: "Applicable amount", value: "£238.00" },
            { label: "Excess income", value: "£67.30" },
            { label: "65% of the excess", value: "−£43.75" },
          ]}
          total={{ label: "Housing Benefit", value: "£76.26 a week" }}
        />
        <p>That is about £330.44 a month, leaving £43.75 a week of the rent to pay.</p>
        <WorkedExample
          title="A pensioner couple on Guarantee Credit with a working son at home"
          steps={[
            { label: "Rent", value: "£130.00 a week" },
            { label: "Income", value: "Not checked: on Guarantee Credit" },
            { label: "Son earns £420 a week gross", value: "−£105.20" },
          ]}
          total={{ label: "Housing Benefit", value: "£24.80 a week" }}
        />
        <WorkedExample
          title="A lone parent in supported housing, working 16 hours"
          steps={[
            { label: "Applicable amount: £95.55 + 2 children × £87.88", value: "£271.31" },
            { label: "Net earnings", value: "£250.00 a week" },
            { label: "Disregards: £25 + £17.10 + £100 childcare", value: "−£142.10" },
            { label: "Income counted", value: "£107.90" },
            { label: "Income is below the applicable amount", value: "No taper" },
          ]}
          total={{ label: "Housing Benefit", value: "All £200 eligible rent" }}
        />
      </GuideSection>

      <GuideSection id="taper" n={13} kicker="Earning more" title="The 65% taper in practice">
        <p>
          Every extra £1 of weekly income above your applicable amount reduces Housing Benefit by 65p. If you also get <a href="/benefits/council-tax-reduction">Council Tax Reduction</a>,
          that falls by another 20p, so you keep only 15p of each extra pound until one of them runs out.
        </p>
        <p>
          For the single pensioner in the first example, Housing Benefit only stops when weekly income reaches about £422.62: the £238
          applicable amount plus the £120 rent divided by 0.65. Many pensioners with modest private pensions are entitled to something, but do
          not claim because they assume they earn too much.
        </p>
        <Callout tone="good" title="Try it">
          The &ldquo;If your income went up&rdquo; card in the calculator shows your award at higher incomes.
        </Callout>
      </GuideSection>

      <GuideSection id="pension-credit" n={14} kicker="Pensioners" title="Pension Credit and Housing Benefit">
        <p>
          Pension Credit Guarantee Credit tops up weekly income to £238.00 for a single pensioner or £363.25 for a couple. Getting even a small
          amount of it unlocks maximum Housing Benefit, full Council Tax Reduction and other help such as a free TV licence for over-75s and cold
          weather payments. Check with the <a href="/benefits/pension-credit">Pension Credit calculator</a>.
        </p>
        <p>
          If you claim Pension Credit, the DWP passes your details to the council, so you can claim Housing Benefit at the same time.
        </p>
      </GuideSection>

      <GuideSection id="extra-help" n={15} kicker="Limits and top-ups" title="Benefit cap and extra help">
        <p>
          The benefit cap limits the total benefits a working-age household can get, and it is taken out of Housing Benefit. It does not apply to
          pensioners, or to people getting PIP, DLA, Attendance Allowance or Carer&rsquo;s Allowance. Check it with our{" "}
          <a href="/benefits/benefit-cap">benefit cap calculator</a>.
        </p>
        <p>
          If Housing Benefit does not cover your rent, ask your council for a <strong>Discretionary Housing Payment</strong>. These are often
          given for a few months to help with a rent shortfall, the spare room cut or the benefit cap, especially while you look for somewhere
          cheaper.
        </p>
      </GuideSection>

      <GuideSection id="claiming" n={16} kicker="Getting it" title="How to claim and backdating">
        <Timeline
          items={[
            { when: "Step 1", what: "Claim from your council", detail: "Most councils have an online form. Pensioners can also claim through the Pension Credit claim line." },
            { when: "Step 2", what: "Send evidence", detail: "Your tenancy agreement, proof of income, savings and identity." },
            { when: "Step 3", what: "Decision", detail: "Councils should decide within 14 days of having all the information they need, or as soon as possible after that." },
            { when: "Step 4", what: "Payment", detail: "Paid to you, or to your landlord in some cases, usually every two or four weeks." },
          ]}
        />
        <p>
          Claim straight away: a claim can be backdated by up to 3 months if you are over State Pension age. Working-age claimants can get up to
          1 month if they show good cause for claiming late.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={17} kicker="Staying right" title="Changes you must report">
        <p>Tell the council promptly if anything changes, or you may be overpaid and have to pay it back. This includes:</p>
        <ul>
          <li>your rent, or moving home;</li>
          <li>your income or savings, including a new pension or a change in Pension Credit;</li>
          <li>someone moving in or out, or a non-dependant&rsquo;s income changing;</li>
          <li>going into hospital or a care home, or being away from home for a long time.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Housing Benefit 2026/27 at a glance"
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Taper", "65%"],
            ["Minimum award", "50p a week"],
            ["Savings limit (not on Guarantee Credit)", "£16,000"],
            ["Savings ignored: pension age / working age", "£10,000 / £6,000"],
            ["Single pensioner applicable amount", "£238.00 a week"],
            ["Pensioner couple applicable amount", "£363.25 a week"],
            ["Highest non-dependant deduction", "£131.45 a week"],
            ["Spare room cut: one / two or more", "14% / 25%"],
            ["Backdating: pension age / working age", "3 months / 1 month"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
