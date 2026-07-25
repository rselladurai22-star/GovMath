/**
 * The Take-Home Pay Guide — a visual, plain-English explainer that sits beneath
 * the calculator. Pure server component: every diagram is hand-built SVG/CSS so
 * the concepts are shown, not just described. Premium blue design language,
 * matching the calculator above.
 */

const ink = "#0f172a";
const body = "#334155";
const mute = "#64748b";
const subtle = "#94a3b8";
const line = "#e2e8f0";
const tint = "#f8fafc";
const blue = "#0a66ff";
const blueSoft = "#eff6ff";
const blueEdge = "#dbeafe";
const green = "#16a34a";
const greenSoft = "#f0fdf4";
const coral = "#ef4444";
const amber = "#f59e0b";
const violet = "#8b5cf6";
const slate = "#64748b";

const FONT = "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif";
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/* ── layout helpers ─────────────────────────────────────────────── */
function Section({ n, kicker, title, children }: { n: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingTop: 44, paddingBottom: 44, borderTop: `1px solid ${line}` }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 6 }}>
        <span style={{ width: 34, height: 34, flex: "none", display: "grid", placeItems: "center", borderRadius: 10, background: blueSoft, color: blue, fontWeight: 800, fontSize: 15 }}>{n}</span>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: blue }}>{kicker}</span>
      </div>
      <h2 style={{ fontSize: 27, fontWeight: 800, color: ink, letterSpacing: "-0.02em", margin: "0 0 14px", lineHeight: 1.14, fontFamily: FONT }}>{title}</h2>
      {children}
    </section>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16, lineHeight: 1.7, color: body, margin: "0 0 14px", maxWidth: 720 }}>{children}</p>;
}
function VizCard({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${line}`, borderRadius: 16, background: "#fff", padding: 22, boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 14px 32px -24px rgba(15,23,42,0.14)", margin: "18px 0" }}>
      {label && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: subtle, marginBottom: 16 }}>{label}</div>}
      {children}
    </div>
  );
}
function LegendKey({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2" style={{ fontSize: 13.5, color: body }}><span style={{ width: 12, height: 12, borderRadius: 3, background: color }} />{label}</span>;
}
function Badge({ value, label, tone = "blue" }: { value: string; label: string; tone?: "blue" | "green" }) {
  const bg = tone === "green" ? greenSoft : blueSoft;
  const edge = tone === "green" ? "#bbf7d0" : blueEdge;
  const fg = tone === "green" ? "#0a6f43" : "#1e40af";
  return (
    <div style={{ background: bg, border: `1px solid ${edge}`, borderRadius: 12, padding: "12px 16px" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: fg, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontSize: 13, color: fg, opacity: 0.85 }}>{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function TakeHomeGuide() {
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: blue }}>The Take-Home Pay Guide</span>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: ink, letterSpacing: "-0.03em", margin: "8px 0 12px", lineHeight: 1.08, fontFamily: FONT }}>Everything your payslip never explains, made visual</h2>
        <P>
          The number your employer offers you and the number that lands in your bank are two very different figures. In
          between sits a stack of deductions that almost nobody has ever had drawn out clearly: Income Tax in slices,
          National Insurance on top, a personal allowance that quietly disappears at high incomes, salary sacrifice that
          bends the whole thing in your favour, and student loans that behave nothing like a normal loan. This guide walks
          through all of it one picture at a time. Wherever a single figure helps, the worked examples use a{" "}
          <strong style={{ color: body }}>{gbp(50000)} salary</strong> on the standard tax code, England, Wales and Northern
          Ireland, 2025/26 rates.
        </P>
      </div>

      <Section n="1" kicker="Where it goes" title="How your gross salary becomes take-home">
        <P>
          Think of your gross salary as water poured into the top of a funnel. Before a single pound reaches you, three
          things are skimmed off: <span style={{ color: coral, fontWeight: 700 }}>Income Tax</span>, {" "}
          <span style={{ color: amber, fontWeight: 700 }}>National Insurance</span>, and, if you have one, a{" "}
          <span style={{ color: violet, fontWeight: 700 }}>student-loan</span> repayment. What survives the drop is your{" "}
          <span style={{ color: green, fontWeight: 700 }}>take-home pay</span>. On a {gbp(50000)} salary the arithmetic is
          surprisingly gentle: {gbp(7486)} goes to Income Tax, {gbp(2994)} to National Insurance, and {gbp(39520)} stays with
          you. That is a keep-rate of just under 79 pence in every pound.
        </P>
        <VizCard label="Every £50,000 of salary, step by step">
          <Waterfall />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ marginTop: 18 }}>
            <LegendKey color={slate} label="Gross salary" />
            <LegendKey color={coral} label="Income Tax" />
            <LegendKey color={amber} label="National Insurance" />
            <LegendKey color={green} label="Take-home" />
          </div>
        </VizCard>
        <P>
          The order matters more than it looks. Tax and National Insurance are each worked out on your salary independently,
          so they stack rather than compound. And crucially, anything you sacrifice into a pension is removed{" "}
          <em>before</em> either of them is calculated, which is the single most powerful lever on this whole page. We come
          back to that in section six.
        </P>
      </Section>

      <Section n="2" kicker="The ladder" title="Why your tax isn't one flat rate">
        <P>
          The most common misunderstanding about Income Tax is that earning more can leave you worse off. It cannot, and the
          reason is that tax is charged in <strong style={{ color: body }}>slices</strong>, not on your whole salary at once.
          Your income is stacked up a ladder of bands, and each slice is taxed only at the rate for the band it falls in.
          Your first {gbp(12570)} — the <strong style={{ color: body }}>Personal Allowance</strong> — is completely tax-free.
          The slice from there to {gbp(50270)} is taxed at 20%. The slice above that up to {gbp(125140)} is taxed at 40%, and
          anything beyond is taxed at 45%.
        </P>
        <VizCard label="The 2025/26 Income Tax bands (England, Wales & NI)">
          <TaxLadder />
        </VizCard>
        <P>
          A {gbp(50000)} earner never pays 40% on anything. Their income sits entirely inside the 0% and 20% bands, so a pay
          rise is taxed at 20p in the pound, not more. Only the pound that crosses {gbp(50270)} is touched by the higher rate,
          and even then only that pound. This is why the &ldquo;marginal rate&rdquo; — the rate on your <em>next</em> pound —
          is the number that actually governs decisions like overtime, a bonus, or a pension top-up.
        </P>
      </Section>

      <Section n="3" kicker="The second tax" title="National Insurance, the deduction nobody mentions">
        <P>
          National Insurance is Income Tax&rsquo;s quieter twin. It uses almost the same thresholds but different rates, and
          it runs in the opposite direction at the top: where Income Tax rises as you earn more, National Insurance{" "}
          <em>falls</em>. You pay nothing on the first {gbp(12570)}, then <strong style={{ color: body }}>8%</strong> on
          earnings up to {gbp(50270)}, and only <strong style={{ color: body }}>2%</strong> on everything above that. That
          drop at {gbp(50270)} partly softens the jump to the 40% Income Tax band that happens at the very same point.
        </P>
        <VizCard label="Income Tax and National Insurance, stacked by band">
          <StackedRates />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ marginTop: 16 }}>
            <LegendKey color={coral} label="Income Tax rate" />
            <LegendKey color={amber} label="National Insurance rate" />
          </div>
        </VizCard>
        <P>
          Add the two together and you get the real deduction on each slice of salary: 0% below the allowance, 28% through
          the basic band, then 42% in the higher band. Notice that the combined rate barely changes as you cross{" "}
          {gbp(50270)} — 28% becomes 42%, a 14-point jump, not the 20-point jump the headline 20%-to-40% leap suggests. The NI
          drop absorbs some of the shock.
        </P>
      </Section>

      <Section n="4" kicker="Two rates" title="Effective rate vs marginal rate">
        <P>
          People talk about &ldquo;my tax rate&rdquo; as if there is one. There are two, and confusing them leads to bad
          decisions. Your <strong style={{ color: body }}>effective rate</strong> is the average — total deductions divided by
          total pay. Your <strong style={{ color: body }}>marginal rate</strong> is what the taxman takes from your very next
          pound. On {gbp(50000)}, your effective rate is about 21%, because most of your income enjoyed the 0% and 20% bands.
          But your marginal rate is 42%, because the next pound you earn lands in the higher band.
        </P>
        <VizCard label="At £50,000: what you've paid vs what the next £1 costs">
          <EffectiveVsMarginal />
        </VizCard>
        <P>
          The marginal rate is the one that answers real questions. &ldquo;Is this overtime worth it?&rdquo; &ldquo;Should I
          put the bonus in my pension?&rdquo; &ldquo;What does a {gbp(3000)} rise actually add?&rdquo; All of those are decided
          by the marginal rate, not the average. And in one strange corner of the system, the marginal rate does something no
          band chart would lead you to expect.
        </P>
      </Section>

      <Section n="5" kicker="The trap" title="The 60% zone between £100k and £125,140">
        <P>
          Here is the oddest rule in UK tax, and the one this calculator is proudest of surfacing. Once your income passes{" "}
          {gbp(100000)}, your {gbp(12570)} Personal Allowance is taken away at a rate of {" "}
          <strong style={{ color: body }}>£1 for every £2</strong> you earn above the line. That clawback is invisible on your
          payslip, but it means each extra pound in this band is taxed at 40% <em>and</em> drags a further 50p of previously
          tax-free allowance into the 40% band. The result is an effective <strong style={{ color: coral }}>60% marginal
          rate</strong> on Income Tax alone, 62% once National Insurance is added, stretching all the way to {gbp(125140)}
          where the allowance is finally gone.
        </P>
        <VizCard label="Marginal deduction rate as income rises (Income Tax + NI)">
          <MarginalCurve />
        </VizCard>
        <P>
          Look at the spike. Between {gbp(100000)} and {gbp(125140)} the line jumps <em>above</em> the 45% additional-rate
          zone that follows it — a rare case where earning a little more is taxed harder than earning a lot more. Someone on
          {gbp(110000)} keeps just 38p of their next pound. The good news is that this trap is entirely avoidable, and the tool
          to escape it is the same one that quietly beats it everywhere else on the ladder.
        </P>
      </Section>

      <Section n="6" kicker="The big lever" title="Pension sacrifice, the closest thing to free money">
        <P>
          A <strong style={{ color: body }}>salary-sacrifice pension</strong> lowers your contractual pay before Income Tax
          and National Insurance are worked out. Because the money never counts as taxable income, every pound you divert
          into your pension costs you less than a pound of take-home. For a basic-rate taxpayer, {gbp(100)} in the pension
          costs {gbp(72)} of take-home. For a higher-rate taxpayer it costs just <strong style={{ color: body }}>{gbp(58)}</strong>,
          because they dodge 40% tax and 2% NI. And for someone caught in the 60% trap, {gbp(100)} of pension can cost as
          little as {gbp(40)}.
        </P>
        <VizCard label="£100 of gross pay: as cash vs into a pension (higher-rate taxpayer)">
          <PensionWedge />
          <div className="flex flex-wrap gap-3" style={{ marginTop: 18 }}>
            <Badge value={gbp(58)} label="cost to your take-home" tone="green" />
            <Badge value={gbp(42)} label="tax & NI you'd have paid" />
          </div>
        </VizCard>
        <P>
          This is why pension sacrifice is the escape hatch from the 60% trap: contribute enough to bring your income back
          under {gbp(100000)} and you reclaim your entire Personal Allowance, turning that punishing 60p on the pound into
          roughly 40p of pension for every 60p you would otherwise have handed over. It also lowers the income used to assess
          student-loan repayments, so the benefit can stack even further.
        </P>
      </Section>

      <Section n="7" kicker="The graduate tax" title="Student loans behave nothing like a loan">
        <P>
          A UK student loan is repaid like a tax, not a debt. You pay a fixed percentage of everything you earn{" "}
          <em>above a threshold</em>, the balance is written off after a set number of years, and the monthly amount depends
          only on your income — never on how much you borrowed. Most graduates from 2012 to 2023 are on{" "}
          <strong style={{ color: body }}>Plan 2</strong>, which takes 9% of income above {gbp(28470)}. Earn {gbp(35000)} and
          you repay 9% of the {gbp(6530)} slice above the threshold: about {gbp(588)} a year, or {gbp(49)} a month.
        </P>
        <VizCard label="Plan 2 repayment on a £35,000 salary">
          <StudentLoanViz />
        </VizCard>
        <P>
          Because it is charged only on the slice above the threshold, a modest salary triggers a tiny repayment, and someone
          earning below the threshold pays nothing at all. It also means the &ldquo;interest rate&rdquo; on the loan is
          largely irrelevant for most people, since repayment is driven by salary and the remaining balance is eventually
          cancelled. Treat it as a temporary <strong style={{ color: body }}>9% graduate tax</strong> on higher earnings, not
          as a mortgage to be cleared as fast as possible.
        </P>
      </Section>

      <Section n="8" kicker="One-off pay" title="Why a bonus feels so much smaller than it looks">
        <P>
          A bonus is taxed like ordinary salary, but because it lands on top of your existing pay, it is taxed at your{" "}
          <strong style={{ color: body }}>highest</strong> bands first. Imagine a {gbp(48000)} salary with a {gbp(5000)} bonus.
          The first {gbp(2270)} of that bonus fills the rest of your basic-rate band and is taxed at 28% (20% tax + 8% NI). The
          remaining {gbp(2730)} spills over {gbp(50270)} into the higher band and is taxed at 42%. A single bonus can therefore
          be taxed at two rates at once.
        </P>
        <VizCard label="A £5,000 bonus stacked on a £48,000 salary">
          <BonusViz />
        </VizCard>
        <P>
          That is before the payslip illusion: PAYE often over-taxes a bonus in the month it is paid, assuming that inflated
          pay will continue all year, then corrects itself over the following months. The cash eventually settles at the
          figures above, but the first payslip can look alarming. If a bonus tips you near {gbp(50270)} or {gbp(100000)}, a
          pension contribution is the cleanest way to keep more of it.
        </P>
      </Section>

      <Section n="9" kicker="Speak the language" title="The words on your payslip, decoded">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", marginTop: 6 }}>
          {GLOSSARY.map((g) => (
            <div key={g.t} style={{ border: `1px solid ${line}`, borderRadius: 14, padding: "15px 16px", background: "#fff" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: ink }}>{g.t}</div>
              <div style={{ fontSize: 14, color: mute, marginTop: 5, lineHeight: 1.5 }}>{g.d}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Visuals
   ══════════════════════════════════════════════════════════════════ */

/* Waterfall: gross → −tax → −NI → take-home, for a £50,000 salary. */
function Waterfall() {
  const GROSS = 50000, TAX = 7486, NI = 2994, TH = GROSS - TAX - NI;
  const W = 640, H = 264, pt = 28, pb = 42, ph = H - pt - pb;
  const y = (v: number) => pt + (1 - v / GROSS) * ph;
  const cols = [
    { label: "Gross", value: GROSS, top: GROSS, bottom: 0, color: slate, amount: gbp(GROSS) },
    { label: "Income Tax", value: TAX, top: GROSS, bottom: GROSS - TAX, color: coral, amount: "−" + gbp(TAX) },
    { label: "Nat. Ins.", value: NI, top: GROSS - TAX, bottom: TH, color: amber, amount: "−" + gbp(NI) },
    { label: "Take-home", value: TH, top: TH, bottom: 0, color: green, amount: gbp(TH) },
  ];
  const bw = 108, gap = (W - cols.length * bw) / (cols.length + 1);
  const cx = (i: number) => gap + i * (bw + gap);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {cols.map((c, i) => {
        const yt = y(c.top), yb = y(c.bottom), h = Math.max(2, yb - yt);
        return (
          <g key={c.label}>
            {i > 0 && <line x1={cx(i - 1) + bw} y1={y(cols[i - 1].label === "Gross" ? cols[i - 1].top : cols[i - 1].bottom)} x2={cx(i)} y2={yt} stroke={line} strokeWidth="1.5" strokeDasharray="3 3" />}
            <rect x={cx(i)} y={yt} width={bw} height={h} rx={4} fill={c.color} opacity={i === 1 || i === 2 ? 0.92 : 1} />
            <text x={cx(i) + bw / 2} y={yt - 7} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800 }} fill={i === 1 || i === 2 ? coral : ink}>{c.amount}</text>
            <text x={cx(i) + bw / 2} y={H - 20} textAnchor="middle" style={{ fontSize: 12.5, fontWeight: 600 }} fill={mute}>{c.label}</text>
            {(i === 0 || i === 3) && <text x={cx(i) + bw / 2} y={H - 5} textAnchor="middle" style={{ fontSize: 11, fontWeight: 600 }} fill={subtle}>{i === 0 ? "100%" : "79%"}</text>}
          </g>
        );
      })}
    </svg>
  );
}

/* Tax band ladder — widths proportional to band size on a 0→140k axis. */
function TaxLadder() {
  const MAX = 140000;
  const bands = [
    { from: 0, to: 12570, rate: "0%", label: "Personal Allowance — tax-free", color: "#cbd5e1" },
    { from: 12570, to: 50270, rate: "20%", label: "Basic rate", color: "#7fb3ff" },
    { from: 50270, to: 125140, rate: "40%", label: "Higher rate", color: amber },
    { from: 125140, to: MAX, rate: "45%", label: "Additional rate", color: coral },
  ];
  const W = 640, rowH = 46, gap = 10;
  const x = (v: number) => (v / MAX) * W;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${bands.length * (rowH + gap)}`} width="100%" style={{ display: "block" }}>
        {bands.map((b, i) => {
          const w = x(b.to) - x(b.from);
          const yy = i * (rowH + gap);
          return (
            <g key={b.from}>
              <rect x={0} y={yy} width={Math.max(w, 46)} height={rowH} rx={8} fill={b.color} />
              <text x={12} y={yy + 19} style={{ fontSize: 14, fontWeight: 800 }} fill={i === 0 ? ink : "#fff"}>{b.rate}</text>
              <text x={12} y={yy + 35} style={{ fontSize: 11.5, fontWeight: 600 }} fill={i === 0 ? mute : "rgba(255,255,255,0.92)"}>{b.label}</text>
              <text x={Math.max(w, 46) + 8} y={yy + 27} style={{ fontSize: 11.5, fontWeight: 600 }} fill={subtle}>
                {b.to === MAX ? `${gbp(b.from)}+` : `${gbp(b.from)} – ${gbp(b.to)}`}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center justify-between" style={{ marginTop: 8, fontSize: 12, color: subtle, fontWeight: 600 }}>
        <span>← Only the slice inside each band pays that band&rsquo;s rate</span>
      </div>
    </div>
  );
}

/* Income Tax + NI stacked bars, per band. */
function StackedRates() {
  const rows = [
    { band: "£0 – £12,570", tax: 0, ni: 0 },
    { band: "£12,570 – £50,270", tax: 20, ni: 8 },
    { band: "£50,270 – £125,140", tax: 40, ni: 2 },
    { band: "£125,140+", tax: 45, ni: 2 },
  ];
  const maxR = 50;
  return (
    <div className="space-y-3.5">
      {rows.map((r) => {
        const total = r.tax + r.ni;
        return (
          <div key={r.band} className="flex items-center gap-3">
            <div style={{ width: 150, fontSize: 13, fontWeight: 600, color: ink, flex: "none", fontVariantNumeric: "tabular-nums" }}>{r.band}</div>
            <div style={{ flex: 1, height: 26, borderRadius: 7, background: tint, overflow: "hidden", display: "flex" }}>
              <div style={{ width: `${(r.tax / maxR) * 100}%`, background: coral, height: "100%" }} />
              <div style={{ width: `${(r.ni / maxR) * 100}%`, background: amber, height: "100%" }} />
            </div>
            <div style={{ width: 96, textAlign: "right", fontSize: 13, fontWeight: 700, color: total >= 60 ? coral : ink, flex: "none", fontVariantNumeric: "tabular-nums" }}>{total}% combined</div>
          </div>
        );
      })}
    </div>
  );
}

/* Effective vs marginal at £50,000. */
function EffectiveVsMarginal() {
  const rows = [
    { label: "Effective rate", sub: "the average across all your pay", val: 21, color: blue },
    { label: "Marginal rate", sub: "what your next £1 is taxed at", val: 42, color: coral },
  ];
  return (
    <div className="space-y-5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: ink }}>{r.label} <span style={{ fontSize: 12.5, fontWeight: 500, color: subtle }}>· {r.sub}</span></span>
            <span style={{ fontSize: 20, fontWeight: 800, color: r.color, fontVariantNumeric: "tabular-nums" }}>{r.val}%</span>
          </div>
          <div style={{ height: 16, borderRadius: 999, background: tint, overflow: "hidden" }}>
            <div style={{ width: `${r.val}%`, height: "100%", background: r.color, borderRadius: 999 }} />
          </div>
        </div>
      ))}
      <p style={{ fontSize: 13.5, color: mute, margin: 0, lineHeight: 1.5 }}>Same salary, same person — the average you have paid is barely half the rate on your next pound.</p>
    </div>
  );
}

