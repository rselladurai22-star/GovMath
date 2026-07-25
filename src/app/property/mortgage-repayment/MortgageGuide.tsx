/**
 * The Mortgage Guide — a visual, plain-English explainer that sits beneath the
 * calculator. Pure server component: every diagram is hand-built SVG/CSS so the
 * concepts are shown, not just described. Apple-clean, crystal clear.
 */

const ink = "#0c1611";
const body = "#33433c";
const mute = "#5c6b63";
const subtle = "#8a938d";
const line = "#e6e8ea";
const tint = "#f4f6f7";
const green = "#12a566";
const greenDeep = "#0a6f43";
const coral = "#f2663c";
const amber = "#e6971a";
const blue = "#3b82f6";

/* ── layout helpers ─────────────────────────────────────────────── */
function Section({ n, kicker, title, children }: { n: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingTop: 44, paddingBottom: 44, borderTop: `1px solid ${line}` }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 6 }}>
        <span style={{ width: 34, height: 34, flex: "none", display: "grid", placeItems: "center", borderRadius: 10, background: "#e7f6ee", color: greenDeep, fontWeight: 800, fontSize: 15 }}>{n}</span>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: green }}>{kicker}</span>
      </div>
      <h2 style={{ fontSize: 27, fontWeight: 800, color: ink, letterSpacing: "-0.02em", margin: "0 0 14px", lineHeight: 1.12 }}>{title}</h2>
      {children}
    </section>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16, lineHeight: 1.7, color: body, margin: "0 0 14px", maxWidth: 720 }}>{children}</p>;
}
function VizCard({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${line}`, borderRadius: 16, background: "#fff", padding: 22, boxShadow: "0 1px 3px rgba(12,22,17,0.04), 0 14px 32px -20px rgba(12,22,17,0.12)", margin: "18px 0" }}>
      {label && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: subtle, marginBottom: 16 }}>{label}</div>}
      {children}
    </div>
  );
}
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/* ════════════════════════════════════════════════════════════════ */
export default function MortgageGuide() {
  return (
    <div style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: green }}>The Mortgage Guide</span>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: ink, letterSpacing: "-0.03em", margin: "8px 0 12px", lineHeight: 1.08 }}>Everything a first-time buyer actually needs to understand</h2>
        <P>
          A mortgage is the biggest number most of us will ever sign for — yet the way it works is rarely explained clearly.
          This guide walks through it visually, one idea at a time: how your payment is built, why the timing of an overpayment
          matters so much, how your deposit changes the rate you&rsquo;re offered, and the real costs that sit alongside it. No
          jargon, no assumed knowledge. All examples use a <strong style={{ color: body }}>{gbp(270000)} loan at 4.5% over 25 years</strong> unless noted.
        </P>
      </div>

      <Section n="1" kicker="The mechanics" title="How a repayment mortgage is actually built">
        <P>
          Every month you pay the <strong style={{ color: body }}>same fixed amount</strong>. But that single payment is quietly doing two
          different jobs at once. Part of it is <span style={{ color: coral, fontWeight: 700 }}>interest</span> — the lender&rsquo;s charge for
          letting you borrow the money. The rest is <span style={{ color: green, fontWeight: 700 }}>capital</span> — the bit that actually
          reduces what you owe. Interest is always calculated on the balance that&rsquo;s still outstanding, so in the early years — when the
          balance is huge — most of your payment is interest. As the balance shrinks, the interest shrinks with it, and more of the same
          payment goes to clearing capital. The mix flips slowly, year after year.
        </P>
        <VizCard label="Where each monthly payment goes, by year">
          <AmortBars />
          <div className="flex items-center gap-6" style={{ marginTop: 16 }}>
            <LegendKey color={coral} label="Interest — the lender's charge" />
            <LegendKey color={green} label="Capital — clears your debt" />
          </div>
        </VizCard>
        <P>
          This is why a mortgage feels slow to move at first. In year one, only around a fifth of what you pay is chipping away at the
          debt. By the final years, almost all of it is. Nothing about your payment changes — only the invisible split inside it.
        </P>
      </Section>

      <Section n="2" kicker="The crossover" title="What £1 of your payment really buys">
        <P>
          Zoom into a single pound of a single payment and the story becomes obvious. Early on, most of that pound vanishes as interest.
          Somewhere near the middle of the term, the balance tips and the pound starts pulling its weight against the debt. By the end,
          nearly the whole pound is capital.
        </P>
        <VizCard label="Of every £1 you pay…">
          <PoundBars />
        </VizCard>
        <P>
          Understanding this one picture explains almost every smart mortgage decision: shortening the term, overpaying, or remortgaging
          all work by <strong style={{ color: body }}>attacking the balance sooner</strong>, so less of your money is lost to interest along the way.
        </P>
      </Section>

      <Section n="3" kicker="The biggest lever you control" title="Why overpaying early saves so much more">
        <P>
          Because interest is charged on the outstanding balance, a pound of capital removed in year one avoids interest for the next
          twenty-four years. The same pound removed in year twenty avoids almost nothing. Overpayments are a compounding force, and
          time is what makes them powerful — which is why a modest, steady overpayment early beats a large one later.
        </P>
        <VizCard label="Example · £150 extra every month, from day one">
          <OverpayCompare />
        </VizCard>
        <P>
          Most UK lenders let you overpay up to <strong style={{ color: body }}>10% of the balance each year</strong> with no early-repayment
          charge. Even rounding your payment up by £50 or £100 quietly rewrites the second half of your mortgage. Always check your
          lender&rsquo;s specific overpayment limit first — the calculator above lets you model any amount.
        </P>
      </Section>

      <Section n="4" kicker="Your deposit decides your rate" title="The LTV ladder — and why crossing a rung matters">
        <P>
          <strong style={{ color: body }}>Loan-to-value (LTV)</strong> is simply your loan divided by the property price. Borrow {gbp(270000)} on a
          {" "}{gbp(300000)} home and you&rsquo;re at 90% LTV. Lenders price risk in bands, and the rate they offer improves sharply each time
          you drop under a threshold — typically at 90%, 85%, 80%, 75% and 60%. Nudging your deposit just over one of these rungs can
          cut your interest rate for the entire deal, which is often worth far more than the extra deposit itself.
        </P>
        <VizCard label="Loan-to-value bands · lower is cheaper">
          <LtvLadder />
        </VizCard>
        <P>
          A worked example: lifting your deposit on that {gbp(300000)} home from {gbp(30000)} (90% LTV) to {gbp(45000)} (85% LTV) might drop
          your rate by around 0.3–0.5%. On a {gbp(255000)} loan that&rsquo;s roughly {gbp(50)}–{gbp(80)} a month, every month, for the length of
          the fix — many times the {gbp(15000)} of extra deposit over the years. If you&rsquo;re close to a band, it&rsquo;s almost always worth
          stretching for it.
        </P>
      </Section>

      <Section n="5" kicker="The rate you see isn't forever" title="Fixed rates, and the reversion cliff">
        <P>
          The headline rate you&rsquo;re quoted almost never lasts the whole term. Most UK mortgages are <strong style={{ color: body }}>fixed for
          2, 5 or 10 years</strong>, and when that fix ends the loan reverts to the lender&rsquo;s <strong style={{ color: body }}>Standard Variable
          Rate (SVR)</strong> — usually several percentage points higher. That&rsquo;s the moment to remortgage onto a new deal.
        </P>
        <VizCard label="A typical 5-year fix, then reversion">
          <FixedVsSvr />
        </VizCard>
        <P>
          This is also why lenders <strong style={{ color: body }}>stress-test</strong> you: before they lend, they check you could still afford
          the payment if rates rose by two or three percent. Budget the same way. The &ldquo;If rates move&rdquo; panel in the calculator shows
          exactly what a 1% or 2% rise would add to your monthly payment — treat that higher figure as your real ceiling.
        </P>
      </Section>

      <Section n="6" kicker="Two ways to borrow" title="Repayment vs interest-only, side by side">
        <P>
          Almost every residential mortgage today is <strong style={{ color: body }}>repayment</strong>: your payments clear the whole loan by the
          end of the term. <strong style={{ color: body }}>Interest-only</strong> keeps monthly payments much lower because you only pay the
          interest — but you still owe the entire loan at the end and need a separate plan (savings, investments, or selling) to clear it.
          It&rsquo;s now mostly a buy-to-let product.
        </P>
        <VizCard>
          <RepayVsIo />
        </VizCard>
      </Section>

      <Section n="7" kicker="Budget for the whole thing" title="The true upfront cost, beyond the deposit">
        <P>
          Your deposit is the big number, but it isn&rsquo;t the only one due on completion. On a typical {gbp(300000)} purchase, plan for a few
          thousand pounds of extras on top — get these wrong and a deal that looked affordable suddenly isn&rsquo;t.
        </P>
        <VizCard label="Example upfront costs on a £300,000 home (excl. deposit)">
          <CostBar />
        </VizCard>
        <P>
          Stamp Duty is usually the largest, and it depends on price and whether you&rsquo;re a first-time buyer — use our Stamp Duty
          calculator for the exact figure. Legal (conveyancing) fees, a survey, the lender&rsquo;s product/arrangement fee and removals fill in
          the rest. A sensible rule of thumb is to keep a cushion of {gbp(3000)}–{gbp(8000)} beyond your deposit.
        </P>
      </Section>

      <Section n="8" kicker="Speak the language" title="The seven terms worth knowing">
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

/* ── small pieces ───────────────────────────────────────────────── */
function LegendKey({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2" style={{ fontSize: 13.5, color: body }}><span style={{ width: 12, height: 12, borderRadius: 3, background: color }} />{label}</span>;
}

/* Amortisation bars — same payment height, shifting interest/capital split. */
const AMORT = [
  { yr: 1, i: 0.78 }, { yr: 5, i: 0.7 }, { yr: 10, i: 0.57 }, { yr: 15, i: 0.41 }, { yr: 20, i: 0.22 }, { yr: 25, i: 0.05 },
];
function AmortBars() {
  const W = 640, H = 200, padB = 26, top = 8, bh = H - padB - top;
  const bw = 58, gap = (W - AMORT.length * bw) / (AMORT.length + 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      {AMORT.map((d, i) => {
        const x = gap + i * (bw + gap);
        const iH = d.i * bh, cH = bh - iH;
        return (
          <g key={d.yr}>
            <rect x={x} y={top} width={bw} height={iH} fill={coral} rx={3} />
            <rect x={x} y={top + iH} width={bw} height={cH} fill={green} rx={3} />
            <text x={x + bw / 2} y={H - 8} textAnchor="middle" style={{ fontSize: 12, fontWeight: 600 }} fill={mute}>Yr {d.yr}</text>
            <text x={x + bw / 2} y={top + 14} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700 }} fill="#fff">{Math.round(d.i * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/* £1 breakdown at three points in the term. */
const POUND = [{ yr: "Year 1", i: 78 }, { yr: "Year 13", i: 50 }, { yr: "Year 25", i: 5 }];
function PoundBars() {
  return (
    <div className="space-y-4">
      {POUND.map((d) => (
        <div key={d.yr} className="flex items-center gap-4">
          <div style={{ width: 66, fontSize: 14, fontWeight: 700, color: ink, flex: "none" }}>{d.yr}</div>
          <div style={{ flex: 1, height: 30, borderRadius: 8, overflow: "hidden", display: "flex", border: `1px solid ${line}` }}>
            <div style={{ width: `${d.i}%`, background: coral, display: "grid", placeItems: "center" }}>
              {d.i > 14 && <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{d.i}p interest</span>}
            </div>
            <div style={{ width: `${100 - d.i}%`, background: green, display: "grid", placeItems: "center" }}>
              {100 - d.i > 14 && <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{100 - d.i}p capital</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Overpayment before/after comparison. */
function OverpayCompare() {
  const rows = [
    { label: "No overpayment", years: "25 years", interest: 180224, w: 100, tone: mute },
    { label: "+£150 / month", years: "≈ 20 years", interest: 145000, w: 80, tone: green },
  ];
  return (
    <div>
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: ink }}>{r.label}</span>
              <span style={{ fontSize: 14, color: mute }}>{r.years} · {gbp(r.interest)} interest</span>
            </div>
            <div style={{ height: 14, borderRadius: 999, background: tint, overflow: "hidden" }}>
              <div style={{ width: `${r.w}%`, height: "100%", background: r.tone, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3" style={{ marginTop: 18 }}>
        <Badge value="≈ 5 years" label="cleared earlier" />
        <Badge value={`≈ ${gbp(35000)}`} label="interest saved" />
      </div>
    </div>
  );
}
function Badge({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ background: "#e7f6ee", border: "1px solid #cdeadd", borderRadius: 12, padding: "12px 16px" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: greenDeep, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontSize: 13, color: greenDeep, opacity: 0.85 }}>{label}</div>
    </div>
  );
}

/* LTV ladder. */
const LTV = [
  { ltv: "95%", w: 100, c: coral, note: "Priciest rates · limited choice" },
  { ltv: "90%", w: 86, c: "#ef7a3f", note: "Higher rates" },
  { ltv: "85%", w: 72, c: amber, note: "Mainstream rates" },
  { ltv: "80%", w: 58, c: "#7bb35a", note: "Good rates" },
  { ltv: "75%", w: 44, c: "#3f9e6a", note: "Strong rates" },
  { ltv: "60%", w: 30, c: greenDeep, note: "The best rates lenders offer" },
];
function LtvLadder() {
  return (
    <div className="space-y-2.5">
      {LTV.map((d) => (
        <div key={d.ltv} className="flex items-center gap-3">
          <div style={{ width: 48, fontSize: 15, fontWeight: 800, color: ink, fontVariantNumeric: "tabular-nums", flex: "none" }}>{d.ltv}</div>
          <div style={{ width: `${d.w}%`, minWidth: 90, height: 34, borderRadius: 8, background: d.c, display: "flex", alignItems: "center", paddingLeft: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{d.note}</span>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between" style={{ marginTop: 10, fontSize: 12.5, color: subtle, fontWeight: 600 }}>
        <span>← Bigger loan, higher risk to the lender</span>
        <span>Bigger deposit, cheaper rate →</span>
      </div>
    </div>
  );
}

/* Fixed vs SVR line. */
function FixedVsSvr() {
  const W = 640, H = 180, padL = 40, padB = 28, padT = 12;
  const yFix = 96, ySvr = 44; // higher on screen = higher rate
  const xBreak = padL + (W - padL - 10) * 0.55;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <text x={4} y={ySvr + 4} style={{ fontSize: 11, fontWeight: 600 }} fill={mute}>SVR</text>
      <text x={4} y={yFix + 4} style={{ fontSize: 11, fontWeight: 600 }} fill={mute}>Fix</text>
      <line x1={padL} y1={H - padB} x2={W - 6} y2={H - padB} stroke={line} strokeWidth="1" />
      <path d={`M${padL},${yFix} L${xBreak},${yFix} L${xBreak},${ySvr} L${W - 6},${ySvr}`} fill="none" stroke={green} strokeWidth="3" strokeLinejoin="round" />
      <circle cx={xBreak} cy={yFix} r="4" fill={green} />
      <line x1={xBreak} y1={padT} x2={xBreak} y2={H - padB} stroke="#cbd3ce" strokeWidth="1" strokeDasharray="3 3" />
      <text x={padL + 8} y={yFix - 10} style={{ fontSize: 12.5, fontWeight: 700 }} fill={greenDeep}>Your fixed rate (2–5 yrs)</text>
      <text x={xBreak + 8} y={ySvr - 10} style={{ fontSize: 12.5, fontWeight: 700 }} fill={coral}>Reverts to SVR</text>
      <text x={xBreak} y={H - 8} textAnchor="middle" style={{ fontSize: 11.5, fontWeight: 700 }} fill={ink}>← remortgage here</text>
    </svg>
  );
}

/* Repayment vs interest-only comparison. */
function RepayVsIo() {
  const rows = [
    { k: "Monthly payment", r: "Higher", i: "Lower", rGood: false, iGood: true },
    { k: "Clears the loan?", r: "Yes, by the end", i: "No — full loan still owed", rGood: true, iGood: false },
    { k: "Needs a repayment plan?", r: "No", i: "Yes (savings, sale)", rGood: true, iGood: false },
    { k: "Common for", r: "Residential", i: "Buy-to-let", rGood: true, iGood: true },
  ];
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
      {[{ name: "Repayment", accent: green, key: "r" as const }, { name: "Interest-only", accent: blue, key: "i" as const }].map((col) => (
        <div key={col.name} style={{ border: `1px solid ${line}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", background: tint, borderBottom: `1px solid ${line}` }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: col.accent }}>{col.name}</span>
          </div>
          <div style={{ padding: "6px 16px 14px" }}>
            {rows.map((row) => {
              const val = col.key === "r" ? row.r : row.i;
              const good = col.key === "r" ? row.rGood : row.iGood;
              return (
                <div key={row.k} style={{ padding: "10px 0", borderBottom: `1px solid ${line}` }}>
                  <div style={{ fontSize: 12.5, color: subtle, fontWeight: 600 }}>{row.k}</div>
                  <div className="flex items-center gap-2" style={{ marginTop: 2 }}>
                    <span style={{ color: good ? green : coral, fontWeight: 800, fontSize: 14 }}>{good ? "✓" : "✕"}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: ink }}>{val}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Upfront cost bar. */
const COSTS = [
  { k: "Deposit (example 10%)", v: 30000, c: green },
  { k: "Stamp Duty", v: 2500, c: coral },
  { k: "Legal / conveyancing", v: 1500, c: amber },
  { k: "Survey", v: 600, c: blue },
  { k: "Lender product fee", v: 999, c: "#7c6cf0" },
  { k: "Removals", v: 1200, c: "#0ea5a5" },
];
function CostBar() {
  const total = COSTS.reduce((a, c) => a + c.v, 0);
  return (
    <div>
      <div style={{ display: "flex", height: 30, borderRadius: 8, overflow: "hidden", border: `1px solid ${line}` }}>
        {COSTS.map((c) => <div key={c.k} style={{ width: `${(c.v / total) * 100}%`, background: c.c }} title={`${c.k}: ${gbp(c.v)}`} />)}
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", marginTop: 16 }}>
        {COSTS.map((c) => (
          <div key={c.k} className="flex items-center justify-between" style={{ fontSize: 14 }}>
            <span className="flex items-center gap-2"><span style={{ width: 11, height: 11, borderRadius: 3, background: c.c, flex: "none" }} /><span style={{ color: body }}>{c.k}</span></span>
            <span style={{ fontWeight: 700, color: ink, fontVariantNumeric: "tabular-nums" }}>{gbp(c.v)}</span>
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between" style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${line}` }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: ink }}>Typical total upfront</span>
        <span style={{ fontSize: 20, fontWeight: 800, color: ink, fontVariantNumeric: "tabular-nums" }}>{gbp(total)}</span>
      </div>
    </div>
  );
}

const GLOSSARY = [
  { t: "LTV", d: "Loan-to-value — your loan as a percentage of the property price. Lower is cheaper." },
  { t: "SVR", d: "Standard Variable Rate — the lender's default rate your deal reverts to when a fix ends." },
  { t: "ERC", d: "Early Repayment Charge — a penalty for overpaying beyond the allowance or leaving a fix early." },
  { t: "Amortisation", d: "The schedule by which each payment splits between interest and capital over the term." },
  { t: "APRC", d: "Annual Percentage Rate of Charge — the total yearly cost including fees, for comparing deals." },
  { t: "Product fee", d: "An arrangement fee for a specific mortgage deal — sometimes added to the loan." },
  { t: "Stress test", d: "The lender's check that you could still afford the payment if rates rose 2–3%." },
];
