/** National Insurance — visual, plain-English guide. Pure server component. */

const ink = "#0f172a", body = "#334155", mute = "#64748b", subtle = "#94a3b8", line = "#e2e8f0", tint = "#f8fafc";
const blue = "#0a66ff", green = "#16a34a", amber = "#f59e0b", violet = "#8b5cf6", teal = "#0ea5a5";
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

function Section({ n, kicker, title, children }: { n: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingTop: 44, paddingBottom: 44, borderTop: `1px solid ${line}` }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 6 }}>
        <span style={{ width: 34, height: 34, flex: "none", display: "grid", placeItems: "center", borderRadius: 10, background: "#eff6ff", color: blue, fontWeight: 800, fontSize: 15 }}>{n}</span>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: blue }}>{kicker}</span>
      </div>
      <h2 style={{ fontSize: 27, fontWeight: 800, color: ink, letterSpacing: "-0.02em", margin: "0 0 14px", lineHeight: 1.12 }}>{title}</h2>
      {children}
    </section>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16, lineHeight: 1.7, color: body, margin: "0 0 14px", maxWidth: 720 }}>{children}</p>;
}
function Viz({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${line}`, borderRadius: 16, background: "#fff", padding: 22, boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 14px 32px -20px rgba(15,23,42,0.12)", margin: "18px 0" }}>
      {label && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: subtle, marginBottom: 16 }}>{label}</div>}
      {children}
    </div>
  );
}

export default function NIGuide() {
  return (
    <div style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: blue }}>The NI Guide</span>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: ink, letterSpacing: "-0.03em", margin: "8px 0 12px", lineHeight: 1.08 }}>National Insurance, explained clearly</h2>
        <P>
          National Insurance (NI) is the second deduction on your payslip, sitting alongside Income Tax. It funds the
          State Pension, the NHS and certain benefits — and it&rsquo;s charged in bands, just like Income Tax, but with its
          own thresholds and a surprising twist for higher earners. Here&rsquo;s exactly how it works in 2025/26.
        </P>
      </div>

      <Section n="1" kicker="The bands" title="How your NI is charged, band by band">
        <P>
          As an employee you pay <strong style={{ color: body }}>Class 1</strong> NI. There&rsquo;s a threshold you can earn up to
          completely NI-free, a main band charged at 8%, and — unusually — the rate <em>drops</em> to just 2% on everything
          above the upper limit. So a very high earner pays a <strong style={{ color: body }}>smaller</strong> marginal NI rate than a
          middle earner.
        </P>
        <Viz label="Class 1 employee NI rate, by earnings">
          <NiBands />
        </Viz>
        <P>
          The first {gbp(12570)} you earn is free of NI. Between {gbp(12570)} and {gbp(50270)} you pay 8%. Above {gbp(50270)}
          only 2% applies. That&rsquo;s why NI feels heaviest for typical salaries and lighter, proportionally, for the highest.
        </P>
      </Section>

      <Section n="2" kicker="Employed vs self-employed" title="Two ways to pay, side by side">
        <P>
          If you work for yourself you pay <strong style={{ color: body }}>Class 4</strong> NI on your trading profits instead — same
          thresholds as employees, but lower rates (6% and 2%). Class 2 was effectively abolished from April 2024.
        </P>
        <Viz>
          <Compare />
        </Viz>
      </Section>

      <Section n="3" kicker="Where it goes" title="What your National Insurance actually pays for">
        <P>
          NI isn&rsquo;t a savings pot with your name on it — today&rsquo;s contributions fund today&rsquo;s pensions and services. But your
          record of contributions <strong style={{ color: body }}>does</strong> determine your State Pension: you generally need 35
          qualifying years for the full new State Pension, and at least 10 to get anything at all.
        </P>
        <Viz label="Roughly where each £1 of NI goes">
          <Allocation />
        </Viz>
        <P>
          Because your NI record builds your State Pension entitlement, gaps can matter. If you&rsquo;ve had years abroad or on
          low income, it can be worth checking your record and, in some cases, topping up voluntary contributions.
        </P>
      </Section>

      <Section n="4" kicker="Key numbers" title="The thresholds worth remembering">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", marginTop: 6 }}>
          {[
            { t: gbp(12570), d: "Primary Threshold — earn up to this NI-free" },
            { t: gbp(50270), d: "Upper Earnings Limit — rate drops to 2% above" },
            { t: "8% / 2%", d: "Employee Class 1 rates (main / upper)" },
            { t: "6% / 2%", d: "Self-employed Class 4 rates" },
            { t: "35 years", d: "Qualifying years for the full State Pension" },
            { t: "~15%", d: "Employer's secondary NI on your salary" },
          ].map((g) => (
            <div key={g.d} style={{ border: `1px solid ${line}`, borderRadius: 14, padding: "15px 16px", background: "#fff" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: ink, fontVariantNumeric: "tabular-nums" }}>{g.t}</div>
              <div style={{ fontSize: 14, color: mute, marginTop: 5, lineHeight: 1.5 }}>{g.d}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* NI band chart — rate steps across earnings. */
function NiBands() {
  const bands = [
    { from: 0, to: 12570, rate: 0, c: "#e2e8f0", label: "0% · NI-free" },
    { from: 12570, to: 50270, rate: 8, c: blue, label: "8% · main band" },
    { from: 50270, to: 80000, rate: 2, c: amber, label: "2% · upper band" },
  ];
  const MAX = 80000;
  return (
    <div>
      <div style={{ display: "flex", height: 44, borderRadius: 10, overflow: "hidden", border: `1px solid ${line}` }}>
        {bands.map((b) => (
          <div key={b.from} style={{ width: `${((b.to - b.from) / MAX) * 100}%`, background: b.c, display: "grid", placeItems: "center", color: b.rate === 0 ? mute : "#fff" }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{b.rate}%</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between" style={{ marginTop: 6, fontSize: 12, color: subtle, fontWeight: 600 }}>
        <span>£0</span><span>£12,570</span><span>£50,270</span><span>£80k+</span>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ marginTop: 14 }}>
        {bands.map((b) => (
          <span key={b.from} className="inline-flex items-center gap-2" style={{ fontSize: 13.5, color: body }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: b.c }} />{b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Compare() {
  const cols = [
    { name: "Employee", accent: blue, rows: ["Class 1 NI", "8% main rate", "2% above £50,270", "Deducted via PAYE"] },
    { name: "Self-employed", accent: teal, rows: ["Class 4 NI", "6% main rate", "2% above £50,270", "Paid via Self Assessment"] },
  ];
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
      {cols.map((col) => (
        <div key={col.name} style={{ border: `1px solid ${line}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", background: tint, borderBottom: `1px solid ${line}` }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: col.accent }}>{col.name}</span>
          </div>
          <div style={{ padding: "6px 16px 14px" }}>
            {col.rows.map((r) => (
              <div key={r} className="flex items-center gap-2" style={{ padding: "9px 0", borderBottom: `1px solid ${line}`, fontSize: 14.5, color: ink, fontWeight: 600 }}>
                <span style={{ color: col.accent, fontWeight: 800 }}>✓</span>{r}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Allocation() {
  const parts = [
    { k: "State Pension", v: 46, c: blue },
    { k: "NHS", v: 20, c: green },
    { k: "Other benefits & services", v: 34, c: violet },
  ];
  return (
    <div>
      <div style={{ display: "flex", height: 30, borderRadius: 8, overflow: "hidden", border: `1px solid ${line}` }}>
        {parts.map((p) => <div key={p.k} style={{ width: `${p.v}%`, background: p.c }} />)}
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", marginTop: 16 }}>
        {parts.map((p) => (
          <div key={p.k} className="flex items-center justify-between" style={{ fontSize: 14 }}>
            <span className="flex items-center gap-2"><span style={{ width: 11, height: 11, borderRadius: 3, background: p.c }} /><span style={{ color: body }}>{p.k}</span></span>
            <span style={{ fontWeight: 700, color: ink }}>{p.v}%</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12.5, color: subtle, marginTop: 12 }}>Illustrative split of the National Insurance Fund; exact allocations vary year to year.</p>
    </div>
  );
}