/* Marginal rate step-curve, highlighting the 60% trap. */
function MarginalCurve() {
  const W = 680, H = 240, padL = 44, padR = 8, padT = 16, padB = 30, MAX = 160000, RMAX = 0.70;
  const x = (v: number) => padL + (v / MAX) * (W - padL - padR);
  const y = (r: number) => padT + (1 - r / RMAX) * (H - padT - padB);
  const steps = [
    { from: 0, to: 12570, r: 0 },
    { from: 12570, to: 50270, r: 0.28 },
    { from: 50270, to: 100000, r: 0.42 },
    { from: 100000, to: 125140, r: 0.62 },
    { from: 125140, to: MAX, r: 0.47 },
  ];
  let d = `M ${x(0)},${y(0)}`;
  steps.forEach((s, i) => {
    if (i > 0) d += ` L ${x(s.from)},${y(s.r)}`;
    d += ` L ${x(s.to)},${y(s.r)}`;
  });
  const yTicks = [0, 0.2, 0.4, 0.6];
  const xTicks = [{ v: 12570, l: "£12.5k" }, { v: 50270, l: "£50k" }, { v: 100000, l: "£100k" }, { v: 125140, l: "£125k" }];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* trap zone */}
      <rect x={x(100000)} y={padT} width={x(125140) - x(100000)} height={H - padT - padB} fill="#fef2f2" />
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} y1={y(t)} x2={W - padR} y2={y(t)} stroke={line} strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3.5} textAnchor="end" style={{ fontSize: 10.5, fontWeight: 600 }} fill={subtle}>{Math.round(t * 100)}%</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <g key={t.v}>
          <line x1={x(t.v)} y1={padT} x2={x(t.v)} y2={H - padB} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
          <text x={x(t.v)} y={H - 10} textAnchor="middle" style={{ fontSize: 10.5, fontWeight: 600 }} fill={subtle}>{t.l}</text>
        </g>
      ))}
      <path d={d} fill="none" stroke={blue} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {/* trap label */}
      <text x={(x(100000) + x(125140)) / 2} y={y(0.62) - 10} textAnchor="middle" style={{ fontSize: 12, fontWeight: 800 }} fill={coral}>62% trap</text>
      <circle cx={x(112000)} cy={y(0.62)} r="3.5" fill={coral} />
    </svg>
  );
}

