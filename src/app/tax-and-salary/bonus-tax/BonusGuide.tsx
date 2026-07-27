/* Bonus Tax — visual guide (server component, no client imports). */

const ink = "#0c1611";
const body = "#33433c";
const mute = "#65748c";
const line = "#e6e8ea";
const blue = "#0d66f4";
const green = "#12a566";
const greenDeep = "#0a6f43";
const coral = "#ef4444";
const amber = "#f59e0b";

function Section({ n, kicker, title, children }: { n: number; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 34 }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
        <span style={{ width: 34, height: 34, flex: "none", display: "grid", placeItems: "center", borderRadius: 10, background: "#eaf2fe", color: blue, fontWeight: 800, fontSize: 15 }}>{n}</span>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: blue }}>{kicker}</span>
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: ink, letterSpacing: "-0.02em", margin: "0 0 10px" }}>{title}</h3>
      <div style={{ fontSize: 15.5, color: body, lineHeight: 1.7 }}>{children}</div>
    </section>
  );
}

/** Marginal Income-Tax bands across earnings, so the "which band is my bonus in" story is visual. */
function BandBar() {
  const bands = [
    { label: "0%", from: 0, to: 12570, color: "#e2e8f0", text: "#475569" },
    { label: "20%", from: 12570, to: 50270, color: "#93c5fd", text: "#0c1611" },
    { label: "40%", from: 50270, to: 100000, color: blue, text: "#fff" },
    { label: "60%", from: 100000, to: 125140, color: coral, text: "#fff" },
    { label: "45%", from: 125140, to: 150000, color: "#b91c1c", text: "#fff" },
  ];
  const MAX = 150000;
  return (
    <div style={{ border: `1px solid ${line}`, borderRadius: 14, padding: 18, background: "#fff", marginTop: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: mute, marginBottom: 12 }}>Marginal Income-Tax rate by earnings</div>
      <div style={{ display: "flex", height: 46, borderRadius: 9, overflow: "hidden" }}>
        {bands.map((b) => (
          <div key={b.label} style={{ width: `${((b.to - b.from) / MAX) * 100}%`, background: b.color, color: b.text, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800 }}>{b.label}</div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontSize: 11, color: mute, fontVariantNumeric: "tabular-nums" }}>
        <span>£0</span><span>£12.5k</span><span>£50k</span><span>£100k</span><span>£125k</span><span>£150k</span>
      </div>
      <p style={{ fontSize: 13, color: mute, marginTop: 10 }}>A bonus stacks on top of your salary, so it&rsquo;s taxed at the band your <em>top</em> pound falls in — plus 8% or 2% National Insurance.</p>
    </div>
  );
}

export default function BonusGuide() {
  return (
    <div style={{ paddingTop: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: blue }}>The Bonus Guide</div>
      <h2 style={{ fontSize: 30, fontWeight: 800, color: ink, letterSpacing: "-0.03em", margin: "8px 0 6px" }}>What actually happens to your bonus</h2>
      <p style={{ fontSize: 16, color: body, lineHeight: 1.7, maxWidth: 720 }}>
        A bonus feels like free money, but HMRC treats it as ordinary earnings — taxed at your highest band and hit by National Insurance. Here&rsquo;s exactly how it&rsquo;s worked out, the traps to avoid, and the one move that can hand the whole lot to your future self tax-free.
      </p>

      <Section n={1} kicker="The bands" title="A bonus is taxed at your top rate">
        <p>Your salary uses up the lower tax bands first. The bonus sits on top, so every pound is taxed at whatever rate your <strong>highest</strong> earnings hit — 20%, 40% or 45% Income Tax, plus 8% NI in the main band or 2% once you&rsquo;re over £50,270.</p>
        <BandBar />
      </Section>

      <Section n={2} kicker="The trap" title="Watch the £100,000 cliff-edge">
        <p>
          Between <strong>£100,000 and £125,140</strong>, your £12,570 tax-free Personal Allowance is withdrawn by £1 for every £2 you earn. That hidden clawback pushes the <em>effective</em> rate on a bonus in this band to
          {" "}<strong style={{ color: coral }}>60%</strong> (62% with NI). A bonus that tips you over £100k can be brutally taxed — which is exactly where pension sacrifice earns its keep.
        </p>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", marginTop: 14 }}>
          {[
            { r: "20%", b: "£12.5k–£50k", c: green },
            { r: "40%", b: "£50k–£100k", c: blue },
            { r: "60%", b: "£100k–£125k", c: coral },
            { r: "45%", b: "£125k+", c: "#b91c1c" },
          ].map((x) => (
            <div key={x.b} style={{ border: `1px solid ${line}`, borderRadius: 12, padding: "14px 15px", background: "#fff" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: x.c, fontVariantNumeric: "tabular-nums" }}>{x.r}</div>
              <div style={{ fontSize: 13, color: mute, marginTop: 2 }}>{x.b}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={3} kicker="The move" title="Sacrifice the bonus into your pension">
        <p>
          Instead of taking the bonus as cash, you can ask your employer to pay it straight into your pension. Because it never counts as pay, you dodge Income Tax and NI on the whole amount — so <strong>£5,000</strong> of bonus becomes <strong style={{ color: blue }}>£5,000</strong> in your pot rather than roughly <strong>£2,900</strong> in your bank. Many employers even add their saved NI on top.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 180px", border: `1px solid ${line}`, borderRadius: 12, padding: 16, background: "#f8fafc" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: mute }}>Take as cash (40% taxpayer)</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: greenDeep, marginTop: 4 }}>~£2,900</div>
            <div style={{ fontSize: 12.5, color: mute }}>after 40% tax + 2% NI</div>
          </div>
          <div style={{ flex: "1 1 180px", border: `1px solid #dbeafe`, borderRadius: 12, padding: 16, background: "#eff6ff" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: mute }}>Sacrifice to pension</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: blue, marginTop: 4 }}>£5,000</div>
            <div style={{ fontSize: 12.5, color: mute }}>full amount invested</div>
          </div>
        </div>
      </Section>

      <Section n={4} kicker="Your payslip" title="Why the first payslip looks wrong">
        <p>
          In the month your bonus is paid, PAYE often over-deducts. The system assumes that bigger pay-packet will repeat every month for the rest of the year, so it taxes you as if you earn far more. Over the following months the cumulative calculation rebalances and you get the excess back. Annually, the take-home figure the calculator shows is what you truly keep — don&rsquo;t panic at the first slip.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, border: `1px solid ${line}`, borderRadius: 12, padding: "12px 15px", background: "#fffbeb" }}>
          <span style={{ color: amber, fontSize: 18 }}>⚠️</span>
          <span style={{ fontSize: 14, color: body }}>The month-of-bonus deduction is not your final tax. It self-corrects across the tax year.</span>
        </div>
      </Section>
    </div>
  );
}