/* Pension sacrifice: £100 as cash vs into pension (higher-rate). */
function PensionWedge() {
  const rows = [
    { label: "Take £100 as pay", pocket: 58, tax: 42, pension: 0 },
    { label: "Sacrifice £100 to pension", pocket: 0, tax: 0, pension: 100 },
  ];
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.label}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: ink, marginBottom: 6 }}>{r.label}</div>
          <div style={{ height: 34, borderRadius: 9, overflow: "hidden", display: "flex", border: `1px solid ${line}` }}>
            {r.pocket > 0 && <div style={{ width: `${r.pocket}%`, background: green, display: "grid", placeItems: "center" }}><span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>£{r.pocket} in your pocket</span></div>}
            {r.tax > 0 && <div style={{ width: `${r.tax}%`, background: coral, display: "grid", placeItems: "center" }}><span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>£{r.tax} tax + NI</span></div>}
            {r.pension > 0 && <div style={{ width: `${r.pension}%`, background: blue, display: "grid", placeItems: "center" }}><span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>£{r.pension} in your pension</span></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Student loan: 9% of the slice above the threshold. */
function StudentLoanViz() {
  const SAL = 35000, THRESH = 28470, MAX = 40000;
  const above = SAL - THRESH, repay = above * 0.09;
  const W = 640, H = 96, pt = 10, barH = 42;
  const x = (v: number) => (v / MAX) * W;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
        <rect x={0} y={pt} width={x(THRESH)} height={barH} rx={7} fill="#cbd5e1" />
        <rect x={x(THRESH)} y={pt} width={x(SAL) - x(THRESH)} height={barH} rx={7} fill={violet} />
        <line x1={x(THRESH)} y1={pt - 6} x2={x(THRESH)} y2={pt + barH + 6} stroke={ink} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={x(THRESH)} y={pt + barH + 22} textAnchor="middle" style={{ fontSize: 11.5, fontWeight: 700 }} fill={ink}>Threshold {gbp(THRESH)}</text>
        <text x={x(THRESH) / 2} y={pt + 26} textAnchor="middle" style={{ fontSize: 12, fontWeight: 700 }} fill={mute}>No repayment below</text>
        <text x={(x(THRESH) + x(SAL)) / 2} y={pt + 26} textAnchor="middle" style={{ fontSize: 12, fontWeight: 700 }} fill="#fff">{gbp(above)} @ 9%</text>
      </svg>
      <div className="flex flex-wrap gap-3" style={{ marginTop: 14 }}>
        <Badge value={gbp(repay)} label="repaid per year" />
        <Badge value={gbp(repay / 12)} label="per month" />
      </div>
    </div>
  );
}

/* Bonus split across two bands. */
function BonusViz() {
  const basic = 2270, higher = 2730;
  const total = basic + higher;
  return (
    <div>
      <div style={{ height: 40, borderRadius: 9, overflow: "hidden", display: "flex", border: `1px solid ${line}` }}>
        <div style={{ width: `${(basic / total) * 100}%`, background: "#7fb3ff", display: "grid", placeItems: "center" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0b3d91" }}>{gbp(basic)} @ 28%</span>
        </div>
        <div style={{ width: `${(higher / total) * 100}%`, background: amber, display: "grid", placeItems: "center" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#7a4a06" }}>{gbp(higher)} @ 42%</span>
        </div>
      </div>
      <div className="flex items-center justify-between" style={{ marginTop: 8, fontSize: 11.5, color: subtle, fontWeight: 600 }}>
        <span>Salary £48,000</span>
        <span>Crosses £50,270 →</span>
        <span>Total pay £53,000</span>
      </div>
      <p style={{ fontSize: 13.5, color: mute, marginTop: 12, lineHeight: 1.5 }}>
        Of the {gbp(total)} bonus, {gbp(basic)} fills the rest of your basic-rate band and {gbp(higher)} is taxed at the higher rate — so you keep roughly {gbp(basic * 0.72 + higher * 0.58)} of it.
      </p>
    </div>
  );
}

const GLOSSARY = [
  { t: "Gross pay", d: "Your headline salary before any tax, National Insurance or pension is taken off." },
  { t: "Personal Allowance", d: "The slice of income taxed at 0% — £12,570 for most people, tapering away above £100,000." },
  { t: "PAYE", d: "Pay As You Earn — the system that deducts tax and NI from each payslip automatically." },
  { t: "Tax code", d: "Tells your employer your allowance. 1257L is the standard code, meaning a £12,570 allowance." },
  { t: "Marginal rate", d: "The tax and NI charged on your next pound of income — the rate that governs decisions." },
  { t: "Effective rate", d: "Your average rate: total deductions divided by total pay. Always lower than the marginal rate." },
  { t: "Salary sacrifice", d: "Swapping pay for a pension contribution before tax and NI, so each £1 in costs you less." },
  { t: "Student loan plan", d: "Which repayment rules apply. Plan 2 takes 9% of income over £28,470; postgrad takes 6%." },
];
